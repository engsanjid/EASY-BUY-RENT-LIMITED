"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-2xl font-black tracking-wide text-white">
                EASY{" "}
                <span className="text-yellow-500">
                  BUY & RENT
                </span>
              </div>

              <p className="mt-1 text-xs uppercase tracking-[3px] text-gray-500">
                Limited
              </p>
            </Link>

            <p className="mt-6 max-w-sm leading-7 text-gray-500">
              Your trusted destination for quality used cars
              and motorcycles across the UK.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaInstagram size={17} />
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-6 space-y-4 text-sm">

              <Link
                href="/"
                className="block text-gray-500 transition hover:text-yellow-500"
              >
                Home
              </Link>

              <Link
                href="/cars"
                className="block text-gray-500 transition hover:text-yellow-500"
              >
                Cars
              </Link>

              <Link
                href="/bikes"
                className="block text-gray-500 transition hover:text-yellow-500"
              >
                Bikes
              </Link>

              <Link
                href="/contact"
                className="block text-gray-500 transition hover:text-yellow-500"
              >
                Contact
              </Link>

            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h3 className="font-bold text-white">
              Our Services
            </h3>

            <div className="mt-6 space-y-4 text-sm text-gray-500">

              <p className="transition hover:text-yellow-500">
                Used Cars
              </p>

              <p className="transition hover:text-yellow-500">
                Motorcycles
              </p>

              <p className="transition hover:text-yellow-500">
                Vehicle Sales
              </p>

              <p className="transition hover:text-yellow-500">
                Vehicle Buying
              </p>

              <p className="transition hover:text-yellow-500">
                Customer Support
              </p>

            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="font-bold text-white">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5 text-sm">

              {/* Phone */}
              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                <a
                  href="tel:+447514585898"
                  className="text-gray-500 transition hover:text-yellow-500"
                >
                  07514 585898
                </a>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                <a
                  href="mailto:info@easybuyandrent.co.uk"
                  className="break-all text-gray-500 transition hover:text-yellow-500"
                >
                  info@easybuyandrent.co.uk
                </a>
              </div>

              {/* Location */}
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                <span className="text-gray-500">
                  United Kingdom
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-600 md:flex-row">

          <p>
            © {new Date().getFullYear()} Easy Buy & Rent
            Limited. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="#"
              className="transition hover:text-yellow-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-yellow-500"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
}