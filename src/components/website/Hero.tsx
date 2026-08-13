"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CarFront,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400"
          >
            🚘 Trusted UK Vehicle Dealer
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Buy Your Next
            <span className="block text-yellow-400">
              Dream Vehicle
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8"
          >
            Discover premium quality used cars, motorcycles and
            scooters at competitive prices. Every vehicle is
            carefully inspected to ensure quality, reliability
            and peace of mind.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {/* Browse Vehicles */}
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-7 py-3.5 font-semibold text-black transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              Browse Vehicles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-5 border-t border-white/10 pt-7 sm:mt-16 sm:gap-10"
          >
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 sm:text-4xl">
                500+
              </h2>
              <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">
                Vehicles Sold
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-yellow-400 sm:text-4xl">
                15+
              </h2>
              <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">
                Years Experience
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-yellow-400 sm:text-4xl">
                100%
              </h2>
              <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">
                Customer Satisfaction
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Inventory Card */}
      <div className="absolute bottom-10 right-8 z-20 hidden xl:block">
        <div className="w-80 rounded-3xl bg-white p-7 shadow-2xl">
          {/* Cars */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
              <CarFront
                className="text-yellow-600"
                size={28}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Cars Available
              </h3>

              <p className="text-sm text-slate-500">
                Premium Selection
              </p>
            </div>
          </div>

          {/* Bikes */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
              <Bike
                className="text-yellow-600"
                size={28}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Motorcycles
              </h3>

              <p className="text-sm text-slate-500">
                Ready to Ride
              </p>
            </div>
          </div>

          {/* Explore */}
          <Link
            href="/vehicles"
            className="flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Explore Inventory
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}