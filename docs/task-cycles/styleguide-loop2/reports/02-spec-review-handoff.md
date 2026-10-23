# Handoff 02 — spec reviewer

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the spec reviewer, an agent that did not write the spec. Questions go to the orchestrator,
never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2` (branch `task/styleguide-loop2`, base
  `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`). Read only; write nothing but your report.
- Method: the project skill `the-way-write-spec`, as the reviewer — read `.the-way/task-cycle/spec/`
  (the skill and every file it names) of the pinned the-way `f0b2130` whole and follow it. Where it
  names another the-way skill, it is this product's project skill with the `the-way-` prefix.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the parts the spec touches.

## Stage and boundary

Review the spec against the frozen task and the product's current foundation; return `PASS` or
`FAIL` with findings. No edits to the spec, no plan, no code.

## Inputs

- Spec: `.runs/task-cycles/styleguide-loop2/spec.md`; its designer's report:
  `.runs/task-cycles/styleguide-loop2/reports/01-spec-report.md`.
- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md` (accepted 2026-10-23).
- Cycle record: `.runs/task-cycles/styleguide-loop2/cycle.md` — "Reconciliation with changed
  sources", and the questions table rows QA-1..QA-4 and QA-r (the orchestrator's answers to the
  designer, which the spec applies).
- Answers of step 4: trust boundary — yes (`assets/icons/**` recolouring; new font directory, files
  from outside; `scripts/kitchen-sink.mjs` takes in HTTP requests, QA-3). Irreversible operation — no.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x` (Mariusz's prohibition).
- Do not read the branch `styleguide-browser-view` or the worktree `C:\Storage\repos\loop2-styleguide`
  (an earlier cycle of this task, before it was refined again).

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/02-spec-review.md`, first line `PASS` or
  `FAIL`.
- Return: `PASS` or `FAIL`, the report path, a one-line check result (commands with exit codes, or
  that you ran none), and every concern the next dispatch depends on.
