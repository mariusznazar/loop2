# Handoff — the return step (task `hook-wersji-the-way`)

Same worktree (`the task's worktree (the repository root)`, branch `task/hook-wersji-the-way`), same directory for working copies `.runs/author/` (empty; remove what you make). Head now: `9e28dc99` (your code and the fix, reviewed `PASS`). Report path: `.runs/task-cycles/hook-wersji-the-way/reports/return-step-report.md`.

## Method

You are the author resumed for the return step. Read whole: `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/task-cycle/skill/return_step.md` (the return step writes as the foundation step writes: each entry by the `SKILL.md` of its element, at the path `foundation_step.md` gives, read when you write an entry of that element). Your method file stays `.the-way/task-cycle/change/SKILL.md`; the return step is no row of its variants table. Same rules as before: explicit paths in `git add`, English messages in the repository's form, no push, no full gate, no review request (the orchestrator has a fresh reviewer review your range if you commit anything).

## What to compare and write

Compare with the code as it stands at `9e28dc99`: the entries the change wrote or changed (D-414, the facts `claude-code-session-start-hook-output` and `claude-code-hook-exec-form`), the task's *Decisions in play* (D-252, D-362), the entries the search of the foundation finds for the files the change touches, and the part map of the touched part `agent-workflow` (is the change's new directory `.claude/hooks/` and file set described by its *Files* and its sentence?). Correct in the same change whatever no longer matches. Also: a word the change uses in a meaning for which an entry of the glossary exists or is due (the glossary's `owner` was handled in the fix); a source outside the product the change rests on that no fact holds; a row of *Settlements to record* the code makes true that the foundation step missed (row 1 is D-414; the task has one row); a choice that binds after the merge (the orchestrator's choice Q1, the Node script, is the one you wrote into D-414). Write an invariant only for a rule the task, a decision or the human sets; none is set here. No entry is deferred or listed for later.

The reviewer's last finding, N-1 of `reports/review-fix-report.md` (the sentence "prints nothing only where git is missing or the repository pins nothing" in D-414 leaves out the agreement case), is a review finding and goes to the request's list; you do not fix it as a finding. If your own comparison of D-414 with the code shows the same text no longer matches the code, the return step corrects it as any mismatch and says so in your report.

Task items the cycle owes beyond the code (report each): the one sentence in `AGENTS.md` (done); the hook, the settings file and the three-system claim; "the hook blocks nothing"; "does not cover Codex".

## Report

Write the full report to the report path: status; commits (or none); checks with command and exit code (`python -B .the-way/elements/common/foundation_check.py` at least, and `python -B .the-way/instruction-files/check_instructions.py` if you changed an instruction file); the sections of the record's *Return step* in these words, each `none` where none: foundation compared with code (the entries compared, what no longer matched and its correction); decisions written or changed; invariants written or changed; environment facts; glossary terms; part-map changes; projected entries written; rows of *Settlements to record* written with the entry each went to. Then **Unread material**, **Searches not found or unclear**, working copies.

## Working copies

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
