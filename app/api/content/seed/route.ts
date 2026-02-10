import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Proxy POST /api/content/seed to backend */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error("Content seed proxy error:", e);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
