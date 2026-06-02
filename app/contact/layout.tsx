import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Tradeware Group for Japanese car import support, pricing, documentation, shipping guidance, and vehicle availability. Our team responds quickly and helps you import confidently.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

