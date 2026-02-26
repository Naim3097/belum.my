"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, User, LogIn, HelpCircle, ShieldCheck, FileText } from "lucide-react";

const navLinks = [
  { label: "Houseboats", href: "/search" },
  { label: "Activities", href: "/activities" },
  { label: "Blog", href: "/blog" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenu(false);
      }
    }
    if (userMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenu]);

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
          <Link
            href="/vendor"
            className="text-sm font-medium text-slate-600 transition hover:text-navy-900"
          >
            List Your Houseboat
          </Link>

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
                <Link
                  href="/search"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setUserMenu(false)}
                >
                  <Search className="h-4 w-4 text-slate-400" />
                  Browse Houseboats
                </Link>
                <Link
                  href="/activities"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setUserMenu(false)}
                >
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  Activities
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <Link
                  href="/help"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setUserMenu(false)}
                >
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                  Help Centre
                </Link>
                <Link
                  href="/about"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setUserMenu(false)}
                >
                  <FileText className="h-4 w-4 text-slate-400" />
                  About Belum
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <Link
                  href="/vendor"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-navy-900 transition hover:bg-slate-50"
                  onClick={() => setUserMenu(false)}
                >
                  <LogIn className="h-4 w-4 text-navy-900" />
                  Operator Login
                </Link>
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
            href="/vendor"
            className="block py-2 text-sm font-medium text-amber-600 hover:text-amber-700"
            onClick={() => setOpen(false)}
          >
            List Your Houseboat
          </Link>
        </div>
      )}
    </header>
  );
}
