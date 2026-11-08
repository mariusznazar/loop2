# Handoff — review of the return step's commit

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator. You review; you change nothing.

Method: `.the-way\task-cycle\review\SKILL.md`
(read it whole; a file it names when the step that names it comes). Variant: a later change to the
change (the return step's commit); the review covers its range only.

Worktree: `the worktree of the task`. Range: `406f0af..e1ab9c9` (resolve both
to full shas; one commit, `guidelines/coding.md`, +2 lines). The agent that made it took the return
step (`.the-way/task-cycle/skill/return_step.md`, read it): it compared the foundation entries the
change touches with the text of `guidelines/coding.md` and restored the sentence that points test
authors to `guidelines/testing.md`, because D-28's Verification says the guidelines "direct test
authors to the testing guidelines". Its report: `…\reports\author-1-return-report.md` in
`docs/task-cycles/proba-krotszych-wytycznych/`.
The task (frozen): `…\task.md` there (items 5 and the questions 1–3). The earlier reviews of the same
change: `…\reports\review-whole-report.md`, `review-fix-report.md`.

Judge: is the correction right (is that sentence one the main change may remove; was the
restoration needed, and is a smaller or different restoration enough); does it go against the task
(a template sentence changed, a kept sentence altered); did the return step miss a mismatch between
a decision, invariant or the part map and the file (read D-28 — D-33, D-252, D-253 whole in
`foundations/decisions.md`, and judge in particular its reading that D-28's "retain the stated
deferrals" means the deferrals stated in D-28 itself, so that the removed sentences about deferred
formatting and exemplars may stay removed; say if you read it differently); is anything in the
return step's report unsupported by the files.

Report to `…\reports\review-return-report.md` (first line `PASS <sha>` or `FAIL <sha>`; checks with
command and exit code; **Searches not found or unclear**). Return the first line, the path and the
count of findings per grade.
