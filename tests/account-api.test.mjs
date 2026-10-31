// The browser account client against a real local HTTP server whose answers each test controls.
// The client's requests are relative, so the test gives the real fetch a base address the way a
// page's address gives it one in a browser: undici's global origin. Nothing replaces fetch.
import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { createServer } from "node:http";
import { createAccountClient } from "../dist/public/account-api.js";

const globalOrigin = Symbol.for("undici.globalOrigin.1");
const deadlineMs = 5000;

let server;
let elsewhere;
let respond;
let seen;
let elsewhereSeen;

function listen(handler) {
  const listening = createServer((request, response) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => handler(request, response, body));
  });
  const ready = new Promise((resolve, reject) => {
    const deadline = setTimeout(
      () => reject(new Error("HTTP readiness deadline exceeded")),
      deadlineMs,
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
  listening.listen(0, "127.0.0.1");
  return { listening, ready };
}

async function close(listening) {
  if (!listening?.listening) return;
  listening.closeAllConnections();
  await new Promise((resolve, reject) =>
    listening.close((error) => (error ? reject(error) : resolve())),
  );
}

before(async () => {
  const first = listen((request, response, body) => {
    seen.push({
      method: request.method,
      url: request.url,
      contentType: request.headers["content-type"],
      body,
    });
    respond(request, response);
  });
  const second = listen((request, response) => {
    elsewhereSeen.push(request.url);
    reply(response, 200, '{"id":"other","email":"other@x.pl"}');
  });
  server = first.listening;
  elsewhere = second.listening;
  try {
    await Promise.all([first.ready, second.ready]);
  } catch (error) {
    await Promise.allSettled([close(server), close(elsewhere)]);
    throw error;
  }
  globalThis[globalOrigin] = new URL(
    `http://127.0.0.1:${server.address().port}`,
  );
});

beforeEach(() => {
  seen = [];
  elsewhereSeen = [];
  respond = (_request, response) => reply(response, 500, "");
});

after(async () => {
  delete globalThis[globalOrigin];
  await Promise.allSettled([close(server), close(elsewhere)]);
});

function reply(response, status, body, headers = {}) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    ...headers,
  });
  response.end(body);
}

/** An absolute deadline: a client that never answers fails an assertion, not the runner. */
function within(promise, label) {
  let timer;
  const deadline = new Promise((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new assert.AssertionError({
            message: `${label}: no result within ${deadlineMs} ms`,
          }),
        ),
      deadlineMs,
    );
  });
  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));
}

function client() {
  return createAccountClient({ timeoutMs: 3000 });
}

const calls = {
  register: (c) => c.register("a@x.pl", "twelve chars!", "twelve chars!"),
  login: (c) => c.login("a@x.pl", "twelve chars!"),
  currentAccount: (c) => c.currentAccount(),
  logout: (c) => c.logout(),
  confirmEmail: (c) => c.confirmEmail("tok-1_a"),
  sendConfirmationMessage: (c) => c.sendConfirmationMessage(),
  requestPasswordReset: (c) => c.requestPasswordReset("a@x.pl"),
  setPassword: (c) =>
    c.setPassword("tok-1_a", "new twelve chars", "new twelve chars"),
};

const accountJson = '{"id":"u1","email":"a@x.pl","emailConfirmed":false}';
const registeredJson =
  '{"id":"u1","email":"a@x.pl","emailConfirmed":false,"confirmationMessage":"sent"}';

// invariant: account-client-requests
test("each call sends its documented method, relative path and JSON body", async () => {
  respond = (request, response) => {
    if (
      request.url === "/api/logout" ||
      request.url === "/api/email-confirmation" ||
      request.url === "/api/password-reset-message" ||
      request.url === "/api/password-reset"
    ) {
      return response.writeHead(204).end();
    }
    if (request.url === "/api/email-confirmation-message") {
      return reply(response, 200, '{"confirmationMessage":"limited"}');
    }
    return request.url === "/api/accounts"
      ? reply(response, 201, registeredJson)
      : reply(response, 200, accountJson);
  };
  const c = client();
  const results = [
    await within(c.register("Ala@x.pl", "pass one two", "pass one two"), "a"),
    await within(c.login("Ala@x.pl", "pass one two"), "b"),
    await within(c.currentAccount(), "c"),
    await within(c.logout(), "d"),
    await within(c.confirmEmail("tok-1_a"), "e"),
    await within(c.sendConfirmationMessage(), "f"),
    await within(c.requestPasswordReset("Ala@x.pl"), "g"),
    await within(c.setPassword("tok-2_b", "new pass one", "new pass two"), "h"),
  ];
  // Precondition: every answer was a success, so each request was fully sent.
  assert.deepEqual(
    results.map((result) => result.ok),
    [true, true, true, true, true, true, true, true],
  );
  assert.deepEqual(
    seen.map(({ method, url, contentType }) => ({
      method,
      url,
      json: contentType?.startsWith("application/json") ?? false,
    })),
    [
      { method: "POST", url: "/api/accounts", json: true },
      { method: "POST", url: "/api/session", json: true },
      { method: "GET", url: "/api/account", json: false },
      { method: "POST", url: "/api/logout", json: true },
      { method: "POST", url: "/api/email-confirmation", json: true },
      { method: "POST", url: "/api/email-confirmation-message", json: true },
      { method: "POST", url: "/api/password-reset-message", json: true },
      { method: "POST", url: "/api/password-reset", json: true },
    ],
  );
  assert.deepEqual(JSON.parse(seen[0].body), {
    email: "Ala@x.pl",
    password: "pass one two",
    passwordConfirmation: "pass one two",
  });
  assert.deepEqual(JSON.parse(seen[1].body), {
    email: "Ala@x.pl",
    password: "pass one two",
  });
  assert.equal(seen[2].body, "");
  assert.deepEqual(JSON.parse(seen[3].body), {});
  assert.deepEqual(JSON.parse(seen[4].body), { token: "tok-1_a" });
  assert.deepEqual(JSON.parse(seen[5].body), {});
  assert.deepEqual(JSON.parse(seen[6].body), { email: "Ala@x.pl" });
  assert.deepEqual(JSON.parse(seen[7].body), {
    token: "tok-2_b",
    password: "new pass one",
    passwordConfirmation: "new pass two",
  });
});

// invariant: account-client-requests
test("a redirect is not followed, so nothing is sent to its target", async () => {
  const target = `http://127.0.0.1:${elsewhere.address().port}/api/session`;
  respond = (_request, response) =>
    response.writeHead(307, { location: target }).end();
  const result = await within(
    client().login("a@x.pl", "twelve chars!"),
    "login",
  );
  assert.equal(result.ok, false);
  assert.deepEqual(elsewhereSeen, []);
});

// invariant: account-client-outcomes
test("the success status of each call with an account body gives that account and no other property", async () => {
  const body =
    '{"id":"u1","email":"a@x.pl","emailConfirmed":true,"confirmationMessage":"sent","passwordHash":"leak","sessionId":"leak"}';
  for (const [name, status, value] of [
    [
      "register",
      201,
      {
        id: "u1",
        email: "a@x.pl",
        emailConfirmed: true,
        confirmationMessage: "sent",
      },
    ],
    ["login", 200, { id: "u1", email: "a@x.pl", emailConfirmed: true }],
    [
      "currentAccount",
      200,
      { id: "u1", email: "a@x.pl", emailConfirmed: true },
    ],
  ]) {
    respond = (_request, response) => reply(response, status, body);
    const result = await within(calls[name](client()), name);
    assert.deepEqual(result, { ok: true, value });
  }
  respond = (_request, response) => response.writeHead(204).end();
  assert.deepEqual(await within(calls.logout(client()), "logout"), {
    ok: true,
    value: null,
  });
  assert.deepEqual(await within(calls.confirmEmail(client()), "confirm"), {
    ok: true,
    value: null,
  });
  for (const name of ["requestPasswordReset", "setPassword"]) {
    assert.deepEqual(await within(calls[name](client()), name), {
      ok: true,
      value: null,
    });
  }
});

// invariant: account-client-outcomes
test("a success status other than the call's own is no success, whatever the body", async () => {
  const message = '{"confirmationMessage":"sent"}';
  for (const [name, status, body] of [
    ["register", 200, registeredJson],
    ["register", 202, registeredJson],
    ["login", 201, accountJson],
    ["currentAccount", 201, accountJson],
    ["currentAccount", 204, ""],
    ["logout", 200, "{}"],
    ["logout", 201, ""],
    ["confirmEmail", 200, "{}"],
    ["confirmEmail", 201, ""],
    ["confirmEmail", 202, ""],
    ["requestPasswordReset", 200, "{}"],
    ["requestPasswordReset", 201, ""],
    ["requestPasswordReset", 202, ""],
    ["setPassword", 200, "{}"],
    ["setPassword", 201, ""],
    ["setPassword", 202, ""],
    ["sendConfirmationMessage", 201, message],
    ["sendConfirmationMessage", 202, message],
    ["sendConfirmationMessage", 204, ""],
  ]) {
    respond = (_request, response) => reply(response, status, body);
    const result = await within(calls[name](client()), name);
    assert.equal(result.ok, false, `${name} ${status}`);
    assert.equal(result.failure.kind, "unexpected", `${name} ${status}`);
    assert.equal(result.failure.status, status, `${name} ${status}`);
  }
});

// invariant: account-client-outcomes
test("a success status with a body that is not an account with string id and email is no success", async () => {
  const bodies = [
    "",
    "not json",
    "null",
    "[]",
    '"text"',
    "42",
    "{}",
    '{"id":"u1"}',
    '{"email":"a@x.pl"}',
    '{"id":7,"email":"a@x.pl"}',
    '{"id":"u1","email":null}',
    '{"id":"","email":"a@x.pl"}',
    '{"id":"u1","email":""}',
    '{"code":"unauthenticated","error":"A refusal body at a success status"}',
  ];
  const noConfirmedFlag = [
    '{"id":"u1","email":"a@x.pl"}',
    '{"id":"u1","email":"a@x.pl","emailConfirmed":null}',
    '{"id":"u1","email":"a@x.pl","emailConfirmed":"false"}',
    '{"id":"u1","email":"a@x.pl","emailConfirmed":0}',
  ];
  for (const [name, status] of [
    ["register", 201],
    ["login", 200],
    ["currentAccount", 200],
  ]) {
    for (const body of bodies) {
      respond = (_request, response) => reply(response, status, body);
      const result = await within(calls[name](client()), name);
      assert.equal(result.ok, false, `${name} with body ${body}`);
      assert.equal(result.failure.kind, "unexpected", `${name} ${body}`);
    }
    for (const body of noConfirmedFlag) {
      // The register body also carries a valid message, so only the flag can fail it.
      const withMessage = body.replace(/}$/, ',"confirmationMessage":"sent"}');
      respond = (_request, response) => reply(response, status, withMessage);
      const result = await within(calls[name](client()), name);
      assert.equal(result.ok, false, `${name} with body ${withMessage}`);
      assert.equal(result.failure.kind, "unexpected", `${name} ${withMessage}`);
    }
  }
});

// invariant: account-client-outcomes
test("register gives the confirmation message outcome it is told and nothing else", async () => {
  for (const outcome of ["sent", "limited", "failed"]) {
    respond = (_request, response) =>
      reply(
        response,
        201,
        `{"id":"u1","email":"a@x.pl","emailConfirmed":false,"confirmationMessage":"${outcome}"}`,
      );
    assert.deepEqual(await within(calls.register(client()), outcome), {
      ok: true,
      value: {
        id: "u1",
        email: "a@x.pl",
        emailConfirmed: false,
        confirmationMessage: outcome,
      },
    });
  }
  for (const value of [
    '"SENT"',
    '"blocked"',
    '""',
    "null",
    "1",
    "true",
    "[]",
  ]) {
    respond = (_request, response) =>
      reply(
        response,
        201,
        `{"id":"u1","email":"a@x.pl","emailConfirmed":false,"confirmationMessage":${value}}`,
      );
    const result = await within(calls.register(client()), value);
    assert.equal(result.ok, false, value);
    assert.equal(result.failure.kind, "unexpected", value);
  }
  respond = (_request, response) => reply(response, 201, accountJson);
  const missing = await within(calls.register(client()), "missing");
  assert.equal(missing.ok, false);
  assert.equal(missing.failure.kind, "unexpected");
});

// invariant: account-client-outcomes
test("sendConfirmationMessage gives the outcome of a 200 answer and no other body is a success", async () => {
  for (const outcome of ["sent", "limited", "failed"]) {
    respond = (_request, response) =>
      reply(response, 200, `{"confirmationMessage":"${outcome}"}`);
    assert.deepEqual(
      await within(calls.sendConfirmationMessage(client()), outcome),
      { ok: true, value: outcome },
    );
  }
  for (const body of [
    "",
    "not json",
    "null",
    "[]",
    "{}",
    '{"confirmationMessage":"blocked"}',
    '{"confirmationMessage":null}',
    '{"confirmationMessage":["sent"]}',
    '{"outcome":"sent"}',
  ]) {
    respond = (_request, response) => reply(response, 200, body);
    const result = await within(calls.sendConfirmationMessage(client()), body);
    assert.equal(result.ok, false, body);
    assert.equal(result.failure.kind, "unexpected", body);
  }
});

// invariant: account-client-outcomes
test("an error status is a refusal carrying the server's code and message, even beside an account body", async () => {
  // The texts are the ones the server sends (task, To do 2, 4 and 10; src/server/account-routes.ts).
  for (const [name, status, code, message] of [
    [
      "login",
      401,
      "invalid-credentials",
      "Nieprawidłowy adres e-mail lub hasło.",
    ],
    ["register", 409, "account-exists", "Konto z tym adresem już istnieje."],
    [
      "register",
      429,
      "too-many-attempts",
      "Za dużo prób. Spróbuj ponownie za kilka minut.",
    ],
    [
      "currentAccount",
      401,
      "unauthenticated",
      "Sesja wygasła albo nie istnieje.",
    ],
    ["login", 503, "session-unavailable", "Nie udało się zalogować."],
    // Task blokada-konta, To do 4: a blocked account's correct password.
    ["login", 403, "account-blocked", "To konto jest zablokowane."],
    ["logout", 500, "logout-failed", "Nie udało się wylogować."],
    [
      "confirmEmail",
      400,
      "invalid-link",
      "Odnośnik jest nieważny albo wygasł.",
    ],
    [
      "requestPasswordReset",
      400,
      "invalid-email",
      "Podaj adres e-mail w postaci nazwa@domena.",
    ],
    [
      "requestPasswordReset",
      429,
      "too-many-attempts",
      "Za dużo prób. Spróbuj ponownie za kilka minut.",
    ],
    [
      "setPassword",
      400,
      "invalid-password",
      "Hasło musi mieć od 12 do 128 znaków.",
    ],
    [
      "setPassword",
      400,
      "password-mismatch",
      "Powtórzone hasło różni się od hasła.",
    ],
    ["setPassword", 400, "invalid-link", "Odnośnik jest nieważny albo wygasł."],
    [
      "setPassword",
      429,
      "too-many-attempts",
      "Za dużo prób. Spróbuj ponownie za kilka minut.",
    ],
    [
      "sendConfirmationMessage",
      409,
      "email-already-confirmed",
      "Adres e-mail jest już potwierdzony.",
    ],
    [
      "sendConfirmationMessage",
      401,
      "unauthenticated",
      "Sesja wygasła albo nie istnieje.",
    ],
  ]) {
    respond = (_request, response) =>
      reply(
        response,
        status,
        JSON.stringify({ id: "u1", email: "a@x.pl", code, error: message }),
      );
    const result = await within(calls[name](client()), name);
    assert.deepEqual(result, {
      ok: false,
      failure: { kind: "refused", status, code, message },
    });
  }
});

// invariant: account-client-outcomes
test("an error status without a known code is a refusal by status and shows none of the server's words", async () => {
  for (const [status, body] of [
    [400, '{"error":"Bad Request words"}'],
    [403, '{"error":"Forbidden words"}'],
    [415, '{"error":"Unsupported words"}'],
    [500, "<html>Server words</html>"],
    [503, '{"error":"Accounts unavailable words"}'],
    [401, '{"code":"made-up","error":"Unknown code words"}'],
    [409, '{"code":"account-exists"}'],
    [502, ""],
  ]) {
    respond = (_request, response) => reply(response, status, body);
    const result = await within(calls.login(client()), `status ${status}`);
    assert.equal(result.ok, false, `status ${status}`);
    assert.equal(result.failure.kind, "refused", `status ${status}`);
    assert.equal(result.failure.status, status);
    assert.equal(result.failure.code, null, `status ${status}`);
    assert.equal(typeof result.failure.message, "string");
    assert.notEqual(result.failure.message, "");
    assert.doesNotMatch(result.failure.message, /words/);
  }
});

// invariant: account-client-outcomes
test("a server that never answers, or stalls inside the body, ends in a timeout failure", async () => {
  const quick = createAccountClient({ timeoutMs: 150 });
  respond = () => {};
  const silent = await within(quick.login("a@x.pl", "twelve chars!"), "silent");
  assert.equal(silent.ok, false);
  assert.deepEqual(
    [silent.failure.kind, silent.failure.reason],
    ["unreachable", "timeout"],
  );

  respond = (_request, response) => {
    response.writeHead(200, {
      "content-type": "application/json",
      "content-length": "100",
    });
    response.write('{"id":"u1",');
  };
  const stalled = await within(quick.currentAccount(), "stalled");
  assert.equal(stalled.ok, false);
  assert.deepEqual(
    [stalled.failure.kind, stalled.failure.reason],
    ["unreachable", "timeout"],
  );
});

// invariant: account-client-outcomes
test("a connection that fails before or inside the answer is a network failure, not a success", async () => {
  respond = (request) => request.socket.destroy();
  const refused = await within(
    client().login("a@x.pl", "twelve chars!"),
    "reset",
  );
  assert.equal(refused.ok, false);
  assert.deepEqual(
    [refused.failure.kind, refused.failure.reason],
    ["unreachable", "network"],
  );

  respond = (request, response) => {
    response.writeHead(200, {
      "content-type": "application/json",
      "content-length": "100",
    });
    response.write('{"id":"u1",', () => request.socket.destroy());
  };
  const cut = await within(client().currentAccount(), "cut");
  assert.equal(cut.ok, false);
  assert.deepEqual(
    [cut.failure.kind, cut.failure.reason],
    ["unreachable", "network"],
  );
});

// Saved game state routes (spec decisions 1 and 3; task To do 2, 4 and 7).
const gameJson = '{"program":[1,2],"note":"zażółć"}';
const saveJson = `{"save":{"version":3,"revision":7,"game":${gameJson}}}`;
const submission = { version: 3, basedOn: 6, game: { program: [1, 2] } };
const saveLimit = 65536;

/** A save whose body is exactly `bytes` long in UTF-8, built from two-byte letters so that its
 * length in characters is lower than its length in bytes. */
function submissionOfBytes(bytes) {
  const empty = { version: 1, basedOn: 0, game: { t: "" } };
  const room = bytes - Buffer.byteLength(JSON.stringify(empty));
  const t = "x".repeat(room % 2) + "ł".repeat(Math.floor(room / 2));
  return { version: 1, basedOn: 0, game: { t } };
}

// invariant: saved-state-http-exchange
// invariant: account-client-requests
test("loadSavedGame sends a bodiless GET on the relative saved-game path and the save call a JSON PUT of exactly version, basedOn and game", async () => {
  respond = (request, response) =>
    request.method === "GET"
      ? reply(response, 200, saveJson)
      : reply(response, 200, '{"revision":7}');
  const c = client();
  const loaded = await within(c.loadSavedGame(), "load");
  const saved = await within(c.saveGame(submission), "save");
  // Precondition: both answers were successes, so both requests were fully sent.
  assert.equal(loaded.ok, true);
  assert.deepEqual(saved, { kind: "saved", revision: 7 });
  assert.deepEqual(
    seen.map(({ method, url }) => ({ method, url })),
    [
      { method: "GET", url: "/api/saved-game" },
      { method: "PUT", url: "/api/saved-game" },
    ],
  );
  assert.equal(seen[0].body, "");
  assert.match(seen[1].contentType, /^application\/json/);
  assert.deepEqual(JSON.parse(seen[1].body), {
    version: 3,
    basedOn: 6,
    game: { program: [1, 2] },
  });
  assert.deepEqual(Object.keys(JSON.parse(seen[1].body)).sort(), [
    "basedOn",
    "game",
    "version",
  ]);
});

// invariant: account-client-requests
test("a redirect of the saved-game routes is not followed, so nothing is sent to its target", async () => {
  const target = `http://127.0.0.1:${elsewhere.address().port}/api/saved-game`;
  respond = (_request, response) =>
    response.writeHead(307, { location: target }).end();
  const loaded = await within(client().loadSavedGame(), "load");
  const saved = await within(client().saveGame(submission), "save");
  assert.equal(loaded.ok, false);
  assert.equal(saved.kind, "failed");
  assert.deepEqual(elsewhereSeen, []);
});

// invariant: saved-state-http-exchange
// invariant: account-client-outcomes
test("loadSavedGame gives the save exactly as received, or null for an account with none", async () => {
  respond = (_request, response) => reply(response, 200, saveJson);
  assert.deepEqual(await within(client().loadSavedGame(), "save"), {
    ok: true,
    value: {
      version: 3,
      revision: 7,
      game: { program: [1, 2], note: "zażółć" },
    },
  });
  respond = (_request, response) => reply(response, 200, '{"save":null}');
  assert.deepEqual(await within(client().loadSavedGame(), "null"), {
    ok: true,
    value: null,
  });
});

// invariant: account-client-outcomes
test("loadSavedGame is no success for another status or for a body that is not exactly save, null or version, revision and game", async () => {
  const game = '{"a":1}';
  const bodies = [
    "",
    "not json",
    "null",
    "[]",
    "{}",
    '{"save":1}',
    '{"save":[]}',
    '{"save":"x"}',
    '{"save":{}}',
    '{"save":null,"extra":1}',
    `{"save":{"version":1,"revision":1,"game":${game}},"extra":1}`,
    `{"save":{"version":1,"revision":1,"game":${game},"extra":1}}`,
    `{"save":{"revision":1,"game":${game}}}`,
    `{"save":{"version":1,"game":${game}}}`,
    '{"save":{"version":1,"revision":1}}',
    `{"save":{"version":0,"revision":1,"game":${game}}}`,
    `{"save":{"version":1,"revision":0,"game":${game}}}`,
    `{"save":{"version":-1,"revision":1,"game":${game}}}`,
    `{"save":{"version":1.5,"revision":1,"game":${game}}}`,
    `{"save":{"version":"1","revision":1,"game":${game}}}`,
    `{"save":{"version":1,"revision":"1","game":${game}}}`,
    `{"save":{"version":1,"revision":9007199254740993,"game":${game}}}`,
    '{"save":{"version":1,"revision":1,"game":null}}',
    '{"save":{"version":1,"revision":1,"game":[]}}',
    '{"save":{"version":1,"revision":1,"game":"x"}}',
    '{"code":"unauthenticated","error":"A refusal body at a success status"}',
  ];
  for (const body of bodies) {
    respond = (_request, response) => reply(response, 200, body);
    const result = await within(client().loadSavedGame(), body);
    assert.equal(result.ok, false, body);
    assert.equal(result.failure.kind, "unexpected", body);
  }
  for (const status of [201, 202, 204]) {
    respond = (_request, response) => reply(response, status, saveJson);
    const result = await within(client().loadSavedGame(), `${status}`);
    assert.equal(result.ok, false, `${status}`);
    assert.equal(result.failure.kind, "unexpected", `${status}`);
    assert.equal(result.failure.status, status);
  }
});

// invariant: account-client-outcomes
test("loadSavedGame turns an error status into a refusal, a dead connection and a silent server into unreachable", async () => {
  respond = (_request, response) =>
    reply(
      response,
      401,
      '{"code":"unauthenticated","error":"Sesja wygasła albo nie istnieje."}',
    );
  assert.deepEqual(await within(client().loadSavedGame(), "401"), {
    ok: false,
    failure: {
      kind: "refused",
      status: 401,
      code: "unauthenticated",
      message: "Sesja wygasła albo nie istnieje.",
    },
  });
  respond = (_request, response) => reply(response, 500, "<html>words</html>");
  const server500 = await within(client().loadSavedGame(), "500");
  assert.equal(server500.ok, false);
  assert.deepEqual(
    [server500.failure.kind, server500.failure.status, server500.failure.code],
    ["refused", 500, null],
  );
  respond = (request) => request.socket.destroy();
  const dead = await within(client().loadSavedGame(), "reset");
  assert.deepEqual(
    [dead.failure.kind, dead.failure.reason],
    ["unreachable", "network"],
  );
  respond = () => {};
  const silent = await within(
    createAccountClient({ timeoutMs: 150 }).loadSavedGame(),
    "silent",
  );
  assert.deepEqual(
    [silent.failure.kind, silent.failure.reason],
    ["unreachable", "timeout"],
  );
});

// invariant: saved-state-http-exchange
// invariant: account-client-outcomes
test("saveGame answers saved with the new revision for a 200 with exactly a revision", async () => {
  respond = (_request, response) => reply(response, 200, '{"revision":1}');
  assert.deepEqual(await within(client().saveGame(submission), "first"), {
    kind: "saved",
    revision: 1,
  });
  respond = (_request, response) => reply(response, 200, '{"revision":41}');
  assert.deepEqual(await within(client().saveGame(submission), "later"), {
    kind: "saved",
    revision: 41,
  });
});

// invariant: account-client-outcomes
test("saveGame maps each documented refusal to its own outcome", async () => {
  for (const [status, code, kind] of [
    [409, "save-conflict", "conflict"],
    [409, "save-outdated", "outdated"],
    [413, "save-too-large", "too-large"],
    [401, "unauthenticated", "signed-out"],
  ]) {
    respond = (_request, response) =>
      reply(response, status, JSON.stringify({ code, error: "Słowa serwera" }));
    assert.deepEqual(
      await within(client().saveGame(submission), code),
      { kind },
      code,
    );
  }
});

// invariant: account-client-outcomes
test("saveGame reports every other answer as a failure, also a refusal status under another code", async () => {
  for (const [status, body] of [
    [400, '{"code":"invalid-request","error":"x"}'],
    [403, '{"error":"Forbidden words"}'],
    [409, '{"code":"account-exists","error":"x"}'],
    [409, "{}"],
    [409, ""],
    [413, "{}"],
    [413, '{"code":"save-conflict","error":"x"}'],
    [500, "<html>words</html>"],
    [503, '{"error":"words"}'],
    [429, ""],
  ]) {
    respond = (_request, response) => reply(response, status, body);
    const result = await within(client().saveGame(submission), `${status}`);
    assert.equal(result.kind, "failed", `${status} ${body}`);
    assert.equal(result.failure.kind, "refused", `${status} ${body}`);
    assert.equal(result.failure.status, status);
    assert.doesNotMatch(result.failure.message, /words/);
  }
  for (const [status, body] of [
    [200, ""],
    [200, "not json"],
    [200, "{}"],
    [200, "null"],
    [200, '{"revision":0}'],
    [200, '{"revision":-1}'],
    [200, '{"revision":1.5}'],
    [200, '{"revision":"1"}'],
    [200, '{"revision":1,"extra":true}'],
    [201, '{"revision":1}'],
    [202, '{"revision":1}'],
    [204, ""],
  ]) {
    respond = (_request, response) => reply(response, status, body);
    const result = await within(client().saveGame(submission), `${status}`);
    assert.equal(result.kind, "failed", `${status} ${body}`);
    assert.equal(result.failure.kind, "unexpected", `${status} ${body}`);
  }
});

// invariant: account-client-outcomes
test("saveGame reports a dead connection as a network failure and silence or a stalled body as a timeout", async () => {
  respond = (request) => request.socket.destroy();
  const dead = await within(client().saveGame(submission), "reset");
  assert.equal(dead.kind, "failed");
  assert.deepEqual(
    [dead.failure.kind, dead.failure.reason],
    ["unreachable", "network"],
  );
  const quick = createAccountClient({ timeoutMs: 150 });
  respond = () => {};
  const silent = await within(quick.saveGame(submission), "silent");
  assert.deepEqual(
    [silent.kind, silent.failure.kind, silent.failure.reason],
    ["failed", "unreachable", "timeout"],
  );
  respond = (_request, response) => {
    response.writeHead(200, {
      "content-type": "application/json",
      "content-length": "100",
    });
    response.write('{"revision":');
  };
  const stalled = await within(quick.saveGame(submission), "stalled");
  assert.deepEqual(
    [stalled.kind, stalled.failure.kind, stalled.failure.reason],
    ["failed", "unreachable", "timeout"],
  );
});

// invariant: saved-state-http-exchange
test("a save body of exactly 65 536 bytes is sent whole", async () => {
  respond = (_request, response) => reply(response, 200, '{"revision":2}');
  const exact = submissionOfBytes(saveLimit);
  const result = await within(client().saveGame(exact), "exact");
  // Precondition: the letters are two bytes, so the body has fewer characters than bytes.
  assert.ok(JSON.stringify(exact).length < saveLimit);
  assert.deepEqual(result, { kind: "saved", revision: 2 });
  assert.equal(seen.length, 1);
  assert.equal(Buffer.byteLength(seen[0].body), saveLimit);
  assert.deepEqual(JSON.parse(seen[0].body), exact);
});

// invariant: saved-state-http-exchange
test("a save body over 65 536 bytes is never sent and comes back too large", async () => {
  respond = (_request, response) => reply(response, 200, '{"revision":2}');
  const over = submissionOfBytes(saveLimit + 1);
  // Precondition: the body is over the limit in bytes though not in characters.
  assert.equal(Buffer.byteLength(JSON.stringify(over)), saveLimit + 1);
  assert.ok(JSON.stringify(over).length <= saveLimit);
  assert.deepEqual(await within(client().saveGame(over), "over"), {
    kind: "too-large",
  });
  assert.deepEqual(seen, []);
});
