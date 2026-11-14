# Author report — krotsza-bramka-procesu (make-change, the whole change as the one author)

**Status:** done

## Commits (branch `task/krotsza-bramka-procesu`, from `6b4487d1`)

- `cb617b4c` docs: foundation entries D-405 and D-406 — `foundations/decisions.md` (+30 −0).
- `4ffd7b04` fix: `--jobs 1` in the full gate and its pinning test:
  - `scripts/test.py` (+3 −1): the Python stage is `command(sys.executable, "-B", ".the-way/gate/run_tests.py", "--jobs", "1")`, with a two-line comment citing D-406. No other stage moves; `scripts/docker_gate.py` is untouched.
  - `tests/quality/gate_fixture.py` (+5 −2): the stand-ins of the Python and foundation stages now write their marker file with the arguments they were given (was `touch()`); docstring says so. `assert_focused` still sees the same files.
  - `tests/quality/test_test_gate.py` (+12 −0): new test `test_the_whole_gate_runs_its_stages_and_gives_the_python_runner_one_job`, with a line `decision: D-406 "The full gate runs the directories of Python tests one after another"`.

## Foundation entries (written by following `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `common/way_of_working.md`, `common/rules.md`, `decisions/examples.md` is a pointer to WAY-03, not read)

- **D-405** — marked `row 1`. Meaning (EN): the full gate runs build, Node tests, directories of Python tests, foundation check, in that order, one after another, and ends at the first stage that fails; the Node tests do not run beside the Python directories. Meaning (PL): pełna bramka uruchamia etapy po kolei — budowanie, testy Node, katalogi Pythona, kontrolę fundamentu — i kończy na pierwszym, który padnie; testy Node nie biegną razem z katalogami Pythona. Scope build-tools, Based on none, derives from D-77, Verification a pair of examples, Rejected = the source's "Not chosen" of question 1 (Node tests beside the Python directories: about one minute gained of about 15, more complex gate and test, more memory at the peak, unmeasured).
- **D-406** — marked `the cycle's` (no row carries it whole; point 3 and question 2 of the task carry it). Meaning (EN): the full gate gives the Python runner `--jobs 1`; `--jobs 1` is withdrawn only together with a repair after which a run with the directories at the same time starts Docker Desktop at most once and waits at most once, so that `gate-docker-start-waits-once` holds. Meaning (PL): pełna bramka uruchamia katalogi testów Pythona po kolei (`--jobs 1`); `--jobs 1` znika dopiero razem z naprawą izolacji testów z Dockerem, po której przebieg z katalogami jednocześnie startuje Docker Desktop najwyżej raz i czeka najwyżej raz. Scope build-tools, Based on none, derives from D-77 · D-390, Verification `tests:` (held by the `decision:` line) plus a pair for the part no test holds, Rejected = the "Not chosen" of question 2 (repair in the same change; stop and open a held-back request). The task and the date are named nowhere in it. The invariant is tied by identifier in the binding sentence; the invariant's own entry is unchanged (its *Derives from* stays D-390).
- D-77, D-83, D-49, D-73, D-28 unchanged. No glossary, invariant, part-map or environment-fact entry written.

## Checks

| Check | Command | Exit |
|---|---|---|
| New test fails for the expected reason, before the code change (`'' != '--jobs 1'`) | `npm test -- tests/quality/test_test_gate.py` | 1 (log `reports/author-test-gate-red.log`) |
| Same, after the code change (8 tests) | `npm test -- tests/quality/test_test_gate.py` | 0 (`author-test-gate-green.log`) |
| Docker gate tests, including the two failing ones (12 tests) | `npm test -- tests/quality/test_docker_gate.py` | 0 (`author-docker-gate-green.log`) |
| Other user of the fixture (1 test) | `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| Foundation check, with citations, after both commits' content | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" (`author-foundation-check.log`); D-405 and D-406 are not in its "listed" held-by-nothing report |
| Foundation check with `--skip-test-citations` after writing the entries | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0, "0 errors" |
| Ruff on the three changed Python files, with the repo's flags, using the main checkout's pinned `.runs/quality-venv` ruff | `ruff check --config ruff.toml --ignore-noqa --no-fix --no-cache scripts/test.py tests/quality/gate_fixture.py tests/quality/test_test_gate.py` | 0 |

Not run: the whole gate (`npm test` without argument), as the handoff says; Prettier and ESLint (no changed file of that kind).

## Own-work check

- Requirement most likely not met: "the two failing tests pass and no other change of behaviour". Check: ran the whole `test_docker_gate.py`, where the two named tests stand, and the other test file that uses the fixture, `test_node_test_selection.py`. Both exit 0, so the two tests pass in this tree and the fixture change broke no other user. Shown by the fixture only; the whole gate is the orchestrator's run.
- Mutation in the head: dropping `--jobs 1` makes the new test fail (that is the red run); passing `--jobs 2` fails it the same way; running the stages in another order leaves `built` and the markers present, so the order is not pinned by the new test (the test pins the argument and that all three stages ran, not their order). D-405's order is held by the pair of examples only, as it was before the change.

## Reach beyond the handoff

- `.the-way/elements/decisions/template.md`, `common/rules.md`, `common/way_of_working.md`, `decisions/skill/read.md`, `decide_entry.md`: named by the element's `SKILL.md`/`way_of_working.md`, read whole.
- `guidelines/testing.md`, read whole (handoff). Its "Test files in the gate" paragraph says the-way's runner "uruchamia w nich odkrywanie testów" and does not say the directories run at the same time or one after another, so it stays true; I did not edit it.
- `foundations/part_map.md` (the `build-tools` entry, to choose the scope) and a search of the foundation for `run_tests`, `--jobs`, `first stage`, `at the same time`, `one after another`: no entry already stated row 1 or D-406. Line 6094 of `decisions.md` (the memory-limit decision's measurement of the Node stage with other gates beside it) is a measurement, not a statement of order.
- `foundations/invariants.md:1298` (the invariant, whole), `foundations/glossary.md` headings (no term needed).
- `the author's rules for commits, outside the repository` (commit rules).

## Choices

- Marker with arguments in the fixture stand-in, rejected: a second stand-in only for this test (more code, two stand-ins to keep alike), and a timing test with the real runner on two directories (slow, unstable). Cost if wrong: the test pins an argument, so a later decision that withdraws `--jobs 1` must change this test with it; D-406 says so and its `decision:` line ties them.
- The new test also asserts that the build, the Python stage and the foundation stage all ran in a whole run; not their order.
- D-406 `Verification` names `tests:` with the `decision:` line, plus a pair for the part no test holds (the withdrawal of `--jobs 1` only with the repair). D-405 has a pair only: the test of the stage order was not asked, and the handoff wanted no other change.
- No size-rule move: `guidelines/coding.md` holds no rule of size (the task's question 5), so section 1's move does not apply.

## Problems observed

- Not mine to fix: the cause named in D-406 (`daemon_gap()` in `scripts/docker_gate.py` records a start that did not finish only after its wait ends via `record_gap`, and `recorded_gap()` is read before a start) was read in the code and matches the handoff; it was not re-measured by me. The isolation of the other Docker tests (names of containers, images, volumes, networks) was not examined; D-406 says so.
- A slip of mine in the first write of `decisions.md` dropped the last line of D-404's *Rejected* from the replaced text; I saw it in `git diff` (`+29 −1`) and restored it before committing. The committed diff is `+30 −0`.

## Questions

none.

## Unread material

- `.the-way/elements/decisions/examples.md` points to WAY-03 of the-way's own log; I did not open WAY-03 (the form was clear from the template and loop2's recent entries D-395 to D-404).
- `foundations/decisions.md`: D-83, D-49, D-73, D-28 (named in the handoff) read only as quoted in the frozen task's *Decisions in play*, not as whole entries, since I did not change them and they do not bear on the wording; D-77 and D-390, D-391, D-392 read whole. `part_map` entries `agent-workflow` and `product-foundation` not read (only `build-tools`).
- `.the-way/gate/run_tests.py`: only its `--help`, as the handoff names.
- `guidelines/testing.md` read in three pages, whole.

## Searches not found or unclear

- none for things looked up. One note: the repository's tests hold no other `decision:` line, so D-406 is the first test cited by a `decision:` line in `tests/`; the foundation check accepted it.

## Working copies

None made outside the worktree. `.runs/author/` held only my command logs; the ones the report needs were copied into `reports/` (`author-test-gate-red.log`, `author-test-gate-green.log`, `author-docker-gate-green.log`, `author-foundation-check.log`) and `.runs/author/` was emptied. No git worktree or clone created, nothing to prune. The ruff I ran is the main checkout's installed tool, used read-only from outside the worktree against the worktree's files; it left no file.
