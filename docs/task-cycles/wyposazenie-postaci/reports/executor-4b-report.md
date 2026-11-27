done

# Executor 4b report: the test lines quoting the changed sentences of D-144 and D-145

## Status

`done`. The slice's Goal is met: the foundation check reports no decision-citation line of D-144 or D-145. The only two errors left are the lines of D-445 and D-446 in `tests/view/character-screen.test.mjs` (lines 400 and 134), which Slice 18 owns.

## Commits

- `74f9ce2a` test: :white_check_mark: quote the sentences of D-144 and D-145 as they now stand in the simulation tests that cite them, the strike's stick taken from the main hand or from the backpack into an empty hand

Range: base `5714afbd`..`74f9ce2a`. Files changed: `tests/sim/encounters.test.mjs` (+3 −3), `tests/sim/rule-signs.test.mjs` (+1 −1), `tests/sim/skills.test.mjs` (+2 −2). Total 6 insertions, 6 deletions. No production code changed.

## Changes, by line

Each change touches only the quoted citation text; no assertion was changed. The reason for each: D-144 and D-145 were changed by Part B of the foundation (the sentences now stand as the citations quote them).

- `tests/sim/encounters.test.mjs:373` (D-145): the old quote „A stick stays in the backpack after a strike” now quotes „A stick stays in the main hand after a strike, with its condition unchanged.” The test sets a stick in the backpack, strikes, and asserts health, streak and defeated attacks. The new rule takes the stick from the backpack into the empty hand in the same turn, so these assertions hold unchanged.
- `tests/sim/encounters.test.mjs:606` and `:797` (D-144): the quote is now the D-144 sentence that reads „requires a stick in the main hand of its gear, taken there from the backpack where the hand is empty (D-457)”. Line 606's test is a dodge with no strike; line 797's tests are the combat time-splitting scenarios. No assertion depends on where the stick sits.
- `tests/sim/rule-signs.test.mjs:390` (D-144): same quote change. The assertion that a strike with no stick says „brakuje 1 × patyk” holds, since the fixture has no stick in hand or backpack.
- `tests/sim/skills.test.mjs:503` and `:545` (D-144): same quote change (`replace_all`, both occurrences). The strike fixtures put the stick in the backpack with an empty hand, which the new rule takes into the hand; the damage (14), practice and streak assertions hold.

Not changed:
- `tests/sim/data.test.mjs:229` quotes the D-144 sentence exactly as it now stands, and the foundation check does not flag it. The handoff listed it for a change; no change was needed, so I left it alone. Its assertions (`ACTIONS.strikeWithStick` with `combat: { damage: 6, item: "stick" }`) do not test where the stick sits.

## Checks

Run at the slice's base-plus-my-change state, each with the command and exit code:

- `npm test -- tests/sim/data.test.mjs`: exit 0; 45 pass, 0 fail.
- `npm test -- tests/sim/encounters.test.mjs`: exit 0; 29 pass, 0 fail.
- `npm test -- tests/sim/rule-signs.test.mjs`: exit 0; 40 pass, 0 fail.
- `npm test -- tests/sim/skills.test.mjs`: exit 0; 19 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py`: exit 1; 2 errors, both `tests/view/character-screen.test.mjs` lines 134 (D-446) and 400 (D-445), which are the expected remainder until Slice 18.

Before my change the same check reported 8 errors: `encounters.test.mjs` 373, 606, 797; `rule-signs.test.mjs` 390; `skills.test.mjs` 503, 545; and the two character-screen lines. The handoff counted 14 errors; the count at my base was 8, and the other six lines it listed (combat.test.mjs, Slice 4's) were not flagged on this base.

Tests failing on the base: none. No test failed after my change, so there was no base measure to take. The failing-test rule of the slice method did not apply.

## Own-work check

Requirement: the slice's Goal, that after this slice the foundation check reports no decision-citation line of D-144 or D-145, and that no assertion changes meaning. Check: the foundation check run above, plus the four focused test files, which all pass. Result: the D-144 and D-145 lines are gone from the check's output, and the four files pass. The changes are quote-only, so no test was weakened; the mutation step does not apply to quote-only edits. The "Changing an existing test" rule (guidelines/testing.md, D-73) asks for a stated reason for any change to a test; the reason is D-144 and D-145 as changed by Part B, recorded per line above.

## Working copies

None made. The scratch logs of the test runs were written under `.runs/` and deleted before the commit.

## Unread material

- `guidelines/coding.md` and `guidelines/coding-simulation-module.md`: named by the handoff, not read. The slice changes only quoted comment text in test files, so the guidelines bear on nothing in this change, but I did not read them.
- `guidelines/testing.md`: read only the section "Changing an existing test" (via grep, lines 129-140 of the file), not the whole file.
- `foundations/decisions.md`: read D-144 and D-145 (worktree copy, lines 7014-7050 by the current numbering), D-451, D-456 and D-457 (by grep and reads in the range the handoff gives), and D-380 from `task_frozen.md`. D-457 and D-458 were not read whole.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-31` and `:214-215`: read whole for those ranges.
- `docs/task-cycles/wyposazenie-postaci/plan.md:612-628`: read whole.
- The test ranges named in the handoff: read whole for `tests/sim/encounters.test.mjs:360-410, 598-622, 695-892`, `tests/sim/rule-signs.test.mjs:380-422`, `tests/sim/skills.test.mjs:495-585`, and `tests/sim/data.test.mjs:220-265`.

## Searches not found or unclear

- The main checkout at `foundations/decisions.md` is an older copy than the worktree's (it still says D-145 is „A stick stays in the backpack”). I first read it by mistake; all reads used for this slice were then taken from the worktree copy at `foundations/decisions.md`, which carries the Part B text.
- The handoff's count of 14 foundation-check errors and its listing of the combat.test.mjs lines did not match this base (8 errors, combat lines not flagged). Recorded above; no action taken on combat.test.mjs, which is Slice 4's file.
- The handoff's list named `tests/sim/data.test.mjs:229` as needing a change, but that line already quotes the standing sentence; recorded above.

## Choices and adaptations

- Used the sentence as it stands for D-144 with its „(D-457)” reference in the four files, the same text as `data.test.mjs:229` and the foundation.
- Changed the test quotes with `replace_all` in `skills.test.mjs` and `encounters.test.mjs` (two occurrences in each); no other test in those files is affected by the wording.
- Did not change `tests/sim/data.test.mjs` (see above).
- No adaptation of section 4 of the method (the plan and code did not disagree).

## Problems observed

- None in the code. The only open item is the expected pair of character-screen lines, which Slice 18 owns.
