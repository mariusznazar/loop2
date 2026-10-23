# Handoff 14 — reviewer of slice 2

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
  for the files of the range (the styleguide `guidelines/styleguide-browser-view.md` among them).

## Range and stage

- Range `d190e10dbe46b0fb1c7df83325c79665e4e4bf59..396895f49bba17faca820898bd826b4dc9eac27b`, slice 2.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 2); executor's report `reports/13-slice2-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind (S2-1, S2-2 answer the
  executor's concerns 1 and 2: the release zip's files are kept, and the zip's URL with each file's
  path inside it is the record).
- Answers of step 4: trust boundary — yes. This range adds `assets/fonts/**`, a trust boundary of
  `browser-view` (files from outside, from github.com/vercel/geist-font): check crafted input there —
  that the files are the release's published binaries and licence (hashes in the report), hold
  nothing else, and that `Dockerfile`, `.dockerignore`, `.gitattributes` and `scripts/build.mjs`
  pass and copy only what the slice says. Irreversible operation — no.
- Expected `foundation_check.py` after this slice: exit 1 with only the ten pattern errors the plan's
  table leaves after Slice 2.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/14-slice2-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
