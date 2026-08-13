"use client";

import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Get In Touch
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Contact
            <span className="text-yellow-400"> Us</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Have a question about a vehicle, payment, rental or
            anything else? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Info */}
          <div className="space-y-5">
            <ContactInfo
              icon={<Phone className="h-6 w-6" />}
              title="Phone"
              value="+44 151 639 7799"
            />

            <ContactInfo
              icon={<Mail className="h-6 w-6" />}
              title="Email"
              value="info@easybuyandrent.com"
            />

            <ContactInfo
              icon={<MapPin className="h-6 w-6" />}
              title="Location"
              value="United Kingdom"
            />

            <ContactInfo
              icon={<Clock3 className="h-6 w-6" />}
              title="Opening Hours"
              value="Mon - Sat: 9:00 AM - 6:00 PM"
            />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border bg-white p-6 shadow-sm md:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
                  Send Message
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  How Can We Help?
                </h2>
              </div>

              {submitted && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                  Thank you! Your message has been submitted.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>

                    <input
                      required
                      type="tel"
                      placeholder="+44..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="What can we help with?"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Message
                  </label>

                  <textarea
                    required
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-7 py-3 font-bold text-slate-950 transition hover:bg-yellow-400"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-slate-950">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}