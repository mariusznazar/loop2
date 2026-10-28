# Designer revision report — spec of `rozwiazanie-lasu`

- Status: done
- Spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md` (revised in place)
- Review answered: `.runs/task-cycles/rozwiazanie-lasu/reports/06-spec-review.md`, finding 1
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md` (pinned the-way `3aee7d9`)

## Questions sent and their answers

None. The finding is right, and the task settles the answer.

## Finding 1 — the streak in the game minute of death

Accepted. To do 4 says the streak grows after the body step of a minute with no loss to cold or
hunger, and a minute with such a loss sets it to zero. The game minute of death is always a minute
of such a loss: health falls only for being chilled or starving (D-60), so it reaches zero (D-61)
only in such a minute. The first spec left the streak as it stood in that minute. That contradicted
To do 4 and loop's test that the task cites (`src/sim/sim.test.ts:555`, `cdc7c0d`: at death of cold
or hunger the current streak is zero).

Changes:

- spec, decision 5, `MapRun.streak`: the rule now applies in every game minute, the minute of death
  included. A map run ended in death holds a streak of 0, and the death branch of
  `minuteBeforePick` sets the streak from the same body-step report as the branch where the
  character lives;
- spec, *Left to the maker*: the list of simulation cases adds "a streak of 0 in the game minute of
  death";
- designer report `05-designer-report.md`, check 4: the line on the streak in the minute of death
  now reads 0, with a pointer to this report.

Way rejected: keep the first reading and justify the departure. No source supports a departure.
The value stays in the game state that task 16 will save, and a non-zero streak on a run ended in
death would claim successive minutes without a loss that the last minute broke.

## The four checks, on the revised spec

1. Placeholders, `TBD`, empty sections: none.
2. Contradictions: none. The revised streak rule agrees with To do 4, D-60, D-61 and D-71. Nothing
   else in the spec described the streak at death. D-62's "screen stays on the state of the game
   minute of death" holds, because that state now carries the streak of 0.
3. Scope: unchanged from `05-designer-report.md`. There are two largely independent changes, the
   fast-forward and the solving of Las, and they meet in `player-map-run-pace` and the status row.
4. Two readings: the streak in the minute of death is now fixed at 0. The other readings recorded
   in `05-designer-report.md` stand.

## Reaches beyond the dispatch

None beyond those of `05-designer-report.md`. This revision read only the review report and the
spec.
