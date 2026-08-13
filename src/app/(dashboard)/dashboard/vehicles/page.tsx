// src/app/(dashboard)/dashboard/vehicles/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, User } from "lucide-react";

import { Vehicle } from "@/types/Vehicle";
import { getVehicles } from "@/lib/vehicleStore";

export default function DashboardVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "car" | "bike" | "rented">("all");

  function refresh() {
    setVehicles(getVehicles());
  }

  useEffect(() => {
    refresh();
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    const isOnRent = Boolean(v.assignedCustomerId || v.assignedCustomerName);

    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      (v.registrationNumber &&
        v.registrationNumber.toLowerCase().includes(search.toLowerCase())) ||
      (v.assignedCustomerName &&
        v.assignedCustomerName.toLowerCase().includes(search.toLowerCase()));

    let matchesFilter = true;
    if (filter === "car") matchesFilter = v.type === "car";
    if (filter === "bike") matchesFilter = v.type === "bike";
    if (filter === "rented") matchesFilter = isOnRent;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Vehicles</h1>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </p>
        </div>

        <Link
          href="/dashboard/vehicles/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Link>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, reg number, renter..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
          />
        </div>

        {/* Filters: All, Cars, Bikes, On Rent */}
        <div className="flex flex-wrap gap-2">
          {(["all", "car", "bike", "rented"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
                filter === f
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {f === "car" ? "Cars" : f === "bike" ? "Bikes" : f === "rented" ? "On Rent" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Reg No</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Current Renter</th>
                <th className="px-6 py-4">Rent/Wk</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((v) => {
                  const isOnRent = Boolean(v.assignedCustomerId || v.assignedCustomerName);

                  return (
                    <tr key={v.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {v.image ? (
                            <img
                              src={v.image}
                              alt={v.name}
                              className="h-10 w-12 rounded-lg object-cover bg-slate-100 border"
                            />
                          ) : (
                            <div className="h-10 w-12 rounded-lg bg-slate-100 border flex items-center justify-center text-xs font-bold text-slate-400">
                              No Img
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-slate-900">{v.name}</p>
                            <p className="text-xs text-slate-400">{v.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">
                        {v.registrationNumber || "Stock"}
                      </td>
                      <td className="px-6 py-4 capitalize font-medium">{v.type}</td>
                      <td className="px-6 py-4">
                        {isOnRent && v.assignedCustomerName ? (
                          <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                            <User className="h-3.5 w-3.5 text-amber-600" />
                            <span>{v.assignedCustomerName}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">
                        £{v.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                            isOnRent
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isOnRent ? "On Rent" : "Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vehicles/${v.id}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            title="View Public Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}