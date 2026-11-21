# Report — executor of slice 12 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Commits and files

- `c43c8ad7` feat: have the balance instrument make its games at a fixed moment (D-04, D-437)
- `balance/engine.mjs` +10 −1; `balance/campaign.mjs` +3 −1.

## What changed

- `balance/engine.mjs`: new exported constant `GAME_MADE_AT_MS = 0` with a comment (fixed moment, never the clock, no measurement reads it); `makeState` calls `newGame(GAME_MADE_AT_MS)`.
- `balance/campaign.mjs`: imports `GAME_MADE_AT_MS` from `./engine.mjs` (which it already imports); `newAccount` calls `newGame(GAME_MADE_AT_MS)`; each saved program it builds carries `contentRevision: 0` (the orchestrator's note: without it the revision becomes `NaN` at the first content write).

## Choices

- **One named constant in the engine, the campaign imports it.** Reason: the rule "Jedno miejsce wspólnej rzeczy" covers a constant of the same value and meaning in two files, and the campaign already imports the engine (no cycle). It is a measurement parameter, not a game number ("Liczba gry" allows the instrument to keep such), so it is not a copy of the game's default 0; the explicit pass also keeps the instrument off the game's default should that default change. Rejected: a literal `0` in each file (two copies the rule forbids) or leaving `newGame()` bare (relies on the game's default). Cost if wrong: a rename of one constant.
- `balance/loop.mjs` keeps `LOOP_START_MS` as its own clock origin; I did not reuse it as the moment (it is the campaign's real-clock origin, a different meaning).

## Checks (command, exit code)

- `npm test -- tests/balance/engine.test.mjs` — 0 (8 pass)
- `npm test -- tests/balance/campaign.test.mjs` — 0 (16 pass)
- `npm test -- tests/balance/agreement.test.mjs` — 0 (6 pass)
- `npm test -- tests/balance/trace.test.mjs` — 0 (3 pass)
- `npm test -- tests/balance/cli.test.mjs` — 0 (23 pass)
- `npm test -- tests/invariants/test_balance_instrument_repeatability.py` — 0 (2 tests OK)
- `npm test -- tests/invariants/test_cross_part_imports.py` — 0 (OK)
- `npx eslint balance/engine.mjs balance/campaign.mjs` — 0
- `npx prettier --check balance/engine.mjs balance/campaign.mjs` — 0
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — reports `0 errors`; no line names a `balance/` file.
- Not run: the full gate (forbidden to this role). No test was written or changed, so no `// decision:` line exists; the invariant test was not seen failing (no invariant's test written; the scan test already covers the files and passes).

## Own-work check

- **Requirement most likely unmet:** "no measurement reads it, and every case of `tests/balance/` runs unchanged" — i.e. the instrument's results do not change.
- **Check:** `.runs/executor-12/compare.mjs` loaded the base versions of `engine.mjs`, `campaign.mjs`, `loop.mjs` (from `969d4c60`, in a throwaway copy) and the changed ones, and compared `JSON.stringify` of `campaignSweep` (player `edge-daily-decent`, seeds 1–3) and of `runOnce` (map `forest`, first reference program, seed 5), and printed `makeState().madeAtMs`.
- **Result:** `campaign equal: true`, `run equal: true`, `madeAtMs: 0 0`. The tests of `tests/balance/` pass unchanged. A saved program of the campaign now carries a finite revision; this part was verified by reading `withProgramContent` (`saved.contentRevision + …`), not by a test (the campaign cases do not edit program content).

## Walkthrough

The change alters no behaviour a user sees in the running product: it is the balance instrument's internal call of `newGame` and a field of its saved programs; its results were compared equal (above).

## Reaches beyond the handoff

- None beyond the named ranges, except `sed`/grep of `src/browser/sim/programs.ts:385-410` (`withProgramContent`) and `game.ts` `newGame` signature, to confirm the revision's use and the `newGame` argument.
- Handoff inconsistency (small): the working-copy directory is named `.runs/executor-12/` in the handoff body and `.runs/executor-c1-12/` in the dispatch; I used `.runs/executor-12/`.

## Unread material

- `guidelines/testing.md`: read lines 1–209 of 510 (Levels, Rules down to the trust boundaries table); the rest unread, because I wrote no test.
- `guidelines/coding.md`: read whole. `guidelines/coding-balance-instrument.md`: whole. `.the-way/task-cycle/change/SKILL.md` and `slice.md`: whole. D-437, the invariant, the part map and the frozen-task passages: read whole. D-04: read the beginning (lines 59–84 of `foundations/decisions.md`), through the sentence that the game state stores the moment the game was made.

## Searches not found or unclear

none

## Working copies

- `.runs/executor-12/base/` (base versions of the three balance files and a junction `dist`): removed (junction removed with `rmdir`, then the directory; `dist/` verified intact).
- What stays: `.runs/executor-12/compare.mjs` and the test logs `*.log` in `.runs/executor-12/` (inside the ignored `.runs/`; kept as evidence, no further copies).
