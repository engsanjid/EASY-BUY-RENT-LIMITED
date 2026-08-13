// src/components/vehicles/VehicleForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle, VehicleType } from "@/types/Vehicle";

type Props = {
  initialData?: Vehicle;
  onSubmit: (data: Omit<Vehicle, "id">) => void;
};

export default function VehicleForm({ initialData, onSubmit }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    type: initialData?.type ?? ("car" as VehicleType),
    name: initialData?.name ?? "",
    brand: initialData?.brand ?? "",
    model: initialData?.model ?? "",
    year: initialData?.year ?? new Date().getFullYear(),
    location: initialData?.location ?? "",
    mileage: initialData?.mileage ?? "",
    price: initialData?.price ?? 0,
    image: initialData?.image ?? "",
    available: initialData?.available ?? true,
  });

  function handleChange(
    field: keyof typeof form,
    value: string | number | boolean
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20";
  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Vehicle Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              handleChange("type", e.target.value as VehicleType)
            }
            className={inputClass}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Yamaha R15 V4"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Brand</label>
          <input
            required
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Model</label>
          <input
            required
            value={form.model}
            onChange={(e) => handleChange("model", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Year</label>
          <input
            required
            type="number"
            value={form.year}
            onChange={(e) => handleChange("year", Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            required
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g. London"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Mileage</label>
          <input
            required
            value={form.mileage}
            onChange={(e) => handleChange("mileage", e.target.value)}
            placeholder="e.g. 12,000 km"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Price / day (£)</label>
          <input
            required
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Image URL</label>
          <input
            required
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 sm:col-span-2">
          <input
            id="available"
            type="checkbox"
            checked={form.available}
            onChange={(e) => handleChange("available", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="available" className="text-sm font-medium text-slate-700">
            Available for rent
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          {initialData ? "Save Changes" : "Add Vehicle"}
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