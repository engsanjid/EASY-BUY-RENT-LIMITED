import { api } from "@/lib/axios";
import type { User } from "@/types";

export const authService = {
  login: (email: string, password: string) => api.post<User>("/auth/login", { email, password }).then((response) => response.data),
  logout: () => api.post("/auth/logout"),
};
