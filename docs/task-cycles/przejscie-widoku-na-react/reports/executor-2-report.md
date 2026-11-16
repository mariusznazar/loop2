# Report — executor of slice 2 (the kitchen-sink page drawn in React)

**Status:** done

**Commits:** `e2d82b34` (the page), `d3c20034` (a fix of the tab samples, see Choices); range base `7c0fda9fccd8c64c70f847a1876b15b59cdd07f3`. No push. The checks below were run on the first commit and the lint, prettier, typecheck, build and the four invariant tests were run again after the second: all exit 0.

## Files changed

- `src/browser/kitchen-sink/kitchen-sink.tsx` — added, 1061 lines (prettier-formatted JSX).
- `src/browser/kitchen-sink/kitchen-sink.ts` — deleted, 833 lines.
- `src/browser/kitchen-sink/kitchen-sink.css` — 23 lines changed (the selectors of the forced samples).

Nothing in `src/browser/view/controls/` or elsewhere in `src/browser/view/` changed. `git diff --name-only 7c0fda9f..HEAD` touches only the three files above.

## What the page does now

- One React root on a host `div.sample-page` that the module appends to the body, drawn with `flushSync` at load. `document.body.dataset.page` stays set and `PAGE_MARKER` is still exported.
- Beyond the entry module the page imports only modules the game uses: `react-*.tsx` controls, `email-status.ts`, `account-rules.ts`, `terrain-picture.ts`, `sim/hex.ts`, `sim/data/resources.ts`, and the types `ConfirmationMessage`, `ConditionNumber`, `Hex`. All code only the page needs (the samples, the number rule, the typing helper) stays in the module.
- Hover and focus samples stand in a `span` wrapper (`Forced`) carrying `sample-hover` or `sample-focus`; no control got a prop or a class. In `kitchen-sink.css` the one outline rule keeps exactly two selectors: `:focus-visible` and `.sample-focus :not(span):not(div):not(option)`. The sample selector is written with chained `:not()` instead of `:is(button, select, input)` because the invariant test splits a selector list on commas, so `:is(…, …)` would count as more than two selectors.
- A controlled field keeps its value in the sample's own state with a change handler (`TextFieldSample`, `SelectListSample`, `NumberFieldSample`, `FormSample`); the console holds no report of React.
- The number field has no hint; „Przycisk wybrany w grupie” is `ReactButton selected`.
- Empty number-field sample: the module's own code, after the first synchronous draw and outside React, takes the input through `inputRef` (the module constant `emptyNumberInput`) and types an empty text with the native value setter of the input's prototype and a bubbling `input` event (`typeEmptyInto`). A comment above the function and one above the call state the technique and why it stands there.
- The part of the menu „Konto” is drawn from `ReactButton` and the sentences of `email-status.ts`; its section title now reads „…część narysowana ze wspólnych kontrolek” in place of „…z postaci DOM kontrolek, bez Reacta”.

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 tests OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0, 3 tests OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0, 4 tests OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | exit 0, 9 tests OK |
| `npx eslint src/browser/kitchen-sink/kitchen-sink.tsx` | exit 0 (after the fix below) |
| `npx prettier --check src/browser/kitchen-sink/kitchen-sink.tsx src/browser/kitchen-sink/kitchen-sink.css` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run kitchen-sink -- --build-only` | exit 0; `dist/kitchen-sink/kitchen-sink/kitchen-sink.js` written |
| page in a real browser (Playwright CLI, page served by `python -m http.server` from `dist/kitchen-sink/`) | see below |
| `python -B .the-way/elements/common/foundation_check.py` | exit 1, 39 errors, all on lines of `tests/view/react-controls.test.mjs` — the known state until slice 12; no other error |

A failed run that passed on rerun: `npx eslint src/browser/kitchen-sink/kitchen-sink.tsx` first exited 1 with `@typescript-eslint/unbound-method` on `Object.getOwnPropertyDescriptor(...)?.set` held in a variable; rewritten to keep the descriptor and call `descriptor.set.call(input, "")`, rerun exit 0. No assertion or rule was changed.

No test written or changed (the slice says none). Whole `npm test` not run (the orchestrator's).

## Own-work check (section 3)

Requirement the work most likely misses: the states the page cannot hold by a prop — the forced hover and focus drawn like the game, the empty state of the number field, and no report of React on load.

Checked in a real browser, full-page screenshot at 1280 px wide (inspected, kept nowhere, not shown to the human):

- Every section draws: controls (15 rows, 7 states, the reasons for „Nie dotyczy”), ten forms, three parts of the menu, 26 roles, seven tile samples. Waiting forms and the menu part show „Logowanie…”, „Wysyłanie…” etc.; the answer to „Nie pamiętam hasła” shows its bar.
- Forced hover shows `highlight` on the control; the secondary action keeps its background and takes `text`; the destructive button shows `danger` in hover and focus. Forced focus shows the outline on the control (button, tab, pick cell, select, inputs), not on the wrapper.
- The number-field sample of the empty state: `value` `""` (the six number inputs read `12`, `12`, `12`, `12` disabled, `120` invalid, `""`). Focus then blur on it leaves it empty (`afterfocus=[] afterblur=[]`).
- Console: eleven entries, none from React: a 404 for the favicon (ordinary), one INFO of React DevTools, and Chrome's verbose hints about password fields (they stood in the old page's DOM forms too).
- At 500 px wide the page does not overflow sideways (`scrollWidth` 500, the sample panel scrolls inside: 466 visible of 1257).

## Choices

- Selector of the focus sample: the chained `:not()` above. Rejected: `.sample-focus :is(button, select, input)`, which the test counts as three or more selectors. Cost if wrong: an element of another tag inside a wrapper would get the outline; no such element stands in a sample.
- `Forced` is a `span` wrapper always rendered (without a class outside hover and focus), so the table's markup is the same in every state. Rejected: a wrapper only where forced — each sample then changes shape between states.
- Tab samples: the `tabs` container stands inside the wrapper (second commit). My first version put the wrapper inside the container, which broke the child selector `.tabs > .button.tab` of `styles.css` (the line of the selected tab lies over the thin line of the group by `margin-bottom: -frame-width`); I saw it while reviewing my own work, moved the container inside the wrapper, and checked in the browser that the eight tab buttons compute `margin-bottom: -1px` and that the focus outline stands on the button (`solid`), not on the container or the wrapper (`none`). Rejected: leaving the wrapper inside the container. The focus selector's `:not(div)` is what keeps the outline off the container.
- The number sample's rule is the page's own (`sampleNumberRule`: a number held to 0–99, other text refused), so the empty draft stays empty on focus and blur; the shared field takes the rule from the screen (D-395).
- Section title of the menu part reworded as above; the names of the samples are unchanged.
- `.sample-section { min-width: 0 }` kept as it was; no rule was added for the host, because the check at 500 px shows no overflow without one.

## Reaches beyond the handoff

- Read `tests/invariants/test_browser_view_focus_outline.py` and `tests/invariants/test_application_build_kitchen_sink.py` (the probe imports the entry module from a game file), and `src/browser/styles.css` lines 10–60, 394–650 (hover, disabled, `.input-field`, `.tabs` rules), `src/browser/view/terrain-drawing.tsx` (first 80 lines), `src/browser/view/terrain-picture.ts` (exports), `src/browser/sim/hex.ts` (exports), `src/browser/sim/program.ts` (`ConditionNumber`), `package.json` (React version), `tsconfig.browser.json`, `scripts/kitchen-sink.mjs` (read-only): to match the game's drawing of the forced states and to know what the invariant test counts. They name no decision beyond the slice's *Read*.

## Unread material

- `docs/task-cycles/przejscie-widoku-na-react/spec.md` lines 14–14 and 23–48 were read; lines 10–60 and 140–210 were read in the ranges given, so the Goals, Constraints, Decisions 5 and 6 and the Settlements are read whole. No line of the slice's spec *Read* was skipped.
- `foundations/decisions.md` entries D-44, D-45, D-47, D-157, D-274, D-275, D-276, D-289, D-43, D-265, D-267, D-269, and the invariants `application-build-kitchen-sink`, `browser-view-focus-outline`, `browser-view-token-values`, `browser-view-framework` were read whole. The handoff's "Foundation entries rows" 1, 2, 7, 8 were read as the current D-269, D-265, D-275, D-276.
- None skipped: `guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `loop2-play/SKILL.md`, all `react-*.tsx`, `menu-bar.tsx`, `email-status.ts`, `account-rules.ts`, `index.html`, `tsconfig.kitchen-sink.json`, `page-document.mjs:140-175` were read whole or (the last) the lines named.
- Foundation entries D-36, D-03 etc. in the handoff's list of current ranges that the slice's *Read* does not name were not read.

## Searches not found or unclear

- The styleguide's rule "The kitchen-sink page" and `guidelines/coding-browser-module.md` ("Strona wszystkich stanów bez Reacta") still say the page holds no React and shows DOM forms; they are the guideline slice's to change (spec Decision 8), not this slice's. Nothing in them blocked the work.
- Chrome's "Password field is not contained in a form" hints on the page are the browser's, raised by password fields of the controls table that stand outside a form; the old page raised the same. Not a report of React.

## Working copies

- `.runs/executor-2/` (worktree root): held the screenshot of the page, the server log and the logs of the checks; removed before returning. The page server (`python -m http.server 8765`) was stopped (a request to it now fails). `.playwright-cli/` in the worktree root, made by the Playwright CLI, removed. `dist/kitchen-sink/` was made by the page's own command and is ignored by git; it stays.
