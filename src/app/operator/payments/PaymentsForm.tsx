"use client";

import { useActionState, useState } from "react";
import { saveLeanxSettings, type ActionState } from "../actions";
import type { OperatorLeanxRow } from "@/types/database.types";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";

export default function PaymentsForm({
  leanx,
}: {
  leanx: OperatorLeanxRow | null;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveLeanxSettings,
    {}
  );

  const [showAuth, setShowAuth] = useState(false);
  const [showHash, setShowHash] = useState(false);

  const hasApiKey = !!leanx?.api_key;
  const hasSecret = !!leanx?.secret_key;
  const ready = hasApiKey && !!leanx?.collection_uuid;

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.ok && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> Payment settings saved.
        </div>
      )}

      {/* Gateway card */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Card header with enable toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-navy-900">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-navy-900">
                LeanX Gateway
              </h2>
              <p className="text-sm text-slate-500">
                Secure FPX &amp; bank processing.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={leanx?.enabled ?? false}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-5" />
          </label>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-900">
                Environment
              </label>
              <select
                name="environment"
                defaultValue={leanx?.environment ?? "live"}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
              >
                <option value="live">Live Production</option>
                <option value="test">Test / Sandbox</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-900">
                Collection UUID <span className="text-rose-500">*</span>
              </label>
              <input
                name="collection_uuid"
                defaultValue={leanx?.collection_uuid ?? ""}
                placeholder="Dc-… / CL-…"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
              />
            </div>
          </div>

          {/* Auth token */}
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-900">
              Auth Token <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                name="api_key"
                type={showAuth ? "text" : "password"}
                placeholder={
                  hasApiKey ? "•••••••• (leave blank to keep)" : "LP-…"
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm outline-none focus:border-navy-900"
              />
              <button
                type="button"
                onClick={() => setShowAuth((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showAuth ? "Hide" : "Show"}
              >
                {showAuth ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Starts with <code>LP-</code>. Sent as the auth-token header.
            </p>
          </div>

          {/* Hash key */}
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-900">
              Hash Key{" "}
              <span className="text-xs font-normal text-slate-400">
                (recommended)
              </span>
            </label>
            <div className="relative">
              <input
                name="secret_key"
                type={showHash ? "text" : "password"}
                placeholder={
                  hasSecret ? "•••••••• (leave blank to keep)" : "whsec_…"
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm outline-none focus:border-navy-900"
              />
              <button
                type="button"
                onClick={() => setShowHash((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showHash ? "Hide" : "Show"}
              >
                {showHash ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Verifies LeanX webhooks (starts with <code>whsec_</code>). Optional,
              but strongly recommended so payments confirm instantly and can&rsquo;t
              be forged.
            </p>
          </div>

          {/* Status */}
          <div
            className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
              ready
                ? "bg-emerald-50 text-emerald-800"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            {ready ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            )}
            <div>
              <p className="font-medium">
                {ready ? "Ready to transact" : "Not connected yet"}
              </p>
              <p>
                {ready
                  ? "This configuration lets Belum fetch your bank list and process payments via the LeanX API."
                  : "Enter your Auth Token and Collection UUID to start accepting online payments."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save payment settings"}
      </button>

      {/* Help */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display font-bold text-navy-900">
          <Info className="h-4 w-4" /> How to get your LeanX credentials
        </h3>
        <ol className="list-inside list-decimal space-y-1.5 text-sm text-slate-600">
          <li>Log in to your LeanX merchant dashboard.</li>
          <li>
            Go to <span className="font-medium">Settings → API Credentials</span>.
          </li>
          <li>
            Copy your <span className="font-medium">Auth Token</span> (starts with{" "}
            <code>LP-</code>).
          </li>
          <li>
            Create or find your{" "}
            <span className="font-medium">Collection UUID</span> (starts with{" "}
            <code>Dc-</code> or <code>CL-</code>).
          </li>
          <li>
            Copy your <span className="font-medium">Hash Key</span> for webhook
            verification.
          </li>
          <li>
            In LeanX, set your webhook callback URL to{" "}
            <code>/api/payments/webhook</code> on your domain.
          </li>
        </ol>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <span className="font-bold">Required:</span> Auth Token and Collection
          UUID are required for payments to work. Hash Key is recommended for
          webhook security. Your credentials are stored privately and never shown
          on your public page.
        </p>
        <a
          href="https://leanx.io"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-navy-900 hover:underline"
        >
          Don&rsquo;t have a LeanX account? Sign up here →
        </a>
      </section>
    </form>
  );
}
