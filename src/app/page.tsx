import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import BlogPreview from "@/components/BlogPreview";
import VendorTeaser from "@/components/VendorTeaser";
import Footer from "@/components/Footer";
import { getHosts } from "@/lib/queries/operators";

export const metadata: Metadata = {
  title: "Belum Platform — Houseboat Booking for Temenggor Lake & Royal Belum",
  description:
    "Book houseboats and activities on Temenggor Lake, Perak. 6 verified operators, kayaking, bamboo rafting, fishing, and Orang Asli village visits in the 130-million-year-old Royal Belum Rainforest.",
  alternates: { canonical: "https://belumplatform.com" },
};

export default async function Home() {
  const hosts = await getHosts();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero hosts={hosts} />
      <FeaturedListings hosts={hosts} />
      <HowItWorks />
      <BlogPreview />
      <VendorTeaser />
      <Footer />
    </main>
  );
}
