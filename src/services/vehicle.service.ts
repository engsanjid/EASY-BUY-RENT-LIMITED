import { api } from "@/lib/axios";
import type { Vehicle } from "@/types";

export const vehicleService = {
  getAll: () => api.get<Vehicle[]>("/vehicles").then((response) => response.data),
  getById: (id: string) => api.get<Vehicle>(`/vehicles/${id}`).then((response) => response.data),
  create: (data: Omit<Vehicle, "id">) => api.post<Vehicle>("/vehicles", data).then((response) => response.data),
};
