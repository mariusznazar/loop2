# Report — executor of slice 2 — task `paski-parametrow`

**Status:** done with concerns (the concerns are the choices and gaps named below; no question blocks the slice).

## Commits
- `8bc77a31` feat: :lipstick: add the button of a cell of the body row to the shared button, with its parts, its bar, its look and the place of the health cell's frame, and hold them in the shared-controls test (on top of `503afd92`).

## Files changed (added / removed lines)
- `src/browser/view/controls/react-button.tsx` — 104 / 22
- `src/browser/styles.css` — 112 / 3
- `tests/view/shared-controls.test.mjs` — 389 / 1 (the one removed line is the import of `ReactButton`, now also importing `ValueCellParts`)

## What was made (the form, the executor's choice)
- New kind `kind: "value-cell"` of `ReactButton`; its class is `button value-cell`. It carries `cell: CellParts` where the other kinds carry `text` (`ReactButtonProps` is now a union of a text button and a cell button, so a cell button without `cell`, or a text button with one, fails the typecheck).
- `CellParts = { name, number, bar, note, marks? }`; `bar` is `{ share, fillRole }` (fill role: `positive` | `satiety-fill` | `text-strong`) or `{ scale: ReactNode }` for the temperature scale the screen draws; `note` is a string or `null` (no note drawn). `expanded` (already there) gives `aria-expanded`. The control imports nothing of a screen (D-395).
- Parts, in order: `value-cell-head` (`value-cell-name`, `value-cell-number`), `value-cell-bar` (the track) with `value-cell-fill <role>` whose length is `--share` (the pattern of `character-tree-fill` and `run-header`), or `value-cell-scale` in place of the track, then `value-cell-note`.
- The same parts are exported as `ValueCellParts`, so the health cell, which is no button, draws identical markup in a `div.value-cell-static` (Slice 6).
- `marks`: classes the screen names (an alarm, a frame state), added beside the button's own, for the screen's sheet to read; the control gives them no look. Reason: the plan puts the alarm and outline colours in `run-screen.css` and Slice 6 changes no file of the control, so the screen needs a hook on the button.
- `styles.css`, after the tab rules: the kind's box and parts, the rule for `.value-cell-static` beside it with a comment saying why it stands in the shared sheet (frame place kept with a transparent frame), no background and no `highlight` under the pointer, name `text-label` at rest and `text-strong` under the pointer and when `aria-expanded="true"`, track `highlight`, bar twice `--bar-width`, three fill roles, disabled text in `text-disabled`. The touch target of `--touch-target-min` is held by the existing `.button` rule of the `@media (width < 1280px)` block, which the kind's class `button` already matches, so no new rule was written there (measured below).

## Checks (command, exit code)
- The new cases written first, seen failing for the expected reason:
  - `npm test -- tests/view/shared-controls.test.mjs` with no code → exit 1, 6 cases failed on assertions (`expected ["value-cell-head","value-cell-bar","value-cell-note"], got []`; classes of `marks` missing; and three look cases that stopped on a missing part).
  - After an empty skeleton of the markup (parts, no stylesheet rules) → exit 1, 3 look cases failed on assertions (`expected "var(--text-label)", got "var(--text)"`; `expected "var(--positive)", got "rgba(0, 0, 0, 0)"`; `the place of the frame: display`).
  - After the stylesheet rules, one case first failed on my own reading of jsdom (computed `border-top-width` is `3px`, a `var()` inside a shorthand is dropped; the plain button's highlight was shadowed by the longhand of `.button`); both were test errors, corrected by reading the declarations of the real rules (helper `lastDeclared`), no assertion weakened. → `npm test -- tests/view/shared-controls.test.mjs`, exit 0, 61 tests, 61 pass.
- Mutation kept in the worktree for a moment: removing `.button.value-cell:hover:not(:disabled) { background: transparent; }` from `styles.css` → the pointer case failed (`expected "transparent", got "var(--highlight)"`, exit 1); restored before the commit.
- `npm run typecheck` → exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` → exit 0.
- Extra: `npm test -- tests/quality/test_function_and_file_size.py` → exit 0; `npx eslint` on the two touched `.tsx`/`.mjs` files → exit 0; `npx prettier --check` on the three files → clean; `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (so the `decision:` quotations of the new cases match their entries, and the line about `design-token-contrast` is gone after Slice 1).
- Not run: the full gate (`npm test` bare), as ordered.

## Own-work check (section 3)
- Requirement most likely unmet: the look that jsdom cannot show — the track and fill 4 px thick and as long as the share, no `highlight` and the lighter name under the pointer, the frame place of the health cell, and the touch target of 48 px at a page area 360 px wide (the media block and `:hover` do not apply in jsdom).
- Check: a hand-made page linking the real `tokens.css` and `styles.css`, with one cell per state, served over HTTP from the worktree and read in Chromium by Playwright MCP at 360 px wide (page and server removed afterwards). It showed: bar height `4px`; track `rgb(39, 39, 42)` (`--highlight`); fill 8 px of a 55 px track for share 0.14, `rgb(255, 137, 4)` (`--satiety-fill`); name at rest `rgb(141, 141, 151)` (`--text-label`), open `rgb(244, 244, 245)` (`--text-strong`); under the real pointer (`:hover` true) background `rgba(0, 0, 0, 0)` and name `rgb(244, 244, 245)`; frame of the button `rgb(113, 113, 123)` (`--control-border`) and of the static cell transparent at the same width; `min-height`/`min-width` of the button `48px` with the media query matching; no scroll to the side (`scrollWidth` 360). Nothing contradicted the requirement.
- Walkthrough and `ui_check.md`: not read and no walk made — no screen uses the control yet (the world area keeps its old cells until Slices 4 and 6; the kitchen-sink sample is Slice 3), so the change alters nothing a user sees in the running product. The measurement above is not a screenshot and none is shown to the human.

## Choices (with the way rejected and the cost if wrong)
- Class and kind name `value-cell` (parts `value-cell-*`, health `value-cell-static`). Rejected `body-cell`: it is the class of the screen's present cell in `run-screen.css`. Cost: a rename in three files.
- Fill role as the class of the fill (`positive`, `satiety-fill`, `text-strong`), the colours of the fills in `styles.css`. The plan's *Choices* row puts the fills' colours in `run-screen.css`; I kept them in the shared sheet because the kitchen-sink page (Slice 3) links `styles.css` alone and could not show a coloured sample otherwise, and the plan's Slice 2 goal itself says the fill and the role are the screen's gift to the button. Cost: if review wants them in the screen's sheet, three rules move.
- Defaults of the parts: name in `text-label` at `--font-size-label` (the grey small name of loop's cell; `text-strong` under the pointer and when open, as D-40 gives), number in `text` at `--font-size-body` (today's colour of the number; the red of the alarm is the screen's through `marks`), note in `text-secondary` at `--font-size-detail` (D-337 smaller than the value). D-40 does not name the resting role of the name or the number. Cost: a changed role is one line.
- Longhands (`border-width`, `padding-*`) in the rule shared by the button and the static cell, instead of the shorthands: the case compares the frame place of the two through the rules; values equal the ones `.button` has.
- The cell has no waiting text: with `kind: "value-cell"`, `waitingText` is ignored and the parts are drawn; `disabled` still locks it.
- Not done on purpose, outside the slice's list: the smooth length of the fill and the pulse (Slice 6 and 8); the transition time is not written here.

## Departures from the task's answers and from the plan
- Fill colours in `styles.css`, not `run-screen.css` (above).
- Plan: "in the block `@media (width < 1280px)` the touch target" — no rule added there, since `.button` already holds it for every kind; verified in the browser. Reported as a mismatch of wording, not of result.
- No other departure; no value of the task was bent.

## Reach beyond the dispatch
- Read `.claude/skills/loop2-play` first lines only, to learn the Playwright route (file URLs are blocked, so an HTTP server was used). Read `src/browser/character-screen.css:170-245` and `character-trees.tsx:95-135` as the model of a `--share` bar; `src/browser/run-screen.css:630-672` and `world-area.tsx` (names of the present body-row classes); `.the-way/elements/decisions/template.md` (format of `decision:` lines); `.runs/task-cycles/paski-parametrow/plan.md` lines 85-135, 225-262 and 430-440 (Slices 2, 3, 6 and *Choices*) to see what later slices expect of the control. Reason: the handoff did not say how the screen of Slice 6, which changes no file of the control, gets its hooks on the button.

## Concerns for the orchestrator
1. Slice 6 builds the temperature cell as `ReactButton kind="value-cell"` with `bar: { scale }` and the alarm / frame states as `marks`; the plan's Slice 6 text says the screen's sheet reads them. If Slice 6 expects another way (for instance a `className`), the control must change.
2. The styleguide's "States of shared controls" list and the kitchen-sink sample do not yet name the new kind; the plan places them in Slice 3 (and a styleguide rule elsewhere), not here.
3. The foundation text of D-337 puts the number of the cell at the right; I draw it with `justify-content: space-between` in the head, so a name wider than the cell squeezes it (`min-width: 0` on the name); the two-rows-of-two break at 360 px is Slice 6's.

## Working copies
- `.runs/executor-2/`: the run logs of the checks (`red-run.txt`, `red-run2.txt`, `green-run.txt`, `mutation1.txt`, `typecheck.txt`, the invariant runs, `foundation.txt`) stay for the orchestrator; the probe scripts, the probe page and the HTTP server's log were removed, the server process stopped, `.playwright-mcp/` removed from the worktree root. No worktree or clone was made.

## Unread material
- `guidelines/styleguide-browser-view.md`: read lines 1-700 (roles table, all rules to "A change is checked in both layouts", the start of "Main button, secondary action and tab"); not read lines 700-1633 (the rules of the screens Mapy, Wiedza, Postać, the program editor, the scene, the chronicle, the end window, the list of accounts, and the end sections).
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read (no screen shown; see own-work check).
- `.runs/task-cycles/paski-parametrow/task.md`: read lines 1-160 (To do, Questions 1-14, the start of Context) and 225-249; not read lines 161-224 (the rest of Context and the sections between).
- `src/browser/styles.css`, `tests/view/shared-controls.test.mjs`, `react-button.tsx`, `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, `src/browser/AGENTS.md`, D-44, D-40, D-337, D-450, D-265, D-395, D-47, D-396, `browser-view-focus-outline`, `tests/view/game-stylesheets.mjs`: read whole. `tests/view/page-document.mjs`: lines 1-80 only. D-39 and the token file: the passages named in the report only.

## Searches not found or unclear
- The styleguide rule "The body row of a map run" named in the task (To do 7) does not exist yet in `guidelines/styleguide-browser-view.md` (no `###` heading with that name); it is not this slice's work, noted for the slice that writes it.
- jsdom's computed style drops a `var()` inside a shorthand (`border`, `padding`, `background`); the cases read the declarations of the real rules for those (explained in the helper's comment). Not a defect of the product.
