# Slice 9 fix report

**Status:** done. **Commit:** ae0d7e2 (from head 59bf3da). Both copies byte-equal (test passes).

- I-1 fixed: troubleshooting.md schema-move sentence now says the move keeps every account, session, emailed link and saved game state with their values, and that only accounts from a database before version 3 come out unconfirmed (3 to 4 leaves the confirmation state as is).
- I-2 fixed: SKILL.md § "Accounts, session keys and the database": the Database bullet says the database holds saved game states and that a prune removes them too; the "Deploying a request and accepting it" bullet names the H2 saved-state check.
- I-3 fixed: setup_and_secrets.md H2 step now says there is no save button, the human first makes a recognisable change (create a character, or edit and keep a program), waits for the automatic save, redeploys the same commit, reloads and checks that exact change is back; an empty team means the save was lost.

Checks: `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 tests OK). Not run: whole gate.

Searches not found or unclear: none. Note: "create a character / edit and keep a program" is taken from the reviewer's example; I did not check the game's UI for those exact actions.
