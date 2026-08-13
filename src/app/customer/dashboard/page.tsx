"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  CreditCard,
  CheckCircle2,
  Download,
  PlusCircle,
  X,
  Building2,
  Receipt,
} from "lucide-react";

type PaymentRecord = {
  id: string;
  type: "Rent" | "Loan Repayment";
  title: string;
  amount: number;
  date: string;
  status: "paid";
};

type CustomerAccount = {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  totalRentPaid: number;
  loanRepaid: number;
  loanOutstanding: number;
  payments: PaymentRecord[];
};

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<CustomerAccount | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Form State
  const [paymentType, setPaymentType] = useState<"Rent" | "Loan Repayment">("Rent");
  const [amount, setAmount] = useState<string>("");
  const [rentWeek, setRentWeek] = useState<string>("Week 2");
  const [successMsg, setSuccessMsg] = useState("");

  const loadData = () => {
    const storedUser = localStorage.getItem("ebr_user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    // Get customer's specific data or initialize fallback structure
    const storedCustomers = localStorage.getItem("ebr_customers_data");
    let customerData: CustomerAccount;

    if (storedCustomers) {
      const allCustomers = JSON.parse(storedCustomers);
      const found = allCustomers.find((c: any) => c.phone === user.phone || c.id === user.id);
      if (found) {
        customerData = found;
      } else {
        customerData = getDefaultCustomerData(user);
      }
    } else {
      customerData = getDefaultCustomerData(user);
    }

    setCustomer(customerData);
  };

  const getDefaultCustomerData = (user: any): CustomerAccount => ({
    id: user.id || 1,
    name: user.name || "Md Sanjid Islam",
    phone: user.phone || "01745532902",
    vehicle: "Yamma R16 yud",
    totalRentPaid: 20,
    loanRepaid: 100,
    loanOutstanding: 1100,
    payments: [
      {
        id: "1",
        type: "Loan Repayment",
        title: "Loan Repayment",
        amount: 100,
        date: "13/08/2026",
        status: "paid",
      },
      {
        id: "2",
        type: "Rent",
        title: "Rent · Week 1",
        amount: 20,
        date: "13/08/2026",
        status: "paid",
      },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !amount || Number(amount) <= 0) return;

    const payAmount = Number(amount);
    const today = new Date().toLocaleDateString("en-GB");

    const newPayment: PaymentRecord = {
      id: Date.now().toString(),
      type: paymentType,
      title: paymentType === "Rent" ? `Rent · ${rentWeek}` : "Loan Repayment",
      amount: payAmount,
      date: today,
      status: "paid",
    };

    // Calculate Updated Values
    const updatedTotalRent =
      paymentType === "Rent"
        ? customer.totalRentPaid + payAmount
        : customer.totalRentPaid;

    const updatedLoanRepaid =
      paymentType === "Loan Repayment"
        ? customer.loanRepaid + payAmount
        : customer.loanRepaid;

    const updatedLoanOutstanding =
      paymentType === "Loan Repayment"
        ? Math.max(0, customer.loanOutstanding - payAmount)
        : customer.loanOutstanding;

    const updatedCustomer: CustomerAccount = {
      ...customer,
      totalRentPaid: updatedTotalRent,
      loanRepaid: updatedLoanRepaid,
      loanOutstanding: updatedLoanOutstanding,
      payments: [newPayment, ...customer.payments],
    };

    // 1. Update Customer Local State
    setCustomer(updatedCustomer);

    // 2. Save/Update All Customers Data array for Admin view
    const storedCustomers = localStorage.getItem("ebr_customers_data");
    let customersList = storedCustomers ? JSON.parse(storedCustomers) : [];
    
    const index = customersList.findIndex(
      (c: any) => c.phone === updatedCustomer.phone || c.id === updatedCustomer.id
    );

    if (index !== -1) {
      customersList[index] = updatedCustomer;
    } else {
      customersList.push(updatedCustomer);
    }

    localStorage.setItem("ebr_customers_data", JSON.stringify(customersList));

    // Reset Form & Show Success Message
    setAmount("");
    setIsPayModalOpen(false);
    setSuccessMsg("Payment completed successfully!");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Welcome, {customer.name}
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {customer.phone} · Vehicle:{" "}
              <span className="font-semibold text-slate-800">
                {customer.vehicle}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPayModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-5 py-2.5 font-bold text-sm shadow-sm transition"
            >
              <PlusCircle className="h-4 w-4" />
              Make Payment
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 px-4 py-2.5 font-bold text-sm shadow-sm transition">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            {successMsg}
          </div>
        )}

        {/* Metrics Cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Rent Paid
              </p>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                £{customer.totalRentPaid}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Wallet className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Loan Repaid
              </p>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                £{customer.loanRepaid}
              </h2>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Loan Outstanding
              </p>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                £{customer.loanOutstanding}
              </h2>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-red-500">
              <Receipt className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Payment History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Your rent and loan repayment records
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {customer.payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-sm">
                    £{p.amount}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative">
            <button
              onClick={() => setIsPayModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-950 mb-1">
              Make a Payment
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Select type and amount to complete instant payment
            </p>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Payment Category
                </label>
                <select
                  value={paymentType}
                  onChange={(e) =>
                    setPaymentType(e.target.value as "Rent" | "Loan Repayment")
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-yellow-500"
                >
                  <option value="Rent">Vehicle Rent</option>
                  <option value="Loan Repayment">Loan Repayment</option>
                </select>
              </div>

              {paymentType === "Rent" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Week Title
                  </label>
                  <input
                    type="text"
                    value={rentWeek}
                    onChange={(e) => setRentWeek(e.target.value)}
                    placeholder="e.g. Week 2"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-yellow-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Amount (£)
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-yellow-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-500 hover:bg-yellow-400 py-3 font-bold text-slate-950 text-sm transition mt-2"
              >
                Confirm & Pay Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}