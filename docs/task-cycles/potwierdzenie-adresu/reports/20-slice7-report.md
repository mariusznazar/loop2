# Slice 7 report — the header row and the confirmation from the link

**Status:** done with concerns (the screenshot of the running product was not made; see "Own-work check").

## Commits (on top of `cd56819`)

- `70002a5` feat: show the unconfirmed-address row in the header and confirm the address from the link in the page
- `e1f769e` test: protect the header row and the confirmation from the link

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/view/email-status.ts` (new) | +117 / 0 |
| `src/browser/view/email-confirmation.ts` (new) | +102 / 0 |
| `src/browser/view/app.ts` | +56 / -6 |
| `src/browser/view/account-screen.ts` | +46 / -12 |
| `src/browser/styles.css` | +36 / 0 |
| `tests/view/email-status.test.mjs` (new) | +309 / 0 |
| `tests/view/email-confirmation.test.mjs` (new) | +163 / 0 |
| `tests/view/account-screen.test.mjs` | +268 / -3 (fakes updated) |

Total of the two commits: 8 files, 1097 insertions, 21 deletions (the cd56819..HEAD diff).

## Checks (command, exit code)

- `npm test -- tests/view/email-status.test.mjs` — 0 (8 passed)
- `npm test -- tests/view/email-confirmation.test.mjs` — 0 (5 passed)
- `npm test -- tests/view/account-screen.test.mjs` — 0 (22 passed)
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0
- `npm test -- tests/invariants/test_browser_view_framework.py` — 0
- `npm test -- tests/quality/test_quality_invariants.py` — 0 (ESLint, Prettier, Ruff, ShellCheck over the changed files)
- `npm run typecheck` — 0 (run before the tests were written)
- Not run: the whole gate (`npm test` without a file), as instructed; `foundation_check.py`.

Test-first: the modules were written before their tests (the behaviour is wiring and DOM). Instead of a failing first run, each test group was seen failing against a deliberate break of the code, restored afterwards (all `npm test -- <file>`, exit 1 with the break, exit 0 after restoring):

- fragment cleared on every answer, and never cleared (`email-confirmation.ts`) — `email-confirmation.test.mjs` failed
- no `button.focus()` after the answer — `email-status.test.mjs` failed
- `dispose()` not invalidating a pending answer — failed
- the failure sentence written in `text-secondary` instead of `warning` — failed
- pending notice never consumed (stays at every later screen) — `account-screen.test.mjs` failed
- pending notice never set — `account-screen.test.mjs` failed

## Own-work check

Requirement most likely not met: "the fragment is removed only on a definitive answer, and the result stands above the first screen the check leads to and leaves at the next change between forms and game" (task To do 4, spec section 2 and 10). Checks written: `confirmFromAddress` against a client the test answers (definitive answers clear once; lost connection and server error keep the fragment) and, in `account-screen.test.mjs`, the page flow (confirmation call before the session call, "Potwierdzanie adresu…" where "Sprawdzanie logowania…" stands, notice first child of `main` above the game and above the forms, gone after logout, kept pending through a failed session check, no `confirmEmail` call without a token or on retry). All pass.

User-interface check (`ui_check.md`): the foundation settles no route for a screenshot of the running product (grep of `foundations/*.md`, `AGENTS.md`, `src/browser/AGENTS.md` for screenshot/zrzut found none). So the states were checked in code and the **screenshot is unchecked, reason: no settled route**; the kitchen-sink page that would show the row waiting and refused is Slice 8's. States of the row read in code against the styleguide "States of shared controls": the button is the shared `createButton` (default, hover, focus-visible, disabled come from the shared rules); loading is `setButtonWaiting(button, "Wysyłanie…")`, disabled in `text-disabled`; focus returns to the button after the answer; error and empty do not apply to a button. Sentence roles: `text-secondary` (unconfirmed, sent), `warning` (limited, failed, client failure); notice `positive` / `warning`. Styles read `var(--…)` only (token-values test passes). Rendered appearance (line break of the row under the title, wrapping at narrow widths) is NOT shown by reading code and was not seen.

## Reaches beyond the dispatch

None beyond the files the dispatch named; I also read `tests/view/account-screen.test.mjs`, `src/browser/styles.css`, `src/browser/tokens.css` (token names only) and `src/browser/view/status-row.ts` (head, as exemplar) because they are files I changed or follow.

## Choices (with the way rejected and the cost if wrong)

1. **`startApp` gets a third parameter `address: PageAddress = browserAddress()`** (reads `location.hash`, clears with `history.replaceState(null, "", pathname + search)`; outside a browser it reports no fragment). Rejected: reading the global `location` inside `app.ts` — Node tests have none. Cost if wrong: one extra optional parameter; `main.ts` is unchanged.
2. **Whatever follows `#confirm-email=` is the token as it stands, even empty or malformed**; it is sent and the server's `invalid-link` refusal gives the "Odnośnik jest nieważny albo wygasł." sentence and clears the fragment. Rejected: treating an empty/odd token as "no token" (silent page for a truncated link). Cost if wrong: one pointless request for a truncated link. A fragment not starting with `#confirm-email=` is ignored (no request, untouched).
3. **Definitive answer = 204 or a refusal with code `invalid-link`.** Any other failure (no connection, 5xx, 4xx without that code, unexpected) is not definitive: fragment kept, the client's message shown in `warning`. Cost if wrong: a link whose request is refused by a transport guard (`invalid-request`) keeps its fragment and a reload retries it.
4. **The signed-in callback of the account screen is now `signedIn(account, message)`** with `message` null after sign-in, the registration's `confirmationMessage` after registration; the account is copied to the three fields. Rejected: passing the registered object whole.
5. **Header row:** `div.email-status` appended to `header` by `showGame`, removed by `dispose()` (called by `showForms` and by the next `showGame`); hidden by the module itself when `account.emailConfirmed`. The sentence is `<p aria-live="polite">`; the warning look is the class `warning` on it. The notice is `<p class="confirmation-notice positive|warning">` with `role` `status` or `alert`.
6. **Notice placement:** `pendingNotice` is consumed by the first `showGame`/`showForms` after the check, so it is first in `main`, above the game or the forms; during a failed session check (warning with retry) it stays pending and shows once a retry passes.
7. **"Only the last request's answer acts"**: implemented with the next-number counter, but the disabled button already allows one send at a time, so the only way an older answer can arrive is after `dispose()`; the test covers that case.

## Problems / notes

- `tests/view/account-screen.test.mjs`: fake accounts now carry `emailConfirmed: true` (ACCOUNT) and a new `UNCONFIRMED_ACCOUNT`; `heldClient` gained `confirmEmail` and `sendConfirmationMessage`; `startPage` takes an optional fake address. `clock.test.mjs` untouched (it does not read the field).
- `guidelines/coding-browser-module.md` lists the files of the kind in a table; the two new modules are not in it. Not in this slice's *Change*; Slice 8 or the foundation owner may want to add them as `copy`.
- The two new test files each carry a small hand-made document model (as `account-screen.test.mjs` does) instead of a shared helper, because a shared helper file was outside the slice's *Change* list.
- Prettier reformatted `app.ts` and `account-screen.ts` once; no suppressions added.
