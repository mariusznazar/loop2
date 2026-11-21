done

# Correction 1 — the pick of actions at 390 px (make-change, "a correction for the human's remarks")

Base `921a4768eb6911f6816f29cefb0816edf8c354c5`; my commit `8591aa8297c4a2af33a39332abc4cb515cfb007f` on `task/model-czynnosci-i-przedmiotow`. The worktree is clean after it.

## The fault as fixed

The walker's fault: at 390 px the cells of the pick of actions are narrower than their text, and "Wytwórz" (and "Eksploruj", "Obchód", "Wytwórz — ognisko", "Zapal — ognisko") cross the frame.

Cause, verified in the running game (not a guess): `.button.pick-cell` was an `inline-grid` of two columns `auto minmax(0, 1fr)`, the icon in the first, the name in the second. In a 70 px cell the name column was 32.7 px (70 − 2 × 8 padding − 17 icon − 4 gap, read from `getComputedStyle(cell).gridTemplateColumns`), while "Eksploruj" needs 51 px and "Wędruj" 39 px (read with a Range). `minmax(0, 1fr)` lets the column shrink below the word, so the word ran out of the cell. The same happens in the Programy screen (my first measurement there, before any change: Eksploruj, Obchód, Wytwórz — ognisko, Zapal — ognisko, Odskocz and Wytwórz over), and in the screen of a map run it also happens in a window of 1074 to about 1200 px, where the program column is narrow (cell 62 px at 1074, 69 px at 1100; the walker measured only 390 and 1280).

Fix (`src/browser/styles.css`, `src/browser/view/controls/react-pick-cell.tsx`):

- the name stands in an element of its own, `<span class="pick-cell-name">`;
- the cell is an `inline-flex` that wraps (`flex-wrap: wrap`, `align-items: flex-start`, the same gap); the name has `flex: 1 1 min-content; min-width: 0`; the reason has `flex: 0 0 100%; min-width: 0`; the cell has `overflow-wrap: break-word`.

Behaviour: where the longest word of the name fits beside the icon, the icon stands beside the first line and the name wraps beside it (as before, the old comment's intent: the icon beside the first line; seen at 1280 px). Where the longest word does not fit beside the icon, the whole name drops under the icon and has the width of the cell, wrapping at its spaces. Where the word fits nowhere (a cell narrower than the word, or "wybierzesz" in the greyed cell's reason at 390 px), `break-word` breaks it inside the cell. Nothing says anything else: no text, colour, length, font or token value was added or changed; every length is a token (`var(--space-xs)`) or a keyword/`0`/`%`; `tokens.css` untouched.

Check that shows it (the narrow walk, Playwright CLI 0.1.22, `npm run local` at the HEAD plus the fix, made-up account at `example.test`, composed state: the sample state of the play skill with `craft`, `tend`, moss and bandage added to the Understanding so "Wytwórz" and "Opatrz" stand in the pick):

- before the fix, Programy screen at 390 px: 6 of the 14 cells over (`scrollWidth > clientWidth`: Eksploruj 80/70, Obchód 72/70, Wytwórz — ognisko 79/70, Zapal — ognisko 72/70, Odskocz 77/70, Wytwórz 77/70 — the greyed Obchód included in that state);
- after the fix, on both screens (Programy and the map run), the 14 visible cells of the pick: no cell over at 320, 390, 480, 720, 1074, 1100, 1180 and 1280 px (`cell.scrollWidth > cell.clientWidth` false for every cell, and no `.pick-cell-name` over its own box); the document is never wider than the window (`documentElement.scrollWidth == innerWidth` at each width);
- a first attempt, `overflow-wrap: anywhere` alone, removed every overflow but broke words in the middle of letters ("Eksplor/uj", "ogni/sko"): I looked at its screenshot and rejected it (below).

Screenshot of the pick at 390 px after the fix (the group "Wytwarzanie" with "Wytwórz" whole in its cell, "Żywność i walka" with "Opatrz"), looked at before the push; it shows the made-up game state only, no address, password or token:

- commit `053e06f9912f2fcc16ae90b9661943b7ba865591` in `mariusznazar/screenshots`, branch `loop2/model-czynnosci-i-przedmiotow`, file `loop2/model-czynnosci-i-przedmiotow/pick-of-actions-narrow-390-after-fix.png` (the push went `d809320..053e06f`);
- link: `![the pick of actions at 390 px after the fix: every cell holds its name, "Wytwórz" in the group "Wytwarzanie"](https://github.com/mariusznazar/screenshots/blob/053e06f9912f2fcc16ae90b9661943b7ba865591/loop2/model-czynnosci-i-przedmiotow/pick-of-actions-narrow-390-after-fix.png?raw=true)`.

## Files changed (commit `8591aa82`)

- `src/browser/styles.css` — the pick cell's rules (+19 −6 lines of the diff).
- `src/browser/view/controls/react-pick-cell.tsx` — the name in `<span className="pick-cell-name">` (+1 −1).
- `tests/view/shared-controls.test.mjs` — two new cases and one import (+53).
- `tests/view/rule-editor.test.mjs`, `tests/view/item-verb-panel.test.mjs` — the helper `nameOf` (+2 −4 each): see "Changed tests".

## Checks (command and exit code)

- Failing run first, with the fix taken out for a moment (the old `react-pick-cell.tsx` and the `overflow-wrap` line removed), `npm test -- tests/view/shared-controls.test.mjs` → exit 1, exactly the two new cases failing: "a pick cell holds its name in an element of its own…" (`expected ["icon-mask","pick-cell-name","pick-cell-reason"], got ["icon-mask","pick-cell-reason"]`) and "the stylesheets let the name of a pick cell wrap…" (`expected "break-word", got "normal"`). Both restored from copies before the commit.
- The same run of `npm test -- tests/view/rule-editor.test.mjs` with the new markup and the old `nameOf` helper → exit 1, 11 cases failed, all because the helper read the name as a text node of the cell (see "Changed tests").
- With the fix: `npm test -- tests/view/shared-controls.test.mjs` → 0 (52 of 52); `…/rule-editor.test.mjs` → 0 (76 of 76); `…/item-verb-panel.test.mjs` → 0 (6 of 6); `…/program-panel.test.mjs` → 0 (60 of 60); `npm test -- tests/invariants/test_browser_view_token_values.py` → 0 (4 tests); `npm test -- tests/invariants/test_browser_view_focus_outline.py` → 0 (3 tests).
- `npm run typecheck` → 0. `npx eslint` on the four changed TS/JS files → 0. `npx prettier --check` on the five changed files → 0. `node tests/quality/eslint-size-rules.mjs` → 0 functions and files over the threshold. `python -B .the-way/elements/common/foundation_check.py` → 0 (0 errors).
- Not run: `npm test` with no argument and any whole-folder run (the full gate is the orchestrator's); the instruction-files check (`check_instructions.py`) — a change of a stylesheet, a component and tests touches no instruction file; the kitchen-sink page was built by `npm run build` only if the build includes it — I did not open it in a browser (the page draws `ReactPickCell`, so it follows the component).

## Own-work check (section 3)

The requirement most likely unmet: "no cell of the pick crosses its border at 390 px, and none at 1280 px, without changing what a cell says". Check: the measurement above on both screens at eight widths; a screenshot at 1280 px of the map-run editor (cells 114 px, icon beside the first line, names wrapped beside it, no change of text); a screenshot at 390 px of Programy with the greyed "Obchód" and its reason (I added the `greyed` class and the reason element to the cell in the page by hand, because that state is not reachable with the run open; the cell measured 70/70, nothing over). It showed one thing left: in the greyed cell the reason's word "wybierzesz" (about 58 px) is wider than the cell's inner width (54 px) and breaks as "wybierze/sz" (the cell stays inside its frame; the alternative is a cell wider than 70 px, not possible in four columns at 390 px).

Mutations considered: the span dropped → the first new case fails (seen); `overflow-wrap` or `flex-wrap` removed/overridden → the second new case fails (seen for `overflow-wrap`); `min-width: 0` removed from the name → the second case fails on `minWidth`; the order icon–name–reason changed → the first case fails; the name's basis `min-content` changed to `auto` is NOT caught by any test (jsdom does not resolve `flex` shorthand with `min-content` reliably, so I did not assert it; the effect — a long name no longer dropping under the icon — is seen only in a browser, as the narrow walk did).

## Changed tests (cause named)

The helper `nameOf` of `tests/view/rule-editor.test.mjs` and of `tests/view/item-verb-panel.test.mjs` read a cell's name as the text nodes that are direct children of the button. The requirement of this correction needs the name in its own element, so a bare text node no longer exists; the helper now reads `.pick-cell-name`. Nothing was weakened: the same equalities on the same names run on the same cells (76 and 6 cases pass). `program-panel.test.mjs` reads `textContent`, so it was not touched.

## Choices, with the way rejected

1. Flex row with the name in its own element and `break-word`. Rejected: `overflow-wrap: anywhere` on the old grid cell (the smallest change): it removes the overflow but the name column stays 33 px wide, so words break in letters everywhere ("Eksplor/uj", "Wędr/uj", "ogni/sko", "patyk/ów"), which does not "look right"; cost of mine if wrong: the DOM of the pick cell gained one element and two test helpers changed. Rejected: tracks that grow to the text (`minmax(min-content, 1fr)`): in four columns at 390 px the sum of the widest words exceeds the grid (298 px) in some sections, so the grid would cross the panel's frame; its result depends on the names. Rejected: three columns in a narrow window: needs `columnsOf` in `rule-panel.tsx` to follow the layout (the arrows of the keyboard move by that number) and a changed threshold by viewport, while the narrow program column also appears at 1074 to 1200 px; a change of the keyboard's geometry is beyond "as small as it asks". Rejected: an `@media` rule that puts the icon above the name below a window width: the cells are narrow also in a 1074 px window, a window threshold does not follow the cell. Rejected: smaller padding in the cell: needs 10 px more for "Obchód", and changes the look at every width.
2. `break-word`, not `anywhere`, on the cell: `anywhere` makes the min-content of the name one letter, so the word would always stay beside the icon and break instead of dropping under it. Cost if wrong: none seen; the second new case asserts `break-word`.
3. The second new case reads the computed style of the real stylesheets in jsdom (as `tests/view/run-header.test.mjs` does for the clock). It guards the fault coming back (a stylesheet change); it does not prove the layout, which only the browser shows (testing guideline "Not tested on purpose": layout is looked at in the browser). A deliberate later change of the mechanism (for instance to `anywhere`) would fail it and need a rewrite: accepted.

## Reaches beyond the handoff

- `guidelines/styleguide-browser-view.md` read whole, as the handoff said (in two reads, lines 1–601 and 602–1217); `guidelines/testing.md` read whole in three reads (the table of the trust boundaries read at once, not word by word); `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md` whole.
- Decisions read: D-288 (whole), D-289 (whole), D-290 (whole), D-291 (whole). Not read: D-293, D-306, D-363, D-425, D-43 as entries (I used the styleguide's text of the token rule "No value in place of a design token", which carries D-43, and the size rule's `eslint-size-rules.mjs` result); the invariants `browser-view-token-values` and `browser-view-focus-outline` were checked by their tests (both pass), not read as entries.
- `src/browser/sim/understanding.ts` (lines 90–250) and `src/browser/sim/data/revelations.ts`, `actions.ts`, `items.ts` (searches) to compose the state with "Wytwórz" and "Opatrz" in the pick: a reach to build the check, not to change those files.
- `tests/view/game-stylesheets.mjs` (first 60 lines) and `tests/view/run-header.test.mjs` (lines 425–470) for the way a case reads the stylesheets.
- `the author's global rules for scripts` and `.ai\rules\git.md` (the user's own instructions) before the scripts and the commit.

## Unread material

- `guidelines/testing.md` lines 159–249: the table of trust boundaries (about 90 rows of server and account rows) was read through, but not checked line by line against my change, which touches none of them.
- Decisions D-293, D-306, D-363, D-425 and the two invariants as entries (see above).
- The whole of `src/browser/view/program-editor.ts` and `src/browser/view/item-target-pick.ts`: not read; they feed the cells' labels and times, which this change does not touch.
- `tests/view/program-editor.test.mjs`: not read and not run; it holds no `.pick-cell` selector (grep of the tests for `pick-cell` lists five files, none of them this one).

## Searches not found or unclear

- none.

(Observations, not findings of this correction: Home and End do nothing in the pick and the walker's observation of a fourth rule without a chronicle line are left as the walker left them; I did not look at them.)

## Working copies

- `.runs/fixer/` (the composed state `state.json`, `compose-fix.mjs`, `send-state.js`, `measure*.js`, the logs of my runs, the clone `.runs/fixer/screenshots` of `mariusznazar/screenshots`, the screenshots as the tool wrote them): stood directly under `.runs/` of the worktree; removed with `rm -rf` by its full path. The pushed commit holds the shown screenshot.
- `.playwright-cli/` in the worktree root (the tool's own working files): removed. The browser was closed (`playwright-cli close`) and `npm run local:stop` said "Local starts stopped: 1" (WAY-319). `.runs/local-start/` is the product's own file and stays, as the play skill says. No image stays in the repository of loop2; `git status --short` prints nothing.
