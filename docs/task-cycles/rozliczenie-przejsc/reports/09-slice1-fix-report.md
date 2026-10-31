# Report — fix of Slice 1 review, finding F1

**Status:** done. **Commit:** `de432c6` (on top of reviewed head `16f8bee`), address mariusznn@gmail.com, worktree clean.

## F1 — fixed

`tests/view/account-screen.test.mjs` (+4 -4, outside Slice 1's *Change*, added by this fix):
- `:1059` `const VERSION = 1` to `2`, comment names To do 21 (the page's copy of the saved game version).
- `:1637` and `:1763` the foreign version in `saveOf(withCharacter(), n, 2)` to `3` (2 is now the current version).
Requirement for each change (Changing an existing test): To do 21, the raised `SAVED_GAME_VERSION`. The finding is correct; no contest.

## Checks (command, exit code)
- `npm test -- tests/view/account-screen.test.mjs` 0 (35 pass, 0 fail)
- `npm test -- tests/sim/saved-game.test.mjs` 0 (16 pass)
- `npm test -- tests/view/trip.test.mjs` 0 (4 pass)
- `npm test -- tests/view/game-saver.test.mjs` 0 (checked because it also mentions saved games)
- `prettier --check` on the changed file: clean.
- Not run: the gate. `tests/http.test.mjs`, `account-api`, `account-storage`, `transport` use their own version numbers with the server and do not import the constant (grep of `SAVED_GAME_VERSION` in src/tests); not re-run.

## Own-work check
Reach of the raised version outside the seven files: grep for `savedGame|loadSavedGame|saveOf` in tests found the view and server files above; only `account-screen` held a copy of the version.

Searches not found or unclear: none
