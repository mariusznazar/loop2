# Plan — Drobne błędy ekranów z uwag PR-ów — edytor programu, panel reguły, siedziba, konto i scena

- Task: `.runs/task-cycles/drobne-bledy-ekranow/task.md`
- Spec: none
- Base: bd82d394e8ea08c77c8c8afb695bd931706f1644

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — D-297: „↑” disabled only where no group stands before the rule's group, „↓” only where none stands after it; an empty group at the edge takes the rule | decision, changed sentence and *Verification* | Settlements row 1; To do 14 | none — the code and its tests already do it; the `decision: D-297` lines of the tests are re-quoted |
| Row 2 — D-306: deleting a rule closes its panel; moving it to another group does not | decision, changed sentence | Settlements row 2; To do 15 | Slice 8 |
| Row 3 — D-350: *Rejected* reads that the player would lose the open field and the place in it | decision, changed *Rejected* | Settlements row 3; To do 15 | Slice 8 |
| Row 4 — D-04: the view draws also from the player's acts on the copy with the copy before and after them (chronicle), from the page's memory of the end-of-run window, and from the place the browser gives for the walking mage (scene) | decision, changed sentence | Settlements row 4; To do 16 | none — no code changes |
| Row 5 — D-207: the 30-second rhythm and the hidden page send also where the save last sent failed | decision, changed sentence | Settlements row 5; To do 17 | Slice 16 |
| Row 6 — D-285: a click outside leaves focus where the player clicked; focus returns to „Konto” after Escape, a second click on „Konto” and a click on a place that takes no focus | decision, changed sentence | Settlements row 6; To do 18 | Slice 17 |
| Row 7 — the styleguide's sentence of the menu „Konto” says what row 6 says | styleguide, rule "Menu bar, the menu „Konto” and the list of programs" | Settlements row 7; To do 24 | Slice 17 |
| Row 8 — D-172: with no unsaved changes of the copy the line reads „Program {name} ma zmiany, których nie ma w tej kopii.”; the full sentence only with unsaved changes | decision, changed sentence | Settlements row 8; To do 19 | Slice 10 |
| Row 9 — D-342: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj”” | decision, changed sentence | Settlements row 9; To do 21 | Slice 11 |
| Row 10 — the source of `grayscale(1) brightness(0.55)`: accepted by Mariusz on 2026-11-16 | data or code — a comment of a stylesheet; written by Slice 21, not by the agent of these entries | Settlements row 10; To do 22 | Slice 21 |
| Row 11 — the pieces of the time bar have one colour, told apart by order, gap, length and the legend in the same order; the item leaves „Otwarte dla człowieka”, the two others stay | styleguide, rule "The end-of-run window" | Settlements row 11; To do 23 | none |
| Row 12 — a greyed pick cell takes no highlight under the pointer, its dashed frame in `text-disabled` | styleguide, rule "States of shared controls" | Settlements row 12; To do 9 | Slice 2 |
| Row 13 — a long name typed by the player with no space breaks in its row and does not run out of it | styleguide | Settlements row 13; To do 2 | Slice 13 |
| Row 14 — where the element holding focus goes away, focus goes to the element standing in its place or nearest to it, never to the page | styleguide | Settlements row 14; To do 4, 5, 6 | Slices 8, 14, 15 |
| Row 15 — D-294: each new copy, after a send and after a switch to another program, has every rule group unfolded | decision, changed sentence | Settlements row 15; To do 7 | Slice 9 |
| Row 16 — the number of a condition stands with the unit of the condition's data on every screen | data or code — the units of `src/browser/sim/data/conditions.ts` and the test that each condition with a number has one; written by the slices, not by the agent of these entries | Settlements row 16; To do 3 | Slices 1, 3, 4, 5 |
| Row 17 — D-381: the page moves focus to the card also after a refused emailed link and after „Anuluj” | decision, changed sentence | Settlements row 17; To do 4 | Slice 15 |

The agent of the foundation entries writes rows 1–9, 11–15 and 17, before Slice 1. Rows 10 and 16 go
to the product's code and data, so their slices write them with the code (`task-cycle/skill/foundation_step.md`).
Where a sentence the agent changes leaves a line `decision:` of a test quoting text that no longer
stands in the decision's binding sentences, the agent re-quotes that line to a sentence of the new
entry that the test still holds, changing nothing else of the test, so that the foundation check
stays green at its head. At the base such lines stand for D-297 in `tests/view/program-editor.test.mjs`
and `tests/view/rule-editor.test.mjs`; for D-207 in `tests/account-api.test.mjs`,
`tests/view/account-screen.test.mjs` and `tests/view/game-saver.test.mjs`; for D-381 in
`tests/view/account-screen.test.mjs`; for D-172 in `tests/sim/copy-actions.test.mjs`,
`tests/sim/trip.test.mjs` and `tests/view/program-panel.test.mjs`; for D-285 in
`tests/view/menu-bar.test.mjs`; and, depending on the wording of rows 2 and 15, for D-306 in
`tests/view/program-editor.test.mjs`, `tests/view/program-panel.test.mjs` and
`tests/view/rule-editor.test.mjs` and for D-294 in `tests/view/program-panel.test.mjs`. The agent
changes `foundations/decisions.md`, `guidelines/styleguide-browser-view.md` and those lines alone.
After row 10's point: the rule with `filter: grayscale(1) brightness(0.55)` stands, since loop2#145,
in `src/browser/run-screen.css`, not in `src/browser/styles.css` as the row's *Goes to* names it;
Slice 21 writes the comment where the rule stands.

## Slices

### Slice 1 — the unit of each condition with a number, held by a test

- **Goal:** Each condition of `src/browser/sim/data/conditions.ts` that takes a number (it has
  `defaultValue`, `min`, `max` and `step`) carries its unit, and a test in `tests/sim/data.test.mjs`
  fails for such a condition without one, so that no new condition with a number comes without its
  unit — the data part of the task's settlement 16. The data hold the units today („°C”, „%”,
  „szt.”, „min”, „pkt”, as D-376 counts the numbers); the slice makes the type of the data or the
  test require them, gives no unit to a condition that takes no number, and changes no number. The
  view does not change here: Slices 3, 4 and 5 make the three places that show the number read the
  unit.
- **Change:** `src/browser/sim/data/conditions.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:7723-7741` D-376 · `foundations/decisions.md:7451-7494` D-23 ·
  `foundations/invariants.md:364-374` program-closed-lists ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/part_map.md:30-61` simulation · `src/browser/view/status-row.ts:70-80` ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the new case of `tests/sim/data.test.mjs` written first and seen failing on a copy of
  the data with one unit taken out, then `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_simulation_type_check.py`
- **Depends on:** none

### Slice 2 — the pick cell: icon at the first line, no highlight when greyed, tab index from a property

- **Goal:** In a cell of the rule panel's pick the action's icon stands beside the first line of
  the name also where a long name („Wytwórz — ognisko”) breaks into two lines (To do 8). A greyed
  cell takes no `highlight` under the pointer, and its dashed frame stays in `text-disabled`, as row
  12 of the plan's Foundation entries puts it in the styleguide (To do 9). The shared pick cell
  (`ReactPickCell`) takes its `tabIndex` from a property, which the rule panel sets — 0 on the cell
  the keyboard stands on, −1 on the others — in place of the layout effect of `rule-panel.tsx` that
  sets it on the elements after every commit (To do 13, its first part; rule „Efekty” of
  `guidelines/coding-browser-module.md`). The look of the pick cell stays in
  `src/browser/styles.css` (D-265); `tests/view/shared-controls.test.mjs` gets the case of the new
  property in the same change, as the rule „Wspólna kontrolka w jednej postaci” asks; the keyboard's
  moves in the grid stay as D-306 gives them. Look at the panel in the game running locally at
  1280 × 720: a name in two lines with its icon, and a greyed cell under the pointer.
- **Change:** `src/browser/view/controls/react-pick-cell.tsx` · `src/browser/view/rule-panel.tsx` ·
  `src/browser/styles.css` · `tests/view/shared-controls.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:32-33` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:207-207` Settlements to record ·
  row 12 of the plan's Foundation entries ·
  `foundations/decisions.md:9062-9102` D-289 · `foundations/decisions.md:9103-9125` D-290 ·
  `foundations/decisions.md:9126-9159` D-291 · `foundations/decisions.md:9199-9233` D-306 ·
  `foundations/decisions.md:4713-4727` D-44 · `foundations/decisions.md:4698-4712` D-43 ·
  `foundations/decisions.md:4653-4667` D-40 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4156-4184` D-267 ·
  `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the case of the property in `tests/view/shared-controls.test.mjs` written first and
  seen failing, then `npm test -- tests/view/shared-controls.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` · the look in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** row 12 of Foundation entries

### Slice 3 — the unit in the sentence of a rule

- **Goal:** `conditionSentence` of `src/browser/view/program-editor.ts` writes the number of a
  condition with the unit of the condition's data (Slice 1): the number, a space and the unit, before
  the target, as the band of a discovery writes „… szt.” (`status-row.ts`) — „Zostało mniej niż —
  ognisko 20 min”, „Temperatura poniżej 35 °C”, „Zapas poniżej 8 szt. · Patyk” (To do 3). Every place
  that writes the sentence of a rule of the player reads it there: the row and the header of a group
  in the program editor, the entries of the chronicle and „Nie zadziałały ani razu” of the end-of-run
  window. The expectations of `tests/view/program-editor.test.mjs` and
  `tests/view/chronicle-entries.test.mjs` change with it. The four expectations of the rows and
  headers in `tests/view/rule-editor.test.mjs` („Sytość poniżej 30”, „Zapas poniżej 8 · Patyk”)
  change in Slice 4, which follows at once; at this slice's head that file fails on them, and the
  report says so.
- **Change:** `src/browser/view/program-editor.ts` · `tests/view/program-editor.test.mjs` ·
  `tests/view/chronicle-entries.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:7723-7741` D-376 · `foundations/decisions.md:8750-8825` D-288 ·
  `foundations/decisions.md:8826-8842` D-292 · `foundations/decisions.md:10487-10521` D-342 ·
  `foundations/decisions.md:10226-10260` D-368 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/sim/data/conditions.ts` · `src/browser/view/status-row.ts:70-80` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed expectations of `tests/view/program-editor.test.mjs` written first and seen
  failing, then `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/chronicle-entries.test.mjs` ·
  `npm test -- tests/view/end-window-lines.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py`
- **Depends on:** Slice 1

### Slice 4 — the unit beside the number field of the rule panel

- **Goal:** The field „Liczba” of the rule panel shows the unit of the condition, from its data,
  beside the number field — „20 min” (To do 3); the field takes and confirms the number as before
  (D-306, D-376). The shared number field (`ReactNumberField`) stays as it is: the unit stands in
  the panel beside it, since a rule of one screen comes from that screen (D-395).
  `tests/view/rule-editor.test.mjs` gets the case of the unit beside the field, and its expectations
  of the rows and headers read the unit Slice 3 put into the sentence of a rule („Sytość poniżej
  30 %”, „Zapas poniżej 8 szt. · Patyk”), so the file passes again.
- **Change:** `src/browser/view/rule-panel.tsx` · `tests/view/rule-editor.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:9199-9233` D-306 · `foundations/decisions.md:7723-7741` D-376 ·
  `foundations/decisions.md:4459-4473` D-395 · `foundations/decisions.md:4713-4727` D-44 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/program-editor.ts:826-862` · `src/browser/sim/data/conditions.ts` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the case of the unit beside the field written first and seen failing, then
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs`
- **Depends on:** Slice 2 · Slice 3

### Slice 5 — the unit in the sentence of the wolf's rules

- **Goal:** The sentence of the wolf's rules that `src/browser/view/combat-line.ts` writes into the
  paragraph of an encounter writes its number with the unit of the condition's data, as the sentence
  of a rule of the player does after Slice 3 — „Wilk: Zdrowie poniżej 8 pkt → Odskocz” (To do 3; the
  answer to the question about `combat-line.ts`: the unit stands on every screen). The tests that
  hold that paragraph read it with the unit: `tests/view/combat-line.test.mjs`,
  `tests/view/chronicle-game.test.mjs`, `tests/view/end-window.test.mjs`,
  `tests/view/tabs-area.test.mjs` and `tests/view/world-area.test.mjs`.
- **Change:** `src/browser/view/combat-line.ts` · `tests/view/combat-line.test.mjs` ·
  `tests/view/chronicle-game.test.mjs` · `tests/view/end-window.test.mjs` ·
  `tests/view/tabs-area.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:6499-6528` D-147 · `foundations/decisions.md:6561-6582` D-151 ·
  `foundations/decisions.md:7723-7741` D-376 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/program-editor.ts:826-862` · `src/browser/sim/data/conditions.ts` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed expectation of `tests/view/combat-line.test.mjs` written first and seen
  failing, then `npm test -- tests/view/combat-line.test.mjs` ·
  `npm test -- tests/view/chronicle-game.test.mjs` · `npm test -- tests/view/end-window.test.mjs` ·
  `npm test -- tests/view/tabs-area.test.mjs` · `npm test -- tests/view/world-area.test.mjs`
- **Depends on:** Slice 1 · Slice 3

### Slice 6 — no target of focus in the module of the program editor

- **Goal:** `src/browser/view/program-editor.ts` holds no type of a target of focus
  (`FocusTarget`, `StructuralEdit`), no function that chooses one (`focusAfter`) and no comment of
  the old editor built through the DOM, such as one naming a „condition select” (To do 13, its
  second part). What chooses the focus after an edit of the list stands in
  `src/browser/view/rule-list.tsx`, its one user, and the focus after „↑”, „↓”, „Usuń” and
  „+ reguła” goes where it goes today; no behaviour changes. The cases of
  `tests/view/program-editor.test.mjs` that hold `focusAfter` leave with it or move with what takes
  its place, each with its reason, as "Changing an existing test" of `guidelines/testing.md` asks;
  the cases of the focus after an edit in `tests/view/rule-editor.test.mjs` keep passing unchanged.
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/rule-list.tsx` ·
  `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37` To do ·
  `foundations/decisions.md:8750-8825` D-288 · `foundations/decisions.md:8926-8945` D-297 ·
  `foundations/decisions.md:9002-9015` D-303 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · row 1 of Foundation entries

### Slice 7 — the credits without impossible checks, and the loaded paused run truly loaded

- **Goal:** `src/browser/view/credit-lines.ts` no longer checks `icon === undefined` and
  `iconTitle === undefined` of an action, which the data of actions do not allow (To do 13); the
  credits it writes stay the same (invariant `icon-credits`). The test „a loaded map run comes back
  paused, …” of `tests/view/scene-picture.test.mjs`, today a copy of the test of the pause just
  before it, loads a saved game state through `loadSavedGame` of the simulation and checks that the
  scene stands as at a pause (D-212, D-322); its name says what it checks (answer to the question
  about that test).
- **Change:** `src/browser/view/credit-lines.ts` · `tests/view/scene-picture.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:143-148` Questions to settle ·
  `foundations/decisions.md:4570-4622` D-27 · `foundations/decisions.md:3922-3983` D-212 ·
  `foundations/decisions.md:11108-11174` D-322 ·
  `foundations/invariants.md:331-342` icon-credits ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/saved-game.ts:1-80` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed test seen failing first where it loads a document whose run is not paused,
  then `npm test -- tests/view/scene-picture.test.mjs` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `npm test -- tests/view/icons.test.mjs`
- **Depends on:** none

### Slice 8 — the rule panel follows its rule to another group, and „✕” under a folded group

- **Goal:** A rule panel open on a rule the player moves to another rule group — by „↑” or „↓”
  across the edge of its group or by its handle — stays open and follows the rule to its new group,
  as it follows it within a group today, its field as it was; deleting the rule closes its panel
  (To do 15; D-306 and D-350 as rows 2 and 3 of the plan's Foundation entries change them). Where
  the open panel stands under the header of a folded group — opened by „Dodaj regułę z tym” (D-313)
  or with its group folded after it opened (D-350) — „✕” and Escape give the focus to the header of
  that group, since the row of the rule is not drawn; elsewhere the focus goes back to the row as
  today (To do 6; row 14 of the Foundation entries). The open panel is held in
  `src/browser/view/program-panel.tsx` by its group and its rule (`openState`, `closePanel`, the
  layout effect of `focusClosed`); the fix stands there, and `src/browser/view/rule-list.tsx` stays
  as it is. Check the focus in the game running locally too, as D-88 asks.
- **Change:** `src/browser/view/program-panel.tsx` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:30-30` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:39-39` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:64-68` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-198` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  rows 2, 3 and 14 of the plan's Foundation entries ·
  `foundations/decisions.md:9199-9233` D-306 · `foundations/decisions.md:9386-9410` D-350 ·
  `foundations/decisions.md:8750-8825` D-288 · `foundations/decisions.md:8888-8907` D-295 ·
  `foundations/decisions.md:8926-8945` D-297 · `foundations/decisions.md:7378-7426` D-313 ·
  `foundations/glossary.md:53-63` program rule, rule group ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/rule-list.tsx:60-110` · `src/browser/view/rule-list.tsx:200-262` ·
  `src/browser/view/rule-list.tsx:570-612` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of the panel following its rule across a group's edge by an arrow and by a
  drop, of the panel closed by a deletion, and of the focus on the folded group's header after „✕”,
  written first and seen failing, then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/discovery-band.test.mjs` ·
  the focus checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 2, 3 and 14 of Foundation entries

### Slice 9 — each new copy with every group unfolded

- **Goal:** After a character is sent and after a switch of the character to another program, the
  copy the map run carries out stands with every rule group unfolded: the folds of the copy before,
  which the page's memory of folding (`createFolding` in `src/browser/view/program-panel.tsx`) holds
  under the one key of the copy, do not pass to the new copy (To do 7; D-294 as row 15 of the plan's
  Foundation entries). The folds of a copy stay while its map run goes on, through leaving the
  screen and coming back and through „Restart”, which carries on the same copy (D-164); the folds of
  saved programs stay as D-294 gives them. Where the memory learns of a new copy — in the panel from
  the game state, or in `src/browser/view/game-view.ts`, which gives the memory to both panels — is
  the slice's choice; its report names it.
- **Change:** `src/browser/view/program-panel.tsx` · `src/browser/view/game-view.ts` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:31-31` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:210-210` Settlements to record ·
  row 15 of the plan's Foundation entries ·
  `foundations/decisions.md:8863-8887` D-294 · `foundations/decisions.md:8888-8907` D-295 ·
  `foundations/decisions.md:7761-7782` D-164 · `foundations/decisions.md:7967-7988` D-174 ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/glossary.md:174-178` copy ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of a send and of a switch after a fold of the copy before, written first and
  seen failing, then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/end-question.test.mjs`
- **Depends on:** Slice 8 · row 15 of Foundation entries

### Slice 10 — the line of a program that changed, with and without unsaved changes of the copy

- **Goal:** Beside the save buttons of the copy, while the program the copy belongs to holds changes
  the copy lacks: with no unsaved changes of the copy the line reads „Program {name} ma zmiany,
  których nie ma w tej kopii.” and „Zapisz w programie” stays inactive (D-171); with unsaved changes
  it reads „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” as
  today (To do 19; D-172 as row 8 of the plan's Foundation entries). Under the question „Zapisać,
  odrzucić, wrócić?”, which stands only with unsaved changes (D-173), the full sentence stays.
  `copyLacksSentence` of `src/browser/view/end-question.tsx` gives both forms, and the program panel
  picks by the copy's unsaved changes.
- **Change:** `src/browser/view/end-question.tsx` · `src/browser/view/program-panel.tsx` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:43-43` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:84-89` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:203-203` Settlements to record ·
  row 8 of the plan's Foundation entries ·
  `foundations/decisions.md:7915-7934` D-172 · `foundations/decisions.md:7894-7914` D-171 ·
  `foundations/decisions.md:7935-7966` D-173 · `foundations/decisions.md:7842-7858` D-168 ·
  `foundations/glossary.md:174-178` copy ·
  `foundations/invariants.md:858-867` copy-save ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the case of the short line with no unsaved changes written first and seen failing,
  then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/sim/copy-actions.test.mjs`
- **Depends on:** Slice 9 · row 8 of Foundation entries

### Slice 11 — the chronicle's entry of a changed rule

- **Goal:** The entry of the chronicle of a changed program rule sets the old and the new sentence of
  the rule in quotation marks joined by „na”: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze
  → Wędruj”” (To do 21; D-342 as row 9 of the plan's Foundation entries). The other entries keep
  their form.
- **Change:** `src/browser/view/chronicle-entries.ts` · `tests/view/chronicle-entries.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:45-45` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:204-204` Settlements to record ·
  row 9 of the plan's Foundation entries ·
  `foundations/decisions.md:10487-10521` D-342 · `foundations/decisions.md:10617-10667` D-348 ·
  `foundations/decisions.md:10352-10379` D-338 · `foundations/decisions.md:10522-10559` D-343 ·
  `foundations/glossary.md:254-258` chronicle ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed expectations written first and seen failing, then
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/view/chronicle.test.mjs` ·
  `npm test -- tests/view/chronicle-game.test.mjs`
- **Depends on:** Slice 3 · row 9 of Foundation entries

### Slice 12 — the line of a hovered tile only at a revealed tile, and the table of tiles at 1280 × 720

- **Goal:** Hovering a tile of the drawing of the game map that is not revealed draws no line in
  `link-highlight` and marks no row: the line stands only at a revealed tile, which has a row in the
  table of revealed tiles (To do 1; D-41, D-19); the line under the drawing already counts a hovered
  unrevealed tile as none (`tile-list.ts`). In the game running locally at a page area of
  1280 × 720 px (D-396), look at the table of revealed tiles under „Teren” with many revealed tiles
  and long texts, a burning stick (D-385) among them: it fits its area whole, with no horizontal
  scroll; where it does not, narrow its gaps and columns in its rules (`tile-list`), which stay in
  `src/browser/styles.css` (D-421). Where narrowing is not enough without harm to reading — names
  cut off — the table stays scrolled with a visible bar, and the report says so with what was tried,
  for the request (To do 11 and the answer to its question). The report says which held, with a
  screenshot of the table placed as D-418 gives.
- **Change:** `src/browser/view/terrain-drawing.tsx` · `src/browser/view/tile-table.tsx` ·
  `src/browser/styles.css` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:25-25` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:35-35` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:138-142` Questions to settle ·
  `foundations/decisions.md:9722-9764` D-19 · `foundations/decisions.md:4668-4682` D-41 ·
  `foundations/decisions.md:9843-9971` D-311 · `foundations/decisions.md:10329-10347` D-385 ·
  `foundations/decisions.md:5122-5136` D-396 · `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/decisions.md:4698-4712` D-43 ·
  `foundations/invariants.md:354-363` terrain-drawing-numbers ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/tile-list.ts:85-116` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** same — looks at the table in a real browser and judges whether narrowing harms reading; a visual judgment a `cheaper` executor does not make reliably (added in the plan's review)
- **Risk:** none
- **Checks:** the case of a hovered unrevealed tile with no line written first and seen failing, then
  `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/tile-list.test.mjs` ·
  `npm test -- tests/view/terrain-picture.test.mjs` ·
  `npm test -- tests/invariants/test_terrain_drawing_numbers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · the table looked at in a real
  browser at 1280 × 720 by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 2 · Slice 5

### Slice 13 — a long name in the team row of Siedziba

- **Goal:** A long name of a character with no space breaks inside its row of „Drużyna” on Siedziba
  and does not run out of the row, at 1280 × 720 and in a narrower window (To do 2); the rule stands
  in `src/browser/headquarters.css`, the stylesheet of Siedziba (D-421), and keeps to the general
  rule that row 13 of the plan's Foundation entries puts in the styleguide. Look in the game running
  locally with a character named by some 40 letters with no space.
- **Change:** `src/browser/headquarters.css`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:26-26` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:208-208` Settlements to record ·
  row 13 of the plan's Foundation entries ·
  `foundations/decisions.md:5733-5758` D-52 · `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/decisions.md:4698-4712` D-43 · `foundations/decisions.md:5122-5136` D-396 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `src/browser/view/headquarters.tsx:168-216` ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/view/headquarters-screen.test.mjs` · the row looked at in a real browser by
  `.claude/skills/loop2-play/SKILL.md`, at 1280 × 720 and narrower
- **Depends on:** row 13 of Foundation entries

### Slice 14 — the focus after „Zatrzymaj”

- **Goal:** After „Zatrzymaj” at a character in an earning loop on Siedziba — in the character's row
  of „Drużyna” — and on the screen Postać, the keyboard's focus stays in that character's place: on
  the element that stands where the button stood or nearest to it, such as the line of the stopped
  loop or the character's name, and never falls to the page (To do 5; row 14 of the plan's
  Foundation entries). On the screen Mapy the section „Kto idzie” already owes the focus after
  „Zatrzymaj” (`OwedFocus` in `src/browser/view/maps-screen.tsx`) and stays as it is. Check the
  focus in the game running locally too, as D-88 asks.
- **Change:** `src/browser/view/headquarters.tsx` · `src/browser/view/character-screen.tsx` ·
  `tests/view/headquarters-screen.test.mjs` · `tests/view/character-screen.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:29-29` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  row 14 of the plan's Foundation entries ·
  `foundations/decisions.md:8444-8465` D-244 · `foundations/decisions.md:8466-8503` D-245 ·
  `foundations/decisions.md:4713-4727` D-44 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/glossary.md:217-221` earning loop · `foundations/glossary.md:87-91` headquarters ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/maps-screen.tsx:85-120` · `src/browser/view/maps-screen.tsx:290-320` ·
  `src/browser/view/maps-screen.tsx:375-410` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of the focus after „Zatrzymaj” on each screen written first and seen
  failing, then `npm test -- tests/view/headquarters-screen.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs`
  · the focus checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** row 14 of Foundation entries

### Slice 15 — the focus on the login card after a refused emailed link and after „Anuluj”

- **Goal:** Where the page, after an emailed link the server refused or after „Anuluj” of the form
  „Ustaw nowe hasło”, shows the login card, it moves focus to the card, to the first field of the
  form the card stands on, as after a confirmed logout (To do 4; D-381 as row 17 of the plan's
  Foundation entries; row 14). Where the session check leads to the game instead, nothing changes.
  The endings stand in `src/browser/view/app.ts` (`showReset`, `start`, `focusCard`). The cases go
  into a new test file, `tests/view/login-card-focus.test.mjs`, which runs the page on the document
  imitation as `tests/view/account-screen.test.mjs` does, taking its harness as a pattern: that file
  is too large for one slice to change. Check the focus in the game running locally too, as D-88
  asks.
- **Change:** `src/browser/view/app.ts` · `tests/view/login-card-focus.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:28-28` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:128-132` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:212-212` Settlements to record ·
  rows 14 and 17 of the plan's Foundation entries ·
  `foundations/decisions.md:3075-3087` D-381 · `foundations/decisions.md:2829-2843` D-96 ·
  `foundations/decisions.md:3416-3455` D-225 · `foundations/decisions.md:3182-3208` D-156 ·
  `foundations/decisions.md:2930-2953` D-259 · `foundations/decisions.md:2999-3049` D-262 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `foundations/invariants.md:578-587` node-test-selection ·
  `tests/view/account-screen.test.mjs:1-434` · `tests/view/account-screen.test.mjs:1740-1830` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the new cases written first and seen failing, then
  `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/password-reset.test.mjs`
  · `npm test -- tests/quality/test_node_test_selection.py` · the focus checked in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 14 and 17 of Foundation entries

### Slice 16 — the rhythm and the hidden page after a failed save

- **Goal:** The 30-second rhythm and the hidden page, closing included, send the game state also
  where the save last sent failed, though it did not change since, so that a change whose save
  failed has one more chance when the tab closes (To do 17; D-207 as row 5 of the plan's Foundation
  entries). After a failure one request waits at a time: the retries after 5, 10 and 20 and then
  every 30 real seconds stay as D-208 gives them, and a moment of saving of D-207 — a tick of the
  rhythm and the hidden page among them — that comes while a retry is planned is sent at once and
  takes the place of that retry, as D-208 says („…and at once at a moment of saving of D-207”), so
  the rhythm never sends beside a planned retry; at most one request is in flight (D-207). The tests
  of `tests/view/game-saver.test.mjs` show it: the hidden page sending after a failed save with no
  change since; a tick of the rhythm after a failure sending once, the planned retry not following
  it as a second request; and a success ending the retries as today.
- **Change:** `src/browser/view/game-saver.ts` · `tests/view/game-saver.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:41-41` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:74-78` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:200-200` Settlements to record ·
  row 5 of the plan's Foundation entries ·
  `foundations/decisions.md:3701-3769` D-207 · `foundations/decisions.md:3770-3797` D-208 ·
  `foundations/decisions.md:2844-2868` D-97 · `foundations/decisions.md:3798-3844` D-209 ·
  `foundations/decisions.md:3880-3921` D-211 · `foundations/decisions.md:4444-4458` D-323 ·
  `foundations/glossary.md:235-239` save time ·
  `foundations/invariants.md:1008-1017` expired-session-unsaved-progress ·
  `foundations/invariants.md:1028-1037` saved-state-http-exchange ·
  `foundations/invariants.md:1228-1237` uncaught-failure-game-state ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — timers and one request in flight against D-207 and D-208: reasoning about time and state (raised by the orchestrator before the slice was dispatched)
- **Risk:** none
- **Checks:** the three cases written first and seen failing, then
  `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/state-store.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/account-screen.test.mjs`
- **Depends on:** row 5 of Foundation entries

### Slice 17 — a click outside the menu „Konto”

- **Goal:** A click outside the open menu „Konto” closes it and leaves the focus where the player
  clicked, so the first click into a text field puts the caret there; where the clicked place takes
  no focus (the empty background), the focus returns to „Konto” and never stays on a closed, hidden
  element of the menu; Escape and a second click on „Konto” return the focus to „Konto” as today
  (To do 18; D-285 as row 6 of the plan's Foundation entries, and its sentence in the styleguide as
  row 7). The document's events of the open menu stay in an Effect with its cleanup, as D-267 asks.
  Check in the game running locally too: the document imitation does not show where a click puts
  the focus (D-88).
- **Change:** `src/browser/view/menu-bar.tsx` · `tests/view/menu-bar.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:42-42` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:48-48` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:79-83` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:201-202` Settlements to record ·
  rows 6 and 7 of the plan's Foundation entries ·
  `foundations/decisions.md:4395-4422` D-285 · `foundations/decisions.md:4247-4316` D-280 ·
  `foundations/decisions.md:4156-4184` D-267 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of a click on a field and of a click on the background written first and
  seen failing, then `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · the focus checked in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 6 and 7 of Foundation entries

### Slice 18 — the mage stops where it reached

- **Goal:** Where the mage walks and its new action leads nowhere — „Zjedz — jagoda”, „Zapal —
  patyk”, a fight, „Zbierz” and „Obchód” with fibre as the target (D-318) — the mage stops where its
  walk has brought it, the place `reachedX` reads (D-319), and does not run on to the place of the
  walk before (To do 20 and the answer to its question). `placeOf` of `src/browser/view/scene.tsx`
  takes that reached place for a goal to stay, in place of `kept`, the target of the walk under way.
- **Change:** `src/browser/view/scene.tsx` · `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:44-44` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:90-94` Questions to settle ·
  `foundations/decisions.md:10977-11004` D-318 · `foundations/decisions.md:11005-11039` D-319 ·
  `foundations/decisions.md:10892-10976` D-317 · `foundations/decisions.md:10767-10891` D-316 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — changes how the mage's place is read while a walk is in progress, against D-318 and D-319; reasoning about a state in motion (added in the plan's review)
- **Risk:** none
- **Checks:** the case of a walk cut by an action that leads nowhere written first and seen failing,
  then `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/run-screen.test.mjs`
- **Depends on:** none

### Slice 19 — a walk cut by leaving the screen plays no second time

- **Goal:** A walk of the mage that the player cut by leaving the screen of a map run within its
  640 ms does not play again when the player comes back: the mage stands where D-319 puts it, at the
  place of the walk, as at an entry on the screen, with no walk from where it set out (To do 10).
  Find in the game running locally why the walk plays again — the screen hidden and shown again
  restarting the walk's CSS animation, or the scene drawing it anew — and fix it in the scene or in
  the screen of the map run; a case in `tests/view/run-screen.test.mjs` leaves the screen and enters
  it again during a walk and finds no walk.
- **Change:** `src/browser/view/scene.tsx` · `src/browser/view/run-screen.tsx` ·
  `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:34-34` To do ·
  `foundations/decisions.md:11005-11039` D-319 · `foundations/decisions.md:10892-10976` D-317 ·
  `foundations/decisions.md:9765-9782` D-283 · `foundations/decisions.md:9783-9806` D-284 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1444-1509` D-417 ·
  `foundations/decisions.md:1540-1554` D-420
- **Model:** same — a walk cut by leaving the screen, with the clock of the scene and the return to the screen; reasoning about time and state across two screens (added in the plan's review)
- **Risk:** none
- **Checks:** the case of leaving and entering again during a walk written first and seen failing,
  then `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/scene.test.mjs` · the
  return checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 18

### Slice 20 — the practice of a run against the tree after „Zakończ”

- **Goal:** In one game played locally in a real browser, reproduce loop2#055-11: during a manual
  map run the line under the body row reads „Wprawa w tym przejściu: Eksploracja +1” (D-201), and
  after „Zakończ” the tree of Eksploracja on the screen Postać reads „0/15” (To do 12). Compare both
  with the rules: a manual map run pays its practice to its character only at the completion that
  first solves its map, and „Zakończ” before a completion leaves the character's practice as it was
  (D-194); the line of the run shows practice gathered, not paid (D-201). Fix only where practice is
  lost against those rules — in the simulation's payment or in what a screen writes — with a test
  that fails first. Where both numbers follow the rules, change no file and write in the report, for
  the request, what each number shows and by which decision. The report says whether the slice fixed
  anything.
- **Change:** `src/browser/sim/skills.ts` · `src/browser/view/character-skills.ts` ·
  `tests/sim/skills.test.mjs` · `tests/view/character-skills.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:36-36` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:61-63` Questions to settle ·
  `foundations/decisions.md:6697-6717` D-191 · `foundations/decisions.md:6737-6757` D-193 ·
  `foundations/decisions.md:6758-6776` D-194 · `foundations/decisions.md:6851-6872` D-199 ·
  `foundations/decisions.md:6895-6914` D-201 · `foundations/glossary.md:180-184` practice ·
  `foundations/glossary.md:130-140` manual map run, completion ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420
- **Model:** same — replays one game in a real browser and judges two numbers against the rules of practice, with a fix only where they disagree; a judgment, not an edit (added in the plan's review)
- **Risk:** none
- **Checks:** where it fixes, the failing test first, then `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/view/character-skills.test.mjs`; in every case the replay in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** none

### Slice 21 — the comments of the stylesheets

- **Goal:** The comment over the rule with `filter: grayscale(1) brightness(0.55)` — since loop2#145
  in `src/browser/run-screen.css` („A dead mage and an extinguished fire share one grey…”) — names
  the source of the value: accepted by Mariusz on 2026-11-16; the value, D-316 and D-322 stay (To do
  22; the task's settlement 10). The head comment of `src/browser/styles.css` no longer speaks of
  „the rules of each other screen” as if the screens under the exception of D-421 had no stylesheet
  of their own, and the seven comments of the stylesheets of the screens that say a rule stands
  „above” name the file the rule stands in now — the one `:focus-visible` rule and the columns of
  Programy and Mapy stand in `src/browser/styles.css` (D-421, D-47): two in
  `src/browser/maps-screen.css`, two in `src/browser/knowledge-screen.css`, one each in
  `src/browser/program-panel.css`, `src/browser/programs-screen.css` and `src/browser/run-screen.css`;
  find them by their content (To do 25). Comments only; no rule changes.
- **Change:** `src/browser/styles.css` · `src/browser/run-screen.css` · `src/browser/maps-screen.css` ·
  `src/browser/knowledge-screen.css` · `src/browser/program-panel.css` ·
  `src/browser/programs-screen.css`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:46-46` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:49-49` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:101-105` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:205-205` Settlements to record ·
  `foundations/decisions.md:4551-4565` D-421 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/decisions.md:10767-10891` D-316 · `foundations/decisions.md:11108-11174` D-322 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs`
- **Depends on:** Slice 12

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: the player meets none of the reported faults of the screens | Slices 2–5, 8–20 |
| Need: decisions that drifted from the code say what the player is to get | rows 1, 2, 3, 4, 5, 6, 8, 9, 15, 17 of Foundation entries |
| To do 1 — no `link-highlight` at an unrevealed tile | Slice 12 |
| To do 2 — a long name breaks in the team row of Siedziba | Slice 13 · row 13 |
| To do 3 — the number with its unit in the row, beside the panel's field and in the wolf's sentence | Slices 1, 3, 4, 5 · row 16 |
| To do 4 — focus on the card after a refused emailed link and after „Anuluj”; D-381 | Slice 15 · row 17 |
| To do 5 — focus after „Zatrzymaj” stays at the character | Slice 14 · row 14 |
| To do 6 — „✕” gives focus to the folded group's header | Slice 8 · row 14 |
| To do 7 — each new copy unfolded | Slice 9 · row 15 |
| To do 8 — icon at the first line of a two-line name | Slice 2 |
| To do 9 — a greyed cell without highlight; its frame named `text-disabled` in the styleguide | Slice 2 · row 12 |
| To do 10 — a cut walk plays no second time | Slice 19 |
| To do 11 — the table of tiles at 1280 × 720 | Slice 12 |
| To do 12 — the practice of a run against the tree, fixed only against the rules | Slice 20 |
| To do 13 — `tabIndex` from a property | Slice 2 |
| To do 13 — no focus types and no comments of the DOM editor in the program editor's module | Slice 6 |
| To do 13 — no impossible checks in the credits | Slice 7 |
| To do 13 — the loaded paused run truly loaded | Slice 7 |
| To do 14 — D-297 says what the code does | row 1 |
| To do 15 — the panel follows its rule to another group; deletion closes it; D-306 and D-350 | Slice 8 · rows 2, 3 |
| To do 16 — D-04 names three more sources | row 4 |
| To do 17 — the rhythm and the hidden page after a failed save, one request at a time; D-207 | Slice 16 · row 5 |
| To do 18 — a click outside „Konto” leaves the focus where the player clicked; D-285 | Slice 17 · row 6 |
| To do 19 — the short and the full line of D-172 | Slice 10 · row 8 |
| To do 20 — the mage stops where it reached | Slice 18 |
| To do 21 — the chronicle's entry of a changed rule; D-342 | Slice 11 · row 9 |
| To do 22 — the source of the grey in its comment | Slice 21 · row 10 |
| To do 23 — the time bar settled in the styleguide | row 11 |
| To do 24 — the styleguide's sentence of „Konto” as D-285 | row 7 |
| To do 25 — the comments of the stylesheets after the split | Slice 21 |
| Settlement row 1 | row 1 of Foundation entries |
| Settlement row 2 | row 2 of Foundation entries; code in Slice 8 |
| Settlement row 3 | row 3 of Foundation entries |
| Settlement row 4 | row 4 of Foundation entries |
| Settlement row 5 | row 5 of Foundation entries; code in Slice 16 |
| Settlement row 6 | row 6 of Foundation entries; code in Slice 17 |
| Settlement row 7 | row 7 of Foundation entries |
| Settlement row 8 | row 8 of Foundation entries; code in Slice 10 |
| Settlement row 9 | row 9 of Foundation entries; code in Slice 11 |
| Settlement row 10 | Slice 21 (a comment of `src/browser/run-screen.css`) |
| Settlement row 11 | row 11 of Foundation entries |
| Settlement row 12 | row 12 of Foundation entries; code in Slice 2 |
| Settlement row 13 | row 13 of Foundation entries; code in Slice 13 |
| Settlement row 14 | row 14 of Foundation entries; code in Slices 8, 14, 15 |
| Settlement row 15 | row 15 of Foundation entries; code in Slice 9 |
| Settlement row 16 | Slice 1 (data and test); Slices 3, 4, 5 (the three places) |
| Settlement row 17 | row 17 of Foundation entries; code in Slice 15 |
| Out of scope: loop2#65-3, #79-2, #025-6, #043-22, #78-3, #059-8, #83-1, #83-3 | no slice touches them |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Every decision and styleguide row is written by the agent of the foundation entries before Slice 1, which re-quotes the lines `decision:` its changes leave standing in no sentence | each decision written by the slice whose code makes it true — `foundations/decisions.md` (about 1.24 M characters) in a slice's *Change* makes that slice too large by `slice_size.py`, whatever else it holds | between the entries' commit and the slice of the code, a decision and the styleguide say what the code does not do yet, and a test holding the old behaviour carries a quotation of the new sentence; a cycle stopped half way leaves the branch inconsistent until its slices are made |
| The cases of To do 4 go into a new file, `tests/view/login-card-focus.test.mjs` | the cases added to `tests/view/account-screen.test.mjs` — that file alone (about 350 000 characters) is about 140 000 estimated tokens, so a slice changing it with `app.ts` and the guidelines is too large | the focus tests of D-381 stand in two files, and the new file repeats a part of the harness of the old one |
| The unit in the sentence of a rule is cut into Slice 3 (the function, its unit tests, the chronicle's test) and Slice 4 (the panel's field and the expectations of `tests/view/rule-editor.test.mjs`) | one slice — `program-editor.ts`, `program-editor.test.mjs` and `rule-editor.test.mjs` with the guidelines exceed the reading limit | `tests/view/rule-editor.test.mjs` fails on four expectations at Slice 3's head, so a bisection that lands there finds a red test that is no fault |
| To do 11 rides with To do 1 in Slice 12, both in the area „Teren” | To do 11 in a slice of its own — where the table fits already, that slice changes nothing and has no commit | a reviewer judges two things in one slice: the hover line and the table's width |
| To do 12 has a slice of its own, which may end with no commit | To do 12 attached to a slice that changes code anyway — the dispatch asks for a slice of its own for it | the orchestrator's mechanical check asks for a non-empty range; where the numbers follow the rules, Slice 20 has none, and its result is its report |
| The case of To do 10 goes into `tests/view/run-screen.test.mjs`, which leaves the screen and enters it again | the case in `tests/view/scene.test.mjs` — that file (about 114 000 characters) with `scene.tsx`, `run-screen.tsx` and the guidelines exceeds the reading limit | the tests of the walk stand in two files |
| To do 5 covers Siedziba and Postać; Mapy, which already owes the focus after „Zatrzymaj”, stays | Siedziba alone, the place the remark named — row 14 asks the same of every control that goes away | Postać changes beyond the remark |
| The fix of To do 6 and 15 stands in `program-panel.tsx`, which holds the open panel by its group and rule; `rule-list.tsx` stays | the list of rules changed too — with it and the panel's test the slice exceeds the reading limit | where the list must change after all, Slice 8 returns as too large |
| The order of slices follows the styleguide's example of a change of an interface (values in their source, then the shared control, then the screens): the data of the units first (Slice 1), the shared pick cell next (Slice 2), then the screens | the screens first, the shared control last | a screen slice would draw a pick cell the next slice changes again |
