"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { updateOperatorProfile, type ActionState } from "../actions";
import type { OperatorRow } from "@/types/database.types";
import { AlertCircle, CheckCircle2, Upload, X, Loader2 } from "lucide-react";

const categories = ["Houseboat", "Adventure", "Eco", "Family", "Fishing"];
const BUCKET = "operator-media";

export default function ProfileForm({
  operator,
  ownerId,
}: {
  operator: OperatorRow;
  ownerId: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateOperatorProfile,
    {}
  );

  const [image, setImage] = useState<string>(operator.image ?? "");
  const [gallery, setGallery] = useState<string[]>(operator.gallery ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const supabase = createClient();

  async function uploadFile(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${ownerId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    if (error) {
      setUploadError(error.message);
      return null;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const url = await uploadFile(file);
    if (url) setImage(url);
    setUploading(false);
  }

  async function onGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError(null);
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) setGallery((g) => [...g, url]);
    }
    setUploading(false);
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.ok && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> Saved.
        </div>
      )}

      {/* Cover image */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-display font-bold text-navy-900">Cover photo</h2>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-32 overflow-hidden rounded-xl bg-slate-100">
            {image ? (
              <Image src={image} alt="Cover" fill className="object-cover" sizes="128px" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                No image
              </div>
            )}
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            <Upload className="h-4 w-4" /> Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>
      </section>

      {/* Gallery */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-display font-bold text-navy-900">Gallery</h2>
        <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {gallery.map((url, i) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100"
            >
              <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="20vw" />
              <button
                type="button"
                onClick={() => setGallery((g) => g.filter((u) => u !== url))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 text-slate-400 transition hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            <span className="text-[10px]">Add</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onGalleryChange}
            />
          </label>
        </div>
        {uploading && (
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Loader2 className="h-3 w-3 animate-spin" /> Uploading…
          </p>
        )}
        {uploadError && (
          <p className="text-xs text-rose-600">{uploadError}</p>
        )}
      </section>

      {/* Details */}
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-display font-bold text-navy-900">Details</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Houseboat name" name="name" defaultValue={operator.name} required />
          <Field label="Tagline" name="tagline" defaultValue={operator.tagline ?? ""} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-900">
              Category
            </label>
            <select
              name="category"
              defaultValue={operator.category}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Capacity"
            name="capacity"
            type="number"
            defaultValue={operator.capacity ? String(operator.capacity) : ""}
          />
          <Field label="Location" name="location" defaultValue={operator.location ?? ""} />
        </div>

        <TextArea
          label="Short description"
          name="description"
          rows={2}
          defaultValue={operator.description ?? ""}
        />
        <TextArea
          label="Full description"
          name="long_description"
          rows={5}
          defaultValue={operator.long_description ?? ""}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Captain name" name="captain" defaultValue={operator.captain ?? ""} />
        </div>
        <TextArea
          label="Captain bio"
          name="captain_bio"
          rows={3}
          defaultValue={operator.captain_bio ?? ""}
        />
        <TextArea
          label="Amenities (one per line)"
          name="amenities"
          rows={4}
          defaultValue={(operator.amenities ?? []).join("\n")}
        />
      </section>

      <button
        type="submit"
        disabled={pending || uploading}
        className="rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-navy-900">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  rows,
  defaultValue,
}: {
  label: string;
  name: string;
  rows: number;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-navy-900">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-900"
      />
    </div>
  );
}
