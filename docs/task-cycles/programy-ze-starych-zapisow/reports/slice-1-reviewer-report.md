FAIL 896b750993bec754de4cf5efd3596d324ab8b355

# Slice 1 — reviewer report

Range reviewed: `6f237fb8ce26450706d8738d3d3a07298e8ec110..896b7509` (foundation entries `809fbf6b`, executor's commit `896b7509`). `git rev-parse HEAD` in `the task's worktree` is `896b750993bec754de4cf5efd3596d324ab8b355`, as given; `git status --short` is empty before and after my work. I changed no tracked file and made no commit.

Counts: blocking 1, Minor 2, out of scope 0.

## Verdict in one paragraph

The code in `src/server/database.ts` does what the plan's Goal and the spec's decisions 2 and 3 say: step 5 is appended and additive, each new unit is one `BEGIN IMMEDIATE` transaction that reads what it checks, the refusals of the save write keep their order, the move is plain SQL over the stored row (the server reads nothing of the game, D-07), and no asynchronous work stands in a transaction. What fails the slice is the tests: the plan requires the new cases to carry the marker of `player-save-isolation` (E17), and none does. I showed with three mutations that the writes which must touch only the named account's rows are not tested against a second account.

## Findings

### Important (blocking)

**I1. No test shows that the move, the reset and the privilege write touch only their own account's rows; E17 `player-save-isolation` is carried by no new case.**

- Place: `tests/account-storage.test.mjs`, the new cases from line 1034 to 1301 (the plan's slice 1 Goal: "new cases, carrying the markers of E18, E19 and E17"; the plan's entry table row E17: "Slices 1, 2 (their tests)"). `git diff 809fbf6b..896b7509 -- tests | grep 'invariant:'` shows markers `account-database-schema`, `account-schema-lifecycle` and `previous-save-slot` only; no new `player-save-isolation` line. The invariant now reads "a signed-in player can read and change only the saved game states, the previous save included, belonging to their own account" (`foundations/invariants.md`, `## player-save-isolation`).
- What is wrong: every new case that writes the slot or the privilege uses one account (the `fixture` account). The only second account (`other@example.test` in the byte-limit case, and `empty@example.test` in the reset case) never has a save, a slot or a privilege that the first account's operations could damage.
- Why it matters: this is the `src/server/**` trust boundary, and the three writes are the ones that must be scoped by account. Their scope is one `WHERE account_id = ?` or `WHERE id = ?` each. A lost clause turns a player's reset into everyone's reset, or a grant of one address into a grant for all, and the green tests would not notice.
- Evidence (mutation runs, below, in a scratch copy of the head commit; `npm test -- tests/account-storage.test.mjs` stayed at exit 0, 0 failing, for each of):
  - M21 `resetSavedGame`: `DELETE FROM saved_games WHERE account_id = ? OR 1 = 1` — survives.
  - M22 `movePreviousSave`: `WHERE account_id = ? OR 1 = 1` in the `INSERT … SELECT` — survives (it copies every account's current save into every account's slot, each under its own identifier).
  - M23 `setPreviousSavePrivilege`: `UPDATE accounts SET previous_save_allowed = ? WHERE id = ? OR 1 = 1` — survives.
  - For contrast M24 (the reader of the previous save losing its account filter) is caught by 7 failing cases, so the reader is covered by accident and the three writes are not.
- Fix asked for: one case with two accounts, marked `// invariant: player-save-isolation`. For example: both accounts hold a current save; account A is granted the privilege, takes a save of a higher version and then a reset; account B's current save, previous save, privilege and its own `readPreviousSavedGame` stay exactly as they were, and B holds no privilege after A's grant. It should fail on M21, M22 and M23 and pass on the head code.

### Minor

**M1. A comment in the new test claims a coverage the test does not have: the order "block, then privilege" of the reset is not tested.**

- Place: `tests/account-storage.test.mjs`, the case "a reset moves nothing without the privilege, for a blocked account, and with no current save", the comment "The block is read before the privilege: a blocked account without the privilege answers blocked." followed by `database.setPreviousSavePrivilege("player@example.test", true)` and only then the reset.
- What is wrong: the account in that step is blocked and privileged, so it answers `blocked` whatever the order. A blocked account without the privilege never calls the reset.
- Evidence: M4, swapping the two `if`s in `resetSavedGame` so the privilege is read first, leaves the file green (exit 0, 0 failing).
- Why Minor: the plan lists the order of reads ("it reads the block, then the privilege, then the current save") but only a blocked, unprivileged account can tell the orders apart, and for that account nothing moves either way; slice 2 maps the outcomes to 401 and 403, where the order would show, but the session of a blocked account is already deleted by the block. Either test the case (block the account, never grant) or drop the sentence.

**M2. The reset's "nothing to move" is tested only with an empty slot.**

- Place: same case, the account `empty@example.test`.
- What is wrong: it has no previous save either, so a reset with no current save that wrongly emptied or overwrote an existing slot would not show. The spec's decision 3 ("Nothing else moves") and D-396 ("changes nothing when … holds no saved game state") are about exactly that: a slot that already holds a document must survive a reset that moves nothing.
- Why Minor: the code does not do it (`resetSavedGame` returns before touching the slot); only the protection is thin. A cheap addition: reset once, then reset again, and check that the slot still holds the first document (the existing case "a reset replaces the previous save …" has the first half of that sequence).

## Against the task, spec and foundation

- To do 1 (one previous save per account, with or without the privilege, replaced by a later move, 64 KiB): met in the database. Step 5 `previous_saves` has key and cascading foreign key on `account_id`, `version >= 1`, `revision >= 1`, `length(CAST(game AS BLOB)) <= 65536`. Tested by bytes with `"ż".repeat(32_768)` against `+ "a"` and by the cascade (M14, M17, M18 each fail the byte case).
- To do 2, database half (the privilege write and its five results, returning the account identifier): met, one transaction through `findAccountByEmail`, same shape as the block and unblock writes. The command, the routes and the client are other slices.
- To do 5, database half (reset copies then deletes, four distinct results): met. Blocked, then privilege, then current save are read inside the transaction (`SELECT blocked, previous_save_allowed FROM accounts`, then `readSavedGame`). An unknown account throws `Unknown account`, as `writeSavedGame` does (executor's choice 3; the route has a session naming the account; I judge it acceptable and note slice 2 must not turn it into a 500 for a deleted account without deciding that).
- The save write: order of refusals unchanged (blocked, outdated, conflict), revision unchanged, the move only when `stored && stored.version < save.version` after all three pass, copy before the upsert, inside the same transaction. Mutations M1 (`<=`), M7 (the slot not replaced), M9 (move before the refusals) each fail 3 to 5 cases. The rollback case ("a save whose write fails after its move …") shows the copy taken back when the upsert throws; I did not mutate the transaction boundary itself (see Not run).
- D-07: the move is `INSERT … SELECT … ON CONFLICT … DO UPDATE` over the stored row, with `WHERE` before `ON CONFLICT` (the parsing ambiguity of SQLite is avoided); no JS string of the game is read or parsed anywhere in the new code. Nothing in the diff compares inside the game.
- Foundation entries vs code: D-112 (current version 5, step per version, privilege column on the row every login reads, the reset's three reads, the privilege write's three outcomes, "blocking keeps the account's saved game state and its previous save"), D-210 (move at an accepted higher version, in the writing transaction), D-393 (what moves and what does not), D-394 (flag off by default, one write by normalized address), D-396 (the reset's reads and moves), the invariants `account-schema-lifecycle`, `account-database-schema`, `previous-save-slot` and the glossary entries `previous save` and `previous-save privilege` say what the code does. I found no difference between the foundation entries and the code, and so none between the entries and the spec on the database side.
- `blocked-account-access` (the gap carried to me, read whole): "A blocked account cannot sign in or use authenticated game endpoints." The change keeps it at this layer. A blocked account's save is refused first (`blocked`), its reset answers `blocked` and moves nothing (M13, removing that check, fails a case), and blocking and unblocking do not touch the slot (case "blocking, unblocking, granting and revoking …"). The routes that enforce the invariant at HTTP are slice 2.
- Changed existing tests (the instruction asks to name changed invariant tests): the schema-version expectations in `tests/account-storage.test.mjs` that carry markers `account-database-schema` and `account-schema-lifecycle` (the first unknown version 5 to 6 at the reopen case; 4 to 5 at the version-1, -2 and -3 cases and the reset-link case; the assertion "no schema step is added" replaced by "the schema stays at its current version 5"), the three account-record comparisons gaining `previousSaveAllowed: false`, `tests/account-backup.test.mjs:281` and `tests/deploy/test_account_backup_stream.py:90` from 4 to 5. All are the changes the spec's decision 7 lists; none weakens an assertion. The tests that read other versions (`tests/startup.test.mjs` 99) are untouched.
- Guidelines: `guidelines/coding-database-access.md` (a step added at the end, none edited; the transition tested on a version-4 database written in the test by its own schema, `versionFourDatabase`, and its refusal and rollback on a real SQLite file; parameter binding; the one interpolated table name in `readStoredGame` is a closed union of two literals, not input). `guidelines/testing.md`, "Changing an existing test" (each changed expectation has its source in the spec's list), "Where the expected value comes from" (expected values are written out), "Trust boundaries" (the invariant markers, and I1 above). `guidelines/coding.md`: prettier and eslint pass (below).
- Reserved choices: none taken (SQLite and `node:sqlite` are settled by D-229); I did not open `reserved_choices.md`.
- User interface: not touched by this slice.

## The author's own-work check

The executor named "the move happens only on an accepted save of a higher version, and a failing write after the move rolls back the move" and checked it with the rollback case and two mutations. That check fits what it chose. It does not fit where the slice is weakest, which is the account scope of the three writes (I1) and the order of the reset's reads (M1); its checks would not catch either one unmet.

## Declined to judge

- The wording of the foundation entries beyond whether the database code does what they say (the writing agent's report `foundation-entries-report.md` and slice 6's expected foundation-check error are the orchestrator's).
- The routes, the command, the client, the page and the skill: slices 2 to 9.
- Whether `resetSavedGame` should answer an unknown account with a fifth outcome instead of throwing: a design choice for slice 2, not wrong here.
- A previous-save `CHECK (version >= 1)` and `CHECK (revision >= 1)` that no test reaches directly (the table's checks are copies of `saved_games`'s; the byte check is the one the plan names).

## Checks I ran

All in `the task's worktree` at `896b7509` unless stated.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 75 tests, 75 pass |
| `npm test -- tests/account-backup.test.mjs` | 0 | 10 tests, 10 pass |
| `npm test -- tests/deploy/test_account_backup_stream.py` | 0 | `Ran 1 test … OK` (Docker daemon available) |
| `npm run typecheck` | 0 | |
| `npx prettier --check src/server/database.ts tests/account-storage.test.mjs tests/account-backup.test.mjs` | 0 | all formatted |
| `npx eslint src/server/database.ts tests/account-storage.test.mjs tests/account-backup.test.mjs` | 0 | |
| `git diff 809fbf6b..896b7509 -- tests \| grep 'invariant:'` | 0 | no `player-save-isolation` marker among the added lines |

Manual mutation checks (the testing guidelines' StrykerJS run is for `simulation` files only; the changed server file is `account-server`, whose guideline asks the author to check "in the head"; I mutated by hand because the slice is a trust boundary). Each in a scratch copy of the head commit under the session scratchpad (`git archive 896b7509`, `node_modules` joined by a junction that I removed afterwards), the mutated file restored after each run, command `npm test -- tests/account-storage.test.mjs`:

| Mutation of `src/server/database.ts` | Exit | Failing cases |
|---|---|---|
| M1 `stored.version <= save.version` for the move | 1 | 1 case (3 lines of the reporter) |
| M4 reset reads the privilege before the block | 0 | none (survives, Minor M1) |
| M5 reset deletes without moving | 1 | 2 cases |
| M7 the slot is not replaced by a later move (`DO NOTHING`) | 1 | 2 cases |
| M9 the move placed before the refusals | 1 | 1 case |
| M13 reset ignores the block | 1 | 1 case |
| M14 no byte check on `previous_saves.game` | 1 | 1 case |
| M17 `length(game)` instead of the bytes | 1 | 1 case |
| M18 no cascade on `previous_saves` | 1 | 1 case |
| M19 reset without the nothing-to-move return | 1 | 1 case |
| M20 privilege column defaults to 1 | 1 | many (19 lines) |
| M21 reset deletes every account's current save | 0 | none (survives, Important I1) |
| M22 the move copies every account's current save | 0 | none (survives, Important I1) |
| M23 the privilege write grants every account | 0 | none (survives, Important I1) |
| M24 the previous-save reader ignores the account | 1 | 3 cases (7 lines) |

Baseline of the scratch copy before mutation: `npm test -- tests/account-storage.test.mjs` exit 0, 75/75.

Not run: the product's gate (`npm test` without a file) and `foundation_check.py` (the orchestrator's, as the handoff says); a mutation of the transaction boundary itself (the rollback case is green against the real code, and I did not break `transaction`); StrykerJS (not applicable to this file by the guideline).

## Reach beyond the handoff

- `.the-way/task-cycle/review/SKILL.md` (the method, read whole).
- The executor's report `slice-1-executor-report.md` (named by the handoff) and `plan.md` lines 9, 29, 30 and 40–48 (the entry table and the slice's section, to check what "carrying the markers of E17" asks; the handoff copies the slice text, I read the plan file only for the E17 row and the markers' rule at line 161).
- `foundations/decisions.md` D-393, D-394, D-395 and D-396 (lines 9635–9694), read whole; and the diff `6f237fb8..809fbf6b` of `foundations/invariants.md`, `part_map.md` and `glossary.md`, to compare the entries with the code.
- `src/server/database.ts` around `transaction`, `blockAccount`, `unblockAccount`, `createAccount` (lines 255–326, 440–485), to compare the new units with the block and unblock writes.
- `grep` for `user_version` and `schema version` across `src`, `scripts`, `deploy` and `tests`, to see whether another file reads the version as 4 (none besides those the spec lists; `tests/startup.test.mjs:99`-type cases read 99).
- `the author's rule file on writing scripts`, read before writing the mutation script (it lives under the scratchpad, outside the repository).

## Unread material

- `guidelines/testing.md` lines 373–469 were read after the first page (whole file read).
- `tests/account-storage.test.mjs`: I read the whole diff of the range and the new cases in full; I did not read whole the unchanged regions the executor also left unread (about lines 1302–2527 of the new file), only the diff's own context and the final lines of the run.
- `tests/account-backup.test.mjs` and `tests/deploy/test_account_backup_stream.py`: the diff hunks only.
- `foundation-entries-report.md`: not read.
- The decisions D-07, D-114, D-137, D-205, D-206, D-209, D-229 named in the handoff's *Read*: not read whole by me; I read D-104, D-112 and D-210 whole through their current text and D-393 to D-396, which carry the claims the code is judged against, and the spec's passages the handoff copies.
- `task.md` and `spec.md` as files: not opened; I used the passages copied in the handoff.

## Searches not found or unclear

- None not found. Unclear: the handoff says the foundation entries are "reviewed" in this range; I compared them with the code only where the database acts (D-112, D-210, D-393, D-394, D-396, the invariants of schema and slot) and did not review their wording as such.
