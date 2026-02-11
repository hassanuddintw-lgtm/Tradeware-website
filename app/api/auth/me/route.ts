import { NextResponse } from "next/server";
import { getMeFromToken, getStatusByIdMongo } from "@/lib/mongo-auth";
import { getStatusById } from "@/lib/auth-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const useMongo = !!process.env.MONGODB_URI;

/** /me: decode JWT and return latest status (so approved users get access on refresh) */
export async function GET(req: Request) {
  try {
    const auth = req.headers.get("Authorization");
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const result = await getMeFromToken(token);
    if (result.data?.role === "client" && result.data?.id) {
      const latestStatus = useMongo
        ? await getStatusByIdMongo(result.data.id)
        : await getStatusById(result.data.id);
      if (latestStatus) result.data.status = latestStatus;
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
