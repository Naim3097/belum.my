import Link from "next/link";
import {
  getAllBookings,
  getPlatformCounts,
  computePlatformMetrics,
  computeMonthlyTrend,
  type TrendPoint,
} from "@/lib/queries/admin-dashboard";
import {
  Banknote,
  TrendingUp,
  Anchor,
  CalendarCheck,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";

function money(n: number) {
  return `RM ${n.toLocaleString()}`;
}

export default async function AdminOverview() {
  const [bookings, counts] = await Promise.all([
    getAllBookings(),
    getPlatformCounts(),
  ]);
  const m = computePlatformMetrics(bookings, counts);
  const trend = computeMonthlyTrend(bookings, 6);
  const recent = bookings.slice(0, 6);

  const kpis = [
    { label: "Gross booking value", value: money(m.gmv), icon: TrendingUp, hint: "All bookings" },
    { label: "Platform revenue", value: money(m.revenue), icon: Banknote, hint: "5% service fees" },
    { label: "Operators", value: String(m.operators), icon: Anchor },
    { label: "Bookings", value: String(m.bookings), icon: CalendarCheck, hint: `${m.pendingBookings} pending` },
    { label: "Customers", value: String(m.customers), icon: Users },
    { label: "Paid bookings", value: String(m.paidBookings), icon: Clock },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Platform overview
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Belum marketplace at a glance.
      </p>

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <Icon className="h-5 w-5 text-slate-400" />
              <p className="mt-3 font-display text-2xl font-bold text-navy-900">
                {k.value}
              </p>
              <p className="text-xs text-slate-500">
                {k.label}
                {k.hint ? ` · ${k.hint}` : ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Trend */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display font-bold text-navy-900">
            Gross booking value
          </h2>
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Last 6 months
          </span>
        </div>
        <TrendBars data={trend} />
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="font-display font-bold text-navy-900">
            Recent bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-blue-600"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">
            No bookings across the platform yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {b.operator?.name ?? "—"} · {b.package?.name ?? "Package"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {b.guest_name ?? "Guest"} · {b.checkin ?? "TBC"} ·{" "}
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

/** Minimal, accessible monthly bar chart using the app's palette. */
function TrendBars({ data }: { data: TrendPoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.gmv));
  return (
    <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
      {data.map((d, i) => {
        const pct = (d.gmv / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-md ${
                  isLast ? "bg-amber-500" : "bg-navy-900"
                }`}
                style={{ height: `${Math.max(pct, 2)}%` }}
                title={`${d.label}: RM ${d.gmv.toLocaleString()} (${d.count} bookings)`}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
