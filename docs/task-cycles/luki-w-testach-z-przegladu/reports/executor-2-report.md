# Report of executor 2 — the account database's schema rule in one invariant

**Status:** done

## Commits (base 60bd5bab1cedef554e63199d2d6e195893e4e979)

- `5e01ea8d` docs: fold account-schema-lifecycle into account-database-schema, which now also names the emailed links and the refusal before readiness, and withdraw the first with the second as its successor — `foundations/invariants.md` (+2 −11)
- `c90b3211` test: cite account-database-schema alone in the nine cases of the account storage tests that cited account-schema-lifecycle — `tests/account-storage.test.mjs` (+4 −9)

`git status --short` is empty. `git status --short -- src` shows nothing; no product code is in either commit.

## Foundation entries (written by following `elements/invariants/skill/SKILL.md`, as `foundation_step.md` gives)

Marked `row 12` (To do 12 of the task, F-30).

- `account-database-schema`, changed in place (identifier kept; the sentence took in the clauses of the withdrawn one).
  - English: opening an account database initializes the current schema, moves an older known one to it atomically with every account (privilege included), session, emailed link, saved game state and previous save and their values kept, preserves them on reopen, and refuses an unknown newer schema before readiness without changing its version or records.
  - Polish: otwarcie bazy kont zakłada aktualny schemat, przenosi starszy znany schemat atomowo ze wszystkimi kontami (z uprawnieniem), sesjami, linkami z maili, zapisami gry i poprzednimi zapisami wraz z wartościami, zachowuje je przy ponownym otwarciu i odmawia nieznanego nowszego schematu przed gotowością, nie zmieniając jego wersji ani rekordów.
  - Wording on `{fork-point}` beside the new: "...session, saved game state and previous save and their values kept, ... and rejects an unknown newer schema without changing its version or records." New: adds "emailed link" and replaces "rejects" with "refuses ... before readiness". Fields *Method* `test`, *Rests on* `node-sqlite-database`, *Derives from* `D-112`, *Part* `account-server`, *Violated* `no` unchanged.
  - Tests that cite it, each checked against the new wording: the nine cases of `tests/account-storage.test.mjs` (version 1 to 5 moves keep accounts, sessions, links, saved game states, previous saves; the failing-step cases leave the older database as it was; the reopen case refuses version 7 without rewriting it) and, by slice 1, the case "configured startup refuses unknown schema and unavailable database before readiness" in `tests/startup.test.mjs:535` (version 99 refused, stderr names `LOOP2_DATABASE_PATH`, `user_version` still 99).
- `account-schema-lifecycle`, withdrawn: row added to *Withdrawn identifiers* (after `account-save-backup`) with *Why* and *Successors* `account-database-schema`.
  - English: its three clauses stand in `account-database-schema`, so the identifier is withdrawn with that one as successor. Polish: jego trzy zdania stoją w `account-database-schema`, więc identyfikator jest wycofany z tym następcą.
- D-112's *Verification* already lacked `account-schema-lifecycle` (checked at `foundations/decisions.md:2739`: "invariants: account-database-schema · account-session-storage · ..."); no change to the decision.

## Checks (command and exit code)

| Check | Exit | Result |
|---|---|---|
| `npm.cmd test -- tests/account-storage.test.mjs` (final, at HEAD) | 0 | 87 pass, 0 fail |
| `npm.cmd test -- tests/startup.test.mjs` | 0 | 18 pass, 0 fail |
| `git grep -n "account-schema-lifecycle" -- tests src` | 1 | no match |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors (before the test edit: 9 errors, each `account-schema-lifecycle` is withdrawn, as expected) |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 5 errors, only the uncited: `player-self-registration` (invariants.md:612), `player-password-login` (:622), `email-verification-nonblocking` (:632), `loop2-shared-public-origin` (:712), `sprite-credits` (:1292) — the ones Slices 3 and 4 cite |
| `git status --short -- src` | 0 | empty |

The full product gate, `npm.cmd test` without a file, was not run (the orchestrator's alone).

## Newly cited cases seen failing (the four cases that cited only `account-schema-lifecycle` and now cite `account-database-schema`)

`src/server/database.ts` was changed for a moment and restored with `git checkout -- src/server/database.ts` after each run (`git diff -- src` empty, `git status --short -- src` empty); the test file at that moment held the new citations. Command each time: `npm.cmd test -- tests/account-storage.test.mjs`.

**Break 1** — a failed migration is committed instead of rolled back: in `transaction`, `this.connection.exec("ROLLBACK")` changed to `this.connection.exec("COMMIT")`. Exit 1, 81 pass, 6 fail. Red among them:

- `tests/account-storage.test.mjs:722` "a failing step 5 leaves a version-4 database at version 4 with its rows, columns and tables unchanged" — `AssertionError: Expected values to be strictly deep-equal` on the column list of `accounts` (the privilege column step 5 added stays).
- `:947` "a step 6 that fails after step 5 has run rolls step 5 back too, and leaves a version-4 database as it was" — the same assertion on the column list.
- `:1093` "a failing step 4 also takes back step 3 on a version-2 database, which stays at version 2 unchanged" — `AssertionError` on the table names, `+ 'emailed_links'` left over from step 3.

**Break 2** — a migration step that deletes the emailed links, with the failed step committed: break 1 plus `DELETE FROM emailed_links;` put first in step 6 (a migration step that drops the emailed links, which a correct rollback would take back). Exit 1, 77 pass, 10 fail. Red among them:

- `:885` "a failing step 6 leaves a version-5 database at version 5 with its rows, columns and tables unchanged" — `AssertionError: Expected values to be strictly deep-equal` on `storedVersionThreeRows` (the links list lost its rows).
- The cases that already cited the invariant beside it and keep the citation went red too, showing the break catches emailed links lost on a move: "a version-3 database opens as version 6 ...", "a version-4 ...", "a version-5 ...".

Why a second break for `:885`: step 6 is one statement, so a failed step 6 on a version-5 database changes nothing even with a commit in place of the rollback (the case's own comment says so); only a step that changes something before it fails can show the case red. Break 1 alone did not turn `:885` red; Break 2 did.

## Own-work check (section 3)

Requirement most likely unmet: the slice and To do 12 want the withdrawn invariant's whole sense to survive in `account-database-schema`, including "emailed links kept with their values on a move" and "refused before readiness". Check: the cases that carry the links are the version 3, 4 and 5 moves (they compare the stored link rows to `versionThreeLinks` before and after), shown red by Break 2 deleting the links; the start refusing an unknown schema before readiness is the case in `tests/startup.test.mjs:535`, which passes (`npm.cmd test -- tests/startup.test.mjs`, exit 0). The sentence's "refuses ... before readiness" is therefore tested by the start case only; the storage cases test the refusal without a start.

## Choices

- `Part` of `account-database-schema` kept as `account-server`; the withdrawn entry named `account-server · deployment`. Rejected: adding `deployment` — no file of `deploy/**` holds the opening of the database, so no change there can make the sentence false (the template's *Part* rule); cost if wrong: a change to the deployment's scripts would not read the invariant. Worth a look of the reviewer.
- *Why* of the withdrawn row says it was merged because the two sentences said the same about one rule of D-112; it names clauses, not the history of tasks.
- Break 1 and 2 as above; chosen so each of the four newly cited cases fails for a rollback that does not hold, the one behaviour they exist for.

## Reaches beyond the handoff

- `.the-way/elements/invariants/skill/decide_entry.md`, `draft.md`, `write.md`, `template.md`, `elements/common/way_of_working.md`, `elements/common/rules.md`, `elements/invariants/examples.md`: named by the `SKILL.md` of the element and the `foundation_step.md`, read as its steps came.
- `tests/startup.test.mjs:525-565` (the case slice 1 cites), `foundations/glossary.md` searched for "readiness" (no entry): to check "before readiness" has a test and no glossary term to honour.
- `a file in the author's home directory` rule files the hooks served (`scripts.md`, `git.md`): read.
- `git grep` for `account-schema-lifecycle` over the whole repository outside `.runs`: only `foundations/invariants.md` and `tests/account-storage.test.mjs` held it.

## Working copies

None beyond my output files in `.runs/executor-2/` (test outputs of the green runs and the two breaks); removed before return.

## Problems observed

- `guidelines/testing.md` lines 154-179 list `previous-save-slot`, `account-session-storage` etc. but not `account-database-schema`; not part of this slice, no finding.
- The full `foundation_check.py` still reports the five uncited invariants above; expected for slices 3 and 4.

**Unread material:** none (`foundations/environment_facts.md:366-370`, `foundations/part_map.md:64-89`, D-112 whole, `src/server/database.ts` lines 1-400 of the file, which hold the schema steps, `transaction` and `initializeSchema`; the rest of the file is the account, session and link operations the slice does not touch. `guidelines/testing.md` and `guidelines/coding.md` read whole.)

**Searches not found or unclear:** none
