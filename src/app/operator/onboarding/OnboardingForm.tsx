"use client";

import { useActionState } from "react";
import { createOperator, type ActionState } from "../actions";
import { AlertCircle, Anchor } from "lucide-react";

const categories = ["Houseboat", "Adventure", "Eco", "Family", "Fishing"];

export default function OnboardingForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createOperator,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Houseboat name *
        </label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder="e.g. The Temenggor"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-900">
            Category
          </label>
          <select
            name="category"
            defaultValue="Houseboat"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-900">
            Capacity (pax)
          </label>
          <input
            name="capacity"
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
            placeholder="e.g. 20"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Location / jetty
        </label>
        <input
          name="location"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder="e.g. Jeti Awam Pulau Banding, Gerik"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Tagline
        </label>
        <input
          name="tagline"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder="A short catchphrase"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Short description
        </label>
        <textarea
          name="description"
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder="What makes your houseboat special?"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
      >
        <Anchor className="h-4 w-4" />
        {pending ? "Creating…" : "Create my houseboat"}
      </button>
      <p className="text-center text-xs text-slate-500">
        You can add photos, packages, and full details next.
      </p>
    </form>
  );
}
