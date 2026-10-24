# Handoff — executor of Slice 5, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 5** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `46ec64d98889161e37fa73dde51de9e7e8ace5d7` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/11-slice-5-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:145-168`)

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

## Current ranges

The foundation step wrote the plan's F1–F20 and moved some ranges of `foundations/`. Read
`.runs/task-cycles/ognisko-i-jedzenie/reports/foundation-map.md`: it maps each F-entry your *Read*
names to its identifier and current range, and gives the current range of each range of
`foundations/` that moved. Where it differs from the plan's, the current one holds.

## Known checks already failing on the base (a945cf1)

`npm test` exits 1 on this machine for three checks unrelated to this change:
`tests/invariants/test_loop2_one_serving_process.py` (setUpClass: `Get-NetTCPConnection` finds no
listening connection) and `tests/quality` `test_ruff_source_rules`, `test_shellcheck_source_rules`
(Ruff and ShellCheck are not installed). Name any of them you meet as already failing, not as yours.

## What earlier slices made (read as they stand now)

- Slice 3 (7a273ae) added the content data files `src/browser/sim/data/items.ts`,
  `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/traits.ts` and numbers in
  `src/browser/sim/data/balance.ts`, `src/browser/sim/data/maps.ts`.
- Slice 4 (46ec64d) added `src/browser/sim/body.ts` and put the character's body on the map run as
  `MapRun.body` — not inside `MapRun.character`, since `tests/sim/actions.test.mjs:115` compares
  `character` across minutes; the program's view of the run (`RunView`) does not carry the body yet
  (Slice 9 adds what conditions read). When a span reaches death `passRealTime` drops the leftover
  part of a real second (`realMsCarry` = 0). `mapRunEnded` is still given at „Zakończ” and
  „Restart”, not at death.

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/traits.ts`,
`src/browser/sim/data/items.ts`, `src/browser/sim/body.ts`, `src/browser/sim/run.ts` and
`src/browser/sim/types.ts` as they stand now.
