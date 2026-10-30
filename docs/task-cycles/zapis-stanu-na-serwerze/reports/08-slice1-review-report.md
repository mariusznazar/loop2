FAIL b4c36871d2b9aaff7542824a6fc1a16575efde94

# Review — Slice 1 (and the plan's Foundation entries), task `zapis-stanu-na-serwerze`

- Range: `dce2970..b4c3687` — `fb1ef9d` (foundation entries), `2923c3c`, `b4c3687` (Slice 1).
  `git rev-parse HEAD` in the worktree = `b4c36871d2b9aaff7542824a6fc1a16575efde94`, the head given.
- Method: `.the-way/task-cycle/review/SKILL.md`, review of a planned slice.
- Blocking: 3 (Important). Minor: 3. Out of scope: 0 findings (5 lines under Declined to judge).

## Findings

### Important

**I1. The load refuses the server's `save` object, which spec decision 5 names as its input.**
`src/browser/sim/saved-game.ts:883` reads the document with `fields(value, ["version", "game"])`,
which refuses any key besides those two. Spec decision 5 (`spec.md:195-196`): "A function from an
unknown value (the `save` object the client hands over, or the document kept in page memory)".
That `save` object is, by spec decision 1 (`spec.md:83-86`) and Slice 4 of the plan
(`plan.md:297-300`, "hands `save` on as received"), an object of exactly `version`, `revision` and
`game`. So the one input the spec names first is refused as `shape`. Why it matters: if Slice 6
passes the client's `save` on, as the spec and the plan's Slice 6 ("a save the load function of
Slice 1", `plan.md:405`) read, every saved game state from the server is refused as damaged; the
page then starts a new game and saves it at once over the real one (spec decision 7), so the
player's whole saved game state is lost at the first sign-in. Nothing in Slice 1, its test or the
executor's report names this; the test's only top-level extra key is `savedAtMs` (refused, rightly).
Evidence: scratch probe (below) — `loadSavedGame({ ...savedGame(state), revision: 3 })` →
`{ ok: false, reason: "shape" }`; the same without `revision` → `ok`. Fix within the slice: admit
the `save` object as spec decision 5 gives it — e.g. an optional top-level `revision` checked as a
positive safe integer and not carried into the state — with a test of the server's `save` shape;
or the orchestrator settles in the plan that Slice 6 passes `{ version, game }` and corrects spec
decision 5's sentence. The first keeps one contract for both inputs.

**I2. D-97 drops, for a tab that has already stopped saving, the update sentence that Settlements
row 6 keeps above the forms** (`foundations/decisions.md:1762`, commit `fb1ef9d`).
Row 6 (`task.md:295`): "gdy odrzuci zapis karty ze starszym kodem gry, wylogowanie też idzie
dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami
konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”". D-97 writes: "…and
then ends only this browser's server-side session; a tab that stopped saving after the refusal of
D-187 ends it without saving. … when it refuses it as of a lower version (D-187), logout goes on and
the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them". The
sentence is tied to "when it refuses it" — the save at logout — and a tab that stopped saving makes
no save, so D-97 gives that tab no sentence. That tab is the usual case (the outdated answer came
during play, D-187), and the sentence is what question 17 chose way C for: without it the player
signs in in the same tab and meets the false alarm „Zapis pochodził z innej wersji gry…”
(`task.md:145-147`). Spec decision 8 (`spec.md:340-341`) says it right; the decision, the lasting
binding text, does not. Grade: the entry restates its row more narrowly, without the row's
qualification (WAY-263). Fix: through `the-way-record-decision`, e.g. "a tab that stopped saving
after the refusal of D-187 ends it without saving, and the account forms then show „Gra została
zaktualizowana. Odśwież stronę.” in `warning` above them". The other rows 1–10 and the projected
entries I compared (list under Checks) say what their sources say.

**I3. The tests never load a map run whose activity is a wait or a `walkTo`/`walkToCampfire` move,
so a load that refuses the commonest running states passes the suite**
(`tests/sim/saved-game.test.mjs`; code `src/browser/sim/saved-game.ts:283-287`, `:461-465`, `:496`).
StrykerJS on `saved-game.ts` (guidelines/testing.md § Mutation testing) leaves these survived or
uncovered: the whole `wait` branch of `ACTIVITIES` (`:462-464`, NoCoverage — `return {}`, `fields(value, [])`
and the emptied block all live), `MOVES.walkTo: false` and `MOVES.walkToCampfire: false` (`:285-286`,
survived — each makes every in-progress `walkTo`/`walkToCampfire` with its `stepTo` refused), and
`doing.kind === "rule"` → `true` (`:496`). A wait is what every character does under the empty
„Program” of a new game (D-91) and whenever no rule applies; walking to a resource or a campfire is
in nearly every program. A regression in either path refuses the save of a running map run as
damaged, the new game is saved over it (spec decision 7), and the suite stays green. The written
document holds a gather, the moving case a wander, and "a game state the simulation made loads
back" uses only the FIGHTING program, which always picks a rule. Today's code is right for them
(scratch fuzz below: 0 refusals in about 590 000 real states, waits and walks included); the gap is
the test's. Fix: add to the loads-back case a state sent with the empty program (a wait in
progress) and one walking with `walkTo` (and `walkToCampfire`), or written-out variants of the
document. testing.md: "Autor dodaje asercję tylko dla rzeczywistej luki w wymaganym zachowaniu" —
this is one.

### Minor

**M1. Several crafted cases are refused by a check other than the one their name aims at, so
removing the aimed check leaves the test green** (`tests/sim/saved-game.test.mjs:699-704`, `:741-742`;
code `saved-game.ts:376`, `:393`, `:421-426`). Survived mutants: `id >= nextProgramId` → `false` and
`>` (`:376`) — "a program's number reaching the next one" is refused by the pick `{2: 3}` instead;
`ids.add(id)` removed in `team` (`:393`) — "two characters of one number" is refused because
character 2 of the pick leaves the team; `refuse()` of the tile-place check removed (`:426`) —
"a tile at other coordinates than its place" is refused because the character's tile disappears.
The first two are on decision 5's floor ("identities below their next counters and unique"). The
executor's own-work check says each case was refused "by the check aimed at it"; that is true of
the first check that fires, not of what protects the rule. Fix: make each such case free of the
second fault (no pick or used-last record naming the program, a duplicate character not in any
record, a moved tile that is not the character's). Also untested, all beyond the floor (maker's
own stricter checks, so not blocking): activity start after the minute / end not after start
(`:494`), a move without `stepTo` or a non-move with one (`:497`), attack minutes (`:506`),
completion minute (`:601`), death and completion together (`:706`), a run going on with neither
activity nor combat (`:708`), streak or cooldown above the minute (`:713`), counts present without
their program or missing beside it (`:787`), carried real time without a run (`:807`), the lower
bounds of `finite` (`:148`, negative health or satiety), the 32-bit boundary (`:173`, `>=`
survives), non-canonical identity keys such as `"01"` (`:180`), untrimmed names (`:206`), and a
non-string `archetypeId` classified `shape` rather than `archetype` (`:859`). Each is the maker's
choice; pin those the guideline will name as rules of the kind (Slice 7), leave the rest.

**M2. The "argument left unchanged" check on a refused document cannot fail**
(`tests/sim/saved-game.test.mjs:479-482`). The refused document is deep-frozen before the load, so
no write can change it, and any write attempt would throw inside the load's `try` and be reported
as the very `shape` the case expects. The happy-path frozen check above it does prove something
(a write would turn `ok` false); the refused-path one does not. Fix: compare an unfrozen refused
document with its copy after the load, as the happy path's second half does.

**M3. The version constant's comment names less than what makes a saved game of the same version
fail to load** (`saved-game.ts:53-56`). It says to raise the version with a change of `GameState`
or a type it reaches and of the items of the data. The load also checks, against the data, the
paces, each map's width and height (tile count), the identifiers, and the nature-energy cap
(executor's choice 4); changing one of those refuses saves of the same version as damaged, with
the „Zapis był uszkodzony…” sentence. Spec decision 2 accepts that for identifiers; the comment, the
first thing the next maker reads, should say it, and Slice 7's guideline should carry it.

## Verified claims of the executor's report (no finding)

- Choice 1 (picks, programs used last and the last entered program may name a deleted program):
  right against the code. `deleteProgram` (`src/browser/sim/programs.ts:430-455`) leaves those
  records, and D-165 says they find no program; the spec's "naming listed programs"
  (`spec.md:207-208`) would refuse real saves. Worth correcting the spec's sentence when the
  orchestrator next touches it.
- Choice 2 (two written documents): `startRun` sets `countsProgram: null` (`game.ts:140`), so one
  document cannot hold counts beside a list program and a run. Right.
- "Never throws", "changes nothing passed to it", the order of the reasons, `__proto__` as an own
  key, deep nesting, non-finite, unsafe and huge numbers, off-list values, absent identifiers,
  broken references and wrong tile counts: each refused whole in the tests and in my probes;
  revoked and throwing proxies give `shape`.
- "A change of the type fails the type check": not repeated; `npm run typecheck` 0 on the head.
- A running map run comes back paused at its minute, pace and carry; an ended one unchanged; no
  time argument exists (`saved-game.ts:826-827`, tests `:429-460`).

## Declined to judge

- The new invariants `player-save-isolation`, `expired-session-unsaved-progress`,
  `account-save-sqlite-store`, `saved-state-http-exchange` written `Method: test` before their tests
  (foundation report, choice 1) — their tests belong to Slices 2–6; the whole-change review checks
  each is written.
- The changed invariants `account-session-authorization`, `account-mutation-request-guards`,
  `account-schema-lifecycle`, `account-database-schema` and `blocked-account-access` now name save
  routes and saved game states that Slices 2–3 make true — outside Slice 1.
- `guidelines/testing.md` § Trust boundaries has no row for `src/browser/sim/saved-game.ts` yet —
  Slice 8 by the plan.
- The kind `saved-game`'s guideline, its index row and the `simulation-module` boundary — Slice 7.
- Crafted states the load admits that the game never makes but the simulation runs on without
  throwing (a combat on Las, an activity ending at minute 10^15, a `lastCombat` without a result
  and no combat going on, a backpack beyond its capacity) — beyond decision 5's floor ("may refuse
  more, never less"); probes show `advanceMinutes` runs on them.

## Checks

| Command / method | Exit / result |
|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (12 tests) |
| `npm test -- tests/sim/purity.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `npm run typecheck` | 0 |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts"` in a detached worktree of `b4c3687` (scratchpad, `node_modules` linked, removed after) | 0; 707 mutants: 604 killed, 86 survived, 17 no coverage, score 85.43 %. Classified: real gaps I3 (wait branch, `MOVES` walk entries, `:496`) and M1 (`:376`, `:393`, `:426`); beyond-floor checks without a case, M1 list; equivalent — the closed-list records' `true` values (`:256-287`, `Object.hasOwn` reads keys), `typeof` guards before `Number.isFinite`/`isSafeInteger`/`trim`/`Object.hasOwn` (`:148`, `:155`, `:137`, `:189`, `:839`), the error message (`:83`), the action wrapper's group name (`:243`), `toLowerCase`→`toUpperCase` (`:375`), `catch {}` returning `undefined` (`:863`), `plainObject`/`own`/`list`/`fields`/`matches` sub-conditions whose fault is refused by the next statement or a throw the load catches (`:88-98`, `:109`, `:118`, `:212-216`), symbol keys (`:131`, JSON makes none); behaviour not worth pinning — null-prototype objects refused (`:91`), within-tolerance program numbers (`:212` block). Report: scratchpad `mutation-saved-game.json` |
| Scratch fuzz: random games (both Understandings, every player act of `game.ts`/`programs.ts`, random programs, pace, pause, real time), `loadSavedGame(savedGame(state))` after each step, compared deep-equal with the state (paused where the run goes on) | 2 × ~100 000 states, 0 refusals, 0 differences; covered deleted copies, carry, moves, counts beside a program, discoveries, cold deaths |
| Scratch long runs: survival and fighting programs on Las and Las — głębiej, many seeds, every game minute to the end | ~108 000 + ~381 000 states, 0 refusals; covered attacks, combat results, deaths of cold, hunger and in combat, campfires, burning items. No natural completion reached in 400 seeds; completion is covered only by the test's written documents |
| Scratch probe of crafted inputs (`probe.mjs`) | the `save` object with `revision` → `shape` (I1); proxies → `shape`; admitted oddities listed under Declined to judge |
| Foundation entries against the task: rows 1–10 of *Settlements to record* and the projected entries of *Decisions in play* read against D-04, D-07, D-53, D-96, D-97, D-104, D-109, D-112, D-156, D-179–D-190, the five new invariants, the changed invariants, both facts and the part map | agree except I2 |

Scratch files: `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\fuzz\` (`fuzz.mjs`, `fuzz2.mjs`, `long.mjs`, `long2.mjs`, `probe.mjs`) and `…\scratchpad\survivors.txt`. Not run: the whole gate (`npm test` with no argument), as the handoff gives.

## Reaches beyond the dispatch

- `plan.md:7-56` (Foundation entries table) and `plan.md:295-310`, `:400-429` (Slices 4 and 6) — what
  the client hands to the load and how the page calls it (I1).
- `spec.md:79-500` (decisions 1, 3, 6–8, Foundation entries, Left to maker) — the `save` object's
  shape (I1), D-97's source (I2), and the foundation entries as the spec gives them.
- `task.md` whole — *Settlements to record*, *Decisions in play* and questions 1–23, to judge the
  foundation entries as the handoff asks.
- `foundations/part_map.md:28-58` — the simulation entry whole; `guidelines/testing.md` whole
  (named) for § Mutation testing, the command used.
- `src/browser/sim/data/maps.ts`, `data/balance.ts`, `run.ts:60-220`, `tests/sim/acceptance.test.mjs:1-120`,
  `tests/sim/completion.test.mjs` (grep) — to build the scratch runs.

## Searches not found or unclear

- Unclear: whether Slice 6 is meant to strip `revision` before the load; neither the spec nor the
  plan says so, and spec decision 5 says the opposite (I1).
- Not found: a natural completion in 400 seeds of Las with the acceptance program; the completion
  branch is checked only through written documents.
