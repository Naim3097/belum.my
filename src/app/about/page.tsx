import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Ship, Users, TreePine, MapPin, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Belum Platform — Houseboat Booking on Temenggor Lake",
  description:
    "Learn about Belum Platform — the booking marketplace for houseboats on Temenggor Lake, connecting travellers with verified local operators in the Royal Belum Rainforest, Perak, Malaysia.",
  alternates: { canonical: "https://belumplatform.com/about" },
};

const values = [
  {
    icon: Ship,
    title: "Houseboat-First",
    description:
      "This platform exists for one thing — connecting travellers with houseboat operators on Temenggor Lake. Every feature is built around the houseboat experience.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "We work with the local Gerik community, Orang Asli villages, fishing guides, and houseboat crews who make these experiences real.",
  },
  {
    icon: TreePine,
    title: "Rooted in Nature",
    description:
      "Royal Belum is a 130-million-year-old rainforest. Every operator on the platform is committed to responsible, low-impact tourism.",
  },
  {
    icon: Shield,
    title: "Verified Operators",
    description:
      "Every houseboat listed is verified — licensed, insured, and safety-checked. We know the operators personally.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-64 -top-64 h-[500px] w-[500px] rounded-full bg-blue-600 blur-[120px]" />
          <div className="absolute -bottom-64 -right-64 h-[500px] w-[500px] rounded-full bg-amber-500 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            About Belum
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Belum is the booking platform for houseboats and activities on
            Temenggor Lake &amp; Royal Belum State Park. We connect travellers
            directly with verified local houseboat operators and the communities
            around them.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Why We Built This
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              Temenggor Lake and Royal Belum are home to some of the most
              incredible houseboat experiences in Malaysia — cruising through
              ancient rainforest, kayaking on emerald waters, visiting Orang Asli
              villages, fishing for Kelah and Toman, and sleeping under the
              stars on a floating deck.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              But booking a houseboat has always been fragmented — WhatsApp
              messages, phone calls, word of mouth. We built Belum to give every
              operator a proper presence online and give travellers a single
              place to browse, compare, and book houseboat packages with
              confidence.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              This is not a generic travel site. It is purpose-built for the
              houseboat community on Temenggor Lake — the operators, the crews,
              the guides, the Orang Asli communities, and the travellers who
              come to experience it all.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/houseboat-01.png"
              alt="Temenggor Lake"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-navy-900">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-slate-200 p-8"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-navy-900">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-amber-500" />
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Where We Operate
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                All houseboats depart from{" "}
                <strong>Jeti Awam Pulau Banding, Gerik, Perak</strong> —
                the gateway to Royal Belum State Park and Temenggor Lake.
                Located about 4 hours north of Kuala Lumpur along the
                East-West Highway (Route 4).
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Bangunan Hentian Amanjaya, Jeti Awam Pulau Banding, 33300
                Gerik, Perak, Malaysia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white">
          Ready to explore?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">
          Browse houseboats, compare packages, and book your Temenggor Lake
          trip.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/search"
            className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Browse Houseboats
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-slate-600 px-8 py-4 font-bold text-white transition hover:bg-navy-900"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
