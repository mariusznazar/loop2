# Report of correction 1 — task `sesja-w-przegladarce`

**Status:** `done`

Branch `task/sesja-w-przegladarce`, from `38741f59` (code at `81502efc`).

## Commits and files

- `1ce0195a` fix: :bug: move the keyboard focus to the screen shown without scrolling the page, and put the page at its top when the screen of a map run is entered, so the menu bar stays in sight
  - `src/browser/view/screen-registry.ts` +8 −3 — `focusShown` and `focusIfLost` call `focus({ preventScroll: true })` on the shown screen; comments say why.
  - `src/browser/view/run-entry.ts` +9 −2 — the entry of Przejście keeps whether the player is on its screen (`here`, set in `placed`, cleared in `leave`) and, at each entering, sets `document.documentElement.scrollTop = 0` before the focus moves.

## The remark, as made, and how it is met

> **Item 2 — fix in this request.** When a player enters the screen of a map run, with "Wejdź" on Mapy or with "Wróć do przejścia" in the bar, the page ends up scrolled 40 px down in a 1280 × 720 window and the menu bar goes out of sight. The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page.

Met in two parts, both needed to keep the menu bar in sight:

1. *Moving the keyboard focus to the screen must not scroll the page.* Every place that moves focus to a screen when it is shown, or when the clicked control left the page, goes through the registry: `focusShown` (callers: „Wejdź” in `maps-entry.ts:89`, the end of a map run leading to Postać or Mapy in `run-entry.ts:92`) and `focusIfLost` (callers: a change of the address — a bar link, back and forward — in `game-view.ts:284`, the deletion of a program in `programs-entry.ts:358`, „Wróć” of the question in `run-entry.ts:222`). Both now pass `preventScroll: true`, so none of these callers scrolls the page any more; the focus still lands on the shown screen (`document.activeElement` is its `section`), as the styleguide's rule "Focus does not fall to the page" asks.
2. *The menu bar stays in sight when a run screen opens.* With part 1 alone, I measured that „Wejdź” on a Mapy scrolled down to reach a lower character (11 characters, `scrollY` 418, then 1095) left the run screen scrolled by the same amount: the menu bar and the run's header out of sight, worse than the 40 px before. The old `focus()` had hidden this by scrolling the screen's top into view. So the run entry puts the page at its top when the screen is entered, before the focus moves. „Wróć do przejścia” from a scrolled Mapy or Programy reached 0 already with part 1 (the screen left is hidden and the page shrinks), and stays 0.

Left as they are (by reading): the run screen's own focus moves to a control or the window — `focusQuestion` (`run-screen.tsx:304`), `focusHeaderButton` (`run-screen.tsx:251`), `focusWindow` (`run-screen.tsx:308`, which sets `scrollTop = 0` itself) and the window's own focus with the page sent to its top (`end-window.tsx:66`, `run-screen.tsx:161`). These move focus to the control the player acts on next, or to the window that D-370 puts at the top of the page; scrolling to them is wanted, and the end window's behaviour stays as the handoff asks. The `focus()` methods of the screens' factories (`run-screen.tsx:301`, `maps-screen.tsx:472`, `character-screen.tsx:208`, `headquarters.tsx:427`, `knowledge-screen.tsx:183`, `accounts-screen.tsx:382`) have no caller in `src/browser/` (a search for calls of `.focus()` in the entries, `game-view.ts` and `app.ts` finds only `state.card.focus()` of the login card), so they move no focus in the game today; not changed.

## Checks in the real browser

Chrome 157 headless through Playwright CLI, 1280 × 720, `npm run local`, a new local account `agent@example.test`; before = the build of `81502efc`, after = the build with the change. `y` is `scrollY`; "bar" is the top of the `header` (menu bar) in the window.

| Way in | Before | After |
|---|---|---|
| „Wejdź” on Mapy (page at 0) | y 40, bar −40, focus `section.screen.run-screen` | y 0, bar 0, focus `section.screen.run-screen` |
| „Wróć do przejścia” from Programy (page at 0) | y 40, bar −40, same focus | y 0, bar 0, same focus |
| „Wróć do przejścia” from Programy scrolled (55 before; 400 after) | y 40, bar −40 | y 0, bar 0 |
| „Wróć do przejścia” from Mapy (page at 0) | — | y 0, bar 0 |
| „Wróć do przejścia” from Mapy scrolled to 1339 | — | y 0, bar 0 |
| „Wejdź” on Mapy scrolled to 418 | — (with part 1 alone: y 418, bar −418) | y 0 (from 1095), bar 0, focus `section.screen.run-screen` |
| End window at a death, the run screen scrolled to 300 | — | y 0, bar 0, focus `section.end-window` (D-370 kept) |

Screenshot shown to the human: the run screen just after „Wejdź”, menu bar in sight — `![Ekran przejścia zaraz po „Wejdź”: pasek menu widoczny](https://github.com/mariusznazar/screenshots/blob/e1ee714bb1d667e01a6de933be5ba767aef41b91/loop2/sesja-w-przegladarce/c1-entered-run.png?raw=true)` (branch `loop2/sesja-w-przegladarce`, commit `e1ee714bb1d667e01a6de933be5ba767aef41b91`; only the local test account's game).

## Checks run

- `npm run build` → exit 0 (twice: part 1, then both parts).
- `npm test -- tests/view/screen-registry.test.mjs` → exit 0 (15 tests pass, among them „focusIfLost moves the focus only from the body or from a hidden element of the game”).
- `npm test -- tests/view/end-window-game.test.mjs` → exit 0.
- `npm test -- tests/view/end-question.test.mjs` → exit 0.
- `npm test -- tests/view/chronicle-game.test.mjs` → exit 0 (4 tests).
- `npx eslint src/browser/view/screen-registry.ts src/browser/view/run-entry.ts` → exit 0.
- `npx prettier --check src/browser/view/screen-registry.ts src/browser/view/run-entry.ts` → exit 0.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0.
- Not run: the full `npm test` (the orchestrator's), `foundation_check.py` (no foundation or guidelines file changed).

## Tests

No permanent test was added. What the existing jsdom tests prove: the focus still goes to the shown screen and only from the body or a hidden screen (`screen-registry.test.mjs`), and the run entry still drives the window and the question (`end-window-game`, `end-question`, `chronicle-game` on `createGameView`). What only the real browser proves: that the page does not scroll and stands at its top — jsdom lays nothing out, keeps `scrollTop` at 0 and scrolls nothing on `focus()`, so no jsdom test can fail for this bug. A test that spied on the options of `focus()` or on the setter of `scrollTop` would assert a call in place of the effect and replace the browser mechanism whose failure this is (`guidelines/testing.md`, "A lower test for a bug caught high", "Choosing the level"; D-88). Mutations in the head, both seen failing in the browser: without `preventScroll` the page stands at 40 after entering (the "before" column); without the `scrollTop = 0` of the entry the page keeps the scroll of Mapy (418).

For the human: this is a defect of real focus that the tests on a document imitation could not catch, which is the return condition of D-88 ("Automation is reconsidered on a defect that such a test missed"); D-89 has the author and the reviewer check that condition. Whether to reconsider the automation is the human's, not this correction's.

## Own-work check

- Requirement most likely missed: "the menu bar stays in sight when a run screen opens" in a case other than the one the remark measured. Check: entered from scrolled Mapy and Programy, by „Wejdź” and by the bar link. It found the scrolled „Wejdź” case (418) left out by part 1 alone, and part 2 was added for it; after it every way stands at 0.
- Second: the focus must still land on the screen. Check: `document.activeElement` after every way in is `section.screen.run-screen`, and the registry's focus test passes.
- Third: the end window must still open with the page at its top. Check: a death at 16× with the run screen scrolled to 300 — y 0, focus on the window.
- `ui_check.md`: the screen was looked at after the change in the running product; the screenshot is pushed to the place D-418 settles.

## Choices

- Part 2, the page to its top at entering the run screen, placed in the run entry (`placed`), not in the registry for every screen. Rejected: the registry scrolling every screen to its top at each change — the remark names the run screen, and other screens (Mapy, Programy) are left where the browser leaves them; a wider rule would be a change the human did not ask for. Rejected: scrolling to top inside `focusShown`/`focusIfLost` — the bar link and back/forward call `focusIfLost` only where the focus is lost, so the page would not go to its top when it is not. Cost if wrong: another screen entered from a scrolled page may still open scrolled; I measured only the run screen.
- The entry keeps its own `here` flag rather than reading `screenState`: the state of the screen holds whether the player is on it but has no reader for that; a new method there would widen the change.

## Foundation (not written; for the return step)

The fix contradicts no entry I read: the styleguide's rule "Focus does not fall to the page" (the focus still goes to the shown screen), D-370 and D-311 (the page at its top when the end window opens — unchanged, and now also at entering), `browser-view-focus-outline` (no outline set). It settles one thing that binds after the merge and that no entry says: the page stands at its top when the screen of a map run is entered, and moving the focus to a shown screen does not scroll the page. Where it goes (a styleguide rule or a sentence of a decision on the screen of a map run) is the return step's; I wrote nothing.

## Reaches beyond the dispatch

`src/browser/view/run-screen.tsx` (lines 85–101, 150–163, 245–315), `src/browser/view/end-window.tsx` (55–75), `src/browser/view/maps-entry.ts` (75–100), `src/browser/view/programs-entry.ts` (345–365), `src/browser/view/game-view.ts` (270–295), the `focus()` methods of the screens' factories, `tests/view/screen-registry.test.mjs` (1–80, 380–430), `foundations/decisions.md` and the styleguide searched for "scroll"/„przewij” (no rule on the scroll position at a change of screen found).

## Working copies

`.runs/author/` — measurement scripts, logs, the screenshot, the local start's log and the clone of `mariusznazar/screenshots`: removed. `.playwright-cli/`: removed. Browser closed (`playwright-cli list`: no browsers); `npm run local:stop` stopped 1 start. The local database under `.runs/local-start/` is the product tool's own. Remainder: none.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole earlier in this cycle; for this correction, the rules "Focus does not fall to the page", "Visible focus" and "The end-of-run window" again.
- `guidelines/coding-browser-module.md`: read whole.
- Decisions on the run screen and the end window (D-311, D-370, D-371): as read earlier in this cycle; not re-opened whole.
- `src/browser/view/run-screen.tsx`, `maps-entry.ts`, `programs-entry.ts`, `game-view.ts`: read in the passages named above, not whole (not changed). `screen-registry.ts` and `run-entry.ts`: read whole before the change.

## Searches not found or unclear

- A rule or decision on where the page stands when a screen of the game changes: none found (search of `foundations/decisions.md` and the styleguide for "scroll", „przewij”).
- Callers of the screens' `focus()` factory methods: none found in `src/browser/`.
