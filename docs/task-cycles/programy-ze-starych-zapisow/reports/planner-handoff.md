# Handoff — planner

You are the planner of one task of the loop2 repository, in a task cycle run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human.

- Worktree (work from its root, change no tracked file): `the task's worktree`, branch `task/programy-ze-starych-zapisow`, base `6f237fb8ce26450706d8738d3d3a07298e8ec110`
- Method: read in full `.the-way/task-cycle/plan/SKILL.md` (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`; a file it names only when the step or variant that names it comes). The project skill is `the-way-plan-task`.
- Stage and boundary: you write the plan and its size report; no code, no test, no foundation entry. Plan path: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`; size report: `docs/task-cycles/programy-ze-starych-zapisow/plan-size.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/planner-report.md`. You return `done`, `done with concerns`, `questions`, `returned` or `reserved`.
- Frozen task, read whole: `docs/task-cycles/programy-ze-starych-zapisow/task.md`
- Reviewed spec, read whole (it binds where it settles more than the task; the task binds where they differ), including its last section *Decisions (settled by the orchestrator after the review of the spec)*: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`. The spec's reviews: `reports/spec-reviewer-report.md` (FAIL, first attempt) and `reports/spec-revision-review-report.md` (PASS). `spec-reviewed.md` is the superseded attempt: do not use it.
- The orchestrator's judgment of the route: the change crosses account-server (schema, routes, command, the deploy skill and its twin), simulation (the reader of programs, the append) and browser-view (client, pull, reset), with foundation entries, guidelines and about ten test files; it needs division. Slice along the spec's decision 7 units where that gives slices that each fit one agent, one after another in the order the code needs (the server before the client before the view is a natural order, yours to judge), each slice with its own focused checks and none running the gate.

## Answers of the orchestrator at start

- Trust boundary: yes — `src/server/**` and `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; mark each slice that touches those files with *Risk* accordingly.
- Irreversible operation: no; the schema step is additive and the upgrade of an existing database is tested; granting the privilege is a human's command on the server which the change only prepares.
- Reserved choice: none. Open design choice: settled by the reviewed spec.
- Base checks: the gate on the base is `npm test`; its result is recorded in the cycle record, which you do not read. No failing check on the base is known to the orchestrator yet; if the planner needs a check list for the slices, it names the focused commands from `guidelines/testing.md`.

## What to read (selected by the orchestrator; read each whole)

Foundation, in `foundations/`:

- `part_map.md`, `glossary.md` (whole); the-way's glossary at `.the-way/foundations/glossary.md` where a term is missing
- decisions in `decisions.md`, each from its heading to the next: D-01, D-02, D-07, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204, D-205, D-206, D-207, D-208, D-209, D-210, D-211, D-212, D-213, D-229, D-353, D-354, D-355, D-386
- invariants in `invariants.md`, each whole: save-version, saved-state-http-exchange, saved-program-edit, copy-save, account-save-sqlite-store, account-save-sqlite-upgrade, account-schema-lifecycle, account-database-schema, account-save-durable-storage, account-save-backup, player-save-isolation, account-session-authorization, account-mutation-request-guards, account-client-requests, account-client-outcomes, blocked-account-access

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/coding-http-application.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (the files of the part `browser-view` are listed in `foundations/part_map.md`; `src/browser/AGENTS.md` also applies in `src/browser/`). Name in the report what you find missing or uncertain in them.

Code and tests: as far as needed to name each slice's files and what its agent reads: `src/server/database.ts`, `src/server/account-routes.ts`, `src/server/account-block.ts`, `src/server/transport.ts`, `src/browser/account-api.ts`, `src/browser/view/app.ts`, `src/browser/view/game-saver.ts`, `src/browser/view/game-view.ts`, the program list's view file, `src/browser/sim/saved-game.ts`, `src/browser/sim/programs.ts`, the tests the spec names, `.claude/skills/loop2-deploy/SKILL.md` and its twin `.agents/skills/loop2-deploy/SKILL.md`.

## The plan's contents that the method asks for, specially

- *Foundation entries*: the spec's *Foundation entries* list the decisions, invariants, glossary terms and the part-map change the change writes; the plan assigns them (the plan's *Foundation entries* written before slice 1 as the method gives, by the skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`), and its rows of *Settlements to record* 1–5 of the task are covered.
- Each slice names the files it changes, its *Read* (foundation entries by identifier, guideline files whole, passages of the task, spec and plan), its *Model* class with a reason where not `cheaper`, its *Risk*, its focused *Checks*, and its *Choices*.
- Tests that read the schema version as 4 are work of the slice that adds the schema step (the spec's decision 7 lists them).

## Report

Write the full report to the report path by the method's report form and return: status, the check result (the planner runs only the size script: its command and exit code), the report path, your questions and concerns, the reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Write nothing outside `docs/task-cycles/programy-ze-starych-zapisow/`.
