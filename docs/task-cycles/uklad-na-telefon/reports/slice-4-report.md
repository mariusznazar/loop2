done

# Slice 4 report: tests of the rule list cite the new D-288 and D-19, and read a cell's name whatever its markup

Worktree: `the task's worktree`, branch `task/uklad-na-telefon`.
Slice base: `0b99767bab8e997ac9bae05e7c2a23bd5b3cb009`. Pinned the-way checked: `git -C .the-way rev-parse HEAD` = `80006b25feb4c5a6ffdb8f75d993051eecbc745d`, the commit the gitlink records.

## Status and commits

- Status: `done`
- Commit: `69a84584` on `task/uklad-na-telefon` (not pushed). Staged by path, three files.
- Diff: 3 files changed, 37 insertions, 37 deletions. Comment lines and the `nameOf` helper only; no assertion, test name or test body changed.
  - `tests/view/rule-editor.test.mjs`: 50 lines (a `nameOf` helper and 20 `decision: D-288` comment lines)
  - `tests/view/tile-list.test.mjs`: 14 lines (7 `decision: D-19` comment lines)
  - `tests/view/item-verb-panel.test.mjs`: 10 lines (`nameOf` helper only)

## What changed

1. **`decision: D-288` citations** (`tests/view/rule-editor.test.mjs`, 20 lines: 384, 402, 416, 426, 440, 454, 561, 646, 663, 678, 691, 711, 728, 740, 767, 791, 816, 841, 860, 2039). The old quotation ended with `, with no arrows in the header of a rule group`, which the new D-288 no longer says. Every one now quotes the opening of the rules sentence of the new D-288, which both the two cases named in the plan (tests "a row has „↑”, „↓” and the destructive „Usuń”, and a header has no arrows" and "the buttons of an old „Dodaj regułę”, „Dodaj grupę” and the arrows of a group are gone") and the other rule-move tests hold:
   `Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line`
   This is a prefix of the D-288 body sentence (decisions.md:9348-9351, "Rules move by a handle … in every layout; …").
2. **`decision: D-19` citations** (`tests/view/tile-list.test.mjs`, 7 lines: 96, 113, 219, 237, 250, 256, 271).
   - Lines 96 and 113 (stock of each row, fresh run lists a tile) quote: `The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles, and the numbers of stock stand in that list`
   - Lines 219, 237, 250, 256, 271 (the line under the drawing) quote the same, extended to `…and in the line under the drawing, which shows the hovered or the tapped tile or else the character's tile`
   Both are prefixes of the D-19 body sentence (decisions.md:10401-10404).
3. **`nameOf` helper** in `tests/view/rule-editor.test.mjs` and `tests/view/item-verb-panel.test.mjs`. The old helper joined only the direct text nodes of the cell, so it reads nothing once the name stands in an element of its own (Slice 11). The new helper clones the cell, removes the `.pick-cell-reason` element, and returns the remaining `textContent`. It holds both with the name as a text node and as an element.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` (before the change): exit 1, 27 errors in the slice's two files plus 6 in files of later slices.
- `python -B .the-way/elements/common/foundation_check.py` (after the change): exit 1, `6 errors`. All six are outside this slice and are the citations left to Slice 5:
  - `tests/view/scene-picture.test.mjs:232` (D-349)
  - `tests/view/world-area.test.mjs:499` (D-349)
  - `tests/view/world-area.test.mjs:961` (D-19)
  - `tests/view/world-area.test.mjs:984` (D-19)
  - `tests/view/world-area.test.mjs:1079` (D-19)
  - `tests/view/world-area.test.mjs:1237` (D-19)
  No error remains in `rule-editor`, `tile-list` or `item-verb-panel`. Output saved at `.runs/slice-4/check.txt` and `.runs/slice-4/check-after.txt`.
- `npm test -- tests/view/rule-editor.test.mjs`: exit 0, 76 pass, 0 fail (`.runs/slice-4/test-rule-editor.txt`)
- `npm test -- tests/view/tile-list.test.mjs`: exit 0, 15 pass, 0 fail (`.runs/slice-4/test-tile-list.txt`)
- `npm test -- tests/view/item-verb-panel.test.mjs`: exit 0, 6 pass, 0 fail (`.runs/slice-4/test-item-verb-panel.txt`)
- Not run: the full gate `npm test` with no argument (outside the executor's boundary, per the handoff), and the test-first failing run. The change is comment lines plus a helper refactor that keeps behaviour, so no test was written first and no invariant test is involved.

## Own-work check (method section 3)

- Requirement: the helper must read a cell's name whether it is a text node of the cell or stands in an element of its own (the handoff's goal, the plan's Slice 4 goal).
- Check: temporarily wrapped the name in `src/browser/view/controls/react-pick-cell.tsx` as `<span className="pick-cell-name">{text}</span>`, then ran the two affected editor test files with the new helper.
- Result: `tests/view/rule-editor.test.mjs` exit 0, 76 pass, 0 fail (`.runs/slice-4/test-rule-editor-wrapped.txt`); `tests/view/item-verb-panel.test.mjs` exit 0, 6 pass, 0 fail (`.runs/slice-4/test-item-verb-panel-wrapped.txt`).
- Then restored the file with `git checkout -- src/browser/view/controls/react-pick-cell.tsx`. `git status` after the commit is clean; the committed diff does not touch the pick cell.

## Working copies

- No worktree, clone or script was made. The directory `.runs/slice-4/` holds the text outputs of the checks above (`check.txt`, `check-after.txt`, `test-*.txt`). These are logs, not copies, and are left in the ignored `.runs/` directory.

## Choices

- Choice: the two cases named in the plan and the other rule-move tests all quote the same prefix, the rules sentence of the new D-288. Way rejected: quoting the arrows-in-header sentence for the other tests, which would hold a sentence of Slice 13 that the tests do not yet hold. Cost if wrong: low; Slice 13 changes these two cases and the orchestrator can adjust them there.
- Choice: the five tile-list tests that concern the line under the drawing quote that line's clause as well as the opening. Way rejected: the opening alone. Cost if wrong: none for the check, which accepts any prefix; the longer quote shows the test holds the line clause.

## Unread material

- `.runs/task-cycles/uklad-na-telefon/plan.md`: not read; the handoff copies the passages, and I used only those.
- `.runs/task-cycles/uklad-na-telefon/task.md`: read lines 28 to 39 (the To do items 4, 6, 7 are on lines 31, 35 and 36). Lines outside that range not read.
- `guidelines/styleguide-browser-view.md`: named in the handoff's Read and in the method's requirement for browser-view files; not read. The change touches only test comments and a helper, which the styleguide's visual rules do not govern, but I did not read it whole.
- `guidelines/coding.md`: read whole (its rules concern product code; the change is test code).
- `guidelines/testing.md`: read whole (510 lines, in three reads).
- `src/browser/AGENTS.md`: read whole.
- `foundations/decisions.md`: D-288 read at lines 9340-9423 and D-19 at lines 10398-10452, which cover the handoff's ranges.
- `src/browser/view/controls/react-pick-cell.tsx`: read whole.
- `.the-way/task-cycle/change/SKILL.md`: read whole. `.the-way/task-cycle/change/slice.md`: read whole. `ui_check.md` and `walkthrough.md`: not read; the change alters no screen or user-visible behaviour, so no walk applies (section 6 of the method).
- `the author's rule file "git" of the instruction set`: read whole, once, after the rules hook blocked the first commit attempt.
- Commit `8591aa82`: not inspected; the plan names it as the material for the fix, which Slice 11 takes over, outside this slice.

## Searches not found or unclear

- The handoff says the foundation check after this slice reports "no error but the citations left to Slice 5". The check reports six errors outside my files, all of them D-19 or D-349 citations in `scene-picture.test.mjs` and `world-area.test.mjs`. I took these to be the citations left to Slice 5. Not confirmed against the plan's Slice 5 text, which I did not read.
- The orchestrator's note says the check was red with 41 errors at dispatch. My first run showed 27 errors in the slice's files and 6 in others (33 in total, the summary line not counted). The difference is not explained; it may come from Slice 3 or from counting the file's summary line.
- The commit author in `git log` is `the author's private address`, the address the git rules give for the private account. I did not change the author; the repository's git identity was used as configured.

## Questions and concerns

- None for the orchestrator to answer before Slice 5.
- For the orchestrator: the 41 versus 33 difference above.
