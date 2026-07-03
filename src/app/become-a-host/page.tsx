import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUser } from "@/lib/auth";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import { Anchor, TrendingUp, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "List your houseboat",
  description:
    "Become a houseboat operator on Belum Platform. Reach travellers exploring Temenggor Lake & Royal Belum.",
};

export default async function BecomeAHostPage() {
  const user = await getUser();

  // Already hosting → straight to the dashboard.
  if (user) {
    const operator = await getMyOperator();
    if (operator) redirect("/operator");
  }

  // Logged-in non-host starts onboarding; a visitor signs up first (and is
  // returned to onboarding afterwards).
  const primaryHref = user ? "/operator" : "/signup?redirectTo=/operator";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Pitch */}
        <div>
          <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            List your houseboat on Belum
          </h1>
          <p className="mt-4 text-slate-600">
            Turn your account into a host account in minutes. Reach travellers
            looking to explore Temenggor Lake and the Royal Belum Rainforest —
            and manage your packages, bookings, and earnings from one dashboard.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <Anchor className="mt-0.5 h-5 w-5 text-amber-500" />
              <span className="text-sm text-slate-600">
                Publish your houseboat and packages in minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-amber-500" />
              <span className="text-sm text-slate-600">
                Get booking requests from travellers on the platform.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="mt-0.5 h-5 w-5 text-amber-500" />
              <span className="text-sm text-slate-600">
                Track transactions and earnings in your hosting dashboard.
              </span>
            </li>
          </ul>
        </div>

        {/* CTA card */}
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-1 font-display text-xl font-bold text-navy-900">
              Start hosting
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              {user
                ? "You’ll set up your houseboat profile next."
                : "Create your free account, then set up your houseboat."}
            </p>
            <Link
              href={primaryHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 font-bold text-white transition hover:bg-navy-800"
            >
              {user ? "Set up my houseboat" : "Get started"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {!user && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login?redirectTo=/operator"
                  className="font-semibold text-navy-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            The same account you book trips with can host — no separate login.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
