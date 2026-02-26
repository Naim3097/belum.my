import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Houseboats — Temenggor Lake & Royal Belum",
  description:
    "Browse and filter all houseboat packages on Temenggor Lake. Compare operators, pricing, duration, and activities. Find your perfect Royal Belum rainforest experience.",
  keywords: [
    "Temenggor houseboat search",
    "Royal Belum packages",
    "houseboat booking Malaysia",
    "Temenggor Lake fishing",
    "houseboat rental Perak",
  ],
  alternates: { canonical: "https://belumplatform.com/search" },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
