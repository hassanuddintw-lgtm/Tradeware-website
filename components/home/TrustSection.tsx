"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Award, Shield, Globe, Sparkles } from "lucide-react";
import { sectionRevealPremium, staggerRevealPremium } from "@/lib/animations";
import { trustSectionImage, trustSectionImageLocal, heroImages } from "@/data/site-media";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustPoints = [
  "Member of 120+ Japanese auction houses",
  "Official export documentation provider",
  "Verified by Japan Export Vehicle Inspection Center (JEVIC)",
  "ISO certified quality management",
  "Secure payment processing",
  "Full insurance coverage available",
  "15+ years in business",
  "5,000+ successful exports",
];

const stats = [
  { label: "Auction Houses", value: "120+", icon: Award },
  { label: "Years of Trust", value: "15Y+", icon: Shield },
  { label: "Global Ports", value: "80+", icon: Globe },
  { label: "Happy Clients", value: "10K+", icon: Sparkles },
];

const trustImageCandidates = [trustSectionImageLocal, trustSectionImage, ...heroImages];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [trustImgSrc, setTrustImgSrc] = useState(trustImageCandidates[0]);
  const [trustImgIndex, setTrustImgIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        sectionRevealPremium(cardRef.current, { delay: 0 });
      }
      if (listRef.current) {
        staggerRevealPremium(listRef.current, "> *", {
          stagger: 0.06,
          delay: 0.1,
        });
      }
      if (statsGridRef.current) {
        staggerRevealPremium(statsGridRef.current, "> *", {
          stagger: 0.1,
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const content = (
    <>
      <section ref={sectionRef} className="section bg-transparent" aria-labelledby="trust-heading">
        <div className="container-custom">
          <div
            ref={cardRef}
            className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl md:rounded-3xl border border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_60px_-16px_rgba(6,182,212,0.12)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_12px_40px_-8px_rgba(0,0,0,0.5),0_0_72px_-12px_rgba(6,182,212,0.18)] hover:border-cyan-500/20 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 items-center">
              <div className="min-w-0 order-2 lg:order-1">
                <span className="eyebrow mb-3 block shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold">Verified Integrity</span>
                <h2 id="trust-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white mb-4 md:mb-5 tracking-tight leading-tight">
                  Absolute <span className="gradient-text gradient-text-glow">Certainty</span>
                </h2>
                <p className="text-zinc-400 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl break-words">
                  Every vehicle in our inventory undergoes rigorous multi-point inspection and certification from Japan&apos;s leading inspection authorities including JEVIC (Japan Export Vehicle Inspection Center). Our comprehensive verification process ensures complete transparency and confidence in every purchase. We maintain direct relationships with major Japanese auction houses, ensuring access to the finest vehicles available in the market. Our commitment to quality means we personally inspect each vehicle before purchase, verify all documentation, and provide detailed condition reports. With ISO-certified quality management systems, secure payment processing, and comprehensive insurance options, we provide the peace of mind that comes from working with an established, trusted partner in the Japanese vehicle export industry.
                </p>

                <ul
                  ref={listRef}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5"
                  role="list"
                >
                  {trustPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300 break-words min-w-0 py-1.5 pl-3 pr-2 rounded-lg border-l-2 border-transparent hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-200"
                      role="listitem"
                    >
                      <CheckCircle2 className="h-4 w-4 sm:h-4 sm:w-4 shrink-0 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={statsRef} className="order-1 lg:order-2 space-y-5">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 ring-1 ring-cyan-500/10 shadow-[0_0_40px_-12px_rgba(6,182,212,0.15)] group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trustImgSrc}
                    alt="Premium vehicles and auction quality"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() => {
                      const next = trustImgIndex + 1;
                      if (next < trustImageCandidates.length) {
                        setTrustImgSrc(trustImageCandidates[next]);
                        setTrustImgIndex(next);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" aria-hidden />
                </div>
                <div ref={statsGridRef} className="grid grid-cols-2 gap-3 sm:gap-4" role="list">
                  {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="card card-animate-hover p-4 sm:p-5 md:p-6 min-w-0 rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-500/25"
                        role="listitem"
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                          <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/20">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" aria-hidden="true" />
                          </span>
                          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words tracking-tight">{s.value}</div>
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-semibold text-cyan-400/95 uppercase tracking-widest break-words">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  return content;
}
