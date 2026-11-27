PASS 7bee096f03aaff62280b63b32d5280c8ecd13efd

# Review of the fix of Slice 4 — rana-i-opatrunek

Range `16e9e93e872f9b14618c398cd859e255e42b875e..7bee096f03aaff62280b63b32d5280c8ecd13efd` (one commit, `7bee096f`); `git rev-parse HEAD` in the worktree gave `7bee096f…`. Method `.the-way/task-cycle/review/SKILL.md` with `fix.md`; bounded by `reports/fix-4-findings.md`. The fix does not touch the trust boundary `src/browser/sim/saved-game.ts`.

Counts: blocking 0 (I-1 fixed, I-2 fixed, nothing new of Critical or Important grade) · Minor 1 (new, in the fix diff) · out of scope 0.

## Findings of the findings file

**I-1 — fixed.** `stryker.config.json` `tap.testFiles` now lists `tests/sim/pressure.test.mjs` (between `new-account-first-pass` and `previous-programs`) and `tests/sim/tending.test.mjs` (between `team` and `time`), each in its alphabetical place, as the findings file's head asks. Evidence: `npm test -- tests/quality/test_mutation_test_selection.py` at the new head, exit 0 (exit 1 at `16e9e93e`, in the first review).

**I-2 — fixed.** `src/browser/sim/program.ts:546-548`: the empty slot of a refill is now the first of the action's slots that is empty and that the item fits (`fitsSlot(item, slot)`); the slot that already holds the item is unchanged, and so is the strike (its stick fits the main hand). The doc comment says the same. Evidence:
- The first review's probe (`reports/review-4-probe.mjs`), run again at the new head: `combatPiece` of „Ucisk — szyna” with empty pockets and one splint in the backpack gives `null` (was `{"slot":"pocket1","refill":true}`); the fight's first turn is the kick, and the backpack keeps its splint (output `reports/review-4-fix-probe.out.txt`).
- The new test of `tests/sim/pressure.test.mjs:314-355` (null piece; the judge at 40 reading `brakuje 1 × szyna`; a whole fight with no turn of „Ucisk”, backpack and gear unchanged; and with `fits: "pocket"` the refill going to `pocket2` after a bandage in `pocket1`) passes at the head (16 of 16) and, with `program.ts` of `16e9e93e` put back in my working copy, fails (15 passed, 1 failed) — so it holds the fix.
- StrykerJS on `program.ts:536-552` with the tests of combat and „Ucisk”: 28 killed, 1 survived — `if (item === null) return null` → `if (false)`, the same equivalent survivor as in the first review (both callers test `combatItem` before `combatPiece`); every mutant of the new `fitsSlot` condition is killed.

## What the fix diff itself broke

Nothing found. The change narrows one `find` predicate; `fitsSlot` was already imported (`program.ts:4`, used at `:353`). No code is made for a test's input: the condition is the rule of D-456/D-457, and the test lays its own item row and takes it off again.

### Minor (new, in the fix diff)

**N-1.** `tests/sim/pressure.test.mjs:314-316`: the comment above the new test ("Catches a refill that puts into an empty pocket…") restates what the test name and its `decision:` lines already say. `testing.md`, "Where the expected value comes from": "komentarz bez takiej informacji się nie pisze". Its last sentence ("No item of the data but the bandage heals, so a second healing item is laid in the data") does carry a reason for the laid row; the first two sentences could go. No effect on what the test protects.

## Minor findings of the first review

M-1 (a saved fight with „Ucisk” turns loads for a character without the branch — the probe at the new head shows `ok: true` still), M-2 and M-3 are not part of this fix and stay as they were; they go to the request's list.

## Checks run

In a worktree of `7bee096f` at `.runs/review-4-fix/` (`.the-way` at `6ed3cb36…`, equal to the gitlink; `node_modules` a junction to the main checkout's).

| Command | Exit |
|---|---|
| `npm test -- tests/sim/pressure.test.mjs` | 0 (16 pass) |
| `npm test -- tests/sim/pressure.test.mjs` with `src/browser/sim/program.ts` of `16e9e93e` (working copy only, restored after) | 1 (15 pass, 1 fail: the new test) |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/sim/combat.test.mjs` | 0 |
| `npm test -- tests/sim/gear-combat.test.mjs` | 0 |
| `npm test -- tests/sim/gear-combat-wear.test.mjs` | 0 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 |
| `npm test -- tests/sim/gear-acts.test.mjs` | 0 |
| `npm test -- tests/sim/tending.test.mjs` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm run typecheck` | 0 |
| `node probe-review-4.mjs` (the first review's probe; output `reports/review-4-fix-probe.out.txt`) | 0 |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review-4-fix.json` (config kept as `reports/review-4-fix-stryker-config.json`) | 0 — 28 killed, 1 survived (equivalent) |

Not run: the full `npm test` (the cycle's own run before the request); the repository's own StrykerJS configuration, whose initial run includes the test files later slices repair and would abort.

## Reaches beyond the dispatch

- `tests/sim/pressure.test.mjs` helpers (`withRows`, `SPLINT`, `fighter`) and `src/browser/sim/program.ts:1-20`, `:353`: to confirm the import of `fitsSlot` and how the test lays its row.

## Working copies

- `.runs/review-4-fix/` under `the worktree's root`, a detached worktree of `7bee096f` (logs in its `out/`): the `node_modules` junction removed first with `rmdir` (the main checkout's `node_modules` present after), then `git worktree remove --force`, then `git worktree prune`. Removed.
- Kept in `reports/`: `review-4-fix-probe.out.txt`, `review-4-fix-stryker-config.json`.
- No remainder.

## Unread material

none — the findings file, the fix report, `fix.md` and the whole fix diff were read.

## Searches not found or unclear

none
