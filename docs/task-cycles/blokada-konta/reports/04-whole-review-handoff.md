# Handoff — review of the whole change, task `blokada-konta`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer of the whole change**, a
fresh agent that made none of it. Read-only: change no file, make no commit, never deploy or reach
the test server. Your questions go to the orchestrator, never to the human. Do not run the
product's full gate (`npm test` without arguments); that run is the orchestrator's. Focused checks
run as `npm test -- <test file>` from the worktree root.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\blokada-konta`, branch
  `task/blokada-konta`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree. Read it whole; read a file it
  names (`whole_change.md` beside it for this review) when the step that names it comes.
- What is reviewed: **the whole change**, range `6540e4c..81cb7c6` (task base `6540e4c` on `main`
  to head `81cb7c6`).
- Frozen task: `.runs/task-cycles/blokada-konta/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/blokada-konta/spec.md` (its review `PASS`,
  `reports/02-spec-review-report.md`).
- Plan: none — one author without a plan.
- The author's report: `.runs/task-cycles/blokada-konta/reports/03-author-report.md`.
- Report path: `.runs/task-cycles/blokada-konta/reports/04-whole-review-report.md`

## The move of the pin

The task moved the-way's pin: the branch's first commit `ed9da63` holds only the gitlink of
`.the-way`, from `574a37b` to `3aee7d9` (the newest commit of the-way's default branch
`foundations`, as the user asked), made with `python -B <clone at 3aee7d9>/installation/install.py`
whose preview and apply printed `MOVE .the-way` and `KEEP` for every other file. Checks the move
carried: none — the gate on `ed9da63` fails only `test_loop2_one_serving_process`, which fails on
the base the same way (`Get-NetTCPConnection -State Listen` finds no object on this machine).

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` the trust boundary of
  `account-server`; the change touches the login route (`POST /api/session`), the session reads of
  authenticated routes and the database opening, which take in data from the network and from the
  database file, and adds an owner command taking an email address from its arguments. Check
  crafted input at that boundary.
- Irreversible operation: **yes**. The change carries the first migration of the persistent
  account database `loop2_accounts` on the test server from schema version 1; after it, a rollback
  to a commit before this task refuses that database (D-112, deploy exit code 8). Check that the
  change only prepares it — code, tests on temporary databases, the deploy skill's text — and that
  nothing in it deploys, migrates the server's database or runs the command on the server; the
  human deploys the request's commit and blocks and unblocks a test account.

## The orchestrator's answers to the author's questions

The author's report, § "Questions for the orchestrator", asked three; each was answered as the
author recommended (recorded in the cycle's questions table): D-130 keeps `Relations: none`, and
task 16's cycle adds the two links when it writes the decisions they name; D-101 stays as it is;
the existing row of `guidelines/testing.md` about the email lock keeps its word. These are the
orchestrator's routing answers, not a grading of anything you find.

## Selection

You select your own foundation entries and guidelines by the parts of the change, as
`whole_change.md` gives. The task's *Decisions in play* list the entries it touches. The task's
source `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (approved
2026-10-28) may be searched selectively for the full approved text of a projected entry the change
writes (D-130, `blocked-account-access`, `player-server-session`); the refinement conversation the
task names no longer exists.

## Return

Write the report as the method gives, its first line `PASS <sha>` or `FAIL <sha>`, and return that
first line with the report's path.
