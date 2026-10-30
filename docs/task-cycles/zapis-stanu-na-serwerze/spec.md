# Spec — Zapis stanu gry gracza na serwerze z numerem wersji i jego wczytanie po zalogowaniu w innej przeglądarce

- Task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`
- Open choice: the task's *Questions carried to cycle* (recognizing the same account after an
  expired session; paths, methods and refusal codes of the save routes and their browser client;
  whether `account-mutation-request-guards` covers the save route and its "oversized"; where the
  shape's version number stands, what forces its bump and how the server knows a save's version;
  how the browser shows it saw the last save; how the last save goes out when the tab closes or
  hides; the retry rhythm; the order of the failed-save sentence and the unconfirmed-address row;
  the *Scope* of the entries) and the mechanisms the *Settlements to record* rows 1–10 leave open.

## Intent

The player's whole game state is kept today only in the page and is lost at every reload. The
change makes the account and save server hold one saved game state per account in the account
database (schema version 4), lets the browser load it before it builds the game and send it back
automatically, and settles every outcome of that exchange — another browser saved meanwhile, an
older tab after a deployment, a save too large, a session gone — as the task's answers give them.
The server stores and returns the saved game state without reading the game in it (D-07); the
browser reads it only through one function of the simulation that returns a game state or a
refusal (row 10).

## Goals and non-goals

Goals:

- A saved game state per account, stored in `loop2_accounts` in schema version 4, read and replaced
  only by that account's valid session (To do 1, 3).
- Two routes and their client methods, a version number of the shape carried beside the game, a
  revision number the server gives each accepted save (To do 2, 4, 5, 8).
- One simulation function that turns a downloaded document into a game state or a refusal, and its
  counterpart that turns a game state into the document (To do 11, 12).
- The browser's save mechanism: the moments of saving, one request at a time, retry, the header
  sentence, conflict, outdated tab, too large, expired session with the state kept in page memory,
  logout that saves first (To do 7–10).
- The order in which the page builds the game: session, then the saved game state, then the game,
  landing on a manual map run where the state holds one (To do 6).
- The foundation entries, the new kind `saved-game` with its exemplar and guidelines, and the deploy
  skill's text (To do 12–15).

Non-goals:

- No moment of saving in the document (`savedAtMs`) and no catch-up: task 18 adds both (Out of
  scope). The document holds the version and the game state, nothing else.
- No migration of a saved game state between versions: another version is discarded whole.
- No copy of saved game states in browser storage (`localStorage`, `sessionStorage`, IndexedDB).
- No `navigator.sendBeacon`, no new shared control, no "Zapisano o …" line, no button „Zapisz”.
- No deletion of a saved game state on blocking; no saved-at column, no history of saves.
- No change of D-62, D-132, D-173, D-137, D-139.

## Constraints

- The task's answers 1–23 and rows 1–10 fix every sentence the player sees, its role and the
  behaviour at each outcome; this spec does not reopen them.
- D-04 (state changed only through the simulation), D-07 (the server computes nothing of the game),
  D-96, D-97, D-101 (several browsers signed in at once), D-104 (Origin and JSON body guard),
  D-108 (relative `/api/` paths), D-109 (the session alone authorizes; a supplied identifier grants
  nothing — its closed lists of what a session authorizes and of the routes that answer JSON 401
  change in this change to take the save routes, see *Foundation entries*), D-112 (one step per schema version, appended, never edited; refuse a newer schema),
  D-117 (client: relative paths, no redirect, typed failure, time limit, no state of its own),
  D-137 (blocking deletes sessions), D-12 (no agent changes the server).
- Invariants `simulation-isolation` and `simulation-inputs` bind the new simulation file; the file
  must not import from outside `src/browser/sim/` nor change its argument.
- `src/server/**` is a trust boundary; the saved game state the server returns is untrusted for the
  simulation (step 4 answer of the handoff). Both places refuse crafted input.
- Environment: the Fetch Standard caps the bodies of all in-flight `keepalive` requests of a page at
  64 kibibytes together — "If the sum of contentLength and inflightKeepaliveBytes is greater than
  64 kibibytes, then return a network error." (whatwg/fetch `fetch.bs`, commit e9460d1b22ea, §
  HTTP-network-or-cache fetch); MDN: a transition to `hidden` "is the last event that's reliably
  observable by the page" (mdn/content `files/en-us/web/api/document/visibilitychange_event/index.md`,
  commit 9a0e5c1cfa8d). Both read 2026-10-29.
- Code as it stands (dce2970): `GameState` is plain JSON-able data (`src/browser/sim/types.ts:279`);
  `checkProgram` already checks an unknown value as a program (`src/browser/sim/programs.ts:196`);
  `createGameView()` always starts from `newGame()` (`src/browser/view/game-view.ts:47`); the page
  builds the game right after `GET /api/account` (`src/browser/view/app.ts:87`); `mutationGuards`
  fixes the body limit at 16 KiB for every route it guards (`src/server/transport.ts:82`); the
  router's transport check covers every path of its `paths` table (`src/server/account-routes.ts`).

## Decisions

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

### 2. Where the version stands and what forces its bump

- The simulation file `src/browser/sim/saved-game.ts` holds the constant of the current version of
  the shape, starting at 1. The browser sends it as `version` beside `game`; the server stores it in
  its own column and compares only that integer (D-07, row 4).
- The load function (decision 5) builds the game state field by field as a value of the
  `GameState` type, so a field added to or removed from `GameState` or a type it reaches fails the
  type check until the load function changes; it refuses every missing or extra key.
- A test of the new kind holds, written out in the test, one saved document of the current version
  that fills every optional branch (a map run with a campfire, a burning item, a combat record, a
  copy whose program was deleted, a discovery held, counts beside a program; its map run written
  paused, so the load's pause changes nothing in it) and asserts that it loads into the state it
  describes and that the constant equals the version written beside it. A
  shape change makes the strict load refuse that document, so the test turns red; the kind's
  guideline rule says the document is rewritten only together with a raised version, and review
  checks the pair. The documents of earlier versions stay in the test, each refused as another
  version.
- Content data whose identifiers a type enumerates in full belong to the shape: today only
  `Backpack` (`Record<ItemId, number>`) does, so a new item of the data raises the version. An
  identifier that a type holds as a member of a list (map, resource, creature, action and condition
  kinds) is checked against the data at load.

Rejected: review alone — a missed bump is found only when a player's save fails to load or, worse,
loads into a state the rules do not describe; a digest of the source text of `types.ts` pinned in a
test — every comment edit trips it, and data-derived key types escape it; a declarative schema whose
digest is pinned per version — mechanical end to end, but a schema interpreter with typed unions is
a larger piece of code than the rest of the change. Cost if wrong: a bump is still a human act at
review; the red test makes the shape change visible, not the bump automatic.

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

### 4. Schema version 4: one table of saved game states

- Step 4 appended to the schema's steps adds one strict table: the account's identifier as primary
  key and foreign key that removes the row with its account, the version of the shape (integer from
  1), the revision (integer from 1) and the game as text, with a check that the text's bytes are at
  most 65 536. No other table or column changes; accounts, sessions and emailed links and all their
  values stay. Steps 1–3 are not touched.
- Two operations of database access: read the saved game state of an account (or none), and write
  it under the rules of decision 1 in one transaction that reads the account's blocked state, the
  stored version and the stored revision and writes nothing when any of them refuses — the same
  pattern as the session write (`coding-database-access.md`, "Stan konta w instrukcji zapisu").
- Blocking keeps the saved game state; unblocking finds it again.
- Tests: a version-3 database written in the test with its own schema (as task 20 left it, with
  accounts, a blocked account, a confirmed address, sessions and emailed links) opens as version 4
  with every row and value kept and no saved game state; a failing step 4 leaves it at version 3
  unchanged; the "newer unknown version" case moves from 4 to 5.

Rejected: a column of the accounts table — a 64 KiB text in the row every login reads; a saved-at
column now — task 18 decides where the moment of saving lives, and an unused column is a schema
step no one needs.

### 5. The simulation's load function and its counterpart (new kind `saved-game`)

Unit `src/browser/sim/saved-game.ts`, the first file and exemplar of kind `saved-game`:

- The version constant (decision 2).
- A function from a game state to the saved document `{ version, game }`, pure, sharing nothing it
  could later change with the state passed.
- A function from an unknown value (the `save` object the client hands over, or the document kept
  in page memory) to either a game state or a refusal with one of three reasons, `version`,
  `archetype`, `shape`. It never throws and changes nothing passed to it. In order: not an object
  with an integer `version` → `shape`; a version other than the current one → `version`; a team
  whose characters list is readable and names an archetype absent from the data → `archetype`;
  anything else that the state's types, closed lists and data do not admit → `shape`.
- What "admit" covers: every key present and no other (own keys only, `__proto__` included);
  numbers finite and safe integers where the type is an identity, a count or a minute; enumerated
  values on their closed lists (pace on the data's paces, condition and action kinds, death causes);
  identifiers of maps, resources, items, creatures and the campfire present in the data; programs
  through the existing program check; the references the simulation follows existing — the map
  run's character in the team, the copy's program on the list or null with its deleted name,
  identities below their next counters and unique, picks and programs used last naming listed
  programs; the map run's tiles of the number its map's layout gives. The maker may refuse more,
  never less.
- A map run that goes on (no death, no completion) comes back paused, at the game minute, pace and
  carried real time of the document; an ended one comes back as it ended, so the view shows its
  screen after the end with „Restart” and „Zakończ” and its copy open to editing (D-62, D-132,
  D-173 unchanged). Nothing advances it: no real time and no time away enters the load (answer 8,
  answer 15 B).
- The boundary with `simulation-module`: the new kind's guideline claims `src/browser/sim/saved-game.ts`
  (the file that turns a downloaded document into a game state or a refusal, and back); the
  `simulation-module` guideline's *When to read* excludes it as it excludes content data, and the
  index row in `guidelines/coding.md` names the new kind. The sentence „Wzorzec zapisu gry powstanie
  przy pierwszej implementacji” changes in the same change. The guideline's rules: simulation
  isolation, unchanged arguments, a refusal instead of a throw for every crafted input, and the
  version bump with the shape (decision 2). The new meaning goes to the human through
  `the-way-maintain-coding-guidelines` (WAY-172).

Rejected: load in the view, which replaces the state itself — the violation example of D-04; a
lenient load that fills missing keys — a migration by another name, against "discarded in full";
the load putting a running map run on pause in the view — the pause is a rule of the game state.

### 6. The browser's saver: one request at a time, every moment coalesced

Unit `src/browser/view/game-saver.ts` (kind `browser-module`), created with the game and disposed
with it. It is given the client, a way to read the current game state (passing the clock's real time
first), the state and the revision it starts from, and callbacks to the page for the outcomes it
cannot handle in the game: conflict, outdated, signed out. It offers "a moment of saving", "a check
for changes", "save before logout" (a promise of the outcome), a read of the revision it last saw,
and `dispose()`.

- The baseline: the saver holds the state it last sent. It starts with the state the game was built
  on — the state a load returned (also on the conflict path and from the kept document), or the new
  game — as already saved at the revision it got, so a game nobody has touched since it was built is
  not saved again by itself. Comparison is by identity of the state object: the simulation hands
  back the very state it was given when nothing changed (`passRealTime` while paused or without a
  map run, `src/browser/sim/game.ts`), and the view keeps the state only when a result differs
  (`store.apply`).
- Moments that always send (row 1): the game view calls the moment after every act of the player
  whose result changed the state — program and copy edits, program list actions, creating a
  character, the pick on a headquarters row, sending, „Restart”, „Zakończ”, pause, pace — and after
  a game minute that ends the map run in a death or a completion; the page calls it for the two
  explicit saves of decisions 7 and 8 (the new game after a refused load, the kept document of the
  same account).
- Checks that send only when the current state is not the baseline: a 30-second real-time interval,
  and a `visibilitychange` to `hidden` (MDN fact above), which covers closing and hiding alike. While
  a map run passes the state changes every game minute, so the interval saves every 30 s and the
  hiding saves the latest state; outside a map run every change is a player's act already sent, and
  after a discovery's pause the interval sends once. A tab that lost a conflict, or one just built
  from a load with its map run paused, sends nothing until the player acts in it (answer 16, row 3,
  To do 8).
- One request at a time: a moment during a request in flight marks the saver to send once more
  when the answer comes, with the state of that time. Each request is `basedOn` the last revision
  the saver saw. Every save request the client sends is sent with `keepalive`, so the one in flight
  survives a closing page; one in flight keeps the body within the keepalive quota, and a body over
  it is never sent (decision 3). A hiding check while a request is in flight sends nothing more —
  the gap is the "bez gwarancji" the task accepts.
- Outcomes:
  - saved — the new revision is kept; the header sentence, if any, goes.
  - failed (no connection, time limit, a 5xx or any other answer) — „Nie udało się zapisać
    postępu. Gra spróbuje ponownie.” stands; a retry follows after 5 s, then 10 s, 20 s and every
    30 s, each with the state of its time; a moment meanwhile sends at once (answer 2).
  - too large (the server's 413, or a body the client measured over 65 536 bytes and did not
    send, decision 3) — „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne
    programy.” stands; no retry; the next moment or check that finds a changed state tries again,
    the hiding check included (answer 18); before logout it lets logout go on (decision 8).
  - conflict — the page drops this game and loads the server's save (decision 7), then shows
    „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” in the header slot until the
    first successful save (rows 3, answer 16).
  - outdated — „Gra została zaktualizowana. Odśwież stronę.” stands and the saver stops for good:
    no moment or check sends anything any more; the game stays on screen (row 4).
  - signed out (401) — the page takes the current state as a document with the account and the
    revision and removes the game (decision 8).
- The header slot is one line under the title and „Wyloguj”, in `warning`, above the D-157 row of
  an unconfirmed address: a sentence that says progress is not being saved concerns a loss and
  comes first, the address row is a `text-secondary` note. Hidden when empty.
- Tests the spec asks for besides those of each decision: the client returns too-large for a body
  over 65 536 bytes and the local server receives no request, while a body of exactly 65 536 bytes
  is sent; the saver given a too-large outcome shows its sentence, does not retry, and lets logout go
  on to `POST /api/logout`; a saver built on a loaded state (the conflict path) with no act of the
  player sends nothing at the interval or at hiding, and sends at the player's first act.

Rejected: a debounce timer instead of coalescing — a delay before every save, and the
one-request-at-a-time rule is still needed for the revision; several requests in flight — each
would be based on a revision another is about to change, so the tab would conflict with itself;
`sendBeacon` at hiding — no answer, so a tab that only hid would not learn its new revision and its
next save would read as another browser's conflict; `keepalive` only at hiding — the save in flight
when a tab closes is then cancelled and the hiding moment, seeing it in flight, sends nothing;
a fixed retry every 5 s — a long outage costs a request every 5 s per tab; `pagehide` as well — MDN
names `visibilitychange` the last reliable event, and two handlers send two saves.

### 7. The page: session, then the saved game state, then the game

Changes in `src/browser/view/app.ts` and `src/browser/view/game-view.ts`:

- After `GET /api/account` names an account (or a form signs in), the page keeps "Sprawdzanie
  logowania…" and asks `GET /api/saved-game`. Only its answer builds the game: `null` → a new game
  (D-51, D-91); a save → the load function. A failed or uncertain answer shows the client's
  sentence with „Spróbuj ponownie”, as the session check does, and the retry repeats both requests;
  401 shows the forms. The request numbering that ignores stale answers covers the new request too.
- `createGameView` takes the game state it starts from, the revision it starts from and the page's
  callbacks, and gives the saver its moments; it lands where the state says: the headquarters, a
  map run paused, or the screen after a map run's end (D-96 projected).
- A refused load builds a new game, puts above the game, as a one-time notice of the confirmation
  notice's kind, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.”
  (`version`, `archetype`) or „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”
  (`shape`), and saves the new game at once, based on the server's revision, so the refused save
  is replaced and the sentence does not come back at the next sign-in. Where a confirmation notice
  also stands, it comes first.
- The conflict path drops the game (its clock stops), shows the waiting screen, asks the save again
  and builds from it as above; the conflict sentence then stands in the header slot. A refused load
  on that path takes the refused-load path instead.
- The confirmation notice stands above the game whatever screen it opens on (D-156 projected):
  the page already puts it above the whole game element, so a game opening on a map run keeps it.

Rejected: one combined request for account and save — `GET /api/account` keeps its contract, its
tests and its use after the email confirmation; the refused-load sentence in the header slot — the
immediate save of the new game would clear it before the player reads it; no immediate save after a
refusal — the sentence would come back at every sign-in, which is not "jednorazowe".

### 8. Expired session, the same account, and logout

- Signed out by a save (401): the page reads the current state as a saved document and keeps it in
  a variable of the page together with the account's identifier (from the `id` of the account the
  server named) and the revision the saver last saw; it disposes the game and shows the forms with
  „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” above them in `warning`. Nothing goes
  to browser storage; a reload loses it (answer 5).
- Same account: after a sign-in, when an account's `id` equals the kept identifier, the page skips
  `GET /api/saved-game`, builds the game from the kept document through the load function (so a map
  run that went on comes back paused, an ended one on its screen after the end) with the kept
  revision, drops the kept copy, and calls one moment of saving at once. Its outcomes are the
  saver's: a conflict loads the other browser's save, an outdated answer stops saving, a failure
  retries. Another account's `id` drops the kept document and takes the normal path. The browser
  compares identifiers only; it sends none (D-109).
- „Wyloguj” (row 6): with the saver stopped as outdated, logout goes straight to `POST /api/logout`
  and the forms then show „Gra została zaktualizowana. Odśwież stronę.” above them. Otherwise the
  button reads „Wylogowywanie…” while the saver waits for a request in flight and sends the current
  state: saved, conflict or too large → `POST /api/logout` as today; outdated → logout, then the
  forms with that sentence; failed → no logout, the game stays, and the header slot reads „Nie udało
  się zapisać postępu. Spróbuj wylogować się ponownie.” while the saver's retries go on silently
  under it until a save succeeds; signed out → the expired-session path above, also for a blocked
  account (answer 19). The sentence above the forms stands in the same place as the expiry
  sentence.

Rejected: a new account-identity check on the server for the kept state — the stored session
already decides which row a save replaces, and the identifier the server named is enough for the
browser to tell its own accounts apart; the kept state as a live `GameState` — a second way to build
the game beside the load function, and its running map run would need a pause of its own.

### 9. The deploy skill's text (both copies)

`SKILL.md` and `references/troubleshooting.md` say that `loop2_accounts` also holds saved game
states, that a rollback leaves them, that schema version 4 adds the table of saved game states and
that a commit knowing only version 3, `main` before this change included, then fails health (exit 8);
`references/setup_and_secrets.md`, § "Deploying a request head and accepting it", gains the
merge-window rule from H1 to the merge, the reload sentence with the landing on a manual map run, and
a step in place of "saved game states are not checked here": save the game, redeploy the same commit
(H2), reload and see the saved state back. `.agents/skills/loop2-deploy/` stays byte-equal to
`.claude/skills/loop2-deploy/`.

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

## Foundation entries

Decisions (wording by the foundation step; *Scope* from the part map):

- D-07, changed (Scope: account-server, browser-view, simulation) — the projected wording: the
  server holds accounts and each player's saved game state and computes nothing of the game; the
  browser computes the whole game and sends the saved game state.
- "Who can create and use a player account?", new (account-server, browser-view) — the projected
  wording; this change makes true that a signed-in player reads and changes only their own saved
  game state.
- "What happens to unsaved progress when a session expires?", new (browser-view) — the projected
  wording.
- "How does the browser exchange saved game states with the server?", new (browser-view,
  account-server) — the projected wording, with the two routes of decision 1 as how it is met.
- "Where are player accounts and saved game states stored?", new (account-server, deployment).
- "What happens to a saved game state of another version?", new (simulation, browser-view).
- Row 1, new (browser-view): the moments of saving, the 30-second real-time rhythm while a map run
  passes, the attempt at hiding or closing.
- Row 2, new (browser-view): nothing shown on success; the failed and too-large sentences in the
  header line under the title and „Wyloguj”, above the D-157 row; retry and its rhythm.
- Row 3, new (browser-view, account-server): the server accepts a save only based on the last
  revision; the losing browser loads the server's save, pauses a running map run, shows the sentence
  and saves on.
- Row 4, new (browser-view, account-server): the server refuses a lower version than the stored
  one; the old tab shows the sentence and stops saving.
- Row 5, new (browser-view): what the player sees when a save meets a missing session, and the kept
  state in page memory only.
- D-97, changed by row 6 (browser-view, account-server): logout saves first, and how each save
  outcome ends it.
- D-96, changed (browser-view, account-server): the projected landing on a manual map run, merged
  with row 7 — the game is built only once the server answered the load, never a new game on an
  uncertain answer, and the one-time sentences of a refused save.
- Row 8, new (simulation, browser-view): a loaded running map run returns at its game minute,
  paused, with its pace; time away never moves it, now or after task 18; an ended one returns on
  its screen after the end. With it, D-53's rationale gains "when the saved game state holds no
  manual map run".
- D-104, changed by row 9 (account-server, browser-view): the save route takes a body of at most
  64 KiB, the others 16 KiB, and the server stores at most 64 KiB per player.
- D-04, changed by row 10 (browser-view, build-tools, simulation): the browser view changes the
  game state through the simulation, passing the player's choices, the passing of real time and a
  saved game state downloaded from the server; its second sentence, judged against the load
  function, says the simulation is a set of pure functions of which those that pass game time take
  a game state and a span of game minutes and return the next state with its events — so `newGame`,
  `send` and the load no longer read as departures.
- D-109, changed (account-server, browser-view): a valid server-side session alone also
  authorizes reading and replacing its own account's saved game state; `GET /api/saved-game` and
  `PUT /api/saved-game` join the routes that return JSON 401 without a valid session; no field of a
  save request names an account, and an account identifier supplied in one grants nothing. The
  invariant `account-session-authorization` keeps deriving from D-109, so its list and D-109's stay
  one list; `player-save-isolation` derives from D-109 and from "Who can create and use a player
  account?".
- D-112, changed (account-server, deployment): current version 4, the table of saved game states
  with its version, revision and game text, and a move that keeps accounts, sessions, emailed links
  and saved game states with their values.
- D-156, changed (account-server, browser-view): the projected wording, "above the game …, whatever
  screen the game opens on".
- A decision of the exemplar of kind `saved-game` (simulation, agent-workflow), as D-34/D-35 are,
  written through `the-way-maintain-coding-guidelines`.

Invariants:

- `player-save-isolation` (new; Part: account-server) — the projected wording; test on real HTTP and
  SQLite: two accounts' sessions each read and replace only their own row, no body field selects
  another.
- `expired-session-unsaved-progress` (new; Part: browser-view) — the projected wording; test of the
  page with a controlled client: a 401 on a save keeps the state, the same account's sign-in sends
  it, another account's drops it.
- `account-save-sqlite-store` (new; Part: account-server) — the projected wording, now true for
  saved game states.
- `saved-state-http-exchange` (new; Part: browser-view) — the projected wording; test in
  `tests/account-api.test.mjs` on a real local server.
- `save-version` (new; Part: simulation) — the projected wording; test of the load function with
  documents of other versions and the pinned current document.
- `account-mutation-request-guards`, changed — every state-changing route, the save route included;
  "oversized" over the route's limit of D-104.
- `account-schema-lifecycle` and `account-database-schema`, changed — the move keeps saved game
  states beside accounts and sessions.
- `account-session-authorization` and `blocked-account-access`, changed in their scope —
  `GET /api/saved-game` and `PUT /api/saved-game` without a valid session, or of a blocked account,
  get JSON 401.
- `account-save-durable-storage` — its violated mark is removed after H2 (To do 14).

Environment facts (new): `fetch-keepalive-body-quota` — the Fetch Standard's 64-kibibyte cap on the
bodies of in-flight keepalive requests (source above); `visibilitychange-hidden-last-event` — MDN's
statement that the transition to `hidden` is the last event a page reliably observes (source above).

Part map: `account-server`'s responsibility gains the persistence of saved game states;
`simulation`'s *Trust boundary* gains `src/browser/sim/saved-game.ts`, the file that reads data from
outside the simulation. With it the testing guideline's *Trust boundaries* table gains the
simulation row (`save-version`: crafted documents refused whole) and its `src/server/` and D-104
rows the save routes (`player-save-isolation`, the sixth guarded route), through
`the-way-maintain-testing-guidelines`; the rule „Otwarcie schematu bez utraty danych” of
`guidelines/coding-database-access.md` gains saved game states beside accounts and sessions.

Glossary: none — "saved game state" is used in its plain meaning; „zapis” of the copy (D-164) and
of the game state stay apart through their full names in the text of entries.

## Left to maker

- The names of functions, types and the client methods, and whether the save methods extend the
  client in `src/browser/account-api.ts` (recommended: one client, shared exchange and time limit)
  or a second file of kind `browser-api-client`.
- The exact list of what the load function refuses beyond decision 5's floor, and the split of its
  checks into private helpers.
- Where the save routes stand in `src/server/account-routes.ts` and how `mutationGuards` takes its
  limit; the SQL of step 4 and of the two database operations.
- How the game view reports "a game minute ended the map run" to the saver (from the events of
  `passRealTime` or from comparing the state).
- The waiting-screen markup on the conflict path, and the class of the one-time notice.
- Whether the kitchen-sink page shows the header save sentence; no shared control or role is added,
  so the styleguide does not require it.
- The order of the slices, if the cycle plans the change.
