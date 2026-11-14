# Handoff — reviewer of the spec

You review, as an agent that did not write it, the spec of one task of the loop2 repository, in a task cycle run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human.

- Worktree (work from its root, change no tracked file): `the task's worktree`, branch `task/programy-ze-starych-zapisow`, base `6f237fb8ce26450706d8738d3d3a07298e8ec110`
- Method: read in full `.the-way/task-cycle/spec/SKILL.md` and, since the variant names it, the file it names for the reviewer's work when its step comes (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). The project skill is `the-way-write-spec`. Your variant: the reviewer of the spec (first attempt: the spec has not been revised).
- Stage and boundary: read-only. Review `docs/task-cycles/programy-ze-starych-zapisow/spec.md` against the frozen task and the foundation entries below, and return `PASS` or `FAIL` with graded findings as the method gives. Write nothing but your report. No code, no plan, no change of the spec.
- Frozen task, read whole: `docs/task-cycles/programy-ze-starych-zapisow/task.md`
- Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/spec-reviewer-report.md`
- The designer's report (for its reach, unread material and choices): `docs/task-cycles/programy-ze-starych-zapisow/reports/spec-designer-report.md`

## What to check in particular

- Source fidelity: every sentence of the task is kept; nothing the task does not say is added as a requirement; each choice the spec makes beyond the task is flagged as a choice with its price. Check in particular the spec's reading of the task's point 1 ("the save that replaced an accepted save of a higher version") against the task's D-210 line and point 5, and the revision after the reset (D-209).
- Contradictions with the foundation entries below, and with the code the spec describes (it claims facts about `writeSavedGame`, `readAccount`, `mutationGuards`, `checkProgram`, the saver's behaviour before a logout and the first save after a version bump: verify each in the code).
- The trust boundary: crafted input at the two new routes and at the reader of a fetched document in `src/browser/sim/saved-game.ts`; whether the 403 leaks the existence of the previous save; whether a stale or blocked or unprivileged account can do harm.
- The 64 KiB limit and the move inside one transaction; the additive schema step and the existing test of an unknown schema version.
- Whether the spec leaves any choice the maker would have to make that changes the contract between the parts.

## What to read (selected by the orchestrator; read each whole)

Foundation, in `foundations/`:

- `part_map.md`, `glossary.md` (whole); the-way's glossary at `.the-way/foundations/glossary.md` where a term is missing
- decisions in `decisions.md`, each from its heading to the next: D-01, D-02, D-07, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204, D-205, D-206, D-207, D-208, D-209, D-210, D-211, D-212, D-213, D-229, D-353, D-354, D-386
- invariants in `invariants.md`, each whole: save-version, saved-state-http-exchange, saved-program-edit, copy-save, account-save-sqlite-store, account-save-sqlite-upgrade, account-schema-lifecycle, account-database-schema, account-save-durable-storage, account-save-backup, player-save-isolation, account-session-authorization, account-mutation-request-guards, account-client-requests, account-client-outcomes, blocked-account-access

Code: `src/server/database.ts`, `src/server/account-routes.ts`, `src/server/account-block.ts`, `src/server/transport.ts`, `src/browser/account-api.ts`, `src/browser/view/app.ts`, `src/browser/view/game-saver.ts`, `src/browser/sim/saved-game.ts`, `src/browser/sim/programs.ts`; and `guidelines/coding.md` with `guidelines/coding-database-access.md`, `guidelines/coding-http-application.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-api-client.md`.

## Answers of the orchestrator at start

- Trust boundary: yes — `src/server/**` and `src/browser/sim/saved-game.ts`.
- Irreversible operation: no; the schema step must be additive and the upgrade of an existing database tested; granting the privilege is a human's command on the server.
- Reserved choice: none.

## Report

Write the full report to the report path by the method's report form; its first line is `PASS` or `FAIL`. Return the first line, the report path, your questions, the reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). You run no test and no other check.
