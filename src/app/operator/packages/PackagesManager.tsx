"use client";

import { useActionState, useEffect, useState } from "react";
import {
  createPackage,
  updatePackage,
  togglePackageActive,
  deletePackage,
  type ActionState,
} from "../actions";
import type { PackageRow } from "@/types/database.types";
import { Plus, Pencil, Trash2, AlertCircle, X } from "lucide-react";

export default function PackagesManager({
  packages,
}: {
  packages: PackageRow[];
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> Add package
        </button>
      )}

      {adding && (
        <PackageForm
          title="New package"
          action={createPackage}
          onClose={() => setAdding(false)}
        />
      )}

      {packages.length === 0 && !adding ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No packages yet. Add one so travellers can book your houseboat.
        </p>
      ) : (
        <div className="space-y-4">
          {packages.map((p) =>
            editingId === p.id ? (
              <PackageForm
                key={p.id}
                title="Edit package"
                action={updatePackage}
                pkg={p}
                onClose={() => setEditingId(null)}
              />
            ) : (
              <div
                key={p.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-navy-900">
                      {p.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {p.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {p.duration ?? "—"} · up to {p.pax} pax
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-bold text-navy-900">
                    RM {Number(p.price).toLocaleString()}
                  </span>
                  <button
                    onClick={() => setEditingId(p.id)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <form action={togglePackageActive}>
                    <input type="hidden" name="packageId" value={p.id} />
                    <input
                      type="hidden"
                      name="active"
                      value={String(p.is_active)}
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      {p.is_active ? "Hide" : "Show"}
                    </button>
                  </form>
                  <form action={deletePackage}>
                    <input type="hidden" name="packageId" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function PackageForm({
  title,
  action,
  pkg,
  onClose,
}: {
  title: string;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  pkg?: PackageRow;
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {}
  );

  // Close on successful save
  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-navy-900/20 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-navy-900">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {pkg && <input type="hidden" name="packageId" value={pkg.id} />}

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Package name *
        </label>
        <input
          name="name"
          required
          defaultValue={pkg?.name ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder="e.g. 2D1N Houseboat Cruise"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-900">
            Price (RM) *
          </label>
          <input
            name="price"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={pkg ? Number(pkg.price) : ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-900">
            Max pax
          </label>
          <input
            name="pax"
            type="number"
            min={1}
            defaultValue={pkg?.pax ?? 1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-900">
            Duration
          </label>
          <input
            name="duration"
            defaultValue={pkg?.duration ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
            placeholder="2 Days 1 Night"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-900">
          Highlights (one per line)
        </label>
        <textarea
          name="highlights"
          rows={4}
          defaultValue={(pkg?.highlights ?? []).join("\n")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
          placeholder={"Kayaking & bamboo rafting\nBBQ dinner on the houseboat"}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save package"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
