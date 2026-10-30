# Handoff — foundation entries, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the plan's **Foundation
entries**, a fresh agent: you write the foundation entries the plan lists before Slice 1, and no
code. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head = base `dce2970` (also Slice 1's base). Process pin `.the-way`
  at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree, read whole — your stage is the
  plan's *Foundation entries*, which takes none of its variant rows; and
  `.the-way/task-cycle/skill/foundation_step.md`, read whole. Since you write entries, read the skill
  of an element (`.claude/skills/the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-environment-fact`, `the-way-update-part-map`, and the files they point to inside
  `.the-way`) when you write an entry of that element, as the product's `AGENTS.md` requires; each
  element skill selects what it reads by its own step 1.
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — read it whole: its *Decisions
  in play* quotes the projected entries word for word and its *Settlements to record* holds rows
  1–10.
- Reviewed spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` — read it whole; its
  *Foundation entries* and *Decisions* give the design the entries rest on (its *Decisions* 10 was
  settled by the orchestrator).
- Plan: `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md`; your section is copied below.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/06-foundation-report.md`
- Commit your entries on the task branch with the product's git rules (English messages in the
  form of the existing commits, `git add` by path). Do not run `npm test`; run
  `python -B .the-way/elements/common/foundation_check.py` and report its command and exit code.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (save routes taking a whole saved game state from the
  network, the schema step) and `src/browser/sim/saved-game.ts` (the load of data from outside the
  simulation).
- Irreversible operation: **yes** — the schema step 3 → 4 on the test server's `loop2_accounts`,
  run by the human's deployments H1 and H2 and by the merge; the cycle only prepares it.

## Your section of the plan (copied word for word from plan.md)

## Foundation entries

Written by the foundation step before Slice 1, through the element skills the product's `AGENTS.md`
names, except row 35 (Slice 1) and row 31 (after H2, below). *From* names the row of *Settlements
to record*, the projected entry of the task's *Decisions in play* or the spec.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| 1. D-07 — How is the work of the game split between the server and the browser? (changed: the projected wording) | decision | projected „(new) — How is the work of the game split between the server and the browser?”; spec, Foundation entries | Slices 2, 3, 6 |
| 2. Who can create and use a player account? (new; this task makes its second sentence true) | decision | projected „(new) — Who can create and use a player account?” | Slice 3 |
| 3. What happens to unsaved progress when a session expires? (new) | decision | projected „(new) — What happens to unsaved progress when a session expires?” | Slice 6 |
| 4. How does the browser exchange saved game states with the server? (new; the two routes of spec decision 1 as how it is met) | decision | projected „(new) — How does the browser exchange saved game states with the server?”; spec decision 1 | Slices 3, 4 |
| 5. Where are player accounts and saved game states stored? (new; this task makes the part about saved game states true) | decision | projected „(new) — Where are player accounts and saved game states stored?” | Slices 2, 9 |
| 6. What happens to a saved game state of another version? (new) | decision | projected „(new) — What happens to a saved game state of another version?” | Slices 1, 6 |
| 7. The moments of saving (new) | decision | Settlements row 1; spec decision 6 | Slices 5, 6 |
| 8. What the player sees of saving: nothing on success, the failed and too-large sentences in the header line under the title and „Wyloguj”, above the D-157 row, and the retry with its rhythm (new) | decision | Settlements row 2; spec decision 6 | Slices 5, 6 |
| 9. The server accepts a save only based on the last revision; the losing browser loads the server's save (new) | decision | Settlements row 3; spec decisions 1, 6, 7 | Slices 2, 3, 4, 5, 6 |
| 10. The server refuses a lower version than the stored one; the old tab stops saving (new) | decision | Settlements row 4; spec decisions 1, 6 | Slices 2, 3, 4, 5, 6 |
| 11. What the player sees when a save meets a missing session; the state kept in page memory only (new) | decision | Settlements row 5; spec decision 8 | Slices 5, 6 |
| 12. D-97 — What does the player's logout do? (changed: logout saves first, and each save outcome's end) | decision | Settlements row 6; spec decision 8 | Slices 5, 6 |
| 13. D-96 — What does a player see before and after signing in? (changed: the projected landing on a manual map run merged with row 7) | decision | projected „D-96 — What does a player see before and after signing in?”; Settlements row 7; spec decision 7 | Slices 6, 9 |
| 14. A loaded manual map run: going on — paused at its game minute with its pace; ended — on its screen after its end; time away never moves it (new), with D-53's rationale gaining „when the saved game state holds no manual map run” | decision | Settlements row 8 | Slices 1, 6 |
| 15. D-104 — Which request origin and body may change account state? (changed: 64 KiB for the save route, 16 KiB for the others, at most 64 KiB stored per player) | decision | Settlements row 9; spec decision 3 | Slices 2, 3, 4, 8 |
| 16. D-04 — What is the game built with? (changed: the saved game state downloaded from the server beside the player's choices and real time; its second sentence judged against the load function) | decision | Settlements row 10; spec, Foundation entries | Slices 1, 6, 7 |
| 17. D-109 — What identity authorizes an account request? (changed: reading and replacing its own account's saved game state; the save routes join the JSON 401 list) | decision | spec, Foundation entries and decision 1 | Slices 3, 8 |
| 18. D-112 — How does the account database open and preserve its schema? (changed: current version 4, the table of saved game states, a move that keeps saved game states too) | decision | To do 1; spec decision 4 | Slices 2, 7, 9 |
| 19. D-156 — How does an emailed link confirm a player's email address? (changed: the projected wording, above the game whatever screen it opens on) | decision | projected „D-156 — How does an emailed link confirm a player's email address?” | Slice 6 |
| 20. The exemplar for kind `saved-game` is `src/browser/sim/saved-game.ts` (new, as D-34 and D-35 are) | decision | To do 12; spec decision 5 | Slices 1, 7 |
| 21. `player-save-isolation` (new; Part: account-server) — check: test on real HTTP and SQLite in `tests/http.test.mjs`, written by Slice 3 | invariant | projected `player-save-isolation/1` | Slices 3, 8 |
| 22. `expired-session-unsaved-progress` (new; Part: browser-view) — check: page test with a controlled client in `tests/view/account-screen.test.mjs`, written by Slice 6 | invariant | projected `expired-session-unsaved-progress/1` | Slice 6 |
| 23. `account-save-sqlite-store` (new; Part: account-server) — check: test in `tests/account-storage.test.mjs`, written by Slice 2 | invariant | projected `account-save-sqlite-store/1` | Slice 2 |
| 24. `saved-state-http-exchange` (new; Part: browser-view) — check: test in `tests/account-api.test.mjs` on a real local server, written by Slice 4 | invariant | projected `saved-state-http-exchange/1` | Slice 4 |
| 25. `save-version` (new; Part: simulation) — check: test in `tests/sim/saved-game.test.mjs`, written by Slice 1 | invariant | projected `save-version/1` | Slices 1, 7, 8 |
| 26. `account-mutation-request-guards` (changed: every state-changing route, the save route included; "oversized" over the route's limit of D-104) — check: `tests/transport.test.mjs`, extended by Slice 3 | invariant | spec decision 3; Settlements row 9 | Slices 3, 8 |
| 27. `account-schema-lifecycle` (changed: the move keeps saved game states beside accounts and sessions) — check: `tests/account-storage.test.mjs`, extended by Slice 2 | invariant | To do 1; spec decision 4 | Slices 2, 9 |
| 28. `account-database-schema` (changed: as row 27) — check: `tests/account-storage.test.mjs`, extended by Slice 2 | invariant | To do 1; spec decision 4 | Slices 2, 7 |
| 29. `account-session-authorization` (changed in scope: the save routes without a valid session get JSON 401) — check: `tests/http.test.mjs`, extended by Slice 3 | invariant | spec, Foundation entries and decision 10 | Slices 3, 8 |
| 30. `blocked-account-access` (changed in scope: the save routes of a blocked account get JSON 401) — check: `tests/http.test.mjs`, extended by Slice 3 | invariant | projected `blocked-account-access/1`, the part for save requests; spec decision 10 | Slices 3, 8 |
| 31. `account-save-durable-storage` — its violated mark removed | invariant | To do 14; projected `account-save-durable-storage/1` | written after H2, outside the slices (below) |
| 32. `fetch-keepalive-body-quota` (new) | environment fact | spec, Constraints | Slices 4, 5 |
| 33. `visibilitychange-hidden-last-event` (new) | environment fact | spec, Constraints | Slice 5 |
| 34. `account-server`'s responsibility gains the persistence of saved game states | part map | spec, Foundation entries | Slices 2, 3 |
| 35. `simulation`'s *Trust boundary* gains `src/browser/sim/saved-game.ts` | part map | spec, Foundation entries | written by Slice 1, which creates the file: `foundation_check.py` refuses a *Trust boundary* pattern that matches no file git tracks; Slice 8 |

Projected entries the task carries that this change writes nothing of: „(new) — How does the account
and save server access SQLite?” — task 17 writes it; Slice 2 makes its first sentence true for
reading and writing saved game states, as the current invariant `account-save-sqlite-access`
already says for the database. „(new) — When and how is the time away computed?” and
`catch-up-state/1` — task 18 writes and makes them true; row 14 keeps the loaded manual map run
paused, so nothing of this change computes time away. Glossary: none (spec).

## Points for you

- Rows 31 (after H2) and 35 (Slice 1) are not yours; write every other row.
- To do 12 says a new meaning of the guidelines is approved by the human (WAY-172). Row 20 is the
  exemplar decision; the kind's guideline file comes in Slice 7. Where `foundation_step.md` leaves a
  question to the human, return `blocked` with that question, its options and a recommendation —
  do not decide it.
- The task's projected entries mark their *Scope* as `TODO` in the definition; settle it from the
  part map (task, *Questions carried to cycle*).
- D-96 is one entry: the projected landing merged with row 7's sentence about the save (To do 13).
- Rows of *Settlements to record* may use exclusive words (task, question 12, way B).
