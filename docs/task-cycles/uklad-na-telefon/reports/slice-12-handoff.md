# Handoff - slice 12 of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The slice's base is the commit `9b12062d3495393c9bc8326e692650855fdc03a5` (the head of the branch at dispatch); the cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. `node_modules` is installed in the worktree.
- Your stage: an executor, method `make-change` - read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names beside it (e.g. `.the-way/task-cycle/change/ui_check.md`) only when the step or variant that names the file comes. Variant: "a slice, or the retry of a slice". Your class of model: cheaper (Haiku).
- Your boundary: make this one slice, commit it on the branch `task/uklad-na-telefon` explicitly by path (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`), in the English commit style of the repository's log. Do not push. Do not start another slice. Do not run the product's full gate (`npm test` with no argument); run only the checks of the slice's *Checks*, each with its command and exit code in the report.
- Your directory for working copies: `.runs/slice-12/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/slice-12-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it must hold the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them. This handoff names: the frozen task `.runs/task-cycles/uklad-na-telefon/task.md`, the plan `.runs/task-cycles/uklad-na-telefon/plan.md` (only the passages copied below, and what the slice's *Read* names of it), and your report path.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## The foundation entries of the plan (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`)

## Foundation entries

| # | Entry | Kind | From | What depends on it |
|---|---|---|---|---|
| 1 | D-396 — In which browsers and from which window size does the game have to work? | decision, changed: the projected entry whole, with the two sentences of rows 5 and 6 added | projected entry D-396 of the approved definition of project 2 (section "Projected foundation changes"), rows 5 and 6 | Slices 6–20 |
| 2 | the fact of the source of the touch-target minimum, its passage quoted with the date it was read, named in *Based on* of D-396 | environment fact, new | the cycle's: row 6 asks for a value from a source with its quotation | Slice 7 (the token's `Source:`), Slices 8, 16–19 |
| 3 | D-280 — the content width, now speaking of the computer and the phone layout | decision, changed | task, *Decisions in play* (the new D-396 no longer names it) | Slices 9, 16 |
| 4 | D-282 — the areas a narrower layout rearranges, now the phone layout | decision, changed | task, *Decisions in play* | Slices 9, 17, 18, 19 |
| 5 | D-311 — the screen of a map run, two columns in the computer layout and one in the phone layout, and the tap of row 3 beside the hover in its rationale | decision, changed | task, *Decisions in play* | Slices 9, 19 |
| 6 | D-370 — the end-of-run window, its width in the two layouts | decision, changed | task, *Decisions in play* | Slice 19 |
| 7 | D-389 — the picture band of Siedziba, its crop in the phone layout | decision, changed | task, *Decisions in play* | Slice 17 |
| 8 | D-44 — the destructive button in `danger` at rest, with `highlight` under the pointer | decision, changed | row 4 | Slices 10, 16 |
| 9 | D-349 — the scene's two sizes | decision, changed | row 1 | Slices 5, 15 |
| 10 | D-372 — the frost's thickness on the screen at either size of the scene | decision, changed | the cycle's: its "(32 px on the screen)" follows from the one size row 1 removes | Slice 15 |
| 11 | D-288 — arrows in the header of a rule group in every layout, the handle for the mouse | decision, changed | row 2 | Slices 3, 4, 12, 13 |
| 12 | D-19 — a tap on a tile marks its row, a tap elsewhere takes the mark off, the hover stays | decision, changed | row 3 | Slices 3, 4, 5, 14 |

The rows of *Settlements to record*: row 1 → entry 9; row 2 → entry 11; row 3 → entry 12; row 4 → entry 8; rows 5 and 6 → entry 1, row 6 also entry 2. No invariant, glossary term or part of the map is written.

## The slice (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`)

### Slice 12 — the program editor moves a rule group up and down

- **Goal:** `src/browser/view/program-editor.ts` gives a rule group's „↑” and „↓” as it gives a rule's (`moveRule`, `ruleArrows`): a function that moves the group at an index of the program one place up or down, returning the program changed, or none where it cannot move, and one that says whether each arrow of a group acts, off on the first group for „↑” and on the last for „↓” (new D-288; plan, *Choices*). Its cases stand in a new file, `tests/view/group-arrows.test.mjs`, written first and failing, each citing the new D-288. No view changes yet. The file `program-editor.ts` stays under the threshold of a file of D-425.
- **Change:** `src/browser/view/program-editor.ts` · `tests/view/group-arrows.test.mjs`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  · `foundations/decisions.md:9336-9411` D-288 (rewritten by Slice 2) · `foundations/decisions.md:9526-9558` D-297 · `foundations/decisions.md:9412-9428` D-292 · `foundations/decisions.md:841-859` D-425
  · `foundations/glossary.md:53-64` program rule, rule group · `foundations/invariants.md:1428-1437` function-and-file-size
  · `tests/view/program-editor.test.mjs:1-80` its head, the form of its cases
  · `.runs/task-cycles/uklad-na-telefon/task.md:35-35` To do, item 6 · `.runs/task-cycles/uklad-na-telefon/task.md:56-58` Question 2
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/group-arrows.test.mjs`, failing before the functions exist · `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 11 · entry 11

## The plan's choices (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`, section *Choices*)

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The phone layout is written as overrides in blocks `@media (width < 1280px)` (range syntax, the number of D-396 written as it stands), in each screen's stylesheet, each block with a comment naming D-396; the computer layout's rules stay as they are, the threshold rules that stood at 720 and 1074 px move to 1280 px | rules rewritten phone-first with the computer layout in `min-width` blocks; a class on the page set from `matchMedia` | phone-first rewrites every rule and risks the computer layout the acceptance holds; a class needs script for layout. Wrong: the overrides grow harder to read later, a rewrite by a later task |
| The threshold is written in each `@media` rule, its source kept by the comment D-396 beside it and by the styleguide's rule (Slice 8); the page area of 360 px is written nowhere in a stylesheet, only in loop2-play and the styleguide | one place for the threshold | CSS reads no custom property in a media query, and D-43 exempts the threshold; wrong: a future change of the threshold edits several files |
| The scene has the two sizes 1× and 2× only, as D-349's new wording and *Decisions in play* give, though 3× fits in a phone layout over about 1050 px | the largest multiple without a cap | the task's sizes are two; wrong: a phone layout at 1100 px shows a smaller scene than it could, which the human may ask for |
| The scene's second size comes from a rule of the stylesheet in the phone layout's blocks (a width threshold of the window at which 672 px fit, counted from the phone paddings, written with its arithmetic in a comment), the background's `width` and `height` attributes staying 672 × 304 | a container query; a size measured by script | D-43 exempts a threshold of `@media` and names none of `@container`; script adds a listener of the window's size; wrong: a threshold that misses the fit by the scrollbar's width, seen in the browser checks |
| The crop: the frame keeps its picture's size and a place around it in `world-area.tsx` clips it, centred, with the phone paddings small enough (Slice 9) to crop at most 32 px at 360 px | a crop of the right side only; the frame itself narrowed | a narrowed frame moves every part placed by percentages; a right crop hides the mage at the right edge |
| The small elements of the scene keep their sizes in CSS pixels, which do not follow the scale today | sprites redrawn for 1× | a sprite change touches the trust boundary `assets/sprites/**`; wrong: a badge large against a mage at 1×, judged by the human on the screenshot |
| Every decision rewrite keeps each opening of a binding sentence that a test quotes; where a row makes such a sentence false (D-288, D-19, D-349), Slice 2 rewrites it and Slices 3–5 bring the citations to it at once | the citations shortened first to an opening valid before and after; the citations updated in the slices of the code | the code slices with the big test files would be too large for one agent; shortened citations hold less of what a test holds. Wrong: the check of the foundation stands red from Slice 2 to Slice 5 |
| A tap marks only with a pointer of the kind touch; a click of a mouse changes nothing, as D-19's test holds today; a tap on a row of the table is no new act | any click marks the row; a tap on a row marks its tile | row 3 speaks of the tap and keeps the hover; wrong: a pen or a mouse click does not mark, a small later change |
| The handle of a rule and of a group stays in both layouts | the handle hidden in the phone layout | a narrow window of a computer keeps its mouse; wrong: a few pixels of a header at 360 px |
| A group's „↑” is off on the first group and „↓” on the last, a move one place, as a rule's arrows inside a group | arrows that move a group across the program's edge in some other way | row 2 says „tak jak reguły”; wrong: a small change of two functions |
| The touch-target minimum holds for every control of D-47 in the phone layout; a link inside a sentence only where the cited source does not exempt an inline target | every link held to it, inside a sentence too | a link inside a sentence held to it breaks the line of text; wrong: one link a little small to tap |
| The fix of the pick cells is the reverted commit `8591aa82` taken over, the helpers of the editor tests made independent of the markup first (Slice 4) | a new fix | the commit was reviewed once in PR #168; wrong: none known |
| The skill loop2-play gains the phone check early (Slice 6), so that every later slice checks the phone layout one way; the styleguide's rules come before the screens (Slice 8), so that the screens follow them | both at the end, in the order of items 10 and 11 | the screens would be checked each its own way and the rules written after the fact; this departs from the styleguide's example of the order of work only in putting the rules before the screens |
| The screenshots that slices take are working copies, looked at and removed; only Slice 20 shows a set, with no screenshot of loop beside it | screenshots of loop beside each, as D-418's rationale gives for a changed screen | loop's phone look is no reference the task names; wrong: the human asks for loop's screens |
| No move of code before a slice adds to a function or a file: none stands over the thresholds of D-425 at the base; the slices that add to `RuleListView` (179 of 200 lines), `ProgramPanelView` (194) or `Scene` (184) keep them under | a move slice first | wrong: a slice that crosses a threshold moves a part out within itself, the size test showing it |

## Notes of the orchestrator for this slice

1. Slices 1-11 are committed (the head of the branch at dispatch is your base). The new D-288 (slice 2) gives the rule groups „↑” and „↓” in their header as the rules have; read it whole (find it by its heading; the ranges the orchestrator lists at the end of this note hold over the plan's).
2. Read every file your slice's *Read* names, whole, before you write code: the guidelines (`guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`) are the rules your code and your test are judged by, and the report's **Unread material** is read by the orchestrator, who sends a slice back where a file of its *Read* stayed unread without a reason that bears on the work. A test file begins with the form of its cases (`tests/view/program-editor.test.mjs:1-80`): follow it, including its `// decision: D-NNN "…"` citation lines, each quoting the opening of a binding sentence of the entry (a prefix of one binding sentence as it stands in the log); `python -B .the-way/elements/common/foundation_check.py` checks the citations: run it for your new test file.
3. The test of the slice is written first and fails before the functions exist; say in your report what it printed when it failed (command and exit code).
   - D-288 foundations/decisions.md:9341-9423
   - D-297 foundations/decisions.md:9538-9570
   - D-292 foundations/decisions.md:9424-9440
   - D-425 foundations/decisions.md:841-859
