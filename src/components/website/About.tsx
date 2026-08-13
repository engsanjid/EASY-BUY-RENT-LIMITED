"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Professionally inspected vehicles",
  "Trusted UK dealership",
  "Competitive market pricing",
  "Finance & part exchange available",
  "Friendly customer support",
  "Quality guaranteed",
];

export default function About() {
  return (
    <section className="bg-[#080808] py-28 overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="relative rounded-[35px] overflow-hidden">

              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80"
                alt="Showroom"
                width={700}
                height={700}
                className="w-full h-[650px] object-cover"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-8 -right-8 bg-yellow-500 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-5xl font-bold text-black">
                10+
              </h2>

              <p className="font-semibold text-black mt-2">
                Years Experience
              </p>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >

            <span className="uppercase tracking-[4px] text-yellow-500 text-sm">
              About Us
            </span>

            <h2 className="text-5xl font-bold text-white mt-5 leading-tight">
              Your Trusted Partner
              <br />
              For Premium Used Vehicles
            </h2>

            <p className="text-gray-400 mt-8 leading-8 text-lg">

              Easy Buy & Rent Limited is committed to providing
              high-quality used cars and motorcycles throughout the UK.
              Every vehicle is carefully inspected before sale,
              ensuring reliability, transparency and complete customer
              satisfaction.

            </p>

            {/* Features */}

            <div className="grid md:grid-cols-2 gap-5 mt-10">

              {features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={22}
                    className="text-yellow-500"
                  />

                  <span className="text-gray-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-12">

              <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">

                Learn More

              </button>

              <button className="border border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-black transition">

                Contact Us

              </button>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}