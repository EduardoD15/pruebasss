import { NextResponse, type NextRequest } from "next/server";
import { requireRoles } from "@/lib/api-auth";
import { getDatabase, listPublicUsers } from "@/lib/database";

export const runtime = "nodejs";

export function GET(request: NextRequest) {
  const access = requireRoles(request, ["admin"]);
  if (!access.user) return access.response;

  return NextResponse.json({ users: listPublicUsers(getDatabase()) });
}
