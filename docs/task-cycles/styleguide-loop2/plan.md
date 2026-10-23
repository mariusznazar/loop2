# Plan — Styleguide loop2

- Task: `.runs/task-cycles/styleguide-loop2/task.md`
- Spec: `.runs/task-cycles/styleguide-loop2/spec.md` (with Decision 8a)
- Base: `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`

## Foundation entries

Written by the foundation step before slice 1, each through its pinned element skill; the plan
names them and never words them. "Row" is a row of the task's *Settlements to record*.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — loop2 adopts the pinned styleguide template with no departure | decision | task row 1 (Q19 H, Q18) | Slice 1 (*Decision* of the rules "Every background with its text", "States of shared controls", "A fault of one screen…", "Every value with its source", "The kitchen-sink page") |
| Row 2 — meanings of the five signal colours, each as text on the three backgrounds | decision | task row 2 (Q3, Q19 B) | Slice 1 (`## Roles`), Slice 3 (values), Slices 4, 6 (use: `danger` on destructive buttons, `warning` on field errors) |
| Row 3 — meanings of the neutral roles and `selected`, the five text roles on the three backgrounds | decision | task row 3 (Q4, Q19 C) | Slices 1, 3, 4, 6 |
| Row 4 — meanings of the grid and focus roles, the step target told apart by shape | decision | task row 4 (Q7, Q19 C) | Slices 1, 3, 4, 7 |
| Row 5 — the three WCAG 2.2 criteria, thresholds and pairs, no return date | decision | task row 5 (Q5, Q6, Q8, Q19 G); based on rows 16–18 | Slice 1, Slice 3 (contrast test), Slice 4 (focus) |
| Row 6 — what counts as a value in place of a design token, exemptions; four unitless kinds closed (QA-1) | decision | task row 6 (Q15, Q19 D); spec Decision 8, 8a | Slice 1, Slice 4 (test of row 11), every later code slice |
| Row 7 — six shared controls in `src/browser/view/controls/`, three destructive buttons, loading not applying | decision | task row 7 (Q12, Q19 C) | Slices 1, 6, 7 |
| Row 8 — kitchen-sink built and opened locally by its own command, absent from `npm run build`, controls and tile samples only (may name `npm run kitchen-sink`, `src/browser/kitchen-sink/`) | decision | task row 8 (Q13, Q19 A); spec Decisions 4–6 | Slices 1, 7, 8 |
| Row 9 — Geist and Geist Mono kept in the product's files with their licence, copied at build, never fetched (may name `assets/fonts/`, the GitHub release, npm `geist` rejected) | decision | task row 9 (Q11); spec Decision 3; based on row 19 | Slice 2, Slice 3 (`@font-face`) |
| Row 10 — D-28 changed in place: CSS joins the deferred kinds beside HTML | decision (change in place) | task row 10 (Q17) | Slice 1 (`guidelines/coding.md` follows it), Slices 3, 4, 7 (CSS files with no exemplar) |
| Row 11 — no value in place of a token in any file of `browser-view` but the token file — test | invariant | task row 11 (Q14–Q16, Q22); spec Decision 8 row 11, 8a; derives from row 6. Check: `tests/invariants/test_browser_view_token_values.py` (Slice 4) | Slice 1 (*Invariant*), Slice 4 (its test and the code it covers), every later code slice keeps it |
| Row 12 — the only `outline` declaration is the `:focus-visible` rule from `focus`; the kitchen-sink's one extra selector — test | invariant | task row 12 (Q16, Q19 F, Q21, Q22); spec Decision 8 row 12; rests on row 18; derives from rows 5 and 20. Check: `tests/invariants/test_browser_view_focus_outline.py` (Slice 4) | Slice 1, Slice 4, Slice 7 (kitchen-sink stylesheet) |
| Row 13 — contrast of every listed pair from the token file's values — test | invariant | task row 13 (Q8, Q16, Q22); spec Decision 8 row 13; rests on rows 16, 17 and the QA-4 fact; derives from rows 2–5. Check: `tests/invariants/test_design_token_contrast.py` (Slice 3) | Slice 1, Slice 3 |
| Row 14 — every value of the token file has a non-empty source entry beside it — test | invariant | task row 14 (Q16, Q22); spec Decisions 1 and 8 row 14. Check: `tests/invariants/test_design_token_sources.py` (Slice 3) | Slice 1, Slice 3 |
| Row 15 — `npm run build`'s output holds no kitchen-sink page — test | invariant | task row 15 (Q13, Q16); spec Decision 8 row 15; derives from row 8. Check: `tests/invariants/test_application_build_kitchen_sink.py` (Slice 8) | Slice 1, Slice 7 (exclude), Slice 8 (its test) |
| Row 16 — WCAG 2.2 1.4.3 Contrast (Minimum), verbatim | environment fact | task row 16, *Context* | rows 5, 13; Slice 3 |
| Row 17 — WCAG 2.2 1.4.11 Non-text Contrast, verbatim | environment fact | task row 17, *Context* | rows 5, 13; Slice 3 |
| Row 18 — WCAG 2.2 2.4.7 Focus Visible, verbatim | environment fact | task row 18, *Context* | rows 5, 12; Slice 4 |
| Row 19 — Geist under the SIL Open Font License 1.1 | environment fact | task row 19 (Q11) | row 9; Slice 2 |
| Row 20 — a control is every element the keyboard reaches; one `:focus-visible` rule from `focus`; no other outline | decision | task row 20 (Q21, Q22) | Slice 1, Slice 4 (focus test), Slices 6, 7 |
| WCAG 2.2 definitions of "contrast ratio" and "relative luminance", read from https://www.w3.org/TR/2024/REC-WCAG22-20241212/, never from memory | environment fact | spec *Foundation entries*; cycle QA-4 | row 13; Slice 3 (the test's constants) |
| Part map `browser-view`: *Files* gain `src/browser/*.css`, `src/browser/kitchen-sink/**`, `assets/fonts/**`, `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py`, `tests/invariants/test_design_token_contrast.py`, `tests/invariants/test_design_token_sources.py`; *Trust boundary* gains `assets/fonts/**` | part map | task To do 9; spec *Foundation entries*; cycle step-4 answers | Slices 2–7 (claims of new files; the population of row 11's test) |
| Part map `build-tools`: *Files* gain `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`; *Trust boundary* gains `scripts/kitchen-sink.mjs` | part map | task To do 9; spec *Foundation entries*; cycle QA-3 | Slices 7, 8 |
| Part map `agent-workflow`: *Files* gain `src/browser/AGENTS.md` | part map | follows from To do 10 (the rule for a part of the files stands in a subdirectory `AGENTS.md`, `.the-way/instruction-files/principles.md` §4); plan choice C9 | Slice 9 |
| Part map *External context*: github.com/vercel/geist-font, them → us, untrusted | part map | task To do 9; spec *Foundation entries* | Slice 2 |

Consequence of writing the part-map lines first (choice C2): from the commit of these entries until
the slice that adds each file, `python -B .the-way/elements/common/foundation_check.py` exits 1
with the error "the pattern `<p>` in the *<field>* of `<part>` matches no file git tracks" for
exactly the patterns whose files later slices add. Each slice's *Checks* names the patterns that may
still stand after it; any other error fails the slice. The patterns, and the slice that clears each:

| Pattern | Field and part | Cleared by |
|---|---|---|
| `assets/fonts/**` | *Files* and *Trust boundary* of `browser-view` | Slice 2 |
| `src/browser/*.css` | *Files* of `browser-view` | Slice 3 |
| `tests/invariants/test_design_token_contrast.py`, `tests/invariants/test_design_token_sources.py` | *Files* of `browser-view` | Slice 3 |
| `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py` | *Files* of `browser-view` | Slice 4 |
| `src/browser/kitchen-sink/**` | *Files* of `browser-view` | Slice 7 |
| `tsconfig.kitchen-sink.json` | *Files* of `build-tools` | Slice 7 |
| `tests/invariants/test_application_build_kitchen_sink.py` | *Files* of `build-tools` | Slice 8 |
| `scripts/kitchen-sink.mjs` | *Trust boundary* of `build-tools` | Slice 8 |
| `src/browser/AGENTS.md` | *Files* of `agent-workflow` | Slice 9 |

The five test file names are this plan's proposal (choice C3). Where the foundation step gives an
invariant an identifier whose file name in this repository's convention (`test_<id>.py`) differs,
the part-map line and the slice's *Change* take that name; nothing else in the plan changes.

## Slices

### Slice 1 — the styleguide of browser-view

- **Goal:** `guidelines/styleguide-browser-view.md` stands in the merged form of the pinned
  styleguide template (To do 1): header with *Applies to* `browser-view`; `## When to read` before
  a change of a file of that part; `## Roles` with the 23 roles of Q18 and Q19 C, their kinds, the
  meanings of the decisions of rows 2–4, `text` in *Text on it* of `page`, `panel` and
  `highlight`, and each row's decision; the nine required rules in order with *Decision*,
  *Invariant* (rows 11–15 where the template proposes a test, `none` otherwise), *Good* and *Bad*;
  the examples *Mockups* and *Plan of a user-interface change*; `## Where in code` naming
  `src/browser/tokens.css`, `src/browser/view/controls/` and `src/browser/kitchen-sink/index.html`,
  with no value copied; no test cases of rules (Q20). `guidelines/coding.md`, section "Odłożone
  rodzaje i formatowanie", says CSS is deferred beside HTML, as D-28 now does (row 10).
- **Change:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `.the-way/product-guidelines/styleguide/template.md` · `.the-way/product-guidelines/template.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` — exit 1 with no error at
  either changed file and no error but the twelve pattern errors of the table above;
  `python -B .the-way/instruction-files/check_instructions.py .` — exit 0, no error (its dead-path
  warnings for the three code paths of `## Where in code`, which later slices create, are expected
  until Slice 7); the form against the template's *Required form* is the reviewer's.
- **Depends on:** Foundation entries (rows 1–15, 20, D-28 changed)

### Slice 2 — Geist fonts in the product's files, copied at build and into the image

- **Goal:** `assets/fonts/` holds the woff2 files of Geist and Geist Mono for weights 400 and 500
  (static per-weight files where the release has them, else the variable file per family) and the
  release's OFL 1.1 licence file, byte for byte from the newest release of
  github.com/vercel/geist-font, and nothing else (spec Decision 3); `.gitattributes` gains
  `assets/fonts/** -text`; `scripts/build.mjs` copies the woff2 files and the licence into
  `dist/public/fonts/` and every `*.css` file standing directly in `src/browser/` into
  `dist/public/` (spec Decision 2; none exists yet); `Dockerfile` copies `assets/fonts/` into its
  build stage beside `assets/icons/` and `.dockerignore` passes it; `README.md` "Pierwsze
  uruchomienie" says what `npm run build` now copies. The release's tag and commit go into the
  slice's report for the `@font-face` sources of Slice 3.
- **Change:** `assets/fonts/` (the release's file names, three to five files) · `scripts/build.mjs` ·
  `Dockerfile` · `.dockerignore` · `.gitattributes` · `README.md`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/environment_facts.md` ·
  `tests/deploy/test_loop2_image_icons.py` · `tests/invariants/test_loop2_container_icons.py` ·
  `tests/quality/test_quality_invariants.py`
- **Checks:** `npm run build` exit 0, then `diff -r assets/fonts dist/public/fonts` exit 0;
  `git ls-files --eol assets/fonts` shows `attr/-text` on every line; `sha256sum assets/fonts/*`
  equals the hashes of the release's published files (recorded in the report);
  `python -B .the-way/gate/run_tests.py tests/deploy` exit 0, each test skipped without a Docker
  daemon named as unchecked; `python -B .the-way/gate/run_tests.py tests/quality` exit 0;
  `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` exit 0;
  `python -B .the-way/elements/common/foundation_check.py` exit 1 with only the pattern errors the
  table leaves after Slice 2.
- **Depends on:** Slice 1 · Foundation entries (row 9, row 19, part map `browser-view`, *External
  context*)

### Slice 3 — the token file with its sources, and the tests of contrast and sources

- **Goal:** `src/browser/tokens.css` holds, in the form of spec Decision 1, one `:root` rule with a
  custom property `--<role>` for each of the 23 roles and one for every other value Q15 counts
  (font stacks, six text sizes, seven spacing steps, frame and bar widths, character outline,
  step-target width and dash pattern, link-highlight width, focus width and offset, two weights;
  `--depleted` 0.35; the tile edge on the frame width, QA-2), and the `@font-face` rules of Slice
  2's files; each declaration followed on the line of its `;` by `/* Source: … */` naming the
  source To do 2 gives. The test of row 14 reads the file as text and finds the entry after every
  declaration; the test of row 13 computes every pair of row 13 from the file's `#rrggbb` values
  with the constants of the QA-4 fact and fails below 4.5:1 or 3:1. Each test cites its invariant
  by `# invariant: <id>` and runs on made-up text that makes it fail. `npm run build` puts the file
  into `dist/public/`.
- **Change:** `src/browser/tokens.css` · `tests/invariants/test_design_token_contrast.py` ·
  `tests/invariants/test_design_token_sources.py`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `foundations/environment_facts.md` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/invariants/test_icon_file_content.py`
- **Checks:** the two tests first, before the token file:
  `python -B -m unittest discover -s tests/invariants -p "test_design_token_contrast.py"` and
  `… -p "test_design_token_sources.py"` exit 1 (no token file); after it, both exit 0;
  `npm run build` exit 0 and `dist/public/tokens.css` exists;
  `python -B .the-way/gate/run_tests.py tests/quality` exit 0 (Prettier on the token file, Ruff on
  the tests); `python -B .the-way/elements/common/foundation_check.py` exit 1 with only the pattern
  errors the table leaves after Slice 3.
- **Depends on:** Slice 2 · Foundation entries (rows 2–5, 13, 14, 16, 17, the QA-4 fact)

### Slice 4 — every style of the game on the tokens, the terrain per Q10, visible focus

- **Goal:** `src/browser/styles.css` holds every style of the game's present screens, reading every
  value Q15 counts through `var(--…)` (spec Decision 2): the dark theme on loop2's present layout
  (To do 3); Geist for the page and Geist Mono for the run's clock text (To do 6); the terrain per
  Q10 and Q19 C — tiles in `tile-hidden`/`tile-revealed` with their edge in `tile-edge`, the
  character outline (4 px) and the dashed step target (2 px, 5/4) in `character`, depleted icons at
  `depleted`, and the link highlight as a 1.5 px `link-highlight` line around the hovered tile and
  at the left edge of its row in the list, with no change of the tile's colour; and the one rule
  `:focus-visible` drawing the outline from `focus`, the only `outline` declaration.
  `src/browser/index.html` has no `<style>` and no `style` attribute and links `/tokens.css` then
  `/styles.css`. Where the line around a hovered tile must be drawn above its neighbours,
  `terrain-panel.ts` draws it as the outlines are drawn, and the drawing stays a picture (D-19).
  The test of row 11 searches, as spec Decision 8 row 11 and 8a read, the `.css`, `.html`, `.ts`,
  `.mts`, `.cts` files the part map gives `browser-view`, without the token file; the test of
  row 12 checks the rule and the absence of any other `outline` in the part's `.css` files,
  allowing one more selector only in `src/browser/kitchen-sink/kitchen-sink.css`. Both cite their
  invariants and run on made-up text that makes them fail.
- **Change:** `src/browser/styles.css` · `src/browser/index.html` ·
  `src/browser/view/terrain-panel.ts` · `tests/invariants/test_browser_view_token_values.py` ·
  `tests/invariants/test_browser_view_focus_outline.py`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `foundations/part_map.md` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/invariants/test_application_package_layout.py` ·
  `tests/invariants/test_terrain_drawing_numbers.py` · `src/browser/view/tile-list.ts` ·
  `src/browser/view/app.ts` · `src/browser/view/footer.ts` · `src/browser/view/program-editor.ts`
- **Checks:** the two tests first, before the stylesheet:
  `python -B -m unittest discover -s tests/invariants -p "test_browser_view_token_values.py"` and
  `… -p "test_browser_view_focus_outline.py"` exit 1 on the present `index.html`; after the change
  both exit 0; `npm run build` exit 0 and `dist/public/styles.css` exists; `node --test
  tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`
  exit 0; `… -p "test_terrain_drawing_numbers.py"`, `… -p "test_browser_view_framework.py"`,
  `… -p "test_content_identifiers.py"`, `… -p "test_design_token_contrast.py"` exit 0;
  `python -B .the-way/gate/run_tests.py tests/quality` exit 0;
  `python -B .the-way/elements/common/foundation_check.py` exit 1 with only the pattern errors the
  table leaves after Slice 4. The look in a browser (`npm run dev`) is the reviewer's to judge
  against Q10 and Q19 C; no test draws it.
- **Depends on:** Slice 3 (its token file, read whole) · Foundation entries (rows 4, 6, 11, 12, 18, 20)

### Slice 5 — light icons and their credit

- **Goal:** each icon in `assets/icons/*.svg` is filled `#f4f4f5` instead of `#2b2b2b`, holding
  nothing else new (D-27, `icon-file-content`); the change text in `src/browser/view/credits.ts:12`
  reads „zmienione (bez tła, jasny kolor)”, with the comment above it matching (To do 5);
  `tests/view/icons.test.mjs` expects that colour and that text; `README.md` says the same at its
  footer and icon passages.
- **Change:** `assets/icons/berry-bush.svg` · `assets/icons/fern.svg` · `assets/icons/flax.svg` ·
  `assets/icons/wood-stick.svg` · `src/browser/view/credits.ts` · `tests/view/icons.test.mjs` ·
  `README.md`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `src/browser/view/footer.ts` ·
  `tests/invariants/test_icon_file_content.py` · `tests/invariants/test_icon_credits.py`
- **Checks:** `tests/view/icons.test.mjs` changed first: `npm run build` then
  `node --test tests/view/icons.test.mjs` exit 1; after the icons and credits, exit 0;
  `python -B -m unittest discover -s tests/invariants -p "test_icon_*.py"` exit 0;
  `… -p "test_browser_view_token_values.py"` exit 0; container icon tests
  (`… -p "test_loop2_container_icons.py"`, `tests/deploy`) named unchecked where no Docker daemon
  answers; `python -B .the-way/elements/common/foundation_check.py` as after Slice 4.
- **Depends on:** Slice 4

### Slice 6 — the shared controls and the screens on them

- **Goal:** `src/browser/view/controls/` holds the six shared controls of Q12 as modules of kind
  `browser-module` (D-36, D-03): `button.ts` — the button, the destructive button (text in
  `danger`) and the selected button of a group (frame in `selected`, text `text-strong`);
  `select-list.ts`; `number-field.ts`; `text-field.ts`; none touches the DOM when imported. Their
  states stand in `styles.css`: no background of their own, text `text`, hover `highlight` without
  a change of frame, focus by the one rule, disabled `text-disabled`, error on the fields a
  `warning` frame and a message under the field, empty with the hint in `text-label`.
  `program-editor.ts`, `status-row.ts` and `send-panel.ts` make every button, select and number
  field through them; „Zakończ”, „Usuń” and „Restart” are destructive buttons (To do 4, row 7).
  The controls keep focus across updates as `status-row.ts` shows.
- **Change:** `src/browser/view/controls/button.ts` · `src/browser/view/controls/select-list.ts` ·
  `src/browser/view/controls/number-field.ts` · `src/browser/view/controls/text-field.ts` ·
  `src/browser/styles.css` · `src/browser/view/program-editor.ts` ·
  `src/browser/view/status-row.ts` · `src/browser/view/send-panel.ts`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `src/browser/view/app.ts` ·
  `tests/view/program-editor.test.mjs` · `tests/view/status-row.test.mjs`
- **Checks:** the existing tests of the three screens are the tests it starts from: `npm run build`
  then `node --test "tests/view/*.test.mjs"` exit 0 (among them „importing the editor touches no
  DOM”); `python -B -m unittest discover -s tests/invariants -p "test_browser_view_*.py"`,
  `… -p "test_content_identifiers.py"`, `… -p "test_terrain_drawing_numbers.py"` exit 0;
  `python -B .the-way/gate/run_tests.py tests/quality` exit 0;
  `python -B .the-way/elements/common/foundation_check.py` as after Slice 4. The repository has no
  DOM to test the controls' elements with, and the task adds no dependency: their states are shown
  on the kitchen-sink page of Slice 7 and judged by review.
- **Depends on:** Slice 5 · Foundation entries (rows 7, 20)

### Slice 7 — the kitchen-sink page and its compilation, outside the game's build

- **Goal:** `src/browser/kitchen-sink/` holds exactly `index.html`, `kitchen-sink.ts` (the one entry
  module) and `kitchen-sink.css` (spec Decision 4): the page links `/tokens.css`, `/styles.css` and
  its own stylesheet; shows every shared control in each of the seven states or the reason a state
  does not apply, every colour role, and samples of tiles in each state drawn with the roles, icons
  taken through `src/browser/sim/data/` (D-04, D-18, Q19 A); its stylesheet holds no value Q15
  counts and its only `outline` is the `:focus-visible` rule with the focus sample's selector beside
  it; the HTML and the entry each hold the one marker string no other file of `src/` holds.
  `tsconfig.browser.json` excludes `src/browser/kitchen-sink/`; `tsconfig.kitchen-sink.json`
  compiles the entry with the browser's options into `dist/kitchen-sink/` (spec Decision 5);
  `tests/invariants/test_application_build_output.py` takes the browser source as `src/browser`
  without `src/browser/kitchen-sink/`, its docstring saying so. Beyond the entry the page imports
  only modules the game uses (8a).
- **Change:** `src/browser/kitchen-sink/index.html` · `src/browser/kitchen-sink/kitchen-sink.ts` ·
  `src/browser/kitchen-sink/kitchen-sink.css` · `tsconfig.browser.json` · `tsconfig.kitchen-sink.json` ·
  `tests/invariants/test_application_build_output.py`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` · `src/browser/sim/data/resources.ts` ·
  `src/browser/view/terrain-panel.ts` · `tests/invariants/test_content_identifiers.py` ·
  `tests/invariants/test_browser_view_framework.py` · `eslint.config.mjs` · `scripts/build.mjs`
- **Checks:** `node node_modules/typescript-compiler/bin/tsc -p tsconfig.kitchen-sink.json` exit 0;
  `npm run build` exit 0, then `grep -rl "<marker>" dist/public` exit 1 (no file);
  `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` exits 1
  after the `exclude` and before its literal changes, 0 after;
  `… -p "test_browser_view_*.py"`, `… -p "test_content_identifiers.py"` exit 0;
  `python -B .the-way/gate/run_tests.py tests/quality` exit 0 (ESLint and Prettier reach the page);
  `python -B .the-way/elements/common/foundation_check.py` exit 1 with only the pattern errors the
  table leaves after Slice 7.
- **Depends on:** Slice 6 · Foundation entries (rows 8, 12, part map `browser-view`, `build-tools`)

### Slice 8 — `npm run kitchen-sink` and the test that the build holds no page

- **Goal:** `package.json` gains the script `kitchen-sink` running `scripts/kitchen-sink.mjs`, which
  compiles `tsconfig.kitchen-sink.json` with the pinned TypeScript 7 compiler, assembles
  `dist/kitchen-sink/` (page, its stylesheet, `tokens.css`, `styles.css`, `fonts/`, `icons/`),
  serves it with `express.static` on `127.0.0.1` at a port the system picks, prints the address,
  opens the default browser (a failed launch is no error) and runs until Ctrl+C; `--build-only`
  assembles and exits 0; it writes nothing outside `dist/kitchen-sink/` (spec Decision 6).
  `scripts/static-files.mjs` copies the stylesheets, fonts and icons into a given output directory,
  and both `scripts/build.mjs` and `scripts/kitchen-sink.mjs` use it (Decision 7, choice C6). The
  test of row 15, in a `TreeCopy`, runs `npm run build` and finds no file under `dist/` with the
  page's marker and no `dist/kitchen-sink/`, and, as its positive control, runs
  `npm run kitchen-sink -- --build-only` and finds the marker in the page's HTML there; it cites
  its invariant. `README.md` names the command. `package-lock.json` stays as it is (D-33).
- **Change:** `scripts/kitchen-sink.mjs` · `scripts/static-files.mjs` · `scripts/build.mjs` ·
  `package.json` · `README.md` · `tests/invariants/test_application_build_kitchen_sink.py`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `foundations/decisions.md` · `foundations/invariants.md` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/invariants/test_application_build_output.py` ·
  `src/server/app.ts` · `tsconfig.browser.json`
- **Checks:** the test first: `python -B -m unittest discover -s tests/invariants -p
  "test_application_build_kitchen_sink.py"` exit 1 (no script `kitchen-sink`); after the command,
  exit 0; `npm run kitchen-sink -- --build-only` exit 0; `npm run kitchen-sink` run in the
  background prints a `127.0.0.1` address, `curl -s -o /dev/null -w "%{http_code}" <address>`
  prints 200, then the process is stopped; `npm run build` exit 0 and `diff -r assets/fonts
  dist/public/fonts` exit 0; `git diff --exit-code 00e53aee5bd21692ddd3b2f7c7541625a3114a3f --
  package-lock.json` exit 0; `… -p "test_application_build_output.py"` exit 0;
  `python -B .the-way/gate/run_tests.py tests/quality` exit 0;
  `python -B .the-way/elements/common/foundation_check.py` exit 1 with only the error for
  `src/browser/AGENTS.md`.
- **Depends on:** Slice 7 · Foundation entries (rows 8, 15, part map `build-tools`)

### Slice 9 — the pointer and the rule in the instruction files

- **Goal:** through `.the-way/instruction-files/SKILL.md` (concern Q-P2), in mode *place*, carrying
  the task's To do 10 and the decisions of rows 6 and 1 as the rules' ground: `AGENTS.md`, outside
  the block between `<!-- the-way:begin -->` and `<!-- the-way:end -->`, gains a line naming
  `guidelines/styleguide-browser-view.md` with the condition "before changing a file of
  `browser-view`", and the line pointing to `src/browser/AGENTS.md` for work in `src/browser/`;
  `src/browser/AGENTS.md` holds the rule against values in place of design tokens in that part's
  files, saying that the invariant of row 11 guards it, with no command of its own (To do 10).
- **Change:** `AGENTS.md` · `src/browser/AGENTS.md`
- **Read:** `.runs/task-cycles/styleguide-loop2/task.md` · `.runs/task-cycles/styleguide-loop2/spec.md` ·
  `CLAUDE.md` · `.the-way/instruction-files/SKILL.md` · `.the-way/instruction-files/principles.md` ·
  `.the-way/instruction-files/tool_loading.md` · `foundations/decisions.md` · `foundations/invariants.md`
- **Checks:** `python -B .the-way/instruction-files/check_instructions.py .` exit 0 with no error and
  no warning at `AGENTS.md:` beyond the base's one (`AGENTS.md:19` `foundation_check.py`) or at
  `src/browser/AGENTS.md`; `python -B .the-way/elements/common/foundation_check.py` exit 0;
  `npm test` exit 0.
- **Depends on:** Slice 8 · Foundation entries (row 11, part map `agent-workflow`)

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: `browser-view` has a styleguide, so WAY-215 no longer holds back tasks that change the interface | Slice 1; Slice 9 (pointer) |
| Outcome: one file of appearance values; no value written in a style or a module | Slices 3, 4; row 11 |
| Outcome: shared controls and a page of every state | Slices 6, 7, 8 |
| To do 1 — styleguide from the template, 23 roles, no test cases of rules | Slice 1; rows 1–4 |
| To do 2 — token file, each value with its source | Slice 3 (values, sources); Slice 2 (font files the `@font-face` rules name); row 14 |
| To do 3 — every style of loop2 on the roles, dark theme on loop2's layout, no value in place of a token after the change | Slice 4; Slices 6, 7 keep it; row 11 |
| To do 4 — six controls in `src/browser/view/controls/`, three screens moved onto them, three destructive buttons | Slice 6; row 7 |
| To do 5 — terrain grid and list per Q10; icon colour `#f4f4f5`; credit text „zmienione (bez tła, jasny kolor)” | Slice 4 (grid, list, highlight, outline, step target, depleted); Slice 5 (icons, credit, its test, README) |
| To do 6 — Geist and Geist Mono with OFL 1.1, copied at build like the icons; Geist Mono for the run's clock (loop2 has no chronicle) | Slice 2 (files, copy, image); Slice 3 (`@font-face`, stacks); Slice 4 (use) |
| To do 7 — kitchen-sink page: every control in seven states or reason, every colour role, tile samples drawn with roles; own command; not in `npm run build` | Slice 7 (page); Slice 8 (command); row 8 |
| To do 8 — five invariant tests in `npm test`, text searches or reads of the token file only | Slice 3 (rows 13, 14); Slice 4 (rows 11, 12); Slice 8 (row 15) |
| To do 9 — part map through `the-way-update-part-map`: new files to their parts, font trust boundary, External context row | Foundation entries (part map rows) |
| To do 10 — pointer in `AGENTS.md` outside the installer block; the rule for the part's files where the skill places it, guarded by the invariant | Slice 9; part map `agent-workflow` |
| Row 1 | Foundation entries; Slice 1 |
| Row 2 | Foundation entries; Slices 1, 3, 4, 6 |
| Row 3 | Foundation entries; Slices 1, 3, 4, 6 |
| Row 4 | Foundation entries; Slices 1, 3, 4, 7 |
| Row 5 | Foundation entries; Slices 1, 3, 4 |
| Row 6 | Foundation entries; Slices 1, 4 |
| Row 7 | Foundation entries; Slices 1, 6 |
| Row 8 | Foundation entries; Slices 1, 7, 8 |
| Row 9 | Foundation entries; Slices 2, 3 |
| Row 10 | Foundation entries; Slice 1 (`guidelines/coding.md`) |
| Row 11 | Foundation entries; Slice 4 (test); Slice 9 (rule) |
| Row 12 | Foundation entries; Slice 4 (test); Slice 7 (kitchen-sink selector) |
| Row 13 | Foundation entries; Slice 3 (test) |
| Row 14 | Foundation entries; Slice 3 (test) |
| Row 15 | Foundation entries; Slice 7 (exclude); Slice 8 (test) |
| Rows 16–18 | Foundation entries |
| Row 19 | Foundation entries |
| Row 20 | Foundation entries; Slices 1, 4 |
| Spec, files brought in line (Decision 9): `README.md`, `tests/view/icons.test.mjs`, `credits.ts` comment, `eslint.config.mjs` unchanged | Slices 2, 5, 8; Slice 7 (ESLint confirmed by the quality tests) |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| C1 — the styleguide is the first slice, so every later slice's agent reads it by `product-guidelines/reading.md` before it restyles; the rest follows the styleguide's example: environment (fonts), values (tokens), one screen (styles, terrain, icons), its states (controls, page) | the styleguide last, after the code it describes | later agents restyle without the rules of roles in front of them; the styleguide's three code paths stand before their files, which check_instructions warns of until Slice 7 |
| C2 — the part-map lines are foundation entries written before slice 1, as the plan method gives for a part-map change of a file the change adds; foundation_check reports the listed patterns until the slice that adds each file | each part-map line written by the slice that adds its file | each slice reads a list of expected foundation_check errors; one real error among them could pass unseen unless the reviewer compares the list |
| C3 — the five test files are named `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_application_build_kitchen_sink.py`, renamed to `test_<id>.py` where the foundation step's identifiers differ | the names left to each slice's maker | the part map would claim names no slice creates; a rename touches the map line and one slice |
| C4 — the kitchen-sink's file names are fixed now (`index.html`, `kitchen-sink.ts`, `kitchen-sink.css`), so the focus test of Slice 4 names the one stylesheet allowed a second selector | names left to the maker (spec *Left to the maker*), Slice 7 then changing the focus test | a rename later changes the test's literal and the styleguide's *Where in code* |
| C5 — four control modules: `button.ts` for the three kinds of button (one element, three looks), `select-list.ts`, `number-field.ts`, `text-field.ts` | six modules, one per control; one module for all | a split or merge of modules, imports in three screens and the page |
| C6 — one copying module `scripts/static-files.mjs`, made in Slice 8 and used by both builds | each script copying for itself (spec Decision 7 allows both) | none in behaviour; with two copies the kitchen-sink could miss a file a later task adds to the game's build |
| C7 — Slice 2 already copies every `*.css` directly in `src/browser/` though none exists yet, so `scripts/build.mjs` and `README.md` change once for fonts and stylesheets | the stylesheet copy in Slice 3 | none; one line of build code that copies nothing for one slice |
| C8 — the terrain's look (Q10, Q19 C), the link highlight included, is made with the restyle in Slice 4; Slice 5 keeps only the icon files, the credit and their test | a terrain slice after the restyle | the test of row 11 cannot pass after Slice 4 while the hovered tile keeps a fill colour no role holds |
| C9 — the rule against values in place of tokens stands in `src/browser/AGENTS.md` with a pointing line in the main `AGENTS.md` (the layout of `.the-way/instruction-files/principles.md` §4 for rules of a part of the code), claimed by `agent-workflow` | `src/browser/view/AGENTS.md` (misses `tokens.css`, `styles.css`, `index.html`); `.claude/rules` or `.cursor/rules` alone (one tool each) | sessions working on `src/browser/sim/` load a few lines that do not concern them; moving it is a file move and a map line |
| C10 — `guidelines/coding.md`'s sentence on deferred kinds follows D-28's change in Slice 1 | leaving the guidelines restating D-28 without CSS | the general coding guidelines contradict D-28 until a later task notices |
| C11 — the controls have no test of their own elements; their states are shown on the kitchen-sink page and judged by review | a fake DOM written for the controls' tests | a wiring fault of a control (a missing state class) is found only by review or on the page |
