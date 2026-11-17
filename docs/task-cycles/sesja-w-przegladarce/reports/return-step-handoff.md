# Handoff to the one author (resumed) — the return step

Same worktree (`the worktree root`), branch and bounds as in `reports/author-handoff.md`. You take the return step, step 11 of `implement-task`, on your class. Read `.the-way/task-cycle/skill/return_step.md` whole and, since the return step writes as the foundation step writes, `.the-way/task-cycle/skill/foundation_step.md` whole; the `SKILL.md` of an element (at the path `foundation_step.md` gives) when you write an entry of that element. Your directory for working copies is `.runs/author/` (remove it before you return). Report: `reports/return-step-report.md`.

The change as it stands: commits `8e9c01a0` (the width and ellipsis of `.select-list`, `.maps-who-program`, the styleguide's exception) and `81502efc` (the wording of that exception, after the whole-change review's M1), on the base `e5516b17`; the reviews passed (`reports/review-whole-report.md` `PASS 8e9c01a0`, `reports/review-fix-report.md` `PASS 81502efc`). The task: `.runs/task-cycles/sesja-w-przegladarce/task.md`; its *Settlements to record* is `none`; its *Decisions in play*: D-75, D-88, D-254 (withdrawn; D-417 answers it), D-255, D-03, D-278, D-299, D-323, D-349.

What to compare and decide (return_step.md gives the rules):

1. The entries the change writes or changes: none are written by the foundation step; the changed file is a guidelines file, not a foundation entry. Compare it, and the decisions the task and the search of the foundation name that bear on a select list, a shared control's look and the program list (D-169, D-170, D-265, D-421, D-299 for the defect you found, and any other you find by the search of the foundation as `way_of_working.md` "Search the foundation" gives), with the code at the head `81502efc`: does any entry say what is no longer true, for instance a sentence about the width of a select list, an example of a name that breaks, a measure of the width?
2. The part map for `browser-view`: does it still match what the change touches?
3. Does the change settle something that binds after the merge (WAY-36): for instance that every `.select-list` of the game is held within its row and cuts a long name with an ellipsis (your *Choices* of the report), which the foundation does not say yet? Decide by return_step.md where it goes: a decision of the log, a row of the questions table, or nothing; where you write a decision, an invariant or a glossary entry, write it through the element's `SKILL.md`. Where the task or its spec excludes an entry, that prevails; the task excludes none.
4. The facts: a source outside the product the change rests on that the foundation does not hold (none expected).

Record per the *Return step* section of `.the-way/task-cycle/record_template.md` form: foundation compared with code, decisions written or changed, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of *Settlements to record*. Commit what you write as `make-change` gives; commit message in English; `git add` by paths. Run `python -B .the-way/elements/common/foundation_check.py` after any foundation change, with command and exit code. Do not run the full gate.

Return status, commits (or none), a one-line check result and the report path; the report holds **Unread material** and **Searches not found or unclear**.

## First paragraph of "Working copies" of the cycle, word for word

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
