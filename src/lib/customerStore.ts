import { Customer, PaymentType, PaymentRecordStatus } from "@/types/Customer";
import { addVehicle, assignVehicle } from "@/lib/vehicleStore";
import { VehicleType } from "@/types/Vehicle";

const STORAGE_KEY = "ebr_customers_v2";

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function generateUniqueId(existingCount: number): string {
  return `EBR-${String(existingCount + 1).padStart(4, "0")}`;
}

export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(raw) as Customer[];
  } catch {
    return [];
  }
}

export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function findCustomerById(id: number): Customer | undefined {
  return getCustomers().find((c) => c.id === id);
}

// Customer login: phone + Unique ID দিয়ে
export function findCustomerByPhoneAndUniqueId(
  phone: string,
  uniqueId: string
): Customer | undefined {
  return getCustomers().find(
    (c) =>
      normalizePhone(c.phone) === normalizePhone(phone) &&
      c.uniqueId.toLowerCase() === uniqueId.trim().toLowerCase()
  );
}

// Admin একসাথে Customer + Vehicle তৈরি করবে এই function দিয়ে
export function addCustomerWithVehicle(data: {
  name: string;
  phone: string;
  address: string;
  vehicleType: VehicleType;
  brand: string;
  model: string;
  registrationNumber: string;
  image: string;
  loanAmount: number;
  weeklyRentAmount: number;
}): Customer {
  const customers = getCustomers();

  // ১. Vehicle তৈরি
  const vehicle = addVehicle({
    type: data.vehicleType,
    name: `${data.brand} ${data.model}`,
    brand: data.brand,
    model: data.model,
    year: new Date().getFullYear(),
    location: "UK",
    mileage: "0 km",
    price: data.weeklyRentAmount,
    image: data.image,
    available: false,
    registrationNumber: data.registrationNumber,
  });

  // ২. Customer তৈরি
  const newId = customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1;

  const newCustomer: Customer = {
    id: newId,
    uniqueId: generateUniqueId(customers.length),
    name: data.name,
    phone: data.phone,
    address: data.address,
    status: "active",
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    ownershipStatus: data.loanAmount > 0 ? "renting" : "owned",
    weeklyRentAmount: data.weeklyRentAmount,
    totalRentPaid: 0,
    loanAmount: data.loanAmount,
    loanRepaid: 0,
    loanOutstanding: data.loanAmount,
    joined: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    paymentHistory: [],
  };

  saveCustomers([...customers, newCustomer]);

  // ৩. Vehicle-কে customer-এর সাথে link করা
  assignVehicle(vehicle.id, {
    id: newCustomer.id,
    name: newCustomer.name,
    phone: newCustomer.phone,
  });

  return newCustomer;
}

export function updateCustomer(id: number, updates: Partial<Customer>) {
  const customers = getCustomers();
  const updated = customers.map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveCustomers(updated);
  return updated.find((c) => c.id === id);
}

export function deleteCustomer(id: number) {
  saveCustomers(getCustomers().filter((c) => c.id !== id));
}

export function addPaymentToCustomer(
  customerId: number,
  payment: {
    type: PaymentType;
    amount: number;
    date: string;
    status: PaymentRecordStatus;
    week?: number;
  }
): { customer: Customer | undefined; justCompleted: boolean } {
  const customers = getCustomers();
  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return { customer: undefined, justCompleted: false };

  const newId = customer.paymentHistory.length
    ? Math.max(...customer.paymentHistory.map((p) => Number(p.id))) + 1
    : 1;

  customer.paymentHistory = [{ id: newId, ...payment }, ...customer.paymentHistory];

  let justCompleted = false;

  if (payment.status === "paid") {
    if (payment.type === "rent") {
      customer.totalRentPaid += payment.amount;
    } else {
      customer.loanRepaid += payment.amount;
      customer.loanOutstanding = Math.max(0, customer.loanOutstanding - payment.amount);

      if (customer.loanOutstanding === 0 && customer.ownershipStatus === "renting") {
        customer.ownershipStatus = "owned";
        justCompleted = true;
      }
    }
  }

  saveCustomers(customers);
  return { customer, justCompleted };
}
