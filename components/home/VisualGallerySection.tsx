"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryImages, homePageVideos, heroImages } from "@/data/site-media";
import { sectionHeaderReveal, staggerRevealDramatic } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VisualGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) sectionHeaderReveal(titleRef.current, { y: 36 });
      if (gridRef.current) {
        staggerRevealDramatic(gridRef.current, ".gallery-item", { stagger: 0.1, y: 48 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-transparent py-12 md:py-16" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <h2 id="gallery-heading" ref={titleRef} className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
          Premium <span className="gradient-text gradient-text-glow">Vehicles &amp; Auctions</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.slice(0, 8).map((item, i) => (
            <div key={i} className="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden card-cinematic border border-white/10 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).src = heroImages[0]; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
          <div className="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden card-cinematic card-animate-hover border border-white/10 group col-span-2 sm:col-span-1">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              poster={heroImages[0]}
            >
              <source src={homePageVideos[0]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[10px] sm:text-xs text-white/90 font-medium uppercase tracking-wider">Live auction access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
