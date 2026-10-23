# Handoff 20 — reviewer of slice 5

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

- Range `74ec73214e0f45df6d1902b5a99ea0018226a032..4c892df965e7d4e74276afc09ca5c1831316dcea`, slice 5.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 5); executor's report `reports/19-slice5-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 5 *Change* (four icons,
  `credits.ts`, `tests/view/icons.test.mjs`, `README.md`).
- Trust boundary: the range changes `assets/icons/**`; check that each icon changes only its fill
  and still holds nothing that runs and refers to nothing outside itself (D-27, `icon-file-content`).
- Screenshots: `.runs/task-cycles/styleguide-loop2/reports/shots/slice5/`; `s5-03` is a forced
  state (a depleted icon is not reachable in the game today, by the executor's reading of
  `src/browser/sim/layout.ts:39`, `:48`).
- Executor's concerns: `README.md:52` still says „gruby bursztynowy obrys”; `test_icon_file_content.py:132`
  keeps `#2b2b2b` in a made-up control sample.
- Expected `foundation_check.py`: exit 1 with the five pattern errors left after Slice 4.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/20-slice5-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
