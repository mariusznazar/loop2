# Handoff 19-slice6 — executor of slice 6

You are the executor of slice 6 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `996e42ca8a85e23fdc5c71950148b4baebd01859`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/19-slice6-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:214-233` D-09
- `foundations/decisions.md:1971-1983` D-108
- `foundations/decisions.md:291-306` D-13
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump
- `foundations/invariants.md:125-134` loop2-deploy-trigger-input
- `foundations/invariants.md:115-124` loop2-distinct-address



## The slice (copied word for word from `plan.md`)

### Slice 6 — The scheduled check of the public address

- **Goal:** `.github/workflows/check-address.yml` exists as spec D gives: triggers exactly `schedule` (every 5 minutes on minutes that are not 0) and `workflow_dispatch` with one boolean input that forces a failure; `permissions: {}`; no checkout, no secret, no SSH, no `github.*` expression in a `run` script (the input reaches the script through `env`); its own concurrency group, not `deploy-loop2`, cancelling an older run; a job timeout of 5 minutes; one step that opens the public address (the host of `deploy.yml`'s `LOOP2_PUBLIC_URL`) and succeeds only on HTTP 200, up to 6 attempts 20 seconds apart each bounded by 15 seconds, then `::error::` and a non-zero exit; the forced-failure input fails the step at once. `tests/deploy/test_check_address_workflow.py` (new, first failing, standard library, text-read like `test_deploy_workflow.py`) proves each of those properties, that the only host is the declared public address (equal to `deploy.yml`'s), and that the step exits non-zero on a non-200. `tests/invariants/test_account_server_typecheck.py` names the workflow in `NOT_ROUTES`. `foundations/part_map.md`: the `deployment` Files gain `.github/workflows/check-address.yml` and its responsibility sentence gains the watcher, the logrotate file and the scheduled check, written through the-way-update-part-map. `deploy.yml` and its test stay untouched. Leaves for the human (Slice 7 writes the steps): finding the account that last changed the cron line, setting e-mail notifications for failed Actions runs on it, starting the workflow by hand with the failure input and seeing the e-mail arrive; until then the scheduled path is reported unchecked.
- **Change:** `.github/workflows/check-address.yml` · `tests/deploy/test_check_address_workflow.py` · `tests/invariants/test_account_server_typecheck.py` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:129-139` D. The scheduled check of the public address · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:189-189` the routes test in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 2 · Foundation entries row 8 · `foundations/decisions.md:214-232` D-09 · `foundations/decisions.md:291-304` D-13 · `foundations/invariants.md:125-133` loop2-deploy-trigger-input · `foundations/decisions.md:1971-1983` D-108 · `foundations/invariants.md:115-123` loop2-distinct-address (added by the orchestrator at the plan's review: the check reads the one declared public address) · `guidelines/coding.md` · `guidelines/testing.md` · `.github/workflows/deploy.yml` · `tests/deploy/test_deploy_workflow.py` · `tests/invariants/test_loop2_distinct_address.py`
- **Model:** cheaper
- **Risk:** none (the part map names no workflow file as a boundary; the spec's own table treats a dispatch input as untrusted, which the review of the whole change judges)
- **Checks:** `npm test -- tests/deploy/test_check_address_workflow.py` (first failing) · `npm test -- tests/deploy/test_deploy_workflow.py` · `npm test -- tests/invariants/test_account_server_typecheck.py` · `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` · `python -B .the-way/elements/common/foundation_check.py` (for the part map edit)
- **Depends on:** Slice 5 (same file `tests/invariants/test_account_server_typecheck.py`) · Slice 4 (same file `foundations/part_map.md`) · Foundation entries rows 2 and 8
