# Report — fix of the review's finding I-1 on Slice 1, task `petla-zarobkowa`

**Status:** done

## Files and commits

Commit `3f99110` on `task/petla-zarobkowa`, on top of `bc8eaec`, address `the owner's address`, not
pushed. Worktree clean.

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/saved-game.ts` | 3 | 2 |
| `tests/sim/saved-game.test.mjs` | 23 | 4 |

## The finding

**I-1, a device clock before 1970 writes a save the game then refuses: fixed.**

- `src/browser/sim/saved-game.ts`: `saveTimeMs: integer(read.saveTimeMs)` in place of `count(…)`, as
  `resurrectionReadyAtMs` is read and as spec section 13 now gives. Null stays refused: `integer`
  refuses anything but a safe integer. The doc comment of `game` no longer says a clock cannot read
  below zero.
- `tests/sim/saved-game.test.mjs`: „a save time below 0” moved from the crafted documents to the
  loading edges, with its cause in a comment, as *Changing an existing test* asks; the comment over
  the save time's crafted cases and the one over the edges corrected.
- A new case, „a state stamped by a clock set before 1970 loads back from its saved document”: through
  the real `withSaveTime`, `savedGame`, a JSON round trip and `loadSavedGame`, at -1, -60 000 and
  `Number.MIN_SAFE_INTEGER`. This is the writer and the load agreeing, which no test pinned.
- A new crafted case, „a save time below the safe integers”: `count` held that lower edge by its
  minimum, and `integer` holds it by the safe-integer check, so the edge needed its own case.

`SAVED_GAME_VERSION` stays 3: the shape did not change, and the load only admits more.

**The check that shows it:** the failing run and the passing run below.

## Checks

The failing run, with the tests changed and the source not yet:

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 1 | 2 of 25 failing, each at its assertion: „a document at the edges…” at „a save time below 0”, „a state stamped by a clock set before 1970…” at `-1` |

On the commit:

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 25 pass, 0 fail |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 19 pass, 0 fail |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |
| `npm run typecheck` | 0 | |

**Not run:** the product's gate, `npm test` with no file argument, kept for the orchestrator.

## Not touched

The review's three Minor findings stand, as the dispatch gives. I did not read the review report; the
findings file holds I-1 alone.

## Reaches beyond the dispatch

- `.runs/task-cycles/petla-zarobkowa/spec.md:351-353`: the settled wording of section 13, to follow it
  word for word.

## Searches not found or unclear

none

## Choices

- **The two added cases go beyond the recommended „one test case”.** The crafted case at the lower safe
  integer is the only one outside the finding's letter; it holds the edge the change of reader moved.
  Cost if wrong: one line of a test.
- **Clamping to 0 in the saver and in `keep()`:** not taken, as the reviewer rejected it: two callers
  and a stored moment that is not the moment of the save, against D-231.

## Changed invariant tests

`save-version`: „a crafted document of the current version is refused whole as shape” lost „a save time
below 0”, by the settlement of spec section 13, and gained „a save time below the safe integers”. The
behaviour moved to „a document at the edges…”, where it is asserted as loading.

## Problems as observed

none
