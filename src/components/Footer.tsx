import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-navy-900">
                Belum<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              The booking platform for houseboats and activities on
              Temenggor Lake & Royal Belum. Connecting travellers with
              verified local houseboat operators and the communities
              around them.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064088498498"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/60108692982"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-emerald-500 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/thetemenggor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-pink-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="mb-6 font-display font-bold text-navy-900">
              Houseboats
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>
                <Link href="/search" className="transition hover:text-blue-600">
                  All Houseboats
                </Link>
              </li>
              <li>
                <Link href="/activities" className="transition hover:text-blue-600">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/search?category=Fishing" className="transition hover:text-blue-600">
                  Fishing Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-blue-600">
                  Blog &amp; Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 font-display font-bold text-navy-900">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>
                <Link href="/help" className="transition hover:text-blue-600">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/safety" className="transition hover:text-blue-600">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="transition hover:text-blue-600">
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-blue-600">
                  Report a Concern
                </Link>
              </li>
              <li>
                <Link href="/blog/best-time-to-visit-royal-belum" className="transition hover:text-blue-600">
                  Planning Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/guide-to-temenggor-lake-fishing" className="transition hover:text-blue-600">
                  Fishing Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="mb-6 font-display font-bold text-navy-900">
              For Partners
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>
                <Link href="/vendor" className="transition hover:text-blue-600">
                  List Your Houseboat
                </Link>
              </li>
              <li>
                <Link href="/vendor" className="transition hover:text-blue-600">
                  Operator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition hover:text-blue-600">
                  Vendor Guidelines
                </Link>
              </li>
              <li>
                <Link href="/safety" className="transition hover:text-blue-600">
                  Insurance & Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 md:flex-row">
          <span>© 2026 Belum Digital Ventures. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-navy-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-navy-900">
              Terms
            </Link>
            <Link href="/about" className="hover:text-navy-900">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
