# Slice 7 report - the testing guideline

**Status:** done

**Commit:** d8b1482 (one commit, `guidelines/testing.md`, +19/-9)

**Changed meaning for the human (WAY-172), one sentence:** Kod rozmawiający ze Strychem i z usługą `pusher` nie ma testu zgodności, żaden test ich nie dotyka, reakcje skryptu kopii pokazują podstawione narzędzia (dowodzą reakcji, nie dostarczenia), a zgodność z nimi sprawdza człowiek, gdy zmienia się sposób rozmowy (ósme odstępstwo od szablonu, D-221).

**What changed**
- Line 10-11: count of departures is eight, list gains D-221.
- Rule "Choosing the level": Decision field gains D-221; row "Czy kod rozmawia z cudzą usługą?" gains the Strych/`pusher` answer.
- Trust boundaries: Decision field gains D-217, D-221, D-222; Invariant field gains account-save-backup-encrypted; `src/server/` row names the command's refusal cases (no invariant, D-217/D-222); `deploy/` row names `test_a_run_that_does_not_finish_the_encryption_sends_nothing` (account-save-backup-encrypted, D-218) and `test_an_argument_is_refused_before_anything_runs`.
- Recipes: integration files and Doubles name the new tests and the script seam; smoke files name the stream test and the sqlite-upgrade test.
- Where in code: the ten new test files added, plus the launcher support and stand-in files.
- I applied `the-way-maintain-testing-guidelines` myself as the author of the file (its refinement part belongs to the task's refinement, already done); no part-map change was needed (the map already claims the files), so `the-way-update-part-map` was not applied.

**Checks**
- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, "0 errors".
- Every `tests/...` path named in the guideline exists (shell loop, no MISSING); case names grepped against the test files.
- `npx prettier --check guidelines/testing.md` -> warns, but the base file at db73929 warns identically; the gate does not cover this file. Not a regression.
- Not run: full `npm test` (the orchestrator's gate); the invariants' tests were not rerun, this slice changes prose only.

**Own-work check:** the requirement most likely missed, that the trust-boundary rows name cases that exist exactly; checked by grepping each quoted case name in its file (all found).

**Reaches beyond the dispatch:** D-217 and D-222 (`foundations/decisions.md`) for the decision of the command's refusal; `foundations/part_map.md` to confirm the files are claimed.

**Choices:** the `src/server/` row cites D-217 and D-222 as the command's decisions (rejected: citing D-221, which is about stand-ins). If wrong, the row points a reader to a neighbouring decision. The command's second refusal case ("a missing database file...") was added to the row; the spec says refusals plural.

**Searches not found or unclear:** none for the code; unclear: the handoff says "the script's refusal to send"; I read it as account-save-backup-encrypted's refusal case plus the argument refusal. Also the guideline's own Polish sentence says "kopii bazy"; per the cycle's word "backup" for new text, the Polish rendering "kopia bazy" was kept to stay Polish in tone (the English word applies to code and tests).
