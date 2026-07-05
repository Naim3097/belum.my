import { getUser } from "@/lib/auth";
import { listFavoriteIds } from "@/lib/actions/favorites";
import WishlistHydrator from "./WishlistHydrator";

/**
 * Server-rendered bridge for the wishlist: reads the authenticated user (and
 * their saved houseboats) on the server — where the session cookie is reliably
 * available — and hands them to the client store via WishlistHydrator.
 */
export default async function WishlistSync() {
  const user = await getUser();
  const serverIds = user ? await listFavoriteIds() : [];
  return <WishlistHydrator userId={user?.id ?? null} serverIds={serverIds} />;
}
