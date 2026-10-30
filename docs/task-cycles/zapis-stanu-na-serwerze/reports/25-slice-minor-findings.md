# Minor and out-of-scope findings of the slice reviews, copied word for word

### Slice 1 review (`reports/08-slice1-review-report.md`), Minor

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

### Slice 2 review (`reports/13-slice2-review-report.md`), Minor

### Minor

**M1 — The table's own constraints on version and revision (STRICT, `CHECK (version >= 1)`,
`CHECK (revision >= 1)`) have no test.** `src/server/database.ts:101-107`.
The plan's goal and spec decision 4 ask for "one strict table … the version of the shape (integer
from 1), the revision (integer from 1)". The code has them, as I read it and as a scratch run shows
(`typeof(version)` integer, raw text past the limit refused). But two mutations of mine survive
`npm test -- tests/account-storage.test.mjs` (exit 0): R4, `) STRICT;` dropped from step 4, and R5,
both `CHECK (… >= 1)` dropped. Only the byte limit is tested against a write that skips the operation
(raw INSERT and UPDATE in "the stored game text holds at most 65 536 bytes …"). Today the effect is
nil, because `writeSavedGame` refuses a non-integer, unsafe or below-range version and basis before
SQL (tested, and in my crafted-input run). Where it matters: step 4 can never be edited once H1
deploys it (D-112). So if someone edits it before then and the constraints go, the database would
keep only the operation's limits and not its own, and no test would notice. One raw INSERT with
version 0 or `'1'` (text), asserted refused, would pin both. Not blocking: the deployed step is the
one in this commit, and it is correct.

**M2 — No permanent test shows that step 4 leaves every other table and column alone.**
`tests/account-storage.test.mjs:581-653` ("a version-3 database opens as version 4 …").
The spec says "No other table or column changes". The move case compares rows through named column
lists, so an extra statement in step 4 survives. My mutation R11 added
`ALTER TABLE accounts ADD COLUMN extra INTEGER;` to step 4, and the file still passes (exit 0).
Deleting or rewriting values is caught: R12 deleted sessions and R13 cleared confirmations, and both
fail the move cases. My own scratch check (below) shows the step as committed meets the
requirement: every `sqlite_schema` object other than `saved_games` and every row of a version-3
database created by `main`'s real code is byte-identical after the move. So it holds today. What is
missing is a guard against a later edit before H1. Comparing `sqlite_schema` (minus `saved_games`)
before and after the move in the version-3 case would pin it.

### Slice 2 review, out of scope (its § Declined to judge)

## Declined to judge

- `.claude/skills/loop2-deploy/` (and its `.agents/` copy) still say the deployment moves the
  database to version 3 — Slice 9's work by the dispatch; outside this slice's files. Out of scope.
- Measuring the stored text before the write and answering 413 `save-too-large` — Slice 3's route.
  Here a text over the limit throws on the CHECK, which plan Slice 3 accepts as the last guard. Out
  of scope.
- A player crafting `version: 9007199254740991` stores it, after which their own browser's saves
  read as outdated. This is spec decision 1's contract (a positive safe integer); it touches only
  the player's own save (D-07 accepts players forging their own progress) and belongs to the route
  and spec, not this slice. Out of scope.
- The one-off failure of "set and touch refuse unusable cookie input without changing stored
  sessions" (subtest "invalid domain") under the executor's mutation M5 — that case is outside this
  slice's change. It did not recur in my 11 runs of the file (one clean, ten mutated; none listed
  that case among failures). Cause not established. Out of scope.

### Slice 3 review (`reports/15-slice3-review-report.md`), Minor

### Minor

1. **`src/server/account-routes.ts:353-357` — the PUT's own block check before the size check is
   not held by any test.** Spec decision 1 orders "a valid session of a non-blocked account, else 401"
   before "the stored text ... else 413". Mutation M2 (the PUT's `sessionAccount` replaced by a lookup
   that ignores `blocked`) passes all of `tests/http.test.mjs`, because the write transaction's block
   check answers 401 for every body the tests send. The difference shows only for a blocked account
   whose session row survived the block *and* whose game is over 65 536 bytes or too deep to
   serialize (413 / 400 instead of 401). `blockAccount` deletes the sessions in the same transaction
   (D-137), so this needs an artificial row such as the test's "a row past the block"; nothing is
   stored either way. Effect on a user: none today. Adding the oversized body to the "a row past the
   block" case would pin the order. Not blocking.

2. **`src/server/account-routes.ts:335-341` — GET embeds the stored text as it is; validity of the
   answer rests on the one writer.** Judged as the handoff asked: today the answer is always valid JSON
   and can carry nothing the stored text was not. The only writer of `saved_games.game` is this
   route, which stores `JSON.stringify` of a parsed non-null, non-array object — always a JSON object
   text, with lone surrogates escaped (checked: `JSON.stringify(JSON.parse('"\\ud800"'))` gives the
   escape), so `{"save":{...,"game":<text>}}` is a single well-formed object; `version` and
   `revision` are checked safe integers in `readSavedGame` (`src/server/database.ts:501-517`). The
   cost: `writeSavedGame` (`src/server/database.ts:528-536`) accepts any string and the schema
   (`src/server/database.ts:101-107`) has no `json_valid(game)` check, so a later caller writing a
   non-JSON or non-object text would make GET return invalid JSON or inject sibling keys
   (`{}},"x":{` closes `save` early). Mutation M14 (game returned as a string) is caught by four
   tests, so a broken embedding is visible. A guard would lie in Slice 2's file, outside this range.
   Not blocking.

3. **`src/server/app.ts:69-87` with `src/server/transport.ts:86-92` — two shapes of 413 on the save
   route.** A body over 65 536 bytes gets the app error handler's `{ "error": "Invalid request body" }`
   with no `code`; a stored text over 65 536 bytes gets `{ "code": "save-too-large", ... }`. The
   spec's client outcome reads "too large (the server's 413 ...)" (`spec.md:268`), i.e. by status, and
   spec decision 3 keeps "the server's own 413 ... for a body that reaches it over the limit", so this
   matches the spec; it only means Slice 4's client must not require `code` on a 413. The executor
   reports it openly. Not blocking.

### Slice 9 review (`reports/22-slice9-review-report.md`), Minor

## Minor

- m-1 — `setup_and_secrets.md:307` uses "H1" and `:334` uses "(H2)" for this task's two deployments. The same file's `:35-48` already uses H1–H5 for the tunnel transition, where H1 is creating the Cloudflare tunnel and H2 is the token. The new rule defines its H1 inline ("the first deployment of its branch (H1)"), so it can be read correctly, but an agent searching the file for "H1"/"H2" will find two meanings. The labels come from the plan's wording.
- m-2 — `troubleshooting.md:114` "keeping every account, session and saved game state" leaves out the emailed links that D-112 also keeps. This passage restates D-112 and is narrower than it.
- m-3 — `SKILL.md:177-178` "The first deployment of the commit with saved game states moves it on to version 4." sits in § "Account mail" under the bullet about the address-confirmation delivery (H4), where it has nothing to do with mail. It is harmless where it is, but it belongs in § Rollback (which already carries it, `:230-236`) or in the database bullet of I-2.

### Slice 9 fix review (`reports/24-slice9-fix-review-report.md`), Minor

### Minor

- m-1 — `setup_and_secrets.md:334-338` "the game has no save button" and "edit and keep a program": the program panel does have buttons labelled „Zapisz”, „Zapisz w programie” and „Zapisz jako nowy program” (`src/browser/view/program-panel.ts:228-229, 244`). They save a program's name or the run's copy of a program, not the game state, and „Zapisz w programie” appears only during a map run. A reader may take "keep" to mean one of them. The step still works, because every edit is saved automatically (`game-view.ts:113-116`). "No button that saves the game state" plus naming „Załóż” as the example would be clearer.
- m-2 — `setup_and_secrets.md:338` "an empty team means the save was lost" is true only when the recognisable change was a character. If the human chose the other example (a program edit), the team is empty after the reload even when the save came back. The result would be a false alarm, not a false pass, and the preceding "check that exact change is back" is the actual test. Making the sentence conditional ("when the change was a character") or dropping the program example would remove it.
