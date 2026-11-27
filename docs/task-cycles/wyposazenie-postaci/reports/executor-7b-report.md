Status: done

# Report of executor-7b — Slice 7b (the two tests of the first wolf attack's discovery)

## Commits

- `78a70000` test: :white_check_mark: the first wolf attack's discovery lists the action „Załóż” and the condition „Puste” at the end of their lists, as D-143 now says; no other assertion changes

## Files changed

- `tests/sim/encounters.test.mjs`: 17 lines added, 3 removed (the two expected lists of discovered actions and conditions gain `equip` and `emptyPlace` at their end, in the order the data gives; the lists are reflowed where prettier needs it).

## Cause of the changed expectations (testing.md, "Changing an existing test")

The expected lists were written before Slices 6 and 7. D-143 (`foundations/decisions.md`, entry at lines 6991-7012) now says the first wolf attack brings „Załóż” and „Puste” into the Understanding together with the strike, the kick and the dodge. The change of the two assertions is the requirement's cause, the only assertions changed are those two lists.

## Checks

- Tests on the slice base (`895b1593`), only the failing ones, before the change:
  - `an ending exploration and first wolf produce one catalog-ordered discovery` (line 518): failed, actual list has `equip` and `emptyPlace` extra.
  - `first chill and attack in one minute keep the automatic exploration rule but never start it during combat` (line 562): failed, actual list has `equip` and `emptyPlace` extra.
- `npm test -- tests/sim/encounters.test.mjs`: exit 0, 29 of 29 pass.
- `npm test -- tests/sim/discovery.test.mjs`: exit 0, 50 of 50 pass.
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, 2 errors, neither in `tests/sim/encounters.test.mjs`:
  - `tests/view/character-screen.test.mjs:134`: the quotation stands in no binding sentence of `D-446`
  - `tests/view/character-screen.test.mjs:400`: the quotation stands in no binding sentence of `D-445`
  The handoff stated 14 errors on the base; this run shows 2. I did not check which slice cleared the others; those two are outside my Change and I did not touch them.
- Not run: the product's full gate (`npm test` without a file), as the boundary says.

## Own-work check (section 3)

- Requirement: the two lists must hold `equip` and `emptyPlace` in the data's order, and no other assertion may change.
- Check: the two focused test files above, plus `git show --stat` confirming only the one file changed.
- Result: both files pass; the stat shows only `tests/sim/encounters.test.mjs`.
- The decision lines (`// decision:` quotes of D-143) were left as they stand; the first sentence quoted is still the sentence of D-143 in the foundation.

## Walkthrough and UI check

The slice alters no screen and no behaviour a user sees; it changes two test expectations only. Neither `ui_check.md` nor `walkthrough.md` applies.

## Reaches beyond the dispatch

- Read `foundations/decisions.md` lines 6991-7012 (D-143), as the handoff names.
- Read `task_frozen.md` lines 30-41 (the handoff names 36-39 and 237; I read the surrounding lines).
- Read `tests/sim/encounters.test.mjs` lines 430-600, as the handoff names 440-570.
- Read the guideline `guidelines/testing.md` only at its "Changing an existing test" section (line 129 onward), found by grep. Not read whole.
- None outside the Change.

## Working copies

None made. No worktree, clone or script was created by this stage.

## Unread material

- `guidelines/coding.md`: named by the handoff and by AGENTS.md, not read. I changed no product code; the change is a test file only.
- `guidelines/coding-simulation-module.md`: named by the handoff, not read for the same reason.
- `guidelines/testing.md`: read only its "Changing an existing test" section, not whole. The rest was not read.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.

## Searches not found or unclear

- none

## Choices made

- The two lists are written with the new members at their end, because the actual order from the data puts `equip` after `dodge` and `emptyPlace` after `opponentHealthBelow`. The alternative, reordering the data, is a production change and is outside this slice.

## Problems observed

- The foundation check shows 2 errors instead of the 14 the handoff states. Its cause is not verified here; the two remaining errors are in `tests/view/character-screen.test.mjs`, which is outside this slice's Change.
