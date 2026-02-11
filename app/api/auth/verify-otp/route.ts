import { NextResponse } from "next/server";
import { verifyOtpByEmail } from "@/lib/auth-store";
import { verifyOtpByEmailMongo } from "@/lib/mongo-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** POST /api/auth/verify-otp - Verify OTP sent to email (e.g. after signup). Body: { email, otp } */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim();
  const otp = String(body?.otp ?? "").trim();

  if (!email || !otp) {
    return NextResponse.json(
      { success: false, message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  const useMongo = !!process.env.MONGODB_URI;
  const verified = useMongo
    ? await verifyOtpByEmailMongo(email, otp)
    : await verifyOtpByEmail(email, otp);

  if (!verified) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired OTP. Check your email and try again." },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, message: "Email verified. You can now sign in." });
}
