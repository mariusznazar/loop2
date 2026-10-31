# Report — Slice 4, task `rozliczenie-przejsc`

**Status:** done

## Commits

- `3eb2a8d` feat: :sparkles: the map-run screen says what a solved-map run pays and what a death took (author mariusznn@gmail.com). Worktree clean after it.

## Files changed

- `src/browser/view/trip-lines.ts` (+46/-1): `solvedRunText`, `deathSettlementLine` (pure, from the state alone); `createTripLines` gains `settlement` and `solved`. `tripTexts` unchanged.
- `src/browser/view/game-view.ts` (+2): order `deposited`, `settlement`, body row, `solved`, practice, preview.
- `src/browser/styles.css` (+5): `.trip-result.danger { color: var(--danger) }` (token only).
- `tests/view/trip.test.mjs` (+129/-1): table of decision 8's six rows (progressLost and resurrectionUsed both), a death not yet settled draws nothing, loaded screens read the same lines.

## Checks (command => exit code)

- First failing run, before code: `npm test -- tests/view/trip.test.mjs` => failed on the assertion (solved line null instead of the text), with stubs returning null.
- `npm run typecheck` => 0
- `npm test -- tests/view/trip.test.mjs` => 0 (6 pass)
- `npm test -- tests/view/account-screen.test.mjs` => 0
- `npm run build` => 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` => 0
- `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after build => 0 (786 pass, 0 fail)
- Also: eslint --max-warnings 0 on the three changed TS/MJS files => 0; prettier --check on the four files => 0.
- Not run: the product gate (`npm test` with no file), by the handoff.

## Own-work check

Requirement most likely missed: "a loaded screen is the same screen" and "draws nothing while the settlement is null" (task items 6, 18). Check: the second test loads each of four states through `savedGame`/`loadSavedGame` and compares lines; it also asserts null for an unsettled death. Passed. A first version failed to load because the test's completed state set `streak` 479 at minute 1 (the load refuses that); I set the minute too. Not a product defect.

## UI check (browser, `playwright-mcp`)

Harness `.runs/task-cycles/rozliczenie-przejsc/harness/harness.html` + `harness.js` (copied into ignored `dist/public/`, copy removed afterwards) mounts the real `createGameView` with a stub client on states made by the simulation's functions. Served by `python -B -m http.server 8768 --bind 127.0.0.1 --directory dist/public`; server stopped (port 8768 no longer answers).
Read in the DOM, for 8 states (six rows, both deaths each, marked and unmarked) and the same 8 after `loadSavedGame(savedGame(...))`:
- Order is as decision 8: settlement or deposit above the body row; solved line below the body row and above the practice line; preview last.
- Computed colour: `text-secondary` lines rgb(159,159,169) = token `#9f9fa9`; the progressLost line has class `trip-result danger`, rgb(255,100,103) = `#ff6467`. Loaded states gave identical order, classes and colours.
- Marked going-on run reads "Wyniesie: nic"; marked completion reads "Do skrzynki nic nie trafiło."
- Screenshots viewed: death-lost-marked at 1280 and 480, going-marked at 480 (lines wrap, nothing overflows). The others were saved but I did not open them.
Screenshots (16, `.runs/task-cycles/rozliczenie-przejsc/reports/s4-<state>-1280.png` and `-480.png`, states: going-unmarked, going-marked, done-unmarked, done-marked, death-used-unmarked, death-lost-unmarked, death-used-marked, death-lost-marked).
This does not show the way through an account (login, load from the server, the clock settling a death); the harness skips the app page.

## Choices

- Pure function `deathSettlementLine` returns `{ text, danger }`; role is a class toggle on the one `.trip-result`. Rejected: separate classes per role; cost if wrong: none.
- Elements: `settlement` placed right after `deposited` (never both visible: a death has no completion).
- No DOM-level unit test of `createTripLines`; wiring (class toggle, order) is shown only by the browser check.

## Reaches beyond the dispatch

- Read `src/browser/sim/types.ts` (DeathSettlement) and the `loadSavedGame` rule on streak vs minute in `saved-game.ts`, to build loadable test states.
- Playwright screenshots can only be written under `C:\Storage\repos\loop2\.playwright-mcp`; I copied them into the reports directory.

## Searches not found or unclear

- none. Note: the handoff's Checks line mentions `npm test -- <file>`; they ran as written. `SAVED_GAME_VERSION` untouched (the raise is not in this slice).
