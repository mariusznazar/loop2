# Handoff — review of the whole change, `review-change`

You are a fresh reviewer that made none of this change. Work from the root of the worktree
`the root of the task's worktree` (branch `task/proba-bez-wersji-zapisu`); never `cd` out of it.
You are read-only on the repository: change no tracked file and make no commit.

## The user's delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; nothing here is that
person's approval. Ask no human anything: a question goes back to the orchestrator in your report.

## Method and stage

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; read a file it names only when the step that names it comes.
- Stage: the review of the whole change (one author, no plan, no slices, no spec). Range: base `e3295528` to head `ca90b465`
  (`git diff e3295528..ca90b465`; two commits: `9d8cfce3` the decision and the quotations in a test, `ca90b465` the two copies of the instruction).
  Read the full diff of the range.
- You select your own foundation and guidelines by the parts of the change, as "Reading the foundation" in
  `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md` give; state in your report how many decisions you read whole and how many by title only.
- Return the report's first line as `PASS <sha>` or `FAIL <sha>`, then your graded findings; you alone grade and scope.

## What the change was to make

- The frozen task: `.runs/task-cycles/proba-bez-wersji-zapisu/task.md` — read the whole of it. Judge every item of its *To do*, the *Acceptance criteria*, the
  settlement row 1 of *Settlements to record* and the *Out of scope*, and the fidelity of the change to the task (nothing the task does not carry, nothing it carries missing).
- The author's report: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/author-report.md` (read in full; its checks carry commands and exit codes).

## Answers of the orchestrator you need

- Trust boundary: no. Irreversible operation: no. Open design choice: none. Route: one author without a plan; the author's class `same` as the orchestrator.
- The task was accepted at `be597c41`; the base `e3295528` words things differently. The orchestrator reconciled it (record question Q1) and told the author:
  the log says "operator", not "owner"; the *Verification* "complies" line of D-234 also carried the condition and leaves it too (the task's *Context* says it needs no change, which no longer holds at the base);
  five comments `# decision: D-234 "…"` in `tests/deploy/test_restore_trial.py` quote the binding sentence word for word and follow it; both instruction copies stay byte-identical.
  Judge whether this reconciliation is right and whether anything else of the repository still states the removed condition.
- Two things the author added beyond the task's literal text, named by the author in its report under *Choices*; judge each against "never widen the task" and the task's intent:
  (1) one sentence in D-234's *Rationale* saying why a change of the saved game's version is no moment to repeat the trial;
  (2) the clause "take the backup for the trial from a night after that" at the end of the new hint in both instruction copies.
  Say whether each is within the task, and grade it.
- The author's report names unread material: the part map entries of `product-foundation`, `agent-workflow` and `deployment`, `foundations/invariants.md` (only searched), the glossaries, `guidelines/coding.md` and `guidelines/testing.md`.
  That gap is yours to close in your own selection: read the invariants that cite D-234, the restore trial or the deploy skill, the glossary entries of the words the change uses,
  and the guidelines of the parts touched (a test file's comments change; the instruction copies belong to `agent-workflow`; the decision log to `product-foundation`), each whole.
- The product's gate (`npm test`) is not yours to run; the orchestrator runs it. You may run focused checks (the foundation check
  `python -B .the-way/elements/common/foundation_check.py`, the deploy skill test, `tests/deploy/test_restore_trial.py`), each recorded with its command and exit code, never through a pipe that hides the exit code.
  A skipped test is unchecked, not passed.

## Working copies

Your directory for working copies is `.runs/review-whole/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## Report

Write your full report to `.runs/task-cycles/proba-bez-wersji-zapisu/reports/review-whole-report.md` as `review-change` gives it
(first line `PASS <sha>` or `FAIL <sha>`; graded findings with the place in the code and the reason; the checks with command and exit code;
the coverage of every task item and of settlement row 1; source fidelity; **Unread material**; **Searches not found or unclear**; working copies).
List the Minor findings within the task apart from those outside the task's scope. Return the first line, the path and the one-line check result.
