import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

test("compiled Argon2 APIs share bounded admission and recover both slots after an API error", () => {
  // invariant: password-operation-gate
  const source = String.raw`
    import assert from "node:assert/strict";
    import { hashPassword, PasswordCapacityError, verifyPassword } from "./dist/server/passwords.js";

    const password = "  exact password 🙂  ";
    const encoded = await hashPassword(password);

    const mixedHash = hashPassword(password);
    const mixedVerify = verifyPassword(encoded, password);
    await assert.rejects(hashPassword(password), PasswordCapacityError);
    await assert.rejects(verifyPassword(encoded, password), PasswordCapacityError);
    await Promise.all([mixedHash, mixedVerify]);

    const hashes = [hashPassword(password), hashPassword(password)];
    await assert.rejects(hashPassword(password), PasswordCapacityError);
    await Promise.all(hashes);

    const verifications = [verifyPassword(encoded, password), verifyPassword(encoded, password)];
    await assert.rejects(verifyPassword(encoded, password), PasswordCapacityError);
    await Promise.all(verifications);

    await assert.rejects(verifyPassword("not-an-encoded-argon2-hash", password));
    const afterErrorHash = hashPassword(password);
    const afterErrorVerify = verifyPassword(encoded, password);
    await assert.rejects(hashPassword(password), PasswordCapacityError);
    await Promise.all([afterErrorHash, afterErrorVerify]);
  `;
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", source],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 1024 * 1024,
    },
  );

  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});

test("compiled password operations create and verify the production Argon2id profile", () => {
  const source = String.raw`
    import assert from "node:assert/strict";
    import { hashPassword, verifyPassword } from "./dist/server/passwords.js";
    const encoded = await hashPassword("  exact password 🙂  ");
    assert.match(encoded, /^\$argon2id\$v=19\$m=65536,p=1,t=3\$/);
    assert.equal(await verifyPassword(encoded, "  exact password 🙂  "), true);
    assert.equal(await verifyPassword(encoded, "exact password 🙂"), false);
  `;
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", source],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 1024 * 1024,
    },
  );

  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});
