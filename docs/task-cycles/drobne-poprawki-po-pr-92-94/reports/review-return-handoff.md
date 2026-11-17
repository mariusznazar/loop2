# Handoff to the reviewer — review of the commits of the return step, task `drobne-poprawki-po-pr-92-94`

You are a fresh reviewer (you made none of this change and did not review it before). Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), your review is: **the commits of the return step**, judged as section 2 of that skill gives, against the task and the foundation entries the return step writes or corrects. Read-only; no full gate (the orchestrator's). Worktree root the root of the task's worktree.

- Range: from `a203324ddefffcd393a1b4eb2f6a819c727a2622` to `c4a9aaf5` (one commit, one file: `foundations/decisions.md`, one line, the *Verification* of D-424). Earlier ranges (`d8e318c3..a203324d`) were reviewed `PASS` (whole change and its fix); do not review them again.
- The return step's report: `reports/return-step-report.md` (full path `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/return-step-report.md`). The frozen task: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/task.md`, item 8 and *Settlements to record* row 6 (D-424's source), *Questions to settle* 8 and 9.
- Read, for the judgment: D-424 whole (`foundations/decisions.md`, search `### D-424`), the template for decisions `.the-way/elements/decisions/template.md` (the *Verification* clause `tests:` and its rule), `tests/quality/quality_environment.py` and `tests/quality/test_quality_environment.py` (the case of a tool at the pinned version that does not run), and the commit diff. Judge: does the new clause say what a test holds, with no clause that no test holds, in the template's form; does it over-claim; does the report's claim that nothing else no longer matches (D-207, D-376, D-423, D-396, D-153, the two environment facts, the part map) hold at the head — check the ones you can by reading the entry against the code in one pass; report a mismatch you find with its anchor.
- Findings in your form (anchor `file:line`, full wording, expanded reason). Only Critical or Important fails; a Minor one goes to the request's list.
- Write your report to `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/review-return-report.md`; first line `PASS <sha>` or `FAIL <sha>`; sections **Unread material** and **Searches not found or unclear** (or `none`); your directory for working copies `.runs/review-return/`, removed before you return and stated in the report.

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
