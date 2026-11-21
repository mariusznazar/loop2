# Report — executor of slice 10 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Files and commits

- `tests/sim/saved-game.test.mjs`: +39 / -175 lines.
- Commit `57ed451a` (on base `3966b24e`).

## What changed

- The document of version 9 (`DOCUMENT`) and `HEADQUARTERS` hold no `judgings` key; they keep the content revisions, the counts of the earning loops and `madeAtMs` from Slice 2. `JUDGINGS`, `MIXED_RESULTS`, `ALL_SOLVED` and `judgedOnForest` are gone.
- The header comment over the documents says the document holds no judging (D-441) and keeps the paragraph that version 9 is raised and not deployed, so the content revision and the moment are added without a raise. The version stays 9; the document of version 8 stays refused as `version` (case name and comment adapted: "counts" instead of "judgings and counts").
- Gone: the whole block of ~75 crafted `judgings` refusals in `CRAFTED` and the six judging edge cases in the "edges" test; the D-440 `decision:` line of the crafted-document test.
- Added: in `CRAFTED`, two cases — `judgings` key empty and `judgings` key filled as the browser stores a judging — each refused whole as `shape`. Added the line `// decision: D-441 "The saved game state holds no judging, and nothing of a remembered judging enters the game state, which is whole without it."` to that test (a quotation from the beginning of a sentence of D-441 as it stands).
- `tests/sim/saved-game-judgings.test.mjs` was already deleted by Slice 9; no reference to it remains in the repository (grep, outside `.runs`, `node_modules`, `dist`).

## Checks (command, exit code)

- Before: `npm test -- tests/sim/saved-game.test.mjs` -> exit 1 (21 failing, as Slice 9 reported; output kept in `reports/slice-c1-10-before.txt`).
- After: `npm test -- tests/sim/saved-game.test.mjs` -> exit 0, 45 of 45 pass (`reports/slice-c1-10-after.txt`).
- Seen failing once: with a scratch copy of the load (`src/browser/sim/saved-game.ts`, `game()` filtering the `judgings` key out of its input before `fields`, so the load accepts and ignores it) `npm test -- tests/sim/saved-game.test.mjs` -> exit 1, 44 pass, 1 fail: "an empty judgings key added to the game". Scratch reverted with `git checkout src/browser/sim/saved-game.ts` (status clean afterwards, only the test file changed); the real load passes again, exit 0.
- `npm test -- tests/sim/judging-record.test.mjs` (Slice 9's direct refusal case) -> exit 0, 10 of 10.
- `npx prettier --write tests/sim/saved-game.test.mjs` -> exit 0 (unchanged); `npx eslint tests/sim/saved-game.test.mjs` -> exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` -> exit 0, 0 errors; `python -B .the-way/elements/common/foundation_check.py` (with test citations) -> exit 0, 0 errors; no line names `saved-game.test`.
- Not run: the full gate (not mine, per the handoff). A call of `npm test` with two file arguments is refused by `scripts/test.py` ("Expected exactly one test file"), so the two files ran separately.

## Own-work check

- Requirement: spec Decision 10 — a document holding a `judgings` key is refused as shape, and the document of version 9 without it loads whole; the weakest point is that the refusal cases pass for a reason other than the key (e.g. the load refusing for the wrong shape) or that nothing would fail if the load took the key in.
- Check: the scratch load above that ignores the key — the new refusal case failed there; with the real load the same cases pass and the document without `judgings` round-trips (`loadSavedGame(DOCUMENT)` deep-equals `DOCUMENT.game`, and `savedGame(state)` deep-equals `DOCUMENT`).

## Choices

- The orchestrator note said not to duplicate the direct refusal case in `judging-record.test.mjs`; the frozen task (Decision 10) names that case under `saved-game.test.mjs` too. I added two entries to the existing `CRAFTED` table (cost: two short lines, one more reason the table's loop covers) rather than a new test; the cases there are not a copy of Slice 9's test, which also goes through the game's own save. Rejected: none added (task would be unmet in its named file). If the orchestrator wants none, delete the two entries; the cost is none.
- The kept D-440 quotation lines elsewhere: none remained in the file besides the one I removed (the references that stay are comments naming D-441, D-442, D-440 by number only where noted above; the foundation check passes).

## Behaviour a user sees

None: the change is in a test file only.

## Reach beyond the handoff

None. I read `slice.md` (named by `make-change`), `.the-way/task-cycle/change/SKILL.md`, the rules `scripts.md` and `git.md` (the session's hook gave them), D-440 and D-441 whole from `foundations/decisions.md`, and the portions of `guidelines/coding-saved-game.md` and `src/browser/sim/saved-game.ts` named under Unread.

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`: not read in this session (the change deletes cases and adds two entries to an existing table of the file; no new test style). Treat as unread.
- `guidelines/coding-saved-game.md`: read lines 1-60 and a grep for the version comment rule; not whole.
- `foundations/invariants.md:1048-1056` (save-version) and `foundations/decisions.md:671-715` (D-213): not read as ranges; D-213's quotations in the file were left as they were and the foundation check passes.
- `src/browser/sim/types.ts:480-546`: not read.
- `src/browser/sim/saved-game.ts`: read only the `GAME_KEYS` and the `game()` function around the scratch edit.
- `tests/sim/saved-game.test.mjs`: read in the ranges 1-400, 700-960, 960-1440, 2440-2770 and 2990-3350 (the places that held judgings, by grep); not the other ranges whole.

## Searches not found or unclear

- None.

## Working copies

- `.runs/executor-c1-10/` (the before/after/scratch outputs) stood in the worktree and was removed; the before and after outputs were kept as `reports/slice-c1-10-before.txt` and `reports/slice-c1-10-after.txt`. No remainder.
