# Author report — proba-bez-wersji-zapisu

**Status:** done

## Commits

- `9d8cfce3` — D-234 changed (sentence, "complies", "violates", Rationale, Rejected) and the five `# decision: D-234` quotations in `tests/deploy/test_restore_trial.py` follow the sentence.
- `ca90b465` — both copies of `backup_and_restore.md`: the condition changed in "Trying a backup on the operator's computer", and the hint added.

Files changed: `foundations/decisions.md` (+13 -5), `tests/deploy/test_restore_trial.py` (+5 -5, comments only), `.claude/skills/loop2-deploy/references/backup_and_restore.md` (+5 -4), `.agents/skills/loop2-deploy/references/backup_and_restore.md` (+5 -4; byte-identical to the other copy, made by copying the edited one).

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` (full run, citations of tests included) — `0 errors`, exit 0, run twice: on the working tree and after the commits.
- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` — 5 tests, OK, exit 0 (includes `test_both_copies_are_byte_identical`).
- `python -B -m unittest tests.deploy.test_restore_trial -v > .runs/author/trial.txt 2>&1` (no pipe, rerun after the commits) — exit 0, `Ran 19 tests in 34.357s`, `OK`, no skip in the output (the word "skip" does not occur in it).
- `python -B .the-way/instruction-files/check_instructions.py` — `0 error, 143 warn, 7 info`, exit 0. The warnings are "dead-path" for host paths in the skills and elsewhere, none of them in lines I changed.
- Not run: `npm test` (the orchestrator's). Nothing installed; the checks needed no `node_modules`.

## Own-work check

- Requirement most likely wrong: no place of the repository still names the saved game's version as a condition of repeating the trial. Check: `git grep -n "saved game's version" -- ':!.the-way'` and `git grep -n "every month"`, `git grep -n -i "monthly|restore trial|trial.*version|version.*trial"`, read each hit.
- Result: "saved game's version" now stands only in D-234's Rationale (the sentence saying it is no such moment) and in its Rejected (the two ways); "every month" in D-234's sentence, the instruction (both copies, now "schema version" only) and the five test quotations, all following the new sentence. The paragraph "Not proven by this trial: … and the version of the saved game" and the "Restoring" paragraph on the version are untouched.
- The decision's text no longer holds the condition in any of its four places (sentence, "complies", "violates", Rationale).

## Choices

- Rationale: added one sentence saying why the saved game's version is no such moment (the game discards a save of another version at load, D-96, so what a restore loses to the change is already lost at its deployment; a repeated trial would show nothing new). Rejected: the two ways of the task's *Not chosen*, each with its price, in the log's style, placed after "one trial, as it was". I left out "14.11 twice" (a date of an event, a history) and did not name the script by its file.
- Hint placement: a short paragraph after the opening paragraph of "Trying a backup on the operator's computer", before the numbered steps. Its wording: "A change of `SAVED_GAME_VERSION` erases the marker from the test account's saved game state: the game discards a saved game state of another version and starts a new game (D-96). Before the next trial, give a new marker as in step 8 of "Installing and reinstalling", let the game save it, and take the backup for the trial from a night after that." The last clause is from me, not from the task: it follows step 8's own sentence "Do this before any run whose backup the trial may use", because a marker given after the backup was made is not in that backup. Rejected: the task's bare wording without it, which would let an operator give a new marker and then trial an older backup that lacks it. Cost if wrong: one clause to remove.
- No glossary term or new entry beyond D-234; the invariants of the parts that name D-234 do not carry the condition (checked by the foundation check passing and by the greps above).

## Reach beyond the handoff

- `git grep` of "D-234", "SAVED_GAME_VERSION", "monthly", "restore trial" over the repository (other than the named greps) to find places naming the condition; found D-228's Rationale ("the operator's repeated restore trial of D-234"), which does not name the condition and is unchanged.
- Read `.the-way/foundations/decisions.md` WAY-03 (the named example of the decisions element).

## Unread material

- Not read whole: the entries of `foundations/part_map.md` for `product-foundation`, `agent-workflow`, `deployment`; `foundations/invariants.md` (searched for D-234 by grep only, via the `git grep` above, found none outside the decisions file and the tests); the glossary entries ("operator", "saved game state"); the-way's glossary; `guidelines/coding.md` and `guidelines/testing.md` (the change touches no code, and the test file only in comments); the decisions D-228, D-230, D-231, D-232, D-96 were read whole; D-233, D-236, D-238, D-360 were read whole; the decision-element files read whole. The weakness: part map, invariants and glossary were not read whole, so a statement of the condition in an invariant sentence would have been found only by grep.

## Searches not found or unclear

- None unclear. The task's *Context* said D-234's "complies" line needed no change; the code at `e3295528` differs (handoff point 2) and I followed the handoff.

## Working copies

None kept. `.runs/author/` held two scripts that made the text edits; both removed, together with the directory.

## Meaning of the decision (row 1)

- English: A checked restore of the database is repeated by the operator every month and after each change of the database's schema version, not after a change of the saved game's version, which the trial does not check and which the game already handles when it discards a save of another version.
- Polski: Próbę odtworzenia kopii bazy operator powtarza co miesiąc i po każdej zmianie wersji schematu bazy, a nie po zmianie wersji zapisu gry, której próba nie sprawdza, a z którą gra i tak sobie radzi, wyrzucając zapis innej wersji.
