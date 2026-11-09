# Planner report — porzadki-z-uwag-pr

- Status: done with concerns
- Plan: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`
- Size report: `.runs/task-cycles/porzadki-z-uwag-pr/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/porzadki-z-uwag-pr/plan.md`, exit 0, all 12 slices `fits` (largest: Slice 10, about 197 400 tokens; most files: Slice 12, 8)
- Method: `.the-way/task-cycle/plan/SKILL.md` read whole; `too_large.md` not needed
- Open design choice (section 2): none found. Reserved choice: none.

## The plan in short

Foundation step first: Settlements 1–3 and the wrapping of D-254's line through
`the-way-record-decision`; the rule "Recording a failure" (To do 32) through
`the-way-maintain-coding-guidelines`. Then 12 slices, made in this order:

| Slice | Items | Part | Risk | Model |
|---|---|---|---|---|
| 1 flaky tests | 1, 2, 3 | account-server (tests only) | none | cheaper |
| 2 backup's sentence | 5 | account-server | trust boundary | cheaper |
| 3 broken-off body | 9 | account-server | trust boundary | cheaper |
| 4 block at registration | 10 | account-server | trust boundary | same |
| 5 tests of two server guards | 17 | account-server (tests only) | trust boundary (temporary defects) | cheaper |
| 6 `local:stop` | 6, 7, 19 | build-tools | trust boundary | cheaper |
| 7 local proxy | 8, 18, 20 | build-tools | trust boundary | cheaper |
| 8 `keepalive` test | 11 | browser-view (test only) | none | cheaper |
| 9 simulation tests | 12–16 | simulation (tests only) | trust boundary (temporary defects in `saved-game.ts`) | cheaper |
| 10 emailed link in an open game | 21 | browser-view | none | cheaper |
| 11 measurement's failure reason | 25 | build-tools + skill text | none | cheaper |
| 12 skill texts | 22, 23, 24 (play line), 26–31 | agent-workflow | none | cheaper |

Item 4 has no slice: the orchestrator's base run (`base-item4.log`, 5 tests OK) shows the
task's condition does not hold; *Coverage* names it as the evidence. Chains: 1 → 3 → 4 → 5
(`tests/http.test.mjs`, `src/server/app.ts`, `tests/account-storage.test.mjs`), 6 → 7, 11 → 12
(`setup_and_secrets.md`). Slices 2, 8, 9, 10 and 11 depend on no other slice.

## Twin copies of the skills (handoff fact 2)

`.agents/skills/loop2-deploy/` and `.agents/skills/loop2-play/` are full copies, not links: each
file is a regular file, and `git ls-files -s` gives the same blob for each twin
(`SKILL.md` 1803f7c…, `references/setup_and_secrets.md` 5493aa6…, `references/troubleshooting.md`
5a58640…, `references/backup_and_restore.md` dad1b77…, play `SKILL.md` c1ab728…). The copies are
kept equal by `tests/agent_workflow/test_loop2_deploy_skill.py` and
`tests/agent_workflow/test_loop2_play_skill.py`: `test_both_copies_hold_the_same_files` and
`test_both_copies_are_byte_identical` in each. Slices 11 and 12 change both copies in the same
slice and run those two files as checks.

## Statements of the task that did not survive the check, or hold only in part

1. To do 21 names `src/browser/app.ts:584`–`:589`; no such file exists. The lines are in
   `src/browser/view/app.ts:584`–`:589` (`start()`, reading the reset and the confirmation token).
   `src/browser/view/game-view.ts:817`–`:822` is right. The plan uses the right path.
2. To do 22 speaks of the three "H1" in `setup_and_secrets.md` alone, but the steps of the mail
   (H1–H4) and of the saved game (H1, H2) are referred to by name also in `SKILL.md` (`:144`,
   `:176`, `:207`, `:261`, `:266`) and `references/troubleshooting.md` (`:27`, `:29`, `:123`,
   `:127`); a fourth family of "H" steps stands in `tests/invariants/test_account_save_backup_encrypted.py:23`
   ("the human's H2" of the backup). Renaming means following those references; the plan keeps
   the tunnel's H1–H5 and renames the other two (Slice 12, *Choices*).
3. To do 2 names the case at `tests/startup.test.mjs:120`; the helper `refusedStart` at `:92`–`:107`,
   used by further cases of the same file, has the same `timeout: 5000` at `:95`. The task does not
   name it, and the plan does not change it (see Questions).
4. To do 25 speaks of a failed SSH login. The skill's procedure runs the launcher on the server as
   root, with no `DOCKER_HOST=ssh://…`, so an SSH login fails only where the docker CLI points over
   SSH (the launcher's header allows it). The item stands: docker's reason is lost today
   (`scripts/measure-passwords.mjs:193`–`:199`).
5. To do 10 holds as the Context says, with one addition: `saveSession` throws the same
   "Session cannot be replaced" (`src/server/database.ts:355`) when a password was replaced while
   the registration waited (`tests/http.test.mjs:1902` and following). By Settlement 2 that cause
   stays a failure; Slice 4 keeps its line.
6. To do 1: confirmed in the code. The two clock reads are in express-session, not in the product:
   `Store.prototype.createSession` (`node_modules/express-session/session/store.js:86`–`:96`) makes
   `new Cookie(sess.cookie)`, whose `for…in` copies the enumerable accessor `maxAge`
   (`cookie.js:104`–`:107`, `expires - Date.now()`) and its setter then sets
   `expires = Date.now() + ms` (`cookie.js:83`–`:93`).
7. Every other line number of items 1–31 matched the base `00aa818`, give or take one line.

## Choices worth the orchestrator's eye

- Slice 2 keeps the non-zero exit code of `account-backup` for a failed cleanup (today 1), so the
  nightly script still sends nothing and the owner gets the notice; only the failure's name and the
  operator's sentence change. Exit 0 would send a whole backup but let the plain copy left in the
  container go unreported; a new exit code would also change the command's codes in
  `backup_and_restore.md:58` (two copies). Cost: one night without a sent backup each time only the
  cleanup fails.
- Slice 11 sends docker's own error text to standard error (the terminal), never into the report
  file the skill tells the human to copy into the request, because docker's message over SSH can
  name the server (D-13).
- Slice 8 observes what the client hands the real `fetch`, passing the call on to the real local
  server, instead of a stand-in for `fetch`.
- Slice 10 adds a reload to `PageAddress`, so the view's tests see it.

## Guidelines missing or uncertain

- `guidelines/coding-browser-api-client.md`, example "Test na prawdziwym lokalnym serwerze": "Niczego
  nie podstawia za `fetch`." A test of `keepalive` (To do 11) cannot see the flag at the server, so
  it has to observe the call to `fetch`. Whether a wrapper that records the call and passes it on
  unchanged "substitutes" anything is not said. The plan takes the wrapper (or an undici
  dispatcher) as allowed; the reviewer of the whole change judges it.
- `guidelines/testing.md` says how a test of a trust boundary is shown failing once, and the task's
  acceptance asks the same for items 11–19, but nothing says how to show a fix of a flaky test (To
  do 1–3). Slice 1 asks for the race forced on the base where it can be, and a reason where not.
- No kind row covers the service commands (`src/server/account-backup.ts`) or the scripts
  (`scripts/local-start.mjs`, `scripts/measure-passwords.mjs`); `guidelines/coding.md`, "Odłożone
  rodzaje i formatowanie", leaves patterns of entry points deferred, so I read this as intended,
  not missing. Slices 2, 6, 7 and 11 read `guidelines/coding.md` and `guidelines/testing.md` only.
- The styleguide's order-of-work example ("Plan of a user-interface change",
  `guidelines/styleguide-browser-view.md:659`–`:666`) does not apply: no slice changes how a screen
  looks. Slice 10 changes what the page does when its address changes, and Slice 8 only a test.
  Both slices still read the styleguide whole, as `src/browser/AGENTS.md` and the styleguide's
  *When to read* require for any file of `browser-view`.

## Reaches beyond the dispatch

- Decisions read, each whole by its range, as the slices need them: D-12, D-49, D-50, D-55, D-56,
  D-73, D-78, D-102, D-103, D-104, D-110, D-112, D-115, D-117, D-138, D-139, D-165, D-179, D-190,
  D-204, D-206, D-214, D-228, D-231, D-233, D-245, D-253, D-254, D-255, D-256, D-258, D-264, D-268,
  D-280, plus the 14 the dispatch named. Why: their *Scope* names a part a slice touches, and each
  bears on what that slice changes or tests.
- Invariants by *Part* and by the `invariant:` lines of the tests the slices change:
  account-session-storage, account-attempt-limits, password-reset-ends-sessions,
  blocked-account-access, player-server-session, player-self-registration,
  email-verification-nonblocking, account-mutation-request-guards, account-save-backup,
  local-start-access, account-client-requests, saved-state-http-exchange, save-version,
  death-settled-once, program-closed-lists, email-confirmation-link, password-reset-link,
  document-test-memory-limit, player-argon2-deployment-check, unblock-restores-no-session,
  unblock-restores-no-link (`foundations/invariants.md`).
- Environment fact `docker-volume-lifecycle` (`foundations/environment_facts.md:370`–`:375`), for
  item 28.
- `.the-way/product-guidelines/reading.md` and "Reading the foundation" in
  `.the-way/elements/common/way_of_working.md:52`–`:90`, to select *Read*.
- The task's source file in the vault,
  `the author's private note of the remarks of the first foundation review`,
  rows 043-28, 036-1, 038-2, 046-6, 050-7 to 050-9, 032-4, 032-11, 032-12, 032-17, 036-2, 037-1,
  037-13, 043-2, 043-6, 043-14, 043-16, 043-23, 044-4, 047-5, 051-9, 051-15, 055-3, to check the
  items against what the reviewers wrote (the mutants of items 11–17 come from there).
- `node_modules/express-session/session/cookie.js` and `store.js`, to check item 1.
- An earlier plan of this product,
  `the plan of an earlier cycle of this product, kept in another worktree`, as
  the precedent for how *Read* selects decisions (next concern).

## Concerns

- **Read selects fewer decisions than "Reading the foundation" step 2 would.** That step takes every
  decision whose *Scope* names a touched part: account-server 86, browser-view 250, simulation 160,
  build-tools 58, agent-workflow 41. Every slice would read most of `foundations/decisions.md`
  (764 754 characters). The plan's *Read* names the decisions that bear on each slice's change, as
  the precedent plan does. The orchestrator checks *Read* and may add to it.
- Slice 4 is the slice most likely to hide a real failure or store a session of a blocked account;
  it is marked `same` for that reason and reviewed on its own as a trust boundary.

## Searches not found or unclear

- `src/browser/app.ts` (To do 21): not found; the file is `src/browser/view/app.ts`.
- The Docker Engine version on the server: not recorded in `foundations/environment_facts.md` or the
  skill. Whether `docker volume prune` and `docker system prune --volumes` remove a named volume
  depends on it (since Engine 23.0 only with `--all`, per the reviewer of 032-4, not checked by me).
  Slice 12 must take the behaviour from Docker's documentation and say where it depends on the
  version.
- The server's 16.2 s for the 40 measured operations (item 27) stands only in the reviewer's row
  032-17. The code holds no such number, as the task's Context says. Slice 12 writes "a dozen or so
  seconds" from the task.
- A seam that holds the password check in `tests/http.test.mjs`: none exists (`verifyPassword` is
  imported directly by `account-routes.ts`). The fixture wraps `runtime.database` with hooks and
  builds its own `AccountPolicy`, which Slice 1 can use. Unclear until the slice tries.
- A test route added after `createApp` in `tests/http.test.mjs` (`/test-delayed-read`) stands after
  the error handler, so it cannot drive the `headersSent` branch of To do 17. Unclear whether a
  product route can reach that branch. Slice 5 returns without code if neither guard can be reached.
- Whether the signed-out card or the form „Ustaw nowe hasło” listen for an emailed link pasted into
  the address: no `onChange` outside `game-view.ts` (grep of `src/browser`), so a link pasted there
  is also ignored. To do 21 and Settlement 1 cover only the open game; outside this task.

## Questions still open

1. Should the 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`), which several
   cases of the same file use, change with item 2? Proposed answer: no. The task names only the
   occupied-port case, and nobody has seen `refusedStart` fail. If it fails under load, it is a
   remark for a later task. Evidence: the task's To do 2 and the review row 050-21 name only `:119`/`:120`.
