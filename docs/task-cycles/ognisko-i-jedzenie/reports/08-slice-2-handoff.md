# Handoff — executor of Slice 2, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 2** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `d15aeb3d826c46533db4cb85e18de31973d5bf42` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/08-slice-2-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:72-91`)

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
