import type { Vehicle } from "@/types";
export function VehicleTable({ vehicles = [] }: { vehicles?: Vehicle[] }) { return <p className="text-muted-foreground">{vehicles.length} vehicle(s)</p>; }
