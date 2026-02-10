"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Calculator, HelpCircle, Ship, RotateCcw } from "lucide-react";
import { destinations as fallbackDestinations } from "@/data/destinations-ports";
import { routes } from "@/config/routes";

const DEFAULT_VEHICLE_PRICE = 15000;
const DEFAULT_FEES = {
  serviceFeePct: 0.05,
  insurancePct: 0.02,
  inspectionFee: 150,
  certificateFee: 80,
  warrantyFee: 120,
  documentationFee: 100,
  handlingFee: 200,
};

type DestFromApi = { id: string; label: string; ports: { id: string; label: string }[]; shippingRoro: number; shippingContainer: number };
type FeesFromApi = typeof DEFAULT_FEES;

export interface TotalPriceCalculatorProps {
  /** Optional vehicle price (e.g. from selected vehicle or average of filtered). */
  vehiclePrice?: number;
  /** Optional label e.g. "2013 Toyota Alphard" for display. */
  vehicleLabel?: string;
  /** Optional vehicle ID for contact link. */
  vehicleId?: string;
}

export default function TotalPriceCalculator({
  vehiclePrice: initialPrice,
  vehicleLabel,
  vehicleId,
}: TotalPriceCalculatorProps) {
  const [vehiclePriceInput, setVehiclePriceInput] = useState(
    initialPrice != null ? String(initialPrice) : ""
  );
  const [destinations, setDestinations] = useState<DestFromApi[]>(fallbackDestinations as DestFromApi[]);
  const [fees, setFees] = useState<FeesFromApi>(DEFAULT_FEES);
  const [country, setCountry] = useState("pakistan");
  const [port, setPort] = useState("karachi");
  const [shippingMethod, setShippingMethod] = useState<"roro" | "container">("roro");
  const [insurance, setInsurance] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [certificate, setCertificate] = useState(true);
  const [warranty, setWarranty] = useState(false);

  const fetchConfig = useCallback(() => {
    fetch("/api/calculator/config", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { destinations?: DestFromApi[]; fees?: Partial<FeesFromApi> } | null) => {
        if (!data) return;
        if (data.destinations?.length) setDestinations(data.destinations);
        if (data.fees) setFees((prev) => ({ ...prev, ...data.fees }));
      })
      .catch(() => {});
  }, []);

  // Automatic live data: config har 30 sec uthao, website pe lagate raho
  useEffect(() => {
    fetchConfig();
    const interval = setInterval(fetchConfig, 30 * 1000);
    const onFocus = () => fetchConfig();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchConfig]);

  // Keep country/port in sync when destinations list changes (e.g. from API)
  useEffect(() => {
    if (destinations.length === 0) return;
    const found = destinations.find((d) => d.id === country);
    if (!found) {
      setCountry(destinations[0].id);
      setPort(destinations[0].ports?.[0]?.id ?? "");
    } else if (port && !found.ports?.some((p) => p.id === port)) {
      setPort(found.ports?.[0]?.id ?? "");
    }
  }, [destinations, country, port]);

  const getDestination = useCallback((id: string) => destinations.find((d) => d.id === id), [destinations]);
  const dest = useMemo(() => getDestination(country), [country, getDestination]);
  const ports = dest?.ports ?? [];
  const effectivePort = ports.some((p) => p.id === port) ? port : ports[0]?.id ?? "";

  const reset = useCallback(() => {
    setVehiclePriceInput(initialPrice != null ? String(initialPrice) : "");
    setCountry("pakistan");
    setPort("karachi");
    setShippingMethod("roro");
    setInsurance(true);
    setInspection(true);
    setCertificate(true);
    setWarranty(false);
  }, [initialPrice]);

  const round2 = (n: number) => Math.round(n * 100) / 100;

  const costs = useMemo(() => {
    const price = round2((parseFloat(vehiclePriceInput) || initialPrice) ?? DEFAULT_VEHICLE_PRICE);
    const shippingBase = dest
      ? shippingMethod === "roro"
        ? dest.shippingRoro
        : dest.shippingContainer
      : 0;
    const serviceFee = round2(price * (fees.serviceFeePct ?? 0.05));
    const inspectionFee = inspection ? (fees.inspectionFee ?? 150) : 0;
    const certificateFee = certificate ? (fees.certificateFee ?? 80) : 0;
    const warrantyFee = warranty ? (fees.warrantyFee ?? 120) : 0;
    const documentationFee = fees.documentationFee ?? 100;
    const insuranceFee = round2(insurance ? price * (fees.insurancePct ?? 0.02) : 0);
    const handlingFee = fees.handlingFee ?? 200;

    const components = [
      price,
      shippingBase,
      serviceFee,
      inspectionFee,
      certificateFee,
      warrantyFee,
      documentationFee,
      insuranceFee,
      handlingFee,
    ];
    const total = round2(components.reduce((a, b) => a + b, 0));

    return {
      vehiclePrice: price,
      shipping: shippingBase,
      serviceFee,
      inspectionFee,
      certificateFee,
      warrantyFee,
      documentationFee,
      insuranceFee,
      handlingFee,
      total,
    };
  }, [
    vehiclePriceInput,
    initialPrice,
    dest,
    shippingMethod,
    insurance,
    inspection,
    certificate,
    warranty,
    fees,
  ]);

  const helpUrl = routes.costCalculator;
  const contactUrl = vehicleId ? `${routes.contact}?vehicle=${vehicleId}` : routes.contact;

  return (
    <div className="glass-card rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 min-w-0">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-cyan-400 shrink-0" aria-hidden />
        <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
          Total Price Calculator
        </h2>
        <a
          href={helpUrl}
          className="ml-auto p-1.5 rounded-lg text-zinc-500 hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Calculator help"
          title="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-4">
        {/* Vehicle price */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            Vehicle price (USD)
          </label>
          <input
            type="number"
            min={0}
            step={100}
            value={vehiclePriceInput}
            onChange={(e) => setVehiclePriceInput(e.target.value)}
            placeholder={vehicleLabel ? `e.g. ${(initialPrice ?? DEFAULT_VEHICLE_PRICE).toLocaleString()}` : "Enter FOB price"}
            className="w-full h-10 px-3 rounded-lg bg-black/40 border border-white/10 text-sm font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 cursor-text"
          />
          {vehicleLabel && (
            <p className="mt-1 text-[10px] text-zinc-500 truncate" title={vehicleLabel}>
              {vehicleLabel}
            </p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            Destination
          </label>
          <div className="relative">
            <Ship className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cyan-500/60 pointer-events-none" />
            <select
              value={country}
              onChange={(e) => {
                const d = getDestination(e.target.value);
                setCountry(e.target.value);
                setPort(d?.ports[0]?.id ?? "");
              }}
              className="w-full h-10 pl-9 pr-8 rounded-lg bg-black/40 border border-white/10 text-sm font-medium text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id} className="bg-zinc-900 text-white">
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Port */}
        {ports.length > 0 && (
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Port
            </label>
            <select
              value={effectivePort}
              onChange={(e) => setPort(e.target.value)}
              className="w-full h-10 px-3 pr-8 rounded-lg bg-black/40 border border-white/10 text-sm font-medium text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
            >
              {ports.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Shipping method */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Shipping method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "roro"}
                onChange={() => setShippingMethod("roro")}
                className="w-4 h-4 text-cyan-500 border-white/20 bg-white/5 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-white">RORO</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "container"}
                onChange={() => setShippingMethod("container")}
                className="w-4 h-4 text-cyan-500 border-white/20 bg-white/5 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-white">Container</span>
            </label>
          </div>
          <a
            href={helpUrl}
            className="inline-block mt-1 text-[10px] text-cyan-500/80 hover:text-cyan-400 cursor-pointer"
            title="Full cost breakdown & RORO vs Container"
          >
            RORO vs Container? Full breakdown →
          </a>
        </div>

        {/* Additional services */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Additional services
          </label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              { key: "insurance" as const, label: "Insurance", value: insurance, set: setInsurance },
              { key: "inspection" as const, label: "Inspection", value: inspection, set: setInspection },
              { key: "certificate" as const, label: "Certificate", value: certificate, set: setCertificate },
              { key: "warranty" as const, label: "Warranty", value: warranty, set: setWarranty },
            ].map(({ label, value, set }) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="text-xs text-zinc-400">{label}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => set(true)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      value ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "bg-white/5 text-zinc-500 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => set(false)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      !value ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "bg-white/5 text-zinc-500 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <a
            href={contactUrl}
            className="ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Calculate & get quote
          </a>
        </div>
      </div>

      {/* Real-time cost summary – 100% accurate, all values sum to total */}
      <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Vehicle (FOB)</span>
          <span className="font-semibold text-white">${costs.vehiclePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Shipping ({shippingMethod === "roro" ? "RORO" : "Container"})</span>
          <span className="font-semibold text-white">${costs.shipping.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        {costs.insuranceFee > 0 && (
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Insurance ({(fees.insurancePct ?? 0.02) * 100}%)</span>
            <span className="font-semibold text-white">${costs.insuranceFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
        {costs.inspectionFee > 0 && (
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Inspection</span>
            <span className="font-semibold text-white">${costs.inspectionFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
        {costs.certificateFee > 0 && (
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Certificate</span>
            <span className="font-semibold text-white">${costs.certificateFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
        {costs.warrantyFee > 0 && (
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Warranty</span>
            <span className="font-semibold text-white">${costs.warrantyFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Documentation</span>
          <span className="font-semibold text-white">${costs.documentationFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Handling</span>
          <span className="font-semibold text-white">${costs.handlingFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Service fee ({(fees.serviceFeePct ?? 0.05) * 100}%)</span>
          <span className="font-semibold text-white">${costs.serviceFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center pt-2 mt-2 border-t-2 border-cyan-500/30">
          <span className="text-sm font-bold text-white">Total (CIF inclusive)</span>
          <span className="text-lg font-black text-cyan-400">${costs.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
