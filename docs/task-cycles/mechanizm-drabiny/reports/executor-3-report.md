done
# Executor report — slice 3 (the tests of the map list and the end window follow the eight maps)

Worktree: `the task's worktree`, branch `task/mechanizm-drabiny`.
Slice base: `ee702cda`. Commit of this slice: `3d272ec9`.

## Commits

- `3d272ec9` test: the map list and the way-on buttons of the end-of-run window expect the eight maps of the data.
  Files: `tests/view/map-lines.test.mjs` (+45 −1), `tests/view/end-window-lines.test.mjs` (+9 −1), `tests/view/end-window.test.mjs` (+1). 55 insertions, 2 deletions in total.

No view code, no data and no foundation entry changed.

## Base results (the three tests on `ee702cda`, before my change)

- `tests/view/map-lines.test.mjs`, "the list of maps hides maps until their prerequisites are solved; the editor keeps its full map list": FAIL. The full list had `forestDeep2`, `forestDeep3`, `forestDeep4` after `forestPack`, which the expectation lacked.
- `tests/view/end-window-lines.test.mjs`, "the way-on buttons after a completion of Las name the map it opens…": FAIL. After a completion of `forestDeep` the result had two buttons, the second `Otwarte: Las — głębiej II →`, which the expectation lacked.
- `tests/view/end-window.test.mjs`, "the buttons stand after the scrolling part, outside it…": FAIL. After `forestDeep` the labels had a fourth entry, `Otwarte: Las — głębiej II →`.

## Changed expectations and their cause

The cause of each is the data (D-464, D-466: the rungs `forestDeep2`, `forestDeep3`, `forestDeep4` stand in `src/browser/sim/data/maps.ts` after `forestPack`, `forestDeep2` opened by `forestDeep`, each next rung by the one before it).

1. `map-lines.test.mjs`, `sendMaps()` (no argument): added `forestDeep2`, `forestDeep3`, `forestDeep4` between `forestPack` and `forestLair`. Cause: the three rungs in the data.
2. `map-lines.test.mjs`, `sendMaps(["forestEdge","forest","forestDeep"])`: added `forestDeep2` after `forestPack`. Cause: `forestDeep2` opened by `forestDeep`.
3. `map-lines.test.mjs`, `sendMaps([..., "forestPack"])`: added `forestDeep2` between `forestPack` and `forestLair`. Cause: the same rung, opened by `forestDeep`, in the data's order.
4. `end-window-lines.test.mjs`, completion of `forestDeep` at minute 540: the expectation now has `Otwarte: Las — wataha →` (`forestPack`) and under it `Otwarte: Las — głębiej II →` (`forestDeep2`). Cause: the same rung.
5. `end-window.test.mjs`, the case after `show(deep)` (`forestDeep` completed): added `Otwarte: Las — głębiej II →` under `Otwarte: Las — wataha →`. Cause: the same rung. This is the test Slice 1 left failing.

Cases not changed: `goalSentence` over the five maps (picks by identifier, expects their sentences), `solvingSentence`, the heading and the other map-lines cases, `sendMaps([])` and `sendMaps(["forestEdge"])`, `sendMaps(["forestEdge","forest"])`, the completion of `forestLair` (none), the other cases of `end-window-lines` and `end-window`, the last case `forestLair` (no button).

## Added assertions (new cases, not changed expectations)

- `map-lines.test.mjs`: `sendMaps(["forestEdge","forest","forestDeep","forestDeep2"])` gives `forestDeep3` next, and `sendMaps([... ,"forestDeep2","forestDeep3"])` gives `forestDeep4` next. These are the Goal's "each next rung once the one before it is" (D-466).
- `end-window-lines.test.mjs`: a completion of `forestDeep2` at minute 600 gives `Otwarte: Las — głębiej III →` (`forestDeep3`), as the Goal asks.
- Added decision lines to `map-lines.test.mjs`: `D-149` and `D-466` (the order and the availability of maps); inline comments name D-466 at the new expectations.

## Checks (focused, run in the worktree)

- `npm test -- tests/view/map-lines.test.mjs` → exit 0 (13 pass, 0 fail). Run before and after the prettier fix below; the second run is `.runs/executor-3/c1b.log`.
- `npm test -- tests/view/end-window-lines.test.mjs` → exit 0 (12 pass, 0 fail). Log: `.runs/executor-3/c2.log`.
- `npm test -- tests/view/end-window.test.mjs` → exit 0 (14 pass, 0 fail). Log: `.runs/executor-3/c3.log`.
- `npx prettier --check` on the three files → exit 1 on the first run, for `map-lines.test.mjs` only (my new lines were not in Prettier's layout). I ran `npx prettier --write tests/view/map-lines.test.mjs` (exit 0); the diff is layout only. Re-check → exit 0 ("All matched files use Prettier code style!").
- Not run: `npm test` without a file (the gate, left to the orchestrator or CI), `foundation_check.py`, `check_instructions.py`.

## Own-work check

Requirement (Goal, D-466): the data's order and the chain of rungs. Check: the exact-array assertions of `sendMaps` at the solving states, `forestDeep` solved (no `forestDeep3`) and `forestDeep2` solved (no `forestDeep4`). A break of the data that opened `forestDeep3` from `forestDeep` would add `forestDeep3` to the exact list for `["forestEdge","forest","forestDeep"]`, which the test catches. A break that put a rung out of order would fail the exact arrays. Not run as a separate break in the data (the data is not my file); reasoned from the assertions.

## Mismatches with the plan

None. The plan's Read named `tests/view/end-window.test.mjs:540-620`; the change is at 570-623 and in the range of the plan's reach.

## Reaches beyond the handoff

None. I changed only the three files in *Change*.

## Foundation entries made untrue by my code

None: no code changed. The foundation entries D-464, D-465, D-466 and D-53 match the new expectations (the completion of Las — głębiej names Las — wataha and then Las — głębiej II; the rung's name is composed).

## Working copies

- `.runs/executor-3/` holds only logs: `c1.log`, `c1b.log`, `c2.log`, `c3.log` (the outputs of the focused checks). They are outputs, not copies; they stay for the record.
- The two file copies I made to compare with the base (`base-map-lines.mjs` and `mine.mjs`) were removed.
- No worktree or clone made. Nothing else to remove.

## Unread material

- `guidelines/testing.md`: read lines 1–349 (the rules of levels, expected values, changing an existing test, behaviour not implementation, trust boundaries, AI in tests, mutation testing, flaky tests, document imitation, the start of the test files in the gate). Not read: lines 350–510 (the rest of the "Test files in the gate" section and the later rules). Reason: the rules I needed are in 1–349; I did not read the rest to keep the context within reach.
- `guidelines/styleguide-browser-view.md`: read lines 1–539 of 1980. Not read: lines 540–1980 (the kitchen-sink page and the rules of the rest of the styleguide). Reason: the slice changes tests of the view, not the view's files; a grep for `tests/view` and `test` in the styleguide gave the rules that name test files (lines 133–233, 586–610, 714, 1200, 1209, 1375, 1465), none about the expectations I changed. The grep found nothing for the card of a map or the way-on buttons, but the part I did not read might hold more.
- `guidelines/coding.md`: read whole. Its kind files (`guidelines/coding-*.md`) not read: none applies to test files of `tests/view/`.
- `foundations/part_map.md:3-32` (browser-view) not read: the three test files belong to the part by path (`tests/view/`).
- `foundations/decisions.md`: D-464 (6227–6241), D-465 (6242–6256), D-466 (6257–6271), D-149 (6032–6048), D-53 (10407–10435) and D-132 (5862–5924) read whole. D-327, D-368, D-44, D-397, D-388 are cited by the tests but not read (the tests' own decision lines name them).
- `.runs/task-cycles/mechanizm-drabiny/task_frozen.md`: lines 29–30 (To do 2–3) and 117 (Context, row 3) read.
- `src/browser/AGENTS.md` read whole (it applies to `src/browser/`; my change is not there).
- `src/browser/sim/data/maps.ts`: lines 355–425 read and the composition (`ROWS`, `composeMaps`) only by the grep for `opensAfter`, `name`, `id`.
- `src/browser/view/map-lines.ts`: lines 1–40 and the `sendMaps` function read; `src/browser/view/end-window-lines.ts` (the `opensAfter` filter, per the frozen task) not read: no view code changes.
- `guidelines/testing.md` "Changing an existing test", "Behaviour, not implementation", "Test inputs and expected values" read whole.

## Searches not found or unclear

- The plan's *Read* gives `foundations/decisions.md:10362-10390` for D-53 and the handoff gives `:10407-10435`; the second matches (the decision begins at 10407). Nothing else unclear.
- `guidelines/testing.md` "Where the expected value comes from" says the expected values come from the foundation; the new expectations come from D-466 and D-464 (the data's order and the rungs), so the source is the foundation, not the code under test. Clear.
- The hook `rules-on-demand` blocked my first commit call once and asked me to read `.ai/rules/git.md`; I read it and re-ran the same commit. Nothing else.
