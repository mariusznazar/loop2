# Handoff — review of the whole change

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. You are a reviewer that made none of the change. Do not ask the human anything; return questions to the orchestrator. You are read-only: you change no tracked file and make no commit.

## What you review

- Stage: the review of the whole change, method `.the-way/task-cycle/review/SKILL.md`, variant "the whole change" (read `.the-way/task-cycle/review/whole_change.md` as the method says). Read the `SKILL.md` whole; a file it names only when its step comes.
- Worktree (work only from its root): `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`.
- Range: base `be8eea82` (the task's base, `origin/main`) to head `b76678a7`. Compute the diff yourself: `git diff be8eea82..b76678a7`, `git log be8eea82..b76678a7`; confirm `git rev-parse HEAD` is `b76678a7`.
- The route was one author without a plan: there are no slices, so there is no slice review; this review is the one review of the change. The author: `the-way-author`, class `same` (sonnet).
- The pin of the-way did not move (`bfb2e109735b5fff98802b8be0ff3c43c799262a`).
- Frozen task, read whole: `.runs/task-cycles/cztery-usterki-recenzji/task-frozen.md` (points 1-7 of *To do*, questions 1-4 and their answers, *Settlements to record* rows 1-4, *Decisions in play*). The author's report (a set of claims to verify, not evidence): `.runs/task-cycles/cztery-usterki-recenzji/reports/author-report.md`; the author's own handoff: `reports/author-handoff.md`.
- Your directory for working copies: `.runs/review-whole/`. Your report: `.runs/task-cycles/cztery-usterki-recenzji/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).
- Do not run the product's full gate (`npm test` with no file): its run is the orchestrator's. Run the focused checks you need, each with its command and exit code in the report.

## Answers of step 4

- Trust boundary: yes. `src/server/**` and `scripts/local-start.mjs` are trust boundaries in the part map. The change touches `src/server/account-block.ts`, `src/server/account-backup.ts`, `src/server/database.ts` and `scripts/local-start.mjs`. Check crafted input at them: a crafted file given as the database path (empty, not SQLite, a foreign SQLite database without the schema version, a damaged SQLite file, a newer schema, a locked file, a database already in WAL mode), a port taken by another program, a path or a message that can leak through a failure line.
- Irreversible operation: no. Check that the change only changes code and text and that no command of the change writes into a file it refuses.
- Open design choice: none. Reserved choice: none (check that the change settles no language, framework, library, store of data, login or place to run that the task and the foundation do not settle).

## What the author's report says it did not read, and gaps to carry to you

The orchestrator read the author's report and decided to carry these to you, since you select your own foundation:

1. The author did not read whole D-102, D-100, D-160, D-228, D-236, D-405, D-354 and D-410, and read D-137 and D-139 only as the task and the tests quote them. Your selection decides whether they bind the change. In particular: point 1 changes a sentence of the skill `loop2-deploy` to say that a correct password of a blocked account does not count towards the failed-login limit and a wrong password counts as for any account. Verify that sentence against the code, `src/server/account-routes.ts` around lines 810-828 (the source of point 1 per the task), against D-139 whole and D-102 whole, and against both copies of the skill (`.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md`, and their `references/backup_and_restore.md`). The author wrote it from D-139's quotation only.
2. The author did not read whole the invariants `account-startup-configuration`, `local-start-access`, `account-save-backup-encrypted`, only the test of `local-start-access` it touched. The decisions and invariants of the parts account-server, build-tools, agent-workflow and product-foundation are your selection.
3. Intended, not an omission to report as a defect of the author: the commands `account-previous-save` and `account-role` were left as they were (the task names only the blocking and backup commands; D-112's new paragraph and D-430 say so). The orchestrator will list a follow-up task in the request. You still judge whether D-112's wording about "the same rules" for all four commands is now true or misleading.
4. Judge on their own: the author's use of `diagnostics_channel` `net.server.socket` (documented as experimental in Node 24) in `scripts/local-start.mjs` for point 4; the order of the version read and the journal-mode change in `src/server/database.ts` (the version read inside the transaction of `initializeSchema` must stay, D-112 and the task *Context* last bullet); a newer-schema file already in WAL mode (the author's concern 6); the existing tests the author changed (the author's section "Changed existing tests": did the change weaken them?).
5. The invariant of row 4 is called `account-schema-lifecycle` in the task, which the invariants file holds as a withdrawn identifier merged into `account-database-schema`; the author edited `account-database-schema`. Judge whether that fulfils row 4.
6. `guidelines/coding-database-access.md` was not changed; it says the version is checked in the transaction of initialization. Judge whether it still holds, and whether `guidelines/testing.md` (changed) matches its template.
7. D-153 (point 7): the author replaced the whole delivery-test passage of its *Rationale* by the content the task gives. Check source fidelity strictly: every fact in the new text stands in the task's point 7 or the code; nothing is added; the date of the reset-password attempt is written as unknown. Check that no private path, name or note title entered the foundation or the skill.
8. Not run by the author: `tests/deploy/test_account_backup_stream.py`, `tests/invariants/test_account_save_sqlite_upgrade.py` (need Docker), `tests/deploy/test_loop2_backup.py`. The orchestrator's gate will run them. Read them for whether the change breaks what they hold.

## Working copies (the first paragraph of "Working copies" of `.the-way/task-cycle/skill/SKILL.md`, word for word)

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

## What you return

Write the full report to the report path as the method gives it. Return: the report's first line, its path, the graded findings in short, each blocking finding with whether it belongs within the task's scope, the Minor findings within the task listed, the number of decisions of your index you read whole, your checks with command and exit code, **Unread material** (what your own selection left unread or read in part, or `none`) and **Searches not found or unclear** (or `none`). Secrets and personal data stay out of the report; the author's personal notes and the vault are not part of this repository and stay unread.
