PASS 7b1779fd

# Review rc11f — task `ocena-programu-na-ziarnach`, fix of review rc11 (slice 1)

- Range: `aaef0873..7b1779fd`, one commit, `7b1779fd`. `git rev-parse HEAD` in the cycle's worktree gave `7b1779fdc585e0a5b3241060f39526ee05093c19`, which is the head I was given. In my worktree, the pinned the-way was `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (review of a fix). The findings file `reports/rc11-findings.md` bounds the review.
- Files changed: `src/browser/sim/game.ts` (+6) and `tests/sim/content-revision.test.mjs` (+19 / -1). Both are in slice 1's *Change*.

## Findings of `rc11-findings.md`

**1. `newGame` stores any number as the moment the game was made (Important, slice 1): fixed.**

- `src/browser/sim/game.ts:387-391` now throws `RangeError("newGame: <value> is not a safe integer moment")` where `Number.isSafeInteger(madeAtMs)` is false. This happens before any state is built. It is the same test and the same error class as `withSaveTime` (`game.ts:785-786`), the death settlements (`:710`, `:744`) and `momentAfter` (`:91`). The doc comment at `:384` says so.
- Probe (`reports/review-rc11f-probe-newgame.mjs`, output `reports/review-rc11f-probe-newgame-out.txt`). Each case was `newGame(x)`, then `createCharacter`, `withSaveTime`, `savedGame`, a JSON round trip and `loadSavedGame` on the built head:
  - Thrown as `RangeError` at `newGame`, so no state and no document is made: `1.5`, `NaN`, `Infinity`, `-Infinity`, `2**53`, `-(2**53)`, `1e21`, `"5"`, `null`, `true`, `{}`, `[]`, `[5]`, `5n`, `new Number(5)`.
  - Admitted, saved, and loaded back `ok` with the same moment: no argument (0), `0`, `-5`, `1760000000123`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`.
  - `-0`: admitted and stored as `-0`. JSON writes it as `0` and the load gives `ok` with `0`. The game saves and loads, as D-386 requires. `withSaveTime` and the strict load treat `-0` the same way (rc11 found the load admits `-0`), so this is no departure.
- D-386 asks that a game the game's own functions make is never refused by its own load. Its *Rationale* asks that a stored moment be checked where it enters the game state. Both now hold for `newGame`: every value it admits is a safe integer, which the load reads with `integer`, and every other value is refused before a document can exist.
- The new case (`tests/sim/content-revision.test.mjs:353-369`) is red against the base `game.ts` and green at the head. With `src/browser/sim/game.ts` checked out from `aaef0873` in my worktree, `npm test -- tests/sim/content-revision.test.mjs` exited 1: 37 passed, 1 failed, the new case, with "Missing expected exception (RangeError): 1.5" (`reports/review-rc11f-red-on-base-gamets.txt`). With the head restored, it exited 0.
- StrykerJS on `src/browser/sim/game.ts:386-392` killed 4 of 5 mutants. The one survivor empties the text of the error message (`game.ts:389`). That is behaviour not worth fixing in a test: `guidelines/testing.md` „Behaviour, not implementation” says not to pin the exact text of a refusal without a requirement that sets it, and none does.
- Its `decision:` line quotes the first sentence of D-386 word for word from its beginning. The foundation check reports no error in this file.

**Minor 3 of rc11 (comment at `content-revision.test.mjs:117`), fixed in the same commit:** the comment now reads „A difference in the two identity counters alone …”, which matches `COUNTERS_ALONE` (it changes `nextGroupId` and `nextRuleId`). Minor 2 (`balance/campaign.mjs`) belongs to Slice 12 and was not touched. I do not grade it again.

## New findings in the fix diff

### Critical / Important

none

### Minor

**M1. D-386's list of functions that refuse a moment does not name `newGame`** (`foundations/decisions.md:4255` and its *Verification* at `:4264`; outside the fix diff, a note only)

The binding text says „the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError”. The *Verification* lists the same functions. `newGame` now refuses too. The code follows the entry's first sentence and its *Rationale*, so it contradicts nothing. Still, a reader who takes the list as complete could think the check in `newGame` lies outside the decision, and a later change could drop it citing the list. One clause added to the list through `the-way-record-decision` would close this. Nothing breaks if the list stays as it is.

### Out of scope

none

## Default and existing calls unchanged

- `newGame()` gives the same state as `newGame(0)`; the probe compared them by JSON and they were equal. The parameter's default stays `0`.
- In `src/`, the only calls are `newGame()` with no argument: `src/browser/view/app.ts:93`, `:312` and `src/browser/view/page-game-acts.ts:187`. I grepped the whole worktree, outside `node_modules`, for `newGame(` with an argument. The only hits are in `tests/sim/content-revision.test.mjs`. The invariant scripts call `newGame` with no argument or through `newKnowingGame`. `balance/` imports it and calls it with none. No call passes `newGame` as a callback that would hand it an index or an object.
- The focused suites of slice 1 and `tests/balance/campaign.test.mjs` pass at the head (see Checks).

## Trust boundary and irreversible operation

- Trust boundary (`src/browser/sim/saved-game.ts`): the range does not touch this file. The fix only keeps a value the strict load refuses from ever reaching a document. I checked crafted input at the boundary only through the save-and-load round trip of the probe above. rc11 tested crafted version-9 documents for `madeAtMs` and `contentRevision` at the same code, which is unchanged since.
- Irreversible operation: none. The fix adds a guard and a test; it removes, sends and migrates nothing.

## Declined to judge

- `newGame(Object.create(null))` throws `TypeError` instead of `RangeError`, because `String(madeAtMs)` in the message fails on an object with no way to become text. The argument comes from the page's own code (the clock's reading, typed as `number`), not from outside, and the game is refused all the same: no state, no document. `withSaveTime` and the other guards build their message the same way. This is not part of the finding being fixed.
- Whether Slice 8 passes a whole-millisecond reading (`Date.now()`) and not a fractional one. That is Slice 8's work; the fix makes a wrong reading fail loudly at `newGame` instead of losing the save later.

## Checks run

All checks ran in a detached worktree of `7b1779fd` at `.runs/review-rc11f/wt`, after `npm ci` (exit 0) and `git submodule update --init -- .the-way`.

| Check | Exit |
|---|---|
| `npm test -- tests/sim/content-revision.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `npm test -- tests/sim/copy-actions.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/loop-record.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/balance/campaign.test.mjs` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/invariants/test_copy_save.py` | 0 |
| `npx eslint src/browser/sim/game.ts tests/sim/content-revision.test.mjs` | 0 |
| `npx prettier --check` on the same two files | 0 |
| `npm run typecheck` (`node scripts/build.mjs --check`) | 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0 (0 functions and files over a threshold in 336 files) |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: 7 errors, all quotation errors in `tests/sim/judging-record.test.mjs` (:187, :794) and `tests/sim/saved-game-judgings.test.mjs` (:111, :124, :170, :257, :304), which the orchestrator named as owned by later slices; none in a file of the range |
| `python -B .the-way/elements/common/foundation_check.py` (no flag) | 1: the same 7 errors and `judging-cache-reading` with no citing test (a later slice); none in a file of the range |
| `git checkout aaef0873 -- src/browser/sim/game.ts`, then `npm test -- tests/sim/content-revision.test.mjs`, then the head restored | 1 (only the new case fails, at `1.5`); 0 after the restore |
| `node probe-newgame.mjs` | 0, results above |
| StrykerJS `run --mutate "src/browser/sim/game.ts:386-392"` with the repository's `stryker.config.json` | 0; 4 killed, 1 survived (the message text, classified above) |

Not run: the full gate (`npm test` with no argument), as the handoff says.

## Reaches beyond the dispatch

- `foundations/decisions.md:4253-4270`, D-386 whole: the finding and the new `decision:` line cite it.
- D-441, the sentence of its binding text that names the moment the game was made (`decisions.md:11926`): the doc comment of `newGame` cites D-441 next to the new sentence, and I checked that the check does not clash with „kept as it is”.
- `src/browser/sim/game.ts:84-95`, `:700-790` (by grep for `RangeError|isSafeInteger`): to compare the new guard with the existing ones.
- Greps across the worktree for the callers of `newGame` (`src/`, `balance/`, `tests/`, the `loop2-play` skill's `compose-state.mjs`): to confirm that no existing call passes an argument.
- `tests/invariants/test_simulation_inputs.py:50-99`, `:349-351` and `:380`: it calls every exported function of `game.js`, `newGame` among them. I checked that it calls `newGame` with no argument.
- `reports/review-rc11-probe-load.mjs`: used as the pattern for my probe.

## Working copies

- `.runs/review-rc11f/wt` was a detached worktree of `7b1779fd`, with its `.the-way` submodule, `node_modules`, `dist`, and StrykerJS's `.runs/stryker`. I removed it with `git worktree remove --force` (exit 0), then ran `git worktree prune`.
- `.runs/review-rc11f` held the probe, its output, the test logs, the foundation-check outputs, the typecheck log and the StrykerJS log. I removed it whole; `Test-Path` gives `False`.
- Kept beside this report, because the report cites them: `reports/review-rc11f-probe-newgame.mjs` (it imports from `./wt/dist/...` relative to the removed directory), `reports/review-rc11f-probe-newgame-out.txt` and `reports/review-rc11f-red-on-base-gamets.txt`.
- No remainder.

## Unread material

- `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md` and `guidelines/testing.md`: read whole.
- `src/browser/AGENTS.md`: not opened. The fix touches one guard in `src/browser/sim/game.ts` and a test, and rc11 read the file whole for the same slice.
- From the plan's *Read*:
  - Read whole: D-386.
  - Not reopened, because the fix touches neither the revision nor the load, and rc11 read them for the same slice: the spec passages, D-123, D-213, the invariants `save-version`, `simulation-isolation`, `simulation-inputs` and `saved-program-edit`, the glossary `program` and `copy`, and the part map `simulation`.
- The frozen task: not opened. The handoff's section „Passages of the frozen task” is empty.
- `reports/slice-c1-01-executor-report.md` (both sections), `reports/rc11-findings.md`, `reports/review-rc11-report.md` and `reports/slice-c1-01-fix-red-run.txt`: read whole.

## Searches not found or unclear

- The handoff's section „Passages of the frozen task” holds no passage. I judged against the findings file, the plan's slice and D-386.
- Nothing else.
