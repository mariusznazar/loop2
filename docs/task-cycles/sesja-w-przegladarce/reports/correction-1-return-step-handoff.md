# Handoff to the one author (resumed) — the return step of correction 1

Same worktree (`the worktree root`), branch and bounds as in `reports/author-handoff.md`. You take the return step again, on your class, for what correction 1 touched. Read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` whole (they are the same files as for the first return step, `reports/return-step-handoff.md` and your `reports/return-step-report.md`, which says what was compared then); the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element. Your directory for working copies is `.runs/author/` (remove it before you return). Report: `reports/correction-1-return-step-report.md`.

The corrected change: commit `1ce0195a` on `81502efc` (the earlier code of the request): `src/browser/view/screen-registry.ts` (`focusShown` and `focusIfLost` focus the screen with `preventScroll: true`) and `src/browser/view/run-entry.ts` (the page goes to its top at each entering of the screen of a map run; flag `here`). Reviewed: `reports/review-correction-1-report.md`, `PASS 1ce0195a`, no finding. The human's remark that the correction meets (`reports/correction-1-remarks.md`, item 2): "The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page." Your own report of the correction, `reports/correction-1-report.md`, section "Foundation (not written; for the return step)", says that this rule — the page stands at its top when the run screen is entered, and moving focus to a screen does not scroll the page — is not yet in the foundation. The reviewer's side effect to weigh: other screens no longer jump so their top meets the window's top after a focus move (the author's *Choices* name this cost).

What to do (the rules are in `return_step.md`; do not restate them from memory):

1. Compare with the code at the head the entries the correction touches or that the search of the foundation finds for focus, scrolling of the page and the screen of a map run (the styleguide's rule "Focus does not fall to the page" and its neighbours; the decisions on the screens and their focus; D-368, D-370, D-371 and the others you find; the invariants on focus of `browser-view`): which sentence no longer matches the code (for instance one that says the screen takes the focus and scrolls into view, or that the page is left where it is), and correct it in the same change.
2. Decide whether the human's remark sets a rule that binds after the merge and goes into the foundation (WAY-36): a decision in the log (through `.the-way/elements/decision/SKILL.md` or the path `foundation_step.md` gives for the decision element), or a sentence in the styleguide, or only a row of the questions table. The remark is the human's: it is the source of the rule; write the decision as the remark gives it, nothing wider (the reviewer's side effect on other screens is a consequence to name, not a rule the human set). Where you cannot place it without choosing something the remark does not give, say so in the report instead of choosing.
3. An invariant only for a rule the task, a decision or the human sets, never merely because no invariant covers the behaviour. Glossary, environment facts and part map: only where return_step.md gives a reason.
4. Run `python -B .the-way/elements/common/foundation_check.py` after any foundation change, with command and exit code. Commit what you write as `make-change` gives (English message, `git add` by paths). Do not run the full gate.

Return status, commits (or none), a one-line check result and the report path; the report holds the *Return step* form of `.the-way/task-cycle/record_template.md` (the entries you wrote or changed, each marked as `the cycle's` where the human did not see it in the task, and the rule's source), **Unread material** and **Searches not found or unclear**.

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
