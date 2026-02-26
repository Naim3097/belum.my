import Link from "next/link";
import type { Host } from "@/data/hosts";

interface Props {
  host: Host;
}

export default function LandingFooter({ host }: Props) {
  return (
    <footer className="bg-forest-900 text-stone-200 py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-3xl mb-4 text-stone-50">{host.name}</h3>
            <p className="text-stone-400 max-w-sm mb-8 leading-relaxed">
              {host.description}
            </p>
            <p className="text-sm tracking-widest uppercase text-earth-600">
              {host.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-stone-50">Contact</h4>
            <ul className="space-y-4 text-stone-400">
              <li>+6010 869 2982</li>
              <li>the.temenggor@gmail.com</li>
              <li className="leading-relaxed">
                Jeti Awam Pulau Banding<br />
                33300 Gerik, Perak<br />
                Malaysia
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-stone-50">Explore</h4>
            <ul className="space-y-4 text-stone-400">
              <li>
                <a href="#experience" className="hover:text-earth-600 transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-earth-600 transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-earth-600 transition-colors">
                  Activities
                </a>
              </li>
              <li>
                <Link href={`/landing/${host.slug}/book`} className="hover:text-earth-600 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-earth-600 transition-colors">
                  Browse All Houseboats
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-forest-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} The Temenggor Ventures (202503024462). All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
