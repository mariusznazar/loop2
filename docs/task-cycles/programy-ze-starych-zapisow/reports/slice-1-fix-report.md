# Slice 1 — fix report (findings of the review at `896b7509`)

**Status:** done
**Commit:** `4e1decb2` on `task/programy-ze-starych-zapisow`, on top of the reviewed head `896b7509`. Adds 69 lines to `tests/account-storage.test.mjs`, removes none. `src/server/database.ts` is unchanged.
**Check line:** `npm test -- tests/account-storage.test.mjs` exit 0, 76/76 pass; `npm run typecheck` exit 0; `npx prettier --check tests/account-storage.test.mjs` exit 0 (after one `--write`, which touched only the new lines). Not run: the product's gate and `foundation_check.py`, as the handoff says.
**Questions:** none.

## Findings, as fixed or contested

- **I1 (blocking), fixed.** No test with a second account showed that the move, the reset and the privilege write touch only their own account's rows. Fix: one case, "the move, the reset and the privilege write touch only the account they name, and another account's saves and privilege stay as they were", marked `// invariant: player-save-isolation` and `// invariant: previous-save-slot`, at `tests/account-storage.test.mjs` (inserted before the byte-limit case, around line 1272).
  - The case: a neighbour account holds a current save and a previous save and no privilege. The first account is granted the privilege, saves a higher version (its own save moves), and resets (its current save moves). Then the neighbour's current save, previous save and privilege are checked to be as they were, and its reset answers `unprivileged` and moves nothing.
  - Head code: passes (exit 0, 76/76 in the run after the insertion).
  - Mutations, each applied to `src/server/database.ts` by a one-line string replacement, then `npm test -- tests/account-storage.test.mjs`, then the file restored and compared byte for byte with the saved copy (`cmp`, passed after each):
    - M21, `DELETE FROM saved_games WHERE account_id = ? OR 1 = 1` in `resetSavedGame`: exit 1, 75 pass, 1 fail (the new case).
    - M22, `WHERE account_id = ? OR 1 = 1` in the `INSERT … SELECT` of `movePreviousSave`: exit 1, 75 pass, 1 fail (the new case).
    - M23, `UPDATE accounts SET previous_save_allowed = ? WHERE id = ? OR 1 = 1` in `setPreviousSavePrivilege`: exit 1, 75 pass, 1 fail (the new case).
  - Each mutant is caught by the new case; the reviewer's mutants M21–M23 were the target.
- **M1 (Minor), not fixed here.** The reset's read order (block before privilege) is not tested with a blocked, unprivileged account. Out of this fix's scope; left to the review of the whole change, not contested.
- **M2 (Minor), not fixed here.** The reset's nothing-to-move case with an existing slot is not tested. Out of this fix's scope; left to the review of the whole change, not contested.

## Own-work check

- Requirement most likely unmet: each of the three writes is scoped to the one account it names, so a lost `WHERE` clause cannot touch a neighbour.
- Check: the two-account case above, run against the head code and against M21, M22 and M23.
- Showed: head code passes; each mutant fails the case with one failing test.
- Not verified: other reads of the previous save (M24 was already caught by existing cases, per the reviewer); the rollback (not mutated, as before).

## Reach beyond the handoff

- `.the-way/task-cycle/change/fix.md` read whole (the fix variant names it).
- `reports/slice-1-reviewer-report.md` read whole for its evidence and the mutation list.
- `tests/account-storage.test.mjs` lines 1262–1275 read before the edit (the insertion point); the mutations and the new case as the reviewer named them.
- `the author's rule file on writing scripts`: already read in the earlier slice; the mutation script (`$TMPDIR/mutate.js`) is a one-line string replacement with no backslashes and no line-ending change; LF checked earlier.

## Unread material

- `tests/account-storage.test.mjs` as a whole: lines 961–1254 and 1302–2527 (less the insertion and the lines above) not read; no change there.
- `.the-way/...` other than `fix.md` and the change `SKILL.md` already read in the earlier slice: not read.
- `foundation-entries-report.md` and the plan file: not read; not named by the fix handoff.

## Searches not found or unclear

- None not found. The reviewer's line numbers for the new cases (1034–1301) differ from the file's numbering now; the cases are located by their titles.
