# Handoff — review of the whole change (task `ci-przy-pr`)

You review the whole change of the task as an agent that made none of it, with `review-change`: `.the-way/task-cycle/review/SKILL.md` (read it whole; a file it names, and `.the-way/task-cycle/review/whole_change.md` for this variant, only when the step that names it comes). Variant: the review of the whole change.

## Where

- Worktree (your working directory, read-only for you): `the task's worktree`, branch `task/ci-przy-pr`.
- Range: from the task's base `bdf0dbd7` (merge of PR #134, `origin/main`) to the head `51596257`. It holds two parts:
  - `e5ad01fb`, the branch's first commit, made by the cycle's orchestrator with the installer: it moves the pin of `.the-way` from `ec7929d` to `bfb2e109735b5fff98802b8be0ff3c43c799262a`. It must hold only the gitlink at that commit and what the installer owns (the `the-way-*` entry points in `.claude/skills/` and `.agents/skills/`, the block of `AGENTS.md` between its markers, the agent-type definitions in `.claude/agents/`). Check that.
  - `5d6c57e5`, `5d70d505`, `51596257`: the one author's commits.
- The checks the pin move carried: the full gate run on `e5ad01fb` passed (exit 0, 591 tests in 4 directories, 0 errors of the foundation check); the move broke nothing.
- Your directory for working copies: `.runs/review-whole/`.

## What you receive

- The frozen task, to be read whole: `.runs/task-cycles/ci-przy-pr/task.md` (its *To do*, *Acceptance criteria*, *Questions to settle* with answers, *Decisions in play*, *Settlements to record*, *Out of scope*). The task's items and the four rows of *Settlements to record* are what you check coverage of; row 3 goes to a comment in the CI file, rows 1, 2 and 4 to foundation entries.
- No spec and no plan (one author, no plan).
- The author's report: `.runs/task-cycles/ci-przy-pr/reports/author-report.md`. Its sections you must weigh: *Foundation entries*, *Choices made*, *Questions and concerns for the orchestrator*, *Reach beyond the dispatch*, *Unread material*.
- The author did not read the index of decisions the orchestrator selected for it (`.runs/task-cycles/ci-przy-pr/prep/index.txt`; decisions whose *Scope* names `build-tools`, `deployment` or `agent-workflow`) and so not D-73, D-83, D-85, D-89 and D-16 whole. You select your own foundation and guidelines by the parts of the change (`elements/common/way_of_working.md`, "Reading the foundation"); this gap is carried to you: judge whether anything in those decisions, or others the change touches, is contradicted.
- The orchestrator's answers to the two questions at start: the change touches no file that the part map names as a trust boundary, but the new workflow takes the code of a pull request from outside into a runner. **Check that workflow as you would a boundary**: the event is `pull_request` and never `pull_request_target`; no secret; at most read permission; no text of the request (title, branch name, description) in a command; actions pinned; the submodule checked out at the gitlink's commit. It holds no irreversible operation; the ruleset on GitHub is a later action of the human and nothing in this change makes or needs it.
- Rejected on purpose by the task (do not report these as defects): a separate secret scanner in CI; the scanner as a test of `npm test`; `check_instructions.py` first in the order; the skip of Docker tests on every computer with no Docker Desktop; the ruleset change in the repository's settings; the text of `security-notes.md`; replacing the local gate by CI.
- Known, to be judged and not assumed fine: D-412's *Based on* is a `TODO` (the author did not write GitHub's address and passage from memory). The foundation check accepts it; judge whether it is right to leave it, and what the request should tell the human.
- Beyond the dispatch the author found: every file under `.github/workflows/` counts as a deployment file for `tests/invariants/loop2_invariant_support.py`; the author added the new workflow to the "not a route" list of `tests/invariants/test_account_server_typecheck.py` (invariant `account-server-typecheck`) — judge whether the assertion is weakened.

## Also asked of you

- The workflow runs on Linux and the cycle cannot run Linux Actions before its first run on GitHub. If, reading the tests the gate runs and the scripts behind them, you see a place that would fail or skip on Linux and is no error of the game, name it as an observation with its place (file and line) and say how sure you are; the first CI run will settle it. A failure of a test on Linux caused by the environment is for the cycle to fix in this task; one that shows a defect of the game or the deployment is for the human.
- You do not run the full gate (`npm test` with no argument): that run is the orchestrator's. Focused runs are yours (`npm test -- <one test file>`, `foundation_check.py`, `check_instructions.py`).

## Report

Write it to `.runs/task-cycles/ci-przy-pr/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` with the head you reviewed; findings graded as `review-change` gives, each with its place as `file:line`, and for a finding that blocks the slice it comes from (here: none, one-author route). Include the sections **Unread material** and **Searches not found or unclear** (`none` where none), the checks you ran with command and exit code, and the working copies line. Return: the first line, the paths, the checks. Do not fix anything.

Working copies, word for word from the cycle's process:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
