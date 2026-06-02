"use client";

import Image from "next/image";

const HERO_IMAGE = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] bg-slate-200" aria-hidden>
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </section>
  );
}
