# Findings to fix — review of the return step, `FAIL cb27190`

Copied word for word from `reports/06-return-review-report.md`, § Findings, Important (the only blocking finding).

**1. `account-session-storage` does not rest on `sqlite-wal-concurrency`, although its clause
"stores no session for a blocked account" holds against the operator's second connection only
because SQLite lets one writer at a time write** — `foundations/invariants.md:776`–`:784`
(*Rests on:* `express-session-store-contract · node-sqlite-database ·
express-session-cookie-lifecycle · cookie-serialization-validation`). Within the task.

- What is wrong: the return step wrote the fact for the claim of D-112's rationale that "a block
  committed while a login is in progress either deletes the session that login stored or makes
  its write store nothing" (`foundations/decisions.md:1927`). D-112's *Verification* names
  `account-session-storage` as the invariant that checks the clause carrying that claim ("a
  session write for a blocked account stores nothing", `foundations/decisions.md:1919`), and the
  invariant states it as "stores no session for a blocked account". In the code at `81cb7c6` the
  clause is made true by one guarded autocommit statement in the server's connection
  (`src/server/database.ts`, `writeSession`, the `INSERT … WHERE NOT EXISTS (SELECT 1 FROM
  accounts WHERE id = ? AND blocked = 1)` with its comment "a block committed by another
  connection either precedes it and stores nothing or follows it and deletes what it stored"),
  racing the block that `src/server/account-block.ts` commits through a second connection
  (`blockAccount`, `BEGIN IMMEDIATE`, update and delete, commit). The guard decides the outcome
  only because the two writes cannot overlap: were two writers allowed at once on their own
  snapshots, the guarded insert could read "not blocked" while the block's `DELETE` misses the
  new row, and a session of a blocked account would be stored. So whether a commit makes the
  invariant's sentence true depends on the condition the new fact holds — exactly what
  `.the-way/elements/environment-facts/template.md`, "Which facts are written", asks an
  invariant's *Rests on* to name (WAY-73).
- The return step's report claims the opposite: "No invariant rests on the fact.
  `blocked-account-access` and `unblock-restores-no-session` hold through the guard and the
  authorization check whatever the interleaving, so no invariant's *Rests on* gains it."
  (`reports/05-return-step-report.md:37`–`:39`). Its reasoning covers only those two invariants,
  and for them I agree: `blocked-account-access` holds through `sessionAccount()` refusing a
  blocked account (`src/server/account-routes.ts:53`) whatever was stored, and
  `unblock-restores-no-session` speaks only of sessions removed by the block. It never considers
  `account-session-storage`, the invariant D-112 names for the very clause the fact was written
  for. The author should also judge `player-server-session` (`foundations/invariants.md:836`):
  its "invalidates that record on … account blocking" would be false for a record a concurrent
  login stored after the block's delete, so the same condition may decide it too.
- Why it matters: the foundation is to say what the code rests on. A later change of the fact —
  or of the store, the journal mode or the connections that write the database (tasks 20, 16 and
  21 add schema versions to this same database) — reaches the invariants through their *Rests
  on* (WAY-33); with the fact named only by D-112, the invariant whose test protects the race
  outcome is not reached directly, and the report's sentence leaves a false claim in the cycle's
  record. Its tests do not cover the cross-connection case either (the `account-session-storage`
  test "a session write for a blocked account stores nothing, also under an identifier it held",
  `tests/account-storage.test.mjs:392`, blocks through the same connection), so nothing else in
  the repository shows the dependence.
- Evidence: the lines quoted above; the source passage itself ("since there is only one WAL
  file, there can only be one writer at a time", verified below).
- Fix expected in the return step's commits: add `sqlite-wal-concurrency` to the *Rests on* of
  `account-session-storage` (and of `player-server-session`, if the author finds its sentence
  depends on it as argued), or state in the report why the invariant's truth does not depend on
  it; correct the report's sentence either way. No test changes are needed for it.
