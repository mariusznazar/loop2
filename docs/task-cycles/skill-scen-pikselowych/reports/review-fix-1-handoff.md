# Handoff to the reviewer — the review of the fix of round 1

You are the reviewer of the whole change, resumed to review the fix of your findings, once. The person who requested this cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- Worktree `the root of the task's worktree`, branch `task/skill-scen-pikselowych`. Fix range: base `9459331b738617be566c11cfb40286d4de4cbd56` (the head you reviewed), head `af282831`; compute `git diff 9459331b..af282831` and `git log 9459331b..af282831` yourself and confirm `git rev-parse HEAD`. Two commits: `e9d0ec78` and `af282831`.
- Your directory for working copies: `.runs/review-whole/` (the one you had). Your report: `docs/task-cycles/skill-scen-pikselowych/reports/review-fix-1-report.md`; first line `PASS <sha>` or `FAIL <sha>`. Read-only toward the repository.

## Method and variant

Read `.the-way/task-cycle/review/SKILL.md` again as far as the review of a fix needs, and its `fix.md`, and follow them: the findings file the fix was given is `reports/review-whole-findings.md` (in `docs/task-cycles/skill-scen-pikselowych/reports/`); the author's fix report is `reports/fix-1-report.md` (a set of claims to verify). Judge whether each of I1–I3 and M1–M9 is fixed as your report describes it, and whether the fix introduces a new Critical or Important finding. Only a new Critical or Important finding, or a blocking finding that is not fixed, makes the review `FAIL`; a Minor finding that remains or is new does not block, and goes to the list of Minor findings with your grade and `file:line`. The frozen task stays `reports/../task.md` (`docs/task-cycles/skill-scen-pikselowych/task.md`) for source fidelity.

## Checks

Focused only; no full `npm test` (the orchestrator's gate). Every check carries its command and exit code. For I1 especially, run `flashes.mjs` with and without `--scale` on frames of your own and judge the units yourself; for M2 and M3 run your own crafted files again.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

The status line, graded findings with `file:line`, the checks you ran with commands and exit codes, your reaches, **Unread material** and **Searches not found or unclear** (each `none` or the items), working copies.
