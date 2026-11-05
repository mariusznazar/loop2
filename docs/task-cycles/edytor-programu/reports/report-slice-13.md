# Report — slice 13 of `edytor-programu`: the editor in its place on both screens, the DOM editor gone

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done with concerns. **Commit:** `3664173` (base `3d81280`), not pushed.

## What was made
- `terrain-panel.ts`: new `ruleHost` (an empty hidden `div.rule-panel-host` after the drawing) and `showRulePanel(open)` (hides the table of revealed tiles and shows the host, or the reverse; the drawing stays); `createTerrainPanel()` keeps its no-argument signature (`test_terrain_drawing_numbers.py` builds it).
- `run-screen.ts`: gives the program panel that host and the screen's reaction.
- `program-panel.tsx`: new `placeRulePanel(host, onOpen)`; with a host the rule panel is drawn there through `createPortal` of the panel's own React tree; a layout effect tells the screen when a rule or group opens or closes; `dispose()` says `false`; `commitEditor()` also counts a focused field inside the host as part of the editor; with no host placed the panel still draws the rule panel beside the rows.
- `game-view.ts`: Programy gets a third area `section.rule-panel-area.screen-area`, placed with the same call; the screen gets the class `with-rule-panel` while a rule is open.
- `styles.css`: Programy with a rule open is three columns `1fr 3fr 2fr`; under 1100 px the panel goes under the editor; under 720 px every area gets its own line; `.rule-panel-host` takes the table's place; the area draws no frame of its own.
- `program-editor.ts`: `createProgramEditor` and everything from `type ConditionView` on removed, with the DOM-control imports; pure functions with no user left removed (`moveGroup`, `showFieldRange` with `UNSET_RANGE`, `offeredConditionKinds`); `StructuralEdit` stays (used by `focusAfter`).
- `trip-editor.ts`: `createTripEditor` removed; `tripCount` and `tripChoices` stay in this file (now only those two pure functions), so no import line changed in `react-number-field.tsx`, `trip-plan.tsx` or `tests/view/trip.test.mjs`.
- `rule-panel.tsx` (beyond *Change*): the number input is `select()`ed when focus goes to it; the slice-12 Enter `preventDefault` untouched.

## Cases removed from `tests/view/program-editor.test.mjs` (each with its reason and the case that carries its behaviour)
- "group arrows move the whole group…" (`moveGroup`): group arrows no longer exist; carried by `program-editor.test.mjs` "a rule group is dropped before another group or at the end…" (`dropGroup`), `rule-editor.test.mjs` "groups do not move by the keyboard…" and "a group dragged by its handle shows the line…".
- `editorDocument`, `descendants`, "count-only refresh changes count text without writing field values or replacing controls": drew the DOM editor; carried by `rule-editor.test.mjs` "counts stand where the page gives them…" and `program-panel.test.mjs` "during a map run the copy stands first and is shown with counts…", "time passing keeps what is typed in the name field and in an editor field, and the focus", and the 16× case.
- "the number field's range and step follow the condition kind…" (`showFieldRange`): function removed; carried by the new `rule-editor.test.mjs` case "the number field of the panel takes the range and the step of the condition kind" (eight kinds).
- `withEditorDocument` and five cases that drew the DOM editor's selects, carried by: "group conditions offer the same kinds…" (`withConditionKind`, kept); "a section holds only what the Understanding holds…" and `rule-editor.test.mjs` "„+ reguła” is disabled while the Understanding holds no action"; "a value the rule holds outside the pick stands chosen and greyed…"; "target lists follow the Understanding's items…" and "a target is picked from the resources of the Understanding alone…"; the greyed-reasons case for „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” and „Zapas poniżej”.
- Three `offeredConditionKinds` assertions in kept cases and the case "kinds that name a resource or an item are not offered…": function removed (the pick greys instead of hiding); the action half kept as "actions that name a resource are not offered while the Understanding holds no resource for them"; the condition half carried by the greyed-reason case.
- `account-screen.test.mjs` had no case that read the table of revealed tiles beside an open panel (searched `tile`, `table`, `terrain`, `rule-panel`, `run-screen`); two new cases written instead.

## Tests written
- `account-screen.test.mjs`: "on the screen of a map run an open rule panel stands in the place of the table of revealed tiles, beside the drawing, and the table comes back at „✕”" (seen failing first with the `placeRulePanel` call in `run-screen.ts` disabled: exit 1, `in the place of the table: expected a true value, got false`); "on Programy the list, the editor and the open rule panel are three areas…".
- `program-panel.test.mjs`: a rule panel given a host stands in it and the screen is told when it opens and closes; a number typed into it at 16× keeps its text and focus.
- `rule-editor.test.mjs`: number-field range per kind; "the number field is selected when the focus goes to it…" (seen failing with the `select()` call removed, exit 1).
- Mutations considered, all caught by a case: the drawing hidden along with the table; the host left occupied after close; no `false` on dispose; the portal replaced by an in-place draw; a wrong range per kind.

## Checks (all exit 0 unless noted)
`npm run typecheck`; `tests/view/account-screen.test.mjs` (128); `program-editor.test.mjs` (52); `program-panel.test.mjs` (45); `rule-editor.test.mjs` (61); `trip-plan.test.mjs` (11); `tile-list.test.mjs` (9); `trip.test.mjs` (7); `react-controls.test.mjs`; `test_browser_view_framework.py` (9); `test_browser_view_token_values.py` (4); `test_browser_view_focus_outline.py` (3); `test_terrain_drawing_numbers.py` (3); ESLint `src/browser tests/view --max-warnings 0` and Prettier `--check` on changed files. `tests/quality/test_quality_invariants.py` exit 1: only the two base errors. Not run: the full gate; `foundation_check.py`.

## Own-work check and real-browser evidence
Weakest point: the rule panel now stands in an element outside the program panel's own element (focus return, uncommitted text on a program switch, the number field at 16× and React events through a portal could break only in a real browser). Checked in jsdom and in Chromium (`playwright-cli` on `npm run local`, a composed state with two groups and three rules, viewports 1500×1000 and 1000×1000):
- Closing: after „✕” the focus is on the row of rule 1, the table is back (`display: table`), the host hidden.
- 16×: `17` typed into rule 1's number field, sampled every 200 ms for 3 s while the game went from minute 7 to 52: all 15 samples `17`, focus on `Liczba`, panel in the host, table hidden; one more digit gave `170` (cursor at the end); Enter committed the value (clipped to 50) and moved focus to the next pick `Patyk`, not skipping it (the slice-12 Enter fix holds in the new place).
- Drag: rule 2 dragged onto rule 3 across groups changed the order from `1,2 | 3` to `1 | 2,3`; `.drop-line` count 1 during the drag, 0 after; a cancelled drag (mouse down, move over a row, Escape, mouse up) left the count at 0 and the order unchanged.
- Six actions: the first run gave `… 50 …` — a defect: the number field took focus with its digits unselected, so the typed 8 stood beside the default 8 (88, clipped to 50); fixed in `rule-panel.tsx` (select on focus); after `npm run build` and a reload the six actions produced `Zapas poniżej 8 · Patyk → Zbierz — Patyk`.
- Programy: at 1500 px three areas side by side (list x=78 w=216, editor x=318 w=648, panel x=990 w=432); at 1000 px the panel under the editor (x=276, y=475), no horizontal overflow (`scrollWidth` 1000).

## Screenshots (`C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\`)
`slice-13-run-table.png` (map-run screen, no rule open: drawing with the table beside it); `slice-13-run-panel.png` (rule 1.1 open, panel in the table's place beside the drawing, table gone, drawing kept); `slice-13-run-table-back.png` (after „✕”; the DOM check showed the table back; the image was not opened); `slice-13-run-16x-typing.png`; `slice-13-drag-line.png`; `slice-13-six-actions.png`; `slice-13-programy-wide.png`; `slice-13-programy-narrow-1000.png`. `frames.js` not used (the 3 s keep read as 15 DOM samples). Not seen in a browser: 720 px and below (the single-column rule is in the CSS). All processes stopped; `.playwright-cli/` deleted.

## Reaches beyond the handoff
`rule-panel.tsx` (select-on-focus fix and its case; without it the six-action criterion failed in a real browser); `tests/view/program-panel.test.mjs` and `tests/view/rule-editor.test.mjs` (new cases); `trip-editor.ts` kept with two pure functions because `trip-plan.tsx` needs `tripChoices` too.

## Choices
1. Programy's third area uses the same portal mechanism with a host in `game-view.ts` (rejected: a layout prop inside the panel — the rule panel would stay inside the editor's area and defeat D-282's three areas).
2. The panel goes under the editor below 1100 px (content is capped at 1344 px, so below that the grid follows the window; a stack at 1344 would stack for most laptop windows); one number in `styles.css`.
3. Programy columns `1fr 3fr 2fr` with `with-rule-panel`; without a rule open the two-column layout is unchanged.

## Searches not found or unclear
The `account-screen.test.mjs` cases the plan says read the table beside an open panel were not found; the DOM editor starts at `type ConditionView` (line 939), not 534, because earlier slices added pure code above it; `guidelines/coding-browser-module.md` still lists `src/browser/view/program-panel.ts` (a file that no longer exists since slice 12; not in this slice's list).

## Concerns
With no host placed, `createProgramPanel` still draws the rule panel beside the rows (the `program-rule-panel` and `with-panel` path); both game screens no longer use it, only tests that build a bare panel do; kept so slice 12's panel cases stay valid; the whole-change review may prefer a single path. The styleguide and the part map were not touched: the new Programy third area and its 1100 px breakpoint are not recorded there. `foundation_check.py` not run.
