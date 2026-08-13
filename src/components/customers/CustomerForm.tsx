// src/components/customers/CustomerForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerStatus, OwnershipStatus } from "@/types/Customer";

export type CustomerFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  status: CustomerStatus;

  // Vehicle / ownership — read-only display, assign-vehicle page দিয়ে বদলাতে হবে
  vehicleName?: string;
  ownershipStatus: OwnershipStatus;

  // Rent
  weeklyRentAmount: number;

  // Loan
  loanAmount: number;
  loanRepaid: number;
  loanOutstanding: number;
};

type Props = {
  initialData?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => void;
};

export default function CustomerForm({ initialData, onSubmit }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<CustomerFormData>({
    name: initialData?.name ?? "",
    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
    address: initialData?.address ?? "",
    status: initialData?.status ?? "pending",
    vehicleName: initialData?.vehicleName,
    ownershipStatus: initialData?.ownershipStatus ?? "not_assigned",
    weeklyRentAmount: initialData?.weeklyRentAmount ?? 0,
    loanAmount: initialData?.loanAmount ?? 0,
    loanRepaid: initialData?.loanRepaid ?? 0,
    loanOutstanding: initialData?.loanOutstanding ?? 0,
  });

  const hasVehicle = form.ownershipStatus !== "not_assigned";

  function handleChange(
    field: keyof CustomerFormData,
    value: string | number
  ) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };

      // Loan amount বদলালে outstanding auto re-calculate (repaid অপরিবর্তিত রেখে)
      if (field === "loanAmount") {
        const newLoanAmount = Number(value);
        updated.loanOutstanding = Math.max(0, newLoanAmount - prev.loanRepaid);

        if (updated.loanOutstanding === 0 && prev.ownershipStatus === "renting") {
          updated.ownershipStatus = "owned";
        }
      }

      return updated;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20";
  const disabledInputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500 outline-none cursor-not-allowed";
  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
          Basic Information
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. James Carter"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+44 7700 900123"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="customer@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="e.g. London, UK"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Account Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as CustomerStatus)
              }
              className={inputClass}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="rejected">Rejected</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle / Rent / Loan */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
          Vehicle &amp; Loan
        </h3>

        {!hasVehicle ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            কোনো vehicle এখনো assign করা হয়নি। Vehicle assign করতে customer
            details page থেকে &quot;Assign Vehicle&quot; ব্যবহার করুন।
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Assigned Vehicle</label>
              <input
                disabled
                value={form.vehicleName ?? ""}
                className={disabledInputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Ownership Status</label>
              <input
                disabled
                value={
                  form.ownershipStatus === "owned" ? "Owned" : "Renting"
                }
                className={disabledInputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Weekly Rent (£)</label>
              <input
                required
                type="number"
                min={0}
                value={form.weeklyRentAmount}
                onChange={(e) =>
                  handleChange("weeklyRentAmount", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Loan Amount (£)</label>
              <input
                required
                type="number"
                min={0}
                disabled={form.ownershipStatus === "owned"}
                value={form.loanAmount}
                onChange={(e) =>
                  handleChange("loanAmount", Number(e.target.value))
                }
                className={
                  form.ownershipStatus === "owned"
                    ? disabledInputClass
                    : inputClass
                }
              />
            </div>

            <div>
              <label className={labelClass}>Loan Repaid (£)</label>
              <input
                disabled
                value={form.loanRepaid}
                className={disabledInputClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                Payment History থেকে auto হিসাব হয় — এখানে edit করা যায় না।
              </p>
            </div>

            <div>
              <label className={labelClass}>Loan Outstanding (£)</label>
              <input
                disabled
                value={form.loanOutstanding}
                className={disabledInputClass}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          {initialData ? "Save Changes" : "Add Customer"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}