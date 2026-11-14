PASS 4ffd7b04759d648bf9022fb50dca79e1827a5248

# Review of the whole change, task `krotsza-bramka-procesu`

Range `2a8645d4..4ffd7b04` (three commits: `6b4487d1`, `cb617b4c`, `4ffd7b04`). `git rev-parse HEAD` in
`the repository root` is `4ffd7b04759d648bf9022fb50dca79e1827a5248`, the head given.
One author, no spec, no plan, no slice reviews: this review is the only one the change gets.

Counts: blocking 0, Minor 5 (all within the task), out of scope 0 (two lines of Declined to judge).

## Verdict in short

- The code does what point 3 and the acceptance criterion ask: `scripts/test.py:53-54` gives the runner `--jobs 1`; the four
  stages and their order are unchanged; `scripts/docker_gate.py` is untouched (`git diff` of the range names no such file);
  D-77, D-83, D-49, D-73 and D-28 are untouched (the diff of `foundations/decisions.md` is 30 added lines at the end, 0 removed).
- The causal claim of D-406 holds in my own runs: without the argument the two tests of `GateRuns` fail `2 != 1`, with it
  they pass (checks 4 and 5 below).
- The test that pins the argument fails for dropping it (`'' != '--jobs 1'`) and for changing it (`'--jobs 2' != '--jobs 1'`).
- The pin move commit `6b4487d1` holds exactly the gitlink and the two files the installer owns. The installer's own
  dry run against the head reports `KEEP` for every file it owns and for `AGENTS.md`, `CLAUDE.md` and `.gitignore`.
- What I found are five Minor items: a claim of D-406's *Rationale* that the sources do not bear as written, a range
  in it that is not in the task, the premise of D-405's *Rationale* that D-406 undoes, a README line, and a docstring.

## Findings

### Critical

none.

### Important

none.

### Minor (each lies within the task, so the cycle may cut them into the findings file of a fix)

1. **`foundations/decisions.md:9837` (D-406 *Rationale*), "on one computer of 32 GB with no other gate running".**
   - Wrong: the source of that condition is the dispatch's evidence list, which says "no other **registered** gate run"
     (`author-handoff.md`, "Evidence for the second decision"). The entry drops "registered" and states the machine was
     quiet. Nothing a reader can open shows it, and the memory samples of the three runs
     (`reports/mem-gate-pin-run1.csv` to `run3.csv`) show 8.6 to 15.6 GB free of 32.5 GB (17 to 24 GB in use), which
     is more than one gate alone takes (3 to 4 GB peak by the task's *Context*), so they neither show nor exclude another
     process.
   - Why it matters: the entry gives 18.3 to 19.6 minutes as the time of an otherwise idle machine, and a reader will
     compare it with the idle-machine figure of the earlier measurement. The binding sentences do not depend on it.
   - Evidence: `reports/author-handoff.md` (the word "registered"); the csv files; `foundations/decisions.md:9837`.
   - Fix: say what is known ("with no other gate of the day advisor's registry running") or drop the condition and say the
     runs were on the machine as it was.
2. **`foundations/decisions.md:9837` (D-406 *Rationale*), "against 23.0 to 28.0 minutes measured earlier with the directories one after another".**
   - Wrong: the frozen task gives "23-24 minutes" on a slow machine and "up to 28" with another cycle beside, and in *Context*
     "24.0-28.0" with one cycle beside; the number 23.0 is in none of them (the author's source note gives 23.2 to 24.2 for
     the quiet machine, which I read outside the repository only to check this). Also the upper end, 28.0, was measured with
     a second full gate beside, while the sentence puts it against runs described as with no other gate. The comparison
     therefore overstates the difference between like conditions.
   - Why it matters: the entry's closing "Accepted with it: the gate takes longer, by the difference of those measurements"
     takes its size from that range.
   - Evidence: `.runs/task-cycles/krotsza-bramka-procesu/task.md` lines 19, 20, 67 (*Need*, *Context*); handoff says "23.0-28.0 min
     (frozen task, *Context*)", which the task does not literally say.
   - Fix: give the earlier figures with their conditions as the task gives them (23-24 on a quiet machine, 24.0-28.0 with a
     cycle beside).
3. **`foundations/decisions.md:9822-9823` (D-405 *Rationale* and *Rejected*), premise now undone by D-406.**
   - Wrong: both say the gain is "about one minute of about 15", "an estimate made with the directories at the same time",
     and the cost is more memory where "two heavy directories that use Docker would run beside Node tests". The same change
     (D-406, `scripts/test.py:53-54`) makes the directories run one after another, so the gate as it stands takes about 23
     minutes and one heavy directory at a time; the 15 and the two directories no longer describe the gate. The parenthesis
     "(an estimate made with the directories at the same time)" is not in question 1's *Not chosen*; it is the writer's own
     derivation from *Context*, which the template says never enters *Rejected* of a decision written from a row (WAY-134).
   - Why it matters: low. The binding sentences and the human's answer ("1 a") are unaffected; a reader who reaches D-405 first
     reads figures that the next entry takes away.
   - Evidence: task question 1 (*Not chosen* has no such parenthesis); `.the-way/elements/decisions/template.md` ("The *Rejected* of a decision written from a row...").
   - Fix: cut the parenthesis from *Rejected*; one sentence in *Rationale* that the figures are for the directories at the same
     time (D-406 gives the order now), or leave the human's wording and note the premise.
4. **`README.md:76`, the description of `npm test`.**
   - Wrong: it says the gate runs the Python tests "przez `python -B .the-way/gate/run_tests.py`". The command is now that with
     `--jobs 1`; whoever repeats the command from the README gets the directories at the same time, the case D-406 forbids for the gate.
   - Why it matters: README is a file of `build-tools` and the task asked to look for what should have been updated; nothing tests it.
   - Evidence: `scripts/test.py:53-54`; `README.md:76`. `git grep "run_tests"` outside `.the-way` and `foundations/decisions.md` finds only README, `scripts/test.py`, the fixture and `guidelines/testing.md:431` (a file list that stays true).
   - Fix: add `--jobs 1` and, in a few words, that the directories run one after another.
5. **`tests/quality/test_test_gate.py:1`, module docstring.**
   - Wrong: "The file selection of D-77 runs one real test file and refuses an empty run." The new test (`:40-50`) is about the whole
     gate, not a file selection.
   - Why it matters: a name that stopped being true (WAY-362); below any size threshold, so Minor.
   - Fix: one clause naming the whole run.

### Out of scope

none.

## Against the task, point by point

| Requirement | Result |
|---|---|
| Point 1, pin at `ec7929d` | `git ls-files --stage -- .the-way` gives `ec7929d02164c8754f0236d93db52624688967e6`; `git -C .the-way rev-parse HEAD` the same. `6b4487d1` holds only `.the-way` and `.claude/agents/the-way-author.md`, `the-way-stage.md`; installer dry run: all `KEEP`. |
| Point 2, three runs, rerun of failures at `--jobs 1`, evidence for the request | Evidence is in the cycle's reports (`gate-pin-run1..3.log`, `diag-jobs1-A/B.log`); the request's description is the orchestrator's, not part of this range. Facts I checked against the logs: the failing tests are the same two in each run (`FAIL:` lines 2680 and 2715 of each log), 3 times `Ran 56 tests ... FAILED (failures=2)` for `tests/quality`, `tests/agent_workflow` 14, `tests/deploy` 253, `tests/invariants` 261 OK each; totals 18.3, 18.6, 19.6 min agree with the timestamps of the memory samples (17:55:44-18:14:32, 18:19:03-18:37:21, 18:38:38-18:58:15). |
| Point 3 | `scripts/test.py` gives `--jobs 1`; D-406 states why and what to repair; the request is to name the test and the repair task (not in the range). |
| Acceptance criterion | Vacuously and truly met: `scripts/test.py` passes `--jobs 1`, and the two tests that failed also pass there, so the criterion's antecedent is false. |
| Settlement row 1 and question 1 -> D-405 | Binding sentence agrees with the row and with answer 1 (order build, Node, Python directories, foundation check; ends at the first failing stage; Node tests not beside Python). *Rejected* carries the one "Not chosen" item with its cost, plus the parenthesis of Minor 3. |
| Point 3 and question 2 -> D-406 | Binding sentences state the one-after-another run, the argument, and the condition of its withdrawal. *Rejected* carries both "Not chosen" items with their reasons. Facts checked: see below. |
| D-77, D-83, D-49, D-73, D-28 unchanged | Yes (diff of the log is addition only). |

### Facts of D-406 checked

- "the same two tests failed and no other": yes, in all three logs.
- "each seeing it started twice": both fail with `AssertionError: 2 != 1` on `len(docker.starts())`.
- "Run alone ... fail ... and pass with them one after another": `diag-jobs1-A.log` (12 tests, 2 failures) and `diag-jobs1-B.log` (12 tests OK); I reproduced it twice with the head's `scripts/test.py` and the `--jobs 1` removed (checks 4, 5).
- The mechanism: `scripts/docker_gate.py` `daemon_gap()` (lines 116-136) reads `recorded_gap()` before it starts Docker Desktop and calls `record_gap(gap)` only after the wait loop ends; two processes at the same time both find no record. Matches the entry.
- "Whether the other tests that use Docker ... was not examined": true to the author's report and to the logs, which show no other test failing at the same time.
- "18.3 to 19.6 minutes": agrees with the timestamps; see Minor 1 and 2 for the two conditions that are not sourced.

## The tests

- `tests/quality/test_test_gate.py:40-50` fails without `--jobs 1` and fails with another number; it asserts the argument, that the build ran and that
  the foundation stage ran. It does not pin the order of the stages or the stop at the first failure (see Declined to judge).
- The two tests of `tests/quality/test_docker_gate.py` `GateRuns` independently hold the real behaviour: they fail when the argument is dropped and pass with it.
  The new test is therefore a cheap pin of the argument that those slow tests need.
- `tests/quality/gate_fixture.py`: the stand-ins now write their arguments to the marker file instead of `touch()`. All three users of the
  fixture pass (`test_test_gate.py` 8 tests, `test_docker_gate.py` 12 tests, `test_node_test_selection.py` 1 test); `assert_focused` and
  `test_docker_gate.py` only test existence of the markers or replace the runner with the real one.
- No test was weakened or removed; no invariant test was changed. `decision:` line of the new test is accepted by `foundation_check.py` (exit 0, 0 errors; D-405 and D-406 are not in its "listed" report).

## Against the guidelines

- `guidelines/testing.md` (read whole): "Behaviour, not implementation" and "Where the expected value comes from": the expectation `--jobs 1` is the sentence of D-406 itself; accepted. "Test files in the gate" says the runner runs test discovery in directories and says nothing of concurrency: stays true.
- `guidelines/coding.md` (read whole): linter rule: Ruff on the three changed Python files passes (check 7). No rule of size exists in it (the task's question 5); the cycle does not need to write one.

## Structure of the code

- `change_file_sizes.py 2a8645d4 4ffd7b04` (check 8): `scripts/test.py` 78 to 81, `tests/quality/gate_fixture.py` 65 to 68, `tests/quality/test_test_gate.py` 110 to 122, `foundations/decisions.md` 9819 to 9849 (a file already over any threshold a rule might set; +30 lines of entries).
- The product's `guidelines/coding.md` holds no `### Size of a function and a file`, so there is no size test to run in a worktree of the base and one of the head; a structure finding would be Minor and I have none besides Minor 5.
- No code without users, no function grew by more than three lines.

## Declined to judge

- A test of the stage order and of the stop at the first failing stage (D-405 holds them by a pair of examples only): the handoff and task ask for no other behaviour change, and the author states it as a choice.
- Other Docker-using tests running at the same time (names of containers, images, volumes, networks): D-406 says they were not examined and the task makes their repair a task of its own (question 2, *Out of scope*).

## Checks I ran

| # | Command (from `the repository root`) | Exit | What it showed |
|---|---|---|---|
| 1 | `python -B scripts/test.py tests/quality/test_test_gate.py` | 0 | 8 tests OK. Log `reports/review-whole-run-test-gate.log` |
| 2 | `python -B scripts/test.py tests/quality/test_node_test_selection.py` | 0 | 1 test OK (other user of the fixture) |
| 3 | `python -B scripts/test.py tests/quality/test_docker_gate.py` | 0 | 12 tests OK in 28.7 s. Log `reports/review-whole-run-docker-gate.log` |
| 4 | Copy of `scripts/` and `tests/quality/` under `.runs/review-whole/mut/` with `--jobs 1` removed from `scripts/test.py`: `python -B scripts/test.py tests/quality/test_test_gate.py` | 1 | 1 failure: `'' != '--jobs 1'`. Log `reports/review-whole-mut-drop-test-gate.log` |
| 5 | Same copy, `--jobs 1` replaced by `--jobs 2`: same command | 1 | 1 failure: `'--jobs 2' != '--jobs 1'`. Log `reports/review-whole-mut-two-test-gate.log` |
| 6 | Same copy with `--jobs 1` removed, twice: `python -B scripts/test.py tests/quality/test_docker_gate.py` | 1, 1 | both runs: the two tests `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing` and `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` fail `2 != 1`, ten others pass. Logs `reports/review-whole-mut-drop-docker-gate-1.log`, `-2.log` |
| 7 | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache scripts/test.py tests/quality/gate_fixture.py tests/quality/test_test_gate.py` | 0 | all checks passed |
| 8 | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors"; 23 "listed" lines, none for D-405 or D-406. Log `reports/review-whole-run-foundation-check.log` |
| 9 | `python -B .the-way/task-cycle/change_file_sizes.py 2a8645d4 4ffd7b04` | 0 | table above. Log `reports/review-whole-file-sizes.log` |
| 10 | `python -B .the-way/installation/install.py .` (no `--apply`, a preview) | 0 | "Preview only"; every file `KEEP`. The worktree stayed clean (`git status --short` empty before and after). Log `reports/review-whole-installer-dry-run.log` |
| 11 | `git -C .the-way diff 55afa8e..ec7929d -- product-guidelines/` read through | n/a | the only new requirement of a template for the product's guidelines is the rule of size (`### Size of a function and a file`), which the task assigns to a later task; the other changes relax a rule. |

Not run: the whole gate (`npm test` without an argument), as instructed. Every check above that was run passed except the mutation runs (4 to 6), which are meant to fail and failed for the expected reason.

## Reach beyond the dispatch

- `the author's note of measurements before changes of the process, outside the repository`, lines 65-77 (searched for the numbers 23 and 28 only): to check where the figure "23.0" of D-406 comes from (Minor 2). Not read whole; it is outside the repository and is the task's own source.
- `.runs/task-cycles/krotsza-bramka-procesu/reports/author-handoff.md` lines 55-125, the word "registered" (Minor 1), and `reports/mem-gate-pin-run*.csv`, `gate-pin-run*.log`, `diag-jobs1-*.log`, `author-test-gate-red.log`: the evidence the handoff lists, read to check D-406.
- `.the-way/installation/install.py` (lines 545-620 and the headings), to run the installer's preview; `.the-way/elements/decisions/template.md` read whole for the form of D-405 and D-406; `product-guidelines/reading.md` and `elements/common/way_of_working.md` "Reading the foundation" for the selection.
- `git -C .the-way diff 55afa8e..ec7929d -- product-guidelines`, `gate elements/common --stat` (check 11).
- Not read: `the author's rules for commits, outside the repository` (the author's commit rules); the commit messages read as `type: :emoji: text` in English like the log of the repository.

## Working copies

- `.runs/review-whole/mut/` (a copy of `scripts/`, `tests/quality/`, `package.json`, with two directory junctions to `node_modules` and `.the-way` of the worktree): removed, the junctions first with `rmdir` so that their targets stayed (`node_modules/npm` and `.the-way/gate` checked present afterwards).
- Scripts and logs of mine in `.runs/review-whole/`: removed; the logs this report needs are in `reports/` under `review-whole-*.log`.
- No git worktree or clone was made (`git worktree list` shows none of mine), nothing to prune. Nothing of the reviewed worktree was changed; `git status --short` is empty.

## Unread material

- Decisions of the selection: the parts touched are `build-tools` (the files `scripts/test.py`, `tests/quality/**`), `product-foundation` and `agent-workflow` (the files `foundations/decisions.md`, `.the-way`, `.claude/agents/**`; D-405 and D-406 name `build-tools`).
  The union of the decisions whose *Scope* names one of them is 82 (64 for `build-tools` including D-405 and D-406, 1 more for `product-foundation` that is already counted, 18 more for `agent-workflow`).
  **Read whole: 15** (D-28, D-49, D-73, D-77, D-81, D-82, D-83, D-84, D-268, D-362, D-390, D-391, D-392, D-405, D-406). **By title only: 67**, each titled in my scan of both lists; none has a title pointing to a bearing on the change.
- Decisions I did not run through by title: none. Decisions that bear on the change and stayed unread: none.
- Invariants selected by *Part* (`build-tools`, `agent-workflow`, `product-foundation`, `every`): 46 of 136. Read whole: `gate-docker-start-waits-once`, `focused-test-execution`, `node-test-selection` (the three the change reaches or the test I examined cites). The other 43 were read only as headings with their *Part* line; none concerns the gate's stages or the Docker start.
- Part-map entries `build-tools`, `agent-workflow`, `product-foundation`: read whole. Glossary: headings only; no term of D-405 or D-406 needs an entry (the entries `unit test` and `integration test` are not touched).
- Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole. The kind files `guidelines/coding-<kind>.md` were not read: no kind row concerns scripts or tests of the gate.
- The commit `6b4487d1` itself: the two agent files were read whole in the diff; the pinned the-way was not read beyond the paths named above.

## Searches not found or unclear

- The condition "no other gate running" (Minor 1): the sources say "no other registered gate run"; what "registered" means (the day advisor's registry) is not stated in any file I could open.
- The number "23.0" in "23.0 to 28.0 minutes" (Minor 2): not found in the frozen task; the dispatch attributes it to *Context*.
- The record of the earlier measurement lies outside the repository (the author's notes), as D-406 itself says; I could not verify it from the repository.
- A `Total time` line of the three runs: not in the logs (the totals 1117.6, 1099.4, 1176.3 s come from the dispatch); I checked them against the first and last sample of the memory files only.
- The sum of the directories' test counts (14 + 56 + 253 + 261 = 584) differs from "588 tests in 4 directories" printed by the runner; the entry does not use the number, so I left it unexplained.
