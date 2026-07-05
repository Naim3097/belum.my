"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

async function isAdmin(): Promise<boolean> {
  const profile = await getProfile();
  return profile?.role === "admin";
}

export async function setOperatorVerified(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const supabase = await createClient();
  const id = String(formData.get("operatorId") ?? "");
  const verified = String(formData.get("verified") ?? "") === "true";
  await supabase.from("operators").update({ verified: !verified }).eq("id", id);
  updateTag("operators"); // bust public listing caches
  revalidatePath("/admin/operators");
  revalidatePath("/admin");
}

export async function setOperatorPublished(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const supabase = await createClient();
  const id = String(formData.get("operatorId") ?? "");
  const published = String(formData.get("published") ?? "") === "true";
  await supabase
    .from("operators")
    .update({ is_published: !published })
    .eq("id", id);
  updateTag("operators"); // bust public listing caches
  revalidatePath("/admin/operators");
  revalidatePath("/admin");
}
