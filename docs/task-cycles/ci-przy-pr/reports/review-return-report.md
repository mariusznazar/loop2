PASS 1c0e49ebef3cf6cb4a6263aa0f563a0c4a98a663

# Review of the return step — task `ci-przy-pr`

Range `9912f0db..1c0e49eb`, one commit (`1c0e49eb`), files `foundations/decisions.md`, `foundations/environment_facts.md`. `git rev-parse HEAD` = `1c0e49ebef3cf6cb4a6263aa0f563a0c4a98a663`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.

Result: no Critical, no Important finding. Minor: 3 (r1-r3), all within the task. Out of scope: 0.

## 1. The four environment facts

Each address was opened by an anonymous `curl -sSfL` of the raw file at the commit the entry names (exit 0 for all four), and each quoted passage searched in the downloaded text.

| Fact | Form | Passages at the address | Sentence against passages |
|---|---|---|---|
| `github-secret-scanning-history` (`foundations/environment_facts.md:834-838`) | edition at a commit of `github/docs`, § place, passage, date read — as the template's first form | `secret-scanning.md` line 32, under "## How secret scanning protects your code": "{% data … %} scans your entire Git history on all branches of your repository for hardcoded credentials, including API keys, passwords, tokens, and other known secret types." — the quoted passage stands word for word after the Liquid variable | holds; "hardcoded credentials of known secret types" is a fair narrowing of "including API keys, passwords, tokens, and other known secret types" |
| `github-push-protection-blocks-push` (`:839-843`) | same | `push-protection.md` lines 26 and 28, under "## How push protection works": both passages word for word | holds |
| `loop2-secret-scanning-enabled` (`:844-848`) | reading: one-line command in backticks, service, tool with version, output word for word, date run — as the template's third form and as the file's other readings (`check-address-schedule-run-times`, `loop2-containers-memory-use`, which also put the date in the sentence) | I ran the same read-only call: `gh api repos/mariusznazar/loop2 --jq '.security_and_analysis \| {secret_scanning, secret_scanning_push_protection}'` → `{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}`, exit 0, `gh version 2.88.1 (2026-03-12)` | holds word for word. A reading is the allowed form: an anonymous `GET https://api.github.com/repos/mariusznazar/loop2` returns no `security_and_analysis` field (checked: absent; `visibility` = `public`), so no page open without the owner's access shows the setting (template § Source, third form; WAY-84). The filter keeps only the fields the sentence rests on; no token in the output |
| `github-ubuntu-runner-docker` (`:849-853`) | two pages of one edition (`actions/runner-images` at `95e6f51a…`), each with address and place — as the template allows | `README.md` line 25, table of "## Available Images": cells "Ubuntu 24.04", "x64", "`ubuntu-latest` or `ubuntu-24.04`" (markup dropped); `images/ubuntu/Ubuntu2404-Readme.md` lines 78-79 under "## Installed Software" / "### Tools": "Docker Client 28.0.4", "Docker Server 28.0.4" | holds. `.github/workflows/tests.yml:30` uses `runs-on: ubuntu-24.04`, the label the fact names |

## 2. D-412, D-413, D-390 as corrected

- **D-412** (`foundations/decisions.md:10925-10938`). *Based on* names three facts that hold the *Rationale*: whole Git history (first fact), blocks a push in which it detects a secret (second), the setting on (third). The removed "and every push" was indeed unsourced. Only *Based on* and *Rationale* changed; the binding sentence is unchanged. Nothing in the *Rationale* claims more than the facts. The one remaining claim about GitHub that no fact holds is the name "Secret Protection" in the binding sentence (r3).
- **D-413** (`:10940-10955`). *Based on* `github-ubuntu-runner-docker` holds "Docker is installed on the runner image of that system". The binding sentences are unchanged; only the *Rationale* and *Rejected* changed. The unsourced "GitHub does not run Linux containers on a Windows machine" is gone. What is left is true but no longer explains the choice (r1).
- **D-390** (`:10550-10565`). Only the *Rationale* changed. It now states a condition ("wherever a daemon answers, such as a Linux machine of CI that has no Docker Desktop") and makes no claim about GitHub. The binding sentence and *Based on* are unchanged. It matches `scripts/docker_gate.py` as the earlier reviews found.
- **The comment at `.github/workflows/tests.yml:7-9` against D-413.** They do not contradict each other: the comment says more than D-413 does. The comment says "the Docker daemon of a Linux machine answers". D-413 now says only that Docker is installed on the image, which is all the source shows. `README.md:88` makes the same stronger claim ("Linux, bo tam odpowiada demon Dockera"). The human must see this, because a reason of the CI file and of the README now has no source in the foundation. The first CI run is the evidence for this repository: the container tests ran there instead of being skipped (acceptance criterion 2). Suggested wording for the request: "The comment at `.github/workflows/tests.yml` lines 7-9 and `README.md` line 88 say the Docker daemon answers on GitHub's Linux machine. D-413 says only what GitHub's list of runner images shows: Docker is installed on the Ubuntu 24.04 image. Whether the daemon answers there is shown by this request's CI run, where the tests that start containers ran rather than being skipped. Why a Windows machine would not do is held by no source the cycle found: see D-413's *Rejected*." See r2.

## 3. The foundation against the code (spot-checks)

- Part map `agent-workflow` (`foundations/part_map.md:123-139`): the sentence names the workflow of tests "on every pull request into `main`, on Linux". `.github/workflows/tests.yml` is in *Files* and *Trust boundary*, and the file has `on: pull_request: branches: [main]` and `runs-on: ubuntu-24.04`. Matches.
- Part map `build-tools` (`:87-121`): "runs the test gate", with no list of the gate's stages. `tests/quality/**` covers `tests/quality/test_ci_workflow.py`, the test of the workflow. Matches; `foundation_check.py` reports no file left unclaimed.
- `foundations/invariants.md`: searched for `stage|foundation check|check_instructions|scripts/test\.py|workflows/` (no hit) and for `gate|Docker|daemon|CI\b`. Hits: `:107` (Compose file, unrelated), `:590` (focused gate run, untouched by this range), `:1308-1310` `gate-docker-start-waits-once`, which is still true as written. No invariant names the stages of the gate or the files of a part touched here.
- `tests/quality/test_ci_workflow.py`: no comment still claims "answers", Windows containers or "every push". The only Windows mention is `:152`, which says how to break the test.
- `README.md:88`: does **not** match D-413 as corrected, though the author's report says README "matches" (r2).

## 4. Rows of *Settlements to record*

Rows 1 (D-412), 2 (a sentence of D-405), 3 (the comment of the CI file, plus D-413's *Rationale*) and 4 (the sentence of D-390, `decisions.md:10552` "and runs where a daemon answers") are placed as their *Goes to* columns say. The report's table names each place. Row 3's place, the comment, keeps the stronger reason, as r2 says.

## Findings

### Critical

none

### Important

none

### Minor

**r1 — D-413's reason for Linux now holds for Windows too.** Place: `foundations/decisions.md:10954` ("The system is Linux because Docker is installed on the runner image of that system, so the tests of containers can run instead of being skipped") and `:10955` (*Rejected*: "a Windows machine, or both systems at once — the paths of Windows are checked by the gate run on the computer where the work is made, which this check does not replace").

What is wrong: the Windows image at the same commit of `actions/runner-images` also lists Docker (`images/windows/Windows2025-Readme.md` lines 66-67: "Docker 29.7.2", "Docker Compose 2.40.3"; the author read this file too, as its report says). So the *Rationale*'s reason does not tell Linux from Windows. A reader may take it to mean the Windows runner has no Docker. The *Rejected* reason answers "both systems at once" but gives no cost of "a Windows machine" alone. The reason that would tell them apart is that the game's containers are Linux containers and do not run on the Windows runner. Only a near source exists for it: GitHub's reusable `data/reusables/actions/docker-container-os-support.md` at `d59b2631`, "If your workflows use Docker container actions, job containers, or service containers, then you must use a Linux runner". It speaks of features of Actions, not of a `docker` command run in a step.

Why Minor: nothing left is false, the binding sentence (Linux) is held by tests, and the *Rationale* is read by a human who considers changing the decision. That human should see this in the request (suggested wording in section 2). A fix after the human's word could do either of two things. It could name in *Based on* `github-ubuntu-runner-docker · TODO — a source that the Windows runner of GitHub runs no Linux containers` and keep that reason in *Rejected* (decisions template, `.the-way/elements/decisions/template.md:64-70`). Or it could rest the reason on a product fact, that the game's images are Linux images.

**r2 — The README, like the CI comment, keeps the claim the return step removed from D-413, and the report says README "matches".** Place: `README.md:88` ("Linux, bo tam odpowiada demon Dockera i biegną testy kontenerów") and `.github/workflows/tests.yml:7-9`. The report's table, `return-step-report.md:40`, says README "matches; no change".

What is wrong: both say the daemon answers on GitHub's Linux machine. D-413 now says only that Docker is installed, because no source shows more. The comment was left by the handoff's order, and the report flags it (`:25`, `:107`); the README line is not flagged.

Why Minor: the claim is very likely true and the first CI run shows it for this repository. Both files are outside this range. The request should name both places, not only the comment (wording in section 2).

**r3 — D-412's binding sentence names "Secret Protection", which no fact holds for this repository.** Place: `foundations/decisions.md:10927` ("The built-in scan of GitHub for secrets, Secret Protection, with push protection, …").

What is wrong: GitHub's documentation at the same commit (`data/reusables/gated-features/secret-scanning.md`, the reusable the page `secret-scanning.md` includes under "How can I access this feature?") says: "Public repositories: Secret scanning runs automatically for free". It names Secret Protection only for organization-owned private and internal repositories, and for some enterprise cases. `loop2` is public and owned by a user (API: `visibility` `public`). So "Secret Protection" names a product the repository does not appear to use. The scan that is on is secret scanning, as the fact `loop2-secret-scanning-enabled` shows.

Why Minor: the name does not change what the decision requires, and no test quotes the sentence (search for "Secret Protection" outside `.runs/`: one hit, this line). Changing it changes a binding sentence, so it goes to the human (the task's own text uses the name). Suggested: "GitHub's built-in secret scanning, with push protection, …".

## Declined to judge

- The commit's author address (`return-step-report.md:3`): a rule of the human's git process, not of the task. Set aside as outside the review's task.
- Whether the comment of `.github/workflows/tests.yml:7-9` should be reworded: code outside this range, left by the handoff's order. Only its wording in the request is judged (section 2).

## Checks

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | `1c0e49eb…`, the head given |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `bfb2e109…` |
| `git log` / `git diff 9912f0db..1c0e49eb` | one commit, two files, +30 −6 |
| `curl -sSfL` of the four raw files at the commits the facts name | 0 ×4; passages found word for word (section 1) |
| `curl -sSfL` of `images/windows/Windows2025-Readme.md` at `95e6f51a…` | 0; Docker listed at lines 66-67 (r1) |
| `curl -sSfL` of `data/reusables/gated-features/secret-scanning.md` and `data/reusables/secret-scanning/what-is-scanned.md` at `d59b2631…` | 0, 0 (r3) |
| `curl -sSfL` of `data/reusables/actions/docker-container-os-support.md` and `content/actions/tutorials/use-containerized-services/use-docker-service-containers.md` at `d59b2631…` | 0, 0 (r1). `…/run-jobs-in-a-container.md` at that path: 22 (404), not used |
| `gh api repos/mariusznazar/loop2 --jq '.security_and_analysis \| {secret_scanning, secret_scanning_push_protection}'` (read-only) | 0; output identical to the fact's |
| anonymous `curl` of `https://api.github.com/repos/mariusznazar/loop2`, field check | `security_and_analysis` absent, `visibility` `public` |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 140 warn, 7 info` |
| `npm test -- tests/quality/test_ci_workflow.py` | 0, 11 tests OK |
| `git status --short` after the review | empty |

Not run: the full gate (by the dispatch) and a real CI run (not mine to start).

## Reach beyond the dispatch

- `.the-way/elements/environment-facts/template.md`, read whole: the form of the facts.
- `.the-way/elements/decisions/template.md:50-119`: the rules for *Based on* `TODO` and *Rejected* (r1).
- `foundations/part_map.md:87-148`, the entries `build-tools`, `agent-workflow`, `product-foundation`: for point 3.
- `foundations/invariants.md`, searched as in section 3, with the hits' lines read.
- `README.md`, searched for `Linux|sekret|secret|Docker`, which found line 88 (r2).
- `tests/quality/test_ci_workflow.py`, searched for `answer|Windows|Docker|scans|every push`.
- `.github/workflows/tests.yml:1-30`: the comment and `runs-on`.
- `reports/review-fix-report.md` and `reports/review-whole-report.md`, searched, so that no earlier Minor is repeated (n1 and n2 are not repeated; r2 widens n2's place to the README).
- GitHub sources outside the four facts: `Windows2025-Readme.md`, `docker-container-os-support.md`, `use-docker-service-containers.md`, `gated-features/secret-scanning.md`, `what-is-scanned.md`. Used to judge r1 and r3.

## Working copies

`.runs\review-return\` held the raw files I downloaded (the four sources, the Windows image readme and the GitHub docs page on service containers). It was removed with `rm -rf` before this report, and nothing of it is kept in `reports/`: the passages the report needs are quoted above, at addresses fixed by commit. No worktree or clone was made.

## Unread material

- `foundations/decisions.md`: only D-390, D-412 and D-413 read whole (the dispatch names them). D-405, D-77 and D-11 were not re-read: the earlier reviews checked them and this range does not touch them.
- `foundations/invariants.md` and `README.md`: searched, not read whole.
- `.the-way/task-cycle/skill/foundation_step.md`: not read, since no finding needed it.
- The raw GitHub pages: `secret-scanning.md` and `push-protection.md` read whole. `Ubuntu2404-Readme.md`, `README.md` of runner-images and `Windows2025-Readme.md` were searched for their headings and Docker lines, not read whole.

## Searches not found or unclear

- A GitHub source saying that a Docker daemon answers on `ubuntu-24.04`, or that the Windows runner runs no Linux containers: not found. The nearest is `docker-container-os-support.md`, which concerns features of Actions (r1).
- `content/actions/tutorials/use-containerized-services/run-jobs-in-a-container.md` at `d59b2631…`: 404 at that path. Not needed.
