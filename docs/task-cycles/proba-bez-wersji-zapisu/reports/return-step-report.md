# Return step report — proba-bez-wersji-zapisu

**Status:** done. Nothing no longer matches; no commit made (head stays `509961a1`).

## Foundation compared with code

- **D-234** (the entry the change writes): its binding sentence, "complies", "violates", *Rationale* and *Rejected* match the instruction copies (both say "every month and after each change of the database's schema version"; the hint on `SAVED_GAME_VERSION` stands outside the condition) and the five `# decision: D-234` quotations of `tests/deploy/test_restore_trial.py` (the foundation check of the citations passes). The clause `tests:` of its *Verification* (login with a test account and a name given in the saved game state seen back, a wrong password or an absent name failing the trial, the trial's container and volumes removed and no pass until Docker shows them gone) matches what the lines `decision: D-234` in that test hold; the pair of examples now keeps only the part no test holds (the operator's repeat, fetching from Strych, removing the decrypted file, agents never opening a backup, the restore over the server's database and the new server not counted as checked). Nothing to move out of the pair.
- **D-96** (not changed; the task relies on it): its sentence on a discarded saved game state of another version starting a new game matches `src/browser/sim/saved-game.ts:1403` and the Rationale of D-234 and the hint.
- **D-228**: its Rationale names "the operator's repeated restore trial of D-234" without a condition; unchanged and true.
- **D-360** (derives from D-234): states nothing of the repeat condition.
- **Part map** (`product-foundation`, `agent-workflow`, `deployment`): the files the change touches (`foundations/decisions.md`, both copies of the deploy instruction, `tests/deploy/test_restore_trial.py`) are claimed as before; the foundation check passes. No part-map entry names the condition.

## Search of the foundation (once)

`git grep` over `foundations/`, `guidelines/` and `AGENTS.md` for "restore trial", "trial", "marker", "SAVED_GAME_VERSION", "saved game's version", "version of the saved game", "schema version". Hits read: D-228 line 1974 (true), the Node.js release decision at `foundations/decisions.md:344` (the image of the trial, no condition), the invariants at `foundations/invariants.md:780` (schema version of the database) and `:1040` (the game loads no data from a state of another version; D-206 and D-401 are the entries it derives from), `guidelines/coding-saved-game.md:100` and `guidelines/testing.md:471-472` (the test files of the trial). No decision, invariant or guideline names the trial's repeat condition or the marker other than D-234 and the instruction. No marker is named in any foundation entry.

## What was written or changed

- Decisions written or changed in this step: none (D-234 was written by the foundation step of the change, row 1).
- Invariants, environment facts, glossary terms, part-map changes, projected entries: none.
- Rows of *Settlements to record* written: row 1 (D-234, in the log; commits `9d8cfce3` and the fix `509961a1`).

## Seen, outside the task, not changed

- Step 7 of "Restoring over the server's database" (both copies of `backup_and_restore.md`, about lines 493-497) names the marker as "the name given … in step 8 of "Installing and reinstalling" and written down then". After a change of `SAVED_GAME_VERSION` and a new marker, that sentence is stale in the same way as the old step 5 placeholder was. The task does not cover it; left as is.

## Checks

None run for this step, as nothing changed (the foundation check and the deploy skill test ran after `509961a1` in the fix report: exit 0 each).

## Unread material

none of what the handoff names: D-234, D-96, D-228 and the part-map entries by search; the review reports were not read, as the handoff allows. The part map was read by search for the files and words, not whole; invariants 780 and 1040 were read at their line, not the entries from D-206 and D-401 in full.

## Searches not found or unclear

none

## Working copies

None made in this step; `.runs/author/` does not exist.
