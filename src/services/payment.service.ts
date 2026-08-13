import { api } from "@/lib/axios";
import type { Payment } from "@/types";

export const paymentService = {
  getAll: () => api.get<Payment[]>("/payments").then((response) => response.data),
  getById: (id: string) => api.get<Payment>(`/payments/${id}`).then((response) => response.data),
};
