# Handoff — reviewer of the whole change, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (pinned the-way `3aee7d9`), read whole; read
  `whole_change.md` beside it when the method sends you there. You made none of this change.
- Stage: **review of the whole change**. Read-only: change no file of the repository, commit
  nothing. Do not run the product's full gate (`npm test` without a file) — the orchestrator runs it;
  focused checks of your own are yours to run.
- Range: `6540e4c..7bc8746` (target `main` at `6540e4c` to the branch head).
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/20-whole-review.md` — its first line
  `PASS 7bc8746`, `FAIL 7bc8746` or `questions`.
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md` — read whole.
- Reviewed spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md` (review `PASS` after one revision:
  `reports/06-spec-review.md`, `reports/08-spec-revision-review.md`).
- Plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md` (six slices; slice 4's *Change* amended by the
  orchestrator to add `foundations/part_map.md`), size report `plan-size.md`.

Select your own foundation entries and guidelines by the parts of the change (`simulation`,
`browser-view`, `product-foundation` for `foundations/*.md`).

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## The move of the pin

The task branch's first commit `c0c51a0` moved the-way pin from `574a37b` to `3aee7d9` at the
request of the person who started the cycle. Check that it holds only the gitlink, at `3aee7d9`, and
what the installer owns (here: nothing else — every installer file was kept, `reports/02-pin-move-apply.log`).
The gate on `c0c51a0` failed the same three checks as the base and no other
(`reports/03-pin-gate.log`, `reports/03-pin-foundation.log`), so the move carried no check to the task.
Failing on the base for the environment: `tests/invariants` `test_loop2_one_serving_process`
setUpClass (Get-NetTCPConnection found no listener), `tests/quality` `test_ruff_source_rules` and
`test_shellcheck_source_rules` (tools not on PATH).

## Slices — none had a review of its own; judge each

| Slice | Range | Executor's report | Mismatch the mechanical check passed on |
|---|---|---|---|
| Foundation entries | `c0c51a0..82bbb1c` | `reports/12-foundation-entries-report.md` | the part-map line for `tests/invariants/test_streak_program_change.py` not written here (the check refuses a pattern without a tracked file) — moved to slice 4 |
| 1 — pace in the simulation | `82bbb1c..aa75130` | `reports/13-slice1-report.md` | none |
| 2 — pace buttons | `aa75130..9ad0e5b` | `reports/14-slice2-report.md` | none |
| 3 — the streak | `9ad0e5b..635ac25` | `reports/15-slice3-report.md` | none |
| 4 — an edit zeroes the streak | `635ac25..9dd8306` | `reports/16-slice4-report.md` | none (`foundations/part_map.md` per the amended *Change*) |
| 5 — completion and solved maps | `9dd8306..68cfa84` | `reports/17-slice5-report.md` | `tests/sim/streak.test.mjs` changed outside the slice's *Change*: an existing case at a streak of 480 now completes; the report names the task as cause |
| 6 — the screens | `68cfa84..7bc8746` | `reports/18-slice6-report.md` | none |

Slice 1's review covers the plan's *Foundation entries* (range from `c0c51a0`). Name for each
blocking finding the slice it comes from, or that it comes from none.

## The check in a browser

Slices 2 and 6 alter what screens show and left the hand check in a browser and its screenshot
unchecked (D-75, D-87, D-88). The previous task cycle in this product (`odkrywanie`) had its
whole-change reviewer run that check: the built server without account settings, `/api/account`
answered by a Playwright route, Chromium. Where you can, run it the same way for the pace buttons
(selected state, in a pause, after death), the status row with the streak, the completion screen
and the headquarters' condition sentence and solved mark; save screenshots under
`.runs/task-cycles/rozwiazanie-lasu/reports/` as `browser-*.png`. A state a page cannot be steered to
(a completion needs 480 game minutes without a loss) is reported unchecked with that reason.

## Report

Write your full report as the method gives it and return only its first line and the report path.
