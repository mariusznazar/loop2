# Report — Slice 5, task `rozliczenie-przejsc`

**Status:** done

## Commits and files

One commit on `task/rozliczenie-przejsc`: `feat: :sparkles: the headquarters shows each character's generation and resurrection line, redrawn on every clock tick` (address `mariusznn@gmail.com`; hash in the orchestrator's `git log -1`). Worktree clean. 7 files, +365/-16:
`src/browser/view/clock.ts`, `src/browser/view/headquarters.ts`, `src/browser/view/game-view.ts`, `src/browser/styles.css`, `tests/view/clock.test.mjs`, `tests/view/headquarters.test.mjs`, `tests/view/account-screen.test.mjs`.

## What was made

- `clock.ts`: `Clock.moment()` (moment of the latest reading, the start's until the first flush); `startClock(store, onReading)` calls `onReading` after each flush's result went to the store; none after `dispose`.
- `headquarters.ts`: pure `generationLabel` (null at 1, "pokolenie {n}" from 2) and `resurrectionLine` (round up to whole minutes, then split; below 60 min only minutes; ready by the simulation's `resurrectionReady`); `generation` in `teamKey`; per row a span after the name (from generation 2) and a `p.team-member-resurrection` between archetype and „Program:”; `update(state, nowMs)` and `tick(state, nowMs)` writing text/`danger` class only on change.
- `game-view.ts`: the clock's `onReading` calls `headquarters.tick(state, clock.moment())` while no run shows; no store apply, so nothing saved; `update` gets `clock.moment()`; the doc comment of `createGameView` updated.
- `styles.css`: `.team-member-generation` and `.team-member-resurrection` (`flex-basis: 100%`, `text-secondary`; `.danger` in `danger`), tokens only.

## Checks (command, exit code)

- `npm run typecheck` 0 · `npm run build` 0
- `npm test -- tests/view/headquarters.test.mjs` 0 (16 pass) · `-- tests/view/clock.test.mjs` 0 (15) · `-- tests/view/account-screen.test.mjs` 0 (36) · `-- tests/view/game-saver.test.mjs` 0 (17) · `-- tests/invariants/test_browser_view_token_values.py` 0
- `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after build: 0 (798 pass, 0 fail)
- Extra: `npx eslint --max-warnings 0 src/browser/view tests/view` 0; `prettier --check --no-config --no-editorconfig src/browser tests/view` 0.
- The product's gate (`npm test` without a file) not run, as ordered; `foundation_check.py` not run (the orchestrator's).
- Failing runs first: `npm test -- tests/view/headquarters.test.mjs` with stub functions: exit 1, 7 failing on assertions (stub text). Clock tests were written after the clock code; checked by mutation instead: removing `onReading()` made 2 clock tests fail (exit 1). Account-screen test: removing the `tick` call failed it; writing the line on every tick failed it (both mutated and restored; exit 1 each).
- Test marker `// invariant: resurrection-renewal` put on the readiness-boundary headquarters test; the invariant's own test files were not run by me beyond the above.

## Own-work check

Requirement most likely missed: a tick may make no new state and so no save (To do 19 with D-207). Check: the account-screen case ticks the clock 60 s with the date moving, sees the line rewritten at 59 min and ready at the moment, writes counted (0, 1, 1, 2), then `waitingCalls` is empty after the saver's 30 s check. Passed; mutations above show it can fail.

## UI check (browser, `playwright-mcp`)

Harness of Slice 4 extended with state `#hq` (four characters on a new game; copies in ignored `dist/public/` removed afterwards; the harness.js in `.runs/.../harness/` kept with the new state). Served on `127.0.0.1:8769`; stopped (no listener on 8769).
Read in the DOM: ready line `rgb(159,159,169)` (= `#9f9fa9`) with class without `danger`; not-ready lines class `danger`, `rgb(255,100,103)` (= `#ff6467`); order in the row: name, generation (from 2), archetype, resurrection line, „Program:”; generations 1 / 2 / 3 shown as nothing / "pokolenie 2" / "pokolenie 3"; hours "za 3 godz. 20 min", below an hour "za 25 min", under a minute left "za 1 min". A row 45 s from ready, followed in the page: no mutation of the line in 28 s, then one change to "Wskrzeszenie gotowe" without `danger`, within a tick of the moment.
Screenshots opened and inspected: `reports/s5-hq-1280.png` and `reports/s5-hq-480.png` (the 480 one shows the first three rows; the line wraps, nothing overflows). States covered by the one screenshot pair: ready, hours, below an hour, soon ready (1 min), generation 1 and 2/3. The "turns ready" transition was read from the DOM, not screenshotted.

## Choices

- `onReading` as a second parameter of `startClock` (default no-op); rejected: a settable property. Cost if wrong: one signature.
- `generationLabel` returns `null` at 1; the label element is built only from generation 2.
- The tick runs only when `state.run === null` (headquarters shown).
- `tick` is the same function `update` uses to draw the lines.

## Reaches beyond the dispatch

- `src/browser/sim/game.ts:66` (`resurrectionReady`), `src/browser/sim/types.ts` (Character fields): to use the simulation's boundary.
- `tests/view/account-screen.test.mjs` helpers (fake DOM, `startPage`, `saveOf`).
- `.runs/.../harness/*` and `reports/15-slice4-report.md` for the browser route.

## Searches not found or unclear

- none. Notes: screenshots from Playwright land in `C:\Storage\repos\loop2\` as relative-named files; I moved them to the reports directory. The browser reported one console error on the harness page that I did not look into (likely a favicon request; a guess).
