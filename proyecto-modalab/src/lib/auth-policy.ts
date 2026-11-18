export type UserRole = "admin" | "seller";

export const MAX_FAILED_ATTEMPTS = 3;
export const LOCK_DURATION_MS = 15 * 60 * 1000;

export function isLoginPayload(value: unknown): value is {
  email: string;
  password: string;
} {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.email === "string" &&
    candidate.email.length <= 255 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email.trim()) &&
    typeof candidate.password === "string" &&
    candidate.password.length > 0 &&
    candidate.password.length <= 256
  );
}

export function hasRoleAccess(
  userRole: UserRole,
  allowedRoles: readonly UserRole[],
): boolean {
  return allowedRoles.includes(userRole);
}
