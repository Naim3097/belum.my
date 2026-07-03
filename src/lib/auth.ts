import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
import type { ProfileRow, UserRole } from "@/types/database.types";

/** The authenticated user (verified against Supabase), or null. */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** The current user's profile row (authoritative role lives here), or null. */
export async function getProfile(): Promise<ProfileRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return data;
}

/** Convenience: the current user's role, or null if not signed in. */
export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getProfile();
  return profile?.role ?? null;
}

/**
 * Where to land after signing in (when no explicit redirectTo). Admins go to
 * their console; everyone else goes home (Airbnb-style — hosts reach their
 * dashboard via "Switch to hosting" in the nav, not a forced redirect).
 */
export function roleHome(role: UserRole | null | undefined): string {
  if (role === "admin") return "/admin";
  return "/";
}
