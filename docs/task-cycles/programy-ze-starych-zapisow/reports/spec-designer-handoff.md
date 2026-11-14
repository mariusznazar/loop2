# Handoff — designer of the spec

You are the designer of the spec of one task of the loop2 repository, in a task cycle run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root, change no tracked file): `the task's worktree`, branch `task/programy-ze-starych-zapisow`, base `6f237fb8ce26450706d8738d3d3a07298e8ec110`
- Method: read in full `.the-way/task-cycle/spec/SKILL.md` (the-way, pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`; a file it names only when the step that names it comes). The project skill is `the-way-write-spec`.
- Stage and boundary: you write the spec, as the variant "the designer" of that method gives, into `docs/task-cycles/programy-ze-starych-zapisow/spec.md`. No plan, no code, no foundation entry written into `foundations/`; the spec may name entries the change will write. You run no test and no other check. You return `questions`, `done` or `reserved`.
- Frozen task, read whole: `docs/task-cycles/programy-ze-starych-zapisow/task.md`
- Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/spec-designer-report.md`

## The open design choice you resolve

The task settles what the server stores (one previous save per account), who may use it (an account with a privilege granted by an operator command), what the button does (appends programs, renames on a taken name, skips what today's game does not admit and names them) and what the reset does (the current save moves to the previous slot, the game starts anew). It leaves open, and the spec settles, each with the ways considered, the choice and the price of being wrong:

1. The HTTP contract across the trust boundary: the routes, their methods and the shapes of their requests and answers for (a) fetching the previous save, (b) the reset, and (c) how the browser learns that the account holds the privilege and that a previous save exists (so the button shows without a failing request). What each answers for an account without the privilege (it must not leak that a previous save exists), without a session, and with no previous save; the size limit and the checks of the input (D-104, D-109, trust boundary).
2. Where the previous save moves inside the server: in the same transaction as the accepted save of a higher version (D-210) and as the reset, so that no state is left half-moved; what the reset does to the revision of D-209 and to its basis (the task says a card open before a reset gets the refusal as today), and to a save of the same account arriving right after it; what the schema step adds (table or columns, the 64 KiB check as in `saved_games`).
3. Exactly which saves replace into the previous slot: a save of a higher version over a stored lower one, and the reset — and what happens when the stored save is of the current version and the incoming one is also of the current version (nothing moves).
4. What the browser does with a fetched previous document: which parts of the browser's existing saved-game code read it (D-213, D-386: reading stays inside the simulation, no value of a document makes it throw), how it reads only the programs of a document of any older version, which checks each program passes (the same as an editor's program, `checkProgram` in `src/browser/sim/programs.ts`), how a taken name gets its number ("Las (2)", also when "Las (2)" is taken), and how the skipped programs are named in one sentence. Whether a document of a version the code cannot read at all gives no programs and what the player is told.
5. What the operator command is called, its arguments and its sentences (D-137, D-354 for the answer being no log line), file and name by the pattern of `src/server/account-block.ts`; what the `loop2-deploy` skill (`.claude/skills/loop2-deploy/SKILL.md`) must say about it.
6. What the browser shows while and after the fetch and the reset (button states, errors, the confirmation), without choosing the place of the reset button on the screen: the author places it by the styleguide `guidelines/styleguide-browser-view.md`, which the task gives to the cycle; the spec states only what the place must satisfy.

Every sentence of the task is binding; do not widen it. Migrations of saves between versions are out of scope.

## What to read (selected by the orchestrator; read each whole)

Foundation, in `foundations/`:

- `part_map.md`, `glossary.md` (whole files); the-way's glossary at `.the-way/foundations/glossary.md` where the product's glossary does not hold a term
- decisions in `decisions.md`, each from its heading to the next: D-01, D-02, D-07, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204, D-205, D-206, D-207, D-208, D-209, D-210, D-211, D-212, D-213, D-229, D-353, D-354, D-386
- invariants in `invariants.md`, each whole: save-version, saved-state-http-exchange, saved-program-edit, copy-save, account-save-sqlite-store, account-save-sqlite-upgrade, account-schema-lifecycle, account-database-schema, account-save-durable-storage, account-save-backup, player-save-isolation, account-session-authorization, account-mutation-request-guards, account-client-requests, account-client-outcomes, blocked-account-access

Code, to know what is there: `src/server/database.ts`, `src/server/account-routes.ts`, `src/server/account-block.ts`, `src/browser/account-api.ts`, `src/browser/view/app.ts`, `src/browser/view/game-saver.ts`, `src/browser/sim/saved-game.ts`, `src/browser/sim/programs.ts`; and `guidelines/coding.md` with the kind files `guidelines/coding-database-access.md`, `guidelines/coding-http-application.md`, `guidelines/coding-saved-game.md` and `guidelines/coding-browser-api-client.md`, so that the spec does not design against them.

## Answers of the orchestrator at start

- Trust boundary: yes — `src/server/**` and `src/browser/sim/saved-game.ts`; the spec treats input from the network and a document from the server as hostile.
- Irreversible operation: no; the schema step must be additive and the upgrade of an existing database tested; granting the privilege is a human's command on the server, which the change only prepares.
- Reserved choice: none; SQLite, Express and the browser view stay as they are.

## Report

Write the full report to the report path by the method's report form, and return the status, the check line (a spec designer runs none: say so), the report path, your questions, the reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Write nothing outside `docs/task-cycles/programy-ze-starych-zapisow/`.
