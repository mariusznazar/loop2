# Slice 5 report — The game saver

- **Status:** done with concerns
- **Branch / base:** `task/zapis-stanu-na-serwerze`, base `adb13fb`
- **Commit:** `6aae1e7` feat: :sparkles: add the game saver: one save request at a time, coalesced moments, the 30-second and hidden-page checks, retries and the save before logout

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/game-saver.ts` (new, kind `browser-module`) | 233 | 0 |
| `tests/view/game-saver.test.mjs` (new, unit test on a hand-made document model) | 579 | 0 |

## What the saver offers

`createGameSaver(options)` with `options`: `client` (`Pick<AccountClient, "saveGame">`), `read`
(the current state; the page flushes the clock first), `state` and `revision` (held as already
saved), `afterConflict?` (the conflict sentence stands from the start), `onConflict`, `onOutdated`,
`onSignedOut`. It returns `element` (the header sentence, a `createFormWarning()` paragraph —
class `form-warning`, `role="alert"`, hidden while empty), `moment()`, `check()`,
`saveBeforeLogout(): Promise<LogoutSave>`, `revision()`, `dispose()`. `LogoutSave.kind` is one of
`saved | conflict | too-large | outdated | signed-out | failed`; logout goes on for all but `failed`.

The saver owns its 30 s `setInterval` and its `visibilitychange` listener on `document` (both gone at
`dispose()`), so Slice 6 only calls `moment()` and places `element` in the header slot. Each request
is `{ ...savedGame(state), basedOn: revision }` through the client's `saveGame`, which measures the
body and sends with `keepalive` (Slice 4); the saver does not bypass it.

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/game-saver.test.mjs` with only the first case and a stub module (the case "a moment during a request in flight sends once more, after the answer, with the state of that time", written first) | 1 — `AssertionError: 0 !== 1` at the first send count, the expected reason |
| `npm test -- tests/view/game-saver.test.mjs` after the module (1 case) | 0 |
| `npm test -- tests/view/game-saver.test.mjs` with all cases, first run | 1 — the retry-rhythm case: `no retry before 20000 ms, 4 !== 3`; cause verified: the test changed the state at the start of each wait, so the 30-second check at 30 000 ms found a changed state and sent — correct behaviour per D-185 ("at once at a moment of saving of D-184"); the test now changes the state in the wait's last millisecond |
| `npm test -- tests/view/game-saver.test.mjs` (14 cases) | 0 |
| `npm test -- tests/view/game-saver.test.mjs` (final, 16 cases) | 0 |
| `npx eslint --max-warnings 0 src/browser/view/game-saver.ts tests/view/game-saver.test.mjs`, first run | 1 — `@typescript-eslint/unbound-method` on destructuring the method `read` from the options; fixed by declaring `read` as a function property |
| same, after the fix | 0 |
| `npx prettier --check src/browser/view/game-saver.ts tests/view/game-saver.test.mjs` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 (6 tests) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests) |
| Mutation: the resets `failures = 0; logoutFailed = false;` removed from the saved branch, `npm test -- tests/view/game-saver.test.mjs` | 1 — two cases fail ("a moment while a retry waits…", "a failed save before logout…"); code restored, the run after restore exit 0 |

Not run: `npm test` with no argument and `foundation_check.py` — the cycle's gate, not a slice's
check (handoff). No invariant test was written or changed in this slice.

## Own-work check

- **Requirement most likely not met:** the coalescing rule for answers other than `saved` — "a
  moment during a request in flight sends once more … when the answer comes" for a failed answer
  (must send at once, not wait the retry's 5 s), and the save before logout when the request it
  waits for fails (the logout's own save must still go and be the one reported, with no retry of
  the earlier failure left behind).
- **Check:** two cases added — "a moment during a request that then fails sends once more at once
  after the answer, not after the retry's wait" and "before logout a request in flight that fails is
  followed by the logout's own save, and only that one is reported".
- **Showed:** both pass (`npm test -- tests/view/game-saver.test.mjs`, exit 0).
- **UI check (`ui_check.md`):** the slice builds the header sentence's element but places it on no
  screen; Slice 6 puts it in the header slot. States checked in code: hidden when empty, the
  `form-warning` class (`warning` role) the plan's Choices name. Screenshot unchecked: nothing on a
  screen changes in this slice.

## Reaches beyond the dispatch

- `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md:400-433` (Slice 6) and `:670-685` (Choices) —
  searched for "saver" to learn what the page expects of it: that `createGameView` creates and
  disposes the saver and calls moments (so the saver must own the interval and the
  `visibilitychange` listener, the page sets up neither), and that "the header save sentence is the
  existing form warning in `warning`" (so the element is `createFormWarning()`).
- `src/browser/sim/game.ts` exports list (grep `^export function`) — for the acts the tests use
  (`setPace`, `setPaused`, `send`, `createCharacter`).
- `scripts/test.py:11` — confirms `tests/view/*.test.mjs` is in the full gate.

## Searches not found or unclear

- Whether the 30-second check during a request in flight should be remembered and sent after the
  answer: the plan and spec settle it only for the hiding check ("sends nothing more"). Chosen:
  every check during a request sends nothing (see Choices).
- What a saver already ended by a conflict or a missing session answers before logout: unsettled;
  chosen to report the ending kind without sending.
- What `saveBeforeLogout()` on a disposed saver answers: unsettled; chosen `failed`, no request.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The saver owns the 30 s interval and the `visibilitychange` listener; `check()` stays public | the page runs them and calls `check()` | Slice 6 must not add a second interval or listener, or a hidden page sends two saves |
| The header sentence is an element the saver builds with `createFormWarning()` and Slice 6 places | a sentence getter plus a change callback to the page | the page cannot restyle it without a rule for `.form-warning` in the header (Slice 6 may add one) |
| The conflict sentence is a boolean `afterConflict` with the text inside the saver | the page passing the sentence text | none known; all header sentences of saving stay in one module |
| One kind `outdated` for both the outdated answer to the logout's save and a saver already stopped as outdated | a separate `stopped` kind | the page does the same for both (D-97); a reader of the plan's "reports so" may expect a distinct kind |
| While a save before logout waits, conflict, outdated and signed-out go only to its promise, not to the page's callbacks | calling the callbacks as well | the page must act on the report alone; calling both would start a reload or the expiry path in the middle of logout |
| After a logout save that lets logout go on, a moment made meanwhile is dropped | sending it after the answer | a save racing the page's `POST /api/logout` would get 401 and start the expiry path; if logout then fails, the next 30 s check still finds the changed state |
| A check (30 s or hiding) during a request in flight sends nothing and leaves no mark | marking it like a moment | during a map run the next 30 s check sends; the hiding gap is the accepted "bez gwarancji" |
| A check that finds a changed state while a retry waits sends at once and cancels the wait | waiting for the retry | D-185 says "at once at a moment of saving of D-184", whose moments include the 30 s rhythm and the hidden page |
| The run of failures that chooses the retry wait goes on across a moment that also fails, and ends at a success or a too-large answer | restarting at 5 s on each moment | a moment during a long outage waits the next step instead of 5 s |
| After a failed save before logout, later failures keep „…Spróbuj wylogować się ponownie.” until a save succeeds or is refused as too large | switching back to „…Gra spróbuje ponownie.” at the next failure | the plan says "the retries going on silently"; a reader may expect the ordinary sentence back after an ordinary moment fails |
| Conflict and signed-out also stop the saver's sending (until the page disposes it) | sending on until dispose | none known; a send after a conflict would be based on a stale revision and conflict again |

No adaptation of the plan to the code was needed; no invariant test changed.

## Concerns

- **A save racing logout (for Slice 6):** after `saveBeforeLogout()` reports a kind for which logout
  goes on, the saver keeps its 30 s check until the page disposes it. If that check fires during the
  page's `POST /api/logout` with a changed state (a passing map run), its save may reach the server
  after the session is gone, get 401 and call `onSignedOut`, so the expiry path could start while
  the logout completes. Observed in reading, not in a test; the window is the logout request's
  duration. Slice 6 can close it by disposing the saver, or by ignoring `onSignedOut` while its
  logout is under way.
- The `browser-module` table in `guidelines/coding-browser-module.md` does not list the new file;
  the plan's Choices leave it so on purpose.
