import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupForm from "@/components/auth/SignupForm";
import { signupCustomer } from "@/app/auth/actions";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;
  const user = await getUser();
  if (user) redirect(redirectTo ?? "/");

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
            Create your account
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            Book houseboats and activities on Temenggor Lake — and list your own
            anytime.
          </p>
          <SignupForm
            action={signupCustomer}
            cta="Create account"
            redirectTo={redirectTo}
          />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href={
              redirectTo
                ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
                : "/login"
            }
            className="font-semibold text-navy-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
