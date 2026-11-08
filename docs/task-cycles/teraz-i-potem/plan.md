# Plan — „Teraz” i „Potem”, minuty potrzeb i pasek celu na ekranie przejścia

- Task: `.runs/task-cycles/teraz-i-potem/task.md`
- Spec: none
- Base: 381588fbd31838b9c0075707a6588213cf6e5eaa

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — „Teraz” under the scene: the icon and the action as in the rule's row, at the right „reguła 2.1 · zostało 3 z 5 min”, the wait „Czeka — żadna reguła nie pasuje” with no rule and minutes, no progress bar, a fixed height | decision | *Settlements to record*, row 1 | Slices 3, 5 |
| Row 2 — „Potem”: the label, the icon and the action of the rule that wins now with „reguła 2.1”, in the minutes of an attack the combat rule the turn would choose, with no winner „żadna reguła nie pasuje — postać stanie” in `warning`, after the end the rule that wins at the stopped minute | decision | *Settlements to record*, row 2 | Slices 3, 5 |
| Row 3 — a click or a key on „Teraz” or „Potem” scrolls the program once to its rule, a folded group to its header; a row with no rule scrolls nothing | decision | *Settlements to record*, row 3 | Slice 6 |
| Row 4 — after a death „Teraz” reads its cause in `text`, the clock stands at the minute of death | decision | *Settlements to record*, row 4 | Slices 3, 5, 7 |
| Row 5 — a met requirement of the solving condition: its name, its numbers and the fill of its bar in `positive` | decision | *Settlements to record*, row 5 | Slices 1, 4, 8 |
| Row 6 — the bar of the solving condition stands after the end, at the stopped minute, with the current streak | decision | *Settlements to record*, row 6 | Slices 4, 8 |
| Row 7 — the body row in cells, the notes under temperature and satiety, their words, rounding down, from minute zero and after the end | decision | *Settlements to record*, row 7 | Slices 1, 2, 9 |
| Row 8 — in the minutes of an attack „Teraz” reads „Walczy z wilkiem” alone | decision | *Settlements to record*, row 8 | Slices 3, 5 |
| D-311 — How is the screen of a map run laid out? (the part this task's code makes true, in the binding wording of To do 6; its *Rejected* loses the clause To do 6 names) | decision, changed | projected entry „How is the screen of a map run laid out?”, Pytanie 11, To do 6 | Slices 5, 7, 8, 9 |
| D-133 — Where does the player see a map run's streak and a map's solving condition? (whole, in the projected wording) | decision, changed | projected entry D-133, *Decisions in play* „Zadanie zapisuje w całości” | Slices 4, 8 |
| `rule-state-from-pick` (in the wording of To do 6, with the D-147 exceptions); check: review, as its *Method* stays | invariant, changed | projected entry, Pytania 9, 14, 15, To do 6 | Slices 3, 5, 6 |
| D-147 — What record of an encounter does the player read? (the part this task makes true: the sentence on „Teraz”) | decision, changed in part | projected entry D-147, Pytania 9 and 14 | Slices 3, 5 |
| D-122 — What does a map run do, and what does the player see, when something is discovered? (the transitional sentence and the two *Verification* examples of To do 6) | decision, changed in part | projected entry D-122, Pytanie 12, To do 6 | Slice 7 |
| D-132 — What does the screen show, and what can the player do, after a completion? (the transitional sentence of To do 6) | decision, changed in part | projected entry D-132, Pytanie 12, To do 6 | Slices 3, 5, 7 |
| D-39 — What do the signal colours of the browser view mean? (the sentence To do 6 adds) | decision, added to | projected entry D-39, Pytanie 5 część 1, To do 6 | Slices 1, 8 |
| D-40 — What do the neutral roles of the browser view mean? (the sentence To do 6 adds) | decision, added to | projected entry D-40, Pytanie 5 część 1, To do 6 | Slices 1, 8 |
| D-62 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 7 |
| D-135 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 8 |
| D-178 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 9 |
| D-57 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet; *Decisions in play* „Przykład do poprawy” | Slice 9 |
| D-46 — *Verification*: „the clock of the map run in the status row of the header” (the cycle's) | decision, example corrected | To do 6, last bullet: the plan's answer „wszystkie, każdy w zadaniu, którego zmiana go unieważnia”; the task does not name it | Slice 7 |
| D-324 — *Verification*: „the status row ending in „ (pauza)”” (the cycle's) | decision, example corrected | as D-46 | Slice 7 |
| D-280 — the binding sentence „its minute being the map run's game minute as the status row writes it” and its *Rationale* „it reads as the status row does” (the cycle's): the writer judges whether naming the clock keeps the meaning or is a question | decision, reference corrected | found by the planner; the task does not name it | Slice 7 |
| D-291 — Which icon stands for an action? (its sentence lists where the icon stands; rows 1 and 2 add „Teraz” and „Potem”): the writer's search ties the rows to it or extends it | decision, possibly changed | rows 1 and 2 | Slice 5 |

## Slices

### Slice 1 — The new uses of roles in the styleguide

- **Goal:** `guidelines/styleguide-browser-view.md` names in its table *Roles* each new use of a
  role on the screen of a map run that To do 5 lists: in the bar of a requirement of the solving
  condition in the header the fill of a met requirement, with its name and numbers, in `positive`,
  the fill of a requirement not met in `text`, though it is no text, and the track in `highlight`;
  `warning` for „żadna reguła nie pasuje — postać stanie” in „Potem”; the red of „marznie” and
  „głoduje” and the grey of the notes of the body row. To do 5 gives this step the choice of the
  roles of the red and the grey: take them from meanings the decision log already carries —
  `danger` (D-39: a character may be lost; the source of its value in `src/browser/tokens.css`
  names „marznie” and „głoduje”) and `text-secondary` (D-40: a description, explanation or note) —
  so that no new meaning is written; where a use would need a new or changed meaning, return it to
  the orchestrator as a question instead of writing it. Where a sentence of the rules "Every
  background with its text" or "Contrast of every pair" speaks of the bar over the mage's head as
  the one bar with a track and a fill and the new bar makes it false, bring it along in the same
  wording style. Work as the cycle's author the project skill `the-way-maintain-styleguide` names:
  its section "Where the skill works" and the section "Writing the file" of
  `.the-way/product-guidelines/styleguide/template.md` give what that author writes and from what;
  a step of the skill that leads a matter with the human is answered from the task (To do 5 and the
  answered questions), and a matter the task does not settle returns to the orchestrator as a
  question. Write no value and change no token (`src/browser/AGENTS.md`); the file stays in Polish.
  Nothing else of the file changes.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:27-57` To do ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-92` Questions to settle, Pytanie 5 and Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows D-39, D-40, row 5 and row 7 ·
  `foundations/decisions.md:831-845` D-38 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:891-905` D-42 ·
  `foundations/decisions.md:906-920` D-43 · `foundations/decisions.md:2525-2546` D-133 ·
  `foundations/decisions.md:3252-3272` D-178 · `foundations/decisions.md:6938-6972` D-320 ·
  `foundations/invariants.md:479-488` design-token-contrast ·
  `foundations/invariants.md:489-498` design-token-sources ·
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow ·
  `src/browser/tokens.css` · `src/browser/AGENTS.md` ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md`
- **Model:** same — it writes binding guideline text against several decisions and has to tell a
  use of a meaning the log carries from a new meaning, which it returns as a question.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** D-39 · D-40

### Slice 2 — The minutes each need lasts, in the simulation

- **Goal:** `src/browser/sim/body.ts`, beside `bodyMinute`, exports three functions, named by the
  slice: (a) the game minutes a body lasts on a map with no warmth before the game minute in which
  it is first chilled, counted by stepping `bodyMinute` with no warmth from that body, as
  `minutesWithoutFire` counts today from the starting body, and null where the map does not cool
  the body below the threshold of chill; (b) the game minutes a body's satiety lasts before the game
  minute in which the character first starves, counted by the same step; (c) for a map run on its
  map, the note of each need, in this order (To do 4): temperature — chilled where the body is below
  the threshold of chill, otherwise by fire where something burns on the character's tile
  (`warmthAt` of `src/browser/sim/world.ts` above 0, as the body's step reads it), otherwise not
  cooling where (a) is null, otherwise the minutes of (a); satiety — starving where the satiety is
  below the threshold of hunger, otherwise the minutes of (b). Minutes are whole, rounded down, by
  the counting itself. `minutesWithoutFire` of `src/browser/sim/map-card.ts` becomes (a) from the
  starting body, so the cooling of the body is counted in one place (D-333 and its *Rejected*); the
  cases of `tests/sim/map-card.test.mjs` stay as they are and pass. Write the failing cases in
  `tests/sim/body.test.mjs` first, with the task's values: from 37.0 °C 83 minutes in Las and 33 in
  Las — głębiej, from full satiety 116 (Context; Pytanie 6), from 36.9 °C in Las 79 minutes and from
  82 % 86 (To do 6, the example of D-178); the notes at 35.0 and 34.99 °C and at satiety 30 and just
  below it; a stick or a campfire burning on the character's tile giving by fire, a chilled body
  by the fire still chilled; a map at the body's starting temperature giving not cooling. Inputs
  are not changed (`simulation-inputs`).
- **Change:** `src/browser/sim/body.ts` · `src/browser/sim/map-card.ts` · `tests/sim/body.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:44-57` To do, items 4 to 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:86-92` Questions to settle, Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context · Foundation entries row 7 ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:1163-1177` D-57 ·
  `foundations/decisions.md:1178-1192` D-58 · `foundations/decisions.md:1223-1237` D-61 ·
  `foundations/decisions.md:7085-7099` D-327 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/glossary.md:12-24` game
  minute, map run · `foundations/part_map.md:30-61` simulation · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/sim/world.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/types.ts:194-289` Body to MapRun · `src/browser/sim/run.ts:413-475`
  minuteBeforePick · `tests/sim/map-card.test.mjs` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/body.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/map-card.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 7

### Slice 3 — What „Teraz” and „Potem” name, in the simulation

- **Goal:** `src/browser/sim/game.ts` exports, beside `ruleSigns`, one function, named by the slice,
  that gives for a game state what the rows „Teraz” and „Potem” name, null without a map run, its
  inputs unchanged. „Teraz”, in this precedence: after a death its cause (`run.death`); after a
  completion the completion; in the minutes of an attack the creature fought, with no rule — from
  the attack minute through the resolution minute, also where the next ordinary action starts in
  the resolution minute, as `statusText` of `src/browser/view/status-row.ts:62-68` decides it today,
  a rule that moves here; otherwise the action under way (`run.current`): a wait, or the rule it
  comes from with its action, the game minutes left and the game minutes in all, as „zostało 3 z
  5 min” reads them (left: from the map run's game minute to the action's end; in all: its end less
  its start; read in `src/browser/sim/run.ts` what `current` holds at the end of a game minute so a
  paused minute reads as the task's example). „Potem”: the winner of the judgement `ruleSigns` gives
  for the same state — the rule that wins now, in the minutes of an attack the combat rule the turn
  would choose, after the end the rule that wins at the stopped minute — or none, taken from that
  one judgement, never from a second pick (the invariant `rule-state-from-pick` in its new wording;
  D-308, D-309). „Teraz” of a rule comes from the pick that started its action, so only the D-147
  exceptions — combat, death, completion — come from elsewhere. Write the failing cases first in
  `tests/sim/rule-signs.test.mjs`: a rule's action with its minutes; a wait; the minutes of an
  attack and its resolution minute with an ordinary action starting in it; a death of cold, of
  hunger and in combat, also a death in the resolution minute; a completion, also in a resolution
  minute; „Potem” the same rule as the winner the signs show, in combat and after a death too; no
  winner. In `tests/sim/encounters.test.mjs` the case "M+5 starts ordinary work immediately, counts
  every combat action once and still shows combat" asserts the combat of the resolution minute and
  its end in the next minute through the new function instead of `statusText`: the requirement is
  D-147's „Teraz”, which that function now carries, so the check moves and is not weakened. The
  comment of `completionText` in `src/browser/sim/data/maps.ts` says the status row shows it;
  „Teraz” does now.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/data/maps.ts` ·
  `tests/sim/rule-signs.test.mjs` · `tests/sim/encounters.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-37` To do, item 1 ·
  `.runs/task-cycles/teraz-i-potem/task.md:61-72` Questions to settle, Pytanie 1 and Pytanie 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:93-101` Questions to settle, Pytanie 8 and Pytanie 9 ·
  `.runs/task-cycles/teraz-i-potem/task.md:118-127` Questions to settle, Pytanie 14 and Pytanie 15 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 1, 2, 4 and 8, rule-state-from-pick, D-147 and D-132 ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:437-451` D-20 ·
  `foundations/decisions.md:525-560` D-23 · `foundations/decisions.md:1223-1237` D-61 ·
  `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:2499-2524` D-132 ·
  `foundations/decisions.md:2657-2681` D-140 · `foundations/decisions.md:2682-2696` D-141 ·
  `foundations/decisions.md:2772-2786` D-147 · `foundations/decisions.md:6559-6618` D-308 ·
  `foundations/decisions.md:6619-6646` D-309 · `foundations/decisions.md:6647-6672` D-310 ·
  `foundations/invariants.md:1219-1228` rule-state-from-pick ·
  `foundations/invariants.md:248-263` program-rule-pick ·
  `foundations/invariants.md:187-197` action-in-progress ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:73-79` free game minute ·
  `foundations/glossary.md:136-141` completion · `foundations/glossary.md:168-179` combat turn,
  copy · `foundations/part_map.md:30-61` simulation · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `src/browser/sim/program.ts:348-468` judgeProgram ·
  `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `src/browser/view/status-row.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/rule-signs.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 1 · row 2 · row 4 · row 8 · rule-state-from-pick · D-147 · D-132

### Slice 4 — Each requirement of the solving condition, in the simulation

- **Goal:** `src/browser/sim/run.ts` exports, beside `meetsSolving`, a function, named by the slice,
  that gives for a map run on its map each requirement present in the map's solving condition, in
  the order streak, then beaten attacks, with the map run's count of it, the number required and
  whether it is met; `meetsSolving` reads it, so that a requirement counts as met in one place (the
  numbers that follow a rule of the game are the simulation's, D-04, D-333). After the end it gives
  the state of the stopped minute, such as the streak 0 after a death of cold (row 6). Write the
  failing cases first in `tests/sim/completion.test.mjs`: Las with one requirement, 120 of 480 not
  met and 480 of 480 met; Las — głębiej with both requirements in their order, one met and one not;
  a requirement the data leaves out not given; after a death of cold the streak at 0. Inputs are not
  changed.
- **Change:** `src/browser/sim/run.ts` · `tests/sim/completion.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 5 and 6 and D-133 · `foundations/decisions.md:52-120` D-04 ·
  `foundations/decisions.md:2465-2498` D-131 · `foundations/decisions.md:2525-2546` D-133 ·
  `foundations/decisions.md:2566-2584` D-135 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/glossary.md:136-155` completion, solved map, streak ·
  `foundations/glossary.md:162-167` beaten attack · `foundations/part_map.md:30-61` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/types.ts:232-289` Death to MapRun ·
  `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/completion.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 5 · row 6 · D-133

### Slice 5 — The rows „Teraz” and „Potem” under the scene

- **Goal:** In the world area, right under the scene and above the paragraph of the last encounter
  and the lines of the end of the map run (To do 2), stand two rows drawn only from what slice 3's
  function of `src/browser/sim/game.ts` gives: the new `src/browser/view/now-lines.ts`, pure
  functions with no DOM and no React that turn that result into the parts of the rows, and the new
  `src/browser/view/now-rows.tsx`, the React component of the two rows, which
  `src/browser/view/world-area.tsx` places. „Teraz”: for a rule, the icon of its action drawn as a
  mask in the colour of the text beside it, as in a rule's row (D-291; the class `action-icon`), the
  action in the words of the rule's row (`actionSentence` of `src/browser/view/program-editor.ts`,
  „Zbierz — Patyk”), and at the right „reguła {number} · zostało {left} z {in all} min”, the number
  as the editor numbers the rule (`ruleNumber`, the rule found in the copy of the map run); for a
  wait „Czeka — żadna reguła nie pasuje” with nothing at the right; in the minutes of an attack
  „Walczy z wilkiem” alone, the creature's name in the form `creatureAfterZ` of
  `src/browser/view/status-row.ts` gives it today, with no icon, number or minutes; after a death
  „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce” in `text`; after a completion the map's
  `completionText`, such as „Las rozwiązany”, in `positive`. „Teraz” has a fixed height — one line,
  a longer text cut rather than wrapped — so that a change of its text moves nothing below it, and
  no progress bar. „Potem”: the label „Potem”, then the icon and the action of the winner with
  „reguła {number}” at the right — in the minutes of an attack the combat rule the turn would
  choose — and with no winner „żadna reguła nie pasuje — postać stanie” in `warning`; it stands after
  the end too. The other parts take roles by the meanings of the table *Roles* as slice 1 left it:
  the label „Potem” and the parts at the right in `text-label`, as the number and the time of a
  rule's row stand, and the action in `text`. This slice draws words and roles only; a click comes
  in slice 6. The look stands in `src/browser/styles.css`, every value from `src/browser/tokens.css`,
  the fixed height a layout dimension (D-43). `status-row.ts` stays as it is; slice 7 removes its
  own copies of these words. Write the failing cases first: in the new
  `tests/view/now-lines.test.mjs`, each kind of row with its words from the task; in
  `tests/view/world-area.test.mjs`, the case "the world area stands from the top: the scene, the
  encounter, the lines of the end, the body row, …" with „Teraz” and „Potem” right under the scene,
  and a case of the roles — a death's cause in `text`, a completion in `positive`, no winner in
  `warning`. Look at the screen in a running browser as `.claude/skills/loop2-play/SKILL.md` gives,
  with a rule under way, a wait and after a death.
- **Change:** `src/browser/view/now-lines.ts` · `src/browser/view/now-rows.tsx` ·
  `src/browser/view/world-area.tsx` · `src/browser/styles.css` · `tests/view/now-lines.test.mjs` ·
  `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-38` To do, items 1 and 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:61-72` Questions to settle, Pytanie 1 and Pytanie 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:96-101` Questions to settle, Pytanie 9 ·
  `.runs/task-cycles/teraz-i-potem/task.md:113-122` Questions to settle, Pytanie 13 and Pytanie 14 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 1, 2, 4 and 8, D-311, D-147, D-132, rule-state-from-pick and D-291 ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2499-2524` D-132 · `foundations/decisions.md:2772-2786` D-147 ·
  `foundations/decisions.md:3355-3367` D-185 · `foundations/decisions.md:4015-4036` D-216 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6236-6299` D-291, D-292, D-293 ·
  `foundations/decisions.md:6559-6646` D-308, D-309 · `foundations/decisions.md:6673-6708` D-311 ·
  `foundations/decisions.md:6938-6972` D-320 · `foundations/invariants.md:1219-1228`
  rule-state-from-pick · `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:53-64` program rule, rule group ·
  `foundations/glossary.md:136-141` completion · `foundations/glossary.md:174-179` copy ·
  `foundations/part_map.md:3-29` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  `src/browser/view/program-editor.ts:787-818` ruleNumber, actionSentence ·
  `src/browser/view/rule-list.tsx:470-490` the icon of a rule's row ·
  `src/browser/view/status-row.ts` · `src/browser/tokens.css` · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/now-lines.test.mjs` and `npm test -- tests/view/world-area.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` · a look at the
  screen in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 3 · row 1 · row 2 · row 4 · row 8 · D-311 · D-291

### Slice 6 — A click on „Teraz” or „Potem” scrolls the program to its rule

- **Goal:** A row of „Teraz” or „Potem” that names a rule — „Teraz” of a rule's action, „Potem” with
  a winner — is a control: the keyboard reaches it, and a click, Enter or Space on it scrolls the
  program once so that the row of its rule stands in the middle of the window, or, where its rule
  group is folded (D-295), the header of that group; afterwards the program does not follow the rule.
  A row that names no rule — the wait, „Walczy z wilkiem”, a death, a completion, no winner — is no
  control and scrolls nothing. Build the control as the rule list builds its rows in
  `src/browser/view/rule-list.tsx`: an element with `tabIndex={0}`, a click handler and a key handler
  for Enter and Space; not a `<button>` of its own, which D-44 rules out, and not the shared button,
  whose frame and disabled look the rows must not take. Its focus shows by the one `:focus-visible`
  rule with nothing added (D-47); under the pointer it stands on `highlight`, as a control under the
  pointer does (D-40). `src/browser/view/run-screen.tsx` hands the world area a handler that asks the
  program panel; `src/browser/view/program-panel.tsx` gains a method for it on `ProgramPanel`, added
  to `RunScreenPanel`, which scrolls the row of the rule found by its `data-rule`, else the header
  of its folded group found by its `data-group`, only while the panel shows the copy of the map run,
  and does nothing while it shows a saved program. The scroll runs from the event handler, never from
  an effect (D-267). Write the failing cases first in `tests/view/run-screen.test.mjs`, on the real
  program panel: a click and Enter on „Teraz” and on „Potem” scroll the row of their rule with the
  block in the centre; a rule of a folded group scrolls its group's header; a row that names no rule
  is not reachable by the keyboard and asks for nothing. jsdom has no `scrollIntoView`, so a case
  gives the elements one that records the element and its options — a stand-in for the browser's
  API, not for the code under test; the real scroll is checked in a running browser as
  `.claude/skills/loop2-play/SKILL.md` gives (D-88).
- **Change:** `src/browser/view/now-rows.tsx` · `src/browser/view/world-area.tsx` ·
  `src/browser/view/run-screen.tsx` · `src/browser/view/program-panel.tsx` · `src/browser/styles.css` ·
  `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-37` To do, item 1 ·
  `.runs/task-cycles/teraz-i-potem/task.md:73-77` Questions to settle, Pytanie 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 3 and rule-state-from-pick · `foundations/decisions.md:861-875` D-40 ·
  `foundations/decisions.md:891-905` D-42 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:966-980` D-47 · `foundations/decisions.md:1615-1627` D-88 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5523-5596` D-267,
  D-268 · `foundations/decisions.md:5998-6023` D-282 · `foundations/decisions.md:6320-6336` D-295 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/invariants.md:35-44`
  browser-view-framework · `foundations/invariants.md:459-478` browser-view-token-values,
  browser-view-focus-outline · `foundations/glossary.md:53-64` program rule, rule group ·
  `foundations/glossary.md:174-179` copy · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/rule-list.tsx` · `src/browser/view/game-view.ts:255-270` the program panels ·
  `src/browser/view/game-view.ts:410-430` the run screen · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` (its new cases failing first) ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` · `npm run typecheck` · the scroll
  and the focus in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 5 · row 3

### Slice 7 — The clock in the header, with no action and no status row

- **Goal:** The header of the screen of a map run holds the character's name, the map's name, the
  clock, „Pauza” or „Wznów”, the five pace buttons, „Restart”, the warning of a cut trip plan and
  „Zakończ”, in this order (To do 3); the character's action is no longer in it and the status row
  is gone; slice 8 sets the bar of the solving condition after the clock, so between the two slices
  the header shows no numbers of the condition. The clock reads „Minuta {game minute}”, with
  „ (pauza)” after it at every pause, the stop at a discovery included, „Minuta 312 (pauza)”; after a
  death and after a completion it stands at the game minute of the end with no „ (pauza)”, „Minuta
  312” or „Minuta 480”, in the role `text`; it stays in Geist Mono with tabular figures (D-46). After
  the end „Pauza” and the pace buttons are gone as today (D-62, D-132). In
  `src/browser/view/status-row.ts` the text of the status row gives way to the clock's text; the
  module keeps its name, `pauseLabel`, `discoveryText` and the type of the controls, and what only the
  status row's activity used — the words of the wait, of the causes of death, the form of the
  creature's name, the reading of the action's status — goes, since slice 5's `now-lines.ts` writes
  „Teraz”. The clock's element takes the class `run-header-clock` in place of `run-header-status`,
  and the tests that find it by that class follow: `tests/view/run-screen.test.mjs`,
  `tests/view/end-question.test.mjs` and `tests/view/account-screen.test.mjs` — there also the
  expectation of the clock with „ (pauza)” at its line 4145, which becomes „Minuta 0 (pauza)”, and its
  comment at line 3685; each changed expectation names the requirement that changed it (D-311 and
  D-122 in their new wording). Write the failing cases first in `tests/view/status-row.test.mjs` —
  the clock's text running, paused, at a discovery, after a death and after a completion — and in
  `tests/view/run-header.test.mjs` — the header's order with no action, the clock after a death and
  after a completion in `text` with no „ (pauza)”, the clock in the mono face; the cases of the status
  row's wording are rewritten from the requirement that replaced it, none is dropped without one.
  Look at the header in a running browser as `.claude/skills/loop2-play/SKILL.md` gives, during a map
  run, paused and after a death.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/run-header.tsx` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/run-header.test.mjs` ·
  `tests/view/run-screen.test.mjs` · `tests/view/end-question.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:93-106` Questions to settle, Pytanie 8, Pytanie 9 and
  Pytanie 10 · `.runs/task-cycles/teraz-i-potem/task.md:110-112` Questions to settle, Pytanie 12 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 4, D-311, D-122, D-132, D-62 and D-46 · `foundations/decisions.md:39-51`
  D-03 · `foundations/decisions.md:891-935` D-42, D-43, D-44 · `foundations/decisions.md:951-980`
  D-46, D-47 · `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:1615-1627` D-88 ·
  `foundations/decisions.md:2214-2257` D-122 · `foundations/decisions.md:2442-2464` D-130 ·
  `foundations/decisions.md:2499-2524` D-132 · `foundations/decisions.md:3394-3406` D-188 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/invariants.md:35-44`
  browser-view-framework · `foundations/invariants.md:459-478` browser-view-token-values,
  browser-view-focus-outline · `foundations/glossary.md:12-24` game minute, map run ·
  `foundations/glossary.md:136-141` completion · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/view/controls/react-button.tsx` ·
  `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/status-row.test.mjs` and `npm test -- tests/view/run-header.test.mjs`
  (their new cases failing first) · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/now-lines.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck` · a look at
  the header in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 5 · Slice 6 · row 4 · D-311 · D-122 · D-132 · D-62 · D-46

### Slice 8 — The bar of the solving condition in the header

- **Goal:** In the header, right after the clock, stands the bar of the solving condition with its
  numbers (To do 3; D-133): for each requirement slice 4's function of `src/browser/sim/run.ts`
  gives, in its order, the name and the numbers „Passa {streak}/{required}” or „Pokonane napaści
  {count}/{required}” and beside them its bar, the track in `highlight` and the fill as long as the
  share of the count in the number required, never more than whole, in `text` while the
  requirement is not met, though it is no text (D-40); once it is met, the fill, the name and the
  numbers in `positive` (row 5; D-39). The bar stands after the end too, at the stopped minute, such
  as „Passa 0/480” after a death of cold (row 6), and shows the current streak, never the longest
  (D-135). The words come from pure functions of `src/browser/view/status-row.ts`, the elements from
  `src/browser/view/run-header.tsx`, the look from `src/browser/styles.css`: the bar's thickness is
  `--bar-width` and its length a layout dimension (D-43); no new token value. The roles are those
  slice 1 wrote into the table *Roles*. Write the failing cases first in
  `tests/view/status-row.test.mjs` — the parts of Las, 120/480, and of Las — głębiej, both in their
  order, one met — and in `tests/view/run-header.test.mjs` — the bar right after the clock, the
  roles of a requirement not met and met, the fill's share, the bar after a death of cold reading
  „Passa 0/480”, no bar part for a requirement the map lacks. Look at the header in a running browser
  as `.claude/skills/loop2-play/SKILL.md` gives, during a map run and after a death.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/run-header.tsx` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/run-header.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 5 and 6, D-133, D-39, D-40, D-135 and D-311 ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:846-875` D-39, D-40 ·
  `foundations/decisions.md:891-920` D-42, D-43 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2525-2546` D-133 · `foundations/decisions.md:2566-2584` D-135 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/decisions.md:6938-6972` D-320 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:142-155` solved map, streak ·
  `foundations/glossary.md:162-167` beaten attack · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/data/maps.ts` · `src/browser/tokens.css` ·
  `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/status-row.test.mjs` and `npm test -- tests/view/run-header.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_design_token_contrast.py` · `npm run typecheck` · a look at the
  header in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 4 · Slice 7 · row 5 · row 6 · D-133 · D-39 · D-40

### Slice 9 — The body row in cells, with the minutes of the needs

- **Goal:** The body row has each value in a cell of its own — „Temperatura 36,9 °C”, „Sytość 82 %”,
  „Zdrowie 100”, „Energia natury 90” — and under temperature and under satiety a note in smaller
  grey text, from slice 2's note of each need in `src/browser/sim/body.ts`: under temperature
  „marznie” in red, otherwise „przy ogniu”, „nie stygnie” or „bez ognia {n} min”; under satiety
  „głoduje” in red, otherwise „bez jedzenia {n} min”; health and nature energy with no note. The
  roles are those slice 1 wrote into the table *Roles* — expected `text-secondary` for the note and
  `danger` for „marznie” and „głoduje”; a value below its threshold keeps `danger` as today (D-39).
  The smaller text takes the existing token `--font-size-detail`, whose source in
  `src/browser/tokens.css` is the descriptions of loop; no new value. The notes stand from game
  minute zero and after the end, at the stopped minute, whatever the Understanding holds (D-125).
  The words of each note stand in `src/browser/view/body-row.ts` as pure functions, the cells in
  `src/browser/view/world-area.tsx`, the look in `src/browser/styles.css`. Write the failing cases
  first in `tests/view/body-row.test.mjs` — the example of D-178 in To do 6, in Las 36.9 °C with
  „bez ognia 79 min” and 82 % with „bez jedzenia 86 min”, each note at its threshold, by the fire, a
  map that does not cool, no note at health and nature energy — and in
  `tests/view/world-area.test.mjs` — the cells and the notes on the screen, the note's role, the
  red at chill and at hunger, the notes after a death. A case that checks the values joined by
  „ · ” changes with row 7 and the new example of D-178, and says so. Look at the body row in a
  running browser as `.claude/skills/loop2-play/SKILL.md` gives.
- **Change:** `src/browser/view/body-row.ts` · `src/browser/view/world-area.tsx` ·
  `src/browser/styles.css` · `tests/view/body-row.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:44-57` To do, items 4 to 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:86-92` Questions to settle, Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 7, D-311, D-178 and D-57 · `foundations/decisions.md:39-51` D-03 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:1163-1192` D-57, D-58 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2316-2338` D-125 · `foundations/decisions.md:3252-3272` D-178 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:117-123` Understanding ·
  `foundations/part_map.md:3-29` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/sim/body.ts` ·
  `src/browser/tokens.css` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row.test.mjs` and `npm test -- tests/view/world-area.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_design_token_contrast.py` · `npm run typecheck` · a look at the
  body row in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 2 · Slice 6 · Slice 8 · row 7 · D-311 · D-178 · D-57

### Slice 10 — The rows of the new view files in the coding guidelines

- **Goal:** The table *Files of this kind* of `guidelines/coding-browser-module.md` gains a row for
  each of the two view files slices 5 and 6 created, src/browser/view/now-lines.ts and
  src/browser/view/now-rows.tsx, in the table's order, each with the status `copy` and the decision
  `—`: neither builds elements through the DOM API, which the status `do not copy` marks (the rule
  "Nowy ekran i moduły w DOM", D-265), and neither is the exemplar (D-36). Read the two files as they
  stand on the branch; where one builds elements through the DOM API, return a question to the
  orchestrator instead of writing `copy`. Work as the cycle's author the project skill
  `the-way-maintain-coding-guidelines` names: its section "Where the skill works", and in
  `.the-way/product-guidelines/coding/template.md` the section on `## Files of this kind` and
  "Writing the files", give what that author writes and from what; a step of the skill that leads a
  matter with the human is answered from the task (To do 5), and a matter the task does not settle
  returns to the orchestrator as a question. Nothing else of the file changes.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:50-50` To do, item 5 · `guidelines/coding.md` ·
  `foundations/decisions.md:685-699` D-28 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/part_map.md:118-134` agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/coding/template.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 5 · Slice 6

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: during a map run the player reads what the character does now, what it does next, how many minutes each need lasts, and on a bar with numbers how far the map's condition is | Slices 3, 5, 6 (now and next), 2, 9 (minutes), 4, 8 (bar) |
| To do 1 — „Teraz” and „Potem” right under the scene; „Teraz” of a fixed height | Slice 5; row 1; D-311 |
| To do 1 — „Teraz” of an ordinary action: icon, action as in the rule's row, „reguła 2.1 · zostało 3 z 5 min”, no progress bar | Slices 3, 5; row 1 |
| To do 1 — „Teraz” at a wait: „Czeka — żadna reguła nie pasuje” | Slices 3, 5; row 1 |
| To do 1 — „Teraz” in the minutes of an attack: „Walczy z wilkiem” alone, the resolution minute included, death and completion first; clicking it scrolls nothing | Slices 3, 5, 6; row 8; D-147 |
| To do 1 — „Teraz” after a death: its cause in `text`; after a completion the map's sentence in `positive` | Slices 3, 5; row 4; D-132 |
| To do 1 — „Potem”: label, icon, action and number of the rule that wins now; in combat the combat rule the turn would choose; „żadna reguła nie pasuje — postać stanie” in `warning`; a state of this minute | Slices 3, 5; row 2 |
| To do 1 — „Potem” stays after the end, at the stopped minute | Slices 3, 5; row 2 |
| To do 1 — a click by mouse or keyboard scrolls the program once to the rule, a folded group to its header; a row with no rule scrolls nothing | Slice 6; row 3 |
| To do 1 — what „Teraz” and „Potem” name comes from the function that picks the rule, save the D-147 exceptions | Slice 3; `rule-state-from-pick` |
| To do 2 — order of the world: scene, „Teraz”, „Potem”, encounter paragraph, lines of the end, body row | Slice 5; D-311 |
| To do 3 — header: name, map, clock, bar, „Pauza”/„Wznów”, pace, „Restart”, warning, „Zakończ”, no action; „Pauza” and pace gone after the end | Slices 7, 8; D-311; D-62; D-132 |
| To do 3 — clock „Minuta {m}”, „Minuta 312 (pauza)” at every pause, standing at the minute of the end | Slice 7; row 4; D-122; D-132 |
| To do 3 — the bar's numbers „Passa …” before „Pokonane napaści …”, a bar beside each | Slices 4, 8; D-133 |
| To do 3 — fill in `text` on a track in `highlight`; met: fill, name and numbers in `positive` | Slices 1, 4, 8; row 5; D-39; D-40 |
| To do 3 — the bar after the end, at the stopped minute („Passa 0/480”) | Slices 4, 8; row 6; D-135 |
| To do 4 — each value in its own cell; notes under temperature and satiety in smaller grey text; health and energy without | Slice 9; row 7 |
| To do 4 — note under temperature in old Loop's order: „marznie” in red, „przy ogniu”, „nie stygnie”, „bez ognia {n} min” | Slices 2, 9; row 7 |
| To do 4 — note under satiety: „głoduje” in red, „bez jedzenia {n} min” | Slices 2, 9; row 7 |
| To do 4 — {n} whole minutes rounded down to the moment of chill or hunger | Slice 2; row 7 |
| To do 4 — notes from minute zero and after the end; whatever the Understanding holds (D-125) | Slices 2, 9; row 7 |
| To do 5 — rows of the new view files in `guidelines/coding-browser-module.md` | Slice 10 |
| To do 5 — new uses of roles in the table *Roles*; this step settles the roles of the red and the grey | Slice 1 |
| To do 6 — D-311 in its binding wording, its *Rejected* clause removed | Foundation entries D-311 |
| To do 6 — D-122, transitional wording and its *Verification* | Foundation entries D-122 |
| To do 6 — D-132, transitional wording | Foundation entries D-132 |
| To do 6 — `rule-state-from-pick` with the D-147 exceptions | Foundation entries `rule-state-from-pick` |
| To do 6 — D-39 and D-40 additions | Foundation entries D-39, D-40 |
| To do 6 — *Verification* examples of D-62, D-135, D-178, D-57; every other example the change makes false | Foundation entries D-62, D-135, D-178, D-57, D-46, D-324, D-280 |
| *Decisions in play* — D-133 whole | Foundation entries D-133; Slices 4, 8 |
| *Decisions in play* — D-147, the sentence on „Teraz” | Foundation entries D-147; Slices 3, 5 |
| *Settlements to record*, rows 1–8 | Foundation entries rows 1–8 |
| Carried question 1 — where the minutes of the needs are counted | Slice 2 (simulation, beside `bodyMinute`; the card's count reuses it) |
| Carried question 2 — how „Teraz” and „Potem” get what they name | Slice 3 (one function beside `ruleSigns`, „Potem” from its judgement) |
| Context — the shape of the saved game does not change | every slice: no slice changes `src/browser/sim/saved-game.ts` or `src/browser/sim/types.ts` |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The minutes of the needs are counted by stepping `bodyMinute` from the current body, and the card's `minutesWithoutFire` reads the same function from the starting body | A closed formula from the balance's rates, as old Loop's `minutesToChill` — a second formula of the cooling (D-333, *Rejected*) | A loop of at most some hundreds of steps per drawing; negligible at today's numbers |
| Which note stands under each need is decided in the simulation, the view writes only the words | The view choosing from the thresholds of `BALANCE` — the thresholds read twice, as D-333 rejects for numbers | The simulation holds a function only the screen uses, as D-333 accepts for the card |
| „Teraz” and „Potem” come from one simulation function beside `ruleSigns`, „Potem” from its judgement; the rule of the minutes of an attack moves there from `status-row.ts` | The view reading `ruleSigns` and `run.current` itself and keeping the rule of combat minutes (`status-row.ts:62-68`) | A function only the screen uses; a later screen needing a part of it calls the whole |
| The progress of each requirement is a function beside `meetsSolving`, which reads it | The view comparing the streak with the map's data | none beyond one more export of `run.ts` |
| A row that names a rule is a focusable element with a click and an Enter/Space handler, as the rows of `rule-list.tsx` | A `<button>` of the module's own (D-44 violates it); the shared button extended to carry an icon and a right-hand part in both forms — a frame in `control-border` around the row, a disabled look in `text-disabled`, a change of a shared control with its kitchen-sink sample and a case in `react-controls.test.mjs` | A review that reads D-44 as covering every element that takes a click finds a control of the module's own; the fix is the shared button, one slice of its own |
| A row that names no rule is plain text, no disabled control | A disabled control, as old Loop's rows — its text in `text-disabled`, while row 4 wants the cause in `text` and the completion in `positive` | none found |
| The program panel scrolls only while it shows the copy; with a saved program shown a click scrolls nothing | Switching the panel to the copy — a change of what the panel shows that the task does not ask | A player who shows a saved program during a map run clicks and sees nothing happen |
| The case of the scroll gives jsdom's elements a `scrollIntoView` that records what it was called on; the real scroll is checked in the browser | No case — which element is scrolled, the row or the folded group's header, stays unguarded | A browser that ignores `block: "center"` passes the case; the browser check catches it |
| The label „Potem” and the right-hand parts of the rows in `text-label`, the action in `text` | The action in `text-strong`, as in a rule's row — two rows under the scene as loud as the names and headings | A reviewer reading „the action as in the rule's row” as its role too asks for `text-strong`; one rule of the stylesheet |
| The clock's element takes the class `run-header-clock` and the three tests that find it follow | Keeping `run-header-status` — a class naming a row that no longer exists | Three test files more in slice 7 |
| `status-row.ts` keeps its name, holding the clock's text, `pauseLabel`, `discoveryText` and the controls' type | Renaming the module — imports, tests and its row in the coding guidelines move with it | A file name that names a row the screen no longer has |
| A value of the body row below its threshold keeps `danger`, as today, beside its red note | Taking the red off the value once the note says „marznie” or „głoduje” — the task says nothing of the value's colour, and D-39 gives `danger` to a possible loss | Two reds in one cell; if the human wants one, the value's class goes, one rule of the stylesheet |
| The note of the body row in the existing size `--font-size-detail` | `--font-size-label` — the size of dates and labels, not of descriptions | A note one pixel larger or smaller than the human expects; one rule of the stylesheet |
| The rows of the new files in the coding guidelines take the status `copy`, from the rule of D-265 | Leaving the status to a question for the human — the rule already says what `do not copy` marks | A human who wants a new file kept out of the patterns changes one cell |
| Slice 5 writes its own words of the wait, the causes of death and the creature's name, and slice 7 removes the status row's copies | Slice 5 moving them out of `status-row.ts` while its status row still needs them — one more file in that slice | The words stand twice in the branch between slices 5 and 7, never in the merged change |
