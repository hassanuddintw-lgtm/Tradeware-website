"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Accordion from "@/components/ui/Accordion";
import { buyerQuestions } from "@/data/buyerQuestions";
import { sectionHeaderReveal, staggerRevealDramatic } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const accordionItems = buyerQuestions.map((q) => ({
  id: q.id,
  title: q.question,
  content: <span className="text-zinc-400 text-sm leading-relaxed">{q.answer}</span>,
}));

export default function BuyerQuestionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        sectionHeaderReveal(headerRef.current, { y: 28 });
      }
      if (listRef.current) {
        staggerRevealDramatic(listRef.current, "> div > div", { stagger: 0.12, y: 32 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-transparent" aria-labelledby="buyer-questions-heading">
      <div className="container-custom">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-6 md:mb-8 px-1">
          <h2 id="buyer-questions-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Common Buyer Questions <span className="gradient-text font-normal">(Answered Simply)</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Straight answers about condition, pricing, and process—no sales talk.
          </p>
        </div>
        <div ref={listRef} className="max-w-3xl mx-auto">
          <Accordion items={accordionItems} allowMultiple />
        </div>
      </div>
    </section>
  );
}
