"use client";

import { motion } from "framer-motion";
import { FilterProps } from "@/types/inventory";
import { getModelsByMake } from "@/data/vehicles";

const STATIC_TRANSMISSION = ["Automatic", "Manual", "CVT"];
const STATIC_FUEL = ["Petrol", "Diesel", "Hybrid", "Electric"];
const STATIC_LOCATIONS = ["Yokohama Port", "Kobe Port", "Osaka Port", "Nagoya Port"];

export default function AdvancedFilters({ filters, setFilters, makes, filterOptions }: FilterProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const models = (filterOptions?.models?.length ? filterOptions.models : undefined) ?? (filters.make ? getModelsByMake(filters.make) : []);
  const transmissions = filterOptions?.transmissions?.length ? filterOptions.transmissions : STATIC_TRANSMISSION;
  const fuelTypes = filterOptions?.fuelTypes?.length ? filterOptions.fuelTypes : STATIC_FUEL;
  const locations = filterOptions?.locations?.length ? filterOptions.locations : STATIC_LOCATIONS;
  const displayMakes = (filterOptions?.makes?.length ? filterOptions.makes : makes).slice(0, 8);

  return (
    <div className="space-y-5 font-body">
      {/* Search By Make - Logo Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-xs font-semibold text-slate-600 mb-2">
          Make
        </label>
        <div className="grid grid-cols-2 gap-2">
          {displayMakes.map((make) => (
            <button
              key={make}
              type="button"
              onClick={() => handleFilterChange("make", filters.make === make ? "" : make)}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${filters.make === make
                ? "border-red-600 bg-red-600 text-white"
                : "border-slate-200 text-slate-700 hover:border-red-500/50 hover:bg-red-50 bg-white"
                }`}
            >
              {make}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Select Controls - Styled */}
      <div className="space-y-4">
        {[
          { label: "Model", key: "model", options: models, disabled: !filters.make, placeholder: "Select model" },
          { label: "Transmission", key: "transmission", options: transmissions, placeholder: "All" },
          { label: "Fuel", key: "fuel", options: fuelTypes, placeholder: "All" },
          { label: "Location", key: "location", options: locations, placeholder: "All" },
        ].map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">{item.label}</label>
            <div className="relative group">
              <select
                value={(filters as any)[item.key]}
                onChange={(e) => handleFilterChange(item.key, e.target.value)}
                disabled={item.disabled}
                className="w-full h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer disabled:opacity-60"
              >
                <option value="">{item.placeholder || "All"}</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setFilters({
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
        })}
        className="w-full mt-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}

