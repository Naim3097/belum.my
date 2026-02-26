"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Host } from "@/data/hosts";

interface Props {
  host: Host;
}

export default function LandingNavbar({ host }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Packages", href: "#packages" },
    { name: "Activities", href: "#activities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-stone-50/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href={`/landing/${host.slug}`} className="flex flex-col items-center z-50">
          <span
            className={`font-serif text-2xl tracking-widest uppercase ${
              isScrolled ? "text-forest-900" : "text-white"
            }`}
          >
            {host.name}
          </span>
          <span
            className={`text-[0.6rem] tracking-[0.3em] uppercase ${
              isScrolled ? "text-earth-700" : "text-stone-200"
            }`}
          >
            {host.tagline}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-earth-600 ${
                isScrolled ? "text-stone-600" : "text-stone-200"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Link
            href={`/landing/${host.slug}/book`}
            className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 border ${
              isScrolled
                ? "border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-stone-50"
                : "border-white text-white hover:bg-white hover:text-forest-900"
            }`}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-forest-900" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-forest-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-stone-50 flex flex-col items-center justify-center gap-8 z-40"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-forest-900 tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-earth-700 tracking-wider"
            >
              ← Back to Marketplace
            </Link>
            <Link
              href={`/landing/${host.slug}/book`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-4 border border-forest-900 text-forest-900 tracking-widest uppercase hover:bg-forest-900 hover:text-stone-50 transition-colors"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
