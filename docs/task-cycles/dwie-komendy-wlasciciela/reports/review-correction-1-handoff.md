# Handoff — review of correction 1

## Delegation

As in `reports/review-whole-handoff.md`: you are the reviewer who did not make the change; your grades
and scope are yours; you are read-only; questions go to the orchestrator in your report.

## Where you work

- Worktree: `the root of the task's worktree`. Range of the correction:
  from `07fb7ef0` to head `7e91cbfe` (two commits: `4b11f209` and `7e91cbfe`). Confirm that
  `git rev-parse HEAD` starts with `7e91cbfe`. Compute the diff yourself:
  `git diff 07fb7ef0..7e91cbfe` and `git log 07fb7ef0..7e91cbfe`. (`07fb7ef0` holds the same code and
  foundation as `5d31c645`, which you passed, plus the commit pair of the record copy and its removal.)
- Your directory for working copies: `.runs/review-correction-1/` (the rule of your first handoff holds: a
  copy goes only there, and you remove it and say so before you return).
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/review-correction-1-report.md`; first line
  `PASS <sha>` or `FAIL <sha>`.

## Your stage

- Method: `.the-way/task-cycle/review/SKILL.md`, the review of a correction made for the human's remarks;
  read `fix.md` beside it and follow it: what you read and what bounds this review. The human's remarks stand
  in the place of a findings file: `reports/correction-1-remarks.md`
  (`docs/task-cycles/dwie-komendy-wlasciciela/reports/correction-1-remarks.md`), word for word, and they bind
  the correction. Two remarks ask for changes: (1) your own finding M-1, with a test of extended busy codes
  (261, 517 → advice; another extended code such as 2067 → none), reaching also the blocking and backup commands
  and the server's retry of a busy opening, which the human says is intended; (2) a glossary entry `operator`
  in this request, with the meaning the entry `owner` already carries. The reading gap of your review of the whole
  change was let through, and items 3 and 4 of the request's *You accept by merging* were accepted; these are
  not for this review to reopen.
- The correction's report, a set of claims to verify:
  `docs/task-cycles/dwie-komendy-wlasciciela/reports/correction-1-report.md`. Its weakest point, stated by the
  author: no test drives the server's busy-opening retry with an extended code; the new case holds
  `isDatabaseBusy` only through its own call. You grade that.
- What the review has to cover: the code change in `src/server/database.ts` against the remark (and any crafted
  value `errcode` can take: non-number, negative, NaN, a code whose low byte is 5 but which is no busy code in
  SQLite, `undefined`, a BigInt); the new test in `tests/account-storage.test.mjs` against `guidelines/testing.md`
  (level, shape, real mechanisms, whether the cases it builds really give 517, 5 and 2067 and fail on the old
  comparison); the glossary entry against the glossary's template and rules (`.the-way/elements/glossary/`),
  against the entry `owner` and the decisions that use the word, and the change to the `owner` entry; whether any
  sentence of D-112, D-430, `guidelines/testing.md` or `guidelines/coding-database-access.md` stops being true
  with the new behaviour of `isDatabaseBusy` (the correction's report says none does); and that nothing else
  changed outside the remarks.
- Trust boundary: yes (`src/server/**`); `isDatabaseBusy` decides the advice of the four commands and the
  server's retry of a busy opening, so check the crafted inputs named above.
- Run the checks the correction touches again, each with its command and exit code:
  `python -B .the-way/elements/common/foundation_check.py`, and after `npm run build` the three account test
  files and `tests/account-database-check.test.mjs` (`node scripts/test-node-file.mjs <file>`). Do not run the
  product's full gate: the orchestrator runs it.

## Reporting

First line `PASS <sha>` / `FAIL <sha>`; graded findings (a new Critical or Important finding counts as
blocking; Minor findings of this review are not fixed in this round); the checks you ran with command and exit
code; **Unread material**; **Searches not found or unclear**; each reach beyond the handoff; the working copies
and that you removed them. Return the first line, a one-line check result and the report path.
