"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar as CalendarIcon,
  Users,
  Anchor,
  Coffee,
  Fish,
} from "lucide-react";
import { hosts } from "@/data/hosts";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const addons = [
  { id: "fishing", title: "Fishing Pass", price: 150, icon: Fish },
  {
    id: "special",
    title: "Special Occasion Setup",
    price: 500,
    icon: Anchor,
  },
  {
    id: "fnb_full",
    title: "Full F&B Package (Per Pax)",
    price: 120,
    icon: Coffee,
  },
];

export default function LandingBookPage() {
  const params = useParams();
  const slug = params.slug as string;
  const host = hosts.find((h) => h.slug === slug);

  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState(10);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  // Pre-select package from query param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const pkgId = searchParams.get("package");
      if (pkgId && host?.packages.some((p) => p.id === pkgId)) {
        setSelectedPackage(pkgId);
      }
    }
  }, [host]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  if (!host) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-forest-900 mb-4">
            Host Not Found
          </h1>
          <Link
            href="/"
            className="px-8 py-3 bg-forest-900 text-stone-50 uppercase tracking-widest text-sm hover:bg-forest-700 transition-colors"
          >
            Browse All Houseboats
          </Link>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const pkg = host.packages.find((p) => p.id === selectedPackage);
    if (!pkg || pkg.price === 0) return 0;

    let total = pkg.price;
    if (selectedAddons.includes("fishing")) total += 150;
    if (selectedAddons.includes("special")) total += 500;
    if (selectedAddons.includes("fnb_full")) total += 120 * guestCount;
    return total;
  };

  const selectedPkg = host.packages.find((p) => p.id === selectedPackage);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-stone-50">
        <LandingNavbar host={host} />
        <div className="pt-32 pb-20 container mx-auto px-6 md:px-12 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-forest-900 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-8 h-8 text-earth-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-forest-900 mb-6">
              Booking Submitted
            </h1>
            <p className="text-stone-600 text-lg mb-4">
              Your request for{" "}
              <strong className="text-forest-900">{selectedPkg?.name}</strong>{" "}
              on <strong className="text-forest-900">{host.name}</strong> has
              been submitted.
            </p>
            <p className="text-stone-500 mb-12">
              Our team will contact you within 24 hours to confirm availability
              and arrange payment. No payment is required at this point.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/landing/${host.slug}`}
                className="px-8 py-4 bg-forest-900 text-stone-50 uppercase tracking-widest text-sm hover:bg-forest-700 transition-colors"
              >
                Return to {host.name}
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border border-forest-900 text-forest-900 uppercase tracking-widest text-sm hover:bg-forest-900 hover:text-stone-50 transition-colors"
              >
                Browse All Houseboats
              </Link>
            </div>
          </motion.div>
        </div>
        <LandingFooter host={host} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <LandingNavbar host={host} />

      <div className="pt-32 pb-20 container mx-auto px-6 md:px-12">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-stone-200 z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-forest-900 z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative z-10 flex flex-col items-center gap-3 transition-colors duration-300 ${
                  step >= i ? "text-forest-900" : "text-stone-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif transition-colors duration-300 ${
                    step > i
                      ? "bg-forest-900 text-stone-50"
                      : step === i
                        ? "bg-stone-50 border-2 border-forest-900 text-forest-900"
                        : "bg-stone-50 border border-stone-300 text-stone-400"
                  }`}
                >
                  {step > i ? <Check className="w-4 h-4" /> : i}
                </div>
                <span className="text-xs tracking-widest uppercase hidden md:block">
                  {i === 1
                    ? "Package"
                    : i === 2
                      ? "Details"
                      : i === 3
                        ? "Enhance"
                        : "Confirm"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ─── STEP 1: Package Selection ─── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-serif text-forest-900 mb-4">
                    Select Your Journey
                  </h1>
                  <p className="text-stone-600">
                    Choose a package for{" "}
                    <strong className="text-forest-900">{host.name}</strong>.
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 ${host.packages.length >= 2 ? "md:grid-cols-2" : ""} gap-6`}
                >
                  {host.packages
                    .filter((pkg) => pkg.price > 0)
                    .map((pkg, idx) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`cursor-pointer border p-8 transition-all duration-300 ${
                          selectedPackage === pkg.id
                            ? "border-forest-900 bg-stone-100 shadow-sm"
                            : "border-stone-200 bg-white hover:border-forest-900/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-xs tracking-widest uppercase text-earth-700 block mb-2">
                              Package {String(idx + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-2xl font-serif text-forest-900">
                              {pkg.name}
                            </h3>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                              selectedPackage === pkg.id
                                ? "border-forest-900 bg-forest-900 text-white"
                                : "border-stone-300"
                            }`}
                          >
                            {selectedPackage === pkg.id && (
                              <Check className="w-3 h-3" />
                            )}
                          </div>
                        </div>

                        <div className="space-y-3 mb-8 text-sm text-stone-600">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="w-4 h-4 text-earth-700" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-earth-700" />
                            <span>Up to {pkg.pax} Persons</span>
                          </div>
                        </div>

                        <ul className="mb-8 space-y-2">
                          {pkg.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-sm text-stone-500 flex items-start gap-2"
                            >
                              <Check className="w-3 h-3 text-earth-700 mt-0.5 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-6 border-t border-stone-200">
                          <span className="text-xs tracking-widest uppercase text-stone-500 block mb-1">
                            Total Price
                          </span>
                          <span className="text-2xl font-serif text-forest-900">
                            RM {pkg.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Custom / Event card */}
                {host.packages.some((p) => p.price === 0) && (
                  <div className="mt-4 p-8 border border-stone-200 bg-white text-center">
                    <h3 className="text-xl font-serif text-forest-900 mb-2">
                      {host.packages.find((p) => p.price === 0)?.name ||
                        "Custom Event"}
                    </h3>
                    <p className="text-stone-600 mb-6">
                      We offer bespoke arrangements for corporate retreats,
                      weddings, and special occasions.
                    </p>
                    <Link
                      href={`/landing/${host.slug}#contact`}
                      className="text-sm tracking-widest uppercase text-earth-700 hover:text-forest-900 transition-colors border-b border-earth-700 pb-1"
                    >
                      Contact us for custom pricing
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── STEP 2: Date & Guests ─── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-serif text-forest-900 mb-4">
                    Journey Details
                  </h1>
                  <p className="text-stone-600">
                    When will you join us, and who is coming?
                  </p>
                </div>

                <div className="bg-white border border-stone-200 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-lg font-serif text-forest-900 mb-6 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-earth-700" />{" "}
                        Select Date
                      </h3>
                      <div className="space-y-4">
                        <label className="text-sm tracking-widest uppercase text-stone-500 block">
                          Preferred Start Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full border-b border-stone-300 py-3 focus:outline-none focus:border-forest-900 bg-transparent text-stone-800"
                        />
                        <p className="text-xs text-stone-500 mt-2">
                          * Dates are subject to availability. We will confirm
                          within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-serif text-forest-900 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-earth-700" /> Guest
                        Count
                      </h3>
                      <div className="space-y-4">
                        <label className="text-sm tracking-widest uppercase text-stone-500 block">
                          Number of Persons
                        </label>
                        <div className="flex items-center border-b border-stone-300 py-2">
                          <button
                            onClick={() =>
                              setGuestCount(Math.max(1, guestCount - 1))
                            }
                            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-forest-900"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={guestCount}
                            onChange={(e) =>
                              setGuestCount(parseInt(e.target.value) || 1)
                            }
                            className="flex-1 text-center bg-transparent focus:outline-none text-lg"
                            min="1"
                            max={host.capacity}
                          />
                          <button
                            onClick={() =>
                              setGuestCount(
                                Math.min(host.capacity, guestCount + 1)
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-forest-900"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-2">
                          * Maximum capacity is {host.capacity} persons for{" "}
                          {host.name}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Add-Ons ─── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-serif text-forest-900 mb-4">
                    Enhance Your Experience
                  </h1>
                  <p className="text-stone-600">
                    Curate your journey with our specialised offerings.
                  </p>
                </div>

                <div className="space-y-4">
                  {addons.map((addon) => {
                    const Icon = addon.icon;
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer border p-6 flex items-center justify-between transition-all duration-300 ${
                          isSelected
                            ? "border-forest-900 bg-stone-100"
                            : "border-stone-200 bg-white hover:border-forest-900/50"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isSelected
                                ? "bg-forest-900 text-white"
                                : "bg-stone-100 text-earth-700"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-serif text-lg text-forest-900">
                              {addon.title}
                            </h4>
                            <p className="text-sm text-stone-500">
                              + RM {addon.price}{" "}
                              {addon.id === "fnb_full"
                                ? "/ pax"
                                : "(Flat rate)"}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-forest-900 bg-forest-900 text-white"
                              : "border-stone-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── STEP 4: Summary & Confirm ─── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-serif text-forest-900 mb-4">
                    Review & Confirm
                  </h1>
                  <p className="text-stone-600">
                    Please review your journey details before finalizing.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Guest Details */}
                  <div className="lg:col-span-2 bg-white border border-stone-200 p-8">
                    <h3 className="text-xl font-serif text-forest-900 mb-6 border-b border-stone-200 pb-4">
                      Lead Guest Details
                    </h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs tracking-widest uppercase text-stone-500">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-forest-900 bg-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs tracking-widest uppercase text-stone-500">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-forest-900 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs tracking-widest uppercase text-stone-500">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-forest-900 bg-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs tracking-widest uppercase text-stone-500">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-forest-900 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs tracking-widest uppercase text-stone-500">
                          Special Requests
                        </label>
                        <textarea
                          rows={3}
                          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-forest-900 bg-transparent resize-none"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-forest-900 text-stone-50 p-8 h-fit sticky top-32">
                    <h3 className="text-xl font-serif mb-6 border-b border-forest-800 pb-4">
                      Journey Summary
                    </h3>

                    <div className="space-y-6 mb-8">
                      <div>
                        <span className="text-xs tracking-widest uppercase text-earth-600 block mb-1">
                          Houseboat
                        </span>
                        <p className="font-serif text-lg">{host.name}</p>
                      </div>
                      <div>
                        <span className="text-xs tracking-widest uppercase text-earth-600 block mb-1">
                          Package
                        </span>
                        <p className="font-serif text-lg">
                          {selectedPkg?.name}
                        </p>
                        <p className="text-sm text-stone-400">
                          RM {selectedPkg?.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs tracking-widest uppercase text-earth-600 block mb-1">
                            Date
                          </span>
                          <p className="text-sm">
                            {selectedDate || "Not selected"}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs tracking-widest uppercase text-earth-600 block mb-1">
                            Guests
                          </span>
                          <p className="text-sm">{guestCount} Persons</p>
                        </div>
                      </div>

                      {selectedAddons.length > 0 && (
                        <div>
                          <span className="text-xs tracking-widest uppercase text-earth-600 block mb-2">
                            Enhancements
                          </span>
                          <ul className="space-y-2 text-sm text-stone-300">
                            {selectedAddons.map((id) => {
                              const addon = addons.find((a) => a.id === id);
                              const price =
                                id === "fnb_full"
                                  ? addon!.price * guestCount
                                  : addon!.price;
                              return (
                                <li
                                  key={id}
                                  className="flex justify-between"
                                >
                                  <span>{addon?.title}</span>
                                  <span>RM {price.toLocaleString()}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-forest-800 flex justify-between items-end mb-8">
                      <span className="text-sm tracking-widest uppercase text-stone-400">
                        Total
                      </span>
                      <span className="text-3xl font-serif">
                        RM {calculateTotal().toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setConfirmed(true)}
                      className="w-full bg-earth-700 text-stone-50 py-4 uppercase tracking-widest text-sm font-medium hover:bg-earth-600 transition-colors"
                    >
                      Confirm Booking
                    </button>
                    <p className="text-xs text-center text-stone-400 mt-4">
                      No payment required yet. We will contact you to confirm
                      availability and arrange payment.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-stone-200">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-forest-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link
                href={`/landing/${host.slug}`}
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-forest-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to {host.name}
              </Link>
            )}

            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={step === 1 && !selectedPackage}
                className={`flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-sm font-medium transition-all duration-300 ${
                  step === 1 && !selectedPackage
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                    : "bg-forest-900 text-stone-50 hover:bg-forest-800"
                }`}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <LandingFooter host={host} />
    </div>
  );
}
