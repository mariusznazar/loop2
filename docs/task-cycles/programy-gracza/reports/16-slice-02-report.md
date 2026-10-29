# Slice 2 report — programy-gracza

**Status:** done

## Commit
See `git log` on `task/programy-gracza` after `9624537`: one commit, `test: :test_tube: read the program list and the copy in the tests of the one program` (nine test files, 111 insertions, 50 deletions; no product or foundation file).

## Checks (command, exit code)
`npm test -- <file>` for campfire, conditions, data, encounters, gather, program, purity, repertoire (`tests/sim/*.test.mjs`) and `tests/view/program-editor.test.mjs`: all 0 (pass counts 20, 16, 31, 27, 16, 19, 3, repertoire all pass, 39; fail 0). `npm test -- tests/quality/test_quality_invariants.py`: 0 (with the pinned tools first on PATH). Before the change each of the nine files exited 1. The gate (`npm test` with no arguments) was not run, as the handoff says. `prettier --check` was clean on HEAD for the five files whose formatting I then re-applied with `prettier --write`; the diff stays limited to my edits.

## Changed expectations (To do reasons)
- Reads of `state.program` after `setProgram` outside a map run now read `state.programs[0].program` (a new game's one program; `setProgram` outside a run edits `teamProgram`, here program 1). To do 1.
- Reads after `setProgram` / `send` inside a map run now read `state.run.copy.program`. To do 7. Files campfire, conditions, data, gather, program, purity, repertoire, encounters and the editor test use a local `heldProgram(state)` helper (copy during a run, else the list's only program) or the direct read.
- `tests/sim/encounters.test.mjs`: `stepMinute(state.run, map, state.run.copy.program)`; first-chill rule asserted on the copy; "unavailable rules stay in the program" compares the copy with the input program; two creature-discovery cases compare `result.state.run.copy.program` with `state.run.copy.program` (both defined, so not vacuous). To do 7 and 11.
- `tests/view/program-editor.test.mjs`: every `editor.update(state)` / `editor.update({...state, program})` became `show(editor, state, program?)`, a local helper calling `editor.update(state, program, state.ruleCounts)`, because `update` now takes the program to show and its counts (To do 8). Two states that set `ruleCounts` by hand outside a run gained `countsProgram: 1`, so the counts stay reconciled against program 1 as before and the reconcile checks keep their strength (To do 10 and spec 5, counts beside a program). Without it those two assertions would pass without exercising reconciliation.
- No test deleted, skipped or weakened; assertion counts unchanged.

## Own-work check
Requirement most likely missed: an expectation passing vacuously on `undefined`. Check: grep of every `.program` read left in the nine files (none remain except `copy.program`, `programs[0].program`, `scenario.program`), and all compared values are defined deep-equal targets. Result: none found.

## Reach beyond the Read
- `src/browser/sim/programs.ts` (named in the handoff) for the semantic of `teamProgram`; `guidelines/testing.md` "Changing an existing test" section; `.the-way/task-cycle/change/slice.md`. Nothing else.

## Product faults seen
None.

## Choices
- Local helpers per file rather than editing `tests/sim/program-fixture.mjs` (outside the slice's Change list). Cost if wrong: duplicated six-line helper in five files; a later shared fixture can replace it.
