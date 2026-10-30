# Report — spec design, task `zapis-stanu-na-serwerze`

Status: done
Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md`

## Questions sent and their answers

None. Every choice the task carries to the cycle is a design choice within named bounds, and the
sources settle every behaviour the player sees. Two points could have been asked and were settled
in the spec instead, each the smallest reading that fulfils the task; the orchestrator may overturn
them:

- Where the one-time sentences of a refused save stand. The task says only "w tym samym miejscu"
  for the two. The spec puts them above the game as a one-time notice of the confirmation notice's
  kind, because the header slot is cleared by the next successful save, and the change saves the new
  game at once (next point). Cost if wrong: the sentence moves between two places in the view.
- An immediate save of the new game after a refused load. No source asks for it, but without it the
  refused save stays on the server and the sentence comes back at every sign-in, which contradicts
  "jednorazowe" (To do 5, row 7). Cost if wrong: one save the player did not cause.

## Ways weighed

- Basis of the conflict check: a revision counter in the body (chosen) vs an opaque tag or
  `If-Match` header (no gain inside one transaction; the header leaves the D-104 body as not the only
  input) vs a timestamp (clock-dependent).
- How the server knows the version: a separate `version` field stored in a column (chosen) vs the
  server reading `game.version` (reads the game's document, against D-07; two places for one number).
- "No saved game state": 200 with `save: null` (chosen) vs 404, which an unmatched `/api/` path also
  gives (D-05), so a missing route would read as "no save" and a new game would overwrite a real one.
- Method: `PUT` (chosen) vs `POST` (equivalent; whole-resource replacement reads as `PUT`).
- Version-bump guard: type-built strict load plus a pinned current-version document in a test, with
  a kind-guideline rule and review for the bump (chosen) vs review alone (a missed bump surfaces only
  in a player's failed load) vs a digest of `types.ts` (trips on comment edits, misses data-derived
  key types) vs a declarative schema with pinned digests (mechanical, but a larger piece of code than
  the rest of the change). The chosen way makes a shape change visible as a red test; the bump stays
  a human act at review — named in the spec as its cost.
- Last save at closing or hiding: `fetch` with `keepalive` on every save, one request in flight
  (chosen) vs `sendBeacon` (no answer: a tab that only hid would not learn its new revision and its
  next save would conflict with itself) vs `keepalive` only at hiding (the save in flight at closing
  is cancelled, and the hiding moment, seeing it in flight, sends nothing). The Fetch Standard caps
  in-flight keepalive bodies at 64 KiB together, which a 64 KiB body fits alone.
- Event: `visibilitychange` to `hidden` (chosen; MDN: the last event a page reliably observes) vs
  also `pagehide` (two saves).
- Several requests: one at a time with coalescing (chosen) vs a debounce (delays every save, still
  needs one-at-a-time for the revision) vs parallel (a tab conflicts with itself).
- Retry: 5 s, 10 s, 20 s, then every 30 s, a new moment sending at once (chosen) vs a fixed 5 s
  (a request every 5 s per tab through a long outage).
- Guards: `mutationGuards` with a per-route limit, the invariant covering six routes (chosen) vs a
  second guard stack (two copies of the rules) vs the invariant left at five routes.
- Stored limit: checked on the stored text apart from the body limit (re-serialization can lengthen
  the text, e.g. `1e21` → `1e+21`), one row per account (chosen).
- Same account after expiry: compare the `id` the server named for the kept state with the `id` of
  the new sign-in, browser-side only (chosen); nothing sent, so D-109 holds.
- Kept state: the saved document, rebuilt through the load function (chosen) vs a live `GameState`
  (a second way to build the game; its running map run would need its own pause).
- Header order: the save sentence above the D-157 row (chosen: a sentence about progress not being
  saved concerns a loss, the address row is a `text-secondary` note).
- Save on the 30-second interval only when the state changed since the last request: covers "co 30
  sekund w trakcie biegnącego przejścia" and, at no cost, the pause a discovery leaves.

## Result of the four checks

1. No placeholder, `TBD` or empty section.
2. No contradiction found between sections or with the task and the foundation. D-96's "constructs
   the game only after the server confirms the session" is kept and extended (row 7); D-62, D-132,
   D-173, D-137 unchanged. The version check precedes the revision check so the Q4/Q17 path holds.
3. Scope: one change, though large. It has independent seams a plan can slice along — the server
   (schema step 4, database operations, routes, guards), the simulation's `saved-game.ts` with its
   kind guideline, the client methods, the saver and the page, and the deploy skill's text — but none
   is useful to the player alone, so the spec treats it as one change.
4. Two-way readings settled: "co 30 sekund w trakcie biegnącego przejścia" read as a 30 s interval
   that saves when the state changed; "jednorazowe" read as "shown once and not again at the next
   sign-in" (hence the immediate save); "oversized" read per route.

## Reaches beyond the dispatch

- The Fetch Standard, `https://raw.githubusercontent.com/whatwg/fetch/main/fetch.bs`, the file at
  commit e9460d1b22ea, § HTTP-network-or-cache fetch, the keepalive quota — to check the 64 KiB limit
  the task asks about (handoff allows it).
- MDN, `mdn/content` `files/en-us/web/api/document/visibilitychange_event/index.md`, commit
  9a0e5c1cfa8d — the statement that `hidden` is the last reliably observable event (handoff allows it).
- The reference game loop, `C:\Storage\repos\loop`, `src/sim/save.ts` and `src/sim/stash.test.ts`
  at cdc7c0d — read as an example of a version constant and its manual bump (handoff allows it).
- Decisions D-34, D-38, D-52, D-54, D-166, D-168, D-169, D-170, D-174 headings and D-98–D-111,
  D-113, D-115, D-116 read in passing while reading the named ranges whole.
- The spec proposes, beyond the task's To do list, changes that its own choices make necessary: the
  part map (`simulation`'s trust boundary gains `src/browser/sim/saved-game.ts`; `account-server`'s
  responsibility gains saved game states), the testing guideline's *Trust boundaries* rows through
  `the-way-maintain-testing-guidelines`, the rule „Otwarcie schematu bez utraty danych” of
  `guidelines/coding-database-access.md`, the `simulation-module` guideline's *When to read*, and two
  new environment facts. The orchestrator may cut the trust-boundary marking of the simulation file;
  without it the handoff's review instruction still stands, but `foundation_check` and later reviews
  do not know the boundary.

## Searches not found or unclear

- No place for the one-time refused-save sentences in the task beyond "w tym samym miejscu" (settled
  above).
- No source on whether the save of a new game after a refused load is wanted (settled above).
- No kind listed for `src/server/account-routes.ts` in `guidelines/coding.md`; the save routes are
  placed there for the shared transport gate over the `paths` table.
- No rule on the order of header lines in `guidelines/styleguide-browser-view.md`; the order is
  this spec's choice.
- Whether a new content item should discard players' saves: the spec makes it a shape change
  (`Backpack` enumerates every item), which tasks adding items will meet as a version bump; no
  source settles it either way.
