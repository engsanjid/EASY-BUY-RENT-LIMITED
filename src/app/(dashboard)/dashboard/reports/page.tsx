// src/app/(dashboard)/dashboard/reports/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  CreditCard,
  Car,
  AlertCircle,
  CheckCircle2,
  PieChart,
  FileText,
  Printer,
} from "lucide-react";

import { Customer } from "@/types/Customer";
import { Vehicle } from "@/types/Vehicle";
import { getCustomers } from "@/lib/customerStore";
import { getVehicles } from "@/lib/vehicleStore";

export default function ReportsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setVehicles(getVehicles());
  }, []);

  // ১. পেমেন্ট ও রেভিনিউ হিসেব
  const allPayments = customers.flatMap((c) => c.paymentHistory || []);

  const totalRentCollected = allPayments
    .filter((p) => p.type === "rent" && p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalLoanCollected = allPayments
    .filter((p) => (p.type === "loan" || (p.type as string) === "finance") && p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRevenue = totalRentCollected + totalLoanCollected;

  // ২. মোট বকেয়া (Outstanding)
  const totalOutstandingLoan = customers.reduce(
    (sum, c) => sum + (c.loanOutstanding || 0),
    0
  );

  // ৩. ফ্লীট এনালিটিক্স (Vehicles Analytics)
  const totalVehicles = vehicles.length;
  const totalCars = vehicles.filter((v) => v.type === "car").length;
  const totalBikes = vehicles.filter((v) => v.type === "bike").length;

  const rentedVehicles = vehicles.filter(
    (v) => v.assignedCustomerId || v.assignedCustomerName
  ).length;

  const availableVehicles = totalVehicles - rentedVehicles;
  const utilizationRate =
    totalVehicles > 0 ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Financial & Fleet Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time business insights, revenue analytics, and vehicle stats.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-50 shadow-sm"
        >
          <Printer className="h-4 w-4" />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Financial Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Revenue</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-950">£{totalRevenue.toLocaleString()}</p>
            <p className="mt-1 text-[11px] text-emerald-600 font-semibold">Rent + Loan Collections</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Rent Collected</span>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-950">£{totalRentCollected.toLocaleString()}</p>
            <p className="mt-1 text-[11px] text-slate-400 font-medium">From active vehicle rentals</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Finance Collected</span>
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-950">£{totalLoanCollected.toLocaleString()}</p>
            <p className="mt-1 text-[11px] text-slate-400 font-medium">Loan repayments received</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Outstanding Loan</span>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-red-600">£{totalOutstandingLoan.toLocaleString()}</p>
            <p className="mt-1 text-[11px] text-red-500 font-medium">Receivables from clients</p>
          </div>
        </div>
      </div>

      {/* Fleet Utilization Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Fleet Performance & Inventory
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Fleet Status Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-bold text-slate-900 text-sm">Fleet Utilization Rate</span>
              <PieChart className="h-4 w-4 text-amber-500" />
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-black text-slate-950">{utilizationRate}%</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                {rentedVehicles} of {totalVehicles} Rented
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${utilizationRate}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-slate-600">
              <div className="rounded-xl bg-slate-50 p-2.5 border">
                <p className="text-slate-400 text-[10px] uppercase">On Rent</p>
                <p className="text-sm font-bold text-amber-700">{rentedVehicles} Vehicles</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2.5 border">
                <p className="text-slate-400 text-[10px] uppercase">In Stock</p>
                <p className="text-sm font-bold text-emerald-700">{availableVehicles} Available</p>
              </div>
            </div>
          </div>

          {/* Vehicle Categories Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-bold text-slate-900 text-sm">Vehicle Category Breakdown</span>
              <Car className="h-4 w-4 text-slate-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-400 uppercase">Cars Fleet</p>
                <p className="text-2xl font-black text-slate-950 mt-1">{totalCars}</p>
                <p className="text-xs text-slate-500 mt-1">Total cars registered in system</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-400 uppercase">Bikes Fleet</p>
                <p className="text-2xl font-black text-slate-950 mt-1">{totalBikes}</p>
                <p className="text-xs text-slate-500 mt-1">Total motorcycles & scooters</p>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50/60 border border-amber-200/80 p-3 flex items-center gap-3 text-xs text-amber-950">
              <FileText className="h-4 w-4 text-amber-700 shrink-0" />
              <span>
                Tip: Maintain at least 15-20% available stock in peak season to fulfill new rental demand.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Financial Standings Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h3 className="font-bold text-slate-900 text-sm">Customer Balance Summary</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Loan Amount</th>
                <th className="px-6 py-3">Total Paid</th>
                <th className="px-6 py-3">Loan Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No customer data available for reports.
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const paidAmount = (c.paymentHistory || [])
                    .filter((p) => p.status === "paid")
                    .reduce((sum, p) => sum + p.amount, 0);

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-3.5 font-bold text-slate-900">{c.name}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500">{c.phone}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-800">£{c.loanAmount}</td>
                      <td className="px-6 py-3.5 font-bold text-emerald-600">£{paidAmount}</td>
                      <td className="px-6 py-3.5 font-extrabold text-red-600">
                        £{c.loanOutstanding}
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