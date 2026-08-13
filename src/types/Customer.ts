export type CustomerStatus = "active" | "pending" | "rejected" | "inactive";
export type OwnershipStatus = "rented" | "owned" | "pending" | "not_assigned";
// (আপনার প্রজেক্টের বিদ্যমান টাইপগুলোর সাথে "not_assigned" যুক্ত করে নিন)
export type PaymentType = "rent" | "loan";
export type PaymentRecordStatus = "paid" | "pending" | "overdue";

export type PaymentRecord = {
  id: number;
  type: PaymentType;
  week?: number;
  amount: number;
  date: string; // dd/mm/yyyy
  status: PaymentRecordStatus;
};

export type Customer = {
  id: number;
  uniqueId: string; // e.g. "EBR-0001" — login-এর জন্য phone-এর সাথে লাগবে
  name: string;
  phone: string;
  address?: string;

  status: CustomerStatus;

  vehicleId: number;
  vehicleName: string;
  ownershipStatus: OwnershipStatus;

  weeklyRentAmount: number;
  totalRentPaid: number;

  loanAmount: number;
  loanRepaid: number;
  loanOutstanding: number;

  joined: string;
  paymentHistory: PaymentRecord[];
};