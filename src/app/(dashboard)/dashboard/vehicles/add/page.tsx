// src/app/(dashboard)/dashboard/vehicles/add/page.tsx
"use client";

import { useRouter } from "next/navigation";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { Vehicle } from "@/types/Vehicle";

export default function AddVehiclePage() {
  const router = useRouter();

  function handleSubmit(data: Omit<Vehicle, "id">) {
    // TODO: POST to backend once API is ready — for now just log and redirect
    console.log("New vehicle:", data);
    router.push("/dashboard/vehicles");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Add Vehicle</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details to list a new car or bike.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}