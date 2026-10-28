PASS 81cb7c6cf1b565aac0b24c053073db5247e7c4fb

# Review of the whole change — task `blokada-konta`

- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md` (review of the whole change).
- Range: `6540e4c..81cb7c6`; `git rev-parse HEAD` in the worktree is `81cb7c6cf1b5…`, the head given.
- Commits: `ed9da63` (pin), `ac56f8f` (code and tests), `02c2264` (deploy skill), `e069f69`
  (foundation), `81cb7c6` (guidelines). One author without a plan, so there were no slices and no
  slice reviews; this is the only review the change gets.
- Read: the handoff, the frozen task whole, the spec whole, the author's report, the diff and log of
  the range, and the head files `src/server/database.ts`, `src/server/account-routes.ts`,
  `src/server/account-block.ts`, `src/server/session-store.ts`, `src/browser/account-api.ts`.

Counts: blocking 0, Minor 3, out of scope 0 (Declined to judge below lists 6 lines).

## Findings

### Critical

None.

### Important

None.

### Minor

1. **`tests/http.test.mjs`, test "a block committed while the password is checked refuses that
   login as blocked and clears no failure" (the `waitFor(() => f.policy.inFlight === 1, …)` line).**
   What is wrong: the test relies on the password check lasting longer than one 5 ms poll of
   `waitFor`. If Argon2 verification finishes inside a single poll, `inFlight` goes back to 0
   before the poll sees 1, `waitFor` times out and the test fails.
   Why it matters: it can only fail without cause (a false red). It cannot pass by mistake: by the
   time `inFlight === 1` is seen, `admitLogin` and the synchronous `findAccountByEmail` have already
   run in the same turn, and mutation M6 below shows the test catches the fault it names. The
   existing disconnected-login test waits the same way, and the author's report names this risk.
   Evidence: `src/server/account-routes.ts:282`–`:298` (admission, then a synchronous read, then
   `await verifyPassword`); the author's report, § Choices made, "Re-read after the password check".

2. **`.claude/skills/loop2-deploy/SKILL.md:146` (and its byte-identical copy in `.agents/`),
   "What it prints. One line."** What is wrong: a usage error prints two lines, the usage line and
   then "Nothing changed." (`src/server/account-block.ts:35`–`:38`). Every outcome and every other
   refusal prints one line.
   Why it matters: almost nothing. The owner gets more text than the skill promises, never less,
   and the exit code is as listed. Evidence: scratch run, check 9 below (`block p@example.test
   extra` prints two lines and exits 2).

3. **No committed test of the migration through the application's own start.**
   What is wrong: the changed `account-schema-lifecycle` now says opening "moves an existing older
   known schema to the current version in one transaction … before readiness". The committed
   migration tests (`tests/account-storage.test.mjs`, "a version-1 database opens as version 2 …"
   and "a failing migration step leaves a version-1 database at version 1 …") open
   `AccountDatabase` directly. The startup test (`tests/startup.test.mjs:320`ff.) only checks that
   an unknown schema (99) is refused.
   Why it matters: little today. The started application opens its database only through this
   constructor (`openAccountRuntime`), so no separate path could skip the migration, and the
   author's own-work check ran it once through `openAccountRuntime` and `createApp` with an old
   cookie. `guidelines/coding-database-access.md` itself says the control at this layer "nie
   dowodzi startu aplikacji". A smoke case would protect against a later start-up path that opens
   the database some other way.

## Against the task

| Item | Met by | Evidence |
|---|---|---|
| To do 1: owner blocks by address, told blocked or no such address | `src/server/account-block.ts`; `AccountDatabase.blockAccount` | command tests in `tests/account-storage.test.mjs`; scratch run, check 9 |
| To do 2: unblock; sessions ended by the block do not come back | `unblockAccount` clears the flag only; `blockAccount` deletes the rows | "blocking deletes every session … unblocking brings none back"; the HTTP test "… also after unblocking" |
| To do 3: every session ended in every browser; JSON 401 as with no session | deletion in the same transaction as the flag; write guard in `saveSession`; `sessionAccount` refuses a blocked account | HTTP test with two browsers plus a row inserted past the guard; mutations M1 and M2 |
| To do 4: „To konto jest zablokowane.” only after the correct password; wrong password gets the common message | `account-routes.ts:296`–`:318`; `account-blocked` in the client's list | HTTP login test; client test row; mutation M8 (block revealed before the password check fails two tests) |
| To do 5: v1 becomes v2 keeping every account and session | `schemaSteps`, `initializeSchema` | migration and failing-step tests on a v1 database written by hand from `6540e4c`'s schema (I compared it with `git show 6540e4c:src/server/database.ts`: identical) |
| To do 6: skill, copy, troubleshooting sentence and rollback consequence | `02c2264` | `cmp` of both copies: identical; `test_loop2_deploy_skill.py` OK |
| To do 7: testing table rows, test marked `blocked-account-access`, seen failing | `guidelines/testing.md:149`–`:150`, `:167`, `:190`–`:194` | two HTTP tests carry `// invariant: blocked-account-access`; the author's failing runs; my mutations M2, M5, M8 fail them |
| To do 8: forward-migration rule in `database-access` | `guidelines/coding-database-access.md:23`–`:35`, `:46`–`:53` | read whole |
| Settlement row 1 → D-129; row 2 → `unblock-restores-no-session`; row 3 → D-131 plus the change to D-100; row 4 → glossary *blocked account* | `e069f69` | read each entry whole |
| Projected D-130, `blocked-account-access`, `player-server-session` | `e069f69` | compared with `definicja_mvp_loop2.md` (see reach 1): binding sentences, Based on, Verification, Rationale and Rejected match word for word; the definition's TODO fields (Scope, Relations, Part, Derives from, Method) are filled in; `player-server-session` gains *Rests on* `node-sqlite-database` (the definition has `none`), a link to an existing fact that the binding sentence does not change |
| The four *Questions carried to cycle* | spec Decisions 1–4, implemented as written | see the code read above |
| Acceptance criterion (manual journey on the server) | not in the commits; it is the human's, after deployment (D-75, D-12) | unverified, see Checks not run |

Trust boundary (`src/server/**`). Input I checked:
- Login body and cookie: handling is unchanged.
- Block revealed by address alone: it is not. The blocked refusal comes only after `verifyPassword`, for both known and unknown addresses (M8).
- Stored values read back: `readAccount` refuses a `blocked` value other than 0/1, and the column has a `CHECK`.
- `user_version`: refused when negative, not an integer, or above the current version.
- Session write: the guard and the insert are one statement, `INSERT … SELECT … WHERE NOT EXISTS … ON CONFLICT`. The `WHERE` also resolves SQLite's parsing ambiguity for an upsert on a `SELECT`.
- Renewal: `touch` → `renewSession` stays update-only, so a request that read its session just before a block cannot write it back (`app.ts`: `resave: false`, `rolling: true`).
- Command arguments: exactly two, the address normalised by `normalizeEmail`, a missing file refused before opening, no hash, session identifier or SQLite detail in any output. Each refusal case is checked by test and by scratch run 9.

Irreversible operation (the first migration of `loop2_accounts`). The change only prepares it:
- The range touches no `deploy/`, `.github/`, `compose.yaml` or `Dockerfile` (diff stat).
- Every migration test runs on temporary files.
- The skill states that only the human runs the command (D-12), and states the rollback consequence (exit 8, no step back, no copy).
- Nothing in the range runs on the server.

Pin move `ed9da63`:
- It changes only the gitlink of `.the-way`, `574a37b` → `3aee7d9`.
- `3aee7d9` is `origin/foundations` in the submodule.
- `git -C .the-way rev-parse HEAD` matches `git ls-files --stage -- .the-way`.
- `KEEP` from `install.py` means byte-identical files (`installation/install.py`, `file_action`).

The author's own-work check names the right weak point: old accounts and sessions working through the running application. Their scratch check (a v1 WAL database with a real hash and a session in express-session's form, opened through `openAccountRuntime`/`createApp`, with the old cookie and the old password) would have caught that requirement unmet. Minor 3 is about it staying a one-off check.

Foundation against the code:
- D-112, as changed, says what `database.ts` does.
- D-129 and D-131 say what the command and the login route do.
- D-100's narrowed sentence matches `invalidCredentials`.
- The changed invariant tests named in the request should be: "schema reopen preserves accounts and sessions and rejects a newer version without rewriting it" (`account-database-schema`, which now writes version 3 instead of 2 because version 2 became known; spec *Constraints* gives the reason); the logout test, which now cites `player-server-session`; the row added to the client's refusal test (`account-client-outcomes`).

## Declined to judge

- Refusing save requests of a blocked account: task 16 (task, *Out of scope*).
- The steps of the manual acceptance journey in the request text and the human's deployment: the orchestrator's and the human's, not commits of this range.
- D-130 *Relations: none* and the later links from task 16, D-101 overlapping D-130, the old row's word „zablokowany” in `guidelines/testing.md`: answered by the orchestrator (handoff, § "The orchestrator's answers").
- Unthrottled repeats of a blocked account's correct password: chosen and costed in D-131 and spec Decision 3, not a defect of the change.
- The content of the-way's commits `574a37b..3aee7d9`: the-way's own change. Here I checked only the gitlink move and the installer's result.
- Whether the guideline edits went through `the-way-maintain-testing-guidelines` / `the-way-maintain-coding-guidelines`: the process isn't visible in the commits. I judged the resulting text.

## Checks run

All test runs were in a separate worktree of `81cb7c6` (scratchpad, `node_modules` linked from the reviewed worktree). It has been removed, and the reviewed worktree's `git status` is clean.

| # | Command / method | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/account-storage.test.mjs` | 0 | 29 tests, 29 pass |
| 2 | `npm test -- tests/http.test.mjs` | 0 | 25 tests, 25 pass |
| 3 | `npm test -- tests/account-api.test.mjs` | 0 | 9 pass |
| 4 | `npm test -- tests/startup.test.mjs` | 0 | 12 pass |
| 5 | `npm test -- tests/transport.test.mjs` | 0 | 7 pass |
| 6 | `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| 7 | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read-only) | 0 | 0 errors |
| 8 | `cmp` of both skill copies and both troubleshooting copies | 0 | identical |
| 9 | Scratch run of `node dist/server/account-block.js` on a temporary database (Node v24.17.0) | — | `block ' P@Example.TEST '` → "Blocked p@example.test: …", exit 0; `unblock` → exit 0; path to a directory → exit 3; extra argument → two lines, exit 2; `a@b@c` → exit 2; no other file left beside the database |
| M1 | write guard replaced by `WHERE ? IS NOT NULL`, then check 1 | 1 | "a session write for a blocked account stores nothing …" fails |
| M2 | `sessionAccount` returns the account whatever its state, then check 2 | 1 | "no session of a blocked account authorizes …" fails |
| M5 | blocked login settled by `fail()`, then check 2 | 1 | the two blocked-login tests fail |
| M6 | blocked login settled by `succeed()`, then check 2 | 1 | the two blocked-login tests fail |
| M8 | blocked refusal given right after the account read, before the password check, then check 2 | 1 | the two blocked-login tests fail |

Each mutation was restored with `git checkout --` before the next one.

Checks not run:
- `npm test` without arguments: the orchestrator's run (handoff).
- `tests/deploy/test_account_storage.py`: needs Docker. It is the container-replacement case of `account-schema-lifecycle` and does not touch migration.
- `tests/quality/test_quality_invariants.py` (repository-wide ESLint, Prettier, Ruff, ShellCheck): not run. The author ran ESLint, Prettier and the type check on the changed files; I did not repeat them.
- The manual journey on the test server: the human's after deployment (D-75, D-12). The agent never reaches the server.

## Reaches beyond the dispatch

1. `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, lines 205–225, 385–428, 1700–1720 and 1812–1840: the full approved text of D-130, `blocked-account-access` and `player-server-session`, plus the projected decision "Which library maintains player sessions?" (D-107). I used it to check the fidelity of the projected entries and of the D-107 / `player-opaque-session-cookie` links. The handoff allows this search.
2. `foundations/decisions.md`: D-100, D-109 and D-112 read whole, and the heading lines of D-101 and D-107. These are decisions of the touched parts and are named in the task's *Decisions in play*.
3. `foundations/part_map.md`: the entries of browser-view, account-server, build-tools, agent-workflow, product-foundation and deployment. I needed them to name the touched parts and the trust boundary.
4. Guidelines read whole for the touched parts:
   - `guidelines/coding.md`
   - `guidelines/coding-database-access.md`
   - `guidelines/coding-http-application.md`
   - `guidelines/coding-browser-api-client.md`
   - `guidelines/coding-session-store.md`
   - `guidelines/testing.md`
   - `src/browser/AGENTS.md` (named by `AGENTS.md` for `src/browser/`).

   `guidelines/styleguide-browser-view.md` was not read: no screen file changed, and the new message uses the existing warning state of the login form (`src/browser/view/account-screen.ts:186`).
5. Product files outside the diff, each read to check an effect of the change:
   - `src/server/account-policy.ts`: `normalizeEmail`, and what the ticket's `release`, `fail` and `succeed` do.
   - `src/server/app.ts`: the session options.
   - `src/browser/view/app.ts:13` and `src/browser/view/account-screen.ts:170`–`:200`.
   - `Dockerfile`, `compose.yaml`, `package.json`, `tsconfig.server.json`, `scripts/test.py`.
   - `.claude/skills/loop2-deploy/SKILL.md` (exit-code table) and `references/setup_and_secrets.md` § "Deploying a request head and accepting it".
   - `tests/deploy/test_account_storage.py:100`–`:135` and `tests/startup.test.mjs:315`–`:345`.
6. the-way: `product-guidelines/reading.md`; `elements/common/way_of_working.md` § "Reading the foundation"; `elements/glossary/template.md` (form of an entry); `elements/decisions/template.md` (fields); `installation/install.py` (meaning of `KEEP`). I needed these for the selection rules and the entry and installer forms.
