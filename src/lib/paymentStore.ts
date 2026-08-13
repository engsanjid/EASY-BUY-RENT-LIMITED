// src/lib/paymentStore.ts
import { PaymentRecord } from "@/types/Customer";
import { getCustomers } from "./customerStore";

export type FlatPayment = PaymentRecord & {
  customerId: number;
  customerName: string;
};

export function getAllPayments(): FlatPayment[] {
  const customers = getCustomers();
  const all: FlatPayment[] = [];

  customers.forEach((c) => {
    c.paymentHistory.forEach((p) => {
      all.push({ ...p, customerId: c.id, customerName: c.name });
    });
  });

  return all.sort((a, b) => {
    const [da, ma, ya] = a.date.split("/").map(Number);
    const [db, mb, yb] = b.date.split("/").map(Number);
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
  });
}

export function getPaymentsByCustomer(customerId: number): FlatPayment[] {
  return getAllPayments().filter((p) => p.customerId === customerId);
}