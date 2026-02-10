"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download, BookOpen, FileCheck, Ship, DollarSign, Shield, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const documentationCategories = [
  {
    icon: FileCheck,
    title: "Import Guides",
    description: "Step-by-step guides for importing vehicles to different countries",
    count: 12,
    color: "cyan",
  },
  {
    icon: Ship,
    title: "Shipping Information",
    description: "Complete shipping documentation and port information",
    count: 8,
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Pricing & Costs",
    description: "Detailed cost breakdowns and pricing information",
    count: 6,
    color: "gold",
  },
  {
    icon: Shield,
    title: "Legal Documents",
    description: "Required documents, certificates, and compliance guides",
    count: 10,
    color: "purple",
  },
];

const popularDocuments = [
  {
    title: "Complete Import Guide for New Zealand",
    category: "Import Guides",
    size: "2.4 MB",
    downloads: 1250,
  },
  {
    title: "Shipping Process & Port Information",
    category: "Shipping Information",
    size: "1.8 MB",
    downloads: 980,
  },
  {
    title: "Cost Breakdown Calculator Guide",
    category: "Pricing & Costs",
    size: "950 KB",
    downloads: 1450,
  },
  {
    title: "Required Documents Checklist",
    category: "Legal Documents",
    size: "1.2 MB",
    downloads: 2100,
  },
  {
    title: "Auction Grade Explanation Guide",
    category: "Import Guides",
    size: "1.5 MB",
    downloads: 1750,
  },
  {
    title: "Vehicle Verification Process",
    category: "Legal Documents",
    size: "890 KB",
    downloads: 1100,
  },
];

export default function DocumentationPage() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoriesRef.current) {
      scrollReveal(categoriesRef.current, slideUp, { delay: 0.3 });
    }
    if (documentsRef.current) {
      scrollReveal(documentsRef.current, slideUp, { delay: 0.4 });
    }
    if (linksRef.current) {
      scrollReveal(linksRef.current, slideUp, { delay: 0.5 });
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
                Complete <span className="gradient-text">Documentation</span>
              </>
            }
            description="All the guides, forms, and information you need for importing Japanese vehicles"
            badge="Documentation Center"
            badgeIcon={<BookOpen className="h-8 w-8" />}
          />

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {documentationCategories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
              <motion.div
                key={category.title}
                className="card p-6 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`p-4 rounded-xl bg-${category.color}-500/20 mb-4 w-fit`}>
                  <CategoryIcon className={`h-6 w-6 text-${category.color}-500`} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-cyan-500 text-sm font-semibold">
                  <span>{category.count} Documents</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ); })}
          </div>

          {/* Popular Documents */}
          <div ref={documentsRef} className="mb-16">
            <h2 className="text-3xl font-black text-white mb-8">Popular Documents</h2>

            <div className="space-y-4">
              {popularDocuments.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  className="card p-6 flex items-center justify-between group hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 rounded-xl bg-cyan-500/20">
                      <FileText className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white mb-1">{doc.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-secondary inline-flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef} className="card p-8 mb-16">
            <h2 className="text-3xl font-black text-white mb-6">Quick Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "How It Works", href: routes.howItWorks, icon: BookOpen },
                { title: "Shipping Information", href: routes.shipping, icon: Ship },
                { title: "Pricing Guide", href: routes.pricing, icon: DollarSign },
                { title: "Cost Calculator", href: routes.costCalculator, icon: DollarSign },
                { title: "Verification Services", href: routes.verification, icon: Shield },
                { title: "Contact Support", href: routes.contact, icon: FileText },
              ].map((link, index) => {
                const LinkIcon = link.icon;
                return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <LinkIcon className="h-5 w-5 text-cyan-500" />
                  <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    {link.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-500 ml-auto group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                </Link>
              ); })}
            </div>
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.6}>
            <div className="text-center">
              <h2 className="text-3xl font-black text-white mb-4">Need More Help?</h2>
              <p className="text-gray-300 mb-8">Our support team is here to assist you with any questions</p>
              <Link href={routes.contact} className="btn-primary inline-flex items-center gap-2">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
