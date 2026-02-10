"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Calculator, FileText, AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const costComponents = [
  {
    title: "Vehicle Price (FOB)",
    description: "Free On Board (FOB) price represents the total cost of the vehicle at the Japanese port of export, including all purchase and preparation costs. This includes the auction purchase price, which is determined through competitive bidding at Japan's major auction houses. Auction fees and commissions are standard charges levied by auction houses for facilitating the transaction. Our inspection and preparation services ensure the vehicle meets export standards, including mechanical checks, cleaning, and export readiness verification. Port handling charges cover the costs associated with vehicle storage, movement within the port facility, and preparation for loading onto the vessel. The FOB price is the foundation of your total import cost and represents the vehicle's value before international shipping and destination country charges.",
    items: [
      "Auction purchase price (determined through competitive bidding)",
      "Auction house fees and standard commissions",
      "Comprehensive vehicle inspection and condition verification",
      "Export preparation and port handling charges",
      "Vehicle documentation preparation and verification",
    ],
    note: "FOB price is the base vehicle cost at Japanese port before international shipping",
    color: "from-gold-500 to-gold-600",
  },
  {
    title: "Shipping Costs",
    description: "Ocean freight costs cover the transportation of your vehicle from Japanese ports to your destination port. We offer both RORO (Roll-on/Roll-off) and container shipping options, with RORO being more cost-effective for single vehicles while container shipping provides enhanced protection. Port-to-port freight charges vary based on destination, shipping line, and market conditions. Fuel surcharges are standard industry charges that fluctuate with global fuel prices. Shipping line fees include various handling and administrative charges. Our established relationships with major shipping lines including NYK Line, MOL, K Line, and others enable us to secure competitive rates. Shipping costs are calculated based on vehicle dimensions, weight, destination port, and selected shipping method. Average shipping times range from 28-45 days depending on destination, with expedited options available for urgent shipments.",
    items: [
      "RORO (Roll-on/Roll-off) or container shipping options",
      "Port-to-port ocean freight charges",
      "Fuel surcharges (varies with market conditions)",
      "Shipping line administrative and handling fees",
      "Port charges at both origin and destination",
    ],
    note: "Shipping costs vary by destination, vehicle size, and selected shipping method",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Insurance",
    description: "Marine cargo insurance provides comprehensive protection for your vehicle during international transit, covering risks including damage, loss, theft, and other perils that may occur during ocean transport. While insurance is optional, we strongly recommend comprehensive coverage to protect your investment. Insurance premiums are calculated based on the vehicle's declared value (typically CIF value), destination, and selected coverage level. Standard coverage includes protection against physical damage, total loss, and general average contributions. Additional coverage options are available for enhanced protection. Our insurance partners are reputable international marine insurance providers with strong claims handling capabilities. Having proper insurance coverage provides peace of mind and financial protection throughout the shipping process.",
    items: [
      "Comprehensive marine cargo insurance coverage",
      "Protection against damage, loss, and theft during transit",
      "Insurance premium based on vehicle value and destination",
      "Standard and enhanced coverage options available",
      "Reputable international insurance providers",
    ],
    note: "Insurance is optional but highly recommended to protect your investment",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Documentation & Export Fees",
    description: "Complete export documentation is essential for successful vehicle imports and is included in our comprehensive service package. Export certificates are official Japanese government documents certifying the vehicle's eligibility for export. Commercial invoices provide detailed transaction information required for customs clearance. Bills of Lading serve as proof of shipment and ownership transfer documents. Inspection certificates may be required for certain markets or vehicle types. Document translation services are available when destination countries require documentation in local languages. Export processing fees cover administrative costs associated with documentation preparation, government submissions, and export clearance procedures. Our experienced documentation team ensures all paperwork is accurate, complete, and compliant with both Japanese export requirements and destination country import regulations.",
    items: [
      "Official Japanese export certificate",
      "Detailed commercial invoice with complete specifications",
      "Bill of Lading (proof of shipment and ownership)",
      "Vehicle inspection certificates (when required)",
      "Professional document translation services (if needed)",
      "Export processing and administrative fees",
    ],
    note: "All export documentation and processing fees are included in our service",
    color: "from-purple-500 to-pink-500",
  },
];

const pricingExample = {
  vehicle: "Toyota Land Cruiser Prado 2020",
  fobPrice: 18500,
  shipping: 2700,
  insurance: 370,
  documentation: 300,
  totalCIF: 21870,
};

export default function PricingPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      fadeIn(headerRef.current, { delay: 0.2 });
    }
    if (componentsRef.current) {
      scrollReveal(componentsRef.current, slideUp, { delay: 0.3 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black pt-14 md:pt-16 pb-16 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16 md:mb-32">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] font-body">Transparency</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter font-display uppercase leading-none">
              TRANSPARENT <span className="gradient-text italic">PRICING</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-body font-medium leading-relaxed">
              Complete pricing transparency with detailed cost breakdowns for every component of your vehicle import. We believe in honest, upfront pricing with no hidden fees or surprise charges. Our comprehensive pricing structure covers vehicle acquisition, shipping, insurance, documentation, and all associated costs, providing you with complete visibility into your investment. Understanding the true cost of importing a vehicle enables informed decision-making and ensures there are no unexpected expenses during the import process.
            </p>
          </div>

          {/* Pricing Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 md:mb-12">
            {[
              {
                icon: DollarSign,
                title: "FOB ARCHITECTURE",
                subtitle: "Free On Board",
                desc: "The baseline cost of the asset at the Japanese port, prepared for global transit.",
                items: ["Asset Acquisition Cost", "Auction House Fees", "Port Logistics", "Terminal Handling"],
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Calculator,
                title: "CIF ARCHITECTURE",
                subtitle: "Cost, Insurance & Freight",
                desc: "Total composite pricing inclusive of ocean logistics and marine security.",
                items: ["FOB Composite", "Ocean Transit Freight", "Marine Guard Security", "Priority Documentation"],
                color: "from-blue-600 to-purple-600"
              }
            ].map((term, i) => {
              const TermIcon = term.icon;
              return (
              <motion.div
                key={i}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all duration-700"
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${term.color} flex items-center justify-center`}>
                    <TermIcon className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest font-body mb-1">{term.subtitle}</h3>
                    <h2 className="text-2xl font-black text-white font-display italic uppercase tracking-tight">{term.title}</h2>
                  </div>
                </div>
                <p className="text-gray-400 font-body mb-8 leading-relaxed font-medium">
                  {term.desc}
                </p>
                <ul className="space-y-4">
                  {term.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover/item:w-4 transition-all duration-300" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-body group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ); })}
          </div>

          {/* Cost Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {costComponents.map((component, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col group hover:border-cyan-400/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-all duration-500">
                  <FileText className="h-6 w-6 text-cyan-500 group-hover:text-black" />
                </div>
                <h3 className="text-sm font-black text-white mb-2 uppercase tracking-tight font-display italic">{component.title}</h3>
                <p className="text-[10px] font-medium text-gray-500 mb-6 font-body leading-relaxed">{component.description}</p>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em] font-body opacity-50">{component.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Example Calculation */}
          <motion.div
            className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden mb-12 md:mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[100px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-display italic uppercase tracking-tighter">FINANCIAL <span className="gradient-text italic">SIMULATION</span></h2>
                <div className="space-y-6">
                  {[
                    { label: "ASSET VALUE (FOB)", amount: pricingExample.fobPrice },
                    { label: "OCEAN FREIGHT", amount: pricingExample.shipping },
                    { label: "MARINE SECURITY", amount: pricingExample.insurance },
                    { label: "PROTOCOL DOCS", amount: pricingExample.documentation },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-body">{item.label}</span>
                      <span className="text-xl font-black text-white font-display italic">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-8">
                    <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] font-body">TOTAL CIF ACQUISITION</span>
                    <span className="text-5xl md:text-7xl font-black text-white font-display italic leading-none">${pricingExample.totalCIF.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                <Image
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=92&w=1200"
                  alt="Premium Asset"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest font-body opacity-50">Reference Model</p>
                  <p className="text-2xl font-black text-white font-display italic">{pricingExample.vehicle}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            className="p-12 rounded-[3rem] bg-zinc-900/50 border border-white/5 mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0 border border-yellow-500/20">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-6 font-display italic uppercase tracking-tight">EXTERNAL OBLIGATIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    "Customs Duties & Tariffs (Target Country Specific)",
                    "Import Value Added Tax (VAT)",
                    "Terminal Port Handling (Destination Side)",
                    "Registered Customs Brokerage Fees",
                    "Local Registration & Asset Licensing",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-body group-hover:text-gray-300 transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center p-12 md:p-16 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/20 relative overflow-hidden">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 font-display italic uppercase tracking-tighter">
              REQUEST <span className="gradient-text italic">SPECIFICATION</span>
            </h2>
            <p className="text-lg text-gray-500 mb-12 font-body font-medium max-w-2xl mx-auto">
              Secure a detailed financial breakdown tailored to your specific asset choice and global destination.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
              <Link href={routes.contact} className="btn-primary px-16 py-6 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase inline-flex items-center gap-4 group">
                INITIATE QUOTE
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
