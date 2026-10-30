FAIL

# Report — spec re-review, task `zapis-stanu-na-serwerze`

Spec (revised): `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md`
Earlier review: `reports/02-spec-review-report.md`; designer's revision report: `reports/03-spec-revision-report.md`
Method: `.the-way/task-cycle/spec/review.md`, review of a revised spec

## Earlier findings

### 1. `keepalive` turned a too-large save into a network failure — resolved

The client now measures the UTF-8 byte length of the save body before sending it (decision 3, "Fit
with `keepalive`"). A body of up to 65 536 bytes is sent with `keepalive`. A larger body is not sent,
and the client returns the same too-large outcome as the server's 413.

Decision 6's "too large" outcome covers that local refusal: no retry, the next moment or check tries
again, and logout goes on. Decision 8 sends "too large" on to `POST /api/logout`. The tests asked for
cover both sides of the limit: a body over 65 536 bytes reaches no server, and a body of exactly
65 536 bytes is sent. A test also checks that the saver lets logout go on. That matches answer 18,
To do 7 and 10, and row 2.

The copied limit is named as D-117's weak point and is pinned by a test on each side.

### 2. A game built from a load had no "last saved" state — resolved

Decision 6 now gives the saver a starting point: the state the game was built on counts as already
saved at the revision it got. The 30-second interval and `visibilitychange` to `hidden` send only
when the current state is a different object from that starting point. Player acts and the two
explicit saves always send.

The identity comparison holds in the code:
- `passRealTime` returns the very state it was given while paused, without a map run, or after the
  run's end (`src/browser/sim/game.ts:380`–`388`).
- `store.apply` keeps nothing when the result is the same object (`src/browser/view/game-view.ts:107`).

So a tab that lost a conflict, with its map run loaded paused, sends nothing until the player acts in
it, which is answer 16. The test asked for checks exactly that.

One imprecision does not matter for the build. The spec says a running map run "changes every game
minute", but it changes at every tick, because the carried real time changes. Either way it is
saved every 30 s.

### 3. D-109 left unchanged — resolved

*Constraints* now says that D-109's two lists change. *Foundation entries* lists D-109 as changed:
- the session also authorizes reading and replacing its own account's saved game state;
- `GET` and `PUT /api/saved-game` return JSON 401 without a valid session;
- no field of a save request names an account.

`account-session-authorization` keeps deriving from D-109. The revision broke nothing else that I
found.

## New finding (from the guideline files now read whole)

### 4. Guideline texts that the change makes false or incomplete are not among the changes the spec names

The spec names its guideline changes: `guidelines/coding.md`, the `simulation-module` guideline's
*When to read*, the rule „Otwarcie schematu bez utraty danych”, and, in `guidelines/testing.md`, the
simulation row, the `src/server/` row and the D-104 rows. Three other passages become untrue after
this change, and nothing in the spec tells the builder to change them.

- **`guidelines/coding-browser-module.md`, § „Gra na stronie i odpowiedzi serwera”.** It says:
  "`src/browser/view/app.ts` buduje grę dopiero wtedy, gdy serwer potwierdzi konto, i usuwa ją
  dopiero wtedy, gdy potwierdzi wylogowanie (D-96, D-97) … Brak sesji ekran rozpoznaje po odmowie ze
  statusem 401 …, a każdą inną porażkę pokazuje jako jedno ostrzeżenie".
  - After the change, the page builds the game only after the save request too (decision 7).
  - It removes the game when a save gets a 401 (decision 8) and when a save gets a conflict
    (decision 7).
  - It answers conflict, outdated and too-large with their own sentences instead of one warning.

  The next builder who reads this paragraph is told the opposite of what the code does. A reviewer
  of this change could also read the new code as breaking the guideline.
- **`guidelines/testing.md`, § Trust boundaries, permissions table.** The D-109 row (line 183) and
  the D-137 row (line 192) list exactly `GET /api/account`, `POST /api/logout` and
  `POST /api/email-confirmation-message`. The row of another account's identifier (line 186) lists
  the same routes.
  - The revision now changes D-109, and the spec changes `account-session-authorization` and
    `blocked-account-access` to cover `GET` and `PUT /api/saved-game`.
  - Yet these rows, from which "Oczekiwanie bierze się z decyzji uprawnień", stay without the save
    routes.
  - The spec's invariants list also names no test for those two invariants on the save routes,
    while it names one for every new invariant. The rule says "Każda granica zaufania … ma regułę
    odmowy i przynajmniej jeden stały test sprawdzający odmowę bezpośrednio, oznaczony
    niezmiennikiem". A builder who goes only by the spec's list can leave the 401 of a missing,
    forged or blocked-account session on the save routes untested.
- **`guidelines/testing.md`, the transport row (line 201).** It reads "Żądania kont na sześciu
  trasach". The `paths` table gains `/api/saved-game`, so the transport check covers seven paths.
  (Decision 3's "all six routes" is right: it counts only the routes that change state.)

What the builder needs:
- the browser-module paragraph rewritten to the new page behaviour;
- the testing table's D-109, D-137 and identifier rows extended to `GET` and `PUT /api/saved-game`,
  together with the D-104 rows the spec already names (body limit 64 KiB for the save route);
- the transport row's count changed;
- direct refusal tests of the save routes marked with `account-session-authorization` and
  `blocked-account-access`, on real HTTP and SQLite as the existing cases in `tests/http.test.mjs`.

Each through the skill the spec already uses for that discipline.

## Checked against the guidelines, no finding

- `guidelines/coding.md`: the new kind row and the replaced sentence of § „Odłożone rodzaje i
  formatowanie” are named.
- `guidelines/coding-simulation-module.md` and `coding-content-data.md`: the new file keeps
  simulation isolation and unchanged arguments, and its kind is excluded from `simulation-module` as
  content data is. `Backpack` is the one data-enumerated key type (`ItemId` = `ResourceId`), as the
  spec says.
- `guidelines/coding-database-access.md`: step 4 is appended; the move is tested on a version-3
  database written with its own schema; the rule's „konta i sesje” gains saved game states (named).
  The block read in the write transaction follows D-112's pattern for emailed links.
- `guidelines/coding-http-application.md`: the routes stay in Express. The 413 of the body limit goes
  through the existing error route; the client reads it by status.
- `guidelines/coding-browser-api-client.md`: relative path, no redirect, typed failure, time limit,
  and no state. The local size check keeps nothing between calls. New refusal codes go on the
  client's list (left to maker).
- `guidelines/testing.md`, the other rules: the pinned saved document gives explicit inputs and
  expected values. Moving the "newer unknown version" case from 4 to 5 has its reason on the data
  side. The tests the spec asks for fit the unit and integration levels.
- `guidelines/styleguide-browser-view.md`, Roles, § "Each role in its meaning", § "States of shared
  controls" and § "The kitchen-sink page":
  - every new sentence is in `warning`, in its meaning, and the header row of D-157 stays
    `text-secondary`;
  - no new shared control, state or role is added, so the kitchen-sink page needs no change. The
    spec leaves it to the maker, consistently.

## Reaches beyond the dispatch

None. I read again `src/browser/sim/game.ts` and `src/browser/view/game-view.ts`, which the dispatch
names, to check the identity claim of decision 6.

## Searches not found or unclear

- Read whole now: `guidelines/testing.md`, `coding-content-data.md`, `coding-http-application.md`,
  `coding-browser-module.md`, `coding-database-access.md`, `coding-simulation-module.md` and
  `coding.md`.
- `guidelines/styleguide-browser-view.md` was read in the parts the header and notices touch (lines
  1–60 and 150–311). Lines 61–149 (token pairs, contrast, focus outline) were not read: they concern
  values and the focus outline, which the spec does not change.
- Not checked: whether Node's `fetch` in `tests/account-api.test.mjs` enforces the keepalive quota.
  The spec's test does not depend on it, because the client refuses before sending.
