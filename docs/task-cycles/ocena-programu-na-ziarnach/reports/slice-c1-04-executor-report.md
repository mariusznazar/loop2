# Report — executor of slice 4 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `614c7559` — feat: add the record of a judging, the mark read from it and the act of a judging that leaves the game state as it was (D-440, D-441, D-442). Base `7b1779fd`.

## Files changed (added / removed lines)

- `src/browser/sim/judging-record.ts` — +90 / -7
- `src/browser/sim/judging.ts` — +26 / -1
- `tests/sim/judging-record.test.mjs` — +340 / -7 (two first-run quotations of D-440 changed; imports added)
- `tests/sim/judging.test.mjs` — +63 / -2

No file outside the slice's *Change*. No new test file, so `stryker.config.json` needed no addition (both test files were already listed; `tests/quality/test_mutation_test_selection.py` passes).

## What was made

- `judging-record.ts` (imports neither `game.ts` nor `judging.ts`; the first run's `rememberedOf`, `judgingMark`, `withRememberedJudging`, `judgingsWith*` stand untouched for Slice 9):
  - type `JudgingRecord` = `{ results: kind[]; equipment; contentRevision; generation }` (beside `JudgingMark`, `JudgingIds`);
  - `recordOfJudging(state, ids, judging)` (S2): kinds of the twelve results (cause and minute dropped), equipment copied, the content revision of the triple's program and the generation of its character in the state it got; plain `Error` on a character the team lacks or a program not on the list;
  - `markOfRecord(state, ids, record | null | undefined)` (S3): `null` for no record; `null` unless the character is on the team at exactly the stored generation, the program is on the list at exactly the stored revision and the results number `BALANCE.judgingSeeds.length`; otherwise `JudgingMark` by the stock rule (less in the chest: note, no badge; more: as it was). The mark's arithmetic is a private `markOfHeld`, shared with the first run's `judgingMark` (behaviour unchanged).
- `judging.ts`: `judgeAndRecord(state, ids)` — answers `GameResult & { judging, record }` with `state` the very state it got and `events: []`; judging from `judgeOnSeeds`, record from `recordOfJudging`, both from the one state. The first run's `judgeAndRemember` stays.

## Checks (command, exit code)

Tests written first, failing for the expected reason (stubs of the three functions in place, so the tests reached their assertions):
- `npm test -- tests/sim/judging-record.test.mjs` — exit 1; 9 new cases failed on assertions (mark `null` where a standing mark was expected, a stub record, no refusal thrown), 22 old passed.
- `npm test -- tests/sim/judging.test.mjs` — exit 1; the new act case failed on the record's deepEqual.
After the code:
- `npm test -- tests/sim/judging-record.test.mjs` — exit 0 (31 pass, 0 fail). One run before that exited 1 for a bug of my own test (mutating a frozen judging); fixed in the test, rerun exit 0.
- `npm test -- tests/sim/judging.test.mjs` — exit 0 (15 pass)
- `npm test -- tests/sim/death.test.mjs` — exit 0 (33 pass)
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0
- `npm test -- tests/invariants/test_simulation_isolation.py` — exit 0
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 0
- `npm run build` — exit 0; `npm run typecheck` — exit 0
- `npx eslint` on the four files — exit 0; `npx prettier --check` on the four files — exit 0
- `node tests/quality/eslint-size-rules.mjs` — exit 0 (0 over a threshold in 336 files)
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1; the errors left are all in `tests/sim/saved-game-judgings.test.mjs` (Slice 9's, lines 111, 124, 170, 257, 304); none in my files. (One error of mine, a D-442 quotation starting mid-sentence, was found at the first run and fixed; second run shows none in my files.)
- Not run: the full gate (`npm test` with no file), per the handoff.

## Own-work check

Requirement most likely unmet: "every erasing of the task becomes a comparison at reading" — a badge that lies after a death, an A→B→A change or a rename. Checks written: the mark is none for a lost-practice death in a manual run, an earning loop and the catch-up (Ola's record standing at the same time), for a revision changed, changed back (A→B→A), a take list, swapped groups, a rule written at the first chill; standing after a covered death (manual and loop), a death with no practice, a bought rank, a rename, an edit of the same content and an edit of another program; a record of a generation or revision *above* the state's shows nothing; result counts 0, 1, 11, 13, 24 show nothing. Showed: all pass. Manual mutation run (code mutated, build, the file's tests): dropping the generation comparison, the revision comparison, the results-count comparison, `<` to `<=` in the stock rule, the record's generation fixed to 1 and its revision fixed to 0 — each failed the file (6 of 6 caught); removing the `!character || !saved` guard does not compile (the guard is also needed so that a hostile record with undefined fields cannot match an absent character).

## Choices

- The act answers as a `GameResult` (state the very state, `events: []`) plus `judging` and `record`, so a store plumbing for acts needs no second shape and the identity of the state is directly assertable; rejected: returning only `{ judging, record }`. Cost if wrong: Slice 5/6 may drop `state`/`events`, a one-line change.
- Names: `JudgingRecord`, `recordOfJudging`, `markOfRecord`, `judgeAndRecord`, chosen not to collide with the first run's `rememberedOf`, `judgingMark`, `judgeAndRemember`; Slice 9 may rename.
- The mark does not check that the map of the triple is in the game's data (spec Decision 2 "The check" lists three conditions and the map is none of them; the orchestrator's note says "the map the game gives" — I did not add a map check). Cost if wrong: a record of a map gone from the data would show a mark on a card that cannot be opened, harmless; adding `Object.hasOwn(MAPS, mapId)` is one line.
- Two first-run tests quoted the old first sentence of D-440 ("The saved game state holds ..."); I changed those two comment lines to the entry's present first sentence (task note: yours where you change the file). The first-run test bodies are unchanged.
- No test of the first run was removed or weakened.

## Behaviour a user sees

None: pure simulation functions that nothing calls yet (the store and the view come in later slices); no walkthrough or UI check applies.

## Reach beyond the handoff

None. (I read `src/browser/sim/programs.ts:365-428` to see how the revision is raised, to write the test's expected values relative to it; it was in the slice's neighbourhood, not named by the handoff.)

## Unread material

None. Read whole: the method `SKILL.md` and `slice.md`, `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-simulation-module.md`, `src/browser/AGENTS.md`, the four files to change. Foundation entries D-439, D-440, D-441, D-442, D-165, D-190, D-218, D-409 read whole; `simulation-inputs` and `simulation-isolation`, the glossary entries and the part-map entry read at the given ranges. `types.ts` read at lines 85-115, 370-415 and 455-555 (the types the slice uses), not the whole file; `game.ts:640-724` and `loop.ts:295-411` as named. The spec's Decisions came from the handoff's copies, `plan.md` and `cycle.md` not opened.

## Searches not found or unclear

- The handoff names the working-copy directory `.runs/executor-4/` in one line and `.runs/executor-c1-4/` in the message that dispatched me; I used `.runs/executor-c1-4/`.
- Foundation entries rows 1-3, 6 of the handoff correspond to D-441, D-442, D-440, D-165 as found by their headings; the handoff gave headings, not numbers for rows 1 and 2.

## Working copies

`.runs/executor-c1-4/` (test outputs, a backup of the source and a mutation script) stood under the worktree's `.runs/`; removed. No remainder.
