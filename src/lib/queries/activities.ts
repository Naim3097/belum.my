import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
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

// Activities are a static public catalog — cache with the cookie-free anon
// client and refresh at most hourly (tag "activities" for explicit busts).
const fetchActivities = unstable_cache(
  async () => {
    const supabase = createAnonClient();
    // `order by category` sorts by the enum's defined order
    // (Water, Jungle, Culture, Wildlife), matching the original grouping.
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("category", { ascending: true })
      .order("title", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
  ["activities-all"],
  { tags: ["activities"], revalidate: 3600 }
);

const fetchActivityBySlug = unstable_cache(
  async (slug: string) => {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
  ["activity-by-slug"],
  { tags: ["activities"], revalidate: 3600 }
);

export async function getActivities(): Promise<Activity[]> {
  return (await fetchActivities()).map(mapActivity);
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const data = await fetchActivityBySlug(slug);
  return data ? mapActivity(data) : null;
}
