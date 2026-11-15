PASS 5159625748f3754ec90cefaa02b00838e69e4417

# Review of the whole change — task `ci-przy-pr`

- Variant: the review of the whole change (`.the-way/task-cycle/review/SKILL.md`, `.the-way/task-cycle/review/whole_change.md`), one-author route, no spec, no plan.
- Range: `bdf0dbd7..51596257`; `git rev-parse HEAD` = `5159625748f3754ec90cefaa02b00838e69e4417`, the head given. Commits: `e5ad01fb` (pin move, orchestrator), `5d6c57e5`, `5d70d505`, `51596257` (author). All four carry the private address.
- Blocking findings: none. Minor: 5, all within the task. Out of scope: 0 (Declined to judge below).

## The pin move, `e5ad01fb`

Holds the gitlink `ec7929d → bfb2e109735b5fff98802b8be0ff3c43c799262a`, the block of `AGENTS.md` between its markers (one paragraph, ends at `<!-- the-way:end -->`), and the description line of the two `the-way-update-part-map` entry points (`.claude/skills/`, `.agents/skills/`). Nothing else. `bfb2e10` contains `209d5a0` (`git merge-base --is-ancestor` ok) and stands on `origin/foundations`. The installer's preview at the head (`python -B .the-way/installation/install.py .`, no `--apply`) lists every installer-owned file as `KEEP` and nothing to write, so the move is complete and nothing of the installer is left out or changed by hand. No `.claude/agents/` file changed, and the installer wants none changed.

## Coverage of the task

| Item | Met by | Judgment |
|---|---|---|
| To do 1, pin | `e5ad01fb` | met (above) |
| To do 2, fifth stage last, error stops and warning not; README paragraph | `scripts/test.py:56-58`, `README.md:82`, tests in `tests/quality/test_test_gate.py` | met; the one-file run does not run it (`assert_focused`, `test_test_gate.py:35-38`) |
| To do 3, workflow, five points, fixed job name, Linux | `.github/workflows/tests.yml` | met: `pull_request` into `main` only; `npm test` the one checking command (set-up steps only before it); `submodules: true`; `python-version-file: .the-way/.python-version`; `fetch-depth: 0` then `git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main` before `npm test`; job `tests`; `ubuntu-24.04` |
| To do 4, Linux failures of the environment | — | not reachable before the first CI run; observations below |
| Acceptance 1 and 2 (green CI run; Docker tests run, not skipped) | — | for the orchestrator's CI run; see observation O3 |
| Settlement row 1 → decision | D-412, `foundations/decisions.md:10925` | met; *Rejected* holds exactly the two ways the row's source keeps |
| Row 2 → sentence of D-405 | `foundations/decisions.md:10820` | met; *Rationale* and *Rejected* follow the source of the answer "3 a" |
| Row 3 → comment in the CI file | `.github/workflows/tests.yml:7-9` | met, faithful to the row |
| Row 4 → sentence of D-390 | `foundations/decisions.md:10552` | met, faithful; the code (`scripts/docker_gate.py`, `daemon_gap`) already asks the daemon before Docker Desktop, and two new tests hold the case |
| *Decisions in play* D-77 | `foundations/decisions.md:1703,1708` | met; the binding sentence gained "or the check of the instruction files" besides *Verification*: that is the meaning the task's *Decisions in play* states ("a przebieg jednego pliku go nie uruchamia"), not a new one |
| D-11 unchanged | — | `deploy.yml` untouched; the new workflow runs before the merge |
| Out of scope respected | — | no `security-notes.md`, no ruleset, no scanner, local gate kept |

## The workflow checked as a boundary

- Event `pull_request` (`tests.yml:16-18`), never `pull_request_target`: yes; held by `test_ci_workflow.py:56-66`.
- No secret: none named; `persist-credentials: false` removes the checkout's token after the checkout. Held by `test_ci_workflow.py:68-75`.
- At most read permission: `permissions: contents: read` at the top only, so every other scope is none. Held.
- No text of the request in a command: the one expression is `group: tests-${{ github.ref }}` (concurrency, no shell). Held by `test_ci_workflow.py:77-84`.
- Actions pinned: `actions/checkout@3d3c42e5…` = `v7.0.1`, `actions/setup-python@6d4fd22b…` = `v7.1.0`, `actions/setup-node@949feb24…` = `v7.1.0`, each verified by `git ls-remote --tags` on the public repositories.
- Submodule at the gitlink's commit: `submodules: true`, no `--remote`, no `git submodule` command. `.gitmodules` names `https://github.com/mariusznazar/the-way.git`; both repositories read as public (`gh repo view … --json visibility`), and an anonymous `git ls-remote` of the-way works, so the submodule needs no credential.
- No cache step, so no cache a fork could poison. No irreversible operation.

## The changed invariant test

`tests/invariants/test_account_server_typecheck.py:83-85` adds `.github/workflows/tests.yml` to `NOT_ROUTES` of `test_no_other_deployment_route` (invariant `account-server-typecheck`). The assertion is not weakened: as for `check-address.yml`, the exclusion is backed by a test of its own that the file ships nothing — `test_ci_workflow.py:86-97` fixes the `run` commands to exactly the four set-up commands and `npm test`, and the actions to exactly checkout, setup-python and setup-node, and `:68-75` forbids secrets and `write`. A later step that deploys would fail that test before it could pass the tripwire. The tripwire still catches any other new file under `.github/workflows/`. The docstring (`:36-38`) says so.

## D-412's *Based on* `TODO`

The form is allowed: `.the-way/elements/decisions/template.md:64-66` and `.the-way/elements/common/rules.md:22-28` let the main branch hold `TODO — <what is missing, with its source>` in *Based on*, and a change that leaves one there puts it before the human. The author was right not to write GitHub's address and passage from memory. Leaving it is acceptable; recording it now is better, because the decision's *Rationale* (`foundations/decisions.md:10937`) states what GitHub does — scans the whole history and every push, refuses a push with a secret — and those claims rest on exactly the missing source (see m5). What the request should tell the human, in plain words: "D-412 says GitHub's built-in secret scan is the repository's only scanner; its source field reads TODO because nobody has yet quoted GitHub's documentation of that scan with an address and a date. (a) Merge with the TODO, and record the source later; (b) let the cycle read GitHub's page on secret scanning and push protection now and record it as an environment fact (`the-way-record-environment-fact`) named in D-412 before the merge." My recommendation is (b): one page read, and it also settles the wording of m5. Cost of (a): one visible TODO on `main`, and a *Rationale* that claims more than any source in the repository shows.

## Findings

### Critical

none

### Important

none

### Minor (all within the task)

**m1 — `tests/quality/test_ci_workflow.py:86-97` (and `.github/workflows/tests.yml:56`): the test does not fail when the workflow can no longer turn red.** The workflow exists so that "a red result shows before the merge" (`tests.yml:3-4`), and the fixed job name exists because a required check is set on it. `continue-on-error: true` on the `npm test` step, or on the job, makes the run report success whatever `npm test` ends with, and every test of the file still passes. Evidence: in a copy of the four files the test reads under `.runs/review-whole/mut/`, the step-level mutation and the job-level mutation each gave `Ran 10 tests … OK`; the control mutation `pull_request_target` gave `FAILED (failures=1)`. Why it matters: it is the one property the required check stands on, and it is a one-line edit that looks harmless. Fix: assert that no line of the file holds `continue-on-error` (the steps parser already records the key).

**m2 — `tests/quality/test_ci_workflow.py:1-2`, and the tests at `:56-149` that carry no line `decision:`: the requirements the test holds stand in no entry of loop2's foundation, and its docstring names a source outside it.** D-82 (`foundations/decisions.md:1763`): "What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation"; `guidelines/testing.md:96-103` says the same. The docstring names "the five points of the process the repository pins" (the-way's `installation/README.md`) as the source, and the "Breaking it" comments sum up the requirements, the way D-82's *Rejected* names ("a comment that sums up the requirement itself and names no source — nobody checks that the summary is faithful"). What the foundation does hold: the part map's sentence of `build-tools` (`foundations/part_map.md:89`: one command of tests on every pull request into `main`, GitHub Actions, Linux) and D-412 (no scanner). What it does not: `pull_request` and never `pull_request_target`, a read-only token and no secret, no request text in a command, actions at commits, `.the-way` at the gitlink, `origin/HEAD`, the fixed job name. Graded Minor because the main behaviour is in the part map, the source named is the pinned process the repository's own `AGENTS.md` block binds the CI file to (not a task document that dies with its task), and `tests/deploy/test_check_address_workflow.py` already holds its no-secret and no-permission tests the same way. Consequence of leaving it: a later change of the workflow finds no entry that says which of these properties is a requirement and why (the fixed job name especially, which a rename would silently detach from the ruleset). Fix: one decision marked `the cycle's` (`.the-way/task-cycle/skill/foundation_step.md:28-31`), such as "How does CI check a pull request into `main`?", whose sentences carry these properties and the fixed name, cited by `decision:` lines; or the human accepts the gap at the merge.

**m3 — `foundations/part_map.md:107`: the workflow is assigned to `build-tools`, while the template assigns CI configuration to the part that only directs the work.** `.the-way/elements/part-map/template.md:77-79`: "The files that only direct whoever carries out the repository's tasks — instructions for agents, skills, hooks and the configuration of agents' tools and of CI — are another part of their own"; the-way's own map puts its `.github/workflows/**` in that part (`.the-way/foundations/part_map.md:155-169`, `agent-instructions`). In loop2 that part is `agent-workflow`. The author read "of CI" as "CI for agents" (report, item 6); the plain reading is "the configuration of CI". The assignment to `build-tools` is defensible on responsibility (it runs the gate), and the request puts this `the cycle's` entry before the human anyway. Consequence: which decisions and guidelines a later change of the file selects; no test depends on it. Fix: move the line to `agent-workflow` (and the sentence), or keep it and say in the request why the template's rule is departed from.

**m4 — `foundations/part_map.md:119-122`: no *Trust boundary* line for the workflow, on a reason that misreads the testing guidelines.** The author's reason (report, question 2) is that a boundary "would call for a test of refusal marked by an invariant". `guidelines/testing.md:166-167` says otherwise for this case: "Granicę będącą wyłącznie konfiguracją cudzej usługi sprawdza przegląd każdej dotyczącej jej zmiany." The workflow is where code of a request from outside runs on GitHub's runner, and only its configuration (event, permissions, no secret) keeps such a request from a secret. Consequence of leaving it out: the cycle's question at start ("does the change touch a trust boundary?") is answered from the part map, so a later task that edits `tests.yml` — adding a cache, a token or `pull_request_target` to post a comment — is not flagged for a boundary review by the map, only by `test_ci_workflow.py`. Precedent cuts the other way too: `deploy.yml`, which holds secrets, is not a boundary of `deployment` either. Fix: add `.github/workflows/tests.yml` to the *Trust boundary* of the part that owns it, with review as its check, or leave it and name the choice in the request.

**m5 — `foundations/decisions.md:10937`: D-412's *Rationale* says GitHub "refuses a push that holds a secret".** Push protection refuses a push holding a secret of a kind the scan recognizes, not any secret; a reader takes the sentence as full coverage. The claim also rests on the missing source of *Based on*. Fix: "refuses a push that holds a secret of a kind it recognizes", with the source recorded as recommended above.

### Findings of slice reviews

none — no slices.

## Structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py bdf0dbd7 51596257` (exit 0): the largest growth is the new `tests/quality/test_ci_workflow.py` (153 lines) and `tests/quality/test_test_gate.py` 158 → 196; `scripts/test.py` 80 → 83. `guidelines/coding.md` holds no rule `### Size of a function and a file`, so there is no size test to run on base and head; nothing in the diff left code without a user or a name untrue. No finding.

## Observations for the first CI run on Linux (not findings)

- **O1 — certain skips by design.** `tests/quality/test_invariant_support.py:212` and `tests/quality/test_process_observation.py:31,57` are `skipUnless(os.name == "nt")`: they show as skipped in the CI log. They test Windows-only helpers, not the game; no fix needed. Sure: high.
- **O2 — `lsof` on the runner.** `tests/invariants/test_loop2_one_serving_process.py:124-131` reads listening sockets with `lsof -nP -iTCP -sTCP:LISTEN` on Linux and fails (not skips) when `lsof` is missing or exits other than 0. I expect `ubuntu-24.04` to have `lsof` and the test's server to give it at least one listener of the runner's own user, so it should pass; if it fails, it is the environment (To do 4). Sure it passes: medium.
- **O3 — acceptance criterion 2 is read from the log, nothing enforces it.** If the runner's Docker daemon did not answer, `scripts/docker_gate.py` (`daemon_gap`) would skip every container test at once with the message "no Docker daemon answers, and this computer has no Docker Desktop to start", and the run would still be green. Read the CI log for skipped lines naming Docker before calling criterion 2 met.
- **O4 — `origin/HEAD` and the dependency audit.** `scripts/audit_dependencies.py:42` takes `git merge-base HEAD origin/HEAD`; the workflow's `symbolic-ref` step sets it before `npm test`, so the audit works on the merge commit of the request. Sure: high.
- **O5 — the rest of the Python helpers already branch for Linux** (`deploy_script_support.py:112-117` uses `bash` from `PATH`; `docker_gate.py:45-63` uses `fcntl`; `docker_standin.py:99-106` writes a `#!/bin/sh` launcher with mode 0755; container tests use named volumes, not bind mounts, so no uid mismatch of a host folder). I found no other place that would fail on Linux and is no error of the game. Not run: everything except the files listed under Checks.

## Declined to judge

- The ruleset with the required check — a human action after the first green run, rejected on purpose by the task as part of this change.
- Whether GitHub's secret scan really covers what D-412's *Rationale* says beyond m5 — no source in the repository to check it against (the `TODO`).
- The count of 140 warnings against the task's 130 — a fact of the refinement, no requirement; 0 errors either way.
- A clash of the number D-412 with another open loop2 branch that also adds decisions — outside this change; the merge shows it.

## Checks run

| Check | Exit and result |
|---|---|
| `git rev-parse HEAD`; `git log`/`git diff bdf0dbd7..51596257` | head = `51596257`; 4 commits, 16 files |
| `git -C .the-way merge-base --is-ancestor 209d5a0 bfb2e10`; `git branch -r --contains bfb2e10` | 0; on `origin/foundations` |
| `python -B .the-way/installation/install.py .` (preview, no `--apply`) | 0; every file `KEEP`, nothing to write; worktree unchanged |
| `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/index.txt --part build-tools --part deployment --part agent-workflow --part product-foundation --decision D-77 --decision D-405 --decision D-390 --decision D-11 --decision D-412 --decision D-13 .` | 0; 100 decisions listed in full |
| `python -B .the-way/task-cycle/change_file_sizes.py bdf0dbd7 51596257` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0; `0 errors` (`origin/HEAD` → `origin/main` in the worktree) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0; `0 error, 140 warn, 7 info` |
| `npm.cmd test -- tests/quality/test_ci_workflow.py` | 0; 10 tests OK |
| `npm.cmd test -- tests/quality/test_test_gate.py` | 0; 12 tests OK |
| `npm.cmd test -- tests/quality/test_node_test_selection.py` | 0; 1 test OK |
| `npm.cmd test -- tests/quality/test_docker_gate.py` | 0; 19 tests OK, none skipped |
| `npm.cmd test -- tests/invariants/test_account_server_typecheck.py` | 0; 9 tests OK |
| Mutation of `tests.yml` in a copy, `python -B -m unittest test_ci_workflow` run in `.runs/review-whole/mut/tests/quality` | `continue-on-error: true` on the step: 0, OK (m1); on the job: 0, OK (m1); control `pull_request_target`: 1, `FAILED (failures=1)` |
| `git ls-remote --tags` of `actions/checkout`, `actions/setup-python`, `actions/setup-node` | each SHA = its `v7.x` tag |
| `gh repo view mariusznazar/the-way` / `loop2 --json visibility`; anonymous `git ls-remote` of the-way | both `PUBLIC`; ls-remote ok |
| `git status --short` after all checks | empty |

Not run: the full gate (`npm test` with no argument) — the orchestrator's run, by the handoff; the workflow on GitHub — only the first CI run can show it; the Linux behaviour of every other test.

## Reach beyond the dispatch

- `.runs/task-cycles/ci-przy-pr/cycle.md` and `reports/author-handoff.md`: read to see what the author was told about the part of the workflow and the five points, for m2-m4.
- `.the-way/foundations/part_map.md:150-172`: the-way's own assignment of `.github/workflows/**`, for m3.
- `.the-way/elements/part-map/template.md:60-86`, `.the-way/elements/decisions/template.md` whole, `.the-way/elements/common/rules.md:15-30`, `.the-way/task-cycle/skill/foundation_step.md` whole: to judge the `TODO`, the cycle's entries and the assignment.
- `.the-way/installation/README.md:139-172` ("Run the one command in CI"): the five points.
- `tests/deploy/test_check_address_workflow.py` (headings and `decision:` lines), `tests/invariants/test_loop2_one_serving_process.py`, `tests/deploy/{deploy,backup,watch}_script_support.py`, `tests/quality/{test_quality_invariants,docker_standin}.py`, `tests/invariants/loop2_invariant_support.py`, `scripts/docker_gate.py`, `scripts/audit_dependencies.py`: the precedent for m2 and the Linux observations.
- Glossary entries: loop2 `deployment`, `test server`; the-way `gate`, `repository instruction file`.

## Working copies

- `.runs/review-whole/` in the task's worktree (`.runs\review-whole\`): the decision index, the outputs of the checks, and `mut/` (copies of `tests/quality/test_ci_workflow.py`, `tests/quality/gate_fixture.py`, `package.json`, `.the-way/.python-version` and a mutated `.github/workflows/tests.yml`). Removed whole before this report; no worktree or clone was made. Nothing kept in `reports/`.

## Unread material

24 of the 100 decisions of the index of my selection were read whole: D-11, D-12, D-13, D-14, D-15, D-16, D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-81, D-82, D-83, D-84, D-85, D-87, D-88, D-89, D-390, D-405, D-412 (and D-86, outside the index). The rest were read as index lines (question, binding sentences, *Scope*). Selection made by the parts the change's files belong to (`build-tools`, `agent-workflow`, `product-foundation`) and `deployment` (*Scope* of D-390); D-77's *Scope* also names `browser-view`, `simulation` and `account-server`, whose decisions I did not add, since the change to D-77 only names one more check the focused run leaves out. Decisions bearing on the change that stayed unread whole: D-356 and D-09 (the other workflows; index lines read), D-406, D-391, D-392 (the gate and Docker; index lines read), D-28 to D-33 (code checks; index lines read). Guideline files read whole: `guidelines/testing.md`, `guidelines/coding.md`; no `coding-<kind>.md` row matches the change. `foundations/invariants.md`: not read; I searched it for `CI`, `pull request` and `tests.yml` (no hit) and did not open `account-server-typecheck` beyond the test's docstring. `.the-way/installation/README.md`: only the section "Run the one command in CI".

## Searches not found or unclear

- An entry of loop2's foundation that states the trust-relevant properties of the CI workflow or its fixed job name: not found (m2).
- A source in the repository for GitHub's secret scan and push protection: not found (D-412 `TODO`).
- A rule `### Size of a function and a file` in `guidelines/coding.md`: none.
- Whether `ubuntu-24.04` ships `lsof`: not checked from here (O2).
