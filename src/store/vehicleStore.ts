import { create } from "zustand";
import type { Vehicle } from "@/types";

type VehicleState = { vehicles: Vehicle[]; setVehicles: (vehicles: Vehicle[]) => void };
export const useVehicleStore = create<VehicleState>((set) => ({ vehicles: [], setVehicles: (vehicles) => set({ vehicles }) }));
