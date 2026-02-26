"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "Booking enquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  }
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Questions about booking a houseboat, activity availability, or your
          upcoming trip? Reach out and we&rsquo;ll get back to you.
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
                Get in Touch
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                For booking enquiries, contact the houseboat operator directly
                through their listing page. For platform and general enquiries,
                use the details below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">Phone / WhatsApp</p>
                  <p className="mt-1 text-sm text-slate-500">
                    +6010 869 2982
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">Email</p>
                  <p className="mt-1 text-sm text-slate-500">
                    the.temenggor@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">Location</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Bangunan Hentian Amanjaya
                    <br />
                    Jeti Awam Pulau Banding
                    <br />
                    33300 Gerik, Perak, Malaysia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">Operating Hours</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Daily: 8:00 AM – 6:00 PM (MYT)
                    <br />
                    WhatsApp replies within 1–2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:col-span-3">
            <h2 className="mb-6 font-display text-xl font-bold text-navy-900">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900">
                  Message Sent!
                </h3>
                <p className="max-w-sm text-sm text-slate-500">
                  Thank you, {form.name || "friend"}. We&rsquo;ve received your message and will
                  reply within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "Booking enquiry", message: "" }); }}
                  className="mt-2 text-sm font-medium text-blue-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+60 12 345 6789"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                >
                  <option>Booking enquiry</option>
                  <option>Activity availability</option>
                  <option>Group / corporate trip</option>
                  <option>Become a houseboat operator</option>
                  <option>Report a concern</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your trip plans, group size, preferred dates..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-4 font-bold text-white transition hover:bg-blue-600 disabled:opacity-60"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending…
                  </span>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500">
                We typically respond within 1 business day.
              </p>
            </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
