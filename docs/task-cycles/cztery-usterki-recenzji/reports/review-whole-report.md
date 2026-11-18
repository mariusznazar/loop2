FAIL b76678a7766a49940567952cc008592898dd0731

# Review of the whole change — cztery-usterki-recenzji

Range `be8eea82..b76678a7` (4 commits: `48c0d52c`, `5c23a3d0`, `a6388cdb`, `b76678a7`), worktree
`the root of the task's worktree`, `git rev-parse HEAD` =
`b76678a7766a49940567952cc008592898dd0731`; `.the-way` at the pinned
`bfb2e109735b5fff98802b8be0ff3c43c799262a`. The route had no plan and no slices, so every
finding comes from the one author's commits, named per finding.

Counts: blocking 2 (Important, both within the task); Minor 4 (3 within the task, 1 outside it);
out of scope 1.

## Findings

### Important

**I-1. "Only the server sets up a new database" is false: the role command and the previous-save command still set one up in an empty file.** Within the task (row 1 of *Settlements to record*); the task's own wording of row 1 and of question 1's answer asks for the sentence, so this is a defect the task mandates.

- Places: `foundations/decisions.md:2800` (D-112, new third paragraph, first sentence), `foundations/decisions.md:2810` (D-112 *Rationale*, added sentence "Only the server sets up a new database, because …"), `.claude/skills/loop2-deploy/SKILL.md:554-555` and the same lines of `.agents/skills/loop2-deploy/SKILL.md` ("only the server sets a new one up"), `src/server/database.ts:211` (comment of `existingOnly`). Commits `b76678a7`, `a6388cdb`, `48c0d52c`.
- What is wrong: `src/server/account-role.ts:66` and `src/server/account-previous-save.ts:69` still open `new AccountDatabase(path)` without `existingOnly`, so each of them sets up the tables of a new database in an empty file or a foreign SQLite file. The entry states the rule for the whole product; the code holds it for two of the four operator commands. D-112's first paragraph still says all four commands open "under the same rules", which the third paragraph now contradicts for two of them without naming the other two.
- Why it matters: WAY-263 — a foundation entry the change writes restates the rule more broadly than the code does. A reader of D-112 (or of the skill) takes it that no operator command can turn a wrong file into an empty account database, and the role and privilege commands still do, reporting "Nothing changed." while they do it.
- Evidence: scratch run at head (`dist` built from `b76678a7` in a worktree of my directory): a 0-byte file given to `node dist/server/account-role.js owner a@example.test` ended with exit 4 and `No account has the address a@example.test. Nothing changed.`, and the file was then 65 536 bytes long (an account database). Concern 1 of the author's report says the same; D-430's last sentence of *Rationale* names the two commands as left out, but D-112 does not.
- Fix, either: (a) qualify the sentences — e.g. "Of the operator's commands, the blocking command of D-137 and the backup command of D-231 never set up a new database: …; the commands of D-400 and D-410 still set one up in a file that holds none" — in D-112's third paragraph and rationale, in the comment at `database.ts:211` and in both skill copies; or (b) give the two other commands `existingOnly` and the same refusal, which goes beyond points 2-3 of *To do* (the orchestrator's follow-up task). (a) fits the task's scope.

**I-2. D-112's *Rejected* says the message already tells a wrong path from a wrong file; the code prints the same sentence for both.** Within the task (row 1, question 1).

- Places: `foundations/decisions.md:2811` (D-112 *Rejected*, added "a new exit code for a file that is no account database — one code more in the skill that tells a wrong path from a wrong file, which the message already says and nothing reads automatically"); `src/server/account-block.ts:36-37` and `src/server/account-backup.ts:44-45`, `noDatabaseSentence`, used both for a missing file and for a file the server never set up. Commits `b76678a7` and `48c0d52c`.
- What is wrong: the operator who gives the command an existing empty or foreign file reads `LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.` — the same words as for a path where no file exists, so the message does not say which of the two it was. The task's question 1 rejected a separate code 5 on the ground that "tę różnicę i tak mówi komunikat"; the author's choice 3 dropped the separate sentence, so the reason recorded for rejecting code 5 no longer holds in the code. The task required one code (3), not one sentence.
- Why it matters: WAY-263/WAY-364 — the content of an entry the change writes disagrees with the code; and the operator, seeing "names no existing … file" for a file that plainly exists, is sent to look for a wrong path.
- Evidence: the two constants above; my probe of a foreign SQLite file in each command (`reports/review-whole-probe-wal.txt`) shows the stderr `LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.` / `… Nothing was written.`, identical to the missing-file sentence.
- Fix, either: (a) a second sentence for exit 3 that names the case, e.g. "LOOP2_DATABASE_PATH names a file that holds no account database. Nothing changed." (and "Nothing was written." for the backup), with the tests at `tests/account-storage.test.mjs:3403` and `tests/account-backup.test.mjs:445` asserting it and the skill's exit-3 clause naming it — this keeps the task's reasoning true; or (b) reword the *Rejected* clause to what the code does. (a) is what the task's settled answer presupposes.

### Minor

**M-1. D-153's *Rationale* still points to "the clause of *Verification* that names both message types", which the change removed.** Within the task (point 7). `foundations/decisions.md:3269`, last sentence of *Rationale* ("The clause of *Verification* that names both message types is checked by no test: the delivery to an external mailbox is a person's check (D-163)"). The new *Verification* (`decisions.md:3263-3266`) names no message type: its compare-list is about the card's „Nie pamiętam hasła” and a setting that turns recovery off. Commit `b76678a7`. Fix: say what is checked by no test directly, e.g. "That both message types reach an external mailbox is checked by no test: a person checks it (D-163)."

**M-2. D-153 keeps two environment facts in *Based on* whose content its text no longer uses.** Within the task (point 7). `foundations/decisions.md:3261` lists `loop2-app-log-password-reset-mail-events` and `loop2-app-log-confirmation-mail-events` (`foundations/environment_facts.md:888`, `:894`); the new *Rationale* replaced the whole passage that cited them (the log events `link-issued`/`message-sent` and no `"failure":"mail"` line), although point 7 removed only the sentence that no entry shows arrival. Nothing invented; the source fidelity of the new text holds (every fact stands in point 7: the Gmail mailbox, both messages arrived and their links worked, the quotation word for word, 2026-11-14 with loop2#153 item 1, the reset date unknown, „włączamy” of 2026-11-18; the cross-reference to D-163 agrees with D-163). Fix: either one sentence back that the log shows the application handed both kinds of message to the mail service without a failure (what the two facts hold), or the two facts out of *Based on*.

**M-3. The local start's readiness rests on the built-in channel `net.server.socket` of `node:diagnostics_channel`, which Node documents as experimental, and no entry records that risk.** Within the task (point 4). `scripts/local-start.mjs:243-248` (`watchConnectionsTo`), D-431 *Rationale* (`foundations/decisions.md`, new D-431). A Node release that renames or drops the channel makes every `npm run local` fail after 30 s with `SERVER_NOT_READY` — loud, and `tests/invariants/test_local_start_access.py` would show it at once (22 cases ran green on Node 24.17.0). D-229 records the same kind of risk for `node:sqlite`. Fix: one "Risk taken" sentence in D-431's *Rationale*. I did not check the Node documentation myself (see Searches).

**M-4. `guidelines/coding-database-access.md:26` names only the read of the version in the transaction of initialization.** Outside the task's *To do* (no point asks for a guideline change; the rule stays true). The change adds a second rule of D-112 — the version read, and a newer schema refused, before the journal mode changes, and `existingOnly` for the operator's commands — that the guideline of the exemplar file does not carry, so a later change of `database.ts` reading only the guideline could move the read back after `PRAGMA journal_mode = WAL`; the test "opening a database of an unknown newer schema refuses it and leaves the file as it was, its journal mode included" would catch that. Fix: one sentence through `the-way-maintain-coding-guidelines`, in the return step or a later task.

### Out of scope

**O-1.** `account-previous-save` and `account-role` keep the old behaviour (an empty or foreign file set up as a new database; "run the command again" for every database failure: `src/server/account-role.ts:76`, `src/server/account-previous-save.ts:79`). Outside the task (points 2-3 name the blocking and backup commands; handoff point 3); the orchestrator lists a follow-up task. Its effect on the foundation text is I-1.

## Declined to judge

- Whether a damaged file whose first page (header) is damaged should be exit 1 rather than exit 3: SQLite reports it as `SQLITE_NOTADB` (26), the same as a file that is no SQLite database, so the commands refuse it with exit 3. The task's question 2 names "plik uszkodzony" as exit 1, and the tests take a damaged file with a valid first page (errcode 11), which ends with exit 1. A file with a damaged header cannot be told from a non-SQLite file by SQLite; I set it aside as beyond what the task can settle.
- The hot-journal case: a rollback-mode file with a hot journal is rolled back by the first read, a write before any refusal. Pre-existing behaviour of any SQLite reader; not touched by the change.

## Against the task

- Point 1: `.claude/skills/loop2-deploy/SKILL.md:561-563` (both copies identical, `diff -r` clean) now says a correct password of a blocked account does not count towards the limit and a wrong one counts as for any account. Matches D-139 (read whole), D-102 (read whole), D-100 (read whole) and the code: `src/server/account-routes.ts:891-893` (`!verified` → `ticket.fail()`, for a blocked account too, since the block is read only after a correct password) and `:906-909` (`account.blocked` → `ticket.release()`). The task's line numbers 810-828 are of `6ab6a32b`; at head the login lies at 860-914.
- Point 2: met for the blocking and backup commands (tests and my probe); the general sentence is I-1.
- Point 3: met; both commands advise a second run only on `isDatabaseBusy` (SQLite 5), tests for busy, newer schema and damaged file in each command.
- Point 4: met; the new case fails on base (`'Local game:' unexpectedly found …`, exit 1) and passes on head; the whole file passes on head.
- Point 5: met; `readSchemaVersion` runs before `enableWriteAheadLog`, and again inside `initializeSchema`'s transaction (D-112, *Context* last bullet). A newer-schema file already in WAL mode is left with the same bytes, no side file and mode `wal` after either command (probe). Author's concern 6 (side files of a WAL file) does not show after the command ends: SQLite removes them at close.
- Point 6: met in both copies (`SKILL.md:545-563`, `references/backup_and_restore.md:60`), apart from I-1's clause and I-2's sentence.
- Point 7: met (D-153 binding sentence "Public self-service account recovery is enabled."; the sentence that no entry shows arrival is gone; no setting turns recovery off: routes `/api/password-reset-message` and `/api/password-reset` registered unconditionally, `account-card.tsx:355` and `:480` unconditional); M-1, M-2.
- Row 1: D-112 and D-231 written; I-1, I-2. Row 2: D-430, binding the two commands, as the row says. Row 3: D-431. Row 4: the task names `account-schema-lifecycle`, which `foundations/invariants.md:1436` lists as withdrawn and merged into `account-database-schema`; the author changed `account-database-schema` (`invariants.md:770`) to "refuses an unknown newer schema before readiness, leaving the file as it was, its version, records and journal mode included", and the new test case is marked with it. That fulfils row 4: the clause lives in that invariant now.
- D-231's extension: the edit keeps the quoted text of the two older `decision:` lines valid (`foundation_check.py` 0 errors).

## Trust boundaries (handoff step 4)

Crafted input at `src/server/**` and `scripts/local-start.mjs`, each checked at head:

| Input | Blocking command | Backup command | Evidence |
|---|---|---|---|
| empty file | exit 3, bytes and directory listing unchanged | exit 3, same, temp dir empty, stdout empty | tests (storage, backup) |
| not SQLite | exit 3, unchanged | exit 3, unchanged | tests |
| foreign SQLite, version 0, rollback mode | exit 3, unchanged | exit 3, unchanged | tests and probe |
| foreign SQLite, version 0, WAL mode | exit 3, same bytes, no side file, mode `wal` | same | probe |
| damaged SQLite (valid first page) | exit 1, no advice, JSON line kind/code/errcode 11 only | same | tests |
| newer schema, rollback mode | exit 1, no advice, bytes and mode `delete` unchanged | same | tests and probe |
| newer schema, WAL mode | exit 1, no advice, same bytes, no side file, mode `wal` | same | probe |
| locked (write lock held past the timeout) | exit 1, advice to run again | same | tests |
| port taken by another program (local start) | — | — | start ends with the server's `server-listen`/`EADDRINUSE` line, exit 1, no `Local game:`, no proxy left | test, seen failing on base |

No path, file name or SQLite message reaches standard error or output in any of these (tests assert no `secret-name`, `not a database`, `malformed`; the probe's stderr holds only the fixed sentences and the JSON kind/code/place). The exit-3 refusal writes no JSON failure line, like the missing file before it: an expected refusal, not a failure (coding guideline "Recording a failure").

Irreversible operation: none. The change changes code and text only; no command of the change writes into a file it refuses (bytes and listings compared above).

Reserved choice: none. `node:diagnostics_channel` and `node:events` are built-in modules of the Node release the product already runs; no language, framework, library, store, login or place to run is settled (`.the-way/project-level/technology/reserved_choices.md` read).

## Tests the author changed

- `tests/account-backup.test.mjs` "a damaged database and a temporary directory that cannot be made …" and "a failed backup adds the error's kind and code …", and `tests/account-storage.test.mjs` "a database failure of the operator's command adds the error's kind and code …": the failing database became a damaged one (errcode 11) instead of a non-SQLite file (errcode 26), because point 2 turns the latter into an exit-3 refusal. Every other assertion stays (exit 1, empty stdout, kind, code, place, no file name, no SQLite message); the non-SQLite file is covered by the new exit-3 cases, which keep the "no `not a database`" assertion. The block case's regex changed from `/Nothing changed; run the command again\./` to `/Nothing changed\./`, which excludes the advice (the period must follow "changed"). Not weakened; source: task point 2 and D-112.
- Changed invariant tests: `account-database-schema` gains the case "opening a database of an unknown newer schema refuses it and leaves the file as it was, its journal mode included" (`tests/account-storage.test.mjs`); `tests/invariants/test_local_start_access.py` (file of `local-start-access`) gains a case marked by D-431 only, not by the invariant, as `guidelines/testing.md` says ("D-431; bez niezmiennika").
- Tests not run by the author and not run by me: `tests/deploy/test_account_backup_stream.py` (runs the backup in a container whose server set up the database — unaffected), `tests/invariants/test_account_save_sqlite_upgrade.py` (`account-database-check` opens its own temporary databases without `existingOnly` — unaffected), `tests/deploy/test_loop2_backup.py` (stand-in `docker`; quotes D-231 text the edit kept). Read, not run; the orchestrator's gate runs them.

## Guidelines

- `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md` read whole. The commands keep no SQL and no SQLite number (`SQLITE_NOTADB` and the busy test live in `database.ts`); errors are read by kind, code and errcode only; `writeFailure` keeps the cause. M-4.
- `guidelines/testing.md` (changed): the change appends D-112, D-430, D-431 to the *Decision* list of `### Trust boundaries` and extends the rows `src/server/` and `scripts/local-start.mjs`; the rule keeps the form of `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/testing/template.md` (required rules in order, *Decision*/*Invariant* lines, the boundary table). The new rows describe what the tests do.

## Structure of the code the change leaves

- `python -B .the-way/task-cycle/change_file_sizes.py be8eea82 b76678a7` (reviewed worktree) → exit 0: `src/server/database.ts` 942 → 998, `scripts/local-start.mjs` 469 → 496, `account-backup.ts` 131 → 144, `account-block.ts` 98 → 107, `tests/account-storage.test.mjs` 3612 → 3891, `tests/account-backup.test.mjs` 571 → 674.
- `node tests/quality/eslint-size-rules.mjs` (the script the invariant test of `### Size of a function and a file` runs) in a worktree of the base and of the head → exit 0 both; the same four places over a threshold in both (`kitchen-sink.tsx`, `startApp`, `createProgramsEntry`, `build`), none in a changed file. The change pushed nothing over a threshold.
- No code left without a user: `acceptsConnections` removed with its one caller; `isBusy` renamed `isDatabaseBusy` and exported for its two new users. Names: `existingFile` and `exitNoDatabase` still say what they do.

## Author's own-work check

The requirement it names — "refused and nothing written in it" — is where the change was weakest (the journal-mode write came first). Its tests compare bytes and the directory listing, for both commands and the database layer; my probe added the WAL-mode cases, which hold. It would not have caught I-1 or I-2: both are about text the change wrote, not about the two commands.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` (reviewed worktree) | 0 | `b76678a7…` |
| `git -C .the-way rev-parse HEAD` / `git ls-files --stage -- .the-way` | 0 | both `bfb2e109…` |
| `python -B .the-way/task-cycle/change_file_sizes.py be8eea82 b76678a7` (reviewed worktree) | 0 | sizes above |
| `node tests/quality/eslint-size-rules.mjs` (worktree of base) | 0 | 4 places |
| `node tests/quality/eslint-size-rules.mjs` (worktree of head) | 0 | the same 4 places |
| `node scripts/build.mjs` (worktree of head) | 0 | built |
| `node --test tests/account-storage.test.mjs` (head) | 0 | 92 pass |
| `node --test tests/account-backup.test.mjs` (head) | 0 | 12 pass |
| `node --test tests/startup.test.mjs tests/account-database-check.test.mjs tests/account-owner.test.mjs` (head) | 0 | 39 pass |
| `python -B -m unittest test_local_start_access.LocalStart.test_a_port_another_program_took_ends_the_start_with_the_servers_failure_and_no_address` (head, `tests/invariants`) | 0 | 1 test OK |
| the same case with the head's test file against the base's code (worktree of base) | 1 | `'Local game:' unexpectedly found …` — the case fails on the fault |
| `python -B -m unittest test_local_start_access` (head, `tests/invariants`) | 0 | 22 tests OK, 181 s |
| `node probe-wal.mjs <head> <dir>` (scratch probe, `reports/review-whole-probe-wal.mjs`, output `reports/review-whole-probe-wal.txt`) | 0 | 8 runs: foreign/newer × rollback/WAL × block/backup, table above |
| `node dist/server/account-role.js owner a@example.test` on a 0-byte file (head) | 4 | file became 65 536 bytes — I-1 |
| `npx prettier --check` on the 4 changed sources and 2 changed test files (head) | 0 | |
| `npx eslint` on the same files (head) | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read-only) | 0 | 0 errors |

Not run: the full gate `npm test` (the orchestrator's); `python -B .the-way/instruction-files/check_instructions.py` (the gate runs it; the author reports 0 errors); `tests/deploy/test_account_backup_stream.py` and `tests/invariants/test_account_save_sqlite_upgrade.py` (need Docker and an image build, read instead); `tests/deploy/test_loop2_backup.py` and `tests/agent_workflow/test_loop2_deploy_skill.py` (read / author-run; the gate runs them).

## Reaches beyond the dispatch

- `src/server/account-routes.ts:860-915` — the login, for point 1 (the task's 810-828 are of an older commit).
- `src/server/account-role.ts`, `src/server/account-previous-save.ts` (grep, and one run of the built role command) — for I-1.
- `foundations/environment_facts.md:888-899` — the two facts D-153 is based on, for M-2.
- `.the-way/project-level/technology/reserved_choices.md`, `.the-way/product-guidelines/template.md` and `testing/template.md` (the rule for trust boundaries) — as the method names them.
- `tests/deploy/test_account_backup_stream.py:40-105`, grep of `tests/deploy/test_loop2_backup.py`, `tests/invariants/test_account_save_sqlite_upgrade.py`, `src/server/account-database-check.ts` — handoff gap 8.
- `src/browser/view/account-card.tsx` (grep) — the switch search of point 7.

## Working copies

- Worktrees of `be8eea82` and `b76678a7` at `.runs\review-whole\base` and `…\review-whole\head`, each with a junction `node_modules` to the reviewed worktree's `node_modules`: the junctions removed first (link only), then `git worktree remove --force` for both and `git worktree prune`; removed.
- The decision index, the sizes output, the extracted entries, the probe script and its scratch databases, the role probe, and the test outputs, all under `…\.runs\review-whole\`: removed; the directory is empty.
- Kept beside this report: `reports/review-whole-probe-wal.mjs` and `reports/review-whole-probe-wal.txt`, the evidence of the WAL-mode cases.
- The reviewed worktree: no tracked file, index or branch changed (`git status --short` empty); its ignored `dist/` (the author's build) untouched.

## Unread material

Decisions of the index of my selection read whole: 14 — D-112, D-137, D-139, D-153, D-163, D-102, D-100, D-231, D-255, D-354, D-114, D-229, D-430, D-431. The index (`decision_index.py` with the sections "The gate, test tools and the local start", "Database backup and restore", "Account server: access, security and blocked accounts", "Account email and password reset", "The server: hosting, deployment, logs and failure reports", the parts account-server, build-tools, agent-workflow, product-foundation, deployment, and the decisions the task, the handoff and the changed tests name) listed 89 in full and 66 by heading; I ran through the 66 headings and opened D-114 and D-229 from them.

Decisions that bear on the change and stayed unread whole (binding sentences read in the index): D-160, D-228, D-236, D-405 (handoff gap 1; none bears on what the change does beyond its binding sentence); D-400 and D-410 (their commands are the subject of I-1; their binding sentences suffice for it); D-252, D-253, D-233 (cited by the changed tests' `decision:` lines; binding sentences only); D-256 (local start, binding sentence only).

Invariants: of the 86 whose *Part* names a touched part or `every`, all 86 read by their sentence; read whole: `account-database-schema`, `local-start-access`, `account-startup-configuration`, `account-save-backup-encrypted`, `account-server-occupied-address`. The other 81 read by sentence only.

Guidelines: `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md` read whole; no other kind file matched (the two commands are no kind of the index; `database.ts` is `database-access`). The part map's entries of the five touched parts read. Glossary: not read — the change adds no term and uses none in a new meaning that I met.

## Searches not found or unclear

- The invariant `account-schema-lifecycle` named by row 4: not an entry; `foundations/invariants.md:1436` lists it as withdrawn, merged into `account-database-schema`.
- The Node 24 documentation of the stability of the built-in channel `net.server.socket`: not checked (no web read); M-3 rests on the handoff's and the author's statement that it is experimental.
- The task's lines `account-routes.ts:810-828` (state at `6ab6a32b`): moved; at head the login lies at 860-914, found by `ticket.fail()`/`ticket.release()`.
- The skill sentence of point 1 at "419-420": at head `SKILL.md:561-563`, found by text.
