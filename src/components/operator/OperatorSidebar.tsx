"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Anchor,
  Wallet,
  CreditCard,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

const links = [
  { href: "/operator", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/operator/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/operator/packages", label: "Packages", icon: Package },
  { href: "/operator/profile", label: "Houseboat Profile", icon: Anchor },
  { href: "/operator/earnings", label: "Earnings", icon: Wallet },
  { href: "/operator/payments", label: "Payments", icon: CreditCard },
];

export default function OperatorSidebar({
  operatorName,
  operatorSlug,
}: {
  operatorName?: string | null;
  operatorSlug?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-slate-100 p-5">
        <Link href="/" className="font-display text-lg font-bold text-navy-900">
          Belum<span className="text-amber-500">.</span>
          <span className="ml-1 text-xs font-medium uppercase tracking-wider text-slate-400">
            Operator
          </span>
        </Link>
        {operatorName && (
          <p className="mt-1 truncate text-sm text-slate-500">{operatorName}</p>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((l) => {
          const active = l.exact
            ? pathname === l.href
            : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-navy-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        {operatorSlug && (
          <Link
            href={`/host/${operatorSlug}`}
            className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" />
            View public page
          </Link>
        )}
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
