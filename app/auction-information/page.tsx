"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, FileText, Search, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { sectionReveal, staggerReveal } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const grades = [
  {
    grade: "6",
    description: "Excellent condition, like new",
    details: ["No repairs needed", "Very low mileage", "Perfect interior and exterior", "All original parts"],
    color: "from-green-500 to-emerald-500",
  },
  {
    grade: "5",
    description: "Very good condition",
    details: ["Minor scratches or dents", "Low mileage", "Well maintained", "No major issues"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    grade: "4.5",
    description: "Good condition",
    details: ["Some minor repairs", "Normal wear and tear", "Good overall condition", "Minor scratches"],
    color: "from-gold-500 to-gold-600",
  },
  {
    grade: "4",
    description: "Fair condition",
    details: ["Some repairs done", "Visible wear", "Functional condition", "May need minor work"],
    color: "from-orange-500 to-red-500",
  },
  {
    grade: "3.5",
    description: "Below average condition",
    details: ["Multiple repairs", "Significant wear", "May need work", "Lower price point"],
    color: "from-red-500 to-pink-500",
  },
  {
    grade: "3",
    description: "Poor condition",
    details: ["Many repairs", "High mileage", "Significant wear", "Needs work"],
    color: "from-gray-500 to-gray-600",
  },
  {
    grade: "R",
    description: "Repaired/Accident history",
    details: ["Previous accident", "Repairs completed", "May affect value", "Lower price"],
    color: "from-yellow-500 to-orange-500",
  },
];

const auctionHouses = [
  "USS (Used Car System Solutions)",
  "TAA (Tokyo Auto Auction)",
  "CAA (Central Auto Auction)",
  "HAA (Hiroshima Auto Auction)",
  "JAA (Japan Auto Auction)",
  "And 115+ more auction partners",
];

export default function AuctionInformationPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const gradesRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return () => {};
    const ctx = gsap.context(() => {
      if (introRef.current) sectionReveal(introRef.current, { y: 30, delay: 0.3 });
      if (gradesRef.current) staggerReveal(gradesRef.current, "> *", { stagger: 0.15, delay: 0.4 });
      if (partnersRef.current) staggerReveal(partnersRef.current, "> *", { stagger: 0.15, delay: 0.5 });
      if (notesRef.current) sectionReveal(notesRef.current, { y: 30, delay: 0.6 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <h1 className="text-white">Auction Information</h1>
      </div>
    </div>
  );
}
