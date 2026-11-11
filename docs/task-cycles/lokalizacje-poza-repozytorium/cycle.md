# Cycle record — loop2: miejsca z dysku Mariusza z plików repozytorium do pliku lokalizacji ~/.the-way/locations.json

- Task source: the task document in the author's private notes (`_zadania/zadanie_loop2_lokalizacje_poza_repozytorium.md`), `Status: ready for cycle`, settlements accepted 2026-11-09; frozen copy `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`
- Task relation: independent
- Product repository: loop2 (github.com/mariusznazar/loop2)
- Process pin: `e3825a82386a61930a86f8517fc0c5f422fc2833` at start; moved to `52f8164a354ee1a704af0d58add2f3be8e4f0247` by commit `8c7fe66` in the correction after the human's decision on the blocking finding (the task itself did not move it; the move came after the cycle chose its route)
- Target branch and base: main, `211a4ea556d48f5da98fc08380b3c061b9365709`
- Task branch: task/lokalizacje-poza-repozytorium
- Status: request open

## Two questions at start

- Trust boundary: no — the change touches `AGENTS.md`, `foundations/**`, `guidelines/**`, one test comment in `tests/view/` and adds one test; none is among the trust-boundary files the part map names (`assets/icons/**`, `src/browser/sim/saved-game.ts`, `src/server/**`, `package-lock.json`, `deploy/**`).
- Irreversible operation: no — the change edits tracked files and adds a test; it removes paths from the working tree only, history keeps them (task *Out of scope*). The entries in `~/.the-way/locations.json` were written by the human before the cycle.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — the task's questions 1–3 settle which paths go, what stays and that the test comes from the-way; `.the-way/installation/README.md` ("A product whose repository is public…") gives the invariant and the test as a pattern; `.the-way/project-level/backlog_place.md` gives the form of the `## Backlog` lines; settlements 1 and 2 settle the decision and the invariant. The wording of each is no open choice.
- Reserved choice: none
- Execution route and reason: one author without a plan — the change is about a dozen small edits of prose and comments, two foundation entries and one test of about twenty lines, all fitting one agent.
- Author: one author, class `same` as the orchestrator's, because the author writes two foundation entries (a decision and an invariant) through the-way's record skills and edits prose in five files where a mistaken reading of a decision's sense is expensive.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: Claude Code — foreground `Agent` calls block until the agent returns; no polling.
- Whole-change review: a fresh reviewer (class `same`), `review-change`, range `211a4ea..a4b9197`; first line `FAIL a4b91978ede3f6393661e4674dba6e35bad92526`, `reports/review-whole-report.md`; 7 files, 59 insertions and 12 deletions (`AGENTS.md` 3/3, `foundations/decisions.md` 16/1, `foundations/invariants.md` 11/1, `guidelines/testing.md` 4/4, `tests/agent_workflow/test_tracked_file_private_paths.py` 22/0, `tests/deploy/deploy_script_support.py` 1/1, `tests/view/scene-picture.test.mjs` 2/2); items 1–6 and both settlement rows met, item 7 not met (F1); no plan, so no slice.
- Review rounds: whole change, `211a4ea..a4b9197`, `reports/review-whole-report.md`: blocking F1 (item 7: 12 hits the class `[:space:]` between double brackets read as note links, test red; Important) and F2 (`Violated: no` while the test fails; Important); Minor M1 (source of the link clause), M2 (no time limit). One fix `a4b9197..c83ae63` (`ba9782c`, `c83ae63`, `reports/fix-report.md`) fixed F2, M1 and M2 together in one round; F1 was returned unfixed by the orchestrator's instruction (every way out is a pin move, an exception of loop2's own or a change of text that mirrors a deployed script, all outside the task). Review of the fix by the same reviewer: `PASS c83ae6302a7fd7b53a2c067df7209909dbf8cd8a`, `reports/review-fix-report.md`, no new Critical or Important finding; F1 remains open by design. No Minor fix was reverted. After the human's decision, correction `8c7fe66..b58ce12` (pin move by the orchestrator, then `50e7a57` and `b58ce12` by the author, `reports/correction-report.md`), reviewed by the same reviewer over `5317955..b58ce12`: `PASS b58ce12e65b68583f0a4aa5e054dfd551850ddfe`, `reports/review-correction-report.md`; F1 and F2 closed; no new Critical or Important finding; Minor M3 (the wording of the TODO in *Rests on* of `cross-part-imports` carries history) and M4 (it does not say which kind of fact is meant) left unfixed, to the request's list.
- Weakest-point checks: author — item 7 ("after items 1–6 the new test passes"); the command and the test file after each stage; showed 22 hits before the edits (exit 1) and 12 after (exit 1), all the class `[:space:]` between double brackets in Markdown; `reports/author-report.md`. After the fix: test `OK (expected failures=1)`, the command still exit 1 with the same 12 hits; `reports/fix-report.md`.

The last commit of a discarded attempt or of a slice returned too large is a historical name, not
a link to follow: the commit is reachable only until the reflog expires. A choice or ruling of a
discarded attempt keeps its row in the questions table, with *Used by* naming the discarded
attempt.

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|
| Q1 | Author: 13 hits remain after items 1–6 — 12 the class `[:space:]` between double brackets in Markdown (two copies of `backup_and_restore.md`, `foundations/environment_facts.md`) and the the Git Bash form of a drive path docstring of `tests/deploy/deploy_script_support.py:130`. How to clear them? | (a) The docstring: reword it so it holds no Git Bash path, a docstring change with no behaviour (the smallest change; the other way, naming the file in the invariant, would let a real path pass in that file). (b) The 12 Markdown hits: do not edit them and add no exception. They mirror a block of the deployed script `deploy/loop2-deploy`; `foundations/environment_facts.md` quotes it word for word (WAY-323 *Rejected*: the quote cannot be reworded). They entered `main` on 2026-11-11 (`76120d8`, `08f7a06`), after the 2026-11-09 trial the task rests on (zero the class `[:space:]` between double brackets at `2fe922c`). The test stays red; the cycle ends as a blocked draft request with the choice for the human. | `git log -S` dates above; `git show 2fe922c:` counts 0; `WAY-323` in the pinned `foundations/decisions.md`; the task's Q3 ("bez wyjątków na fałszywe trafienia"), Q4 (no pin move) | name the three files in the invariant sentence — contradicts the task's answer to Q3 and, for `foundations/environment_facts.md`, skips a whole foundation file; rewrite the mirrored shell blocks — changes a deployed script and a verbatim quote, outside the task | if the human would rather accept a named-file exception, one sentence of the invariant changes; if the-way script is fixed and the pin moved, the test turns green with no change here | the request's blocked state |
| Q2 | Pin move: `foundation_check.py` reports a bare `TODO` in *Rests on* of `cross-part-imports` (invariants.md, since 842beb7); what to write? | Write that the fact is not named in the foundation and the human is to name it and its source, in the form `TODO — …`; no fact is invented | `git show 842beb7` names no fact; no entry of `foundations/environment_facts.md` bears on it | guess a fact from the test's reading of imports — an unsourced fact in the foundation | the human reads a wrong fact as settled | the correction |
| Q3 | Return step report: its handoff-named `foundation_step.md` was read earlier in the cycle, not re-read for this step; other decisions, invariants, glossary were not read whole. Does the gap bear on anything it judged? | Autonomous choice: no — the author is the same agent that did the foundation step with that file read whole earlier in this cycle, and its judgments are a comparison of four named entries with code, each read whole; the reviewers' gaps (decisions screened by title) are carried to the request as an item | `reports/return-report.md` **Unread material** | resume the author to re-read the file — a repeat of a reading it made | an entry compared without the rule read again | the return step |

Only on the planned route, one row per slice, made in the plan's order. Where the plan lists
foundation entries, a row `Foundation entries` comes first, with its agent and head; it shares
slice 1's base, written before that agent is dispatched, so whichever review judges slice 1 covers
the entries. Write each base before the slice's executor is dispatched. The class is the one the
plan's *Model* sets, and *Risk* the plan's mark, which decides whether the slice gets a review of
its own. The mechanical check is the orchestrator's after the executor returns: what it compared and
any mismatch it passed to the review that judges the slice; a retry one class higher names the
failed executor's last commit, the failure and the retry's class (WAY-229). A slice without a review
of its own reads `judged by the whole-change review` in the last column.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-11-11 | Start | orchestrator (Sonnet 5.5) | step 4–5 | `cycle.md`, `task.frozen.md` | pin `e3825a8` already contains WAY-320, `backlog_place.md` and `tracked_private_paths_check.py`; locations file holds `loop2` entries `projects` and `tasks`; branch and worktree made from `origin/main` `211a4ea`; base checks recorded under Verification; route: one author |
| 2026-11-11 | Author | one author, class `same` (Sonnet 5.5, harness default model) | `make-change`, "the whole change as the one author"; `reports/author-handoff.md` | `reports/author-report.md` | dispatched; next: mechanical check, review of the whole change |
| 2026-11-11 | Author returns | one author | `reports/author-report.md` | `a71321b`, `e11b8da`, `f6d19ce` | status `questions`: the new test is red, 13 hits that are no path or link remain; orchestrator verified the 13 hits by running the pinned command (exit 1); answers below (Q1); author resumed |
| 2026-11-11 | Author returns (resumed) | one author | `reports/author-report.md` | `a71321b`, `e11b8da`, `f6d19ce`, `a4b9197` | `done with concerns`; mechanical check: clean tree, non-empty range, 7 files (AGENTS.md, foundations/decisions.md, foundations/invariants.md, guidelines/testing.md, tests/agent_workflow/test_tracked_file_private_paths.py, tests/deploy/deploy_script_support.py, tests/view/scene-picture.test.mjs) match items 1–7 and both settlements; sections Unread material, Searches not found or unclear and own-work check present; test red with 12 hits |
| 2026-11-11 | Whole-change review | fresh reviewer, class `same` | `review-change`, whole change; `reports/review-whole-handoff.md` | `reports/review-whole-report.md` | dispatched |
| 2026-11-11 | Whole-change review returns | reviewer | `reports/review-whole-report.md` | head `a4b9197` | `FAIL a4b9197…`: F1 Important (item 7: 12 the class `[:space:]` between double brackets hits, test red; ways out all need a human), F2 Important (`Violated: no` while the test is red), M1, M2 Minor; 59 insertions, 12 deletions in 7 files; all four within the task |
| 2026-11-11 | Fix | one author resumed, class `same` | `make-change`, "the fix of a review's findings"; `reports/fix-findings.md` | `reports/fix-report.md` | dispatched: F2, M1, M2 fixed; F1 returned unfixed by the orchestrator's instruction |
| 2026-11-11 | Fix returns | one author | `reports/fix-report.md` | `ba9782c`, `c83ae63` (range `a4b9197..c83ae63`) | `done with concerns`: F2 (Violated: yes; test marked `expectedFailure` as `elements/invariants/template.md` requires), M1 (second source in *Derives from*), M2 (`timeout=30`) fixed; F1 returned unfixed; `npm test` now green on this test by the marking — to be stated in the request |
| 2026-11-11 | Review of the fix | same reviewer resumed | `review-change`, the fix; message with range and `reports/fix-report.md` | `reports/review-fix-report.md` | dispatched |
| 2026-11-11 | Review of the fix returns | same reviewer | `reports/review-fix-report.md` | `a4b9197..c83ae63` | `PASS c83ae63`; F1 open by design; N1, N2 Minor |
| 2026-11-11 | Gate, stages, record | orchestrator | step 10, 12, `blocked_finding.md` | `.runs/logs/final-npm-test.log`, `stages.md`; copy commits `89b2fb4` (add) and `5317955` (removal), pushed | gate exit 1 with the two base failures only; return step and reconciliation with main skipped by `blocked_finding.md`; record copy cleaned by one rewriting |
| 2026-11-11 | Request | orchestrator | `request_template.md`, variant remaining blocking finding | https://github.com/mariusznazar/loop2/pull/76 | opened as blocked draft |
| 2026-11-12 | Correction starts | orchestrator | human's decision on item 1 of the request: wait for the-way's fix, then move the pin (words in `reports/correction-handoff.md`) | the-way PR #101, commit `52f8164`; branch needed no merge of `main` (no new commits) | the pinned checkout matches the gitlink `e3825a8` before the move |
| 2026-11-12 | Pin move | orchestrator | `.the-way/installation/README.md` "Moving the pin"; installer from a clone of the-way at `52f8164` in the ignored `.runs/`, deleted afterwards | commit `8c7fe66` | the installer changed only the gitlink; the pinned check of tracked files exits 0; `foundation_check.py` exits 1 with one error the old pin did not give (bare TODO in *Rests on* of `cross-part-imports`) |
| 2026-11-12 | Correction | one author resumed, class `same` | `make-change`, "a correction for the human's remarks"; `reports/correction-handoff.md` | `reports/correction-report.md` | dispatched |
| 2026-11-12 | Correction returns | one author | `reports/correction-report.md` | `50e7a57`, `b58ce12` (range `8c7fe66..b58ce12`) | `done with concerns`; mechanical check: clean tree, 3 files changed (gitlink; `foundations/invariants.md` 2 lines; the test 3 deletions), sections present; focused checks exit 0, `foundation_check.py` 0 errors; open: the human names the fact `cross-part-imports` rests on |
| 2026-11-12 | Review of the correction | same reviewer resumed | `review-change`, range `5317955..b58ce12`; message with the correction report | `reports/review-correction-report.md` | dispatched |
| 2026-11-12 | Review of the correction returns | same reviewer | `reports/review-correction-report.md` | `5317955..b58ce12` | `PASS b58ce12`; F1 and F2 closed; no new Critical or Important; Minor M3 (the history parenthesis in the TODO), M4 (the TODO does not say which kind of fact) — left unfixed, to the request's list; the open point of the TODO goes to the request |
| 2026-11-12 | Return step | one author resumed, class `same` | `return_step.md`, `foundation_step.md`; `reports/return-handoff.md` | `reports/return-report.md` | dispatched |
| 2026-11-12 | Return step returns | one author | `reports/return-report.md` | no commit | `done`; nothing to correct; checks at the head: `foundation_check.py` exit 0, tracked check exit 0, new test passes |
| 2026-11-12 | Reconciliation with the target branch | orchestrator | `git fetch origin`, `git log HEAD..origin/main` | no output | `main` has no commit the branch lacks, so there is no merge to make and none to review |
| 2026-11-12 | Gate after the correction | orchestrator | step 10 | `.runs/logs/final2-npm-test.log` | `npm test` exit 1: the same two failures as on the base, nothing else; the new test passes as a plain test; `foundation_check.py` run on its own exit 0 |

Append one row for every dispatch, handoff, failed attempt, rerun, review and fix before the
dispatch that depends on it. Name handoff and report paths and input and output commits, so work
resumes from these files and commits without the conversation. Keep each complete handoff and
report, with secrets and personal data removed, in `reports/`; a short return routes the work and
names failed and unchecked checks and unresolved concerns. Repair an incomplete or missing report
before dependent work, and record corrections to stale paths or commit ranges. Record the evidence
read for a question or finding in the questions table, rather than loading every stage's full
report and sources again. This record is the cycle's only log; no method keeps one beside it.
During work this file, the frozen task, `stages.md`, `spec.md`, `plan.md`, `plan-size.md`,
`request.md` and `reports/` live under the ignored `.runs/task-cycles/<task-slug>/` directory. At the request, copy
that whole directory to `docs/task-cycles/<task-slug>/`, link the reports from these rows, clean
the copy and check it as `task-cycle/skill/SKILL.md` ("The record before it is committed") gives,
commit the copy and commit its removal immediately after; the request links the record by the SHA of
the commit that adds it. A correction after review repeats this pair.

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|

Include questions answered by a binding source as well as new micro decisions. A choice that binds
after the merge is written into the foundation (WAY-36), unless the task or its spec excludes the
entry, as `task-cycle/skill/return_step.md` gives; every other choice is its row here and nothing
else.

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| frozen task | `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md` | orchestrator | not reviewed |
| code and foundation commits | `a71321b`, `e11b8da`, `f6d19ce`, `a4b9197` (range `211a4ea..a4b9197`) | one author | `FAIL a4b9197` (whole change) |
| fix commits | `ba9782c`, `c83ae63` (range `a4b9197..c83ae63`) | one author, resumed | `PASS c83ae63` |
| correction commits | `8c7fe66` (pin move), `50e7a57`, `b58ce12` (range `5317955..b58ce12`) | orchestrator, one author | `PASS b58ce12` |
| reports | `reports/correction-report.md`, `reports/review-correction-report.md`, `reports/return-report.md`, handoffs `reports/correction-handoff.md`, `reports/return-handoff.md`; earlier: `reports/author-report.md`, `reports/fix-report.md`, `reports/review-whole-report.md`, `reports/review-fix-report.md`, handoffs `reports/author-handoff.md`, `reports/review-whole-handoff.md`, findings `reports/fix-findings.md` | agents | see above |
| test logs | a log kept beside the record in the ignored `.runs/logs/` (it holds paths of the author's computer, so the record does not carry it), a log kept beside the record in the ignored `.runs/logs/` | orchestrator | see Verification |
| stages | `stages.md` | `cycle_stages.py` | not applicable |

Include the frozen task, `spec.md` where one was written, `plan.md` and `plan-size.md` only where
planning ran, code commits, tests and full agent reports, the report of a discarded attempt or
of a slice returned too large among them. Name commits and commit ranges instead of copying diffs
or files that git holds. A foundation entry the cycle writes lives in its commits; the report of
the agent that wrote it keeps its meaning sentences and its mark, and `request.md` takes them from
there.

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| `npm test` (base, before any change) | orchestrator, `211a4ea`, worktree with `npm ci`, Windows 11 | exit 1; build and 2041 Node tests pass (0 fail), `tests/quality` fails with 2 errors; the closing stage `foundation_check.py` was not reached; log a log kept beside the record in the ignored `.runs/logs/` (it holds paths of the author's computer, so the record does not carry it) | already failing on base: `test_ruff_source_rules` and `test_shellcheck_source_rules` in `tests/quality/test_quality_invariants.py` (FileNotFoundError: the tool is not installed on this computer) |
| `python -B .the-way/elements/common/foundation_check.py` (base) | orchestrator, `211a4ea` | exit 0, `0 errors` | none |
| `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (base) | orchestrator, `211a4ea` | exit 2: `foundations/invariants.md holds no invariant tracked-file-private-paths` (the invariant is what the change writes) | not applicable on base |
| `npm test` (after the fix, reviewed head `c83ae63`) | orchestrator, worktree with `npm ci`, Windows 11 | exit 1; build and 2041 Node tests pass (0 fail); `.the-way/gate/run_tests.py`: 544 tests in 4 directories, `tests/quality` fails with 2 errors; the new test shows `OK (expected failures=1)`; the closing stage `foundation_check.py` was not reached; log a log kept beside the record in the ignored `.runs/logs/` | the same two checks that fail on the base, `test_ruff_source_rules` and `test_shellcheck_source_rules`; `foundation_check.py` unchecked by the one command |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed head `c83ae63`, run on its own because the one command stops before it) | orchestrator | exit 0, `0 errors` | none |
| `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (head `c83ae63`) | orchestrator | exit 1; 12 listed, all the class `[:space:]` between double brackets as note link, in `.claude/skills/loop2-deploy/references/backup_and_restore.md` (lines 211, 224), its copy under `.agents/skills/`, and `foundations/environment_facts.md` (lines 39, 52); the nine paths of the task and the `/c/` docstring are gone | this is finding F1, left open for the human; the test of it is marked as an expected failure |
| `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` before the fix (head `a4b9197`) | one author | exit 1, `FAILED (failures=1)` with the 12 hits (the author's failing run of the invariant's test); before items 1–6, with only the invariant and the test added to the base, exit 1 with 22 hits | failing run of the invariant's test |
| `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` after the fix (head `c83ae63`) | one author, reviewer | exit 0, `OK (expected failures=1)` | the passing run is a pass of the expected failure, not of the rule |
| `python -B .the-way/task-cycle/review_reminder.py origin/main` | orchestrator | exit 0; `merges: 73`, `threshold: 30`, `reminder: yes` | none |
| `npm test` (corrected tree, head `b58ce12`, pin `52f8164`) | orchestrator, worktree with `npm ci`, Windows 11 | exit 1; build and 2041 Node tests pass (0 fail); `.the-way/gate/run_tests.py`: 544 tests in 4 directories; the new test `tests/agent_workflow/test_tracked_file_private_paths.py` passes as a plain test; only `tests/quality` fails, with 2 errors; the closing stage `foundation_check.py` was not reached; log kept in the ignored `.runs/logs/` (paths of the author's computer, so the record does not carry it) | the same two checks that fail on the base, `test_ruff_source_rules` and `test_shellcheck_source_rules` (the tools are not installed on this computer); `foundation_check.py` unchecked by the one command |
| `python -B .the-way/elements/common/foundation_check.py` (corrected tree, head `b58ce12`, run on its own) | orchestrator | exit 0, `0 errors` | none; on the first commit of the move of the pin it reported one error (a bare `TODO` in *Rests on* of `cross-part-imports`), which the correction answered |
| `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (head `b58ce12`) | orchestrator, author, reviewer | exit 0, 0 listed, 435 files | none; the 12 hits of the first run are gone under the new pin |
| `python -B .the-way/task-cycle/review_reminder.py origin/main` (after the correction) | orchestrator | exit 0; `merges: 73`, `threshold: 30`, `reminder: yes` | none |
| `python -B .the-way/task-cycle/cycle_stages.py 39cd3ade-fa17-425c-8ab4-30a7dfca4f85 --output .runs/task-cycles/lokalizacje-poza-repozytorium/stages.md` | orchestrator | exit 0, no warnings | none |

Record the checks already failing on the base apart from the runs after the change. Where the task
moved the pin, record the gate on the commit that moved it apart as well, naming each check that
fails there and passed on the base: that is work the task carries. An executed
check is its command and exit code, with its result in one line; a report missing either returns
to its agent for repair, and a claim that tests passed does not replace them. A manual check
records its method, actor, observed result and evidence, with `not applicable` for the command and
exit code. Focused checks are not rerun merely to advance the cycle. The orchestrator runs the gate
on the tree that goes into the request and records its command, exit code and the failures it
names. Name every check that failed or did not run, with the reason; an unrun check is unchecked,
never passed. Each failing run of a check remains in the record with its command and result, even
if the check passes when run again. A check that fails in a cycle run and passes when run again
follows the product's rule on flaky tests (the testing guidelines' *Flaky tests*, WAY-243): rerunning
serves only to diagnose what makes it flaky, never to make a gate run pass. Apply this rule even when
the product has no *Flaky tests* section in its guidelines. When a check has both a failing and a
passing run during the cycle, the request lists it under *Checks* as failed, with the rerun result
and the number of cycle runs in which it failed and passed. When preparing the request, recover the
task's parts from its frozen task and changed files through the part map; if the check's file belongs
to a different part, list it beside findings outside the task's scope (WAY-261). Keep that classification
as evidence with the check, not as a separate record of selected parts. For an invariant's test the
change writes, record its failing run and its passing run as the author reports them.
For a UI change, record the author's or executor's state check and screenshot inspection: affected
components and states, method, observed result and evidence. The evidence of a screenshot is the
address of the place where it lies, never the file, which the record's copy must not hold
(WAY-316); where the foundation settles no place for screenshots, record that the screenshot was
inspected and kept nowhere (WAY-317). Carry a screenshot unchecked for no settled route, or a failed
settled route with its actual result, to the request; code inspection does not establish rendered
appearance.

## Return step

- Foundation compared with code: run after the correction, on the code the review accepted (`b58ce12`), by the one author resumed, `reports/return-report.md`, status `done`, no commit: D-362, D-82, the invariant `tracked-file-private-paths` and the source line of `action-duration-minimum` match the code; the part map needs no line; a search found nothing that contradicts D-362 (D-13 agrees); nothing no longer matched, so no correction.
- Decisions written or changed: D-362 (new), D-82 (worded without a path), written by the one author through the record skills with the change, not by a return step
- Invariants written or changed: `tracked-file-private-paths` (new, set by settlement row 2 and D-362; `Violated: yes`); `action-duration-minimum` (its *Derives from* worded without a path; the rule is unchanged)
- Environment facts: none written; the author judged the locations file and the check to be features of the process the product pins, not a source outside the product (a judgment; the report says no rule settles it)
- Glossary terms: none
- Part-map changes: none
- Projected entries written whole or in part: none
- Rows of *Settlements to record* written: row 1 as D-362; row 2 as `tracked-file-private-paths`

The return step corrects in the same change whatever no longer matches. It writes an invariant
only for a rule the task, a decision or the human sets, never for behaviour merely because no
invariant covers it.

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/76 — opened as a blocked draft, ready for review after the correction
- Description (first, blocked, version): `request-first.md` beside this record, written by `task-cycle/skill/request_template.md` in its variant for a remaining blocking finding; form check `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/lokalizacje-poza-repozytorium/request.md --task .runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`, last exit 0, 2 runs; private paths on the description exit 0, 2 runs; on the copy of this record exit 0 (2 runs), image check exit 0 (1 run), remarks check on the copy exit 0 (1 run) and on the original exit 0 (3 runs)
- Description after the correction: `request.md` beside this record, written by `task-cycle/skill/request_template.md` in its variant for a correction; written and checked after this commit
- Writes to the task's backlog entry: none — the rulebook gives no form for a request link or a state after `Ready`, so the line was not touched
- Process remarks on the-way:
  - Author, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/author-report.md: The name of the task note for *Origin* is in the cycle record only; I did not open the vault to confirm it.
  - Author, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/author-report.md: The task expected the-way's correction (question 3) to leave no false hits; the pinned commit still lists the class `[:space:]` between double brackets in Markdown. Those 12 hits entered `main` on 2026-11-11, after the 2026-11-09 trial the task rests on (the orchestrator's account; I did not verify the dates).
  - Fix, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/fix-report.md: No file or entry of loop2 uses `Violated: yes` yet, so I had no example of the marking in this repository; I followed the template ("such as `expectedFailure`").
  - Fix, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/fix-report.md: I did not verify the dates of the lines that bring the class `[:space:]` between double brackets (the reviewer did not either).
  - Review of the fix, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-fix-report.md: No other entry of loop2 reads `Violated: yes` with an `expectedFailure` test to compare against (the existing `yes` entries in `tests/invariants/test_cross_part_imports.py` are test fixtures, not entries); I judged the marking by the template alone.
  - Review of the fix, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-fix-report.md: Unclear: whether the template wants the request to name the change in the commit message as well; it says "in its request", which is the orchestrator's step.
  - Whole-change review, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-whole-report.md: I found no rule saying whether a test of an invariant in `tests/agent_workflow/` needs an entry in the Trust boundaries table or elsewhere in `guidelines/testing.md`; I took it that it does not (the invariant is not a trust boundary).
  - Whole-change review, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-whole-report.md: The dates of commits `76120d8` and `08f7a06` were not looked up by me.
  - Whole-change review, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-whole-report.md: Unclear: whether D-362 is meant to cover note links (M1); the task's row 1 does not say, the README's wording for *Derives from* suggests it.
  - Correction, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/correction-report.md: The fact that `cross-part-imports` rests on: the orchestrator says it is named nowhere in the foundation. My own search was only a grep of the headings of `foundations/environment_facts.md` for "import", "module" and "resolution", which found one heading, `browser-bare-import-resolution` (line 738); I did not read it whole and I do not claim it is or is not the fact. I did not guess one. The human (or a reader of that fact) can say.
  - Correction, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/correction-report.md: None other.
  - Return step, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/return-report.md: A decision, invariant or fact of loop2 that places the task list or a project folder anywhere but D-362 and D-82: none found.
  - Return step, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/return-report.md: A reading of the-way's rule on whether a convention of the pinned process (the locations file) is an environment fact: I found no rule that says it is or is not; I took the pin as the process's own, as above.
  - Review of the correction, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-correction-report.md: I did not find a fact in `foundations/environment_facts.md` for the reading of imports (the orchestrator says none is named); I looked by heading only and cannot rule one out beyond that.
  - Review of the correction, .runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-correction-report.md: Unclear: whether WAY-71's "puts it before the human" asks for a form of its own in the request; that is the orchestrator's step, I only note that the open `TODO` has to be named there.
