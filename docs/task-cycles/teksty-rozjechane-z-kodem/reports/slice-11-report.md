# Slice 11 report — the styleguide: forms, sources, justification, roles, example, pair

**Status:** done

**Commit:** `b8abf53` on `task/teksty-rozjechane-z-kodem` (range from `4e4ac095c58eb4c937881b93eb5b1bd32d2cbb73`).

**Files changed:** `guidelines/styleguide-browser-view.md` (+34 / -13).

## What changed, per item

- **15 (React forms).** Before the list "Kontrolki odstępujące od tej listy stanów" a short paragraph says each shared control has a DOM and a React form drawing the same element with the same classes, so a departure holds for both; it names `src/browser/view/controls/react-text-field.tsx` as the form that does not depart. The four bullets that depart now name both files: `button.ts` + `react-button.tsx` (three bullets), `select-list.ts` + `react-select-list.tsx`, `number-field.ts` + `react-number-field.tsx`, `pick-cell.ts` + `react-pick-cell.tsx`. All five React files are named.
- **16 (kind of source).** A new bullet in "Every value with its source": a value loop did not show and Mariusz chose from a preview of variants beyond the terrain and the focus — `--bar-width`, from the preview of the card's variants of 2026-11-02 in the task "przyciski-i-zakladki" (To do 7), as the comment at `--bar-width` in `src/browser/tokens.css` gives it. The lead-in sentence now says one kind was added in that task. No value is copied.
- **17 (list of programs).** "(D-40, D-280)" became "(D-40, D-331)". D-280 speaks of the screens and the menu bar, not of the list; D-331 says "the picked program on the list of programs" (text in `text-strong`, bar in `selected` at the left). D-331 was added to the *Decision* field of that rule (it was not there).
- **18 (Program editor).** "edytor nie dokłada żadnej nowej barwy, roli ani wartości" replaced by: the look comes from the roles of the table Roles and the values of the token file; the state signs (D-308) have their own background roles `rule-winning` and `rule-running` and a state bar of `--bar-width`, described below. No negative claim remains.
- **19 (Bad example).** "Strona rysuje panel terenu ze stanu gry złożonego ręcznie." replaced by "Strona składa ręcznie stan gry i rysuje z niego mapę gry albo trafia do wyniku `npm run build`." (the two violations D-45 lists). Read from `kitchen-sink.ts` as Slice 3 left it: the page draws tile samples from its own `SampleTile` list through `iconPlaces`, with no game state and no terrain panel, so the old sentence was the thing the page's samples resemble, not a violation it could commit.
- **20 (pair).** New bullet in "Contrast of every pair": the fill of the progress bar over the mage's head (`positive`) on its track (`highlight`) adds no pair or threshold — the scene rule (D-39) asks 3:1 against the track, and the first bullet already holds `positive` at 4.5:1 on `highlight`.

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0, output `0 errors` |
| contrast invariant | `python -B scripts/test.py tests/invariants/test_design_token_contrast.py` | 0 (3 tests OK) |
| whitespace | `git diff --check` | 0 |
| extra: instruction-file check | `python -B .the-way/instruction-files/check_instructions.py .` | only two WARN lines for the file, `#/mapy` at lines 524 and 532, which are untouched lines (pre-existing); no new warning |

No test was written first: the slice is prose and the invariant is unchanged (no failing run is owed; `design-token-contrast` was not touched).

## Own-work check

Requirement most likely not met: item 20 must add no role, pair or threshold. Check: ran the test's own functions on the token file values — `contrast_ratio('#00bc7d', '#27272a')` (`positive` on `highlight`) = 6.021, above both 4.5:1 and the scene rule's 3:1; the test file's `PAIRS` already holds `("positive", "highlight", 4.5)` through `TEXT_ROLES x BACKGROUNDS`. So the existing thresholds cover the pair; nothing added to the invariant, the roles table or D-42. Second likely miss: a path in backticks that does not exist — `check_instructions.py` reports no new dead path; `foundation_check.py` reports `0 errors` (D-331 and D-308 exist).

## Choices made

- **D-331 for item 17** rather than dropping the second citation: D-40 gives the roles' meanings, D-331 is the one decision that names the look of the picked program on the list. Cost if wrong: the reviewer may want D-40 alone; the change is one token. I also put D-331 in that rule's *Decision* field.
- **Item 15 wording**: one paragraph plus paired paths in the bullets, not a second list of React files. `react-text-field.tsx` is named in the paragraph only, because the text field has no departure in the list.
- **Item 16**: I cited the task name and date exactly as the comment at `--bar-width` gives them and added no vault file name (the comment does not give one).
- **Item 20 scope**: only the mage's bar, as the task says. D-39 also asks 3:1 for the fill of the bar of a met requirement in the header (`positive` on `highlight`), which the same bullet covers numerically, but the sentence does not name it.

## Reach beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/change/slice.md` (the method; named in the handoff).
- `foundations/decisions.md` sections around line 3092 (D-167), 5888 (D-277) and 7241 (D-331), plus a grep of "list of programs" — to find the decisions that speak of the list for item 17; D-331 and D-277 are not in *Read*.
- `.the-way/instruction-files/check_instructions.py` — run as an extra check.

## Unread material

Read in part, by the line ranges the handoff gave, which the entries run past (the ranges are the plan's, and some end inside an entry):
- D-269 — read from its heading (5638) to line 5645 only (the statement and the start of the bullets); not its *Verification*, *Rationale* or *Rejected*.
- D-291 — read from its heading (6294) to line 6299 only (the statement); not the rest of the entry.
- D-310 — read from its heading (6705) to line 6713 only (the statement); not the rest of the entry.
- D-349 — read from its heading (7785) to line 7795 only (the statement and the first *Verification* line); not the rest.
- D-281 — read to line 6045 (statement, *Verification*, *Origin*, *Rationale*, *Rejected*), whole.
Read whole: D-39, D-40, D-41, D-42, D-44, D-45, D-280, D-308, D-309; `foundations/part_map.md:3-28`; `foundations/invariants.md:479-497` (both entries). Not read: `tests/invariants/test_design_token_sources.py` (not in *Read*).
None of the unread parts touch the six edits (D-269 and D-349 are cited by lines I did not change; D-291 and D-310 likewise).

## Searches not found or unclear

- Which task document carries "przyciski-i-zakladki" (To do 7): not found in the repository (no vault read); the name is taken from the comment at `--bar-width` in `src/browser/tokens.css`.
- Whether the reviewer's "D-40, D-280" remark meant to drop D-40 too: unclear; I kept D-40 and replaced D-280.

## Problems observed

- None blocking. `check_instructions.py` warns that `#/mapy` (lines 524 and 532) is a dead path — present before this slice, not changed.
