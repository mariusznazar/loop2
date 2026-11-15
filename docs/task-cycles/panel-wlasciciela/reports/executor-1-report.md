# Executor report — slice 1: the role on the account, schema version 6

## Status

`done with concerns` — the slice is complete and its focused checks pass. The concerns are in the section "Concerns" below.

## Commits (branch `task/panel-wlasciciela`, base `1d833c7e`)

- `efac1226` test: :white_check_mark: move the schema checks to version 6 and add the version-5 upgrade, the failing step 6 and the new account as a player (D-112, D-410)
- `55e3b8e8` feat: :sparkles: add the role of an account as schema step 6, every account a player and a new one a player (D-112, D-410)

The tests commit (`efac1226`) is red on its own: 7 tests fail there until the change commit lands. This is the test-first order the method asks for.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/database.ts` | 17 | 2 |
| `tests/account-storage.test.mjs` | 196 | 18 |
| `tests/account-backup.test.mjs` | 1 | 1 |
| `tests/deploy/test_account_backup_stream.py` | 1 | 1 |

## What changed

- `src/server/database.ts`: the type `AccountRole` (`player` | `owner`); the field `role` on `Account`; schema step 6 at the end of the list, `ALTER TABLE accounts ADD COLUMN role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'owner'))`; `createAccount` returns `role: "player"`; `readAccount` refuses a stored role that is neither value, with the same error as its other checks. No other method changed. `account-block` and `account-previous-save` are untouched.
- `tests/account-storage.test.mjs`: every "opens as version 5" title and assertion now says 6; the newer-version test now writes 7 (the first unknown version) and its comment says 6 is current; every whole-account comparison carries `role: "player"`; the step 5 test is unchanged. New: a version-5 database written by the test with its own schema (blocked, confirmed, privileged, session, link, saved game and previous save) opens as version 6 with every row and value kept and every account a `player`, and a new account is a `player` also after a reopen; a failing step 6 (a conflicting `role` column) leaves the version-5 database at version 5 with its rows, columns and tables unchanged.
- `tests/account-backup.test.mjs` and `tests/deploy/test_account_backup_stream.py`: the expected `user_version` is 6.
- The quotation `// decision: D-112 "Accounts have an opaque random primary identifier, … the role, `player` or `owner`, which the step to version 6 adds … for every account it holds"` is the one line I added. It quotes from the start of a sentence, as the foundation check requires.

## Checks (command, exit code)

Run before the change, the red run (expected failure):
- `npm test -- tests/account-storage.test.mjs` — exit 1, 84 tests, 77 pass, 7 fail. The failures are the expected assertions: the version-5 upgrade test and the failing-step-6 test (`Missing expected exception`), the four older-version tests and the reset-link test (`5 !== 6`).

Run after the change:
- `npm run typecheck` — exit 0.
- `npm test -- tests/account-storage.test.mjs` — exit 0, 84 of 84 pass, 0 fail, 0 skipped.
- `npm test -- tests/account-backup.test.mjs` — exit 0.
- `npm test -- tests/deploy/test_account_backup_stream.py` — exit 0 (1 test, 128.6 s).
- `python -B .the-way/elements/common/foundation_check.py` — exit 1 at first: `tests/account-storage.test.mjs:795: the quotation does not begin a sentence of D-112`. I changed that quote to start at the sentence's first word, and the rerun gives exit 0, `0 errors`.

Not run by me: the full `npm test` (the orchestrator runs the gate), and the other test files that build or compare account objects (`tests/http.test.mjs`, `tests/account-api.test.mjs`, `tests/deploy/test_account_storage.py`). The new field `role` on `Account` could change them, so the gate run is where they get checked.

## Own-work check

- Requirement: after the migration every account is a `player`, and a new account is a `player` by the default and never an `owner`.
- Check: mutate the default to `DEFAULT 'owner'` in the worktree, run `npm test -- tests/account-storage.test.mjs`, then restore the line.
- Result: mutant run exit 1, 78 pass, 6 fail. The source was restored; `git diff` shows only the intended change in `src/server/database.ts`. The storage run of exit 0 (84 of 84) was made before the mutation, on the same content that is committed.

## Choices made

- The role check in `readAccount` and the default are the only logic. I kept the default in the schema (not an explicit `'player'` in the `INSERT`), so that a new row gets `player` from the database, as D-112 describes.
- Step 6 is one `ALTER TABLE ... ADD COLUMN` with a `CHECK`, as the earlier steps use. Rejected: a table rebuild (the D-112 rationale rejects it for rows moved by a column add).

## Concerns

- The read-side refusal of an unknown stored role (`readAccount`) has no test. The `CHECK` constraint refuses any stored value other than `player` or `owner`, so no test can reach that branch without removing the constraint. The other unknown-value checks in `readAccount` have no test either, so this matches the existing practice. The gate's coverage here is by the constraint.
- No question for the orchestrator. Nothing in the slice needed a choice the task, plan or foundation leave open.

## Reach beyond the handoff

None. I read the files the handoff names, plus the lines of `tests/account-storage.test.mjs` and `tests/account-backup.test.mjs` where the version numbers sit, and the foundation entries D-411 and the invariant `player-self-registration` as context.

## Working copies

No worktree, clone or prepared input was made. The directory `.runs/executor-1/` held only the text logs of the command runs above; it is removed before I return, so no copy remains.

## Unread material

None. Read whole: `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`, `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-database-access.md`. Read at the handed ranges: `foundations/decisions.md` D-112 (2365-2379), D-202 (4381-4410), D-253 (6319-6369), D-354 (9886-9912), D-410 (10894-10910); `foundations/invariants.md` 758-776 and 608-617; `foundations/glossary.md` 270-277; `.runs/task-cycles/panel-wlasciciela/task-frozen.md` 20-39.

## Searches not found or unclear

None. The grep for `version 5`, `user_version`, `previousSaveAllowed` and `schema` located every version-5 assertion; each one that is not a version-5 assertion is a fixture or an unrelated test.
