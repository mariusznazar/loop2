# Report — executor of slice 2 (Docker for the gate, gate stages and part imports)

**Status:** done with concerns (the concerns are judgments for the reviewer and the human, listed under "Concerns"; nothing blocks)

## Commits (base `8a5c2af00429626f6561377f7cfec880918ac26a`)

- `46c8a65a` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the Docker start of the gate, its stages and the imports between parts with lines decision:
- `21948edf` docs: :memo: name the tests of D-351, D-390, D-391, D-393, D-405 and D-406, and keep a pair of examples for D-351, D-362, D-390, D-391, D-393, D-405 and D-406 only for the part no invariant and no test holds

Author address checked after the first commit: `mariusznn@gmail.com`. The second commit's message was corrected with `--amend` before anything else stood on it: the first version did not name D-362.

## Files changed (`git diff --numstat 8a5c2af0..HEAD`)

| File | Added | Removed |
|---|---|---|
| foundations/decisions.md | 30 | 22 |
| tests/invariants/test_cross_part_imports.py | 9 | 0 |
| tests/invariants/test_simulation_type_check.py | 1 | 0 |
| tests/quality/test_docker_gate.py | 19 | 0 |
| tests/quality/test_node_test_selection.py | 1 | 0 |
| tests/quality/test_test_gate.py | 1 | 0 |

A file outside the slice's *Change* (item 5): `tests/quality/test_node_test_selection.py` got one line for D-405. The file belongs to build-tools, not browser-view, so no styleguide applied. Its focused test was run (below).

No test code, test name or assertion changed. No decision mention was removed, and the existing lines `decision:` were kept: all six existing lines (D-390 ×4, D-406 ×3, counted by line) hold their sentences. In the decision log, only the *Verification* fields of D-351, D-362, D-390, D-391, D-393, D-405 and D-406 changed. D-392 was not touched.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before commit, and again on `21948edf`) | 0 | `0 errors`; 22 decisions `listed: … held by nothing`, none of D-351, D-362, D-390, D-391, D-392, D-393, D-405, D-406; the check validates every quotation of a line `decision:` against the binding sentences (its docstring, lines 70-76) |
| `npm test -- tests/quality/test_test_gate.py` | 0 | Ran 9 tests, OK |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | Ran 1 test, OK |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 | Ran 10 tests, OK |
| `npm test -- tests/quality/test_docker_gate.py` | 0 | Ran 17 tests, OK |
| `npm test -- tests/invariants/test_simulation_type_check.py` | 0 | Ran 4 tests, OK |
| `git diff -U0 8a5c2af0… -- foundations/decisions.md`, read | — | 7 hunks at base lines 8914 (D-351), 9084 (D-362), 9600 (D-390), 9615 (D-391), 9645 (D-393), 9862 (D-405), 9877 (D-406); each lies in a *Verification* field |

Not run:
- Prettier: no `.mjs` file changed.
- The full gate (`npm test` without a file): not this stage's work.
- Ruff on the changed Python files: there is no local Ruff (`test_ruff_source_rules` fails at the base with `FileNotFoundError`). `ruff.toml` does not select E501, so the long comment lines are no new report.

## Own-work check

- **Requirement most likely missed:** that every test holding a sentence of my decisions carries a line (item 3), and that each line's quotation is valid.
- **Check:** a listing of every test case in the five changed files with the slice-decision lines above it (awk over `def test_` and the comment lines that follow); every case without a line was judged again (see "Cases left without a line"). The quotations were checked by `foundation_check.py`, which reports a quotation that does not start a binding sentence or does not stand in one.
- **Result:** 0 errors; each case without a line has its reason below. A second gap: tests outside the five files. To find them, I searched all of `tests/` for the content of the sentences (`desktop`, `--jobs`, `START_LIMIT`, `daemon_gap`, `tsconfig.sim`, `part_map`, `Depends on`, `python-stage`, `foundation-stage`, `locations.json`, `task-rules`, `private`, `old loop`, `tasks`). Two such tests came up: `tests/quality/test_node_test_selection.py` (it got a D-405 line) and `tests/agent_workflow/test_tracked_file_private_paths.py` (it gets no line: it is the test of the invariant `tracked-file-private-paths`, and that invariant already states the part of D-362 it holds, by R1).

## Rows per decision (item 6)

### D-351 — imports within the part map
- **Held by tests, in part (sentence 2):** "The test reads the imports of TypeScript, JavaScript and Python files…" — the forms read:
  - `tests/invariants/test_cross_part_imports.py:559` `test_control_each_form_of_a_script_import_is_read_with_its_line`
  - `:578` `test_control_comments_strings_templates_and_expressions_give_no_import` (only statements and `import()` with a literal count)
  - `:680` `test_control_a_python_import_is_read_from_the_code_and_the_directories_it_adds`
  - `:706` `test_control_a_directory_added_to_sys_path_is_written_out_of_the_file`
- **Held by tests, in whole (sentence 3):**
  - unmatched relative import fails with file and line: `:620` `test_control_a_relative_import_matching_no_file_fails_with_file_and_line`
  - built file matched to source: `:603` `test_control_a_built_file_is_matched_to_its_source_and_its_part`
  - package or outside module is no part's file: `:595` `test_control_a_package_or_a_node_module_is_no_file_of_any_part`, also `:620`, `:680`, `:706` (their `react`, `os`, `json`, `sys` imports give no failure)
- **Held by the invariant `cross-part-imports`:** sentence 1, whole: every import within the map, any file under `tests/` may import test-helpers. By R1, `:512`, `:639` and `:664` get no line.
- **Held by nothing:** in sentence 2, "no process that one file starts from another and no HTML or CSS".
- **Verification:** pair rewritten; `tests:` added.

### D-362 — places outside the repository
- **Held by tests:** none. `tests/agent_workflow/test_tracked_file_private_paths.py:15` is the test of `tracked-file-private-paths` and gets no line (R1).
- **Held by invariants:** sentence 1, whole (`tracked-file-private-names`, `tracked-file-private-paths`). Of sentence 2, the ban on naming a note, its folder, or a file of the old loop game's private repository (`tracked-file-private-names`).
- **Held by nothing:** in sentence 2, a file of any *other* repository its readers cannot reach, and "what a reader needs of such a source stands in the foundation or in the file itself".
- **Verification:** pair rewritten. No `tests:` clause.

### D-390 — the gate starts Docker Desktop
- **P1 S1** (starts and waits, up to the limit, in a whole run and in one file), held in part:
  - `tests/quality/test_docker_gate.py:63` `test_a_stopped_docker_desktop_is_started_once_awaited_and_left_running`
  - `:74` `test_a_daemon_that_does_not_rise_in_the_limit_gives_a_gap_after_the_limit_only`
  - `:87` `test_a_daemon_that_hangs_instead_of_refusing_is_waited_for_within_the_limit_alone`
  - `:338` `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once`
  - `:356` `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`
  - `:382` `test_one_selected_test_file_starts_a_stopped_docker_desktop_too`
- **P1 S2** (skip only after the limit; message says tried and what is unchecked), first clause held in whole:
  - `:56` `test_a_daemon_that_answers_is_used_and_nothing_is_started`
  - `:74`
  - `:142` `test_the_skip_names_what_stays_unchecked_and_tells_a_start_from_no_start`
  - `:338`
- **P1 S3** (no Docker Desktop: skip at once, with a message), held in whole:
  - `:122` `test_without_the_docker_desktop_plugin_nothing_is_started_and_nothing_is_awaited`
  - `:131` `test_without_a_docker_command_there_is_a_gap_at_once`
  - `:142`
  - `:371` `test_a_whole_run_on_a_computer_without_docker_desktop_skips_at_once`
- **P2** (one start per run; a process waits for another's start within its limit and starts none; a dead starter's start is begun again), held in whole:
  - `:233` `test_a_process_that_asks_during_a_start_of_another_waits_for_that_start_alone` (existing line)
  - `:248` `test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again` (existing)
  - `:270` `test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap` (new)
  - `:288` `test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it` (new)
  - `:305` `test_a_start_whose_process_died_is_started_again_by_the_next_process_that_asks` (existing)
  - `:356` (existing)
- **Held by the invariant `gate-docker-start-waits-once`:** the second clause of P1 S2. Its tests are `:270`, `:288` and `:338`, and also `:112` `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once`, which carries no `invariant:` line and holds only that part, so it gets no line.
- **Held by nothing:**
  - the value of the limit, 3 minutes. The tests shorten it through `LOOP2_DOCKER_START_LIMIT`, and the module docstring says the 3 minutes is not exercised;
  - that a real test needing a daemon goes through the gate's request rather than a check of its own.
- **Verification:** `tests:` rewritten; pair rewritten.

### D-391 — Docker Desktop stays running
- **Held by tests, in part:** the gate issues no `docker desktop stop` or `restart`:
  - `tests/quality/test_docker_gate.py:63`
  - `:233`
  - `:356`
- **Held by invariants:** none.
- **Held by nothing:** a stop by another way than `docker` (ending its process, shutting down its virtual machine), and a test of the repository that stops it. The stand-in sees only the gate's own `docker` calls (`tests/quality/docker_standin.py:125-128`).
- **Verification:** pair rewritten; `tests:` added.

### D-392 — no memory threshold
- **Held by tests:** none. No test varies the free memory. A threshold below the test computer's free memory would pass every test.
- **Held by invariants:** none.
- **Held by nothing:** the whole sentence.
- **Verification:** unchanged (its pair already speaks only of this).

### D-393 — two checks keep the simulation's names
- **Held by tests, in part:** "emits nothing" — `tests/invariants/test_simulation_type_check.py:107` `test_the_build_writes_nothing_beside_the_sources_of_the_simulation`.
- **Held by invariants:**
  - `simulation-isolation`: the ban on host names in the simulation;
  - `simulation-type-check`: own configuration, every file, language library only, no ambient types.

  By R1, `:79`, `:97` and `:118` get no line.
- **Held by nothing:** that the test of `simulation-isolation` keeps its whole scan of sources and its run of the built simulation in a cut-off environment, and sentence 2 ("Neither check is shortened…"). This is a decision with no pair at the base, so R2 gives it one.
- **Verification:** pair added; `tests:` added.

### D-405 — order of the gate's stages
- **Held by tests, in part:**
  - all four stages run in a full run: `tests/quality/test_test_gate.py:62` `test_the_whole_gate_runs_its_stages` (build, Python stage, foundation stage), and `tests/quality/test_node_test_selection.py:10` `test_every_node_test_file_is_selected_by_npm_test` (all four);
  - the build before the Node tests: `:10`, whose stand-in Node tests assert `built` exists.
- **Held by invariants:** none.
- **Held by nothing:**
  - Node before Python, and Python before the foundation check;
  - the end at the first failing stage;
  - sentence 2 (Node not beside Python).
- **Verification:** pair rewritten; `tests:` added.

### D-406 — Python directories at the same time
- **Held by tests:**
  - S1, in part ("runs the directories … at the same time"): `tests/quality/test_test_gate.py:73` `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time` (existing line);
  - S2, in whole: `tests/quality/test_docker_gate.py:338` and `:356` (existing lines).
- **Held by invariants:** none derive from D-406.
- **Held by nothing:** "giving the runner … no argument that limits how many of them run at once". The test has two directories, so it fails on `--jobs 1` only; `--jobs 2` or more passes it (`.the-way/gate/run_tests.py:122`).
- **Verification:** pair added; `tests:` rewritten.

## Pairs added or rewritten (for the human to accept at the merge)

**D-351 (rewritten):**
- complies: a test of one part starting a file of another part as a process, and a page or a style sheet of the browser view referring to a file, both left unread by the test
- violates: the test of `cross-part-imports` made to read a process one file starts from another, or the HTML and CSS of the browser view, while this decision stays as it is

**D-362 (rewritten):**
- complies: a decision whose whole reasoning stands in its *Rationale* and *Rejected*, with *Origin* `none`; a comment that states in its own words what the code needs
- violates: a comment, an entry or a guideline that names a file of a repository its readers cannot reach other than the private repository of the old loop game; an entry or a comment that leaves out what its reader needs because a source outside the repository holds it

**D-390 (rewritten):**
- complies: a new test that needs a container asks the gate for a daemon before it builds anything, and is skipped through that request alone; a gate that waits 3 minutes for a daemon where no other limit is set for the run
- violates: a test that keeps its own check of the daemon and is skipped on it, so that a stopped Docker Desktop is never started for it; a gate whose wait for a daemon, with no other limit set for the run, is other than 3 minutes

**D-391 (rewritten):**
- complies: a run that started Docker Desktop ends with its processes and the virtual machine it runs in left as they are
- violates: a gate that ends Docker Desktop at the end of a run by another way than a command of `docker`, such as ending its process or shutting down the virtual machine it runs in; a test that stops or restarts Docker Desktop after it has run

**D-393 (added):**
- complies: a change of the test of `simulation-isolation` that keeps its scan of every source of the simulation and its run of the built simulation in a cut-off environment, also where the compiler refuses some of the names it finds
- violates: a part of the scan of the sources, or the run of the built simulation in a cut-off environment, taken out of the test of `simulation-isolation` because the compiler refuses the same names

**D-405 (rewritten):**
- complies: the Node tests run as a stage of their own before the directories of Python tests, and the foundation check after those; a run that finds a stage failing runs no stage after it
- violates: the Node tests started beside the directories of Python tests; the foundation check run before the directories of Python tests; a stage run after a stage that failed

**D-406 (added):**
- complies: the runner of the Python tests started by the full gate with no argument `--jobs`
- violates: the runner of the Python tests started by the full gate with `--jobs` and a number of 2 or more, so that a gate with more directories than that number runs some of them after others

## Concerns (choices with the way rejected)

1. **D-406 and D-391 judged "in part", not "in whole".**
   - D-406: the test catches `--jobs 1` only.
   - D-391: the stand-in sees only `docker desktop stop|restart`.
   - Rejected: calling both whole, as the base did for D-406. That leaves a pair out where a change can break the sentence and pass every test.
   - Cost if wrong: one pair too many on each, which a reviewer can remove.
2. **Quotations that run through a clause the test does not hold.** A quotation must start at the start of the sentence, so a test that holds a later clause quotes through the clauses before it. This follows slice 1's D-77 lines. In these places the `tests:` clause says in words which part is held:
   - `:338` and `:356` quote D-390 P1 S1 through "for at most 3 minutes, in a run of the whole gate", and `:382` through the end of the sentence, though no test holds the 3 minutes;
   - the D-351 lines at `:595` and `:603` quote sentence 3 from its start;
   - the D-405 line in `test_node_test_selection.py` quotes through "in this order", though only build-before-Node is held.
3. **R1 applied to a test with no `invariant:` line.** `tests/quality/test_docker_gate.py:112` holds only what `gate-docker-start-waits-once` states. It got no `decision:` line, by the reasoning of R1. Adding an `invariant:` line to it would be a test change, which is outside this slice.
4. **`test_control_comments_strings_templates_and_expressions_give_no_import` was judged to hold D-351 sentence 2 in part.** It fails if an `import()` without a string literal, a member `import`, or a commented or quoted import were read. The sentence names exactly what is read. The judgment is marginal; the other way is no line, and the reading then rests on the form tests alone.

## Remarks on the wording of decisions (R3; nothing changed)

- D-393 "both stay … the test of `simulation-isolation`, which keeps its whole scan …": this binds the form of a test, which no check can hold. The new pair is the only guard.
- D-390: "for at most 3 minutes" is a constant in `scripts/docker_gate.py:40` (`START_LIMIT = 180`). Under the template's "Where it goes", question 3, a single number belongs in code with a test. No test holds it today.
- D-405 Rationale: "the full gate runs them at the same time (D-406)" matches the code (`scripts/test.py:52-53`). No discrepancy found.

## Reaches beyond the dispatch

To judge what the tests prove, I read:
- `tests/quality/gate_fixture.py` (what the gate's stand-in stages record);
- `tests/quality/docker_standin.py` (what `stops()` catches);
- `scripts/docker_gate.py` and `scripts/test.py` (the limit, the message, the stage order);
- `.the-way/gate/run_tests.py` (the `--jobs` lines only);
- `tests/quality/test_node_test_selection.py` (a test of D-405 found by content);
- `tests/agent_workflow/test_tracked_file_private_paths.py` (a candidate for D-362);
- the docstring of `tests/invariants/test_simulation_isolation.py`, lines 1-48 (a candidate for D-393);
- the grep in `.the-way/elements/common/foundation_check.py` for how quotations are validated.

## Working copies

`.runs/executor-2/` held the logs of the focused runs (`*.log`, `results.txt`) and two outputs of the foundation check. All of it was removed (`rm -rf .runs/executor-2`); the results are carried in this report. No worktree or clone was made.

## Unread material

- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and `task-frozen.md`: the plan's passage was read as the handoff copies it, and `task-frozen.md` was read whole.
- `.the-way/elements/decisions/template.md`: lines 105-264 were read, which hold the three named ranges (111-127, 162-166, 220-260).
- `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`: read whole.
- All decision and invariant entries named: read whole.

Otherwise none.

## Searches not found or unclear

- No test of the order of the stages after the build, and none of the end at a failing stage (D-405): searched `tests/` for `python-stage`, `foundation-stage`, `D-405`, and the gate fixture. Not found.
- No test that the agent instructions name the entries `projects`, `tasks` and `task-rules` (D-362): searched `tests/` for `locations.json`, `task-rules`, `"projects"`, `tasks`, `Backlog`. Not found; the invariant `tracked-file-private-names` (method review) holds it.
- No test of the free memory (D-392): searched `scripts/docker_gate.py` and `tests/quality/test_docker_gate.py`. Not found.
- Unclear: the handoff gives 23 decisions `held by nothing` at the base, and the check on `21948edf` lists 22. The difference most likely comes from slice 1's commits (guess, not verified); none of the 22 is a decision of this slice.
- The Grep tool, given a brace glob together with a path, returned no matches where `grep -n` found some (`tests/view/state-store.test.mjs:156` and others; none relevant). I repeated that search with `grep`.
