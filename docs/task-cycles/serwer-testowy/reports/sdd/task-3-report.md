# Slice 3 report: deployment script steps 1–6 (input, lock, fetch, accepted commit, checkout)

Status: DONE_WITH_CONCERNS. Commit `5ecea7e feat: add the deployment script's input, lock, fetch and checkout stages` on `task/serwer-testowy` (not pushed).

## What was implemented

- `.gitattributes`: one line, `deploy/** text eol=lf`.
- `deploy/loop2-deploy` (bash, `#!/bin/bash`, `set -uo pipefail`, every failure handled explicitly):
  - **Constants block** between `# >>> constants >>>` and `# <<< constants <<<`, holding: `export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`, `umask 027`, `CHECKOUT_DIR=/srv/loop2`, `INSTALLED_SCRIPT=/usr/local/bin/loop2-deploy`, `LOG_FILE=/var/log/loop2-deploy.log`, `LOCK_FILE=/run/loop2-deploy.lock`, `MEMINFO_FILE=/proc/meminfo`, `MIN_MEM_AVAILABLE_MIB=1024`, `MIN_DOCKER_FREE_GIB=4`, `LOCK_WAIT_SECONDS=900`, `HEALTH_WAIT_SECONDS=120`, `HOST_PORT=18080`, `BRANCH=main`, `COMPOSE_PROJECT=loop2`, `COMPOSE_SERVICE=app`, `CONTAINER_NAME=loop2`, `OLD_GAME_CONTAINER=loop`, `IMAGE_TITLE_LABEL=org.opencontainers.image.title=loop2` and `IMAGE_REVISION_LABEL=org.opencontainers.image.revision`. Each is a `readonly NAME=value` assignment on its own line, so the invariant readers' `shell_assignments` expand them.
  - Outside the block: `LC_ALL=C` and `COMMIT_NAME_PATTERN='^[0-9a-f]{40}$'`. Tests can never change these, because they are not in the block.
  - **Step 1, input.** On the forced path `SSH_ORIGINAL_COMMAND` is set (`[[ -v ]]`, even when empty) and no argument is given. On the human path the variable is unset and exactly one argument is given. Anything else, or a value that fails `=~ ^[0-9a-f]{40}$`, ends the run with exit 2 before git or Docker runs. The rejected value is never printed or logged.
  - **Step 2, lock.** `exec 9>>"$LOCK_FILE"`. If the file cannot be opened, the run ends with exit 4 and its own message. Then `flock --exclusive --wait 900 9`; a non-zero result gives exit 4.
  - **Step 3, start line.** `start: commit <sha>, path: forced command|human run, running commit: <sha|none>`. The running commit comes from `docker inspect --format "{{ index .Config.Labels \"org.opencontainers.image.revision\" }}" loop2`. A value that is not 40-hex, or a failed inspect, gives `none`.
  - **Step 4, fetch from `origin`.** Forced path: `fetch --quiet --no-tags origin +refs/heads/main:refs/remotes/origin/main`. Human path: `fetch --quiet --no-tags --prune origin '+refs/heads/*:refs/remotes/origin/*'`. A failure gives exit 6.
  - **Step 5, accepted commit.** First `cat-file -e <sha>^{commit}`. Forced path: `merge-base --is-ancestor <sha> refs/remotes/origin/main`. Human path: the same check against each `refs/remotes/origin/*` head except `HEAD`, and the log names the branch. If no check passes, the run ends with exit 3.
  - **Step 6, checkout.** `checkout --quiet --force --detach <sha>`, then `clean -ffdx --quiet`. A failure gives exit 6.
  - **Where Slice 4 goes.** A commented place follows the checkout. The run then ends with `fail 1 not-deployed ...`: exit 1, never 0. The header comment documents this exit code.

- `tests/deploy/deploy_script_support.py` is the test seam:
  - **The copy.** It takes the script's block, replaces only the values of `PATH`, `CHECKOUT_DIR`, `INSTALLED_SCRIPT`, `LOG_FILE`, `LOCK_FILE` and `MEMINFO_FILE`, and keeps everything else in the block as written. It asserts that a replaced name exists, that the source has no CR, and that the copy is byte-identical to the source outside the block.
  - **Stubs.** Recording stubs for `docker`, `curl`, `flock` and `df` are written at run time with LF into a stub directory, which comes first on the copy's `PATH`. Each records NUL-separated arguments. Its answers are rules matched by bash glob, set with `answer()`.
  - **The guard.** Before every run, `type -P` under the copy's `PATH` must resolve all four tools inside the stub directory, or the test fails.
  - **The fixture.** A bare Git repository stands in for GitHub; commits are built with plumbing. A clone of it stands in for `/srv/loop2`.
  - **Bash.** The tests use Git's own bash, found from `git --exec-path`. If git or that bash is missing, the test is skipped (`SkipTest`).
  - **Git isolation.** `GIT_CONFIG_GLOBAL` points to an empty file and `GIT_CONFIG_NOSYSTEM=1` is set, so neither the developer's hooks nor `autocrlf` reach the fixture. `GIT_TRACE` is written to a file per run, which shows whether git ran at all.
- `tests/deploy/test_loop2_deploy_input.py` has 8 tests:
  - 17 malformed values, each run on both paths;
  - two arguments;
  - both inputs at once;
  - no input at all;
  - the rejected value appears in neither the output nor the log;
  - two positive controls (below).
  
  Every refusal case asserts exit 2, no stub call, an empty git trace, an unchanged HEAD, and a last log line about `input`.
- `tests/deploy/test_loop2_deploy_commit.py` has 18 tests: the lock (wait 900 on fd 9; a held lock gives 4; a lock file that cannot be opened gives 4), the start line (a label, `none`, a label that is not a commit name), fetch (the forced path gets `main` only and does not prune; the human path gets every head and prunes; a failed fetch gives 6 on both paths and git's message is not printed), acceptance (earlier ancestors of `main`, the tip, a commit on no branch both absent from and present in the clone, refused with 3 on both paths, a tree object refused with 3, a commit only on another branch refused with 3 on the forced path both when absent and after a human run fetched it, and accepted on the human path), and the checkout (detached, clean after a tracked edit, an untracked file, an ignored file and a new directory; a run through the checkout never exits 0).

## Design choices I made (each one decides how to do something already settled; none sets a foundation entry)

1. **Git's messages go to the log file only.** The terminal and the Actions log get a generic "git fetch from GitHub failed (git exit N; git's message is in /var/log/loop2-deploy.log)". The reason: a fetch error can contain the run account's home path (for example in an ssh `Could not create directory '/home/<user>/.ssh'` message), and that path would reveal the SSH user. A test asserts that the unreachable remote's path does not appear in the output.
2. **Arguments are delivered through a launcher.** Python's command line to an MSYS bash on Windows drops the newline in `ab\ncd` and mangles `"q"`; I measured this before writing the tests. So the seam writes the arguments and `SSH_ORIGINAL_COMMAND` to files, and a launcher run by Git's bash reads them with `mapfile -d ''` / `read -d ''` and `exec`s the copy. A positive-control test proves the delivery is byte-exact, including an empty `SSH_ORIGINAL_COMMAND` versus an unset one.
3. **Proof that git did not run comes from `GIT_TRACE`, not a stub.** The brief stubs only the four tools. A positive control shows that a valid value does produce a trace containing `fetch`, so an empty trace means git really did not run.
4. **Exit code 1 for "checked out, not deployed"**, outside the 2–8 table, as the success-free stop until Slice 4. The tests pin it in one place, `EXIT_AFTER_CHECKOUT = 1` in `test_loop2_deploy_commit.py`, which Slice 4 has to change.
5. **`OLD_GAME_CONTAINER=loop` is already in the block.** Step 12 needs it and it is a constant. The spec's list of constants does not name it. I checked that the isolation invariant's word matcher does not flag the assignment line.
6. **`umask 027`.** Docker's daemon reads the build context as root, so the files need no world-read bit.

## TDD evidence

- **RED, missing script.** `python -B .the-way/gate/run_tests.py tests/deploy` before the script existed gave `FileNotFoundError ... deploy\loop2-deploy` in every set-up. Expected, since the file did not exist.
- **RED, behavioural.** With a stub script holding only the constants block and `exit 0`, the same command gave `Ran 26 tests ... FAILED (failures=62, errors=1)`. Every input, lock, fetch, commit and checkout test failed, for example with exit 0 instead of 2, 3, 4 or 6, missing stub calls, no log. Only the byte-exact-delivery seam control passed, as expected. Output was saved in the scratchpad as `red.txt`.
- **GREEN.** After the script, the same command gives `Ran 26 tests in 29.849s OK`; I re-ran it after the commit.
- **Mutation checks.** For each change I edited the script, ran the suite, then restored the script, compared it byte-for-byte with `cmp` and confirmed it matched:

  | Mutation | Result |
  |---|---|
  | forced path fetches every head | 1 failure |
  | regex without `$` | 14 failures |
  | forced path accepts any branch | 1 failure (the "after human fetch" state) |
  | no `git clean` | 1 failure |
  | both inputs allowed | 1 failure |

## Checks run

- `bash -n deploy/loop2-deploy` under `C:/Program Files/Git/bin/bash.exe`: OK.
- `python -B .the-way/gate/run_tests.py tests/deploy`: 26/26 OK. The tests cite no invariant, so the gate gives no invariant verdicts.
- `git ls-files --eol deploy/loop2-deploy`: `i/lf w/lf attr/text eol=lf`.
- Read-only invariant checks that read the script, run with `python -B -m unittest` from `tests/invariants`:
  - `test_loop2_container_isolation.DeployScriptActsOnLoop2Alone`: 5 of 6 pass. `test_script_runs_docker_compose` fails because there is no `docker compose` yet; Slice 4 adds it.
  - `test_account_server_typecheck`: `test_deploy_script_builds_before_starting_without_building` fails because there is no `compose ... build` yet; Slice 4 adds it. `test_no_other_deployment_route` passes.

  I edited no invariant file.
- The real `docker` was never called: the guard checks every run, and all four tools resolved to stubs.

## Unchecked

- `shellcheck`: not installed.
- Real `flock` serialization: Git Bash has no `flock`, and a stub proves nothing about locking.
- The script on Linux bash and real sshd forced-command behaviour: only the spec's description, not run.
- The full `tests/invariants` gate: not run, because the slice does not change what it covers beyond the two expected Slice 4 failures named above, and port 3000 rules apply.

## Concerns

1. **`/run/loop2-deploy.lock` and a non-root run account.** `/run` is a root-owned tmpfs, emptied at every reboot. The spec's single run account is not root, so it cannot create the lock file there. After each reboot every deployment would end with exit 4 ("cannot open the lock file") until a human recreates the file, for example with a `tmpfiles.d` entry such as `f /run/loop2-deploy.lock 0660 <run account> <group>`. The path is the brief's verbatim value, so I kept it. The skill or human action 3 should name this, or the orchestrator should choose another lock path. `/var/log/loop2-deploy.log` likewise needs creating with the run account's ownership, but it survives reboots.
2. **Exit code 1 is temporary.** Slice 4 must replace the `fail 1 not-deployed` line and `EXIT_AFTER_CHECKOUT` in the commit tests.

## Files changed

- `C:/Storage/repos/loop2-serwer-testowy/.gitattributes`
- `C:/Storage/repos/loop2-serwer-testowy/deploy/loop2-deploy`
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/deploy_script_support.py`
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/test_loop2_deploy_input.py`
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/test_loop2_deploy_commit.py`
