# Plan — Utrzymać maga przy życiu w Lesie: spadające ciepło, sytość i zdrowie, zbieranie do plecaka, ognisko i jedzenie

- Task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`
- Spec: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`
- Base: a945cf1d4c62e8cdac222a7de47277c08a77b2c5

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — body temperature in °C with tenths | decision (new) | *Settlements to record*, row 1 | Slices 3, 4, 9, 11 |
| F2 — cooling by the map's ambient temperature, which stands in the map's data | decision (new) | *Settlements to record*, row 2 | Slices 3, 4 |
| F3 — warming capped at the starting temperature, eating at the starting satiety | decision (new) | *Settlements to record*, row 3 | Slices 3, 4, 6, 8 |
| F4 — health lost per minute of chill and per minute of hunger, regained otherwise up to full | decision (new) | *Settlements to record*, row 4 | Slices 3, 4 |
| F5 — death in the minute health reaches zero, also during an action, with its cause | decision (new) | *Settlements to record*, row 5 | Slices 4, 11 |
| F6 — the screen after death: state of the death minute, time stopped, „Restart” and „Zakończ” | decision (new) | *Settlements to record*, row 6 | Slices 4, 11 |
| F7 — `map run restart` also in place of a map run ended in death still on the screen | glossary term (changed) | *Settlements to record*, row 7 | Slices 4, 11 |
| F8 — „Zapal” an ordinary action paid with sticks until task 9 | decision (new) | *Settlements to record*, row 8 | Slice 8 |
| F9 — the backpack's cap counts all pieces together, its height the character's carrying capacity | decision (new) | *Settlements to record*, row 9 | Slices 3, 5, 7, 11 |
| F10 — gathering not feasible with a full backpack | decision (new) | *Settlements to record*, row 10 | Slice 7 |
| F11 — a missed gathering leaves the tile's stock and gives no piece | decision (new) | *Settlements to record*, row 11 | Slice 7 |
| F12 — renewal by one piece per renewal time, up to the starting stock | decision (new) | *Settlements to record*, row 12 | Slice 6 |
| F13 — an extinguished campfire stays on its tile and can be lit again | decision (new) | *Settlements to record*, row 13 | Slices 6, 8 |
| F14 — each feeding adds its minutes of burning to those left, without a cap | decision (new) | *Settlements to record*, row 14 | Slice 8 |
| F15 — the campfire's icon on the drawing, its state in the tile's row of the list of revealed tiles | decision (new) | *Settlements to record*, row 15 | Slices 10, 12 |
| F16 — D-25 gains: gathering takes only from a revealed tile, as much as lies on it | decision (changed D-25) | projected entry "How does a character move?" (plan item, task *Decisions in play*) | Slice 7 |
| F17 — D-26 gains: a tile holds at most one campfire, which warms only that tile | decision (changed D-26) | projected entry "How does a program point at things of the world?" (plan item, task *Decisions in play*) | Slices 6, 8, 9 |
| F18 — the order in which a game minute of a map run takes effect | decision (new) | spec, *Foundation entries*, first item; Decision 1 | Slices 4, 6, 7, 8, 13 |
| F19 — invariant `minute-span-split`; check: test `tests/invariants/test_minute_span_split.py`, written in Slice 13 | invariant (new) | spec, *Foundation entries*, second item | Slice 13 |
| F20 — crafting a campfire and lighting a stick are carried out on a revealed tile, as gathering is | decision (new) | spec, Decision 4 and *Foundation entries* (cycle Q-10) | Slices 8, 12 |
| F21 — the title of the campfire icon as its page on game-icons.net gives it (in Slice 10) | environment fact (new) | spec, *Foundation entries*, environment fact | Slice 10 |
| F22 — `icon-credits` gains F21 in *Rests on* (in Slice 10) | invariant (changed) | spec, *Foundation entries*, environment fact | Slice 10 |
| F23 — `game-icons-licence` gains the campfire icon's author, only where that author is not Delapouite (in Slice 10) | environment fact (changed) | follows from F21: the licence fact names Delapouite alone today | Slice 10 |
| F24 — part `simulation` claims `tests/invariants/test_minute_span_split.py` (in Slice 13) | part map (changed) | spec, *Foundation entries*, part map | Slice 13 |

F1–F20 are written by the foundation step before Slice 1, each through the pinned skill of its
element. F21–F24 are written by the executor of the slice named in the entry, through the pinned
skill of its element, with the code that makes them true: the icon file and its author are not known
before Slice 10, and a part-map pattern naming a file git does not track yet fails
`foundation_check.py`. F19 stands before its test because F18's *Verification* names it.

Not written by this cycle (task, *Decisions in play*): the projected entries "How does a character
act by its program?" (task 5), "Where does the simulation's randomness come from?" (task 18), "What
is a map made of?" (task 8), "What describes a character?" and the term `trait` (task 10) — this
task's code makes their parts true without writing them. The spec's last item of *Foundation
entries* (`player-map-run-pace` and D-21, D-22's list of kinds of draw, a second example of D-23's
*Verification*) is the return step's to judge.

## Slices

### Slice 1 — tests reach no further than minute 240, group A

- **Goal:** Each test file below drives every map run it starts to game minute 240 at most, and still covers what its docstring says, the docstring updated wherever it names the old span. After Slice 4 every program of today's closed list dies on Las at game minute 243, by the task's numbers (*To do* 1–3): the body cools 0.024 °C a minute from 37.0 °C and is chilled from minute 84 (34.984 °C, below 35.0); satiety falls 0.6 a minute from 100 and the character starves from minute 117 (29.8, below 30); health stays 100 to minute 83, loses 0.35 a minute in minutes 84–116 (88.45 at minute 116) and 0.7 a minute from minute 117 (0.25 at minute 242), and reaches zero in minute 243. A map run ended in death passes no further minute, so a test that expects a later minute or more steps fails then. The test „the run never ends by itself: steps keep coming for hours” of `tests/sim/actions.test.mjs` keeps showing that steps keep coming without an end within 240 minutes, under a title that stays true once death exists. An invariant test changes only so that it keeps proving its invariant's sentence. No code of the simulation changes; every test passes on the base, as it will after Slice 4.
- **Change:** `tests/sim/time.test.mjs` · `tests/sim/actions.test.mjs` · `tests/invariants/test_map_run_repeatability.py` · `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_program_rule_pick.py` · `tests/invariants/test_exploring_reveal.py` · `tests/invariants/test_move_reach.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:94-117` Constraints (From the code at a945cf1) ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:166-176` simulation-randomness ·
  `foundations/invariants.md:234-245` program-rule-pick ·
  `foundations/invariants.md:246-256` exploring-reveal ·
  `foundations/invariants.md:257-267` move-reach ·
  `foundations/decisions.md:464-489` D-22 · `foundations/decisions.md:490-515` D-23 ·
  `foundations/decisions.md:542-563` D-25 ·
  `foundations/glossary.md:12-24` game minute, map run ·
  `foundations/glossary.md:59-71` map run restart, free game minute ·
  `guidelines/coding.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/time.test.mjs tests/sim/actions.test.mjs`; for each changed invariant test, `python -B -m unittest discover -s tests/invariants -p <file name>` (for instance `-p test_map_run_repeatability.py`); `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python files (`test_ruff_source_rules`) cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** none

### Slice 2 — tests reach no further than minute 240, group B

- **Goal:** Each test file below drives every map run it starts to game minute 240 at most, and still covers what its docstring says, the docstring updated wherever it names the old span. After Slice 4 every program of today's closed list dies on Las at game minute 243, by the task's numbers (*To do* 1–3): the body cools 0.024 °C a minute from 37.0 °C and is chilled from minute 84 (34.984 °C, below 35.0); satiety falls 0.6 a minute from 100 and the character starves from minute 117 (29.8, below 30); health stays 100 to minute 83, loses 0.35 a minute in minutes 84–116 (88.45 at minute 116) and 0.7 a minute from minute 117 (0.25 at minute 242), and reaches zero in minute 243. A map run ended in death passes no further minute, so a test that expects a later minute — such as the hour of real time `test_player_map_run_pace.py` passes at once, or minute 400 `test_simulation_isolation.py` asserts — fails then. An invariant test changes only so that it keeps proving its invariant's sentence. No code changes; every test passes on the base, as it will after Slice 4.
- **Change:** `tests/invariants/test_walk_target.py` · `tests/invariants/test_walk_feasibility.py` · `tests/invariants/test_map_run_layout.py` · `tests/invariants/test_simulation_inputs.py` · `tests/invariants/test_player_map_run_pace.py` · `tests/invariants/test_simulation_isolation.py` · `tests/invariants/test_terrain_drawing_numbers.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:94-117` Constraints (From the code at a945cf1) ·
  `foundations/invariants.md:188-221` player-map-run-pace, simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:268-278` walk-target ·
  `foundations/invariants.md:336-345` terrain-drawing-numbers ·
  `foundations/invariants.md:357-367` walk-feasibility ·
  `foundations/invariants.md:379-389` map-run-layout ·
  `foundations/decisions.md:399-424` D-19 · `foundations/decisions.md:446-463` D-21 ·
  `foundations/decisions.md:464-489` D-22 · `foundations/decisions.md:564-589` D-26 ·
  `foundations/glossary.md:12-24` game minute, map run ·
  `foundations/glossary.md:59-71` map run restart, free game minute ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** for each changed invariant test, `python -B -m unittest discover -s tests/invariants -p <file name>` (for instance `-p test_player_map_run_pace.py`). The Ruff check of the changed Python files (`test_ruff_source_rules`) cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** none

### Slice 3 — the change's numbers and names in the content data

- **Goal:** The data files of `src/browser/sim/data/` hold every number and name of the change other than those of the program's actions and conditions, which come with their kinds in Slices 7–9; nothing outside the tests reads them yet. They hold: Las's ambient temperature, 25 °C, as a number of the map's data (F2); the body's starting values, which are also its caps — temperature 37.0 °C, satiety 100, health 100 —, its cooling of 0.002 °C a minute for each degree the ambient temperature lies below 37.0 °C (none at 37.0 or above), satiety's fall of 0.6 a minute, the thresholds — chilled below 35.0 °C, starving below 30 —, health's loss of 0.35 a minute for being chilled and 0.35 for starving, and its regain of 0.05 a minute; the gathering chance, 0.7; the starting traits of a new character in `src/browser/sim/data/traits.ts` — one trait, carrying capacity, 15, the same for every new character and not on the archetype (spec Decision 2, *Data*); the items the backpack holds, in `src/browser/sim/data/items.ts` — the four resources of Las gathered as items (patyk, jagoda, mech, włókno) — with, per item, whether it is fuel and how many minutes of burning it adds (patyk 20), whether it is food and how much satiety it gives (jagoda 25), and whether it can be lit and how long and how warmly it burns (patyk 3 minutes, 0.15 °C a minute); the campfire, in `src/browser/sim/data/campfire.ts` — its name „ognisko”, the item and count crafting it uses (6 patyki), the item and count lighting it uses (2 patyki), its minutes of burning when lit (60) and its warmth (0.5 °C a minute). The shapes, types and field names are the maker's, typed as `resources.ts` (the exemplar, D-34) is; mech and włókno are items with no use (task *Context*). `tests/sim/data.test.mjs` shows the new numbers as the task gives them and that every item and the campfire's items name items of the data.
- **Change:** `src/browser/sim/data/maps.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `src/browser/sim/data/traits.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:66-87` Context ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:134-154` Settlements to record ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:245-290` Decision 2 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F2 · F3 · F4 · F9 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:516-541` D-24 · `foundations/decisions.md:709-723` D-34 ·
  `foundations/invariants.md:200-233` simulation-isolation, simulation-inputs, content-identifiers ·
  `foundations/invariants.md:279-290` map-run-tiles ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck`; `npm run build`; `node --test tests/sim/data.test.mjs tests/sim/rules.test.mjs tests/sim/layout.test.mjs`; `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py`; `python -B -m unittest discover -s tests/invariants -p test_map_run_tiles.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** F1 · F2 · F3 · F4 · F9

### Slice 4 — the body and death in the one-minute step

- **Goal:** In each game minute, inside the one-minute step `stepMinute` of `src/browser/sim/run.ts`, the character's body changes and death falls by steps 1 and 2 of spec Decision 1, from the numbers Slice 3 put in `src/browser/sim/data/balance.ts` and `src/browser/sim/data/maps.ts`: temperature changes by the warmth on the character's tile less the cooling of the map's ambient temperature, capped at 37.0 °C on the sum; satiety falls, not below 0; the character is chilled and starving by the values just computed; health falls for each, or rises where neither, not above 100; where health reaches 0 or less it stands at 0, the character dies in that minute — cause cold where chilled in that minute, otherwise hunger — and the step stops: the action in progress stays in the state as it stood, gives no `activityFinished` and no program rule is picked. The death — its minute and cause — stands in the map run's state and is given as an event. Nothing burns before Slice 6, so the warmth on the tile is 0 here; the body's computation takes it as an input, so that Slice 6 supplies it. The map run starts at 37.0 °C, satiety 100, health 100, and nothing of the body changes at minute 0. After each change temperature, satiety and health are rounded to six decimal places (*Decimal exactness*). `advanceMinutes` given a span that reaches death returns the state of the death minute and the events up to it; `advanceMinutes` and `passRealTime` given a map run ended in death change nothing; `restart` and `end` take such a map run as they take one in progress. The body's computation is a pure module of its own, `src/browser/sim/body.ts` (unit 2). `newMapRun` and `stepMinute` keep the arguments the tests call them with. Test first, in the new `tests/sim/body.test.mjs`: on Las a program of today's closed list dies in minute 243 of cold and is alive in minute 242, with values at named minutes worked out by hand from the task's numbers (34.984 °C at minute 84, satiety 29.8 at minute 117, health 88.45 at minute 116); a hand-made map run that is warm but hungry dies of hunger; a span split into calls gives the same state and events at every minute up to and including death; a map run ended in death passes no minute; a value the decimal arithmetic puts exactly on a threshold does not cross it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `tests/sim/body.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:85-86` Context (action-in-progress, map run) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:140-146` Settlements to record (rows 1–7) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:22-50` Goals and non-goals ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F2 · F3 · F4 · F5 · F6 · F7 · F18 · F19 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:425-515` D-20, D-21, D-22, D-23 ·
  `foundations/decisions.md:724-738` D-35 ·
  `foundations/invariants.md:155-245` map-run-repeatability to program-rule-pick ·
  `foundations/invariants.md:291-300` restart-seed ·
  `foundations/glossary.md:12-31` game minute, map run, program ·
  `foundations/glossary.md:53-71` program rule, map run restart, free game minute ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/maps.ts` · `src/browser/sim/program.ts` ·
  `tests/sim/actions.test.mjs` · `tests/sim/time.test.mjs`
- **Model:** same — the place of the body in the step, the stop at death across `run.ts` and `game.ts` and the decimal rounding are decisions of code the spec leaves to the maker.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/body.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_action_in_progress.py`, `test_player_map_run_pace.py`, `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_program_rule_pick.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_simulation_randomness.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · F1 · F2 · F3 · F4 · F5 · F18

### Slice 5 — carrying capacity and the backpack

- **Goal:** The map run's character holds its traits and its backpack: a type of the character's traits in `src/browser/sim/types.ts`, carrying capacity its one trait, held by the map run's character beside `archetypeId` and `at`; a backpack of pieces per item of `src/browser/sim/data/items.ts`, empty at the start of every map run. One function of the simulation, in the new module `src/browser/sim/character.ts`, gives the traits of a new character from `src/browser/sim/data/traits.ts` (both data files made in Slice 3); it is the one place a send makes traits now and task 11's character creation will make them. `send` makes the traits with it and passes them into the new map run; `restart` gives the new map run the traits of the character of the map run it replaces. The same module gives the count of pieces in a backpack, all items together, and the backpack's cap, the character's carrying capacity, for Slices 7–9 and 11. `newMapRun` and `stepMinute` keep the arguments the tests call them with: an argument they gain is optional, its absence meaning a new character's traits. Test first, in the new `tests/sim/traits.test.mjs`: a sent map run's character carries carrying capacity 15 and an empty backpack, cap 15; a restart of a map run whose character carries other traits keeps them; the count and the cap of a hand-made backpack.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/character.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `tests/sim/traits.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:59-61` Questions to settle (Q15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:75-80` Context (task 11, the chest) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:148-148` Settlements to record (row 9) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:245-290` Decision 2 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F9 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:464-489` D-22 · `foundations/decisions.md:724-738` D-35 ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:200-221` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:291-300` restart-seed ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:59-65` map run restart ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/data/archetypes.ts` · `tests/sim/actions.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/traits.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 3 · Slice 4 · F9

### Slice 6 — what burns, its warmth and renewal

- **Goal:** The map run holds its campfires — at most one on a tile, each either burning with its minutes of burning left or extinguished — and its burning sticks, each on its tile with its minutes left; a map run starts with none. Inside the one-minute step, in the order of spec Decision 1 around the body and death of Slice 4: in step 1 the warmth on the character's tile is that of each campfire burning there and each stick burning there that had minutes left at the end of the previous minute, with the warmths of `src/browser/sim/data/campfire.ts` and `src/browser/sim/data/items.ts` (Slice 3), and the cap of 37.0 °C applies to the sum; in step 3 each burning campfire and stick loses a minute, a campfire at 0 minutes is extinguished and stays on its tile, a stick at 0 minutes is gone; in step 4, at each minute that is a whole multiple of a resource's renewal time on the map, counted from minute 0, every tile holding that resource with fewer pieces than the map's stock per tile gains one piece — a tile at 0 pieces keeps the key of its resource (`map-run-layout`). What burns and renewal are a pure module of their own, `src/browser/sim/world.ts` (unit 3). No action makes a campfire or a burning stick before Slice 8, so the tests drive `stepMinute` from hand-made map runs. Test first, in the new `tests/sim/world.test.mjs`: a campfire with 60 minutes on the character's tile warms in exactly 60 minutes, then is extinguished and stays; a character at a burning campfire stays at 37.0 °C; a stick lit with 3 minutes warms in 3 minutes and is gone; a campfire on another tile does not warm; a tile below its stock of sticks gains one piece at minute 30 and none above its stock; a tile at 0 keeps its resource.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/world.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` · `tests/sim/world.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:84-84` Context (a tile's stock and map-run-layout) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:142-142` Settlements to record (row 3) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:151-152` Settlements to record (rows 12, 13) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F3 · F12 · F13 · F17 · F18 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:516-541` D-24 · `foundations/decisions.md:564-589` D-26 ·
  `foundations/decisions.md:724-738` D-35 ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:200-221` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:279-290` map-run-tiles · `foundations/invariants.md:379-389` map-run-layout ·
  `foundations/glossary.md:12-17` game minute ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/hex.ts` · `src/browser/sim/data/maps.ts` · `tests/sim/actions.test.mjs`
- **Model:** same — the shape of campfires and burning sticks in the state is a choice of the maker that Slices 8, 9 and 12 build on.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/world.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_map_run_layout.py`, `test_map_run_tiles.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · F3 · F12 · F13 · F17 · F18

### Slice 7 — gathering

- **Goal:** The closed list of actions gains „Zbierz — <zasób mapy>”, an action that takes a resource of the run's map, as „Idź” does, with its label, status text and 10 minutes in `src/browser/sim/data/actions.ts`. It can be carried out only on a revealed tile the character stands on that holds at least one piece of that resource now, with a backpack not full — its count of pieces below the character's carrying capacity (Slice 5) —; `actionFeasible` never draws. At the end of the action (spec Decision 1, step 5) it draws once from a new gathering generator — a new stream of `src/browser/sim/random.ts` with its own constant, seeded from the map run's seed and kept in the map run's state as the wander stream's state is, so a restart starts it anew —; a hit, with the chance in `src/browser/sim/data/balance.ts` (Slice 3), moves one piece from the tile into the backpack as the item of that resource (`src/browser/sim/data/items.ts`); a miss changes neither. A tile gathered to 0 pieces keeps the key of its resource. `checkAction` in `src/browser/sim/game.ts` takes the new kind with its resource as it takes „Idź”. The program editor offers the new kind with its resource select, as it offers „Idź”. The status text is the maker's, written after the existing actions' texts and named in the report. `tests/invariants/test_program_closed_lists.py` lists the new kind among the kinds the data gives, and its made-up unlisted kinds stay unlisted (it lists `gather` among them today). Test first, in the new `tests/sim/gather.test.mjs`: not feasible on a tile not revealed, on a tile without the resource or with 0 of it, and with a full backpack; a hit takes one piece and a miss takes none, by the gathering generator's draws worked out apart from the code; 0 pieces left keep the key; the wander stream gives the same draws with and without gathering.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/random.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/gather.test.mjs` · `tests/invariants/test_program_closed_lists.py` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:41-49` Questions to settle (Q7–Q9) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:148-150` Settlements to record (rows 9–11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F9 · F10 · F11 · F16 · F18 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:464-589` D-22 to D-26 ·
  `foundations/decisions.md:724-753` D-35, D-36 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:155-176` map-run-repeatability, simulation-randomness ·
  `foundations/invariants.md:222-245` content-identifiers, program-rule-pick ·
  `foundations/invariants.md:291-300` restart-seed ·
  `foundations/invariants.md:346-389` program-closed-lists to map-run-layout ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/hex.ts` · `src/browser/view/status-row.ts` · `tests/sim/actions.test.mjs`
- **Model:** same — a new generator stream, an action taking a target and the editor's offer of it are decisions of code across the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/gather.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_simulation_randomness.py`, `test_map_run_repeatability.py`, `test_map_run_layout.py`, `test_restart_seed.py`, `test_program_world_reference.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 5 · Slice 6 · F9 · F10 · F11 · F16 · F18

### Slice 8 — the campfire, the burning stick and eating

- **Goal:** The closed list of actions gains, each with its label, status text and minutes in `src/browser/sim/data/actions.ts`, its feasibility in `src/browser/sim/program.ts`, its duration and its effect at its end in `src/browser/sim/run.ts` (spec Decision 1, step 5), its check in `src/browser/sim/game.ts` and its offer in the program editor: „Wytwórz — ognisko” (20 minutes), „Zapal — ognisko” (5), „Zapal — patyk” (5), „Zasil — ognisko” (5), „Zjedz — jagoda” (5) and „Idź — ognisko”, which takes the minutes of the tile it steps onto. Crafting can be carried out on a revealed tile without a campfire, with the pieces crafting uses in the backpack, and puts an unlit campfire on the tile; lighting a campfire needs a campfire on the character's tile that is not burning, and gives it its 60 minutes; lighting a stick needs a revealed tile and an item that can be lit, and puts it burning on the tile; feeding needs a burning campfire on the character's tile and a piece of fuel, and adds the fuel's minutes to the campfire it started on, whatever that campfire's state at the feeding's end, 0 minutes included, without a cap; eating needs a piece of food and adds its satiety, not above 100. Each action needs the pieces it uses in the backpack, and those pieces leave the backpack at its end, with its effect. Which item is fuel, food or can be lit, and how many each action uses, come from `src/browser/sim/data/items.ts` and `src/browser/sim/data/campfire.ts` (Slice 3): the simulation chooses the piece, the program does not, and no code names an item. „Idź — ognisko” takes one move toward the nearest campfire of the map run — every campfire is known —, counted in game minutes of walking, and cannot be carried out where there is none or where the character stands on a campfire's tile. The shape of each kind — whether it takes a target — is the maker's, within the closed lists and D-26; the editor offers each kind with its target where it takes one. `tests/invariants/test_program_closed_lists.py` lists the new kinds. Test first, in the new `tests/sim/campfire.test.mjs`: each action's feasibility and infeasibility as above, crafting and lighting a stick refused on a tile not revealed; the pieces leave the backpack at the end; a campfire lit in minute m warms from minute m + 1 for 60 minutes; a feeding during which the campfire burns out makes it burn 20 minutes again; feeding adds without a cap; eating stops at 100; „Idź — ognisko” steps toward the nearest campfire and is passed over on a campfire's tile.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/campfire.test.mjs` · `tests/invariants/test_program_closed_lists.py` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:36-64` Questions to settle ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:142-153` Settlements to record (rows 3–14) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:343-367` Decision 4 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F3 · F8 · F13 · F14 · F17 · F18 · F20 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:425-445` D-20 ·
  `foundations/decisions.md:490-515` D-23 · `foundations/decisions.md:542-589` D-25, D-26 ·
  `foundations/decisions.md:724-753` D-35, D-36 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:177-187` action-in-progress ·
  `foundations/invariants.md:222-278` content-identifiers to walk-target ·
  `foundations/invariants.md:346-378` program-closed-lists, walk-feasibility, program-world-reference ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/hex.ts` · `src/browser/view/status-row.ts`
- **Model:** same — six actions with their feasibility, effects and targets, and the feeding's landing on its campfire, are decisions of code across the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/campfire.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_program_world_reference.py`, `test_walk_target.py`, `test_walk_feasibility.py`, `test_move_reach.py`, `test_action_in_progress.py`, `test_program_rule_pick.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 6 · Slice 7 · F3 · F8 · F13 · F14 · F17 · F20

### Slice 9 — the new conditions and their numbers

- **Goal:** The conditions' data, `src/browser/sim/data/conditions.ts`, gains „Temperatura poniżej N °C”, „Sytość poniżej N %”, „Zapas poniżej N szt. <przedmiot w plecaku>”, „Zostało mniej niż N min — ognisko” and „Z dala od — ognisko”, each that takes a number with its unit, default, minimum, maximum and step by the table of spec Decision 3; „Tu leży mniej niż” keeps its row. `conditionHolds` in `src/browser/sim/program.ts`: the body's temperature or satiety below N; the backpack's count of the item below N; the minutes of burning left to the nearest campfire, in game minutes of walking, below N — 0 where there is none or it is extinguished —; no campfire on the character's tile. `checkCondition` in `src/browser/sim/game.ts` takes, for every kind that takes a number, a finite number from the kind's minimum to its maximum that lies on the kind's step counted from the minimum, allowing a difference far below the step, and holds it as the decimal with as many places as the step has (36.6, never 36.60000000000001); 36.55 or a number outside the range is refused; for a step of 1 it takes the whole numbers it takes today. „Zapas poniżej” takes an item of the data, not bound to the map (spec, *Left to the maker*, recommended). The program editor: the rule's number field takes the minimum, maximum and step of the chosen kind's data and changes them when the kind changes; `readNumberField` takes the kind's data, rounds the text's number to the kind's step, clamps it to its range and commits the decimal form the check keeps; choosing a kind puts in its default; the module constant `NUMBER` goes; „Zapas poniżej” offers the items. `tests/invariants/test_program_closed_lists.py` lists the new kinds. Test first, in the new `tests/sim/conditions.test.mjs`: each condition holding and not holding at its boundary; the check taking 36.6 and 30.0, refusing 36.55, 29.9 and 37.1, and taking the whole numbers of „Tu leży mniej niż” as today; and in `tests/view/program-editor.test.mjs` the field's range and step following the kind and `readNumberField` by the kind's step.
- **Change:** `src/browser/sim/data/conditions.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/conditions.test.mjs` · `tests/view/program-editor.test.mjs` · `tests/invariants/test_program_closed_lists.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:41-46` Questions to settle (Q7, Q8) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:89-93` Questions carried to cycle ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:292-341` Decision 3 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F17 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:490-515` D-23 ·
  `foundations/decisions.md:564-589` D-26 · `foundations/decisions.md:724-753` D-35, D-36 ·
  `foundations/decisions.md:784-798` D-39 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:222-245` content-identifiers, program-rule-pick ·
  `foundations/invariants.md:346-356` program-closed-lists ·
  `foundations/invariants.md:368-378` program-world-reference ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/number-field.ts` · `src/browser/view/controls/text-field.ts`
- **Model:** same — the check by the step's grid with its decimal form and the editor's field following the kind are decisions of code in the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/conditions.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_program_world_reference.py`, `test_program_rule_pick.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 8 · F1 · F17

### Slice 10 — the campfire's icon and its credit

- **Goal:** An SVG icon of a campfire from game-icons.net stands directly in `assets/icons/`, copied from the repository github.com/game-icons/icons at the commit `ICON_SOURCE_COMMIT` of `src/browser/view/credits.ts` and changed as the four icons there are (`assets/icons/wood-stick.svg` shows how: no black background, the shape in their colour, which the styleguide ties to `text-strong`), named after its source file as the four are (`assets/icons/campfire.svg` stands here for that name; the report names the file taken, its page and its author). It holds nothing that runs and refers to nothing outside itself (`icon-file-content`). The campfire's data, `src/browser/sim/data/campfire.ts` (Slice 3), names its icon file and the icon's title as its page on game-icons.net gives it. `credits.ts` credits it — author, page, changes —, and the footer shows its line beside the four resources' — „ognisko: „<title>”, <author>, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)” —: the footer's credits come from every icon the data names, not from the resources alone, with names from the data. With the icon, through the pinned skills of their elements, the slice writes F21 after the pattern of `game-icons-wood-stick-title` (the page and an archived copy, read on the day), F22, and F23 where the icon's author is not Delapouite. `tests/invariants/test_icon_credits.py` names the new file's author and title, and `tests/view/icons.test.mjs` covers the icon the campfire's data names — its file, its credit and its footer line. The file comes from outside the product and is untrusted (part map, *External context*). Where the source cannot be fetched, the slice returns `blocked`, naming the missing access; no icon is drawn by hand or taken from elsewhere.
- **Change:** `assets/icons/campfire.svg` · `src/browser/sim/data/campfire.ts` · `src/browser/view/credits.ts` · `src/browser/view/footer.ts` · `tests/view/icons.test.mjs` · `tests/invariants/test_icon_credits.py` · `foundations/environment_facts.md` · `foundations/invariants.md`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:30-30` To do (item 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:87-87` Context (icons) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:154-154` Settlements to record (row 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:86-89` Constraints (D-27 and the icon invariants) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:420-480` Foundation entries ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F15 · F21 · F22 · F23 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:590-622` D-27 ·
  `foundations/decisions.md:739-753` D-36 · `foundations/decisions.md:844-858` D-43 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:301-335` icon-file-content, icon-credits, loop2-container-icons ·
  `foundations/environment_facts.md:57-87` game-icons-licence to game-icons-wood-stick-title ·
  `foundations/part_map.md:3-25` browser-view · `foundations/part_map.md:143-156` External context ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` ·
  `assets/icons/wood-stick.svg` · `src/browser/sim/data/resources.ts` ·
  `tests/invariants/test_icon_file_content.py` · `tests/invariants/test_loop2_container_icons.py`
- **Model:** same — an untrusted file changed by hand to the four icons' pattern, and the footer's credits widened beyond the resources.
- **Risk:** trust boundary — `assets/icons/**` (part `browser-view`): the campfire icon from game-icons.net, untrusted
- **Checks:** `npm run build`; `node --test tests/view/icons.test.mjs`, first failing on the campfire's icon, then passing; `npm run typecheck`; `node --test "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_icon_file_content.py`, `test_icon_credits.py`, `test_content_identifiers.py`, `test_loop2_container_icons.py`; `python -B -m unittest discover -s tests/deploy -p test_loop2_image_icons.py`; `python -B .the-way/elements/common/foundation_check.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. A container check that reports itself skipped on this machine is named as unchecked; the Ruff check of the changed Python file cannot run — Ruff is not installed.
- **Depends on:** Slice 3 · F15

### Slice 11 — the status row at death, and the row of the body and the backpack

- **Goal:** Under the status row stands a row of the body and the backpack: „Temperatura 36,8 °C · Sytość 82 % · Zdrowie 100” and „Plecak 7/15: patyk 5, jagoda 2” („Plecak 0/15” when empty) — the temperature cut down to tenths, satiety and health cut down to whole numbers, with a decimal comma (spec Decision 3, *What the player reads beside it*), the cap the character's carrying capacity (Slice 5), the items' names from the data in the data's order; a value below the threshold of chill or of hunger stands in the role `danger` (D-39), which part of the row the maker's within the styleguide. At death the status row reads „Minuta <n> · Mag zamarzł” for cold or „Minuta <n> · Mag umarł z głodu” for hunger, `<n>` the minute of death; „Pauza” is gone; „Restart” and „Zakończ” stay destructive buttons and act on the ended map run as on one in progress — „Restart” with the same seed from minute zero, „Zakończ” back to the screen from which the player sends the character. The status texts of the new actions read as their data gives them, followed by the target's name where the action takes one, as „Idzie po: patyk”. The row is a new module, `src/browser/view/body-row.ts`, after the exemplar `status-row.ts` (made once, updated in place), placed by `app.ts` under the status row; its styles stand in `styles.css` on the existing tokens — no new token, role or shared control. Where the texts of the causes stand is the maker's, within D-18 and `content-identifiers`. Tests first in `tests/view/status-row.test.mjs` and the new `tests/view/body-row.test.mjs`: the texts at death of cold and of hunger and no „Pauza” then; the body row's cut-down values (36.976 as „36,9”, 37.0 as „37,0”, 34.99 as „34,9” in `danger`); the backpack's text, empty and holding items. The screenshot check of `make-change` follows the route the foundation settles; where it settles none, the states are checked in code and the screenshot is named unchecked.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/body-row.ts` · `src/browser/view/app.ts` · `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/body-row.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:50-55` Questions to settle (Q10, Q11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:144-146` Settlements to record (rows 5–7) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:292-341` Decision 3 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:369-418` Decision 5, Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F5 · F6 · F7 · F9 ·
  `foundations/decisions.md:39-93` D-03, D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:446-463` D-21 · `foundations/decisions.md:739-753` D-36 ·
  `foundations/decisions.md:769-873` D-38 to D-44 · `foundations/decisions.md:904-933` D-47, D-48 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:440-479` browser-view-token-values to design-token-sources ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:59-65` map run restart ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/view/controls/button.ts` · `src/browser/view/clock.ts`
- **Model:** same — a new row of the screen, its roles and its cut-down values, and the status row's state at death.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/view/body-row.test.mjs tests/view/status-row.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_content_identifiers.py`, `test_browser_view_framework.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 5 · Slice 8 · F5 · F6 · F7 · F9

### Slice 12 — the campfire on the drawing and in the list of revealed tiles

- **Goal:** The campfire's icon — the file the campfire's data names (Slice 10) — stands on its tile in the terrain panel's drawing, beside the resources' icons, whether the campfire burns or is extinguished, never drawn in `depleted` (D-41: an extinguished campfire is still there), and the drawing shows no number of the campfire or the stick (D-19, row 15). The row of a revealed tile in the list of revealed tiles gives the state of its campfire — „ognisko — płonie, zostało 42 min” or „ognisko — wygasłe” — and of each stick burning on it — „patyk — płonie, zostało <n> min” (spec Decision 5) —, the names from the data; where in the row that state stands is the maker's within the styleguide. A burning stick shows only in that row. Hovering keeps linking a tile and its row. Tests first in `tests/view/terrain-picture.test.mjs` and `tests/view/tile-list.test.mjs`, from map runs in which the program crafts and lights a campfire and lights a stick: the icon on the campfire's tile, burning and extinguished, with no number on the drawing; the row's texts, burning and extinguished, and the burning stick's. The screenshot check of `make-change` follows the route the foundation settles; where it settles none, the states are checked in code and the screenshot is named unchecked.
- **Change:** `src/browser/view/terrain-picture.ts` · `src/browser/view/terrain-panel.ts` · `src/browser/view/tile-list.ts` · `src/browser/styles.css` · `tests/view/terrain-picture.test.mjs` · `tests/view/tile-list.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:30-30` To do (item 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:53-55` Questions to settle (Q11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:154-154` Settlements to record (row 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:343-418` Decision 4, Decision 5, Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F15 · F20 ·
  `foundations/decisions.md:39-93` D-03, D-04 · `foundations/decisions.md:380-424` D-18, D-19 ·
  `foundations/decisions.md:590-622` D-27 · `foundations/decisions.md:739-753` D-36 ·
  `foundations/decisions.md:769-873` D-38 to D-44 · `foundations/decisions.md:904-933` D-47, D-48 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:336-345` terrain-drawing-numbers ·
  `foundations/invariants.md:440-479` browser-view-token-values to design-token-sources ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `tests/invariants/test_terrain_drawing_numbers.py`
- **Model:** same — where the campfire's icon and the burning state stand on the drawing and in the row are decisions of the screen.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/view/terrain-picture.test.mjs tests/view/tile-list.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_terrain_drawing_numbers.py`, `test_browser_view_token_values.py`, `test_content_identifiers.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 6 · Slice 8 · Slice 10 · Slice 11 · F15 · F20

### Slice 13 — the closed list end to end: acceptance, the split of a span, every kind

- **Goal:** Three things show the change as a whole. (a) The task's acceptance criterion, in the new `tests/sim/acceptance.test.mjs`: on Las a program drawn from the closed list as this task leaves it — „Zawsze”, „Eksploruj”, „Wędruj”, „Idź — <zasób>” and „Tu leży mniej niż” included — passes 480 game minutes alive on a seed the test names, and the empty program dies (in minute 243, of cold). The maker finds the program and the seed, names both in the test and the report, and returns without code, status `returned`, if no seed tried passes. (b) The invariant `minute-span-split` (F19) gets its test, the new `tests/invariants/test_minute_span_split.py`, built and driven as `tests/invariants/test_map_run_repeatability.py` drives the simulation: a map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls, up to and including death — with the acceptance program, which gathers, eats, builds, lights and feeds a campfire, and with a program that dies; it cites `invariant: minute-span-split` and is seen failing once against behaviour broken for a moment. F24 is written with it, through the pinned skill `the-way-update-part-map`. (c) The three invariant tests whose programs claim every kind — `test_map_run_repeatability.py` (its starting program: every condition kind and every action kind), `test_simulation_inputs.py` (a program using every condition kind and every action kind; the streams it feeds gain the gathering stream) and `test_simulation_randomness.py` (a program mixing every action; the gathering's draws come from the generator seeded from the map run's state) — use the closed list as this task leaves it, within 240 minutes or with a program that keeps the mage alive, still proving their sentences. (d) `tests/invariants/test_walk_feasibility.py`, whose case "a stock of zero is no stock" writes a tile's stock over to 0 and advances one minute, keeps proving its sentence now that tiles renew (D-60, Slice 6): the minute it advances into is no whole multiple of the resource's renewal time on the map, or the case otherwise keeps renewal from giving the piece back before the program picks (orchestrator's amendment after Slice 8: the test fails from Slice 6 on — `zero here did not come about at minute 120`, 120 being a multiple of every renewal time of Las).
- **Change:** `tests/sim/acceptance.test.mjs` · `tests/invariants/test_minute_span_split.py` · `foundations/part_map.md` · `tests/invariants/test_map_run_repeatability.py` · `tests/invariants/test_simulation_inputs.py` · `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_walk_feasibility.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-34` To do, Acceptance criteria ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:56-58` Questions to settle (Q12) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:22-50` Goals and non-goals ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:119-138` Constraints (Readings of the task) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:420-480` Foundation entries ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F18 · F19 · F24 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:464-515` D-22, D-23 ·
  `foundations/invariants.md:155-176` map-run-repeatability, simulation-randomness ·
  `foundations/invariants.md:212-221` simulation-inputs ·
  `foundations/invariants.md:357-367` walk-feasibility ·
  `foundations/part_map.md:27-51` simulation ·
  `foundations/glossary.md:12-24` game minute, map run ·
  `guidelines/coding.md` ·
  `tests/invariants/loop2_invariant_support.py` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/conditions.ts`
- **Model:** same — finding a program and a seed that live 480 minutes, and an invariant test with its deliberate break.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/acceptance.test.mjs`; `python -B -m unittest discover -s tests/invariants -p test_minute_span_split.py`, first failing against the break, then passing; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_map_run_repeatability.py`, `test_simulation_inputs.py`, `test_simulation_randomness.py`, `test_walk_feasibility.py`; `python -B .the-way/elements/common/foundation_check.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python files cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 1 · Slice 2 · Slice 9 · F18 · F19 · F24

### Slice 14 — the team's character carries its traits into the map run

- **Goal:** (Orchestrator's amendment at the reconciliation with `main`: task 11 merged first, so this cycle makes the join of spec Decision 2, as the plan's *Choices* gives.) A character created in the team (`createCharacter` in `src/browser/sim/game.ts`, type `Character` in `src/browser/sim/types.ts`) carries its traits, made by `newTraits` of `src/browser/sim/character.ts` when it is created — carrying capacity 15 —, and a saved game state holds them with the character. `send` copies the sent character's traits into the map run's character (`RunCharacter.traits`) in place of `newTraits()`; „Restart” keeps the traits of the map run it replaces, as today. The map run keeps naming the team's character by its number (D-56) and holds its own copy of the traits for the map run (spec Decision 2, *The join*), so `map-run-repeatability` and a restart do not depend on the team. Test first, in `tests/sim/traits.test.mjs`: a created character carries carrying capacity 15; the map run of a sent character carries that character's traits, also where the character's traits differ from a new character's (a hand-made game state); a restart keeps them; and `character-team` still holds.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `tests/sim/traits.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/spec.md:245-290` Decision 2 ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:59-61` Questions to settle (Q15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:75-80` Context (task 11, the chest) ·
  `foundations/decisions.md:1087-1113` D-56 ·
  `foundations/invariants.md:500-509` character-team ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:291-300` restart-seed ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/character.ts` · `src/browser/sim/run.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/traits.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_character_team.py` (where it exists), `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 5 · the reconciliation with `main`

## Coverage

| What the task requires | Slices or entries |
|---|---|
| *To do* 1 — temperature in °C with tenths, start and cap 37.0, cooling by the map's ambient temperature (Las 25 °C), chilled below 35.0 | Slices 3, 4 · F1, F2, F3 |
| *To do* 2 — satiety and health, their rates, thresholds and caps | Slices 3, 4 · F3, F4 |
| *To do* 3 — death in its minute, also during an action, with its cause; time stops; status text; „Pauza” gone, „Restart” and „Zakończ” stay | Slices 4, 11 · F5, F6, F7 |
| *To do* 4 — empty backpack of 15 pieces in all, the cap the character's carrying capacity, its value in data | Slices 3, 5 · F9 |
| *To do* 5 — „Zbierz — <zasób mapy>”: 10 minutes, one piece, 7 in 10, its own generator, infeasible on a hidden tile, without the resource and with a full backpack | Slices 3, 7 · F10, F11, F16 |
| *To do* 6 — renewal of one piece per renewal time, up to the starting stock | Slice 6 · F12 |
| *To do* 7 — „Wytwórz — ognisko”: 20 minutes, 6 sticks, an unlit campfire, one per tile, warms only its tile | Slices 3, 6, 8 · F17, F20 |
| *To do* 8 — „Zapal — ognisko”: 5 minutes, 2 sticks, 60 minutes, 0.5 °C a minute up to 37.0, extinguished stays | Slices 3, 6, 8 · F3, F8, F13 |
| *To do* 9 — „Zasil — ognisko”: 5 minutes, 20 minutes for a stick, fuel chosen by the simulation, no cap | Slices 3, 8 · F14 |
| *To do* 10 — „Zapal — patyk”: 5 minutes, 3 minutes of 0.15 °C, then gone | Slices 3, 6, 8 · F8, F20 |
| *To do* 11 — „Zjedz — jagoda”: 5 minutes, 25 satiety up to 100, infeasible without a berry | Slices 3, 8 · F3 |
| *To do* 12 — the closed list's new actions (with „Idź — ognisko”) and conditions | Slices 7, 8, 9 · F17 |
| *To do* 13 — the temperature condition takes tenths | Slice 9 · F1 |
| *To do* 14 — the row of the body and the backpack, `danger` below a threshold | Slice 11 |
| *To do* 15 — the campfire's icon from game-icons.net with its credit; its state and the burning stick's in the tile's row | Slices 10, 12 · F15, F21, F22, F23 |
| Acceptance criterion — a program of the closed list lives 480 minutes on a named seed, the empty program dies | Slice 13 |
| Settlements row 1 | F1 |
| Settlements row 2 | F2 |
| Settlements row 3 | F3 |
| Settlements row 4 | F4 |
| Settlements row 5 | F5 |
| Settlements row 6 | F6 |
| Settlements row 7 | F7 |
| Settlements row 8 | F8 |
| Settlements row 9 | F9 |
| Settlements row 10 | F10 |
| Settlements row 11 | F11 |
| Settlements row 12 | F12 |
| Settlements row 13 | F13 |
| Settlements row 14 | F14 |
| Settlements row 15 | F15 |
| Projected entries the task writes — D-25 with gathering, D-26 with the campfire | F16, F17 |
| Projected entries the task makes true in part (fuel chosen by the simulation, the gathering draw, gathering only what the map lists, renewal, carrying capacity as a trait) | Slices 3, 5, 7, 8 (written by tasks 5, 8, 10, 18) |
| Question carried 1 — the order of a minute's effects; spec Decision 1, the invariant | Slices 4, 6, 7, 8, 13 · F18, F19, F24 |
| Question carried 2 — the range and step of the new conditions' numbers; spec Decision 3 | Slice 9 |
| Question carried 3 — where carrying capacity stands; spec Decision 2 | Slice 5; the join with task 11, if it has merged into `main` when the branch is brought up to date before the request, is no slice of this plan (see *Choices*) |
| Spec Decision 4 — a revealed tile for crafting and lighting a stick | Slice 8 · F20 |
| Spec Decision 5 — the two texts | Slices 11, 12 |
| Spec *Constraints* — the tests that run past the mage's death keep covering what they say | Slices 1, 2, 13 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The tests that drive a map run past minute 243 are cut to 240 minutes before death exists (Slices 1, 2), so they pass on the base and after Slice 4 alike | adapting them in the slice that brings death — fourteen files beside its code, over the size limit; or giving them a program that keeps the mage alive once Slice 9 exists — every slice from 4 to 9 would fail those tests meanwhile | a test covers fewer minutes than before — the hour of hidden tab in `test_player_map_run_pace.py` no longer reaches an hour; the review of the whole change reads each against its docstring |
| The change's numbers and names, other than those of actions and conditions, go into data first, in one slice (Slice 3) | each mechanic's data in its own slice — larger slices of code; actions and conditions in data before their kinds — the closed-list tripwire of `test_program_closed_lists.py` and the editor, which offers every kind the data lists, would fail | the data stands unused for a few slices; a shape Slice 3 picks that a later slice finds awkward is changed there |
| The plan names the new files — `items.ts`, `campfire.ts`, `traits.ts` in `src/browser/sim/data/`, `body.ts`, `world.ts`, `character.ts` in `src/browser/sim/`, `body-row.ts` in `src/browser/view/` and the new test files — where the spec leaves names of files to the maker | each maker naming its files — a later slice's *Change* and the orchestrator's mechanical check could not name them | a rename; names of types, functions, fields and events stay the makers' |
| The state and the minute's effects come before the program's kinds: the body and death (Slice 4), the backpack (5), what burns and renewal (6), then the actions (7, 8) and conditions (9) | one slice per feature, its state with its action — each would change the step, the types, the check and the editor at once, over the size limit for the campfire | Slice 6 is tested on hand-made map runs until Slice 8 makes campfires |
| Each slice that adds kinds to the closed list also changes the program check, the editor and the closed-list test with them (Slices 7, 8, 9) | one editor slice after all kinds — the build fails between, since the editor's functions build each action and condition from its kind's type | the editor changes three times, each time a little |
| `newMapRun` and `stepMinute` keep the arguments the tests call them with; an argument they gain is optional (Slice 5) | a required argument — some eight test files would change with the slice | an optional argument whose absence carries a meaning, a new character's traits |
| The row of the body and the backpack is a module of its own, placed by `app.ts` under the status row (Slice 11) | the row inside `status-row.ts` — one module with two rows and two jobs | one module more |
| The test of `minute-span-split` comes after every effect of a minute exists (Slice 13); its sentence is written by the foundation step | its test in Slice 4 — it would cover the body and death only and need widening in Slices 6–8 | the invariant has no citing test between the foundation step and Slice 13; the cycle's full run comes after every slice |
| The icon is a slice of its own with its own review, before the drawing uses it (Slices 10, 12) | the icon in the drawing's slice — the trust-boundary review would read the screen's code with it | none beyond one slice more |
| F21–F24 are written by the slice whose code makes them true | by the foundation step — the icon, its title and author are not chosen yet, and a part-map pattern naming an untracked file fails `foundation_check.py` | the entries reach the review with their slice instead of before Slice 1 |
| The join with task 11 (spec Decision 2) is not a slice: task 11 had not merged into `main` at the base; if it has when the branch is brought up to date before the request, the orchestrator adds the join then, as Decision 2 gives | a join slice now — nothing to join to yet | a slice added late, small and mechanical by Decision 2's *Cost if wrong* |
| The kitchen-sink page is not changed: no new shared control, state of a control or role | a sample of a tile with a campfire on the page | where the review reads a tile with a campfire as a new state of a tile, the page gains a sample in a fix |
