"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator, DollarSign, Ship, FileText, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_DESTINATIONS = [
  { value: "new-zealand", label: "New Zealand", shipping: 1200 },
  { value: "kenya", label: "Kenya", shipping: 1800 },
  { value: "uk", label: "UK", shipping: 1500 },
  { value: "uganda", label: "Uganda", shipping: 1900 },
  { value: "ireland", label: "Ireland", shipping: 1400 },
  { value: "tanzania", label: "Tanzania", shipping: 1850 },
  { value: "jamaica", label: "Jamaica", shipping: 2000 },
  { value: "south-africa", label: "South Africa", shipping: 1750 },
];

const FALLBACK_FEES = { serviceFeePct: 0.05, insurancePct: 0.02, inspectionFee: 150, documentationFee: 100, handlingFee: 200 };

export default function CostCalculatorPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const breakdownRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [destination, setDestination] = useState("new-zealand");
  const [insurance, setInsurance] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [destinations, setDestinations] = useState<{ value: string; label: string; shipping: number }[]>(FALLBACK_DESTINATIONS);
  const [fees, setFees] = useState(FALLBACK_FEES);

  const fetchConfig = useCallback(() => {
    fetch("/api/calculator/config", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { destinations?: { id: string; label: string; shippingRoro: number }[]; fees?: typeof FALLBACK_FEES } | null) => {
        if (!data) return;
        if (data.destinations?.length) {
          setDestinations(data.destinations.map((d) => ({ value: d.id, label: d.label, shipping: d.shippingRoro })));
        }
        if (data.fees) {
          setFees({
            serviceFeePct: data.fees.serviceFeePct ?? 0.05,
            insurancePct: data.fees.insurancePct ?? 0.02,
            inspectionFee: data.fees.inspectionFee ?? 150,
            documentationFee: data.fees.documentationFee ?? 100,
            handlingFee: data.fees.handlingFee ?? 200,
          });
        }
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

  const selectedDest = destinations.find(d => d.value === destination);

  const calculateCosts = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const shippingCost = selectedDest?.shipping ?? 0;
    const serviceFee = price * (fees.serviceFeePct ?? 0.05);
    const inspectionFee = inspection ? (fees.inspectionFee ?? 150) : 0;
    const documentationFee = fees.documentationFee ?? 100;
    const insuranceFee = insurance ? price * (fees.insurancePct ?? 0.02) : 0;
    const handlingFee = fees.handlingFee ?? 200;

    const subtotal = price + shippingCost + serviceFee + inspectionFee + documentationFee + insuranceFee + handlingFee;
    const total = subtotal;

    return {
      vehiclePrice: price,
      shippingCost,
      serviceFee,
      inspectionFee,
      documentationFee,
      insuranceFee,
      handlingFee,
      subtotal,
      total,
    };
  };

  const costs = calculateCosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Calculate Your <span className="gradient-text">Import Costs</span>
              </>
            }
            description="Get an instant estimate of the total cost to import your Japanese vehicle"
            badge="Cost Calculator"
            badgeIcon={<Calculator className="h-8 w-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div ref={formRef} className="lg:col-span-2 card p-8">
              <h2 className="text-2xl font-black text-white mb-6">Vehicle Information</h2>

              <div className="space-y-6">
                {/* Vehicle Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Vehicle Price (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(e.target.value)}
                      placeholder="Enter vehicle price"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Destination Country
                  </label>
                  <div className="relative">
                    <Ship className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
                    >
                      {destinations.map((dest) => (
                        <option key={dest.value} value={dest.value} className="bg-dark-900">
                          {dest.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Additional Services
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={inspection}
                      onChange={(e) => setInspection(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white font-medium">Professional Inspection ($150)</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white font-medium">Marine Insurance (2% of vehicle price)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div ref={breakdownRef} className="card p-8">
              <h2 className="text-2xl font-black text-white mb-6">Cost Breakdown</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Vehicle Price</span>
                  <span className="font-semibold">${costs.vehiclePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold">${costs.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Service Fee (5%)</span>
                  <span className="font-semibold">${costs.serviceFee.toLocaleString()}</span>
                </div>
                {costs.inspectionFee > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Inspection</span>
                    <span className="font-semibold">${costs.inspectionFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Documentation</span>
                  <span className="font-semibold">${costs.documentationFee.toLocaleString()}</span>
                </div>
                {costs.insuranceFee > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Insurance</span>
                    <span className="font-semibold">${costs.insuranceFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Handling</span>
                  <span className="font-semibold">${costs.handlingFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white">Total Estimated Cost</span>
                  <span className="text-2xl font-black text-cyan-500">${costs.total.toLocaleString()}</span>
                </div>
              </div>

              <Link href={routes.contact} className="btn-primary w-full text-center inline-flex items-center justify-center gap-2">
                Get Detailed Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Information Section */}
          <div ref={notesRef} className="card p-8 mt-8">
            <h2 className="text-2xl font-black text-white mb-6">Important Notes</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">FOB vs CIF:</strong> The calculator shows CIF (Cost, Insurance, Freight) pricing. FOB (Free On Board) prices exclude shipping and insurance.
              </p>
              <p>
                <strong className="text-white">Additional Costs:</strong> Local import duties, taxes, and registration fees vary by country and are not included in this estimate.
              </p>
              <p>
                <strong className="text-white">Currency:</strong> All prices are in USD. Final costs may vary based on exchange rates at the time of purchase.
              </p>
            </div>
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.6}>
            <div className="text-center mt-12">
              <Link href={routes.inventory} className="btn-primary inline-flex items-center gap-2">
                Browse Available Vehicles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
