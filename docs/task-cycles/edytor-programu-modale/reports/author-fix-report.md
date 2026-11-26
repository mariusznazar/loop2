# Report of the fix of the review's findings — task `edytor-programu-modale`

**Status:** done with concerns — the blocking finding and M1, M4, M5 fixed or checked; M6 fixed in part and contested in part; M2 and M3 contested, with nothing changed for them (M2 waits for the human's value).

## Commits (range `f124f5f4..bfc8c7f2`)

| Commit | What |
|---|---|
| `9a7720aa` | fix: „▾” fills the height of a group header in the phone layout; a change of the window's size is laid in the next frame; tests for both and for the field kept on a move (M4) |
| `bfc8c7f2` | docs: „browser window” in the prose of D-288; the styleguide rule "Program editor" says the gap and „▾” fill the header's height |

Files: `src/browser/program-panel.css` +6 −1, `src/browser/view/rule-window.tsx` +22 −7, `tests/view/rule-window.test.mjs` +37 −4, `foundations/decisions.md` +5 −5, `guidelines/styleguide-browser-view.md` +3 −1.

## Findings

**1 (blocking) — a tap beside „▾” on a header of several lines folds the group. Fixed.**
In the phone block, `.rule-list-header .rule-list-controls` now has `align-items: stretch` in place of `center` (`src/browser/program-panel.css`, with a comment that names the reason). So the gap and „▾” fill the whole height of the header, and nothing in the header outside its button is bare any more. „▾” keeps its text centred, as a button does natively. The styleguide rule "Program editor" says so now (`guidelines/styleguide-browser-view.md`, the phone-layout bullet). D-296 needed no change: the code now does what it says.
Repeated in the running game (Chromium, phone session from `.playwright/cli.phone.config.json`, 360 × 740, touch through `Input.dispatchTouchEvent`), first on the header of group 1, then after renaming the group to „Grupa pierwsza z bardzo długą nazwą, która łamie nagłówek”, which made the header 87 px tall (326..413):
- „▾” measured 326..413, exactly the header's height. `document.elementFromPoint` 4 px under the header's top and 4 px above its bottom, at the centre of „▾”, gives the button itself. Before the fix the reviewer found `rule-list-controls` there.
- Touch taps there (radius 0, 8 and 15 px) fold the group. That place is now the button, drawn as tall as the header: a tap on the button, not a tap beside it.
- A touch tap on the gap before „▾”, 6 px under the header's top (radius 0 and 8), opened „Grupa 1 „…”” and folded nothing.
- A touch tap at the centre of the header's text (radius 8) opened the window of the group.
- A mouse click on the old strip now lands on „▾” and folds, as on any part of the button. Before the fix it opened the window, since the header saw the span as bare.
- jsdom lays nothing out, so no test can hold where a touch lands. The structure the test „a row and a header are covered outside their buttons …” already holds is unchanged; the stretch is held only by the browser check above.

**M1 — the size watch may end in the `ResizeObserver` loop error. Fixed.**
The watch's callback no longer lays the boxes itself. It asks for one animation frame (`requestAnimationFrame`, cancelled on cleanup) and lays them there, outside the browser's delivery of size changes. The layout effect still lays them at once after each commit.
The test „the window watches its own size alone, lays a change of it in the next frame and not in the watch's callback, and stops watching when it closes” (`tests/view/rule-window.test.mjs`) stubs the watch and the frame. It changes the window's box and calls the watch: row 3 is not made `inert` inside the callback, but is in the frame that follows.
- `npm test -- tests/view/rule-window.test.mjs` on the old Hook (`git show HEAD:src/browser/view/rule-window.tsx` put back for the run, then the fix restored): exit 1, 1 fail.
- The same command on the fix: exit 0.
- I did not reproduce the loop error in the game, and neither did the reviewer. The fix follows the reviewer's probe page.

**M2 — the window sets itself off little from the area. Contested, nothing changed.**
A stronger frame or a shadow needs a value that `src/browser/tokens.css` does not hold. `src/browser/AGENTS.md` and the styleguide rule "Every value with its source" leave a new value to the human: "without a human, name the missing or changed value in your report instead of choosing one". Named here for the request: a frame or shadow value for the window, with its source.

**M3 — `RulePanelView` 184 of 200 lines, `rule-panel.tsx` 691 of 800. Contested, nothing changed.**
Both are under the thresholds of D-425, which binds a move only before code is added to something already over a threshold. This fix adds nothing to `rule-panel.tsx`. The next change that would cross a threshold makes the move first, as `guidelines/coding.md` "Size of a function and a file" gives.

**M4 — D-306's „on the same field” is not held by the window-arrow test. Fixed.**
The test „„↑” and „↓” of the window of a rule move it one place …” now opens the field „Czynność” first. After „↓” moves the rule to another group, it checks that the pick of „Czynność” still stands in the window. Passes (exit 0). I did not see it fail: no code changed for it, and the behaviour already held.

**M5 — the end-of-run window over an open window of a rule, not checked in a browser. Checked.**
I composed an ended map run with the simulation's functions (Skraj lasu; the character froze at minute 243; the death settled through `settleDeath`), sent it by the save request and reloaded, in the same phone session.
- Window of rule 1.2 open on „Czynność”: shown, 6 parts `inert`.
- After „Koniec przejścia”: the end-of-run window stands, the window of the rule is not shown, 0 `inert` (its boxes went to zero).
- After „✕” of the end-of-run window: the window of the rule is shown again with the same heading, on „Czynność”, 6 parts `inert`.
- No failure line, 0 `uncaught` lines in the console.

**M6 — „window” in two meanings, no glossary entry. Fixed in part, contested in part.**
In D-288's prose (*Rationale* and *Rejected*) the five uses that mean the browser window now read „browser window” („in a browser window 1280 px wide”, „a narrow browser window”, „a narrower browser window”, „a narrow browser window of Programy”); no binding sentence and no quotation changed.
No glossary entry is written. The glossary template, "Which words take an entry", gives an entry only to a word the product uses otherwise than a reader of its field. A browser window and a window of the interface are both meanings that field gives the word, and "a word whose every meaning is one such a reader gives takes none". The reviewer found no sentence read wrongly either (WAY-95, WAY-99).

## Checks (command — exit code)

- `npm run typecheck` — 0
- `npx eslint src/browser/view/rule-window.tsx tests/view/rule-window.test.mjs` — 0
- `npx prettier --check` on `src/browser/view/rule-window.tsx`, `tests/view/rule-window.test.mjs` and `src/browser/program-panel.css` — 0
- `npm test -- tests/view/rule-window.test.mjs` — 0 (10 pass). Failing run on the old Hook: exit 1, 1 fail (M1).
- `npm test -- tests/view/rule-editor.test.mjs` — 0 (82); `tests/view/program-panel.test.mjs` — 0 (60); `tests/view/run-screen.test.mjs` — 0 (25)
- `npm test -- tests/quality/test_function_and_file_size.py` — 0
- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”)
- `python -B .the-way/instruction-files/check_instructions.py` — 0 („0 error, 0 warn”)
- Not run: the product's gate (`npm test` with no file) — the orchestrator's or CI's, as the handoff gives.

## Own-work check

The requirement most likely still unmet was that „▾” filling the header would leave some other place of the header bare or push the text. Checks in the phone session:
- `elementFromPoint` at the top and bottom edges over „▾” gives the button, and over the gap gives `rule-list-gap`.
- Phone measurement of the list: no scroll to the side, no control smaller than 48 px.
- Screenshots of the list and of a three-line header: the text keeps its box, and „▾” stands as a tall button at the right.

## Screenshots (branch `loop2/edytor-programu-modale`, commit `7e72c6472db212ad122abf073cacca691ae4c1ba`)

- Phone list of rules after the fix, 360 × 740 (two-line headers of 48 px, so „▾” looks as before): `https://github.com/mariusznazar/screenshots/blob/7e72c6472db212ad122abf073cacca691ae4c1ba/loop2/edytor-programu-modale/loop2_lista_regul_360_v2.png?raw=true`
- Phone, a group header of three lines with „▾” filling its height: `https://github.com/mariusznazar/screenshots/blob/7e72c6472db212ad122abf073cacca691ae4c1ba/loop2/edytor-programu-modale/loop2_naglowek_grupy_trzy_linie_360.png?raw=true`

The earlier `loop2_lista_regul_360.png` stays in its own commit. Its look differs only where a header is taller than 48 px.

## Reach beyond the handoff

- `.the-way/task-cycle/change/fix.md`, the variant's file.
- `.the-way/elements/glossary/template.md` and the skill's `SKILL.md`, `read.md`, `decide_entry.md`, `write.md` and `examples.md`, to judge M6.
- `src/browser/sim/saved-game.ts` (`loadSavedGame`, `deathSettlement`) and `src/browser/sim/game.ts` (`advanceMinutes`, `settleDeath`), to compose an ended map run the load admits. My first document was refused as „shape” because the death was not settled; I found the cause with a debug copy of the built module under `dist/`, removed at once.
- `src/browser/styles.css` (`.button`).

## Working copies

- `.runs/author-fix/`: the composed state, its scripts, the tap scripts, the log of `npm run local`, a copy of the fixed Hook, the screenshots and the clone of `mariusznazar/screenshots`. Removed.
- `.playwright-cli/` at the worktree's root. Removed.
- `dist/browser/sim/saved-game-debug.js`, a debug copy. Removed at once.
- Left: `.runs/local-start/<process>-59416-<mark>/`, the database of the local start, which the `loop2-play` skill counts as no leftover. The browser session is closed and the local start stopped.

## Unread material

`reports/review-whole-report.md` was not read: the findings file carried the evidence I needed. Everything else the handoff names was read.

## Searches not found or unclear

- I did not reproduce the `ResizeObserver` loop at the scrollbar threshold in the game. The fix rests on the reviewer's probe page.
- A glossary rule for a word whose two meanings are both meanings of the field: the template answers it ("takes none"). I found nothing unclear.
