# Finding to fix — from the Slice 9 review (`reports/23-slice9-review-report.md`), traced to Slice 5

Copied word for word from the review report (lines 76-97); the reviewer marked it outside Slice 9 and inside the task, coming from Slice 5 (`5ab1b5a`):

## Out of scope of this slice (inside the task)

**O1. `tests/deploy/test_account_storage.py` fails at `37d7bc8`, and the failure comes from Slice
5 (`5ab1b5a`).** It is Important for the whole change, which cannot pass its gate with it; it is
not counted against Slice 9.
Where: `tests/deploy/test_account_storage.py:133`,
`self.assertEqual((before["status"], before["body"]), (200, account))`, where `account` is the
`POST /api/accounts` body. Since `5ab1b5a` that body also carries `confirmationMessage`
(`src/server/account-routes.ts:422`; `git log -S confirmationMessage -- src/server/account-routes.ts`
names only `5ab1b5a`). `GET /api/account` (`account-routes.ts:115`) carries only `id`, `email`
and `emailConfirmed`. The test container's settings point at `smtp.example.test`, so the send
gives `failed`.
My run at `37d7bc8` in a separate worktree: exit 1, one failure, `{'id', 'email',
'emailConfirmed': False}` against the same keys plus `'confirmationMessage': 'failed'`. This
slice's files do not enter the test, which reads only the database path and volume from
`compose.yaml`.
Suggested fix, for the orchestrator to assign: compare the account fields of the registration
body (`id`, `email`, `emailConfirmed`) with `GET /api/account`. The reason, under "Changing an
existing test" in `guidelines/testing.md`, is requirement K3: the registration response
carries the send's outcome, and account reads carry only account state. The test then still
checks the invariant `account-schema-lifecycle`.

