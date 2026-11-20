# Handoff — review of the whole change, `review-change`

Task `szkielet-progresji` of the product loop2. You are a fresh reviewer that made none of the change.

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer or go-ahead here is that person's approval. Questions go to the orchestrator by returning `questions`; never ask the human.

## Worktree and range

- Worktree (your working directory, read-only for you): `the root of the task's worktree (the repository root)`, branch `task/szkielet-progresji`. Work from its root; `.the-way` there is at the pinned commit `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- The whole change: base `fec2ae7ed5b374a43a44803a296c4deb507696e4`, head `216b8bf9` (one commit, `foundations/glossary.md`, +6 lines). Review the full diff `git diff fec2ae7e 216b8bf9`.
- Your directory for working copies: `.runs/review-whole/`. Your report path: `.runs/task-cycles/szkielet-progresji/reports/review-whole-report.md` (the report is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, the case that the rule on report-like file names leaves open; if you cannot write it, return it whole as your answer). Do not run the product's gate (`npm test`).
- `cycle.md` and the other files of the cycle's record directory are not yours to read unless named here.

## Method and variant

Read `.the-way/task-cycle/review/SKILL.md` whole, then `whole_change.md` beside it as it directs, and any file it names only when the step comes. Variant: the review of the whole change. You select your own foundation and guidelines. Return the report's first line as the method gives it (`PASS <sha>` / `FAIL <sha>` / `questions`).

## Inputs

- Frozen task (read whole): `.runs/task-cycles/szkielet-progresji/task.md`. Its one *To do* item is the writing of the glossary entry `wall` after `## overlay`; its *Decisions in play* holds the projected entry word for word and D-362; *Settlements to record*: `none`.
- No spec and no plan: one author without a plan, class `cheaper`; no slices, so no slice review and no mechanical mismatch to pass on. No Minor or out-of-scope findings of earlier reviews exist.
- The author's report (read it): `.runs/task-cycles/szkielet-progresji/reports/author-report.md`.
- Task moved the pin: no.
- Trust boundary at start: no (`product-foundation`, trust boundary `none`). Irreversible operation: no.
- The orchestrator's reading of the guidelines: none applies, the change writes no code and no test — judge that selection yourself.
- Known to the reviewer from the orchestrator, for what it is worth: the task document in the vault differed from the one accepted (status and exactness of the To-do wording only); the frozen copy is the current one.
- The return step (foundation compared with code, the part map) has not run yet; it follows your review.

## Working copies (word for word)

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
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

As the method gives it: first line, findings with grades and the slice or `none` they come from, the checks you ran with command and exit code, **Unread material** (what you selected or this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), working copies and their removal.
