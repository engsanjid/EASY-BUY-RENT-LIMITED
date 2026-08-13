import Link from "next/link";
import { Car, Bike, ArrowRight } from "lucide-react";

export default function FeaturedCategories() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-400 uppercase tracking-[4px] text-sm font-semibold">
            Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Browse Our Collection
          </h2>

          <p className="mt-4 text-gray-400">
            Explore our carefully selected collection of quality used cars
            and motorcycles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Cars */}
          <Link
            href="/cars"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition duration-500 hover:border-amber-400"
          >
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
              alt="Cars"
              className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
                <Car size={30} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                Used Cars
              </h3>

              <p className="mt-2 text-gray-300 max-w-sm">
                Premium quality inspected used cars at competitive prices.
              </p>

              <div className="mt-6 flex items-center gap-2 text-amber-400 font-semibold">
                Explore Cars
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </div>
          </Link>

          {/* Bikes */}
          <Link
            href="/bikes"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition duration-500 hover:border-amber-400"
          >
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80"
              alt="Bikes"
              className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black">
                <Bike size={30} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                Motorcycles
              </h3>

              <p className="mt-2 text-gray-300 max-w-sm">
                Reliable motorcycles and scooters fully inspected before sale.
              </p>

              <div className="mt-6 flex items-center gap-2 text-amber-400 font-semibold">
                Explore Bikes
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}