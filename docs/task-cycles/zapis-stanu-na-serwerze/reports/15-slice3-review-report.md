PASS fc6540c3a8b958d369c960db6f675d3a58e22595

# Slice 3 review — the save routes

- Range: `bbf6ad2..fc6540c`, one commit `fc6540c`; `git rev-parse HEAD` in the worktree is
  `fc6540c3a8b958d369c960db6f675d3a58e22595`, matching the dispatch. Files: `src/server/account-routes.ts`,
  `src/server/transport.ts`, `tests/http.test.mjs`, `tests/transport.test.mjs` — the plan's *Change* exactly.
- Method: `.the-way/task-cycle/review/SKILL.md`, review of a planned slice.
- Counts: blocking 0 · Minor 3 · out of scope 0.

## Findings

### Critical

None.

### Important

None.

### Minor

1. **`src/server/account-routes.ts:353-357` — the PUT's own block check before the size check is
   not held by any test.** Spec decision 1 orders "a valid session of a non-blocked account, else 401"
   before "the stored text ... else 413". Mutation M2 (the PUT's `sessionAccount` replaced by a lookup
   that ignores `blocked`) passes all of `tests/http.test.mjs`, because the write transaction's block
   check answers 401 for every body the tests send. The difference shows only for a blocked account
   whose session row survived the block *and* whose game is over 65 536 bytes or too deep to
   serialize (413 / 400 instead of 401). `blockAccount` deletes the sessions in the same transaction
   (D-137), so this needs an artificial row such as the test's "a row past the block"; nothing is
   stored either way. Effect on a user: none today. Adding the oversized body to the "a row past the
   block" case would pin the order. Not blocking.

2. **`src/server/account-routes.ts:335-341` — GET embeds the stored text as it is; validity of the
   answer rests on the one writer.** Judged as the handoff asked: today the answer is always valid JSON
   and can carry nothing the stored text was not. The only writer of `saved_games.game` is this
   route, which stores `JSON.stringify` of a parsed non-null, non-array object — always a JSON object
   text, with lone surrogates escaped (checked: `JSON.stringify(JSON.parse('"\\ud800"'))` gives the
   escape), so `{"save":{...,"game":<text>}}` is a single well-formed object; `version` and
   `revision` are checked safe integers in `readSavedGame` (`src/server/database.ts:501-517`). The
   cost: `writeSavedGame` (`src/server/database.ts:528-536`) accepts any string and the schema
   (`src/server/database.ts:101-107`) has no `json_valid(game)` check, so a later caller writing a
   non-JSON or non-object text would make GET return invalid JSON or inject sibling keys
   (`{}},"x":{` closes `save` early). Mutation M14 (game returned as a string) is caught by four
   tests, so a broken embedding is visible. A guard would lie in Slice 2's file, outside this range.
   Not blocking.

3. **`src/server/app.ts:69-87` with `src/server/transport.ts:86-92` — two shapes of 413 on the save
   route.** A body over 65 536 bytes gets the app error handler's `{ "error": "Invalid request body" }`
   with no `code`; a stored text over 65 536 bytes gets `{ "code": "save-too-large", ... }`. The
   spec's client outcome reads "too large (the server's 413 ...)" (`spec.md:268`), i.e. by status, and
   spec decision 3 keeps "the server's own 413 ... for a body that reaches it over the limit", so this
   matches the spec; it only means Slice 4's client must not require `code` on a 413. The executor
   reports it openly. Not blocking.

## Against the task, spec and plan

- Paths, methods, answers and exact fields: `GET` gives `{"save":null}` or
  `{"save":{"version","revision","game"}}`; `PUT` takes exactly `version` (safe integer ≥ 1),
  `basedOn` (safe integer ≥ 0), `game` (object, not null, not array) and answers `{ "revision" }`
  (`account-routes.ts:154-175`, `:328-401`). Codes `unauthenticated` 401, `invalid-request` 400,
  `save-too-large` 413, `save-outdated` and `save-conflict` 409 — as spec decision 1.
- Order in PUT: guards (`account-routes.ts:312-315`, registered before the handler) → fields → session
  → serialize → stored bytes > 65 536 → `writeSavedGame` (block, then version, then revision, in one
  transaction; `database.ts:538-561`). Version before revision is held by the contract test
  (mutation M16 and the `save(2, 2)` case).
- No request field names an account: an extra field is 400; query and header identifiers select
  nothing (isolation test; mutations M5, M6, M7 caught).
- Stored text measured in UTF-8 bytes after re-serializing, ≤ 65 536 accepted: test with `1e21` →
  `1e+21` and `ą`, exact boundary 65 536 / 65 537 (mutations M3, M4 caught). The DB's own
  `length(CAST(game AS BLOB)) <= 65536` agrees with `Buffer.byteLength` because the stored text has no
  lone surrogates.
- `mutationGuards(publicOrigin, bodyLimit)`: limit required; 64 KiB for `PUT /api/saved-game`, 16 KiB
  for the five POST routes; Origin, media-type, compression and object checks shared (spec
  decision 3; D-104 as now written). Mutations M8 and M9 caught.
- The save path joins `paths`, so `router.all(Object.values(paths))` puts it behind the transport check
  and `Cache-Control: no-store` (mutation M13 caught); the unconfigured-503 test lists both routes.
- Deep nesting (`JSON.stringify` RangeError) answered 400 `invalid-request`: the spec names no code;
  400 is the reasonable reading for a body the server cannot keep, and better than D-109's forbidden
  exposure of a stack through a 500 path (the 500 handler exposes none anyway). Held by a test
  (mutation M10 caught).

## Hostile input at the trust boundary

Checked by reading and the tests, with scratch evaluation where noted:

- Origin missing, null, foreign, suffixed, with path, duplicated; wrong, parameterized or missing
  media type; `gzip` and duplicated `Content-Encoding`; body over 64 KiB; empty, broken, array, null,
  scalar bodies — each refused with nothing stored and no new cookie (`tests/transport.test.mjs`
  new case).
- Missing, foreign-key, unsigned, unknown, removed sessions; an account identifier as the session id;
  a blocked account's session, a session row inserted after the block, and after unblocking — JSON 401
  on both routes, nothing changed; a block committed between session check and write → 401, nothing
  stored (mutations M1, M15 caught).
- Types: strings, null, booleans, arrays, fractions, `2**53`, `1e300` for `version` / `basedOn`;
  null, array, string, number for `game` — 400. `-0` as `basedOn` parses to a value equal to 0 and is
  treated as "no save seen" (scratch: `Number.isSafeInteger(-0)` true, `-0 < 0` false) — harmless.
- `__proto__`: `JSON.parse` makes it an own key, so a top-level `__proto__` holding `game` leaves
  `record.game` undefined → 400; inside `game` it is kept and returned (scratch evaluation).
- `1e400` inside `game` parses to `Infinity` and is stored as `null`: the server stores the text it
  serializes from the parsed value, as spec decision 1 says; the browser never sends such a number.
- The server reads nothing inside `game` beyond "is an object" (D-07 complies example).
- Proxy metadata missing, `http`, list or duplicated `X-Forwarded-Proto` / `CF-Connecting-IP` — 403 on
  both routes before the session, nothing read or changed (`account-request-transport` case).

## Tests against the guidelines

- Real HTTP and SQLite, as `guidelines/testing.md` § Choosing the level and § Trust boundaries want;
  each refusal test is marked with its invariant (`player-save-isolation`,
  `account-session-authorization`, `blocked-account-access`, `account-mutation-request-guards`,
  `account-request-transport`) and was seen failing under a mutation in this review (table below).
- Expected values come from spec decision 1 and 3 and from arithmetic written in the comments
  (byte counts of the 413 case), not from product output; refusals are checked by `code`, which is
  contract, not by the message text.
- Changed existing test: the unconfigured-503 case gains two rows (more coverage, nothing weakened);
  the fixture's database proxy gains a `writeSavedGame` hook beside `issueLink` — no assertion of an
  earlier case changes. No invariant test outside these files changed.

## Own-work check

The executor named "stored text measured in bytes after re-serializing" as most likely unmet and the
block between session check and write as second. Both are where this slice is weakest; both checks
would catch the requirement unmet (mutations M3, M4, M15 confirm). The weaker spot it did not name is
finding 1.

## Declined to judge

- `guidelines/testing.md` (D-109, D-137, D-104 rows and the transport count of paths) and
  `guidelines/coding-browser-module.md` changes of spec decision 10 — planned for Slices 7 and 8, not
  this range.
- The browser client's handling of 413 without `code`, of 401, conflict and outdated — Slices 4–6.

## Checks run

All in a scratch worktree of `fc6540c` (detached, `node_modules` and `.runs/quality-venv` joined to the
reviewed worktree's by junction, removed after), except the foundation check.

| Command | Exit |
|---|---|
| `npm test -- tests/http.test.mjs` | 0 (39 pass) |
| `npm test -- tests/transport.test.mjs` | 0 (10 pass) |
| `npm test -- tests/invariants/test_loop2_api_error_route.py` | 0 |
| `npm test -- tests/invariants/test_account_server_express_http.py` | 0 |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (first run 1: ruff and shellcheck not found in the scratch worktree before the venv junction; ESLint and Prettier passed) |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, `.the-way` at the recorded `a8dfe8a`) | 0, "0 errors" |

Mutation analysis (each applied alone, the named test file run, the source restored; runner
`scratchpad/tools/mutate.py`):

| Mutation | Test file | Exit |
|---|---|---|
| M1 GET ignores the block | http | 1 |
| M2 PUT session check ignores the block | http | 0 — survived, finding 1 (near-equivalent: only observable for a session row surviving a block) |
| M3 stored size counted in characters | http | 1 |
| M4 stored size `>=` | http | 1 |
| M5 no exact key count | http | 1 |
| M6 GET row from `?accountId` | http | 1 |
| M7 PUT row from `?accountId` | http | 1 |
| M8 save route given 16 KiB | transport | 1 |
| M9 one 64 KiB limit for every route | transport | 1 |
| M10 deep nesting answered 500 | http | 1 |
| M11 negative `basedOn` accepted | http | 1 |
| M12 `version` 0 accepted | http | 1 |
| M13 save path outside the transport gate | transport | 1 |
| M14 GET returns `game` as a string | http | 1 |
| M15 a block in the write answered 200 | http | 1 |
| M16 conflict answered as outdated | http | 1 |

Not run: the full gate (`npm test` with no argument), per the dispatch — left to the cycle.

## Reach beyond the dispatch

- `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:255-290` (decision 6, the saver's outcomes) — to
  see whether the client reads 413 by status or by `code` (finding 3).
- `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md` slice headings and *Change* lines — to place the
  guideline changes of spec decision 10 in Slices 7 and 8 (Declined to judge).
- `scripts/test.py` and `tests/quality/test_quality_invariants.py:1-60` — to run the focused checks in
  a scratch worktree (the venv location).
- `tests/http.test.mjs:225-229`, `:416-430` — the helpers the new cases use.

## Searches not found or unclear

- `src/server/database.ts` is named whole in the *Read*; I read its saved-game types and schema step
  (`:30-130`) and its saved-game operations (`:490-570`), not the session and link code between.
