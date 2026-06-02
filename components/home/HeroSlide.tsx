"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { routes } from "@/config/routes";

interface HeroSlideItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  paragraph: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80",
    alt: "Luxury car",
    title: "Cars Delivered",
    subtitle: "Safely from Japan",
    paragraph: "From Japanese ports to your doorstep — every vehicle is inspected, insured, and shipped with full transparency. We connect you to 150+ auction houses and handle bidding, paperwork, and logistics so you get quality at the right price. Your trusted partner for premium vehicle imports worldwide.",
    ctaPrimary: "Browse Cars",
    ctaSecondary: "How It Works",
    ctaPrimaryHref: routes.inventory,
    ctaSecondaryHref: routes.about,
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80",
    alt: "Car on road",
    title: "Quality You Can Trust",
    subtitle: "Inspected & Ready to Ship",
    paragraph: "Every vehicle is graded, documented, and cleared for export. We make sure you know exactly what you're buying before it ships. Auction sheets, photos, and clear pricing — no surprises.",
    ctaPrimary: "View Inventory",
    ctaSecondary: "Contact Us",
    ctaPrimaryHref: routes.inventory,
    ctaSecondaryHref: routes.contact,
  },
  {
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
    alt: "Sports car",
    title: "Premium Japanese Cars",
    subtitle: "Direct from Auction",
    paragraph: "Access 150+ auction houses and thousands of vehicles updated weekly. Bid with confidence — we handle inspection, payment, and export logistics. Passenger cars, SUVs, trucks, and commercial vehicles.",
    ctaPrimary: "Explore Auctions",
    ctaSecondary: "Auction Guide",
    ctaPrimaryHref: routes.auction,
    ctaSecondaryHref: routes.about,
  },
  {
    src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1920&q=80",
    alt: "Car exterior",
    title: "Global Delivery",
    subtitle: "To Your Doorstep",
    paragraph: "We ship to 50+ countries. Whether you're in Africa, the Middle East, or the Americas — same quality, same trust, same process. Get a quote and we'll handle the rest.",
    ctaPrimary: "Browse Cars",
    ctaSecondary: "Destinations",
    ctaPrimaryHref: routes.inventory,
    ctaSecondaryHref: routes.destinations,
  },
  {
    src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1920&q=80",
    alt: "Japanese car",
    title: "Your Next Vehicle",
    subtitle: "Starts Here",
    paragraph: "Browse our live inventory, get a clear quote, and drive away with a vehicle that fits your budget and your standards. Expert support from search to delivery.",
    ctaPrimary: "Browse Cars",
    ctaSecondary: "Get a Quote",
    ctaPrimaryHref: routes.inventory,
    ctaSecondaryHref: routes.contact,
  },
];

const SLIDE_DURATION_MS = 5000;

interface HeroApi {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export default function HeroSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroFromApi, setHeroFromApi] = useState<HeroApi | null>(null);

  useEffect(() => {
    fetch("/api/content/hero")
      .then((res) => res.json())
      .then((json: { data?: HeroApi }) => {
        const d = json?.data;
        if (d && typeof d === "object" && (d.title || d.subtitle)) setHeroFromApi(d);
      })
      .catch(() => {});
  }, []);

  const displaySlides = useMemo((): HeroSlideItem[] => {
    if (!heroFromApi?.title && !heroFromApi?.subtitle) return HERO_SLIDES;
    return HERO_SLIDES.map((slide, i) =>
      i === 0
        ? { ...slide, title: heroFromApi.title ?? slide.title, subtitle: heroFromApi.subtitle ?? slide.subtitle }
        : slide
    );
  }, [heroFromApi]);

  const activeSlide = displaySlides[activeIndex];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % displaySlides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [displaySlides.length]);

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] flex flex-col justify-center pb-6 sm:pb-8 md:pb-10 pt-8 sm:pt-10 md:pt-12 overflow-hidden">
      {/* Background slider */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === activeIndex ? 1 : 0, zIndex: 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}
      {/* Blur layer so content is readable */}
      <div className="absolute inset-0 backdrop-blur-[6px] bg-slate-900/25 z-[1]" aria-hidden />
      {/* Gradient overlay left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/40 to-transparent z-[2]" aria-hidden />

      <div className="container-custom relative z-10 flex flex-col justify-center h-full">
        <div className="container-custom max-w-2xl">
          <h1 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{activeSlide.title}</span>
            <br />
            <span className="text-red-400 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">{activeSlide.subtitle}</span>
          </h1>
          {activeSlide.paragraph && (
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] max-w-xl leading-relaxed">
              {activeSlide.paragraph}
            </p>
          )}
          <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
            <Link
              href={activeSlide.ctaPrimaryHref ?? routes.inventory}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/25 hover:bg-red-700 transition-colors"
            >
              {activeSlide.ctaPrimary ?? "Browse Cars"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={activeSlide.ctaSecondaryHref ?? routes.about}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <PlayCircle className="h-4 w-4" />
              {activeSlide.ctaSecondary ?? "How It Works"}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-red-500" : "w-1.5 bg-white/50 hover:bg-white/70"}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
