import { type NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { verifyWebhookSignature, mapLeanXStatus } from "@/lib/leanx";

/**
 * LeanX payment webhook (authoritative confirmation).
 * Rules (see LEANX_INTEGRATION.md §5):
 *  - read the RAW body before parsing (signature is over raw bytes)
 *  - verify HMAC-SHA256 with the operator's secret, from x-leanx-signature
 *  - fail CLOSED (401/503) — never accept an unverified webhook
 *  - match by bill_no (provider_ref) then invoice_ref (order_id)
 *  - be idempotent
 */
export async function POST(request: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signature = request.headers.get("x-leanx-signature");

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const billNo = (body.bill_no as string) ?? null;
  const invoiceRef = (body.invoice_ref as string) ?? null;
  if (!billNo && !invoiceRef) {
    return NextResponse.json({ error: "missing reference" }, { status: 400 });
  }

  const admin = createServiceRoleClient();

  // Locate the transaction: bill_no (provider_ref) first, then invoice_ref (order_id).
  let txn: { id: string; booking_id: string | null } | null = null;
  if (billNo) {
    const { data } = await admin
      .from("transactions")
      .select("id, booking_id")
      .eq("provider_ref", billNo)
      .maybeSingle();
    txn = data;
  }
  if (!txn && invoiceRef) {
    const { data } = await admin
      .from("transactions")
      .select("id, booking_id")
      .eq("order_id", invoiceRef)
      .maybeSingle();
    txn = data;
  }
  if (!txn || !txn.booking_id) {
    return NextResponse.json({ error: "unknown transaction" }, { status: 404 });
  }

  // Operator's webhook secret (via the booking's operator).
  const { data: booking } = await admin
    .from("bookings")
    .select("operator_id")
    .eq("id", txn.booking_id)
    .maybeSingle();
  const { data: creds } = booking?.operator_id
    ? await admin
        .from("operator_leanx")
        .select("secret_key")
        .eq("operator_id", booking.operator_id)
        .maybeSingle()
    : { data: null };

  if (!verifyWebhookSignature(raw, signature, creds?.secret_key)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const mapped = mapLeanXStatus(body.status as string | undefined);

  await admin
    .from("transactions")
    .update({
      status: mapped.transactionStatus,
      provider_ref: billNo ?? undefined,
      raw_payload: body as never,
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

  return NextResponse.json({ ok: true });
}
