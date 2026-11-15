PASS 7da06c4fe0fef1115b73b0e62df0109cc2125a5b

# Review of correction 1 (task `ci-przy-pr`, request #135)

Range `4923dd0e..7da06c4f` (`5ae669e8` the fix, `7da06c4f` the return step), computed with `git diff` and `git log` of that range; `git rev-parse HEAD` = `7da06c4fe0fef1115b73b0e62df0109cc2125a5b`, the head given. Neither commit is on `origin` yet (`git branch -r --contains 5ae669e8`: empty; `origin/task/ci-przy-pr` = `4923dd0e`).

Result: no Critical, no Important finding. Minor: 3 (m1-m3), all within the task. Out of scope: 0.

## The remarks, each as made or not

Item 2 of `reports/correction-1-remarks.md` (the four Minor findings). Items 1, 3 and 4 ask for no change; the range touches none of what they name (no ruleset, no `cross-part-imports`).

**r3, "Secret Protection" in D-412 — made.**
- `foundations/decisions.md:10927` now reads "The built-in secret scanning of GitHub, with push protection, is what looks for secrets in the repository." It says no more than GitHub's documentation gives.
- The new fact `foundations/environment_facts.md:840-844` (`github-secret-scanning-public-repository`). I fetched its address myself: `https://raw.githubusercontent.com/github/docs/d59b2631959db46d71ca5f7748ec04311c6d0870/data/reusables/gated-features/secret-scanning.md` (curl exit 0). The file's list item reads `* **Public repositories**: {% data variables.product.prodname_secret_scanning_caps %} runs automatically for free.` Both quoted passages, "Public repositories" and "runs automatically for free.", stand there word for word once the bold markup is dropped. The variable between them renders as the feature's name. The fact's sentence says no more than that item. Its *place* is also right: the page `content/code-security/concepts/secret-security/secret-scanning.md` at the same commit has `## How can I access this feature?` at line 95 and `{% data reusables.gated-features.secret-scanning %}` at line 97. The same reusable names Secret Protection only for organisation-owned private and internal repositories and for enterprise cases. That bears out the human's remark.
- D-412 *Based on* (`:10930`) names the new fact first, beside the three facts it already had. *Rationale* (`:10937`) says "runs automatically and for free for a public repository" (the new fact), "scans the whole Git history … for secrets of the kinds it knows" (`github-secret-scanning-history`), and "its push protection blocks a push in which it detects one" (`github-push-protection-blocks-push`). Each claim stands in a fact, and none goes further than its fact.
- No other place is left: `git grep -n -i "secret protection" -- . ':!.the-way'` exits 1 (no match). As a positive control, `git grep -n -i -c "secret scanning"` finds `decisions.md:2` and `environment_facts.md:4`. The task's own text (`task.md:39,79,89`) still says "Secret Protection". It is frozen and not ours.

**r2, what the workflow comment and the README say — made in part (m1).** The unsourced claim is gone from both places: `.github/workflows/tests.yml:7-10` and `README.md:88` no longer say that the daemon answers on GitHub's Linux machine. What they say now is sourced: the reason stands in D-413, and a test of containers is skipped with a message where no daemon answers and there is no Docker Desktop (D-390). The human's two named additions are absent from both: "Docker is installed on GitHub's Linux machine" and "the runs of this request show the daemon answering". See m1.

**r1, D-413's reason that tells Linux from Windows — made, as the human's fallback gives (one Minor wording point, m2).** `decisions.md:10954` reads: "The system is Linux because the game's containers are Linux containers: its image is built on Linux (D-263) and runs in a container (D-14), and the tests of containers build and run that image; this reason rests on the project's own setup." That is the human's second option word for word in substance: "say plainly that the reason is the game's Linux containers and that it rests on the project's own setup". It claims nothing of GitHub's Windows machine. The only GitHub claim left is "Docker is installed on the runner image of that system", and `github-ubuntu-runner-docker` holds it ("Docker Client 28.0.4" · "Docker Server 28.0.4"). The sources it names:
- D-14 (`:396`) says "The loop2 container is a Docker container" and supports "runs in a container".
- D-263 (`:6637-6639`) says only in its *Accepted with it* that "when this was settled, the lockfile was written on Windows and the image built on Linux". It supports "built on Linux", but as a remark about a past moment.
- `Dockerfile:1` `FROM node:24-slim AS build` is the present-day source of the Linux image. The decision does not name it.
- "the tests of containers build and run that image" holds. `tests/deploy/test_loop2_image_icons.py:5,101` and `tests/deploy/test_account_storage.py:106` run `docker build`.

**n2, the reason for Linux in one place — made.** The comment (`tests.yml:7-8`) and the README (`README.md:88`, "Powód wyboru Linuksa opisuje D-413 w `foundations/decisions.md`") give no reason of their own and point to D-413. The comment names it by number and question. The README names it by number alone, which was not asked for, so it is no finding. The README keeps "ścieżki Windowsa sprawdza lokalna bramka". That is what the local gate covers, not a reason for choosing Linux.

## Findings

### Critical

none

### Important

none

### Minor

**m1 — r2 is made only in part. The comment and the README do not say "Docker is installed on GitHub's Linux machine", nor that the runs of this request show the daemon answering. The human's remark asked for both.** Place: `.github/workflows/tests.yml:7-10`, `README.md:88`. The author's reasons are in `reports/correction-1-report.md:26-27`.

What is wrong: remark 2's first sub-item asks the comment and the README to say "what the decision can source (Docker is installed on GitHub's Linux machine) and that the runs of this request show the daemon answering". Neither is written.
- **The runs.** The author's reason holds. The orchestrator's handoff (`correction-1-handoff.md:15`) forbids a sentence that narrates the request's history. A comment that says "the runs of this request show …" goes stale as soon as the request merges. The comment now ends with a present-tense statement that stays true: "so the log of a run shows whether those tests ran". I checked that statement against the code. `.the-way/gate/run_tests.py:54-59` prints `skipped: <test>: <reason>` for each skipped test, and `scripts/docker_gate.py:197,238` gives the skip reason. In `reports/ci-run1.log` and `reports/ci-run2.log` that line shows: 4 `skipped:` lines each, 3 of them native Windows tests, 0 lines "no Docker daemon answers", 7 lines `Production image sha256`.
- **"Docker is installed".** The author's reason is weaker. Remark 4 ("keep the reason in one place") stands beside remark 2 in the same list, and remark 2 names this fact as what the comment should say. The author reads the two as in conflict and drops the fact. That is a reading the human did not give.

Why Minor: nothing that stands is false or unsourced, and the original finding r2 was Minor. A remaining part of a Minor remark blocks nothing (`fix.md`, WAY-162). The human should see it in the request, because the departure is from his own words.

Suggested wording for the request:
> Uwaga 2, pierwszy podpunkt, zrobiona częściowo. Komentarz w `.github/workflows/tests.yml` i README nie mówią już, że demon Dockera na Linuksie GitHuba odpowiada. Wskazują D-413 („How does CI check a pull request into `main`?”) i mówią, że pominięty test kontenerów zostawia w logu linię z powodem. Nie dopisaliśmy dwóch rzeczy, o które prosiłeś:
> (a) „Docker jest zainstalowany na linuksowej maszynie GitHuba” — stoi w D-413 (fakt `github-ubuntu-runner-docker`); w komentarzu go nie powtórzyliśmy, żeby powód wyboru Linuksa był w jednym miejscu;
> (b) „przebiegi tej prośby pokazują odpowiadający demon” — zdanie o przeszłych przebiegach w komentarzu zestarzałoby się po scaleniu. Dowód jest tu: przebiegi 43772456261 i 43773183117 — testy kontenerów przeszły (`tests/deploy` 253 OK, `tests/invariants` 261 OK, 7 linii `Production image sha256`), żadnej linii „no Docker daemon answers”.
> Jeśli chcesz (a) w komentarzu i README, to jedna linia w każdym; zostawienie tak jak jest nic nie psuje.

Cost of each way. Left as it is, the comment says less than the human asked, but everything it says is sourced and stays true. With (a) added, there are two lines of text, and the Docker fact stands in three places instead of one, which is the opposite of what remark 4 asks.

**m2 — D-413's *Rejected* says "a Linux machine is the one the tests of containers are made for". The project's own gate runs those tests on Windows through Docker Desktop (D-390), and the "built on Linux" reason cites a remark of D-263 about a past moment.** Place: `foundations/decisions.md:10955` and `:10954` ("its image is built on Linux (D-263)").

What is wrong: D-390 (`:10552`) and `scripts/docker_gate.py:196-207` start Docker Desktop on the owner's Windows computer and run the same tests there. So "made for a Linux machine" overstates the case. A reader may take it to mean that the tests of containers are not meant to run on Windows. What tells Linux from GitHub's Windows machine is that GitHub's Windows Docker cannot run Linux containers. No source for that was found, and the human's fallback leaves it unsaid, as it should. Separately, D-263 says "the image built on Linux" only as what held "when this was settled". `Dockerfile:1` (`FROM node:24-slim`) is the source of the present fact, and the decision does not name it.

Why Minor: this is the non-binding *Rationale* and *Rejected*. No test or code depends on them, and the human's fallback is followed in substance. A plainer wording would be: "a Windows machine, or both systems at once — the game's containers are Linux containers, which rests on the project's own setup, and the paths of Windows are checked by the gate run on the computer where the work is made, which this check does not replace". That drops "a Linux machine is the one the tests of containers are made for". Pointing "built on Linux" at the Dockerfile's `node:24-slim` image would also help.

**m3 — Both commit subjects say more than their diffs do.** Place: `5ae669e8` "… let the comment of the workflow and the README point to D-413 and say only that Docker is installed". Neither the comment nor the README says Docker is installed (see the diff of `tests.yml` and `README.md` in that commit). `7da06c4f` "… a test of containers is skipped only where no daemon answers and there is no Docker Desktop to start, as D-390 gives". D-390 (`:10552`) and `scripts/docker_gate.py:209,222,227` also skip where Docker Desktop was started and no daemon answered within the limit. The task's row 4 (`task.md:107`) has the qualifier "od razu" (at once), and the subject drops it.

Why Minor: the files themselves are right. The comment does not say "only", and on the Linux runner the Docker Desktop path cannot arise. But a reader of `git log` gets a wrong account of what the change says. Neither commit is pushed, so the subjects can still be reworded at no cost to anyone else. Left as they are, they stay in history for good.

## Declined to judge

- Whether loop2 being a public repository should have its own environment fact, now that D-412's *Rationale* leans on "for a public repository". The remarks do not ask for it, and the foundation already says "the repository is public" (`decisions.md:9971`) and rests an invariant on it (`invariants.md:1284`). Set aside as outside the correction.
- The README pointing to D-413 by number without its question. The remarks and the handoff ask the question only of the comment. Set aside as not asked.

## Checks

| Command / method | Exit / what it showed |
|---|---|
| `git rev-parse HEAD`; `git log` and `git diff 4923dd0e..7da06c4f` | 0; head `7da06c4f…`, 2 commits, 4 files |
| `curl -sS` of `data/reusables/gated-features/secret-scanning.md` at `d59b2631…` (raw.githubusercontent.com) | 0; the list item quoted under r3 |
| `curl -sS` of `content/code-security/concepts/secret-security/secret-scanning.md` at `d59b2631…`, searched for `How can I access` / the reusable | 0; lines 95 and 97 |
| `git grep -n -i "secret protection" -- . ':!.the-way'` | 1 (no match); positive control `git grep -c "secret scanning"`: 2 + 4 hits |
| `git grep` for the old wordings (`built-in scan`, `odpowiada demon`, `daemon of a Linux machine answers`) | the only hits are the new comment line and code/test docstrings about skips; no old claim left |
| `npm test -- tests/quality/test_ci_workflow.py` | 0; 11 tests OK. Its `decision:` lines (`:57-151`) quote D-413's binding sentences and D-412's second sentence, none of which the range changes |
| `git grep -l "D-412\|D-413" -- tests scripts` | only `tests/quality/test_ci_workflow.py` quotes them |
| `python -B .the-way/elements/common/foundation_check.py` | 0; `0 errors`. Its doc, `foundation_check.py:73-79`, says it checks each `decision:` quotation against the binding sentences |
| Manual: the comment's and the README's sentence on a skip against `scripts/docker_gate.py:181-238` and D-390 | matches as a sufficient condition; the Docker Desktop timeout path is not mentioned (m3 for the commit subject only) |
| Manual: "the log of a run shows whether those tests ran" against `.the-way/gate/run_tests.py:54-59` and `reports/ci-run1.log`, `reports/ci-run2.log` | `skipped:` lines are printed with their reason; 4 each, none about Docker |
| `git status --short` before and after | empty both times; the reviewed worktree is unchanged |

Not run: the full gate (`npm test` with no argument), by the handoff; `check_instructions.py`, because the range touches no instruction file; a CI run.

## Reach beyond the dispatch

- `foundations/decisions.md` D-14 (`:394-407`), D-263 (`:6623-6641`), D-390 (`:10550-10565`), each whole: the handoff named D-14 and D-263, and D-390 was needed for point 3.
- `foundations/environment_facts.md:834-862`, the GitHub facts D-412 and D-413 name, to check *Based on* against *Rationale*.
- `.the-way/elements/environment-facts/template.md`, whole, for the form of the new fact.
- `scripts/docker_gate.py:1-17,181-238`, `scripts/test.py` whole, `.the-way/gate/run_tests.py` (searched for `skip`): point 3 and m1.
- `Dockerfile:1-5` and `tests/deploy` (searched for `Dockerfile|"build"`): r1.
- `reports/ci-run1.log`, `reports/ci-run2.log`, searched (counts of `skipped:`, `no Docker daemon answers`, `Production image sha256`) and `skipped:` lines of run 1 read: m1.
- `reports/review-return-report.md:49-73` (r1-r3 as written): to know what each remark addressed.
- `task.md`, searched for `Secret Protection|Linux|Settlements`, and lines 95-107 read: the task's own wording and rows 3-4.
- `foundations/decisions.md:9971`, `foundations/invariants.md:1284` (search for "public repositor…"): Declined to judge.
- `.the-way/elements/common/foundation_check.py:68-79`: what the check compares for `decision:` lines.

## Working copies

`.runs\review-correction-1\` held the two fetched GitHub docs files (`reusable.md`, `page.md`). It is removed (`Test-Path` false). Nothing of it is kept in `reports/`, because this report quotes what it needed. No worktree or clone was made.

## Unread material

- `.runs/task-cycles/ci-przy-pr/task.md`: only searched and lines 95-107 read, because the remarks and the handoff carry the scope.
- `reports/review-whole-report.md`: not opened (context only; the handoff says not to repeat it).
- `reports/review-fix-report.md`: not opened. Finding n2 is known from the remarks, the author's handoff and the author's report.
- `reports/review-return-report.md`: lines 49-73 read, the rest not.
- `reports/ci-run1.log`, `reports/ci-run2.log`: searched only.
- `scripts/docker_gate.py`: lines 1-17 (grep) and 181-238 read, the rest (locks, state file) not.
- The GitHub docs page `secret-scanning.md`: searched only. The reusable file was read whole.

## Searches not found or unclear

- `git grep -i "secret protection"` outside `.the-way`: no match (positive control found "secret scanning").
- A source that GitHub's Windows runner cannot run Linux containers: not looked for again. The earlier review and the author found none, and D-413 claims none.
- A first attempt to combine several searches in one PowerShell line failed to parse because of quoting (exit 1). It was redone with the Grep and Read tools, which found what is reported above.
