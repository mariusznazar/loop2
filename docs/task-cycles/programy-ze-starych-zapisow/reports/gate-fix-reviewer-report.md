PASS 52ec5ab4

# Review of the fix of the gate failure, range 60e6a6bb..52ec5ab4

`git rev-parse HEAD` in the worktree is `52ec5ab46d73a8347e92702b34dca03916a5e717`, the head given. One commit, one file
(`tests/deploy/test_account_storage.py`, +5/-2); `git status --short` is clean.

## Findings

Blocking: none. Minor: none. Out of scope: none.

## What I checked, and what it showed

1. **The changed expectation is what the code makes true.** `accountBody` (`src/server/account-routes.ts:153-160`) builds exactly
   `id`, `email`, `emailConfirmed`, `previousSaveAllowed`. It is the body of all three answers the test compares: `GET /api/account`
   (line 466), the login `POST /api/session` (line 904) and the registration (line 838, where it is spread and `confirmationMessage`
   is added). The key tuple of the test now lists those four fields, so the registration's extra `confirmationMessage` stays left out
   as before and the three later comparisons (test lines 128, 140, 144) compare against the same four-key dict.
2. **The foundation agrees.** D-398 (`foundations/decisions.md:9747`): "The answers that carry the account — `GET /api/account`, the
   login and the registration — hold the flag as the boolean `previousSaveAllowed` and nothing of the previous save"; the flag is
   "off when the account is created". The invariant `account-client-outcomes` (`foundations/invariants.md:818`) names the same
   four fields for the client. Neither restates anything the commit's comment contradicts.
3. **The added assertion is right and does not weaken the test.** `assertIs(account["previousSaveAllowed"], False)`: a new account
   has the flag off by D-398 and by `createAccount` (`src/server/database.ts:314`; column default 0, `database.ts:148`). It is a
   hand-written literal, so the expectation of the value does not rest only on what the server answered; it strengthens the
   test (a server that granted the privilege on creation would now fail at registration). It is placed after the registration,
   before the cookie is used, and does not skip any later assertion.
4. **The test still guards its name.** The session cookie and the password sign-in must still name the same account after the
   container is removed and a second one started on the same volumes; the comparison now covers one more persisted field, the
   flag, so a replacement that lost or reset it would also show. The 409 on a second registration is unchanged.
5. **No other stale expectation of the same kind** (searched myself):
   - `grep -rnE "emailConfirmed|previousSaveAllowed|/api/account|/api/session|confirmationMessage" tests --include=*.py` outside the
     fixed file: `tests/deploy/test_restore_trial.py:342-346` uses only `created["body"]["id"]`;
     `tests/invariants/test_local_start_access.py:364-374` asserts `confirmationMessage == "failed"`, `emailConfirmed is False` and
     `["email"]`, each a subset check, no fixed key set. Other `json.loads` hits in `tests/**/*.py` are about unrelated bodies
     (icons, sprites, ports, manifest, listings).
   - `grep -rlE "emailConfirmed|api/account|api/session" tests scripts deploy`: the Node tests (`account-api`, `http`, `transport`,
     `startup`, `account-storage`, `view/*`), `scripts/restore-trial.mjs` (only posts to `/api/session`, no body comparison in the
     hits). `tests/account-api.test.mjs` already carries `previousSaveAllowed` in its bodies (lines 135-137, 227, 346-348, 379, 405).
   - Empirical support, not my run: `gate-final.log` lines 2640-2708 show the Node run `pass 2379, fail 0`, `tests/invariants`
     `Ran 261 tests ... OK`, `tests/quality` `Ran 56 tests ... OK`, and `tests/deploy` `Ran 231 tests, FAILED (failures=1)`, the one
     failure being `test_replaced_container_keeps_accounts_and_sessions` with a diff of exactly the one key `previousSaveAllowed`.
     So the gate's own run found no other stale expectation in those directories; the fix removes the one found. (The failure
     stopped that test at its first comparison, so the later comparisons of the same test had not run on the gate; by item 1 they
     use the same body shape and the same dict, so they are covered by the same change.)
6. **The fixer's claims verified:** the changed key tuple, the comment and the one added assertion are as the report says; the
   report's mismatch note about `tests/invariants` and `tests/quality` having run is correct (the log shows both ran and passed).
   Whether `npm test` runs the foundation check was not established by me either (see below).

## Declined to judge

- Whether the comment wording "among them the previous-save privilege, which a new account lacks (D-398)" fits the repository's
  comment style: it is accurate and short; nothing set aside beyond that.
- The 24-minute deploy run itself, and the Node, invariants and quality suites: left to the orchestrator's gate rerun (hard limit).

## Checks I ran

- `git rev-parse HEAD` -> `52ec5ab4...`, exit 0; `git log --oneline 60e6a6bb..52ec5ab4` -> one commit, exit 0;
  `git diff 60e6a6bb..52ec5ab4` and `git diff --stat` -> one file, +5/-2, exit 0; `git status --short` -> empty, exit 0.
- `python -B -c "import ast; ast.parse(open('tests/deploy/test_account_storage.py', encoding='utf-8').read())"` with
  `PYTHONDONTWRITEBYTECODE=1`: exit 0. I used `ast.parse` instead of `python -m py_compile`, which writes a `__pycache__` into the
  reviewed worktree; both check the syntax. An earlier attempt to run `py_compile` was refused by a session hook before it ran
  (no command executed).
- Greps and file reads as listed above (grep exit codes 0 where there were hits).
- Not run: `npm`, any product test, the fixed test itself (needs Docker, the hard limit of the handoff). Runtime confirmation that the
  test now passes is therefore unverified by me.

## Reach beyond the dispatch

- `src/server/account-routes.ts:100-160, 455-468, 825-906` and `src/server/database.ts:148, 305-360`: to confirm that all three
  compared answers use `accountBody` and that a new account has the flag off.
- `foundations/decisions.md` D-398 (whole entry) and `foundations/invariants.md` `account-client-outcomes` (whole entry): named by the handoff.
- `docs/task-cycles/programy-ze-starych-zapisow/gate-final.log` lines 2640-2708: the evidence named by the handoff, plus the lines before it for the Node result.
- `tests/invariants/test_local_start_access.py:296-310, 355-378`, `tests/account-api.test.mjs` (grep hits), `scripts/restore-trial.mjs`
  (grep hits): to check for fixed key sets.

## Unread material

- `.the-way/task-cycle/review/SKILL.md` and `fix.md`: read whole.
- The handoff and the fixer's report: read whole.
- `tests/deploy/test_account_storage.py`: read whole.
- The Node test files (`tests/account-api.test.mjs`, `http`, `transport`, `startup`, `account-storage`, `view/*`) and
  `scripts/restore-trial.mjs`: grep hits only, not read whole.
- `tests/deploy/test_restore_trial.py`, `tests/invariants/test_local_start_access.py`: the lines named above only.
- `gate-final.log`: lines 2640-2708 only.
- No guideline file was dispatched; I did not read `guidelines/testing.md` (the change is one expectation of an existing test and adds no
  new test kind).

## Searches not found or unclear

- Whether `npm test` (`scripts/test.py`) runs `foundation_check.py`: not looked up by me, as the change touches no foundation file or
  tracked file claimed by a part in a new way; the gate log tail names four directories only (562 tests in 4 directories).
- No other stale expectation of an account body or registration answer in `tests/deploy/*.py` or `tests/invariants/*.py`: none found.
- The findings file the dispatch refers to by "fix of a review's findings": the handoff names no findings file, only the gate failure
  log; I took the gate failure as the thing fixed.
