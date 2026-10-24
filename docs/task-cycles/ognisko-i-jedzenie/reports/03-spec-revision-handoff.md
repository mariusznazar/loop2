# Handoff — spec revision (once), cycle `ognisko-i-jedzenie`

You are the designer of `spec.md`, resumed for its one revision (step 7 of
`.the-way/task-cycle/skill/SKILL.md`), with the same method `the-way-write-spec`. Revise
`.runs/task-cycles/ognisko-i-jedzenie/spec.md` in place; write no plan, code, test or foundation
entry. Write your revision report to
`.runs/task-cycles/ognisko-i-jedzenie/reports/03-spec-revision-report.md`.

## Findings of the review

The review's full report: `.runs/task-cycles/ognisko-i-jedzenie/reports/02-spec-reviewer-report.md`
(first line `FAIL`; 2 Important). Its findings, in the reviewer's words:

1. **Important — a campfire or a burning stick on an unrevealed tile: *To do* 15 cannot be met, and
   the spec leaves the case to the maker.** "the task's *To do* 7 and 10 put no condition of a
   revealed tile on "Wytwórz — ognisko" or "Zapal — patyk", and the character does stand on
   unrevealed tiles … So for a campfire built on an unrevealed tile no reading of the spec meets
   *To do* 15 as written, and the maker has to choose among ways that differ in kind … (a) is a
   choice of the simulation, which the spec, not the maker, must make."
2. **Important — a feeding started at a burning campfire can be carried out and add nothing:
   behaviour the task does not ask for.** "a feeding the program picks while the campfire has 5
   minutes of burning left or fewer is feasible (the campfire burns), lasts its 5 minutes and adds
   nothing … A natural program rule "Zostało mniej niż 5 min — ognisko → Zasil — ognisko" therefore
   never feeds at all".

## The orchestrator's answers (autonomous choices of the cycle; write them into the spec)

- **Finding 1 → way (a).** "Wytwórz — ognisko" and "Zapal — patyk" are infeasible on a tile not
  revealed, as "Zbierz" is. "Zapal — ognisko" and "Zasil — ognisko" need a campfire on the
  character's tile, so they follow. Reason: the smallest reversible reading that fulfils *To do* 15
  in every case; it keeps the tile list and the drawing as D-19 and D-41 define them and mirrors
  the gathering rule of *To do* 5. Way (b) rejected: it changes what the list of revealed tiles and
  `tile-hidden` mean; way (c): leaves *To do* 15 unmet. Cost if wrong: a program that crafts after
  "Wędruj" passes to its next rule; the request names this feasibility condition to the human as a
  choice of the cycle. Record under *Decisions* in the spec and remove the bullet from *Left to the
  maker*.
- **Finding 2 → way (i).** A feeding lands on the campfire it started on whatever that campfire's
  state at the end of the feeding: it uses its stick and adds 20 to the minutes left, 0 included,
  so a campfire that burnt out during the feeding burns again. Reason: reads *To do* 9 and row 14
  ("ile by ich było") as written, and a rule "Zostało mniej niż N min — ognisko → Zasil — ognisko"
  works for every N ≥ 1. Rejected: the spec's rule (a feasible feeding that does nothing); way (ii)
  (fuel at the start — the one action whose effect lands at its start). Cost if wrong: a fire that
  went out during its last ≤ 4 minutes is relit for one stick instead of the two of "Zapal" — a
  case only a feeding started while it burned can reach; task 9, which prices lighting, may close
  it. Rewrite Decision 1 step 5 and the weak point of way A accordingly.

Rulings on the points of your report `01-spec-designer-report.md`:

- Point 1 (acceptance reading): your reading stands — the acceptance program draws on the closed
  list as this task leaves it, "Eksploruj" included. Keep it under *Constraints*; the request names
  it to the human.
- Point 2 (satiety floor 0; gathering infeasible at stock 0): stand as written.
- Point 3 (texts the task does not give): settle in the spec — death by hunger: the status row reads
  „Minuta <n> · Mag umarł z głodu” beside the task's „Minuta 312 · Mag zamarzł”; a burning stick in
  its tile row: „patyk — płonie, zostało <n> min” after the campfire's „ognisko — płonie, zostało 42
  min”. Status texts of the new actions stay with the maker, after the task's examples and the
  existing actions' texts, named in its report.
- Point 4 (task 11 join): Decision 2 already covers both orders of merging; no change. The
  orchestrator notes it in the request.
- Point 5: answered by finding 1.

Change nothing else. Return `done` with the revised spec.
