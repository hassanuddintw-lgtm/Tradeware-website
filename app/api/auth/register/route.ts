import { NextResponse } from "next/server";
import { registerUserFile } from "@/lib/auth-store";
import { registerUser as registerUserMongo } from "@/lib/mongo-auth";
import { sendWelcomeEmailWithOtp } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Register: MongoDB if MONGODB_URI set (Vercel), else file-based (local). Sends welcome email with OTP for new clients. */
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

  const useMongo = !!process.env.MONGODB_URI;

  try {
    const result = useMongo
      ? await registerUserMongo({ name, email, password, phone })
      : await registerUserFile({ name, email, password, phone });

    // Send welcome email with OTP when we have otpForEmail (new client signup)
    const otpForEmail = result.data && "otpForEmail" in result.data ? (result.data as { otpForEmail?: string }).otpForEmail : undefined;
    if (otpForEmail && result.data?.user) {
      try {
        await sendWelcomeEmailWithOtp(email, result.data.user.name || name, otpForEmail);
      } catch (e) {
        console.error("Send welcome email failed:", e);
        // Don't fail registration if email fails
      }
    }

    // Don't expose otpForEmail to client
    const clientResult = result.data
      ? { ...result, data: { user: result.data.user } }
      : result;
    return NextResponse.json(clientResult, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Registration failed";
    const dup = msg.includes("already exists");
    return NextResponse.json(
      { success: false, message: msg },
      { status: dup ? 400 : 500 }
    );
  }
}
