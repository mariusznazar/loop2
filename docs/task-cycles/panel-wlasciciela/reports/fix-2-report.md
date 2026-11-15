# Fix report — slice 2, finding I1

## Status

`done`

## Finding addressed

I1 (blocking): no test failed when the role read of `blockForPanel` left its transaction. Fixed by a test only; `src/server/database.ts` is unchanged in this fix.

## Commits

- `dec8f39b` — `test: :white_check_mark: hold the write lock in another connection and check that a block reads the owner role inside its transaction (D-137)`, on `task/panel-wlasciciela`, after the reviewed head `7fafc743`. Only `tests/account-owner.test.mjs` (+ the new test, the helper and a fixture option).

## Check result (one line)

All named checks passed (typecheck, both test files, foundation check at 0 errors, prettier, eslint); nothing failed; the gate was not run.

## What the test does

Way chosen: the first one of the handoff (behaviour, with a second thread), because it can be made deterministic.

- `holdWriteLock` starts a worker thread with its own `DatabaseSync` on the same file, runs `BEGIN IMMEDIATE`, sets the account's role to `owner`, reports `locked`, holds the lock 300 ms, then commits and reports `committed`.
- The test (`a block reads the role after it takes the write lock, so a role another connection holds uncommitted makes it refuse an owner`) builds the database with `busyTimeoutMs: 3000` (new `fixture` option, which also still passes `path` back), waits for `locked`, then:
  - precondition: a read outside the lock still gives `player` (the WAL snapshot), so the window is real;
  - `blockForPanel` must answer `{ outcome: "owner" }`; it waits for the lock, sees `owner`, and refuses;
  - after `committed`: role `owner`, not blocked, the session kept.
- Why it is not flaky on the real code: the real code waits for the lock (up to 3000 ms) and reads the committed `owner`, so it answers `owner` at any timing. The only timing the test depends on is the mutant being caught; a late holder would only let the mutant pass, not fail the real code.
- The comment in the test names the bug: a block that reads the role before its write transaction would see `player` while the other connection holds the lock, and would mark an account that is an owner.
- Decision quoted: D-137 "The panel never blocks an account that has the owner role, the caller's own included" (the quote was already in the file and verified by the foundation check).

## Mutation M2 (by hand)

In `blockForPanel` (`src/server/database.ts`, the function at line 879 before the change), the role is read before the transaction and decides the refusal:

```ts
const early = this.findAccountByEmail(email);
return this.transaction((): PanelBlockOutcome => {
  const account = this.findAccountByEmail(email);
  ...
  if (early?.role === "owner") return { outcome: "owner" };
```

- `npm test -- tests/account-owner.test.mjs` on M2 → exit 1; 6 pass, 1 fail: the new test, `actual: { outcome: 'blocked', … }`, `expected: { outcome: 'owner' }`.
- `database.ts` restored from a backup and checked with `git diff --quiet` against HEAD: clean.

## Checks, each with command and exit code

- `npm test -- tests/account-owner.test.mjs` on the real code → exit 0; 7 of 7 pass (first run with the new test, before M2 and again at the end).
- M2 run → exit 1 (see above).
- `npm run typecheck` → exit 0.
- `npm test -- tests/account-storage.test.mjs` → exit 0; 84 of 84 pass.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0; `0 errors`.
- `npx prettier --write tests/account-owner.test.mjs`, then `npx prettier --check src/server/database.ts tests/account-owner.test.mjs` → exit 0 (the write only touched the new lines of this fix).
- `npx eslint src/server/database.ts tests/account-owner.test.mjs` → exit 0.

Not run: the full `npm test` (the gate, per the handoff).

## Reach beyond the handoff

- `node:worker_threads` in an eval worker, with `require("node:sqlite")` inside it. Why: the holder thread needs its own connection, and the existing tests use the same module style.
- Nothing else.

## Working copies

- `.runs/executor-2/` held a backup of `database.ts` (identical to HEAD after restore) and the run logs. I removed the directory before returning. The logs I keep are in `.runs/task-cycles/panel-wlasciciela/reports/fix-2-evidence/` (`green-owner-with-lock-test.txt`, `mutant-m2-owner-test.txt`, `final-*.txt`).
- No git worktree or clone was made.

## Unread material

- `guidelines/testing.md` and `guidelines/coding.md`: read in the first slice; not re-read in this fix. The handoff names no other file.
- The review report `reports/review-2-report.md`: not read; the findings file quotes what the fix needs.
- Minor findings of the review: not read and not fixed, as the handoff says.

## Searches not found or unclear

- Whether a WAL reader outside `BEGIN IMMEDIATE` sees the last committed role while another connection holds the write lock: the precondition assertion confirms it on this machine (sqlite via `node:sqlite`); I did not look up SQLite's documentation for it.
- Whether `busyTimeoutMs` values above 5000 are refused: `boundedInteger` caps it at 5000; my 3000 is within it.
- Nothing else unclear.
