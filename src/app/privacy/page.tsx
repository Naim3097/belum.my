import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Belum Platform collects, uses, and protects your personal information when booking houseboats on Temenggor Lake.",
  alternates: { canonical: "https://belumplatform.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          How we handle your information on Belum Platform.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-slate-600">
          <p className="text-xs text-slate-400">Last updated: June 2025</p>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              1. Information We Collect
            </h2>
            <p className="mb-2">
              When you use Belum Platform, we may collect the following
              information:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Name, email address, and phone number when you create a booking</li>
              <li>Group size and trip preferences for matching you with the right operator</li>
              <li>Payment information processed securely through our payment partners</li>
              <li>Device and browser data collected automatically for platform performance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              2. How We Use Your Information
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Process your houseboat bookings and communicate trip details</li>
              <li>Share your contact and group information with your chosen operator</li>
              <li>Send booking confirmations, reminders, and safety briefings</li>
              <li>Improve the platform and develop better features</li>
              <li>Respond to your enquiries and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              3. Information Sharing
            </h2>
            <p>
              We share your booking details (name, contact, group size) with the
              houseboat operator you book with so they can prepare for your
              trip. We do not sell your personal information to third parties. We
              may share anonymised usage data for analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              4. Data Storage & Security
            </h2>
            <p>
              Your data is stored on secure servers. We use industry-standard
              encryption for payment processing. Booking records are retained
              for a period of 24 months after your trip for reference and
              dispute resolution, after which they are deleted.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              5. Cookies
            </h2>
            <p>
              We use essential cookies to keep the platform functional (e.g.
              remembering your search preferences and booking session). We do
              not use advertising cookies. Analytics cookies are used only in
              aggregated, anonymised form.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Ask us to correct inaccurate information</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              7. Contact
            </h2>
            <p>
              For privacy-related enquiries, contact us at{" "}
              <a
                href="mailto:the.temenggor@gmail.com"
                className="font-medium text-blue-600 underline hover:text-blue-500"
              >
                the.temenggor@gmail.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+60108692982"
                className="font-medium text-blue-600 underline hover:text-blue-500"
              >
                +6010 869 2982
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
