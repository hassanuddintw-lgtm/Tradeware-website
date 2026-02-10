"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, CheckCircle, FileCheck, Camera, AlertTriangle, Sparkles, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: FileCheck,
    title: "Auction Sheet Verification",
    description: "Comprehensive analysis of auction sheets to verify vehicle condition, grade, and specifications.",
  },
  {
    icon: Camera,
    title: "Photo Inspection",
    description: "Detailed photo inspection of all vehicle angles, interior, and engine bay to identify any issues.",
  },
  {
    icon: CheckCircle,
    title: "Condition Report",
    description: "Professional condition assessment with detailed report on vehicle status and any defects found.",
  },
  {
    icon: Shield,
    title: "Document Verification",
    description: "Verification of all export documents, certificates, and paperwork to ensure authenticity.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Submit Request",
    description: "Provide vehicle details and auction sheet. Our team will review your request within 24 hours.",
  },
  {
    step: "2",
    title: "Professional Inspection",
    description: "Our certified inspectors examine the vehicle thoroughly using advanced tools and techniques.",
  },
  {
    step: "3",
    title: "Detailed Report",
    description: "Receive a comprehensive verification report with photos, findings, and recommendations.",
  },
  {
    step: "4",
    title: "Decision Support",
    description: "Get expert advice on whether the vehicle meets your requirements and is worth purchasing.",
  },
];

export default function VerificationPage() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (servicesRef.current) {
      scrollReveal(servicesRef.current, slideUp, { delay: 0.3 });
    }
    if (processRef.current) {
      scrollReveal(processRef.current, slideUp, { delay: 0.4 });
    }
    if (includedRef.current) {
      scrollReveal(includedRef.current, slideUp, { delay: 0.5 });
    }
    if (pricingRef.current) {
      scrollReveal(pricingRef.current, slideUp, { delay: 0.6 });
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
                Professional <span className="gradient-text">Vehicle Verification</span>
              </>
            }
            description="Get your Japanese vehicle professionally verified before purchase. Comprehensive inspection reports and expert analysis."
            badge="Vehicle Verification"
            badgeIcon={<Shield className="h-8 w-8" />}
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
              <motion.div
                key={service.title}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-cyan-500/20">
                    <ServiceIcon className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ); })}
          </div>

          {/* Process Section */}
          <div ref={processRef} className="card p-8 mb-16">
            <h2 className="text-3xl font-black text-white mb-8 text-center">Verification Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-500 text-2xl font-black mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div ref={includedRef} className="card p-8 mb-16">
            <h2 className="text-3xl font-black text-white mb-6">What's Included in Verification</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Auction sheet analysis and grade verification",
                "Exterior condition assessment with detailed photos",
                "Interior inspection including seats, dashboard, and electronics",
                "Engine bay examination and mechanical condition check",
                "Undercarriage inspection for rust and damage",
                "Mileage verification and odometer check",
                "Document authenticity verification",
                "Expert recommendations and purchase advice",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div ref={pricingRef} className="card p-8 mb-16 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-4">Verification Pricing</h2>
              <p className="text-gray-300">Transparent pricing with no hidden fees</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Basic Verification",
                  price: "$150",
                  features: ["Auction sheet analysis", "Photo inspection", "Basic condition report"],
                },
                {
                  name: "Standard Verification",
                  price: "$250",
                  features: ["Everything in Basic", "Detailed condition report", "Document verification", "Expert recommendations"],
                  popular: true,
                },
                {
                  name: "Premium Verification",
                  price: "$400",
                  features: ["Everything in Standard", "Video inspection", "Multiple vehicle comparison", "Priority support"],
                },
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`card p-6 ${plan.popular ? "border-2 border-cyan-500" : ""}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold uppercase rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-black text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-cyan-500">{plan.price}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={routes.contact}
                    className={`w-full text-center inline-block py-3 rounded-xl font-semibold transition-colors ${
                      plan.popular
                        ? "bg-cyan-500 text-white hover:bg-cyan-400"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Request Verification
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.7}>
            <div className="text-center">
              <h2 className="text-3xl font-black text-white mb-4">Ready to Verify Your Vehicle?</h2>
              <p className="text-gray-300 mb-8">Get professional verification before making your purchase decision</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={routes.contact} className="btn-primary inline-flex items-center gap-2">
                  Request Verification
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={routes.inventory} className="btn-secondary">
                  Browse Vehicles
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
