PASS dec8f39be399f55a7482d643c4084eccd3361ca8

# Review of the fix of slice 2 (range 7fafc743..dec8f39b)

`git rev-parse HEAD` in the worktree is `dec8f39b`, as given. The range holds one commit; its diff touches only `tests/account-owner.test.mjs` (`git diff --stat 7fafc743 dec8f39b -- src` is empty: nothing in `src/server/**` changed).

## Findings of the findings file

**I1 — fixed.** The added test, "a block reads the role after it takes the write lock, so a role another connection holds uncommitted makes it refuse an owner" (`tests/account-owner.test.mjs:268-294`), fails on my mutation M2 and on a second mutation, passes on the real code, and holds in every one of the repeated runs below.

- The design is sound. A worker thread with its own connection runs `BEGIN IMMEDIATE`, writes `role = 'owner'`, reports `locked`, holds the lock 300 ms and commits. The main thread waits for `locked`, asserts that a read outside the lock still gives `player`, then calls `blockForPanel`. The real code waits for the lock (busy timeout 3000 ms), reads the committed `owner` inside its own transaction and answers `owner`. A block that read the role before its transaction would see `player` and block an account that is an owner when it got the lock.
- The WAL-reader precondition (the executor's claim) holds: `src/server/database.ts:289` sets `PRAGMA journal_mode = WAL`, in which a reader outside the writer's transaction sees the last committed state; and the test's own precondition assertion passed in all 30 + 24 + 10 runs below, so the window is real on this machine.
- It names the bug it protects against in the comment (a block reading the role before its write transaction) and quotes D-137 in a `// decision:` line the foundation check accepts.

## Checks I ran

All in a worktree of `dec8f39b` (`.runs/review-2/wt`, `node_modules` joined by a junction).

| Check | Result |
|---|---|
| `node scripts/build.mjs` | exit 0 |
| `node --test tests/account-owner.test.mjs` (real code) | exit 0, 7 pass, 0 fail; the new test takes about 405 ms, the file about 880 ms |
| the same command 30 times in a row | 30 exit 0, 0 non-zero |
| the same command, 8 processes at once, three rounds (24 runs, under CPU contention) | 24 exit 0, 0 non-zero |
| Mutation M2 (the old one: the role read before the transaction, `early.role` decides the refusal), 5 runs | each: build exit 0; 6 pass, **1 fail** (the new test); test exit 1 |
| Mutation M2b (the whole account read before the transaction and used inside it), 5 runs | each: 6 pass, **1 fail** (the new test) |
| `node --test tests/account-owner.test.mjs tests/account-storage.test.mjs` after restoring `database.ts` (`git status --short` empty) | 91 pass, 0 fail |
| `npx prettier --check tests/account-owner.test.mjs` | exit 0 |
| `npx eslint tests/account-owner.test.mjs` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, "0 errors" |

Not run: the full `npm test` (the cycle's), and `npm run typecheck` through npm (the build exited 0; `node scripts/build.mjs --check` is its command and was run on the previous head, with `src` unchanged since).

## Is it deterministic, and does it leave nothing open

- On the real code the answer does not depend on timing: `blockForPanel` waits for the lock for up to 3000 ms (ten times the holder's 300 ms) and reads whatever committed, so it answers `owner` whether the holder commits early or late. The only timing that can matter is the mutant escaping detection if the holder committed before the mutant's pre-read; the holder only reports `locked` after it has written and holds the lock for 300 ms after that, and the main thread's own work between `locked` and the pre-read is a single read, so the mutant failed in 10 of 10 runs. A loaded machine making the main thread slow by over 300 ms between the two statements would let a mutant pass, never make the real code fail: a weaker test at worst, not a flaky one.
- The event loop of the main thread is blocked by the synchronous `blockForPanel` while the worker's timer runs on its own thread; the `committed` message is read after. No deadlock: the worker needs no main-thread cooperation.
- Cleanup: `t.after(() => worker.terminate())` stops the worker even when an assertion fails before the commit; the worker closes its own connection after the commit; the fixture closes the `AccountDatabase` and `raw` and removes the directory. The test process ended with exit 0 after each run (no hanging handle), 54 times.
- Speed: about 0.4 s added to the file (the 300 ms hold plus the worker's start); acceptable for the slice, though it is the slowest case of the file.

## New findings in the fix diff

None Critical or Important.

Minor (blocks nothing, outside the findings file):
- `tests/account-owner.test.mjs:236-264`: `holdWriteLock`'s `reportOf` registers a `message` listener per word and a `once("exit")` that rejects with "lock holder exited" even after normal completion; the rejection is a no-op once the promise has resolved, so it is harmless, but if the worker died before reporting `locked` the test would fail with that message rather than the cause. Polish only.
- The old test "a role given or taken by a second connection just before the block …" (`:205-232`) keeps its name and sequential shape; together with the new one it now covers both the committed-before and the held-during cases. No change needed.

## Declined to judge

- The Minor findings M1 and M2 of the slice review (kept for the review of the whole change, as the handoff says).
- Whether `busyTimeoutMs` test options should be exposed otherwise: the class already takes `busyTimeoutMs` (`src/server/database.ts:209,250`, capped at 5000); the fix uses it, adds nothing to the product.

## Reach beyond the handoff

- `src/server/database.ts:205-290` (`busyTimeoutMs` option and the `journal_mode = WAL` pragma): to check the executor's WAL claim and that the option the fixture passes exists.
- `.runs/task-cycles/panel-wlasciciela/reports/fix-2-report.md`, whole (the handoff names it).

## Working copies

- `.runs/review-2/wt` — a detached git worktree of `dec8f39b` with a junction `node_modules`. I removed the junction first, then ran `git worktree remove --force` and `git worktree prune`, deleted my scratch files (`mut.py`, a copy of `database.ts`) and removed the directory `.runs/review-2/`. `git worktree list` no longer shows it. Nothing remains.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/reports/fix-2-evidence/*` (the fix's logs): not opened; I reran the checks.
- `guidelines/testing.md` and `guidelines/coding.md`: not re-read in this review (read whole in the slice review); I judged the new test against the points of the handoff and those rules from that reading.
- `foundations/decisions.md` D-137: not re-read; the quoted sentence passed the foundation check.

## Searches not found or unclear

- None. The one open point of the fix report (whether a WAL reader sees the committed role while another connection holds the write lock) I checked: the journal mode is WAL (`database.ts:289`) and the test's own precondition assertion held in every run.
