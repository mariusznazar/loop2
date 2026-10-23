# Handoff 19 — executor of slice 5

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 5. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  5's base: `74ec73214e0f45df6d1902b5a99ea0018226a032`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 5 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 5 (test file names there are current).
- Earlier slices are made and reviewed up to `74ec73214e0f45df6d1902b5a99ea0018226a032`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Trust boundary: this slice changes `assets/icons/**`. Change only the fill colour to `#f4f4f5`
  (the value of `text-strong`, Q10); the icon files keep holding nothing that runs and referring to
  nothing outside themselves (D-27, `icon-file-content`).
- The comment above `src/browser/view/credits.ts:12` changes with the text (spec Decision 9);
  `README.md` says the same at its footer and icon passages (`README.md:53`, `:59` at the base).
- Slice 4 drew the grey revealed tiles; the light icons now stand on them (Q10 gives 4.4:1).
  Take a screenshot of the terrain with the light icons and a depleted icon if you can reach one
  (`reports/shots/slice5/`), or name it unchecked with the reason.
- Container icon tests run only where a Docker daemon answers; name them unchecked otherwise.
- Expected `foundation_check.py` after this slice: as after Slice 4 (five pattern errors).

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/19-slice5-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
