"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Star,
  Heart,
  MapPin,
  ChevronDown,
  Users,
  Clock,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { getAllListings, hosts, type Listing, type Host } from "@/data/hosts";

const categories: Host["category"][] = [
  "Houseboat",
  "Adventure",
  "Eco",
  "Family",
  "Fishing",
];

const durations = [
  { label: "Any duration", value: "" },
  { label: "2 Days 1 Night", value: "2D1N" },
  { label: "3 Days 2 Nights", value: "3D2N" },
];

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
            Loading results…
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  );
}

function SearchContent() {
  const allListings = getAllListings();
  const searchParams = useSearchParams();

  // Seed filters from query params (from Hero search widget)
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedHost, setSelectedHost] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "rating">(
    "rating"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

  // Apply URL params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const host = searchParams.get("host");
    const dur = searchParams.get("duration");

    if (cat) setSelectedCat(cat);
    if (host) setSelectedHost(host);
    if (dur) setSelectedDuration(dur);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...allListings];
    if (selectedCat) list = list.filter((l) => l.category === selectedCat);
    if (selectedHost) list = list.filter((l) => l.hostSlug === selectedHost);
    if (selectedDuration) {
      list = list.filter((l) => {
        if (selectedDuration === "2D1N") return l.duration.includes("2 Days");
        if (selectedDuration === "3D2N") return l.duration.includes("3 Days");
        return true;
      });
    }
    if (minPrice > 0) list = list.filter((l) => l.price >= minPrice);
    if (maxPrice < Infinity) list = list.filter((l) => l.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [allListings, selectedCat, selectedHost, selectedDuration, minPrice, maxPrice, sort]);

  return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">
              {filtered.length} packages across {categories.length} categories
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Temenggor Lake & Royal Belum State Park
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-transparent font-medium text-navy-900 outline-none"
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={`${
              showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"
            } w-full shrink-0 md:static md:block md:w-56 lg:w-64`}
          >
            <div className="mb-6 flex items-center justify-between md:hidden">
              <h2 className="font-display text-lg font-bold text-navy-900">
                Filters
              </h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Category */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-navy-900">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        setSelectedCat(selectedCat === cat ? null : cat)
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        selectedCat === cat
                          ? "bg-navy-900 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-navy-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operator */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-navy-900">
                  Operator
                </h3>
                <select
                  value={selectedHost}
                  onChange={(e) => setSelectedHost(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none transition focus:border-navy-900"
                >
                  <option value="">All operators</option>
                  {hosts.map((h) => (
                    <option key={h.id} value={h.slug}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-navy-900">
                  Duration
                </h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button
                      key={d.value}
                      onClick={() =>
                        setSelectedDuration(
                          selectedDuration === d.value ? "" : d.value
                        )
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        selectedDuration === d.value
                          ? "bg-navy-900 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-navy-900"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-bold text-navy-900">
                  Price Range
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  RM{" "}
                  {Math.min(...allListings.map((l) => l.price)).toLocaleString()}{" "}
                  – RM{" "}
                  {Math.max(...allListings.map((l) => l.price)).toLocaleString()}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-500">Min (RM)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPrice || ""}
                      onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none transition focus:border-navy-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-500">Max (RM)</label>
                    <input
                      type="number"
                      placeholder="Any"
                      value={maxPrice === Infinity ? "" : maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none transition focus:border-navy-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {(selectedCat || selectedHost || selectedDuration || minPrice > 0 || maxPrice < Infinity) && (
              <button
                onClick={() => {
                  setSelectedCat(null);
                  setSelectedHost("");
                  setSelectedDuration("");
                  setMinPrice(0);
                  setMaxPrice(Infinity);
                }}
                className="mt-6 text-sm font-medium text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg font-medium text-slate-600">
                  No packages found for this filter.
                </p>
                <button
                  onClick={() => setSelectedCat(null)}
                  className="mt-4 text-sm font-medium text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
      <Link href={`/listing/${listing.id}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <button
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
            className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur transition hover:bg-white ${
              saved ? "bg-white text-rose-500" : "bg-white/70 text-slate-700 hover:text-rose-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-rose-500" : ""}`} />
          </button>
          {listing.verified && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded bg-navy-900/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <ShieldCheck className="h-3 w-3" /> Verified
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="mb-1 flex items-start justify-between">
            <h3 className="font-display text-base font-bold text-navy-900 transition group-hover:text-blue-600 line-clamp-1">
              {listing.title}
            </h3>
            <div className="ml-2 flex shrink-0 items-center gap-1 rounded bg-slate-50 px-2 py-0.5 text-sm">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-navy-900">{listing.rating}</span>
            </div>
          </div>

          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3 w-3" /> {listing.location} &middot;{" "}
            {listing.captain}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {listing.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> Up to {listing.pax}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {listing.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <span className="block text-[11px] text-slate-400">
                Total Price
              </span>
              <span className="font-display text-xl font-bold text-navy-900">
                RM {listing.price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500"> / trip</span>
            </div>
            <span className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white transition group-hover:bg-blue-600">
              View
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
