# Handoff 15 — executor of slice 3

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 3. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  3's base: `396895f49bba17faca820898bd826b4dc9eac27b`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 3 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 3 (test file names there are current).
- Earlier slices are made and reviewed up to `396895f49bba17faca820898bd826b4dc9eac27b`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Fonts (slice 2, S2-1): the `Source:` comments of the `@font-face` rules name the release file
  `geist-font-v1.8.2.zip` of https://github.com/vercel/geist-font release `v1.8.2`, commit
  `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`, not a path in the repository tree. Files:
  `Geist-Regular.woff2`, `Geist-Medium.woff2` (400/500), `GeistMono-Regular.woff2`,
  `GeistMono-Medium.woff2` (400/500), reached at `/fonts/<file name>`. Weights: Q19.
- The test of row 13 (`design-token-contrast`) takes its constants from the environment fact
  `wcag-contrast-ratio`, never from memory; its pairs and thresholds are the invariant's.
- The test of row 14 (`design-token-sources`) follows spec Decision 1 and 8 row 14 with 8a: a
  declaration runs from its name to its `;` over however many lines, and the `Source:` comment
  stands directly after that `;` on the same line.
- Slice 1 review Minor M7: D-43's complying example names `var(--space-8)`; name the spacing tokens
  as you see fit — the return step brings examples in line.
- Expected `foundation_check.py` after this slice: exit 1 with only the pattern errors the plan's
  table leaves after Slice 3.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/15-slice3-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
