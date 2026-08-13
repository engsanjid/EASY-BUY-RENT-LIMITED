"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#050505] py-28">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
            Contact Us
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Let&apos;s Talk
          </h2>

          <p className="mt-5 text-gray-400">
            Have a question about a vehicle? Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white">
              Contact Information
            </h3>

            <p className="mt-4 leading-7 text-gray-400">
              Our team is available to help you find the right car or
              motorcycle for your needs.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a
                    href="tel:+447514585898"
                    className="mt-1 block font-semibold text-white hover:text-yellow-500"
                  >
                    07514 585898
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:info@easybuyandrent.co.uk"
                    className="mt-1 block font-semibold text-white hover:text-yellow-500"
                  >
                    info@easybuyandrent.co.uk
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="mt-1 font-semibold text-white">
                    United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                  <Clock size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Opening Hours</p>
                  <p className="mt-1 font-semibold text-white">
                    Monday – Saturday
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white">
              Send Us a Message
            </h3>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />

              <textarea
                rows={5}
                placeholder="How can we help you?"
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}