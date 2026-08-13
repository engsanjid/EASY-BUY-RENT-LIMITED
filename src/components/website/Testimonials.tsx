"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "James Walker",
    role: "BMW 320D Buyer",
    review:
      "Excellent service from start to finish. The vehicle was exactly as described and the buying process was smooth.",
  },
  {
    name: "Sarah Johnson",
    role: "Honda CBR650R Buyer",
    review:
      "Very professional dealership. Friendly staff and the motorcycle was in outstanding condition.",
  },
  {
    name: "Michael Brown",
    role: "Audi A4 Owner",
    review:
      "Highly recommended. Honest pricing, no hidden costs and excellent after-sales support.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <span className="uppercase tracking-[4px] text-yellow-500 text-sm">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Hundreds of satisfied customers trust Easy Buy & Rent Limited
            for quality vehicles and professional service.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-yellow-500"
            >
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-white font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-yellow-500 text-sm mt-1">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
