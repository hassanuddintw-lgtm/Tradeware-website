"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Copy, Check } from "lucide-react";

const breadcrumbs = [
  { label: "Home", href: routes.home },
  { label: "Bank Details", href: routes.bankDetails },
];

const foreignRemittance = [
  { label: "Name of Bank", value: "MUFG Bank, Ltd." },
  { label: "Bank Address", value: "Konnawa 1905, Konnawaoda Hitokowa, Japan" },
  { label: "Account Name", value: "MD & CORPORATION CO., LTD" },
  { label: "Bank Code", value: "0019" },
  { label: "Branch Code", value: "190" },
  { label: "SWIFT Code", value: "BOTKJPJT" },
  { label: "Account No", value: "0097014" },
];

const localAccount = [
  { label: "Name of Bank", value: "MUFG Bank, Ltd." },
  { label: "Bank Address", value: "Konnawa 1905, Konnawaoda Hitokowa, Japan" },
  { label: "Account Name", value: "MD & CORPORATION CO., LTD" },
  { label: "Bank Code", value: "0019" },
  { label: "Branch Code", value: "190" },
  { label: "Account No", value: "0296994" },
];

function BankDetailBlock({
  title,
  rows,
  onCopy,
}: {
  title: string;
  rows: { label: string; value: string }[];
  onCopy: (text: string) => void;
}) {
  const fullText = rows.map((r) => `${r.label}: ${r.value}`).join("\n");
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-blue-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-2 text-slate-700">
            <span className="text-red-500 mt-0.5">•</span>
            <span><strong className="text-slate-900">{row.label}:</strong> {row.value}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onCopy(fullText)}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
      >
        Copy
      </button>
    </div>
  );
}

export default function BankDetailsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-0 pb-16">
      <div className="container-custom max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href={breadcrumbs[0].href} className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Bank Details</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Official Bank Details</h1>
        <p className="text-red-600 text-sm font-semibold mb-10">
          Official bank information for instructions. Please use the following bank details for wires and telex payments.
        </p>

        <div className="space-y-8">
          <BankDetailBlock
            title="Foreign Remittance Account"
            rows={foreignRemittance}
            onCopy={handleCopy}
          />
          <BankDetailBlock
            title="Local Bank Account (Yen To Yen)"
            rows={localAccount}
            onCopy={handleCopy}
          />

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Pay with PayPal</h3>
            <p className="text-slate-600 text-sm mb-6">
              Use PayPal for fast and secure international payments. Enter your details below and click &quot;Pay Now&quot; to proceed.
            </p>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Enter your Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Pay (JPY)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
              >
                Pay Now
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">Visa, Mastercard, American Express, Discover accepted. PayPal Secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
