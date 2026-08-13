// src/app/(website)/page.tsx (অথবা src/app/page.tsx)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, User, ArrowRight } from "lucide-react";

import { Vehicle } from "@/types/Vehicle";
import { getVehicles } from "@/lib/vehicleStore";

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filter, setFilter] = useState<"all" | "car" | "bike" | "rented">("all");

  useEffect(() => {
    setVehicles(getVehicles());
  }, []);

  // Filter Logic
  const filteredVehicles = vehicles.filter((v) => {
    const isOnRent = Boolean(v.assignedCustomerId || v.assignedCustomerName);

    if (filter === "car") return v.type === "car";
    if (filter === "bike") return v.type === "bike";
    if (filter === "rented") return isOnRent;
    return true;
  });

  // Display limit for homepage (Desktop: 8 max)
  const displayedVehicles = filteredVehicles.slice(0, 8);

  return (
    <main className="min-h-screen bg-white">
      {/* Featured Vehicles Section */}
      <section className="py-12 px-3 sm:px-6 mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
            Featured Vehicles
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950">
                Find Your Perfect Ride
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Explore our latest cars and bikes available for rent or purchase.
              </p>
            </div>

            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition"
            >
              <span>View All Vehicles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-1.5 sm:gap-2">
          {(["all", "car", "bike", "rented"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 sm:px-6 py-2 text-xs font-bold capitalize transition border ${
                filter === f
                  ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {f === "car" ? "Cars" : f === "bike" ? "Bikes" : f === "rented" ? "On Rent" : "All"}
            </button>
          ))}
        </div>

        {/* Vehicles Grid: Mobile = 2 columns (grid-cols-2), Desktop = 4 columns (lg:grid-cols-4) */}
        {displayedVehicles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 py-16 text-center">
            <p className="text-slate-400 font-medium text-xs sm:text-sm">
              No vehicles found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {displayedVehicles.map((v) => {
              const isOnRent = Boolean(v.assignedCustomerId || v.assignedCustomerName);

              return (
                <div
                  key={v.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-2.5 sm:p-4 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-32 sm:h-48 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
                      <img
                        src={v.image || "/placeholder.jpg"}
                        alt={v.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      {/* Type Badge */}
                      <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-white/90 px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold capitalize text-slate-900 backdrop-blur shadow-sm">
                        {v.type}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold text-white shadow-sm ${
                          isOnRent ? "bg-amber-600" : "bg-emerald-600"
                        }`}
                      >
                        {isOnRent ? "On Rent" : "Available"}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <div className="mt-2.5 sm:mt-4 space-y-0.5 sm:space-y-1">
                      <h3 className="text-xs sm:text-lg font-bold text-slate-950 leading-tight sm:leading-snug truncate">
                        {v.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 font-medium">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{v.location || "London"}</span>
                      </div>
                    </div>

                    {/* Renter Card (Shows only when ON RENT) */}
                    {isOnRent && v.assignedCustomerName && (
                      <div className="mt-2 sm:mt-3 flex items-center justify-between rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200/60 p-1.5 sm:p-2.5 text-[10px] sm:text-xs text-amber-950">
                        <div className="flex items-center gap-1 font-bold truncate">
                          <User className="h-3 w-3 text-amber-700 shrink-0" />
                          <span className="truncate max-w-[70px] sm:max-w-[110px]">
                            {v.assignedCustomerName}
                          </span>
                        </div>
                        <span className="text-[8px] sm:text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          Renter
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price & Details Link */}
                  <div className="mt-3 sm:mt-5 flex items-center justify-between border-t border-slate-100 pt-2 sm:pt-3">
                    <div>
                      <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Rent
                      </p>
                      <p className="text-xs sm:text-base font-extrabold text-slate-950">
                        £{v.price}<span className="text-[9px] sm:text-xs font-normal text-slate-500">/wk</span>
                      </p>
                    </div>

                    <Link
                      href={`/vehicles/${v.id}`}
                      className="rounded-lg sm:rounded-xl bg-amber-500 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-slate-950 transition hover:bg-amber-400"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}