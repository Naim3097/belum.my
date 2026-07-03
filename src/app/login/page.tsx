import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "./LoginForm";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const { redirectTo, error } = await searchParams;
  const user = await getUser();
  if (user) redirect(redirectTo ?? "/");

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
            Welcome back
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            Sign in to manage your bookings.
          </p>
          <LoginForm redirectTo={redirectTo ?? "/"} initialError={error} />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Own a houseboat?{" "}
          <a href="/become-a-host" className="font-semibold text-navy-900 hover:underline">
            List it on Belum
          </a>
        </p>
      </div>
      <Footer />
    </main>
  );
}
