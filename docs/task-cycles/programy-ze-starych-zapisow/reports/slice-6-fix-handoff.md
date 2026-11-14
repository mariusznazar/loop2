# Handoff — the fix of slice 6's review findings

You made slice 6 (commit `6a9283c4`); its reviewer returned `FAIL`. Fix the blocking findings, with `make-change`, variant "the fix of a review's findings" (`.the-way/task-cycle/change/SKILL.md`; read `.the-way/task-cycle/change/fix.md` when the variant names it). The findings are in `reports/slice-6-findings.md` (full path `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-findings.md`); read it whole, and the reviewer's report `reports/slice-6-reviewer-report.md` for its evidence (the surviving Stryker mutants and the prettier invocation).

- Worktree: `the task's worktree`, branch `task/programy-ze-starych-zapisow`; the fix's range runs from the reviewed head `6a9283c43ec304ed6db495a0b56f4e24829fdc1e`.
- Scope: findings I1, I2 and I3 only. Do not fix the reviewer's Minor findings (they go to the review of the whole change). Change only files of the slice's *Change* list.
- Checks: the focused tests of the changed test files, `npm run typecheck`, and for I1 the prettier invariant's own check: `npx prettier --check` with the flags and patterns of `tests/quality/test_quality_invariants.py` on the three files (or `npm test -- tests/quality/test_quality_invariants.py` if that is quicker); for I2 and I3 the mutants the reviewer names must fail the new or changed test (run each in place, restore byte for byte, and report each command and exit code). Not the product's gate.
- Commit with explicit `git add <paths>`; message in English in the repository's style.
- Report: write it to `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-fix-report.md`; return status, commits, check line, report path, questions, reach, **Unread material**, **Searches not found or unclear**, and the own-work check.
