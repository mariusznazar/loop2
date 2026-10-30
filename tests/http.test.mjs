import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { request } from "node:http";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm, rmdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";
import session from "express-session";
import {
  AccountPolicy,
  checkNewPassword,
  checkRegistration,
} from "../dist/server/account-policy.js";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";
import { AccountDatabase } from "../dist/server/database.js";
import { hashPassword } from "../dist/server/passwords.js";

let server;
let port;
let temporaryDirectory;
const originalDirectory = process.cwd();
const expectedHtml = await readFile(
  new URL("../dist/public/index.html", import.meta.url),
  "utf8",
);
const expectedScript = await readFile(
  new URL("../dist/public/main.js", import.meta.url),
  "utf8",
);

function listen(app) {
  const listening = app.listen(0, "127.0.0.1");
  const ready = new Promise((resolve, reject) => {
    const deadline = setTimeout(
      () => reject(new Error("HTTP readiness deadline exceeded")),
      5000,
    );
    listening.once("listening", () => {
      clearTimeout(deadline);
      resolve();
    });
    listening.once("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
  });
  return { server: listening, ready };
}

async function close(listening) {
  if (!listening?.listening) return;
  listening.closeAllConnections();
  await new Promise((resolve, reject) =>
    listening.close((error) => (error ? reject(error) : resolve())),
  );
}

function send(path, { method = "GET", headers = {}, body, to = port } = {}) {
  return new Promise((resolve, reject) => {
    // The path option preserves dot segments; do not replace with a URL or fetch.
    const outgoing = request(
      { hostname: "127.0.0.1", port: to, path, method, headers, agent: false },
      (incoming) => {
        let data = "";
        incoming.setEncoding("utf8");
        incoming.on("data", (chunk) => {
          data += chunk;
        });
        incoming.on("end", () => {
          clearTimeout(deadline);
          resolve({
            status: incoming.statusCode,
            headers: incoming.headers,
            body: data,
          });
        });
        incoming.on("error", (error) => {
          clearTimeout(deadline);
          reject(error);
        });
      },
    );
    // An absolute deadline, not an idle timeout, bounds the whole exchange.
    const deadline = setTimeout(
      () => outgoing.destroy(new Error("HTTP deadline exceeded")),
      5000,
    );
    outgoing.on("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
    outgoing.end(body);
  });
}

before(async () => {
  temporaryDirectory = await mkdtemp(join(tmpdir(), "loop2-http-"));
  // Construct the app away from the repository to exercise its static root.
  process.chdir(temporaryDirectory);
  try {
    const started = listen(createApp());
    server = started.server;
    await started.ready;
    port = server.address().port;
  } finally {
    process.chdir(originalDirectory);
  }
});

after(async () => {
  try {
    await close(server);
  } finally {
    if (temporaryDirectory) await rmdir(temporaryDirectory);
  }
});

test("serves the built HTML and JavaScript from another working directory", async () => {
  const html = await send("/");
  assert.equal(html.status, 200);
  assert.match(html.headers["content-type"], /^text\/html/);
  assert.equal(html.body, expectedHtml);
  assert.match(html.body, /<script type="module" src="\/main\.js"><\/script>/);
  const script = await send("/main.js");
  assert.equal(script.status, 200);
  assert.match(
    script.headers["content-type"],
    /(?:text|application)\/javascript/,
  );
  assert.equal(script.body, expectedScript);
});

test("API keeps its JSON error across paths, methods, queries and HTML negotiation", async () => {
  for (const path of [
    "/api",
    "/api/",
    "/api/missing/nested",
    "/api/missing?view=html",
  ]) {
    for (const method of [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
      "HEAD",
    ]) {
      const response = await send(path, {
        method,
        headers: { Accept: "text/html" },
      });
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.match(response.headers["content-type"], /^application\/json/);
      if (method === "HEAD") assert.equal(response.body, "");
      else assert.deepEqual(JSON.parse(response.body), { error: "Not found" });
    }
  }
});

test("ordinary missing routes and files do not become the home page or API", async () => {
  for (const path of ["/apix", "/missing.js", "/unknown/page"]) {
    const response = await send(path);
    assert.equal(response.status, 404, path);
    assert.doesNotMatch(response.headers["content-type"], /application\/json/);
    assert.notEqual(response.body, expectedHtml);
  }
});

test("raw and encoded traversal cannot expose files outside dist/public", async () => {
  // invariant: public-file-access
  for (const path of [
    "/package.json",
    "/tsconfig.server.json",
    "/src/server/app.ts",
    "/.git/config",
    "/../package.json",
    "/../../package.json",
    "/%2e%2e/%2e%2e/package.json",
    "/..%2f..%2fpackage.json",
    "/..%5c..%5cpackage.json",
    "/%252e%252e/%252e%252e/package.json",
    "/%E0%A4%A",
  ]) {
    const response = await send(path);
    assert.ok(
      [400, 403, 404].includes(response.status),
      `${path}: ${response.status}`,
    );
    assert.doesNotMatch(
      response.body,
      /"dependencies"|"compilerOptions"|export function createApp|\[core\]/,
    );
    assert.notEqual(response.body, expectedHtml);
  }
});

test("unconfigured accounts answer the canonical account routes as unavailable JSON", async () => {
  // D-111: wholly unconfigured non-production serves JSON 503 from known account routes.
  for (const [method, path] of [
    ["POST", "/api/accounts"],
    ["POST", "/api/session"],
    ["GET", "/api/account"],
    ["POST", "/api/logout"],
    ["POST", "/api/email-confirmation"],
    ["POST", "/api/email-confirmation-message"],
    ["GET", "/api/saved-game"],
    ["PUT", "/api/saved-game"],
  ]) {
    const response = await send(path, { method });
    assert.equal(response.status, 503, `${method} ${path}`);
    assert.match(response.headers["content-type"], /^application\/json/);
    assert.equal(response.headers["cache-control"], "no-store");
  }
  for (const path of ["/api/register", "/api/login"]) {
    const response = await send(path, { method: "POST" });
    assert.equal(response.status, 404, `no alias for ${path}`);
  }
});

const origin = "https://game.example.test:8443";
const proxyHeaders = {
  "X-Forwarded-Proto": "https",
  "CF-Connecting-IP": "192.0.2.7",
};
const logoutHeaders = {
  ...proxyHeaders,
  Origin: origin,
  "Content-Type": "application/json",
};
// D-101: 30 days from the last request.
const sessionLifetime = 30 * 24 * 60 * 60 * 1000;

// D-163: routes are tested with a stand-in mailer. It records each message it
// is handed and answers as the case chooses: "sent", "failed", "reject" (a
// broken mailer whose promise rejects), "never" (no answer at all) or "hold"
// (an answer the case gives later through `held`).
function standInMailer() {
  const mailer = {
    outcome: "sent",
    messages: [],
    held: [],
    send(message) {
      mailer.messages.push(message);
      switch (mailer.outcome) {
        case "never":
          return new Promise(() => {});
        case "reject":
          return Promise.reject(new Error("synthetic mailer fault"));
        case "hold":
          return new Promise((resolve) => mailer.held.push(resolve));
        default:
          return Promise.resolve(mailer.outcome);
      }
    },
  };
  return mailer;
}

async function accountFixture(t, { keyCapacity, sendingDeadline } = {}) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-account-http-"));
  let runtime, inspection, listening;
  let release = () => {};
  t.after(async () => {
    release();
    try {
      await close(listening);
    } finally {
      inspection?.close();
      runtime?.close();
      await rm(directory, { recursive: true, force: true });
    }
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
    LOOP2_PROXY_MODE: "cloudflare-tunnel",
    LOOP2_MAIL_FROM: "sender@mail.example.test",
    LOOP2_SMTP_HOST: "smtp.example.test",
    LOOP2_SMTP_PORT: "587",
    LOOP2_SMTP_USER: "sender@mail.example.test",
    LOOP2_SMTP_PASSWORD_FILE: smtpPasswordFile,
  });
  inspection = new DatabaseSync(path);
  const first = runtime.database.createAccount(
    "first@example.test",
    runtime.dummyHash,
  );
  const second = runtime.database.createAccount(
    "second@example.test",
    runtime.dummyHash,
  );
  assert.ok(first && second, "precondition: two persisted accounts");
  // The limiter's clock stands still unless a case moves it.
  const clock = { time: Date.now() };
  const policy = new AccountPolicy({
    now: () => clock.time,
    keyCapacity,
    sendingDeadline,
  });
  const mailer = standInMailer();
  // A case may act just before a route records a link, as another connection
  // committing between the route's session check and its write would.
  const hooks = { beforeIssue: null, beforeSave: null };
  const database = new Proxy(runtime.database, {
    get(target, name) {
      const value = Reflect.get(target, name, target);
      if (typeof value !== "function") return value;
      const hook = { issueLink: "beforeIssue", writeSavedGame: "beforeSave" }[
        name
      ];
      if (!hook) return value.bind(target);
      return (...parameters) => {
        hooks[hook]?.();
        return value.apply(target, parameters);
      };
    },
  });
  const app = createApp({ ...runtime, database, mailer }, policy);
  // A test-only ordinary read that holds its response until released, so a
  // logout can complete between its session load and its renewal.
  let reached;
  const arrived = new Promise((resolve) => {
    reached = resolve;
  });
  const released = new Promise((resolve) => {
    release = resolve;
  });
  app.get("/test-delayed-read", async (_request, response) => {
    reached();
    await released;
    response.json({ ok: true });
  });
  const started = listen(app);
  listening = started.server;
  await started.ready;
  const to = listening.address().port;
  return {
    runtime,
    inspection,
    path,
    mailer,
    hooks,
    keys,
    first,
    second,
    arrived,
    release,
    clock,
    policy,
    to,
    connections: () =>
      new Promise((resolve, reject) =>
        listening.getConnections((error, count) =>
          error ? reject(error) : resolve(count),
        ),
      ),
    send: (target, options = {}) => send(target, { ...options, to }),
  };
}

function signedCookie(id, key) {
  // Signed independently of the middleware with HMAC-SHA-256, as express-session expects.
  const signature = createHmac("sha256", key)
    .update(id)
    .digest("base64")
    .replace(/=+$/, "");
  return `__Host-loop2.sid=${encodeURIComponent(`s:${id}.${signature}`)}`;
}

function sessionData(account, expiresAt) {
  const cookie = new session.Cookie({
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: sessionLifetime,
  });
  cookie.expires = new Date(expiresAt);
  cookie.originalMaxAge = sessionLifetime;
  return JSON.stringify({ accountId: account.id, cookie });
}

function seed(f, id, account, expiresAt = Date.now() + 86_400_000) {
  // One day remains of a 30-day session, so a renewal visibly moves its expiry.
  const data = sessionData(account, expiresAt);
  f.runtime.database.saveSession(id, {
    accountId: account.id,
    data,
    expiresAt,
  });
  return signedCookie(id, f.keys[0]);
}

function storedRow(f, id) {
  return f.inspection
    .prepare("SELECT account_id, data, expires_at FROM sessions WHERE id = ?")
    .get(id);
}

function logout(f, cookie, body = "{}") {
  const headers = { ...logoutHeaders };
  if (cookie) headers.Cookie = cookie;
  return f.send("/api/logout", { method: "POST", headers, body });
}

function readAccount(f, cookie, path = "/api/account", extra = {}) {
  const headers = { ...proxyHeaders, ...extra };
  if (cookie) headers.Cookie = cookie;
  return f.send(path, { headers });
}

function assertRefusal(response, status, label) {
  assert.equal(response.status, status, label);
  assert.match(response.headers["content-type"], /^application\/json/, label);
  assert.equal(response.headers["cache-control"], "no-store", label);
  const body = JSON.parse(response.body);
  assert.ok(
    typeof body.code === "string" && typeof body.error === "string",
    `${label}: a refusal carries a machine-readable code and one message`,
  );
  assert.ok(!("id" in body) && !("email" in body), `${label}: no account`);
}

test(
  "a stored session alone selects the account, whatever identifier the request supplies",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-session-authorization
    // Faults: reading the account from a query, header or body identifier; a
    // store looked up by account ID; logout acting on a supplied account.
    const f = await accountFixture(t);
    const own = seed(f, "lookup-first", f.first);
    const other = seed(f, "lookup-second", f.second);
    const before = storedRow(f, "lookup-first");
    const foreign = `accountId=${f.second.id}&id=${f.second.id}`;
    const response = await readAccount(f, own, `/api/account?${foreign}`, {
      "X-Account-Id": f.second.id,
    });
    assert.equal(response.status, 200);
    assert.match(response.headers["content-type"], /^application\/json/);
    assert.equal(response.headers["cache-control"], "no-store");
    // Exactly the opaque ID and normalized email the account was created with.
    assert.deepEqual(JSON.parse(response.body), {
      id: f.first.id,
      email: "first@example.test",
      emailConfirmed: false,
    });
    assert.ok(
      storedRow(f, "lookup-first").data === before.data,
      "an ordinary account read touches the record without rewriting it",
    );
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
      emailConfirmed: false,
    });
    assertRefusal(
      await readAccount(f, null, `/api/account?${foreign}`, {
        "X-Account-Id": f.second.id,
      }),
      401,
      "supplied identifier without a session",
    );
    assertRefusal(
      await readAccount(f, signedCookie(f.second.id, f.keys[0])),
      401,
      "an account identifier is not a session identifier",
    );
    const refused = await logout(
      f,
      own,
      JSON.stringify({ accountId: f.second.id }),
    );
    assert.ok(
      refused.status >= 400 && refused.status < 500,
      "logout naming an account is refused",
    );
    for (const [id, account] of [
      ["lookup-first", f.first],
      ["lookup-second", f.second],
    ])
      assert.ok(
        storedRow(f, id)?.account_id === account.id,
        "a supplied account changes no session",
      );
    const ended = await f.send(`/api/logout?${foreign}`, {
      method: "POST",
      headers: { ...logoutHeaders, Cookie: own, "X-Account-Id": f.second.id },
      body: "{}",
    });
    assert.equal(ended.status, 204, "logout ends this browser's session");
    assert.equal(storedRow(f, "lookup-first"), undefined);
    assert.ok(
      storedRow(f, "lookup-second")?.account_id === f.second.id,
      "an account named in the query or a header keeps its session",
    );
    assert.equal((await readAccount(f, other)).status, 200);
  },
);

test(
  "absent, tampered, unknown, expired and deleted sessions authorize neither lookup nor logout",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-session-authorization
    // Faults: a missing session guard; accepting an unsigned or foreign-key
    // cookie; reading a record past its expiry or after deletion.
    const f = await accountFixture(t);
    const live = seed(f, "refusal-live", f.first);
    const before = storedRow(f, "refusal-live");
    const variants = [
      ["absent", null],
      ["foreign key", signedCookie("refusal-live", randomBytes(32))],
      ["unsigned", "__Host-loop2.sid=refusal-live"],
      ["unknown", signedCookie("refusal-unknown", f.keys[0])],
    ];
    for (const [label, cookie] of variants) {
      const lookup = await readAccount(f, cookie);
      assertRefusal(lookup, 401, `${label} lookup`);
      // Diagnostics name the condition, never a cookie value.
      assert.ok(
        lookup.headers["set-cookie"] === undefined,
        `${label}: no cookie`,
      );
      assertRefusal(await logout(f, cookie), 401, `${label} logout`);
      assert.deepEqual(storedRow(f, "refusal-live"), before, label);
    }
    assert.equal((await readAccount(f, live)).status, 200, "precondition");
    seed(f, "refusal-expired", f.first);
    const expiredAt = Date.now() - 1;
    f.inspection
      .prepare("UPDATE sessions SET expires_at = ? WHERE id = ?")
      .run(expiredAt, "refusal-expired");
    const expired = signedCookie("refusal-expired", f.keys[0]);
    assertRefusal(await readAccount(f, expired), 401, "expired lookup");
    assertRefusal(await logout(f, expired), 401, "expired logout");
    assert.equal(
      storedRow(f, "refusal-expired").expires_at,
      expiredAt,
      "an expired record is not renewed",
    );
    f.runtime.database.destroySession("refusal-live");
    assertRefusal(await readAccount(f, live), 401, "deleted lookup");
    assertRefusal(await logout(f, live), 401, "deleted logout");
  },
);

test(
  "logout destroys only this browser's session and clears the same host cookie",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-server-session
    // D-97 and D-101: other browsers of the same account stay signed in.
    const f = await accountFixture(t);
    const one = seed(f, "logout-one", f.first);
    const two = seed(f, "logout-two", f.first);
    const other = seed(f, "logout-other", f.second);
    const kept = ["logout-two", "logout-other"].map((id) => storedRow(f, id));
    const requested = Date.now();
    const response = await logout(f, one);
    assert.equal(response.status, 204);
    assert.equal(response.body, "");
    assert.equal(response.headers["cache-control"], "no-store");
    const cleared = response.headers["set-cookie"];
    assert.equal(cleared?.length, 1, "exactly one cookie is cleared");
    const [pair, ...attributes] = cleared[0].split("; ");
    assert.ok(pair === "__Host-loop2.sid=", "the session cookie is emptied");
    for (const attribute of ["Path=/", "HttpOnly", "Secure", "SameSite=Strict"])
      assert.ok(attributes.includes(attribute), `clearing keeps ${attribute}`);
    assert.ok(
      !attributes.some((value) => /^Domain=/i.test(value)),
      "host cookie is cleared without Domain",
    );
    const expires = attributes.find((value) => value.startsWith("Expires="));
    assert.ok(
      expires && Date.parse(expires.slice(8)) < requested,
      "the cleared cookie has already expired",
    );
    assert.equal(storedRow(f, "logout-one"), undefined);
    assert.deepEqual(
      ["logout-two", "logout-other"].map((id) => storedRow(f, id)),
      kept,
    );
    assert.equal((await readAccount(f, one)).status, 401);
    assert.deepEqual(JSON.parse((await readAccount(f, two)).body), {
      id: f.first.id,
      email: "first@example.test",
      emailConfirmed: false,
    });
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
      emailConfirmed: false,
    });
    assert.equal((await logout(f, one)).status, 401);
  },
);

test(
  "a failed session destruction is not reported as logout and leaves the browser signed in",
  { timeout: 20000 },
  async (t) => {
    // D-109: logout awaits destruction; a database refusal stands in for any failure.
    const f = await accountFixture(t);
    const cookie = seed(f, "logout-failing", f.first);
    f.inspection.exec(`
      CREATE TRIGGER refuse_logout BEFORE DELETE ON sessions
      WHEN old.id = 'logout-failing'
      BEGIN SELECT RAISE(ABORT, 'synthetic deletion refusal'); END;
    `);
    const failed = await logout(f, cookie);
    assert.ok(failed.status >= 500, "a failed destruction is a server failure");
    assert.match(failed.headers["content-type"], /^application\/json/);
    assert.equal(failed.headers["cache-control"], "no-store");
    assert.ok(
      failed.headers["set-cookie"] === undefined,
      "a failed logout neither clears nor renews the cookie",
    );
    assert.doesNotMatch(failed.body, /synthetic|trigger|sqlite|sessions/i);
    assert.ok(storedRow(f, "logout-failing"), "the record remains");
    assert.equal((await readAccount(f, cookie)).status, 200);
    f.inspection.exec("DROP TRIGGER refuse_logout");
    assert.equal((await logout(f, cookie)).status, 204);
    assert.equal((await readAccount(f, cookie)).status, 401);
  },
);

test(
  "a read that loaded its session before logout cannot revive it afterwards",
  { timeout: 20000 },
  async (t) => {
    // D-101: a delayed renewal cannot resurrect a destroyed session.
    const f = await accountFixture(t);
    const cookie = seed(f, "logout-delayed", f.first);
    const delayed = f.send("/test-delayed-read", {
      headers: { ...proxyHeaders, Cookie: cookie },
    });
    // Settle the delayed exchange even when an assertion below fails first.
    const settled = delayed.then(
      (response) => response,
      (error) => error,
    );
    await f.arrived;
    try {
      assert.equal((await logout(f, cookie)).status, 204);
    } finally {
      f.release();
    }
    assert.equal((await settled).status, 200);
    assert.equal(
      storedRow(f, "logout-delayed"),
      undefined,
      "the delayed read must not recreate the record",
    );
    assert.equal((await readAccount(f, cookie)).status, 401);
  },
);

// Credential transitions. The required messages come from the task's To do 2, 4
// and 10 (D-100, D-102); the limits and windows from D-102 and the orchestrator's
// answer 5 (reports/02-designer-answers.md).
const password = "  Correct horse 🙂 battery  ";
const duplicateMessage = "Konto z tym adresem już istnieje.";
const loginMessage = "Nieprawidłowy adres e-mail lub hasło.";
const limitMessage = "Za dużo prób. Spróbuj ponownie za kilka minut.";
const minute = 60 * 1000;

function post(
  f,
  path,
  fields,
  { address = "198.51.100.10", cookie, forwarded = {} } = {},
) {
  const headers = {
    ...forwarded,
    "X-Forwarded-Proto": "https",
    "CF-Connecting-IP": address,
    Origin: origin,
    "Content-Type": "application/json",
  };
  if (cookie) headers.Cookie = cookie;
  const body = typeof fields === "string" ? fields : JSON.stringify(fields);
  return f.send(path, { method: "POST", headers, body });
}

function register(f, email, options = {}) {
  const secret = options.password ?? password;
  return post(
    f,
    "/api/accounts",
    {
      email,
      password: secret,
      passwordConfirmation: options.confirmation ?? secret,
    },
    options,
  );
}

function login(f, email, secret, options = {}) {
  return post(f, "/api/session", { email, password: secret }, options);
}

function issuedSession(response, label) {
  const cookies = response.headers["set-cookie"];
  assert.equal(cookies?.length, 1, `${label}: one session cookie is issued`);
  const [pair, ...attributes] = cookies[0].split("; ");
  assert.ok(pair.startsWith("__Host-loop2.sid="), `${label}: session cookie`);
  for (const attribute of ["Path=/", "HttpOnly", "Secure", "SameSite=Strict"])
    assert.ok(attributes.includes(attribute), `${label}: ${attribute}`);
  const value = decodeURIComponent(pair.slice("__Host-loop2.sid=".length));
  return { cookie: pair, id: value.slice(2, value.lastIndexOf(".")) };
}

function assertNoCookie(response, label) {
  assert.ok(
    response.headers["set-cookie"] === undefined,
    `${label}: no cookie`,
  );
}

function assertMessage(response, status, message, label) {
  assert.equal(response.status, status, label);
  assert.match(response.headers["content-type"], /^application\/json/, label);
  assert.equal(response.headers["cache-control"], "no-store", label);
  assert.equal(JSON.parse(response.body).error, message, label);
  assertNoCookie(response, label);
}

const assertLimited = (response, label) =>
  assertMessage(response, 429, limitMessage, label);
const assertLoginRefused = (response, label) =>
  assertMessage(response, 401, loginMessage, label);

function accountCount(f) {
  return f.inspection.prepare("SELECT count(*) AS n FROM accounts").get().n;
}

function sessionCount(f) {
  return f.inspection.prepare("SELECT count(*) AS n FROM sessions").get().n;
}

function storedAccount(f, email) {
  return f.inspection
    .prepare("SELECT id, password_hash AS hash FROM accounts WHERE email = ?")
    .get(email);
}

async function waitFor(condition, label) {
  const deadline = Date.now() + 5000;
  while (!(await condition())) {
    if (Date.now() > deadline) throw new Error(`${label}: deadline exceeded`);
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

// Both native password slots stay busy for the action, so any password work
// the action starts is refused as over capacity rather than performed.
async function withFullGate(action) {
  const pending = [true, true];
  const work = pending.map((_, index) =>
    hashPassword(`occupying password ${index}`).finally(() => {
      pending[index] = false;
    }),
  );
  try {
    await action();
    assert.ok(
      pending[0] && pending[1],
      "precondition: both password slots stayed occupied",
    );
  } finally {
    await Promise.allSettled(work);
  }
}

test(
  "registration stores an Argon2id hash of the exact password and signs this browser in at once",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-argon2-password-hash
    // Faults: hashing a trimmed or otherwise changed password; a hash outside
    // the package's Argon2id profile; registration without a signed-in session.
    const f = await accountFixture(t);
    const other = seed(f, "registration-other", f.second);
    const created = await register(f, "  New.Player@Example.TEST ");
    assert.equal(created.status, 201);
    assert.match(created.headers["content-type"], /^application\/json/);
    assert.equal(created.headers["cache-control"], "no-store");
    const stored = storedAccount(f, "new.player@example.test");
    assert.ok(stored, "the account is stored under its normalized address");
    assert.deepEqual(JSON.parse(created.body), {
      id: stored.id,
      email: "new.player@example.test",
      emailConfirmed: false,
      confirmationMessage: "sent",
    });
    assert.ok(
      /^\$argon2id\$v=19\$m=65536,p=1,t=3\$/.test(stored.hash),
      "the stored value is an encoded Argon2id hash of the configured profile",
    );
    assert.equal(await argon2.verify(stored.hash, password), true);
    assert.equal(await argon2.verify(stored.hash, password.trim()), false);
    const session = issuedSession(created, "registration");
    assert.ok(
      storedRow(f, session.id)?.account_id === stored.id,
      "the new browser session is stored for the new account",
    );
    assert.deepEqual(JSON.parse((await readAccount(f, session.cookie)).body), {
      id: stored.id,
      email: "new.player@example.test",
      emailConfirmed: false,
    });
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
      emailConfirmed: false,
    });
    assertLoginRefused(
      await login(f, "new.player@example.test", password.trim()),
      "the trimmed password is another password",
    );
    const again = await login(f, "NEW.player@example.test  ", password);
    assert.equal(again.status, 200, "the exact password signs in");
    assert.deepEqual(JSON.parse(again.body), {
      id: stored.id,
      email: "new.player@example.test",
      emailConfirmed: false,
    });
  },
);

test(
  "a credential success replaces only this browser's session with a fresh identity",
  { timeout: 20000 },
  async (t) => {
    // D-109: regenerate on credential success to prevent fixation; D-97/D-101:
    // other browsers keep their sessions.
    const f = await accountFixture(t);
    const created = await register(f, "fresh@example.test", {
      cookie: seed(f, "fixation-registration", f.second),
    });
    assert.equal(created.status, 201);
    const registered = issuedSession(created, "registration");
    assert.ok(
      registered.id !== "fixation-registration",
      "registration issues a new session identifier",
    );
    assert.equal(storedRow(f, "fixation-registration"), undefined);
    const kept = seed(f, "fixation-kept", f.second);
    const fixed = seed(f, "fixation-login", f.second);
    const signedIn = await login(f, "fresh@example.test", password, {
      cookie: fixed,
    });
    assert.equal(signedIn.status, 200);
    const replaced = issuedSession(signedIn, "login");
    assert.ok(
      replaced.id !== "fixation-login" && replaced.id !== registered.id,
      "login issues a new session identifier",
    );
    assert.equal(storedRow(f, "fixation-login"), undefined);
    const account = storedAccount(f, "fresh@example.test").id;
    assert.equal(storedRow(f, replaced.id)?.account_id, account);
    assert.equal(storedRow(f, registered.id)?.account_id, account);
    assert.equal((await readAccount(f, fixed)).status, 401);
    assert.deepEqual(JSON.parse((await readAccount(f, kept)).body), {
      id: f.second.id,
      email: "second@example.test",
      emailConfirmed: false,
    });
    assert.deepEqual(
      JSON.parse((await readAccount(f, registered.cookie)).body),
      { id: account, email: "fresh@example.test", emailConfirmed: false },
      "the registering browser stays signed in",
    );
  },
);

test(
  "one normalized address holds one account and a duplicate gets the required message, also in a race",
  { timeout: 20000 },
  async (t) => {
    // D-99, D-100. Faults: comparing raw spellings; a lost insert race
    // answered as a server error or as a second account.
    const f = await accountFixture(t);
    const raced = await Promise.all([
      register(f, "Race@Example.test", { address: "198.51.100.11" }),
      register(f, " race@example.TEST ", { address: "198.51.100.12" }),
    ]);
    assert.deepEqual(
      raced.map((response) => response.status).sort(),
      [201, 409],
    );
    const lost = raced.find((response) => response.status === 409);
    assertMessage(lost, 409, duplicateMessage, "the lost race");
    assert.equal(
      f.inspection
        .prepare("SELECT count(*) AS n FROM accounts WHERE email = ?")
        .get("race@example.test").n,
      1,
    );
    assertMessage(
      await register(f, "FIRST@example.test"),
      409,
      duplicateMessage,
      "an address that already has an account",
    );
    assert.equal(accountCount(f), 3);
    assert.equal(
      (await login(f, "  RACE@EXAMPLE.TEST ", password)).status,
      200,
      "login normalizes the address as registration did",
    );
  },
);

test(
  "passwords count 12 to 128 Unicode code points and keep their exact content",
  { timeout: 20000 },
  async (t) => {
    // D-98. Faults: UTF-16 or byte length, trimming, normalizing, or a
    // confirmation compared after normalization.
    const f = await accountFixture(t);
    const accepted = [
      ["twelve-emoji", "🙂".repeat(12)],
      ["twelve-spaces", " ".repeat(12)],
      ["max-emoji", "🙂".repeat(128)],
      ["max-two-byte", "ą".repeat(128)],
    ];
    for (const [index, [label, secret]] of accepted.entries()) {
      const response = await register(f, `${label}@example.test`, {
        password: secret,
        address: `198.51.100.${30 + index}`,
      });
      assert.equal(response.status, 201, label);
    }
    for (const [label, secret] of [
      ["eleven-emoji", "🙂".repeat(11)],
      ["eleven-letters", "a".repeat(11)],
      ["too-many-letters", "a".repeat(129)],
      ["too-many-emoji", "🙂".repeat(129)],
    ]) {
      const response = await register(f, `${label}@example.test`, {
        password: secret,
      });
      assert.equal(response.status, 400, label);
      assert.equal(JSON.parse(response.body).code, "invalid-password", label);
      assertNoCookie(response, label);
      assert.equal(storedAccount(f, `${label}@example.test`), undefined);
    }
    for (const [label, confirmation] of [
      ["trailing-space", `${password} `],
      ["decomposed", password.replace("o", "ó")],
    ]) {
      const response = await register(f, `${label}@example.test`, {
        confirmation,
      });
      assert.equal(response.status, 400, label);
      assert.equal(JSON.parse(response.body).code, "password-mismatch", label);
      assert.equal(storedAccount(f, `${label}@example.test`), undefined);
    }
    assert.equal(
      (await login(f, "twelve-spaces@example.test", " ".repeat(12))).status,
      200,
    );
    assert.equal(
      (await login(f, "max-emoji@example.test", "🙂".repeat(128))).status,
      200,
    );
    assertLoginRefused(
      await login(f, "twelve-emoji@example.test", "🙂".repeat(11)),
      "a login password below the boundary",
    );
  },
);

test(
  "malformed fields and out-of-shape credentials are refused before password work or writes",
  { timeout: 20000 },
  async (t) => {
    // D-99, D-104: explicit field and type checks, no coercion; bad lengths
    // and shapes keep the generic login message without Argon2.
    const f = await accountFixture(t);
    const structural = [
      {},
      { email: "shape@example.test", password },
      {
        email: "shape@example.test",
        password,
        passwordConfirmation: password,
        extra: true,
      },
      {
        email: ["shape@example.test"],
        password,
        passwordConfirmation: password,
      },
      { email: 7, password, passwordConfirmation: password },
      {
        email: "shape@example.test",
        password: { password },
        passwordConfirmation: password,
      },
      {
        email: "shape@example.test",
        password: null,
        passwordConfirmation: null,
      },
    ];
    await withFullGate(async () => {
      for (const fields of structural) {
        const response = await post(f, "/api/accounts", fields);
        assert.equal(response.status, 400, JSON.stringify(Object.keys(fields)));
        assert.equal(JSON.parse(response.body).code, "invalid-request");
      }
    });
    await withFullGate(async () => {
      for (const fields of [
        {},
        { email: "first@example.test" },
        {
          email: "first@example.test",
          password,
          passwordConfirmation: password,
        },
        { email: 7, password },
        { email: "first@example.test", password: [password] },
      ]) {
        const response = await post(f, "/api/session", fields);
        assert.equal(response.status, 400, JSON.stringify(Object.keys(fields)));
        assert.equal(JSON.parse(response.body).code, "invalid-request");
      }
    });
    await withFullGate(async () => {
      for (const email of [
        "no-at-sign",
        "@example.test",
        "player@",
        "a@b@c",
        "   ",
      ]) {
        const response = await register(f, email);
        assert.equal(response.status, 400, email);
        assert.equal(JSON.parse(response.body).code, "invalid-email", email);
      }
      const short = await register(f, "short@example.test", {
        password: "a".repeat(11),
      });
      assert.equal(short.status, 400);
    });
    await withFullGate(async () => {
      for (const [email, secret] of [
        ["no-at-sign", password],
        ["first@example.test", "a".repeat(11)],
        ["first@example.test", "a".repeat(129)],
      ])
        assertLoginRefused(
          await login(f, email, secret),
          `out-of-shape login ${email}`,
        );
      // Positive control: well-formed credentials do reach the full gate.
      assertLimited(await register(f, "control@example.test"), "full gate");
      assertLimited(
        await login(f, "unknown@example.test", password),
        "unknown address goes through the same gate",
      );
    });
    assert.equal(accountCount(f), 2, "nothing was written");
    assert.equal(sessionCount(f), 0, "no session was created");
    assert.equal(
      (await register(f, "player@localhost")).status,
      201,
      "no dot or DNS restriction applies",
    );
  },
);

test(
  "a known address with a wrong password and an unknown address fail login identically",
  { timeout: 20000 },
  async (t) => {
    // D-100. Fault: a distinct message, status or shape for an unknown address.
    const f = await accountFixture(t);
    assert.equal((await register(f, "known@example.test")).status, 201);
    const wrong = await login(f, "known@example.test", `${password}!`);
    const unknown = await login(f, "unknown@example.test", password);
    assertLoginRefused(wrong, "wrong password");
    assertLoginRefused(unknown, "unknown address");
    assert.deepEqual(JSON.parse(unknown.body), JSON.parse(wrong.body));
    assert.equal(
      unknown.headers["content-type"],
      wrong.headers["content-type"],
    );
  },
);

test(
  "a failed session save keeps the new account usable and issues no success cookie",
  { timeout: 20000 },
  async (t) => {
    // D-109: success only after the session is stored; the account is not
    // deleted when its first session fails.
    const f = await accountFixture(t);
    f.inspection.exec(`
      CREATE TRIGGER refuse_session BEFORE INSERT ON sessions
      BEGIN SELECT RAISE(ABORT, 'synthetic session refusal'); END;
    `);
    for (const [label, attempt] of [
      ["registration", () => register(f, "unsaved@example.test")],
      ["login", () => login(f, "unsaved@example.test", password)],
    ]) {
      const failed = await attempt();
      assert.ok(failed.status >= 500, `${label}: a failed save is a failure`);
      assert.match(failed.headers["content-type"], /^application\/json/);
      assert.equal(failed.headers["cache-control"], "no-store");
      assertNoCookie(failed, label);
      assert.doesNotMatch(failed.body, /synthetic|trigger|sqlite|sessions/i);
      assert.ok(!("id" in JSON.parse(failed.body)), `${label}: no account`);
    }
    assert.ok(storedAccount(f, "unsaved@example.test"), "the account remains");
    assert.equal(sessionCount(f), 0);
    f.inspection.exec("DROP TRIGGER refuse_session");
    const later = await login(f, "unsaved@example.test", password);
    assert.equal(later.status, 200, "a later login succeeds");
    const { cookie } = issuedSession(later, "later login");
    assert.equal((await readAccount(f, cookie)).status, 200);
  },
);

test(
  "five failed logins lock an address for 15 minutes from the fifth, also for its correct password",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-attempt-limits
    // Faults: success not clearing earlier failures; a lock skipped for correct
    // credentials or timed from the first failure; a capacity refusal counted
    // as a failure; a lock or window still counted at its end instant.
    const f = await accountFixture(t);
    assert.equal(
      (await register(f, "lock@example.test", { address: "198.51.100.40" }))
        .status,
      201,
    );
    const wrong = () => login(f, "lock@example.test", `${password}!`);
    const right = () => login(f, "lock@example.test", password);
    await withFullGate(async () => {
      for (let attempt = 1; attempt <= 5; attempt += 1)
        assertLimited(await wrong(), `capacity refusal ${attempt}`);
    });
    for (let attempt = 1; attempt <= 4; attempt += 1)
      assertLoginRefused(await wrong(), `failure ${attempt}`);
    assert.equal((await right()).status, 200, "success clears the four");
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      if (attempt > 1) f.clock.time += minute;
      assertLoginRefused(await wrong(), `failure ${attempt} after success`);
    }
    const lockedAt = f.clock.time;
    assertLimited(await right(), "locked, correct password");
    assertLimited(await wrong(), "locked, wrong password");
    assertLoginRefused(
      await login(f, "other@example.test", password),
      "another address from the same client is not locked",
    );
    f.clock.time = lockedAt + 15 * minute - 1;
    assertLimited(await right(), "one millisecond before the lock ends");
    f.clock.time = lockedAt + 15 * minute;
    assert.equal((await right()).status, 200, "the lock ends after 15 minutes");
    for (let attempt = 1; attempt <= 4; attempt += 1)
      assertLoginRefused(await wrong(), `rolling failure ${attempt}`);
    f.clock.time += 15 * minute;
    assertLoginRefused(await wrong(), "a fifth failure after the window");
    assert.equal(
      (await right()).status,
      200,
      "failures older than 15 minutes do not lock",
    );
  },
);

test(
  "one client address is admitted twenty failed logins per rolling 15 minutes and success does not clear them",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-attempt-limits
    // Faults: a success clearing address failures; in-flight attempts not
    // counted; another client sharing the restriction.
    const f = await accountFixture(t);
    assert.equal(
      (await register(f, "address@example.test", { address: "198.51.100.50" }))
        .status,
      201,
    );
    const address = "198.51.100.51";
    for (let pair = 0; pair < 9; pair += 1) {
      const failures = await Promise.all(
        [0, 1].map((index) =>
          login(f, `unknown-${pair}-${index}@example.test`, password, {
            address,
          }),
        ),
      );
      for (const response of failures)
        assertLoginRefused(response, `pair ${pair}`);
    }
    assertLoginRefused(
      await login(f, "unknown-last@example.test", password, { address }),
      "the nineteenth failure",
    );
    const startedAt = f.clock.time;
    assert.equal(
      (await login(f, "address@example.test", password, { address })).status,
      200,
    );
    const parallel = await Promise.all(
      ["last-0", "last-1"].map((name) =>
        login(f, `${name}@example.test`, password, { address }),
      ),
    );
    assert.deepEqual(
      parallel.map((response) => response.status).sort(),
      [401, 429],
      "the twentieth attempt's reservation refuses the twenty-first",
    );
    assertLimited(
      await login(f, "address@example.test", password, { address }),
      "twenty failures refuse even correct credentials",
    );
    assertLoginRefused(
      await login(f, "elsewhere@example.test", password, {
        address: "198.51.100.52",
      }),
      "another client address is admitted",
    );
    f.clock.time = startedAt + 15 * minute - 1;
    assertLimited(
      await login(f, "address@example.test", password, { address }),
      "one millisecond before the window ends",
    );
    f.clock.time = startedAt + 15 * minute;
    assert.equal(
      (await login(f, "address@example.test", password, { address })).status,
      200,
    );
  },
);

test(
  "one client address creates five accounts per rolling hour, and refused registrations take no slot",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-attempt-limits
    // Faults: duplicates or invalid requests consuming slots; parallel
    // registrations overshooting the limit; the window counted at its end.
    const f = await accountFixture(t);
    const address = "198.51.100.60";
    const startedAt = f.clock.time;
    for (let index = 0; index < 3; index += 1)
      assert.equal(
        (await register(f, `slot-${index}@example.test`, { address })).status,
        201,
      );
    assert.equal(
      (await register(f, "slot-0@example.test", { address })).status,
      409,
    );
    assert.equal((await register(f, "no-at-sign", { address })).status, 400);
    assert.equal(
      (await register(f, "slot-3@example.test", { address })).status,
      201,
    );
    const parallel = await Promise.all(
      ["slot-4", "slot-5"].map((name) =>
        register(f, `${name}@example.test`, { address }),
      ),
    );
    assert.deepEqual(
      parallel.map((response) => response.status).sort(),
      [201, 429],
      "the fifth registration's reservation refuses the sixth",
    );
    assertLimited(
      await register(f, "slot-6@example.test", { address }),
      "sixth account within the hour",
    );
    // D-110: the limiter keys on the canonical connecting address, whatever
    // spelling it arrives in and whatever forwarding chain the caller adds.
    assertLimited(
      await register(f, "slot-6@example.test", {
        address: "::ffff:198.51.100.60",
        forwarded: {
          "X-Forwarded-For": "203.0.113.9",
          "X-Real-IP": "203.0.113.10",
          Forwarded: "for=203.0.113.11",
        },
      }),
      "an equivalent spelling with a chosen forwarding chain",
    );
    assert.equal(accountCount(f), 2 + 5);
    assert.equal(
      (
        await register(f, "elsewhere@example.test", {
          address: "198.51.100.61",
        })
      ).status,
      201,
    );
    f.clock.time = startedAt + 60 * minute - 1;
    assertLimited(
      await register(f, "slot-7@example.test", { address }),
      "one millisecond before the hour ends",
    );
    f.clock.time = startedAt + 60 * minute;
    assert.equal(
      (await register(f, "slot-8@example.test", { address })).status,
      201,
    );
  },
);

test(
  "a disconnected login keeps its reservation until its password work completes and still counts",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-attempt-limits
    // Faults: releasing the reservation when the client disconnects, and
    // dropping the outcome of work whose client has gone.
    const f = await accountFixture(t);
    assert.equal(
      (await register(f, "drop@example.test", { address: "198.51.100.70" }))
        .status,
      201,
    );
    for (let attempt = 1; attempt <= 4; attempt += 1)
      assertLoginRefused(
        await login(f, "drop@example.test", `${password}!`),
        `failure ${attempt}`,
      );
    await waitFor(async () => (await f.connections()) === 0, "idle server");
    const abandoned = request({
      hostname: "127.0.0.1",
      port: f.to,
      path: "/api/session",
      method: "POST",
      agent: false,
      headers: {
        "X-Forwarded-Proto": "https",
        "CF-Connecting-IP": "198.51.100.10",
        Origin: origin,
        "Content-Type": "application/json",
      },
    });
    abandoned.on("error", () => {});
    abandoned.end(
      JSON.stringify({ email: "drop@example.test", password: `${password}!` }),
    );
    try {
      await waitFor(() => f.policy.inFlight === 1, "fifth attempt admitted");
    } finally {
      abandoned.destroy();
    }
    await waitFor(async () => (await f.connections()) === 0, "disconnect seen");
    assert.equal(
      f.policy.inFlight,
      1,
      "the disconnected attempt stays unsettled while its password work runs",
    );
    assertLimited(
      await login(f, "drop@example.test", password),
      "the disconnected attempt still holds its reservation",
    );
    await waitFor(() => f.policy.inFlight === 0, "abandoned work completed");
    assertLimited(
      await login(f, "drop@example.test", password),
      "the abandoned failure counted as the fifth and locked the address",
    );
    f.clock.time += 15 * minute;
    assert.equal((await login(f, "drop@example.test", password)).status, 200);
  },
);

test(
  "full limiter tables refuse newcomers without evicting a live restriction",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-attempt-tracking
    // Faults: evicting the oldest key, or admitting an untracked newcomer.
    const f = await accountFixture(t, { keyCapacity: 2 });
    const address = "198.51.100.80";
    assert.equal(
      (await register(f, "kept@example.test", { address })).status,
      201,
    );
    for (let attempt = 1; attempt <= 5; attempt += 1)
      assertLoginRefused(
        await login(f, "kept@example.test", `${password}!`, { address }),
        `failure ${attempt}`,
      );
    assertLoginRefused(
      await login(f, "second-key@example.test", password, {
        address: "198.51.100.81",
      }),
      "the second tracked email and address",
    );
    assertLimited(
      await login(f, "newcomer@example.test", password, { address }),
      "a third email key is refused while two are live",
    );
    assertLimited(
      await login(f, "kept@example.test", password, { address }),
      "the live lock was not evicted",
    );
    assertLimited(
      await login(f, "second-key@example.test", password, {
        address: "198.51.100.82",
      }),
      "a third address key is refused while two are live",
    );
    f.clock.time += 60 * minute;
    assertLoginRefused(
      await login(f, "newcomer@example.test", password, {
        address: "198.51.100.82",
      }),
      "expired entries release their capacity",
    );
    assert.equal(
      (await login(f, "kept@example.test", password, { address })).status,
      200,
    );
  },
);

// Clearing an address's attempts after a password reset (D-102, task
// reset-hasla). These cases drive the policy with an explicit clock.
function clockedPolicy(options = {}) {
  const clock = { time: 1_000_000 };
  return {
    clock,
    policy: new AccountPolicy({ now: () => clock.time, ...options }),
  };
}

function failLogin(policy, email, address) {
  const ticket = policy.admitLogin(email, address);
  assert.ok(ticket, `${email} from ${address} is admitted`);
  ticket.fail();
}

test("the password rules of a new password are those of registration, with the same problems", () => {
  const long = "p".repeat(12);
  assert.deepEqual(
    checkNewPassword({ password: long, passwordConfirmation: long }),
    {
      ok: true,
      password: long,
    },
  );
  assert.deepEqual(
    checkNewPassword({
      password: "p".repeat(11),
      passwordConfirmation: "p".repeat(11),
    }),
    { ok: false, problem: "invalid-password" },
  );
  assert.deepEqual(
    checkNewPassword({ password: long, passwordConfirmation: `${long}x` }),
    { ok: false, problem: "password-mismatch" },
  );
  assert.deepEqual(
    checkRegistration({
      email: " A@B ",
      password: long,
      passwordConfirmation: `${long}x`,
    }),
    { ok: false, problem: "password-mismatch" },
  );
  assert.deepEqual(
    checkRegistration({
      email: "nobody",
      password: "short",
      passwordConfirmation: "short",
    }),
    { ok: false, problem: "invalid-email" },
  );
  assert.deepEqual(
    checkRegistration({
      email: " A@B ",
      password: long,
      passwordConfirmation: long,
    }),
    { ok: true, email: "a@b", password: long },
  );
});

test("a locked address admits a login after its attempts are cleared, and failures before the lock are forgotten", () => {
  // invariant: account-attempt-limits
  // Faults: a clear that leaves the lock or the failures; a lock lifted for
  // every address.
  const { clock, policy } = clockedPolicy();
  for (let attempt = 0; attempt < 5; attempt += 1)
    failLogin(policy, "locked@example.test", `198.51.100.${attempt}`);
  failLogin(policy, "other@example.test", "198.51.100.9");
  clock.time += minute;
  assert.equal(policy.admitLogin("locked@example.test", "198.51.100.77"), null);
  policy.clearEmailAttempts("locked@example.test");
  const ticket = policy.admitLogin("locked@example.test", "198.51.100.77");
  assert.ok(ticket, "the cleared address is admitted inside the old lock");
  ticket.release();
  for (let attempt = 0; attempt < 4; attempt += 1)
    failLogin(policy, "locked@example.test", "198.51.100.78");
  const last = policy.admitLogin("locked@example.test", "198.51.100.78");
  assert.ok(last, "four failures after the clear do not lock");
  last.fail();
  assert.equal(
    policy.admitLogin("locked@example.test", "198.51.100.79"),
    null,
    "five new failures lock again",
  );
  failLogin(policy, "other@example.test", "198.51.100.9");
  assert.equal(policy.inFlight, 0);
});

test("clearing an address's attempts leaves its client address's failures counting", () => {
  // invariant: account-attempt-limits
  // Faults: a clear that empties the client-address entries too.
  const { policy } = clockedPolicy();
  const address = "198.51.100.20";
  for (let attempt = 0; attempt < 5; attempt += 1)
    failLogin(policy, "locked@example.test", address);
  for (let other = 0; other < 3; other += 1)
    for (let attempt = 0; attempt < 4; attempt += 1)
      failLogin(policy, `other-${other}@example.test`, address);
  // 5 + 4 + 4 + 4 = 17 so far; three more reach twenty.
  for (let attempt = 0; attempt < 3; attempt += 1)
    failLogin(policy, `more-${attempt}@example.test`, address);
  assert.equal(policy.admitLogin("fresh@example.test", address), null);
  policy.clearEmailAttempts("locked@example.test");
  assert.equal(
    policy.admitLogin("locked@example.test", address),
    null,
    "the client address is still at its limit",
  );
  const elsewhere = policy.admitLogin("locked@example.test", "198.51.100.21");
  assert.ok(elsewhere, "the cleared address is admitted from another client");
  elsewhere.release();
});

test("a login in progress at a clear keeps its reservation and settles once on the same entry", () => {
  // invariant: account-attempt-limits
  // Faults: a clear that drops the entry, resets the reservation or lets a
  // settlement count twice.
  const { policy } = clockedPolicy();
  const email = "busy@example.test";
  const address = "198.51.100.30";
  for (let attempt = 0; attempt < 3; attempt += 1)
    failLogin(policy, email, `198.51.100.${35 + attempt}`);
  const running = policy.admitLogin(email, address);
  assert.ok(running);
  assert.equal(policy.inFlight, 1);
  policy.clearEmailAttempts(email);
  assert.equal(policy.inFlight, 1, "the clear does not settle the login");
  for (let attempt = 0; attempt < 4; attempt += 1)
    failLogin(policy, email, `198.51.100.${40 + attempt}`);
  assert.equal(
    policy.admitLogin(email, "198.51.100.50"),
    null,
    "four failures and the reservation of the login in progress are five",
  );
  running.fail();
  running.fail();
  running.succeed();
  assert.equal(policy.inFlight, 0, "settled once");
  assert.equal(
    policy.admitLogin(email, "198.51.100.51"),
    null,
    "its failure counts after the clear and locks the address",
  );
});

test("clearing an unknown address changes nothing and a clear frees a locked place without touching others", () => {
  // invariant: account-attempt-tracking
  // Faults: a clear that fills a place for an address with no entry, or that
  // disturbs another live entry of a full table.
  const { policy } = clockedPolicy({ keyCapacity: 2 });
  for (let attempt = 0; attempt < 5; attempt += 1) {
    failLogin(policy, "one@example.test", "198.51.100.60");
    failLogin(policy, "two@example.test", "198.51.100.70");
  }
  policy.clearEmailAttempts("nobody@example.test");
  assert.equal(
    policy.admitLogin("three@example.test", "198.51.100.60"),
    null,
    "a full table of live entries still refuses a newcomer",
  );
  assert.equal(policy.admitLogin("two@example.test", "198.51.100.60"), null);
  policy.clearEmailAttempts("one@example.test");
  const ticket = policy.admitLogin("three@example.test", "198.51.100.60");
  assert.ok(ticket, "the cleared address no longer holds its place");
  ticket.release();
  assert.equal(
    policy.admitLogin("two@example.test", "198.51.100.70"),
    null,
    "another address keeps its lock",
  );
});

// Blocking by the owner (task blokada-konta, To do 3 and 4). The message is the
// one the owner settled (task, question 4; Mariusz, 2026-10-28).
const blockedMessage = "To konto jest zablokowane.";

test(
  "no session of a blocked account authorizes lookup or logout, in any browser, also after unblocking",
  { timeout: 20000 },
  async (t) => {
    // invariant: blocked-account-access
    // invariant: player-server-session
    // invariant: unblock-restores-no-session
    // Faults: blocking that leaves the account's sessions stored; authorization
    // that ignores the account's state; unblocking that revives removed sessions.
    const f = await accountFixture(t);
    const email = "blocked-browsers@example.test";
    const created = await register(f, email, { address: "198.51.100.90" });
    assert.equal(created.status, 201, "precondition: registered");
    const first = issuedSession(created, "first browser");
    const second = issuedSession(
      await login(f, email, password, { address: "198.51.100.91" }),
      "second browser",
    );
    const other = seed(f, "blocked-other", f.second);
    for (const cookie of [first.cookie, second.cookie])
      assert.equal((await readAccount(f, cookie)).status, 200, "precondition");

    assert.equal(f.runtime.database.blockAccount(email), "blocked");
    for (const [label, session] of [
      ["first browser", first],
      ["second browser", second],
    ]) {
      assert.equal(storedRow(f, session.id), undefined, `${label}: removed`);
      assertRefusal(
        await readAccount(f, session.cookie),
        401,
        `${label} lookup`,
      );
      assertRefusal(await logout(f, session.cookie), 401, `${label} logout`);
    }
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
      emailConfirmed: false,
    });

    // A session row of the blocked account stored past the write guard, as by
    // a read that loaded its session just before the block committed.
    const account = storedAccount(f, email);
    f.inspection
      .prepare("INSERT INTO sessions VALUES (?, ?, ?, ?)")
      .run(
        "blocked-late",
        account.id,
        sessionData(account, Date.now() + 86_400_000),
        Date.now() + 86_400_000,
      );
    const late = signedCookie("blocked-late", f.keys[0]);
    assertRefusal(await readAccount(f, late), 401, "a row past the guard");
    assertRefusal(
      await logout(f, late),
      401,
      "logout with a row past the guard",
    );
    f.inspection
      .prepare("DELETE FROM sessions WHERE id = 'blocked-late'")
      .run();

    assert.equal(f.runtime.database.unblockAccount(email), "unblocked");
    for (const [label, session] of [
      ["first browser", first],
      ["second browser", second],
    ]) {
      assertRefusal(
        await readAccount(f, session.cookie),
        401,
        `${label} after unblocking`,
      );
      assert.equal(
        storedRow(f, session.id),
        undefined,
        `${label}: not revived`,
      );
    }
    const again = await login(f, email, password, { address: "198.51.100.92" });
    assert.equal(again.status, 200, "the unblocked account signs in anew");
    assert.equal(
      (await readAccount(f, issuedSession(again, "new login").cookie)).status,
      200,
    );
  },
);

test(
  "a blocked account's correct password gets its own refusal and no session, a wrong one the common message, and only the wrong one counts",
  { timeout: 30000 },
  async (t) => {
    // invariant: blocked-account-access
    // Faults: a blocked login signed in, or answered with the common message;
    // the block revealed before the password is checked; a blocked login
    // counted as a failure (it would lock the address) or as a success (it
    // would clear the address's failures).
    const f = await accountFixture(t);
    const email = "blocked-login@example.test";
    assert.equal(
      (await register(f, email, { address: "198.51.100.93" })).status,
      201,
    );
    assert.equal(f.runtime.database.blockAccount(email), "blocked");
    const right = () => login(f, email, password);
    const wrong = () => login(f, email, `${password}!`);

    const refused = await right();
    assertMessage(refused, 403, blockedMessage, "correct password");
    assert.equal(JSON.parse(refused.body).code, "account-blocked");
    assert.ok(!("id" in JSON.parse(refused.body)), "no account");
    assert.equal(sessionCount(f), 0, "no session is stored");
    assertLoginRefused(await wrong(), "a wrong password of a blocked account");

    // D-102: five failures lock the address. Four wrong passwords, then five
    // blocked logins: none of them locks, and none clears the four.
    for (let attempt = 2; attempt <= 4; attempt += 1)
      assertLoginRefused(await wrong(), `failure ${attempt}`);
    for (let attempt = 1; attempt <= 5; attempt += 1)
      assertMessage(await right(), 403, blockedMessage, `blocked ${attempt}`);
    assertLoginRefused(await wrong(), "the fifth failure");
    assertLimited(await right(), "the locked address refuses before the block");
    assert.equal(sessionCount(f), 0);

    f.clock.time += 15 * minute;
    assert.equal(f.runtime.database.unblockAccount(email), "unblocked");
    const signedIn = await right();
    assert.equal(signedIn.status, 200, "unblocked, the password signs in");
    issuedSession(signedIn, "after unblocking");
  },
);

test(
  "a block committed while the password is checked refuses that login as blocked and clears no failure",
  { timeout: 30000 },
  async (t) => {
    // Faults: the login deciding on the account it read before the password
    // check, so that it answers 503 and its success clears the four failures.
    const f = await accountFixture(t);
    const email = "blocked-during@example.test";
    assert.equal(
      (await register(f, email, { address: "198.51.100.94" })).status,
      201,
    );
    for (let attempt = 1; attempt <= 4; attempt += 1)
      assertLoginRefused(
        await login(f, email, `${password}!`),
        `failure ${attempt}`,
      );
    const pending = login(f, email, password);
    // The account is read before the password work starts, in the same turn
    // that admits the attempt (as in the disconnected-login case above).
    await waitFor(() => f.policy.inFlight === 1, "login admitted");
    assert.equal(f.runtime.database.blockAccount(email), "blocked");
    assertMessage(await pending, 403, blockedMessage, "blocked meanwhile");
    assert.equal(sessionCount(f), 0, "no session is stored");
    assertLoginRefused(await login(f, email, `${password}!`), "fifth failure");
    assertLimited(await login(f, email, password), "the four still counted");
  },
);

// A reset committed directly on the database, as a reset request does in one
// transaction: the link is recorded, then the password hash replaced and every
// session of the account deleted.
function resetDirectly(f, email, passwordHash) {
  const tokenDigest = createHash("sha256")
    .update(randomBytes(16))
    .digest("base64url");
  const issued = f.runtime.database.issueLink(
    {
      accountId: storedAccount(f, email).id,
      purpose: "password-reset",
      tokenDigest,
      lifetimeMs: 60 * minute,
    },
    { windowMs: 60 * minute, total: 30, perAccount: 3 },
  );
  assert.equal(issued, "issued", "precondition: a reset link is recorded");
  assert.equal(
    f.runtime.database.resetPassword(tokenDigest, passwordHash).outcome,
    "reset",
  );
}

test(
  "a password replaced while the old password is checked refuses that login, stores no session and clears no failure",
  { timeout: 30000 },
  async (t) => {
    // invariant: password-reset-ends-sessions
    // Faults: a login deciding on the account it read before the password
    // check, so that it answers 503 or stores a session of the old password;
    // a refusal counted as a failure or as a success.
    const f = await accountFixture(t);
    const email = "replaced-during@example.test";
    assert.equal(
      (await register(f, email, { address: "198.51.100.95" })).status,
      201,
    );
    const replacement = await hashPassword("a password set by the reset");
    for (let attempt = 1; attempt <= 4; attempt += 1)
      assertLoginRefused(
        await login(f, email, `${password}!`),
        `failure ${attempt}`,
      );
    assert.equal(sessionCount(f), 1, "precondition: the registration's own");
    const pending = login(f, email, password);
    await waitFor(() => f.policy.inFlight === 1, "login admitted");
    resetDirectly(f, email, replacement);
    assertLoginRefused(await pending, "replaced meanwhile");
    assert.equal(sessionCount(f), 0, "no session is stored");
    assertLoginRefused(await login(f, email, `${password}!`), "fifth failure");
    assertLimited(await login(f, email, password), "the four still counted");
  },
);

test(
  "a password replaced while a registration waits on its message leaves no session, and the cookie it got is refused",
  { timeout: 30000 },
  async (t) => {
    // invariant: password-reset-ends-sessions
    // Fault: a second store, made when the response ends, that writes without
    // the guard; the login case commits before either store and cannot see it.
    const f = await accountFixture(t);
    const email = "replaced-waiting@example.test";
    f.mailer.outcome = "hold";
    const settled = register(f, email, { address: "198.51.100.96" }).then(
      (response) => response,
      (error) => error,
    );
    const replacement = await hashPassword("a password set by the reset");
    try {
      await waitFor(() => f.mailer.held.length === 1, "message handed on");
      assert.equal(sessionCount(f), 1, "precondition: the first store");
      resetDirectly(f, email, replacement);
      assert.equal(sessionCount(f), 0, "the reset deleted it");
    } finally {
      for (const answer of f.mailer.held) answer("sent");
    }
    const response = await settled;
    assert.equal(response.status, 201, "the registration still answers");
    assert.equal(sessionCount(f), 0, "the second store put nothing back");
    const { cookie } = issuedSession(response, "registration");
    assertRefusal(await readAccount(f, cookie), 401, "its cookie");
  },
);

// Email confirmation (task potwierdzenie-adresu). The routes, bodies and the
// one refusal of a link come from spec Decision 4 and D-156; the link's form
// from spec Decision 2; its 24 hours from D-155; the limits from D-105.
const invalidLink = {
  code: "invalid-link",
  error: "Odnośnik jest nieważny albo wygasł.",
};
const day = 24 * 60 * minute;

function confirm(f, fields, options = {}) {
  return post(f, "/api/email-confirmation", fields, options);
}

function resend(f, cookie, fields = {}, options = {}) {
  return post(f, "/api/email-confirmation-message", fields, {
    ...options,
    cookie,
  });
}

// The configured public origin, `/#confirm-email=` and 43 base64url
// characters, alone on a line of the message.
function tokenOf(message) {
  assert.ok(message, "a message was handed on");
  const link =
    /^https:\/\/game\.example\.test:8443\/#confirm-email=([A-Za-z0-9_-]{43})$/m.exec(
      message.text,
    );
  assert.ok(link, "the message holds the link on a line of its own");
  return link[1];
}

const lastToken = (f) => tokenOf(f.mailer.messages.at(-1));

function linkCount(f, accountId) {
  return accountId === undefined
    ? f.inspection.prepare("SELECT count(*) AS n FROM emailed_links").get().n
    : f.inspection
        .prepare("SELECT count(*) AS n FROM emailed_links WHERE account_id = ?")
        .get(accountId).n;
}

function confirmedAt(f, email) {
  return f.inspection
    .prepare("SELECT email_confirmed_at AS at FROM accounts WHERE email = ?")
    .get(email).at;
}

function outcomeOf(response, status, label) {
  assert.equal(response.status, status, label);
  assert.match(response.headers["content-type"], /^application\/json/, label);
  assert.equal(response.headers["cache-control"], "no-store", label);
  return JSON.parse(response.body).confirmationMessage;
}

function assertInvalidLink(response, label) {
  assert.equal(response.status, 400, label);
  assert.match(response.headers["content-type"], /^application\/json/, label);
  assert.equal(response.headers["cache-control"], "no-store", label);
  assert.deepEqual(JSON.parse(response.body), invalidLink, label);
}

function assertInvalidRequest(response, label) {
  assert.equal(response.status, 400, label);
  assert.equal(JSON.parse(response.body).code, "invalid-request", label);
}

// Another connection to the same file, as the owner's block command opens.
function asOwner(f, action) {
  const owner = new AccountDatabase(f.path);
  try {
    return action(owner);
  } finally {
    owner.close();
  }
}

// Messages recorded directly, as earlier sendings within the hour would be.
function recordMessages(f, accountId, count) {
  const insert = f.inspection.prepare(`
    INSERT INTO emailed_links
      (token_digest, account_id, purpose, created_at, expires_at, spent)
    VALUES (?, ?, 'email-confirmation', ?, ?, 1)
  `);
  const now = Date.now();
  for (let index = 0; index < count; index += 1)
    insert.run(
      randomBytes(32).toString("base64url"),
      accountId,
      now,
      now + day,
    );
}

test(
  "registration answers 201 with its message's outcome in every case and the player stays signed in",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-message-limits
    // Faults: waiting on a silent mailer without bound; a failed, broken or
    // limited sending reported as sent or failing the registration; a message
    // handed on whose link was never recorded.
    const f = await accountFixture(t, { sendingDeadline: 300 });
    const cases = [
      ["sent", "sent", "sent@example.test"],
      ["failed", "failed", "failed@example.test"],
      ["reject", "failed", "broken@example.test"],
      ["never", "failed", "silent@example.test"],
    ];
    for (const [index, [behaviour, expected, email]] of cases.entries()) {
      f.mailer.outcome = behaviour;
      const handed = f.mailer.messages.length;
      const created = await register(f, email, {
        address: `198.51.100.${100 + index}`,
      });
      assert.equal(outcomeOf(created, 201, behaviour), expected, behaviour);
      const stored = storedAccount(f, email);
      assert.deepEqual(
        JSON.parse(created.body),
        {
          id: stored.id,
          email,
          emailConfirmed: false,
          confirmationMessage: expected,
        },
        behaviour,
      );
      const session = issuedSession(created, behaviour);
      assert.equal(
        storedRow(f, session.id)?.account_id,
        stored.id,
        `${behaviour}: signed in`,
      );
      assert.equal(
        f.mailer.messages.length,
        handed + 1,
        `${behaviour}: handed on`,
      );
      assert.equal(
        f.mailer.messages.at(-1).to,
        email,
        `${behaviour}: own address`,
      );
      tokenOf(f.mailer.messages.at(-1));
      const links = f.inspection
        .prepare(
          "SELECT purpose, created_at, expires_at FROM emailed_links WHERE account_id = ?",
        )
        .all(stored.id);
      assert.equal(links.length, 1, `${behaviour}: its link is recorded`);
      assert.equal(links[0].purpose, "email-confirmation");
      assert.equal(links[0].expires_at - links[0].created_at, day, "24 hours");
    }

    f.mailer.outcome = "sent";
    const handed = f.mailer.messages.length;
    f.inspection.exec(`
      CREATE TRIGGER refuse_link BEFORE INSERT ON emailed_links
      BEGIN SELECT RAISE(ABORT, 'synthetic link refusal'); END;
    `);
    const unrecorded = await register(f, "unrecorded@example.test", {
      address: "198.51.100.110",
    });
    assert.equal(outcomeOf(unrecorded, 201, "issue throws"), "failed");
    issuedSession(unrecorded, "issue throws");
    assert.doesNotMatch(unrecorded.body, /synthetic|trigger|sqlite/i);
    assert.equal(f.mailer.messages.length, handed, "no link, no message");
    f.inspection.exec("DROP TRIGGER refuse_link");

    // D-105: 30 messages within the hour in total.
    recordMessages(f, f.second.id, 30 - linkCount(f));
    const limited = await register(f, "limited@example.test", {
      address: "198.51.100.111",
    });
    assert.equal(outcomeOf(limited, 201, "limited"), "limited");
    issuedSession(limited, "limited");
    assert.equal(f.mailer.messages.length, handed, "nothing handed on");
    assert.equal(linkCount(f, storedAccount(f, "limited@example.test").id), 0);
  },
);

test(
  "a refused registration or one whose session is not stored hands no message on and records no link",
  { timeout: 20000 },
  async (t) => {
    // Faults: sending before the registration is accepted or before its
    // session is stored.
    const f = await accountFixture(t);
    assert.equal((await register(f, "no-at-sign")).status, 400);
    assert.equal((await register(f, "FIRST@example.test")).status, 409);
    await withFullGate(async () =>
      assertLimited(await register(f, "gate@example.test"), "full gate"),
    );
    f.inspection.exec(`
      CREATE TRIGGER refuse_session BEFORE INSERT ON sessions
      BEGIN SELECT RAISE(ABORT, 'synthetic session refusal'); END;
    `);
    const unsaved = await register(f, "unsaved@example.test");
    assert.ok(unsaved.status >= 500, "an unstored session is a failure");
    assert.ok(!("confirmationMessage" in JSON.parse(unsaved.body)));
    f.inspection.exec("DROP TRIGGER refuse_session");
    assert.equal(f.mailer.messages.length, 0, "nothing handed on");
    assert.equal(linkCount(f), 0, "no link recorded");
    const control = await register(f, "control@example.test");
    assert.equal(outcomeOf(control, 201, "control"), "sent");
    assert.equal(f.mailer.messages.length, 1);
  },
);

test(
  "only a valid session of an unblocked account asks for a message, and it goes only to that account's own address",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-session-authorization
    // invariant: blocked-account-access
    // Faults: a resend without the session guard; an address or account taken
    // from the request; a blocked account's session still sending; a
    // confirmed account sent another message.
    const f = await accountFixture(t);
    const own = seed(f, "resend-first", f.first);
    for (const [label, cookie] of [
      ["absent", null],
      ["unknown", signedCookie("resend-unknown", f.keys[0])],
      ["foreign key", signedCookie("resend-first", randomBytes(32))],
    ]) {
      const refused = await resend(f, cookie);
      assertRefusal(refused, 401, label);
      assert.equal(JSON.parse(refused.body).code, "unauthenticated", label);
    }
    for (const fields of [
      { email: "second@example.test" },
      { accountId: f.second.id },
      { to: "elsewhere@example.test" },
    ])
      assertInvalidRequest(
        await resend(f, own, fields),
        JSON.stringify(fields),
      );
    assert.equal(f.mailer.messages.length, 0, "nothing handed on");
    assert.equal(linkCount(f), 0, "no link recorded");

    const query = `accountId=${f.second.id}&email=second%40example.test`;
    const sent = await f.send(`/api/email-confirmation-message?${query}`, {
      method: "POST",
      headers: { ...logoutHeaders, Cookie: own, "X-Account-Id": f.second.id },
      body: "{}",
    });
    assert.equal(outcomeOf(sent, 200, "own session"), "sent");
    assert.deepEqual(JSON.parse(sent.body), { confirmationMessage: "sent" });
    assert.deepEqual(
      f.mailer.messages.map((message) => message.to),
      ["first@example.test"],
    );
    assert.equal(linkCount(f, f.first.id), 1);
    assert.equal(linkCount(f, f.second.id), 0);

    const blocked = seed(f, "resend-blocked", f.second);
    assert.equal(
      f.runtime.database.blockAccount("second@example.test"),
      "blocked",
    );
    assertRefusal(
      await resend(f, blocked),
      401,
      "a session deleted by the block",
    );
    // A row of the blocked account past the write guard, as a session read
    // just before the block committed.
    f.inspection
      .prepare("INSERT INTO sessions VALUES (?, ?, ?, ?)")
      .run(
        "resend-late",
        f.second.id,
        sessionData(f.second, Date.now() + day),
        Date.now() + day,
      );
    const late = signedCookie("resend-late", f.keys[0]);
    assertRefusal(await resend(f, late), 401, "a row past the guard");
    f.inspection.prepare("DELETE FROM sessions WHERE id = 'resend-late'").run();
    assert.equal(
      f.runtime.database.unblockAccount("second@example.test"),
      "unblocked",
    );
    assertRefusal(await resend(f, blocked), 401, "after unblocking");
    assert.equal(f.mailer.messages.length, 1, "nothing handed on");
    assert.equal(linkCount(f, f.second.id), 0);

    assert.equal(
      (await confirm(f, { token: lastToken(f) })).status,
      204,
      "precondition: the first account is confirmed",
    );
    const confirmed = await resend(f, own);
    assert.equal(confirmed.status, 409);
    assert.equal(confirmed.headers["cache-control"], "no-store");
    const refusal = JSON.parse(confirmed.body);
    assert.equal(refusal.code, "email-already-confirmed");
    assert.equal(typeof refusal.error, "string");
    assert.equal(f.mailer.messages.length, 1, "nothing handed on");
    assert.equal(linkCount(f, f.first.id), 1, "no link recorded");
  },
);

test(
  "above three messages an hour for an account or thirty in total a resend answers limited and hands nothing on, until the hour has passed",
  { timeout: 30000 },
  async (t) => {
    // invariant: account-message-limits
    // Faults: a limit checked after the message is handed on; limits counted
    // per route or only for sent messages; a limit that never ends.
    const f = await accountFixture(t);
    const own = seed(f, "limit-first", f.first);
    f.mailer.outcome = "failed";
    assert.equal(outcomeOf(await resend(f, own), 200, "first"), "failed");
    f.mailer.outcome = "sent";
    for (const label of ["second", "third"])
      assert.equal(outcomeOf(await resend(f, own), 200, label), "sent");
    assert.equal(outcomeOf(await resend(f, own), 200, "fourth"), "limited");
    assert.equal(f.mailer.messages.length, 3, "the fourth is not handed on");
    assert.equal(linkCount(f, f.first.id), 3, "the fourth is not recorded");

    const other = seed(f, "limit-second", f.second);
    const third = f.runtime.database.createAccount(
      "third@example.test",
      f.runtime.dummyHash,
    );
    const thirdCookie = seed(f, "limit-third", third);
    recordMessages(f, f.first.id, 26);
    assert.equal(outcomeOf(await resend(f, other), 200, "thirtieth"), "sent");
    assert.equal(
      outcomeOf(await resend(f, thirdCookie), 200, "thirty-first"),
      "limited",
    );
    assert.equal(f.mailer.messages.length, 4);

    f.inspection
      .prepare("UPDATE emailed_links SET created_at = ?")
      .run(Date.now() - 60 * minute - 1);
    assert.equal(
      outcomeOf(await resend(f, thirdCookie), 200, "after the hour"),
      "sent",
    );
    assert.equal(
      outcomeOf(await resend(f, own), 200, "the account's own, after the hour"),
      "sent",
    );
    assert.equal(f.mailer.messages.length, 6);
  },
);

// One spelling of the same 32 bytes that is not the canonical one: the last of
// 43 characters carries two unused bits.
function otherSpelling(token) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const last = alphabet.indexOf(token.at(-1));
  return token.slice(0, -1) + alphabet[last | 1];
}

test(
  "a link confirms its own account once, with or without a session, and every malformed, unknown or used token gets the one refusal and changes nothing",
  { timeout: 20000 },
  async (t) => {
    // invariant: email-confirmation-link
    // Faults: a link confirming twice; refusals that tell a malformed, unknown
    // and used token apart; a token taken in another spelling; confirming the
    // session's account instead of the link's.
    const f = await accountFixture(t);
    const email = "confirm@example.test";
    const { cookie } = issuedSession(await register(f, email), "registration");
    const token = lastToken(f);
    assert.equal(
      Buffer.from(otherSpelling(token), "base64url").compare(
        Buffer.from(token, "base64url"),
      ),
      0,
      "precondition: the other spelling decodes to the same bytes",
    );
    for (const [label, value] of [
      ["empty", ""],
      ["one character short", token.slice(0, 42)],
      ["one character long", `${token}A`],
      ["padded", `${token}=`],
      ["surrounded by spaces", ` ${token} `],
      ["outside the alphabet", "+".repeat(43)],
      ["another spelling of the same bytes", otherSpelling(token)],
      ["the whole link", `${origin}/#confirm-email=${token}`],
      ["unknown", randomBytes(32).toString("base64url")],
    ])
      assertInvalidLink(await confirm(f, { token: value }), label);
    for (const fields of [
      {},
      { token: 7 },
      { token: null },
      { token: [token] },
      { token, extra: true },
      { token, email },
    ])
      assertInvalidRequest(await confirm(f, fields), JSON.stringify(fields));
    assert.equal(confirmedAt(f, email), null, "nothing confirmed yet");

    const other = seed(f, "confirm-other", f.second);
    const confirmed = await confirm(f, { token }, { cookie: other });
    assert.equal(confirmed.status, 204);
    assert.equal(confirmed.body, "");
    assert.equal(confirmed.headers["cache-control"], "no-store");
    assert.equal(
      JSON.parse((await readAccount(f, cookie)).body).emailConfirmed,
      true,
    );
    assert.equal(
      JSON.parse((await readAccount(f, other)).body).emailConfirmed,
      false,
      "the link's account is confirmed, not the session's",
    );
    const at = confirmedAt(f, email);
    assert.ok(Number.isSafeInteger(at), "the confirmation is stored");
    assertInvalidLink(await confirm(f, { token }), "used");
    assert.equal(confirmedAt(f, email), at, "a refused link changes nothing");
    const signedIn = await login(f, email, password);
    assert.equal(JSON.parse(signedIn.body).emailConfirmed, true);
  },
);

test(
  "a later message's link stops earlier ones, also when its sending failed, and an expired or other-kind link confirms nothing",
  { timeout: 20000 },
  async (t) => {
    // invariant: email-confirmation-link
    // Faults: earlier links stopped only after a successful sending; a link
    // checked without its expiry or its kind.
    const f = await accountFixture(t);
    const email = "supersede@example.test";
    const { cookie } = issuedSession(await register(f, email), "registration");
    const first = lastToken(f);
    assert.equal(outcomeOf(await resend(f, cookie), 200, "second"), "sent");
    const second = lastToken(f);
    f.mailer.outcome = "failed";
    assert.equal(outcomeOf(await resend(f, cookie), 200, "third"), "failed");
    const third = lastToken(f);
    assertInvalidLink(await confirm(f, { token: first }), "first");
    assertInvalidLink(await confirm(f, { token: second }), "second");

    const account = storedAccount(f, email).id;
    const live = f.inspection
      .prepare(
        "SELECT token_digest AS digest, expires_at AS expiresAt FROM emailed_links WHERE account_id = ? AND spent = 0",
      )
      .all(account);
    assert.equal(live.length, 1, "precondition: one link works");
    const change = (sql, value) =>
      f.inspection.prepare(sql).run(value, live[0].digest);
    change(
      "UPDATE emailed_links SET purpose = ? WHERE token_digest = ?",
      "password-reset",
    );
    assertInvalidLink(await confirm(f, { token: third }), "another kind");
    change(
      "UPDATE emailed_links SET purpose = ? WHERE token_digest = ?",
      "email-confirmation",
    );
    change(
      "UPDATE emailed_links SET expires_at = ? WHERE token_digest = ?",
      Date.now() - 1,
    );
    assertInvalidLink(await confirm(f, { token: third }), "expired");
    change(
      "UPDATE emailed_links SET expires_at = ? WHERE token_digest = ?",
      live[0].expiresAt,
    );
    assert.equal(confirmedAt(f, email), null, "nothing confirmed yet");
    assert.equal((await confirm(f, { token: third })).status, 204);
    assert.ok(confirmedAt(f, email) !== null);
  },
);

test(
  "a block committed through another connection while the message is on its way stops its link for good, and a block just before recording sends nothing",
  { timeout: 20000 },
  async (t) => {
    // invariant: unblock-restores-no-link
    // invariant: email-confirmation-link
    // Faults: a link recorded without reading the block in its transaction; a
    // block that leaves a link on its way working; an unblock that revives it;
    // a message handed on for an account already blocked.
    const f = await accountFixture(t);
    const email = "on-its-way@example.test";
    f.mailer.outcome = "hold";
    const settled = register(f, email).then(
      (response) => response,
      (error) => error,
    );
    try {
      await waitFor(() => f.mailer.held.length === 1, "message handed on");
      assert.equal(
        asOwner(f, (owner) => owner.blockAccount(email)),
        "blocked",
      );
    } finally {
      for (const answer of f.mailer.held) answer("sent");
    }
    assert.equal(outcomeOf(await settled, 201, "registration"), "sent");
    const token = lastToken(f);
    assertInvalidLink(await confirm(f, { token }), "blocked");
    assert.equal(
      asOwner(f, (owner) => owner.unblockAccount(email)),
      "unblocked",
    );
    assertInvalidLink(await confirm(f, { token }), "after unblocking");
    assert.equal(confirmedAt(f, email), null);

    f.mailer.outcome = "sent";
    const handed = f.mailer.messages.length;
    let target = "blocked-before@example.test";
    const blocks = [];
    f.hooks.beforeIssue = () =>
      blocks.push(asOwner(f, (owner) => owner.blockAccount(target)));
    const refused = await register(f, target, { address: "198.51.100.120" });
    assert.equal(outcomeOf(refused, 201, "registration"), "failed");
    assert.equal(linkCount(f, storedAccount(f, target).id), 0);
    target = "first@example.test";
    const resent = await resend(f, seed(f, "blocked-before", f.first));
    assertRefusal(resent, 401, "resend");
    assert.equal(JSON.parse(resent.body).code, "unauthenticated");
    f.hooks.beforeIssue = null;
    assert.deepEqual(
      blocks,
      ["blocked", "blocked"],
      "precondition: both blocked",
    );
    assert.equal(linkCount(f, f.first.id), 0);
    assert.equal(f.mailer.messages.length, handed, "nothing handed on");
  },
);

test(
  "no response and no line of the server's log holds a link's token",
  { timeout: 20000 },
  async (t) => {
    // Faults: a token echoed in an answer; the link, the message or an error
    // holding the token written to the log.
    const f = await accountFixture(t, { sendingDeadline: 200 });
    const logged = [];
    const methods = ["log", "info", "warn", "error", "debug"];
    const originals = methods.map((name) => console[name]);
    t.after(() =>
      methods.forEach((name, index) => {
        console[name] = originals[index];
      }),
    );
    for (const name of methods)
      console[name] = (...values) => logged.push(values.map(String).join(" "));
    const responses = [];
    const keep = async (pending) => {
      const response = await pending;
      responses.push(response);
      return response;
    };
    const { cookie } = issuedSession(
      await keep(register(f, "secret@example.test")),
      "registration",
    );
    for (const outcome of ["never", "reject", "failed"]) {
      f.mailer.outcome = outcome;
      await keep(resend(f, cookie));
    }
    f.mailer.outcome = "sent";
    f.inspection.exec(`
      CREATE TRIGGER refuse_link BEFORE INSERT ON emailed_links
      BEGIN SELECT RAISE(ABORT, 'synthetic link refusal'); END;
    `);
    await keep(register(f, "unrecorded@example.test"));
    f.inspection.exec("DROP TRIGGER refuse_link");
    const tokens = f.mailer.messages.map(tokenOf);
    for (const token of [...tokens, tokens[0]])
      await keep(confirm(f, { token }));
    assert.ok(logged.length > 0, "precondition: the failures were logged");
    for (const token of tokens) {
      for (const response of responses)
        assert.ok(
          !response.body.includes(token) &&
            !JSON.stringify(response.headers).includes(token),
          "no answer holds a token",
        );
      assert.ok(
        !logged.some((line) => line.includes(token)),
        "no log line holds a token",
      );
    }
    assert.ok(!logged.some((line) => line.includes("confirm-email")));
  },
);

// The saved game state routes (task zapis-stanu-na-serwerze, spec decision 1).
// The server reads nothing inside `game`, so the games below are plain objects.
const savedGamePath = "/api/saved-game";

function putSave(f, cookie, body, extra = {}, path = savedGamePath) {
  const headers = { ...logoutHeaders, ...extra };
  if (cookie) headers.Cookie = cookie;
  return f.send(path, {
    method: "PUT",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function getSave(f, cookie, extra = {}, path = savedGamePath) {
  return readAccount(f, cookie, path, extra);
}

function storedSave(f, accountId) {
  return f.inspection
    .prepare(
      "SELECT version, revision, game FROM saved_games WHERE account_id = ?",
    )
    .get(accountId);
}

function assertSaveRefusal(response, status, code, label) {
  assertRefusal(response, status, label);
  assert.equal(JSON.parse(response.body).code, code, label);
}

test(
  "each account's session reads and replaces only its own saved game state",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-save-isolation
    // Faults: the row chosen by an account named in the body, the query or a
    // header; one shared row; a save answered to the wrong account.
    const f = await accountFixture(t);
    const one = seed(f, "save-one", f.first);
    const two = seed(f, "save-two", f.second);
    assert.deepEqual(JSON.parse((await getSave(f, one)).body), { save: null });
    assert.deepEqual(JSON.parse((await getSave(f, two)).body), { save: null });

    const gameOne = { owner: "first", steps: [1, 2, 3] };
    const gameTwo = { owner: "second", steps: [] };
    const savedOne = await putSave(f, one, {
      version: 1,
      basedOn: 0,
      game: gameOne,
    });
    assert.equal(savedOne.status, 200);
    assert.deepEqual(JSON.parse(savedOne.body), { revision: 1 });
    assert.equal(
      storedSave(f, f.second.id),
      undefined,
      "the other is untouched",
    );
    const savedTwo = await putSave(f, two, {
      version: 1,
      basedOn: 0,
      game: gameTwo,
    });
    assert.deepEqual(JSON.parse(savedTwo.body), { revision: 1 });
    assert.deepEqual(JSON.parse((await getSave(f, one)).body), {
      save: { version: 1, revision: 1, game: gameOne },
    });
    assert.deepEqual(JSON.parse((await getSave(f, two)).body), {
      save: { version: 1, revision: 1, game: gameTwo },
    });

    // An account named in the body is refused; named in the query or a header
    // it selects nothing, so the replacement lands on the session's account.
    for (const named of [
      { accountId: f.second.id },
      { id: f.second.id },
      { email: "second@example.test" },
    ]) {
      const refused = await putSave(f, one, {
        version: 1,
        basedOn: 1,
        game: { owner: "intruder" },
        ...named,
      });
      assertSaveRefusal(refused, 400, "invalid-request", JSON.stringify(named));
    }
    assert.equal(storedSave(f, f.first.id).game, JSON.stringify(gameOne));
    assert.equal(storedSave(f, f.second.id).game, JSON.stringify(gameTwo));
    const replaced = await putSave(
      f,
      one,
      { version: 1, basedOn: 1, game: { owner: "first", steps: [4] } },
      { "X-Account-Id": f.second.id },
      `${savedGamePath}?accountId=${f.second.id}&id=${f.second.id}`,
    );
    assert.deepEqual(JSON.parse(replaced.body), { revision: 2 });
    assert.equal(storedSave(f, f.second.id).revision, 1);
    assert.equal(storedSave(f, f.second.id).game, JSON.stringify(gameTwo));
    const read = await getSave(
      f,
      one,
      { "X-Account-Id": f.second.id },
      `${savedGamePath}?accountId=${f.second.id}`,
    );
    assert.deepEqual(JSON.parse(read.body), {
      save: { version: 1, revision: 2, game: { owner: "first", steps: [4] } },
    });
    assert.deepEqual(
      JSON.parse((await getSave(f, two)).body).save.game,
      gameTwo,
    );
  },
);

test(
  "no session, a forged or removed session and a session of a blocked account get JSON 401 on both save routes and change no saved game state",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-session-authorization
    // invariant: blocked-account-access
    // Faults: a save route without the session guard; a block read only from
    // the session; a refused save that still writes.
    const f = await accountFixture(t);
    const own = seed(f, "save-401-live", f.first);
    const game = { kept: "as stored" };
    assert.deepEqual(
      JSON.parse(
        (await putSave(f, own, { version: 1, basedOn: 0, game })).body,
      ),
      { revision: 1 },
      "precondition: the account holds a saved game state",
    );
    const before = storedSave(f, f.first.id);
    const attempt = { version: 2, basedOn: 1, game: { replaced: true } };
    const refusedBy = async (label, cookie) => {
      assertSaveRefusal(
        await getSave(f, cookie),
        401,
        "unauthenticated",
        `${label} read`,
      );
      assertSaveRefusal(
        await putSave(f, cookie, attempt),
        401,
        "unauthenticated",
        `${label} save`,
      );
      assert.deepEqual(
        storedSave(f, f.first.id),
        before,
        `${label}: unchanged`,
      );
    };
    for (const [label, cookie] of [
      ["absent", null],
      ["foreign key", signedCookie("save-401-live", randomBytes(32))],
      ["unsigned", "__Host-loop2.sid=save-401-live"],
      ["unknown", signedCookie("save-401-unknown", f.keys[0])],
    ])
      await refusedBy(label, cookie);

    // An identifier of the account in place of a session authorizes nothing.
    await refusedBy("account identifier", signedCookie(f.first.id, f.keys[0]));

    const removed = seed(f, "save-401-removed", f.first);
    assert.equal((await getSave(f, removed)).status, 200, "precondition");
    f.runtime.database.destroySession("save-401-removed");
    await refusedBy("removed", removed);

    // The block deletes the account's sessions and keeps its saved game state.
    const blocked = seed(f, "save-401-blocked", f.first);
    assert.equal(
      f.runtime.database.blockAccount("first@example.test"),
      "blocked",
    );
    await refusedBy("blocked", blocked);
    f.inspection
      .prepare("INSERT INTO sessions VALUES (?, ?, ?, ?)")
      .run(
        "save-401-late",
        f.first.id,
        sessionData(f.first, Date.now() + day),
        Date.now() + day,
      );
    await refusedBy(
      "a row past the block",
      signedCookie("save-401-late", f.keys[0]),
    );
    assert.equal(
      f.runtime.database.unblockAccount("first@example.test"),
      "unblocked",
    );
    await refusedBy("blocked, after unblocking", blocked);

    // Control: the account's new session reads and replaces its state.
    const fresh = seed(f, "save-401-fresh", f.first);
    assert.deepEqual(JSON.parse((await getSave(f, fresh)).body), {
      save: { version: 1, revision: 1, game },
    });
    assert.deepEqual(JSON.parse((await putSave(f, fresh, attempt)).body), {
      revision: 2,
    });
  },
);

test(
  "a block committed between the session check and the write stores nothing and answers 401",
  { timeout: 20000 },
  async (t) => {
    // invariant: blocked-account-access
    // Fault: a write that does not read the block in its own transaction.
    const f = await accountFixture(t);
    const cookie = seed(f, "save-race", f.first);
    f.hooks.beforeSave = () => {
      f.runtime.database.blockAccount("first@example.test");
      f.hooks.beforeSave = null;
    };
    const raced = await putSave(f, cookie, {
      version: 1,
      basedOn: 0,
      game: { never: "stored" },
    });
    assertSaveRefusal(raced, 401, "unauthenticated", "raced save");
    assert.equal(storedSave(f, f.first.id), undefined);
  },
);

test(
  "the save routes answer null with no save, count revisions from 1, refuse an outdated version before a stale basis and return the game unchanged",
  { timeout: 20000 },
  async (t) => {
    // Spec decision 1; D-209 (revision basis), D-210 (version).
    // Faults: the revision check before the version check; a revision that does
    // not advance by one; a game that comes back changed.
    const f = await accountFixture(t);
    const cookie = seed(f, "save-contract", f.first);
    const read = async () => JSON.parse((await getSave(f, cookie)).body);
    const save = async (version, basedOn, game) =>
      putSave(f, cookie, { version, basedOn, game });
    const first = await getSave(f, cookie);
    assert.equal(first.status, 200);
    assert.match(first.headers["content-type"], /^application\/json/);
    assert.equal(first.headers["cache-control"], "no-store");
    assert.deepEqual(JSON.parse(first.body), { save: null });

    // A game whose text has every kind of value, 1e21 among them.
    const game = {
      name: "zażółć gęślą jaźń 🙂",
      list: [1, 2.5, -3, 1e21, true, null, { nested: [] }],
      empty: {},
    };
    const saved = await save(1, 0, game);
    assert.equal(saved.status, 200);
    assert.match(saved.headers["content-type"], /^application\/json/);
    assert.equal(saved.headers["cache-control"], "no-store");
    assert.deepEqual(JSON.parse(saved.body), { revision: 1 });
    assert.deepEqual(await read(), { save: { version: 1, revision: 1, game } });

    // A save of the same version on the basis it saw is revision 2.
    assert.deepEqual(JSON.parse((await save(1, 1, { turn: 2 })).body), {
      revision: 2,
    });
    // A basis other than the stored revision, lower or higher, conflicts.
    for (const basedOn of [0, 1, 3, 99]) {
      assertSaveRefusal(
        await save(1, basedOn, { turn: "lost" }),
        409,
        "save-conflict",
        `basis ${basedOn}`,
      );
    }
    assert.deepEqual(await read(), {
      save: { version: 1, revision: 2, game: { turn: 2 } },
    });

    // A higher version is accepted; the stored version then outranks a stale
    // basis, so an old tab reads "outdated", not "conflict".
    assert.deepEqual(JSON.parse((await save(3, 2, { turn: 3 })).body), {
      revision: 3,
    });
    for (const basedOn of [3, 2, 0]) {
      assertSaveRefusal(
        await save(2, basedOn, { turn: "old tab" }),
        409,
        "save-outdated",
        `version 2 on basis ${basedOn}`,
      );
    }
    assertSaveRefusal(
      await save(3, 2, { turn: "stale" }),
      409,
      "save-conflict",
      "same version, stale basis",
    );
    assert.deepEqual(await read(), {
      save: { version: 3, revision: 3, game: { turn: 3 } },
    });
  },
);

test(
  "each malformed save body is a 400 that stores nothing, and a body that is not an object never reaches the fields",
  { timeout: 20000 },
  async (t) => {
    // Spec decision 1 (exact fields and types); trust boundary of the slice.
    // Faults: coercing a string to a number; accepting an extra field, a
    // missing basis, a fraction, an unsafe integer or a game that is not an
    // object.
    const f = await accountFixture(t);
    const cookie = seed(f, "save-malformed", f.first);
    const kept = { version: 2, basedOn: 0, game: { kept: true } };
    assert.equal((await putSave(f, cookie, kept)).status, 200, "precondition");
    const before = storedSave(f, f.first.id);
    const valid = { version: 2, basedOn: 1, game: { turn: 2 } };
    const bodies = [
      ["no version", { basedOn: 1, game: {} }],
      ["no basedOn", { version: 2, game: {} }],
      ["no game", { version: 2, basedOn: 1 }],
      ["extra field", { ...valid, extra: 1 }],
      ["account field", { ...valid, accountId: f.second.id }],
      ["version zero", { ...valid, version: 0 }],
      ["negative version", { ...valid, version: -1 }],
      ["fractional version", { ...valid, version: 1.5 }],
      ["string version", { ...valid, version: "2" }],
      ["null version", { ...valid, version: null }],
      ["boolean version", { ...valid, version: true }],
      ["version beyond the safe range", { ...valid, version: 2 ** 53 }],
      ["huge version", { ...valid, version: 1e300 }],
      ["negative basedOn", { ...valid, basedOn: -1 }],
      ["fractional basedOn", { ...valid, basedOn: 0.5 }],
      ["string basedOn", { ...valid, basedOn: "1" }],
      ["array basedOn", { ...valid, basedOn: [1] }],
      ["basedOn beyond the safe range", { ...valid, basedOn: 2 ** 53 }],
      ["huge basedOn", { ...valid, basedOn: 1e300 }],
      ["null game", { ...valid, game: null }],
      ["array game", { ...valid, game: [] }],
      ["string game", { ...valid, game: '{"turn":2}' }],
      ["number game", { ...valid, game: 7 }],
    ];
    for (const [label, body] of bodies)
      assertSaveRefusal(
        await putSave(f, cookie, body),
        400,
        "invalid-request",
        label,
      );
    for (const [label, text] of [
      ["empty", ""],
      ["broken", "{"],
      ["array", "[]"],
      ["null", "null"],
      ["scalar", "7"],
    ]) {
      const response = await putSave(f, cookie, text);
      assert.equal(response.status, 400, label);
      assert.match(response.headers["content-type"], /^application\/json/);
    }
    assert.deepEqual(storedSave(f, f.first.id), before, "nothing changed");
    // Control: the valid body is accepted.
    assert.deepEqual(JSON.parse((await putSave(f, cookie, valid)).body), {
      revision: 2,
    });

    // A game nested too deep to serialize is refused, not a server failure.
    const depth = 30_000;
    const deep = `{"version":2,"basedOn":2,"game":{"a":${"[".repeat(depth)}${"]".repeat(depth)}}}`;
    assert.ok(
      Buffer.byteLength(deep) < 64 * 1024,
      "precondition: under the body limit",
    );
    const refused = await putSave(f, cookie, deep);
    assertSaveRefusal(refused, 400, "invalid-request", "deep nesting");
    assert.equal(storedSave(f, f.first.id).revision, 2, "nothing changed");
  },
);

test(
  "the stored text of a game is measured in bytes after re-serializing, at most 65 536, and a larger one is a 413 that stores nothing",
  { timeout: 20000 },
  async (t) => {
    // Spec decision 3: the body limit alone does not bound the stored text.
    // Faults: measuring the request's text, or characters, not the stored
    // bytes; a limit off by one.
    const f = await accountFixture(t);
    const cookie = seed(f, "save-large", f.first);
    // `1e21` takes 4 bytes in the request and 5 in the stored text; "ą" takes
    // 2 bytes in both and 1 character. The stored text is
    // {"s":"<ą x 30000><x x pad>","n":[1e+21 x count]}: 6 + 60 000 + pad bytes,
    // then 7 for `","n":[`, 6 per number less the last comma, and 2 for `]}`.
    // count 920, pad 2: 6 + 60 000 + 2 + 7 + 5 519 + 2 = 65 536 bytes exactly.
    const gameOf = (pad, count) => ({
      s: "ą".repeat(30_000) + "x".repeat(pad),
      n: Array.from({ length: count }, () => 1e21),
    });
    const bodyOf = (pad, count, basedOn = 0) =>
      `{"version":1,"basedOn":${basedOn},"game":{"s":"${"ą".repeat(30_000)}${"x".repeat(pad)}","n":[${Array(count).fill("1e21").join(",")}]}}`;
    const exactly = { pad: 2, count: 920, bytes: 65_536 };
    const over = { pad: 3, count: 920, bytes: 65_537 };
    // count 1097, pad 0: 6 + 60 000 + 7 + 6 581 + 2 = 66 596 stored bytes,
    // 36 602 characters, and a request of 65 532 bytes.
    const lengthened = { pad: 0, count: 1_097, bytes: 66_596 };
    for (const { pad, count, bytes } of [exactly, over, lengthened]) {
      assert.equal(
        Buffer.byteLength(JSON.stringify(gameOf(pad, count))),
        bytes,
        "precondition: stored bytes",
      );
      assert.ok(
        Buffer.byteLength(bodyOf(pad, count)) <= 64 * 1024,
        "precondition: the request is within the body limit",
      );
    }
    assert.ok(
      JSON.stringify(gameOf(0, 1_097)).length <= 65_536,
      "precondition: counted in characters it would fit",
    );
    for (const { pad, count } of [over, lengthened]) {
      const response = await putSave(f, cookie, bodyOf(pad, count));
      assertSaveRefusal(response, 413, "save-too-large", `${pad} ${count}`);
      assert.equal(storedSave(f, f.first.id), undefined, "nothing stored");
    }
    const accepted = await putSave(
      f,
      cookie,
      bodyOf(exactly.pad, exactly.count),
    );
    assert.deepEqual(JSON.parse(accepted.body), { revision: 1 });
    assert.equal(
      Buffer.byteLength(storedSave(f, f.first.id).game),
      65_536,
      "a stored text of exactly 65 536 bytes",
    );
    // An oversized refusal leaves the earlier state in place.
    assertSaveRefusal(
      await putSave(f, cookie, bodyOf(over.pad, over.count, 1)),
      413,
      "save-too-large",
      "over, with a revision to replace",
    );
    assert.equal(storedSave(f, f.first.id).revision, 1);
    const read = JSON.parse((await getSave(f, cookie)).body);
    assert.deepEqual(read.save.game, gameOf(exactly.pad, exactly.count));
  },
);
