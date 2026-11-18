import { randomBytes, scrypt, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 1 << 13, r: 8, p: 1, maxmem: 32 * 1024 * 1024 };

export function createPasswordHash(password: string): {
  salt: string;
  hash: string;
} {
  const salt = randomBytes(16).toString("hex");
  return {
    salt,
    hash: scryptSync(password, salt, KEY_LENGTH, SCRYPT_OPTIONS).toString("hex"),
  };
}

export async function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string,
): Promise<boolean> {
  const actual = await new Promise<Buffer>((resolve, reject) => {
    scrypt(
      password,
      salt,
      KEY_LENGTH,
      SCRYPT_OPTIONS,
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
