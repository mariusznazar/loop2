# Findings of the review of the whole change (`PASS ca90b4654ef4bf7d83bd43c6f7af1dc20b58f127`) — Minor findings within the task, to fix

Blocking findings: none. The two Minor findings below are within the task; the reviewer did not mark them outside its scope. They are copied from `reports/review-whole-report.md` in the reviewer's words.

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
