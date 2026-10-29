# Fix report — finding O1 (`tests/deploy/test_account_storage.py`, from Slice 5)

**Status:** done

**Commit:** `fab1f2e` on `task/potwierdzenie-adresu`, on top of `fea6091` —
`test: :white_check_mark: compare only the account's fields of the registration answer after a container replacement`

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/deploy/test_account_storage.py` | 3 | 1 |

## Finding O1 — fixed

The test took the whole `POST /api/accounts` body as the expected account. Since `5ab1b5a` that body also carries `confirmationMessage`, which `GET /api/account` and `POST /api/session` do not carry.

**How it is fixed:** `account` is now the registration body's `id`, `email` and `emailConfirmed` only (`tests/deploy/test_account_storage.py:128-130`). The three later comparisons stay equality comparisons of whole bodies: the read before the replacement, the read after it, and the sign-in after it. So any extra or missing account field in those reads still fails.

**Reason, per "Changing an existing test" in `guidelines/testing.md`:** the requirement changed, not the test's strength. D-145 (K3) has the registration answer carry the outcome of its sending. D-109 and spec Decision 4 give account reads and sign-in only the account body with `emailConfirmed`. The case still checks `account-schema-lifecycle`.

**Rejected:** adding `confirmationMessage` to the expected reads. That would assert a field the account reads must not have. It would also tie a storage test to the mail outcome; the container's mail settings point at `smtp.example.test`, so that outcome is `failed`.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_account_storage.py` at `fea6091`, without the fix (the change stashed) | 1 | `FAILED (failures=1)`. The tuples differ only by `'confirmationMessage': 'failed'`, as the finding says. Log `.runs/task-cycles/potwierdzenie-adresu/slice5-logs/o1-deploy-red.log`. |
| `npm test -- tests/deploy/test_account_storage.py` | 0 | `Ran 1 test in 45.541s`, `OK`; the case ran (Docker answered, not skipped). Log `.runs/task-cycles/potwierdzenie-adresu/slice5-logs/o1-deploy.log`. |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/deploy/test_account_storage.py` | 0 | All checks passed |

Not run: the whole gate (the cycle's run). No other file was touched.

## Reaches beyond the dispatch

None. I read the findings file, `.the-way/task-cycle/change/fix.md` and the test file.
