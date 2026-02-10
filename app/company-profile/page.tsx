"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, MapPin, Calendar, Users, Globe, Award, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { sectionReveal, staggerReveal } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "10,000+", label: "Vehicles Exported", icon: TrendingUp },
  { value: "5,000+", label: "Satisfied Customers", icon: Users },
  { value: "50+", label: "Countries Served", icon: Globe },
];

export default function CompanyProfilePage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return () => {};
    const ctx = gsap.context(() => {
      if (storyRef.current) sectionReveal(storyRef.current, { y: 30, delay: 0.3 });
      if (infoRef.current) sectionReveal(infoRef.current, { y: 30, delay: 0.4 });
      if (valuesRef.current) staggerReveal(valuesRef.current, "> *", { stagger: 0.15, delay: 0.5 });
      if (achievementsRef.current) staggerReveal(achievementsRef.current, "> *", { stagger: 0.15, delay: 0.6 });
      if (networkRef.current) sectionReveal(networkRef.current, { y: 30, delay: 0.7 });
    });
    return () => ctx.revert();
  }, []);

  const statsData = stats.map(stat => ({
    value: stat.value,
    label: stat.label,
    icon: stat.icon,
    color: "gold" as const,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                About <span className="gradient-text">Tradeware</span>
              </>
            }
            description="Your trusted partner for importing premium Japanese vehicles"
            badge="About Us"
            badgeIcon={<Sparkles className="h-8 w-8" />}
          />

          {/* Company Story */}
          <div ref={storyRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Founded in 2009, Tradeware has established itself as a leading exporter of quality Japanese vehicles 
                to customers worldwide. What started as a small operation in Yokohama has grown into a trusted 
                partner serving thousands of customers across 50+ countries.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Our mission is simple: to make importing Japanese vehicles accessible, transparent, and reliable for 
                customers worldwide. We believe in providing honest service, competitive pricing, and expert support 
                throughout the entire import process.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Over the years, we've built strong relationships with Japan's largest auction houses, giving us direct 
                access to millions of quality vehicles. Our team of experts understands the complexities of international 
                vehicle export and works tirelessly to ensure smooth transactions for every customer.
              </motion.p>
            </div>
          </div>

          {/* Company Info */}
          <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Building2, title: "Company", desc: "Tradeware Japan Co., Ltd.\nRegistered Export Business\nYokohama, Japan", color: "from-gold-500 to-gold-600" },
              { icon: MapPin, title: "Location", desc: "Head Office: Yokohama, Japan\nExport Ports: Yokohama, Kobe, Osaka, Nagoya\nServing customers worldwide", color: "from-blue-500 to-cyan-500" },
              { icon: Calendar, title: "Established", desc: "Founded: 2009\n15+ years of experience\nThousands of successful exports", color: "from-green-500 to-emerald-500" },
              { icon: Users, title: "Team", desc: "Multilingual support team\nExpert vehicle inspectors\nDedicated customer service", color: "from-purple-500 to-pink-500" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Values */}
          <div ref={valuesRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Transparency", desc: "We believe in honest, transparent communication. No hidden fees, clear pricing, and detailed documentation for every transaction." },
                { title: "Quality", desc: "Every vehicle is carefully selected and inspected. We only source from trusted auction houses and provide detailed condition reports." },
                { title: "Reliability", desc: "With 15+ years of experience, we've built a reputation for reliable service. Our customers trust us to deliver on our promises." },
                { title: "Customer Focus", desc: "Your satisfaction is our priority. We provide expert support throughout the entire process, from selection to delivery." },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-dark-800/50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <h3 className="text-xl font-black text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div ref={achievementsRef} className="card p-8 mb-12 bg-gradient-to-r from-gold-500/10 to-blue-500/10 border-2 border-gold-500/30">
            <h2 className="text-3xl font-black text-white mb-6 text-center">Our Achievements</h2>
            <StatsSection stats={statsData} columns={3} />
          </div>

          {/* Partnerships */}
          <div ref={networkRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">Our Network</h2>
            <div className="space-y-4 text-gray-300">
              {[
                { icon: Globe, text: "120+ Auction Partners: Official member of Japan's largest auction houses including USS, TAA, CAA, and more" },
                { icon: Award, text: "Verified Exporter: Certified by Japan Export Vehicle Inspection Center (JEVIC)" },
                { icon: Building2, text: "Multiple Ports: Export capabilities from Yokohama, Kobe, Osaka, and Nagoya ports" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Icon className="h-6 w-6 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <CTASection
            title="Ready to Work With Us?"
            description="Join thousands of satisfied customers who trust Tradeware for their vehicle imports"
            primaryAction={{
              label: "Browse Vehicles",
              href: routes.inventory,
            }}
            secondaryAction={{
              label: "Contact Us",
              href: routes.contact,
            }}
          />
        </div>
      </div>
    </div>
  );
}
