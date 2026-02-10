"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Calendar, Award, Clock, Users, Zap, BarChart3, Minus } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

// Mock live auction data
const liveAuctions = [
  { id: "AU-2024-001", vehicle: "Toyota Land Cruiser 2022", currentBid: 45000, timeLeft: "2h 15m", bidders: 12 },
  { id: "AU-2024-002", vehicle: "Nissan GT-R 2021", currentBid: 85000, timeLeft: "45m", bidders: 8 },
  { id: "AU-2024-003", vehicle: "Honda Civic 2023", currentBid: 12000, timeLeft: "1h 30m", bidders: 5 },
];

const upcomingAuctions = [
  { date: "2024-01-25", time: "10:00 JST", location: "Tokyo", vehicles: 150 },
  { date: "2024-01-26", time: "14:00 JST", location: "Osaka", vehicles: 200 },
  { date: "2024-01-27", time: "11:00 JST", location: "Yokohama", vehicles: 180 },
];

export default function AuctionFeatures() {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "grades">("live");
  const [isMinimized, setIsMinimized] = useState(false);

  // Minimized button (like chatbot/calculator)
  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-44 right-3 sm:right-5 z-50 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        title="Auction Hub"
        aria-label="Open Auction Hub"
      >
        <Gavel className="h-4 w-4" />
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-44 right-3 sm:right-5 z-40 w-[min(16rem,calc(100vw-1.5rem))] rounded-xl border border-white/[0.08] bg-[#0c0c0f]/95 backdrop-blur-xl overflow-hidden shadow-xl"
    >
      <div className="flex items-center justify-between gap-1.5 p-2 sm:p-2.5 border-b border-white/[0.06] min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 shrink-0">
            <Gavel className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-[11px] sm:text-xs truncate">Auction Hub</h3>
            <p className="text-[9px] text-zinc-500 truncate">Live & Upcoming</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] text-emerald-500 font-medium">LIVE</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md text-zinc-500 hover:bg-white/5 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Minimize"
            aria-label="Minimize Auction Hub"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-white/[0.06] min-w-0">
        {[
          { id: "live", label: "Live", icon: Zap },
          { id: "upcoming", label: "Upcoming", icon: Calendar },
          { id: "grades", label: "Grades", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "live" | "upcoming" | "grades")}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-colors relative cursor-pointer min-w-0 ${
                activeTab === tab.id ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                  layoutId="auctionTab"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Content */}
      <div className="max-h-[min(280px,45vh)] overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-2 sm:p-2.5 space-y-2 min-w-0"
            >
              {liveAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/20 transition-colors min-w-0"
                >
                  <div className="flex items-start justify-between gap-1.5 mb-1.5 min-w-0">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-[11px] sm:text-xs mb-0.5 truncate">{auction.vehicle}</h4>
                      <p className="text-[9px] text-zinc-500 truncate">{auction.id}</p>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500 shrink-0">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="text-[9px] font-medium whitespace-nowrap">{auction.timeLeft}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1.5 mt-1.5 pt-1.5 border-t border-white/[0.06] min-w-0">
                    <div className="min-w-0">
                      <p className="text-[9px] text-zinc-500 mb-0.5">Current Bid</p>
                      <p className="text-xs font-semibold text-cyan-400 truncate">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Users className="h-3 w-3 text-zinc-500" />
                      <span className="text-[10px] font-medium text-zinc-400">{auction.bidders}</span>
                    </div>
                  </div>
                  <Link
                    href={routes.liveAuctions}
                    className="mt-1.5 block w-full py-1.5 text-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Place Bid
                  </Link>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "upcoming" && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-2 sm:p-2.5 space-y-2 min-w-0"
            >
              {upcomingAuctions.map((auction) => (
                <div
                  key={auction.date}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/20 transition-colors min-w-0"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 min-w-0">
                    <div className="min-w-0">
                      <p className="text-[9px] text-zinc-500 mb-0.5">Date & Time</p>
                      <p className="text-[11px] font-semibold text-white truncate">{auction.date}</p>
                      <p className="text-[9px] text-zinc-500 truncate">{auction.time}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] text-zinc-500 mb-0.5">Location</p>
                      <p className="text-[11px] font-semibold text-cyan-400">{auction.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/[0.06]">
                    <BarChart3 className="h-3 w-3 text-zinc-500 shrink-0" />
                    <span className="text-[10px] font-medium text-zinc-400">{auction.vehicles} vehicles</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "grades" && (
            <motion.div
              key="grades"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-2 sm:p-2.5 space-y-2 min-w-0"
            >
              {[
                { grade: "6", desc: "Excellent, like new", color: "text-emerald-400" },
                { grade: "5", desc: "Very good, minor wear", color: "text-cyan-400" },
                { grade: "4.5", desc: "Good, some wear", color: "text-blue-400" },
                { grade: "4", desc: "Fair, visible wear", color: "text-amber-400" },
                { grade: "3.5", desc: "Below average", color: "text-orange-400" },
                { grade: "3", desc: "Poor, significant wear", color: "text-red-400" },
              ].map((item) => (
                <div
                  key={item.grade}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] min-w-0"
                >
                  <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                    <Award className={`h-3 w-3 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white">Grade {item.grade}</p>
                    <p className="text-[9px] text-zinc-500 truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
              <Link
                href={routes.auctionInformation}
                className="block w-full py-2 text-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Learn more
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
