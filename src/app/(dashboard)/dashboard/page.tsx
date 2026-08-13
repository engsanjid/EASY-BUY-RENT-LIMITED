// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, DollarSign, Car, AlertCircle, KeyRound } from "lucide-react";

import { Customer } from "@/types/Customer";
import { Vehicle } from "@/types/Vehicle";
import { getCustomers } from "@/lib/customerStore";
import { getVehicles } from "@/lib/vehicleStore";

export default function DashboardOverviewPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setVehicles(getVehicles());
  }, []);

  // ১. Total Customers
  const totalCustomersCount = customers.length;

  // ২. Total Revenue (সব কাস্টমারের 'paid' পেমেন্টের যোগফল)
  const totalRevenue = customers.reduce((sum, customer) => {
    const customerPaid = (customer.paymentHistory || [])
      .filter((p) => p.status === "paid")
      .reduce((pSum, p) => pSum + p.amount, 0);
    return sum + customerPaid;
  }, 0);

  // ৩. Vehicles & Rented Fleet Calculation
  const totalVehiclesCount = vehicles.length;
  const rentedVehiclesCount = vehicles.filter(
    (v) => v.assignedCustomerId || v.assignedCustomerName
  ).length;

  // ৪. Outstanding Amount (কাস্টমারদের মোট বাকি লোন)
  const totalOutstanding = customers.reduce(
    (sum, c) => sum + (c.loanOutstanding || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-950">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back — here&apos;s a live overview of your rental business.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Customers */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Customers
            </p>
            <p className="mt-2 text-3xl font-black text-slate-950">
              {totalCustomersCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Card 2: Total Revenue Collected */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </p>
            <p className="mt-2 text-3xl font-black text-slate-950">
              £{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Card 3: Vehicles Breakdown (Total vs On Rent) */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vehicles Fleet
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-950">
                {totalVehiclesCount}
              </span>
              <span className="text-xs font-bold text-amber-600">
                ({rentedVehiclesCount} On Rent)
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Car className="h-6 w-6" />
          </div>
        </div>

        {/* Card 4: Total Outstanding Amount */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Outstanding Loan
            </p>
            <p className="mt-2 text-3xl font-black text-red-600">
              £{totalOutstanding.toLocaleString()}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Quick Summary Note */}
      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-yellow-400">Active Rentals Snapshot</h3>
          <p className="text-xs text-slate-400 mt-1">
            Currently {rentedVehiclesCount} out of {totalVehiclesCount} vehicles are assigned to active renters with an outstanding balance of £{totalOutstanding.toLocaleString()}.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 shrink-0">
          <KeyRound className="h-4 w-4 text-yellow-400" />
          <span>{totalVehiclesCount - rentedVehiclesCount} Available in Stock</span>
        </div>
      </div>
    </div>
  );
}