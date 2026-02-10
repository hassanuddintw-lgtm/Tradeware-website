"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, Sparkles, ArrowRight, MapPin, Car } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const successStories = [
  {
    id: "1",
    customer: "John Smith",
    location: "Auckland, New Zealand",
    vehicle: "2020 Toyota Land Cruiser Prado",
    rating: 5,
    story: "As a fleet operator importing vehicles for my transport business, I was initially skeptical about importing from Japan. Tradeware completely changed my perspective. Their team provided exceptional transparency throughout the entire process, from vehicle selection through final delivery at Ports of Auckland. The Toyota Land Cruiser Prado arrived in perfect condition, exactly matching the detailed auction sheet and inspection reports. Their expertise in navigating New Zealand's import regulations saved me significant time and potential complications. The pricing was completely transparent with no hidden fees, and the communication was prompt and professional. I've since imported 12 additional vehicles through Tradeware and they've consistently delivered exceptional service. Their understanding of commercial vehicle requirements and ability to source quality vehicles at competitive prices makes them an invaluable partner for my business.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=92&w=1200",
  },
  {
    id: "2",
    customer: "Sarah Johnson",
    location: "Nairobi, Kenya",
    vehicle: "2019 Honda CR-V",
    rating: 5,
    story: "This was my first experience importing a vehicle, and I was understandably nervous about the entire process. Tradeware's team guided me through every step with remarkable patience and professionalism. They explained the auction grading system in detail, helped me understand the inspection reports, and provided honest recommendations about vehicle condition and value. The Honda CR-V I purchased exceeded my expectations in both condition and value. The entire process, from selection to delivery at Mombasa Port, was handled with remarkable efficiency. Their customer service team responded to all my questions within hours, even accounting for time zone differences. The vehicle arrived on schedule, and all original documents were delivered via DHL as promised. The quality of the vehicle was outstanding, far superior to what's typically available in the local market. I couldn't be happier with my purchase and will definitely use Tradeware for future imports.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=92&w=1200",
  },
  {
    id: "3",
    customer: "Michael Chen",
    location: "London, UK",
    vehicle: "2021 Nissan Patrol",
    rating: 5,
    story: "I've imported multiple vehicles through various companies over the years, but Tradeware stands out for their exceptional attention to detail and professional service. Their team personally inspected each vehicle in Yokohama and provided comprehensive condition reports that matched exactly what we received. The pricing was completely transparent with detailed cost breakdowns, and there were no surprises during the import process. Their expertise in handling EU compliance documentation, including type approval and emissions certification, was impressive. The Nissan Patrol arrived in perfect condition, and all documentation was properly authenticated for UK registration. The shipping process was seamless with real-time tracking updates, and the vehicle arrived at Southampton Port on schedule. Tradeware has become my preferred supplier for Japanese vehicle imports, and I've recommended them to several colleagues in the automotive business.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=92&w=1200",
  },
  {
    id: "4",
    customer: "Emma Williams",
    location: "Kampala, Uganda",
    vehicle: "2020 Mazda CX-5",
    rating: 5,
    story: "Tradeware's comprehensive verification service was truly a game-changer for my import experience. Getting a detailed inspection report with high-resolution photographs before purchase gave me complete confidence in my decision. The team arranged for additional photographs from specific angles I requested and provided expert advice on vehicle condition and value. The Mazda CX-5 arrived exactly as described in the inspection report, and the shipping was actually faster than initially estimated. The documentation package was flawless, making customs clearance in Kampala straightforward. Their customer service was outstanding throughout, with prompt responses to all inquiries and regular updates on the vehicle's status. The quality of the vehicle was exceptional, and the value compared to local options was significant. I'm extremely satisfied with the service and vehicle quality, and I'm already planning my next import through Tradeware.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=92&w=1200",
  },
  {
    id: "5",
    customer: "David O'Brien",
    location: "Dublin, Ireland",
    vehicle: "2019 Subaru Forester",
    rating: 5,
    story: "Tradeware's detailed cost calculator helped me budget accurately for my import, and I was pleased to find that the final cost matched the estimate perfectly with no hidden fees or surprise charges. The team was responsive to all my questions about Irish import regulations and provided detailed guidance on documentation requirements. They kept me updated throughout the shipping process with real-time tracking information, and the vehicle arrived at Dublin Port exactly on schedule. The Subaru Forester was in excellent condition, matching the auction description perfectly. All documentation was properly prepared for Irish registration, and the customs clearance process was smooth thanks to their meticulous paperwork. The entire experience was professional, transparent, and stress-free. I highly recommend Tradeware to anyone considering importing a vehicle from Japan to Ireland.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=92&w=1200",
  },
  {
    id: "6",
    customer: "Lisa Anderson",
    location: "Dar es Salaam, Tanzania",
    vehicle: "2021 Toyota RAV4",
    rating: 5,
    story: "I found my ideal vehicle through Tradeware's extensive inventory, and the entire import process exceeded my expectations. The auction sheet verification service provided complete peace of mind, with detailed condition assessments that accurately reflected the vehicle's actual condition. The team's expertise in Tanzanian import regulations was evident in how smoothly the customs clearance process went. The Toyota RAV4 arrived in perfect condition at Dar es Salaam Port, and all original documents were delivered promptly. The vehicle's quality was outstanding, and the value compared to local market options was exceptional. The communication throughout the process was excellent, with regular updates and prompt responses to all my questions. I'm extremely satisfied with both the vehicle and the service, and I'm already planning my next import through Tradeware. Their professionalism and attention to detail make them the obvious choice for Japanese vehicle imports.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=92&w=1200",
  },
];

const stats = [
  { value: "10,000+", label: "Satisfied Customers" },
  { value: "50,000+", label: "Vehicles Imported" },
  { value: "50+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
];

export default function SuccessStoriesPage() {
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storiesRef.current) {
      scrollReveal(storiesRef.current, slideUp, { delay: 0.3 });
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
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-gold-400" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Customer <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300">
              Real experiences from customers who successfully imported their dream vehicles from Japan
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black text-cyan-500 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Success Stories Grid */}
          <div ref={storiesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                className="card p-8 relative group"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -10, rotateY: 5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Quote className="h-10 w-10 text-gold-400/50 mb-4" />
                </motion.div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{story.story}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <div className="font-black text-white mb-1">{story.customer}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {story.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-cyan-500 mb-1">
                      <Car className="h-4 w-4" />
                      <span className="text-sm font-semibold">Imported</span>
                    </div>
                    <div className="text-sm text-gray-400">{story.vehicle}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <CTASection
            title="Ready to Create Your Success Story?"
            description="Join thousands of satisfied customers who have successfully imported their dream vehicles from Japan"
            primaryAction={{
              label: "Browse Vehicles",
              href: routes.inventory,
            }}
            secondaryAction={{
              label: "Get Started",
              href: routes.contact,
            }}
            variant="gradient"
          />
        </div>
      </div>
    </div>
  );
}
