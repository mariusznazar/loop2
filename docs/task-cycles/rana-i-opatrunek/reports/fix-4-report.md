# Fix 4 report — the blocking findings of the review of Slice 4

**Status:** done

## Commits (range 16e9e93e..7bee096f)

- `7bee096f` fix: the refill of „Ucisk” only into an empty pocket its item fits; `pressure.test.mjs` and `tending.test.mjs` registered with the mutation runner; the new test case.

The new test was written first and seen failing before the code change (below); it is committed together with the code in one commit.

## Files changed

| File | + | − |
|---|---|---|
| `src/browser/sim/program.ts` | 8 | 5 |
| `stryker.config.json` | 2 | 0 |
| `tests/sim/pressure.test.mjs` | 43 | 0 |

## Findings

**I-1 — fixed.** `stryker.config.json`, `tap.testFiles`: added `"tests/sim/pressure.test.mjs"` before `previous-programs.test.mjs` and `"tests/sim/tending.test.mjs"` after `team.test.mjs`, each in its alphabetical place. `tending.test.mjs` goes in too, as the head of the findings file asks (the reviewer's O-1). Check: `npm test -- tests/quality/test_mutation_test_selection.py` gives exit 0 (1 test, OK). The failing run before the edit is the reviewer's (exit 1, both files named as missing); I did not repeat it.

**I-2 — fixed.** `src/browser/sim/program.ts`, `combatPiece`: the empty slot of a refill is now the first empty slot of the action's slots that the item fits (`fitsSlot(item, slot)`, already imported from `character.ts`). So „Ucisk — {rzecz}” of a healing item that fits no pocket finds no piece and is refused „brakuje 1 × {rzecz}”. The doc comment says so. The held case (a slot already holding the item) is unchanged. The strike is unchanged too: its stick fits the main hand.

New test in `tests/sim/pressure.test.mjs`: „„Ucisk” of a healing item that fits no pocket takes no piece from the backpack and is refused „brakuje 1 × {rzecz}”; one that fits a pocket refills the first empty pocket”, with `decision:` lines for D-456 and D-457. It lays `SPLINT` (healing, no `fits`) in `ITEMS` and asserts four things:
- `combatPiece` with empty pockets and 1 splint in the backpack gives null;
- the combat judge at 40 health reads `{ bar: "blocked", reason: "brakuje 1 × szyna" }`;
- a whole fight has no turn of „Ucisk”, the first action is the kick, and the backpack and gear stay as they were.

It then lays `SPLINT` with `fits: "pocket"` and asserts the other way round: with pocket1 holding a bandage, `combatPiece` gives `{ slot: "pocket2", refill: true }`.

- Before the code change: `npm test -- tests/sim/pressure.test.mjs`, exit 1. 15 passed, 1 failed: the new test, on its first assertion, with actual `{ slot: "pocket1", refill: true }` against expected `null`.
- After: exit 0, 16 of 16.

## Checks run (after the fix)

| Command | Exit |
|---|---|
| `npm test -- tests/sim/pressure.test.mjs` | 0 (16 pass) |
| `npm test -- tests/sim/combat.test.mjs` | 0 (11) |
| `npm test -- tests/sim/gear-combat.test.mjs` | 0 (8) |
| `npm test -- tests/sim/gear-combat-wear.test.mjs` | 0 (10) |
| `npm test -- tests/sim/encounters.test.mjs` | 0 (29) |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (49) |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 (40) |
| `npm test -- tests/sim/gear-acts.test.mjs` | 0 (27) |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm run typecheck` | 0 |
| `node node_modules/eslint/bin/eslint.js src/browser/sim/program.ts tests/sim/pressure.test.mjs` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim/program.ts tests/sim/pressure.test.mjs stryker.config.json` | 0 |

The whole suite was not run.

Not run: StrykerJS itself. The fix registers the files and does not run the mutation tool; per `testing.md` the reviewer runs it.

## Own-work check

Most likely missed: the rule the other way round — an item that fits a pocket must still refill the first empty pocket. It is held by the second half of the new test (pocket2 after a bandage in pocket1). The bandage's refill is held by the existing tests of the slice: „„Ucisk” uses up the bandage of the first pocket holding one …” (refill on the fourth turn) and the saved-fight test. Both still pass.

The walk of `walkthrough.md` is not done in a fix (WAY-406).

## Working copies

- `.runs/executor-4-fix/` (in the worktree), holding the commit message file: removed.
- No other copy was made. The reviewer's probe (`reports/review-4-probe.mjs`) was not rerun.

## Unread material

- `reports/review-4-report.md` and `reports/review-4-probe.mjs` / `.out.txt`: not read. The findings file carries the evidence I needed.
- `.the-way/task-cycle/change/SKILL.md` sections 3 and 6: taken as read in this session for Slice 4.

## Searches not found or unclear

none
