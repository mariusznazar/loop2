# Slice 5 fix report — task `reset-hasla`

**Status:** done. Both blocking findings fixed; none contested. Minor findings not touched.

**Commit:** `8fe869d` test: :white_check_mark: check that the reset request ends its answer before the lookup and the recording, and that its message is the password-reset message. Only `tests/http.test.mjs` changed (+34 / -5). No product code changed.

## Finding 1 — fixed

- New test "the answer to a request for a reset link ends before the account is looked up and before the link is recorded", `invariant: password-reset-verified-email`, in the style of the reviewer's scratch case (three runs instead of five). It records the order of the response's `finish` event and of the `beforeFind` and `beforeIssue` hooks and expects `["answer", "lookup", "record"]`; source D-214.
- `accountFixture` now also returns `listening` (the one added property the case needs).
- The comments of the two earlier tests no longer name "the message handed on before the answer" and "recording a link before the answer" as faults they catch; the order is claimed by the new test alone.
- Shown failing: with the handler changed to `void sendResetMessage(...); response.status(204).end();` the new test failed at `run 0` (`npm test -- tests/http.test.mjs` exit 1; the order differed, `answer` no longer first). With the work kept in the same turn after `end()` and `setImmediate` removed, it failed the same way (exit 1). Both restored by `git checkout -- src/server/account-routes.ts`, then `cmp` against a saved copy confirmed identical.

## Finding 2 — fixed

- The lifetime test now asserts `subject === "Ustaw nowe hasło w loop2"` for every message the route handed on (source D-219); its comment names the fault as "the route handing on another message than the password-reset message (its subject, D-219)".
- Shown failing: `compose: composeConfirmationMessage` in the `reset` row made that test fail with actual `'Potwierdź adres e-mail w loop2'`, expected `'Ustaw nowe hasło w loop2'` (exit 1). Restored by `git checkout -- src/server/account-routes.ts`.

## Checks, command and exit code (after the fix)

- `npm test -- tests/http.test.mjs`: exit 0 (57 pass, 0 fail)
- `npm test -- tests/transport.test.mjs`: exit 0
- `npm run typecheck`: exit 0
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0
- `prettier --check tests/http.test.mjs` (no config): clean
- Not run: the full gate, `foundation_check.py`.

## Reaches beyond the dispatch

- The reviewer's scratch file `scratch-cases.mjs` (named by the coordinator). Nothing from the foundation beyond what the findings cite (D-214, D-219).

## Searches not found or unclear

- none. The scratch cases' other tests (forged host headers, crafted addresses) were not part of the two blocking findings and I did not add them.
