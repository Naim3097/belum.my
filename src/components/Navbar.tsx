"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LogOut,
  HelpCircle,
  ShieldCheck,
  FileText,
  CalendarCheck,
  Anchor,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/auth/actions";
import { useWishlist } from "@/lib/stores/wishlist";
import type { UserRole } from "@/types/database.types";

const navLinks = [
  { label: "Houseboats", href: "/search" },
  { label: "Activities", href: "/activities" },
  { label: "Blog", href: "/blog" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const savedCount = useWishlist((s) => s.ids.length);
  const menuRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setEmail(null);
      setRole(null);
      setIsHost(false);
      setLoaded(true);
      return;
    }
    setEmail(user.email ?? null);
    const [{ data: profile }, { data: op }] = await Promise.all([
      supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
      supabase
        .from("operators")
        .select("slug")
        .eq("owner_id", user.id)
        .maybeSingle(),
    ]);
    setRole(profile?.role ?? null);
    setIsHost(!!op);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => sub.subscription.unsubscribe();
  }, [load]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenu(false);
      }
    }
    if (userMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenu]);

  const isAuthed = loaded && !!email;
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-navy-900 tracking-tight">
            Belum<span className="text-amber-500">.</span>
          </span>
        </Link>

        {/* Desktop search bar link */}
        <Link
          href="/search"
          className="hidden md:flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-slate-600 shadow-sm transition hover:shadow-md"
        >
          <span className="font-medium text-slate-900">Anywhere</span>
          <span className="h-4 w-px bg-slate-300" />
          <span>Any duration</span>
          <span className="h-4 w-px bg-slate-300" />
          <span>Group size</span>
          <span className="ml-1 rounded-full bg-amber-500 p-1.5 text-white">
            <Search className="h-3.5 w-3.5" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-navy-900"
            >
              {l.label}
            </Link>
          ))}

          {/* Wishlist */}
          <Link
            href="/saved"
            className="relative flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-navy-900"
          >
            <Heart className="h-4 w-4" />
            Saved
            {savedCount > 0 && (
              <span className="ml-0.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                {savedCount}
              </span>
            )}
          </Link>

          {/* Airbnb-style host CTA — swaps once we know the user */}
          {isHost ? (
            <Link
              href="/operator"
              className="text-sm font-medium text-slate-600 transition hover:text-navy-900"
            >
              Switch to hosting
            </Link>
          ) : (
            <Link
              href="/become-a-host"
              className="text-sm font-medium text-slate-600 transition hover:text-navy-900"
            >
              List Your Houseboat
            </Link>
          )}

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenu(!userMenu)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition"
            >
              <Menu className="h-4 w-4 text-slate-600" />
              <User className="h-6 w-6 rounded-full bg-slate-500 p-0.5 text-white" />
            </button>

            {userMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                {isAuthed ? (
                  <>
                    <div className="px-4 pb-2 pt-1">
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Signed in as
                      </p>
                      <p className="truncate text-sm font-medium text-navy-900">
                        {email}
                      </p>
                    </div>
                    <div className="my-1 border-t border-slate-100" />

                    {isAdmin && (
                      <MenuLink
                        href="/admin"
                        icon={<LayoutDashboard className="h-4 w-4 text-slate-400" />}
                        onClick={() => setUserMenu(false)}
                        strong
                      >
                        Admin Dashboard
                      </MenuLink>
                    )}
                    {isHost && (
                      <MenuLink
                        href="/operator"
                        icon={<Anchor className="h-4 w-4 text-slate-400" />}
                        onClick={() => setUserMenu(false)}
                        strong
                      >
                        Hosting Dashboard
                      </MenuLink>
                    )}
                    <MenuLink
                      href="/account/bookings"
                      icon={<CalendarCheck className="h-4 w-4 text-slate-400" />}
                      onClick={() => setUserMenu(false)}
                    >
                      My Bookings
                    </MenuLink>
                    <MenuLink
                      href="/saved"
                      icon={<Heart className="h-4 w-4 text-slate-400" />}
                      onClick={() => setUserMenu(false)}
                    >
                      Saved houseboats
                    </MenuLink>
                    {!isHost && (
                      <MenuLink
                        href="/become-a-host"
                        icon={<Anchor className="h-4 w-4 text-slate-400" />}
                        onClick={() => setUserMenu(false)}
                      >
                        List your houseboat
                      </MenuLink>
                    )}
                  </>
                ) : (
                  <>
                    <MenuLink
                      href="/login"
                      icon={<LogIn className="h-4 w-4 text-navy-900" />}
                      onClick={() => setUserMenu(false)}
                      strong
                    >
                      Sign in
                    </MenuLink>
                    <MenuLink
                      href="/signup"
                      icon={<UserPlus className="h-4 w-4 text-slate-400" />}
                      onClick={() => setUserMenu(false)}
                    >
                      Create account
                    </MenuLink>
                  </>
                )}

                <div className="my-1 border-t border-slate-100" />
                <MenuLink
                  href="/help"
                  icon={<HelpCircle className="h-4 w-4 text-slate-400" />}
                  onClick={() => setUserMenu(false)}
                >
                  Help Centre
                </MenuLink>
                <MenuLink
                  href="/about"
                  icon={<FileText className="h-4 w-4 text-slate-400" />}
                  onClick={() => setUserMenu(false)}
                >
                  About Belum
                </MenuLink>

                {isAuthed ? (
                  <>
                    <div className="my-1 border-t border-slate-100" />
                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="my-1 border-t border-slate-100" />
                    <MenuLink
                      href="/become-a-host"
                      icon={<ShieldCheck className="h-4 w-4 text-navy-900" />}
                      onClick={() => setUserMenu(false)}
                      strong
                    >
                      List Your Houseboat
                    </MenuLink>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-navy-900"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/saved"
            className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-navy-900"
            onClick={() => setOpen(false)}
          >
            <Heart className="h-4 w-4" /> Saved
            {savedCount > 0 && (
              <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                {savedCount}
              </span>
            )}
          </Link>

          <div className="my-2 border-t border-slate-100" />
          {isAuthed ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block py-2 text-sm font-medium text-navy-900"
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {isHost ? (
                <Link
                  href="/operator"
                  className="block py-2 text-sm font-medium text-navy-900"
                  onClick={() => setOpen(false)}
                >
                  Switch to hosting
                </Link>
              ) : (
                <Link
                  href="/become-a-host"
                  className="block py-2 text-sm font-medium text-amber-600"
                  onClick={() => setOpen(false)}
                >
                  List Your Houseboat
                </Link>
              )}
              <Link
                href="/account/bookings"
                className="block py-2 text-sm font-medium text-slate-700 hover:text-navy-900"
                onClick={() => setOpen(false)}
              >
                My Bookings
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="block py-2 text-sm font-medium text-rose-600"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/become-a-host"
                className="block py-2 text-sm font-medium text-amber-600"
                onClick={() => setOpen(false)}
              >
                List Your Houseboat
              </Link>
              <Link
                href="/login"
                className="block py-2 text-sm font-medium text-navy-900"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block py-2 text-sm font-medium text-slate-700 hover:text-navy-900"
                onClick={() => setOpen(false)}
              >
                Create account
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

function MenuLink({
  href,
  icon,
  children,
  onClick,
  strong,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  strong?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-slate-50 ${
        strong ? "font-medium text-navy-900" : "text-slate-700"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
