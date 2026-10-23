# Handoff 18 — reviewer of slice 4

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

- Range `fc4fc911cca4d138a904280b567814a16c53883e..74ec73214e0f45df6d1902b5a99ea0018226a032`, slice 4.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 4); executor's report `reports/17-slice4-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 4 *Change*
  (`src/browser/styles.css`, `src/browser/index.html`, `src/browser/view/terrain-panel.ts`, two tests).
- This slice changes the rendered look. The executor's screenshots stand in
  `.runs/task-cycles/styleguide-loop2/reports/shots/slice4/`; judge the appearance against Q10,
  Q19 C, Q11 and the styleguide by the criteria for appearance your method holds; take your own
  where you need them (Playwright browser on `npm start` from a temporary worktree of the head).
- The executor names concerns in its report: the row's hover line renders at 1.33 px, not 1.5 px;
  the token test uses CSS Fonts 4 generic families and CSS Cascade 5 wide keywords, not recorded as
  facts; control styles are given here and Slice 6 moves them; known gaps of the token test; icons
  still dark until Slice 5 (planned).
- Earlier answers that bind this range: R1 and FE-2 (row 11's colour words), S1-I1 (hover in
  `highlight` for controls, text role kept).
- Expected `foundation_check.py` after this slice: exit 1 with only the five pattern errors the
  plan's table leaves after Slice 4.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/18-slice4-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
