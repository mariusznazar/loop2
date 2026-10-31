# Report — spec designer, revision, task `rozliczenie-przejsc`

Status: done

Spec revised in place: `.runs/task-cycles/rozliczenie-przejsc/spec.md`. Findings answered:
`reports/02-spec-review-report.md`. The design did not change: all edits stand in *Foundation
entries*, in the wording of decision 7, and in two lists at the end of decision 10 and *Left to the
maker*. Nothing outside `spec.md` and this report was written; no gate run.

## Findings

| # | Finding | What changed in the spec |
|---|---|---|
| 1 | The D-04 row marks `resurrectionReadyAtMs` and task 18's moment as a violation | The row now names the violation as the clock's current reading written into the game state on each reading, and says a stored moment of an event complies. Decision 7's heading, its *Rejected* and decision 4's rejected bullet say „current reading”, and decision 7 draws the same line |
| 2 | D-03 repeats D-04's sentence | New row: D-03's *Rationale* takes the wording D-04 takes. A search of the repository for the sentence found D-03, D-04 and one comment, `src/browser/view/game-view.ts:81`, which joins *Left to the maker* |
| 3 | The D-194 row leaves the sentence To do 11 makes false | The row says the sentence loses the death, which D-190 carries, and the part on a run cut short stays as written |
| 4 | The D-189 row leaves its *Rationale* | The row removes the old *Rationale* and takes the approved one, narrower than the finding asked; see below |
| 5 | D-179 listed as still true | D-179 leaves the list and has its own row, its violating example narrowed to a run that is not a manual run of a map already solved |

## Where the revision goes beyond or differs from a finding

- **Finding 4, narrower.** The approved *Rationale* (`definicja_mvp_loop2.md:1479`–`1485`) also says
  „the mark on the list of maps shows the one price of that” and speaks of paying the earning
  loop's practice at its stop. Neither is true before task 18, and Q5 gives the mark to task 18. So
  D-189 takes it less those two clauses, the same cut the task makes in its body. *Rejected* takes
  „a trial cut by the chest's contents” in place of `unknown`; the two earning-loop ways wait for
  task 18.
- **Same gap, other rows.** D-190's row had the silence of finding 4: *Rejected* reads `unknown`
  and *Verification* names one invariant. It now takes the approved *Rationale* and *Rejected*
  (`definicja_mvp_loop2.md:1525`–`1533`) and gains `resurrection-renewal`, `death-settled-once` and
  the examples the task quotes. D-189's *Verification* gains `solved-map-manual-run` and the
  violating examples the task quotes. The approved D-190 *Rationale* speaks of the earning loop as
  part of a stake; that reads as a reason, not a claim about today's game, so it stays whole.
- **The reviewer's notes for the maker.** `tests/sim/trip.test.mjs:361` joins the list of tests that
  change. The tick-to-line wiring test goes to *Left to the maker* as a named choice; the design is
  unchanged.

## The answer given

The *Origin* of a new decision cites `rozliczenie_przejsc_loop2.md in the vault (Notes/Projects/(P)
Loop/_zadania)`, with its section and its question or row: stands in *Foundation entries*.

## The four checks, on the revision

1. No placeholder, `TBD` or empty section.
2. No contradiction left between sections: the wording of decisions 3, 4 and 7 and of the D-04 row
   agrees on a stored moment of an event against the current reading.
3. Scope: unchanged, as in `reports/01-spec-design-report.md`. Three rows are not in To do 22's list:
   D-03, D-04, D-179, each marked so; all three need naming in the request.
4. One reading picked: „the moment of an event” is written once, at the event, so a stored moment
   complies with D-04 and a reading rewritten on each tick does not.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| D-03, whole | `foundations/decisions.md:39`–`55` | finding 2 |
| `definicja_mvp_loop2.md`, lines 1463–1492, 1511–1540 | vault | the approved *Rationale*, *Rejected* and *Verification* for D-189 and D-190 |
| A search of the repository for the sentence „only from the game state” | worktree | any further repeat of D-04's sentence |
| `.the-way/task-cycle/spec/review.md`, by search | worktree | what a revision is held to; the method gives no separate revision steps |

**Searches not found or unclear:**

- `design.md` holds no steps of its own for a revision beyond the ones for writing; the four checks
  and the report's form were applied again.
- The approved D-190 *Verification* is level 2 alone, while D-190 today cites `trip-run-end`; the row
  keeps the invariant and adds the new two with the examples.
