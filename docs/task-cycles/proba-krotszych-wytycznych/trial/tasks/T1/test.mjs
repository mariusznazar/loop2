import assert from "node:assert/strict";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import {
  captureConsole,
  createAccount,
  exported,
  loadAgentModule,
  temporaryDatabase,
} from "../support.mjs";

// T1: a function listing saved games from the account database. What the
// task's text leaves open is only what the function does when the database
// fails; the test decides that from what the call does, never from its source.

const loaded = await loadAgentModule("saved-game-overview");

function save(database, accountId, revisions) {
  let basedOn = 0;
  for (let i = 0; i < revisions; i += 1) {
    const outcome = database.writeSavedGame(accountId, {
      version: 1,
      basedOn,
      game: "{}",
    });
    assert.deepEqual(outcome, { outcome: "saved", revision: basedOn + 1 });
    basedOn += 1;
  }
}

// Three accounts: `first` saved twice, `none` never, `third` once.
async function seeded() {
  const store = await temporaryDatabase();
  const first = createAccount(store.database, "first@example.test");
  const none = createAccount(store.database, "none@example.test");
  const third = createAccount(store.database, "third@example.test");
  save(store.database, first.id, 2);
  save(store.database, third.id, 1);
  return { ...store, first, none, third };
}

function call(summarize, database, ids) {
  return captureConsole(() => summarize(database, ids));
}

// Catches what prevents the other tests from meaning anything: a module that
// does not build or export the function.
test("loads", () => {
  assert.equal(typeof exported(loaded, "summarizeSavedGames"), "function");
});

// Prevents: a function that always throws, or returns nothing, passing the two
// failure tests below. Expected values are written out by hand: accounts that
// were saved twice, never, once, and an id no account has, in the order given.
test("works", async () => {
  const summarize = exported(loaded, "summarizeSavedGames");
  const s = await seeded();
  try {
    const { returned, threw } = await call(summarize, s.database, [
      s.third.id,
      s.none.id,
      "no-such-account-id",
      s.first.id,
    ]);
    assert.equal(threw, false);
    assert.deepEqual(returned, [
      { accountId: s.third.id, revision: 1 },
      { accountId: s.first.id, revision: 2 },
    ]);
  } finally {
    await s.dispose();
  }
});

// Prevents: the whole failure of the database turning into an empty list (or
// any other answer). The table of saved games is dropped through a second
// connection, the way a storage failure shows: every read throws.
test("failure-whole", async () => {
  const summarize = exported(loaded, "summarizeSavedGames");
  const s = await seeded();
  try {
    const other = new DatabaseSync(s.path);
    other.exec("DROP TABLE saved_games");
    other.close();
    const { returned, threw } = await call(summarize, s.database, [
      s.first.id,
      s.none.id,
      s.third.id,
    ]);
    assert.equal(
      threw,
      true,
      "the call answered with " +
        JSON.stringify(returned) +
        " instead of failing",
    );
  } finally {
    await s.dispose();
  }
});

// Prevents: one unreadable record being left out while the rest is returned
// as if it were the whole list. The middle account's row holds a revision no
// JavaScript number holds exactly, which AccountDatabase.readSavedGame refuses.
test("failure-one-record", async () => {
  const summarize = exported(loaded, "summarizeSavedGames");
  const s = await seeded();
  try {
    const other = new DatabaseSync(s.path);
    other
      .prepare(
        "INSERT INTO saved_games (account_id, version, revision, game) VALUES (?, 1, 9007199254740993, '{}')",
      )
      .run(s.none.id);
    other.close();
    assert.throws(
      () => s.database.readSavedGame(s.none.id),
      Error,
      "precondition: the stored record cannot be read",
    );
    const { returned, threw } = await call(summarize, s.database, [
      s.first.id,
      s.none.id,
      s.third.id,
    ]);
    assert.equal(
      threw,
      true,
      "the call answered with " +
        JSON.stringify(returned) +
        " instead of failing",
    );
  } finally {
    await s.dispose();
  }
});
