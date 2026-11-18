import { NextResponse, type NextRequest } from "next/server";
import { findSession } from "@/lib/auth-service";
import { getDatabase } from "@/lib/database";
import { sessionCookieName } from "@/lib/api-auth";

export const runtime = "nodejs";

export function GET(request: NextRequest) {
  const token = request.cookies.get(sessionCookieName())?.value;
  const user = token ? findSession(getDatabase(), token) : null;
  if (!user) {
    return NextResponse.json(
      { error: "Se requiere una sesión activa." },
      { status: 401 },
    );
  }
  return NextResponse.json({ user });
}
