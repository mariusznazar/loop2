# Plan — Kronika z filtrami na ekranie przejścia

- Task: `docs/task-cycles/kronika-z-filtrami/task.md` (frozen, sha256 prefix cd12745e0f8566f7)
- Spec: `docs/task-cycles/kronika-z-filtrami/spec.md` (reviewed; `reports/04-spec-revision-review-report.md`)
- Base: `6f36c7ab998ceaf996afb617ca95881b3f007b2d`

Line ranges below are of the base. Entries the foundation step writes are named by their row of
the table below (F1 … F19), without backticks; an existing entry the foundation step changes is
named by its range at the base and its row, and its agent reads it as the foundation step left it.

## Foundation entries

Written first, by the cycle's foundation step, in the order of the rows, each through the project
skill its *Kind* names; the agent reads `.the-way/task-cycle/skill/foundation_step.md` whole. The plan
names entries; it never words them.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — `chronicle` (new): the record a manual map run keeps for the player to read, each entry with its game minute; not the events a function of the simulation returns | glossary term — `the-way-record-glossary-term` | projected entry, whole (task, *Decisions in play*, „Zadanie zapisuje w całości”); spec, *Foundation entries* | Slices 3, 4, 5 |
| F2 — (new) „What does the chronicle of a map run hold?”: the approved sentence, *Rationale* and *Rejected* in full; whether rows 2, 3, 4, 7, 8, 9 and 10 stand in it or in entries of their own (F4–F10) the writer decides | decision — `the-way-record-decision` | projected entry, whole; spec, *Foundation entries* | Slices 1, 2, 3, 4, 5 |
| F3 — the chronicle lives in the memory of the page, not in the save; after a load only the paragraph of the last encounter stands | decision — `the-way-record-decision` | row 1 | Slices 3, 4, 5 |
| F4 — the start of each action gives an entry in the words of „Teraz”, a wait one entry at its start | decision — `the-way-record-decision` (in F2 or its own) | row 2 | Slice 3 |
| F5 — the entry of a loss of the streak: only above zero to zero, its words, causes and role `danger` | decision — `the-way-record-decision` (in F2 or its own) | row 3 | Slices 1, 3 |
| F6 — every change of the copy gives an entry in `player-change`, also after the end until „Restart” or „Zakończ”; an edit of a saved program gives none | decision — `the-way-record-decision` (in F2 or its own) | row 4 | Slices 1, 3, 4 |
| F7 — the filter row: seven buttons in the look of the pace buttons, one picked, „Wszystko” at the start; „Nic tu jeszcze nie ma.” | decision — `the-way-record-decision` (in F2 or its own) | row 7 | Slices 5, 6 |
| F8 — newest entry on top, the minute alone in a column in `text-label`, background `panel`, colour by kind | decision — `the-way-record-decision` (in F2 or its own) | row 8 | Slices 3, 5, 6 |
| F9 — the sixth kind „Świat”: „Ognisko wygasło”, death and completion in the words of „Teraz”, completion in `positive` | decision — `the-way-record-decision` (in F2 or its own) | row 9 | Slices 2, 3, 5, 6 |
| F10 — the discoveries of one minute give one entry with the whole text of the band, without its buttons | decision — `the-way-record-decision` (in F2 or its own) | row 10 | Slice 3 |
| F11 — the pick of „Kronika” or „Teren” holds through the map run, leaving the screen and „Restart” included | decision — `the-way-record-decision` | row 14 | Slices 3, 4, 5 |
| F12 — D-04 (change): „for the scene and the chronicle, its previous reading of the game state and the events the simulation returned” | decision — `the-way-record-decision` | projected entry, the part this task makes true; spec, *Foundation entries* | Slices 3, 4 |
| F13 — (new) „How does an agent learn what went wrong in the running game?”, in full as the task quotes it | decision — `the-way-record-decision` | projected entry, whole; spec, *Foundation entries* | Slice 5 |
| F14 — D-122 (change): „what it named enters the chronicle”; and its *Rationale* „a player who goes on at once loses the list of discoveries, since the game keeps no record of them”, made untrue by this change (spec, to check) | decision — `the-way-record-decision` | projected entry, this task's part; spec, *Foundation entries* | Slices 3, 5 |
| F15 — D-147 (change): the transitional wording the task gives — the paragraph as an entry of the chronicle in the game minute of the attack, standing through a load too | decision — `the-way-record-decision` | projected entry, this task's part (transitional wording); spec, *Foundation entries* | Slices 3, 5 |
| F16 — D-311 (change): the transitional wording the task gives — the right area's chronicle or table under the tabs „Kronika” and „Teren”, the world without the paragraph; with its *Verification* examples and its *Rationale* and *Rejected* sentences that name the paragraph in the world area (spec, to check) | decision — `the-way-record-decision` | projected entry, this task's part (transitional wording); spec, *Foundation entries* | Slices 5, 6 |
| F17 — D-185 (to check): „under the scene and the last-encounter paragraph when present” — the writer decides whether the clause stays or loses the paragraph | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slice 5 |
| F18 — D-272 (to check): the *Verification* example „the paragraph of the last encounter on the solid background under it” | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slice 5 |
| F19 — D-276 (to check): „The switch of the login card stands as tabs” while the right area's tabs are a second place — the writer decides whether D-276 names it; otherwise Slice 6 records it in the styleguide | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slices 5, 6 |

No invariant, environment fact or part-map entry is written: every new file of this plan falls
under `src/browser/view/**`, `src/browser/sim/**`, `tests/view/**` or `tests/sim/**`, which
`browser-view` and `simulation` already claim. A candidate for the return step, which no row
carries: whether the two new events of the simulation (Slices 1 and 2) bind later work enough for
an entry, since task 16's „ostatnie minuty” may read them (spec, *Foundation entries*, last bullet).

## Slices

### Slice 1 — The simulation reports a loss of the streak

- **Goal:** `GameEvent` has a kind for a loss of the streak, with its game minute, the streak as it
  stood before the loss and its cause — cold, hunger, cold and hunger together, a change of the
  copy's rules or rule groups, a switch to another program — emitted wherever a streak above zero
  becomes zero, as the spec's D1 gives: by the body's step of a minute (`minuteBeforePick`), also in
  the minute of a death of cold or hunger, before the death event of that minute, its cause read
  from the one definition of chill and starvation the body already reads (`body.ts`), never a second
  copy of the thresholds; by `setProgram` with a map run and by `discardCopyChanges`, through
  `withCopyProgram`, where the edit sets a streak above zero to zero; and by `switchProgram` where
  the streak was above zero. No other function changes the events it returns, beyond those that
  pass these on (`stepMinute`, `advanceMinutes`); no function changes the state it returns; the
  game state holds no event. The tests of the spec's D11 for these losses exist and pass, and the
  existing tests that compare a whole list of events and now meet such a loss name this task as
  the source of their change (`guidelines/testing.md`, „Changing an existing test”). A test file
  that fails for this reason outside *Change* is a small mismatch: change it under the same rule and
  report it in one line.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/body.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/sim/game.ts` · `tests/sim/streak.test.mjs` · `tests/sim/copy-actions.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/sim/death.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:31-32` To do (items 4 and 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:61-71` Questions to settle (Pytanie 3 and Pytanie 4) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:155-197` D1. Facts of a game minute come from two new events of the simulation; acts on the copy are read before and after the act ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:429-440` D10. Units and their interfaces (Simulation) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:469-487` D11. Tests the design makes necessary, by kind (simulation) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F2 · F5 · F6 ·
  `foundations/decisions.md:52-119` D-04 · `foundations/decisions.md:1388-1401` D-71 ·
  `foundations/decisions.md:2466-2498` D-131 · `foundations/decisions.md:2599-2626` D-136 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:786-799` D-35 ·
  `foundations/invariants.md:214-224` simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:529-537` minute-span-split · `foundations/invariants.md:829-837` streak-program-change ·
  `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:149-154` streak ·
  `foundations/glossary.md:174-178` copy · `foundations/part_map.md:30-60` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/world.ts`
- **Model:** same — set by the orchestrator in the plan's review, since the orchestrator's `cheaper` is below the class of an executor that rewrites the order of events in the minute of a death and the whole-list expectations of five test files at once
- **Risk:** none
- **Checks:** the new cases of `tests/sim/streak.test.mjs` written first and seen failing:
  `npm test -- tests/sim/streak.test.mjs`; then `npm test -- tests/sim/copy-actions.test.mjs`,
  `npm test -- tests/sim/body.test.mjs`, `npm test -- tests/sim/discovery.test.mjs`,
  `npm test -- tests/sim/death.test.mjs`, `npm test -- tests/sim/program-list.test.mjs`,
  `npm test -- tests/sim/trip.test.mjs`, `npm test -- tests/sim/catch-up.test.mjs`,
  `npm test -- tests/sim/loop.test.mjs`; after `npm run build`:
  `npm test -- tests/invariants/test_minute_span_split.py`,
  `npm test -- tests/invariants/test_streak_program_change.py`,
  `npm test -- tests/invariants/test_saved_program_edit.py`,
  `npm test -- tests/invariants/test_simulation_inputs.py`,
  `npm test -- tests/invariants/test_simulation_isolation.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** F2 · F5 · F6

### Slice 2 — The simulation reports a campfire going out

- **Goal:** `GameEvent` has a kind for a campfire going out, with its game minute and the
  campfire's tile, emitted for each campfire whose minutes of burning fall from above zero to zero
  in the world's step of a minute, in a living minute and in a minute of an encounter alike, as
  the spec's D1 gives; a campfire crafted unlit or one already at zero gives none, and the minute of
  a death, in which the world does not pass, gives none. Where the finding sits, `worldMinute` or
  `minuteBeforePick`, is the maker's (spec, *Left to the maker*); `worldMinute` keeps its meaning.
  The tests of the spec's D11 for this event exist and pass; existing tests that compare a whole list
  of events and now meet it name this task as the source of their change; a failing file outside
  *Change* is handled as in Slice 1.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/world.ts` · `tests/sim/campfire.test.mjs` ·
  `tests/sim/world.test.mjs` · `tests/sim/encounters.test.mjs` · `tests/sim/completion.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:34-34` To do (item 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:93-97` Questions to settle (Pytanie 8) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:155-197` D1. Facts of a game minute come from two new events of the simulation; acts on the copy are read before and after the act ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:333-355` D5. Readings of the task's wording this design writes down ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:429-440` D10. Units and their interfaces (Simulation) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:469-487` D11. Tests the design makes necessary, by kind (simulation) ·
  F2 · F9 ·
  `foundations/decisions.md:52-119` D-04 · `foundations/decisions.md:1388-1401` D-71 ·
  `foundations/decisions.md:6854-6888` D-316 · `foundations/decisions.md:786-799` D-35 ·
  `foundations/invariants.md:214-224` simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:529-537` minute-span-split · `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:80-85` extinguished campfire ·
  `foundations/part_map.md:30-60` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the new cases of `tests/sim/campfire.test.mjs` written first and seen failing:
  `npm test -- tests/sim/campfire.test.mjs`; then `npm test -- tests/sim/world.test.mjs`,
  `npm test -- tests/sim/encounters.test.mjs`, `npm test -- tests/sim/completion.test.mjs`,
  `npm test -- tests/sim/body.test.mjs`, `npm test -- tests/sim/acceptance.test.mjs`,
  `npm test -- tests/sim/saved-game.test.mjs` (the save keeps its version 3 and holds nothing new);
  after `npm run build`: `npm test -- tests/invariants/test_minute_span_split.py`,
  `npm test -- tests/invariants/test_map_run_repeatability.py`,
  `npm test -- tests/invariants/test_simulation_inputs.py`,
  `npm test -- tests/invariants/test_simulation_isolation.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · F9

### Slice 3 — The chronicle memory and the composing of its entries

- **Goal:** a view module with no React and no DOM, the chronicle memory, exists as the spec's D2,
  D6 and D7 give: created from a game state (empty, the place of the paragraph where the state's map
  run holds a `lastCombat`, at its attack minute, the wait mark from the current activity,
  „Kronika” and „Wszystko”); it records a result with the state before it and, for an act on the
  copy, the act's description; it clears and keeps as D2 gives for a send, „Restart” and „Zakończ”;
  it is told the tab and the filter picked; it gives the newest entries of a filter in a window,
  the place of the paragraph, the tab, the filter and the number that changes at every change, each
  kind's entries kept apart as well as in the whole order. Beside it, the pure composing of entries
  gives each event or act its kind, minute, text and role as the spec's D3, D4 and D5 give —
  including the comparison of the copy before and after an act with the optional hint of a move —
  and the type of that hint, which Slice 4 carries from the editor. A pure function gives the
  band's text for a game state without its buttons (spec, D8); `discovery-band.tsx` uses it, and
  the chronicle calls it on the state returned with the `discovered` event. The words shared with
  „Teraz” — the wait and the causes of death — are read by both from `now-lines.ts`. Nothing
  renders the chronicle yet. The unit tests of the spec's D11 for recording, for the comparison of
  copies and for the discovery's entry equal to the band's text exist and pass. The file names below
  are the plan's; a name the maker finds clearer is a small mismatch to report.
- **Change:** `src/browser/view/chronicle.ts` · `src/browser/view/chronicle-entries.ts` ·
  `src/browser/view/discovery-band-text.ts` · `src/browser/view/discovery-band.tsx` ·
  `src/browser/view/now-lines.ts` · `tests/view/chronicle.test.mjs` ·
  `tests/view/chronicle-entries.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:26-34` To do (items 1 to 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:47-78` Questions to settle (Pytanie 1 to Pytanie 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:93-102` Questions to settle (Pytanie 8 and Pytanie 9) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:199-219` Settlements to record and Out of scope ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:16-62` Intent and Goals and non-goals ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-405` D2 to D8 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:442-467` D10. Units and their interfaces (View) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:489-499` D11. Tests the design makes necessary, by kind (view: recording, comparison, discovery) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F2 · F3 · F4 · F5 · F6 · F8 · F9 · F10 · F11 · F12 · F14 · F15 ·
  `foundations/decisions.md:52-119` D-04 (as F12 leaves it) · `foundations/decisions.md:846-859` D-39 ·
  `foundations/decisions.md:2214-2257` D-122 (as F14 leaves it) · `foundations/decisions.md:2259-2290` D-123 ·
  `foundations/decisions.md:2466-2498` D-131 · `foundations/decisions.md:2500-2525` D-132 ·
  `foundations/decisions.md:2786-2799` D-147 (as F15 leaves it) · `foundations/decisions.md:3033-3046` D-164 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:3920-3958` D-212 · `foundations/decisions.md:6278-6295` D-292 ·
  `foundations/decisions.md:6735-6774` D-312 · `foundations/decisions.md:7216-7260` D-334 ·
  `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:839-847` saved-program-edit ·
  `foundations/invariants.md:1219-1227` rule-state-from-pick ·
  `foundations/glossary.md:53-71` program rule, rule group, map run restart ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:130-154` manual map run, completion, solved map, streak ·
  `foundations/glossary.md:174-178` copy · `foundations/glossary.md:199-203` trip plan ·
  `foundations/glossary.md:217-221` earning loop · `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/understanding.ts:460-482` · `src/browser/view/status-row.ts` ·
  `src/browser/view/program-editor.ts:780-830` · `src/browser/view/discovery-rule.ts` ·
  `tests/view/discovery-band.test.mjs` · `tests/view/now-lines.test.mjs`
- **Model:** strongest — the comparison of the copy before and after an act has to find a moved rule
  or group without a hint by an algorithm the spec leaves to the maker (D4), and the memory holds the
  clearing rules, the window and the paragraph's place at once.
- **Risk:** none
- **Checks:** `tests/view/chronicle.test.mjs` and `tests/view/chronicle-entries.test.mjs` written
  first and seen failing: `npm test -- tests/view/chronicle.test.mjs`,
  `npm test -- tests/view/chronicle-entries.test.mjs`; then
  `npm test -- tests/view/discovery-band.test.mjs`, `npm test -- tests/view/now-lines.test.mjs`,
  `npm test -- tests/view/run-screen.test.mjs`; after `npm run build`:
  `npm test -- tests/invariants/test_content_identifiers.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · F1 · F2 · F3 · F4 · F5 · F6 · F9 · F10 · F11 · F12 · F14 · F15

### Slice 4 — The game view records every result into the chronicle; moves carry their hint

- **Goal:** the game view creates the chronicle memory of Slice 3 when it is built, from the game
  state it is built from, beside `createFolding`, and records into it every result in
  `store.apply`, after the result passes and before the screens draw, with the state before it; the
  five acts on the copy — `editCopy`, `saveCopy`, `saveCopyAsNew`, `discardCopy`, `switchProgram` —
  give the act's description with their result (spec, D2, D4; how it reaches `store.apply` is the
  maker's, *Left to the maker*). The three move sites of the editor — „↑”/„↓”, the drop of a rule,
  the drop of a group — give which rule or group the player moved, which travels through the
  panel's edit and `editCopy` to the chronicle and never into the simulation; an edit with no hint
  goes on as today. The memory is not yet handed to the screen of a map run (Slice 5). Tests show the
  hint reaching `editCopy` from each of the three sites, and no edit of a saved program carrying
  one.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/program-panel.tsx` ·
  `src/browser/view/rule-list.tsx` · `tests/view/rule-editor.test.mjs` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:28-28` To do (item 1) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:32-32` To do (item 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:47-52` Questions to settle (Pytanie 1) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:67-71` Questions to settle (Pytanie 4) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:138-143` Questions carried to cycle ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-250` D2. The game view owns the chronicle in the memory of the page and records every result in store.apply ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:281-331` D4. The entries of a change of the copy ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:442-467` D10. Units and their interfaces (View) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F3 · F6 · F11 · F12 · the modules Slice 3 made, the chronicle memory and the composing of entries ·
  `foundations/decisions.md:52-119` D-04 (as F12 leaves it) · `foundations/decisions.md:2466-2498` D-131 ·
  `foundations/decisions.md:3033-3046` D-164 · `foundations/decisions.md:3143-3156` D-171 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:3920-3958` D-212 · `foundations/decisions.md:5468-5508` D-265 ·
  `foundations/decisions.md:5538-5565` D-267 · `foundations/decisions.md:6041-6058` D-283 ·
  `foundations/decisions.md:7066-7079` D-324 ·
  `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `foundations/glossary.md:174-178` copy · `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/clock.ts` · `src/browser/view/program-editor.ts:60-330`
- **Model:** same — set by the orchestrator in the plan's review: the recording sits in `store.apply`, which every result passes, and the hint crosses three sites of the editor, so a wrong first attempt costs more than the class
- **Risk:** none
- **Checks:** the hint cases written first and seen failing:
  `npm test -- tests/view/rule-editor.test.mjs`, `npm test -- tests/view/program-panel.test.mjs`;
  then `npm test -- tests/view/end-question.test.mjs`, `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/view/uncaught-failure.test.mjs`, `npm test -- tests/view/chronicle.test.mjs`;
  `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · F3 · F6 · F11 · F12

### Slice 5 — The right area shows the chronicle under its tabs; the paragraph leaves the world area

- **Goal:** while no rule or group is open, the right area of the screen of a map run holds the
  tabs „Kronika” and „Teren” (`ReactButton kind="tab"` in a container of class `tabs`, D-276) and
  under them the chronicle or the table of revealed tiles as today, as the spec's D9 gives; while
  one is open, the rule panel takes the area and „✕” brings back the tab picked, read from the
  chronicle memory. The chronicle is a row of the seven filter buttons (`ReactButton` with
  `selected`, as the pace buttons) and the list, newest first, each row the minute alone in a column
  in `text-label` and the text in its entry's role, the filter row and the list on `panel`, the list
  and its empty sentence in Geist Mono at the token file's chronicle size, „Nic tu jeszcze nie ma.”
  in `text-secondary` where the filter shows nothing (spec, D5). The paragraph of the last encounter
  stands at its place among the entries, composed at draw from `lastCombat` with `combatText`, again
  only when `lastCombat` changed (spec, D6), and the world area no longer shows it. The list draws a
  bounded window and grows it on a scroll near its end, and draws no row again where nothing changed
  (spec, D7; the window's size is the maker's). The hover link between a tile and its table row
  stands only while „Teren” is picked. `createRunScreen` takes the chronicle memory from the game
  view; the picked tab and filter are clicks the screen tells the memory. Styles read only tokens.
  The unit tests of the spec's D11 for the right area, the game view and the world area exist and
  pass; the existing expectations of `tests/view/run-screen.test.mjs` (the table always in the right
  area) and `tests/view/world-area.test.mjs` (the paragraph under „Teraz” and „Potem”) change with
  To do 8 and To do 6 as their sources. The new game-view test follows the setup of
  `tests/view/end-question.test.mjs`.
  Then the acceptance check (task, *Acceptance criteria*; question 10): reading
  `.claude/skills/loop2-play/SKILL.md`, the executor runs the game locally and checks the chronicle
  in a real browser at 1× and at 16×, saving screenshots under
  `docs/task-cycles/kronika-z-filtrami/screenshots/`. It records, for each screenshot, its path,
  the pace, the game minute, the tab and filter picked and what it shows, and covers at least: at 1×
  in the first minutes, „Kronika” and „Wszystko” with action entries, the minute column and a
  discovery's entry; at 16× a longer map run with entries of several kinds, a change of the copy
  standing with the loss of the streak it caused in the same minute; a filter picked („Passa” or
  „Moje zmiany”); an empty filter with „Nic tu jeszcze nie ma.”; „Teren” with the table; an attack
  with its paragraph in the chronicle and none in the world area; the chronicle and the picked tab
  kept after Siedziba and back; after a reload with a `lastCombat`, the chronicle holding the
  paragraph alone. A state hard to reach by playing is composed as the skill's „Compose a game
  state” gives. It reads the browser's console and records any error line. Where the check shows a
  fault of an earlier slice's code, it stops and reports it rather than fixing it.
- **Change:** `src/browser/view/right-area.tsx` · `src/browser/view/run-screen.tsx` ·
  `src/browser/view/world-area.tsx` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/right-area.test.mjs` · `tests/view/run-screen.test.mjs` ·
  `tests/view/world-area.test.mjs` · `tests/view/chronicle-game.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:26-36` To do (items 1 to 9) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:41-43` Acceptance criteria ·
  `docs/task-cycles/kronika-z-filtrami/task.md:72-92` Questions to settle (Pytanie 5 to Pytanie 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:103-107` Questions to settle (Pytanie 10) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:138-143` Questions carried to cycle ·
  `docs/task-cycles/kronika-z-filtrami/task.md:199-219` Settlements to record and Out of scope ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:16-62` Intent and Goals and non-goals ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-279` D2 and D3 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:333-394` D5, D6 and D7 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:407-467` D9 and D10 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:489-511` D11. Tests the design makes necessary, by kind (view) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F2 · F7 · F8 · F9 · F11 · F13 · F14 · F15 · F16 · F17 · F18 · F19 ·
  the modules Slice 3 made, the chronicle memory and the composing of entries ·
  `foundations/decisions.md:846-874` D-39, D-40 · `foundations/decisions.md:906-934` D-43, D-44 ·
  `foundations/decisions.md:951-964` D-46 · `foundations/decisions.md:1444-1455` D-75 ·
  `foundations/decisions.md:1615-1626` D-88 · `foundations/decisions.md:2443-2464` D-130 ·
  `foundations/decisions.md:2500-2525` D-132 · `foundations/decisions.md:2786-2799` D-147 (as F15 leaves it) ·
  `foundations/decisions.md:3370-3381` D-185 (as F17 leaves it) · `foundations/decisions.md:3920-3958` D-212 ·
  `foundations/decisions.md:4030-4050` D-216 ·
  `foundations/decisions.md:5194-5252` D-254, D-255 · `foundations/decisions.md:5468-5508` D-265 ·
  `foundations/decisions.md:5538-5565` D-267 · `foundations/decisions.md:5700-5725` D-272 (as F18 leaves it) ·
  `foundations/decisions.md:5824-5860` D-276 (as F19 leaves it) · `foundations/decisions.md:6041-6058` D-283 ·
  `foundations/decisions.md:6690-6733` D-311 (as F16 leaves it) · `foundations/decisions.md:7171-7184` D-331 ·
  `foundations/decisions.md:7216-7260` D-334 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers ·
  `foundations/invariants.md:459-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/invariants.md:1179-1197` local-start-access, document-test-memory-limit ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `src/browser/view/tile-table.tsx` · `src/browser/view/combat-line.ts` ·
  `src/browser/view/run-header.tsx` · `src/browser/view/account-card.tsx:610-645` ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/tokens.css` ·
  `tests/view/end-question.test.mjs:1-240` · `tests/view/page-document.mjs`
- **Model:** same — the slice spans the screen, the game view, the stylesheet and four test files,
  and ends with the check in a real browser.
- **Risk:** none
- **Checks:** `tests/view/right-area.test.mjs` and `tests/view/chronicle-game.test.mjs` written
  first and seen failing: `npm test -- tests/view/right-area.test.mjs`,
  `npm test -- tests/view/chronicle-game.test.mjs`; then `npm test -- tests/view/run-screen.test.mjs`,
  `npm test -- tests/view/world-area.test.mjs`, `npm test -- tests/view/end-question.test.mjs`,
  `npm test -- tests/view/account-screen.test.mjs`, `npm test -- tests/view/tile-list.test.mjs`,
  `npm test -- tests/view/combat-line.test.mjs`, `npm test -- tests/view/react-controls.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`,
  `npm test -- tests/invariants/test_browser_view_framework.py`; after `npm run build`:
  `npm test -- tests/invariants/test_content_identifiers.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`; the check in a real browser at 1× and 16×
  by `.claude/skills/loop2-play/SKILL.md`, with the screenshots and the console reading above.
- **Depends on:** Slice 3 · Slice 4 · F7 · F8 · F9 · F11 · F13 · F14 · F15 · F16 · F17 · F18 · F19

### Slice 6 — The styleguide says how the chronicle uses roles, font and shared controls

- **Goal:** through the project skill `the-way-maintain-styleguide`, whose table says that in a
  task cycle the cycle's author writes the styleguide's file as
  `.the-way/product-guidelines/styleguide/template.md` gives, each rule citing its decision,
  `guidelines/styleguide-browser-view.md` says how the chronicle uses the roles (`panel`,
  `text-label` for the minute, `discovery`, `player-change`, `danger`, `positive`, `text`,
  `text-secondary` for „Nic tu jeszcze nie ma.”), Geist Mono for the list, the tabs „Kronika” and
  „Teren” of the right area as a second place of the look of a tab, and the filter row in the look
  of the pace buttons — as the code of Slices 3 and 5 does it and the task and F7, F8, F9, F16 and
  F19 settle it. It writes no meaning the task did not settle; where F19 left D-276 as it stood,
  the styleguide is where the second place of tabs is recorded (spec, *Foundation entries*).
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:35-38` To do (items 8, 9 and 11) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:85-92` Questions to settle (Pytanie 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:333-355` D5. Readings of the task's wording this design writes down ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:407-427` D9. The right area: tabs, filters, list ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:563-567` Foundation entries (guideline changes) ·
  F7 · F8 · F9 · F16 · F19 ·
  the right-area component Slice 5 made and its rules in `src/browser/styles.css` ·
  `foundations/decisions.md:846-874` D-39, D-40 · `foundations/decisions.md:951-964` D-46 ·
  `foundations/decisions.md:2443-2464` D-130 · `foundations/decisions.md:5824-5860` D-276 (as F19 leaves it) ·
  `foundations/decisions.md:6690-6733` D-311 (as F16 leaves it) · `foundations/decisions.md:7171-7184` D-331 ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `src/browser/styles.css` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`;
  `npm test -- tests/invariants/test_browser_view_token_values.py` (the guideline's examples)
- **Depends on:** Slice 5 · F7 · F8 · F9 · F16 · F19

### Slice 7 — The coding guidelines' tables know the new files

- **Goal:** through the project skill `the-way-maintain-coding-guidelines`, whose table says that in
  a task cycle the cycle's author writes the files of the coding guidelines as
  `.the-way/product-guidelines/coding/template.md` gives, the table *Files of this kind* of
  `guidelines/coding-browser-module.md` has a row for each new file of `src/browser/view/` this
  change added (the chronicle memory, the composing of entries, the band's text function and the
  right-area component, under the names Slices 3 and 5 gave them), each with the status of the
  rows of its like — a pure module or a React screen part after the exemplar — and `—` as its
  decision; `guidelines/coding-simulation-module.md` gains a row only for a new file of
  `src/browser/sim/`, and where the change added none it stays as it is and the report says so.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:39-39` To do (item 12) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:429-467` D10. Units and their interfaces ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:563-567` Foundation entries (guideline changes) ·
  the new files Slices 1 to 5 added ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.the-way/product-guidelines/coding/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `guidelines/coding.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 3 · Slice 5

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the player reads in the right area a chronicle with game minutes — discoveries, actions, combat, changes of the program, losses of the streak with their cause — and filters it by kind | Slices 1–5 · F2 |
| To do 1 — chronicle of a manual map run, each entry with its minute; empty at a send and at „Restart”, gone with „Zakończ”; no earning loop; memory of the page, kept through Siedziba; the save keeps its shape and version 3; after a load only the paragraph | Slice 3 (memory, clearing, load), Slice 4 (game view owns and records), Slice 5 (game-view test; check after Siedziba and reload), Slice 2 (save tests stay) · F3 · F12 |
| To do 2 — one entry per minute of discoveries with the band's whole text | Slice 3 (band text function, discovery entry) · Slice 5 (role `discovery`) · F10 · F14 |
| To do 3 — the start of each action in the words of „Teraz”; the wait once at its start | Slice 3 · F4 |
| To do 4 — the loss of the streak above zero, its words, causes, streak before, `danger`; two entries at a change of the program | Slice 1 (event) · Slice 3 (entry and order) · F5 |
| To do 5 — every change of the copy, in `player-change`, its words; also after the end; none for another saved program | Slice 1 (loss at edit, discard, switch) · Slice 3 (comparison and texts) · Slice 4 (acts and hints) · F6 |
| To do 6 — the paragraph leaves the world area and stands as one entry in the minute of the attack, growing; only the last attack's | Slice 3 (place) · Slice 5 (drawn at its place; world area without it) · F15 · F16 · F17 · F18 |
| To do 7 — the sixth kind „Świat”: „Ognisko wygasło”, death and completion in the words of „Teraz”, completion in `positive` | Slice 2 (event) · Slice 3 (entries) · Slice 5 (filter, roles) · F9 |
| To do 8 — tabs „Kronika” and „Teren”, „Kronika” at the start; rule panel and „✕”; pick kept through the map run, Siedziba and „Restart” | Slice 3 (pick in memory) · Slice 5 · F11 · F16 · F19 |
| To do 9 — filter row, newest on top, minute column, Geist Mono on `panel`, colours by kind, „Nic tu jeszcze nie ma.” | Slice 5 · F7 · F8 |
| To do 10 — the foundation gets the entries of *Decisions in play* and of the accepted rows | F1–F19 |
| To do 11 — the styleguide, through `the-way-maintain-styleguide` | Slice 6 |
| To do 12 — the coding guidelines' tables, through `the-way-maintain-coding-guidelines` | Slice 7 |
| Acceptance criterion — check in a real browser at 1× and 16× with screenshots | Slice 5 (its last step) |
| Questions carried to cycle 1 — the cause of a loss and the description of a change | Slice 1 (events) · Slice 3 (comparison) · Slice 4 (acts) |
| Questions carried to cycle 2 — how the game knows a campfire went out | Slice 2 |
| Questions carried to cycle 3 — where the chronicle lives in the view | Slice 3 · Slice 4 |
| Questions carried to cycle 4 — the list fluid at 16× and in a long map run | Slice 3 (texts once, kinds apart) · Slice 5 (window, no redraw) |
| Row 1 | F3 · Slices 3, 4, 5 |
| Row 2 | F4 · Slice 3 |
| Row 3 | F5 · Slices 1, 3 |
| Row 4 | F6 · Slices 1, 3, 4 |
| Row 7 | F7 · Slices 5, 6 |
| Row 8 | F8 · Slices 3, 5, 6 |
| Row 9 | F9 · Slices 2, 3, 5, 6 |
| Row 10 | F10 · Slice 3 |
| Row 14 | F11 · Slices 3, 5 |
| Projected: (new) „What does the chronicle of a map run hold?” | F2 · Slices 1–5 |
| Projected: D-04, the clause for the chronicle | F12 · Slices 3, 4 |
| Projected: (new) „How does an agent learn what went wrong in the running game?” | F13 · Slice 5 (the chronicle an agent reads as a player does) |
| Projected: `chronicle` | F1 |
| Projected: D-122, this task's part | F14 · Slice 3 |
| Projected: D-147, transitional wording | F15 · Slices 3, 5 |
| Projected: D-311, transitional wording | F16 · Slice 5 |
| Spec, to check: D-185, D-272, D-276 | F17 · F18 · F19 (Slice 6 where F19 leaves D-276) |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The two events of the simulation as two slices, the loss of the streak first, the campfire second (both change `run.ts`, so ordered) | one slice for both events | a reviewer judges two small slices; nothing to undo |
| The composing of entries and the memory made and tested (Slice 3) before the game view records into them (Slice 4) and before the screen draws them (Slice 5) | the memory and the game view's recording in one slice | one slice would change more than ten files; with the split, Slice 4 is judged on the game view and the hint alone |
| The chronicle memory and the composing of entries as two modules, `chronicle.ts` and `chronicle-entries.ts` | one module | a name or a split the maker finds worse is a small mismatch reported in one line |
| The band's text function in a new pure module `discovery-band-text.ts`, used by `discovery-band.tsx` | adding it to `status-row.ts` beside `discoveryText`, a module the table marks `do not copy` | one more row in the coding table |
| The hint tests in the existing `tests/view/rule-editor.test.mjs` (the three move sites) and `tests/view/program-panel.test.mjs` (the hint reaching `editCopy`) | a new test file for the hint | none beyond longer existing files |
| The paragraph leaves the world area in the same slice that draws it in the chronicle (Slice 5) | its removal in Slice 3 or a slice of its own | a build between slices would show the paragraph nowhere, or twice |
| The right area as a new React component `right-area.tsx`, which `run-screen.tsx` renders in place of `TileTable` | the tabs and the list written inside `run-screen.tsx` | `run-screen.tsx` grows; a reviewer reads the right area apart from the screen |
| The game-view test in a new file `tests/view/chronicle-game.test.mjs`, set up as `tests/view/end-question.test.mjs` sets up the game view | cases added to `tests/view/account-screen.test.mjs` (6031 lines) | a second setup of the game view among the tests |
| The check in a real browser at 1× and 16× is the last step of Slice 5, the last code slice, which the own-work check of a changed user interface asks for anyway | a slice of its own after the code | a long slice; where the check finds a fault of an earlier slice, Slice 5 stops and reports it |
| The guideline changes as two slices after the code, the styleguide first; each slice's author writes its file as the named skill's table and template give for a task cycle | the guideline changes inside the code slices; the skills' refinement steps with a human | where the orchestrator reads the task's „zmiany idą przez …” as asking for the refinement steps, both slices go back to it |
| `guidelines/coding-simulation-module.md` gains a row only for a new file of the simulation; the plan adds none, so it is expected to stay as it is | a row for each changed file | none: the table lists files of a kind, not changed files |
| Existing test files that compare whole event lists are named in *Change* where the plan found them likely to fail (`copy-actions` for the switch; `body`, `discovery`, `death` for deaths; `world`, `encounters`, `completion` for campfires); another one the focused runs show is a small mismatch | running every test file to list them exactly before the plan | a slice changes a file its *Change* did not name, reported in one line |
