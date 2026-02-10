"use client";

import { notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Ship, AlertCircle, CheckCircle2, Sparkles, ArrowRight, Globe, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageProps {
  params: {
    country: string;
  };
}

const countryData: Record<string, any> = {
  "new-zealand": {
    name: "New Zealand",
    flag: "🇳🇿",
    description: "Importing Japanese vehicles to New Zealand",
    requirements: [
      "Age restrictions: Up to 20 years for most vehicles",
      "Right-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Entry certification required",
      "Customs duties: 10% GST on vehicle value",
    ],
    shippingTime: "15-25 days",
    popularModels: ["Toyota Hiace", "Nissan Elgrand", "Toyota Estima", "Mazda Demio"],
    color: "from-blue-500 to-cyan-500",
  },
  kenya: {
    name: "Kenya",
    flag: "🇰🇪",
    description: "Importing Japanese vehicles to Kenya",
    requirements: [
      "Age restrictions: Up to 8 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 25% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Toyota Probox"],
    color: "from-green-500 to-emerald-500",
  },
  "south-africa": {
    name: "South Africa",
    flag: "🇿🇦",
    description: "Importing Japanese vehicles to South Africa",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Left-hand drive required",
      "Emission standards: Euro 5",
      "Import permit required",
      "Customs duties: 20% of vehicle value",
    ],
    shippingTime: "40-50 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hilux", "Mazda BT-50"],
    color: "from-yellow-500 to-orange-500",
  },
  uganda: {
    name: "Uganda",
    flag: "🇺🇬",
    description: "Importing Japanese vehicles to Uganda",
    requirements: [
      "Age restrictions: Up to 8 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 25% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Toyota Probox"],
    color: "from-yellow-500 to-red-500",
  },
  tanzania: {
    name: "Tanzania",
    flag: "🇹🇿",
    description: "Importing Japanese vehicles to Tanzania",
    requirements: [
      "Age restrictions: Up to 8 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 25% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Toyota Probox"],
    color: "from-green-500 to-blue-500",
  },
  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "Importing Japanese vehicles to United Kingdom",
    requirements: [
      "Age restrictions: No specific limit",
      "Right-hand drive preferred",
      "Emission standards: Euro 6",
      "Type approval required",
      "Customs duties: 10% VAT on vehicle value",
    ],
    shippingTime: "40-60 days",
    popularModels: ["Toyota Land Cruiser", "Nissan GTR", "Honda Civic", "Mazda MX-5"],
    color: "from-blue-500 to-indigo-500",
  },
  ireland: {
    name: "Ireland",
    flag: "🇮🇪",
    description: "Importing Japanese vehicles to Ireland",
    requirements: [
      "Age restrictions: No specific limit",
      "Right-hand drive accepted",
      "Emission standards: Euro 6",
      "Type approval required",
      "Customs duties: 23% VAT on vehicle value",
    ],
    shippingTime: "40-60 days",
    popularModels: ["Toyota Land Cruiser", "Nissan GTR", "Honda Civic", "Mazda MX-5"],
    color: "from-green-500 to-emerald-500",
  },
  jamaica: {
    name: "Jamaica",
    flag: "🇯🇲",
    description: "Importing Japanese vehicles to Jamaica",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Left-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 20% of vehicle value",
    ],
    shippingTime: "30-40 days",
    popularModels: ["Toyota Corolla", "Honda Civic", "Nissan Altima", "Mazda 3"],
    color: "from-yellow-500 to-green-500",
  },
  "trinidad-tobago": {
    name: "Trinidad & Tobago",
    flag: "🇹🇹",
    description: "Importing Japanese vehicles to Trinidad & Tobago",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Left-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 15% of vehicle value",
    ],
    shippingTime: "30-40 days",
    popularModels: ["Toyota Corolla", "Honda Civic", "Nissan Altima", "Mazda 3"],
    color: "from-red-500 to-yellow-500",
  },
  mauritius: {
    name: "Mauritius",
    flag: "🇲🇺",
    description: "Importing Japanese vehicles to Mauritius",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 15% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Corolla", "Honda Civic", "Nissan Note", "Mazda Demio"],
    color: "from-blue-500 to-red-500",
  },
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    description: "Importing Japanese vehicles to Australia",
    requirements: [
      "Age restrictions: Up to 25 years for personal imports",
      "Right-hand drive required",
      "Emission standards: ADR compliance",
      "Import approval required",
      "Customs duties: 10% GST on vehicle value",
    ],
    shippingTime: "15-25 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Mazda BT-50"],
    color: "from-blue-500 to-cyan-500",
  },
  singapore: {
    name: "Singapore",
    flag: "🇸🇬",
    description: "Importing Japanese vehicles to Singapore",
    requirements: [
      "Age restrictions: Up to 3 years",
      "Right-hand drive required",
      "Emission standards: Euro 6",
      "COE (Certificate of Entitlement) required",
      "Customs duties: 20% of vehicle value",
    ],
    shippingTime: "10-15 days",
    popularModels: ["Toyota Prius", "Honda Fit", "Nissan Note", "Mazda 2"],
    color: "from-red-500 to-white-500",
  },
  malaysia: {
    name: "Malaysia",
    flag: "🇲🇾",
    description: "Importing Japanese vehicles to Malaysia",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Right-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 10-30% of vehicle value",
    ],
    shippingTime: "15-25 days",
    popularModels: ["Toyota Vios", "Honda City", "Nissan Almera", "Mazda 2"],
    color: "from-red-500 to-blue-500",
  },
  thailand: {
    name: "Thailand",
    flag: "🇹🇭",
    description: "Importing Japanese vehicles to Thailand",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 80% of vehicle value",
    ],
    shippingTime: "15-25 days",
    popularModels: ["Toyota Vios", "Honda City", "Nissan Almera", "Mazda 2"],
    color: "from-red-500 to-blue-500",
  },
  uae: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    description: "Importing Japanese vehicles to UAE",
    requirements: [
      "Age restrictions: Up to 10 years",
      "GCC specifications preferred",
      "Left-hand drive preferred",
      "Import permit required",
      "Customs duties: 5% of vehicle value",
    ],
    shippingTime: "25-35 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Lexus LX", "Toyota Camry"],
    color: "from-green-500 to-red-500",
  },
  "saudi-arabia": {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    description: "Importing Japanese vehicles to Saudi Arabia",
    requirements: [
      "Age restrictions: Up to 10 years",
      "GCC specifications preferred",
      "Left-hand drive required",
      "Import permit required",
      "Customs duties: 5% of vehicle value",
    ],
    shippingTime: "25-35 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Lexus LX", "Toyota Camry"],
    color: "from-green-500 to-white-500",
  },
  qatar: {
    name: "Qatar",
    flag: "🇶🇦",
    description: "Importing Japanese vehicles to Qatar",
    requirements: [
      "Age restrictions: Up to 10 years",
      "GCC specifications preferred",
      "Left-hand drive preferred",
      "Import permit required",
      "Customs duties: 5% of vehicle value",
    ],
    shippingTime: "25-35 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Lexus LX", "Toyota Camry"],
    color: "from-maroon-500 to-white-500",
  },
  kuwait: {
    name: "Kuwait",
    flag: "🇰🇼",
    description: "Importing Japanese vehicles to Kuwait",
    requirements: [
      "Age restrictions: Up to 10 years",
      "GCC specifications preferred",
      "Left-hand drive preferred",
      "Import permit required",
      "Customs duties: 5% of vehicle value",
    ],
    shippingTime: "25-35 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Lexus LX", "Toyota Camry"],
    color: "from-green-500 to-red-500",
  },
  germany: {
    name: "Germany",
    flag: "🇩🇪",
    description: "Importing Japanese vehicles to Germany",
    requirements: [
      "Age restrictions: No specific limit",
      "Left-hand drive required",
      "Emission standards: Euro 6",
      "Type approval required",
      "Customs duties: 19% VAT on vehicle value",
    ],
    shippingTime: "40-60 days",
    popularModels: ["Toyota Land Cruiser", "Nissan GTR", "Honda Civic", "Mazda MX-5"],
    color: "from-black-500 to-red-500",
  },
  netherlands: {
    name: "Netherlands",
    flag: "🇳🇱",
    description: "Importing Japanese vehicles to Netherlands",
    requirements: [
      "Age restrictions: No specific limit",
      "Left-hand drive required",
      "Emission standards: Euro 6",
      "Type approval required",
      "Customs duties: 21% VAT on vehicle value",
    ],
    shippingTime: "40-60 days",
    popularModels: ["Toyota Land Cruiser", "Nissan GTR", "Honda Civic", "Mazda MX-5"],
    color: "from-red-500 to-blue-500",
  },
  cyprus: {
    name: "Cyprus",
    flag: "🇨🇾",
    description: "Importing Japanese vehicles to Cyprus",
    requirements: [
      "Age restrictions: No specific limit",
      "Right-hand drive accepted",
      "Emission standards: Euro 6",
      "Type approval required",
      "Customs duties: 19% VAT on vehicle value",
    ],
    shippingTime: "40-60 days",
    popularModels: ["Toyota Land Cruiser", "Nissan GTR", "Honda Civic", "Mazda MX-5"],
    color: "from-blue-500 to-white-500",
  },
  ghana: {
    name: "Ghana",
    flag: "🇬🇭",
    description: "Importing Japanese vehicles to Ghana",
    requirements: [
      "Age restrictions: Up to 10 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 20% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Toyota Probox"],
    color: "from-red-500 to-yellow-500",
  },
  nigeria: {
    name: "Nigeria",
    flag: "🇳🇬",
    description: "Importing Japanese vehicles to Nigeria",
    requirements: [
      "Age restrictions: Up to 15 years",
      "Right-hand drive accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 20% of vehicle value",
    ],
    shippingTime: "35-45 days",
    popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Hiace", "Toyota Probox"],
    color: "from-green-500 to-white-500",
  },
  guyana: {
    name: "Guyana",
    flag: "🇬🇾",
    description: "Importing Japanese vehicles to Guyana",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Left-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 15% of vehicle value",
    ],
    shippingTime: "30-40 days",
    popularModels: ["Toyota Corolla", "Honda Civic", "Nissan Altima", "Mazda 3"],
    color: "from-green-500 to-yellow-500",
  },
  barbados: {
    name: "Barbados",
    flag: "🇧🇧",
    description: "Importing Japanese vehicles to Barbados",
    requirements: [
      "Age restrictions: Up to 5 years",
      "Left-hand drive required",
      "Emission standards: Euro 4 or equivalent",
      "Import permit required",
      "Customs duties: 15% of vehicle value",
    ],
    shippingTime: "30-40 days",
    popularModels: ["Toyota Corolla", "Honda Civic", "Nissan Altima", "Mazda 3"],
    color: "from-blue-500 to-yellow-500",
  },
};

export default function CountryDetailPage({ params }: PageProps) {
  const country = countryData[params.country];
  const requirementsRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (requirementsRef.current) {
      scrollReveal(requirementsRef.current, slideUp, { delay: 0.3 });
    }
    if (popularRef.current) {
      scrollReveal(popularRef.current, slideUp, { delay: 0.4 });
    }
    if (shippingRef.current) {
      scrollReveal(shippingRef.current, slideUp, { delay: 0.5 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Import to <span className="gradient-text">{country.name}</span>
              </>
            }
            description={country.description}
            badge={`${country.flag} ${country.name}`}
            badgeIcon={<Globe className="h-8 w-8" />}
          />

          {/* Requirements */}
          <div ref={requirementsRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <FileText className="h-8 w-8 text-cyan-500" />
              Import Requirements
            </h2>
            <ul className="space-y-4">
              {country.requirements?.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Models */}
          {country.popularModels && (
            <div ref={popularRef} className="card p-8 mb-12">
              <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-gold-400" />
                Popular Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {country.popularModels.map((model: string, index: number) => (
                  <div key={index} className="p-4 bg-dark-800/50 rounded-lg">
                    <span className="text-white font-semibold">{model}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Info */}
          <div ref={shippingRef} className="card p-8 mb-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Ship className="h-8 w-8 text-cyan-500" />
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-cyan-500" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Transit Time</div>
                  <div className="text-xl font-black text-white">{country.shippingTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="h-6 w-6 text-gold-400" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Customs Duties</div>
                  <div className="text-xl font-black text-white">{country.requirements?.find((r: string) => r.includes("Customs duties"))?.split(":")[1] || "Varies"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <ScrollReveal delay={0.6}>
            <div className="card p-8 bg-yellow-500/10 border-2 border-yellow-500/30 mb-12">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black text-white mb-4">Important Notes</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Import regulations may change. Always verify current requirements with local authorities.</li>
                    <li>• Additional inspections may be required (JEVIC, JAAI, NKKK). We can arrange these.</li>
                    <li>• Customs duties and taxes are calculated based on your country's regulations.</li>
                    <li>• We provide all export documentation. Local customs clearance is handled by you or your agent.</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <CTASection
            title="Ready to Import to This Country?"
            description="Contact us for personalized assistance and detailed import guidance"
            primaryAction={{
              label: "Contact Us",
              href: routes.contact,
            }}
            secondaryAction={{
              label: "Browse Vehicles",
              href: routes.inventory,
            }}
          />
        </div>
      </div>
    </div>
  );
}
