"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { ArrowRight, MapPin, Filter, X, Search, Sparkles, TrendingUp, Grid3x3, List, SortAsc, ChevronDown, Fuel, Gauge, Calendar, Loader2 } from "lucide-react";
import AdvancedFilters from "./AdvancedFilters";
import TotalPriceCalculator from "./TotalPriceCalculator";
import { FilterState, type FilterOptions } from "@/types/inventory";
import { getAllMakes, getModelsByMake } from "@/data/vehicles";
import { extendedVehicles } from "@/data/vehicles-extended";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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

  return (
    <div className="w-full min-w-0 bg-white pb-10 md:pb-12 relative overflow-x-hidden">
      <div className="container-custom relative z-10 pt-6">
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Breadcrumbs />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Used Cars
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl">
            Browse premium Japanese vehicles. Filter by make, model, and year.
          </p>
        </motion.div>

        {/* Search filters - simple bar */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 md:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Make</label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value, model: "" }))}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer"
                >
                  <option value="">Any Make</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Model</label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
                  disabled={!filters.make}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer disabled:opacity-60"
                >
                  <option value="">Any Model</option>
                  {filters.make && getModelsByMake(filters.make).map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Year</label>
                <select
                  value={filters.maxYear || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxYear: e.target.value }))}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer"
                >
                  <option value="">Any Year</option>
                  {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => document.getElementById("inventory-results")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full h-11 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 xl:w-72 hidden lg:block shrink-0 min-w-0">
            <motion.div
              className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 sticky top-24 shadow-sm"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-900">
                  Refine search
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-600 text-white text-xs font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <AdvancedFilters filters={filters} setFilters={setFilters} makes={makes} filterOptions={filterOptions ?? undefined} />
            </motion.div>
          </aside>

          {/* Main Results */}
          <div id="inventory-results" className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 min-w-0">
              <div className="flex items-center justify-between w-full sm:w-auto gap-2 min-w-0">
                <p className="text-sm font-semibold text-slate-700">
                  <span className="text-slate-900">{displayVehicles.length}</span> vehicles
                </p>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="min-w-[18px] h-[18px] rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <div className="relative min-w-[140px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg pl-3 pr-8 py-2 appearance-none cursor-pointer"
                  >
                    <option value="newest">Newest first</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="year">Model year</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`hidden sm:block p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
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
                  className="lg:hidden mb-6 overflow-hidden"
                >
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
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
                    <Loader2 className="h-10 w-10 animate-spin text-red-500" aria-hidden />
                    <span className="sr-only">Loading vehicles…</span>
                  </div>
                ) : (
                displayVehicles.map((vehicle) => (
                  <Link
                    key={vehicle.id}
                    href={routes.vehicleDetail(vehicle.id)}
                    className={`group block rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-red-500/30 transition-all ${viewMode === "list" ? "flex flex-col sm:flex-row sm:h-52" : ""}`}
                  >
                    <div className={`relative overflow-hidden bg-slate-100 ${viewMode === "list" ? "sm:w-72 shrink-0 h-48 sm:h-full" : "h-48 md:h-56"}`}>
                      <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        <span className="px-2 py-1 rounded bg-white/90 text-slate-800 text-xs font-semibold">
                          {vehicle.year}
                        </span>
                        {vehicle.auctionGrade && (
                          <span className="px-2 py-1 rounded bg-red-600 text-white text-xs font-semibold">
                            Grade {vehicle.auctionGrade}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-0.5">{vehicle.make}</p>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Gauge className="h-3.5 w-3.5" />
                          {formatMileage(vehicle.mileage)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="h-3.5 w-3.5" />
                          {vehicle.engine.fuel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {vehicle.transmission}
                        </span>
                      </div>
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">{formatCurrency(vehicle.price.fob)}</span>
                        <span className="text-red-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
                )}
              </motion.div>
            </AnimatePresence>

            {!loadingApi && displayVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-600 mb-4">No vehicles match your filters.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

