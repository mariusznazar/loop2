# Handoff 21 — executor of slice 6

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 6. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  6's base: `4c892df965e7d4e74276afc09ca5c1831316dcea`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 6 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 6 (test file names there are current).
- Earlier slices are made and reviewed up to `4c892df965e7d4e74276afc09ca5c1831316dcea`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Build the control states to styleguide rule 6 (`guidelines/styleguide-browser-view.md`), not only
  to the task: no background of their own, text `text`, frame `control-border`; hover `highlight`
  with frame and text role unchanged (D-40 as fixed, S1-I1); focus by the one `:focus-visible` rule
  (no `outline` anywhere else, none from TypeScript — rule 4); disabled `text-disabled`; field error
  a `warning` frame and a message under the field; empty with the hint in `text-label`; loading
  applies to no control. Error does not apply to buttons nor to the select list (FE-5), empty does
  not apply to buttons.
- Module names are fixed: the styleguide names `src/browser/view/controls/button.ts` and
  `src/browser/view/controls/select-list.ts`; the plan adds `number-field.ts` and `text-field.ts`
  (choice C5: four modules for six controls).
- Slice 4 review Minor m3: buttons and selects inherit 13 px, while Q11 gives buttons 12 px
  (`--font-size-detail`). Slice 4 gave `button, select, input` element rules (normal, hover,
  `color-scheme: dark`, option colours) and `.rule button` in `styles.css` so the page stayed usable:
  move those onto the controls rather than adding a second set.
- „Zakończ”, „Usuń” and „Restart” are destructive buttons (text `danger`); the selected button of a
  group has frame `selected` and text `text-strong`.
- User-interface evidence: screenshots of the three screens you move onto the controls and of the
  control states you can reach, by the Playwright route Slices 4 and 5 used (`npm start`, built
  server), in `reports/shots/slice6/`; name unreachable states unchecked (the kitchen-sink page of
  Slice 7 will show every state).
- Expected `foundation_check.py`: as after Slice 4 (five pattern errors).

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/21-slice6-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
