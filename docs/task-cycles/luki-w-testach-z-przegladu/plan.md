# Plan — loop2: luki w testach, testy padające losowo i znaczniki niezmienników z przeglądu fundamentu

- Task: `.runs/task-cycles/luki-w-testach-z-przegladu/task.md`
- Spec: `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md` (To do 16 only)
- Base: `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| A decision of the departure: the case „a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response” of `tests/http.test.mjs` checks the call of `destroy` and not its effect, because the cut of an answer cannot be seen on Windows, where the gate runs; it narrows D-73, as D-74 … D-273 do | decision (new) | Settlements row 1 · To do 6 · question 2 | Slice 5 names it in `guidelines/testing.md`; held by its own pair of examples, since no test needs to change |
| D-73 — the binding sentence's list of departures names the new decision | decision (changed) | Settlements row 1 · To do 6 | Slice 5 |
| An environment fact: how `express-session` 1.19.0, the version `package-lock.json` pins, makes the session identifier (its generator and the source of its randomness, through `uid-safe` 2.1.5 as the lockfile pins it), with the source quoted | environment fact (new) | Settlements row 3 · To do 14 · question 9 | none of the slices |
| player-opaque-session-cookie — *Rests on* gains the fact above | invariant (changed, *Rests on* only) | Settlements row 3 · To do 14 | none; its check stays the two cases of `tests/transport.test.mjs` that cite it, unchanged |
| sprite-credits — *Method* `review` → `test` | invariant (changed) | Settlements row 2 · To do 5 · question 3 | Slice 4 writes the test that cites it |
| player-express-session-sqlite-store — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 sees its two citing cases of `tests/transport.test.mjs` fail once |
| player-self-registration — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| player-password-login — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| email-verification-nonblocking — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| account-save-durable-storage — *Method* → `test` | invariant (changed) | To do 11 | Slice 1 moves the citation of `test_replaced_container_keeps_accounts_and_sessions` to it |
| loop2-shared-public-origin — *Method* → `test` | invariant (changed) | To do 11 | Slice 4 writes its citation |
| D-112 — *Verification* without `account-schema-lifecycle` | decision (changed) | To do 12 | Slice 2 withdraws that invariant |
| D-29 — binding sentence, *Scope*, *Rationale* and *Rejected*, as the spec's *Foundation entries* gives; *Verification* and the sentence on changing the rule set unchanged | decision (changed) | spec · To do 16 | Slice 15 |
| account-schema-lifecycle — withdrawn into *Withdrawn identifiers* | invariant (withdrawn) | To do 12 | written by Slice 2 with the citations it moves (WAY-69), not by the agent of these entries |
| account-database-schema — its sentence also says "before readiness" and keeps the emailed links | invariant (changed) | To do 12 | written by Slice 2 with the citations of `tests/account-storage.test.mjs` (WAY-69), after Slice 1 moved that of `tests/startup.test.mjs`; check: the cases of `tests/account-storage.test.mjs` and `tests/startup.test.mjs` that cite it |
| eslint-source-rules — sentence names the three directories beside the five parts, *Part* gains agent-workflow | invariant (changed) | spec | written by Slice 15 with its test (WAY-69); check: `tests/quality/test_source_tool_scope.py` and `tests/quality/test_quality_invariants.py` |
| `guidelines/coding.md`, rule *Linter*, the paragraph on the patterns of `eslint.config.mjs` | guideline (coding) | spec | written by Slice 15 |
| `guidelines/testing.md`: the departure named with D-73's others and their count, the *Doubles* of the recipe `integration test` (To do 6), the row of `.github/workflows/deploy.yml` (To do 17) | guideline (testing) | Settlements row 1 · To do 6 · To do 17 | written by Slice 5 |

The agent of these entries writes every row whose last column does not say "written by Slice N";
the rows written by a slice are listed here so that the whole foundation work of the task stands in
one table. It writes D-29 in a commit of its own, apart from its other entries (spec, Decision 6).
It runs `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, since the
six invariants it turns to `test` are cited only once Slices 1 to 4 are made; the run without the
switch reports exactly those six until then, and no slice before Slice 4 counts that report as a
failure of its own.

For the return step, not for the agent of these entries: where Slice 6 reports its test written,
D-382's *Verification* names that test under `tests:` and drops the clause on the rows already drawn
from the pair of examples, as `task-cycle/skill/return_step.md` gives; where Slice 6 writes no test,
D-382 stays as it is.

## Slices

### Slice 1 — the start and the container's replacement cite the invariants that stay

- **Goal:** the case „configured startup refuses unknown schema and unavailable database before
  readiness” of `tests/startup.test.mjs` cites `account-database-schema` in place of
  `account-schema-lifecycle`, and the case `test_replaced_container_keeps_accounts_and_sessions` of
  `tests/deploy/test_account_storage.py` cites `account-save-durable-storage` in its place (To do 11
  and 12), whose *Method* the *Foundation entries* set to `test`. Each case is seen failing once
  against the code it checks broken for a moment — for example the start's reading of the schema
  version in `src/server/database.ts` made to pass an unknown version, and the database path that
  `compose.yaml` gives the `app` service moved outside its volume — and restored byte for byte; the
  report names each break, its command and its red output. The docstring of
  `tests/deploy/test_account_storage.py`, which says `account-save-durable-storage` is checked by
  review and left out, is brought in line with the citation. No product code changes in the slice's
  commits, and `foundations/invariants.md` is not touched here (Slice 2 rewords and withdraws).
- **Change:** `tests/startup.test.mjs` · `tests/deploy/test_account_storage.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-44` To do 11 and 12 ·
  `foundations/invariants.md:768-787` account-schema-lifecycle, account-database-schema ·
  `foundations/invariants.md:688-697` account-save-durable-storage ·
  `foundations/decisions.md:2715-2731` D-112 (its *Verification* as the row of *Foundation entries*
  changes it) · `foundations/decisions.md:2689-2714` D-111 · `foundations/decisions.md:3658-3686` D-205 ·
  `foundations/decisions.md:1776-1801` D-17 · `foundations/decisions.md:1350-1366` D-390 ·
  `foundations/environment_facts.md:366-371` node-sqlite-database ·
  `foundations/environment_facts.md:420-425` docker-volume-lifecycle ·
  `foundations/environment_facts.md:744-761` docker-compose-down-volumes, docker-volume-prune-scope,
  docker-system-prune-volumes · `foundations/part_map.md:66-88` account-server ·
  `foundations/part_map.md:153-188` deployment · `src/server/database.ts` · `compose.yaml` ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — two citations moved, each case seen failing against code broken for a moment and
  restored exactly, one of them in a container.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/startup.test.mjs` ·
  `npm.cmd test -- tests/deploy/test_account_storage.py` (it needs a Docker daemon, which
  `scripts/test.py` asks of `docker_gate`; where none answers, report it not run) ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` passes ·
  `git status --short -- src compose.yaml Dockerfile deploy` shows nothing
- **Depends on:** Foundation entries (D-112's *Verification*, account-save-durable-storage's *Method*)

### Slice 2 — the account database's schema rule in one invariant

- **Goal:** `account-schema-lifecycle` stands in *Withdrawn identifiers* of
  `foundations/invariants.md`, with its successors, and `account-database-schema`'s sentence also
  says that an unknown newer schema is refused before readiness and that emailed links are kept with
  their values on a move (F-30, To do 12), both written through `the-way-record-invariant`; D-112's
  *Verification* already lacks the withdrawn identifier (row of *Foundation entries*). Every line
  `// invariant: account-schema-lifecycle` left in `tests/account-storage.test.mjs` cites
  `account-database-schema` instead, unless that invariant already stands beside it; each case that
  newly cites it is seen failing once against `src/server/database.ts` broken for a moment — such as
  a migration step that drops the emailed links or keeps an unknown version — and restored byte for
  byte; the report names each break, its command and its red output. No product code changes in the
  slice's commits.
- **Change:** `foundations/invariants.md` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:44-44` To do 12 ·
  `foundations/invariants.md:768-787` account-schema-lifecycle, account-database-schema ·
  `foundations/decisions.md:2715-2731` D-112 (its *Verification* as the row of *Foundation entries*
  changes it) · `foundations/environment_facts.md:366-371` node-sqlite-database ·
  `foundations/part_map.md:66-88` account-server · `.the-way/task-cycle/skill/foundation_step.md` ·
  `.the-way/elements/invariants/skill/SKILL.md` · `src/server/database.ts` · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** same — it rewrites two entries and moves nine citations, each newly cited case seen
  failing against code broken for a moment and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/account-storage.test.mjs` · `npm.cmd test -- tests/startup.test.mjs` ·
  `git grep -n "account-schema-lifecycle" -- tests src` finds nothing ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` passes ·
  `python -B .the-way/elements/common/foundation_check.py` reports only the uncited invariants Slices 3
  and 4 cite · `git status --short -- src` shows nothing
- **Depends on:** Foundation entries (D-112's *Verification*) · Slice 1

### Slice 3 — account-server citations: registration, password login, playing before confirmation

- **Goal:** in `tests/http.test.mjs`, the cases that check that anyone creates a player account and
  plays without the operator's approval, that an account signs in with its address and password, and
  that a player plays after registering before confirming the address carry
  `// invariant: player-self-registration`, `// invariant: player-password-login` and
  `// invariant: email-verification-nonblocking` at the case, each on the case that checks the whole
  sentence (for example „registration stores an Argon2id hash of the exact password and signs this
  browser in at once”, „a known address with a wrong password and an unknown address fail login
  identically” and „registration answers 201 with its message's outcome in every case and the player
  stays signed in”; the executor finds the right ones by name); each newly citing case is seen
  failing once against `src/server/` broken for a moment and restored byte for byte. The two cases of
  `tests/transport.test.mjs` that already cite `player-express-session-sqlite-store` are seen failing
  once with the project's Store replaced for a moment by the library's default store, and restored;
  that file is not changed. Where no case checks one of the three sentences whole, the slice adds no
  case and returns `questions` naming the sentence and the nearest case.
- **Change:** `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43` To do 11 ·
  `foundations/invariants.md:608-637` player-self-registration, player-password-login,
  email-verification-nonblocking · `foundations/invariants.md:678-687`
  player-express-session-sqlite-store · `foundations/decisions.md:2857-2871` D-96 ·
  `foundations/decisions.md:3146-3161` D-152 · `foundations/decisions.md:2806-2835` D-202 ·
  `foundations/decisions.md:2601-2613` D-107 · `foundations/environment_facts.md:354-359`
  express-session-store-contract · `tests/transport.test.mjs:773-907` the two cases citing the store ·
  `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — four sentences each need the case that checks them whole and a break of the
  server shown red and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/http.test.mjs` · `npm.cmd test -- tests/transport.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` passes, and the run
  without the switch reports only the invariants Slice 4 cites
- **Depends on:** Foundation entries (the four *Method* rows)

### Slice 4 — browser-view: the packs' credits complete, and the shared origin cited

- **Goal:** `tests/view/icons.test.mjs` holds a case citing `// invariant: sprite-credits` that
  assigns each PNG file directly in `assets/sprites/` to the pack it comes from — Pixel Crawler,
  [LPC] Wolf Animation or Smoke & Fire Animated Particle [16x16], as D-271 gives — and fails naming a
  file with no assignment, and naming each assigned pack whose licence asks for a credit
  (`lpc-wolf-licence`, `smoke-fire-particle-licence`; `pixel-crawler-terms` asks for none) that has no
  line among the credits of the section (Settlements row 2, To do 5); it is seen failing once with a
  PNG file added to `assets/sprites/` for a moment and once with a pack's line taken out of
  `src/browser/view/credits.ts` for a moment, each restored and the added file removed. The cases of
  `tests/account-api.test.mjs` that check a relative `/api/` path and no followed redirect (they cite
  `account-client-requests`) also cite `loop2-shared-public-origin` (To do 11), seen failing once with
  the client's path made absolute in `src/browser/account-api.ts` for a moment and restored. No
  product file and no file of `assets/` changes in the slice's commits.
- **Change:** `tests/view/icons.test.mjs` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:31-31` To do 5 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43` To do 11 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:69-73` question 3 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:136-144` Settlements to record ·
  `foundations/invariants.md:1298-1307` sprite-credits · `foundations/invariants.md:708-717`
  loop2-shared-public-origin · `foundations/invariants.md:818-827` account-client-requests ·
  `foundations/decisions.md:4848-4949` D-271 · `foundations/decisions.md:2614-2626` D-108 ·
  `foundations/decisions.md:641-655` D-117 · `foundations/environment_facts.md:654-659`
  pixel-crawler-terms · `foundations/environment_facts.md:792-803` smoke-fire-particle-licence,
  lpc-wolf-licence · `foundations/environment_facts.md:78-88` cc-by-3-adaptation-credit ·
  `foundations/environment_facts.md:372-377` fetch-same-origin-credentials ·
  `src/browser/view/credits.ts` · `src/browser/account-api.ts` · `foundations/part_map.md:3-31`
  browser-view · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** same — a new test of completeness and a citation, each seen failing against a change
  made for a moment and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/icons.test.mjs` · `npm.cmd test -- tests/account-api.test.mjs` ·
  `git status --short -- assets src` shows nothing ·
  `python -B .the-way/elements/common/foundation_check.py` passes, with no invariant reading `test`
  left uncited
- **Depends on:** Foundation entries (sprite-credits's and loop2-shared-public-origin's *Method*) ·
  Slice 3

### Slice 5 — testing guidelines: the departure for `destroy`, and the deploy workflow's unread forms

- **Goal:** `guidelines/testing.md` names the departure of the row of *Foundation entries* among
  D-73's departures, in *When to read* with their count made right, and the *Doubles* of the recipe
  `integration test` allows checking the call of `destroy` for the one case of `tests/http.test.mjs`
  „a failed renewal after an answer that has ended writes one line of the session and calls no
  destroy on the response”, because the cut of the answer is not seen on Windows, where the gate
  runs, naming the departure's decision (To do 6). The row of `.github/workflows/deploy.yml` under
  *Trust boundaries* also names, among the forms the cases of `tests/deploy/test_deploy_workflow.py`
  do not read and the reviewer reads by hand, a key with a space before its colon and a value with
  `$` written as the escape `\u0024` (To do 17), each verified against the test's reading — by
  reading its code, and where the executor wants, by feeding a crafted copy of the workflow to that
  reading in its own directory under `.runs/`. The wording follows the form of the pinned template and
  the language the file stands in. No test and no code change.
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:32-32` To do 6 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:49-49` To do 17 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:63-68` question 2 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:136-144` Settlements to record ·
  Foundation entries row "A decision of the departure" · `foundations/decisions.md:813-827` D-73 (as
  the row of *Foundation entries* changes it) · `tests/http.test.mjs:5954-5987` the case of destroy ·
  `tests/deploy/test_deploy_workflow.py` · `foundations/invariants.md:1408-1417` deploy-workflow-input ·
  `.the-way/product-guidelines/testing/template.md` · `guidelines/coding.md`
- **Model:** same — it writes into the guidelines what the settlement row, the new decision and
  two items already settle, in the Polish of the file and by the pinned template, and verifies two
  crafted forms against the test's reading (orchestrator's change of the planner's `cheaper`: the
  wording of a guideline and the check of two forms are no mechanical carry-over).
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `npm.cmd test -- tests/deploy/test_deploy_workflow.py` (unchanged, passes)
- **Depends on:** Foundation entries (the departure's decision and D-73)

### Slice 6 — the chronicle: a row already drawn is not drawn again when an entry arrives above it

- **Goal:** `tests/view/tabs-area.test.mjs` holds a case that fails when the `memo` around `Row` in
  `src/browser/view/tabs-area.tsx` is removed: with a window of rows drawn, an entry recorded above
  them draws its own row and draws none of the rows under it again (D-382, its last clause; To do 1).
  The case observes React's draws from the test alone — for example through a hook React reads before
  it loads, or a profiler of the test's own around the area — and adds nothing to `src/`; it is seen
  failing once with the `memo` removed for a moment and restored byte for byte. Where no such
  observation is possible without a change of product code, the slice commits nothing and its report
  says each way tried and why it fails (question 5); the gap stays. The slice writes no foundation
  entry; its report says whether the test stands, for the return step and D-382's *Verification*.
- **Change:** `tests/view/tabs-area.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:27-27` To do 1 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:79-84` question 5 ·
  `foundations/decisions.md:10765-10779` D-382 · `foundations/decisions.md:10443-10518` D-338, D-339 ·
  `foundations/decisions.md:10619-10656` D-343 · `foundations/decisions.md:1228-1349` D-264, D-268 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit · `foundations/glossary.md:260-264`
  chronicle · `src/browser/view/tabs-area.tsx` · `src/browser/view/chronicle.ts` ·
  `tests/view/page-document.mjs` · `foundations/part_map.md:3-31` browser-view ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — it needs a way to see a draw of React from outside the product's code, or
  the evidence that none exists.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/tabs-area.test.mjs` (red with the `memo` removed, green
  restored) · `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 7 — the scene: the wolf's run in through a pause and a resumption

- **Goal:** `tests/view/scene.test.mjs` holds a case in which the player pauses the map run within
  the 300 ms of the wolf's run in and resumes it, and the wolf keeps its run (`data-entering`) through
  the pause and after it until the run's animation ends; the case fails when the half
  `drawing.standing === "paused"` is removed from the condition of `entering` in
  `src/browser/view/scene.tsx` (To do 2), seen failing once with that half removed and restored byte
  for byte. No product code changes.
- **Change:** `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:28-28` To do 2 ·
  `foundations/decisions.md:10864-10990` D-316 · `foundations/decisions.md:11213-11279` D-322 ·
  `foundations/invariants.md:1188-1197`
  document-test-memory-limit · `src/browser/view/scene.tsx` · `tests/view/page-document.mjs` ·
  `foundations/part_map.md:3-31` browser-view · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a new case beside the file's cases of the run in, seen failing against a break
  of the scene restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/scene.test.mjs` (red with the half removed, green restored) ·
  `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 8 — the saved game: a character numbered as the next number is refused

- **Goal:** with `id >= nextCharacterId` of `src/browser/sim/saved-game.ts` made `id > nextCharacterId`
  for a moment, a case of `tests/sim/saved-game.test.mjs` fails: a document valid in everything but one
  character whose number equals `nextCharacterId` is refused whole (To do 3). The executor first runs
  the file with that change: where an existing case or variant of `CRAFTED` already fails on it, the
  report names it with its output and the slice adds nothing; otherwise it adds a named variant or a
  case and shows it failing on the change. The change is restored byte for byte.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:29-29` To do 3 ·
  `foundations/invariants.md:1038-1047` save-version · `foundations/decisions.md:3687-3731` D-206 ·
  `foundations/decisions.md:5840-5865` D-56 · `src/browser/sim/saved-game.ts:495-540` the team's check ·
  `foundations/glossary.md:217-221` generation number · `foundations/part_map.md:33-64` simulation ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — the case must be shown to catch one changed comparison of a trust boundary file,
  restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/sim/saved-game.test.mjs` (red with the comparison changed, green
  restored) · `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 9 — the guards of state-changing requests: a route left off their lists fails the test

- **Goal:** `tests/transport.test.mjs` holds a case, citing `account-mutation-request-guards`, that
  reads from the application `createApp` builds every route it answers with a method other than GET
  and HEAD and fails, naming each, for a route no guard case lists: the eight routes of „refused
  state-changing requests change no account or session and do no password work”, the save route and
  the reset route of their own cases in this file, and the four POST routes of the owner panel guarded
  in `tests/owner-routes.test.mjs` (To do 4). It is seen failing once with a made-up state-changing
  route added to `src/server/account-routes.ts` for a moment and removed byte for byte.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:30-30` To do 4 ·
  `foundations/invariants.md:728-747` owner-panel-authorization, account-mutation-request-guards ·
  `foundations/decisions.md:2564-2584` D-104 · `src/server/app.ts` · `src/server/account-routes.ts:40-70`
  the paths · `src/server/account-routes.ts:405-445` the router · `src/server/owner-routes.ts` ·
  `tests/owner-routes.test.mjs:954-1066` the owner routes' guard case · `foundations/glossary.md:99-109`
  unit test, integration test · `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** same — it reads the routes of the application from the test and shows the case red on a
  route added for a moment.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/transport.test.mjs` (red with the made-up route, green removed) ·
  `npm.cmd test -- tests/owner-routes.test.mjs` · `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 10 — simulation: citations on tests that already check

- **Goal:** the cases of the simulation that To do 8 names cite their invariant in the form
  `foundation_check.py` reads, `// invariant: <identifier>`, at the case: in
  `tests/sim/encounters.test.mjs` the attack that interrupts an action in progress (`action-in-progress`,
  for example „an eligible attack interrupts a long exploration before it finishes”) and the minutes
  of combat compared whole and split (`minute-span-split`, the comment `// Invariant
  minute-span-split:` brought to the form); in `tests/sim/combat.test.mjs` the turn of combat
  (`program-rule-pick`, its two comments `// Invariant program-rule-pick:` brought to the form); in
  `tests/sim/copy-actions.test.mjs` the counts at zero after a switch (`copy-save`); in
  `tests/sim/catch-up.test.mjs` the catch-up that passes an earning loop until it stops
  (`catch-up-minutes`, the clause "until it stops"). Each case is seen failing once against
  `src/browser/sim/` broken for a moment where its clause holds, and restored byte for byte. The
  malformed comments the task does not name (`tests/sim/encounters.test.mjs`, map-run-repeatability
  and restart-seed; `tests/sim/body.test.mjs`, nature-energy-range) stay as they are.
- **Change:** `tests/sim/encounters.test.mjs` · `tests/sim/combat.test.mjs` ·
  `tests/sim/copy-actions.test.mjs` · `tests/sim/catch-up.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40` To do 8 ·
  `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:248-263`
  program-rule-pick · `foundations/invariants.md:528-537` minute-span-split ·
  `foundations/invariants.md:858-867` copy-save · `foundations/invariants.md:1148-1157`
  catch-up-minutes · `foundations/decisions.md:7492-7555` D-20, D-23 · `foundations/decisions.md:6402-6441`
  D-140 · `foundations/decisions.md:5354-5366` D-71 · `foundations/decisions.md:7955-7975` D-171 ·
  `foundations/decisions.md:8425-8478` D-242 · `foundations/decisions.md:8641-8677` D-247 ·
  `foundations/glossary.md:180-184` copy · `foundations/glossary.md:223-239` earning loop, loop,
  catch-up · `foundations/part_map.md:33-64` simulation · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — six citations, each case shown red against a break of the simulation and
  restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/sim/encounters.test.mjs` · `npm.cmd test -- tests/sim/combat.test.mjs` ·
  `npm.cmd test -- tests/sim/copy-actions.test.mjs` · `npm.cmd test -- tests/sim/catch-up.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` · `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 11 — simulation: catch-up and randomness reach a wolf's attack

- **Goal:** the relation of `catch-up-state` in `tests/sim/catch-up.test.mjs` also holds across a span
  in which a wolf attacks the looping character, and the check of `simulation-randomness` in
  `tests/invariants/test_simulation_randomness.py` also runs a map run in which a wolf attacks, so
  that a draw of the attack or of the combat from another source than the seeded generator fails it
  (To do 10); each seen failing once against the simulation broken for a moment — for example the
  draw of the attack taken from another source — and restored byte for byte.
- **Change:** `tests/sim/catch-up.test.mjs` · `tests/invariants/test_simulation_randomness.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:42-42` To do 10 ·
  `foundations/invariants.md:1138-1147` catch-up-state · `foundations/invariants.md:176-186`
  simulation-randomness · `foundations/decisions.md:5243-5286` D-22 · `foundations/decisions.md:6402-6441`
  D-140 · `foundations/decisions.md:5967-5992` D-190 · `foundations/decisions.md:8352-8385` D-240 ·
  `tests/sim/encounters.test.mjs:1-60` how a map run meets an attack · `tests/invariants/program_fixture.py` ·
  `foundations/glossary.md:223-239` earning loop, loop, catch-up · `foundations/part_map.md:33-64`
  simulation · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — two checks widened to a new kind of event, each shown red against a break of
  the simulation and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/sim/catch-up.test.mjs` ·
  `npm.cmd test -- tests/invariants/test_simulation_randomness.py` · `git status --short -- src` shows
  nothing
- **Depends on:** Slice 10

### Slice 12 — simulation: world reference, closed lists and the team through a load and a loop

- **Goal:** the test of `program-world-reference` also reads programs holding the conditions
  `temperatureBelow` and `itemBelow`; `program-closed-lists` is also checked on a program that comes
  through the load of a saved game state and through an earning loop, and `character-team` on the
  states a load and an earning loop give (To do 10); each widened check seen failing once against the
  simulation broken for a moment and restored byte for byte.
- **Change:** `tests/invariants/test_program_world_reference.py` ·
  `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_character_team.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:42-42` To do 10 ·
  `foundations/invariants.md:386-396` program-world-reference · `foundations/invariants.md:364-374`
  program-closed-lists · `foundations/invariants.md:518-527` character-team ·
  `foundations/decisions.md:7582-7612` D-26 · `foundations/decisions.md:7512-7555` D-23 ·
  `foundations/decisions.md:8076-8098` D-50 · `foundations/decisions.md:3687-3731` D-206 ·
  `tests/invariants/program_fixture.py` · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:223-227` earning loop · `foundations/part_map.md:33-64` simulation ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — three checks widened to new inputs, each shown red against a break restored
  exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/invariants/test_program_world_reference.py` ·
  `npm.cmd test -- tests/invariants/test_program_closed_lists.py` ·
  `npm.cmd test -- tests/invariants/test_character_team.py` · `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 13 — build-tools: the audit's unreadable report cited, and a fixed case of the import check

- **Goal:** the check of an unreadable report of the audit that
  `test_audits_only_a_lockfile_changed_from_the_fork_point` holds, in
  `tests/quality/test_audit_dependencies.py`, cites `dependency-audit-refusal` (To do 8), seen failing
  once with the refusal of an unreadable report in `scripts/audit_dependencies.py` broken for a moment
  and restored byte for byte; and `tests/invariants/test_cross_part_imports.py` holds a fixed case,
  citing `cross-part-imports`, that gives the check a made-up import from a file of one part into a
  file of a part its *Depends on* does not name and expects the check to report it (To do 15,
  question 10), seen failing once with the refusal of the check broken for a moment and restored.
  Where an existing control case already does exactly that, the report names it and the slice cites
  it instead of adding one.
- **Change:** `tests/quality/test_audit_dependencies.py` · `tests/invariants/test_cross_part_imports.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40` To do 8 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:47-47` To do 15 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:105-109` question 10 ·
  `foundations/invariants.md:548-557` dependency-audit-refusal · `foundations/invariants.md:1238-1247`
  cross-part-imports · `foundations/decisions.md:506-520` D-33 · `foundations/decisions.md:903-917` D-79 ·
  `foundations/decisions.md:701-750` D-351 · `scripts/audit_dependencies.py` ·
  `foundations/part_map.md:90-124` build-tools · `foundations/part_map.md:190-198` test-helpers ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a citation and a control case, each shown red against a break restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/quality/test_audit_dependencies.py` ·
  `npm.cmd test -- tests/invariants/test_cross_part_imports.py` · `git status --short -- scripts` shows
  nothing
- **Depends on:** none

### Slice 14 — the account server's default address under a fully configured start

- **Goal:** `tests/invariants/test_account_server_default_address.py` holds a second case, citing
  `account-server-default-address`, that starts the built server with every account setting valid —
  database path, session secret file, public origin, proxy mode, mail settings and the SMTP password
  file, all in a temporary directory — and neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT`, and
  expects what the first case expects: the readiness line on `127.0.0.1:3000`, or an exit with a
  non-zero code naming that address in use (To do 9, the clause "fully configured valid startup");
  seen failing once with the server's default address changed for a moment and restored byte for
  byte.
- **Change:** `tests/invariants/test_account_server_default_address.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:41-41` To do 9 ·
  `foundations/invariants.md:508-517` account-server-default-address · `foundations/invariants.md:758-767`
  account-startup-configuration · `foundations/decisions.md:2689-2714` D-111 ·
  `foundations/decisions.md:1042-1056` D-49 · `tests/startup.test.mjs:42-108` the settings of a start ·
  `tests/startup.test.mjs:459-498` a full valid set of settings · `tests/invariants/loop2_invariant_support.py:1-300`
  the copy, the processes and the server · `tests/invariants/test_account_server_occupied_address.py` ·
  `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a smoke case beside an existing one, shown red against a break restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/invariants/test_account_server_default_address.py` ·
  `git status --short -- src` shows nothing
- **Depends on:** none

### Slice 15 — the JavaScript lint rules reach the session-start hook and the play skill's scripts

- **Goal:** as the spec settles it, in commits holding nothing but To do 16: the ESLint case of
  `tests/quality/test_source_tool_scope.py` checks a list of its own — the files of the five parts and
  every script file under `.claude/hooks/`, `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`,
  the three written as plain path prefixes — and fails when one of the three yields no script file;
  it is seen red first on the configuration as it stands, naming the seven files. Then
  `eslint.config.mjs` gives those directories' script files `recommended` and the globals of Node.js,
  joining neither the TypeScript patterns nor the programs; the ESLint case of
  `tests/quality/test_quality_invariants.py` is seen red on the two `POINTS` reports; `POINTS` is
  removed from both copies of `compose-state.mjs`, which stay byte for byte the same, with no change
  of what the script prints. `eslint-source-rules` names the three directories and gains agent-workflow
  in *Part*, through `the-way-record-invariant`; the paragraph on the patterns under *Linter* in
  `guidelines/coding.md` says the new scope, in the form of the pinned template. The Prettier and LF
  cases, `PRETTIER_PATTERNS`, `.gitattributes`, the hook, `frames.js` and `save-frames.mjs` stay as
  they are. D-29 is the row of *Foundation entries*.
- **Change:** `eslint.config.mjs` · `tests/quality/test_source_tool_scope.py` ·
  `.claude/skills/loop2-play/compose-state.mjs` · `.agents/skills/loop2-play/compose-state.mjs` ·
  `foundations/invariants.md` · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:48-48` To do 16 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md` · `foundations/decisions.md:446-460` D-29 (as
  the row of *Foundation entries* changes it) · `foundations/decisions.md:491-505` D-32 ·
  `foundations/decisions.md:431-445` D-28 · `foundations/decisions.md:948-962` D-83 ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `tests/quality/eslint-rule-sets.mjs` · `tests/quality/test_quality_invariants.py` ·
  `tests/invariants/loop2_invariant_support.py:1-117` the listing of files and their parts ·
  `.claude/skills/loop2-play/SKILL.md` · `.claude/skills/loop2-play/frames.js` ·
  `.claude/skills/loop2-play/save-frames.mjs` · `.claude/hooks/the-way-pin-check.mjs` ·
  `tests/agent_workflow/test_loop2_play_skill.py` · `foundations/part_map.md:90-143` build-tools,
  agent-workflow · `.the-way/elements/invariants/skill/SKILL.md` ·
  `.the-way/product-guidelines/coding/template.md` · `.the-way/product-guidelines/coding/SKILL.md` ·
  `.the-way/task-cycle/skill/foundation_step.md` · `guidelines/testing.md`
- **Model:** same — the spec settles every choice, but the slice writes an invariant through its
  skill, changes a test of the scope of a trust-boundary-adjacent tool configuration and a guideline
  paragraph (orchestrator's change of the planner's `cheaper`).
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/quality/test_source_tool_scope.py` (red first, naming the seven
  files; green after the configuration) · `npm.cmd test -- tests/quality/test_quality_invariants.py`
  (red on the two `POINTS` reports; green after the removal) · `npm.cmd run build`, then
  `node .claude/skills/loop2-play/compose-state.mjs` and `node .agents/skills/loop2-play/compose-state.mjs`
  each end with code 0 and print one document that `loadSavedGame` of `dist/browser/sim/saved-game.js`
  loads without refusal · `cmp .claude/skills/loop2-play/compose-state.mjs .agents/skills/loop2-play/compose-state.mjs` ·
  `npm.cmd test -- tests/agent_workflow/test_loop2_play_skill.py` ·
  `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py`
- **Depends on:** Foundation entries (D-29) · Slice 2 (`foundations/invariants.md`)

### Slice 16 — the six tests of the server's scripts run with Git's bash

- **Goal:** each of the six files that check `loop2-deploy-trigger-input`, `loop2-deploy-keeps-running`,
  `loop2-deploy-log-dump`, `account-save-backup-encrypted`, `account-save-backup-failure-notice` and
  `failure-watcher-message` runs on this computer with the bash of Git for Windows
  (`the Git for Windows installation\bin\bash.exe`, the one `deploy_script_support.git_bash` finds) and passes, no
  case skipped for want of bash (To do 13). The report gives, for each file, the command, its exit
  code, the number of tests run and skipped and the result, for the orchestrator to copy into the
  cycle record. A failure is diagnosed and repaired in the test or its support file; where its cause
  lies in a script under `deploy/`, the slice changes no file of `deploy/` and returns `blocked`,
  naming the cause and the repair, so that the repair gets a slice and a review of its own.
- **Change:** `tests/invariants/test_loop2_deploy_trigger_input.py` ·
  `tests/invariants/test_loop2_deploy_keeps_running.py` · `tests/deploy/test_loop2_deploy_dump.py` ·
  `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_account_save_backup_failure_notice.py` · `tests/deploy/test_loop2_watch_message.py` ·
  `tests/deploy/deploy_script_support.py` · `tests/deploy/backup_script_support.py` ·
  `tests/deploy/watch_script_support.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:45-45` To do 13 ·
  `foundations/invariants.md:125-144` loop2-deploy-trigger-input, loop2-deploy-keeps-running ·
  `foundations/invariants.md:1248-1267` loop2-deploy-log-dump, failure-watcher-message ·
  `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice ·
  `foundations/decisions.md:2378-2404` D-235 · `foundations/environment_facts.md:9-14`
  openssh-authorized-keys-options · `foundations/environment_facts.md:492-503` mikrus-pusher-mail,
  age-file-encryption · `deploy/loop2-deploy` · `deploy/loop2-backup` · `deploy/loop2-watch` ·
  `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — six runs to read and record, and a failure on Windows to diagnose where one
  comes.
- **Risk:** none
- **Checks:** `npm.cmd test -- <file>` for each of the six files, each with its exit code and counts
  in the report · `git status --short -- deploy` shows nothing
- **Depends on:** none

### Slice 17 — flaky: the mailer's shortened deadline

- **Goal:** the cause of the failure of „a server that stops answering yields failed within the
  shortened deadline and loses the connection” in `tests/account-mail.test.mjs` (To do 7, first
  test; one full run in three in loop2#79) is established, not guessed: the case runs at least 30
  times in separate processes, alone and with the computer under the load of other tests running at
  the same time, every run counted; the cause found is shown by its evidence (the run that failed,
  what it measured, a reproduction that fails on purpose) and repaired where it lies — the case's own
  waiting, or the mailer's handling of its deadline in `src/server/account-mail.ts` — and the case
  then passes at least 30 further separate runs. A repair gives its cause as the reason of every
  changed wait or limit (*Changing an existing test*); no limit is lengthened without one. Where the
  failure does not come back, the slice changes no file and its report gives every attempt — count,
  conditions, results — and says the case needs the orchestrator's 3 full gate runs under load
  (acceptance criterion).
- **Change:** `tests/account-mail.test.mjs` · `src/server/account-mail.ts`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-34` To do 7, the mailer ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `foundations/decisions.md:3297-3326` D-162, D-163 · `foundations/decisions.md:3178-3190` D-154 ·
  `foundations/decisions.md:963-977` D-84 · `foundations/invariants.md:938-947`
  account-email-nodemailer-starttls · `foundations/environment_facts.md:444-449` nodemailer-require-tls ·
  `guidelines/coding-mail-sending.md` · `foundations/part_map.md:66-88` account-server ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once in three full runs has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `src/server/**` (`src/server/account-mail.ts`, where the cause lies there)
- **Checks:** `npm.cmd run build` once, then the case alone at least 30 times as
  `node --test --test-name-pattern="a server that stops answering" tests/account-mail.test.mjs`, each
  a process of its own, with the count of passes and failures in the report · the same under load ·
  `npm.cmd test -- tests/account-mail.test.mjs`
- **Depends on:** none

### Slice 18 — flaky: the transport refusal under the helper's fixed deadline

- **Goal:** the cause of the failure of „transport refuses ambiguous proxy metadata before loading
  live sessions” in `tests/transport.test.mjs` — `HTTP deadline exceeded` after 7678 ms against the
  5000 ms of the file's helper of requests, in a full run on `76389bff` (To do 7, fifth test) — is
  established as in Slice 17: at least 30 separate runs of the case, alone and under the load of other
  tests running at the same time, every run counted; the probable cause the task names (a fixed
  deadline of 5 s under the load of a full run) is confirmed or refuted by evidence, and a repair
  lies where the cause lies and gives it as its reason (*Changing an existing test*; D-84's waits with
  a limit); the case then passes at least 30 further separate runs. A cause found in `src/server/`
  changes no file of it: the slice returns `blocked` naming the cause, for a slice with a review of its
  own. Where the failure does not come back, nothing changes and the report gives every attempt and
  says the case needs the orchestrator's 3 full gate runs under load.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33` To do 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:38-38` the transport test ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `foundations/decisions.md:963-977` D-84 · `foundations/decisions.md:1042-1056` D-49 ·
  `foundations/decisions.md:2662-2688` D-110 · `foundations/invariants.md:748-757`
  account-request-transport · `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once has to be found and shown, not guessed.
- **Risk:** none
- **Checks:** `npm.cmd run build` once, then the case alone at least 30 times as
  `node --test --test-name-pattern="transport refuses ambiguous proxy metadata" tests/transport.test.mjs`,
  each a process of its own, counted · the same under load · `npm.cmd test -- tests/transport.test.mjs`
- **Depends on:** Slice 9 (`tests/transport.test.mjs`)

### Slice 19 — flaky: the failure watcher's window under a clock that stands still

- **Goal:** the cause of the failure of `TheWindow.test_a_clock_that_stands_still_reads_no_window` in
  `tests/deploy/test_loop2_watch.py` — once on an unchanged base in loop2#87 (To do 7, second test;
  its log stands in `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, about lines
  2509–2580) — is established as in Slice 17, with at least 30 separate runs of the case, alone and
  under load, every run counted, and repaired where the cause lies: the case, the support of the
  watcher's stand-ins or the watcher `deploy/loop2-watch`; the case then passes at least 30 further
  separate runs, and `tests/deploy/test_loop2_watch_message.py` still passes. Where the failure does not
  come back, nothing changes and the report gives every attempt and says the case needs the
  orchestrator's 3 full gate runs under load.
- **Change:** `tests/deploy/test_loop2_watch.py` · `tests/deploy/watch_script_support.py` ·
  `deploy/loop2-watch`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-35` To do 7, the watcher ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:113-116` Context ·
  `foundations/decisions.md:2058-2076` D-356 · `foundations/decisions.md:2378-2404` D-235 ·
  `foundations/invariants.md:1258-1267` failure-watcher-message · `foundations/environment_facts.md:492-497`
  mikrus-pusher-mail · `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once on an unchanged base has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `deploy/**` (`deploy/loop2-watch`, where the cause lies there)
- **Checks:** the case alone at least 30 times, each a process of its own, through a runner in the
  executor's directory under `.runs/` that adds the paths `scripts/test.py` adds, counted · the same
  under load · `npm.cmd test -- tests/deploy/test_loop2_watch.py` ·
  `npm.cmd test -- tests/deploy/test_loop2_watch_message.py`
- **Depends on:** Slice 16 (`tests/deploy/watch_script_support.py`)

### Slice 20 — flaky: the backup's trapped signal named by its exit code

- **Goal:** the cause of the failure of
  `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too` in
  `tests/invariants/test_account_save_backup_failure_notice.py` — "0 != 130", once on an unchanged
  base in loop2#87 (To do 7, third test; its log as in Slice 19) — is established as in Slice 17, with
  at least 30 separate runs of the case under Git's bash, alone and under load, every run counted, and
  repaired where the cause lies: the case, the support of the backup's stand-ins or the backup script
  `deploy/loop2-backup`; the case then passes at least 30 further separate runs, and the other cases of
  the file and `tests/invariants/test_account_save_backup_encrypted.py` still pass. Where the failure
  does not come back, nothing changes and the report gives every attempt and says the case needs the
  orchestrator's 3 full gate runs under load.
- **Change:** `tests/invariants/test_account_save_backup_failure_notice.py` ·
  `tests/deploy/backup_script_support.py` · `deploy/loop2-backup`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-36` To do 7, the backup ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:113-116` Context ·
  `foundations/decisions.md:2266-2326` D-233 · `foundations/decisions.md:2378-2404` D-235 ·
  `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice ·
  `foundations/environment_facts.md:492-497` mikrus-pusher-mail · `foundations/part_map.md:153-188`
  deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once on an unchanged base has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `deploy/**` (`deploy/loop2-backup`, where the cause lies there)
- **Checks:** the case alone at least 30 times, each a process of its own, through a runner in the
  executor's directory under `.runs/` that adds the paths `scripts/test.py` adds, counted · the same
  under load · `npm.cmd test -- tests/invariants/test_account_save_backup_failure_notice.py` ·
  `npm.cmd test -- tests/invariants/test_account_save_backup_encrypted.py`
- **Depends on:** Slice 16 (`tests/invariants/test_account_save_backup_failure_notice.py`,
  `tests/deploy/backup_script_support.py`)

### Slice 21 — flaky: the container's one listening process killed with code 137

- **Goal:** the cause of the code 137 of `test_running_container_has_one_listening_node_process` in
  `tests/invariants/test_loop2_one_serving_process_container.py`, at the limit of 512 MiB in loop2#78
  (To do 7, fourth test), is established as in Slice 17, with at least 30 separate runs of the case,
  alone and under load, every run counted (the case needs a Docker daemon, which `scripts/test.py` asks
  of `docker_gate`; where none answers, the runs are reported not run), and repaired in the case or in
  `tests/invariants/account_container_support.py` where the cause lies there; the case then passes at
  least 30 further separate runs. The memory limit of 512 MiB, `compose.yaml` and the `Dockerfile` are
  not changed: a cause whose repair needs one of them, or a change of what D-106, D-113, D-390 or
  D-406 say, returns `blocked` naming it. Where the failure does not come back, nothing changes and the
  report gives every attempt and says the case needs the orchestrator's 3 full gate runs under load.
- **Change:** `tests/invariants/test_loop2_one_serving_process_container.py` ·
  `tests/invariants/account_container_support.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33` To do 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:37-37` the container test ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-99` questions 7 and 8 ·
  `foundations/invariants.md:55-64` loop2-one-serving-process · `foundations/decisions.md:2585-2600` D-106 ·
  `foundations/decisions.md:581-595` D-113 · `foundations/decisions.md:1350-1396` D-390, D-391, D-392 ·
  `foundations/decisions.md:1412-1426` D-406 · `foundations/environment_facts.md:414-419`
  cgroup-memory-accounting · `compose.yaml` · `Dockerfile` · `scripts/docker_gate.py` ·
  `tests/invariants/loop2_invariant_support.py:1-300` · `foundations/part_map.md:153-188` deployment ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a kill seen once in a container has to be found and shown, not
  guessed.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/invariants/test_loop2_one_serving_process_container.py` at least
  30 times, each a process of its own, counted, alone and under load · `git status --short -- compose.yaml Dockerfile`
  shows nothing
- **Depends on:** none

### Slice 22 — flaky: the built image's icons when Docker could not begin the build

- **Goal:** the cause of the failure of `test_built_image_serves_every_icon_and_the_page` in
  `tests/deploy/test_loop2_image_icons.py` — Docker did not begin the build because its settings file
  was held by another process while a second full run of the tests ran at the same time (To do 7,
  sixth test) — is established as in Slice 17: at least 30 separate runs of the file, and runs of two
  focused runs of it at the same time from a stopped Docker Desktop, every run counted (a Docker
  daemon through `docker_gate`; where none answers, reported not run); the repair lies where the cause
  lies — the case, or the start of Docker Desktop in `scripts/docker_gate.py` with its test
  `tests/quality/test_docker_gate.py` — and the file then passes at least 30 further separate runs. A
  repair that changes what D-390, D-391, D-392 or D-406 say returns `blocked` naming it. A cause in
  Docker Desktop alone, which no file of the repository can answer, leaves every file unchanged, and
  the report says so with its evidence and that the case needs the orchestrator's 3 full gate runs
  under load.
- **Change:** `tests/deploy/test_loop2_image_icons.py` · `scripts/docker_gate.py` ·
  `tests/quality/test_docker_gate.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33` To do 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:39-39` the image test ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-99` questions 7 and 8 ·
  `foundations/decisions.md:1350-1396` D-390, D-391, D-392 · `foundations/decisions.md:1412-1426` D-406 ·
  `foundations/invariants.md:1308-1317` gate-docker-start-waits-once · `foundations/invariants.md:343-353`
  loop2-container-icons · `foundations/environment_facts.md:804-809` docker-desktop-start-detach ·
  `foundations/environment_facts.md:888-893` windows-file-lock-release-at-process-end ·
  `tests/quality/docker_standin.py` · `foundations/part_map.md:90-124` build-tools ·
  `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once between two runs at the same time has to be
  found and shown, not guessed.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/deploy/test_loop2_image_icons.py` at least 30 times, each a
  process of its own, counted, and in pairs at the same time · `npm.cmd test -- tests/quality/test_docker_gate.py`
- **Depends on:** none

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — the row of the chronicle not drawn again | Slice 6; D-382's *Verification* by the return step where the test stands |
| To do 2 — pause and resumption in the wolf's run in | Slice 7 |
| To do 3 — a character numbered as the next number refused | Slice 8 |
| To do 4 — a state-changing route off the guards' lists fails the test | Slice 9 |
| To do 5 — completeness of the packs' credits, `sprite-credits` by test | Slice 4 · Foundation entries (sprite-credits *Method*) |
| To do 6 — the `destroy` departure in the guidelines and in D-73 | Foundation entries (the departure's decision, D-73) · Slice 5 |
| To do 7 — the cause and repair of each of the six flaky tests | Slices 17 (mailer), 19 (watcher), 20 (backup), 21 (container), 18 (transport), 22 (image) |
| To do 8 — citations on tests that already check | Slice 10 (simulation) · Slice 13 (`dependency-audit-refusal`) |
| To do 9 — the default address under a fully configured start | Slice 14 |
| To do 10 — tests as wide as the sentence | Slice 11 (catch-up-state, simulation-randomness) · Slice 12 (program-world-reference, program-closed-lists, character-team) |
| To do 11 — `test` and citations for six invariants | Foundation entries (six *Method* rows) · Slice 1 (account-save-durable-storage) · Slice 3 (player-express-session-sqlite-store, player-self-registration, player-password-login, email-verification-nonblocking) · Slice 4 (loop2-shared-public-origin) |
| To do 12 — `account-schema-lifecycle` withdrawn, `account-database-schema` reworded, citations moved, D-112 | Foundation entries (D-112) · Slice 1 (the citation of `tests/startup.test.mjs`) · Slice 2 |
| To do 13 — six tests run with Git's bash, result recorded, failure repaired | Slice 16; its report's results copied by the orchestrator into the cycle record |
| To do 14 — the environment fact of `express-session`'s identifier under `player-opaque-session-cookie` | Foundation entries (the fact; its *Rests on*) |
| To do 15 — a fixed case of `cross-part-imports` | Slice 13 |
| To do 16 — ESLint on the session-start hook and the play skill's scripts | Foundation entries (D-29, own commit) · Slice 15 |
| To do 17 — the row of `deploy.yml` in `guidelines/testing.md` | Slice 5 |
| Acceptance criterion — a flaky test not reproduced in 30 runs and 3 full gate runs stays unchanged, described, with a line for its next occurrence | Slices 17–22 (31 separate runs, unchanged files where not reproduced, report of attempts); the 3 full gate runs under load, the request's description and the line on the task list are the orchestrator's |
| Settlements row 1 | Foundation entries (the departure's decision, D-73) · Slice 5 |
| Settlements row 2 | Foundation entries (sprite-credits *Method*) · Slice 4 |
| Settlements row 3 | Foundation entries (the fact, player-opaque-session-cookie's *Rests on*) |
| Spec: D-29, `eslint-source-rules`, the *Linter* paragraph, commits of their own | Foundation entries (D-29) · Slice 15 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Entries whose writing breaks the foundation check until their citations move — the withdrawal of `account-schema-lifecycle`, the new sentence of `account-database-schema`, the new sentence of `eslint-source-rules` — are written by the slice that moves their citations (WAY-69); the `test` methods and every change of `foundations/decisions.md` stand in *Foundation entries*, and Slices 1–4, which write the citations, come first | every entry in *Foundation entries* — the check reports a withdrawn invariant cited from the foundation step to Slice 2; every entry in its slice — a slice changing `foundations/decisions.md` (1.26 MB) cannot be measured by `slice_size.py` and would read the whole log | the foundation check's report of uncited `test` invariants stands between the foundation step and Slice 4, read by the agents in between as expected; one extra writer of `foundations/invariants.md` (Slices 2 and 15), kept in order by *Depends on* |
| D-382's *Verification* is left to the return step and written only where Slice 6's test stands | the foundation step writes it before the test is known to be possible | where the return step misses it, D-382 says no test holds the clause a test now holds; the record of Slice 6 shows it |
| The `destroy` departure is a decision of its own that narrows D-73 and is named in D-73's list, as the ten departures are | the departure written into D-73's text alone | a different shape from the ten others if the writer of the decision judges D-73 alone better; the foundation step's skill decides the wording |
| D-29 is written by the agent of *Foundation entries* in a commit of its own, and the rest of To do 16 stands in Slice 15's commits, so that reverting those commits takes the whole item back (spec, Decision 6) | D-29 in Slice 15 — the slice could not be measured, since it would change `foundations/decisions.md` | a human who refuses To do 16 at the merge reverts two places (the foundation commit and Slice 15's range) instead of one |
| The citation of `loop2-shared-public-origin` in `tests/account-api.test.mjs` goes with the sprite credits' test in Slice 4, both browser-view test files, so the styleguide is read once | a slice of its own for one citation | a reviewer judges two unrelated citations of browser-view tests in one slice |
| To do 7 is cut into one slice for each test, each on the strongest model, with 30 separate runs as focused checks and the 3 full gate runs left to the orchestrator; a cause whose repair needs a decision changed (the 512 MiB limit, D-390, D-406) or a file of `src/server/` the slice does not name returns `blocked` | one slice for all six — six unrelated diagnoses no reviewer could judge apart; repairing such a cause in the slice — a change of a decision no one accepted | a cause shared by two tests (load of a full run) is diagnosed twice; a `blocked` slice adds a planned repair later |
| To do 13 comes before the flaky slices of the watcher and the backup, which change files it may change (`watch_script_support.py`, `backup_script_support.py`, the backup's test) | the flaky slices first | a repair of Slice 16 reshapes what Slices 19 and 20 diagnose; the order makes them read it |
| To do 10 is cut into two slices: the wolf's attack (Slice 11) and conditions, a load and a loop (Slice 12) | one slice for the five invariants | two slices to review instead of one |
| The malformed comments the task does not name (`tests/sim/encounters.test.mjs`, map-run-repeatability and restart-seed; `tests/sim/body.test.mjs`, nature-energy-range) stay | correct them in Slice 10 | their invariants stay without that citation; the report gives them as findings outside the task |
| No moving slice: `guidelines/coding.md` holds no rule of size, so the rule of size asks nothing of this plan | a moving slice | none today; the guideline's gap is reported |
