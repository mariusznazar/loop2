# Fix report — whole-change review, task `scena-z-ludzikiem`

**Status:** done.

**Commit:** see the line below the table (on top of `c6dd7c3`). File changed: `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md` (1 line added, 1 removed).

## I1 — fixed

- **How:** in D-43 *Verification*, the complies example "the frames and positions of the mage's sprite written in `px` in the stylesheet of the scene" now reads "the frames and positions of the mage's sprite given from TypeScript as percentages of the scene's width and height". I did not use "frame of the scene" for the area, to keep "frame" for the frames of a sprite. The binding sentence ("the frames and positions of a sprite") is unchanged, as the coordinator said; the gap between it and what the guard lets through in a stylesheet stays for the request to name.
- **Same example elsewhere:** searched `foundations/decisions.md` for `px` in the entries I wrote or edited (D-316 to D-322, D-04, D-39, D-40, D-122, D-271, and D-43's Rationale and Rejected). No other entry gives a sprite position or frame in `px`; D-43 line 914 was the only one. Nothing else changed.
- **Written through** the project skill `the-way-record-decision` (D-43 changed in place; one example line, no new question, no binding-sentence change).
- **Checks:**
  - `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
  - The finding's probe (`python -B -c "import test_browser_view_token_values as t; …"` in `tests/invariants/`) — exit 0, output `['the length 42px']`, `['the length -64px']`, `[]`: the guard still refuses a sprite position in `px` in a stylesheet, which is why the example was wrong and why the new one (TypeScript, percentages) agrees with it.
  - `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests OK.

## Reaches beyond the findings file

- `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\.the-way\task-cycle\change\fix.md` (read as the table says); `foundations/decisions.md` searched for `px`.

## Searches not found or unclear:

none
