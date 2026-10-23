import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const entryPoint = fileURLToPath(
  new URL("../dist/server/main.js", import.meta.url),
);

async function freePort() {
  const probe = createServer();
  await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

test("exits with an error instead of reporting ready when its listening port is occupied", async () => {
  const blocker = createServer();
  await new Promise((resolve, reject) => {
    blocker.once("error", reject);
    blocker.listen(0, "127.0.0.1", resolve);
  });
  const { port } = blocker.address();

  try {
    const result = spawnSync(process.execPath, [entryPoint], {
      encoding: "utf8",
      timeout: 5000,
      env: {
        ...process.env,
        LOOP2_LISTEN_HOST: "127.0.0.1",
        LOOP2_LISTEN_PORT: String(port),
      },
    });

    assert.equal(result.error, undefined, result.error?.message);
    assert.notEqual(
      result.status,
      0,
      "server process must report a startup failure",
    );
    assert.match(
      result.stderr,
      new RegExp(String.raw`127\.0\.0\.1:${port}(?!\d)`),
    );
    assert.match(result.stderr, /EADDRINUSE/);
    assert.doesNotMatch(result.stdout, /Loop: http:/);
  } finally {
    await new Promise((resolve, reject) =>
      blocker.close((error) => (error ? reject(error) : resolve())),
    );
  }
});

test("listens on the address given by LOOP2_LISTEN_HOST and LOOP2_LISTEN_PORT", async () => {
  const port = await freePort();
  const child = spawn(process.execPath, [entryPoint], {
    env: {
      ...process.env,
      LOOP2_LISTEN_HOST: "127.0.0.1",
      LOOP2_LISTEN_PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  try {
    const line = await new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error("no readiness line within 5s")),
        5000,
      );
      let out = "";
      child.stdout.on("data", (chunk) => {
        out += chunk;
        if (out.includes("\n")) {
          clearTimeout(timer);
          resolve(out.trim());
        }
      });
      child.once("exit", (code) => {
        clearTimeout(timer);
        reject(new Error(`server exited early with ${code}`));
      });
    });
    assert.equal(line, `Loop: http://127.0.0.1:${port}`);
  } finally {
    child.kill();
  }
});

for (const value of ["0", "65536", "abc", "3000x", ""]) {
  test(`rejects LOOP2_LISTEN_PORT=${JSON.stringify(value)} without a readiness line`, () => {
    const result = spawnSync(process.execPath, [entryPoint], {
      encoding: "utf8",
      timeout: 5000,
      env: { ...process.env, LOOP2_LISTEN_PORT: value },
    });

    assert.equal(result.error, undefined, result.error?.message);
    assert.notEqual(
      result.status,
      0,
      "invalid port must make the process exit non-zero",
    );
    assert.ok(
      result.stderr.includes(JSON.stringify(value)),
      `stderr must name the value: ${result.stderr}`,
    );
    assert.doesNotMatch(result.stdout, /Loop: http:/);
  });
}
