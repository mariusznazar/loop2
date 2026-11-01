# Slice 4 report — three installed copies compared at each deployment

**Status:** done

## Files and commits
- `deploy/loop2-deploy` (+20/-10 approx.): two constants `INSTALLED_BACKUP_SCRIPT=/usr/local/bin/loop2-backup`, `INSTALLED_BACKUP_SCHEDULE=/etc/cron.d/loop2-backup` in the constants block; new `compare_installed_copy INSTALLED RELATIVE_SOURCE`; `compare_installed_script` now calls it for the three pairs. The main order, stages and exit codes are unchanged; warnings only, same wording of kind (rollback wording kept).
- `tests/deploy/deploy_script_support.py`: `BACKUP_SCRIPT`, `BACKUP_SCHEDULE`; fixture paths and overrides for the two new constants; `deployable_commit` carries the three files from the repository's own files; `install(data, backup, schedule)` writes the three installed copies (defaults: the repository's files).
- `tests/deploy/test_loop2_deploy_build.py`: new tests; one changed.
- Commit: see the git log of `task/kopia-bazy` (message "feat: :sparkles: compare the installed backup script and schedule with their sources at each deployment, warning only"), one commit on base `0d18e4d`.

## Checks (command, exit code)
- Failing run first: `npm test -- tests/deploy/test_loop2_deploy_build.py` exit 1, 6 failures (assertion `1 != 3`, `0 != 1`), after adding only the two constants to the script so the tests reached their assertions.
- After the code: `npm test -- tests/deploy/test_loop2_deploy_build.py` exit 0 (14 tests); `..._switch.py` exit 0 (10); `..._commit.py` exit 0 (18); `..._input.py` exit 0 (8); `tests/invariants/test_loop2_deploy_keeps_running.py` exit 0 (13); `..._trigger_input.py` exit 0 (10); `..._host_sharing.py` exit 0 (18).
- `npm test -- tests/quality/test_quality_invariants.py`: first run exit 1 (Ruff C408 `dict()` in my new test); fixed to dict literals; second run exit 0 (5 tests, covers Ruff, ShellCheck on `deploy/loop2-deploy`).
- Mutation: commented out the schedule pair's call in the script; build test exit 1 (4 failures); restored; exit 0.
- Not run: full `npm test` (the gate is the orchestrator's); Prettier/ESLint (no changed file of theirs).

## Own-work check
Requirement most likely missed: a difference or absence in one pair must not hide or double a warning of another, and must not stop the run. Test `test_unreadable_installed_copy_warns_for_that_pair_only_and_continues`, `test_each_new_pair_differing_warns_once_and_continues` and `test_all_three_differing_warn_three_times` show exactly one warning per affected pair, exit 0.

## Choices
- Kept the name `compare_installed_script` as the plan says; added a helper `compare_installed_copy`. Rejected: three near-identical blocks (drift risk).
- Changed `test_commit_without_the_script_warns_then_fails_the_build_with_7` to `..._without_the_sources_warns_for_each_pair_...`: expects three warnings, in order, each naming its source and "missing", still exit 7. Reason: spec decision 10 (`spec.md:196-201`), per *Changing an existing test*. No assertion was weakened.
- Warning text generalized from "script" to "copy"; kept words the earlier tests assert on (`differs`, `reinstall`, `rollback`, `missing`, `cannot be read`).
- Part map: not changed, so `the-way-update-part-map` was not applied.
- Slice 3's files were present on the branch; the fixture reads them from `deploy/`.

## Reaches beyond the dispatch
none

## Searches not found or unclear
none. Note: the loop2-deploy skill text about warnings (`tests/agent_workflow/test_loop2_deploy_skill.py`) was not in this slice's Change list; I did not touch it.
