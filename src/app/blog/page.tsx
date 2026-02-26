import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title:
    "Blog — Temenggor Lake & Royal Belum Guides, Stories & Travel Tips | Belum Platform",
  description:
    "Explore travel guides, fishing tips, wildlife spotting advice, cultural stories, and waterfall trails for Temenggor Lake and Royal Belum Rainforest. Written by local houseboat captains and the editorial team.",
  keywords: [
    "Temenggor Lake blog",
    "Royal Belum travel guide",
    "Temenggor fishing guide",
    "Royal Belum wildlife",
    "Orang Asli culture",
    "Royal Belum waterfalls",
    "houseboat trip tips",
    "Perak rainforest",
  ],
  openGraph: {
    title: "Blog — Temenggor Lake & Royal Belum Guides | Belum Platform",
    description:
      "Travel guides, fishing tips, cultural stories, and adventure inspiration from Malaysia's oldest rainforest.",
    url: "https://belumplatform.com/blog",
    siteName: "Belum Platform",
    type: "website",
  },
  alternates: {
    canonical: "https://belumplatform.com/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
