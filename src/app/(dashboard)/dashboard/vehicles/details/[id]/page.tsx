// src/app/(dashboard)/dashboard/vehicles/details/[id]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Pencil, ArrowLeft } from "lucide-react";

import { vehicles } from "@/constants/vehicles";

export default function AdminVehicleDetailsPage() {
  const params = useParams<{ id: string }>();
  const vehicle = vehicles.find((v) => v.id === Number(params.id));

  if (!vehicle) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Vehicle not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/vehicles"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-yellow-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Vehicles
      </Link>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-white">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600 capitalize">
                  {vehicle.type} · {vehicle.brand}
                </p>
                <h1 className="mt-1 text-2xl font-black text-slate-950">
                  {vehicle.name}
                </h1>
              </div>

              <Link
                href={`/dashboard/vehicles/edit/${vehicle.id}`}
                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-400"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Detail label="Model" value={vehicle.model} />
              <Detail label="Year" value={String(vehicle.year)} />
              <Detail label="Location" value={vehicle.location} />
              <Detail label="Mileage" value={vehicle.mileage} />
              <Detail label="Price/day" value={`£${vehicle.price}`} />
              <Detail
                label="Status"
                value={vehicle.available ? "Available" : "Unavailable"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}