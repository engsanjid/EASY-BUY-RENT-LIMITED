// src/app/(dashboard)/dashboard/customers/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Copy } from "lucide-react";

import { addCustomerWithVehicle } from "@/lib/customerStore";
import { VehicleType } from "@/types/Vehicle";

const rentPlaceholders: Record<VehicleType, string> = {
  bike: "e.g. 100",
  car: "e.g. 150",
};

export default function AddCustomerPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [vehicleType, setVehicleType] = useState<VehicleType>("bike");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [image, setImage] = useState("");

  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [weeklyRentAmount, setWeeklyRentAmount] = useState<number>(0);

  const [created, setCreated] = useState<{ uniqueId: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const customer = addCustomerWithVehicle({
      name,
      phone,
      address,
      vehicleType,
      brand,
      model,
      registrationNumber,
      image,
      loanAmount,
      weeklyRentAmount,
    });

    setCreated({ uniqueId: customer.uniqueId, name: customer.name });
  }

  function copyId() {
    if (!created) return;
    navigator.clipboard.writeText(created.uniqueId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20";
  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

  if (created) {
    return (
      <div className="mx-auto max-w-lg space-y-6 rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Customer Added Successfully
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {created.name}-কে এই Unique ID দিন — login-এর জন্য phone number-এর সাথে এটা লাগবে।
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-50 p-4">
          <span className="text-2xl font-black tracking-wide text-slate-950">
            {created.uniqueId}
          </span>
          <button
            onClick={copyId}
            className="rounded-lg border p-2 text-slate-500 hover:bg-slate-100"
            title="Copy"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        {copied && <p className="text-xs text-green-600">Copied!</p>}

        <button
          onClick={() => router.push("/dashboard/customers")}
          className="rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-yellow-400"
        >
          Go to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Add Customer</h1>
        <p className="mt-1 text-sm text-slate-500">
          Customer আর vehicle একসাথে যোগ করুন — loan দেওয়ার সাথে সাথে গাড়ি assign হয়ে যাবে।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Info */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            Customer Information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900123"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. London, UK"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            Vehicle Information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className={inputClass}
              >
                <option value="bike">Bike</option>
                <option value="car">Car</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Registration Number</label>
              <input
                required
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="e.g. AB12 CDE"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Brand</label>
              <input
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Yamaha"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Model</label>
              <input
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. R15 V4"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Vehicle Image URL</label>
              <input
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                এখন URL দিতে হবে — পরে file upload (Firebase Storage) যোগ করা যাবে।
              </p>
            </div>
          </div>
        </div>

        {/* Loan & Rent */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            Loan &amp; Rent
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Loan Amount (£) — কত টাকা ধার দিলেন</label>
              <input
                required
                type="number"
                min={0}
                value={loanAmount || ""}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Weekly Rent Amount (£)</label>
              <input
                required
                type="number"
                min={0}
                value={weeklyRentAmount || ""}
                onChange={(e) => setWeeklyRentAmount(Number(e.target.value))}
                placeholder={rentPlaceholders[vehicleType]}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                এটা fixed না — প্রতিটা customer/vehicle অনুযায়ী নিজে ঠিক করে দিন। Placeholder শুধু একটা সাধারণ ধারণা।
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          Add Customer &amp; Assign Vehicle
        </button>
      </form>
    </div>
  );
}