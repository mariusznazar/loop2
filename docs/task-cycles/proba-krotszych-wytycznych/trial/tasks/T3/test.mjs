import assert from "node:assert/strict";
import { test } from "node:test";
import {
  captureConsole,
  createAccount,
  exported,
  loadAgentModule,
  parseLine,
  temporaryDatabase,
} from "../support.mjs";

// T3: a run over several accounts. The lines of one account's case carry its
// id under the listed name `accountId`; the closing line of the run belongs to
// no case, the run touching many accounts, and carries none. What the test
// decides is what the call writes to the console, never the agent's source.

const loaded = await loadAgentModule("account-block-batch");

// Four accounts. `held` is blocked before the run; the run names it, one
// address no account has, and the other three.
async function seeded() {
  const store = await temporaryDatabase();
  const accounts = {
    first: createAccount(store.database, "first@example.test"),
    second: createAccount(store.database, "second@example.test"),
    third: createAccount(store.database, "third@example.test"),
    held: createAccount(store.database, "held@example.test"),
  };
  const before = store.database.blockAccount("held@example.test");
  assert.equal(before.outcome, "blocked", "precondition: held is blocked");
  const addresses = [
    "first@example.test",
    "nobody@example.test",
    "second@example.test",
    "held@example.test",
    "third@example.test",
  ];
  return { ...store, accounts, addresses };
}

function run(blockAccounts, s) {
  return captureConsole(() => blockAccounts(s.database, s.addresses));
}

test("loads", () => {
  assert.equal(typeof exported(loaded, "blockAccounts"), "function");
});

// Prevents: a function that blocks nothing passing the tests of the lines.
test("works", async () => {
  const blockAccounts = exported(loaded, "blockAccounts");
  const s = await seeded();
  try {
    const { returned, threw } = await run(blockAccounts, s);
    assert.equal(threw, false);
    assert.deepEqual(returned, { blocked: 3, alreadyBlocked: 1, unknown: 1 });
    for (const name of ["first", "second", "third", "held"])
      assert.equal(
        s.database.findAccountById(s.accounts[name].id).blocked,
        true,
        `${name} is blocked`,
      );
  } finally {
    await s.dispose();
  }
});

// Prevents: the line of an account's case not naming the account under the
// listed name, so that a search for the account does not find it. A line of
// each account the run blocked, whatever else it writes.
test("case-lines-carry-account-id", async () => {
  const blockAccounts = exported(loaded, "blockAccounts");
  const s = await seeded();
  try {
    const { lines } = await run(blockAccounts, s);
    const parsed = lines.map(parseLine);
    for (const name of ["first", "second", "third"])
      assert.ok(
        parsed.some(
          (line) =>
            line?.event === "account-blocked" &&
            line.accountId === s.accounts[name].id,
        ),
        `no account-blocked line with the accountId of ${name}: ${lines.join(" | ")}`,
      );
  } finally {
    await s.dispose();
  }
});

// Prevents: the closing line of a run over many accounts naming an account,
// or several, under `accountId` or any other name. The closing line is the last
// one written and must exist, so a run that writes none does not pass. Ids are
// looked for as text, so no field name hides one.
test("no-case-line-has-identifier", async () => {
  const blockAccounts = exported(loaded, "blockAccounts");
  const s = await seeded();
  try {
    const { lines } = await run(blockAccounts, s);
    const closing = lines.at(-1);
    assert.ok(closing !== undefined, "the run wrote no line");
    assert.notEqual(
      parseLine(closing)?.event,
      "account-blocked",
      "the last line is a line of an account's case, not of the run's end: " +
        closing,
    );
    assert.ok(
      !closing.includes("accountId"),
      "the closing line has an accountId: " + closing,
    );
    for (const [name, account] of Object.entries(s.accounts))
      assert.ok(
        !closing.includes(account.id),
        `the closing line holds the id of ${name}: ${closing}`,
      );
  } finally {
    await s.dispose();
  }
});
