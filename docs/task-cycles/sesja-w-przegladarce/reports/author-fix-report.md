# Report of the fix of the whole-change review — task `sesja-w-przegladarce`

**Status:** `done`

Findings file: `reports/whole-review-findings.md` (review `PASS 8e9c01a0`). Range of the fix: from `8e9c01a0`.

## Commits and files

- `81502efc` docs: :memo: let the styleguide's exception for the select list say what it asks of a list and of its row, and drop from it the screens and lists the product has today
  - `guidelines/styleguide-browser-view.md` +6 −7

The changes to `reports/author-report.md` (M3, M5) are not committed: `.runs/` is ignored.

## Per finding

- **M1 — fixed.** The exception in the rule "A name typed by the player breaks in its row" now reads: a select list does not break the name but cuts it, because a native select does not break text; the list is no wider than its row, and a row with a list is no wider than its column — in a flex column that does not stretch its items, the row gets `max-width: 100%`; the name of the picked position, longer than the list, ends with „…”, and the full name stands in the opened options. Dropped: "także lista „Program:” na ekranie Mapy i na ekranie przejścia" and "Wygląd listy stoi w jednym miejscu, `src/browser/styles.css` (D-265), więc tak samo zachowuje się każda lista wyboru gry" — today's state of the product, which `.the-way/product-guidelines/template.md:90-97` keeps out of a rule. The reviewer's wording contradicts nothing I found: the rule's *Good* speaks of rows that break typed names, and its *Bad* („…albo jest ucięte…”) is the general case the exception departs from, as before. The added half-sentence of reason ("bo natywne pole wyboru nie łamie tekstu") is the one sentence of reason a rule with *Decision* `none` carries (template, "A rule carries no rationale…"). Check: `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`. No test reads `guidelines/styleguide-browser-view.md` (search of `tests/` for `guidelines/`: two hits, neither this file), so no other check is touched. No code changed.
- **M3 — fixed.** In `reports/author-report.md`: the D-299 row of *Observations* is now `bad: defect for the human (relabelled in the fix; see defect 5)`; *Defects for the human* has entry 5 — the last row of the action pick under rule 1.2 stands 18 px below the window's edge in a 1280 × 720 window until the page scrolls; entry touched D-299 (its *Verification*'s "standing whole without scrolling", its rationale) with D-396; not fixed because D-299's binding sentence holds, so condition (a) of point 5 does not. The status line now counts five observations for the human.
- **M5 — fixed.** In `reports/author-report.md`: the row "Point 6 compared with the look before the split" now reads `matches, compared as text (not viewed; see *Weak spots*)`; *Weak spots of the method* opens with the comparison as stylesheet text, not viewed, the filter (pairs whose last compound shares a class: 14), the reviewer's rerun without it (7724 reversed pairs; the 35 that might meet on one element type with no shared class all on different element types; no shared control carrying a class of a screen) and what the method does not exclude (an element carrying the classes of two screen rules with no class in common).
- **M2, M4 — not mine** (handoff): they go to the request's description; no code changed for them.

Also updated in `reports/author-report.md`, to keep it true after M1: the file list under *Commits and files* names `81502efc`, and the *Choices* entry on the exception says it now names no screen or list.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0 (`0 errors`).
- Not run: the full `npm test` (the cycle's run before the request); `check_instructions.py` (no instruction file changed). No browser check: no code or stylesheet changed.

## Unread material

none — the handoff, the findings file, `.the-way/task-cycle/change/fix.md` and `.the-way/product-guidelines/template.md` lines 85–130 read whole; `reports/review-whole-report.md` not opened beyond the findings file, which cuts its Minor findings word for word.

## Searches not found or unclear

none.

## Working copies

`.runs/author/` held the log of `foundation_check.py`: removed. Remainder: none. No browser was opened and nothing was started.
