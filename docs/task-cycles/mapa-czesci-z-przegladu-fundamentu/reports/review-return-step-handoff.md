# Handoff — review of the return step

You are a reviewer of a task cycle of the-way. You did not make the change and you are not the reviewer of the earlier rounds. The person who requested the cycle has delegated intermediate choices to the orchestrator; no go-ahead of the orchestrator is the human's approval. You are read-only: you change no tracked file of the worktree and commit nothing. You ask the human nothing.

## Where you work

- Worktree, your working directory and the root every command runs from: `the task's worktree` (branch `task/mapa-czesci-z-przegladu-fundamentu`). Never `cd` to the main checkout.
- Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the review of **the return step's commits**, as its section 2 gives: against the task and the entries the return step writes or corrects. Read that `SKILL.md` whole; other files it names only when the step that names them comes.
- Your directory for working copies: `.runs/review-return-step/`. Model of this review: `opus`.
- Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-return-step-report.md`, first line `PASS <sha>`, `FAIL <sha>` or `questions`.

## What you review

- Range: base `d5932fc5b68c99fdc9a6b45cc23a812b04720d51`, head `404f7d00`, one commit by the one author resumed for the return step. Two files: `foundations/decisions.md` (the *Verification* lines of D-156, D-224 and D-281 gain the invariant `page-address-fragment`) and `guidelines/testing.md` (the row of `.github/workflows/deploy.yml` of the table of trust boundaries reworded to say what the two cases read). Read the full diff.
- The return step's rules: `.the-way/task-cycle/skill/return_step.md`, which you read whole; its report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/return-step-report.md`. Judge each of its conclusions — what it wrote, and what it wrote nothing for (no environment fact, no glossary term, no change to D-09, no entry deferred) — against the rule.
- The frozen task: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/task.md`; the invariants `page-address-fragment` and `deploy-workflow-input` in `foundations/invariants.md` (read whole); the part map `foundations/part_map.md` (whole); `guidelines/testing.md` (whole, because the row you review lies in it and the rule of its `### Trust boundaries` binds it); the decisions D-156, D-224, D-281 and D-09 (each whole, with their *Rejected*); the files `tests/deploy/test_deploy_workflow.py` and `.github/workflows/deploy.yml`, to check the reworded row against what the test reads.
- Judge in particular: whether each of the three *Verification* lines is correctly written for the form of the decisions template (`invariants:` before `tests:`, the separator, whether the decision's own tests that the invariant now also marks stay listed), whether the foundation check stays green with it, and whether every sentence of the reworded row is true of the test as it stands at the head (N-1: an option bundled behind another short flag is not read; N-2: the first line of the file that holds `ssh` is taken as the call).
- The earlier review rounds' remaining Minor findings (M-4: the two new invariants each join more than one rule, as the task mandates; N-1 to N-3 of the review of the fix) are in the request's list and are **not** yours to reopen; grade only what this commit does.
- Trust boundary: **yes** (the row you review describes the test of a trust boundary): check that the row neither claims a refusal the test does not make nor drops one it does. Irreversible operation: no.
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

The report's first line, status, changed files with line counts, checks with command and exit code, reaches, your selection, **Unread material**, **Searches not found or unclear**, each finding graded and scoped by the method; a short return with the report path.
