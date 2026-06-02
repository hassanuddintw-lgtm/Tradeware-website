import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tradeware Group blog: Japanese car import guides, auction insights, shipping updates, buying tips, and FAQs to help you make confident decisions.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

