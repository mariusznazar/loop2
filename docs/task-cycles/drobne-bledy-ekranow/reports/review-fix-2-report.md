PASS faf603a0170750ded0474ee46d983901151956e3

# Review of fix 2 — cycle `drobne-bledy-ekranow`

- Range: `614f28f2bbc6a648745d146392c57bc80c3f46ce..faf603a0170750ded0474ee46d983901151956e3`, one commit (`faf603a0`), one file `src/browser/view/program-panel.tsx` (+4 −2). `git rev-parse HEAD` in the reviewed worktree = `faf603a0170750ded0474ee46d983901151956e3` (matches the handoff). `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.
- Method: `.the-way/task-cycle/review/SKILL.md` and `.the-way/task-cycle/review/fix.md`, read whole.

## Findings

- Critical: none.
- Important: none.
- Minor: none.
- Out of scope: none.

Blocking: 0. Minor: 0. Out of scope: 0.

## The finding of the findings file

### G1 — „Dodaj regułę z tym” of the end-of-run window no longer leaves the new rule's panel open: **fixed**

Evidence:

- At the head, `npm.cmd test -- tests/view/end-window-game.test.mjs` exits 0, 27 tests, 27 pass (log `reports/review-fix-2-end-window.log`); the test at `tests/view/end-window-game.test.mjs:1022` passes, its assertion at `:1044` („its panel stands open”) holds.
- Break check at the head itself (not only at `85e379de`, which the fix report uses and which lacks slices 9 to fix 1): in a worktree of `faf603a0` I reverse-applied the fix diff, so only the order of `opening = found.open` and `controls.editCopy(...)` went back, and the same command exited 1, 26 pass, 1 fail, `Error: its panel stands open: expected 1, got 0` at the same test (log `reports/review-fix-2-reverted-end-window.log`). The test fails on the defect and passes on the fix, so it guards the fix at the head as it stands.
- The cause the fix names holds against the code: `createProgramPanelActs().editCopy` (`src/browser/view/program-panel-acts.ts:29`) goes through `store.act`, which runs `clock.flush()` before the body (`src/browser/view/state-store.ts:173-176`); a reading that takes a result calls `onTaken`, which updates the panel, and `update` calls `draw()` (`src/browser/view/program-panel.tsx:811-823`). With `opening` set before the act, that draw handed the view a request whose rule was not yet in the copy; `ProgramPanelView` takes a request once (`program-panel.tsx:464-470`) and, since slice 8, a target that `holdingTarget` does not find closes the open state (`program-panel.tsx:476-478`), so the later draw with the rule did not reopen it. With `opening` set after the act (`program-panel.tsx:838-843`), every draw inside the act passes the previous request, which the view has already seen, and the final `draw()` passes the new one with the rule already in the state: the act is synchronous throughout (`store.act` calls the body at once; `take` replaces `state` and calls `onTaken` before it returns).

## What the fix could have broken

I went through each path that sets `opening` or that reaches the open state in `src/browser/view/program-panel.tsx`:

- `opening` has one writer, `addDiscoveredRule` (`program-panel.tsx:842`); the variable is declared at `:741` and read only by `draw()` at `:757`. Both callers of `addDiscoveredRule` — the band's button (`src/browser/view/run-screen.tsx:247`) and the window's `addRule` (`run-screen.tsx:265-268`, close first, then the call) — go through the same new order.
- A row, an arrow, the handle and „✕”: none of them touches `opening`. A click on a row opens through `onOpen` → `setOpen({ key, target })` (`:709`); the arrows and the handle edit through `actions.edit` and the panel follows its rule by `holdingTarget` (`:311-323`, `:476-478`), unchanged by the fix (point 15 of the task, D-306); „✕” closes through `closePanel` (`:539-543`), which sets `focusClosed` to the followed target so the header of a folded group takes the focus (`:421-441`), unchanged (point 6, D-350). The folds of a new copy are reset in `update` (`:816-817`), unchanged (point 7).
- Can the new order open a panel on a rule that does not exist yet? No. The final `draw()` runs after `editCopy` returned, and the edit has landed by then, because the act is synchronous. Where the edit does not land — the store halted (`state-store.ts:119`), or no map run in the state after the flush (`program-panel-acts.ts:32`) — the view takes the request at the final draw, `holdingTarget` finds no rule, and the same render calls `setOpen(null)` with `followed === null`, so no rule panel is drawn (`:554-564`, `:705`). This is the same outcome as before the fix on that path.
- Can it leave a panel open for a rule that was removed? No. Closing on a removed rule is the check at `:476-478`, which runs at every render, before and after the fix; the fix changes only when the request is handed to the view.
- A request from an earlier „Dodaj regułę z tym” passed again at the draws inside the act is the object the view already holds in `openingSeen` (the panel's root is rendered with the same component, so its state persists), so it opens nothing again.
- Focus: D-313's boundary sentence (`program-panel.tsx:161-166`) puts the focus on the field the discovery filled; the rule panel now mounts at the final draw, as it did on the band's path before. The focused files of the panel and the screen (D-313's band cases) pass, see Checks.
- Guidelines: the fix adds no Hook and no Effect and changes no dependency list, so the rules „Hooki” and „Efekty” of `guidelines/coding-browser-module.md` are not reached; `addDiscoveredRule` stays an event handler's call, as the boundary's sentence at `program-panel.tsx:5-6` requires. The comment at `:839-841` says why the order matters and agrees with the code.

### The sturdier alternative the fix left alone — acceptable, not a finding

The fix report names, as a guess, a sturdier change: close the open state only when a rule that was once present is gone. Leaving it is acceptable:

- The defect needs a writer of `opening` that hands the view its request before the rule exists. `addDiscoveredRule` is the only writer, and after the fix it hands the request only once the synchronous act has returned. No path of the code reaches the defect now.
- The alternative is not plainly better: an open state on a rule that never came — an edit refused by a halted store — would stay pending instead of closing, and would open the panel if a rule of that number appeared later, which D-306 does not give. It would also widen slice 8's state of the open rule beyond what the task asks.
- The test at `tests/view/end-window-game.test.mjs:1022` catches the order going back, as the break check above shows, so a later change that sets `opening` before the act again in this method fails the suite. A new writer of `opening` would have to read the comment at `:839-841`, which names the hazard.

## Declined to judge

None.

## Checks

| Command | Exit | Result |
| --- | --- | --- |
| `git rev-parse HEAD` (reviewed worktree) | 0 | `faf603a0170750ded0474ee46d983901151956e3` |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0; 0 | both `bfb2e109735b5fff98802b8be0ff3c43c799262a` |
| `git diff 614f28f2..faf603a0`, `git log 614f28f2..faf603a0` | 0 | one commit, one file, +4 −2 |
| `npm.cmd test -- tests/view/end-window-game.test.mjs` | 0 | 27 tests, 27 pass |
| `npm.cmd test -- tests/view/program-panel.test.mjs` | 0 | 60 tests, 60 pass |
| `npm.cmd test -- tests/view/rule-editor.test.mjs` | 0 | 76 tests, 76 pass |
| `npm.cmd test -- tests/view/program-editor.test.mjs` | 0 | 54 tests, 54 pass |
| `npm.cmd test -- tests/view/run-screen.test.mjs` | 0 | 21 tests, 21 pass |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Break check: in a worktree of `faf603a0`, `git diff 614f28f2 faf603a0 -- src/browser/view/program-panel.tsx \| git apply -R`, then `npm.cmd test -- tests/view/end-window-game.test.mjs` | 1 | 27 tests, 26 pass, 1 fail: the test at `:1022`, `its panel stands open: expected 1, got 0` |

Exit codes kept in `reports/review-fix-2-exits.txt`; the logs of the head run and of the break check in `reports/review-fix-2-end-window.log` and `reports/review-fix-2-reverted-end-window.log`.

Not run: the full suite (`npm test` without a file) — the cycle's own gate run, which the handoff forbids here; ESLint and Prettier on the changed file — the fix report gives both as exit 0 and I did not repeat them; the local game — the handoff forbids it.

## Reaches beyond the handoff

- `src/browser/view/program-panel-acts.ts` (whole) and `src/browser/view/state-store.ts:100-209` — to check that `editCopy` is synchronous and that the clock's reading draws before the body, which the safety of the new order rests on.
- `src/browser/view/run-screen.tsx:225-269` — the two callers of `addDiscoveredRule`, the band's button and the window's.
- `src/browser/view/program-panel.tsx:1-180` — the boundary's comments on `addDiscoveredRule` and on the event-handler rule.
- `tests/view/end-window-game.test.mjs:1015-1047` — the failing test, to see what it asserts.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: points 6, 7 and 15, found by a search for their numbers (lines 30, 31, 39).

## Working copies

- `.runs/review-fix-2/` held the logs of the focused runs.
- `.runs/review-fix-2/wt` was a git worktree of `faf603a0`, detached, with the fix reverse-applied and a junction `node_modules` to the task worktree's. The junction was removed first with `rmdir`; the target `node_modules` is intact, 270 entries counted with `ls -A`. Then `git worktree remove --force` and `git worktree prune` removed the worktree; `git worktree list` no longer shows it.
- The directory `.runs/review-fix-2/` was removed after the logs this report needs were copied into `reports/`: `review-fix-2-exits.txt`, `review-fix-2-end-window.log`, `review-fix-2-reverted-end-window.log`.
- No remainder. The reviewed worktree stays clean at `faf603a0`: `git status --short` empty.

## Unread material

- `src/browser/view/program-panel.tsx`: read lines 1-180 and 290-864, the whole of the open-rule state and `createProgramPanel`. Lines 181-289 not read; they hold the list helpers above `shownValue`, and the diff does not reach them.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: only points 6, 7 and 15, the ones the handoff names, not the whole file.
- `src/browser/view/state-store.ts`: lines 100-209, not the whole file.
- The fix report's bisect logs: `reports/fix-2-bisect-85e379de.log` read in its first 30 lines; `reports/fix-2-bisect-30a63b81.log` and `reports/fix-2-view-runs.txt` not read. I ran my own break check at the head in their place.
- D-306, D-350, D-313 and `guidelines/coding-browser-module.md`: read whole.

## Searches not found or unclear

none
