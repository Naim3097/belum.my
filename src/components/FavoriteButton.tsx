"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/stores/wishlist";

/**
 * Wishlist heart. `floating` = round icon button overlaid on a card image;
 * `inline` = heart + "Save"/"Saved" label for detail pages. Saves the
 * houseboat (operator id) via the shared Zustand store.
 */
export default function FavoriteButton({
  operatorId,
  variant = "floating",
  className = "",
}: {
  operatorId: string;
  variant?: "floating" | "inline";
  className?: string;
}) {
  const saved = useWishlist((s) => s.ids.includes(operatorId));
  const toggle = useWishlist((s) => s.toggle);

  function handleClick(e: React.MouseEvent) {
    // Cards wrap these in a <Link>; don't navigate when saving.
    e.preventDefault();
    e.stopPropagation();
    toggle(operatorId);
  }

  const label = saved ? "Remove from wishlist" : "Save to wishlist";

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        className={`flex items-center gap-2 text-sm font-medium transition ${
          saved ? "text-rose-500" : "text-slate-600 hover:text-rose-500"
        } ${className}`}
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-rose-500" : ""}`} />{" "}
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      className={`rounded-full p-2 backdrop-blur-sm transition hover:bg-white ${
        saved
          ? "bg-white text-rose-500"
          : "bg-white/60 text-slate-700 hover:text-rose-500"
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-rose-500" : ""}`} />
    </button>
  );
}
