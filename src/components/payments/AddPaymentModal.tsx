"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Customer, PaymentType, PaymentRecordStatus } from "@/types/Customer";
import { getCustomers, addPaymentToCustomer } from "@/lib/customerStore";

function todayFormatted() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export default function AddPaymentModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState<number | "">("");
  const [type, setType] = useState<PaymentType>("rent");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(todayFormatted());
  const [status, setStatus] = useState<PaymentRecordStatus>("paid");
  const [week, setWeek] = useState<number>(1);
  const [completedMsg, setCompletedMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCustomers(getCustomers().filter((c) => c.ownershipStatus !== "not_assigned"));
      setCustomerId("");
      setType("rent");
      setAmount(0);
      setDate(todayFormatted());
      setStatus("paid");
      setWeek(1);
      setCompletedMsg("");
    }
  }, [isOpen]);

  const selectedCustomer = customers.find((c) => c.id === customerId);
  const isOwned = selectedCustomer?.ownershipStatus === "owned";

  useEffect(() => {
    if (isOwned && type === "loan") setType("rent");
  }, [isOwned, type]);

  useEffect(() => {
    if (customerId === "" || type !== "rent" || !selectedCustomer) return;
    const rentPayments = selectedCustomer.paymentHistory?.filter((p) => p.type === "rent") || [];
    const nextWeek = rentPayments.length
      ? Math.max(...rentPayments.map((p) => p.week ?? 0)) + 1
      : 1;
    setWeek(nextWeek);
    setAmount(selectedCustomer.weeklyRentAmount || 0);
  }, [customerId, type, selectedCustomer]);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (customerId === "" || amount <= 0) return;

    const result = addPaymentToCustomer(customerId as number, {
      type,
      amount,
      date,
      status,
      week: type === "rent" ? week : undefined,
    });

    if (result?.justCompleted) {
      setCompletedMsg("🎉 Loan সম্পূর্ণ শোধ হয়ে গেছে! গাড়ি এখন এই customer-এর নিজের।");
      onSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
      return;
    }

    onSuccess();
    onClose();
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 font-medium text-slate-800";
  const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Add Payment</h2>
            <p className="text-xs text-slate-500">Record rent or loan collection</p>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {completedMsg ? (
          <div className="rounded-xl bg-green-50 p-4 text-center text-sm font-semibold text-green-700 border border-green-200">
            {completedMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Select */}
            <div>
              <label className={labelClass}>Customer *</label>
              <select
                required
                value={customerId}
                onChange={(e) => setCustomerId(Number(e.target.value))}
                className={inputClass}
              >
                <option value="">-- Select Customer --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone}) {c.ownershipStatus === "owned" ? "— Owned" : ""}
                  </option>
                ))}
              </select>
              {customers.length === 0 && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  No customer has a vehicle assigned yet. Assign a vehicle first.
                </p>
              )}
            </div>

            {/* Payment Type */}
            <div>
              <label className={labelClass}>Payment Type *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType("rent")}
                  className={`rounded-xl border p-2.5 text-xs font-bold transition ${
                    type === "rent"
                      ? "border-slate-950 bg-slate-950 text-yellow-400"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Rent
                </button>
                <button
                  type="button"
                  disabled={isOwned}
                  onClick={() => setType("loan")}
                  className={`rounded-xl border p-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    type === "loan"
                      ? "border-slate-950 bg-slate-950 text-yellow-400"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Loan Repayment
                </button>
              </div>
              {isOwned && (
                <p className="mt-1.5 text-xs font-medium text-green-600">
                  এই customer loan সম্পূর্ণ শোধ করে ফেলেছে — শুধু rent নেওয়া যাবে।
                </p>
              )}
              {selectedCustomer && !isOwned && (
                <p className="mt-1.5 text-xs font-medium text-slate-500">
                  Loan বাকি: <span className="font-bold text-slate-900">£{selectedCustomer.loanOutstanding || 0}</span>
                </p>
              )}
            </div>

            {/* Week No. (For Rent) */}
            {type === "rent" && (
              <div>
                <label className={labelClass}>Week No.</label>
                <input
                  type="number"
                  min={1}
                  value={week}
                  onChange={(e) => setWeek(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            )}

            {/* Amount */}
            <div>
              <label className={labelClass}>Amount (£) *</label>
              <input
                required
                type="number"
                min={1}
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className={inputClass}
              />
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PaymentRecordStatus)}
                className={inputClass}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Form Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-yellow-500 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-yellow-400 shadow-sm"
              >
                Save Payment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}