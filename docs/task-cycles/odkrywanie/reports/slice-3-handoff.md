# Handoff — executor of slice 3, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 3. Read it and what it names whole.
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
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-3-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

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

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.


## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/types.ts`
- `src/browser/sim/game.ts:315-334`
- `tests/sim/program-fixture.mjs`

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
#### `.runs/task-cycles/odkrywanie/task.md:16-16` — To do 1

```text
1. Gra trzyma Zrozumienie — zapis akcji, przedmiotów i warunków, które gracz odkrył — jako wiedzę gracza, jedną dla wszystkich postaci: to, co odkryje którakolwiek postać, wchodzi do niego dla wszystkich, a śmierć postaci, „Restart” i „Zakończ” go nie zmieniają. Nowa gra zaczyna Zrozumienie z warunkiem „Zawsze”; każda inna akcja, przedmiot i warunek wchodzi do niego przez odkrycie z punktu 2 (pytania 1 i 12).
```
#### `.runs/task-cycles/odkrywanie/task.md:30-30` — To do 4

```text
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
```

## Base

This slice starts at `339f94fdf91868911e81c6342dfef239d935c9b2` (slice 2 head). Slice 2 added `src/browser/sim/understanding.ts` (the new game Understanding, `repertoireOf`, `ruleInRepertoire`, `programInRepertoire`, `editorRepertoire`), the `Understanding` type and `GameState.understanding` in `types.ts`, and `tests/sim/repertoire.test.mjs`; see `.runs/task-cycles/odkrywanie/reports/slice-2-report.md` § Choices and adaptations for the exact names.

Known flaky test outside this task: `tests/account-storage.test.mjs:357` once failed `5001 !== 5000` and passed alone; if it fails for you, rerun it alone and report both runs.

Test discipline: where your slice adds a test case, show it failing before the code that makes it pass, and record that run (command and exit code) in your report.
