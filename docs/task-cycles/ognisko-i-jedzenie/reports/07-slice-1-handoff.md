# Handoff — executor of Slice 1, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 1** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `3789fa4d605571bfecd819ff2d3cbbb7fd1c0e5e` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/07-slice-1-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:51-70`)

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
