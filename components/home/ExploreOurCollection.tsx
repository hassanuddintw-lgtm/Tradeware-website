"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";

const BLOCKS = [
  { label: "New Arrivals", query: "?sort=newest", emptyMsg: "No new arrivals available at the moment." },
  { label: "Clearance", query: "?clearance=1", emptyMsg: "No clearance vehicles available at the moment." },
  { label: "Premium", query: "?grade=premium", emptyMsg: "No premium vehicles available at the moment." },
  { label: "3rd Party", query: "?source=third-party", emptyMsg: "No third party vehicles available at the moment." },
];

export default function ExploreOurCollection() {
  return (
    <section className="section bg-white" aria-labelledby="explore-collection-heading">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <p className="eyebrow-mdk mb-0">Browse new and premium vehicles</p>
          <Link
            href={routes.inventory}
            className="text-red-600 hover:text-red-700 font-semibold text-sm inline-flex items-center gap-1 shrink-0"
          >
            See More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <h2 id="explore-collection-heading" className="heading-section-mdk text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Explore Our Collection
        </h2>

        {/* Tradeware Group style: 4 separate blocks, not tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {BLOCKS.map((block) => (
            <div
              key={block.label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6 flex flex-col min-h-[140px]"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-2">{block.label}</h3>
              <p className="text-slate-500 text-sm mb-3">{block.emptyMsg}</p>
              <Link
                href={`${routes.inventory}${block.query}`}
                className="mt-auto text-red-600 font-semibold text-sm hover:text-red-700 inline-flex items-center gap-1"
              >
                See More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
