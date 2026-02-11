import { NextResponse } from "next/server";
import { getMeFromToken } from "@/lib/mongo-auth";
import { assignRole } from "@/lib/auth-store";
import { assignRoleMongo } from "@/lib/mongo-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const useMongo = !!process.env.MONGODB_URI;

/** PATCH /api/admin/users/[id]/role - assign role (super_admin only) */
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
    if (!me || me.role !== "super_admin") {
      return NextResponse.json({ success: false, message: "Only Super Admin can assign roles" }, { status: 403 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    }
    const body = await req.json().catch(() => ({}));
    const role = String(body?.role ?? "").trim();
    if (!["super_admin", "admin", "staff", "client"].includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
    }
    const out = useMongo
      ? await assignRoleMongo(id, role, me.id)
      : await assignRole(id, role, me.id);
    if (!out.ok) {
      return NextResponse.json({ success: false, message: out.error ?? "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ success: true, message: "Role updated" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
