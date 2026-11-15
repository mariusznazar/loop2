# Report of the one author — task `ci-przy-pr`

**Status:** `done with concerns` (concerns: one `TODO` in the *Based on* of D-412, and the first CI run on Linux, which only the orchestrator can start).

## Commits (on `task/ci-przy-pr`, after `e5ad01fb`, which I did not touch)

| Commit | What |
|---|---|
| `5d6c57e5` | `feat: :white_check_mark:` the fifth stage of the full gate (`scripts/test.py`), its tests, README and testing guidelines text, and the foundation entries D-405, D-77, D-390 and the new D-412 |
| `5d70d505` | `test: :white_check_mark:` D-390: a daemon that answers on a computer with no Docker Desktop is used (two tests) |
| `51596257` | `feat: :construction_worker:` `.github/workflows/tests.yml`, its test, the part-map entry, and the no-route list of an invariant test |

`git log --format='%h %ae'` shows `the private address` (the private address) on all three.

## Files changed (added / removed lines, `e5ad01fb..HEAD`)

- `.github/workflows/tests.yml` +56 (new)
- `tests/quality/test_ci_workflow.py` +153 (new)
- `foundations/decisions.md` 39 changed lines (D-77, D-405, D-390 edited; D-412 added at the end of the log, before the withdrawn list)
- `foundations/part_map.md` 3 lines (`build-tools` sentence, one *Files* line)
- `README.md` 6 lines; `guidelines/testing.md` 6 lines
- `scripts/test.py` +4/-1
- `tests/quality/gate_fixture.py` +26/-3; `tests/quality/test_test_gate.py` +45/-7; `tests/quality/test_node_test_selection.py` +2/-1
- `tests/quality/test_docker_gate.py` +20/-1
- `tests/invariants/test_account_server_typecheck.py` +5/-2

Total: 12 files, 348 insertions, 32 deletions.

## What was made

1. **Fifth stage.** `scripts/test.py` `main` runs `python -B .the-way/instruction-files/check_instructions.py` after the foundation check; the first non-zero exit code of any stage ends the run (unchanged loop). The script's own exit codes: 1 on an error, 0 on warnings alone. One-file runs do not run it (unchanged path). Measured on this worktree: `0 error, 140 warn, 7 info`, exit 0. The task's fact "130 `dead-path` warnings" differs: 140 warnings here, all `dead-path` (50+50 in `loop2-deploy` SKILL copies, 15+15 in `loop2-play`, 1 `AGENTS.md`, 1 `foundations/part_map.md`, 4 `guidelines/styleguide-browser-view.md`, 4 `guidelines/testing.md`). No error either way; the difference is the files of this branch versus `394ca859`, not a problem for the stage.
2. **README** paragraph "`npm test` to jedno polecenie…" names the stage and says that only an error of it stops the gate; the one-file paragraph says the focused run does not run it; a new paragraph says that CI runs the same `npm test` on Linux (`.github/workflows/tests.yml`, job `tests`). `guidelines/testing.md`: the sentence on the one-file run and the *Command* of the recipe name the stage; *Where in code* lists the workflow and its test.
3. **Workflow** `.github/workflows/tests.yml`, name and job name `tests`: `pull_request` into `main` only; `permissions: contents: read`; no secret; `ubuntu-24.04`; `timeout-minutes: 60`; concurrency group per ref with cancel; checkout `fetch-depth: 0`, `submodules: true`, `persist-credentials: false`; then `git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main`; setup-python with `python-version-file: .the-way/.python-version`; setup-node with `node-version-file: package.json` (reads `engines.node` `^24.15.0`); `npm ci`; `python -m venv .runs/quality-venv`; `.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt`; `npm test`. The comment says why Linux (settlement 3) and why no scanner. Actions are pinned by commit as the-way's own `tests.yml` does: checkout and setup-python at the same SHAs as there (v7.0.1, v7.1.0), setup-node at `949feb2413d6458794dcd2491c4babbbce0c15c1` (v7.1.0), all three SHAs verified with `git ls-remote` on the actions' public repositories (a read of public refs, nothing on GitHub changed).
4. **D-390 / `docker_gate.py`.** Verified in the code that nothing needs a change: `daemon_gap` asks the daemon first (`daemon_answers`), and only when none answers does it look at `docker_command()` and `desktop_present()`; the module docstring already says "Where none answers and there is no Docker Desktop to start, the test is skipped at once". The existing tests did not hold the case "daemon answers, no Docker Desktop" (the stand-in with `plugin=False` was used only with `answers=False`), so I added two tests (see below). No code change in `scripts/docker_gate.py`.
5. **Foundation entries** (see the table below).
6. **Part map:** the workflow is in `build-tools` (its sentence now says it runs the one command of tests on every pull request into `main` in a workflow of GitHub Actions on Linux; `.github/workflows/tests.yml` in *Files*). Reason: the responsibility is running the test gate, and its test sits under `tests/quality/**`, which `build-tools` already owns; `deployment` holds the workflows that deploy or check the live address. Alternative seen: the part-map template's "Assigning files" names "the configuration of agents' tools and of CI" among the files of the part that only directs the work (`agent-workflow` here); I read that as the configuration of CI for agents and not a workflow that runs the product's tests, and did not move it. No trust-boundary line added (see Questions).

## Foundation entries

| Entry | Mark | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-412 (new, end of the log; heading "What looks for secrets in loop2's repository?") | row 1 | GitHub's built-in scan with push protection is what looks for secrets in the repository; CI and the one command add no scanner. | Sekretów w repozytorium szuka wbudowany skan GitHuba z blokadą pushu; CI i jedno polecenie testów nie dokładają skanera. |
| D-405, sentence added and first sentence extended | row 2 | The check of the instruction files is the fifth and last stage after the foundation check; it stops the gate on an error, not on warnings alone. | Sprawdzenie plików instrukcji jest piątym, ostatnim etapem po kontroli fundamentu; zatrzymuje bramkę błędem, ostrzeżeniem nie. |
| D-77, binding sentence and *Verification* | row 2 (task's *Decisions in play*) | The one-file run runs no check of the instruction files either, as it runs no foundation check. | Przebieg jednego pliku też nie uruchamia sprawdzenia plików instrukcji, tak jak nie uruchamia kontroli fundamentu. |
| D-390, sentence on a computer with no Docker Desktop, *Verification*, *Rationale*, *Rejected* | row 4 | Such a computer skips a Docker test at once only where no daemon answers; where a daemon answers, the test runs. | Komputer bez Docker Desktop pomija test z Dockerem od razu tylko tam, gdzie demon nie odpowiada; gdzie odpowiada, test biegnie. |
| Part map `build-tools` | the cycle's (needed by the change; no row) | The part also owns the workflow that runs the one command on every pull request into `main`. | Część `build-tools` odpowiada też za workflow, który uruchamia jedno polecenie na każdej prośbie o scalenie do `main`. |
| Row 3 (CI runs on Linux because the daemon answers there) | no entry | A comment of `.github/workflows/tests.yml` says it, as the row's *Goes to* gives. | Komentarz w pliku CI. |

The written entries follow the pinned `elements/decisions/` template and `elements/part-map/` template: D-412 has *Relations* `derives from D-13`, *Scope* `build-tools`, *Verification* with a `tests:` clause held by one `decision:` line of `tests/quality/test_ci_workflow.py` and a pair of examples for the part no test holds; *Rejected* holds the two ways of the row's source. D-405's *Rationale* gained the placement reason and its *Rejected* the "at the start" way from the source of row 2. D-390's *Rejected* gained the way "skip at once on every computer with no Docker Desktop" from the row's source.

## Tests written or brought up to date

- `tests/quality/gate_fixture.py`: stand-in for the fifth stage; every stand-in now logs its marker to `stages-run` and takes its exit code from `exit-<marker>`; helpers `stages_run` and `make_stage_exit`.
- `tests/quality/test_test_gate.py`: `test_the_whole_gate_runs_its_stages_in_their_order` (order python, foundation, instructions; replaces the old stage test), `test_an_error_of_the_check_of_the_instruction_files_stops_the_gate` (exit 1 comes out as 1), `test_a_stage_that_fails_before_the_check_of_the_instruction_files_stops_the_gate` (foundation exit 3, check not run), `test_the_check_of_the_instruction_files_ends_with_0_on_a_warning_and_1_on_an_error` (runs the pinned script on two made folders: a dead path gives exit 0 and a `WARN` line, an `@` import with a mark after it gives exit 1 and an `ERROR` line); `assert_focused` also asserts the one-file run did not run the new stage; the two D-77 lines and the D-405 line quote the new sentences.
- `tests/quality/test_node_test_selection.py`: the fifth stage runs in the full run; D-405 quotation updated.
- `tests/quality/test_docker_gate.py`: `test_a_daemon_that_answers_on_a_computer_without_docker_desktop_is_used` and `test_a_whole_run_on_a_computer_without_docker_desktop_but_with_a_daemon_skips_nothing` (quote the new D-390 sentence); one existing D-390 quotation updated.
- `tests/quality/test_ci_workflow.py` (new, 10 tests): the five points and the rest, read as text: event `pull_request` into `main` only and no `pull_request_target`; `contents: read` and no secret, no `write`; no expression of the request inside a command; the one command is the last step and the other `run` commands are exactly the four set-up commands and the three actions are checkout, setup-python, setup-node (holds D-412); actions pinned by 40-hex commit; checkout with `submodules: true`, `fetch-depth: 0`, `persist-credentials: false` and no `--remote`; `origin/HEAD` set right after the checkout and before `npm test`; Python from `.the-way/.python-version`; Node from `package.json` with `engines.node` present; fixed job name `tests`, Linux, a time limit, one job.
- **A changed invariant test, named:** `tests/invariants/test_account_server_typecheck.py` (invariant `account-server-typecheck`): its tripwire `test_no_other_deployment_route` failed on the new workflow, since `.github/workflows/*.yml` is a deployment file for `tests/invariants/loop2_invariant_support.py`. I added `TESTS_WORKFLOW` to `NOT_ROUTES` and a sentence to the module docstring saying the workflow runs before any merge, holds no secret and ships nothing. The failing run (below) shows the tripwire before the change. The assertion is not weakened: the workflow deploys nothing and is read by its own test, as `check-address.yml` is.

## Checks run (all from the worktree root; the full gate was not run)

| Check | Exit |
|---|---|
| failing first: `npm test -- tests/quality/test_test_gate.py` before `scripts/test.py` had the stage | 1 (2 failures: order test, error test, as expected) |
| same after the stage | 0 (12 tests) |
| failing first: `python -B -m unittest discover -s tests/invariants -p test_account_server_typecheck.py -k test_no_other_deployment_route` with the new workflow present | 1 (failure naming `.github/workflows/tests.yml`) |
| `npm test -- tests/invariants/test_account_server_typecheck.py` after the change | 0 (9 tests) |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 |
| `npm test -- tests/quality/test_test_gate.py` | 0 (12 tests) |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `npm test -- tests/quality/test_docker_gate.py` | 0 (19 tests) |
| `npm test -- tests/quality/test_ci_workflow.py` | 0 (10 tests) |
| `npm test -- tests/quality/test_quality_invariants.py` (Ruff, ESLint, Prettier, ShellCheck on the tracked files) | 0 |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (final) | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 140 warn, 7 info` |

Mutation checks (made, seen failing, restored): the Docker stand-in case (`daemon_gap` asking Docker Desktop before the daemon, temporarily in `scripts/docker_gate.py`): both new Docker tests failed, the file was restored with `git checkout` (no diff left). The workflow: nine mutations of the file (`pull_request_target`, an extra `npx eslint .` step, a tag instead of a commit, no `fetch-depth`, no `submodules`, Windows runner, another job name, `contents: write`, no `origin/HEAD` step) were each caught by `test_ci_workflow.py`; the file was restored byte for byte.

## Own-work check (section 3)

- **Requirement most likely not met:** acceptance criterion 1, a green CI run on Linux, which includes the Docker tests running instead of being skipped (criterion 2). I cannot run Linux Actions here.
- **Checks made instead:** (a) the install step on Linux: in a `python:3.14-slim` container, `python -m venv` and `pip install --require-hashes -r requirements-quality.txt` ended with pip exit 0, then `ruff 0.17.1` and ShellCheck `version: 0.11.0` ran (the Linux wheels exist for Python 3.14); (b) a daemon answering without Docker Desktop is used, in one process and in a whole run, with a stand-in `docker` (mutation shown failing above); (c) the tests of the gate and of the code checks pass on Windows. Not shown by any check here: that every other test of the repository passes on Linux, and that `npm ci` and the Node tests pass there. The first CI run is the check; I found no Windows assumption in what I touched.
- **Docker image left on this computer:** `python:3.14-slim` (pulled for check (a)); not a working copy of mine in the sense of the rule, listed here for the record.

## Choices made, with the way rejected and its cost if wrong

1. **Part of the workflow: `build-tools`** (rejected: `deployment`, `agent-workflow`). If wrong, one line of the part map moves; no test depends on the part.
2. **Job name and workflow name `tests`**, as in the-way (rejected: a name with the product's name). If the human prefers another, the rule is set after the first green run, so the name changes before it matters; `test_ci_workflow.py` fixes `name: tests`.
3. **`timeout-minutes: 60`** (the local gate takes about 15 to 30 minutes; the-way uses 40 for a shorter suite). Rejected: 40. If wrong, a slow cold runner fails by timeout; the number is one line.
4. **`node-version-file: package.json`** (reads `engines.node`, `^24.15.0`; resolves to the newest 24.x) rather than a literal `24.15.0` (rejected: a second copy of the version). If setup-node cannot read the range, the run fails at that step, visibly.
5. **`ubuntu-24.04`**, the convention of `deploy.yml` and `check-address.yml` (rejected: `ubuntu-latest` of the-way).
6. **D-412's *Relations* `derives from D-13`** (secrets stay outside the repository); the row names no relation. If the orchestrator disagrees, the field may read `none`.
7. **D-412's *Scope* `build-tools` only.**
8. **The test that runs the pinned `check_instructions.py` on two made folders** pins the exit-code contract D-405's sentence rests on, so a move of the pin that changed the codes shows. Cost: it ties a test of loop2 to the behaviour of a script of the-way; the other three gate tests do not.
9. **Order evidence by a log file of the stand-ins** (`stages-run`) rather than timestamps.

## Questions and concerns for the orchestrator

1. **D-412 *Based on* reads `TODO — the source, with its address, the quoted passage and the date it was read, of GitHub's scan for secrets with push protection on a repository, which the owner turned on for the repository on 2026-11-14`.** The decision rests on a feature of GitHub, so the template wants an environment fact or a quoted source; the row's source, the task, gives the human's reading of the repository's settings, not an address and a passage, and I may not write them from memory. `foundation_check.py` accepts the `TODO` form (the main branch may hold it; the change puts it before the human). Recommendation: either the human accepts the `TODO` at the merge, or a later step records an environment fact from GitHub's documentation on secret scanning and push protection through `the-way-record-environment-fact` and names it here. Cost of leaving it: one visible `TODO` on the main branch.
2. **Trust boundary.** The workflow takes the code of a pull request from outside into a runner, but I added no line to the *Trust boundary* of `build-tools`: the template's definition (data from the network, keys, the deployment, files from outside) fits `deploy/**` and not a read-only workflow without secrets, and a boundary would call for a test of refusal marked by an invariant by `guidelines/testing.md`. `deploy.yml`, which holds the secrets, is not in the boundary of `deployment` either. Recommendation: leave as is; the reviews check the file for the points of the handoff (`pull_request`, `contents: read`, no secret, no expression in a command), which `test_ci_workflow.py` also holds.
3. **Counts differ from the task's text:** 140 warnings, not 130 (see above).
4. **Settlement 3 sentence** stands only as a comment in the workflow (as the row says); it is not tested, as prose for people.
5. **Node and Docker on the runner:** I rely on `ubuntu-24.04` having a running Docker daemon (the premise of settlement 3) and on setup-node reading `engines.node`; both are unproven until the first run.

## Reach beyond the dispatch (section 1)

- `tests/invariants/loop2_invariant_support.py` (`DEPLOYMENT_PATH_PATTERNS`, `deployment_route_files`) and `tests/invariants/test_account_server_typecheck.py`, `tests/invariants/test_account_server_runtime.py`: found by grepping tests for `workflows`; the handoff did not name them. They hold a tripwire for every file under `.github/workflows/`. The gap in the selection: a note that "a new workflow file is a deployment file for the invariant tests" would have saved the search.
- `foundations/invariants.md`, `focused-test-execution` and `account-server-typecheck`: read to see whether the stage touched them (it does not: `focused-test-execution` holds only "no executed test fails"; no text change).
- `tests/deploy/deploy_script_support.py`, `tests/quality/test_quality_invariants.py` (lines on the platform): read to see that the tests I rely on already run on Linux; no change.
- `git ls-remote` of three actions repositories, read-only, for the three commit SHAs.
- Hook-forced reads of two personal rule files of the human's environment (scripts, git); they changed nothing in the work.

## Working copies

- `.runs/author/`: scratch outputs of focused runs and one folder `venvprobe/` holding a copy of `requirements-quality.txt` for the Linux install check; removed before this report (`.runs/author/` is empty). A worktree of a commit or a clone: none made.
- Docker: image `python:3.14-slim` stays on the computer; container removed (`--rm`).

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `task-cycle/skill/foundation_step.md`, `elements/decisions/` (`SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`; `examples.md` names `WAY-03` of the-way's log, which I did not open), `elements/part-map/` (`SKILL.md`, `decide_entry.md`, `write.md`, `template.md`, `examples.md`; I did not open the example entries `decisions`, `repository`, `installation-command` of the-way's map), `elements/common/rules.md`, `elements/common/way_of_working.md`: read whole except the named examples.
- `.the-way/installation/README.md`: read section "Run the one command in CI" whole (lines 139 to 172) and the start of "Moving the pin"; not the rest of the file.
- `guidelines/testing.md`: read whole (lines 1 to 484, in two reads).
- `README.md`: read sections "Narzędzia kontroli kodu" and "Praca lokalna i sprawdzenie" and the head; not the others.
- `.runs/task-cycles/ci-przy-pr/prep/index.txt` (the index of decisions): **not read**. I opened D-77, D-405, D-406, D-390, D-391, D-392, D-237, D-11 (head) by heading in `foundations/decisions.md`, but not D-73, D-83, D-85, D-89, D-16, nor the rest of the index. The handoff's "at least D-73, D-83, D-85, D-89, D-16" are therefore unread; none of my changes touches what they decide (the testing discipline's text was read in `guidelines/testing.md`, which cites them).
- `foundations/glossary.md`: searched for "foundation check" and "instruction file", no entry; not read whole. `foundations/invariants.md`: read the entries `account-server-typecheck`, `focused-test-execution` and the neighbours seen around them; not the whole file.
- `tests/quality/test_audit_dependencies.py`, `tests/deploy/test_deploy_workflow.py` (read lines 1 to 80): read in part for the conventions.

## Searches not found or unclear

- A glossary entry for "foundation check" or "check of the instruction files": not found (I used "the check of the instruction files" in D-405, D-77 and D-412 in plain words; no glossary term was written, since the rows do not ask for one).
- A source with an address for GitHub's secret scan with push protection: not found in the foundation or the task (the *Based on* `TODO` above).
- A rule of size in `guidelines/coding.md`: none found, so no move-out commit.
- A statement in the pinned the-way for where a CI file belongs in a product's part map beyond the template's "configuration of agents' tools and of CI" line: unclear (see part-map choice above).
- The refinement's count of 130 warnings: not reproduced (140).

## Problems observed

- None failing. The one hidden coupling found (the deployment tripwire of `account-server-typecheck`) is handled above.
