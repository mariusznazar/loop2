# Handoff 24 — reviewer of slice 7

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

- Range `b4658ac701f58692e96df944468b50a478f0a6c0..7d6b39f16b1febe382088bb7497857f9e57286c8`, slice 7.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 7); executor's report `reports/23-slice7-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 7 *Change* (three page files,
  `tsconfig.browser.json`, `tsconfig.kitchen-sink.json`, `test_application_build_output.py`).
- The page shows the shared controls in each state of styleguide rule 6 (or the reason a state does
  not apply; FE-5 binds), every colour role, and tile samples drawn with the roles, never from a
  game state (D-04, Q19 A, row 8); spec Decision 4 and 8a (three files; beyond its entry it imports
  only modules the game uses) bind.
- Screenshots: `.runs/task-cycles/styleguide-loop2/reports/shots/slice7/` (1440 and 390 px).
- Executor's choices a reviewer may question (its report, "Concerns" 3): role samples coloured by
  `var(--role)` set from TypeScript; the forced hover sample repeats the game's `var(--highlight)`
  rule; tile samples repeat the icon placement of `terrain-picture.ts`; kind labels in Polish.
- `dist/kitchen-sink/` from the executor's compile is left in the worktree (ignored by git).
- Expected `foundation_check.py`: exit 1 with only the three pattern errors left after Slice 7.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/24-slice7-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
