# Handoff — review of the fix of the whole-change review's findings (the same reviewer, resumed)

## What you review

- Variant: the review of a fix; read `.the-way/task-cycle/review/fix.md` and follow it, with `.the-way/task-cycle/review/SKILL.md`. You review the fix range once.
- The findings the fix answers: `reports/whole-review-findings.md` (your own words, cut from your report: blocking I-1 and I-2, Minor within the task M-1, M-2, M-3). M-4 and O-1 are outside the task's scope, were not given to the author and are not part of this review.
- Range of the fix: base `b76678a7` (the head you reviewed) to head `f775999a`; commits `ec7004e1` and `f775999a`. Compute `git diff b76678a7..f775999a` and `git log b76678a7..f775999a` yourself; confirm `git rev-parse HEAD` is `f775999a`.
- The fix report, a set of claims to verify, not evidence: `reports/fix-report.md`. The orchestrator's choices of the ways the findings left open, which bound the author (`reports/fix-handoff.md`): I-1 way (a), qualify the sentences to the blocking and backup commands, without giving the commands of D-400 and D-410 `existingOnly`; I-2 way (a), a second exit-3 sentence for an existing file the server never set up; M-2 one sentence back, else removal of the two facts.
- Worktree: `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`. Your directory for working copies: `.runs/review-fix/` (a new one for this round). Your report: `.runs/task-cycles/cztery-usterki-recenzji/reports/review-fix-report.md`; its first line `PASS <sha>` or `FAIL <sha>`.
- Trust boundary: yes, as before (`src/server/**`, `scripts/local-start.mjs`); the fix touches `src/server/account-backup.ts`, `src/server/account-block.ts`, `src/server/database.ts` and their tests. Irreversible operation: no.
- Do not run the full gate (`npm test` with no file argument). Run focused checks only; each with command and exit code in the report.

## What bounds the review

Check each finding of the file is fixed, as the reviewer who made it would read it; check that the fix introduced no new Critical or Important finding (a new one counts as remaining; a Minor finding that remains or is new does not block, and is listed). Where the new sentences of D-112, D-153, D-431, both copies of the skill and the backup reference are concerned, read them against the code and against each other. Check that the two skill copies stay identical and that the nightly backup script still reads no code or sentence.

## Working copies (the first paragraph of "Working copies" of `.the-way/task-cycle/skill/SKILL.md`, word for word)

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

The report's first line, its path, the graded findings of this round in short (each marked as within or outside the task), your checks with command and exit code, **Unread material** and **Searches not found or unclear** (or `none`).
