# Report — executor of slice 8 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done with concerns (two mismatches between the plan and the code, below; both adapted, neither blocks).

## Commits

- `387cd8ca886f3646655de9cebea6956ec7ca20ae` — `feat: :sparkles: have the page make each new game at the clock's moment …` (one commit for the slice; base `7ba9d74e`).

## Files changed

| File | Added / removed lines |
|---|---|
| `src/browser/view/app.ts` | +3 / -2 (5 lines changed) |
| `src/browser/view/page-game-acts.ts` | +1 / -1 |
| `src/browser/view/game-view.ts` | +20 / -2 (22 lines changed) |
| `tests/view/judging-cache-page.test.mjs` (new) | +461 / 0 |
| `tests/view/uncaught-failure.test.mjs` | +18 / 0 |
| `tests/view/account-screen.test.mjs` (not in the slice's *Change*, see "Reach beyond the handoff") | +7 / -3 |

`src/browser/view/maps-entry.ts` is in the slice's *Change* and is left unchanged (see mismatch 1).

## What was done

- `app.ts`: `newGame(Date.now())` in `startFrom` (a load refused as version, archetype or shape) and in `loadGame` (an account with no saved game state; a conflict reload that finds none goes through it). `showGame` gives `createGameView` `accountId: owner.id` (the opaque `Account.id`, never the email).
- `page-game-acts.ts`: the reset of D-402 builds its new game with `newGame(Date.now())`.
- `game-view.ts`: new required option `accountId`; `createGameView` opens `openJudgingCache({ accountId, madeAtMs: options.state.madeAtMs, state: options.state, afterRefusedSave: options.afterConflict ?? false, storage: lastingStorageOf(window) })` and gives it to `createMapsEntry({ store, judgingCache })`. `lastingStorageOf` (Slice 5) holds the guard around the reach of `window.localStorage`; this is the one place of the page that calls it. No other file of the page reaches the browser's storage (grep of `localStorage` in `src/browser/view/`: only `judging-cache.ts`'s guard and its doc comments).
- Tests: the new file `tests/view/judging-cache-page.test.mjs` (6 cases, built on the page through `startApp` as `previous-save.test.mjs` does; the storage is the jsdom window's own, seeded and read through the cache module, never by its stored form); one extra assertion in `tests/view/uncaught-failure.test.mjs`.

## Checks (command and exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/judging-cache-page.test.mjs` before the code (failing first; 6 of 6 cases failed on assertions — e.g. "an account with no saved game state: expected 1760000000000, got 0", "the judging gives a mark beside the list: expected a true value, got false", "precondition: the cached judging shows") | 1 |
| the same after the code (6 pass) | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` (19 pass) | 0 |
| `npm test -- tests/view/maps-screen.test.mjs` (49 pass) | 0 |
| `npm test -- tests/view/previous-save.test.mjs` (46 pass) | 0 |
| `npm test -- tests/view/chronicle-game.test.mjs` | 0 |
| `npm test -- tests/view/end-question.test.mjs` | 0 |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` before my fix of three expectations (3 failed: the new game's save now carries `madeAtMs` = the clock) | 1 |
| the same after the fix (132 pass) | 0 |
| `npm test -- tests/view/login-card-focus.test.mjs`, `tests/view/owner-panel.test.mjs`, `tests/sim/rules.test.mjs`, `tests/invariants/test_simulation_isolation.py` (other files that import the page or the game view) | 0 each |
| `npx prettier --check` on the six files, `npx eslint` on the six files | 0 (prettier first reported `account-screen.test.mjs`; `prettier --write` fixed it, re-check 0) |
| `npm run typecheck` | 0 |
| `node tests/quality/eslint-size-rules.mjs` ("0 functions and files over a threshold in 339 files") | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: 5 errors, all in `tests/sim/saved-game-judgings.test.mjs` (not my file); none in a file I changed |
| `python -B .the-way/elements/common/foundation_check.py` (with citations) | 1: the same 5 errors; none in my files, so every `// decision:` line I wrote or kept quotes a binding sentence |

Not run: the full gate (`npm test` with no argument), by the handoff.

## Own-work check

The requirement my slice most likely does not meet: **every path that makes a new game passes the clock's moment, and a game built after a refused save shows none of what its browser cached for it** (spec Decisions 3 and 7, D-441). A path missed would keep the moment 0 for every game of an account, and the keys of one game would answer in the next. Checks:

1. The table case "a new game made by each path …" runs eight variants (no saved game state; refused as version, as archetype, as shape; a loaded game; a conflict reload that finds no save; the reset) and in each reads the moment from the first save the page sends (`game.madeAtMs`) and whether the seeded judging of the account's game made at 777 is kept or removed. It failed first on the no-save path and passes now.
2. Mutations on the code, each seen failing `judging-cache-page.test.mjs`, then restored: `afterRefusedSave` fixed false (3 failures); `madeAtMs: 0` in the cache opening (9 failures); the no-save path with `newGame()` (3 failures); `storage: null` (11 failures). Removing `!store.halted()` in `maps-entry.ts` for a moment fails the new assertion of `uncaught-failure.test.mjs` ("expected [], got a note of the author"); restored.
3. The kept state after an expired session (D-211) and another device go through `startFrom`/`loadSavedGame`, which keep the saved moment; the "a loaded game" variant covers that path of the loader. No test of its own for the kept-state path (reasoned only).

## Mismatches between the plan and the code

1. **Option of the entry "becomes required"** (`maps-entry.ts`): not done. `tests/view/maps-screen.test.mjs` (Slice 6, not in my *Change*) has a case "an entry given no cache shows the result of a judging, remembers nothing and shows no mark" and `enterMaps(page, store)` builds the entry with no cache; a required option read without `?.` fails that case. The game view always gives the cache, so the one caller satisfies a required option; the optional type stays only for that test. Recommendation: the slice that next touches `maps-screen.test.mjs` drops that case and the default `cache = null` of `enterMaps`, then `maps-entry.ts` makes the option required and drops the `?.`.
2. **The plan says the other callers of `createGameView` and the page cases run unchanged**: the direct callers do (`chronicle-game`, `end-question`, `end-window-game`, `previous-save`, and the two in `account-screen`), but three page cases of `tests/view/account-screen.test.mjs` expected `submission(newGame(), …)`, the new game at moment 0, and now see `madeAtMs` = the clock's moment. Cause: the requirement (Decision 3), not the code under test. I changed the expected value of those three assertions to `newGame(CLOCK_MS)` (`CLOCK_MS` is the date the case mocks).

Direct callers of `createGameView` in tests pass no `accountId` (JavaScript, no type check): the cache then names the account by the text `undefined` on the case's own jsdom window; they do not read the storage. Not changed, as the handoff says.

## Walk (`walkthrough.md`; the change alters what a user sees: the mark beside „Program:” now survives a reload)

Checked on this computer, Windows 11, `npm run local` over HTTPS (`https://127.0.0.1:65436`), Playwright CLI (Chromium), a made-up account `agent@example.test`.

| Case | By what | Verdict |
|---|---|---|
| A new account has no mark on the card of Skraj lasu | screen of Mapy in the browser | right: no mark beside „Program:” |
| „Oceń na 12 ziarnach” stores the judging under the account's id and the game's moment, not the email | `Object.keys(localStorage)` read from the page | right: one key `loop2-judging-1\|<opaque account id>\|1795238636289\|1\|1\|forestEdge`; the moment is a whole-millisecond clock reading; no email in it |
| Mark after the judging | screen | right: „0 z 12” beside the list (the empty program of a new game dies on every seed) |
| Mark after `playwright-cli reload` with no judging made | screen and a screenshot inspected | right: the same „0 z 12” stands again at `#/mapy/forestEdge` |
| No uncaught error | `playwright-cli console error` | right: 0 messages |
| Side observation | — | the two console errors of the first load are the 401 of the account request before sign-in, ordinary per the skill |

What I did not check in the browser: a refused save (another browser saving first), „Zacznij od zera” (needs the previous-save privilege on the account, not made here), a second account and a refused `localStorage`; the tests above cover them on jsdom, which proves no real storage behaviour. Looked at the screenshot; none kept, none pushed (WAY-316 place: `loop2-play` settles a public repository, and the handoff says push none). The browser was closed (`playwright-cli close`), `npm run local:stop` reported one start stopped, `.playwright-cli/` removed.

## Reach beyond the handoff

- `tests/view/account-screen.test.mjs`: three expected values (mismatch 2), not in the slice's *Change*.
- I read no foundation entry or file that the handoff did not name, apart from `foundations/decisions.md` D-441 (whole), D-04 (the first part up to its verification list), D-206, D-209, D-402, D-323, which the handoff names by range; I read each from its heading and found the ranges had moved a few lines from the handoff's numbers.
- `.the-way/task-cycle/change/slice.md`, `ui_check.md`, `walkthrough.md`, `.claude/skills/loop2-play/SKILL.md`: named by the method.

## Choices

- `Date.now()` is called inline at the three places. Rejected: a small shared helper in `page-game-acts.ts`; three one-word calls need none, and every place reads the clock the way `clock.ts` does. Cost if wrong: a fourth path would have to remember it; the test table names the four paths.
- `accountId` is a required property of `GameViewOptions` (the page always knows it), where the plan's "gives the game view the account's id" leaves the form open. Cost if wrong: none for the page; the direct test callers pass none (above).
- The new test seeds and reads the storage through `openJudgingCache` so the page test never knows the stored form (the cache test owns it); the page-level checks of "kept" and "removed" read through a cache opened for the same account and game, which itself removes the account's values of other games; the cases order their reads so that no read removes what a later read needs.
- Quotations: the new test has seven `// decision:` lines (D-04 once, D-206 twice, D-441 four times, three distinct sentences of it) quoting binding sentences from their beginning; the foundation check, run with citations, shows no error for the file.

## Class of model

`same` proved sufficient.

## Unread material

- `foundations/decisions.md` D-04: read from its heading to the first lines of its *Verification* list (the long list of *complies* examples after "the screen Mapy drawing the mark beside" not read to the end); D-209, D-402 and D-323 read whole; D-206 read whole to its *Rejected* clause; D-441 whole.
- `guidelines/styleguide-browser-view.md`: read lines 1–80 only (roles table and the first two rules); this slice changes no style, no colour, no screen element.
- Handoff "Foundation entries row 1/4/8" are the D-441, D-04 and D-206 entries above.

## Searches not found or unclear

- The handoff names the directory for working copies as `.runs/executor-8/`, the dispatch message `.runs/executor-c1-8/`; I used `.runs/executor-8/` (the handoff file) and removed it.
- None else.

## Working copies

- `.runs/executor-8/` (logs, backups of three source files for the mutation runs, the screenshot, the commit message file) stood in the worktree; removed before returning. No worktree or clone made. `.playwright-cli/` removed; the local start stopped.
