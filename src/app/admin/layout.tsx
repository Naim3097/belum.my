import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Belum Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/login?redirectTo=/admin");
  if (profile.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 md:h-screen md:overflow-y-auto">{children}</main>
    </div>
  );
}
