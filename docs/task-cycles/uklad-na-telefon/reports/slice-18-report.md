done with concerns

# Report - slice 18, Programy and the program editor at 360 px

## Commits

- `137a2267` feat: give each program on the list of Programy the touch target in the phone layout ... (D-396, D-282, D-288)

## Files changed

- `src/browser/programs-screen.css` +16 -0: a block `@media (width < 1280px)` (comment naming D-396, D-282) after the rules of the list: `.program-list-item` becomes `display: flex; align-items: center; box-sizing: border-box; min-width/min-height: var(--touch-target-min)`.
- `src/browser/program-panel.css` +17 -0: a block `@media (width < 1280px)` (comment naming D-396, D-288) at the end: `.rule-list-header, .rule-list-row` get `box-sizing: border-box; min-width/min-height: var(--touch-target-min)`.

No TypeScript changed, so the size tests of D-425 were not run.

## Checks (command, exit code)

- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4 tests OK)
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` exit 0 (3 tests OK)
- In the running game (`npm run local`, https://127.0.0.1:62309, an account `agent18@example.test`, a state composed from `compose-state.mjs` extended with 3 more groups of 2 rules each, one group named with a long no-space name, and a second program): see the walk below.
- Not run: `npm test` with no argument (the boundary); the tests of size and quality (no TypeScript changed).

## Own-work check

Requirement most likely unmet: "every control of the editor — a rule's row and a group's header, their buttons, the cells — has at least the touch-target minimum, and nothing scrolls to the side, no text crosses its frame" at 360 px on Programy and on the screen of a map run.
Check: the measurement of loop2-play (`phone-measure`, copied unchanged, min 48) on each composed state, before and after the change.
Showed: before the change `controlsSmallerThan48` held two entries on Programy, `a.program-list-item "Program" 318 x 22.2` and `"Program 2" 318 x 22.2` (the finding (b) of the handoff). After the change it is empty on every Programy state (list, rule panel on the condition, on „Czynność”, on a number condition, on a group's own panel, trip plan open with two entries) and on the screen of a map run (rule panel open, the question „Zapisać, odrzucić, wrócić?” standing). `scrollsToTheSide` false everywhere; `outsideTheWindow` empty on Programy.

Entries left on the measurement, none mine:
- on the screen of a map run: `div.world-area content 330 > box 318`, `div.scene-sheet content 256 > box 64`, `img spans 156..412` — the scene's crop of its picture, which is slice 19's and which D-349/D-389 call a crop, not scrolling; present before and after my change.
- on Programy with a rule group's panel open: `input "Nazwa grupy" content 495 > box 185` — the text field holding the long no-space name I typed; a text field's value longer than its box is the field's own behaviour, the text cannot wrap in an input. A sign, not a verdict; I left it.

## Walk (walkthrough.md), where checked: Chromium via Playwright CLI 0.1.22, https://127.0.0.1:62309 (a local start, win32); the phone session from `.playwright/cli.phone.config.json` (360 × 740, touch), the computer session from the ordinary config (1280 × 720, no touch), one case at 1100 × 800

What the change alters, in the player's words: on a phone-width window each program on the list of Programy is a row 48 px high instead of 22 px; the rows and headers of the editor have the same floor, which changes nothing visible since their buttons are 48 px already. In the computer layout nothing.

| Case | By what | Verdict |
|---|---|---|
| Programy at 360: list of programs over the editor, nothing scrolls to the side, no control under 48 px | measurement at 360, screenshots | passes after the change; before: 2 list items at 22.2 px |
| a long no-space program name in the list item breaks inside its row | the name replaced in the DOM, measurement, screenshot | passes: broken over two lines, centred in a row ≥ 48 px, no entry in `contentWiderThanItsBox` |
| rule panel open on a condition, on „Czynność” (4-column grid), on a number condition („Temperatura poniżej”), on a group's own panel, trip plan open with entries | tap on the text of a row, screenshots, measurement | passes: no side scroll, no text over a frame, cells and buttons ≥ 48 px; the names of the cells wrap in 70 px cells (e.g. „Wytwórz — ognisko (6 patyków)” over several lines) and stay inside |
| the same editor on the screen of a map run at 360 (copy of the map run, rule panel open, rule reasons „kafelek już odkryty”) | tap, screenshot, measurement | passes, the editor part; the scene and the world area are slice 19's |
| the question „Zapisać, odrzucić, wrócić?” standing (made by „+ reguła” then „Zakończ”), with the line about the program | tap, screenshot, measurement | passes: the three buttons wrap onto a second line, the sentence and the line break inside the frame |
| the band of a discovery (no discovery could be reached in the composed state, so the band was made in the DOM with the real classes `discovery-band`, `discovery-band-text`, two `button`s and a long no-space group name) | injected element, screenshot, measurement | passes: text breaks inside, buttons ≥ 48; NOT the real component, the check shows the stylesheet, not the wiring |
| a group moved by its arrows by a tap | `locator.tap()` on „Grupa w górę” of group 3, then „Grupa w dół” of group 2 | passes: order Program / Bardzo długa / Grupa 3 / Grupa 4 → Program / Grupa 3 / Bardzo długa / Grupa 4 → back; „↑” disabled on the first group, „↓” on the last; each arrow 48 × 48 |
| 1100 × 800 with „Czynność” open | screenshot, measurement | passes: empty lists, grid of 4 columns with names on one or two lines |
| 1280 × 720 as before but for the header's arrows | computed styles of `.program-list-item`, `.rule-list-row`, `.rule-list-header` (display block/flex, `min-height` 0, content-box, heights 22.2 / 26.8 / 26.8 px, as before), screenshots before and after of Programy and of Programy with „Czynność” open | passes; see "Header arrows at 1280" below; a pixel diff was not possible because I changed the composed state between the shots (an extra rule 1.3, a trip plan with entries) |
| side observation | | see "Problems observed" |

What I did not check: a real discovery pause (not reachable in the composed state); a real keyboard on the narrow window; Firefox and Edge (D-396 puts those by hand); Chrome on a real phone; the trip plan's entry list at other widths; the screen of a map run at 1100 px (slice 19's); the "after" screenshot of the screen of a map run at 1280 (my CSS is inside `@media (width < 1280px)`, and the computed styles at 1280 show it is not applied).

Header arrows at 1280: the buttons „↑” and „↓” of a group's header are the shared buttons, 28 px wide in the computer layout like a rule's arrows, standing before the fold „▾” and „✕” at the right end of the header; their look is the rule arrows' look, „↑” off on the first group and „↓” off on the last. They line up with the rule arrows only at the right edge, because a row ends with „Usuń” (wider than „✕”), so the arrows of a header and of a row do not stand in one column. I judge this acceptable: the header is a different line with different buttons, nothing crosses or crowds at 1280 (long group name on its own line at 1280 on the screen of a map run is the same as before).

## Handed to my slice

(a) the tap on the empty part of a rule's row: cause found, not a defect of the code. Event log of a tap with a touch pointer on row 2.1 at its centre (x 180, y 148): `pointerdown`, `touchstart`, `pointerup`, `touchend` and `click` all targeted a `button`, the `click` at x 186. `elementFromPoint(180,148)` is the `li` of the row; the nearest button („↑”) begins at x 183, 3 px away. So Chromium's touch adjustment moves a touch that lands within a few px of a button onto the button; a mouse click at the same point reaches the row. A tap on the empty strip of the same row 100 px from the buttons (x 121) and a tap on the text opened the rule (panel count 1 each). So an "empty part" tap opens the rule except within a few px of a button, where the tap is taken for the button (it moved a rule up in my run). I changed nothing for it: the buttons are the minimum's 48 px and 4 px / 8 px apart, a finger beside a button hitting the button is the platform's behaviour. If the human wants more room, the row needs more gap around the button line — a decision, not mine. The "guess" of the handoff that the row is draggable is not the cause (only the handle `.drag-handle` has `draggable`). Hint for later agents: `locator.tap()` of Playwright taps the centre of a row, and at 360 the centre of a row of a rule lies 3 px from „↑”; tap on `.rule-condition` instead.
(b) done: the list items are 48 px high.
(c) done: the header with its arrows at 360 stands as: the line of the handle, number, name, condition and counts, and under it a line with „↑”, „↓”, „▾”, „✕" right-aligned, each 48 × 48; no rule was needed beyond the wrapping `.rule-list-header` already had.
(d) not mine, left.

## Choices

- I did not redesign the rows. The measurement at 360 showed the editor already fits (the rows wrap their buttons onto a second line, the panel's cells wrap their names, the 4-column grid stays); the one defect was the list items. Way rejected: laying the rule's buttons beside its text in one line by shrinking the handle and the number; cost if wrong: a human who wants a denser editor asks for it, the row costs 74 px of height per rule at 360 px.
- The grid of the action cells stays in four columns, in CSS alone, because `columnsOf` in `rule-panel.tsx` moves the keyboard cursor by the same number of columns; two columns in CSS only would make „↓” jump two rows for a narrow computer window with a keyboard. Cost if wrong: a 70 px cell with a name over 5–6 lines for „Wytwórz — ognisko (6 patyków)”.
- The explicit `min-width` and `min-height` on a rule's row and a group's header have no visible effect today (the 48 px buttons in them already make them higher), kept as the floor the styleguide asks for each control whose rule stands in a screen's stylesheet. Cost if wrong: two dead declarations.
- The long group name field (`Nazwa grupy`): left to the field's own clipping.

## Reaches beyond the dispatch

- `foundations/environment_facts.md:1027` `android-touch-target-size` (the "entry 2"): searched by identifier, read whole; it was named in the handoff as entry 2 without a line range.
- `compose-state.mjs` and `program-editor.js` of `dist/browser/view` (to compose a state with groups): read for the state, not the product.
- `src/browser/styles.css` (lines 225-330, 440-640) for the shared controls' rules and the shell of the phone layout; `src/browser/run-screen.css:270-345` for the rules of the band and the question.
- `src/browser/view/rule-list.tsx` whole and parts of `rule-panel.tsx`, `discovery-band.tsx` for classes and events.

## Working copies

- Everything stood in `.runs/slice-18/` of the worktree (scripts, the composed state, screenshots of before and after, a log of the local start) and `.playwright-cli/`; both removed before the commit by their full paths. `npm run local:stop` ended the start (1 stopped). `dist/` stays (the product's own build output, ignored). No screenshot was shown to the human and none was pushed; D-418 puts a shown screenshot in the screenshots repository and this slice shows none (the plan: only slice 20).
- The account `agent18@example.test` and its database live in the start's own database under `.runs/local-start/`, which the next start removes.

## Problems observed

- `.playwright-cli/` is not covered by `git check-ignore` in this worktree when the directory is absent (the command printed only `.runs`); I removed it at the end. Not checked whether `.gitignore` covers it when it exists.
- The hook `rules-on-demand` refused my first command of three kinds (a script, a git command) once each, as designed.
- The measurement counts `div.world-area` content 330 > 318 on the screen of a map run: slice 19's; its cause is not verified by me.

## Unread material

none (every file of the slice's *Read* was read whole except: `foundations/decisions.md` ranges were read as the entries D-396, D-282, D-288, D-166, D-167, D-173, D-290, D-298 each whole, at their current lines found by grep; the plan and the task only in the passages the handoff copies — `task.md:28-45` and `:145-147`, as named).

## Searches not found or unclear

- The handoff's range of D-167, D-173, D-290, D-298 were not given at their new lines; I found them by grepping `### D-NNN` (D-167 at 8336, D-173 at 8450, D-290 at 9753, D-298 at 9571).
- The new fact of "entry 2" has no identifier in the handoff; I found it as `android-touch-target-size` in the *Based on* of D-396.
- A real discovery band could not be reached in the composed state; the band was checked as an element made in the DOM.
