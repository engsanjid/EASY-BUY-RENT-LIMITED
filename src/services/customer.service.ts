import { api } from "@/lib/axios";
import type { Customer } from "@/types";

export const customerService = {
  getAll: () => api.get<Customer[]>("/customers").then((response) => response.data),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`).then((response) => response.data),
  create: (data: Omit<Customer, "id">) => api.post<Customer>("/customers", data).then((response) => response.data),
};
