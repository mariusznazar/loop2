# Slice 18 report — the mage stops where it reached

**Status:** done with concerns (the real-browser check was not made; see Concerns)

## Commits

- `4c256a99` fix: :bug: the mage whose walk is cut by an action that leads nowhere stops where the walk has brought it, not at the place of the walk before (base `2d62c5d2`)

## Files changed

- `src/browser/view/scene.tsx` +15 −7
- `tests/view/scene.test.mjs` +52 −0

## What changed

`placeOf(drawing, reached)` now takes a function that gives the reached place, in place of `kept` (the target of the walk under way). The function is called only where the goal is to stay. In `Scene`, `next` is `placeOf(drawing, () => reachedX(mageRef.current, current, frameWidth))`; the first draw passes `() => SCENE.clearingX`. Where a walk is under way and the goal stays, `next` is the place CSS has reached, so `pending` differs from `current.x`; the existing layout effect reads `reachedX` again, finds `from === pending`, and sets `{ x: pending, from: null }`: the mage stands there, with no walk (walk number and element unchanged). Where the mage already stands, `reachedX` returns `shown.x`, so `pending` stays null (the old "kept" behaviour: `tests` "keeps the place of the previous reading" still passes). The docstring of `Scene` was changed to match.

## Checks (command, exit code)

- Test written first, seen failing for the expected reason: `npm test -- tests/view/scene.test.mjs` → exit 1; `eating: where the walk had brought it: expected 62.7976%, got 81.8452%` (log `reports/slice-18-scene-red.log`).
- After the change: `npm test -- tests/view/scene.test.mjs` → exit 0, 72 pass, 0 fail (`reports/slice-18-scene-green.log`).
- `npm test -- tests/view/run-screen.test.mjs` → exit 0, 20 pass, 0 fail (`reports/slice-18-run-screen-green.log`).
- `npx eslint src/browser/view/scene.tsx tests/view/scene.test.mjs` → exit 0.
- `npx prettier --check src/browser/view/scene.tsx tests/view/scene.test.mjs` → exit 0.
- Full suite, foundation check, instruction check: not run (the full gate is the orchestrator's).

## The new test

`a walk cut by an action that leads nowhere stops the mage where it has reached, and the place it was walking to is not reached`. jsdom runs no animation, so the test replaces `window.getComputedStyle` (restored in `finally`) so that the walking mage's element (`.scene-mage[data-walking]`) answers `translate: -100%`, i.e. 64 px back from the target 275, reached = 211 = 62.7976 % of the 336 px frame (derived by hand). Cases, each from a mage walking from the sticks to the right edge and cut by a new action: „Zjedz”, „Zapal — patyk” (`lightItem`), a fight (`current: null`), „Zbierz” with fibre, „Obchód” with fibre. Each expects `left` 62.7976 %, no `data-walking`, no `--walk-start`. A break it catches: `placeOf` returning the walk's target for a stay goal (the failing run above), or the effect not stopping the walk. It is a bug, not a decision, that fails it.

## Own-work check

- Requirement most likely not met: the task's To do 20 — "the mage stops where it has reached, and does not run on to the cut walk's target" — in a real browser, where the reached place is read from the computed `translate` of a running CSS animation.
- Check that would catch it: drive the real game, a character exploring (walk to the right edge) and a program that switches to „Zjedz — jagoda” or a fight mid-walk, and read frames of the mage's `left`/`translate`.
- Run and result: **not run in a real browser.** In jsdom with the offset given by the stub, the check passes (above). The real-browser reading of `translate` is the one `reachedX` already uses at a changed target (D-319); I did not exercise it. No screenshot taken: a screenshot shows no motion, so the route (D-418, D-419) was not used; screenshot unchecked, reason: the change is the end place of a walk, shown by frames in time, not by one image.
- Mutation in the head: `reached()` returning `shown.x` (old behaviour) fails the test; evaluating `reached()` also for an "at" goal would change nothing visible; a stop that restarted a walk of zero length would show as `data-walking` present, which the test checks.

## Concerns and choices

1. **Death and completion mid-walk.** `goalOf` gives STAYS also for `run.death !== null` and `run.completion !== null`, so a mage whose walk is cut by death or by solving the map now also stops where it has reached (before: it ran on to the old target). D-318 lists no such case; „the mage stays where it stands" covers it by reading. Not in the plan's goal list; the plan's „a goal to stay" wording covers it. Orchestrator to confirm; cost if unwanted: one extra condition in `placeOf`.
2. **Document with no readable offset (jsdom without a stub, or a browser that gives no `translate`).** `reachedX` returns `shown.x` (the target), so `next === current.x`, `pending` is null and the walk goes on as before (no stop). Existing behaviour of `reachedX`, kept. In a real browser a computed `translate` is a percentage, so this branch is not taken.
3. **Choice:** `placeOf` takes a function (`reached: () => number`), not a number, so that the computed style is read only for a stay goal while the mage walks, not on every redraw (five a second). Rejected: reading `reachedX` at every render — a forced style read per redraw. Cost if wrong: none visible.
4. `reachedX` is now also called during rendering (reads `mageRef.current`, no write). The repository's lint config has no React-hooks rule; `eslint` passes. The guideline "Efekty" is kept: the effect still lists its dependencies unchanged.
5. A float mismatch between the render's read and the effect's read would start a very short walk (new element) instead of standing; both reads happen in one task, so the computed offset is equal. Guess, not verified in a real browser.

## Reaches beyond the dispatch

None beyond the files the handoff named, plus: `.the-way/task-cycle/change/ui_check.md` (named by the method, section 3), `foundations/decisions.md` heading search for D-418/D-419 (to see whether they exist; not read whole).

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-610 and 738-767, 818-832; the rest (about 530 lines: menu bar, program editor, other screens) not read — grep for scene mentions only.
- `guidelines/testing.md`: read whole.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- `foundations/decisions.md`: D-318 and D-319 read whole at the current ranges; D-317 (10971-11055), D-316 (10846-10970) **not read**; `foundations/invariants.md:1188-1197` document-test-memory-limit **not read** (the test file uses `withPage` from `page-document.mjs` and `assert` from it, as the guideline "Tests on a document imitation" gives).
- `.runs/task-cycles/drobne-bledy-ekranow/task.md` passages: read as given in the handoff, not opened.
- `tests/view/scene.test.mjs`: read lines 1-840 and the changed area; lines 840-end not read whole.

## Searches not found or unclear

- D-418 and D-419 (screenshot place): located at `foundations/decisions.md:1521` and `:1536`, not read, because no screenshot is shown.
- The handoff's `foundations/invariants.md:1188-1197` was not opened (see above).
- Handoff's Checks name `tests/view/run-screen.test.mjs`; it passes but does not touch a walk cut by a stay action (the scene test does).

## Working copies

Directory `.runs/slice-18/` held the check logs only; the three worth keeping were moved to `reports/slice-18-scene-red.log`, `reports/slice-18-scene-green.log`, `reports/slice-18-run-screen-green.log`; the directory was removed. No worktree, clone or screenshot was made. `dist/` was rebuilt by `npm test` (product's own output, ignored).
