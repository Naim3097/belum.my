import { getAllBookings } from "@/lib/queries/admin-dashboard";
import { CalendarX } from "lucide-react";

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

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        All bookings
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        {bookings.length} booking{bookings.length === 1 ? "" : "s"} across all
        operators.
      </p>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
          <CalendarX className="h-10 w-10 text-slate-300" />
          <p className="text-sm">No bookings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Operator</th>
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Check-in</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-4">
                    <p className="font-medium text-navy-900">
                      {b.operator?.name ?? "—"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {b.package?.name ?? ""}
                    </p>
                  </td>
                  <td className="p-4 text-slate-600">
                    {b.guest_name ?? "Guest"}
                    <p className="text-xs text-slate-400">{b.guest_email}</p>
                  </td>
                  <td className="p-4 text-slate-600">{b.checkin ?? "TBC"}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        statusStyles[b.status] ?? "bg-slate-100"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        paymentStyles[b.payment_status] ?? "bg-slate-100"
                      }`}
                    >
                      {b.payment_status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-display font-bold text-navy-900">
                    RM {Number(b.total_amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
