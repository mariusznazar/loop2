# Handoff — the return step (a fresh agent with `make-change`; the stage is the return step, not a row of the method's table)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You return to the orchestrator, never to the human.

## Where you work

- The worktree: `the task's worktree`, branch `task/testy-wskazuja-zdania-decyzji`, head `69b7faccfab72acb49f4ae7f5be8ce76fe082e18` (the reviewed head: whole change `394ca859caa5d8316eafdb33145f243ddf5c3bac..69b7facc`). Nobody else writes in it. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6`.
- Your stage: the return step of the task cycle. Read `.the-way/task-cycle/skill/return_step.md` whole and follow it; it writes as the foundation step writes, so read `.the-way/task-cycle/skill/foundation_step.md` whole too, and the `SKILL.md` of an element (at the path that file gives) when you write an entry of that element. Also read `.the-way/task-cycle/change/SKILL.md` whole (the method of the agent that commits).
- Your directory for working copies: `.runs/return-step/`. Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/return-step-report.md`.
- Commit by path (never `git add -A`, `.` or `-a`), messages in English in the form of the branch's earlier commits.

## Working copies (copied word for word)

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

## The task and what the change is

- The whole frozen task: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`; its *Settlements to record* reads `none`, it carries no projected entry; *Decisions in play*: D-73, D-82. The plan: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md` (40 slices; method in "Work of every slice"). The slices' ranges and reports: `reports/slice_ranges.md`, `reports/executor-*-report.md` (read in full only the ones you need; every one lists at its end remarks on the log's wording, "R3", and files reached). The review of the whole change: `reports/review-whole-report.md` (PASS; five Minor, fixed in `bf65200c` and `69b7facc`; its report of the fix review: `reports/review-fix-report.md`).
- The change: 146 test files got comment lines `decision: D-NN "<quotation>"` (3830 of them); `foundations/decisions.md` changed only in the *Verification* field of 370 of its 403 entries: the clause `tests:` was added where lines stand, the pair `complies:` / `violates:` was removed where tests and invariants hold a decision whole (107 times) and added or rewritten where they hold a part. D-103's `invariants:` clause now also names `password-operation-gate` (the one departure from the task's *To do* 2 bullet 2, accepted by the orchestrator, to be named in the request). The task's item 1 (move the pin to `f4af75d`) is not made: the pin at the base was already newer.
- What is out of scope for you as for the task: new tests, new or changed invariants, any change of a decision's binding sentences, *Rationale*, *Rejected*, renumbering, removing mentions of decision numbers.

## Your work

By `return_step.md`: compare the foundation with the code the change leaves — the entries the change writes (the 370 *Verification* fields, by the executors' reports and the checks), the entries the task names (D-73, D-82), the entries a search of the foundation finds (decisions, invariants, glossary terms, environment facts that speak of lines `decision:` / the clause `tests:` / the pair of examples / how the foundation check reads them — search, for example, `foundations/` and `guidelines/` for `decision:`), the part map of the touched parts (`foundations/part_map.md`; the change adds comment lines to files of many parts and rewrites the log: does any part's description of what its files hold or how a test marks its decision now misstate?), and `guidelines/testing.md` and `guidelines/coding.md` (does a rule there still match what the tests now carry — for example a rule on the form of comments in tests, or on how a test cites a foundation entry?). Correct in the same change what no longer matches, through the entry's skill and within the limits above, and commit; where nothing no longer matches, say so with what you compared. Do not run the full gate (`npm test`): the orchestrator runs it. Focused checks: `python -B .the-way/elements/common/foundation_check.py` (expected exit 0, `0 errors`, no listed decision).

The executors and the reviewer left remarks on the log's wording (R3) and on invariant names missing from some decisions' `invariants:` clause (D-04, D-179, D-190, D-108; D-113 and D-377 name invariants that do not derive from them): they are findings for the request, **not** work for you, since changing a decision's wording or a *Verification* `invariants:` clause is outside this task; say in your report whether you found anything of that kind the executors and the reviewer did not.

## Report

As the method gives it: status, commits, one-line check result, what you compared and found (the items of the record's *Return step*: foundation compared with code; decisions, invariants, environment facts, glossary terms, part-map changes written or changed; projected entries; rows of *Settlements to record* written), **Unread material**, **Searches not found or unclear** (`none` is an answer), own-work check.
