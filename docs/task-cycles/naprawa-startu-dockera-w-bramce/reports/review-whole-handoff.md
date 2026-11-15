# Handoff to the reviewer of the whole change — task `naprawa-startu-dockera-w-bramce`

## Delegation

The person who requested this cycle has delegated the intermediate choices to the orchestrator.
You review; you fix nothing and you write no file except your report. Nothing you return is the
human's approval.

## What you do

Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the whole change. Read it whole,
and a file it names only when the step that names it comes. You are a fresh agent that made none of
the change.

Worktree (read only): `the task's worktree`,
branch `task/naprawa-startu-dockera-w-bramce`. Range to review: base `a1306b53` to head `826b2a63`
(three commits: `5cf9df53`, `ed932e40` — part 1, the repair of the start —; `826b2a63` — part 2,
the side-by-side run, which alone reverts part 2). Take `git diff a1306b53..826b2a63`.

Frozen task, whole: `.runs/task-cycles/naprawa-startu-dockera-w-bramce/task-frozen.md` (every
item of its *To do* 1, 2 and 4, the acceptance criterion and both settlement rows; the task's
item 3, the three full gate runs, is the orchestrator's and is still to be made). No spec, no plan:
the one-author route. The author's report:
`.runs/task-cycles/naprawa-startu-dockera-w-bramce/reports/author-report.md`.

Answers of step 4: trust boundary — no; irreversible operation — no. So no review aimed at either
risk is asked of you; judge them yourself if you find the answer wrong.

You select your own foundation and guidelines by "Reading the foundation" in
`.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, for the
parts of the change (`build-tools`, `product-foundation`; the test files live in `tests/quality/`):
state in your report how many decisions you read whole and how many by title only. The task's
*Decisions in play* are D-406, D-390, D-391, D-392, D-405 and the invariant
`gate-docker-start-waits-once`. The author left unread the part-map entries and D-77, D-83, D-49,
D-73, D-28 (the task names the last five as out of scope); judge the change against what they say.

## What to weigh in particular

- The repair: an operating-system lock (`start_lock` in `scripts/docker_gate.py`: `msvcrt.locking`
  on Windows, `fcntl.flock` elsewhere), a waiter that re-reads the gap and re-asks the daemon, and a
  split of `daemon_gap` into `daemon_gap` and `started_gap`. Does a run with the directories side by
  side start Docker Desktop at most once and wait at most once, also when processes begin at
  different moments, when the start succeeds, and when it does not finish? What does the waiter do
  when the starter dies or hangs? The author says the `fcntl` branch is untested on this computer
  (Windows): judge that risk from the code.
- The stand-in `docker` of `tests/quality/docker_standin.py` was changed (its calls take turns
  through a lock directory): does that change what any existing test proves?
- The tests: `tests/quality/test_docker_gate.py` (new class `ProcessesAtOnce`, the lines
  `decision:` and `invariant:` on tests) and `tests/quality/test_test_gate.py` (the pin test of
  `--jobs 1` replaced by a behaviour test). Do they fail for the fault they name, and only then?
  Is the rendezvous test of part 2 safe on a loaded computer (it waits 20 s)?
- The foundation entries: D-390's new paragraph (settlement row 2), D-406's new answer in place
  (row 1), D-405's rationale last sentence only. Do they say what the rows say, no more? Does the
  change leave any text that still says the directories run one after another (README, docstrings,
  other decisions, `guidelines/`)? Does a decision or invariant outside the change now contradict
  it?
- Source fidelity against the frozen task: item 2's result (no collision found between the Docker
  tests of `tests/deploy` and `tests/invariants`) — check the author's table against the code for
  at least the test files it names.
- Part 2 is conditional: the orchestrator will measure this tree with three full runs and reverts
  `826b2a63` if a failure appears only with the directories side by side. Check that reverting
  that one commit leaves part 1 whole and consistent.

You run no full gate. Focused checks are yours to run as `review-change` gives; each with its
command and exit code. Do not start or stop the real Docker Desktop of this computer.

## Working copies

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

Your directory for working copies: `.runs/review-whole/` of the worktree.

## Report

Write it to `.runs/task-cycles/naprawa-startu-dockera-w-bramce/reports/review-whole-report.md`; its
first line is `PASS <sha>` or `FAIL <sha>` as `review-change` gives it (the sha of the head you
reviewed). It holds the graded findings, the checks you ran with command and exit code, **Unread
material**, **Searches not found or unclear**, the count of decisions read whole and by title, and
your working copies and their removal. Return the first line, the report's path and a one-line
check result.
