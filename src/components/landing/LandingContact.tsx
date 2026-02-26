"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { useState } from "react";
import type { Host } from "@/data/hosts";

interface Props {
  host: Host;
}

export default function LandingContact({ host }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        interest: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-earth-600 tracking-widest uppercase text-sm mb-6 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 leading-tight">
            We&apos;d love to hear from you
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-serif text-forest-900 mb-8">
              {host.name}
            </h3>
            <p className="text-stone-600 mb-10 text-lg leading-relaxed">
              Whether you have questions about our packages, need help planning
              your stay, or simply want to learn more about {host.name} — our
              team is here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-forest-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-earth-600" />
                </div>
                <div>
                  <p className="font-medium text-forest-900 mb-1">Phone</p>
                  <a
                    href="tel:+60108692982"
                    className="text-stone-600 hover:text-forest-700 transition-colors"
                  >
                    +6010 869 2982
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-forest-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-earth-600" />
                </div>
                <div>
                  <p className="font-medium text-forest-900 mb-1">Email</p>
                  <a
                    href="mailto:the.temenggor@gmail.com"
                    className="text-stone-600 hover:text-forest-700 transition-colors"
                  >
                    the.temenggor@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-forest-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-earth-600" />
                </div>
                <div>
                  <p className="font-medium text-forest-900 mb-1">Location</p>
                  <p className="text-stone-600">
                    Jeti Awam Pulau Banding
                    <br />
                    33200 Gerik, Perak
                    <br />
                    Malaysia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-forest-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-earth-600" />
                </div>
                <div>
                  <p className="font-medium text-forest-900 mb-1">
                    Response Time
                  </p>
                  <p className="text-stone-600">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <div className="bg-white p-12 text-center rounded-sm">
                <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-7 h-7 text-stone-50" />
                </div>
                <h3 className="text-2xl font-serif text-forest-900 mb-4">
                  Message Sent
                </h3>
                <p className="text-stone-600 mb-8">
                  Thank you for your inquiry about {host.name}. We&apos;ll get
                  back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-earth-700 underline underline-offset-4 hover:text-forest-900 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-sm"
              >
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-stone-300 py-3 text-forest-900 focus:outline-none focus:border-forest-700 transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-stone-300 py-3 text-forest-900 focus:outline-none focus:border-forest-700 transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stone-300 py-3 text-forest-900 focus:outline-none focus:border-forest-700 transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    I&apos;m interested in
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stone-300 py-3 text-forest-900 focus:outline-none focus:border-forest-700 transition-colors bg-transparent appearance-none"
                  >
                    <option value="">Select an option</option>
                    {host.packages.map((pkg) => (
                      <option key={pkg.name} value={pkg.name}>
                        {pkg.name} — {pkg.duration}
                      </option>
                    ))}
                    <option value="custom">Custom Package</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full border-b border-stone-300 py-3 text-forest-900 focus:outline-none focus:border-forest-700 transition-colors bg-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-forest-900 text-stone-50 uppercase tracking-widest text-sm hover:bg-forest-700 transition-colors disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
