"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Anchor,
  CalendarCheck,
  Receipt,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/operators", label: "Operators", icon: Anchor },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/transactions", label: "Transactions", icon: Receipt },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-navy-800 bg-navy-950 text-slate-200 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-navy-800 p-5">
        <Link href="/" className="font-display text-lg font-bold text-white">
          Belum<span className="text-amber-400">.</span>
          <span className="ml-1 text-xs font-medium uppercase tracking-wider text-slate-400">
            Admin
          </span>
        </Link>
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
                  ? "bg-white text-navy-900"
                  : "text-slate-300 hover:bg-navy-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-navy-800 p-3">
        <Link
          href="/"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-navy-900"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-navy-900"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
