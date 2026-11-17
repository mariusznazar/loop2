# Report - executor of slice 7 (`make-change`)

**Status:** done (one item reported as not standing, see D-28 second part; no blocker)

**Commit:** `2c17721d01599dff56e4608def1dacb7823ae98f` on `task/poprawki-brzmienia-fundamentu` (base `36d4292e`).

**Check line:** `foundation_check.py` 0 errors (5 `listed:` lines, all from earlier slices' invariants); `npm test -- tests/quality/test_node_test_selection.py` exit 0; nothing failed; the Python quality venv was not needed and not used.

## Files changed

- `foundations/decisions.md` - 11 insertions, 11 deletions (D-28, D-83, D-84, D-85, D-220, D-419)
- `guidelines/testing.md` - 6 insertions, 6 deletions (When to read; Test files in the gate)

## Items (rule 6)

- **D-28 first part** - made: "session, saved-game and mail exemplars are selected with their first implementations" -> "the session, saved-game and mail exemplars were selected with their first implementations (D-115, D-213, D-162)".
- **D-28 *Verification* `complies`** - not standing: the quoted "general and four kind guidelines follow the pinned templates" is not in the entry; what stands is "general and kind guidelines follow the pinned templates" (no count, so the defect the change meant, a fixed number, is not there). Not forced (rule 1).
- **D-83** - made.
  - Binding sentence 2 is now "Every `*.test.mjs` file under `tests/` is selected by `npm test`, and the gate's runner, `.the-way/gate/run_tests.py`, runs each directory that holds a `test_*.py` file git tracks, so a new `test_*.py` file runs once git tracks it." The Node sentence is unchanged.
  - *Rationale*: "one small test guards the inclusion" is now "one small test guards the inclusion of the Node files", and the Python branch (the runner finds each directory by the files git tracks) is said. The cost names that an untracked Python test file does not run.
  - *Verification* `complies` and `violates` moved with the sentence (see Choices).
- **D-84** - made: binding "takes ... when that helper changes" -> "keeps these waiting and cleanup rules"; *Rationale* last sentence (see Choices). The task's "zrobione w `8d2dff33`": the log still said "takes", so the change was not made in the log; `tests/http.test.mjs` does bound the whole exchange (absolute deadline) and the wait for listening.
- **D-85** - made: the historical reason ("when the case was chosen, the HTTP helper limited idleness ... no limit") is removed from *Rationale*; what stays is that the selection approves neither the whole file nor its helpers.
- **D-220** - made: *Rejected* "the tests of loop taken as material" -> "the tests of loop taken only as material, from which each behaviour would be chosen anew".
- **D-358 -> D-419** - made on the successor (D-358 is withdrawn, its row names D-419). D-419 *Rejected* read `unknown` and *Rationale* held the hand-over clause: *Rejected* is now "a hand-over of the screenshot to the human to upload - it would put a step of the human into every cycle that shows a screen." and *Rationale* lost that clause (now "...the agent committed its screenshots itself. D-12 sets ...").
- **`guidelines/testing.md` To do 6.3** - made (the lines had moved from `:14-16` to `:17-19`): "D-82 jest odstępstwem w jednej sprawie: komentarza, który nazywa źródło wartości; ocena człowieka, którą szablon wskazywał komentarzem, wchodzi przez decyzję fundamentu, a pozostałe źródła oczekiwania zostają takie, jak daje je szablon." The paragraph under "Where the expected value comes from" already agreed with D-82 and is unchanged.
- **`guidelines/testing.md` To do 6.4** - made (lines moved from `:319-324` to `### Test files in the gate`): "Nowy plik Pythona biegnie w bramce, gdy git go śledzi, także w nowym katalogu; plik jeszcze nieśledzony nie biegnie, więc sama nazwa ani obecność na dysku nie jest dowodem wykonania." The *Good*/*Bad* lines of that rule were left as they are.

## Choices (with the way rejected and cost if wrong)

1. **D-83 *Verification* pair changed with the sentence.** The old `violates` ("a new `test_*.py` file in a new directory counted as covered by its name alone, with no run showing it executed") is false under the runner: a tracked file in a new directory runs. New `complies`: "a new `test_*.py` file that git tracks, in an existing or a new directory, which the gate's runner runs with the others of its directory". New `violates`: "a new `test_*.py` file that git does not track, counted as covered by the gate because it stands on the disk". Rejected: leaving the pair, which would contradict the new sentence. Cost if wrong: the pair is a comparison aid only, no test reads it.
2. **D-84 *Rationale* shortened more than "takes" -> "keeps".** The sentence told the adoption history (helper had no limit "when they were adopted", "left the helper to take them at its next change"), which cannot stand once the helper keeps the rules and which the template forbids (a rationale does not tell how the decision was reached); it is now "The rules fix no concrete limits, and the HTTP helper keeps the ones they give." Rejected: swapping only the verb ("left the helper to keep them at its next change"), which reads as nonsense. Cost if wrong: one sentence of history lost, which git keeps.
3. **D-83 binding sentence names `.the-way/gate/run_tests.py`** (the task names it); the *Rationale* says only "the runner of the gate", since a rationale names no file.

## Own-work check (section 3)

- Requirement most likely not met: D-83's binding sentence must keep what it binds for Node while stating the Python branch as the runner works. Check: read `.the-way/gate/run_tests.py` (`test_directories` takes `git ls-files`, `PATTERN = "test_*.py"`, requires `os.path.isfile`; each directory is run in its own process) and compared with the sentence: it holds, including "once git tracks it" (an untracked file is not listed). The Node sentence and the invariant `node-test-selection` (derives from D-83, not changed) still match. Also `git grep -n 'decision: D-\(28\|83\|84\|85\|220\|419\|82\) "'` found only D-28 (3 test files, quoting "For the adopted linters, full-compliance source invariants apply" and "The general coding quality checks cover all code, tests included") and D-220 (quoting the unchanged first sentence); none of those spans changed, and the foundation check shows no broken quotation.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (after the decisions edits): exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` (end of slice, checks `guidelines/testing.md` too): exit 0, `0 errors`; 5 `listed:` lines, none from this slice: `account-server-runtime` (`foundations/invariants.md:5`), `terrain-drawing-numbers` (`:354`), `player-opaque-session-cookie` (`:668`), `trip-plan-progress` (`:978`), `loop-run-knowledge` (`:1158`), each "reads `test` and its sentence is changed by this change, while no file citing it changed": name each in the request.
- `npm test -- tests/quality/test_node_test_selection.py`: exit 0 (1 test, OK).
- `python -B .the-way/instruction-files/check_instructions.py` (not asked for; run to see whether `guidelines/testing.md` raised anything): `0 error, 144 warn, 7 info`; I did not compare the 144 warnings with the base, so I do not say none comes from this slice.
- Not run: the full `npm test` (not allowed).

## Reaches beyond the handoff

- `scripts/test.py` (grep for `run_tests`, `NODE_TESTS`) and `foundations/invariants.md:578-592` (the invariant `node-test-selection`): to confirm the Node and Python branches of D-83 and that the invariant is unchanged. Read ranges only.
- `git show --stat 8d2dff33` and `grep` in `tests/http.test.mjs`: to check the task's "zrobione w `8d2dff33`" for D-84.
- `foundations/decisions.md:11413` (row of D-358 in the withdrawn table), by `git grep`.

## Working copies

None made; `.runs/executor-7/` was not created.

## Unread material

- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` and the task's To do 1 / Out of scope: not opened separately; the handoff carries the rules word for word and I read the whole `task.md`.
- `.the-way/elements/decisions/examples.md` (read whole, names D-WAY-03 only; the-way's own log not opened), `foundations/decisions.md:3313-3326` etc. read at the handoff's current ranges.
- `guidelines/coding.md` and `guidelines/testing.md` read whole (testing.md in three pages); no other file of the slice is unread.
- D-115, D-213, D-162 read whole (only for the references in D-28); D-73 read whole.

## Searches not found or unclear

- D-358 has no heading (withdrawn); resolved to D-419 through the withdrawn table.
- D-28 quotation "general and four kind guidelines" not standing (see items).
- Line numbers of the task for `guidelines/testing.md` (`:14-16`, `:319-324`) have moved; found by quotation.
- The task's quoted binding wording of D-83 ("...counted as covered by the gate only after its execution there is verified.") stood as quoted at the base.
