"use client";

import { useEffect } from "react";
import { useWishlist } from "@/lib/stores/wishlist";
import { mergeFavorites } from "@/lib/actions/favorites";

/**
 * Seeds the wishlist store from server-known auth (passed as props — the
 * browser Supabase client can't be trusted to read the session cookie here).
 *
 * - Signed in: fold any purely-local guest saves into the account, then hydrate
 *   from the server (source of truth), and stamp the list's owner.
 * - Signed out: if the persisted list belonged to a user, this is a logout on
 *   this browser — clear it so the next visitor starts fresh.
 */
export default function WishlistHydrator({
  userId,
  serverIds,
}: {
  userId: string | null;
  serverIds: string[];
}) {
  useEffect(() => {
    const store = useWishlist.getState();

    if (!userId) {
      if (store.ownerId) store.reset();
      return;
    }

    // Only merge saves made while genuinely a guest (ownerId null); a list left
    // behind by a different account is discarded in favour of the server's.
    const guestIds = store.ownerId ? [] : store.ids;

    (async () => {
      const ids = guestIds.length ? await mergeFavorites(guestIds) : serverIds;
      useWishlist.getState().hydrate(ids);
      useWishlist.getState().setOwner(userId);
    })();
    // Re-runs whenever the server-known identity changes (auth transitions are
    // full navigations, so this remounts with a fresh userId).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return null;
}
