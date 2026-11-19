# Handoff — review of the whole change

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You are
an agent that did not make the change. Your grades and your scope are yours; nothing here fixes them.
Questions go to the orchestrator in your report, as your method gives. You change no file of the
change; you are read-only.

## Where you work

- Worktree, the root you work from: `the root of the task's worktree`
  (branch `task/dwie-komendy-wlasciciela`).
- Range to review: base `23b521a282f6a7f307bebc800b0fd985b2dbb6f8` to head `a8361ff0` (confirm that
  `git rev-parse HEAD` starts with `a8361ff0`; on a mismatch, ask). Compute the diff yourself:
  `git diff 23b521a2..a8361ff0` and `git log 23b521a2..a8361ff0`. Two commits: `fc94ef7e` and `a8361ff0`.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your directory for working copies: `.runs/review-whole/`.
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/review-whole-report.md`; its first line
  is `PASS <sha>` or `FAIL <sha>` (or `questions`).

Working copies, word for word from the cycle's rule: An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## Your stage

- Method: `.the-way/task-cycle/review/SKILL.md` (the-way's `review-change`). Read it whole; for the
  review of the whole change read `whole_change.md` beside it, as it says, and read any other file it
  names only when the step that names it comes. Your variant: the review of the whole change. You select
  your own foundation and guidelines, by the parts of the change (`account-server`, `agent-workflow`
  — the skill copies and the guidelines — and `product-foundation`), by "Reading the foundation"
  in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, and write
  and read the index of your selection of decisions, counting the decisions you read whole for the report.
  Write the index to `.runs/review-whole/index.md`.
- The frozen task, whole: `docs/task-cycles/dwie-komendy-wlasciciela/task-frozen.md` (every *To do*
  item 1–6, *Questions to settle*, accepted rows 1–2 of *Settlements to record*, *Decisions in play*,
  *Out of scope*). Check each item, each settlement row and source fidelity: the sentences of D-112 and
  D-430 against the task's settlements and the quoted decisions; the new wording against the task's
  quotations; the prose places against their quoted anchors.
- There is no spec and no plan: one author made the whole change, without a plan.
- The author's report, a set of claims to verify, not evidence:
  `docs/task-cycles/dwie-komendy-wlasciciela/reports/author-report.md`. Its **Unread material** names what
  the author did not open whole: D-400, D-410, D-137, D-231, D-354, D-360, D-114, D-252, D-253, the
  invariants other than `account-database-schema`, the glossary and the part map entry of `account-server`;
  you judge the change against them yourself, from your selection. The author's stated weakest point:
  `isDatabaseBusy` in `src/server/database.ts` reads `errcode === 5` only, so a busy error reported with an
  extended code would get no advice to run again; that function is unchanged and shared with the two
  earlier commands — you grade it as you find it.

## Answers of step 4 of the cycle

- **Trust boundary: yes.** `src/server/**` is the trust boundary of the part `account-server`; the change
  touches `src/server/account-role.ts`, `src/server/account-previous-save.ts` and the comment in
  `src/server/database.ts`, which take in a file from outside, the file `LOOP2_DATABASE_PATH` names. Check
  crafted input at that boundary: build the commands and run them on files of every kind the task names
  (empty file, a file that is no SQLite database, a SQLite file with no schema version, a database damaged
  past its first page, a newer schema, a busy database) and on a directory, an unset path and `:memory:`;
  check that no case changes a file, creates a file or sidecar (`-wal`, `-shm`), or prints a value of the
  database, a password hash or a session identifier, and that the exit code and the sentence are those of
  the task for each case.
- **Irreversible operation: no.** The cycle runs no command on a real database; check that the change only
  changes what the commands refuse and say.
- Open design choice: none. Reserved choice: none. The route is one author without a plan; there was no
  review of a slice.
- The change was made by `the-way-author`, class `same` as the orchestrator's.

## What the orchestrator names

- Guidelines of the parts: you select by the reading procedure; at least `guidelines/coding.md`,
  `guidelines/coding-database-access.md` and `guidelines/testing.md`, each whole, apply, as the change edits
  the last two.
- The five test lines that quote D-112 and D-430 and the foundation check: run
  `python -B .the-way/elements/common/foundation_check.py` yourself, and the focused tests of the three
  account test files (`node scripts/test-node-file.mjs tests/account-owner.test.mjs`, likewise
  `tests/account-storage.test.mjs` and `tests/account-backup.test.mjs`, after `npm run build`), with
  each command and exit code in your report. Do not run the product's full gate (`npm test` or any command
  running every test): the orchestrator runs it.
- Two decisions are rewritten by the change: read the D-112 and D-430 entries before and after
  (`git show 23b521a2:foundations/decisions.md`), whole, with their *Rejected*, and judge whether the new
  text keeps what the old held except what the settlements change.

## Reporting

Report as your method gives: first line `PASS <sha>` / `FAIL <sha>`, graded findings, each with its
place, the checks you ran with command and exit code, **Unread material**, **Searches not found or
unclear**, each reach beyond the handoff, how many decisions of your index you read whole, the working copies
and that you removed them. Return the status line, a one-line check result and the report path.
