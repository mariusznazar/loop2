PASS 582e9befc37413cd92974e8d66bcfe25ed1348b1

# Review of the fix — whole-change review `FAIL ae0d7e2`, task `zapis-stanu-na-serwerze`

- Fix range: `ae0d7e2..582e9be`, one commit `582e9be`, `tests/view/account-screen.test.mjs` only
  (+236 −0). No product code changed. `git rev-parse HEAD` in the worktree is
  `582e9befc37413cd92974e8d66bcfe25ed1348b1`, the head given.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. I read the findings file
  (`reports/27-whole-fix-findings.md`), the fix report (`reports/27-whole-fix-report.md`) and the
  fix diff whole.
- Counts: blocking 0 · Minor 1 · out of scope 0.

## Findings of the findings file

**I-1. Twelve of the player's acts can lose their moment of saving with every test green — fixed.**

What changed: the commit adds one table-driven case, „each act of the player that changes the game
state is saved at once, and one that changes nothing sends nothing”
(`tests/view/account-screen.test.mjs:1258-1477`). The case does 16 acts, each on its own page. It
builds the page from a save at revision 4 and makes the act through the page's own controls: a
click, a typed field or a pick on a list. It then asserts exactly one waiting `saveGame` call, based
on revision 4. For acts that stand for one simulation call, it checks that the call carries that
call's result. For the editor edits and sending, it checks a trait of the saved state. A second part
of the case checks that the pause without a map run, which leaves the state unchanged, sends
nothing.

The 16 acts are the twelve I named plus „Zapisz jako nowy program”, „Porzuć zmiany”, „Wznów” and a
pace. That covers D-184's list and decision 6's list.

Evidence that the defect no longer exists: I repeated my own mutations on the new head, in a scratch
worktree of `582e9be`. I built it, ran `tests/view/account-screen.test.mjs`, and restored the file
after each mutation:

- Each of the 15 `act(...)` → `store.apply(...)` mutations in `src/browser/view/game-view.ts` gives
  exit 1, at lines `:111`, `:115`, `:119`, `:123`, `:127`, `:131`, `:135`, `:139`, `:143`, `:181`,
  `:185`, `:197`, `:202`, `:206` and `:210`.
- Removing the moment after `clock.send` (`:191`) gives exit 1.
- Dropping the comparison in `act()` (`:102`, a save on every act) gives exit 1.
- In the logs I opened (`:115`, `:181`, `:210`, the send, the comparison), the case that fails is
  the new one.

Before the fix, 12 of these mutants survived. The fix report's own 17 breaks agree with mine.

The author contests one point. I had asked for a running map run in the copy-edit case, and the
author says a paused one is enough, because the handler needs `state.run`, not a running clock.
`game-view.ts:111` (`if (state.run) act(setProgram(...))`) confirms this. I withdraw that part of
the suggestion; it was never part of the defect.

## What the fix itself could break

I found no new Critical or Important finding:

- The case overrides `globalThis.performance` and restores the original property descriptor in a
  `finally` block (`:1440-1468`), so later cases read real time again. The whole file passes:
  35 tests, 0 failures.
- Each assertion fails loudly when the control it uses is missing. `buttonNamed` and
  `inputLabelled` assert. A missing list or pause button makes `.fire` throw. So no part of the case
  can pass without asserting anything.
- Expected states come from the simulation's own functions on the start state (`plain(expected(begun))`).
  That is the view's wiring checked against the simulation, not the code computing its own expected
  value; what is tested is the view's wiring.

### Minor

- **mf-1. The unchanged-act part finds the pause button by its empty label**
  (`tests/view/account-screen.test.mjs:1470-1473`). It looks for the first button with no text
  inside `.status-row`. If the status row later labels that button without a map run, the selector
  finds nothing, and the case fails with a `TypeError`, not with a false pass. The fix report names
  this itself.

## Checks

All run in a scratch worktree of `582e9be`, with `node_modules` and `.runs\quality-venv` linked by
junction; the worktree was removed afterwards. The reviewed worktree, its index and its branch were
not changed.

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `node scripts/test-node-file.mjs tests/view/account-screen.test.mjs` | 0 (35 pass) |
| `node scripts/test-node-file.mjs tests/view/game-saver.test.mjs` | 0 (16 pass) |
| `node scripts/test-node-file.mjs tests/view/program-panel.test.mjs` | 0 (22 pass) |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py` | 0 |
| 17 mutants of `game-view.ts`, each running `tests/view/account-screen.test.mjs` (listed above) | 1 each |
| control mutant: the `if (state.run)` guard at `:111` removed | 0 (survives, as expected: the copy editor shows only during a map run, so the guard is not reachable from the page; outside the finding) |

Not run: the whole gate (`npm test` with no argument), which belongs to the orchestrator; and
`foundation_check.py`, because the fix changes no foundation, guideline or file assignment.

## Reaches beyond the dispatch

- `src/browser/view/game-view.ts:99-210`: the line numbers of the handlers, needed for the mutants.

## Searches not found or unclear

- The fix report says some acts give a new state object for a save that changes nothing:
  `renameProgram` to the same name, `pickProgram` of the program already picked, `setPace` of the
  pace in force. The view saves those once more. This is pre-existing behaviour outside the fix
  diff. I give no grade to it here: it costs one request and loses nothing.
- The fix report says its mutation script lies in this session's scratchpad
  (`…\scratchpad\mutate_acts.py`). I did not run it; I ran my own mutants instead.
