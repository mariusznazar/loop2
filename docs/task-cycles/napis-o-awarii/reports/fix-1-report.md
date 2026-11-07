# Fix report 1 — task `napis-o-awarii` (fix of review 1, blocking finding I-1)

**Status:** done. **Commit:** `da4e7ac` (range starts at reviewed head `bd1971d`).

## I-1 fixed: how

Way (a), as the orchestrator chose. In `src/browser/view/app.ts` `showGame` now starts with `if (failed) { leaveWaiting(); showPage(check); return; }`: after an error nothing handled, no game is built, so `createGameView`, the catch-up of D-247 and any save never run; the page shows the waiting screen with the sentence in the header row. The halt-after-build line (`if (failed) view.halt();`) is removed. `GameView.halt()` stays: it halts the game standing at the error. Doc comment of `startApp` and the paragraph of `guidelines/coding-browser-module.md` say so.

Entries (written in place, meaning of rows 1 and 4 kept): D-323 gains the sentence "After such an error the page builds no game until it is reloaded: a sign-in, whatever load or kept game state it leads to, stays at the waiting screen with the sentence, so the catch-up of D-247 and the send of the state kept by D-211 do not run." and `Relations: derives from D-252 · narrows D-247 · narrows D-211`; *Rationale* and a *violates* example gain one clause each. The invariant `uncaught-failure-game-state` needed no new wording: its sentence ("changes no more", "every save … as it stood before the error") now holds for this path too, and the new tests cite it.

## Tests (`tests/view/uncaught-failure.test.mjs`)

- Failing first: new/rewritten cases written before the code. `npm test -- tests/view/uncaught-failure.test.mjs` → **exit 1**, 2 failing, both at "waiting: expected a true value, got false" (a game was built). After the fix → **exit 0**, 13 pass.
- The old case "…a game built after it both show it, the game taking no change" is rewritten: card after „Wyloguj” shows the sentence; a sign-in with a save of Ala in an earning loop one game minute from the end of her map run (`loopingAla`, saved a minute before the clock) leaves the waiting screen with the sentence, no card, no game, no interval (clock and saver), and no `saveGame` call even after 60 s of mocked time.
- New case, the reviewer's scenario: the error comes on the waiting screen before the first game; account and the same loop save are answered; waiting screen with the sentence, no game, no save.
- Both cases cite `invariant: uncaught-failure-game-state`.

## Checks (command → exit code)

- `npm test -- tests/view/{uncaught-failure,account-screen,page-document,game-saver,clock,menu-bar}.test.mjs` → 0 each (13, 126, 56, 20, 23, 28 pass).
- `npm run typecheck` → 0; `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {}> app.ts uncaught-failure.test.mjs` → 0; `prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` → 0; `python -B .the-way/elements/common/foundation_check.py` → 0 errors.
- Not run: full `npm test` (orchestrator's).

## Real-browser check (`npm run local`, Playwright CLI; evidence here only)

Account made, error thrown in a timer (`setTimeout(() => { throw new TypeError(…) }, 0)`), „Konto” → „Wyloguj”, sign-in on the card. Screenshot inspected: header with the game's name, the sentence in orange under it, „Sprawdzanie logowania…”, no game, no card (`document.querySelector('.headquarters, .program-panel')` null, one `.failure-line`). `.playwright-cli/` removed.

## Reaches beyond the findings

- `guidelines/coding-browser-module.md` (one clause); `foundations/decisions.md` D-323 only. D-247 and D-211 not edited (D-323 narrows them; their sentences stand).
- Skill/skill files read: `.the-way/task-cycle/change/fix.md`; foundation entries D-247 and D-211 headings read for the *Relations* wording.

## Searches not found or unclear

- A state kept for D-211 (a save that found no session) is dropped from the page's memory when the sign-in after the error stops at the waiting screen (`kept = null` is set before `showGame` in `enter`). Nothing can use it before the reload that the sentence asks for, and a reload loses it anyway (D-211), so I left it; flagging in case a different reading is wanted.
- The waiting screen after the error reads „Sprawdzanie logowania…” beside the sentence (what the orchestrator named "the waiting screen"); it is not a request still under way. No wording was settled for it.
- Minor findings M-1…M-7 not touched.
