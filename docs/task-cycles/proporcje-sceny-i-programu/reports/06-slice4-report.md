# Report 06-slice4 — slice 4, the screen of a map run in two columns

**Status:** done (with the notes under "Problems and notes").

**Commit:** `d737a1a` `feat: :sparkles: draw the screen of a map run in two columns with the tabs under the world and the rule panel in the program` (base `f9a5b86`).

## Files changed (added / removed lines)

| File | + | - |
|---|---|---|
| `src/browser/styles.css` | 49 | 26 |
| `src/browser/view/run-screen.tsx` | 37 | 86 |
| `src/browser/view/right-area.tsx` | 8 | 8 |
| `tests/view/run-screen.test.mjs` | 80 | 51 |
| `tests/view/right-area.test.mjs` | 7 | 6 |
| `tests/view/end-question.test.mjs` | 8 | 7 |

What changed:

- `run-screen.tsx`: `createRunScreen` no longer calls `placeRulePanel`; `RunScreenPanel` no longer names it; the store of "rule panel open" (`RuleOpen`, `createRuleOpen`, `useSyncExternalStore`), the host element (`run-rule-host`) and the element that held it (`run-rule-place`) are gone; the third section (class `screen-area run-tabs`) draws `RightArea` whenever the screen has a state. Doc comments speak of the area under the drawing.
- `right-area.tsx`: module and component keep their names; doc comments say "the area under the drawing"; the tabs row class `right-tabs` became `run-tabs-row`.
- `styles.css`: the grid `706px minmax(0,1fr) 336px` from 1276 px is replaced by named grid areas (`world` / `program` / `tabs`): one column with the order world, program, tabs; from `min-width: 1074px` two columns `706px minmax(0,1fr)`, rows `auto 1fr`, areas `"world program" "tabs program"`, the program `align-self: stretch`. `.screen-area.run-right` (336 px column class) became `.screen-area.run-tabs` with the same `overflow-x: auto`. The comments that explained three columns are rewritten with the new arithmetic. Threshold: 706 + 16 + 320 + 2 × 16 = 1074 px.
- Tests: see "Checks".

## Checks (command and exit code)

Failing before the change (tests written first, run on the unchanged sources):

- `npm test -- tests/view/run-screen.test.mjs` → exit 1, 3 of 13 fail, each on its expected assertion: "the rule panel has no host of its own: expected 0, got 1"; "in the program panel: expected a true value, got false"; "the panel stands in the program: expected a true value, got undefined".
- `npm test -- tests/view/end-question.test.mjs` → exit 1, 1 of 17 fails: `renameGroupTo` — "Cannot read properties of null (reading 'focus')" (the name field is not found in the program panel, since the panel then stood in the host).
- `tests/view/right-area.test.mjs` only has names and comments changed; it passed before and after.

Passing after the change:

- `npm test -- tests/view/run-screen.test.mjs` → exit 0 (13 of 13)
- `npm test -- tests/view/right-area.test.mjs` → exit 0 (13 of 13)
- `npm test -- tests/view/end-question.test.mjs` → exit 0 (17 of 17)
- `npm test -- tests/view/scene.test.mjs` → exit 0 (19 of 19)
- `npm run typecheck` → exit 0
- `npx eslint --max-warnings 0 src/browser/view/run-screen.tsx src/browser/view/right-area.tsx` → exit 0 (also the three test files: exit 0)
- `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore <the six files>` → exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (4 tests)
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0 (3 tests)

Not run: the full `npm test` (the orchestrator's run, per the handoff). The invariant tests were not seen failing: this slice adds no invariant test and changes none (the new widths are layout dimensions D-43 leaves out; the test passes).

## Own-work check (section 3) and the check in a real browser

Requirement my work most likely misses: the grid row behaviour, that is, the tabs area staying directly under the world (no gap) whether the program is shorter or taller than world + tabs, and the program as tall as the two together. A grid with a program spanning two `auto` rows would push the extra height into both rows and open a gap between the world and the tabs; the second row is therefore `1fr`. Checked in a real browser (Playwright CLI, `loop2-play`, `npm run local`, Chromium, no window), with a made-up account at `example.test`:

- **Window 1280 × 720, a map run of Las** (a saved state composed with `dist/browser/sim`: character "Agent", rule „Zawsze → Eksploruj”, a running action `explore` 0–20 min, paused):
  - world `x16 y47 706 × 611.5`; tabs area `x16 y674.5 706 × 146` (= world bottom 658.5 + 16 gap), the tabs „Kronika” and „Teren” under the drawing and the line of a tile (the line `(1, 1)` is inside the world); program `x738 y47` **526 × 773.5** (= 611.5 + 16 + 146: as tall as the two together).
  - **Program column's width measured: 526 px** at 1280 px (the task's 526 px arithmetic confirmed by the measurement). The scene measured 672 × 304.
  - Rule 1.1 clicked after „Teren” was picked: the rule panel stands in the program, right under the row (the `li` before the panel's item is the `rule-list-row open`), the tabs row shows „Teren” pressed and the table of revealed tiles stands (no change of tab).
- **Window narrower than the threshold:** 1073 px: world `y87 1041 wide`, program `y715`, tabs `y1385` (one under the other in the order world, program, tabs; no horizontal scroll). 1000 px: the same order at 968 px. 1074 px: two columns, program **320 px** (the content 1042 − 706 − 16); there the program (854 px) is taller than world + tabs, and the tabs area still sits directly under the world (`y715` = 87 + 612 + 16), 146 px tall, no gap.
- **„Dodaj regułę z tym”** (state: the first chill, minute 84, composed the same way): the new rule 1.2 is added, its panel opens under the row of rule 1.2 (`data-rule="2"`), heading „Reguła 1.2”, focus on the group „Czynność”, the tabs „Kronika” (pressed) and „Teren” stand unchanged.
- **The question after „Zakończ”:** „Zapisać, odrzucić, wrócić?” stands on **one line** (the text's line boxes: one top; the element 492 × 23 px; the base needed three lines), with „Zapisz”, „Odrzuć”, „Wróć” on the same line. Screenshot read.
- **Console:** `playwright-cli console error` → 0 messages.
- **Added check carried from slice 3 — the badge over the mage at the scale 2 size:** reached with a running action (`explore`, `current.activity.kind = "rule"`; built with `compose-state.mjs`'s pattern, as a one-off script outside the repository; the game paused, the scene grey but the badge drawn). Measured: `.scene-badge .action-icon` **32 × 32 px**; `.scene-badge-bar` **4 px** thick (= `--bar-width` 2 px doubled); the fill 3.19 px of 32 px at 2 of 20 minutes; the badge box 40 × 48 px. These are the values of the former scale 2 (32 px, `calc(var(--bar-width) * 2)`), so the check holds.
- The game and the browser were stopped (`playwright-cli close`; `npm run local:stop` → "Local starts stopped: 1"); `.playwright-cli/` and the local start's output file were deleted.

UI check (`ui_check.md`): the states of the affected components the styleguide requires (the tab buttons, the filter buttons, the pick cells, the rule panel) are those of shared controls and did not change; the screenshots inspected are the 1280 px screen with the world, tabs and program, the same with the rule panel open, the question after „Zakończ”, and the narrow one by measurement only (the narrow window screenshot was taken but not opened: its order and positions were read from the rectangles above).

## Reach beyond the dispatch (section 1)

- `src/browser/view/program-panel.tsx:131-181` was in the *Read*; I also read lines 100-130 (the memory of folding) only to see where the `ProgramPanel` type begins. `src/browser/view/rule-list.tsx` and `tests/view/program-panel.test.mjs:295-364` (slice 1's tests of "under its row") to write the new assertions the same way (`header.nextElementSibling.contains(panel)`). `tests/sim/understanding-fixture.mjs` and `.claude/skills/loop2-play/compose-state.mjs` for the browser state. Why: to model the new assertions and the state on what exists.

## Searches not found or unclear

- None unfound. Unclear: the task's "line of a tile" is in the world (`.tile-line` is inside `world-area`), so "under the drawing of the map and the line of a tile" means the tabs area stands below both; confirmed by the measurement (tile line `y627`, tabs `y675`).

## Choices made

- **Class names:** the third section is `screen-area run-tabs`, its row of tabs `run-tabs-row tabs`. Rejected: keeping `run-right` and `right-tabs` (the names would lie about the place). Cost if wrong: only the stylesheet and the tests that read these classes (the tests read `.screen-area` order, `tabs` and `chronicle`, not `run-tabs`).
- **Rows `auto 1fr`** rather than `auto auto`: with `auto auto` the program, which spans both rows, would spread its surplus height over both rows and open a gap under the world. Cost if wrong: none seen; checked at 1074 px where the program is taller.
- **Program `align-self: stretch`, tabs `start`:** the program's frame reaches the bottom of the tabs area (as tall as the two together); the tabs area is not stretched to a taller program (its frame ends under its content), so the empty space of a long program stands beside nothing rather than inside the tabs area's frame. Rejected: stretching the tabs area too. If the human prefers the tabs frame to reach the program's bottom, it is one declaration (`align-self: stretch` on `.run-tabs`).
- **Column `minmax(0, 1fr)`** for the program (not `minmax(320px, 1fr)`): the threshold already guarantees 320 px, and `minmax(0, …)` keeps a wide program from widening the grid.
- **The names of the tests** speak of "the area under the drawing" and "tabs" (not "right"); the component keeps `RightArea` (plan, *Choices*).
- **`placeRulePanel` left in `ProgramPanel`** (`program-panel.tsx`, its hosted path and its test `tests/view/program-panel.test.mjs:973`): not in this slice's *Change* list; it is now used by no screen (see below).

## Problems and notes

1. **Dead hosted path.** `ProgramPanel.placeRulePanel`, its `ruleHost` prop and the portal (`program-panel.tsx:11, 154, 335, 359, 672-680, 705, 741, 793-794`) have no caller left except `tests/view/program-panel.test.mjs:973` and stubs in `tests/view/scene.test.mjs:428, 745`. Slice 1's commit said "the hosted path stays". Whether to remove it is for the orchestrator (a later slice or none).
2. **Stale wording outside this slice's files** (not changed): `src/browser/view/chronicle.ts:21` ("the right area"), `src/browser/view/tile-table.tsx:4`, `src/browser/view/world-area.tsx:52` ("the chronicle of the right area"), `guidelines/styleguide-browser-view.md` (lines 128-129, 596-597, 626-628: the scale 2 and the right area; the task's To do 5 names them), `guidelines/coding-browser-module.md:57` (a table row, no wording to change), and `.claude/skills/loop2-play/SKILL.md` step 5 of "Compose a game state" ("click „+ reguła” … to open the rule panel, which takes the place of the table of revealed tiles" — no longer true: the panel now opens under the rule and the tabs stay).
3. **Scrollbar:** the threshold and the 526 px are computed on a viewport with no classic scrollbar; the headless Chromium here has overlay scrollbars (the grid measured 1248 px in a 1280 px window). A browser with a 15-px classic scrollbar has the program 15 px narrower at the same window width (511 px at 1280; 305 px at 1074). A media query counts the scrollbar's width, so the "320 px at least" holds only without a classic scrollbar. A guess for the cost: small; raising the threshold by 15 px (1089 px) would cover it. Not changed: the plan gives about 1074 px.
4. **Foundation entries:** no sentence of D-311, D-282, D-288, D-346, D-19, D-343, D-349 is wrong for the code. D-311's *Verification* "the area with the tabs … under the drawing of the map and the line of a tile in the left column" holds as measured.
5. The first browser state I composed (a default new game) made the character wait (the action „explore” is not in a new game's Understanding), so the badge was not drawn; the state of the report uses `newKnowingGame()` of `tests/sim/understanding-fixture.mjs`.
