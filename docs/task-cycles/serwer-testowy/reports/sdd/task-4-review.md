# Review of Slice 4 (5ecea7e..a0b9fe9): the deployment script's steps 7–13 and the shell-reader fix

Reviewed: commit 5201598 (the slice) and commit a0b9fe9 (the check author's fix to the shell reader), from the review package `review-5ecea7e..a0b9fe9.diff`. Line numbers are from HEAD a0b9fe9.

### Spec Compliance

- ✅ Spec compliant for steps 7–13, the "Never" list and the error table, with one narrowing (Minor 1) that the orchestrator has to confirm.
  - **Step 7, installed script vs. source.** `deploy/loop2-deploy:201-215`.
    - A difference gives a warning that names the installed path and the commit, asks for a review and a reinstall (see the skill), says the difference is expected after a rollback, and the run continues.
    - A commit with no `deploy/loop2-deploy` gives a warning and no crash. Such a commit then fails with exit 7 at `build_image:295-297`, because it has no `compose.yaml`.
  - **Step 8, resource gate.** `deploy/loop2-deploy:219-262`.
    - Reads `MemAvailable` and Docker's root directory as one field (`--format '{{.DockerRootDir}}'`), then runs `df` on that directory.
    - One line logs both values on every run, before any check decides anything (`:252`).
    - A value below its threshold, or a value that cannot be read, gives exit 5 before any `docker compose`. `main` calls the gate at `:370`, before `build_image` at `:371`.
  - **Step 9, build.** `deploy/loop2-deploy:293-306`.
    - The command is exactly `LOOP2_COMMIT=<sha> docker compose --project-name loop2 -f /srv/loop2/compose.yaml build app`.
    - A failure exits 7 through `fail_after_build`, so `up` is never reached.
    - After a successful build, `MemAvailable` is logged again.
  - **Step 10, switch.** `deploy/loop2-deploy:310-324`.
    - The `up` command carries exactly the flags the spec names.
    - On a failure: the last 50 container log lines, the restore line naming `PREVIOUS_COMMIT`, then exit 8.
  - **Step 11, local probe.** `deploy/loop2-deploy:328-347`.
    - `/` must answer 200.
    - `/api/loop2-deploy-probe` must answer a 404 whose content type starts with `application/json`.
    - Otherwise: the restore line, then exit 8.
  - **Step 12, the old game's container.** `deploy/loop2-deploy:266-275`.
    - Reads name, status and health with `inspect --type container`, never its port.
    - Runs on success (`:375`) and inside every failure of steps 9–11 (`fail_after_build:285-289`).
  - **Step 13, prune.** `deploy/loop2-deploy:351-360`.
    - Runs on success only: `image prune --force --filter label=org.opencontainers.image.title=loop2`. Without `-a`, it removes only dangling images.
    - Then the line `deployed <sha>, previously <sha>` and `exit 0` (`:377-378`).
  - **Never.** The script adds no `down`, no other project, no host-wide prune and no unfiltered prune. The only command naming `loop` is the read-only `inspect` (`:269`). The tests confirm this (`test_loop2_deploy_switch.py`, `test_no_down_no_other_project_no_unfiltered_prune`), and so does the invariant reader: on the real script it finds all 7 Docker commands, the last one at line 354, and reads through to the last line, 383.
  - **Every file the brief names has its hunk.** The script, the support module and the two new test files. The edit to `test_loop2_deploy_commit.py` is outside the brief's list, but it is the necessary consequence of the script no longer ending with exit 1. It changes `EXIT_AFTER_CHECKOUT` and its docstring only.
- ⚠️ Cannot verify from the diff:
  - Real Docker behaviour: the exit status of `up --wait` on an unhealthy container, and the label filter of `image prune` on dangling images.
  - GNU `df --output` on the server.
  - `shellcheck`.
  
  These are the implementer's "Unchecked" list. Recommend a human-path run on the server before the merge, as the spec's *Human actions* already plan.
- ⚠️ Carried over from Slice 3, not in this diff: `running_commit` (`deploy/loop2-deploy:130`) runs `docker inspect` without `--type container`.
  - An image or volume named `loop2` could answer in place of the container.
  - The label is still validated as 40 hex characters, so the worst outcome is a wrong "previously" commit in the restore line, the line exit 8 tells the human to run.
  - The fix needs `test_loop2_deploy_commit.py`'s pinned argument list changed. The orchestrator should route it to a correction.

### Trust boundary (WAY-48), `deploy/**`

This slice adds no input handling; `read_input` is unchanged since Slice 3. For each crafted input, where it is covered:

| Crafted input | Where it is covered |
|---|---|
| non-hex, 39 characters, 41 characters, uppercase hex | `test_loop2_deploy_input.py:16-19` |
| leading or trailing whitespace, trailing or embedded newline | `test_loop2_deploy_input.py:20-23` |
| an option-like value (`--help`, `-c`) | `test_loop2_deploy_input.py:24-25` |
| shell metacharacters (`;`, `$( )`, backticks, `\|`, `&&`) | `test_loop2_deploy_input.py:26-30` |
| two words in one value | `test_loop2_deploy_input.py:31` |
| empty input | `test_loop2_deploy_input.py:32` |
| two arguments, both inputs at once, no input at all | `test_loop2_deploy_input.py:66-75` |
| a commit on no accepted branch | `test_loop2_deploy_commit.py:167-201` |

All of these run against `deploy/loop2-deploy:107` (the whole-value match `^[0-9a-f]{40}$`), which refuses before git or Docker.

New uses of outside data in this slice:

- **`REQUESTED`** (already validated) appears only in `LOOP2_COMMIT=` and in log text.
- **`PREVIOUS_COMMIT`** comes from a container label and is validated against the commit-name pattern (`:131`).
- **The `loop` container's state** is printed only when it matches `^/?[A-Za-z0-9_.-]+ [a-z]+ [a-z-]+$` (`:270`).
- **Docker's root directory** must be an absolute path with no newline, and is passed to `df` after `--` (`:236-237`).
- **The probe's content type** comes from loop2's own container and is echoed in the exit-8 message (`:340,344`). It is not a server-access value. It is the only text from outside the script that reaches the Actions log unfiltered (Minor 4).

Named risks:

- **The log file cannot be redirected by input.** `LOG_FILE` is a `readonly` constant (`:32`), and `log` and `append_to_log` write with `printf '%s\n'` (`:63,74`), so no input can become a format string or a path.
- **Nothing printed reveals a server-access value.** Docker's output, the container log lines and the stderr of `docker info`/`inspect` go to the log file or nowhere. `hostname` and `uname` are never called; the sentinel test covers success, exit 7 and both exit-8 paths (`test_loop2_deploy_switch.py:199-209`).

### Deliberate breaks (WAY-69)

Method: a scratch copy of the tree at a0b9fe9 (`git archive`) in the session scratchpad. Each break was applied by `t4breaks.py` to `deploy/loop2-deploy`. The matching test file's tests were run with `python -B -m unittest` from `tests/invariants`. The script was restored afterwards and checked byte-identical with `cmp`. The worktree was not touched.

**Baseline:** unbroken, the 10 selected tests pass:

- `DeployScriptActsOnLoop2Alone` (6);
- `ShellReaderReadsTheWholeScript` (2);
- the typecheck file's script test and its reader test.

**`loop2-container-isolation/1`** ("The loop2 deployment runs in a container separate from the existing loop deployment.").

Command: `python -B -m unittest test_loop2_container_isolation.DeployScriptActsOnLoop2Alone`.

| Break | Result |
|---|---|
| I1 `docker stop "$OLD_GAME_CONTAINER"` after reading its state | check FAILED (2 tests) |
| I2 the switch's `up` run with `--project-name loop` | check FAILED (2) |
| I3 `docker image prune --force` without the label filter | check FAILED (1) |
| I4 `docker network connect loop2_default "$OLD_GAME_CONTAINER"` | check FAILED (2) |
| I5 `docker rm -f "$OLD_GAME_CONTAINER"` placed right after a comment `# ... cat <<EOF ...` (the a0b9fe9 case on the real script) | check FAILED (2) |
| I6 `docker container restart "${OLD_GAME_CONTAINER}"` | check FAILED (2) |

**`account-server-typecheck/1`**, script part ("the image is built before the switch, `up --no-build`").

Command: `python -B -m unittest test_account_server_typecheck.ServingImageBuiltOnlyAfterTypecheck.test_deploy_script_builds_before_starting_without_building`.

| Break | Result |
|---|---|
| T1 `up` without `--no-build` | check FAILED |
| T2 `main` calls `start_container` before `build_image` (the two calls swapped at `:371-372`) | **check PASSED, break missed** (Important 1) |
| T3 `build` replaced by `pull` | check FAILED |
| T4 `--build` in place of `--no-build` | check FAILED |

### Strengths

- **The script reads like the spec, one function per step.**
  - The failure order is consistent: restore line, then the old game's state, then the stage line.
  - The gate fails closed when a value cannot be read, with a deliberate `unreadable` in the logged line.
  - Docker's output never reaches the Actions log.
- **Tests verify real runs of the real script through stubs.** They assert:
  - exact argument lists, including `LOOP2_COMMIT` per call (`calls_with_env`);
  - the call order (build before `up`, prune after `up`);
  - the absence of `up`, curl and prune after a failed build;
  - the sentinel hostname and the "whole `docker info`" answer, which make "never in the output" an observed fact rather than a reading of the code;
  - the exact thresholds at their boundaries (1 kB under and exactly at the threshold).
- **The implementer found the reader defect.** The old end marker `# <<< constants <<<` read as a heredoc, so the earlier isolation checks had passed without reading the commands at all. The implementer surfaced this instead of quietly working around it.
- **a0b9fe9 reads the real script fully and fails loudly in the cases it names.**
  - Comments, both quote kinds and `<<<` are honoured. Quoted strings over several lines are kept whole.
  - A heredoc or quote that is never closed raises `AssertionError`, and so does a `shlex` error. The old silent fallback to `split()` is gone.
  - Redirection targets are dropped by token, not by regex.
  - The reader's own tests use made-up scripts with literal expected values (`test_loop2_container_isolation.py:140-161`, `test_account_server_typecheck.py:171-182`), including the old marker and a real heredoc body holding `down`. Every expected value in the checks is a literal.
- **A reader that keeps working is guarded.** `test_script_runs_docker_compose` stays and fails when nothing is read.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

1. **`tests/invariants/test_account_server_typecheck.py:256`: the "builds before it starts" check compares line numbers in the file, not the order of the calls.**
   - `min(builds) < min(ups)` holds whenever `build_image` is *defined* above `start_container`. Break T2 swaps the calls in `main` (`deploy/loop2-deploy:371-372`) and the check still passes.
   - Its own docstring (`:23`) says "the script builds before its first `docker compose … up`", and the dispatch names this as the check's script part, so by the contract a missed break is Important.
   - Impact on the sentence itself is limited. With the calls swapped, `up --no-build` starts the image already present, which was built (and so type-checked) by an earlier run; the new commit's image is built afterwards and left unused. The deployment would report success for a commit it did not start.
   - Today the order is caught only by the script's own test (`tests/deploy/test_loop2_deploy_build.py`, `test_build_command_and_commit`, which compares call indices), not by the invariant.
   - Fix (for the check author, not this slice): either read the call order from `main` and the functions' bodies, or narrow the docstring's claim to "every `up` carries `--no-build`" and add "the order of the calls" to *Does NOT cover*, naming the script's test that covers it.

#### Minor (Nice to Have)

1. **Spec step 10 narrowed: the last container log lines go to the log file only.** `deploy/loop2-deploy:316-319`.
   - The terminal (the Actions log) gets only a pointer to `/var/log/loop2-deploy.log`.
   - The brief says "exit 8 with the last container log lines". In the script's own vocabulary, `log` means printed *and* written to the file.
   - This is conservative for the output rule, and the implementer surfaced it. The orchestrator should confirm it, and the skill slice has to say where the lines are, as the report's concern 3 asks.
2. **The gate fails open on a zero-padded value containing an 8 or a 9.** `deploy/loop2-deploy:256,259` (and `as_mib:245`).
   - Bash reads `089` as octal and errors with "value too great for base". `(( ))` then returns false, so the gate *passes*. Checked in Git's bash: `x=089; (( x < 1048576 ))` takes the else branch and the run goes on.
   - The real `/proc/meminfo` and GNU `df` never zero-pad, so this is not reachable today.
   - Fix: `(( 10#$mem_kb < … ))`, or strip leading zeros in the two readers.
3. **The shell reader still misreads silently in two forms** (`tests/invariants/loop2_invariant_support.py`). Neither occurs in the script today. Both were found by running the reader on made-up input (scratchpad `t4reader.py`):
   - **`:708`, pre-existing code, not changed by a0b9fe9.** A `$(` left open at the end of a line drops the line's last character: `out=$(docker compose --project-name loop2 down` + newline + `)` reads as `... loop2 dow`, so "nothing takes a project down" would miss it. The rest of the reader now raises on what it cannot read; this path should too.
   - **`:764`.** The descriptor pop cannot tell `5 >f` from `5>f`, because `shlex` drops the space: `docker stop --time 10 >/dev/null loop2` reads as `stop --time loop2`. Another test still catches a `loop` hidden this way (`test_old_deployment_is_only_read`).
4. **The probe's content type reaches the Actions log unfiltered.** `deploy/loop2-deploy:340,344`.
   - `got: ${api}` echoes the content type the container answered.
   - It comes from loop2's own application and holds no server-access value, but it is the one piece of outside text printed without a pattern check.
   - Consider printing the HTTP code alone, or the content type only when it matches `^[A-Za-z0-9/.+;= -]*$`.
5. **A tautology and stray names in the tests.**
   - `tests/deploy/test_loop2_deploy_switch.py:227`: `assertTrue(compose_file.endswith("/srv/loop2"))` checks the fixture's own path, not the script.
   - `:162`: `_kind` is never used.
   - `tests/deploy/deploy_script_support.py:46-50`: the comments of `UNSET` and `DOCKER_ROOT` are swapped. "recorded for a call made without LOOP2_COMMIT" describes `UNSET`.
6. **`tests/deploy/test_loop2_deploy_commit.py:20`: `EXIT_AFTER_CHECKOUT = 5` now depends on the stubs giving no `docker info` answer.** This is documented in the docstring. The test would break, loudly, if a later slice gives the seam a default answer. Acceptable.

### Assessment

**Task quality:** Approved (the slice). The one Important finding is in the invariant check (a0b9fe9's area and the foundation step's ownership), not in the slice's code.

**Reasoning:**

- The script implements steps 7–13 exactly, keeps every "Never", logs the restore line on every exit-8 path, and keeps Docker's output and the host's identity out of the Actions log. Its tests observe this through stubs rather than reading code.
- The reader fix makes the isolation checks read the whole real script and fail on unclosed constructs; all six isolation breaks are caught.
- The typecheck check's order test reads definition order rather than call order and missed the swapped-call break T2.

## Re-review after 7edefb0

Range a0b9fe9..7edefb0, one commit: `test: order the deploy script's build and up by the calls it runs`. The commit changes three files under `tests/invariants/`; it does not touch `deploy/`.

**Important 1 (the "builds before it starts" check read line order, not call order): ADDRESSED.**

The fix:

- The check now reads `support.executed_docker_commands`, which follows the script's top-level flow and expands each call of a function into that function's body (`loop2_invariant_support.py`, `executed_docker_commands`).
- It asserts that the first `compose build` or `up` the script runs is a `build`, and that an `up` follows (`test_account_server_typecheck.py`, `test_deploy_script_builds_before_starting_without_building`).
- A made-up script whose functions are written in one order and called in the other pins the reader's order: `ORDER_SCRIPT`, `ORDER_EXPECTED`, `test_shell_reader_follows_the_order_of_the_calls`.

**Breaks repeated** on a scratch copy of the tree at 7edefb0 (`git archive`), with the same anchors as before. Each was applied to `deploy/loop2-deploy` and restored afterwards; the restored file is byte-identical to the worktree's (`cmp`).

Command: `python -B -m unittest test_account_server_typecheck.ServingImageBuiltOnlyAfterTypecheck.test_deploy_script_builds_before_starting_without_building`.

| Break | Result | Failing assertion |
|---|---|---|
| T1 `up` without `--no-build` | check FAILED | `up` without `--no-build` |
| T2 `main` calls `start_container` before `build_image` | check FAILED (missed before) | `'up' != 'build'` |
| T3 `build` replaced by `pull` | check FAILED | holds no `docker compose ... build` |
| T4 `--build` in place of `--no-build` | check FAILED | `up` without `--no-build` |
| T5 (new) `main` never calls `build_image` | check FAILED | `'up' != 'build'` |

**The unbroken HEAD passes those files.** At 7edefb0, run read-only on the worktree with `python -B -m unittest`, 15 tests pass:

- the whole of `test_loop2_container_isolation` (12);
- from `test_account_server_typecheck`: `test_deploy_script_builds_before_starting_without_building`, `test_shell_reader_follows_the_order_of_the_calls` and `test_no_other_deployment_route`.

In the scratch copy, the rest of the `ServingImageBuiltOnlyAfterTypecheck` class also passes. Two of its tests fail there, and neither failure comes from this fix:

- `test_no_other_deployment_route` fails because the copy is not a git repository; it passes on the worktree.
- `test_workflow_ships_no_files` fails because `.github/workflows/deploy.yml` belongs to a later slice, as known.

The `npm`-based tests of the typecheck file were not run; this commit does not touch them.

**No assertion was weakened.**

- Kept: "holds a `build`", "holds an `up`", the image-import and `--no-build` problems list.
- Replaced by a stronger one: `assertLess(min(builds), min(ups))` (line order) became "the first of `build`/`up` in the order of the calls is `build`", plus "an `up` is run".
- The reader's tests only gained cases: an unclosed `$(` added to `READER_UNREADABLE`, and the new `READER_REDIRECTIONS` with literal expected values.

**Minor 3 (the reader misread two forms without failing): ADDRESSED.**

- An unclosed `$(` or backquote now raises `AssertionError` in `_command_substitutions`.
- `_drop_descriptors` removes a number only when it is written against a redirection operator. In `docker stop --time 10 >/dev/null loop2`, the `10` now stays.

**Not part of this re-review:** Minors 1, 2, 4, 5 and 6 are slice findings in `deploy/` and `tests/deploy/`, and this commit does not touch either directory.

**Verdict:** Important 1 is addressed. The slice stays **Approved**.
