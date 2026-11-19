# Handoff — the fix of the review's findings

## Delegation

As in `reports/author-handoff.md`: the orchestrator has delegated the making of this change to you;
nothing you decide is the human's approval; questions go to the orchestrator in your report.

## Where you work

- Worktree: `the root of the task's worktree` (branch
  `task/dwie-komendy-wlasciciela`). The range of the fix runs from the reviewed head `a8361ff0`.
- Your directory for working copies: `.runs/author/` again (removed before you return, as in your first handoff).
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/fix-report.md`.

## Your stage

- Method: `.the-way/task-cycle/change/SKILL.md`; your variant, in the words of its row: "the fix of a
  review's findings". Read the part of the method that variant names.
- The findings file: `reports/whole-review-findings.md`
  (`docs/task-cycles/dwie-komendy-wlasciciela/reports/whole-review-findings.md`). It holds two blocking findings
  (I-1, I-2) and two Minor findings of the review of the whole change that are within the task (M-2, M-3),
  in the reviewer's words; the reviewer's full report is `reports/review-whole-report.md` for any evidence a
  finding cites. Fix all four, each with the fix the finding gives or an equivalent you name. If you hold a
  finding wrong, answer it with evidence in your report; never leave it silently.
- The orchestrator's rulings on the findings, which bind you:
  - I-1: the English word for the person who runs the commands on the server is "the operator" (glossary
    `owner` entry, lines 284–288; D-112 paragraph 1, D-137, D-400, D-354 and the part map). The task's
    Polish "właściciel" is, in the product's English, "the operator". This changes the wording of the
    settlements of rows 1 and 2, not what they settle: the rule binds every command the operator runs on the
    server that changes or copies the account database, the same two exclusions. Change every place the finding
    lists (D-112 rule, *Verification*, *Rationale*; D-430 question, rule, *Rationale*; the `database.ts`
    comment, M-2) and the test citation lines that quote those sentences — the five that changed and the two
    new ones — so that each citation still begins the binding sentence it quotes; run the foundation
    check after each step. For the Polish guideline `guidelines/coding-database-access.md` (M-2), use
    "operator" as `guidelines/coding.md` does ("operatorowi"), unless you find a reason to keep the Polish
    word, which you then name. Search the change once more for any other place in which "owner" names the
    person at the server (the two deploy skill copies, `guidelines/testing.md`, the two commands' headers,
    the new test names and comments) and correct those the same way; name each in your report. Keep the
    word "owner" where it means the account role (the owner role, the owner panel).
  - I-2: name the file instead of "tamże", or reorder the clauses, so that the
    `account-database-schema` case is pointed to `tests/account-storage.test.mjs`.
  - M-3: make the two renamed cases also assert the absence of the advice for a damaged file (the sentence
    without "run the command again"), without weakening any assertion.
  - M-1 of the review (the extended error code of `isDatabaseBusy`) is outside the task: do not change it.
- Run the focused checks the findings touch again (the three account test files after `npm run build`,
  eslint and prettier on the changed code and test files, the foundation check, the instruction-files check,
  the agent-workflow skill tests), each with its command and exit code. Do not run the product's full gate
  (`npm test` or any command that runs every test): the orchestrator runs it.
- Commit the fix as new commits on the branch (no amending, no rebase), adding files by path.

## Answers of step 4 (unchanged)

Trust boundary: yes (`src/server/**`). Irreversible operation: no. Open design choice: none. Reserved choice: none.

## Reporting

As in your first handoff: status, commits, a one-line check result, the report path; the report holds
**Unread material**, **Searches not found or unclear**, the own-work check with commands and exit codes,
the working copies and that you removed them, and each reach beyond this handoff.
