# Slice 4 report: deployment script steps 7–13 (warning, resource gate, build, switch, probe, prune)

Status: DONE_WITH_CONCERNS. Commit `5201598 feat: add the deployment script's resource gate, build, switch, probe and prune stages` on `task/serwer-testowy`. It is not pushed.

## What was implemented

`deploy/loop2-deploy`: the temporary `fail 1 not-deployed` line is gone. After the checkout, `main` now runs these steps:

- **7. `compare_installed_script`**:
  - The commit has no `deploy/loop2-deploy`: one warning that the source is missing, and the run continues.
  - The installed copy cannot be read: one warning, and the run continues.
  - `cmp -s` finds a difference: one warning naming the installed path and the commit. It says the run goes on with the installed copy and that a human should review the difference and reinstall the script (see the loop2-deploy skill). It also says the difference is expected after a rollback to a commit older than the last change of the script. The run continues.
- **8. `check_resources`**:
  - `MemAvailable` is read from the meminfo file in pure bash.
  - The free space comes from `docker info --format '{{.DockerRootDir}}'` (that one field, with stderr discarded), then `df --output=avail -k -- <root>`.
  - One line is logged on every run: `resources: MemAvailable N MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory N MiB (minimum 4 GiB)`.
  - The run ends with exit 5, before any `docker compose`, when either value is below its threshold (compared in kB) or cannot be read.
- **9. `build_image`**:
  - A missing `compose.yaml` gives exit 7 without calling Docker.
  - Otherwise the script runs `LOOP2_COMMIT=<sha> docker compose --project-name loop2 -f /srv/loop2/compose.yaml build app`. Its output goes to the log file only.
  - A failure gives exit 7.
  - On success it logs `build of <sha> succeeded` and `resources after the build: MemAvailable N MiB`.
- **10. `start_container`**:
  - Runs `up -d --no-build --no-deps --remove-orphans --wait --wait-timeout 120 app`, with the same project and file. Its output goes to the log file only.
  - On a failure: `compose ... logs --no-color --tail 50 app` goes into the log file, the terminal gets a line pointing there, then come the restore line and exit 8.
- **11. `probe_origin`**:
  - `curl --silent --noproxy '*' --max-time 10` to `http://127.0.0.1:18080/`, which must answer `200`.
  - Then to `/api/loop2-deploy-probe`, which must answer `404` with a content type starting `application/json`.
  - Otherwise: the restore line, then exit 8.
- **12. `log_old_game_state`**:
  - Runs `docker inspect --type container --format '{{.Name}} {{.State.Status}} {{health or no-healthcheck}}' loop`.
  - It prints only output matching `name status health`. Otherwise it logs `loop not found or its state not readable`.
  - It runs on success after the probe, and inside every failure of steps 9–11 (`fail_after_build`) just before the closing stage line. It never reads the port.
- **13. `prune_replaced_images`**:
  - Runs on success only: `docker image prune --force --filter label=org.opencontainers.image.title=loop2`, with its output going to the log file.
  - A failed prune is a warning; the deployment still stands.
  - Then `deployed <sha>, previously <sha|none>` and `exit 0`.
- **Restore line**: `previously running commit: <sha>; to restore run loop2-deploy <sha> on the server`. When there was no previous container it reads `previously running commit: none; no earlier loop2 container existed to restore`.
- **Header**: the exit-code comment now lists `0 deployed` and no longer lists 1.
- **`append_to_log`** now skips empty text, so empty Docker output leaves no blank lines.

`tests/deploy/deploy_script_support.py`:

- Every stub also records the `LOOP2_COMMIT` of each call (`Result.commit_env`, `calls_with_env`).
- New `hostname` and `uname` stubs print `SENTINEL_HOST`. The guard now checks all six tools, passed as arguments.
- `make_commit` and `commit` accept `files` (nested trees are supported).
- New helpers:
  - `deployable_commit()`: a commit with `compose.yaml` and `deploy/loop2-deploy`;
  - `install()`: writes the installed copy;
  - `answer_passing_run(running=...)`: answers under which every stage passes; a rule given before it takes precedence.
- The constants block's end marker changed (see design choice 1).

`tests/deploy/test_loop2_deploy_commit.py`: `EXIT_AFTER_CHECKOUT = 5`. With no stub answers, the gate cannot read Docker's root directory. I also reworded the two lines of the module docstring that explained this constant; nothing else changed.

New test files:

- `tests/deploy/test_loop2_deploy_build.py`, 10 tests:
  - equal installed copy, no warning;
  - difference warns with the rollback wording and continues;
  - commit without the script warns, then exit 7 and no `up`;
  - memory 1 kB below 1024 MiB gives exit 5;
  - disk 1 kB below 4 GiB gives exit 5;
  - exact thresholds pass;
  - both values logged on a pass and on each refusal, and `docker info` is called only with the one field;
  - five unreadable cases give exit 5;
  - `MemAvailable` is logged again after the build;
  - the exact build command with `LOOP2_COMMIT`, and build before `up`;
  - a failed build gives exit 7, with no `up`, no curl and no prune, the `loop` state logged after the build stage, and Docker's output in the log file but not on the terminal.
- `tests/deploy/test_loop2_deploy_switch.py`, 11 tests:
  - the exact `up` command, both probes, the exact prune after `up`, the last line, and the `loop` state after the build;
  - a first deployment logs `previously none`;
  - a repeated deployment of the running commit gives exit 0;
  - `loop` not found is logged and the deployment still succeeds;
  - a failed prune is a warning;
  - a failed health wait gives exit 8 with the restore line, and the container log lines are in the log file but not on the terminal;
  - four failed probes (`/` not 200, the API path not 404, a 404 that is not JSON, curl cannot connect), each exit 8 with the restore line;
  - a failed start with no previous commit says none existed;
  - across a success, exit 7, exit 8 at the switch and exit 8 at the probe: `hostname` and `uname` never called, the sentinel and the real hostname never in the output, and no whole `docker info`;
  - across the same four runs: no `down`, the project is always `loop2` with `-f .../srv/loop2/compose.yaml`, the only prune is the filtered one, and `loop` appears only in `inspect --type container`.

## Design choices (each says how to do something already settled; none sets a foundation entry)

1. **The end marker of the constants block was changed from `# <<< constants <<<` to `# === end of constants ===`.**
   - The read-only invariant parser `tests/invariants/loop2_invariant_support.py` (`shell_commands`, heredoc detection) runs its `<<word` regular expression on raw lines, comments included. It read the old marker as a heredoc `<< constants` and skipped the rest of the script.
   - So `docker_commands` and `shell_commands` saw nothing after line 46. Slice 3's "5 of 6 isolation checks pass" passed without reading the script's commands at all.
   - With the new marker the parser sees all 7 Docker commands, and every isolation check passes on real content.
   - Both places that hold the marker are in my write boundary (the script and `BLOCK_END` in the seam).
2. **Docker output goes to the log file only**, following the dispatch's rule. This covers the build, `up`, the container's last 50 log lines, the prune output and the stderr of `docker info` and `inspect`. The terminal (the Actions log) gets a line pointing at the log file.
   - This narrows spec step 10's "logs the last container log lines": they are in the server log, not in the Actions log.
3. **An unreadable gate value gives exit 5 (the gate fails closed).** This covers a failed `docker info`, a root that is not an absolute path, a failed or non-numeric `df`, and a missing `MemAvailable`. The values are compared in kB, so exactly 1024 MiB and exactly 4 GiB pass.
4. **A commit without `compose.yaml` gives exit 7 in the build stage without calling Docker.** This makes deterministic the spec's statement that such a commit fails at the build.
5. **`LOOP2_COMMIT` is passed to `up` as well as to `build`**, so both commands resolve the same Compose model. The spec names it only for the build; passing it to `up` is harmless because of the `:-unknown` default.
6. **The probe makes one attempt each, with a 10-second timeout.** It runs after `--wait` reported the container healthy. The unknown path is `/api/loop2-deploy-probe`. The 404 is accepted when the content type starts with `application/json` (case-insensitive).
7. **The backticks are dropped from the spec's "deployed `<sha>`, previously `<sha>`"** and from the restore line, as Markdown markup. The log prints the plain text.
8. **`cmp -s`** compares the installed copy with the checked-out source. It comes from diffutils, which Ubuntu ships as essential. In tests it is the real `cmp` of Git's bash.

## TDD evidence

- **RED.** I first wrote the tests and the seam extensions, with the script unchanged (it still ended with exit 1). `python -B .the-way/gate/run_tests.py tests/deploy` gave `Ran 47 tests ... FAILED (failures=28)`. Every new test and subtest failed. Slice 3's 26 tests still passed with the extended seam. The output is in the scratchpad as `s4-red.txt`.
- **GREEN.** After the script: `Ran 47 tests ... OK`. I re-ran it after the marker change and the `append_to_log` change: `Ran 47 tests in 78.644s OK`.
- **Mutations.** Each was applied by a script and the suite run. The script was then restored and checked byte-identical.

  | Mutation | Result |
  |---|---|
  | prune without the label filter | 2 failures |
  | memory gate removed | 1 failure |
  | disk gate removed | 1 failure |
  | failed build ignored | 3 failures |
  | no restore line on a failed probe of `/` | 2 failures |
  | old game not logged on success | 2 failures |
  | JSON not required | 1 failure |
  | whole `docker info` printed | 2 failures |
  | build output printed | 1 failure |
  | no `LOOP2_COMMIT` on the build | 1 failure |
  | prune also on a failed start | 1 failure |

## Checks run

- `bash -n deploy/loop2-deploy` with `C:/Program Files/Git/bin/bash.exe`: OK.
- `python -B .the-way/gate/run_tests.py tests/deploy`: 47/47 OK.
- `python -B .the-way/gate/run_tests.py tests/invariants`: `Ran 51 tests, FAILED (failures=3)`. All three fail only because `.github/workflows/deploy.yml` does not exist yet; a later slice adds it:
  - `test_account_server_typecheck...test_workflow_ships_no_files`;
  - `test_loop2_distinct_address...test_public_address_host_is_not_the_old_game`;
  - `test_loop2_distinct_address...test_public_address_is_declared_once`.

  Everything else passed. That includes `test_loop2_container_isolation` in full (`test_script_runs_docker_compose` included) and `test_deploy_script_builds_before_starting_without_building`. I edited no invariant file.
- `git ls-files --eol`: every file is `i/lf w/lf`.
- The real `docker` was never called: the guard ran before every run and all six tools resolved to stubs.

## Unchecked

- `shellcheck`: not installed.
- Real Docker, real `flock`, Linux bash, GNU `df --output` on the server, and real `curl` against the container.
- The real `docker compose up --wait` behaviour (exit status on an unhealthy container) and `image prune` with a label filter, beyond their documented behaviour.

## Concerns

1. **Weakness in the invariant parser (read-only for me).**
   - `loop2_invariant_support.shell_commands` treats any `<<word` as a heredoc, even inside a comment or in a `<<<` here-string written as `<<<word`, and skips every line after it when no terminator follows.
   - Any later such line in `deploy/loop2-deploy` would make the isolation checks pass again without reading the script's commands.
   - `test_script_runs_docker_compose` now catches the case where nothing is read. It does not catch the case where only part of the script is read.
   - The foundation's check author should look at this: strip comments before the heredoc search, and require a heredoc to be `<<` but not `<<<`.
2. **`running_commit` (from Slice 3) still runs `docker inspect` without `--type container`.**
   - Adding it changes the argv that the `assert_refused` method in `test_loop2_deploy_commit.py` pins exactly. That file is outside my boundary except for `EXIT_AFTER_CHECKOUT`, so I left it alone.
   - Without `--type`, an image or volume named `loop2` could answer instead of the container. Its revision label would still be validated as 40 hex characters, so the worst outcome is a wrong "previously" commit.
3. **The container's last log lines are not in the Actions log** (design choice 2). After exit 8, the human reads them in `/var/log/loop2-deploy.log` or through `docker compose -p loop2 logs`. The skill slice should say so.
4. Slice 3's concern about `/run/loop2-deploy.lock` and a non-root run account still stands.

## Files changed

- `C:/Storage/repos/loop2-serwer-testowy/deploy/loop2-deploy`
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/deploy_script_support.py`
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/test_loop2_deploy_build.py` (new)
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/test_loop2_deploy_switch.py` (new)
- `C:/Storage/repos/loop2-serwer-testowy/tests/deploy/test_loop2_deploy_commit.py` (`EXIT_AFTER_CHECKOUT` and its docstring sentence only)

## Fix after the final review (M1: `--type container` on the running-commit read)

Status: DONE.

- **Change.** `deploy/loop2-deploy:130` (`running_commit`) now reads the running loop2 container's revision label with `docker inspect --type container --format "{{ index .Config.Labels \"org.opencontainers.image.revision\" }}" loop2`. An image, volume or network named `loop2` can no longer answer in the container's place. Every container read in the script now carries `--type container`. This resolves concern 2 above.
- **Pinned expectations updated.**
  - `tests/deploy/test_loop2_deploy_commit.py`, `assert_refused`: the exact argv now holds `"--type", "container"`.
  - `tests/deploy/deploy_script_support.py`, `answer_passing_run`: the two rules for the label read now match `inspect --type container --format *loop2`. They still cannot match the read of `loop`, whose rule ends in ` loop`.
  - No other `tests/deploy` file pins that call. `tests/invariants/` is untouched.
- **RED.** With only the expectations changed: `python -B .the-way/gate/run_tests.py tests/deploy` gave `Ran 63 tests, FAILED (failures=16)`.
- **GREEN.**
  - `tests/deploy`: `Ran 63 tests in 88.134s OK`.
  - `bash -n deploy/loop2-deploy` (Git's bash): OK.
  - `git ls-files --eol deploy/loop2-deploy`: `i/lf w/lf attr/text eol=lf`, no CR.
  - `docker_commands` of the invariant parser reads the call as `inspect --type container ... loop2` (line 130).
- **Invariant gate.** `python -B .the-way/gate/run_tests.py tests/invariants`, run with port 3000 free and nothing else on it.
  - First run: `Ran 57 tests, FAILED (errors=1)`. The one error was `tearDownClass` of `test_loop2_api_error_route.UnmatchedApiRequests`: "port 3000 on 127.0.0.1 is still held 15 s after the server ... were killed". That test starts the Express server and never reads the deployment script.
  - The immediate re-run: `Ran 57 tests in 50.878s OK`.
  - I read the error as a port that was released late on this machine, not as an effect of this change. If it comes back it deserves its own look.
