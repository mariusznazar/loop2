# Handoff — the return step (the one author, resumed)

The person who started this cycle delegated every intermediate choice to the orchestrator; nothing here is that person's approval. Your first handoff (`reports/author-handoff.md`) holds for where you work and what you leave running: the worktree `the worktree of the task` only, nothing in the main checkout `the main checkout of the repository`, no shell, server or browser left running.

- Stage: **the return step** — compare the foundation with the code, as `.the-way/task-cycle/skill/return_step.md` gives; read it whole, and `.the-way/task-cycle/skill/foundation_step.md` whole with it, since the return step writes as the foundation step writes; each by its path in the pinned the-way. Read the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element. You have no skill tool.
- State of the branch: head `b15ef8133d105bc3665913c23ff4e5a41fb62a6c`; the whole change was reviewed (`PASS ba1ccf8d…`) and its one Minor fix reviewed (`PASS b15ef813…`). Your own commits so far: `de3bbbfa`, `ad650416`, `ba1ccf8d`, `b15ef813`.
- Compare with the code: the entries the change writes or changes (D-416; the styleguide rule „The screen Wiedza”), those the frozen task names in *Decisions in play* and *Settlements to record*, the part map of the touched parts, and the result of one search of the foundation by the names and words your code adds (for example `rankValue`, `knowledge-tree-row`, `knowledge-steps`, the 12em column) and removes. Correct in the same change whatever no longer matches, and commit it by explicit path. Where a decision you wrote carries a pair of examples and a test holds part of its sentence, apply the rule of `return_step.md` about the pair and the clause `tests:`. If no entry is needed, commit nothing.
- The frozen task: `.runs/task-cycles/wyglad-ekranu-wiedzy/task_frozen.md`. The review reports are not yours to read; the one outstanding Minor finding of the review (D-280's *Rejected* names the same option as D-416's; the task keeps D-280 unchanged) is outside the task's scope and is **not** yours to write — no entry is deferred or proposed by you.
- Run `python -B .the-way/elements/common/foundation_check.py` (full) before you return, with its command and exit code. No full gate.
- Your directory for working copies: `.runs/author-return/` (only if needed; removed before you return). Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-return-report.md`, with: status, the comparison you made and what no longer matched (or none), and the place each settlement you wrote went to in the form of the record's *Return step* (decisions, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of *Settlements to record* written), the checks with commands and exit codes, **Unread material**, **Searches not found or unclear**, working copies, and what is left running (nothing). Return the status, your commits, a one-line check result and the report's path.

Working copies, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
