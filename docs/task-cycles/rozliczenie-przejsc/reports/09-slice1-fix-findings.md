# Findings to fix — Slice 1, from `reports/08-slice1-review-report.md`, in the reviewer's words

Reviewed head: `16f8bee`.

### F1. Raising the version leaves ten cases of the page's test file red

- **Place:** `tests/view/account-screen.test.mjs:1059`, `:1637`, `:1763`, not changed in the range;
  the cause is `src/browser/sim/saved-game.ts:70`.
- **Slice:** Slice 1. **Named as a defect of the plan:** Slice 1's *Change* and *Checks* leave this
  file out, so the executor did what the plan gave, and the finding stands all the same.
- **What is wrong:** the file holds its own copy of the version, `const VERSION = 1;` at `:1059`,
  and uses 2 as „another version” at `:1637` and `:1763`. With `SAVED_GAME_VERSION` at 2 the page
  refuses each save the test hands it as another version and starts a new game, and the two cases
  that use 2 as a foreign version get a save the game accepts.
- **Why it matters:** the product's own tests fail on the slice's commit, so the gate cannot pass and
  Slices 3, 4 and 5, which list this file in their *Checks*, would meet a failure they did not
  cause. The failing cases are the ones that protect the save path of the page: a 401, a conflict, a
  refused save, a logout, a death saved at once. To do 21 and `guidelines/coding-saved-game.md`,
  „Wersja podnoszona razem z kształtem”, ask for the raised version together with its tests.
  Nothing in the plan names the constant.
- **Evidence:**
  - `node --test tests/view/account-screen.test.mjs` on `95de83b`: exit 0, 35 pass, 0 fail.
  - The same on `16f8bee`: exit 1, 25 pass, 10 fail.
  - The ten failing cases, by name:
    1. „a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to
       the game from it”
    2. „a sign-in to another account after a 401 on a save drops the kept state and loads that
       account's save”
    3. „a save builds the game the load gives: a map run that went on comes back paused at its pace,
       an ended one on its screen after the end”
    4. „each act of the player that changes the game state is saved at once, and one that changes
       nothing sends nothing”
    5. „a game minute that ends the map run in a death is saved at once”
    6. „a refused save starts a new game with its one-time sentence above it, after a confirmation
       notice, and saves the new game at once on the server's revision”
    7. „a failed save shows its line under the title and „Wyloguj”, above the address row, and a
       retry that succeeds clears it”
    8. „a conflict drops the game, asks for the server's save and builds from it with its sentence
       in the header until a save succeeds; a refused one there starts anew”
    9. „„Wyloguj” saves first and goes on, stays or ends each way its save's outcome gives”
    10. „a save that finds no session while the logout's request is under way waits for its answer:
        a logout ends it, an uncertain one then takes the expiry path”
  - With the three lines changed in a scratch worktree: exit 0, 35 pass, 0 fail. So these three lines
    are the whole cause, and no fixture of this file breaks on the new load rules.
- **The fix, confirmed by that run:** `:1059` to 2, and at `:1637` and `:1763` the foreign version
  to 3, each naming To do 21 as `guidelines/testing.md`, *Changing an existing test*, asks.
  `npm test -- tests/view/account-screen.test.mjs` joins the checks of the fix.
- **The author's own-work check** named To do 3 and Q2, which hold. It did not look where this
  change is weakest: the reach of the raised version outside the seven files. The report says at
  *Problems and open points* that the full gate would show any other test, so the check could not
  have caught this.
