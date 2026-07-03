/**
 * Domain type for activities.
 *
 * The hardcoded catalog + sync helpers that used to live here have been
 * replaced by Supabase-backed queries in `src/lib/queries/activities.ts`.
 * This interface remains as the shared shape the UI consumes.
 */

export interface Activity {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: "Water" | "Jungle" | "Culture" | "Wildlife";
  price: number;
  included: boolean; // true = part of standard houseboat packages
}
