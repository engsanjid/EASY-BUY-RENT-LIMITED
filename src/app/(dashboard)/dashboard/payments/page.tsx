"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Download } from "lucide-react";

import { Customer, PaymentRecord } from "@/types/Customer";
import { getCustomers } from "@/lib/customerStore";
import AddPaymentModal from "@/components/payments/AddPaymentModal";

type CombinedPayment = PaymentRecord & {
  customerName: string;
  customerId: number;
};

export default function PaymentsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function refresh() {
    setCustomers(getCustomers());
  }

  useEffect(() => {
    refresh();
  }, []);

  // কাস্টমারের মোট লোন কত তা পাওয়ার জন্য হেলপার ফাংশন
  const getCustomerTotalLoan = (customer: Customer): number => {
    const c = customer as any;
    // আপনার Customer Model এ যে ফিল্ডেই লোন অ্যামাউন্ট থাকুক, তা খুঁজে নিবে
    return Number(
      c.totalLoan ||
      c.financeAmount ||
      c.loanAmount ||
      c.totalFinance ||
      c.vehiclePrice ||
      c.price ||
      0
    );
  };

  // ১. সব পেমেন্ট ফ্ল্যাট লিস্ট করা
  const allPayments: CombinedPayment[] = customers.flatMap((c) =>
    (c.paymentHistory || []).map((p) => ({
      ...p,
      customerName: c.name,
      customerId: c.id,
    }))
  );

  // ২. ফিল্টারড পেমেন্ট লজিক
  const filteredPayments = allPayments.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.customerName.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.type.toLowerCase().includes(search.toLowerCase().trim());

    const matchesCustomer =
      selectedCustomerFilter === "all" || p.customerId === Number(selectedCustomerFilter);

    const matchesStatus =
      statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCustomer && matchesStatus;
  });

  // ৩. সিলেক্টেড কাস্টমার ফিল্টার
  const isSingleCustomerSelected = selectedCustomerFilter !== "all";
  const selectedCustomerObj = customers.find(
    (c) => c.id === Number(selectedCustomerFilter)
  );

  const activePaymentsList = isSingleCustomerSelected
    ? allPayments.filter((p) => p.customerId === Number(selectedCustomerFilter))
    : allPayments;

  // ৪. সামারি হিসেব (Rent Paid & Finance Paid)
  const totalRentPaid = activePaymentsList
    .filter((p) => p.type.toLowerCase() === "rent" && p.status.toLowerCase() === "paid")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const totalFinancePaid = activePaymentsList
    .filter(
      (p) =>
        (p.type.toLowerCase() === "loan" || p.type.toLowerCase() === "finance") &&
        p.status.toLowerCase() === "paid"
    )
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // 🖐️ Remaining Finance Balance (মোট লোন - মোট পরিশোধিত লোন)
  let totalFinanceDue = 0;

  if (isSingleCustomerSelected && selectedCustomerObj) {
    // নির্দিষ্ট কাস্টমারের লোন
    const totalLoanTaken = getCustomerTotalLoan(selectedCustomerObj);
    totalFinanceDue = Math.max(0, totalLoanTaken - totalFinancePaid);
  } else {
    // সব কাস্টমারের মোট লোন - সব কাস্টমারের মোট দেওয়া লোন
    const grandTotalLoan = customers.reduce(
      (sum, c) => sum + getCustomerTotalLoan(c),
      0
    );
    
    // All Customers এর সময় মোট লোন পেমেন্ট বাদ দেওয়া
    const allFinancePaidOverall = allPayments
      .filter(
        (p) =>
          (p.type.toLowerCase() === "loan" || p.type.toLowerCase() === "finance") &&
          p.status.toLowerCase() === "paid"
      )
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    totalFinanceDue = Math.max(0, grandTotalLoan - allFinancePaidOverall);
  }

  // ৫. CSV ডাউনলোড
  const handleDownloadCSV = () => {
    if (filteredPayments.length === 0) {
      alert("No data available to download!");
      return;
    }

    const headers = ["Customer Name,Type,Week,Amount,Date,Status"];
    const rows = filteredPayments.map(
      (p) =>
        `"${p.customerName}","${p.type}","${p.week ? `Week ${p.week}` : "-"}","£${p.amount}","${
          p.date
        }","${p.status}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Payment_Report_${selectedCustomerFilter !== "all" ? selectedCustomerObj?.name : "All"}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Payments Statement</h1>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredPayments.length} of {allPayments.length} records
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Download Statement
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-yellow-400"
          >
            <Plus className="h-4 w-4" />
            Add Payment
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isSingleCustomerSelected ? `${selectedCustomerObj?.name}'s Rent Paid` : "Total Rent Collected"}
          </p>
          <p className="mt-2 text-2xl font-black text-slate-950">£{totalRentPaid}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isSingleCustomerSelected ? `${selectedCustomerObj?.name}'s Finance Paid` : "Total Finance Collected"}
          </p>
          <p className="mt-2 text-2xl font-black text-slate-950">£{totalFinancePaid}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isSingleCustomerSelected ? `${selectedCustomerObj?.name}'s Remaining Balance` : "Outstanding Loan Balance"}
          </p>
          <p className="mt-2 text-2xl font-black text-amber-600">£{totalFinanceDue}</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or type (e.g. Rent, Loan)..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Client Filter Dropdown */}
          <select
            value={selectedCustomerFilter}
            onChange={(e) => setSelectedCustomerFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-yellow-500"
          >
            <option value="all">All Customers</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter Buttons */}
          <div className="flex gap-1.5 rounded-xl border border-slate-200 bg-white p-1">
            {(["all", "paid", "pending"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                  statusFilter === st
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Week</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No payments found for this filter.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p, index) => (
                  <tr
                    key={`${p.customerId}-${p.id}-${index}`}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {p.customerName}
                    </td>
                    <td className="px-6 py-4 capitalize font-semibold text-slate-700">
                      {p.type}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {p.week ? `Week ${p.week}` : "-"}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-950">
                      £{p.amount}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {p.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                          p.status.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {isModalOpen && (
        <AddPaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            refresh();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}