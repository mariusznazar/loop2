# Handoff — slice 3, reviewer

You are the reviewer of slice 3, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `d946a58bf5d71da001f9919b9b16331c31b4699a` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-3-reviewer-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 3 — The operator command that grants and revokes the privilege

- **Goal:** `src/server/account-previous-save.ts` exists and is the second operator command, built by the pattern of `src/server/account-block.ts` (read it) from decision 5 of the spec. It is run in the container as `node dist/server/account-previous-save.js grant <email>` and `... revoke <email>`; it names the account by its address normalized as at login; it opens the existing database named by `LOOP2_DATABASE_PATH` beside the running server with the server's own opening rules, makes one change through the privilege write of slice 1, closes the database, installs its own last-resort handler under its own name, and of a database error reports only its kind and code through `writeFailure`, the failure line named `account-previous-save` and its place `account-previous-save.change`. Exit codes as the block command's: 0 the account is in the state asked for, 1 the database could not be opened or changed, 2 wrong arguments (the usage line and "Nothing changed."), 3 no database file, 4 no account has that address; every non-zero exit changes nothing. Its sentences say, in the manner of the block command's, that the privilege was granted or revoked, that the account already held it or already did not hold it ("nothing changed"), and that no account has the address ("nothing changed"). A change writes one JSON event line with the account's identifier, named `account-previous-save-granted` or `account-previous-save-revoked`, so that the filter of the skill for lines appended to the log file lets it pass; no change writes none. It ends no session and stops no link. The sentence for the operator is no log line (D-354). `guidelines/coding.md` names the command beside `account-block` and `account-backup` in *Recording a failure* and lists the two events in *Logging scope*. Tests, written first, go in `tests/account-storage.test.mjs` beside the tests of the block command: the command grants and revokes by address beside an open connection and says which outcome it reached, with the exit code of each; one event with the account's number for a change and none for no change, and no address in it; a database failure adds the error's kind and code and nothing of its text; what no code of the command handled ends it with one line of its kind, code and place; it changes nothing on a usage error, an unknown address or an unusable database and creates no file; a block, a session or a link is left as it was.
- **Change:** `src/server/account-previous-save.ts` · `tests/account-storage.test.mjs` · `guidelines/coding.md`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:138-147` 5. The operator command · `foundations/decisions.md:2177-2191` D-112 · `foundations/decisions.md:2870-2889` D-137 · `foundations/decisions.md:8926-8951` D-354 · `foundations/decisions.md:8952-8966` D-355 · `foundations/invariants.md:858-867` blocked-account-access · `foundations/part_map.md:62-82` account-server · E4 · E7 · E8 · E10 · E22 · E23 · `guidelines/coding-database-access.md` · `src/server/account-block.ts` · `src/server/log-line.ts` · `src/server/database.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (a command that changes the accounts' data)
- **Checks:** `npm test -- tests/account-storage.test.mjs` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 1 · Slice 2 (both change `guidelines/coding.md`) · E4 · E7 · E8 · E10 · E22 · E23

## Passages of the task, the spec and the plan the *Read* names, copied word for word

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 6-10 — Words used and Intent

Words used below. The **previous save** is the one saved game state the server holds beside the account's current one (the task's "poprzedni zapis"). The **privilege** is the account's flag set by the operator command (the task's "uprawnienie"). The **current save** is today's `saved_games` row. The **schema version** (the database's `user_version`) and `SAVED_GAME_VERSION` (the version of the shape of a saved game state) are two different numbers that both read 5 after this change: the change adds schema step 5 and leaves `SAVED_GAME_VERSION` at 5, because no type of the game state changes.

## Intent

A player whose saved game state is replaced by a newer shape of the game, or who resets the game for a test, no longer loses the programs: the server keeps the replaced document as the previous save, and an account that holds the privilege can append the programs of that document to the list of its present game, and can start the game from zero. Everything else about D-206 stays: the game loads whole only a document of its current version.

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 30-41 — Constraints

## Constraints

- **The task**, every sentence. In particular: the previous save has the 64 KiB limit of the saved game state; the privilege covers pull and reset together; the button shows only for a privileged account with a previous save; a reset moves the current save to the previous slot, the game starts anew, and a card open before the reset gets the refusal as today (D-209, which the task keeps unchanged: "Bez zmiany"); D-213 is unchanged too; the server computes nothing of the game (D-07).
- **Reading of the task's point 1.** "The save that replaced an accepted save of a higher version" is read as: the stored save that an accepted save of a higher version replaces moves to the previous slot (the task's line under D-210: "przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis"); the reset moves the stored current save. The other reading (the incoming save is stored as previous) contradicts point 5 and the task's D-210 line.
- **D-07, D-210.** The server reads nothing inside the game. It copies the stored text; it compares the version numbers only.
- **D-104, D-109, trust boundary.** `src/server/**` and `src/browser/sim/saved-game.ts` are trust boundaries. Every state-changing route passes the guards of `mutationGuards` (exact Origin, JSON, body limit); input is an object of expected fields with explicit checks; a session alone names the account; no field of a request names an account.
- **D-112 and the schema rule.** One step per version, a step that reached the test server is never edited (steps 1–4 stay), a step is additive and keeps every row; transactions hold no asynchronous work. Block, version, revision and now the privilege are read in the transaction that writes.
- **D-213, D-386 and the kind guideline `guidelines/coding-saved-game.md` stay as they are** and govern `saved-game.ts` and the load only. The reader of this change is a new simulation file outside that kind (decision 4); it keeps the same discipline by the spec's own words: it takes `unknown`, throws for no value a document can hold, changes nothing passed to it, shares nothing with it, reads no clock, imports only simulation files; an error of its own code is not a skip and propagates.
- **D-137, D-354.** The operator's sentence is not a log line; a command that touches the accounts' data installs its own last resort; only a human runs it.
- **Invariants that this change touches** (listed under Foundation entries): `save-version`, `account-client-outcomes`, `account-session-authorization`, `player-save-isolation`, `account-mutation-request-guards`, `account-schema-lifecycle`, `account-database-schema`.
- **Code as it stands.** `writeSavedGame` in `src/server/database.ts` already reads block, stored version and stored revision in one transaction, in the order blocked, outdated, conflict; the page builds a game from a refused load with `revision` equal to the stored revision, so the first save of a new game after a version bump is accepted on its basis and is the save that moves the old one. `readAccount` validates every column of `accounts`.
- **Deployment.** The first deployment of the change moves the persistent database of the test server to schema version 5; from then on `main` before this change fails health with exit 8 (the same property of every earlier schema step, as the skill states for versions 2 to 4). A trial deployment of the branch before the merge has the same effect on `main`'s deployments. This is the human's decision at deployment, not the change's.

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 138-147 — 5. The operator command

### 5. The operator command

- **File and name** by the pattern of `src/server/account-block.ts`: `src/server/account-previous-save.ts`, run as `docker exec loop2 node dist/server/account-previous-save.js grant <email>` and `... revoke <email>`.
- **Same mechanics as the block command:** the address is named as at login (`normalizeEmail`); it opens the existing database named by `LOOP2_DATABASE_PATH` beside the running server with the server's own opening rules; makes one change in one transaction; closes it; `installLastResort` with its own name; of a database error only kind and code, through `writeFailure` (the failure line is a JSON line, the sentence beside it is not a log line, D-354); the same exit codes: 0 the account is in the state asked for, 1 the database could not be opened or changed, 2 wrong arguments, 3 no database file, 4 no account has that address, and every non-zero exit changes nothing.
- **Sentences** of the command say, in the manner of the block command's: that the privilege was granted, or revoked; that the account already held it, or already did not hold it ("nothing changed"); that no account has the address ("nothing changed"). Wrong arguments print the usage line and "Nothing changed."
- **Events:** a change writes one JSON event line with the account's identifier, named `account-previous-save-granted` and `account-previous-save-revoked` so that the skill's existing filter for the lines appended to `/var/log/loop2-app.log` (events beginning with `account-`) lets them pass; the failure line carries `account-previous-save` as its name.
- **What it does not do:** it ends no session and stops no link (unlike the block); a page already open keeps the flag it was given until it reloads, but the server decides at each request (the reset reads the privilege in its transaction, the fetch at request time).
- **The `loop2-deploy` skill**, both byte-identical copies (`.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`, which a test compares), gains a section for this command as "Blocking a player account" describes the block: only the human runs it; the plain commands; the way to keep the event lines in the dump file with the filter and its tag; what each of grant and revoke does and does not do; what it prints and the exit codes; what it touches. Two passages that the new appended lines make false are edited in the same pass: "The `account-block` lines, which the human appends to the same file ... Nothing else reaches it." (`SKILL.md` lines 265-266, in "Seeing deployments") and "the human's `account-block` lines" in the paragraph on how an agent reads the file (line 280), which must name the lines of the new command too. Its rollback paragraph and `references/troubleshooting.md` (the paragraph "A database newer than the code", and the account-related lines of `SKILL.md` around 249 and 453) say that the current code writes schema version 5, what step 5 adds, and that code that knows only version 4 or older refuses the database, as they say for versions 2 to 4.

Ways considered: one command with both block and privilege actions — rejected, the block command's file and its documented usage line are an interface the skill and tests name; a flag in a configuration list of addresses — rejected by the task. Price if wrong: a rename of one file and its skill section.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:2177-2191` D-112
- `foundations/decisions.md:2870-2889` D-137
- `foundations/decisions.md:8945-8970` D-354
- `foundations/decisions.md:8971-8985` D-355
- `foundations/invariants.md:858-867` blocked-account-access
- `foundations/part_map.md` — the entry `account-server` (find it by its heading `## account-server`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E4: `foundations/decisions.md:2177-2191` D-112
- E7: `foundations/decisions.md:8945-8970` D-354
- E8: `foundations/decisions.md:8971-8985` D-355
- E10: `foundations/decisions.md:9650-9664` D-394
- E22: `foundations/glossary.md:260-265` previous-save privilege
- E23: `foundations/part_map.md`, the entry `account-server` by its heading
- E23: `foundations/part_map.md`, the entry `simulation` by its heading

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding-database-access.md`
- `src/server/account-block.ts`
- `src/server/log-line.ts`
- `src/server/database.ts`

## What you review

- Review, read-only, the slice 3 range `41d80c2e..d946a58b` with `review-change`, the executor's report `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-3-executor-report.md`. Return `PASS d946a58b` or `FAIL d946a58b` as the first line of your report, graded findings, and the checks you ran.
- Trust boundary: yes — a command of `src/server/**` that changes the accounts' data. Check: the address named as at login (normalized) and nothing else read from the command line; that every non-zero exit changes nothing and creates no file; the exit codes 0 to 4 as the block command's; that the sentence for the operator is no log line (D-354) while the event lines carry the account's identifier and no address; that the failure line holds the error's kind and code and nothing of its text; that a grant or revoke ends no session and stops no link; that the command opens the existing database with the server's own opening rules and does not run the schema upgrade on a database of another version in a way the block command does not.
- Gap carried to you: the executor read `src/server/database.ts` only in the parts the command uses and did not read `src/server/account-policy.ts` (`normalizeEmail`); read what your judgment needs. The executor chose English for the operator's sentences to match the block command; judge it against `src/server/account-block.ts` and the existing tests of that command.
- Slice 2's reviewer and slice 1's reviewer left Minor findings for the whole-change review; they are outside this range.
- Run the focused checks yourself where your judgment needs them (`npm test -- tests/account-storage.test.mjs`, `npm run typecheck`); the orchestrator runs the gate. Mutants of `src/server/account-previous-save.ts` in a scratch copy are welcome; name what you did not run.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
