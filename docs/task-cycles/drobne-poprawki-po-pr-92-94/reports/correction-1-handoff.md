# Handoff to the one author — correction 1, task `drobne-poprawki-po-pr-92-94`

You are resumed as the one author for a correction after the human's remarks on the open request. Your method is `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: **a correction for the human's remarks**. Work from the root of the task's worktree, branch `task/drobne-poprawki-po-pr-92-94`; the head is `911bb057` (the content you made and had reviewed stands at `c4a9aaf5`; `e52c114d` and `911bb057` only add and remove the record's copy). `origin/main` is still the base `d8e318c3`, so nothing was merged. Your directory for working copies: `.runs/author-correction-1/`. Report path: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/correction-1-report.md`. No full gate (`npm test`); the orchestrator runs it, after the "ready for the gate" step the user's delegation asks for. Run the focused checks of what you change.

The remarks bind. They are in `reports/correction-1-remarks.md`, word for word. In the order of the request's items:

- **Item 3 — fix in this request.** (The remark's own words: the decisions about the pace of a hidden tab say that at 16× half a real minute lets "a whole map run of Las" pass unseen — what the corrected save decision now says (480 game minutes, the shortest run that solves Las, not the length of every run); and the example in the decision about reading the server's log (D-355) describes the way of reading the skill now uses, output limited with a `tail`, not a limit on matches.) The two findings are O1 and O2 of the review of the whole change, in your report folder: `reports/review-whole-report.md`, section "Out of scope (beyond the task)", O1 (D-129 *Rationale* around `foundations/decisions.md:5422-5424` and D-130 *Rationale* around `:5449-5453`; the places are those of the review's head, find them by the sentences) and O2 (D-355 *Verification*, the `complies` example, around `:2079`). Make the two corrections as those findings give them: the wording of D-129 and D-130 must not take 480 game minutes for the whole of a map run of Las (the review's suggestion: "lets 480 game minutes of a map run of Las, the whole of the shortest one that solves it, pass unseen"; keep the arithmetic "at 1× the 480 game minutes of Las take 8 real minutes and at 16× 30 real seconds", only without the suggestion that it is the whole run), and the `complies` example of D-355 must describe a `grep` whose output is bounded, keeping the newest lines (the review's suggestion: "with a `grep` of the file whose output is bounded, keeping the newest lines"), as the skill's commands now do. Search the whole decision log and the rest of the foundation once for another sentence of the same kind (480 game minutes or half a real minute at 16× named as the whole map run of Las) and say in the report what you found; correct only a sentence that says the same thing in the same way, and name each. Each change goes through the element's method for a decision's *Rationale* and *Verification* (`.the-way/task-cycle/skill/foundation_step.md` and the decisions `SKILL.md` at the path it gives); change only *Rationale* and *Verification* text, no binding sentence; where a test holds a changed sentence by a line `decision:`, follow the new words in the quotation (search `git grep -n 'decision: D-129'`, `D-130`, `D-355` in `tests`; the earlier findings of this cycle say none quotes the passages of D-396, D-153 and D-207 that were changed).
- **Item 1** — let through: change nothing in D-153 or in the environment fact `loop2-app-log-confirmation-mail-events`.
- **Items 2 and 4** — let through: change nothing (the reading of the server's log and the allowed list of the `loop2-deploy` skill; the unread guidelines).

Nothing else changes. Do not touch *Out of scope* of the task; the pair of items 1, 2 and 4 need no correction.

Report: a row for each change with its commit and the check run (command and exit code: `python -B .the-way/elements/common/foundation_check.py`, the focused tests of any test file you touched), the search result above, **Unread material**, **Searches not found or unclear**, the own-work check (name the requirement most likely missed: a sentence of the same kind left in the foundation), the working copies. Commit messages in English, in the repository's style (`git log -8`); `git add` by paths. No personal data (no address, no account identifier).

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
