# Handoff 17 — executor of slice 4

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 4. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  4's base: `fc4fc911cca4d138a904280b567814a16c53883e`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 4 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 4 (test file names there are current).
- Earlier slices are made and reviewed up to `fc4fc911cca4d138a904280b567814a16c53883e`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Token names (slice 3, `src/browser/tokens.css`): roles are `--<role>` as Q18 names them; other
  values `--font-family-text`, `--font-family-mono`, `--font-weight-body` (400),
  `--font-weight-emphasis` (500), `--font-size-label|detail|body|heading|map-title|game-title`
  (11–16 px), `--space-2xs|xs|s|m|l|xl|2xl` (2, 4, 8, 12, 16, 24, 32 px), `--frame-width`,
  `--bar-width`, `--character-outline-width`, `--step-target-width`, `--step-target-dash` (`5 4`),
  `--link-highlight-width` (1.5px), `--focus-width`, `--focus-offset`; `--depleted` is the opacity
  `0.35`; the tile edge uses `--frame-width` (QA-2). Read the file whole.
- The test of row 11 (`browser-view-token-values`): spec Decision 8 row 11 with 8a (R1:
  `transparent` and `currentColor` are exempt) and questions-table row FE-2: count every named and
  system colour CSS Color 4 lists, deprecated ones included, taking the list from the environment
  fact `css-colour-values` (never from memory); a whole word is a CSS-identifier-like token, `-`
  and `_` counting as word characters.
- The test of row 12 (`browser-view-focus-outline`): follow spec Decision 8 row 12, rows 12 and 20
  of the task and styleguide rule 4; the invariant sentence read literally seems to forbid the
  kitchen-sink's second selector that it then allows (slice 1 review Minor M2) — the return step
  brings the sentence in line; the test allows one more selector only in
  `src/browser/kitchen-sink/kitchen-sink.css`.
- Hover: D-40 now lets `highlight` mean a control under the pointer; a hovered control keeps its
  text role (styleguide rules 2 and 6). The terrain hover keeps `link-highlight` (D-19, D-47).
- `src/browser/styles.css` must be created under exactly that name (the styleguide names it).
- User-interface evidence: this slice changes what the game looks like. Make the own-work check of
  your method for the screens and states you change, with screenshots by whatever real-browser route
  you have in this harness (e.g. a Playwright browser tool on `npm run dev`); if no route works,
  name the screenshot unchecked with the reason. Keep screenshots under
  `.runs/task-cycles/styleguide-loop2/reports/shots/slice4/` (ignored by git).
- Expected `foundation_check.py` after this slice: exit 1 with only the pattern errors the plan's
  table leaves after Slice 4.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/17-slice4-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
