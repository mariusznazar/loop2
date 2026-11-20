# Handoff — the author, `make-change`, the return step

Task `szkielet-progresji`. You are the one author, resumed for the return step (step 11 of the cycle).

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer here is that person's approval. Questions go to the orchestrator.

## Worktree and range

`the root of the task's worktree (the repository root)`, branch `task/szkielet-progresji`, head `216b8bf92c2a3784acadd6ba66cb3c88d39184b2` (the one commit of the change; the fix round made no commit). Your directory for working copies: `.runs/author/` (the rules of your first handoff stand). Your report path: `.runs/task-cycles/szkielet-progresji/reports/author-return-report.md` (the report is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it). Do not run the product's gate. The whole-change review (`PASS`) and the fix round are not yours to read.

## Method

`.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/skill/return_step.md` (read whole), plus `.the-way/task-cycle/skill/foundation_step.md` as the return step names it, and the `SKILL.md` of an element (path in `foundation_step.md`) only when you write an entry of that element. You take no row of `make-change`'s variant table: your stage is the return step.

## What to compare

- The entries the change writes: the glossary entry `wall` (`foundations/glossary.md`), against the code and the foundation: the foundation's uses of the word `wall`, the part map line for the glossary file (part `product-foundation`, files `foundations/**`), D-362 (the entry names no place outside the repository).
- The entries the task names: D-362 and the other decisions of its *Decisions in play* — they are for the task's other tasks to change; this task changes none of them, so only compare.
- Frozen task: `.runs/task-cycles/szkielet-progresji/task.md` (read whole). *Settlements to record* is `none`; the projected entry `wall` is the only entry the task carries, and it is written. The projected entries of the other plan tasks that rest on the term are written by those tasks.
- The task's *Out of scope* lists what it does not do; write no entry for it. No entry is deferred or listed for later.
- The question for the glossary (WAY-95): does the change use a word in a meaning for which an entry is owed? The change adds one term; say whether any other word of the entry (`map`, `item`, `spell`, `program`) needs an entry and why not, from the foundation.

## Report

First line: status as `make-change` gives it. Then, in the form of the record's *Return step* (what the foundation was compared with the code and what no longer matched; decisions written or changed; invariants; environment facts; glossary terms; part-map changes; projected entries written whole or in part; rows of *Settlements to record* written), plus the commits you make (or `none`), every check with its command and exit code (at least `python -B .the-way/elements/common/foundation_check.py` and `git diff --check`), the own-work check, **Unread material**, **Searches not found or unclear**, working copies and their removal. Commit by path only if the comparison finds something to correct.

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
