# Plan — Odsłaniać czynności, przedmioty i warunki w edytorze programu dopiero po ich odkryciu w grze i zatrzymywać wtedy czas gry

- Task: .runs/task-cycles/odkrywanie/task.md
- Spec: none
- Base: d9a237435f22c29b7d37430054f6fa7ed0a81323

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| O1 | decision | row O1 of *Settlements to record* | Slice 9 |
| O2 | decision | row O2 | Slices 10, 12 |
| O3 | decision — D-71 gains the sentence on discovery, as the row's source says ("kolejność D-71 dostaje zdanie o odkryciu") | row O3 | Slices 9, 10 |
| O4 | invariant — new sentence of `player-map-run-pace`; check: `tests/invariants/test_player_map_run_pace.py` | row O4 | Slice 10 |
| O5 | invariant — new sentence of `minute-span-split`; check: `tests/invariants/test_minute_span_split.py` | row O5 | Slice 10 |
| O6 | decision | row O6 | Slice 11 |
| O7 | decision | row O7 | Slice 11 (keeps the body row, backpack, tile list and drawing as they are) |
| O8 | decision | row O8 | Slices 2, 8 |
| O9 | decision | row O9 | Slices 1, 9 |
| "When does the player learn what the world holds?" | decision, whole | projected entry the task writes (task § Decisions in play) | Slices 1, 2, 9, 10 |
| "What does an archetype open to a character?" | decision, whole | projected entry the task writes | Slices 1, 2 |
| "Whose is the knowledge of the world, and what may a character use of it?" | decision, the part this task's code makes true (task 10 writes the rest) | projected entry, task § Decisions in play | Slices 2, 8, 9, 11 |
| predisposition | glossary term, whole | projected term | Slices 1, 2 |
| archetype | glossary term, whole | projected term | Slices 1, 2 |
| repertoire | glossary term, whole | projected term | Slices 2, 8, 11 |
| Understanding | glossary term, the part this task's code makes true (task 10 writes the rest) | projected term | Slices 2, 9 |
| `program-rule-pick` | invariant — changed sentence: the pick passes over a program rule outside the character's repertoire; check: `tests/invariants/test_program_rule_pick.py` | follows O8: today's sentence has the character start a rule whose condition holds and whose action can be carried out, which a rule outside the repertoire no longer does | Slice 8 |

Part map: no change — every file the change adds lies under `src/browser/sim/**` or `tests/sim/**`, which the part `simulation` claims.

## Slices

### Slice 1 — skills, predispositions and the chain of revelations in data

- **Goal:** The data files of `src/browser/sim/data/` hold the five character skills of the task with the pairs of verb and target each grows, the predispositions of the elemental mage (all five), and for every action, condition and item of Las and for the campfire what reveals it, as the task's chain gives; nothing reads them yet. In detail:
  - a new data file `src/browser/sim/data/skills.ts` holds the catalogue of character skills — Eksploracja ("Eksploruj"), Zbieranie małych przedmiotów ("Zbierz", every target), Wytwarzanie ogniska ("Wytwórz — ognisko", "Zasil — ognisko"), Jedzenie ("Zjedz", every target), Rzucanie czaru Płomyk ("Zapal", every target: "Zapal — ognisko" and "Zapal — patyk") — each naming the actions of `ACTIONS` it grows; "Wędruj", "Idź" and "Idź — ognisko" stand in no skill;
  - the archetype's data in `archetypes.ts` gains its predispositions, a list of skills; the elemental mage has all five;
  - `actions.ts`, `conditions.ts`, `items.ts` and `campfire.ts` give each entry what reveals it, beside the entry, as one of the revealing events of the task's table: the first chill, the first finished exploration, a revealed tile holding the item (for the four items), the first gathered stick, the first crafted campfire, the first finished "Zapal" (of a campfire or a stick), the first gathered berry; "Zawsze" has none, since it is known from the start of a new game. The type of a revealing event stands in a new data file `src/browser/sim/data/revelations.ts`; the events name resources and items by their data identifiers, so no identifier of the content leaves the data (rule S2 of `tests/sim/rules.test.mjs`);
  - the campfire gets in `campfire.ts` the identifier under which the Understanding will record it as a discoverable thing, without becoming an item of the backpack (`ITEMS` and `Backpack` stay as they are).
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/data/revelations.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:41-44` Questions to settle, 1 · `.runs/task-cycles/odkrywanie/task.md:57-59` Questions to settle, 5 · `.runs/task-cycles/odkrywanie/task.md:80-82` Questions to settle, 12 · `.runs/task-cycles/odkrywanie/task.md:84-102` Context · `.runs/task-cycles/odkrywanie/task.md:136-147` Decisions in play, projected entries · `.runs/task-cycles/odkrywanie/task.md:149-165` Settlements to record · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:356-374` D-18 · `foundations/decisions.md:705-719` D-34 · `foundations/decisions.md:1187-1201` D-63 · `foundations/decisions.md:1456-1468` D-82 · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:232-243` content-identifiers · `foundations/glossary.md:5-11` character skill · O9 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · predisposition · archetype ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/resources.ts` · `tests/sim/rules.test.mjs:225-250`
- **Model:** same — it settles the shapes of the skills and of the revealing events that the repertoire, the discovery and tasks 8 and 9 read.
- **Risk:** none
- **Checks:** first the failing cases in `tests/sim/data.test.mjs`: the five skills with their actions and the mage's predispositions as To do 3 gives them; each revealing event of the table of To do 2 revealing exactly the actions, conditions and items of its row, every action and condition standing in exactly one row and "Zawsze" in none, and the campfire revealed by the first gathered stick; each expectation's comment naming `task.md` of the vault and its line (D-82). Then `npm test -- tests/sim/data.test.mjs` and `npm test`, failing nothing beyond the three failures of the base (`reports/00-baseline-gate.log`: `test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules`, tools missing on this machine).
- **Depends on:** O9 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · predisposition · archetype

### Slice 2 — the Understanding in the game state and the repertoire computed from it

- **Goal:** The game state holds the Understanding, and the simulation computes from it the repertoire; nothing is gated by it yet. In detail:
  - `src/browser/sim/types.ts` gains the type of the Understanding — the discovered actions, conditions and items by their data identifiers, the campfire under the identifier Slice 1 gave it — and `GameState` a field `understanding`, one for the whole game and every character; `newGame()` gives an Understanding holding the condition "Zawsze" alone; `createCharacter`, `send`, `restart`, `end`, `setPaused`, `setProgram` and death leave it as it is;
  - a new simulation module `src/browser/sim/understanding.ts` exports: the Understanding of a new game; the repertoire computed from an Understanding and a list of predispositions — an action of the Understanding is in it where a skill among the predispositions grows it or no skill grows it; a condition and an item of the Understanding are in it whatever the predispositions; an action or a condition naming a resource or an item ("Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej") is in it with each target the Understanding holds; the repertoire is never saved; whether a program rule — its condition, its action and their targets — lies in a repertoire; the program reduced to a repertoire: the same groups and rules, with their identities, less every rule outside the repertoire and every group whose condition lies outside it, which is passed over as a group whose condition does not hold; and the repertoire of the program the editor shows (Q-C1): the repertoire of the archetype of the character in the map run during one, otherwise of the archetype every created character takes (`CREATED_ARCHETYPE`), the archetype's predispositions read from its data;
  - `stryker.config.json` lists the new test file.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `tests/sim/repertoire.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:67-69` Questions to settle, 8 · `.runs/task-cycles/odkrywanie/task.md:80-82` Questions to settle, 12 · `.runs/task-cycles/odkrywanie/task.md:96-99` Context, loop2 code · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:356-374` D-18 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:720-734` D-35 · `foundations/decisions.md:966-984` D-51 · `foundations/decisions.md:1070-1096` D-56 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:232-243` content-identifiers · `foundations/invariants.md:358-368` program-closed-lists · `foundations/invariants.md:592-601` mutation-test-selection · `foundations/glossary.md` · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `tests/sim/program-fixture.mjs`
- **Model:** same — it decides the shape of the Understanding and of the repertoire that every later slice reads.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/repertoire.test.mjs`: a new game's Understanding holds "Zawsze" alone; the mage's repertoire of an Understanding is that Understanding (all five skills); with a hand-written list of predispositions lacking a skill, the actions that skill grows leave the repertoire while "Wędruj", "Idź" and "Idź — ognisko" stay, and conditions and items stay; targets follow the items of the Understanding; a rule with a condition, an action or a target outside the repertoire lies outside it; the reduced program keeps identities and order and drops exactly those rules and groups; creating, sending, restarting and ending leave the Understanding unchanged. Then `npm test -- tests/sim/repertoire.test.mjs`, `npm test` (as Slice 1 gives for the base's three failures) and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts"`, each surviving mutant classified in the report as `guidelines/testing.md` § Mutation testing gives.
- **Depends on:** Slice 1 · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding

### Slice 3 — simulation tests start from a game that knows everything (first part)

- **Goal:** A test fixture gives a game that knows everything the data lists, and the first group of simulation tests starts from it, so that they keep testing what they test once the repertoire gates the simulation (Slice 8) and nothing is discovered in them (Slice 9). Behaviour of the product does not change, and no expectation of a test changes. In detail:
  - a new fixture `tests/sim/understanding-fixture.mjs` exports a fully knowing Understanding — every action of `ACTIONS`, every condition of `CONDITIONS`, every item of `ITEMS` and the campfire, read from the built data modules under `dist/public/sim/data/`, never typed by hand, so it stays full as the data grows — and a function giving a new game (`newGame()`) whose `understanding` is that one;
  - in each test file of this slice, every game that is sent to a map and then passes game time starts from that function instead of `newGame()`; a game that is never sent, and a test that checks the state of a new game itself, keep `newGame()`; calls of the run-level functions (`newMapRun`, `stepMinute`, `chooseActivity`, `actionFeasible`, `conditionHolds`) stay as they are, since Slice 8 gates through `game.ts` alone;
  - the cause of the change, for the rule "Changing an existing test": a new game knows "Zawsze" alone and the simulation passes over every rule outside the repertoire (task To do 1 and 4), while these tests check other rules of the game.
- **Change:** `tests/sim/understanding-fixture.mjs` · `tests/sim/acceptance.test.mjs` · `tests/sim/actions.test.mjs` · `tests/sim/body.test.mjs` · `tests/sim/campfire.test.mjs` · `tests/sim/conditions.test.mjs` · `tests/sim/data.test.mjs` · `tests/sim/flow.test.mjs` · `tests/sim/gather.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/task.md:16-16` To do 1 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts:315-334` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test`, failing nothing beyond the base's three failures; `npm test -- tests/sim/<file>` for each changed test file. The fixture's game is checked by a precondition in one test of the fixture's first user: its Understanding holds each action of `ACTIONS` and each condition of `CONDITIONS`.
- **Depends on:** Slice 2

### Slice 4 — simulation and view tests start from a game that knows everything (second part)

- **Goal:** The second group of simulation tests and the view tests that send a character start from the fully knowing game of Slice 3, as Slice 3 gives it; behaviour and expectations stay unchanged.
- **Change:** `tests/sim/program.test.mjs` · `tests/sim/program-counts.test.mjs` · `tests/sim/purity.test.mjs` · `tests/sim/team.test.mjs` · `tests/sim/time.test.mjs` · `tests/sim/traits.test.mjs` · `tests/sim/world.test.mjs` · `tests/view/clock.test.mjs` · `tests/view/status-row.test.mjs` · `tests/view/tile-list.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:66-79` Slice 3 · `.runs/task-cycles/odkrywanie/task.md:16-16` To do 1 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts:315-334` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test`, failing nothing beyond the base's three failures; `npm test -- <file>` for each changed test file.
- **Depends on:** Slice 3

### Slice 5 — view tests and the first invariant tests start from a game that knows everything

- **Goal:** The remaining view tests that send a character, and the first group of invariant tests, start from a fully knowing game; behaviour and expectations stay unchanged. In detail:
  - the view tests use the fixture of Slice 3, as Slice 3 gives it;
  - `tests/invariants/program_fixture.py` gains the source text of a JavaScript function that the Node drivers of the invariant tests embed, giving a new game whose Understanding holds everything the built data modules under `dist/public/sim/data/` list, as the fixture of Slice 3 does; in each invariant test of this slice, the driver step that makes a new game for a character that is sent and passes game time uses it; the test's docstring, where it lists the public functions it drives or how its game starts, says so;
  - no sentence of an invariant changes, and no expected value.
- **Change:** `tests/view/program-editor.test.mjs` · `tests/view/terrain-picture.test.mjs` · `tests/invariants/program_fixture.py` · `tests/invariants/test_action_in_progress.py` · `tests/invariants/test_character_team.py` · `tests/invariants/test_exploring_reveal.py` · `tests/invariants/test_map_run_layout.py` · `tests/invariants/test_map_run_repeatability.py` · `tests/invariants/test_map_run_tiles.py` · `tests/invariants/test_move_reach.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:66-79` Slice 3 · `.runs/task-cycles/odkrywanie/task.md:16-16` To do 1 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 ·
  `foundations/invariants.md:165-175` map-run-repeatability · `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:258-268` exploring-reveal · `foundations/invariants.md:269-279` move-reach · `foundations/invariants.md:291-302` map-run-tiles · `foundations/invariants.md:391-401` map-run-layout · `foundations/invariants.md:512-521` character-team ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts:315-334` · `tests/invariants/loop2_invariant_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test`, failing nothing beyond the base's three failures; `npm test -- <file>` for each changed test file.
- **Depends on:** Slice 3

### Slice 6 — invariant tests start from a game that knows everything (second part)

- **Goal:** The second group of invariant tests starts its sent games from the fully knowing game of `tests/invariants/program_fixture.py`, as Slice 5 gives it; behaviour, sentences and expected values stay unchanged.
- **Change:** `tests/invariants/test_minute_span_split.py` · `tests/invariants/test_player_map_run_pace.py` · `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_program_rule_pick.py` · `tests/invariants/test_program_world_reference.py` · `tests/invariants/test_restart_seed.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:66-79` Slice 3 · `.runs/task-cycles/odkrywanie/plan.md:93-107` Slice 5 · `.runs/task-cycles/odkrywanie/task.md:16-16` To do 1 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 ·
  `foundations/invariants.md:198-209` player-map-run-pace · `foundations/invariants.md:244-257` program-rule-pick · `foundations/invariants.md:303-312` restart-seed · `foundations/invariants.md:358-368` program-closed-lists · `foundations/invariants.md:380-390` program-world-reference · `foundations/invariants.md:522-531` minute-span-split ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test`, failing nothing beyond the base's three failures; `npm test -- <file>` for each changed test file.
- **Depends on:** Slice 5

### Slice 7 — invariant tests start from a game that knows everything (third part)

- **Goal:** The third group of invariant tests starts its sent games from the fully knowing game of `tests/invariants/program_fixture.py`, as Slice 5 gives it; behaviour, sentences and expected values stay unchanged. `test_simulation_inputs.py` keeps calling every function the simulation exports, and its inputs include the fully knowing game beside a new game.
- **Change:** `tests/invariants/test_simulation_inputs.py` · `tests/invariants/test_simulation_isolation.py` · `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_terrain_drawing_numbers.py` · `tests/invariants/test_walk_feasibility.py` · `tests/invariants/test_walk_target.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:66-79` Slice 3 · `.runs/task-cycles/odkrywanie/plan.md:93-107` Slice 5 · `.runs/task-cycles/odkrywanie/task.md:16-16` To do 1 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 ·
  `foundations/invariants.md:176-186` simulation-randomness · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:280-290` walk-target · `foundations/invariants.md:348-357` terrain-drawing-numbers · `foundations/invariants.md:369-379` walk-feasibility ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/sim/types.ts` · `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test`, failing nothing beyond the base's three failures; `npm test -- <file>` for each changed test file.
- **Depends on:** Slice 5

### Slice 8 — the simulation carries out only what the character's repertoire holds

- **Goal:** In a map run the character picks only among the program rules of its repertoire: wherever `game.ts` lets the run pick — the start of a map run (`newMapRun`) and each game minute (`stepMinute`) — it gives the run-level function the program reduced to the repertoire of the character in the run (Slice 2), computed from the game's Understanding through the predispositions of that character's archetype; a rule outside the repertoire is passed over as an action that cannot be carried out in that minute and stays in the program; `setProgram` accepts it as today. The run-level functions keep their signatures and their meaning for the arguments they take today. `program-rule-pick` gets a case for its changed sentence.
- **Change:** `src/browser/sim/game.ts` · `tests/sim/repertoire.test.mjs` · `tests/invariants/test_program_rule_pick.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/plan.md:93-107` Slice 5 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 · `.runs/task-cycles/odkrywanie/task.md:67-69` Questions to settle, 8 · `.runs/task-cycles/odkrywanie/task.md:130-134` Decisions in play, invariants and terms ·
  `foundations/decisions.md:401-421` D-20 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:553-585` D-26 · `foundations/decisions.md:1597-1618` D-92 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:165-175` map-run-repeatability · `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:244-257` program-rule-pick · `foundations/invariants.md:358-368` program-closed-lists · O8 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire · program-rule-pick (its row in *Foundation entries*) ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/program.ts` · `src/browser/sim/types.ts` · `tests/invariants/program_fixture.py`
- **Model:** same — it decides where in the minute the reduced program enters and keeps the counts of D-93 on the full program.
- **Risk:** none
- **Checks:** first the failing cases: in `tests/sim/repertoire.test.mjs`, a sent mage whose Understanding lacks "Eksploruj" passes over "Zawsze → Eksploruj" and carries out the next rule it knows, the rule staying in the program with its count; a rule whose condition or target lies outside the repertoire passed over likewise; the same program with the action known carried out; in `tests/invariants/test_program_rule_pick.py`, a case of a game whose Understanding lacks an action of an earlier rule, marked `invariant: program-rule-pick`, with a control seen failing. Then `npm test -- tests/sim/repertoire.test.mjs`, `npm test -- tests/invariants/test_program_rule_pick.py` and `npm test`, failing nothing beyond the base's three failures. A test outside *Change* that fails because its game does not know what its program uses is a test Slices 3–7 missed: return it, without changing it.
- **Depends on:** Slices 2–7 · O8 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire · program-rule-pick

### Slice 9 — discoveries in the order of the game minute, the Understanding growing and the rule at the first chill

- **Goal:** A game minute of a map run reveals what the task's chain gives, in the step of D-71 that caused it, and the pick at the end of that minute already uses what was revealed; time does not stop yet (Slice 10). In detail:
  - `src/browser/sim/run.ts` exports, beside an unchanged `stepMinute`, the minute up to the pick and the pick itself, so that `game.ts` can let the discoveries take hold between them; `stepMinute` stays those two together, with its signature and meaning;
  - `src/browser/sim/understanding.ts` gives what a minute reveals, from the map run before and after the minute up to the pick and its events, read against the revealing events of the data (Slice 1): the first chill — body temperature below the threshold of chill (`BALANCE.body.chilledBelow`) after the minute's body step; a finished exploration — the tile it revealed, with the items whose resource that tile holds; a gathering that put a stick or a berry into the backpack; a crafting that put a campfire on the tile; a "Zapal" whose lighting took hold, of a campfire or a stick; what is new enters the Understanding, and what the Understanding already holds reveals nothing;
  - in a minute in which the character dies, the effect of the ending action does not take hold, so it reveals nothing (D-71); the first chill, which the body step reveals, follows the body step as O3 gives;
  - at the first chill — the discovery of what the chill reveals — the game appends the rule "Zawsze → Eksploruj" to the first rule group of the program, with a fresh identity, or, where the program has no group, makes a group "Program" with the condition "Zawsze" and appends it there (O1); within a map run the rule's count starts from zero and counts its firings (D-92, D-93);
  - `advanceMinutes` threads the Understanding and the program through the minutes, and the game state after it holds both as they grew; a minute that revealed something gives an event of a new kind, `discovered`, with the minute and what it revealed — actions, conditions and items, each in the order of its data;
  - the Understanding belongs to the game: what one character discovers stands for the next one sent, and death, "Restart" and "Zakończ" leave it as it is.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` · `tests/sim/discovery.test.mjs` · `stryker.config.json` · `tests/sim/repertoire.test.mjs` (added by the orchestrator after the executor's `blocked` return: two of its tests run a partly knowing game past the first chill; Q-S9)
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/plan.md:135-146` Slice 8 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:41-47` Questions to settle, 1 and 2 · `.runs/task-cycles/odkrywanie/task.md:76-79` Questions to settle, 11 · `.runs/task-cycles/odkrywanie/task.md:84-102` Context · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/task.md:149-165` Settlements to record ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:401-421` D-20 · `foundations/decisions.md:528-552` D-25 · `foundations/decisions.md:1142-1156` D-60 · `foundations/decisions.md:1157-1171` D-61 · `foundations/decisions.md:1187-1201` D-63 · `foundations/decisions.md:1307-1321` D-71 · `foundations/decisions.md:1322-1336` D-72 · `foundations/decisions.md:1456-1468` D-82 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/decisions.md:1597-1618` D-92 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:165-175` map-run-repeatability · `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:244-257` program-rule-pick · `foundations/invariants.md:522-531` minute-span-split · `foundations/invariants.md:592-601` mutation-test-selection · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/body.ts` · `src/browser/sim/world.ts` · `src/browser/sim/data/balance.ts` · `tests/sim/program-fixture.mjs`
- **Model:** strongest — it places discovery inside D-71's order of the minute across `run.ts` and `game.ts`, with the rule written into the program and its count, which tasks 8 and 9 extend.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/discovery.test.mjs`, each expectation from the task (D-82, comment naming the vault's `odkrywanie_loop2.md` and its line): a new game sent with its program of one empty group waits until minute 84, where the mage is chilled (task Context, minute 83 35,008 °C, minute 84 34,984 °C), learns "Eksploruj", "Wędruj" and "Temperatura poniżej", gets "Zawsze → Eksploruj" in the group "Program" and starts exploring in minute 84; a program with no group gets the group "Program"; the first finished exploration reveals "Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej" and the items of that tile, read from the tile, and a later revealed tile adds its new items only; each further row of the table of To do 2 revealing exactly its row; a second chill and a known item reveal nothing; the rule written at the first chill counts its firing; a gathering ending in the minute of death reveals nothing; the Understanding standing after death, "Restart", "Zakończ" and for the next character sent. Then `npm test -- tests/sim/discovery.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts,src/browser/sim/run.ts,src/browser/sim/game.ts"`, each surviving mutant classified in the report.
- **Depends on:** Slices 1, 2, 8 · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding

### Slice 10 — game time stops after the minute of a discovery

- **Goal:** After a game minute that revealed something, the map run stands in the pause of "Pauza" and the game state holds what that minute revealed until the player moves on. In detail:
  - `advanceMinutes` ends its span at the minute of a discovery, whatever number of minutes it was given, and leaves the game paused (`paused`), as it ends today at the minute of death; called again it goes on from there, also while paused, as today;
  - `passRealTime`, where the span it passed ended at a discovery, keeps none of the real time it was given beyond that minute: `realMsCarry` is 0, and the run stays paused until `setPaused(false)`;
  - `GameState` gains a field `discovery`: what the last minute of a discovery revealed — actions, conditions and items as the event of Slice 9 gives them — or null; it is set with the pause and cleared when the player moves on: `setPaused(false)`, `restart`, `end` and `send`;
  - `player-map-run-pace` and `minute-span-split` stand in the foundation with the sentences of rows O4 and O5; their tests check the new sentences: a span of real time or of minutes crossing the first chill of a new game stops at that minute, paused, with no carry, and every split of such a span reaches the same state and events at every minute up to and including the minute of discovery.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/types.ts` · `tests/sim/discovery.test.mjs` · `tests/sim/time.test.mjs` · `tests/invariants/test_player_map_run_pace.py` · `tests/invariants/test_minute_span_split.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:93-107` Slice 5 · `.runs/task-cycles/odkrywanie/plan.md:148-165` Slice 9 · `.runs/task-cycles/odkrywanie/task.md:31-36` To do 5 and 6 · `.runs/task-cycles/odkrywanie/task.md:48-52` Questions to settle, 3 · `.runs/task-cycles/odkrywanie/task.md:76-79` Questions to settle, 11 · `.runs/task-cycles/odkrywanie/task.md:97-97` Context, pause and real time · `.runs/task-cycles/odkrywanie/task.md:102-102` Context, task 7 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:422-439` D-21 · `foundations/decisions.md:1172-1186` D-62 · `foundations/decisions.md:1307-1321` D-71 · `foundations/invariants.md:198-209` player-map-run-pace · `foundations/invariants.md:522-531` minute-span-split · O2 · O3 · O4 · O5 · "When does the player learn what the world holds?" ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py`
- **Model:** same — it rewrites two invariant tests to new sentences and decides how a span ends at a discovery.
- **Risk:** none
- **Checks:** first the failing cases: in `tests/sim/discovery.test.mjs`, `advanceMinutes` of a new game sent, given 100 minutes, ends at minute 84 paused with `discovery` holding what the chill revealed, and called again goes on; `passRealTime` of 100 000 ms ends at minute 84 paused with `realMsCarry` 0, and further real time moves nothing until `setPaused(false)`, which clears `discovery`; `restart`, `end` and `send` clear it; in `tests/sim/time.test.mjs`, nothing of its existing cases changes; the two invariant tests' new cases, marked with their invariants, each with a control seen failing. Then `npm test -- tests/invariants/test_player_map_run_pace.py`, `npm test -- tests/invariants/test_minute_span_split.py`, `npm test -- tests/sim/discovery.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts"`, each surviving mutant classified in the report.
- **Depends on:** Slices 6, 9 · O2 · O3 · O4 · O5 · "When does the player learn what the world holds?"

### Slice 11 — the program editor offers the repertoire

- **Goal:** The program editor's lists of conditions, actions and their targets offer the repertoire of the program's character (Slice 2, Q-C1), and "Dodaj regułę" is inactive while that repertoire holds no action. In detail:
  - the condition selects of rules and groups offer the repertoire's conditions; the action select its actions; the resource selects of "Tu leży mniej niż", "Idź" and "Zbierz" the repertoire's items that are resources of the shown map, in the map's order; the item select of "Zapas poniżej" the repertoire's items of the backpack; a choice that switches kind takes its first target from these lists; a select whose rule or group holds a value outside the list still shows that value, as the resource selects do today;
  - "Dodaj regułę" is the shared button disabled (D-44) while the repertoire holds no action, and appends "Zawsze → Eksploruj" as today once it holds one;
  - `src/browser/view/game-view.ts` updates the editor when the Understanding changes, as it does when the program or the run's map changes;
  - the body row, the backpack, the list of revealed tiles and the drawing of the map show what they show today (O7).
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/game-view.ts` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 · `.runs/task-cycles/odkrywanie/task.md:37-37` To do 7 · `.runs/task-cycles/odkrywanie/task.md:53-56` Questions to settle, 4 · `.runs/task-cycles/odkrywanie/task.md:60-63` Questions to settle, 6 · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:735-749` D-36 · `foundations/decisions.md:855-869` D-44 · `foundations/decisions.md:900-914` D-47 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:232-243` content-identifiers · O6 · O7 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/select-list.ts` · `src/browser/view/headquarters.ts:1-40` · `src/browser/sim/types.ts`
- **Model:** same — it rewires every list of the editor and its focus-preserving updates.
- **Risk:** none
- **Checks:** first the failing cases of `tests/view/program-editor.test.mjs`: a new game's editor offers "Zawsze" alone among conditions and no action, and its "Dodaj regułę" is disabled; after the first chill's Understanding it offers "Eksploruj" and "Wędruj" and "Temperatura poniżej", and "Dodaj regułę" appends "Zawsze → Eksploruj"; targets follow the Understanding's items within the shown map; a rule holding a value outside the lists still shows it. Then `npm test -- tests/view/program-editor.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and a manual check in the browser (`npm run build`, then the game served as `README.md` gives): a new game's lists and the inactive button, and their change after the first chill (D-88).
- **Depends on:** Slices 2, 5 · O6 · O7 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire

### Slice 12 — the line of what was discovered under the status row

- **Goal:** While the game state holds a discovery (Slice 10), a line under the status row says what was revealed, in the role `discovery`, and it goes when the player moves on. In detail:
  - the line's text is composed from the game state's `discovery` and the data: „Odkryto: ” followed by the labels of the revealed actions and the names of the revealed items, the campfire's included, each item's name with a capital first letter, joined by „, ”, closed by „.”; then, where conditions were revealed, „ W regułach można teraz sprawdzić: ” with each condition's label, followed for a condition that takes a number by „ … ” and its unit, joined by „, ” and closed by „.” — as the task's example: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”; a part with nothing revealed is left out;
  - the text is a pure exported function of `src/browser/view/status-row.ts`; the line is an element made once and updated in place, hidden while `discovery` is null, its colour from a rule of `src/browser/styles.css` reading `var(--discovery)`; `src/browser/view/game-view.ts` places it under the status row if the status row does not hold it;
  - the status row keeps „ (pauza)” and „Wznów” as for any pause.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:148-165` Slice 9 · `.runs/task-cycles/odkrywanie/plan.md:167-182` Slice 10 · `.runs/task-cycles/odkrywanie/task.md:31-35` To do 5 · `.runs/task-cycles/odkrywanie/task.md:48-52` Questions to settle, 3 · `.runs/task-cycles/odkrywanie/task.md:101-101` Context, styleguide ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:735-749` D-36 · `foundations/decisions.md:780-794` D-39 · `foundations/decisions.md:825-839` D-42 · `foundations/decisions.md:840-854` D-43 · `foundations/decisions.md:1172-1186` D-62 · `foundations/invariants.md:232-243` content-identifiers · `foundations/invariants.md:452-461` browser-view-token-values · O2 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/sim/types.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts`
- **Model:** same — it composes the line's text from data and places a new element of the screen.
- **Risk:** none
- **Checks:** first the failing cases of `tests/view/status-row.test.mjs`: the text for the first finished exploration of a tile with sticks and berries is the task's example; the text for the first chill; a discovery of an action alone has no second sentence; the line is shown while `discovery` is set and hidden after `setPaused(false)`. Then `npm test -- tests/view/status-row.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and a manual check in the browser: the line in the colour of `discovery` under the status row after the first chill, „ (pauza)” and „Wznów”, and the line gone after „Wznów” (D-88).
- **Depends on:** Slices 10, 11 · O2

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need — the editor offers only what was discovered, and time stops at a discovery | Slices 8–12 |
| To do 1 — the Understanding, the player's, one for all characters, unchanged by death, „Restart” and „Zakończ”, starting with "Zawsze" | Slice 2 (state, new game), Slice 9 (growth, kept across death, restart, end and characters); entries "When does the player learn what the world holds?", Understanding, "Whose is the knowledge…" |
| To do 2 — the chain of revelations of Las, items of each revealed tile, moss and fiber with exploration | Slice 1 (data), Slice 9 (in the minute); O9 |
| To do 3 — the repertoire computed from the Understanding through the archetype's predispositions, never saved; the five skills; the mage's predispositions | Slice 1 (data), Slice 2 (computation); "What does an archetype open to a character?", predisposition, archetype, repertoire |
| To do 4 — the editor offers the repertoire, the simulation carries out only it, rules outside it passed over and kept; views unchanged | Slice 2 (one computation), Slice 8 (simulation), Slice 11 (editor); O7, O8, "Whose is the knowledge…", `program-rule-pick` |
| To do 5 — discovery in the step that caused it, the pick in that minute sees it, none in the minute of death | Slice 9; O3 |
| To do 5 — time stops after the whole minute in the pause of „Pauza”, rest of real time lost | Slice 10; O2, O4 |
| To do 5 — the line in the role `discovery`, one line per minute, gone when the player moves on | Slice 10 (state), Slice 12 (line); O2 |
| To do 5 — `player-map-run-pace` and `minute-span-split` rewritten with their tests | Slice 10; O4, O5 |
| To do 6 — „Zawsze → Eksploruj” at the first chill, into the first group or a new group „Program” | Slice 9; O1 |
| To do 7 — „Dodaj regułę” inactive until the first action, then as in task 5 | Slice 11; O6 |
| Existing tests keep testing their rules once a new game knows "Zawsze" alone | Slices 3–7 |
| O1 | Slice 9 |
| O2 | Slices 10, 12 |
| O3 | Slices 9, 10 |
| O4 | Slice 10 |
| O5 | Slice 10 |
| O6 | Slice 11 |
| O7 | Slice 11 (no view other than the editor changes) |
| O8 | Slices 2, 8 |
| O9 | Slices 1, 9 |
| Q-C1 — the editor uses the repertoire of the program's character's archetype | Slice 2 (function), Slice 11 (use) |
| Q-C2 — the campfire in the Understanding under a data identifier, not a backpack item | Slices 1, 2 |
| Q-C3 — the chain and the skills in data files beside what they concern | Slice 1 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The simulation gates through `game.ts`: it gives `newMapRun` and `stepMinute` the program reduced to the character's repertoire, and the run-level functions keep their signatures and meaning | the repertoire threaded through `run.ts` and `program.ts` as a new argument — about a hundred direct calls in eight test files would change with it | a later rule that needs the repertoire inside the feasibility of an action threads it then, local to the simulation |
| A group whose condition lies outside the repertoire is passed over as a group whose condition does not hold | the program refused — O8 keeps a rule outside the repertoire in the program; the group's condition taken as holding — a condition the character does not know would steer it | low: the editor offers no such condition, so only a program set from outside reaches it |
| `run.ts` exports the minute up to the pick and the pick, `stepMinute` stays their composition, and `game.ts` lets the discoveries take hold between them | the Understanding and the program passed into `stepMinute`, which would then return them — changes every direct call of `stepMinute` | the split is local to the simulation; tasks 8 and 9 add their revealing events to the same place |
| A revealing event of an action counts where its effect took hold: a stick or a berry in the backpack, a campfire on the tile, a campfire lit or a stick burning; an exploration reveals the items whose resource the revealed tile holds | any finish of the action counts — a missed gathering would reveal "Wytwórz — ognisko" without a stick gathered | the reveal waits for the next action whose effect takes hold |
| The first chill is revealed in the minute of death too, since the body step reveals it before death (O3); an ending action's discovery is not (D-71) | no discovery at all in the minute of death | none in play: a chill at full health cannot kill in its first minute |
| The Understanding records actions, conditions and items by their data identifiers, the campfire under an identifier `campfire.ts` gives it (Q-C2) | the campfire made an item of the backpack | local to the simulation; the saved game of task 16 stores whichever form stands |
| The repertoire is computed from an Understanding and a list of predispositions, which the archetype's data supplies | from the archetype's identifier alone — with one archetype opening every skill, the filter of predispositions would stay untested | none: the caller reads the archetype's list |
| What the last discovery revealed stands in the game state (`discovery`) until the player moves on | the view keeping the events of the last call — the view draws from the game state (D-04), and a restart or a reload of the view would lose or keep it unpredictably | a transient field in the state, which the save of task 16 may leave out |
| `advanceMinutes` ends its span at the minute of a discovery and leaves the game paused; `passRealTime` drops the carry | the stop only in `passRealTime` — the span of minutes would run past a discovery, against O5 | none beyond the rewrite of both invariants, which the task asks for |
| The tests are moved to a fully knowing game in their own slices before the gating, and the gating slice changes none of them | the move inside the gating slice — over forty files in one slice | a test missed by the move fails in Slice 8, which returns it |
| The fixtures stand in `tests/sim/understanding-fixture.mjs` and `tests/invariants/program_fixture.py` | a new file under `tests/invariants/`, which the part map lists one by one | none: no part-map entry is needed |
| The type of a revealing event stands in the new data file `revelations.ts`, the revealing event of each entry beside it in its own catalogue | the whole chain in one table of its own | tasks 8 and 9 add a kind of revealing event in one file and its use beside the entry |
| "Dodaj regułę" is inactive while the repertoire holds no action | inactive while the Understanding holds no action | none with one archetype: the two are the same |
