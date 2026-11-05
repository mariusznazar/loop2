# Report — slice 1, task edytor-programu

**Status:** done

## Commits
- see `git log` on branch task/edytor-programu (one commit, "docs: add the pick cell, the program editor, ..."), base 083b347.

## Files changed
- `guidelines/styleguide-browser-view.md` (55 added, 7 removed)

## What was written
- (a) Pick cell `src/browser/view/controls/pick-cell.ts` added to the departures of *States of shared controls*: default, hover, focus (D-47), chosen, greyed (dashed, text-disabled name, text-secondary reason, keyboard-reachable, choice does nothing), error/empty/loading not applying with reasons, mask icon greying with the cell. Rule Decision field extended with D-288, D-289, D-291, D-39, D-40, D-43, D-47.
- (b) New rule *Program editor* (after *Menu bar...*), roles for row, group header, rule panel, drop line (D-279); rule *A line at a text takes the colour of that text* names the drop line.
- (c) Destructive button: neutral text in `text` at rest, `danger` under pointer and at focus, both forms, six buttons; kitchen-sink rule says the page shows it at rest, under the pointer and at the focus. *Every background with its text* needed no change (already says the destructive button keeps `danger` under the pointer).
- (d) Icons sentence: both ways side by side until task 24.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (4 tests OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0 (3 tests OK).
- Full gate not run (per handoff). No test written first: prose only.

## Own-work check
Weakest point: adding meaning not carried by the task/decisions. Checked each added sentence against To do 12-15, questions 5, 8, 9, 17 and D-288/289/291/43/44/39/279; roles used are exactly those named there. Cited D-92/93/292/293 for number, time and count roles; the role assignment (text-label) comes from To do 13, the decisions only name what is shown.

## Reaches beyond the handoff
- `foundations/decisions.md` D-288..D-291 (whole) and D-43/D-39/D-44 current text, to cite identifiers; grep of D-292..D-307 headings (D-292, D-293, D-93 cited by title only, not read whole).
- grep of `foundations/glossary.md` for the pick cell, drop line, rule panel.

## Searches not found or unclear
- Glossary has no entries for "pick cell", "rule panel" or "drop line" (plan row E39 was only a candidate); the styleguide defines the drop line in a clause and uses the others as D-288 names them. Not a blocker.
- Plan names no ids for rows E1/E3/E10/E11 beyond handoff text; I used D-288 (E1), D-44, D-43, D-39 as in the handoff.

## Concerns / questions
none. Choice made: the new rule is called *Program editor* and placed after the menu bar rule, before `## Examples`; the destructive state text says "neutral, text in `text`" without naming a frame colour (task names none).
