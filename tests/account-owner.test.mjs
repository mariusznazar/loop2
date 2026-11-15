import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { AccountDatabase } from "../dist/server/database.js";

const HOUR = 3_600_000;
const DAY = 86_400_000;
// D-105: at most 30 account messages per hour in total, three per address.
const limits = { windowMs: HOUR, total: 30, perAccount: 3 };

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-owner-"));
  const path = join(directory, "accounts.sqlite");
  let now = 1000;
  const database = new AccountDatabase(path, { now: () => now });
  const raw = new DatabaseSync(path);
  const connections = [database];
  t.after(async () => {
    for (const connection of connections) connection.close();
    raw.close();
    await rm(directory, { recursive: true, force: true });
  });
  return {
    database,
    raw,
    // A second connection on the same file, standing in for the owner's
    // command beside the server.
    operator() {
      const connection = new AccountDatabase(path, { now: () => now });
      connections.push(connection);
      return connection;
    },
  };
}

function digest(token) {
  return createHash("sha256").update(token).digest("base64url");
}

function openSession(database, id, accountId) {
  database.saveSession(id, { accountId, data: "{}", expiresAt: 5000 });
}

function sessionsOf(raw, accountId) {
  return raw
    .prepare("SELECT id FROM sessions WHERE account_id = ? ORDER BY id")
    .all(accountId)
    .map((row) => row.id);
}

function linkSpent(raw, token) {
  return raw
    .prepare("SELECT spent FROM emailed_links WHERE token_digest = ?")
    .get(digest(token)).spent;
}

function snapshot(raw) {
  const all = (sql) =>
    raw
      .prepare(sql)
      .all()
      .map((row) => ({ ...row }));
  return {
    accounts: all("SELECT * FROM accounts ORDER BY id"),
    sessions: all("SELECT * FROM sessions ORDER BY id"),
    links: all("SELECT * FROM emailed_links ORDER BY token_digest"),
    savedGames: all("SELECT * FROM saved_games ORDER BY account_id"),
  };
}

test("the list of accounts holds every account sorted by address, each with its address, role, blocked state and previous-save privilege and nothing else", async (t) => {
  // The owner panel's list (D-411) and its four fields: the address, the role, the blocked state and the privilege.
  const { database } = await fixture(t);
  assert.deepEqual(database.listAccounts(), []);
  database.createAccount("charlie@example.test", "hash");
  database.createAccount("alpha@example.test", "hash");
  database.createAccount("bravo@example.test", "hash");
  assert.equal(
    database.setAccountRole("alpha@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(database.blockAccount("bravo@example.test").outcome, "blocked");
  assert.equal(
    database.setPreviousSavePrivilege("charlie@example.test", true).outcome,
    "granted",
  );
  assert.deepEqual(database.listAccounts(), [
    {
      email: "alpha@example.test",
      role: "owner",
      blocked: false,
      previousSaveAllowed: false,
    },
    {
      email: "bravo@example.test",
      role: "player",
      blocked: true,
      previousSaveAllowed: false,
    },
    {
      email: "charlie@example.test",
      role: "player",
      blocked: false,
      previousSaveAllowed: true,
    },
  ]);
});

test("a block for the panel of a player ends its sessions and stops its links, and touches no other account", async (t) => {
  // decision: D-137 "Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction"
  const { database, raw } = await fixture(t);
  const player = database.createAccount("player@example.test", "hash");
  const other = database.createAccount("other@example.test", "hash");
  openSession(database, "one", player.id);
  openSession(database, "two", player.id);
  openSession(database, "theirs", other.id);
  database.issueLink(
    {
      accountId: player.id,
      purpose: "email-confirmation",
      tokenDigest: digest("confirm"),
      lifetimeMs: DAY,
    },
    limits,
  );
  database.issueLink(
    {
      accountId: player.id,
      purpose: "password-reset",
      tokenDigest: digest("reset"),
      lifetimeMs: HOUR,
    },
    limits,
  );
  database.issueLink(
    {
      accountId: other.id,
      purpose: "email-confirmation",
      tokenDigest: digest("theirs-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  assert.deepEqual(
    sessionsOf(raw, player.id),
    ["one", "two"],
    "precondition: two browsers",
  );
  assert.equal(linkSpent(raw, "confirm"), 0, "precondition: a working link");

  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "blocked",
    accountId: player.id,
  });
  assert.equal(database.findAccountById(player.id).blocked, true);
  assert.deepEqual(sessionsOf(raw, player.id), []);
  assert.equal(linkSpent(raw, "confirm"), 1);
  assert.equal(linkSpent(raw, "reset"), 1);
  assert.deepEqual(sessionsOf(raw, other.id), ["theirs"]);
  assert.equal(linkSpent(raw, "theirs-link"), 0);
  assert.equal(database.findAccountById(other.id).blocked, false);

  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "already-blocked",
    accountId: player.id,
  });
  assert.deepEqual(database.blockForPanel("nobody@example.test"), {
    outcome: "unknown",
  });
});

test("a block for the panel of an account with the owner role changes nothing, its own sessions and links included", async (t) => {
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included"
  const { database, raw } = await fixture(t);
  const owner = database.createAccount("owner@example.test", "hash");
  assert.equal(
    database.setAccountRole("owner@example.test", "owner").outcome,
    "made-owner",
  );
  openSession(database, "own", owner.id);
  database.issueLink(
    {
      accountId: owner.id,
      purpose: "email-confirmation",
      tokenDigest: digest("own-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  const before = snapshot(raw);

  assert.deepEqual(database.blockForPanel("owner@example.test"), {
    outcome: "owner",
  });
  assert.deepEqual(snapshot(raw), before);
  assert.deepEqual(sessionsOf(raw, owner.id), ["own"]);
  assert.equal(linkSpent(raw, "own-link"), 0);
  assert.equal(database.findAccountById(owner.id).blocked, false);
});

test("a role given or taken by a second connection just before the block is read by the block, which refuses an owner and blocks a player", async (t) => {
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included"
  const { database, raw, operator } = await fixture(t);
  const account = database.createAccount("player@example.test", "hash");
  openSession(database, "one", account.id);
  const second = operator();

  assert.deepEqual(second.setAccountRole("player@example.test", "owner"), {
    outcome: "made-owner",
    accountId: account.id,
  });
  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "owner",
  });
  assert.deepEqual(sessionsOf(raw, account.id), ["one"]);
  assert.equal(database.findAccountById(account.id).blocked, false);

  assert.deepEqual(second.setAccountRole("player@example.test", "player"), {
    outcome: "made-player",
    accountId: account.id,
  });
  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "blocked",
    accountId: account.id,
  });
  assert.deepEqual(sessionsOf(raw, account.id), []);
  assert.equal(database.findAccountById(account.id).blocked, true);
});

test("the role change answers made owner, already owner, made player, already player and unknown, each with the account's identifier, and changes nothing else", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  const { database } = await fixture(t);
  const account = database.createAccount("player@example.test", "hash");
  assert.deepEqual(database.setAccountRole("player@example.test", "owner"), {
    outcome: "made-owner",
    accountId: account.id,
  });
  assert.equal(database.findAccountById(account.id).role, "owner");
  assert.deepEqual(database.setAccountRole("player@example.test", "owner"), {
    outcome: "already-owner",
    accountId: account.id,
  });
  assert.deepEqual(database.setAccountRole("player@example.test", "player"), {
    outcome: "made-player",
    accountId: account.id,
  });
  assert.equal(database.findAccountById(account.id).role, "player");
  assert.deepEqual(database.setAccountRole("player@example.test", "player"), {
    outcome: "already-player",
    accountId: account.id,
  });
  assert.deepEqual(database.setAccountRole("nobody@example.test", "owner"), {
    outcome: "unknown",
  });
  assert.equal(database.findAccountById(account.id).role, "player");
});

test("a role change leaves the block, the previous-save privilege, the sessions, the links and the saved games as they were", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  const { database, raw } = await fixture(t);
  const blocked = database.createAccount("blocked@example.test", "hash");
  database.blockAccount("blocked@example.test");
  const privileged = database.createAccount("privileged@example.test", "hash");
  database.setPreviousSavePrivilege("privileged@example.test", true);
  openSession(database, "kept", privileged.id);
  database.issueLink(
    {
      accountId: privileged.id,
      purpose: "email-confirmation",
      tokenDigest: digest("kept-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  database.writeSavedGame(privileged.id, {
    version: 1,
    basedOn: 0,
    game: '{"kept":1}',
  });
  const savedGame = { version: 1, revision: 1, game: '{"kept":1}' };

  assert.equal(
    database.setAccountRole("blocked@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(database.findAccountById(blocked.id).blocked, true);
  assert.equal(database.findAccountById(blocked.id).role, "owner");

  assert.equal(
    database.setAccountRole("privileged@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(
    database.setAccountRole("privileged@example.test", "player").outcome,
    "made-player",
  );
  const after = database.findAccountById(privileged.id);
  assert.equal(after.blocked, false);
  assert.equal(after.previousSaveAllowed, true);
  assert.deepEqual(sessionsOf(raw, privileged.id), ["kept"]);
  assert.equal(linkSpent(raw, "kept-link"), 0);
  assert.deepEqual(database.readSavedGame(privileged.id), savedGame);
});
