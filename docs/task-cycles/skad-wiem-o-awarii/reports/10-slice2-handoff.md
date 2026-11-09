# Handoff 10-slice2 — executor of slice 2

You are the executor of slice 2 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `0908743ea1ce8c781f046890513fa07585de7d4a`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/10-slice2-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:291-306` D-13
- `foundations/decisions.md:323-343` D-15
- `foundations/decisions.md:344-369` D-16
- `foundations/decisions.md:370-394` D-17
- `foundations/decisions.md:5120-5155` D-252
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/environment_facts.md:27-32` mikrus-host-docker-workloads
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:135-144` loop2-deploy-keeps-running
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump
- `foundations/invariants.md:125-134` loop2-deploy-trigger-input
- `foundations/invariants.md:155-164` loop2-host-sharing



## The slice (copied word for word from `plan.md`)

### Slice 2 — The dump of both services' log before the containers are recreated

- **Goal:** `deploy/loop2-deploy` gains the dump stage of spec A1, run after `build_image` and before `start_container`: a new constants-block entry for the dump file `/var/log/loop2-app.log`; one function that appends a header line (UTC time, `loop2-deploy`, previous and new commit names, nothing else) and then the standard output of `docker compose ... logs --no-color --timestamps app cloudflared` (no `--tail`) under `timeout` (300 seconds, a constant), sending Docker's standard error to the deploy log file; one result line in the deploy log (`dump:` with byte counts on success, `warning:` naming the file and the exit status on failure, never any dumped content); a failed dump never stops the deployment (A1 error handling). The installed-copy comparison grows from three to six pairs: new constants for the installed watcher script, the watcher's cron file and the logrotate file, compared with `deploy/loop2-watch`, `deploy/loop2-watch.cron` and `deploy/loop2-app.logrotate` with the same warning-only behaviour (a commit without the source warns, as the function already does). `tests/deploy/deploy_script_support.py` gets the new constants overridden in the copy it writes (the dump file and the three installed paths inside the temporary tree) and creates the installed copies in `install()`; `tests/deploy/test_loop2_deploy_dump.py` (new, failing first) proves: the dump runs after the build and before `up`, appends header and stand-in output, writes the `dump:` line without content; a failing dump writes the `warning:` line and the deployment still reaches `up`; a deployment that stops before `up` dumps nothing; and carries the two cases of the invariant of row 4 (the dump that works, the dump that fails), tagged `# invariant: <name>` with the name the foundation step gave row 4. `tests/deploy/test_loop2_deploy_build.py` covers the three new comparison pairs (docstring and cases); `tests/deploy/test_loop2_deploy_switch.py` is adapted where it counts `logs` calls (the dump is a second `logs` call, the failed-start one keeps `--tail 50`). Leaves for the human: reinstalling `loop2-deploy` on the server from the reviewed commit before the merge (Slice 7 writes the steps); nothing here is installed or run on the server.
- **Change:** `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py` · `tests/deploy/test_loop2_deploy_dump.py` · `tests/deploy/test_loop2_deploy_build.py` · `tests/deploy/test_loop2_deploy_switch.py`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:52-70` A. The record of the game's log · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:186-187` the deploy-script and Compose tests in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 4 · Foundation entries row 7 · `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:323-341` D-15 · `foundations/decisions.md:5120-5154` D-252 · `foundations/invariants.md:155-163` loop2-host-sharing · `foundations/invariants.md:135-143` loop2-deploy-keeps-running · `foundations/invariants.md:125-133` loop2-deploy-trigger-input · `foundations/environment_facts.md:27-31` mikrus-host-docker-workloads · `guidelines/coding.md` · `guidelines/testing.md` · `tests/deploy/test_loop2_deploy_commit.py` (example of a deploy-script test) · `tests/invariants/test_loop2_host_sharing.py` · `tests/invariants/test_loop2_deploy_keeps_running.py`
- **Model:** same — a root-installed script every deployment runs, and several existing tests tie to its stage order, so a slip blocks deployments
- **Risk:** trust boundary — `deploy/**` (`deploy/loop2-deploy`)
- **Checks:** `npm test -- tests/deploy/test_loop2_deploy_dump.py` (first failing) · `npm test -- tests/deploy/test_loop2_deploy_build.py` · `npm test -- tests/deploy/test_loop2_deploy_switch.py` · `npm test -- tests/deploy/test_loop2_deploy_commit.py` · `npm test -- tests/deploy/test_loop2_deploy_input.py` · `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` · `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` · `npm test -- tests/invariants/test_loop2_host_sharing.py` · `npm test -- tests/quality/test_quality_invariants.py` (shellcheck of the script)
- **Depends on:** Slice 1 (the logrotate file whose installed copy the script now compares) · Foundation entries rows 4 and 7
