# Return report — task `napis-o-awarii` (return step, step 11)

**Status:** done. **Commit:** `f4b73af` (on head `da4e7ac`). Only `foundations/decisions.md` and `foundations/environment_facts.md` changed; no code or test touched.

## Foundation compared with code

- D-323 (code: `last-resort.ts`, `app.ts`, `game-view.ts`, `account-card.tsx`): the three binding parts match (state stops, saving goes on from the last whole state without a clock reading; no game built after the error, sign-in stays at the waiting screen; sentence once in `warning` in the three places; line as D-253). Two mismatches corrected: four binding sentences (N-1) and *Relations* naming too few decisions (N-2, M-5); *Based on* was `none` though the card-down branch and the path of the other roots rest on React's behaviour (now two facts).
- D-253 (browser handler, line `uncaught kind=… code=… place=…`, event cancelled, one line once): matches the code and the real-browser check; unchanged.
- D-262 addendum (sentence alone in the card's place): matches (`account-card-failure` panel with the sentence alone); unchanged.
- `html-exception-reporting`: matches the HTML Standard text read; unchanged. `uncaught-failure-game-state`: sentence holds on all paths (the fix of review 1 closed the build-after-error path); its tests cite it; unchanged.
- *Decisions in play* and the search of the whole foundation: D-207, D-208, D-97, D-213, D-96, D-211, D-247, D-286, D-39, D-254, D-264 (the harness passes the new `uncaught ` line only), D-259, D-261, D-265 read against the code; no further mismatch. D-62, D-122, D-132, D-173, D-283 describe a game that works; the task's accepted reading of question 1 covers them, so they are not named in *Relations* (D-283 is the same kind: after the error the leave-pause act is rejected by the store).
- Part map: browser-view's files already claim every file added (`src/browser/view/**`, `tests/view/**`); no change.

## Written or changed

- **Decisions:** D-323 edited in place — (N-1) merged to three binding sentences (the no-game sentence joined to the first by a semicolon; the D-253 sentence last); (N-2/M-5) *Relations* now `derives from D-252 · narrows D-247 · narrows D-211 · narrows D-96 · narrows D-203 · narrows D-209`, because the sentence "builds no game … a sign-in stays at the waiting screen" overrides what D-96 (sign-in leads to Siedziba), D-203 (retry saving after a new sign-in) and D-209 (load the server's save after a conflict and play on) say; none of them narrows D-323, so no mutual narrowing; *Based on* `react-uncaught-render-error · react-default-uncaught-report`. The meaning of rows 1 and 4 is kept; the no-game rule and the `narrows` are the orchestrator's choice, which the request must put before the human (WAY-14).
- **Environment facts:** `react-uncaught-render-error` (React 19.3.1 unmounts a root by rendering null at an error no boundary caught and hands the error to the root's `onUncaughtError`) and `react-default-uncaught-report` (by default it reports to the browser through `reportError`, which fires an `error` event at the window). Source: facebook/react tag `v19.3.1`, `ReactFiberThrow.js`, `ReactFiberErrorLogger.js`, `shared/reportGlobalError.js`, passages copied from the files fetched on 2026-11-07 (checked by `grep` of each passage in the fetched files); read 2026-11-07. Two entries, not one: the unmounting and the default reporting are different things with different dependants (card-down branch; the other eight roots).
- **Invariants:** none written or changed. **Glossary terms:** none (no word used in another meaning than the usual one or against an entry). **Part-map changes:** none.
- **Projected entries / rows of *Settlements to record*:** rows 1–5 written in the foundation step (D-323, D-253, `html-exception-reporting`, `uncaught-failure-game-state`, D-262); no row or projected entry missed. The task has no projected entry (task 15 writes it).
- Choices that bind after the merge and are not rows: no game is built after an error (the orchestrator's choice, in D-323 now); nothing else.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → 0 errors (after the edits).
- Mechanical check of the facts' passages: each quoted line found in the fetched sources (`ReactFiberThrow.js:99,103`, `ReactFiberErrorLogger.js:37,148`, `shared/reportGlobalError.js:12–13`); the files read from `https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/…` → fetched with exit 0.
- Not run: `npm test` (the gate passed on `da4e7ac`; this commit changes foundation files only, which the gate's own `foundation_check.py` stage covers and passes).

## Searches not found or unclear

- The task's *Context* cites `node_modules/react-dom/cjs/react-dom-client.production.js` (the built file); the facts cite React's source at the same version tag instead, since an edition address of the publisher is what the template asks for. The two agree (the production build was read for the same lines in the author step).
- `react-default-uncaught-report` says "by default", as the source's `defaultOnUncaughtError` does; the dev-build `act` behaviour (error kept until `act` ends) is no part of the fact and not needed by any decision.
- N-3 and M-1…M-4, M-6, M-7 are not foundation entries of this kind; not touched.
