# Handoff — review of the fix of the whole-change review's findings

## Delegation

As in `reports/review-whole-handoff.md`: you are the reviewer who did not make the change; your grades
and scope are yours; you are read-only; questions go to the orchestrator in your report.

## Where you work

- Worktree: `the root of the task's worktree`. Range of the fix:
  base `a8361ff0d609724f51f856965faa57cb1164a76e` (the head you reviewed) to head `5d31c645` (one commit).
  Confirm that `git rev-parse HEAD` starts with `5d31c645`. Compute the diff yourself:
  `git diff a8361ff0..5d31c645`.
- Your directory for working copies: `.runs/review-fix/` (the rule of your first handoff, word for word,
  holds: a copy goes only there, and you remove it and say so before you return).
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/review-fix-report.md`; first line
  `PASS <sha>` or `FAIL <sha>`.

## Your stage

- Method: `.the-way/task-cycle/review/SKILL.md`, the review of a fix; read `fix.md` beside it and follow it:
  what you read and what bounds this review.
- The findings the fix answers: `reports/whole-review-findings.md`
  (`docs/task-cycles/dwie-komendy-wlasciciela/reports/whole-review-findings.md`): blocking I-1 and I-2,
  and the Minor findings within the task M-2 and M-3, in your words. Your Minor finding M-1 (outside the
  task) is not part of the fix.
- The fix report, a set of claims to verify:
  `docs/task-cycles/dwie-komendy-wlasciciela/reports/fix-report.md`.
- The orchestrator's ruling that the fixer was given, which you may grade: "the operator" is the English
  word for the person who runs the commands on the server in D-112, D-430 and every place of the finding;
  "owner" stays only where it means the account role. The fixer was asked to change the seven test
  citations that quote the changed sentences so that each still begins the binding sentence it quotes
  (the foundation check holds it to that), and to search the change once more for another place where
  "owner" names the person at the server.
- Trust boundary: yes (`src/server/**`); the fix does not change code of the commands, only a comment of
  `database.ts` and tests, so a new crafted-input run is not required unless you find a reason.
- Run the checks the fix touches again: `python -B .the-way/elements/common/foundation_check.py`, the
  three account test files after `npm run build`, with each command and exit code. Do not run the
  product's full gate: the orchestrator runs it.

## Reporting

First line `PASS <sha>` / `FAIL <sha>`; graded findings (a new Critical or Important finding in the fix
counts as remaining; a Minor finding does not block); the checks you ran with command and exit code;
**Unread material**; **Searches not found or unclear**; each reach beyond the handoff; the working copies
and that you removed them. Return the first line, a one-line check result and the report path.
