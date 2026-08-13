"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";

import { Customer } from "@/types/Customer";
import { getCustomers, deleteCustomer } from "@/lib/customerStore";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  function refresh() {
    setCustomers(getCustomers());
  }

  useEffect(() => {
    refresh();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.uniqueId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : c.status === filter;

    return matchesSearch && matchesFilter;
  });

  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
      refresh();
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Customer Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Customers</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>

        <Link
          href="/dashboard/customers/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </Link>
      </div>

      {/* Controls: Search & Status Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or unique ID..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
                filter === status
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {status}
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
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Rent Paid</th>
                <th className="px-6 py-4">Loan Due</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const isCompleted = Number(c.loanOutstanding || 0) <= 0;
                  const displayStatus = isCompleted ? "Completed" : c.status;

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">
                        {c.uniqueId}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {c.name}
                      </td>
                      <td className="px-6 py-4">{c.phone}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {c.vehicleName}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        £{c.totalRentPaid}
                      </td>
                      <td className="px-6 py-4 font-semibold text-amber-600">
                        £{c.loanOutstanding}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                            isCompleted
                              ? "bg-blue-100 text-blue-700"
                              : c.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {displayStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/customers/details/${c.id}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/customers/edit/${c.id}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            title="Edit Customer"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                            title="Delete Customer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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