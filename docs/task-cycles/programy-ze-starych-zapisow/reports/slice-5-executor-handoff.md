# Handoff — slice 5, executor

You are the executor of slice 5 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `b3db0acf120d5019adbe48ffb4237de8fc810a67` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-5-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 5 — The browser client: the privilege, the previous save and the reset

- **Goal:** `src/browser/account-api.ts` speaks the two new routes and reads the new field, and the page's account keeps it. From decision 1 and decision 7 of the spec, in the manner the client's guideline gives: `Account` gains the boolean `previousSaveAllowed`, which the client requires as it requires `emailConfirmed` (a body without it, or with a non-boolean, is an unexpected answer, for the account, the login and the registration alike); `refusalCodes` gains `previous-save-forbidden`; the client gains `loadPreviousSavedGame()`, a GET answered 200 whose body has exactly the key `previous`, either `null` or an object with exactly `version` (a positive safe integer) and `game` (an object, handed on unread), returned as `null` or as the document, every other status, shape or time-out a typed failure; and `resetSavedGame()`, a POST with the empty-object body whose only success is 204, in the manner of the logout. The client keeps no state and follows no redirect. `src/browser/view/account-card.tsx` copies the new field where it rebuilds the account it hands on. Tests, the failing ones first, in `tests/account-api.test.mjs` on the real local HTTP server of that file: the fixtures of account bodies gain the field and a body missing it or holding a non-boolean is refused as unexpected; each outcome of the two new requests (success, `null`, malformed body, extra key, wrong status, 401, 403 with the new code, 409/5xx without a known code, timeout, a failed connection) and that the requests go to the relative paths with the method and body the routes take; the marker of E14 stands on the cases of the account.
- **Change:** `src/browser/account-api.ts` · `src/browser/view/account-card.tsx` · `tests/account-api.test.mjs`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:45-72` 1. The HTTP contract · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `foundations/decisions.md:2123-2135` D-109 · `foundations/decisions.md:2237-2251` D-117 · `foundations/decisions.md:3922-3954` D-204 · `foundations/decisions.md:4096-4139` D-209 · `foundations/invariants.md:808-817` account-client-requests · `foundations/invariants.md:818-827` account-client-outcomes · `foundations/invariants.md:1018-1027` saved-state-http-exchange · `foundations/part_map.md:3-28` browser-view · E10 · E12 · E14 · E22 · `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/server/account-routes.ts` · `tests/view/account-screen.test.mjs:289-347` the held client and the account fixtures
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` (no change of that file is expected) · `npm test -- tests/view/menu-bar.test.mjs` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 2 · E10 · E12 · E14 · E22

## Passages of the task, the spec and the plan the *Read* names, copied word for word

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 45-72 — 1. The HTTP contract

### 1. The HTTP contract

Two new routes and one new field. Both routes sit in the router's `paths` table, so they carry `Cache-Control: no-store`, the transport check and the 503 of a server without accounts like every account route.

**`GET /api/previous-saved-game`** — the previous save of the session's account.

- Checks, in this order: the transport check of the router; the session (no session, a blocked account: 401 `unauthenticated`, as `GET /api/saved-game`); the privilege of the account read at that moment (without it: 403 with the code `previous-save-forbidden`, whatever the slot holds, so the answer tells nothing of the slot); then the read.
- Answer 200, JSON, built as the answer of `GET /api/saved-game` is, the stored text embedded as it is: one key `previous`, holding either `null` (the account has none) or an object with exactly `version` (the stored version) and `game` (the stored game). No revision is sent: the browser does not need it. A `null` is a success of its own, never a 404, for the reason D-204 gives (an unmatched `/api/` request is a 404 too).
- No input: no body, and the query string is read by nothing.
- The answer is at most the stored document (64 KiB, D-104) and a few bytes of envelope.

**`POST /api/saved-game-reset`** — moves the current save to the previous slot and leaves the account with no current save.

- Checks, in this order: the transport check; the guards of D-104 with the 16 KiB limit of the small routes (Origin, JSON, compressed bodies refused, a non-object refused); the body is an object with no field (any field: 400 `invalid-request`, as the logout route); the session (401 `unauthenticated`); then one database write that, in its own transaction, reads the block (blocked: 401, as a save of a blocked account), then the privilege (without it: 403 `previous-save-forbidden`), then does the move.
- Answer 204 with no body when the move was made and also when the account had no current save (nothing to move: nothing changes, the previous slot stays as it is). The browser needs no difference between the two.
- The business event `saved-game-reset` with the account's identifier is logged when a current save moved.

**The account answer** — `GET /api/account`, the login and the registration answers all carry the account's body; it gains one boolean, `previousSaveAllowed`, the privilege. It carries nothing of the slot, so it leaks nothing about it. The browser reads it with the rest of the account when it names the account, and shows no control and sends no request for the previous save when it is false.

Ways considered:

- *Fold the previous save into the existing route* (`GET /api/saved-game?previous=...`, `DELETE /api/saved-game` for the reset). Rejected: the route that builds the game would hold a mode that serves another document, one parameter away from the document the game is loaded and overwritten from; `DELETE` stands outside the guards written for `POST`/`PUT` and carries no JSON body for the check of the media type.
- *One status route for everybody* answering the privilege and the existence of a previous save. Rejected: every account would ask it on every Programs screen, and a non-privileged account would get a success from a route that holds a privileged function.
- *The privilege learnt from a failing request* (403 on the first `GET`). Rejected by the task ("so the button shows without a failing request").
- *404 or an empty success for an account without the privilege.* A 404 reads as a missing route (D-05, D-204). An empty success answers a non-privileged account the same as a privileged one without a slot; it also leaks nothing, but then the reset, which cannot answer "done" when it moved nothing because of the missing privilege, would still have to be a 403, and two routes would refuse in two ways. One refusal, 403 with its code, for both.
- *The existence of the slot as a second boolean of the account answer.* Rejected: it goes stale at once (the slot appears at the first save after a bump, in a page that is already open) and the account answer is read once per page load.

Price if wrong: before the first deployment, the contract is cheap to change. After it, the only user is the operator's own account; the cost is a page and a route changed together in one deployment (the client and the server always deploy together; an old tab only ignores the new field).

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 166-176 — 7. Units and their interfaces

### 7. Units and their interfaces

- `src/server/database.ts` — adds the schema step, the privilege to `Account`, the previous-save reader, the reset write, the privilege write, and the move inside the save write. Depends on nothing new. Used by the routes and the command.
- `src/server/account-routes.ts` — adds the two paths and handlers and the field of the account body. Depends on the database class and `mutationGuards`.
- `src/server/account-previous-save.ts` — the operator command. Depends on `database.ts`, `account-policy.ts` (`normalizeEmail`), `log-line.ts`.
- `src/browser/account-api.ts` — adds `previousSaveAllowed` to `Account` (a boolean the client requires, as it requires `emailConfirmed`), the refusal code `previous-save-forbidden` to `refusalCodes`, `loadPreviousSavedGame()` returning the result of a document or `null` read with the exact keys `previous`, `version`, `game` as `loadSavedGame` reads its answer, and `resetSavedGame()` as a 204 request with the empty-object body. Keeps no state.
- `src/browser/sim/previous-programs.ts` — new; the reader of decision 4. Depends on `programs.ts` (`checkProgram`, `ProgramCheckError`) and `SAVED_GAME_VERSION` from `saved-game.ts` as a value to compare, or a constant of its own that a test ties to it (the maker's choice; the file may not import anything outside the simulation).
- `src/browser/sim/programs.ts` — adds the append with numbering of names. Depends on nothing new.
- The view (`program-list.tsx` or the program screen's page code, `game-view.ts`, `app.ts`) — the pull button and its states, the reset control with its confirmation, the page's flow of the reset and the new game, the sentences. Depends on the client and the two simulation functions above. `game-saver.ts` is not changed for the reset.
- The skill and its references — the section and the paragraphs of decision 5.
- **Existing tests that read the schema version as 4 and must change with step 5** (verified in the code at the base commit): `tests/account-storage.test.mjs` lines 185-189 (version 5 as the first unknown one: becomes 6), 323, 347, 451, 487, 594, 639 (the current version after a move) and 1289-1290 (the assertion "no schema step is added", which the change makes false), with their titles and comments that say "version 4" (lines 318, 320, 444, 587); `tests/account-backup.test.mjs` line 281; `tests/deploy/test_account_backup_stream.py` line 90 (a test of the deployment part). The tests that read other versions (lines 215, 365, 508, 674, 705 and the 99 of `tests/startup.test.mjs`) stay.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:2123-2135` D-109
- `foundations/decisions.md:2237-2251` D-117
- `foundations/decisions.md:3922-3954` D-204
- `foundations/decisions.md:4106-4149` D-209
- `foundations/invariants.md:808-817` account-client-requests
- `foundations/invariants.md:818-827` account-client-outcomes
- `foundations/invariants.md:1018-1027` saved-state-http-exchange
- `foundations/part_map.md` — the entry `browser-view` (find it by its heading `## browser-view`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E10: `foundations/decisions.md:9650-9664` D-394
- E12: `foundations/decisions.md:9680-9694` D-396
- E14: `foundations/invariants.md:818-827` account-client-outcomes
- E22: `foundations/glossary.md:260-265` previous-save privilege

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-browser-api-client.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/server/account-routes.ts`
- `tests/view/account-screen.test.mjs:289-347` the held client and the account fixtures`

## What slices 1 and 2 left

The server answers are committed (`41d80c2e`): read `src/server/account-routes.ts` for the real routes, statuses, codes and body shapes of `GET /api/previous-saved-game`, `POST /api/saved-game-reset` and the account body's `previousSaveAllowed`, and use them; the spec's names were proposals. This slice has no review of its own (Risk none); the review of the whole change judges it, so check your code against the routes yourself and say in the report which behaviour you verified against which line.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
