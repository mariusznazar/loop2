FAIL 8e5af859593ac49371a1e7d79fe414b828170542

# Review of the whole change — porzadki-przed-pierwsza-mapa

Range `6ab6a32be884ac174b068b8a6a5dd1515073d2a9..8e5af859` (seven commits, 75 files), worktree
`the task's worktree`. `git rev-parse HEAD` is
`8e5af859593ac49371a1e7d79fe414b828170542`, the head given. I changed nothing and ran no subagent.

Summary: 1 blocking finding (Important, within the task), 8 Minor findings (7 within the task, 1
outside it), 3 out-of-scope matters for the human. Everything else the task asks is met as far as I
could verify.

Second reading (amendment at the coordinator's request): I closed the gaps my first report listed
under Unread material — read whole `guidelines/coding.md`, `coding-browser-module.md`,
`coding-simulation-module.md`, `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`,
the glossary, the part map, `simulation-isolation` and `simulation-inputs`, and the decisions D-04,
D-75, D-77, D-82, D-83, D-84, D-94, D-265, D-266, D-268, D-351 (and the statements of D-76, D-79, D-163,
D-235, D-273) — and, as D-94 and the mutation-testing rule of `guidelines/testing.md` require of the
reviewer, ran StrykerJS on the changed simulation files. New findings from it: one Minor (M8). No
grade or scope of an earlier finding changed; F1 stands. One statement of the first report was wrong
and is corrected below: that a mutation run "would show nothing the typecheck does not" — the
guideline requires the run of the reviewer, whatever the change.

## Blocking finding

### F1 — Important — To do 1 and acceptance criterion 2 unmet in `tests/view/program-editor.test.mjs`

Place: `tests/view/program-editor.test.mjs:112` (`const ITEMS_LISTED = Object.keys(ITEMS);`), used by
position at `:484` (`item: ITEMS_LISTED[0]`), `:524` (`ITEMS_LISTED.slice(1)`) and `:528`
(`ITEMS_LISTED[ITEMS_LISTED.length - 1]`), and passed as the data-order input to `withConditionKind`
in cases whose expectations are hard-coded to `"stick"` (`:158-176`, the case "group conditions offer
the same kinds …", expecting `{ kind: "itemBelow", item: "stick", value: 8 }`).

What is wrong: To do 1 names, among the shapes to replace, `Object.keys(ITEMS)` "unpacked by position
and variants". `ITEMS_LISTED` is that variant: a named constant holding the data's key order, read by
position. The author's report calls it "all items" and leaves it (report, Item 1, "Left on purpose"),
but three of its uses are positional picks, and the input it gives to `withConditionKind` makes the
expected `"stick"` of the case at `:158-176` true only while the stick is first in the data.

Why it matters: acceptance criterion 2 says the tests pass unchanged whatever place a new item takes
in the data. The author's own trial (report, "Criterion 2 trial") shows `program-editor.test.mjs:158`
failing with `{ itemBelow, item: 'dummyFirst' }` against `'stick'`. The fix is in the test alone, with
no change of product behaviour: write the item list the case passes as an explicit literal
(`["stick", "berry", "moss", "fiber"]`) and take the first item from it, which is what the rule just
written to `guidelines/testing.md` ("Test inputs and expected values") asks. This is not the same as
the editor-default cases of out-of-scope matter O1: here the test builds the list the product is given.

Evidence: `rg -n "ITEMS_LISTED" tests` (lines above); the author's trial; the testing rule's sentence
at `guidelines/testing.md:120-123`.

## Minor findings

Within the task:

- M1 — `src/browser/view/controls/react-number-field.tsx:5-8` cites `(D-265)` for "the field knows no
  rule of any screen"; the decision written for this is D-395 (D-265 is the two-forms decision). A
  reader following the citation reaches the wrong rule.
- M2 — `src/browser/view/controls/react-number-field.tsx:66-67` still says "or while a rejected trip
  count stays in it"; a shared control that no longer knows the trip rule names it in a comment. Say
  "a rejected text".
- M3 — `src/browser/view/trip-editor.ts` `readTripCount` returns the inline shape
  `{ value: number; commit: boolean } | null` instead of `NumberReading | null` from the control. The
  two stay equal by hand; importing the type is the direction D-395 allows (screen imports control).
- M4 — `D-395`, `*Rejected:* unknown` (`foundations/decisions.md`, end of D-395). The row's source
  does keep a way not chosen: To do 5 and the note's row D15 say the control takes a function "instead
  of the parameter `rule="trip"`". It names no cost or reason beside it, and the template lets a
  decision written from a row use `unknown` where it has none, so I do not call the entry wrong; but
  the entry's own *Verification* ("violates: … picks the rule of a screen by a value of one of its
  parameters") shows the way, and *Rejected* could hold it with `unknown` for the reason. Leaving it
  as is loses nothing a reader could not find in the *Verification* line.
- M5 — `D-394`, *Rationale* last clause ("a function of the simulation that is the simplest point of
  observation of a rule is worth keeping where the game has no use for it") states a general principle
  that row 2 does not settle (row 2 settles `actionFeasible` alone). Trim it to `actionFeasible`.
- M6 — `tsconfig.sim.json` `"noEmit": true` is what D-06 and D-393 call "emits nothing", and the
  source note (card D21) names it, but no test pins it: without it the build would write `.js` files
  beside the simulation's sources, since the configuration has no `outDir`.
  `tests/invariants/test_simulation_type_check.py` would still pass. A one-line assertion on the
  configuration, or on `git status` of the copy after `npm run build`, would close it.

- M8 — `tests/invariants/test_simulation_type_check.py` (`test_typecheck_command_refuses_a_name_the_simulation_has_no_right_to`):
  the case asserts the compiler's exact wording `Cannot find name '<name>'` in the output for each of
  the four planted names. `guidelines/testing.md` "Behaviour, not implementation" says not to fix
  the exact text of a refusal without a requirement that settles it. The author's reason is good — the
  text is what tells the simulation's configuration apart from the browser's, which passes all four
  names — so the pin is not wrong, but it ties the invariant to the wording of one compiler release
  (the package is pinned, so it holds today). A less brittle pin is the error code per name
  (`TS2304` or `TS2584`, which the compiler gives for an unknown name), which keeps the
  discrimination. Within the task (the test is new
  code of this change).

Outside the task:

- M7 — `tests/sim/world.test.mjs:25`: `const lightable = Object.keys(ITEMS).find((id) =>
  ITEMS[id].lightable);` picks by a property, not by position, so it is not item 1's shape; but a new
  lightable item placed before the stick would make it pick that item while the file asserts it is
  the stick. Naming `"stick"` and asserting it is lightable would be independent of the order. Outside
  the task: the task's *To do 1* lists positional picks, and this one is a pick by property.

## Out of scope — for the human at the request (graded as asked in handoff point 3)

- O1 — Three editor cases follow the product's default of a new „Zapas poniżej” condition, which is
  the first item of the player's repertoire in data order: `tests/view/rule-editor.test.mjs` acceptance
  case „Zapas poniżej 8 · Patyk…” (expects 2 commits; a first-in-data made-up item makes it 3), and the
  case at `tests/view/program-editor.test.mjs:1207` that lists the resources offered. These assert the
  product's behaviour, not a pick made by the test, and changing them without a decision would either
  change what the player sees (criterion 1) or weaken the case. Grade: not blocking and outside the
  task as written; it goes to the human at the request: does the default follow the data order (then a
  new first item moves it and the cases are rewritten with it) or is it a decision to write. I agree
  with the cycle's answer. Note it does not cover F1 above, whose cases are the test-built input.
- O2 — Four Mapy-screen cases (`maps-screen.test.mjs`, `account-screen.test.mjs`) list every open map,
  so a new open map first in the data changes them. The task's own *Out of scope* gives the order of
  the Mapy list to task 9; this is correctly left.
- O3 — `tests/sim/data.test.mjs` cases that state the whole content and order of `ITEMS` and `RESOURCES`
  (`:50`, `:280`, `:507`) fail for a new item by design: they are the place a new item is written down.

## Against the task, item by item

1. To do 1 — met apart from F1. Searches I ran in `tests/` (all levels, `.mjs` and `.py`), with a
   positive control that each found the expected remaining lines:
   - `Object\.(entries|keys|values)\((MAPS|ITEMS|RESOURCES|ARCHETYPES|CREATURES|ACTIONS|CONDITIONS|TRAITS|SKILLS|[A-Z_]+)\)\s*\[`
     and `…\([A-Za-z_.]+\)\s*\[\s*[0-9]` — no hit;
   - `\]\s*=\s*Object\.(entries|keys|values)\((MAPS|ITEMS|RESOURCES|ARCHETYPES|CREATURES)` — no hit;
   - every `Object.(keys|values|entries)(MAPS|ITEMS|RESOURCES|ARCHETYPES|CREATURES)` (remaining hits are
     loops, whole-content asserts and `ITEMS_LISTED`, read one by one);
   - lower-case aliases and `.at / .shift / .find / .slice / .pop` on those collections (one hit,
     M7); intermediate names `mapIds`, `itemIds`, `resourceIds`, `mapOrder` (map's own resources, or
     filters, not picks of an entry); `MAPS[` with an index that is not a literal id (all use `SENT.mapId`,
     `MAP_ID` or `mapId`, which are "forest"); words "first/second map|item|resource|archetype|creature"
     in comments and titles (the program-editor cases „the map's first resource” take the first
     resource of `LAS`, the map's own list, and the product's rule; comments at `rule-editor:257`,
     `program-editor:1415` say "the first map" about the step of Las, and the cases name `LAS`/`forest`);
   - the Python tests (`test_map_run_tiles.py`, `test_simulation_inputs.py`, `program_fixture.py`) —
     none picks by position.
   The named lines (`conditions.test.mjs:30`, `traits.test.mjs:86`, `rules.test.mjs:341-342`,
   `completion.test.mjs:29`, `scene-picture.test.mjs`, `acceptance.test.mjs:28`) are by identifier.
   Picks of the order of resources inside the forest's own data (`const [stick, berry] =
   forest.resources.map(...)`) remain; the task lists picks among entries of the collections, so I do
   not count them.
2. To do 2 — met. The sentence at the end of the paragraph and the *Bad* example match the wording of
   question 3 letter for letter (`guidelines/testing.md:111`, `:120-123`); the rule's `Decision:` line
   still cites D-73 · D-74. The *Bad* field now holds two examples in two sentences; the file already
   holds a field with two cases (`:299`), so I take it as in form.
3. To do 3 — met. `createTripPlan`, `createRuleList`, `createRulePanel`, their option and handle
   types, their imports of `createRoot` and `flushSync` and the CSS rule `.rule-panel-host` are gone;
   `rg "createTripPlan|createRuleList|createRulePanel|rule-panel-host|rule-list-host|trip-plan-host"`
   finds nothing outside `.runs/`. `tests/view/rule-editor.test.mjs` draws `RuleListView` and
   `RulePanelView`. The test keeps a local helper `drawnIn` that builds a root and `flushSync`, i.e. the
   removed factories' mechanism in the test file; it draws the components the game draws, which is what
   the task words, but it is a second copy of that island code under `tests/` (not a finding by D-264,
   which is about a second harness for a screen).
4. To do 4 — met, and the breadth is within the task's words (handoff point 2). The task says „z wyboru
   reguły programu … znika parametr z mapą, którego żadna funkcja nie czyta”, and its source
   (`architektura_loop2.md`, P6) says the parameter "jest przekazywany przez kilka funkcji wyboru reguły
   i na końcu nigdzie nie czytany" — the chain, not two lines. I confirmed no removed parameter is read:
   `npm run typecheck` passes with all of them removed (a read of an undeclared `map` would fail), and
   in `combat.ts`, `program.ts`, `run.ts` and `game.ts` the remaining `map` parameters
   (`finishMinute`, `stepMinute`, `minuteBeforePick`, `newMapRun`) are read. `actionFeasible` stays (D-394).
   The changed invariant test `tests/invariants/test_simulation_inputs.py` (invariant
   `simulation-inputs`) only loses the map argument at its call lines; what it checks is unchanged; I
   did not run it (it builds copies and runs for minutes); the author reports exit 0.
5. To do 5 — met. `ReactNumberField` takes a required `rule: NumberRule`; it imports neither
   `program-editor.ts` nor `trip-editor.ts`; no other file of `src/browser/view/controls/` imports a
   module of a screen (`grep 'from "\.\./'` over the controls, minus `sim/`). See "Nothing the player
   sees changes" below.
6. To do 6 — met. `rg -i "right-area|RightArea"` over the repository (not `.runs`, `node_modules`,
   `dist`) finds nothing; "right area" in prose remains only for the Mapy screen and a layout decision,
   which speak of other areas. The guidelines name the new name
   (`guidelines/coding-browser-module.md`, kept alphabetical; `guidelines/styleguide-browser-view.md:846`).
7. To do 7 — met. `fire` and `press` stand once in `tests/view/page-document.mjs`, with three cases in
   `tests/view/page-document.test.mjs` (a press runs inside act; a press of `null` fails in the
   harness's words; `fire` is of the target's window and a `pointerout` is a mouse event). The four
   variants of the task are folded without change of meaning: the window parameter of
   `run-screen.test.mjs` was always the target's window; `uncaught-failure.test.mjs` awaits the same
   promise; the `fire(document, …)` case works through `target.ownerDocument ?? target`. The remaining
   local `press`/`fire` (`end-window.test.mjs:607`, `chronicle-entries.test.mjs:33`, `camp-picture`,
   `scene`, `tile-list`) are other things by name. Against D-264 (the harness "awaits React's work through
   `act`") and D-268 (one place a test file takes its helpers from): adding two helpers fits both and
   needs no change of the two entries; the harness gives each case a fresh window, and the helpers take
   the window from the target, so a stale global window is not read.
8. To do 8 — met; see "Item 8" below.

## Nothing the player sees changes (handoff point 4)

I compared the old and new `src/browser/view/controls/react-number-field.tsx` path by path.
- Range rule (`rule-panel.tsx` gives `(text, held) => readNumberField(text, held, number)`; the
  function never returns null): Enter commits and shows the committed number; blur commits when typed
  and shows the held number — as before.
- Trip rule (`readTripCount`, `{ value, commit: true }` for a valid count, `null` otherwise): Enter on a
  valid count commits every time, also when equal to the shown one; Enter on an invalid text calls
  `onReject` and keeps the text; blur on an invalid text keeps it and reports only when typed, then sets
  `typed` false; blur on a valid typed text commits and clears the draft; the focus keeps a rejected
  text — all as the two old branches did. The message „Wpisz liczbę całkowitą od 1.” still comes from
  `trip-plan.tsx` (`COUNT_MESSAGE`) under the condition `rejected` is set. D-181's rule (previous count
  kept, message under the field) holds; D-265's tree of the React and DOM forms is untouched (the DOM
  form `number-field.ts` is unchanged; the same-tree cases pass).
- The other removals (factories, CSS rule for a host nothing built) change no drawn tree.
- Evidence: `node --test` over eight files, exit 0, 248 passed (below).
I took no screenshot and ran no real browser: no drawing, class or value changed.

## Item 8 (handoff point 6)

- `tsconfig.sim.json`: `lib ["ES2022"]`, `types []`, `rootDir src/browser/sim`, `include
  src/browser/sim/**/*.ts`, `noEmit`. `scripts/build.mjs` runs it first, before the browser and server
  configurations, for both `npm run typecheck` (`--check`) and `npm run build`. `npm run typecheck` on
  the real tree: exit 0. The Dockerfile (`COPY tsconfig.*.json`) and `.dockerignore`
  (`!tsconfig.*.json`) already take the new file.
- `tests/invariants/test_simulation_type_check.py` can fail for the right reason: it appends a use of
  `document`, `setTimeout`, `console` and `structuredClone` to `src/browser/sim/hex.ts` in a copy of
  the tree (never the real one), requires `npm run typecheck` and `npm run build` to fail and the output
  to hold `Cannot find name '<each>'` — so the browser configuration (which has the DOM library and
  passes all four) is not what stopped it — requires no `dist/public/main.js` after the failed build,
  and compares `tsc -p tsconfig.sim.json --listFilesOnly` with the `.ts` files on disk. A configuration
  that adds `DOM` to `lib` or `node` to `types` makes it fail (the four names are found). I did not run it
  (about ten minutes with its copies; the cycle's gate runs it); the author reports it failing before the
  configuration and passing after. What is not pinned: `noEmit` (M6) and the exact `types: []`
  (a `types: ["node"]` is caught by `setTimeout`, `console`, `structuredClone`; an empty `lib` is
  caught by nothing else, but not a claim of the invariant).
- Part map claim: `tsconfig.sim.json` and the invariant test are listed under `build-tools`; the
  sentence gains "checks the simulation's types under a configuration of their own". `python -B
  .the-way/elements/common/foundation_check.py` reports `0 errors`, so every tracked file is claimed.
  The claim is complete for the new files.

## Foundation entries against their sources (handoff point 1)

Compared with rows 1–4 of the task and the note `architektura_loop2.md` (D14, D15, D21, D11, P6) that
the rows cite.
- D-393 (row 1, with row 3's wording folded into the sentence): keeps both checks and "neither is
  shortened because the other covers part of it" (answer to question 2). *Rejected* holds both ways the
  row's source keeps — cutting the part of the scan the compiler takes over, with the reason
  („trzeba go rozciąć precyzyjnie … zadanie rośnie, ryzyko luki”), and moving the simulation to a
  directory of its own, with the cost from card D11 and the reason the human rejected it (D-07: the
  server computes nothing of the game). Nothing in them is invented. *Rationale* draws on the *Need*
  and on card D21 (`Date` is a type of the language; an import of a package with types of its own). One
  addition of the author's is the sentence that a configuration that only checks leaves the compiling to
  the browser's one "so the files are built once" — a consequence of `noEmit`, which the note's D21 names;
  I accept it.
- D-394 (row 2): says `actionFeasible` stays because tests use it to observe whether an action is
  allowed; *Rejected* is question 1's *Not chosen* (rewriting seven files of tests onto another public
  function, the work grows, the tests lose the simplest point). M5 for the extra clause of the
  *Rationale*.
- Invariant `simulation-type-check` (row 3): keeps all four parts of the row's sentence (covers every
  file of the folder, library of the language alone, no ambient types, both commands run it);
  *Part* `simulation · build-tools`, *Method* `test`, *Derives from* D-393. The test names it in each
  case (`# invariant: simulation-type-check`). `simulation-isolation` *Derives from* gains D-393; its
  sentence and test are unchanged, as D-393 says.
- D-395 (row 4): keeps the meaning of the row — no import of a screen's module by a shared control; the
  rule that belongs to one screen comes from that screen; the function form comes from the source's
  D15 ("przyjmuje funkcję sprawdzającą zamiast parametru `rule="trip"`") and stands in *Verification*.
  *Rejected* is `unknown`, see M4. The *Rationale*'s words about reading the control without reading
  its screens are the writer's, close to the row's third column; within what the template allows for
  prose written by the author.
- D-06: edited in place for the third configuration. The task asked this change ("both configurations"
  stops being true); the new sentence says the third configuration is a check that emits nothing, the
  source note's D21 wording (`noEmit: true`). The *Rationale* adds that D-393 gives it. No other entry
  that mentions "both" configurations became false (`application-build-output` stays true).
- Part-map line: see item 8.
- Nothing in these entries settles anything the task did not settle that I could find, apart from M4/M5.

## The testing rule and the style of the tests (D-73) and the harness (D-264, D-268)

- The added `guidelines/testing.md` sentence is the one the task gives; it applies the existing
  requirement of explicit inputs and needs no decision (task *Context*). F1 is a place where the rule
  is not applied.
- Changed test files read as diffs: every item-1 file now names `"forest"`, `"forestDeep"`, `"stick"`,
  `"berry"`, `"elementalMage"`; `acceptance.test.mjs` now asserts `forest.name === "Las"` of a map
  picked by identifier; `data.test.mjs` renamed `firstMap` to `forestMap` so names say what they are.
  Changes for item 4 only drop the argument; the expected values are not changed. A changed invariant
  test is named above (`test_simulation_inputs.py`).
- No new technology: no reserved choice taken (no language, library, store, login, place to run).
- No screenshot file in the range.

## Declined to judge

- The look and the drawing of any screen: nothing drawn changed and the author took no screenshot; I
  took none.
- `tests/invariants/test_simulation_isolation.py` and the guideline `guidelines/coding-simulation-module.md`
  ("Izolacja symulacji"): not in the task; the author left them unchanged and the task keeps the test whole.
- The order of the Mapy list and the place of Skraj lasu in the data: the task's *Out of scope* (task 9).
- The 211 literal `"forest"` occurrences: the task's *Out of scope*.
- `guidelines/coding-simulation-module.md` "Izolacja symulacji" does not mention the compiler check
  that now enforces part of it, and its *Where in code* does not name `tsconfig.sim.json`; the rule
  stays true and the task does not ask for a change of that guideline.
- The comment of `tabs-area.tsx:1-18`, whose rewrap left line 5 longer than its neighbours: prettier
  passes it and it changes no meaning.
- The local `drawnIn` helper of `rule-editor.test.mjs` (a root and `flushSync` in the test file, the
  mechanism of the removed factories): by D-264 a "second harness for the next screen" is forbidden, and
  this is a helper of one file that draws the components the game draws; I set it aside as within what
  the task words for To do 3.

## Checks I ran

| Command | Exit | Note |
|---|---|---|
| `git rev-parse HEAD` | 0 | `8e5af859593ac49371a1e7d79fe414b828170542` |
| `git log` / `git diff 6ab6a32b..8e5af859` (stat, and the diffs of `foundations/`, `guidelines/`, `scripts/`, `src/`, `tsconfig.sim.json`, `tests/invariants/`, `tests/view/page-document*`, `rule-editor`, `react-controls`, and the item-1 and item-4 files named above) | 0 | read |
| `npm run typecheck` | 0 | includes the new `tsconfig.sim.json` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npx eslint src/browser/sim src/browser/view/controls src/browser/view/trip-plan.tsx src/browser/view/rule-panel.tsx src/browser/view/rule-list.tsx src/browser/view/tabs-area.tsx tests/view/page-document.mjs tests/view/rule-editor.test.mjs tests/sim/skills.test.mjs` | 0 | no output |
| `node --test tests/view/react-controls.test.mjs tests/view/trip.test.mjs tests/view/trip-plan.test.mjs tests/view/rule-editor.test.mjs tests/view/page-document.test.mjs tests/view/tabs-area.test.mjs tests/sim/rules.test.mjs tests/sim/program.test.mjs` | 0 | 248 pass, 0 fail, on the `dist` of the worktree (it holds `tabs-area.js`, the new `react-number-field.js`, no made-up map) |
| `rg` searches of item 1 and of the leftovers (right-area, the three factories, CSS hosts) | 0 | listed above |
| manual: old and new `react-number-field.tsx` compared path by path | — | see "Nothing the player sees changes" |
| `git worktree add --detach <scratchpad>\mut-wt 8e5af859` (then a junction to `node_modules`) | 0 | a separate worktree of the head for the mutation run, so the reviewed worktree, its index and branch stay as they were; `git rev-parse HEAD` there is `8e5af859593ac49371a1e7d79fe414b828170542` |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "<the four changed simulation files>"` in that worktree | 0 | the command of `guidelines/testing.md` "Mutation testing" with the changed files. I gave `combat.ts` whole and the other three by line ranges around the changed lines (`game.ts:160-190`, `program.ts:195-215, 280-300, 370-380, 425-510`, `run.ts:100-125, 645-670, 690-790`). Result: 328 mutants, 308 killed, 1 timeout, 17 survived, 2 not covered; score 94.21 (combat.ts 90.70, game.ts 96.00, program.ts 96.64, run.ts 93.88); 6 min 45 s |
| `git worktree remove --force <scratchpad>\mut-wt`; `git status --short` and `git rev-parse HEAD` in the reviewed worktree | 0 | the scratch worktree is gone; the reviewed worktree is clean and at the same head |

**Mutation run, each survivor classified (WAY of `guidelines/testing.md`, D-94).** None of the 19
non-killed mutants is a gap this change opened. The change removed parameters and arguments, so a
survivor that follows from it would be in a changed line and about the removed map; there is none.
- `combat.ts:28` (`if (!selected)` made `false`) and `:29` (the message of that error, not covered),
  `:88` (`if (!effect)` made `false`) and `:89` (its message, not covered), `:49` (`characterHealth > 0`
  in the turn loop, two mutants), `:96` (`damage > 0`, two mutants): lines this change did not touch
  (`:28` and `:29` lie within two lines of a changed call, but the guards and their messages are
  as before); they are survivors of the code as it stood, of kinds no case in `tests/sim` forces
  (a guard that throws on an impossible state, a loop bound, a zero-damage edge).
- `game.ts:184` (`run.minute < current.endMinute` made `false`): unchanged line; the `judgeProgram` call
  itself, now with one argument fewer, has no survivor.
- `program.ts:492` (`{ throughWinner: true }` replaced by `{}` and by `false`) and `:507` (the same
  option in `chooseCombatRule`): in changed call lines, but about the option `throughWinner`, which only
  stops the judging early, so the winner is the same: an equivalent mutant. `program.ts:196`
  (`campfire.minutesLeft` optional chaining): unchanged line.
- `run.ts:730` (the `cause` string `"combat"` of a death), `:741` (four mutants on the
  `attackCooldownStart` spread), `:755` (`<` to `<=` on the chance draw): unchanged lines, in the
  death and attack code the change did not touch; I did not analyse them further than that no
  survivor lies in a changed line. The lines this change
  changed in `run.ts` (`startActivity`, `pickActivity`, the `resolveCombat` and `pickActivity` calls in
  `finishMinute`) have no survivor.
I added no assertion and propose none: no survivor lies in the change.

Not run, with the reason: `npm test` (the cycle's gate, not mine); `tests/invariants/test_simulation_type_check.py`
and `test_simulation_inputs.py` (copies of the tree, about ten minutes; the cycle's gate runs them; I
read the first whole and the diff of the second); a trial of criterion 2 with a made-up first map and
item (I relied on the author's trial and checked the three cases it names by reading the tests); a real
browser (no visible change). Correction of the first report: it listed the mutation run as not needed
because only parameter lists changed; `guidelines/testing.md` "Mutation testing" and D-94 make that run
the reviewer's for every changed simulation file, so it is done above.

## Reaches beyond the dispatch

- `the note of the architecture analysis, in the author's private notes`
  (P6, cards D14, D15, D21, D11), to compare the entries and the breadth of To do 4 with the source the
  task's rows cite.
- `.the-way/elements/decisions/template.md` (the *Rejected* of a decision from a row, the `unknown`
  rule), `.the-way/product-guidelines/testing/template.md` ("Writing the file", the rule fields), to
  judge D-395 and the *Bad* field.
- `Dockerfile`, `.dockerignore` (`tsconfig.*.json`), `tsconfig.browser.json`, `tsconfig.server.json`,
  to judge the new configuration and its claim.
- `stryker.config.json` (its `buildCommand`, `ignorePatterns`, the files it lists) and `.gitignore`
  (`.stryker-tmp` is not ignored, which is why I ran the tool in a separate worktree), to run the
  mutation tool as `guidelines/testing.md` gives it.
- `the author's rule on writing scripts`, before the one throwaway Python script that
  matched the survivors of the mutation report to the changed lines.
- `tests/invariants/loop2_invariant_support.py` (`TreeCopy`, `files_under`, `run` by name) to see that
  the new invariant test uses helpers that exist.

## Unread material

Decisions of my selection: **20 read whole, 5 read in part, all 395 headings run through by title
(about 370 by title only).** Counted after the second reading.
- Whole (20): D-04, D-73, D-74, D-75, D-77, D-78, D-81, D-82, D-83, D-84, D-94, D-181, D-264, D-265,
  D-266, D-268, D-351, D-393, D-394, D-395.
- In part (5): D-06 (the changed paragraphs through the diff, not the whole entry); D-76, D-79, D-163,
  D-235, D-273 (read to their binding sentence, scope, relations, verification and origin, the long
  *Rationale* lines cut at 700 characters, and for D-235 and D-273 the fields only to the start of
  *Verification*). I judged by what I read that none bears on a test this change touches: they are the
  fonts and preview server, the npm registry, the SMTP service, Strych and `pusher`, and the sprite
  files; no test touched by the change reaches those boundaries.
- By title only: the rest of the log (headings D-01 to D-395 run through once).
- A decision whose title points to a bearing on the change and which stayed unread: D-44 (the controls
  the screens build on; the change keeps the shared number field and its tree), D-267 (rules of hooks and
  effects; the guideline restates it, and I read its application in the three changed components, none of
  which gained a hook or effect), D-276 and D-311/D-343/D-346 (the tab and the area under the
  drawing; the rename touches no behaviour), D-18 (content lives in the data files; applies to
  `src/`, which the change leaves), D-35 and D-36 (the exemplar files of simulation and browser modules),
  D-85, D-88, D-89, D-130, D-263 and D-269 (D-269 only to the end of its first sentence). I did not open
  them; the guidelines I did read whole restate those of them that bind a test or a module.
- Invariants: `simulation-isolation`, `simulation-inputs`, `simulation-type-check` and
  `content-identifiers` read whole; the others by their headings only. Glossary: read whole (252 lines);
  no term of the change lacks an entry that a sentence of the changed files would be read wrongly for.
  Part map: read whole (the part descriptions, files, dependencies and trust boundaries of all eight parts);
  the lines for `build-tools` and the new files are as judged above.
- Guidelines, each read whole: `guidelines/coding.md`, `coding-browser-module.md`,
  `coding-simulation-module.md`, `testing.md`, `styleguide-browser-view.md` and `src/browser/AGENTS.md`
  (the last one 9 lines). I did not read the other `guidelines/coding-*.md` files (content data, saved
  game, HTTP application, password hashing, database access, session store, account policy, browser
  API client, mail sending): their kinds do not apply to a file of the change. The guideline template files
  of the-way (`.the-way/product-guidelines/testing/template.md`) I read only the "Writing the file" section.
- Test and source files read whole: `tests/view/page-document.mjs`, `tests/view/tabs-area.test.mjs` (as a
  new file in a diff), `tests/invariants/test_simulation_type_check.py`, `src/browser/view/tabs-area.tsx`,
  `src/browser/view/trip-editor.ts`, `src/browser/view/trip-plan.tsx` (from line 28; the first 27 lines
  through the diff), `src/browser/view/controls/react-number-field.tsx`, `scripts/build.mjs`,
  `tsconfig.sim.json`.
- Read through the diff only (not whole): `src/browser/view/rule-list.tsx`, `rule-panel.tsx` (the hunks
  are deletions and one prop), `tests/view/rule-editor.test.mjs`, `react-controls.test.mjs`,
  `page-document.test.mjs`, the item-1, item-4 and item-7 test files, and the 111 call sites of item 4
  in `tests/sim/` (sampled: campfire, skills, conditions). The unread parts of `rule-list.tsx` and
  `rule-panel.tsx` could hold a hook or effect rule departure that a diff does not show; the change does
  not touch them.

## Searches not found or unclear

- The task's numbers for item 1 (33 files, `scene-picture.test.mjs:874`, `styles.css:2665`) are from an
  older commit; the tree now differs. Not an obstacle.
- Whether `tests/view/program-editor.test.mjs` `ITEMS_LISTED` was meant to be left: the author's
  handoff and report call it "all items"; the task's *To do 1* speaks of `Object.keys(ITEMS)` "rozpakowane
  po pozycji i warianty". I read it as a variant (F1). If the cycle reads it the other way, F1 becomes
  a Minor with the same fix.
- No test or rule that pins `noEmit` of `tsconfig.sim.json` (M6): looked for it in the invariant test,
  `scripts/build.mjs` and the part map; not found.
- Whether the line ranges of `--mutate` narrowed the run: the output says only "4 source files with 328
  mutants". Every survivor lies in `combat.ts` (given whole) or inside a range I gave, which fits
  ranges honoured, but I did not check it; it does not change the result, since the changed lines
  are inside the ranges.
- Whether the guideline files outside the six I read whole bear on this change: found none by their
  "When to read" lines in `guidelines/coding.md` (each kind names the files it covers; none names a
  file of this change).
- Whether a rule of the-way requires the human's question before `unknown` in a *Rejected* of a
  decision written from a row: the template (`elements/decisions/template.md`) allows `unknown` "written
  with no question to the human"; found, so M4 is only a Minor.
