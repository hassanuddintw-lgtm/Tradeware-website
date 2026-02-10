import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Proxy to backend or return default config when backend is unavailable */
export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/public/config`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json(data);
  } catch {
    /* backend unreachable */
  }
  return NextResponse.json({ data: siteConfig });
}
