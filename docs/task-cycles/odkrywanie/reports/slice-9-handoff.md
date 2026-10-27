# Handoff — executor of slice 9, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 9. Read it and what it names whole.
- Worktree (only place you write): `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch
  `task/odkrywanie`. No other agent writes there while you work. Commit your work on that branch
  by explicit paths (`git add <path> …`, never `git add -A`, `git add .` or `git commit -a`),
  commit messages in English. Leave the worktree clean.
- Boundary: make only this slice, as its section below gives; change the files of its *Change*.
  Where the slice needs a file outside *Change*, an open design choice, or proves too large,
  return as your method gives (`returned`, no code for a design choice).
- Frozen task: `.runs/task-cycles/odkrywanie/task.md` (copy of the vault document
  `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/odkrywanie_loop2.md`, accepted
  2026-10-26). A test comment locating a documentary expectation names the vault file
  `odkrywanie_loop2.md` and its line (D-82); the frozen copy has the same lines.
- No spec. Trust boundary: no. Irreversible operation: no.
- The foundation entries of this task are already written (commit dcd529d): the rows of
  *Settlements to record* stand as O1 → D-123, O2 → D-122, O3 → D-71 (changed), O4 →
  player-map-run-pace, O5 → minute-span-split, O6 → D-124, O7 → D-125, O8 → D-126, O9 → D-121;
  the projected entries as D-118 (when the player learns what the world holds), D-119 (whose is the
  knowledge), D-120 (what an archetype opens); terms predisposition, archetype, Understanding,
  repertoire in `foundations/glossary.md`; program-rule-pick's sentence changed. Write no
  foundation entry; a foundation entry that no longer matches the code goes into your report.
- Checks already failing on the base d9a2374 (`.runs/task-cycles/odkrywanie/reports/00-baseline-gate.log`),
  environment, not this task: `test_loop2_one_serving_process` setUpClass (Get-NetTCPConnection
  finds no Listen objects), `test_ruff_source_rules` and `test_shellcheck_source_rules`
  (FileNotFoundError: ruff and shellcheck are not installed on this machine). `npm test` stops
  at the Python stage because of them, so after `npm test` also run
  `python -B .the-way/elements/common/foundation_check.py` on its own. Name every check that
  failed or did not run; an unrun check is unchecked, never passed.
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-9-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

### Slice 9 — discoveries in the order of the game minute, the Understanding growing and the rule at the first chill

- **Goal:** A game minute of a map run reveals what the task's chain gives, in the step of D-71 that caused it, and the pick at the end of that minute already uses what was revealed; time does not stop yet (Slice 10). In detail:
  - `src/browser/sim/run.ts` exports, beside an unchanged `stepMinute`, the minute up to the pick and the pick itself, so that `game.ts` can let the discoveries take hold between them; `stepMinute` stays those two together, with its signature and meaning;
  - `src/browser/sim/understanding.ts` gives what a minute reveals, from the map run before and after the minute up to the pick and its events, read against the revealing events of the data (Slice 1): the first chill — body temperature below the threshold of chill (`BALANCE.body.chilledBelow`) after the minute's body step; a finished exploration — the tile it revealed, with the items whose resource that tile holds; a gathering that put a stick or a berry into the backpack; a crafting that put a campfire on the tile; a "Zapal" whose lighting took hold, of a campfire or a stick; what is new enters the Understanding, and what the Understanding already holds reveals nothing;
  - in a minute in which the character dies, the effect of the ending action does not take hold, so it reveals nothing (D-71); the first chill, which the body step reveals, follows the body step as O3 gives;
  - at the first chill — the discovery of what the chill reveals — the game appends the rule "Zawsze → Eksploruj" to the first rule group of the program, with a fresh identity, or, where the program has no group, makes a group "Program" with the condition "Zawsze" and appends it there (O1); within a map run the rule's count starts from zero and counts its firings (D-92, D-93);
  - `advanceMinutes` threads the Understanding and the program through the minutes, and the game state after it holds both as they grew; a minute that revealed something gives an event of a new kind, `discovered`, with the minute and what it revealed — actions, conditions and items, each in the order of its data;
  - the Understanding belongs to the game: what one character discovers stands for the next one sent, and death, "Restart" and "Zakończ" leave it as it is.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` · `tests/sim/discovery.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/plan.md:135-146` Slice 8 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:41-47` Questions to settle, 1 and 2 · `.runs/task-cycles/odkrywanie/task.md:76-79` Questions to settle, 11 · `.runs/task-cycles/odkrywanie/task.md:84-102` Context · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/task.md:149-165` Settlements to record ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:401-421` D-20 · `foundations/decisions.md:528-552` D-25 · `foundations/decisions.md:1142-1156` D-60 · `foundations/decisions.md:1157-1171` D-61 · `foundations/decisions.md:1187-1201` D-63 · `foundations/decisions.md:1307-1321` D-71 · `foundations/decisions.md:1322-1336` D-72 · `foundations/decisions.md:1456-1468` D-82 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/decisions.md:1597-1618` D-92 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:165-175` map-run-repeatability · `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:244-257` program-rule-pick · `foundations/invariants.md:522-531` minute-span-split · `foundations/invariants.md:592-601` mutation-test-selection · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/body.ts` · `src/browser/sim/world.ts` · `src/browser/sim/data/balance.ts` · `tests/sim/program-fixture.mjs`
- **Model:** strongest — it places discovery inside D-71's order of the minute across `run.ts` and `game.ts`, with the rule written into the program and its count, which tasks 8 and 9 extend.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/discovery.test.mjs`, each expectation from the task (D-82, comment naming the vault's `odkrywanie_loop2.md` and its line): a new game sent with its program of one empty group waits until minute 84, where the mage is chilled (task Context, minute 83 35,008 °C, minute 84 34,984 °C), learns "Eksploruj", "Wędruj" and "Temperatura poniżej", gets "Zawsze → Eksploruj" in the group "Program" and starts exploring in minute 84; a program with no group gets the group "Program"; the first finished exploration reveals "Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej" and the items of that tile, read from the tile, and a later revealed tile adds its new items only; each further row of the table of To do 2 revealing exactly its row; a second chill and a known item reveal nothing; the rule written at the first chill counts its firing; a gathering ending in the minute of death reveals nothing; the Understanding standing after death, "Restart", "Zakończ" and for the next character sent. Then `npm test -- tests/sim/discovery.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts,src/browser/sim/run.ts,src/browser/sim/game.ts"`, each surviving mutant classified in the report.
- **Depends on:** Slices 1, 2, 8 · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-04 — `foundations/decisions.md:57-93` (plan gave `foundations/decisions.md:57-93`)
- D-20 — `foundations/decisions.md:401-421` (plan gave `foundations/decisions.md:401-421`)
- D-25 — `foundations/decisions.md:528-552` (plan gave `foundations/decisions.md:528-552`)
- D-60 — `foundations/decisions.md:1142-1156` (plan gave `foundations/decisions.md:1142-1156`)
- D-61 — `foundations/decisions.md:1157-1171` (plan gave `foundations/decisions.md:1157-1171`)
- D-63 — `foundations/decisions.md:1187-1201` (plan gave `foundations/decisions.md:1187-1201`)
- D-71 — `foundations/decisions.md:1307-1321` (plan gave `foundations/decisions.md:1307-1321`)
- D-72 — `foundations/decisions.md:1322-1336` (plan gave `foundations/decisions.md:1322-1336`)
- D-82 — `foundations/decisions.md:1456-1468` (plan gave `foundations/decisions.md:1456-1468`)
- D-90 — `foundations/decisions.md:1560-1578` (plan gave `foundations/decisions.md:1560-1578`)
- D-91 — `foundations/decisions.md:1579-1596` (plan gave `foundations/decisions.md:1579-1596`)
- D-92 — `foundations/decisions.md:1597-1618` (plan gave `foundations/decisions.md:1597-1618`)
- D-93 — `foundations/decisions.md:1619-1649` (plan gave `foundations/decisions.md:1619-1649`)
- map-run-repeatability — `foundations/invariants.md:165-175` (plan gave `foundations/invariants.md:165-175`)
- action-in-progress — `foundations/invariants.md:187-197` (plan gave `foundations/invariants.md:187-197`)
- simulation-inputs — `foundations/invariants.md:224-233` (plan gave `foundations/invariants.md:222-231`)
- program-rule-pick — `foundations/invariants.md:246-260` (plan gave `foundations/invariants.md:244-257`)
- minute-span-split — `foundations/invariants.md:525-534` (plan gave `foundations/invariants.md:522-531`)
- mutation-test-selection — `foundations/invariants.md:595-604` (plan gave `foundations/invariants.md:592-601`)
- O1 → D-123 — `foundations/decisions.md:2118-2140`
- O3 → D-71 — `foundations/decisions.md:1307-1321`
- O9 → D-121 — `foundations/decisions.md:2064-2093`
- When does the player learn what the world holds? → D-118 — `foundations/decisions.md:1990-2013`
- Whose is the knowledge of the world, and what may a character use of it? → D-119 — `foundations/decisions.md:2014-2039`
- Understanding — `foundations/glossary.md:118-124`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/program.ts`
- `src/browser/sim/body.ts`
- `src/browser/sim/world.ts`
- `src/browser/sim/data/balance.ts`
- `tests/sim/program-fixture.mjs`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

#### `.runs/task-cycles/odkrywanie/plan.md:33-48` — Slice 1

```text
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
```
#### `.runs/task-cycles/odkrywanie/plan.md:50-64` — Slice 2

```text
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
```
#### `.runs/task-cycles/odkrywanie/plan.md:135-146` — Slice 8

```text
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
```
#### `.runs/task-cycles/odkrywanie/task.md:14-37` — To do

```text
### To do

1. Gra trzyma Zrozumienie — zapis akcji, przedmiotów i warunków, które gracz odkrył — jako wiedzę gracza, jedną dla wszystkich postaci: to, co odkryje którakolwiek postać, wchodzi do niego dla wszystkich, a śmierć postaci, „Restart” i „Zakończ” go nie zmieniają. Nowa gra zaczyna Zrozumienie z warunkiem „Zawsze”; każda inna akcja, przedmiot i warunek wchodzi do niego przez odkrycie z punktu 2 (pytania 1 i 12).
2. Akcje, przedmioty i warunki Lasu wchodzą do Zrozumienia przez te odkrycia (pytanie 1):

   | Co odsłania | Co wchodzi do Zrozumienia |
   |---|---|
   | pierwsze wychłodzenie — pierwsza minuta gry, w której temperatura ciała jest poniżej progu wychłodzenia (35,0 °C, ten sam próg, od którego postać traci zdrowie, D-60) | akcje „Eksploruj”, „Wędruj”; warunek „Temperatura poniżej” |
   | pierwsza zakończona eksploracja | akcje „Idź” i „Zbierz”; warunki „Tu leży mniej niż” i „Zapas poniżej”; przedmioty leżące na odsłoniętym kafelku — każdy kolejny odsłonięty kafelek dokłada swoje |
   | pierwszy zebrany patyk | akcje „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”; ognisko |
   | pierwsze wytworzone ognisko | akcja „Idź — ognisko”; warunki „Zostało mniej niż — ognisko” i „Z dala od — ognisko” |
   | pierwsze zakończone „Zapal” (ogniska albo patyka) | akcja „Zasil — ognisko” |
   | pierwsza zebrana jagoda | akcja „Zjedz — jagoda”; warunek „Sytość poniżej” |

   Mech i włókno wchodzą do Zrozumienia z eksploracją kafelka, na którym leżą, choć nie mają jeszcze użycia.
3. Repertuar postaci wylicza się ze Zrozumienia przez predyspozycje jej archetypu i nie jest zapisywany. W danych gry stoi pięć umiejętności postaci, każda z parami czasownik × cel, które hoduje (pytanie 5): Eksploracja — „Eksploruj”; Zbieranie małych przedmiotów — „Zbierz” (każdy cel); Wytwarzanie ogniska — „Wytwórz — ognisko” i „Zasil — ognisko”; Jedzenie — „Zjedz” (każdy cel); Rzucanie czaru Płomyk, umiejętność własna maga — „Zapal” (każdy cel). „Wędruj”, „Idź” i „Idź — ognisko” nie hoduje żadna umiejętność, więc są otwarte dla każdej postaci. Mag żywiołów ma w predyspozycjach wszystkie pięć umiejętności.
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
5. Gdy coś się odsłoni, czas gry staje sam (pytania 3 i 11):
   - odkrycie zapada w kroku kolejności minuty gry (D-71), który je wywołał — wychłodzenie przy ciele, zakończona akcja przy jej skutku; reszta minuty dzieje się do końca, a wybór reguły na końcu tej minuty bierze już Zrozumienie i program po odkryciu, więc reguła wpisana przy odkryciu (punkt 6) może zadziałać jeszcze w tej minucie; w minucie śmierci skutek kończącej się akcji nie zapada (D-71), więc nie zapada też jej odkrycie;
   - czas staje po całej minucie, w tę samą pauzę co po „Pauza”: wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów”; reszta czasu realnego przekazanego w chwili odkrycia przepada;
   - pod wierszem stanu staje linia tekstem w roli `discovery` z tym, co odsłonięto, słowami jak w kronice loop (`src/sim/sim.test.ts:633`, loop `cdc7c0d`) — przykład z materiału pytania 3: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”; kilka odsłonięć jednej minuty idzie w jednej linii; linia znika, gdy gracz ruszy dalej;
   - cykl przepisuje niezmiennik `player-map-run-pace` (odcinek czasu przerwany odkryciem nie przesuwa przejścia o każdą sekundę) i `minute-span-split` (odcinek minut kończy się także na minucie odkrycia), każdy z jego testem.
6. Przy pierwszym wychłodzeniu gra dopisuje regułę „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy program nie ma żadnej grupy, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje regułę do niej (pytanie 2).
7. Do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a potem dokłada „Zawsze → Eksploruj” jak w zadaniu 5 (pytanie 4).
```
#### `.runs/task-cycles/odkrywanie/task.md:41-47` — Questions to settle, 1 and 2

```text
- 1. Co odsłania co — które zdarzenie gry wprowadza do Zrozumienia które akcje, przedmioty i warunki Lasu, i co gracz zna od startu nowej gry?
  - Answer: A — łańcuch odsłonięć z tabeli przedstawionej człowiekowi, w tym wiersz „pierwsze wytworzone ognisko” jako propozycja: start nowej gry — warunek „Zawsze”; pierwsze wychłodzenie — „Eksploruj”, „Wędruj”, „Temperatura poniżej”; pierwsza zakończona eksploracja — „Idź”, „Zbierz”, „Tu leży mniej niż”, „Zapas poniżej” i przedmioty leżące na odsłoniętym kafelku, każdy kolejny kafelek dokłada swoje; pierwszy zebrany patyk — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, ognisko; pierwsze wytworzone ognisko — „Idź — ognisko”, „Zostało mniej niż — ognisko”, „Z dala od — ognisko”; pierwsze zakończone „Zapal” (ogniska albo patyka) — „Zasil — ognisko”; pierwsza zebrana jagoda — „Zjedz — jagoda”, „Sytość poniżej”. Przyjęte z kosztem drogi A podanym w pytaniu: mech i włókno wchodzą do Zrozumienia razem z eksploracją, choć nie mają jeszcze użycia; „Zasil” odsłania też zapalenie samego patyka; wiersz „pierwsze wytworzone ognisko” przesuwa warunki ogniska później niż w loop, a „Idź — ognisko” nie ma źródła. Wiersz „start nowej gry” przeczył zatwierdzonemu wtedy brzmieniu definicji; rozstrzyga go pytanie 12 (A: zostaje, zmieniła się definicja).
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” — odpowiedź na pakiet pytań zadania 6, który orkiestrator projektu przedstawił w rozmowie refinementu (`.runs/project-refinement/odkrywanie.md` w loop2, Turn 8), czytana wobec rekomendacji A. Materiał pytania (nie uprawnienie): koncepcja `koncepcja_projektowa.md`, §5 „Odkrywanie idzie dwiema osiami” — „Kolejność: wychłodzenie odsłania Eksploruj, Wędruj i Otul, pierwsza eksploracja odsłania Zbierz, Idź, Wyczuj, to, co leży na odsłoniętych kafelkach, i warunek „Tu leży mniej niż", pierwsze zebrane patyki odsłaniają Wytwórz, Zapal i ognisko, a z ogniskiem warunki o nim („Zostało mniej niż", „Z dala od"), pierwsze rozpalenie odsłania Zasil […], pierwsze zebrane jagody odsłaniają Zjedz i miarę sytości”; dane loop `cdc7c0d` (`src/sim/data/activities.ts:29`, `:34`, `:36`–`37`, `:41`, `:43`–`45`; `conditions.ts:29`, `:36`, `:53`, `:84`, `:101`, `:118`, `:130`; `items.ts:155`).
  - Fakt z kodu, osobno: dane loop2 wymieniają dziś dziesięć akcji (`src/browser/sim/data/actions.ts:15`–`40`), siedem warunków (`src/browser/sim/data/conditions.ts:20`–`61`) i cztery przedmioty plecaka — patyk, jagoda, mech, włókno (`src/browser/sim/data/items.ts:28`–`37`); tabela stawia każdą akcję i każdy warunek w dokładnie jednym wierszu; loop2 `9a5f360`.
- 2. Czy przy pierwszym wychłodzeniu gra sama dopisuje do programu regułę „Zawsze → Eksploruj”, jak w loop?
  - Answer: A — przy pierwszym wychłodzeniu gra dopisuje „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy program nie ma żadnej grupy, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje do niej. Przyjęte z kosztem: gra raz w całej grze zmienia program gracza bez jego ruchu; gracz widzi regułę w edytorze i może ją usunąć.
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Materiał, nie odpowiedź: dokument zadania 5 `_zadania/grupy_regul_i_liczniki_loop2.md` (ready for cycle, przyjęty 2026-10-24; sha256 2962181907a4), § Out of scope: „Odkrywanie warunków i czynności, w tym reguła wpisywana graczowi przy odkryciu — zadanie 6.”; testy loop `src/sim/sim.test.ts:592`, `src/sim/movement.test.ts:170` (`cdc7c0d`).
```
#### `.runs/task-cycles/odkrywanie/task.md:76-79` — Questions to settle, 11

```text
- 11. W której chwili minuty gry zapada odkrycie i od której minuty działa reguła wpisana przy odkryciu?
  - Answer: A — odkrycie zapada w kroku, który je wywołał; reszta minuty dzieje się do końca, a program wybiera regułę już ze Zrozumienia i programu po odkryciu, więc reguła wpisana przy odkryciu może zadziałać jeszcze w tej minucie; czas staje po całej minucie. Przykład z materiału: w 84. minucie mag się wychładza, poznaje „Eksploruj”, a wybór reguły na końcu tej minuty już zaczyna eksplorację; po wznowieniu mag eksploruje. Przyjęte z kosztem: kolejność D-71 dostaje zdanie o odkryciu (gdzie zapada i że wybór widzi jego skutek); zatrzymanie wypada między minutami, więc `minute-span-split` zostaje przy brzmieniu o całych minutach, a nowe brzmienie dopisze, że odcinek kończy się także na minucie odkrycia. Przypadek brzegowy: w minucie śmierci skutek kończącej się akcji nie zapada (D-71), więc nie zapada też jej odkrycie.
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Cytaty materiału: D-71 (`foundations/decisions.md`, loop2 `9a5f360`), niezmiennik `minute-span-split` (`foundations/invariants.md`).
  - Fakt z kodu, osobno: minuta gry idzie jedną funkcją w kolejności D-71 (`stepMinute`, `src/browser/sim/run.ts:302`–`309`), a odcinek minut (`advanceMinutes`, `src/browser/sim/game.ts:366`–`391`) liczy całe minuty i zatrzymuje się na granicy minuty, w której postać umiera; loop2 `9a5f360`.
```
#### `.runs/task-cycles/odkrywanie/task.md:84-102` — Context

```text
## Context

- Cel z planu: „Czynności, przedmioty i warunki pojawiają się w edytorze programu dopiero wtedy, gdy postać je odkryje w grze, a w chwili odkrycia czas gry sam staje.”
- Punkt 9 „In scope” definicji `definicja_mvp_loop2.md`, który zadanie realizuje według planu: „Odkrywanie kaskadowe: czynności, przedmioty i warunki odsłaniają się w trakcie gry; wiedza o nich (Zrozumienie) należy do gracza, a repertuar postaci wylicza się z niej (D13, D38).”
- Zadanie zależy według planu od zadania 4 ognisko-i-jedzenie (done, PR #25) i od zadania 5 grupy-regul-i-liczniki (w cyklu; pytanie 9); od zadania 6 zależą zadanie 7 rozwiazanie-lasu (pytanie 10), zadania 8 walka-w-glebi-lasu i 9 plomyk, które dopisują do mechanizmu odkrywania własne odsłonięcia (pierwsza napaść wilka — czasowniki walki; pierwsze rozpalenie — warunek „Energia natury poniżej”), oraz zadanie 10 wprawa-i-drzewa, które dokłada gałęzie drzew do repertuaru.
- Koncepcja (`koncepcja_projektowa.md`, §5 „Odkrywanie idzie dwiema osiami”): „Kolejność: wychłodzenie odsłania Eksploruj, Wędruj i Otul, pierwsza eksploracja odsłania Zbierz, Idź, Wyczuj, to, co leży na odsłoniętych kafelkach, i warunek „Tu leży mniej niż", pierwsze zebrane patyki odsłaniają Wytwórz, Zapal i ognisko, a z ogniskiem warunki o nim („Zostało mniej niż", „Z dala od"), pierwsze rozpalenie odsłania Zasil i — postaci z energią — warunek „Energia natury poniżej", pierwsze zebrane jagody odsłaniają Zjedz i miarę sytości, pierwszy wilk odsłania czasowniki walki, Iskrę, Podmuch, Napraw i warunki o zdrowiu. […] Gdy coś się odsłoni, zegar gry staje sam.”
- Koncepcja (`koncepcja_projektowa.md`, D13): „pierwszy run jest z natury liniowym samouczkiem — łańcuch ma jedną poprawną sekwencję i nie ma w nim wyboru. Strojenie zaczyna się dopiero w drugim runie”.
- Czary Otul, Wyczuj, Iskra, Podmuch i Napraw są poza MVP (definicja, § Out of scope: „Czary maga poza Płomykiem: Otul, Wyczuj, Napraw, Iskra, Podmuch, Zawierucha.”), więc łańcuch z punktu 2 „To do” ich nie ma.
- Definicja pozwala zadaniom czytać z kodu loop (`C:\Storage\repos\loop`) wyłącznie pliki danych (`src/sim/data/`) i testy.
- Dane loop (commit `cdc7c0d`): każda czynność, przedmiot i warunek ma pole `revealedBy` — zdarzenie, które go odsłania (`src/sim/data/activities.ts:14`, `src/sim/data/conditions.ts:19`, `src/sim/data/items.ts:34`); wyzwalaczem jest pierwsze wychłodzenie, pierwszy głód, czynność, przedmiot albo stworzenie (`src/sim/types.ts:71`); warunek „Zawsze” nie ma wyzwalacza i jest znany od startu (`src/sim/data/conditions.ts:29`); warunki ogniska odsłania w loop ognisko jako przedmiot (`revealedBy: 'fireplace'`, `conditions.ts:101`, `:130`), które odsłania pierwszy patyk (`items.ts:155`).
- Testy loop (`src/sim/sim.test.ts`, commit `cdc7c0d`): nic nie jest odsłonięte, dopóki postać nie zmarznie (`:586`); pierwsze wychłodzenie odsłania eksplorację i zostawia regułę-samouczek „Zawsze → Eksploruj” w grupie „Program” (`:592`); lista warunków nie zdradza ogniska, zanim gracz o nim wie (`:607`); razem ze zbieraniem i surowcami przychodzi warunek o zapasie (`:625`); kronika nazywa odkrycie słowami „Odkryto: Idź, Zbierz, Wyczuj, Patyk, Jagoda, Mech, Włókno” i „W regułach można teraz sprawdzić: Zapas poniżej … szt., Tu leży mniej niż … szt.” (`:633`); miara sytości przychodzi z pierwszymi jagodami, nie z pierwszym głodem (`:652`); dopiero zebranie patyków odsłania wytwarzanie, zapalanie i ognisko (`:659`).
- Testy loop (commit `cdc7c0d`): pierwsze rozejrzenie się odsłania to, co leży na tym kafelku, nie na mapie, a kolejny odsłonięty kafelek dokłada swoje przedmioty (`src/sim/resources.test.ts:158`, `:172`); repertuar maga to cała wiedza gracza poza tym, czego nie wykupił (`src/sim/focus.test.ts:30`).
- Kod loop2 (`9a5f360`): edytor programu buduje listy warunków, akcji i przedmiotów z całych katalogów danych `CONDITIONS`, `ACTIONS` i `OFFERED_ITEMS` (`src/browser/view/program-editor.ts:382`–`391`); „Dodaj regułę” dokłada „Zawsze → Eksploruj” (`src/browser/view/program-editor.ts:126`–`133`).
- Kod loop2 (`9a5f360`): nowa gra zaczyna z programem bez reguł (`src/browser/sim/game.ts:222`–`232`); pauza to pole `paused` stanu gry, a „Pauza”/„Wznów” w wierszu stanu je przełącza (`src/browser/sim/game.ts:335`–`338`, `src/browser/view/status-row.ts:41`–`44`); wiersz stanu pisze „Minuta {minuta} · {czynność}”, z „ (pauza)” w czasie pauzy (`src/browser/view/status-row.ts:31`–`35`); czas realny wchodzi do przejścia jedną funkcją `passRealTime` (`src/browser/sim/game.ts:346`–`357`).
- Kod loop2 (`9a5f360`): archetyp w danych ma dziś samą nazwę, a każda zakładana postać jest magiem żywiołów (`src/browser/sim/data/archetypes.ts:6`, `:12`); umiejętności postaci w kodzie jeszcze nie ma; ognisko nie jest przedmiotem plecaka, tylko osobnym obiektem kafelka (`src/browser/sim/data/items.ts:28`–`37`, `src/browser/sim/types.ts:86`).
- Kod loop2 (`9a5f360`): ciało stygnie na Lesie o 0,024 °C na minutę (0,002 × (37,0 − 25)) i jest wychłodzone poniżej 35,0 °C (`src/browser/sim/data/balance.ts:9`, `:13`, `:16`; `src/browser/sim/data/maps.ts:32`), więc mag bez ognia jest wychłodzony w 84. minucie gry (minuta 83: 35,008 °C; minuta 84: 34,984 °C) i od tej minuty traci zdrowie (D-60); pierwsze przejście nowej gry zaczyna się więc od 84 sekund przy tempie 1×, w których mag stoi, bo żadna akcja nie jest znana.
- Zadanie 5 grupy-regul-i-liczniki jest w cyklu; jego dokument (`_zadania/grupy_regul_i_liczniki_loop2.md`, ready for cycle 2026-10-24) przebudowuje program na grupy reguł, ustala, że nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”, a „Dodaj regułę” w każdej grupie dokłada „Zawsze → Eksploruj”, i wyłącza ze swojego zakresu „Odkrywanie warunków i czynności, w tym reguła wpisywana graczowi przy odkryciu — zadanie 6.”
- Styleguide (`guidelines/styleguide-browser-view.md:30`, § Roles) opisuje rolę tekstu `discovery` znaczeniem „Odkryto coś nowego.” (D-39), a stan nieaktywnej kontrolki tekstem w `text-disabled` (`:26`, `:172`).
- Zadanie 7 rozwiazanie-lasu wnosi przewijanie czasu ręcznego przejścia w tej samej funkcji `passRealTime`; idzie w cykl po tym zadaniu i pisze ostateczne brzmienie `player-map-run-pace` z obiema zmianami (pytanie 10).
```
#### `.runs/task-cycles/odkrywanie/task.md:113-147` — Decisions in play

```text
## Decisions in play

Obecny fundament loop2 (`9a5f360`):

- D-04 „What is the game built with?”: “The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions that take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The browser view draws the game only from the game state and the game's content data, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time.”
- D-18 „Where does the game's content live?”: “The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.”
- D-20 „What interrupts the character's action in progress?”: “Neither a change of the program nor the condition of another program rule interrupts the character's action in progress. The program picks a program rule again only once the character's action ends.”
- D-21 „How does time pass in a map run the player starts?”: “A map run the player starts passes at one game minute per real second, and the player can pause and resume it.”
- D-23 „How does a character act by its program?”: “A character acts only by its program: in each free game minute it carries out the first program rule whose condition holds and whose action of the character can be carried out then. Conditions are chosen from a closed list, never written as expressions, and the player has no way to carry out a character's action by hand.” — zadanie 5 zapisuje jego nowe brzmienie, którego przykład zgodności mówi: “a condition picker listing the conditions of the repertoire”.
- D-25 „How does a character move?”: “A move onto a neighbouring tile is an ordinary action of the character, after which the program picks a program rule anew, as after any action of the character. Exploring reveals the tile the character stands on, cannot be repeated on a revealed tile and brings no item, and gathering takes only from a revealed tile, as much as lies on it.”
- D-39 „What do the signal colours of the browser view mean?”: “[…] `discovery` means that something new was discovered; and `player-change` means that the player did it. […]”
- D-44 „Which controls do the screens of the browser view build on?”: “The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field — and the buttons „Zakończ”, „Usuń” and „Restart” are destructive buttons. The state of loading applies to no shared control while none of them waits for a server.” — nieaktywne „Dodaj regułę” (punkt 7 „To do”) to wspólny przycisk w stanie disabled.
- D-60 „When does a character lose and regain health?”: “A character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — […]”
- D-62 „What does the screen show, and what can the player do, after a character's death?”: “After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character.”
- D-63 „How does a character light a campfire or a stick?”: “A character lights a campfire and a stick with „Zapal”, an ordinary action of the character whose price is the sticks it uses.” — zadanie 9 robi z „Zapal” czar Płomyk.
- D-71 „In what order does a game minute of a map run take effect?”: “A game minute of a map run takes effect in this order: first the character's body — its temperature cools by the game map's ambient temperature and warms by what burns on its tile, its satiety falls, and its health is lost for being chilled or starving in that minute or regained for being neither; then, where its health has reached zero, the character dies in that minute and the map run ends there; otherwise what burns loses a minute of burning, tiles renew their stock, the action of the character ending in that minute takes effect, and the program picks a program rule from what that minute has made.” — odkrycie zapada w tej kolejności według pytania 11.
- D-82 „Which product documents supply test expectations?”: “Test expectations may come from the loop2 foundation, accepted task documents in `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/` and its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” — łańcuch odsłonięć i umiejętności z punktów 2 i 3 „To do” są oczekiwaniami testów z tego dokumentu po jego przyjęciu. Pozostałe decyzje testowania (D-73–D-89) niesie `guidelines/testing.md`.
- `player-map-run-pace`: “Real time passed to the simulation for a map run the player starts moves the map run on, until it ends, by one game minute for each whole real second passed while it is not paused, and by no game minute for real time passed while it is paused.” — czas, który staje sam po minucie odkrycia w środku przekazanego odcinka czasu realnego, nie przesuwa przejścia o każdą sekundę tego odcinka, więc cykl zmienia ten niezmiennik i jego test (pytania 3 i 11); ostateczne brzmienie z przewijaniem pisze zadanie 7 (pytanie 10).
- `minute-span-split`: “A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the character's death.” — odcinek kończy się także na minucie odkrycia, więc cykl dopisuje to do niezmiennika i jego testu (pytanie 11).
- `program-closed-lists`: “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” — zostaje: dotyczy rodzaju spoza danych, a regułę spoza repertuaru symulacja pomija (pytanie 8).
- `content-identifiers`: “No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a resource or an archetype, outside its comments, by the identifier or the name that the files of `src/browser/sim/data/` give it.”
- Pojęcia: `character skill` — “A character skill is an area of what a character can do that grows apart from the character's other areas.”; `program rule` — “A program rule is a pair held by a program: a condition and an action of a character.”; `map run` — “A map run is one attempt of one character at one game map, from entering it until a completion, the character's death or the player stopping it.”

Wpisy projektowane definicji `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a; § Projected foundation changes i § Glossary); przydział według planu `plan_mvp_loop2.md`, § Projected entries, zadanie 6.

Zadanie zapisuje:

- „(new) — When does the player learn what the world holds?” (urzeczywistniają zadania 6, 8, 9 i 10, zapisuje zadanie 6): “The condition "Always" is in the Understanding from the start of a new game; every other action, item and condition enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it. When something is discovered, game time stops by itself.” — zadania 8, 9 i 10 dopisują własne odsłonięcia; zdanie o warunku „Zawsze” to odpowiedź A na pytanie 12.
- „(new) — What does an archetype open to a character?” (urzeczywistnia i zapisuje zadanie 6): “An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype. An action that no character skill grows, such as a move onto a neighbouring tile, is open to every character, and an archetype never filters items.”
- Pojęcia: `predisposition` — “A predisposition is a character skill that a character's archetype lets the character learn.”; `archetype` — “An archetype is the kind of character that sets its predispositions.”; `repertoire` — “A character's repertoire is the subset of the Understanding that the character can use in a program.”

Zadanie urzeczywistnia część i zapisuje tę część, a resztę zapisuje zadanie 10 (WAY-126):

- Pojęcie `Understanding` (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered, together with the condition "Always", which it holds from the start of a new game.” — prawdziwe po tym zadaniu: zapis akcji, przedmiotów i warunków, które gracz odkrył, razem z warunkiem „Zawsze” od startu nowej gry; gałęzie wnosi i dopisuje zadanie 10 (plan, dziennik zmian 2026-10-26: „zadanie 6 zapisuje część, którą prawdziwą czyni jego kod (akcje, przedmioty i warunki oraz warunek „Zawsze” od startu nowej gry), a zadanie 10 dopisuje resztę (WAY-126)”; decyzja człowieka 2026-10-26, odpowiedź A na pytanie Q13 rozmowy refinementu zadania 6).
- „(new) — Whose is the knowledge of the world, and what may a character use of it?” (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding belongs to the player and is saved once for all characters, and what any character discovers enters it for every character. A character's repertoire is computed from the Understanding through its archetype's predispositions and the branches the character has bought, and is never saved; an action or item of a bought branch is open only to the character that bought it. That one computation is at once what the program editor offers and what the simulation lets the character carry out.” — prawdziwe po tym zadaniu: Zrozumienie należy do gracza, jedno dla wszystkich postaci, a odkrycie którejkolwiek postaci wchodzi do niego dla wszystkich; repertuar wylicza się ze Zrozumienia przez predyspozycje archetypu i nie jest zapisywany; jedno wyliczenie służy edytorowi i symulacji. Gałęzie wykupione przez postać wnosi zadanie 10, a zapis stanu gry na serwerze zadanie 16.
```
#### `.runs/task-cycles/odkrywanie/task.md:149-165` — Settlements to record

```text
## Settlements to record

Candidates: 10 shown, 9 accepted — 2026-10-26

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| O1 | Przy pierwszym wychłodzeniu gra dopisuje regułę „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy program nie ma żadnej grupy, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje regułę do niej. | decision | pytanie 2 (A; Mariusz, 2026-10-25); „Zawsze” to nazwa warunku z zamkniętej listy, nie słowo wykluczające; „program” znaczy tu jeden program gry, jaki gra ma dziś (`GameState.program`, `src/browser/sim/types.ts:148`, loop2 `9a5f360`) — do którego programu reguła trafia, gdy zadanie 12 wniesie kopię programu wykonywaną przez przejście, rozstrzyga zadanie 12: plan stawia mu pytanie „Do którego programu gra wpisuje regułę przy odkryciu, gdy przejście wykonuje kopię programu — do kopii, do zapisanego programu czy do obu?” (plan_mvp_loop2.md, § Open questions, i wpis § Change log z 2026-10-25; decyzja człowieka 2026-10-25) | czy gra zmienia program gracza przy odkryciu i do której grupy wpisuje regułę — także w zadaniach 8 i 9, które dopisują własne odsłonięcia |
| O2 | Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto. | decision | pytanie 3, wybory (1) P i (2) A (Mariusz, 2026-10-25) | czy zatrzymanie przy odkryciu jest osobnym stanem gry z własnym przyciskiem i jak długo stoi komunikat — także w zadaniu 7, które ustala tempo po pauzie (rozmowa rozwiazanie-lasu, Q4), i w zadaniach 8 i 9, których odkrycia zatrzymują czas |
| O3 | Odkrycie zapada w kroku minuty gry, który je wywołał — wychłodzenie przy ciele, zakończona akcja przy jej skutku — reszta minuty dzieje się do końca, wybór reguły na końcu tej minuty widzi już to, co odkryto, i regułę wpisaną przy odkryciu, a czas staje po całej minucie. | decision | pytanie 11 (A; Mariusz, 2026-10-25), z kosztem drogi A: „kolejność D-71 dostaje zdanie o odkryciu” | czy dopisać odkrycie do D-71 i czy reguła wpisana przy pierwszym wychłodzeniu rusza w tej samej minucie — także dla odkryć walki zadania 8 |
| O4 | Czas realny przekazany symulacji dla przejścia mapy rozpoczętego przez gracza przesuwa je, aż się skończy, o minutę gry na każdą pełną sekundę realną poza pauzą, a w pauzie przejście stoi; po minucie gry, w której coś odkryto, przejście staje w pauzie, a reszta czasu realnego przekazanego w tym samym wywołaniu przepada. | invariant | pytanie 3, część wspólna wszystkich dróg („reszta czasu realnego przekazanego w chwili odkrycia przepada, a niezmiennik `player-map-run-pace` […] trzeba przepisać”), z (1) P, i pytanie 11 (A) (Mariusz, 2026-10-25) | nowe brzmienie `player-map-run-pace` i jego test, na którym zadanie 7 buduje brzmienie z przewijaniem (pytanie 10) |
| O5 | Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do minuty śmierci postaci albo minuty odkrycia włącznie. | invariant | pytanie 11 (A; Mariusz, 2026-10-25), z materiału: „`minute-span-split` może zostać przy brzmieniu o całych minutach (nowe brzmienie dopisze tylko, że odcinek kończy się także na minucie odkrycia)” | czy `minute-span-split` i jego test obejmują odcinek przerwany odkryciem |
| O6 | Do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a od niego dokłada regułę „Zawsze → Eksploruj” na końcu grupy. | decision | pytanie 4 (A; Mariusz, 2026-10-25) | co robi „Dodaj regułę”, gdy gracz nie zna żadnej akcji — także w zadaniu 12, które wnosi programy gracza |
| O7 | Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazywały przed odkrywaniem. | decision | pytanie 6 (A; Mariusz, 2026-10-25); to, że odkrywanie decyduje o listach edytora programu i o tym, co symulacja pozwala postaci wykonać, mówi już wpis projektowany „Whose is the knowledge of the world, and what may a character use of it?” (“That one computation is at once what the program editor offers and what the simulation lets the character carry out.”), więc wiersz tego nie powtarza | czy wiersz ciała ukrywa sytość przed odkryciem „Sytość poniżej”, a plecak albo mapa nieodkryte przedmioty — także w zadaniach 8–10, które dokładają miary i przedmioty |
| O8 | Symulacja przechodzi nad regułą programu, której warunek, akcja albo cel nie należy do repertuaru postaci, do następnej reguły, jak nad akcją niewykonalną w tej minucie, a reguła zostaje w programie. | decision | pytanie 8 (A; Mariusz, 2026-10-25); obok `program-closed-lists`, który dotyczy rodzaju spoza danych | czy symulacja odrzuca cały program z regułą spoza repertuaru — także przy programach przenoszonych między postaciami w zadaniu 12 i przy drugim archetypie |
| O9 | Akcje, przedmioty i warunki Lasu wchodzą do Zrozumienia przez odkrycia z tabeli punktu 2 „To do”. | decision | pytanie 1 (A; Mariusz, 2026-10-25) | czy łańcuch Lasu wiąże po scaleniu i gdzie stoi to, co co odsłania: wpis projektowany „When does the player learn what the world holds?” niesie samą zasadę, a D-18 wymienia jako treść w plikach danych “game maps, items, creatures, character skills and their numbers”, a nie odsłonięcia, więc bez wiersza łańcuch nie ma miejsca w fundamencie, a cykl sam wybiera, czy odsłonięcia stoją w plikach danych przy akcjach, przedmiotach i warunkach (jak pole `revealedBy` w danych loop), czy w kodzie symulacji — a od tego zależy, czy zadania 8 i 9 dopiszą swoje odsłonięcia samą zmianą danych |

Cięcie: Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami” (Turn 14 rozmowy refinementu zadania 6) — wiersze O1–O9 przyjęte; odrzucony, zgodnie z propozycją, wiersz „Pięć umiejętności postaci z parami czasownik × cel i predyspozycje maga żywiołów z punktu 3 „To do””: jego treść stoi w punkcie 3 „To do” i w plikach danych gry (D-18), a zasadę niesie wpis projektowany „What does an archetype open to a character?”. Brzmienie wierszy według odpowiedzi na pytanie 7 (B).
```

## Base

This slice starts at `0044ccb3f30b9e42a1bfbcf7c8485ad036500c1b` (slice 8 head). Slice 1 gave the data (`src/browser/sim/data/skills.ts`, `revelations.ts` with the `Revelation` kinds, `revealedBy` on actions, conditions, items and `CAMPFIRE`; see `.runs/task-cycles/odkrywanie/reports/slice-1-report.md` § Files). Slice 2 gave `src/browser/sim/understanding.ts` and `GameState.understanding` (`reports/slice-2-report.md` § Choices and adaptations). Slice 8 made `game.ts` give `newMapRun` and `stepMinute` the program reduced to the character's repertoire (`reports/slice-8-report.md`). Tests whose games are sent and timed start from a fully knowing game (`tests/sim/understanding-fixture.mjs`, `KNOWING_GAME_JS` in `tests/invariants/program_fixture.py`), so nothing is discovered in them.

The foundation entries of this task stand in `foundations/` (commit dcd529d): O1 → D-123, O3 → D-71 (its changed sentence), O9 → D-121, D-118, D-119; their current ranges are listed above.

Known flaky tests outside this task: `tests/account-storage.test.mjs:357` (`5001 !== 5000`) and the container tests `test_built_image_serves_every_icon_and_the_page`, `test_replaced_container_keeps_accounts_and_sessions`, `test_container_serves_each_icon_with_the_file_bytes` (SQLite "database is locked" or Docker exit 137) each failed once and passed alone; if one fails for you, rerun it alone and report both runs.

Test discipline: show each new test case failing before the code that makes it pass, and record that run (command and exit code) in your report.
