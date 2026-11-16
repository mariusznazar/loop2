# Handoff to the one author, resumed — the fix of a review's findings

You are the one author of task `security-notes`, resumed. The review of the whole change returned `PASS` with no blocking finding and five Minor findings within the task; the cycle fixes them before the full gate. The person who requested the cycle has delegated every intermediate choice to the orchestrator.

- Variant of `make-change`: "the fix of a review's findings" (`.the-way/task-cycle/change/SKILL.md`; you read it before, read the part of it that this variant names again).
- Findings file: `reports/review-whole-findings.md` (in `.runs/task-cycles/security-notes/`) — the reviewer's words; read it whole. The full review is `reports/review-whole-report.md`; read only the passage a finding points to if you need it.
- Worktree: the root you worked in; branch `task/security-notes`; head `705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0`. The fix range runs from that head.
- Working copies: `.runs/author/` (yours; remove it before you return and say so).
- Report: `.runs/task-cycles/security-notes/reports/author-fix-report.md`.

## What the orchestrator decides for each finding

- **M1 (unexplained names).** Fix as the reviewer suggests, within the source: introduce "the operator" once, on first use, in one clause that says who it is (the person who owns this repository and runs its agents); make stage B name the same person ("the account of the repository's owner, the operator's own", or the nearest wording that cannot be read as a second person); say of "the cycles of the process the repository pins" what a reader needs in a few words, with the link that already stands; say of "the operator's daily adviser" only that it is the operator's own tool outside this repository that starts some of the sessions, and write nothing else about it — the task says no more, and a fuller account is for the human to give, not for you to invent. Keep the sentence about which sessions get the deny rule exactly as wide as the task says (answer 3 and *Context*). Check that no other name in the file is of the same kind.
- **M2.** Use the reviewer's wording: "a rule Claude Code enforces, whatever the model decides" (or the nearest sentence that says the same).
- **M3.** Use the reviewer's sentence for the first line, keeping what the task requires of it: the file gathers the subject in one place and the files it points to are the source of truth.
- **M4.** Drop the clause "to see what a session does with a planted instruction": the task gives no aim of the trial, and a statement of the file must trace to the task or to a file it links to.
- **M5.** Use "the one-off command that updates the lock file" in `README.md`.

After the fixes, run the hard edges of the first handoff again on the files you changed: no token value, no decoy host name, no company name, no absolute path on a disk, no link in double square brackets, no name of a private note, nothing about who merges, no verbatim quote of a planted instruction; and the README still equals the base text but for the one added line and the fixed wording.

## Checks, commit and report

Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (a file of the foundation does not change in this fix, so only if you touch one) and `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` (one test file; the full gate is the orchestrator's and you never run it). Commit on the task branch with explicit `git add <path>…` and an English message in the style of the log. The report holds every check with its command and exit code, your own-work check, for each finding what you did (or why you did not), **Unread material** and **Searches not found or unclear** (each `none` where it is none), and the line on your working copies.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
