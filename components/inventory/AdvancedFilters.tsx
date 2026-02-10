"use client";

import { motion } from "framer-motion";
import { FilterProps } from "@/types/inventory";
import { getModelsByMake } from "@/data/vehicles";
import { Slider } from "@/components/ui/Slider";

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
        <label className="block text-[9px] font-black text-gray-500 mb-2.5 uppercase tracking-[0.2em]">
          Automotive Brands
        </label>
        <div className="grid grid-cols-2 gap-2">
          {displayMakes.map((make) => (
            <motion.button
              key={make}
              onClick={() => handleFilterChange("make", filters.make === make ? "" : make)}
              className={`px-3 py-2 rounded-lg border transition-all duration-500 text-[9px] font-black uppercase tracking-widest ${filters.make === make
                ? "border-cyan-500 bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "border-white/10 text-gray-400 hover:border-cyan-500/50 hover:text-white bg-white/5"
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {make}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Select Controls - Styled */}
      <div className="space-y-4">
        {[
          { label: "Model Range", key: "model", options: models, disabled: !filters.make, placeholder: "Select Model" },
          { label: "Transmission", key: "transmission", options: transmissions, placeholder: "All Selections" },
          { label: "Fuel Architecture", key: "fuel", options: fuelTypes, placeholder: "All Selections" },
          { label: "Global Location", key: "location", options: locations, placeholder: "All Selections" },
        ].map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <label className="block text-[9px] font-black text-gray-500 mb-1.5 uppercase tracking-[0.2em]">{item.label}</label>
            <div className="relative group">
              <select
                value={(filters as any)[item.key]}
                onChange={(e) => handleFilterChange(item.key, e.target.value)}
                disabled={item.disabled}
                className="w-full h-11 px-4 rounded-lg bg-black/50 border border-white/10 text-[9px] font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-30"
              >
                <option value="" className="bg-black text-white">{item.placeholder || "All Selections"}</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/50 group-hover:text-cyan-500 transition-colors">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
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
        className="w-full h-14 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cyan-500 transition-all duration-500 shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Reset Selection
      </motion.button>
    </div>
  );
}

