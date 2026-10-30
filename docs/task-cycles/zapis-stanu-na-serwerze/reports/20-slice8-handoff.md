# Handoff — Slice 8 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 8**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `483f5dc`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `cheaper` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/20-slice8-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** for the cycle: `src/server/**` (the save routes) and
  `src/browser/sim/saved-game.ts` (the load, which Slice 1 named in the part map's `simulation`
  *Trust boundary*). Your slice writes the testing guideline's rows for those boundaries.
- Irreversible operation: **yes** for the cycle (schema step 4), not in your slice.

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): plan row 15 is D-104, row 17 D-109,
  row 21 `player-save-isolation`, row 25 `save-version`, row 26 `account-mutation-request-guards`,
  row 29 `account-session-authorization`, row 30 `blocked-account-access`, row 35 the part map's
  `simulation` *Trust boundary*.
- Slices 1–7 (`b36292e` … `483f5dc`): the code and its tests your rows describe — the refusal tests
  of the save routes stand in `tests/http.test.mjs` and `tests/transport.test.mjs` (Slice 3), the
  crafted documents in `tests/sim/saved-game.test.mjs` (Slice 1). Read them before writing rows
  that name them.

## On the human's approval (WAY-172)

Where `the-way-maintain-testing-guidelines` reserves the approval of a new meaning of the
guidelines to the human, do not ask the human and do not decide it yourself: write what the task,
the spec and the foundation already carry, commit it, and name in your report each meaning that
needs the human's approval, with the passage it stands in, its options and your recommendation.
Return `blocked` only if your method forbids committing the text before that approval.

## Your section of the plan (copied word for word from plan.md)

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

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 2 → `foundations/decisions.md:3200-3218` D-179 — Who can create and use a player account?
- plan row 4 → `foundations/decisions.md:3237-3268` D-181 — How does the browser exchange saved game states with the server?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 15 → `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- plan row 17 → `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- plan row 21 → `foundations/invariants.md:948-956` player-save-isolation
- plan row 25 → `foundations/invariants.md:988-996` save-version
- plan row 26 → `foundations/invariants.md:728-736` account-mutation-request-guards
- plan row 29 → `foundations/invariants.md:718-726` account-session-authorization
- plan row 30 → `foundations/invariants.md:858-866` blocked-account-access
- plan row 35 → `foundations/part_map.md:28-58` simulation
- `foundations/decisions.md:1385-1396` D-73 — Which testing discipline does loop2 adopt?
- `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- `foundations/decisions.md:1943-1956` D-110 — Which proxy information identifies an account request?
- `foundations/decisions.md:2548-2561` D-137 — How does the operator block and unblock a player account?
- `foundations/invariants.md:718-726` account-session-authorization
- `foundations/invariants.md:728-736` account-mutation-request-guards
- `foundations/invariants.md:738-746` account-request-transport
- `foundations/invariants.md:858-866` blocked-account-access

## Other files your *Read* names (each whole unless a range is given)

- `foundations/part_map.md`
- `.the-way/product-guidelines/template.md`
- `.the-way/product-guidelines/testing/template.md`
- `tests/http.test.mjs`
- `tests/transport.test.mjs`
- tests/sim/saved-game.test.mjs (made in Slice 1)

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field

### 1. Two routes on one path, with a revision number and a separate version field

- `GET /api/saved-game` — with a valid session, 200 and a JSON object with exactly the field
  `save`: `null` when the account has no saved game state, else an object with exactly `version`
  (positive integer), `revision` (positive integer) and `game` (the object as stored). Without a
  valid session, or for a blocked account, JSON 401 `unauthenticated` as `GET /api/account`.
- `PUT /api/saved-game` — body exactly `{ "version", "basedOn", "game" }`: `version` a positive safe
  integer, `basedOn` a safe integer from 0 (0 = "I saw no saved game state"), `game` a JSON object
  (not null, not an array). Checks in this order: the D-104 guards with a 64 KiB limit (decision 3);
  the exact fields and their types, else 400 `invalid-request`; a valid session of a non-blocked
  account, else 401 `unauthenticated`; the stored text of `game` at most 64 KiB, else 413
  `save-too-large`; then, in one write transaction that also reads the account's blocked state:
  a blocked account stores nothing and gets 401; a stored version greater than `version` gives 409
  `save-outdated`; a stored revision different from `basedOn` (no row counts as revision 0) gives
  409 `save-conflict`; otherwise the row is written with revision = stored revision + 1 (1 for the
  first save) and the answer is 200 with exactly `{ "revision" }`.
- The version check comes before the revision check, so an old tab whose basis is also stale reads
  "Gra została zaktualizowana. Odśwież stronę." instead of loading a save its code cannot read.
- The server never reads inside `game` beyond "is a JSON object"; it stores the text it serializes
  from the parsed value and returns it unchanged inside `save.game` (D-07 complies example).
- No field of either request names an account; the stored session alone selects the row (D-109).
  An extra field is refused as `invalid-request`.

Rejected: `POST` for the save (works, but a whole-resource replacement reads as `PUT`; the guards
are wired per method either way); 404 for "no saved game state" — an unmatched `/api/` path also
answers 404 (D-05), so a server without the route would read as "no save" and the first save of a
new game would overwrite a real one; an opaque random tag or an `If-Match` header for the basis —
a counter is as safe inside one transaction, readable in tests, and keeps the body the only input
(D-104 "object of expected fields"); the server reading `game.version` — the server would read the
game's document (D-07) and the version would stand in two places; the conflict answer carrying the
current save — saves one request but gives the save route a second answer shape, and logout does
not want it. Cost if wrong: the server and client contract changes together (D-117 weak point).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit

### 3. D-104 and `account-mutation-request-guards` cover the save route, with its own limit

- `mutationGuards` takes the route's body limit as a parameter; the save route gets 64 KiB
  (65 536 bytes), every other state-changing route keeps 16 KiB. The Origin, media-type,
  compression and object checks stay the same for all six routes.
- The invariant `account-mutation-request-guards` keeps covering every state-changing route, the
  save route included, and "oversized" means over that route's limit in D-104.
- The stored limit is checked apart from the body limit on the text the server stores (decision 1):
  re-serializing parsed JSON can lengthen it (`1e21` becomes `1e+21`), so the body limit alone does
  not bound the stored text. One row per account (primary key) gives "najwyżej 64 KiB na gracza".
- Fit with `keepalive`: the server's body limit and the page's keepalive quota are the same number,
  65 536 bytes, and the browser refuses a larger keepalive body as a network error before sending
  it. So the client measures the UTF-8 byte length of the save body it is about to send: up to
  65 536 bytes it sends it with `keepalive` (within the quota while it is the only keepalive
  request in flight, which decision 6 guarantees); above that it sends nothing and returns the
  too-large outcome, the same typed outcome as the server's 413. The server's own 413 stays for a
  body that reaches it over the limit from any other client and for the stored-text check below
  it. The client's limit is a copy of the server's contract (D-117's weak point): both change
  together, and a test pins each side.

Rejected: a separate guard stack for the save route — two copies of the Origin and JSON rules that
can drift; leaving the invariant to the five account routes — the save route would change state
outside the one guarded set D-104 names.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator)

### 10. Guideline passages the change makes untrue (settled by the orchestrator)

Finding 4 of the spec's re-review (`reports/04-spec-rereview-report.md`) remained after the one
revision and is settled here by the orchestrator (step 7 of `implement-task`), on the smallest
reading that fulfils the task: guidelines the change makes false are corrected in the same change
(WAY-172, WAY-199), each through the skill the spec already uses for its discipline, with no new
meaning beyond what this spec's decisions and the task's settlements carry. The change also does,
beyond the guideline changes named above:

- `guidelines/coding-browser-module.md`, § „Gra na stronie i odpowiedzi serwera”, rewritten to the
  page of decisions 7 and 8: the game is built only after the session and then the saved game state
  are answered; the game is removed when a save gets 401 and when a save gets a conflict (then built
  again from the loaded save); conflict, outdated code and too-large have their own sentences
  instead of the one warning — through `the-way-maintain-coding-guidelines`.
- `guidelines/testing.md`, § Trust boundaries, permissions table: the D-109 row, the D-137 row and
  the row of an account identifier supplied in a request extended to `GET /api/saved-game` and
  `PUT /api/saved-game`, together with the D-104 rows already named (the save route's body limit of
  64 KiB); the transport row's count of paths changed from six to seven — through
  `the-way-maintain-testing-guidelines`.
- Direct refusal tests of both save routes — no session, a forged or removed session, and a session
  of a blocked account each get JSON 401 and leave the stored saved game state unchanged — marked
  with `invariant: account-session-authorization` and `invariant: blocked-account-access`, on real
  HTTP and SQLite like the existing cases of `tests/http.test.mjs`.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:476-482` Foundation entries

Part map: `account-server`'s responsibility gains the persistence of saved game states;
`simulation`'s *Trust boundary* gains `src/browser/sim/saved-game.ts`, the file that reads data from
outside the simulation. With it the testing guideline's *Trust boundaries* table gains the
simulation row (`save-version`: crafted documents refused whole) and its `src/server/` and D-104
rows the save routes (`player-save-isolation`, the sixth guarded route), through
`the-way-maintain-testing-guidelines`; the rule „Otwarcie schematu bez utraty danych” of
`guidelines/coding-database-access.md` gains saved game states beside accounts and sessions.
