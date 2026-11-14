# Handoff — the one author, `make-change`, "the whole change as the one author"

## Delegation

You are the one author of a task cycle of the-way, dispatched by its orchestrator. The orchestrator
has delegated the intermediate choices of this cycle; nothing you decide is the human's approval.
You do not ask the human. A question goes in your report with status `questions`; a design choice
the task and the foundation leave open goes in your report with status `returned` and no code.

## Where and what

- Worktree: `the repository root`, branch `task/krotsza-bramka-procesu`,
  head `6b4487d1` (the commit that moved the pin of the-way to `ec7929d`). Work from its root.
  Every path below is from that root unless it starts with a drive letter.
- Process pin: `.the-way` at `ec7929d02164c8754f0236d93db52624688967e6`.
- Your method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one author".
  Read it whole; read a file it names only when the step or variant that names it comes. You have no
  skill tool; every method of the-way is a file you read.
- The foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole. You write the
  foundation entries below with the element's `SKILL.md` it names (the path is in that file), as
  the file gives. You do not take the return step now; the orchestrator resumes you for it.
- Frozen task: `.runs/task-cycles/krotsza-bramka-procesu/task.md` (read it whole; the task is in
  Polish, every entry you write and every comment in code is in English).
- Your directory for working copies: `.runs/author/`. Your report:
  `.runs/task-cycles/krotsza-bramka-procesu/reports/author-report.md`.

Copied word for word from the cycle's rules for working copies:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Answers of the start of the cycle

- Touches a trust boundary: no. Holds an irreversible operation: no.
- Open design choice: none (settlement row 1 of the task and its questions 1 and 2 settle what you write).
- Reserved choice: none. Route: one author without a plan, your class `same` as the orchestrator's.
- The task moved the pin; the checks that moved with it, from the orchestrator's gate on `6b4487d1`
  (three runs, the same result each time): exactly two tests fail,
  `tests/quality/test_docker_gate.py` `GateRuns.test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once`
  and `GateRuns.test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`, both
  `AssertionError: 2 != 1` (two starts of Docker Desktop, one expected). Nothing else failed in 588
  tests. Your change must make them pass; no other change of behaviour is wanted.

## What you read (WAY-150, WAY-213)

Foundation, by identifier, each whole (from its heading to the next heading):

- decisions of the task's *Decisions in play*: D-77, D-83, D-49, D-73, D-28; and the decisions of the
  gate's start of Docker: D-390, D-391, D-392;
- invariant `gate-docker-start-waits-once`;
- the part map entries `build-tools`, `agent-workflow` and `product-foundation`.

Guidelines, each whole: `guidelines/coding.md` and `guidelines/testing.md`. No row of the kind
index of `guidelines/coding.md` matches the files you change, so no `guidelines/coding-<kind>.md`.

Code and tests you will need: `scripts/test.py`, `scripts/docker_gate.py`,
`tests/quality/test_test_gate.py`, `tests/quality/test_docker_gate.py`,
`tests/quality/gate_fixture.py`, `.the-way/gate/run_tests.py` (its `--help`).

## The change

1. `scripts/test.py`: in the full gate, the stage that runs `.the-way/gate/run_tests.py` is given
   `--jobs 1`, so that the directories of Python tests run one after another. Nothing else about
   the stages changes: build, Node tests, Python directories, foundation check, in that order, the
   run ending at the first stage that fails (settlement row 1, question 1 of the task). The Node
   tests do not move beside the Python directories, and `scripts/docker_gate.py` is not changed
   (the repair of the isolation is a later task: question 2 and *Out of scope* of the task).
2. The test of the gate that pins `scripts/test.py` (`tests/quality/test_test_gate.py`, read it
   first): keep it passing and make it pin the argument, so that dropping `--jobs 1` makes a test
   fail. Choose the smallest change that fits that file's way of testing; follow
   `guidelines/testing.md`.
3. Foundation entries, written through the element's skill, never by hand:
   - A decision for settlement row 1 of the task: "Pełna bramka gry uruchamia testy Node przed
     katalogami Pythona, nie jednocześnie z nimi, i kończy na pierwszym etapie, który padnie."
     Source: question 1 of the frozen task, answered by the human through the day advisor on
     2026-11-13. Its rejected way: the Node tests beside the Python directories — about one minute
     gained of about 15, a more complex `scripts/test.py` and its test, more memory at the peak,
     which nobody measured.
   - A decision that the full gate runs the directories of Python tests one after another, with
     `--jobs 1`, with the reason and what has to be repaired in the isolation of the tests (point 3
     and question 2 of the frozen task). Take every fact from the evidence below and from the code
     named there; a fact they do not give is a question in your report, never a value you write.
     The decision names no task and no date; it says what the repair has to achieve, so that a
     later decision can withdraw `--jobs 1` when the repair is done. It derives from D-77 and
     D-390 and relates to invariant `gate-docker-start-waits-once`; the element's skill settles
     the fields and what else the search of the foundation finds.
   Do not change D-77, D-83, D-49, D-73 or D-28 (the task leaves them as they are).

## Evidence for the second decision (facts, not conclusions)

- Three full runs of `npm test` on `6b4487d1` with the directories at the same time (the default of
  the process's script), no other registered gate run, one machine of 32 GB: total 1117.6 s,
  1099.4 s, 1176.3 s (18.6, 18.3, 19.6 min). The earlier measurement of the gate with the directories
  one after another: 23.0–28.0 min (frozen task, *Context*). `tests/invariants` 1022.3, 1015.9,
  1068.4 s; `tests/deploy` 912.9, 848.0, 924.8 s. Logs: `.runs/task-cycles/krotsza-bramka-procesu/reports/gate-pin-run1.log`,
  `gate-pin-run2.log`, `gate-pin-run3.log` there.
- In each of the three runs exactly the two tests named above failed, `2 != 1`, and no other test of
  588 failed.
- The same test file run alone on the same tree: without change, the same two tests fail; with
  `scripts/test.py` giving `--jobs 1`, all 12 tests pass (exit 0). Logs:
  `reports/diag-jobs1-A.log`, `reports/diag-jobs1-B.log` there.
- The mechanism is in `scripts/docker_gate.py`, `daemon_gap()`: a start that did not finish is
  recorded in the state file of the run only after its wait ends (`record_gap`), and a process asks
  that file before it starts Docker Desktop. Two directory processes running at the same time both
  find no record, so both start Docker Desktop and both wait. Verify it in the code before you rely
  on it. The two tests run the real script of the process on two fixture directories that each need
  Docker (`tests/quality/test_docker_gate.py`, class `GateRuns`).

## Checks you run, and do not run

- Run the focused checks yourself and record each with its command and exit code:
  `npm test -- tests/quality/test_test_gate.py`, `npm test -- tests/quality/test_docker_gate.py`,
  `python -B .the-way/elements/common/foundation_check.py`, and the checks the element's skill asks.
- Do NOT run the whole gate (`npm test` without an argument): the orchestrator runs it. A machine
  of the day advisor is shared, and a whole run needs a signal the orchestrator waits for.
- Commit on the task branch, files added by explicit path, never `git add -A`; messages in English
  in the style of `git log` of this repository (`type: :emoji: text`). The foundation entries
  and the code may be one commit or several; the order is yours.

## Your report

By the report's rules of `change/SKILL.md`: status, commits, every check with its command and exit
code, the own-work check, the reach beyond this handoff, **Unread material**, **Searches not found
or unclear** (each `none` or a list), and your working copies with their removal.
