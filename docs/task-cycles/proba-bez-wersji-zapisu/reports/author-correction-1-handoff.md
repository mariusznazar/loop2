# Handoff — a correction for the human's remarks, `make-change`

You are the one author, resumed (agent type `the-way-author`). Work from the root of the task's worktree (branch `task/proba-bez-wersji-zapisu`, head `b794b27e`; the tree is the tree of `509961a1`).

- Method: `.the-way/task-cycle/change/SKILL.md`, variant **a correction for the human's remarks**; read `.the-way/task-cycle/skill/correction.md` where that variant names it.
- The remarks, word for word: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/correction-1-remarks.md` (item 1 binds; items 2–4 are accepted, nothing to change for them). The remarks bind; ask no human anything.
- What to change: step 7 of "Restoring over the server's database" in `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its copy `.agents/skills/loop2-deploy/references/backup_and_restore.md` (about lines 492-497) says the marker is "the name given to a character or a program in the test account in step 8 of "Installing and reinstalling" and written down then". Change that one phrase so the step points to the marker written down last, as step 5 of the trial does ("the marker name written down last, as in the install step 8"). Change nothing else; keep both copies byte-identical (`cmp`). Do not touch the decision log, the tests, `scripts/restore-trial.mjs` or the game.
- The paragraph "Not proven by this trial …" and the paragraph on the version of the saved game in "Restoring" stay untouched (the task's acceptance criterion).
- Checks you run again, each with command and exit code, with no pipe that hides the exit code: `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill`, `python -B .the-way/elements/common/foundation_check.py`. Do not run `npm test`.
- Commit by path, message in English in the repository's style (`docs: :memo: …`).
- Working copies: your directory is `.runs/author/`, removed before you return.
- Report: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/author-correction-1-report.md`: status, commits, checks with commands and exit codes, own-work check (that no other place of the two copies still names the marker as "written down then"; `git grep -n "written down then"`), reaches, **Unread material**, **Searches not found or unclear**, working copies.
