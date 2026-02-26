import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing your use of the Belum Platform houseboat booking service on Temenggor Lake.",
  alternates: { canonical: "https://belumplatform.com/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Terms of Service
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          The terms that govern use of Belum Platform.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-slate-600">
          <p className="text-xs text-slate-400">Last updated: June 2025</p>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              1. About Belum Platform
            </h2>
            <p>
              Belum Platform (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) is a marketplace that connects guests with
              independent houseboat operators on Temenggor Lake and Royal Belum
              State Park. We facilitate bookings but are not the operator of the
              houseboats or activities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              2. Booking & Payment
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>
                All prices are listed in Malaysian Ringgit (RM) and are
                inclusive of the stated activities and meals unless otherwise
                noted.
              </li>
              <li>
                A booking is confirmed once payment has been received and
                acknowledged by the operator.
              </li>
              <li>
                Permits (Royal Belum Pass, fishing pass) are purchased
                separately as required and are non-refundable.
              </li>
              <li>
                Group pricing is based on a standard capacity (typically 25
                persons). Changes to group size may affect pricing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              3. Guest Responsibilities
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Provide accurate information (names, contact details, group
                size) at the time of booking.
              </li>
              <li>
                Arrive at the designated jetty (Jeti Awam Pulau Banding or as
                specified) on time.
              </li>
              <li>
                Follow all safety instructions from the crew and guides.
              </li>
              <li>
                Respect the natural environment of Royal Belum — do not litter,
                disturb wildlife, or damage vegetation.
              </li>
              <li>
                Wear life jackets when required by the operator or guides.
              </li>
              <li>
                Inform the operator in advance of any medical conditions or
                dietary requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              4. Operator Responsibilities
            </h2>
            <p>
              Listed operators agree to provide the services described in their
              listing, including meals, activities, and equipment as stated.
              Operators must maintain safety standards, carry adequate equipment
              (life jackets, first aid), and ensure crew are briefed on
              emergency procedures.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              5. Cancellation
            </h2>
            <p>
              Cancellations are subject to our{" "}
              <a
                href="/cancellation"
                className="font-medium text-blue-600 underline hover:text-blue-500"
              >
                Cancellation Policy
              </a>
              . Weather-related cancellations initiated by the operator are
              eligible for a full refund or rescheduling.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              6. Liability
            </h2>
            <p>
              Belum Platform acts as a marketplace connecting guests and
              operators. We are not liable for injuries, accidents, or damages
              that occur during houseboat trips or activities. Operators are
              responsible for the safety of their vessels and guests. Guests
              participate in water and jungle activities at their own risk and
              should ensure they are physically fit for the chosen activities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              7. Content & Reviews
            </h2>
            <p>
              Users may submit reviews and photos after their trips. By
              submitting content, you grant Belum Platform a non-exclusive
              licence to display it on the platform. We reserve the right to
              remove content that is offensive, misleading, or unrelated to an
              actual booking experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              8. Changes to Terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              platform after changes constitutes acceptance. Significant changes
              will be communicated via the platform or email.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              9. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of Malaysia. Any disputes
              shall be resolved in the courts of Perak, Malaysia.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold text-navy-900">
              10. Contact
            </h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a
                href="mailto:the.temenggor@gmail.com"
                className="font-medium text-blue-600 underline hover:text-blue-500"
              >
                the.temenggor@gmail.com
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
