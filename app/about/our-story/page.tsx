"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Award, Sparkles, Target } from "lucide-react";
import { routes } from "@/config/routes";
import { sectionReveal, staggerReveal } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description: "Tradeware was founded with a vision to make Japanese vehicle imports accessible to customers worldwide. Started as a small team with big dreams.",
  },
  {
    year: "2013",
    title: "First 1,000 Vehicles",
    description: "Reached our first major milestone - successfully imported 1,000 vehicles. Built strong relationships with Japanese auction houses.",
  },
  {
    year: "2016",
    title: "Global Expansion",
    description: "Expanded operations to 25 countries. Launched our online platform to streamline the import process for customers.",
  },
  {
    year: "2019",
    title: "10,000 Vehicles Milestone",
    description: "Celebrated importing our 10,000th vehicle. Introduced advanced verification services and cost calculator tools.",
  },
  {
    year: "2022",
    title: "50 Countries Reached",
    description: "Extended our services to 50 countries worldwide. Launched live auction access and real-time bidding platform.",
  },
  {
    year: "2026",
    title: "Today & Beyond",
    description: "Continuing to innovate and improve. Over 10,000 satisfied customers and 50,000+ vehicles in our inventory. The journey continues.",
  },
];

export default function OurStoryPage() {
  const milestonesRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!milestonesRef.current || !valuesRef.current) return;

    const ctx = gsap.context(() => {
      // Animate milestones
      if (milestonesRef.current) {
        staggerReveal(milestonesRef.current, "> *", {
          stagger: 0.15,
          delay: 0.3,
        });
      }

      // Animate values section
      if (valuesRef.current) {
        sectionReveal(valuesRef.current, { y: 30, delay: 0.4 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Our <span className="gradient-text">Story</span>
              </>
            }
            description="From humble beginnings to a global leader in Japanese vehicle imports"
            badge="About Us"
            badgeIcon={<Sparkles className="h-8 w-8" />}
          />

          {/* Story Introduction */}
          <ScrollReveal delay={0.2}>
            <div className="card p-8 mb-16">
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Tradeware's story began in 2010 with a simple mission: to make importing premium Japanese vehicles accessible, transparent, and stress-free for customers around the world.
                </p>
                <p>
                  What started as a small team of automotive enthusiasts has grown into a trusted global platform, serving thousands of customers across 50+ countries. Our journey has been marked by continuous innovation, customer-focused service, and an unwavering commitment to quality.
                </p>
                <p>
                  Today, we stand as one of the world's leading Japanese vehicle import platforms, but our core values remain the same - transparency, reliability, and putting our customers first.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div ref={milestonesRef} className="relative mb-16">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="relative pl-20 pb-12 last:pb-0"
              >
                <div className="absolute left-6 top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-dark-900" />
                
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-5 w-5 text-cyan-500" />
                    <span className="text-cyan-500 font-black text-lg">{milestone.year}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{milestone.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="card p-8">
              <Target className="h-8 w-8 text-cyan-500 mb-4" />
              <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To make importing premium Japanese vehicles accessible to customers worldwide by providing transparent, reliable, and professional services that exceed expectations.
              </p>
            </div>

            <div className="card p-8">
              <Award className="h-8 w-8 text-gold-400 mb-4" />
              <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the world's most trusted and innovative platform for Japanese vehicle imports, setting new standards for quality, transparency, and customer service.
              </p>
            </div>
          </div>

          {/* CTA */}
          <CTASection
            title="Be Part of Our Story"
            description="Join thousands of customers who trust Tradeware for their vehicle imports"
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
