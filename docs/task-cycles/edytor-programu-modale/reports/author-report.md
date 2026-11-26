# Report of the one author — task `edytor-programu-modale`

**Status:** done with concerns

Concerns, in one line each (details below): the window takes the roles the task allows (`panel` with a frame in `divider`) and so stands out little against the area of the program, which is on `panel` too — a stronger frame or a shadow needs a value the token file lacks, the human's choice; the decision D-166 keeps in its *Rationale* the words „the panel of a rule opens in place under its row (D-288)”, true in substance and left unedited.

## Commits (on `task/edytor-programu-modale`, base `a566f5d5`)

| Commit | What |
|---|---|
| `05e30198` | refactor: the name field of the program panel moved, with no change of behaviour, into the Hook `useNaming` of a new file `src/browser/view/program-naming.ts` (WAY-365 move) |
| `85466a8c` | feat: the window of a rule and of a rule group — code, stylesheets, tests |
| `46383db1` | docs: decisions D-288, D-296, D-306, D-311, D-350, D-124, D-313, D-44 and the quotations of the tests |
| `f124f5f4` | docs: styleguide — the new rule "The window of a rule and of a rule group" and the edits of the rules it touches |

## Files changed (added / removed lines, base..HEAD)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 201 | 109 |
| `guidelines/styleguide-browser-view.md` | 110 | 32 |
| `src/browser/program-panel.css` | 93 | 21 |
| `src/browser/programs-screen.css` | 8 | 0 |
| `src/browser/run-screen.css` | 6 | 0 |
| `src/browser/view/program-naming.ts` (new) | 153 | 0 |
| `src/browser/view/program-panel.tsx` | 42 | 83 |
| `src/browser/view/rule-panel.tsx` | 58 | 19 |
| `src/browser/view/rule-window.tsx` (new) | 238 | 0 |
| `tests/view/rule-window.test.mjs` (new) | 479 | 0 |
| `tests/view/account-screen.test.mjs` | 2 | 2 |
| `tests/view/item-verb-panel.test.mjs` | 3 | 3 |
| `tests/view/program-editor.test.mjs` | 6 | 6 |
| `tests/view/program-panel.test.mjs` | 24 | 24 |
| `tests/view/rule-editor.test.mjs` | 38 | 38 |
| `tests/view/run-screen.test.mjs` | 3 | 3 |

## What the change does

- The rule panel is now a window (`section.rule-panel`, `role="dialog"`, named by its heading through `aria-labelledby`, no `aria-modal`, no backdrop, no focus trap). Its place in the list (`.rule-list-panel`, directly under the row or the header that opened it, under the header of a folded group) takes no height; the window is `position: absolute`, keeps the top of that place, and takes its width from the area of the program (`.screen-area.run-program` in `run-screen.css`, `.program-panel.screen-area` in `programs-screen.css`, both `position: relative`) — the column of the program in the computer layout, the width of the screen in the phone layout. The list under it does not change.
- `useCoverBelow` (`src/browser/view/rule-window.tsx`) gives `inert` to every row, header, „+ reguła”, „+ dodaj grupę” and sentence of an empty group that stands after the window and whose box lies under it, after every commit and at every change of the window's size (a `ResizeObserver` on the window alone); where the window reaches below the end of the list, the list gets `min-height` up to its lower edge, so the window never lies over the tabs or anything outside the list. Everything is given back when the window closes.
- Headings: „Grupa {n} „{nazwa}”” and „Reguła {n.m} w grupie „{nazwa}”” from the saved name; a name empty or of spaces alone leaves the name part out (`ruleWindowHeading`). The window of a group holds „Gdy warunek grupy nie jest spełniony, program pomija wszystkie jej reguły.” in `text-secondary` under its condition.
- The bar of the window (`RuleWindowBar`): „↑”, „↓” and „Usuń” (rule) or „Usuń z regułami” (group), destructive; drawn by the stylesheet only in the phone layout, under a line in `divider`, the arrows at the left and the deletion at the right, away from „✕”. Its arrows move the rule or group (with the hint of the move for the chronicle), the window goes with it and the focus stays on the arrow or goes to the other where the pressed one is now off; a deletion is at once, closes the window and gives the focus to the row in its place, else the row before, else the group's header (a group: the header in its place, before it, else „+ dodaj grupę”).
- Phone layout of the list: a row is its text alone; a header is its text, the gap and „▾”; the arrows and „Usuń”/„✕” are not drawn there (`display: none` in the `@media (width < 1280px)` block); a thin line in `divider` parts the rows of rules. The computer layout keeps its buttons in the rows and headers as before.
- „✕” and Escape (read on the window) blur a focused input of the window first, so a number or a group name typed is confirmed as leaving the field does, then close; the focus goes back to the row, or the header of a folded group, as before.
- The program panel closes the window as the question „Zapisać, odrzucić, wrócić?” appears (only at its appearance; a rule opened while the question stands opens). The window, part of the area of the program, is hidden with the areas while the end-of-run window stands and comes back as it was (no change needed: the areas are `hidden`, the state kept).
- „Zamknij panel” is now „Zamknij okno”.

## Checks run (command — exit code)

Focused checks; the product's gate (`npm test` with no file) was not run, as the handoff gives — it is the orchestrator's or CI's. Nothing but the cycle runs the full suite before the request.

- `npm ci` — 0 (the worktree had no `node_modules`)
- `npm run typecheck` — 0 (after each commit's code)
- `npx eslint src/browser/view tests/view/rule-window.test.mjs` (and the changed test files) — 0
- `npx prettier --check` on every changed TS, TSX, MJS and CSS file — 0. `guidelines/styleguide-browser-view.md` is not Prettier-clean, but it was not at the base either (its tables), and Prettier holds TS/JS only; I did not reformat it.
- `npm test -- tests/view/rule-window.test.mjs` — 0 (10 pass)
- `npm test -- tests/view/rule-editor.test.mjs` — 0 (82); `program-panel` — 0 (60); `run-screen` — 0 (25); `end-window-game` — 0 (27); `end-question` — 0 (17); `account-screen` — 0 (132); `rule-signs` — 0 (6); `group-arrows` — 0 (9); `discovery-rule` — 0 (18); `item-verb-panel` — 0 (6); `program-editor` — 0 (63); `shared-controls` — 0 (63)
- `npm test -- tests/quality/test_function_and_file_size.py` — 0; `tests/invariants/test_browser_view_token_values.py` — 0; `tests/invariants/test_browser_view_focus_outline.py` — 0
- `python -B .the-way/elements/common/foundation_check.py` — 0 ("0 errors"), run after the decisions and after the styleguide
- `python -B .the-way/instruction-files/check_instructions.py` — 0 ("0 error, 0 warn, 114 info")

Failing runs, in order:
- First run of the editor tests after the code: `npm test -- tests/view/program-panel.test.mjs` — failures with `ReferenceError: Node is not defined` (the cover Hook read the global `Node`, which the tests' page does not set); fixed with a constant for `DOCUMENT_POSITION_FOLLOWING`. Then the expected failures of the headings („Reguła 1.1” → „Reguła 1.1 w grupie „Program””) and of „Zamknij panel”, which the task changes; the tests were changed for that cause (D2 of the task, the window of question 1).
- `npm test -- tests/view/rule-editor.test.mjs` — 1 failure („✕” and Escape ask to close): my first `close()` blurred any focused element, so after „✕” the next Escape fell on the body; narrowed to inputs, the test passing unchanged.
- The new tests were written after the code. Each was seen failing on a deliberate break of the code, the break then restored from a copy: `npm test -- tests/view/rule-window.test.mjs` with the question not closing the window, no blur before closing, nothing made `inert`, no focus after a deletion and no focus kept on an arrow — exit 1, 7 fail, 2 pass (the heading and dialog cases; the heading case failed on the old code, see above). The test of the watch of sizes was seen failing with the list observed again — exit 1, 1 fail — and passing with the fix — exit 0.

## Own-work check (WAY-164)

- Requirement most likely unmet: "Wiersze, na których okno leży, są, póki stoi, wyłączone z obsługi klawiaturą i myszą, a wiersze nad oknem i pod jego dolną krawędzią dotyka się jak dziś" (To do 2) — jsdom lays nothing out. Checks: the jsdom test with given boxes (`rule-window.test.mjs`, the case of rows out of reach) and, in Chromium at 1600 × 1000, the window of rule 1.1 with `inert` on rows 1.2, 1.3, „+ reguła”, the header of group 2, its rows and „+ dodaj grupę”, none on the header of group 1 and the open row; Tab from the last field of the window went to „Kronika”, past every covered row. At 1280 × 720 the same.
- Measure of To do 6: page area 1280 × 720 — no scroll to the side (`scrollWidth > clientWidth` false) on the screen of a map run and on Programy with a window open. Phone layout, page area 360 × 740, touch: the measurement of `loop2-play` on the list, the window of a rule, the window of a group and Programy with a window open — `scrollsToTheSide` false, `controlsSmallerThan48` empty, `contentWiderThanItsBox` and `outsideTheWindow` hold only the scene (`div.world-area`, `div.scene`, `div.scene-sheet`, an `img` of the scene), the crop of the picture the styleguide allows; on Programy all four empty. The bar's buttons measured 48 × 48 each, „Usuń” in `rgb(255, 100, 103)` (`danger`).

## Walk through the running product

Way: `npm run local` (https://127.0.0.1:54444), Playwright CLI 0.1.22, Chromium, an account at `example.test` made through the card, a game state composed with the simulation's functions (full Understanding, a program of two groups „Grupa 1” and „Ogień”) and sent by the save request, as `loop2-play` gives.

| Case | By what | Verdict |
|---|---|---|
| A click on a row opens the window of that rule directly under the row, as wide as the column of the program, heading „Reguła 1.1 w grupie „Grupa 1””, focus on the cell „Zawsze” | screen of a map run, 1600 × 1000, mouse; boxes read from the page | pass |
| The window lies over the rows below; those under it are `inert`, those above are not; the list grows where the window reaches past its end; the area of the program grows with it, nothing over the tabs | same, boxes and attributes read | pass |
| The pick of the action opens in the window; the window grows | same | pass |
| Escape closes the window and gives the focus to row 1.1 | same, `activeElement` read | pass |
| A click on the header of group 2 opens „Grupa 2 „Ogień”” with the sentence under its condition | same | pass |
| At 1280 × 720 the window on row 1.2, no scroll to the side | resize to 1280 × 720 | fell wrong: the line „Coś w grze się zepsuło — odśwież stronę.” stood, console `uncaught kind=none code=none` — see below; then pass |
| Programy at 1280 × 720: the window over the editor, rows under it inert, no scroll to the side | fresh session 1280 × 720, mouse | pass |
| Phone 360 × 740, touch: rows text alone, header text and „▾”, thin lines between rows; measurement | phone session, taps | pass |
| Phone: a tap on a row opens its window across the width of the screen (9..351 in an area 8..352); the bar at the bottom with ↑ ↓ Usuń, 48 × 48 | same | pass |
| Phone: ↓ of the window moves rule 1.3 to 2.1, heading follows, focus stays on ↓; ↑ moves it back | same | pass |
| Phone: „✕” closes and gives the focus to the row; the window of group 2 holds ↑ ↓ „Usuń z regułami” | same | pass |
| Phone: folding the group of the open rule keeps the window under the header; unfolding puts it under the row | same | pass |
| Phone: the header of group 2 under an open window of rule 1.1 cannot be tapped (the window lies over it) | same | pass (the accepted cost of variant b of question 9) |
| Phone, Programy: the window across the width, measurement all empty | same | pass |
| „Zakończ” with unsaved changes and a window open: the window closes, the question stands, the focus on „Zapisz” | 1600 × 1000, mouse | pass |
| The window hidden while the end-of-run window stands, back after it closes; „Dodaj regułę z tym” of the end-of-run window opens the window of the rule | — | unchecked in the browser: reaching a death or a completion takes playing or composing an ended map run, which I did not do; held by `tests/view/run-screen.test.mjs` and `end-window-game.test.mjs` (jsdom) |
| Side observation | — | the ▾ of a header stands centred in its header; a tap above or below it in a header of several lines lands on bare header, which Chromium may give to ▾ (folding only, harmless); not corrected |

Fell wrong and corrected: the 1280 × 720 case. The cover Hook watched the list too and changed the list's own height in the callback, which Chromium reports as a `ResizeObserver` loop error event with no error object — the game counts it as a failure. Cause verified by the fix alone (watch the window only) making the line and the console error go on the same steps (`walk` repeated: no failure line, 0 console errors). Test: „the window watches its own size alone, never the list it makes grow, and stops watching when it closes” in `tests/view/rule-window.test.mjs` (fails with the list watched).

What I did not check: Firefox and Edge (a person's check, D-396); a real Android phone; the end-of-run window with a window of a rule open (above); the kitchen-sink page (no shared control, role or state was added, so the page has nothing new); motion (none added).

## Choices of how to make what the task settles

1. **The window as a layer seated in its old place.** The window keeps the seat of the panel under its row and is `position: absolute` from there, its width from the area of the program. Rejected: a portal to the area with a top computed in script — more layout code and a second place of the window. Cost if wrong: in a layout where another positioned box stands between the area and the list, the window would take that box's width.
2. **Rows taken out of reach by their boxes, with `inert`.** Rejected: taking out every row after the open one — the rows under the lower edge would be unreachable, against question 9. Cost: the boxes are read after every commit and at a change of the window's size; a row that changes height without a commit and without a change of the window's size (none known) would keep its old state until the next commit.
3. **The list grows to hold a window reaching past its end (`min-height`).** Rejected: letting the window overflow the area — in the phone layout it would lie over the tabs „Kronika” and „Teren”.
4. **The bar drawn always and shown by the phone block of the stylesheet; the buttons of the rows and the header hidden there.** Rejected: choosing the layout in script (`matchMedia`) — a second way of telling the layouts, against the styleguide's one threshold in CSS. The header's „✕” and the gap before it are hidden by `:nth-last-child(-n + 2)`, so the DOM of a header, which a test holds for the computer layout, stays as it was; cost: a reordering of the header's buttons must keep „✕” last.
5. **Departure from the end-of-run window's pattern** (*Questions carried to cycle*): no backdrop, no `aria-modal`, no trap, Escape on the window's root — kept; departures: it is a layer over part of the list (D-370 rejected a layer for its window), made safe by `inert` and the growth of the list; and it takes the focus on the cell of its open field, not on its root, as the panel did (To do 3). Both written into the styleguide rule.
6. **„✕” and Escape blur a focused input first**, so the typed number or name is confirmed (To do 3). Rejected: a commit on unmount in the number field — a change of a shared control for one screen.
7. **The question closes the window only at its appearance.** Rejected: no window while the question stands — the player could not fix a rule then, which the task does not ask.
8. **An empty name** is a name of spaces alone too (trimmed). Cost: a group named „ ” shows „Grupa 2”.
9. **Names in code kept**: `RulePanelView`, `.rule-panel`, `rule-panel.tsx`. Rejected: renaming to „window” everywhere — churn in many tests with no change for the player. D-288 says that where another entry names the rule panel, it is the window.
10. **Move before adding (WAY-365)**: `ProgramPanelView` stood at 194 of 200 lines; the name field went into `useNaming`, first in the same file (the file then stood at 774 of 800), then into `program-naming.ts`. Rejected: adding to the component as it stood — over the threshold.

## Departures from the old Loop (D1), shown on the screenshots

- The editing stands in a window under its row, not in a side panel in the right column (question 1 a, question 9 b): the program keeps its 526–622 px and the chronicle keeps its area.
- The pick of a condition and of an action stands inside the window as cells, not in a separate window over a dimmed screen with a search field (D-288 rejects that window, D-299 the search; unchanged decisions).
- The window holds no „Kolejność i kasowanie — w wierszu obok, przy strzałkach.”: in the computer layout the arrows stand beside it in plain sight, in the phone layout in its bar.
- The window's look is the panel's (`panel`, frame `divider`), the same as the end-of-run window; the old Loop's side panel stands on the page's darker background. A distinct frame needs a new value (concern above).

## Foundation entries (foundation step)

| Entry | Row | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-288, first paragraph's alias „where another entry names the rule panel, it is this window” | the cycle's | Entries that still say "rule panel" mean the window. | Wpisy, które mówią „rule panel”, mają na myśli okno. |
| D-288, second paragraph | rows 1, 10 | The window stands over the editor (program column, Programy's editor, screen width on a phone), as tall as its content, directly under the row that opened it, lying over the rows below, which are out of reach; rows above and below its edge work as before. | Okno stoi nad edytorem, ma wysokość treści, stoi tuż pod wierszem, leży na wierszach niżej, które są wyłączone; wiersze nad nim i pod jego krawędzią działają jak dotąd. |
| D-288, third paragraph | row 3 | Computer: arrows and deletion in rows and headers, none in the window; phone: none in rows and headers, all in the windows. | Komputer: strzałki i usuwanie w wierszach i nagłówkach, w oknie nic; telefon: w wierszach nic, wszystko w oknach. |
| D-311 (the program „over which the window … opens under its row, the world staying in sight and the map run going on”; the phone width) | row 2 | On the run screen the window stands over the program column, the world visible, the run going on; on a phone it takes the screen's width. | Na ekranie przejścia okno stoi nad kolumną programu, świat widać, przejście biegnie; na telefonie ma szerokość ekranu. |
| D-311, new paragraph „The window of a rule or a rule group belongs to the area of the program …” | the cycle's (from To do 2) | The window is hidden with the end-of-run window and closes when the question „Zapisać, odrzucić, wrócić?” appears. | Okno znika razem z oknem końca przejścia i zamyka się, gdy staje pytanie „Zapisać, odrzucić, wrócić?”. |
| D-296 | row 4 | „✕” of a group in its header on a computer; on a phone the deletion stands in the group's window as „Usuń z regułami”. | „✕” grupy w nagłówku na komputerze; na telefonie usuwanie w oknie grupy jako „Usuń z regułami”. |
| D-350 | row 6 | The window of a rule in a folded group stands under the group's header; folding closes nothing; unfolding puts it under the row. | Okno reguły zwiniętej grupy stoi pod nagłówkiem; zwinięcie niczego nie zamyka; po rozwinięciu wraca pod wiersz. |
| D-124 | row 8 | „+ reguła” opens the window of the new rule on the condition. | „+ reguła” otwiera okno nowej reguły na warunku. |
| D-313 | row 9 | „Dodaj regułę z tym” opens the window of the rule on the field filled from the discovery; in the end-of-run window it closes that window so the rule's window is seen. | „Dodaj regułę z tym” otwiera okno reguły na polu z odkrycia; w oknie końca przejścia zamyka je, żeby było widać okno reguły. |
| D-44, sentence „„Usuń z regułami” … is a destructive button as well.” | row 11 | „Usuń z regułami” is a destructive button. | „Usuń z regułami” jest przyciskiem niszczącym. |
| D-306 | the cycle's (from the task's *Decisions in play* and To do 3) | The window of a rule takes the player through its fields as the panel did; closing it confirms a typed number; a move by an arrow of its row or window closes nothing; deleting closes it. | Okno reguły prowadzi przez pola jak panel; zamknięcie potwierdza wpisaną liczbę; przesunięcie strzałką wiersza albo okna niczego nie zamyka; usunięcie zamyka. |
| Styleguide rule "Program editor" (rows of the phone layout, thin line in `divider`) | row 5 | On a phone rows are text alone and a thin line parts them. | Na telefonie wiersz to sam tekst, a wiersze rozdziela cienka linia. |
| Styleguide rule "The window of a rule and of a rule group" (bar at the bottom, line, away from „✕”) | row 12, and To do 8 | On a phone „↑”, „↓” and the deletion stand at the window's bottom, under a line, away from „✕”. | Na telefonie „↑”, „↓” i usuwanie stoją na dole okna, pod linią, z dala od „✕”. |
| Code: `ruleWindowHeading`, `GROUP_CONDITION_SENTENCE` in `src/browser/view/rule-window.tsx`, held by the first test of `tests/view/rule-window.test.mjs` | row 7 | The headings and the sentence of the group's window. | Nagłówki i zdanie okna grupy. |

*Rejected* of each changed decision takes the ways not chosen that the rows' sources keep: questions 1 (b, c, d), 9 (a, c) and 4 (b, c) in D-288; question 2 (b, c) in D-311; the vetoes of D4 in D-296 and D-44; question 3 b in D-306; the veto of row 6 (withdrawing D-350) in D-350. No pair of examples was added that a test does not hold, beyond rewording the existing pairs of D-288, D-296, D-306 and D-311 for the window and the phone layout; those reworded pairs are mine:
- D-288 complies: „in the phone layout at a page area 360 px wide the row of a rule its text alone and the header of a group its text and „▾”, with „↑”, „↓” and the deletion at the bottom of the window, and the window as wide as the area of the program”; violates: „in the phone layout an arrow or „Usuń” in the row of a rule, or the window narrower than the area of the program”.
- D-296 complies (added): „the header holding its text and „▾” alone, „Usuń z regułami” standing at the bottom of the window of the group”; violates: „a tap at the centre of a group's header in the phone layout landing on „▾” and folding the group; „✕” of the group in its header in the phone layout”.
- D-306 violates (reworded): „a tap on a rule's row in the phone layout that moves or deletes the rule”.
- D-311 complies (added): „the window of a rule standing over the column of the program with the world in sight beside it and the clock going on, and in the phone layout as wide as the area of the program; the window of a rule open before a death standing as it was once the end-of-run window is closed”; violates (added): „the window of a rule standing over the world, or pausing the map run while it stands”.

Tests quoting the changed sentences now quote the new wording (To do 9): in `rule-editor`, `program-panel`, `program-editor`, `item-verb-panel`, `account-screen` and `run-screen` test files; the foundation check reports 0 errors.

## Screenshots (`mariusznazar/screenshots`, branch `loop2/edytor-programu-modale`, commit `f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5`)

Pairs at 1600 × 1000, screen of a map run on Skraj lasu, paused:
- old Loop, list with a group: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop_07_program_grupa.png?raw=true`
- loop2, list with two groups („Grupa 1”, „Ogień”): `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_07_program_grupa_1600.png?raw=true`
- old Loop, editing of rule 1.1 in the side panel: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop_09_edycja_reguly.png?raw=true`
- loop2, the window „Reguła 1.1 w grupie „Grupa 1”” under its row, lying over the rows below: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_09_okno_reguly_1600.png?raw=true`
- old Loop, the pick „Czynność” in a window over a dimmed screen: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop_10_lista_akcji.png?raw=true`
- loop2, the pick of the action inside the window of rule 1.1: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_10_wybor_czynnosci_1600.png?raw=true`

loop2 alone (no old screenshot of these states):
- the window „Grupa 2 „Ogień”” with the sentence under its condition, 1600 × 1000: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_okno_grupy_1600.png?raw=true`
- phone 360 × 740, the list of rules (rows text alone, thin lines, „▾” in headers): `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_lista_regul_360.png?raw=true`
- phone, the window of rule 1.2 under its row, across the screen: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_okno_reguly_360.png?raw=true`
- phone, the bottom of that window with ↑ ↓ „Usuń” under a line: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_okno_reguly_pasek_360.png?raw=true`
- phone, the window „Grupa 2 „Ogień””: `https://github.com/mariusznazar/screenshots/blob/f18c2e68cf1c8ba043a7dbbf1254961c1662eaf5/loop2/edytor-programu-modale/loop2_okno_grupy_360.png?raw=true`

The three old screenshots were pushed beside them (D-418 allows it). The loop2 screenshots at 1600 × 1000 and the phone ones were taken before the fix of the `ResizeObserver` loop, which changes nothing they show. Each shows only the made-up account's game; no address or secret. No image file stands in the repository or in the cycle's record.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, `skill/read.md`, `skill/decide_entry.md`, `examples.md` (and WAY-03 at the pin), `.the-way/elements/common/way_of_working.md`, `rules.md` — named by the foundation step for writing decisions.
- D-425 (`foundations/decisions.md`) and `tests/quality/eslint-size-rules.mjs` — the rule of size, to know the thresholds before adding to large functions.
- D-166's *Rationale* (found by the search of the foundation for "opens in place under") — see the concern.
- Code read to make the change: `src/browser/view/state-store.ts` (whether an edit draws synchronously), `controls/react-button.tsx`, `controls/react-number-field.tsx`, `run-screen-reading.ts`, `run-screen-state.ts`, `run-screen.tsx`, `chronicle-entries.ts` (`MoveHint`), `program-editor.ts` (its functions), `src/browser/tokens.css`, `src/browser/styles.css` (layout and touch rules), `programs-screen.css`; tests' helpers `tests/view/page-document.mjs`, `game-stylesheets.mjs`, `tests/sim/understanding-fixture.mjs`; `.claude/skills/loop2-play/compose-state.mjs`; the invariant tests `test_browser_view_token_values.py` (its pattern of lengths).

## Working copies

- `.runs/author/` (scripts of the browser walk, the composed state, the copies of the code used for the deliberate breaks, the screenshots before upload, the clone `.runs/author/screenshots` of `mariusznazar/screenshots`, the log of `npm run local`) — removed.
- `.playwright-cli/` at the worktree's root, which Playwright CLI makes by itself — removed.
- Left: `.runs/local-start/<process>-54444-<mark>/`, the database `npm run local` made; `loop2-play` says it stays until the next start and is no leftover. `node_modules/` from `npm ci` and `dist/` from the builds stay as the environment of the worktree, not copies of a check.
- Nothing kept in `reports/` beyond this report.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole but the rules "The scene of a map run", "The body row of a map run" and "The picture band of Siedziba" (lines 1215–1593 of the base), which bear on nothing the change touches.
- `.runs/task-cycles/edytor-programu-modale/foundation-index.md`: not read; I read the decisions in play whole in `foundations/decisions.md` instead, and did not run `decision_index.py`.
- Decisions of *Decisions in play* read whole: D-288, D-296, D-306, D-308, D-350, D-303, D-124, D-313, D-302, D-290, D-304, D-311, D-370, D-368, D-396, D-44, D-418, D-419, D-417, D-420. Read in part: D-282 (only the sentence the task quotes). The sections "Program editor" and "Rule panel and the signs of a rule" read whole; "Screen of a map run and the end-of-run window" read for D-311, D-368, D-369, D-370, D-371 only; "Look of the browser view" read for D-44 to D-47 only.
- Invariants of `browser-view` and `every`: their headings listed, none read whole; the tests of `browser-view-token-values`, `browser-view-focus-outline` and `function-and-file-size` were run instead. The invariants `streak-program-change`, `saved-program-edit`, `copy-save` not read (no test citing them was altered).
- Glossary: searched for "rule panel" (none), not read whole.
- Code named in *Context*: `rule-drag.ts`, `discovery-rule.ts` and `end-window.tsx` not read (not changed); tests `program-editor`, `rule-signs`, `group-arrows`, `discovery-rule`, `end-window-game`, `run-screen`, `account-screen`, `item-verb-panel` read in part, by search and around the failing lines; `program-panel.test.mjs` read lines 1–520; `rule-editor.test.mjs` read lines 1–470 and 1860–1970.

## Searches not found or unclear

- The global `Node` in the tests' page: not set (`tests/view/page-document.mjs` sets `window`, `document`, `Element`, `HTMLElement`, `Option`, `location`, `history`).
- Whether Prettier holds Markdown: the styleguide was not Prettier-clean at the base, and `guidelines/coding.md` names Prettier for TS/JS only; left as it was.
- „na telefonie okno zajmuje szerokość ekranu”: read as the width of the area of the program inside its frame (342 of 360 px; the page keeps its side gap of 8 px), as D-370 reads „the width of the window” for the end-of-run window.
- A value for a frame or shadow that would set the window off from the area: none in `src/browser/tokens.css`; not chosen (concern).
