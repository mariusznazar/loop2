# Handoff - slice 9 of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The slice's base is the commit `1903499505fda6478aff9581e9840c8e9a7c3d29` (the head of the branch at dispatch); the cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. `node_modules` is installed in the worktree.
- Your stage: an executor, method `make-change` - read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names beside it (e.g. `.the-way/task-cycle/change/ui_check.md`) only when the step or variant that names the file comes. Variant: "a slice, or the retry of a slice". Your class of model: same (Sonnet).
- Your boundary: make this one slice, commit it on the branch `task/uklad-na-telefon` explicitly by path (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`), in the English commit style of the repository's log. Do not push. Do not start another slice. Do not run the product's full gate (`npm test` with no argument); run only the checks of the slice's *Checks*, each with its command and exit code in the report.
- Your directory for working copies: `.runs/slice-9/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/slice-9-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it must hold the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
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

### Slice 9 — one threshold, and the page's shell in the phone layout

- **Goal:** A page area 1280 px wide or wider shows the computer layout and every narrower one the phone layout, with no third layout (item 1): the `@media` rules at 720 px of `src/browser/styles.css` (the columns of Programy, Mapy and Wiedza) and of `src/browser/character-screen.css`, and the one at 1074 px of `src/browser/run-screen.css` (the two columns of the screen of a map run), stand at the threshold of D-396 in the form the plan's *Choices* gives, each with a comment naming D-396, and the comment of `run-screen.css` that counts the 1074 px counts no more; below 1280 px each screen stands in one column of its areas in the order of its document (D-282, D-311). In the phone layout the page's shell leaves the screens their width: the page's side padding and the padding of an area (`.screen-area`) are smaller steps of the spacing scale, chosen so that at a page area 360 px wide the scene of Slice 15 loses at most 32 px of its 336 to its crop (the mage at the right edge ends on column 319 of 336, `src/browser/sim/data/scene.ts`), and the menu bar wraps its items within the width. Nothing outside the phone layout's blocks changes but the thresholds.
- **Change:** `src/browser/styles.css` · `src/browser/character-screen.css` · `src/browser/run-screen.css`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:8308-8330` D-166 (D-396, D-280, D-282 and D-311 rewritten by Slice 1) · `foundations/decisions.md:4851-4865` D-421 · `foundations/decisions.md:5066-5080` D-43
  · `src/browser/sim/data/scene.ts:36-63` PICTURE_PIXEL and SCENE
  · `foundations/invariants.md:478-497` browser-view-token-values, browser-view-focus-outline · `foundations/part_map.md:3-33` browser-view
  · `.runs/task-cycles/uklad-na-telefon/task.md:26-45` To do, Acceptance criteria · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context
- **Model:** same — compares five screens before and after at 1280 × 720 and judges the shell at 360 and 1100 px.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `git grep -n "@media" -- "src/browser/*.css"` shows no width threshold but 1280 px (the scene's threshold comes with Slice 15) · in the running game (loop2-play): at 1280 × 720, Siedziba, Postać, Mapy, Programy, Wiedza and the screen of a map run, screenshots before and after the change, show no difference; at a page area 1100 px wide the screen of a map run, Programy, Mapy and Wiedza stand in one column; at 360 px the page does not scroll to the side for the shell (`document.documentElement.scrollWidth` not above its `clientWidth`, read on Siedziba).
- **Depends on:** Slice 8 · entries 1, 3, 4, 5

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

1. Slices 1-8 are committed (the head of the branch at dispatch is your base). Current ranges in `foundations/decisions.md` (the plan's moved; find an entry again by its heading if one misses): see the list the orchestrator gives at the end of this note. D-396, D-280, D-282, D-311, D-370, D-389 and D-44 were rewritten by slice 1; the styleguide `guidelines/styleguide-browser-view.md` now holds the rules of the two layouts (slice 8: read them whole, with the rest of the file, and follow them — the rule on how a phone block is written is the one you apply), and `src/browser/styles.css` holds the first phone block `@media (width < 1280px)` (slice 7, line ~529, the touch-target floor of the shared controls) with `--touch-target-min` in `tokens.css`.
2. The jsdom of the tests applies a media block only when its list holds the word `screen`: write every block as `@media (width < 1280px)` with no media type. A phone rule is checked only in a browser (loop2-play, the phone-layout section made by slice 6), not by a test.
3. The thresholds that stand today and are yours to move: `@media (max-width: 720px)` at `src/browser/styles.css:254` (the columns of Programy, Mapy and Wiedza), `@media (max-width: 720px)` at `src/browser/character-screen.css:27` and `@media (min-width: 1074px)` at `src/browser/run-screen.css:59` (two columns of the screen of a map run: the layout is two columns from 1280 px and one column below, so this rule, written for min-width, changes its direction: the two-column rules apply at `@media (width >= 1280px)` or the one-column rules move to a block below 1280 px — choose the form that leaves every rule of the computer layout unchanged at 1280 px and wider and say which in the report). The comment of `run-screen.css` that counts the 1074 px counts no more.
4. The crop of the scene: at a page area 360 px wide the scene (336 px picture) has to lose at most 32 px of its width in all, 16 px on each side, because the mage at the right edge ends on column 319 of 336 (`src/browser/sim/data/scene.ts`); the paddings you choose in the phone layout (the page's side padding and `.screen-area`'s padding, each a step of the spacing scale of `tokens.css`) must leave the world area at least 304 px inside. Slice 15 does the scene itself. Measure the width the world area has at 360 px and put the number in your report.
5. Controls whose rules stand in the screens' own stylesheets and that measured under 48 px at 360 px after slice 7 (the links `team-member-name` and `maps-who-name`, the rows `maps-list-item`, `program-list-item`, `now-row`, `next-row`, the summary and links of the credits) belong to slices 16-19; leave them.
6. The checks "no difference at 1280 × 720" need a screenshot before your change and after it: take the "before" first, from this base, in the first minutes of your work.
   - D-396 foundations/decisions.md:5508-5526
   - D-280 foundations/decisions.md:4525-4597
   - D-282 foundations/decisions.md:4644-4675
   - D-311 foundations/decisions.md:10539-10673
   - D-370 foundations/decisions.md:11011-11038
   - D-389 foundations/decisions.md:10321-10394
   - D-166 foundations/decisions.md:8313-8335
   - D-421 foundations/decisions.md:4852-4866
   - D-43 foundations/decisions.md:5067-5081
   - D-44 foundations/decisions.md:5082-5098
