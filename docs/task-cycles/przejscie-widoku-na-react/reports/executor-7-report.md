# Report — executor of slice 7 (the page's state as one value)

**Status:** done

**Commit:** `db8f0f3f` (range base `51f26f01`). Worktree clean. No push.

**Files changed:** `src/browser/view/app.ts` (+343 / -168). Nothing else; no test changed.

## What was made

`startApp` holds `state: PageState`, one value of three kinds, changed only by `change(next)`:

- `checking` with `waiting`: `asking(text)`, `refused(sentence)`, `retrying`, `stopped`;
- `card` holding the `AccountCard`;
- `game` holding the `GameView`, `account`, `place` (or none), `notices` (the hand-built elements), `message`, `logout` (`idle(sentence|null)`, `saving`, `ending(held|null)`) and `reset` (`idle`, `waiting(held|null)`).

`change` closes the card or game the next value no longer holds (`release`), then `draw` sets header/main hidden, takes out of `main` what the value no longer shows and puts in what it shows (the nodes already there are not moved, so focus is kept and the sentences above the game leave by being taken out), places the saver's row and the card element, draws the waiting screen's hand-built elements from `waiting`, gives the bar its props when they differ from the last given, and focuses „Spróbuj ponownie” at every entry into `refused`. The pure helpers (`barPropsOf`, `sameBarProps`, the types) stand in `app.ts`. `pendingNotice`, `pendingMessage`, `kept`, `entry`, `afterConflict`, `latest`, `failed` and `failureLine` stay apart; the numbering of `latest` and the order of the requests are unchanged. The old variables `card`, `game`, `account`, `place`, `notices`, `barMessage`, `logoutWaiting`, `logoutSentence`, `loggingOut`, `deferred`, `resetting`, `heldByReset` and the functions `showPage`, `dropGame`, `leaveWaiting`, `drawBar`, `onScreen` are gone.

## Checks (command, exit code)

- `npm test -- tests/view/account-screen.test.mjs` — exit 0 (131 pass)
- `npm test -- tests/view/uncaught-failure.test.mjs` — exit 0 (17 pass)
- `npm test -- tests/view/previous-save.test.mjs` — exit 0 (44 pass)
- `npm test -- tests/view/owner-panel.test.mjs` — exit 0 (4 pass)
- `npm test -- tests/view/menu-bar.test.mjs` — exit 0 (32 pass)
- `npm run typecheck` — exit 0
- `npx eslint src/browser/view/app.ts` — exit 0
- `npx prettier --check src/browser/view/app.ts` — exit 0 (run once after `prettier --write` of the file; `--check` passed)
- `python -B .the-way/elements/common/foundation_check.py` — exit 1, 39 errors, all of them lines of `tests/view/react-controls.test.mjs` quoting the old sentence of D-265: the known state, not mine (slice 12 deletes the file). The full run (`npm test` with no argument) was not run: it is the orchestrator's.
- A test-first commit does not apply: the slice says no test changes; the existing cases are the proof.

## Own-work check (section 3)

Requirement of the slice most likely not met: "focus moved to „Spróbuj ponownie” at every entry, a refusal after retrying included", with the retry lasting through every request until the waiting screen is left, and the button staying the same element. The existing tests read these only in part (they press the retry and read the next screen). Check: a scratch test, kept at `docs/task-cycles/przejscie-widoku-na-react/reports/executor-7-own-check.test.mjs.txt` (its imports are relative to `.runs/executor-7/`, where it ran; it is evidence, not a product test), on the harness with a held client: refusal (focus on the button, session text hidden), click (same element, "Sprawdzanie…", disabled, no sentence), second refusal (same element, at rest, focus on it again), click, session found (still "Sprawdzanie…" through the load), load refused (at rest, focus again). Command `node --test .runs/executor-7/own-check.test.mjs` — passed (1 test, 0 fail; the command's printed exit code was that of the `tail` after it, so the line "pass 1 / fail 0" is the evidence). The orderings of a reset with a logout under way, held outcomes and late answers are held by existing cases of `previous-save.test.mjs` (the cases from "a reset confirmed while a logout waits is sent" to "a logout that the server ended after the reset built the new game brings the forms"), all green.

Not checked in a real browser: the slice changes no look and no element, so no screenshot was taken.

## Choices, with the way rejected and the cost if wrong

1. **The old game is closed before the next is built**, as today (`dropGame` came before `createGameView`): `showGame` calls `leaveGame()`, which changes to `checking`/`asking` when a game stands (only the reset's success reaches it with a game standing). Rejected: building the new game before the old goes (the old game's address listener, saver and clock would still run while the new one reads the address). Cost if wrong: one synchronous intermediate draw of the waiting screen that no one can see; the bar goes to the name alone and back, as `dropGame` did.
2. **A card is created before the card it replaces is closed** (today `showPage()` closed it first). Rejected: a special closing step before `createAccountCard`, which would be a second place that closes a card. Cost if wrong: two card roots exist for the length of one synchronous call, inside the handler of the old one. All tests with cards (account screen, reset link, uncaught failure) pass.
3. **After an error nothing handled, a reset that succeeds with the game standing** now goes to `stopped` and closes the game (`change(stopped)` disposes it). Today the old game stayed in the variable, its element out of `main`, still saving. End state the player sees is the same (waiting screen with the sentence, no game built); only that old game's further saves are gone. No test covers this edge (searched `uncaught-failure.test.mjs`). Rejected: keeping a game inside `checking`, which would make the value hold what the screen does not show. Cost if wrong: a game halted after an error stops saving when its reset succeeds in that window; the server then holds none, so a later save of that game would only have been refused as a conflict.
4. **A saver outcome of a game built by a reset, arriving while the old game's logout still waits**, now acts at once on the new game (its logout is idle). Today the global `loggingOut` deferred it and the logout's answer then dropped it (the new game was left without the reload it asked for). The comment of the code and the tests name only the old game's sentence and reload as not reaching the new game, and that still holds. Rejected: a page-level `loggingOut` outside the value, against the spec's "the logout is a field of the game kind". Cost if wrong: a conflict that the new game's first save meets within that window reloads it at once instead of never; no existing case covers the window.
5. **`whenNotBusy` for a view the page no longer holds does nothing** (today it could overwrite the global `deferred`/`heldByReset` with a closure that guarded to nothing, and so lose the current game's held outcome). Cost if wrong: none seen.
6. **The bar is given props only when they differ from the last given** (reference comparison of account, screen, return entry, message; value comparison of the logout fields). Today `drawBar` called `update` at each place; the bar draws the same from equal props. Rejected: updating at every `change`, which adds renders to every held-outcome change. Cost if wrong: a bar that should redraw from equal props would not; a changed place has a new object, so it does redraw.
7. **`reloadAfterConflict` no longer calls `dropGame`**: `loadGame` changes to `checking` at once, which closes the game (the bar goes to the name alone there, as it did).
8. Pre-existing text kept: the waiting screen texts and the retry text are named constants (`CHECKING_SESSION`, `CONFIRMING_ADDRESS`, `RETRY_WAITING`), with the same words.

## Reaches beyond the handoff

None: every foundation entry, guideline and file the handoff names was read; no further search for a decision or invariant was needed.

## Working copies

- `.runs/executor-7/` in the worktree: held the scratch test, the focused tests' logs and the foundation check's log, and the split files I did not need; removed (`rm -rf`) before returning. Kept in `reports/`: `executor-7-own-check.test.mjs.txt`. Nothing remains.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (once; it exceeded the single-read limit, read with `allow_large`).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- `spec.md`: read whole (the handoff names lines 16, 32-48, 99-121; I read the whole file).
- `task.md:29-29` (To do, item 3): not read; the slice text and Decision 3 of the spec carry it word for word.
- `game-view.ts`: read lines 30-311 (the handoff names 36-124).
- D-96, D-97, D-209, D-211, D-225, D-261, D-262, D-286, D-323, D-402: read whole at the ranges given. The "Foundation entries row 5 (D-323)" read as the entry in `foundations/decisions.md:4320-4333`.
- `.claude/skills/loop2-play/SKILL.md`: not read; I did not run the game in a browser.
- `guidelines/testing.md`: not read; no test was written or changed.
- `.runs/.../reports/` of other executors and `plan.md`: not read (not named).

## Searches not found or unclear

- None found missing. One unclear point, the handoff's "stopped" wording against the original code in the case of choice 3 above: the spec's `stopped` is "the state the page takes where it would build a game after an error nothing handled" and says nothing of a game still held in that moment; I took it as above.
