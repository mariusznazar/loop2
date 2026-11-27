# Executor report — Slice 2 of the task rana-i-opatrunek

## Status

**done with concerns.** The slice is made and committed with its checks passing. Two concerns: the walk of `walkthrough.md` is due and not performed (section "Walk" below), and one test expectation change needs the orchestrator's eye (section "Changed expectations").

## Commit

- `be60238e` on `task/rana-i-opatrunek`, on base `c669038548dae018918da296bcf94f1101f52a0c`. Not pushed.

## Files changed (added / removed lines, from `git show --numstat`)

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/data/archetypes.ts` | 1 | 0 |
| `src/browser/sim/data/skills.ts` | 39 | 1 |
| `tests/sim/craft-and-tend.test.mjs` | 8 | 5 |
| `tests/sim/data.test.mjs` | 9 | 9 |
| `tests/sim/repertoire.test.mjs` | 22 | 0 |
| `tests/sim/skills.test.mjs` | 1 | 0 |
| `tests/sim/tending.test.mjs` (new) | 286 | 0 |

What changed, in short: `SKILLS` gains `tending` last (name „Opatrywanie małych ran”, pairs craft+bandage and tend+bandage, thresholds 10·28·60·110); `BranchEffect` kind union gains `healing` and `healthRegain` (in the existing `amount` group, no actions); `BRANCHES` gains `strongerRoll`, `deftHand` and `quickHealing` with the costs, effects and previews of the plan and of Q3 (25/+5/„zdrowia”; 10/−2/„min”/minimum 1; 0.05/+0.05/„zdrowia na minutę”); the mage's predispositions gain `tending` last.

## Checks (commands run, exit codes)

Failing run of the new test on the base, before any code (the test written first):
- `npm test -- tests/sim/tending.test.mjs` on the base: exit 1, 7 of 8 tests fail (tree missing, predisposition missing, practice missing, entry missing, branch missing); the one passing test is "a making of another item ... grows no practice of the tree", which passes on the base trivially and guards the pair rule. Log: `.runs/executor-2/tending-base.log`.

Runs after the code and the test changes:
- `npm test -- tests/sim/tending.test.mjs`: exit 0, 8/8 pass (rerun after formatting: exit 0, 8/8).
- `npm test -- tests/sim/data.test.mjs`: exit 0, 45/45.
- `npm test -- tests/sim/skills.test.mjs`: exit 0, 19/19.
- `npm test -- tests/sim/repertoire.test.mjs`: exit 0, 33/33 (rerun after a quotation fix: exit 0, 33/33).
- `npm test -- tests/sim/craft-and-tend.test.mjs`: exit 0, 28/28.
- `npm test -- tests/sim/discovery.test.mjs`: exit 0, 50/50.
- `npm run typecheck`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (after fixing one decision quotation in `repertoire.test.mjs` that matched no sentence of D-120; the first run had exit 1 for that reason).
- `npx prettier --check` on the seven touched TS/JS files: exit 0 (the new test file was formatted with `prettier --write` first; that is the formatter, not a change of content).

Not run: the whole suite `npm test` (forbidden by the handoff, the cycle's own run and CI); the Stryker mutation run (the reviewer runs it on the simulation files per the testing guidelines; in place of it I checked by hand that a wrong pair, a missing item in the pair, or a missing duration effect fails a named test); the foundation's `instruction-files` check (not part of the single-file checks).

## Own-work check (section 3 of the method)

- Requirement: a making or a tending with the bandage adds one practice to the tree, and a making of another item with a recipe adds none. Check: `tending.test.mjs` "a making with the bandage and a tending with it each add one practice..." and "a making of another item ... grows no practice". Result: pass.
- Requirement: the first gathered moss brings „Wytwórz” and the bandage, and the tree enters the Understanding in that minute (D-195). Check: `tending.test.mjs` "the first gathered moss brings ...". Result: pass, `trees` is `["tending"]` in that minute.
- Requirement: a bought „Wprawna dłoń” shortens „Opatrz” by 2 minutes a rank and leaves „Wytwórz” as it is. Check: `tending.test.mjs` "a bought Wprawna dłoń shortens Opatrz...". Result: pass.
- Requirement: the mage holds the tree as its last predisposition; without the predisposition „Wytwórz” and „Opatrz” with the bandage leave the repertoire, and return with it (D-120). Check: `tending.test.mjs` predisposition test; `repertoire.test.mjs` "Wytwórz and Opatrz with the bandage leave the repertoire...". Result: pass.
- Requirement: the three numerical branches carry the plan's costs, effects, previews, descriptions; the kinds `healing` and `healthRegain` carry their amounts per rank. Check: `tending.test.mjs` two data tests. Result: pass.
- The kinds `healing` and `healthRegain` act in nothing in this slice, as the plan says (no code reads them yet); no test asserts that, since Slice 3 changes it.

## Changed expectations (for the orchestrator)

Two kinds of test expectation changed, both caused by the task's own requirements, not by a convenience:

1. `tests/sim/craft-and-tend.test.mjs`: two assertions held that "Wytwórz" and "Opatrz" add no practice ("neither verb adds practice"). Changed to `{ tending: 1 }`, cause: the task item 1, D-193 ("An action ending in effect adds one practice to the character skill its pair of verb and target grows").
2. `tests/sim/craft-and-tend.test.mjs`: two discovery expectations had `trees: []` where the first gathered moss (craft and bandage enter together) and the first crafted "Opatrz" (tend enters new) now bring the tree. Changed to `trees: ["tending"]`, cause: the task item 1 and D-195 ("A character skill tree ... enters the Understanding in the game minute in which the player discovers the first action grown by that skill ..."). In the moss minute the tree enters with both the verb and its bandage, as the task's "the tree enters in the minute 'Wytwórz' enters it with the bandage" requires.

Also changed, no expectation: `data.test.mjs` (the table of grown pairs gains the tree; the "free" list loses `tend` and `craft`, which are now grown; the count goes 8 → 9) and `skills.test.mjs` (the D-379 threshold table gains the tree).

## Plan and code, structural mismatches

None found. One adaptation, reported as the handoff asks:

- `tests/sim/repertoire.test.mjs` held no assertion about "Wytwórz" and "Opatrz" with the bandage staying open with no predisposition (the handoff said such a test exists there). It does not exist in this file, so I added one new test there (no test was changed). The same claim is in `tending.test.mjs`'s predisposition test only in its data form. The repertoire goes through `repertoireOf`, as the file's other tests do; `understanding.ts` is unchanged, as the handoff asks.

## Walk (walkthrough.md), not performed

The change alters behaviour a user sees: the tree and its three branches appear on the screen Postać and the program's discovery band, the practice counters of „Wytwórz” and „Opatrz” start to grow, and a bought „Wprawna dłoń” shortens „Opatrz" in a real map run. Judged: yes, the change alters user-visible behaviour, so a walk is due.

Not performed in this slice. Reason: the walk runs the game in a browser by the `loop2-play` skill, which is outside this slice's *Checks*, and I did not start it within the slice. Case plan the cycle should run (section 4 of the method):

| Case | By what | Verdict |
|---|---|---|
| The screen Postać lists the tree „Opatrywanie małych ran” last, after „Unik przed ciosem”, with its level and points | a screen in a browser, after a character has practice in the tree | unchecked (not run) |
| The tree's branches show with their prices 1 · 1 · 2, 1 · 1 · 2 and 2 · 3, and the numbers „Mocniejszy zwój” 25 (+5), „Wprawna dłoń” 10 min (−2), „Szybkie gojenie” 0.05 | the screen Postać in a browser | unchecked (not run) |
| The first gathered moss brings the bandage, „Wytwórz” and the tree, in one discovery band | a map run in a browser | unchecked (not run) |
| A making or a tending of the bandage raises the practice of the tree by one | the screen Postać in a browser, practice counter | unchecked (not run) |
| A bought „Wprawna dłoń” makes „Opatrz” take 2 minutes less | a map run in a browser | unchecked (not run) |
| side observation | — | none recorded |

Screenshot for `ui_check.md`: not taken, for the same reason; no screenshot place was checked for this slice.

## Working copies

None made. The directory `.runs/executor-2/` holds only test logs (`tending-base.log`, the per-file check logs, `typecheck.log`, `foundation.log`, `prettier*.log`). Nothing to remove.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/ui_check.md` and `.the-way/task-cycle/change/walkthrough.md`: read whole, sent by section 3 of `SKILL.md` for a change that alters a screen.
- Foundation entries: read by the ranges of the handoff (D-379 7577-7612, D-120 7691-7715, D-374 7533-7545, D-191 to D-195 7304-7401, D-145 7049-7074), the invariant `action-duration-minimum` (968-977), the glossary ranges and the part map range 34-66. Not read whole: the other entries of `decisions.md`.
- Test helpers imported by the existing tests, used by their existing signatures and not read in full: `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`.
- `src/browser/sim/data/actions.ts` and `maps.ts`, `balance.ts`: not read; the values I need are read through the tests that already use them (`ACTIONS.tend.minutes`, `ACTIONS.craft`, `BALANCE.gatherChance`).

## Unread material

- `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md` (whole, read).
- `src/browser/sim/skills.ts`, `understanding.ts`, `data/items.ts`, `data/skills.ts`, `data/archetypes.ts` (whole, read).
- `tests/sim/craft-and-tend.test.mjs`, `repertoire.test.mjs`, `skills.test.mjs`, `data.test.mjs` (whole, read).
- `tests/sim/discovery.test.mjs`: not read (not a change file); its check passes.
- The foundation entries listed above, in the ranges given; no other file of the foundation read.

## Searches not found or unclear

- The repertoire test "held today" by the handoff (see the adaptation above): not found in `tests/sim/repertoire.test.mjs`.
- Nothing else.

## Choices made

- The three numerical kinds `healing` and `healthRegain` are added to the existing `amount` group of the `BranchEffect` union rather than as separate members. Rejected: separate members, which need their own arms in every switch. Cost if wrong: none seen; typecheck passes; Slice 3 reads them.
- The repertoire test is placed in `repertoire.test.mjs` (where the D-120 claim lives), and `tending.test.mjs` holds the predisposition and the entry, not a second copy of the repertoire claim. Rejected: a second copy in `tending.test.mjs`. Cost if wrong: none.
- New branches are appended after `quickMeal` in `BRANCHES`, and the new tree last in `SKILLS`. Cost if wrong: none; order is not used by any sum.
- The bandage-making test for another target uses a row added for the test only (the same `withRows` pattern as `craft-and-tend.test.mjs`), so the data file keeps only the bandage's real row.

## Problems observed

- None in the code. The Slice 1 accepted limitation (`actionInRepertoire` not judging an item action by its pair) does not touch this slice's tests, which go through `repertoireOf`.
