export type VehicleType = "car" | "bike";

export type Vehicle = {
  id: number;
  type: VehicleType;
  name: string;
  brand: string;
  model: string;
  year: number;
  location: string;
  mileage: string;
  price: number;
  image: string;
  available: boolean;

  // নতুন
  registrationNumber?: string;
  assignedCustomerId?: number;
  assignedCustomerName?: string;
  assignedCustomerPhone?: string;
};