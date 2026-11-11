# Report — slice 4 of koniec-przejscia (the window on the screen of a map run and in the game view)

**Status:** done with concerns (the concerns are in "Problems as observed": a pre-existing scroll of the page that the window had to be made to survive, the `end-window.tsx` and `account-screen.test.mjs` reaches, and the checks the cycle's gate still owes).

## Files and commits

Commit `35c03cdd` on `task/koniec-przejscia` (base `f4b0fee`), message "feat: :sparkles: stand the end-of-run window over the screen of a map run and run it in the game view". Author address checked with `git log --format='%h %ae'`: `the author's address`.

| File | Added | Removed |
|---|---|---|
| `src/browser/view/game-view.ts` | 141 | 27 |
| `src/browser/view/run-screen.tsx` | 128 | 17 |
| `src/browser/view/run-header.tsx` | 30 | 7 |
| `tests/view/end-window-game.test.mjs` (new) | 843 | 0 |
| `tests/view/run-screen.test.mjs` | 236 | 0 |
| `tests/view/run-header.test.mjs` | 84 | 8 |
| `tests/view/end-question.test.mjs` | 26 | 8 |
| `tests/view/account-screen.test.mjs` (a reach, see below) | 4 | 1 |

`foundations/` untouched. No CSS touched (`.end-window` keeps `max-height: 80vh`; the real-browser check below shows it fits). No screenshot is kept anywhere.

## What I made

- **`run-header.tsx`**: new props `windowOpen` and `controls.openWindow` (`RunHeaderControls`). After the end of the map run the header has „Koniec przejścia” before „Restart” while the window is closed; while the window stands over an ended map run the header is `hidden` and the button is not drawn; a map run that goes on has neither.
- **`run-screen.tsx`**: `createRunScreen(panel, controls, chronicle)` takes `RunScreenControls` (the status row's, the question's, plus `openWindow`, `closeWindow`, `openMap`). New `setWindow(open)` beside `setQuestion`, `focusHeaderButton(name)` and `focusWindow()`. While the window stands over an ended map run the screen draws `EndWindow` and sets `hidden` on the header and each of the three `.screen-area` sections (they stay in the tree; the program panel's element stays connected). It gives the window `chronicle.entriesToDeath(4)`. „✕” and Escape ask `controls.closeWindow()` and focus „Koniec przejścia”; „Dodaj regułę z tym” asks `controls.closeWindow()` and then calls `panel.addDiscoveredRule()`; „Restart”, „Zakończ” and „Otwarte: …” are the controls given. When the window newly appears, the page goes to its top (`document.documentElement.scrollTop = 0`), see Problems.
- **`game-view.ts`**: `endWindowOpen` memory (page only; never in the game state or the save). It is true at build on an ended map run, set at the game minute a map run ends (`take`), set at every entering of the screen of an ended map run (`show`), cleared at `closeWindow`, at the question (`askToEnd`) and, being derived, at the end or restart. The window stands only while open, on the run screen, with no question, over an ended map run (`windowShown`), and `syncWindow` tells the screen. `askToEnd(opens)` is the one place of „Zakończ” and „Otwarte: …”; the question remembers `opens` (a map or null), so `endRun(result, opens)` lands on Postać or on `#/mapy/{mapa}`; „Wróć” leads nowhere and leaves the window closed. `openWindow` (header's „Koniec przejścia”) closes a standing question first. After `halt()` open and close change nothing. A restart from the window leaves focus on the header's „Restart”. A window open at the build takes focus at the first reading of the clock once the game is in the page (the build runs before the page places the element, where focus is a no-op), unless focus already stands on a control.

## Checks (command and exit code)

Tests written first, seen failing for the expected reason (assertion "the window stands"/ header labels / `hidden`), then passing:

- `npm test -- tests/view/end-window-game.test.mjs`: red before the code, exit 1, 1 pass 18 fail (`reports/s4-red-game.log`; every failure is "the window stands: expected a true value, got undefined" or the reload case's assertion, after I made the helpers assert instead of throwing on a missing element); green, exit 0, 20 pass (`s4-final-end-window-game.log`). One earlier red run died on my own precondition because the default program stops at the first discovery; I changed the fixture to a program with no rule that freezes.
- `npm test -- tests/view/run-header.test.mjs`: red exit 1, 20 pass 4 fail (`s4-red-header.log`: labels without „Koniec przejścia”, header not hidden); green exit 0, 24 pass.
- `npm test -- tests/view/run-screen.test.mjs`: first red on `setWindow is not a function`, so I added an empty `setWindow` stub, then red exit 1, 14 pass 5 fail on "the window stands" (`s4-red-screen.log`, with the stub); green exit 0, 20 pass (one case added later for the scroll).
- `npm test -- tests/view/end-question.test.mjs`: exit 0, 17 pass (test changed, see Choices).
- `npm test -- tests/view/chronicle-game.test.mjs`: exit 0, 4 pass.
- `npm test -- tests/view/account-screen.test.mjs`: exit 1 first (2 fail: `shown(buttonNamed(root, "Restart"))` met the hidden header's button), then exit 0, 130 pass after the helper change.
- `npm test -- tests/view/uncaught-failure.test.mjs`: exit 0, 17 pass. `npm test -- tests/view/menu-bar.test.mjs`: exit 0, 28 pass.
- Also run, touched code: `tests/view/end-window.test.mjs` 13 pass, `tests/view/scene.test.mjs` 19 pass, `tests/view/status-row.test.mjs` 19 pass, `tests/quality/test_node_test_selection.py` OK; all exit 0.
- `npm run typecheck`: exit 0. `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view tests/view`: exit 0 (first run exit 1 on two `no-setter-return` in my tests, fixed). `node node_modules/prettier/bin/prettier.cjs --check src/browser/view tests/view`: exit 0.
- Not run: the full suite, `foundation_check.py`, the invariant tests of the token files (no CSS changed). That is the cycle's gate. The handoff named the failing base checks (`account-mail.test.mjs:350`, quality venv); I did not meet them.

Mutants run by hand against `end-window-game.test.mjs` (each restored): no first-reading focus (1 fail), no `endWindowOpen = false` at the question (1 fail, found after adding the „Porzuć zmiany” step to the „Wróć” case, which the first version of the test missed), `endRun(end, null)` for `opens` (1 fail), no `closeQuestion()` in `openWindow` (1 fail), no opening at the entering (1 fail), no opening at the end (9 fail), no focus to „Restart” (1 fail).

## Own-work check

- **Requirement most likely missed:** the cases crossing each other: the window must never stand with the question; after „Wróć” it stays closed even when a later change of the game draws the screens again; the question must remember which button asked it; and "the menu bar stays above and works" in a real browser (D-88).
- **Checks:** `end-window-game.test.mjs` cases for each of those; the mutants above; and the real-browser flow of binding answer 5.
- **What it showed:**
  1. The first version of the „Wróć” case passed although `endWindowOpen` was not cleared at the question (the window would have come back at the next redraw). Fixed by the extra step and kept.
  2. In the real browser, after a death while the player had scrolled the run screen down, the window took focus, the browser scrolled the page so that the window's top edge met the top of the viewport, and the menu bar (above the window in the document) stood out of sight (nav at y -80). After a reload the browser's restored scroll did the same (nav at y -25). Fixed: the page goes to its top when the window appears and when the owed focus is taken (run-screen, one test each). Rechecked: nav at y 0, window at y 80.
  3. Everything else of the list passed, below.

### Real-browser check (method, sizes, observations)

Method: `npm run local` (HTTPS), account `agent4@example.test` through the login card (made-up, local only), saved states composed by `.runs/s4check/compose.mjs` (ignored; built with the simulation: a character with an empty program at 16× that freezes at minute 243, a death already settled, and a map run at minute 479 with streak 479 about to complete), sent by `PUT /api/saved-game` as the skill says, `playwright-cli` (open, snapshot, click, press Escape and Tab, resize, eval of element rectangles, screenshots, console). Screenshots were looked at and deleted; none is kept or published. `playwright-cli close` and `npm run local:stop` ("Local starts stopped: 1") were run at the end, `.playwright-cli/` deleted.

Sizes: 1280 × 720 for the flow; 800 × 720 and 400 × 720 for the one-column layout.

- **Death on the screen (live, 16×):** the window opened by itself at minute 243, titled „Mag zamarzł”, focus on its root; header and all three areas `hidden`; nav at y 0 with the window at y 80.
- **Menu bar:** with the window open a click on „Siedziba” left the screen (`#/`, window gone); „Wróć do przejścia · Las · minuta 243” brought it back and the window opened again.
- **„✕”/Escape:** Escape closed it, focus on „Koniec przejścia” in the header (header order „Koniec przejścia”, „Restart”, „Zakończ”); a click on the button opened the window again.
- **Reload on the ended screen:** the window opened again and held focus within the first reading (after the fix, with a scroll of 60 set before the reload: scrollY 0); with a loaded game „Ostatnie minuty” are absent (window 344 high) as D-212 says.
- **„Restart” of the window:** the window closed, the run started again, focus on the header's „Restart”.
- **„Zakończ” with unsaved changes:** the window closed and the question stood in the panel of the copy, above „Kopia: Program” (rects: question y 164, heading y 195, x 755), focus on „Zapisz”; „Wróć” closed it, window stayed closed, „Koniec przejścia” in the header; „Odrzuć” opened `#/postac/1`. With no unsaved changes the window's „Zakończ” opened `#/postac/1` at once, no question.
- **Completion (composed, 1 second to complete):** title „Las rozwiązany” in `positive`, buttons „Restart”, „Zakończ”, „Otwarte: Las — głębiej →”; the last one with no unsaved changes opened `#/mapy/forestDeep` (card of Las — głębiej, Postać not built); with unsaved changes (copy edited after the end, since an edit during the run zeroes the streak) the window closed, the question stood, focus on „Zapisz”, and „Zapisz” opened `#/mapy/forestDeep`.
- **Height:** with 14 unfired rules the window is 576 px high (the 80vh) at 1280 × 720, top 80, bottom 656, its body scrolls (478 px) and the buttons stand at y 607–655 in sight; at 800 × 720 and 400 × 720 the same 576 px, top 96, bottom 672. No warning row under the menu bar stood during the check (no save failed), so the clip with that row was not seen; the free space left is 64 px (1280) and 48 px (narrow), more than a one-line row.
- Console: no `uncaught` or `saved-game-load` line.
- **Not reached:** a completion played to the end by a real program (no short program solves Las; the composed state stands in), and the window with the row of warnings standing.
- **Screenshots (ui_check):** inspected, none kept; the foundation settles a place for screenshots (`mariusznazar/screenshots`), and I pushed none because the orchestrator takes the ones that go to the request.

States of the one new control: „Koniec przejścia” is the shared plain `ReactButton`, so default, hover, focus, disabled states are the shared control's (D-44); it has no waiting state. The header is hidden by `[hidden]` (`display:none !important`), so it sets no value of its own.

## Reaches beyond the dispatch

- `tests/view/account-screen.test.mjs` (not in *Change*): the helper `buttonNamed` now prefers a shown button; two cases failed because the first „Restart”/„Zakończ” in the document is the hidden header's while the window stands. Four lines.
- `src/browser/view/end-window.tsx` was not changed; I read it whole as named.
- `src/browser/view/status-row.ts` (`StatusRowControls`) read in part (lines 100–117) to see the controls' type; not changed.
- `src/browser/styles.css`: read the regions of `[hidden]`, `.screen`, `.run-screen-areas`, `.run-header`, `.end-window` to confirm `hidden` wins over `display:grid/flex` and for the height check; not changed.
- `src/browser/view/clock.ts` (first 80 lines), `src/browser/view/world-area.tsx` and `scene.tsx` (grep for `events`): to see that redrawing with the same `events` object starts no scene effect, which `setWindow` relies on.
- `src/browser/view/discovery-band-text.ts`, `discovery-rule.ts`, `src/browser/sim/saved-game.ts:975-1010`, `src/browser/sim/data/maps.ts`, `tests/sim/completion.test.mjs`, `tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`, `.claude/skills/loop2-play/SKILL.md` and `compose-state.mjs`: for the fixtures and the composed states.
- `the author's rules for scripts` and `git.md`, as the instructions say; my first scripted rewrite turned a new test file into CRLF and I put it back to LF (checked with `file`, and Prettier `--check` passes).

## Unread material:

none. Every foundation entry of the handoff's current ranges (D-53, D-62, D-88, D-96, D-122, D-132, D-173, D-208, D-212, D-250, D-280, D-283, D-285, D-287, D-311, D-313, D-322, D-323, D-324, D-362), `foundations/part_map.md:3-28`, the invariants (`browser-view-framework`, `eslint-source-rules`, `prettier-source-format`, `document-test-memory-limit`, `uncaught-failure-game-state`), the glossary entries (`map run restart`, `chronicle`), `guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md`, `src/browser/AGENTS.md`, `screen-address.ts`, `end-question.tsx`, `discovery-band.tsx`, `chronicle.ts`, `program-panel.tsx:130-165` and `740-796`, `maps-screen.tsx:1-120`, `page-document.mjs`, `chronicle-game.test.mjs:1-200`, the passages of the task copied in the handoff, `end-window.tsx`, `end-window-lines.ts`, `run-record.ts`, the fields in `types.ts` (read by grep and `saved-game.ts` record function), the slice-3 report's sections, and the three files I changed were read whole or in the ranges given. `program-panel.tsx` outside 130–165 and 740–796 and `maps-screen.tsx` after line 120 were not read (the handoff's ranges).

## Searches not found or unclear:

- The handoff says the window's controls are given to the screen as "the controls the screen takes"; slice 3's `EndWindowControls` has `addRule` and `close`, which the plan's wording ("closes the window and then does what the panel's `addDiscoveredRule` does") puts in the screen, not the game view. I did that, so the screen's own `RunScreenControls` hold only `openWindow`, `closeWindow` and `openMap` beside the existing ones.
- D-173/D-324 do not say what a header „Koniec przejścia” does while the question stands. See Choice 2.
- D-173 and the task say "after a restart or an end focus goes where it goes today"; for a restart pressed in the window no focus exists today (the header's button keeps it). See Choice 4.
- Where the window stands in the DOM among the screen's children is not settled; I put it after the areas.

## Choices (way rejected, cost if wrong)

1. **Window memory is a boolean the game view keeps, with visibility derived** (`endWindowOpen` and `windowShown()` = open, on the run screen, no question, over an ended map run). Rejected: a tri-state ("closed by the player", "closed by the question") — D-173 rejected the window remembering that the question closed it. Cost: one more redundant condition (ended) in two places.
2. **„Koniec przejścia” while the question stands closes the question as „Wróć” does, then opens the window** (the window and the question never stand together, D-311 *violates*). Rejected: hiding the button while the question stands (the plan: shown whenever the window is closed); ignoring the press. Cost: a player who presses it loses the question, which only asks again with „Zakończ”.
3. **A second „Zakończ”/„Otwarte” while a question stands leaves the question as it is** (D-324: a second „Zakończ” acts and leaves the question), so the first asker keeps the destination. Rejected: the latest button wins. Cost: if a player sees the question from „Otwarte” and presses „Zakończ” in the header they still go to the map.
4. **Focus after „Restart” of the window goes to the header's „Restart”** (where the header's own „Restart” leaves it); after an end, Postać's or Mapy's screen as before. Rejected: the run screen element (as after a send). Cost: Enter again would restart again; one line to change.
5. **The page goes to its top when the window appears** (in `run-screen.tsx` after the draw that mounts it, and in `focusWindow`), found in the real browser. Rejected: `focus({ preventScroll: true })` in `end-window.tsx` (slice 3's file; the shrinking document would clamp the scroll to a place that still hides part of the window); `position: sticky` for the menu bar (a layout change outside the slice). Cost: a player who had scrolled loses their scroll position at the end of the map run, which D-362 wants anyway (the window covers the screen).
6. **First-reading focus** (`windowFocusOwed`) in the game view, because the game is built before the page places its element; changing `app.ts` was out of the slice. Rejected: nothing (focus would stay on `body` after a reload and Escape would do nothing until Tab). Cost: a 200 ms delay at most, and a clock callback that does one boolean check afterwards.
7. **`hidden` on each of the three sections and the header, not on the `.run-screen-areas` wrapper**, so a test reading the areas sees `hidden` on each. The wrapper stays an empty grid of no height.
8. **Window after the areas in the DOM**, not before the header; while the others are hidden the order shows nothing.
9. **`end-question.test.mjs`:** the two ended cases now press the visible button (`endButton`: the window's where it stands) and assert that no window stands with the question. Kept the header's button in the other cases. Reason: a hidden header button is not something a player can press.
10. **`run-header.test.mjs`:** the two existing label lists after an end now read „Koniec przejścia”, „Restart”, „Zakończ”, which is the new requirement (D-311), not a weakened assertion; added cases for the button and the `hidden` header.

## Problems as observed

- The pre-existing `focusShownScreen()` (in „Wróć” and when a link brings the run screen back) focuses the run screen element, and the browser scrolls the page by 40 px (the screen starts at y 80); this was already so before my change. The window now hides it for ended map runs by going to the page's top, but a map run that goes on is still entered scrolled by 40 px with the menu bar partly out of view. Cause verified by the scrollY values after each step in the real browser (0 before the click, 40 after a link or „Wróć”); the reason (`element.focus()` scrolling a tall element) is a guess.
- `D-362` order (discovery before the longest streak) remains as binding answer 4 says; the code follows the plan.
- The band of a discovery still stands at an end where a discovery stands (slice 5 removes it); with the window open it is `hidden` under the covered areas and after „✕” it shows, as before the change.
- In `end-window-game.test.mjs` a completion is composed (`oneShort`), not reached by a program; the state is built as the simulation's own `completion.test.mjs` builds it and, with `loadSavedGame` refusing a streak above the minute, I set the minute and `minutesByAction` to match in the composed save of the browser check.
