done with concerns — Slice 2 (The player's acts on the gear), commit ad81cec4 on task/wyposazenie-postaci

# Executor-2 report: Slice 2

## Commits

- `ad81cec4` feat: :sparkles: the player's acts on a character's gear (base `5639c225`)

## Files changed

- `src/browser/sim/gear.ts` (new): +190
- `tests/sim/gear-acts.test.mjs` (new): +311
- `stryker.config.json`: +1 (the line `tests/sim/gear-acts.test.mjs`, before `gear-state`)

Nothing else changed. No foundation entry was written; `game.ts` was not touched, so its size is unchanged.

## What the module does

- `putOnPiece(state, characterId, slot, item)`: refused with `notInChest` where the chest lacks the item (read before the act), `wrongPlace` where the item does not fit the slot, `manualRun` for the character of the manual map run the state holds (going, paused or ended), `noCharacter` / `noSlot` for unknown ids. Otherwise the piece the slot held goes back to the chest and the item leaves it; a key at 0 is removed.
- `takeOffPiece(state, characterId, slot)`: refused with `emptySlot`, with `chestFull` where `pieceCount + 1 > BALANCE.chestCapacity` (60), and the same `manualRun` / `noCharacter` / `noSlot` refusals.
- Accepted acts return a new state (no argument is mutated), raise `gearChanges` by one, and for a character that has an entry in `state.loops` add the slot to `changedSlots` once (a return to the same item included). At the camp nothing is marked. The loop's running map run (`loops[id].run`) is not touched: the act changes only the character's own `gear` (the next map run's gear).
- `gearPick(state, characterId, slot)`: `{ options, takeOff }`, where `options` are the chest's items that fit the slot, in data order, with their counts, and `takeOff` is `null` or the refusal reason (`manualRun`, `emptySlot`, `chestFull`, checked in that order). Null for an unknown character or slot.
- `GEAR_REFUSAL_WORDS` holds the Polish words of the refusals; „skrzynka pełna” is the `chestFull` word.

## Checks

| Check | Command | Exit |
|---|---|---|
| Focused tests, 24 of 24 pass | `npm test -- tests/sim/gear-acts.test.mjs` | 0 |
| Simulation inputs invariant | `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| Mutation selection | `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| Typecheck | `npm run typecheck` | 0 |
| Content identifiers (extra, because `gear.ts` holds Polish words) | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| Prettier on the three changed files | `npx prettier --check ...` | 0 (after `--write` on the two new files) |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 1: 13 errors, all `decision:` quotations of other files (`tests/sim/combat.test.mjs`, `encounters.test.mjs`, `rule-signs.test.mjs`, `skills.test.mjs`, `tests/view/character-screen.test.mjs`); none in the new test file. The handoff says 14 errors; 13 are reported now, and I did not check which one left. |

Failing-first run: the module was first replaced by a stub that returns `{ state, events: [], refusal: null }` and `gearPick` returns `{ options: [], takeOff: null }`. Then `npm test -- tests/sim/gear-acts.test.mjs` exited 1 with 22 failing tests, all `AssertionError`s (no missing-module errors). Two tests passed on the stub, as they should: "the map run going on keeps the gear it started with" and "a created character starts with an empty gear and no gear change counted". The first run's output is kept at `docs/task-cycles/wyposazenie-postaci/reports/executor-2-first-run.txt`. Then the real module was restored and the run passed (exit 0). The foundation check output is kept at `.../reports/executor-2-foundation-check.txt`.

Order note: I wrote the module before the test file, so the failing-first run came after the implementation existed. The failing run was made against the stub, so the failures are real assertion failures. The test file was not written as a red test before the code.

Tests that fail on the base: none. The new test file did not exist on the base, and no other test was run.

Mutation testing (StrykerJS) was not run. The testing guideline says the reviewer of a simulation change runs it; the Own-work check below is my reckoning only.

## Own-work check

- Requirement: a take-off where the chest has no room is refused with „skrzynka pełna”, and the piece stays in the slot. Check: the test "taking a piece off is refused where the chest has no room" (chest of 60 berries). Result: passes; the gear keeps the stick and the berry count stays 60.
- Requirement: at the camp no slot is marked and at a loop character a slot is marked once, even when the same item comes back. Check: the tests "a piece put on and taken off in an earning loop..." and "the return to the same item...". Result: pass.
- Requirement: the act of a character with a manual map run is refused, and the act of another character goes on. Check: the tests with `send` for Anna and an act for Bob, and the paused case. Result: pass.

## Choices

1. Refusal reasons are identifiers (`GearRefusal`), and the Polish words sit in `GEAR_REFUSAL_WORDS` in `gear.ts`, not in `data/`. The plan's Choice puts the words of the refill and the line of gear in the game's data, and says nothing about refusals. The alternative, a `data/` file, would have needed a change outside the slice's *Change* list. Cost if wrong: one small move of a constant in the view slice.
2. `putOnPiece` checks the chest before the act, so a put-on of the item the slot already holds is refused where the chest does not hold that item. The alternative, returning the held piece first, would accept it. Cost if wrong: a one-line change and a test.
3. `gearPick` lists the chest's options even for the character of a manual map run, and reports `manualRun` only in `takeOff`. The view decides whether to show the tiles (D-287 says they are not selectable). Cost if wrong: none now; Slice 20 may need the view to hide the options.
4. Acts on a loop character change `character.gear` only; the loop's running map run keeps its own gear (D-453). The merge at the end of a map run is not in this slice.

## Reaches beyond the dispatch

- I read `foundations/decisions.md` entries D-200, D-50 and D-184 whole, and the part of the glossary for at the camp, manual map run and earning loop, as the handoff lists them. I read the D-463 and D-452/D-453 entries from the foundation to quote D-453 in a test `decision:` line; the quoted sentence passes the foundation check.
- No file outside the three in *Change* was changed.

## Working copies

- `.runs/executor-2/` (a copy of the module made for the stub run, and run outputs) stood in the worktree. Its contents were copied to `reports/` (first run and foundation check) and then removed with `rm -f` and `rm -rf` by full path. `ls .runs/executor-2` now fails with "No such file or directory". Nothing remained.

## Unread material

- `foundations/decisions.md` D-241 (the range 9015-9072 named in the handoff) was not read.
- `guidelines/testing.md` was read in parts (the headings, the sections "Where the expected value comes from", "Test inputs and expected values", "Changing an existing test", "Behaviour, not implementation", "Mutation testing", "Test files in the gate", and the recipes), not whole: the tool output was too large, and the remaining lines were not read.
- `.the-way/task-cycle/change/slice.md` and `SKILL.md` were read whole. `.the-way/task-cycle/change/walkthrough.md` and `ui_check.md` were not read, because the slice does not change a screen.
- `task_frozen.md` and `plan.md` were read only in the ranges the handoff names.

## Searches not found or unclear

- The handoff's foundation ranges matched what I read (D-287 at 10765-10819 and D-463 at 12878-12893); no mismatch.
- The handoff says the foundation check reports 14 errors; it reports 13 now. Not explained.
- The plan's line in *Read* for the simulation part of the part map (34-66) is 34-65 now; read at 34-65.
- Whether a `decision:` line may quote a decision sentence that the test only partly exercises: I quoted only the D-453 sentence, which the test does check.

## Problems observed

- None in the slice's files. Foundation check errors are outside this slice's files.
