"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car, MapPin, Calendar, Fuel, Gauge, ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { formatCurrency, formatMileage } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export interface VehicleCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency?: string;
  mileage: number;
  fuelType: string;
  location: string;
  image: string;
  auctionGrade?: string;
  condition?: string;
  stockId?: string;
  featured?: boolean;
}

export default function VehicleCard({
  id,
  make,
  model,
  year,
  price,
  currency = "USD",
  mileage,
  fuelType,
  location,
  image,
  auctionGrade,
  condition,
  stockId,
  featured = false,
}: VehicleCardProps) {
  return (
    <motion.div
      className="card p-0 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-dark-800">
        <Image
          src={image}
          alt={`${year} ${make} ${model}`}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="info">Featured</Badge>
          </div>
        )}
        {auctionGrade && (
          <div className="absolute top-4 right-4">
            <Badge variant="default">Grade {auctionGrade}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-xl font-black text-white mb-1">
            {year} {make} {model}
          </h3>
          {stockId && (
            <p className="text-sm text-gray-400">Stock ID: {stockId}</p>
          )}
        </div>

        {/* Specs */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4 text-cyan-500" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Gauge className="h-4 w-4 text-cyan-500" />
            <span>{formatMileage(mileage)} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Fuel className="h-4 w-4 text-cyan-500" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-cyan-500" />
            <span>{location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 pt-4 border-t border-white/10">
          <div className="text-2xl font-black text-cyan-500">
            {formatCurrency(price, currency)}
          </div>
          {condition && (
            <p className="text-sm text-gray-400 mt-1">Condition: {condition}</p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={routes.vehicleDetail(id)}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
