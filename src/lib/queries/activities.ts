import { createClient } from "@/lib/supabase/server";
import type { Activity } from "@/data/activities";
import type { ActivityRow } from "@/types/database.types";

/**
 * Supabase-backed activity queries returning the same Activity shape the UI
 * already consumes. Activities are a public global catalog (RLS: public read).
 */

function mapActivity(a: ActivityRow): Activity {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    description: a.description ?? "",
    image: a.image ?? "",
    duration: a.duration ?? "",
    difficulty: a.difficulty,
    category: a.category,
    price: Number(a.price),
    included: a.included,
  };
}

export async function getActivities(): Promise<Activity[]> {
  const supabase = await createClient();
  // `order by category` sorts by the enum's defined order
  // (Water, Jungle, Culture, Wildlife), matching the original grouping.
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("category", { ascending: true })
    .order("title", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapActivity);
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapActivity(data) : null;
}
