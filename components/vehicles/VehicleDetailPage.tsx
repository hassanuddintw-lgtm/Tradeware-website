"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Vehicle } from "@/types";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { MapPin, Calendar, Gauge, Fuel, Settings, Award, FileText, Download, ArrowLeft, Phone, Mail, Share2, Heart, CheckCircle2, ShieldCheck, Globe } from "lucide-react";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VehicleDetailPageProps {
  vehicle: Vehicle;
}

export default function VehicleDetailPage({ vehicle }: VehicleDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (galleryRef.current) {
      fadeIn(galleryRef.current, { delay: 0.2 });
    }
    if (titleRef.current) {
      scrollReveal(titleRef.current, slideUp, { delay: 0.3 });
    }
    if (specsRef.current) {
      scrollReveal(specsRef.current, slideUp, { delay: 0.4 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 pb-16 relative overflow-hidden">
      <div className="atmospheric-glow w-[600px] h-[600px] bg-cyan-500/10 top-0 left-0 blur-[120px]" />
      <div className="atmospheric-glow w-[500px] h-[500px] bg-purple-500/5 bottom-0 right-0 blur-[100px]" />

      <div className="container-custom relative z-10">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            <div ref={galleryRef} className="card group overflow-hidden border border-white/5 bg-white/5 rounded-[2rem]">
              <div className="relative h-[500px] bg-zinc-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={vehicle.images[selectedImage] || vehicle.images[0]}
                      alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - Premium Japanese vehicle available for export`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" aria-hidden="true" />

                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] font-body">
                    {vehicle.year}
                  </span>
                  <span className="px-5 py-2 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] font-body">
                    Grade {vehicle.auctionGrade}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <motion.button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isFavorite ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-black/60 backdrop-blur-xl border border-white/10 text-gray-400 hover:text-white"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-gray-400 hover:text-white flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {vehicle.images.length > 1 && (
                <div className="p-6 grid grid-cols-5 md:grid-cols-8 gap-4 border-t border-white/5 bg-black/20">
                  {vehicle.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-zinc-800 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index ? "border-cyan-500 shadow-xl shadow-cyan-500/20" : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image}
                        alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Title Section */}
            <div ref={titleRef}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-[1px] bg-cyan-500" />
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest font-body">{vehicle.make} Masterpiece</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter font-display leading-none">
                    {vehicle.model}
                  </h1>
                  <div className="flex items-center gap-6 mt-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-body">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-500/50" />
                      <span>Located in {vehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-cyan-500/50" />
                      <span>Stock ID: {vehicle.stockId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 font-body">ESTIMATED EX-WORKS</div>
                  <div className="text-4xl md:text-6xl font-black text-white font-display italic">
                    {formatCurrency(vehicle.price.fob)}
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Grid */}
            <div ref={specsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Calendar, label: "Model Year", value: vehicle.year },
                { icon: Gauge, label: "Total Mileage", value: `${formatMileage(vehicle.mileage)} KM` },
                { icon: Settings, label: "Transmission", value: vehicle.transmission },
                { icon: Fuel, label: "Architecture", value: `${vehicle.engine.displacement} ${vehicle.engine.fuel}` },
              ].map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className="h-6 w-6 text-cyan-500/50 group-hover:text-cyan-500 transition-colors mb-4" />
                    <div>
                      <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1 font-body">{spec.label}</div>
                      <div className="font-black text-white text-lg tracking-tight font-display">{spec.value}</div>
                    </div>
                    <div className="mt-4 h-[1px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-500" />
                  </motion.div>
                );
              })}
            </div>

            {/* Description & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest font-display italic underline decoration-cyan-500/20 underline-offset-8">Vehicle Description</h2>
                <p className="text-gray-400 leading-relaxed text-lg font-body font-medium">{vehicle.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest font-display italic underline decoration-cyan-500/20 underline-offset-8">Key Features & Equipment</h2>
                <div className="grid grid-cols-1 gap-4">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:w-4 transition-all duration-500" />
                      <span className="text-gray-300 font-bold uppercase tracking-widest text-[10px] font-body">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Documents */}
            <motion.div
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-black text-white mb-8 font-display italic">OFFICIAL DOCUMENTATION</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicle.auctionSheet && (
                  <Link href={vehicle.auctionSheet} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-cyan-500/50 hover:bg-black/60 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest font-body">Auction Certificate</span>
                    </div>
                    <Download className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </Link>
                )}
                {vehicle.inspectionReport && (
                  <Link href={vehicle.inspectionReport} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-cyan-500/50 hover:bg-black/60 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest font-body">Precision Report</span>
                    </div>
                    <Download className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase CTA */}
            <motion.div
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 sticky top-28 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-black text-white mb-8 font-display tracking-tight">Purchase Information</h3>

              <div className="space-y-8 mb-10">
                <div className="p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="text-[10px] font-black text-cyan-500/50 uppercase tracking-widest mb-1 font-body">FOB Price (Free On Board)</div>
                  <div className="text-4xl font-black text-cyan-400 font-display italic">
                    {formatCurrency(vehicle.price.fob)}
                  </div>
                </div>

                {vehicle.price.cif && (
                  <div className="px-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-body">CIF Estimate</span>
                      <span className="text-xl font-black text-white font-display italic">{formatCurrency(vehicle.price.cif)}</span>
                    </div>
                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest font-body leading-relaxed">
                      CIF (Cost, Insurance & Freight) includes vehicle price, ocean freight, marine insurance, and all export documentation. Final destination costs (customs duties, taxes, port charges) are additional and vary by country.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Link href={routes.contact} className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center text-sm cursor-pointer">
                  Request Purchase Information
                </Link>
                <Link href={`${routes.contact}?vehicle=${vehicle.id}`} className="w-full btn-secondary py-5 rounded-2xl flex items-center justify-center text-sm cursor-pointer">
                  Ask Questions About This Vehicle
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest font-body">Global Logistics Available</span>
              </div>
            </motion.div>

            {/* Assistance */}
            <motion.div
              className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-black text-white mb-4 font-display italic">CONCIERGE</h3>
              <p className="text-xs text-gray-400 mb-8 font-body font-medium leading-relaxed">
                Our experienced team is available to provide detailed information about this vehicle, answer questions about condition and specifications, assist with purchase decisions, and guide you through the import process. Contact us for personalized assistance with this specific vehicle or to discuss your import requirements.
              </p>

              <div className="space-y-4">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                    <Phone className="h-4 w-4 text-cyan-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase font-body tracking-widest">{siteConfig.contact.phone}</span>
                </a>
                {siteConfig.contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                      <Mail className="h-4 w-4 text-cyan-500" />
                    </div>
                    <span className="text-[10px] font-black uppercase font-body tracking-widest break-all">{email}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
