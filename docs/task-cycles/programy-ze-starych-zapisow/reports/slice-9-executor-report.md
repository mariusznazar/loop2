# Slice 9 — executor report

**Status:** done

**Commit:** `7adcc0bb` (base `8cac0a43`) — `feat: :sparkles: send the confirmed reset from the page, holding the old saver's outcomes and locking „Wyloguj” while it waits, and build a new game on revision 0 after 204`

## Files changed (added / removed lines)

- `src/browser/view/app.ts` — 86 / 8
- `src/browser/view/menu-bar.tsx` — 15 / 4
- `tests/view/previous-save.test.mjs` — 324 / 2
- `tests/view/menu-bar.test.mjs` — 44 / 1

## What the change does

`app.ts`:

- `showGame` gives the game `onReset` only for an account whose answer says `previousSaveAllowed` (conditional spread, so no `onReset` key otherwise).
- `resetGame()`: sets `resetting`, redraws the bar, sends `client.resetSavedGame()` with no save of its own before it.
- While `resetting`, `whenNotBusy` (the former `whenNotLoggingOut`, renamed) stores the old saver's conflict or signed-out outcome in `heldByReset`. It does not touch the logout's `deferred` slot.
- On 204 the held outcome is dropped, `pendingNotice` is set to the new sentence in `positive`, `entry = "address"`, and the page builds the new game with `showGame(owner, { state: newGame(), revision: 0, refused: null }, false)`. That is no save at once, and the old game and its saver are disposed by `dropGame`.
- On 401 it calls `expire()` (D-211).
- On a refusal 403 `previous-save-forbidden` it shows `RESET_NOT_ALLOWED` beside the control. On any other failure it shows `RESET_FAILED`. The game stays and the control is at rest through `view.setReset`.
- After a failure the held outcome is released through `whenNotBusy` again, so it defers behind a logout if one is under way.
- `dropGame` clears `resetting` and `heldByReset`.
- `logOut()` has a guard on `resetting`.
- The bar gets `logout.unavailable = resetting`.
- The sentence of 204 is `GAME_STARTS_ANEW` = „Gra zaczyna się od nowa, a poprzednia czeka jako poprzedni zapis.”, a constant in `app.ts` with the page's other notices. It is shown through the existing confirmation-notice element in `positive`, as „Hasło zmienione.” is. The header comment of `startApp` has a paragraph on the reset.

`menu-bar.tsx`:

- `MenuBarProps.logout` gets `unavailable: boolean`.
- „Wyloguj” gets `disabled={logout.unavailable}`, which is the existing `disabled` prop of `ReactButton` (text kept). Its waiting text stays „Wylogowywanie…” for `logout.waiting` alone. Its `onClick` also checks `unavailable`.

## Checks (command and exit code)

Failing first, before the code:

- `npm test -- tests/view/previous-save.test.mjs` → exit 1; 13 of 40 failed (the new cases), for the expected reasons: the control does not stand for the privileged account, so „what the case presses stands”. Two failures were mistakes of my tests (program names `Program 1` against the real `Program`, and a default parameter that turned `allowed: undefined` into `true`); both were fixed in the tests before the code and the cases then failed for the right reason.
- `npm test -- tests/view/menu-bar.test.mjs` → exit 1; 1 failed, the new case, `expected true, got false` on `disabled`.

After the code:

- `npm test -- tests/view/previous-save.test.mjs` → exit 0, 41 pass (the 41st, the logout and reset together, was added at the end and run alone).
- `npm test -- tests/view/menu-bar.test.mjs` → exit 0, 29 pass.
- `npm test -- tests/view/account-screen.test.mjs` → exit 0, 131 pass.
- `npm test -- tests/view/uncaught-failure.test.mjs` → exit 0, 17 pass.
- `npm test -- tests/view/game-saver.test.mjs` → exit 0, 20 pass.
- `npm run typecheck` → exit 0.
- `npx eslint` on the 4 changed files → exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` (formatter invariant) → exit 0, run twice, the second time after the last test was added.
- Not run, as instructed: `npm test` without a file, `foundation_check.py`.

## Mutations (each made on `app.ts` or `menu-bar.tsx`, tests run, source restored and confirmed with `cmp` against the saved copy)

| Mutation | Command | Exit | Failed |
|---|---|---|---|
| `view.saveNow()` before the reset | `npm test -- tests/view/previous-save.test.mjs` | 1 | the order-of-calls case and the 204 case (2) |
| no hold of the old saver's outcomes (`if (false) heldByReset`) | same | 1 | the 4 held-outcome cases |
| `unavailable: false` in `drawBar` | same | 1 | the Wyloguj case |
| new game on `revision: 1` | same | 1 | the 204 case (the first save has `basedOn` 1) |
| `saveAtOnce` true after the reset | same | 1 | the 204 case |
| held outcome not released after a failure | same | 1 | 2 held-outcome cases |
| 403 not mapped to `RESET_NOT_ALLOWED` | same | 1 | the 403 case |
| 401 not handled | same | 1 | the no-session case |
| `disabled` removed from the bar | `npm test -- tests/view/menu-bar.test.mjs` | 1 | the new bar case |

Two mutations survived, and I judge both equivalent:

- The unguarded click in the bar (`onClick` without `!logout.unavailable`) survives because a disabled button receives no click. The guard in the bar's `onClick` and the guard in the page's `logOut()` are defence in depth, with no test that reaches them separately.
- A held outcome run twice survives because the second run finds `account === null`.

## Own-work check

Requirement my work most likely does not meet: "nothing stops a reset while a logout waits; the logout's own continuation covers it" (spec, decisions after the review), and „Wyloguj” not pressable while the reset waits.

Check: the last test of the file. A logout waits on its save, the reset is confirmed, then the save is answered, then the logout, and then the reset's late 204. The reset is sent. The logout's answer brings the forms. The late 204 builds no game and no sentence. Exit 0 (above).

Real browser, `loop2-play` (`npm run local`, made-up account `agent@example.test`, privilege granted by `node dist/server/account-previous-save.js grant` on the local database):

- **No previous save yet.** The privileged account's Programy shows „Zacznij od zera” and no pull button.
- **Confirmed reset.** Two programs, press „Zacznij od zera”, then „Tak, zacznij od zera”. The page showed one program („Program”). Above it, in green, stood „Gra zaczyna się od nowa, a poprzednia czeka jako poprzedni zapis.”. The address stayed `#/programy`. The pull button now stood.
- **Pull (task point 5).** Pressing „Wciągnij programy z poprzedniego zapisu” gave „Program (2)” and „Program 2” and the line „Wciągnięto 2 programy.”. After a reload the three programs were still there, so the new game's first save, based on 0, was accepted.
- **Waiting state.** With the reset request delayed 4 s by a Playwright route, „Zacznij od zera” stood disabled, and in the open „Konto” menu „Wyloguj” stood disabled with its text unchanged. After the delay the page showed the new game and the sentence.
- **Console.** `playwright-cli console error` showed 0 errors.
- **Screenshots**, in the public repository `mariusznazar/screenshots`, commit `6a0117842da4ced77db7e0b8bbfcfb42ccecc1d7` (branch `loop2/programy-ze-starych-zapisow`; I looked at both before the push; only the made-up account shows):
  - ![after the reset: the new game with the sentence above it and the pull button](https://github.com/mariusznazar/screenshots/blob/6a0117842da4ced77db7e0b8bbfcfb42ccecc1d7/loop2/programy-ze-starych-zapisow/slice-9-after-reset.png?raw=true)
  - ![the reset waits: „Zacznij od zera” and „Wyloguj” disabled](https://github.com/mariusznazar/screenshots/blob/6a0117842da4ced77db7e0b8bbfcfb42ccecc1d7/loop2/programy-ze-starych-zapisow/slice-9-reset-waiting.png?raw=true)
- **Cleanup.** The local start was stopped, the browser closed, and `.playwright-cli/` and `.runs/screenshots/` deleted.
- **Not checked in a real browser:** focus after the wait, hover and focus-ring looks, and the 401 and 403 paths, which only the jsdom cases show.
- **States of the shared controls** (styleguide, States of shared controls): „Wyloguj” disabled uses the existing disabled look of `ReactButton`, tekst w `text-disabled`, and was seen in the screenshot. The sentence of 204 uses the existing `confirmation-notice` in `positive`, like „Hasło zmienione.”.

## Choices made

- **Role of the sentence of 204: `positive`**, via `pendingNotice` and `createConfirmationNotice`. The other way considered was `createPageNotice` in `warning`, as `REFUSED_LOAD` is. I rejected it because nothing is lost or unsaved; the previous game waits. Cost if wrong: only the colour of one sentence.
- **First screen after the reset: `entry = "address"`**, so the player stays on the screen the address names (Programy), as after a conflict. The other way was `"sign-in"`, which goes to Siedziba. Cost if wrong: the player lands on another screen; the sentence still stands above it.
- **403 is read as „no privilege” only with the code `previous-save-forbidden`**, as the pull does. A 403 without the code (for instance a refused Origin) gets `RESET_FAILED`. The spec says „on 403”. Cost if wrong: a 403 without the code shows the other, also true, sentence.
- **`whenNotLoggingOut` renamed `whenNotBusy`**, with a second slot, `heldByReset`, beside the logout's `deferred`. The other way was one shared slot. Cost if wrong: none seen; with two slots a held outcome released after a failed reset goes through `whenNotBusy` again and defers behind a logout still under way.
- **The sentence of 204 lives in `app.ts`**, not in `previous-save-lines.ts`, with the page's other notices (`EXPIRED`, `PASSWORD_CHANGED`). The two failure sentences stay where slice 8 put them, in `previous-save-lines.ts`, so the page's reset sentences are split over two files. `previous-save-lines.ts` is not in the slice's *Change* list, so I left it alone.
- **`logout.unavailable` is a required field**, so `NAME_ALONE` and the two test fixtures name it.

## Observations (no change made)

- **A logout confirmed while a reset waits.** If the reset's 204 arrives while the logout is still waiting for its save, `dropGame` has already replaced the game; the logout's continuation returns at its first check (`game !== view`), and the old saver is disposed, so that logout's promise never resolves and the page shows the new game with the menu closed. The player presses „Wyloguj” again. It is the case „nothing stops a reset while a logout waits” (spec); the test shows only the order logout save → logout answer → reset answer.
- **A logout whose own request failed uncertainly, after a reset that succeeded in between.** `save.kind === "conflict"` would call `reloadAfterConflict()` for the new game. I judged it too narrow to guard (it needs a conflict from the old game's logout save and a successful reset together) and the spec says no change. It is not covered by a test.
- **Plan and code.** `game-view.ts` takes `client: Pick<AccountClient, "saveGame" | "loadPreviousSavedGame">`, so the page passes the whole client. No mismatch.

## Reach beyond the dispatch

None that changed what the work means. I read `src/browser/view/email-confirmation.ts` (`createConfirmationNotice`, `ConfirmationNotice`), `src/browser/view/controls/react-button.tsx` (`disabled` prop) and `src/browser/view/program-list.tsx` (names of the elements the tests read), because the slice's wiring and tests touch them. I also read `src/server/account-previous-save.ts` for the grant command used in the browser check, and `package.json` for the commands.

## Unread material

- `foundations/decisions.md` D-44, D-96, D-97, D-207, D-208, D-210 and `foundations/part_map.md` `browser-view`: I did not read them whole. I read D-209, D-211 and D-396, and `foundations/glossary.md` „previous save” (as the dispatch gives them), plus the styleguide's States of shared controls and Menu bar rules, which cite D-44, D-97 and D-208.
- `guidelines/styleguide-browser-view.md` lines 660–979 (the scene and later rules): not read; the grep for „Zacznij od zera”, „D-396” and „Wciągnij” showed only line 252.
- `tests/view/account-screen.test.mjs`: read lines 1–140 and 285–435 as named, and the part around 2425; the rest was not needed.
- `src/browser/view/game-view.ts`: read lines 90–300, 840–1100 and 1240–1300. The rest (the screens) was not needed.

## Searches not found or unclear

- None unfound.
- The spec says „on 403 one sentence that the account has no such privilege now” without the code; I read it as 403 with `previous-save-forbidden` (see Choices).
- The spec's „one sentence above it” does not name a role; I chose `positive` (see Choices).
