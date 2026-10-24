# Handoff — planner, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
are the **planner** (step 8 of `.the-way/task-cycle/skill/SKILL.md`). Use the project skill
**`the-way-plan-task`** (read its method and everything it names, whole).

Boundary: write `plan.md` and its size report `plan-size.md`, and your report; write no code, test
or foundation entry, and change nothing git tracks. Return before any slice is made, with status
`done`, `done with concerns`, `questions` or `returned` (an open design choice the spec leaves —
then no plan). Questions go to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie` (branch `task/ognisko-i-jedzenie`, base
  a945cf1d4c62e8cdac222a7de47277c08a77b2c5); pinned the-way `.the-way` at 86b78ad.
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md` — plan item 4 of
  `plan_mvp_loop2.md`, definition `definicja_mvp_loop2.md` (approved 2026-10-13, fingerprint
  9e480247), both in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\`.
- Reviewed spec (read whole; it binds): `.runs/task-cycles/ognisko-i-jedzenie/spec.md` — review
  `PASS` after one revision; the orchestrator's settlements stand in it (Decision 4's foundation
  status; the weak point of way A).
- Write `.runs/task-cycles/ognisko-i-jedzenie/plan.md` and
  `.runs/task-cycles/ognisko-i-jedzenie/plan-size.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/05-planner-report.md`.

## Answers of step 4

- Trust boundary: **yes** — `assets/icons/**` (part `browser-view`): the campfire icon from
  game-icons.net, untrusted. Mark the slice that adds it with that risk; it gets a review of its own.
- Irreversible operation: **no**.

## What the orchestrator has settled (from the spec review; already in the spec)

- Q-04: crafting a campfire and lighting a stick are infeasible on a tile not revealed (Decision 4),
  written as a foundation decision (Q-10).
- Q-05: a feeding adds its 20 minutes to the campfire it started on whatever its state at its end.
- Q-06: the acceptance program draws on the closed list as this task leaves it, "Eksploruj"
  included.
- Q-08: texts „Minuta <n> · Mag umarł z głodu” and „patyk — płonie, zostało <n> min” (Decision 5).
- Q-11: the invariant `minute-span-split` the spec proposes is kept.
- Product tests run with `npm test` (`package.json`). On the base, `npm test` exits 1 with checks
  already failing on this machine: `tests/invariants/test_loop2_one_serving_process.py`
  (`Get-NetTCPConnection` finds no listening connection) and `tests/quality` ruff and shellcheck
  rules (tools not installed); `python -B .the-way/elements/common/foundation_check.py` exits 0 when
  run on its own. A slice's checks should name which of these it cannot run.

## Read (your selection; propose each slice's *Read* from it)

Foundation in `foundations/`, each entry whole:

- Decisions: D-04, D-18, D-19, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-27, D-39, D-41, D-43,
  D-44, D-34 (content-data exemplar), D-35 (simulation-module exemplar), D-36 (browser-module
  exemplar).
- Invariants: `program-rule-pick`, `program-closed-lists`, `program-world-reference`,
  `walk-target`, `walk-feasibility`, `action-in-progress`, `player-map-run-pace`,
  `simulation-randomness`, `simulation-isolation`, `simulation-inputs`, `map-run-repeatability`,
  `map-run-layout`, `restart-seed`, `content-identifiers`, `icon-file-content`, `icon-credits`,
  `loop2-container-icons`, `terrain-drawing-numbers`, `browser-view-token-values`, and the entries
  they link to as far as you need.
- Glossary: `game minute`, `free game minute`, `map run`, `map run restart`, `program`,
  `program rule`.
- Environment facts: `game-icons-licence`, `cc-by-3-adaptation-credit`, `cc-by-3-licence-copy`,
  `game-icons-wood-stick-title` (as the pattern of a title fact).
- Part map: `foundations/part_map.md` — parts `simulation`, `browser-view`, `product-foundation`,
  `deployment` (its `tests/deploy/test_loop2_image_icons.py` and
  `tests/invariants/test_loop2_container_icons.py` may name the icons).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.

Foundation entries the cycle writes: the foundation step writes those the task's *Settlements to
record* and its projected entries carry, and those the spec names (*Foundation entries* of the
spec), each through the pinned skill of its element (`the-way-record-decision`,
`the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`,
`the-way-update-part-map`). Place them in the plan's *Foundation entries* where they can be written
before code, or in the slice whose code makes them true, as `plan-task` gives.

Predecessor game loop (`C:\Storage\repos\loop`): only its `src/sim/data/` files and its tests may be
read.
