PASS f451316fbe85cabf173a1c726becf3a9d431cca1

# Review of slice 4, task kopia-bazy

Range: base `0d18e4d`, head `f451316`, one commit. `git rev-parse HEAD` is the head given. Three files changed, the three the plan names.

No blocking finding. The script does what the slice asks, and every requirement I tried to break in it held. The Minor findings are gaps in the tests, not faults in the script.

## Findings

### Critical

None.

### Important

None.

### Minor

**1. An assertion that cannot fail, and the two real paths stand unprotected.** `tests/deploy/test_loop2_deploy_build.py:121`, with `:101` and `:103`, and `deploy/loop2-deploy:32-33`.

The case table holds the real paths `/usr/local/bin/loop2-backup` and `/etc/cron.d/loop2-backup`, which reads as a check of them. Line 121 reduces each to its last name, `loop2-backup`, and looks for that in a warning that already holds `deploy/loop2-backup at` or `deploy/loop2-backup.cron at` by the assertion at line 117. So line 121 passes whatever installed path the warning names. The fixture replaces both constants, so no test reads their real values.

Why it matters: the plan's goal names these two paths. A wrong constant would make every deployment on the server warn "cannot be read" and never compare the real file. That failure is loud and only warns, and both constants are right today: they agree with `deploy/loop2-backup.cron:3` and `:7` and `deploy/loop2-backup:4`. Hence Minor.

Evidence: mutation m1, `INSTALLED_BACKUP_SCHEDULE=/etc/cron.d/loop2-backup.cron`, the dotted name cron would skip, passed all four test files run on it, the build tests among them, exit 0. `tests/deploy/test_loop2_backup.py:184` shows the local way to pin a constant, through `constants()`.

**2. No test shows a commit from before this change deploying to its end.** `tests/deploy/test_loop2_deploy_build.py:80-95`.

The reason for a warning rather than a refusal is the rollback (D-16, D-217, spec decision 10). Such a commit holds `compose.yaml` and `deploy/loop2-deploy` but neither backup source. The only test of a missing source uses a commit with no `compose.yaml`, so it ends at exit 7 and cannot tell a run that went on to the build from one that stopped at the comparison and reported exit 7 at stage `build`.

Evidence: mutation m4, a `fail 7 build` after the schedule's missing-source warning, passed the build tests and the three invariant files, exit 0. The break is narrow, and the code itself is right: the scratch run `rollback_without_backup_sources` gave exit 0, two warnings, one build and unchanged installed copies.

**3. No test shows the installed copies untouched after a warned difference.** `tests/deploy/test_loop2_deploy_build.py:98-124`.

D-217 lists a deployment that installs the script or the schedule as a violation. Its verification is an agent's comparison, so no test is owed, and the same gap stood for the deploy script before this slice. The script holds to it: the three `INSTALLED_*` constants are only read, by `[[ -r ]]` and `cmp`.

Evidence: mutation m3, `cp -- "$source" "$installed"` after the difference warning, passed all four files, exit 0. The scratch runs hashed the installed copies before and after and found them unchanged.

**4. Polish in the test file.**
- `tests/deploy/test_loop2_deploy_build.py:81`: the comment tells the test's history and cites "spec decision 10", which lies in the ignored `.runs/`. D-217 holds the same requirement and stays with the repository.
- `tests/deploy/test_loop2_deploy_build.py:89`: the `zip` pins the order of the three warnings, which no requirement sets, so a correct reordering of the calls would fail it. The guideline *Behaviour, not implementation* asks to avoid that.
- `tests/deploy/test_loop2_deploy_build.py:96-97`: two blank lines inside the class, the new tests set apart from the one before them.

## The changed existing test

`test_commit_without_the_script_warns_then_fails_the_build_with_7` became `test_commit_without_the_sources_warns_for_each_pair_then_fails_the_build_with_7`. Judged under *Changing an existing test*: accepted. The cause lies with the requirement, spec decision 10, and the plan's *Checks* name this change. The count stays an equality, 1 to 3. Each warning is checked for its source and for "missing", which is stronger than before, and exit 7, no `up` and the last log line stay. Nothing was weakened. See Minor 4 for its comment and order.

No invariant test file changed. `tests/invariants/test_loop2_deploy_keeps_running.py` and `tests/invariants/test_loop2_deploy_trigger_input.py` run through the changed fixture and pass, 13 and 10 tests.

## The two questions of the dispatch

**Trust boundary, `deploy/loop2-deploy`.** The diff touches only the constants block and section 7. Input refusals, lock, fetch, acceptance, checkout, stages, exit codes and the order in `main` are byte-for-byte as they were. `compare_installed_script` still runs after the checkout and before the resource gate. The new code has no `fail`, no `exit` and no evaluation. Its arguments are constants and literals, and `$REQUESTED` reaches it validated.

From the commit's content the new paths take only `-f` and the exit status of `cmp -s`. Shown with hostile commits: a file of shell metacharacters that would leave a mark if run was not run and printed nothing; a directory at a source warns as missing; symbolic links in the commit, run on Linux, to a secret file, to the installed copy and to `/dev/zero`, printed nothing of the target and changed nothing. All ended exit 0 with a build. A refused input gave exit 2 and no comparison.

**Irreversible operation.** None in this slice. The deployment installs neither copy; see Minor 3.

## Own-work check

The author's requirement, that one pair must neither hide nor double another's warning nor stop the run, fits a real risk of the helper, and its tests would catch it unmet. The weaker spot is the rollback to an older commit, which is Minor 2.

## Declined to judge

- A commit whose source is a symbolic link to the installed copy gets no warning for that pair, so it hides drift (`link_to_the_installed_backup`). Merged code is trusted under D-16, and the deploy script's pair behaved the same before this slice.
- A directory at an installed path warns "differs" rather than "cannot be read". The wording of a case no procedure produces; the same shape stood before.
- The name `compare_installed_script` now covers three copies. The plan keeps the name.
- "copy" in `compare_installed_copy` and the warnings, a game term at `foundations/glossary.md:175`. The cycle's binding word "backup" is for the database backup. "installed copy" is the plan's and D-16's own phrase for another thing.
- The warnings' pointer to the loop2-deploy skill and the skill's lack of the new warnings. Slice 6 writes that.
- `deploy/loop2-backup` and `deploy/loop2-backup.cron` themselves: slice 3.

## Checks run

At the head, in the reviewed worktree, which stayed clean:

| Command | Exit | Tests |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_deploy_build.py` | 0 | 14 |
| `npm test -- tests/deploy/test_loop2_deploy_switch.py` | 0 | 10 |
| `npm test -- tests/deploy/test_loop2_deploy_commit.py` | 0 | 18 |
| `npm test -- tests/deploy/test_loop2_deploy_input.py` | 0 | 8 |
| `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` | 0 | 13 |
| `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` | 0 | 10 |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 | 18 |
| `npm test -- tests/quality/test_quality_invariants.py` (Ruff, ShellCheck on the script, ESLint, Prettier) | 0 | 5 |
| `npm test -- tests/deploy/test_loop2_tunnel_image.py` | 0 | 1 |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 |

The counts of the first seven and the quality file match the author's report.

Mutations of `deploy/loop2-deploy` in a scratch export of the head, each run as `python -B scripts/test.py <file>` (what `npm test` runs) on the build test and the invariant files `test_loop2_host_sharing.py`, `test_loop2_deploy_keeps_running.py` and `test_loop2_deploy_trigger_input.py`:

| Mutation | Result |
|---|---|
| m1 schedule constant names the dotted file | all four exit 0: not caught (Minor 1) |
| m2 the two sources swapped | build test exit 1, five tests fail |
| m3 installs on a difference | all four exit 0: not caught (Minor 3) |
| m4 a missing schedule source stops the run at exit 7, stage `build` | all four exit 0: not caught (Minor 2) |
| m5 comparison moved after the build | build test exit 1, three tests fail |
| m6 unreadable branch removed | build test exit 1, one test fails |
| m7 `cmp -s` replaced by `diff`, printing content | build test exit 1, only `test_all_three_differing_warn_three_times`, and by chance: the printed script text holds the word "warning" |
| m8 the comparison runs the commit's file | build test exit 1, only `test_installed_copy_equal_to_the_source_gives_no_warning` |

Hostile scratch runs through the repository's own fixture on this computer: `rollback_without_backup_sources`, `hostile_content`, `directory_as_source`, `directory_as_installed`, `refused_input`, each with the result given above; marker absent from output and log.

The symbolic links could not be shown on this computer: Git wrote the link, but the path did not resolve under Windows, so the run warned "missing". They ran instead on Linux, in a throwaway container: `docker run --rm --network none`, image `node:24`, the head's `deploy` and `tests/deploy` mounted read-only, exit 0, three cases. It reached no server and left no container.

## Checks not run

- Full `npm test` and `python -B .the-way/elements/common/foundation_check.py`: the cycle's own gate, not repeated, as the method gives.
- `tests/invariants/test_loop2_one_serving_process_container.py`, which reads `deploy/loop2-deploy` for its `docker exec` line: not run, it starts a container, and the slice adds no `docker` command. It stays for the full run.
- The author's first failing run: history, not repeated. m2 and m6 show the new tests fail when the behaviour breaks.

## Reaches beyond the dispatch

- `foundations/glossary.md:170-178`, entry `copy`: to judge the word against the cycle's binding.
- `deploy/loop2-backup:1-70` and `deploy/loop2-backup.cron`: to check that a human installs them unedited, so a comparison can come out equal, and that the paths agree. No placeholder stands in either.
- `docs/task-cycles/kopia-bazy/plan.md`, a search for the skill and the slice headings: to see that the skill's text is slice 6.
- `tests/deploy/test_loop2_backup.py:60-80`: the local way of pinning a constant.
- `foundations/part_map.md`, a search for "installed" and "compare": nothing there says what this slice changes.
- `tests/invariants/test_loop2_one_serving_process_container.py:240-252`: why it reads the script.

## Searches not found or unclear

none
