PASS 589ef0c05f3b07746d28c13e43b9ad1d4fc8d411

# Review of correction 1 — task `ekran-postaci`

Range `00b952cff519b41871d5736ec8aed18813fd4a0d..589ef0c05f3b07746d28c13e43b9ad1d4fc8d411`, one commit (`589ef0c0`), five files:
`foundations/decisions.md`, `foundations/invariants.md`, `guidelines/styleguide-browser-view.md`,
`tests/invariants/test_design_token_contrast.py`, `tests/view/character-screen.test.mjs`. `git rev-parse HEAD` in the worktree
is `589ef0c05f3b07746d28c13e43b9ad1d4fc8d411`; `.the-way` stands on the pinned `19e5774a…`. Method: `.the-way/task-cycle/review/SKILL.md`
with `fix.md` (a correction for the human's remarks).

Counts: blocking 0, Minor 2, out of scope 0.

## Remarks, each as made or not

1. „Let it through: the check by hand outside Chrome …” — let through, nothing to make; the range touches no file of the figure,
   the credit line or the walk. Made (as nothing).
2. „… add a contrast check for the pair "practice bar track grey on the block" with a floor below today's value of about 2.3 to 1
   (for example 2 to 1) … No new colour value is needed.” — **made.** `tests/invariants/test_design_token_contrast.py:77` adds
   `("text-disabled", "panel", TRACK_THRESHOLD)` with `TRACK_THRESHOLD = 2.0` (`:63`). Today's value `#52525c` on `panel` `#18181b`
   is 2.295:1, computed with the test's own `contrast_ratio`, so the floor stands below it with room; `src/browser/tokens.css`
   is untouched by the range, so no colour value changed. The check fails when the grey is moved toward the block: with
   `--text-disabled: #3a3a3a` in the real file (a worktree of the head, restored) the test exits 1 with
   „--text-disabled #3a3a3a on --panel #18181b: 1.558:1, less than 2.0:1”.
3. „Let it through: the focus ring when the screen is opened by a typed address …” — let through, nothing to make; the range
   touches no focus code. Made (as nothing).
- „Items 4–8 accepted. The two departures … accepted as they are.” — `git diff --name-only 00b952cf..589ef0c0 -- src assets` is
  empty: nothing of the look changed. The entry edits add the floor alone; no other words of D-40, D-42, D-48, the invariant or
  the styleguide changed (read in the diff word by word).

## Findings

### Minor

**M1 — the floor of 2:1 is written as binding text in six places, two of them outside the entry that holds thresholds.**
Within the task. Places: D-42 (`foundations/decisions.md:5053`, the holder of every threshold), D-40's binding sentence
(`foundations/decisions.md:5023`, „its track in `text-disabled`, at a contrast ratio of at least 2:1 against `panel` (D-42)”),
the invariant (`foundations/invariants.md:500`), the styleguide's rule „Contrast of every pair”
(`guidelines/styleguide-browser-view.md:187-190`), its roles table (`guidelines/styleguide-browser-view.md:29`, „z progiem 2:1
wobec `panel` (D-42)”) and its rule „The screen Postać” (`guidelines/styleguide-browser-view.md:802-803`, „z co najmniej 2:1
wobec `panel`, które pilnuje test kontrastu (D-42)”). What is wrong: `.the-way/product-guidelines/template.md:90-97` says a rule
repeats no decision, since the copy drifts from the first; the roles table's column is „Meaning for the user”, one sentence of
what the user understands on seeing the role (`.the-way/product-guidelines/styleguide/template.md:82-83`), and a threshold is no
such meaning; and D-40 now binds a value D-42 binds too, so a later change of the floor has two decisions to change. Why it is
only Minor: every copy agrees with D-42 and with the test today, each cites D-42 so the rule „A changed entry brings its rules
along” finds it by identifier, the screen test's quotation of D-40 pins D-40's sentence for `foundation_check.py`, and the
styleguide already repeats D-42's other thresholds in the contrast rule and a „bez progu kontrastu” in the `condition-unmet` row,
so the change follows the file's own convention; no reader is misled. Evidence: the six lines above; `foundation_check.py` 0
errors. A leaner form would keep the number in D-42, the invariant and the contrast rule, and let D-40, the roles table and the
Postać rule name the pair by „(D-42)” without the number.

**M2 — the rule „The screen Postać” now cites D-42 in its text while its *Decision* field does not name it.**
Within the task. Place: `guidelines/styleguide-browser-view.md:771` (*Decision:* D-445 · … · D-39 · D-40 · D-43 · D-44) against
`:802-803`. The template asks the field for at least one decision that carries the rule's choice
(`.the-way/product-guidelines/template.md:79-82`), which it has, so this is no breach; but an agent that selects rules by their
*Decision* field when D-42 changes would not reach this rule through the field, only through a search of the number in the text
(which the template's „A changed entry brings its rules along” does by identifier anywhere, so it is found). *Invariant: none*
stays right: `design-token-contrast` checks one clause of the rule, not the rule; the contrast rule carries the invariant.
Evidence: the two lines quoted.

No Critical or Important finding. No finding of code that passes a test without meeting the requirement: the range changes no
product code, and the test computes the ratio by the definitions of `wcag-contrast-ratio` from the real token file.

## Points the orchestrator asked about

- **The pair holds at 2:1 and fails near the panel.** Yes — the control case `FLAGGED["the track of the practice bar at 1.846:1 on
  panel"]` (`test_design_token_contrast.py:236-239`) and the real file mutated to `#3a3a3a` both fail; with the pair's line removed
  from `PAIRS` the control case fails („the check does not flag the track of the practice bar at 1.846:1 on panel …: []”), so
  the control proves the pair.
- **The floor is the track's only.** Yes. `text-disabled` is in no `TEXT_ROLES` and in no 3:1 list; `PAIRS` holds exactly one pair
  with it, `('text-disabled', 'panel', 2.0)` (printed from the module). The made-up passing tokens give `text-disabled` `#555555`,
  2.817:1 on black on all five backgrounds — below 3 and 4.5 — and `findings(changed({}))` stays empty, so no threshold of 3:1 or
  4.5:1 reaches it; with the pair raised to `NON_TEXT_THRESHOLD` that control fails („passing made-up tokens are flagged …
  2.817:1, less than 3.0:1”). No other background holds it: the real file passes while `#52525c` stands at 1.929:1 on
  `highlight`, 1.956:1 on `rule-winning` and 1.918:1 on `rule-running`, all below 2. The sentences of D-42 („has no threshold as
  text, while as the track … at least 2:1 against `panel`, a pair of its own”), of the invariant (`panel` alone) and of the
  styleguide („tekstu w `text-disabled` ten próg nie dotyczy”) say the same.
- **The sentences agree, and none still says no check holds the pair.** D-42, D-40, D-48 *Verification* („`text-disabled` for the
  one pair of the track …”, and the test's `ROLES` now reads `--text-disabled`), the invariant, the test's docstring and the
  styleguide's three places agree with one another and with `PAIRS`. A search for `text-disabled` across the tracked tree (outside
  `.runs/`) finds no sentence left that says it has no threshold at all or is in none of the pairs; the styleguide's line 177
  („każda rola rodzaju `text` poza `text-disabled` … 4,5:1”) stays true. No binding sentence beyond the pair changed. The
  quotation of D-40 at `tests/view/character-screen.test.mjs:646` is the D-40 sentence word for word as it stands at
  `foundations/decisions.md:5023`, and `foundation_check.py` reports 0 errors.
- **The look.** `src/**` and `assets/**` are untouched by the range; the track is drawn by `src/browser/character-screen.css:214`
  on the `panel` of `screen-area`, with no hover background on the row (no `hover`, `highlight` or other background in that
  stylesheet), so the pair the test holds is the pair on screen.
- **Trust boundary.** The range touches no file of `assets/icons/**`.

## Declined to judge

- The track's contrast against any background other than `panel` — the track stands on no other background on screen, and the
  human's remark asks for the pair on the block alone.
- Whether 2:1 is the right floor rather than 3:1 of WCAG 1.4.11 — the human's remark sets it, below today's value, with no new
  colour.
- The focus ring on a screen opened by a typed address (remark 3) and the check by hand outside Chrome (remark 1) — let through
  by the human.

## Checks

- `git rev-parse HEAD` — `589ef0c05f3b07746d28c13e43b9ad1d4fc8d411`; `git -C .the-way rev-parse HEAD` equals the gitlink `19e5774a…`.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, „0 errors”.
- `npm test -- tests/invariants/test_design_token_contrast.py` (reviewed worktree) — exit 0, 3 tests OK.
- In a detached worktree of the head under `.runs/review-correction-1/head`:
  - the same command, unchanged — exit 0;
  - `src/browser/tokens.css` with `--text-disabled: #3a3a3a` — exit 1, „--text-disabled #3a3a3a on --panel #18181b: 1.558:1, less
    than 2.0:1”; restored with `git checkout`;
  - the test with the line `("text-disabled", "panel", TRACK_THRESHOLD),` deleted — exit 1, the control case of 1.846:1 is not
    flagged; restored;
  - the test with that pair at `NON_TEXT_THRESHOLD` — exit 1, the passing made-up tokens are flagged at 2.817:1 against 3.0;
    restored.
- A scratch script importing the head's test module and printing `contrast_ratio` for `#52525c` against the five real
  backgrounds (2.577, 2.295, 1.929, 1.956, 1.918), `#555555` and `#3a3a3a` on black (2.817, 1.846), `#3a3a3a` on `panel` (1.558),
  `highlight` on `panel` (1.189), and the pairs holding `text-disabled` — exit 0.
- `npm test -- tests/view/character-screen.test.mjs` (reviewed worktree) — exit 0, 15 pass, 0 fail; `git status --short` clean
  after it.
- `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_design_token_contrast.py` — exit 0;
  `ruff.exe format --check` on the same file — exit 0.
- Not run: the full gate (`npm test` with no argument), by the cycle's rule — CI runs it after the orchestrator's push;
  `python -B .the-way/instruction-files/check_instructions.py` — the range touches no instruction file; no screenshot — the look
  does not change.

## Reaches beyond the dispatch

- `guidelines/testing.md`, whole — `AGENTS.md` asks it before reviewing tests; compared with „Where the expected value comes
  from” (the floor comes from D-42) and „Changing an existing test” (`PASSING` for `text-disabled` changed from `#000000` to
  `#555555` with its reason in the requirement, which strengthens the control).
- `.the-way/elements/invariants/template.md`, whole — the form of the changed invariant.
- `.the-way/elements/decisions/template.md`, by a search of „sentence|Verification|Rationale” and the lines found — the form of
  the binding sentences and *Verification* of D-40, D-42, D-48.
- `.the-way/product-guidelines/template.md:50-119` and `.the-way/product-guidelines/styleguide/template.md:50-99` — the form of a
  rule and of the roles table (SKILL.md section 2, a change that writes guidelines); M1 and M2.
- `foundations/decisions.md:5012-5156`, read as one range: D-40, D-42, D-48 whole, and D-39's tail, D-41, D-43–D-47 with them.
- `foundations/invariants.md:495-507` — `design-token-contrast` whole.
- `guidelines/styleguide-browser-view.md:1-89`, `:167-199`, `:766-811` — the roles table, the rules „Each role in its meaning”,
  „Every background with its text”, „Contrast of every pair” and „The screen Postać” whole.
- `src/browser/tokens.css` by a search of the six roles' declarations — today's values.
- `src/browser/character-screen.css:150-224` and a search of it for `hover|highlight|background` — the track stands on `panel`.
- `tests/invariants/test_browser_view_token_values.py:290-330` — a hit of the search for `text-disabled` (a list of role names,
  not touched).
- `.runs/task-cycles/ekran-postaci/task.md`: *Decisions in play* (lines 170-206) and a search for the bar and contrast — the
  settlement of row 9 („sentence of D-40”, the bar's look) is kept.
- `the author's rule on writing scripts, kept outside the repository` — the user's rule before writing a script.

## Unread material

- `.the-way/elements/decisions/template.md` — read by search and the passages found, not whole.
- `guidelines/styleguide-browser-view.md` — read in the ranges named above, not whole (1200+ lines; the range changes three
  places in it).
- `guidelines/coding.md` — not read; the range changes no product code but a test, and the testing guidelines were read.
- `.runs/task-cycles/ekran-postaci/task.md` — *Decisions in play* and search hits only.

## Searches not found or unclear

none

## Working copies

A detached worktree of `589ef0c0` at `.runs/worktrees/ekran-postaci/.runs/review-correction-1/head`
(removed with `git worktree remove --force`, then `git worktree prune`), a scratch script at
`.runs/worktrees/ekran-postaci/.runs/review-correction-1/scripts/ratios.py` and the log
`.runs/worktrees/ekran-postaci/.runs/review-correction-1/screen-test.log` — the whole directory
`.runs/worktrees/ekran-postaci/.runs/review-correction-1` removed by its full path. Nothing kept in
`reports/` beyond this report; the results it needs are quoted above. No remainder.
