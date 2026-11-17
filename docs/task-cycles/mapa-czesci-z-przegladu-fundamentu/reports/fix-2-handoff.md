# Handoff — the second fix (the one author, resumed): the blocking finding of the review of the return step

You are the one author, resumed for the one fix of the blocking finding of the review of the return step. Same worktree (`the task's worktree`, branch `task/mapa-czesci-z-przegladu-fundamentu`), same pinned the-way. Your method: `.the-way/task-cycle/change/SKILL.md`, variant **"the fix of a review's findings"**. Your directory for working copies: `.runs/author/`. Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-2-report.md`, in the form your method gives, with **Unread material**, **Searches not found or unclear**, each check with command and exit code, your working copies. No full gate (`npm test`), commit by path, English messages, nothing uncommitted left.

## The findings

`reports/fix-2-findings.md` (full path `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-2-findings.md`), cut word for word from `reports/review-return-step-report.md` (`FAIL 404f7d00`): the blocking finding I-1. The range of your fix runs from the reviewed head `404f7d001cb8f386979b8baeece95e441b048ad0`; the review of the fix reads that range once. The Minor findings of that review (m-1 to m-3) are **not** to be fixed: they go to the request's list.

## My answer where the finding leaves a choice (autonomous choice of the orchestrator, recorded)

The finding offers two repairs. Take **the second**: let the case read every form in which a step's script is written, so that the crafted step is refused and the row says what the case reads and no more.

- The case `test_sha_reaches_the_script_only_through_env` (`tests/deploy/test_deploy_workflow.py`, around lines 107-117) must find a `${{ … }}` expression in the script of any step, whether `run:` is written as the first key of the step (`- run: |`), as a later key (`run: |`), as a folded block (`run: >`, `|-`, `>-`), or on one line (`run: echo ${{ … }}`). The reviewer's variants are in `reports/review-return-step-evidence/` (`variant-deploy-step.yml`, `probe.py`, `probe-out.txt`): read them and use them as your mutations, under `.runs/author/`.
- Show each failing run and the passing runs, with command and exit code: the case fails on the variant of the deployment step with `- run: |` and `echo ${{ github.event.head_commit.message }}`, on a new step `- run: |` with `echo ${{ secrets.DEPLOY_HOST }}`, on `run: echo ${{ secrets.DEPLOY_HOST }}` on one line, and still fails on the `run: >` variant; it passes on the file as it stands (the honest `deploy.yml` writes `run: |` after `name:`) and on an honest variant with `- run: |` whose script holds no expression. Keep the case's other assertion (the commit's name stands only in an `env:` line) as it is.
- Write the widening so that it reads a block by the indent of the key `run:` itself, not of the `- ` before it (the finding gives the pattern `^\s*(?:-\s+)?run:` and the indent rule). Do not widen beyond it: other forms (a script reached through an anchor, a reusable workflow, `shell:` tricks) stay unread, and the row must say what the case reads, in words that are true of every form above.
- Then the row of `.github/workflows/deploy.yml` in the table of trust boundaries of `guidelines/testing.md` says exactly what the case now reads, in the language of its neighbours. Leave the `ssh` clause as it is (m-1 is Minor and goes to the list) unless a sentence of it is false of the test as it stands — then correct only that sentence.
- If you find that the widening makes the case fail on the honest `deploy.yml` or on a neighbouring test, say so in the report and return it as a question rather than weaken the case.

Checks: `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`; `python -B .the-way/elements/common/foundation_check.py` (no switch); `python -B .the-way/instruction-files/check_instructions.py`. Ruff is not installed: say so as a check not run.

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

Status, your commits (the range from `404f7d00`), one line naming each check that failed or did not run, the report path, questions, reaches, **Unread material**, **Searches not found or unclear**.
