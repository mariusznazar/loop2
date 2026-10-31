PASS 3f99110e2c29ae77f4111485bc0d801847ae1f04

# Review of the fix of I-1 on Slice 1, task `petla-zarobkowa`

Fix range `bc8eaec..3f99110`, one commit, two files. `git rev-parse HEAD` is the head given. No
blocking finding remains and the fix broke nothing.

## Findings of the findings file

### I-1. A device clock before 1970 writes a save the game then refuses: fixed

The defect no longer exists on `3f99110`.

- `src/browser/sim/saved-game.ts:1241` reads `integer(read.saveTimeMs)`, the reader of
  `resurrectionReadyAtMs`, as spec section 13 now gives (`spec.md:351-353`). Null stays refused, since
  `integer` takes a safe integer alone.
- The same scratch probe that showed the defect on `bc8eaec`, through the built `withSaveTime`,
  `savedGame` and `loadSavedGame` with a JSON round trip, now gives: `0`, `-1` and `-60000` all load
  (exit 0). So the refusal at `src/browser/view/app.ts:52-54`, and the overwrite at `:216` that made
  the loss final, no longer happen for such a clock.
- The tests bite. With `count` put back for a moment in a scratch copy,
  `npm test -- tests/sim/saved-game.test.mjs` exits 1 with 2 of 25 failing: „a document at the edges…”
  and „a state stamped by a clock set before 1970…”. That new case goes through the real writer and
  the real load, which is the pair no test held before.
- The comment at `:1156` no longer claims a clock cannot read below zero, and a search of the tracked
  files finds that claim nowhere else.

The author contests nothing.

## What the fix itself could have broken

Nothing found.

- **The boundary:** `integer` drops the lower edge that `count` held, so a value below the safe
  integers needed a case of its own. „a save time below the safe integers”,
  `tests/sim/saved-game.test.mjs:1496`, holds it. Null, text, fractions, NaN, infinity, a missing key
  and `2 ** 53` stay crafted and refused.
- **The readers of the value:** nothing but the load reads `saveTimeMs` on this head, so no code
  assumes a sign. The catch-up comes in Slice 3.
- **The version:** it stays 3, rightly. The shape did not change and the load only admits more, so no
  document admitted before is refused now.
- **Changed invariant test:** `save-version`, „a crafted document of the current version is refused
  whole as shape”, lost „a save time below 0” and gained „a save time below the safe integers”. The
  behaviour moved to „a document at the edges…”, `:1784`, asserted as loading, with its cause in a
  comment, as *Changing an existing test* asks. This is a change of requirement by the orchestrator's
  settlement, not a weakening.
- **Size:** the author added one case beyond the recommendation; it holds the edge the change of
  reader moved, so it earns its place.
- **Foundation:** no entry states a sign for the save time, so none needs changing, and
  `foundation_check.py` passes.

## Minor and out-of-scope notes

The three Minor findings of `06-slice1-review-report.md` are outside this review, not fixed by intent.
No new one.

## Declined to judge

Out of scope.

- A forged save time near `Number.MIN_SAFE_INTEGER` with a loop gives a catch-up of about 1.5 × 10¹¹
  game minutes, where the old lower edge, 0, gave about 2.9 × 10⁷. For that save's owner the page would
  stand practically for good. It touches only a player who forged their own save, and spec section 13,
  D-07, D-230 and Q7 accept a long catch-up and set no bound, so it needs no change here. Slice 3's
  catch-up is the place to keep it in view.

## Checks

Run in a separate detached worktree of `3f99110` in the scratchpad, removed afterwards, with
`node_modules` and `.runs/quality-venv` linked from the reviewed worktree.

| Check | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 25 pass, 0 fail |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 19 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 37 pass, 0 fail |
| `npm test -- tests/sim/death.test.mjs` | 0 | 26 pass, 0 fail |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | OK |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree | 0 | `0 errors` |
| Scratch probe of a negative moment, `withSaveTime` to `loadSavedGame` | 0 | `0`, `-1`, `-60000` load |
| The old reader `count` put back in the scratch copy, `npm test -- tests/sim/saved-game.test.mjs` | 1, as wanted | 2 of 25 fail, the two named above; restored after |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:1241-1241"` | 0 | 0 mutants: the line holds nothing StrykerJS mutates, so the revert above stands in for it |

Not run: the product's gate, `npm test` with no file argument, as the dispatch gives. A manual check
in a browser: the fix changes no screen.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Section 13 as settled | `.runs/task-cycles/petla-zarobkowa/spec.md:345-369` | The reading the fix follows |
| The method for a fix | `.the-way/task-cycle/review/fix.md` | Named by the skill for this variant |

## Searches not found or unclear

none
