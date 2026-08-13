export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  paidAt?: string;
}
