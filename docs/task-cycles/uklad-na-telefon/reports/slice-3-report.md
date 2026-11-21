Status: done

# Slice 3 report: tests of the program editor and of the run screen cite the new D-288 and D-19

## Commits

- `0b99767b` on `task/uklad-na-telefon` (base `68ce5c37`), two files, explicit paths. Not pushed.

## Files changed

- `tests/view/program-editor.test.mjs`: 7 comment lines (`decision: D-288`), +7 -7 lines. Lines 233, 445, 922, 1970, 2007, 2049, 2081.
- `tests/view/run-screen.test.mjs`: 1 comment line (`decision: D-19`), +1 -1 line. Line 518.
- Total: 8 insertions, 8 deletions. `git diff -U0` shows only lines beginning `// decision: D-` changed; no assertion, test name or other line moved.

New quotations:

- D-288 (7 lines): `"Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line"`. A prefix of the binding sentence of the new D-288 that begins "Rules move by a handle…". The old tail `, with no arrows in the header of a rule group` is dropped: the sentence no longer says it.
- D-19 (line 518): `"The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered or the tapped tile or else the character's tile"`. A prefix of the binding sentence of the new D-19 that begins "The drawing of the game map…", ending before ", never on the drawing."

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Program editor tests | `npm test -- tests/view/program-editor.test.mjs` | 0 | 63 pass, 0 fail |
| Run screen tests | `npm test -- tests/view/run-screen.test.mjs` | 0 | 21 pass, 0 fail |
| Foundation check, before | `python -B .the-way/elements/common/foundation_check.py` | 1 | 41 errors, all `decision:` quotations |
| Foundation check, after | same command | 1 | 33 errors, none in `program-editor.test.mjs` or `run-screen.test.mjs`; the 33 are in `rule-editor.test.mjs` (D-288, Slice 4), `tile-list.test.mjs` and `world-area.test.mjs` (D-19), `world-area.test.mjs` and `scene-picture.test.mjs` (D-349), left to Slices 4 and 5 |

The check is red by the plan's design (its *Checks* ask for "no error but the citations left to Slices 4 and 5"). Not run: the full `npm test`, which the handoff forbids for this slice.

## Own-work check (section 3)

- Requirement: only the quotations of the two named lines change; no assertion, test name or other line changes; each new quotation is an opening of a binding sentence the test holds.
- Check: `git diff -U0` filtered to lines not starting `// decision: D-` gave zero lines; the foundation check no longer flags these 8 lines; both focused test files pass.
- Nothing failed, so no run was repeated.

## Choices

- Program editor: I used the shorter opening (up to "with such a line") for all 7 lines, not the longer one with "and by „↑” and „↓” in their header". Reason: each of the 7 tests holds drop by handle or rule arrows, which the shorter opening covers. I grepped the file for "header" and found no assertion on the absence of header arrows, so no test holds the old "no arrows in the header" claim.
- Run screen: I quoted the D-19 opening up to "the character's tile" (the words "or the tapped" included), which covers the hover case the test holds. The quotation also carries the tap clause, which this test does not hold. Way rejected: a shorter opening ending at "tapping it" (cost: a less specific citation). Cost if wrong: low; the orchestrator can shorten it.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-288 and D-19 read at the ranges the handoff gives (`:9341-9423`, `:10399-10452`); both matched the headings.
- `tests/view/program-editor.test.mjs` and `tests/view/run-screen.test.mjs`: grep and reads of the flagged lines, offsets only, before editing.
- `.the-way/elements/common/foundation_check.py` lines 72-98 read, to confirm the quotation rule (a prefix beginning a sentence, with whitespace normalised).
- The worktree's `AGENTS.md` and `.the-way/AGENTS.md` (already loaded in the session).

## Working copies

- `.runs/slice-3` holds four output files of this slice: `check.txt`, `check-after.txt`, `pe.txt`, `rs.txt`. They are plain text outputs, not worktrees or clones. Their results are copied into this report, and the files are removed at the end of this run (see the result line below).

## Unread material

- `guidelines/styleguide-browser-view.md` (1268 lines): named by the slice's *Read*; not read at all. The slice edits only comment lines, so the styleguide does not change what it does; this is a gap in the read, not a checked fact.
- `.runs/task-cycles/uklad-na-telefon/task.md:35-36` (To do, items 6 and 7): named by the *Read*; not read. The handoff's copied passages were enough for the edit.
- `.runs/task-cycles/uklad-na-telefon/plan.md`: only the passages the handoff copies; not opened.
- `guidelines/coding.md`: read whole (416 lines). `guidelines/testing.md`: read whole (510 lines, in pages). `src/browser/AGENTS.md`: read whole.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole. `ui_check.md` and `walkthrough.md`: not read; not required (no change alters what a screen shows).

## Searches not found or unclear

- None unresolved. The D-288 and D-19 ranges and the flagged lines all matched the handoff.
- The commit hook (`rules-on-demand`) blocked the first commit attempt with the git rules; I read them from its output and repeated the same commit with the same paths and an English message. The commit carries the author address the rules name for this remote (`the author's private address`), as the rules describe; the orchestrator may want to confirm that is intended for this repo.

## Questions for the orchestrator

- None blocking. Optional: whether the run-screen D-19 citation should stop before "or the tapped tile", to hold only the hover clause the test holds.
