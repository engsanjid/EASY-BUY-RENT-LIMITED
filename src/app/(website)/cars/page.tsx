"use client";

import Link from "next/link";
import { ArrowRight, CarFront, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { vehicles } from "@/constants/vehicles";
import VehicleCard from "@/components/vehicles/VehicleCard";

export default function CarsPage() {
  const [search, setSearch] = useState("");

  const cars = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesType =
        vehicle.type.toLowerCase() === "car";

      const matchesSearch =
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
              <CarFront className="h-4 w-4" />
              Premium Cars
            </div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Find Your
              <span className="block text-yellow-400">
                Dream Car
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Browse our carefully selected collection of quality cars
              available for purchase and rent.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search car by name, brand or location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>
        </div>
      </section>

      {/* Cars */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
              Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Available Cars
            </h2>

            <p className="mt-2 text-slate-500">
              {cars.length} cars available
            </p>
          </div>

          <Link
            href="/vehicles"
            className="hidden items-center gap-2 font-semibold text-slate-900 transition hover:text-yellow-600 sm:flex"
          >
            View All Vehicles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {cars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white py-20 text-center">
            <CarFront className="mx-auto h-12 w-12 text-slate-300" />

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No cars found
            </h3>

            <p className="mt-2 text-slate-500">
              Try searching with another name or brand.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}