# Report of the fix of the Minor findings m1-m5 (task `ci-przy-pr`)

**Status:** `done with concerns` (the concern is the same `TODO` in D-412's *Based on*, which the handoff leaves to the return step).

Fix range: `51596257` (reviewed head) to `9912f0db`. No push, no full gate.

## Commits (all with `the private address`)

| Commit | Finding |
|---|---|
| `419b7d1e` | m1 |
| `42bf3768` | m3 |
| `02e112f5` | m2 (and the part of m3 that concerns D-412's *Scope*) |
| `fd89c408` | m4 |
| `9912f0db` | m5 |

## Each finding

**m1 - fixed.** `tests/quality/test_ci_workflow.py` has a new test, `test_no_step_and_not_the_job_lets_the_run_pass_when_it_fails`, asserting that `continue-on-error` stands on no line of the workflow. Seen failing first: with the test written and the workflow mutated, `python -B -m unittest discover -s tests/quality -p test_ci_workflow.py` (with `PYTHONPATH=tests/quality`) ended with exit 1, `FAILED (failures=1)`, for the step-level mutation (`continue-on-error: true` under `- run: npm test`) and for the job-level one (under `timeout-minutes`); the control with no mutation ended with exit 0. The workflow file was restored byte for byte. Passing: `npm test -- tests/quality/test_ci_workflow.py` exit 0.

**m3 - fixed.** `foundations/part_map.md`: the line `.github/workflows/tests.yml` moved from `build-tools` to `agent-workflow` (*Files*); the sentence I had added to `build-tools` is removed (it reads as before the change); the sentence of `agent-workflow` now reads "The part directs and records the work performed on this repository, and holds the workflow of GitHub Actions that runs the one command of tests on every pull request into `main`, on Linux." Selections the move changes, checked:
- the invariant tests that read the part map (`file_owners`): `npm test -- tests/invariants/test_cross_part_imports.py` exit 0, `tests/invariants/test_application_package_layout.py` exit 0, `tests/quality/test_source_tool_scope.py` exit 0; the workflow is YAML and no test counts it for a part;
- `foundation_check.py`: 0 errors;
- documents naming the part of the workflow: `guidelines/testing.md` names no part for it (its *Where in code* is a plain list); no other text did;
- the decisions selected by part: D-412's *Scope* was `build-tools` and is now `agent-workflow, build-tools`, so that a later change of the workflow selects it; the new D-413 has the same *Scope*. That edit of D-412's *Scope* is mine, beyond the finding's wording, as the handoff's "check every selection the move changes" asks.

**m2 - fixed, by the first way.** New decision `D-413 - How does CI check a pull request into main?` (the cycle's own entry, no row; written by the pinned `record-decision` method and `foundation_step.md`), at the end of the log before the withdrawn list. Meaning in English: a pull request into `main` is checked by one job named `tests` on Linux that runs the one command and no other checking command, on `pull_request` only, with a read-only token and no secret, no text of the request in a command, no step or job that lets a failing run pass, actions at commits, `.the-way` at the gitlink, `origin/HEAD` set before the one command, Python and Node from the files that declare them, and a time limit. Znaczenie po polsku: prośbę o scalenie do `main` sprawdza jedno zadanie `tests` na Linuksie, które uruchamia jedno polecenie testów i żadnego innego sprawdzającego, na zdarzeniu `pull_request`, z tokenem tylko do odczytu, bez sekretu, bez tekstu prośby w poleceniu, bez kroku przepuszczającego czerwony przebieg, z akcjami na commitach, z `.the-way` na commicie gitlinka, z `origin/HEAD` ustawionym przed poleceniem, z Pythonem i Node z plików, które je deklarują, i z limitem czasu.
- *Scope* `agent-workflow, build-tools`; *Relations* `derives from D-77`; *Based on* `none`; *Origin* `none`. Its *Verification* names, in the `tests:` clause, what each test holds, and a pair of examples for the part no test holds (a second workflow file or job that checks code beside the one command). Each sentence is held by a `decision:` line in `tests/quality/test_ci_workflow.py` (a quotation tested by `foundation_check.py`: I changed one word of a quotation and it reported "the quotation stands in no binding sentence of `D-413`", then restored it). No sentence is held by no check except "the steps before the one command only set the machine up", held by the list of set-up commands in the test.
- D-412 now `derives from D-13 · derives from D-413`: its sentence "CI adds no scanner" follows from D-413's "no other checking command stands beside it". My judgement, as the handoff leaves it.
- *Rejected* holds two ways with the reason the task or the pinned process gives (`pull_request_target`; a Windows machine or both systems), none derived by me. The *Rationale* states the reasons (the fixed name and the rule that names it, Linux and the daemon, the history and `origin/HEAD`, `continue-on-error`, the local gate kept) without naming a file or a script.
- The test file: the docstring now names D-413 and D-412 and no document outside the foundation ("the five points of the process the repository pins" is gone); every "Breaking it" comment names only the change to make and no longer sums up the requirement.
- Checks: `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors); `npm test -- tests/quality/test_ci_workflow.py` exit 0 (11 tests); nine mutations of the workflow (`pull_request_target`, an extra `npx eslint .` step, a tag instead of a commit, no `fetch-depth`, a Windows runner, another job name, `contents: write`, `continue-on-error` on the step, `continue-on-error` on the job) each made the file fail; the workflow was restored.

**m4 - fixed.** `foundations/part_map.md`: `agent-workflow` *Trust boundary* is `.github/workflows/tests.yml` (was `none`). What the list asks of the entry, checked: the template (`.the-way/elements/part-map/template.md`, "Trust boundary") wants git path patterns of files that take in what the product does not control, and says a change touching them is checked for crafted input; `foundation_check.py` reports a pattern that matches no tracked file (it matches this one; 0 errors) and reads no more of it; no loop2 test reads the field (`tests/invariants/test_cross_part_imports.py` builds its own fake maps). `guidelines/testing.md` "Trust boundaries": D-413 added to the *Decision* list and one row in the table of boundaries (before the `deploy/` row), saying that the boundary is the configuration of someone else's service and is checked by the review of each change of the file, what the reviewer looks for, and that `tests/quality/test_ci_workflow.py` holds the properties but does not replace the review; no invariant is claimed, as the guidelines (lines 166-167) allow. Checks: `foundation_check.py` exit 0.

**m5 - fixed.** D-412 *Rationale* now reads "refuses a push that holds a secret of a kind it recognizes". I made no other change to that text: the first words of the same sentence ("GitHub scans the whole history of the repository and every push") were already there and remain a claim about GitHub that rests on the same missing source; I did not touch it, as the handoff limits the edit. The source stays `TODO` in *Based on*, for the return step.

## Checks (commands and exit codes, from the worktree root)

| Command | Exit |
|---|---|
| `npm test -- tests/quality/test_ci_workflow.py` | 0 (11 tests) |
| `npm test -- tests/quality/test_test_gate.py` | 0 (12 tests) |
| `npm test -- tests/quality/test_docker_gate.py` | 0 (19 tests) |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 (1 test) |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 (9 tests) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 (10 tests) |
| `npm test -- tests/invariants/test_application_package_layout.py` | 0 (2 tests) |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 (4 tests) |
| `npm test -- tests/quality/test_quality_invariants.py` (Ruff, ESLint, Prettier, ShellCheck on tracked files) | 0 (5 tests) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 (0 error, 140 warn, 7 info) |

Not run: the full gate (the orchestrator's), a real CI run.

## Own-work check

Requirement most likely not met: that the new entries and the move leave every selection and every check as before. Check: the files that read the part map by owner (three tests above), `foundation_check.py` with its test of quotations (broken on purpose once, to see that it reports, then restored), and the nine mutations of the workflow against the rewritten test file. All passed or failed as expected; nothing failed and passed on a rerun, apart from the deliberate mutations.

## Reach beyond the dispatch

- `tests/invariants/test_cross_part_imports.py` (read: how it uses the part map and whether it reads *Trust boundary*), and `foundation_check.py` line 897 area (found by search for how the trust-boundary field is checked): to answer m4's "what `foundation_check.py` and the tests say of it".
- `.the-way/elements/decisions/template.md` and `.the-way/elements/part-map/template.md`, re-read for the *Rejected* rules and the trust-boundary definition; the handoff named the template files only by directory.
- The *Where it goes* order of the decisions template, for D-413 (a binding rule about a CI file passed the plan test and is not a single value, so it is an entry).

## Choices made, with the way rejected and its cost if wrong

1. D-413's *Scope* `agent-workflow, build-tools` (rejected: `agent-workflow` alone; the one command and the test sit in `build-tools`). If wrong, one line of the entry.
2. D-413 *Relations* `derives from D-77` only (rejected: also D-11, which the task names as unchanged; D-413 says nothing of deployment).
3. D-413's sentences are split in two paragraphs of three sentences each; the second paragraph is the "what the job gives the one command" part of the question. If the human wants one paragraph, the quotations in the tests still hold, since each starts at a sentence.
4. D-412 got `derives from D-413` and the *Scope* `agent-workflow, build-tools`.
5. The row added to `guidelines/testing.md` is in Polish, as the file is; it says the review is the check, not a test.

## Working copies

- `.runs/author/`: scratch outputs and copies of the workflow and of the test file for the mutations; emptied before this report (`.runs/author/` holds nothing). No worktree or clone made.

## Unread material

- `reports/review-whole-report.md` (the full review): not read; only the findings file and the handoff, as the handoff names (the findings file quotes it).
- `.the-way/task-cycle/change/fix.md` read whole; `SKILL.md` of `make-change` not re-read whole (I read it in the first stage).
- `foundations/decisions.md`: D-82 was not re-opened (the findings quote it); D-13 and D-77 read in the first stage.
- Not re-read this time: `elements/common/rules.md`, `elements/decisions/skill/*` (read whole in the first stage; I followed them from that reading).

## Searches not found or unclear

- A source with an address, a passage and a date for GitHub's scan of secrets: still not found (the `TODO` of D-412's *Based on*; the return step's task).
- Whether `guidelines/testing.md`'s "Trust boundaries" decision list wants D-413 in it: no rule says so; I added it because the row cites it. Unclear, harmless.
- No test or document that names the part of the workflow was found beyond the part map and the files named above.

## Problems observed

- None failing.
