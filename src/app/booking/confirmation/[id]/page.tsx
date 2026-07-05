import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import PaymentReturnPoller from "./PaymentReturnPoller";
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  ArrowRight,
  Clock3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Booking confirmation",
  robots: { index: false, follow: false },
};

function bookingRef(id: string) {
  return `BLM-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "To be confirmed";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const select =
    "*, package:packages(name, duration), operator:operators(name, slug, captain, location)";

  let { data: booking } = await supabase
    .from("bookings")
    .select(select)
    .eq("id", id)
    .maybeSingle();

  // RLS returns nothing for a guest (unauthenticated) visitor. Guest bookings
  // have no customer_id and are reachable only via this unguessable ID link, so
  // fall back to a service-role read scoped to guest bookings. Registered
  // bookings still require the owning customer / operator / admin via RLS.
  if (!booking && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createServiceRoleClient();
    const { data: guestBooking } = await admin
      .from("bookings")
      .select(select)
      .eq("id", id)
      .is("customer_id", null)
      .maybeSingle();
    booking = guestBooking;
  }

  if (!booking) notFound();

  const pkg = booking.package;
  const operator = booking.operator;
  const paid = booking.payment_status === "paid";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PaymentReturnPoller
          bookingId={booking.id}
          initialStatus={booking.payment_status}
        />
        {/* Success header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-navy-900">
            Booking request received
          </h1>
          <p className="mt-2 text-slate-600">
            Reference{" "}
            <span className="font-mono font-bold text-navy-900">
              {bookingRef(booking.id)}
            </span>
          </p>
        </div>

        {/* Status banner */}
        {paid ? (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="text-sm text-emerald-800">
              <p className="font-bold">Payment received</p>
              <p>Your booking is confirmed. See you on the water!</p>
            </div>
          </div>
        ) : (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="text-sm text-amber-800">
              <p className="font-bold">Payment pending</p>
              <p>
                Your booking is reserved. If payment isn&rsquo;t completed
                online, the operator will contact you to arrange it.
              </p>
            </div>
          </div>
        )}

        {/* Details card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-6">
            <h2 className="font-display text-xl font-bold text-navy-900">
              {operator?.name}
              {pkg?.name ? ` — ${pkg.name}` : ""}
            </h2>
            {operator?.location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3 w-3" /> {operator.location}
                {operator.captain ? ` · ${operator.captain}` : ""}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">
            <Detail
              icon={<Calendar className="h-4 w-4" />}
              label="Check-in"
              value={formatDate(booking.checkin)}
            />
            <Detail
              icon={<Calendar className="h-4 w-4" />}
              label="Check-out"
              value={formatDate(booking.checkout)}
            />
            <Detail
              icon={<Users className="h-4 w-4" />}
              label="Guests"
              value={`${booking.guests_count} ${
                booking.guests_count === 1 ? "guest" : "guests"
              }`}
            />
            <Detail
              icon={<Clock3 className="h-4 w-4" />}
              label="Duration"
              value={pkg?.duration ?? "—"}
            />
            <Detail
              icon={<Mail className="h-4 w-4" />}
              label="Contact email"
              value={booking.guest_email ?? "—"}
            />
            <Detail
              icon={<Phone className="h-4 w-4" />}
              label="Contact phone"
              value={booking.guest_phone ?? "—"}
            />
          </dl>

          {/* Price breakdown */}
          <div className="space-y-2 border-t border-slate-100 p-6 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Package</span>
              <span>RM {Number(booking.base_price).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>RM {Number(booking.service_fee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Permit fees</span>
              <span>RM {Number(booking.permit_fee).toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-navy-900">
              <span>Total</span>
              <span>RM {Number(booking.total_amount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account/bookings"
            className="flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-navy-800"
          >
            View my bookings <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-bold text-navy-900 transition hover:bg-slate-50"
          >
            Browse more houseboats
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5">
      <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-medium text-navy-900">{value}</dd>
    </div>
  );
}
