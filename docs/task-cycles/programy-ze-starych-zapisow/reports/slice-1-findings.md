# Findings of the review of slice 1 (range `6f237fb8..896b7509`, head `896b750993bec754de4cf5efd3596d324ab8b355`), in the reviewer's words

Source report: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-1-reviewer-report.md`. Blocking findings only: the Minor findings of a slice review are kept for the review of the whole change and are not fixed here.

### Important (blocking)

**I1. No test shows that the move, the reset and the privilege write touch only their own account's rows; E17 `player-save-isolation` is carried by no new case.**

- Place: `tests/account-storage.test.mjs`, the new cases from line 1034 to 1301 (the plan's slice 1 Goal: "new cases, carrying the markers of E18, E19 and E17"; the plan's entry table row E17: "Slices 1, 2 (their tests)"). `git diff 809fbf6b..896b7509 -- tests | grep 'invariant:'` shows markers `account-database-schema`, `account-schema-lifecycle` and `previous-save-slot` only; no new `player-save-isolation` line. The invariant now reads "a signed-in player can read and change only the saved game states, the previous save included, belonging to their own account" (`foundations/invariants.md`, `## player-save-isolation`).
- What is wrong: every new case that writes the slot or the privilege uses one account (the `fixture` account). The only second account (`other@example.test` in the byte-limit case, and `empty@example.test` in the reset case) never has a save, a slot or a privilege that the first account's operations could damage.
- Why it matters: this is the `src/server/**` trust boundary, and the three writes are the ones that must be scoped by account. Their scope is one `WHERE account_id = ?` or `WHERE id = ?` each. A lost clause turns a player's reset into everyone's reset, or a grant of one address into a grant for all, and the green tests would not notice.
- Evidence (mutation runs, below, in a scratch copy of the head commit; `npm test -- tests/account-storage.test.mjs` stayed at exit 0, 0 failing, for each of):
  - M21 `resetSavedGame`: `DELETE FROM saved_games WHERE account_id = ? OR 1 = 1` — survives.
  - M22 `movePreviousSave`: `WHERE account_id = ? OR 1 = 1` in the `INSERT … SELECT` — survives (it copies every account's current save into every account's slot, each under its own identifier).
  - M23 `setPreviousSavePrivilege`: `UPDATE accounts SET previous_save_allowed = ? WHERE id = ? OR 1 = 1` — survives.
  - For contrast M24 (the reader of the previous save losing its account filter) is caught by 7 failing cases, so the reader is covered by accident and the three writes are not.
- Fix asked for: one case with two accounts, marked `// invariant: player-save-isolation`. For example: both accounts hold a current save; account A is granted the privilege, takes a save of a higher version and then a reset; account B's current save, previous save, privilege and its own `readPreviousSavedGame` stay exactly as they were, and B holds no privilege after A's grant. It should fail on M21, M22 and M23 and pass on the head code.
