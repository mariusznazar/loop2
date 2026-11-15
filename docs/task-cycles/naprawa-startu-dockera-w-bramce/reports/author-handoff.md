# Handoff to the one author — task `naprawa-startu-dockera-w-bramce`

## Delegation

The person who requested this cycle has delegated the intermediate choices of the cycle to the
orchestrator; the orchestrator now delegates the whole change to you. Nothing you decide is the
human's approval. You ask the human nothing: a question goes to the orchestrator in your report.

## What you do

Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), your variant: **the whole change as
the one author**. Read that `SKILL.md` whole, and a file it names, one beside it included, only
when the step or variant that names it comes.

Worktree (work from its root, only there): `the task's worktree`,
branch `task/naprawa-startu-dockera-w-bramce`, base `a1306b53`. Its `.the-way` is at the commit the
gitlink records (`ec7929d0`). `npm ci` has run there; `node_modules/` exists.

Frozen task, read whole: `.runs/task-cycles/naprawa-startu-dockera-w-bramce/task-frozen.md`.
There is no spec and no plan: the cycle judged that the task leaves no open design choice and that
one agent holds the change.

Your report: `.runs/task-cycles/naprawa-startu-dockera-w-bramce/reports/author-report.md`
(its name starts with the role, as the harness requires). Your directory for working copies:
`.runs/author/` of the worktree.

## Answers of step 4

- Trust boundary: no. The files you change (`scripts/docker_gate.py`, `scripts/test.py`,
  `tests/quality/**`, `README.md`, `foundations/**`) are none of the boundary files the part map
  names for `build-tools`.
- Irreversible operation: no.
- Open design choice: none. The task's "Questions carried to cycle" are choices of how to make what
  the task and the foundation settle; you make them and name each in your report (they enter the
  questions table of the cycle record): (1) the way a start in progress becomes visible to the
  other processes of the same run, and what becomes of the record of a process that died in the
  middle of a start; (2) what the new answer of D-406 puts in the place of the test that pins
  `--jobs 1`, for its *Verification*.
- Route: one author without a plan. Your class: `same` as the orchestrator's (concurrency across
  processes with a dead process to account for, and foundation entries in three decisions).

## What the change must be, and the order of your commits

The task's *To do* 1, 2 and 4 are yours; item 3 (the three full runs of `npm test`) is the
orchestrator's: **never run the full gate** (`npm test` without a file argument, or
`.the-way/gate/run_tests.py` over the repository). Run focused checks only, for instance
`python -B scripts/test.py tests/quality/test_docker_gate.py` and the same for
`tests/quality/test_test_gate.py`, and
`python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after a foundation
entry (the full citation run is the orchestrator's).

Make the change in **two parts, each in commits of its own**, so that the second can be reverted
alone:

1. **The repair of the start** (item 1) with its tests (extend `tests/quality/test_docker_gate.py`
   for the cases the way you chose adds: a start in progress seen by a second process, a process
   that died in the middle of a start, a start that succeeds seen by processes that began during
   it), and the foundation entry of settlement row 2 (the sentence of D-390 and what the row's
   text says about the test of a successful start). Item 2 (the check whether the Docker tests of
   `tests/deploy` and `tests/invariants` can collide when both directories run at once) is a
   reading: put the result, test by test, into your report, with the files and lines read; a
   collision you find is not repaired here but named with the test's name.
2. **The side-by-side run** (item 4): withdrawal of `--jobs 1` from the Python stage of
   `scripts/test.py` and its comment; the test that pins it
   (`tests/quality/test_test_gate.py`, `test_the_whole_gate_runs_its_stages_and_gives_the_python_runner_one_job`,
   line `decision: D-406`) replaced by what the new D-406 answer's *Verification* needs; the
   sentence about running one after another in `README.md`; the new answer of D-406 in place
   (settlement row 1) and the corrected last sentence of the rationale of D-405 (only its
   rationale; its answer stays). The orchestrator measures the tree with this part in; where the
   three full runs show a failure that appears only with the directories side by side, the
   orchestrator reverts this part and D-406 stays.

Before the repair, show with the focused tests that they fail as the task says when the
directories run side by side: remove `--jobs 1` in a working copy of your own (or in the tree
before part 1) and run `tests/quality/test_docker_gate.py`; record the failing run (command, exit
code, the two `AssertionError: 2 != 1`) and then the passing run after the repair. The acceptance
criterion is that the `GateRuns` tests pass when the gate runs its directories side by side; the
fixture copies the real `scripts/test.py`, so they exercise that once part 2 stands.

## Read

- Foundation entries by identifier, each whole: D-390, D-391, D-392, D-405, D-406 (of
  `foundations/decisions.md`), the invariant `gate-docker-start-waits-once` (of
  `foundations/invariants.md`), the part-map entries `build-tools` and `product-foundation`. Select
  the rest of the foundation as the foundation step gives; D-77, D-83, D-49, D-73, D-28 are named
  by the task as out of scope: read them only to know what not to change.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md` (the `integration test`
  recipe and "Changing an existing test" bear on you; the gate-stage test you replace is a test
  you change for a cause the requirement gives).
- The foundation step: `.the-way/task-cycle/skill/foundation_step.md`, whole; and, for each
  element you write, the `SKILL.md` of that element as that file gives.
- Evidence of the fault, if you need it: `git show c7900a9b5735b055e95e5ea80cf816c2051d3b65:docs/task-cycles/krotsza-bramka-procesu/cycle.md`
  and the logs `reports/gate-pin-run1.log`–`run3.log` of the same commit.
- The code: `scripts/docker_gate.py` (`daemon_gap`, `record_gap`, `shared_state`),
  `scripts/test.py`, `tests/quality/docker_standin.py`, `tests/quality/gate_fixture.py`,
  `tests/quality/test_docker_gate.py`, `tests/quality/test_test_gate.py`, the docker-using tests
  of `tests/deploy` and `tests/invariants`.

## Working copies (copied word for word from the cycle's method)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed.
The files that a product's own tools and tests make by themselves are no working copy of the agent
and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a
worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside
its report what the report needs, and states in the report where each copy stood and that it was
removed. Where a removal fails, the agent finishes all the same and names in the report the
remainder, with its full path and the reason it stayed.

## Commits and limits

Commits go on this branch; commit messages in English, in the style of the repository's history
(`type: :emoji: lowercase sentence`); `git add <path> <path>` by path, never `git add -A`, `git add .`
or `git commit -a`. Do not push. The ignored `.runs/` stays out of commits. The docker tests of the
repository that use a real Docker are not run by you in a way that starts or stops the Docker
Desktop of this computer except through the stand-in of `tests/quality/docker_standin.py`
(the stand-in never touches the real one).

## What your report holds

As `make-change` gives it, including: the own-work check, each check with its command and exit
code, the failing and passing runs of the focused tests, the foundation entries you wrote with
their meaning sentences, the choices (1) and (2) above with the way rejected and the cost if
wrong, the result of item 2, **Unread material** and **Searches not found or unclear** (each, or
`none`), and the working copies and their removal. Return status, commits, a one-line check
result, and the report path.
