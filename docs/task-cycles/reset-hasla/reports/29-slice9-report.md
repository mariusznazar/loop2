# Report — Slice 9, task `reset-hasla`

**Status:** done

## Files and commits

- `src/browser/view/password-reset.ts` (new): `readResetToken`, `resetOutcome`, `createResetScreen`.
- `src/browser/view/app.ts`: `showReset` and a branch at the start of `start()` before the confirmation branch; doc comment updated.
- `tests/view/password-reset.test.mjs` (new): unit cases of `readResetToken` and `resetOutcome`.
- `tests/view/account-screen.test.mjs`: `setPassword` in `heldClient`; seven page cases.
- `src/browser/styles.css`: unchanged. The screen reuses `.account-screen`, `.account-form` and `.account-form-switch`, so no new rule was needed.
- Commit: see `git log` on `task/reset-hasla` (one commit, `feat: :sparkles: ...`).

## Checks (command, exit code)

- `npm test -- tests/view/password-reset.test.mjs` 0 (2 pass)
- `npm test -- tests/view/account-screen.test.mjs` 0 (51 pass)
- `npm test -- tests/view/email-confirmation.test.mjs` 0 (5 pass)
- `npm test -- tests/invariants/test_browser_view_token_values.py` 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` 0
- `npm run typecheck` 0
- `npm test -- tests/quality/test_quality_invariants.py` 0
- Not run: the full gate (the orchestrator's).
- No invariant test of mine was written or changed, so no failing-then-passing invariant run applies.

## Own-work check

Requirement most likely unmet: "the fragment goes first, then the page goes on", for every ending. Check: the page cases use an address whose `clearFragment` records whether the reset form still stands alone in the page at that moment. Mutation: swapped the two lines in `end()` and 3 cases failed (changed, refused, cancelled), restored. Other mutations seen failing: `cancel.disabled = locked` removed (waiting case fails); the rules check's early return removed (problem case fails). All restored before commit.

Page cases, one per state: the form with no request, no game, no timer and no ticking (`mock.timers.tick`); waiting; problems under fields with nothing sent; `changed`; `refused` (two reasons, over forms and over a game); „Anuluj” (over forms and over a game); five keeping failures (no connection, timeout, 429, 500, a password refusal) each with form, fragment, focus and a resend of the same token.

## Browser look

Served with `LOOP2_LISTEN_PORT=18943 npm start` (no account settings), opened `/#reset-password=x` in Playwright. Seen: the form „Ustaw nowe hasło” in a panel with both labelled fields, „Ustaw hasło" and „Anuluj" under it, in the same look as the account forms. After sending (the server without account settings answered an error): the sentence „Serwer nie mógł obsłużyć żądania. Spróbuj ponownie." in the warning colour under the form, the fragment still in the address, focus back on „Ustaw hasło" with the visible focus outline. The waiting state, the field problems and the positive/warning sentences above the forms were not looked at in the browser (only in the page cases); the sample with a refusal is Slice 10. Server stopped afterwards.

## Reaches beyond the dispatch

- `src/browser/account-api.ts:20-140`: to read `AccountResult`, the failure shapes and `setPassword`'s signature.
- `scripts/test.py`: how `npm test -- <file>` builds and runs.

## Choices

- `resetOutcome` returns `{kind: "changed"} | {kind: "refused"} | {kind: "failed", message}`; rejected: strings, since the failure needs its message. Cost if wrong: small, one pure function.
- The reset screen reuses `accountForm` and `passwordProblems` from `account-screen.ts` (shared password check, Decision 12) and wraps its section in `.account-screen` so the one-section width rule applies. „Anuluj" stands under the form like the other switch buttons.
- A `ended` guard in the screen makes a second ending impossible.
- `changed` in `app.ts` sets the pending notice, calls `showForms(null)` and then `accountScreen.focus()`; no session check.

## Searches not found or unclear

none. Small note: the dispatch's `Checks` ask for the form with a "signed-in" player; the page cannot tell, because it asks nothing, so that case asserts no calls at all.
