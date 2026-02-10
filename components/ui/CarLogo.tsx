"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { routes } from "@/config/routes";

export default function CarLogo() {
  return (
    <a href={routes.home} className="flex items-center group cursor-pointer shrink-0 min-w-0">
      <motion.div
        className="relative flex items-center w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Image
          src="/tradeware-groups-logo-transparent.png"
          alt="Tradeware — Premium Japanese Vehicle Imports"
          width={220}
          height={68}
          className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain object-left max-w-[180px] sm:max-w-[200px] md:max-w-none"
          priority
        />
      </motion.div>
    </a>
  );
}
