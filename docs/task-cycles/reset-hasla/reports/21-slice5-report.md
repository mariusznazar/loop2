# Slice 5 report — The request for a link

**Status:** done

## Commits

- `b966a74` feat: :sparkles: add the request for a password-reset link, answered with 204 before any work on an account, and one sending path for both kinds of link message

## Files changed

- `src/server/account-routes.ts` (+110 / -21): `POST /api/password-reset-message` added to `paths`, to the `mutationGuards` list (so it is behind the transport gate, Origin, JSON, 16 KiB and exact-field guards); `sendConfirmation` became `sendLinkMessage(runtime, policy, account, kind)` with a table `linkKinds` of two kinds (`confirmation`, `reset`: purpose, lifetime, fragment, composing function); new `sendResetMessage(runtime, policy, email): Promise<void>` that never rejects; comments "both sending routes" and "five small routes" updated.
- `tests/http.test.mjs` (+~460): eight new route tests, `beforeFind` hook on `findAccountByEmail` in `accountFixture`, the new route in the list of canonical routes (unconfigured accounts).
- `tests/transport.test.mjs` (+~45 / -few): the route joins the transport refusal test, the Origin/body/field refusal matrix (with a confirmed account and a control request proving the route does its work when admitted) and the 16 KiB limit loop.

## Checks (command, exit code)

- Failing runs before the code (route absent, 404): `npm test -- tests/http.test.mjs` exit 1 (all eight new tests and "unconfigured accounts answer the canonical account routes" failed); `npm test -- tests/transport.test.mjs` exit 1 (3 tests failed: link-routes transport, state-changing refusals, save-route 16 KiB loop). Logs: `.runs/slice5-http-fail.log`, `.runs/slice5-transport-fail.log`.
- Passing runs after: `npm test -- tests/http.test.mjs` exit 0 (56 pass); `npm test -- tests/transport.test.mjs` exit 0; `npm run typecheck` exit 0; `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests, covers ESLint, Prettier, Ruff). Logs: `.runs/slice5-http-pass.log`, `.runs/slice5-transport-pass.log`, `.runs/slice5-quality.log`.
- Prettier `--check` on the three files: clean (run through `prettier --no-config --no-editorconfig`).
- Not run: the full gate `npm test` with no argument (the orchestrator's); `foundation_check.py`.

Invariant tests, each seen failing once (above) then passing:

- `password-reset-verified-email`: the answered-before-mailer, same-answer-for-every-state, failed-lookup, invalid-email, lifetime/supersession and no-token-in-log tests.
- `account-session-authorization`: "a request needs no session, names only the account whose confirmed address gets the link...".
- `account-message-limits`: "a reset message counts against the limits shared with the confirmation message...".
- `account-mutation-request-guards` and `account-request-transport`: the additions in `tests/transport.test.mjs`, and the invalid-email/invalid-request test in `tests/http.test.mjs` also carries the guards label.

## Own-work check

Requirement my work most likely misses: the answer must come before any work on an account and without waiting for the mailer or the database (Decision 2). The handler touches only the body and `normalizeEmail`; the check is mutation of the code, run against `tests/http.test.mjs` (source restored byte for byte after each, `cmp` against a saved copy):

- M1, the handler awaits `sendResetMessage` before the 204: `npm test -- tests/http.test.mjs` exit 1, "answered before the mail service is asked" failed.
- M2, no confirmed-address condition: exit 1, "same answer ... hand nothing on" failed.
- M3, reset lifetime = confirmation lifetime (24 h): exit 1, "a recorded reset link lives one hour..." failed.
- M4, the catch of `sendResetMessage` removed: exit 1, "a failed lookup after the answer leaves the process alive..." failed.

Not covered by any test: that no lookup happens *before* the response in the sense of order. The tests show the answer is unchanged when the lookup or the recording throws or is slow, which is the observable consequence; the order itself rests on reading the handler (about eight lines).

## Reaches beyond the dispatch

- `src/server/database.ts` (`issueLink`, `findAccountByEmail`, `Account`, types) and `tests/http.test.mjs` / `tests/transport.test.mjs` whole around the places I changed: needed to see what a stored link looks like and how the fixtures and stand-in mailer work. Not a gap in the foundation selection.
- Grep in `src` for `email-confirmation`, `password-reset`, and for the log lines, to find every user of the renamed function and of the log text.

## Searches not found or unclear

- The plan's reference "`tests/http.test.mjs:197`" for the list of canonical routes: the list is at about line 208 now (moved by earlier slices); found by name.
- Test of "login in progress" and "a blocked account's link" are not in this slice's Checks (they belong to the route that uses the link); I covered the blocked account's request only.
- Otherwise none.

## Choices, with the way rejected and cost if wrong

- **The kind table holds four fields** (purpose, lifetime, fragment, compose), as Decision 3 gives. The log line for a failed recording is derived from the purpose: `Account email-confirmation link could not be recorded` / `Account password-reset link could not be recorded`. The old line was `Account confirmation link could not be recorded`. Rejected: a fifth field for the text, or one text for both kinds. Cost if wrong: an operator grep for the old wording finds nothing; nothing in the repository (including the `loop2-deploy` skill) refers to that line.
- **`sendResetMessage` has one `try/catch` around the lookup and the sending**, logging the fixed line `Password-reset request could not be served`. Rejected: separate catches. Cost: none seen; `sendLinkMessage` itself never throws, the catch exists for the lookup (and as a guard on the rule that the unit never rejects).
- **The condition for a confirmed address is in `sendResetMessage`** (`account?.emailConfirmed`), not in `sendLinkMessage`, because the confirmation route sends to unconfirmed accounts by design.
- **Test helper `afterEarlierWork`** sends a request for a fresh confirmed control account and waits for its message, as Decision 2's *Proved by* gives; each "nothing happened" case uses it.
- **Fixture change:** `accountFixture` gains a `beforeFind` hook on `findAccountByEmail`, same pattern as `beforeIssue`; used only by the failed-lookup test.
- **Existing transport test, changed expectation:** in "refused state-changing requests ..." the check `confirmed() === 0` became `confirmed() === confirmedBefore` (and `1` became `confirmedBefore + 1`), because a confirmed `reset@example.test` account is added so that the new route would visibly do work if a guard let it through. Source of the reason: the testing guidelines' demand that a refusal test has a body that would succeed if admitted. The check is not weaker: it still requires no change of the confirmed count.
- **Per-account limit in the log-content test:** three outcomes (`never`, `reject`, `failed`), not four, because a fourth message to the same account is limited by D-105 (3 an hour); my first version used four and failed for that reason, fixed in the test.

## Problems observed

- Timing of the "answered at once" test: the server and the test client share a process, so by the time the client reads the response the immediate has usually already run and the mailer holds the message. The test therefore proves "the response arrived while the mailer had not answered" (the release is only in `finally`), not that the message was handed on after the response. Stated here so the reviewer does not read more into it.
- A plan value that does not pass my own reckoning: none.
