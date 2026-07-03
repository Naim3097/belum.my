"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthState } from "@/app/auth/actions";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginForm({
  redirectTo = "/",
  initialError,
}: {
  redirectTo?: string;
  initialError?: string;
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    login,
    { error: initialError }
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

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
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy-900"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" />
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-navy-900 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
