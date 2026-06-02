"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, X, ChevronDown, MapPin, Car, Fuel, Gauge, DollarSign, Calendar, Wrench, Calculator, MessageCircle } from "lucide-react";
import { getAllMakes, getModelsByMake } from "@/data/vehicles";
import { vehicles } from "@/data/vehicles";
import { extendedVehicles } from "@/data/vehicles-extended";
import { routes } from "@/config/routes";
import { sectionRevealPremium } from "@/lib/animations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FALLBACK_FUEL = ["Petrol", "Diesel", "Hybrid", "Electric"];
const FALLBACK_BODY = ["SUV", "Sedan", "Hatchback", "Wagon", "Van", "Coupe", "Pickup"];
const transmissionTypes = ["Automatic", "Manual", "CVT"];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

const pricePresets = [
  { label: "Under $10k", min: 0, max: 10000 },
  { label: "$10k–$20k", min: 10000, max: 20000 },
  { label: "$20k–$35k", min: 20000, max: 35000 },
  { label: "$35k+", min: 35000, max: 999999 },
];

const mileagePresets = [
  { label: "Under 30k km", min: 0, max: 30000 },
  { label: "30k–60k km", min: 30000, max: 60000 },
  { label: "60k–100k km", min: 60000, max: 100000 },
  { label: "100k+ km", min: 100000, max: 999999 },
];

export default function HomeVehicleFilter() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [location, setLocation] = useState("");
  const [recNo, setRecNo] = useState("");

  const [apiFilters, setApiFilters] = useState<{
    makes: string[];
    bodyTypes: string[];
    fuelTypes: string[];
    locations: string[];
    total: number;
    yearMin: number;
    yearMax: number;
  } | null>(null);
  const [apiModels, setApiModels] = useState<string[]>([]);

  const fetchFilters = useCallback(() => {
    fetch("/api/vehicles/filters", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.total === "number") {
          setApiFilters({
            makes: Array.isArray(data.makes) ? data.makes : [],
            bodyTypes: Array.isArray(data.bodyTypes) ? data.bodyTypes : [],
            fuelTypes: Array.isArray(data.fuelTypes) ? data.fuelTypes : [],
            locations: Array.isArray(data.locations) ? data.locations : [],
            total: data.total,
            yearMin: typeof data.yearMin === "number" ? data.yearMin : currentYear - 24,
            yearMax: typeof data.yearMax === "number" ? data.yearMax : currentYear,
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    if (!make) {
      setApiModels([]);
      return;
    }
    fetch(`/api/vehicles/filters?make=${encodeURIComponent(make)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.models)) setApiModels(data.models);
        else setApiModels(getModelsByMake(make));
      })
      .catch(() => setApiModels(getModelsByMake(make)));
  }, [make]);

  const makes = useMemo(() => (apiFilters?.makes?.length ? apiFilters.makes : getAllMakes()), [apiFilters?.makes]);
  const models = useMemo(() => (apiModels.length > 0 ? apiModels : (make ? getModelsByMake(make) : [])), [make, apiModels]);

  const bodyTypes = useMemo(() => (apiFilters?.bodyTypes?.length ? apiFilters.bodyTypes : FALLBACK_BODY), [apiFilters?.bodyTypes]);
  const fuelTypes = useMemo(() => (apiFilters?.fuelTypes?.length ? apiFilters.fuelTypes : FALLBACK_FUEL), [apiFilters?.fuelTypes]);

  const locations = useMemo(() => {
    if (apiFilters?.locations?.length) return apiFilters.locations;
    const locs = new Set<string>();
    vehicles.forEach((v) => locs.add(v.location));
    return Array.from(locs).sort();
  }, [apiFilters?.locations]);

  const totalVehicles = useMemo(() => apiFilters?.total ?? vehicles.length + extendedVehicles.length, [apiFilters?.total]);
  const yearRangeLabel = useMemo(() => {
    if (apiFilters) return `${apiFilters.yearMin}–${apiFilters.yearMax}`;
    return `${currentYear - 24}–${currentYear}`;
  }, [apiFilters]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (type) params.set("bodyType", type);
    if (fuel) params.set("fuel", fuel);
    if (yearFrom) params.set("minYear", yearFrom);
    if (yearTo) params.set("maxYear", yearTo);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (transmission) params.set("transmission", transmission);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);
    if (location) params.set("location", location);
    if (recNo) params.set("stockId", recNo);
    router.push(`${routes.inventory}?${params.toString()}`);
  };

  const clearFilters = () => {
    setMake("");
    setModel("");
    setType("");
    setFuel("");
    setYearFrom("");
    setYearTo("");
    setMinPrice("");
    setMaxPrice("");
    setTransmission("");
    setMinMileage("");
    setMaxMileage("");
    setLocation("");
    setRecNo("");
  };

  const hasFilters = make || model || type || fuel || yearFrom || yearTo || minPrice || maxPrice || transmission || minMileage || maxMileage || location || recNo;
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRevealPremium(headerRef.current, { delay: 0 });
      sectionRevealPremium(cardRef.current, { delay: 0.08 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section bg-slate-50 relative" aria-labelledby="filter-heading">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-6 md:mb-8">
          <p className="text-red-600 text-xs font-semibold uppercase tracking-widest mb-2">Find Your Perfect Vehicle</p>
          <h2 id="filter-heading" className="heading-section-mdk text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Search <span className="text-red-600">Cars</span>
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-sm md:text-base break-words px-1 mb-6">
            Search across 50,000+ premium Japanese vehicles. Filter by make, model, year, price, body type, fuel, transmission, mileage & location.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <Car className="h-4 w-4 text-red-500" />
              <strong className="text-slate-900">{makes.length}</strong> Makes
            </span>
            <span className="flex items-center gap-2 text-slate-600">
              <Fuel className="h-4 w-4 text-red-500" />
              <strong className="text-slate-900">{fuelTypes.length}</strong> Fuel Types
            </span>
            <span className="flex items-center gap-2 text-slate-600">
              <Gauge className="h-4 w-4 text-red-500" />
              <strong className="text-slate-900">{bodyTypes.length}</strong> Body Types
            </span>
            <span className="flex items-center gap-2 text-red-600 font-semibold">
              {totalVehicles}+ Vehicles
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div
            ref={cardRef}
            className="bg-white p-5 sm:p-6 md:p-8 relative overflow-visible rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-3 md:mb-5">
              {/* Make */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Maker
                </label>
                <div className="relative">
                  <select
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                      setModel("");
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select Maker</option>
                    {makes.map((m) => (
                      <option key={m} value={m} className="bg-white text-slate-900">
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  {make && (
                    <button
                      type="button"
                      onClick={() => {
                        setMake("");
                        setModel("");
                      }}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Model */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Model
                </label>
                <div className="relative">
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!make}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{make ? "Select Model" : "Please Select Maker"}</option>
                    {models.map((m) => (
                      <option key={m} value={m} className="bg-white text-slate-900">
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  {model && (
                    <button
                      type="button"
                      onClick={() => setModel("")}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    {bodyTypes.map((t) => (
                      <option key={t} value={t} className="bg-white text-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  {type && (
                    <button
                      type="button"
                      onClick={() => setType("")}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Fuel */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Fuel
                </label>
                <div className="relative">
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">All Fuels</option>
                    {fuelTypes.map((f) => (
                      <option key={f} value={f} className="bg-white text-slate-900">
                        {f}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  {fuel && (
                    <button
                      type="button"
                      onClick={() => setFuel("")}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-3 md:mb-5">
              {/* Year From */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Year From
                </label>
                <div className="relative">
                  <select
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">From</option>
                    {years.map((y) => (
                      <option key={y} value={y.toString()} className="bg-white text-slate-900">
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Year To */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Year To
                </label>
                <div className="relative">
                  <select
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">To</option>
                    {years.map((y) => (
                      <option key={y} value={y.toString()} className="bg-white text-slate-900">
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Stock ID */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Stock ID
                </label>
                <input
                  type="text"
                  value={recNo}
                  onChange={(e) => setRecNo(e.target.value)}
                  placeholder="e.g. STK-2024-001"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Car Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="bg-white text-slate-900">
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  {location && (
                    <button
                      type="button"
                      onClick={() => setLocation("")}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Row 3: Price, Transmission, Mileage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-3 md:mb-5">
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  <DollarSign className="inline h-3 w-3 mr-1" /> Price (USD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {pricePresets.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setMinPrice(p.min.toString());
                        setMaxPrice(p.max.toString());
                      }}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:border-red-500/50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer font-medium"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Transmission
                </label>
                <div className="relative">
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 appearance-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    {transmissionTypes.map((t) => (
                      <option key={t} value={t} className="bg-white text-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Mileage (km)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minMileage}
                    onChange={(e) => setMinMileage(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                  <input
                    type="number"
                    value={maxMileage}
                    onChange={(e) => setMaxMileage(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {mileagePresets.slice(0, 2).map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => {
                        setMinMileage(m.min.toString());
                        setMaxMileage(m.max >= 999999 ? "" : m.max.toString());
                      }}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:border-red-500/50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer font-medium"
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-4 flex-wrap">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 cursor-pointer"
                    aria-label="Clear all filters"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                )}
                <div className="text-sm text-slate-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 font-semibold">{totalVehicles >= 1000 ? `${(totalVehicles / 1000).toFixed(0)}k+` : totalVehicles}+</span> vehicles • Year {yearRangeLabel}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto min-w-[160px] justify-center"
                aria-label="Search vehicles with selected filters"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search Cars
              </button>
            </div>
          </div>

          {/* Floating quick actions - visible on wide screens */}
          <div className="hidden xl:flex flex-col gap-3 absolute left-full top-1/2 -translate-y-1/2 ml-6 z-10">
            <Link
              href={routes.contact}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 hover:bg-red-500/20 hover:border-red-500/50 transition-all shadow-md cursor-pointer"
              title="Contact"
            >
              <Calculator className="h-5 w-5" />
            </Link>
            <Link
              href={routes.about}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md cursor-pointer"
              title="About Us"
            >
              <Wrench className="h-5 w-5" />
            </Link>
            <Link
              href={routes.contact}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md cursor-pointer"
              title="Contact Us"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
