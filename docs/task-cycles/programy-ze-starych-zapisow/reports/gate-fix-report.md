# Report — fix of the product's gate failure

**Status:** done

## Commits

- `52ec5ab4` test: expect the previous-save privilege in the account body the replaced-container check compares

## Files changed

- `tests/deploy/test_account_storage.py` (+5, -2): the key tuple of the expected account body now has
  `previousSaveAllowed` (it was `id`, `email`, `emailConfirmed`); the comment above says the account reads carry
  the previous-save privilege, which a new account lacks (D-398); one added hand-written assertion
  `assertIs(account["previousSaveAllowed"], False)`, so the expectation of the new account's value does not rest only on what
  the server answered.

## Checks

- Ran: `python -B -m py_compile tests/deploy/test_account_storage.py` exit 0 (the `__pycache__` it left in
  `tests/deploy/` was removed before the commit; the worktree is clean).
- Not run, by the hard limit: `npm test` and every product test, including the fixed test itself (it needs Docker and about 24 minutes of the deploy run).
  The orchestrator reruns the gate.

## Own-work check

Requirement most likely unmet: the registration answer, `GET /api/account` and the login answer (`POST /api/session`) all carry the same
four account fields, because the test compares the reads at lines 125, 137 and 141 to the one `account` dict built from the registration.
Check: read `accountBody` in `src/server/account-routes.ts:153-160`: it builds exactly `id`, `email`, `emailConfirmed`,
`previousSaveAllowed`; the registration adds `confirmationMessage` to it (which the test already leaves out, by the key tuple). The key tuple now
equals the four fields. Showed: consistent. The three reads compare to the same dict, so one change covers all three.
The server runs not here; a runtime check is left to the gate.

## Search for the same stale expectation

- `emailConfirmed` over the whole worktree outside `src/`, `node_modules`, `.runs`, `.the-way`
  (Grep): hits in `foundations/invariants.md` (already names both booleans), `guidelines/testing.md` lines 199, 211, 214 (already name
  both markers), `tests/account-api.test.mjs`, `tests/account-storage.test.mjs`, `tests/http.test.mjs`,
  `tests/view/*.test.mjs`, `tests/invariants/test_local_start_access.py:365` (asserts only `emailConfirmed is False`, a subset
  check, true still), `tests/deploy/test_account_storage.py:120` (fixed).
- `api/account|api/session|"email"|confirmationMessage` over `tests`, `scripts`, `deploy`, `.claude`, `.agents`, `guidelines`: the 15 files
  listed; the extra ones read: `tests/deploy/test_restore_trial.py:342-346` (uses only `created["body"]["id"]`, no whole-body
  comparison) and `scripts/restore-trial.mjs` (posts to `/api/session`, reads no account fields in the grep hits).
  `deploy/`, `.claude/`, `.agents/` and `scripts/` hold no other `emailConfirmed` or `api/account`
  (`grep -rln`: no match).
- `created[` / `["body"]` over all `tests/**/*.py`: only the files above use an account body.
- The Node tests (`account-api`, `http`, `transport`, `startup`, `view/*`) were not edited: the gate log
  (`gate-final.log`, lines up to 2652) shows the Node run finished before the deploy run and its summary lines end with `skipped 0`; I did not
  verify its fail count line by line.
- Mismatch with the handoff: it says `tests/invariants`, `tests/quality` and the foundation check did not run. In
  `gate-final.log` lines 2692-2706 both directories ran and passed (261 and 56 tests, `OK`); only the final line says the run failed
  because of `tests/deploy`. Whether the foundation check runs inside `npm test` I did not establish (not read `scripts/test.py`).

## Reach beyond the dispatch

- `src/server/account-routes.ts:145-160` (read, to confirm the body shape of every account answer).
- `.runs/.../gate-final.log` lines 2650-2708 (the handoff's range plus the lines before it for the order of the runs).
- `tests/invariants/test_local_start_access.py:335-385`, `tests/deploy/test_restore_trial.py:335-360`.

## Choices

- Kept the whole fix in the one test file; did not touch `src/`, the foundation or guidelines. Rejected: reading the expected keys from the server's answer
  without a literal (it would pass whatever the server adds); cost if wrong: none known.
- Added one literal assertion beyond the minimal tuple change; if the orchestrator wants the minimal change only, drop the line
  `self.assertIs(account["previousSaveAllowed"], False)`.

## Unread material

- `.the-way/task-cycle/change/SKILL.md` and `fix.md`: read whole.
- `foundations/decisions.md` D-398 and invariant `account-client-outcomes`: not read (the handoff names them; the stale expectation was settled
  from the server code and the invariant line found by grep at `foundations/invariants.md:820`).
- `gate-final.log`: read lines 2650-2708 only.
- `scripts/test.py`: not read.
- the Node test files: only grep hits, not read whole.

## Searches not found or unclear

- Whether `npm test` (`scripts/test.py`) runs the foundation check: not found, not read.
- No other stale expectation found.
