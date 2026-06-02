import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Tradeware Group shipping destinations and country-specific guidance for importing Japanese cars, estimated timelines, documentation, and recommended next steps.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

