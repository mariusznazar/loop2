# Report — executor of slice 4 (owner routes, role in the account answer, invariant)

## Status

`done`

## Commits

- `a3bb2bf6` feat: :sparkles: add the five routes of the owner panel, the role in the account answer and the invariant that each refuses a session without the owner role (D-109, D-137, D-400, D-410, D-411) — on `task/panel-wlasciciela`, on the base `276b4289`.

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `src/server/owner-routes.ts` (new) | +155 / 0 |
| `src/server/account-routes.ts` | +25 / -16 (approx.; `git diff --stat` reports 41 changed lines) |
| `src/server/app.ts` | +2 / 0 |
| `tests/owner-routes.test.mjs` (new) | +1208 / 0 |
| `foundations/invariants.md` | +10 / 0 |
| `foundations/decisions.md` | +2 / -2 (the two *Verification* lines of D-109 and D-137 name the invariant) |
| `foundations/part_map.md` | +1 / 0 |

## Checks (command and exit code)

All run from the worktree root. Evidence files are in `.runs/task-cycles/panel-wlasciciela/reports/executor-4-evidence/`.

| Check | Exit |
|---|---|
| `npm test -- tests/owner-routes.test.mjs`, **before** `owner-routes.ts` and the other source changes existed (the failing run of every test written first; 12 of 13 failed on assertions of status or body, the 13th — the owner's own saved game — passes because that behaviour is unchanged) | 1 (`red.txt`) |
| `npm run typecheck` | 0 |
| `npm test -- tests/owner-routes.test.mjs` (13 pass, 0 fail), also re-run after the last edit of the test file | 0 (`green-final.txt`) |
| `npm test -- tests/http.test.mjs` (95 pass, 0 fail) | 0 |
| `npm test -- tests/transport.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (no `--skip-test-citations`, files staged) | 0, `0 errors` (`foundation.txt`) |
| `npx prettier --check src/server/owner-routes.ts src/server/account-routes.ts src/server/app.ts tests/owner-routes.test.mjs` | 0 |
| `npx eslint` on the same four files | 0 |

Not run: the product's gate (bare `npm test`), by the handoff.

Before the foundation check could pass, two errors stood that the check names itself: the invariant read `test` with no citing file, and `tests/owner-routes.test.mjs` in `part_map.md` matched no tracked file. Both ended when the test file was added to git (first run exit 1 with those 2 errors, then exit 1 with one error — a quotation of D-137 that began mid-sentence, fixed — then exit 0).

### The invariant's test seen failing, then passing

`owner-panel-authorization` is cited at three tests ("a session of a player is answered 403…", "no session, a forged… 401…", "the role is read from the database at each request…"). Failing run: `npm test -- tests/owner-routes.test.mjs` exit 1 before the code (`red.txt`). Passing run: the same command exit 0 after it. In addition, against the finished code, each of these breaks made one or more of those tests fail (mutation runs, `mutations.txt`; the script is `mutate.py`, each break restored after its run, `git diff` of `src/` clean at the end):

| Break | Tests that failed |
|---|---|
| M1 the role check removed | the 403 test; the role-per-request test |
| M2 the role remembered by the process, so a role taken is not seen | the role-per-request test |
| M3 the body read (fields checked) before the role | the 403 test (a body `{"email": 42, "extra": true}` from a player is then 400) |
| M4 the grant route without the role check | the 403 test; the 401 test; the guards test |
| M5 the plain `blockAccount` in place of `blockForPanel` (blocks an owner) | the 409 test |
| M6 the body limit 64 KiB in place of 16 KiB | the guards test |
| M7 an event for `already-blocked` | the block test |
| M8 a field `role` for every account | the answers test |
| M9 no prelude (no 503, no no-store, no transport refusal) on the owner paths | the guards test; the unconfigured test |
| M10 the list reversed | the list test |
| M11 a wrong event name | the block test |
| M12 the address not normalized | the block, the 409 and the grant tests |
| M13 the grant route refusing an owner target | the grant test |
| M14 an unknown address answered 200 | the unknown-address test |

## Own-work check

- **Requirement most likely not met:** D-109's "checked after the session and before the body is read, with nothing read of the body" together with "the role read at each request, never from the session". The two ways it can fail silently are an order of checks that reads the body first and a role remembered somewhere.
- **Check:** a session of a player gets 403 on each route for five bodies, among them `{"email": 42, "extra": true}` and `{}` (an owner gets 400 for them) and an identifier body; M3 (body first) fails that test. The role test uses a session that the server's own store wrote at registration, flips the role through a second connection both ways, and signs in anew as an owner and has the role taken; M2 fails it.
- **What it showed:** both breaks fail the tests named above; the finished code passes. A first version of the role test used sessions seeded with `saveSession`; my first break of "role kept in the session" (M2 as a field in `request.session`) did not fail it, because `SqliteSessionStore.decode` refuses any key besides `accountId` and `cookie`, so a role cannot be kept in a stored session at all. I moved the flip-flop onto sessions from a real registration and a real sign-in, and changed the break to a role remembered by the process, which the test catches.

## Reach beyond the handoff

- `src/server/account-policy.ts` (`normalizeEmail`, lines 83-88) and `src/server/account-block.ts` (read whole, to see how the command normalizes an address and what an address that is no address does there: a usage error with nothing changed): to name the route's reading of the address.
- `src/server/account-previous-save.ts` and `src/server/account-role.ts` (only `grep` of `writeEvent`): the event names `account-previous-save-granted`/`-revoked` and `account-owner-granted`/`-revoked`.
- `src/server/session-store.ts` lines 1-140 (to find why a role in the session cannot be stored; see above).
- `.the-way/elements/common/foundation_check.py` lines 140-175 and 780-860 (`check_decision_line`): to see how a `// decision:` quotation is matched (a prefix that begins a sentence, no `"` inside).
- `foundations/decisions.md` D-252 lines 6248-6285 (the statement and the verification of the owner panel's events), `foundations/glossary.md:272-277` (the term "owner"), and the frozen task `task-frozen.md:29-38` and `:136-150`: read, not part of a reach the handoff missed; named here because the handoff's *Read* gave them and I read them late.

## Working copies

- `.runs/executor-4/` in the worktree held the copies of the two source files that the break runs restore from, the break script and the logs. Removed with `rm -rf`. What the report needs was moved first to `.runs/task-cycles/panel-wlasciciela/reports/executor-4-evidence/` (`red.txt`, `green-final.txt`, `mutations.txt`, `mutate.py`, `foundation.txt`). No remainder.
- No other worktree, clone or screenshot.

## Unread material

- `src/server/database.ts`: read lines 1-130, 440-550 and 800-942 of 942 (the types, the block and unblock, the issuing of a link, the privilege, the list, the role and the panel's block); the schema steps and the rest not read.
- `tests/http.test.mjs`: read lines 1-470, 712-880, 1800-1880, 2858-2885, 4380-4520 of 5987 (the fixture, the credential helpers, the blocked-account test, the log capture, the previous-save helpers and its 401 test); `4397-4420` as named. The rest was only searched.
- `guidelines/testing.md`: read whole. `guidelines/coding.md`, `guidelines/coding-http-application.md`: whole.
- `foundations/decisions.md`: D-109, D-104, D-137, D-400, D-202, D-410, D-411 whole; D-252 lines 6248-6285 only (to the first line of its *Verification* complies list), so lines 6286-6318 of its range stay unread.
- `foundations/invariants.md`: lines 710-740, 855-910, 985-1000 read (account-session-authorization, account-mutation-request-guards head, blocked-account-access, player-server-session, unblock-restores-no-session, email-confirmation-link, unblock-restores-no-link, player-save-isolation); `account-mutation-request-guards` and `unblock-restores-no-session` entries read to their *Part* lines.
- `.the-way/elements/part-map/template.md`: lines 1-120 of 191 (the rest is on dependencies and the external context, not on assigning files).
- The plan was not opened (the slice was copied into the handoff).

## Searches not found or unclear

- None where an item was not found. Two points that were unclear and are named under *Concerns* below: what a string that is no address gets, and the invariant's *Derives from*.

## Questions and concerns

No questions that block. Concerns, each with the way I chose and the way rejected:

1. **A string that is written as no address** (`""`, `no-at-sign`, `a@@b`, `@example.test`) in the body of an operation is answered 404 `unknown-account`, with the database not asked. Rejected: 400 `invalid-request`, which the plan keeps for "another body" (a body that is not exactly `{"email": <string>}`), or 400 `invalid-email` as the reset route gives. D-137 and D-400 say 404 "where no account has that address", and no account has such an address. If a reviewer wants 400, it is one branch in `targetAddress`/`operationRoute` and one table in the unknown-address test.
2. **The address of the body is normalized as at login** (`normalizeEmail`: trimmed, lower case), as the commands do; D-137 and D-400 name the normalization for the command, not for the route. Rejected: the exact string (a padded or upper-case address would be 404). The panel always sends the address from the list, so the choice costs nothing for the screen; test cases `" Owner@Example.Test "` and `" Other@Example.Test "` hold it (M12 fails them).
3. **The invariant's *Derives from* is `D-109 · D-137`**, as the handoff gives. Its sentence also rests on D-400 (grant and revoke routes) and D-410 (the role); `foundation_check` accepts it as it is. Adding D-400 and D-410 is a one-line change if the reviewer wants it. D-400 and D-410 *Verification* do not list the invariant (the handoff left them as they are).
4. **Citations beyond the new invariant.** The new file also cites `account-mutation-request-guards`, `blocked-account-access`, `player-server-session`, `unblock-restores-no-session`, `unblock-restores-no-link` and `player-save-isolation` at the tests that hold them; none of those invariants' sentences or tests was changed.
5. **A seeded session behaves differently from a real one:** a session written by `saveSession` in a test (as `tests/http.test.mjs` does) is read fine, but any key added to `request.session` makes its next read throw, so a test of "the role is not kept in the session" needs a session of the server's own making. This does not matter for the product (the store keeps only `accountId` and the cookie), only for how a test of a role-in-session break is built; the role test uses a real registration for it.
6. `foundation_check` and the guideline `guidelines/coding-http-application.md` (its table of "Files of this kind" lists `app.ts` and `account-routes.ts`, not `owner-routes.ts`) — the check passes; I did not touch the guideline since the handoff's *Change* list does not name it. Whether `owner-routes.ts` should be a "copy" in that table is for the orchestrator or the return step.

## Choices made (with the way rejected)

- **A router of its own, `owner-routes.ts`**, as the plan says; `account-routes.ts` exports `accountPrelude`, `sessionAccount`, `refuse`, `unauthenticated`, `invalidRequest`, `stringFields` and `accountBodyLimit` and calls its own prelude through `accountPrelude`; behaviour of the existing routes did not change (`http.test.mjs` 95/95 and `transport.test.mjs` pass, files untouched). Rejected: the owner paths in the `paths` table of `account-routes.ts` (it would put the new routes into a router whose prelude and handlers are the account routes').
- **Role read through `sessionAccount`**, which reads the account from the database at each request (`findAccountById`), so the role of that account row is the role read; no second read. Rejected: a second query for the role (one more place to forget it).
- **One handler shape for the four operations** (`operationRoute`): role check, body, address, operation, event, answer. A method other than the route's own (`GET` of an operation, `POST` of the list) falls through to the existing JSON 404 `Not found`, as every account route does; the test holds that no `GET /api/owner/block?email=…` operates.
- **Events** are written by `writeEvent` with `accountId` of the target only, after a change only (`blocked`, `unblocked`, `granted`, `revoked`), and the block test checks that the log holds neither the owner's number nor any address.
- **The test fixture** is the one of `tests/http.test.mjs` made over (own copy in the new file; that file's helpers are not exported), with a `Proxy` hook before `blockForPanel` that stands in for a second connection giving the role just before the block, and a stand-in mailer for the registration. Rejected: importing helpers from `http.test.mjs` (it is a test file with side effects at import).
- The state compared before and after in the refusal tests holds the accounts (all columns, so blocked state, privilege and role), the sessions as identifier and account, the links and both saved games. A session's expiry is left out because any request with a live session renews it; with it left in, the refusal tests would fail on a renewal that is no change of the panel.

## Problems observed

- None in the code. One mismatch with the plan, small: the slice's *Checks* lists `npm test -- tests/http.test.mjs` etc. but the handoff adds prettier and eslint; both were run (above).
