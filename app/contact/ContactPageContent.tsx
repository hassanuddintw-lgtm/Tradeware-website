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
  headerRef: React.RefObject<HTMLDivElement | null>;
  infoRef: React.RefObject<HTMLDivElement | null>;
  formRef: React.RefObject<HTMLDivElement | null>;
  formMicroRef: React.RefObject<HTMLDivElement | null>;
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
    <div className="w-full min-w-0 bg-cinematic-base pt-14 md:pt-16 pb-10 md:pb-14 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none bg-cinematic-gradient" aria-hidden />
      <div className="absolute -top-20 -right-20 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-cyan-500/10 blur-[100px] md:blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] bg-purple-500/5 blur-[80px] md:blur-[100px] pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="text-center mb-6 md:mb-10 px-1">
            <div className="inline-flex items-center gap-1.5 mb-3 md:mb-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400 shrink-0" />
              <span className="text-cyan-400 font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.18em] font-body">Connect</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 md:mb-4 tracking-tighter font-display uppercase leading-none break-words">
              CONTACT <span className="gradient-text gradient-text-glow italic">US</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto font-body font-medium leading-relaxed break-words px-1">
              Our experienced team is ready to assist you with vehicle inquiries, import consultations, pricing information, and any questions about our services. Whether you&apos;re a first-time importer or an experienced buyer, we provide personalized guidance to help you find the perfect vehicle and navigate the import process with confidence. Contact us via phone, email, or use the form below, and we&apos;ll respond promptly to assist with your Japanese vehicle import needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            <div ref={infoRef} className="space-y-6">
              {[
                { icon: Phone, label: "Direct Line", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`, desc: "Mon-Fri: 9:00 AM - 6:00 PM GMT", color: "bg-cyan-500" },
                { icon: Mail, label: "Electronic Mail", value: siteConfig.contact.emails.join(" / "), href: `mailto:${siteConfig.contact.email}`, desc: "Response within 24 hours", color: "bg-blue-500" },
                { icon: MapPin, label: "Global Headquarters", value: siteConfig.contact.address, href: "#", desc: "Export Ports: Yokohama, Kobe, Osaka", color: "bg-purple-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="card p-3 sm:p-5 md:p-6 group hover:border-cyan-500/30 transition-all duration-700 bg-white/5 border border-white/5 min-w-0"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 md:mb-4 min-w-0">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg md:rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[8px] sm:text-[9px] font-black text-gray-500 uppercase tracking-widest font-body mb-0.5 break-words">{item.label}</h3>
                      <a href={item.href} className="text-sm sm:text-base md:text-lg font-black text-white font-display italic hover:text-cyan-400 transition-colors break-all">
                        {item.value}
                      </a>
                    </div>
                  </div>
                  <p className="text-[8px] sm:text-[9px] font-bold text-gray-600 uppercase tracking-widest font-body break-words">{item.desc}</p>
                </motion.div>
              ))}

              <motion.div
                className="card p-3 sm:p-5 md:p-6 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 min-w-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2.5 md:gap-3 mb-2.5 md:mb-3 min-w-0">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shrink-0">
                    <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm md:text-base font-black text-white font-display uppercase italic tracking-tight break-words">Live Concierge</h3>
                </div>
                <p className="text-[11px] text-gray-400 font-body leading-relaxed mb-3 md:mb-4 font-medium break-words">
                  Instant support available via our proprietary AI-enhanced chat interface.
                </p>
                <motion.button
                  type="button"
                  className="w-full btn-primary py-4 rounded-xl text-[10px] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const chatbot = document.querySelector("[data-chatbot]");
                    if (chatbot) (chatbot as HTMLElement).click();
                  }}
                >
                  OPEN TERMINAL
                </motion.button>
              </motion.div>
            </div>

            <div ref={formRef} className="lg:col-span-2 min-w-0 space-y-5 md:space-y-6">
              <div className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 md:p-6">
                <h2 className="text-sm sm:text-base font-bold text-white mb-3 md:mb-4 tracking-tight">What Happens After You Contact Us</h2>
                <ol className="space-y-2 text-[11px] sm:text-xs text-zinc-400 leading-relaxed list-decimal list-inside">
                  <li>We review your requirement and confirm your target vehicle or auction interest.</li>
                  <li>We verify buyer and auction eligibility (export destination, documentation).</li>
                  <li>We share auction options, translated auction sheets, and inspection guidance where needed.</li>
                  <li>After you confirm, deposit secures your position; we bid on your behalf, then handle export and shipping.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
                <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed mb-2">Please note:</p>
                <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-400 list-disc list-inside">
                  <li>All vehicles are export-only (no domestic retail).</li>
                  <li>Auction vehicles are sold as-is; condition is described via auction sheets and grades.</li>
                  <li>A deposit is required to place bids.</li>
                  <li>No test drives or returns; we provide documentation and inspection support instead.</li>
                </ul>
              </div>

              <p className="text-cyan-400/90 text-[11px] sm:text-xs font-medium">
                Licensed Japan auction access · Translated auction sheets · Official export handling
              </p>

              <div className="p-4 sm:p-5 md:p-8 lg:p-10 xl:p-12 rounded-xl md:rounded-2xl lg:rounded-[2.5rem] glass-card bg-black/20 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px]" />

                {submitted ? (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
                      <CheckCircle2 className="h-10 w-10 text-cyan-400" />
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 font-display italic uppercase">TRANSMISSION RECEIVED</h2>
                    <p className="text-gray-400 font-body font-medium">
                      Our elite team will initiate contact within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-4 md:mb-6 font-display italic uppercase tracking-tight break-words">JOURNAL ENTRY</h2>
                    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 font-body">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Master Name *</label>
                          <input type="text" name="name" required value={formData.name} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Electronic Mail *</label>
                          <input type="email" name="email" required value={formData.email} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        <div>
                          <label className="block text-[9px] font-black text-gray-500 mb-1.5 sm:mb-2 uppercase tracking-widest">Communication ID (Phone)</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800" placeholder="+1 234 567 890" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Territory (Country)</label>
                          <input type="text" name="country" value={formData.country} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800" placeholder="United States" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Asset Reference (Stock ID)</label>
                        <input type="text" name="vehicleId" value={formData.vehicleId} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800 uppercase tracking-widest" placeholder="e.g., STK-2024-001" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Transmission Subject *</label>
                        <div className="relative group">
                          <select name="subject" required value={formData.subject} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-black appearance-none cursor-pointer uppercase tracking-widest text-xs">
                            <option value="" className="bg-black">SELECT ARCHITECTURE</option>
                            <option value="quote" className="bg-black">REQUEST QUOTATION</option>
                            <option value="inquiry" className="bg-black">ASSET INQUIRY</option>
                            <option value="shipping" className="bg-black">LOGISTICS QUERY</option>
                            <option value="import" className="bg-black">IMPORT ARCHITECTURE</option>
                            <option value="other" className="bg-black">MISCELLANEOUS</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/50 group-hover:text-cyan-500 transition-colors">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest">Detailed Transmission *</label>
                        <textarea name="message" required rows={6} value={formData.message} onChange={onFormChange} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-zinc-800 leading-relaxed" placeholder="Describe your requirements in detail..." />
                        <p className="text-zinc-500 text-[11px] sm:text-xs mt-2 leading-relaxed">
                          The more specific your requirement, the faster we can assist. Include model, year range, budget, and destination country if known.
                        </p>
                      </div>
                      <div ref={formMicroRef} className="space-y-2">
                        <motion.p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed" custom={0} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>
                          This form is for serious buyers seeking auction access, inspections, or shipping quotes.
                        </motion.p>
                        <motion.p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed" custom={1} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>
                          You&apos;re not committing to bid until you confirm. Our team explains everything before any deposit is requested.
                        </motion.p>
                        <motion.p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed" custom={2} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>
                          Every bid is placed only after buyer confirmation and deposit.
                        </motion.p>
                        <motion.p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed" custom={3} initial="hidden" animate={formMicroInView ? "visible" : "hidden"} variants={microcopyVariants}>
                          We respond to serious inquiries within 24–48 hours and outline next steps based on your destination and auction/export requirements.
                        </motion.p>
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full btn-primary btn-glow-pulse py-6 rounded-2xl flex items-center justify-center gap-4 text-sm tracking-[0.2em] font-black group shadow-cyan-glow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={formMicroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
                      >
                        <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        INITIATE SEQUENCE
                      </motion.button>
                    </form>
                  </>
                )}
              </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-6 md:mt-8">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-white mb-2 md:mb-3 tracking-tight">What You Control</h3>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-400 list-none">
                  <li className="flex items-start gap-2">· Budget & bidding limit</li>
                  <li className="flex items-start gap-2">· Final approval before deposit</li>
                  <li className="flex items-start gap-2">· Destination & preferences</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-white mb-2 md:mb-3 tracking-tight">What We Handle</h3>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-400 list-none">
                  <li className="flex items-start gap-2">· Auction monitoring & bidding</li>
                  <li className="flex items-start gap-2">· Translation & explanation</li>
                  <li className="flex items-start gap-2">· Export & shipping paperwork</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 mt-6 md:mt-8">
              <h3 className="text-sm font-bold text-white mb-2 md:mb-3 tracking-tight">How Long the Process Usually Takes</h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                Most buyers receive an initial response within 24–48 hours. Auction cycles and export timelines vary by destination and vehicle; we&apos;ll outline next steps after we review your requirement.
              </p>
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-sm font-bold text-white mb-3 md:mb-4 tracking-tight">From First Message to Vehicle Arrival</h3>
              <p className="text-zinc-500 text-[11px] sm:text-xs mb-4 leading-relaxed">The full buyer journey, end to end—so nothing feels hidden.</p>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
                {[
                  { step: 1, label: "You contact us with your requirement" },
                  { step: 2, label: "We verify buyer & export eligibility" },
                  { step: 3, label: "Auction options & translated sheets shared" },
                  { step: 4, label: "Deposit placed & bidding begins" },
                  { step: 5, label: "Vehicle secured & export handled" },
                  { step: 6, label: "Shipping & documents delivered" },
                ].map(({ step, label }) => (
                  <div key={step} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4 flex flex-col items-center text-center min-w-0">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2 shrink-0">{step}</span>
                    <p className="text-zinc-400 text-[11px] sm:text-xs leading-snug font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-sm font-bold text-white mb-3 md:mb-4 tracking-tight">How We Actually Operate</h3>
              <p className="text-zinc-500 text-[11px] sm:text-xs mb-4 leading-relaxed">A real operation with systems, not just advisors.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                  "Licensed access to Japanese auction houses",
                  "Local team in Japan handling bidding & documentation",
                  "Standardized process for sheets, grading, and export",
                  "Secure payments & export documentation handling",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4 min-w-0">
                    <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
