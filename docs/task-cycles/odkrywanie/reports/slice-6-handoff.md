# Handoff — executor of slice 6, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 6. Read it and what it names whole.
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
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-6-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

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

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- player-map-run-pace — `foundations/invariants.md:198-211` (plan gave `foundations/invariants.md:198-209`)
- program-rule-pick — `foundations/invariants.md:246-260` (plan gave `foundations/invariants.md:244-257`)
- restart-seed — `foundations/invariants.md:306-315` (plan gave `foundations/invariants.md:303-312`)
- program-closed-lists — `foundations/invariants.md:361-371` (plan gave `foundations/invariants.md:358-368`)
- program-world-reference — `foundations/invariants.md:383-393` (plan gave `foundations/invariants.md:380-390`)
- minute-span-split — `foundations/invariants.md:525-534` (plan gave `foundations/invariants.md:522-531`)

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `src/browser/sim/types.ts`
- `tests/invariants/program_fixture.py`
- `tests/invariants/loop2_invariant_support.py`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

#### `.runs/task-cycles/odkrywanie/plan.md:66-79` — Slice 3

```text
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
#### `.runs/task-cycles/odkrywanie/task.md:16-16` — To do 1

```text
1. Gra trzyma Zrozumienie — zapis akcji, przedmiotów i warunków, które gracz odkrył — jako wiedzę gracza, jedną dla wszystkich postaci: to, co odkryje którakolwiek postać, wchodzi do niego dla wszystkich, a śmierć postaci, „Restart” i „Zakończ” go nie zmieniają. Nowa gra zaczyna Zrozumienie z warunkiem „Zawsze”; każda inna akcja, przedmiot i warunek wchodzi do niego przez odkrycie z punktu 2 (pytania 1 i 12).
```
#### `.runs/task-cycles/odkrywanie/task.md:30-30` — To do 4

```text
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
```

## Base

This slice starts at `3df67d8b93d3a13b2380aedd1b680feabc83cfa6` (slice 5 head). Slice 5 added to `tests/invariants/program_fixture.py` the JavaScript source `KNOWING_GAME_JS` and used it as `DRIVER = KNOWING_GAME_JS + ...` in seven invariant tests, the driver's new-game step for a sent and timed character using it, with one docstring sentence saying so. Follow that pattern; see `.runs/task-cycles/odkrywanie/reports/slice-5-report.md`.

The foundation entries of this task already changed the sentences of `player-map-run-pace`, `minute-span-split` and `program-rule-pick` (commit dcd529d). This slice changes none of their tests' expectations or sentences: their new sentences' cases come in slices 8 and 10. Only move their sent games to the knowing game.

Known flaky tests outside this task: `tests/account-storage.test.mjs:357` (`5001 !== 5000`) and `test_built_image_serves_every_icon_and_the_page` (SQLite "database is locked" in the container) each failed once and passed alone; if one fails for you, rerun it alone and report both runs.
