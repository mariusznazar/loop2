# Author report — Plan wyprawy

Status: done

Worktree: `C:/Storage/repos/loop2-wt/plan-wyprawy`; branch `task/plan-wyprawy`.
Base: `dce297060aeec3154e50593ee400c28b98649435`. Head: `c39e10ca539ee79048d6989f1287582119751c8c`.
Pinned the-way: `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`, matched gitlink before work.
Scope: the whole change as one author, frozen `../task.md`, no spec or slice plan. No unresolved product question. No push or PR by author.

## Implementation and requirement coverage

Program has required ordered `tripPlan.take` and `tripPlan.bring` lists. `emptyProgram` supplies both empty. Program validation accepts unique catalog items per list, positive integer counts without a gameplay maximum, and rejects campfire. Both library and live-copy editors use the same component. Copies, save, overwrite conflict detection and discard carry the entire program; progress reset compares only rule/group content and identity counters.

`trip.ts` performs ordered allocation with partial last entries, stock shortage, carrying capacity and independent optional map caps. Entry transfers happen before minute-zero rule selection. The game owns shared-chest updates and stores a separate bring-list snapshot on each run. Completion stores the actual deposit once. The old backpack remains visible on the terminal screen, consistent with existing terminal presentation, but cannot be reused or returned on end/restart. Death pays nothing. All starts/completions currently transfer even for already-solved maps, as explicitly accepted until task 14.

| Frozen task To do | Implementation and evidence |
|---|---|
| 1 | Required type, emptyProgram, copied program; program/copy/editor regressions and strict-validation test. |
| 2 | Plan below rule groups; shared select, number field and buttons; native browser checks in HQ, active and terminal editor. |
| 3 | Repertoire items filtered to backpack item catalog; per-list uniqueness, first available item, exhausted/empty disabled Add. Invalid draft remains visible and model keeps previous value. Four view tests plus native input/focus checks. |
| 4 | `startRun` calls `takeTrip` before `newMapRun`; restart uses current unsaved copy/current chest. Ordered entry, shortages, zero cap, minute-zero first-action and immutable-input assertions. |
| 5 | Only completion calls deposit from frozen snapshot; partial ordered allocation, chest-free clipping, once-only deposit, leftovers/end/death/restart tests. |
| 6 | Optional `carryIn`/`carryOut` map fields; neither MVP map sets them. Boundary-only clipping, independent/zero caps and both warning locations tested. Actual gathering with lower map caps tested separately below. |
| 7 | BALANCE chestCapacity 60; HQ actual count/cap heading and empty state inspected. Chest-free allocation tested. |
| 8 | Changing program during a run leaves frozen bring snapshot; tested including an already-solved manual map. |
| 9 | Plan-only copy edit/discard preserves streak, defeated encounters and rule counts. Dirty/save-as/overwrite and saved-edit isolation tested. Rules still reset under existing tests. |
| 10 | Shared trip calculation drives live preview; actual deposited entries drive stable result text. Empty/different/same snapshot, chest clipping, death, completion and placement checked by tests and rendered browser states. |

## Foundation return: settlements and projected entries

Written via the project foundation skills and their pinned element methods. New invariants have behavior tests, observed assertion failures and restored green runs. No environment fact or part-map edit was needed: new files match existing claims and no responsibility, dependency or trust boundary changed.

| Settlement | Entry | Meaning in Polish for return to human |
|---|---|---|
| 1 | D-180 | Plan wyprawy układa się pod grupami reguł w dwóch listach z wyborem przedmiotu, liczbą, zmianą kolejności i usuwaniem. |
| 2 | D-181 | Przedmiot występuje raz na każdej liście; liczba jest dodatnia i całkowita, a błędny wpis zostaje widoczny bez zmiany poprzedniej poprawnej liczby. |
| 3 | D-182 | Program nowej gry i nowy program mają puste listy planu wyprawy. |
| 4 | D-183 | Zakończenie lub restart bez domknięcia nie oddaje plecaka; przy domknięciu reszta spoza wynoszonego łupu przepada. |
| 5 | D-131, D-136 | Edycja lub porzucenie samego planu wyprawy zostawia passę i liczbę pokonanych napaści. |
| 6 | D-184 | Siedziba pokazuje liczbę sztuk w skrzynce i jej pułap także wtedy, gdy jest pusta. |
| 7 | D-185 | Wynik domknięcia pokazuje faktyczny łup pod odkryciem i spotkaniem, nad ciałem i plecakiem, aż do restartu lub zakończenia. |
| 8 | D-186 | Pod plecakiem widać przewidywany łup z zamrożonego planu; linia uwzględnia obecny plecak i wolną skrzynkę, a znika po śmierci i domknięciu. |
| 9 | D-187 | Mapa ma osobne opcjonalne pułapy wejścia i wyjścia; podczas zbierania plecak nadal ogranicza udźwig postaci. |
| 10 | D-188 | Ostrzeżenie przy wysłaniu i restarcie pojawia się tylko wtedy, gdy wejście dodatkowo przycina mapa. |
| 11 | D-189 | Obecnie każdy start pobiera wyposażenie, a każde domknięcie odkłada łup, również na mapie już rozwiązanej. |

| Projected/carried entry | Recorded part and boundary |
|---|---|
| How do items go into a map run and out of it? | D-179: approved binding paragraph preserved, ordered take/bring, frozen bring snapshot, entry/exit caps and prior warning; `trip-transfer` verifies current behavior. The paragraph's eventual solved-map exception is qualified by current D-189 settlement 11; task 14 supplies that exception. |
| Whose is the chest? | D-50 updated to team chest with total piece capacity, same capacity rule as backpack; 60 remains balance data. Po polsku: skrzynka należy do drużyny i ma wspólny pułap liczby sztuk. |
| How is a map solved, and what opens the next one? | D-136 exact requested addition “while a change of the trip plan alone leaves it”; D-131 wording reconciled for rule changes versus trip-only changes. |
| What pays, and what takes from the chest? | D-189 includes the implemented “Earned loot reaches the chest on completion.” and accepted present all-runs rule. No claim to implement future earning loop, practice payout or task-14 solved-map exclusion. |
| What does a character's death take? | D-190 records only implemented carried-item loss, including equipment withdrawn from chest, and unchanged chest. Po polsku: śmierć zabiera plecak, także sztuki ze skrzynki; samej skrzynki nie zmienia. Other death consequences remain later tasks. |
| trip plan glossary | New approved term: two ordered item/count lists held by a program. Po polsku: plan wyprawy to dwie uporządkowane listy określające zabierane i wynoszone przedmioty. |
| program glossary / D-90 | Existing program term already includes trip plan; D-90 says a program holds ordered rule groups rather than equating entire program to the list. Meaning: program mieści grupy reguł oraz plan wyprawy. |
| D-93 / D-164 | D-93 receives verification link for unchanged rule counters; D-164 ownership/copy meaning already covers new field, no text change needed. |

New invariants: `trip-transfer` (entry/deposit/snapshot/order/caps), `trip-run-end` (loss and no return on death/end/restart), `trip-plan-progress` (plan-only edit/discard preserves progress and counts). Backlinks added to applicable decisions. Existing `streak-program-change` meaning unchanged: it concerns rules/groups.

## Own-work check and tests

Weakest requirement: map caps are invisible in MVP, so a superficially correct implementation might constrain gathering or apply one cap on both sides. The focused simulation test temporarily supplies the actual forest content slot with `carryIn: 0, carryOut: 1`, starts through the real game API, asserts no equipment entered, supplies an explicit valid mid-run backpack of two sticks and a revealed gathering tile, advances a real gather/completion minute, and asserts three sticks in the terminal backpack but only one deposited. It restores content in `finally`. The initial test incorrectly expected more than one item from a single gather; after correcting that fixture, the actual independent-cap behavior passes. No production map received a cap.

Own diff review covered all changed code and new modules. It found and fixed the old status-row test's child-position assumption after insertion of the warning line; named button selection now checks the same behavior. New UI cases catch wrong plan visibility, stale completion text and warning thresholds. Simulation mutation tooling is intentionally left to reviewer, as required by testing guidelines and dispatch.

All logs below are in `C:/Storage/repos/loop2-wt/plan-wyprawy/.runs/task-cycles/plan-wyprawy/`. Commands run from worktree root; `npm test -- FILE` is the documented focused route. PowerShell native stderr wrappers in logs are not test failures; exit and unittest/TAP conclusions determine results.

| Command | Exit and result | Evidence |
|---|---|---|
| `npm test -- tests/sim/trip.test.mjs` | Initial exit 1 compilation: new required field missing from understanding no-group branch; not a valid red assertion. Fixed preservation of program fields. This first diagnostic was overwritten, not retained. | Diagnostic reported during work. |
| Same | 1, three expected assertion failures before transfers/progress distinction; then 0, three pass. | trip-red.log; trip-green.log |
| Same | 1, expanded suite 9 pass/1 fail due death fixture: first body set on wrong object, then health 0.7 too high for one cold step. Corrected to run body and health 0.1. Both failures retained. | trip-expanded.log; trip-expanded-green.log |
| Same | 1, new cap test expected extra gathered pieces without source; fixed valid gathered-stock fixture and controlled real gathering. Then 0, 12 pass. | trip-caps.log; trip-caps-green.log |
| `python -B .runs/task-cycles/plan-wyprawy/prove_invariants.py` | 0; temporary production breaks restored in finally. Nested identical `npm test -- tests/sim/trip.test.mjs`: exit 1, three assertion failures for premature deposit/progress reset; then exit 0, 12 pass. Initial trip-red also observes missing entry/completion. | trip-invariants-red.log; trip-invariants-green.log |
| `npm test -- tests/sim/trip.test.mjs` | Final 0, 13 tests, including entry-before-first-action and deep-frozen input nonmutation. | trip-last.log |
| `npm test -- tests/view/trip.test.mjs` | 0, 4 tests. | trip-view.log; tests-view-trip.test.log |
| `npm test -- tests/view/program-editor.test.mjs` | 0, 39 tests. | editor-tests.log; tests-view-program-editor.test.log |
| `npm test -- tests/view/status-row.test.mjs` | 1, two stale positional test selectors; corrected selectors, no weakened assertions. Then 0, 29 tests, including current-copy map warning. | tests-view-status-row.test.log; status-row-green.log |
| `npm test -- tests/invariants/test_program_world_reference.py` | 1, new legitimate trip counts treated as world references; exact count-path exemption and hostile controls added. Then 0, 3 tests. | world-red.log; world-green.log |
| `python -B .runs/task-cycles/plan-wyprawy/prove_existing.py` | 0; temporary production breaks restored. Nested `npm test -- tests/invariants/test_program_closed_lists.py`: 1 (2 assertion failures), then 0 (3 tests). Nested `npm test -- tests/invariants/test_program_rule_pick.py`: 1 (11 subtest assertions), then 0 (8 tests). | closed-invariant-red/green.log; pick-invariant-red/green.log |
| `npm test -- tests/sim/program.test.mjs` | 0 | tests-sim-program.test.log |
| `npm test -- tests/sim/copy.test.mjs` | 0 | tests-sim-copy.test.log |
| `npm test -- tests/sim/program-list.test.mjs` | 0 | tests-sim-program-list.test.log |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | tests-sim-program-counts.test.log |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 | tests-sim-repertoire.test.log |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | tests-sim-discovery.test.log |
| `npm test -- tests/sim/completion.test.mjs` | 0 | tests-sim-completion.test.log |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | tests-view-program-panel.test.log |
| `npm test -- tests/view/headquarters.test.mjs` | 0 | tests-view-headquarters.test.log |
| `npm test -- tests/sim/trip.test.mjs` in focused regression loop | 0, 12 at that point; final 13-test run above supersedes. | tests-sim-trip.test.log |
| `npm run build` | 0, browser build for rendered checks. | Tool output. |
| Exact initial Prettier command in companion report, invocation 1 | 0, first formatting. | [Recovered command and exit](author-report-repair.md#invocation-1-initial-prettier); prettier-write.log lists processed paths. |
| Exact final Prettier + trip-test command in companion report, invocation 3 | Combined command exit 0 and trip tests 13 pass; standalone Prettier exit was not captured and is not claimed. Its log lists three successfully processed paths. | [Recovered command and exit limitation](author-report-repair.md#invocation-3-final-prettier-and-trip-test); prettier-write-last.log; trip-last.log. |
| `npm test -- tests/quality/test_eslint.py` | 2, guessed nonexistent file; no test ran. | eslint.log |
| Exact ESLint command in companion report, invocation 2 | 0, focused lint; subsequently full quality check below. | [Recovered command and exit](author-report-repair.md#invocation-2-eslint); eslint-files.log |
| `npm test -- tests/quality/test_quality_invariants.py` | 0, all 5 quality checks; ESLint, Prettier, Ruff, ShellCheck and audit. | quality.log |
| `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors before staging, and again after staging all new modules/tests so ownership includes them. | foundation-first.log; final tool output |
| `git diff --check` | 0, before report/commit. | Tool output. |

Invariant tests changed beyond new trip tests: program closed-list and rule-pick fixtures now contain required empty trip plans; world-reference test permits numeric counts only at exact `program.tripPlan.take/bring` entry count paths and keeps hostile coordinates/extra nested count containers rejected. `program.ts` was only temporarily broken for proof and restored, with no final diff. Adding trip simulation tests to Stryker selection ensures reviewer mutation testing exercises new paths.

Parent's mixed-tree baseline `npm test` is not claimed as an immutable base pass or author verification: Node 785 pass; Python invariants 204 pass (2 skips), deploy 66 pass (3 skips); exit 1 at quality due work-in-progress ESLint/Prettier and then-missing Ruff/ShellCheck. Parent installed quality tools, and author's final full quality-file check passes. Parent owns the later full gate. Author did not repeat full `npm test`, run mutation tool, persistence/login end-to-end, or deploy. These are respectively parent/reviewer scope, absent persistence pipeline (task 16 not merged), and outside this task.

## Rendered UI evidence

Read local playwright-mcp skill before browser use. Ignored reproducible harness: `.runs/task-cycles/plan-wyprawy/ui-harness.html`; copied to ignored build output `dist/public/trip-inspect.html`. Served with `python -m http.server 8768 --bind 127.0.0.1 --directory dist/public` (background exec session 96265). Route `http://127.0.0.1:8768/trip-inspect.html?real` mounts actual `createGameView(newGame())`; other route uses actual production components and simulation API with explicit test state/content caps. This proves production rendering and native controls, not full account-to-game navigation. Harness is not a permanent test or committed product code.

Native Playwright checks and inspected images (tool transcript, approximately 22:27–22:32 UTC):

- Actual new-game renderer: empty take/bring and two disabled Add buttons before discovery, “Skrzynka 0/60” above empty message. Final full-page image at 1440×1100 inspected.
- HQ fixture: chest 22/60, item list excludes campfire. Add picks stick then berry in content order; select options exclude item used by other row but keep its own. Bring list independently permits same stick.
- Number input `2.4`, Tab: actual visible draft, warning frame/message and aria-invalid; underlying count remains 1. Moving row carries its invalid draft and focuses select when moved arrow becomes disabled. Typing 8 removes warning and updates model. Additional keyboard `pressSequentially` invalid-input check after death also retained previous 1. Exhausted Add is disabled.
- HQ cap 4 with desired berry 1/stick 8: visible warning. First click using exact name “Wyślij” timed out because actual accessible name includes character/map; derived real accessible name from DOM/source, native click succeeds. A subsequent state query after failed click had null-run diagnostic; neither is recorded as product failure.
- Entry transfers berry 1/stick 3, shows 4/15 backpack and reduced chest. Preview “Wyniesie: patyk 2”, restart warning visible. Screenshot inspected.
- Native delete in bring copy sets copy list empty, keeps frozen stick-5 snapshot and preview of 2, shows dirty line, focuses Add. Completion via real advance after controlled streak yields deposited stick 2, chest sticks 9/berries 9/moss 2; preview gone and actual result stable. Screenshot inspected.
- Injected discovery and last wolf encounter with terminal run: screenshot confirms status → discovery → encounter → deposit → body/backpack → terrain ordering.
- Native Restart binds empty current bring list, takes fresh current equipment, no preview. Dying run advanced from health 0.1/temp34: no result/preview; terminal editor remains usable. Desktop and 480×900 screenshots inspected without overlapping/clipped controls.
- Browser error inspection found only static-server favicon.ico 404, no application errors.

Screenshot persistence attempt to worktree path was rejected by tool output-root restrictions. No exception requested and no file written outside allowed scope. Successful route used documented `browser_run_code_unsafe` page API `page.screenshot({fullPage:true})` without path, returned base64 in memory and emitted via `functions.image`; images were visually inspected in tool transcript. Therefore rendered screenshot verification ran, while persistent PNG artifact is absent. Reviewer can reproduce harness or inspect transcript evidence. Automatic `.playwright-mcp` snapshots are browser-tool behavior, not author product edits.

## Choices, alternatives and costs

1. Required `Program.tripPlan`, no legacy fallback/version bump: base has no task-16 save pipeline. Optional/default-at-use alternative would hide incomplete fixtures and accept ambiguous state. Cost of chosen shape: later persistence task must serialize/validate it and migrate if it introduces versioned old states.
2. Frozen bring plan and actual deposit live on `GameMapRun`, with shared chest orchestration in game. Recomputing from current program would silently alter ongoing rewards; duplicating chest logic inside run would cross its pure single-run responsibility. Cost: two terminal fields and fixture updates; exact replay of displayed payout remains possible.
3. Single ordered allocator shared by preview and transfer; independent optional map caps at boundaries. A separate preview algorithm could drift; one cap or applying it to gathering would violate task. Cost: small exported helper surface, covered by cap/stock/order tests and reviewer mutation testing.
4. Keyed item rows plus explicit shown-program context keep invalid drafts and focus across updates. Rebuilding rows is simpler but loses drafts/caret and stable controls. Cost: component bookkeeping; real native controls/focus were exercised. Shared number-field max becomes optional for uncapped count input.
5. Progress equality excludes trip plan while dirty/save comparison includes it. Treating every program difference the same would either reset progress wrongly or miss plan edits on save. Cost: two deliberate equality questions, named in code and tested with edit/discard/save conflicts.
6. Exact world-reference numeric path exemption allows legitimate trip counts. Broadly allowing every numeric `count` would mask map-coordinate leakage. Cost: scanner knows the program schema; hostile surrounding structures remain rejected.
7. Browser fixture construction reaches difficult cap/terminal/discovery states without permanent harness. Full login flow would add unrelated state/setup and cannot supply unseen MVP caps. Cost: explicitly limited integration evidence, with actual game-view new-game render checked separately.
8. D-189 records current accepted all-runs behavior and implemented loot sentence, leaving future task-14 exception visible in return. Implementing future exclusion now would contradict settlement 11; omitting the temporary rule would misdescribe code. Cost: task 14 must revise that entry when it changes behavior.

## Reaches beyond initial selection

- `stryker.config.json` is build-tools: expanded part reach to include selecting new sim tests for mutation coverage, read general coding/testing and searched kind index; no dedicated build-tools guideline exists. No new runtime dependency.
- D-21/D-23/D-40/D-141/D-144 as dependencies of read entries: reviewed their complete entries for rule structure, control/state and encounter relationships before foundation integration.
- Existing invariant fixtures `tests/invariants/program_fixture.py`, closed-lists/rule-pick/world-reference: required program shape impacts their generated programs; exact scanner exemption follows product schema, with new hostile controls.
- Relevant personal Playwright method and its grounding/setup/reading/timing/selectors/false-positive/API-state/session sections for rendered evidence and injected fixture state. Pinned foundation element methods/templates/examples and WAY-03 for recording entries; no external copy of the-way used.

## Searches not found or unclear

- `tests/sim/helpers*` and `tests/view/helpers*` lookup hit Windows rg invalid-path/glob error (OS 123); corrected with `rg --files` inventory.
- Guessed `tests/view/dom-fixture.mjs` absent; found inline fake document in existing editor tests and used its established pattern, without introducing shared test infrastructure.
- Guessed `guidelines/coding-build-tool.md` absent; guidelines inventory/kind index confirms no such dedicated guideline; general coding/testing applies to Stryker config.
- Guessed `tests/sim/backpack.test.mjs` and `src/browser/sim/activities.ts` absent; actual sim inventory and search located gathering in `run.ts`.
- Guessed `tests/quality/test_eslint.py` absent, focused command exited 2. Guessed `scripts/check_quality.py` absent; Windows `tests/quality/*.py` glob search failed OS 123. Actual inventory identified `tests/quality/test_quality_invariants.py`, final command passed.
- One PowerShell path written with shell-style escaped spaces failed; corrected to quoted literal `C:/Storage/The Brain/...`.
- Browser exact accessible-name guess “Wyślij” timed out; actual name includes character/map and was used successfully. No unresolved meaning remained.
- No persistence pipeline found at this base; dispatch and inspected game/browser implementation agree task 16 is absent. No speculative persistence version was added.

## Files and commit

Commit: `c39e10ca539ee79048d6989f1287582119751c8c` — `feat: :sparkles: add trip plans and chest transfers`.
36 files changed, 1422 insertions, 46 deletions. `git diff --cached --check` exit 0 before commit; commit exit 0; private author email verified; `git status --short` exit 0 with no output after commit. Reports, harness and logs remain ignored working evidence.

| File | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 170 | 13 |
| foundations/glossary.md | 6 | 0 |
| foundations/invariants.md | 30 | 0 |
| src/browser/sim/data/balance.ts | 2 | 0 |
| src/browser/sim/data/maps.ts | 3 | 0 |
| src/browser/sim/game.ts | 31 | 2 |
| src/browser/sim/programs.ts | 36 | 4 |
| src/browser/sim/run.ts | 3 | 2 |
| src/browser/sim/trip.ts | 91 | 0 |
| src/browser/sim/types.ts | 15 | 3 |
| src/browser/sim/understanding.ts | 1 | 0 |
| src/browser/styles.css | 46 | 0 |
| src/browser/view/controls/number-field.ts | 2 | 2 |
| src/browser/view/game-view.ts | 5 | 0 |
| src/browser/view/headquarters.ts | 37 | 8 |
| src/browser/view/program-editor.ts | 12 | 2 |
| src/browser/view/program-panel.ts | 1 | 1 |
| src/browser/view/status-row.ts | 18 | 1 |
| src/browser/view/trip-editor.ts | 197 | 0 |
| src/browser/view/trip-lines.ts | 71 | 0 |
| stryker.config.json | 1 | 0 |
| tests/invariants/program_fixture.py | 1 | 0 |
| tests/invariants/test_program_closed_lists.py | 1 | 0 |
| tests/invariants/test_program_rule_pick.py | 2 | 0 |
| tests/invariants/test_program_world_reference.py | 11 | 1 |
| tests/sim/copy.test.mjs | 1 | 0 |
| tests/sim/discovery.test.mjs | 10 | 1 |
| tests/sim/program-counts.test.mjs | 1 | 0 |
| tests/sim/program-fixture.mjs | 1 | 0 |
| tests/sim/program-list.test.mjs | 1 | 0 |
| tests/sim/program.test.mjs | 6 | 1 |
| tests/sim/repertoire.test.mjs | 3 | 0 |
| tests/sim/trip.test.mjs | 450 | 0 |
| tests/view/program-editor.test.mjs | 8 | 1 |
| tests/view/status-row.test.mjs | 42 | 4 |
| tests/view/trip.test.mjs | 106 | 0 |
