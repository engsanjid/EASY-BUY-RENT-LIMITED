import { Vehicle } from "@/types/Vehicle";
import Image from "next/image";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="relative h-48 w-full">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
            vehicle.available
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {vehicle.available ? "Available" : "Booked"}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
          <span className="uppercase font-bold tracking-wider">{vehicle.brand}</span>
          <span>{vehicle.location}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800">{vehicle.name}</h3>

        <div className="flex justify-between items-center text-sm text-gray-600 my-2">
          <span>Model: {vehicle.model}</span>
          <span>{vehicle.mileage}</span>
        </div>

        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <div>
            <span className="text-xl font-bold text-blue-600">${vehicle.price}</span>
            <span className="text-xs text-gray-500"> / day</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}