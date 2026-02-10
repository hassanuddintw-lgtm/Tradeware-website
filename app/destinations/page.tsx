"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const regions = [
  {
    name: "Africa",
    countries: [
      { name: "Kenya", href: routes.countryDetail("kenya"), flag: "🇰🇪" },
      { name: "Tanzania", href: routes.countryDetail("tanzania"), flag: "🇹🇿" },
      { name: "Uganda", href: routes.countryDetail("uganda"), flag: "🇺🇬" },
      { name: "South Africa", href: routes.countryDetail("south-africa"), flag: "🇿🇦" },
      { name: "Nigeria", href: routes.countryDetail("nigeria"), flag: "🇳🇬" },
      { name: "Ghana", href: routes.countryDetail("ghana"), flag: "🇬🇭" },
    ],
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "New Zealand", href: routes.countryDetail("new-zealand"), flag: "🇳🇿" },
      { name: "Australia", href: routes.countryDetail("australia"), flag: "🇦🇺" },
      { name: "Singapore", href: routes.countryDetail("singapore"), flag: "🇸🇬" },
      { name: "Malaysia", href: routes.countryDetail("malaysia"), flag: "🇲🇾" },
      { name: "Thailand", href: routes.countryDetail("thailand"), flag: "🇹🇭" },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "United Kingdom", href: routes.countryDetail("uk"), flag: "🇬🇧" },
      { name: "Ireland", href: routes.countryDetail("ireland"), flag: "🇮🇪" },
      { name: "Germany", href: routes.countryDetail("germany"), flag: "🇩🇪" },
      { name: "Netherlands", href: routes.countryDetail("netherlands"), flag: "🇳🇱" },
      { name: "Cyprus", href: routes.countryDetail("cyprus"), flag: "🇨🇾" },
    ],
  },
  {
    name: "Caribbean",
    countries: [
      { name: "Jamaica", href: routes.countryDetail("jamaica"), flag: "🇯🇲" },
      { name: "Trinidad & Tobago", href: routes.countryDetail("trinidad-tobago"), flag: "🇹🇹" },
      { name: "Barbados", href: routes.countryDetail("barbados"), flag: "🇧🇧" },
      { name: "Guyana", href: routes.countryDetail("guyana"), flag: "🇬🇾" },
    ],
  },
  {
    name: "Middle East",
    countries: [
      { name: "UAE", href: routes.countryDetail("uae"), flag: "🇦🇪" },
      { name: "Saudi Arabia", href: routes.countryDetail("saudi-arabia"), flag: "🇸🇦" },
      { name: "Qatar", href: routes.countryDetail("qatar"), flag: "🇶🇦" },
      { name: "Kuwait", href: routes.countryDetail("kuwait"), flag: "🇰🇼" },
    ],
  },
];

export default function DestinationsPage() {
  const regionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionsRef.current) {
      scrollReveal(regionsRef.current, slideUp, { delay: 0.3 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Import <span className="gradient-text">Destinations</span>
              </>
            }
            description="Import Japanese vehicles to 50+ countries worldwide. Select your country to view specific import requirements and shipping information."
            badge="Destinations"
            badgeIcon={<Globe className="h-8 w-8" />}
          />

          {/* Regions */}
          <div ref={regionsRef} className="space-y-12 mb-16">
            {regions.map((region, regionIndex) => (
              <div key={region.name}>
                <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-cyan-500" />
                  {region.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {region.countries.map((country, countryIndex) => (
                    <Link
                      key={country.name}
                      href={country.href}
                      className="card p-6 group hover:border-cyan-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{country.flag}</div>
                        <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">
                          {country.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                        <span>View Import Guide</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <CTASection
            title="Don't See Your Country?"
            description="We ship to 50+ countries worldwide. Contact us to check if we can serve your destination."
            primaryAction={{
              label: "Contact Us",
              href: routes.contact,
            }}
            secondaryAction={{
              label: "View Global Network",
              href: routes.globalNetwork,
            }}
          />
        </div>
      </div>
    </div>
  );
}
