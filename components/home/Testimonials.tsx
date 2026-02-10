"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/testimonials";
import { Star, Quote } from "lucide-react";
import { sectionRevealPremium, staggerRevealPremium } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        sectionRevealPremium(headerRef.current, { delay: 0 });
      }

      // Testimonials stagger reveal
      if (gridRef.current) {
        staggerRevealPremium(gridRef.current, "> *", {
          stagger: 0.1,
          delay: 0.1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-transparent" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-6 md:mb-8 px-1">
          <span className="eyebrow mb-2 block">Customer Success Stories</span>
          <h2 id="testimonials-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
            Trusted by <span className="gradient-text">Customers Worldwide</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm md:text-base break-words">
            Our reputation is built on the satisfaction of over 10,000 customers across 50+ countries. From individual buyers to fleet operators, from first-time importers to seasoned professionals, our clients consistently praise our transparency, professionalism, and commitment to delivering quality vehicles. Read authentic testimonials from customers who have experienced the Tradeware difference - from seamless transactions to exceptional vehicle quality to outstanding customer service.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 2xl:gap-5"
          role="list"
        >
          {testimonials.slice(0, 6).map((t) => (
            <article key={t.id} className="group card card-cinematic card-animate-hover p-3 sm:p-4 md:p-5 min-w-0 transition-all duration-500" role="listitem">
              <div className="flex gap-0.5 mb-2" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${i < t.rating ? "fill-cyan-500/80 text-cyan-500/80" : "text-white/10"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500/20 mb-2 shrink-0" aria-hidden="true" />
              <blockquote className="text-zinc-300 leading-relaxed mb-3 md:mb-4 text-xs sm:text-sm break-words">"{t.comment}"</blockquote>
              <div className="flex items-center gap-2.5 pt-2.5 md:pt-3 border-t border-white/[0.06] min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-semibold text-[11px] sm:text-xs shrink-0" aria-hidden="true">
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{t.name}</div>
                  <div className="text-[11px] text-zinc-500 truncate">{t.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
