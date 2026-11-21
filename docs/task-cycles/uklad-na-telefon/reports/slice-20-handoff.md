# Handoff - slice 20 of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The slice's base is the commit `5f5e008827df995c0707500ea9c177e3d7a4a8a4` (the head of the branch at dispatch); the cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. `node_modules` is installed in the worktree.
- Your stage: an executor, method `make-change` - read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names beside it (e.g. `.the-way/task-cycle/change/ui_check.md`) only when the step or variant that names the file comes. Variant: "a slice, or the retry of a slice". Your class of model: same (Sonnet).
- Your boundary: make this one slice, commit it on the branch `task/uklad-na-telefon` explicitly by path (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`), in the English commit style of the repository's log. Do not push. Do not start another slice. Do not run the product's full gate (`npm test` with no argument); run only the checks of the slice's *Checks*, each with its command and exit code in the report.
- Your directory for working copies: `.runs/slice-20/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/slice-20-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it must hold the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
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

### Slice 20 — the screenshots of every screen and the loop by touch

- **Goal:** In Chromium with touch at a page area 360 px wide, upright (loop2-play), the whole loop of the sign of success goes by taps alone — sign up and sign in, write and change a program in the editor, send a map run and an earning loop, read the report of the return and take the practice („Odbierz”), buy a branch on Postać — and each screen of item 2 is screenshot at 360 px: the login card with each of its four forms, a waiting screen, the menu bar with the open menu „Konto”, Siedziba with its band, Postać, Mapy with the list and a card, Programy with the list and the editor, Wiedza, the screen of a map run with the scene showing a plaque of a discovery and the badge over the mage's head, the end-of-run window, and the owner panel's list of accounts; and the screen of a map run with the pick of „Czynność” open at a page area 1100 px wide. Each screenshot is looked at for a side scroll and a text over a frame before it is shown; a fault found goes back to the orchestrator in the report, not fixed here. The screenshots go to `mariusznazar/screenshots` as D-418 and D-419 give, and the report holds the link of each, in the order of item 2, with what it shows, for the description of the request.
- **Change:** none
- **Read:** `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
  · `foundations/decisions.md:5507-5521` D-396 (rewritten by Slice 1) · `foundations/decisions.md:1602-1667` D-417 · `foundations/decisions.md:1668-1682` D-418 · `foundations/decisions.md:1683-1697` D-419 · `foundations/decisions.md:1698-1712` D-420
  · `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:65-67` Question 5
- **Model:** same — judges every screen of the game for faults of the phone layout and plays the whole loop by touch.
- **Risk:** none
- **Checks:** the loop by taps reaches each of its steps, the report naming each; every screenshot pushed, its link to a commit of `mariusznazar/screenshots` with `?raw=true`, in the report.
- **Depends on:** Slice 19

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

1. Slices 1-19 are committed (the head of the branch at dispatch is your base). Your slice makes no change to the product and writes no commit in this repository; its product is evidence: the screenshots, in the place D-418 and D-419 settle (read `foundations/decisions.md` D-418, D-419, D-420 and D-417 whole — the plan's ranges moved; find each by its heading), and your report.
2. Where the screenshots go (D-418, D-419): into the public repository `mariusznazar/screenshots`, in its directory `loop2/uklad-na-telefon/` (the name of this cycle's record directory), on a branch of that repository named `loop2/uklad-na-telefon` — never on `main`. You push them yourself with the `gh` account that is logged in on this computer (`gh auth status` shows `mariusznazar`); no account or token is written into any file of this repository or into your report. Embedding addresses: `https://github.com/mariusznazar/screenshots/blob/<commit>/loop2/uklad-na-telefon/<file>.png?raw=true` with `<commit>` the sha of the commit you pushed (not a branch name, not `raw.githubusercontent.com`). Clone the screenshots repository into `.runs/slice-20/screenshots/` (a working copy), make the branch from a fresh clone of its default branch, commit your files there by path, push the branch, take the commit's sha, and remove the clone before you return. This repository holds only public products' screenshots; take care that no screenshot shows an email address, a password or a name that is a person's own: make throwaway accounts with an address like `tester1@example.invalid` and a made-up password and a made-up name.
3. The screenshots, each looked at (by reading the PNG with your image reader) for a side scroll and for text over a frame before it is pushed; name the files in the order below, `NN-<what>-360.png` (and the one `…-1100.png`):
   a. the login card at 360 px — its four forms („Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, „Ustaw nowe hasło”) as four screenshots, with its credits;
   b. a waiting screen (as the skill and the tests of the screens give how the page is brought to one);
   c. the menu bar with the open menu „Konto”;
   d. Siedziba with its picture band;
   e. Postać;
   f. Mapy with the list of maps, and the card of a map (two screenshots);
   g. Programy with the list of programs, and the editor (two screenshots, the editor with several groups and a rule panel open on one rule);
   h. Wiedza;
   i. the screen of a map run with the scene showing a plaque of a discovery and the badge over the mage's head (compose the state as the skill's save recipe gives and earlier slices did; the scene at 360 px stands at 336 × 152);
   j. the end-of-run window after a death (and one after a solved map if you can reach it);
   k. the owner panel's list of accounts (slice 16 found how to give the local start's account the owner role: with the product's own command `account-role.js` against the local start's database; its measurement scripts are in `.runs/task-cycles/uklad-na-telefon/reports/slice-16-evidence/` — you may read them);
   l. at a page area **1100 px** wide (the phone layout), the screen of a map run with the open pick of „Czynność” and the names of its cells inside their frames.
4. The loop of the project's success signal goes by taps alone at 360 px, in Chromium with touch (the phone-layout section of `.claude/skills/loop2-play/SKILL.md`; `page.tap`, not a mouse click): sign up and sign in through the login card, write and change a program in the editor (add a group and a rule, open a rule's panel and pick an action, move a rule and a group by their arrows), send a map run and an earning loop („Puść w pętlę”), read the report of the return and take the practice („Odbierz”), and buy a branch of a skill tree on Postać („Kup”). Where a step cannot be reached in the composed state or by playing, say which and why; a step that fails by a fault of the game is a finding. Name in the report each step and whether it was reached by taps alone, with what you saw.
5. A fault you find (a side scroll, text over a frame, a control that cannot be tapped, a tap that does the wrong thing) goes back to the orchestrator in the report, not fixed here; write each with the screen, the state, the measurement or the screenshot name, and how to reproduce it.
6. Your report holds, in the order of the list in item 3, the embedding address of each screenshot with one line of what it shows, and the commit of the screenshots repository, the branch and the directory; the file of each screenshot is a working copy and is removed with the clone (the repository `mariusznazar/screenshots` is the place where they lie).
7. Put no image file in this repository, in the record's directory (`.runs/task-cycles/…`) or in your report; only in `.runs/slice-20/` as working copies, removed before you return.
