import { NextResponse, type NextRequest } from "next/server";
import { findSession } from "@/lib/auth-service";
import { getDatabase, type PublicUser } from "@/lib/database";
import { hasRoleAccess, type UserRole } from "@/lib/auth-policy";

const COOKIE_NAME = "modalab_session";

export function sessionCookieName(): string {
  return COOKIE_NAME;
}

export function requireRoles(
  request: NextRequest,
  allowedRoles: readonly UserRole[],
): { user: PublicUser; response: null } | { user: null; response: NextResponse } {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const user = token ? findSession(getDatabase(), token) : null;

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Se requiere una sesión activa." },
        { status: 401 },
      ),
    };
  }

  if (!hasRoleAccess(user.role, allowedRoles)) {
    return {
      user: null,
      response: NextResponse.json({ error: "Acceso denegado." }, { status: 403 }),
    };
  }

  return { user, response: null };
}
