# Handoff — executor of slice 8, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 8. Read it and what it names whole.
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
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-8-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

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

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-20 — `foundations/decisions.md:401-421` (plan gave `foundations/decisions.md:401-421`)
- D-23 — `foundations/decisions.md:466-501` (plan gave `foundations/decisions.md:466-501`)
- D-26 — `foundations/decisions.md:553-585` (plan gave `foundations/decisions.md:553-585`)
- D-92 — `foundations/decisions.md:1597-1618` (plan gave `foundations/decisions.md:1597-1618`)
- D-93 — `foundations/decisions.md:1619-1649` (plan gave `foundations/decisions.md:1619-1649`)
- map-run-repeatability — `foundations/invariants.md:165-175` (plan gave `foundations/invariants.md:165-175`)
- action-in-progress — `foundations/invariants.md:187-197` (plan gave `foundations/invariants.md:187-197`)
- program-rule-pick — `foundations/invariants.md:246-260` (plan gave `foundations/invariants.md:244-257`)
- program-closed-lists — `foundations/invariants.md:361-371` (plan gave `foundations/invariants.md:358-368`)
- O8 → D-126 — `foundations/decisions.md:2183-2207`
- Whose is the knowledge of the world, and what may a character use of it? → D-119 — `foundations/decisions.md:2014-2039`
- repertoire — `foundations/glossary.md:125-130`
- program-rule-pick — `foundations/invariants.md:246-260`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/run.ts`
- `src/browser/sim/program.ts`
- `src/browser/sim/types.ts`
- `tests/invariants/program_fixture.py`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

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
#### `.runs/task-cycles/odkrywanie/plan.md:93-107` — Slice 5

```text
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
```
#### `.runs/task-cycles/odkrywanie/task.md:30-30` — To do 4

```text
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
```
#### `.runs/task-cycles/odkrywanie/task.md:67-69` — Questions to settle, 8

```text
- 8. Co symulacja robi z regułą programu, której warunek, akcja albo cel nie należy do repertuaru postaci?
  - Answer: A — symulacja przechodzi nad taką regułą do następnej, jak nad akcją niewykonalną w tej minucie, a reguła zostaje w programie. Przyjęte z kosztem: reguła, która nigdy nie zadziała, stoi w programie bez znaku (znak z powodem nie wchodzi w to zadanie).
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Stan dziś, z fundamentu: niezmiennik `program-closed-lists` — “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” (dotyczy rodzaju spoza danych, nie repertuaru).
```
#### `.runs/task-cycles/odkrywanie/task.md:130-134` — Decisions in play, invariants and terms

```text
- `player-map-run-pace`: “Real time passed to the simulation for a map run the player starts moves the map run on, until it ends, by one game minute for each whole real second passed while it is not paused, and by no game minute for real time passed while it is paused.” — czas, który staje sam po minucie odkrycia w środku przekazanego odcinka czasu realnego, nie przesuwa przejścia o każdą sekundę tego odcinka, więc cykl zmienia ten niezmiennik i jego test (pytania 3 i 11); ostateczne brzmienie z przewijaniem pisze zadanie 7 (pytanie 10).
- `minute-span-split`: “A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the character's death.” — odcinek kończy się także na minucie odkrycia, więc cykl dopisuje to do niezmiennika i jego testu (pytanie 11).
- `program-closed-lists`: “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” — zostaje: dotyczy rodzaju spoza danych, a regułę spoza repertuaru symulacja pomija (pytanie 8).
- `content-identifiers`: “No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a resource or an archetype, outside its comments, by the identifier or the name that the files of `src/browser/sim/data/` give it.”
- Pojęcia: `character skill` — “A character skill is an area of what a character can do that grows apart from the character's other areas.”; `program rule` — “A program rule is a pair held by a program: a condition and an action of a character.”; `map run` — “A map run is one attempt of one character at one game map, from entering it until a completion, the character's death or the player stopping it.”
```

## Base

This slice starts at `76c2faad92c45a146ea4f53247a0a3305a6a5a8e` (slice 7 head). Slice 2 gave `src/browser/sim/understanding.ts` (`repertoireOf`, `ruleInRepertoire`, `programInRepertoire`, `editorRepertoire`); see `.runs/task-cycles/odkrywanie/reports/slice-2-report.md` § Choices and adaptations. Slices 3–7 moved the tests whose games are sent and then pass game time to a fully knowing game: `tests/sim/understanding-fixture.mjs` for Node tests, `KNOWING_GAME_JS` in `tests/invariants/program_fixture.py` for invariant drivers.

Test files those slices left on `newGame()` because, by their reading, no game in them is sent and then timed: `tests/sim/actions.test.mjs`, `campfire.test.mjs`, `conditions.test.mjs`, `data.test.mjs`, `gather.test.mjs` (its executor named `:316` and `:335` as the first candidates should the gating reach them), `traits.test.mjs` (its restart tests named as candidates), `world.test.mjs`, `tests/view/clock.test.mjs`. Your slice's *Checks* says what to do with a test outside *Change* that now fails.

`program-rule-pick` already stands with its new sentence (commit dcd529d, `foundations/invariants.md`); its test gains the case for it in this slice, with `invariant: program-rule-pick` on that case.

Known flaky tests outside this task: `tests/account-storage.test.mjs:357` (`5001 !== 5000`) and the container tests `test_built_image_serves_every_icon_and_the_page`, `test_replaced_container_keeps_accounts_and_sessions`, `test_container_serves_each_icon_with_the_file_bytes` (SQLite "database is locked") each failed once and passed alone; if one fails for you, rerun it alone and report both runs.

Test discipline: show each new test case failing before the code that makes it pass, and record that run (command and exit code) in your report.
