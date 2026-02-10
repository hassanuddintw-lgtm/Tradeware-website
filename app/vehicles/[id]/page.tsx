import { Metadata } from "next";
import { getVehicleById } from "@/data/vehicles";
import VehicleDetailPage from "@/components/vehicles/VehicleDetailPage";
import { notFound } from "next/navigation";
import { mapApiVehicleToVehicle } from "@/lib/map-vehicle";
import type { Vehicle } from "@/types";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`${BASE}/api/vehicles/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return mapApiVehicleToVehicle(data);
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = (await getVehicle(id)) ?? getVehicleById(id);
  if (!vehicle) {
    return { title: "Vehicle Not Found | Tradeware" };
  }
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.price.fob.toLocaleString()} USD FOB | Tradeware`,
    description: `Premium ${vehicle.year} ${vehicle.make} ${vehicle.model} available for export from Japan. ${vehicle.engine?.fuel ?? ""} engine, ${vehicle.transmission} transmission, ${vehicle.mileage.toLocaleString()} km mileage. Located at ${vehicle.location} port.`,
  };
}

export default async function VehicleDetail({ params }: PageProps) {
  const { id } = await params;
  const vehicle = (await getVehicle(id)) ?? getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetailPage vehicle={vehicle} />;
}
