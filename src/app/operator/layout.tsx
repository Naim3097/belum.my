import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { getMyOperator } from "@/lib/queries/operator-dashboard";
import OperatorSidebar from "@/components/operator/OperatorSidebar";

export const metadata: Metadata = {
  title: { default: "Operator Dashboard", template: "%s | Belum Operator" },
  robots: { index: false, follow: false },
};

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hosting is a capability of any account (Airbnb-style): any signed-in user
  // may enter — if they don't own a houseboat yet they're sent to onboarding
  // ("become a host"). Middleware already blocks unauthenticated access.
  const profile = await getProfile();
  if (!profile) redirect("/login?redirectTo=/operator");

  const operator = await getMyOperator();

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <OperatorSidebar
        operatorName={operator?.name}
        operatorSlug={operator?.slug}
      />
      <main className="flex-1 md:h-screen md:overflow-y-auto">{children}</main>
    </div>
  );
}
