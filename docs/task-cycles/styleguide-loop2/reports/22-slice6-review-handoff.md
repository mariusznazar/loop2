# Handoff 22 — reviewer of slice 6

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

- Range `4c892df965e7d4e74276afc09ca5c1831316dcea..b4658ac701f58692e96df944468b50a478f0a6c0`, slice 6.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md`; plan `plan.md`
  (slice 6); executor's report `reports/21-slice6-report.md`.
- Cycle record `cycle.md`, questions table: the orchestrator's answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Information from the orchestrator

- Mechanical check: clean worktree; one commit; changed files = slice 6 *Change* (four control
  modules, `styles.css`, `program-editor.ts`, `status-row.ts`, `send-panel.ts`).
- The controls are built to styleguide rule 6 and D-40 as fixed (hover in `highlight`, text role
  kept, S1-I1); FE-5 (no error state for the select list) binds.
- Screenshots: `.runs/task-cycles/styleguide-loop2/reports/shots/slice6/` (13 files; disabled,
  error, empty and selected are forced by loading the built modules, as the report marks).
- Executor's concerns, as information (its report, "Concerns"): Firefox may dim the empty field's
  hint below 4.5:1 and the usual fix `opacity: 1` has no token; an error message widens its field;
  the program editor does not use the error state (invalid number still reverts, as at the base);
  one padding makes the status row's buttons smaller; no test of wiring faults (plan C11).
- Expected `foundation_check.py`: exit 1 with the five pattern errors left after Slice 4.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/22-slice6-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
