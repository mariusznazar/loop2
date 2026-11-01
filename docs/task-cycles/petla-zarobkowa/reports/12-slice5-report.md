# Slice 5 report — the character's row in the headquarters

**Status:** done with concerns (concerns below; none blocks)

**Commit:** `395b6f3` on `task/petla-zarobkowa` (author the owner's address), worktree clean.

## Files (ten, the plan's limit)
`src/browser/sim/trip.ts` (`clippedTake` extracted from `takeFromNowhere`), `src/browser/view/trip-lines.ts` (`rehearsalMark`, `REHEARSAL_MARK`), `src/browser/view/headquarters.ts` (`loopLine`, `stoppedLoopLine`, controls `startLoop`/`stop`, loop rows, per-button character disabling, mark element, chest drawn on its own and out of `teamKey`), `src/browser/view/game-view.ts` (`startLoop` via `clock.startLoop` + `saver.moment()`, `stop` via `clock.flush()` + `act(stopLoop)`), `src/browser/styles.css` (`.team-member-loop`, `.team-member-stopped`, `.rehearsal-mark`, tokens only), `guidelines/styleguide-browser-view.md` (line 198 now lists „Zatrzymaj”), four test files (headquarters, trip, account-screen, sim/trip).

## Checks (command, exit code)
- `npm test -- tests/view/headquarters.test.mjs` 0 · `tests/view/trip.test.mjs` 0 · `tests/view/account-screen.test.mjs` 0 · `tests/sim/trip.test.mjs` 0 · `tests/quality/test_quality_invariants.py` 0 · `npm run typecheck` 0.
- Red before code (assertion failures): `clippedTake` test (actual `[]`), `rehearsalMark` test (actual null), `loopLine`/`stoppedLoopLine` tests (actual `''`), and in account-screen six new tests failed on assertions after the element plumbing was added as a first step (loop line `''`, rows rebuilt on chest change, no mark).
- Not run: the product's gate (`npm test` without argument), `foundation_check.py`, Stryker.

## Own-work check
Requirement most likely missed: a deposit/take must not rebuild the rows (focus on „Zatrzymaj”, open list). Test: Ola's loop start takes sticks from the chest; the same row, select and „Zatrzymaj” elements remain and the focus stays. Red first (rows were replaced), green after moving the chest out of `teamKey`.

Browser check: own harness `.runs/harness/` (static server on 127.0.0.1:4455 over `dist/public`, page building `createGameView` from crafted states; server stopped by PID, port closed), Playwright MCP, screenshots inspected:
- solved map, no loop, mark in `warning` under „Wyślij” (shown for both characters), unsolved map without „Puść w pętlę”;
- character in a loop at 480 px width: loop line, „Zatrzymaj” with focus ring, own „Wyślij”/„Puść w pętlę” disabled, other character's active, „Kup” and program list active, long name wraps;
- after clicking „Zatrzymaj”: row back to normal, „Pętla zatrzymana”; state with stopped practice: „Pętla zatrzymana · wprawa: Eksploracja +12, Jedzenie +4”.

Unchecked: the real account page and a real reload from the server's save (harness builds the view from a state; the load path is covered only by the unit test of a state holding `stoppedLoops`); focus reached by the Tab key all the way to „Zatrzymaj” (focus set by script after one Tab, `:focus-visible` matched, outline solid); the loop line advancing live each game minute; a crafted v3 document through the real server.

## Concerns / choices
- The two ACTS cases („Puść w pętlę”, „Zatrzymaj”) in account-screen went green with the first plumbing step; I did not see them red separately.
- Choice: „Puść w pętlę” is created only for solved maps (not hidden); rejected hiding, cost nil. Its disabling: character in a loop or in the manual run.
- After „Zatrzymaj” the button hides and focus falls to the page body; the spec leaves this to the maker only for „Zamknij”. Not handled; moving focus (e.g. to the row's program list) would be a small follow-up if wanted.
- `stoppedLoopLine` repeats the small positive-gains filter of `practiceText` (`character-skills.ts` is outside this slice's files).
- Plan's *Checks* named `npm test` runs only per file here, as instructed; no gate run.

## Reaches beyond the dispatch
None beyond the dispatched files; read `src/browser/sim/loop.ts` (startLoop/stopLoop/catchUp), `clock.ts`, `types.ts`, `button.ts`, `select-list.ts`, `character-skills.ts` as the handoff names.

## Searches not found or unclear
none
