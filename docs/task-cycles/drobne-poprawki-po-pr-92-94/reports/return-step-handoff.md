# Handoff — the return step, task `drobne-poprawki-po-pr-92-94`

You are the one author, resumed for the return step (step 11 of `implement-task`). Read `.the-way/task-cycle/skill/return_step.md` whole (it is short), and `.the-way/task-cycle/skill/foundation_step.md` if you write an entry; no other variant row of `make-change` applies: your stage is the return step. Work from the worktree root the root of the task's worktree, branch `task/drobne-poprawki-po-pr-92-94`; the head is `a203324d` (your fix, reviewed `PASS`). Your directory for working copies: `.runs/author-return/`. Report path: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/return-step-report.md`. No full gate (`npm test`); the orchestrator runs it after this step.

The frozen task: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/task.md` (*Decisions in play* and *Settlements to record* are what you compare against). Reports of the earlier stages you may need: `reports/author-report.md`, `reports/author-fix-report.md`, `reports/review-whole-report.md`, `reports/review-fix-report.md`. The review findings of the request are no foundation entries (O1, O2 of the review stay outside the task; do not write them).

What to compare with the code, and correct in this change where something no longer matches:

1. The entries the change wrote or changed — D-207, D-423 (new), D-424 (new), D-396, D-153, D-376 (named by the task for item 4; check what it says against what D-423 and the data now say: the number and the item a new „Zapas poniżej” starts with), and the two environment facts (`playwright-firefox-webkit-releases`, `loop2-app-log-confirmation-mail-events`) — each against the code, tests, README, AGENTS.md and skills as they stand at the head.
2. The six rows of the task's *Settlements to record*: say for each where it went (row → entry), or that nothing was missing; a row the foundation step missed and the code makes true is written now.
3. The decisions of the parts the change touched whose sentences the code now makes false: item 4 (the default item), item 8 (the environment of the quality test: D-30, D-31, the testing and coding guidelines' sentences about „local copies, bez pobierania narzędzia przy kontroli” — the reviewer judged `guidelines/coding.md:51-53` still true; correct only what is false), item 6 (the glossary: `loop`, `earning loop`, `loop clock`; WAY-97) and the part map of the touched parts (new files `tests/quality/quality_environment.py` and `tests/quality/test_quality_environment.py` belong to `build-tools` by `tests/quality/**` — confirm by `foundation_check.py`).
4. Sources outside the product the change rests on that the foundation does not hold: write as environment facts or say none (the Playwright reading and the log reading are written; the pip index and PyPI are in the part map's external context).
5. A choice that binds after the merge: the questions table of the record holds Q1, Q2; yours, if any, go to the log or stay rows by the rule of the return step. An invariant only for a rule the task, a decision or the human sets.

Report: the items the record's *Return step* gives — foundation compared with code (what no longer matched, its correction, or none), decisions written or changed, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of *Settlements to record* written (row number → identifier) — with commands and exit codes of the checks you ran (`python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py` where you change `AGENTS.md` or a skill), **Unread material**, **Searches not found or unclear**, the working copies. Where you commit nothing, say so; no change is also a result. Commit messages in English in the repository's style; `git add` by paths. Do not write personal data (no address, no account identifier).

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
