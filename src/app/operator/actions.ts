"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, OperatorCategory } from "@/types/database.types";

export type ActionState = { error?: string; ok?: boolean };

const CATEGORIES: OperatorCategory[] = [
  "Houseboat",
  "Adventure",
  "Eco",
  "Family",
  "Fishing",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

async function requireUserAndOperator(
  supabase: SupabaseClient<Database>
): Promise<{ userId: string; operatorId: string } | { error: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };
  const { data: op } = await supabase
    .from("operators")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!op) return { error: "No houseboat found for your account." };
  return { userId: user.id, operatorId: op.id };
}

// ── Onboarding: create the operator's houseboat ─────────
export async function createOperator(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/operator");

  // one operator per owner
  const { data: existing } = await supabase
    .from("operators")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (existing) redirect("/operator");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Houseboat name is required." };

  const categoryRaw = String(formData.get("category") ?? "Houseboat");
  const category = (CATEGORIES as string[]).includes(categoryRaw)
    ? (categoryRaw as OperatorCategory)
    : "Houseboat";
  const capacity = parseInt(String(formData.get("capacity") ?? ""), 10) || null;

  const base = slugify(name) || "houseboat";
  const fields = {
    owner_id: user.id,
    name,
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    category,
    capacity,
    is_published: true,
  };

  // Retry with a suffix if the slug collides (RLS hides other operators, so
  // we can't reliably pre-check — rely on the unique constraint).
  for (let attempt = 0; attempt < 6; attempt++) {
    const slug = attempt === 0 ? base : `${base}-${attempt + 1}`;
    const { error } = await supabase
      .from("operators")
      .insert({ ...fields, slug });
    if (!error) {
      revalidatePath("/operator");
      redirect("/operator");
    }
    if (error.code !== "23505") return { error: error.message };
  }
  return { error: "Could not create your houseboat. Try a different name." };
}

// ── Edit operator profile ───────────────────────────────
export async function updateOperatorProfile(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return { error: ctx.error };

  const categoryRaw = String(formData.get("category") ?? "Houseboat");
  const category = (CATEGORIES as string[]).includes(categoryRaw)
    ? (categoryRaw as OperatorCategory)
    : "Houseboat";

  let gallery: string[] = [];
  try {
    const g = formData.get("gallery");
    if (g) gallery = JSON.parse(String(g));
  } catch {
    gallery = [];
  }

  const image = String(formData.get("image") ?? "").trim();

  const { error } = await supabase
    .from("operators")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim() || null,
      description: String(formData.get("description") ?? "").trim() || null,
      long_description:
        String(formData.get("long_description") ?? "").trim() || null,
      captain: String(formData.get("captain") ?? "").trim() || null,
      captain_bio: String(formData.get("captain_bio") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      category,
      capacity: parseInt(String(formData.get("capacity") ?? ""), 10) || null,
      amenities: lines(formData.get("amenities")),
      image: image || null,
      gallery,
    })
    .eq("id", ctx.operatorId);

  if (error) return { error: error.message };
  revalidatePath("/operator/profile");
  revalidatePath("/operator");
  return { ok: true };
}

// ── Packages ────────────────────────────────────────────
export async function createPackage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return { error: ctx.error };

  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  if (!name) return { error: "Package name is required." };
  if (!Number.isFinite(price) || price < 0)
    return { error: "Enter a valid price." };

  const { error } = await supabase.from("packages").insert({
    operator_id: ctx.operatorId,
    name,
    duration: String(formData.get("duration") ?? "").trim() || null,
    price,
    pax: parseInt(String(formData.get("pax") ?? ""), 10) || 1,
    highlights: lines(formData.get("highlights")),
    is_active: true,
  });
  if (error) return { error: error.message };
  revalidatePath("/operator/packages");
  return { ok: true };
}

export async function updatePackage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return { error: ctx.error };

  const id = String(formData.get("packageId") ?? "");
  const price = Number(formData.get("price"));
  if (!id) return { error: "Missing package." };
  if (!Number.isFinite(price) || price < 0)
    return { error: "Enter a valid price." };

  const { error } = await supabase
    .from("packages")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      duration: String(formData.get("duration") ?? "").trim() || null,
      price,
      pax: parseInt(String(formData.get("pax") ?? ""), 10) || 1,
      highlights: lines(formData.get("highlights")),
    })
    .eq("id", id)
    .eq("operator_id", ctx.operatorId);
  if (error) return { error: error.message };
  revalidatePath("/operator/packages");
  return { ok: true };
}

export async function togglePackageActive(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return;
  const id = String(formData.get("packageId") ?? "");
  const active = String(formData.get("active") ?? "") === "true";
  await supabase
    .from("packages")
    .update({ is_active: !active })
    .eq("id", id)
    .eq("operator_id", ctx.operatorId);
  revalidatePath("/operator/packages");
}

export async function deletePackage(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return;
  const id = String(formData.get("packageId") ?? "");
  await supabase
    .from("packages")
    .delete()
    .eq("id", id)
    .eq("operator_id", ctx.operatorId);
  revalidatePath("/operator/packages");
}

// ── Booking status ──────────────────────────────────────
const BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"];
const PAYMENT_STATUSES = ["unpaid", "paid", "refunded"];

export async function setBookingStatus(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return;
  const id = String(formData.get("bookingId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!BOOKING_STATUSES.includes(status)) return;
  await supabase
    .from("bookings")
    .update({ status: status as Database["public"]["Enums"]["booking_status"] })
    .eq("id", id)
    .eq("operator_id", ctx.operatorId);
  revalidatePath("/operator/bookings");
  revalidatePath("/operator");
}

export async function setBookingPayment(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return;
  const id = String(formData.get("bookingId") ?? "");
  const payment = String(formData.get("payment") ?? "");
  if (!PAYMENT_STATUSES.includes(payment)) return;
  await supabase
    .from("bookings")
    .update({
      payment_status:
        payment as Database["public"]["Enums"]["payment_status"],
    })
    .eq("id", id)
    .eq("operator_id", ctx.operatorId);
  revalidatePath("/operator/bookings");
  revalidatePath("/operator");
}

// ── LeanX payment credentials ───────────────────────────
export async function saveLeanxSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const ctx = await requireUserAndOperator(supabase);
  if ("error" in ctx) return { error: ctx.error };

  // Preserve existing secrets when the field is left blank (write-only UX).
  const { data: existing } = await supabase
    .from("operator_leanx")
    .select("api_key, secret_key, collection_uuid")
    .eq("operator_id", ctx.operatorId)
    .maybeSingle();

  const pick = (name: string, fallback: string | null | undefined) => {
    const v = String(formData.get(name) ?? "").trim();
    return v || fallback || null;
  };

  const environment =
    String(formData.get("environment") ?? "live") === "test" ? "test" : "live";
  const enabled = String(formData.get("enabled") ?? "") === "on";

  const { error } = await supabase.from("operator_leanx").upsert(
    {
      operator_id: ctx.operatorId,
      api_key: pick("api_key", existing?.api_key),
      secret_key: pick("secret_key", existing?.secret_key),
      collection_uuid: pick("collection_uuid", existing?.collection_uuid),
      environment,
      enabled,
    },
    { onConflict: "operator_id" }
  );

  if (error) return { error: error.message };
  revalidatePath("/operator/payments");
  return { ok: true };
}
