"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import { carBrands } from "@/data/car-brands";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { ArrowRight, MapPin, Filter, X, Search, Sparkles, TrendingUp, Grid3x3, List, SortAsc, ChevronDown, Fuel, Gauge, Calendar, Loader2 } from "lucide-react";
import AdvancedFilters from "./AdvancedFilters";
import TotalPriceCalculator from "./TotalPriceCalculator";
import { FilterState, type FilterOptions } from "@/types/inventory";
import { getAllMakes, getModelsByMake } from "@/data/vehicles";
import { extendedVehicles } from "@/data/vehicles-extended";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { routes } from "@/config/routes";
import type { Vehicle } from "@/types";

function mapApiVehicleToFrontend(v: {
  id: string;
  stockId: string;
  make: string;
  model: string;
  year: number;
  price: number;
  priceCif?: number | null;
  currency: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType?: string | null;
  color: string;
  location: string;
  images: string[];
  description: string;
  features: string[];
}): Vehicle {
  const imgs = Array.isArray(v.images) ? v.images : [];
  return {
    id: v.id,
    stockId: v.stockId,
    make: v.make,
    model: v.model,
    year: v.year,
    price: { fob: v.price, cif: v.priceCif ?? undefined, currency: v.currency },
    engine: { displacement: "", type: "", fuel: v.fuelType },
    transmission: v.transmission,
    mileage: v.mileage,
    color: v.color,
    auctionGrade: (v as { auctionGrade?: string }).auctionGrade ?? "",
    condition: (v as { condition?: string }).condition ?? "",
    images: imgs.length ? imgs : ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"],
    location: v.location,
    features: Array.isArray(v.features) ? v.features : [],
    description: v.description || "",
  };
}

type ViewMode = "grid" | "list";
type SortBy = "newest" | "price-low" | "price-high" | "year" | "mileage";

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [filters, setFilters] = useState<FilterState>({
    make: "",
    model: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    fuel: "",
    transmission: "",
    minMileage: "",
    maxMileage: "",
    bodyType: "",
    color: "",
    location: "",
    stockId: "",
    minCC: "",
    maxCC: "",
  });

  const [apiVehicles, setApiVehicles] = useState<Vehicle[] | null>(null);
  const [apiTotal, setApiTotal] = useState<number | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  // Live filter options from API (Refine sidebar dropdowns)
  useEffect(() => {
    fetch("/api/vehicles/filters", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { makes?: string[]; transmissions?: string[]; fuelTypes?: string[]; locations?: string[] } | null) => {
        if (data && (data.makes?.length || data.transmissions?.length || data.fuelTypes?.length || data.locations?.length)) {
          setFilterOptions({
            makes: data.makes ?? [],
            models: [],
            transmissions: data.transmissions ?? [],
            fuelTypes: data.fuelTypes ?? [],
            locations: data.locations ?? [],
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!filters.make) {
      setFilterOptions((prev) => (prev ? { ...prev, models: [] } : null));
      return;
    }
    fetch(`/api/vehicles/filters?make=${encodeURIComponent(filters.make)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { models?: string[] } | null) => {
        const models = Array.isArray(data?.models) ? data.models : [];
        setFilterOptions((prev) => (prev ? { ...prev, models } : { makes: [], models, transmissions: [], fuelTypes: [], locations: [] }));
      })
      .catch(() => setFilterOptions((prev) => (prev ? { ...prev, models: [] } : null)));
  }, [filters.make]);

  // Load filters from URL params
  useEffect(() => {
    if (searchParams) {
      const urlFilters: Partial<FilterState> = {};
      if (searchParams.get("make")) urlFilters.make = searchParams.get("make") || "";
      if (searchParams.get("model")) urlFilters.model = searchParams.get("model") || "";
      if (searchParams.get("bodyType")) urlFilters.bodyType = searchParams.get("bodyType") || "";
      if (searchParams.get("fuel")) urlFilters.fuel = searchParams.get("fuel") || "";
      if (searchParams.get("minYear")) urlFilters.minYear = searchParams.get("minYear") || "";
      if (searchParams.get("maxYear")) urlFilters.maxYear = searchParams.get("maxYear") || "";
      if (searchParams.get("minPrice")) urlFilters.minPrice = searchParams.get("minPrice") || "";
      if (searchParams.get("maxPrice")) urlFilters.maxPrice = searchParams.get("maxPrice") || "";
      if (searchParams.get("transmission")) urlFilters.transmission = searchParams.get("transmission") || "";
      if (searchParams.get("minMileage")) urlFilters.minMileage = searchParams.get("minMileage") || "";
      if (searchParams.get("maxMileage")) urlFilters.maxMileage = searchParams.get("maxMileage") || "";
      if (searchParams.get("location")) urlFilters.location = searchParams.get("location") || "";
      if (searchParams.get("stockId")) urlFilters.stockId = searchParams.get("stockId") || "";
      
      if (Object.keys(urlFilters).length > 0) {
        setFilters((prev) => ({ ...prev, ...urlFilters }));
        setShowFilters(true); // Auto-open filters if coming from home page
      }
    }
  }, [searchParams]);

  const hasUrlFilters = useMemo(() => {
    if (!searchParams) return false;
    return !!(
      searchParams.get("make") || searchParams.get("model") || searchParams.get("bodyType") ||
      searchParams.get("fuel") || searchParams.get("minYear") || searchParams.get("maxYear") ||
      searchParams.get("minPrice") || searchParams.get("maxPrice") || searchParams.get("transmission") ||
      searchParams.get("minMileage") || searchParams.get("maxMileage") || searchParams.get("location") || searchParams.get("stockId")
    );
  }, [searchParams]);

  useEffect(() => {
    if (!hasUrlFilters) {
      setApiVehicles(null);
      setApiTotal(null);
      return;
    }
    const params = new URLSearchParams();
    if (searchParams.get("make")) params.set("make", searchParams.get("make")!);
    if (searchParams.get("model")) params.set("model", searchParams.get("model")!);
    if (searchParams.get("bodyType")) params.set("bodyType", searchParams.get("bodyType")!);
    if (searchParams.get("type")) params.set("type", searchParams.get("type")!);
    if (searchParams.get("fuel")) params.set("fuel", searchParams.get("fuel")!);
    if (searchParams.get("minYear")) params.set("minYear", searchParams.get("minYear")!);
    if (searchParams.get("maxYear")) params.set("maxYear", searchParams.get("maxYear")!);
    if (searchParams.get("minPrice")) params.set("minPrice", searchParams.get("minPrice")!);
    if (searchParams.get("maxPrice")) params.set("maxPrice", searchParams.get("maxPrice")!);
    if (searchParams.get("transmission")) params.set("transmission", searchParams.get("transmission")!);
    if (searchParams.get("minMileage")) params.set("minMileage", searchParams.get("minMileage")!);
    if (searchParams.get("maxMileage")) params.set("maxMileage", searchParams.get("maxMileage")!);
    if (searchParams.get("location")) params.set("location", searchParams.get("location")!);
    if (searchParams.get("stockId")) params.set("stockId", searchParams.get("stockId")!);
    params.set("limit", "50");

    setLoadingApi(true);
    fetch(`/api/vehicles?${params.toString()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { vehicles?: unknown[]; total?: number } | null) => {
        if (data && Array.isArray(data.vehicles)) {
          setApiVehicles(data.vehicles.map((v) => mapApiVehicleToFrontend(v as Parameters<typeof mapApiVehicleToFrontend>[0])));
          setApiTotal(typeof data.total === "number" ? data.total : data.vehicles.length);
        } else {
          setApiVehicles(null);
          setApiTotal(null);
        }
      })
      .catch(() => {
        setApiVehicles(null);
        setApiTotal(null);
      })
      .finally(() => setLoadingApi(false));
  }, [hasUrlFilters, searchParams]);

  const allVehicles = [...vehicles, ...extendedVehicles];

  const filteredVehicles = useMemo(() => {
    let result = allVehicles;

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.stockId.toLowerCase().includes(query) ||
          `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.make) result = result.filter((v) => v.make.toLowerCase() === filters.make.toLowerCase());
    if (filters.model) result = result.filter((v) => v.model.toLowerCase() === filters.model.toLowerCase());
    if (filters.minYear) result = result.filter((v) => v.year >= parseInt(filters.minYear));
    if (filters.maxYear) result = result.filter((v) => v.year <= parseInt(filters.maxYear));
    if (filters.minPrice) result = result.filter((v) => v.price.fob >= parseInt(filters.minPrice));
    if (filters.maxPrice) result = result.filter((v) => v.price.fob <= parseInt(filters.maxPrice));
    if (filters.fuel) result = result.filter((v) => v.engine.fuel.toLowerCase() === filters.fuel.toLowerCase());
    if (filters.transmission) result = result.filter((v) => v.transmission.toLowerCase() === filters.transmission.toLowerCase());
    if (filters.minMileage) result = result.filter((v) => v.mileage >= parseInt(filters.minMileage));
    if (filters.maxMileage) result = result.filter((v) => v.mileage <= parseInt(filters.maxMileage));
    if (filters.color) result = result.filter((v) => v.color.toLowerCase() === filters.color!.toLowerCase());
    if (filters.location) result = result.filter((v) => v.location === filters.location);
    if (filters.stockId) result = result.filter((v) => v.stockId.toLowerCase().includes(filters.stockId!.toLowerCase()));

    // Sort
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price.fob - b.price.fob;
        case "price-high":
          return b.price.fob - a.price.fob;
        case "year":
          return b.year - a.year;
        case "mileage":
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return sorted;
  }, [filters, searchQuery, sortBy]);

  const displayVehicles = useMemo(() => {
    if (apiVehicles && apiVehicles.length >= 0) {
      let list = apiVehicles;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (v) =>
            v.make.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.stockId.toLowerCase().includes(q) ||
            `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(q)
        );
      }
      return [...list].sort((a, b) => {
        switch (sortBy) {
          case "price-low": return a.price.fob - b.price.fob;
          case "price-high": return b.price.fob - a.price.fob;
          case "year": return b.year - a.year;
          case "mileage": return a.mileage - b.mileage;
          default: return 0;
        }
      });
    }
    return filteredVehicles;
  }, [apiVehicles, filteredVehicles, searchQuery, sortBy]);

  const makes = getAllMakes();
  const activeFiltersCount = Object.values(filters).filter(v => v !== "").length;

  const calculatorContext = useMemo(() => {
    const hasSearch = !!(filters.make || filters.model || filters.minYear || filters.maxYear || filters.minPrice || filters.maxPrice || filters.fuel || filters.bodyType);
    const yearRange =
      filters.minYear && filters.maxYear
        ? `${filters.minYear}~${filters.maxYear}`
        : filters.maxYear || filters.minYear || "";
    const label = [filters.make, filters.model, yearRange].filter(Boolean).join(" / ") || "All Vehicles";
    const source = displayVehicles.length > 0 ? displayVehicles : (apiVehicles && apiVehicles.length > 0 ? apiVehicles : allVehicles);
    const avg =
      source.length > 0
        ? Math.round(source.reduce((s, v) => s + v.price.fob, 0) / source.length)
        : 0;
    const minPrice = source.length > 0 ? Math.min(...source.map((v) => v.price.fob)) : 0;
    const maxPrice = source.length > 0 ? Math.max(...source.map((v) => v.price.fob)) : 0;
    return { hasSearch, label, averagePrice: avg, count: displayVehicles.length, minPrice, maxPrice };
  }, [filters.make, filters.model, filters.minYear, filters.maxYear, filters.minPrice, filters.maxPrice, filters.fuel, filters.bodyType, displayVehicles, apiVehicles, allVehicles]);

  return (
    <div className="w-full min-w-0 bg-black pt-14 md:pt-16 pb-10 md:pb-12 relative overflow-x-hidden">
      <div className="absolute -top-20 -right-20 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-cyan-500/10 blur-[100px] md:blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] bg-purple-500/5 blur-[80px] md:blur-[100px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-6 md:mb-8 px-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Breadcrumbs />

          <div className="inline-flex items-center gap-1.5 mb-3 md:mb-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400 shrink-0" />
            <span className="text-cyan-400 font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.18em] font-body">Curated Stock</span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 md:mb-4 tracking-tighter leading-none font-display break-words">
            PREMIUM <br />
            <span className="gradient-text gradient-text-glow italic">VEHICLE INVENTORY</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl font-medium leading-relaxed font-body break-words">
            Explore our comprehensive inventory of over 50,000 premium Japanese vehicles sourced directly from Japan's largest auction network, including USS, TAA, CAA, and 120+ additional auction partners. Each vehicle in our inventory has been carefully selected and verified, with detailed auction sheets, comprehensive inspection reports, and high-resolution photographs available for review. Our advanced search and filtering system allows you to find vehicles by make, model, year, price range, body type, fuel type, transmission, mileage, auction grade, and location. Whether you're seeking a luxury sedan, rugged SUV, commercial van, or specialty vehicle, our extensive inventory spans all categories to meet diverse customer needs across global markets. All vehicles are export-ready with complete documentation packages prepared for international shipping.
          </p>
        </motion.div>

        {/* Total Price Calculator + Current search */}
        <motion.div
          id="total-price-calculator"
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="lg:col-span-5 xl:col-span-4">
            <TotalPriceCalculator
              vehiclePrice={calculatorContext.averagePrice > 0 ? calculatorContext.averagePrice : undefined}
              vehicleLabel={calculatorContext.label}
            />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="glass-card rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 h-full min-h-[200px] flex flex-col justify-between min-w-0">
              <div>
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  {calculatorContext.hasSearch ? "Current search" : "Inventory overview"}
                </h3>
                <p className="text-base sm:text-lg font-bold text-white font-body break-words">
                  {calculatorContext.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs sm:text-sm">
                  <span className="text-zinc-400">
                    <strong className="text-white">{calculatorContext.count}</strong> vehicle{calculatorContext.count !== 1 ? "s" : ""}
                  </span>
                  {calculatorContext.averagePrice > 0 && (
                    <span className="text-zinc-400">
                      Avg: <strong className="text-cyan-400">${calculatorContext.averagePrice.toLocaleString()}</strong>
                    </span>
                  )}
                  {calculatorContext.minPrice > 0 && calculatorContext.maxPrice > 0 && (
                    <span className="text-zinc-400">
                      Range: <strong className="text-white">${calculatorContext.minPrice.toLocaleString()}</strong> – <strong className="text-white">${calculatorContext.maxPrice.toLocaleString()}</strong>
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-zinc-500">
                  {calculatorContext.count === 0
                    ? "No vehicles match your filters. Stats below show full inventory for reference. Adjust filters or browse all."
                    : "Prices feed the Total Price Calculator for real-time CIF costing. Use filters below to refine."}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`${routes.contact}?inquiry=email-alerts`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Get email alerts for new vehicles
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={routes.contact}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-500/20 transition-colors cursor-pointer"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Save search
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FIND USED CARS Search Form - Prominent */}
        <motion.div
          className="mb-6 md:mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-3 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/10 shadow-2xl bg-white/5 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 md:mb-4 uppercase tracking-tight font-display break-words">
              FIND USED CARS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Make Dropdown */}
              <div className="relative group">
                <label className="block text-[9px] font-black text-gray-500 mb-1.5 uppercase tracking-[0.18em] font-body">
                  Any Make
                </label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value, model: "" }))}
                  className="w-full h-12 px-4 rounded-lg bg-black/50 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer uppercase tracking-wider font-body"
                >
                  <option value="" className="bg-black text-white">Any Make</option>
                  {makes.map((make) => (
                    <option key={make} value={make} className="bg-black text-white">{make}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[36px] h-3.5 w-3.5 text-cyan-500/50 pointer-events-none" />
              </div>

              {/* Model Dropdown */}
              <div className="relative group">
                <label className="block text-[9px] font-black text-gray-500 mb-1.5 uppercase tracking-[0.18em] font-body">
                  Any Model
                </label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
                  disabled={!filters.make}
                  className="w-full h-12 px-4 rounded-lg bg-black/50 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer uppercase tracking-wider font-body disabled:opacity-30"
                >
                  <option value="" className="bg-black text-white">Any Model</option>
                  {filters.make && getModelsByMake(filters.make).map((model) => (
                    <option key={model} value={model} className="bg-black text-white">{model}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[36px] h-3.5 w-3.5 text-cyan-500/50 pointer-events-none" />
              </div>

              {/* Year Dropdown */}
              <div className="relative group">
                <label className="block text-[9px] font-black text-gray-500 mb-1.5 uppercase tracking-[0.18em] font-body">
                  Any Year
                </label>
                <select
                  value={filters.maxYear || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxYear: e.target.value }))}
                  className="w-full h-12 px-4 rounded-lg bg-black/50 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer uppercase tracking-wider font-body"
                >
                  <option value="" className="bg-black text-white">Any Year</option>
                  {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year.toString()} className="bg-black text-white">{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[36px] h-3.5 w-3.5 text-cyan-500/50 pointer-events-none" />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => document.getElementById("inventory-results")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-lg shadow-cyan-500/20 font-body cursor-pointer"
                >
                  SEARCH VEHICLES
                </button>
              </div>
            </div>

            {/* Car Brand Logos Slider */}
            <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-white/[0.08]">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 font-body">
                Browse by brand
              </p>
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 py-3 px-2" aria-label="Car brand logos">
                <div className="marquee-brands-track flex w-max items-center gap-6 md:gap-8">
                  {[...carBrands, ...carBrands].map((brand, i) => (
                    <button
                      key={`${brand.slug}-${i}`}
                      type="button"
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, make: brand.name, model: "" }));
                        setTimeout(() => document.getElementById("inventory-results")?.scrollIntoView({ behavior: "smooth" }), 100);
                      }}
                      className="flex shrink-0 items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all overflow-hidden group cursor-pointer"
                      title={`Filter by ${brand.name}`}
                      aria-label={`Filter by ${brand.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.logoUrl}
                        alt=""
                        width={48}
                        height={48}
                        className="w-8 h-8 sm:w-9 sm:h-9 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = "none";
                          const fallback = el.nextElementSibling;
                          if (fallback) (fallback as HTMLElement).style.display = "flex";
                        }}
                      />
                      <span
                        className="hidden w-8 h-8 sm:w-9 sm:h-9 items-center justify-center text-xs font-bold text-cyan-400"
                        aria-hidden
                      >
                        {brand.name.charAt(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notice Banner */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="w-full px-3 sm:px-4 md:px-5 py-2.5 md:py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 border border-cyan-500/30 backdrop-blur-md min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-black text-white uppercase tracking-wider font-body break-words">
                IMPORTANT NOTICE: All vehicles undergo 150-point inspection & come with full documentation
              </span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 xl:w-72 hidden lg:block shrink-0 min-w-0">
            <motion.div
              className="glass-card p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl sticky top-20 md:top-24 border border-white/10 shadow-2xl bg-white/5 min-w-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-5 pb-3 md:pb-4 border-b border-white/10">
                <h2 className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-tight font-display break-words">
                  REFINE YOUR SEARCH
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-black text-[9px] font-black font-body">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <AdvancedFilters filters={filters} setFilters={setFilters} makes={makes} filterOptions={filterOptions ?? undefined} />
              
              {/* Quick Links Section */}
              <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-white/10">
                <h3 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider mb-2 font-display">Quick Tools</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <Link href={routes.pricing} className="block px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all text-[11px] font-bold text-white uppercase tracking-wider font-body cursor-pointer">
                    BANK RATES
                  </Link>
                  <Link href={routes.auctionInformation} className="block px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all text-[11px] font-bold text-white uppercase tracking-wider font-body cursor-pointer">
                    AUCTION TERMS
                  </Link>
                  <Link href={routes.pricing} className="block px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all text-[11px] font-bold text-white uppercase tracking-wider font-body cursor-pointer">
                    PAYMENT TERMS
                  </Link>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Main Results */}
          <div id="inventory-results" className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-5 gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px] font-body">
                  Found <span className="text-white">{filteredVehicles.length}</span> Masterpieces
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-black text-[10px] uppercase tracking-wider cursor-pointer"
                >
                  <Filter className="h-3 w-3" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-black text-cyan-500 flex items-center justify-center text-[8px]">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="bg-transparent text-xs font-black text-white focus:outline-none border-b border-cyan-500/30 pb-1 pr-6 appearance-none cursor-pointer uppercase tracking-widest font-body"
                  >
                    <option value="newest" className="bg-black text-white">Newest First</option>
                    <option value="price-low" className="bg-black text-white">Price: Low - High</option>
                    <option value="price-high" className="bg-black text-white">Price: High - Low</option>
                    <option value="year" className="bg-black text-white">Model Year</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-cyan-500 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === "grid" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-gray-500 hover:text-white"}`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`hidden sm:block p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === "list" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-gray-500 hover:text-white"}`}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mb-8 overflow-hidden"
                >
                  <div className="glass-card p-8 rounded-2xl bg-white/5 border border-white/10">
                    <AdvancedFilters filters={filters} setFilters={setFilters} makes={makes} filterOptions={filterOptions ?? undefined} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" : "space-y-4 md:space-y-5"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loadingApi ? (
                  <div className="col-span-full flex items-center justify-center py-16">
                    <Loader2 className="h-10 w-10 animate-spin text-cyan-500" aria-hidden />
                    <span className="sr-only">Loading vehicles…</span>
                  </div>
                ) : (
                displayVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    whileHover={{ y: -10, scale: 1.02, rotateY: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={routes.vehicleDetail(vehicle.id)}
                      className={`card card-cinematic group overflow-hidden border border-white/10 hover:border-cyan-500/35 shadow-2xl transition-all duration-500 bg-black/20 flex relative cursor-pointer ${viewMode === "list" ? "flex-col sm:flex-row h-auto sm:h-64" : "flex-col"}`}
                    >
                      {/* Animated Glow Border */}
                      <motion.div
                        className="absolute inset-0 border-2 border-cyan-500/0 rounded-[2rem] pointer-events-none"
                        whileHover={{ borderColor: "rgba(0, 217, 255, 0.5)" }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-full sm:w-1/3 min-h-[180px]" : "h-52 md:h-64 lg:h-72"}`}>
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 2 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                          <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - Premium Japanese vehicle`}
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 0.9 }}
                          transition={{ duration: 0.3 }}
                          aria-hidden="true"
                        />
                        <motion.div
                          className="absolute top-3 left-3 flex gap-1.5"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                        >
                          <motion.span
                            className="px-3 py-1.5 rounded-md bg-black/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 font-body flex items-center gap-1.5"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            animate={{
                              boxShadow: [
                                "0 0 10px rgba(255, 255, 255, 0.1)",
                                "0 0 20px rgba(255, 255, 255, 0.2)",
                                "0 0 10px rgba(255, 255, 255, 0.1)",
                              ],
                            }}
                            transition={{
                              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                              <Calendar className="h-2.5 w-2.5" />
                            </motion.div>
                            REGISTERED {vehicle.year}
                          </motion.span>
                        </motion.div>
                        {vehicle.auctionGrade && (
                          <motion.div
                            className="absolute top-3 right-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 + 0.3 }}
                          >
                            <motion.span
                              className="px-2.5 py-1 rounded-md bg-cyan-500 text-black text-[10px] font-black uppercase tracking-wider font-body shadow-lg shadow-cyan-500/30"
                              whileHover={{ scale: 1.15, rotate: -5 }}
                              animate={{
                                boxShadow: [
                                  "0 0 20px rgba(0, 217, 255, 0.3)",
                                  "0 0 40px rgba(0, 217, 255, 0.6)",
                                  "0 0 20px rgba(0, 217, 255, 0.3)",
                                ],
                              }}
                              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
                            >
                              Grade {vehicle.auctionGrade}
                            </motion.span>
                          </motion.div>
                        )}
                        {/* Animated Availability Badge */}
                        <motion.div
                          className="absolute bottom-4 left-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + 0.4 }}
                        >
                          <motion.span
                            className="px-3 py-1.5 rounded-md bg-green-500/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider font-body flex items-center gap-1.5"
                            whileHover={{ scale: 1.1, x: 5 }}
                          >
                            <motion.div
                              className="w-2 h-2 rounded-full bg-white"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            Available
                          </motion.span>
                        </motion.div>
                      </div>

                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-[1px] bg-cyan-500/50" />
                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest font-body">{vehicle.make}</span>
                          </div>
                          <motion.h3
                            className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors font-display"
                            whileHover={{ x: 5 }}
                          >
                            {vehicle.make} {vehicle.model}
                          </motion.h3>
                          
                          {/* Animated Vehicle Details Icons */}
                          <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                          >
                            {[
                              { icon: Gauge, label: formatMileage(vehicle.mileage) },
                              { icon: Fuel, label: vehicle.engine.fuel },
                              { icon: TrendingUp, label: vehicle.transmission },
                            ].map((item, i) => {
                              const Icon = item.icon;
                              return (
                                <motion.div
                                  key={i}
                                  className="flex items-center gap-2 text-xs font-bold text-gray-400 font-body"
                                  whileHover={{ scale: 1.1, x: 5, color: "#00D9FF" }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * 2 }}
                                  >
                                    <Icon className="h-4 w-4 text-cyan-500/70" />
                                  </motion.div>
                                  <span>{item.label}</span>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </div>

                        <motion.div
                          className="flex items-end justify-between pt-4 border-t border-white/10"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + 0.3 }}
                        >
                          <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 font-body">Price</div>
                            <motion.div
                              className="text-2xl md:text-3xl font-black text-white font-display"
                              whileHover={{ scale: 1.1, x: 5 }}
                              animate={{
                                backgroundPosition: ["0%", "100%", "0%"],
                              }}
                              style={{
                                background: "linear-gradient(90deg, #ffffff 0%, #00D9FF 50%, #ffffff 100%)",
                                backgroundSize: "200% 200%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                              transition={{
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
                            >
                              {formatCurrency(vehicle.price.fob)}
                            </motion.div>
                          </div>
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-500"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:text-black transition-colors" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))
                )}
              </motion.div>
            </AnimatePresence>

            {!loadingApi && displayVehicles.length === 0 && (
              <div className="text-center py-40">
                <div className="text-5xl font-black text-white mb-10 opacity-20 font-display">NO MASTERPIECES FOUND</div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn-primary"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

