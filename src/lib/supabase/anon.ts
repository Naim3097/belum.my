import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Cookie-free anon Supabase client for PUBLIC reads only.
 *
 * Unlike the SSR `createClient` (server.ts), this reads no cookies and holds no
 * session, so it can run inside `unstable_cache` without pulling in dynamic
 * request state. It runs as the `anon` role, so RLS still limits it to public
 * data (published operators, active packages, activities). Never use it for
 * anything user-scoped — it has no session.
 */
export function createAnonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
