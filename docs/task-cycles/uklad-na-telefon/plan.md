# Plan — loop2: układ na telefon dla wszystkich ekranów gry

- Task: .runs/task-cycles/uklad-na-telefon/task.md
- Spec: none
- Base: 0a2254cd3a6e53c5c569c18b24499fac68bdad6e

## Foundation entries

| # | Entry | Kind | From | What depends on it |
|---|---|---|---|---|
| 1 | D-396 — In which browsers and from which window size does the game have to work? | decision, changed: the projected entry whole, with the two sentences of rows 5 and 6 added | projected entry D-396 of the approved definition of project 2 (section "Projected foundation changes"), rows 5 and 6 | Slices 6–20 |
| 2 | the fact of the source of the touch-target minimum, its passage quoted with the date it was read, named in *Based on* of D-396 | environment fact, new | the cycle's: row 6 asks for a value from a source with its quotation | Slice 7 (the token's `Source:`), Slices 8, 16–19 |
| 3 | D-280 — the content width, now speaking of the computer and the phone layout | decision, changed | task, *Decisions in play* (the new D-396 no longer names it) | Slices 9, 16 |
| 4 | D-282 — the areas a narrower layout rearranges, now the phone layout | decision, changed | task, *Decisions in play* | Slices 9, 17, 18, 19 |
| 5 | D-311 — the screen of a map run, two columns in the computer layout and one in the phone layout, and the tap of row 3 beside the hover in its rationale | decision, changed | task, *Decisions in play* | Slices 9, 19 |
| 6 | D-370 — the end-of-run window, its width in the two layouts | decision, changed | task, *Decisions in play* | Slice 19 |
| 7 | D-389 — the picture band of Siedziba, its crop in the phone layout | decision, changed | task, *Decisions in play* | Slice 17 |
| 8 | D-44 — the destructive button in `danger` at rest, with `highlight` under the pointer | decision, changed | row 4 | Slices 10, 16 |
| 9 | D-349 — the scene's two sizes | decision, changed | row 1 | Slices 5, 15 |
| 10 | D-372 — the frost's thickness on the screen at either size of the scene | decision, changed | the cycle's: its "(32 px on the screen)" follows from the one size row 1 removes | Slice 15 |
| 11 | D-288 — arrows in the header of a rule group in every layout, the handle for the mouse | decision, changed | row 2 | Slices 3, 4, 12, 13 |
| 12 | D-19 — a tap on a tile marks its row, a tap elsewhere takes the mark off, the hover stays | decision, changed | row 3 | Slices 3, 4, 5, 14 |

The rows of *Settlements to record*: row 1 → entry 9; row 2 → entry 11; row 3 → entry 12; row 4 → entry 8; rows 5 and 6 → entry 1, row 6 also entry 2. No invariant, glossary term or part of the map is written.

## Slices

### Slice 1 — the layout decisions and the source of the touch target

- **Goal:** The foundation states the two layouts: D-396 stands as the projected entry of the approved definition of project 2 whole, with the two sentences of rows 5 and 6 of *Settlements to record* added (in the phone layout nothing scrolls to the side, in a frame either; the controls of the phone layout have a minimum touch target, its value from a source with a quotation); a new environment fact holds that source's passage quoted with the date it was read, and D-396 names it in *Based on*; D-280, D-282, D-311, D-370 and D-389 speak of the phone layout or the computer layout where they speak today of a narrower window (task, *Decisions in play*: the sentences quoted there), D-311 adding the tap of row 3 beside the hover in its rationale; D-44 carries row 4: the destructive button has its text in `danger` already at rest, in every layout, in one style, and under the pointer it takes the background `highlight` besides. The value of the touch target is the one the orchestrator gives this slice (the planner's report, question 1); without one, the slice returns blocked. Each entry is written through the pinned skill of its element, read as a file, as the foundation step gives; every passage that a line `decision: D-<n> "…"` of a file under `tests/` quotes from these six decisions stays the opening of a binding sentence, so that no citation breaks (find them with `git grep -n "decision: D-280 "` and the like). The slice keeps in its report each entry's meaning in one English and one Polish sentence and its mark (`row <n>`, `projected` or `the cycle's`). No code.
- **Change:** `foundations/decisions.md` · `foundations/environment_facts.md`
- **Read:** `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:47-79` Questions to settle · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context · `.runs/task-cycles/uklad-na-telefon/task.md:105-147` Decisions in play, Settlements to record, Out of scope
  · the projected entry D-396 of the approved definition of project 2, whole, with its *Meaning (pl)*: the file definicja_projektu_2_loop2.md in the folder the key projects under loop2 of the locations file ~/.the-way/locations.json names, section "Projected foundation changes", heading "D-396 — In which browsers and from which window size does the game have to work?", lines 374-393 at planning (to be copied into the handoff word for word)
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:10964-10989` D-370 · `foundations/decisions.md:10309-10382` D-389 · `foundations/decisions.md:5081-5097` D-44 · `foundations/decisions.md:4998-5018` D-39 · `foundations/decisions.md:5019-5035` D-40 · `foundations/decisions.md:5051-5065` D-42 · `foundations/decisions.md:10387-10430` D-19 · `foundations/decisions.md:10859-10901` D-349
  · `foundations/environment_facts.md:270-299` wcag-text-contrast to wcag-contrast-ratio (the form of a quoted source) · `foundations/environment_facts.md:1008-1043` playwright-firefox-webkit-releases, the last facts and the place a new fact goes
  · `foundations/part_map.md:3-33` browser-view · `foundations/part_map.md:160-167` product-foundation
  · `.the-way/task-cycle/skill/foundation_step.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/environment-facts/skill/SKILL.md` · `.the-way/elements/environment-facts/skill/read.md` · `.the-way/elements/environment-facts/skill/decide_entry.md` · `.the-way/elements/environment-facts/skill/draft.md` · `.the-way/elements/environment-facts/skill/write.md` · `.the-way/elements/environment-facts/template.md` · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/elements/common/reaching_another_skill.md`
- **Model:** same — rewrites seven approved decisions and adds a fact with a quoted source, where a meaning moved beyond the rows or a broken quoted passage stops the request.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports no error.
- **Depends on:** none

### Slice 2 — the behaviour decisions of the scene, the rule groups and the map drawing

- **Goal:** The foundation carries rows 1, 2 and 3 of *Settlements to record*: D-349 gives the scene two sizes — the computer layout 672 × 304 px, the phone layout the largest whole multiple of its picture of 336 × 152 that fits, 336 × 152 at a page area 360 px wide, with its sides cropped slightly where a few pixels are missing and the crop hiding nothing the player acts with, and its small elements (the icon on a plaque of a discovery, the badge over the mage's head and the like) readable at either size, drawn at a size of their own, independent of the scene's scale, where shrunk with it they are not; the scene's sizes are two, 1× and 2×, as the task's *Decisions in play* says ("D-349 zmienia się na dwie wielkości"). D-372 states the frost's thickness in pixels of the scene alone, its "(32 px on the screen)" true only of the larger size (the cycle's, a consequence of row 1). D-288 gives the rule groups „↑” and „↓” in their header as the rules have, in every layout, and keeps the drag by the handle for the mouse on the computer; its rationale and *Rejected* follow (today they accept that rule groups cannot be moved from the keyboard). D-19 adds the tap: a tap on a tile of the drawing marks its row of the list of revealed tiles, a tap elsewhere takes the mark off, and the hover on the computer stays. Each through the pinned skill of decisions, read as a file, as the foundation step gives; the openings of binding sentences that tests quote and that these rows do not make false stay as they are — of D-288 „A rule's row reads as a sentence…” and „One program editor stands…”, of D-372 „The scene shows frost on the edges of its frame” and „The frost lies over the layer of the tint”. The quoted sentences these rows do make false — D-288 „Rules move by a handle … with no arrows in the header of a rule group”, D-19 „The drawing of the game map is a picture, not a control: its only interaction is hovering…”, D-349 „The scene has one size…” — Slices 3, 4 and 5 bring their citations to the new wording. The report keeps each entry's meaning in one English and one Polish sentence and its mark. No code.
- **Change:** `foundations/decisions.md`
- **Read:** `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:47-79` Questions to settle · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context · `.runs/task-cycles/uklad-na-telefon/task.md:105-143` Decisions in play, Settlements to record
  · `foundations/decisions.md:10859-10901` D-349 · `foundations/decisions.md:11947-11983` D-372 · `foundations/decisions.md:9336-9411` D-288 · `foundations/decisions.md:9488-9507` D-295 · `foundations/decisions.md:9526-9558` D-297 · `foundations/decisions.md:10387-10430` D-19 · `foundations/decisions.md:5036-5050` D-41 · `foundations/decisions.md:6694-6710` D-70 · `foundations/decisions.md:11752-11798` D-320 · `foundations/decisions.md:11906-11920` D-365 · `foundations/decisions.md:5507-5521` D-396 (rewritten by Slice 1; read it as it then stands)
  · `src/browser/sim/data/scene.ts:36-63` PICTURE_PIXEL and SCENE
  · `foundations/part_map.md:3-66` browser-view, simulation
  · `.the-way/task-cycle/skill/foundation_step.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/elements/common/reaching_another_skill.md`
- **Model:** same — rewrites four approved decisions to the rows' meaning, where a meaning moved beyond a row or a lost quoted opening stops the request.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports no error but the citations of the replaced sentences of D-288, D-19 and D-349, in `tests/view/program-editor.test.mjs`, `tests/view/run-screen.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/tile-list.test.mjs`, `tests/view/world-area.test.mjs` and `tests/view/scene-picture.test.mjs`, which Slices 3–5 update; the report lists them.
- **Depends on:** Slice 1 · entries 9, 10, 11, 12

### Slice 3 — tests of the program editor and of the screen of a map run cite the new D-288 and D-19

- **Goal:** Every line `decision: D-288 "…"` of `tests/view/program-editor.test.mjs` that quotes the sentence Slice 2 replaced quotes the opening of the binding sentence of the new D-288 that its test holds, and every line `decision: D-19 "…"` of `tests/view/run-screen.test.mjs` the opening of the new D-19 its test holds. Only those comment lines change; no assertion, no test name, no other line.
- **Change:** `tests/view/program-editor.test.mjs` · `tests/view/run-screen.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:9336-9411` D-288 · `foundations/decisions.md:10387-10430` D-19 (both rewritten by Slice 2; read them as they then stand)
  · `.runs/task-cycles/uklad-na-telefon/task.md:35-36` To do, items 6 and 7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `python -B .the-way/elements/common/foundation_check.py` reports no error but the citations left to Slices 4 and 5.
- **Depends on:** Slice 2

### Slice 4 — tests of the rule list cite the new D-288 and D-19, and read a cell's name whatever its markup

- **Goal:** Every line `decision: D-288 "…"` of `tests/view/rule-editor.test.mjs` that quotes the replaced sentence quotes the opening of the new D-288 its test holds — the two cases that hold no arrows in a group's header („a row has „↑”, „↓” and the destructive „Usuń”, and a header has no arrows” and „the buttons of an old „Dodaj regułę”, „Dodaj grupę” and the arrows of a group are gone”) quote its part on the rules for now, and Slice 13 changes them — and every line `decision: D-19 "…"` of `tests/view/tile-list.test.mjs` the opening of the new D-19. The helper `nameOf` of `tests/view/rule-editor.test.mjs` and of `tests/view/item-verb-panel.test.mjs` reads the name a pick cell shows without its reason in a way that holds both while the name is a text node of the cell, as today, and once it stands in an element of its own, as Slice 11 makes it (commit `8591aa82`). No assertion changes.
- **Change:** `tests/view/rule-editor.test.mjs` · `tests/view/tile-list.test.mjs` · `tests/view/item-verb-panel.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:9336-9411` D-288 · `foundations/decisions.md:10387-10430` D-19 (both rewritten by Slice 2)
  · `src/browser/view/controls/react-pick-cell.tsx`
  · `.runs/task-cycles/uklad-na-telefon/task.md:31-31` To do, item 4 · `.runs/task-cycles/uklad-na-telefon/task.md:35-36` To do, items 6 and 7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/tile-list.test.mjs` · `npm test -- tests/view/item-verb-panel.test.mjs` · `python -B .the-way/elements/common/foundation_check.py` reports no error but the citations left to Slice 5.
- **Depends on:** Slice 3

### Slice 5 — tests of the world area and of the scene's picture cite the new D-19 and D-349

- **Goal:** Every line `decision: D-19 "…"` and `decision: D-349 "…"` of `tests/view/world-area.test.mjs`, and the line `decision: D-349 "…"` of `tests/view/scene-picture.test.mjs`, quotes the opening of the new decision its test holds. The case „the scene is the picture of the forest at the one size of D-349, with no text inside or over it” and the comment over it, which today catch any second size of the scene, say instead what they hold under the new D-349: the scene's picture given 672 × 304, the size of the computer layout, whatever the state of the game, the frame sized by its picture alone, no text on it. The assertions stay: the second size of the phone layout comes from a rule of the stylesheet in the phone layout's `@media` block (Slice 15), which jsdom does not apply, so the attributes stay 672 × 304.
- **Change:** `tests/view/world-area.test.mjs` · `tests/view/scene-picture.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:10387-10430` D-19 · `foundations/decisions.md:10859-10901` D-349 (both rewritten by Slice 2)
  · `.runs/task-cycles/uklad-na-telefon/task.md:32-36` To do, items 5 to 7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/scene-picture.test.mjs` · `python -B .the-way/elements/common/foundation_check.py` reports no error.
- **Depends on:** Slice 4

### Slice 6 — the skill loop2-play checks the phone layout

- **Goal:** `.claude/skills/loop2-play/SKILL.md` and its byte-identical copy `.agents/skills/loop2-play/SKILL.md` say how an agent checks the phone layout: in Chromium, at a page area 360 px wide in a window taller than wide (and how to take any other page area, 1100 px and 1280 × 720 among them), with touch, so that a tap reaches the page as a touch and not as a mouse click; how to see that nothing scrolls to the side and no text crosses the border of its frame; and how to go back to the page area of 1280 × 720. Where Playwright CLI takes the phone's page area and touch only from a file of its settings, that file is `.playwright/cli.phone.config.json` beside `.playwright/cli.config.json`, holding its setting for the local certificate too. The slice tries each command it writes on the running game (`npm run local`) before it writes it. Read the help of the installed `playwright-cli` for its switches; where it has no way to touch, the section says so and gives the Playwright MCP way (D-420).
- **Change:** `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md` · `.playwright/cli.phone.config.json`
- **Read:** `.playwright/cli.config.json` · `tests/agent_workflow/test_loop2_play_skill.py`
  · `foundations/decisions.md:5507-5521` D-396 (rewritten by Slice 1) · `foundations/decisions.md:1602-1667` D-417 · `foundations/decisions.md:1668-1682` D-418 · `foundations/decisions.md:1683-1697` D-419 · `foundations/decisions.md:1698-1712` D-420
  · `foundations/part_map.md:140-159` agent-workflow
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-41` To do
  · `.the-way/task-cycle/change/ui_check.md`
- **Model:** same — must find and try how the installed Playwright CLI emulates a phone with touch, which every later slice and the human's checks rely on.
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_play_skill.py` · `python -B .the-way/instruction-files/check_instructions.py` reports no error · the commands of the new section run once on `npm run local`, the report holding what each printed.
- **Depends on:** Slice 1

### Slice 7 — the touch target of the shared controls

- **Goal:** `src/browser/tokens.css` holds the touch-target minimum as a custom property named for what it is for (D-48), with the value of entry 2 and a comment `Source:` naming that environment fact and its source; in `src/browser/styles.css`, inside the phone layout's block `@media (width < 1280px)` (plan, *Choices*: the phone rules stand inside such blocks and the computer layout's rules stay as they are), every shared control — the button in each of its kinds (the arrows and „✕” included), the pick cell, the select list, the number field and the text field — and every control whose rule stands in that file — the items of the menu bar, „Konto” and the link „Panel właściciela” of its menu, the tabs, the secondary actions — is at least that minimum high and wide, by its `min-height` and `min-width` read from the token. A link inside a sentence is held to it only where the cited source does not exempt such a target (plan, *Choices*). Each `@media` rule the slice writes carries a comment naming D-396 as the source of the 1280 px. Nothing outside the phone layout's blocks changes, so at 1280 × 720 every screen looks as before.
- **Change:** `src/browser/tokens.css` · `src/browser/styles.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 (rewritten by Slice 1) · entry 2 (the new environment fact, Slice 1) · `foundations/decisions.md:5066-5080` D-43 · `foundations/decisions.md:5081-5097` D-44 (rewritten by Slice 1) · `foundations/decisions.md:5128-5142` D-47 · `foundations/decisions.md:5051-5065` D-42 · `foundations/decisions.md:4983-4997` D-38
  · `foundations/invariants.md:478-517` browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources · `foundations/part_map.md:3-33` browser-view
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:74-79` Question 7
- **Model:** same — sets a floor across every shared control and judges it by measuring at 360 px and by screenshots at two widths.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_design_token_sources.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/view/shared-controls.test.mjs` · in the running game (loop2-play, phone layout) at a page area 360 px wide, a one-off measurement in the page lists every element the keyboard reaches that is lower or narrower than the minimum — none among the shared controls of the screens on the way into a map run — and at 1280 × 720 the screenshots of Siedziba, Programy and the screen of a map run, taken before the change and after it, show no difference.
- **Depends on:** Slice 6 · entries 1, 2

### Slice 8 — the styleguide's rules of the two layouts, and loop2-scene-art follows the new D-349

- **Goal:** `guidelines/styleguide-browser-view.md` holds the rules of the phone layout, so that tasks 12 and 17–21 design each screen in both layouts by them: the two layouts and the one threshold of 1280 px (D-396), the phone layout made for a page area 360 px wide upright; the phone rules standing in blocks `@media (width < 1280px)` of the screen's stylesheet, each with a comment naming D-396, and the computer layout's rules untouched by them; no other width threshold of `@media` but the one at which the scene takes its larger size inside the phone layout (D-349, Slice 15); one column of areas in the phone layout (D-282); nothing scrolling to the side, in a frame either, and no text over its frame; every control at least the touch-target minimum of its token (entry 2), everything done by touch with no hover-only and no drag-only act; how a change is checked in both layouts (loop2-play). The rules that speak of the changed decisions follow them: "States of shared controls" and "The list of accounts" (the destructive button in `danger` at rest, `highlight` under the pointer, D-44), "Program editor" (the arrows in the header of a group, D-288), "The scene of a map run" and "No value in place of a design token" (the scene's two sizes and its small elements, D-349, D-372), the screens Wiedza and Postać (one area over the other below 1280 px, no more 720 px), and what the drawing of the map does on a tap (D-19) where the guide speaks of the hover. The guide's order-of-work example stays an example. Each rule in the template's form, its decisions named; the rules are written in Polish, as the file is. In `.claude/skills/loop2-scene-art/SKILL.md` and its byte-identical copy `.agents/skills/loop2-scene-art/SKILL.md`, the sentences that give D-349 as one size of 672 × 304 px give its two sizes, the measurement on a screenshot keeping the computer layout's size where it counts pixels at twice the picture.
- **Change:** `guidelines/styleguide-browser-view.md` · `.claude/skills/loop2-scene-art/SKILL.md` · `.agents/skills/loop2-scene-art/SKILL.md`
- **Read:** `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `src/browser/tokens.css`
  · `foundations/decisions.md:5507-5521` D-396 · entry 2 (the new environment fact) · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:10964-10989` D-370 · `foundations/decisions.md:10309-10382` D-389 · `foundations/decisions.md:5081-5097` D-44 · `foundations/decisions.md:10859-10901` D-349 · `foundations/decisions.md:11947-11983` D-372 · `foundations/decisions.md:9336-9411` D-288 · `foundations/decisions.md:10387-10430` D-19 (all rewritten by Slices 1 and 2) · `foundations/decisions.md:5066-5080` D-43 · `foundations/decisions.md:4851-4865` D-421 · `foundations/decisions.md:4983-4997` D-38
  · `foundations/part_map.md:3-33` browser-view · `foundations/part_map.md:140-159` agent-workflow
  · `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:145-147` Out of scope
  · `tests/agent_workflow/test_loop2_scene_art_skill.py`
- **Model:** same — writes the rules by which later tasks design every screen, across a dozen decisions just rewritten.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports no error (it checks the guidelines) · `npm test -- tests/agent_workflow/test_loop2_scene_art_skill.py` · `python -B .the-way/instruction-files/check_instructions.py` reports no error.
- **Depends on:** Slice 7 · entries 1–12

### Slice 9 — one threshold, and the page's shell in the phone layout

- **Goal:** A page area 1280 px wide or wider shows the computer layout and every narrower one the phone layout, with no third layout (item 1): the `@media` rules at 720 px of `src/browser/styles.css` (the columns of Programy, Mapy and Wiedza) and of `src/browser/character-screen.css`, and the one at 1074 px of `src/browser/run-screen.css` (the two columns of the screen of a map run), stand at the threshold of D-396 in the form the plan's *Choices* gives, each with a comment naming D-396, and the comment of `run-screen.css` that counts the 1074 px counts no more; below 1280 px each screen stands in one column of its areas in the order of its document (D-282, D-311). In the phone layout the page's shell leaves the screens their width: the page's side padding and the padding of an area (`.screen-area`) are smaller steps of the spacing scale, chosen so that at a page area 360 px wide the scene of Slice 15 loses at most 32 px of its 336 to its crop (the mage at the right edge ends on column 319 of 336, `src/browser/sim/data/scene.ts`), and the menu bar wraps its items within the width. Nothing outside the phone layout's blocks changes but the thresholds.
- **Change:** `src/browser/styles.css` · `src/browser/character-screen.css` · `src/browser/run-screen.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:8308-8330` D-166 (D-396, D-280, D-282 and D-311 rewritten by Slice 1) · `foundations/decisions.md:4851-4865` D-421 · `foundations/decisions.md:5066-5080` D-43
  · `src/browser/sim/data/scene.ts:36-63` PICTURE_PIXEL and SCENE
  · `foundations/invariants.md:478-497` browser-view-token-values, browser-view-focus-outline · `foundations/part_map.md:3-33` browser-view
  · `.runs/task-cycles/uklad-na-telefon/task.md:26-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context
- **Model:** same — compares five screens before and after at 1280 × 720 and judges the shell at 360 and 1100 px.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `git grep -n "@media" -- "src/browser/*.css"` shows no width threshold but 1280 px (the scene's threshold comes with Slice 15) · in the running game (loop2-play): at 1280 × 720, Siedziba, Postać, Mapy, Programy, Wiedza and the screen of a map run, screenshots before and after the change, show no difference; at a page area 1100 px wide the screen of a map run, Programy, Mapy and Wiedza stand in one column; at 360 px the page does not scroll to the side for the shell (`document.documentElement.scrollWidth` not above its `clientWidth`, read on Siedziba).
- **Depends on:** Slice 8 · entries 1, 3, 4, 5

### Slice 10 — the destructive button in danger at rest

- **Goal:** The destructive button has its text in `danger` at rest, in every layout, in one style; under the pointer it takes besides the background `highlight`, as every button does, its frame unchanged; disabled it stands in `text-disabled` as every disabled button (new D-44). The rule in `src/browser/styles.css` and its comment follow; the kitchen-sink page draws the shared button, so it shows the new look with no change of its own. A case of `tests/view/shared-controls.test.mjs`, through the real stylesheets as its other cases read them, holds the text in `danger` at rest and is written first, failing.
- **Change:** `src/browser/styles.css` · `tests/view/shared-controls.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5081-5097` D-44 (rewritten by Slice 1) · `foundations/decisions.md:4998-5018` D-39 · `foundations/decisions.md:5019-5035` D-40 · `foundations/decisions.md:5098-5112` D-45
  · `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/sample-parts.tsx`
  · `.runs/task-cycles/uklad-na-telefon/task.md:37-37` To do, item 8 · `.runs/task-cycles/uklad-na-telefon/task.md:62-64` Question 4
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs`, its new case failing before the change of the rule · `npm test -- tests/invariants/test_browser_view_token_values.py` · in the running game at 1280 × 720 „Usuń” of a rule red at rest and red on `highlight` under the pointer, and nothing else changed (screenshots before and after); the kitchen-sink page (`npm run kitchen-sink`) shows the destructive button so at rest, under the pointer, at focus and disabled.
- **Depends on:** Slice 9 · entry 8

### Slice 11 — the names of the pick cells inside their frames

- **Goal:** The name of a pick cell stays inside its frame in the phone layout at a page area 360 px wide and on the screen of a map run at 1100 px (item 4): the starting material is the reverted commit `8591aa82` of the branch `task/model-czynnosci-i-przedmiotow` (`git show 8591aa82`) — the name in an element of its own after the icon, the cell a row that wraps, the name dropping under the icon where its longest word does not fit beside it and breaking where it fits nowhere — taken over as it stands, its two cases in `tests/view/shared-controls.test.mjs` included and written first, failing; the helpers of the editor tests already read the name either way (Slice 4). Where the cell now has the touch-target floor of Slice 7, its rules hold together with it.
- **Change:** `src/browser/styles.css` · `src/browser/view/controls/react-pick-cell.tsx` · `tests/view/shared-controls.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:9689-9740` D-289 · `foundations/decisions.md:9741-9767` D-290 · `foundations/decisions.md:9768-9801` D-291 · `foundations/decisions.md:5081-5097` D-44
  · `.runs/task-cycles/uklad-na-telefon/task.md:31-31` To do, item 4 · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context
- **Model:** same — the orchestrator raised it from `cheaper` in the plan's review: the slice is judged by the look of names inside frames at two widths, where a cheaper class's misreading of a screenshot costs a whole retry.
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs`, its two new cases failing before the change · `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/quality/test_quality_invariants.py` · in the running game (loop2-play, the composed state with the combat verbs) the open pick of „Czynność” at 360 px and on the screen of a map run at 1100 px, „Wytwórz”, „Eksploruj”, „Obchód”, „Wytwórz — ognisko” and „Zapal — ognisko” inside their frames; at 1280 × 720 the pick as before.
- **Depends on:** Slice 10 · Slice 4

### Slice 12 — the program editor moves a rule group up and down

- **Goal:** `src/browser/view/program-editor.ts` gives a rule group's „↑” and „↓” as it gives a rule's (`moveRule`, `ruleArrows`): a function that moves the group at an index of the program one place up or down, returning the program changed, or none where it cannot move, and one that says whether each arrow of a group acts, off on the first group for „↑” and on the last for „↓” (new D-288; plan, *Choices*). Its cases stand in a new file, `tests/view/group-arrows.test.mjs`, written first and failing, each citing the new D-288. No view changes yet. The file `program-editor.ts` stays under the threshold of a file of D-425.
- **Change:** `src/browser/view/program-editor.ts` · `tests/view/group-arrows.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:9336-9411` D-288 (rewritten by Slice 2) · `foundations/decisions.md:9526-9558` D-297 · `foundations/decisions.md:9412-9428` D-292 · `foundations/decisions.md:841-859` D-425
  · `foundations/glossary.md:53-64` program rule, rule group · `foundations/invariants.md:1428-1437` function-and-file-size
  · `tests/view/program-editor.test.mjs:1-80` its head, the form of its cases
  · `.runs/task-cycles/uklad-na-telefon/task.md:35-35` To do, item 6 · `.runs/task-cycles/uklad-na-telefon/task.md:56-58` Question 2
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/group-arrows.test.mjs`, failing before the functions exist · `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 11 · entry 11

### Slice 13 — arrows in the header of a rule group

- **Goal:** The header of a rule group holds „↑” and „↓” as the row of a rule does — shared buttons with the accessible names of a group's move, off where Slice 12's function says, the edit handed to the page as a rule's move is, with the group's identity as the hint — on Programy and on the screen of a map run, in every layout; the handle stays for the mouse (new D-288). The two cases of `tests/view/rule-editor.test.mjs` that hold no arrows in a header, and the case „groups do not move by the keyboard: arrow keys on a header commit nothing”, follow the new D-288 with their citations; new cases there hold the arrows of a header, their state at the first and the last group and their edit, written first and failing. The function `RuleListView` and the file `src/browser/view/rule-list.tsx` stay under the thresholds of D-425 (the function stands at 179 lines of 200 at the base): the header's arrows go into the header's component. How the header lays out with them at 360 px is Slice 18's.
- **Change:** `src/browser/view/rule-list.tsx` · `tests/view/rule-editor.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:9336-9411` D-288 (rewritten by Slice 2) · `foundations/decisions.md:9526-9558` D-297 · `foundations/decisions.md:9488-9507` D-295 · `foundations/decisions.md:5081-5097` D-44 · `foundations/decisions.md:841-859` D-425
  · `foundations/glossary.md:53-64` program rule, rule group
  · `.runs/task-cycles/uklad-na-telefon/task.md:35-35` To do, item 6
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs`, its new cases failing before the header's change · `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_quality_invariants.py` · `python -B .the-way/elements/common/foundation_check.py` reports no error.
- **Depends on:** Slice 12

### Slice 14 — a tap on a tile marks its row

- **Goal:** In every layout a tap (a pointer of the kind touch) on a revealed tile of the drawing of the map marks its row of the table of revealed tiles and the line under the drawing gives that tile, as the hover does; a tap anywhere else takes the mark off; the hover of a mouse stays, and a click of a mouse changes nothing, as D-19 holds today (new D-19; plan, *Choices*). The tile marked stays marked after the finger is lifted, which a pointer leaving the drawing on a touch must not undo. The cases stand in `tests/view/run-screen.test.mjs`, beside the one that shares the hovered tile between the drawing and the table, written first and failing; jsdom proves no real touch (D-88), so the slice checks it in Chromium with touch as loop2-play gives.
- **Change:** `src/browser/view/terrain-drawing.tsx` · `src/browser/view/run-screen.tsx` · `tests/view/run-screen.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:10387-10430` D-19 (rewritten by Slice 2) · `foundations/decisions.md:5036-5050` D-41 · `foundations/decisions.md:6694-6710` D-70 · `foundations/decisions.md:1119-1133` D-88
  · `foundations/invariants.md:354-363` terrain-drawing-numbers
  · `src/browser/view/tile-table.tsx` · `src/browser/view/world-area.tsx`
  · `.runs/task-cycles/uklad-na-telefon/task.md:36-36` To do, item 7 · `.runs/task-cycles/uklad-na-telefon/task.md:59-61` Question 3 · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context
- **Model:** same — real touch events in a React screen, where a pointer leaving after the lift and a tap elsewhere decide the outcome.
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs`, its new cases failing before the change · `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/tile-list.test.mjs` · `npm test -- tests/invariants/test_terrain_drawing_numbers.py` · `npm test -- tests/quality/test_quality_invariants.py` · in Chromium with touch at 360 px (loop2-play) a tap on a revealed tile marks its row with „Teren” picked and stays, a tap elsewhere takes it off; at 1280 × 720 the hover marks as before.
- **Depends on:** Slice 13 · entry 12

### Slice 15 — the scene's two sizes

- **Goal:** In the phone layout the scene stands at the largest whole multiple of its picture that fits the width of the world area, of two: 336 × 152 at a page area 360 px wide, 672 × 304 where that fits; the computer layout keeps 672 × 304 (new D-349; plan, *Choices*). Where a few pixels are missing the scene's sides are cropped evenly around its middle and nothing the player acts with is hidden: the mage at the right edge (its last column 319 of 336), the creature beside it and the props of `src/browser/sim/data/scene.ts`, checked at the narrowest page area of 360 px. The scene is never scaled by a fraction (its `max-width: 100%` and the background's go). The frame keeps the size of its picture, so every percentage of its parts holds; a place around it in `src/browser/view/world-area.tsx` clips and centres it. The small elements — the badge over the mage's head, the plaque of a discovery and of the flying icon — keep their sizes in CSS pixels, independent of the scale, where they stay readable at 1×; where one is not, it gets a size of its own, still independent. The comments that speak of the one size (in `run-screen.css`, `scene.tsx`, and `PICTURE_PIXEL` of `scene.ts`) follow D-349. No sprite file changes; a slice that finds one needed stops and reports, since the plan marks no trust boundary. No stylesheet rule is tested in jsdom, which applies no `@media` rule; the check is in the browser.
- **Change:** `src/browser/view/world-area.tsx` · `src/browser/view/scene.tsx` · `src/browser/run-screen.css` · `src/browser/sim/data/scene.ts`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:10859-10901` D-349 · `foundations/decisions.md:11947-11983` D-372 (both rewritten by Slice 2) · `foundations/decisions.md:11752-11798` D-320 · `foundations/decisions.md:11906-11920` D-365 · `foundations/decisions.md:11799-11819` D-321 · `foundations/decisions.md:10309-10382` D-389 · `foundations/decisions.md:5066-5080` D-43
  · `foundations/part_map.md:3-66` browser-view, simulation
  · `.runs/task-cycles/uklad-na-telefon/task.md:32-34` To do, item 5 · `.runs/task-cycles/uklad-na-telefon/task.md:49-55` Question 1 · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context
- **Model:** strongest — the second size and the crop sit under the frame every part of the scene is placed in by percentages, where a wrong frame misplaces them all and the crop must spare what the player acts with.
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_quality_invariants.py` · in the running game (loop2-play): at 360 px the scene's picture 336 × 152 on the screen (`getBoundingClientRect` of the background) with the mage at the right edge whole, at 720 px 672 × 304, at 1280 × 720 672 × 304 and the screen as before (screenshots before and after); the badge, a plaque of a discovery and the flying icon looked at at 1× (a discovery reached by playing or by a composed state).
- **Depends on:** Slice 14 · Slice 9 · entries 9, 10

### Slice 16 — the screens outside the game, the menu bar and the list of accounts at 360 px

- **Goal:** In the phone layout at a page area 360 px wide, in a window taller than wide, the login card with its four forms („Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, „Ustaw nowe hasło”) and its credits, the waiting screens, the menu bar with the open menu „Konto” and the owner panel's list of accounts with its rows, buttons and the confirmation of „Zablokuj” fit the width of the window: nothing scrolls to the side, in a frame either, no text crosses its frame, and every control of these screens has at least the touch-target minimum (entry 2). The phone rules stand in the phone layout's `@media` blocks of each screen's stylesheet; the computer layout's rules stay. The list of accounts gets markup of its own in `src/browser/view/accounts-screen.tsx` only where its stylesheet alone cannot fit a row.
- **Change:** `src/browser/account-card.css` · `src/browser/waiting-screen.css` · `src/browser/credits.css` · `src/browser/styles.css` · `src/browser/accounts-screen.css` · `src/browser/view/accounts-screen.tsx`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:5081-5097` D-44 (rewritten by Slice 1) · entry 2 (the new environment fact) · `foundations/decisions.md:3248-3298` D-262 · `foundations/decisions.md:3179-3202` D-259 · `foundations/decisions.md:3299-3323` D-278 · `foundations/decisions.md:4675-4716` D-285 · `foundations/decisions.md:4804-4816` D-411 · `foundations/decisions.md:5382-5414` D-275 · `foundations/decisions.md:5415-5460` D-276
  · `foundations/glossary.md:259-265` secondary action · `foundations/glossary.md:290-295` owner
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria
- **Model:** same — designs the phone arrangement of five screens within the styleguide and judges it from screenshots at two widths.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/view/accounts-screen.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · in the running game (loop2-play, phone layout with touch) at 360 px each of these screens and states, with an account of the owner role for the list (`npm run local` makes it as loop2-play gives, or the slice reports how it got one): no side scroll (`scrollWidth` of the page and of each frame not above its `clientWidth`), no text over a frame, no control under the minimum by the measurement of Slice 7; at 1280 × 720 each as before (screenshots before and after).
- **Depends on:** Slice 15 · entries 1, 2, 3, 8

### Slice 17 — Siedziba, Postać, Mapy and Wiedza at 360 px

- **Goal:** In the phone layout at a page area 360 px wide, upright, Siedziba with its picture band, Postać, Mapy with its list of maps and the card of a map, and Wiedza fit the width of the window: one area under the other (D-282), nothing scrolling to the side, no text over its frame, every control of these screens at least the touch-target minimum (entry 2) — the rows of the list of maps, the trees' rows, „Kup”, „Wejdź”, „Puść w pętlę”, „Oceń na 12 ziarnach”, „Odbierz”, „Zatrzymaj”, the field and button of a new character. The band crops at its sides around the fire and is never scaled down (D-389). The look of the character's tile, the bars of parameters and of Wiedza beyond fitting the width is out of scope (tasks 17–21). The computer layout's rules stay.
- **Change:** `src/browser/headquarters.css` · `src/browser/character-screen.css` · `src/browser/maps-screen.css` · `src/browser/knowledge-screen.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10309-10382` D-389 (rewritten by Slice 1) · entry 2 (the new environment fact) · `foundations/decisions.md:4866-4925` D-445, D-446, D-447 · `foundations/decisions.md:7309-7338` D-199 · `foundations/decisions.md:10111-10133` D-325 · `foundations/decisions.md:10153-10179` D-327 · `foundations/decisions.md:10200-10229` D-329 · `foundations/decisions.md:4817-4850` D-416
  · `foundations/glossary.md:87-92` headquarters
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:145-147` Out of scope
- **Model:** same — designs the phone arrangement of four screens within the styleguide and judges it from screenshots at two widths.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · in the running game (loop2-play, phone layout with touch) at 360 px, with a character in an earning loop and one with points to spend (a composed state where playing does not reach it): no side scroll, no text over a frame, no control under the minimum by the measurement of Slice 7; at 1280 × 720 each screen as before (screenshots before and after).
- **Depends on:** Slice 16 · entries 1, 2, 4, 7

### Slice 18 — Programy and the program editor at 360 px

- **Goal:** In the phone layout at a page area 360 px wide, upright, Programy — the list of programs over the editor (D-166, D-282) — and the program editor wherever it stands, on Programy and on the screen of a map run, fit the width of the window: the row of a rule, the header of a group with its arrows (Slice 13), the open rule panel with its picks and fields, the band of a discovery, the question „Zapisać, odrzucić, wrócić?” and the buttons of the panel wrap within it, nothing scrolls to the side, no text crosses its frame, and every control of the editor — a rule's row and a group's header, which the keyboard reaches, their buttons, the cells — has at least the touch-target minimum (entry 2). At 1280 × 720 the editor looks as before but for the header's arrows of item 6, whose look there the slice judges too. The computer layout's rules stay.
- **Change:** `src/browser/programs-screen.css` · `src/browser/program-panel.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4643-4674` D-282 (rewritten by Slice 1) · entry 2 (the new environment fact) · `foundations/decisions.md:9336-9411` D-288 (rewritten by Slice 2) · `foundations/decisions.md:8308-8330` D-166 · `foundations/decisions.md:8331-8349` D-167 · `foundations/decisions.md:8445-8478` D-173 · `foundations/decisions.md:9741-9767` D-290 · `foundations/decisions.md:9559-9579` D-298
  · `foundations/glossary.md:53-64` program rule, rule group
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:145-147` Out of scope
- **Model:** same — designs the phone arrangement of the editor, the densest part of the game, and judges it from screenshots at two widths and two screens.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · in the running game (loop2-play, phone layout with touch) at 360 px, Programy with two programs and the editor with several groups, a rule panel open on „Czynność” and on a condition, on Programy and on the screen of a map run, the question of „Zakończ” standing: no side scroll, no text over a frame, no control under the minimum by the measurement of Slice 7; a group moved by its arrows by a tap; at 1280 × 720 as before but for the header's arrows (screenshots before and after).
- **Depends on:** Slice 17 · Slice 13 · entries 1, 2, 4, 11

### Slice 19 — the screen of a map run, its table of tiles and the end-of-run window at 360 px

- **Goal:** In the phone layout at a page area 360 px wide, upright, the screen of a map run — its header with the clock, the bar of the solving condition, the paces and the buttons, the rows „Teraz” and „Potem”, the body row and the backpack, the lines under them, the drawing of the map and the line of a tile, the area with the tabs „Kronika” and „Teren” with the chronicle and its filters — and the end-of-run window fit the width of the window, the world, the program and the tabs one under the other (D-311). The table of revealed tiles fits its area with no scroll to the side, its numbers still in the rows (D-19), so its rule `overflow-x: auto` goes in the phone layout (row 5); the end-of-run window is as wide as the content and its buttons stay in sight (D-370). Every control of the screen — the rows „Teraz” and „Potem”, the tabs, the filters, the paces — has at least the touch-target minimum (entry 2). The table's rules stand in `src/browser/styles.css` (D-421); its markup does not change. The computer layout's rules stay.
- **Change:** `src/browser/run-screen.css` · `src/browser/styles.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:10964-10989` D-370 (rewritten by Slice 1) · entry 2 (the new environment fact) · `foundations/decisions.md:10387-10430` D-19 (rewritten by Slice 2) · `foundations/decisions.md:10902-10940` D-368 · `foundations/decisions.md:5856-5891` D-133 · `foundations/decisions.md:11208-11245` D-343 · `foundations/decisions.md:10758-10794` D-336 · `foundations/decisions.md:4851-4865` D-421
  · `foundations/glossary.md:18-24` map run · `src/browser/view/tile-table.tsx`
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:69-73` Question 6
- **Model:** same — designs the phone arrangement of the game's main screen and its table and judges it from screenshots at two widths.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/view/run-screen.test.mjs` · in the running game (loop2-play, phone layout with touch) at 360 px, a map run of Las with its table of many tiles on „Teren”, the chronicle on „Kronika”, the end-of-run window after a death: no side scroll of the page or of any frame, the table included, no text over a frame, no control under the minimum by the measurement of Slice 7; at 1100 px the open pick of „Czynność” with its names inside the frames; at 1280 × 720 as before (screenshots before and after).
- **Depends on:** Slice 18 · Slice 15 · entries 1, 2, 5, 6, 12

### Slice 20 — the screenshots of every screen and the loop by touch

- **Goal:** In Chromium with touch at a page area 360 px wide, upright (loop2-play), the whole loop of the sign of success goes by taps alone — sign up and sign in, write and change a program in the editor, send a map run and an earning loop, read the report of the return and take the practice („Odbierz”), buy a branch on Postać — and each screen of item 2 is screenshot at 360 px: the login card with each of its four forms, a waiting screen, the menu bar with the open menu „Konto”, Siedziba with its band, Postać, Mapy with the list and a card, Programy with the list and the editor, Wiedza, the screen of a map run with the scene showing a plaque of a discovery and the badge over the mage's head, the end-of-run window, and the owner panel's list of accounts; and the screen of a map run with the pick of „Czynność” open at a page area 1100 px wide. Each screenshot is looked at for a side scroll and a text over a frame before it is shown; a fault found goes back to the orchestrator in the report, not fixed here. The screenshots go to `mariusznazar/screenshots` as D-418 and D-419 give, and the report holds the link of each, in the order of item 2, with what it shows, for the description of the request.
- **Change:** none
- **Read:** `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 (rewritten by Slice 1) · `foundations/decisions.md:1602-1667` D-417 · `foundations/decisions.md:1668-1682` D-418 · `foundations/decisions.md:1683-1697` D-419 · `foundations/decisions.md:1698-1712` D-420
  · `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:65-67` Question 5
- **Model:** same — judges every screen of the game for faults of the phone layout and plays the whole loop by touch.
- **Risk:** none
- **Checks:** the loop by taps reaches each of its steps, the report naming each; every screenshot pushed, its link to a commit of `mariusznazar/screenshots` with `?raw=true`, in the report.
- **Depends on:** Slice 19

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: Mariusz plays the whole loop on a phone by touch, no side scroll, no text over frames | Slices 9–19; evidence Slice 20; the check on a real phone after the merge (question 5) stays the human's |
| To do 1 — two layouts, one threshold at 1280 px, the phone layout for 360 px upright, no third layout | entry 1; Slices 9, 8 |
| To do 2 — every screen listed fits 360 px; nothing scrolls to the side, in frames either | Slices 9, 15, 16, 17, 18, 19; the table of tiles and the list of accounts Slices 19, 16; evidence Slice 20 |
| To do 3 — everything by touch, the whole loop | Slices 7, 10, 12, 13, 14, 16–19; the walkthrough Slice 20 |
| To do 4 — the names of the pick cells inside frames at 360 and at 1100 px, from `8591aa82` | Slices 4, 11; checked again Slice 19 |
| To do 5 — the scene at the largest whole multiple that fits, crop sparing what the player acts with, small elements readable | entries 9, 10; Slices 2, 5, 15; screenshot Slice 20 |
| To do 6 — arrows in the header of rule groups, in every layout; the drag for the mouse | entry 11; Slices 2, 3, 4, 12, 13, 18 |
| To do 7 — a tap on a tile marks its row, a tap elsewhere takes it off; the hover stays | entry 12; Slices 2, 3, 4, 5, 14 |
| To do 8 — the destructive button in `danger` at rest, `highlight` under the pointer | entry 8; Slices 1, 10 |
| To do 9 — the touch-target minimum in the phone layout, its value from a cited source | entries 1, 2; Slices 1, 7, 16–19 |
| To do 10 — the styleguide's rules of the phone layout | Slice 8 |
| To do 11 — loop2-play says how to check the phone layout | Slice 6 |
| To do 12 — the screenshots of every screen at 360 px and the pick at 1100 px, by D-418 and D-419 | Slice 20 |
| Acceptance — at 1280 × 720 and wider every screen as before, but items 6–9 | the phone rules only in phone blocks (*Choices*); the before-and-after screenshots at 1280 × 720 of Slices 7, 9, 10, 11, 14–19 |
| Row 1 (D-349) | entry 9, Slice 2 |
| Row 2 (D-288) | entry 11, Slice 2 |
| Row 3 (D-19) | entry 12, Slice 2 |
| Row 4 (D-44) | entry 8, Slice 1 |
| Row 5 (D-396, nothing scrolls to the side) | entry 1, Slice 1 |
| Row 6 (D-396, touch-target minimum with a quoted source) | entries 1, 2, Slice 1 |
| *Decisions in play*: D-280, D-282, D-311, D-370, D-389 rewritten to the two layouts | entries 3–7, Slice 1 |
| *Decisions in play*: D-295, D-297, D-41, D-70, D-42, D-166, D-417, D-418, D-419 unchanged | read by Slices 2, 9, 12–15, 18, 20, which change none of them |
| Out of scope — the look of the character's tile, the bars, the windows of editing, Wiedza, the transitions | Slices 17, 18 fit them to the width and redesign nothing |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The phone layout is written as overrides in blocks `@media (width < 1280px)` (range syntax, the number of D-396 written as it stands), in each screen's stylesheet, each block with a comment naming D-396; the computer layout's rules stay as they are, the threshold rules that stood at 720 and 1074 px move to 1280 px | rules rewritten phone-first with the computer layout in `min-width` blocks; a class on the page set from `matchMedia` | phone-first rewrites every rule and risks the computer layout the acceptance holds; a class needs script for layout. Wrong: the overrides grow harder to read later, a rewrite by a later task |
| The threshold is written in each `@media` rule, its source kept by the comment D-396 beside it and by the styleguide's rule (Slice 8); the page area of 360 px is written nowhere in a stylesheet, only in loop2-play and the styleguide | one place for the threshold | CSS reads no custom property in a media query, and D-43 exempts the threshold; wrong: a future change of the threshold edits several files |
| The scene has the two sizes 1× and 2× only, as D-349's new wording and *Decisions in play* give, though 3× fits in a phone layout over about 1050 px | the largest multiple without a cap | the task's sizes are two; wrong: a phone layout at 1100 px shows a smaller scene than it could, which the human may ask for |
| The scene's second size comes from a rule of the stylesheet in the phone layout's blocks (a width threshold of the window at which 672 px fit, counted from the phone paddings, written with its arithmetic in a comment), the background's `width` and `height` attributes staying 672 × 304 | a container query; a size measured by script | D-43 exempts a threshold of `@media` and names none of `@container`; script adds a listener of the window's size; wrong: a threshold that misses the fit by the scrollbar's width, seen in the browser checks |
| The crop: the frame keeps its picture's size and a place around it in `world-area.tsx` clips it, centred, with the phone paddings small enough (Slice 9) to crop at most 32 px at 360 px | a crop of the right side only; the frame itself narrowed | a narrowed frame moves every part placed by percentages; a right crop hides the mage at the right edge |
| The small elements of the scene keep their sizes in CSS pixels, which do not follow the scale today | sprites redrawn for 1× | a sprite change touches the trust boundary `assets/sprites/**`; wrong: a badge large against a mage at 1×, judged by the human on the screenshot |
| Every decision rewrite keeps each opening of a binding sentence that a test quotes; where a row makes such a sentence false (D-288, D-19, D-349), Slice 2 rewrites it and Slices 3–5 bring the citations to it at once | the citations shortened first to an opening valid before and after; the citations updated in the slices of the code | the code slices with the big test files would be too large for one agent; shortened citations hold less of what a test holds. Wrong: the check of the foundation stands red from Slice 2 to Slice 5 |
| A tap marks only with a pointer of the kind touch; a click of a mouse changes nothing, as D-19's test holds today; a tap on a row of the table is no new act | any click marks the row; a tap on a row marks its tile | row 3 speaks of the tap and keeps the hover; wrong: a pen or a mouse click does not mark, a small later change |
| The handle of a rule and of a group stays in both layouts | the handle hidden in the phone layout | a narrow window of a computer keeps its mouse; wrong: a few pixels of a header at 360 px |
| A group's „↑” is off on the first group and „↓” on the last, a move one place, as a rule's arrows inside a group | arrows that move a group across the program's edge in some other way | row 2 says „tak jak reguły”; wrong: a small change of two functions |
| The touch-target minimum holds for every control of D-47 in the phone layout; a link inside a sentence only where the cited source does not exempt an inline target | every link held to it, inside a sentence too | a link inside a sentence held to it breaks the line of text; wrong: one link a little small to tap |
| The fix of the pick cells is the reverted commit `8591aa82` taken over, the helpers of the editor tests made independent of the markup first (Slice 4) | a new fix | the commit was reviewed once in PR #168; wrong: none known |
| The skill loop2-play gains the phone check early (Slice 6), so that every later slice checks the phone layout one way; the styleguide's rules come before the screens (Slice 8), so that the screens follow them | both at the end, in the order of items 10 and 11 | the screens would be checked each its own way and the rules written after the fact; this departs from the styleguide's example of the order of work only in putting the rules before the screens |
| The screenshots that slices take are working copies, looked at and removed; only Slice 20 shows a set, with no screenshot of loop beside it | screenshots of loop beside each, as D-418's rationale gives for a changed screen | loop's phone look is no reference the task names; wrong: the human asks for loop's screens |
| No move of code before a slice adds to a function or a file: none stands over the thresholds of D-425 at the base; the slices that add to `RuleListView` (179 of 200 lines), `ProgramPanelView` (194) or `Scene` (184) keep them under | a move slice first | wrong: a slice that crosses a threshold moves a part out within itself, the size test showing it |
