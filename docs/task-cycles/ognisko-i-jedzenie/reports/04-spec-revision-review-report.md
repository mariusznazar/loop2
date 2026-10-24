PASS

# Report — review of the revised spec, cycle `ognisko-i-jedzenie`

- Spec reviewed: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`, as revised once
- Method: project skill `the-way-write-spec`, review role (`.the-way/task-cycle/spec/SKILL.md`, § 4,
  review of a revised spec), pin 86b78ad
- Read against: the frozen task `task.md`; my earlier report `02-spec-reviewer-report.md`; the
  revision handoff `03-spec-revision-handoff.md` (orchestrator's answers) and the designer's
  `03-spec-revision-report.md`; the foundation entries and guidelines read for the first review.
- Findings: Critical 0, Important 0, Minor 0. Two notes below, neither a finding: neither changes
  what is built.

## Earlier findings

1. **Campfire or burning stick on an unrevealed tile — resolved.** The new Decision 4 (spec lines
   342–361) makes "Wytwórz — ognisko" and "Zapal — patyk" infeasible on a tile not revealed, as
   "Zbierz" is; "Zapal — ognisko" and "Zasil — ognisko" follow, since they need a campfire on the
   character's tile. No tile is ever un-revealed, so every campfire and burning stick stands on a
   revealed tile, where the list (`tile-list.ts:42`) and the drawing (`terrain-picture.ts:62`) show
   it: *To do* 15 holds in every case. Ways (b) and (c) are recorded as rejected, the cost is given,
   and the request names the choice to the human. The bullet left to the maker is gone.
2. **A feeding that adds nothing — resolved.** Decision 1 step 5 (lines 173–177) now has a feeding
   land on the campfire it started on, whatever its state at the end: it uses its fuel and adds 20
   to the minutes left, 0 included. This reads *To do* 9 and row 14 as written. Way A's weak point
   and the rejected feeding ways (lines 207–215) match the orchestrator's answer. No other part of
   the spec relied on the old rule (I searched for "margin", "adds nothing", "burnt out": only the
   new text matches).

## What the revision added besides

- Decision 5 (lines 363–371) settles „Minuta <n> · Mag umarł z głodu” and „patyk — płonie, zostało
  <n> min” exactly as the handoff gives them, names from the data (D-18); *Left to the maker* now
  keeps only the status texts of the new actions. Consistent with *To do* 3 and 15 and with
  `content-identifiers` ("Mag" is not the archetype's name, „Mag żywiołów”).
- Nothing else changed in a way that contradicts the task, the foundation or the spec itself.

## Notes (not findings)

- Line 210–211, way A: "a rule „Zostało mniej niż N min — ognisko → Zasil — ognisko” feeds for every
  N of 1 or more". For N = 1 the claim is wrong. The condition holds only at 0 minutes left. After
  step 3 a campfire at 0 is extinguished, and "Zasil" needs a burning one (*To do* 9), so that rule
  never feeds. It feeds for every N of 2 or more. The rule of step 5 is unambiguous, so the build
  does not change, but a maker who writes a test from this sentence will find N = 1 failing. The
  wording can be fixed when the decision is written.
- Decision 4 does not say whether it becomes a foundation entry. Decisions 1–3 each do, and row 10
  ("gathering not feasible with a full backpack"), a feasibility rule of the same kind, is a
  decision of the foundation. *Foundation entries* does not name it. This is for the foundation step
  or return step to judge (a new decision, or a sentence added beside D-25's gathering part). The
  build does not depend on it.

## Reaches beyond the dispatch

None beyond the files read for the first review. `cycle.md` was not read, as instructed.

## Checks

No product command was run, because the spec review is read-only. `npm test` and
`python -B .the-way/elements/common/foundation_check.py` did not run in this review.
