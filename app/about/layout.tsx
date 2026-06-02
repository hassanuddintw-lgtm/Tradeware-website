import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Tradeware Group — a trusted Japanese car import marketplace connecting customers worldwide with inspected vehicles, transparent pricing, and reliable logistics from Japan.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

