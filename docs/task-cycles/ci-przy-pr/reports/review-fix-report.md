PASS 9912f0db9557eda7972271d1901f00301f15f517

# Review of the fix of the Minor findings — task `ci-przy-pr`

- Variant: review of a fix (`.the-way/task-cycle/review/SKILL.md`, `.the-way/task-cycle/review/fix.md`).
- Range: `51596257..9912f0db`; `git rev-parse HEAD` = `9912f0db9557eda7972271d1901f00301f15f517`, the head given. Five commits (`419b7d1e`, `42bf3768`, `02e112f5`, `fd89c408`, `9912f0db`), all with the private address; 4 files changed (`foundations/decisions.md`, `foundations/part_map.md`, `guidelines/testing.md`, `tests/quality/test_ci_workflow.py`).
- Read: `reports/fix-whole-findings.md`, `reports/fix-whole-report.md`, `reports/fix-whole-handoff.md` ("What to fix"), the whole diff of the range.
- Result: m1-m5 all **fixed**. No new Critical or Important finding. New Minor findings: 2 (n1, n2), for the request.

## Findings of the findings file

**m1 — fixed.** `tests/quality/test_ci_workflow.py:101-104`, `test_no_step_and_not_the_job_lets_the_run_pass_when_it_fails`, asserts that `continue-on-error` stands on no code line of the workflow (`code()` drops comments). Evidence: in a copy under `.runs/review-whole/mut/`, `continue-on-error: true` on the `npm test` step gave `FAILED (failures=1)`, exit 1; on the job, `FAILED (failures=1)`, exit 1; the unmutated copy, `OK`. The real run: `npm.cmd test -- tests/quality/test_ci_workflow.py`, 11 tests, exit 0.

**m2 — fixed.** New D-413 "How does CI check a pull request into `main`?" (`foundations/decisions.md`, after D-412). Checked sentence by sentence against the test:
- "On every pull request into `main`, … on a Linux machine, in a job named `tests`, a name that stays as it is, and no other checking command stands beside it": held by `test_it_runs_on_a_pull_request_into_main_and_on_nothing_else` (event and branch), `test_the_job_has_the_fixed_name_on_a_linux_machine_and_a_limit_of_time` (name, Linux) and `test_the_one_command_of_tests_is_the_last_step_and_no_checking_command_stands_beside_it` (only set-up commands and three actions beside `npm test`). "Beside it" in a second workflow file is not held by a test; the decision's `violates:` example names exactly that, as the template allows.
- "The workflow starts on the event `pull_request`, never on `pull_request_target`, and its token only reads and it holds no secret": the event test and `test_the_token_reads_and_the_job_holds_no_secret`.
- "No text of the request stands in a command, and no step or job lets a failing run pass": `test_the_text_of_the_request_reaches_no_command` and the m1 test.
- "The actions stand at the commits of their releases": `test_the_actions_stand_at_the_commits_of_their_releases`.
- The second paragraph (gitlink and no move to a branch; whole history; `origin/HEAD` before the one command; Python file; Node from `engines`; a time limit): the checkout test, the `origin/HEAD` test, the Python test, the Node test, the name/Linux/limit test. "The steps before the one command only set the machine up": the fixed list `SET_UP_COMMANDS` in the one-command test.
- Every `decision:` line quotes a sentence start of D-413 (`foundation_check.py` compares the quotations: 0 errors). Each line stands at the test that holds the part it quotes; the long quotations that run through the second paragraph to the property a test holds are valid quotations, and the test beside each holds the last item of its quotation.
- *Verification* `tests:` names what the tests hold, in words; the pair covers the part no test holds. The docstring now names D-413 and D-412 and no document outside the foundation; the "Breaking it" comments name the edit only and no longer sum up the requirement.

**m3 — fixed.** `foundations/part_map.md:137`: `.github/workflows/tests.yml` is in *Files* of `agent-workflow`, out of `build-tools`; the sentence moved with it (`:125`), and `build-tools`'s sentence reads as before the change. Search of the repository for `tests.yml` (outside `.the-way` and the decision log): `README.md:88`, `guidelines/testing.md:181,433`, `tests/invariants/test_account_server_typecheck.py:37,83`, `tests/quality/test_ci_workflow.py:2,14` — none names the part of the workflow. D-412's *Scope* became `agent-workflow, build-tools`: right, since its sentence binds the CI (now `agent-workflow`) and the one command (`build-tools`). `foundation_check.py`: 0 errors.

**m4 — fixed.** `foundations/part_map.md:139`: *Trust boundary* of `agent-workflow` is `.github/workflows/tests.yml`; the pattern matches a tracked file, so `foundation_check.py` accepts it (0 errors). `guidelines/testing.md:181` gives the boundary its row, as the configuration of another's service checked by the review of each change of the file, with no invariant — what `guidelines/testing.md:166-167` gives — and names what the review looks for; D-413 joins the rule's *Decision* list (`:155`). The row does not claim the test as proof of refusal, which is right.

**m5 — fixed.** `foundations/decisions.md`, D-412 *Rationale*: "refuses a push that holds a secret of a kind it recognizes". The rest of the sentence ("GitHub scans the whole history of the repository and every push") stays a claim with no source in the repository, as before; it comes from the task's own text and the return step records the source, as the handoff gives. Not raised again.

## New findings in the fix

### Critical

none

### Important

none

### Minor

**n1 — D-413 *Based on* reads `none` (`foundations/decisions.md`, the field of D-413), though the decision rests on facts about GitHub.** Its *Rationale* rests the choice of Linux on "a Docker daemon answers there", and its *Rejected* says "GitHub does not run Linux containers on a Windows machine"; both are behaviour of GitHub's runners, a source outside the product. `.the-way/elements/common/rules.md:19-21`: "`none` states that nothing is there … where a source is silent, the field reads `TODO`". A reader takes `none` as "this decision rests on nothing outside loop2". Consequence: when the return step records GitHub's documentation for D-412, nothing leads it to D-413 too. Fix, for the return step: `TODO — <GitHub's description of its Linux and Windows runners and the Docker they run, with its source>`, or the environment fact once recorded.

**n2 — D-413's *Rationale* now also carries the reason for Linux, which row 3 of *Settlements to record* put in a comment of the CI file.** Not a contradiction: row 3 placed the reason against the way "no record at all", not against a decision, and the comment in `.github/workflows/tests.yml:7-9` stays. But the request should say that the reason now stands in two places, and that D-413 is an entry of the cycle's own (`the cycle's`, no row), so that the human accepts it knowingly at the merge.

## Declined to judge

- D-412's *Based on* `TODO` — the return step's task, by the handoff.
- `persist-credentials: false` asserted by the checkout test while no sentence of D-413 names it; I read it as part of "holds no secret" and the *Verification* names "no stored credential". Not raised.

## Checks run

| Check | Exit and result |
|---|---|
| `git rev-parse HEAD`; `git log` / `git diff 51596257..9912f0db` | head = `9912f0db`; 5 commits, 4 files |
| `python -B .the-way/elements/common/foundation_check.py` | 0; `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0; `0 error, 140 warn, 7 info` |
| `npm.cmd test -- tests/quality/test_ci_workflow.py` | 0; 11 tests OK |
| Mutation in `.runs/review-whole/mut/` (copies of `test_ci_workflow.py`, `gate_fixture.py`, `package.json`, `.the-way/.python-version`, a mutated `tests.yml`), `python -B -m unittest test_ci_workflow` | step-level `continue-on-error`: 1, `FAILED (failures=1)`; job-level: 1, `FAILED (failures=1)`; unmutated: 0, `OK` |
| `git grep -n "tests\.yml"` outside `.the-way` and the log | no file names the part of the workflow |
| `git status --short` after the checks | empty |

Not run: the full gate (the orchestrator's); the other focused files the fix report lists (`test_test_gate`, `test_docker_gate`, `test_node_test_selection`, `test_account_server_typecheck`, `test_cross_part_imports`, `test_application_package_layout`, `test_source_tool_scope`, `test_quality_invariants`), since the fix touches none of their code and the author reports each with exit 0; the full gate covers them.

## Reach beyond the dispatch

- `.the-way/elements/common/rules.md:19-21` (`none` and `TODO`), for n1; already read in the review of the whole change.

## Working copies

- `.runs/review-whole/` in the task's worktree (`.runs\review-whole\`), holding `mut/` with the copies above: removed before this report. No worktree or clone made; nothing kept in `reports/`.

## Unread material

none — the findings file, the fix report, the fix handoff's "What to fix" and the whole diff of the range were read whole; D-413 and the changed parts of D-412, the part map and `guidelines/testing.md` were read in the diff whole.

## Searches not found or unclear

- A test, a document or an invariant that names `build-tools` as the part of the workflow after the move: not found.
- A source in the repository for the GitHub facts D-413's *Rationale* and *Rejected* rest on: not found (n1).
