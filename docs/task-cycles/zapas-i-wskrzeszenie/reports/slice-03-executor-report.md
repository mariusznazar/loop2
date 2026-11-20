**Status:** done with concerns

# Slice 3 report: a manual run of a solved map takes from the chest and brings out to it

## Commits

- `74652031` feat: :sparkles: take a manual run of a solved map from the chest and bring its loot out to it, still paying no practice (D-189). Base was `814cb8b1`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/game.ts` | 15 | 21 |
| `src/browser/sim/trip.ts` | 11 | 10 |
| `src/browser/sim/types.ts` | 8 | 4 |
| `tests/sim/trip.test.mjs` | 62 | 36 |
| `tests/sim/run-record.test.mjs` | 5 | 4 |

## What changed

- `startRun` in `game.ts` takes every start's equipment with `takeTrip` from the chest. The branch that took from nowhere is gone, and the import of `takeFromNowhere` with it. The mark `solvedMapRun` still comes from the map's state at the start, and still stops practice.
- `tripLoot` in `trip.ts` no longer returns an empty list for a marked run. The same clipped list drives the preview and the deposit for every run. The `Pick` type keeps `solvedMapRun`, because `loop.ts` passes it in a literal (see concerns).
- `advanceMinutes` needed no code change: it already deposits through `tripLoot` and pays practice only when the run is unmarked. Its comment now says so.
- `settleCompletion`, death, `end` and `restart` are unchanged. A death, „Zakończ” and „Restart” already drop the carried items without depositing them.
- Comments only, to say what holds now: `solvedMapRun` and `deposited` in `types.ts`, `startRun` and `advanceMinutes` in `game.ts`, and `sendTake`, `takeFromNowhere` and `tripLoot` in `trip.ts`.
- `tests/sim/trip.test.mjs`: the cases that expected the old rule were rewritten, each with its reason. They cover the entry of a solved-map run, its deposit at completion, the restart after the solving completion, the preview of a marked run, and the switch of programs on a solved map. Every `decision:` quote that Slice 1 rewrote now quotes the sentence as it stands (D-189, D-214). Quotes of unchanged sentences were left as they were.
- `tests/sim/run-record.test.mjs`: the solved-map case now takes from the chest; its `decision:` quote is updated.

## Checks

Base run first, on `814cb8b1` with the rewritten expectations and the old code:
- `npm test -- tests/sim/trip.test.mjs`: exit 1, 6 failing of 29 (the entry, deposit, restart-chest, switch, preview, and completion cases).
- `npm test -- tests/sim/run-record.test.mjs`: exit 1, 1 failing of 15.

After the change:
- `npm test -- tests/sim/trip.test.mjs`: exit 0, 29 of 29.
- `npm test -- tests/sim/run-record.test.mjs`: exit 0, 15 of 15.
- `npx prettier --check` on the five changed files: exit 0.
- `npx eslint` on the five changed files: exit 0.

Other focused files, after the change (each `npm test -- <file>`):
- pass: `tests/sim/completion`, `tests/balance/agreement`, `tests/view/end-window-game`, `tests/sim/catch-up`, `tests/sim/death`, `tests/sim/discovery`, `tests/sim/encounters`, `tests/sim/first-map-balance`, `tests/sim/loop`, `tests/sim/rule-signs`, `tests/sim/skills`, `tests/view/account-screen`, `tests/view/away-report`, `tests/view/clock`, `tests/view/maps-screen`, `tests/view/program-editor`, `tests/view/run-screen`, `tests/view/screen-address`, `tests/view/state-store`, `tests/view/uncaught-failure`.
- failing, one case each (exit 1):
  1. `tests/sim/saved-game.test.mjs`, case "a game state the simulation made loads back from its saved document", assertion at line 3128: `assert.deepEqual(doneMarked.run.deposited, [])`. The marked completion now deposits berry 2, so the case expects the old rule. See concern 1.
  2. `tests/view/trip.test.mjs`, case "the six screens of a map run give the world area the solved-map line and the preview, and no deposit and no settlement", at line 406: expects `preview: 'Wyniesie: nic'`, gets `'Wyniesie: patyk 3'`. Owner per the plan: Slice 17 (its Change lists `tests/view/trip.test.mjs`). See concern 2.
  3. `tests/view/world-area.test.mjs`, case "the world area stands from the top: the scene, Teraz, Potem, …", at line 239: expects "Wyniesie: nic", gets "Wyniesie: patyk 3". Owner per the plan: Slice 17 (its Change lists `tests/view/world-area.test.mjs`).
- Not run: the full gate (`npm test` with no file), per the boundary of this slice. Also not run: `tests/sim/rules.test.mjs`, which the plan's mutation notes describe as reading the text of sources; it could catch the comment edits. Unchecked, not a pass.

## Own-work check

- Requirement: a manual run of a solved map takes from the chest, deposits its bring list at completion and pays no practice; its restart after the solving completion takes from the chest; death, „Zakończ” and „Restart” lose what the character carried.
- Check: the rewritten cases above, and the existing death case on a solved-map run (`a death on a manual run of a solved map takes what the character carried and pays nothing`), which passes on both the base and the change.
- Result: the six base failures cover the requirement, and they pass after the change.

## Walk of the running product

Not performed, with reasons. The change alters what a player sees: the preview line of a solved map, and the chest's counts after a solved-map run. Two things stop a walk here. First, a solved-map run needs a completed run of the first map in the browser before any check, which this slice does not script. Second, the screens that draw the affected lines are changed by Slices 15 and 17 (see concern 2), so a walk now would check screens that are about to change. The sim behaviour is covered by the focused tests above. I recommend a walk at the end of Slice 17.

## Working copies

- `.runs/slice-03-executor/` (under the ignored `.runs/` of this worktree) holds the test logs of the checks above. It is removed at the end of this run with `rm -rf` by its full path. It is not a git worktree, so no `git worktree remove` was needed.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md`: only its first five lines, by design of the handoff. The slice text was copied into the handoff.
- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md`: lines 25-50 only, plus the passages the handoff copied.
- `foundations/decisions.md` D-190 and D-428: not read; not in this slice's Read list.
- Everything else named in the handoff's Read list was read whole or in the ranges named: the three guideline files, the method files `slice.md`, `walkthrough.md` and `ui_check.md`, D-179, D-183, D-185, D-186, D-187, D-189, D-194, D-214, the invariants `trip-transfer`, `trip-run-end` and `solved-map-manual-run`, the glossary terms, and the part map entry for simulation.

## Searches not found or unclear

- The handoff says the view still calls `takeFromNowhere`. Not found: `grep` over `src` and `tests` finds no view caller. Only `game.ts` (before this change), `trip.ts` and `tests/sim/trip.test.mjs` use it. Its comment now says that no view calls it.
- `tests/sim/rules.test.mjs`, a text check of sources: not searched and not run, so whether it covers the changed comments is unclear.
- The walk's solved-map state in the browser: no route found in this slice's scope without a scripted first completion.

## Questions and concerns

1. **Case at `tests/sim/saved-game.test.mjs:3128` expects the old rule.** The plan lists this file under Slice 2 (its Change, already committed) and names it in Slice 3's checks, but it is not in Slice 3's Change list. My recommended placement: a one-line change at 3128 to expect the bring list, `[berry 2]` for that state, with the reason D-189. Please place it, either with Slice 3 amended or with the slice that owns the file. I did not edit it, because it is outside my list.
2. **Two view cases expect "Wyniesie: nic" for a solved-map run** (`tests/view/trip.test.mjs:406`, `tests/view/world-area.test.mjs:239`). The plan puts both files in Slice 17 (lines 603-604); Slice 15 also edits `tests/view/trip.test.mjs`. My recommended placement is Slice 17, since its line is the one that will be rewritten. Please confirm.
3. **`tripLoot` keeps `solvedMapRun` in its `Pick` type.** `loop.ts` (outside this slice) passes it in an object literal. Dropping it needs a one-line change in `loop.ts`, and that is a later cleanup, not this slice. The field is now unread inside `tripLoot`.
4. **`takeFromNowhere` has no caller outside the tests.** The plan's Goal says the view still calls it, and that is wrong. It is safe to keep until the slice that removes it (Slice 16).
5. **The walk is not performed** (see above). I recommend the walk at Slice 17.
6. The full gate and `tests/sim/rules.test.mjs` were not run, as the boundary says and as noted under Checks.

Commit and report paths:
- commit `74652031`
- report `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-03-executor-report.md`
