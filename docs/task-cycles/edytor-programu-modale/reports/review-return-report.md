PASS dc058bbc54cfe1b6fbaa565f7c41bf81a0da9e63

# Review of the return step — task `edytor-programu-modale`

Range: `bfc8c7f2816795132f3eb8d6a52224997259c8f1..dc058bbc54cfe1b6fbaa565f7c41bf81a0da9e63`, one commit (`dc058bbc`), diffed and logged by me. `git rev-parse HEAD` = `dc058bbc54cfe1b6fbaa565f7c41bf81a0da9e63`, the head given. `.the-way` stands at `b502011f53225451ddf121e2b772a903b87492db`, the commit the gitlink records. Files: `foundations/decisions.md` (D-166 *Rationale*, D-296 *Verification*), `.claude/skills/loop2-play/SKILL.md:331-332`, `.agents/skills/loop2-play/SKILL.md:331-332`.

Counts: blocking 0, Minor 1, out of scope 0.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — D-166's *Rationale* turns „gains it no width” into „costs it no width”, and the reason no longer follows.**
Place: `foundations/decisions.md:8431`, last sentence of D-166's *Rationale*.
Before: „Programy did not lack width when this was chosen (2026-11-08), so opening the panel in place there gains it no width.” After: „Programy did not lack width when this was chosen (2026-11-08), so opening the window under its row there costs it no width.”
What is wrong: the task asked only that the wording follow the window (To do 9), but the edit also flips what the sentence admits. The old sentence admitted a limit of the choice: Programy had width to spare, so opening in place gained it nothing there, and the choice rested on the editor working one way on both screens. The new sentence says the window *costs* Programy no width, and gives as its reason that Programy did not lack width. That does not follow: the window costs no width because it lies over the editor (D-288), whatever the width of Programy. The date „2026-11-08” now also seems to date the window under its row, which was chosen on 2026-11-25 (task, question 9).
Why it matters: nothing in the code changes. A later reader of D-166 loses the admission that the width argument did not apply on Programy, which is what the *Rejected* item „the panel of a rule beside the editor on Programy” is weighed against, and reads a sentence whose „so” does not follow. This is Minor because D-166 still agrees with the code and with D-288.
Suggested wording: „… so opening the window under its row there gains it no width.”
Evidence: `git diff bfc8c7f2..dc058bbc -- foundations/decisions.md`, hunk `@@ -8428`; D-288 `foundations/decisions.md:9450-9455`.

## Verdict on what the return step writes or corrects

- **D-296, new violating example** (`foundations/decisions.md:9690-9693`): true to the code at the head and to D-296's sentence.
  - Code: in the phone block of `src/browser/program-panel.css:576-657` a header shows its text (`rule-list-body`, `flex: 1 1 0`), one `rule-list-gap` and „▾”. The arrows, the spacer and the last gap with „✕” are `display: none` (lines 603-612). `.rule-list-header .rule-list-controls` has `align-self: stretch; align-items: stretch` (lines 623-628), and `.rule-list-gap` has `align-self: stretch` (lines 630-635). So in a header of two lines or more, the gap and „▾” fill the height, and no strip beside „▾” is bare.
  - Why a bare strip would fold the group: the header itself (`rule-list.tsx:419-434`) holds „▾”, and Chromium gives a tap on such an element to the nearby button. The comment at `program-panel.css:618-622` and the styleguide `guidelines/styleguide-browser-view.md:1207-1209` say the same.
  - The example names what the fix `9a7720aa` removed (`align-items: center` → `stretch`). It contradicts D-296's sentence „A tap or a click anywhere on the header outside its buttons opens the group”, as a violating example should. It also agrees with the side of the same pair that says what complies.
  - Wording: „a part taking the tap of its own” fits the text and the gaps, which take the tap themselves (`RowText`, `Gap`, `rule-list.tsx:180-220`).
- **D-166 *Rationale***: the change of the noun is correct; M1 covers the change of meaning. D-166's statement, *Verification* and *Rejected* are unchanged and still agree with the code.
- **`loop2-play`, both copies**: „open the window of that rule, which opens under its row and leaves the tabs as they were” is true to D-288 and to the code. The phrase „the window of that rule” keeps it apart from the browser window, which the skill names elsewhere. The copies are byte-identical. The skill has no other mention of a rule panel, of row arrows or of „Usuń”.
- **Entries kept unchanged, checked by me**: these still say „rule panel” or „panel of a rule”: D-349 *Rationale* („The width of the program comes from the rule panel opening in place (D-288)”, `:11234`), D-349 *Rejected* (`:11264`), D-19's line about the area under the world (`:10654`, `:10662`), D-311's *Rejected* (`:10883`) and D-346 (`:11181`). Each stays true under D-288's sentence „where another entry names the rule panel, it is this window”, because the window takes no column. I agree with the author's report on these.

## Declined to judge

none

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, „0 errors”.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, „0 error, 0 warn, 122 info”.
- `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` — exit 0.
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` — exit 0 (8 tests, OK).
- `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` — exit 0 (1 test, OK).
- Manual check: I searched `tests/` for the changed wording („in place under its row”, „opens in place”, „a strip above or below”, „window of that rule”). No test quotes it, so no test needed a change.
- Manual check: I read the head's CSS and the header's DOM against the D-296 example (above).
- Not run: the full gate (`npm test` with no file), which is the cycle's own run, and a browser check of a tap on a real phone. The range changes no code, and the fix that the example describes was reviewed earlier.

## Reaches beyond the dispatch

- D-288 at `foundations/decisions.md:9439-9507` (statement, *Verification*, the start of *Rationale*). I read it to check D-166's corrected sentence and D-288's sentence about the alias „rule panel”. I did not read it whole.
- Grep for „rule panel | panel of a rule | panel reguły | panel grupy” in the worktree outside `.runs`, `.the-way` and `node_modules`. I read the hits in D-19 (`:10652-10664`), D-311 *Rejected* (`:10881-10885`), D-346 (`:11180-11181`) and D-349 (`:11232-11236`, `:11262-11266`). The purpose was to look for stale wording that the return step missed.
- `src/browser/program-panel.css:556-657` and `src/browser/view/rule-list.tsx:150-220, 410-498`, to check the D-296 example against the code.
- `guidelines/styleguide-browser-view.md:1196-1213`, to check that the styleguide agrees with the D-296 example.
- `git show 9a7720aa` (CSS hunk), for the case the example records.

## Working copies

I made no working copy in the worktree: `.runs/review-return/` was never created, and the worktree stays clean (`git status --short` is empty). Two test outputs I wrote are removed: `a scratch file of the session` and `a second scratch file of the session`. I took no screenshot.

## Unread material

Decisions read whole: 2 of the 2 that the range changes (D-166 with its *Rejected*, D-296 with its *Rejected*). D-288 was a reach and was read only in part (lines 9439-9507); its *Rejected* is unread. Nothing else of the dispatch is unread: the handoff, `.the-way/task-cycle/review/SKILL.md`, the author's return report and the frozen task were all read whole.

## Searches not found or unclear

- The method says to review the return step's range in its own variant, but it names no separate file for it. Section 1 sends such a review to section 2, which I followed.
- The fix commit `9a7720aa` says „a tap above or below it opens nothing by mistake”. That message is unclear. The CSS comment it adds settles it: the danger was folding the group by mistake.
