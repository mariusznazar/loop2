FAIL 55e3b8e83a5875cbf3de161411f2ae2b71e2f1f4

# Review 1 — "panel właściciela", slice 1 and the foundation entries, range `b1904c5b..55e3b8e8`

`git rev-parse HEAD` is `55e3b8e83a5875cbf3de161411f2ae2b71e2f1f4`, the head given. Range read as `git log` (four commits: `f1733cf9`, `1d833c7e`, `efac1226`, `55e3b8e8`) and `git diff b1904c5b..55e3b8e8`, whole.

Counts: 1 blocking (Important), 3 Minor in scope, 1 Minor out of scope.

## Findings

### Important (blocking, within the task)

**I1. `tests/account-storage.test.mjs` is not in Prettier's layout, so the gate's `test_prettier_source_format` fails.**
- Where: `tests/account-storage.test.mjs:827-830`, `:880-883`, `:927`, `:929-937` (the new version-5 test and the new failing-step-6 test).
- What is wrong: lines the slice adds break Prettier's layout (one `rows(...)` call split across lines that Prettier keeps on one; a `"SELECT … ORDER BY id"` literal of 90 columns left on the call's line; an `assert.deepEqual(rows(...), [ … ])` whose first argument overruns the line). `guidelines/coding.md`, rule *Formatter* (invariant `prettier-source-format`), requires every TS/JS file of the part to be in the layout Prettier leaves, with no option added.
- Why it matters: the invariant has a test and the test fails; the one command (`npm test`) cannot pass, so the change cannot merge. The base file was clean, so the slice introduced it.
- Evidence: `npx prettier --check src/server/database.ts tests/account-storage.test.mjs tests/account-backup.test.mjs tests/startup.test.mjs` exits 1 and names only `tests/account-storage.test.mjs`; `git show b1904c5b:tests/account-storage.test.mjs` checked with Prettier on its own is clean; `npm test -- tests/quality/test_quality_invariants.py` fails `test_prettier_source_format` with the same file named. `npx prettier tests/account-storage.test.mjs | diff` shows exactly the regions above. The executor's checks (the plan's *Checks* list) do not include the formatter, which is why it passed unseen; the plan's list is the plan's gap, the file's layout is the change's defect.

### Minor (in scope)

**M1. Two behaviours of the new column are protected by no test: the database's `CHECK` and the read's refusal of an unknown stored role.**
- Where: `src/server/database.ts:168` (`CHECK (role IN ('player', 'owner'))`) and `:360` (`(row.role !== "player" && row.role !== "owner")` in `readAccount`).
- What: the plan's Goal says the column holds `player` and `owner` and "the read of a stored account refuses an unknown role value like it refuses any other unknown stored value". No test writes an unknown role or reads one back. Removing the `CHECK` from step 6 leaves every test green (no test inserts a third value), and removing the line at `:360` leaves the tests green too (TypeScript would then refuse `role: row.role` at `:372`, so that second mutation is caught by `npm run typecheck`, not by a test).
- Why it matters: `role` becomes the authorization gate of slices 2 to 4; a stored value read as anything other than the two words must stay refused. This is the trust-boundary item of the handoff ("an unknown stored value").
- Evidence: the executor's report says the read branch cannot be reached without removing the constraint. It can: a scratch run against the built `dist/server/database.js` made an account, showed `UPDATE accounts SET role='admin'` refused with `CHECK constraint failed: role IN ('player', 'owner')`, then with `PRAGMA ignore_check_constraints = ON` stored `'admin'` and `findAccountByEmail` threw `Invalid stored account`. A test of that shape is eight lines. The other unknown-value checks of `readAccount` have no test either (grep for `Invalid stored account` in `tests/` finds none), so this follows existing practice; I grade it Minor for that reason and because the typechecker holds the read branch.

**M2. The failing-step-6 test cannot tell a rolled-back step from a step that failed before changing anything.**
- Where: `tests/account-storage.test.mjs:887-939`.
- What: step 6 is one `ALTER TABLE` statement, which SQLite applies whole or not at all, so the test's injected failure (a `role` column already there) leaves the database as it was whether or not the surrounding transaction rolls back; it proves that `user_version` is not advanced and that nothing else was touched, not the rollback. The step-5 test has a two-statement step and does prove it. The code is right (`initializeSchema` runs every step in `this.transaction`, `src/server/database.ts:296-315`, unchanged); only the proof is weaker than its title.
- Why it matters: low; a later step added after this one cannot lean on this test for the rollback of a multi-statement step, and the title says "rows, columns and tables unchanged", which is what it checks.

**M3. D-410 cites D-12 in its text and omits it from *Relations*.**
- Where: `foundations/decisions.md` D-410 (`:10894-10910`): the first paragraph says the command is one "which only a human runs on the server (D-12)", and the *Relations* line is `derives from D-109 · D-112 · D-137 · D-202`.
- Why it matters: a reader following *Relations* does not reach the decision that bounds who runs the command. D-137 has `derives from D-12`, and D-410's own rationale rests on the same reasoning. The entry's content agrees with the code; this is a departure from the template's form only (WAY-364).

### Minor (out of scope — the plan's and the later slices')

**O1. The two copies of `references/troubleshooting.md` of the `loop2-deploy` skill will say the current schema version is 5.**
- Where: `.claude/skills/loop2-deploy/references/troubleshooting.md:116-120,136-147` and the same lines of `.agents/skills/loop2-deploy/references/troubleshooting.md` ("The current code writes schema version 5 … moves it to version 5 …").
- Slice 11 of the plan says "No file under `references/` changes" and adds only a paragraph on version 6 to `SKILL.md`'s "Rollback". After this slice the sentence "the current code writes schema version 5" is false, in a file an agent reads when a start is refused. Not this slice's change (the skill is slice 11's), and a gap in the plan, so it is for slice 11's section or the review of the whole change.

## Declined to judge

- D-109's wording that the refusal of a session without the role comes "after the session and before the body is read" against D-104's guards (Origin, content type, size) that already read the request's headers and may parse the body in middleware: the routes do not exist yet (slice 4's review judges the order on the real code).
- D-408's "its position on the menu bar" against a screen with none: named in the handoff for slice 9.
- About 70 older lines of `foundations/decisions.md` (a count of `owner` in the file is 117, 48 of them without "owner role" or "owner panel"), the code comment `src/server/database.ts:502` ("a block committed by the owner's command"), `src/server/account-backup.ts:9`, the titles "the owner's command …" in `tests/account-storage.test.mjs`, and the skills `loop2-deploy` and `loop2-play`, use "owner" for the human who runs the server, now that the glossary term `owner` names the role: not graded, as the handoff asks; named here. The two foundation agent's choice (rewrite only in lines it edited, propose a separate rename) is consistent: D-137, D-400 and D-252 changed in place to "operator".
- The invariants `account-schema-lifecycle` and `account-database-schema` say "keeping its accounts with the previous-save privilege of each" and do not name the role; they are unchanged and still true (the version-5 test now also shows the role on every kept account). Whether they should name it is for the invariant's owner, outside the task's table of settlements.
- The `tests:` clauses of D-112, D-137, D-400, D-410, D-411 name tests that later slices write: by design of the cycle (the foundation step writes the end state), `foundation_check.py` exits 0.
- A1 (the role as the fourth field of each list entry) departs from the frozen task's "nic więcej o koncie" in its literal reading; it is a recorded choice that binds the change, and the screen needs the role to leave out „Zablokuj” as the task's item 5 demands, so I did not raise it. D-411 states the reason in its rationale.

## Judgement against the task and the foundation

**Slice 1 against the task (To do 1) and the plan's Goal.** Done as given:
- One step at the end of `schemaSteps` (`src/server/database.ts:163-169`); the diff shows no line of an earlier step changed (`git diff … -- src/server/database.ts` removes two lines: the `const account = {` of `createAccount`, now typed `Account`, and the last condition's trailing `)`).
- It runs inside `initializeSchema`'s one `BEGIN IMMEDIATE` transaction with the others; `currentVersion` is `schemaSteps.length`, so 6.
- `ADD COLUMN role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'owner'))`: default and `CHECK` both present; the `INSERT` of `createAccount` does not name the column, so a new row gets the default from the database (the test reads it back after a reopen).
- `Account.role` (`AccountRole`), `createAccount` returns `"player"`, `readAccount` refuses any other stored value (`:360`).
- No other method changed: the diff of `database.ts` is 19 added and 2 removed lines, all above. `account-block.ts` and `account-previous-save.ts` are untouched (not in the range). The response body of the account routes (`accountBody`, `src/server/account-routes.ts:152-159`) names its fields one by one and does not carry `role`; no place spreads an `Account` into a response (`grep` of `...account` finds only `...accountBody(account)`).
- Trust boundary: this slice adds no route, no body and no session read; the only way in is the database's own read, and a role is never read from a session (no session code changed). The crafted-input items of the handoff (no session, a player's session, a blocked account's session, a body naming another account, a stored unknown value) reach the code of slices 2 to 4; for this slice I checked the stored unknown value (M1) and that nothing leaks the role to a response.
- Irreversible operation: none; the step is a deployment-time migration the human's deploy runs; D-112 and D-410 state the accepted cost (a return to an older commit meets a refusal to start).

**The tests.** The version-5 test builds its database from the test's own SQL (`versionFiveDatabase`, chained from the earlier fixtures, not from product code), with a blocked account (`account-c`), a confirmed one (`account-a`), one with the privilege (`account-b`), sessions, emailed links, a saved game and a previous save; it compares every row and value after the move (`storedVersionThreeRows`, the privilege column, the two game tables), then `role` of every account, then the `Account` objects, then a new account after a reopen. The executor's own-work mutation (default `'owner'`) gives 6 failures: I take it as stated, and the default is also caught by the version-5 test's `SELECT DISTINCT role`. The version-above test now writes 7 and its comment says 6 is current. Every title and assertion naming version 5 as the current one names 6 (`grep` of `user_version`/`version 5` in `tests/` finds the step-5 test and fixtures that mean version 5 as an old version, and none left as current; `tests/deploy/test_account_backup_stream.py:92` expects 6).

**The quotation lines.**
- Twelve `// decision:` lines changed by the foundation step: `tests/account-backup.test.mjs` 4, `tests/account-storage.test.mjs` 6, `tests/startup.test.mjs` 2. In the diff of `tests/` every changed `// decision:` line is one of these (D-112 ×4, D-354 ×4, D-253 ×4: changed text only, the role command added to the list, and "current version 5" to "6" in `startup.test.mjs`), plus one added line.
- The executor's claim about `tests/account-storage.test.mjs:795` is a quotation of a sentence as it stands now: it is the new line of the new version-5 test (not a changed line), and it runs from "Accounts have an opaque random primary identifier" (the first words of the sentence in D-112, `foundations/decisions.md:2367`) through "with the value `player` for every account it holds", which is the sentence's own text up to the "and which a new account has as `player` (D-410);" clause. No other `// decision:` line was changed. `foundation_check.py` exits 0 on the head.

**The foundation entries.** Judged against the rows of *Settlements to record* (1–7, 9; row 8 is slice 4's), the *Decisions in play* changes, A1 and the part map's sentence:
- Row 1 (panel blocks and grants; accepted risk): D-137 (paragraph, rationale on the five accounts and the re-judgement when the game opens, *Rejected* regrouped, the panel out of *Rejected*), D-400 (paragraph, "no HTTP route grants" removed from the first part), D-109 (five routes, 401 and 403, role read at each request), D-202. As the task has it.
- Row 2 (role in the database, given by a command): D-410 (role stored, `account-role` command, human runs it, D-12), D-112 (current version 6, one step at the end, role in the account columns, the command's short connection, the role write, the block's transaction reads the role), D-252 (command list; one line, the target's number, no address and no number of the acting owner), D-253 and D-354 (the command in each list; twelve quoting lines).
- Row 3 (commands stay): D-137 and D-400 each say "the command stays beside the panel".
- Row 4 (owners not blocked, privilege to every account): D-137 (409 `owner-not-blockable`, the caller's own included, also where a second connection gave the role just before) and D-400 (any account, an owner's too).
- Row 5 (link in the menu „Konto”, `#/konta`, bar equal for both roles): D-280 and D-281, including the rejected fourth bar item and the accepted cost.
- Row 6 and 7 (list fields; confirmation on „Zablokuj” only): D-411.
- Row 9 (glossary): `owner` in `foundations/glossary.md:272-276`, *Not* "operator"; `blocked account` and `previous-save privilege` name "an owner from the owner panel". The glossary's definition and the code (`AccountRole`) agree.
- Part map: the `account-server` sentence names the role command and the five routes answered "only to a session of an account with the owner role"; *Files* unchanged.
- Read in full: D-112, D-202, D-253, D-354, D-410, D-411, D-137; D-400, D-109, D-252, D-280, D-281 read as their diffs and the paragraphs the diff touches. Each says what the code of slice 1 does where it speaks of slice 1 (version 6; one step at the end; every account a `player`; a new account a `player`; refusal of an unknown newer schema; D-112's `Verification` tests: the version-5 upgrade, the failing step 6, the version above 6 refused, the new account as a player are present). Where they speak of commands, routes and screens that later slices write they are an end state, as designed.
- Entry-form findings only M3. Entries restate one another without conflict that I could find (D-137/D-410 on 409; D-411/D-410 on the role field: D-410 says the three account answers carry the role only for an owner, D-411 the list carries it always, both stated in their own text).

## Checks run

| Check | Command | Exit |
|---|---|---|
| Head | `git rev-parse HEAD` | `55e3b8e83a5875cbf3de161411f2ae2b71e2f1f4` |
| Typecheck | `npm run typecheck` | 0 (`0 errors`) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Storage | `npm test -- tests/account-storage.test.mjs` | 0 (84 pass, 0 fail) |
| Backup | `npm test -- tests/account-backup.test.mjs` | 0 (10 pass) |
| Backup stream | `npm test -- tests/deploy/test_account_backup_stream.py` | 0 (1 test, OK) |
| Startup | `npm test -- tests/startup.test.mjs` | 0 (18 pass) |
| Neighbours of the `Account` shape | `npm test -- tests/account-api.test.mjs`; `npm test -- tests/http.test.mjs` | 0 (32 pass); 0 (95 pass) |
| Prettier on the four changed JS/TS files | `npx prettier --check src/server/database.ts tests/account-storage.test.mjs tests/account-backup.test.mjs tests/startup.test.mjs` | **1** (`tests/account-storage.test.mjs`) — finding I1 |
| Prettier on the base file | `git show b1904c5b:tests/account-storage.test.mjs` copied to my directory, `npx prettier --check` | 0 (base clean) |
| ESLint | `npx eslint src/server/database.ts tests/account-storage.test.mjs` | 0 |
| Quality invariants | `npm test -- tests/quality/test_quality_invariants.py` | 1: `test_prettier_source_format` FAIL (I1); `test_ruff_source_rules` and `test_shellcheck_source_rules` ERROR with `FileNotFoundError` for the tools in this worktree's environment |
| Scratch probe of the stored role | `node` script against the built `dist/server/database.js`: new account is `player`; `UPDATE … role='admin'` refused by the `CHECK`; with `ignore_check_constraints` stored `'admin'` read back refuses `Invalid stored account` | 0 (printed `created player`, `CHECK refuses …`, `read refuses: Invalid stored account`) |

Not run: the full `npm test` (the cycle's own run); `ruff` and `shellcheck` (the tools are not found in this worktree's environment, so the one-line change of `tests/deploy/test_account_backup_stream.py` is unlinted by me — unverified). I made no mutation run of my own on the test files: I read them for what each assertion protects and ran the one scratch probe above; the executor's mutation (default `'owner'`) I did not repeat.

## Reach beyond the handoff

- `foundations/invariants.md:608-617, 758-776` (`player-self-registration`, `account-schema-lifecycle`, `account-database-schema`) and the `Read` entries of slice 1 of the plan — to judge the invariants' wording against the role (they do not name it; see Declined to judge).
- `.runs/task-cycles/panel-wlasciciela/plan.md` slices 3, 11 and *Coverage* (grep and slice 11's text) — to see which slice owns `guidelines/coding.md`'s lists of commands (slice 3), `tests/startup.test.mjs` (the foundation step did it), and the skill's `references/` (slice 11 says none changes: O1).
- `src/server/account-routes.ts:150-160, 838` and a `grep` of `src/server` for places that spread an `Account` — to confirm the role does not leak to a response in this slice.
- `guidelines/coding.md` whole and `guidelines/testing.md` whole (both read whole), `guidelines/coding-database-access.md` whole — named in the handoff's *Read* line.
- `foundations/decisions.md` D-104 `:2191-2215` (a part) — to compare D-109's "before the body is read" with D-104's guards (see Declined to judge).
- `foundations/glossary.md` headings and the entries `blocked account`, `previous-save privilege`, `owner`; `grep` of the glossary for "operator" and "player account".
- `.runs/task-cycles/panel-wlasciciela/reports/executor-1-report.md` and `foundation-report.md` — read whole, as claims to verify.

## Working copies

None kept. I made `.runs/review-1/` in the worktree for a scratch probe script and a copy of the base test file; both were removed and the directory removed before returning (`git status --short` clean afterwards). The scratch run created and removed its database under the system's temporary directory by its own code (a product tool's file, not a working copy). The test runs wrote the usual `dist/` build output in the worktree, which the product's own build does and `.gitignore` keeps out.

## Unread material

- `foundations/decisions.md`: D-400, D-109, D-252, D-280 and D-281 read as their diffs (`git diff -U0 --word-diff`) and the paragraphs around them, not each whole; D-99, D-96, D-97, D-101, D-152, D-156, D-157, D-204, D-231, D-399, D-401, D-402, D-206, D-211, D-160, D-277, D-332 not read (the foundation agent's own left-out list; none bears on what I judged — the changes in this slice and the rows do not touch their text).
- `foundations/invariants.md`: only the three entries named above; the invariants the changed decisions list in *Verification* (blocked-account-access, player-server-session, unblock-restores-no-session, unblock-restores-no-link, player-save-isolation, account-session-authorization, account-mutation-request-guards, account-client-outcomes) not re-read — they bear on slices 2 and 4, and the foundation agent read them.
- `foundations/glossary.md` and `foundations/part_map.md`: the changed entries read whole, the rest not.
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md` read through the passages in the handoff, not the whole file; `plan.md` read in part (slice 1, the slice list's headings and goals of 3 and 11, and *Coverage*), not whole.
- The foundation commits' files other than the three foundation files and the three test files: none in range.

## Searches not found or unclear

- A test of `readAccount`'s refusal of any unknown stored value (`Invalid stored account`, `ignore_check_constraints`, `writable_schema` in `tests/*.mjs`): not found; see M1.
- The handoff names `tests/account-storage.test.mjs:795` as the quotation the executor changed; at the head line 795 is the new test's quotation, which is a line added by the slice, not changed (the report says the same: "the one line I added"). Clear once read so, noted because the handoff's wording says "changed".
- Whether the plan expects a formatter check among a slice's checks: the plan's slice 1 *Checks* list has none, and the guidelines require the formatter rule of every change (I1); unclear whether the orchestrator's own pre-request run (full `npm test`) is meant to be where it is caught.
- `ruff` and `shellcheck` binaries for `test_quality_invariants.py`: not found in this worktree's environment (the `venv_tool` lookup raises `FileNotFoundError`); unclear whether this is how the worktrees on this computer are set up or a missing install.
