import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Proxy GET /api/content/:key to backend */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  const auth = req.headers.get("authorization");
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/${encodeURIComponent(key)}`, {
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error("Content proxy GET error:", e);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

/** Proxy PUT /api/content/:key to backend */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  const auth = req.headers.get("authorization");
  let body: string | undefined;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body,
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error("Content proxy PUT error:", e);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
