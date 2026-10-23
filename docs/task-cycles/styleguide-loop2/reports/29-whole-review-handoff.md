# Handoff 29 — reviewer of the whole change

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You review a change you made none of. Questions go to the orchestrator, never to the human. You
alone grade and scope your findings.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Read
  only; write nothing but your report. Run anything that writes files in a temporary worktree of
  the head and remove it afterwards. Do not run the served kitchen-sink command in a way that opens
  a browser tab on this machine (swap the launcher, as the slice-8 reviewer did).
- Method: the project skill `the-way-review-change`, review of the whole change — read
  `.the-way/task-cycle/review/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the files of the range, the styleguide `guidelines/styleguide-browser-view.md` among them.

## Range

`00e53aee5bd21692ddd3b2f7c7541625a3114a3f..b33aa2761e00fef538c569dc5860ecef4dd28e62` — the
foundation entries and slices 1–9, made one after another (`plan.md`, the record's *Slices*).

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec `spec.md` (Decision 8a
  included); plan `plan.md`; size report `plan-size.md`.
- Cycle record `cycle.md`: the questions table (the orchestrator's answers, which bind: QA-1..QA-4,
  R1, R-n1, R-n2, Q-P1..Q-P4, FE-1..FE-5, S1-I1, S2-1..S2-3), *Slices*, *Events*.
- Reports of the agents that made the range: `reports/07-foundation-report.md`,
  `reports/08-slice1-report.md`, `reports/11-slice1-fix-report.md`, and
  `reports/<13,15,17,19,21,23,25,27>-slice<2..9>-report.md`.
- Screenshots of the user-interface slices: `reports/shots/slice4..slice8/`.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (recoloured), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); check crafted input at
  each. Irreversible operation — no.
- The Minor and out-of-scope findings of the slice reviews, which you weigh for the whole change
  (each in its report, in the reviewer's words):
  - Slice 1 with the foundation entries (`reports/09-slice1-review.md`; fix reviewed in
    `reports/12-slice1-fix-review.md`): M1, M2, M3, M5, M6, M7 (M4 fixed with I1).
  - Slice 2 (`reports/14-slice2-review.md`): M1, M2 (M1 addressed in slice 8's README edit).
  - Slice 3 (`reports/16-slice3-review.md`): m1, m2; out of scope o1.
  - Slice 4 (`reports/18-slice4-review.md`): m1–m7.
  - Slice 5 (`reports/20-slice5-review.md`): m1; declined `README.md:52` „bursztynowy”.
  - Slice 6 (`reports/22-slice6-review.md`): m1–m4.
  - Slice 7 (`reports/24-slice7-review.md`): m1–m3.
  - Slice 8 (`reports/26-slice8-review.md`): M1, M2; for the whole change: any `Host` header
    answered (DNS rebinding), `README.md` „bursztynowy”.
  - Slice 9 (`reports/28-slice9-review.md`): m1–m3.
- Check coverage of every item of the task's *To do*, every row of *Settlements to record* and the
  entries the spec and plan add (QA-4 fact, `css-colour-values`, part-map lines), and fidelity to
  the task's sources.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/29-whole-review.md`, first line
  `PASS <sha>` or `FAIL <sha>`.
- Return: that first line, the report path, a one-line check result (commands with exit codes), and
  every concern the next dispatch depends on.
