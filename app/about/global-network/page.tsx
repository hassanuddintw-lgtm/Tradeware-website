"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, MapPin, Building2, Users, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { sectionReveal, staggerReveal } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const regions = [
  {
    name: "Asia Pacific",
    countries: ["New Zealand", "Australia", "Singapore", "Malaysia", "Thailand"],
    offices: 3,
  },
  {
    name: "Africa",
    countries: ["Kenya", "Uganda", "Tanzania", "South Africa", "Ghana", "Nigeria"],
    offices: 4,
  },
  {
    name: "Europe",
    countries: ["UK", "Ireland", "Germany", "Netherlands", "Cyprus"],
    offices: 5,
  },
  {
    name: "Caribbean",
    countries: ["Jamaica", "Trinidad & Tobago", "Barbados", "Guyana"],
    offices: 2,
  },
  {
    name: "Middle East",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
    offices: 2,
  },
];

const partners = [
  {
    name: "USS Auction",
    description: "Japan's largest vehicle auction house",
    type: "Auction Partner",
  },
  {
    name: "Aucnet",
    description: "Premium vehicle auction platform",
    type: "Auction Partner",
  },
  {
    name: "Major Shipping Lines",
    description: "Global shipping network partners",
    type: "Logistics Partner",
  },
  {
    name: "Port Authorities",
    description: "Direct relationships with major ports",
    type: "Infrastructure Partner",
  },
];

export default function GlobalNetworkPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return () => {};
    const ctx = gsap.context(() => {
      if (statsRef.current) sectionReveal(statsRef.current, { y: 30, delay: 0.3 });
      if (regionsRef.current) staggerReveal(regionsRef.current, "> *", { stagger: 0.15, delay: 0.4 });
      if (partnersRef.current) staggerReveal(partnersRef.current, "> *", { stagger: 0.15, delay: 0.5 });
      if (benefitsRef.current) sectionReveal(benefitsRef.current, { y: 30, delay: 0.6 });
    });
    return () => ctx.revert();
  }, []);

  const globalStats = [
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "16", label: "Regional Offices", icon: Building2 },
    { value: "120+", label: "Auction Partners", icon: Users },
    { value: "6", label: "Continents", icon: MapPin },
  ];

  const benefits = [
    "Direct access to Japan's largest auction network (USS, TAA, CAA, HAA, JAA)",
    "Established relationships with major shipping lines (NYK, MOL, K Line)",
    "Local port clearance expertise across all destination regions",
    "Multilingual support for international customers",
    "Competitive freight rates through volume agreements",
  ];

  return (
    <div className="bg-black pt-14 md:pt-16 pb-16 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-500/5 blur-[80px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] font-body">Worldwide Presence</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter font-display uppercase leading-none">
              GLOBAL <span className="gradient-text italic">NETWORK</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-body font-medium leading-relaxed">
              Tradeware serves customers across six continents through regional offices, auction partnerships, and established logistics networks. Our global footprint ensures seamless vehicle imports to your destination.
            </p>
          </motion.div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {globalStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                >
                  <StatIcon className="h-6 w-6 text-cyan-500 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Regions */}
          <div ref={regionsRef} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 font-display uppercase tracking-tight">
              Regions We Serve
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white font-display">{region.name}</h3>
                    <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">{region.offices} offices</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((country) => (
                      <span key={country} className="px-2.5 py-1 rounded-lg bg-black/40 text-[10px] font-medium text-gray-400 border border-white/5">
                        {country}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div ref={partnersRef} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 font-display uppercase tracking-tight">
              Key Partnerships
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 flex gap-4"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-wider">{partner.type}</span>
                    <h3 className="text-base font-black text-white font-display mt-1">{partner.name}</h3>
                    <p className="text-xs text-gray-500 mt-2 font-body">{partner.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div ref={benefitsRef} className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 font-display uppercase tracking-tight">
              Why Our Network Matters
            </h2>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.06 }}
                >
                  <CheckCircle className="h-5 w-5 text-cyan-500 shrink-0" />
                  <span className="text-sm text-gray-300 font-body">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center p-10 md:p-12 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 font-display uppercase tracking-tight">
              Ready to Import?
            </h2>
            <p className="text-gray-500 mb-8 font-body max-w-xl mx-auto">
              Browse our inventory or contact us for a tailored quote to your destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={routes.inventory} className="btn-primary px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 group">
                BROWSE INVENTORY
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={routes.contact} className="btn-secondary px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 group">
                CONTACT US
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
