"use server";

import { redirect } from "next/navigation";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { createBillSilent } from "@/lib/leanx";

export type CreateBookingInput = {
  packageId: string;
  checkin: string;
  checkout: string;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  payMethod: string;
  bankId?: string; // LeanX payment_service_id when the operator has LeanX on
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * If the operator has LeanX connected, create a hosted bill and return its
 * redirect URL. Reads the operator's secret creds + updates the transaction
 * via the service-role client (a customer can't read another party's secrets).
 * Returns null to fall back to the record-only flow.
 */
async function maybeCreateLeanxBill(args: {
  operatorId: string | null;
  transactionId: string;
  bookingId: string;
  amount: number;
  fullName: string;
  email: string;
  phone: string;
  bankId?: string;
}): Promise<string | null> {
  if (!args.operatorId) return null;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;

  const admin = createServiceRoleClient();
  const { data: creds } = await admin
    .from("operator_leanx")
    .select("*")
    .eq("operator_id", args.operatorId)
    .maybeSingle();

  if (!creds?.enabled || !creds.api_key || !creds.collection_uuid) return null;

  const result = await createBillSilent(
    {
      apiKey: creds.api_key,
      collectionUuid: creds.collection_uuid,
      environment: creds.environment,
    },
    {
      amount: args.amount,
      invoiceRef: args.bookingId,
      fullName: args.fullName,
      email: args.email,
      phone: args.phone,
      redirectUrl: `${SITE_URL}/booking/confirmation/${args.bookingId}`,
      callbackUrl: `${SITE_URL}/api/payments/webhook`,
      paymentServiceId: args.bankId,
    }
  );

  if (!result.ok) return null;

  await admin
    .from("transactions")
    .update({
      provider_ref: result.billNo || null,
      redirect_url: result.redirectUrl,
      status: "processing",
    })
    .eq("id", args.transactionId);

  return result.redirectUrl;
}

const PERMIT_FEE = 300;
const SERVICE_FEE_RATE = 0.05; // platform commission

function nightsBetween(checkin: string, checkout: string): number | null {
  if (!checkin || !checkout) return null;
  const a = new Date(`${checkin}T00:00:00`);
  const b = new Date(`${checkout}T00:00:00`);
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return diff > 0 ? diff : null;
}

/**
 * Persist a booking (record-only — no real payment yet; LeanX is Phase 7).
 * Price is looked up server-side so the client cannot tamper with it.
 * Creates a `bookings` row (status=pending, payment_status=unpaid) plus a
 * matching `transactions` row. Redirects to the confirmation page on success.
 */
export async function createBooking(
  input: CreateBookingInput
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guest checkout: an unauthenticated visitor can book without an account.
  // Their booking has no customer_id, so it must be written with the
  // service-role client (RLS insert requires customer_id = auth.uid()).
  // Registered users keep RLS-scoped writes with their customer_id set.
  const isGuest = !user;
  if (isGuest && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    redirect(
      `/login?redirectTo=${encodeURIComponent(
        `/booking?listing=${input.packageId}`
      )}`
    );
  }

  // Basic server-side validation
  if (!input.checkin) return { error: "Please select a check-in date." };
  if (!input.firstName.trim() || !input.lastName.trim())
    return { error: "Your full name is required." };
  if (!input.email.includes("@")) return { error: "A valid email is required." };
  if (!input.phone.trim()) return { error: "A phone number is required." };

  // Authoritative price + operator from the package (never trust the client)
  const { data: pkg, error: pkgError } = await supabase
    .from("packages")
    .select("id, price, pax, operator_id, is_active")
    .eq("id", input.packageId)
    .maybeSingle();

  if (pkgError) return { error: pkgError.message };
  if (!pkg || !pkg.is_active || Number(pkg.price) <= 0) {
    return { error: "This package is not available for booking." };
  }

  const basePrice = Number(pkg.price);
  const serviceFee = Math.round(basePrice * SERVICE_FEE_RATE);
  const total = basePrice + serviceFee + PERMIT_FEE;

  const guestsCount = Math.min(
    Math.max(parseInt(input.guests, 10) || 1, 1),
    pkg.pax
  );

  // Guests bypass RLS via the service-role client; registered users write
  // through their own RLS-scoped session.
  const writeClient = isGuest ? createServiceRoleClient() : supabase;

  const { data: booking, error: bookingError } = await writeClient
    .from("bookings")
    .insert({
      package_id: pkg.id,
      operator_id: pkg.operator_id,
      customer_id: user?.id ?? null,
      guest_name: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
      guest_email: input.email.trim(),
      guest_phone: input.phone.trim(),
      checkin: input.checkin || null,
      checkout: input.checkout || null,
      nights: nightsBetween(input.checkin, input.checkout),
      guests_count: guestsCount,
      base_price: basePrice,
      service_fee: serviceFee,
      permit_fee: PERMIT_FEE,
      total_amount: total,
      currency: "MYR",
      status: "pending",
      payment_status: "unpaid",
    })
    .select("id")
    .single();

  if (bookingError) return { error: bookingError.message };

  const { data: txn, error: txError } = await writeClient
    .from("transactions")
    .insert({
      booking_id: booking.id,
      amount: total,
      currency: "MYR",
      provider: "leanx",
      method: input.payMethod === "fpx" ? "fpx" : "card",
      status: "pending",
      order_id: booking.id,
    })
    .select("id")
    .single();
  if (txError) return { error: txError.message };

  // Try LeanX; if the operator hasn't connected it (or it fails), fall back
  // to the record-only confirmation.
  const billUrl = await maybeCreateLeanxBill({
    operatorId: pkg.operator_id,
    transactionId: txn.id,
    bookingId: booking.id,
    amount: total,
    fullName: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    email: input.email,
    phone: input.phone,
    bankId: input.bankId,
  });

  if (billUrl) redirect(billUrl);
  redirect(`/booking/confirmation/${booking.id}`);
}
