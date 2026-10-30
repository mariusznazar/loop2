# Plan — Zapis stanu gry gracza na serwerze z numerem wersji i jego wczytanie po zalogowaniu w innej przeglądarce

- Task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`
- Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md`
- Base: `dce2970`

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

## Slices

### Slice 1 — The simulation's saved-game document and load

- **Goal:** `src/browser/sim/saved-game.ts`, the first file of the new kind `saved-game`, holds
  what spec decisions 2 and 5 give: the constant of the current version of the shape, starting at
  1; a pure function from a game state to the saved document `{ version, game }`, sharing nothing
  the state could later change; and a function from an unknown value to either a game state or a
  refusal with the reason `version`, `archetype` or `shape`, in decision 5's order, that never
  throws, changes nothing passed to it, admits nothing less strict than decision 5's floor (keys
  exactly, own keys only, `__proto__` included; finite and safe integers; closed lists; identifiers
  present in the data; programs through the existing program check; references the simulation
  follows; the tile count of the map's layout), builds the state field by field as a `GameState`
  so a change of the type fails the type check, returns a map run that goes on paused at its game
  minute, pace and carried real time, and an ended one as it ended, and lets no real time or time
  away into the load. `tests/sim/saved-game.test.mjs` holds the written-out document of the current
  version that fills every optional branch decision 2 lists, with its map run written paused,
  asserting that it loads into the state it describes and that the constant equals the version
  written beside it; documents of another version, of a character whose archetype the data lacks,
  and crafted shapes (a missing and an extra key, `__proto__`, a non-finite and an unsafe number, a
  value off a closed list, an identifier absent from the data, a broken reference, a wrong tile
  count, a running map run coming back paused and an ended one unchanged, an argument left
  unchanged), each refused whole and marked `invariant: save-version`; the refusal test is seen
  failing once. `stryker.config.json` lists the new test file. The part map's `simulation` entry
  names the file under *Trust boundary* (Foundation entries row 35), written through
  `the-way-update-part-map`.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs` ·
  `stryker.config.json` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-24` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:29-30` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:89-94` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:176-180` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:297-299` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:23-49` Goals and non-goals ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  Foundation entries row 6 · Foundation entries row 14 · Foundation entries row 16 ·
  Foundation entries row 20 · Foundation entries row 25 · Foundation entries row 35 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:356-373` D-18 ·
  `foundations/decisions.md:416-448` D-21 · `foundations/decisions.md:632-645` D-28 ·
  `foundations/decisions.md:733-746` D-35 · `foundations/decisions.md:979-996` D-51 ·
  `foundations/decisions.md:1063-1081` D-55 · `foundations/decisions.md:1083-1108` D-56 ·
  `foundations/decisions.md:1185-1198` D-62 · `foundations/decisions.md:1608-1624` D-91 ·
  `foundations/decisions.md:2334-2356` D-129 · `foundations/decisions.md:2414-2437` D-132 ·
  `foundations/decisions.md:2931-2944` D-164 · `foundations/decisions.md:2946-2959` D-165 ·
  `foundations/decisions.md:2976-2989` D-167 · `foundations/decisions.md:2991-3004` D-168 ·
  `foundations/decisions.md:3036-3049` D-171 · `foundations/decisions.md:3066-3079` D-173 ·
  `foundations/decisions.md:3096-3114` D-175 · `foundations/decisions.md:3116-3134` D-176 ·
  `foundations/invariants.md:214-224` simulation-isolation ·
  `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:236-246` content-identifiers ·
  `foundations/invariants.md:518-526` character-team ·
  `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:198-212` player-map-run-pace ·
  `foundations/invariants.md:848-856` copy-save · `foundations/invariants.md:838-846` saved-program-edit ·
  `foundations/invariants.md:364-373` program-closed-lists ·
  `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/invariants.md:397-406` map-run-layout ·
  `foundations/invariants.md:938-946` nature-energy-range ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:18-23` map run ·
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:87-92` headquarters ·
  `foundations/glossary.md:112-116` archetype · `foundations/glossary.md:118-123` Understanding ·
  `foundations/glossary.md:131-135` manual map run · `foundations/glossary.md:137-141` completion ·
  `foundations/glossary.md:175-179` copy · `.the-way/foundations/glossary.md:163-167` exemplar ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/layout.ts` ·
  `src/browser/sim/understanding.ts` · `src/browser/sim/character.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/combat.ts` · `src/browser/sim/world.ts` · `src/browser/sim/hex.ts` ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/campfire.ts` ·
  `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/items.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/revelations.ts` ·
  `src/browser/sim/data/skills.ts` · `src/browser/sim/data/traits.ts` ·
  `tests/sim/traits.test.mjs` · `tests/sim/purity.test.mjs` · `tests/sim/time.test.mjs` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/quality/test_mutation_test_selection.py`
- **Model:** strongest — the strict load of the whole game state is the change's largest
  trust-boundary code; the spec gives only its floor, and judging which crafted inputs it must
  refuse needs design.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the file this slice adds to the
  simulation's *Trust boundary*
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (its case "a document of the current
  version loads into the state it describes" written first, failing) ·
  `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Foundation entries rows 6, 14, 16, 20, 25

### Slice 2 — Schema version 4 and the saved-game operations of the account database

- **Goal:** `src/server/database.ts` appends schema step 4 as spec decision 4 gives — one strict
  table of saved game states: the account's identifier as primary key and as foreign key that
  removes the row with its account, the version of the shape (integer from 1), the revision
  (integer from 1) and the game as text, with a check that the text's bytes are at most 65 536;
  no other table or column changes, steps 1–3 untouched. It gains two operations: read an
  account's saved game state (or none), and write one in a single transaction that reads the
  account's blocked state, the stored version and the stored revision and writes nothing when any
  of them refuses — blocked, then a stored version greater than the given one (outdated), then a
  stored revision other than the basis, no row counting as revision 0 (conflict) — and otherwise
  writes the row with revision stored + 1 (1 for the first save) and returns it, the same pattern as
  the session write. Blocking and unblocking keep the row. `tests/account-storage.test.mjs` gains:
  a version-3 database written in the test with its own schema, as task 20 left it (accounts, a
  blocked account, a confirmed address, sessions, emailed links), opens as version 4 with every row
  and value kept and no saved game state; a failing step 4 leaves it at version 3 unchanged; the
  "newer unknown version" case moves from 4 to 5; the write's outcomes, a block committed through
  another connection before the write, and the byte check of the stored text; each marked with the
  invariants it checks (`account-save-sqlite-store`, `account-schema-lifecycle`,
  `account-database-schema`).
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:19-22` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:117-123` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:188-191` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:203-203` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:167-186` 4. Schema version 4: one table of saved game states ·
  Foundation entries row 1 · Foundation entries row 5 · Foundation entries row 9 ·
  Foundation entries row 10 · Foundation entries row 15 · Foundation entries row 18 ·
  Foundation entries row 23 · Foundation entries row 27 · Foundation entries row 28 ·
  Foundation entries row 34 ·
  `foundations/decisions.md:135-153` D-07 · `foundations/decisions.md:284-302` D-15 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:1799-1810` D-101 ·
  `foundations/decisions.md:1963-1974` D-112 · `foundations/decisions.md:1976-1989` D-114 ·
  `foundations/decisions.md:2528-2541` D-137 · `foundations/decisions.md:2543-2554` D-138 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/environment_facts.md:304-308` docker-volume-lifecycle ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:32-37` deployment ·
  `foundations/glossary.md:39-44` test server ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `src/server/session-store.ts` ·
  `tests/startup.test.mjs:488-512`
- **Model:** same — schema step 4 cannot be edited once it reaches the test server (D-112), so its
  table, constraints and move must be right the first time.
- **Risk:** trust boundary — `src/server/**` (`src/server/database.ts`) · cannot be undone — schema
  step 4, which moves `loop2_accounts` from version 3 to version 4 when the human deploys the
  branch (H1, H2) and again at the merge (D-11); the slice writes and tests it on temporary
  databases only
- **Checks:** `npm test -- tests/account-storage.test.mjs` (its case "a version-3 database opens as
  version 4 with every row and value kept and no saved game state" written first, failing) ·
  `npm test -- tests/startup.test.mjs` ·
  `npm test -- tests/invariants/test_account_server_typecheck.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries rows 1, 5, 9, 10, 15, 18, 23, 27, 28, 34

### Slice 3 — The save routes

- **Goal:** `src/server/account-routes.ts` serves `GET /api/saved-game` and `PUT /api/saved-game`
  as spec decision 1 gives: the answers and their exact fields; the codes `unauthenticated` (401),
  `invalid-request` (400), `save-too-large` (413), `save-outdated` and `save-conflict` (409); the
  order of the checks, the version check before the revision check; no field of either request
  naming an account and an extra field refused; the stored text serialized from the parsed `game`
  measured at most 65 536 bytes before the write; `game` returned unchanged inside `save.game`;
  the database operations of Slice 2. The save path joins the router's `paths` table, so the
  transport check covers it. `mutationGuards` in `src/server/transport.ts` takes the route's body
  limit as a parameter: 64 KiB for the save route, 16 KiB for the five other state-changing routes,
  the Origin, media-type, compression and object checks the same for all six (decision 3).
  `tests/http.test.mjs` gains, on real HTTP and SQLite: two accounts' sessions each read and replace
  only their own saved game state and no body field selects another (`invariant:
  player-save-isolation`); no session, a forged or removed session, and a session of a blocked
  account each get JSON 401 on both routes and leave the stored state unchanged (`invariant:
  account-session-authorization`, `invariant: blocked-account-access`, spec decision 10); and the
  contract — `null` with no save, the first save's revision 1, conflict, outdated before conflict,
  each malformed body 400, a stored text over the limit 413. `tests/transport.test.mjs` gains the
  save route among the guarded routes — refused requests change no saved game state, a body over
  64 KiB on it and over 16 KiB on the others refused — and the transport check's refusal on the save
  path (`invariant: account-mutation-request-guards`, `invariant: account-request-transport`).
- **Change:** `src/server/account-routes.ts` · `src/server/transport.ts` · `tests/http.test.mjs` ·
  `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-23` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:54-64` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:210-220` Questions carried to cycle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator) ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 4 ·
  Foundation entries row 9 · Foundation entries row 10 · Foundation entries row 15 ·
  Foundation entries row 17 · Foundation entries row 21 · Foundation entries row 26 ·
  Foundation entries row 29 · Foundation entries row 30 · Foundation entries row 34 ·
  `foundations/decisions.md:17-37` D-02 · `foundations/decisions.md:94-113` D-05 ·
  `foundations/decisions.md:135-153` D-07 · `foundations/decisions.md:763-776` D-37 ·
  `foundations/decisions.md:1799-1810` D-101 · `foundations/decisions.md:1842-1853` D-104 ·
  `foundations/decisions.md:1896-1907` D-108 · `foundations/decisions.md:1909-1920` D-109 ·
  `foundations/decisions.md:1922-1935` D-110 · `foundations/decisions.md:2528-2541` D-137 ·
  `foundations/decisions.md:2543-2554` D-138 ·
  `foundations/invariants.md:25-33` account-server-express-http ·
  `foundations/invariants.md:45-53` loop2-api-error-route ·
  `foundations/invariants.md:708-716` loop2-shared-public-origin ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/environment_facts.md:340-344` samesite-strict-cookie ·
  `foundations/environment_facts.md:298-302` cgroup-memory-accounting ·
  `foundations/glossary.md:157-161` blocked account ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/database.ts` · `src/server/app.ts` · `src/server/session-store.ts` ·
  `src/server/account-block.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`src/server/account-routes.ts`,
  `src/server/transport.ts`): routes that take a whole saved game state as JSON from the network,
  authorized by the session alone
- **Checks:** `npm test -- tests/http.test.mjs` (its case "each account's session reads and replaces
  only its own saved game state" written first, failing) ·
  `npm test -- tests/transport.test.mjs` ·
  `npm test -- tests/invariants/test_loop2_api_error_route.py` ·
  `npm test -- tests/invariants/test_account_server_express_http.py` ·
  `npm test -- tests/invariants/test_account_server_typecheck.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Foundation entries rows 1, 2, 4, 9, 10, 15, 17, 21, 26, 29, 30, 34

### Slice 4 — The browser client's saved-game methods

- **Goal:** `src/browser/account-api.ts` gains two methods for the routes of spec decision 1. The
  load method reports success only for 200 with a body of exactly `save`, `null` or an object of
  exactly `version` and `revision` (positive integers) and `game` (an object), and hands `save` on
  as received. The save method sends `PUT /api/saved-game` with `{ version, basedOn, game }` and
  `keepalive` on every save request; it measures the UTF-8 byte length of the body before sending,
  and a body over 65 536 bytes is not sent and returns the too-large outcome (decision 3). Its typed
  outcomes: saved, with the new revision; conflict (409 `save-conflict`); outdated (409
  `save-outdated`); too large (413 `save-too-large` or measured); signed out (401); and every other
  answer, a failed connection and an answer not complete within the time limit as a failure — the
  client's rules of D-117 unchanged: relative paths, no redirect, same-origin credentials, no state
  of its own. `tests/account-api.test.mjs`, on its real local server, gains each outcome of both
  methods, a body of exactly 65 536 bytes sent and one byte more never received by the server, and
  the request each method sends, marked `invariant: saved-state-http-exchange` and, where they
  check those, `invariant: account-client-requests` and `invariant: account-client-outcomes`.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-20` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:22-22` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-25` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:150-154` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:210-220` Questions carried to cycle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker ·
  Foundation entries row 4 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 15 · Foundation entries row 24 · Foundation entries row 32 ·
  `foundations/decisions.md:1842-1853` D-104 · `foundations/decisions.md:1896-1907` D-108 ·
  `foundations/decisions.md:1909-1920` D-109 · `foundations/decisions.md:2021-2034` D-117 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/invariants.md:708-716` loop2-shared-public-origin ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `foundations/environment_facts.md:340-344` samesite-strict-cookie ·
  `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs` (its case "a save body over 65 536 bytes is
  never sent and comes back too large" written first, failing) ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries rows 4, 9, 10, 15, 24, 32

### Slice 5 — The game saver

- **Goal:** `src/browser/view/game-saver.ts` (kind `browser-module`) is the saver of spec decision
  6. It is created with the client, a read of the current game state (passing the clock's real
  time first), the state and revision it starts from — held as already saved — optionally the
  conflict sentence to stand from the start, and the page's callbacks for conflict, outdated and
  signed out; it offers a moment of saving, a check for changes, a save before logout (a promise
  of its outcome), the revision it last saw, the header sentence it stands for, and `dispose()`. A
  moment always sends; the 30-second real-time interval and a `visibilitychange` to `hidden` send
  only when the current state is not the one last sent, compared by identity. One request at a
  time: a moment during a request in flight sends once more, with the state of that time, when the
  answer comes; each request is based on the last revision seen and sent through the client of
  Slice 4, measured and with `keepalive`; a hiding check during a request in flight sends nothing
  more. Outcomes: saved — the revision kept, the sentence gone; failed — „Nie udało się zapisać
  postępu. Gra spróbuje ponownie.” stands and a retry follows after 5 s, then 10 s, 20 s and every
  30 s, each with the state of its time, a moment meanwhile sending at once; too large — „Nie udało
  się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” stands, no retry, the
  next moment or check that finds a changed state tries again; conflict and signed out — the
  page's callbacks; outdated — „Gra została zaktualizowana. Odśwież stronę.” stands and nothing is
  sent any more. Before logout (spec decision 8): a stopped saver reports so without sending;
  otherwise it waits for a request in flight, sends the current state and reports the outcome; a
  failure leaves „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” with the retries
  going on silently. `tests/view/game-saver.test.mjs` runs it with a controlled client, controlled
  timers and a hand-made document model: each outcome with its sentence; coalescing during a
  request in flight; the retry rhythm; nothing sent at the interval or at hiding for an untouched
  state, also one built from a load, and a send at the first act; too large without retry and
  letting logout go on; the stopped saver.
- **Change:** `src/browser/view/game-saver.ts` · `tests/view/game-saver.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:28-28` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:41-53` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-154` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:290-295` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:228-295` 6. The browser's saver: one request at a time, every moment coalesced ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:326-353` 8. Expired session, the same account, and logout ·
  Foundation entries row 7 · Foundation entries row 8 · Foundation entries row 9 ·
  Foundation entries row 10 · Foundation entries row 11 · Foundation entries row 12 ·
  Foundation entries row 32 · Foundation entries row 33 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:416-448` D-21 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:793-806` D-39 ·
  `foundations/decisions.md:1739-1752` D-97 · `foundations/decisions.md:2021-2034` D-117 ·
  `foundations/decisions.md:2830-2843` D-157 ·
  `foundations/invariants.md:35-43` browser-view-framework ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:18-23` map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/account-api.ts` · src/browser/sim/saved-game.ts (made in Slice 1) ·
  `src/browser/sim/game.ts:353-417` · `src/browser/view/clock.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/view/status-row.ts` ·
  `tests/view/clock.test.mjs` · `tests/view/email-status.test.mjs`
- **Model:** same — its timers, its one request in flight and its coalesced moments decide whether
  a player's progress is saved, with no module of this sort in the product to follow.
- **Risk:** none
- **Checks:** `npm test -- tests/view/game-saver.test.mjs` (its case "a moment during a request in
  flight sends once more, after the answer, with the state of that time" written first, failing) ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 4 · Foundation entries rows 7, 8, 9, 10, 11, 12, 32, 33

### Slice 6 — The page builds the game from the saved game state

- **Goal:** the page follows spec decisions 7 and 8 and gives the saver of Slice 5 its moments.
  `src/browser/view/app.ts`: after `GET /api/account` names an account or a form signs in, the page
  keeps „Sprawdzanie logowania…” and asks for the saved game state; only its answer builds the
  game — `null` a new game, a save the load function of Slice 1, a failed or uncertain answer the
  client's sentence with „Spróbuj ponownie” repeating both requests, 401 the forms; the request
  numbering covers the new request. A refused load builds a new game, puts above it, once, „Zapis
  pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (`version`, `archetype`)
  or „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (`shape`), a confirmation
  notice first where one stands, and saves the new game at once based on the server's revision. A
  conflict drops the game, shows the waiting screen, asks again and builds from the answer with
  „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” in the header slot until the
  first successful save; a refused load there takes the refused-load path. A 401 on a save keeps
  the current state as a document with the account's identifier and the last revision in a page
  variable — never in browser storage — disposes the game and shows the forms with „Sesja wygasła.
  Zaloguj się ponownie, aby zapisać postęp.” above them; a sign-in whose account `id` equals the
  kept one skips the request, builds from the kept document through the load function with the
  kept revision, drops it and calls one moment at once; another `id` drops it. „Wyloguj” goes
  through the saver's save before logout with each outcome of decision 8, and after an outdated
  outcome or with the saver stopped the forms show „Gra została zaktualizowana. Odśwież stronę.”
  where the expiry sentence stands. The header slot stands under the title and „Wyloguj”, in
  `warning`, above the D-157 row, hidden when empty; the confirmation notice stands above the game
  on whatever screen it opens. `src/browser/view/game-view.ts`: `createGameView` takes the state and
  revision it starts from and the page's callbacks, creates and disposes the saver, calls a moment
  after every act of the player whose result changed the state (decision 6's list) and after a game
  minute that ends the map run in a death or a completion, and lands where the state says — the
  headquarters, a map run paused, or the screen after a map run's end. `src/browser/styles.css`
  changes only where the header slot or the one-time notice needs a rule of its own.
  `tests/view/account-screen.test.mjs`, where the tests of `startApp` stand, gives its controlled
  client the save methods and gains a case for each of these paths, the case of the kept state
  marked `invariant: expired-session-unsaved-progress` (a 401 on a save keeps the state, the same
  account's sign-in sends it, another account's drops it); its existing cases change only where the
  new request changes what they wait for.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-28` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:65-94` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-149` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:155-180` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:182-208` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:288-299` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:228-295` 6. The browser's saver: one request at a time, every moment coalesced ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:297-324` 7. The page: session, then the saved game state, then the game ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:326-353` 8. Expired session, the same account, and logout ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker ·
  Foundation entries row 3 · Foundation entries row 6 · Foundation entries row 7 ·
  Foundation entries row 8 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 11 · Foundation entries row 12 · Foundation entries row 13 ·
  Foundation entries row 14 · Foundation entries row 16 · Foundation entries row 19 ·
  Foundation entries row 22 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:748-761` D-36 ·
  `foundations/decisions.md:793-806` D-39 · `foundations/decisions.md:868-881` D-44 ·
  `foundations/decisions.md:979-996` D-51 · `foundations/decisions.md:1022-1042` D-53 ·
  `foundations/decisions.md:1185-1198` D-62 · `foundations/decisions.md:1608-1624` D-91 ·
  `foundations/decisions.md:1726-1737` D-96 · `foundations/decisions.md:1739-1752` D-97 ·
  `foundations/decisions.md:1799-1810` D-101 · `foundations/decisions.md:1909-1920` D-109 ·
  `foundations/decisions.md:2334-2356` D-129 ·
  `foundations/decisions.md:2414-2437` D-132 · `foundations/decisions.md:2528-2541` D-137 ·
  `foundations/decisions.md:2556-2569` D-139 · `foundations/decisions.md:2815-2828` D-156 ·
  `foundations/decisions.md:2830-2843` D-157 · `foundations/decisions.md:3066-3079` D-173 ·
  `foundations/invariants.md:35-43` browser-view-framework ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:888-896` email-confirmation-link ·
  `foundations/glossary.md:18-23` map run · `foundations/glossary.md:131-135` manual map run ·
  `foundations/glossary.md:87-92` headquarters · `foundations/glossary.md:137-141` completion ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:175-179` copy ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/account-api.ts` · `src/browser/sim/game.ts` · `src/browser/view/clock.ts` ·
  src/browser/sim/saved-game.ts (made in Slice 1) · src/browser/view/game-saver.ts (made in Slice 5) ·
  `src/browser/view/account-screen.ts` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/email-status.ts` · `src/browser/view/status-row.ts` ·
  `src/browser/view/headquarters.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/main.ts`
- **Model:** same — it joins the simulation's load, the client and the saver into the page's flows
  across three parts.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` (its case "a 401 on a save keeps the
  state, and a sign-in to the same account sends it and returns to the game from it" written first,
  failing) · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/email-status.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 4 · Slice 5 · Foundation entries rows 3, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 16, 19, 22

### Slice 7 — The coding guidelines: the kind saved-game and the passages the change makes untrue

- **Goal:** through `the-way-maintain-coding-guidelines`, with no meaning beyond the task and the
  spec (WAY-172): `guidelines/coding-saved-game.md` is written in the form of a kind's file of the
  coding template, its exemplar `src/browser/sim/saved-game.ts` under Foundation entries row 20,
  claiming that file and drawing its boundary with `simulation-module` as `content-data` does, with
  the rules of spec decision 5 — simulation isolation, unchanged arguments, a refusal instead of a
  throw for every crafted input, and the version raised with the shape, the pinned document of the
  test rewritten only together with a raised version (decision 2); `guidelines/coding.md` gains
  the kind's index row, and its sentence „Wzorzec zapisu gry powstanie przy pierwszej
  implementacji” in § „Odłożone rodzaje i formatowanie” changes to say the kind exists;
  `guidelines/coding-simulation-module.md`'s *When to read* excludes the file as it excludes content
  data; `guidelines/coding-browser-module.md` § „Gra na stronie i odpowiedzi serwera” is rewritten
  to the page of Slice 6 (spec decision 10: the game built only after the session and then the
  saved game state are answered; removed when a save gets 401 and when it gets a conflict, then
  built again from the loaded save; conflict, outdated code and too large with their own sentences
  instead of the one warning); `guidelines/coding-database-access.md`'s rule „Otwarcie schematu
  bez utraty danych” names saved game states beside accounts and sessions. A new meaning the human
  must approve stays the question the foundation step names, never this slice's choice.
- **Change:** `guidelines/coding-saved-game.md` · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-database-access.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:30-30` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:476-482` Foundation entries ·
  Foundation entries row 3 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 11 · Foundation entries row 12 · Foundation entries row 13 ·
  Foundation entries row 16 · Foundation entries row 18 · Foundation entries row 20 ·
  Foundation entries row 25 · Foundation entries row 28 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:632-645` D-28 ·
  `foundations/decisions.md:718-731` D-34 · `foundations/decisions.md:733-746` D-35 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:1726-1737` D-96 ·
  `foundations/decisions.md:1739-1752` D-97 · `foundations/decisions.md:1963-1974` D-112 ·
  `foundations/decisions.md:1976-1989` D-114 ·
  `foundations/invariants.md:214-224` simulation-isolation ·
  `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `.the-way/foundations/glossary.md:163-167` exemplar ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md:24-46` Where the skill works ·
  `guidelines/coding-content-data.md` ·
  `src/browser/view/app.ts` · `src/browser/view/game-view.ts` · `src/server/database.ts` ·
  src/browser/sim/saved-game.ts and tests/sim/saved-game.test.mjs (made in Slice 1) ·
  src/browser/view/game-saver.ts (made in Slice 5)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 5 · Slice 6 · Foundation entries rows 20, 25

### Slice 8 — The testing guideline's trust boundaries

- **Goal:** through `the-way-maintain-testing-guidelines`, with no meaning beyond the task and the
  spec (WAY-172), `guidelines/testing.md` § Trust boundaries describes the change: its *Decision*
  and *Invariant* lines gain the entries the change brings (Foundation entries rows 15, 17, 21, 25
  and the others its table cites); the table of boundaries gains the row of
  `src/browser/sim/saved-game.ts` (`save-version`: crafted documents refused whole, with the file
  and case of Slice 1) and its `src/server/` row the save routes' cases of Slice 3
  (`player-save-isolation`, the 401 cases under `account-session-authorization` and
  `blocked-account-access`, `account-mutation-request-guards` for six routes); in the permissions
  table the D-109 row, the D-137 row and the row of an account identifier supplied in a request
  name `GET /api/saved-game` and `PUT /api/saved-game`, the D-104 rows name the save route and its
  64 KiB limit beside 16 KiB for the others, the transport row's count of paths goes from six to
  seven, and the save routes' own results — the own saved game state read and replaced, conflict,
  outdated, too large — stand in rows of their own with the expected results their decisions give.
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:476-482` Foundation entries ·
  Foundation entries row 2 · Foundation entries row 4 · Foundation entries row 9 ·
  Foundation entries row 10 · Foundation entries row 15 · Foundation entries row 17 ·
  Foundation entries row 21 · Foundation entries row 25 · Foundation entries row 26 ·
  Foundation entries row 29 · Foundation entries row 30 · Foundation entries row 35 ·
  `foundations/decisions.md:1366-1377` D-73 · `foundations/decisions.md:1842-1853` D-104 ·
  `foundations/decisions.md:1909-1920` D-109 · `foundations/decisions.md:1922-1935` D-110 ·
  `foundations/decisions.md:2528-2541` D-137 ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/part_map.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `tests/http.test.mjs` · `tests/transport.test.mjs` ·
  tests/sim/saved-game.test.mjs (made in Slice 1)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 3 · Foundation entries rows 21, 25, 26, 29, 30, 35

### Slice 9 — The deploy skill's text about saved game states

- **Goal:** as To do 15 and spec decision 9: `.claude/skills/loop2-deploy/SKILL.md` — its opening
  lines, § „Accounts, session keys and the database” and § „Rollback” — and
  `references/troubleshooting.md` § „Rollback and the accounts” say that `loop2_accounts` also
  holds saved game states, that a rollback leaves them as they are, that schema version 4 adds the
  table of saved game states, and that a commit knowing only version 3, `main` before this change
  included, then fails health (exit 8); `references/setup_and_secrets.md` § „Deploying a request
  head and accepting it” gains the rule that from the first deployment of this task's branch (H1)
  until its merge, through review and corrections, nothing else merges to `main`, its sentence
  „Reload: the headquarters appears straight away” gains the landing on a manual map run (paused
  while it goes on, on its screen after its end), and in place of „saved game states are not
  checked here” it gives the step: save the game, redeploy the same commit (H2), reload and see the
  saved state back. `.agents/skills/loop2-deploy/` stays byte-equal to
  `.claude/skills/loop2-deploy/`. The skill's other matters (WAY-139: watching deployments,
  secrets, the agent–human split, logs) stay as they are.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:33-33` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:124-130` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:190-191` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:201-203` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:222-225` Human actions ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:355-364` 9. The deploy skill's text (both copies) ·
  Foundation entries row 5 · Foundation entries row 13 · Foundation entries row 18 ·
  Foundation entries row 27 ·
  `foundations/decisions.md:211-230` D-11 · `foundations/decisions.md:232-250` D-12 ·
  `foundations/decisions.md:284-302` D-15 · `foundations/decisions.md:331-354` D-17 ·
  `foundations/decisions.md:1963-1974` D-112 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/glossary.md:32-37` deployment · `foundations/glossary.md:39-44` test server ·
  `.the-way/foundations/glossary.md:79-83` human action ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** cannot be undone — the text that tells the human about schema step 4 on
  `loop2_accounts`: the rollback that no longer starts across it and the window from H1 to the
  merge in which nothing else may merge to `main`
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`
- **Depends on:** Slice 2 · Foundation entries rows 5, 13, 18, 27

## Work after H2

Not a slice made before the request. After the human performs H1 and H2 at the blocked draft
request (task, *Human actions*) and H2 shows the saved game state back after the redeployment that
replaced the application container, the cycle removes the violated mark of
`account-save-durable-storage` through `the-way-record-invariant` (Foundation entries row 31; To
do 14) and commits it to the request.

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the state saved on the server with its version and back after signing in in another browser; a manual map run landed on; another version discarded whole; progress unsaved before an expired session saved after signing in again | Slices 1–6; the manual check is H1 |
| To do 1 — schema version 4 in `loop2_accounts`, kept on the move; D-112, `account-database-schema`, `account-schema-lifecycle` changed | Slice 2; Foundation entries rows 18, 27, 28, 34; Slices 7, 9 |
| To do 2 — whole saved game state as JSON through `fetch()` on relative `/api/` paths through the client | Slices 3, 4; Foundation entries rows 4, 24 |
| To do 3 — only the signed-in player's own save, by the session; refusal without a session; blocked account refused | Slice 3; Foundation entries rows 2, 17, 21, 29, 30 |
| To do 4 — D-104 guards, 64 KiB for the save route and 16 KiB for the others, at most 64 KiB stored; `account-mutation-request-guards` settled | Slices 2, 3, 4; Foundation entries rows 15, 26 |
| To do 5 — the shape's version; other version, absent archetype and bad shape discarded whole with their one-time sentences; a lower version refused by the server, the old tab's sentence, saving stopped | Slices 1, 3, 5, 6; Foundation entries rows 6, 10, 25 |
| To do 6 — load after sign-in and reload with a valid session; new game only on „no save”; warning and retry on an uncertain answer; running map run paused, ended one on its screen; the confirmation notice above the game | Slices 1, 6; Foundation entries rows 13, 14, 19 |
| To do 7 — automatic saving at its moments, 30 s while a map run passes, one try at hiding; the failed and too-large sentences and their retries | Slices 4, 5, 6; Foundation entries rows 7, 8, 32, 33 |
| To do 8 — a save only from the browser that saw the last one; the losing browser loads, pauses, shows its sentence, saves on | Slices 2, 3, 5, 6; Foundation entries row 9 |
| To do 9 — expired session: game removed, forms with the sentence, state in page memory, sent after the same account's sign-in, dropped for another account | Slice 6; Foundation entries rows 3, 11, 22 |
| To do 10 — „Wyloguj” saves first, with each outcome | Slices 5, 6; Foundation entries row 12 |
| To do 11 — load through a simulation function; D-04 changed | Slice 1; Foundation entries row 16 |
| To do 12 — the exemplar, kind guidelines, index row and the sentence of `guidelines/coding.md` | Slices 1, 7; Foundation entries row 20 |
| To do 13 — the projected decisions and invariants, D-96 merged with row 7 | Foundation entries rows 1–6, 13, 19, 21–25 |
| To do 14 — the violated mark of `account-save-durable-storage` removed after H2 | Work after H2; Foundation entries row 31 |
| To do 15 — the deploy skill in both copies | Slice 9 |
| Acceptance criterion — checked by hand on the test server (H1) | H1, the human's, at the blocked draft request; Slices 1–6 make it possible |
| Settlements row 1 | Foundation entries row 7; Slices 5, 6 |
| Settlements row 2 | Foundation entries row 8; Slices 5, 6 |
| Settlements row 3 | Foundation entries row 9; Slices 2, 3, 4, 5, 6 |
| Settlements row 4 | Foundation entries row 10; Slices 2, 3, 4, 5, 6 |
| Settlements row 5 | Foundation entries row 11; Slice 6 |
| Settlements row 6 | Foundation entries row 12; Slices 5, 6 |
| Settlements row 7 | Foundation entries row 13; Slices 1, 6 |
| Settlements row 8 | Foundation entries row 14; Slices 1, 6 |
| Settlements row 9 | Foundation entries row 15; Slices 2, 3, 4 |
| Settlements row 10 | Foundation entries row 16; Slice 1 |
| Questions carried to cycle | settled in the spec (decisions 1–8, Foundation entries); made in Slices 2–6 |
| Spec decision 10 — guideline passages and direct refusal tests | Slices 3, 7, 8 |
| Spec — environment facts and part map | Foundation entries rows 32–35 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The guideline changes stand in two closing slices, one per discipline (Slices 7, 8), after the code they describe | each code slice changing its own guideline | a guideline slice reads code another agent made and may misdescribe it; the review of the whole change compares them |
| The exemplar decision of kind `saved-game` is written by the foundation step through `the-way-record-decision`, before the file exists; the kind's guideline file comes in Slice 7 | Slice 7 writing the decision through the maintain skill | if Slice 1 names its file otherwise, the decision needs a correction |
| The `simulation` *Trust boundary* entry for `src/browser/sim/saved-game.ts` is written by Slice 1, which creates the file | the foundation step writing it before slice 1 | none known: `foundation_check.py` would fail on a pattern that matches no tracked file |
| The database (Slice 2) and the routes (Slice 3) are two slices, so the schema step that cannot be undone is reviewed on its own | one server slice | Slice 3 builds on the operation names Slice 2 chose |
| The save methods extend `src/browser/account-api.ts`, one client with one exchange and time limit (spec, recommended) | a second client file of kind `browser-api-client` | the client file grows; the guideline of the kind still covers it |
| The client comes after the routes and is tested against its own local server, not the account server | the client before the routes, or tested against the account server | the two sides can drift apart; each side's tests pin the contract of spec decision 1 |
| The saver's tests stand in a new file `tests/view/game-saver.test.mjs`; the page's tests stay in `tests/view/account-screen.test.mjs`, where the tests of `startApp` and their controlled client stand | a new test file for the page | `tests/view/account-screen.test.mjs` grows long |
| The kitchen-sink page is not changed: the header save sentence is the existing form warning in `warning`, with no new shared control, state or role | showing the sentence on the kitchen-sink page | a reviewer may still want it shown; adding it is small |
| The `simulation-module` and `browser-module` guidelines' tables of files are left as they stand | adding `src/browser/view/game-saver.ts` to the `browser-module` table | the table already omits several modules of the view (report); a later audit lists them together |
| Model classes: strongest for the load (Slice 1); same for the schema step (Slice 2), the saver (Slice 5) and the page (Slice 6); cheaper for the rest | cheaper everywhere | a stronger class costs more on four slices |
