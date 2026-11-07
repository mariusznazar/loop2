PASS da4e7ace16cdd3f69ce0e4c0e551775bdeb01924

# Review of the fix of review 1 — task `napis-o-awarii`

Variant: the fix of earlier findings. Range `bd1971decef013bd2a5bd5f6a8f9ac21343b6fff..da4e7ace16cdd3f69ce0e4c0e551775bdeb01924`: one commit, `da4e7ac`, touching four files (`src/browser/view/app.ts`, `tests/view/uncaught-failure.test.mjs`, `foundations/decisions.md` D-323, and `guidelines/coding-browser-module.md`). I confirmed with `git rev-parse HEAD` that the head is `da4e7ace16cdd3f69ce0e4c0e551775bdeb01924`. I read the findings file `reports/findings-1.md`, which takes way (a), the fix report `reports/fix-1-report.md`, `.the-way/task-cycle/review/fix.md`, and the diff.

Counts: findings that remain 0; new Critical or Important findings 0; new Minor findings 3 (notes outside the bound, which do not reopen the review). M-1 to M-7 are not reopened.

## I-1 — fixed

The fix adds a guard at the start of `showGame` (`src/browser/view/app.ts:372`–`:378`): `if (failed) { leaveWaiting(); showPage(check); return; }`. It removes the line that halted a game after building it. `showGame` is the only place that calls `createGameView` (`app.ts:384`; I searched `src/browser/view`). So after the error no game is built: the catch-up of D-247 does not run, and no saver or clock is started for a new game. I checked every path that used to build a game after the error:

| Path | Evidence | Result |
|---|---|---|
| Sign-in from the card after „Wyloguj” | change's test "after an error nothing handled no game is built: a card built after it …", which loads a save in an earning loop | waiting screen with the sentence, no game, no save after 60 s of mocked time |
| Error on the waiting screen before the first game (the case in my finding) | change's test "an error on the waiting screen before the first game …"; my scratch test `catchup-after-error.test.mjs` rerun on the new head | `{"savesAfterError":0,"sentDiffersFromLoaded":false}` |
| A save that found no session (D-211), then a sign-in to the same account, which goes the kept-state way | my scratch test `fix-paths.test.mjs`, case B | the card shows the sentence; after the sign-in: waiting screen, no card, no game, no request waiting |
| A save that lost to another browser after the error (D-209), so the page reloads the server's save | my scratch test `fix-paths.test.mjs`, case C, loading a save in an earning loop | waiting screen, no game, no request waiting |

The game that stands at the error keeps its `halt()`, and the invariant test of review 1 still passes. To do 3, row 4 and the invariant `uncaught-failure-game-state` now hold on every path I found: no later simulation result is taken, and no save carries a state from after the error. D-323 says what the code does: its new sentence says the page builds no game until the page is reloaded and that a sign-in stays at the waiting screen. *Relations* now reads `narrows D-247 · narrows D-211`. The invariant's wording did not need to change. The guideline paragraph and the doc comment of `startApp` match the code.

The new tests check behaviour: whether the waiting screen shows, the sentence stands once in the header, no card or game elements exist, and no save request is waiting. The count of intervals at 0 is of the kind M-4 already names, so I do not reopen it. Both tests cite the invariant. I saw them fail: in a detached scratch worktree of `da4e7ac` with `app.ts` put back to `bd1971d`, `npm test -- tests/view/uncaught-failure.test.mjs` exited 1, and exactly those two cases failed.

## New notes in the fix diff (Minor; they do not reopen the review)

**N-1. D-323 now has four binding sentences.** The decision template gives "One to three sentences: the first paragraph under the heading" (`.the-way/elements/decisions/template.md:94`). The fix appends the fourth one ("After such an error the page builds no game …") to the three that stood (`foundations/decisions.md`, D-323, first paragraph). `foundation_check.py` does not check this. The fix is to merge it with another sentence, for example to join the sentence "The page writes the line …" to the second sentence with a semicolon.

**N-2. The new sentence of D-323 also overrides decisions it does not name as narrowed.** It overrides D-96 ("signing in with email and password … also lead to Siedziba"), D-203 ("After the player signs in again to the same account, the game retries saving that state") and D-209 ("loads the server's saved game state … and plays on from the loaded state"). *Relations* names only D-247 and D-211. This widens M-5. The binding sentence states the area where D-323 prevails ("a sign-in, whatever load or kept game state it leads to"), so the code and the entry agree. But a reader of D-203 or D-96 alone meets a collision with no precedence recorded (WAY-25). The fix is to add `narrows D-96 · narrows D-203 · narrows D-209`.

On the kept state of D-211 that the fix report flags: it is dropped, and so the progress a save without session left behind is lost. This loss is within the cost the task accepted in its answer to question 1 ("a przy zapisie, który nie doszedł, to, co zaszło od ostatniego udanego"), so I do not count it as a defect.

The meaning that no game is built after the error, and the three `narrows`, are the orchestrator's choice, not a row of the task. The request has to name them so that the human accepts them when merging (WAY-14).

**N-3. After the error, the waiting screen reads „Sprawdzanie logowania…” for good, though no request is under way.** Place: `app.ts:375`–`:376`; `leaveWaiting()` shows `checking`. The sentence beside it tells the player to reload, so the effect is a line of text that is untrue but does no harm. By WAY-220 that is Minor. The fix report names the wording as unsettled.

## Declined to judge

- M-1 to M-7 of review 1: not fixed in this round, as the findings file gives; I did not reopen them.
- The real-browser check of the fix: the fix report describes one, with no screenshot kept. I did not repeat it.

## Checks run

- `npm test -- tests/view/uncaught-failure.test.mjs` → exit 0, 13 of 13 pass.
- `npm test -- tests/view/account-screen.test.mjs` → exit 0, 126 pass.
- `npm test -- tests/view/page-document.test.mjs` → exit 0, 56 pass.
- `npm test -- tests/view/game-saver.test.mjs` → exit 0, 20 pass.
- `npm test -- tests/view/clock.test.mjs` → exit 0, 23 pass.
- `npm test -- tests/view/menu-bar.test.mjs` → exit 0, 28 pass.
- `npm run typecheck` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {}> src/browser/view/app.ts tests/view/uncaught-failure.test.mjs` → exit 0.
- `prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the same two files → exit 0.
- Scratch tests in `C:\Users\Mariusz\AppData\Local\Temp\claude\c7b90770d5ecab56\4038ac73-063e-411e-86b4-870359648570\scratchpad\`:
  - `node --test catchup-after-error.test.mjs` → exit 0, `{"savesAfterError":0,"sentDiffersFromLoaded":false}`.
  - `node --test fix-paths.test.mjs` → exit 0. Case B: `{"atCard":{"waiting":false,"card":true,"game":false,"sentences":1},"after":{"waiting":true,"card":false,"game":false,"sentences":1},"calls":[]}`. Case C: `{"after":{"waiting":true,"card":false,"game":false,"sentences":1},"calls":[]}`.
- Mutant: a detached worktree of `da4e7ac` with `app.ts` from `bd1971d`, which puts the halt after building back, `node_modules` joined by a junction and the worktree removed afterwards → `npm test -- tests/view/uncaught-failure.test.mjs` exit 1, the two new cases failing.
- The reviewed worktree stays clean, HEAD `da4e7ac`.
- Not run: the full `npm test` (the orchestrator's gate) and a real browser.

## Reach beyond the dispatch

- D-96, D-203 and D-209: their binding sentences, read in review 1, checked here against the new sentence of D-323 (N-2).
- `.the-way/elements/decisions/template.md:94`, for the number of binding sentences (N-1).

## Searches not found or unclear

- Besides `showGame`, I found no other way the page builds a game, by searching for `createGameView(` in `src/browser/view`.
- None of the change's tests covers the case of a save without session (D-211) or the conflict case (D-209) after the error. My scratch tests cover both, and the guard in `showGame` covers them by construction.
