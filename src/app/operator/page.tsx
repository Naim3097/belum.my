import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getMyOperator,
  getMyOperatorBookings,
  getMyPackages,
  computeMetrics,
} from "@/lib/queries/operator-dashboard";
import {
  Wallet,
  CalendarCheck,
  Clock,
  CalendarClock,
  ArrowRight,
  Package,
  AlertTriangle,
} from "lucide-react";

function money(n: number) {
  return `RM ${n.toLocaleString()}`;
}

export default async function OperatorOverview() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  const [bookings, packages] = await Promise.all([
    getMyOperatorBookings(operator.id),
    getMyPackages(operator.id),
  ]);
  const m = computeMetrics(bookings);
  const recent = bookings.slice(0, 5);

  const stats = [
    { label: "Earnings (paid)", value: money(m.earned), icon: Wallet },
    { label: "Total bookings", value: String(m.totalBookings), icon: CalendarCheck },
    { label: "Pending", value: String(m.pendingBookings), icon: Clock },
    { label: "Upcoming trips", value: String(m.upcomingTrips), icon: CalendarClock },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">
            Welcome back, {operator.name}
          </h1>
          <p className="text-sm text-slate-500">
            {operator.is_published ? "Live on Belum" : "Not published"} ·{" "}
            {packages.length} package{packages.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/operator/bookings"
          className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-800"
        >
          Manage bookings
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <Icon className="h-5 w-5 text-slate-400" />
              <p className="mt-3 font-display text-2xl font-bold text-navy-900">
                {s.value}
              </p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Nudges */}
      {packages.length === 0 && (
        <Link
          href="/operator/packages"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 transition hover:bg-amber-100"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span className="flex-1">
            You have no bookable packages yet. Add one so travellers can book.
          </span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      {/* Recent bookings */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="font-display font-bold text-navy-900">
            Recent bookings
          </h2>
          <Link
            href="/operator/bookings"
            className="flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-blue-600"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-slate-500">
            <Package className="h-8 w-8 text-slate-300" />
            <p className="text-sm">No bookings yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {b.guest_name ?? "Guest"} · {b.package?.name ?? "Package"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {b.checkin ?? "TBC"} · {b.guests_count} pax ·{" "}
                    <span className="uppercase">{b.status}</span>
                  </p>
                </div>
                <span className="shrink-0 font-display font-bold text-navy-900">
                  {money(Number(b.total_amount))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
