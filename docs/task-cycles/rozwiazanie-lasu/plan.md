# Plan — Przewijać czas ręcznego przejścia i rozwiązywać Las passą 480 minut bez uszczerbku od zimna i głodu i bez zmiany programu

- Task: `.runs/task-cycles/rozwiazanie-lasu/task.md`
- Spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md`
- Base: `c0c51a0` (task branch `task/rozwiazanie-lasu`, on `main` at `6540e4c`)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-21, new answer | decision, changed | *Settlements to record* row 1; spec *Foundation entries* | Slices 1, 2 |
| The chosen pace stays until the player changes it; a new game starts at 1× | decision, new | row 2 | Slices 1, 2 |
| Five buttons „1×”–„16×” beside „Pauza”, the chosen one a button selected in its group | decision, new | row 3 | Slice 2 |
| `player-map-run-pace`, new wording; check: `tests/invariants/test_player_map_run_pace.py` | invariant, changed | row 4 | Slices 1, 5 |
| D-71, a sentence added (streak after the body step; completion at the place of the pick) | decision, changed | row 5 | Slices 3, 5 |
| Of the edits of the program, an edit after which it differs sets the streak to zero | decision, new | row 6 | Slice 4 |
| The completion screen; D-62, a sentence added (pace buttons gone with „Pauza” after death) | decision, new · D-62 changed | row 7 | Slices 2, 5, 6 |
| `map run restart`, new wording (also after a completion) | glossary term, changed | row 8 | Slice 5 |
| The status row shows the streak; the headquarters shows the map's condition sentence | decision, new | row 9 | Slice 6 |
| „Mapa: {mapa} · rozwiązana” in `positive` from the first completion | decision, new | row 10 | Slice 6 |
| The game does not show a map run's longest streak today | decision, new | row 11 | Slices 3, 6 (they add none) |
| D-122, new wording (a completion in the minute of a discovery replaces the pause) | decision, changed | row 12 | Slices 5, 6 |
| `minute-span-split`, new wording (up to the end of the map run); check: `tests/invariants/test_minute_span_split.py` | invariant, changed | row 13 | Slices 3, 5 |
| D-93, the sentence of the ends of a map run gains the completion | decision, changed | row 14 | Slice 5 |
| `completion` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 5, 6 |
| `solved map` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 5, 6 |
| `streak` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 3, 4, 6 |
| `manual map run` | glossary term, new | projected entry the task's code makes true whole (WAY-126); spec | Slices 1, 2 |
| `streak-program-change` — the part on a change of the program rules or rule groups; check: `tests/invariants/test_streak_program_change.py` | invariant, new (projected `streak-program-change/1`, part) | projected entry assigned to this task; spec | Slice 4 |
| Part `simulation`: *Files* gains `tests/invariants/test_streak_program_change.py` | part map, changed | follows from the invariant's new check file | Slice 4 |

Not written by this change, though its code makes part of them true: "(new) — How is a map solved,
and what opens the next one?" (task 8 writes it) and "(new) — How fast does the earning loop go?"
(task 18 writes it), as the task's *Decisions in play* assigns them.

## Slices

### Slice 1 — pace in the simulation

- **Goal:** The game state holds the pace the player picked, 1 in a new game, and a new exported
  simulation function `setPace(state, pace)` sets it and nothing else — not the pause, not the
  discovery held, not the carried real time — with or without a map run, and throws on a pace
  outside the list of paces in the data. That list, 1, 2, 4, 8 and 16, stands in
  `src/browser/sim/data/balance.ts` beside `gameMinutesPerRealSecond`, which stays 1.
  `send`, `restart`, `end` and `setPaused` leave the pace as it is. `passRealTime` multiplies the
  real milliseconds by `gameMinutesPerRealSecond` and by the pace; `realMsCarry` keeps scaled
  milliseconds at the pace in force when they were passed, a change of pace leaves it, and it is
  set to zero at death and at a discovery as today (spec decision 2). The tests read the new
  wording of `player-map-run-pace` except its words on a completion ("unless it ended in it"),
  which Slice 5 adds with the completion.
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/game.ts` · `tests/sim/time.test.mjs` · `tests/sim/flow.test.mjs` ·
  `tests/sim/data.test.mjs` · `tests/invariants/test_player_map_run_pace.py`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:16-17` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:30-38` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:63-65` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:106-106` Questions carried to cycle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-173` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:185-189` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:84-137` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:422-438` D-21, with
  Foundation entries row 1 · Foundation entries row 2 (the pace stays) ·
  `foundations/invariants.md:198-210` player-map-run-pace, with Foundation entries row 4 ·
  `foundations/decisions.md:1990-2012` D-118 · `foundations/decisions.md:2094-2116` D-122 ·
  `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:212-232` simulation-isolation, simulation-inputs ·
  `foundations/decisions.md:1430-1441` D-80 · `foundations/decisions.md:1456-1467` D-82 ·
  `foundations/decisions.md:1482-1493` D-84 · `foundations/glossary.md:12-23` game minute, map run ·
  Foundation entries row manual map run · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/time.test.mjs` in which real time passed at
  16× moves the map run on by one game minute for each whole 62.5 ms; then
  `npm test -- tests/sim/time.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/invariants/test_player_map_run_pace.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py`
- **Depends on:** Foundation entries rows 1, 2, 4 · `manual map run`

### Slice 2 — pace buttons in the status row

- **Goal:** The status row shows, beside „Pauza”, five pace buttons built once from the list of
  paces in the data, each labelled as the number followed by „×”, each the shared button whose
  selected state follows `state.pace` through `setButtonSelected`. They stay visible and active
  while paused, the pause at a discovery included, and are hidden together with „Pauza” after the
  character's death. `StatusRowControls` gains `setPace(pace)`; the game view turns it into
  `clock.flush()` and then the simulation's `setPace`, so real time elapsed before the click is
  passed at the old pace. „Restart” and „Zakończ” stay as they are. No new token, role or shared
  control, so the styleguide and the kitchen-sink page are unchanged.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/game-view.ts` ·
  `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:16-17` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:21-21` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:33-38` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:60-65` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-172` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:176-176` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:84-114` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:268-279` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-351` Left to the maker ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:370-371` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:422-438` D-21, with
  Foundation entries row 1 · Foundation entries row 2 (the pace stays) · Foundation entries row 3
  (five buttons) · `foundations/decisions.md:1172-1185` D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:2094-2116` D-122 · `foundations/decisions.md:735-748` D-36 ·
  `foundations/decisions.md:795-808` D-40 · `foundations/decisions.md:855-868` D-44 ·
  `foundations/decisions.md:1363-1374` D-75 · `foundations/decisions.md:1534-1545` D-88 ·
  Foundation entries row manual map run · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/view/controls/button.ts` · `src/browser/view/clock.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/view/status-row.test.mjs` in which the row built on
  the hand-made document shows five pace buttons with the one of the state's pace selected; then
  `npm test -- tests/view/status-row.test.mjs` · `npm test -- tests/view/clock.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 1 · Foundation entries rows 1, 2, 3, 7

### Slice 3 — the streak counted in each game minute

- **Goal:** Each row of `MAPS` gains `solving`, an object of named requirements of which Las holds
  one, `streak: 480`; `solvingText`, the condition sentence without the map's name, for Las
  „480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”; and `completionText`, for
  Las „Las rozwiązany” (spec decisions 3 and 4). `bodyMinute` also reports whether the character
  lost health to cold or hunger in that minute — chilled or starving after its step. `MapRun`
  gains `streak`, 0 when a map run starts, by send and by restart; in each game minute, after the
  body step, it grows by one where the body step reports no loss and becomes 0 where it reports
  one, in the branch of death too, so a map run ended in death holds 0. Nothing ends a map run at
  the condition yet (Slice 5), and no longest streak is kept (row 11). A data test checks that each
  map's `solving` holds at least one requirement, each a whole number above zero, and Las's three
  values against the task.
- **Change:** `src/browser/sim/data/maps.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `tests/sim/data.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/streak.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:18-19` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:20-20` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:23-23` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:39-50` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:89-90` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:97-98` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:174-174` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:180-180` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:182-182` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:139-193` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:195-210` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:245-266` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:356-373` D-18 · `foundations/decisions.md:440-464` D-22 ·
  `foundations/decisions.md:502-526` D-24 · `foundations/decisions.md:1142-1170` D-60, D-61 ·
  `foundations/decisions.md:1307-1320` D-71, with Foundation entries row 5 · Foundation entries
  row 11 (no longest streak) · `foundations/invariants.md:526-534` minute-span-split, with
  Foundation entries row 13 · `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:212-244` simulation-isolation, simulation-inputs, content-identifiers ·
  `foundations/decisions.md:1430-1441` D-80 · `foundations/decisions.md:1456-1467` D-82 ·
  `foundations/decisions.md:1482-1493` D-84 · `foundations/glossary.md:12-23` game minute, map run ·
  Foundation entries row streak · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/understanding.ts:143-175` · `src/browser/sim/data/balance.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/streak.test.mjs` in which ten game minutes
  with no loss to cold or hunger give a streak of 10 and a minute of loss sets it to 0; then
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/body.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/acceptance.test.mjs` ·
  `npm test -- tests/sim/purity.test.mjs` · `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py`
- **Depends on:** Slice 1 · Foundation entries rows 5, 11, 13 · `streak`

### Slice 4 — an edit that changes the program zeroes the streak

- **Goal:** `setProgram` compares the checked program with the program the state holds; where they
  differ — deep inequality of the groups in order with their identities, names and conditions, the
  rules of each in order with their identities, conditions and actions, and the identity counters
  — and the state holds a map run not ended in death, the run's streak becomes 0, paused or not.
  „↑” on the first rule and any edit that hands back the same program leave the streak; swapping
  two rules of the same content zeroes it; a map run ended in death keeps its streak; the rule the
  game writes at the first chill (D-123) does not go through `setProgram` and does not zero it.
  The trip plan does not exist yet, and the switch to another program is task 12's. A new
  invariant test `tests/invariants/test_streak_program_change.py`, marked
  `invariant: streak-program-change` as the other invariant tests are, drives the built simulation
  through its public functions like `test_action_in_progress.py`, and covers each kind of edit of
  row 6 that changes the program (add, delete, reorder a rule, change its condition or action,
  change a group) during a map run and in a pause, with a control that an identical edit leaves the
  streak, so the check can fail.
- **Change:** `src/browser/sim/game.ts` · `tests/invariants/test_streak_program_change.py` ·
  `foundations/part_map.md` (orchestrator's addition after the *Foundation entries* stage: the part
  `simulation`'s *Files* gains `tests/invariants/test_streak_program_change.py` in the same commit
  as the test, through the project skill `the-way-update-part-map`, since `foundation_check.py`
  refuses a pattern that matches no tracked file)
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:19-19` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:51-53` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:83-84` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:91-91` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:157-159` Decisions in play ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:175-175` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:188-188` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:233-243` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:355-369` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:401-420` D-20 ·
  `foundations/invariants.md:187-196` action-in-progress · `foundations/decisions.md:1560-1577` D-90 ·
  `foundations/decisions.md:1619-1648` D-93 · `foundations/decisions.md:2118-2139` D-123 ·
  Foundation entries row 6 (an edit that changes the program zeroes the streak) · Foundation
  entries row streak-program-change · Foundation entries row of the part simulation ·
  `foundations/invariants.md:224-232` simulation-inputs · `foundations/decisions.md:1482-1493` D-84 ·
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:53-63` program rule, rule group ·
  Foundation entries row streak · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/testing.md` · `src/browser/sim/types.ts` · `src/browser/sim/run.ts:304-403` ·
  `tests/invariants/test_action_in_progress.py` · `tests/invariants/program_fixture.py` ·
  `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing `tests/invariants/test_streak_program_change.py`; then
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/sim/program-counts.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 3 · Foundation entries row 6 · `streak-program-change` · part `simulation`

### Slice 5 — a completion ends the map run and solves its map

- **Goal:** `MapRun` gains `completion`, null until the map run completes and then an object
  holding the game minute of the completion, beside `death`. One exported predicate of the
  simulation says a map run has ended — it has a death or a completion — and every place of the
  simulation that reads `run.death` to mean "ended" uses it: `passRealTime`, `advanceMinutes`,
  `minuteBeforePick` and the guard of the zeroing in `setProgram`; places that need the death
  itself keep reading `death`. A function of `run.ts` beside `minuteBeforePick` and `pickActivity`
  takes the run and its map's data and says whether the run meets every requirement of the map's
  `solving`; in the minute loop of `advanceMinutes`, after `minuteBeforePick` and after that
  minute's discovery has taken hold, a run that meets it gains its completion, the event
  `{ kind: "mapRunCompleted", minute }` follows the minute's other events, no program rule is
  picked whether or not the minute is free, and the loop stops. `GameState` gains `solvedMaps`, `[]`
  in a new game, the identifiers of the maps solved in the order of their first completion, each
  once; the minute of a completion adds the run's map where it is not there yet, and nothing
  removes it. Where the minute of the completion is also a discovery's, the state holds the
  discovery and is not paused. `passRealTime` does nothing on an ended map run and sets the carry to
  zero where its span ends in a completion. „Restart” after a completion keeps the seed and starts
  with a streak of 0 and no completion; the counts of the rules stay after a completion until the
  next send or restart. The doc comments of `restart`, `end` and `passRealTime` name the
  completion beside death. The tests of `player-map-run-pace` and `minute-span-split` read their
  new wordings; no scenario of `tests/sim/acceptance.test.mjs` or of `test_minute_span_split.py`
  completes today (on the current build the ALIVE program first loses health in game minute 84 and
  ends minute 480 with a streak of 26, and DIES_BUSY dies in minute 347), so the completion cases
  start from explicit state, such as a map run whose streak stands at 479.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` ·
  `tests/sim/completion.test.mjs` · `tests/invariants/test_player_map_run_pace.py` ·
  `tests/invariants/test_minute_span_split.py`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:19-22` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:42-50` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:66-71` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:75-77` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:105-106` Questions carried to cycle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-190` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:45-80` Constraints ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:116-137` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:195-266` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:401-420` D-20 · `foundations/decisions.md:440-464` D-22 ·
  `foundations/decisions.md:1157-1185` D-61, D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:1307-1320` D-71, with Foundation entries row 5 ·
  `foundations/decisions.md:1619-1648` D-93, with Foundation entries row 14 ·
  `foundations/decisions.md:1990-2012` D-118 · `foundations/decisions.md:2094-2116` D-122, with
  Foundation entries row 12 · `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:187-210` action-in-progress, player-map-run-pace, with Foundation
  entries row 4 · `foundations/invariants.md:224-232` simulation-inputs ·
  `foundations/invariants.md:246-260` program-rule-pick · `foundations/invariants.md:307-315`
  restart-seed · `foundations/invariants.md:526-534` minute-span-split, with Foundation entries
  row 13 · `foundations/glossary.md:18-23` map run · `foundations/glossary.md:65-78` map run
  restart, free game minute, with Foundation entries row 8 · Foundation entries rows completion,
  solved map, streak · `foundations/decisions.md:1430-1441` D-80 ·
  `foundations/decisions.md:1456-1467` D-82 · `foundations/decisions.md:1482-1493` D-84 ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/understanding.ts:143-293` ·
  `tests/sim/discovery.test.mjs:577-683` · `tests/sim/program-counts.test.mjs:91-131` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/completion.test.mjs` in which a map run whose
  streak stands at 479 completes at the end of the next game minute without a loss, with the rest
  of that minute taken effect and no program rule picked; then
  `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/sim/time.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/program-counts.test.mjs` ·
  `npm test -- tests/sim/flow.test.mjs` · `npm test -- tests/sim/streak.test.mjs` ·
  `npm test -- tests/sim/acceptance.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_player_map_run_pace.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slices 1, 3, 4 · Foundation entries rows 4, 5, 7, 8, 12, 13, 14 · `completion` ·
  `solved map`

### Slice 6 — the screens of the streak, the completion and the solved map

- **Goal:** During a map run that has not ended the status text reads
  „Minuta {minute} · {activity} · Passa {streak}/{streak requirement of the map}”, with
  „ (pauza)” at its end while paused; after death it reads as today; after a completion it reads
  „Minuta {minute of completion} · {completionText of the map}” and the text element carries the
  role `positive` then and only then. The pause button and the pace buttons are hidden once the map
  run has ended, in death or in a completion, through the simulation's predicate of an ended map
  run; the line of a discovery held at a completion stands under the completion's status row
  until „Restart” or „Zakończ”, as the game state gives it. In the headquarters, in each
  character's row where the map is named, „Mapa: {name}” becomes „Mapa: {name} · rozwiązana” in
  `positive` once `solvedMaps` lists the map, and the condition sentence „{name} — {solvingText}”
  stands with it, solved or not; the headquarters re-renders that part when `solvedMaps` changes.
  Every name and text of a map comes from its data. `styles.css` gains rules giving the status
  text and the solved mark the colour `var(--positive)` where the module marks them; no new token,
  role or shared control.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/headquarters.ts` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/headquarters.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:20-23` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:39-47` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:69-74` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:97-98` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:176-181` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:171-193` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:268-293` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-352` Left to the maker ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:370-371` Left to the maker ·
  `foundations/decisions.md:356-373` D-18 · `foundations/invariants.md:234-244`
  content-identifiers · `foundations/decisions.md:735-748` D-36 · `foundations/decisions.md:780-793`
  D-39 · `foundations/decisions.md:855-868` D-44 · `foundations/decisions.md:1009-1029` D-53 ·
  `foundations/decisions.md:1172-1185` D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:2094-2116` D-122, with Foundation entries row 12 · Foundation entries
  rows 9 (streak and condition shown) and 10 (solved mark) · `foundations/glossary.md:87-92`
  headquarters · Foundation entries rows completion, solved map, streak ·
  `foundations/decisions.md:1363-1374` D-75 · `foundations/decisions.md:1534-1545` D-88 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/sim/types.ts` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/game.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/view/controls/button.ts` · `src/browser/tokens.css:27-31`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/view/status-row.test.mjs` in which a running map
  run on Las with a streak of 120 reads „Minuta 312 · Eksploruje · Passa 120/480”; then
  `npm test -- tests/view/status-row.test.mjs` · `npm test -- tests/view/headquarters.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slices 2, 5 · Foundation entries rows 7, 9, 10, 12 · `completion` · `solved map`

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: a manual map run fast-forwarded; Las solvable by a streak of 480 | Slices 1–6 |
| To do 1 — five pace buttons beside „Pauza”, the chosen one selected; one game minute per real second times the pace; pause stays; a pace picked in a pause leaves it paused | Slice 1 (simulation), Slice 2 (buttons); rows 1, 3 |
| To do 2 — the pace survives pause, discovery stop, „Restart”, „Zakończ”, the next send; new game at 1× | Slice 1; row 2 |
| To do 3 — Las's data row holds the solving condition and its sentence | Slice 3 |
| To do 4 — the streak grows after the body step, a loss zeroes it, a differing edit zeroes it on every map, also paused, an identical edit leaves it, no action interrupted, each map run starts at 0 | Slice 3 (counting, start at 0), Slice 4 (edits); rows 5, 6; `streak-program-change` |
| To do 5 — completion at 480: rest of the minute, completion at the pick, screen stays, „Minuta 480 · Las rozwiązany” in `positive`, „Pauza” and pace buttons gone, „Restart” and „Zakończ” stay, counts stay, discovery line on the completion screen | Slice 5 (simulation), Slice 6 (screen); rows 5, 7, 12, 14 |
| To do 6 — after death the pace buttons go with „Pauza”, „Restart” at the chosen pace, rest as today | Slice 2 (hidden at death), Slice 1 (pace kept by restart); row 7 |
| To do 7 — the first completion makes the map solved for good; „Mapa: Las · rozwiązana” in `positive` | Slice 5 (`solvedMaps`), Slice 6 (headquarters); row 10 |
| To do 8 — „Minuta 312 · Eksploruje · Passa 120/480”, „ (pauza)” at the end; the condition sentence in the headquarters | Slice 6; row 9 |
| Settlements rows 1–14 | Foundation entries rows 1–14; the slices named in their rows |
| Projected `streak-program-change/1`, part on edits | Foundation entries; Slice 4 |
| Projected `manual map run` | Foundation entries; Slices 1, 2 |
| Glossary `completion`, `solved map`, `streak` | Foundation entries; Slices 3–6 |
| Questions carried to cycle 1–5 | Settled by the spec's decisions 1–5; Slices 1, 3, 5, 6 |
| Hand check of the pace buttons, the completion screen and the headquarters texts (D-75, D-88; spec *Left to the maker*) | The whole change, after Slice 6 — not a slice's check |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Six slices: pace in the simulation, then its buttons; then streak, edit zeroing, completion in the simulation, then their screens | Two slices, one per half of the task — each would join the simulation, the view and two invariant tests, which a reviewer cannot judge alone | More handoffs; each slice stays small |
| The invariant `streak-program-change` is checked by a new `tests/invariants/test_streak_program_change.py`, and the part map's `simulation` lists it, as every simulation invariant of this product is checked there | A unit test in `tests/sim/` carrying the comment `invariant: streak-program-change`, needing no part-map change but standing apart from the product's convention | A test moved and one line of the part map |
| New simulation cases go in new files `tests/sim/streak.test.mjs` and `tests/sim/completion.test.mjs` | Spreading them over `time.test.mjs`, `flow.test.mjs` and `program-counts.test.mjs` | Cases moved between test files |
| All three new fields of the map's row are written in Slice 3, though `completionText` is first read in Slice 6 | Adding `completionText` in Slice 6 — a data file in a view slice | None in behaviour |
| The predicate of an ended map run comes with the completion in Slice 5; Slice 4's guard reads `death` until Slice 5 switches it | A predicate made in Slice 3 or 4 that holds only death | One line |
| The status row and the pause button switch to the predicate in Slice 6, so between Slices 5 and 6 a completed run still shows „Pauza” | Touching the view in Slice 5 | None after Slice 6; nothing merges between slices |
| `acceptance.test.mjs` and the scenarios of `test_minute_span_split.py` keep their expectations; completion cases start from explicit state | Searching for a seed and program that keep the mage free of loss for 480 minutes | A missed completion in an existing scenario would show as a failing check of Slice 5 |
| `test_simulation_inputs.py` is not changed for `setPace` and the predicate: it already calls every export its table does not name | Adding them to its table with chosen inputs | A weaker probe of two small functions |
