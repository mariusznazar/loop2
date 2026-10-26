import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

import {
  PasswordCapacityError,
  withPasswordCapacity,
} from "../dist/server/passwords.js";

test("password capacity refuses excess work and is released after success or failure", async () => {
  // invariant: password-operation-gate
  let releaseFirst;
  let releaseSecond;
  const first = withPasswordCapacity(
    () => new Promise((resolve) => (releaseFirst = resolve)),
  );
  const second = withPasswordCapacity(
    () => new Promise((resolve) => (releaseSecond = resolve)),
  );

  await assert.rejects(
    withPasswordCapacity(async () => "unreachable"),
    PasswordCapacityError,
  );
  releaseFirst("done");
  releaseSecond("done");
  await Promise.all([first, second]);
  await assert.rejects(
    withPasswordCapacity(async () => {
      throw new Error("operation failed");
    }),
    /operation failed/,
  );
  assert.equal(
    await withPasswordCapacity(async () => "available"),
    "available",
  );
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
