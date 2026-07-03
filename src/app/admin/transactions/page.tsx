import { getAllTransactions } from "@/lib/queries/admin-dashboard";
import { Receipt } from "lucide-react";

const txStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  succeeded: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
  refunded: "bg-slate-100 text-slate-500",
};

export default async function AdminTransactionsPage() {
  const txns = await getAllTransactions();

  const total = txns.reduce((s, t) => s + Number(t.amount), 0);
  const settled = txns
    .filter((t) => t.status === "succeeded")
    .reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Transactions
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        {txns.length} transaction{txns.length === 1 ? "" : "s"} · RM{" "}
        {total.toLocaleString()} total · RM {settled.toLocaleString()} settled
      </p>

      {txns.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
          <Receipt className="h-10 w-10 text-slate-300" />
          <p className="text-sm">No transactions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Operator</th>
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Provider</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {txns.map((t) => (
                <tr key={t.id}>
                  <td className="p-4 text-slate-600">
                    {t.created_at.slice(0, 10)}
                  </td>
                  <td className="p-4 text-slate-600">
                    {t.booking?.operator?.name ?? "—"}
                  </td>
                  <td className="p-4 text-slate-600">
                    {t.booking?.guest_name ?? "—"}
                  </td>
                  <td className="p-4 text-slate-600">
                    {t.method ?? t.provider}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        txStyles[t.status] ?? "bg-slate-100"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-display font-bold text-navy-900">
                    RM {Number(t.amount).toLocaleString()}
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
