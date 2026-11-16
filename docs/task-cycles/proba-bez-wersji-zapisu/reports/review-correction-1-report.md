PASS 18835d286fd469c8b8879b4b6f900227e0c3b438

# Review of correction 1 — proba-bez-wersji-zapisu

Range `b794b27e..18835d28`: one commit by the author, `18835d28`. `git rev-parse HEAD` in the worktree shows `18835d286fd469c8b8879b4b6f900227e0c3b438`. `git diff --quiet 509961a1 b794b27e` ends with exit 0, so the base is the tree I reviewed in the fix review. The human's remarks in `reports/correction-1-remarks.md` stand in place of a findings file.

Counts: blocking 0, new Minor 1 (within the correction), Minor outside the correction's scope 1.

## The remarks

- **Item 1 — made.** In both copies of `backup_and_restore.md`, line 495 of step 7 of "Restoring over the server's database", "and written down then" became "and written down last". That is one phrase in each copy, and nothing else moved. The diff of `18835d28` holds that one line in each file, and `cmp` of the copies ends with exit 0. The step now points to the marker written down last, as step 5 of the trial does.
- **Items 2–4 — accepted by the human.** They need no change, and none was made.

## Findings

### Critical

none

### Important

none

### Minor — new in the correction, within it

**C1. "Written down last" points to a marker the restored backup may not hold.**
Place: `.claude/skills/loop2-deploy/references/backup_and_restore.md:494-495` and the same lines of `.agents/skills/loop2-deploy/references/backup_and_restore.md`.
What is wrong: a restored backup holds the marker that stood when the backup was made, not the one written down last. The two differ when a new marker was given after the backup's time. Step 1 takes the newest backup, but a marker given today is in no backup until tonight's run, and the hint itself says the next backup "from a night after that" is the first to hold it. An operator who gave a new marker by the hint and has to restore before the next night looks for a marker the restored database cannot hold. The check of step 7 then fails, and the step sends the operator to "the way back", which undoes a restore that worked. The fallback ("If it was not written down, …") does not apply, because the marker was written down.
Why Minor: it needs a restore inside the one day between a new marker and the next nightly backup. The failure is visible, not silent: the directory is kept and nothing is removed. The old wording ("written down then", the marker of install step 8) was wrong in more cases, so the correction is a net improvement.
Suggested fix: "…and written down last before the backup's time." This remains within the remark, which names the same phrase of step 7.

### Minor — outside the correction's scope (it stood before the correction)

**O1. Step 7 cannot pass for a backup made before a change of `SAVED_GAME_VERSION`, with either marker.**
This is the answer to the handoff's question. Take an operator who restores a backup made before a change of `SAVED_GAME_VERSION`, after a new marker was given. For that operator, the sentence of step 7 does not hold together.
- The marker written down last is not in that backup: it was given after the change, so after the backup.
- The marker the backup does hold stands in a saved game state of the earlier version. When the test account logs in, the game discards that state and starts a new game with „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (D-96; the paragraph "The schema version of the database is not the only version a backup carries" at lines 274-281 says the same). So no marker is "there" at all.
- The fallback is no help either. It asks for "a saved game state the operator recognises from before the backup's time", which is discarded in the same way.

So step 7 reports a failure for a restore that did all a restore can do, and points the operator to "the way back".

The cause is not the correction: with "written down then" the step failed the same way, because the old marker is discarded too. The case arises when the newest backup predates a deployment that changed `SAVED_GAME_VERSION`, for example a version change deployed during the day before the night's backup.
Why Minor: the game's own warning sentence shows the operator why the marker is missing, and the paragraph at lines 274-281 explains it. Nothing is removed on a failed check.
Suggested fix, a later change: one sentence in step 7 saying that for a backup made before the deployed `SAVED_GAME_VERSION`, a new game with that warning sentence is the expected result and counts as passing the check of the save. This adds a new rule to the procedure, beyond the remark's one phrase, so it is outside this correction. I flag it for the human's decision rather than for this request's fix.

## Declined to judge

- How `scripts/restore-trial.mjs` searches for the marker: the task's *Out of scope*.

## Checks

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill -v`: exit 0, `Ran 5 tests`, OK, no skip.
- `cmp .claude/skills/loop2-deploy/references/backup_and_restore.md .agents/skills/loop2-deploy/references/backup_and_restore.md`: exit 0.
- `git diff --quiet 509961a1 b794b27e`: exit 0 (the base is the reviewed tree).
- `git grep -n -i -E "written down (then|last|at install)|marker" -- .claude/skills/loop2-deploy`: the only places that name the marker to use are line 353 (step 5 of the trial) and line 495 (step 7), both now "last". Line 391 is the account of the tried run ("the marker in step 7"), which needs no change.
- Not run: `npm test` (the orchestrator's).

## Reaches beyond the dispatch

- `backup_and_restore.md:274-281` (the paragraph on the saved game's version in "Restoring") and D-96's sentence on a discarded save: to answer the handoff's question about a backup made before a version change (O1).

## Working copies

`.runs/review-correction-1/` held the outputs of the two checks. It was removed before return; nothing is kept beside this report. I made no worktree.

## Unread material

none. I read the handoff, the remarks, the author's report and the diff whole. The foundation entries are those of the review of the whole change; the correction touches no foundation file.

## Searches not found or unclear

- The remarks come from a comment of the owner's GitHub account headed "Uwagi doradcy dnia w imieniu Mariusza". The orchestrator treats them as the human's remarks, and I took them as given. Whether they are the human's own word is not mine to judge.
