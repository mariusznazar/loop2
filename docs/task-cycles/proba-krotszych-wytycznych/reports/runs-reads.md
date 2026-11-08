# What the 30 run agents said they read (their own answers, point 2 of the wrapper)

Source: each agent's final message; the transcripts were not inspected (the cycle has no tool to read
a subagent's transcript cheaply). All 30 say they opened nothing outside their run directory; the
harness's own saved copy of an oversized grep result is the only outside path mentioned (T2-old-1,
T2-new-1, T2-new-3; none opened it). `CD` = `guidelines/coding-database-access.md`.

| Runs | Files read, besides `guidelines/coding.md` (read by all 30) |
|---|---|
| T1-old-1 | CD, database.ts, account-backup.ts (30 lines) |
| T1-old-2 | CD, database.ts, account-database-check.ts |
| T1-old-3 | CD, database.ts, account-block.ts (30 lines) |
| T1-old-4 | CD, database.ts, account-database-check.ts |
| T1-old-5 | CD, database.ts, account-database-check.ts |
| T1-new-1 … T1-new-4 | CD, database.ts, account-database-check.ts |
| T1-new-5 | CD, database.ts, account-block.ts |
| T2-old-1 | CD, log-line.ts, database.ts, account-routes.ts (grep) |
| T2-old-2 | CD, log-line.ts, database.ts, account-routes.ts |
| T2-old-3 | log-line.ts, database.ts, account-block.ts (no kind file) |
| T2-old-4 | CD, log-line.ts, database.ts, account-routes.ts, account-block.ts |
| T2-old-5 | CD, log-line.ts, database.ts, account-routes.ts |
| T2-new-1 | CD, log-line.ts, database.ts |
| T2-new-2 | CD, log-line.ts, database.ts, account-routes.ts |
| T2-new-3 | CD, log-line.ts, database.ts, account-routes.ts, account-block.ts |
| T2-new-4 | CD, log-line.ts, database.ts (grep of the other server files) |
| T2-new-5 | CD, log-line.ts, database.ts, account-routes.ts (grep) |
| T3-old-1 … T3-old-5 | account-block.ts, log-line.ts, database.ts (parts); CD in four of five (T3-old-2: first 80 lines) |
| T3-new-1 … T3-new-4 | account-block.ts, log-line.ts, database.ts (parts); no kind file; T3-new-4 also grepped `foundations/decisions.md` |
| T3-new-5 | account-block.ts, log-line.ts, database.ts, CD (header lines) |

Files changed outside the new module: T3-old-1, T3-old-3 and T3-new-5 added three numeric fields to
`LineFields` in `src/server/log-line.ts` (their `log-line.ts` is kept in `reports/runs/<run>/`).

## The runs without `guidelines/coding.md` (third group, `none`)

All 15 report that the file named by the harness's project instructions does not exist in their copy
(the instructions of the main checkout reach every agent; the line of the copy's own `AGENTS.md` was
deleted). What they read instead, from their own answers:

| Runs | Read |
|---|---|
| T1-none-1 | `AGENTS.md`, `CLAUDE.md`, `coding-database-access.md`, `coding-saved-game.md`, `database.ts`, `account-database-check.ts`, `tsconfig.server.json`, `package.json`, greps of `foundations/` |
| T1-none-2 | `coding-saved-game.md`, `coding-database-access.md`, `database.ts`, `account-database-check.ts`, `account-block.ts` (40 lines), `foundations/part_map.md` (grep) |
| T1-none-3 | `database.ts`, `account-database-check.ts`, `account-block.ts`, `coding-database-access.md`, `coding-saved-game.md`, `part_map.md` (grep) |
| T1-none-4 | `coding-saved-game.md`, `coding-database-access.md`, `database.ts`, `account-block.ts`, `account-routes.ts` |
| T1-none-5 | `coding-saved-game.md`, `coding-database-access.md`, `account-database-check.ts`, `database.ts`, `account-block.ts`, greps of `foundations/` |
| T2-none-1 | `coding-database-access.md`, `coding-session-store.md`, `coding-account-policy.md` (30 lines), `log-line.ts`, `session-store.ts`, `database.ts`, `account-routes.ts`, `account-block.ts`, `decisions.md` (D-252 and grep), `package.json` |
| T2-none-2 | `AGENTS.md`, `coding-database-access.md`, `coding-session-store.md`, `coding-account-policy.md`, `coding-http-application.md`, `log-line.ts`, `database.ts`, `account-routes.ts`, `decisions.md` (D-252), `package.json` |
| T2-none-3 | `AGENTS.md`, `coding-database-access.md`, `coding-session-store.md`, `session-store.ts`, `log-line.ts`, `database.ts`, `account-routes.ts`, `app.ts`, `decisions.md` (D-252) |
| T2-none-4 | `AGENTS.md`, `session-store.ts`, `log-line.ts`, `database.ts`, `account-routes.ts`, `account-block.ts`, `coding-session-store.md`, `coding-database-access.md`, `testing.md` (a line), `decisions.md` (D-252) |
| T2-none-5 | `AGENTS.md`, `coding-database-access.md`, `coding-session-store.md`, `log-line.ts`, `session-store.ts`, `database.ts`, `account-routes.ts`, `account-block.ts`, `decisions.md` (D-252, D-253) |
| T3-none-1 | `account-block.ts`, `log-line.ts`, `database.ts`, `coding-database-access.md`, `decisions.md` (D-252), `testing.md` (grep) |
| T3-none-2 | `account-block.ts`, `log-line.ts`, `coding-database-access.md`, `decisions.md` (D-252, D-253), `database.ts` |
| T3-none-3 | `AGENTS.md`, `account-block.ts`, `log-line.ts`, `database.ts`, `decisions.md` (D-252, D-253), `coding-database-access.md` |
| T3-none-4 | `account-block.ts`, `log-line.ts`, `database.ts`, `coding-database-access.md`, `decisions.md` (D-252), `testing.md`, `AGENTS.md` |
| T3-none-5 | `account-block.ts`, `log-line.ts`, `database.ts`, `decisions.md` (D-252, D-253), `coding-account-policy.md`, `coding-browser-api-client.md` |

So the group without the file was not a group without information: the decisions on logging, the kind
guidelines and the log helper's own header stayed in the copy and were read by most of the agents.
T3-none-5 widened `LineFields` with three numeric fields (its `log-line.ts` is kept in
`reports/runs/T3-none-5/`); the other 14 changed no file beyond their new module.
