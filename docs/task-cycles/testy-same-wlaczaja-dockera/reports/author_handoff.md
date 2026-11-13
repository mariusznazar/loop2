# Handoff — the one author, `make-change`, task "Testy gry same włączają Dockera, gdy nie odpowiada"

## Delegation and place

- The person who requested this cycle delegated every intermediate choice to the orchestrator; you
  get no human contact. Questions go to the orchestrator in your report (status `questions`).
- Work only in the worktree `the repository's root`, branch
  `task/testy-same-wlaczaja-dockera`, base commit `1b0c8ad4466fdd6d067da7bbc27b10458d81012b`. Work from
  its root. `.the-way` there is at the commit `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Method: `make-change`. Read whole `.the-way/task-cycle/change/SKILL.md` in the worktree, and a file
  it names (`fix.md`, `slice.md`, `ui_check.md` beside it) only when the step or variant that names
  it comes. Your variant is **"the whole change as the one author"**. Use the project skill
  `the-way-make-change` only as the entry point to that file, never a personal skill.
- Stage and boundary: you make the whole change — code, tests, the foundation step (the entries the
  task carries, by `.the-way/task-cycle/skill/foundation_step.md`, which you read whole when you
  reach that step) — commit it, and return before any review. You run no product gate
  (`npm test` in full, or `foundation_check.py`) — that run is the orchestrator's (WAY-160); you run
  your focused checks, each with its command and exit code in the report.
- Do not stop or restart Docker Desktop, and do not start a second full gate: other work may use the
  computer's Docker at this time. The real check of the task's step 6 (stopping Docker Desktop and
  running the full `npm test`) is the orchestrator's alone; you prepare the code so it can be made.

## Frozen task

Whole task, frozen: `.runs/task-cycles/testy-same-wlaczaja-dockera/task.md`
(source document accepted 2026-11-13). Read it whole. Its *Questions carried to cycle* names your
one choice: where in code the start of Docker stands — in `scripts/test.py`, in a shared helper of
the tests, or in both — within the answers to its questions 1–3 and the acceptance criterion of
the single wait per run. Make that choice, name it in your report and its reason. Note the bound the
task's *Context* gives: the gate runs the Python test directories one after another, each in a
process of its own (`.the-way/gate/run_tests.py:93`), so a failed start recorded only in one
process does not reach the next; the acceptance criterion needs the single wait to hold across them.

## Answers of step 4 (orchestrator)

- Trust boundary touched: no. Irreversible operation: no. No review aimed at either is needed.
- Open design choice: none; no reserved choice. No spec, no plan.
- The orchestrator's choices so far: none beyond the above.

## Foundation to read (by "Reading the foundation", `.the-way/elements/common/way_of_working.md`)

- Decisions, each whole, in `foundations/decisions.md`: D-77, D-84 (named by the task), and those whose
  *Scope* names the parts you touch (build-tools — `scripts/test.py`; deployment —
  `tests/deploy/**` and the container tests of `tests/invariants/`; test-helpers —
  `tests/invariants/loop2_invariant_support.py`; product-foundation — your entries): D-28, D-30,
  D-49, D-73, D-78, D-81, D-83, D-85, D-89, D-235, D-351, D-362. Find any other whose *Scope*
  names a touched part and the work needs, by the method's search.
- Invariants: those whose *Part* names a touched part or `every`, and those the tests you alter
  cite by `invariant: <identifier>` (for example `account-schema-lifecycle`); entries they link to,
  as far as you need them.
- The part map `foundations/part_map.md` (whole; short enough) and the glossary
  `foundations/glossary.md` (and the-way's glossary at the pinned commit) for the terms you use.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md`. No kind file of
  `guidelines/coding-*.md` matches the work.
- Also read `AGENTS.md` of the product (its test rules) and `the author's note of rules for writing scripts`
  before you write a script (line endings, console encoding, backslashes in Python literals).
  Commit messages are in English, one commit per logical step, `git add` by path (never `git add -A`).

## What the change must be

The task's *To do* 1–5 and *Acceptance criteria*, exactly; its *Settlements to record* rows 1–4 as
foundation entries (rows 1–3 decisions, row 4 an invariant — each row's identifier and wording is
yours to write through the element's project skill as `foundation_step.md` gives; check the entry's
*Verification* names a test that fails when the rule is broken). Out of scope: Docker on the test
server and the deployment.

Hints from the orchestrator's own reading (verify them, they are hypotheses):

- The eight test files that skip without a daemon are listed in the task's *Context*; five carry
  their own copy of `docker_answers`, `tests/deploy/test_loop2_tunnel_image.py` checks the daemon its
  own way, and `test_account_backup_stream.py` and `test_restore_trial.py` take the function from
  `test_account_storage.py`. Reduce the copies where you can without widening the task; do not
  rewrite what the task does not need.
- Single file run: `scripts/test.py` loads the file in its own process (`python_file`), full run:
  `scripts/test.py` → `.the-way/gate/run_tests.py` → one process per directory. The `.the-way`
  directory is the pinned process and is never edited.
- `docker desktop status` can say `stopped` while the daemon answers; only a real answer of the
  daemon (`docker version`) counts (task *Context*). `docker desktop start` has `--timeout` and
  `--detach` on this computer (`docker desktop start --help`).
- Tests of the new mechanism must not start or stop the real Docker Desktop of this computer; they
  use a stand-in `docker` (D-235 and `tests/deploy/backup_script_support.py` show the way) and prove
  the reaction, as the testing guidelines state. State plainly in your report what the stand-in does
  not prove (the real start), which the orchestrator checks.
- Platform: this computer is Windows 11; the gate must still skip at once on a machine with no
  Docker Desktop (Linux, a cloud container). Detect Docker Desktop by what the machine has (the
  `docker desktop` plugin command), not by the operating system's name alone, where you can.
- The wait is bounded: 3 minutes in total, once per gate run, whatever the number of test files or
  directories; every later test of the run that needs Docker skips at once with a message that says
  the start was tried and did not finish, and what stays unchecked.

## Report

Write the full report to
`.runs/task-cycles/testy-same-wlaczaja-dockera/reports/author_report.md`
as the method gives it, with **Unread material** and **Searches not found or unclear** sections
(each `none` where it is none), the own-work check, and each check you ran with its command and exit
code. Return: status, commits, a one-line check result naming what failed or did not run, the
report's path, your questions and concerns, any reach beyond this handoff.
