"use client";

import { Suspense } from "react";
import BookingContent from "./BookingContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
            Loading…
          </div>
        }
      >
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
