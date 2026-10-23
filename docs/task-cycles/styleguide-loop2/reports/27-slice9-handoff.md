# Handoff 27 — executor of slice 9

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 9. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  9's base: `73b0563abee12f3973fcb8084c449c4e8c11ec8e`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 9 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 9 (test file names there are current).
- Earlier slices are made and reviewed up to `73b0563abee12f3973fcb8084c449c4e8c11ec8e`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- To do 10 goes through `the-way-maintain-instruction-files`, which this product has no project
  skill for (Q-P2): follow the pinned `.the-way/instruction-files/SKILL.md` directly, in mode
  *place*, reading the files it names whole; never the personal skill `maintain-instruction-files`.
  The accepted To do 10 is the settled content; the human accepts the wording at the merge, so where
  that skill asks for approval before writing, the task's acceptance stands for it.
- The two changes: a pointer in the main `AGENTS.md`, outside the the-way installer block, naming
  `guidelines/styleguide-browser-view.md` with the condition of changing a file of `browser-view`;
  and the rule against values written in place of design tokens in that part's files, where the
  skill places a rule for part of the files (plan choice C9: `src/browser/AGENTS.md`, with the main
  `AGENTS.md` pointing to it), saying that the invariant `browser-view-token-values` guards it, with
  no command of its own.
- Once the main `AGENTS.md` names the styleguide, `check_instructions.py .` reads it: its code
  paths now all exist (slices 4, 6, 7). Expect no new error and no new warning at `AGENTS.md` beyond
  the base's or at `src/browser/AGENTS.md`.
- After this slice `foundation_check.py` exits 0; run `npm test` whole as the plan's last check and
  report its exit code and every failure.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/27-slice9-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
