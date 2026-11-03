# Report — slice 1 of task `przyciski-i-zakladki`

**Status:** done

**Commit:** `14d07fc` — `feat: :sparkles: add the secondary action and the tab to the shared button and draw the main button, the sentence under a form and the tabs from the tokens` (on `claude/lucid-ptolemy-jl068t`, base `707738f`, not pushed).

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `/home/user/loop2/src/browser/view/controls/button.ts` | 15 / 5 |
| `/home/user/loop2/src/browser/view/controls/react-button.tsx` | 10 / 2 |
| `/home/user/loop2/src/browser/view/controls/text-field.ts` | 3 / 2 |
| `/home/user/loop2/tests/view/react-controls.test.mjs` | 111 / 0 |
| `/home/user/loop2/src/browser/styles.css` | 85 / 3 |
| `/home/user/loop2/src/browser/tokens.css` | 1 / 1 |

## What was made

- **Both forms of the control (D-265).**
  - DOM: `ButtonKind` gains `"secondary"` and `"tab"`; `createButton(text, { kind })` adds the class `secondary` or `tab`. A tab's group sets the choice with the existing `setButtonSelected`, so the class is `button tab selected` and `aria-pressed` is kept.
  - React: `ReactButton` gains `kind?: "secondary" | "tab"`; the class is built as `button`, kind, `selected`, in that order, which is the order the DOM form produces.
  - No new option for the main button; it is the existing `type="submit"`.
- **`styles.css`**
  - Main look: `.button[type="submit"]` (text-strong, `--font-weight-emphasis`, `currentColor` frame); the hover is the existing `highlight` rule. `.button[type="submit"]:disabled` gives normal weight and `control-border`; the colour comes from the existing disabled rule.
  - Secondary action: `.button.secondary` (text-secondary, underline, no frame at the sides, no padding at the sides); hover in `text` with the background kept transparent; disabled by the existing rule.
  - Tab: `.button.tab` (text-label, `--font-size-body`, no frame, a transparent bottom line of `--bar-width`); `.button.tab.selected` (text-strong, emphasis weight, line in `selected`); `.button.tab:disabled` (text-disabled, the line kept); the hover is the existing `highlight` rule. `.tabs` (class for a screen to set on the tabs' container) draws the `divider` line of `--frame-width` under the group, and `.tabs > .button.tab` has `margin-bottom: calc(-1 * var(--frame-width))`, so the selected tab's line lies over the group's line.
  - `.form-note`: `text`, a left bar of `--bar-width` in `currentColor`, `padding-left: var(--space-s)`.
  - The block comment of the shared controls and the comments of the changed rules say how things look now. The pace buttons and other selected buttons are not touched (`.button.selected` is unchanged; computed style of a `.selected` button checked, see below).
- **`createFormNote`** comment: says the sentence stands in `text` with a bar and no longer promises announcement; the element (`role="status"`) is unchanged. The header of `button.ts` is rewritten for five kinds plus the main look.
- **`tokens.css`:** `--bar-width` keeps 2px; its `Source:` now also covers the sentence's bar and the tab's line, with "Mariusz's choice from the preview of the variants of the card, 2026-11-02, in the task przyciski-i-zakladki (To do 7)".

## Checks (command → exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/react-controls.test.mjs`, **before** the code, five new cases written first | 1 — five failures, each an assertion for the expected reason: `expected "button secondary", got "button"` (x2), `expected "button tab selected", got "button selected"` (x2), `expected "button tab", got "button"` |
| `npm test -- tests/view/react-controls.test.mjs`, after | 0 (29 tests, 29 pass) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (100 pass) |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npx prettier --no-config --no-editorconfig --check` on the six changed files | 0 |

No invariant's test was added or changed, so there is no new invariant-test failing run. The full `npm test` was not run (handoff: the cycle runs it).

The new cases write the expected class literally (`button secondary`, `button tab selected`, `button tab`) and the expected `aria-pressed`, since two forms that both ignore the new option would agree. Cases: secondary at rest, secondary locked, tab selected, tab not selected, tab locked (both selected and not).

## Own-work check (section 3)

**Requirement most likely missed:** the looks (pytania 1a, 2c, 3) are in CSS only, which the unit tests (jsdom) do not draw. The check: a scratch page (in the scratchpad, not in the repo) with the real `dist/public/tokens.css` and `styles.css`, opened in Chromium through the Playwright library (`playwright-cli` is not installed; orchestrator's choice Q4; no local-start was used, the page was served by `python3 -m http.server`), reading `getComputedStyle` in each state, and a screenshot (`/tmp/claude-0/-home-user/3ebadaf3-39b4-5e1f-a5be-1c18fe7c07c8/scratchpad/shot.png`). Result, all as the task gives:

- Main, rest: colour `#f4f4f5` (text-strong), weight 500, frame 1px in the same `rgb(244,244,245)`, no fill. Hover: background `rgb(39,39,42)` (highlight), colour and frame unchanged. Waiting: colour `rgb(82,82,92)` (text-disabled), weight 400, frame `rgb(113,113,123)` (control-border).
- Secondary, rest: colour `rgb(159,159,169)` (text-secondary), underline, left and right border 0, left padding 0. Hover: `rgb(212,212,216)` (text), background transparent. Disabled: text-disabled, underline kept.
- Tab selected: `rgb(244,244,245)`, weight 500, 13px, bottom line 2px `rgb(212,212,216)` (selected), other sides 0. Unselected: `rgb(141,141,151)` (text-label), bottom line 2px transparent. Hover (unselected): background highlight. Disabled: both in text-disabled, the selected one's line kept in `selected`. Group line: 1px `rgb(39,39,42)` (divider).
- Sentence: `rgb(212,212,216)` (text), left bar 2px in the same colour.
- A `.button.selected` (pace button) is unchanged: `rgb(244,244,245)`, frame 1px `rgb(212,212,216)`.
- The screenshot shows the selected tab's line lying over the group's line, the sentence with its bar, and the three disabled states.

I did not check keyboard focus in a browser (the one `:focus-visible` rule is unchanged and the focus-outline test passes), nor the login card on the game (not changed in this slice), nor a dark-mode or narrow-window rendering beyond the 480 px scratch viewport.

Mutations considered: dropping `kind` from the React class (caught by the five new cases); `selected` before the kind in the class order (caught by the exact class literals); a kind added in only one form (caught by the tree comparison); a wrong colour or width in the CSS (not caught by any test; the browser check above is the only evidence).

## Choices made

1. **React prop `kind: "secondary" | "tab"`** instead of two booleans `secondary` and `tab`. Rejected: booleans allow both at once and do not mirror the DOM `kind`. Cost if wrong: a rename in one component and its callers (none yet).
2. **A tab does not set `aria-pressed` itself** in the DOM form: `kind: "tab"` only adds the class, and the group calls `setButtonSelected` for each tab, as it does for any group button. Rejected: `kind: "tab"` setting `aria-pressed="false"` on creation (the React form with `selected` left out would differ). Cost if wrong: a screen that forgets to call `setButtonSelected` draws an unselected tab with no `aria-pressed`.
3. **The class for the tabs' container is named `tabs`** (the task leaves the name open: "through a class a screen sets on the tabs' container"). Slice 2 sets it on `.account-card-switch`.
4. **The secondary action keeps the button's height** by a transparent 1px top and bottom line, with the side lines at 0, and the tab keeps its place for the line by a transparent 2px bottom line, so the layout does not jump when the choice changes. Rejected: `border: 0`, which makes the secondary action 2px lower than the button it replaces. Cost if wrong: a 2px difference.
5. **`padding-left: var(--space-s)` on `.form-note`** between the bar and the text. The task names the bar but not the gap; the value is a step of the existing spacing scale, no new token. If Mariusz wants another step, it is one word.
6. **Negative bottom margin of the tabs** (`calc(-1 * var(--frame-width))`) so the line of the choice lies over the group's line, rather than the two lines stacking (3px). A value in `calc` of a token, not a literal. Rejected: stacked lines. Cost if wrong: the tabs' hover background covers 1px of the group's line.
7. **A disabled selected tab keeps the emphasis weight** (the task says "text in `text-disabled` with the line of the choice kept" and names no weight; the main button's "normal weight" is named only for the main button).
8. **Trailer of the commit:** `Co-Authored-By: Claude Sonnet 5.5` per the attribution reminder of this session, not "Claude Opus 5.5" as the handoff's text has it; the session line is the one the handoff gives.

No value was missing: no new token, no new colour, no value chosen that the task does not give except the spacing step of choice 5.

## Reaches beyond the handoff (section 1)

- I read whole: the method `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, and the five guideline files named, plus `foundations/decisions.md` D-44 (changed), D-222 (changed), D-274, D-275, D-276 and D-279 (the foundation entries of the plan's rows).
- I did **not** open the rest of the decision and invariant ranges the handoff lists (D-28, D-36, D-38..D-43, D-47, D-48, D-73, D-77, D-81, D-87, D-88, D-264, D-265, D-267, D-268, D-270; the invariants file ranges; `part_map.md`; `glossary.md`). I relied on the guidelines that cite them and on the invariant tests, all of which pass. Not read: the plan file and the whole task (not needed, the handoff carries the slice).
- Reaches: `grep` in `src` for every user of `ReactButton`, `createButton`, `form-note`, `account-card-switch` (to see that nothing else uses the new kinds and which buttons are `submit`); `tests/invariants/test_browser_view_token_values.py` and `test_design_token_sources.py` headings (to know what a `Source:` entry and `border-left: ... currentColor` must satisfy); `src/browser/kitchen-sink/kitchen-sink.css:1-25` (read as the handoff lists it); `/opt/node-tools/node_modules/playwright` for the browser check (the repository has no `node_modules/playwright`).

## Searches not found or unclear

- The task does not name the class for the tabs' container, the React prop for the new kinds, nor the gap between the sentence's bar and its text (see choices 1, 3, 5).
- The task gives no weight for a disabled selected tab (choice 7).
- "At rest the card's background" for the main button: I read it as no fill of its own (`background: transparent`, which the shared button already has), so the card's panel shows through. If "the card's background" meant `--panel` set explicitly, the result is the same on the card but differs on another background.

## Problems and notes for later slices (observed, not fixed here)

- `src/browser/kitchen-sink/kitchen-sink.ts:248` still says the request form's sentence is "shown in `text-secondary`": stale after this slice; belongs to the slice that updates the kitchen-sink page.
- `src/browser/kitchen-sink/kitchen-sink.css:14-18`: `.button.sample-hover` sets `background: var(--highlight)` at specificity (0,3,0). A secondary action's hover sample needs `color: var(--text)` and `background: transparent` under its own selector, or the sample will show a highlight the real hover does not draw.
- The login card does not yet use the new kinds or the `tabs` class (`/home/user/loop2/src/browser/view/account-card.tsx:251-262, 312, 444, 516, 584-601`): "Nie pamiętam hasła", "Wróć do logowania", "Anuluj" are plain buttons and the switch is `selected` buttons, with no `tabs` class. What changes on the card after this slice is the main look of its three submit buttons and the sentence under "Nie pamiętam hasła" (the shared rules). `/home/user/loop2/src/browser/styles.css` `.account-card-switch` still says "two buttons selected in their group".
- The tab's group line relies on the tabs being direct children of the container with `.tabs` and a flex container (`.account-card-switch` is). Checked in the scratch page with `class="tabs account-card-switch"`.
- Every `type="submit"` button now has the main look: only the card's forms and the kitchen-sink page's form samples use `submit: true` (grep), so nothing else in the game changes.
