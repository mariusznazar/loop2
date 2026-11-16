# Handoff — review of the return step's commits (task `hook-wersji-the-way`)

## Where you work

Worktree (your working directory): `the task's worktree (the repository root)`, branch `task/hook-wersji-the-way`. Read-only. Directory for working copies: `.runs/review-return/`. Report path: `.runs/task-cycles/hook-wersji-the-way/reports/review-return-report.md`; first line `PASS <sha>` or `FAIL <sha>`.

## Method and what is reviewed

Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Your variant: **the return step's commits**, reviewed as section 2 of the method gives, against the task and the foundation entries the return step writes or corrects (the method says how; this dispatch is not the review of the whole change, so you read what this handoff names).

- Range: base `9e28dc99` (the head of the fix, `PASS` in `reports/review-fix-report.md`) to head `e684b22a` — one commit by the one author, two files, 4 lines changed: the binding sentence and the *Verification* clause of D-414 in `foundations/decisions.md`, and the two `decision:` quotes in `tests/agent_workflow/test_the_way_pin_hook.py` that quote the sentence.
- The return step's report: `.runs/task-cycles/hook-wersji-the-way/reports/return-step-report.md` (it says the change corrects D-414's sentence "It prints nothing only where git is missing or the repository pins nothing", which left out the agreement case and the folder that is no repository).
- Frozen task, read whole: `.runs/task-cycles/hook-wersji-the-way/task.md` (body line `Status: ready for cycle` is authoritative). Settlement row 1 is written as D-414.
- Foundation entries by identifier, each whole: D-414 (the entry the commit changes), D-252 and D-362 (the task's *Decisions in play*), the environment facts `claude-code-session-start-hook-output` and `claude-code-hook-exec-form`. The hook script `.claude/hooks/the-way-pin-check.mjs` and the test file at `e684b22a`: read them to judge whether the new sentence says what the code does on every path (agreement; no git; not a repository; no gitlink; a checkout git cannot read; a git failure inside a repository; a failure of the script itself).
- Guidelines, each whole: `guidelines/coding.md` and `guidelines/testing.md`.

Check: that the new sentence matches the code and says nothing the row or the cycle does not give beyond what the earlier reviews already flagged (the second paragraph of D-414 and the two facts are the cycle's own and are flagged for the human at the merge, not to be re-judged here); that the two quotes in the test still equal the sentence word for word, so that `foundation_check.py` and the test agree; that nothing else changed. Run `python -B .the-way/elements/common/foundation_check.py` and `python -B scripts/test.py tests/agent_workflow/test_the_way_pin_hook.py`. Do not run the full gate.

## Report

Return the first line, findings with `file:line`, checks with command and exit code, **Unread material**, **Searches not found or unclear**, and your working copies (where each stood and that it was removed).

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
