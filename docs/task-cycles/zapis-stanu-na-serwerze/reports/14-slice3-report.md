# Slice 3 report — the save routes

**Status:** done

**Commit:** `fc6540c` (base `bbf6ad2`), on `task/zapis-stanu-na-serwerze`.

## Files changed

- `src/server/account-routes.ts` +117/-1: `GET` and `PUT /api/saved-game` in `paths`; `accountBodyLimit` 16 KiB, `savedGameLimit` 64 KiB; `saveFields`, `saveTooLarge`.
- `src/server/transport.ts` +7/-2: `mutationGuards(publicOrigin, bodyLimit)`, limit required.
- `tests/http.test.mjs` +453/-3, `tests/transport.test.mjs` +243.

## Checks (command, exit code)

- `npm test -- tests/http.test.mjs`: 0 (39 pass). First run with the isolation case alone and no route: exit 1, assertion `{error:'Not found'}` vs `{save:null}` (expected reason).
- `npm test -- tests/transport.test.mjs`: 0 (10 pass).
- `npm test -- tests/invariants/test_loop2_api_error_route.py`: 0.
- `npm test -- tests/invariants/test_account_server_express_http.py`: 0.
- `npm test -- tests/invariants/test_account_server_typecheck.py`: 0.
- `npm test -- tests/quality/test_quality_invariants.py`: 0 (eslint, prettier, ruff cover the new code).
- Not run: the full gate (`npm test` with no argument), per the handoff.
- Invariant tests marked in this slice (`player-save-isolation`, `account-session-authorization`, `blocked-account-access`, `account-mutation-request-guards`, `account-request-transport`) pass as written; the routes did not exist before, so the "seen failing" run is the isolation case above. Mutation seen failing: save route given the 16 KiB limit made the transport save-route test fail (exit 1), then restored.

## Behaviour as built

Order in PUT: guards (Origin, media type, no compression, 64 KiB, object) -> exact fields/types (400 `invalid-request`) -> session of non-blocked account (401 `unauthenticated`) -> `JSON.stringify(game)` (throws on nesting too deep -> 400) -> stored bytes > 65 536 (413 `save-too-large`) -> `writeSavedGame` (blocked -> 401; `save-outdated`, `save-conflict` 409; saved -> `{revision}`). GET embeds the stored text unchanged inside `{"save":{version,revision,game}}`, `{"save":null}` with no row. A body over the body limit gets the app error handler's 413 `{error}` without `code` (same as the other routes).

## Own-work check

Requirement most likely unmet: "stored text measured in bytes after re-serializing, not the request text". Test: a game whose request is within 65 536 bytes but whose stored text (`1e21` -> `1e+21`, "ą" 2 bytes) is 66 596 bytes and 36 602 characters gets 413 and stores nothing; stored text of exactly 65 536 bytes is saved, 65 537 refused. Passed. Second: a block committed between session check and write (hook on `writeSavedGame`) gives 401 and stores nothing. Passed.

## Choices

- GET embeds the stored text as is, without parse and re-serialize (keeps D-07: the server reads nothing inside `game`). Cost if wrong: a corrupted stored text would give an invalid JSON answer; the stored text is only ever written from `JSON.stringify`.
- Nesting too deep to serialize (30 000 levels fit in 64 KiB; `JSON.stringify` throws RangeError) is answered 400 `invalid-request`, not 500. The spec names no code for it.
- Test fixture hook in `tests/http.test.mjs`: the database proxy now also hooks `writeSavedGame` (`hooks.beforeSave`) next to `issueLink`.
- Added `GET` and `PUT /api/saved-game` to the unconfigured-503 list of the existing test (transport row, six to seven paths).

## Reach beyond the dispatch

None beyond the read list; `.the-way/task-cycle/change/slice.md` read as the method names it.

## Searches not found or unclear

none

## Mismatches / concerns

- Plan *Checks* name `npm test -- <file>` per file; used as written. No full gate run.
- `guidelines/testing.md` and `guidelines/coding-browser-module.md` changes named in spec decision 10 are not in this slice's *Change* list; not touched.
