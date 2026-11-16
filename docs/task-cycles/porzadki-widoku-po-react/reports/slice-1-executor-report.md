# Slice 1 executor report — The state of the screen Przejście readable from React

**Status:** `done`

**Commits (on `task/porzadki-widoku-po-react`, after the slice base `f5b1c0e4`):**
- `d0c42108` refactor: :recycle: let the state of the screen Przejście be read from React

**Files changed:**
- `src/browser/view/run-screen-state.ts`: +109 / −47
- `tests/view/run-screen-state.test.mjs`: +108 / −0

**One-line check result:** all focused checks of the slice exit 0 (state tests 18/18, `end-question`, `end-window-game`, typecheck, eslint, prettier). The product's full gate was not run, as the handoff asks. Nothing failed.

## What was built

- `RunScreenState` gains `subscribe(listener)`, which returns the way to stop, and `snapshot()`, which returns `{ question, windowShown }`. The snapshot is cached in the module and is replaced only when the question or `windowShown()` differs from the cached value, so `useSyncExternalStore` reads a stable value.
- Every public method that can change the question or the window now runs through `settled(...)`. That helper runs the change and then `settle()`, which compares the question and `windowShown()` with the cached snapshot and calls the listeners only on a difference. This covers `taken`, `entered`, `left`, `ask`, `closeQuestion`, `forgetQuestion`, `openWindow`, `closeWindow` and `effectEnded`. The `taken` path, including a result that changes whether the window shows, is covered.
- `built()` and `takeOwedFocus()` change neither the question nor the window, so they do not settle.
- Inside the module, `closeQuestionNow()` closes the question without notifying. `left()` and `openWindow()` use it, so a listener is never called for an intermediate state. The public `closeQuestion` is `settled(closeQuestionNow)`.
- The module header comment states what holds now, including the subscription. Other methods keep their return values and behaviour. The module still calls no screen, store act or registry.

## Tests (written first, seen failing)

Six cases were added to `tests/view/run-screen-state.test.mjs`, with a `listen` helper:
1. a listener is called after each change of the question, by a state method and by a result taken;
2. a listener is called after each change of whether the window is shown, by a method and by a result taken;
3. a result taken that makes the window wait for the scene's effect calls the listener only when the wait ends;
4. the snapshot keeps its identity while nothing changes and is a new value after a change;
5. no listener is called by a method or result that changes neither field;
6. a stopped listener is not called, and another listener on the same screen still is.

Red run: I first added the type and stub methods (`subscribe` returning a no-op stop, `snapshot` returning a fresh constant) so each assertion failed for its own reason, not on a missing function. Cases 1–4 and 6 failed on their assertions. Case 5 passed against the stub, as expected for a no-call case, so it was checked separately below.

## Checks

| # | Command | Run | Exit | Result |
|---|---|---|---|---|
| 1 | `npm test -- tests/view/run-screen-state.test.mjs` | red (stub methods, before implementation) | 1 | 4 cases failed on their assertions (listed above) |
| 2 | `npm test -- tests/view/run-screen-state.test.mjs` | green (after implementation) | 0 | 18 tests, 18 pass, 0 fail |
| 3 | `npm test -- tests/view/end-question.test.mjs` | after implementation | 0 | pass |
| 4 | `npm test -- tests/view/end-window-game.test.mjs` | after implementation | 0 | pass |
| 5 | `npm run typecheck` | after implementation | 0 | pass |
| 6 | `npx --no-install eslint --max-warnings 0` on the two files | after implementation | 0 | pass |
| 7 | `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the two files | after implementation | 0 | pass |

Not run: the full suite (`npm test` without a file), per the handoff. The foundation check and instruction-file check were not run either, since they are not focused checks of this slice.

## Own-work check

- **Requirement:** a listener is called only on a real change of the question or the window, by any method or result, and the snapshot keeps its identity while nothing changes.
- **Check:** I mutated the guard in `settle()` to always notify and to replace the snapshot, then ran the state tests. Command: `npm test -- tests/view/run-screen-state.test.mjs`, exit 1; the four cases that check the no-call rule and the snapshot identity failed. The mutation was then reverted, and I confirmed the file matched the committed version byte for byte (`cmp`). The committed version has no stub left (`grep` for the stub body returned 0).
- **Result:** the no-call and identity invariants are caught by the tests; the mutant was reverted before the commit.

## Choices made

- **Snapshot as an object `{ question, windowShown }` cached in the module.** The alternative was two separate getters, which `useSyncExternalStore` cannot read as one stable value. Cost if wrong: Slice 2 would need a different read, which is local to the screen and panel.
- **Settle after each public method, not inside each branch.** This keeps one place that decides what a listener hears. Cost: `settle()` computes `windowShown()` after every method, which is cheap.
- **A non-notifying `closeQuestionNow()` used inside `left()` and `openWindow()`.** It avoids listeners being called with a half-applied change. Cost: one more function to keep in step with `closeQuestion`.
- **`built()` and `takeOwedFocus()` do not settle.** They change no field of the snapshot. Cost if wrong: none found; the no-call test covers both.
- **Listener timing:** listeners run inside `taken`, which runs inside the store's `take`, after the state has been replaced. This is the same moment the screens are drawn today. Slice 2 should keep the React subscription cheap (a schedule, not a synchronous render), since a listener runs inside the game's result path. This is a note for Slice 2, not a change in this slice.

## Mismatches between plan and code

None. The handoff's references (`program-panel.tsx` 94–130, `game-view.ts` 175–300, the foundation ranges) matched the base. The plan's ranges for the decisions were older, so the handoff's ranges were used, as it says.

## Reaches beyond the handoff

None. I read only the files named in the handoff. `game-view.ts` was read at 170–305 (the handoff gives 175–300; the extra lines were the end of the section it cites). `program-panel.tsx` was read at 85–139 (the handoff gives 94–130).

## Unread material

- none of the named files, entries or passages. All guideline files were read whole (`coding.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`), `src/browser/AGENTS.md` whole, `state-store.ts` whole, the three decision entries (D-407, D-371, D-324) whole, `foundations/part_map.md` 1–30, `task.md` 25–66.

## Searches not found or unclear

- none. The one thing I could not settle from the handoff was whether `end-question.test.mjs` and `end-window-game.test.mjs` cover the snapshot; they cover the existing behaviour and pass, and the new cases are in the state test file, as the plan says.

## Working copies

- One working copy, a copy of `src/browser/view/run-screen-state.ts` made for the mutation check, was first put in the session's scratch directory, not under `.runs/slice-1-executor/`, contrary to the handoff's rule. It was identical to the committed module, was used only for the revert, and was **removed** from the scratch directory before this report. No other copy was made, no worktree was created, and `.runs/slice-1-executor/` was not created.
- Test output logs were written to the session's scratch directory; they are outputs, not working copies, and were not kept.
