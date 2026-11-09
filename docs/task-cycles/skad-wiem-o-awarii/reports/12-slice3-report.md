# Report 12-slice3 — executor of slice 3 (the report route of the server and the line it writes)

**Status:** done

## Commits (branch `task/skad-wiem-o-awarii`, base `7a1c8ea`, not pushed)

- `daff36e` feat: :sparkles: accept the browser's failure report on POST /api/browser-failure, limit it to 30 an hour for the whole server and write it as one line of three words
- `563510d` docs: :memo: add the browser's failure report to the responsibility of the part account-server

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `src/server/account-routes.ts` | 43 / 1 |
| `src/server/account-policy.ts` | 60 / 0 |
| `src/server/log-line.ts` | 24 / 0 |
| `tests/http.test.mjs` | about 484 / 1 |
| `tests/transport.test.mjs` | about 93 / 3 |
| `foundations/part_map.md` | 1 / 1 (one sentence) |

## What was made

- `account-routes.ts`: path `browserFailure: "/api/browser-failure"` in `paths` (so the `router.all` gate covers every method: 503 without accounts, 403 without proxy metadata, JSON 404 for other methods behind the gate) and in the `router.post` list with `mutationGuards(..., accountBodyLimit)`. Handler order: exact three string fields (`stringFields`) and patterns (`isBrowserReport`) -> 400 `invalid-request`; then the limit -> 429 `too-many-attempts` (at the first refusal of an hour one `writeFailure("browser", "account-routes.browserFailure", new ReasonedFailure("LIMITED"))`); then the line; 204 with no body. `accountId` is read from `request.session.accountId` (the stored session; a forged, unsigned, unknown or expired cookie gives a session without it), never from the body.
- `account-policy.ts`: `isBrowserReport` (patterns: `kind` and `code` `^[A-Za-z][A-Za-z0-9_]{0,63}$`; `place` words of that form joined by single `.`, `/` or `-`, at most 96 characters, `^(?=.{1,96}$)[A-Za-z][A-Za-z0-9_]*(?:[./-][A-Za-z][A-Za-z0-9_]*)*$`); `AccountPolicy.admitBrowserReport()` returning `"admitted" | "refused" | "refused-first"`, a rolling 60-minute list of at most 30 moments, option `browserReportLimit` (and the existing `now`) for tests.
- `log-line.ts`: `writeBrowserFailure(report, accountId?)` writes `{"failure":"browser","kind":..,"code":..,"place":..[,"accountId":..]}` and nothing else.
- Tests: see below. `foundations/part_map.md`: the `account-server` sentence gained "accepts the report of a failure that the browser sends and writes it as one line of its log", written through the-way-update-part-map (pin checked: gitlink and `HEAD` of `.the-way` both `294af7f`).

## Checks (command and exit code)

Failing runs first (route absent, tests in place):
- `npm test -- tests/http.test.mjs` exit 1: 10 failed of 83, all `ERR_ASSERTION` (the 503 list, the 9 new report cases; the new "other methods get the JSON 404" case passes before and after by design, it guards the gate).
- `npm test -- tests/transport.test.mjs` exit 1: 3 failed of 11, assertions (extended refused case, save-route 16 KiB list, new transport case).

Passing runs, final code:
- `npm test -- tests/http.test.mjs` exit 0 (83 tests). Earlier passing attempts exit 1 for three faults in my own new tests (a live session's cookie is renewed so "no cookie" was wrong; a broken body `{` answers 400 without `invalid-request`; an expired session cannot be seeded with a past expiry); fixed in the tests, code unchanged.
- `npm test -- tests/transport.test.mjs` exit 0 (11)
- `npm test -- tests/invariants/test_loop2_api_error_route.py` exit 0 (2)
- `npm test -- tests/startup.test.mjs` exit 0 (18)
- `npm run typecheck` exit 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors")
- Also: `node_modules/.bin/eslint src/server tests/http.test.mjs tests/transport.test.mjs` exit 0; `node_modules/.bin/prettier --check` on the same files exit 0.

Not run: the whole gate (the orchestrator runs it); `tests/quality/test_quality_invariants.py` (not in the slice's list; eslint and prettier ran directly instead).

## Tests brought

`tests/http.test.mjs` (new, at the end; `accountFixture` takes `browserReportLimit`; the 503 list has the new path):
1. 204 from a page with no session, the exact line as a literal string, no query/header/address text on the line (`# invariant`: `browser-failure-report`).
2. The real words of `errorWords`, the real places, the longest allowed words (`browser-failure-report`).
3. `accountId` from the session only: own session, another account's session with a query and header naming the first, bodies naming an account refused, forged key / unsigned / unknown / expired cookies give no `accountId` (`browser-failure-report`).
4. Row 2: missing, extra (`accountId`, `email`, `message`, `stack`), non-string fields; non-object bodies (`browser-failure-report`).
5. Row 3: space, quote, brace, `@`, line breaks, controls, non-ASCII, digit/underscore start, `.` `/` `-` in kind and code, bad forms of place, edges 64/96 and one more (`browser-failure-report`).
6. Row 1: foreign/null/missing/duplicate Origin, text/form media, gzip, no proxy metadata, over 16 KiB; nothing written (`account-mutation-request-guards`).
7. Row 6: GET/PUT/DELETE/PATCH behind the gate and a query form answer the JSON 404.
8. Row 4: small limit 2 and a clock: refused bodies use none of the limit; third report from any address 429; exactly one `LIMITED` line at the first refusal; none for later ones; none 59 minutes on; a second window an hour on gets its own line (`browser-failure-report`).
9. The hour is rolling (fixed-window mutation caught).
10. Default limit from 31 distinct addresses: 30 accepted, the 31st refused (`browser-failure-report`).

`tests/transport.test.mjs`: the "refused state-changing requests" case runs the ninth route through all variants (also asserting no report line from any refusal; control 204 and exactly one line); the save-route case lists the new path in the 16 KiB loop (comments "seven" -> "eight"); a new transport case (`account-request-transport`) for bad proxy metadata before the session, nothing logged, and a valid transport reading the session for the `accountId`.

## Own-work check

Requirement most likely not met: "the count is taken after the body passes its pattern, so refused bodies use none of it", and "one LIMITED line at the first refusal, none for the later refusals", and "rolling" window. Checks (mutations of the code, each restored and verified identical afterwards, `npm test -- tests/http.test.mjs`):
- M1 count moved before the pattern check: exit 1 (the limit case and the pattern case fail).
- M2 notice at every refusal: exit 1 (limit case and rolling case fail).
- M3 window cleared as a whole when the oldest report ages out: exit 1 (rolling case fails).
Other mutations considered and caught by construction: session required (case 1 fails), `accountId` from a body (cases 3 and 4 fail, the body is refused), a pattern allowing a space or a newline (case 5), a missing guard or gate path (cases 6, transport, 503 list).
Unprotected: the exact value 30 is protected only by the default-limit case; the value 60 minutes is protected by the rolling case.

## Reaches beyond the dispatch

- `guidelines/coding-account-policy.md` was read in full as the handoff names; I also read `tests/startup.test.mjs` only by running it. No other reach.

## Choices (way chosen, way rejected, cost if wrong)

- **"First refusal of a window" means the first refusal when no `LIMITED` line was written in the last 60 minutes** (`refusalNoticeAt`). Rejected: a flag cleared when a report is admitted again, because under a sustained flood every freed slot is taken at once and the next refusal would write a new line, up to 30 extra lines an hour. Cost if wrong: the watcher/agent sees one drop notice an hour even if reports were refused in several separate bursts within it.
- **Patterns live in `account-policy.ts`** (`isBrowserReport`), field and type checks in the route, as the account-policy guideline splits them. Place words must each start with a letter and be joined by single separators (`a..b`, `a.1b`, trailing `.` refused), reading "such words" of B1 strictly. Cost if wrong: a future browser place with a digit-led segment would be dropped silently; the 2 real places and every `errorWords` output pass.
- **`accountId` is read straight from `request.session.accountId`** (as `app.ts` does for its failure lines), not through `sessionAccount`, which does a database read and drops blocked accounts. Rejected because the report route should have no failure mode of its own while the game is failing. Cost if wrong: a session of a just-blocked account (its sessions are deleted on block) could name the account on one line.
- **The limit is an option of `AccountPolicy` (`browserReportLimit`)**, as the spec asks. This runs against one sentence of `guidelines/coding-account-policy.md` ("wartości progów i okien opcjami nie są"); the spec binds and says "so a test can build it with a small limit". The window stays a constant.

## Mismatches and notes for the orchestrator

- `guidelines/testing.md` rows that count routes ("siedmiu tras", "ósmej", "dziewięciu trasach") are stale now; not edited, scheduled separately (spec S2).
- The comments in `tests/transport.test.mjs` "the seven others"/"seven other routes" were updated to "eight" because they would otherwise be false.
- The plan's Checks include `tests/startup.test.mjs`; it is unaffected by the change and passes.

## Searches not found or unclear

- none (the Read list of the handoff was all found; the handoff's ranges for the foundation entries matched the file).
