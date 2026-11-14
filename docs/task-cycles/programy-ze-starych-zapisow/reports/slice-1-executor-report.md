# Slice 1 — executor report

**Status:** done
**Commit:** `896b7509` on `task/programy-ze-starych-zapisow` (base `809fbf6b`), message in English, four files added by explicit path.
**Check line:** all four named checks pass on the final state (storage 75/75, backup 10/10, backup-stream 1/1 OK, typecheck exit 0). Not run by me: the product's gate `npm test` without a file and `foundation_check.py` (orchestrator's). Nothing failed.
**Questions:** none.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/database.ts` | 117 | 2 |
| `tests/account-storage.test.mjs` | 389 | 17 |
| `tests/account-backup.test.mjs` | 1 | 1 |
| `tests/deploy/test_account_backup_stream.py` | 1 | 1 |

## What was built

- Schema step 5, appended after step 4 (steps 1–4 untouched): `accounts.previous_save_allowed` (not null, default 0, checked 0 or 1), and table `previous_saves` (key and cascading foreign key on `account_id`, `version >= 1`, `revision >= 1`, game text with the 64 KiB byte check as in `saved_games`).
- `Account` gains `previousSaveAllowed`; `readAccount` validates the column; `createAccount` returns `false`.
- `readSavedGame` and the new `readPreviousSavedGame` share one private reader, `readStoredGame(table, accountId)`.
- `writeSavedGame`: after the blocked, outdated and conflict checks pass, and only when the stored version is lower than the incoming one, `movePreviousSave` runs (SQL `INSERT … SELECT` from `saved_games` with an upsert, so the game text is not read in JS) before the upsert of the new current row.
- `resetSavedGame(accountId)`: reads blocked, then privilege, then current save, in one transaction; outcomes `blocked`, `unprivileged`, `nothing-to-move`, `moved` (moved = copy to slot plus delete of the current row).
- `setPreviousSavePrivilege(email, granted)`: one transaction by normalized address; outcomes `granted`, `already-granted`, `revoked`, `not-granted`, `unknown`, with `accountId` on all but `unknown`.

## Tests written first (red runs)

Test changes: the version expectations the spec's decision 7 lists (account-storage lines 185–189 now 6 as first unknown; 323, 347, 451, 487, 594, 639 now 5; titles and comments that said "version 4" corrected; the "no schema step is added" assertion at 1290 replaced by `5`); `previousSaveAllowed: false` added to the three account-record `deepEqual`s; `user_version` 4 → 5 in `tests/account-backup.test.mjs:281` and `tests/deploy/test_account_backup_stream.py:90`. New cases: version-4 open (`versionFourDatabase` fixture written in the test), failing step 5 rollback, save moves (higher version moves, same version and first save do not, second move replaces), refused saves move nothing, a save whose write fails after its move rolls back, reset moves, reset replaces, reset refusals (unprivileged, blocked, nothing-to-move), block/unblock/grant/revoke leave the slot, privilege write outcomes, previous-save table byte limit and cascade.

Red runs, before any change to the code's behaviour:
- `npm test -- tests/account-storage.test.mjs` exit 1: 15 of 75 failed. Stub methods (`readPreviousSavedGame`, `resetSavedGame`, `setPreviousSavePrivilege`) were added to `database.ts` first so the tests reach their assertions. Failures are assertions (`4 !== 5`, the expected move, the expected outcome, `Missing expected exception` for the failing step 5). Exception: "the table of previous saves holds at most 65 536 bytes…" failed on `no such table: previous_saves` (the schema step does not exist yet; I did not stub SQL), so that one stopped before its assertions.
- `npm test -- tests/account-backup.test.mjs` exit 1: 1 of 10 failed (`4 !== 5` at line 281).
- `npm test -- tests/deploy/test_account_backup_stream.py` exit 1 (174 s): `(4,) != (5,)`.
- Not red at baseline, by design: "a version-1 … unknown version becomes 6" (the code already refuses version 6); the rollback test "a save whose write fails after its move" was red (previous slot read as null).

Green runs, after the change:
- `npm test -- tests/account-storage.test.mjs` exit 0, 75/75 pass.
- `npm test -- tests/account-backup.test.mjs` exit 0, 10/10 pass.
- `npm test -- tests/deploy/test_account_backup_stream.py` exit 0 (142 s, image built and checked).
- `npm run typecheck` exit 0.

Other checks run (not named in the handoff):
- `npx prettier --check` on the three touched JS/TS files: first warned on `database.ts` and `account-storage.test.mjs` (my lines); `npx prettier --write` on those two; check after that exit 0. The base of both files was prettier-clean, so the write touched only my hunks.
- `npx eslint src/server/database.ts tests/account-storage.test.mjs tests/account-backup.test.mjs`: exit 0.
- `npm test -- tests/http.test.mjs` exit 0, 89/89 pass: reach check for the new `Account` field on the account routes (the routes build their answer from named fields, so the route answers do not change in this slice).

## Own-work check

- Requirement most likely unmet: the move happens only on an accepted save of a higher version, and a failing write after the move rolls back the move. Check: the rollback test (save of 65 537 bytes after a move), plus mutations of `database.ts` (restored, byte-compared equal to the saved copy):
  - No move in `writeSavedGame`: `npm test -- tests/account-storage.test.mjs` exit 1, 4 failures.
  - No privilege check in `resetSavedGame`: exit 1, 1 failure.
- Not verified by mutation: the rollback itself (I did not break the transaction boundary). The rollback test is green against the real code.

## Choices made

1. Names: column `previous_save_allowed`, table `previous_saves`, methods `readPreviousSavedGame`, `resetSavedGame`, `setPreviousSavePrivilege(email, granted)`. Rejected: two methods for grant and revoke as block and unblock have; same behaviour, more duplicated code. Cost if wrong: a rename in slice 2 only.
2. The privilege write is one method with a boolean; its `unknown` outcome mirrors the block's. Cost: none known.
3. `resetSavedGame` on an account that does not exist throws `Error("Unknown account")`, as `writeSavedGame` does. Rejected: a fifth outcome. Cost: the route (slice 2) must map a thrown error; the route has a session naming the account, so the case should not occur.
4. The previous-save copy is SQL over the stored row, not a JS read and rewrite of the text. Rejected: reading the game in JS (it would read text the server must not read, D-07, and copy it twice). Cost: none known; the copy shares the table's CHECK constraints.
5. `readStoredGame` takes a closed union of two table names that is interpolated into the SQL template. Not user input. Rejected: a duplicated reader. Cost: none.
6. The move in `writeSavedGame` sits between the conflict check and the upsert, as spec section 2 orders it.

## Adaptations of section 4 (plan versus code)

None. The plan matched the code at the base commit. The line numbers in the handoff's copied passages matched the worktree.

## Changed invariant tests, named

No invariant test was removed or weakened. The existing schema tests that read version 4 changed their expectations to 5 as decision 7 of the spec lists them (listed above). Their titles now say "version 5"; the three account-record comparisons gained `previousSaveAllowed: false`.

## Reach beyond the handoff

- Read `.the-way/task-cycle/change/SKILL.md` whole, `.the-way/task-cycle/change/slice.md` whole, `guidelines/coding.md`, `guidelines/coding-database-access.md` and `guidelines/testing.md` whole (the last in two reads, 469 lines).
- Read the foundation entries named by the handoff at their ranges, plus the glossary entries 156–161 and 254–265 and the `account-server` part-map entry (`foundations/part_map.md:63-84`).
- Read `the author's rule file on writing scripts` and `…\.ai\rules\git.md`: a global hook asked for them before a Bash call and before the commit.
- Ran `tests/http.test.mjs` (89/89) and `grep` for `findAccountBy`/`readAccount` across `src/` and `tests/` to see who reads account records.
- Ran prettier and eslint on the touched JS/TS files, and the two mutation runs above.

## Unread material

- `foundations/invariants.md:858-867` `blocked-account-access` (named in the handoff's *Read* list): not read. The change does not alter the block, but I did not check the entry.
- `tests/account-storage.test.mjs`: read lines 1–960 and 1255–1300 and grep matches elsewhere. Lines 961–1254 and 1301–2527 not read whole. All my hunks (185–1662 in the new file, listed by `git diff -U0`) lie inside the read regions.
- `tests/account-backup.test.mjs`: read 255–300 and the changed line 281; the rest not read.
- `tests/deploy/test_account_backup_stream.py`: read lines 1–40 and 60–106 and the changed line 90; lines 41–59 not read.
- `task.md` and `spec.md`: not opened; their passages come from the handoff, as the slice method asks.
- `guidelines/coding-saved-game.md` and `foundations/invariants.md:1338` (`previous-save-programs-reader`): not named for slice 1, not read.

## Searches not found or unclear

- `project-level/technology/reserved_choices.md`: not read. The change adds no language, library, store or place to run; SQLite and `node:sqlite` are settled (D-229), so section 5 did not apply.
- Unclear: whether the spec's "a thrown error rolls back both" needs its own mutation check. I left it at the rollback test.
- Process note, not a product issue: a global `rules-on-demand` hook blocked three of my Bash commands once each and asked me to read two rule files, which I did; the first blocked command also prevented a message file from being written, so the commit was retried with that file written through the Write tool.
