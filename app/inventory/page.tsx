import { Metadata } from "next";
import { Suspense } from "react";
import InventoryPage from "@/components/inventory/InventoryPage";

export const metadata: Metadata = {
  title: "Premium Japanese Vehicle Inventory - 50,000+ Vehicles Available | Tradeware",
  description: "Browse our comprehensive inventory of over 50,000 premium Japanese vehicles sourced directly from Japan's largest auction network. Search by make, model, year, price range, specifications, and auction grade. All vehicles are export-ready with complete documentation packages. Trusted by 10,000+ customers worldwide for reliable Japanese vehicle imports.",
};

export default function Inventory() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InventoryPage />
    </Suspense>
  );
}
