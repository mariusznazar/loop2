# Handoff 13 — review of the whole change (review-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh reviewer that made none of this change. You are read-only: change no file of the repository and commit nothing; write only your report. Send questions to the orchestrator by returning `questions`; never ask the human.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; you review **the whole change**, so read `.the-way/task-cycle/review/whole_change.md` when it names it, and other files it names when their step comes. You select your own foundation and guidelines by the parts the change touches, as the method gives.
- Range: from the task's base `381588fbd31838b9c0075707a6588213cf6e5eaa` to the head `434f32bbbf74695181ab5de5add4137d989aaac2`.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/13-review-report.md`; its first line `PASS <head sha>`, `FAIL <head sha>` or `questions`, as the method gives. Return that first line, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code and the section **Searches not found or unclear** (or `none`).
- Do not run the product's whole gate (`npm test` with no argument); the orchestrator runs it after the review. Focused checks, a mutation run and a look in a running browser (`.claude/skills/loop2-play/SKILL.md`; stop a local start you began with `npm run local:stop`) are yours to choose.

## Task, spec, plan

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` — read it whole (the human's task note, accepted 2026-11-07; plan item `plan_mvp2_loop2.md — teraz-i-potem`, task 14).
- Spec: none — no open design choice was found at the start (the two *Questions carried to cycle* were taken as settled by D-04, D-333 and the invariant `rule-state-from-pick`).
- Plan: `.runs/task-cycles/teraz-i-potem/plan.md` (its *Foundation entries*, ten slices, *Coverage* and *Choices*).
- Trust boundary: no — the change touches neither `src/browser/sim/saved-game.ts` nor `assets/**`. Irreversible operation: no. Check that this holds.

## Slices, their ranges and reviews

No slice had a review of its own (every *Risk* none); you judge every slice and the foundation entries. Name for each blocking finding the slice it comes from — or the plan's *Foundation entries*, or none.

| Part | Range | Class and model | Report | Mismatches or points the mechanical check passed on |
|---|---|---|---|---|
| Foundation entries | `381588f..bd44c39` | `same`, opus | `reports/02-foundation-report.md` | D-334–D-337 new; D-280, D-291, D-46, D-324 corrected as the cycle's; D-216 *Rejected* left naming the status row; D-334 points to D-132 for the completion text |
| 1 styleguide roles | `bd44c39..02e41f3` | `same`, opus | `reports/03-slice1-report.md` | none |
| 2 minutes of needs (sim) | `02e41f3..35f53cd` | `cheaper`, sonnet | `reports/04-slice2-report.md` | none |
| 3 „Teraz”/„Potem” (sim) | `35f53cd..e7e8a95` | `cheaper`, sonnet | `reports/05-slice3-report.md` | in the resolution minute, after the turns resolved and an ordinary action started, „Potem” names the ordinary winner (from the one `ruleSigns` judgement); the executor asks whether D-309 wants a combat rule there |
| 4 requirements (sim) | `e7e8a95..c60bd5e` | `cheaper`, sonnet | `reports/06-slice4-report.md` | the executor did not open D-04, D-131, D-135, the glossary or the part map its *Read* named |
| 5 rows under the scene | `c60bd5e..46e0ed9` | `cheaper`, sonnet | `reports/07-slice5-report.md` | „Teraz” has no label word of its own (the executor's reading of To do 1 and D-334); colours and the fixed height are guarded only by its browser look |
| 6 scroll on click | `46e0ed9..92f6860` | `cheaper`, sonnet | `reports/08-slice6-report.md` | report repaired once (first run's exit code re-established); the executor did not read every guideline file of its *Read* whole; a row whose rule was removed from the copy is text, not a control |
| 7 clock in the header | `92f6860..0727fac` | `cheaper`, sonnet | `reports/09-slice7-report.md` | `tests/view/status-row.test.mjs` +98/−206: removed cases; completion at „Minuta 480” checked by jsdom only |
| 8 bar of the condition | `0727fac..cb0212e` | `cheaper`, sonnet | `reports/10-slice8-report.md` | track length 8em the executor's choice (the styleguide gives none); `--bar-width` 2 px |
| 9 body row in cells | `cb0212e..730bc50` | `cheaper`, sonnet | `reports/11-slice9-report.md` | the red of „marznie” forced by hand in the browser look, not reached by play |
| 10 coding guideline rows | `730bc50..434f32bbbf74695181ab5de5add4137d989aaac2` | `cheaper`, sonnet | `reports/12-slice10-report.md` | the executor did not read D-28, D-36, D-265, D-269, `guidelines/coding.md` or the agent-workflow part entry whole |

There are no Minor or out-of-scope findings of slice reviews to carry.

## The orchestrator's rulings during the cycle (for your information; they bind no grade)

- The rows that name a rule are elements with `tabIndex={0}` and click and Enter/Space handlers, as the rule rows of `rule-list.tsx`, not a `<button>` of their own and not the shared button (plan *Choices*; D-44 read as covering buttons, select lists, fields and pick cells).
- The field `status` of `src/browser/sim/data/actions.ts` stays though nothing reads it after slice 7; the task does not ask for its removal.
