import type { Customer } from "@/types";
export function CustomerTable({ customers = [] }: { customers?: Customer[] }) { return <p className="text-muted-foreground">{customers.length} customer(s)</p>; }
