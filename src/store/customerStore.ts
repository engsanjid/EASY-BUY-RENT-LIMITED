import { create } from "zustand";
import type { Customer } from "@/types";

type CustomerState = { customers: Customer[]; setCustomers: (customers: Customer[]) => void };
export const useCustomerStore = create<CustomerState>((set) => ({ customers: [], setCustomers: (customers) => set({ customers }) }));
