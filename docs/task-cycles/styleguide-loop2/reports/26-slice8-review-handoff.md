# Handoff 26 — reviewer of slice 8

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

- Range `7d6b39f16b1febe382088bb7497857f9e57286c8..73b0563abee12f3973fcb8084c449c4e8c11ec8e`, slice 8.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 8); executor's report `reports/25-slice8-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 8 *Change*
  (`scripts/kitchen-sink.mjs`, `scripts/static-files.mjs`, `scripts/build.mjs`, `package.json`,
  `README.md`, the row-15 test).
- Trust boundary: the range adds `scripts/kitchen-sink.mjs`, which takes in HTTP requests (QA-3);
  check crafted input there — its address stays loopback, its served root `dist/kitchen-sink/`,
  path climbing refused, nothing written outside `dist/kitchen-sink/`. `package-lock.json` must be
  unchanged (D-33).
- Screenshot: `.runs/task-cycles/styleguide-loop2/reports/shots/slice8/`.
- Executor's concerns: the command opens a browser tab when run (intended); the test also checks
  that the command writes nothing outside `dist/kitchen-sink/` and adds a made-up import case;
  `README.md` „Panel terenu” still says „gruby bursztynowy”.
- No Docker daemon answered in this run; `Dockerfile` is unchanged by this range, but
  `scripts/build.mjs` (which the image runs) changed — weigh whether the image build needs checking.
- Expected `foundation_check.py`: exit 1 with only the error for `src/browser/AGENTS.md`.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/26-slice8-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
