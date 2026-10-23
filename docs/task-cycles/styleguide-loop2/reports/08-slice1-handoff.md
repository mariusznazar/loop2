# Handoff 08 — executor of slice 1

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 1. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`, head
  `19d0116` (foundation entries). Slice 1's base is `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`; its
  review covers the foundation entries `00e53ae..19d0116` too. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change. Commit by explicit
  paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 1 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md`.
- Reviewed spec: `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included).
- Plan: `.runs/task-cycles/styleguide-loop2/plan.md` — slice 1.
- Foundation entries already written (`19d0116`); their identifiers and meaning sentences:
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — rows QA-1..QA-4, R1, Q-P1..Q-P4, FE-1..FE-5 bind
  (FE-5: the select list's error state does not apply, with its reason).
- Answers of step 4: trust boundary — yes (`assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`); irreversible operation — no.
- Expected `foundation_check.py` result after this slice: exit 1 with exactly the twelve pattern
  errors of the plan's pattern table (test names as corrected, FE-1) and no other error.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/08-slice1-report.md`, as `make-change`
  gives it, every check with its command and exit code.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
