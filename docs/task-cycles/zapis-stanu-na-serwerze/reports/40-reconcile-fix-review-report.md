PASS 8eb6042

# Review of the fix — reconciliation finding I-1, task `zapis-stanu-na-serwerze`

Fix range `776acbc..8eb6042`: `24b75f6` (code and tests), `64d1a94` (D-181), `8eb6042`
(`guidelines/coding-saved-game.md`). The worktree's `HEAD` is `8eb6042`, the head I was given.
Bounded by the findings file `reports/39-reconcile-fix-findings.md` (I-1 only) and the fix report
`reports/39-reconcile-fix-report.md`.

## Findings of the findings file

**I-1 — fixed.** The game can no longer hold a trip count that its own load refuses.

- The field: `tripCount` in `src/browser/view/trip-editor.ts:12` now takes only
  `Number.isSafeInteger(count) && count >= 1`. `"9007199254740992"`, `"99999999999999999999"` and
  `"1e20"` give `null`, so the field keeps its warning and commits nothing. „Dodaj przedmiot” adds
  a count of 1 (`trip-editor.ts:71`); ↑, ↓ and „Usuń” only reorder or drop entries.
- The game's check: `checkTripList` in `src/browser/sim/programs.ts:208` now uses
  `Number.isSafeInteger`. Every way a program enters the game state goes through `checkProgram`:
  - `editProgram` (`programs.ts:497`);
  - the copy's edit (`game.ts:215`, `:220`);
  - a new program, `emptyProgram`, holds empty lists;
  - `saveCopyIntoProgram`, `saveCopyAsNewProgram` and `switchProgram` move programs that were
    already checked;
  - the frozen `bringPlan` copies the checked bring list (`game.ts:161`);
  - `deposited` comes from `clipTrip`, never above a planned count;
  - the load refuses an unsafe count (`program` through `checkProgram`, and `tripList` through
    `identity`).
- Evidence: my probe from the first review now stops at `editProgram`, which throws
  "program: duplicate trip item or invalid count" for `Number("99999999999999999999")`. The new
  test of `tests/sim/saved-game.test.mjs` round-trips `Number.MAX_SAFE_INTEGER` and pins the
  refusal of `2 ** 53` and `1e20`. With `tripCount` reverted to `Number.isInteger`,
  `tests/view/trip.test.mjs` fails.
- Removing the extra `identity` loop from `program` in `saved-game.ts` takes no protection away: the
  bound now lives in `checkProgram`, which the load calls, and the crafted cases "a trip count beyond
  the safe integers" and "a frozen bring count beyond the safe integers" still pass.
- D-181 (`64d1a94`) now says what the code does: a safe integer from 1 up, at most
  9007199254740991. The *Rationale* and *Rejected* sections gain the reason and way (b). The
  warning text is unchanged. The comments and `guidelines/coding-saved-game.md:136-142` now cite
  D-181 for a bound that D-181 actually holds. The new meaning goes to the human (fix report § New
  meaning for the human).

## What the fix itself broke

None found. No new Critical or Important finding.

- `editProgram` throwing on an unsafe count is the pre-existing behaviour for every invalid program.
  The view never commits such a count, since `tripCount` refuses it first.
- The test changes only add values (`2 ** 53` and `1e20` to the refused list) and add admitted
  boundary cases (`Number.MAX_SAFE_INTEGER`, `"9007199254740991"`). No assertion was weakened.

### Minor

None new. The Minor findings m-1 and m-2 of `reports/37-reconcile-review-report.md` stay open,
outside this fix.

## Declined to judge

- Surviving mutants of `checkTripList` on lines the fix did not change: the error messages, the
  `Array.isArray`, `isObject` and `typeof` guards. Each is equivalent: a later read throws or
  `isSafeInteger` refuses the value anyway.

## Checks

| Check | Result |
|---|---|
| `git worktree add --detach <scratchpad>/wt-fx 8eb6042` (node_modules joined by a junction) | 0; removed afterwards, the reviewed worktree clean at `8eb6042` |
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (14 pass) |
| `npm test -- tests/sim/trip.test.mjs` | 0 (15 pass) |
| `npm test -- tests/view/trip.test.mjs` | 0 (4 pass) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 (39 pass) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (35 pass) |
| `npm test -- tests/sim/program.test.mjs` | 0 (19 pass) |
| Probe `<scratchpad>/probe/big-count.mjs` on the built `8eb6042` | 1, expected: `editProgram` throws on the unsafe count, so no such state exists to save |
| `tripCount` reverted to `Number.isInteger`, then `npm test -- tests/view/trip.test.mjs` | 1 (expected); file restored |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/programs.ts:198-216"` | 0; 21 killed, the `isSafeInteger` line among them; 5 survived and 1 had no coverage, all on unchanged lines and equivalent (Declined to judge) |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, `8eb6042`) | 0 (0 errors) |

Not run: the whole gate (`npm test` with no argument), forbidden by the dispatch.

## Reaches beyond the dispatch

- `src/browser/sim/game.ts:136-161`, `:215-220` and `programs.ts` (the list of exports and the
  callers of `checkProgram`): every path by which a trip count enters the game state.
- `src/browser/view/trip-editor.ts:60-180`, read through a search for `tripPlan`: every act of the
  editor that writes a count.

## Searches not found or unclear

none
