# Handoff — review of correction 1 (task `ci-przy-pr`)

You review the range of a correction as an agent that made none of it, with `review-change` (`.the-way/task-cycle/review/SKILL.md`; read it whole, and the file it names for the review of a correction or of a fix, when the step comes). The human's remarks stand in the place of a findings file.

## Where

- Worktree (read-only for you): `the task's worktree`, branch `task/ci-przy-pr`. Range `4923dd0e..7da06c4f`: two commits by the one author (`5ae669e8`: the fix, `7da06c4f`: the return step's one change); files `foundations/decisions.md`, `foundations/environment_facts.md`, `.github/workflows/tests.yml`, `README.md`. Your directory for working copies: `.runs/review-correction-1/`.
- The remarks the correction binds: `reports/correction-1-remarks.md`, word for word (the day advisor, on behalf of the human). Read it whole; its item 2 is the work, items 1, 3 and 4 ask for no change. The correction's handoff to the author: `reports/correction-1-handoff.md`; the author's report: `reports/correction-1-report.md`. The earlier reviews of the same change, for context only (do not repeat them): `reports/review-whole-report.md`, `reports/review-fix-report.md` (finding n2), `reports/review-return-report.md` (findings r1-r3). The frozen task: `.runs/task-cycles/ci-przy-pr/task.md`.
- The whole change to date is `bdf0dbd7..7da06c4f`; the code and tests are those of `1c0e49eb` (CI ran green on it twice); this range changes no code and no test.
- No trust-boundary file of the part map is touched by this range except the workflow's comment lines; no irreversible operation.

## What to judge

1. **Each of the four remarks of item 2**, one by one: is it done as the human asked, within the task?
   - r3: D-412's binding sentence says what GitHub's documentation gives; **open the new environment fact `github-secret-scanning-public-repository`** (`foundations/environment_facts.md`) at its address and check that its quoted passage stands there word for word and says what the sentence needs; D-412's *Based on* and *Rationale* hold what the facts hold and no more; no other place that names the scan "Secret Protection" is left in tracked files.
   - r2: the workflow comment and the README say what the decision can source and not more. The human also asked that they say "that the runs of this request show the daemon answering"; the author did **not** write that and gave its reason (`reports/correction-1-report.md`, the choice under "Remark … (r2)"); judge whether leaving it out departs from a binding remark in a way the human must see, and how the request should word it.
   - r1: D-413's reason tells Linux from Windows: does it rest on the sources it names (D-14, D-263 — open them), claim nothing of GitHub that no fact holds, and read plainly.
   - n2: the reason for Linux stands in one place (D-413) and the comment and the README point to it.
2. **The tests that quote the changed sentences** (`tests/quality/test_ci_workflow.py` holds sentences of D-412 and D-413 by `decision:` lines): does each quotation still stand word for word in the decisions as changed (run the test and `foundation_check.py`)?
3. **The return step's change** (`7da06c4f`) against D-390 and `scripts/docker_gate.py`: does the sentence about a skipped container test say what the code does?
4. A new Critical or Important finding fails this review; Minor findings are listed and go to the request.

You run no full gate. Focused checks are yours.

## Report

`.runs/task-cycles/ci-przy-pr/reports/review-correction-1-report.md`, first line `PASS <sha>` or `FAIL <sha>`; findings graded as `review-change` gives with `file:line`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**; the working-copies line.

Working copies, word for word from the cycle's process:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
