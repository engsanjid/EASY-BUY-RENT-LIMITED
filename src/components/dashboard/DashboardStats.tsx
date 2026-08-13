import { DashboardCard } from "./DashboardCard";
export function DashboardStats() { return <div className="grid gap-4 md:grid-cols-3"><DashboardCard title="Vehicles" value={0} /><DashboardCard title="Customers" value={0} /><DashboardCard title="Payments" value="৳0" /></div>; }
