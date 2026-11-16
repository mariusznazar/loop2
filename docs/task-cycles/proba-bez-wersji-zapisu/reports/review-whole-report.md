PASS ca90b4654ef4bf7d83bd43c6f7af1dc20b58f127

# Review of the whole change — proba-bez-wersji-zapisu

Range `e3295528..ca90b465`. Two commits, both by the one author: `9d8cfce3` (D-234 and the quotations in the test) and `ca90b465` (both copies of the instruction). `git rev-parse HEAD` in the worktree shows `ca90b4654ef4bf7d83bd43c6f7af1dc20b58f127`, the head I was given. The route has no plan and no slices, so every finding comes from this one change.

Counts: blocking 0, Minor within the task 2, outside the scope 0.

## Findings

### Critical

none

### Important

none

### Minor — within the task

**M1. The hint does not say to write the new marker down, and step 5 of the trial still names the marker of install step 8.**
Place: `.claude/skills/loop2-deploy/references/backup_and_restore.md:295-298` and `.agents/skills/loop2-deploy/references/backup_and_restore.md:295-298` (both copies are identical); also step 5 of the same section, line 353 (`--marker '<the marker name written down in the install step 8>'`).
What is wrong: To do item 3 of the task ends "przed następną próbą właściciel nadaje nowy znacznik, tak jak w kroku 8 sekcji „Installing and reinstalling”, i go zapisuje". The subject of "zapisuje" is the owner, so it means "writes it down", which is also what step 8 does: "Write the name down; it is the marker of the restore trial". The hint renders it as "let the game save it", and writing the marker down is now covered only through "as in step 8". Step 5 of the trial, unchanged, still names the marker as the one written down in install step 8. After a change of `SAVED_GAME_VERSION`, that is the old marker.
Why it matters: an operator who follows step 5 literally can pass the old marker. The result is a FAIL for an absent marker, which wastes an hour's session. It never gives a false PASS, so the fault fails safe, and the grade is Minor.
Evidence: the diff of `ca90b465`, and line 353 of both copies at the head.
Suggested fix: "…give a new marker as in step 8 of "Installing and reinstalling", let the game save it, write it down, and take the backup…". Optionally, let the placeholder of step 5 name "the marker written down last". Both copies must stay byte-identical.

**M2. D-234's new Rationale sentence says the loss happens "at its deployment". The decision's own Rejected and D-206 put it at the first load.**
Place: `foundations/decisions.md:2219-2221` ("so what a restore loses to that change is already lost at its deployment").
What is wrong: the game discards a saved game state of another version when it loads it (D-96, D-206), so the loss comes at the first load after the deployment. The new Rejected line of the same entry says so itself (`foundations/decisions.md:2231`: "lost at the first load"). Also, for an account with the previous-save privilege, the discarded state moves to the previous save, and its programs can be pulled back (D-206, D-112, D-401). The deployment alone loses nothing.
Why it matters: the sentence is not binding, and the argument stands either way, because a restore adds no loss beyond what the version change already causes. The two places of one entry still disagree, though, and a later reader of the log may take "lost at deployment" as a fact. The wording follows the task's source ("dzieje się już przy wdrożeniu"), so this is precision, not infidelity.
Suggested fix: "…is already lost at the first load after its deployment…".

### Minor — outside the task's scope

none

## Judgements the dispatch asked for

- **The orchestrator's reconciliation (record question Q1)** is right. At `be597c41` the *Verification* "complies" line of D-234 read "…after the next change of the database's schema version", without the saved game's version. At the base `e3295528` it read "…of the database's schema version or of the saved game's version" (checked with `git show be597c41:foundations/decisions.md` and `git show e3295528:foundations/decisions.md`). The task's *Context* line "Linia „complies” … nie wymaga zmiany" therefore no longer held, and removing the condition there follows the task's intent. The base calls the person "operator", as the glossary entry `owner` requires (its *Not:* "the person who reaches the server and runs its commands — "operator""). The five `# decision: D-234` quotations had to follow the sentence. A positive control shows the foundation check enforces it (see Checks).
- **Nothing else in the repository still states the removed condition.** `git grep -n -i -E "saved game'?s? version|saved-game version|save version"` finds at the base the four places of D-234 and the five test quotations; the instruction copies matched across a line break and are changed in the diff. At the head it finds only the new Rationale sentence and the two new Rejected items, which state the opposite. I also searched for "every month|monthly|co miesi|wersji zapisu|D-234|restore trial|repeat.*trial" (see Reaches). Of the hits, `scripts/restore-trial.mjs:1-10` names no repeat condition; D-228's Rationale ("the operator's repeated restore trial of D-234") names none; the deploy `SKILL.md` and `security-notes.md` speak of other trials. No invariant cites D-234.
- **Choice (1), the Rationale sentence on why the saved game's version is no such moment:** within the task. After the condition leaves the decision, the Rationale has to say why the decision stands as it now reads. The reason is the task's own *Answer* (the script does not read the version; the game discards the save, D-96; a restore of a backup from before the change adds no new loss). Settlement row 1 names that answer as its source. Nothing in it is invented. Its one imprecision is M2.
- **Choice (2), the clause "take the backup for the trial from a night after that":** within the task. The task asks for a new marker "tak jak w kroku 8", and step 8 itself ends "Do this before any run whose backup the trial may use". The clause states that consequence, because a marker given after the backup was made is not in it, and the trial would fail. It adds no new step or condition of repeating. "A night" is narrower than step 8's "any run" (a hand run also writes a weekday file), but the narrowing only rules out a backup the operator would rarely use, and it is harmless. No finding.

## Coverage of the task

- **To do 1 (D-234, three places plus *Rejected*):** met. The sentence (line 2196-2197), the "violates" line (2212) and the Rationale (2218-2219) no longer name the saved game's version; the "complies" line (2211) loses it too, as the reconciliation required. *Rejected* holds both ways of *Not chosen*, each with its cost, faithful to the source (2227-2232). The source's date "14.11 dwie" is left out as the history of an event, which is acceptable.
- **To do 2 (instruction sentence, both copies):** met. Line 285-287 of both copies: "The operator repeats it every month and after each change of the database's schema version; a trial made before such a change does not cover it."
- **To do 3 (preparation hint, both copies):** met, in substance. It is a hint, not a condition of repeating: it names `SAVED_GAME_VERSION`, that the change erases the marker because the game discards the save (D-96), and the new marker given as in step 8. See M1 for "write it down".
- **Acceptance criterion:** met. The paragraph "Not proven by this trial: … and the version of the saved game" (line 381-384) and the paragraph "The schema version of the database is not the only version a backup carries. …" (line 274-281) are untouched; the diff has no hunk there.
- **Settlement row 1:** met. D-234 now says: repeat every month and after a change of the schema version, without the saved game's version, and *Rejected* carries the two ways not chosen. No new decision was needed; *Origin* stays `none`, which the template allows.
- **Out of scope:** respected. `scripts/restore-trial.mjs` and the game are untouched; the test file changes only in five comments.
- **Fidelity:** nothing outside the task is added except the two choices judged above. Both stay within the task.
- **Structure:** `change_file_sizes.py` shows +5, +5, +8 and +0 lines. `guidelines/coding.md` has no rule `### Size of a function and a file`, so no size test exists. No code changes, so I have no finding of structure.
- **Guidelines:** `guidelines/testing.md` § Changing an existing test is not reached: no expectation or assertion changed, only the quoted sentence, which follows the decision. D-82 is not reached: the comments name a foundation entry, not a task document.
- **Author's own-work check:** it named the right weak point, a place still stating the condition, and its greps would catch it. It missed nothing I found; neither M1 nor M2 is within what that check looks for.

## Declined to judge

- How `scripts/restore-trial.mjs` searches for the marker (a text search of `body.save.game`, blind to the version): the task's *Out of scope* holds the behaviour of the script.

## Checks

- `python -B .the-way/task-cycle/change_file_sizes.py e3295528 ca90b465`: exit 0 (sizes above).
- `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree at the head: exit 0, `0 errors`.
- Positive control for the quotations, in a worktree of `ca90b465` under `.runs/review-whole/head`: one of the five quotations in `tests/deploy/test_restore_trial.py` reverted to the old sentence, then `python -B .the-way/elements/common/foundation_check.py`: exit 1, `tests/deploy/test_restore_trial.py:209: the quotation stands in no binding sentence of D-234`, `1 error`. The check does enforce the quotations, so the clean run above means something.
- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill -v`: exit 0, `Ran 5 tests`, OK, no skip.
- `cmp` of the two copies of `backup_and_restore.md`: exit 0, identical.
- `python -B -m unittest tests.deploy.test_restore_trial -v` (output to a file, no pipe): exit 0, `Ran 19 tests in 37.183s`, OK, the word "skip" absent from the output; `RunOnARealBackup.test_pass_fail_on_wrong_password_fail_on_absent_marker_and_interruption ... ok` ran against a real Docker daemon.
- `.the-way` pin: `git -C .the-way rev-parse HEAD` = `bfb2e109…` = the gitlink of `git ls-files --stage -- .the-way`.
- Not run by me: `npm test` (the orchestrator's) and `python -B .the-way/instruction-files/check_instructions.py` (the author reports it at exit 0; I did not repeat it).

## Selection and reaches

- Parts touched: `product-foundation` (`foundations/decisions.md`), `agent-workflow` (the two instruction copies), `deployment` (`tests/deploy/test_restore_trial.py`). D-234's *Scope* adds `build-tools`, which no changed file belongs to.
- Index: `decision_index.py --section "Database backup and restore" --part agent-workflow --part product-foundation --part deployment --decision D-234 --decision D-96 --decision D-228`, written to `.runs/review-whole/index.md` (11 listed in full, 71 by heading). I read the index and ran through the 71 headings, opening D-82 and D-112 for their bearing on test comments and on schema and saved-game versions, and D-400 for the previous save.
- Reaches beyond the selection:
  - D-206 (sentence and *Verification*) and D-401 (sentence): what happens to a save of another version (M2).
  - Invariants `save-version`, `account-schema-lifecycle`, `account-save-sqlite-upgrade`, `account-save-backup-encrypted`, `account-save-backup-failure-notice`, `tracked-file-private-paths`, `tracked-file-private-names`, each whole.
  - D-234 at `be597c41`, to judge Q1.
  - `scripts/restore-trial.mjs:1-30` and `.claude/skills/loop2-deploy/SKILL.md:645-686`: to look for the condition elsewhere.
  - `.the-way/elements/decisions/template.md:41`: the meaning of *Origin*.
  - the-way's glossary, entries `binding part` and `binding sentence`.

## Working copies

- `.runs/review-whole/head`, a detached worktree of `ca90b465`, used for the positive control: removed with `git worktree remove --force` (exit 0), then `git worktree prune` (exit 0); `git worktree list` no longer shows it.
- `.runs/review-whole/` (the index, the sections list, the check outputs, the text of `decisions.md` at `be597c41`): removed after this report was written. Nothing is kept beside the report.

## Unread material

- **Decisions:** 6 of the index's decisions read whole (D-234, D-96, D-228, D-82, D-112, D-400). D-230, D-231, D-232, D-233, D-235, D-236, D-238 and D-360 were read through their binding sentences in the index; none bears on the change beyond what those sentences say. Outside the index, D-206 and D-401 were read only in part (see Reaches).
- **Invariants:** I read those that cite D-234, the restore trial, the backup or the deploy skill (none cites D-234), plus `save-version` and the two `tracked-file-*`. The other invariants whose *Part* names `deployment`, `agent-workflow` or `every` (about 40: container, HTTP, simulation and lint rules) were not read whole; the change touches no code they hold.
- **Part map:** the entries of `agent-workflow`, `product-foundation` and `deployment` were read whole.
- **Glossaries:** the product's glossary was read whole; of the-way's glossary only `binding part` and `binding sentence`.
- **Guidelines:** `guidelines/coding.md` and `guidelines/testing.md` were read whole; no other guideline file applies to the touched parts.

## Searches not found or unclear

- At `be597c41`, the task's *Context* says D-234's "complies" line needs no change; at the base it carried the condition. The orchestrator settled this in Q1, and I confirm it above.
- My first `git grep` at the base for "saved game's version" did not find the instruction copies, because the phrase is split across a line break there. The diff of both copies confirms the change.
