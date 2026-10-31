# Handoff — reviewer of the whole change, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of the whole change, a fresh
agent that made none of it. You change no file except your report. Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names, `whole_change.md` beside it
  included, when the step or variant that names it comes.
- Variant: the whole change. You select your own foundation and guidelines, by the parts of the
  change.
- Range: `95de83b..923391c`.
- Frozen task: `.runs/task-cycles/rozliczenie-przejsc/task.md`, read it whole, 254 lines, in two pages.
- Spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md`. Plan:
  `.runs/task-cycles/rozliczenie-przejsc/plan.md`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/rozliczenie-przejsc/reports/17-whole-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4, each a thing this review aims at

- Trust boundary: **yes**. `src/browser/sim/saved-game.ts` reads `solvedMapRun`, `deposited`,
  `Character.generation`, `Character.resurrectionReadyAtMs` and `deathSettlement`. Check crafted
  input there.
- Irreversible operation: **yes**. `SAVED_GAME_VERSION` is 2, so the game discards every older saved
  game state in full at load (D-206) once the merge deploys `main` (D-11). The human accepted the
  cost (task, Q4, *Context*). Check that the change only prepares that: nothing is performed on a
  server.

## Slices

| Slice | Range | Review of its own |
|---|---|---|
| Foundation entries | `95de83b..0363149` | judged within Slice 1's review, report 08 |
| 1 | `0363149..de432c6` | yes: report 08 `FAIL 16f8bee`, fix `16f8bee..de432c6`, report 10 `PASS de432c6` |
| 2 | `de432c6..8949515` | yes: report 12 `PASS` |
| 3 | `8949515..8737dba` | yes: report 14 `PASS` |
| 4 | `8737dba..3eb2a8d` | **none**: you judge it |
| 5 | `3eb2a8d..923391c` | **none**: you judge it |

Each report and its handoff stands under `.runs/task-cycles/rozliczenie-przejsc/reports/`.

- Report of the executor of Slice 4: `15-slice4-report.md`. Its mechanical check passed with one
  mismatch: of the 16 screenshots `s4-*.png` it saved, it opened three.
- Report of the executor of Slice 5: `16-slice5-report.md`. Its mechanical check passed with two
  mismatches: one console error on the harness page, not investigated, and the turn of a line to
  ready read from the DOM with no screenshot.
- The screenshots stand in `reports/` as `s4-<state>-<1280|480>.png` and `s5-*.png`; the harness in
  `.runs/task-cycles/rozliczenie-przejsc/harness/`. Judge appearance from them, as your method gives.
  The way through an account stayed unobserved in both slices: the game does not start locally
  without a full account configuration (D-111), so the plan took the harness route (plan, *Choices*).

## Minor and out-of-scope findings of the slice reviews

These stand in the reports, sections *Minor* and *Out of scope*: `08-slice1-review-report.md` (M1,
M2, M3, O1), `10-slice1-fix-review-report.md` (M1), `12-slice2-review-report.md`,
`14-slice3-review-report.md`. Carry none forward as yours unless you find it again; the orchestrator
lists them in the request.

## Points the cycle has already settled, for your coverage

- Spec decision 11 is the orchestrator's settlement of the last finding of the spec's review.
- `Changes outside the task's list in To do 22`: D-03, D-04, D-179 and D-212's *Verification*.
- The whole-change review checks coverage of every item of *To do*, every row of *Settlements to
  record*, every projected entry the task carries, and source fidelity.
