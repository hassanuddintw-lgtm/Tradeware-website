"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Sparkles, MessageCircle, CheckCircle2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  vehicleId: string;
  subject: string;
  message: string;
};

type ContactPageContentProps = {
  headerRef: React.RefObject<HTMLDivElement>;
  infoRef: React.RefObject<HTMLDivElement>;
  formRef: React.RefObject<HTMLDivElement>;
  formMicroRef: React.RefObject<HTMLDivElement>;
  formData: ContactFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formMicroInView: boolean;
  microcopyVariants: {
    hidden: { opacity: number; y: number };
    visible: (i: number) => { opacity: number; y: number; transition: { delay: number; duration: number; ease: string } };
  };
};

export function ContactPageContent({
  headerRef,
  infoRef,
  formRef,
  formMicroRef,
  formData,
  onFormChange,
  submitted,
  onSubmit,
  formMicroInView,
  microcopyVariants,
}: ContactPageContentProps) {
  return (
    <div className="w-full min-w-0 bg-cinematic-base pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none bg-cinematic-gradient" aria-hidden />
      <div className="absolute -top-20 -right-20 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-cyan-500/10 blur-[100px] md:blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] bg-purple-500/5 blur-[80px] md:blur-[100px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="text-center mb-10 md:mb-14 px-2">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span className="text-cyan-400 font-bold text-[9px] uppercase tracking-[0.2em] font-body">Get in touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 md:mb-5 tracking-tight font-display uppercase leading-tight break-words">
              CONTACT <span className="gradient-text gradient-text-glow italic">US</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-body leading-relaxed">
              Our team is ready for vehicle inquiries, import consultations, and pricing. First-time or experienced—we guide you to the right vehicle and through the import process. Reach out by phone, email, or the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div ref={infoRef} className="space-y-5 lg:space-y-6">
              {[
                { icon: Phone, label: "Direct Line", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`, desc: "Mon–Fri: 9:00 AM – 6:00 PM GMT", color: "bg-cyan-500", isEmail: false },
                { icon: Mail, label: "Electronic Mail", value: "", href: "#", desc: "Response within 24 hours", color: "bg-blue-500", isEmail: true, emails: siteConfig.contact.emails },
                { icon: MapPin, label: "Global Headquarters", value: siteConfig.contact.address, href: "#", desc: "Export ports: Yokohama, Kobe, Osaka", color: "bg-purple-500", isEmail: false },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all duration-300 group min-w-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}>
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 text-white shrink-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-body mb-1">{item.label}</p>
                      {"isEmail" in item && item.isEmail && item.emails ? (
                        <div className="flex flex-col gap-1 min-w-0 overflow-x-auto">
                          {item.emails.map((email: string) => (
                            <a key={email} href={`mailto:${email}`} className="text-sm sm:text-base font-bold text-white font-display hover:text-cyan-400 transition-colors whitespace-nowrap block">
                              {email}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <a href={item.href} className="text-sm sm:text-base font-bold text-white font-display hover:text-cyan-400 transition-colors break-all block">
                          {item.value}
                        </a>
                      )}
                      <p className="text-[10px] font-medium text-gray-500 mt-2">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="p-4 sm:p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent min-w-0"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shrink-0">
                    <MessageCircle className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-black text-white font-display uppercase tracking-tight">Live Concierge</h3>
                </div>
                <p className="text-xs text-gray-400 font-body leading-relaxed mb-4">
                  Instant support via our chat. Click below to open.
                </p>
                <motion.button
                  type="button"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    const chatbot = document.querySelector("[data-chatbot]");
                    if (chatbot) (chatbot as HTMLElement).click();
                  }}
                >
                  Open chat
                </motion.button>
              </motion.div>
            </div>

            <div ref={formRef} className="lg:col-span-2 min-w-0 space-y-6 md:space-y-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-base font-bold text-white mb-3 tracking-tight">What happens after you contact us</h2>
                <ol className="space-y-2 text-xs sm:text-sm text-zinc-400 leading-relaxed list-decimal list-inside">
                  <li>We review your requirement and confirm your target vehicle or auction interest.</li>
                  <li>We verify buyer and auction eligibility (export destination, documentation).</li>
                  <li>We share auction options, translated auction sheets, and inspection guidance.</li>
                  <li>After you confirm, deposit secures your position; we bid and handle export and shipping.</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Please note</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-400 list-disc list-inside">
                  <li>All vehicles are export-only. Auction vehicles are sold as-is (sheets & grades describe condition).</li>
                  <li>A deposit is required to place bids. No test drives or returns; we provide documentation and inspection support.</li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm relative overflow-hidden shadow-[0_0_60px_-20px_rgba(6,182,212,0.15)]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[60px]" />

                {submitted ? (
                  <motion.div
                    className="text-center py-16 md:py-20 relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6 border-2 border-cyan-500/40">
                      <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3 font-display uppercase tracking-tight">Message received</h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-6 font-display uppercase tracking-tight">Send your inquiry</h2>
                    <form onSubmit={onSubmit} className="space-y-5 md:space-y-6 font-body relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Name *</label>
                          <input type="text" name="name" required value={formData.name} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm" placeholder="Your name" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Email *</label>
                          <input type="email" name="email" required value={formData.email} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm" placeholder="you@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm" placeholder="+1 234 567 890" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Country</label>
                          <input type="text" name="country" value={formData.country} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm" placeholder="e.g. United States" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Stock ID (optional)</label>
                        <input type="text" name="vehicleId" value={formData.vehicleId} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm uppercase" placeholder="e.g. STK-2024-001" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Subject *</label>
                        <div className="relative">
                          <select name="subject" required value={formData.subject} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm appearance-none cursor-pointer pr-10">
                            <option value="" className="bg-zinc-900">Select topic</option>
                            <option value="quote" className="bg-zinc-900">Request quotation</option>
                            <option value="inquiry" className="bg-zinc-900">Asset inquiry</option>
                            <option value="shipping" className="bg-zinc-900">Logistics query</option>
                            <option value="import" className="bg-zinc-900">Import process</option>
                            <option value="other" className="bg-zinc-900">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/70">
                            <svg width="10" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Message *</label>
                        <textarea name="message" required rows={5} value={formData.message} onChange={onFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-sm leading-relaxed resize-y min-h-[120px]" placeholder="Describe your requirements: model, year range, budget, destination country..." />
                      </div>
                      <div ref={formMicroRef} className="space-y-1.5 text-xs text-zinc-500">
                        <motion.p custom={0} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>We respond within 24–48 hours. No commitment until you confirm.</motion.p>
                        <motion.p custom={1} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>Bids are placed only after your approval and deposit.</motion.p>
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={formMicroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Send className="h-4 w-4" />
                        Send message
                      </motion.button>
                    </form>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">What we do for you</h3>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    <li>· Monitor live auctions & translate auction sheets</li>
                    <li>· Advise on pricing and bidding limits</li>
                    <li>· Handle export documentation and shipping from Japan</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-zinc-400 mb-2 tracking-tight">What we don&apos;t do</h3>
                  <ul className="space-y-1.5 text-xs text-zinc-500">
                    <li>· No retail showroom sales or test drives</li>
                    <li>· No bid without your confirmation and deposit</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h3 className="text-sm font-bold text-white mb-3 tracking-tight">From first message to delivery</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[
                    "You contact us",
                    "We verify eligibility",
                    "Options & sheets shared",
                    "Deposit & bidding",
                    "Export & shipping",
                    "Documents delivered",
                  ].map((label, step) => (
                    <div key={step} className="flex flex-col items-center text-center">
                      <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center mb-1.5">{step + 1}</span>
                      <p className="text-zinc-400 text-[10px] sm:text-xs leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-cyan-400/80 text-xs font-medium">
                Licensed Japan auction access · Translated auction sheets · Official export handling
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
