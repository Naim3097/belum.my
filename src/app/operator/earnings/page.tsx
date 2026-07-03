import { redirect } from "next/navigation";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import { createClient } from "@/lib/supabase/server";
import { Wallet, Clock, CheckCircle2, Receipt } from "lucide-react";

const txStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  succeeded: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
  refunded: "bg-slate-100 text-slate-500",
};

export default async function OperatorEarningsPage() {
  const operator = await getMyOperator();
  if (!operator) redirect("/operator/onboarding");

  const supabase = await createClient();
  // RLS returns only transactions tied to this operator's bookings.
  const { data: txns } = await supabase
    .from("transactions")
    .select("*, booking:bookings(guest_name)")
    .order("created_at", { ascending: false });

  const list = txns ?? [];
  const pendingTotal = list
    .filter((t) => t.status === "pending")
    .reduce((s, t) => s + Number(t.amount), 0);
  const settledTotal = list
    .filter((t) => t.status === "succeeded")
    .reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Earnings
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Transactions for {operator.name}. Online payments go live with the
        payment gateway (coming soon).
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p className="mt-3 font-display text-2xl font-bold text-navy-900">
            RM {settledTotal.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">Settled</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Clock className="h-5 w-5 text-amber-500" />
          <p className="mt-3 font-display text-2xl font-bold text-navy-900">
            RM {pendingTotal.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">Pending</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 p-5">
          <Wallet className="h-4 w-4 text-slate-400" />
          <h2 className="font-display font-bold text-navy-900">Transactions</h2>
        </div>
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-slate-500">
            <Receipt className="h-8 w-8 text-slate-300" />
            <p className="text-sm">No transactions yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {list.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {t.booking?.guest_name ?? "Booking"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.method ?? t.provider} · {t.created_at.slice(0, 10)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      txStyles[t.status] ?? "bg-slate-100"
                    }`}
                  >
                    {t.status}
                  </span>
                  <span className="font-display font-bold text-navy-900">
                    RM {Number(t.amount).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
