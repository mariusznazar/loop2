# Plan — Porządki z uwag PR-ów loop2 z realnym ryzykiem

- Task: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`
- Spec: none
- Base: 00aa818e59ab484358970f98af1f4ab61e969e4c (every range below is read at that commit)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement 1 — when an emailed link's fragment (`#confirm-email=…`, `#reset-password=…`) appears in the address of a tab whose game is open, the page reloads and does what a page opened by that link does | decision | Settlements to record, row 1 | Slice 10 |
| Settlement 2 — a browser that breaks off sending a request's body, and a session write refused because the account was blocked during a registration, are an expected course and leave no failure line; another cause of a failed session write stays a failure | decision | Settlements to record, row 2 | Slices 3, 4 |
| Settlement 3 — the sentence by which a service command (`account-block`, `account-backup`) answers the operator is no log line; the JSON line alone is the log line | decision | Settlements to record, row 3 | Slice 2; the guideline rule of To do 32 below |
| D-254 — its line at `foundations/decisions.md:5226` (138 characters) wrapped as the neighbouring lines are, no word changed | decision, form only | To do, item 24 (the line of the decision log) | none; Slice 12 wraps the skill's line of the same item |
| `guidelines/coding.md`, rule "Recording a failure" — the operator's sentence of a service command is no log line, so its JSON failure line and the sentence after it are one record of the failure, citing Settlement 3 by the identifier it gets | coding guideline, written through the project skill `the-way-maintain-coding-guidelines` | To do, item 32; Settlement 3 | Slice 2 |

No invariant, glossary term, environment fact or change of the part map: every file the change
touches is already claimed by a part. The foundation step writes the three settlements and D-254
through `the-way-record-decision` and the guideline rule through
`the-way-maintain-coding-guidelines`; no slice writes them.

## Slices

### Slice 1 — The three flaky tests pass whatever the clock and the computer's speed

- **Goal:** three kinds of case stop failing with no fault of the change (To do 1–3), each still
  guarding what it guards today. (1) The case of `tests/account-storage.test.mjs` that asserts
  `before.cookie.expires.getTime()` is 5000 after `load` (today about `:1819`–`:1846`, inside the
  loop of corrupted payloads) gives the same result whether or not a millisecond passes between two
  clock reads. The two reads are in the library, not in the product: `Store.prototype.createSession`
  of express-session makes `new Cookie(sess.cookie)`, whose `for…in` copies the enumerable accessor
  `maxAge` (getter `expires - Date.now()`) and then sets `expires = Date.now() + ms`. The case keeps
  checking that the database's expiry replaces the older JSON expiry. (2) The case "exits with an
  error instead of reporting ready when its listening port is occupied" of `tests/startup.test.mjs`
  (today `timeout: 5000` at `:120`) does not fail when a loaded computer takes longer than 5 s to
  start the process; it keeps a bound on its own waiting (D-77, D-84). (3) The three cases of
  `tests/http.test.mjs` that wait on `f.policy.inFlight === 1` (today `:1382`, `:1839`, `:1893`) do
  not depend on the password check lasting longer than one 5 ms poll of `waitFor`: each acts at a
  moment it observes for certain, for example through a hook the fixture already wraps around
  `runtime.database` or a wrapper of the `AccountPolicy` the fixture builds, and each still checks
  what its name says. Only test files change; no product file does.
- **Change:** `tests/account-storage.test.mjs` · `tests/startup.test.mjs` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:30-35` To do, items 1 to 4 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:109-120` Context ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:1425-1436` D-73 · `foundations/decisions.md:1477-1490` D-77 ·
  `foundations/decisions.md:1492-1503` D-78 · `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/decisions.md:1003-1016` D-49 · `foundations/decisions.md:1887-1900` D-102 ·
  `foundations/decisions.md:1902-1915` D-103 · `foundations/decisions.md:2068-2081` D-115 ·
  `foundations/decisions.md:2663-2676` D-139 ·
  `foundations/invariants.md:779-788` account-session-storage ·
  `foundations/invariants.md:789-798` account-attempt-limits ·
  `foundations/invariants.md:1089-1098` password-reset-ends-sessions ·
  `foundations/part_map.md:62-82` account-server ·
  `foundations/glossary.md:93-103` unit test, integration test ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/server/session-store.ts` · `src/server/account-policy.ts:140-200` ·
  `src/server/passwords.ts` · `src/server/account-routes.ts:730-793` ·
  `node_modules/express-session/session/cookie.js` ·
  `node_modules/express-session/session/store.js`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/startup.test.mjs` ·
  `npm test -- tests/http.test.mjs`; where the race can be forced on the base — a busy wait of a few
  milliseconds put in temporarily between the two reads, or a password check that ends at once — the
  old case is shown failing and the new one passing, the commands and exit codes in the report and
  the temporary change taken out again; where it cannot be forced, the report says why
- **Depends on:** none

### Slice 2 — `account-backup` says the truth when only its cleanup failed

- **Goal:** when `node dist/server/account-backup.js --to-standard-output` has written the whole
  backup to standard output and only the removal of its temporary directory fails (today the error
  of `rm` in the `finally` at `src/server/account-backup.ts:90`–`:93` reaches the outer `catch` at
  `:94`–`:99`), the command no longer writes "No backup was made; run the command again." (To do 5).
  It writes the failure once, with its cause, through `writeFailure`, under a failure name of its own
  rather than `backup-database`, and after it one sentence for the operator saying that the backup
  went out whole and that its temporary copy was left in the container; by Settlement 3 and the rule
  "Recording a failure" as the foundation step leaves it, the JSON line and that sentence are one
  record of the failure. The exit code stays non-zero and stays the one the command gives today in
  that case (see *Choices*), so the nightly script sends nothing and the owner is told, as D-233
  gives. Every other path of the command — its exit codes 0 to 4, its sentences and its lines — stays
  as it is. A test on real files, through the stand-in the tests already import
  (`tests/account-database-check-standin.mjs`, extended with a mode where the directory's removal
  fails if it needs one), shows the case; it is written first and seen failing on the base.
- **Change:** `src/server/account-backup.ts` · `tests/account-backup.test.mjs` ·
  `tests/account-database-check-standin.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:39-39` To do, item 5 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:81-81` To do, item 32 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:100-107` Questions to settle, „Co jest awarią…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  Foundation entries: Settlement 3 and the rule "Recording a failure" as written ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5156-5199` D-253 ·
  `foundations/decisions.md:4358-4382` D-228 · `foundations/decisions.md:4444-4501` D-231 ·
  `foundations/decisions.md:4540-4575` D-233 ·
  `foundations/invariants.md:1099-1108` account-save-backup ·
  `foundations/part_map.md:62-82` account-server ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/server/log-line.ts` · `deploy/loop2-backup:1-60` · `deploy/loop2-backup:160-215` ·
  `.claude/skills/loop2-deploy/references/backup_and_restore.md:26-70`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-backup.ts` (`src/server/**`)
- **Checks:** `npm test -- tests/account-backup.test.mjs` — the new case written first and seen
  failing on the base (command and exit code in the report); `npm test -- tests/account-database-check.test.mjs`
  where the stand-in changes
- **Depends on:** Foundation entries: Settlement 3 and the rule "Recording a failure"

### Slice 3 — A browser that breaks off its request body is refused, not logged as a failure

- **Goal:** a request whose body the browser stops sending (`request.aborted` of the body parser,
  today a `status` of 500 in the error handler of `src/server/app.ts:84`–`:118`, which writes a
  `{"failure":"request",…,"place":"app.errors"}` line) is treated as a refused body: it gets the
  answer a refused body gets ("Invalid request body", status 400) where the connection still takes
  one, and leaves no failure line (To do 9, Settlement 2). Every other error keeps its status and its
  line. A test on real HTTP sends part of a body and breaks the connection, then checks that the
  server's log holds no failure line; it is written first and seen failing on the base.
- **Change:** `src/server/app.ts` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:43-43` To do, item 9 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:100-107` Questions to settle, „Co jest awarią…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  Foundation entries: Settlement 2 as written ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:1917-1928` D-104 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:729-738` account-mutation-request-guards ·
  `foundations/part_map.md:62-82` account-server ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/log-line.ts` · `tests/transport.test.mjs`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/app.ts` (`src/server/**`)
- **Checks:** `npm test -- tests/http.test.mjs` — the new case written first and seen failing on
  the base; `npm test -- tests/transport.test.mjs`
- **Depends on:** Slice 1 · Foundation entries: Settlement 2

### Slice 4 — A block during a registration leaves no failure line of the session write

- **Goal:** when the account is blocked while its registration waits on the confirmation message,
  the session write at the end of the response (`saveSession`, `src/server/database.ts:318`–`:356`,
  which throws "Session cannot be replaced") is refused as the block intends and leaves no
  `{"failure":"session",…,"place":"app.sessions"}` line (`src/server/app.ts:60`–`:71`); a session
  write refused for any other reason — a password replaced meanwhile, a database error, a trigger —
  still leaves its line (To do 10, Settlement 2). The block is told apart where the write learns it
  (see *Choices*), so what the write stores and when it refuses stay as D-112 gives: nothing is stored
  for a blocked account. The answer 201 and its body stay as today. Tests on real HTTP and SQLite —
  a block committed while the registration's message is held, then the log read — show no line for
  the block and one line for another cause; written first and seen failing on the base. Where the
  error the store or the database gives changes, the cases of `tests/account-storage.test.mjs` that
  match it follow, each change with its reason (testing guideline "Changing an existing test").
- **Change:** `src/server/database.ts` · `src/server/session-store.ts` · `src/server/app.ts` ·
  `tests/http.test.mjs` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:44-44` To do, item 10 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:100-107` Questions to settle, „Co jest awarią…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:115-115` Context, loop2#037-9 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  Foundation entries: Settlement 2 as written ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:2038-2051` D-112 ·
  `foundations/decisions.md:2068-2081` D-115 · `foundations/decisions.md:2635-2648` D-137 ·
  `foundations/decisions.md:2650-2661` D-138 · `foundations/decisions.md:1799-1812` D-96 ·
  `foundations/decisions.md:2924-2937` D-156 ·
  `foundations/invariants.md:859-868` blocked-account-access ·
  `foundations/invariants.md:869-878` player-server-session ·
  `foundations/invariants.md:779-788` account-session-storage ·
  `foundations/invariants.md:609-618` player-self-registration ·
  `foundations/invariants.md:629-638` email-verification-nonblocking ·
  `foundations/invariants.md:1089-1098` password-reset-ends-sessions ·
  `foundations/part_map.md:62-82` account-server · `foundations/glossary.md:156-160` blocked account ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` ·
  `guidelines/coding-session-store.md` · `guidelines/coding-http-application.md` ·
  `guidelines/testing.md` · `src/server/log-line.ts` · `src/server/account-routes.ts:180-262` ·
  `src/server/account-routes.ts:640-730`
- **Model:** same — the reason of a refused session write crosses the database, the session store
  and the HTTP application of a trust boundary, and a mistake either hides a real failure or stores
  a session of a blocked account
- **Risk:** trust boundary — `src/server/database.ts`, `src/server/session-store.ts`,
  `src/server/app.ts` (`src/server/**`)
- **Checks:** `npm test -- tests/http.test.mjs` — the new cases written first and seen failing on
  the base; `npm test -- tests/account-storage.test.mjs`; `npm test -- tests/transport.test.mjs`
- **Depends on:** Slice 3 · Slice 1 · Foundation entries: Settlement 2

### Slice 5 — Tests of the server's two guards for an error after the answer began

- **Goal:** two guards of `src/server/app.ts` have a test each, on real HTTP (To do 17): the
  `if (!response.writableEnded)` before `response.destroy()` in the session callback (today `:68`),
  which keeps an answer already ended whole, and the `response.headersSent` branch of the error
  handler (today `:109`–`:113`), which destroys a response whose answer began and hands no error on
  to Express's own handler. Each test is seen once failing on code with the defect it is to catch —
  the guard removed, or turned into a plain `destroy()`, put in temporarily — the command and exit
  code in the report, and the defect taken out again. No product file changes; if a guard proves
  unreachable from any request, the slice returns without code and says so.
- **Change:** `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:54-54` To do, item 17 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:2650-2661` D-138 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/part_map.md:62-82` account-server ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/app.ts` · `src/server/log-line.ts`
- **Model:** cheaper
- **Risk:** trust boundary — the tests of `src/server/app.ts` (`src/server/**`), whose defects the
  slice puts in temporarily
- **Checks:** `npm test -- tests/http.test.mjs`, also with each defect in place (failing), then
  without it (passing)
- **Depends on:** Slice 4

### Slice 6 — `npm run local:stop` tells every start and writes one line for one broken directory

- **Goal:** in `scripts/local-start.mjs` (To do 6, 7, 19): (6) `npm run local:stop` with no built
  game — `dist/server/log-line.js` absent, so `recordFailure` cannot load its writer — and one broken
  start directory still sends the stop to every other running start; the failure to load the writer
  is itself recorded once, as the rule "Recording a failure" and D-253 give a script run by hand, and
  stops nothing. (7) One broken start directory — one whose stop file cannot be written — leaves one
  failure line, not the line of `tellToStop` (today `:392`–`:395`) and a second
  `START_STILL_RUNNING` line (today `:406`–`:410`); the exit code stays 1 when a start did not stop.
  (19) The case "a planted directory keeps stop from telling no other start" of
  `tests/invariants/test_local_start_access.py` (today `:392`–`:407`, the name in `planted_name`
  sorted first by zeros) holds whatever order the system lists directory names in
  (`readdirSync` at `:282` does not sort); the slice may make the order fixed in the script or make
  the case independent of it. Tests for (6) and (7) are written first and seen failing on the base;
  the case of (19) is seen once failing on code with the defect it is to catch — the loop of `stop`
  stopping at its first failure, put in temporarily with the planted directory listed after the real
  start — the command and exit code in the report, and the defect taken out again.
- **Change:** `scripts/local-start.mjs` · `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:40-41` To do, items 6 and 7 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:56-56` To do, item 19 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5156-5199` D-253 ·
  `foundations/decisions.md:5230-5259` D-255 · `foundations/decisions.md:5261-5282` D-256 ·
  `foundations/decisions.md:5306-5324` D-258 · `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:1179-1188` local-start-access ·
  `foundations/part_map.md:84-116` build-tools ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/server/log-line.ts` ·
  `tests/invariants/loop2_invariant_support.py` · `.claude/skills/loop2-play/SKILL.md:1-60`
- **Model:** same — the orchestrator raised it from `cheaper`: three changes of what a process-level script writes to its failure log under D-252, D-253, D-255, D-256 and D-258, in a trust boundary, with a test that must be seen failing by a defect put in temporarily
- **Risk:** trust boundary — `scripts/local-start.mjs`
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`, also with the defect of
  (19) in place (failing), then without it (passing)
- **Depends on:** none

### Slice 7 — The local proxy ends a cut-off answer and stays quiet for a browser that left

- **Goal:** in `scripts/local-start.mjs` and its test file (To do 8, 18, 20): (8) when the server
  breaks off its answer after the headers, the proxy (`proxyRequest`, today `:162`–`:188`; the
  handler at `:172`–`:175` only pipes) ends the browser's connection instead of leaving the browser
  waiting, and writes one failure line with the cause, unless the browser had already left. (18) A
  test shows that a browser that leaves in the middle of a request leaves no `local-proxy` failure
  line (the `browserLeft` guard, today `:163`, `:177`–`:178`, `:183`–`:186`). (20) The docstrings of
  `tests/invariants/test_local_start_access.py` (the module's at `:1`–`:11`, the class `LocalStart`'s
  at `:256`) say which cases run the real server and which a stand-in, the stand-in cases of this
  slice included (today the case at `:467`–`:480` runs one, as does the case of a start on its way
  up). The tests run the real command with stand-in servers, as the file's cases with
  `DROPPING_SERVER` and `BUSY_SERVER` do. The test of (8) is written first and seen failing on the
  base; the test of (18) is seen once failing on code with the guard removed, put in temporarily —
  the commands and exit codes in the report, and the defect taken out again.
- **Change:** `scripts/local-start.mjs` · `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:42-42` To do, item 8 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:55-57` To do, items 18 to 20 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5230-5259` D-255 ·
  `foundations/decisions.md:5306-5324` D-258 · `foundations/decisions.md:1997-2010` D-110 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:1179-1188` local-start-access ·
  `foundations/part_map.md:84-116` build-tools ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/server/log-line.ts` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** same — the orchestrator raised it from `cheaper`: the same file and test file as Slice 6, with a change of a proxy's handling of a cut-off answer and of a browser that left, in a trust boundary
- **Risk:** trust boundary — `scripts/local-start.mjs`
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`, also with the defect of
  (18) in place (failing), then without it (passing)
- **Depends on:** Slice 6

### Slice 8 — A test shows that a save of the game state is sent with `keepalive`

- **Goal:** a test of `tests/account-api.test.mjs` shows that `saveGame` sends its `PUT
  /api/saved-game` with `keepalive` (To do 11; `src/browser/account-api.ts:376`–`:382` passes `true`
  to `exchange`, D-207). It observes what the client hands the real `fetch` and still sends the
  request to the file's real local server, replacing nothing (see *Choices*). The test is seen once
  failing on code with the defect it is to catch — `true` turned into `false` at that call, put in
  temporarily — the command and exit code in the report, and the defect taken out again. No product
  file changes.
- **Change:** `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:48-48` To do, item 11 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:3741-3801` D-207 · `foundations/decisions.md:3661-3692` D-204 ·
  `foundations/decisions.md:2098-2111` D-117 ·
  `foundations/invariants.md:809-818` account-client-requests ·
  `foundations/invariants.md:1019-1028` saved-state-http-exchange ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs`, also with the defect in place (failing),
  then without it (passing)
- **Depends on:** none

### Slice 9 — The simulation's tests catch the load and loop defects they miss today

- **Goal:** tests of `tests/sim/saved-game.test.mjs` and `tests/sim/loop.test.mjs` catch five
  defects that pass every test today (To do 12–16): (12) a load accepts a chest holding exactly
  `chestCapacity` pieces and a closure that put down exactly the planned count
  (`src/browser/sim/saved-game.ts:373` and `:775`; defect `>` turned into `>=`); (13) crafted
  documents with two characters of one number and with a program whose number is not below the
  program counter are refused for that one fault alone, without the second fault that refuses the
  crafted cases at `tests/sim/saved-game.test.mjs:1145`–`:1152` earlier (`saved-game.ts:484`, `:512`;
  defects: `ids.has(id)` removed at characters, the counter check removed at programs); (14) a
  crafted document whose map run ended in death with a wrong `solvedMapRun` mark is refused
  (`saved-game.ts:980`; defect: the mark not compared after a death); (15) stopping the loop of a
  character other than the first writes that character's generation
  (`src/browser/sim/loop.ts:408`–`:410`; defect: `generationOf` reading `state.team.characters[0]`);
  (16) a crafted program whose rule group's name is not text is refused at the load
  (`src/browser/sim/programs.ts:249`; defect: the `typeof group.name` check removed). Each crafted
  document is refused whole, as `save-version` and D-213 give, and each expected value comes from
  the decisions named, not from today's result. Each new test is seen once failing on code with its
  defect put in temporarily, the command and exit code in the report, and the defect taken out
  again. No product file changes.
- **Change:** `tests/sim/saved-game.test.mjs` · `tests/sim/loop.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:21-21` Need, the third point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:49-53` To do, items 12 to 16 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:3967-4001` D-213 · `foundations/decisions.md:3715-3739` D-206 ·
  `foundations/decisions.md:1143-1168` D-56 · `foundations/decisions.md:3055-3068` D-165 ·
  `foundations/decisions.md:1122-1141` D-55 · `foundations/decisions.md:1018-1037` D-50 ·
  `foundations/decisions.md:3295-3309` D-179 · `foundations/decisions.md:4003-4020` D-214 ·
  `foundations/decisions.md:4904-4930` D-245 · `foundations/decisions.md:3444-3457` D-190 ·
  `foundations/invariants.md:1029-1038` save-version ·
  `foundations/invariants.md:1059-1068` death-settled-once ·
  `foundations/invariants.md:365-375` program-closed-lists ·
  `foundations/part_map.md:30-60` simulation ·
  `foundations/glossary.md:18-30` map run, program · `foundations/glossary.md:59-63` rule group ·
  `foundations/glossary.md:136-147` completion, solved map ·
  `foundations/glossary.md:211-221` generation number, earning loop ·
  `guidelines/coding.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/saved-game.ts` · `src/browser/sim/loop.ts:380-589` ·
  `src/browser/sim/programs.ts:230-300`
- **Model:** cheaper
- **Risk:** trust boundary — the tests of `src/browser/sim/saved-game.ts`, whose defects the slice
  puts in temporarily
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/loop.test.mjs`,
  each also with each defect in place (failing), then without it (passing)
- **Depends on:** none

### Slice 10 — An emailed link pasted into the tab of an open game reloads the page

- **Goal:** when the address of a tab whose game is open changes to an emailed link's fragment —
  `#confirm-email=…` or `#reset-password=…`, as `readConfirmationToken` and `readResetToken` read
  them — the page reloads, and the reloaded page does what a page opened by that link does (D-156,
  D-224, D-225, D-281's fragments of emailed links), instead of the listener of `address.onChange`
  in `src/browser/view/game-view.ts:815`–`:822` resolving the fragment as a screen and replacing it
  with Siedziba (To do 21, Settlement 1). Any other change of the address goes on as today. The
  reload goes through the `PageAddress` the page already receives (`src/browser/view/email-confirmation.ts:15`–`:28`,
  `browserAddress` at `:80`–`:102`), so the test's address sees it (see *Choices*). Tests in
  `tests/view/account-screen.test.mjs`, with its `fakeAddress`, show a reload for both fragments and
  none for a screen's address; written first and seen failing on the base. Since jsdom proves no real
  `hashchange`, the slice operates the running game once as `.claude/skills/loop2-play/SKILL.md`
  gives: signed in, a `#confirm-email=…` fragment typed into the address bar of the open game
  reloads the page, which shows the confirmation's sentence; the evidence in the report (D-254).
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/email-confirmation.ts` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:22-22` Need, the fourth point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:61-61` To do, item 21 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:94-99` Questions to settle, „Co robi otwarta gra…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:130-146` Decisions in play ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  Foundation entries: Settlement 1 as written ·
  `foundations/decisions.md:5986-6020` D-281 · `foundations/decisions.md:5936-5984` D-280 ·
  `foundations/decisions.md:1799-1812` D-96 · `foundations/decisions.md:2924-2937` D-156 ·
  `foundations/decisions.md:4229-4249` D-224 · `foundations/decisions.md:4251-4285` D-225 ·
  `foundations/decisions.md:3741-3801` D-207 · `foundations/decisions.md:5201-5228` D-254 ·
  `foundations/decisions.md:5443-5473` D-264 · `foundations/decisions.md:5574-5617` D-268 ·
  `foundations/invariants.md:889-898` email-confirmation-link ·
  `foundations/invariants.md:1079-1088` password-reset-link ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view · `foundations/glossary.md:87-91` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/app.ts` · `src/browser/view/password-reset.ts` ·
  `src/browser/view/screen-address.ts` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — the orchestrator raised it from `cheaper`: it adds a member to a type that every fake address of the view's tests implements, changes what the page does on an address change, and ends with operating the running game in a real browser
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/password-reset.test.mjs`; the game operated once in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Foundation entries: Settlement 1

### Slice 11 — A failed password measurement says which docker step failed and why

- **Goal:** after a failed measurement on the server, Mariusz learns whether the SSH login, the
  permission to use Docker or the image itself failed, not only "the image cannot be inspected"
  (To do 25; `scripts/measure-passwords.mjs:89`–`:99`, `:190`–`:199`, `:238`–`:250`, `:285`). The
  launcher names in its report which docker step failed (`image inspect`, `run`, `wait`) and docker's
  exit status, and writes docker's own error text to standard error, which the skill's command leaves
  in the terminal, never into the report file that is copied into the request (see *Choices*). The
  list of failures in "Measuring the password work of the deployed image" of
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (today `:405`–`:416`) says how to
  read that terminal text: an SSH login refused, no permission on the Docker socket, or an image the
  daemon does not hold. Both copies of the skill change alike, byte for byte. A test of
  `tests/password-measurement.test.mjs`, through the `docker` function `measure` takes, is written
  first and seen failing on the base. Items 26 and 27 of the same section are Slice 12's, not this
  slice's.
- **Change:** `scripts/measure-passwords.mjs` · `tests/password-measurement.test.mjs` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:23-23` Need, the fifth point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:71-71` To do, item 25 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:89-93` Questions to settle, the seven remarks ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:2025-2036` D-113 · `foundations/decisions.md:271-289` D-12 ·
  `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:5156-5199` D-253 ·
  `foundations/invariants.md:649-658` player-argon2-deployment-check ·
  `foundations/part_map.md:84-116` build-tools · `foundations/part_map.md:118-133` agent-workflow ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/password-measurement.test.mjs` — the new case written first and
  seen failing on the base; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`
- **Depends on:** none

### Slice 12 — The deploy and play skills say what is true, in both copies

- **Goal:** text of the skills changes, each file in `.claude/skills/` and its twin in
  `.agents/skills/` byte for byte alike (To do 22–24 and 26–31). (22) The three steps named "H1" of
  `references/setup_and_secrets.md` (today `:41`, `:230`, `:309`) get different names: the tunnel's
  H1–H5 keep theirs; the mail's steps (today H1–H4, `:230`–`:276`) and the saved-game steps (today
  H1 and H2, `:309`, `:340`) get names of their own, and every reference to them follows —
  `SKILL.md` (today `:144`, `:176`, `:207`, `:261`, `:266`) and `references/troubleshooting.md`
  (today `:27`, `:29`, `:123`, `:127`) — while the tunnel's references, `backup_and_restore.md` and
  the backup's "H2" in `tests/invariants/test_account_save_backup_encrypted.py` stay (see *Choices*).
  (23) The sentence "the game has no save button; it saves itself after each change" (today `:337`)
  no longer contradicts the program panel's buttons „Zapisz w programie”, „Zapisz jako nowy program”
  and „Zapisz”: it speaks of the game state, which the game saves by itself (D-207). (24) Line 35 of
  `.claude/skills/loop2-play/SKILL.md` (127 characters) is wrapped as its neighbours, no word changed.
  (26) The section on measuring says how to find and remove a measuring container
  `loop2-password-measure-<random>` left by an interrupted measurement or a lost connection (the
  launcher removes it only in its `finally`), for the human to run on the server; nothing runs it.
  (27) The section gives the extra load of the measurement as about a dozen seconds on the server
  (a dozen or so, „kilkanaście”, as the task gives), not "a few seconds" (today `:422`–`:423`).
  (28) The skill names as removing the accounts' volume only the Docker commands that remove it
  (today `:295`–`:296` names `docker compose down`, `docker system prune --volumes` and `docker volume
  prune`): what each removes is taken from Docker's documentation, read and cited with its commit or
  date in the report, never from memory, and where it depends on the Docker Engine's version, which
  the repository does not record for the server, the text says so. (29) `SKILL.md`'s "What it prints"
  of the block command (today `:231`) says that wrong arguments print the usage line and "Nothing
  changed." (`src/server/account-block.ts:39`–`:40`). (30) The description of `unblock` (today
  `:229`–`:230`) says that the emailed links the block stopped stay stopped and the player asks for a
  new one (D-137, D-160). (31) The block that writes the mail's password (today `:244`–`:256`), pasted
  into a terminal without bracketed paste, cannot take the next pasted line as the password: nothing
  that is to be pasted follows the command that reads the password within one paste. The section
  "Blocking a player account" of `SKILL.md` is read as it stands at the slice's base, since another
  task changes it too.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:23-25` Need, the fifth to seventh points ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:65-67` To do, items 22 to 24 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:69-77` To do, items 25 to 31 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:89-93` Questions to settle, the seven remarks ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:111-118` Context ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:291-304` D-13 ·
  `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:2635-2648` D-137 ·
  `foundations/decisions.md:2984-2995` D-160 · `foundations/decisions.md:3741-3801` D-207 ·
  `foundations/decisions.md:5201-5228` D-254 ·
  `foundations/invariants.md:879-888` unblock-restores-no-session ·
  `foundations/invariants.md:899-908` unblock-restores-no-link ·
  `foundations/environment_facts.md:370-375` docker-volume-lifecycle ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/glossary.md:32-44` deployment, test server · `foundations/glossary.md:156-160` blocked account ·
  `src/server/account-block.ts` · `scripts/measure-passwords.mjs:190-260` ·
  `src/browser/view/program-panel.tsx:540-580` · `compose.yaml` ·
  `.claude/skills/loop2-deploy/references/backup_and_restore.md:320-330` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` · `tests/agent_workflow/test_loop2_play_skill.py`
- **Model:** same — the orchestrator raised it from `cheaper`: it states the effect of commands that remove data (item 28) and changes the block that writes a mail password (item 31)
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` ·
  `npm test -- tests/agent_workflow/test_loop2_play_skill.py`; for (31), the old and the new block
  each fed once to `bash` through standard input followed by a further line, as an unbracketed paste
  feeds a terminal, with `/etc/loop2` replaced by a temporary directory, the report saying what the
  password became and where a run without root stopped
- **Depends on:** Slice 11

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — the cookie case independent of a millisecond between two clock reads | Slice 1 |
| To do 2 — the occupied-port case does not fail under load | Slice 1 |
| To do 3 — the three `inFlight === 1` cases independent of the password check's length | Slice 1 |
| To do 4 — `OneExpressProcessServesGameAndApi` runs in the full `npm test`; its preparation does not fail on the base | no slice: the orchestrator's base run `npm test -- tests/invariants/test_loop2_one_serving_process.py` exits 0 with 5 tests OK (`.runs/task-cycles/porzadki-z-uwag-pr/base-item4.log`), and the class passed in the full gate (`base-gate.log`); the condition "when its preparation fails" does not hold, so nothing is to remove. The gate on the finished change runs it again |
| To do 5 — `account-backup` does not write "No backup was made" after a whole backup | Slice 2 · Settlement 3 |
| To do 6 — `local:stop` without a built game still tells the other starts | Slice 6 |
| To do 7 — one broken start directory, one failure line | Slice 6 |
| To do 8 — the proxy ends a browser's connection after a cut-off answer and writes a line | Slice 7 |
| To do 9 — a broken-off request body is refused with no failure line | Slice 3 · Settlement 2 |
| To do 10 — a block during a registration leaves no session failure line; another cause does | Slice 4 · Settlement 2 |
| To do 11 — test of `keepalive` on the save | Slice 8 |
| To do 12 — tests of a full chest and an exact closure | Slice 9 |
| To do 13 — crafted documents refused for one fault alone | Slice 9 |
| To do 14 — crafted death with a wrong `solvedMapRun` refused | Slice 9 |
| To do 15 — the generation of a character other than the first at a stop | Slice 9 |
| To do 16 — a rule group whose name is not text refused at the load | Slice 9 |
| To do 17 — tests of the guards at `app.ts:68` and `:109`–`:110` | Slice 5 |
| To do 18 — a browser that left writes no proxy line | Slice 7 |
| To do 19 — the planted-directory case independent of the listing order | Slice 6 |
| To do 20 — the docstrings say which cases run the real server | Slice 7 |
| To do 21 — an emailed link in an open game's address reloads the page | Slice 10 · Settlement 1 |
| To do 22 — three "H1" steps get different names, both copies | Slice 12 |
| To do 23 — "no save button" no longer contradicts „Zapisz…”, both copies | Slice 12 |
| To do 24 — D-254's line wrapped | Foundation entries: D-254, form only |
| To do 24 — line 35 of the play skill wrapped, both copies | Slice 12 |
| To do 25 — a failed measurement says which docker step and why, both copies | Slice 11 |
| To do 26 — how to find and remove a left measuring container, both copies | Slice 12 |
| To do 27 — the server's load given as a dozen or so seconds, both copies | Slice 12 |
| To do 28 — only the Docker commands that remove the volume, both copies | Slice 12 |
| To do 29 — what the block command prints at wrong arguments, both copies | Slice 12 |
| To do 30 — unblocking brings back no stopped link, both copies | Slice 12 |
| To do 31 — the password block cannot take the next pasted line, both copies | Slice 12 |
| To do 32 — the rule "Recording a failure" on the operator's sentence | Foundation entries: the rule "Recording a failure" |
| Acceptance — each test of items 11–19 seen once failing on code with its defect | Slices 8 (item 11), 9 (items 12–16), 5 (item 17), 7 (item 18), 6 (item 19) — each names its defect and the recorded run |
| Settlement row 1 | Foundation entries: Settlement 1 |
| Settlement row 2 | Foundation entries: Settlement 2 |
| Settlement row 3 | Foundation entries: Settlement 3 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 4 gets no slice: the orchestrator's base run shows the class running and passing, so the task's condition does not hold | a slice that rewrites the class's PowerShell preparation anyway | the class could stop running again on another state of the machine, and only a reader of the gate's output would see it, as before |
| Slice 2 keeps the non-zero exit code `account-backup` gives today when its cleanup fails, and changes only the failure's name and the operator's sentence | exit 0 after a whole backup — the nightly script would send it, but the plain copy left in the container's `/tmp` would reach the owner by no notice; a new exit code of its own — the skill's table of the command's codes in `backup_and_restore.md` changes in two copies for a rare case whose sentence, in the backup log, already says which | one night's backup is not sent each time only the cleanup fails; the owner learns it from the notice and the log |
| Slice 4 tells the block apart where the session write learns it, carried from the database to the error handler of the session callback | reading the account's blocked state again after the write failed — a second query, and an unblock in between turns a block's refusal back into a failure line | a cause wrongly read as the block hides a real failure of the session write |
| Items 9, 10 and 17 are three slices in a chain over `src/server/app.ts` and `tests/http.test.mjs`, after Slice 1 | one slice of all three — a reviewer judges a change of behaviour, a second one and a gap of tests at once | three reviews of a trust boundary instead of one |
| Item 15 joins the simulation's test slice (Slice 9), though it guards `loop.ts`, not the load | a slice of its own | none beyond a larger review of Slice 9 |
| Slice 8 observes what the client hands the real `fetch` and lets it reach the file's real local server | a stand-in for `fetch` — against the example "Test na prawdziwym lokalnym serwerze" of `guidelines/coding-browser-api-client.md` | a wrapper that changes the request would test the wrapper; the review checks that it passes the call on unchanged |
| Slice 10 reloads through the `PageAddress` the page already gets, which gains the reload | `location.reload()` called in `game-view.ts` — no test of the view can see it | one more member of a type every fake address of the tests implements |
| Slice 11 sends docker's own error text to standard error, which stays in the terminal, and puts in the report only the docker step and its exit status | docker's text in the report — the report is copied into the request, and docker's message over `DOCKER_HOST=ssh://…` can carry the server's name or address, which D-13 keeps out of requests | Mariusz has to read the terminal, not only the file, to see the reason |
| Slice 12 keeps the tunnel's H1–H5 and renames the mail's and the saved-game's steps | renaming all three families — the tunnel's names stand also in `backup_and_restore.md`, in `troubleshooting.md`'s section on abandoning the request and in further places, so more files and more references to miss | the tunnel's steps keep a name as generic as before |
| The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) stays as it is, though several cases use it (the orchestrator's answer to the planner's open question) | raising it with item 2 — the task and the review row name only the occupied-port case, and nobody has seen `refusedStart` fail | a later load failure of another case of the same file, to be a remark of a later task |
| Slice 12 changes the text of the measuring section only for items 26 and 27 and leaves the launcher without a signal handler | a signal handler in `scripts/measure-passwords.mjs` that removes the container — the task asks the skill to say how, and a killed terminal or lost connection runs no handler anyway | none |
