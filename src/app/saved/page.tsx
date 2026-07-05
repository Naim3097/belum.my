import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavedClient from "./SavedClient";

export const metadata: Metadata = {
  title: "Saved houseboats",
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-navy-900">
          Saved houseboats
        </h1>
        <p className="mb-8 text-slate-500">
          Your wishlist of houseboats on Temenggor Lake &amp; Royal Belum.
        </p>
        <SavedClient />
      </div>
      <Footer />
    </main>
  );
}
