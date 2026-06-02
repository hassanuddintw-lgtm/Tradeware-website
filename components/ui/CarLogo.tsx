"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { routes } from "@/config/routes";

export default function CarLogo() {
  return (
    <a href={routes.home} aria-label="Tradeware home" className="flex items-center group cursor-pointer shrink-0 min-w-0">
      <motion.div
        className="relative flex items-center w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Image
          src="/tradeware-groups-logo-transparent.png"
          alt="Tradeware — Premium Japanese Vehicle Imports"
          width={280}
          height={88}
          className="h-14 sm:h-16 md:h-[4.5rem] lg:h-20 w-auto object-contain object-left max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
          priority
        />
      </motion.div>
    </a>
  );
}
