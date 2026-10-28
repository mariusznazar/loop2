# Handoff — fix of a review's findings, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`, head `7bc8746` (the reviewed head).
- Method: `.the-way/task-cycle/change/SKILL.md` (pinned the-way `3aee7d9`), read whole. Your
  variant: **the fix of a review's findings** — read `fix.md` beside it when that row sends you
  there.
- Findings file: `.runs/task-cycles/rozwiazanie-lasu/reports/21-findings-I1.md` (one Important
  finding, I-1). The findings concern slices 3 and 5, so a fresh agent fixes them.
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; spec `spec.md`; plan `plan.md` (same
  directory). The review report: `.runs/task-cycles/rozwiazanie-lasu/reports/20-whole-review.md`.
- Read also: the invariant `mutation-test-selection` in `foundations/invariants.md` (whole),
  `guidelines/testing.md` section "Mutation testing", `stryker.config.json`,
  `tests/quality/test_mutation_test_selection.py`.
- Commit on the branch by explicit paths, message in English in the repo's form; leave the worktree
  clean. Run the affected checks again (at least
  `npm test -- tests/quality/test_mutation_test_selection.py`), each with command and exit code. Do
  not run the full gate (`npm test` without a file).
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/22-fix-report.md`

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Report

Write your full report as the method gives it and return only your status, your commits, a one-line
check result naming what failed or did not run, and the report path.
