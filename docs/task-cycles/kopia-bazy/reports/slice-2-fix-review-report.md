PASS acb7aeef3812f7831832f7e79898374ab003dea0

# Review of the fix, slice 2, task kopia-bazy

Range `aec92e4..acb7aee`, one commit, four files. `git rev-parse HEAD` is the given head. The reviewed worktree stayed clean; every mutation was made in a scratch export of the head commit, removed afterwards.

Counts: blocking 0, Minor 4, out of scope 0.

## The finding

### 1. No test tells the check from one that touches no database: **fixed**

The defect no longer exists on the new head. Repeated by me, in the export:

| Mutant of `src/server/account-database-check.ts` | `npm test -- tests/account-database-check.test.mjs` | Tests that fail |
|---|---|---|
| `expect` never throws | exit 1 | two steps, empty backup, other password hash, other saved game state |
| whole body replaced by `mkdtemp`, `rm` and the print, no `AccountDatabase` | exit 1, 2 pass, 6 fail | the five variants and the control |
| no read of the backup | exit 1 | empty backup, other hash, other game |
| no step assertion | exit 1 | two steps |
| hash not compared | exit 1 | other hash |
| game text not compared | exit 1 | other game |
| failure exits 0 | exit 1 | all five variants and the unwritable directory |
| files not removed | exit 1 | every case that runs the check to its end |

The head itself: exit 0, 8 pass, three runs in a row on this computer's Node.js 24.17.0, and exit 0, 8 pass on the release the image is built on, `node --test` in a `node:24-slim` container, v24.22.1.

All that the finding required stands in the test:

- The named variants empty backup, another value (hash and game), two steps and refused `rate`, each asserting a non-zero exit and no success line.
- The pass-through control, and "stand-in reached" in every case, so the trap of the finding (a stand-in silently unused) is closed. A moved import of `node:sqlite` would fail these tests, since the hook matches `dist/server/database.js` alone.
- The tests cite `// invariant: account-save-sqlite-upgrade`; the indented form matches the citation pattern of `foundation_check.py`.

**The one departure from the handoff's wording, kept as right.** The refused `rate` variant does not fail against the `expect` mutant, because it fails through the thrown error, not through `expect`. The fix report says so. So its failing run was not shown there; I saw it fail against "failure exits 0" and "files not removed", which is the proof it asserts something.

**Fix report's claims.** Its two mutant runs hold as reported. The check's code is unchanged in the range.

## What the fix itself broke

No Critical or Important finding. Inspected: 

- The stand-in cannot reach the image: `tests/` is outside `.dockerignore`'s allowed list, and `Dockerfile` does not copy it.
- `LOOP2_CHECK_STANDIN` appears in no file under `src/`, `deploy/`, `Dockerfile` or `compose.yaml`.
- `tests/account-database-check-standin.mjs` holds no `*.test.mjs` name, so `scripts/test.py`'s patterns do not run it as a test; `tests/quality/test_node_test_selection.py` passes.
- Every child has the 60 s deadline and a kill; the temporary directory goes after a failure too.
- The added file outside the slice's *Change* is needed for the fix, and is claimed by `account-server` in the part map, with no *Depends on* or trust boundary change.

**Changed invariant test:** `tests/invariants/test_account_save_sqlite_upgrade.py`. Its docstring only, the *Does NOT cover* sentence; no assertion changed. The new wording is true.

## Minor

### 2. A variant cannot tell a difference from a broken stand-in

`tests/account-database-check.test.mjs:107-120`, the assertion at `:113`. The variants assert a non-zero exit, and any error inside the stand-in gives one too. With the SQL of `other-hash` pointed at a table that does not exist, the Linux run stays green, exit 0, 8 pass. (On Windows it fails, only because the unclosed connection stops `rm`.) Today the `expect` mutant shows these variants fail for the right reason. After a schema change that renames a column, one of them could turn into a test of nothing, on Linux, unseen. A stand-in that catches its own failure and exits with a code of its own closes this.

### 3. Two parts of the check stay unprotected

`src/server/account-database-check.ts:62` and `:41-42`. Two mutants survive, exit 0: no read of the original database, and a revision not compared. The version is not compared by any variant either. Reading the backup covers the same read path, so the first costs little; the slice's Goal does say "reads them back". Worth one more variant at most, and outside what the finding required.

A third mutant, a swallowed backup error, also survives, and is equivalent: the missing file opens as an empty database and the check still fails on "holds no account".

### 4. `copy` used for the backup, again

`tests/account-database-check-standin.mjs:35-37,39-41`. The cycle binds "backup" in new code, tests and text; `copy` is a game term (`foundations/glossary.md:175`). New in this diff, beside the same word left at `src/server/account-database-check.ts:69,71,73`. No behaviour follows.

### 5. A line of 141 characters in a wrapped docstring

`tests/invariants/test_account_save_sqlite_upgrade.py:17`. The docstring around it wraps at 100. Ruff has no line-length rule that catches it, and no behaviour follows.

## Declined to judge

- The Minor findings of the first review not touched by this fix (4, 5 and 6 there, and the citation on the two original tests): not fixed by rule, and outside the fix diff.
- The new test files fall outside the ESLint and Prettier patterns of `tests/quality/test_quality_invariants.py`, which list `tests/{sim,view,quality}` and `tests/{http,startup}.test.mjs`: true of every Node test at `tests/` of this kind, not of this fix. I ran both tools on the files directly.

## Checks run

- `git rev-parse HEAD`: `acb7aee...`, the given head. `git status --short` in the worktree: empty, before and after.
- `npm test -- tests/account-database-check.test.mjs` (export): exit 0 three times, 8 pass.
- `docker run --rm ... node:24-slim node --test tests/account-database-check.test.mjs` on the export's build: exit 0, 8 pass, v24.22.1.
- Eleven mutants through the same `npm test` command (export), each applied, confirmed by `git diff` in the export, and restored by `git checkout`: the table above, and exit 0 for the three survivors.
- Stand-in with broken SQL: exit 1 on Windows; exit 0 in the Linux container.
- `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` (export): exit 0.
- `npm test -- tests/quality/test_node_test_selection.py` (export): exit 0.
- ESLint `--max-warnings 0` with an empty suppressions file: exit 0. Prettier `--check --no-config --no-editorconfig --ignore-path .gitignore`: exit 0. Both on the two `.mjs` files. Ruff `--config ruff.toml --ignore-noqa --no-fix --no-cache` on the Python file: exit 0.
- `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree): exit 0, "0 errors".

**Not run:**
- Full `npm test`: the cycle's own run before the request.
- A real image build: `Dockerfile` and the check's code are unchanged in the range, and the four builds of the first review stand; `tests/` does not enter the image.

No container, image or process is left from this review.

## Reaches beyond the dispatch

- `scripts/test.py:11`, `tests/quality/test_quality_invariants.py:15-20`, `eslint.config.mjs:14-23`: whether the new helper is run or linted by the gate.
- `.the-way/elements/common/foundation_check.py:82-84`: the citation pattern, for the indented form.
- `foundations/glossary.md:175`: the word `copy`.
- `.the-way/task-cycle/review/fix.md`: the method, named by the handoff.

## Searches not found or unclear

- The handoff asks each variant to fail against the `expect` mutant, and one cannot; see finding 1. The rest of the requirement holds, so I read it as met.
- `git ls-files --eol` shows the Python test as `i/lf w/crlf` with no attribute; that matches the fix report's warning and `git status` is clean, so nothing is committed with CRLF.
