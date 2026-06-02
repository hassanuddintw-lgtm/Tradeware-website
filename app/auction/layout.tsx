import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auctions",
  description:
    "Browse live and upcoming Japanese car auctions with Tradeware Group. Track listings, view auction details, and get support bidding and importing from Japan.",
  alternates: { canonical: "/auction" },
};

export default function AuctionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

