import assert from "node:assert/strict";
import test from "node:test";
import { hasRoleAccess, isLoginPayload } from "@/lib/auth-policy";

test("A01: validates login input partitions and field limits", () => {
  assert.equal(
    isLoginPayload({ email: "admin@modalab.test", password: "Demo-Password-1!" }),
    true,
  );
  assert.equal(isLoginPayload({ email: "not-an-email", password: "secret" }), false);
  assert.equal(isLoginPayload({ email: "seller@modalab.test", password: "" }), false);
  assert.equal(isLoginPayload(null), false);

  const maximumEmail = `${"a".repeat(250)}@x.co`;
  const oversizedEmail = `${"a".repeat(251)}@x.co`;
  assert.equal(maximumEmail.length, 255);
  assert.equal(isLoginPayload({ email: maximumEmail, password: "x" }), true);
  assert.equal(isLoginPayload({ email: oversizedEmail, password: "x" }), false);
  assert.equal(
    isLoginPayload({ email: "seller@modalab.test", password: "x".repeat(256) }),
    true,
  );
  assert.equal(
    isLoginPayload({ email: "seller@modalab.test", password: "x".repeat(257) }),
    false,
  );
});

test("A01: permits only roles explicitly listed for a route", () => {
  assert.equal(hasRoleAccess("admin", ["admin"]), true);
  assert.equal(hasRoleAccess("seller", ["admin"]), false);
  assert.equal(hasRoleAccess("seller", ["admin", "seller"]), true);
});
