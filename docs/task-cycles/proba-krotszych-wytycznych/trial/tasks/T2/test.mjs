import assert from "node:assert/strict";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import {
  captureConsole,
  createAccount,
  exported,
  loadAgentModule,
  parseLine,
  temporaryDatabase,
} from "../support.mjs";

// T2: ending one session, which has a secret identifier, of an account that has
// a personal value, its address. What the test decides is what the call writes
// to the console; it never reads the agent's source.

const loaded = await loadAgentModule("session-end");

// Written out by hand. The session identifier stands for the cookie value of a
// browser: a secret. The address is a personal value.
const SESSION_ID = "3f9a7c1e5b2d48a09c6e1d7f0b4a8e32";
const EMAIL = "ola.nowak.test@example.test";

// What no line may hold: the identifier, its first eight characters, the
// address, and the part of it before the @.
const FORBIDDEN = [
  ["the session identifier", SESSION_ID],
  ["the start of the session identifier", SESSION_ID.slice(0, 8)],
  ["the account's address", EMAIL],
  ["the local part of the account's address", EMAIL.split("@")[0]],
];

async function seeded() {
  const store = await temporaryDatabase();
  const account = createAccount(store.database, EMAIL);
  store.database.saveSession(SESSION_ID, {
    accountId: account.id,
    data: "{}",
    expiresAt: Date.now() + 3_600_000,
  });
  assert.notEqual(
    store.database.readSession(SESSION_ID),
    null,
    "precondition: the session is stored",
  );
  return { ...store, account };
}

// The way a storage failure at the deletion shows: the delete is refused by the
// database itself, with a message that names no value.
function refuseDeletes(path) {
  const other = new DatabaseSync(path);
  other.exec(
    "CREATE TRIGGER refuse_delete BEFORE DELETE ON sessions BEGIN SELECT RAISE(ABORT, 'storage unavailable'); END",
  );
  other.close();
}

function assertNoneForbidden(lines) {
  for (const line of lines)
    for (const [what, value] of FORBIDDEN)
      assert.ok(
        !line.includes(value),
        `a line holds ${what}: ${line.replaceAll(value, "<" + what + ">")}`,
      );
}

test("loads", () => {
  assert.equal(typeof exported(loaded, "endSession"), "function");
});

// Prevents: a function that does nothing, or logs nothing, passing the two
// clean-line tests, which only look at what the lines hold.
test("works", async () => {
  const endSession = exported(loaded, "endSession");
  const s = await seeded();
  try {
    const ended = await captureConsole(() =>
      endSession(s.database, SESSION_ID),
    );
    assert.equal(ended.threw, false);
    assert.deepEqual(ended.returned, {
      outcome: "ended",
      accountId: s.account.id,
      email: EMAIL,
    });
    assert.equal(s.database.readSession(SESSION_ID), null);
    const unknown = await captureConsole(() =>
      endSession(s.database, "0123456789abcdef0123456789abcdef"),
    );
    assert.equal(unknown.threw, false);
    assert.deepEqual(unknown.returned, { outcome: "unknown" });
  } finally {
    await s.dispose();
  }
});

// Prevents: a failure of the deletion thrown out, or answered as if all were
// fine or the session unknown.
test("failure-outcome", async () => {
  const endSession = exported(loaded, "endSession");
  const s = await seeded();
  try {
    refuseDeletes(s.path);
    const failed = await captureConsole(() =>
      endSession(s.database, SESSION_ID),
    );
    assert.equal(failed.threw, false, "the function threw out the failure");
    assert.deepEqual(failed.returned, { outcome: "failed" });
    assert.notEqual(
      s.database.readSession(SESSION_ID),
      null,
      "precondition: the refused delete left the session",
    );
  } finally {
    await s.dispose();
  }
});

// Prevents: the line of a sign-out naming the session by its secret
// identifier, or the account by its address, so that the log holds a value
// that signs a browser in or points to a person. The product's own `signed-out`
// event must be among the lines, so a function that writes nothing does not pass.
test("event-clean", async () => {
  const endSession = exported(loaded, "endSession");
  const s = await seeded();
  try {
    const { lines } = await captureConsole(() =>
      endSession(s.database, SESSION_ID),
    );
    const events = lines
      .map(parseLine)
      .filter((line) => line?.event === "signed-out");
    assert.equal(
      events.length,
      1,
      "one signed-out event: " + lines.join(" | "),
    );
    assert.equal(events[0].accountId, s.account.id);
    assertNoneForbidden(lines);
  } finally {
    await s.dispose();
  }
});

// Prevents: the line of the failure naming the session by its secret
// identifier, or the account by its address (the failure's own message is
// clean here on purpose: only what the code adds to the line is looked at). A
// line must be written, so a function that hides the failure does not pass.
test("failure-clean", async () => {
  const endSession = exported(loaded, "endSession");
  const s = await seeded();
  try {
    refuseDeletes(s.path);
    const { lines } = await captureConsole(() =>
      endSession(s.database, SESSION_ID),
    );
    assert.ok(lines.length >= 1, "the failure left no line");
    assertNoneForbidden(lines);
  } finally {
    await s.dispose();
  }
});
