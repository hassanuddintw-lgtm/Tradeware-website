import { NextResponse } from "next/server";
import { loginUserFile } from "@/lib/auth-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Login: file-based (works without MongoDB/backend) */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const result = await loginUserFile(email, password);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Login failed";
    const status = msg.includes("Invalid") ? 401 : 500;
    return NextResponse.json({ success: false, message: msg }, { status });
  }
}
