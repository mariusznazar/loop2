PASS 23e22246e6116835772ba1fa9c0cf82bb5f8cf28

# Review 4 — correction 1 for the human's remarks, task trzy-chwile-gdy-czas-stoi

Range `67bc237b..23e22246e6116835772ba1fa9c0cf82bb5f8cf28`, one commit (`23e22246`); `git rev-parse HEAD` in the
worktree is that head. Files: `guidelines/styleguide-browser-view.md` (+6 / −7), `src/browser/styles.css`
(+2 / −2), `src/browser/tokens.css` (+4 / −4).

The remarks this correction answers are in `reports/correction-1-handoff.md`. On 2026-11-12 Mariusz accepted
the colours the cycle proposed, unchanged: the cold layer `#2f5fd0` at opacity `0.5`, and the specks
`#b21818` and `#985a3b`. His words: „1 i 2 akceptuję w zaproponowanej formie / resztę akceptuję również”.

**The correction makes the remark:** every place that called these colours proposed or awaiting his choice
now states his choice, and nothing else changed.

## The remark, point by point

1. **No value, timing, code path or test changed.** In `git diff 67bc237b..23e22246` the only lines changed in
   `src/` are comments.
   - `tokens.css:91-94`: the values `#2f5fd0`, `0.5`, `#b21818` and `#985a3b` stand as at the base; only the
     text after `/* Source:` changed.
   - `styles.css:2226-2227`: two comment lines of the cold layer's rule.
   - No test file is in the range.
2. **The `Source:` lines of the four tokens.**
   - Each still opens with `Source:` right after the `;`, on the same line, the form `design-token-sources`
     reads; its test passes.
   - The descriptions are kept: the blue cold layer on a hue far from the grey-green of streak 0, the opacity
     of the cold layer, and "a speck of light" with its measured ratio.
   - The two specks keep their pixel addresses, `(14, 14)` and `(2, 15)` of `Bonfire_03-Sheet.png` at loop
     `cdc7c0d`.
   - The source now reads „Mariusz's choice at the request of the task trzy-chwile-gdy-czas-stoi, 2026-11-12,
     accepting the cycle's proposal as it stood (question 9 of that task)”. That is the shape of the
     neighbouring entries („Mariusz's choice … (question N of that task)”, `tokens.css:86-88`). The date and
     the acceptance are those the remarks give; nothing is quoted that the remarks do not hold.
   - The dropped clause „no source fixes it” no longer holds now that his choice fixes the value, so dropping
     it is right.
3. **The changed sentences are true and in the language and form of their neighbours.**
   - `guidelines/styleguide-browser-view.md:357-362` is a bullet of the rule "Every value with its source". It
     is in Polish and shaped like the bullet above it for the task swit-rosnacy-z-passa: whose choice, from
     what, task name and date.
   - `guidelines/styleguide-browser-view.md:747-748` is in Polish and says the cycle proposed and Mariusz chose.
   - `src/browser/styles.css:2226-2227` is in English, like the whole comment.
4. **The hits the author left, and the search for others.**
   - D-271 *Verification* (`foundations/decisions.md:5791`), „a cold layer whose colour no choice of the human
     gave”: rightly left. It is a general rule, and the code now meets it.
   - D-322 *Rationale* (`:7324`), „the colours of the cold layer and of the specks and the lengths of the
     effects come from a choice of the human made on screenshots”: rightly left, and true now.
   - I searched `foundations/`, `guidelines/`, `src/`, `tests/` and `README.md` at the head myself for
     `pending|propos|propon|propozycj|do wyboru|wybier|no choice of the human|choice of the human|human chooses|human's choice`.
     No other hit calls these colours proposed or pending. The remaining hits are unrelated: `pendingFocus`,
     `effectPending`, „Wybierz mapę z listy.” and the like. The only hits about these colours are the four
     token lines, the two styleguide places, the stylesheet comment and the two entries above.

## Findings

None: no Critical, Important or Minor finding, and nothing out of scope.

## Declined to judge

- The colours themselves: the human chose them (remark item 2).

## Checks run

In a fresh clone of `23e22246` under the worktree's `.runs/review-4-head`. Its `.the-way` came from the
worktree's submodule at `55afa8e5`, which equals the gitlink. The clone was deleted afterwards, and the worktree
is clean.

- `npm ci` — exit 0.
- `npm test -- tests/invariants/test_design_token_sources.py` — exit 0, 2 tests OK.
- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0, 3 OK.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 OK.
- `npx prettier --check src/browser/tokens.css src/browser/styles.css guidelines/styleguide-browser-view.md` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `git diff 67bc237b..23e22246` read whole: only comment and guideline text changed.
- `git grep` at the head with the pattern above — results as given in point 4.
- Not run: the full `npm test`, which is the cycle's own run. No view test was rerun: no code, CSS rule or
  value changed.

## Reaches beyond the dispatch

- `reports/correction-1-handoff.md`, the remarks section: to check the date and the wording of the human's
  acceptance against the new `Source:` lines.

## Unread material

The range's diff, `reports/review-4-handoff.md`, `reports/correction-1-report.md` and the remarks section of
`reports/correction-1-handoff.md` were read whole. My foundation and guideline selection is that of review 1;
the entries hit by the search (D-271, D-322) were read again at the head.

## Searches not found or unclear

none
