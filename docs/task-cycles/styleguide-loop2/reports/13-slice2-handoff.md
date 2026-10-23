# Handoff 13 — executor of slice 2

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 2. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice 2's
  base: `d190e10dbe46b0fb1c7df83325c79665e4e4bf59`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` now exists and is among them for files of `browser-view`.
  Commit by explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 2 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 3 for fonts); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 2.
- Foundation entries and slice 1 are made and reviewed (`00e53ae..d190e10`): identifiers in
  `reports/07-foundation-report.md`; D-46 (fonts), `geist-licence`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes. This slice touches `assets/fonts/**`, a trust boundary of
  `browser-view`: files from outside. Take them only from a release of
  https://github.com/vercel/geist-font, byte for byte, and record the release tag, its commit, each
  file's download URL and SHA-256 in your report. Irreversible operation — no.
- Expected `foundation_check.py` after this slice: exit 1 with only the pattern errors the plan's
  table leaves after Slice 2 (test names as corrected in the plan).
- Docker: where no Docker daemon answers, name each test it skips as unchecked.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/13-slice2-report.md`, as `make-change`
  gives it, every check with its command and exit code.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
