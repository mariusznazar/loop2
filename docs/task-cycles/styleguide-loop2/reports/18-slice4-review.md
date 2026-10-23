PASS 74ec73214e0f45df6d1902b5a99ea0018226a032

# Review 18 — slice 4 (every style on the tokens, the terrain per Q10, visible focus)

- **Range:** `fc4fc911cca4d138a904280b567814a16c53883e..74ec73214e0f45df6d1902b5a99ea0018226a032`, one
  commit, author `<private address>`; `git rev-parse HEAD` in the task worktree = the given head.
- **Method:** `.the-way/task-cycle/review/SKILL.md` at the pinned `f0b2130` (gitlink and checkout agree).
- **Read whole:** handoff 18, `task.md`, `spec.md` (8a included), `plan.md`, `cycle.md` (questions
  table: R1, FE-2, S1-I1, QA-1, QA-2 bind), `reports/17-slice4-report.md`, `AGENTS.md`,
  `.the-way/product-guidelines/reading.md`, "Reading the foundation" of
  `.the-way/elements/common/way_of_working.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `foundations/part_map.md`, D-19,
  D-27–D-32, D-38–D-47, invariants `terrain-drawing-numbers`, `browser-view-token-values`,
  `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`,
  `application-build-kitchen-sink`; `src/browser/tokens.css`, `src/browser/view/tile-list.ts`,
  the changed files whole, and the executor's seven screenshots.
- **Blocking:** 0. **Minor:** 7. **Out of scope:** 0.

## Findings

### Critical

None.

### Important

None.

### Minor

**m1 — Hovering an unrevealed tile draws the `link-highlight` line although that tile has no row.**
Place: `src/browser/view/terrain-panel.ts:80-82` fills `tilePoints` with every tile of the picture,
hidden ones included; `:65-71` draws the line for any hovered key found there. The list holds rows
only for revealed tiles (`src/browser/view/tile-list.ts:41-42`). What the player sees: a white line
around a tile they do not know yet, with no row in the list lit beside it. D-41 gives
`link-highlight` one meaning — "this tile and this row of the list of revealed tiles are the same
place" — and the styleguide's rule "Each role in its meaning" asks review to read each role against
its decision; on a hidden tile the line marks a link that does not exist. Evidence: own browser
check (below) — hover of hidden tile `2,2` put the polygon `outline link-highlight` last in the
drawing, stroke `rgb(244, 244, 245)` 1.5px; screenshot showed the white hexagon on the dark tile.
Grade by effect: a hover cue that promises a row and finds none; nothing wrong is shown or done,
and the base also marked hidden tiles on hover (`fill: #57554c`), so the player loses nothing
against today. Fix, if taken: keep in `tilePoints` only tiles that have a row (revealed), or skip
the line when the hovered tile is not revealed.

**m2 — The row's line renders at 1.33 px, not the 1.5 px of Q19 C.** Place:
`src/browser/styles.css:221-230` (`border-left: var(--link-highlight-width) solid transparent`, coloured
on `tr.hovered th`). Own check at device pixel ratio 1 read `border-left-width: 1.33333px` (the
executor read the same); the tile's SVG stroke reads 1.5px. Effect on the player: two thin lines of
the same colour, one a third of a pixel thinner; the link reads the same. The token holds 1.5px and
the stylesheet reads it; the difference is the browser's rounding of a table-cell border. Minor.
An exact width would take a positioned pseudo-element (a `box-shadow` is against Q11's "bez cieni").

**m3 — Text sizes of three present elements differ from the uses Q11 gives the sizes.** Place:
`src/browser/styles.css:66-72` (`button, select, input { font: inherit }` → body 13 px; Q11:
"12 px (przyciski, …)"); `:211-215` (`.tile-list thead th` in `text-label` at 13 px; Q11: "11 px
(daty, etykiety)"); `:123-126` (`.send-character`, the character's name, 13 px; Q11: "14 px
(nazwy, …)"). `--font-size-label` and `--font-size-map-title` are unused. The spec leaves "which
text size … each present style maps onto" to the maker, so no requirement is missed; but the token
file's own sources name these uses (`tokens.css:52-55`), and a later screen copying these rules
spreads the mismatch. Effect on the player: controls and column heads a pixel or two larger than
the look the task starts from. Slice 6, which restyles the controls, is the natural place to give
them `--font-size-detail`.

**m4 — The hover line covers the step target's dashes while that tile is hovered.** Place:
`src/browser/view/terrain-panel.ts:70-71` appends the 1.5px solid line last, on the same points as
the 2px dashed `step-target` outline (`styles.css:186-190`). By geometry (same path, centred strokes)
the white line hides all but 0.25px of each yellow dash on either side, so while the pointer rests on
the step target's tile the dashed yellow mark reads as a solid white line. Not observed: no step
target stood in my own run (the character waited, "żadna reguła nie pasuje"); the executor's
`s4-06` shows the same overlay on the character's 4px outline, where the yellow stays visible on
both sides. Effect: transient, only under the pointer; the row line still shows the link. Minor.

**m5 — The token-values test's population control does not name the stylesheet.** Place:
`tests/invariants/test_browser_view_token_values.py:536-544` asserts `index.html`, `main.ts`,
`app.ts`, `terrain-panel.ts`, but not `src/browser/styles.css`, the file holding nearly every value
the invariant guards. Were the part map's `src/browser/*.css` line lost, the main test would pass
with the stylesheet unread. The focus test's control
(`tests/invariants/test_browser_view_focus_outline.py:149-156`) asserts every `src/browser/*.css` in
the same `part_files()`, so today the loss would still fail `npm test`; the gap is that the token
test does not show its own population is right. One more `assertIn` closes it.

**m6 — Two lists in row 11's test come from sources the foundation does not hold.** Place:
`tests/invariants/test_browser_view_token_values.py:122-126` — generic families of CSS Fonts 4
§ 2.1.5 and CSS-wide keywords of CSS Cascade 5 § 7.3, cited with URL and date in the test;
`browser-view-token-values` *Rests on* names only `css-colour-values`. The lists are correct as far
as I know them and decide what counts as a font name (D-43 exempts keywords), so the test rests on
them; by cycle step 11 a source outside the product that a check rests on is an environment fact.
Executor's concern 2. For the return step: one fact for both lists, cited in *Rests on*.

**m7 — Coverage gaps of the two tests, confirmed by probe; review covers them, and Slice 7 meets
the first.** Probes of the tests' own `findings()` (scratch script, below):
- `<svg><polygon fill="red"/></svg>` in an HTML file → no finding (presentation attributes in HTML
  are outside the spec's "CSS text"; documented in the docstring). The kitchen-sink's tile samples
  (Slice 7) drawn as SVG in its HTML with `fill="#71717b"` would pass the test unseen.
- `stroke: color-mix(in srgb, var(--a), var(--b))` → no finding (CSS Color 5, outside the fact;
  documented).
- `:focus-visible { outline: var(--focus-width) solid var(--focus); outline-width: 0; }` → no
  finding: focus switched off inside the one allowed rule passes, as the invariant's wording allows
  (D-47 leaves "an outline turned off in an unusual way" to review).
- `el.style.outline = "none"` in TypeScript → no finding (documented; D-47, review).
Each matches the spec's Decision 8 reading and the docstrings' *Does NOT cover*; none occurs in the
range. Minor, named so later reviews look there.

## Checked and found right

- **Requirement of the slice (plan Slice 4, To do 3, 5, 6 in part; Q10, Q19 C, Q11):** every rule of
  the base's `<style>` block has its counterpart in `styles.css` (compared rule by rule); every
  value D-43 counts reads a `var(--…)`; layout values kept as D-43 exempts them (`line-height: 1.4`,
  `min-height`, `max-width`, `height`, `width: 4em`, the 720 px `@media`, grid columns, `100vh`).
  `index.html` has no `<style>` and no `style` attribute and links `/tokens.css` then `/styles.css`.
  Geist via `--font-family-text` on `body`, Geist Mono on `.status-text`, the run's clock. Tiles in
  `tile-hidden`/`tile-revealed`, edge `tile-edge` at `--frame-width` (QA-2), character 4px and step
  target 2px with `5 4` in `character`, dimmed icons at `--depleted`, hover fills of the base
  removed, so the tile's colour does not change on hover (D-41 *violates* example avoided).
- **Backgrounds with their text:** `body` `page`+`text`; `.program-panel, .map-column`
  `panel`+`text`; control hover `highlight` keeping the control's `text` (rule 2, S1-I1, D-40
  *complies* example); `select option` `panel`+`text`. Text roles: headings and names
  `text-strong`, list numbers `text-strong` (Q4, numbers), column heads `text-label`, footer
  `text-secondary`, links `inherit` — each within D-40's meanings.
- **Q12 default look of controls:** no background of their own (`transparent`), `text`, frame
  `control-border`; selected, destructive, disabled, error, empty left to Slice 6 as the plan says.
- **Focus (D-47, row 12):** one `:focus-visible` rule from `--focus`, `--focus-width`,
  `--focus-offset`; no other `outline`/`outline-*` in `styles.css` or `tokens.css`; no `outline` set in
  TypeScript (`grep` over `src/browser/**/*.ts`: only the picture's field and the `.outline` class).
- **D-19:** the hover line carries no `data-tile` and `pointer-events: none` (via `.outline`), no click
  handler added; hovering stays the drawing's only interaction. Line removed when the pointer leaves
  (own check), re-appended after every redraw (`update` → `markHovered`).
- **Trust boundaries** (`assets/icons/**`, `assets/fonts/**`, `scripts/kitchen-sink.mjs`): the range
  touches none. `styles.css` holds no `url()` and no `@font-face`, so fonts load only from the token
  file's `/fonts/` rules (D-46).
- **New invariant tests** (none changed): `tests/invariants/test_browser_view_token_values.py` and
  `tests/invariants/test_browser_view_focus_outline.py` cite their invariants, read text only (no
  build, no cascade), follow spec Decision 8 and 8a (R1: `transparent`/`currentColor` exempt; FE-2:
  deprecated system colours counted, `-`/`_` word characters; role names no colour in TS). Both fail
  on the base's files (own run below) and pass on the head; their made-up probes flag each listed
  kind and pass each exemption. They do not compute their own expected values.
- **Author's own-work check:** it names the look in a real browser — where this slice is weakest —
  and its Playwright run would catch a missing line, fill or focus; it did not look at hidden tiles
  (m1).
- **Screenshots** `reports/shots/slice4/s4-01` … `s4-07` judged against Q10, Q19 C, Q11: dark theme
  on loop2's layout, grey revealed tiles, yellow 4px outline, yellow dashed target, white 1.5px
  hover line with the tile's grey unchanged, row line at the left, 2px white focus ring offset 2px
  on a button, a select and a footer link, one column at 390 px with no horizontal scroll. Icons dark
  until Slice 5, as planned.

## Declined to judge

- Icons still `#2b2b2b` on grey tiles and the footer still saying „ciemny kolor” — Slice 5's
  *Change* (plan), not this slice.
- Destructive „Zakończ”/„Restart”/„Usuń” in `danger`, selected, disabled, error and empty states, and
  the two button paddings (`button` 4/12 px, `.rule button` 2/8 px; audit fault 3) — Slice 6.
- The kitchen-sink stylesheet's second selector — Slice 7.
- The native drop-down list of a `<select>` when opened (browser-drawn popup) — not opened by the
  executor or by me; `color-scheme: dark` and `select option` colours are set; left unverified, not
  set aside.

## Checks run

| Check | Where | Exit and result |
|---|---|---|
| `git rev-parse HEAD`; `git log`/`git diff fc4fc91..74ec732` | task worktree | head = given; one commit; 5 files = slice *Change* |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | task worktree | both `f0b2130…` |
| `python -B -m unittest discover -s tests/invariants -p "<file>"` for `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_terrain_drawing_numbers.py`, `test_browser_view_framework.py`, `test_content_identifiers.py` | task worktree (read only) | 0 each |
| `python -B .the-way/elements/common/foundation_check.py` | task worktree | 1; exactly 5 errors: `src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (trust boundary), `src/browser/AGENTS.md` — the plan's table after Slice 4 |
| `npm run build` | temporary worktree of `74ec732` (node_modules and quality venv linked read-only) | 0; `dist/public/styles.css`, `tokens.css`, `fonts/` present |
| `node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | temporary worktree | 0; 173 pass, 0 fail |
| `python -B .the-way/gate/run_tests.py tests/quality` | temporary worktree | 0; 27 tests OK (ESLint, Prettier on `styles.css`/`index.html`/`terrain-panel.ts`, Ruff on both tests) |
| Base files restored (`git checkout fc4fc91 -- src/browser/index.html src/browser/view/terrain-panel.ts`, `styles.css` removed), the two new tests run | temporary worktree | token values 1 (55 findings in `index.html`); focus outline 1 ("styles.css holds no rule :focus-visible …"); files restored, `git status` clean |
| Probe script importing both tests' `findings()` on made-up text (m7 cases, population check) | scratch, read only | 0; population holds `src/browser/styles.css` and `index.html`, no sim file; results as m7 |
| Manual: Playwright on the head's `node dist/server/main.js` at 127.0.0.1:38471, 1440×900, DPR 1 | temporary worktree | hidden tile `2,2` hovered: line drawn last, `rgb(244, 244, 245)` 1.5px (m1); row `1,1` hovered: `border-left` 1.33333px `rgb(244, 244, 245)`, row background transparent (m2); pointer moved off: line removed. Server stopped, temporary worktree removed |

Not run: `npm test` whole (the cycle's run before the request); container tests (nothing of the image
changed); a hover of the step target's tile (none appeared in my run; m4 rests on geometry).
