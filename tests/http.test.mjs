import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { request } from "node:http";
import { createHmac, randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm, rmdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import session from "express-session";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";

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
  // D-109: wholly unconfigured non-production serves JSON 503 from known account routes.
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
// D-99: 30 days from the last request.
const sessionLifetime = 30 * 24 * 60 * 60 * 1000;

async function accountFixture(t) {
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
  const app = createApp(runtime);
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

function seed(f, id, account, expiresAt = Date.now() + 86_400_000) {
  // One day remains of a 30-day session, so a renewal visibly moves its expiry.
  const cookie = new session.Cookie({
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: sessionLifetime,
  });
  cookie.expires = new Date(expiresAt);
  cookie.originalMaxAge = sessionLifetime;
  const data = JSON.stringify({ accountId: account.id, cookie });
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
    // D-95 and D-99: other browsers of the same account stay signed in.
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
    // D-107: logout awaits destruction; a database refusal stands in for any failure.
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
    // D-99: a delayed renewal cannot resurrect a destroyed session.
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
