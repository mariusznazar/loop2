# Report of the return step (task `ci-przy-pr`)

**Status:** `done`. One commit on `task/ci-przy-pr`, from the head `9912f0db`: `1c0e49eb` (private address `the private address`). No push, no full gate.

Method: `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` read whole; the element files of environment facts (`template.md`, `skill/SKILL.md`, `read.md`, `decide_entry.md`, `draft.md`, `write.md`) read whole.

## Environment facts written (the cycle's, none carried by a row)

Four entries appended to `foundations/environment_facts.md` before its withdrawn list. Every passage was copied from the page or file opened for this step, checked by a search of the downloaded file for it word for word (markup dropped as the template says), and read on 2026-11-15. The documentation was taken as raw files at a commit (`github/docs` at `d59b2631959db46d71ca5f7748ec04311c6d0870`, `actions/runner-images` at `95e6f51a068507e8f43d061d2166a39d0ef36ce8`, both the heads of their default branches on that day, read with `git ls-remote`).

| Identifier | Sentence in English | Zdanie po polsku | Source |
|---|---|---|---|
| `github-secret-scanning-history` | GitHub's documentation says that secret scanning scans the entire Git history on all branches of a repository for hardcoded credentials of known secret types. | Dokumentacja GitHuba mówi, że skan sekretów przegląda całą historię Gita na wszystkich gałęziach repozytorium pod kątem zapisanych na stałe poświadczeń znanych rodzajów. | `content/code-security/concepts/secret-security/secret-scanning.md` § How secret scanning protects your code |
| `github-push-protection-blocks-push` | GitHub's documentation says that push protection blocks a push in which it detects a potential secret, of the types of secret it can block. | Dokumentacja GitHuba mówi, że blokada pushu odrzuca push, w którym wykryje potencjalny sekret, rodzajów sekretów, które potrafi blokować. | `content/code-security/concepts/secret-security/push-protection.md` § How push protection works |
| `loop2-secret-scanning-enabled` | On 2026-11-15 the repository `mariusznazar/loop2` has secret scanning and the push protection of secret scanning enabled. | Dnia 2026-11-15 repozytorium `mariusznazar/loop2` ma włączony skan sekretów i blokadę pushu tego skanu. | a reading: `gh api repos/mariusznazar/loop2 --jq '.security_and_analysis \| {secret_scanning, secret_scanning_push_protection}'`, gh 2.88.1; output quoted word for word (a read only call; the answer holds no token; I first ran the call without the narrowing filter to see what the answer holds, and it held only the five status fields) |
| `github-ubuntu-runner-docker` | The runner image that GitHub's label `ubuntu-24.04` names is the x64 image Ubuntu 24.04, and its installed software lists Docker Client and Docker Server. | Obraz, który nazywa etykieta GitHuba `ubuntu-24.04`, to obraz x64 Ubuntu 24.04, a lista jego oprogramowania zawiera klienta i serwer Dockera. | `README.md` § Available Images and `images/ubuntu/Ubuntu2404-Readme.md` § Installed Software, Tools, of `actions/runner-images` |

The reading of the repository's setting is a call that only reads; I ran it on the author's computer with the owner's `gh` login. This is the one place where this step touched GitHub, read only.

## Decisions changed, and why

- **D-412 *Based on*** was `TODO`; now `github-secret-scanning-history · github-push-protection-blocks-push · loop2-secret-scanning-enabled`. Its *Rationale* sentence now says what those sources hold: "GitHub scans the whole Git history of the repository for secrets of the kinds it knows and blocks a push in which it detects one" (the old "and every push" claim is gone: the documentation read says push protection blocks a push at a push attempt, not that the scan covers every push); the last sentence says "so no test of the repository checks that it is on" in place of "no file and no test … shows", since a fact now shows the state of the setting.
- **D-413 *Based on*** was `none` (finding n1 of the review of the fix); now `github-ubuntu-runner-docker`. Where the source does not hold the claim, the sentence changed to what it holds: the *Rationale* said "a Docker daemon answers there"; the image list holds that Docker (client and server) is installed, so it now reads "Docker is installed on the runner image of that system, so the tests of containers can run instead of being skipped". The *Rejected* claim "GitHub does not run Linux containers on a Windows machine" is **not held by any page read**: the documentation read says only that container jobs and service containers need a Linux environment, and the Windows image lists Docker too; the clause now reads "the paths of Windows are checked by the gate run on the computer where the work is made, which this check does not replace" (from the task's row 3 and *Out of scope*). Where that Windows reason stood in the task text only, it was a claim without a source.
- **D-390 *Rationale*** (my sentence of the first stage, "a machine of CI with Linux, where a daemon answers and there is no Docker Desktop") said what GitHub's machine has; it now reads "wherever a daemon answers, such as a Linux machine of CI that has no Docker Desktop", a condition and no claim about GitHub.
- The comment of `.github/workflows/tests.yml` (lines 7-9, "the Docker daemon of a Linux machine answers, so the tests that start containers run here instead of being skipped") and D-413's sentence on Linux were **left**, as the handoff says for finding n2. Note: the comment still says a daemon "answers"; the fact held says Docker is installed on the image. Whether the daemon answers is shown by the first CI run (acceptance criterion 2), which the orchestrator reads.

## The foundation compared with the code

The entries the change writes or changes, those the task names, and what the search found:

| Entry | Compared with | Result |
|---|---|---|
| D-77 (sentence and *Verification*) | `scripts/test.py` `main` (one-file path runs no stage but its test), `tests/quality/test_test_gate.py` (`assert_focused`) | matches; no change |
| D-405 | `scripts/test.py` stages in order: build, Node tests, `.the-way/gate/run_tests.py`, foundation check, instruction check; exit code of the last stops the gate; `test_the_whole_gate_runs_its_stages_in_their_order`, `test_an_error_of_the_check_of_the_instruction_files_stops_the_gate`, `test_a_stage_that_fails_before_…`, `test_the_check_of_the_instruction_files_ends_with_0_on_a_warning_and_1_on_an_error` | matches; no change |
| D-390 | `scripts/docker_gate.py` (`daemon_gap` asks the daemon before `desktop_present`; module docstring), `tests/quality/test_docker_gate.py` (two new tests; one-line quotations) | code and text agree; only the *Rationale* sentence above changed |
| D-412, D-413 | `.github/workflows/tests.yml`, `tests/quality/test_ci_workflow.py` (11 tests, each sentence held by a `decision:` line); `foundation_check.py` checks the quotations | match; *Based on* and the sentences above changed |
| D-11 (task's *Decisions in play*) | `.github/workflows/deploy.yml` unchanged; CI runs on `pull_request`, before any push to `main` | matches; no change |
| Part map: `agent-workflow` (sentence, *Files*, *Trust boundary*), `build-tools` | `.github/workflows/tests.yml` tracked; `foundation_check.py` reports no unclaimed or doubly claimed file | matches; no change |
| `guidelines/testing.md` (trust boundary row, *Decision* list, *Where in code*, the one-file sentence, the *Command* of the recipe) | the files named exist; the row describes review as the check | matches; no change |
| `README.md` (gate paragraph, one-file paragraph, CI paragraph) | `scripts/test.py`, the workflow | matches; no change |
| `foundations/invariants.md`, searched for `test.py`, `stage`, `docker`, `workflow`, `CI`, `gate`, `check_instructions` (hits read whole where they touch the change): `focused-test-execution` (no executed test fails), `gate-docker-start-waits-once` (Part `build-tools · deployment`; rests on none; true as written, the daemon-answers case runs without a start), `loop2-distinct-address` and `loop2-container-isolation` (deployment workflow, unrelated), `account-server-typecheck` (changed test, named in the report of the first stage) | | no invariant untrue; none to write (no rule of the task, a decision or the human asks for one beyond D-412/D-413, which tests hold) |
| `foundations/glossary.md` (searched for "gate", "foundation check", "instruction", "workflow"; read `deployment`, `unit test`, `integration test`) | | no entry for those words; no term used against its entry; no glossary entry written (the rows do not ask, and "gate" and "check of the instruction files" are used in plain words, as WAY-95 asks no entry for them) |
| `AGENTS.md` | block written by the installer in the pin move names both checks and the CI file | matches |
| `.claude/skills/loop2-deploy/SKILL.md` | lists the two deployment workflows; says nothing of the tests' workflow, which deploys nothing | no change |

Invariants: none written. Glossary terms: none. Projected entries: none (the task has none).

## Rows of *Settlements to record* (`task.md`)

| Row | Settlement | Where it stands |
|---|---|---|
| 1 | scan of secrets is GitHub's built-in scan with push protection; CI adds no scanner | D-412 (decision), now resting on three facts; held by the `decision:` line in `tests/quality/test_ci_workflow.py` |
| 2 | `check_instructions.py` is the last stage after the foundation check | a sentence of D-405 (and the first sentence of D-405's list of stages), D-77 (*Verification* and sentence); `scripts/test.py`; tests in `test_test_gate.py` and `test_node_test_selection.py` |
| 3 | CI on Linux because the daemon answers and the container tests run; Windows paths by the local gate | the comment of `.github/workflows/tests.yml` (lines 5-9) as the row says, and D-413's *Rationale*, whose sentence now rests on the fact `github-ubuntu-runner-docker` and says "can run" |
| 4 | a test needing Docker is skipped at once only where no daemon answers and there is no Docker Desktop to start | the sentence of D-390; `scripts/docker_gate.py` unchanged; two tests added in `tests/quality/test_docker_gate.py` |

Entries marked `the cycle's` (no row): D-413, the four environment facts, the part-map entries of `agent-workflow` (sentence, file, trust boundary), the row of the trust boundaries in `guidelines/testing.md`.

## Checks (all from the worktree root)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the step) | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 140 warn, 7 info` |
| `npm test -- tests/quality/test_ci_workflow.py` | 0, 11 tests |
| `npm test -- tests/quality/test_test_gate.py` | 0, 12 tests |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0, 1 test |

Not run: the full gate; a real CI run.

## Own-work check

Requirement most likely not met: that every claim of D-412, D-413 and D-390 about GitHub is held by a source I read. Check: I compared each sentence of those entries that speaks of GitHub with the passages (searched the downloaded files for each passage word for word before writing them); two claims were not held (the scan of "every push"; "GitHub does not run Linux containers on a Windows machine") and were changed as above; one claim only half held ("a daemon answers" on `ubuntu-24.04`, where the source says Docker is installed) was changed in the decisions and left in the CI file's comment by the handoff's order.

## Choices made, with the way rejected and its cost if wrong

1. **Two facts for the two pages of secret scanning** (rejected: one entry; the template says one fact, one reason to change). If wrong, the two merge into one entry and the *Based on* of D-412 is edited.
2. **A reading for the repository's setting** `loop2-secret-scanning-enabled` (rejected: leaving the state to the task text, which is no source). Cost if wrong: one entry that is withdrawn when D-412 goes.
3. **Raw files at a commit as the edition** (as the handoff gives), and the passages taken from the raw Markdown with its Liquid variables dropped at the start of a sentence (the passage starts after `{% data … %}`); where a passage had markup inside (`_before_`), I chose another passage without it.
4. **No fact for "a daemon answers" or "Windows does not run Linux containers"**: no source read says so, so the decisions state what the sources hold.

## Reach beyond the handoff

- `github/docs` tree (GitHub API, `git/trees/<commit>?recursive=1`) to find the paths of the pages; `content/actions/tutorials/use-containerized-services/use-docker-service-containers.md`, `run-jobs-in-a-container.md`, `content/actions/reference/runners/github-hosted-runners.md`, `content/actions/concepts/runners/github-hosted-runners.md` and `images/windows/Windows2025-Readme.md` of runner-images, read to look for a source of the Windows claim: none held it (that is why the claim was removed).
- `foundations/glossary.md` headings and the entries `deployment`, `test server`, `unit test`, `integration test`.

## Working copies

`.runs/author/`: raw downloaded pages, the tree listing and scratch outputs; emptied before this report (the directory holds nothing). No worktree or clone made.

## Unread material

- `content/code-security/concepts/secret-security/push-protection.md` and `secret-scanning.md` were read in part (the first 60 and 50 lines): the rest (tables of push surfaces, further sections) not read.
- `Ubuntu2404-Readme.md` read in part (the head, the list of sections, and the lines of Docker); `README.md` of runner-images read in part (the table of images and the headings).
- `foundations/invariants.md` was searched, not read whole; `foundations/glossary.md` searched for terms and its headings listed, not read whole.
- `.the-way/elements/common/way_of_working.md` and `rules.md`: read whole in the first stage, not re-read.
- `reports/review-fix-report.md`: read whole; `reports/review-whole-report.md`: not read.

## Searches not found or unclear

- A page of GitHub's documentation that says GitHub does not run Linux containers on a Windows machine, or that a Docker daemon answers on `ubuntu-24.04`: not found (see above). The first CI run settles the second for this repository.
- A GitHub page that says that the scan covers every push: not found; the documentation read says push protection blocks a push at its attempt.
- A rule in the-way that says whether a setting of a repository read through a call goes to the fact file when a decision declares the setting: found in the template ("The current state of a setting that people of the product change outside its repository … is a fact", WAY-84), applied.

## Problems observed

- None failing. The comment in `.github/workflows/tests.yml` (line 7-9) still claims "answers"; left by the handoff's order and flagged above.
