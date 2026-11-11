# Report — slice 3 of koniec-przejscia (the end-of-run window as a component, with its look)

**Status:** done with concerns (concerns: values the token file lacks for the bar of time; the look of the window opening in the real game could not be checked on the real screen because slice 4 is not made).

## Files and commits

Commit `5485e511` — feat: draw the end-of-run window as a component with its rules in the stylesheet and its tests

| File | Added | Removed |
|---|---|---|
| `src/browser/view/end-window.tsx` (new) | 259 | 0 |
| `tests/view/end-window.test.mjs` (new) | 659 | 0 |
| `src/browser/styles.css` | 161 | 3 |

(Line counts: new files by `wc -l`; the stylesheet by `git diff --stat` before the commit.)

## What the component is

`EndWindow({ state, lastMinutes, controls })` in `src/browser/view/end-window.tsx`.

- `state`: the game state; nothing is drawn unless `state.run` is a map run that `mapRunEnded` says has ended.
- `lastMinutes`: the entries of „Ostatnie minuty” (`ChronicleEntry[]`, oldest first) that the screen takes from `chronicle.entriesToDeath(4)` minus the paragraph; the section stands only with entries.
- `controls`: `{ close, restart, end, openMap(mapId), addRule }`. These names are mine; slice 4 wires them.
- Texts all come from `end-window-lines.ts`; the paragraph is `combatText(run.lastCombat)`; the warning is `tripWarning` as the header gives it (class `trip-warning`).
- Root: `section.end-window`, `role="dialog"`, `aria-labelledby` the title (`useId`), `tabIndex=-1`, `onKeyDown` Escape calls `controls.close()` (read on the root, not on the document), no `aria-modal`. Focus goes to the root once when the view mounts (`useEffect` with `[]`), so a later draw leaves focus where the player put it.
- Children of the root: `.end-window-top` (label, title, „✕” with label „Zamknij okno”), `.end-window-body` (scrolls), `.end-window-buttons` (do not scroll).
- Body order: streak (classes of the header's requirement: `run-header-requirement[ positive]`, `-text`, `-bar`, `-fill` with `--share`), discovery (`.end-window-discovery` with „Dodaj regułę z tym”, disabled where `canAdd` is false, no „Wznów”), cost line, then sections: „Ostatnie minuty” (rows with the chronicle's own classes `chronicle-row/-minute/-text`), the paragraph section (no name), „Nie zadziałały ani razu”, „Na co poszedł czas”, „Wyprawa i teren”.
- Buttons: „Restart” (destructive), the warning, „Zakończ” (destructive), then „Otwarte: {mapa} →” (plain) for each `wayOnButtons` entry.

## Checks (command and exit code)

Test written first (stub `EndWindow` returning null, so each case reached its assertion):

- `npm test -- tests/view/end-window.test.mjs` — exit 1, all 12 cases failed on assertions (log `docs/task-cycles/koniec-przejscia/reports/s3-red-endwindow.log`; e.g. "expected a true value, got null", "expected [...], got []").
- After the component and the rules: `npm test -- tests/view/end-window.test.mjs` — exit 0, 13 pass, 0 fail (`s3-green-endwindow.log`, final `s3-final-endwindow.log`).
- `npm test -- tests/view/react-controls.test.mjs` — exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0
- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0
- `npm test -- tests/invariants/test_design_token_sources.py` — exit 0
- `npm test -- tests/invariants/test_browser_view_framework.py` — exit 0
- `npm run typecheck` — exit 0
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view tests/view` — exit 0
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/view src/browser/styles.css tests/view` — exit 0 (it failed first on the test file; fixed with `--write`, which only reflowed it)
- Not run: the full suite and the foundation check (the cycle's gate; the handoff says do not run it).

Logs are `s3-*.log` in `docs/task-cycles/koniec-przejscia/reports/`.

Mutations seen failing (run after the first green, restored before the commit):

- effect without the `[]` list: fails "when the window appears the focus moves to it, and a later draw leaves the focus where the player put it" (`s3-mutant-focus.log`, exit 1);
- Escape handler also taking Tab: fails "Escape pressed inside the window asks to close it through the control; another key and Escape outside it do not" (`s3-mutant-escape.log`, exit 1).

## Own-work check

- Requirement most likely missed: the plan's "the buttons do not scroll" and "the window needs no backdrop since it covers the screen" together with "max-height in vh checked at 1280 × 720 and in the one-column layout", and D-88 (the look is judged in a real browser). jsdom shows none of it.
- Check: a throwaway page of my own (see below), in a real Chrome driven by `playwright-cli`, with the real `dist/public/styles.css` and `tokens.css` and the real component bundled by esbuild with a death state composed by the simulation (death by cold at minute 243; discovery, wolf paragraph, three unfired rules, time shares and four last minutes added).
- What it showed:
  - 1280 × 720: window x 16, width 1248 (the content column), height 576 (80vh), top 54 under the stand-in header, bottom 630 (90 px free below); the middle part scrolls (scrollHeight 561 > clientHeight 478); after scrolling to the end the top row and the buttons stay at the same position (buttons 581–629); title, label, „✕”, streak bar, discovery, cost line, the sections and the buttons all draw; the bar of time shows three pieces separated by a 1 px gap in the `highlight` track; no horizontal scroll.
  - 800 × 720 (one column, under 1074): same height 576, width 768, same behaviour. 400 × 720: width 368, no horizontal scroll, buttons at the bottom.
  - 600 × 720 with a completion (Las): title „Las rozwiązany” in `positive`, streak met in `positive`, „Do skrzynki: patyk 3.”, buttons „Restart”, „Zakończ”, „Otwarte: Las — głębiej →”.
  - Focus: when the page opens the active element is the window root; Tab then goes „✕”, the scrolling part, „Dodaj regułę z tym”.
  - Keyboard scrolling: with focus on the root, ArrowDown and PageDown did not scroll the middle part (scrollTop stayed 0, because the scroller is a child, not an ancestor, of the focused element). I therefore gave the scrolling part `tabIndex={0}` (below); after that Tab reaches it and ArrowDown and PageDown scroll it (scrollTop 164).
  - Visible focus: with the window focused after opening, the global focus ring (white, from the one `:focus-visible` rule) is drawn around the whole window. This follows D-47; I added no `outline` rule.
  - The warning of a cut trip plan did not show on the throwaway page's completion variant (my fixture's plan was not cut on that map); the unit case in the tests covers it, the look beside „Restart” was not seen in the browser.

### Method of the real-browser check

Slice 4 is not made, so the window cannot be reached on a real screen of `npm run local`. I checked the component on a page of my own in `.runs/endwindow-check/` (ignored): `compose.mjs` builds the state with `dist/browser/sim/`; `entry.tsx` renders `EndWindow` from the source; `build.mjs` bundles it with esbuild; `serve.mjs` serves the page with `dist/public/` on `http://127.0.0.1:48731`; `playwright-cli` (open, resize to 1280×720, 800×720, 400×720, 600×720, 1280×300, eval of element rectangles, screenshots, Tab and arrow keys). Each screenshot was looked at and deleted; none is kept or published, and none is in any repository. The stand-in for the menu bar is a one-line `header h1` (the real bar and the warning row are taller, which the 90 px free below the window leaves room for). `playwright-cli close` was run and `npm run local:stop` reported 0 starts to stop (no start was running); the throwaway server was killed. `.playwright-cli/` was deleted. The check of the window opening on the real screen of the game (covering the screen, the menu bar above it) belongs to slice 4.

### Figure chosen for `max-height`

`80vh`. At 720 px high that is 576 px, leaving 54 px of header above and 90 px below in the throwaway page; in the real screen the menu bar and the row under it take more than my 54 px, so the orchestrator should look again with the real bar in slice 4's check (a death state through `npm run local`). Rejected: `calc(100vh - …)` (not a plain `vh` figure; D-43 names `vh` as a layout dimension) and 90vh (leaves too little under the menu bar once it stands above the window). Cost if wrong: the window is clipped by the viewport bottom at a high menu bar; the figure is one line in `.end-window`.

## Values the token file lacks and the styleguide's roles do not give (not added)

- **Pieces of the bar of time told apart by more than their order.** All pieces are filled in `text` with a gap of `--frame-width` between them, as the plan says; a reader can tell them apart only by position, the gap and the width, and the legend is in the same order. To tell them apart by colour or by pattern the file would need a series of fills (for example one more role of background or text, or a set of opacities) with a source settled with the human. Not added.
- **Height of the bar of time.** I used `var(--space-s)` (a step of the spacing scale as a height); the styleguide's bars take `--bar-width` (2 px), which was too thin to show pieces of different length. If the human wants a named thickness for this bar, that is a new token.
- No backdrop: none needed.

## Reaches beyond the dispatch

- `src/browser/AGENTS.md` and `src/browser/tokens.css`: read whole (named). 
- Read `end-window-lines.test.mjs` lines 1–347, `right-area.tsx` 60–152, `chronicle-entries.ts` types, `styles.css` regions of the chronicle, header, discovery band and end question: to reuse classes and fixtures; all named in the *Read* list or necessary to reuse the chronicle row.
- No other reach.

## Choices (way rejected, cost if wrong)

1. **Props names**: `{ state, lastMinutes, controls: { close, restart, end, openMap, addRule } }`. Rejected: passing the chronicle memory itself (the component would then hold the choice of four entries and the paragraph removal; the plan says the screen gives the entries). Cost: slice 4 must map; trivial.
2. **View split**: `EndWindow` returns null without an ended map run; the view that takes the focus is a separate inner component mounted only when the map run has ended, so focus is taken exactly when the window appears. Rejected: one component with an effect on `[]` (it would not focus when a mounted component's state later ends). Cost: none seen.
3. **Own classes for the discovery** (`end-window-discovery`, `-text`), sharing the CSS rules with `discovery-band` by a shared selector, instead of reusing `.discovery-band`: so a slice 4 test that counts `.discovery-band` in the run screen finds none at an end. Cost: two selectors in two rules.
4. **Own class for the cost line** (`end-window-cost`) rather than `trip-result`, for the same reason; **`trip-warning` is reused** for the warning "as the header gives it". Cost: a test counting `.trip-warning` in the whole run screen sees the header's and the window's when both stand; slice 4 should scope its queries.
5. **Paragraph and last-minute rows in Geist Mono** (chronicle text, D-46); the paragraph section has no name (the plan names none). Rejected: body font for the paragraph. Cost: if the human wants the paragraph in the text font, one rule.
6. **„Ostatnie minuty” is content-driven**: drawn when the screen gives entries, not checked against a death. After a completion the screen gives none (`entriesToDeath` returns `[]` without a death). Cost: a wrong call of the screen would show the section after a completion.
7. **Percent text** as `60%` (the form of the task's To do 7, „8%”), not `60 %`. Cost: one literal.
8. **The scrolling part has `tabIndex={0}`** (found with the real browser, above), without a role or a name since the window adds no wording of its own; an unnamed focusable region may be flagged by an accessibility audit. Rejected: leaving it out (keyboard cannot scroll from the root); a role `region` with a name (invented wording). Cost: one extra Tab stop; where the part holds no control Chrome would add its own stop, so there it is the same.
9. **Keys of the lists**: last minutes keyed by index (entries have no id; the list is static between draws), others by their number or label.
10. **`flex: var(--percent) 1 0`** for a piece of the bar (`--percent` is an integer 0–100, the window's own custom property; the stylesheet gives no unitless opacity, weight, dash or width, and `flex-grow` is none of them: `browser-view-token-values` passed).

## Unread material

Superseded by the amendment at the end of this report (the foundation entries were read afterwards).

## Searches not found or unclear

- The session was interrupted by a restart of the computer. I found my partial work by `git status` in the worktree: two untracked files, `src/browser/view/end-window.tsx` (a three-line stub) and `tests/view/end-window.test.mjs` (the whole test file, written first), and `src/browser/styles.css` unchanged. I read both whole, found the test file complete and matching the slice, ran it red against the stub (12 cases failing on their assertions) and went on. `slice-3-extra.md`, named in the coordinator's message, repeats the handoff's sections on the texts and the binding answers; I had not read it before the interruption.
- Not found: a definition of „the screen's content column” width as a named value; I used `width: 100%` of the container inside the screen, which in the real screen is the content of at most 1344 px (D-280). Not checked inside the real screen (slice 4).
- Unclear: whether the paragraph section should carry a name; the plan lists none, so it has none.

## Problems as observed

- Keyboard scroll from the root does not work (observed, fixed with `tabIndex=0`, above).
- The window root shows the global focus ring when it takes the focus on opening (observed; a consequence of the one `:focus-visible` rule; the window is no control with a click target, so a pointer user clicking inside moves the focus and the ring remains only while the root itself holds it).
- `npm run local:stop` reported 0 starts; no leftover browser of mine was found, and the throwaway server (node, port 48731) was killed.

## Amendment after the foundation reading

### What I read (each whole, at the ranges the handoff gives)

`foundations/decisions.md`: D-39, D-43, D-44, D-47, D-88, D-122, D-132, D-133, D-135, D-147, D-173, D-185, D-188, D-216, D-275, D-276, D-285, D-311, D-313, D-62 (the plan's row) and D-362. D-53 and D-93 (named inside these entries) I did not open; their content as the entries state it (where „Zakończ” and „Otwarte” lead; the counter „Wykonano 0×”) is the screen's and slice 2's. `foundations/invariants.md`: browser-view-framework, eslint-source-rules, prettier-source-format, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources, document-test-memory-limit. `foundations/glossary.md`: completion. `foundations/part_map.md`: browser-view (its files `src/browser/view/**`, `src/browser/*.css`, `tests/view/**` claim all three files of this slice).

### What I found against the component, its rules and its tests

One deviation, fixed:

1. **„Ostatnie minuty” only after a death (D-362: "„Ostatnie minuty” only after a death"; its *violates*: "„Ostatnie minuty” after a completion").** The component drew the section whenever the screen gave entries, so a screen that handed entries over after a completion would have shown it. Test first: the case "the last minutes come from the entries the screen gives and stand only with them" now gives `LAST_MINUTES` after a completion and expects no section; it failed with "after a completion there are none, whatever entries are given (D-362): expected false, got true" (`s3a-red-endwindow.log`, exit 1). Fix: the section stands only where `run.death !== null` and entries exist. This reverses my choice 6 of the report above (content-driven only).

Compared and found in line (no change):

- **D-362 structure and order:** label „Koniec przejścia” above the title; title in `positive` after a completion and in the heading role after a death; answers in the order happened, cost or gave, why, next; each section of why only with content; „Ostatnie minuty” rows with the game minute as in the chronicle; the paragraph in a section of its own, never in „Ostatnie minuty” (D-147); „Nie zadziałały ani razu” with number and sentence; the bar of time with legend and percentages; „Wyprawa i teren”; buttons fixed at the bottom while the middle scrolls; „✕” and Escape close through `controls.close`; the window sets no `aria-modal` and traps nothing, so the menu bar above stays reachable.
- **D-135 and D-133:** the streak is „najdłuższa passa {n}/{m}” in the classes and `--share` of the header's requirement bar; a met streak has name, numbers and fill in `positive`.
- **D-185 and D-216:** the cost line in `text-secondary`, or in `danger` where no resurrection was ready.
- **D-122 and D-313:** the discovery in the band's text role `discovery` (shared rules with the band, bar in the text's colour, D-279), with „Dodaj regułę z tym”, disabled where the copy holds no rule group, and no „Wznów”; it calls `controls.addRule`, and closing the window is the screen's act (slice 4). The window's own classes keep a `.discovery-band` away from the screen at an end.
- **D-188:** the warning of a cut trip plan stands beside „Restart”, in `warning` (the shared `trip-warning`).
- **D-132, D-62, D-173:** „Restart” and „Zakończ” are the shared destructive buttons; „Otwarte: {mapa} →” a plain shared button, only after a completion of a map that opens another; the questions and the landing places are the screen's.
- **D-44, D-275, D-276:** every button is the shared `ReactButton`; the window builds no `<button>` of its own, and has no secondary action or tab.
- **D-39, D-40 (styleguide roles):** `panel` background with `text`, frame in `divider`, section names in `text-label`, title in `text-strong`, bar of time track in `highlight` with pieces in `text`.
- **D-47 and the invariant browser-view-focus-outline:** the stylesheet sets no `outline`; focus is drawn by the one global rule; the invariant passes.
- **D-285:** Escape is read on the window's root, never on the document, so it does not meet the menu „Konto”.
- **D-43 and browser-view-token-values:** no colour, no `px`, no font name; `80vh` and `width: 100%` are layout dimensions; the invariant passes.
- **D-88:** the look, the scroll and the focus were judged in a real browser (above).

Noted, not changed (for the orchestrator):

- **Order of the discovery and the streak.** D-362's sentence lists "the discovery of that game minute" before "the longest streak"; the plan's slice and the task (To do 5: the streak "under the title"; To do 9: the discovery in the part about what happened) put the streak first, then the discovery, and the code and tests follow the plan. D-122 says only "in its part about what happened". If the order matters, it is one swap of two blocks in `end-window.tsx` and one assertion.
- **D-173's rationale text** "the end buttons stand ... wherever" and the closing of the window while the question stands are the screen's part (slice 4); the component has no state for it.
- D-53 and D-93 not opened (above).

### Files changed in the amendment

Commit: see the return message (the commit after `5485e511`, message "fix: draw the last minutes in the end-of-run window only after a death, as D-362 gives").

| File | Added | Removed |
|---|---|---|
| `src/browser/view/end-window.tsx` | 3 | 3 |
| `tests/view/end-window.test.mjs` | 8 | 4 |

(from `git diff --stat`: 11 insertions, 7 deletions in total).

### Checks of the amendment

- `npm test -- tests/view/end-window.test.mjs`: red before the fix, exit 1 (`s3a-red-endwindow.log`); after the fix exit 0, 13 pass (`s3a-green-endwindow.log`)
- `npm test -- tests/view/react-controls.test.mjs`: exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py`: exit 0
- `npm test -- tests/invariants/test_design_token_contrast.py`: exit 0
- `npm test -- tests/invariants/test_design_token_sources.py`: exit 0
- `npm test -- tests/invariants/test_browser_view_framework.py`: exit 0
- `npm run typecheck`: exit 0
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view tests/view`: exit 0
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/view src/browser/styles.css tests/view`: exit 0
- Not run: the full suite and the foundation check (the cycle's gate).

### Corrected **Unread material:** D-53 and D-93 (named inside entries I read, not named in the handoff's list); nothing else. **Searches not found or unclear:** unchanged from above, plus the discovery/streak order in D-362 against the plan.
