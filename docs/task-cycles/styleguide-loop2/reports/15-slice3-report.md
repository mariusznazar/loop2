# Report 15 — slice 3: the token file with its sources, and the tests of contrast and sources

- **Status:** done with concerns
- **Executor:** general-purpose agent, claude-opus-5-5, skill `the-way-make-change` (`.the-way/task-cycle/change/SKILL.md` at `f0b2130`)
- **Worktree and branch:** `C:\Storage\repos\loop2-wt\styleguide-loop2`, `task/styleguide-loop2`
- **Base → head:** `396895f49bba17faca820898bd826b4dc9eac27b` → `fc4fc911cca4d138a904280b567814a16c53883e` (one commit, not pushed; author `<private address>`)

## What was read

Handoff 15; `task.md`, `spec.md` (with 8a), `plan.md`, `cycle.md` (questions table), `reports/07-foundation-report.md`,
`reports/13-slice2-report.md` whole; `AGENTS.md`; `.the-way/product-guidelines/reading.md`; "Reading the foundation"
of `.the-way/elements/common/way_of_working.md`. Guidelines by their headers: `guidelines/styleguide-browser-view.md`
(*Applies to* browser-view) and `guidelines/coding.md` whole; no kind row matches (a CSS file and invariant tests in
Python are deferred kinds, D-28). Foundation: decisions whose *Scope* names browser-view (D-03, D-04, D-06, D-18,
D-19, D-21, D-23, D-26–D-32, D-36, D-38–D-47) whole; part map whole; invariants `design-token-contrast`,
`design-token-sources`, `browser-view-framework`, `application-build-output`, `icon-file-content`,
`prettier-source-format`; facts `wcag-text-contrast`, `wcag-non-text-contrast`, `wcag-contrast-ratio`,
`geist-licence`. Code: `src/browser/index.html`, `scripts/build.mjs`, `package.json`, `.gitattributes`, `ruff.toml`,
`tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_icon_file_content.py`, the head of
`tests/invariants/test_terrain_drawing_numbers.py`, the Prettier and Ruff parts of
`tests/quality/test_quality_invariants.py`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/tokens.css` | 101 | 0 |
| `tests/invariants/test_design_token_contrast.py` | 201 | 0 |
| `tests/invariants/test_design_token_sources.py` | 275 | 0 |

Commit `fc4fc91` "feat: keep the design tokens of browser-view with their sources in tokens.css".

- `src/browser/tokens.css` — a header comment; one `:root` rule with 48 custom properties: the 23 roles of Q18
  (`--depleted: 0.35`, the others `#rrggbb`) and 25 other values; four `@font-face` rules (Geist 400/500, Geist Mono
  400/500, descriptors `font-family`, `src`, `font-weight` only). Every declaration has `/* Source: … */` after its
  `;` on the same line. Prettier put the two font stacks over two lines; their comments stay after the `;`.
- `tests/invariants/test_design_token_contrast.py` — `# invariant: design-token-contrast`; the 36 pairs and
  thresholds as literals; WCAG 2.2 constants as the fact `wcag-contrast-ratio` quotes them; controls with
  hand-checked ratios and made-up token text.
- `tests/invariants/test_design_token_sources.py` — `# invariant: design-token-sources`; reads the file as text
  (rules, blocks, declarations to their `;` over any number of lines, strings and comments skipped); controls
  with 22 made-up texts flagged and one clean text.

### Names of the non-role custom properties (spec "Left to the maker")

| Property | Value | Source named |
|---|---|---|
| `--font-family-text` / `--font-family-mono` | `"Geist", sans-serif` / `"Geist Mono", monospace` | Q11 |
| `--font-weight-body` / `--font-weight-emphasis` | 400 / 500 | Q11, Q19 C |
| `--font-size-label` / `-detail` / `-body` / `-heading` / `-map-title` / `-game-title` | 11 / 12 / 13 / 14 / 15 / 16 px | loop's rendered page with Q11's elements |
| `--space-2xs` / `-xs` / `-s` / `-m` / `-l` / `-xl` / `-2xl` | 2 / 4 / 8 / 12 / 16 / 24 / 32 px | Q11 |
| `--frame-width` / `--bar-width` | 1px / 2px | Q11 |
| `--character-outline-width` / `--step-target-width` / `--step-target-dash` / `--link-highlight-width` | 4px / 2px / `5 4` / 1.5px | Q19 C (as in the preview of Q10) |
| `--focus-width` / `--focus-offset` | 2px / 2px | Mariusz's choice from the preview, Q10 |

The tile edge uses `--frame-width` (QA-2); no second token holds it.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B -m unittest discover -s tests/invariants -p "test_design_token_contrast.py"` — tests written, no token file | 1 | `test_token_file_keeps_every_pair` fails: "src/browser/tokens.css does not exist"; the two control tests pass |
| `… -p "test_design_token_sources.py"` — no token file | 1 | `test_every_token_has_a_source_entry` fails: "does not exist"; control passes |
| both, with an empty `src/browser/tokens.css` (so they reach their real assertion) | 1, 1 | contrast: "--text-strong is declared 0 times, not once" and the 16 other roles; sources: "the text holds 0 :root rules, not one" |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/tokens.css` (first draft) | 1 | font stacks too long; `--write` broke them over two lines, comment kept after `;` |
| the same `--check` after `--write` | 0 | formatted |
| both tests with the token file | 0, 0 | 3 tests OK; 2 tests OK |
| invariant broken for a moment: `--text-label: #71717b` (loop's value) | 1 | contrast flags `--text-label #71717b on --page …` and its other pairs |
| invariant broken: `--control-border: #3f3f46` (loop's frame) | 1 | contrast flags `--control-border #3f3f46 on --page …` |
| invariant broken: source comment of the two-line `--font-family-mono` removed | 1 | sources flags "line 47: the declaration '--font-family-mono' has no comment after its `;` on that line" |
| invariant broken: source comment of the first `@font-face` `src` removed | 1 | sources flags "line 81: the declaration 'src' has no comment …" |
| file restored (`cmp` with the kept copy: identical); `… -p "test_design_token_*.py"` | 0 | 5 tests OK |
| `npm run build` | 0 | `dist/public/tokens.css` exists, `cmp` with `src/browser/tokens.css`: identical |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK (Prettier covers `src/browser/**/*.css`, Ruff covers the new tests) |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache` on the two tests | 0 | "All checks passed!"; control: a made-up `import os` file in `tests/invariants/` exits 1 (removed) |
| `python -B .the-way/elements/common/foundation_check.py` at `fc4fc91` | 1 | 7 errors, exactly the patterns the plan's table leaves after Slice 3: `src/browser/kitchen-sink/**`, `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs`, `src/browser/AGENTS.md`; `src/browser/*.css` and the two token tests are cleared |
| `… -p "test_design_token_*.py"` and `… -p "test_application_build_output.py"` at `fc4fc91` | 0, 0 | OK |
| `git ls-files --eol src/browser/tokens.css` | 0 | `i/lf w/lf attr/text eol=lf` |

Not run: `npm test` (the cycle's full run before the request, `make-change` §3); the screenshot check of WAY-219 —
not applicable: no page links `tokens.css` yet (Slice 4 does), so no screen changes in this slice.

## Own-work check (section 3)

- **Requirement most likely missed:** a role or value transcribed wrong or missing — no repository test compares the
  file's values with the task's Q9–Q11 and Q19, and the contrast test sees only 17 of the 23 roles.
- **Check:** a scratch script
  (`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\own_check.py`)
  with the 23 role values and 25 other values transcribed again from `task.md`, comparing each with the file (each
  declared once) and listing extras; and an independent contrast computation in Node
  (`…\scratchpad\ratios.mjs`) over the 36 pairs.
- **Showed:** no mismatch, 48 declarations, none extra; four `@font-face` rules with the slice-2 file names. All 36
  pairs pass; the tightest are `text-label` on `highlight` 4.532:1, `control-border` on `highlight` 3.085:1 and
  `character` on `tile-revealed` 3.336:1 (Q10 says 3.3:1); `tile-revealed` against `tile-hidden` 3.670:1 (Q10: 3.7:1).

Mutations in my head: a wrong luminance weight, linear limit, gamma or offset changes the hand-checked ratios
(grey #808080 on white 3.949, on black 5.317, #a0a0a0 on white 2.615, #0a0a0a on black 1.0607 through the linear
branch); a threshold moved to 3 or 7, a pair dropped or `text-disabled` added fails the made-up passing set or a
flagged case, since each flagged case must name its pair; a declaration read only to the end of its line fails the
clean two-line font stack. Unprotected: a ratio exactly at a threshold (`<` against `<=`) — no hand-checkable pair
lands on 4.5 or 3.0 exactly; and the six roles in no pair (`divider`, `selected`, `text-disabled`, `tile-edge`,
`link-highlight`, `depleted`), which no test requires to be declared — not in either invariant.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Spacing steps named `--space-2xs` … `--space-2xl` (rank of the step) | `--space-8` as in D-43's complying example (a number alone, which spec Decision 1 forbids) | rename in the token file and in Slice 4's styles; D-43's example needs the return step (Minor M7) |
| Line widths written with `px` (`4px`, `2px`, `1.5px`), the dash pattern unitless `5 4` as loop2's present `stroke-dasharray` | unitless widths | `--link-highlight-width` also draws the row's left edge in CSS, which needs a length; in SVG a CSS `px` is a user unit, so the drawing is the same |
| Font stacks end in the generic family only (`sans-serif`, `monospace`) | further keywords such as `system-ui` | a fallback look while a font file loads; one value each |
| Each `Source:` names the source in full and the task question in brackets; the header comment says what "the task" and "loop" mean | short codes only (`Q9`), which a reader of the file cannot resolve | longer lines (up to about 330 characters), which Prettier keeps |
| Sources of the font weights cite the task's settlement (Q11, Q19 C, "the weights 400 and 500 of loop"), naming no element | an element of loop's page | the task names no element for the weights; I invented none |
| Sources test reads rules, blocks and declarations with a small scanner (strings, comments, nested blocks) | a regex per line | the token file only is read; no other code is taken apart (Q22) |
| Contrast test requires each of the 17 roles declared exactly once with `#rrggbb` (any case) | reading the last declaration as the cascade would | a second declaration fails the test instead of being resolved (Q22: no cascade) |

No adaptation of section 4: the plan's paths, test names (FE-1) and the slice-2 file names matched the code.

## Concerns for the next dispatch

1. **Slice 4 uses these names.** Roles are `--<role>` exactly as Q18; the other properties are in the table above.
   D-43's complying example `var(--space-8)` names no property of the file (Minor M7, left to the return step).
2. **`--depleted` is the opacity `0.35`**, a role of kind other; `--step-target-dash` is `5 4` without units.
3. **`tokens.css` is copied but not yet linked**: no page loads the fonts or the tokens until Slice 4 links
   `/tokens.css` before `/styles.css`.
4. **No test checks a ratio exactly at a threshold** and no test requires the six roles outside every pair to be
   declared; the own-work script shows they are, today.
