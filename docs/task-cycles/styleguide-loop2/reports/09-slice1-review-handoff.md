# Handoff 09 — reviewer of slice 1 (with the foundation entries)

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You review a change you did not make. Questions go to the orchestrator, never to the human. You
alone grade and scope your findings.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Read
  only; write nothing but your report.
- Method: the project skill `the-way-review-change` — read `.the-way/task-cycle/review/` of the
  pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the files of the range.

## Range and stage

- Review the range `00e53aee5bd21692ddd3b2f7c7541625a3114a3f..5ef77fcae7a368de96ca9a73fb4d20fe46ef84a2`:
  slice 1 of the plan, and, as part of this range, the plan's *Foundation entries* (`00e53ae..19d0116`).
- Slice number: 1.

## Inputs

- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec:
  `.runs/task-cycles/styleguide-loop2/spec.md`; plan: `.runs/task-cycles/styleguide-loop2/plan.md`
  (section "Foundation entries" and slice 1).
- Reports of the agents that made the range: `reports/07-foundation-report.md` (foundation entries)
  and `reports/08-slice1-report.md` (slice 1).
- Cycle record `cycle.md`, questions table: the orchestrator's answers QA-1..QA-4, R1, Q-P1..Q-P4,
  FE-1..FE-5.
- Answers of step 4: trust boundary — yes: `assets/icons/**`, `assets/fonts/**` (files from
  outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); this range touches none of their
  files yet but writes the part-map lines that name them. Irreversible operation — no.
- Information from the orchestrator's mechanical check: the plan expected `check_instructions.py .`
  to warn about the styleguide's code paths until Slice 7; it does not, because the root
  `AGENTS.md` names the styleguide only from Slice 9 (executor's concern 1). The styleguide names
  five paths later slices create, not three (concern 2). `foundation_check.py` is expected to exit 1
  with exactly the twelve pattern errors of the plan's pattern table (Q-P1).

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/09-slice1-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
