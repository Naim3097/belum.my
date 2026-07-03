/**
 * Domain types for operators (hosts), their packages, and bookable listings.
 *
 * The hardcoded data + sync helper functions that used to live here have been
 * replaced by Supabase-backed queries in `src/lib/queries/operators.ts`.
 * These interfaces remain as the shared shapes the UI consumes.
 */

export interface HostPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  pax: number;
  highlights: string[];
}

export interface Host {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  captain: string;
  captainBio: string;
  capacity: number;
  image: string;
  gallery: string[];
  packages: HostPackage[];
  amenities: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  location: string;
  category: "Houseboat" | "Adventure" | "Eco" | "Family" | "Fishing";
  joinedYear: number;
  responseTime: string;
  responseRate: number;
}

/** A flattened, bookable package (one package of one host). */
export interface Listing {
  id: string;
  hostId: string;
  hostSlug: string;
  hostName: string;
  captain: string;
  packageName: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  pax: number;
  highlights: string[];
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
  category: Host["category"];
  tags: string[];
}
