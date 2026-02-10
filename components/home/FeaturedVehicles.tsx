"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vehicles } from "@/data/vehicles";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { routes } from "@/config/routes";
import { staggerRevealPremium, imageParallax } from "@/lib/animations";
import { ArrowRight, MapPin, Zap, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedVehicles() {
  const featured = vehicles.slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      const title = sectionRef.current?.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Stagger reveal for vehicle cards
      staggerRevealPremium(gridRef.current, "> *", {
        stagger: 0.1,
        delay: 0.1,
      });

      // Parallax for images (only on desktop and if motion is not reduced)
      if (gridRef.current && window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const images = gridRef.current.querySelectorAll("img");
        images.forEach((img) => {
          imageParallax(img, 0.2);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section-elevated relative" aria-labelledby="featured-vehicles-heading">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-5 md:mb-6">
          <div className="max-w-2xl min-w-0">
            <span className="eyebrow mb-2 block">Premium Inventory</span>
            <h2 id="featured-vehicles-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
              Featured <span className="gradient-text">Vehicles</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm md:text-base break-words">
              Our curated selection represents the finest Japanese vehicles available through our extensive auction network. Each vehicle has been personally inspected by our team in Yokohama, verified for condition, and thoroughly documented. We source vehicles from Japan's most reputable auction houses, ensuring quality, authenticity, and value. From luxury sedans to rugged SUVs, commercial vans to compact cars, our inventory spans all categories to meet diverse customer needs across global markets.
            </p>
          </div>
          <Link
            href={routes.inventory}
            data-gsap-button
            className="btn-secondary inline-flex items-center gap-2 self-start md:self-auto cursor-pointer shrink-0"
            aria-label="View all vehicles in our inventory"
          >
            View All <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 2xl:gap-6"
          role="list"
        >
          {featured.map((vehicle) => (
            <article key={vehicle.id} role="listitem">
              <Link
                href={routes.vehicleDetail(vehicle.id)}
                className="card card-cinematic card-animate-hover group block h-full overflow-hidden min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 cursor-pointer transition-all duration-500 active:scale-[0.99]"
                aria-label={`View details for ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              >
                <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - Premium Japanese vehicle available for export`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

                  <span className="absolute top-3 left-3 rounded-md bg-cyan-500 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-black">
                    Grade {vehicle.auctionGrade}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[11px] text-white/90">{vehicle.year}</span>
                </div>

                <div className="p-3 sm:p-4 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-0.5 group-hover:text-cyan-400 transition-colors">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-2.5">
                    <MapPin className="h-3 w-3 text-cyan-500/80" />
                    {vehicle.location}
                  </div>

                  <div className="flex gap-3 mb-2.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-cyan-500/70" />
                      <span className="text-zinc-400">{vehicle.engine.displacement}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3 w-3 text-cyan-500/70" />
                      <span className="text-zinc-400">{formatMileage(vehicle.mileage)} km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className="text-base font-semibold text-white">
                      {formatCurrency(vehicle.price.fob, vehicle.price.currency)}
                    </span>
                    <span className="rounded-full border border-white/10 p-1.5 text-cyan-400 transition-colors group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
