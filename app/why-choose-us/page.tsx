"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, DollarSign, Clock, HeadphonesIcon, Award, Globe, CheckCircle2, Users, FileCheck } from "lucide-react";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUsPage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featuresRef.current) {
      scrollReveal(featuresRef.current, slideUp, { delay: 0.3 });
    }
    if (trustRef.current) {
      scrollReveal(trustRef.current, slideUp, { delay: 0.4 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const features = [
    {
      icon: Award,
      title: "15+ Years Experience",
      description: "Established in 2009, we've built a reputation for reliability and expertise in the Japanese car export industry. Our team has handled thousands of successful exports worldwide.",
    },
    {
      icon: Globe,
      title: "120+ Auction Partners",
      description: "Direct access to Japan's largest auction network. We're official members of major auction houses including USS, TAA, CAA, and more, giving you access to the best inventory.",
    },
    {
      icon: Shield,
      title: "Verified Quality",
      description: "Every vehicle comes with detailed auction sheets and inspection reports. We physically inspect vehicles before purchase and only source from trusted auction houses with verified grading systems.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees or surprise charges. Clear FOB and CIF pricing with detailed cost breakdowns. Competitive rates thanks to our direct auction access and volume discounts.",
    },
    {
      icon: Clock,
      title: "Fast & Reliable Shipping",
      description: "Efficient logistics from major Japanese ports (Yokohama, Kobe, Osaka, Nagoya). Average shipping time 28-45 days depending on destination. Real-time tracking available.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Dedicated multilingual team to guide you through every step. Available via phone, email, and chat. We handle all export documentation and provide import guidance for your country.",
    },
    {
      icon: FileCheck,
      title: "Complete Documentation",
      description: "All original documents provided including export certificate, invoice, Bill of Lading, and inspection reports. Documents shipped via DHL for secure delivery.",
    },
    {
      icon: Users,
      title: "5,000+ Satisfied Customers",
      description: "98% customer satisfaction rate with verified reviews. Customers from 50+ countries trust us for their vehicle imports. Many return customers and referrals.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Vehicles Exported" },
    { value: "5,000+", label: "Happy Customers" },
    { value: "50+", label: "Countries Served" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-16 relative overflow-hidden">
      <div className="atmospheric-glow w-[600px] h-[600px] bg-cyan-500/10 -top-20 -right-20 blur-[120px]" />
      <div className="atmospheric-glow w-[400px] h-[400px] bg-purple-500/5 bottom-0 left-0 blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-32">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] font-body">Unmatched Reliability</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tighter font-display uppercase leading-none">
            WHY <span className="gradient-text italic">TRADEWARE</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-body font-medium leading-relaxed">
            Your trusted partner for importing premium Japanese vehicles with transparency, reliability, and expert support.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-black text-white font-display italic mb-2 group-hover:text-cyan-400 transition-colors">{stat.value}</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-body">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card p-10 group hover:border-cyan-500/30 transition-all duration-700 bg-white/5 border border-white/5 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 group-hover:bg-cyan-500 transition-all duration-500">
                  <Icon className="h-8 w-8 text-cyan-500 group-hover:text-black" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight font-display italic decoration-cyan-500/20 underline underline-offset-8">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-body font-medium">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div ref={trustRef} className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px]" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center font-display italic uppercase">
            TRUSTED & VERIFIED
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {[
              "Member of 120+ Japanese auction houses",
              "Verified by JEVIC Inspection Center",
              "ISO certified quality management",
              "Secure payment processing",
              "Full insurance coverage available",
              "Official export documentation provider",
              "Registered with Japan Export Trade Organization",
              "BBB Accredited Business",
              "24/7 Global Logistics Support",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-all duration-500">
                  <CheckCircle2 className="h-3 w-3 text-cyan-500 group-hover:text-black" />
                </div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <CTASection
          title="READY TO SECURE YOUR ASSET?"
          description="Join thousands of satisfied customers who trust Tradeware for their vehicle imports."
          primaryAction={{
            label: "BROWSE INVENTORY",
            href: routes.inventory,
          }}
          secondaryAction={{
            label: "GET IN TOUCH",
            href: routes.contact,
          }}
          variant="gradient"
        />
      </div>
    </div>
  );
}
