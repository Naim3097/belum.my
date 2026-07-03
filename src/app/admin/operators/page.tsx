import Link from "next/link";
import { getAllOperators } from "@/lib/queries/admin-dashboard";
import { setOperatorVerified, setOperatorPublished } from "../actions";
import { ShieldCheck, Star, ExternalLink } from "lucide-react";

export default async function AdminOperatorsPage() {
  const operators = await getAllOperators();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
        Operators
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        {operators.length} houseboat operator{operators.length === 1 ? "" : "s"}{" "}
        on the platform.
      </p>

      <div className="space-y-3">
        {operators.map((o) => (
          <div
            key={o.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display font-bold text-navy-900">
                  {o.name}
                </h2>
                {o.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    o.is_published
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {o.is_published ? "Live" : "Hidden"}
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{o.category}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {Number(o.rating)}
                </span>
                <span>{o.owner?.email ?? "no owner linked"}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/host/${o.slug}`}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                title="View public page"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <form action={setOperatorVerified}>
                <input type="hidden" name="operatorId" value={o.id} />
                <input type="hidden" name="verified" value={String(o.verified)} />
                <button
                  type="submit"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  {o.verified ? "Unverify" : "Verify"}
                </button>
              </form>
              <form action={setOperatorPublished}>
                <input type="hidden" name="operatorId" value={o.id} />
                <input
                  type="hidden"
                  name="published"
                  value={String(o.is_published)}
                />
                <button
                  type="submit"
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    o.is_published
                      ? "border border-rose-200 text-rose-600 hover:bg-rose-50"
                      : "bg-navy-900 text-white hover:bg-navy-800"
                  }`}
                >
                  {o.is_published ? "Suspend" : "Publish"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
