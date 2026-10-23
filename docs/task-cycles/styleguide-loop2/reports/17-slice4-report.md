# Report 17 — slice 4 (every style on the tokens, the terrain per Q10, visible focus)

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit
  `74ec73214e0f45df6d1902b5a99ea0018226a032` ("feat: style the game from the design tokens in
  styles.css, draw the terrain per Q10 and keep focus visible") on the base
  `fc4fc911cca4d138a904280b567814a16c53883e`. Not pushed. Author `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` (pinned `f0b2130`), executor of a planned slice.
  Read whole: handoff 17, `task.md`, `spec.md` (8a included), `plan.md`, `cycle.md`,
  `reports/07-foundation-report.md`, `.the-way/product-guidelines/reading.md`,
  `.the-way/elements/common/way_of_working.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/tokens.css`, every
  changed file, the plan's *Read* list (`tile-list.ts`, `app.ts`, `footer.ts`, `program-editor.ts`,
  `test_application_package_layout.py`, `test_terrain_drawing_numbers.py`, the head of
  `loop2_invariant_support.py`), decisions D-19, D-28, D-32, D-36, D-38–D-47, the invariants and
  facts of the part (`browser-view-*`, `design-token-*`, `terrain-drawing-numbers`,
  `content-identifiers`, `icon-*`, `wcag-focus-visible`, `css-colour-values`), part map
  `browser-view` and *External context*.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` (new) | 248 | 0 |
| `src/browser/index.html` | 2 | 170 |
| `src/browser/view/terrain-panel.ts` | 13 | 0 |
| `tests/invariants/test_browser_view_token_values.py` (new) | 561 | 0 |
| `tests/invariants/test_browser_view_focus_outline.py` (new) | 167 | 0 |

Exactly the slice's *Change*. Logs of every run below stand in
`.runs/task-cycles/styleguide-loop2/reports/slice4-logs/` (ignored by git).

## What the change does

- `src/browser/styles.css`: every style of the former `<style>` block, each value Q15 counts read by
  `var(--…)`: dark theme on the present layout (`page` body, `panel` columns framed in `divider`,
  `text` content, `text-strong` headings, names and the list's numbers, `text-label` column heads,
  `text-secondary` footer); Geist for the page, Geist Mono for `.status-text` (the run's clock
  „Minuta N · …”); sizes `game-title`, `heading`, `body`, `detail`; spacing on the scale; weights
  400/500 only; no rounding. Terrain: tiles `tile-hidden`/`tile-revealed`, edge `tile-edge` at
  `--frame-width`, character outline `character` at `--character-outline-width`, step target
  `character` at `--step-target-width` with `--step-target-dash`, dimmed icons at `--depleted`, the
  hover fills removed; link highlight `link-highlight` at `--link-highlight-width` around the tile
  and as the left border of the row's first cell. One rule `:focus-visible` from `--focus`,
  `--focus-width`, `--focus-offset` — the only `outline` declaration. Kept as layout (D-43):
  `line-height: 1.4`, `min-height`, `max-width`, `height`, `width: 4em`, the 720 px `@media`, the
  grid columns.
- `src/browser/index.html`: no `<style>`, no `style` attribute; links `/tokens.css` then
  `/styles.css`.
- `src/browser/view/terrain-panel.ts`: one polygon `outline link-highlight` with the hovered tile's
  points, appended last to the drawing on every hover and redraw (above every tile and outline),
  removed when nothing is hovered; it carries no `data-tile` and no pointer events, so the drawing
  stays a picture with hovering its only interaction (D-19).

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B -m unittest discover -s tests/invariants -p "test_browser_view_token_values.py"` before the stylesheet (first version of the test, present `index.html`) | 1 | 1 failure: 55 findings, all in `src/browser/index.html` (first: `line 13: padding: the length 16px`); the 3 control tests pass |
| `… -p "test_browser_view_focus_outline.py"` before the stylesheet | 1 | 1 failure: `src/browser/styles.css holds no rule :focus-visible drawing its outline from the role focus`; controls pass |
| both again with the final test files, on the base's `index.html` and `styles.css` moved aside (restored after) | 1, 1 | same reasons as above |
| `npm run build` | 0 | `dist/public/styles.css` and `tokens.css` present |
| `… -p "test_browser_view_token_values.py"` after | 0 | 4 tests OK |
| `… -p "test_browser_view_focus_outline.py"` after | 0 | 3 tests OK |
| `node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 173 pass, 0 fail |
| `… -p "test_terrain_drawing_numbers.py"` | 0 | OK |
| `… -p "test_browser_view_framework.py"` | 0 | OK |
| `… -p "test_content_identifiers.py"` | 0 | OK |
| `… -p "test_design_token_contrast.py"` | 0 | OK |
| `… -p "test_design_token_sources.py"` (not in the plan; same file family) | 0 | OK |
| `… -p "test_application_build_output.py"`, `… -p "test_application_package_layout.py"` (not in the plan; the build output gains a file, and row 11's test imports the owner resolution) | 0, 0 | OK |
| `python -B .the-way/gate/run_tests.py tests/quality` | 1 then 0 | first run: Ruff SIM905 ×3 (`"""…""".split()` colour lists) and SIM114 (focus test); fixed by literal tuples and one condition; second run 27 tests OK (ESLint, Prettier on `styles.css`, `index.html`, `terrain-panel.ts`; Ruff on both tests) |
| `python -B .the-way/elements/common/foundation_check.py` (after `git add`, before commit) | 1 | 5 errors, exactly the plan's table after Slice 4: `src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (trust boundary), `src/browser/AGENTS.md` |

Deliberate breaks of the finished code, each restored before the commit (`git diff` showed only the
intended change afterwards):

| Break | Test | Exit and reason |
|---|---|---|
| `:focus-visible` drawn from `var(--text)` | focus outline | 1 — "the rule ':focus-visible' does not draw its outline from the role focus" and "styles.css holds no rule …" |
| `button { outline: none; }` appended | focus outline | 1 |
| `fill: #71717b` for revealed tiles | token values | 1 |
| `stroke-width: 1` for tiles | token values | 1 |
| `stroke: "white"` in the hover line's attributes (`terrain-panel.ts`) | token values | 1 — `terrain-panel.ts: line 37: in a literal: the colour white` |
| `style="background: #09090b"` on `<body>` | token values | 1 |

The colour lists in the test were compared by a script with the lists extracted from the
downloaded page (148 named, 19 system, 23 deprecated system colours): equal.

Not run: `npm test` whole (the cycle's run before the request); container tests (nothing of the
image changed).

## Own-work check (section 3)

- Requirement most likely missed: the look the plan asks for in a real browser — Q10's 1.5 px link
  line "around the tile and at the left edge of its row", above its neighbours, with no change of
  the tile's colour; focus visible on every control, links included; the dark theme on loop2's
  layout.
- Check: Playwright (the harness's MCP browser) on `npm start` after `npm run build`, 1440×900 and
  390×844, screenshots in `reports/shots/slice4/` (`s4-01-send-panel.png` … `s4-07-narrow.png`),
  plus computed styles read in the page.
- Result:
  - fonts: `Geist 400/500 loaded`, body `Geist, sans-serif` 13 px; `.status-text` `"Geist Mono",
    monospace`; stylesheets `/tokens.css`, `/styles.css` loaded; the only console error is the
    base's `favicon.ico` 404;
  - terrain (`s4-04`, paused with a step target): dark hidden tiles, grey revealed tiles, yellow
    4 px character outline, yellow dashed step target;
  - hover of tile (2, 0) (`s4-05`): the line polygon is the drawing's last child, same points as the
    tile, stroke `rgb(244, 244, 245)` 1.5px, `pointer-events: none`; tile fill unchanged
    `rgb(113, 113, 123)`; the row's first cell shows the left line; the row's background stays
    transparent. Hover of row (1, 0) (`s4-06`) draws the line on the character's tile, inside its
    yellow outline;
  - focus (`s4-02`, `s4-03`, `s4-07`): Tab to „Dodaj regułę”, the condition select after Enter,
    and a footer link each show a 2 px `#f4f4f5` outline offset 2 px;
  - 390 px: one column, no horizontal scroll (`scrollWidth` 390).
- Seen and not changed:
  - the row's left line computes to `border-left: 1.33333px` in that browser: the browser snaps
    border widths to device pixels, so the row's line is not drawn at exactly 1.5 px while the
    tile's stroke is (see *Concerns*);
  - the icons stay dark (`#2b2b2b`) on the grey tiles and dark list head — Slice 5 recolours them;
  - the native drop-down list of a select (its options popup) was not opened in the screenshots:
    unchecked; it gets `color-scheme: dark` and `option` colours `text` on `panel`.

## Choices, with the way rejected and the cost if wrong

1. **Native controls get the default and hover look of Q12 now** (`button, select, input`: no
   background, `text`, frame `control-border`; hover `highlight`), so the dark theme is usable
   before Slice 6. Rejected: leaving the browser's light controls on the dark page until Slice 6.
   Cost: Slice 6 moves these rules onto its controls' selectors; disabled, error, empty,
   destructive and selected stay Slice 6's.
2. **`color-scheme: dark` on `:root` and `select option { color: var(--text); background:
   var(--panel); }`** for the browser-drawn parts (option popups, number spinners). Rejected:
   nothing for them — a light popup with light text. Cost: one rule to revisit in Slice 6.
3. **Row link line as `border-left` of the row's first cell, transparent until hovered** (no layout
   shift). Rejected: an inset `box-shadow` (exact 1.5 px, but Q11 says no shadows); a row
   background in `highlight` beside the line (Q10 names only the line). Cost: see the 1.33 px
   observation.
4. **Hover line as one polygon re-appended last** in `terrain-panel.ts`, its points kept per draw
   in a map from tile key. Rejected: drawing the line in the tile group (covered by later
   neighbours, as the plan foresaw). Cost: none in behaviour; `test_terrain_drawing_numbers.py`
   passes (its stand-in document has `remove`).
5. **Size and weight mapping:** h1 `game-title` 16 px weight 500 (was 1.6rem); h2 `heading` 14 px;
   body `body` 13 px; footer `detail` 12 px (was 0.85rem); 600 → `--font-weight-emphasis` 500;
   `normal` → `--font-weight-body`; `.rules` `padding-left: 1.6em` (≈ 21 px) → `--space-xl` 24 px
   (nearest step); radius 6 px dropped (Q11, no rounding).
6. **Roles of present texts:** list numbers `text-strong` (Q4: the near-white of numbers), column
   heads `text-label`, row labels `text`, footer `text-secondary`, footer links `inherit`.
7. **Row 11's test reads font names with lists from CSS Fonts 4 and CSS Cascade 5.** D-43 exempts
   keywords, so a generic family (`sans-serif`, `system-ui`) or `inherit` is no font name; telling
   them from family names needs those lists. Taken from
   https://www.w3.org/TR/2026/WD-css-fonts-4-20261022/ § 2.1.5 and
   https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/ § 7.3, read 2026-10-23, cited in the test.
   Rejected: flagging every identifier of `font-family` (would flag keywords D-43 exempts).
8. **Test sharing:** row 11's test imports `file_owners` from `test_application_package_layout.py`
   (the resolution the spec names); row 12's imports `blocks` and `part_files` from row 11's (as
   `tests/quality/test_process_observation.py` imports a test module). Rejected: copying the
   readers, or moving them into `loop2_invariant_support.py` (outside *Change*). Cost: a change of
   row 11's reader reaches row 12's test.
9. **Readings within Decision 8:** zero lengths (`0px`) exempt as `0`; a `var()` fallback is a
   value; a custom property declared outside the token file is read; layout exemption by property
   name only (`width`, `height`, `min-/max-`, `grid-template[-columns|-rows]`), so logical
   `inline-size` is not exempt; `font` shorthand: strings, lengths and a weight not after `/` are
   read, unquoted family identifiers are not (named in *Does NOT cover*). Row 12: property names
   compared lower-case, selector compared with white space collapsed and lower-case, "drawn from
   focus" = `outline` or `outline-color` reading `var(--focus)`.

## Concerns the next dispatch depends on

1. **Row line at 1.33 px.** The browser drew the row's left line at `1.33333px` (border width
   snapped to device pixels), the tile's line at 1.5 px. Q10/Q19 C say 1.5 px. The reviewer judges
   whether that holds; an exact 1.5 px would take a `box-shadow` (against Q11's "bez cieni") or a
   positioned pseudo-element.
2. **Two sources outside the foundation in row 11's test** (CSS Fonts 4 generic families, CSS
   Cascade 5 CSS-wide keywords). `browser-view-token-values` *Rests on* names only
   `css-colour-values`. Recommendation: the return step adds an environment fact (or widens
   `css-colour-values`' sibling) for these two lists and cites it in *Rests on*.
3. **Slice 6 starts from element selectors** `button, select, input` (default, hover) and
   `.rule button` padding in `styles.css`; it should move them onto its controls rather than add a
   second set.
4. **Not covered by row 11's test, review's:** SVG presentation attributes in HTML, unquoted family
   names in `font`, `color-mix()`/`light-dark()` (CSS Color 5, not in the fact's list).
5. **Known false positive of row 11's test:** a TypeScript string holding a word such as „Menu” or
   „Window” (deprecated system colours) or `#add` (a hex-looking id) is reported, as FE-2 accepted;
   none stands in the code today.
