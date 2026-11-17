# Handoff: review of the whole change

You review the whole change of a task cycle as an agent that did not make it.

## Delegation and place

- The person who requested the cycle delegated its intermediate choices to the orchestrator; nothing here is that person's approval. Never ask the human; questions go to the orchestrator in your report with first line `questions`.
- Work from the root of the task's worktree (branch `task/wpisy-serwera-kopii-i-testow`). Read-only: you change no file of the repository.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the review of the whole change; read it whole, and `whole_change.md` beside it when the method says so. You select your own foundation and guidelines, as the method gives.
- Range to review: base `f0e466cad5776d86bd979dfe824fb03f543cf6e8`, head `a2c3729b` (compute the full SHA yourself and confirm it equals `git rev-parse HEAD`). One commit.
- Your directory for working copies: `.runs/review-whole/`. Report path: `.runs/task-cycles/wpisy-serwera-kopii-i-testow/reports/review-whole-report.md`; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`.
- Working copies: make any working copy only in your directory under the ignored `.runs/` of the worktree, never in the system's temporary directory, the session's scratch directory or the main checkout; remove it before you return and say in the report where it stood and that it was removed (a worktree with `git worktree remove --force`, then `git worktree prune`); name any remainder with its full path and the reason.

## What is reviewed

- The frozen task (read whole): `.runs/task-cycles/wpisy-serwera-kopii-i-testow/task.md` — a Polish task document: *To do* 1 to 9, *Questions to settle* (F-3, F-7, F-28, F-31, questions 1 to 3), *Decisions in play*, five rows of *Settlements to record*. No spec and no plan exist (one author, no plan). No slices: the whole range is yours.
- The author's report: `.runs/task-cycles/wpisy-serwera-kopii-i-testow/reports/author-report.md` (a set of claims to verify, not evidence).
- The decision index the orchestrator wrote for the author: `.runs/task-cycles/wpisy-serwera-kopii-i-testow/decision-index.md`; you write and read the index of your own selection.
- The change writes no code and no test: it changes entries of `foundations/**` (part `product-foundation`) and the two copies of the skill `loop2-deploy` and `guidelines/testing.md` (part `agent-workflow`). Which parts it touches is for you to judge from the diff.

## Answers of the orchestrator at start

- Trust boundary: no. Irreversible operation: no. (The procedure the change extends, the restore of the database on the server, is run by a human; the cycle runs none of it.)
- Open design choice: none. Reserved choice: none.
- The orchestrator's choice Q1 (autonomous): the new step of the log search stands inside step 8 of "Restoring over the server's database", after the deployment of step 6; fixed-string searches; three markers `password-set`, `account-blocked`, `account-unblocked`. The author corrected one detail of it (Q5): it does not search the log of the running container, because step 6 recreates the container; verify that claim against `deploy/loop2-deploy` and `foundations` D-355.
- Author's passages: D-80 is a withdrawn number (Q3); the environment fact `git-path-patterns` was withdrawn in the same change because nothing rests on it after row 3 (Q4); the task's line numbers are stale.

## Gaps and points for your attention (carried from the author's report)

- The author read D-355, D-356, D-137 and D-13 in part, and D-231, D-351, D-362 and D-154 from the index only. You judge the wording of D-360, D-235, D-109, D-112, D-15, D-49 and the three invariants against those decisions yourself, reading each decision whole.
- The author chose wording of its own in four places: D-109 gets a third paragraph and D-112 a second sentence (because tests quote the first sentence word for word); step 8 bounds the search to lines after the backup and before step 6 and takes only the last block or unblock line per account; the trial marker of step 7 is written down with day and hour. Judge each against the task and against what the restored database needs, and say whether any exceeds what the task asks.
- Check the two copies of the skill are byte-identical (`diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy`).
- Check every item of *To do* 1 to 9, each row of *Settlements to record* and the source fidelity of each *Rejected* the author wrote, as the method gives for a task without a plan.
- The address-reading command in the new step is run by a human in the `loop2` container; the author ran it only on a made-up database. Judge it as text a human follows on the day of a failure: could it be run as written?
- The foundation check lists `account-email-nodemailer-starttls` (sentence changed, no citing file changed); that is expected, the request names it.
- You run no full gate (`npm test`): the orchestrator runs it after the review.
