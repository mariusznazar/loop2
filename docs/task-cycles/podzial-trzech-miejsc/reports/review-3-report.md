PASS 26c650cc3f8365c8a59aa6aea40a192344185871

# Review of slice 3 (review-3), task `podzial-trzech-miejsc`

Range: `7a16a73c..26c650cc`, one commit (`26c650cc`). `git rev-parse HEAD` in the worktree is `26c650cc3f8365c8a59aa6aea40a192344185871`, the head given. Files: `src/browser/view/app.ts`, `src/browser/view/page-game-acts.ts` (new), `src/browser/view/page-places.ts`, `guidelines/coding-browser-module.md` — the four of the slice's *Change*, nothing else.

## Findings

### Critical

none

### Important

none

### Minor

1. `guidelines/coding-browser-module.md:369-370` — the new sentence says „co te działania wołają z powrotem w `app.ts`, dostają przez ten sam parametr”. It holds for `logOut` and `resetGame`, which reach `expire`, `showForms`, `focusCard`, `reloadAfterConflict` and `showGame` through `page.calls` (`src/browser/view/page-game-acts.ts:114-159`, `171-208`). It does not hold for `whenNotBusy`, the other act that calls back into `app.ts`: it gets only `places`, and what it calls back (`reloadAfterConflict(page)`, `expire(page)`) comes as its own third argument `action`, a closure built in `showGame` (`src/browser/view/app.ts:212-215`, `src/browser/view/page-game-acts.ts:80-101`). A reader who adds an act after this sentence could look for a `calls` field that `whenNotBusy` never had and never needs. Nothing goes wrong in the code. The fix is one clause, for example „przez ten sam parametr albo, jak `whenNotBusy`, jako funkcję w argumencie”. Minor: a guideline sentence that is slightly broader than the code. The guideline is not a foundation entry, and no rule and no behaviour is affected.

No other finding. What follows is what I checked and found to hold.

## What was checked and holds

**No change of behaviour (the move itself).** I compared every function moved out of `startApp` with its body at `7a16a73c` (saved as a working copy and read side by side). `takeNotice`, `leaveGame`, `placeCard`, `focusCard`, `waitForServer`, `askingFailed`, `loadFailed`, `showGame`, `showForms`, `expire`, `reloadAfterConflict`, `enter`, `loadGame`, `checkSession`, `onPlace`, `whenNotBusy`, `setLogout`, `logOut` and `resetGame` are the same statements in the same order. They differ only in two ways:
- each `let` of `startApp` is now a field of `memory`;
- the destructured `change`, `gameOf` and `shown` of `places` are now called as `places.change`, `places.gameOf` and `places.shown`.

Every value is still read at the moment of use, as before:
- `placeCard` reads `failed: memory.failed` when the card is made;
- `logOut` reads `memory.latest` after each `await`;
- `enter` narrows `memory.kept` and reads it in the same statement order.

The `OUTDATED` sentence, `signedOut` and `GameStart` moved to `page-game-acts.ts` with the same text.

**One record of memory, shared and never copied.**
- `startApp` makes one `memory` object (`src/browser/view/app.ts:412-421`).
- It puts the same reference into `page` (`:452-466`).
- `onUncaught`, `showReset` and `start` use that same `const` (`:428-434`, `:475-514`).
- Every module function takes `page.memory` or `memory` by reference.

A search for `...memory`, `...page` and `memory }` in `src/browser/view/*.ts` finds only `scene-memory.ts`, which is unrelated. No function copies the record.

**No import cycle.**
- `page-game-acts.ts` imports `page-places.js` (types only), `previous-save-lines.js`, `screen-address.js`, `game-view.js` (types only) and the simulation. It imports nothing of `app.ts`.
- `page-places.ts` imports nothing of `app.ts` or of `page-game-acts.ts`.
- The only importer of `view/app.js` in `src/` is `src/browser/main.ts`.

**Late calls into `page`.** `onLogout: () => logOut(page)` and `onRetry` in `createPagePlaces` (`:406-409`) name `page` before its `const` at `:452`. Neither can run before the player acts, so the temporal dead zone (the window in which a `const` exists but has no value yet) is never met. At the base the same callbacks reached the `let`s declared at `:169-186` in the same way. `onUncaught`, the one function `installLastResort` can call between `:446` and `:452`, uses `memory` and `places`, not `page`.

**Trust boundary.** The three files of the boundary are unchanged: `git diff --stat 7a16a73c..26c650cc -- src/browser/view/screen-address.ts src/browser/view/email-confirmation.ts src/browser/view/password-reset.ts` prints nothing, exit 0. Each call site, read at base and head, gets the same arguments and leads to the same result:

| Call | Base | Head | Same arguments and result |
|---|---|---|---|
| `screenAddress` | `app.ts:293-295` in `onPlace` | `page-game-acts.ts:66-68` in `onPlace` | `screenAddress(current.place.screen) !== screenAddress(next.screen)`; it decides `changed`, which empties `notices` (D-286) |
| `readResetToken` | `app.ts:609` | `app.ts:497` | `readResetToken(address.hash())`; a non-null token goes to `showReset` → `placeCard(page, null, { token, address, finished })`, then `return` with no request |
| `readConfirmationToken` | `app.ts:614` | `app.ts:502` | `readConfirmationToken(address.hash()) !== null`; „Potwierdzanie adresu…” through `places.change` |
| `confirmFromAddress` | `app.ts:619` | `app.ts:507` | `confirmFromAddress(client, address)` with the parameters of `startApp`; it sets `pendingNotice`, `focusCardOnForms` and `entry = "link"`, then the session check |
| `browserAddress` | `app.ts:152` | `app.ts:397` | the default of `address` |

I also tested crafted input at the boundary on both builds (script `review-3-crafted.mjs`, kept beside this report). I built the base in a worktree of `7a16a73c` and ran the same script on the base build and on the head build. It ran 27 cases on jsdom, through `startApp` with a held client and a test address:
- 7 confirmation fragments, each with 3 server answers:
  - fragments: an empty token, a token of 200 000 characters, a malformed token with a space, `%00`, `<`, `&`, `=` and a NUL, the key repeated, the confirmation key followed by the reset key, the key in another case, the key not at the start;
  - answers: refused `invalid-link`, no connection, confirmed;
- 6 reset fragments: an empty token, a token of 200 000 characters, a malformed token, the key repeated, the reset key followed by the confirmation key, a second `=`. Each was followed by „Anuluj” and the session check.

For each step the script recorded:
- every request with the length, head and tail of each string argument;
- how often the fragment was cleared and what was left of it;
- the page's text;
- the element holding the focus.

The two output files were byte-identical (`cmp` exit 0).
- A malformed, empty, repeated or oversized token goes unchanged to `confirmEmail` (lengths 0, 200000, 12, 109, 110). The fragment is cleared only after a definitive answer, and the card takes the focus only after a refusal.
- A key in another case or not at the start is no token, and only `currentAccount` is asked.
- A reset fragment sends no request until „Anuluj”, which clears the fragment, runs the check and focuses the card.

The page treats each case exactly as the base did. The summary is in `review-3-crafted-summary.txt`.

**The number of the last request and the logout (the executor's mutation A).** I read every place that increases the number:
- `checkSession` and `loadGame` call `waitForServer` at once, which changes the page to `checking`;
- the kept-state path of `enter` goes on at once to `loadFailed` or to `showGame`, and `showGame` changes the page through `leaveGame` (or to `stopped`).

So every increase takes the logout's game off the page in the same synchronous run, and `places.gameOf(view) === null` holds wherever `mine !== memory.latest` does. In the `ending` step, `whenNotBusy` holds the saver's conflict and no-session outcomes. The retry button and the card, the other ways to a request, are not shown while a game stands. A reset that succeeds during the logout increases nothing. So no path exists today, at base or head, where only the number stops a late answer to a logout. The check is a second guard over `gameOf`. That is why mutation A passes the tests.

The slice changed none of this: `logOut` reads and increases the one shared `memory.latest`. The gap in the tests is older than the slice, and the guard it leaves untested is redundant in today's code, so it is no finding of this slice (see *Declined to judge*).

**Places of the log lines.**
- `place=view/app.startFrom` stays in `recordLoadFailure` in `app.ts:75`, called from `startFrom` at module level.
- `"view/account-card.createAccountCard"` stays in `placeCard` in `app.ts:134`, through `page.lastResort.report`, the same `LastResort` object `installLastResort` returned.
- `tests/view/uncaught-failure.test.mjs` and `tests/view/previous-save.test.mjs`, which hold both places, pass.

**D-425 (`node tests/quality/eslint-size-rules.mjs`).**
- At head it names only `programs-entry.ts:81 createProgramsEntry (245)` and `programs-entry.ts:102 build (225)`: nothing of `app.ts`, `page-places.ts` or `page-game-acts.ts`.
- At base it named those two and `app.ts:149 startApp (371)`, so head names no place the base did not.

The executor's measured sizes (startApp 97, `app.ts` 373, `page-game-acts.ts` 156, `page-places.ts` 198) are consistent with this: no function or file of the three stands over a threshold. The plan's aim of about 150 lines for `startApp` is met with room to spare. The mark and comment of `test_no_function_and_no_file_is_over_a_threshold` are untouched, since the range does not change `tests/`.

**Guideline sentences (To do 7).**
- The changed sentences at `guidelines/coding-browser-module.md:298`, `:361-370` and `:391` match the code:
  - `logOut` is in `page-game-acts.ts` and saves through `saveBeforeLogout` before `client.logout`;
  - the eight values stand in `PageMemory` in `page-places.ts`, which `startApp` makes.
- The sentence lists all eight values, completing the six of the old one. The old one lacked `afterConflict` and `focusCardOnForms`, so it was already untrue of the base; completing it was the change the sentence needed.
- The sentences on `installLastResort` (`:393-399`) stay true, since `startApp` in `app.ts` still installs it and hooks `onLine` to `reportBrowserFailure`.
- The table "Files of this kind" got no row, as the plan and the task's *Out of scope* say.
- The one inexactness is Minor finding 1.

**Against the foundation.** The slice moves code and keeps:
- D-96, D-97, D-209, D-211, D-213, D-225, D-262, D-381, D-402, D-286, D-323 and D-253, statement for statement as at the base;
- D-407 (memory of the page given to the page's functions; roots unchanged);
- D-265 (no new DOM building).

The invariants `page-address-fragment`, `uncaught-failure-game-state` and `expired-session-unsaved-progress` hold. Their tests are among the focused runs, which pass, and the crafted run above covers the first. `cross-part-imports` holds: every import is inside `browser-view`. `eslint-source-rules` and `prettier-source-format` hold: the eslint and prettier runs exit 0. No invariant test changed.

**Against the guidelines.** Rules of `guidelines/coding.md` that the change reaches:
- Linter and Formatter: clean.
- Size of a function and a file: met.
- Recording a failure: the load's line keeps its place and its words, kind and code only.

`guidelines/styleguide-browser-view.md`: nothing drawn changes, no role, token, control or state. The guidelines of the browser module: the page still builds through the DOM only the header and the main block, in `createPagePlaces`.

**Reserved choice:** none. The slice adds no language, library, store or place to run.

**Tests:** the slice writes and changes no test. The tests that cover the moved behaviour pass at head. A test that would catch a copied memory record exists for `resetGame` (the executor's mutation B: 6 failures in `previous-save.test.mjs`). For `logOut` none can exist while the guard is redundant (above).

**Own-work check of the author:** it named the right weak point, the sharing of one record, and mutation B shows its check catches a split record for the reset. It reported mutation A's silence honestly and left open whether a path exists. The analysis above closes that question: no such path exists.

**Slice 2's `page-places.ts`, as far as this range touches it:**
- the new type `PageMemory`, its imports, and the one changed sentence of the comment on `PageState`;
- its field comments are the old comments of the `let`s, word for word;
- `PageState` itself is unchanged.

D-280 and D-286 bear on `onPlace`, which moved to `page-game-acts.ts` unchanged.

## Declined to judge

- The redundancy of the check `mine !== memory.latest` in `logOut`, and the lack of a test that fails when `logOut` stops sharing the number (the executor's mutation A). Out of scope: it stands the same at `7a16a73c`, the slice changes neither the guard nor the tests, and in today's code the guard has no path of its own to protect (analysis above).
- A reset started while a logout is in its `ending` step, followed by a confirmed logout that shows the forms over the new game. Out of scope: it is behaviour of the base, which the slice moves unchanged. The comment at `page-game-acts.ts:148-150` (`app.ts:521-522` at the base) shows it was weighed for the uncertain end.
- That `page-game-acts.ts`, like `page-places.ts`, has no row in the table "Files of this kind". Out of scope by the task's *Out of scope* and by the plan.

## Checks run

All run in the reviewed worktree at `26c650cc` unless named; no tracked file changed.

| Command | Exit |
|---|---|
| `git rev-parse HEAD` | 0, `26c650cc3f8365c8a59aa6aea40a192344185871` |
| `git diff --stat 7a16a73c..26c650cc -- src/browser/view/screen-address.ts src/browser/view/email-confirmation.ts src/browser/view/password-reset.ts` | 0, empty |
| `npm run typecheck` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/view/login-card-focus.test.mjs` | 0 |
| `npm test -- tests/view/owner-panel.test.mjs` | 0 |
| `npm test -- tests/view/previous-save.test.mjs` | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 |
| `npm test -- tests/view/screen-address.test.mjs` | 0 |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 |
| `npm test -- tests/view/password-reset.test.mjs` | 0 |
| `node tests/quality/eslint-size-rules.mjs` (head) | 0; names only `programs-entry.ts:81 createProgramsEntry (245)` and `programs-entry.ts:102 build (225)` |
| `node tests/quality/eslint-size-rules.mjs` (base worktree at `7a16a73c`) | 0; names `app.ts:149 startApp (371)` and the same two of `programs-entry.ts` |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| `node scripts/build.mjs` (base worktree) | 0 |
| `node review-3-crafted.mjs <head root> head.json` | 0, 27 cases |
| `node review-3-crafted.mjs <base root> base.json` | 0, 27 cases |
| `cmp head.json base.json` | 0, identical |

Manual checks:
- Each moved function was read against its body at the base (above).
- The places that increase the number of the last request were read for mutation A (above).

Not run: the full gate (`npm test` with no path), as the handoff says; it is the orchestrator's.

## Reaches beyond the dispatch

- `guidelines/coding-browser-module.md`, read whole: the slice changes it, and its sentences are to be judged against the code.
- `src/browser/view/screen-address.ts`: not read beyond the call; the call's arguments were compared at base and head.
- `tests/view/account-screen.test.mjs:60-130`, `:280-470` and `tests/view/page-document.mjs:80-160`: to build the crafted-input script on the same harness as the tests.
- `tests/view/password-reset.test.mjs:1-60`: to see which crafted fragments the tests already cover, so that the script would add page-level cases.
- `foundations/invariants.md`, the statements of `email-verification-nonblocking`, `account-client-requests`, `account-client-outcomes`, `player-password-login`, `player-self-registration` and `saved-state-http-exchange`, found by listing the invariants whose *Part* names `browser-view` (the slice's *Read* asks for those about confirmation, reset and the address). None is touched by a move with no change of behaviour.
- `package.json` and `scripts/test.py`, by grep: how the tests build `dist/`, to build the base the same way.

## Working copies

- `.runs/review-3/` held:
  - `app-base.ts`, `app.ts` at `7a16a73c`;
  - `checks.sh` with its logs `checks.log` and `detail.log`;
  - `crafted.mjs`, `head.json`, `base.json`, `summary.txt`, `head-run.log`, `base-run.log`, `base-build.log`;
  - the worktree `base/` of `7a16a73c`, with a directory junction `base/node_modules` to the task worktree's `node_modules`.
- Removed:
  - the junction first, with `rmdir`, so that the removal of the worktree could not reach the shared `node_modules`; `node_modules` was checked to stand afterwards;
  - then `git worktree remove --force .runs/review-3/base` and `git worktree prune`;
  - then the whole directory. `git worktree list` no longer shows it.
- Kept beside this report: `review-3-crafted.mjs` (the script) and `review-3-crafted-summary.txt` (one line per case).
- Not mine to remove: `dist/` in the task worktree and in the removed base worktree, written by the product's own build at each test run.
- No screenshot was taken.

## Unread material

- `guidelines/testing.md`: not read. The slice writes and changes no test, and this review reviews none. The tests were only run.
- `src/browser/view/game-view.ts:95-172` and `src/browser/view/account-card.tsx:56-109`: not read. The calls into them (`createGameView`, `createAccountCard`) were compared at base and head and pass the same arguments.

Everything else of the slice's *Read* was read whole:
- the task's passages (the whole frozen task);
- D-425, D-407, D-265, D-323 (as changed in `8ca21555`), D-262, D-381, D-96, D-97, D-209, D-211, D-213, D-225, D-402, D-281, D-286, D-356, D-253;
- the invariants `page-address-fragment`, `uncaught-failure-game-state`, `expired-session-unsaved-progress`, `function-and-file-size`, `cross-part-imports`, `eslint-source-rules`, `prettier-source-format`;
- `foundations/part_map.md:3-32`;
- `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`;
- `src/browser/view/last-resort.ts`, `email-confirmation.ts`, `password-reset.ts`.

## Searches not found or unclear

- No test fails when `logOut` works on a copy of the memory (the executor's mutation A). This review found no path that such a test could take (above).
- None other.
