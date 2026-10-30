# Slice 6 report — the page builds the game from the saved game state

- **Status:** done with concerns
- **Base:** `6aae1e7` · **Commit:** `e27ba5f` (task branch `task/zapis-stanu-na-serwerze`)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/app.ts` | 229 | 42 |
| `src/browser/view/game-view.ts` | 103 | 24 |
| `src/browser/view/program-panel.ts` (outside the slice's *Change*, see Adaptations) | 8 | 3 |
| `src/browser/styles.css` | 18 | 0 |
| `tests/view/account-screen.test.mjs` | 654 | 9 |
| `tests/view/program-panel.test.mjs` (outside the slice's *Change*, see Adaptations) | 11 | 0 |

## What the slice does

- `createGameView(options)` takes `client`, `state`, `revision`, `afterConflict` and the page's
  callbacks `onConflict`, `onOutdated`, `onSignedOut`; it creates the saver of Slice 5 (its `read`
  flushes the clock first) and disposes it with the game. Every act of decision 6's list goes through
  `act()`, which calls a moment only when the result changed the state; sending compares the state
  before and after `clock.send`. `store.apply` calls a moment when a result takes a map run that had
  not ended to one ended in a death or a completion. It returns `saveLine` (the saver's element),
  `saveNow()`, `saveBeforeLogout()`, `keep()` (the current state as `savedGame(...)` with the saver's
  last revision, the clock flushed first) and `dispose()`, which also removes the save line.
- `startApp`: after `GET /api/account` names an account, or a form signs in, the page keeps the
  waiting screen „Sprawdzanie logowania…” and asks `GET /api/saved-game`; `null` builds `newGame()`
  at revision 0, a save goes through `loadSavedGame` with the save's revision; a failure shows the
  client's sentence and „Spróbuj ponownie”, which runs the session check again (both requests); 401
  shows the forms. `loadGame` takes a request number like the session check.
- A refused load builds a new game, puts `p.page-notice` with the sentence of its reason above it
  (after a confirmation notice where one stands) and calls `saveNow()`, so the save is based on the
  server's revision.
- Conflict: the game and the address row are disposed, „Wyloguj” hidden, the waiting screen shown and
  the save asked for again; a game built from it gets `afterConflict` (the saver shows its sentence);
  a refused load on that path takes the refused-load path without the conflict sentence.
- 401 on a save: `kept = { ...game.keep(), accountId }` in a variable of `startApp`, the forms with
  „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” as `p.page-notice` above them. A sign-in
  whose `id` equals `accountId` skips the request, builds from the kept document through
  `loadSavedGame` with the kept revision and calls `saveNow()`; any sign-in drops the kept state.
- „Wyloguj”: `saveBeforeLogout()` → `failed`: no logout, the button back and focused, the saver's
  line „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; `signed-out`: the expiry path;
  `saved`, `conflict`, `too-large`, `outdated` (also a saver already stopped as outdated, which sends
  nothing): `POST /api/logout`; confirmed or 401 → forms, with „Gra została zaktualizowana. Odśwież
  stronę.” above them after `outdated`.
- `styles.css`: `header .save-line` (its own line under the title and „Wyloguj”, above the D-157
  row; `header` raises it over the later `.form-warning { margin: 0 }`), and `.page-notice`
  (`warning`, margin under it) for the refused-load sentence and the sentence above the forms.

## The concern of Slice 5 and its unsettled points — closed

- **Check during `POST /api/logout`:** while the logout's request is in flight the page sets
  `loggingOut`, and `onConflict` / `onSignedOut` are held in `deferred` instead of acting. A confirmed
  (or 401) logout drops the held action — the player asked to leave and the save before logout
  already had its outcome; an uncertain logout runs it then (the expiry path, or the conflict path).
  Test: „a save that finds no session while the logout's request is under way waits for its answer:
  a logout ends it, an uncertain one then takes the expiry path”.
- **A saver already ended by a conflict or a missing session, before logout:** in the page such a
  saver cannot be asked — its callback has already dropped the game (`game === null`, so „Wyloguj”
  is hidden and its handler returns). For the only way left, the outcomes reported by
  `saveBeforeLogout()` itself, the page follows To do 10 and spec decision 8 by kind: `conflict` →
  logout goes on (and, when the logout is uncertain, the game left behind the server's save goes the
  conflict path, since its saver has halted); `signed-out` → the expiry path, the state kept for the
  same account.
- **Every check during a request in flight sends nothing:** left as Slice 5 made it; the page adds
  nothing there.

## Checks

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/view/account-screen.test.mjs` | 1 | first run, the two `expired-session-unsaved-progress` cases written first, before the code: both fail at `no loadSavedGame call is waiting` (the page did not ask for the save); the 22 old cases passed with the harness changes alone |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | after the code, 34 pass (final run after Prettier) |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 22 pass |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 | |
| `npm test -- tests/view/email-status.test.mjs` | 0 | |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 | first run: Prettier flagged `src/browser/view/game-view.ts` and `tests/view/account-screen.test.mjs`; formatted with the repository's Prettier (`--write --no-config --no-editorconfig`) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | after formatting |

Not run: `npm test` with no argument (the cycle's gate) and `python -B .the-way/elements/common/foundation_check.py` — neither is a focused check of this slice.

Mutations applied one at a time to the worktree and restored (script in the session scratchpad),
each run with `npm test -- <file>`, every one exit 1, failing the case named:

| Mutation | Failing case |
|---|---|
| no deferral during logout | the logout-under-way case |
| kept state built without `saveNow()` | the 401 invariant case, the „Wyloguj” outcomes case, the logout-under-way case |
| kept state used for any account | the other-account invariant case |
| refused load not saved at once | the refused-save case, the conflict case |
| no moment at a map run's end | the death case |
| failed save before logout goes on | the „Wyloguj” outcomes case |
| no update sentence after `outdated` | the „Wyloguj” outcomes case, the stopped-tab case |
| conflict flag dropped | the conflict case |
| `shape` read as another version | the refused-save case |
| the panel's first state with a map run shows a saved program | `program-panel.test.mjs`: „a panel whose first state holds a map run shows the copy, as after a load” (this is also that test's failing run) |

## Tests

New cases in `tests/view/account-screen.test.mjs`, under „the saved game state”: the two marked
`// invariant: expired-session-unsaved-progress` (the 401 keeps the state and the same account's
sign-in sends it on the kept revision and returns paused to its map run; another account's sign-in
asks its own save, saves nothing, and the first account then asks its own save too), the waiting
screen until the save answers and an untouched new game saving nothing after 30 s, a loaded map run
going on (paused, at 8×) and one ended in a death (on its screen with „Restart” and „Zakończ”), a
failed or uncertain load and its retry of both requests and a 401 to the forms, a refused save for
each reason with the order confirmation notice → refusal → game and the immediate save on revision
7, the failed save's line between „Wyloguj” and the address row and its retry after 5 s clearing it,
the conflict path and its refused-load variant, „Wyloguj” for every outcome of its save, the tab
stopped as outdated, the death saved at once (the case sets `performance.now` by hand), the save
during the logout's request.

Changed existing cases, each only where the new request changes what they wait for: an answer of
`loadSavedGame` after every named account, a `saveGame` answer before every `logout` answer. The
expectation `intervals.size === 1` became `GAME_INTERVALS` (2): the saver's 30-second check is an
interval of the game beside its clock (D-184); the cases still prove one game's intervals at most
and none after logout. The harness gained `document.addEventListener`/`removeEventListener` and
`visibilityState` (the saver listens to `visibilitychange`), mocked `setTimeout` (the saver's
retries), and `loadSavedGame` and `saveGame` on the held client.

## Own-work check (WAY-164)

- **Requirement most likely missed:** nothing of the kept state reaches the browser's lasting
  storage (To do 9, D-188) — a test cannot see every store, so I checked the code: Grep for
  `localStorage|sessionStorage|indexedDB|caches\.|document\.cookie` in `src/browser/` found nothing;
  the positive control `visibilitychange|keepalive` in the same folder found
  `src/browser/view/game-saver.ts` and `src/browser/account-api.ts`. The kept document lives only in
  the variable `kept` of `startApp`.
- **Second:** a form sign-in also keeps „Sprawdzanie logowania…” until the save answers — added to
  the other-account case (forms gone, the waiting text shown); it passes.
- **Screens (ui_check.md):** the foundation settles no route for a screenshot of the running
  product (Grep for `screenshot|zrzut` in `foundations/` found none), so the screenshot is
  unchecked for that reason. States checked in code: the save line is the saver's `p.form-warning`
  in `warning`, hidden while empty by the `[hidden]` rule, on its own line by `header .save-line`
  (`flex-basis: 100%`) between „Wyloguj” and the address row (asserted in the failed-save case); the
  sentences above a screen are `p.page-notice` in `warning`, role `alert`. No colour, length or font
  outside tokens (token-values check passes), no `outline` (focus-outline check passes). No shared
  control or role is added, so the kitchen-sink page is not changed (left to maker in the spec).

## Reaches beyond the dispatch

- `src/browser/view/program-panel.ts` and `tests/view/program-panel.test.mjs`: read to see why a
  loaded map run would show its copy; changed (Adaptations).
- `src/browser/view/status-row.ts:170-212` and `src/browser/sim/game.ts:350-420` (`setPaused`,
  `setPace`, `passRealTime`): for the labels „Wznów”, `4×` and what pace and pause change, to write
  expectations by hand.
- `src/browser/sim/saved-game.ts:870-899` (`loadSavedGame`): that it takes the server's `save` with
  its `revision` key and the kept `{ version, game }` document alike.
- `tests/view/game-saver.test.mjs:1-230`: its harness and fixtures, followed for `passing()`.
- `.the-way/task-cycle/change/slice.md` and `ui_check.md`, as the method names them.

## Adaptations (section 4)

- **The panel's first state with a map run shows the copy** (`program-panel.ts`, `nextShown`: a
  first state — `previous === null` — holding a map run shows the copy, as a map run started does).
  Without it a game built on a loaded map run showed program 1 in the editor, not the copy, so the
  player would edit the saved program; D-189 and the spec (section 5) say the ended run comes back
  „with … the copy open to editing”, and To do 6 says the player „dalej edytuje” the copy. The file
  is outside the slice's *Change*; I judged it small (one condition, one test) rather than
  structural. If the cycle prefers it in its own slice, the commit splits cleanly by file.

## Choices made

- Retry after a failed load runs the session check again (both requests), as the plan says; a
  registration's message outcome and the conflict flag wait in page variables until a game is built,
  so a retry keeps them. Rejected: retrying the save request alone — against the plan's „repeating
  both”. Cost if wrong: one `GET /api/account` more per retry.
- On the conflict path the address row is disposed with the game and rebuilt with the new game
  (starting from „Adres e-mail niepotwierdzony.”), and „Wyloguj” is hidden on the waiting screen.
  Rejected: keeping the row through the reload — a row above a waiting screen with no game. Cost if
  wrong: the sentence of an earlier „Wyślij ponownie” goes at a conflict.
- An uncertain logout after a `conflict` outcome sends the game down the conflict path, since its
  saver has halted and would never save again. Rejected: leaving that game on screen — a game that
  silently stops saving.
- Held saver outcomes during the logout's request are dropped when the logout is confirmed.
  Rejected: taking the expiry path after a confirmed logout — the player asked to leave, and the
  kept state would wait in the tab, which D-97 rejects for a logout.
- `onOutdated` does nothing in the page: the saver shows its sentence and stops; „Wyloguj” learns it
  from `saveBeforeLogout()`.
- The class `page-notice` for both the refused-load sentence and the sentence above the forms
  (spec: the class of the one-time notice is left to the maker).
- The header save line gets its class `save-line` from the page that places it.

## Searches not found or unclear

- No route in the foundation for a screenshot of the running product (see the own-work check).
- `guidelines/coding-browser-module.md`, example „Gra na stronie i odpowiedzi serwera”, says
  `createGameView` „zwraca element gry i `dispose()`” and that the page builds the game once the
  server confirms the account; both now say less than the code (the view also returns the save line
  and the save methods; the page waits for the saved game state too). Not changed here — a guideline
  change goes through `the-way-maintain-coding-guidelines`; a matter for the orchestrator.
- The plan's „the request numbering covers the new request”: `loadGame` takes a number like the
  session check, and the kept-state path bumps it; no case makes a load answer stale, since nothing
  on the page can start another request while the waiting screen stands — left to review.
- Decision 6's list is wired act by act in `game-view.ts`; the cases exercise pace, pause/resume and
  the end of a map run, not each program-panel and headquarters act — those pass through `act()`
  unchanged, left to review.

## Problems observed

- The first attempt at the test edits through a Bash heredoc failed in the shell (`unexpected EOF
  while looking for matching`) before touching any file; the edits were then made with the Edit tool
  and a script file. No effect on the result.
