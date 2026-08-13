"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  CheckCircle2,
  XCircle,
  Ban,
  PlayCircle,
  Download,
  Car,
} from "lucide-react";
import clsx from "clsx";

import { Customer, CustomerStatus } from "@/types/Customer";
import { findCustomerById, updateCustomer } from "@/lib/customerStore";
import { generatePaymentPDF } from "@/utils/generatePaymentPDF";

const statusStyles: Record<CustomerStatus, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  inactive: "bg-slate-200 text-slate-600",
};

export default function CustomerDetailsPage() {
  const params = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | undefined>();

  useEffect(() => {
    if (params?.id) {
      setCustomer(findCustomerById(Number(params.id)));
    }
  }, [params.id]);

  if (!customer) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Customer not found.
      </div>
    );
  }

  function handleStatus(status: CustomerStatus) {
    if (!customer) return;
    updateCustomer(customer.id, { status });
    setCustomer(findCustomerById(customer.id));
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/customers"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-yellow-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </Link>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                  statusStyles[customer.status] || "bg-slate-100 text-slate-700"
                )}
              >
                {customer.status}
              </span>

              {customer.ownershipStatus === "owned" && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Owned
                </span>
              )}

              {(customer.ownershipStatus as string) === "renting" && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  Renting
                </span>
              )}

              {customer.ownershipStatus === "not_assigned" && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  No Vehicle Assigned
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-black text-slate-950">
              {customer.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Joined {customer.joined}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {customer.ownershipStatus === "not_assigned" && (
              <Link
                href={`/dashboard/customers/assign-vehicle/${customer.id}`}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
              >
                <Car className="h-4 w-4" />
                Assign Vehicle
              </Link>
            )}

            <button
              onClick={() => generatePaymentPDF(customer)}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            <Link
              href={`/dashboard/customers/edit/${customer.id}`}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>

            {customer.status === "pending" && (
              <>
                <button
                  onClick={() => handleStatus("active")}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatus("rejected")}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </>
            )}

            {customer.status === "active" && (
              <button
                onClick={() => handleStatus("inactive")}
                className="flex items-center gap-2 rounded-xl bg-slate-600 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
              >
                <Ban className="h-4 w-4" />
                Deactivate
              </button>
            )}

            {customer.status === "inactive" && (
              <button
                onClick={() => handleStatus("active")}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
              >
                <PlayCircle className="h-4 w-4" />
                Activate
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Detail label="Phone" value={customer.phone || "-"} />
          <Detail label="Email" value={(customer as any).email || "-"} />
          <Detail label="Address" value={(customer as any).address || "-"} />
          <Detail label="Vehicle" value={customer.vehicleName || "Not assigned"} />
          <Detail label="Weekly Rent" value={`£${customer.weeklyRentAmount ?? 0}`} />
          <Detail label="Total Rent Paid" value={`£${customer.totalRentPaid ?? 0}`} />
          <Detail label="Loan Amount" value={`£${customer.loanAmount ?? 0}`} />
          <Detail label="Loan Repaid" value={`£${customer.loanRepaid ?? 0}`} />
          <Detail label="Loan Outstanding" value={`£${customer.loanOutstanding ?? 0}`} />
        </div>
      </div>

      {/* Payment history */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-bold text-slate-950">Payment History</h2>
        </div>

        <div className="divide-y">
          {!customer.paymentHistory || customer.paymentHistory.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400">
              No payment records yet.
            </div>
          ) : (
            customer.paymentHistory.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-semibold capitalize text-slate-900">
                    {p.type === "loan" ? "Loan Repayment" : "Rent"}
                    {p.week ? ` · Week ${p.week}` : ""}
                  </p>
                  <p className="text-sm text-slate-500">{p.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">
                    £{p.amount}
                  </span>

                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                      p.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}