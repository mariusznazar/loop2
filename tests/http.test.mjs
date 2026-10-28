import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { request } from "node:http";
import { createHmac, randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm, rmdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";
import session from "express-session";
import { AccountPolicy } from "../dist/server/account-policy.js";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";
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

test("unconfigured accounts answer the four canonical routes as unavailable JSON", async () => {
  // D-111: wholly unconfigured non-production serves JSON 503 from known account routes.
  for (const [method, path] of [
    ["POST", "/api/accounts"],
    ["POST", "/api/session"],
    ["GET", "/api/account"],
    ["POST", "/api/logout"],
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

async function accountFixture(t, { keyCapacity } = {}) {
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
  runtime = await openAccountRuntime({
    LOOP2_DATABASE_PATH: path,
    LOOP2_SESSION_SECRET_FILE: secretFile,
    LOOP2_PUBLIC_ORIGIN: origin,
    LOOP2_PROXY_MODE: "cloudflare-tunnel",
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
  const policy = new AccountPolicy({ now: () => clock.time, keyCapacity });
  const app = createApp(runtime, policy);
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
    });
    assert.ok(
      storedRow(f, "lookup-first").data === before.data,
      "an ordinary account read touches the record without rewriting it",
    );
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
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
    });
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
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
    });
    assert.deepEqual(JSON.parse((await readAccount(f, other)).body), {
      id: f.second.id,
      email: "second@example.test",
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
    });
    assert.deepEqual(
      JSON.parse((await readAccount(f, registered.cookie)).body),
      { id: account, email: "fresh@example.test" },
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
