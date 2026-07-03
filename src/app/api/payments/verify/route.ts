import { type NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { verifyLeanXPayment, mapLeanXStatus } from "@/lib/leanx";

/**
 * Polling fallback for missed webhooks (LEANX_INTEGRATION.md §6). The client
 * return handler calls this a few times after the customer is redirected back.
 * Looks up the transaction by our order_id (= booking id), asks LeanX for the
 * status, and reconciles the DB. Idempotent.
 */
export async function POST(request: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let payload: { order?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const order = payload.order;
  if (!order) {
    return NextResponse.json({ error: "missing order" }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  const { data: txn } = await admin
    .from("transactions")
    .select("id, booking_id, provider_ref, order_id")
    .eq("order_id", order)
    .maybeSingle();
  if (!txn || !txn.booking_id) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const { data: booking } = await admin
    .from("bookings")
    .select("operator_id, payment_status")
    .eq("id", txn.booking_id)
    .maybeSingle();

  const { data: creds } = booking?.operator_id
    ? await admin
        .from("operator_leanx")
        .select("api_key, collection_uuid, environment")
        .eq("operator_id", booking.operator_id)
        .maybeSingle()
    : { data: null };

  // No creds → just report the current DB state.
  if (!creds?.api_key || !creds.collection_uuid) {
    return NextResponse.json({ paymentStatus: booking?.payment_status ?? "unpaid" });
  }

  const res = await verifyLeanXPayment(
    {
      apiKey: creds.api_key,
      collectionUuid: creds.collection_uuid,
      environment: creds.environment,
    },
    { billNo: txn.provider_ref ?? undefined, invoiceRef: txn.order_id ?? undefined }
  );

  // A single 404/error from LeanX is not authoritative — keep current state.
  if (res.error || !res.status) {
    return NextResponse.json({ paymentStatus: booking?.payment_status ?? "unpaid" });
  }

  const mapped = mapLeanXStatus(res.status);
  await admin
    .from("transactions")
    .update({
      status: mapped.transactionStatus,
      raw_payload: (res.raw as never) ?? undefined,
      completed_at:
        mapped.transactionStatus === "completed"
          ? new Date().toISOString()
          : null,
    })
    .eq("id", txn.id);

  await admin
    .from("bookings")
    .update({
      payment_status: mapped.paymentStatus,
      ...(mapped.paymentStatus === "paid"
        ? { status: "confirmed" as const }
        : {}),
    })
    .eq("id", txn.booking_id);

  return NextResponse.json({ paymentStatus: mapped.paymentStatus });
}
