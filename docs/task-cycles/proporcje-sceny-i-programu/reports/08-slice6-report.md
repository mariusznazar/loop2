# Slice 6 report — the styleguide speaks of the new layout and the one scene size

## Status

`done`

## Files and commits

- Commit `38dfa8c` — `docs: :memo: say in the styleguide that the tabs stand under the world and the scene has one size`
- Base: `df84a1d`. Only file changed: `guidelines/styleguide-browser-view.md` (9 insertions, 8 deletions).

## What changed (four places, all in Polish)

1. `guidelines/styleguide-browser-view.md:127-128` (paragraph on the scene's exceptions): "przy każdej skali" replaced by "bo scena ma jeden rozmiar".
2. `guidelines/styleguide-browser-view.md:401-402` (rule on tabs): "nad prawym obszarem ekranu przejścia, gdy nie stoi w nim otwarty edytor reguły" replaced by "nad treścią obszaru pod światem na ekranie przejścia; otwarty panel reguły ich nie zastępuje (D-311)".
3. `guidelines/styleguide-browser-view.md:596-598` (progress bar line): "a przy skali 2 — `calc(var(--bar-width) * 2)`" replaced by "`--bar-width` podwojoną, `calc(var(--bar-width) * 2)`, bo cała scena jest rysowana w dwukrotności swojego obrazu". The wording follows the comment at `src/browser/styles.css:1730`.
4. `guidelines/styleguide-browser-view.md:626-628` (opening of the chronicle rule): "Prawy obszar ekranu przejścia, gdy nie stoi w nim otwarty edytor reguły, ma" replaced by "Obszar pod światem na ekranie przejścia, pod rysunkiem mapy i linią kafelka, ma".

Roles, values, decision lists and the sentence at `:645-646` (`src/browser/view/right-area.tsx`, which exists) are unchanged. The spacing-scale wording ("skala odstępów") is untouched.

## Checks

- `grep -n -i "prawy obszar\|prawego obszaru\|prawym obszarem\|skali\|skal[aęi] [12]" guidelines/styleguide-browser-view.md`: exit 0. The remaining hits are only spacing-scale lines (`:86`, `:92`, `:293`, `:294`, `:330`), which the handoff exempts. No line speaks of the map run's right area or of a scene scale. Also `grep -c "nie stoi w nim"` returns 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, output "0 errors", as the handoff expects.
- Tests: none written or run. The slice is prose only and its handoff names no test. `npm test` was not run, as the handoff requires; the full gate is the orchestrator's run.
- `ui_check.md`: read. Not applicable, because the change alters no screen; no browser check was needed, as the handoff states.

## Own-work check (section 3)

- Requirement: the styleguide must say the tabs stand in the area under the world, an open rule panel does not take their place, and the scene has one size, with no "prawy obszar" or scale wording left for the map run or the scene.
- Check: the grep above, plus a read of the four changed passages against D-311 (tabs under the drawing of the map and the line of a tile, in the left column) and D-349 (one size, 672 × 304, twice the picture).
- Result: passed on the first run. No check failed, so no rerun pair exists.

## Reaches beyond the dispatch (section 1)

- `src/browser/AGENTS.md`: read whole, as the handoff names it. No change needed.
- `.the-way/task-cycle/change/ui_check.md`: read, as the handoff names it.
- `src/browser/styles.css:1725-1755`, read through `grep` for "bar", "scale" and "672": to match the wording of the progress bar line to the code comment there. Read-only.
- The foundation entries D-311, D-343, D-288, D-282, D-43 and D-349 were read whole, at the ranges the handoff gives. The plan's "Row 1, Row 2 and Row 3" are D-288, D-311 and D-349 (see the Settlements table in `task.md:114-122`).

## Searches not found or unclear

- A line about a rule panel standing beside the rows or in a column of its own: none found in the styleguide (`grep -i "obok|kolumn|pod wierszem|panel reguły"`). The Program editor rule (`:568`) says only that the panel stands on the `panel` background with a `divider` frame, and says nothing about its position. Nothing to change, since the old text did not say it either. Noted for the orchestrator.
- D-349 is not cited in the styleguide. The scene paragraph (`:579`) lists D-272 · D-291 · D-316 · D-317 · D-319 · D-320 · D-321 · D-322 but not D-349, though its text now states the one size. The handoff says decisions cited stay as the foundation left them, so I did not add D-349 to that Decision line. See the question below.

## Choices made

- "nad treścią obszaru pod światem" (rather than "nad obszarem pod światem"): the tab buttons head the content of the area, and "obszar" alone reads as the whole area. Rejected: "nad obszarem", which could be read as above the whole area. Cost if wrong: one phrase of wording, easy to change.
- "bo scena ma jeden rozmiar" in place of "przy każdej skali": it states the reason in the scene's new terms and speaks of no scale. Rejected: keeping "przy każdej skali" with a new meaning, which would still speak of scales.
- "podwojoną" added before the `calc(...)` expression: it says in words what the expression does. Rejected: leaving only the expression, which a reader would not link to the scene's size.

## Question for the orchestrator (not decided by me)

Should D-349 be added to the Decision line of "The scene of a map run" (`guidelines/styleguide-browser-view.md:579`), since that rule now states the one scene size? My recommendation: yes, in the same styleguide pass, because the rule names the scene's size and a reader or reviewer would look for its decision there. If it is not added, the rule still cites the right decisions for its colours and roles, and only the citation of the size is missing. Cost of adding: one identifier in one line; cost of not adding: a reviewer may not find the decision behind the size.

## Problems observed

None in the code or foundation. The sentence the handoff says stays true (`:645-646`, the module `src/browser/view/right-area.tsx`) is true: the file exists.
