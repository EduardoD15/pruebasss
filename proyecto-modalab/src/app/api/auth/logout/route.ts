import { NextResponse, type NextRequest } from "next/server";
import { revokeSession } from "@/lib/auth-service";
import { getDatabase } from "@/lib/database";
import { sessionCookieName } from "@/lib/api-auth";

export const runtime = "nodejs";

export function POST(request: NextRequest) {
  const token = request.cookies.get(sessionCookieName())?.value;
  if (token) revokeSession(getDatabase(), token);

  const response = NextResponse.json({ message: "Sesión cerrada." });
  response.cookies.set(sessionCookieName(), "", {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
