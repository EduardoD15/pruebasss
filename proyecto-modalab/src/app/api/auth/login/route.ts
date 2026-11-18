import { NextResponse, type NextRequest } from "next/server";
import { authenticate } from "@/lib/auth-service";
import { sessionCookieName } from "@/lib/api-auth";
import { getDatabase } from "@/lib/database";
import { isLoginPayload } from "@/lib/auth-policy";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud debe ser JSON válido." },
      { status: 400 },
    );
  }

  if (!isLoginPayload(payload)) {
    return NextResponse.json(
      { error: "Ingresa un correo y una contraseña válidos." },
      { status: 400 },
    );
  }

  const result = await authenticate(
    getDatabase(),
    payload.email,
    payload.password,
  );
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const response = NextResponse.json({ user: result.user });
  response.cookies.set(sessionCookieName(), result.token, {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return response;
}
