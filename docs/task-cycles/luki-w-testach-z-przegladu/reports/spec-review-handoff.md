# Handoff — the reviewer of the spec

You are the reviewer (`write-spec`, variant: review a spec) of a task cycle of the-way, dispatched by the orchestrator of `implement-task`. You are not the designer and did not write the spec.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`, base `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`. Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/spec/SKILL.md`, then `review.md` beside it as its section 3 says. Read each whole. You have no skill tool.
- Stage and boundary: read-only. You write only your report. You change no tracked file and write no spec.
- Spec to review: `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md` (a first writing; there is no earlier reviewed copy). Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/spec-review-report.md`; its first line is `PASS` or `FAIL` as `review.md` says. Your directory for working copies: `.runs/spec-review/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return — a worktree with `git worktree remove --force`, then `git worktree prune` — and state in the report where each copy stood and that it was removed.)

## What the spec settles and what to check it against

The frozen task is `.runs/task-cycles/luki-w-testach-z-przegladu/task.md` (read whole). It has 17 items; the cycle found an open design choice in item 16 only (the JavaScript lint rules of D-29 for the session-start hook and the older scripts of the play skill), and the spec settles that alone. The designer's report is `.runs/task-cycles/luki-w-testach-z-przegladu/reports/designer-report.md` and the planner's `reports/planner-report.md` shows how the choice was found; both give facts that are hypotheses until you verify them in the code (the lint and Prettier results, byte equality of the two skill copies, the `POINTS` constant, what the scope test does today). You may run read-only checks in your directory for working copies; the worktree has no `node_modules`, the main checkout's `node_modules of the main checkout` may be read from there.

Check in particular: that every claim of *Constraints* about the code is true; that the chosen reading fulfils item 16 without widening the task; that the decisions D-29, D-32, D-28 and the invariant `eslint-source-rules` are quoted faithfully and the changes named for them are the ones needed and no more; that the spec contradicts no decision (if it does, say which); that its test design can be seen red before the configuration changes; that the real-browser question of D-29's *Rejected* is answered by evidence, not assumed; that "Left to the maker" leaves nothing that is really a design choice.

Read whole: the frozen task, the spec, `.the-way/task-cycle/spec/SKILL.md`, `.the-way/task-cycle/spec/review.md`, `AGENTS.md` and `guidelines/coding.md` of the worktree; the entries `### D-29`, `### D-32`, `### D-28`, `### D-414` of `foundations/decisions.md` (find by heading) and the invariants `eslint-source-rules`, `prettier-source-format` of `foundations/invariants.md`; `eslint.config.mjs`; `tests/quality/test_source_tool_scope.py`; `tests/quality/eslint-rule-sets.mjs`; `.claude/hooks/`; `.claude/skills/loop2-play/`.

## Return

As section 4 of your method says: the first line of your report (`PASS` or `FAIL`) and its path. The report ends with **Unread material:** and **Searches not found or unclear:** (each `none` where so), names every reach beyond this handoff and each working copy.
