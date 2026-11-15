# Report of correction 1 (task `ci-przy-pr`, request #135)

**Status:** `done`. Range from `4923dd0e`; no push, no full gate.

## Commits (all with `the private address`)

| Commit | What |
|---|---|
| `5ae669e8` | the four remarks: D-412 and its new fact, D-413, the comment of the workflow, the README |
| `7da06c4f` | the return step: the comment and the README say the skip of a container test as D-390 gives it |

Files changed: `foundations/decisions.md`, `foundations/environment_facts.md`, `.github/workflows/tests.yml`, `README.md`. The code (`scripts/`, `tests/`) is unchanged: no test quotes a sentence I changed (the `decision:` lines quote D-412's second sentence and D-413's binding sentences, which stand as before; `foundation_check.py` compares the quotations: 0 errors).

## The remarks, as made, and how

Item 2 of the human's remarks (Minor findings 1 to 4, written out in the remarks):

**Remark 3 of the four, a wrong fact in D-412 (r3) — fixed.**
- D-412's binding sentence read "The built-in scan of GitHub for secrets, Secret Protection, with push protection, …"; now "The built-in secret scanning of GitHub, with push protection, is what looks for secrets in the repository." The second sentence (held by the test) is unchanged.
- Source: I opened `data/reusables/gated-features/secret-scanning.md` of `github/docs` at `d59b2631959db46d71ca5f7748ec04311c6d0870` myself (read 2026-11-16, `curl` of the raw file, exit 0). It lists repository types: "**Public repositories**: … runs automatically for free." (the feature's name stands in the file as a variable, so the passages quoted are "Public repositories" and "runs automatically for free."). Recorded as the environment fact `github-secret-scanning-public-repository` by following the pinned `record-environment-fact` (template and skill files read in the return step before; the form and the rules of *Source* followed). D-412's *Based on* now names it first, and its *Rationale* begins "GitHub's secret scanning runs automatically and for free for a public repository, scans the whole Git history …, and its push protection blocks a push in which it detects one".
- Other places that name the scan "Secret Protection": `git grep -n -i "secret protection"` outside `.the-way`, `.runs` found only D-412's sentence; fixed. The task's own text and the word in `foundations/environment_facts.md` (no occurrence) were not touched.
- The decision is edited in place as the pinned `record-decision` method gives (the same binding-sentence rules: no `should`/`will`, one question, present tense).

**Remark "the workflow comment and the README say what the decision can source" (r2) — fixed, with the choice below.**
- `.github/workflows/tests.yml` lines 6-9 and `README.md` (the line that said "Linux, bo tam odpowiada demon Dockera") no longer say that the daemon answers. They state what the foundation holds: the reason stands in D-413; a test of containers is skipped, with a message in the log, where no daemon answers and there is no Docker Desktop to start (D-390), so the log of a run shows whether those tests ran (the runner of the Python tests prints its `skipped:` lines; `tests/quality/test_docker_gate.py` reads them the same way).
- "Docker is installed on GitHub's Linux machine" stands in D-413 (*Based on* `github-ubuntu-runner-docker`, *Rationale*), where the comment and the README point; I did not repeat it in them, since remark 4 asks for the reason in one place.
- **The runs that show the daemon answering — my choice:** I left them out of the foundation, the comment and the README. The handoff gives two ways: record a reading as an environment fact, or leave it out. A reading of a run's log is a statement about one past run, which no decision rests on (D-413's sentences are held by the tests and by the image fact), and a comment or README line that says "the runs of this request show …" narrates the request's history, which the handoff forbids. The evidence (runs `43772456261` and `43773183117`, `reports/ci-run1.log`, `reports/ci-run2.log`) belongs in the description of the request; the orchestrator can place it there. Cost if wrong: the human wanted it in a comment; one line to add, against a stale sentence in a file that outlives the request.

**Remark "the reason that tells Linux from Windows" (r1) — fixed.** D-413 *Rationale* now says: "The system is Linux because the game's containers are Linux containers: its image is built on Linux (D-263) and runs in a container (D-14), and the tests of containers build and run that image; this reason rests on the project's own setup. Docker is installed on the runner image of that system, so those tests can run instead of being skipped (D-390); the paths of Windows are checked by the gate run on the computer where the work is made." *Rejected* for "a Windows machine, or both systems at once": "the game's containers are Linux containers, which rests on the project's own setup, so a Linux machine is the one the tests of containers are made for, and the paths of Windows are checked by the gate run on the computer where the work is made, which this check does not replace." *Based on* stays `github-ubuntu-runner-docker`, which the Docker sentence rests on. I claim nothing of GitHub's Windows machine; no source was found for more (see Searches). The sources of the project's own setup, looked at: D-14 ("The loop2 container is a Docker container"), D-263's *Rationale* ("the image built on Linux"), `Dockerfile` (`FROM node:24-slim`) and `deploy/cloudflared.Dockerfile`. The test that holds D-413's sentences is unchanged: the binding sentences did not change (the reason stands in *Rationale*, which a test cannot hold).

**Remark "the reason in one place, the decision" (n2) — fixed.** The comment of the workflow keeps no reason of its own for Linux: "It runs on Linux. The reason stands in D-413 of `foundations/decisions.md`, "How does CI check a pull request into `main`?"." The README points to D-413 the same way. The reason for the job's name stays in the comment, as before (not remarked).

Items 1, 3, 4 of the remarks ask for no change: the ruleset stays with the human; the unread decisions are let through; the old gap (`cross-part-imports`) is in another task. I touched none.

## Rows of *Settlements to record* (where each stands now)

| Row | Where it stands |
|---|---|
| 1 scan of secrets is GitHub's built-in scan | D-412, resting on four facts (`github-secret-scanning-public-repository`, `github-secret-scanning-history`, `github-push-protection-blocks-push`, `loop2-secret-scanning-enabled`) |
| 2 the instruction check is the last stage | a sentence of D-405 and D-77 (unchanged) |
| 3 CI on Linux, with the reason | **no longer in a comment of the CI file, as the row said: the human decided otherwise.** It stands in D-413's *Rationale* and *Rejected* alone; the comment of `tests.yml` and the README line point to D-413. |
| 4 a Docker test is skipped only where no daemon answers and there is no Docker Desktop | the sentence of D-390 (unchanged); the comment and the README now repeat it as D-390 gives it |

## Checks (worktree root)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after each commit) | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 140 warn, 7 info` |
| `npm test -- tests/quality/test_ci_workflow.py` (after each commit) | 0, 11 tests |
| `npm test -- tests/quality/test_test_gate.py` | 0, 12 tests |
| `npm test -- tests/quality/test_docker_gate.py` | 0, 19 tests |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0, 1 test |
| `npm test -- tests/quality/test_quality_invariants.py` | 0, 5 tests |

Not run: the full gate, a CI run.

## Own-work check

Requirement most likely not met: that no sentence of ours claims of GitHub more than a source read holds. Check: `git grep` for `daemon`, `Secret Protection`, `Linux` over the tracked files outside `.the-way` and `.runs` (README, workflow, decisions); after the fix, the claims about GitHub left are: Docker installed on the `ubuntu-24.04` image (fact), the scan facts (four), `pull_request_target` (from the pinned process, not a GitHub claim of ours). The first version of the comment and README sentence on the skip said "finds no Docker daemon is skipped", wider than D-390 (a computer with Docker Desktop starts it); I caught it on re-reading against D-390 and corrected it in the second commit (this is the return step's finding, below).

## Return step (`return_step.md` read whole)

Compared with the code, for what I wrote or changed and what the corrected places depend on:
- **D-412** (binding sentence, *Based on*, *Rationale*) against `.github/workflows/tests.yml` and `tests/quality/test_ci_workflow.py` (the test holds "no scanner"; nothing says "Secret Protection" any more): matches. *Verification* unchanged, still true.
- **D-413** (*Rationale*, *Rejected*) against the workflow, the tests and the foundation entries it now names: D-14 (container is a Docker container: true), D-263 (image built on Linux: its *Rationale* says so), D-390 (skip rule: true, as in `scripts/docker_gate.py`); `Dockerfile` builds on `node:24-slim`. No code or test changed.
- **The comment and the README** against D-390: the first wording was too wide; corrected in the second commit (`7da06c4f`), which is the one change this step made.
- **Environment facts:** the new fact is named by D-412; all five facts of the file about GitHub are named by a decision (`github-secret-scanning-public-repository`, `-history`, `github-push-protection-blocks-push`, `loop2-secret-scanning-enabled` by D-412; `github-ubuntu-runner-docker` by D-413). The passage of the new fact was searched for word for word in the downloaded file.
- **Invariants, glossary, part map, `guidelines/testing.md`:** nothing in them names the scan, the reason for Linux or the daemon claim, so none changes; no invariant or glossary term is written (the remarks set no rule that asks for one).
- **Rows of *Settlements to record*:** see the table above.
- Written in the return step: the commit `7da06c4f` only. An entry marked `the cycle's`: the new fact `github-secret-scanning-public-repository` (no row carries it): sentence in English "GitHub's documentation says that secret scanning runs automatically and for free for a public repository"; po polsku: "Dokumentacja GitHuba mówi, że skan sekretów działa automatycznie i bezpłatnie w repozytorium publicznym."

## Reach beyond the dispatch

- `foundations/decisions.md` D-14, D-263 (Rationale) and the Dockerfile and `deploy/cloudflared.Dockerfile` heads: for r1 (the handoff names D-14 and the Dockerfile; D-263 I found by searching `Linux` in the log).
- `reports/review-return-report.md` lines 45-75 and `reports/review-fix-report.md` finding n2: the handoff named them.
- `.the-way/task-cycle/change/fix.md` was not needed; the variant row of `SKILL.md` for a correction was read.

## Working copies

`.runs/author/`: raw downloaded files (the reusable, the page) and scratch outputs; removed and the directory made anew empty before this report. No worktree or clone.

## Unread material

- `reports/request.md` (the request's text): not read; the handoff and the remarks carry what I needed.
- `reports/ci-run1.log`, `reports/ci-run2.log`: not opened (I did not state their content anywhere).
- `data/reusables/gated-features/secret-scanning.md`: read whole (three bullets); `secret-scanning.md` of the docs: only searched for the line that includes the reusable.
- The rest of D-14, D-263 and D-390: D-14 read whole; D-263 only its *Rationale* and *Rejected*; D-390 read whole in the first stage.

## Searches not found or unclear

- A source for what GitHub's Windows machine would do with the tests of containers: not found (so D-413 claims nothing; the reason is the project's own setup).
- A source that a Docker daemon answers on `ubuntu-24.04`: not found; what is held is that Docker is installed. The runs of the request are the evidence, not recorded.
- Whether the Dockerfile's `node:24-slim` is a Linux image has no source in the foundation beyond D-263's own sentence "the image built on Linux": taken as the project's own setup, as the handoff allows.
- Another place that names the scan "Secret Protection" outside the task's own text: none found.

## Problems observed

- None failing.
