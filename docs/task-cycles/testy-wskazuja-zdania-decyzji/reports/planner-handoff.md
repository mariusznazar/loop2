# Handoff — the planner (`plan-task`)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You return to the orchestrator, never to the human. Your go-ahead is provisional, never the human's approval.

## Where you work

- The worktree: `the task's worktree` — work from its root. Branch `task/testy-wskazuja-zdania-decyzji`, base `394ca859caa5d8316eafdb33145f243ddf5c3bac`. The pin of the-way is `ec7929d02164c8754f0236d93db52624688967e6`, as the worktree's `.the-way` shows.
- Your stage is the plan: read `.the-way/task-cycle/plan/SKILL.md` whole and follow it, and a file it names inside `.the-way` only when the step that names it comes. You write `plan.md` and `plan-size.md` in `.runs/task-cycles/testy-wskazuja-zdania-decyzji/` and write no code and no foundation entry.
- Your directory for working copies: `.runs/planner/`.
- Your report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/planner-report.md`.

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

## The task

- The whole frozen task: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md` (read it whole; its language is Polish, its quotations of decisions are English).
- Answers of the cycle's step 4: no trust boundary touched; no irreversible operation; no open design choice and no spec; route: planned slices.
- Settlements to record: none. Projected entries: none.
- The checks the move of the pin carried: none, the pin was not moved (see below).

## Facts the orchestrator established — they overrule the task's text where they differ

1. **The pin is not moved.** The task's item 1 asks to move the pin to `f4af75d`. The pin at the base is already `ec7929d`, which has `f4af75d` as an ancestor (18 commits later), so item 1 is already met and a move would be a downgrade. The plan has no slice for item 1. The template and `foundation_check.py` the slices read are those of `ec7929d`: `.the-way/elements/decisions/template.md` (section "Verification") and `.the-way/elements/common/foundation_check.py`.
2. **The log at the base holds 403 decisions**, not the ~396 the task counts. The index of them is `.runs/task-cycles/testy-wskazuja-zdania-decyzji/prep/decisions_index.tsv` (columns: id, first and last line in `foundations/decisions.md`, number of paragraphs, of sentences and of characters of the binding sentences, kind of the *Verification* field, number and list of the non-Markdown tracked files that cite the number). It was made by a script from the log and `git ls-files` on the base; the heads of the entries are the source, the index is a convenience. Kinds at the base: pair 240, inv+pair 103, inv 33, none 23, tests+pair 2, inv+tests+pair 1, tests 1. 325 decisions are cited in 268 code files.
3. `python -B .the-way/elements/common/foundation_check.py` on the base: exit 0, `0 errors`, 23 lines `listed: … held by nothing` (D-73, D-74, D-75, D-76, D-78, D-79, D-81, D-84, D-85, D-87, D-88, D-89, D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220). The acceptance criterion needs none of them listed at the end.
4. **Checks failing on the base** (taken from the final gate of the merged cycle): `npm.cmd test` exit 1, with `test_ruff_source_rules` and `test_shellcheck_source_rules` in `tests/quality/test_quality_invariants.py` failing with `FileNotFoundError`. They are no work of this task.
5. **Autonomous choice for the question carried to the cycle:** a mention of a decision number in a comment at a test that gets a line `decision:` stays where it is and the line stands beside it; no existing comment is removed.
6. The sequence of slices is serial: one worktree, one writing agent at a time. Everyone edits `foundations/decisions.md`, so slices that touch it never run side by side.

## What the plan must settle (the cycle's judgment, for your reading, not an order)

- Task question 3 is answered: **every judgment whether a test holds a decision's sentence — in whole, in part, or not at all — is made by an agent on the strongest available model.** A slice that makes such judgments therefore has *Model* `strongest`, with that reason (WAY-229). No slice hands the judgments to a cheaper class, and none checks only a sample of them.
- Task question 2 is answered: one cycle, one request. Your division is of the agents' work, in slices.
- Division should follow the material (the decisions' parts of the game and the test files they live in), not the numbers alone, so that decisions touching the same test files go to one slice. The task's *Context* and the index are the data; judge sizes by the slice-size script of `plan-task`.
- Every slice's *Checks* must be focused and cheap: `python -B .the-way/elements/common/foundation_check.py` and the focused run of the test files whose comments the slice changed, by the way each part's tests run (`guidelines/testing.md`). No slice runs the full gate (`npm test`); the orchestrator runs it (WAY-160), and it takes about 20 minutes.
- The acceptance criteria are checked by the orchestrator at the end too: the check that in `foundations/decisions.md` only the field *Verification* differs from the base (binding sentences, *Rationale*, *Rejected*, every other field). If a slice's *Change* makes a different mechanical check useful, say it in the plan; do not plan a new script in the product (new tests and new scripts are outside the task).
- Tell every executor, in its slice's section, what the task says about the three outcomes of a judgment and what to do with the pair `complies:` / `violates:` (task *To do* 2), and that the decision's wording in the log is never changed.

## Foundation and guidelines for you to read

- Decisions of the task's *Decisions in play*: D-73, D-82 (`foundations/decisions.md`; find the lines in the index).
- The template of decisions: `.the-way/elements/decisions/template.md`, sections "Verification" and "Binding sentences".
- `guidelines/testing.md` and `guidelines/coding.md`, each whole; the part map `foundations/part_map.md` whole (the parts and which files belong to which).
- The invariants file `foundations/invariants.md` is read by the executors per decision (a decision may name invariants after `invariants:`); name in each slice's *Read* what the slice needs of it.

## Report

Return, as your method gives it, your status, the report path, the commits (none), a one-line check result, your questions and concerns, **Unread material**, and **Searches not found or unclear** (`none` is an answer; a missing section is not).

Say it plainly if a value or a rule in the task does not survive your own count; do not bend the plan to fit it.
