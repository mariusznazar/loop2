# Handoff 31 — reviewer of the return step

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You review a change you did not make. Questions go to the orchestrator, never to the human. You
alone grade and scope your findings.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Read
  only; write nothing but your report; run anything that writes files in a temporary worktree.
- Method: the project skill `the-way-review-change` — read `.the-way/task-cycle/review/` of the
  pinned the-way `f0b2130` whole and follow it. The step reviewed is step 11 of
  `.the-way/task-cycle/skill/SKILL.md` ("11. Take the return step"); read that paragraph whole.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the files of the range.

## Range

`b33aa2761e00fef538c569dc5860ecef4dd28e62..464187d4b84964850e633c52978de9afb68f8085` — the return
step: entries of `foundations/`, the styleguide's citations, three test docstrings.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; spec `spec.md`; plan `plan.md`.
- Return-step report `reports/30-return-report.md`; the whole-change review whose concerns it took
  up, `reports/29-whole-review.md`; the foundation report `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table (answers bind).
- Review it against the task and the entries the return step writes or corrects: D-39, D-41, D-43,
  D-46 changed; D-48 new; `browser-view-focus-outline` and `design-token-sources` reworded;
  `geist-licence` re-cited; facts `css-font-family-names` and `css-wide-keywords` new; two part-map
  descriptions. Step 11 writes an invariant only for a rule the task, a decision or the human sets,
  and no review finding becomes an entry merely for being a finding.
- Answers of step 4: trust boundary — yes (`assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`; this range touches none of their files); irreversible operation — no.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/31-return-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result, and every concern the next
  dispatch depends on.
