import { Vehicle } from "@/types/Vehicle";
import { vehicles as seedVehicles } from "@/constants/vehicles";

const STORAGE_KEY = "ebr_vehicles";

function getSeedData(): Vehicle[] {
  return seedVehicles.map((v) => ({ ...v }));
}

export function getVehicles(): Vehicle[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seeded = getSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return JSON.parse(raw) as Vehicle[];
  } catch {
    return [];
  }
}

export function saveVehicles(vehicles: Vehicle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

export function findVehicleById(id: number): Vehicle | undefined {
  return getVehicles().find((v) => v.id === id);
}

export function addVehicle(data: Omit<Vehicle, "id">): Vehicle {
  const vehicles = getVehicles();

  const newVehicle: Vehicle = {
    id: vehicles.length ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1,
    ...data,
  };

  saveVehicles([...vehicles, newVehicle]);
  return newVehicle;
}

export function updateVehicle(id: number, updates: Partial<Vehicle>) {
  const vehicles = getVehicles();
  const updated = vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v));
  saveVehicles(updated);
  return updated.find((v) => v.id === id);
}

export function assignVehicle(
  vehicleId: number,
  customer: { id: number; name: string; phone: string }
) {
  return updateVehicle(vehicleId, {
    available: false,
    assignedCustomerId: customer.id,
    assignedCustomerName: customer.name,
    assignedCustomerPhone: customer.phone,
  });
}

export function unassignVehicle(vehicleId: number) {
  return updateVehicle(vehicleId, {
    available: true,
    assignedCustomerId: undefined,
    assignedCustomerName: undefined,
    assignedCustomerPhone: undefined,
  });
}