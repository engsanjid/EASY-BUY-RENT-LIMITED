// src/app/(dashboard)/dashboard/vehicles/edit/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { vehicles } from "@/constants/vehicles";
import { Vehicle } from "@/types/Vehicle";

export default function EditVehiclePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const vehicle = vehicles.find((v) => v.id === Number(params.id));

  if (!vehicle) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Vehicle not found.
      </div>
    );
  }

  function handleSubmit(data: Omit<Vehicle, "id">) {
    // TODO: PATCH to backend once API is ready
    console.log("Updated vehicle:", { id: vehicle!.id, ...data });
    router.push("/dashboard/vehicles");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Edit Vehicle</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update details for {vehicle.name}.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
        <VehicleForm initialData={vehicle} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}