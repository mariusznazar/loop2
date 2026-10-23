# Handoff 23 — executor of slice 7

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 7. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  7's base: `b4658ac701f58692e96df944468b50a478f0a6c0`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 7 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 7 (test file names there are current).
- Earlier slices are made and reviewed up to `b4658ac701f58692e96df944468b50a478f0a6c0`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Controls' interface (slice 6): `createButton`, `setButtonSelected` (`controls/button.ts`),
  `createSelectList`, `setSelectOptions` (`controls/select-list.ts`), `createTextField`
  (`controls/text-field.ts`), `createNumberField` (`controls/number-field.ts`), `Field.setError`.
  Show each control in each of the seven states of styleguide rule 6 or the reason a state does not
  apply (error: not for buttons nor the select list, FE-5; empty: not for buttons; loading: none).
- Tile samples: drawn with the roles, never from a game state (D-04, Q19 A, row 8): hidden,
  revealed, character outline, step target, link highlight, depleted icon (the kitchen-sink is the
  only place the depleted state can be seen — it never occurs in play). Do not copy the game's
  hover line onto unrevealed tiles (slice 4 review Minor m1). Icons through `src/browser/sim/data/`,
  never by name (D-18).
- No literal colour in the page's HTML either — the row-11 test does not read SVG presentation
  attributes such as `fill="…"` in HTML (slice 4 review m7), so keep every colour in `var(--…)`.
- Beyond its entry the page imports only modules the game itself uses; page-only code stays in the
  entry module (spec 8a). Exactly three files in `src/browser/kitchen-sink/` (plan C4).
- `kitchen-sink.css`: its only `outline` is the `:focus-visible` rule with one more selector, that
  of the focus sample (row 12, styleguide rule 4).
- User-interface evidence: `npm run kitchen-sink` comes in Slice 8. To see the page now, compile
  `tsconfig.kitchen-sink.json` and serve the assembled output from a temporary directory outside the
  repository with a throwaway loopback server you do not commit; screenshot the page at 1440 and
  390 px into `reports/shots/slice7/`, or name it unchecked with the reason.
- Expected `foundation_check.py` after this slice: exit 1 with only the pattern errors the plan's
  table leaves after Slice 7.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/23-slice7-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
