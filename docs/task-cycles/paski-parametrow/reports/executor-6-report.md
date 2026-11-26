# Report — executor of slice 6 — task `paski-parametrow`

**Status:** done with concerns

The concerns are observations for the orchestrator and the later slices, none of them a failing check: see "Concerns".

## Files and commits

Commit `d5dcff73` on `task/paski-parametrow` (base `3107f6f7`):

| File | Added | Removed |
|---|---|---|
| `src/browser/run-screen.css` | 107 | 17 |
| `src/browser/view/body-row-cells.tsx` | 110 | 19 |
| `tests/view/body-row-cells.test.mjs` | 328 | 50 |

## What the slice made

- `BodyRowCells` draws from `bodyRowCells(run, map)` (slice 5): temperature, satiety and nature energy as `ReactButton kind="value-cell"`, health as `div.value-cell-static` with `ValueCellParts`; the four cells in two `div.body-cell-pair` (temperature + satiety, health + nature energy) inside `div.body-cells`; the backpack stays `p.backpack-text` under the cells.
- Bars: `--share` = share / 100 (bodyRowCells gives percent, the shared button takes 0–1); fill roles satiety `satiety-fill`, health `positive`, nature energy `text-strong`.
- Temperature scale (`span.body-scale` inside `.value-cell-scale`): three `span.body-scale-zone` (`chill`, `safe`, `overheating`), each `flex-grow` from `--zone-share` = the zone's share from `temperatureZones()` (so 5 : 4 : 2 comes from the data, not from CSS), a gap of `--frame-width` between zones through which `panel` shows, and `span.body-scale-marker` in `scale-marker`, `--bar-width` wide, as high as the scale (`2 × --bar-width`), at `left: calc(var(--share) * (100% - var(--bar-width)))` so it never crosses the right end. The zone the marker stands in carries the class `holds-marker` — a hook for slice 8's pulse of "the marker together with the zone it stands in".
- Marks through the shared button's `marks` (and the same classes on the health block): `alarm` (number in `danger`; the hook for slice 8's pulse), `note-danger` (from `note.danger`: „marznie”, „głoduje” in `danger`), `frame-warming` (`warming-frame`) and `frame-cooling` (`chill-zone`); the plain frame is the button's own `control-border`.
- Motion: `@media (prefers-reduced-motion: no-preference)` gives `.body-cells .value-cell-fill { transition: width 500ms ease }` and the marker `transition: left 500ms ease`. CSS alone; nothing reads the setting in TypeScript (ruling 2).

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/body-row-cells.test.mjs` — before the code, the cases written first | 1 — all 9 cases failed at their assertions (e.g. `expected ["Temperatura","Sytość","Zdrowie","Energia natury"], got []`; `only the temperature cell has a scale: expected 1, got 0`; `expected ["przy ogniu",false], got undefined`) |
| `npm test -- tests/view/body-row-cells.test.mjs` — after the code, first run | 1 — 3 failures: jsdom gives no computed `border-*-color` for a `var()` inside a shorthand (`got "rgba(0, 0, 0, 0)"`); the test was changed to read the declared colour from the rules, as `lastDeclared` of `tests/view/shared-controls.test.mjs` does, and the health-frame assertion dropped (shared-controls already holds it) |
| `npm test -- tests/view/body-row-cells.test.mjs` | 0 (9 pass) |
| `npm test -- tests/view/world-area.test.mjs` | 0 |
| `npm test -- tests/view/shared-controls.test.mjs` (the control the slice uses) | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` — first run | 1 — ESLint `no-unused-vars`: two unused `window` parameters in the test file |
| `npm test -- tests/quality/test_quality_invariants.py` — after the fix | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (to check the new `decision:` quotations) | 0, "0 errors"; the line about `design-token-contrast` named in the handoff no longer appears |
| Mutation run: frame rule set to `chill-zone`, alarm selector broken, health fill role `text-strong`, scale `--share` / 110, then `npm test -- tests/view/body-row-cells.test.mjs`, files restored after | 1 — the four cases of alarm, fills, scale and frame each failed on its own break; files restored, `git diff --stat` identical before and after |

The full gate was not run, as the handoff gives.

## Tests (body-row-cells.test.mjs)

Moved cases brought to the new cells (names and numbers apart, notes read from `.value-cell-note`, the danger of a number and a note read as the token the real stylesheet lands on) and new cases, each with its `decision:` lines as the entries now stand:

1. only the number below its threshold stands in danger, health below 35 included (35 → no alarm, 34.9 → „34” in danger), and the backpack line — D-64, D-178, D-125, D-337, D-39;
2. each cell holds name and number in its head, the bar or the scale under them, the note under the bar; three buttons and health a block; the backpack a `p` with no bar — D-337, D-44, D-178;
3. fills: `--share` 0.82 / 0.4 / 0.9 and 0.12 / 0.3 / 0, colours `satiety-fill` / `positive` / `text-strong`, also below the threshold, tracks in `highlight` — D-337, D-39, D-40;
4. scale: zone colours `chill-zone`, `safe-zone`, `danger`; widths 5 : 4 : 2; marker in `scale-marker`; marker at 7/11 for 37,0 °C, 0 at 28,4 °C, 1 at 42 °C; the zone holding the marker chill at 34,99, safe at 35 and 37, overheating at 39,5 — D-337, D-40, D-39;
5. the frame of the temperature cell: `warming-frame` at a campfire at 37,0 °C, `chill-zone` away from fire on Las, the other buttons keep the plain frame — D-337, D-39;
6–8. the three moved cases of the notes, unchanged in what they hold;
9. after the end of a map run: notes as before, plus the bluish frame and the empty health bar on the settled death of cold — D-337.

The plain frame on a map that does not cool is not held at the component level: no map of the game's data stays at or above the body's temperature, and the component takes the map from `MAPS`; `bodyRowCells` (slice 5) maps it, and the component draws no mark for `plain`.

## Own-work check

- Requirement most likely missed: To do 6 — at 360 px nothing scrolls and no text crosses its frame, and the row breaks into two rows of two only where four cells with full names do not fit. Check: measured the row in Chromium at page areas 1280, 1100, 600, 575, 560, 545, 530, 500, 420 and 360 px for the top of each cell and for any element of `.body-cells` whose `scrollWidth` exceeds its `clientWidth`.
- What it showed: with the first CSS (names `nowrap`, cells `flex: 1 1 0`) the row stayed four in a row down to about 535 px while the names overflowed their boxes (`value-cell-name 63>58` at 575 px, `63>50` at 545 px): Chrome's automatic minimum of the button cells did not hold their content. Corrected by `min-width: max-content` on each cell (the `nowrap` rules dropped as no longer needed); re-measured: four in a row at 1100 (259 px each) and 600 (134 px each) and down to 545 px with no crossing, two rows of two at 530, 500, 420 and 360 px (155 px each at 360), no element of the row crossing its box at any width. This rule has no jsdom test (jsdom lays out nothing; testing guidelines, D-87/D-88).

## Walk through the running game

Where: Windows 11, Chromium of Playwright CLI 0.1.22 (session `-s=ex6`, own to this agent), `npm run local` at `https://127.0.0.1:53823`, a new account `ex6@example.test`, a character on Skraj lasu.

| Case | By what | Verdict |
|---|---|---|
| Computer layout 1280 × 720: four cells in one row, name left / number right, bar under, note under; health without frame holding its place (same height 49 px) | screen, reading of the layout and colours by `evaluate`, screenshot inspected | pass — cells 162 px each, scale zones 64.5 / 51.6 / 25.8 px (5 : 4 : 2), marker 2 × 4 px at the temperature, fills orange / green / white on `#27272a` tracks |
| Temperature frame bluish on a cooling map, others `control-border` | computed `border-top-color` | pass — `rgb(0,166,244)` on temperature, `rgb(113,113,123)` on the others |
| Phone layout 360 × 740 with touch: two rows of two, nothing scrolls, no control under 48 px | measurement of the play skill, screenshot | pass — `scrollsToTheSide` false, `controlsSmallerThan48` empty; the only `contentWiderThanItsBox` / `outsideTheWindow` lines are the scene place and „Teraz”/„Potem” with their negative margins (`scene-place 9..351`, `now-row 17..343`), not the body row (`21..339`) |
| Alarm: 34,9 °C → number and „marznie” red, marker's zone chill; then satiety 0 % „głoduje” red and health 33 red, energy white, fills keep their colours | game run at 16×, paused, computed colours | pass |
| After the death of cold: the window closed with „✕”, the row on the stopped minute 243: 31,1 °C „marznie”, 0 % „głoduje”, health 0 with an empty bar, bluish frame | screen | pass |
| Fill moves smoothly | sampled the satiety fill and the marker every frame for 2.5 s at 1× | pass — width changes in steps of 0.05–0.15 px per frame with a running `CSSTransition` |
| First draw stands at once | reload, 20 frames of `document.getAnimations()` | pass — 0 transitions in every frame |
| Reduced motion | `page.emulateMedia({ reducedMotion: "reduce" })` | pass — `transition-duration` 0s on fill and marker (0.5s without) |
| Amber frame at a fire | — | unchecked in the browser: the default program builds no fire and a fire needs a program of the player; held by test case 5 |
| Side observation | — | see Concerns 2 and 3 |

What I did not check: the amber frame in the browser (above); Firefox and Edge (D-396 leaves them to a person); the hover look of the cells (slice 2's); keyboard focus on the cells (unchanged shared button).

## Choices, with the way rejected

1. **Two pairs instead of a grid with a breakpoint.** A grid of 4 columns in the computer layout and 2 in the phone block would show 2 × 2 at 1100 px, where four cells fit; `auto-fit` columns could give 3 + 1. The pairs give only 4 or 2 + 2 with no threshold of width. Cost if wrong: one more wrapper `div.body-cell-pair` that slices 7 and 8 must know when they select cells.
2. **No rule in an `@media (width < 1280px)` block.** The plan's slice text names "their block `@media (width < 1280px)`"; the layout needs none (the pairs break by width; the buttons get 48 px from `styles.css`). Writing an empty or redundant block was rejected. Departure from the plan's wording, named here.
3. **500 ms, `ease`** for the fill and the marker: 500 ms from the task's Context (loop's bar changes over half a second, `RunWorld.tsx`, origin/test 715026e); the curve is my choice, named as such in the comment. The marker moves too, though the task speaks of the fill's length: the scale stands in place of loop's warm bar, which moved; rejected: a jumping marker.
4. **Gap `--frame-width`** (1 px) between zones, as the gap between pieces of the end-of-run time bar; rejected `--bar-width` (2 px), which takes more of a 137 px scale on the phone. With it, the marker at exactly 35,0 °C starts at the end of the chill zone (both are 5/11 of the width less 2 px).
5. **`note-danger` apart from `alarm`**: the note's red comes from `note.danger` of the data and the number's from `alarm`, though both thresholds are the same today.
6. **`holds-marker`** on the zone: a hook for slice 8, not asked by the plan; costs nothing if slice 8 uses another way.
7. **Frame test reads the declared rule**, not the computed style (jsdom drops `var()` in border shorthands); `null` stands for "the plain button's frame, which no rule of the row changes".
8. No token value chosen or changed in this slice (`tokens.css` untouched).

## Concerns

1. **Restart animates the bars.** After „Restart” the same component draws the new run, so the fills grow over 500 ms from the dead run's values (e.g. 0 → 100 %). The task asks for the length to stand at once "at the first draw"; a restart is no first draw of the screen, so I left it. If the orchestrator reads Restart as a first draw, a `key` on the map run's identity in the world area would remount the row.
2. **The marker next to a zone gap is hard to see.** The marker is dark and the gap shows the dark `panel`, so at a temperature near 35 °C or 39 °C (e.g. 34,9 °C) the marker merges with the gap and looks like a slightly shorter zone. D-42 asks the marker's ratio only against the zones; for the side-by-side screenshots of slice 9.
3. **An empty bar almost vanishes** (health 0, satiety 0 %): the `highlight` track on `panel` at 1.19:1. Accepted in D-337 and D-40; seen in the walk.
4. `bodyCells` and `bodyValues` of `src/browser/view/body-row.ts` are no longer used by the component; `tests/view/body-row.test.mjs` still holds them. Outside this slice's *Change*; left as they are.

## Reaches beyond the dispatch

- `tests/view/shared-controls.test.mjs:639-661` and `:790-839` — how slice 2 read a `var()` frame under jsdom (`lastDeclared`), after my frame assertions failed for that reason.
- `src/browser/kitchen-sink/control-samples.tsx:113-160` and `kitchen-sink.css:55-114` — the made-up scale of slice 3, to keep the screen's markup consistent with it.
- `src/browser/tokens.css` (grep of the five roles, `--bar-width`, `--space-*`) — which tokens exist.
- `src/browser/styles.css:258-296, 684-741` (phone blocks) — the touch target of `.button`.
- `tests/view/world-area.test.mjs:200-310`, `tests/view/run-header.test.mjs` (grep) — how the world area reads the row and how a case reads the real stylesheet.
- `foundations/decisions.md:6686` (D-64), `:7848-7851` (D-125) — the moved quotations still stand.
- `src/browser/sim/data/balance.ts` (grep) — starting values and caps for the expected shares.
- `.the-way/elements/decisions/template.md` (grep around "decision:") — the form of a quotation.

## Working copies

- `.runs/executor-6/` held two jsdom probes, the Playwright scripts, the measurement JSON, logs, screenshots of the row (computer layout, phone layout, alarm, after death) and the commit message; removed whole with `rm -rf` before this report. No screenshot was shown to the human or kept (slice 9's).
- The browser session `ex6` is closed; the local start is stopped (`Local starts stopped: 1`). Its database under `.runs/local-start/` is the product's own output and stays, as the play skill gives.

## Unread material

none — every file, decision and passage of the slice's *Read* and of the handoff's additions was read whole (the styleguide in three pages, `guidelines/testing.md` in two).

## Searches not found or unclear

- The plan's line ranges of `foundations/decisions.md` are stale; the handoff's current ranges held.
- jsdom gives no computed value for a border colour set by `var()` in a shorthand (found by a probe; slice 2's test already works around it).
