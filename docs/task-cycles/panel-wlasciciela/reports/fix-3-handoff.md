# Handoff — the fix of slice 3's findings ("panel właściciela")

You are the executor of slice 3, resumed. Variant of `make-change`: **"the fix of a review's findings"**.

- Worktree: `the task's worktree`, branch `task/panel-wlasciciela`, reviewed head `85966562aadfa413888dab094544f707710bf942`. Your fix's range runs from that head. Commit by explicit paths, in English.
- Findings: `.runs/task-cycles/panel-wlasciciela/reports/fix-3-findings.md` (the review: `.runs/task-cycles/panel-wlasciciela/reports/review-3-report.md`). One blocking finding, I-1: no test checks that a real change of role ends no session and stops no link and blocks nothing.
- The tests must fail on the reviewer's mutation (`made-owner` also blocks the account, which ends its sessions and stops its links) and on a mutation where an "already" outcome blocks the account; give the account a live session and an emailed link in the test's fixture (see how `tests/account-owner.test.mjs` and `tests/account-storage.test.mjs` build them), assert after each of the four outcomes that both stand and `blocked` is false. Do not change `src/server/**` unless a test cannot be written without it.
- Checks, each with command and exit code: `npm run typecheck`; `npm test -- tests/account-owner.test.mjs`; `npm test -- tests/account-storage.test.mjs`; `npm test -- tests/startup.test.mjs`; `python -B .the-way/elements/common/foundation_check.py`; `npx prettier --check` and `npx eslint` on every file you changed. Show the new assertions failing on each mutation (apply by hand, run, restore, give exit codes). Do not fix the Minor findings; never run the gate.
- Working copies: your directory is `.runs/executor-3/`, removed before you return.
- Report: `.runs/task-cycles/panel-wlasciciela/reports/fix-3-report.md`: status, commits, checks with command and exit code, **Unread material**, **Searches not found or unclear**, working copies.
