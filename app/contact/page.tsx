"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn, scrollReveal, slideUp } from "@/lib/animations";
import { ContactPageContent, type ContactFormData } from "./ContactPageContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    vehicleId: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formMicroRef = useRef<HTMLDivElement>(null);
  const formMicroInView = useInView(formMicroRef, { once: true, margin: "-40px" });

  const microcopyVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  useEffect(() => {
    if (headerRef.current) {
      fadeIn(headerRef.current, { delay: 0.2 });
    }
    if (infoRef.current) {
      scrollReveal(infoRef.current, slideUp, { delay: 0.3 });
    }
    if (formRef.current) {
      scrollReveal(formRef.current, slideUp, { delay: 0.4 });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ContactPageContent
      headerRef={headerRef}
      infoRef={infoRef}
      formRef={formRef}
      formMicroRef={formMicroRef}
      formData={formData}
      onFormChange={handleChange}
      submitted={submitted}
      onSubmit={handleSubmit}
      formMicroInView={formMicroInView}
      microcopyVariants={microcopyVariants}
    />
  );
}
