# Report — slice 6 of koniec-przejscia (the styleguide rule about the end-of-run window)

**Status:** done with concerns (concerns: one open matter for the human about the bar of time, below; the Roles table and D-40 do not name the bar's fill; the Prettier check failed on the base because of the Roles table alignment and I reformatted that table).

## Files and commits

Commit `01e6c260` — docs: :memo: add the rule of the end-of-run window to the styleguide of the browser view

| File | Added | Removed |
|---|---|---|
| `guidelines/styleguide-browser-view.md` | 136 | 28 |

Of that, 108 added lines are the new rule `### The end-of-run window`, placed after the last rule (`The chronicle of a map run`) and before `## Examples`. The remaining 28 removed and 28 re-added lines are the Roles table (lines 14-41) realigned by Prettier (whitespace only; `git diff -w` shows one removed line, the table's separator row, and 96 added lines, all of the rule). No other file is touched. The Roles table content, the other rules, `## Where in code` and the foundation are unchanged.

## What the rule says (summary of its parts)

Heading `### The end-of-run window`; fields *Decision*: D-362 · D-311 · D-173 · D-132 · D-122 · D-313 · D-185 · D-216 · D-188 · D-208 · D-323 · D-44 · D-45 · D-275 · D-276 · D-285 · D-39 · D-40 · D-43 · D-46 · D-47 · D-279; *Invariant*: none; *Good* and *Bad* one line each. Body, in five groups:

1. How it covers the screen: screen and header `hidden` (kept in the tree) while it stands; menu bar and the row under it above it and working (D-208, D-323); no backdrop; `panel` with `text` and a frame in `divider`; `max-height` in `vh` as a layout dimension D-43 leaves out (value stays in the stylesheet rule, not copied); only the middle part scrolls, top row and buttons stay.
2. How it closes and opens: „✕” and Escape read on the window's own root (never the document, D-285), focus then on the header's „Koniec przejścia”; the header button before „Restart”, opens it again, header hidden while it stands; „Restart”, „Zakończ”, „Otwarte: …”; with unsaved changes the last two close the window and the question „Zapisać, odrzucić, wrócić?” stands, window closed until „Koniec przejścia” after „Wróć” (D-173); „Dodaj regułę z tym” closes it and opens the panel of the rule (D-313; task question 1 (f)).
3. Roles, font, shared controls: title, label, sections, cost line, discovery band text, chronicle-style rows in Geist Mono, longest streak in the classes of the header's requirement bar, the bar of time (track `highlight`, pieces `text`, gap `--frame-width`, legend with percent in `text-label`, height `--space-s`), all buttons the shared `ReactButton`, destructive for „Restart” and „Zakończ”, no secondary action or tab, the shared button's font untouched, the cut-plan warning in `warning` beside „Restart”.
4. Focus: root is `section` with `role="dialog"` named by the title, `tabIndex` −1, takes focus once; the scrolling part has `tabIndex` 0; no trap, no `aria-modal`; focus drawn by the one `:focus-visible` rule (D-47), no `outline` of the window's own.
5. The kitchen-sink page and the open matter (below).

## Kitchen-sink judgment (asked in the handoff)

The window needs no sample on `src/browser/kitchen-sink/index.html`: it is no shared control (it is built of shared buttons, which the page already shows in their states), no state and no role; and a sample would have to compose a game state, which the rule "The kitchen-sink page" forbids (D-45: no drawing from game state). The rule says so in one sentence. I added no sample. Cost if wrong: a later reviewer who reads "every shared control, state and role" widely asks for a sample; the page is outside my *Change*.

## The one thing the bar of time lacks (as slice 3 reported it)

Written in the rule as open for the human: the pieces are told apart only by order, gap and length, because the token file holds no series of fills (a colour, a pattern or an opacity set); a new value enters only with a source settled with the human. I added no token. Two further open points are named in the same paragraph, which slice 3 reported but are not about colours: (a) D-40 names the fill in `text` only for the header's requirement bar, so whether it should also name the bar of time's fill is a decision for the human; (b) the bar's height is a step of the spacing scale (`--space-s`) because `--bar-width` is too thin, so a named thickness may be wanted.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (after the change; it also passed before the Prettier realignment). Note: the handoff says not to run the gate; the slice's *Checks* name this one, so I ran it alone.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (`s6-tv.log`).
- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0 (`s6-dc.log`).
- `node node_modules/prettier/bin/prettier.cjs --check guidelines/styleguide-browser-view.md` — first run after my text: exit 1; the same command on the base (`git stash`) also exit 1. Cause verified: `prettier` on the file differs from it only in lines 14-41, the Roles table (column alignment), not in my text. After `--write` on the file: exit 0. This is the "failing run" for this check; no test was written, since the slice is prose.
- `python -B .the-way/instruction-files/check_instructions.py .` (not in *Checks*, run to see the note on guidelines read as instruction files): for the styleguide it warns about `#/mapy` at lines 524 and 532 (the rule The screen Mapy, text I did not change) and a size note; no warning on the new rule.
- Not run: the full suite (the cycle's gate).

## Own-work check

- Requirement most likely missed: task item 12 and the handoff's list — that the rule states every part (covers, closes, opens again, roles of title, sections, bar of time, buttons, shared font and controls, focus rule, height rule, bar of time's lack) and that each statement is true of the code as slices 3 and 4 built it, not of the plan.
- Check: I compared each sentence of the new rule with `src/browser/view/end-window.tsx` (whole), the `end-window` rules of `src/browser/styles.css` (lines 1466-1677), and slices 3 and 4's reports (what the screen does with `hidden`, focus after „✕”, the question, scroll). Verified point by point: classes and roles of title, label, sections, cost line (`danger` variant), discovery, streak (`run-header-requirement` classes), time bar (track `highlight`, pieces `text`, gap `--frame-width`, height `--space-s`), buttons (`ReactButton`, destructive for „Restart” and „Zakończ”, `disabled` on „Dodaj regułę z tym”), `tabIndex` −1 and 0, Escape on root, no `aria-modal`, `role="dialog"` with `aria-labelledby`, and Tab order „✕”, scrolling part, controls in it, bottom buttons. Also ran the three mechanical checks above.
- What it showed: every statement matched. Two statements are not from the code but from the decisions and slice 4's report and I could not check them in the code in this slice: that the header is hidden together with the screen while the window stands (slice 4 report and D-311) and that after „Wróć” the window stays closed (D-173, slice 4 tests). Not verified in a real browser by me (not my slice; slice 4 did).

## Reaches beyond the dispatch

- D-40 (read whole), D-133, D-135, D-185, D-216, D-313, D-188 (read whole, selectively by identifier through `awk`): D-40 for the roles of the bar tracks and fills; D-133 and D-135 for the streak bar; D-185 and D-216 for the cost line's roles; D-313 for „Dodaj regułę z tym”; D-188 for the cut-plan warning. The handoff names none of them but the rule cites them; D-208, D-323 and D-45 I cite as the file already cites or the task text names them (D-208, D-323 from task Question 9; D-45 from the rule "The kitchen-sink page"): I did not open D-208, D-323 or D-45 themselves.
- `.the-way/product-guidelines/styleguide/template.md`, `product-guidelines/template.md`, `recognize.md`, `research.md`, `settle.md`, `hand_back.md` (read whole), and `.the-way/instruction-files/check_instructions.py` (run only), because the skill names them.
- `guidelines/coding.md` read whole (named). `src/browser/AGENTS.md`, `src/browser/tokens.css` read whole.
- Reports of slice 3 and 4 read whole (named by the binding answers).

## Unread material:

- Of the handoff's *Read* list all entries were read whole: D-39, D-43, D-44, D-47, D-173, D-275, D-276, D-285, D-311, D-362, D-122 at the current ranges; `foundations/part_map.md:3-28` browser-view; the four invariants at lines 459-497; the three passages of the task (as copied in the handoff, not from `task.md`).
- Not opened though cited in the rule: D-208, D-323, D-45, D-279 and D-46 (their content I took from the other rules of the file, which already cite them in the same meanings).
- `research.md` and `new_tools.md` steps: research was not run (see Choices).
- `src/browser/view/run-screen.tsx` and `src/browser/view/game-view.ts` I did not read; I relied on the slice 4 report (the handoff names them as to be read "where they stand the window over the screen").

## Searches not found or unclear:

- The skill `the-way-maintain-styleguide` is written for a refinement with the human (steps 1 to 5, settle, hand back to `refine-task`); a cycle's author writing the file reads its template section "Writing the file", which I followed. The skill's *Settle* step (what the human accepts) has no counterpart here, so each meaning below is a choice named.
- The handoff mentions "the rows (new), D-311, Row 1, Row 2"; the foundation holds them as D-362, D-311, D-173 and D-122, as the handoff says; I found no separate "Row 1/Row 2" and took them to be D-173 and D-122.
- No instruction found on whether the Roles table gets a row or an edit for the window; I made none (see Choices 3).

## Choices (way rejected, cost if wrong)

1. **One rule, `### The end-of-run window`, after the last rule**, in the form of the file's other rules (the `The screen Mapy` / `The chronicle` pattern: decisions, one-line Good and Bad, body in groups). Rejected: spreading the window over several existing rules (States of shared controls, Visible focus, Menu bar) — the file's rules are by subject, and the window is a new one; the other rules cite nothing the window changes, so none needed an edit. Cost if wrong: a reader of one of those rules does not see the window, and the rule's own cross-references must be followed.
2. **The window rule says the question closes the window and the window stays closed after „Wróć”, but not what the header's „Koniec przejścia” does while the question stands** (slice 4's choice 2: it closes the question and opens the window). The foundation does not say it, so the styleguide leaves it unsaid. Cost if wrong: the behaviour stands only in code and slice 4's report.
3. **No change to the Roles table.** D-40 names the fill of the requirement bar in `text` and the tracks in `highlight` for only the mage's badge and the header's bar; the bar of time stands on the same two roles in the same way, but D-40 does not say so. A table row cannot carry a meaning no decision gives, and a change to D-40 is not mine; so the rule states the use and names it open. Rejected: widening the `highlight` and `text` rows of the table to name the bar of time. Cost if wrong: the table and a decision drift if D-40 is later widened without the table (the usual rule of "a changed entry brings its rules along" then applies).
4. **The Prettier realignment of the Roles table.** The slice's check requires `prettier --check` to pass and the base failed it only on the table's column alignment. Rejected: leaving the table and reporting the check as failing. Cost if wrong: a 28-line whitespace diff in the table; `git diff -w` hides it; reverting it restores the base's failing state.
5. **The height figure is not copied.** The rule says `max-height` in `vh` and sends to the stylesheet (the rule of the template: a rule repeats no value from a config file); the task's carried question about the width and the highest height is answered in words (column width of the screen, a height that leaves room for the menu bar and the row under it) and by naming where the number stands. Rejected: writing `80vh` into the rule. Cost if wrong: the numeric answer to "how high" needs a look into `src/browser/styles.css`.
6. **No research agents.** The skill's step 2 asks for research for an extension where the human has no preference; this extension uses the existing technology and shared controls with no new tool, and I may not dispatch. Cost if wrong: none seen; research reports stand for technology choices, none made here.
7. **The rule says "pierwsze okno nad ekranem gry" as a fact and nothing about later windows**, as the handoff does not settle what a second window inherits. Cost if wrong: a later window is built without this rule's guidance and a new decision settles it then.

## Problems as observed

- `prettier --check` fails on the base for `guidelines/styleguide-browser-view.md` (verified with `git stash`), so the file was not Prettier-clean before this change; whether other files of `guidelines/` fail the same I did not check.
- `check_instructions.py` warns about `#/mapy` (lines 524 and 532 of the file, in a rule I did not touch) as a dead path; not mine.
- A question for the human, not blocking: whether to give the bar of time a series of fills or a named thickness (the open matter in the rule).
