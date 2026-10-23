PASS fc4fc911cca4d138a904280b567814a16c53883e

# Review 16 — slice 3: the token file with its sources, and the tests of contrast and sources

- **Reviewer:** fresh general-purpose agent, claude-opus-5-5, skill `the-way-review-change` (`.the-way/task-cycle/review/SKILL.md` at `f0b2130`); did not make the change
- **Range:** `396895f49bba17faca820898bd826b4dc9eac27b..fc4fc911cca4d138a904280b567814a16c53883e` (one commit `fc4fc91`, author `<private address>`); `git rev-parse HEAD` = the given head
- **Changed files:** `src/browser/tokens.css` (+101), `tests/invariants/test_design_token_contrast.py` (+201), `tests/invariants/test_design_token_sources.py` (+275) = slice 3 *Change*
- **Read:** handoff 16; `task.md` whole; `spec.md` whole (8a included); `plan.md` foundation table and slice 3; `cycle.md` whole (questions table); `reports/15-slice3-handoff.md`, `reports/15-slice3-report.md`; slice-2 report (font paths, tag, commit) and slice-2 review (M1, M2); `AGENTS.md`; `.the-way/product-guidelines/reading.md`; `guidelines/styleguide-browser-view.md` whole (*Applies to* browser-view); D-38 to D-47 whole; invariants `design-token-contrast`, `design-token-sources`, `browser-view-token-values`, `browser-view-focus-outline`; facts `wcag-contrast-ratio`, `geist-licence`, `css-colour-values`; `tests/invariants/loop2_invariant_support.py` (`ROOT`, `read_text`), head of `test_icon_file_content.py` (test convention); `.the-way/gate/run_tests.py` discovery pattern.

## Findings

### Critical

none

### Important

none

### Minor

- **m1 — `tests/invariants/test_design_token_contrast.py:45-58` with `:190-197`: the controls do not pin the set of pairs.** The pairs are a literal built from `TEXT_ROLES`, `BACKGROUNDS` and the non-text list; the controls build their passing and failing made-up text from those same tuples, so a role or background taken out of a tuple disappears from the controls too. Evidence: mutation M-c1 (drop `"text-secondary"` from `TEXT_ROLES`) — all three tests still exit 0, on the real file and on the controls. Why it matters: after such an edit, a `--text-secondary` value below 4.5:1 would pass `npm test`. Why only Minor: the literal stands right beside the invariant's sentence (docstring `:1-7`), any change to an invariant test is read in review, and the 36 pairs today match the sentence exactly (9 × 3 + 2 × 3 + 3, checked by hand and by an independent script). A control asserting `len(PAIRS) == 36`, or the exact set, would close it. A related point the executor raised itself: no control has a ratio exactly at a threshold (mutation M-c7, `<` → `<=`, survives). Any fix there would have to stub `contrast_ratio`, since an exact 4.5 or 3.0 is hard to reach with 8-bit values.
- **m2 — `tests/invariants/test_design_token_sources.py:266-271`: each flagged control only checks that *some* finding comes back, not the expected one, and no control holds a comment where `Source:` stands later in its text.** Evidence: mutation M-s8 (`if not body.startswith(SOURCE)` → `if SOURCE not in body`) keeps the test at exit 0, so the "opening with `Source:`" part of the invariant's sentence is not protected. Why it matters: a comment like `/* from loop. Source: … */` would pass, although the invariant requires the comment to *open* with `Source:`. Why only Minor: the real file is correct (every one of 48 custom properties and 12 descriptors opens with `Source:`, read in full), and the other parts of the reading do hold under mutation: M-s2 (empty `Source:`), M-s3 (two `:root` rules), M-s4 (a property that is not custom in `:root`), M-s5 (strings not skipped) and M-s7 (declaration read only to the end of its line) all fail. Adding a `/* x Source: y */` case to `FLAGGED`, and pairing each case with part of its expected message as the contrast test does, would close it.

### Out of scope

- **o1 — six roles in no pair (`divider`, `selected`, `text-disabled`, `tile-edge`, `link-highlight`, `depleted`): no test requires them to be declared.** This lies beyond the task. Q16 and Q22 give five invariants, and none of them, nor row 11 to 15, says every role stands in the token file. If one of these roles is dropped, `var(--selected)` and the like in later slices' styles quietly fall back. The executor raised this itself (concern 4). Today all 23 roles are declared, each once (count in Checks). It is for the whole-change review or the return step to weigh, not a defect of this slice.

## The change against the task, spec and foundation

- **Values (To do 2; Q9, Q10, Q11, Q19 C).** I compared every value with the frozen task by hand. All 23 roles of Q18 are present: `page #09090b`, `panel #18181b`, `highlight #27272a`, `divider #27272a`, `control-border #71717b`, `selected #d4d4d8`, `text-strong #f4f4f5`, `text #d4d4d8`, `text-secondary #9f9fa9`, `text-label #8d8d97`, `text-disabled #52525c`, `positive #00bc7d`, `warning #fe9a00`, `danger #ff6467`, `discovery #ffd230`, `player-change #c4b4ff`, `character #ffd230`, `tile-hidden #18181b`, `tile-revealed #71717b`, `tile-edge #27272a`, `link-highlight #f4f4f5`, `depleted 0.35`, `focus #f4f4f5`. All match. The 25 other values also match the task: two font stacks, weights 400/500, sizes 11–16 px, spacing scale 2/4/8/12/16/24/32 px, frame 1 px, bar 2 px, character outline 4 px, step target 2 px with dash `5 4`, link highlight 1.5 px, focus 2 px with offset 2 px. The tile edge has no width of its own (QA-2). Nothing extra, and nothing missing from the To do 2 list.
- **Sources (To do 2; styleguide rule "Every value with its source").** Each value taken from loop names the rendered page of https://kantarion.bieda.it/, read 2026-10-20, with the element Q9–Q11 or Q19 C give for it. The two changed values (`control-border`, `text-label`) name the D-42 threshold that set them, and loop's original colours. My spot check agrees: `#3f3f46` on `page` is about 1.9:1, below 3:1. One step darker than `#8d8d97`, `#8c8c96` on `highlight` is 4.473:1, so "the darkest shade" holds. The four values loop did not show (`tile-revealed`, `link-highlight`, `focus`, `depleted`), plus the focus width and offset, name Mariusz's choice from the Q10 preview. The spacing scale, frame and bar widths, font stacks, weights and grid line widths name the task's settlement. The `@font-face` descriptors name release `v1.8.2`, commit `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`, and the zip paths `geist-font/Geist/webfonts/…` and `geist-font/GeistMono/webfonts/…`. These match the slice-2 report's table and S2-1.
- **Form (spec Decision 1).** One `:root` rule and four `@font-face` rules, each with only `font-family`, `src` and `font-weight` (no `font-display`). Colours are lowercase `#rrggbb`. Non-role names follow what the value is for, never a colour or a bare number. Each declaration's `Source:` comment stands after its `;`, also for the two font stacks Prettier breaks over two lines.
- **Foundation.** D-38 to D-43 and D-46 say what the file and tests do. The contrast test's pairs and thresholds are exactly those of `design-token-contrast`. Its constants are those quoted in `wcag-contrast-ratio`: weights 0.2126/0.7152/0.0722, limit 0.04045 with `<=`, divisor 12.92, 0.055 and 1.055, exponent 2.4, offset 0.05. The test compares unrounded with `<`, as "at least" asks. The sources test reads what the `design-token-sources` sentence says. D-43's complying example `var(--space-8)` names no property of this file (the spacing steps are `--space-2xs` to `--space-2xl`). That is the open Minor M7 of slice 1, left to the return step, and not a new finding.
- **Invariant tests changed or added (named, as the method asks):** `tests/invariants/test_design_token_contrast.py` (new, `# invariant: design-token-contrast` on all three methods) and `tests/invariants/test_design_token_sources.py` (new, `# invariant: design-token-sources` on both methods). Both follow the convention of the existing invariant tests: docstring with the sentence, "Reading of the sentence", "Covers" and "Does NOT cover". The gate's `test_*.py` discovery picks them up in `npm test`. Each fails with no token file and with an empty one.
- **Q22 (no parsing of code, no cascade).** Both tests read only `src/browser/tokens.css` as text. The contrast test flags a role declared twice instead of resolving the cascade.
- **Trust boundary.** The range touches none of `assets/icons/**`, `assets/fonts/**` or `scripts/kitchen-sink.mjs`. On the spec's own Decision 3 point, that stylesheets load fonts from nowhere else: every `url()` in the token file is root-relative `/fonts/<file>`, and all four files exist in `assets/fonts/`. URLs to other sites appear only inside comments.
- **Own-work check.** The executor's chosen weak point (a role or value written down wrong or missing; the contrast test sees only 17 of 23 roles) is the right one for this slice. Its check, re-typing the values from the task, would catch it. I made the same comparison myself and found no mismatch.
- **User interface (WAY-219).** No page links `tokens.css` yet (that is Slice 4), so no screen changes and no screenshot is due.

## Declined to judge

- Whether later styles use each role in its meaning, and every background with its text. Nothing reads the tokens yet; that belongs to Slices 4, 6 and 7 and is checked in review.
- Whether the fonts load and render in the browser and in the container. They are not linked until Slice 4. Container serving is the spec's non-goal and slice 2's M2.
- Whether the loop element readings behind the values are true of the live page. The task's Q9–Q11 and Q19 bind, and the readings are not on the branch. I compared the file with the task, not with https://kantarion.bieda.it/.
- That colours are lowercase. Spec Decision 1 asks for lowercase; the invariant and its test do not, and the file is lowercase.

## Checks

All commands that write files ran in a temporary detached worktree of `fc4fc91`: `…\scratchpad\rev16`. Its `node_modules` and `.runs/quality-venv` were junctions to the reviewed worktree's. The worktree was removed afterwards. `foundation_check.py` ran read-only in the reviewed worktree, and `git status --short` stayed empty.

| Command or method | Exit | Result |
|---|---|---|
| `npm run build` (temp worktree) | 0 | `dist/public/tokens.css` exists, hash equal to `src/browser/tokens.css` |
| `python -B -m unittest discover -s tests/invariants -p "test_design_token_*.py" -v` | 0 | 5 tests OK |
| the same, `src/browser/tokens.css` removed / emptied | 1 / 1 | fails as the plan's check asks |
| `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` | 0 | 3 tests OK |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/tokens.css` | 0 | formatted |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache` on the two tests | 0 | all checks passed |
| `python -B -m unittest discover -s tests/quality` (the directory `run_tests.py tests/quality` runs; the temp worktree has no `.the-way`) | 0 | 27 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 1 | 7 errors, exactly the plan's table after Slice 3: `src/browser/kitchen-sink/**`, `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (trust boundary), `src/browser/AGENTS.md`; no other error |
| `grep -c "^  --[a-z0-9-]*:" src/browser/tokens.css` | 0 | 48 custom properties (23 roles + 25 values) |
| independent contrast script (Node, constants from `wcag-contrast-ratio`) over the 36 pairs of the invariant | 0 | 0 fail; tightest `text-label` on `highlight` 4.532, `control-border` on `highlight` 3.085, `character` on `tile-revealed` 3.336 |
| real-file mutation: `--text-label: #8c8c96` | 1 | contrast flags `text-label #8c8c96 on --highlight #27272a: 4.473` |
| real-file mutations: `--selected` without its comment; a second declaration on the line of `--focus`'s comment | 1, 1 | sources flags both |
| test mutations, contrast: M-c2 drop `focus` pairs, M-c3 text threshold 3.0, M-c4 non-text 2.0, M-c5 gamma 2.2, M-c8 allow duplicates | 1 each | caught |
| test mutations, contrast: M-c1 drop `text-secondary` (m1), M-c7 `<` → `<=` (m1) | 0, 0 | survive |
| test mutation, contrast: M-c6 limit 0.03928 (WCAG 2.0) | 0 | equivalent for 8-bit input (no component falls between 0.03928 and 0.04045), not a gap |
| test mutations, sources: M-s2, M-s3, M-s4, M-s5, M-s7 | 1 each | caught |
| test mutation, sources: M-s8 `Source:` anywhere in the comment (m2) | 0 | survives |
| test mutations, sources: M-s1 `\s*` before the comment, M-s6 rest to end of file, each alone | 0, 0 | equivalent: either alone still can't cross the newline, because the other limit holds |
| manual: values and sources against `task.md` Q9–Q11, Q19 C, To do 2 and the styleguide's source rule | — | no mismatch (see above) |

Not run: `npm test` as a whole (the cycle's own run before the request); Docker (not touched by the range).
