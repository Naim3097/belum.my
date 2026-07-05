"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { syncFavorite } from "@/lib/actions/favorites";

/**
 * Client-side wishlist of saved houseboats (keyed by operator id).
 *
 * Local-first: every toggle updates the store optimistically, persists to
 * localStorage, and calls syncFavorite — a server action that writes through to
 * Supabase for signed-in users and no-ops for guests. `ownerId` records whose
 * list is in localStorage (null = guest) so WishlistHydrator can merge a guest
 * list into an account on login and clear it on logout.
 */
type WishlistState = {
  ids: string[];
  ownerId: string | null;
  toggle: (operatorId: string) => void;
  hydrate: (ids: string[]) => void;
  setOwner: (ownerId: string | null) => void;
  reset: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      ownerId: null,

      toggle: (operatorId) => {
        const saved = get().ids.includes(operatorId);
        const ids = saved
          ? get().ids.filter((id) => id !== operatorId)
          : [...get().ids, operatorId];
        set({ ids });
        // Persists for members; the server action no-ops for guests (whose
        // list survives in localStorage until they log in).
        void syncFavorite(operatorId, !saved);
      },

      hydrate: (ids) => set({ ids: Array.from(new Set(ids)) }),
      setOwner: (ownerId) => set({ ownerId }),
      reset: () => set({ ids: [], ownerId: null }),
    }),
    {
      name: "belum-wishlist",
      partialize: (s) => ({ ids: s.ids, ownerId: s.ownerId }),
    }
  )
);
