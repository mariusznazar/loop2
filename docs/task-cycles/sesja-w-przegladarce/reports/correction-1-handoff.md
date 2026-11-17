# Handoff to the one author (resumed) — correction 1 for the human's remarks

Same worktree (`the worktree root`), branch `task/sesja-w-przegladarce` (head `38741f59`; the code is at `81502efc`, the two commits after it only add and remove the record's copy), pin and bounds as in `reports/author-handoff.md`. Your method for this stage is `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "a correction for the human's remarks". Your directory for working copies is again `.runs/author/` (remove it before you return). Report: `reports/correction-1-report.md`; it holds each remark as made and how you met it.

The human's remarks bind. They stand word for word in `reports/correction-1-remarks.md` (read it whole). What concerns your work is the first item; the others need no work from you:

> **Item 2 — fix in this request.** When a player enters the screen of a map run, with "Wejdź" on Mapy or with "Wróć do przejścia" in the bar, the page ends up scrolled 40 px down in a 1280 × 720 window and the menu bar goes out of sight. The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page.

Items 1 (Firefox), 5 and 7 are let through; items 3, 4 and 6 are one task outside this request (already written elsewhere). Do not touch them; do not enlarge the correction.

## What to do

- Item 2 of the description is your own defect 1 of `reports/author-report.md` ("Defects for the human", the scroll on entering a map run): the cause you found is `focusIfLost` in `src/browser/view/screen-registry.ts` (`shown?.focus()` without `preventScroll`). Make the fix the remark gives: moving the keyboard focus to the screen must not scroll the page. Find every place that moves focus to a screen when it is shown or when the control that was clicked leaves the page (`focusShown`, `focusIfLost` and their callers: `game-view.ts`, `programs-entry.ts`, `run-entry.ts`, the run screen's own code) and decide, by reading, which of them can scroll the page; fix those that do and say in the report which you left and why.
- Keep what the foundation and the styleguide say about focus: read the styleguide rule "Focus does not fall to the page" and its neighbours, the decisions on the screen of a map run and its end window (the page at its top when the end window opens: `src/browser/view/run-screen.tsx` sets `scrollTop`; that behaviour stays), and the invariants on focus of `browser-view`. The keyboard focus must still land on the shown screen (the player's keyboard goes on from the screen they see); only the scroll goes. If the fix contradicts an entry you find, or needs a new one, do not write it: say so in the report (the return step writes foundation entries).
- Tests: as `guidelines/testing.md` gives for a view change. A test on a hand-made document model proves only the logic it runs (D-88), so name in the report what yours proves and what only the real browser proves.
- Check in the real browser as you did in the session (Chrome 157 headless through Playwright CLI at 1280 × 720 over `npm run local`, `.claude/skills/loop2-play/SKILL.md`): both ways in — "Wejdź" on Mapy and "Wróć do przejścia" in the bar — before and after: `scrollY`, the top of the menu bar, `document.activeElement`; and that the end window still opens with the page at its top (a death or a solved map). Show one screenshot only if it adds evidence, pushed as D-419 gives to the directory of this cycle in `mariusznazar/screenshots` (the existing branch `loop2/sesja-w-przegladarce`, a new commit, never `main`); no personal data. Close the browser and stop the local game before you return.
- Own-work check and the report as `make-change` gives for a correction; run the focused checks of the files you change (with command and exit code); the full gate is the orchestrator's. Commit by paths, message in English, as before.

Return status, commits, a one-line check result and the report path; the report holds **Unread material** and **Searches not found or unclear**.

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
