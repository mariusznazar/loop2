# Handoff 28 — reviewer of slice 9

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

- Range `73b0563abee12f3973fcb8084c449c4e8c11ec8e..b33aa2761e00fef538c569dc5860ecef4dd28e62`, slice 9.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 9); executor's report `reports/27-slice9-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 9 *Change* (`AGENTS.md`,
  `src/browser/AGENTS.md`).
- Q-P2 binds: To do 10 went through the pinned `.the-way/instruction-files/SKILL.md` (mode
  *place*), loop2 having no project skill of that name; judge the placement and wording by it.
- Executor's concerns: no fresh-session check of an agent loading the rule; one sentence beyond
  To do 10 ("without a human, name the missing value in your report instead of choosing one");
  `check_instructions.py` now also reads `foundations/part_map.md`; `src/browser/AGENTS.md` also
  loads for `src/browser/sim/` (plan C9).
- After this slice `foundation_check.py` exits 0 and the executor reports `npm test` exit 0.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/28-slice9-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
