import assert from "node:assert/strict";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import session from "express-session";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";
import { hashPassword } from "../dist/server/passwords.js";

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
  const smtpPasswordFile = join(directory, "smtp-password");
  await writeFile(smtpPasswordFile, "synthetic-smtp-password");
  runtime = await openAccountRuntime({
    LOOP2_DATABASE_PATH: path,
    LOOP2_SESSION_SECRET_FILE: secretFile,
    LOOP2_PUBLIC_ORIGIN: origin,
    LOOP2_PROXY_MODE: mode,
    LOOP2_MAIL_FROM: "sender@mail.example.test",
    LOOP2_SMTP_HOST: "smtp.example.test",
    LOOP2_SMTP_PORT: "587",
    LOOP2_SMTP_USER: "sender@mail.example.test",
    LOOP2_SMTP_PASSWORD_FILE: smtpPasswordFile,
  });
  inspection = new DatabaseSync(path);
  const account = runtime.database.createAccount(
    "synthetic@example.test",
    runtime.dummyHash,
  );
  // D-163: a stand-in mailer records what it is handed and reaches no server.
  const mailer = {
    messages: [],
    send(message) {
      mailer.messages.push(message);
      return Promise.resolve("sent");
    },
  };
  const app = createApp({ ...runtime, mailer });
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
  return { runtime, inspection, keys, account, mailer, send };
}

function signedCookie(id, key) {
  const signature = createHmac("sha256", key)
    .update(id)
    .digest("base64")
    .replace(/=+$/, "");
  return `__Host-loop2.sid=${encodeURIComponent(`s:${id}.${signature}`)}`;
}

// A confirmation link recorded for the account, with the token it was made of.
function issueLink(f, accountId) {
  const token = randomBytes(32).toString("base64url");
  const outcome = f.runtime.database.issueLink(
    {
      accountId,
      purpose: "email-confirmation",
      tokenDigest: createHash("sha256").update(token).digest("base64url"),
      lifetimeMs: 86_400_000,
    },
    { windowMs: 3_600_000, total: 30, perAccount: 3 },
  );
  assert.equal(outcome, "issued", "precondition: a link is recorded");
  return token;
}

function seed(f, id, expiresAt = Date.now() + 86_400_000) {
  // D-101: 30 days from last activity; deliberately seed only one day remaining.
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
  "transport refuses all three link routes before the session, the link or the mail service",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-request-transport
    // Fault: a new account route outside the transport gate.
    const f = await fixture(t);
    const id = "link-transport-record";
    seed(f, id);
    const cookie = signedCookie(id, f.keys[0]);
    const before = f.runtime.database.readSession(id);
    const token = issueLink(f, f.account.id);
    const state = () =>
      f.inspection
        .prepare(
          "SELECT email_confirmed_at AS at, (SELECT count(*) FROM emailed_links) AS links FROM accounts WHERE id = ?",
        )
        .get(f.account.id);
    const unchanged = state();
    const routes = [
      ["/api/email-confirmation", { token }],
      ["/api/email-confirmation-message", {}],
      ["/api/password-reset-message", { email: f.account.email }],
    ];
    for (const headers of [
      {},
      { "X-Forwarded-Proto": "https" },
      { ...proxyHeaders, "X-Forwarded-Proto": "http" },
      { ...proxyHeaders, "X-Forwarded-Proto": "https,http" },
      { ...proxyHeaders, "CF-Connecting-IP": ["192.0.2.7", "192.0.2.7"] },
      { ...proxyHeaders, "CF-Connecting-IP": "192.0.2.7,192.0.2.8" },
    ]) {
      for (const [path, body] of routes) {
        const response = await f.send(path, {
          method: "POST",
          headers: {
            ...headers,
            Origin: origin,
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          body: JSON.stringify(body),
        });
        const name = `${path} ${JSON.stringify(headers)}`;
        assert.equal(response.status, 403, name);
        assert.equal(response.headers["cache-control"], "no-store", name);
        assert.equal(response.headers["set-cookie"], undefined, name);
        assert.deepEqual(f.runtime.database.readSession(id), before, name);
        assert.deepEqual(state(), unchanged, name);
        assert.equal(f.mailer.messages.length, 0, name);
      }
    }
    // Valid transport reaches the routes. The account is still unconfirmed
    // when the reset request comes, so nothing follows its answer.
    const valid = {
      ...proxyHeaders,
      Origin: origin,
      "Content-Type": "application/json",
    };
    const asked = await f.send("/api/password-reset-message", {
      method: "POST",
      headers: valid,
      body: JSON.stringify({ email: f.account.email }),
    });
    assert.equal(asked.status, 204);
    const confirmed = await f.send("/api/email-confirmation", {
      method: "POST",
      headers: valid,
      body: JSON.stringify({ token }),
    });
    assert.equal(confirmed.status, 204);
    const resent = await f.send("/api/email-confirmation-message", {
      method: "POST",
      headers: valid,
      body: "{}",
    });
    assert.equal(resent.status, 401, "no session reaches the session guard");
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
    // D-104.
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
    // Accepted media reach the login route, which answers an unknown address.
    for (const type of [
      "application/json",
      "application/json; charset=utf-8",
    ]) {
      const response = await f.send("/api/session", {
        method: "POST",
        headers: { ...valid, "Content-Type": type },
        body: JSON.stringify({
          email: "unknown@example.test",
          password: "unknown account password",
        }),
      });
      assert.equal(response.status, 401, type);
      assert.equal(
        JSON.parse(response.body).error,
        "Nieprawidłowy adres e-mail lub hasło.",
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
  "refused state-changing requests change no account or session and do no password work",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-mutation-request-guards
    // Faults: a guard missing from one state-changing route, a guard run after
    // its route, and field checks that coerce or ignore unexpected fields.
    const f = await fixture(t);
    const secret = "  guarded password 🙂  ";
    const known = f.runtime.database.createAccount(
      "guarded@example.test",
      await hashPassword(secret),
    );
    assert.ok(known, "precondition: an account with a known password");
    const live = "guarded-live-session";
    seed(f, live);
    const cookie = signedCookie(live, f.keys[0]);
    const stored = f.runtime.database.readSession(live);
    // D-101: a request with a valid session renews that same session, refused or not.
    const renewal = signedCookie(live, f.keys[0]);
    const count = (table) =>
      f.inspection.prepare(`SELECT count(*) AS n FROM ${table}`).get().n;
    // A link of another account, so that confirming it and asking for a
    // message to the session's account would both succeed.
    const linked = f.runtime.database.createAccount(
      "linked@example.test",
      f.runtime.dummyHash,
    );
    const token = issueLink(f, linked.id);
    const confirmed = () =>
      f.inspection
        .prepare(
          "SELECT count(*) AS n FROM accounts WHERE email_confirmed_at IS NOT NULL",
        )
        .get().n;
    // An account with a confirmed address, so that a request for a reset
    // link to it would record a link and hand a message on if it were admitted.
    f.runtime.database.createAccount("reset@example.test", f.runtime.dummyHash);
    f.inspection
      .prepare(
        "UPDATE accounts SET email_confirmed_at = ? WHERE email = 'reset@example.test'",
      )
      .run(Date.now());
    const confirmedBefore = confirmed();
    const accounts = count("accounts");
    // Each body would succeed if its request were admitted.
    const routes = [
      [
        "/api/accounts",
        {
          email: "created@example.test",
          password: secret,
          passwordConfirmation: secret,
        },
      ],
      ["/api/session", { email: "guarded@example.test", password: secret }],
      ["/api/logout", {}],
      ["/api/email-confirmation", { token }],
      ["/api/email-confirmation-message", {}],
      ["/api/password-reset-message", { email: "reset@example.test" }],
    ];
    const json = (value) => () => JSON.stringify(value);
    const variants = (fields) => [
      ["missing origin", { Origin: undefined }, null, 403],
      ["null origin", { Origin: "null" }, null, 403],
      ["foreign origin", { Origin: "https://evil.example" }, null, 403],
      ["suffix origin", { Origin: `${origin}.evil` }, null, 403],
      ["origin with path", { Origin: `${origin}/` }, null, 403],
      [
        "origin without port",
        { Origin: "https://game.example.test" },
        null,
        403,
      ],
      ["malformed origin", { Origin: `${origin}:1` }, null, 403],
      ["duplicate origin", { Origin: [origin, origin] }, null, 403],
      ["missing media", { "Content-Type": undefined }, null, 415],
      ["text media", { "Content-Type": "text/plain" }, null, 415],
      [
        "form media",
        { "Content-Type": "application/x-www-form-urlencoded" },
        null,
        415,
      ],
      [
        "parameterized media",
        { "Content-Type": "application/json;other=value" },
        null,
        415,
      ],
      [
        "duplicate media",
        { "Content-Type": ["application/json", "application/json"] },
        null,
        415,
      ],
      ["compressed", { "Content-Encoding": "gzip" }, null, 415],
      [
        "duplicate encoding",
        { "Content-Encoding": ["identity", "identity"] },
        null,
        415,
      ],
      [
        "oversized",
        {},
        json({ ...fields, padding: "x".repeat(16 * 1024) }),
        413,
      ],
      ["empty body", {}, () => "", 400],
      ["broken body", {}, () => "{", 400],
      ["array body", {}, json([fields]), 400],
      ["scalar body", {}, () => "7", 400],
      ["null body", {}, () => "null", 400],
      [
        "unexpected field",
        {},
        json({ ...fields, accountId: f.account.id }),
        400,
      ],
      ...Object.keys(fields).flatMap((name) => [
        ["missing " + name, {}, json({ ...fields, [name]: undefined }), 400],
        ["numeric " + name, {}, json({ ...fields, [name]: 7 }), 400],
        ["array " + name, {}, json({ ...fields, [name]: [fields[name]] }), 400],
      ]),
    ];
    for (const [path, fields] of routes) {
      for (const [label, changes, body, expected] of variants(fields)) {
        const headers = {
          ...proxyHeaders,
          Origin: origin,
          "Content-Type": "application/json",
          Cookie: cookie,
          ...changes,
        };
        for (const name of Object.keys(headers))
          if (headers[name] === undefined) delete headers[name];
        const response = await f.send(path, {
          method: "POST",
          headers,
          body: body ? body() : JSON.stringify(fields),
        });
        const name = `${path} ${label}`;
        assert.equal(response.status, expected, name);
        assert.match(response.headers["content-type"], /application\/json/);
        const cookies = response.headers["set-cookie"] ?? [];
        assert.ok(
          cookies.every((value) => value.split(";")[0] === renewal),
          `${name}: no new or cleared session cookie`,
        );
        assert.equal(count("accounts"), accounts, `${name}: no account`);
        assert.equal(count("sessions"), 1, `${name}: no session`);
        assert.equal(count("emailed_links"), 1, `${name}: no link recorded`);
        assert.equal(
          confirmed(),
          confirmedBefore,
          `${name}: no address confirmed`,
        );
        assert.equal(f.mailer.messages.length, 0, `${name}: nothing sent`);
        const current = f.runtime.database.readSession(live);
        assert.ok(
          current?.accountId === stored.accountId &&
            current.data === stored.data,
          `${name}: the live session keeps its identity`,
        );
      }
    }
    // Controls: the same bodies with every guard satisfied do change state.
    const valid = {
      ...proxyHeaders,
      Origin: origin,
      "Content-Type": "application/json",
    };
    for (const [path, fields, expected] of [
      ["/api/email-confirmation-message", {}, 200],
      ["/api/email-confirmation", { token }, 204],
      ["/api/logout", {}, 204],
      ["/api/session", routes[1][1], 200],
      ["/api/accounts", routes[0][1], 201],
    ]) {
      const response = await f.send(path, {
        method: "POST",
        headers: { ...valid, Cookie: cookie },
        body: JSON.stringify(fields),
      });
      assert.equal(response.status, expected, `${path} control`);
    }
    assert.equal(f.runtime.database.readSession(live), null);
    assert.equal(count("accounts"), accounts + 1);
    assert.equal(confirmed(), confirmedBefore + 1);
    assert.deepEqual(
      f.mailer.messages.slice(0, 1).map((message) => message.to),
      ["synthetic@example.test"],
    );
    // The reset request, admitted, answers 204 and hands a message on after it.
    const handed = f.mailer.messages.length;
    const asked = await f.send("/api/password-reset-message", {
      method: "POST",
      headers: valid,
      body: JSON.stringify({ email: "reset@example.test" }),
    });
    assert.equal(asked.status, 204, "reset request control");
    for (
      let wait = 0;
      wait < 200 && f.mailer.messages.length === handed;
      wait += 1
    )
      await new Promise((resolve) => setTimeout(resolve, 10));
    assert.deepEqual(
      f.mailer.messages.slice(handed).map((message) => message.to),
      ["reset@example.test"],
    );
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

// The save route is a state-changing route with its own body limit, 64 KiB
// (D-104); the six others keep 16 KiB.
const savedGame = "/api/saved-game";

test(
  "refused requests to the save route change no saved game state, and its body limit is 64 KiB where the others keep 16 KiB",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-mutation-request-guards
    // Faults: the save route missing from the guarded set; one limit for all
    // routes; a guard run after the write; field checks that coerce.
    const f = await fixture(t);
    const live = "save-guarded-session";
    seed(f, live);
    const cookie = signedCookie(live, f.keys[0]);
    const renewal = cookie;
    const stored = () =>
      f.inspection
        .prepare(
          "SELECT account_id, version, revision, game FROM saved_games ORDER BY account_id",
        )
        .all();
    const fields = { version: 1, basedOn: 1, game: { turn: 2 } };
    const first = await f.send(savedGame, {
      method: "PUT",
      headers: {
        ...proxyHeaders,
        Origin: origin,
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({ version: 1, basedOn: 0, game: { turn: 1 } }),
    });
    assert.equal(first.status, 200, "precondition: a saved game state exists");
    const before = stored();
    assert.equal(before.length, 1);

    const padded = (bytes) =>
      JSON.stringify({ ...fields, game: { padding: "x".repeat(bytes) } });
    const variants = [
      ["missing origin", { Origin: undefined }, null, 403],
      ["null origin", { Origin: "null" }, null, 403],
      ["foreign origin", { Origin: "https://evil.example" }, null, 403],
      ["suffix origin", { Origin: `${origin}.evil` }, null, 403],
      ["origin with path", { Origin: `${origin}/` }, null, 403],
      ["duplicate origin", { Origin: [origin, origin] }, null, 403],
      ["missing media", { "Content-Type": undefined }, null, 415],
      ["text media", { "Content-Type": "text/plain" }, null, 415],
      [
        "form media",
        { "Content-Type": "application/x-www-form-urlencoded" },
        null,
        415,
      ],
      [
        "parameterized media",
        { "Content-Type": "application/json;other=value" },
        null,
        415,
      ],
      ["compressed", { "Content-Encoding": "gzip" }, null, 415],
      [
        "duplicate encoding",
        { "Content-Encoding": ["identity", "identity"] },
        null,
        415,
      ],
      // The padding is the body's size less the frame of the other fields.
      ["over 64 KiB", {}, padded(64 * 1024), 413],
      ["empty body", {}, "", 400],
      ["broken body", {}, "{", 400],
      ["array body", {}, JSON.stringify([fields]), 400],
      ["scalar body", {}, "7", 400],
      ["null body", {}, "null", 400],
      [
        "unexpected field",
        {},
        JSON.stringify({ ...fields, accountId: f.account.id }),
        400,
      ],
      ...Object.keys(fields).flatMap((name) => [
        [
          "missing " + name,
          {},
          JSON.stringify({ ...fields, [name]: undefined }),
          400,
        ],
        ["string " + name, {}, JSON.stringify({ ...fields, [name]: "1" }), 400],
      ]),
    ];
    for (const [label, changes, body, expected] of variants) {
      const headers = {
        ...proxyHeaders,
        Origin: origin,
        "Content-Type": "application/json",
        Cookie: cookie,
        ...changes,
      };
      for (const name of Object.keys(headers))
        if (headers[name] === undefined) delete headers[name];
      const response = await f.send(savedGame, {
        method: "PUT",
        headers,
        body: body ?? JSON.stringify(fields),
      });
      assert.equal(response.status, expected, label);
      assert.match(response.headers["content-type"], /application\/json/);
      const cookies = response.headers["set-cookie"] ?? [];
      assert.ok(
        cookies.every((value) => value.split(";")[0] === renewal),
        `${label}: no new or cleared session cookie`,
      );
      assert.deepEqual(stored(), before, `${label}: saved state unchanged`);
    }

    // The limits: a body over 16 KiB is within the save route's limit and is
    // saved; every body over 64 KiB is refused. Each of the six other routes
    // refuses a body over 16 KiB (also in "refused state-changing requests").
    const valid = {
      ...proxyHeaders,
      Origin: origin,
      "Content-Type": "application/json",
      Cookie: cookie,
    };
    const large = padded(20 * 1024);
    assert.ok(Buffer.byteLength(large) > 16 * 1024, "precondition");
    const accepted = await f.send(savedGame, {
      method: "PUT",
      headers: valid,
      body: large,
    });
    assert.equal(accepted.status, 200, "a 20 KiB save is within its limit");
    assert.deepEqual(JSON.parse(accepted.body), { revision: 2 });
    for (const path of [
      "/api/accounts",
      "/api/session",
      "/api/logout",
      "/api/email-confirmation",
      "/api/email-confirmation-message",
      "/api/password-reset-message",
    ]) {
      const response = await f.send(path, {
        method: "POST",
        headers: valid,
        body: JSON.stringify({ padding: "x".repeat(20 * 1024) }),
      });
      assert.equal(response.status, 413, `${path} keeps its 16 KiB limit`);
    }
    const edge = (size) => {
      const frame = Buffer.byteLength(
        JSON.stringify({ version: 1, basedOn: 2, game: { p: "" } }),
      );
      return JSON.stringify({
        version: 1,
        basedOn: 2,
        game: { p: "x".repeat(size - frame) },
      });
    };
    // The body limit is 65 536 bytes: one byte more is refused, that many pass.
    for (const [size, expected] of [
      [64 * 1024 + 1, 413],
      [64 * 1024, 200],
    ]) {
      const body = edge(size);
      assert.equal(Buffer.byteLength(body), size, "precondition: body size");
      const response = await f.send(savedGame, {
        method: "PUT",
        headers: valid,
        body,
      });
      assert.equal(response.status, expected, `${size} bytes`);
    }
    assert.equal(stored()[0].revision, 3);
  },
);

test(
  "transport refuses both save routes before the session, with no saved game state read or changed",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-request-transport
    // Fault: the save path outside the transport gate, so that a request with
    // ambiguous proxy metadata reaches the session or the saved game state.
    const f = await fixture(t);
    const id = "save-transport-record";
    seed(f, id);
    const cookie = signedCookie(id, f.keys[0]);
    const sessionBefore = f.runtime.database.readSession(id);
    const guarded = {
      Origin: origin,
      "Content-Type": "application/json",
      Cookie: cookie,
    };
    const seeded = await f.send(savedGame, {
      method: "PUT",
      headers: { ...proxyHeaders, ...guarded },
      body: JSON.stringify({ version: 1, basedOn: 0, game: { turn: 1 } }),
    });
    assert.equal(seeded.status, 200, "precondition: valid transport saves");
    const sessionKept = f.runtime.database.readSession(id);
    const saved = () => f.inspection.prepare("SELECT * FROM saved_games").all();
    const before = saved();
    assert.ok(sessionBefore && sessionKept, "precondition: a live session");
    for (const headers of [
      {},
      { "X-Forwarded-Proto": "https" },
      { ...proxyHeaders, "X-Forwarded-Proto": "http" },
      { ...proxyHeaders, "X-Forwarded-Proto": "https,http" },
      { ...proxyHeaders, "CF-Connecting-IP": ["192.0.2.7", "192.0.2.7"] },
      { ...proxyHeaders, "CF-Connecting-IP": "192.0.2.7,192.0.2.8" },
    ]) {
      const name = JSON.stringify(headers);
      const read = await f.send(savedGame, {
        headers: { ...headers, Cookie: cookie },
      });
      assert.equal(read.status, 403, `read ${name}`);
      assert.equal(read.headers["set-cookie"], undefined, `read ${name}`);
      assert.doesNotMatch(read.body, /turn/, `read ${name}: no saved game`);
      const write = await f.send(savedGame, {
        method: "PUT",
        headers: { ...headers, ...guarded },
        body: JSON.stringify({ version: 1, basedOn: 1, game: { turn: 2 } }),
      });
      assert.equal(write.status, 403, `save ${name}`);
      assert.equal(write.headers["cache-control"], "no-store", name);
      assert.equal(write.headers["set-cookie"], undefined, `save ${name}`);
      assert.deepEqual(saved(), before, `save ${name}: unchanged`);
      assert.deepEqual(
        f.runtime.database.readSession(id),
        sessionKept,
        `${name}: session untouched`,
      );
    }
    // Valid transport reaches the route.
    const control = await f.send(savedGame, {
      headers: { ...proxyHeaders, Cookie: cookie },
    });
    assert.equal(control.status, 200);
    assert.deepEqual(JSON.parse(control.body), {
      save: { version: 1, revision: 1, game: { turn: 1 } },
    });
  },
);
