PASS 41d80c2e9e97d9e1285c28717ead146df6f21b37

# Slice 2 review — the routes, the reset and the privilege in the account body

Range reviewed: `4e1decb2..41d80c2e` (one commit, `41d80c2e`). `git rev-parse HEAD` in the worktree was `41d80c2e9e97d9e1285c28717ead146df6f21b37`, the head given. The handoff says "base of this slice: 41d80c2e" in its header line, but its review section and the executor's report both give the range base `4e1decb2`; I used `4e1decb2..41d80c2e` as the review section says.

Counts: blocking 0, Minor 4, out of scope 0.

## Findings

### Critical
None.

### Important
None.

### Minor

**M1. The order "empty-object check before the session" is not pinned by a test.**
`src/server/account-routes.ts:574-583` (the reset handler). The spec's order is guards, empty-object body, session, database write. The code does this. No test sends a field without a session, so a handler that checked the session first would pass every test. I did not run that swap; I reasoned from the test list: the 401 case sends only `{}`, and the 400 cases all carry a valid session. Effect if wrong: an unauthenticated caller with a field would get 401 instead of 400. Both are refusals and nothing leaks or changes, so this is coverage only. Place: `tests/http.test.mjs` cases "no session, a forged..." and "a reset with any field...".

**M2. The executor's report misdescribes what a vanished account does on the reset.**
The report says the `Unknown account` throw of `resetSavedGame` reaches "Express's default error answer". It does not. `src/server/app.ts:93-127` installs an error handler that writes a failure line (`writeFailure("request", "app.errors", ...)`) and answers JSON 500 `{"error":"Account service failed"}` with `Cache-Control: no-store`, the same answer the save route gives for a thrown `writeSavedGame`. So the route answers a JSON failure as the save route does, and the choice not to catch is right. No test drives that path for the reset (nor for the save route); `grep` of `tests/*.mjs` finds `Unknown account` only in `tests/account-storage.test.mjs:1011`. The path is also unreachable in practice: `src/` holds no `DELETE FROM accounts`, and a session row cascades with its account, so a session of a vanished account is found as none and the route answers 401 before the write. Effect: a wrong sentence in a report, no defect in the code.

**M3. The Trust-boundaries row of `src/server/` in `guidelines/testing.md:172` names six of the seven new HTTP-level case titles.**
The case "the reset moves the save to the previous slot and answers 204, a second reset changes nothing, and a card on another revision then gets the conflict" (`tests/http.test.mjs`) is not listed. It carries the `previous-save-slot` marker and tests D-396 and the D-209 conflict after the reset, which the row's invariant text covers only through the other cases. The handoff says the row carries "the case titles written here"; the plan's list was not given to me beyond the handoff's passage, which names that case among the tests. Effect: a reader of the row does not find the test of the move itself. Cheap to add.

**M4. The invariant list and the decision list of the Trust-boundaries section gained identifiers beyond the rows the plan names** (`guidelines/testing.md:152-153`: `D-393 · D-394 · D-395 · D-396` and `previous-save-slot`). The handoff asks me to judge it. I judge it fine: both lists are the section's index of what its rows test, `previous-save-slot` is exercised by the new rows and `D-393..D-396` are the decisions the new rows cite in the who-may table. It adds no rule. Graded Minor only because it goes beyond the plan's named edit; I would keep it.

## Reading against the task, spec and foundation

- Task point 2 and 5 (privilege covers the pull and the reset): both routes check the privilege; the reset reads it in the same transaction as the move (`src/server/database.ts` `resetSavedGame`, slice 1), the read route reads it from the account fetched at that request by `sessionAccount` (`findAccountById`, not a cached session value). Revoking it stops the next request: the test "…the privilege off stops the reads and keeps the slot" revokes, expects 403 on both routes with the slot row unchanged, grants again and reads the slot.
- Order of checks, `GET /api/previous-saved-game` (`account-routes.ts:550-568`): transport gate (router `all`, because both paths are in `paths`), session (blocked account is `null` from `sessionAccount`, so 401), privilege (403 `previous-save-forbidden`), read. Matches spec decision 1. The 403 body is one fixed sentence and code, built by one helper used by both routes, and is reached before the slot is read, so it tells nothing of the slot. The test "an account without the privilege gets 403 … whatever its slot holds" compares an account with a filled slot and one without, both 403 with the same code.
- Order of checks, `POST /api/saved-game-reset`: transport gate, `mutationGuards` with `accountBodyLimit` (the same 16 KiB as the other small routes, `account-routes.ts:405-418`; Origin, JSON media type, no compressed body, object, 413 over the limit), empty-object check, session, one database write with four outcomes mapped: moved 204 plus event, nothing-to-move 204 with no event, blocked 401, unprivileged 403. Matches decision 1. The transport test covers missing and foreign Origin, text media, gzip, over 16 KiB, empty body, array, `null`, a field naming an account, and the transport gate before the session; each leaves both tables byte-equal.
- No field of a request names an account: neither handler reads the body beyond `Object.keys(...).length`, the query or any header. The test "a reset with any field … no request names an account" sends `X-Account-Id` and a query naming the second account on both routes; the second account's rows are unchanged and its read answers `previous: null` while the first holds a slot.
- Privilege revoked between page load and request, and a block between the session check and the write: the second is tested with a hook that blocks the account inside the call (`beforeSavedReset` on the proxy); the reset answers 401 and moves nothing.
- The account body (`accountBody`, used by `GET /api/account`, login and registration) gains `previousSaveAllowed` and nothing of the slot. About twelve existing `deepEqual` expectations gained the field.
- Business event: `writeEvent("saved-game-reset", { accountId })`, only for `moved`. The test counts lines named `saved-game-reset` across a reset, a second reset and a later save: one line, exactly `{event, accountId}`. The existing event-list test gained the line. Adding another field is also a compile error (`LineFields` has no `email`: my mutation M9 did not build). The event name is added to `guidelines/coding.md` *Logging scope*.
- The answer of the read route embeds the stored text as `GET /api/saved-game` does, with exactly `version` and `game` in an object, or `{"previous":null}`; `null` is a 200 as D-204's reason requires; no revision. Tested for status, JSON type, `no-store`, and the exact keys.
- Invariants read whole and judged against the change: `account-session-authorization` (the two routes are listed, 401 JSON for no session, forged, unsigned, unknown, removed, blocked and blocked-then-unblocked cookie, all tested), `account-mutation-request-guards`, `blocked-account-access`, `player-save-isolation`, `saved-state-http-exchange` (browser part, untouched by this slice), `previous-save-slot`. The code does what each says. The invariant text of `previous-save-slot` ("moves ... only at an accepted save of a higher version and at the reset") is tested in the privileged-read case (same version fills no slot; version 2 then 3 move the stored document; a second move replaces the first).
- Foundation entries the change writes: the glossary entries for "previous save" and "previous-save privilege" match how the routes use the words. No difference between the spec and the entries found in what this slice touches.
- Reserved choice: none taken; no new library, store or way of logging in.
- Test titles carry the markers E15, E17 and E19 (`account-session-authorization`, `player-save-isolation`, `previous-save-slot`, plus `blocked-account-access`, `account-mutation-request-guards`, `account-request-transport`).
- Changed existing tests, named as the method asks: the account-body expectations of `account-session-authorization` and registration/login cases in `tests/http.test.mjs` gained `previousSaveAllowed: false`; the "each business event of the server …" case gained a grant, a save and a reset and the expected `saved-game-reset` line; the unconfigured-routes case gained the two routes; the fixture gained the `beforeSavedReset` hook. None weakens an assertion (read in `git diff`).
- Screenshot files in the range: none.
- Guidelines the slice writes: `guidelines/coding.md` gets one list item in the same form as its neighbours. `guidelines/testing.md` gets four rows in the who-may table and edited cells of the `src/server/` row, in the file's existing form (Polish text with English case titles); I compared them with the neighbouring rows, not with `product-guidelines/template.md`, because the slice adds rows to existing tables and no new guideline file.

## Declined to judge

- The browser side (client, view, reader) of this feature: other slices.
- The two Minor findings M1 and M2 of slice 1: the handoff puts them with the whole-change review.
- Prettier form of the two markdown guideline files: the executor says they were not prettier-clean at base; not checked by me.

## Checks run

| Check | Command | Result |
|---|---|---|
| http | `npm test -- tests/http.test.mjs` (in the reviewed worktree) | exit 0, 95 of 95 pass |
| transport | `npm test -- tests/transport.test.mjs` | exit 0, 12 of 12 pass |
| typecheck | `npm run typecheck` | exit 0 |
| `git rev-parse HEAD` and `git status --short` at the end | | head `41d80c2e...`, status empty (the runs only wrote ignored `dist/`) |

Mutation checks on `src/server/account-routes.ts` in a scratch copy outside the repository (a copy of the tree without `.git`, with `node_modules` joined; script `scratchpad/mutate.py`; each mutant built with `node scripts/build.mjs`, then `node scripts/test-node-file.mjs` on both test files; "1" is the exit code of the test file, i.e. the mutant was caught):

| Mutant | http | transport |
|---|---|---|
| M1 the read route skips the privilege check | caught (1) | 0 |
| M2 the reset accepts a body with fields | caught (1) | caught (1) |
| M4 the event is also written when nothing moved | caught (1) | 0 |
| M5 the account body drops `previousSaveAllowed` | caught (1) | 0 |
| M6 the reset route leaves the mutation guards | caught (1) | caught (1) |
| M8 the reset answers 204 to an account without the privilege | caught (1) | 0 |
| M9 the event line carries the email | did not build (TS2353: `LineFields` has no `email`), so it cannot happen silently | n/a |
| M10 the read answers an invented object instead of `null` | caught (1) | 0 |
| M11 the reset answers 204 to a blocked account | caught (1) | 0 |

Not run: the product's gate (`npm test` without a file) and `foundation_check.py`, which the handoff reserves for the orchestrator; a mutant swapping the field check and the session check (see Minor M1); a mutant removing the transport gate for the new paths from the `paths` table (the unconfigured-routes 503 case and the transport test would be the catchers; I did not run it); any test of a vanished account on the reset (see Minor M2).

## Reach beyond the handoff

- `src/server/app.ts:40-127` — read to see how an error thrown by a route is answered (the `errors` handler), for the question on the vanished account.
- `src/server/account-routes.ts` around lines 75-102, 380-420, 490-545 — the session helper, the router's gate and guards, and the save route, to compare the new handlers with the save route.
- `src/server/database.ts` `readStoredGame`, `writeSavedGame`, `movePreviousSave`, `resetSavedGame`, `setPreviousSavePrivilege` (about lines 640-810) — slice 1 code the routes call, read to judge the mapping of outcomes and the block/privilege order.
- `scripts/test.py` and `package.json` — to see what `npm test -- <file>` runs and where it writes.
- `grep` of `src/` for `DELETE FROM accounts` and of `tests/*.mjs` for `Unknown account` — for the vanished-account question.
- `git ls-files --eol` on four changed files — line endings are LF as the index has them.

## Unread material

- The handoff's passages of the task, the spec and the plan: read whole as copied in the handoff; I did not open `.runs/.../task.md`, `spec.md` or `plan.md` myself except a line of `plan.md` found by a search (the slice 1 goal, for context).
- Foundation entries: the invariants `account-session-authorization`, `account-mutation-request-guards`, `blocked-account-access`, `player-save-isolation`, `saved-state-http-exchange`, `previous-save-slot` and the glossary entries `previous save` and `previous-save privilege` were read whole. D-104 I read as far as the first rationale paragraph (the first part of its text up to its *Rejected* line start; the long tail of the line was cut by my output filter). Not read whole: D-02, D-109, D-137, D-202, D-204, D-209, D-210, D-393, D-394, D-395, D-396 and the part-map entry `account-server`; I judged the routes against the spec's text of decisions 1 to 3 and the invariants instead, which restate D-104, D-109, D-137, D-202, D-204 and D-393 to D-396 for these routes.
- `guidelines/coding-http-application.md`: read whole (it is short). `src/server/transport.ts` read whole as far as `mutationGuards` (it ends there). `src/server/log-line.ts` read only through a grep of `event` (the `writeEvent` signature, line 82); not whole.
- `guidelines/testing.md` and `guidelines/coding.md`: read the changed hunks and their neighbouring rows and sections (testing lines 148-210, coding lines 170-235); not whole.
- `tests/http.test.mjs` and `tests/transport.test.mjs`: read the whole diff of each, not the files; the fixtures I know from the diff and the executor's description only.

## Searches not found or unclear

- None found missing.
- Unclear: the plan's wording "the line `src/server/` with the case titles written here" does not say which titles the row must list; I judged it by the handoff's list of cases (finding M3).
- Unclear: the handoff's header names `41d80c2e` as the "base of this slice" while its review section gives the range `4e1decb2..41d80c2e`; I used the second.
