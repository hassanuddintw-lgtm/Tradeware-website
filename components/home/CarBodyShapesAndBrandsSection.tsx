"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Car,
  Truck,
  Bus,
  CarFront,
  Zap,
} from "lucide-react";
import { routes } from "@/config/routes";
import { carBrands } from "@/data/car-brands";

const bodyShapes: { label: string; bodyType: string; icon: React.ReactNode }[] = [
  { label: "Convertible", bodyType: "Convertible", icon: <Car className="h-8 w-8 text-slate-700" /> },
  { label: "Coupe", bodyType: "Coupe", icon: <Car className="h-8 w-8 text-slate-700" /> },
  { label: "Sedan", bodyType: "Sedan", icon: <CarFront className="h-8 w-8 text-slate-700" /> },
  { label: "Van / Minivan", bodyType: "Van", icon: <Bus className="h-8 w-8 text-slate-700" /> },
  { label: "Truck", bodyType: "Pickup", icon: <Truck className="h-8 w-8 text-slate-700" /> },
  { label: "Hybrid", bodyType: "Hybrid", icon: <Zap className="h-8 w-8 text-slate-700" /> },
  { label: "SUV", bodyType: "SUV", icon: <CarFront className="h-8 w-8 text-slate-700" /> },
  { label: "Hatchback", bodyType: "Hatchback", icon: <Car className="h-8 w-8 text-slate-700" /> },
  { label: "Wagon", bodyType: "Wagon", icon: <Car className="h-8 w-8 text-slate-700" /> },
  { label: "MPV", bodyType: "MPV", icon: <Bus className="h-8 w-8 text-slate-700" /> },
];

const TOP_BRAND_SLUGS = ["toyota", "honda", "nissan", "suzuki", "subaru", "mazda", "mitsubishi", "daihatsu", "volkswagen", "mercedes-benz"];
const topBrands = TOP_BRAND_SLUGS.map((slug) => carBrands.find((b) => b.slug === slug)).filter(Boolean) as typeof carBrands;

function inventoryWithBodyType(bodyType: string) {
  return `${routes.inventory}?bodyType=${encodeURIComponent(bodyType)}`;
}

function inventoryWithMake(make: string) {
  return `${routes.inventory}?make=${encodeURIComponent(make)}`;
}

export default function CarBodyShapesAndBrandsSection() {
  return (
    <section className="section bg-slate-50" aria-labelledby="car-type-brand-heading">
      <div className="container-custom">
        {/* Tradeware Group: red subtitle, dark blue title */}
        <div className="text-center mb-6">
          <p className="eyebrow-mdk mb-1">Find your perfect car by type and brand</p>
          <h2 id="car-type-brand-heading" className="heading-section-mdk text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight mb-4">
            For you to choose
          </h2>
          <div className="flex justify-center">
            <span
              className="inline-block px-6 py-3 rounded-lg bg-red-600 text-white font-semibold text-sm uppercase tracking-wide"
              aria-hidden
            >
              Car Body Shapes & Top Car Brands
            </span>
          </div>
        </div>

        {/* Car Body Shapes grid */}
        <div className="mb-10">
          <h3 className="text-slate-900 font-semibold text-lg mb-4">Car Body Shapes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {bodyShapes.map((item) => (
              <Link
                key={item.bodyType}
                href={inventoryWithBodyType(item.bodyType)}
                className="flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-red-500/30 transition-all duration-200 group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-white border border-slate-100 mb-3 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-slate-800 font-medium text-sm text-center uppercase tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Car Brands grid */}
        <div>
          <h3 className="text-slate-900 font-semibold text-lg mb-3">Top Car Brands</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {topBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={inventoryWithMake(brand.name)}
                className="flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-red-500/30 transition-all duration-200 group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-white border border-slate-200 mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                  <Image
                    src={brand.logoUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain w-10 h-10 text-slate-700"
                  />
                </div>
                <span className="text-slate-800 font-medium text-sm text-center">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
