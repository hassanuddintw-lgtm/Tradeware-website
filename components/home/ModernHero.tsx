"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { routes } from "@/config/routes";
import { prefersReducedMotion, imageParallax } from "@/lib/animations";
import { heroImages, heroVideoFallback } from "@/data/site-media";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ModernHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = prefersReducedMotion();
    const ease = reduced ? "power1.out" : "power4.out";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease } });

      // Background cinematic fade-in (subtle scale)
      if (bgRef.current && !reduced) {
        gsap.set(bgRef.current, { opacity: 0, scale: 1.08 });
        tl.to(bgRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: reduced ? 0.3 : 0.6 },
          reduced ? 0 : "-=0.6"
        );
      }

      // Title: split by lines (block spans), then words; 3D flip only when !reduced
      if (titleRef.current) {
        const existingSpans = titleRef.current.querySelectorAll("span:not(.hero-word)");
        if (existingSpans.length > 0) {
          existingSpans.forEach((span) => {
            const text = (span as HTMLElement).textContent || "";
            const words = text.split(" ").filter((w) => w.length > 0);
            if (words.length > 0) {
              (span as HTMLElement).innerHTML = words
                .map((w, i) =>
                  i < words.length - 1
                    ? `<span class="hero-word" style="display:inline-block;margin-right:0.3em;">${w}</span>`
                    : `<span class="hero-word" style="display:inline-block;">${w}</span>`
                )
                .join(" ");
            }
          });
        } else {
          const titleText = titleRef.current.textContent || "";
          const words = titleText.split(" ").filter((w) => w.length > 0);
          if (words.length > 0) {
            titleRef.current.innerHTML = words
              .map((w, i) =>
                i < words.length - 1
                  ? `<span class="hero-word" style="display:inline-block;margin-right:0.3em;">${w}</span>`
                  : `<span class="hero-word" style="display:inline-block;">${w}</span>`
              )
              .join(" ");
          }
        }
        const words = titleRef.current.querySelectorAll(".hero-word");
        if (words.length > 0) {
          if (reduced) {
            tl.set(words, { opacity: 1, y: 0, rotationX: 0 });
          } else {
            tl.fromTo(
              words,
              { opacity: 0, y: 36, rotationX: -88, transformOrigin: "50% 50% -20px" },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.3"
            );
          }
        }
      }

      // Description
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: reduced ? 0.25 : 0.65 },
          "-=0.35"
        );
      }

      // Buttons
      if (buttonsRef.current) {
        const btns = buttonsRef.current.querySelectorAll("a");
        if (reduced) {
          tl.set(btns, { opacity: 1, y: 0, scale: 1 });
        } else {
          tl.fromTo(
            btns,
            { opacity: 0, y: 16, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
            "-=0.25"
          );
        }
      }

      // Stats
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll("div");
        if (reduced) {
          tl.set(items, { opacity: 1, y: 0 });
        } else {
          tl.fromTo(
            items,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
            "-=0.2"
          );
        }
      }

      // Scroll hint: subtle bounce (loop when !reduced)
      if (scrollHintRef.current && !reduced) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.15"
        );
        gsap.to(scrollHintRef.current, {
          y: -6,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tl.duration() + 0.5,
        });
      }

      // Background parallax (desktop, !reduced)
      if (
        bgRef.current &&
        typeof window !== "undefined" &&
        window.innerWidth >= 1024 &&
        !reduced
      ) {
        imageParallax(bgRef.current, 0.25);
      }

      // Content parallax on scroll (!reduced)
      if (contentRef.current && !reduced) {
        gsap.to(contentRef.current, {
          y: 80,
          opacity: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center overflow-hidden bg-cinematic-base pt-14 md:pt-16" aria-labelledby="hero-heading">
      {/* Optional background video - cinematic, subtle visibility */}
      <div className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none z-0" aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=92"
        >
          <source src="https://cdn.coverr.co/videos/coverr-various-cars-driving-on-a-highway-4173710/4173710_preview.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Background image fallback / parallax layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${heroImages[0]})`,
        }}
        role="img"
        aria-label="Luxury cars and vehicle auction background"
      />
      {/* Overlay: darker left for text, gradient right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-cinematic-base via-cinematic-base/95 to-cinematic-base/70 z-[1] pointer-events-none"
        aria-hidden
      />

      <div ref={contentRef} className="container-custom relative z-10 w-full min-w-0">
        <div className="max-w-3xl">
          <div className="relative z-20 min-w-0">
            <div ref={eyebrowRef} className="eyebrow mb-3 md:mb-4">
              Premium Japanese Vehicle Imports Since 2010
            </div>

            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-[0.95] tracking-tight break-words hero-heading-shadow"
            >
              <span className="block text-white">Import Premium</span>
              <span className="block font-bold" style={{ color: "#00C8FF", textShadow: "0 0 32px rgba(0, 200, 255, 0.5)" }}>Japanese Vehicles</span>
              <span className="block text-white">Worldwide</span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-sm sm:text-base text-zinc-400 mb-4 md:mb-6 max-w-md leading-relaxed break-words"
            >
              Direct access to Japan's largest vehicle auction network with over 120 auction houses. We provide comprehensive import services including vehicle verification, transparent pricing, expert documentation handling, and global shipping to 50+ countries. Trusted by over 10,000 customers worldwide for reliable, professional Japanese vehicle imports.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 flex-wrap">
              <a href={routes.inventory} className="btn-primary btn-glow-pulse inline-flex items-center gap-1.5 cursor-pointer shrink-0 ring-2 ring-cyan-400/40 shadow-cyan-glow" data-gsap-button>
                Explore Stock <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
              <a href={routes.howItWorks} className="btn-secondary cursor-pointer shrink-0">How It Works</a>
            </div>
            <p className="text-[11px] sm:text-xs text-cyan-400/90 mt-2.5 max-w-md">
              Translated auction sheets &amp; official export handling.
            </p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-1.5 max-w-md">
              Export-only sales. Vehicles sold as-is from auction; no test drives.
            </p>

            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 2xl:gap-6 pt-4 mt-4 md:pt-6 md:mt-6 border-t border-white/[0.06]">
              {[
                { label: "Listings", value: "50K+" },
                { label: "Auctions", value: "120+" },
                { label: "Experience", value: "15Y" },
              ].map((stat, i) => (
                <div key={i} className="min-w-0">
                  <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video shows through from background */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 lg:bottom-6 lg:left-8 flex items-center gap-2 text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest z-10"
        aria-hidden
      >
        <span>Scroll</span>
        <span className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}
