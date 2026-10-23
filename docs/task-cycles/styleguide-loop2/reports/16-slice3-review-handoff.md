# Handoff 16 — reviewer of slice 3

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You review a change you did not make. Questions go to the orchestrator, never to the human. You
alone grade and scope your findings.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Read
  only; write nothing but your report. Run anything that writes files in a temporary worktree of
  the head and remove it afterwards.
- Method: the project skill `the-way-review-change` — read `.the-way/task-cycle/review/` of the
  pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the files of the range (the styleguide `guidelines/styleguide-browser-view.md` among them).

## Range and stage

- Range `396895f49bba17faca820898bd826b4dc9eac27b..fc4fc911cca4d138a904280b567814a16c53883e`, slice 3.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 3); executor's report `reports/15-slice3-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 3 *Change*
  (`src/browser/tokens.css`, `tests/invariants/test_design_token_contrast.py`,
  `tests/invariants/test_design_token_sources.py`).
- The executor names the token names Slice 4 will use and two test gaps it saw itself (no threshold
  case; roles outside every pair not required) — its report, "Concerns".
- Expected `foundation_check.py` after this slice: exit 1 with only the pattern errors the plan's
  table leaves after Slice 3 (seven).

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/16-slice3-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
