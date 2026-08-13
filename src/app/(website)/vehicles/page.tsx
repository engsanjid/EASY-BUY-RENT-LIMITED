// src/app/(website)/vehicles/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Vehicle } from "@/types/Vehicle";
import { getVehicles } from "@/lib/vehicleStore";

const ITEMS_PER_PAGE = 16;

export default function PublicVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filter, setFilter] = useState<"all" | "car" | "bike" | "rented">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setVehicles(getVehicles());
  }, []);

  // ১. ফিল্টার লজিক
  const filteredVehicles = vehicles.filter((v) => {
    const isRented = Boolean(v.assignedCustomerId || v.assignedCustomerName);

    if (filter === "car") return v.type === "car";
    if (filter === "bike") return v.type === "bike";
    if (filter === "rented") return isRented;
    return true;
  });

  // ফিল্টার বদলালে ১ নম্বর পেজে ফেরত নেওয়ার লজিক
  const handleFilterChange = (newFilter: "all" | "car" | "bike" | "rented") => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // ২. পেজিনেশন হিসাব-নিকাশ
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Page Header */}
      <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Find Your Perfect Ride
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Explore our available fleet or view active client rentals.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
          {(["all", "car", "bike", "rented"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold capitalize transition ${
                filter === f
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {f === "car" ? "Cars" : f === "bike" ? "Bikes" : f === "rented" ? "On Rent" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      {paginatedVehicles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 py-16 text-center">
          <p className="text-slate-400 font-medium">
            No vehicles found for this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedVehicles.map((v) => {
            const isOnRent = Boolean(v.assignedCustomerId || v.assignedCustomerName);

            return (
              <div
                key={v.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={v.image || "/placeholder.jpg"}
                      alt={v.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    
                    {/* Vehicle Type Badge */}
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold capitalize text-slate-900 backdrop-blur shadow-sm">
                      {v.type}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm ${
                        isOnRent ? "bg-amber-600" : "bg-emerald-600"
                      }`}
                    >
                      {isOnRent ? "On Rent" : "Available"}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="mt-4 space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-950 leading-snug">
                      {v.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{v.location || "London, UK"}</span>
                    </div>
                  </div>

                  {/* Renter Info Box */}
                  {isOnRent && v.assignedCustomerName && (
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-amber-50/80 border border-amber-200/60 p-2.5 text-xs text-amber-950">
                      <div className="flex items-center gap-1.5 font-bold">
                        <User className="h-3.5 w-3.5 text-amber-700" />
                        <span className="truncate max-w-[120px]">
                          {v.assignedCustomerName}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        Renter
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer / Price */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Weekly Rent
                    </p>
                    <p className="text-base font-extrabold text-slate-950">
                      £{v.price}<span className="text-xs font-normal text-slate-500">/wk</span>
                    </p>
                  </div>

                  <Link
                    href={`/vehicles/${v.id}`}
                    className="flex items-center gap-1 rounded-xl bg-yellow-500 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-yellow-400"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredVehicles.length > 0 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500 font-semibold">
            Showing <span className="text-slate-900">{startIndex + 1}</span> to{" "}
            <span className="text-slate-900">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredVehicles.length)}
            </span>{" "}
            of <span className="text-slate-900">{filteredVehicles.length}</span> vehicles
          </p>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition ${
                    currentPage === pageNum
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}