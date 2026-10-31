# Blocking finding — review of slice 2, in the reviewer's words

From `reports/slice-2-review-report.md`, head `aec92e4c19582b518c6db8c3b477575d82058a56`.

### 1. No test tells the check from one that touches no database

**Place:** `tests/account-database-check.test.mjs:53-76`, against the slice's Goal "any difference or error exits non-zero" and To do 6. Comes from this slice. The gap is inherited: the plan's *Checks* and spec section 15 name only these two cases. It is a defect all the same.

**What is wrong.** The two tests are "passes and prints the release" and "`mkdtemp` fails". Neither reaches a line that reads, writes or backs up. The only failure the suite shows happens before the database is opened, so the part of the file that gives the check its worth, every `expect` and both `expectContents`, is unprotected. The invariant test reads only the `Dockerfile` and says so in its *Does NOT cover*.

**Why it matters.** `account-save-sqlite-upgrade` has method `test` and rests on this check (D-215, plan row E13). Its whole purpose is that a broken Node.js release stops the build. A later change that weakens the check leaves every test green, and the invariant then holds on paper only: the first release that really breaks reaches the server unnoticed, which is the one failure this slice exists to stop.

**Evidence, in a scratch export of the head:**

| Mutant of `src/server/account-database-check.ts` | `npm test -- tests/account-database-check.test.mjs` | Under a stand-in backup with the wrong contents |
|---|---|---|
| `expect` never throws | exit 0, 2 pass | exit 0, prints "checked" |
| the whole body replaced by `mkdtemp`, `rm` and the print, no `AccountDatabase` at all | exit 0, 2 pass; `tests/invariants/test_account_save_sqlite_upgrade.py` exit 0 | not run |

The author's mutation (asserted steps 1 to 2) makes the check stricter, so it shows the passing test can fail, not that a difference is caught. The author's own-work check names this exact requirement, correctly, and its check would not catch it unmet (section 2 of the method).

**The code itself is right.** Run unchanged under a stand-in for `backup()`, the check exits 1 with a line of its own for each case: backup file empty ("holds no account"), other saved game text, other password hash, saved game row gone, two steps reported, `rate` refused. A pass-through stand-in, the control, exits 0. No temporary directory was left. So the fix is a test, not code.

**No injection point is needed,** which answers the report's reason for leaving this out. `node --import <hook>` with `module.registerHooks`, resolving the product's import of `node:sqlite` to a test-owned wrapper that re-exports `DatabaseSync` and replaces `backup`, reached the built check unchanged. Spec's *Constraints* allow it: a stand-in proves the reaction, and the reaction is what is tested. Mutating `sqlite.backup` with `syncBuiltinESMExports` does not work for `node:sqlite` (all cases exit 0, stand-in silently unused), so such a test needs the pass-through control or an equivalent proof that the stand-in was reached.

**Required:** at least the named variants empty backup, another value in the backup, two steps and a refused `rate`, each asserting a non-zero exit and no success line, seen failing against the `expect` mutant, with the pass-through control.
