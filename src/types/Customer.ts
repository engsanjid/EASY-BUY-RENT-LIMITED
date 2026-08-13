// এই টাইপ দুটি যুক্ত করুন
export type PaymentType = "rent" | "loan" | "deposit" | "other";

export type PaymentRecordStatus = "paid" | "pending" | "rejected" | "failed";

export type CustomerStatus = "active" | "pending" | "rejected" | "inactive";

export type OwnershipStatus = 
  | "rented" 
  | "renting" 
  | "owned" 
  | "buying" 
  | "not_assigned" 
  | "pending";

export interface PaymentRecord {
  id: string | number;
  type: PaymentType;
  amount: number;
  date: string;
  status: PaymentRecordStatus;
  week?: number | string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  joined: string;
  status: CustomerStatus;
  ownershipStatus: OwnershipStatus;
  vehicleName?: string;
  weeklyRentAmount: number;
  totalRentPaid: number;
  loanAmount: number;
  loanRepaid: number;
  loanOutstanding: number;
  paymentHistory: PaymentRecord[];
  [key: string]: any;
}