PASS 31e36f7f385e2bb43252697e00e485aff3f6f9ab

# Review of the repeated return step — task `edytor-programu-modale`

Range `83f6bf6a0b1d4ccda0db0a038b727a5741eea450..31e36f7f385e2bb43252697e00e485aff3f6f9ab` (one commit, `31e36f7f`), full diff, reviewed by `review-change` in its variant for the return step's commits (section 2, against the task and the entries the step writes or corrects). `git rev-parse HEAD` = `31e36f7f385e2bb43252697e00e485aff3f6f9ab`, the head given. `.the-way` at `b502011f53225451ddf121e2b772a903b87492db`, equal to the gitlink.

Counts: blocking 0, Minor 3, out of scope 0.

## What the range does, verified

- **No code behaviour changed.** In `src/browser/` the diff touches comments only: the header of `tokens.css` (lines 6-8), the `Source:` comment of `--window-frame` (`tokens.css:22`, its value `#71717b` the same on both sides), and the comment of the base rule `.rule-panel` (`program-panel.css:421-423`). The window's rule `.rule-list-panel .rule-panel` (`program-panel.css:453-459`) is untouched. `git diff 83f6bf6a 31e36f7f -- tests/view src/browser/view` is empty. The one code change is the invariant test, which widens the pairs it checks.
- **The five ratios, recomputed** by the WCAG 2.2 formula from `src/browser/tokens.css` (`#71717b`): `panel` 3.670, `highlight` 3.085, `rule-winning` 3.127, `rule-running` 3.067, `page` 4.121. They match the token comment and the author's report (3.67 / 3.09 / 3.13 / 3.07 / 4.12). D-40's *Rejected* figures also match: `#3f3f46` is 1.696 on `panel` and 1.426 on `highlight`; `#9f9fa9` is 6.755 on `panel`.
- **D-40** (`foundations/decisions.md:5050`): the binding sentence now holds the frame at 3:1 "against the colours it touches (D-42)", in D-42's own wording for `control-border` and `focus`. *Rejected* (`:5061`) now opens with three ways weighed for the frame: loop's `#3f3f46`, the lighter `#9f9fa9`, and a shadow with or without the frame. *Verification* is unchanged and still matches `tests/view/rule-window.test.mjs`.
- **D-42** (`:5080`) puts `window-frame`, "the frame of the window of a rule or of a rule group", with `control-border`, `focus` and `character` "against the colours they touch". The rest of the sentence keeps its meaning.
- **The invariant `design-token-contrast`** (`foundations/invariants.md:500`) holds `control-border`, `focus` and `window-frame` against all five backgrounds. The test's docstring is the sentence word for word (whitespace-normalised comparison: equal, 1176 characters). Its `PAIRS` (`tests/invariants/test_design_token_contrast.py:85-89`) adds `window-frame` to the 3:1 roles on `BACKGROUNDS` and drops the separate panel/highlight pair. The new flagged case (`:283-286`) sets `window-frame` to `#3a3a3a`, 1.846:1 on the made-up `rule-winning` `#000000`. The old pairs (panel and highlight only) would not report it, so the case fails if the widening is lost. *Method*, *Rests on*, *Derives from* and *Part* are unchanged.
- **The colours the frame touches.** The rows the window touches can stand on `panel`, `highlight` (open or under the pointer), `rule-winning` or `rule-running` (`program-panel.css:285-303`). At 1600 its sides touch `page`, as the earlier review saw in the author's screenshot. All five are now held. The styleguide bullet (`guidelines/styleguide-browser-view.md:198-201`) names exactly these and agrees with D-42 and the invariant. The row of the table Roles (`:25`) says "wobec kolorów, których dotyka", as D-40 does.
- **Sources.** The `--window-frame` comment now gives loop's address and the date the grey was read, the task, the date of the choice, the threshold and the five ratios. That meets "Every value with its source" (`styleguide:488-496`). The header of `tokens.css` now defines "the agent's choice" with the human's remark, as `styleguide:488-489` does.
- **The earlier Minor findings 2–6** of `reports/review-remarks-report.md`:
  - 2 is corrected.
  - 3 is corrected.
  - 4 is corrected: the frame kept in `divider` with a shadow alone falls under "a shadow under the window, with the frame or without it".
  - 5 is corrected.
  - 6: the docstring is rewrapped and the flagged case replaced. The table row is padded. The author says Prettier rewrote the table Roles at `dc058bbc` too. I verified that: Prettier with no ignore file changes 33 lines of the styleguide at `dc058bbc` and 34 at the head. The earlier review's "passes at `dc058bbc`" did not hold. Markdown lies outside the gate's Prettier patterns.
  - Finding 7, the history, is outside this range.
- **The shadow's measured effect, as D-40 states it.** The *Rationale* says the shadow darkened the labels "to about 2.3:1", and the *Rejected* says "to about 2.5:1 and their descriptions to about 3:1". The shadow probe (`reports/review-remarks-shadow-probe.txt`) reads 2.28 for labels and 2.66 for descriptions at the edge, and 2.49 and 2.95 at 3 px below it. `reports/review-fix2-report.md` read k ≈ 0.58 in the other shot, which gives the same 2.49 and 2.95. So both figures are true of some pixel row, and the conclusion "below the 4.5:1 of their text" holds. But the *Rejected* states the effect 3 px below the edge, not at the edge, and differs from the *Rationale* of the same decision (Minor 1).

## Findings

### Critical

none

### Important

none

### Minor

**1. D-40 gives two different figures for the same measured shadow, and the *Rejected* understates its worst case.**
- Place: `foundations/decisions.md:5060` (*Rationale*: "darkened their labels to about 2.3:1") and `:5061` (*Rejected*: "to about 2.5:1 and their descriptions to about 3:1").
- What is wrong: both sentences describe one measurement. Read at the edge, the probe gives 2.28:1 for labels and 2.66:1 for descriptions; read 3 px below it, 2.49:1 and 2.95:1 (`reports/review-remarks-shadow-probe.txt`, rows `d= +0` and `d= +3`). The *Rejected* takes the second reading, the *Rationale* the first.
- Why it matters: little. Both readings are below 4.5:1, so the reason for rejecting the shadow stands. A reader who compares the two sentences, or who asks how much shadow a later change could afford, gets two numbers for one fact.
- Suggested correction: "about 2.3:1 and their descriptions to about 2.7:1" in the *Rejected*, matching the *Rationale*.

**2. "the darkest grey that keeps 3:1" is not literally true.**
- Place: `foundations/decisions.md:5061`, the second way weighed: "farther from loop's darker frame than the darkest grey that keeps 3:1, which `control-border` already has".
- What is wrong: `#70707a`, one step darker than `#71717b`, keeps at least 3.023:1 on all five backgrounds (recomputed; `#6f6f79` falls to 2.98). `#71717b` is the darkest of loop's greys that keeps 3:1, not the darkest grey that does.
- Why it matters: nothing a user sees. A later session reading the decision might take `#71717b` as a computed minimum and skip a darker shade it could have weighed.
- Suggested correction: "the darkest of loop's greys that keeps 3:1".

**3. The rewrapped comment line is wider than the repository's 100 columns.**
- Place: `src/browser/program-panel.css:423` (110 characters, new in this range).
- What is wrong: the comment of `.rule-panel` was extended without rewrapping. The file had lines over 100 before (for example `:427`, 102, at the base), and Prettier does not wrap comments, so nothing fails.
- Why it matters: polish only.

## Declined to judge

- The earlier Minor finding 7 (`3c748e42` alone fails the foundation check): the commit lies before this range. The author left it as a judgement about history, and the cycle decides it.
- `guidelines/styleguide-browser-view.md:1819`, "ramka okna w `divider`": this is the end-of-run window (heading at `:1710`), not the window of a rule. The range does not touch it, and it lies outside the task.
- D-42's *Rationale* (`:5092`) gives no reason for the frame's threshold. The reason stands in D-40's *Rationale*, and the range did not touch D-42's *Rationale*.

## Checks

- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0 (3 tests, OK).
- `npm test -- tests/invariants/test_design_token_sources.py` — exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0.
- `npm test -- tests/view/rule-window.test.mjs` — exit 0 (10 pass, 0 fail).
- `npm run typecheck` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors").
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0 ("0 error, 0 warn, 122 info").
- Ruff 0.17.1 (`.runs/quality-venv/Scripts/ruff.exe`):
  - `ruff format --check --config ruff.toml tests/invariants/test_design_token_contrast.py` — exit 0.
  - `ruff check --config ruff.toml tests/invariants/test_design_token_contrast.py` — exit 0.
- `npx prettier --check src/browser/tokens.css src/browser/program-panel.css` — exit 0.
- `npx prettier --check guidelines/styleguide-browser-view.md` — exit 1 (warn).
- `npx prettier --ignore-path=/dev/null --check` on copies of the styleguide at `dc058bbc`, `83f6bf6a` and the head — exit 1 for each; Prettier rewrites 33 lines at `dc058bbc` and 34 at the head, all in the table Roles (finding 6 of the earlier review, above).
- Manual:
  - the five ratios of `#71717b`, the ratios of `#3f3f46` and `#9f9fa9`, and the greys `#68…`–`#71717b` against the five backgrounds, all recomputed by the WCAG 2.2 formula (`python -c`);
  - the invariant sentence compared with the test's docstring (equal);
  - `git diff` of `src/browser` filtered to non-comment lines (none) and of `tests/view` and `src/browser/view` (empty);
  - line widths of the changed lines.
- Not run: the full gate (`npm test` with no file), which is the cycle's own run; no browser, since no behaviour changed.

## Reach beyond the dispatch

- `reports/review-fix2-report.md`, whole: where the figure 2.5 could come from (finding 1).
- D-41 (`foundations/decisions.md:5063-5076`), read whole between D-40 and D-42.
- `src/browser/program-panel.css:225-475`: the backgrounds a row can take, and the window's rule (which colours the frame touches).
- `guidelines/styleguide-browser-view.md`: lines 180-229, 470-504, 1225-1274 and 1810-1819, plus a search for `window-frame|ramk… okna|cień|cienia|3:1` over the whole file and the heading at `:1710`.
- `.the-way/elements/invariants/skill/SKILL.md` and `.the-way/elements/invariants/template.md`, whole: the rules of the invariant's element, as the handoff names them.

## Working copies

`.runs/review-return2/` held three copies of the styleguide (at `dc058bbc`, `83f6bf6a` and the head) and their Prettier output. I removed it with `rm -rf ".runs/review-return2"`. `git status --short` of the reviewed worktree is empty. No worktree was made and no browser was opened.

## Unread material

- Decisions read whole: 3 — D-40, D-41, D-42.
- `guidelines/styleguide-browser-view.md` (about 1895 lines) is not read whole. What I read is listed above under the reach.
- `guidelines/coding.md` and `guidelines/testing.md` are not read. The range changes comments, one invariant entry and one test's pair list and flagged case, so no rule of size or structure is reached.
- Of the invariant's element I did not read `elements/common/rules.md`, `skill/decide_entry.md`, `skill/draft.md`, `skill/write.md` or `examples.md`.

## Searches not found or unclear

- Which exact pixel row the author's "about 2.5:1 / about 3:1" was read from: the author's report says only "measured in the game". The figures match the probe 3 px below the edge and the k ≈ 0.58 of `review-fix2-report.md`.
