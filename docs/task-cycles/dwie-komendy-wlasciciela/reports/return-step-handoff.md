# Handoff — the return step

## Delegation

As in `reports/author-handoff.md`: the orchestrator has delegated the making of this change to you;
nothing you decide is the human's approval; questions go to the orchestrator in your report. You do not
run the product's full gate (`npm test` or any command running every test): the orchestrator runs it.

## Where you work

- Worktree: `the root of the task's worktree` (branch
  `task/dwie-komendy-wlasciciela`), at head `5d31c645`, which the review of the fix passed
  (`reports/review-fix-report.md`, `PASS 5d31c645`); the whole change's range is `23b521a2..5d31c645`.
- Your directory for working copies: `.runs/author/` again, removed before you return.
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/return-step-report.md`.

## Your stage

- Method: `.the-way/task-cycle/skill/return_step.md` (read it whole), with `.the-way/task-cycle/change/SKILL.md`
  for committing and reporting; the foundation step file `.the-way/task-cycle/skill/foundation_step.md` it
  rests on, and the `SKILL.md` of an element at the path that file gives when you write an entry of that element.
- Your task: compare with the code the entries the change writes or changes (D-112, D-430), those the task
  names (D-400, D-410, and the decisions of its *Decisions in play*) and those the search of the foundation
  finds, and the part map entry of `account-server` (and `agent-workflow`, `product-foundation`), and
  correct in the same change whatever no longer matches. Open whole, which you did not in your first run:
  D-400, D-410, D-137, D-231, D-354, D-360 and D-114, the glossary entries of the terms the change uses
  (`owner`, `operator` and `previous-save privilege`), the invariant `account-database-schema` and the
  invariants of the part `account-server` that bear on the commands' refusals and failure lines. Search the
  whole foundation once for the places that still say the two commands set up a database in an empty file, or
  that D-112/D-430 bind only the blocking and backup commands, or that name only two commands as the ones that
  refuse a file with no tables (glossary, environment facts, invariants, the other guidelines, the
  `loop2-deploy` references).
- Then say, for each of: decisions, invariants, environment facts, glossary terms, part-map changes, projected
  entries and rows of *Settlements to record* (rows 1 and 2 went to D-112 and D-430 — name them with the
  identifiers), what you wrote or changed, or `none`. Write an invariant only for a rule the task, a
  decision or the human sets. The task's *Settlements to record* rows are written; nothing else is deferred.
- Frozen task: `docs/task-cycles/dwie-komendy-wlasciciela/task-frozen.md`.
- If you change a file, commit it (new commit, no amend), run the foundation check and the focused checks
  your change touches with each command and exit code. If nothing needs changing, return with no commit.

## Answers of step 4

Trust boundary: yes (`src/server/**`). Irreversible operation: no. Open design choice: none. Reserved choice: none.

## Reporting

As in your first handoff: status, commits (or none), a one-line check result, the report path; the report
holds, under the headings of the record's *Return step*, the entries and the part map compared and what no
longer matched, **Unread material**, **Searches not found or unclear**, the working copies and that you
removed them, and each reach beyond this handoff.
