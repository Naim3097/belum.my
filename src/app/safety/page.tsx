import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  LifeBuoy,
  Radio,
  AlertTriangle,
  Thermometer,
  CloudRain,
  Users,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Safety Information — Houseboat Safety on Temenggor Lake",
  description:
    "Safety protocols, equipment standards, and emergency procedures for houseboat trips on Temenggor Lake and the Royal Belum Rainforest.",
  alternates: { canonical: "https://belumplatform.com/safety" },
};
import Link from "next/link";

const safetyItems = [
  {
    icon: LifeBuoy,
    title: "Life Jackets for All",
    description:
      "Every verified houseboat carries life jackets for all passengers, including children's sizes. Life jackets must be worn during speedboat transfers and water activities.",
  },
  {
    icon: Radio,
    title: "Communication Equipment",
    description:
      "All operators carry mobile phones with network coverage across most of Temenggor Lake. Expedition-class houseboats also carry satellite communication for deep-jungle trips.",
  },
  {
    icon: AlertTriangle,
    title: "First Aid & Emergency",
    description:
      "First aid kits are standard on all houseboats. Operators are trained in basic water rescue. The nearest hospital is Hospital Gerik, approximately 30–45 minutes by road from the jetty.",
  },
  {
    icon: Users,
    title: "Experienced Crew",
    description:
      "Every houseboat captain has years of navigation experience on Temenggor Lake. Jungle trekking and wildlife activities are led by trained guides, many of whom are from the local Orang Asli community.",
  },
  {
    icon: Thermometer,
    title: "Heat & Sun Safety",
    description:
      "The equatorial climate means strong sun year-round. Bring sunscreen (SPF 50+), a hat, and plenty of water. Houseboats have shaded decks, and most activities include shaded rest stops.",
  },
  {
    icon: CloudRain,
    title: "Weather & Monsoon",
    description:
      "Temenggor Lake is generally accessible year-round. During heavy rain periods (Nov–Jan), some activities may be adjusted for safety. Operators monitor weather conditions and will reschedule activities if necessary. Bring a raincoat.",
  },
  {
    icon: ShieldCheck,
    title: "Royal Belum Permit",
    description:
      "Entry to Royal Belum State Park requires a valid permit (Royal Belum Pass). This is included in all standard houseboat packages. A separate fishing pass is required for sport fishing and can be arranged through your operator.",
  },
  {
    icon: Phone,
    title: "Emergency Contacts",
    description:
      "In case of emergency, contact your houseboat operator directly. Additional emergency numbers: Malaysian Emergency (999), Hospital Gerik (+604-791 2333), Perak State Park Corporation.",
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Safety Information
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Your safety on the water and in the jungle is the top priority for
          every operator on the platform.
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {safetyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* What to bring */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
            What to Bring Checklist
          </h2>
          <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {[
              "Sunscreen (SPF 50+)",
              "Hat / cap",
              "Insect repellent",
              "Light, quick-dry clothing",
              "Swimwear",
              "Raincoat / poncho",
              "Torch / headlamp",
              "Dry bag for electronics",
              "Personal medication",
              "Comfortable shoes for trekking",
              "Reusable water bottle",
              "Camera (waterproof recommended)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Have safety concerns or need to report an issue?{" "}
            <Link
              href="/contact"
              className="font-bold text-blue-600 hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
