// src/app/(dashboard)/dashboard/customers/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CustomerForm, {
  CustomerFormData,
} from "@/components/customers/CustomerForm";
import { findCustomerById, updateCustomer } from "@/lib/customerStore";
import { Customer } from "@/types/Customer";

export default function EditCustomerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | undefined>();

  useEffect(() => {
    setCustomer(findCustomerById(Number(params.id)));
  }, [params.id]);

  if (!customer) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Customer not found.
      </div>
    );
  }

  function handleSubmit(data: CustomerFormData) {
    updateCustomer(customer!.id, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      status: data.status,
      weeklyRentAmount: data.weeklyRentAmount,
      loanAmount: data.loanAmount,
      loanOutstanding: data.loanOutstanding,
      ownershipStatus: data.ownershipStatus,
    });

    router.push(`/dashboard/customers/details/${customer!.id}`);
  }

  const initialData: CustomerFormData = {
    name: customer.name,
    phone: customer.phone,
    email: customer.email ?? "",
    address: customer.address ?? "",
    status: customer.status,
    vehicleName: customer.vehicleName,
    ownershipStatus: customer.ownershipStatus,
    weeklyRentAmount: customer.weeklyRentAmount,
    loanAmount: customer.loanAmount,
    loanRepaid: customer.loanRepaid,
    loanOutstanding: customer.loanOutstanding,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Edit Customer</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update details for {customer.name}.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
        <CustomerForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}