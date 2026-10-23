# Handoff 06 — planner

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the planner. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2` (branch `task/styleguide-loop2`, base
  `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`). Read code there; write only the plan, its size report
  and your report; no code, no commit.
- Method: the project skill `the-way-plan-task` — read `.the-way/task-cycle/plan/SKILL.md` of the
  pinned the-way `f0b2130` and every file it names whole, and follow it. `.the-way/task-cycle/slice_size.py`
  is the size script it names. Where it names another the-way skill, it is this product's project
  skill with the `the-way-` prefix.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the parts the plan touches.

## Stage and boundary

Divide the change into slices, made one after another, and return before any slice is made. Where
you meet an open design choice instead, return it with your report.

## Inputs

- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md` (accepted 2026-10-23).
- Reviewed spec: `.runs/task-cycles/styleguide-loop2/spec.md` — including Decision 8a, the
  orchestrator's settlement after the review of the revision. Reviews:
  `reports/02-spec-review.md`, `reports/05-spec-review-revision.md`.
- Cycle record: `.runs/task-cycles/styleguide-loop2/cycle.md` — reconciliation with changed sources;
  questions table (QA-1..QA-4, QA-r, R1, R-n1, R-n2) whose answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (recolouring), `assets/fonts/**` (files
  from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests). Irreversible operation — no.
- Foundation entries the change writes: the twenty rows of the task's *Settlements to record*, the
  WCAG 2.2 definitions environment fact (QA-4), and the part-map entries the spec names. The plan
  lists them under *Foundation entries* as your method gives; each is written through its pinned
  element skill.
- The task's To do 10 goes through `the-way-maintain-instruction-files`; To do 9 through
  `the-way-update-part-map`.
- The base gate (`npm test`) passes on `00e53ae` (exit 0; record, *Verification*). The full
  `npm test` takes about 7 minutes.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.
- Never widen the task.

## Output

- `.runs/task-cycles/styleguide-loop2/plan.md` and `.runs/task-cycles/styleguide-loop2/plan-size.md`.
- Full report: `.runs/task-cycles/styleguide-loop2/reports/06-plan-report.md`.
- Return: status, paths, a one-line check result (commands with exit codes), and every question or
  concern the next dispatch depends on.
