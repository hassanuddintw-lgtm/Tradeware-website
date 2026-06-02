"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { vehicles } from "@/data/vehicles";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { routes } from "@/config/routes";
import { ArrowRight, MapPin, Fuel, Gauge, Share2, Heart } from "lucide-react";

const featured = vehicles.slice(0, 8);
const CARD_WIDTH = 320;
const GAP = 20;
const AUTOPLAY_MS = 2500;

export default function FeaturedVehicles() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, featured.length - visibleCount);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const left = scrollRef.current.scrollLeft;
    const step = CARD_WIDTH + GAP;
    setScrollIndex(Math.round(left / step));
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const offset = scrollIndex * (CARD_WIDTH + GAP);
    scrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
  }, [scrollIndex]);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const t = setInterval(() => {
      setScrollIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [maxIndex]);

  return (
    <section className="section bg-white relative" aria-labelledby="featured-vehicles-heading">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <h2 id="featured-vehicles-heading" className="heading-section-mdk text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Inventory
            </h2>
          </div>
          <Link
            href={routes.inventory}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base inline-flex items-center gap-1 shrink-0"
          >
            See All Featured Vehicles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {featured.map((vehicle) => (
              <article
                key={vehicle.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] snap-start"
              >
                <Link
                  href={routes.vehicleDetail(vehicle.id)}
                  className="block glass-card rounded-xl overflow-hidden group transition-all duration-mdk"
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-mdk-slow"
                      sizes="320px"
                      unoptimized
                    />
                    <span className="absolute top-3 left-3 rounded px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      {vehicle.location}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
                      {vehicle.make} {vehicle.model} {vehicle.year}
                    </h3>
                    <p className="text-red-600 font-bold text-lg mb-0.5">
                      {formatCurrency(vehicle.price.fob, vehicle.price.currency)}
                    </p>
                    <p className="text-slate-500 text-xs mb-3">Total Price (FOB)</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Fuel className="h-3.5 w-3.5 text-slate-400" />
                        {vehicle.engine.fuel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge className="h-3.5 w-3.5 text-slate-400" />
                        {formatMileage(vehicle.mileage)} km
                      </span>
                      <span className="text-slate-600">{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold group-hover:bg-blue-700 transition-colors">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                        aria-label="Share"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                        aria-label="Add to favourites"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
