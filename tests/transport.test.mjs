import assert from "node:assert/strict";
import { createHmac, randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import session from "express-session";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";

const origin = "https://game.example.test:8443";
const proxyHeaders = {
  "X-Forwarded-Proto": "https",
  "CF-Connecting-IP": "192.0.2.7",
};

async function fixture(t, mode = "cloudflare-tunnel") {
  const directory = await mkdtemp(join(tmpdir(), "loop2-transport-"));
  let runtime, server, inspection;
  t.after(async () => {
    if (server) {
      server.closeAllConnections();
      await new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
    inspection?.close();
    runtime?.close();
    await rm(directory, { recursive: true, force: true });
  });
  const keys = [
    randomBytes(32).toString("base64url"),
    randomBytes(32).toString("base64url"),
  ];
  const secretFile = join(directory, "keys.json");
  const path = join(directory, "accounts.sqlite");
  await writeFile(secretFile, JSON.stringify(keys));
  runtime = await openAccountRuntime({
    LOOP2_DATABASE_PATH: path,
    LOOP2_SESSION_SECRET_FILE: secretFile,
    LOOP2_PUBLIC_ORIGIN: origin,
    LOOP2_PROXY_MODE: mode,
  });
  inspection = new DatabaseSync(path);
  const account = runtime.database.createAccount(
    "synthetic@example.test",
    runtime.dummyHash,
  );
  const app = createApp(runtime);
  // Test-only consumers exercise the production middleware, without adding account routes.
  app.get("/test-identity", (req, res) =>
    res.json({
      account: req.session?.accountId ?? null,
      address: res.locals.accountClientAddress,
    }),
  );
  app.post("/test-session", (req, res) => {
    if (!req.session) {
      res.sendStatus(403);
      return;
    }
    req.session.regenerate((error) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      req.session.accountId = account.id;
      req.session.save((failure) =>
        failure ? res.sendStatus(500) : res.json({ ok: true }),
      );
    });
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("HTTP readiness timeout")),
      5000,
    );
    server.once("listening", () => {
      clearTimeout(timer);
      resolve();
    });
    server.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
  const send = (path, { method = "GET", headers = {}, body } = {}) =>
    new Promise((resolve, reject) => {
      const outgoing = request(
        {
          hostname: "127.0.0.1",
          port: server.address().port,
          path,
          method,
          headers,
          agent: false,
        },
        (incoming) => {
          let data = "";
          incoming.setEncoding("utf8");
          incoming.on("data", (chunk) => {
            data += chunk;
          });
          incoming.on("error", reject);
          incoming.on("end", () => {
            clearTimeout(timer);
            resolve({
              status: incoming.statusCode,
              headers: incoming.headers,
              body: data,
            });
          });
        },
      );
      const timer = setTimeout(
        () => outgoing.destroy(new Error("HTTP deadline exceeded")),
        5000,
      );
      outgoing.on("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      outgoing.end(body);
    });
  return { runtime, inspection, keys, account, send };
}

function signedCookie(id, key) {
  const signature = createHmac("sha256", key)
    .update(id)
    .digest("base64")
    .replace(/=+$/, "");
  return `__Host-loop2.sid=${encodeURIComponent(`s:${id}.${signature}`)}`;
}

function seed(f, id, expiresAt = Date.now() + 86_400_000) {
  // D-99: 30 days from last activity; deliberately seed only one day remaining.
  const cookie = new session.Cookie({
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 2_592_000_000,
  });
  cookie.expires = new Date(expiresAt);
  cookie.originalMaxAge = 2_592_000_000;
  const data = JSON.stringify({ accountId: f.account.id, cookie });
  f.runtime.database.saveSession(id, {
    accountId: f.account.id,
    data,
    expiresAt,
  });
  return data;
}

test(
  "transport refuses ambiguous proxy metadata before loading live sessions",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-request-transport
    // Fault: accepting Express's first forwarded value or a joined IP list.
    const f = await fixture(t);
    const id = "live-transport-record";
    seed(f, id);
    const cookie = signedCookie(id, f.keys[0]);
    const before = f.runtime.database.readSession(id);
    const variants = [
      {},
      { "X-Forwarded-Proto": "https" },
      { ...proxyHeaders, "X-Forwarded-Proto": "http" },
      { ...proxyHeaders, "X-Forwarded-Proto": "https,http" },
      { ...proxyHeaders, "X-Forwarded-Proto": ["https", "https"] },
      { ...proxyHeaders, "CF-Connecting-IP": ["192.0.2.7", "192.0.2.7"] },
      ...[
        "192.0.2.7,192.0.2.8",
        "192.0.2.7:443",
        "unknown",
        "fe80::1%lo",
        "999.1.1.1",
        "",
      ].map((value) => ({ ...proxyHeaders, "CF-Connecting-IP": value })),
    ];
    for (const headers of variants) {
      const response = await f.send("/api/account", {
        headers: { ...headers, Cookie: cookie },
      });
      assert.equal(
        response.status,
        403,
        "invalid transport must refuse account request",
      );
      assert.equal(response.headers["set-cookie"], undefined);
      const asset = await f.send("/main.js", {
        headers: { ...headers, Cookie: cookie },
      });
      assert.equal(asset.status, 200);
      assert.equal(asset.headers["set-cookie"], undefined);
      assert.deepEqual(f.runtime.database.readSession(id), before);
    }
    // Valid transport reaches the session guard, which refuses the anonymous request.
    assert.equal(
      (await f.send("/api/account", { headers: proxyHeaders })).status,
      401,
    );
  },
);

test(
  "canonical transport identity ignores caller-selected forwarding chains",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-request-transport
    const f = await fixture(t);
    for (const [input, expected] of [
      ["2001:0DB8:0:0:0:0:0:1", "2001:db8::1"],
      ["2001:db8::1", "2001:db8::1"],
      ["::ffff:192.0.2.7", "192.0.2.7"],
      ["::FFFF:c000:0207", "192.0.2.7"],
      ["192.0.2.7", "192.0.2.7"],
    ]) {
      const result = await f.send("/test-identity", {
        headers: {
          ...proxyHeaders,
          "CF-Connecting-IP": input,
          "X-Forwarded-For": "198.51.100.1, 198.51.100.2",
          "X-Real-IP": "198.51.100.3",
          Forwarded: "for=198.51.100.4;proto=http",
          "X-Forwarded-Host": "evil.example",
        },
      });
      assert.equal(JSON.parse(result.body).address, expected);
    }
  },
);

test(
  "local proxy mode uses the peer and direct mode ignores forwarded HTTPS",
  { timeout: 20000 },
  async (t) => {
    const local = await fixture(t, "loopback-proxy");
    const result = await local.send("/test-identity", {
      headers: proxyHeaders,
    });
    assert.equal(JSON.parse(result.body).address, "127.0.0.1");
    const direct = await fixture(t, "direct");
    assert.equal(
      (await direct.send("/api/account", { headers: proxyHeaders })).status,
      403,
    );
  },
);

test(
  "mutation guards reject foreign origins, non-JSON and malformed bodies",
  { timeout: 20000 },
  async (t) => {
    // D-102. Expected credential fields are the following slice's work.
    const f = await fixture(t);
    const valid = {
      ...proxyHeaders,
      Origin: origin,
      "Content-Type": "application/json",
    };
    for (const value of [
      undefined,
      "null",
      "https://evil.example",
      origin + ".evil",
      origin + "/",
      [origin, origin],
    ]) {
      const headers = {
        ...valid,
        Host: "evil.example",
        "X-Forwarded-Host": "evil.example",
      };
      if (value === undefined) delete headers.Origin;
      else headers.Origin = value;
      const response = await f.send("/api/logout", {
        method: "POST",
        headers,
        body: "{}",
      });
      assert.equal(response.status, 403);
    }
    for (const [type, body, encoding, expected] of [
      ["text/plain", "{}", undefined, 415],
      ["application/x-www-form-urlencoded", "a=1", undefined, 415],
      ["application/json;other=value", "{}", undefined, 415],
      [["application/json", "application/json"], "{}", undefined, 415],
      ["application/json", "{}", "gzip", 415],
      ["application/json", "{}", ["identity", "identity"], 415],
      [
        "application/json",
        '{"value":"' + "x".repeat(16384) + '"}',
        undefined,
        413,
      ],
      ...["", " ", "{", "[]", "null", "7"].map((body) => [
        "application/json",
        body,
        undefined,
        400,
      ]),
    ]) {
      const headers = { ...valid, "Content-Type": type };
      if (encoding) headers["Content-Encoding"] = encoding;
      const response = await f.send("/api/accounts", {
        method: "POST",
        headers,
        body,
      });
      assert.equal(response.status, expected, `body/media refusal ${type}`);
      assert.match(response.headers["content-type"], /application\/json/);
      assert.equal(response.headers["set-cookie"], undefined);
    }
    for (const type of [
      "application/json",
      "application/json; charset=utf-8",
    ]) {
      assert.equal(
        (
          await f.send("/api/session", {
            method: "POST",
            headers: { ...valid, "Content-Type": type },
            body: "{}",
          })
        ).status,
        503,
      );
    }
    assert.equal(
      (await f.send("/api/unknown", { method: "POST" })).status,
      404,
    );
    // The canonical paths replace the earlier placeholders without aliases.
    for (const path of ["/api/register", "/api/login"]) {
      assert.equal(
        (await f.send(path, { method: "POST", headers: valid, body: "{}" }))
          .status,
        404,
        `${path} is no account route`,
      );
    }
  },
);

test(
  "rolling static responses use the newest signing key and touch real SQLite without rewriting identity",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-opaque-session-cookie
    // invariant: player-express-session-sqlite-store
    // Faults: middleware after static files, reversed secrets, resave=true, public cache.
    const f = await fixture(t);
    const id = "synthetic-old-session";
    const originalData = seed(f, id);
    const started = Date.now();
    const response = await f.send("/main.js", {
      headers: { ...proxyHeaders, Cookie: signedCookie(id, f.keys[1]) },
    });
    assert.equal(response.status, 200);
    const issued = response.headers["set-cookie"]?.[0];
    assert.ok(issued, "a valid asset request must renew the cookie");
    assert.ok(
      issued.split(";")[0] === signedCookie(id, f.keys[0]),
      "renewal must sign with the newest key",
    );
    for (const attribute of [
      /; Path=\//,
      /; HttpOnly/,
      /; Secure/,
      /; SameSite=Strict/,
    ])
      assert.ok(
        attribute.test(issued),
        `missing cookie attribute ${attribute}`,
      );
    assert.ok(!/; Domain=/i.test(issued), "host cookie must omit Domain");
    assert.equal(response.headers["cache-control"], "no-store");
    const row = f.runtime.database.readSession(id);
    assert.equal(
      row.data,
      originalData,
      "ordinary reads must touch rather than resave",
    );
    assert.ok(row.expiresAt >= started + 2_592_000_000);
    assert.ok(row.expiresAt <= Date.now() + 2_592_000_000);
    const expires = Date.parse(/; Expires=([^;]+)/.exec(issued)[1]);
    assert.ok(
      Math.abs(expires - row.expiresAt) < 1000,
      "HTTP date rounds to seconds",
    );
  },
);

test(
  "new opaque sessions persist in SQLite while anonymous and invalid cookies create nothing",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-opaque-session-cookie
    // invariant: player-express-session-sqlite-store
    const f = await fixture(t);
    for (const headers of [{}, proxyHeaders]) {
      const response = await f.send("/", { headers });
      assert.equal(response.status, 200);
      assert.equal(response.headers["set-cookie"], undefined);
    }
    assert.equal(
      f.inspection.prepare("SELECT count(*) AS n FROM sessions").get().n,
      0,
    );
    const created = await f.send("/test-session", {
      method: "POST",
      headers: proxyHeaders,
    });
    assert.equal(created.status, 200);
    const issued = created.headers["set-cookie"][0];
    for (const attribute of [
      /^__Host-loop2\.sid=/,
      /; Path=\//,
      /; HttpOnly/,
      /; Secure/,
      /; SameSite=Strict/,
    ])
      assert.ok(
        attribute.test(issued),
        `missing cookie attribute ${attribute}`,
      );
    assert.ok(!/; Domain=/i.test(issued), "host cookie must omit Domain");
    const row = f.inspection
      .prepare("SELECT id, account_id FROM sessions")
      .get();
    assert.ok(row, "real middleware must persist a real SQLite session");
    assert.notEqual(row.id, f.account.id);
    assert.equal(row.account_id, f.account.id);
    const cookie = issued.split(";")[0];
    assert.ok(
      cookie === signedCookie(row.id, f.keys[0]),
      "new cookie must sign its opaque SQLite ID with the newest key",
    );
    const valid = await f.send("/test-identity", {
      headers: { ...proxyHeaders, Cookie: cookie },
    });
    assert.equal(JSON.parse(valid.body).account, f.account.id);
    for (const invalid of [
      signedCookie(row.id, randomBytes(32).toString("base64url")),
      `__Host-loop2.sid=${row.id}`,
      signedCookie("absent", f.keys[0]),
    ]) {
      const response = await f.send("/test-identity", {
        headers: { ...proxyHeaders, Cookie: invalid },
      });
      assert.equal(
        JSON.parse(response.body).account,
        null,
        "invalid cookie cannot use the live account record",
      );
      assert.equal(response.headers["set-cookie"], undefined);
    }
    f.runtime.database.destroySession(row.id);
    const deleted = await f.send("/test-identity", {
      headers: { ...proxyHeaders, Cookie: cookie },
    });
    assert.equal(JSON.parse(deleted.body).account, null);
    assert.equal(deleted.headers["set-cookie"], undefined);
    assert.equal(
      f.inspection.prepare("SELECT count(*) AS n FROM sessions").get().n,
      0,
    );
  },
);
