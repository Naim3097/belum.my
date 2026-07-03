import { createClient } from "@/lib/supabase/server";
import type { Host, HostPackage, Listing } from "@/data/hosts";
import type { OperatorRow, PackageRow } from "@/types/database.types";

/**
 * Supabase-backed queries returning the same Host / Listing / HostPackage
 * shapes the UI already consumes, so components don't need to change.
 *
 * These run on the server (anon client, RLS-enforced) and only ever return
 * published operators + active packages to the public site.
 */

// ── Row → domain mappers ────────────────────────────────
function mapPackage(p: PackageRow): HostPackage {
  return {
    id: p.id,
    name: p.name,
    duration: p.duration ?? "",
    price: Number(p.price),
    pax: p.pax,
    highlights: p.highlights ?? [],
  };
}

/** Order packages cheapest-first, with price-0 (custom/rental) packages last. */
function sortPackages(a: HostPackage, b: HostPackage): number {
  const av = a.price === 0 ? Infinity : a.price;
  const bv = b.price === 0 ? Infinity : b.price;
  return av - bv;
}

function mapHost(o: OperatorRow, packages: PackageRow[]): Host {
  return {
    id: o.id,
    slug: o.slug,
    name: o.name,
    tagline: o.tagline ?? "",
    description: o.description ?? "",
    longDescription: o.long_description ?? "",
    captain: o.captain ?? "",
    captainBio: o.captain_bio ?? "",
    capacity: o.capacity ?? 0,
    image: o.image ?? "",
    gallery: o.gallery ?? [],
    packages: packages.map(mapPackage).sort(sortPackages),
    amenities: o.amenities ?? [],
    rating: Number(o.rating),
    reviews: o.reviews_count,
    verified: o.verified,
    location: o.location ?? "",
    category: o.category,
    joinedYear: o.joined_year ?? 0,
    responseTime: o.response_time ?? "",
    responseRate: o.response_rate ?? 0,
  };
}

/** Build a bookable Listing from a host + one of its packages. */
function buildListing(host: Host, pkg: HostPackage): Listing {
  return {
    id: pkg.id,
    hostId: host.id,
    hostSlug: host.slug,
    hostName: host.name,
    captain: host.captain,
    packageName: pkg.name,
    title: `${host.name} — ${pkg.name}`,
    description: host.description,
    location: host.location,
    duration: pkg.duration,
    price: pkg.price,
    pax: pkg.pax,
    highlights: pkg.highlights,
    image: host.image,
    rating: host.rating,
    reviews: host.reviews,
    verified: host.verified,
    category: host.category,
    tags: [host.category, pkg.duration, `Up to ${pkg.pax} pax`],
  };
}

/** Flatten hosts → listings, skipping price-0 (custom/rental) packages. */
function flattenListings(hosts: Host[]): Listing[] {
  const listings: Listing[] = [];
  for (const host of hosts) {
    for (const pkg of host.packages) {
      if (pkg.price === 0) continue;
      listings.push(buildListing(host, pkg));
    }
  }
  return listings;
}

const OPERATOR_WITH_PACKAGES = "*, packages(*)";

// ── Public queries ──────────────────────────────────────
export async function getHosts(): Promise<Host[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select(OPERATOR_WITH_PACKAGES)
    .eq("is_published", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((o) => mapHost(o, o.packages ?? []));
}

export async function getHostBySlug(slug: string): Promise<Host | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select(OPERATOR_WITH_PACKAGES)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapHost(data, data.packages ?? []) : null;
}

export async function getHostById(id: string): Promise<Host | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select(OPERATOR_WITH_PACKAGES)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapHost(data, data.packages ?? []) : null;
}

export async function getAllListings(): Promise<Listing[]> {
  const hosts = await getHosts();
  return flattenListings(hosts);
}

export async function getListingsByHost(hostId: string): Promise<Listing[]> {
  const host = await getHostById(hostId);
  return host ? flattenListings([host]) : [];
}

/** Look up a single bookable listing by its package id. Null if not a
 *  priced/bookable package (parity with the old getAllListings filter). */
export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*, operator:operators(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data || !data.operator) return null;
  const pkg = mapPackage(data);
  if (pkg.price === 0) return null;
  const host = mapHost(data.operator, []);
  return buildListing(host, pkg);
}
