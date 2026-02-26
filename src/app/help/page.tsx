import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Centre — Frequently Asked Questions",
  description:
    "Find answers to common questions about houseboat bookings, payments, cancellations, safety, and travel logistics on Temenggor Lake.",
  alternates: { canonical: "https://belumplatform.com/help" },
};
import {
  Ship,
  CreditCard,
  Calendar,
  Users,
  MapPin,
  Phone,
  ShieldCheck,
  Fish,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    icon: Ship,
    question: "What is included in a houseboat package?",
    answer:
      "Every houseboat package includes accommodation on the houseboat, houseboat cruise across Tasik Temenggor, speedboat transfers to activity sites, kayaking, bamboo rafting, and guided visit activities (waterfalls, Orang Asli villages, caves, salt licks). The number of visit activities depends on your package duration — 2 visits for 2D1N, 3 visits for 3D2N. Meals and add-ons vary by operator.",
  },
  {
    icon: CreditCard,
    question: "How do I book and pay?",
    answer:
      "Browse houseboats on the platform, select a package, and submit a booking request. The operator will confirm availability and provide payment instructions. Most operators accept bank transfer and online payment. A deposit is typically required to secure your booking.",
  },
  {
    icon: Calendar,
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 1–2 weeks in advance, especially for weekends and public holidays. For large groups (15+ pax) or custom/event bookings, 3–4 weeks advance notice is ideal.",
  },
  {
    icon: Users,
    question: "What is the minimum and maximum group size?",
    answer:
      "Houseboat capacity ranges from 14 to 25 persons depending on the operator. There is no strict minimum — you book the entire houseboat, so smaller groups pay the same rate. Some operators offer discounts for smaller groups on weekday departures.",
  },
  {
    icon: MapPin,
    question: "Where do I meet the houseboat?",
    answer:
      "All houseboats depart from Jeti Awam Pulau Banding, Gerik, Perak (along the East-West Highway / Route 4). It is approximately 4 hours drive from Kuala Lumpur, 2 hours from Ipoh, and 1.5 hours from Penang via the highway.",
  },
  {
    icon: Fish,
    question: "Do I need a fishing pass?",
    answer:
      "Yes. Sport fishing requires a separate fishing pass issued by the Royal Belum authorities. This is an add-on to your houseboat package. Your operator can arrange this for you — just let them know when booking.",
  },
  {
    icon: ShieldCheck,
    question: "Is it safe?",
    answer:
      "All verified operators carry life jackets for every passenger, first aid kits, and communication equipment. Captains are experienced with years of navigation on the lake. Activities are guided by trained crew. See our Safety page for more details.",
  },
  {
    icon: HelpCircle,
    question: "What should I bring?",
    answer:
      "Light, quick-dry clothing, swimwear, sunscreen, insect repellent, a hat, a raincoat or poncho (it can rain), a torch/headlamp, personal medication, and a dry bag for electronics. The operator provides all activity equipment (kayaks, life jackets, fishing gear if booked).",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Help Centre
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Frequently asked questions about booking a houseboat, what to expect,
          and how the platform works.
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {faqs.map((faq) => {
            const Icon = faq.icon;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">
                      {faq.question}
                    </h3>
                    <p className="mt-3 leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still need help */}
        <div className="mt-16 rounded-2xl bg-navy-950 p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold text-white">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">
            Contact us directly via WhatsApp or email. We usually respond within
            a few hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/60108692982"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-600 px-8 py-4 font-bold text-white transition hover:bg-navy-900"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
