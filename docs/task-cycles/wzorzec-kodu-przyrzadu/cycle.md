# Cycle record — loop2: rodzaj kodu i plik-wzorzec dla przyrządu balansu w wytycznych kodowania

- Task source: the task document in the author's private backlog; accepted by the human through the day advisor 2026-11-20 (plan change log, sha256 e260df7ef7ddf3d6 of the accepted text); the frozen copy `task.md` beside this record has sha256 7f7aa629998d1a2c (the vault holds the file uncommitted, so the difference to the accepted hash cannot be traced; reconciliation below)
- Task relation: plan item: plan_projektu_2_loop2.md — wzorzec-kodu-przyrzadu
- Product repository: https://github.com/mariusznazar/loop2
- Process pin: `19e5774aed6d1d628042e23deccc110ed9f112c0`
- Target branch and base: `main`, `4ee41c5f1d54172f646172da9b3f248dcaf5755e` (origin/main after fetch; local main stood on `ba67f045`)
- Task branch: `task/wzorzec-kodu-przyrzadu` (worktree `.runs/worktrees/wzorzec-kodu-przyrzadu`)
- Status: request open

## Two questions at start

- Trust boundary: no — the part `balance-tools` has `Trust boundary: none`; the change touches `balance/**`, `tests/balance/**` or new tests of it, `guidelines/**` (part `agent-workflow`, whose boundary is only `.github/workflows/tests.yml`) and `foundations/**`.
- Irreversible operation: no — the change writes files of the repository only.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — the five rows of *Settlements to record* settle the kind, the exemplar, the three rules and the two new invariants; which file of the instrument holds each of the four shared things (the task's *Context* says "wybiera cykl") follows from what the importing files already import and is a choice of how to make what the task settles, not an open design choice; no reserved choice (no language, framework, library, store, login, place to run).
- Reserved choice: none
- Execution route and reason: one author without a plan — the change is one guidelines file, one index row, one decision, two invariants with two tests, one part-map line and four small removals of repeated code in eight files of one part; one agent can hold it.
- Author: `the-way-author`, class `same` as the orchestrator (change across the parts `balance-tools`, `agent-workflow`, `product-foundation`, with foundation entries written through five element skills), harness model `sonnet`.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: harness completion notification
- Whole-change review: a reviewer other than the author, `review-change`, model `opus` (the strongest class by the human's instruction); range `4ee41c5f..ce67fbd7`, report `reports/review-whole-report.md`, first line `FAIL ce67fbd7`; changed files at that head: `balance/campaign.mjs` +17/-22, `balance/engine.mjs` +16/-2, `balance/loop.mjs` +8/-11, `balance/trace.mjs` +9/-5, `foundations/decisions.md` +16/-1, `foundations/invariants.md` +20, `foundations/part_map.md` +3, `guidelines/coding-balance-instrument.md` +171, `guidelines/coding.md` +1, `tests/invariants/balance_source_scan.py` +188, `tests/invariants/test_balance_instrument_file_writes.py` +170, `tests/invariants/test_balance_instrument_repeatability.py` +160; coverage: every item of *To do*, every acceptance criterion and each of the five rows of *Settlements to record* checked one by one in the report's section "Against the task, item by item", source fidelity of the entries checked; no plan, so no slice; blocking findings Important 1 and Important 2, each from the one author's change (class `same`); after the fix the same reviewer reviewed the fix range `ce67fbd7..001349f5`, `reports/review-whole-fix-report.md`, first line `PASS 001349f5`
- Review rounds:
  - findings `reports/review-whole-findings.md`, contradiction yes: review of the whole change, range `4ee41c5f..ce67fbd7`, report `reports/review-whole-report.md` (`FAIL ce67fbd7`); blocking findings Important 1 (the rule "Przejście mapy jak w grze" bound every mode to the engine's way of stepping; `Contradiction: yes`, against D-437) and Important 2 (the clock-and-randomness scan missed plain static forms; `Contradiction: no`); with them the five Minor findings within the task were put to the fix; fix range `ce67fbd7..001349f5` (commits `dcb27cbd`, `001349f5`), fix report `reports/author-fix-report.md`; review of the fix `reports/review-whole-fix-report.md`, `PASS 001349f5`, no blocking finding remained, two new Minor findings (they go to the request's list); Minor 5 was contested by the author and the reviewer accepted the contest; the Minor fix was not reverted
- Weakest-point checks: the author (`reports/author-report.md`): the requirement "the output of a map run that ends at the cap is the same before and after the change" on the side of `campaign`, where nothing prints the outcome; the check: a campaign with a player description outside the repository (`capMinutes: 30`, `days: 1`) run on the base code and on the head, outputs compared byte for byte, identical; it shows no output drift, not the value of the outcome in that branch; the new scans' blind spots against the invariants' sentences, tested by control cases. The author on the fix (`reports/author-fix-report.md`): a new pattern flagging a clean file of the instrument, tested by the test's first case, which scans the real `balance/` (exit 0), and by a case for each new pattern that failed before it and passes after it.

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

None: the one-author route.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 16:30 | start | orchestrator (sonnet) | task document read; plan row 23 and its approval (plan change log) read; `Depends on` is `—` | — | plan member's start checks pass |
| 16:33 | worktree cleanup | orchestrator | `python -B .the-way/task-cycle/remove_merged_worktrees.py --apply --target main` | removed `.runs/worktrees/locations-key-wording` | exit 0; no directory kept for a human decision |
| 16:34 | branch | orchestrator | `git worktree add --no-track -b task/wzorzec-kodu-przyrzadu .runs/worktrees/wzorzec-kodu-przyrzadu origin/main`; `git submodule update --init -- .the-way` | base `4ee41c5f`; `.the-way` at `19e5774a` equal to the gitlink | done |
| 16:50 | author dispatch | orchestrator -> `the-way-author` (class `same`, model `sonnet`) | `reports/author-handoff.md`; `make-change` "the whole change as the one author"; frozen task | `reports/author-report.md` | dispatched in the background; wait for the completion notification |
| 17:05 | author return | `the-way-author` (`sonnet`) | `reports/author-report.md` | commits `59081e9f`, `4b0d615f`, `ce67fbd7`; status `done with concerns` | mechanical check by orchestrator: worktree clean, range non-empty, 12 changed files are the files To do 1-7 name (guidelines, index row, decision, 2 invariants, part-map, tests, 4 files of `balance/`); report holds its checks with commands and exit codes, **Unread material**, **Searches not found or unclear** and the own-work check; gaps carried to the reviewer (tests of `tests/balance/` unread by the author, D-162 not read whole, `balance/cli.mjs` 76-439) |
| 17:10 | whole-change review dispatch | orchestrator -> `the-way-stage` (strongest class, model `opus` by the human's instruction) | `reports/review-whole-handoff.md`; `review-change`; range `4ee41c5f..ce67fbd7` | `reports/review-whole-report.md` | dispatched |
| 17:25 | whole-change review return | `the-way-stage` (`opus`) | `reports/review-whole-report.md` | `FAIL ce67fbd7`; 2 blocking (Important 1 with `Contradiction: yes`, Important 2 with `Contradiction: no`), 5 Minor within the task, none outside; the reviewer's own measurement comparison (6 commands) equal; checks it ran all exit 0; reads: its report holds checks, reaches, unread material (5 decisions whole), searches, working copies removed | findings cut into `reports/review-whole-findings.md`; one fix round |
| 17:35 | fix dispatch | orchestrator -> `the-way-author` resumed (class `same`, `sonnet`) | `reports/author-fix-handoff.md`; findings `reports/review-whole-findings.md`; `make-change` "the fix of a review's findings" | `reports/author-fix-report.md` | resumed; fix range runs from `ce67fbd7` |
| 17:50 | fix return | `the-way-author` (`sonnet`) | `reports/author-fix-report.md` | commits `dcb27cbd`, `001349f5`; status `done with concerns`; Important 1, Important 2, Minor 1-4 fixed; Minor 5 contested with evidence (one lexer would change three simulation tests and a helper); `balance/` untouched | mechanical check: worktree clean, range non-empty, three changed files (`foundations/part_map.md`, `guidelines/coding-balance-instrument.md`, the repeatability test); report holds its checks with commands and exit codes, **Unread material**, **Searches not found or unclear**, own-work check; two sentences marked `the cycle's` to show the human |
| 17:55 | review of the fix dispatch | orchestrator -> `the-way-stage` resumed (`opus`) | `reports/review-whole-fix-handoff.md`; findings `reports/review-whole-findings.md`; range `ce67fbd7..001349f5` | `reports/review-whole-fix-report.md` | dispatched |
| 18:10 | review of the fix return | `the-way-stage` (`opus`) | `reports/review-whole-fix-report.md` | `PASS 001349f5`; no blocking finding left; Minor 5 contest accepted; 2 new Minor findings (the test's text says `Math`/`Date`/`performance` "as a value" anywhere while the pattern catches only after `=`, `,` or `(`; the stricter patterns flag uses the invariant allows without the text saying so); **Unread material** `none`; **Searches not found or unclear** `none` | the 2 new Minor findings go to the request's list; step 10: CI is the final gate (no local run); step 11 next |
| 18:15 | return step dispatch | orchestrator -> `the-way-author` resumed (class `same`, `sonnet`) | `reports/author-return-handoff.md`; `task-cycle/skill/return_step.md`, `foundation_step.md` | `reports/author-return-report.md` | dispatched |
| 18:25 | return step return | `the-way-author` (`sonnet`) | `reports/author-return-report.md` | status `done`; no commit; head stays `001349f5` | nothing no longer matches the code; no review of the return step runs, since it committed nothing; step 10: the final gate is the CI run on the request's last head |
| 18:30 | target branch | orchestrator | `git fetch origin --tags`; `git log HEAD..origin/main` | origin/main still `4ee41c5f`; D-437 is not on it (its highest number is D-436) | no renumbering and no merge; no gate run on own system (CI is the final gate) |
| 18:35 | stages and measures | orchestrator | `python -B .the-way/task-cycle/cycle_stages.py --output .runs/task-cycles/wzorzec-kodu-przyrzadu/stages.md 1092541c-972a-418c-88dd-92290f7a3681`; `python -B .the-way/task-cycle/cycle_measures.py --output .runs/task-cycles/wzorzec-kodu-przyrzadu/mechanism_measures.md 1092541c-972a-418c-88dd-92290f7a3681` | `stages.md`, `mechanism_measures.md` | both exit 0 |
| 18:40 | process remarks check | orchestrator | `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/wzorzec-kodu-przyrzadu` | listed 7 items | exit 1; items appended to the process remarks (run again below) |
| 18:45 | review reminder count | orchestrator | `python -B .the-way/task-cycle/review_reminder.py origin/main` | `merges: 48`, `threshold: 60`, `reminder: no` | no reminder in the description |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q-1 | The task document's hash differs from the accepted hash in the plan's change log: does a source change bear on the task? | no effect found: the document is the final one (status `ready for cycle`, all questions answered, five settlements accepted), its *Need* equals the goal of plan row 23; the vault's last commit holds an earlier text (status `waiting for human`), so the accepted text was never committed | `git diff` of the vault file against its last commit; plan row 23 | stop and ask for the accepted hash — it names no content, only a number | the author works from a text the human did not accept; low, because the document says `ready for cycle` | author |
| Q-2 | Route and class (step 4) | one author, class `same` | the task document, size | planning — slices of a change this small cost more than they save | an author too weak for the foundation entries returns `returned` or fails review; one fix is allowed | author |
| Q-3 | Which model runs the reviewers? | the strongest class available, model `opus` — the human's instruction at the start of this cycle ("recenzentów na najmocniejszej klasie uruchamiaj z model: opus") | the user's message | the harness's other models | a weaker reviewer; the human's instruction names this model | every review |
| Q-4 | Is there a local full gate? | no — CI (`.github/workflows/tests.yml`, run on a pull request into `main`) is the final gate (step 10); the human's instruction to say so and wait for the day advisor's start signal before every full gate applies to any local full run the cycle makes instead (a CI run that gives no result in 30 minutes, a failed gate's rerun) | `.github/workflows/tests.yml` | a local `npm test` at step 10 — forbidden while CI runs on the request | none | step 10, step 12 |
| Q-5 | Failing checks on the base (step 4) | none — the base is a merge commit whose tree equals the tree of its second parent (`cdf16af4`); list taken from the `Checks` of the merged request #163 (`tests` passed on its last head, https://github.com/mariusznazar/loop2/actions/runs/44762065994/job/136377036598) | `gh pr view 163`; its cycle record `docs/task-cycles/locations-key-wording/cycle.md` (commit `8e0ad28e`) says the final gate ran in CI | run the gate on the base | a failure of the change is taken for one already there; the failing tests would be run on the base to tell them apart (step 4) | step 12 |
| Q-6 | Which file of the instrument holds each of the four shared things (the task leaves it to the cycle)? | the author chose: `balance/engine.mjs` for the cap, the outcome name (`outcomeOf`) and the mean (`meanNumber`); `balance/loop.mjs` for `MS_PER_MINUTE` | `reports/author-report.md` "Choices", 1; the reviewer judged it sound (no import cycle, every file that needs a thing already imported its holder) | `loop.mjs` for the mean (`trace.mjs` would gain an import); a new ninth file | a later file that needs milliseconds in a minute and does not import `loop.mjs` meets the rule's question again | author, reviewer |
| Q-7 | Where do the two new tests stand? | Python files in `tests/invariants/` with a shared reader `tests/invariants/balance_source_scan.py`; three lines added to the *Files* of `balance-tools` | `reports/author-report.md` "Choices", 2 and 3 | `.mjs` tests in `tests/balance/` (no map line, but a third lexer in JavaScript) | three map lines a reviewer may want gone; moving the tests out costs little | author, reviewer |
| Q-8 | How is Important 2 fixed? | patterns plus control cases, with the remaining blind spots named in the docstring and the rule | `reports/author-fix-report.md` | only naming the seven forms as blind spots (a later mode written with `const { random } = Math` would pass the gate) | the scan is stricter than the invariant's sentence for some harmless forms (a rewrite of the line clears it) | fix, review of the fix |
| Q-9 | Is Minor 5 (one lexer for the three tests) fixed in this request? | no: the author contested it with evidence and the reviewer of the fix accepted the contest; it goes to the request's list | `reports/author-fix-report.md`, `reports/review-whole-fix-report.md` | moving the lexer into `tests/invariants/loop2_invariant_support.py` and changing two tests of the simulation | a fix that grows past its finding; the lexer stays in two copies | request |
| Q-10 | Does a choice bind after the merge and need an entry (return step)? | no: the places of the four things go to the code with the rule of one place in the guidelines; the choices about the tests are in their docstrings | `reports/author-return-report.md` | an entry for each place | none | return step |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| frozen task | `.runs/task-cycles/wzorzec-kodu-przyrzadu/task.md` (original path above, sha256 7f7aa629998d1a2c) | orchestrator | — |
| code commit | `59081e9f` — the four repeats removed from `balance/` | one author (`sonnet`) | reviewed by the whole-change review |
| test commit | `4b0d615f` — the two new invariant tests and their reader | one author | reviewed by the whole-change review |
| foundation and guidelines commit | `ce67fbd7` — D-437, D-429's *Verification*, two invariants, part-map lines, `guidelines/coding-balance-instrument.md`, its row | one author | `FAIL`, fixed |
| fix commits | `dcb27cbd`, `001349f5` | one author | `PASS 001349f5` |
| reports | `reports/author-report.md`, `reports/review-whole-report.md`, `reports/review-whole-findings.md`, `reports/author-fix-report.md`, `reports/review-whole-fix-report.md`, `reports/author-return-report.md`, the handoffs beside them, `reports/review-whole-decision-index.md`, `reports/review-whole-probe-result.txt`, `reports/review-whole-fix-probe-result.txt` | agents | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| list of tests failing on the base | orchestrator, base `4ee41c5f` (tree equal to the tree of `44db659f`, the head of merged #163) | taken from `gh pr view 163` *Checks*: `tests` passed, https://github.com/mariusznazar/loop2/actions/runs/44762065994/job/136377036598 — empty list | none |
| `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`) | orchestrator, head `001349f5` | exit 0, `0 errors`, no `listed:` line | none |
| `python -B .the-way/instruction-files/check_instructions.py` | orchestrator, head `001349f5` | exit 0, `0 error, 144 warn, 7 info`; the author's and both reviewers' runs equal; none of the 144 warnings names a file of the change | none |
| `python -B .the-way/task-cycle/change_file_sizes.py 4ee41c5f HEAD` | orchestrator, head `001349f5` | exit 0, 12 files changed, +765 lines | none |
| `git diff --check 4ee41c5f HEAD` | orchestrator | exit 0 | none |
| two new invariant tests, each seen failing once and passing | author, `reports/author-report.md`: `npm test -- tests/invariants/test_balance_instrument_file_writes.py` exit 1 with a temporary edit of `balance/trace.mjs`, then exit 0; `npm test -- tests/invariants/test_balance_instrument_repeatability.py` exit 1, then exit 0; the fix round: the 11 new control cases failed (exit 1) before the new patterns, exit 0 after (`reports/author-fix-report.md`) | as stated | none |
| equality of the measurements before and after the change | author: 12 commands (`sweep`, `trace`, `loop`, `campaign` incl. `--cap 30` and a small `capMinutes`, a narrowed `check-map`, `programs`), outputs, error outputs and exit codes byte for byte identical; reviewer: 6 commands, identical | `cmp`, all identical | the full-size `check-map` (500 seeds, all programs) was not run; in `campaign` the outcome `cap` against `death` is never printed, so only the absence of change was checked there |
| tests of the part, ESLint, Prettier, Ruff, size and import tests | author and reviewers | `node --test tests/balance/*.test.mjs` exit 0 (64 pass); `npx eslint --max-warnings 0 balance tests/balance` exit 0; Prettier exit 0; Ruff exit 0; `npm test -- tests/quality/test_function_and_file_size.py` exit 0; `npm test -- tests/invariants/test_cross_part_imports.py` exit 0 | none |
| the final gate | CI on the request's last head | the final gate is the CI run on the request's last head; the cycle has no local time of it; its result stands in *Checks* of the request's description, not in this copy | not yet run |

## Return step

- Foundation compared with code: D-437, D-429, D-427, D-351, `instrument-game-agreement`, D-28, the two new invariants and the part map of `balance-tools`, `agent-workflow` and `product-foundation`, compared with the code at `001349f5`; nothing no longer matched (`reports/author-return-report.md`)
- Decisions written or changed: D-437 (written; row 1; marked `the cycle's` for its pair of examples), D-429 (its *Verification* only; row 4)
- Invariants written or changed: `balance-instrument-file-writes` (set by row 4 of the task and D-429), `balance-instrument-repeatability` (set by row 5 of the task, the human's answer to its question 6)
- Environment facts: none
- Glossary terms: none
- Part-map changes: `balance-tools` — three files added to its *Files* (the two new tests and their reader) and its sentence widened; both in the change's commits, none in the return step
- Projected entries written whole or in part: none
- Rows of *Settlements to record* written: row 1 → D-437; row 2 → the rule "Liczba gry" of `guidelines/coding-balance-instrument.md`; row 3 → the rule "Jedno miejsce wspólnej rzeczy" of the same file; row 4 → `balance-instrument-file-writes`; row 5 → `balance-instrument-repeatability`

The return step committed nothing, so no review of it ran.

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/164, draft until the CI run of the last head ends
- Description: `request.md` beside this record, written by `task-cycle/skill/request_template.md`; form check `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/wzorzec-kodu-przyrzadu/request.md --task .runs/task-cycles/wzorzec-kodu-przyrzadu/task.md`, exit 0, 1 run before the request opened; private-paths check on it, exit 0, 1 run; the copy of this record was committed after the description was first written; the description's link to the record and its *Checks* are filled in after the commit
- Writes to the task's line in the backlog: none
- Working copies left: none
- Directories of earlier tasks kept: none
- Corrections after the request opened: none
- Process remarks on the-way:
  - fix of the whole-change review's findings, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-fix-report.md: None, except one point: the handoff and findings say "`Contradiction: yes` (D-437 as you wrote it)". I read it as the guidelines rule contradicting D-437's clause "without requiring every mode of the instrument to take the shape of the engine"; I changed the rule and left D-437 as written.
  - one author, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md: The handoff's `decision_index.py --decision 28 … --sections` form does not run: the script wants `D-28`, and `--sections` takes no other switch (`Error: --sections takes no other switch`; `Error: foundations/decisions.md: no decision 28`). I ran `--sections` alone, then the index with `--section "Balance measurement" --section "Code rules, exemplars and static checks" --part balance-tools --part agent-workflow --decision D-28 …` (26 012 bytes), which gave the entries listed above.
  - one author, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md: To do 6 reads "plik testu, który nie należy do żadnej części": unclear whether the task expects the test files outside `tests/balance/`; I took it as above (choice 2). A file under `tests/balance/` would have needed no map line.
  - one author, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md: The decision template's rule that a decision with a pair of examples written by the author is `the cycle's` (`foundation_step.md`) means D-437 goes before the human as such; its meaning is row 1's, only the pair is mine. If the human prefers *Verification* `none`, the pair is two lines to drop.
  - one author, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md: No file of the repository says how a test runs alone for a file in `tests/invariants/`; `npm test -- <file>` (from `guidelines/testing.md`, "Test files in the gate") does it, so I used that.
  - return step, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-return-report.md: None. (One point of reading: the handoff says "the first review round and its fix are in the commits"; I read that as two commits of the fix (`dcb27cbd`, `001349f5`) after the three of the change, and compared the head.)
  - review of the whole change, .runs/task-cycles/wzorzec-kodu-przyrzadu/reports/review-whole-report.md: Whether the rule of the decisions template that a sentence a test holds by a line `decision:` gets no invariant derived from the decision (WAY-22) reaches the new invariant `balance-instrument-file-writes`, which derives from D-429 while `tests/balance/cli.test.mjs` holds D-429's second sentence: unclear; I judged it does not, because the invariant states another rule than the held sentence and the task settles it.
  - the orchestrator: the handoff of the one author named `decision_index.py --decision 28 … --sections`, a form the script does not accept (the script wants `D-28`, and `--sections` takes no other switch); the handoff's wording came from the cycle's orchestrator, not from the-way's files, but the author's report of it stands above.
