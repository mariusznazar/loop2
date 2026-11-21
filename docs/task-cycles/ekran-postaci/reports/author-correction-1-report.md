done

# Author report — correction 1 after the human's remarks, task `ekran-postaci`

Variant: a correction for the human's remarks (`.the-way/task-cycle/change/SKILL.md`); the foundation
step by `.the-way/task-cycle/skill/foundation_step.md` and the invariant element's `SKILL.md`
(`.the-way/elements/invariants/skill/SKILL.md`, `decide_entry.md`, `draft.md`, `write.md`, `template.md`)
and the decision element's; the return step by `.the-way/task-cycle/skill/return_step.md`. Remarks:
`reports/correction-1-remarks.md`, read whole.

## Commits and ranges

- Correction: `00b952cf..589ef0c0` — `589ef0c0` test: hold the track of the practice bar to a floor of 2:1
  against the panel of its area … (D-42, D-40, D-48). Files: `tests/invariants/test_design_token_contrast.py`,
  `tests/view/character-screen.test.mjs` (its quotation of D-40), `foundations/decisions.md` (D-42, D-40, D-48),
  `foundations/invariants.md` (`design-token-contrast`), `guidelines/styleguide-browser-view.md`.
- Return step: none (nothing no longer matched; see below).

## Remarks, each as made, and how

1. „Let it through: the check by hand outside Chrome. …” — let through; nothing done.
2. „The grey of the bar's track: its new use is approved (merging approves it). Fix in this request the part
   that can fail silently: add a contrast check for the pair "practice bar track grey on the block" with a floor
   below today's value of about 2.3 to 1 (for example 2 to 1), so a later change of that grey toward the block's
   colour fails a test instead of fading the bars with every test green. No new colour value is needed.” — done:
   - the check of `design-token-contrast` (`tests/invariants/test_design_token_contrast.py`) gains the pair
     `("text-disabled", "panel", TRACK_THRESHOLD)` with `TRACK_THRESHOLD = 2.0`: a pair of its own, so
     `text-disabled` stays outside the text roles' 4.5:1 and the 3:1 of non-text roles and is held against no
     other background; the made-up passing tokens now give `text-disabled` #555555 (2.817:1 on black, above 2,
     below 3 and 4.5), so the control shows that no other threshold reaches it; a control case flags the track at
     1.846:1 (#3a3a3a) on `panel`. Today's value #52525c on #18181b is 2.295:1. No colour value changed.
   - The invariant's sentence: „… `tile-revealed` has at least 3:1 against `tile-hidden`, and `text-disabled`, the
     track of the bar of practice of a tree on the screen Postać, has at least 2:1 against `panel`, the background
     of the area it stands in, each ratio computed …”.
   - D-42: „… and `text-disabled` has no threshold as text, while as the track of the bar of practice of a tree on
     the screen Postać it has a contrast ratio of at least 2:1 against `panel`, a pair of its own and a floor of the
     product that no criterion of WCAG sets.” with one sentence of *Rationale* for it.
   - D-40: the track „in `text-disabled`, at a contrast ratio of at least 2:1 against `panel` (D-42)”.
   - D-48 *Verification*: the roles the test reads now name `text-disabled` for that one pair.
   - Styleguide: rule „Contrast of every pair” („`text-disabled` nie ma progu jako tekst; jako tor paska wprawy
     drzewa na ekranie Postać ma co najmniej 2:1 wobec `panel` — para osobna, próg własny produktu, nie kryterium
     WCAG …; tekstu w `text-disabled` ten próg nie dotyczy”), the roles table's `text-disabled` row, and the bar's
     item of the rule „The screen Postać”.
3. „Let it through: the focus ring when the screen is opened by a typed address …” — let through; nothing done.
- „Items 4–8 accepted. The two departures from the old Loop (the thicker bar, no clearing under the figure) are
  accepted as they are.” — nothing of their look, words or entries changed.

## Checks (command — exit code)

- Test first, the control case before the pair existed: `npm test -- tests/invariants/test_design_token_contrast.py` — 1
  („the check does not flag the track of the practice bar at 1.846:1 on panel as '--text-disabled #3a3a3a on --panel': []”).
- After the pair: `npm test -- tests/invariants/test_design_token_contrast.py` — 0 (3 tests).
- The real file with `--text-disabled` set for a moment to #3a3a3a: the same command — 1 („--text-disabled #3a3a3a on
  --panel #18181b: 1.558:1, less than 2.0:1”); `tokens.css` restored from a copy, `git diff` empty for it.
- After the foundation change: `npm test -- tests/invariants/test_design_token_contrast.py` — 0.
- `python -B .the-way/elements/common/foundation_check.py` — 1 error at first (the screen test's quotation of D-40 no
  longer in its sentence), fixed by updating the quotation, then 0 („0 errors”).
- `npm test -- tests/view/character-screen.test.mjs` — 0 (15 pass).
- `npx prettier --check tests/view/character-screen.test.mjs` — 0.
- `npm test -- tests/quality/test_quality_invariants.py` — 0 (8 tests: Ruff rules and format of the changed Python
  file among them; it set up `.runs/quality-venv`).
- Not run: the full gate (CI runs it on the orchestrator's push); no screenshot (the look does not change).

## Own-work check

Requirement most likely unmet: the floor is for the track only and puts no new demand on text in
`text-disabled`. Check: the made-up passing tokens give `text-disabled` 2.817:1 against all five backgrounds —
below 3:1 and 4.5:1 — and the check reports nothing for them; the only flagged case of `text-disabled` is against
`panel` below 2:1. Result: holds.

## Choices

- **Floor 2:1** (the remark's example): below today's 2.295:1 with room, above the 1.19:1 of `highlight` that faded
  the bars. Rejected: 3:1 of WCAG 1.4.11 — today's value fails it, and the remark asks for no new colour; a floor
  nearer today's value, such as 2.2:1 — any small rounding of the grey would fail it, with nothing gained over 2:1.
- **Where the pair stands:** in D-42 (which holds every threshold), in D-40 (which holds the track), in the sentence
  of `design-token-contrast` and its test, as the styleguide asks of a new pair („Nowa rola albo nowa para wymaga
  zmiany decyzji ról, D-42 i niezmiennika razem z jego testem”). Rejected: an invariant of its own — one check
  already computes every pair of the token file from one list.

## Return step (for what the correction touched)

- Foundation compared with code: D-42, D-40, D-48, `design-token-contrast`, the styleguide's rules „Contrast of every
  pair” and „The screen Postać” and its roles table against `test_design_token_contrast.py`, `tokens.css` and
  `character-screen.css`: match (the test's `PAIRS` holds the pair at 2:1 against `panel`; the stylesheet draws the
  track in `text-disabled`; D-48's test reads `--text-disabled` through `ROLES`). A search for sentences that said
  `text-disabled` has no threshold found only D-42 and the styleguide, both corrected in the correction; the test's
  docstring corrected too. Nothing else no longer matched.
- Decisions written or changed: D-42, D-40, D-48 (*Verification*) — in the correction.
- Invariants written or changed: `design-token-contrast` — its rule set by the human's remark 2.
- Environment facts: none (the ratio rests on `wcag-contrast-ratio`, held).
- Glossary terms: none.
- Part-map changes: none.
- Projected entries: none.
- Rows of *Settlements to record* written: none (no row; the pair comes from remark 2).

## Unread material

none

## Searches not found or unclear

none

## Working copies

`.runs/worktrees/ekran-postaci/.runs/author-correction-1` (logs, the copy of `tokens.css` used
to restore it, the commit message) and `.runs/worktrees/ekran-postaci/tests/invariants/__pycache__`
(left by a `python -c` I ran without `-B` to compute ratios) — both removed by their full paths. `.runs/quality-venv/`
is the product's own environment, made by its quality test, and stays.
