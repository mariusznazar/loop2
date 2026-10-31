PASS 4ced3b96bfb85bf950fa9996f0912f4917de161c

# Review report — the fix of slice 1's findings, task kopia-bazy

Range: base `49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0`, head `4ced3b96bfb85bf950fa9996f0912f4917de161c`. `git rev-parse HEAD` in the worktree gave that head. Counts: 0 blocking, 4 Minor, 2 out of scope. All four findings are fixed, none was contested, and the fix broke nothing that blocks.

## The findings

| Finding | State | Evidence on the new head |
|---|---|---|
| F1 — Ruff gate | **fixed** | The gate's command on `.`, the whole repository, exit 0. The line is gone and the smoke test still runs |
| F2 — no test holds the one step | **fixed** | `rate: 100` exit 1, `actual: 31, expected: 1`; no `rate` at all, exit 1, the same. The test asserts behaviour and does not rest on the disk |
| F3 — citation with no entry | **fixed** | D-222 holds the rule and the three rejected ways; `src/server/database.ts:141` and `:606` cite it; `foundation_check.py` exit 0 |
| F4 — the test file never ends | **fixed** | A backup that never finishes in the command: run ended by itself, exit 1, Windows 124 s, Linux 125 s, 0 processes left. A writer that never commits: exit 1, Windows 35 s, Linux 34 s |

**D-222 against its source.** Each claim was compared with spec decision 1: one file standing alone, commits under the busy timeout, 1.5 s on a Docker volume against unfinished after 20 s on the bind mount, `VACUUM INTO` as the fallback. All match. I measured the `rate` claims again: `-1` is accepted on 24.17.0 and refused with `ERR_OUT_OF_RANGE` on 24.22.1, `2**31 - 1` is accepted on both, and `2**31` is refused on both. The form follows the decisions template: one binding sentence, parts in *Scope*, and facts that exist.

**The one step beside a writer.** The fix's own check holds when repeated: twenty backups beside a committing process gave twenty counts of 1, on 24.17.0 and on the image's 24.22.1.

**The test file on Linux.** This is its first run there: exit 0, 7 of 7, node 24.22.1, 512 MiB.

## Minor

1. **The new step test has no time limit.** `tests/account-backup.test.mjs:289-311`. With a hang placed inside `backupTo`, this test stalled in-process and the run did not end before my 150 s limit, on Windows and on Linux. D-84 asks for a time limit on such waits. It is Minor because that hang was artificial: the test has no writer, so nothing can restart its backup, and I know of no real path to it. A `timeout` option on the test closes it in one line.
2. **A `rate` below the real limit passes.** `rate: 5000` gave exit 0, 7 of 7, because the test's database has about 3000 pages. D-222 calls a `rate` a database can exceed a violation, and Strych's limit of 25 MB is roughly 6100 pages, so this one is within reach. The fix report names this limit itself. The rejected way F2 was about now fails, so F2 stays fixed. The constant at `src/server/database.ts:143` and D-222's comparison by an agent hold the rest.
3. **`src/server/account-backup.ts:18` has F3's fault, outside the fix diff.** It cites D-217 for removing the directory "on every end". D-217 does not say that, and a signal disproves "every end" (Minor 1 of the first review). My first review should have caught this with F3. It does not reopen the review.
4. **Two rejected ways of spec decision 1 are not in D-222.** Copying the three files, and a `sqlite3` tool (the fix report's concern 2). The handoff bound the entry to three ways, so this is no departure. The cost is small, but `*Rejected*` is what stops such a way being proposed again, and the return step can add them cheaply.

## The fix report's concerns

- **Concern 1, an invariant for one step:** I agree with leaving it. The test already fails on the rejected way. The human can still ask for one at the merge.
- **Concern 3, the gate's Prettier patterns:** it stood before this fix; see *Declined to judge*.
- **Concern 4, `progress` has no fact:** I agree no fact is needed now. D-222 does not rest on `progress`; only the test does, and by reading the test, its precondition fails if a release stops calling it. I did not run that case.

The first review's nine Minor findings were not fixed, as WAY-161 gives, and I did not review them again. Minor 3 and 5 are for the whole-change review to check.

## Declined to judge

- The gate's Prettier patterns do not cover `tests/account-backup.test.mjs` (`tests/quality/test_quality_invariants.py:17-20`): it stood before this fix and changes a quality check. The file passes Prettier when checked directly.
- `runBackup` rejecting at its deadline without waiting for the killed child to close: the fix report's note. No `EBUSY` appeared in any run of mine.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | gate's Ruff command on `.`, reviewed worktree | exit 0 |
| 2 | `python -B .the-way/elements/common/foundation_check.py`, reviewed worktree | exit 0, `0 errors` |
| 3 | `npm test -- tests/account-backup.test.mjs`, export of the head | exit 0, 7 of 7 |
| 4 | `npm test -- tests/account-storage.test.mjs`, export | exit 0, 51 of 51 |
| 5 | `npm test -- tests/deploy/test_account_backup_stream.py`, export, Docker | exit 0, ran, not skipped |
| 6 | `node --test tests/account-backup.test.mjs` in `node:24-slim`, 512 MiB | exit 0, 7 of 7 |
| 7 | ESLint with the gate's options on `src/server` and the test file; Prettier on the three files | exit 0 and exit 0 |
| 8 | Mutations `rate: 100`, no `rate` | exit 1 each, in the step test alone |
| 9 | Mutation `rate: 5000` | exit 0, survives (Minor 2) |
| 10 | Hang in the command, `src/server/account-backup.ts:64`, Windows and Linux | exit 1 by itself, 124 s and 125 s; both tests that run the whole command failed at `backup command deadline` |
| 11 | Writer that never commits, Windows and Linux | exit 1, 35 s and 34 s, `the writer made no commit in time` |
| 12 | Hang inside `backupTo`, Windows and Linux | exit 124 at my 150 s limit (Minor 1) |
| 13 | `scratchpad/one-step-beside-writer.mjs`, host and image | exit 0 each, twenty counts of 1 |
| 14 | `rate` values on both releases | as under *D-222 against its source* |
| 15 | Processes after check 10 | 0; the same count read 5 during the run, as its positive control; no container left |

**Not run:** the full `npm test`, which is the cycle's own run; the ESLint and Prettier gate commands over the whole repository (the fix report ran them); anything on the server or on Strych; shellcheck, as the fix has no Bash.

**Three results of mine that do not count, and why.**

- **`rate: 1` no longer shows F4.** It finished in 6 s and the writer test passed, on Windows and Linux, with 3037 steps; only the step test failed. The fix report's `rate: 1` run hit the deadline and mine did not, so that mutation depends on the disk and on what else is running. The evidence in my own findings file has the same weakness. Check 10 replaces it and does not depend on speed.
- **The first process counts of my F4 script were invalid.** A quoting error made the filter fail, so the `0` it printed meant nothing. Check 15 is a repaired count with a positive control.
- **Exit 124 in check 12 is not F4.** It comes from where I placed the hang, as Minor 1 says.

**What my checks left behind.** The reviewed worktree was not changed: still clean, at the head. Every mutation was in the export, and the three files were compared with the head after the last one. No process and no container is left. One more folder of synthetic data stays at `C:\Users\Mariusz\AppData\Local\Temp\loop2-backup-test-5DATjN`, from the run my time limit killed at check 12. With `-0mPY6j` from the first review, that makes two of mine for a human to delete, as the hook keeps deletion outside the project to a human. `-tWJUjM` and `-UjIoCG` date from 01:27:39, before my first run, and are not mine. The export and logs stay in the scratchpad, under `fix\` and `fixreview-*`.

## Reaches beyond the dispatch

- `spec.md` decision 1 and `foundations/decisions.md` D-222, to compare the entry with its source.
- `src/server/account-backup.ts:8-21`, for the remaining citations of D-217 (Minor 3).
- `scratchpad/one-step-beside-writer.mjs`, the fix's own script, read before running it.

## Searches not found or unclear

- **`tests/quality/test_quality_invariants.py`'s Prettier scope:** as under *Declined to judge*.
- **Why `rate: 1` hit the deadline in earlier runs and not in mine:** not established. A full `npm test` was running on this computer during my first review, which may be the reason; I did not test that.
- **Who left `-tWJUjM` and `-UjIoCG`:** unknown, as the fix report says.
