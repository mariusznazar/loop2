# Handoff — the fix of a gate failure, task pierwsza-akcja-od-startu

You are the one author, resumed. Work only in the worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, head `d925d5ca17f6ea57be36e103379bda4d50ab4493`. Method as for your earlier fix: `.the-way/task-cycle/change/SKILL.md`, variant **the fix of a review's findings** (here the "finding" is a failure of the product's gate).

## The failure

The orchestrator ran the full gate (`npm test`, no argument) on the head. Node tests and the Python tests of `tests/invariants`, `tests/deploy` and `tests/agent_workflow` passed; `tests/quality` failed in one place that is the change's fault:

```
FAIL: test_every_simulation_test_except_source_rules_is_listed (test_mutation_test_selection.MutationTestSelection...)
  File "tests/quality/test_mutation_test_selection.py", line 20
AssertionError: Items in the second set but not the first:
'tests/sim/new-account-first-pass.test.mjs'
```

The new test file of item 8 is not listed in the mutation analysis's test selection (`stryker.config.json`, `tap.testFiles`, where `tests/sim/first-map-balance.test.mjs` already stands). The two other errors of that run (`test_ruff_source_rules`, `test_shellcheck_source_rules`: `FileNotFoundError`) came from the missing `.runs/quality-venv` of the new worktree, which the orchestrator has now installed as `README.md` gives; they are no fault of the change.

## What to do

Add `tests/sim/new-account-first-pass.test.mjs` to `tap.testFiles` of `stryker.config.json` in the way the test and the file's neighbours give (order and form as the file keeps them). Read `tests/quality/test_mutation_test_selection.py` and the testing guidelines' passage on the mutation test selection so that the list is as the test expects. No other change. Check: `npm test tests/quality/test_mutation_test_selection.py`, exit code; `python -B .the-way/elements/common/foundation_check.py` as your own check. No full gate (the orchestrator reruns it on the fixed head), no mutation analysis.

Commit by explicit path (`stryker.config.json`), English message in the repository's form, no push, nothing under `docs/task-cycles/`. Report to `docs/task-cycles/pierwsza-akcja-od-startu/reports/gate-fix-report.md`: the commit, each check with command and exit code, **Unread material**, **Searches not found or unclear**, the own-work check. Return status, commit, one-line check result, report path.
