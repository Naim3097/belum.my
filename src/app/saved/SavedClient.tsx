"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Users, ShieldCheck, HeartOff } from "lucide-react";
import { useWishlist } from "@/lib/stores/wishlist";
import {
  getSavedHouseboats,
  type SavedHouseboat,
} from "@/lib/actions/favorites";
import FavoriteButton from "@/components/FavoriteButton";

export default function SavedClient() {
  const ids = useWishlist((s) => s.ids);
  const [houseboats, setHouseboats] = useState<SavedHouseboat[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getSavedHouseboats(ids).then((res) => {
      if (!cancelled) setHouseboats(res);
    });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  // Initial load
  if (houseboats === null) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
            <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (houseboats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <HeartOff className="mb-4 h-10 w-10 text-slate-300" />
        <h2 className="font-display text-lg font-bold text-navy-900">
          No saved houseboats yet
        </h2>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Tap the heart on any houseboat to save it here for later.
        </p>
        <Link
          href="/search"
          className="mt-6 rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-navy-800"
        >
          Browse houseboats
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {houseboats.map((h) => (
        <div key={h.id} className="group">
          <Link href={`/host/${h.slug}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              {h.image && (
                <Image
                  src={h.image}
                  alt={h.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <FavoriteButton
                operatorId={h.id}
                className="absolute right-3 top-3"
              />
              {h.verified && (
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-navy-900/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </div>
              )}
              <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 backdrop-blur-sm">
                {h.category}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-bold text-navy-900 transition group-hover:text-blue-600">
                  {h.name}
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-navy-900">{h.rating}</span>
                </div>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3 w-3" /> {h.location}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <Users className="h-3 w-3" /> Up to {h.capacity} guests
              </p>
              {h.fromPrice !== null && (
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-lg font-bold text-navy-900">
                    From RM {h.fromPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500">/ trip</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
