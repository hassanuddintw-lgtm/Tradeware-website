import { NextResponse } from "next/server";
import { getMeFromToken } from "@/lib/mongo-auth";
import { getUsersForAdmin } from "@/lib/auth-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** GET /api/admin/users - list users (admin only) */
export async function GET(req: Request) {
  try {
    const auth = req.headers.get("Authorization");
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const result = await getMeFromToken(token);
    const me = result.data;
    if (!me || me.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin only" }, { status: 403 });
    }
    const users = await getUsersForAdmin();
    return NextResponse.json({ success: true, data: users });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
