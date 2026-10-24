# Handoff — spec reviewer, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
are the **reviewer of the spec** (step 7 of `.the-way/task-cycle/skill/SKILL.md`), an agent other
than its designer. Use the project skill **`the-way-write-spec`** in its review role (read its
method and everything it names, whole).

Boundary: read only; write nothing but your report. Return `PASS` or `FAIL` as the method gives,
with your findings. Questions go to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie` (branch `task/ognisko-i-jedzenie`, base
  a945cf1d4c62e8cdac222a7de47277c08a77b2c5); pinned the-way `.the-way` at 86b78ad.
- Spec to review: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`.
- Designer's report (its readings, ways weighed and reaches):
  `.runs/task-cycles/ognisko-i-jedzenie/reports/01-spec-designer-report.md`.
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md` — plan item 4 of
  `plan_mvp_loop2.md`, definition `definicja_mvp_loop2.md` (approved 2026-10-13, fingerprint
  9e480247), both in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\`; read cited passages
  only where you need them.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/02-spec-reviewer-report.md`;
  its first line is `PASS` or `FAIL`.

## Answers of step 4

- Trust boundary: **yes** — `assets/icons/**` (new campfire icon from game-icons.net, untrusted).
- Irreversible operation: **no**.

## The open design choice the spec had to settle

1. The order of effects within one game minute, so that death and threshold crossings fall in the
   same game minute however game time is split into calls of the simulation.
2. Where carrying capacity, the first trait, stands in code and data while task 11
   `siedziba-i-druzyna` runs in parallel, and how the cycle merged second joins them.
3. The range and step of the number each new condition takes, and how the program check and the
   editor take them.

Every row of the task's *Settlements to record* and both projected entries it writes are settled
by the task; check the spec keeps them, not redesigns them.

## Read

Foundation in `foundations/`, each entry whole:

- Decisions: D-04, D-18, D-19, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-27, D-39, D-41, D-44.
- Invariants: `program-rule-pick`, `program-closed-lists`, `program-world-reference`,
  `walk-target`, `walk-feasibility`, `action-in-progress`, `player-map-run-pace`,
  `simulation-randomness`, `simulation-isolation`, `simulation-inputs`, `map-run-repeatability`,
  `map-run-layout`, `restart-seed`, `content-identifiers`, `icon-file-content`, `icon-credits`,
  `loop2-container-icons`, `terrain-drawing-numbers`, and what they link to as far as you need.
- Glossary: `game minute`, `free game minute`, `map run`, `map run restart`, `program`,
  `program rule`.
- Part map: parts `simulation`, `browser-view`, `product-foundation`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.

Code at a945cf1 as the spec cites it. Predecessor game loop (`C:\Storage\repos\loop`): only its
`src/sim/data/` files and its tests may be read.
