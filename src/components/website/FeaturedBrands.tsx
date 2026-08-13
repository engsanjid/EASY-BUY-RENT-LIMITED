"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  },
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  {
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  },
  {
    name: "Honda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
  },
  {
    name: "Yamaha",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Yamaha_logo.svg",
  },
  {
    name: "Kawasaki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Kawasaki-logo.svg",
  },
  {
    name: "Triumph",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Triumph_Motorcycles_Logo.svg",
  },
];

export default function FeaturedBrands() {
  return (
    <section className="bg-black py-24 border-y border-white/10">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="uppercase tracking-[4px] text-yellow-500 text-sm">
            Premium Brands
          </span>

          <h2 className="text-5xl font-bold text-white mt-3">
            Brands We Deal With
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Discover trusted vehicle brands known for reliability,
            performance and premium driving experience.
          </p>

        </div>

        {/* Grid */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">

          {brands.map((brand, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{
                duration: .3,
              }}
              className="bg-[#111111] border border-white/10 rounded-3xl h-40 flex flex-col items-center justify-center hover:border-yellow-500 transition"
            >

              <Image
                src={brand.logo}
                alt={brand.name}
                width={65}
                height={65}
                className="object-contain mb-5"
              />

              <p className="text-white font-semibold tracking-wide">
                {brand.name}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}