"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Car, FileText, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { vehicles } from "@/data/vehicles";
import { extendedVehicles } from "@/data/vehicles-extended";
import { blogPosts } from "@/data/blog";

type SearchResult = {
  type: "vehicle" | "blog" | "page";
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  metadata?: string;
};

export default function UniversalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const allVehicles = useMemo(() => [...vehicles, ...extendedVehicles], []);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search Vehicles
    allVehicles.forEach((vehicle) => {
      const match =
        vehicle.make.toLowerCase().includes(q) ||
        vehicle.model.toLowerCase().includes(q) ||
        vehicle.stockId.toLowerCase().includes(q) ||
        vehicle.color.toLowerCase().includes(q) ||
        vehicle.location.toLowerCase().includes(q) ||
        vehicle.engine.fuel.toLowerCase().includes(q) ||
        vehicle.transmission.toLowerCase().includes(q) ||
        vehicle.condition.toLowerCase().includes(q) ||
        vehicle.description?.toLowerCase().includes(q) ||
        `${vehicle.year}`.includes(q);

      if (match) {
        searchResults.push({
          type: "vehicle",
          title: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
          description: `${vehicle.engine.displacement} • ${vehicle.transmission} • ${vehicle.mileage.toLocaleString()} km`,
          url: `/vehicles/${vehicle.id}`,
          icon: <Car className="h-4 w-4" />,
          metadata: `FOB: $${vehicle.price.fob.toLocaleString()}`,
        });
      }
    });

    // Search Blog Posts
    blogPosts.forEach((post) => {
      const match =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      if (match) {
        searchResults.push({
          type: "blog",
          title: post.title,
          description: post.excerpt,
          url: `/blog/${post.slug}`,
          icon: <FileText className="h-4 w-4" />,
          metadata: post.publishedAt,
        });
      }
    });

    // Search Pages
    const pages = [
      { title: "How It Works", url: "/how-it-works", desc: "Learn our import process" },
      { title: "Shipping Information", url: "/shipping", desc: "Ports, transit times, shipping process" },
      { title: "Pricing & Costs", url: "/pricing", desc: "FOB, CIF pricing breakdown" },
      { title: "Auction Information", url: "/auction-information", desc: "Auction grades and sheets" },
      { title: "Import Process", url: "/import-process", desc: "Step-by-step import guide" },
      { title: "Contact Us", url: "/contact", desc: "Get in touch with our team" },
      { title: "FAQ", url: "/faq", desc: "Frequently asked questions" },
      { title: "Company Profile", url: "/company-profile", desc: "About Tradeware" },
      { title: "Testimonials", url: "/testimonials", desc: "Customer reviews" },
      { title: "Countries", url: "/countries", desc: "Country-specific import guides" },
    ];

    pages.forEach((page) => {
      if (page.title.toLowerCase().includes(q) || page.desc.toLowerCase().includes(q)) {
        searchResults.push({
          type: "page",
          title: page.title,
          description: page.desc,
          url: page.url,
          icon: <MapPin className="h-4 w-4" />,
        });
      }
    });

    return searchResults.slice(0, 10); // Limit to 10 results
  }, [query, allVehicles]);

  // Click-outside: use ref to avoid stale closure and prevent infinite update loop
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpenRef.current) return;
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200 text-[11px] font-medium tracking-wide cursor-pointer max-md:min-w-[44px] max-md:min-h-[44px] max-md:p-2.5 max-md:rounded-xl max-md:border-white/[0.06] max-md:bg-white/[0.03]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Search"
      >
        <Search className="h-4 w-4 shrink-0 max-md:h-[18px] max-md:w-[18px]" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 bg-white/5 border border-white/10 rounded">
          ⌘K
        </kbd>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101]"
            >
              <div className="bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-4 p-4 border-b border-white/10">
                  <Search className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search vehicles, blog posts, pages..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                    autoFocus
                  />
                  {query && (
                    <motion.button
                      type="button"
                      onClick={() => setQuery("")}
                      className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </motion.button>
                  )}
                </div>

                {/* Results */}
                <div className="max-h-[500px] overflow-y-auto">
                  {query && results.length === 0 ? (
                    <div className="p-8 text-center">
                      <TrendingUp className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No results found</p>
                      <p className="text-sm text-gray-500 mt-2">Try different keywords</p>
                    </div>
                  ) : query && results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <motion.div
                          key={`${result.type}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={result.url}
                            onClick={() => setIsOpen(false)}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                              {result.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                                  {result.title}
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                                  {result.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 line-clamp-1">{result.description}</p>
                              {result.metadata && (
                                <p className="text-xs text-gray-500 mt-1">{result.metadata}</p>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Start typing to search...</p>
                      <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Search Vehicles</p>
                          <p className="text-sm text-gray-400">Make, model, year, stock ID</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Search Content</p>
                          <p className="text-sm text-gray-400">Blog posts, pages, guides</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
