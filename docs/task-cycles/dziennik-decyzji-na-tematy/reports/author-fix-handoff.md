# Handoff — the fix of a review's findings (resumed one author)

## Delegation

As in `reports/author-handoff.md`: the orchestrator's answers are no approval of the human; ask nobody but the orchestrator.

## What to do

Method `.the-way/task-cycle/change/SKILL.md`, your variant in the words of its row: "the fix of a review's findings"; read `fix.md` beside it, as the row says.

- Findings file (the reviewer's Minor findings of the review of the whole change, within the task): `reports/review-whole-findings.md` of `.runs/task-cycles/dziennik-decyzji-na-tematy/`. The review's first line: `PASS 3b5af51b`; there is no blocking finding. The review report, if you need the evidence: `reports/review-whole-report.md`.
- Your fix range starts at the reviewed head `3b5af51b`; commit on the branch `task/dziennik-decyzji-na-tematy` by explicit paths, one commit, message in English in the repository's style.
- Working directory for working copies: `.runs/author/` (yours as before). Report: `.runs/task-cycles/dziennik-decyzji-na-tematy/reports/author-fix-report.md`, with the sections **Unread material** and **Searches not found or unclear**, the working-copies line, and your own-work check.

## The orchestrator's choices for the two findings (the reviewer gives two recommendations; these are the ones to make)

1. D-412: move it to section 2, "Code rules, exemplars and static checks", at the end of that section (it is the last entry of the log, so the order of the log is kept). Its section's count drops to 16 in section 4 and rises to 21 in section 2; the sentences of the sections stay as the task has them. In your report list the doubtful assignments again, with D-412 now in 2 (alternative: 4).
2. Four blank lines: restore the second blank line after D-10, D-13, D-15 and D-227, so that each of the four entries is followed by the same two blank lines as in the log of the base `bea0abc1`. Check by script that every entry of the new file, with the blank lines that follow it up to the next heading, differs from the base only where a section heading and its sentence now follow it or where the entry moved to another section; say which entries are followed by a section heading. The author's earlier claim of a single blank line is withdrawn in your report.

## Checks to run and report (command and exit code each)

`compare_log_entries.py` against the log of the base (`git show bea0abc1:foundations/decisions.md`), `decision_index.py --sections` (counts: 28 sections, sum 408), `foundation_check.py` in full, and the count of entries (408 each once). Do not run `npm test`.

## Working copies

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
