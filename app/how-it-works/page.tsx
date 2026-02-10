"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Search, FileCheck, Ship, CheckCircle, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { fadeIn, prefersReducedMotion } from "@/lib/animations";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Browse & Search Vehicles",
    description: "Access our comprehensive inventory of over 50,000 premium Japanese vehicles sourced directly from Japan's largest auction network, including USS, TAA, CAA, HAA, JAA, and 120+ additional auction partners. Our advanced search platform allows you to filter vehicles by make, model, year, price range, body type, fuel type, transmission, mileage, auction grade, and location. Each vehicle listing includes high-resolution photographs from multiple angles, detailed specifications, comprehensive equipment lists, original auction sheets, and professional inspection reports. If you don't find the specific vehicle you're seeking, our team can conduct custom searches across our extensive auction network to locate vehicles matching your exact requirements. Our inventory is updated daily with new arrivals, ensuring you have access to the latest available vehicles.",
    icon: Search,
    details: [
      "Browse 50,000+ vehicles in stock from 120+ auction houses",
      "Advanced search filters: make, model, year, price, specifications",
      "Custom vehicle search service for specific requirements",
      "High-resolution photographs and detailed specifications",
      "Complete auction sheets and professional inspection reports",
      "Real-time inventory updates with daily new arrivals",
    ],
    color: "from-gold-500 to-gold-600",
  },
  {
    number: "02",
    title: "Select & Verify",
    description: "Once you've identified a vehicle of interest, our comprehensive verification process ensures complete transparency. Review detailed auction sheets with condition grades, mechanical inspection reports, interior and exterior assessments, and complete equipment documentation. Our expert team in Yokohama provides additional verification services including supplementary inspections, detailed condition analysis, and professional valuation assessments. We can arrange for additional photographs from specific angles, video inspections, and mechanical testing when required. Our experienced professionals offer expert advice on vehicle condition, value assessment, and suitability for your specific market requirements. This thorough verification process ensures you make informed purchasing decisions with complete confidence in vehicle quality and condition.",
    icon: FileCheck,
    details: [
      "Comprehensive review of auction grades and condition assessments",
      "Download complete auction sheets with detailed condition codes",
      "Access professional mechanical and cosmetic inspection reports",
      "Request additional photographs or video inspections",
      "Expert advice from our experienced team in Yokohama",
      "Professional valuation and market suitability assessments",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Purchase & Payment",
    description: "Secure your selected vehicle with a deposit, typically 50-100% depending on your preferred payment terms and vehicle value. We accept secure bank transfers through established international banking relationships, ensuring safe and efficient payment processing. Flexible payment terms are available for qualified buyers, with attractive discounts offered for full upfront payment. Our pricing is completely transparent with detailed cost breakdowns including FOB price, shipping costs, insurance, and all applicable fees - no hidden charges. We accept multiple payment methods and currencies, accommodating diverse international payment requirements. All transactions are processed securely with comprehensive documentation and receipts. Our payment processing is designed to be efficient, secure, and accommodating to international buyers' needs.",
    icon: CreditCard,
    details: [
      "Secure international payment processing via bank transfers",
      "Flexible payment terms: 50-100% deposit options available",
      "Attractive discounts for full upfront payment",
      "Completely transparent pricing with detailed cost breakdowns",
      "No hidden fees - all costs clearly disclosed upfront",
      "Multiple payment methods and currency options accepted",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "04",
    title: "Shipping & Delivery",
    description: "Our experienced logistics team handles all export documentation requirements including export certificates, commercial invoices, packing lists, and Bill of Lading preparation. We coordinate shipping from major Japanese ports including Yokohama, Kobe, and Osaka through our established network of shipping partners including NYK Line, MOL, K Line, and other major carriers. You'll receive comprehensive tracking information with real-time updates on your shipment's status from departure through arrival at your destination port. All vehicles are properly prepared for international transport with comprehensive marine insurance coverage. Original vehicle documents including registration certificates, inspection reports, and auction sheets are shipped separately via DHL for security and faster delivery. Average shipping times range from 28-45 days depending on destination, with expedited options available for urgent shipments.",
    icon: Ship,
    details: [
      "Complete export documentation handled by our expert team",
      "Shipping coordination from Yokohama, Kobe, and Osaka ports",
      "Real-time shipment tracking with detailed logistics updates",
      "Comprehensive Bill of Lading and shipping documentation",
      "Original documents shipped securely via DHL Express",
      "Average shipping time: 28-45 days with expedited options available",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "05",
    title: "Receive Your Vehicle",
    description: "Your vehicle arrives at your designated destination port with complete documentation package. Our support team provides guidance on local customs clearance procedures and can assist with documentation requirements specific to your country. You'll receive all original documents including export certificate, commercial invoice, packing list, Bill of Lading, original auction sheet, inspection reports, and any additional documentation required for your market. These documents are essential for completing customs clearance and local vehicle registration. Our team remains available to assist with any post-delivery questions or documentation needs. Once customs clearance is completed and local registration is finalized, you can take delivery of your vehicle and begin enjoying your premium Japanese import. Our commitment to customer satisfaction extends beyond delivery, ensuring you have ongoing support throughout the ownership experience.",
    icon: CheckCircle,
    details: [
      "Vehicle delivery at your designated destination port",
      "Complete customs clearance assistance and documentation support",
      "Receive all original documents: export certificates, invoices, reports",
      "Local vehicle registration guidance and documentation assistance",
      "Ongoing post-delivery support and customer service",
      "Begin enjoying your premium Japanese vehicle import",
    ],
    color: "from-orange-500 to-red-500",
  },
];

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };
const springSoft = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function HowItWorksPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // 1. Page load: fade + Y + subtle shake
      if (pageRef.current) {
        gsap.fromTo(
          pageRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              const el = pageRef.current;
              if (!el) return;
              gsap.fromTo(el, { x: 0 }, { x: 0.25, duration: 0.08, yoyo: true, repeat: 2, ease: "power1.inOut", onComplete: () => { gsap.set(el, { x: 0 }); } });
            },
          }
        );
      }
      // Hero fade + subtle scale
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 24, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.15, ease: "power3.out" });
      }
      // 5. Auction vibe: slow background motion
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          x: 8,
          y: -12,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          x: -6,
          y: 8,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const heroImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=85&w=1600";

  return (
    <div ref={pageRef} className="bg-black pt-8 pb-12 relative overflow-hidden">
      <div ref={glow1Ref} className="absolute -top-24 -right-20 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] pointer-events-none" aria-hidden />
      <div ref={glow2Ref} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero with image */}
          <div ref={headerRef} className="relative rounded-2xl overflow-hidden mb-6 md:mb-8">
            <div className="relative aspect-[3/1] min-h-[120px] md:min-h-[140px]">
              <Image
                src={heroImage}
                alt="Premium Japanese vehicles – import process"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] font-body">Our Methodology</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tighter font-display uppercase leading-none">
                  HOW IT <span className="gradient-text italic">WORKS</span>
                </h1>
                <p className="text-sm md:text-base text-gray-300 max-w-2xl font-body font-medium leading-relaxed">
                  Our streamlined five-step process – from vehicle selection to final delivery at your port.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-9 mb-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    <div className="md:w-1/3">
                      <div className="sticky top-28">
                        <motion.div
                          className={`inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br ${step.color.includes('gold') ? 'from-cyan-500 to-blue-500' : step.color} mb-8 shadow-2xl relative group`}
                          whileHover={{ rotate: 360, scale: 1.05 }}
                          transition={spring}
                        >
                          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true" />
                          <Icon className="h-8 w-8 text-black relative z-10" />
                        </motion.div>
                        <div className="text-8xl font-black text-white/5 mb-4 font-display italic leading-none">{step.number}</div>
                        <h2 className="text-3xl font-black text-white mb-6 font-display italic uppercase tracking-tight decoration-cyan-500/30 underline underline-offset-8">{step.title}</h2>
                        <p className="text-gray-400 font-body font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <motion.div
                        className="card p-6 md:p-10 bg-white/5 border border-white/5 relative"
                        whileHover={{
                          y: -5,
                          scale: 1.008,
                          boxShadow: "0 0 0 1px rgba(6,182,212,0.25), 0 16px 32px -10px rgba(0,0,0,0.45), 0 0 32px -6px rgba(6,182,212,0.12)",
                          transition: { duration: 0.4 },
                        }}
                        transition={springSoft}
                      >
                        <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em] font-body opacity-50">Protocol Highlights:</h3>
                        <ul className="space-y-6">
                          {step.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-center gap-6 group"
                              initial={{ opacity: 0, x: -16 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:w-6 transition-all duration-500" />
                              <span className="text-gray-300 text-lg font-body font-bold uppercase tracking-widest text-[10px]">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-10 top-32 w-[1px] h-full bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent -z-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/30 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 blur-[80px] pointer-events-none" aria-hidden />
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 font-display italic uppercase tracking-tighter">
              READY TO <span className="gradient-text">INITIATE?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mb-8 font-body font-medium max-w-2xl mx-auto">
              Browse our curated inventory or contact our concierge for personalized asset search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={spring}>
                <Link href={routes.inventory} className="btn-primary px-12 py-5 rounded-2xl flex items-center justify-center gap-3 group text-xs cursor-pointer">
                  EXPLORE INVENTORY
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={spring}>
                <Link href={routes.contact} className="btn-secondary px-12 py-5 rounded-2xl flex items-center justify-center gap-3 group text-xs cursor-pointer">
                  CONNECT WITH CONCIERGE
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
