"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Clock, Gavel, TrendingUp, AlertCircle, Calendar, MapPin, Car, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Zap, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { fadeIn, sectionReveal } from "@/lib/animations";
import { auctionListingsDemo, type AuctionListing } from "@/data/live-auction-demo";
import Accordion from "@/components/ui/Accordion";
import { buyerQuestions } from "@/data/buyerQuestions";
import { carBrands } from "@/data/car-brands";
import { heroImages, heroVideoFallback } from "@/data/site-media";

// Fallback when API/DB returns no image URL (e.g. real Japan API or empty DB field)
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LiveAuction = { id: string; name: string; timeRemaining: string; vehicles: number; status: string };
type UpcomingAuction = { id: string; name: string; date: string; time: string; location: string; vehicles: number; status: string };

export default function LiveAuctionsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const liveSectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const upcomingSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const liveScrollRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const upcomingScrollRef = useRef<HTMLDivElement>(null);

  const [liveAuctions, setLiveAuctions] = useState<LiveAuction[]>([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState<UpcomingAuction[]>([]);
  const [auctionListings, setAuctionListings] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const liveDemo = useMemo(() => [
    { id: "live-1", name: "USS Nagoya Live", timeRemaining: "2h 15m", vehicles: 450, status: "live" },
    { id: "live-2", name: "USS Tokyo Live", timeRemaining: "4h 30m", vehicles: 820, status: "live" },
    { id: "live-3", name: "Aucnet Live", timeRemaining: "1h 45m", vehicles: 390, status: "live" },
  ], []);
  const upcomingDemo = useMemo(() => [
    { id: "1", name: "USS Tokyo Weekly Auction", date: "2026-02-05", time: "10:00 JST", location: "Tokyo, Japan", vehicles: 1250, status: "upcoming" },
    { id: "2", name: "Aucnet Monthly Special", date: "2026-02-10", time: "14:00 JST", location: "Yokohama, Japan", vehicles: 850, status: "upcoming" },
    { id: "3", name: "USS Osaka Premium Sale", date: "2026-02-15", time: "11:00 JST", location: "Osaka, Japan", vehicles: 920, status: "upcoming" },
  ], []);

  const fetchJapanAuctions = useCallback(async (signal?: { cancelled: boolean }) => {
    const t = Date.now();
    try {
      const [liveRes, upcomingRes, listingsRes] = await Promise.all([
        fetch(`/api/auctions/japan/live?_=${t}`, { cache: "no-store", headers: { Pragma: "no-cache", "Cache-Control": "no-cache" } }),
        fetch(`/api/auctions/japan/upcoming?_=${t}`, { cache: "no-store", headers: { Pragma: "no-cache", "Cache-Control": "no-cache" } }),
        fetch(`/api/auctions/japan/listings?_=${t}`, { cache: "no-store", headers: { Pragma: "no-cache", "Cache-Control": "no-cache" } }),
      ]);
      if (signal?.cancelled) return;
      const liveData = liveRes.ok ? await liveRes.json() : null;
      const upcomingData = upcomingRes.ok ? await upcomingRes.json() : null;
      const listingsData = listingsRes.ok ? await listingsRes.json() : null;
      if (Array.isArray(liveData) && liveData.length > 0) setLiveAuctions(liveData);
      else setLiveAuctions(liveDemo);
      if (Array.isArray(upcomingData) && upcomingData.length > 0) setUpcomingAuctions(upcomingData);
      else setUpcomingAuctions(upcomingDemo);
      if (Array.isArray(listingsData) && listingsData.length > 0) setAuctionListings(listingsData);
      if (!signal?.cancelled) setLastUpdated(new Date());
    } catch {
      if (!signal?.cancelled) {
        setLiveAuctions(liveDemo);
        setUpcomingAuctions(upcomingDemo);
        setAuctionListings(auctionListingsDemo);
      }
    } finally {
      if (!signal?.cancelled) setLoading(false);
    }
  }, [liveDemo, upcomingDemo]);

  useEffect(() => {
    const signal = { cancelled: false };
    fetchJapanAuctions(signal);
    return () => { signal.cancelled = true; };
  }, [fetchJapanAuctions]);

  // Automatic live data: har 2–4 sec fresh data, cache-bust se hamesha naya response
  useEffect(() => {
    const pollLive = () => {
      fetch(`/api/auctions/japan/live?_=${Date.now()}`, { cache: "no-store", headers: { Pragma: "no-cache" } })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setLiveAuctions(data);
            setLastUpdated(new Date());
          }
        })
        .catch(() => {});
    };
    const pollListings = () => {
      fetch(`/api/auctions/japan/listings?_=${Date.now()}`, { cache: "no-store", headers: { Pragma: "no-cache" } })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setAuctionListings(data);
            setLastUpdated(new Date());
          }
        })
        .catch(() => {});
    };
    const pollUpcoming = () => {
      fetch(`/api/auctions/japan/upcoming?_=${Date.now()}`, { cache: "no-store", headers: { Pragma: "no-cache" } })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setUpcomingAuctions(data);
            setLastUpdated(new Date());
          }
        })
        .catch(() => {});
    };
    pollLive();
    pollListings();
    pollUpcoming();
    const tLive = setInterval(pollLive, 2000);
    const tListings = setInterval(pollListings, 2000);
    const tUpcoming = setInterval(pollUpcoming, 4000);
    return () => {
      clearInterval(tLive);
      clearInterval(tListings);
      clearInterval(tUpcoming);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) fadeIn(headerRef.current, { delay: 0.2 });
    if (liveSectionRef.current) sectionReveal(liveSectionRef.current, { delay: 0.25, y: 40 });
    if (featuredRef.current) sectionReveal(featuredRef.current, { delay: 0.3, y: 40 });
    if (listingsRef.current) sectionReveal(listingsRef.current, { delay: 0.35, y: 40 });
    if (upcomingSectionRef.current) sectionReveal(upcomingSectionRef.current, { delay: 0.4, y: 40 });
    if (howItWorksRef.current) sectionReveal(howItWorksRef.current, { delay: 0.5, y: 40 });
    return () => { ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, []);

  const scrollLive = (dir: number) => {
    if (!liveScrollRef.current) return;
    const w = liveScrollRef.current.offsetWidth;
    liveScrollRef.current.scrollBy({ left: dir * w * 0.8, behavior: "smooth" });
  };
  const scrollFeatured = useCallback((dir: number) => {
    if (!featuredScrollRef.current) return;
    const w = featuredScrollRef.current.offsetWidth;
    featuredScrollRef.current.scrollBy({ left: dir * (w * 0.6), behavior: "smooth" });
  }, []);
  const scrollUpcoming = (dir: number) => {
    if (!upcomingScrollRef.current) return;
    const w = upcomingScrollRef.current.offsetWidth;
    upcomingScrollRef.current.scrollBy({ left: dir * w * 0.8, behavior: "smooth" });
  };

  const [featuredAutoplayPaused, setFeaturedAutoplayPaused] = useState(false);
  // Auto-slide Featured Auction Picks: scroll right every 4s, loop to start when at end
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (featuredAutoplayPaused) return;
    const intervalMs = 4000;
    const t = setInterval(() => {
      const el = featuredScrollRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, offsetWidth } = el;
      const maxScroll = scrollWidth - offsetWidth;
      if (maxScroll <= 0) return;
      if (scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: offsetWidth * 0.6, behavior: "smooth" });
      }
    }, intervalMs);
    return () => clearInterval(t);
  }, [featuredAutoplayPaused]);

  const featuredListings = auctionListings.slice(0, 8);

  return (
    <div className="min-h-screen bg-cinematic-base py-16 pt-20 relative overflow-hidden">
      {/* Hero-style background video + image fallback */}
      <div className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-0" aria-hidden>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster={heroImages[0]}>
          <source src={heroVideoFallback} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 pointer-events-none z-0" style={{ backgroundImage: `url(${heroImages[0]})` }} role="img" aria-hidden />
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none bg-cinematic-gradient z-[1]" />
      <div className="container-custom relative z-10">
        {/* Car Brands Marquee – Glass blur + animations */}
        <motion.div
          className="mb-10 overflow-hidden rounded-2xl marquee-glass-panel relative"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Popular Brands</span>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="marquee-brands-track flex w-max items-center gap-8 py-4 px-2">
            {[...carBrands.slice(0, 24), ...carBrands.slice(0, 24)].map((brand, i) => (
              <motion.div
                key={`${brand.slug}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.015 * (i % 24), duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  href={`${routes.inventory}?make=${encodeURIComponent(brand.name)}`}
                  className="brand-logo-glass flex shrink-0 items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl group cursor-pointer"
                  title={`View ${brand.name} cars`}
                  prefetch={false}
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/8 group-hover:via-cyan-500/4 group-hover:to-cyan-500/8 transition-all duration-300 pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logoUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fb = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                  <span className="hidden relative z-10 w-10 h-10 sm:w-12 sm:h-12 items-center justify-center text-sm font-bold text-cyan-400" aria-hidden>
                    {brand.name.charAt(0)}
                  </span>
                </Link>
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-8 md:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Live Auctions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-5 tracking-tight hero-heading-shadow">
            Japanese Car <span className="gradient-text hero-heading-gradient-glow gradient-text-glow">Auctions</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-1">
            Access real-time Japanese vehicle auctions. Bid on premium cars directly from Japan&apos;s largest auction houses.
          </p>
        </motion.div>

        {/* Live Auctions Slider */}
        <div ref={liveSectionRef} className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
              <h2 className="text-2xl md:text-3xl font-black text-white">Live Now</h2>
              {lastUpdated && (
                <span className="text-zinc-500 text-sm font-medium">
                  Updated {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollLive(-1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollLive(1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div
            ref={liveScrollRef}
            className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {liveAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                className="flex-shrink-0 w-[min(100%,320px)] sm:w-[340px] snap-center"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
              >
                <Link
                  href={routes.inventory}
                  className="block card p-6 border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent relative overflow-hidden group hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full animate-pulse shadow-lg shadow-red-500/40">
                      LIVE
                    </span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-red-500/20">
                        <Gavel className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-black text-white">{auction.name}</h3>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Clock className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-semibold">{auction.timeRemaining} remaining</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Car className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">{auction.vehicles} vehicles available</span>
                      </div>
                    </div>
                    <span className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      View Vehicles
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Vehicles Slider */}
        <div ref={featuredRef} className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-cyan-400" />
              Featured <span className="gradient-text">Auction Picks</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollFeatured(-1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollFeatured(1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          <div
            ref={featuredScrollRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setFeaturedAutoplayPaused(true)}
            onMouseLeave={() => setFeaturedAutoplayPaused(false)}
          >
            {loading && auctionListings.length === 0 ? (
              <div className="flex items-center justify-center min-w-[260px] text-zinc-500 py-8">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : null}
            {featuredListings.map((row, i) => (
              <motion.a
                key={row.lot}
                href={`${routes.inventory}?make=${encodeURIComponent(row.make)}&model=${encodeURIComponent(row.model)}`}
                className="flex-shrink-0 w-[220px] sm:w-[260px] snap-center group"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="card overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="relative h-32 sm:h-36 overflow-hidden">
                    <Image
                      src={row.image || PLACEHOLDER_IMAGE}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="260px"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src !== PLACEHOLDER_IMAGE) t.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-cyan-500/90 text-black text-[10px] font-bold rounded">
                      ${(row.soldPrice / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-white text-sm truncate">{row.make} {row.model}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{row.year} · {row.auction}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Vehicle Listings (Demo – jpcenter-style) */}
        <div ref={listingsRef} className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Auction <span className="gradient-text">Listings</span>
            </h2>
            <span className="text-sm text-zinc-500">
              {auctionListings.length} vehicles
            </span>
          </div>

          {/* Mobile: card grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {auctionListingsDemo.slice(0, 12).map((row) => (
              <a
                key={row.lot}
                href={`${routes.inventory}?make=${encodeURIComponent(row.make)}&model=${encodeURIComponent(row.model)}`}
                className="card p-4 flex gap-3 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer"
              >
                <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-white/5 shrink-0">
                  <Image
                    src={row.image || PLACEHOLDER_IMAGE}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (t.src !== PLACEHOLDER_IMAGE) t.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-sm truncate">{row.make} {row.model}</p>
                  <p className="text-zinc-500 text-xs">{row.year} · {row.auction}</p>
                  <p className="text-cyan-400 font-semibold text-sm mt-1">${(row.soldPrice / 1000).toFixed(1)}k</p>
                </div>
              </a>
            ))}
          </div>

          {/* Desktop: table with hover row glow */}
          <div className="hidden lg:block rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-xl shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.06]">
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Photo</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Lot</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Make / Model</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Year</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Auction</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Date</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Mileage</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Engine</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Start</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Sold</th>
                    <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Live</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionListings.map((row, idx) => (
                    <motion.tr
                      key={row.id ?? row.lot}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 * Math.min(idx, 20), duration: 0.4, ease: "easeOut" }}
                      className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors duration-300"
                    >
                      <td className="px-3 py-2">
                        <div className="relative w-16 h-10 rounded overflow-hidden bg-white/5 shrink-0">
                          <Image
                            src={row.image || PLACEHOLDER_IMAGE}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                            onError={(e) => {
                              const t = e.currentTarget;
                              if (t.src !== PLACEHOLDER_IMAGE) t.src = PLACEHOLDER_IMAGE;
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <a href={`${routes.inventory}?make=${encodeURIComponent(row.make)}&model=${encodeURIComponent(row.model)}`} className="text-cyan-400 hover:text-cyan-300 font-mono text-xs cursor-pointer">
                          {row.lot}
                        </a>
                      </td>
                      <td className="px-3 py-2">
                        <span className="font-semibold text-white text-sm">{row.make}</span>
                        <br />
                        <span className="text-zinc-500 text-xs">{row.model}</span>
                      </td>
                      <td className="px-3 py-2 text-zinc-400 text-sm">{row.year}</td>
                      <td className="px-3 py-2 text-zinc-400 text-xs">{row.auction}</td>
                      <td className="px-3 py-2 text-zinc-500 text-xs">{row.date}</td>
                      <td className="px-3 py-2 text-zinc-400 text-xs">{row.mileage.toLocaleString()} km</td>
                      <td className="px-3 py-2 text-zinc-500 text-xs max-w-[100px] truncate">{row.engine}</td>
                      <td className="px-3 py-2 text-zinc-500 text-xs">${(row.startPrice / 1000).toFixed(0)}k</td>
                      <td className="px-3 py-2">
                        <span className="text-cyan-400 font-semibold text-sm">${(row.soldPrice / 1000).toFixed(1)}k</span>
                      </td>
                      <td className="px-3 py-2">
                        {row.id ? (
                          <Link href={routes.auctionRoom(row.id)} className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-medium">
                            <Gavel className="h-3.5 w-3.5" /> Watch
                          </Link>
                        ) : (
                          <span className="text-zinc-600 text-xs">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Listings from live API (when <code className="text-zinc-400">JAPAN_AUCTION_API_URL</code> or <code className="text-zinc-400">JAPAN_AUCTION_AVTOJP_CODE</code> is set), otherwise from database or demo. Browse inventory and place bids via <a href={routes.inventory} className="text-cyan-400 hover:underline cursor-pointer">Inventory</a>. &quot;Watch&quot; opens the real-time auction room for DB listings.
          </p>
        </div>

        {/* Upcoming Auctions Slider */}
        <div ref={upcomingSectionRef} className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Calendar className="h-7 w-7 text-cyan-400" />
              Upcoming <span className="gradient-text">Auctions</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollUpcoming(-1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollUpcoming(1)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div
            ref={upcomingScrollRef}
            className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading && upcomingAuctions.length === 0 ? (
              <div className="flex items-center justify-center min-w-[320px] gap-2 text-zinc-500 py-8">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading upcoming…</span>
              </div>
            ) : null}
            {upcomingAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                className="flex-shrink-0 w-[min(100%,320px)] sm:w-[340px] snap-center"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.06, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
              >
                <Link
                  href={routes.inventory}
                  className="block card p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">{auction.name}</h3>
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Calendar className="h-4 w-4 text-cyan-500/80" />
                      <span className="text-sm">{auction.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock className="h-4 w-4 text-cyan-500/80" />
                      <span className="text-sm">{auction.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin className="h-4 w-4 text-cyan-500/80" />
                      <span className="text-sm truncate">{auction.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Car className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-semibold">{auction.vehicles} vehicles</span>
                    </div>
                  </div>
                  <span className="btn-secondary w-full text-center inline-flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Bid Through Tradeware */}
        <motion.div
          className="card p-6 md:p-8 mb-10 md:mb-14 lg:mb-16 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-black text-white mb-3">Why Bid Through Tradeware</h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
                We bid at real Japanese auctions (USS, TAA, and 120+ houses) on your behalf. You get translated auction sheets and grades (e.g. 4.5B, 5) so you know exactly what you&apos;re buying. We inspect when needed, handle JEVIC and export paperwork, and ship from Japan to your port. No language barrier, no hidden fees—just a single expert team that has done this for 15+ years and 10,000+ vehicles.
              </p>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                Proxy bidding, transparent grading, and full export support—so you can bid with the same confidence as a local dealer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Common Buyer Questions (Answered Simply) */}
        <motion.div
          className="card p-6 md:p-8 mb-10 md:mb-14 lg:mb-16 border border-white/10 bg-white/[0.03]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Common Buyer Questions <span className="text-zinc-500 font-normal">(Answered Simply)</span></h2>
          <p className="text-zinc-500 text-sm mb-6">Straight answers about condition, pricing, and process—no sales talk.</p>
          <Accordion
            items={buyerQuestions.map((q) => ({
              id: q.id,
              title: q.question,
              content: <span className="text-zinc-400 text-sm leading-relaxed">{q.answer}</span>,
            }))}
            allowMultiple
          />
        </motion.div>

        {/* Common Beginner Misunderstandings */}
        <motion.div
          className="card p-6 md:p-8 mb-10 md:mb-14 lg:mb-16 border border-white/10 bg-white/[0.03]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Common Beginner Misunderstandings</h2>
          <p className="text-zinc-500 text-sm mb-4">A few things that help set the right expectations.</p>
          <ul className="space-y-2 text-zinc-400 text-sm leading-relaxed list-none">
            <li className="flex items-start gap-2"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">·</span> Auctions are not retail listings—they are wholesale marketplaces where buyers bid.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">·</span> Grades describe condition, not perfection; we translate and explain what they mean.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">·</span> Bidding is strategic, not instant buying—you set a limit and we bid on your behalf.</li>
            <li className="flex items-start gap-2"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">·</span> Expert guidance replaces showroom inspection; we provide documentation and clarity instead.</li>
          </ul>
        </motion.div>

        {/* What You Control vs What We Handle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-14 lg:mb-16">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 tracking-tight">What You Control</h3>
            <ul className="space-y-2 text-zinc-400 text-sm leading-relaxed list-none">
              <li className="flex items-start gap-2">· Budget & bidding limit</li>
              <li className="flex items-start gap-2">· Final approval before deposit</li>
              <li className="flex items-start gap-2">· Destination & preferences</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 tracking-tight">What We Handle</h3>
            <ul className="space-y-2 text-zinc-400 text-sm leading-relaxed list-none">
              <li className="flex items-start gap-2">· Auction monitoring & bidding</li>
              <li className="flex items-start gap-2">· Translation & explanation</li>
              <li className="flex items-start gap-2">· Export & shipping paperwork</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div ref={howItWorksRef} className="card p-8 md:p-10 mb-10 md:mb-14 lg:mb-16 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10 text-center">How Auction Bidding Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { step: "1", title: "Browse Auctions", description: "View upcoming and live auctions with detailed vehicle listings and auction sheets.", icon: Gavel },
              { step: "2", title: "Place Your Bid", description: "Submit your maximum bid through our platform. We'll bid on your behalf up to your limit.", icon: TrendingUp },
              { step: "3", title: "Win & Import", description: "If you win, we handle all paperwork, shipping, and import procedures for you.", icon: Car },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-2xl font-black mb-4 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auction Access Expectations */}
        <motion.div
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 tracking-tight">Auction Access Expectations</h3>
          <p className="text-zinc-500 text-xs md:text-sm mb-4 leading-relaxed">What to expect when you request access: verification, then full support through bidding and export.</p>
          <ul className="space-y-1.5 text-zinc-400 text-sm leading-relaxed list-none">
            <li className="flex items-start gap-2">· <strong className="text-zinc-300 font-medium">Verification & deposit requirements:</strong> Account verification and a deposit are required to place bids; our team explains the process before you commit.</li>
            <li className="flex items-start gap-2">· <strong className="text-zinc-300 font-medium">Proxy bidding:</strong> We bid at real Japanese auctions on your behalf up to your limit.</li>
            <li className="flex items-start gap-2">· <strong className="text-zinc-300 font-medium">Translated auction sheets &amp; official export:</strong> You receive translated grades and condition reports; we handle export documentation and shipping from Japan.</li>
          </ul>
        </motion.div>

        {/* Auction Access Guidance (Phase 11) */}
        <motion.div
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 tracking-tight">Auction Access Guidance</h3>
          <ul className="space-y-1.5 text-zinc-400 text-sm leading-relaxed list-none">
            <li className="flex items-start gap-2">· Verification &amp; deposit required; team explains before commitment</li>
            <li className="flex items-start gap-2">· Proxy bidding on real Japanese auctions up to your limit</li>
            <li className="flex items-start gap-2">· Translated auction sheets &amp; official export handled</li>
          </ul>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          className="card p-6 md:p-8 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-black text-white mb-2">Auction Access Information</h3>
              <p className="text-gray-300 mb-2">
                To participate in live auctions, you need to register and verify your account. Our team will guide you through the process and provide access to real-time auction feeds.
              </p>
              <p className="text-zinc-500 text-xs mb-4">
                Account verification required. Export-only; no test drives or returns.
              </p>
              <p className="text-cyan-400/90 text-xs font-medium mb-1">Real-time bidding via licensed Japan auction access.</p>
              <p className="text-zinc-500 text-[11px] mb-3">Verification required · Export-only · Deposit to bid</p>
              <p className="text-zinc-400 text-xs mb-4">You&apos;re not committing to bid until you confirm. Our team explains everything before any deposit is requested.</p>
              <Link href={routes.contact} className="btn-primary inline-flex items-center gap-2" data-gsap-button>
                Request Auction Access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Bidding?</h2>
          <p className="text-zinc-400 mb-3 max-w-xl mx-auto">Join thousands of customers importing premium Japanese vehicles</p>

          <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mb-5 max-w-2xl mx-auto">
            Auctions are wholesale marketplaces. Vehicles are sold as-is based on grades and auction sheets. Pricing varies by market. Professional guidance replaces retail guarantees.
          </p>

          <p className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wider">Verification &amp; Deposit Requirements</p>
          <p className="text-zinc-500 text-[11px] sm:text-xs mb-5 max-w-xl mx-auto">Account verification and deposit required to bid. Export-only. Proxy bidding, translated auction sheets, and official export handling included.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto mb-6 text-left">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4">
              <p className="text-[10px] sm:text-[11px] font-semibold text-cyan-400/90 uppercase tracking-wider mb-2">This is for</p>
              <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-400 list-none">
                <li className="flex items-start gap-1.5"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">✔</span> Buyers importing vehicles</li>
                <li className="flex items-start gap-1.5"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">✔</span> Dealers, exporters, and serious individual buyers</li>
                <li className="flex items-start gap-1.5"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">✔</span> Those comfortable with auction-based purchases</li>
                <li className="flex items-start gap-1.5"><span className="text-cyan-500/80 mt-0.5 shrink-0" aria-hidden="true">✔</span> Buyers ready for deposits and documentation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4">
              <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Not for</p>
              <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-500 list-none">
                <li className="flex items-start gap-1.5"><span className="text-zinc-600 mt-0.5 shrink-0" aria-hidden="true">✖</span> Local retail buyers</li>
                <li className="flex items-start gap-1.5"><span className="text-zinc-600 mt-0.5 shrink-0" aria-hidden="true">✖</span> Test drives or showroom visits</li>
                <li className="flex items-start gap-1.5"><span className="text-zinc-600 mt-0.5 shrink-0" aria-hidden="true">✖</span> Immediate delivery or fixed-price retail</li>
                <li className="flex items-start gap-1.5"><span className="text-zinc-600 mt-0.5 shrink-0" aria-hidden="true">✖</span> Casual browsing without intent to buy</li>
              </ul>
            </div>
          </div>

          <p className="text-cyan-400/90 text-sm font-medium mb-1">Translated auction sheets &amp; official export handling.</p>
          <p className="text-zinc-500 text-[11px] sm:text-xs mb-2">Verification required · Export-only · Deposit to bid</p>
          <p className="text-zinc-400 text-xs mb-2">You&apos;re not committing to bid until you confirm. Our team explains everything before any deposit is requested.</p>
          <p className="text-zinc-500 text-xs mb-6">We operate with documented steps at every stage.</p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
          >
            <Link href={routes.contact} className="btn-primary min-w-[200px] sm:min-w-[220px] justify-center" data-gsap-button>
              Request Auction Access
            </Link>
            <Link href={routes.inventory} className="btn-secondary min-w-[180px] justify-center">
              Browse Inventory
            </Link>
          </motion.div>
          <p className="text-zinc-500 text-xs mt-4 max-w-md mx-auto">
            Serious buyers only. We&apos;ll guide you through verification and bidding.
          </p>
        </motion.div>

        {/* What Our Team Will Do / What We Will Not Do — confidence after intent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-10">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
            <h3 className="text-sm font-bold text-white mb-2 md:mb-3 tracking-tight">What Our Team Will Do For You</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-400 list-none">
              <li className="flex items-start gap-2">· Monitor live auctions on your behalf</li>
              <li className="flex items-start gap-2">· Translate and explain auction sheets and grades</li>
              <li className="flex items-start gap-2">· Advise on pricing and bidding limits</li>
              <li className="flex items-start gap-2">· Handle export documentation and shipping from Japan</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
            <h3 className="text-sm font-bold text-zinc-400 mb-2 md:mb-3 tracking-tight">What We Will Not Do</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-500 list-none">
              <li className="flex items-start gap-2">· We do not sell retail showroom cars</li>
              <li className="flex items-start gap-2">· We do not guarantee cosmetic perfection</li>
              <li className="flex items-start gap-2">· We do not offer test drives or local inspections</li>
              <li className="flex items-start gap-2">· We do not bid without buyer confirmation and deposit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
