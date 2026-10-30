# Slice 9 report

**Status:** done
**Commit:** 59bf3da (base 11d1fb6)

Files changed (both copies, byte-equal, 6 files, +86/-30 in total): SKILL.md (opening lines, Accounts section line 177, Rollback with a new paragraph on schema version 4 and the exit 8 across it), references/troubleshooting.md (Rollback and the accounts: version 4, new bullet on saved game states in a rollback), references/setup_and_secrets.md (merge-window rule from H1 to the merge placed before the numbered steps of "Deploying a request head and accepting it"; reload sentence with the landing on a manual map run; persistence sentence no longer says saved states are not checked, new bullet: save, redeploy the same commit (H2), reload, see the state back).

Checks:
- npm test -- tests/agent_workflow/test_loop2_deploy_skill.py: exit 0 (5 tests OK).
- Not run: the whole gate (not mine).

Own-work check: requirement "both copies byte-equal and no stale 'version 3 is current' line" - the test checks byte equality (passed); grep shows the remaining "version 3" mentions are historical (H4 of the confirmation change, the version-3 step).

Reaches beyond the dispatch: database.ts grep for the table name (saved_games) and schema steps; I did not name the table in the text. No other.
Searches not found or unclear: none.
Choices: the merge-window rule is placed as a paragraph before step 1 (not inside a step) so it is seen first; wording on the window in SKILL.md says merges "take the test server down". Cost if wrong: wording only.
Concern: the rule says "the human who merges keeps it" per task Human actions; the first line of the rule is conditional ("When the request brings saved game states"), so after this task is merged it stays as a standing, reusable rule.
