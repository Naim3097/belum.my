import { redirect } from "next/navigation";
import {
  getMyOperator,
  getMyOperatorBookings,
} from "@/lib/queries/operator-dashboard";
import { setBookingStatus, setBookingPayment } from "../actions";
import { MapPin, Users, Calendar, CalendarX } from "lucide-react";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-rose-50 text-rose-700",
};
const paymentStyles: Record<string, string> = {
  unpaid: "bg-slate-100 text-slate-600",
  paid: "bg-emerald-50 text-emerald-700",
  refunded: "bg-slate-100 text-slate-500",
};

function StatusButton({
  bookingId,
  status,
  label,
  intent = "default",
}: {
  bookingId: string;
  status: string;
  label: string;
  intent?: "default" | "danger" | "primary";
}) {
  const cls =
    intent === "primary"
      ? "bg-navy-900 text-white hover:bg-navy-800"
      : intent === "danger"
        ? "border border-rose-200 text-rose-600 hover:bg-rose-50"
        : "border border-slate-200 text-slate-600 hover:bg-slate-50";
  return (
    <form action={setBookingStatus}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${cls}`}
      >
        {label}
      </button>
    </form>
  );
}

function PaymentButton({
  bookingId,
  payment,
  label,
}: {
  bookingId: string;
  payment: string;
  label: string;
}) {
  return (
    <form action={setBookingPayment}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="payment" value={payment} />
      <button
        type="submit"
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        {label}
      </button>
    </form>
  );
}

export default async function OperatorBookingsPage() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  const bookings = await getMyOperatorBookings(operator.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Bookings
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Requests for {operator.name}. Confirm availability and mark payments.
      </p>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
          <CalendarX className="h-10 w-10 text-slate-300" />
          <p className="text-sm">No bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="font-display font-bold text-navy-900">
                      {b.guest_name ?? "Guest"}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        statusStyles[b.status] ?? "bg-slate-100"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        paymentStyles[b.payment_status] ?? "bg-slate-100"
                      }`}
                    >
                      {b.payment_status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {b.package?.name ?? "Package"}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {b.checkin ?? "TBC"}
                      {b.checkout ? ` → ${b.checkout}` : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {b.guests_count} pax
                    </span>
                    {b.guest_phone && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {b.guest_phone}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 font-display text-lg font-bold text-navy-900">
                  RM {Number(b.total_amount).toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                {b.status === "pending" && (
                  <>
                    <StatusButton
                      bookingId={b.id}
                      status="confirmed"
                      label="Confirm"
                      intent="primary"
                    />
                    <StatusButton
                      bookingId={b.id}
                      status="cancelled"
                      label="Cancel"
                      intent="danger"
                    />
                  </>
                )}
                {b.status === "confirmed" && (
                  <>
                    <StatusButton
                      bookingId={b.id}
                      status="completed"
                      label="Mark completed"
                      intent="primary"
                    />
                    <StatusButton
                      bookingId={b.id}
                      status="cancelled"
                      label="Cancel"
                      intent="danger"
                    />
                  </>
                )}
                {b.payment_status === "unpaid" && (
                  <PaymentButton
                    bookingId={b.id}
                    payment="paid"
                    label="Mark paid"
                  />
                )}
                {b.payment_status === "paid" && (
                  <>
                    <PaymentButton
                      bookingId={b.id}
                      payment="refunded"
                      label="Mark refunded"
                    />
                    <PaymentButton
                      bookingId={b.id}
                      payment="unpaid"
                      label="Mark unpaid"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
