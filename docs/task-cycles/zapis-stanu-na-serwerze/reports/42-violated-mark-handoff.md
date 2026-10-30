# Handoff — the work after H2, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh agent that makes the plan's
**work after H2**: removing the violated mark of one invariant. Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head `bd02985` (the head of request #43). Process pin `.the-way`
  at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` — read it whole; your variant is "a correction for
  the human's remarks" (the work the request waited for after the human's actions). Write the
  entry through the project skill `.claude/skills/the-way-record-invariant`, reading it and the
  files it points to inside `.the-way` as its steps give.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/42-violated-mark-report.md`
- Commit by path (English message in the form of the existing commits); real hash from
  `git rev-parse --short HEAD`. Do not push. Do not run `npm test` with no argument; run
  `python -B .the-way/elements/common/foundation_check.py` and report its command and exit code.

## The work

The task's To do 14 (frozen task `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, line 32):

> 14. Po sprawdzeniu na serwerze testowym, że zapis stanu gry przeżywa wymianę kontenera aplikacji (Human actions, H2), cykl zdejmuje znacznik naruszenia z niezmiennika `account-save-durable-storage` skillem `the-way-record-invariant` (pytanie 11; plan, Projected entries: `account-save-durable-storage/1 | 15, 16 | 16`).

The plan (`.runs/task-cycles/zapis-stanu-na-serwerze/plan.md`, § Work after H2, and *Foundation
entries* row 31) gives the same work.

The evidence, recorded in the cycle record by the orchestrator:

- H1, 2026-10-30 14:43Z: the human deployed `bd02985` to the test server with the installed script
  (`deployed bd02985…, previously e5025f6…`); the database moved to schema version 4; the human
  made a recognisable change on a test account (a character created, a program edited), and the
  same game came back after sign-in in a second browser.
- H2, 2026-10-30 15:23Z: the human deployed the same commit again
  (`deployed bd02985…, previously bd02985…`); the application container was replaced (started
  15:23:49Z, after H1; read-only check by the orchestrator through the `mikrus` MCP), the volume
  `loop2_accounts` stayed; after it the human reported: "działa, postać i program wróciły po
  wdrożeniu" — the character and the program came back.

Also read D-17 and D-205 (the decisions `account-save-durable-storage` derives from) and the
environment fact `docker-volume-lifecycle` it rests on. Change nothing else; where the entry's
wording or its method no longer matches this evidence, say so in your report rather than widen
the change.

## Return

Return your status, your commit, a one-line check result and the report path.
