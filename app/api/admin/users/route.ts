import { NextResponse } from "next/server";
import { getMeFromToken } from "@/lib/mongo-auth";
import { getUsersForAdmin } from "@/lib/auth-store";
import { getUsersForAdminMongo } from "@/lib/mongo-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const useMongo = !!process.env.MONGODB_URI;

/** GET /api/admin/users - list users (super_admin or admin only) */
export async function GET(req: Request) {
  try {
    const auth = req.headers.get("Authorization");
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const result = await getMeFromToken(token);
    const me = result.data;
    if (!me || (me.role !== "super_admin" && me.role !== "admin")) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }
    const users = useMongo ? await getUsersForAdminMongo() : await getUsersForAdmin();
    return NextResponse.json({ success: true, data: users });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
