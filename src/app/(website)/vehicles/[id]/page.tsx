// src/app/(website)/vehicles/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Banknote, ShieldCheck, Tag } from "lucide-react";

import { Vehicle } from "@/types/Vehicle";
import { findVehicleById } from "@/lib/vehicleStore";
import { Customer } from "@/types/Customer";
import { findCustomerById } from "@/lib/customerStore";

export default function PublicVehicleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (id) {
      const v = findVehicleById(Number(id));
      if (v) {
        setVehicle(v);
        if (v.assignedCustomerId) {
          const c = findCustomerById(v.assignedCustomerId);
          if (c) setCustomer(c);
        }
      }
    }
  }, [id]);

  if (!vehicle) {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        Vehicle not found.
      </div>
    );
  }

  const isOnRent = Boolean(vehicle.assignedCustomerId || vehicle.assignedCustomerName);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Vehicles
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Vehicle Image */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <img
            src={vehicle.image || "/placeholder.jpg"}
            alt={vehicle.name}
            className="h-96 w-full object-cover"
          />
        </div>

        {/* Vehicle Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700 border border-slate-200">
                {vehicle.type}
              </span>
              
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  isOnRent
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {isOnRent ? "On Rent (Active)" : "Available in Stock"}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-black text-slate-950">{vehicle.name}</h1>
            <p className="text-sm font-semibold text-slate-400">
              Brand: {vehicle.brand} | Model: {vehicle.model}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Reg Registration
              </p>
              <p className="font-mono text-sm font-bold text-slate-900 mt-0.5">
                {vehicle.registrationNumber || "Company Stock"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Weekly Rent
              </p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                £{vehicle.price} / week
              </p>
            </div>
          </div>

          {/* Active Rental / Client Info Section */}
          {isOnRent ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200/80 pb-3">
                <ShieldCheck className="h-5 w-5 text-amber-700" />
                <h3 className="font-bold text-amber-950 text-sm">Active Rental Information</h3>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-2 text-xs font-semibold">
                    <User className="h-4 w-4 text-amber-700" />
                    Current Renter:
                  </span>
                  <span className="font-bold text-slate-950">
                    {vehicle.assignedCustomerName || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-2 text-xs font-semibold">
                    <Phone className="h-4 w-4 text-amber-700" />
                    Contact Number:
                  </span>
                  <span className="font-semibold text-slate-900">
                    {vehicle.assignedCustomerPhone || "N/A"}
                  </span>
                </div>

                {customer && (
                  <>
                    <div className="flex items-center justify-between border-t border-amber-200/80 pt-2.5">
                      <span className="text-slate-600 flex items-center gap-2 text-xs font-semibold">
                        <Banknote className="h-4 w-4 text-amber-700" />
                        Loan Financing Amount:
                      </span>
                      <span className="font-bold text-slate-950">
                        £{customer.loanAmount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-xs font-semibold">
                        Outstanding Balance:
                      </span>
                      <span className="font-extrabold text-amber-700">
                        £{customer.loanOutstanding}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-xs font-bold text-slate-500">
                This vehicle is currently available in company inventory for new client assignment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}