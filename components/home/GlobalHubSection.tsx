"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Globe, HeadphonesIcon, Clock } from "lucide-react";
import { routes } from "@/config/routes";

const points = [
  { icon: Shield, label: "Quality Assured" },
  { icon: Globe, label: "Global Reach" },
  { icon: HeadphonesIcon, label: "Trusted Service" },
  { icon: Clock, label: "24/7 Support" },
];

const carImage = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

export default function GlobalHubSection() {
  return (
    <section className="section bg-white" aria-labelledby="global-hub-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Tradeware Group: image on left */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 order-2 lg:order-1">
            <Image
              src={carImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow-mdk mb-2">About Us</p>
            <h2 id="global-hub-heading" className="text-2xl md:text-3xl font-bold heading-section-mdk mb-4">
              Global Hub for<br />Quality Japanese Cars
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Tradeware is a leading automotive company specializing in inspected Japanese vehicles and premium car parts. We are committed to providing transparency, reliability, and exceptional customer service.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our commitment to quality means every vehicle undergoes rigorous inspection and certification. We provide comprehensive logistics support to ensure a seamless car buying experience.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {points.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{label}</span>
                </div>
              ))}
            </div>
            <Link
              href={routes.about}
              className="btn-primary inline-flex items-center gap-2"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
