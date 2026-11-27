# Author report — wyglad-ekranu-wiedzy (the whole change as the one author)

**Status:** done

## Commits (branch `task/wyglad-ekranu-wiedzy`, base `a49c5f63`)

- `de3bbbfa6b80312d1091cdc7ed5fdc7d07df803e` — docs: D-416 (rows 1, 4, 5 of *Settlements to record*)
- `ad6504165b4e226143a366b1c8c0d6a59e3d33ce` — feat: the screen Wiedza, its stylesheet, the shared value of a step, the tests
- `ba1ccf8d5a1835123b62b20ddf7802173e7fa10d` — docs: the styleguide's rule „The screen Wiedza” (rows 2, 3, 6)

Nothing pushed to the product's repository; no request opened.

## Files changed (added / removed lines, `git diff --numstat a49c5f63 HEAD`)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 21 | 15 |
| `guidelines/styleguide-browser-view.md` | 40 | 13 |
| `src/browser/knowledge-screen.css` | 123 | 15 |
| `src/browser/view/character-skills.ts` | 20 | 4 |
| `src/browser/view/knowledge-lines.ts` | 56 | 3 |
| `src/browser/view/knowledge-screen.tsx` | 93 | 40 |
| `tests/view/knowledge-lines.test.mjs` | 58 | 0 |
| `tests/view/knowledge-screen.test.mjs` | 111 | 54 |

## What the change does

- Right area: each known tree is a row across the area (`knowledge-tree-row`), set apart by a thin line in `divider`, with the fold „▸”/„▾” (shared `ReactButton`, `aria-expanded`, accessible name = tree name) at its start, the name in `text-strong` and „{n} gałęzi” at the right edge in `text-secondary`; a click anywhere on the row toggles the tree (the fold's own click bubbles to the same handler, as on Postać).
- An open branch: first line „{nazwa} · {n} stopni” (name `text-strong`, rest `text-label`), prices „1 · 1 · 1 pkt” in a column of their own at the right (`text`), the description under the name (`text-secondary`), and — for a branch whose data have a `preview` — the line of steps: „bez gałęzi” over the value with no step, then each step as one unbreakable piece, its Roman numeral and „· {cena} pkt” (label size, `text-label` / `text-secondary`) over the value it gives (`text`). The pieces wrap between steps where the area is narrow. Branches with no number („Obchód”, „Czysty płomień”, „Zwiad”, „Ucisk”) have no line.
- The values come from one new pure function `rankValue(preview, rank)` in `src/browser/view/character-skills.ts`, which `branchText` (Postać's „teraz → po kupnie”) now calls too, so both screens read the same numbers (floor of `minimum`, decimal comma).
- Left area: the things of each group stand in a grid `repeat(auto-fill, minmax(min(12em, (100% − gap)/2), 1fr))` — as many columns as the area holds, never fewer than two. Measured: 2 columns at 1600 × 1000 (142 px each) and at 1280 × 720 (130 px), 2 at 360 px (153 px), 6 at 1100 px in the phone layout (166 px).

## Foundation entries (foundation step)

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-416, second paragraph rewritten (now three sentences), *Verification* and *Rejected* | row 1, row 4, row 5; the added parts of the pair of examples are the cycle's (below) | The row of a tree on Wiedza spans its area and opens on a click anywhere, the keyboard using a small fold as on Postać; an open branch shows under its description, in both layouts, its value with no step and each step's value and price from the data of Postać's preview, and a branch with no number only its description and prices. | Wiersz drzewa na Wiedzy stoi na całą szerokość obszaru i rozwija się kliknięciem w dowolne miejsce, a klawiatura dochodzi do małego zwijaka jak na Postaci; rozwinięta gałąź pokazuje pod opisem, w obu układach, wartość bez stopnia i każdy stopień z wartością i ceną z danych podglądu Postaci, a gałąź bez liczby — sam opis i ceny. |
| Styleguide rule „The screen Wiedza” (not a foundation entry; written by the rule of the place, `.the-way/product-guidelines/template.md`) | row 2, row 3, row 6 | The branch's first line is „name · n steps” with prices in a right column; the tree row looks as on Postać without level, bar and points; the things of the Understanding stand in as many columns of at least 12em as the area holds, at least two; Good and Bad stand on the screen as it now is. | Pierwsza linia gałęzi to „nazwa · n stopni” z cenami w kolumnie po prawej; wiersz drzewa wygląda jak na Postaci bez poziomu, paska i punktów; rzeczy Zrozumienia stoją w tylu kolumnach o szerokości co najmniej 12em, ile zmieści obszar, co najmniej w dwóch; „Good” i „Bad” stoją na ekranie po zmianie. |

- The first sentence of D-416's second paragraph keeps its opening words, so the existing lines `decision:` that quote „Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data” still match; the new tests quote the new sentences.
- Row 5 went into *Rejected*, as the task's *Decisions in play* gives („w *Rejected* odrzucenie … dostaje słowo”), not into a binding sentence. *Rationale* unchanged, as the task gives.
- *Rejected* gained the ways not chosen that the rows' sources keep: Q1 a (= Q7 b), Q1 c, Q7 c, Q2 b, each with its cost from the task.
- Pair of examples of D-416, the parts this cycle added (no row gives them; they cover what no jsdom test can, the layout), word for word, for the description to quote:
  - complies (added): „and the row of a tree across the width of its area with the line of steps of each open branch under its description, as in the computer layout”
  - violates (added): „the row of a tree as wide as its text alone” and „the line of steps hidden in the phone layout”
  - The rest of the pair is the old pair reworded from „row” to „fold”, as the task's *Decisions in play* asks.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` right after the entry: exit 0, „0 errors”.
- No question for the human arose; no row was written with another meaning.

## Checks run (command — exit code)

Test first:
- `npm test -- tests/view/knowledge-lines.test.mjs` before the code — **1** (the new case failed at its assertion: `actual: undefined`, `expected: { without: '70 %', steps: [...] }`); after the code — **0** (5 pass); again after the last edits — **0**.
- `npm test -- tests/view/knowledge-screen.test.mjs` before the component — **1** (3 of 7 failed: the list of trees, the click on a row, the open tree kept open — no `.knowledge-tree-row`); after — **0** (7 pass); again after the last edits — **0**.

Tests of touched code:
- `npm test -- tests/view/character-skills.test.mjs` — 0 (8 pass)
- `npm test -- tests/view/character-screen.test.mjs` — 0 (16 pass)
- `npm test -- tests/view/account-screen.test.mjs` — 0 (132 pass; its case of the item Wiedza presses the fold inside `.knowledge-tree`, unchanged)

Invariants and quality reached:
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0 (also rerun after the last CSS edit — 0)
- `npm test -- tests/invariants/test_browser_view_framework.py` — 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0 (also rerun after the last CSS edit — 0)
- `npm test -- tests/invariants/test_content_identifiers.py` — 0
- `npm test -- tests/invariants/test_cross_part_imports.py` — 0
- `npm test -- tests/quality/test_function_and_file_size.py` — 0
- `npm test -- tests/quality/test_quality_invariants.py` — 0 (ESLint, Prettier and the rest; ran before the last CSS-only edit, which these checks do not read)
- `npx prettier --check` on the changed TS/TSX/MJS/CSS files — first run reported 2 files (`knowledge-screen.tsx`, `character-skills.ts`); `npx prettier --write` on them; rerun — 0
- `npx eslint` on the changed TS/TSX/MJS files — 0

Foundation and instructions:
- `python -B .the-way/elements/common/foundation_check.py` (full, after `git add`) — 0, „0 errors”
- `python -B .the-way/instruction-files/check_instructions.py` (the styleguide is an instruction file named by `AGENTS.md`) — 0, „0 error, 0 warn, 110 info”

Not run: the unfiltered `npm test` — the cycle's or CI's run, as the handoff gives.

## Own-work check

- Requirement most likely missed: item 4 — no text over its frame at 360 px — for the longest values, which the screenshots' trees do not hold (the branches of „Opatrywanie małych ran”, „0,15 zdrowia na minutę”).
- Check: in a new local start, phone session (360 × 740, touch), all trees opened by `tap`, the right edge of every step piece compared with its branch's right edge, then the measurement of `.claude/skills/loop2-play/SKILL.md`.
- Result: 11 branches open; the widest piece „I 0,1 zdrowia na minutę · 2 pkt” ends at 326 px inside its branch's 339 px; `scrollsToTheSide: false`, `contentWiderThanItsBox: []`, `outsideTheWindow: []`, `controlsSmallerThan48: []`; the line of „Szybkie gojenie” wraps into two rows of steps. Console: 0 errors. Looked at the screenshot of the open tree: nothing crosses a frame. Passed.
- Mutation in head: dropping the floor `minimum` (Długi krok II and III would read −1/−3 min), a wrong numeral, prices out of order, a line for a branch with no number, a float leak (0,15000000000000002), the row's click handler removed (only the fold opening) — each is caught by the new cases. Not caught by any test (jsdom does not apply the stylesheets): the grid of columns, the wrapping of steps, the line of steps hidden in the phone layout — these stand in D-416's pair and were checked in the browser.

## Walk through the running product (walkthrough.md)

Where: Chromium of Playwright CLI 0.1.22 on this Windows computer, `npm run local` of the worktree (`https://127.0.0.1:58477`, later `:49838`), a made-up account `agent@example.test`, a composed state (18 actions, 6 items with the campfire, 2 creatures, all 9 trees; one character „Agent”) sent by `PUT /api/saved-game`.

What the change alters, in the player's words: the tree rows look and open differently, an open branch now tells what each step gives and costs, and the known things stand in columns. Shared code touched: `branchText` of Postać (now through `rankValue`).

| Case | By what | Verdict |
|---|---|---|
| Entering Wiedza: trees folded | 1600 × 1000, mouse; `aria-expanded` read | pass („false”) |
| Click on the tree's name opens it; click on the empty middle of the row folds it | mouse clicks on `.knowledge-tree-name` and at x = 600 of the row; `aria-expanded` read | pass (true, then false) |
| Keyboard: Enter on the focused fold opens, Space folds, Space opens; focus stays on the fold; focus ring drawn | `focus()` + `keyboard.press`; `outline` read | pass (true/false/true, focus stays, `solid 2px`) |
| Branch with a number shows the line of steps; branch without shows none | page text of „Wprawne oko”; count of `.knowledge-steps` under „Zwiad” at 360 | pass („bez gałęzi 70 %”, „I 75 % · 1 pkt” …; 0 under Zwiad) |
| Columns of the Understanding, row order with newest last | computed `grid-template-columns`; positions of the first six names | pass (2 × 142 px at 1600; row-major: Eksploruj, Wędruj / Idź, Zbierz / …) |
| Computer layout 1280 × 720, no touch: no scroll to the side | measurement script | pass (`scrollsToTheSide: false`, no crossing; small controls listed there are of the computer layout, where no minimum holds) |
| Phone 360 × 740 with touch: tap on the count opens, tap on the fold folds; fold 48 × 48; row 318 px wide of a 344 px area; line of steps of „Długi krok” 306 × 34 px | `page.tap`, bounding boxes | pass |
| Phone 360: no scroll to the side, no text over a frame, no control under 48 px — folded and with three trees open | measurement script | pass (all empty / false) |
| Phone layout at 1100 × 800: columns, measurement | computed grid, measurement script | pass (6 columns, all empty / false) |
| Postać still writes the same numbers after the refactor | #/postac/1, two trees opened, branch texts read | pass („Długi krok 0/3 — … · teraz 5 min → po kupnie 3 min · cena 1”, „Szybkie gojenie … teraz 0,05 zdrowia na minutę → po kupnie 0,1 zdrowia na minutę · cena 2”, „Ucisk … · cena 3”) |
| Console of every session | `playwright-cli console error` | pass (0 errors) |
| Side observation | — | the fold of the computer layout is a 28 × 23 px framed box with a small triangle, as on Postać; at 1280 × 720 „Wytwórz — ognisko” breaks into two lines in its 130 px column (the narrowest computer column), which the task's weak point foresaw; nothing else noticed |

What I did not check: Firefox and Edge (D-396: by hand, a session of their own); a real Android phone; the screen of an account knowing nothing (held by the unit tests, not opened in the browser); the trees of a game state reached by playing rather than composed. Nothing fell wrong, so nothing was corrected. No error outside the task's scope found.

## Screenshots (item 6; D-418, D-419)

Pushed by me with the owner's `gh` account to `mariusznazar/screenshots`, branch `loop2/wyglad-ekranu-wiedzy`, directory `loop2/wyglad-ekranu-wiedzy/`, commit `8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c`. I looked at each before pushing: only the made-up account of the start (the bar shows „Konto”, no address), no real name, address or password; the two old-Loop screenshots show the menu, a date and the screen, no personal datum.

| State | Link |
|---|---|
| Old Loop, 31 October: Wiedza with 26 known things, trees folded (`loop_13_wiedza.png`) | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/00-stary-loop-wiedza-26-rzeczy.png?raw=true |
| Old Loop, 31 October: Wiedza of a new game (`loop_02_wiedza.png`) | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/00-stary-loop-wiedza-nowa-gra.png?raw=true |
| loop2 before (base `a49c5f63`), 1600 × 1000: 26 known things, 9 trees folded | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/01-przed-1600-zwiniete.png?raw=true |
| loop2 before, 1600 × 1000: „Eksploracja”, „Zbieranie małych przedmiotów” and „Walka bronią jednoręczną” open | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/02-przed-1600-rozwiniete.png?raw=true |
| loop2 before, 360 px with touch, whole page: trees folded | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/03-przed-360-zwiniete.png?raw=true |
| loop2 before, 360 px with touch, whole page: the same three trees open | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/04-przed-360-rozwiniete.png?raw=true |
| loop2 after, 1600 × 1000: same state, trees folded, things in two columns | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/05-po-1600-zwiniete.png?raw=true |
| loop2 after, 1600 × 1000: the same three trees open — a branch with a number („Wprawne oko”, „Długi krok” with two last steps of 1 min), without one („Zwiad”, „Obchód”), four steps („Mocniejszy cios”) | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/06-po-1600-rozwiniete.png?raw=true |
| loop2 after, 360 px with touch, whole page: trees folded | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/07-po-360-zwiniete.png?raw=true |
| loop2 after, 360 px with touch, whole page: the same three trees open; „Mocniejszy cios” in two rows of steps | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/08-po-360-rozwiniete.png?raw=true |
| loop2 after, phone layout at 1100 × 800 (touch), top of the screen: things in six columns, trees folded | https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/09-po-1100-telefon.png?raw=true |

Judged against the styleguide and item 4: no scroll to the side and no text over a frame in any of them (measured, above); controls ≥ 48 × 48 in the phone layout (measured).

## Departures from the answers to questions 1–3 (item 7), within what was chosen

1. **The line of steps is a small table, not one run of text.** Each step stands as a piece of two lines: „I · 1 pkt” over „75 %” („bez gałęzi” over „70 %” first), in both layouts; the pieces wrap between steps on a phone. Why: in one line („bez gałęzi 70 % · I 75 % · 1 pkt · II …”) the small Roman „I” of Geist reads as a bar „|”, and value, numeral and price run together; as a column head over its value it reads as a numeral and the player compares the values along one line. Same words and same data as the answer; one line taller per numeric branch. The text of each piece in the page is still „I 75 % · 1 pkt”.
2. **„{n} gałęzi” in `text-secondary`, label size**, as the counters of the areas, rather than in the row's text colour — the count is a note beside the name (D-40).
3. **Columns of the Understanding: the least width is 12em (156 px at the body size), capped at half the area**, so the window of 1100 px in the phone layout gets 6 columns, not the estimated ~8. Why: at 9em (8 columns) „Wytwórz — ognisko” and „Zapal — ognisko” broke into two lines; at 12em no current name breaks there, and 18 actions still take 3 rows. The gap between an icon and its name went from 8 px to 4 px (`--space-xs`), so „Wytwórz — ognisko” fits the 142 px column of the 1600 px window.
4. The row of a tree takes no `highlight` under the pointer, as the row on Postać takes none.

No variant the human did not choose was used; no decision the task leaves unchanged was departed from.

## Choices, with the way rejected and the cost if wrong

- **`rankValue` shared in `character-skills.ts`** — rejected: a second copy of the formula in `knowledge-lines.ts`. Cost if wrong: none to the screens; one more export of that module.
- **Fold labelled by the tree's name alone** (as Postać), not „{nazwa} · {n} gałęzi” — the count stands visibly beside it. Cost if wrong: a screen reader says the count only when it reads the row.
- **Separator „ · ” between name and „{n} stopni” as a text node** of the head (role `text-label`), so the line reads „Wprawne oko · 3 stopnie”.
- **No move for the rule of size:** no touched function or file stands near D-425's thresholds (largest change: `knowledge-screen.tsx`, now three small components).
- Before shots taken in a separate worktree of `a49c5f63` with its own `.the-way` and `npm ci`, as the handoff gives.

## Problems and mismatches observed

- The task (*Context*) speaks of 8 trees and 14 branches and of three branches with no number („Obchód”, „Czysty płomień”, „Zwiad”); the code at the base has **9 trees and 18 branches** („Opatrywanie małych ran” with four), and **„Ucisk” also has no number** (no `preview`). D-416 now names all four („as „Obchód”, „Czysty płomień”, „Zwiad” and „Ucisk””); the styleguide's Bad names them too. D-416's *Rejected* already counted „nine trees and eighteen branches”.
- The task says the code stands at `97936c24`; at the base `a49c5f63` the code of Wiedza still matched the task's description (row as one button „▸ {nazwa} · {n} gałęzi”, one column of things), so nothing else differed.
- Row 5's *Goes to* reads „sentence of D-416” while *Decisions in play* places the word in *Rejected*; I followed *Decisions in play*.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/{SKILL.md,read.md,decide_entry.md}`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md` — named by `foundation_step.md` for writing a decision.
- `.the-way/product-guidelines/template.md` — to write the styleguide rule by the rule of its place (rows 2, 3, 6).
- `src/browser/view/character-trees.tsx`, `src/browser/character-screen.css` (lines 240–389) — the row of a tree on Postać, which the handoff names in words.
- `tests/view/character-screen.test.mjs` (lines 595–725) and `tests/view/account-screen.test.mjs` (lines 4185–4227) — tests touching the row of a tree.
- `src/browser/tokens.css` (names of tokens), `src/browser/styles.css` (`.screen-area`, `.icon-mask`, the phone block of `.button`), `src/browser/view/controls/react-button.tsx` (how `label` becomes `aria-label`), `src/browser/sim/data/actions.ts` (ids of actions), `.claude/skills/loop2-play/compose-state.mjs` — to build and measure.
- `foundations/invariants.md`: entries content-identifiers, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources, cross-part-imports, tracked-file-private-paths, tracked-file-private-names, function-and-file-size; `foundations/glossary.md`: character skill, Understanding, phone layout, computer layout; D-425 (thresholds of size).

## Working copies

All under `.runs\author\`, all removed before return:
- the worktree of the base, `.runs\author\base` (detached at `a49c5f63`, `.the-way` at `6ed3cb36`, `npm ci`) — removed by `git worktree remove --force`, then `git worktree prune`;
- the clone of `mariusznazar/screenshots`, `.runs\author\screenshots` — removed;
- the composing script, the composed states, the screenshots before upload, the measurement outputs and the logs of the test runs — removed with the directory `.runs\author`;
- the CLI's scripts in `.playwright-cli\` of the worktree and of the base — removed.
The databases of the local starts under `.runs\local-start\` are the product tool's own files and stay, as the skill gives.

## Left running

Nothing: every browser session closed (`playwright-cli list` — „no browsers”), both local starts stopped (`npm run local:stop` — „Local starts stopped: 1”, each time).

## Unread material

- `.runs/orchestrator/index.md`: read lines 1–602 of 761 (all decisions listed in full, and the first part of the list by heading alone); the rest of the headings list unread.
- Decisions named to be opened whole: read whole D-416 (with *Rationale* and *Rejected*), D-418, D-419, D-421, D-44, D-396; D-199 read to its *Verification* (first lines); D-280, D-282, D-40, D-43, D-42, D-39, D-47, D-48, D-200, D-379, D-291, D-274, D-275, D-276, D-279, D-38 read only as their binding sentences in the index (their *Verification*, *Rationale* and *Rejected* unread).
- the-way's glossary at the pinned commit: not read.
- The example decision WAY-03 of the-way: read its first part only.
- `.the-way/product-guidelines/styleguide/template.md` and `SKILL.md` (maintain-styleguide): not read; the rule was written by `.the-way/product-guidelines/template.md` and the form of the existing rule.
- `.claude/skills/loop2-scene-art/SKILL.md`: not read (no picture of the scene changed), as the handoff allows.

## Searches not found or unclear

- „Ucisk” missing from the task's list of branches with no number — found in the data with no `preview` (above).
- 9 trees / 18 branches in the data against 8 / 14 in the task (above).
- Row 5: *Goes to* „sentence of D-416” against *Decisions in play* „w *Rejected*” — unclear; followed *Decisions in play*.

## Report path

`.runs\task-cycles\wyglad-ekranu-wiedzy\reports\author-report.md`
