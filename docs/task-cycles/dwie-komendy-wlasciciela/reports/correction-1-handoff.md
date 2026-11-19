# Handoff — correction 1, for the human's remarks

## Delegation

As in `reports/author-handoff.md`: the orchestrator delegates the making of the correction to you;
nothing you decide is the human's approval; questions go to the orchestrator in your report. You do
not run the product's full gate (`npm test` or any command that runs every test): the orchestrator
runs it after the correction is reviewed.

## Where you work

- Worktree: `the root of the task's worktree` (branch
  `task/dwie-komendy-wlasciciela`), at head `07fb7ef0`. The range of the correction runs from `07fb7ef0`.
  The tree at `07fb7ef0` holds the code and foundation of `5d31c645`; the record copy that two commits
  added under `docs/task-cycles/` was removed again, and you do not touch `docs/task-cycles/`.
- Your directory for working copies: `.runs/author/` again, removed before you return.
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/correction-1-report.md`.

## Your stage

- Method: `.the-way/task-cycle/change/SKILL.md`; your variant, in the words of its row: "a correction
  for the human's remarks". Read the part of the method that variant names.
- The remarks bind, word for word: `reports/correction-1-remarks.md`
  (`docs/task-cycles/dwie-komendy-wlasciciela/reports/correction-1-remarks.md`), the comment of the
  adviser of the day on behalf of the author on the request. Read it whole. In short, it asks for two things
  in this request, and nothing else:
  1. the fix of the review's finding M-1 (the finding is in `reports/review-whole-report.md`, section
     "Minor", M-1): `isDatabaseBusy` in `src/server/database.ts` compares `errcode === 5`; make it read the
     primary result code, `(errcode & 0xff) === 5` as the finding suggests, with a test that gives extended
     busy codes, such as 261 and 517, and sees the advice to run the command again, and gives another extended
     code, such as 2067, and sees none. The change reaches the blocking and backup commands and the server's
     own retry of a busy database, which the human says is intended: the same gap affects all of them.
  2. a glossary entry "operator" in this request, with the meaning the entry `owner` of
     `foundations/glossary.md` already carries (its *Not* line names "operator" as the person who reaches the
     server and runs its commands).
- The remarks leave out, and you do not touch: the reading gap of the review of the whole change (let
  through), items 3 and 4 of the request's *You accept by merging* (accepted), the two decisions' wording,
  the tests of the earlier rounds, and everything else of the change.
- Notes of the orchestrator, to save you a search (verify them, do not trust them):
  - `isDatabaseBusy` is at `src/server/database.ts` near line 255, with `const SQLITE_BUSY = 5`; it is used
    by the blocking, backup, role and previous-save commands and, near line 322, by the server's retry of a
    busy opening (`if (!isDatabaseBusy(error) || performance.now() >= deadline) throw`). Search for every use.
  - The review found that `node:sqlite` on this Node reports SQLite's extended result code in `errcode`
    (a UNIQUE violation gave 2067, not 19). Its scratch evidence is kept in
    `reports/review-whole-scratch-result.md` and `reports/review-whole-scratch.mjs`, if you want it.
  - On the level of the test: read `guidelines/testing.md` whole before you write it (the real mechanisms
    D-84 asks for, the level, the shape of a case). A real busy error with an extended code may be possible
    to make with two connections to a WAL database (for instance a connection that starts a read
    transaction, another that writes and commits, and the first then trying to write may report
    `SQLITE_BUSY_SNAPSHOT`, 517) and a real UNIQUE violation reports 2067; try these before you fall back to
    an object shaped like the error, and say in your report which you used and why. This is a suggestion,
    not a requirement: you choose the level that the testing guidelines give.
  - Compare the behaviour you change with D-112, D-430 and `guidelines/testing.md`, and say in your report
    whether any sentence of them stops being true; change a decision only if one does, through the skill of
    the decision element, and say so. The task's two settlement rows are written already.
  - The glossary entry is a foundation entry: write it as `.the-way/task-cycle/skill/foundation_step.md`
    gives, by `.the-way/elements/glossary/skill/SKILL.md` (read it whole, with the template and rules that
    skill names), after the search of the foundation that skill asks for; run
    `python -B .the-way/elements/common/foundation_check.py` after the entry. Keep the `owner` entry
    consistent with it (a link, not a copy of the meaning). Mark the entry `the cycle's` in your report, with
    its meaning in one English sentence and one Polish sentence, for the request.
  - Do the return step for what the remarks touch, as `.the-way/task-cycle/skill/return_step.md` gives, and
    give its result in your report under the headings of the record's *Return step*: the entries the change
    writes or changes and those the search found compared with the code, decisions, invariants, environment
    facts, glossary terms, part-map changes.
- Commit as new commits on the branch, no amend and no rebase, adding files by path; then run the focused
  checks the correction touches (the three account test files and the test file you add or change, after
  `npm run build`; eslint and prettier on the changed code and test files; `tsc -p tsconfig.server.json
  --noEmit`; the foundation check; the instruction-files check; the size-rule run
  `node tests/quality/eslint-size-rules.mjs`), each with its command and exit code.

## What you read (named by the orchestrator)

D-112, D-430 (you compare them), D-84 and the testing decisions the guidelines name, the invariant
`account-database-schema`, the glossary (the whole product glossary, which is short), the part map entry of
`account-server`. Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`,
`guidelines/testing.md`.

## Answers of step 4 (unchanged)

Trust boundary: yes (`src/server/**`). Irreversible operation: no. Open design choice: none. Reserved
choice: none (the field of the record reads `none`).

## Reporting

As in your first handoff: status, commits, a one-line check result, the report path; the report holds
**Unread material**, **Searches not found or unclear**, the own-work check with commands and exit codes
(WAY-164), the weakest-point check, the working copies and that you removed them, each reach beyond this
handoff, and the return-step headings above.
