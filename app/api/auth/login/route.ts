import { NextResponse } from "next/server";
import { loginUserFile, verifyOtpByEmail } from "@/lib/auth-store";
import { loginUser as loginUserMongo, verifyOtpByEmailMongo } from "@/lib/mongo-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Login: MongoDB if MONGODB_URI set (Vercel), else file-based (local). Optional OTP verifies and is cleared before password check. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");
  const otp = body?.otp != null ? String(body.otp).trim() : undefined;

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    );
  }

  const useMongo = !!process.env.MONGODB_URI;

  try {
    if (otp) {
      const verified = useMongo
        ? await verifyOtpByEmailMongo(email, otp)
        : await verifyOtpByEmail(email, otp);
      if (!verified) {
        return NextResponse.json(
          { success: false, message: "Invalid or expired OTP. Check your email and try again." },
          { status: 401 }
        );
      }
    }
    const result = useMongo
      ? await loginUserMongo(email, password)
      : await loginUserFile(email, password);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Login failed";
    const status = msg.includes("Invalid") ? 401 : 500;
    return NextResponse.json({ success: false, message: msg }, { status });
  }
}
