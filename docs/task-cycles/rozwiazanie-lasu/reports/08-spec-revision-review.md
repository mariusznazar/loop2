PASS

# Spec revision review — `rozwiazanie-lasu`

- Spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md`, revised in place
- Revision report: `.runs/task-cycles/rozwiazanie-lasu/reports/07-designer-revision-report.md`
- Earlier review: `.runs/task-cycles/rozwiazanie-lasu/reports/06-spec-review.md`
- Method: `.the-way/task-cycle/spec/SKILL.md`, step 3, and `review.md` (pinned the-way `3aee7d9`)

## Earlier findings

### 1. The streak in the game minute of death — resolved

Spec, decision 5, `MapRun.streak` (spec lines 204–210), now says: "In each game minute, after the
body step, it grows by one where the body step reports no loss and becomes 0 where it reports one
(To do 4). […] a map run ended in death holds a streak of 0 […]. The death branch of
`minuteBeforePick` sets it from the same report as the branch of a living character."

This matches To do 4 and the loop test the task cites (`src/sim/sim.test.ts:555`, `cdc7c0d`). It
can also be built: the death branch of `minuteBeforePick` (`src/browser/sim/run.ts:327`–`333`)
already has the body step's result. *Left to the maker* (spec line 362) now lists the matching
simulation case, "a streak of 0 in the game minute of death".

## What the revision broke besides

Nothing. Only the passages above changed. The places that still mention the streak of an ended
run agree with the new rule:

- Spec line 240, "A map run that has ended keeps the streak it ended with": after a death that
  streak is now 0.
- The completion check still runs only in a minute in which the character lives, and a streak of
  0 never meets the condition.

## Reaches beyond the dispatch

None. I read the revision report, the revised decision 5 of the spec and its *Left to the maker*,
and a grep of the spec for `death` and `streak`.
