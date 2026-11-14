# Author report — porzadki-przed-pierwsza-mapa

Status: **done with concerns** (concerns are listed under "Problems as observed" and "Unread material"; none blocks the request).

Worktree `the task's worktree`, branch `task/porzadki-przed-pierwsza-mapa`, base `6ab6a32b`. Nothing uncommitted outside `.runs/`. I did not open a request, did not merge, did not run `npm test` (the whole gate).

## Commits (7), oldest first

| Commit | What |
|---|---|
| `cc833e42` | To do 3 and 5: `createTripPlan`, `createRuleList`, `createRulePanel` removed (with the types only they used and the CSS rule `.rule-panel-host`); `rule-editor.test.mjs` draws the list and the panel through `RuleListView` and `RulePanelView`; the shared number field takes its rule from the screen. |
| `1ebd37e4` | To do 1 and 4: tests pick map, item, resource, archetype by identifier; the unread map parameter leaves the rule pick and the functions that passed it on. |
| `39179ee7` | To do 6: `right-area` becomes `tabs-area`. |
| `e4151075` | To do 7: `press` and `fire` in `tests/view/page-document.mjs`. |
| `abff7827` | To do 2: the sentence and the *Bad* example in `guidelines/testing.md`. |
| `aa542f3f` | To do 8: `tsconfig.sim.json`, `scripts/build.mjs`, the invariant test `tests/invariants/test_simulation_type_check.py`. |
| `8e5af859` | Foundation: D-393, D-394, D-395 new, D-06 changed, invariant `simulation-type-check`, `simulation-isolation` derives also from D-393, part map. |

Diff against the base: 75 files, +683 / -734 (`git diff --shortstat 6ab6a32b HEAD`). Source files: `src/browser/sim/{program,combat,run,game}.ts`, `src/browser/styles.css`, `src/browser/view/{rule-list,rule-panel,trip-plan,trip-editor,run-screen}.ts(x)`, `src/browser/view/controls/react-number-field.tsx`, `src/browser/view/right-area.tsx` -> `tabs-area.tsx`, `scripts/build.mjs`, new `tsconfig.sim.json`. Tests: 36 files changed for item 1 (some also for item 4 or 7), `tests/view/{page-document.mjs,page-document.test.mjs,react-controls.test.mjs,trip.test.mjs,tabs-area.test.mjs,rule-editor.test.mjs}` and 11 more view tests for item 7, `tests/invariants/test_simulation_inputs.py` (named below), new `tests/invariants/test_simulation_type_check.py`.

## Choices the handoff left to me

### 1. The new name of `right-area` / `RightArea`: `tabs-area` / `TabsArea`

- Says what it is today: the area with the tabs „Kronika” and „Teren” and their content. Its sibling is `world-area.tsx` / `WorldArea`, and the section it stands in has the class `run-tabs`; `run-screen.tsx` already calls it "the area with the tabs".
- No clash: `chronicle.ts`, `chronicle-entries.ts`, `ChronicleTab`, `ChronicleView` are untouched; nothing named `tabs-area` existed.
- Changed: `src/browser/view/tabs-area.tsx` (`git mv`; comment that explained the old name removed; `TabsArea`, `TabsAreaProps`), `run-screen.tsx` (import and use), `tests/view/tabs-area.test.mjs` (`git mv`, imports, header comment), `guidelines/coding-browser-module.md` (the file table row, kept in alphabetical place), `guidelines/styleguide-browser-view.md` (one sentence). The part map names no file of `src/browser/view/` (it claims `src/browser/view/**`), so it needed no change for the rename.
- Search for leftovers: `grep -rniE "right-area|RightArea"` over the repository (not `node_modules`, `.git`, `dist`, `.runs`) finds nothing. Left on purpose: "the right area" in the prose of `foundations/decisions.md` (a layout decision, line ~6800) and of D-307-era text about the Mapy screen, and in `src/browser/view/maps-screen.tsx` comments — those speak of the right-hand area of other screens, not of this module; I did not rewrite them.
- Cost if wrong: a rename again, 5 files.

### 2. `press` and `fire` for the view tests: in `tests/view/page-document.mjs`, one form

- Chosen: exported `fire(target, type, init = {})` and `press(target)` in the harness `page-document.mjs`, beside `inAct` and `typeInto`. D-264 gives that file the job of "awaits React's work through `act`", and D-268 makes it the one place a test file takes its helpers from; a separate module would be a second import that has to stand after the harness. A separate module was rejected: one more file, one more import line in 13 files, no gain. The harness grew by 19 lines (it was 243).
- The one form: the event class comes from the window of the target (`(target.ownerDocument ?? target).defaultView`), a `pointerout` goes as a `MouseEvent` (as in `run-screen.test.mjs` before), `press` asserts the target stands, clicks inside `inAct` and returns that promise.
- The four variants keep their tests' meaning, and none needed its own function left in place:
  - `program-list`, `rule-editor` (a `press` without `fire`): built the click inline from `target.ownerDocument.defaultView`; the shared `press` does the same.
  - `run-screen` (window as a parameter): the window was always `page.window`, the window of every target; calls changed from `press(page.window, x)` / `fire(page.window, x, t)` to `press(x)` / `fire(x, t)` (22 + 2 calls). Its `fire` for `pointerover` still uses `Event`.
  - `uncaught-failure` (`async`): `await inAct(...)` inside an `async` function is the same promise as returned `inAct(...)`; the file's 14 `press` calls and its 3 `fire` uses pass unchanged.
  - A first run failed one case, `fire(document, "visibilitychange")` in `account-screen.test.mjs` (a document has no `ownerDocument`); fixed by `target.ownerDocument ?? target`, run again green (see checks).
- Three new cases in `tests/view/page-document.test.mjs`: a press runs the handler inside act; a press of `null` fails with the harness's words; `fire` sends a bubbling event of the target's window, a `pointerout` as a mouse event with its fields.
- Not touched: `draw`, `mount` (the task says they are no copies), and the local `press`/`fire` that mean something else (`end-window.test.mjs:607` key press, `chronicle-entries.test.mjs`, `camp-picture`, `scene`, `tile-list`).
- D-264/D-268 text is not changed: adding two helpers to the harness neither changes what they say nor needs a decision of its own. If the human reads D-264's list of what the harness does as closed, the sentence is one line to extend.

### 3. How the shared number field receives its rule (To do 5)

- `ReactNumberField` gets a required prop `rule: NumberRule`, with `type NumberReading = { value: number; commit: boolean }` and `type NumberRule = (text: string, held: number) => NumberReading | null` exported from `controls/react-number-field.tsx`. `null` means "this text is no number the rule takes": nothing is committed, the draft stays in the field, `onReject` is called (this is the trip count rule's refusal). The `rule="trip"` parameter is gone.
- The control imports neither `program-editor.ts` nor `trip-editor.ts` any more. `rule-panel.tsx` passes `(text, held) => readNumberField(text, held, number)`; `trip-plan.tsx` passes `readTripCount`, a new pure function in `trip-editor.ts` (`tripCount` wrapped: valid count -> `{ value, commit: true }`, else `null`).
- Same behaviour, the old two branches folded into one: Enter, blur, "commit also a valid count equal to the one shown", "a rejected text stays across focus and is reported only when typed", "leaving the rejected draft reports no more". Checked by the existing trip-rule case of `react-controls.test.mjs` (only its `rule:` prop changed), by `trip-plan.test.mjs` and `program-editor`/`rule-editor` cases; the DOM form `number-field.ts` is not touched, and the same-tree cases (`react-controls.test.mjs`, D-265) pass. The message „Wpisz liczbę całkowitą od 1.” still comes from `trip-plan.tsx` (`COUNT_MESSAGE`) and is shown under the same condition (`rejected` set), as before.
- Rejected: a default rule inside the control (it would need to import one of the screens' rules again); a rule shape with `accepted: boolean` (needs a wrapper in the program editor, whose `readNumberField` and its tests stay as they are).
- Cost if wrong: the prop is required, so a new user of the field must give a rule; forgetting it is a type error.
- Tests: `react-controls.test.mjs` passes `rule: RANGE_RULE` (over `readNumberField`) in the six range cases and `readTripCount` in the trip case; `trip.test.mjs` has a new assertion for `readTripCount` (a valid count commits every time, `"0"` and `"2.4"` are refused).

### 4. The map parameter (To do 4): removed through the whole chain, not only at the two `_map` lines

- The task names `_map` at `program.ts:203` (`conditionHolds`) and `:293` (`actionRefusal`); the analysis note it comes from says the parameter "is passed through several rule-pick functions and read nowhere at the end". Removing it only at the two leaves would leave `map` parameters that nothing reads in `judgeRule`, `judgeProgram`, `chooseActivity`, `chooseCombatRule`, `actionFeasible`, `chooseCreatureAction`, `resolveCombat`, `startActivity` and `pickActivity` — the same dead parameter. I removed it from all of them: `program.ts`, `combat.ts`, `run.ts` (`startActivity`, `pickActivity`, the two call sites), `game.ts` (`ruleSigns`). `finishMinute`, `stepMinute`, `minuteBeforePick`, `newMapRun` keep `map` because they read it (`meetsSolving`, `map.attackers`, the layout).
- Public signatures changed: `conditionHolds(run, condition, context?)`, `actionRefusal(run, action)`, `actionFeasible(run, action)`, `judgeProgram(run, program, options?)`, `chooseActivity(run, program)`, `chooseCombatRule(run, program, health, opponentHealth)`, `pickActivity(run, program)`, `resolveCombat(run, creatureId, program)`. `actionFeasible` stays (D-394).
- 111 call sites in 9 test files of `tests/sim/` were rewritten by a script that drops the second argument of those eight functions (it parsed the argument lists; every dropped argument was a map expression: `map` 53, `forest` 42, `MAPS.forest` 11, `MAPS.forestDeep` 4, `MAPS[run.mapId]` 1). Prettier reflowed some lines.
- **A changed invariant test, named:** `tests/invariants/test_simulation_inputs.py` (invariant `simulation-inputs`): four call lines lose the map argument (`resolveCombat`, `chooseCombatRule`, `chooseActivity`, `conditionHolds`, `actionFeasible`); what it checks is unchanged. It passes after the change (see checks). I did not first break the code and see it fail, since the change only keeps its calls matching the new signatures.
- Cost if wrong: a wider diff than the two lines the task names; if the human wanted only the two leaves, it is one revert plus a sweep of unread parameters left behind.

## Item 1: what changed and what stayed

- Recount on my tree (`grep -rnE "Object\.(entries|keys|values)\((MAPS|ITEMS|RESOURCES|ARCHETYPES)\)"` in `tests/`): 36 files held a pick by position of the collections (the task counted 33 + the others; the numbers moved since `2b4d760c`; `scene-picture.test.mjs` had the second map at line 888, not 874). All are by identifier now: `"forest"`, `"forestDeep"`, `"stick"`, `"berry"`, `"elementalMage"`; `const [mapId, map] = Object.entries(MAPS)[0]` became `const mapId = "forest"; const map = MAPS[mapId];`. The named lines: `completion.test.mjs:29`, `scene-picture.test.mjs`, `conditions.test.mjs:30` (`firstItem`/`secondItem` = `stick`/`berry`), `traits.test.mjs:86`, `rules.test.mjs:340-342` (map `forest`, resource `stick`, archetype `elementalMage`), and `acceptance.test.mjs:28`: it now takes the forest by identifier, and its case „the map is Las…” asserts `forest.name === "Las"` of that map. In `data.test.mjs` the pair `firstMapId`/`firstMap` became `forestId`/`forestMap` so the names say what they are. Three comments that said "the first map" now say "Las" (`copy.test.mjs`, `program.test.mjs`, `time.test.mjs`). 15 files lost an import of `MAPS` that nothing used any more (eslint caught each).
- Python tests that read the game data: `test_map_run_tiles.py` loops over all maps, `test_simulation_inputs.py` and `test_simulation_isolation.py` pick `MAPS.forest` by name; `program_fixture.py` and `understanding-fixture.mjs` take all items. None picks by position; none changed for item 1.
- Left on purpose, not positional picks of an entry: `world.test.mjs:24` (`Object.keys(ITEMS).find(lightable)`, picks by a property, and the file asserts it is the stick), `program-editor.test.mjs:112` (`ITEMS_LISTED`, all items), loops over all maps/items/resources, and `const [stick, berry] = forest.resources.map(...)`-style picks of the order of resources **inside** the forest's own data (a new resource put first in the forest would move them; the task lists only picks among entries of the collections, so I did not widen it).
- **Criterion 2 trial (temporary, not committed, removed):** I appended to `dist/browser/sim/data/maps.js` a made-up open map `dummyFirst` first in `MAPS`, and to `items.js` a made-up item first in `ITEMS`, then ran the 52 test files changed by this branch (`node --test`): 1338 pass, 10 fail; `npm run build` restored `dist` afterwards (no `DUMMY` left). The 10, each read:
  - 3 in `data.test.mjs` (`:279`, `:323`, `:502`): they state the content of `ITEMS` ("the items are the four resources of Las", "every item names a resource"); a new item has to be written there.
  - 4 about the screen of Mapy: `maps-screen.test.mjs:142`, `:172`, `account-screen.test.mjs:3853`, `:4096` — the screen lists every open map, so a new open map first in the data is listed first. The task's own *Out of scope* gives the order of the Mapy list to task 9.
  - 3 in the editor tests where the **product** takes the first item of the data as its default: `program-editor.test.mjs:158` and `rule-editor.test.mjs` (the acceptance case „Zapas poniżej 8 · Patyk…”: it expects item `stick` as the default of a new „Zapas poniżej” condition), and `program-editor.test.mjs:1207` (the list of offered resources lists the made-up item). They pass only while the stick stays first among items. They are not positional picks written in the test, but they do not meet criterion 2 for a **new item** put first; for a new **map** put first, only the 4 Mapy cases fail. For the human: either those three accept that the editor's default follows the data order, or the default is a decision to write.
  - With no made-up entry, all 52 files pass (see checks).

## Item 8: the compiler check

- `tsconfig.sim.json`: `target ES2022`, `module`/`moduleResolution NodeNext`, `lib ["ES2022"]`, `types []`, `strict`, `noEmit`, `rootDir src/browser/sim`, `include src/browser/sim/**/*.ts`. `scripts/build.mjs` runs it **first** in the loop (before browser and server), so a failure stops the build before anything is emitted; `noEmit` is in the config so the browser configuration stays the one that compiles those files. Name `sim` follows `src/browser/sim` and `tests/sim`.
- Planted use, once, in the worktree (appended to `src/browser/sim/hex.ts`: `document.title`, `setTimeout(...)`, `console.log(...)`, `structuredClone({})`), then removed (`cp` of the backup; `git status` clean of it):
  - `npm run typecheck` with the planted lines: **exit 1**, four errors — `Cannot find name 'document'` (TS2584), `'setTimeout'` (TS2304), `'console'` (TS2584), `'structuredClone'` (TS2304), all at `src/browser/sim/hex.ts`.
  - `npm run typecheck` on the real code: **exit 0**; `npm run build` on the real code: **exit 0**.
- Invariant test seen failing first: `npm test -- tests/invariants/test_simulation_type_check.py` before `tsconfig.sim.json` and the `build.mjs` change: **exit 1**, 3 failures (typecheck and build exit 0 with the planted names; the compiler cannot read `tsconfig.sim.json`). An earlier draft that also planted `process` failed for a wrong reason (the browser configuration with `types: []` already refuses `process`), so I dropped `process`: the four names are the ones only the new configuration can refuse. After: same command **exit 0**, 3 tests OK.
- The test plants the four uses in a copy of the tree (never the real tree), checks both commands refuse them (the error text must say `Cannot find name '<each>'`, so the browser configuration, which passes all four, is not what stopped it), that `npm run build` leaves no `dist/public/main.js`, and that `tsc -p tsconfig.sim.json --listFilesOnly` lists every `.ts` file under `src/browser/sim/` found on disk.
- Part map: `tsconfig.sim.json` and `tests/invariants/test_simulation_type_check.py` added to `build-tools`, whose sentence now also says it "checks the simulation's types under a configuration of their own". `Dockerfile` (`COPY tsconfig.*.json`) and `.dockerignore` (`!tsconfig.*.json`) already match the new file; I did not build the image.

## Foundation entries (each written following the skill of its element: `.the-way/elements/{decisions,invariants,part-map}/skill/` and `common/way_of_working.md`)

| Entry | Mark | One sentence (English) | Jedno zdanie (polski) |
|---|---|---|---|
| D-393 (new) — "What keeps the simulation from using names outside the JavaScript language?" | row 1 | Both the compiler, under a configuration of its own with the library of the language alone, and the test of `simulation-isolation`, kept whole, guard the simulation, and neither is shortened because of the other. | Czystości symulacji pilnują razem kompilator, w osobnej konfiguracji z samą biblioteką języka, i test izolacji symulacji, który zostaje w całości; żaden nie jest skracany przez to, że drugi coś przejmuje. |
| D-394 (new) — "Does the simulation keep `actionFeasible`, which the game does not call?" | row 2 | `actionFeasible` stays in the simulation because tests use it to observe whether an action is allowed, and a clean-up does not remove it for having no caller in the game. | `actionFeasible` zostaje w symulacji, bo testy obserwują nią, czy czynność jest dozwolona, i porządki nie usuwają jej z tego powodu, że gra jej nie woła. |
| invariant `simulation-type-check` (new) | row 3 | The simulation's files are type-checked under a configuration of their own that covers all of them, holds the library of the language alone and no ambient types, and that `npm run typecheck` and `npm run build` run. | Pliki symulacji sprawdza osobna konfiguracja kompilatora, obejmująca je wszystkie, z samą biblioteką języka i bez typów otoczenia, którą uruchamiają `npm run typecheck` i `npm run build`. |
| D-395 (new) — "What does a shared control of the browser view know of the screens that use it?" | row 4 | A shared control imports no module of a screen that uses it and takes a rule that belongs to one screen from that screen. | Wspólna kontrolka nie importuje modułów ekranów, które jej używają, a regułę właściwą jednemu ekranowi dostaje od tego ekranu. |
| D-06 (changed in place) | the task's change to D-06 | The build type-checks the simulation under a third configuration that emits nothing, besides compiling the browser and server ones. | Budowanie sprawdza symulację w trzeciej konfiguracji, która niczego nie emituje, obok kompilacji konfiguracji przeglądarki i serwera. |
| `simulation-isolation` (*Derives from* gains D-393) | the cycle's | The isolation invariant now also derives from the decision that pairs it with the compiler check; its sentence and test are unchanged. | Niezmiennik izolacji pochodzi teraz także z decyzji, która łączy go z kontrolą kompilatora; zdanie i test bez zmian. |
| part map `build-tools` (`tsconfig.sim.json`, the invariant test, a clause in its sentence) | row 3, the task's part-map line | The part that builds also type-checks the simulation apart and claims its configuration and its test. | Część budująca sprawdza też osobno typy symulacji i obejmuje jej konfigurację oraz test. |

Notes on the entries:

- Numbers: the log had D-392 last and no withdrawn numbers, so D-393 to D-395.
- D-393 *Rejected* holds the two ways the row's source keeps: cut the part of the scan the compiler takes over from the Python test (answer to question 2) and move the simulation to its own directory with its own configuration (rejected by the human in matter 4 as "A11 … zastąpione przez A21", cost from card D11). D-394 *Rejected* is question 1's "Not chosen" (removing it). D-395 *Rejected* is `unknown`: the row's source (the note P6/D15 and the human's acceptance) names no way not chosen, and the "what the cycle would otherwise guess" column is a way the writer derives, which the template keeps out.
- *Based on* is `none` in all three, *Origin* `none`. D-393 *Relations* derives from D-04; D-395 derives from D-265.
- `simulation-type-check` *Part* names `simulation · build-tools`: a change to the configuration or to `scripts/build.mjs` (build-tools) or to any simulation file (simulation) can make it false.
- The row 1 / row 3 entries are about one thing each, so no row was found already stated: the search of the foundation (`grep` for `actionFeasible`, the three factories, `rule="trip"`, "both configurations", `right-area`, `_map`) found no other entry stating them. `application-build-output` ("compiles both the browser and the server TypeScript configurations") and `application-build-layout` stay true with a third configuration, so I did not change them.
- Foundation check: `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` at HEAD. With `--skip-test-citations` before the files were tracked it showed the three expected messages (untracked file patterns and the test not yet cited); gone after the commit.
- The critique step of `way_of_working.md` (a fresh agent critiques a set of proposals) is not mine: the entries are written from accepted rows and the review reads them; I dispatched no subagent.
- `guidelines/coding-simulation-module.md` ("Izolacja symulacji") is not changed; its rule is still true and the compiler now enforces part of it. Not in the task.

## Checks (command, exit code)

All run from the worktree root.

| Command | Exit | Note |
|---|---|---|
| `npm run typecheck` | 0 | on the real code, with the new configuration |
| `npm run build` | 0 | on the real code; run again after the dummy trial, `dist` restored |
| `npx eslint tests src` | 0 | after each batch of edits; and `tests/quality/test_quality_invariants.py` (eslint, prettier, ruff, shellcheck) |
| `npx prettier --check` on changed `.ts/.tsx/.mjs/.json/.md` | 0 | except `guidelines/testing.md`, which was not prettier-clean at the base either (its tables) |
| `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/` | 0 | "All checks passed" |
| `node --test` on the 36 files changed for item 1 | 0 | 872 pass, 0 fail (before items 3, 4, 7) |
| `node --test` on the 40 changed `.test.mjs` after items 3 and 4 | 0 | 996 pass |
| `node --test` on the 14 view files changed for item 7 | 1 first (the `fire(document, ...)` case), then 0 | 454 pass after the fix |
| `node --test tests/view/tabs-area.test.mjs tests/view/run-screen.test.mjs` | 0 | 33 pass |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 | 2013 pass, 0 fail; the whole view and simulation level at HEAD |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | the invariant test I changed |
| `npm test -- tests/invariants/test_simulation_type_check.py` | 1 before, 0 after | see item 8 |
| `npm test -- tests/invariants/test_application_build_output.py` / `test_application_package_layout.py` / `test_cross_part_imports.py` / `test_account_server_typecheck.py` / `test_browser_view_framework.py` / `test_application_build_kitchen_sink.py` / `test_simulation_isolation.py` / `test_account_server_runtime.py` / `test_content_identifiers.py` | 0 each | the tests of the build, the types and the simulation's isolation |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | the renamed test file is still in the gate's patterns |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| trial with made-up map and item first (not committed) | 1 | 10 failures, read above |

Not run: `npm test` (the whole gate; the orchestrator's), the `tests/*.test.mjs` top-level node tests (server, passwords, startup: no file of them was touched, and `tests/http.test.mjs` lists `tsconfig.server.json` only), `tests/deploy/`, `tests/agent_workflow/`, the Docker image build, mutation testing (`StrykerJS`: the reviewer's for changed simulation files; I changed only a parameter list, not behaviour), a check in a real browser (nothing the player sees changed; `ui_check.md` not read for that reason).

## Own-work check (section 3)

- Requirement most likely not met: acceptance criterion 1, "the trip list's count field accepts and refuses the same entries with the same message as today (D-181)", because I folded the two commit branches of `react-number-field.tsx` into one. Check: the existing trip-rule case of `react-controls.test.mjs` (typed `"0"`, `"2.4"` on Enter and on blur, `"5"`, `"5.0"` equal to the shown number) with only its `rule:` prop changed, `trip-plan.test.mjs`, the six range cases of `react-controls.test.mjs`, and the same-tree cases of both forms. It showed all pass (exit 0 for the whole view level, 2013 tests). The cases test behaviour, and the old assertions kept their expected values.
- Second most likely: criterion 2 (a new map or item at the start). Check: the trial above. It showed the Mapy-screen and editor-default cases listed there, which the task or its out-of-scope line puts elsewhere or the human has to decide.
- Mutation in my head: a rule that returns `commit: false` for a valid trip count would fail the "`5.0` still reported" assertion; a `null` that does not call `onReject` fails the reject counts; a `tabs-area` import left on the old path fails the build; a sim file using `document` fails the new test; a configuration that dropped `types: []` would still refuse `document` but pass `process` use — not asserted, because the browser configuration refuses `process` already.

## Reaches beyond the dispatch (section 1)

- `.the-way/elements/{decisions,invariants,part-map}/{template.md,skill/*}` and `elements/common/{way_of_working,rules}.md`, to write the entries (the handoff says the skills select that reading).
- `.the-way/product-guidelines/testing/template.md` ("Writing the file", the rule fields), to word the *Bad* line of To do 2.
- `scripts/build.mjs`, `tsconfig.*.json`, `Dockerfile`/`.dockerignore` (`tsconfig.*.json`), `stryker.config.json` (`buildCommand` runs `tsc -p tsconfig.browser.json` only: unaffected), `eslint.config.mjs` (programs for the browser and server only: the new JSON is no linted source), `tests/invariants/test_account_server_typecheck.py` and `loop2_invariant_support.py` as the pattern for the new invariant test.
- `the note of the architecture analysis, in the author's private notes` (rows D14, D15, D16, section P6) to read what "the parameter with the map" and the number-field change were meant to be; the handoff named the task only. Only these passages read.
- `src/browser/sim/{combat,run,game}.ts` and the tests of `tests/sim/` for the map parameter chain.
- `.the-way/task-cycle/skill/foundation_step.md` and `change/SKILL.md` as the handoff says.

## Unread material

- Not read at all: `foundations/glossary.md` entries beyond the list of headings (I used no term needing an entry: "simulation" and "map run" are the product's own and I add none; `map run` is in the glossary); decisions **D-73** and its departures (D-74…D-273), D-181, D-264, D-265, D-268 beyond the fragments quoted in the task (D-04 and D-06 I read whole); the invariants `simulation-isolation` and `simulation-inputs` entries I read whole, the others only by heading; `.the-way/task-cycle/change/{slice,fix}.md` (not my variants), `ui_check.md`, `.the-way/project-level/technology/reserved_choices.md` (no technology choice arose: no new language, library, store).
- Read in part: `guidelines/styleguide-browser-view.md` (lines 1-60 and 800-860 of the file), `guidelines/testing.md` (whole), `tests/view/rule-editor.test.mjs` (lines 1-400 and the parts I changed, ~930-1030, 1080-1090), `tests/view/react-controls.test.mjs` (lines 1-60 and 960-1290), `tests/view/trip.test.mjs` (lines 1-70), `tests/view/trip-plan.test.mjs` (1-120), `tests/view/page-document.test.mjs` (1-80, 365-425, 538-575), `src/browser/sim/run.ts` and `src/browser/sim/game.ts` (the parts around the changed lines only), `scripts/build.mjs` (whole), the 36 test files of item 1, the 13 test files of item 7 and the 9 files of `tests/sim/` of item 4: changed by scripts and checked by running each file's tests and by the diff of the changed lines, not read whole. The handoff says files you change are read whole; for these I did not. Compensation: every changed file ran its tests (exit 0), and `git diff -U0` of the item-1 script was read in full.
- `src/browser/AGENTS.md`: read after the changes (design tokens only; no style value was added or changed).

## Searches not found or unclear

- The numbers in the task for item 1 (33 files, line `scene-picture.test.mjs:874`, `styles.css:2665`) are from an older commit; on this tree they are 36 files, `:888`, `styles.css` around `:2758` (the `.rule-panel-host` rule). Found and handled; not an obstacle.
- The task says `createRuleList` and `createRulePanel` are called by "only `tests/view/rule-editor.test.mjs`": confirmed. `createTripPlan`: no caller, confirmed.
- No test of the part map's list in `coding-browser-module.md` ("Files of this kind") exists that I could find; I kept its alphabetical order by hand.
- Whether a rule of the-way requires the wording "the human's remark" of the foundation step for D-395's *Rejected* `unknown`: the template allows `unknown` "with no question to the human"; no question arose.

## Problems as observed (evidence; causes only where verified)

- The 10 failures of the dummy trial, above; observed with command `node --test` on the 52 changed files with `dummyFirst` first in `MAPS` and `ITEMS`. Cause of `program-editor.test.mjs:158` verified by reading the failure: `{ kind: 'itemBelow', item: 'dummyFirst' }` against `'stick'`. The `rule-editor.test.mjs` acceptance case fails with "expected 2, got 3" at its line 1085; that the made-up item is what adds the third is a guess (not looked into further), as is the cause of `program-editor.test.mjs:1207` (its output lists a `Dummy` row first, which fits).
- `guidelines/testing.md` is not prettier-clean at the base (tables); I did not reformat it.
- `npm test -- <python file>` runs the file with `unittest`; the invariant tests build in copies, so a run of 9 of them took about 10 minutes in the background.

## Things for the human or the orchestrator

1. The three editor cases and four Mapy cases of the dummy trial (the first decides whether the editor's default for „Zapas poniżej” follows the data order; the second is task 9's by the task's own *Out of scope*).
2. The map parameter went from the whole chain (see choice 4), not only from the two `_map` lines; the public signatures listed there changed.
3. A look at the wording of D-393 (the one sentence of 3 is long) and at D-395's `unknown` *Rejected*.
