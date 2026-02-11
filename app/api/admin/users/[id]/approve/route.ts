import { NextResponse } from "next/server";
import { getMeFromToken } from "@/lib/mongo-auth";
import { approveUser } from "@/lib/auth-store";
import { approveUserMongo } from "@/lib/mongo-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const useMongo = !!process.env.MONGODB_URI;

/** PATCH /api/admin/users/[id]/approve - approve user (super_admin or admin only) */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    }
    const ok = useMongo ? await approveUserMongo(id, me.id) : await approveUser(id, me.id);
    if (!ok) {
      return NextResponse.json({ success: false, message: "User not found or already approved" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "User approved" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
