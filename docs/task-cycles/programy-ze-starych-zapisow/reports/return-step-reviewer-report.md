PASS cbd094a05bfabcb0e36dc1762d55a32bb148be22

# Review of the return step, `5fe76674..cbd094a0`

`git rev-parse HEAD` in the worktree is `cbd094a05bfabcb0e36dc1762d55a32bb148be22`, the head given. `git log 5fe76674..cbd094a0` shows the one commit `cbd094a0`; `git diff --stat` shows `tests/view/previous-save.test.mjs`, 2 insertions, no deletion. The worktree is clean (`git status --short` empty).

## Findings

Blocking: none. Minor: none. Out of scope: none.

### What I checked and found right

1. **No behaviour changed.** The diff is two comment lines, `// invariant: save-version`, above the tests at lines 280 and 774 of `tests/view/previous-save.test.mjs`. Nothing else moved. The file's 44 tests pass (check 1).

2. **The marker form is the one the check and the other tests use.** `foundation_check.py` reads a comment line `invariant: <identifier>` (the `CITATION` pattern, line 101-102 of `.the-way/elements/common/foundation_check.py`). Other files place the line the same way directly above the test: `tests/sim/saved-game.test.mjs:910`, `tests/sim/previous-programs.test.mjs:380`. `tests/view/clock.test.mjs:246-247` also has the marker above a further comment line before the test, as the two new markers sit above their `Catches` comment. The foundation check is clean (check 2).

3. **The two tests show the privilege clause of `save-version`** ("except the programs that an account with the previous-save privilege pulls ... one by one"). I read both tests whole and the code they reach (`src/browser/view/game-view.ts:949-960`, `askPrevious`; `src/browser/view/app.ts:421,428`; `src/browser/view/account-card.tsx:210-212`).
   - Test at line 281 ("an account without the flag, or with it false, never asks and has no button"): the client given has no `loadPreviousSavedGame`, so without the guard `options.previousSaveAllowed !== true` in `askPrevious` the call throws inside the view build; it also asserts no button, no line and no save, across two screen changes. It fails if the page offers the pull to an unprivileged account.
   - Test at line 775 ("the page gives the game the account's flag"): through `startApp`, an account answer with the flag true, false or missing; the question for the previous save is asked once for true and never for false or missing, and the button stands only after a document is answered for true. It fails if the flag is not passed on, or is passed wrongly. Its `true` branch also shows the positive side: the privileged account asks and gets the button.
   - Together they show "only the account whose flag is set asks and is offered the pull". The other half of the exception, "each accepted only through the check of the program editor", is already cited by `tests/sim/previous-programs.test.mjs` (markers at lines 380, 398, 455, 606) and the reader's tests; the server's 403 for an account without the privilege is cited by `previous-save-slot`, not by `save-version`, and the decision D-394 carries it. I judge the citation honest: the two tests are not decoration. I did not run the mutation myself (see Reach and Unverified); I read the guard and the tests, and the removal of the guard makes the first test throw and the second count one question where it asserts none, so the report's claim of 2 failing tests of 44 is consistent with the code.

4. **Nothing else of the foundation needs a correction, in the claims I selected.**
   - D-393 to D-396 (read whole): `src/server/database.ts:700-770` writes the previous save only in `writeSavedGame` (after the blocked, outdated and conflict checks, and only `stored.version < save.version`) and in `resetSavedGame`; `resetSavedGame` reads blocked, then privilege, then the current save in one transaction and answers `blocked`, `unprivileged`, `nothing-to-move` or `moved`; the move is SQL over the stored row (D-07). `src/server/account-routes.ts` has both paths (`/api/previous-saved-game`, `/api/saved-game-reset`) and the code `previous-save-forbidden`. `src/browser/view/game-view.ts:949-975` has the flag guard for the pull and for the reset control, as D-394 and D-396 say.
   - D-112: "version 5" equals `schemaSteps.length` (`database.ts:95,160`; ten statement strings in the array, which I did not map one to one to five steps; I relied on the constant and on the report's description). Its sentences about the reset and the move match `resetSavedGame` and `writeSavedGame` above.
   - D-44 (read whole): the destructive „Zacznij od zera” and the „Wciąganie…” label are listed; I did not open `program-list.tsx` for the label (see Unread material), only the tests that name the string `Wciąganie…` (`tests/view/previous-save.test.mjs`, `waitingButton`).
   - Part map: `account-server` names the privilege command and the previous save (`foundations/part_map.md:65`); `src/browser/sim/previous-programs.ts` is in the trust boundary list (line 61). Glossary: `previous save` and `previous-save privilege` entries exist (`foundations/glossary.md:254-262`) and are used as given in D-393 to D-396.
   - The report's noticed-not-fixed item is real: the comment at `src/server/account-routes.ts:63` still says "the six small routes". It is a comment in product code, not a foundation entry and not in my range; I record it as outside the task (below).

## Declined to judge

- The comment `src/server/account-routes.ts:63` ("the six small routes"), out of the range and not a foundation entry; the whole-change fix report already notes it.
- Whether the other return-step claims about D-206, D-104, D-109, D-210, D-167, D-169, D-252, D-253, D-354, D-355 (not mine to select) hold in every sentence; I did not read those entries.

## Checks run (all in `the task's worktree`)

1. `npm test -- tests/view/previous-save.test.mjs`: exit 0, 44 tests, 44 pass, 0 fail.
2. `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
3. `git rev-parse HEAD`, `git log 5fe76674..cbd094a0`, `git diff 5fe76674..cbd094a0`, `git diff --stat`, `git status --short`: exit 0, as described above.
4. Not run: the mutation (removing the guard of `askPrevious`) — it needs a changed file; the review's rule is a separate worktree, and I judged reading the guard against the two tests enough for a two-line comment change. The report's own mutation run is therefore unverified by me. Not run: the full suite (the cycle's gate).

## Reach beyond the handoff

- `.the-way/elements/common/foundation_check.py` lines 1-110 by grep and one section read (the `CITATION` pattern and the rule at line 66), to confirm the marker form.
- `tests/sim/saved-game.test.mjs:905-925`, `tests/sim/previous-programs.test.mjs:376-384`, `tests/view/clock.test.mjs:243-250`, for the marker layout used elsewhere.
- `foundations/invariants.md` the entry `save-version` (read whole), and `guidelines/testing.md:153` by grep (the rule's list of invariants names `save-version`).
- `src/server/database.ts:700-770`, `src/server/account-routes.ts` by grep, `src/browser/view/game-view.ts:940-975`, `app.ts`, `account-card.tsx` by grep: to check the guard and the server side of the claims.
- `foundations/part_map.md` lines near `account-server` and `previous-programs.ts` by grep; `foundations/glossary.md` the two entries by grep.
- `docs/task-cycles/programy-ze-starych-zapisow/task.md` by grep for `save-version` (line 90) only.

## Unread material

- The handoff and the return step report: read whole. The `the-way-review-change` method file `.the-way/task-cycle/review/SKILL.md`: read whole. D-393, D-394, D-395, D-396, D-44 and D-112: read whole.
- `docs/task-cycles/programy-ze-starych-zapisow/task.md`: not read whole (114 lines); I read the line naming `save-version` only. The return step's claim about the task's own entries D-07, D-137, D-209, D-213, D-96 was not checked.
- Not read: D-206, D-104, D-109, D-210, D-167, D-169, D-252, D-253, D-354, D-355, D-209, D-137; the invariants `previous-save-slot` and `previous-save-programs-reader` (only their markers by grep); `src/browser/view/program-list.tsx`, `src/server/account-previous-save.ts`, `src/browser/sim/previous-programs.ts`, `src/browser/sim/programs.ts`; the whole of `tests/view/previous-save.test.mjs` (I read lines 1-330 and 760-830).
- The guideline files `guidelines/testing.md` (only the line 153 hit) and the others: not read whole; the change is two comment lines and no rule of the guidelines reaches a marker line beyond the form the foundation check enforces.

## Searches not found or unclear

- Not found: a rule in `guidelines/testing.md` or the foundation that says where, relative to a test's other comment lines, the `invariant:` marker must stand; the check reads any comment line, and the existing files differ (marker first or after a comment). The two new markers stand first, as in `tests/view/clock.test.mjs:246`.
- Unclear: whether `save-version`, whose *Part* is `simulation`, may be cited by view tests; the foundation check accepts it and `testing.md:153` lists `save-version` without a part restriction, so I read it as allowed.
- Unclear: the report's rule "a test of an invariant is seen failing once" for a marker added to an existing test; I did not decide it, since I did not repeat the mutation.
