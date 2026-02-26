"use client";

import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfirmationPage() {
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
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </main>
  );
}
