/**
 * GET /api/vehicles/filters
 * Returns distinct makes, models (optional ?make=X), bodyTypes, fuelTypes, transmissions, locations, total count.
 * Used by Search form and Inventory Refine sidebar for live dropdowns.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK = {
  makes: ["Honda", "Lexus", "Mazda", "Mitsubishi", "Nissan", "Subaru", "Suzuki", "Toyota"],
  bodyTypes: [] as string[],
  fuelTypes: ["Petrol", "Diesel", "Hybrid", "Electric"],
  transmissions: ["Automatic", "Manual", "CVT"],
  locations: ["Yokohama Port", "Kobe Port", "Osaka Port", "Nagoya Port"],
  total: 0,
  yearMin: new Date().getFullYear() - 24,
  yearMax: new Date().getFullYear(),
};

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const makeParam = searchParams.get("make");

  try {
    const baseWhere = { status: "available" as const };

    if (makeParam) {
      const models = await prisma.vehicle.findMany({
        where: { ...baseWhere, make: makeParam },
        select: { model: true },
        distinct: ["model"],
        orderBy: { model: "asc" },
      });
      return NextResponse.json({
        models: models.map((m) => m.model).filter(Boolean),
      });
    }

    const [makes, bodyTypes, fuelTypes, transmissions, locations, total, yearRange] = await Promise.all([
      prisma.vehicle.findMany({ where: baseWhere, select: { make: true }, distinct: ["make"], orderBy: { make: "asc" } }),
      prisma.vehicle.findMany({ where: { ...baseWhere, bodyType: { not: null } }, select: { bodyType: true }, distinct: ["bodyType"], orderBy: { bodyType: "asc" } }),
      prisma.vehicle.findMany({ where: baseWhere, select: { fuelType: true }, distinct: ["fuelType"], orderBy: { fuelType: "asc" } }),
      prisma.vehicle.findMany({ where: baseWhere, select: { transmission: true }, distinct: ["transmission"], orderBy: { transmission: "asc" } }),
      prisma.vehicle.findMany({ where: baseWhere, select: { location: true }, distinct: ["location"], orderBy: { location: "asc" } }),
      prisma.vehicle.count({ where: baseWhere }),
      prisma.vehicle.aggregate({ where: baseWhere, _min: { year: true }, _max: { year: true } }),
    ]);

    const out = {
      makes: makes.map((m) => m.make).filter(Boolean),
      bodyTypes: bodyTypes.map((b) => b.bodyType).filter(Boolean) as string[],
      fuelTypes: fuelTypes.map((f) => f.fuelType).filter(Boolean),
      transmissions: transmissions.map((t) => t.transmission).filter(Boolean),
      locations: locations.map((l) => l.location).filter(Boolean),
      total,
      yearMin: yearRange._min.year ?? FALLBACK.yearMin,
      yearMax: yearRange._max.year ?? FALLBACK.yearMax,
    };
    // If DB returned empty lists, use fallback so UI always has options
    if (out.makes.length === 0) out.makes = FALLBACK.makes;
    if (out.fuelTypes.length === 0) out.fuelTypes = FALLBACK.fuelTypes;
    if (out.transmissions.length === 0) out.transmissions = FALLBACK.transmissions;
    if (out.locations.length === 0) out.locations = FALLBACK.locations;
    return NextResponse.json(out);
  } catch (e) {
    console.error("Vehicles filters error:", e);
    if (makeParam) return NextResponse.json({ models: [] });
    return NextResponse.json({
      ...FALLBACK,
      models: undefined,
    });
  }
}
