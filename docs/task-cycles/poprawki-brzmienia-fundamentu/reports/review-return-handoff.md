# Handoff - reviewer of the return step (`review-change`)

You review the commits of the return step of a task cycle of the-way as an agent that made none of the change. Questions go to the orchestrator (status `questions`), never to the human.

- Worktree (read-only for you; work from its root): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (a later change to the branch: the return step's range). Read a file it names only when the step or variant that names it comes.
- Range to review: `d09512b4cb3d25599cc02b33a7da2c4fdb006a3d..949f14db` (one commit: `README.md`, `foundations/decisions.md` D-271 *Rationale*, a comment in `tests/view/icons.test.mjs`).
- The return step's report (read it): `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/return-step-report.md`; its handoff: `reports/return-step-handoff.md`. Frozen task: `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`. The reviews already made of the whole change and of the fix: `reports/review-whole-report.md`, `reports/review-fix-report.md`.
- What it corrects: the environment fact `pixel-crawler-terms` (changed in this cycle, To do 5.9) now says the pack asks for no credit except where the project has a saxophone solo; three other places said the pack asks for no credit or needs no mention. The return step reworded them: D-271 *Rationale*, point 2 of "First run" in `README.md`, the comment over `SPRITE_PACKS` in `tests/view/icons.test.mjs`.
- Judge: whether each rewording is true against the environment fact `pixel-crawler-terms` in `foundations/environment_facts.md`; that D-271 binds nothing new; that the README check of `sprite-credits` in `tests/view/icons.test.mjs` (added by the fix of the whole-change review) still passes and still means what it meant; that nothing of the return step's own report is claimed without evidence. Judge also the three observations outside the change that the report lists only as far as they bear on this range.
- Do not run the product's full gate. You may run the foundation check and `npm test -- tests/view/icons.test.mjs`.
- Directory for your working copies: `.runs/review-return/`. Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/review-return-report.md`.
- Answers of step 4: trust boundary - no; irreversible operation - no.

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What to return

As `review-change` gives: the report's first line `PASS <sha>` or `FAIL <sha>`, graded findings with places, the Minor and out-of-scope findings kept apart, checks run with command and exit code, **Unread material**, **Searches not found or unclear**, working copies.
