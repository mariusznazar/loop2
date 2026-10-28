# Handoff — planner, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; the
orchestrator's answers are not the human's approval.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`; base `main` at `6540e4c`; head `c0c51a0` (the task branch's first
  commit, which moved the-way pin from `574a37b` to `3aee7d9`; nothing else changed).
- Method: `.the-way/task-cycle/plan/SKILL.md` (pinned the-way, `3aee7d9`). Read it whole; read a
  file it names only when the step that names it comes.
- Stage: **planner** — divide the change into slices made one after another. Boundary: `plan.md`
  and its size report. Write no code, commit nothing.
- Plan path: `.runs/task-cycles/rozwiazanie-lasu/plan.md`; size report:
  `.runs/task-cycles/rozwiazanie-lasu/plan-size.md`
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/10-planner-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md` — read it whole. Its review: `PASS`
  after one revision (`reports/06-spec-review.md`, `reports/08-spec-revision-review.md`).

## Answers of step 4

- Trust boundary: no — the change touches none of the part map's trust boundaries.
- Irreversible operation: no.
- Route: the orchestrator judged, after the spec, that the change needs division: it joins the
  fast-forward (pace in the game state, `passRealTime`, the pace buttons) with the solving of Las
  (streak, completion, solved maps, their texts and screens), alters two invariant tests, and
  carries the foundation entries listed in the spec's *Foundation entries*. The designer noted that
  a plan can make the two halves as separate slices, the fast-forward first; the division is yours.

## Checks the move of the pin carried

The gate on `c0c51a0` is still running; on the base `6540e4c` the one command `npm test` exits 1
with three checks failing for the environment, not the code: `tests/invariants`
`test_loop2_one_serving_process` setUpClass (Get-NetTCPConnection found no listener) and
`tests/quality` `test_ruff_source_rules` and `test_shellcheck_source_rules` (ruff and shellcheck not
on PATH). The orchestrator adds to the plan any check that fails on `c0c51a0` and passed on the base.

## What to read

Of the foundation (`foundations/`), each entry whole, by identifier:

- Decisions: D-04, D-18, D-20, D-21, D-22, D-23, D-24, D-26, D-34, D-35, D-36, D-39, D-44, D-53,
  D-55, D-56, D-60, D-61, D-62, D-71, D-73, D-75, D-80, D-82, D-84, D-88, D-90, D-92, D-93, D-118,
  D-121, D-122, D-123, D-126, D-128.
- Invariants: `player-map-run-pace`, `minute-span-split`, `map-run-repeatability`,
  `simulation-randomness`, `restart-seed`, `action-in-progress`, `simulation-isolation`,
  `simulation-inputs`, `content-identifiers`, `program-rule-pick`, `program-closed-lists`,
  `character-team`.
- Part map: the entries `simulation` and `browser-view` of `foundations/part_map.md`.
- Glossary (`foundations/glossary.md`, short — read whole) and the-way's glossary at
  `.the-way/foundations/glossary.md` for the-way's own terms you meet.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`,
`guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.

Of the task's sources: the frozen task carries every passage it relies on; read the definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` only for a passage
the task names and does not quote. The loop repository (`C:\Storage\repos\loop`) may be read only
in `src/sim/data/` and its tests, as the task's *Context* says.

The code the change touches: `src/browser/sim/**` (notably `game.ts`, `types.ts`,
`data/maps.ts`, `data/balance.ts`) and `src/browser/view/**` (notably `clock.ts`,
`status-row.ts`, `headquarters.ts`, `app.ts`), and the tests under `tests/sim/`, `tests/view/` and
`tests/invariants/` that cover the invariants above.

## Report

Write your full report to the report path as the method gives it, and return only your status
(`done`, `done with concerns`, `questions` or `returned`), the plan and size-report paths and the
report path.
