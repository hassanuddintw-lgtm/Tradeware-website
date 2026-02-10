"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ship, MapPin, Clock, FileText, Shield, Package, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ports = [
  {
    name: "Yokohama Port",
    location: "Yokohama, Kanagawa",
    description: "Largest port in Japan, excellent connectivity to worldwide destinations. Primary port for exports to Africa, Middle East, and Asia.",
    advantages: ["Largest port capacity", "Frequent sailings", "Best for Africa & Middle East"],
    color: "from-gold-500 to-gold-600",
  },
  {
    name: "Kobe Port",
    location: "Kobe, Hyogo",
    description: "Major international port with excellent facilities. Ideal for exports to various destinations with competitive shipping rates.",
    advantages: ["Modern facilities", "Competitive rates", "Good for Asia Pacific"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Osaka Port",
    location: "Osaka, Osaka",
    description: "Strategic location in central Japan. Good connectivity and efficient handling for vehicle exports.",
    advantages: ["Central location", "Efficient handling", "Good connectivity"],
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Nagoya Port",
    location: "Nagoya, Aichi",
    description: "Important port for automotive exports. Well-equipped for vehicle handling and shipping.",
    advantages: ["Automotive expertise", "Well-equipped", "Reliable service"],
    color: "from-purple-500 to-pink-500",
  },
];

const shippingInfo = [
  {
    destination: "Africa",
    transitTime: "35-50 days",
    ports: "Yokohama, Kobe",
    notes: "Most popular destination. Regular sailings available.",
    color: "from-orange-500 to-red-500",
  },
  {
    destination: "Middle East (UAE, Saudi, etc.)",
    transitTime: "25-35 days",
    ports: "Yokohama, Kobe",
    notes: "Frequent sailings. Good connectivity.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    destination: "Asia Pacific",
    transitTime: "15-25 days",
    ports: "All ports",
    notes: "Shortest transit times. Multiple options.",
    color: "from-green-500 to-emerald-500",
  },
  {
    destination: "Europe",
    transitTime: "40-60 days",
    ports: "Yokohama, Kobe",
    notes: "Longer transit. Regular service available.",
    color: "from-purple-500 to-pink-500",
  },
  {
    destination: "Americas",
    transitTime: "30-45 days",
    ports: "Yokohama",
    notes: "Trans-Pacific routes. Regular service.",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function ShippingPage() {
  const portsRef = useRef<HTMLDivElement>(null);
  const transitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (portsRef.current) {
      scrollReveal(portsRef.current, slideUp, { delay: 0.3 });
    }
    if (transitRef.current) {
      scrollReveal(transitRef.current, slideUp, { delay: 0.4 });
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
                Shipping <span className="gradient-text">Information</span>
              </>
            }
            description="Reliable shipping from Japan's major ports to destinations worldwide"
            badge="Shipping Information"
            badgeIcon={<Ship className="h-8 w-8" />}
          />

          {/* Shipping Process */}
          <ScrollReveal delay={0.2}>
            <div className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-6">Shipping Process</h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "Vehicle Preparation", desc: "Vehicle is inspected, cleaned, and prepared for export. All documentation is prepared." },
                { step: "2", title: "Port Delivery", desc: "Vehicle is delivered to the designated port and loaded onto the vessel." },
                { step: "3", title: "Documentation", desc: "Bill of Lading (B/L) is issued and provided to you. Original documents shipped via DHL." },
                { step: "4", title: "Transit & Tracking", desc: "Track your shipment in real-time. Average transit time 28-45 days depending on destination." },
                { step: "5", title: "Arrival & Pickup", desc: "Vehicle arrives at destination port. Complete customs clearance and arrange pickup." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center font-black text-dark-950`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          </ScrollReveal>

          {/* Ports */}
          <div ref={portsRef} className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-8 text-center">Export Ports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ports.map((port, index) => (
                <motion.div
                  key={index}
                  className="card p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${port.color}`}>
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{port.name}</h3>
                      <p className="text-sm text-gray-400">{port.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{port.description}</p>
                  <ul className="space-y-2">
                    {port.advantages.map((adv, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 + idx * 0.05 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-gold-400" />
                        <span>{adv}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transit Times */}
          <motion.div
            className="card p-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-6">Transit Times by Destination</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-800">
                    <th className="text-left py-3 px-4 font-black text-gray-900 dark:text-gray-100">Destination</th>
                    <th className="text-left py-3 px-4 font-black text-gray-900 dark:text-gray-100">Transit Time</th>
                    <th className="text-left py-3 px-4 font-black text-gray-900 dark:text-gray-100">Ports</th>
                    <th className="text-left py-3 px-4 font-black text-gray-900 dark:text-gray-100">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingInfo.map((info, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-dark-800 hover:bg-dark-800/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{info.destination}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{info.transitTime}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{info.ports}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{info.notes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Important Information */}
          <ScrollReveal delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Clock, title: "Transit Times", desc: "Average 28-45 days depending on destination. Times are estimates and may vary.", color: "from-gold-500 to-gold-600" },
              { icon: Shield, title: "Insurance", desc: "Full insurance coverage available during transit. Recommended for all shipments.", color: "from-blue-500 to-cyan-500" },
              { icon: FileText, title: "Documentation", desc: "All original documents shipped via DHL. Bill of Lading provided for tracking.", color: "from-green-500 to-emerald-500" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Questions About <span className="gradient-text">Shipping?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Contact us for specific shipping quotes and schedules
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={routes.contact} className="btn-primary inline-flex items-center gap-2">
                Get Shipping Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
