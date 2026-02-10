import { NextResponse } from "next/server";
import { registerUserFile } from "@/lib/auth-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Register: file-based (works without MongoDB/backend) */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");
  const phone = body?.phone ? String(body.phone).trim() : undefined;

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: "Name, email and password are required" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { success: false, message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    const result = await registerUserFile({ name, email, password, phone });
    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Registration failed";
    const dup = msg.includes("already exists");
    return NextResponse.json(
      { success: false, message: msg },
      { status: dup ? 400 : 500 }
    );
  }
}
