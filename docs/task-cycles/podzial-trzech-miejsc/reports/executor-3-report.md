# Report - executor of slice 3 (executor-3), task `podzial-trzech-miejsc`

**Status:** done with concerns

The concern: one of the two mutations of the own-work check found a gap in the tests that was already there before the slice (section "Own-work check"). The slice's code does not depend on it.

## Commits

- `26c650cc` on `task/podzial-trzech-miejsc` (parent `7a16a73c`): refactor: move the nested functions of `startApp` to module level, the acts on a standing game into the new module `page-game-acts.ts`, the values that outlive a change of kind in one record of the page's memory; guideline sentences updated.

## Files changed (added / removed lines, `git show --numstat`)

| File | + | - |
|---|---|---|
| `src/browser/view/app.ts` | 312 | 424 |
| `src/browser/view/page-game-acts.ts` (new) | 209 | 0 |
| `src/browser/view/page-places.ts` | 40 | 2 |
| `guidelines/coding-browser-module.md` | 11 | 4 |

The diff of `app.ts` is large because each nested function lost one level of indentation and now takes the page as a parameter. `git diff --color-moved=dimmed-zebra 7a16a73c 26c650cc -- src/browser/view/app.ts src/browser/view/page-game-acts.ts` shows the moved code.

## What was done

- `src/browser/view/page-places.ts`: new type `PageMemory`, one record holding the eight values that were `let` in `startApp`. The field names are the same as before: `pendingNotice`, `pendingMessage`, `afterConflict`, `entry`, `kept`, `latest`, `failed`, `focusCardOnForms`. Each field keeps its old comment. The doc comment of `PageState` now says that these values live in the page's memory, not "in `startApp`".
- `src/browser/view/page-game-acts.ts` (new):
  - module-level `onPlace(places, view, next)`, `whenNotBusy(places, view, action)`, private `setLogout(places, view, logout)`, `logOut(page)` and `resetGame(page)`;
  - `signedOut` and the `GameStart` type, moved here because both modules use them;
  - the constant `OUTDATED` and the imports of `previous-save-lines.ts`;
  - `PageCalls` (what the acts call back in `app.ts`: `expire`, `showForms`, `focusCard`, `reloadAfterConflict`, `showGame`) and `GameActsPage` (`places`, `memory`, `client`, `calls`).
  - It imports nothing of `app.ts`, so there is no import cycle.
- `src/browser/view/app.ts`:
  - New module-level functions, placed before `startApp`, each taking `page` (`GameActsPage` plus `address` and `lastResort`), `places` or `memory` as a parameter: `takeNotice`, `leaveGame`, `placeCard`, `focusCard`, `waitForServer`, `askingFailed`, `loadFailed`, `showGame`, `showForms`, `expire`, `reloadAfterConflict`, `enter`, `loadGame` and `checkSession`. They stand beside `recordLoadFailure` and `startFrom`, so the place `view/app.startFrom` stays true.
  - `startApp` keeps: making the places and the memory, `onUncaught`, `reportLine`, `installLastResort`, the `page` record with its `calls`, `showReset`, `start` and the first draw (`root.append` + `void start()`). Its doc comment gained one paragraph on the memory record.
- `guidelines/coding-browser-module.md` (To do 7):
  - The sentence that said the values "stoją w `startApp` osobno" now says they stand in one record `PageMemory`, which `startApp` makes and passes as a parameter to the functions of `app.ts` and to the acts of `page-game-acts.ts`.
  - The two sentences on „Wyloguj” (example "Pasek menu w Reactcie" and example "Gra na stronie i odpowiedzi serwera") now name `logOut` from `page-game-acts.ts` instead of `app.ts`.
  - The sentences on `installLastResort` ("który `startApp` instaluje na oknie", "`app.ts` podpina do niego … `reportBrowserFailure`") are still true after the slice, so I left them unchanged.
  - The table "Files of this kind" gets no row.

Sizes, measured with the counting of `tests/quality/eslint-size-rules.mjs` (limits set to 0 in a copy of the run, file `.runs/executor-3/measure.mjs`, since removed):

| Item | Lines of code |
|---|---|
| `startApp` | 97 (371 at the base) |
| file `app.ts` | 373 |
| file `page-game-acts.ts` | 156 |
| file `page-places.ts` | 198 |
| largest other function: `createPagePlaces` | 99 |
| largest other function: `showGame` | 58 |
| largest other function: `logOut` | 42 |

## Calls of the trust boundary (for the reviewer)

| Call | Before (`7a16a73c`) | Now (`26c650cc`) | Arguments and what the result leads to |
|---|---|---|---|
| `screenAddress` (`screen-address.ts`) | `src/browser/view/app.ts:293-295`, in `onPlace` nested in `startApp` | `src/browser/view/page-game-acts.ts:68`, in module-level `onPlace(places, view, next)` | `screenAddress(current.place.screen) !== screenAddress(next.screen)`, unchanged. `current` is `places.gameOf(view)`, as before `gameOf(view)`. The result still decides `changed`, which empties `notices` in the `change` of the game (D-286). |
| `readResetToken` (`password-reset.ts`) | `src/browser/view/app.ts:609`, `start` nested in `startApp` | `src/browser/view/app.ts:497`, `start` still nested in `startApp` | `readResetToken(address.hash())`, unchanged. A non-null token still goes to `showReset(resetToken)`, then `placeCard(page, null, { token, address, finished })`, then `createAccountCard({ …, reset })`, with the same token and the same `address` object. Then `return` with no request, as before. |
| `readConfirmationToken` (`email-confirmation.ts`) | `src/browser/view/app.ts:614`, `start` | `src/browser/view/app.ts:502`, `start` | `readConfirmationToken(address.hash()) !== null`, unchanged. The same branch still shows „Potwierdzanie adresu…” through `places.change` (before: `change`). |
| `confirmFromAddress` (`email-confirmation.ts`) | `src/browser/view/app.ts:619`, `start` | `src/browser/view/app.ts:507`, `start` | `confirmFromAddress(client, address)`: the same `client` and `address` parameters of `startApp`. The answer still sets the pending notice to `answer?.notice ?? null` and `focusCardOnForms` to `answer?.refused ?? false`, and sets `entry` to `"link"`. Only the place changed: these are now fields of `memory` instead of `let`s. Then `await checkSession(page)`. |
| `browserAddress` (`email-confirmation.ts`) | `src/browser/view/app.ts:152`, default of `address` in `startApp` | `src/browser/view/app.ts:397`, the same default | unchanged |

A crafted address, confirmation message or reset token goes through the same code as before:
- the same pure readers of the fragment, on the same `address.hash()`;
- the same `confirmFromAddress`;
- the same card with its token.

None of the three files of the trust boundary was changed.

The log places are unchanged:
- `view/app.startFrom` stays in `recordLoadFailure` in `app.ts`;
- `view/account-card.createAccountCard` stays in `placeCard` in `app.ts`, as `page.lastResort.report(error, "view/account-card.createAccountCard")`.

One transition at a time and the ignoring of a late answer both work as before: the number of the last request is `memory.latest`, one field of one record that `checkSession`, `loadGame`, `enter` (in `app.ts`) and `logOut` (in `page-game-acts.ts`) all read and increase.

## Checks run

| Command | Exit |
|---|---|
| `npm test -- tests/view/<name>.test.mjs` for the nine of *Checks* on the unchanged tree (`7a16a73c`), before any change: account-screen, login-card-focus, owner-panel, previous-save, uncaught-failure, menu-bar, screen-address, email-confirmation, password-reset | 0 each |
| `npm run typecheck` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` | 0 (after one `--write` with the same options on the three files) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/view/login-card-focus.test.mjs` | 0 |
| `npm test -- tests/view/owner-panel.test.mjs` | 0 |
| `npm test -- tests/view/previous-save.test.mjs` | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 |
| `npm test -- tests/view/screen-address.test.mjs` | 0 |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 |
| `npm test -- tests/view/password-reset.test.mjs` | 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0; it names only `programs-entry.ts:81 createProgramsEntry (245)` and `programs-entry.ts:102 build (225)`, nothing of `app.ts`, `page-places.ts` or `page-game-acts.ts`, and no place the base did not name (the base named the same two and `app.ts:149 startApp (371)`) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" (run before and after the commit) |

- The nine view tests ran twice on the changed tree, 0 each time. The first run happened while I edited one comment of `page-game-acts.ts`; the second ran on the final tree, before the commit.
- I left the mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` unchanged.
- No test was written or changed: the slice is a move with no change of behaviour, so no first failing test applies.
- I did not run the full gate (`npm test` with no path), as the handoff and the method say.

## Own-work check

**Requirement most likely missed:** "no change of behaviour", where the values of the memory are shared between the functions of `app.ts` and the acts of `page-game-acts.ts`. If one module worked on a copy of the record instead of the one record, the values would split: the number of the last request, the notice that waits, the entry.

**Check:** two mutations. Each breaks this sharing for a moment by having an act work on `{ ...page.memory }`. I ran the tests on each, then restored the code; a search for `page.memory }` in the committed file finds nothing.

- **Mutation B:** `resetGame` works on a copy, so the notice „gra zaczyna od nowa” and the entry are lost.
  - `npm test -- tests/view/previous-save.test.mjs`: exit 1, 6 cases failed, among them "on 204 the page builds a new game on revision 0 with the sentence above it, and sends no save at once".
  - The tests catch it.
- **Mutation A:** `logOut` works on a copy, so its number of the last request is not the page's.
  - `npm test -- tests/view/account-screen.test.mjs`: exit 0. `npm test -- tests/view/previous-save.test.mjs`: exit 0. No test catches it.
  - What I observed: in the paths these tests take, the check `mine !== latest` of `logOut` is always backed by the check `gameOf(view) === null` beside it. Any request of the page that would increase `latest` during a logout first changes the page away from the game (`waitForServer` / `change`).
  - So the use of `latest` inside `logOut` is a protection no test holds. That gap was there before this slice; the slice keeps the sharing (one record).
  - I did not verify whether some path exists where only `latest` stops a late answer of the logout. That is a guess left open.

## Choices, with the way rejected

1. **One parameter `page` for the functions that need several of its parts; `places` or `memory` alone where a function needs only that** (`leaveGame`, `focusCard`, `waitForServer`, `askingFailed`, `loadFailed`, `onPlace`, `whenNotBusy`, `setLogout`, `takeNotice`).
   - Rejected: separate parameters for places, memory, client and address in every function. Longer signatures, the same coupling.
   - Cost if wrong: only how the signatures read.
2. **The call-backs as a field `calls` of the parameter**, built in `startApp` from closures over the `page` record (`expire: () => expire(page)` and so on).
   - Rejected: `page-game-acts.ts` importing the functions of `app.ts`. That is the cycle the plan forbids.
   - Cost: 9 lines in `startApp`. The arrow functions read `page` before its `const` initialization only lexically; none of them runs before the page has started, the same as `onLogout` and `onRetry` given to `createPagePlaces`.
3. **`PageMemory` stands in `page-places.ts`**, beside `PageState`, the types of what the page shows. **`GameStart` and `signedOut` stand in `page-game-acts.ts`**, which imports nothing of `app.ts`, so `app.ts` imports them from there.
   - Rejected: a fourth module for the shared types. That file is not in the slice's *Change*.
4. **The functions are at module level, not nested in a factory** (D-425, as the plan says).
5. **The guideline sentence on the memory now lists all eight values.** The old sentence listed six: it lacked "whether the game replaces one that lost a conflict" and "the card's focus after a refused link or „Anuluj”".
   - I completed the list in the same sentence I had to change, so the sentence matches the code (To do 7). No other sentence changed beyond those the plan names.
   - Cost if unwanted: one clause to drop.

## Adaptations (section 4)

- Small, as the handoff foretold: `createPagePlaces` takes `root` and the first waiting state, and keeps `focusRetry` to itself; slice 3 changed nothing of that.
- Small: the plan names `setLogout` among the acts; it went to `page-game-acts.ts` as a private function, since only `logOut` calls it.

## Reaches beyond the dispatch

- `scripts/test.py`, function `main`: to learn whether `npm test --` takes more than one file. It does not, so each of the nine ran on its own.
- `tests/quality/eslint-size-rules.mjs` whole: to copy its counting for the measure of the sizes.
- `tests/invariants/test_browser_view_token_values.py:579-587`: a grep showed it names `src/browser/view/app.ts`; it only checks that the file is in the population, which the slice does not change.
- In `foundations/invariants.md`, the entries `account-client-requests`, `account-client-outcomes`, `saved-state-http-exchange`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `catch-up-minutes` and `catch-up-death-moment`. I found them by a search of *Part* `browser-view` and of the words confirmation, reset, address, session, load, as the slice's *Read* asks; none of them is touched by a move with no change of behaviour.

## Working copies

- **Directory:** `.runs/executor-3/`.
- **What it held:**
  - the logs of the test runs (`base-*`, `after-*`, `mutA-*`, `mutB-*`, `final-*`);
  - `typecheck.log`, `foundation.log` and `foundation2.log`;
  - the measuring script `measure.mjs`;
  - the commit message `commit-message.txt`.
- **Removed:** the whole directory, after this report was written. Nothing from it is kept in `reports/`; the results stand above.
- **Not mine to remove:** the build output in `dist/`, written by the product's own build at each test run, and the screenshots: none were made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read in part, as the handoff allows ("where it bears on what you move"):
  - lines 1-12 ("When to read");
  - 325-339 ("A fault of one screen is fixed in its component");
  - 551-646 ("Focus does not fall to the page", "The menu bar stays in sight…", "Menu bar, the menu „Konto” and the list of programs").
  - The rest was not read: the slice moves no drawing of the menu bar or of the login card, and changes nothing that is drawn.
- `src/browser/view/game-view.ts`: read 95-172, as named; nothing else.
- `src/browser/view/account-card.tsx`: read 56-109, as named; nothing else.
- `src/browser/view/screen-address.ts`: not named whole; only the signature of `screenAddress` was read (line 141).
- `guidelines/testing.md`: not read. No test was written, changed or reviewed.

## Searches not found or unclear

- The plan asks that the sentences on `installLastResort` in `guidelines/coding-browser-module.md` "say where the code stands after the slice". Unclear which change was meant: `installLastResort` and `reportLine` stay in `startApp` in `app.ts`, so those sentences were already true. I left them unchanged.
- I found no test that fails when `logOut` stops sharing the number of the last request (mutation A above).
