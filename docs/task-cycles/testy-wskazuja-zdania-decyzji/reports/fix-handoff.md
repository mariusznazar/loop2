# Handoff — the fix of the Minor findings of the review of the whole change (variant "the fix of a review's findings")

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You return to the orchestrator, never to the human.

## Where you work

- The worktree: `the task's worktree`, branch `task/testy-wskazuja-zdania-decyzji`, head `fd716ca20e4353422396e571d91ae6b354774aa7` (the reviewed head; your range starts there). Nobody else writes in it. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6`.
- Your stage: the variant "the fix of a review's findings" of `.the-way/task-cycle/change/SKILL.md`; read it whole and follow it. You fix; you start no other work, run no full gate, open no request.
- Your findings file: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/fix-findings.md` (read it whole: five Minor findings of the whole-change review, in the reviewer's words, and the orchestrator's ruling on how to fix M2). The reviewer's full report, for the evidence behind them: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/review-whole-report.md`.
- The task and the plan (for the method): `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`, `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md` section "Work of every slice". The change you fix is the work of 40 slices; the reports of the executors of the slices named in the findings are `reports/executor-8-report.md`, `reports/executor-10-report.md`, `reports/executor-10b-report.md`, `reports/executor-16-report.md`, `reports/executor-31-report.md`.
- Foundation entries are written through their skill: before you edit any *Verification* field read `.the-way/elements/decisions/skill/SKILL.md` whole. Read the template section "Verification" (`.the-way/elements/decisions/template.md`).
- Your directory for working copies: `.runs/fix-minor/`. Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/fix-report.md`.
- Commit by path (`git add <path> …`, never `-A`, `.` or `-a`), messages in English in the form of the branch's earlier commits (`test: :white_check_mark: …` for the one test line, `docs: :memo: …` for the log).

## Working copies (copied word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed.
The files that a product's own tools and tests make by themselves are no working copy of the agent
and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a
worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside
its report what the report needs, and states in the report where each copy stood and that it was
removed. Where a removal fails, the agent finishes all the same and names in the report the
remainder, with its full path and the reason it stayed.

## Your work

Fix M1, M2 (by the orchestrator's ruling in the findings file), M3 and M4; M5 asks for no fix. Change nothing else. Checks to run, each with command and exit code in your report: `python -B .the-way/elements/common/foundation_check.py` (must exit 0 with `0 errors` and list no decision as `held by nothing`); `npm test -- tests/view/screen-registry.test.mjs` and Prettier `--check` on that file (`node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/screen-registry.test.mjs`); `git diff -U0 fd716ca20e4353422396e571d91ae6b354774aa7`, read: the log changes only in the *Verification* of D-103, D-153 and D-386, the test file only by the one deleted line. If a finding is wrong on the evidence, answer with that evidence instead of the change; do not fit your change to a finding that does not survive your own check.

## Report

As your method gives it: status, commits, a one-line check result, your own-work check, **Unread material**, **Searches not found or unclear** (`none` is an answer).
