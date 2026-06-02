"use client";

import Image from "next/image";
import Link from "next/link";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { routes } from "@/config/routes";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80", alt: "Premium car" },
  { src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80", alt: "Sports car" },
  { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80", alt: "Car" },
  { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80", alt: "Car lot" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", alt: "Sedan" },
  { src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80", alt: "SUV" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-0 pb-16">
      <div className="container-custom max-w-5xl">
        <PageBreadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Gallery" }]} />
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Gallery</h1>
        <p className="text-red-600 text-sm font-semibold mb-10">
          Browse premium Japanese vehicles & machinery.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 shadow-md">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw, 33vw" unoptimized />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={routes.inventory}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
          >
            View full inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
