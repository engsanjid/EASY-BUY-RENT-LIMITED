import type { Customer } from "@/types";
export function CustomerCard({ customer }: { customer: Customer }) { return <article className="rounded-lg border p-4">{customer.name}</article>; }
