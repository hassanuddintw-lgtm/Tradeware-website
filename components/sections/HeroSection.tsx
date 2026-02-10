"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  title: string | ReactNode;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
  background?: "gradient" | "dark" | "image" | "transparent";
}

export default function HeroSection({
  title,
  subtitle,
  description,
  badge,
  badgeIcon,
  children,
  className,
  background = "gradient",
}: HeroSectionProps) {
  const backgrounds = {
    gradient: "bg-gradient-to-b from-dark-950 to-dark-900",
    dark: "bg-dark-950",
    image: "bg-gradient-to-b from-dark-950/95 to-dark-900/95",
    transparent: "bg-transparent",
  };

  return (
    <section className={cn("relative py-16 pt-20 overflow-hidden", backgrounds[background], className)}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {badgeIcon && <span className="text-cyan-500">{badgeIcon}</span>}
              <span className="text-cyan-500 font-semibold text-sm uppercase tracking-wider">
                {badge}
              </span>
            </motion.div>
          )}

          {subtitle && (
            <motion.h2
              className="text-lg md:text-xl text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.h2>
          )}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
