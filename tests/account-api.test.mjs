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
};

const accountJson = '{"id":"u1","email":"a@x.pl","emailConfirmed":false}';
const registeredJson =
  '{"id":"u1","email":"a@x.pl","emailConfirmed":false,"confirmationMessage":"sent"}';

// invariant: account-client-requests
test("each call sends its documented method, relative path and JSON body", async () => {
  respond = (request, response) => {
    if (
      request.url === "/api/logout" ||
      request.url === "/api/email-confirmation"
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
  ];
  // Precondition: every answer was a success, so each request was fully sent.
  assert.deepEqual(
    results.map((result) => result.ok),
    [true, true, true, true, true, true],
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
