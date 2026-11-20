# Cycle record — loop2: the word "key" instead of "entry" for a name in the locations file — AGENTS.md, D-362 and the invariant tracked-file-private-names, after the pin of the-way moved

- Task source: the task's note in the author's backlog, `status: ready for cycle`, updated 2026-11-20; frozen copy `.runs/task-cycles/locations-key-wording/task.md`
- Task relation: independent
- Product repository: loop2 (github.com/mariusznazar/loop2)
- Process pin: `19e5774aed6d1d628042e23deccc110ed9f112c0` (unchanged; the task does not move it)
- Target branch and base: `main`, `ba67f04503afc56dc965bd197897b0a8f2adbeae`
- Task branch: `task/locations-key-wording`, worktree `.runs/worktrees/locations-key-wording`
- Status: request open

## Two questions at start

- Trust boundary: no — the change touches `AGENTS.md` (part `agent-workflow`) and `foundations/**` (part `product-foundation`); neither takes in data from the network, keys, the deployment or files from outside.
- Irreversible operation: no — wording of three texts.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — the task's *Settlements to record* row 1 settles which "entry" of D-362 changes (a name under `loop2` in the locations file) and which stays (an entry of the foundation); question 2 of the task settles the scope. Which sentences change is listed in the task item by item; no way is left open.
- Reserved choice: none
- Execution route and reason: one author without a plan — three files, a word swap with a rule for which occurrence changes, no division needed.
- Author: `the-way-author`, class `same` as the orchestrator's (Sonnet 5.5), not `cheaper`: the author writes a decision and an invariant through the record skills of the-way and must keep the checks of `foundation_check.py` (including the length check of decisions) green, which is more than a word swap in one file. Resumptions: see Events.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: Claude Code completion notification of a background agent; no limit reached.
- Whole-change review: `the-way-stage` on Opus, by `review-change`; range `ba67f045..02526a59`; first line `PASS 02526a59518c26eb60e5ed91f26a91040b523618`, report `reports/review-whole-report.md`; 3 files, 7 added and 7 removed lines; every *To do* item, settlement row 1 and the answers of the task checked word by word; no Critical, Important or Minor finding; the reviewer read the author's unread items and none bears on the change.
- Review rounds:
  - review `reports/review-whole-report.md`, PASS: the review of the whole change, range `ba67f045..02526a59`, no findings, so no fix and no findings file.
- Weakest-point checks: author — requirement that every "entry" meaning a name in the locations file changes and none meaning an entry of the foundation does; the word diff of the range shows 18 swaps and nothing else (`reports/author-report.md`); confirmed by the reviewer's own word diff and `git grep` (`reports/review-whole-report.md`).

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

Not applicable — one-author route.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-11-20T15:09Z | start | orchestrator, Sonnet 5.5 | `.the-way/task-cycle/skill/SKILL.md` read whole; task `ready for cycle`, no human actions | worktree `.runs/worktrees/locations-key-wording`, branch `task/locations-key-wording` from `ba67f045` | `remove_merged_worktrees.py --apply --target main --no-fetch` after a dry run: exit 0, removed `.runs/worktrees/skrocic-wpisy-ponad-limit`; kept directories needing a human decision: none |
| 2026-11-20T15:15Z | one author | `the-way-author`, Sonnet 5.5 (class `same`) | handoff `reports/author-handoff.md`; method `make-change`, whole change as the one author; frozen task, D-362, invariants `tracked-file-private-names` and `tracked-file-private-paths`, D-13, parts `agent-workflow` and `product-foundation` | report `reports/author-report.md` | `done`; commits `aacbbf16` (AGENTS.md), `68745036` (D-362), `02526a59` (invariant); `foundation_check.py` exit 0, 0 errors; `check_instructions.py` exit 0, 0 error, 149 warn; no `npm test` by design. Unread: glossary of the-way read by heading only, D-13, part map, `examples.md` of two elements; search not found: a glossary entry for "key" |
| 2026-11-20T15:25Z | mechanical check | orchestrator | worktree, range `ba67f045..02526a59` | own check of `git status`, `git log`, `git diff --stat`, word diff | clean tree, 3 commits, files `AGENTS.md`, `foundations/decisions.md`, `foundations/invariants.md` (7 + / 7 −), exactly 18 word swaps, no entry-of-the-foundation use changed; the author's unread items bear on nothing it judged (the task gives the wording) — autonomous choice, the review of the whole change gets them as a gap to judge |
| 2026-11-20T15:35Z | whole-change review | `the-way-stage`, Opus (`model: opus`, per the user's delegation, Q1) | handoff `reports/review-whole-handoff.md`; method `review-change`, range `ba67f045..02526a59`, frozen task, author's report | report `reports/review-whole-report.md` | first line `PASS 02526a59518c26eb60e5ed91f26a91040b523618`; Critical none, Important none, Minor none; `foundation_check.py` exit 0 (0 errors), `check_instructions.py` exit 0 (head 149 warn, base 249 warn in a worktree lacking `.the-way`/`.runs`, every head warning also on base); 2 decisions read whole (D-362, D-13); author's unread items read by the reviewer, none bears on the change; no fix; next: return step |
| 2026-11-20T15:40Z | return step | `the-way-author` resumed, Sonnet 5.5 (class `same`) | handoff `reports/author-return-handoff.md`; `task-cycle/skill/return_step.md` | report `reports/author-return-report.md` | `done`, no commit: no glossary entry for "key" (field meaning), no environment fact, no part-map change; no review of the return step since nothing was committed |
| 2026-11-20T15:45Z | step 12 preparation | orchestrator | `git fetch`; `git log HEAD..origin/main` | none | `origin/main` has no commit beyond the base: no renumbering of decisions, no merge; `cycle_stages.py` exit 0 → `stages.md`, `cycle_measures.py` exit 0 → `mechanism_measures.md` (session `4bedb17d-489a-46c1-aa1f-411727050289`); `review_reminder.py origin/main` exit 0: tag `foundation-review/2026-11-13`, 47 merges, threshold 60, `reminder: no`
| 2026-11-20T15:55Z | request | orchestrator | `request.md`; `request_check.py` exit 0, `private_paths_check.py` exit 0 | https://github.com/mariusznazar/loop2/pull/163 | `git push origin task/locations-key-wording`, `gh pr create --draft`; next: record copy, cleaning and checks, then the pair of commits, CI wait |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q1 | Which model class runs the reviewers? Source: the user's delegation in the start message ("recenzentów na najmocniejszej klasie uruchamiaj z model: opus") | every review is dispatched with `model: opus`, the strongest model the user names for reviews; the session's Agent tool offers `sonnet`, `opus`, `haiku`, `fable` and no `availableModels` list was read | the start message of the user | choosing a model by the name of the family's strongest | a review on a weaker model than the user's instruction allows | whole-change review, reviews of fixes and of the return step |
| Q2 | Does the cycle run the full gate on this computer? Source: step 10 and the user's instruction "przed KAŻDĄ pełną bramką testów napisz to i czekaj na sygnał start od doradcy dnia" | CI runs on a request into `main` (`.github/workflows/tests.yml`, event `pull_request`), so CI is the final gate and no full local gate is run; if CI gives no result in 30 minutes, the local run waits for the advisor's start signal first | `.github/workflows/tests.yml` | running the gate locally before the request | an unneeded full run of the gate | step 10, step 12 |
| Q3 | Checks failing on the base. Source: step 4 | the base `ba67f045` is a merge whose tree (`9db2608a…`) equals the tree of the head of the merged branch `ae6291b8`; that branch holds no cycle record, but the request #162 reports the CI run on it: `gh pr checks 162`: `tests pass` (run 44755500041). The list of tests failing on the base is empty; no gate run on the base | `git rev-parse ba67f045^{tree} ba67f045^2^{tree}`, `gh pr checks 162` | a full run of the gate on the base | a failing test on the base taken for a fault of the change; the diagnosis run of step 4 covers it | step 12 |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| frozen task | `.runs/task-cycles/locations-key-wording/task.md` | copy of the task document at 2026-11-20 | — |
| commit | `aacbbf16` — `AGENTS.md`, three lines of `## Backlog` | `the-way-author` | `PASS` of the whole-change review |
| commit | `68745036` — D-362 | `the-way-author` | `PASS` of the whole-change review |
| commit | `02526a59` — invariant `tracked-file-private-names` | `the-way-author` | `PASS` of the whole-change review |
| report | `reports/author-report.md`, `reports/author-return-report.md`, `reports/review-whole-report.md` | author, author (return step), reviewer | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| list of tests failing on the base | orchestrator, base `ba67f045` (tree equal to the tree of `ae6291b8`, the head of merged #162) | taken from `gh pr checks 162`: `tests pass`, `https://github.com/mariusznazar/loop2/actions/runs/44755500041/job/136354036107` — empty list; the final gate of the merged branch ran in CI | none |
| `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`) | orchestrator, head `02526a59` | exit 0, `0 errors`, no `listed:` line | none |
| `python -B .the-way/instruction-files/check_instructions.py` | author and reviewer, head `02526a59` | exit 0, `0 error, 149 warn, 7 info`; the reviewer's run on a worktree of the base: every head warning also stands on the base | none |
| `python -B .the-way/task-cycle/change_file_sizes.py ba67f045 02526a59` | reviewer | exit 0, no file changed size | none |
| the final gate | CI on the request's last head | the final gate is the CI run on the request's last head; the cycle has no local time of it; its result stands in *Checks* of the request's description, not in this copy | not yet run |

## Return step

- Foundation compared with code: D-362, invariant `tracked-file-private-names` and the three lines of `## Backlog` in `AGENTS.md` all say "key" for a name under `loop2` in the locations file, and the pinned the-way's own `AGENTS.md` says the same; the entries that stay use "entry" for an entry of the foundation, as the-way's glossary gives it; the part map of `agent-workflow` and `product-foundation` needed no change. Corrections: none (`reports/author-return-report.md`).
- Decisions written or changed: D-362 (changed in the foundation step)
- Invariants written or changed: `tracked-file-private-names` (set by the task's question 2 and *To do* item 3)
- Environment facts: none
- Glossary terms: none — "key" for a name in a JSON file is the field's own meaning (WAY-95)
- Part-map changes: none
- Projected entries written whole or in part: none
- Rows of *Settlements to record* written: row 1 → D-362 (sentence of D-362), commit `68745036`

The return step committed nothing, so no review of it ran.

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/163, draft until the CI run of the last head ends
- Description: `request.md` beside this record; form check `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/locations-key-wording/request.md --task .runs/task-cycles/locations-key-wording/task.md` exit 0, 1 run; private-paths check on it exit 0, 1 run; the record's link and the runs of the three checks on the copy are added after this commit
- Writes to the task's line in the backlog: none
- Working copies left: none
- Directories of earlier tasks kept: none
- Corrections after the request opened: none
- Process remarks on the-way:
  - one author, `.runs/task-cycles/locations-key-wording/reports/author-report.md`: A glossary entry for "key" in the pinned the-way glossary: not found by heading search (`^## key`), so the meaning of "key" used here (a name in the locations file, which the pinned the-way itself uses: "the key `tasks` under `the-way`") rests on the-way's own `AGENTS.md`, not on a glossary entry.
  - whole-change review, `.runs/task-cycles/locations-key-wording/reports/review-whole-report.md`: A glossary entry for "key": none in `.the-way/foundations/glossary.md` (headings 7-223) and none in `foundations/glossary.md`. The meaning rests on the-way's decision at `.the-way/foundations/decisions.md:8350-8378`.
  - whole-change review, `.runs/task-cycles/locations-key-wording/reports/review-whole-report.md`: `decision_index.py --decision 362` found no decision: the switch takes the identifier with its prefix, `D-362`.
  - whole-change review, `.runs/task-cycles/locations-key-wording/reports/review-whole-report.md`: `git grep` for "entry" near the three names or the locations file outside `.the-way`: nothing found, as expected after the change (positive control above).
