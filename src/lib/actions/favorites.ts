"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Wishlist server actions. Favorites are keyed by houseboat (operator id).
 * Guests keep their wishlist in the browser (Zustand persist) — these actions
 * are no-ops without a session — and it's merged into their account on login.
 */

/** Persist a single toggle for the signed-in user. No-op for guests. */
export async function syncFavorite(
  operatorId: string,
  saved: boolean
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return; // guest — localStorage only

  if (saved) {
    await supabase
      .from("favorites")
      .upsert({ user_id: user.id, operator_id: operatorId });
  } else {
    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("operator_id", operatorId);
  }
}

/** The signed-in user's saved houseboat ids (empty for guests). */
export async function listFavoriteIds(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("favorites")
    .select("operator_id")
    .eq("user_id", user.id);
  return (data ?? []).map((r) => r.operator_id);
}

/**
 * On login, fold any local (guest) favorites into the account, then return the
 * full merged id list. Invalid ids (e.g. a since-deleted houseboat) are ignored.
 */
export async function mergeFavorites(localIds: string[]): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const clean = Array.from(new Set(localIds)).filter(Boolean);
  if (clean.length > 0) {
    await supabase
      .from("favorites")
      .upsert(
        clean.map((operator_id) => ({ user_id: user.id, operator_id })),
        { ignoreDuplicates: true }
      );
  }

  return listFavoriteIds();
}

export type SavedHouseboat = {
  id: string;
  slug: string;
  name: string;
  image: string;
  location: string;
  capacity: number;
  rating: number;
  category: string;
  verified: boolean;
  fromPrice: number | null;
};

/**
 * Card data for the /saved page. Takes ids from the client store (works for
 * both guests and members) and returns only published houseboats that still
 * have a bookable package. Silently drops ids that no longer qualify.
 */
export async function getSavedHouseboats(
  ids: string[]
): Promise<SavedHouseboat[]> {
  const clean = Array.from(new Set(ids)).filter(Boolean);
  if (clean.length === 0) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("operators")
    .select(
      "id, slug, name, image, location, capacity, rating, category, verified, packages(price, is_active)"
    )
    .in("id", clean)
    .eq("is_published", true);

  return (data ?? [])
    .map((o) => {
      const priced = (o.packages ?? [])
        .filter((p) => p.is_active && Number(p.price) > 0)
        .map((p) => Number(p.price));
      return {
        id: o.id,
        slug: o.slug,
        name: o.name,
        image: o.image ?? "",
        location: o.location ?? "",
        capacity: o.capacity ?? 0,
        rating: Number(o.rating),
        category: o.category,
        verified: o.verified,
        fromPrice: priced.length ? Math.min(...priced) : null,
      };
    })
    .filter((h) => h.fromPrice !== null);
}
