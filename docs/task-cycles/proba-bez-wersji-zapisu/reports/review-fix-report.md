PASS 509961a161efd3cd12ff3cd625be94b5b39db1f3

# Review of the fix — proba-bez-wersji-zapisu

Range `ca90b465..509961a1`: one commit by the author, `509961a1`. `git rev-parse HEAD` in the worktree shows `509961a161efd3cd12ff3cd625be94b5b39db1f3`. The findings file `reports/review-whole-findings.md` bounds this review: M1 and M2, both Minor within the task.

Counts: blocking 0, new Minor in the fix diff 0, notes outside the fix diff 1 (outside the task's scope).

## Findings of the findings file

- **M1 — fixed.** In both copies of `backup_and_restore.md` (lines 297-298), the hint now reads "…let the game save it, write it down, and take the backup for the trial from a night after that." That is To do 3's "i go zapisuje". The placeholder of step 5 (line 353) now reads `<the marker name written down last, as in the install step 8>`, so an operator following step 5 after a change of `SAVED_GAME_VERSION` is pointed at the new marker. The defect no longer exists at the head.
- **M2 — fixed.** `foundations/decisions.md:2221` now reads "already lost at the first load after its deployment". That agrees with the entry's own *Rejected* ("lost at the first load") and with D-96 and D-206. The defect no longer exists at the head.

## The questions of the handoff

- **New Critical or Important finding in the fix diff:** none. The fix changes three lines of prose in each copy of the instruction and one line of D-234's Rationale. It touches no code, test or binding sentence.
- **The two copies:** still byte-identical (`cmp` exit 0; the deploy skill test, which includes `test_both_copies_are_byte_identical`, passes).
- **The change of step 5's placeholder:** within the task. To do 3 asks for a new marker before the next trial after a change of the saved game's version. Without this change, step 5, unchanged, sent the operator back to the old marker; that was the second half of M1, and I offered the change as optional. The placeholder changes only its wording, not the command. `git grep` for "written down (in the install|last)|marker name" finds the old wording nowhere else in the repository, and no test quotes it.
- **The rest of D-234:** unchanged. `git diff -U0 ca90b465..509961a1 -- foundations/decisions.md` shows one line removed and one added, both line 2221 of the Rationale. The binding sentence, *Verification*, *Rejected* and *Origin* are untouched, and the foundation check passes with every test quotation of D-234.

## Note outside the fix diff (outside the task's scope)

- Step 7 of "Restoring over the server's database" (`backup_and_restore.md:493-497`, both copies) still names the marker as "the name given … in step 8 of "Installing and reinstalling" and written down then". After a new marker given by the hint, that is the older one. The step has its own fallback ("If it was not written down, log in and check that the test account holds a saved game state the operator recognises"), and it belongs to the restore over the server, which the task does not touch. This is a note only; it reopens nothing.

## Declined to judge

- How `scripts/restore-trial.mjs` searches for the marker: the task's *Out of scope*.

## Checks

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill -v`: exit 0, `Ran 5 tests`, OK, no skip.
- `cmp .claude/skills/loop2-deploy/references/backup_and_restore.md .agents/skills/loop2-deploy/references/backup_and_restore.md`: exit 0.
- Not run: `npm test` (the orchestrator's). I did not repeat `tests.deploy.test_restore_trial`: the fix changes neither that test nor the script it runs, and I ran it at `ca90b465` in the review of the whole change (exit 0, 19 tests, no skip).

## Reaches beyond the dispatch

- `backup_and_restore.md:493-497`, step 7 of the restore over the server: whether another sentence of the instruction still names the old marker (the note above).

## Working copies

`.runs/review-fix/` held the outputs of the two checks. It was removed before return; nothing is kept beside this report. I made no worktree.

## Unread material

none. I read the handoff, the findings file, the author's fix report and the full fix diff whole. The foundation entries are those of the review of the whole change; the fix touches no other.

## Searches not found or unclear

none
