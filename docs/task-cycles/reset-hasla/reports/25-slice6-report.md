# Report — Slice 6, task `reset-hasla` (setting the password by a link)

**Status:** done

## Commits

- `7c8228f` feat: the route `POST /api/password-reset` (`src/server/account-routes.ts`, +60).
- `5fcea3b` test: `tests/http.test.mjs` (+610/-1 net of the earlier lines), `tests/transport.test.mjs` (+74/-9 net).

## The route, in the order of Decision 4

Guards (path in `paths`, so the transport gate and `Cache-Control: no-store` reach it; path in the
`mutationGuards` list with the 16 KiB limit) -> `stringFields` with exactly `token`, `password`,
`passwordConfirmation` -> `checkNewPassword` (`invalid-password` / `password-mismatch`, registration's
sentences through `registrationProblems`) -> `isLinkToken` -> `resetLinkWorks(linkTokenDigest(input.token))`
-> `hashPassword(checked.password)` (the gate; `PasswordCapacityError` -> `limited`, anything else
rethrown to the error handler -> 500) -> `resetPassword(tokenDigest, hash)` (`invalid` -> `invalid-link`)
-> `policy.clearEmailAttempts(outcome.email)` -> `204`, with no `await` after the commit. The route takes
no ticket, adds no `refusalCodes` entry, never touches `request.session`, and logs nothing. The hash is of
`checked.password` and the digest of `input.token`, as registration and the confirmation route use their
values.

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| New tests before the route (failing run) | `npm test -- tests/http.test.mjs` | 1 (nine new cases and the list case failed on `404 !== ...`, the assertions, not on a missing module) |
| New transport cases before the route (failing run) | `npm test -- tests/transport.test.mjs` | 1 (3 cases failed on `404 !== 403/413`) |
| After the route | `npm test -- tests/http.test.mjs` | 0 (66 pass, 0 fail) |
| After the route | `npm test -- tests/transport.test.mjs` | 0 (10 pass, 0 fail) |
| Types | `npm run typecheck` | 0 |
| Quality | `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests) |
| Prettier on the changed files | `npx prettier --no-config --no-editorconfig --check src/server/account-routes.ts tests/http.test.mjs tests/transport.test.mjs` | 0 |

Not run: the product's gate (`npm test` with no argument) and `foundation_check.py`, which are the
orchestrator's.

## Faults applied (each by editing `src/server/account-routes.ts`, run with the focused command, restored; the file was restored by `git checkout -- src/server/account-routes.ts` at the end and `git status` showed it clean)

Every fault below was run with `npm test -- tests/http.test.mjs` unless the transport file is named. The
case that failed is given with the assertion that stopped it.

| Fault | Failed cases (reason) |
|---|---|
| The link checked before the password rules | the rules-before-link case (`unknown link, short`: got `invalid-link`, wanted `invalid-password`); the clearing-order case (`short`, the same) |
| The link not read before the hashing | the rules-before-link case (full gate: `429 !== 400`); the every-token-that-does-not-work case (`used`: `429 !== 400`) |
| Outcome of `resetPassword` ignored (204 on `invalid`) | the during-hashing case (`blocked meanwhile`: `204 !== 400`); the locked-address case (`superseded meanwhile`: `204 !== 400`); the clearing-order case (cleared another address) |
| No `clearEmailAttempts` | the locked-address case (`straight after the reset`: `429 !== 200`); the clearing-order case (`[]` instead of one clear) |
| `clearEmailAttempts` with another address than the returned one | the locked-address case (`429 !== 200`); the clearing-order case (the token text instead of the address) |
| `clearEmailAttempts` after `await` of a turn of the event loop | the clearing-order case only (the flag `nextTurn` was true at the clear) |
| A fixed address cleared on a refusal in the transaction | the locked-address case (`after a refusal in the transaction`: `200 !== 429`) |
| `PasswordCapacityError` not caught (full gate -> 500) | the rules-before-link case (`good link, full gate`: `500 !== 429`); the locked-address case (`full gate`); the log case (status precondition) |
| Any failure of the hashing answered 429 | the failing-hash case (`429 !== 500`); the log case (status precondition) |
| `checked.password.trim()` hashed | the exact-password case (`false !== true` on the verify of the exact password); the rules-before-link case; the locked-address case (`401 !== 200`) |
| Answer `200` with a body instead of `204` | nine cases (every one that reaches a success) |
| `request.session.save(() => {})` in the route | the sessions case (`the one sent along`: the deleted row was back) |
| `request.session.destroy(() => {})` in the route | the sessions case: the session of the other account sent along was gone (first run ended in a `TypeError` on a missing row; I added `assert.ok(after, ...)` so it is an assertion now; the fault was not re-run after that edit) |
| `console.error` of the token in the hash failure path | the log case (`no log line holds a token or a password`) |
| Path `paths.passwordReset` removed from the guarded `router.post` list (transport file) | the guards case (`500 !== 403` for `missing origin`), the link-routes case and the 16 KiB case |
| Path filtered out of the `router.all` transport gate (transport file) | the link-routes case (`/api/password-reset {}`: `204 !== 403`) |

A fault of the same kind I wrote and could not use: `request.session.touched = true` did not compile
(`Property 'touched' does not exist`), so it was replaced by `session.save`. A fault of the kind
"link spent or reserved before the hashing" has no code to apply in the route (spending is the
transaction's), so no case claims it; it is guarded by "a full gate leaves a good link working", which
fails under any fault that spends the link before the hash.

Not seen failing, so no comment claims them: a missing `isLinkToken` (an unknown spelling has another
digest and gets the same refusal from the read, so the form check changes nothing a request can
observe); `hashPassword(input.password)` instead of `checked.password` (equal today); the client
address's counter surviving a reset (the route cannot reach it; slice 5's policy cases hold it, and the
route case checks it end to end with twenty failures).

## Invariant tests: failing run and passing run

All with `npm test -- tests/http.test.mjs` (failing exit 1 before the route, passing exit 0 after) and, for
the two transport invariants, `npm test -- tests/transport.test.mjs` (exit 1, then 0).

- `password-reset-link`: the exact-password case, the rules-before-link case, the every-token case, the
  during-hashing case, the failing-hash case.
- `password-reset-ends-sessions`, `player-server-session`, `account-session-authorization`: the sessions case.
- `unblock-restores-no-link`: the every-token case (a link stopped by a block, after the unblock) and the
  during-hashing case (a block during the hashing, then the unblock).
- `account-attempt-limits`: the locked-address case and the clearing-order case.
- `player-argon2-password-hash`: the exact-password case (encoded Argon2id profile, the exact password verifies,
  the trimmed one and the old one do not).
- `account-mutation-request-guards`: `refused state-changing requests ...` in the transport file (the new
  route is in its list, with a body that would set the password and spend a link if admitted, and a control).
- `account-request-transport`: `transport refuses all four link routes ...` (renamed from "all three").

## Own-work check (section 3)

Requirement most likely not met: *the order is a requirement; a case must fail if a step moves* (handoff).
Check: the fault runs above, each moving or removing one step: link before password, link read after the
hashing, clearing after a turn, clearing on a refusal, outcome ignored. Result: each is caught by at least
one case (table above). The step that cannot be observed from outside, "answer after the commit in the same
turn", is held by the `nextTurn` flag (a flag set by `setImmediate` in the hook before the transaction and read in
the clear). Passing runs: see the checks table.

## Choices

- Full-gate windows: the cases that need a full gate use `withFullGate` once per request that must meet
  it (in the every-token case 15 windows of two real hashes). Rejected: all 15 in one window; the
  window is about 100 ms and the case would depend on the machine's speed. Cost if wrong: the case takes
  a few seconds longer.
- The hash failure is made by replacing `argon2.hash` for one request in the test and restoring it in a
  `finally`; the file's tests run one at a time. Rejected: a real failure of Argon2 (none can be provoked
  from a request). Cost if wrong: a test file that ran tests concurrently would see the replacement.
- A hook `beforeReset` was added to the fixture's database proxy in `tests/http.test.mjs`, beside `beforeIssue`,
  to run just before `resetPassword`, which stands for a block, a later link or an expiry committed during the
  hashing.
- `issueLink` of `tests/transport.test.mjs` takes an optional purpose; the "link routes" test state counts
  unspent links instead of all links.
- `tests/http.test.mjs:197` list (now at the same place) has `["POST", "/api/password-reset"]`.
- The test names changed: `transport refuses all three link routes ...` -> `... all four link routes ...`.

## Reaches beyond the dispatch

None beyond: `foundations/decisions.md` text, `guidelines/testing.md` read whole from a saved copy of its
output (read in two parts), `.the-way/task-cycle/change/slice.md`, and `git` rule file `.ai/rules/git.md`
(global instructions).

## Searches not found or unclear

- `guidelines/testing.md` (Trust boundaries table, rows for `src/server/`) still names the transport
  case as "transport refuses both link routes before the session, the link or the mail service" (the file
  already said "all three" before this slice) and lists the case sets of the guards and body-limit cases as
  "five" and "six" routes; the guideline and the foundation wording are not in this slice's *Change* list, so
  they were not touched. The orchestrator may want a `the-way-maintain-testing-guidelines` pass. The same table
  (the row of "Żądania kont na siedmiu trasach", and the rows with route lists) does not yet name
  `POST /api/password-reset`.
- The plan says "the list at `tests/http.test.mjs:197`": the list is at about line 200 after earlier slices; found
  by name.
- Everything else was found.

## Problems as observed

- Output of the older tests prints three `Error: Session cannot be replaced` stack traces in
  `npm test -- tests/http.test.mjs`; they appear in the run before the route too (3 occurrences in both),
  so they are not from this slice. Cause not examined.
