import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

/**
 * Refreshes the Supabase auth session on every request and keeps the auth
 * cookies in sync between the browser and server. Called from the root
 * middleware.ts.
 *
 * IMPORTANT: always return the `supabaseResponse` object as-is (or copy its
 * cookies onto any new response) so the refreshed session token is persisted.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and getUser() — it must be the
  // first call so the session is refreshed before any auth check downstream.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Authentication gate for the dashboard/account areas. Role-specific
  // authorization (operator vs admin) is enforced in each area's server
  // layout via the authoritative profiles.role — see src/lib/auth.ts.
  const protectedPrefixes = ["/operator", "/admin", "/account", "/booking"];
  const path = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some(
    (p) => path === p || path.startsWith(p + "/")
  );

  if (!user && isProtected) {
    const redirectPath = request.nextUrl.pathname + request.nextUrl.search;
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("redirectTo", redirectPath);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
