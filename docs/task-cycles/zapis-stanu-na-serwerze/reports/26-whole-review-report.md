FAIL ae0d7e2ce1f7ecc2bdfd4a5cb1115d8ac2eb15d7

# Review of the whole change — task `zapis-stanu-na-serwerze`

- Range: `dce2970..ae0d7e2` (15 commits, 35 files, +6289 −224). `git rev-parse HEAD` in the
  worktree is `ae0d7e2ce1f7ecc2bdfd4a5cb1115d8ac2eb15d7`, the head given; `.the-way` at `a8dfe8a`,
  equal to its gitlink, not moved.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`; the frozen task, spec and
  plan read whole; the executors' reports of Slices 4–8 and the Minor findings file read whole.
- Counts: blocking 1 (Important) · Minor 17 · out of scope 4.

## Findings

### Critical

None.

### Important

**I-1. Twelve of the player's acts can lose their moment of saving with every test green**
(Slice 6, `e27ba5f`). Place: `src/browser/view/game-view.ts:111`, `:115`, `:119`, `:123`,
`:127`, `:131`, `:143`, `:181`, `:185`, `:191`, `:206`, `:210` (each act's `act(...)`, and the
`saver.moment()` after `clock.send`); tests: `tests/view/account-screen.test.mjs`,
`tests/view/game-saver.test.mjs`.

What a player sees if this breaks: an edit of a program, a new character, a send to a map,
„Restart” or „Zakończ” is no longer saved right after it is made, only at the next 30-second check
or when the tab hides. To do 7 and D-184 require a save "right after each change of it the player
makes" and name these acts one by one; D-184's *Verification* gives "an edit of a program rule
followed at once by a save request" as the complying example. Today the code is right: I read each
handler, and each goes through `act()` (or the before/after comparison for `send`).

What is wrong is that no test protects it. I ran 14 mutations in a scratch worktree of the head,
each replacing one act's `act(...)` with `store.apply(...)`, or the moment after a send with nothing.
Then I ran `tests/view/account-screen.test.mjs` and `tests/view/game-saver.test.mjs`. Only the
pause (1 failure) and pace (6 failures) mutants were caught. Twelve survived with exit 0:
`editCopy`, `editProgram`, `createProgram`, `renameProgram`, `deleteProgram`, `saveCopy`,
`switchProgram`, creating a character, `pick`, the send, `restart`, `end` (`saveCopyAsNew` and
`discardCopy` not mutated; they have the same wiring). The plan's Slice 6 goal asks the page to call
"a moment after every act of the player whose result changed the state (decision 6's list)" and the
test file to gain "a case for each of these paths". The executor's report says it left this open:
"the cases exercise pace, pause/resume and the end of a map run, not each program-panel and
headquarters act — those pass through `act()` unchanged, left to review" (`reports/18-slice6-report.md`,
*Searches not found or unclear*).

Why it blocks: this wiring is what To do 7 asks for first, and it is the most likely thing to break
when `game-view.ts` changes next. Task 10, 12 and 13 all add acts to the panel and the
headquarters. Fix: one table-driven case in `tests/view/account-screen.test.mjs` (or a game-view
test) that does each listed act once on a built game and asserts that one `saveGame` call is
waiting with that act's state. For `send`, „Restart” and „Zakończ” it needs a map run, and for
`editCopy` a running one. It should also assert that an act whose result leaves the state unchanged
sends nothing.

### Minor

New findings of this review:

- **m-1. A hidden page after a failed save sends nothing while the state is unchanged**
  (Slice 5, `6aae1e7`; `src/browser/view/game-saver.ts:122`, `:192-195`). `sendNow` sets
  `baseline` to the state it sends, before the answer comes back. So after a failed save, the state
  that is not saved counts as "the state last sent". Outside a passing map run (an edit in the
  headquarters, the screen after a death), a tab closed during the 5-second retry wait sends no last
  save, and the edit is lost. D-184 says exactly this ("only where it changed since the save last
  sent"), so the code matches the decision. Against it stands To do 7's „przy zamykaniu albo
  ukrywaniu karty gra próbuje jeszcze jednego zapisu” and what a player would reasonably expect.
  During an outage the last save would fail as well, which keeps the loss small. Fix if wanted:
  treat a failed send as "not sent" for the check (the baseline stays at the last state saved).
  Mandated by the spec and D-184, so not blocking.
- **m-2. `keepalive` on the save request is pinned by no test** (Slice 4, `adb13fb`;
  `src/browser/account-api.ts:373`). Mutant `true` → `false` passes
  `tests/account-api.test.mjs` (exit 0). The executor says so in its report. The reason given is that
  a Node server cannot see the flag on the wire. A test that wraps `globalThis.fetch` and records the
  `init` it is given could pin it without a browser. Without `keepalive`, the save in flight when the
  tab closes is cancelled, which is D-184's „no guarantee” made worse.
- **m-3. The saver's choice to drop a moment made during a logout save is pinned by no test**
  (Slice 5; `src/browser/view/game-saver.ts:183-185`). Mutant `pending = false` → nothing passes
  `tests/view/game-saver.test.mjs`. The choice is the executor's (report 17, *Choices*). If the
  logout then fails, the 30-second check still finds the changed state, so nothing is lost.
- **m-4. D-04 and D-190 name only the saved game state downloaded from the server, but the page
  also loads the document it kept in page memory** (comes from no slice: the plan's *Foundation
  entries* rows 16 and 20; code `src/browser/view/app.ts:259`). After a sign-in to the same
  account, the page builds the game with `loadSavedGame(kept.document)`. That is spec decision 8,
  and spec decision 5 names both inputs. D-04's binding sentence lists what the view passes to the
  simulation: "the player's choices, the passing of real time and the saved game state the browser
  downloaded from the server". D-190 says "an unknown value downloaded from the server". A reader who
  takes that list as closed may read the kept-state path as a breach of D-04. Question 10 of the
  task was asked to avoid exactly that kind of strained reading. The code does what D-04 is for (the
  state changes only through a function of the simulation), and D-188 requires going on from the
  kept state, so this is wording, not behaviour. Fix: add "or the one it kept in page memory
  (D-188)" to both entries, through `the-way-record-decision`.
- **m-5. Typo in a new guideline** (Slice 7, `483f5dc`; `guidelines/coding-saved-game.md:84`):
  „niewolno mniej” should read „nie wolno mniej”.

The Minor findings of the slice reviews (`reports/25-slice-minor-findings.md`), graded as findings
of this review:

- **Slice 1 M1** (`tests/sim/saved-game.test.mjs:699-704`, `:741-742`; `saved-game.ts:376`, `:393`,
  `:426`) — Minor, open. Three crafted cases are refused by a second fault in them, so the checks of
  identities below their counters and of unique identities (decision 5's floor) are unprotected. A
  player can only forge their own save (D-07), and the load still refuses other faults.
- **Slice 1 M2** (`tests/sim/saved-game.test.mjs:479-482`) — Minor, open. The check that the
  argument stays unchanged on the refused path cannot fail. The page drops a refused document, so a
  change to it would reach no player.
- **Slice 1 M3** (`src/browser/sim/saved-game.ts:53-57`) — Minor, open in the code. The comment of
  `SAVED_GAME_VERSION` still names only `GameState` and the items. The guideline now carries the rest
  (`guidelines/coding-saved-game.md`, last paragraph of „Wersja podnoszona razem z kształtem”), as
  the Slice 7 report says.
- **Slice 2 M1** (`src/server/database.ts:101-107`) — Minor, open. STRICT and the two `CHECK (… >= 1)`
  have no test. Step 4 is fixed once H1 deploys it, so a test only guards an edit made before then.
- **Slice 2 M2** (`tests/account-storage.test.mjs:581-653`) — Minor, open. No test shows that step 4
  leaves the other tables and columns alone. Same reasoning as M1.
- **Slice 3 M1** (`src/server/account-routes.ts:353-357`) — Minor, open. The order "block before
  size" in the PUT is held by no test. It shows only for a session row that survived a block.
- **Slice 3 M2** (`src/server/account-routes.ts:335-341`) — Minor, open. GET embeds the stored text.
  It is valid only while the one writer stores `JSON.stringify` of an object.
- **Slice 3 M3**, together with Slice 4 (`src/server/app.ts:69-87`, `src/browser/account-api.ts:384-393`)
  — Minor, open. A 413 from the server's body limit carries no `code`, and the client takes a 413 as
  too large only with `save-too-large`. A 413 without a code would come back as `failed`, with the
  retries and „Gra spróbuje ponownie.”. This client cannot cause one: it measures the same UTF-8
  string the server limits and sends nothing over 65 536 bytes. So it does not happen today.
- **Slice 9 m-1** (`.claude/skills/loop2-deploy/references/setup_and_secrets.md:307`, `:337`) —
  Minor, open. "H1" now has three meanings in that one file: the tunnel's `:34-41`, Outsider's
  `:230` and this task's `:307`.
- **Slice 9 m-2** (`troubleshooting.md:114`, emailed links left out) — fixed in `ae0d7e2`. The
  passage now reads "keeping every account, session, emailed link and saved game state". Withdrawn.
- **Slice 9 m-3** (`.claude/skills/loop2-deploy/SKILL.md:179-180`) — Minor, open. The version-4
  sentence still stands under „Account mail”, where it has nothing to do with mail.
- **Slice 9 fix m-1** (`setup_and_secrets.md:334-336`) — Minor, open. "no save button" and "edit
  and keep a program" sit next to the program panel's „Zapisz…” buttons.
- **Slice 9 fix m-2** (`setup_and_secrets.md:338`) — Minor, open. "an empty team means the save was
  lost" gives a false alarm when the change chosen was a program edit.

Slice 2's lines under *Declined to judge*: the deploy skill still saying version 3 is fixed by
Slice 9 (`59bf3da`, `ae0d7e2`). The 413 `save-too-large` before the write is done by Slice 3.
Neither stands any more. The other two stand below, under **Declined to judge**.

## Against the task

The change meets To do 1–13 and 15. To do 14 and plan row 31 come after H2, outside this range, and
the violated mark stands on purpose. Evidence, item by item:

- To do 1: step 4 is appended (`src/server/database.ts:97-108`). D-112, `account-schema-lifecycle`
  and `account-database-schema` are changed. The move from version 3 to 4 keeps every row
  (`tests/account-storage.test.mjs`, 51 pass).
- To do 2: `GET` and `PUT /api/saved-game` through `fetch()` on a relative path
  (`src/browser/account-api.ts:338-397`).
- To do 3: the session alone authorizes, and an identifier in a request selects nothing. 401
  without a session and for a blocked account (`tests/http.test.mjs:2231-2426`).
- To do 4: 64 KiB for the save route, 16 KiB for the others, at most 64 KiB stored
  (`src/server/account-routes.ts:46-47`, `:310-315`, `:368-370`; `tests/transport.test.mjs`).
- To do 5: one version constant, the refusals `version`, `archetype` and `shape`, and both sentences
  (`src/browser/view/app.ts:27-35`). The server refuses a lower version, and the tab shows
  „Gra została zaktualizowana. Odśwież stronę.” and stops (`game-saver.ts:135-147`).
- To do 6: the game is built only after both answers. An uncertain answer gives the warning and
  „Spróbuj ponownie”, never a new game (mutant A1 caught). A map run that goes on comes back paused,
  and an ended one on its screen. The confirmation notice stands above the game on any screen.
  The program panel shows the copy for a first state that has a map run
  (`src/browser/view/program-panel.ts:104-109`). That change lies outside Slice 6's *Change*. I
  judge it needed by D-189 („the copy open to editing”), small, and tested
  (`tests/view/program-panel.test.mjs:422-431`).
- To do 7: moments, the 30-second check, the hidden page, the sentence that the game retries, the
  retry rhythm, and too large without a retry. All wired; see I-1 and m-1 for their tests.
- To do 8: conflict, then a reload of the server's save, paused, with the sentence until the next
  successful save.
- To do 9: on 401 the state is kept in page memory only. Grep for
  `localStorage|sessionStorage|indexedDB` in `src/browser/` finds nothing; the positive control
  `keepalive` finds `src/browser/account-api.ts`. Sent after a sign-in to the same account, dropped
  for another account (mutant A4 caught).
- To do 10: every outcome of the save before logout (`app.ts:309-352`; mutant A6 caught).
- To do 11 and 12: the load through a function of the simulation; D-04 changed; the exemplar D-190;
  `guidelines/coding-saved-game.md`, the index row, and the sentence of `guidelines/coding.md`
  changed.
- To do 13: all projected entries are written, and their wording matches the task's *Decisions in
  play*. D-96 is merged with row 7. Every row of *Settlements to record* is written: rows 1–10 as
  D-184, D-185, D-186, D-187, D-188, D-97, D-96, D-189 with D-53's rationale, D-104 and D-04.
- To do 15: both copies of the skill are byte-equal (`diff -r`). Every point is there.

Fidelity to the sources: I compared the wording of D-07, D-179, D-180, D-181, D-182, D-183, D-96,
D-156 and the five new invariants with their projected sentences in the task. Nothing was altered
beyond the merges the task orders. D-181 adds the two routes and D-104 the per-route limit, as the
spec and rows give.

Meanings the human must still approve (WAY-172), carried from the Slice 7 report, not a finding:
`guidelines/coding-saved-game.md` as a whole; the same-version refusals in „Wersja podnoszona
razem z kształtem”; the failure wording of `guidelines/coding-browser-module.md`.

## Trust boundaries and the operation that cannot be undone

- `src/server/**`: the Slice 3 review's crafted-input checks hold at the head (`tests/http.test.mjs`
  39 pass, `tests/transport.test.mjs` 10 pass). I read the PUT in full. The order is guards, fields
  (exact keys, safe integers, `game` an object), session (blocked refused), serialization (deep
  nesting is a 400), stored bytes, then one transaction for block, version and revision. No field
  names an account.
- `src/browser/sim/saved-game.ts`, scratch run on crafted documents: nesting 20 000 deep in `game`
  and in `groups`, the key `__proto__`, the archetypes `__proto__` and `toString`, `version` as
  `"1"`, as 2^53, as `null`, as a list and as a text, an identity of 1e300, a duplicate solved map.
  Each was refused with no throw, in under 2 ms. Round trip `savedGame` → JSON →
  `loadSavedGame`: 54 403 states the simulation made (4 programs × 41 seeds, every minute to death
  or minute 700, with `passRealTime`) plus 12 372 more (discoveries from an unknowing game, wolf
  combat in „Las — głębiej”, the headquarters after „Zakończ” with a solved map). Every one loaded
  back equal, the going map run paused. The only refusals came from my own forged streak, which no
  play can reach.
- Schema step 4: the change only prepares it. It is tested on temporary databases. The deploy
  skill's text tells the human. No agent touches the server (D-12).

## Declined to judge

- A player who sends `version: 9007199254740991` stores it, so their own browser's saves read as
  outdated afterwards. This is spec decision 1's contract; it touches only the player's own save
  (D-07). Outside the task.
- The one failure of the cookie case "set and touch refuse unusable cookie input…" (subtest
  "invalid domain") under a mutation in the Slice 2 executor's run. The case is outside the change;
  my run of `tests/account-storage.test.mjs` passed. Cause unknown; outside the task.
- To do 14 and plan row 31 (remove the violated mark after H2) — work after H2, outside the range by
  the plan.
- H1, H2 and the acceptance criterion on the test server — human actions (D-12, D-75). No agent can
  run them.

## Checks

All in a scratch worktree of `ae0d7e2`
(`…\scratchpad\wr`, `node_modules` and `.runs\quality-venv` linked by junction, removed afterwards).
The reviewed worktree, its index and its branch were not changed.

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `node scripts/test-node-file.mjs tests/sim/saved-game.test.mjs` | 0 (13 pass) |
| `… tests/account-api.test.mjs` | 0 (22) |
| `… tests/view/game-saver.test.mjs` | 0 (16) |
| `… tests/view/account-screen.test.mjs` | 0 (34) |
| `… tests/view/program-panel.test.mjs` | 0 (22) |
| `… tests/http.test.mjs` | 0 (39) |
| `… tests/transport.test.mjs` | 0 (10) |
| `… tests/account-storage.test.mjs` | 0 (51) |
| `… tests/startup.test.mjs` | 0 (15) |
| `… tests/view/email-confirmation.test.mjs` | 0 (5) |
| `… tests/view/email-status.test.mjs` | 0 (8) |
| `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 |
| `… tests/invariants/test_simulation_isolation.py` | 0 |
| `… tests/invariants/test_simulation_inputs.py` | 0 |
| `… tests/invariants/test_browser_view_framework.py` | 0 |
| `… tests/invariants/test_browser_view_token_values.py` | 0 |
| `… tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `… tests/invariants/test_account_server_typecheck.py` | 0 |
| `… tests/invariants/test_loop2_api_error_route.py` | 0 |
| `… tests/quality/test_mutation_test_selection.py` | 0 |
| `… tests/quality/test_quality_invariants.py` | 1 on the first run: ruff and shellcheck not found, because the quality venv was not linked yet; 0 after linking `.runs\quality-venv` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| scratch round trip `rtcheck/rt.mjs`, `rtcheck/rt2.mjs` | 54 403 and 12 372 states, 0 failures (except the forged ones described above) |
| scratch crafted documents `rtcheck/crafted.mjs` | each refused, none threw |

Mutation analysis (one mutant at a time, built, then the named file run, then restored):

- `game-view.ts` acts — 14 mutants: pause and pace caught, 12 survived (I-1). The moment at the end
  of a map run (`:161`) caught.
- `app.ts`: a load failure building a new game (A1), a save after a load (A3), the kept state for
  any account (A4), a refused load not saved (A5), too large blocking logout (A6) — all caught.
  The stale-answer guard of the load (A2) survived. It is not reachable: while the waiting screen
  stands, the page offers no control that starts another request. Not a finding. Conflict blocking
  logout (A7) did not build, because of type narrowing.
- `game-saver.ts`: the check sending always (S1), the retry rhythm (S2), the visibility state (S4),
  a moment after outdated (S5), a check during a request (S6) — all caught. Too large retried with a
  wait of `undefined` (S3) survived, because the mock timers never fire such a timeout. The test's
  sentence-and-count asserts cover the real case. A moment during a logout save kept (S7) survived
  (m-3).
- `account-api.ts`: `>` → `>=` at the limit (C2), 401 removed (C3), the exact-key check removed
  (C4) — all caught. `keepalive` removed (C1) survived (m-2).
- A control mutant (`CHECK_MS` 30 000 → 1 000) failed `game-saver.test.mjs`, which shows the harness
  sees failures.

Changed invariant tests: in `tests/account-storage.test.mjs`, the version-1 and version-2 move cases
(`account-schema-lifecycle`, `account-database-schema`) now end at version 4. The "newer unknown
version" case moved from 4 to 5, as spec decision 4 gives.

Not run: the whole gate (`npm test` with no argument), which belongs to the orchestrator. No
screenshot of the header line or of the notices: the foundation names no route for one, as Slice 6
says. The visual check falls to the human's journey at H1 (D-75).

## Selection and reaches

- Parts touched: simulation, browser-view, account-server, build-tools (`stryker.config.json`),
  agent-workflow (guidelines, skills), product-foundation.
- Foundation read: every decision and invariant that the change writes or changes, whole, in the
  diff: D-04, D-07, D-53 (rationale), D-96, D-97, D-104, D-109, D-112, D-138 (by name), D-156,
  D-179–D-190; the invariants changed and new; the environment facts `fetch-keepalive-body-quota`
  and `visibilitychange-hidden-last-event`; the part map whole.
- Guidelines: `guidelines/coding-saved-game.md` whole. The changes to `guidelines/coding.md`,
  `coding-browser-module.md`, `coding-database-access.md`, `coding-simulation-module.md` and
  `testing.md` read in their diffs. `testing.md` § Levels and Rules (opening). `styleguide-browser-view.md`
  § States of shared controls and the roles table.
- Reaches beyond the handoff:
  - `src/browser/sim/game.ts:371-420` (`passRealTime`, `advanceMinutes`) — whether a paused or ended
    run returns the same state object, which the saver's identity check depends on. It does.
  - `src/browser/sim/run.ts:363-370`, `src/browser/sim/data/maps.ts` — what completion needs, for the
    scratch round trip.
  - `tests/sim/acceptance.test.mjs`, `tests/sim/program-fixture.mjs`,
    `tests/sim/understanding-fixture.mjs` — fixtures reused in the scratch scripts.
  - `src/browser/view/program-panel.ts:87-115` — the change outside Slice 6's *Change*.
  - `reports/15-slice3-review-report.md` — which crafted server inputs that review already ran.
  - `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` — the user's rule for scratch scripts.

## Searches not found or unclear

- The handoff says the return should include the changed files with their added and removed line
  counts. The review method (section 4) asks for the first line, the counts and the path. I give
  both in the return.
- No route in the foundation for a screenshot of the running product (Slice 6's search). Confirmed
  by the absence of any `screenshot`/`zrzut` entry the Slice 6 report names; not searched again.
