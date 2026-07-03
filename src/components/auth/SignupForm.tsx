"use client";

import { useActionState } from "react";
import Link from "next/link";
import { type AuthState } from "@/app/auth/actions";
import { UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignupForm({
  action,
  cta,
  namePlaceholder = "Your name",
  redirectTo,
}: {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  cta: string;
  namePlaceholder?: string;
  redirectTo?: string;
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    {}
  );

  if (state.message) {
    return (
      <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-medium">{state.message}</p>
          <Link
            href="/login"
            className="mt-2 inline-block font-semibold text-emerald-900 underline"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {redirectTo && (
        <input type="hidden" name="redirectTo" value={redirectTo} />
      )}
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Full name
        </label>
        <input
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy-900"
          placeholder={namePlaceholder}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy-900"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy-900"
          placeholder="At least 8 characters"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
      >
        <UserPlus className="h-4 w-4" />
        {pending ? "Creating account…" : cta}
      </button>
    </form>
  );
}
