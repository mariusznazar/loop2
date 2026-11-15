# Report — fix of slice 4's findings

## Status

`done`

## Commits

- `8be524ab` docs: :memo: make the owner-panel invariant hold the refusal to block an account with the owner role, and cite it from the test of that refusal (D-137, D-400, D-410). Files: `foundations/invariants.md` (2 lines changed), `tests/owner-routes.test.mjs` (+1 line, a comment).

## Finding I-1: fixed

- **How:** the sentence of `owner-panel-authorization` (`foundations/invariants.md`, entry at about line 729) now reads: "Each of the five routes of the owner panel answers JSON 401 to a request without a valid server-side session and JSON 403 to a valid session of an account without the owner role, that role read from the database at the request and never from the session, and the block route answers JSON 409 to a block of an account with the owner role, the caller's own included, and each route changes nothing of any account, session or link when it refuses." It is the four things of row 8 in one sentence, so the invariant stays one entry; the template's pair (WAY-56) joins them, since all are about who may act through the panel. No split was forced.
- *Derives from* is now `D-109 · D-137 · D-400 · D-410`: D-400 gives two of the five routes the sentence names, D-410 the owner role it names. I did not change *Verification* of D-400 or D-410 (the foundation check does not ask for it).
- The test of the refusal ("a block of an account with the owner role, the caller's own included, is answered 409 owner-not-blockable…") now carries `// invariant: owner-panel-authorization` above its `// decision:` line. No assertion changed.
- Written by editing `foundations/invariants.md` following the form of the project skill `the-way-record-invariant` (read in the first run of this task, `.the-way/elements/invariants/` template, skill files and `elements/common/*`); I had no skill tool.
- **The check that shows it:** against a break of the code that lets the panel block an owner (`blockForPanel` replaced by `blockAccount` in `owner-routes.ts`, restored after), the 409 test fails, so the invariant's new half has a test seen failing: `npm test -- tests/owner-routes.test.mjs` exit 1 with `✖ a block of an account with the owner role, the caller's own included, is answered 409…` as the only failing test (`fix-4-evidence/mutant.txt`). On the restored code the same command exits 0.

## Checks (command and exit code)

| Check | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before and after staging; `0 errors`) | 0 |
| `npm test -- tests/owner-routes.test.mjs` (13 pass, 0 fail) | 0 |
| `npm test -- tests/owner-routes.test.mjs` with the break above | 1 (one test fails, the 409 test) |
| `npx prettier --check tests/owner-routes.test.mjs` (the only code file changed) | 0 |
| `npx eslint tests/owner-routes.test.mjs` | 0 |

The gate (bare `npm test`) was not run, by the handoff. The Minor findings were not fixed, as the handoff says.

## Working copies

`.runs/executor-4/` held a copy of `owner-routes.ts` for the break run and the logs. Removed; the logs are kept in `.runs/task-cycles/panel-wlasciciela/reports/fix-4-evidence/` (`foundation.txt`, `green.txt`, `mutant.txt`). The code file is identical to the committed one (`git status` clean). No remainder.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/reports/review-4-report.md`: not opened (the findings file carries the finding in the reviewer's words).
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md` row 8 was read in the first run of this task (the passage at lines 136-150), not again; `plan.md:30` and `plan.md:165` were not opened, only quoted in the findings file.

## Searches not found or unclear

None.
