"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronUp, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { scrollReveal, slideUp, fadeIn } from "@/lib/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import { routes } from "@/config/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What types of vehicles do you export?",
        a: "We export all types of Japanese vehicles including sedans, SUVs, trucks, vans, and commercial vehicles. Popular models include Toyota, Nissan, Honda, Mazda, Subaru, and more.",
      },
      {
        q: "Which countries do you ship to?",
        a: "We ship to 50+ countries worldwide including Africa, Middle East, Asia Pacific, Europe, and the Americas. Contact us to confirm shipping to your specific country.",
      },
      {
        q: "How long does the import process take?",
        a: "The complete process typically takes 2-3 months: 1-2 weeks for vehicle selection and payment, 28-45 days for shipping, and 1-2 weeks for customs clearance and registration.",
      },
      {
        q: "Do you provide warranty?",
        a: "Vehicles are sold as-is based on their condition at auction. However, we provide detailed auction sheets and inspection reports so you know exactly what you're buying. We can arrange additional inspections if needed.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "What is FOB and CIF pricing?",
        a: "FOB (Free On Board) is the vehicle price at the Japanese port. CIF (Cost, Insurance & Freight) includes the vehicle, shipping, and insurance to your destination port. Customs duties are separate and paid in your country.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers (SWIFT), PayPal, and other secure payment methods. A deposit (50-100%) is required to secure the vehicle, with balance due before shipment.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. Our pricing is transparent. FOB price includes vehicle, auction fees, and port handling. CIF price includes shipping and insurance. All costs are clearly stated upfront.",
      },
      {
        q: "Do you offer discounts?",
        a: "Yes, we offer discounts for full upfront payment (100% before export) to save on transaction fees. Contact us for current discount rates.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Shipping time varies by destination: Africa (35-50 days), Middle East (25-35 days), Asia Pacific (15-25 days), Europe (40-60 days), Americas (30-45 days).",
      },
      {
        q: "Which ports do you ship from?",
        a: "We ship from major Japanese ports including Yokohama, Kobe, Osaka, and Nagoya. The port used depends on your destination and shipping schedule.",
      },
      {
        q: "Can I track my shipment?",
        a: "Yes, you'll receive a Bill of Lading (B/L) with tracking information. We provide real-time updates on your shipment status.",
      },
      {
        q: "What documents will I receive?",
        a: "You'll receive all original documents including Export Certificate, Commercial Invoice, Bill of Lading, Inspection Certificate (if required), and original registration documents. Documents are shipped via DHL.",
      },
    ],
  },
  {
    category: "Vehicle Condition & Inspection",
    questions: [
      {
        q: "What do auction grades mean?",
        a: "Auction grades (1-6) indicate vehicle condition: 6 = excellent/like new, 5 = very good, 4.5 = good, 4 = fair, 3.5 = below average, 3 = poor. Grade R indicates repaired/accident history.",
      },
      {
        q: "Can I inspect the vehicle before purchase?",
        a: "We provide detailed auction sheets, inspection reports, and multiple photos. Additional inspections can be arranged if needed. Physical inspection in Japan can be arranged for an additional fee.",
      },
      {
        q: "What if the vehicle doesn't match the description?",
        a: "We provide detailed auction sheets and inspection reports. If there's a significant discrepancy, we'll work with you to resolve the issue. All vehicles are sold based on their auction condition.",
      },
      {
        q: "Do vehicles come with service history?",
        a: "Service history availability varies by vehicle. Some vehicles include service records, which we'll provide if available. Most vehicles come with original registration documents.",
      },
    ],
  },
  {
    category: "Import Requirements",
    questions: [
      {
        q: "What are the age restrictions for importing?",
        a: "Age restrictions vary by country. Most African countries allow 5-8 year old vehicles, Middle East 5-10 years, while some countries have stricter limits. We can advise on your country's requirements.",
      },
      {
        q: "Do I need left-hand or right-hand drive?",
        a: "This depends on your country. Most countries require left-hand drive (LHD), while some accept right-hand drive (RHD). We can help you find the right vehicle for your country.",
      },
      {
        q: "What about emissions standards?",
        a: "Emission requirements vary by country. Europe requires Euro 6, while other regions may accept Euro 4 or equivalent. We can verify if a vehicle meets your country's standards.",
      },
      {
        q: "Do you help with customs clearance?",
        a: "We provide all export documentation. Customs clearance at your destination is typically handled by you or a local customs broker. We can provide guidance on the process.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoriesRef.current) {
      scrollReveal(categoriesRef.current, slideUp, { delay: 0.3 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleQuestion = (questionKey: string) => {
    setOpenQuestion(openQuestion === questionKey ? null : questionKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <HeroSection
            title={
              <>
                Frequently Asked <span className="gradient-text">Questions</span>
              </>
            }
            description="Find answers to common questions about importing Japanese vehicles"
            badge="FAQ"
            badgeIcon={<Sparkles className="h-8 w-8" />}
          />

          {/* FAQ Categories */}
          <div ref={categoriesRef} className="space-y-6 mb-12">
            {faqs.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
              >
                <motion.button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-dark-800/50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <h2 className="text-2xl font-black text-white">{category.category}</h2>
                  <motion.div
                    animate={{ rotate: openCategory === category.category ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openCategory === category.category ? (
                      <ChevronUp className="h-6 w-6 text-gold-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      className="border-t border-dark-800"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.questions.map((faq, qIndex) => {
                        const questionKey = `${catIndex}-${qIndex}`;
                        return (
                          <div key={qIndex} className="border-b border-dark-800 last:border-b-0">
                            <motion.button
                              onClick={() => toggleQuestion(questionKey)}
                              className="w-full p-6 flex items-start justify-between text-left hover:bg-dark-800/30 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <span className="font-bold text-white pr-4 text-lg">{faq.q}</span>
                              <motion.div
                                animate={{ rotate: openQuestion === questionKey ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {openQuestion === questionKey ? (
                                  <ChevronUp className="h-5 w-5 text-gold-400 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                )}
                              </motion.div>
                            </motion.button>
                            <AnimatePresence>
                              {openQuestion === questionKey && (
                                <motion.div
                                  className="px-6 pb-6 text-gray-300 leading-relaxed"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {faq.a}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <ScrollReveal delay={0.4}>
            <div className="card p-12 bg-gradient-to-r from-gold-500/10 to-blue-500/10 border-2 border-gold-500/30 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageCircle className="h-8 w-8 text-gold-400" />
                <h2 className="text-3xl font-black text-white">Still Have Questions?</h2>
              </div>
              <p className="text-lg text-gray-300 mb-8">
                Our team is here to help. Contact us for personalized assistance or use our live chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={routes.contact} className="btn-primary inline-flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.button
                  type="button"
                  onClick={() => {
                    const chatbot = document.querySelector('[data-chatbot]');
                    if (chatbot) (chatbot as HTMLElement).click();
                  }}
                  className="btn-secondary inline-flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Live Chat
                  <MessageCircle className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
