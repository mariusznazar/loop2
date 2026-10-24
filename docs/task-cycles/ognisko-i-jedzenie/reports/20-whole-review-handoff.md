# Handoff — review of the whole change, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
**review the whole change** as an agent that made none of it. Use the project skill
**`the-way-review-change`** (read its method and what it names, whole). Read only; write nothing but
your report, whose first line is `PASS <sha>`, `FAIL <sha>` or `questions`. You select your own
foundation and guidelines by the parts of the change ("Reading the foundation" of
`.the-way/elements/common/way_of_working.md`; `.the-way/product-guidelines/reading.md`). Questions
go to the orchestrator, never to the human.

You judge every slice that had no review of its own, and name for each blocking finding the slice it
comes from (1–13, or `Foundation entries`), or that it comes from none. Check coverage of every item
of the task (*To do* 1–15 and the acceptance criterion), every row of its *Settlements to record*
(1–15) and every projected entry it carries (the two it writes — D-25 with gathering, D-26 with the
campfire — and the parts it makes true of those other tasks write), and fidelity to the task's
sources.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Range: `a945cf1d4c62e8cdac222a7de47277c08a77b2c5..c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b`
  (task base a945cf1 on `main`; head c8260e6). 62 files, +5380 −301.
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md`.
- Reviewed spec (read whole): `.runs/task-cycles/ognisko-i-jedzenie/spec.md` — `PASS` after one
  revision; its *Decisions* 1–5 bind; the orchestrator's settlements stand in it.
- Plan (read whole): `.runs/task-cycles/ognisko-i-jedzenie/plan.md` — 13 slices; Slice 13 gained part
  (d) and `tests/invariants/test_walk_feasibility.py` by the orchestrator's amendment after Slice 8.
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/20-whole-review-report.md`.

## Answers of step 4

- Trust boundary: **yes** — `assets/icons/**` (part `browser-view`): `assets/icons/campfire.svg`
  from game-icons.net, untrusted. Slice 10 had a review of its own (`PASS`); check the boundary
  again as it stands at the head.
- Irreversible operation: **no**.

## The slices

| Slice | Range | Own review | Executor's report | What the mechanical check passed on |
|---|---|---|---|---|
| Foundation entries (F1–F20) | a945cf1..3789fa4 | no — judge with Slice 1 | `reports/06-foundation-entries-report.md` | concerns: `minute-span-split` reads `Method: test` before its test (Slice 13 writes it); *Rejected* fields worded by the writer; `action-in-progress` read literally against death mid-action — D-54 states the exception |
| 1 | 3789fa4..d15aeb3 | no | `reports/07-slice-1-report.md` | `test_exploring_reveal.py` control threshold lowered from >10 to >5 |
| 2 | d15aeb3..6a443ee | no | `reports/08-slice-2-report.md` | `test_walk_target.py`, `test_walk_feasibility.py` gained seeds (3 → 9) |
| 3 | 6a443ee..7a273ae | no | `reports/09-slice-3-report.md` | — |
| 4 | 7a273ae..46ec64d | no | `reports/10-slice-4-report.md` | body on `MapRun.body`; `realMsCarry` set to 0 at death; `mapRunEnded` at „Zakończ”/„Restart” |
| 5 | 46ec64d..dfe814a | no | `reports/11-slice-5-report.md` | — |
| 6 | dfe814a..cc0669d | no | `reports/12-slice-6-report.md` | campfire `{ at, minutesLeft }`, 0 = extinguished or never lit; its checks did not run `test_walk_feasibility.py`, which it broke (fixed in Slice 13) |
| 7 | cc0669d..006616f | no | `reports/13-slice-7-report.md` | editor screenshot unchecked |
| 8 | 006616f..612404f | no | `reports/14-slice-8-report.md` | changed `src/browser/sim/body.ts` outside its *Change* (`eatenBody`); editor screenshot unchecked |
| 9 | 612404f..ab1558b | no | `reports/15-slice-9-report.md` | labels „Zostało mniej niż N min — ognisko”, „Z dala od — ognisko”; no unit beside the editor's number |
| 10 | ab1558b..6981b7f | **yes — `PASS 6981b7f`** (`reports/17-slice-10-review-report.md`) | `reports/16-slice-10-report.md` | changed `tests/sim/data.test.mjs` outside its *Change*; container icon checks skipped (no Docker) |
| 11 | 6981b7f..eca1fb1 | no | `reports/17-slice-11-report.md` | screenshot unchecked; comment `src/browser/sim/data/actions.ts:3` still says only „Idź” gets a target name |
| 12 | eca1fb1..8c7db07 | no | `reports/18-slice-12-report.md` | five icons on a tile drawn a third smaller; new column without a heading; never-lit campfire reads „ognisko — wygasłe”; screenshot unchecked |
| 13 | 8c7db07..c8260e6 | no | `reports/19-slice-13-report.md` | acceptance on real time 1760000800000, seed 1946377216 |

Findings of the slice reviews (Slice 10), for you to place:

- Minor — `src/browser/view/footer.ts:25`: the view writes by hand the list of things that have an
  icon, the four resources plus the campfire; a future data file reusing an existing icon would get
  no footer line, and no check would catch it.

## Checks on this machine

`npm test` exits 1 on the base for three checks unrelated to the change:
`tests/invariants/test_loop2_one_serving_process.py` (`Get-NetTCPConnection` finds no listening
connection) and `tests/quality` `test_ruff_source_rules`, `test_shellcheck_source_rules` (Ruff and
ShellCheck not installed). Docker's daemon does not run here (container checks skip). No settled way
to take a screenshot exists in the foundation. The orchestrator runs the product's gate after your
review.

The predecessor game loop (`C:\Storage\repos\loop`) may be read only in its `src/sim/data/` files
and its tests.
