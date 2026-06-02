import { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { vehicles as staticVehicles } from "@/data/vehicles";
import { formatCurrency } from "@/lib/utils";
import { mapApiVehicleToVehicle } from "@/lib/map-vehicle";
import type { Vehicle } from "@/types";

export const metadata: Metadata = {
  title: "Manage Vehicles | Tradeware Admin",
};

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function getVehiclesList(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${BASE}/api/vehicles?limit=200`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const list = data.vehicles ?? data;
    if (!Array.isArray(list) || list.length === 0) return [];
    return list.map((v: Record<string, unknown>) =>
      mapApiVehicleToVehicle({
        id: String(v.id),
        stockId: String(v.stockId ?? ""),
        make: String(v.make ?? ""),
        model: String(v.model ?? ""),
        year: Number(v.year ?? 0),
        price: Number(v.price ?? 0),
        priceCif: v.priceCif != null ? Number(v.priceCif) : null,
        currency: String(v.currency ?? "USD"),
        mileage: Number(v.mileage ?? 0),
        fuelType: String(v.fuelType ?? ""),
        transmission: String(v.transmission ?? ""),
        bodyType: typeof v.bodyType === "string" ? v.bodyType : null,
        color: String(v.color ?? ""),
        location: String(v.location ?? ""),
        condition: String(v.condition ?? ""),
        auctionGrade: typeof v.auctionGrade === "string" ? v.auctionGrade : null,
        images: Array.isArray(v.images) ? v.images : [],
        description: String(v.description ?? ""),
        features: Array.isArray(v.features) ? v.features : [],
      })
    );
  } catch {
    return [];
  }
}

export default async function VehiclesPage() {
  const apiVehicles = await getVehiclesList();
  const vehicles: Vehicle[] =
    apiVehicles.length > 0
      ? apiVehicles
      : (staticVehicles as Vehicle[]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
        <Link href="/admin/vehicles/add" className="btn-primary inline-flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Vehicle
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Stock ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{vehicle.stockId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {vehicle.make} {vehicle.model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(vehicle.price.fob, vehicle.price.currency)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.auctionGrade}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="p-2 text-gray-600 hover:text-primary-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/vehicles/edit/${vehicle.id}`}
                        className="p-2 text-gray-600 hover:text-primary-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-600 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
