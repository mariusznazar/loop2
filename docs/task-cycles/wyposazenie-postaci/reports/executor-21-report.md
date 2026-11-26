Status: done with concerns

# Executor report — Slice 21: the balance instrument starts a measurement with the character's gear

## Commits

- `abcfad51` on `task/wyposazenie-postaci` (base `7898151d`): feat: the balance instrument starts a measurement with the character's gear. 9 files, 343 insertions, 32 deletions.

## Files changed

| File | Added | Removed | Note |
|---|---|---|---|
| `balance/engine.mjs` | 45 | 9 | `buildGear` (new, validates slot, item and fit against the data), `makeState` takes `gear`, `startOf` passes the character's gear to `newMapRun`, `runOnce` takes `gear` |
| `balance/trace.mjs` | 10 | 3 | takes `gear` |
| `balance/check-map.mjs` | 5 | 0 | `measureRow` takes `gear` for the sweep only |
| `balance/progression.mjs` | 26 | 4 | `gear` threaded through `measureProgression`, `measureMap`, `measureProgram`, `stockFor`, `stockOnMap` (measured runs and stock runs) |
| `balance/cli.mjs` | 54 | 6 | flag `--gear` for sweep, trace, check-map, progression; `parseGear` (refusal as usage error); usage line; sweep header shows `gear` |
| `tests/balance/gear.test.mjs` | 181 | 0 | new, written first |
| `tests/balance/agreement.test.mjs` | 36 | 4 | `readyGame` and `agrees` take `gear`; one new case on Las — głębiej with a stick in the main hand |
| `.claude/skills/loop2-balance/SKILL.md` | 9 | 1 | names `--gear`; check-map sentence on which columns the gear reaches |
| `.agents/skills/loop2-balance/SKILL.md` | 9 | 1 | byte-identical copy of the line above (reach, see below) |

## Checks (command, exit code)

Test first:
- `npm test -- tests/balance/gear.test.mjs` before any code of the slice, with the engine stub `buildGear() {}` added so the test reaches its assertions: exit 1. The failures were assertions and usage errors (`--gear is no flag of trace`, `--gear is no flag of check-map`, the flag's parse and the engine parameter), none a missing module.
- After the implementation, the first run: exit 1, one failing precondition (the stick did not change `forestBest` on Las, so the sweep test had no effect to check). I changed that test to `forestDeepBest` on Las — głębiej, where a stick does change the sweep (my probe over seeds 1-40: on Las — głębiej several of the 23 reference programs respond, `forestDeepBest` among them; on Las none of them did). The test's expectations did not change.
- `npm test -- tests/balance/gear.test.mjs` after that: exit 0, 8 pass, 0 fail. Rerun after Prettier: exit 0, 8 pass.

Focused checks, all after the change:
- `npm test -- tests/balance/agreement.test.mjs`: exit 0, 9 pass (includes the new stick case).
- `npm test -- tests/balance/engine.test.mjs`: exit 0, 8 pass.
- `npm test -- tests/balance/cli.test.mjs`: exit 0, 25 pass.
- `npm test -- tests/balance/check-map.test.mjs`: exit 0, 7 pass.
- `npm test -- tests/balance/progression.test.mjs`: exit 0, 14 pass.
- `npm test -- tests/balance/trace.test.mjs`: exit 0, 4 pass.
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py`: exit 0, 3 run, OK.
- `npm test -- tests/invariants/test_balance_instrument_repeatability.py`: exit 0, 2 run, OK.
- `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`: exit 0, 3 run, OK (both skill copies byte-identical).

Style, not in the handoff's list but required by the coding guideline:
- `npx prettier --check` on the changed balance and test files: exit 1 first (`balance/engine.mjs`, `tests/balance/gear.test.mjs`), then `npx prettier --write` on those two, then exit 0.
- `npx eslint` on the changed files: exit 0.

Measurement (the slice's *Checks* last line):
- `npm run --silent balance -- progression --maps forestLair --gear mainHand=stick --out .runs/executor-21/lair.md`: exit 0. All 23 reference programs solve 0 of seeds 1-500 on Las — matecznik with the stick. No solved seed, so no finding goes to the human; the paragraph of D-438 stays as it is. Deaths are mostly combat, the rest cold and hunger. The stock needed no manual run.

Own-work check (requirement of the slice: the flag gives slot=item to the engine, refuses unknown slot, unknown item and misfit with the usage error, and no flag gives empty gear):
- Real command line, `node balance/cli.mjs sweep --map forest --program forestBest --gear head=stick`: exit 1, `balance: --gear: item stick does not fit the slot head`.
- Same with `--gear mainHand=bogus`: exit 1, `balance: --gear: unknown item bogus`.
- `node balance/cli.mjs help` lists `--gear` for sweep, trace, check-map and progression (not loop).
- A sweep with `--gear mainHand=stick` on `forestDeep` runs and prints the header with the gear: exit 0.
- Mutations covered by the tests: no gear on the created character, `startOf` not passing the gear, `buildGear` accepting a misfit, the flag not reaching the sweep.

Not run:
- `python -B .the-way/elements/common/foundation_check.py`: not run by me; my change adds no `decision:` line to any test and touches no foundation entry.
- The full suite `npm test` with no file: not run (the handoff forbids it for a slice).
- The one command's instruction-files check: not run.

## Walkthrough and screen check

Not applicable: the change alters no behaviour a user sees in the running game; it alters the measuring instrument and its skill text only.

## Working copies

- Directory `.runs/executor-21/` in the worktree, created for the measurement. It holds `lair.md`, the table of the Las — matecznik progression run; the report's input. It stays, because the orchestrator may read it.
- No worktree, clone or script of mine was made.
- Test logs captured under the session scratchpad (`gear-before.txt`, `gear-after.txt`, `gear-after2.txt`, `gear-final.txt`, `agreement.txt`, `engine.txt`, `cli.txt`, `check-map.txt`, `trace.txt`, `progression.txt`, `test_balance_instrument_file_writes.py.txt`, `test_balance_instrument_repeatability.py.txt`, `test_loop2_balance_skill.py.txt`) are plain output captures of the runs above, not working copies. They sit in the scratchpad directory; the orchestrator may delete them.

## Reaches beyond the slice's *Change*

- `.agents/skills/loop2-balance/SKILL.md`: changed to match `.claude/skills/loop2-balance/SKILL.md` byte for byte. Reason: `tests/agent_workflow/test_loop2_balance_skill.py` requires both copies byte-identical, and the slice's *Checks* include that test.
- Read beyond the handoff's list, for the testing and coding guidelines of the slice: `guidelines/testing.md` read whole, `guidelines/coding.md` and `guidelines/coding-balance-instrument.md` read whole, `balance/loop.mjs` searched for its engine calls (not edited).

## Choices

1. `buildGear` lives in `balance/engine.mjs` next to `buildSkills` and throws for a wrong pair; `parseGear` in `balance/cli.mjs` reads the text and re-raises as the usage error. Rejected: validating in `cli.mjs` alone (the engine would then accept any gear). Cost if wrong: none known.
2. The gear reaches the stock runs of `progression` as well as its measured runs, because the stock character is the same character in the game, with its gear. Rejected: measured runs only. Cost if wrong: the stock of a stick-carrying character is counted with a different gear; small, since a stock run's death is not settled anyway.
3. `sweep`'s header shows `gear` (empty object when no flag). `check-map` and `progression` print tables and have no header.
4. The `engine.mjs` stub `buildGear() {}` was added only to let the test reach its assertions; it was replaced by the real function in the same slice.

## Concerns

- check-map's earning-loop columns (pieces taken, pieces put in, deaths over 24 hours) still start with empty gear: `balance/loop.mjs` calls `makeState` without gear and is outside this slice's *Change*. So with `--gear`, the sweep columns and the loop columns of one row measure different characters. Recommendation: pass the gear through `loopBalance` → `loopOnce` → `makeState` in a later slice, a small change; or accept and keep the table note in the skill. Cost of leaving it: a reader gets a mixed-basis row when `--gear` is given; no effect when it is not.
- The Las — matecznik result (0 of 500 seeds for all 23 programs, with the stick) matches the D-438 exception as it stands; no seed is solved, so this slice reports no finding.

## Searches not found or unclear

- The instruction-hook message on `git commit` asked for `-m` in Bash; the first attempt with a heredoc was blocked by the hook and retried with `-m`. No effect on the commit's content.
- Two of my `Edit` calls on `.claude/skills/loop2-balance/SKILL.md` did not land (the file's mtime and content showed no change; grep found no `--gear`). Found by the check, redone; the result is confirmed by the grep and the byte compare above.
- `balance/loop.mjs`: whether the earning-loop columns of check-map should take the gear is not stated in the slice; treated as out of this slice (see Concerns).

## Unread material

- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: read lines 59-61 (To do 13, 14, 15) and 243-245 (Decisions in play) only, as the handoff names.
- `foundations/decisions.md`: read D-438 (6176-6193) and D-437 (918-931) only. D-428 (12520-12535) and D-429 (12537-12550) not read; the slice names them, I did not need their text to make the change, and the balance file write rule was checked by its test.
- `foundations/invariants.md`: read `instrument-game-agreement` (1438-1446) only. `balance-instrument-file-writes` (1448-1456) and `balance-instrument-repeatability` (1458-1466) not read; their tests pass.
- `foundations/part_map.md` balance-tools (128-138) and agent-workflow (140-158), and `foundations/glossary.md` overlay (296-300): not read.
- `tests/balance/cli.test.mjs`: read lines 1-70, 170-200 and 331-380 only; the other cases were run and pass.
- `.the-way/task-cycle/change/slice.md` and `SKILL.md` of make-change: read whole.
