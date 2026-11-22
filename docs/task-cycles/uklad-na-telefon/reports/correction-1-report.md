done with concerns

# Report - correction 1, the human's remarks 1, 2 and 8

## Commits

- `22b35b42` docs: :memo: take out of D-396's rejected ways the two that no human weighed, a link held to the minimum inside a sentence and the exception of WCAG 2.5.8
- `6468d9fc` fix: :bug: make a tap anywhere on a rule's row or a group's header outside its buttons open it in the phone layout, drop the background a tap leaves on the rows of the rules, „Teraz”, „Potem” and the lists of maps and programs, and break the reason of a greyed pick cell only between words (D-396, D-40)

- `6381c4f1` fix: :bug: cover a rule's row and a group's header outside their buttons in the phone layout, so a finger's tap at the free end of the text line opens the line instead of deleting or folding it, and open the line on a tap or a click on its handle (D-306, D-296) — the fix of the review's findings I-1 and I-2, section „Fix of the review's findings” at the end.

Not pushed. Each commit added by path.

## Files changed (added / removed lines)

- `foundations/decisions.md` +1 -1 (D-396, *Rejected*)
- `src/browser/view/rule-list.tsx` +139 -89 (most of it the re-indentation of the row's and the header's text into the new element; Prettier-formatted)
- `src/browser/view/rule-panel.tsx` +23 -3
- `src/browser/program-panel.css` +54 -4
- `src/browser/programs-screen.css` +12 -0
- `src/browser/maps-screen.css` +12 -0
- `src/browser/run-screen.css` +13 -0
- `src/browser/styles.css` +6 -0
- `guidelines/styleguide-browser-view.md` +10 -6
- `tests/view/rule-editor.test.mjs` +54 -0
- `tests/view/shared-controls.test.mjs` +27 -0

## Each remark, as made, and how

### Remark 1 (fix part) — a tap anywhere on a rule's row outside its buttons opens the rule

What a player sees, before: at 360 px a tap at the middle of a rule's row moved the rule up (the „↑” of the row took the tap), and on the first rule or the first group, whose „↑” is off, the tap did nothing at all. Measured in Chromium at 360 × 740 with touch (`page.touchscreen.tap`, and a second, fat-finger tap of radius 16 px sent through `Input.dispatchTouchEvent`), with a listener that only records which element the click reaches:

- rule rows: the centre went to „W górę” on every row but the first (first row: no click, its „↑” is disabled), with both radii; a tap on the text and on the bare strip 20 px from the buttons opened the row.
- group headers: the centre went to „Grupa w górę” (first group: nothing); with the fat finger even a tap on the header's text went to „Grupa w górę” or „Grupa w dół”, because the header's text stands right above its four buttons.
- „Teraz” and „Potem”: every tap (centre, start, end, both radii) reached the row. They hold no button, so the fault does not exist there; nothing changed for them in this remark.

Cause, as I verified it in the page: two things together. (1) Geometry: at 360 px the buttons wrap onto a line of their own, right-aligned, and „↑” begins 3 px right of the row's middle. (2) Chromium's touch adjustment gives a tap whose area touches a button to the button and passes over the row: the row is an ancestor of the button, and adjustment prefers the innermost element that takes clicks. I tried in the page itself, by changing its DOM, three ways before writing code:

| Way tried (in the live page) | centre | text (fat finger) | strip |
|---|---|---|---|
| none (as it was) | button | button on headers and on rows whose text is over the arrows | row |
| buttons split: arrows at the left, the rest at the right, on a line of their own | row | button (text right above the arrows) | row |
| text in an element of its own that takes clicks, buttons as before | button | row | row |
| both | row | row | row (also 20 px from a button, fat finger) |

So the change does both:

- `rule-list.tsx`: the text of a row and of a header (handle, number, condition, action, reason, time, count; name, condition, size, count) stands in `<span class="rule-list-body">` (component `RowText`) with its own click handler that opens the rule or the group; the row's own handler opens it only for a click on the bare row (`clickedBare`), so one click asks once. The arrows of a row and of a header stand together in `<span class="rule-list-arrows">`, before „Usuń” (row) or „▾” and „✕” (header).
- `program-panel.css`: `.rule-list-body { display: contents }` and `.rule-list-arrows { display: inline-flex; gap: var(--space-xs) }` in both layouts, so the computer layout draws exactly as before (pixel-identical, below). In the phone block `@media (width < 1280px)`: `.rule-list-controls { flex-basis: 100%; margin-left: 0 }` and `.rule-list-arrows { margin-right: auto }` — the buttons on a line of their own, the arrows at its left and the other buttons at its right, so the middle of the row is bare row. Each button keeps 48 × 48 px.

After, at 360 × 740 with touch, Programy and the screen of a map run, every rule row and every group header (9 lines on each screen), both radii: centre, start of the text, middle of the text, middle of the bare strip and the strip 20 px from the next button all reached the row. Then with real taps (nothing stopped), `page.touchscreen.tap`: on rule 2, rule 6 and the header „Jedzenie”, a tap at the centre, on the text and on the strip each opened that rule or group, the order of rules and groups unchanged; „↓” of rule 2 moved it down (1,3,2,…) and „↑” back; „Grupa w dół” of group 2 moved it down and „Grupa w górę” back. At 1100 × 800 with touch the same probe reached the row everywhere (first four lines shown). Measurement of loop2-play at 360 on Programy: no side scroll, `contentWiderThanItsBox` and `outsideTheWindow` empty, `controlsSmallerThan48` empty.

Test (what jsdom can hold): `tests/view/rule-editor.test.mjs` gains

- „the text of a row and of a header stands in an element of its own that takes a click and holds no button, and the arrows stand together before the other buttons” — the children of a row and a header are `rule-list-body` then `rule-list-controls`, the body holds no button and holds the condition, the body has a click listener of its own (`onclick` is a function: React gives an element with `onClick` an empty listener of its own, and that listener is what Chromium's adjustment sees), and the controls are `[["↑","↓"], "Usuń"]` and `[["↑","↓"], "▾", "✕"]`. Cites D-396 „In the phone layout every screen fits … and everything the game offers is done by touch.”. Seen failing before the code (run below), passing after.
- „a click on the bare row or header, outside its text and buttons, asks once to open it” — guards the split of the click between the row and its text (a double or a missing open). It passed before the code too: it holds behaviour the change could break, not new behaviour. Cites D-306 and D-296.

What only the browser check can hold: where the buttons stand in the phone layout (the phone block is not applied by jsdom), and which element Chromium's touch adjustment gives a tap. No assertion was written on layout.

Computer layout at 1280 × 720 (a session with no touch, the same composed state put back before each take): screenshots before and after of Programy, Programy with a rule under the mouse, Programy with the pick of „Czynność” open, the screen of a map run, and that screen with the pick open — compared pixel by pixel: all five identical.

### Remark 2a — the lighter background left after a tap

What a player sees, before (360 × 740, touch, `(hover: none)` true): after a tap on „↓” of rule 2 the row stayed on `highlight` (`rgb(39, 39, 42)`, `:hover`, not open) — it looked like the chosen rule; after a tap on a program of the list, the program stayed highlighted; on the screen of a map run, after a tap on the handle of a plain row the row stayed highlighted, and after a tap on „Teraz” „Teraz” stayed highlighted.

How: a block `@media (width < 1280px) and (hover: none)` in each screen's own stylesheet (D-421), as slice 19's block in `styles.css`:

- `program-panel.css`: `.rule-list-header:hover:not(.open)` and `.rule-list-row:hover:not(.open):not(.winning):not(.running)` → `background: transparent`. The narrower selector leaves the open row on `highlight` and the row that wins or runs on `rule-winning` / `rule-running`.
- `programs-screen.css`: `.program-list-item:hover`; `maps-screen.css`: `.maps-list-item:hover`; `run-screen.css`: `.now-row[tabindex]:hover, .next-row[tabindex]:hover`.

After, same session: the tapped rule row `rgba(0,0,0,0)` with `:hover`; the tapped program and the tapped map transparent with `:hover` (the picked map keeps its bar `rgb(212,212,216)`); the tapped „Teraz” transparent; the winning row tapped on its handle kept `rgb(21, 42, 38)` (`--rule-winning`) with `:hover`; the open row `rgb(39, 39, 42)` with `:hover`; a row given the class `running` by hand in the DOM while under the sticky `:hover` read `rgb(21, 42, 55)` = `--rule-running` `#152a37` (no running row came up in the composed run, so this one state was made in the DOM, not reached by play).

How `(hover: none)` was switched: not by `Emulation.setEmulatedMedia`; the phone session of `.playwright/cli.phone.config.json` (`hasTouch`, `isMobile`) reports `(hover: none)` true, and a new session with the ordinary config reports it false. With the mouse: at 1280 × 720 the row under the mouse is pixel-identical to before (screenshot comparison above); the same no-touch session resized to 360 × 740 (`(width < 1280px)` true, `(hover: none)` false): a rule row, a header, „Teraz”, a program and a map under the mouse each read `rgb(39, 39, 42)`.

No test: jsdom has no hover and does not apply the phone block.

### Remark 2b — „gałąź niewykupiona” breaking inside a word at 360 px

Measured before at 360 × 740 on the screen of a map run (a second character who has not bought „Obchód”): the cell 70 px wide, 52 px of content, and the word „niewykupiona” is 76.1 px wide at the detail size (12 px Geist), so it broke inside the word. No setting of the reason alone can keep that word whole inside a 70 px cell: even with no padding the content is 68 px; four cells of 76 px do not fit the 292 px grid at all. So the reason's rule alone is not enough, and the grid changes in the phone layout:

- `styles.css`: `.pick-cell-reason { overflow-wrap: normal }` — the reason breaks only at spaces (it inherited `break-word` from the cell); the name keeps `break-word`.
- `program-panel.css`, phone block: `.rule-panel-cells { grid-template-columns: repeat(2, minmax(0, 1fr)) }` — every pick in two columns, as the conditions already stand (D-290). A cell is then 144 px, 126 px of content.
- `rule-panel.tsx`: the arrow keys of the pick count the columns the grid draws (`drawnColumns`: the column tracks the browser gives in px), falling back to `columnsOf` (4, conditions 2) where no tracks in px are given, as in jsdom. Without this a keyboard in a narrow window would jump two lines at „↓” (slice 18's reason for keeping four columns).

After, 360 × 740: „gałąź niewykupiona” on one line, `scrollWidth` 126 = `clientWidth` 126, cell 142 = 142, no word broken; the names stay inside their cells (screenshot looked at; „Wytwórz — ognisko (6 patyków)” on three lines in its cell); computed `grid-template-columns` `144px 144px`; keys from „Eksploruj”: ArrowDown → „Idź” (line below), ArrowDown → „Zbierz” (next section, same column), ArrowRight → „Obchód”, ArrowUp → „Idź”. Measurement of the screen of a map run with the pick open: no side scroll, `controlsSmallerThan48` empty; `contentWiderThanItsBox` lists `div.world-area` 330 > 318, `div.scene` 339 > 336, `div.scene-sheet` 256 > 64 and `outsideTheWindow` an `img` — the scene's crop, slice 19's, present before. At 1280 the reason wraps between words in a 114 px cell, as before (screenshot identical).

Test: `tests/view/shared-controls.test.mjs` gains „the stylesheets let the reason of a greyed pick cell break only between its words” — reads, through the real stylesheets, `overflow-wrap` and `word-break` of `.pick-cell-reason` as `normal`. jsdom inherits `overflow-wrap`, so it read `break-word` before the fix: seen failing for that reason. No decision line: no decision says the reason breaks only between words (the requirement is the human's remark); the guidelines put a requirement a test needs into the foundation first, so the line is left out, and see concern 3. The two-column grid and the keys of the phone layout are not testable in jsdom (no layout, no phone block); the browser check holds them.

### Remark 8 — D-396's *Rejected*

Through the decisions skill read as a file (`task-cycle/skill/foundation_step.md`, `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`, `examples.md` and WAY-03): removed from *Rejected* of D-396 „every link held to the minimum, inside a running sentence too — the line of text breaks” and „a link inside a sentence left out of the minimum by the exception of WCAG 2.5.8 for a target in a sentence — D-42 keeps four criteria …”. The ways of the projected entry and of rows 5 and 6 stay, the rationale keeps the reason for the exemption, the binding sentences are unchanged. The entry stays marked as the cycle wrote it. Meaning (EN): the decision now lists as rejected only the ways a human weighed. (PL): decyzja wymienia jako odrzucone tylko warianty, które rozważył człowiek.

Search of the sentences that bear on it (`2\.5\.8|inside a running sentence too|inside a sentence left out|exception of WCAG` over the repository outside `.runs/`): one hit, D-396 itself, before the edit. The styleguide's rule (`guidelines/styleguide-browser-view.md`, „Odnośnik wewnątrz toczącego się zdania …”) gives the reason (a 48 px target breaks the line), not the removed ways; loop2-play says „D-396 exempts it”, which D-396's binding sentence still does. Neither changed.

### Sentences brought to the code (item 4 of the handoff)

- `guidelines/styleguide-browser-view.md`, rule „Two layouts and one threshold between them”, the bullet on `hover: none`: it spoke of one block for the controls; it now says the blocks stand in each element's stylesheet, reach the rows of the rule list, „Teraz”, „Potem” and the lists of maps and programs, and leave the open row on `highlight` and the winning or running row on its background.
- Comments: `program-panel.css` (the pick's four columns now said of the computer layout; the phone block says why the buttons and the pick are laid out as they are), `rule-panel.tsx` (`columnsOf` says the computer layout).

## Checks (command, exit code)

- `npm test -- tests/view/rule-editor.test.mjs` exit 1 before the code (the new structure case failed; 1 failure), exit 0 after (82 pass), and again after Prettier (82 pass).
- `npm test -- tests/view/shared-controls.test.mjs` exit 1 before the stylesheet fix (`expected "normal", got "break-word"`), exit 0 after (54 pass), again 54 pass.
- `npm test -- tests/view/rule-signs.test.mjs` exit 0 (6); `tests/view/item-verb-panel.test.mjs` exit 0 (6); `tests/view/run-screen.test.mjs` exit 0 (25); `tests/view/maps-screen.test.mjs` exit 0 (50); `tests/view/character-screen.test.mjs` exit 0 (15); `tests/view/run-header.test.mjs` exit 0 (24); `tests/view/scene.test.mjs` exit 0 (74); `tests/view/world-area.test.mjs` exit 0 (24) — the files that read the changed stylesheets or draw the rule list.
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4); `npm test -- tests/invariants/test_browser_view_focus_outline.py` exit 0 (3).
- `npm test -- tests/quality/test_function_and_file_size.py` exit 0 (2).
- `npm test -- tests/quality/test_quality_invariants.py` exit 1 (Prettier: `src/browser/view/rule-list.tsx` not formatted), then, after `prettier --write` of that file, exit 0 (8). Both runs named: the failure was mine, a formatting of my edit.
- `python -B .the-way/elements/common/foundation_check.py` exit 0, „0 errors” (after the D-396 edit and again after the fix commit's changes).
- `python -B .the-way/instruction-files/check_instructions.py` exit 0, 0 error, 134 warn, 7 info.
- Not run: `npm test` with no argument (the boundary; CI is the gate); `tests/agent_workflow/test_loop2_play_skill.py` (the skill was not touched).

## Own-work check

Requirement most likely unmet: „a tap anywhere on a rule's row outside its buttons opens the rule” on a real phone, where a finger's area is larger than Playwright's tap. Check: every row and header of both screens tapped at five points with a tap of radius 16 px as well as the plain tap, recording where the click lands (results above: all on the row), then real taps opening the rows. What it showed: after the change all points reach the row; before, the centre and, with the fat finger, the headers' text reached a button. Not proven: Chrome on a real Android phone, whose adjustment area may differ from Chromium's here.

## Where checked

Chromium of Playwright CLI 0.1.22, `npm run local` on this computer (win32): before at `https://127.0.0.1:52782`, after at `https://127.0.0.1:64060`, an account at `example.test`, the composed state of loop2-play's `compose-state.mjs` with a second character without the branch „Obchód” and a program of three groups and six rules (copies of the scripts in my working directory). Phone: `.playwright/cli.phone.config.json` (360 × 740, `hasTouch`, `isMobile`), taps by `page.touchscreen.tap` / `locator.tap()` and `Input.dispatchTouchEvent`. Computer: the ordinary config, 1280 × 720, no touch, and the same session resized to 360 × 740 for the mouse in the phone layout. Firefox, Edge and a real phone: not checked (D-396 puts those by hand / after the merge).

## Choices, with the way rejected and the cost if wrong

- Both a text element that takes clicks and the split of the buttons; rejected: the split alone (a fat finger on the text above the arrows still moves the rule), the text element alone (the middle of the row still hits „↑”), a larger gap between the text and the buttons (rows taller by about 16 px each and still bound to one finger size). Cost if wrong: two click handlers on a row to read together.
- The text element is a responder because React gives an element with `onClick` an empty `onclick` listener of its own (React 19.3.1 does, `react-dom-client`); rejected: `tabIndex={-1}` on the text (a tap would focus the text instead of the row and Enter would no longer open it), a listener added through a ref (outside React's events, against D-267's way). Cost if wrong: a later React that drops that listener brings the fault of the text back; the new test fails then (`onclick` is a function).
- In the phone layout the buttons always take a line of their own, arrows left, the rest right; rejected: the buttons beside the text where they fit (from about 600 px up the row's middle is then text or bare row, but CSS cannot tell a wrapped line from a fitting one, and growing the buttons' group to fill the line puts the arrows at the middle again). Cost: at 720–1279 px every rule row and header is two lines (screenshot at 1100 looked at); the human may find the narrow window of a computer less dense.
- Arrows at the left, „Usuń” / „▾ ✕” at the right; rejected: the destructive button at the left. Cost if wrong: the side of a thumb; a swap of one rule.
- Two columns for every pick in the phone layout and keys reading the drawn grid; rejected: three columns (the content 76.7 px against the word's 76.1 px — no margin), a smaller cell padding (68 px at most with four columns), the keys left at four (a keyboard in a narrow window would skip a line). Cost: the pick is longer on a phone (each cell ≥ 48 px, fewer lines of name per cell); `rule-panel.tsx` changed, a file outside the handoff's list (see concerns).
- The hover reset in each screen's own stylesheet, by narrower selectors (`:not(.open)…`), as the handoff gives; rejected: moving the hover rules under `(hover: hover)` (a larger diff that rewrites the computer layout's rules).

## Concerns

1. `src/browser/view/rule-panel.tsx` is outside the files the handoff names. Remark 2b cannot be met by `styles.css` alone (the measurement above), and the grid's change needs the keys to follow it. If the orchestrator prefers, the alternative is to keep four columns and accept the reason crossing or breaking — which the remark rules out.
2. Every rule row and group header of the phone layout is two lines also at 720–1279 px, where the buttons used to stand beside the text.
3. No foundation entry or styleguide rule says that a tap anywhere on a row outside its buttons opens it, that the buttons stay away from the row's middle, or that a greyed reason breaks only between words; tasks 12 and 17–21 will design rows of their own. I did not write one (item 4 of the handoff covers sentences made false only). The return step may want a sentence in the styleguide's rule „Everything is done by touch, and every control holds the touch target”, through `the-way-maintain-styleguide`.
4. The `running` background under a sticky `:hover` was checked with the class set by hand in the DOM, not with a running rule reached by play.
5. Chromium's touch adjustment on a real phone may use a larger area than radius 16; the row's middle is now about 50 px from the nearest button at 360 px.

## Walk

A correction reports no walk (method, section 6).

## Reaches beyond the dispatch

- `src/browser/view/rule-panel.tsx` lines 95–165 and 330–440 (`columnsOf`, `cellAfterKey`, `PickGrid`): to find how the keys move by columns, for remark 2b.
- `src/browser/sim/types.ts` (types `Condition`, `Action`, `ProgramRule`, `RuleGroup`): to compose a state with a program.
- `node_modules/react-dom/cjs/react-dom-client.production.js` (search for `onclick = noop`): to confirm that React 19 gives an element with `onClick` a listener of its own.
- `tests/view/rule-editor.test.mjs` lines 1–175 and 324–403, `tests/view/shared-controls.test.mjs` lines 1–110 and 820–880: the helpers and the neighbouring cases, before writing the new ones.
- `.the-way/foundations/decisions.md` WAY-03, as `elements/decisions/examples.md` names it.

## Working copies

- `.runs/correction-1/` of the worktree (the composed states, the scripts that composed and checked them, the probe outputs, the screenshots before and after, the logs of the two local starts): removed after this report was written.
- `.playwright-cli/` of the worktree (the CLI's own files and my probe scripts copied there for `run-code --filename`): removed.
- A stray copy: the first "before" screenshots went to `.runs/correction-1/before` (a Git Bash path read by Node on Windows); moved into `.runs/correction-1/before/` and the stray tree removed (it held only those files).
- The two local starts ended (`npm run local:stop`, 1 stopped each time); their databases stay under `.runs/local-start/`, which the next start removes. No screenshot was shown to the human or pushed.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (in three parts).
- `guidelines/testing.md`: read whole (two parts).
- The plan: only *Choices*, as the handoff names; `slice-15-report.md` only the passages found by search for the tap fault (lines 64–101, 135–199 by search); `slice-11-report.md` not read (the handoff names it for where the pick cell's rule came from, which the code showed); `fix-whole-report.md` lines 120–169 and the search hits on `hover`.
- `src/browser/view/program-list.tsx` and `src/browser/view/maps-screen.tsx`: only the lines found by search for their classes (the rows' rules stand in the stylesheets, which I read whole: `program-panel.css`, `programs-screen.css`, `maps-screen.css`); `src/browser/styles.css` lines 380–630 and the search hits for `hover`, `@media`, `pick-cell`; `src/browser/run-screen.css` lines 515–625 and the search hits.

## Searches not found or unclear

- „gałąź niewykupiona” did not show with the composed state of loop2-play (its character has bought „Obchód”); a second character without the branch was composed for it.
- A PNG decoder for Node in the repository's dependencies: not found; the screenshots were compared with Pillow of the system's Python.
- No running rule (`rule-running`) came up in the composed map run; checked by a class set in the DOM.

## Fix of the review's findings (I-1, I-2)

Status of this fix: done with concerns. Commit `6381c4f1`, on head `9fee9680`, not pushed, added by path. Files: `src/browser/view/rule-list.tsx` +45 -9, `src/browser/program-panel.css` +41 -6, `tests/view/rule-editor.test.mjs` +53 -25, `guidelines/styleguide-browser-view.md` +14 -5, `foundations/decisions.md` +5 -4.

### I-1 — a finger's tap on the free end of the text line deleted or folded

What a player saw: at 360 px a finger tapping the empty right end of a rule's first line, or of a header's first line, deleted the rule, deleted or folded the group above, without a question. My first report's claim that every point of the row reached the row was wrong: my probe checked the strip on the line of the buttons, and never the free end of the text line above „Usuń” and „✕”. I reproduced the finding with a grid before the fix (rule 2 on Programy, 484 points every 8 px over the row's box, contacts of radius 10, 16 and 24 px through `Input.dispatchTouchEvent`, a capturing click listener recording where each click lands and stopping it). At least 35 points outside the buttons went to a button at every radius, and most of them went to „Usuń” (only the first 40 wrong points were listed at r16 and r24).

Cause, as the reviewer read it and my trial confirmed: Chromium's touch adjustment skips the row, because the row holds the buttons, so on any bare part of the row near a button the button wins. The text element of `display: contents` covered only the glyphs.

The fix follows the ruling: no point of a row or a header outside the buttons' own boxes is bare row. I first tried it in the live page by changing the page's DOM and CSS, then wrote it in the code:

- `rule-list.tsx`: a component `Gap`, an empty `<span class="rule-list-gap">` with its own click handler that opens the line, holding no button, `aria-hidden`. The row's controls are now `[gap][arrows: ↑ gap ↓][spacer]Usuń`, and the header's `[gap][arrows: ↑ gap ↓][spacer]▾ gap ✕`; the spacer is a `Gap` with the class `rule-list-spacer`. The row's own click handler (`clickedBare`) passes over a click on the text or on a gap, so one click asks once.
- `program-panel.css`, both layouts: `.rule-list-gap { display: none }`, so the computer layout draws them not at all. Phone block:
  - the row and the header lose their padding and row gap;
  - `.rule-list-body` becomes a box `display: flex; flex-wrap: wrap; flex-basis: 100%`, with the row's former padding as its own (`var(--space-2xs) var(--space-xs) var(--space-xs)`), so the text's box runs to the right end of the first line and covers the space above the buttons;
  - `.rule-list-controls` and `.rule-list-arrows` have `gap: 0`;
  - `.rule-list-gap` is drawn 4 px wide (`var(--space-xs)`), stretched to the line's height, and `.rule-list-spacer` takes the rest of the line.

  The buttons keep 48 × 48 px and their places, so the look stands as before. I looked at a screenshot at 360. Measurement of loop2-play: no side scroll, the lists empty, `controlsSmallerThan48` empty.

Grid after the fix, 360 × 740 with touch: every 8 px over the whole box, the four corners added, contacts of radius 10, 16 and 24 px. Lines: Programy — rule 2 (484 points), rule 4 = the first rule of the group „Jedzenie” (364), the header „Jedzenie” (364); the screen of a map run — the same three (604, 484, 484).

| Line | radius | outside the buttons | to a button | to another line | inside the buttons | opened the line instead |
|---|---|---|---|---|---|---|
| Programy rule 2 | 10 / 16 / 24 | 375 | 0 / 0 / 0 | 1 / 1 / 1 | 109 | 13 / 23 / 23 |
| Programy first rule (4) | 10 / 16 / 24 | 255 | 0 / 0 / 0 | 1 / 1 / 1 | 109 | 16 / 33 / 33 |
| Programy header „Jedzenie” | 10 / 16 / 24 | 219 | 0 / 0 / 0 | 0 / 1 / 1 | 145 | 26 / 55 / 55 |
| map run rule 2 | 10 / 16 / 24 | 495 | 0 / 0 / 0 | 1 / 2 / 2 | 109 | 12 / 22 / 22 |
| map run first rule (4) | 10 / 16 / 24 | 375 | 0 / 0 / 0 | 1 / 1 / 1 | 109 | 13 / 21 / 21 |
| map run header „Jedzenie” | 10 / 16 / 24 | 339 | 0 / 0 / 0 | 0 / 1 / 1 | 145 | 24 / 36 / 36 |

How to read it:

- **To a button:** no point outside a button's box reached a button, of this line, of another row or of the header above, at any radius.
- **To another line:** these points are the corners of the box at the left bar (x 22, 1 px inside the top or bottom edge) and one point 3 px above the bottom edge (map run rule 2, (134,425) at r16 and r24). They reached the text of the next or previous line, which opens that line; none reached a button. At r10 the corner point is counted twice in my output, because the added corner repeats a grid point.
- **Opened the line instead:** a tap whose centre lies inside a button but at its edge opened the line instead of pressing the button — the safe direction, nothing changes. Where:
  - the top row of points, 1 px inside the top edge, at r16 and r24;
  - 3–7 px inside a side edge that has a gap beside it;
  - up to 6 px inside the bottom edge, where the next line's text begins and opens that line.

  Deeper inside, every tap pressed its button.

So the third condition of the ruling holds only away from the buttons' edges. I did not move the buttons farther apart: no point outside a button reaches a button, so no tap meant for the row reaches „Usuń” or „✕”. The leftover band is a tap that opens instead of acting. The raw grids are summarised here; the files were working copies and are removed.

Real taps with no listener (`page.touchscreen.tap`), Programy at 360 px. On rule 2, rule 4 and the header „Jedzenie”, a tap at the centre, at the free right end of the text line (6 px from its end), on the strip 6 px left of „Usuń” or „▾” and on the handle each opened that line, with the order of rules and groups unchanged and no group folded. Then:

- „↓” and „↑” of rule 2 moved it down and back;
- „Grupa w dół” and „Grupa w górę” moved group 2 down and back;
- „Zwiń grupę” folded group 2 and „Rozwiń grupę” unfolded it.

### I-2 — the handle opened nothing

`clickedBody` excludes only buttons now; the handle is part of the text, so a tap or a click on it opens the line. A drag by the handle gives no click, so the drag stays.

Searched for a reason against it: no decision, no test and no styleguide sentence makes the handle an exception (a search of `foundations/`, `guidelines/` and `src/browser/` for a click or a tap near „handle”, and of `tests/view/rule-editor.test.mjs` for `drag-handle`: the hits are drags only).

Browser checks:

- at 360 with touch, a tap on the handle of rule 2, rule 4 and the header „Jedzenie” opened each (above);
- at 1280 × 720 with the mouse (no touch, `(hover: none)` false), a click on the handle of rule 2 with no move opened rule 2, and one on the handle of group 2 opened the group;
- dragging rule 1 by its handle onto rule 3 moved it (order 1,2,3 → 2,3,1) and opened nothing;
- dragging group 3 by its handle onto the header of group 1 moved it first (Program,Jedzenie,Grupa3 → Grupa3,Program,Jedzenie);
- the row under the mouse still on `highlight`.

Computer layout: the gaps draw no box at 1280 (0 of 30 with a client rect). A screenshot of Programy at 1280 × 720 was pixel-identical with the gaps in the page and with them taken out of the DOM. The page without them has the DOM of `9fee9680`, and no CSS of the computer layout changed beyond `.rule-list-gap { display: none }`.

### Tests

`tests/view/rule-editor.test.mjs`:

- The case of the bare click becomes „a click anywhere on a row or a header outside its buttons — its bare area, a gap between buttons, its handle — asks once to open it”. It presses the bare row, the controls, the spacer, a gap and the handle of a row, then the bare header, its spacer, its handle and „▾”, and expects five opens of the rule and three of the group. It cites D-306 and D-296, their sentences on a tap anywhere outside the buttons.
- The structure case becomes „a row and a header are covered outside their buttons by elements that take a click and hold no button: …”. It checks:
  - the children, `rule-list-body` then `rule-list-controls`;
  - the controls `gap, [↑, gap, ↓], spacer, Usuń` and `gap, [↑, gap, ↓], spacer, ▾, gap, ✕`;
  - each cover (the text and every gap) has a click listener of its own and holds no button.

  It cites D-396, D-306 and D-296.
- Seen failing first: with the new cases and the old code, both failed (`npm test -- tests/view/rule-editor.test.mjs` exit 1). The first stopped at a missing spacer, the second on `expected ["gap",["↑","gap","↓"],"spacer","Usuń"], got [["↑","↓"],"Usuń"]`. With the covers in place and the handle still excluded, the first case failed on its assertion for the expected reason, the handle's click asking nothing (exit 1, 81 pass, 1 fail). After the change of `clickedBody`: exit 0, 82 pass.
- What only the browser can hold: where the boxes stand in the phone layout and where Chromium sends a tap — the grid above. No assertion on layout was written.

### Entries brought to the code

- Styleguide, rule Program editor:
  - the bullet on opening now says the handle opens too, because a drag gives no click;
  - the gaps and the spacer (`rule-list-gap`) are elements that take the click;
  - the reason names the free end of the text line above „Usuń” and „✕”.

  The bullet on the phone layout now says no place outside the buttons is bare row, how the text box and the gaps cover it, and that the computer layout draws none of them. Its old words „środek linii jest wolny” would have read as bare; it now says free of buttons.
- D-396, D-306, D-296: only their *Verification* `tests:` clauses, to say what the tests now hold (the gaps and the spacer, the handle). No binding sentence changed: D-306's „A tap or a click anywhere on a program rule's row outside its buttons opens …” and D-296's „A tap or a click anywhere on the header outside its buttons opens the group …” are now true of the code, the handle included.

### Checks of this fix (command, exit code)

- `npm test -- tests/view/rule-editor.test.mjs`: exit 1 twice before the code (the runs above), then exit 0 (82).
- One script, `.runs/correction-1/run-tests.py`, ran each of these as `npm test -- <file>` and wrote command and exit code to a file:
  - `tests/view/rule-editor.test.mjs` exit 0 (82)
  - `tests/view/rule-signs.test.mjs` exit 0 (6)
  - `tests/view/item-verb-panel.test.mjs` exit 0 (6)
  - `tests/view/run-screen.test.mjs` exit 0 (25)
  - `tests/view/shared-controls.test.mjs` exit 0 (54)
  - `tests/view/maps-screen.test.mjs` exit 0 (50)
  - `tests/view/world-area.test.mjs` exit 0 (24)
  - `tests/view/scene.test.mjs` exit 0 (74)
  - `tests/view/run-header.test.mjs` exit 0 (24)
  - `tests/view/character-screen.test.mjs` exit 0 (15)
  - `tests/invariants/test_browser_view_token_values.py` exit 0 (4)
  - `tests/invariants/test_browser_view_focus_outline.py` exit 0 (3)
  - `tests/quality/test_function_and_file_size.py` exit 0 (2)
  - `tests/quality/test_quality_invariants.py` exit 0 (8)

  These ran on the content of the commit, just before it was made.
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/view/rule-list.tsx tests/view/rule-editor.test.mjs` exit 0.
- After the commit: `python -B .the-way/elements/common/foundation_check.py` exit 0, „0 errors”; `python -B .the-way/instruction-files/check_instructions.py` exit 0, „0 error, 134 warn, 7 info”.
- Not run: `npm test` with no argument (outside my boundary); the loop2-play skill test (the skill was not touched).

### Own-work check of this fix

Requirement most likely unmet: „none may reach a button of another row or of the header above” — the first rule of a group under the header's „✕”. Check: the grid over rule 4, the first of „Jedzenie”, on both screens, at three radii. It showed no point reaching any button, the header's included; the points of its top edge at x 22 reached the header's text, which opens the group. Not proven: Chrome on a real Android phone, whose contact size and adjustment may differ.

### Choices of this fix

- Covers as empty sibling elements with a click handler of their own (gap, spacer) and the text as a box in the phone layout. Rejected:
  - one element absolutely positioned under the whole row: it would lie under the buttons too, so for a tap inside a button it would compete with the button on equal terms and could take taps meant for the buttons. This is a guess from how the adjustment scores a tap; I did not try it;
  - buttons touching with no gap: it changes the look.

  Cost if wrong: three to five empty spans in each row and header.
- The gap before the arrows keeps the buttons' 4 px inset from the row's left bar, so the bar strip (2 px) has a cover beside it. Without it, a tap on the bar went to „↑” in the trial.
- The buttons were not moved farther apart: the grid shows no outside point reaching a button. Cost if wrong: on a real phone with a larger contact, a tap at a button's edge opens the line, which changes nothing.

### Concerns of this fix

1. A tap whose centre lies inside a button within about 1 px of its top, 3–7 px of a side or 6 px of its bottom opens a line (its own or the next) instead of pressing the button. This is the ruling's third condition, met only away from the edges.
2. The points 1–3 px inside the top or bottom edge of a row, at its left bar, reach the neighbouring line's text, which opens that line.
3. The evidence is Chromium's emulated contact on this computer, not a real phone.

### Working copies of this fix

`.runs/correction-1/` of the worktree held:

- the composed state and the scripts that composed it and wrote the probes;
- the grids and their summaries, the test log and the screenshots;
- a copy of the diff of `eba37755`, first written by mistake to the scratch directory of the session (`the session's scratch directoryeba.diff`) and moved from there at once;
- the logs of the local starts.

`.playwright-cli/` of the worktree held the probe scripts for `run-code`. Both were removed after this section was written. Both local starts were ended (`npm run local:stop`).

### Unread material of this fix

- `reports/review-correction-report.md`: not read. The handoff gave the findings file, which copies the blocking findings word for word.
- The rest of what the earlier section lists stays as listed there.

### Searches not found or unclear of this fix

- A reason in the foundation, the guidelines or the tests for the handle opening nothing: none found. The searches are in I-2 above.
- How Chromium breaks a tie between a cover lying under a button and that button: not read in Chromium's source and not tried. The covers stand beside the buttons, not under them, so the question does not arise.
