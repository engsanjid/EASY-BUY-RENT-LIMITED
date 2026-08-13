"use client";

import {
  ShieldCheck,
  BadgeCheck,
  CarFront,
  Clock3,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Vehicles",
    desc: "Every car and motorcycle is professionally inspected before being listed.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Dealer",
    desc: "Serving customers with honesty, transparency and premium quality service.",
  },
  {
    icon: CarFront,
    title: "Wide Collection",
    desc: "Browse quality used cars and motorcycles at competitive UK prices.",
  },
  {
    icon: Clock3,
    title: "Fast Process",
    desc: "Quick enquiry, easy paperwork and hassle-free vehicle purchase.",
  },
];

const stats = [
  {
    number: "10+",
    label: "Years Experience",
  },
  {
    number: "1500+",
    label: "Vehicles Sold",
  },
  {
    number: "98%",
    label: "Customer Satisfaction",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0b0b0b] py-24">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="uppercase tracking-[4px] text-yellow-500 text-sm">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Trusted Vehicle Dealer In The UK
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mt-5">
            We provide carefully inspected vehicles, honest pricing,
            professional support and a smooth buying experience for every customer.
          </p>

        </div>

        {/* Features */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-20">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: .3 }}
                className="bg-[#141414] border border-white/10 rounded-3xl p-8 hover:border-yellow-500 transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">

                  <Icon
                    size={34}
                    className="text-yellow-500"
                  />

                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {item.desc}
                </p>

              </motion.div>

            );
          })}

        </div>

        {/* Stats */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="rounded-3xl bg-gradient-to-b from-[#171717] to-[#111111] border border-white/10 p-10 text-center"
            >

              <h3 className="text-5xl font-bold text-yellow-500 mb-3">
                {item.number}
              </h3>

              <p className="text-gray-300">
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}