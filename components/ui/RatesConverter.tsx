"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, Calculator, Loader2, ArrowDownUp, ChevronDown } from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AED", name: "UAE Dirham" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "INR", name: "Indian Rupee" },
  { code: "CNY", name: "Chinese Yuan" },
];

const fallbackRates: Record<string, number> = {
  USD: 1, JPY: 153, EUR: 0.84, GBP: 0.73, AED: 3.67, PKR: 280.5, INR: 90.5, CNY: 6.91,
};

const RATES_API = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
const REFRESH_INTERVAL_MS = 60 * 1000;

const CURRENCY_KEYS = ["jpy", "eur", "gbp", "aed", "pkr", "inr", "cny"];

function CurrencySelect({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer flex items-center justify-between gap-2"
      >
        <span>{value}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-gray-200 bg-white shadow-xl py-1 z-[110] max-h-48 overflow-auto"
          >
            {currencies.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    c.code === value ? "bg-cyan-50 text-cyan-700" : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {c.code}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RatesConverter() {
  const [isOpen, setIsOpen] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState("1");
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(RATES_API);
      if (!res.ok) throw new Error("Rate fetch failed");
      const data = await res.json();
      const usd = data?.usd;
      if (!usd || typeof usd !== "object") throw new Error("Invalid response");
      const newRates: Record<string, number> = { USD: 1 };
      CURRENCY_KEYS.forEach((key) => {
        if (typeof usd[key] === "number") newRates[key.toUpperCase()] = usd[key];
      });
      if (Object.keys(newRates).length > 1) {
        setRates({ ...fallbackRates, ...newRates });
        setLastUpdate(new Date());
      }
    } catch {
      setError("Could not fetch latest rates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(fetchRates, REFRESH_INTERVAL_MS);
    return () => clearInterval(t);
  }, [isOpen, fetchRates]);

  const convert = () => {
    const from = rates[fromCurrency] || 1;
    const to = rates[toCurrency] || 1;
    return ((parseFloat(amount) || 0) / from * to).toFixed(2);
  };

  const swap = () => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 z-50 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
        title="Currency Converter"
        aria-label="Open currency converter"
      >
        <Calculator className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-24 right-5 z-[101] w-[min(360px,92vw)] rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0e1114] to-[#08090b] backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" aria-hidden />
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/25 shadow-[0_0_20px_-6px_rgba(6,182,212,0.3)]">
                    <Calculator className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-base tracking-tight">Currency Converter</h3>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Live</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Real-time rates · Refreshes every 1 min</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 pt-2 space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">From</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      placeholder="0"
                    />
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="select-options-dark rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                    >
                      {currencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <button
                    type="button"
                    onClick={swap}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                    title="Swap currencies"
                  >
                    <ArrowDownUp className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">To</label>
                  <div className="flex gap-2">
                    <div className="flex-1 min-w-0 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-base font-semibold text-white">
                      {convert()}
                    </div>
                    <CurrencySelect value={toCurrency} onChange={setToCurrency} className="w-20 shrink-0" />
                  </div>
                </div>

                <div className="pt-4 mt-1 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-400">
                      1 {fromCurrency} = <span className="font-semibold text-white">{((rates[toCurrency] || 1) / (rates[fromCurrency] || 1)).toFixed(4)}</span> {toCurrency}
                    </span>
                    <button
                      type="button"
                      onClick={fetchRates}
                      disabled={loading}
                      className="p-2 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer disabled:opacity-50"
                      title="Refresh rates"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                    {error && <span className="text-amber-400/90">{error}. </span>}
                    <span>Updated {lastUpdate.toLocaleTimeString()}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
