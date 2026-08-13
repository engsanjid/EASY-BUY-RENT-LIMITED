"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
      {/* Background Glow */}
      <div className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 via-[#151515] to-[#080808] px-8 py-16 text-center md:px-16"
        >
          <div className="mx-auto max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
              Find Your Next Vehicle
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Ready to Find Your
              <span className="text-yellow-500"> Perfect Vehicle?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-gray-400">
              Explore our latest collection of quality cars and motorcycles,
              or speak directly with our team for more information.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/cars"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105 hover:bg-yellow-400"
              >
                Browse Vehicles
                <ArrowRight size={19} />
              </a>

              <a
                href="tel:+447514585898"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-500"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}