# Handoff - slice 16 of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The slice's base is the commit `5acdcdbb6f7c708249008da602e06507002fa8f7` (the head of the branch at dispatch); the cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. `node_modules` is installed in the worktree.
- Your stage: an executor, method `make-change` - read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names beside it (e.g. `.the-way/task-cycle/change/ui_check.md`) only when the step or variant that names the file comes. Variant: "a slice, or the retry of a slice". Your class of model: same (Sonnet).
- Your boundary: make this one slice, commit it on the branch `task/uklad-na-telefon` explicitly by path (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`), in the English commit style of the repository's log. Do not push. Do not start another slice. Do not run the product's full gate (`npm test` with no argument); run only the checks of the slice's *Checks*, each with its command and exit code in the report.
- Your directory for working copies: `.runs/slice-16/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/slice-16-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it must hold the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
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

### Slice 16 — the screens outside the game, the menu bar and the list of accounts at 360 px

- **Goal:** In the phone layout at a page area 360 px wide, in a window taller than wide, the login card with its four forms („Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, „Ustaw nowe hasło”) and its credits, the waiting screens, the menu bar with the open menu „Konto” and the owner panel's list of accounts with its rows, buttons and the confirmation of „Zablokuj” fit the width of the window: nothing scrolls to the side, in a frame either, no text crosses its frame, and every control of these screens has at least the touch-target minimum (entry 2). The phone rules stand in the phone layout's `@media` blocks of each screen's stylesheet; the computer layout's rules stay. The list of accounts gets markup of its own in `src/browser/view/accounts-screen.tsx` only where its stylesheet alone cannot fit a row.
- **Change:** `src/browser/account-card.css` · `src/browser/waiting-screen.css` · `src/browser/credits.css` · `src/browser/styles.css` · `src/browser/accounts-screen.css` · `src/browser/view/accounts-screen.tsx`
- **Read:** `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:5081-5097` D-44 (rewritten by Slice 1) · entry 2 (the new environment fact) · `foundations/decisions.md:3248-3298` D-262 · `foundations/decisions.md:3179-3202` D-259 · `foundations/decisions.md:3299-3323` D-278 · `foundations/decisions.md:4675-4716` D-285 · `foundations/decisions.md:4804-4816` D-411 · `foundations/decisions.md:5382-5414` D-275 · `foundations/decisions.md:5415-5460` D-276
  · `foundations/glossary.md:259-265` secondary action · `foundations/glossary.md:290-295` owner
  · `.runs/task-cycles/uklad-na-telefon/task.md:28-45` To do, Acceptance criteria
- **Model:** same — designs the phone arrangement of five screens within the styleguide and judges it from screenshots at two widths.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/view/accounts-screen.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · in the running game (loop2-play, phone layout with touch) at 360 px each of these screens and states, with an account of the owner role for the list (`npm run local` makes it as loop2-play gives, or the slice reports how it got one): no side scroll (`scrollWidth` of the page and of each frame not above its `clientWidth`), no text over a frame, no control under the minimum by the measurement of Slice 7; at 1280 × 720 each as before (screenshots before and after).
- **Depends on:** Slice 15 · entries 1, 2, 3, 8

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

1. Slices 1-15 are committed (the head of the branch at dispatch is your base). Read the styleguide whole as the slice's *Read* names it: it now holds the rules of the two layouts (slice 8) — the phone rules go in blocks `@media (width < 1280px)` with no media type (the jsdom of the tests applies a media block only when its list holds the word `screen`; the check of a phone rule is in a browser, not a test), every control at least `--touch-target-min` (48 px, `tokens.css`, slice 7), a link inside a running sentence outside the floor and a link that is a control by itself (a whole navigation row, a menu item, a standing-alone link) held to it, nothing scrolling to the side, in a frame either.
2. What earlier slices settled that your screens stand on: slice 7 gave the shared controls the floor in the phone layout (one block in `src/browser/styles.css`, the menu-bar items and the link „Panel właściciela” included); slice 9 made one threshold of 1280 px, the page padding 8 px and the padding of `.screen-area` 12 px in the phone layout, the menu bar wraps (at 360 px „Konto” stands on its own row at the right), and it added a nine-line phone block to `src/browser/account-card.css` (the login card undoes the body padding with `-var(--space-l)`; with the page padding at 8 px it overshot by 8 px a side): that block is yours to judge, keep or change; the owner of `account-card.css` is this slice.
3. What measured under the floor at 360 px after slice 7 and lies in your screens' stylesheets: the summary and links of the credits (`credits.css`). The slice 7 measurement of the shared controls on the screens on the way into a map run is green; yours is for the screens of this slice.
4. The owner panel's list of accounts needs an account with the owner role in a local start; the skill does not say how to make one, and slice 7 found no way to reach `#/konta` locally. The operator's command `account-role` (the skill `.claude/skills/loop2-deploy/SKILL.md` and `src/server/` give it; read the part you need) gives the role; find a way to use it against the database of the local start (`npm run local` makes its own database; the account of the local start is created through the login card) and report how you did it. If you cannot get the role in the local start, do not edit the database by hand outside the commands the product gives: report the way you tried and mark the owner panel as unchecked in the browser, with a check of its markup and stylesheet by reading them.
5. Read every file your slice's *Read* names, whole, before you write code. The "before" screenshots at 1280 × 720 first, from this base; a screen of yours that you cannot reach by clicking (the confirmation of „Zablokuj”, the waiting screens, the forms "Nie pamiętam hasła" and "Ustaw nowe hasło") is reached as the skill and the tests of those screens give (`tests/view/account-screen.test.mjs`, `owner-panel.test.mjs`, `password-reset.test.mjs`, `email-confirmation.test.mjs` show how the page is brought to that state); working copies in `.runs/slice-16/`, removed before you return.
6. At 1280 × 720 each screen must look as before: compare screenshots before and after for each.
   - D-396 foundations/decisions.md:5508-5526
   - D-280 foundations/decisions.md:4525-4597
   - D-44 foundations/decisions.md:5082-5098
