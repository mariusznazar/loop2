# Plan — loop2: paski parametrów postaci na ekranie przejścia, co najmniej tak czytelne jak w starym Loopie

- Task: `.runs/task-cycles/paski-parametrow/task.md`
- Spec: none
- Base: 51667231eafb32db53eaaf662f07e728323aa2ba

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-337 — changed: new binding sentences for the cells with bars, the temperature scale, the outline, the alarm, the explanations, the blow marker and the motion while game time stands; *Verification*, *Rationale* and *Rejected* rewritten (the rejection of cells with bars and the sentence „a value with no bar is the same number a bar only draws” stop holding) | decision | rows 1, 2, 4, 5, 6, 7, 9, 10, 11; task *Decisions in play* D-337 | Slices 5, 6, 7, 8, 9 |
| D-311 — changed: the sentence of the world: bars under the values, and the open explanation under the cells, above the backpack | decision | rows 1, 2; *Decisions in play* D-311 | Slices 7, 9 |
| D-178 — changed: the cell of nature energy with its name and number apart, a white bar and an explanation on a click | decision | rows 1, 2, 3; *Decisions in play* D-178 | Slices 5, 6, 7 |
| D-39 — changed: `positive` as the fill of the health bar; `warning` still in no bar and the orange fill of satiety in a role of its own; `danger` as the number of health below 35 and as the zone of overheating; the amber outline of the temperature cell in a role of its own (*Choices*) and the bluish outline in the role of the chill zone | decision | rows 3, 5, 7; *Decisions in play* D-39 | Slices 1, 3, 6, 9 |
| D-40 — changed: the track of the bars of satiety, health and nature energy in `highlight`; `text-strong` as the fill of the nature-energy bar; the chill zone and the safe zone in roles of their own and the marker of the scale in a role of its own (*Choices*); the button of a cell of the body row with no `highlight` under the pointer and its name in `text-strong` when open and under the pointer | decision | rows 3, 8, 10; *Decisions in play* D-40 | Slices 1, 2, 3, 6, 9 |
| D-42 — changed: the new pairs — each fill against the track `highlight` at full opacity, each zone of the scale against `panel`, the marker against each zone, the amber and the bluish outline against `panel`, no pair zone–zone; the dim phase of the alarm's pulse exempt from the threshold; the pulse and the blow marker judged by 2.3.1 | decision | rows 3, 5, 6, 8; *Decisions in play* D-42 | Slices 1, 8 |
| design-token-contrast — changed sentence holding the new pairs of D-42; its check is `tests/invariants/test_design_token_contrast.py`, whose pairs Slice 1 writes | invariant | the row of D-42 (rows 3, 5, 8) | Slice 1 |
| D-04 — changed: the browser view draws the body row also from the events the simulation returned, for the blow marker of the health cell; the open explanation is the state of the screen's own component | decision | row 9; *Decisions in play* D-04 | Slices 5, 8 |
| D-44 — changed: the new kind of the shared button, the button of a cell of the body row (*Choices*), in its list of kinds with its look | decision | task *To do* 4; *Decisions in play* D-44 | Slices 2, 3, 6, 7, 9 |

The agent of these entries follows `.the-way/task-cycle/skill/foundation_step.md` and the `SKILL.md`
of each element. Four constraints of the product bind it:

- `python -B .the-way/elements/common/foundation_check.py` holds a decision's binding sentences to at
  most 3 sentences and 300 words in a paragraph and 600 words in all (WAY-05), as an error for a
  changed decision. D-04's second paragraph stands at 299 words and D-42's one paragraph at 3
  sentences, so what these entries add stands in a new paragraph; D-337 takes much and must stay under
  600 words: the values of the look (colours, roles, thickness, times) belong to D-39, D-40 and D-42
  and to the styleguide's rule, not to D-337. Where D-337 still cannot hold its rows within the limits,
  the agent returns that as a question (*Questions* of the planner's report proposes an answer).
- Tests quote binding sentences by `decision: D-<n> "<quotation>"` lines, and the check requires each
  quotation to begin a binding sentence: D-337 is quoted 34 times (`tests/sim/body.test.mjs`,
  `tests/view/body-row.test.mjs`, `tests/view/world-area.test.mjs`), D-311 40 times, D-44 39 times,
  D-04, D-39, D-40 and D-178 a few times each (`git grep -n "decision: D-337 \""` lists them). The
  agent keeps each sentence a test quotes beginning as it does, to the length of the quotation,
  wherever it still holds, and adds the new meaning in sentences of its own; where a quoted sentence
  must be reworded, it updates in the same commit the quotation of each line that cites it and no
  other line of those tests.
- The agent names the five new roles of D-39 and D-40 by what they mean, as D-48 gives — the fill of
  satiety, the chill zone (also the bluish outline), the safe zone, the marker of the scale and the
  warming outline — and the later slices take the names from the entries.
- The invariant's test checks the new pairs only after Slice 1, so the agent runs the check with
  `--skip-test-citations` where the plain run reports a citation, as WAY-321 exempts.

## Slices

### Slice 1 — The new roles with their values and pairs

- **Goal:** `src/browser/tokens.css` holds each new role of D-39 and D-40 as written by the
  *Foundation entries* — the fill of satiety, the chill zone, the safe zone, the marker of the scale
  and the warming outline — as `--<role>`, and the opacity of the dim phase of the alarm's pulse,
  40 % (loop's `@keyframes alarm`, task *Context*), as a token named by its use (D-43 counts a
  unitless opacity as a value only a token holds); each value is the executor's choice, as the task's
  *To do* 3 leaves it, among values that keep every pair of the changed D-42 and invariant
  design-token-contrast, and each carries a `Source:` comment that names where it comes from (a
  colour of loop read from its deployed code, or the choice the task leaves to the agent with the
  threshold that bounds it). `tests/invariants/test_design_token_contrast.py` checks every pair of the
  changed invariant — its `PAIRS`, its docstring, its made-up passing values and one flagged made-up
  case for each new kind of pair — written first and seen failing on the missing roles, then passing.
  In `guidelines/styleguide-browser-view.md`, by `.the-way/product-guidelines/styleguide/template.md`
  ("Writing the file"): the table Roles has a row for each new role in the meaning of its decision, and
  the rows of `highlight`, `text-strong`, `positive` and `danger` name their new uses; the rule
  "Contrast of every pair" lists the new pairs and the exemption of the dim phase; where a value's
  source is the choice the task leaves to the agent, the rule "Every value with its source" names that
  kind of source. No value is written into the styleguide.
- **Change:** `src/browser/tokens.css` · `tests/invariants/test_design_token_contrast.py` ·
  `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:166-183` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:5002-5024` D-39 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:5042-5056` D-41 · `foundations/decisions.md:5057-5071` D-42 ·
  `foundations/decisions.md:5072-5086` D-43 · `foundations/decisions.md:5149-5163` D-48 ·
  `foundations/decisions.md:4987-5001` D-38 · `foundations/invariants.md:498-507` design-token-contrast ·
  `foundations/invariants.md:508-517` design-token-sources ·
  `foundations/invariants.md:478-487` browser-view-token-values ·
  `.the-way/product-guidelines/styleguide/template.md:159-190` Pairs and meanings · Writing the file ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** strongest — it chooses five colours and their sources, which the human judges on the
  side-by-side screenshots, within the thresholds of D-42.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_design_token_contrast.py` (first failing on the
  roles the token file lacks) · `npm test -- tests/invariants/test_design_token_sources.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** D-39 · D-40 · D-42 · design-token-contrast

### Slice 2 — The shared button of a cell of the body row

- **Goal:** `ReactButton` builds the new kind D-44 names after the *Foundation entries*, the button of
  a cell of the body row: besides what it has, it carries the content of a cell — the name at the left
  and the number at the right on one line, a bar under them, a note under the bar — and says by
  `aria-expanded` whether its explanation stands open; its form is the executor's choice, as the task
  leaves it, within D-265 and D-395 (the button knows no screen: the screen gives the name, number,
  share and role of the fill and the note). `src/browser/styles.css` holds the look of this kind with
  the other shared controls (D-265, D-421): frame in `control-border`, no background of its own and no
  `highlight` under the pointer, the name in `text-strong` under the pointer and when open, the bar
  with its track in `highlight`, twice `--bar-width` thick, and its fill as long as the share the
  screen gives, and in the block `@media (width < 1280px)` the touch target of `--touch-target-min`.
  The same file holds, beside the kind and with a comment saying why, the rule that lets the health
  cell, which is no button, stand in the same parts and hold the button's frame place with no frame
  (*Choices*). `tests/view/shared-controls.test.mjs` holds a case for this kind, written first and
  seen failing: its parts, its classes, `aria-expanded` true and false, a click reaching the screen's
  handler, and its look through the real stylesheet. Nothing else of the button changes.
- **Change:** `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css` ·
  `tests/view/shared-controls.test.mjs`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:28-35` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:5087-5103` D-44 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:4386-4433` D-265 ·
  `foundations/decisions.md:4759-4773` D-395 · `foundations/decisions.md:5134-5148` D-47 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/invariants.md:488-497` browser-view-focus-outline ·
  `src/browser/styles.css:299-651` · `tests/view/shared-controls.test.mjs:1-466` ·
  `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — it shapes the extended shared button, which the later slices and the kitchen-sink
  page build on.
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs` (the new case first failing) ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · D-44 · D-40

### Slice 3 — The new roles and the button of a cell on the kitchen-sink page

- **Goal:** the kitchen-sink page shows each new role of the table Roles in the table's order, with a
  sample of its kind (`src/browser/kitchen-sink/role-samples.tsx`, its count of roles too), and the
  button of a cell of the body row in each of the seven states or the reason a state does not apply,
  with made-up values and no game state (`src/browser/kitchen-sink/control-samples.tsx`), as D-45 and
  the styleguide's rule "The kitchen-sink page" give; a rule only the page's samples need stands in
  `src/browser/kitchen-sink/kitchen-sink.css`. The page is built and opened with
  `npm run kitchen-sink` and looked at, as `.the-way/task-cycle/change/ui_check.md` gives.
- **Change:** `src/browser/kitchen-sink/role-samples.tsx` ·
  `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `src/browser/kitchen-sink/sample-parts.tsx` · `src/browser/kitchen-sink/kitchen-sink.tsx` ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css` ·
  `foundations/decisions.md:5104-5118` D-45 · `foundations/decisions.md:5087-5103` D-44 ·
  `foundations/decisions.md:4463-4495` D-269 · `foundations/decisions.md:5002-5024` D-39 ·
  `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/invariants.md:518-527` application-build-kitchen-sink ·
  `.the-way/task-cycle/change/ui_check.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npx tsc -p tsconfig.kitchen-sink.json --noEmit` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2

### Slice 4 — The body row in a component of its own

- **Goal:** the body row — its cells, their notes and the line of the backpack — moves out of
  `WorldArea` into a component of its own in the new file `src/browser/view/body-row-cells.tsx`,
  which `src/browser/view/world-area.tsx` draws in the same place from what it already holds; the
  cases of `tests/view/world-area.test.mjs` that test the body row (lines 563–772 at the base: its
  values, cells, notes and backpack) move to the new `tests/view/body-row-cells.test.mjs` with the
  helpers they need and their assertions unchanged, and the case of the world area's order from the
  top stays where it is. Behaviour does not change: the moved cases pass before and after, and no
  other case changes.
- **Change:** `src/browser/view/world-area.tsx` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/world-area.test.mjs` · `tests/view/body-row-cells.test.mjs`
- **Read:** `src/browser/view/body-row.ts` · `tests/view/page-document.mjs` ·
  `tests/view/game-stylesheets.mjs` · `foundations/decisions.md:10932-10972` D-337 ·
  `foundations/decisions.md:10650-10784` D-311 · `foundations/decisions.md:4774-4790` D-407 ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/body-row-cells.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** none

### Slice 5 — What each cell of the body row says, its bar, alarm, outline, explanation and blow

- **Goal:** pure functions of the view give, for a map run on its map, each cell of the body row: its
  name and its number apart (the numbers as today, D-57, D-178), the share of its bar — satiety 0 to
  100, health 0 to the starting health and nature energy 0 to its cap, from the game's data — or, for
  temperature, the place of the marker on the scale from 30 to 41 °C (at its left end below 30 °C) and
  the zone it stands in (chill 30–35, safe 35–39, overheating 39–41 °C), whether the value is below its
  threshold (temperature below 35 °C and satiety below 30 from the game's data, health below 35, a
  number of the look alone), the note as today, and the outline of the temperature cell — warming while
  something burns on the character's tile, cooling while nothing warms it and the map is colder than
  the body, plain on a map that does not cool it; and the words of the explanation of temperature,
  satiety and nature energy — the threshold, what happens below it and how fast the value changes,
  with the numbers from the game's data (the wording is the executor's, after the old Loop's lines the
  task quotes, and true to the decisions it reads). In `src/browser/view/body-row.ts` these stand with
  the functions of today. A pure function in the new `src/browser/view/body-blow.ts` reads the blow
  marker from the events of one simulation call (D-04 as the *Foundation entries* change it): one
  marker for a combat, „−{n} · {stworzenie}” with the sum of the creature's blows and its name from
  the game's data, where that sum is at least 2, a killing blow included, and none at the paces 8× and
  16×. The numbers of the look (30, 35, 39, 41) stand in the view module (*Choices*). Each behaviour
  has its test written first in `tests/view/body-row.test.mjs` or the new `tests/view/body-blow.test.mjs`,
  its expected values written out in the case. What `world-area.tsx` and `body-row-cells.tsx` use today
  stays as it is, so every other test keeps passing.
- **Change:** `src/browser/view/body-row.ts` · `src/browser/view/body-blow.ts` ·
  `tests/view/body-row.test.mjs` · `tests/view/body-blow.test.mjs`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:154-187` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:7204-7228` D-178 ·
  `foundations/decisions.md:59-207` D-04 · `foundations/decisions.md:6289-6304` D-57 ·
  `foundations/decisions.md:6305-6320` D-58 · `foundations/decisions.md:6335-6350` D-60 ·
  `foundations/decisions.md:6607-6629` D-387 · `foundations/decisions.md:7119-7143` D-175 ·
  `foundations/decisions.md:7468-7483` D-377 · `foundations/decisions.md:5967-5997` D-136 ·
  `foundations/decisions.md:5760-5787` D-130 ·
  `foundations/decisions.md:306-331` D-18 · `foundations/invariants.md:236-247` content-identifiers ·
  `src/browser/sim/body.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/types.ts:120-160` · `src/browser/sim/run.ts:65-104` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — it writes the Polish words of three explanations the player reads, with numbers
  from the game's data, and reads the blow from the simulation's events.
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row.test.mjs` · `npm test -- tests/view/body-blow.test.mjs`
  (each new case first failing) · `npm run typecheck` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** D-337 · D-178 · D-04

### Slice 6 — The cells with their bars, the temperature scale and the outline

- **Goal:** the body row draws each of the four values as the old Loop's cell: the name at the left
  and the number at the right, the bar under them and the note under the bar; temperature, satiety and
  nature energy in the button of a cell (Slice 2), health in the same parts with no frame, holding its
  place; the backpack a line with no bar. The fills stand in their roles (health `positive`, nature
  energy `text-strong`, satiety its own role) on the track `highlight`; the temperature scale has its
  three zones as its track, on `panel`, apart by a narrow gap in the colour of the background, in their
  widths 5:4:2, and the dark marker the height of the bar at the temperature now; below its threshold
  the number stands in `danger`, as do „marznie” and „głoduje”; the frame of the temperature cell is the
  outline Slice 5 gives (the warming role, the chill zone's role, or `control-border`), and the notes and
  the outline show the stopped minute after the end of a map run. The length of a fill changes smoothly,
  at a time the executor chooses and writes with its source in a comment by the rule, and stands at
  once at the first draw and under the system's setting for reduced motion. The rules stand in
  `src/browser/run-screen.css`, in the place of the body row's rules, with their block
  `@media (width < 1280px)`: at a page area 360 px wide nothing scrolls to the side and no text crosses
  its frame, and where four cells with full names do not fit side by side the row breaks into two rows
  of two. Each behaviour has its case written first in `tests/view/body-row-cells.test.mjs`, which
  Slice 4 creates and this slice reads whole, the moved cases brought to the new cells (names and
  numbers apart, their `decision:` quotations brought to the entries as they now stand). Both layouts
  are checked in the running game as `.claude/skills/loop2-play/SKILL.md` gives in "Check the phone
  layout", and the screenshot as `.the-way/task-cycle/change/ui_check.md` gives.
- **Change:** `src/browser/run-screen.css` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/body-row-cells.test.mjs`
- **Read:** `src/browser/run-screen.css:600-672` ·
  `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:154-160` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:172-176` Context ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:7204-7228` D-178 ·
  `foundations/decisions.md:5002-5024` D-39 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/decisions.md:4853-4867` D-421 ·
  `foundations/decisions.md:5500-5514` D-279 ·
  `src/browser/view/body-row.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/styles.css:299-651` · `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `.claude/skills/loop2-play/SKILL.md:23-265` Start the game · Operate the game with Playwright CLI ·
  Check the phone layout · `.the-way/task-cycle/change/ui_check.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** strongest — it lays out the row the human compares with the old Loop's (the acceptance
  criterion), in two layouts.
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row-cells.test.mjs` (each new case first failing) ·
  `npm test -- tests/view/world-area.test.mjs` · `npm run typecheck` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · Slice 5 · D-337 · D-39 · D-40 · D-44

### Slice 7 — The explanation of a value under the cells

- **Goal:** a click on the cell of temperature, satiety or nature energy opens its explanation from
  Slice 5, a second click closes it, a click on another cell switches to that cell's explanation, and
  at most one stands open; it stands right under the four cells, above the backpack, and moves down
  what stands under it; the open cell says `aria-expanded` true and has its name in `text-strong`, as
  the cell under the pointer does, its background unchanged. What is open is the state of the body
  row's own component (D-407, D-04). Its rules stand in `src/browser/run-screen.css` with those of the
  body row, in both layouts. Each behaviour has its case written first in the new
  `tests/view/body-row-explanation.test.mjs`, which takes its helpers from the head of
  `tests/view/body-row-cells.test.mjs` (the orchestrator gives that range). The open explanation is
  checked in both layouts in the running game, by touch in the phone layout, as
  `.claude/skills/loop2-play/SKILL.md` gives.
- **Change:** `src/browser/run-screen.css` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/body-row-explanation.test.mjs`
- **Read:** `src/browser/run-screen.css:600-672` ·
  `.runs/task-cycles/paski-parametrow/task.md:31-35` To do ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:10650-10784` D-311 ·
  `foundations/decisions.md:4774-4790` D-407 · `foundations/decisions.md:5531-5555` D-396 ·
  `foundations/decisions.md:4853-4867` D-421 ·
  `src/browser/view/body-row.ts` · `src/browser/view/controls/react-button.tsx` ·
  `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `.claude/skills/loop2-play/SKILL.md:23-265` Start the game · Operate the game with Playwright CLI ·
  Check the phone layout · `.the-way/task-cycle/change/ui_check.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row-explanation.test.mjs` (each new case first failing) ·
  `npm test -- tests/view/body-row-cells.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 5 · Slice 6 · D-337 · D-311 · D-04

### Slice 8 — The alarm's pulse and the blow marker

- **Goal:** below its threshold the fill of satiety and of health, and on the scale the marker together
  with the zone it stands in, pulse in their own colour — opacity 100 % → 40 % → 100 % in 1.1 s,
  smoothly and with no end, the 40 % from the token of Slice 1 and the time in the rule with its source
  in a comment — and go on pulsing while game time stands (the player's pause, the moments of a
  discovery, a death and a completion, and the screen after the end of a map run); under the system's
  setting for reduced motion nothing pulses. The health cell shakes and shows the fading
  „−{n} · {stworzenie}” of Slice 5's blow marker (`src/browser/view/body-blow.ts`, which Slice 5
  creates and this slice reads whole), from the events the screen already gives the world area, which
  `src/browser/view/world-area.tsx` hands to the body row: never at a first draw, after a reload or a
  load; a new blow replaces the previous marker; while game time stands the shake and the text stand
  where they reached and go on when time goes on; under reduced motion the cell does not shake and the
  text stands still and goes. Neither lights or darkens more than the threshold of 2.3.1 (D-42). The
  rules stand in `src/browser/run-screen.css` beside the body row's, after the pattern of the scene's
  rules of motion, reduced motion and standing. Each behaviour has its case written first in the new
  `tests/view/body-row-motion.test.mjs`, which takes its helpers from the head of
  `tests/view/body-row-cells.test.mjs` (the orchestrator gives that range). The motion is checked in
  the running game and described in words in the report.
- **Change:** `src/browser/run-screen.css` · `src/browser/view/body-row-cells.tsx` ·
  `src/browser/view/world-area.tsx` · `tests/view/body-row-motion.test.mjs`
- **Read:** `src/browser/run-screen.css:600-672` · `src/browser/run-screen.css:840-890` ·
  `src/browser/run-screen.css:1280-1470` · `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:178-180` Context ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:5057-5071` D-42 ·
  `foundations/decisions.md:11752-11842` D-317 · `foundations/decisions.md:11985-12055` D-322 ·
  `foundations/decisions.md:4853-4867` D-421 ·
  `src/browser/view/body-row.ts` · `src/browser/view/world-area.tsx` ·
  `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `.claude/skills/loop2-play/SKILL.md:23-94` Start the game · Operate the game with Playwright CLI ·
  `.claude/skills/loop2-play/SKILL.md:284-363` Compose a game state · Read motion from a stream of
  frames · `.the-way/task-cycle/change/ui_check.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — it times motion against game time that stands and against reduced motion, on a
  blow read from events.
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row-motion.test.mjs` (each new case first failing) ·
  `npm test -- tests/view/body-row-cells.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/scene.test.mjs` · `npm run typecheck` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 5 · Slice 6 · Slice 7 · D-337 · D-42 · D-04

### Slice 9 — The styleguide's rule of the body row, and the side-by-side for the request

- **Goal:** `guidelines/styleguide-browser-view.md` holds the new rule "The body row of a map run",
  whole, in the form of the rules "The scene of a map run" and "The screen Postać" — its *Decision*
  line with the decisions it restates (D-337, D-311, D-178, D-39, D-40, D-42, D-44, D-04, D-396 and
  those the row's look stands on), *Invariant*, *Good* and *Bad*, and the text of the cells, bars,
  scale, outline, alarm, explanation, blow marker, motion and both layouts as the code of Slices 2 and
  5–8 makes them, its values pointed to and none written; and in the rule "States of shared controls"
  the list „Kontrolki odstępujące od tej listy stanów” holds the button of a cell of the body row with
  its states and its reason: its track stands in `highlight`, the colour of the background of a
  button under the pointer. It is written by the styleguide template's "Writing the file"
  (`.the-way/product-guidelines/styleguide/template.md`): meanings from the decisions, no new meaning.
  The UI is finished before this slice, which changes no screen, so its executor also makes the
  side-by-side of the task's *To do* 8 from the running game, as `.claude/skills/loop2-play/SKILL.md`
  gives in "Show a screenshot to the human": the two screenshots of the old Loop of 31 October,
  `loop_06_przejscie_ekran.png` and `loop_11_run_w_ruchu.png`, from the folder `rozpoznanie_mvp2/zrzuty`
  beside the project's definition (that folder lies beside the file the key `projects` of `loop2` in
  `~/.the-way/locations.json` names, in the author's private notes, so no path of it enters a file of
  the repository), and loop2's screen of a map run in a window of 1600 × 1000 at the start of a map run
  and with a value below its threshold, as near the old states as the game allows, and the body row in
  the phone layout at 360 px; all pushed to `mariusznazar/screenshots` in `loop2/paski-parametrow` on
  the branch `loop2/paski-parametrow` (D-418, D-419), none in the repository. The report names each
  link with its commit, pairs old and new, and says from what of the task's answers the change departed
  and why (*To do* 9), gathered from the reports of Slices 1–8 the orchestrator hands on.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-44` To do · Acceptance criteria ·
  `.runs/task-cycles/paski-parametrow/task.md:84-93` Pytanie 6 ·
  `.runs/task-cycles/paski-parametrow/task.md:185-185` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:10650-10784` D-311 ·
  `foundations/decisions.md:7204-7228` D-178 · `foundations/decisions.md:5002-5024` D-39 ·
  `foundations/decisions.md:5025-5041` D-40 · `foundations/decisions.md:5057-5071` D-42 ·
  `foundations/decisions.md:5087-5103` D-44 · `foundations/decisions.md:59-207` D-04 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/decisions.md:1668-1682` D-418 ·
  `foundations/decisions.md:1683-1697` D-419 ·
  `.the-way/product-guidelines/styleguide/template.md:72-190` What each section carries · Pairs and
  meanings · Writing the file · `.the-way/product-guidelines/template.md:52-133` Rules · Examples ·
  Where in code · Rules of writing · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/body-row.ts` · `src/browser/run-screen.css:600-672` ·
  `src/browser/styles.css:299-651` · `.claude/skills/loop2-play/SKILL.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `guidelines/coding.md` · `src/browser/AGENTS.md`
- **Model:** same — it writes the rule the next screens of the run follow and composes the
  side-by-side the acceptance criterion is judged on.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `rg -U "###\s+The\s+body\s+row\s+of\s+a\s+map\s+run" guidelines/styleguide-browser-view.md` ·
  `git status --short` (no screenshot in the repository)
- **Depends on:** Slice 1 · Slice 2 · Slice 6 · Slice 7 · Slice 8

## Coverage

| What the task requires | Slices or entries |
|---|---|
| *To do* 1 — four values in cells as in the old Loop (name left, number right, bar, note); backpack with no bar | Settlement rows 1 · D-337 · D-311 · D-178 · Slice 2 · Slice 4 · Slice 5 · Slice 6 |
| *To do* 2 — the shares of the bars from the game's data, bars twice `--bar-width`, smooth length, none at first draw and under reduced motion; the temperature scale 30–41 °C with three zones 5:4:2, gaps, the marker | row 4 · D-337 · Slice 2 · Slice 5 · Slice 6 |
| *To do* 3 — the colours of the fills and zones, own roles and their values with sources, track `highlight`, the contrast pairs, the alarm (red number and note, pulse 100→40→100 % in 1.1 s, still under reduced motion, on while time stands, the dim-phase exemption), health 35 view-only, nature energy without alarm, the outline amber, bluish or plain | rows 3, 5, 6, 7, 8, 11 · D-39 · D-40 · D-42 · design-token-contrast · D-337 · Slice 1 · Slice 5 · Slice 6 · Slice 8 |
| *To do* 4 — the three cells as buttons opening one explanation at a time under the cells; built from the shared button extended with a sample on the kitchen-sink page; frame `control-border`, 48 × 48 px on the phone; health cell no button holding its place; open and hovered name in `text-strong`, background unchanged; the blow marker from events, one per combat, sum ≥ 2, paces 1×, 2×, 4×, killing blow included, still under reduced motion, standing while time stands | rows 2, 9, 10, 11 · D-337 · D-311 · D-04 · D-44 · D-40 · Slice 2 · Slice 3 · Slice 5 · Slice 7 · Slice 8 |
| *To do* 5 — numbers and notes as today; bars from minute zero and on the stopped minute after the end | D-337 · D-125 (unchanged) · Slice 5 · Slice 6 |
| *To do* 6 — both layouts, 360 px with no side scroll and no text over its frame, two rows of two where four do not fit | Slice 6 · Slice 7 (both checked in the running game) |
| *To do* 7 — the styleguide's new rule „The body row of a map run”, the table of roles, „Contrast of every pair”, „States of shared controls” | Slice 1 (table, contrast, sources of values) · Slice 9 (the rule and the shared controls) |
| *To do* 8 — the side-by-side of the old Loop and loop2 in the request, 1600 × 1000 and the row at 360 px, in the screenshots repository by D-418 and D-419 | Slice 9 (taken from the finished UI and pushed by its executor; the orchestrator embeds the links in the description) |
| *To do* 9 — departures from the answers shown on the screenshots and named | each slice's report names its own; Slice 9 gathers them beside the side-by-side |
| Acceptance criterion — Mariusz does not point at the old Loop as better on the side-by-side | Slice 9's side-by-side, judged by the human at the request |
| Settlement row 1 | D-337 · D-311 · D-178 |
| Settlement row 2 | D-337 · D-311 |
| Settlement row 3 | D-39 · D-40 |
| Settlement row 4 | D-337 |
| Settlement row 5 | D-337 · D-39 · D-42 · design-token-contrast |
| Settlement row 6 | D-337 |
| Settlement row 7 | D-337 |
| Settlement row 8 | D-40 |
| Settlement row 9 | D-337 · D-04 |
| Settlement row 10 | D-337 · D-40 |
| Settlement row 11 | D-337 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The amber outline of the temperature cell takes a role of its own, named for warming the character, with the value #ffd230 of loop's warm bar (`bg-amber-300`), which the task leaves to the agent | taking `discovery` or `character`, which hold the same value — `discovery` would mean both „something new was discovered” and „something warms the character”, so the rule „Each role in its meaning” is bent, and a later change of `discovery` would move the outline | one role more in the table, the token file, the pairs of the contrast test and the kitchen-sink page; reverting is a rename in those places |
| The dark marker of the temperature scale takes a role of its own, which D-40 leaves to the cycle | taking `page` (#09090b), a background, as a line on the scale — its meaning „here is the game” says nothing of the marker | as above |
| The button of a cell of the body row is a new kind of the shared button in D-44, its look (frame, no `highlight` under the pointer, name in `text-strong` under the pointer and when open, the bar's track and thickness, the touch target) in `src/browser/styles.css` with the shared controls; the colours of each value's fill, the scale, the outline, the alarm, the blow and the row's layout in `src/browser/run-screen.css` | the plain button with a class of the screen — the look of a shared control would stand in a screen's sheet against D-265, and the kitchen-sink page, which links `styles.css` alone, could not show its sample (D-45) | a kind of the shared button that one screen uses; folding it back means moving its rules |
| The health cell, which is no button, stands in the same parts as the button of a cell, its rule beside the kind's in `src/browser/styles.css` with a comment saying why | a copy of the cell's parts in `src/browser/run-screen.css` for the health cell alone — two rules of one look that drift apart | a rule of a screen's element stands in the shared sheet, as the styleguide allows for a rule that cannot be divided; review may ask to move it |
| The body row moves first, with no change of behaviour, into a component of its own with its tests in a file of their own (Slice 4), and Slices 7 and 8 put their cases in test files of their own (`body-row-explanation`, `body-row-motion`) | changing `world-area.tsx` and `tests/view/world-area.test.mjs` in each slice of the row, or one growing test file of the row — each of those slices would read a test file of 30 to 62 kB whole and pass the limit of reading | one move more in the history and three test files of one component; the world area keeps its order test |
| The numbers of the look alone — the ends of the scale 30 and 41 °C, the start of overheating 39 °C and the alarm of health 35 — stand in the view module beside the cells; the game's numbers (chill 35 °C, hunger 30, the starting health, the cap of nature energy, the rates) are read from `BALANCE` | the numbers of the look in the game's data — the game knows no overheating and no alarm of health, and data in `sim/data/` would read as rules of the game | moving four constants |
| The blow marker is read from the events by a pure function in a module of its own, `body-blow.ts`, tested apart | reading the blow inside the component | none beyond one file more |
| The screenshots of the side-by-side are taken and pushed by the executor of Slice 9, the slice after the last one that changes the UI, which changes no screen and reads little code | the orchestrator takes them — D-419 and the request template give the screenshots to the author or reviewer who shows them; or the executor of Slice 8 — its reading would pass the limit | a fix after review that changes the row must take them again; the orchestrator says so in that fix's handoff |
| The order follows the styleguide's example of the order of work — the values in their source (Slice 1), the shared control and its states (Slices 2–3), the screen (Slices 4–7), its states (Slice 8) — with the styleguide's rule last, since it describes what the slices make | the rule first, before the code | none |
