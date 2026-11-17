# Handoff — review of the second fix

You are the reviewer of the return step, resumed to review the range of the second fix once. Same worktree, same pinned the-way, method `.the-way/task-cycle/review/SKILL.md` (`review-change`), a fix's review. Read-only. Your directory for working copies: `.runs/review-fix-2/`. Model of this review: `opus`.

## What you review

- Range: base (the head you reviewed) `404f7d001cb8f386979b8baeece95e441b048ad0`, head `e117eccc`, one commit by the one author. Read the full diff.
- The finding the fix answers: your blocking finding I-1 of the review of the return step, in `reports/fix-2-findings.md` (full path `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-2-findings.md`), cut word for word from your report. Your Minor findings m-1 to m-3 are **not** fixed on purpose (a Minor finding of the return step goes to the request's list).
- The fix's report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-2-report.md`; its evidence in `reports/fix-2-evidence/`. Its claims are not yours: run your own variants of `deploy.yml` in a copy under your directory.
- The orchestrator's answer where your finding left a choice: take the second repair, widen the case so that it reads `run:` as a first key of a step (`- run: |`), as a later key, and on one line, taking the script's indent from the column of `run:` itself; the row of `guidelines/testing.md` for `deploy.yml` then says exactly what the case reads. Judge whether the fix did it and whether the answer was sound; judge in particular that the widened case refuses every crafted form without failing on the honest `deploy.yml`, that it does not read the wrong lines as script (a comment, a later key of the step at the same indent as `run:`, the `env:` mapping that holds `github.sha`), and that every sentence of the reworded row is true of the case as it stands.
- Trust boundary: **yes**; check crafted input at it. Irreversible operation: no. A new Critical or Important finding in the fix counts as one that remains; a Minor finding of the fix does not block and goes to the request's list. Grade and scope each finding as the method gives.
- Do not run `npm test`. Focused checks: `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`.

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
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Your report to `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-fix-2-report.md`, its first line `PASS <sha>`, `FAIL <sha>` or `questions`; checks with command and exit code; reaches; **Unread material**; **Searches not found or unclear**; working copies.
