# Report - Slice 10 (executor, make-change)

**Status:** done

**Commits:** `098a708` (base `f7f0726`)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/email-confirmation.ts` | 7 | 1 |
| `src/browser/view/game-view.ts` | 14 | 3 |
| `tests/view/account-screen.test.mjs` | 79 | 15 |

What changed:
- `PageAddress` gained `reload(): void` ("Reloads the page at its address, fragment included"). `browserAddress()` implements it as `location.reload()` where a `location` exists, nothing outside a browser.
- The listener of `address.onChange` in `createGameView` now, before resolving a screen, asks `readConfirmationToken(hash) !== null || readResetToken(hash) !== null`; if so it calls `address.reload()` and returns, touching neither the screen nor the fragment. Any other change goes on as before. Docstring of `createGameView` mentions it (D-352).
- `tests/view/account-screen.test.mjs`: `fakeAddress` gained `reloaded` and `reload()`; two new cases; one existing case changed (see "Changed an existing test").

## Checks (command and exit code)

- Test written first, on the base (before any change to `src`): `npm test -- tests/view/account-screen.test.mjs` -> exit 1. Failing case: "a fragment of an emailed link that appears in the address of an open game reloads the page, which keeps the fragment and the screen as they were"; message `a confirmation link: the page reloads: expected 1, got 0` (the assertion, not a missing function: the fake already carried `reload`). 129 of 130 passed; the second new case ("any other change ... reloads nothing") passes on the base, as it pins what goes on as today.
- After the code: `npm test -- tests/view/account-screen.test.mjs` -> first run exit 1, because an existing case failed (below); after it was changed -> exit 0, 130 tests, 130 pass.
- `npm test -- tests/view/email-confirmation.test.mjs` -> exit 0 (5/5).
- `npm test -- tests/view/password-reset.test.mjs` -> exit 0 (2/2).
- Also run, the files that name a link's fragment: `npm test -- tests/view/screen-address.test.mjs` -> exit 0; `npm test -- tests/view/uncaught-failure.test.mjs` -> exit 0.
- `npx prettier --check` and `npx eslint` on the three changed files -> clean (exit 0).
- Not run: `npm test` without arguments (the cycle's gate); `foundation_check.py`. `npx tsc` has no `tsconfig.json` at the root; the build in `npm test -- <file>` compiled the TypeScript, which is the only type check I ran.

## The real browser (D-254, `loop2-play`)

Started from the worktree's root (`npm run local`, in the background), Playwright CLI 0.1.22. Account made through the login card (made-up address at `example.test`), signed in, Siedziba open at `#/`. A marker `window.__marker` was set on the open page before each address change; the address was then changed with `playwright-cli goto` to the same page with another fragment, which is a same-document navigation and fires `hashchange` as typing into the address bar does.

| Change of the address | What the page did |
|---|---|
| `#confirm-email=<made-up token>` | marker gone (the page reloaded); `.confirmation-notice` with role `alert`: "Odnośnik jest nieważny albo wygasł." (the sentence a made-up token earns, D-156); then Siedziba shown, address `#/`; console: only the browser's own `400` for `POST /api/email-confirmation` |
| `#/programy` | marker kept (no reload), address stays `#/programy` |
| `#reset-password=<made-up token>` | marker gone (reloaded); heading "Ustaw nowe hasło", no game built; address kept `#reset-password=…` (screenshot inspected: the form shows as D-225 gives) |

Before the first successful run, my first marker `eval` was a syntax error, so that first `goto` proved nothing; the table above is the second round with the marker verified set (`"before-reload"`) and verified gone after.

Ended with `playwright-cli close`, `npm run local:stop` ("Local starts stopped: 1"), `.playwright-cli/` deleted; `git status` shows only ignored `.runs/` (pre-existing) besides the commit. A real token cannot be sent from here (no mail leaves, as the skill says), so the confirmation of a valid token and the setting of a password were not checked in the browser; the existing tests of the page opened by a link cover them.

## Own-work check

Requirement most likely not met: that the reload leaves the fragment in the address, so the reloaded page can read the token (task item 21, D-352 "reloads, then does what a page opened by that link does"). A listener that first resolved/replaced the fragment (as before) or reloaded after `show(...,"replace")` would send the reloaded page to Siedziba with no token. Check written: the first new case asserts, after the change, `address.hash() === link` and the shown screen unchanged, for both fragments, and the real browser run above shows the reloaded page reading the token (sentence / form). It showed the requirement met; on the base the same case fails.

Mutation in the head: reload for one link only (caught: loop over both); reload at every change (caught by the second case with Programy, back/forward and five non-link fragments); a lookalike such as `#confirm-email` with no `=` or `#CONFIRM-EMAIL=abc` taken for a link (caught); fragment replaced before reload (caught by the `hash()` assertion); `browserAddress().reload` empty or wrong is NOT caught by a test (see below).

Trust boundary (`src/browser/**` is not in the cycle's list; the fragment is still the player's input): the check is the same `startsWith` of the two readers the page already uses at start, whatever follows is not interpreted by the listener, so a crafted fragment can only reload the page (once per `hashchange`, which the player can already cause by reloading) or fall through to the unchanged path.

## Changed an existing test

`tests/view/account-screen.test.mjs`, case "an address that leads to no existing screen opens the nearest one and has its fragment replaced, with no new entry, at a reload and through a link alike" (was at line 3953): it listed the two emailed-link fragments as rows that, "through a link while the game stands", open Siedziba and are replaced - exactly what D-352 changes. I removed those two rows and the `if (hash !== LINK && hash !== RESET_LINK)` guard around the reload half (the guard existed only to skip those rows), and rewrote the case's header comment to say the links are covered by the new case. The third link-related row (a link's fragment behind a screen's address, `#/postac/1#confirm-email=…`) stays: it is no link for `readConfirmationToken`. Cause on the requirement side: D-352 (and Settlement 1), not a failing test hidden.

## Reaches beyond the handoff

- `foundations/decisions.md` D-352 and the other entries named in the handoff (read whole), `foundations/part_map.md:3-28`, `glossary.md:87-91`, the two invariants and D-268's invariant: read via targeted extraction by identifier (section by section), as the handoff names them. No other reach.

## Choices (with way rejected and cost if wrong)

- Reload through `PageAddress.reload()` (plan's choice), not `location.reload()` in the view. Cost if wrong: one more member of a type every fake address implements. The fakes of `tests/view/chronicle-game.test.mjs` and `tests/view/end-question.test.mjs` and the one of `email-confirmation.test.mjs` have no `reload`; none of their cases changes the address to a link's fragment, so nothing calls it (the files are plain `.mjs`, no type check). I did not add the member there: outside the slice's Change list. A later case there that follows a link would throw "address.reload is not a function".
- The listener tests the two fragments with the readers `readConfirmationToken` and `readResetToken` (one definition of "what a link is" for page start and listener), importing `readResetToken` into `game-view.ts` from `password-reset.ts`. Way rejected: a new `isEmailedLink` helper in `email-confirmation.ts` - one more name for two calls. Cost if wrong: a third emailed-link kind needs the listener edited too.
- A no-op `reload` outside a browser, like the other members of `browserAddress`.

## Adaptations of the plan to the code

- The plan's line numbers (`game-view.ts:815`-`:822`, `email-confirmation.ts:15`-`:28`, `:80`-`:102`) matched the code at the base. The task's item 21 also names `src/browser/app.ts:584`-`:589`; that file does not exist (the page is `src/browser/view/app.ts`, `start()` at `:583`-`:598`). Not a mismatch that changed the work.
- The handoff's "Checks" lists only focused commands; no mismatch with the no-gate rule.

## Searches not found or unclear

- `src/browser/app.ts` named by task item 21: not found (see above; `src/browser/view/app.ts` is the file).
- No test proves `browserAddress().reload()` itself: jsdom's `location.reload` does no navigation and cannot be replaced (`Location` members are unforgeable), so the only proof is the real browser run above, which went through it. Per `guidelines/testing.md` ("Not tested on purpose": real events), that is the allowed route. If the orchestrator wants a unit test of that one line, it would need a stand-in `location`, which the file's `browserAddress` does not take.
- Not checked: a valid confirmation token and a successful password reset in the real browser (no mail leaves `npm run local`).

## Questions

none
