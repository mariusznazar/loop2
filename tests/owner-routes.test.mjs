import assert from "node:assert/strict";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import session from "express-session";
import { createApp } from "../dist/server/app.js";
import { openAccountRuntime } from "../dist/server/configuration.js";
import { AccountDatabase } from "../dist/server/database.js";

// The routes of the owner panel on a real server and real SQLite files (D-109,
// D-137, D-400, D-410): who may call them, in which order the server asks, and
// what each operation changes.

const origin = "https://game.example.test:8443";
const proxyHeaders = {
  "X-Forwarded-Proto": "https",
  "CF-Connecting-IP": "192.0.2.7",
};
const DAY = 86_400_000;
const sessionLifetime = 30 * DAY;
const limits = { windowMs: 3_600_000, total: 30, perAccount: 3 };

const paths = {
  list: "/api/owner/accounts",
  block: "/api/owner/block",
  unblock: "/api/owner/unblock",
  grant: "/api/owner/grant-previous-save",
  revoke: "/api/owner/revoke-previous-save",
};
const postPaths = [paths.block, paths.unblock, paths.grant, paths.revoke];
const fivePaths = [paths.list, ...postPaths];
// The account on which each operation changes something where it is carried out:
// `other` is neither blocked nor privileged, `blocked` is both.
const effective = {
  [paths.block]: "other@example.test",
  [paths.unblock]: "blocked@example.test",
  [paths.grant]: "other@example.test",
  [paths.revoke]: "blocked@example.test",
};

function send(to, path, { method = "GET", headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
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

async function listening(app) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  return server;
}

async function closeServer(server) {
  if (!server?.listening) return;
  server.closeAllConnections();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

// The messages the routes never send here are only ever recorded.
const standInMailer = { send: () => Promise.resolve("sent") };

async function panelFixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-owner-routes-"));
  let runtime, inspection, server;
  const operators = [];
  t.after(async () => {
    try {
      await closeServer(server);
    } finally {
      for (const operator of operators) operator.close();
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
  const accounts = {};
  for (const name of ["owner", "coowner", "player", "other", "blocked"]) {
    accounts[name] = runtime.database.createAccount(
      `${name}@example.test`,
      runtime.dummyHash,
    );
    assert.ok(accounts[name], `precondition: the account ${name}`);
  }
  runtime.database.setAccountRole("owner@example.test", "owner");
  runtime.database.setAccountRole("coowner@example.test", "owner");
  runtime.database.setPreviousSavePrivilege("blocked@example.test", true);
  runtime.database.blockAccount("blocked@example.test");
  // A case may act just before a block of the panel is carried out, as a second
  // connection committing between the route's checks and its write would.
  const hooks = { beforeBlock: null };
  const database = new Proxy(runtime.database, {
    get(target, name) {
      const value = Reflect.get(target, name, target);
      if (typeof value !== "function") return value;
      if (name !== "blockForPanel") return value.bind(target);
      return (...parameters) => {
        hooks.beforeBlock?.();
        return value.apply(target, parameters);
      };
    },
  });
  server = await listening(
    createApp({ ...runtime, database, mailer: standInMailer }),
  );
  const to = server.address().port;
  return {
    runtime,
    inspection,
    keys,
    hooks,
    accounts,
    ...accounts,
    to,
    // A second connection on the same file, standing in for the operator's
    // command beside the server.
    operator() {
      const connection = new AccountDatabase(path);
      operators.push(connection);
      return connection;
    },
    send: (target, options) => send(to, target, options),
  };
}

function signedCookie(id, key) {
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

function seed(f, id, account) {
  const expiresAt = Date.now() + DAY;
  f.runtime.database.saveSession(id, {
    accountId: account.id,
    data: sessionData(account, expiresAt),
    expiresAt,
  });
  return signedCookie(id, f.keys[0]);
}

// A row stored past the write guard, as by a read that loaded its session just
// before a block committed, or one that has run out.
function plant(f, id, account, expiresAt) {
  f.inspection
    .prepare("INSERT INTO sessions VALUES (?, ?, ?, ?)")
    .run(id, account.id, sessionData(account, expiresAt), expiresAt);
  return signedCookie(id, f.keys[0]);
}

function storedSession(f, id) {
  return f.inspection
    .prepare("SELECT account_id, data FROM sessions WHERE id = ?")
    .get(id);
}

function sessionIds(f, accountId) {
  return f.inspection
    .prepare("SELECT id FROM sessions WHERE account_id = ? ORDER BY id")
    .all(accountId)
    .map((row) => row.id);
}

function issueLinks(f, account, name) {
  for (const purpose of ["email-confirmation", "password-reset"])
    f.runtime.database.issueLink(
      {
        accountId: account.id,
        purpose,
        tokenDigest: createHash("sha256")
          .update(`${name}-${purpose}`)
          .digest("base64url"),
        lifetimeMs: DAY,
      },
      limits,
    );
}

function spentLinks(f, accountId) {
  return f.inspection
    .prepare(
      "SELECT spent FROM emailed_links WHERE account_id = ? ORDER BY token_digest",
    )
    .all(accountId)
    .map((row) => row.spent);
}

// Everything a route of the panel may change: the accounts with their blocked
// states, privileges and roles, the sessions, the links and both saved games.
// A session's expiry is left out because any request with a session renews it.
function state(f) {
  const all = (sql) =>
    f.inspection
      .prepare(sql)
      .all()
      .map((row) => ({ ...row }));
  return {
    accounts: all("SELECT * FROM accounts ORDER BY id"),
    sessions: all("SELECT id, account_id FROM sessions ORDER BY id"),
    links: all("SELECT * FROM emailed_links ORDER BY token_digest"),
    saves: all("SELECT * FROM saved_games ORDER BY account_id"),
    previous: all("SELECT * FROM previous_saves ORDER BY account_id"),
  };
}

function getFrom(f, path, cookie, change = {}) {
  return f.send(path, { headers: withHeaders(proxyHeaders, cookie, change) });
}

// `change` sets a header to its value, or removes it where the value is null.
function withHeaders(base, cookie, change) {
  const headers = { ...base };
  if (cookie) headers.Cookie = cookie;
  for (const [name, value] of Object.entries(change)) {
    if (value === null) delete headers[name];
    else headers[name] = value;
  }
  return headers;
}

function postTo(f, path, body, cookie, change = {}) {
  return f.send(path, {
    method: "POST",
    headers: withHeaders(
      {
        ...proxyHeaders,
        Origin: origin,
        "Content-Type": "application/json",
      },
      cookie,
      change,
    ),
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// A request to one of the five routes with the body that would do its work.
function attempt(f, path, cookie, body = { email: effective[path] }) {
  return path === paths.list
    ? getFrom(f, path, cookie)
    : postTo(f, path, body, cookie);
}

function assertJson(response, status, label) {
  assert.equal(response.status, status, label);
  assert.match(response.headers["content-type"], /^application\/json/, label);
  assert.equal(response.headers["cache-control"], "no-store", label);
  return JSON.parse(response.body);
}

function assertRefusal(response, status, code, label) {
  const body = assertJson(response, status, label);
  assert.deepEqual(Object.keys(body).sort(), ["code", "error"], label);
  assert.equal(body.code, code, label);
}

function assertOutcome(response, outcome, label) {
  assert.deepEqual(assertJson(response, 200, label), { outcome }, label);
}

function captureLog(t) {
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
  return logged;
}

const eventsOf = (logged) =>
  logged
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return {};
      }
    })
    .filter((fields) => "event" in fields);

test(
  "the list answers a session of an owner every account sorted by address, with its address, role, blocked state and privilege and nothing more",
  { timeout: 20000 },
  async (t) => {
    // decision: D-109 "A valid server-side session of an account with the owner role (D-410) alone also authorizes reading the list of accounts"
    // Faults: a list in the order the accounts were made; a field of an account
    // beside the four, such as its identifier or its password hash; a list that
    // leaves out a blocked account.
    const f = await panelFixture(t);
    f.runtime.database.createAccount("zulu@example.test", f.runtime.dummyHash);
    f.runtime.database.createAccount("alpha@example.test", f.runtime.dummyHash);
    f.runtime.database.setPreviousSavePrivilege("player@example.test", true);
    const cookie = seed(f, "list-owner", f.owner);
    const response = await getFrom(f, paths.list, cookie);
    assert.deepEqual(assertJson(response, 200, "the list"), {
      accounts: [
        {
          email: "alpha@example.test",
          role: "player",
          blocked: false,
          previousSaveAllowed: false,
        },
        {
          email: "blocked@example.test",
          role: "player",
          blocked: true,
          previousSaveAllowed: true,
        },
        {
          email: "coowner@example.test",
          role: "owner",
          blocked: false,
          previousSaveAllowed: false,
        },
        {
          email: "other@example.test",
          role: "player",
          blocked: false,
          previousSaveAllowed: false,
        },
        {
          email: "owner@example.test",
          role: "owner",
          blocked: false,
          previousSaveAllowed: false,
        },
        {
          email: "player@example.test",
          role: "player",
          blocked: false,
          previousSaveAllowed: true,
        },
        {
          email: "zulu@example.test",
          role: "player",
          blocked: false,
          previousSaveAllowed: false,
        },
      ],
    });
  },
);

test(
  "a session of a player is answered 403 owner-forbidden on each of the five routes, whatever the body, and nothing changes",
  { timeout: 20000 },
  async (t) => {
    // invariant: owner-panel-authorization
    // decision: D-109 "Each of those five routes returns JSON 401 with the code `unauthenticated` without a valid session and JSON 403 with the code `owner-forbidden` to a valid session of an account without the owner role, checked after the session and before the body is read, with nothing read of the body and nothing changed"
    // Faults: a route with no check of the role; the role checked after the body
    // (a body that is no valid one would then be answered 400); a role checked
    // on the list only; an answer other than 403 owner-forbidden.
    const f = await panelFixture(t);
    const cookie = seed(f, "forbidden-player", f.player);
    issueLinks(f, f.other, "other");
    const before = state(f);
    for (const path of fivePaths) {
      assertRefusal(
        await attempt(f, path, cookie),
        403,
        "owner-forbidden",
        `${path}: the body that would do the work`,
      );
      if (path === paths.list) continue;
      for (const [label, body] of [
        ["a field of the wrong type", { email: 42, extra: true }],
        ["no field", {}],
        ["an account identifier", { accountId: f.other.id }],
        ["an address no account has", { email: "nobody@example.test" }],
        ["an address of the owner", { email: "owner@example.test" }],
      ])
        assertRefusal(
          await postTo(f, path, body, cookie),
          403,
          "owner-forbidden",
          `${path}: ${label}`,
        );
    }
    assert.deepEqual(state(f), before);
  },
);

test(
  "no session, a forged, unknown, expired or ended session and a session of a blocked owner are answered 401 on each of the five routes, and nothing changes",
  { timeout: 20000 },
  async (t) => {
    // invariant: owner-panel-authorization
    // invariant: blocked-account-access
    // decision: D-109 "Each of those five routes returns JSON 401 with the code `unauthenticated` without a valid session and JSON 403 with the code `owner-forbidden` to a valid session of an account without the owner role, checked after the session and before the body is read, with nothing read of the body and nothing changed"
    // Faults: a route that serves where the session is missing; a session that
    // names an account without being a stored session (the identifier of the
    // account sent as the cookie); a session of a blocked owner served because
    // the role is an owner's.
    const f = await panelFixture(t);
    const live = seed(f, "refused-live", f.owner);
    const ended = seed(f, "refused-ended", f.owner);
    f.runtime.database.destroySession("refused-ended");
    const expired = plant(f, "refused-expired", f.owner, Date.now() - 1000);
    assert.equal(
      f.runtime.database.blockAccount("coowner@example.test").outcome,
      "blocked",
    );
    const blockedOwner = plant(
      f,
      "refused-blocked-owner",
      f.coowner,
      Date.now() + DAY,
    );
    assert.equal(
      (await getFrom(f, paths.list, live)).status,
      200,
      "precondition: a live session of an owner is served",
    );
    const before = state(f);
    for (const [label, cookie] of [
      ["absent", null],
      [
        "a key that is not the server's",
        signedCookie("refused-live", randomBytes(32)),
      ],
      ["unsigned", "__Host-loop2.sid=refused-live"],
      ["unknown", signedCookie("refused-unknown", f.keys[0])],
      ["the identifier of an account", signedCookie(f.owner.id, f.keys[0])],
      ["removed", ended],
      ["expired", expired],
      ["of a blocked owner", blockedOwner],
    ])
      for (const path of fivePaths)
        assertRefusal(
          await attempt(f, path, cookie),
          401,
          "unauthenticated",
          `${label}: ${path}`,
        );
    assert.deepEqual(state(f), before);
  },
);

const secret = "Correct horse battery staple";

// The cookie a sign-in or a registration issues, and the identifier of the
// session it names; the session is one the server's own store wrote.
function issued(response) {
  const pair = response.headers["set-cookie"][0].split(";")[0];
  const value = decodeURIComponent(pair.slice(pair.indexOf("=") + 1));
  return { cookie: pair, id: value.slice(2, value.lastIndexOf(".")) };
}

test(
  "the role is read from the database at each request: an account made a player is refused on its next request and one made an owner after its sign-in is served",
  { timeout: 20000 },
  async (t) => {
    // invariant: owner-panel-authorization
    // decision: D-410 "The server reads the role of an account from the database at each request that depends on it and never from the session, so a role given or taken holds from the next request"
    // Faults: a role kept in the session at sign-in and read from it; a role
    // read once and remembered for the session or the process.
    const f = await panelFixture(t);
    const operator = f.operator();
    const registration = await postTo(f, "/api/accounts", {
      email: "fresh@example.test",
      password: secret,
      passwordConfirmation: secret,
    });
    assertJson(registration, 201, "registration");
    const registered = issued(registration);
    assertRefusal(
      await getFrom(f, paths.list, registered.cookie),
      403,
      "owner-forbidden",
      "a player is refused",
    );

    assert.equal(
      operator.setAccountRole("fresh@example.test", "owner").outcome,
      "made-owner",
    );
    assert.equal(
      (await getFrom(f, paths.list, registered.cookie)).status,
      200,
      "the same session, its account made an owner after the sign-in: the list",
    );
    assertOutcome(
      await postTo(
        f,
        paths.grant,
        { email: "other@example.test" },
        registered.cookie,
      ),
      "granted",
      "the same session, its account made an owner: an operation",
    );
    assert.doesNotMatch(
      storedSession(f, registered.id).data,
      /role|owner/,
      "the stored session holds no role",
    );

    assert.equal(
      operator.setAccountRole("fresh@example.test", "player").outcome,
      "made-player",
    );
    assertRefusal(
      await getFrom(f, paths.list, registered.cookie),
      403,
      "owner-forbidden",
      "the same session, its account made a player: the list",
    );
    const afterTaking = state(f);
    assertRefusal(
      await postTo(
        f,
        paths.block,
        { email: "player@example.test" },
        registered.cookie,
      ),
      403,
      "owner-forbidden",
      "the same session, its account made a player: a block",
    );
    assert.deepEqual(
      state(f),
      afterTaking,
      "the refused block changed nothing",
    );

    assert.equal(
      operator.setAccountRole("fresh@example.test", "owner").outcome,
      "made-owner",
    );
    const signIn = await postTo(f, "/api/session", {
      email: "fresh@example.test",
      password: secret,
    });
    assert.equal(assertJson(signIn, 200, "sign-in").role, "owner");
    const second = issued(signIn);
    assert.equal(
      (await getFrom(f, paths.list, second.cookie)).status,
      200,
      "a session of an owner signed in as an owner",
    );
    assert.equal(
      operator.setAccountRole("fresh@example.test", "player").outcome,
      "made-player",
    );
    for (const [label, cookie] of [
      ["the session of the sign-in", second.cookie],
      ["the session of the registration", registered.cookie],
    ])
      assertRefusal(
        await getFrom(f, paths.list, cookie),
        403,
        "owner-forbidden",
        `${label}, the role taken`,
      );
  },
);

test(
  "a block of an account with the owner role, the caller's own included, is answered 409 owner-not-blockable and changes nothing, also where the role was given just before",
  { timeout: 20000 },
  async (t) => {
    // invariant: owner-panel-authorization
    // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included: the transaction of the block reads the role and the server answers JSON 409 with the code `owner-not-blockable`, also where a second connection gave the role just before the block"
    // Faults: a block that blocks an owner; one that refuses only another
    // owner's account and blocks the caller's own; a role read in one
    // transaction and the block written in another.
    const f = await panelFixture(t);
    const operator = f.operator();
    const cookie = seed(f, "owner-block", f.owner);
    const targetCookie = seed(f, "owner-block-target", f.coowner);
    issueLinks(f, f.coowner, "coowner");
    const before = state(f);
    for (const email of [
      "coowner@example.test",
      "owner@example.test",
      " Owner@Example.Test ",
    ])
      assertRefusal(
        await postTo(f, paths.block, { email }, cookie),
        409,
        "owner-not-blockable",
        email,
      );
    assert.deepEqual(state(f), before);
    assert.equal(
      (await getFrom(f, paths.list, cookie)).status,
      200,
      "the caller's session is still served",
    );
    assert.equal((await getFrom(f, paths.list, targetCookie)).status, 200);

    issueLinks(f, f.player, "player");
    const playerCookie = seed(f, "owner-block-player", f.player);
    const beforeRace = state(f);
    f.hooks.beforeBlock = () => {
      f.hooks.beforeBlock = null;
      assert.equal(
        operator.setAccountRole("player@example.test", "owner").outcome,
        "made-owner",
      );
    };
    assertRefusal(
      await postTo(f, paths.block, { email: "player@example.test" }, cookie),
      409,
      "owner-not-blockable",
      "a role given just before the block",
    );
    const afterRace = state(f);
    assert.deepEqual(
      afterRace.accounts.find((row) => row.id === f.player.id),
      {
        ...beforeRace.accounts.find((row) => row.id === f.player.id),
        role: "owner",
      },
      "only the role the second connection gave differs",
    );
    assert.deepEqual(afterRace.sessions, beforeRace.sessions);
    assert.deepEqual(afterRace.links, beforeRace.links);
    assert.equal((await getFrom(f, paths.list, playerCookie)).status, 200);
  },
);

test(
  "a block ends the target's sessions in every browser and stops its links, an unblock restores none, and each change leaves one line with the target's number and nothing of the owner",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-server-session
    // invariant: unblock-restores-no-session
    // invariant: unblock-restores-no-link
    // decision: D-137 "An account with the owner role (D-410) also blocks and unblocks a player account, named by its email address in the body of `POST /api/owner/block` or `POST /api/owner/unblock` of the owner panel, which the server answers only to a valid session of such an account, with the same effects in the same one transaction and the answers `blocked`, `already-blocked`, `unblocked` or `not-blocked`, JSON 404 with the code `unknown-account` where no account has that address"
    // decision: D-252 "A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted"
    // Faults: a block that leaves a session or a link of its target, or ends one
    // of another account; an unblock that restores either; a line for an outcome
    // that changed nothing; a line that names the acting owner.
    const f = await panelFixture(t);
    const ownerCookie = seed(f, "block-owner", f.owner);
    const first = seed(f, "block-browser-one", f.player);
    const second = seed(f, "block-browser-two", f.player);
    const bystander = seed(f, "block-bystander", f.other);
    issueLinks(f, f.player, "player");
    issueLinks(f, f.other, "other");
    assert.deepEqual(spentLinks(f, f.player.id), [0, 0], "precondition");
    const logged = captureLog(t);
    const block = (email) => postTo(f, paths.block, { email }, ownerCookie);
    const unblock = (email) => postTo(f, paths.unblock, { email }, ownerCookie);

    assertOutcome(await block("player@example.test"), "blocked", "block");
    assert.deepEqual(sessionIds(f, f.player.id), []);
    for (const cookie of [first, second])
      assertRefusal(
        await getFrom(f, "/api/account", cookie),
        401,
        "unauthenticated",
        "a browser of the target after the block",
      );
    assert.deepEqual(spentLinks(f, f.player.id), [1, 1]);
    assert.deepEqual(sessionIds(f, f.other.id), ["block-bystander"]);
    assert.deepEqual(spentLinks(f, f.other.id), [0, 0]);
    assert.equal((await getFrom(f, "/api/account", bystander)).status, 200);
    assert.deepEqual(eventsOf(logged), [
      { event: "account-blocked", accountId: f.player.id },
    ]);

    assertOutcome(
      await block("player@example.test"),
      "already-blocked",
      "again",
    );
    assert.equal(eventsOf(logged).length, 1, "no line for no change");

    assertOutcome(await unblock("player@example.test"), "unblocked", "unblock");
    assert.deepEqual(sessionIds(f, f.player.id), [], "no session restored");
    for (const cookie of [first, second])
      assertRefusal(
        await getFrom(f, "/api/account", cookie),
        401,
        "unauthenticated",
        "a browser of the target after the unblock",
      );
    assert.deepEqual(spentLinks(f, f.player.id), [1, 1], "no link restored");
    assert.deepEqual(eventsOf(logged), [
      { event: "account-blocked", accountId: f.player.id },
      { event: "account-unblocked", accountId: f.player.id },
    ]);

    assertOutcome(await unblock("player@example.test"), "not-blocked", "again");
    assertOutcome(
      await unblock(" Blocked@Example.Test "),
      "unblocked",
      "an address written as at login",
    );
    assert.equal(eventsOf(logged).length, 3);

    const text = logged.join("\n");
    for (const secret of [
      f.owner.id,
      "owner@example.test",
      "player@example.test",
    ])
      assert.ok(!text.includes(secret), `the log holds no ${secret}`);
  },
);

test(
  "a grant and a revoke of the previous-save privilege act on a player and on an owner, end no session, stop no link and leave one line each with the target's number",
  { timeout: 20000 },
  async (t) => {
    // decision: D-400 "An account with the owner role (D-410) also grants and revokes the privilege of any account, an account with the owner role included, from the owner panel, by `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save` with the account's email address in the body, which the server answers only to a valid session of such an account, with the answers `granted`, `already-granted`, `revoked` or `not-granted` and JSON 404 with the code `unknown-account` where no account has that address"
    // decision: D-252 "A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted"
    // Faults: a grant that ends the target's session or stops its link; a revoke
    // that leaves the next read open; a route that refuses an owner as a target;
    // a line for an outcome that changed nothing or that names the acting owner.
    const f = await panelFixture(t);
    const ownerCookie = seed(f, "grant-owner", f.owner);
    const playerCookie = seed(f, "grant-player", f.player);
    issueLinks(f, f.player, "player");
    const logged = captureLog(t);
    const grant = (email) => postTo(f, paths.grant, { email }, ownerCookie);
    const revoke = (email) => postTo(f, paths.revoke, { email }, ownerCookie);
    assertRefusal(
      await getFrom(f, "/api/previous-saved-game", playerCookie),
      403,
      "previous-save-forbidden",
      "precondition: no privilege",
    );

    assertOutcome(await grant("player@example.test"), "granted", "grant");
    assert.equal(
      (await getFrom(f, "/api/previous-saved-game", playerCookie)).status,
      200,
      "the next read is open",
    );
    assert.equal(
      JSON.parse((await getFrom(f, "/api/account", playerCookie)).body)
        .previousSaveAllowed,
      true,
    );
    assertOutcome(
      await grant("player@example.test"),
      "already-granted",
      "again",
    );
    assertOutcome(await revoke("player@example.test"), "revoked", "revoke");
    assertRefusal(
      await getFrom(f, "/api/previous-saved-game", playerCookie),
      403,
      "previous-save-forbidden",
      "the next read is closed",
    );
    assertOutcome(await revoke("player@example.test"), "not-granted", "again");
    assert.deepEqual(sessionIds(f, f.player.id), ["grant-player"]);
    assert.deepEqual(spentLinks(f, f.player.id), [0, 0]);
    assert.deepEqual(eventsOf(logged), [
      { event: "account-previous-save-granted", accountId: f.player.id },
      { event: "account-previous-save-revoked", accountId: f.player.id },
    ]);

    assertOutcome(await grant("coowner@example.test"), "granted", "an owner");
    assertOutcome(await grant("owner@example.test"), "granted", "the caller");
    assertOutcome(await revoke("coowner@example.test"), "revoked", "an owner");
    assert.deepEqual(eventsOf(logged).slice(2), [
      { event: "account-previous-save-granted", accountId: f.coowner.id },
      { event: "account-previous-save-granted", accountId: f.owner.id },
      { event: "account-previous-save-revoked", accountId: f.coowner.id },
    ]);
    assertOutcome(
      await grant(" Other@Example.Test "),
      "granted",
      "an address written as at login",
    );
    const text = logged.join("\n");
    assert.ok(!text.includes("@example.test"), "the log holds no address");
  },
);

test(
  "an address no account has, or none that is written as an address, is answered 404 unknown-account on each of the four routes and nothing changes or is logged",
  { timeout: 20000 },
  async (t) => {
    // decision: D-137 "An account with the owner role (D-410) also blocks and unblocks a player account, named by its email address in the body of `POST /api/owner/block` or `POST /api/owner/unblock` of the owner panel, which the server answers only to a valid session of such an account, with the same effects in the same one transaction and the answers `blocked`, `already-blocked`, `unblocked` or `not-blocked`, JSON 404 with the code `unknown-account` where no account has that address"
    // Faults: a route that answers 200 or 500 for an unknown address; one that
    // writes a line for it.
    const f = await panelFixture(t);
    const cookie = seed(f, "unknown-owner", f.owner);
    const before = state(f);
    const logged = captureLog(t);
    for (const path of postPaths)
      for (const email of [
        "nobody@example.test",
        "",
        "no-at-sign",
        "two@at@signs.test",
        "@example.test",
      ])
        assertRefusal(
          await postTo(f, path, { email }, cookie),
          404,
          "unknown-account",
          `${path}: ${JSON.stringify(email)}`,
        );
    assert.deepEqual(state(f), before);
    assert.deepEqual(eventsOf(logged), []);
  },
);

test(
  "a body of anything but exactly the address is answered 400 invalid-request and changes nothing, also from an owner",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-mutation-request-guards
    // decision: D-109 "A valid server-side session of an account with the owner role (D-410) alone also authorizes reading the list of accounts, `GET /api/owner/accounts`, and blocking, unblocking, granting the previous-save privilege to and revoking it from another account, `POST /api/owner/block`, `POST /api/owner/unblock`, `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save`, the role being read from the database at each request and never from the session, and the address in the body of those four routes naming the target and granting no authority"
    // Faults: a route that reads an identifier from the body; one that ignores a
    // field beside the address; one that coerces a number or a list into an address.
    const f = await panelFixture(t);
    const cookie = seed(f, "bodies-owner", f.owner);
    const before = state(f);
    for (const path of postPaths) {
      const email = effective[path];
      for (const [label, body] of [
        ["no field", {}],
        ["the address and an identifier", { email, accountId: f.other.id }],
        ["an identifier alone", { accountId: f.other.id }],
        ["the address and a role", { email, role: "owner" }],
        ["a field of another name", { address: email }],
        ["a number", { email: 42 }],
        ["null", { email: null }],
        ["a list", { email: [email] }],
        ["an object", { email: { value: email } }],
        ["a boolean", { email: true }],
      ])
        assertRefusal(
          await postTo(f, path, body, cookie),
          400,
          "invalid-request",
          `${path}: ${label}`,
        );
      for (const [label, text] of [
        ["a list", JSON.stringify([email])],
        ["a string", JSON.stringify(email)],
        ["null", "null"],
        ["a number", "42"],
      ]) {
        const response = await postTo(f, path, text, cookie);
        assert.equal(response.status, 400, `${path}: ${label}`);
      }
    }
    assert.deepEqual(state(f), before);
  },
);

test(
  "a foreign Origin, a body that is no JSON, a compressed one and one over 16 KiB are refused before the session on the four POST routes, and the transport before every route",
  { timeout: 20000 },
  async (t) => {
    // invariant: account-mutation-request-guards
    // decision: D-104 "Missing, null, duplicate, malformed or foreign Origin and wrong media type are refused before mutation or password work, and Host or forwarded host headers never choose the expected origin"
    // Faults: a route outside the guards; a session read before the guards (a
    // request with none would be answered 401); a body limit of 64 KiB.
    const f = await panelFixture(t);
    const cookie = seed(f, "guards-owner", f.owner);
    const before = state(f);
    const exact = (bytes) => {
      const head = '{"email":"';
      const tail = '"}';
      return head + "a".repeat(bytes - head.length - tail.length) + tail;
    };
    for (const session of [cookie, null])
      for (const path of postPaths) {
        const label = `${path} ${session ? "with" : "without"} a session`;
        const body = { email: effective[path] };
        for (const [what, change] of [
          ["no Origin", { Origin: null }],
          ["a foreign Origin", { Origin: "https://evil.example.test" }],
          ["a null Origin", { Origin: "null" }],
          ["an Origin with a path", { Origin: `${origin}/` }],
          ["an Origin with a suffix", { Origin: `${origin}.evil` }],
        ])
          assert.deepEqual(
            assertJson(
              await postTo(f, path, body, session, change),
              403,
              `${label}: ${what}`,
            ),
            { error: "Invalid request origin" },
          );
        for (const [what, change] of [
          ["no media type", { "Content-Type": null }],
          ["text", { "Content-Type": "text/plain" }],
          ["a form", { "Content-Type": "application/x-www-form-urlencoded" }],
          ["a compressed body", { "Content-Encoding": "gzip" }],
        ])
          assert.deepEqual(
            assertJson(
              await postTo(f, path, body, session, change),
              415,
              `${label}: ${what}`,
            ),
            { error: "JSON required" },
          );
        for (const [what, text] of [
          ["broken JSON", '{"email":'],
          ["an empty body", ""],
        ])
          assert.equal(
            (await postTo(f, path, text, session)).status,
            400,
            `${label}: ${what}`,
          );
        assert.equal(
          (await postTo(f, path, exact(16 * 1024 + 1), session)).status,
          413,
          `${label}: one byte over 16 KiB`,
        );
        assert.equal(
          (await postTo(f, path, exact(16 * 1024), session)).status,
          session ? 404 : 401,
          `${label}: 16 KiB exactly passes the guards`,
        );
      }
    assert.deepEqual(state(f), before);

    for (const [what, change] of [
      ["no forwarded protocol", { "X-Forwarded-Proto": null }],
      ["a forwarded protocol of http", { "X-Forwarded-Proto": "http" }],
      ["no client address", { "CF-Connecting-IP": null }],
      [
        "a client address that is none",
        { "CF-Connecting-IP": "not-an-address" },
      ],
    ]) {
      for (const session of [cookie, null]) {
        assert.deepEqual(
          assertJson(
            await f.send(paths.list, {
              headers: withHeaders(proxyHeaders, session, change),
            }),
            403,
            `list, ${what}`,
          ),
          { error: "Invalid request transport" },
        );
        for (const path of postPaths)
          assert.deepEqual(
            assertJson(
              await postTo(
                f,
                path,
                { email: effective[path] },
                session,
                change,
              ),
              403,
              `${path}, ${what}`,
            ),
            { error: "Invalid request transport" },
          );
      }
    }
    assert.deepEqual(state(f), before);
  },
);

test(
  "where accounts are not configured the five routes answer 503 JSON, and a method the routes do not serve is no operation",
  { timeout: 20000 },
  async (t) => {
    // Faults: a route of the panel that answers before the prelude of the
    // account routes; an operation reachable by GET or by another method.
    const bare = await listening(createApp());
    t.after(() => closeServer(bare));
    const port = bare.address().port;
    for (const path of fivePaths)
      for (const method of ["GET", "POST"]) {
        const response = await send(port, path, { method });
        assert.equal(response.status, 503, `${method} ${path}`);
        assert.match(response.headers["content-type"], /^application\/json/);
        assert.equal(response.headers["cache-control"], "no-store");
      }

    const f = await panelFixture(t);
    const cookie = seed(f, "methods-owner", f.owner);
    const before = state(f);
    for (const path of postPaths)
      for (const method of ["GET", "PUT", "DELETE", "PATCH"]) {
        const response = await f.send(`${path}?email=${effective[path]}`, {
          method,
          headers: withHeaders(
            {
              ...proxyHeaders,
              Origin: origin,
              "Content-Type": "application/json",
            },
            cookie,
            {},
          ),
          body:
            method === "GET"
              ? undefined
              : JSON.stringify({ email: effective[path] }),
        });
        assert.equal(response.status, 404, `${method} ${path}`);
        assert.deepEqual(JSON.parse(response.body), { error: "Not found" });
      }
    for (const method of ["POST", "PUT", "DELETE", "PATCH"]) {
      const response = await f.send(paths.list, {
        method,
        headers: withHeaders(
          {
            ...proxyHeaders,
            Origin: origin,
            "Content-Type": "application/json",
          },
          cookie,
          {},
        ),
        body: "{}",
      });
      assert.equal(response.status, 404, `${method} ${paths.list}`);
    }
    assert.equal((await getFrom(f, "/api/owner/other", cookie)).status, 404);
    assert.equal((await getFrom(f, "/api/owner", cookie)).status, 404);
    assert.deepEqual(state(f), before);
  },
);

test(
  "the answers that carry the account hold the role of an owner and no role field for a player",
  { timeout: 20000 },
  async (t) => {
    // decision: D-410 "The answers that carry the account — `GET /api/account`, the login and the registration — hold"
    // Faults: a field `role` for a player; no `role` for an owner; the role of
    // the registration's session kept after the role was given.
    const f = await panelFixture(t);
    const ownerCookie = seed(f, "answer-owner", f.owner);
    const playerCookie = seed(f, "answer-player", f.player);
    assert.deepEqual(
      JSON.parse((await getFrom(f, "/api/account", ownerCookie)).body),
      {
        id: f.owner.id,
        email: "owner@example.test",
        emailConfirmed: false,
        previousSaveAllowed: false,
        role: "owner",
      },
    );
    assert.deepEqual(
      JSON.parse((await getFrom(f, "/api/account", playerCookie)).body),
      {
        id: f.player.id,
        email: "player@example.test",
        emailConfirmed: false,
        previousSaveAllowed: false,
      },
    );

    const registration = await postTo(f, "/api/accounts", {
      email: "fresh@example.test",
      password: secret,
      passwordConfirmation: secret,
    });
    const registered = assertJson(registration, 201, "registration");
    assert.ok(!("role" in registered), "a registration makes a player");
    assert.equal(registered.email, "fresh@example.test");
    const { cookie: issuedCookie } = issued(registration);

    const signIn = () =>
      postTo(f, "/api/session", {
        email: "fresh@example.test",
        password: secret,
      });
    assert.ok(!("role" in assertJson(await signIn(), 200, "player login")));
    assert.equal(
      f.runtime.database.setAccountRole("fresh@example.test", "owner").outcome,
      "made-owner",
    );
    assert.equal(
      assertJson(await signIn(), 200, "owner login").role,
      "owner",
      "the login of an owner",
    );
    assert.equal(
      JSON.parse((await getFrom(f, "/api/account", issuedCookie)).body).role,
      "owner",
      "the session of the registration, read after the role was given",
    );
  },
);

test(
  "an owner plays like a player: its own saved game state is its own, and the previous-save routes ask it for the privilege",
  { timeout: 20000 },
  async (t) => {
    // invariant: player-save-isolation
    // Faults: routes of the panel that answer for the account routes' paths; an
    // owner whose own saved game is read or replaced through another account's
    // session.
    const f = await panelFixture(t);
    const ownerCookie = seed(f, "plays-owner", f.owner);
    const playerCookie = seed(f, "plays-player", f.player);
    const put = await f.send("/api/saved-game", {
      method: "PUT",
      headers: withHeaders(
        { ...proxyHeaders, Origin: origin, "Content-Type": "application/json" },
        ownerCookie,
        {},
      ),
      body: JSON.stringify({ version: 1, basedOn: 0, game: { turn: 3 } }),
    });
    assert.deepEqual(assertJson(put, 200, "the owner's save"), { revision: 1 });
    assert.deepEqual(
      JSON.parse((await getFrom(f, "/api/saved-game", ownerCookie)).body),
      { save: { version: 1, revision: 1, game: { turn: 3 } } },
    );
    assert.deepEqual(
      JSON.parse((await getFrom(f, "/api/saved-game", playerCookie)).body),
      { save: null },
    );
    assertRefusal(
      await getFrom(f, "/api/previous-saved-game", ownerCookie),
      403,
      "previous-save-forbidden",
      "an owner without the privilege",
    );
    const listed = await getFrom(f, paths.list, ownerCookie);
    assert.ok(
      !listed.body.includes("turn"),
      "the list holds nothing of a save",
    );
  },
);
