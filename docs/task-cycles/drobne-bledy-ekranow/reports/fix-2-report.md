# Fix 2 report — cycle `drobne-bledy-ekranow`

**Status:** done

## Commits

- `faf603a0170750ded0474ee46d983901151956e3` — fix: ask the view to open the rule of „Dodaj regułę z tym” after the edit lands, so a draw that the act's reading of the clock makes before it does not close the panel. One file: `src/browser/view/program-panel.tsx` (+4 −2 lines).

## The commit that introduced the failure

`85e379de` (slice 8, „keep the rule panel open on its field when its rule moves to another group"). Found by bisecting with focused runs of `tests/view/end-window-game.test.mjs` in a worktree of each commit (logs: `reports/fix-2-bisect-30a63b81.log`, `reports/fix-2-bisect-85e379de.log`):

- `30a63b81` (the parent of `85e379de`): `npm.cmd test -- tests/view/end-window-game.test.mjs` exit 0, 27 pass.
- `85e379de`: exit 1, the same failure as the gate's (`its panel stands open: expected 1, got 0`, `:1044`).

## The cause (verified)

Slice 8 made `ProgramPanelView` close the open rule for good when it does not find its rule in the program (`followed === null` → `setOpen(null)`); before it, the open state stayed and only the panel was not drawn (`panelStands`). In `createProgramPanel().addDiscoveredRule()` the order was: `opening = found.open`, then `controls.editCopy(found.program)`, then `draw()`. `editCopy` goes through `store.act`, which makes a reading of the clock first; in the end-of-run window case that reading takes a result and so calls `panel.update` → `draw()` while `opening` is already set but the new rule is not yet in the state. The view took the request (`openingSeen`), found no rule, closed the open state; the request is taken once, so the later draw with the rule did not reopen it. Verified by instrumenting a throwaway copy at `85e379de` (render log: first render with `opening` set and program `[1]`, `followed` null; stack of `draw()`: `clock.js` → `state-store.js` → `game-view.js` → `run-entry.js` → `run-screen.js` → `program-panel.js`). The band's „Dodaj regułę z tym” does not meet it because its act has no result of the clock before the edit.

## How it was fixed

`addDiscoveredRule` sets `opening` after `controls.editCopy(...)` and before the final `draw()`, with a comment saying why. The three kept requirements stay: the panel follows its rule across groups (slice 8, point 15; `holdingTarget` untouched), „✕” under a folded group gives the focus to the header (point 6), every new copy has every group unfolded (point 7). No test changed: the existing test `tests/view/end-window-game.test.mjs:1022` is the failing-first proof (failed at `85e379de` and at the gate head, passes after the fix); it covers the cause, so no new test was written. Break check: with the old order restored the test fails (the bisect run at `85e379de` is that run).

## Checks (command → exit code)

- `npm.cmd test -- tests/view/end-window-game.test.mjs` → 0 (27 pass, 0 fail). Before the fix: 1 (26 pass, 1 fail).
- `npm.cmd test -- tests/view/<file>` for each of the 60 files `tests/view/*.test.mjs`, one by one → all 60 exit 0 (list in `reports/fix-2-view-runs.txt`), among them `program-panel`, `rule-editor`, `program-editor`, `run-screen`, `run-screen-state`, `end-window-game`.
- `npx eslint src/browser/view/program-panel.tsx` → 0.
- `npx prettier --check src/browser/view/program-panel.tsx` → 0.
- `python -B .the-way/elements/common/foundation_check.py` → 0 (0 errors).
- Not run: `npm test` with no file (the full gate is the orchestrator's); the tests of `tests/` and `tests/sim/` (the changed file is in `src/browser/view/`; their runs are the gate's).

## Own-work check

- Requirement most likely not met: the fix keeps „Dodaj regułę z tym” opening its panel on the right field in the other flow (the band's button) and in the two-draw order the fix introduces (a draw by the update with `opening` null, then the final draw with it set).
- Check: the focused tests of the band's button and of the panel (`tests/view/program-panel.test.mjs`, `tests/view/run-screen.test.mjs`, which hold D-313's cases) and the end-window test above.
- Result: all exit 0 (see above).

## Questions and concerns

- None blocking. A guess, not verified: the same pattern (a request taken once, a draw between the request and the edit closing it) could appear for any later caller that sets `opening` before an act; `addDiscoveredRule` is the only one now. A sturdier change would be to close the open state only when a rule that was once present is gone, but that is a larger change of slice 8 and I did not make it.

## Reaches beyond the handoff

- None beyond reading `program-panel.tsx`, `run-entry.ts`, `run-screen.tsx`, `program-panel-acts.ts`, `state-store.ts` (top part) and `game-view.ts` (the `onTaken` part) to find the cause; D-313 read for the decision of the button (the other named decisions D-306, D-350, D-294 were not read whole, see below).

## Working copies

- `.runs/worktrees/drobne-bledy-ekranow/.runs/fix-2/wt` (a git worktree of `30a63b81`, then of `85e379de`, with an instrumented `program-panel.tsx` and a junction `node_modules` to the task worktree's): removed with `git worktree remove --force`, `git worktree prune`, and the junction deleted on its own (the target `node_modules` intact, 270 entries). The directory `.runs/fix-2/` with the bisect logs, the instrumented log and the per-file run logs was removed; what the report needs is kept in `reports/` as `fix-2-bisect-30a63b81.log`, `fix-2-bisect-85e379de.log`, `fix-2-view-runs.txt`. No remainder.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md`, `plan.md`, `reports/slice-8-report.md`, `slice-9-report.md`, `fix-1-report.md`: not read (the findings file and the bisect located the cause without them).
- D-306, D-350, D-294: not read whole (D-313, the decision that gives the end window's button, read whole; the failing test's quoted decisions D-122/D-313 stand in the test).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`: not read whole by me in this session; the change is a reorder of two statements with a comment and no new code or test.
- `program-panel.tsx` read in the parts around the open state and `createProgramPanel`, and the whole diff of `85e379de..` for the files of slice 8; not the whole file line by line.

## Searches not found or unclear

- none (the decision that gives the end window's button was found by searching `foundations/decisions.md` for „Dodaj regułę z tym”: D-313).
