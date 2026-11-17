# Handoff to the reviewer (resumed) — the review of correction 1

Same worktree (`the worktree root`), method (`.the-way/task-cycle/review/SKILL.md`, `review-change`) and bounds as in `reports/review-whole-handoff.md`; your variant is "a later change to an open request" (a correction). Your directory for working copies is `.runs/review-correction-1/`. Report: `reports/review-correction-1-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

Range: `81502efc..1ce0195a` (one commit `1ce0195a`; two files: `src/browser/view/screen-registry.ts`, `src/browser/view/run-entry.ts`; the two commits between `81502efc` and it only add and remove the record's copy and leave no file in the tree). The remarks stand in place of a findings file: `reports/correction-1-remarks.md` (word for word, binding). What concerns the code is item 2: "The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page." Items 1, 5 and 7 are let through, items 3, 4 and 6 are one task outside this request; none of them is the correction's.

The author's report of the correction: `reports/correction-1-report.md` (read its *Choices*, *Checks in the real browser*, *Tests*, *Foundation (not written; for the return step)*). The earlier reports (`reports/author-report.md` defect 1; your own earlier reports) give the background: the page was scrolled 40 px down when a map run screen opened because `focusIfLost` focused the screen without `preventScroll`.

Check:
1. The fix meets the remark: focus still lands on the shown screen, the page does not scroll for it, and the menu bar is in sight on both ways into the run screen. The author's measurements are a claim; reproduce what you can (the real browser as `.claude/skills/loop2-play/SKILL.md` gives: Chrome 1280 × 720 over `npm run local`; close the browser and stop the game; install nothing).
2. The second part the author added: `run-entry.ts` sets `document.documentElement.scrollTop = 0` when the run screen is entered (`here` flag in `placed`/`left`). Is it required to meet the remark (the author: with part 1 alone, "Wejdź" on a Mapy page scrolled down left the run screen scrolled at 418 px)? Does it fit the foundation (the decisions on the run screen, its end window — the page at its top when the end window opens — and on scrolling, the invariants of `browser-view`, the styleguide's rules on focus)? Can it fire where it should not (re-entering, resuming a paused run, the screen placed again while the player is on it, a player who scrolled within the run screen and then something calls `placed` again)? The `here` flag: is it cleared on every path that leaves the screen?
3. Callers: every caller of `focusShown` and `focusIfLost` (`game-view.ts`, `programs-entry.ts`, `run-entry.ts`, any other): did `preventScroll` change what any other screen shows or where keyboard focus ends visibly (a focused control that was scrolled into view before and now stands out of sight)? `preventScroll` support in the supported browsers (Chrome, Edge, Firefox bundled with the project's supported set, D-396).
4. Tests: the author added none and says why (jsdom lays nothing out and never scrolls). Is that right under `guidelines/testing.md` and the decisions D-87, D-88, D-75? Does an existing test pin the old `focus()` call, and does it still pass?
5. The foundation: the author wrote no entry and left to the return step that "the page stands at its top when the run screen is entered, and moving focus to a screen does not scroll the page" is not in the foundation. Do not judge the return step; say whether the change goes against any entry you read.

Grades and what blocks are as `review-change` gives. A Minor finding that remains after this review does not block and goes to the request's list.

## First paragraph of "Working copies" of the cycle, word for word

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
all the same and names in the report the remainder, with its full path and the reason it stayed.
