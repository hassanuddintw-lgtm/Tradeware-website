"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, MapPin, Calendar, Users, Globe, Award, Sparkles, ArrowRight, TrendingUp, Shield, Target } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { sectionReveal, staggerReveal } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "10,000+", label: "Vehicles Exported", icon: TrendingUp },
  { value: "5,000+", label: "Satisfied Customers", icon: Users },
  { value: "50+", label: "Countries Served", icon: Globe },
  { value: "15+", label: "Years Experience", icon: Calendar },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "We've built our reputation on transparency, honesty, and delivering exactly what we promise.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We go above and beyond to ensure you get the perfect vehicle.",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "With experience in 50+ countries, we understand the unique requirements of each market.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Every vehicle is thoroughly verified and inspected to meet our high standards of quality.",
  },
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return () => {};
    const ctx = gsap.context(() => {
      if (storyRef.current) sectionReveal(storyRef.current, { y: 30, delay: 0.3 });
      if (whyRef.current) sectionReveal(whyRef.current, { y: 30, delay: 0.4 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-gold-400" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              About <span className="gradient-text">Tradeware</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your trusted partner for importing premium Japanese vehicles worldwide
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
              <motion.div
                key={stat.label}
                className="card p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <StatIcon className="h-8 w-8 text-cyan-500 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ); })}
          </div>

          {/* Company Story */}
          <div ref={storyRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Founded in 2010 with a vision to make premium Japanese vehicles accessible to customers worldwide, Tradeware began as a small team of automotive enthusiasts in Yokohama, Japan. Our founders recognized the exceptional quality and value that Japanese vehicles offer in international markets, combined with the complexity and challenges of the import process. What started as a passion project has evolved into one of the world's most trusted Japanese vehicle import platforms, serving customers across six continents.
              </p>
              <p>
                Over the past 15 years, we've built an unparalleled network of relationships with Japan's major auction houses, shipping partners, and logistics providers. Our team has grown to include automotive experts, international trade specialists, logistics coordinators, and customer service professionals, all dedicated to ensuring exceptional experiences for every customer. We've successfully facilitated the import of over 10,000 vehicles to more than 50 countries, establishing Tradeware as a leader in transparent, reliable, and professional vehicle imports.
              </p>
              <p>
                Our commitment to excellence is reflected in our comprehensive service approach, covering every aspect of the import process from vehicle selection through final delivery. We've invested heavily in technology, infrastructure, and team development to ensure we can provide the highest levels of service, transparency, and value. Today, Tradeware stands as a symbol of reliability, transparency, and excellence in the Japanese vehicle import industry, trusted by individual buyers, fleet operators, and commercial importers worldwide.
              </p>
              <p>
                As we look to the future, we remain committed to innovation, continuous improvement, and putting our customers first. We're constantly expanding our services, improving our processes, and building new partnerships to better serve our global customer base. Our mission remains unchanged: to make importing premium Japanese vehicles accessible, transparent, and stress-free for customers around the world.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-black text-white mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const ValueIcon = value.icon;
                return (
                <motion.div
                  key={value.title}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20">
                      <ValueIcon className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ); })}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <div ref={whyRef} className="card p-8 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">Why Choose Tradeware?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Direct access to 120+ Japanese auction houses including USS, TAA, CAA, and more",
                "Comprehensive vehicle verification with detailed inspection reports and condition assessments",
                "Complete pricing transparency with detailed cost breakdowns and no hidden fees",
                "Expert documentation handling ensuring compliance with international trade regulations",
                "Established global shipping network with partnerships across major shipping lines",
                "Dedicated multilingual customer support team available throughout the import process",
                "15+ years of industry experience with proven track record of successful imports",
                "Access to 50,000+ vehicles in inventory with daily updates from auction network",
                "Personal inspection services by our team in Yokohama for additional verification",
                "Custom vehicle search services to locate specific vehicles matching your requirements",
                "Real-time shipment tracking with detailed logistics updates from purchase to delivery",
                "Post-delivery support and assistance with customs clearance and registration",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <Award className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href={routes.ourStory}
              className="card p-6 group hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Our Story</h3>
                  <p className="text-gray-400">Learn more about our journey and mission</p>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href={routes.globalNetwork}
              className="card p-6 group hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Global Network</h3>
                  <p className="text-gray-400">Our worldwide presence and partnerships</p>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* CTA */}
          <CTASection
            title="Ready to Get Started?"
            description="Join thousands of satisfied customers worldwide"
            primaryAction={{
              label: "Browse Inventory",
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
