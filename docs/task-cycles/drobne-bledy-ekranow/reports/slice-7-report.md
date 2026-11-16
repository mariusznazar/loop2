# Slice 7 report — the credits without impossible checks, and the loaded paused run truly loaded

**Status:** done with concerns (the failing-first step needed a temporary break in the simulation, named below; no question blocks the slice)

## Commits

- `412b002c` refactor: :recycle: drop the checks of an action's icon and icon title from the credits, which the data does not allow to be missing
- `39ca66af` test: :white_check_mark: load the saved game state in the test of a loaded map run that comes back paused, in place of a copy of the pause test

Range: base `23aa5440` to head `39ca66af` (two commits). Branch `task/drobne-bledy-ekranow`, worktree `.`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/credit-lines.ts` | 0 | 3 |
| `tests/view/scene-picture.test.mjs` | 14 | 6 |

What changed:

- `credit-lines.ts`: in `actionIcons()` the two lines `if (action.icon === undefined) continue;` and `if (action.iconTitle === undefined) throw …` are gone. `ActionDef` declares `icon` and `iconTitle` as required strings, and `ACTIONS` is `as const satisfies Record<string, ActionDef>`, so the checks could never fire. Nothing else in the module changed; the `ICON_CREDITS` lookup check stays, since it is not a check on action data.
- `scene-picture.test.mjs`: the test "a loaded map run comes back paused, so it stands as at a pause" keeps its name. It no longer builds a copy of the pause state. It now: asserts a precondition (`sent()` is not paused); saves the state through `savedGame(withSaveTime(running, 1760000000000))`; loads it with `loadSavedGame`; asserts the load is `ok`; and asserts `sceneDrawing(loaded.state).standing === "paused"`. Two decision comments cite D-212 and D-322. Imports added: `withSaveTime` from `game.js`, `loadSavedGame` and `savedGame` from `saved-game.js`. One line wrapped to satisfy Prettier.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `npm test -- tests/view/scene-picture.test.mjs` (final, after the commits' content) | 0 | every test "✔", none "✖" |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | Ran 3 tests, OK |
| `npm test -- tests/view/icons.test.mjs` | 0 | exit 0, no failure line |
| `npm run build` before the edit (baseline for the credit dump) | 0 | build only |
| `npm run build` after the edit | 0 | build only |
| `node node_modules/prettier/bin/prettier.cjs --check tests/view/scene-picture.test.mjs src/browser/view/credit-lines.ts` | 0 | "All matched files use Prettier code style!" (the first run gave exit 1 on the test file for one wrapped line; fixed before the commit) |
| `node node_modules/eslint/bin/eslint.js tests/view/scene-picture.test.mjs src/browser/view/credit-lines.ts` | 0 | no output |

Failing-first runs, as the Checks of the slice ask:

1. First version of the changed test (saves `savedGame(running)` without `withSaveTime`), on the unchanged simulation: `npm test -- tests/view/scene-picture.test.mjs` exit 1. The failing assertion is `the saved game loads` (`loaded.ok` is `false`). The cause, verified by a trace of `refuse()` in the built copy: `game()` reads `saveTimeMs` with `integer()`, and a state that was never stamped holds `saveTimeMs: null` (`src/browser/sim/game.ts:360`), so the load refuses it as shape. The view's save path stamps the state first (`src/browser/view/state-store.ts:194`, `src/browser/view/game-saver.ts:150`, both `withSaveTime`). The test now stamps the state the same way.
2. Current version of the test, on the unchanged simulation: exit 0. The load already pauses a running map run (`src/browser/sim/saved-game.ts`, the `paused:` field of `game()`), so this version passes on the correct code.
3. To see the test fail for what it names, I broke the load's pause for a moment: the `paused:` field of `game()` in `src/browser/sim/saved-game.ts` was set to the plain `paused`. `npm test -- tests/view/scene-picture.test.mjs` then gave exit 1 with `AssertionError … actual: 'going', expected: 'paused'` on "a loaded map run comes back paused, so it stands as at a pause". I restored the line exactly, and `saved-game.ts` is not in `git status` or in any commit. The output is kept at `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-7-failing-first-run.txt`.

## Own-work check (WAY-164)

- **Requirement most likely not met:** the credit lines must stay the same after the two checks are removed (invariant `icon-credits`): removing a check can change which actions get a credit, or the order of the credits.
- **Check:** a script (in my working copy directory, since removed) wrote `creditLines()` of the built copy to JSON before and after the edit, and `cmp` compared the two files.
- **Result:** 20 lines in both; `cmp` exit 0, identical bytes. `test_icon_credits.py` and `icons.test.mjs` also pass (exit 0 each).
- **Second requirement:** the changed test must really load the saved state and not a copy of the pause. **Check:** the temporary break in item 3 above. **Result:** exit 1 with `going` instead of `paused`, so the test catches a load that does not pause; with the break removed it passes.

## Questions and concerns

1. The handoff expects the changed test to be seen failing "where it loads a document whose run is not paused". With the correct simulation the test passes, because the load itself pauses the run. I therefore saw it fail through the temporary break in `saved-game.ts` (item 3), which I restored. If the orchestrator wants the failing run without any break, the test cannot give one on correct code; the break run is the only failing evidence.
2. Observation for the orchestrator, not changed by this slice: `loadSavedGame` refuses any state whose `saveTimeMs` is `null`, which is every state that was never saved (a new game included). The changed test follows the real save path, so this does not affect it. I did not decide whether the refusal is intended; the simulation's own tests (`tests/sim/saved-game.test.mjs`) may already settle it.
3. The commits carry the author address shown by `git log --format='%h %ae'`: `mariusznn@gmail.com`. I did not check the remote of this repository.

## Unread material

- `.the-way/task-cycle/change/ui_check.md`: not read. This slice does not change what any screen shows, so the rule in the method does not apply.
- `foundations/invariants.md`: read lines 325–349 only (the entry `icon-credits` and its neighbours), as the handoff gives.
- `task.md`: not opened; the passages were taken from the handoff, as it carries them word for word.
- `tests/view/icons.test.mjs`: named in the Checks; run only, not read.
- `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`: read in part (first 30 and first 40 lines), for the fixtures the changed test uses.
- Everything else the handoff names was read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (in two parts), `guidelines/testing.md` (in two parts), `src/browser/AGENTS.md`, `src/browser/view/credit-lines.ts`, `tests/view/scene-picture.test.mjs` (in three parts, before the edit), `src/browser/sim/saved-game.ts`, `src/browser/sim/data/actions.ts`, `foundations/decisions.md` at D-27, D-212 and D-322, `tests/invariants/test_icon_credits.py`.

## Searches not found or unclear

- Looked for where a save time is stamped on the state before saving: found `withSaveTime` (`src/browser/sim/game.ts:692`) and its callers in the view. Nothing found that says whether an unstamped state must refuse to load (concern 2).
- No other search missed.

## Reaches beyond the handoff

- `src/browser/sim/game.ts:685-700` (`withSaveTime`), `src/browser/view/state-store.ts:194`, `src/browser/view/game-saver.ts:150`: to learn the real save path for the test's save.
- `tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`: heads only, for the fixtures.
- The user's global rules `.ai\rules\scripts.md` and `.ai\rules\git.md`, read before the diagnostic script and before the commits.
- A temporary edit of the built copy `dist/browser/sim/saved-game.js` (a trace in `refuse()`) for the diagnosis; the next build overwrote it, so no edit of build output remains.
- The temporary break of `src/browser/sim/saved-game.ts` (item 3 above), restored by hand before any commit.

## Working copies

- Directory `.runs/slice-7/` held: a diagnostic script (`diagnose-load.mjs`), a credit dump script (`dump-credit-lines.mjs`), the two credit dumps (before and after), a copy of the HEAD test file (for the Prettier check), the build and check logs. Every copy was removed (`rm -rf .runs/slice-7`) before this report was written. Nothing remains there.
- Three run logs first written to `.runs/` directly were removed; the failing-first output is kept in `reports/` as stated above.
- No worktree or clone was made; the two commits are the only changes in the branch.
