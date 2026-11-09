# Slice 6 report — the scheduled check of the public address

**Status:** done (with concerns: the scheduled path is unchecked until the human's trial, see below)

**Commit (task branch `task/skad-wiem-o-awarii`, not pushed):** `fc493ba` — `feat: :sparkles: add the scheduled check of the public address ...`

Files changed in `fc493ba`:
- `.github/workflows/check-address.yml` — new, 54 lines added.
- `tests/deploy/test_check_address_workflow.py` — new, 251 lines added.
- `tests/invariants/test_account_server_typecheck.py` — 8 lines changed (the new workflow in `NOT_ROUTES`, one docstring sentence, the constant `SCHEDULED_CHECK_WORKFLOW`).
- `foundations/part_map.md` — 5 lines changed (the `deployment` sentence extended; `.github/workflows/check-address.yml` added to its Files).
- `deploy.yml` and `tests/deploy/test_deploy_workflow.py` untouched, as the slice requires.

## Test first

The workflow file was created empty, then the new test file was run (it reaches its assertions):
- `npm test -- tests/deploy/test_check_address_workflow.py` — exit 1, 16 tests, 14 failed. Two passed on the empty file (`test_no_checkout_no_secret_no_ssh`, `test_expressions_reach_a_run_script_only_through_env`); these are negative properties and hold vacuously on an empty file.
- Second run after writing the workflow, before fixing the stand-in and input regex: exit 1, 5 failed (the input-name regex caught the `inputs:` key; the `curl` stand-in was not found on PATH under Git's bash, so the real curl answered).
- After the stand-in fix (stand-ins are shell functions defined ahead of the run script) and the regex fix, the run is in the table below.

## Checks run (focused only)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_check_address_workflow.py` (first, empty workflow) | 1 | 14 failed on assertions or missing step, as expected |
| `npm test -- tests/deploy/test_check_address_workflow.py` (after workflow, before stand-in fix) | 1 | 5 failed (see above) |
| `npm test -- tests/deploy/test_check_address_workflow.py` (final, 17 tests) | 0 | OK |
| `npm test -- tests/deploy/test_deploy_workflow.py` | 0 | OK, 16 tests |
| `npm test -- tests/invariants/test_account_server_typecheck.py` (before NOT_ROUTES edit) | 1 | `test_no_other_deployment_route` failed: the new workflow counted as an unread route, as expected |
| `npm test -- tests/invariants/test_account_server_typecheck.py` (final) | 0 | OK, 9 tests |
| `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` | 0 | OK, 10 tests |
| `python -B .the-way/elements/common/foundation_check.py` (before staging the workflow) | 1 | `part_map.md:156` pattern `.github/workflows/check-address.yml` matches no tracked file — expected, the file was untracked |
| `python -B .the-way/elements/common/foundation_check.py` (after `git add` of the workflow file) | 0 | `0 errors` |

Not run: the full `npm test` (the orchestrator runs it, per the handoff). The one-command check is not run by me.

Pin check: `git -C .the-way rev-parse HEAD` = `294af7fde45323ac1851c014a03071a97fc38d96`, equal to the gitlink.

## The workflow, as written

- Triggers: `schedule` with cron `3-58/5 * * * *` (every five minutes, never minute 0), and `workflow_dispatch` with one boolean input `force_failure` (default false).
- `concurrency: check-address-loop2`, `cancel-in-progress: true`; `permissions: {}`; job `timeout-minutes: 5`; one job, one step.
- The step gets `FORCE_FAILURE` from `${{ inputs.force_failure }}` through `env`; no expression is inside the run script.
- The run script exits 1 at once when `FORCE_FAILURE` is `true`; otherwise it runs `curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "$LOOP2_PUBLIC_URL"` up to 6 times, sleeping 20 s between attempts (5 sleeps), exits 0 on 200, and on exhaustion writes `::error::` and exits 1.
- `LOOP2_PUBLIC_URL` is declared at workflow level with the same value as `deploy.yml`: `https://loop2.mariusznazar.com/`. The test asserts the two declarations are equal and that the only host in the file is that host.

## Own-work check (section 3)

Requirement most likely unmet: the step's retry loop and its exit status, which a text test cannot see. Check: the test runs the extracted run script under Git's bash with `curl` and `sleep` replaced by shell-function stand-ins. Cases: 200 passes with one call and no sleep; `404` ×6 fails after six calls with five 20-second sleeps and `::error::`; `503, 000, 200` passes after three calls; forced failure fails with zero calls; `force_failure=false` leaves the decision to the address. All passed in the final run.

Mutation reasoning (in head): a wrong attempt count, a missing sleep, a 200 check that accepts any 2xx, a forced-failure check placed after the request, or a second host would each break at least one of the named tests.

## Choices made (orchestrator's delegation: none needed, the slice fixed the content)

- Cron `3-58/5 * * * *`. The spec's example minutes 3, 8, 13 … are exactly these; the gap across the hour is 5 minutes. Way rejected: `*/5` (includes minute 0, which GitHub delays).
- Input name `force_failure`, boolean. The name is mine; the slice left names to the maker.
- Concurrency group `check-address-loop2`. Way rejected: sharing `deploy-loop2`, which the slice forbids.
- Stand-ins as shell functions defined in a preamble, not as executables on PATH: Git's bash does not run an extensionless script found on PATH. Cost if wrong: none for the real workflow; the stand-in only reaches what the function does.
- The part map sentence: I wrote "…the failure watcher and its schedule, the logrotate file of the game's log and the scheduled check of the public address, which tell the owner when the running game fails." Way rejected: a separate entry for the check (the part map has no such kind for a workflow).
- The `deployment` trust boundary is unchanged (`deploy/**`). The handoff says the map names no workflow file as a boundary; I did not add one.
- Part-map step 4 of the skill (ask and show the human) was not run as a human question: the slice fixes the content and the cycle's questions go to the orchestrator. Flagged here so the orchestrator can object.

## Reaches beyond the handoff

- `.the-way/elements/part-map/skill/SKILL.md`, `decide_entry.md` and `write.md` (under `skill/`), and `.the-way/elements/part-map/template.md`, read when the skill's step named them.
- `tests/deploy/deploy_script_support.py` — imported for `git_bash()` and `shell_path()` (the same locator as the deploy tests, so Git's own bash is used and not WSL's `bash.exe`).
- `tests/invariants/loop2_invariant_support.py` — `deployment_route_files` and `read_required`, to see what the route tripwire counts.
- `guidelines/testing.md` — the gate's rules for `npm test -- <file>` and new Python test files (lines ~310–330).
- `guidelines/coding.md` — read in full at the start (its rules on deployment and logging are not touched by this slice).
- `.the-way/elements/part-map/skill` was read from this worktree, not from the main checkout's `.claude/skills` copy that the skill launch named.

## Searches not found or unclear

- `elements/part-map/decide_entry.md` and `elements/part-map/write.md`: not found at that path. The skill's steps name them as beside the skill; they are at `elements/part-map/skill/decide_entry.md` and `write.md`. Read there.
- The spec's `deploy.yml` tests: `tests/deploy/test_deploy_workflow.py` is a text test with `test_public_address_declared_once_and_probed`; I did not change it.
- The distinct-address invariant reads only `deploy.yml` for LOOP2 declarations; the new workflow's `LOOP2_PUBLIC_URL` does not affect it (checked by reading `tests/invariants/test_loop2_distinct_address.py`; not run, since it was not among the slice's checks).
- None else.

## Problems observed

- The scheduled path is unchecked: GitHub does not run here. The cron minutes, the scheduling delay, and the e-mail on a failed run are the human's checks (slice 7 writes the steps). A trial run with `force_failure: true` is also the human's.
- The "deploys nothing" property is tested by text (forbidden words in the run script) and by the absence of `actions/checkout` and secrets; no real run is possible before the merge.
