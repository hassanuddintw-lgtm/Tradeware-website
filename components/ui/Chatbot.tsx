"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export default function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([
    { text: "Hello! How can I help you find your perfect Japanese vehicle?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const quickReplies: { label: string; href: string }[] = [
    { label: "Browse Inventory", href: "/inventory" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Get Quote", href: "/contact" },
  ];

  const handleQuickReply = (item: { label: string; href: string }) => {
    setIsOpen(false);
    router.push(item.href);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, {
        text: "Thank you! Our team will respond shortly. Browse our inventory or check FAQ for instant answers.",
        sender: "bot",
      }]);
    }, 1000);
  };

  return (
    <>
      <button
        type="button"
        data-chatbot
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100] cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-5 right-5 z-[101] w-[340px] sm:w-[360px] h-[440px] rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0e1114] to-[#08090b] backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl shadow-black/40"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" aria-hidden />
              <div className="flex items-center justify-between p-4 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0 shadow-[0_0_16px_-4px_rgba(6,182,212,0.2)]">
                    <Bot className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-[15px] tracking-tight">Support</div>
                    <div className="text-[11px] text-emerald-400/90 flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" aria-hidden />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-cyan-500 text-black font-medium"
                          : "bg-white/[0.06] border border-white/[0.08] text-zinc-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 pb-3 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => handleQuickReply(r)}
                      className="px-4 py-2.5 text-xs font-medium rounded-xl bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:bg-cyan-500/10 hover:border-cyan-500/20 hover:text-cyan-300 transition-all whitespace-nowrap cursor-pointer"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-white/[0.06] flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-11 h-11 rounded-xl bg-cyan-500 flex items-center justify-center text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:bg-cyan-400 cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
