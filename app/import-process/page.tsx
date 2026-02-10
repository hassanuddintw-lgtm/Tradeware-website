"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Search, CreditCard, Ship, CheckCircle, AlertCircle, Sparkles, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    title: "Pre-Import Research",
    icon: Search,
    items: [
      "Research import regulations for your country",
      "Check vehicle age restrictions and emissions standards",
      "Verify steering wheel position requirements (LHD/RHD)",
      "Understand customs duties and taxes",
      "Identify required documentation",
      "Find a local customs broker if needed",
    ],
    color: "from-gold-500 to-gold-600",
  },
  {
    title: "Vehicle Selection",
    icon: FileText,
    items: [
      "Browse our inventory or request custom search",
      "Review auction sheets and inspection reports",
      "Verify vehicle meets your country's import requirements",
      "Confirm vehicle specifications match regulations",
      "Get expert advice from our team",
      "Place order and make deposit payment",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Export Documentation",
    icon: FileText,
    items: [
      "Export Certificate (Shaken Shoumeisho)",
      "Commercial Invoice",
      "Bill of Lading (B/L)",
      "Packing List",
      "Inspection Certificate (if required)",
      "Original Registration Documents",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Shipping & Transit",
    icon: Ship,
    items: [
      "Vehicle loaded at Japanese port",
      "Shipping documents issued",
      "Bill of Lading provided",
      "Real-time tracking available",
      "Average transit time: 28-45 days",
      "Insurance coverage during transit",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Arrival & Customs",
    icon: CheckCircle,
    items: [
      "Vehicle arrives at destination port",
      "Notify customs authorities",
      "Submit required documentation",
      "Pay customs duties and taxes",
      "Complete customs clearance",
      "Arrange vehicle pickup",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Registration & Compliance",
    icon: AlertCircle,
    items: [
      "Vehicle inspection (if required)",
      "Emission testing (if required)",
      "Local registration process",
      "Obtain license plates",
      "Insurance registration",
      "Enjoy your vehicle",
    ],
    color: "from-indigo-500 to-purple-500",
  },
];

const commonRequirements = [
  {
    region: "Africa",
    requirements: [
      "Age restrictions vary by country (typically 5-8 years)",
      "Right-hand drive usually accepted",
      "Emission standards: Euro 4 or equivalent",
      "Import permit may be required",
      "Customs duties: 10-30% of vehicle value",
    ],
  },
  {
    region: "Middle East (UAE, Saudi Arabia, etc.)",
    requirements: [
      "Age restrictions: 5-10 years depending on country",
      "Left-hand drive preferred in some countries",
      "GCC specifications may be required",
      "Import permit and customs clearance",
      "Customs duties: 5-15% of vehicle value",
    ],
  },
  {
    region: "Europe",
    requirements: [
      "Strict emission standards (Euro 6)",
      "Left-hand drive required",
      "Age restrictions vary by country",
      "Type approval may be required",
      "Customs duties: 10-20% of vehicle value",
    ],
  },
  {
    region: "Asia Pacific",
    requirements: [
      "Age restrictions vary (3-10 years)",
      "Right-hand drive accepted in many countries",
      "Emission standards vary by country",
      "Import permits required",
      "Customs duties: 5-25% of vehicle value",
    ],
  },
];

export default function ImportProcessPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepsRef.current) {
      scrollReveal(stepsRef.current, slideUp, { delay: 0.3 });
    }
    if (requirementsRef.current) {
      scrollReveal(requirementsRef.current, slideUp, { delay: 0.4 });
    }
    if (notesRef.current) {
      scrollReveal(notesRef.current, slideUp, { delay: 0.5 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Import Process <span className="gradient-text">Guide</span>
              </>
            }
            description="Complete step-by-step guide to importing Japanese vehicles to your country"
            badge="Import Guide"
            badgeIcon={<Sparkles className="h-8 w-8" />}
          />

          {/* Process Steps */}
          <div ref={stepsRef} className="space-y-8 mb-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -5 }}
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-black text-gold-400">Step {index + 1}</span>
                        <h2 className="text-2xl font-black text-white">{step.title}</h2>
                      </div>
                      <ul className="space-y-3">
                        {step.items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 + idx * 0.05 }}
                          >
                            <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Country Requirements */}
          <div ref={requirementsRef} className="mb-16">
            <h2 className="text-3xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
              <Globe className="h-8 w-8 text-gold-400" />
              Regional Import Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonRequirements.map((region, index) => (
                <motion.div
                  key={index}
                  className="card p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h3 className="text-xl font-black text-white mb-4">{region.region}</h3>
                  <ul className="space-y-2">
                    {region.requirements.map((req, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 + idx * 0.05 }}
                      >
                        <span className="text-gold-400 mt-1">•</span>
                        <span>{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div ref={notesRef} className="card p-8 bg-yellow-500/10 border-2 border-yellow-500/30 mb-16">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black text-white mb-4">Important Notes</h3>
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Import regulations vary by country and change frequently. Always verify current requirements with local authorities.",
                    "Some countries require pre-export inspection (JEVIC, JAAI, NKKK). We can arrange these inspections.",
                    "Customs duties and taxes are calculated based on your country's regulations and are the buyer's responsibility.",
                    "We provide all necessary export documentation. Local customs clearance and registration are handled by the buyer or their agent.",
                  ].map((note, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + idx * 0.1 }}
                    >
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{note}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <CTASection
            title="Need Help with Import Process?"
            description="Our team can guide you through the entire import process"
            primaryAction={{
              label: "Contact Our Experts",
              href: routes.contact,
            }}
          />
        </div>
      </div>
    </div>
  );
}
