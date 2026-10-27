import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  openAccountRuntime,
  readAccountConfiguration,
} from "../dist/server/configuration.js";
import { verifyPassword } from "../dist/server/passwords.js";

const entryPoint = fileURLToPath(
  new URL("../dist/server/main.js", import.meta.url),
);

async function freePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Port probe timeout")),
      5000,
    );
    probe.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    probe.listen(0, "127.0.0.1", () => {
      clearTimeout(timer);
      resolve();
    });
  });
  const { port } = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

const accountSettings = [
  "LOOP2_DATABASE_PATH",
  "LOOP2_SESSION_SECRET_FILE",
  "LOOP2_PUBLIC_ORIGIN",
  "LOOP2_PROXY_MODE",
];
function cleanEnvironment() {
  const environment = { ...process.env, NODE_ENV: "test" };
  for (const name of accountSettings) delete environment[name];
  return environment;
}

async function configurationFixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-startup-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const keyFile = join(directory, "keys.json");
  const keys = [
    randomBytes(32).toString("base64url"),
    randomBytes(32).toString("base64url"),
  ];
  await writeFile(keyFile, JSON.stringify(keys));
  return {
    directory,
    keyFile,
    keys,
    environment: {
      ...cleanEnvironment(),
      NODE_ENV: "production",
      LOOP2_DATABASE_PATH: join(directory, "accounts.sqlite"),
      LOOP2_SESSION_SECRET_FILE: keyFile,
      LOOP2_PUBLIC_ORIGIN: "https://game.example.test:8443",
      LOOP2_PROXY_MODE: "cloudflare-tunnel",
    },
  };
}

async function refusedStart(environment) {
  const result = spawnSync(process.execPath, [entryPoint], {
    encoding: "utf8",
    timeout: 5000,
    env: {
      ...environment,
      LOOP2_LISTEN_HOST: "127.0.0.1",
      LOOP2_LISTEN_PORT: String(await freePort()),
    },
  });
  // A weakened refusal can hang after printing readiness: assert the visible fault first.
  assert.doesNotMatch(result.stdout, /Loop: http:/);
  assert.equal(result.error, undefined, result.error?.message);
  assert.notEqual(result.status, 0);
  return result;
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
        ...cleanEnvironment(),
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
      ...cleanEnvironment(),
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
      env: { ...cleanEnvironment(), LOOP2_LISTEN_PORT: value },
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

test(
  "production missing settings and partial or invalid explicit configuration refuse readiness",
  { timeout: 60000 },
  async (t) => {
    // invariant: account-startup-configuration
    // Fault: production silently falls back to unconfigured static mode.
    const f = await configurationFixture(t);
    assert.match(
      (await refusedStart({ ...cleanEnvironment(), NODE_ENV: "production" }))
        .stderr,
      /LOOP2_DATABASE_PATH/,
    );
    for (const name of accountSettings) {
      const partial = { ...f.environment };
      delete partial[name];
      assert.match((await refusedStart(partial)).stderr, new RegExp(name));
    }
    assert.match(
      (
        await refusedStart({
          ...cleanEnvironment(),
          LOOP2_DATABASE_PATH: f.environment.LOOP2_DATABASE_PATH,
        })
      ).stderr,
      /LOOP2_SESSION_SECRET_FILE/,
    );
    for (const [setting, value] of [
      ["LOOP2_DATABASE_PATH", ":memory:"],
      ["LOOP2_DATABASE_PATH", ""],
      ["LOOP2_PROXY_MODE", "anything"],
      ["LOOP2_PROXY_MODE", "loopback-proxy"],
      ["LOOP2_PUBLIC_ORIGIN", "http://game.example.test"],
      ["LOOP2_PUBLIC_ORIGIN", "https://user:password@game.example.test"],
      ["LOOP2_PUBLIC_ORIGIN", "https://game.example.test/path"],
      ["LOOP2_PUBLIC_ORIGIN", "https://game.example.test/?query=1"],
      ["LOOP2_PUBLIC_ORIGIN", "https://game.example.test/#fragment"],
      ["LOOP2_SESSION_SECRET_FILE", join(f.directory, "missing")],
    ])
      assert.match(
        (await refusedStart({ ...f.environment, [setting]: value })).stderr,
        new RegExp(setting),
      );
  },
);

test(
  "secret files reject noncanonical keys, invalid UTF-8 and oversized or non-file input without echoing contents",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-startup-configuration
    // D-109's ordered 32-byte base64url format; decoding alone would admit aliases.
    const f = await configurationFixture(t);
    const noncanonical = "A".repeat(42) + "B";
    const invalid = [
      "not-json-private-sentinel",
      "{}",
      "[]",
      JSON.stringify([null]),
      JSON.stringify(["short"]),
      JSON.stringify([f.keys[0], f.keys[0]]),
      JSON.stringify([f.keys[0] + "="]),
      JSON.stringify([noncanonical]),
      Buffer.from([0xff, 0xfe]),
      " ".repeat(16385),
    ];
    for (const content of invalid) {
      await writeFile(f.keyFile, content);
      await assert.rejects(readAccountConfiguration(f.environment), (error) => {
        assert.equal(
          error.message,
          "Invalid or unavailable account configuration: LOOP2_SESSION_SECRET_FILE",
        );
        return true;
      });
    }
    await assert.rejects(
      readAccountConfiguration({
        ...f.environment,
        LOOP2_SESSION_SECRET_FILE: f.directory,
      }),
      /LOOP2_SESSION_SECRET_FILE/,
    );
    await writeFile(f.keyFile, " \n" + JSON.stringify(f.keys) + "\n ");
    const actual = await readAccountConfiguration({
      ...f.environment,
      LOOP2_PUBLIC_ORIGIN: "https://GAME.example.test:8443/",
    });
    assert.deepEqual(actual.secrets, f.keys);
    assert.equal(actual.publicOrigin, "https://game.example.test:8443");
    assert.equal(await readAccountConfiguration({ NODE_ENV: "test" }), null);
  },
);

test(
  "configured runtime has a real database and dummy hash and releases its connection",
  { timeout: 20000 },
  async (t) => {
    const f = await configurationFixture(t);
    const runtime = await openAccountRuntime(f.environment);
    try {
      assert.match(runtime.dummyHash, /^\$argon2id\$/);
      assert.equal(
        await verifyPassword(runtime.dummyHash, "unrelated synthetic password"),
        false,
      );
      assert.ok(
        runtime.database.createAccount("ready@example.test", runtime.dummyHash),
      );
    } finally {
      runtime.close();
      runtime.close();
    }
    assert.throws(() =>
      runtime.database.findAccountByEmail("ready@example.test"),
    );
    const reopened = new DatabaseSync(f.environment.LOOP2_DATABASE_PATH);
    try {
      assert.equal(
        reopened.prepare("SELECT count(*) AS n FROM accounts").get().n,
        1,
      );
    } finally {
      reopened.close();
    }
  },
);

test(
  "configured startup refuses unknown schema and unavailable database before readiness",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-schema-lifecycle
    const f = await configurationFixture(t);
    const future = new DatabaseSync(f.environment.LOOP2_DATABASE_PATH);
    future.exec("PRAGMA user_version = 99");
    future.close();
    assert.match(
      (await refusedStart(f.environment)).stderr,
      /LOOP2_DATABASE_PATH/,
    );
    const check = new DatabaseSync(f.environment.LOOP2_DATABASE_PATH);
    try {
      assert.equal(check.prepare("PRAGMA user_version").get().user_version, 99);
    } finally {
      check.close();
    }
    assert.match(
      (
        await refusedStart({
          ...f.environment,
          LOOP2_DATABASE_PATH: join(f.directory, "absent", "db.sqlite"),
        })
      ).stderr,
      /LOOP2_DATABASE_PATH/,
    );
  },
);

test(
  "configured process becomes ready with public health response and exits on shutdown",
  { timeout: 20000 },
  async (t) => {
    const f = await configurationFixture(t);
    const port = await freePort();
    const child = spawn(process.execPath, [entryPoint], {
      env: {
        ...f.environment,
        LOOP2_LISTEN_HOST: "127.0.0.1",
        LOOP2_LISTEN_PORT: String(port),
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "",
      stderr = "";
    child.stdout.on("data", (value) => {
      stdout += value;
    });
    child.stderr.on("data", (value) => {
      stderr += value;
    });
    const exited = new Promise((resolve) =>
      child.once("exit", (code, signal) => resolve({ code, signal })),
    );
    try {
      await new Promise((resolve, reject) => {
        const deadline = setTimeout(
          () => reject(new Error(`Readiness timeout: ${stderr}`)),
          5000,
        );
        child.stdout.on("data", () => {
          if (stdout.includes(`Loop: http://127.0.0.1:${port}`)) {
            clearTimeout(deadline);
            resolve();
          }
        });
        child.once("error", (error) => {
          clearTimeout(deadline);
          reject(error);
        });
        child.once("exit", () => {
          clearTimeout(deadline);
          reject(new Error(`Premature exit: ${stderr}`));
        });
      });
      const response = await fetch(`http://127.0.0.1:${port}/`, {
        signal: AbortSignal.timeout(5000),
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("set-cookie"), null);
      await response.arrayBuffer();
      const unavailable = await fetch(`http://127.0.0.1:${port}/api/account`, {
        signal: AbortSignal.timeout(5000),
      });
      assert.equal(unavailable.status, 403);
      await unavailable.arrayBuffer();
    } finally {
      child.kill("SIGTERM");
      const timer = setTimeout(() => child.kill("SIGKILL"), 6000);
      const result = await exited;
      clearTimeout(timer);
      assert.notEqual(
        result.signal,
        "SIGKILL",
        "shutdown must release resources promptly",
      );
      if (process.platform !== "win32") assert.equal(result.code, 0);
    }
  },
);
