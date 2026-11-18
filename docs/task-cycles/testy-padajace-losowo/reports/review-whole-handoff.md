# Handoff — review of the whole change (stage `review-whole`)

## Delegation

The human who requested this cycle has delegated intermediate choices to the orchestrator; there is no
human contact until the request. You do not ask the human; questions go to the orchestrator in your
return (first line `questions`).

## Where you work

- Worktree (the product root; work from it, read-only): `the root of the worktree`, branch `task/testy-padajace-losowo`.
- Range to review: from the task's base `659b1e0255cd66d4768469191f408d9d266081a3` (`origin/main`) to the head `4cf96da1` — the whole change, two commits: `5206fd2d` (foundation and register) and `4cf96da1` (the two test changes). One-author route: there are no slices, no plan and no spec; the whole change is judged by you alone.
- Your directory for working copies: `.runs/review-whole/`. Your report: `.runs/task-cycles/testy-padajace-losowo/reports/review-whole-report.md`.

## Method

Read `.the-way/task-cycle/review/SKILL.md` whole and follow it ("the whole change"). Read a file it names, one beside it included, only when the step or variant that names it comes. Do not call a skill; every method is read as a file. You select your own foundation and guidelines by the parts of the change, as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md` give; write and read the index of your whole selection and state in your report how many decisions you read whole. The parts the change touches: deployment (`tests/deploy/test_loop2_watch.py`), account-server (`tests/transport.test.mjs`), agent-workflow (`tests/flaky-tests.md`, `guidelines/testing.md`), product-foundation (`foundations/decisions.md`, `foundations/part_map.md`).

## Inputs

- The frozen task, whole: `.runs/task-cycles/testy-padajace-losowo/task-frozen.md`. Cover every item: the five points of *To do*, the acceptance criterion, *Settlements to record* row 1, the four register entries a–d with the content of the task's *Context* word for word, and *Out of scope*.
- The author's report: `.runs/task-cycles/testy-padajace-losowo/reports/author-report.md`, with the measured series in `.runs/task-cycles/testy-padajace-losowo/reports/author-load-series/`. The report names things its author did not read: the decision index read as 60 lines only, `tests/deploy/test_loop2_watch.py` and `tests/transport.test.mjs` read in part (the whole files ran green), and a note that the "Context" of the task lists the trials' conditions as one list while the earlier cycle's reports give different conditions per test. Judge those gaps in your review.
- Answers of step 4: the change does not touch a trust boundary (nothing of a part's *Trust boundary* list); it holds no operation that cannot be undone. No move of the pin. No Minor or out-of-scope findings of earlier reviews (there are none).
- The earlier cycle's reports (for checking a quoted fact of the register against its source): `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-18-report.md`, `executor-19-report.md`, `executor-20-report.md`.
- The author wrote one comment in the test of point 1 (`# The break: …`); judge it against D-82 and the testing guidelines' rule on comments.
- The whole-file loops of the author's load reported one failed file run in five of six loops; the author did not keep which file. That is an observation, not a task item; say whether the register or the task should treat it, only if you find it bears on the change.

## Boundaries

Read-only: you change no file of the repository and make no commit. You may run focused checks (a single test file, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`) and must report each with its command and exit code; do not run the product's full gate (`npm test` without arguments), which is the orchestrator's. Check the register's wording in Polish, the verbatim error messages and test names, the number of runs of each entry, and that the register holds no claim the task's *Context* or the quoted earlier reports do not hold.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Report

First line `PASS <sha>`, `FAIL <sha>` or `questions`, as the method gives; each finding graded, with its place (`file:line`), its full wording and a developed ground; for each blocking finding, the slice it comes from, or that it comes from none (here: none, no slices); **Unread material** and **Searches not found or unclear** as the method gives. Where you find Minor findings within the task, list them so the orchestrator can cut them in your words; mark a finding outside the task's scope as such.
