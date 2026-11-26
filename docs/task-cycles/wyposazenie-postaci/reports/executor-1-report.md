**Status:** done with concerns

# Executor 1 — Slice 1: Gear in the game state and its saved document

The concern: to keep the slice's own checks green I had to change three test files that are not in
the slice's *Change* list (`tests/sim/team.test.mjs`, `tests/sim/data.test.mjs`,
`tests/sim/previous-programs.test.mjs`). The section "Files outside the slice's Change" says why each
one was needed. The edit to `tests/sim/data.test.mjs` also brings the quotation of D-144 at its line 229
up to date, as the handoff asks for any test file a slice touches. That brings the foundation check
from 14 errors down to 13, so part of the work Slices 4, 4b and 18 announced is already done.

## Commits

- `5639c225` feat: :sparkles: hold the gear of a character in the game state and its saved document:
  the eight slots of the data with their places, the place each item fits, the gear a new character
  starts empty with, the slots the player changed and the count of the player's gear changes, the
  gear a manual map run takes whole from its character whatever the map's entry cap, and the strict
  reading of all of it in the saved game state of version 11. Range: `f91fa619..5639c225`.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/data/gear.ts` (new) | 49 | 0 |
| `src/browser/sim/data/items.ts` | 5 | 0 |
| `src/browser/sim/types.ts` | 30 | 2 |
| `src/browser/sim/character.ts` | 22 | 1 |
| `src/browser/sim/game.ts` | 14 | 8 |
| `src/browser/sim/run.ts` | 6 | 1 |
| `src/browser/sim/saved-game.ts` | 48 | 5 |
| `stryker.config.json` | 1 | 0 |
| `tests/sim/gear-state.test.mjs` (new) | 277 | 0 |
| `tests/sim/saved-game.test.mjs` | 326 | 40 |
| `tests/sim/team.test.mjs` (outside *Change*) | 20 | 0 |
| `tests/sim/data.test.mjs` (outside *Change*) | 4 | 1 |
| `tests/sim/previous-programs.test.mjs` (outside *Change*) | 13 | 4 |

## What the slice makes

- `src/browser/sim/data/gear.ts` holds three things:
  - `GEAR_PLACES`: the six places with their names („Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”,
    „Nogi”, „Kieszeń”). Each place also has its words in the line of gear: `line` is „w ręku” for the
    main hand and „pod ręką” for the pocket, and it is absent for the other places, since no item fits
    them and the task gives no words for them.
  - `POCKETS = 3`: the one number for the pockets.
  - `GEAR_SLOTS`: the eight slots in order (`mainHand`, `secondHand`, `head`, `torso`, `legs`,
    `pocket1`…`pocket3`), each mapped to its place. The pocket slots are built from `POCKETS`.
- `items.ts`: an item row gains an optional `fits?: GearPlace`. The stick has `fits: "mainHand"`, the
  bandage has `fits: "pocket"`, and nothing fits the other places.
- `types.ts`:
  - `Gear = Record<GearSlot, ItemId | null>`.
  - `RunCharacter.gear` holds the gear of that map run.
  - `Character` gains `gear`, `changedSlots: GearSlot[]` and `gearChanges: number`.
- `character.ts`: `gearSlots()`, `newGear()` and `fitsSlot(item, slot)` (the slot must be one of the
  data, and the item's place must equal the slot's place).
- `run.ts`: `newMapRun` takes `gear: Gear = newGear()` after the backpack and holds a copy of it. The
  earning loop (`loop.ts`), the judging (`judging.ts`) and the balance instrument (`balance/engine.mjs`)
  still start their runs with the empty gear, untouched, until Slices 3 and 21.
- `game.ts` changes only at call sites:
  - `createCharacter` sets an empty gear, `changedSlots: []` and `gearChanges: 0`.
  - `startRun` passes the team character's gear to `newMapRun`. It enters whole whatever the entry
    cap, and it does not pass through `takeTrip` or the chest.
- `saved-game.ts`:
  - `SAVED_GAME_VERSION` is now 11. The comment above it also names the gear's slots as part of the
    shape.
  - `gear()` reads strictly: exactly the slots of the data, each `null` or an item of the data that
    `fitsSlot` admits.
  - A team character reads `gear`, `changedSlots` (`uniqueOf` over `GEAR_SLOTS`) and `gearChanges`
    (`count`). A map run's character reads `gear` the same way.
  - After the earning loops are read, a non-empty `changedSlots` at a character with no earning loop is
    refused.
- The backpack's cap, „Zapas poniżej”, the line of the backpack and the actions that take from the
  backpack still read `character.backpack` alone. I changed none of them, and the new tests hold that
  behaviour.

## Checks run (command → exit code)

Tests written first, failing (against an empty stub `export const GEAR_PLACES = {}; export const GEAR_SLOTS = {};`):

- `npm test -- tests/sim/gear-state.test.mjs` → 1 (10 of 12 failed on their assertions, for example
  `undefined` against the empty gear, and `Cannot read properties of undefined (reading 'mainHand')`).
  Two tests already passed on the base code: „a stick in the main hand takes no room of the backpack's
  cap” and „Zapas poniżej … holds for a character whose only stick lies in its main hand”. The code
  already reads the backpack alone, so these two guard D-455 against a later change. I did not see them
  fail.

The `save-version` invariant tests in `tests/sim/saved-game.test.mjs`, seen failing and then passing:

- `npm test -- tests/sim/saved-game.test.mjs` with the reading written and `SAVED_GAME_VERSION`
  still 10 → 1 (31 of 49 failed). The documents of version 11 were refused as `version`, for example in
  the crafted-document test and in „the document of version 10 is refused as version”.
- `npm test -- tests/sim/saved-game.test.mjs` after raising it to 11 → 1 (1 of 49 failed: „a
  character whose number is the next character number…”. Its precondition copied a character that had
  changed slots onto a character with no earning loop. I fixed the test case, see below).
- `npm test -- tests/sim/saved-game.test.mjs` → 0.

The slice's *Checks*, final runs:

- `npm test -- tests/sim/gear-state.test.mjs` → 0
- `npm test -- tests/sim/saved-game.test.mjs` → 0
- `npm test -- tests/sim/team.test.mjs` → 0
- `npm test -- tests/sim/trip.test.mjs` → 0
- `npm test -- tests/invariants/test_simulation_inputs.py` → 0
- `npm test -- tests/quality/test_mutation_test_selection.py` → 0
- `npm test -- tests/quality/test_function_and_file_size.py` → 0
- `npm run typecheck` → 0

Tests of the code I touched, beyond the *Checks*:

- `node --test "tests/sim/*.test.mjs"` on the build → 1: 1035 tests, 2 failed. Both pass on the slice
  base (see "Failing tests and the base"):
  - `tests/sim/data.test.mjs` „the items are the four resources of Las and the bandage…”: the item rows
    gained `fits`.
  - `tests/sim/previous-programs.test.mjs` „a document of each readable version…”: precondition
    `SAVED_GAME_VERSION === 10`.
- After the fixes: `npm test -- tests/sim/data.test.mjs` → 0, `npm test -- tests/sim/previous-programs.test.mjs` → 0.
- `node --test "tests/sim/*.test.mjs"` on the build → 0 (1035 of 1035 passed).
- `node --test "tests/view/*.test.mjs" "tests/balance/*.test.mjs" "tests/*.test.mjs"` on the same
  build → 0 (2259 of 2259 passed).
- `npm test -- tests/invariants/test_content_identifiers.py` → 0,
  `npm test -- tests/invariants/test_simulation_isolation.py` → 0,
  `npm test -- tests/invariants/test_character_team.py` → 0,
  `npm test -- tests/invariants/test_program_closed_lists.py` → 0
- `npx eslint` on the 12 changed code and test files → 0; `npx prettier --check` on the 13 changed
  files → 0.
- `python -B .the-way/elements/common/foundation_check.py`, run after `git add` → 1 with 13 errors.
  All 13 are the known kind: a `decision:` line quoting an old sentence of D-144 or D-145 in
  `combat.test.mjs`, `encounters.test.mjs`, `rule-signs.test.mjs` and `skills.test.mjs`, or of D-445 or
  D-446 in `tests/view/character-screen.test.mjs`. The base had 14. None was added; the one in
  `tests/sim/data.test.mjs:229` is gone.

Not run:

- The whole gate, `npm test` with no file. Under my method that is the cycle's run, not mine.
- `python -B .the-way/instruction-files/check_instructions.py`: no instruction file was changed.
- The Python tests under `tests/quality/` other than the two in *Checks*. I ran ESLint and Prettier on
  the changed files directly instead.

## Failing tests and the base

| Test | Result after my first change | On the base `f91fa619` |
|---|---|---|
| `tests/sim/data.test.mjs` „the items are the four resources of Las and the bandage, with their words and their uses” | failed (`fits` added to the stick and bandage rows) | passes: it is the base's own test of rows without `fits`. My change caused the failure, so it was my slice's to fix. |
| `tests/sim/previous-programs.test.mjs` „a document of each readable version, the current one included…” | failed (precondition `SAVED_GAME_VERSION === 10`) | passes, since the base version is 10. My version raise caused the failure, so it was my slice's to fix. |

I did not run either on a separate copy of the base. Both failures come straight from the diff: the
expected row literal and the hard-coded version precondition. Each passes again after its fix, which
changes only what the task changes.

## Files outside the slice's *Change* (the Goal cannot be met without them)

- `tests/sim/team.test.mjs`: „a created character joins the end of the team's list…” compares the
  created characters with a full literal. The Goal makes a new character hold an empty gear, no changed
  slot and the count 0, so I added those three fields and an `EMPTY_GEAR` constant to the expectation.
  The cause is in the requirement: D-452, D-463 and the Goal's „A new character has an empty gear”.
- `tests/sim/data.test.mjs`:
  - The item rows now name `fits`: `"mainHand"` for the stick and `"pocket"` for the bandage. I added
    the line `decision: D-456 "The data of each item name the place it fits: …"`.
  - Because I touched this file, its `decision:` line at line 229 now quotes D-144 as it stands. Only
    the quotation changed, not the assertions.
- `tests/sim/previous-programs.test.mjs`: the table of documents per readable version adds a document
  of version 11. The precondition reads 11, the loop runs to 11 and the comment is adjusted. The
  reader itself (`previous-programs.ts`) is unchanged, since it reads versions „from 1 up to the game's
  current one” (D-401).

## Changes to existing tests in `tests/sim/saved-game.test.mjs` (in *Change*), with their cause

- The version-10 document becomes `DOCUMENT_V10`, kept and refused as another version in a new test,
  „the document of version 10 is refused as version, whatever its game holds”, marked `invariant:
  save-version`. Its precondition `SAVED_GAME_VERSION === DOCUMENT_V10.version + 1` moves there from
  the version-9 test.
- The new `DOCUMENT` is version 11:
  - Ala, of the manual map run, holds a stick in her main hand and a bandage in her second pocket, with
    3 changes counted. Her map run's gear also holds a bandage in the first pocket.
  - Ola, in an earning loop, holds a stick for her next map run, with `changedSlots: ["mainHand"]` and
    1 change. Her loop's map run holds the empty gear.
  - Ewa holds the empty gear and 0 changes.
- `HEADQUARTERS` is rewritten at version 11, together with the raise. Ala is in an earning loop with
  `gear` holding a bandage in her first pocket, `changedSlots: ["pocket1", "mainHand"]` and 2 changes,
  and her loop's map run still holds the stick. This is D-462's „complies” case.
- The tests „a document of another version…” and „the server's save…” now test versions 10 and 12, and
  their comments say 11.
- The two tests that push a copy of `HEADQUARTERS`' Ala as a second character now give the copy
  `changedSlots: []`, with a comment. A character with no earning loop of its own holds no changed
  slot. The cause is the slice's rule that changed slots stand „only at a character with an earning
  loop”.
- „The load changes nothing passed to it…” now also changes the passed document's gear, changed slots
  and map-run gear after the load.
- New crafted documents, each refused whole as `shape`:
  - In each of the three gear places (a character, the manual map run, an earning loop's map run): a
    piece in a slot it does not fit, an item the data lack (also `toString`, empty, in capitals, a
    number, a truth value, a list, an object), a count in a pocket, a slot missing, a fourth pocket,
    `pocket0`, a slot the data lack, a slot named by its place, an own `__proto__`.
  - A gear of another type: `null`, a list, an item text, a count record.
  - Each of the three new character keys missing.
  - A map run's character holding `changedSlots` or `gearChanges`.
  - A changed slot at the manual map run's character, or at a character whose loop stopped. A slot
    changed twice, one the data lack, one named by its place or by its name, `null` or `0`; the list as
    text, `null` or an object.
  - A count that is negative, fractional, text, `null`, `NaN`, `Infinity` or 2^53.
- The crafted test gains two `decision: D-456` lines.
- A new test, „a document at the edges of what the gear admits loads”, marked `invariant:
  save-version`: three bandages in pockets, a map-run gear that differs from its character's, all eight
  slots changed in any order, no slot changed, and counts of `MAX_SAFE_INTEGER` and 0.
- The test that no value a document can hold throws out of the load now also sweeps the new fields,
  through `DOCUMENT` and `HEADQUARTERS`.

## Own-work check

- **The requirement most likely unmet:** „the changed slots a list of slots each once and only at a
  character with an earning loop”. This is the one rule the load checks across two parts of the
  document, the team and the loops. A team-only reading would let it through, and a check placed before
  the loops are read would have nothing to compare against.
- **The check:** crafted documents with a changed slot at the manual map run's character (Ala) and at
  a character whose loop stopped (Ewa), refused as `shape`. Against them, documents where the character
  of a running loop holds changed slots (Ola, and Ala in `HEADQUARTERS`) load.
- **What it showed:** the run with the version raised exposed exactly this rule. A test whose
  precondition copied a looping character with changed slots onto a character with no loop was refused
  until the copy dropped them. That shows the rule acts, after the loops are read. The final run passed
  (`npm test -- tests/sim/saved-game.test.mjs` → 0).
- **A second requirement checked:** „whole whatever the map's entry cap, … outside the trip plan and
  the chest”. Two tests cover it: the send to Las — matecznik (`carryIn: 0`) with a take list, where
  the gear is whole, the backpack holds nothing and the chest is unchanged; and the send to Las, where
  the take list leaves the chest and the gear does not.
- **Mutations in my head:**
  - Dropping `fitsSlot` from the reading, `uniqueOf` from changed slots, the loop check, or `count`:
    caught by the crafted cases.
  - The run sharing the gear object instead of copying it: caught by „the map run holds a copy…”.
  - `startRun` not passing the gear: caught by both send tests.
  - `createCharacter` without the fields: caught by `gear-state` and `team`.
  - The `Object.hasOwn` guard in `fitsSlot` cannot be reached through today's callers: the reading
    passes only the data's slots.
  - Stryker is the reviewer's tool for this part.

## Walk through the running product

No walk was made. Nothing the player sees changes: no screen reads the gear yet, and the gear's tile,
line and pick come in Slices 15, 17 and 20, which the plan gives the checks in a real browser.

The one effect a player meets is D-206's existing path: a save of version 10 is refused as another
version, and the player starts anew. The only thing that changed there is the version number. The
refusal is covered by the `save-version` tests above, and the views that load saves passed in the view
run.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-144 statement (line 7016). Why: the handoff requires a test file I
  change to quote its `decision:` sentence as it now stands, and `tests/sim/data.test.mjs` had to change.
- `foundations/decisions.md`, D-451 to D-462 (lines 12694–12876), beyond the F-entries named. Why: to
  read the whole section „Gear of a character” for the names of the slots and the earning-loop rules
  that my reading of `changedSlots` must agree with (D-453, D-460, D-462).
- `src/browser/sim/data/maps.ts` (lines 40–189). Why: to find the map with entry cap 0 (`forestLair`,
  `carryIn: 0`) for the cap test.
- `src/browser/sim/world.ts`. Why: the campfire's minute loss, for the expected values of the
  „Zasil — ognisko” test.
- `src/browser/sim/loop.ts:1-110` and `balance/engine.mjs:120-150`. Why: to confirm that the earning
  loop and the instrument call `newMapRun` with positional arguments, so a trailing defaulted parameter
  leaves them unchanged.
- `tests/sim/team.test.mjs:1-110`, `tests/sim/data.test.mjs:215-560` and
  `tests/sim/previous-programs.test.mjs:60-280`. Why: to fix the three failures.
- `tests/sim/understanding-fixture.mjs` and `tests/sim/program-fixture.mjs`. Why: fixtures for the new
  test.
- `src/browser/AGENTS.md`, as the repository's instructions require when working in `src/browser/`.
- `.the-way/task-cycle/change/slice.md`, `.the-way/task-cycle/change/walkthrough.md` (lines 1–40,
  enough to judge that no walk applies) and `.the-way/task-cycle/remarks_check.py` (its headings), named
  by my method.

## Working copies

All my working files (test logs, diffs, a text copy of D-144's statement) stood in
`.runs/executor-1/`. I removed that
directory with `rm -rf` on its full path before returning. I made no worktree or clone. The report
needs no probe input; the commands and exit codes above are the evidence. The `dist/` build the tests
made is the product's own tool output.

## Choices, with the way rejected and the cost if wrong

- **The slot type.**
  - Chosen: `GearSlot` is a union of five literal slots and the template type `` `pocket${number}` ``,
    and `GEAR_SLOTS` builds the pockets from `POCKETS`. That way the number of pockets really is „one
    number of the data”.
  - Rejected: a closed literal union `"pocket1" | "pocket2" | "pocket3"`. Changing the number of
    pockets would then mean editing the type and the list as well.
  - Cost if wrong: the type checker accepts any `pocketN` key, for example `gear.pocket7`. The data and
    the load still admit only the data's pockets, so the risk is a later slice indexing a pocket that
    does not exist without a type error.
- **The shape of a gear.**
  - Chosen: a record keyed by slot, as the plan's *Choices* asks („maps each of the eight slots … to
    the one item it holds or none”).
  - Rejected: a list of eight positions.
  - Cost if wrong: a change of the saved shape, as with any shape change.
- **Where the words of the line live.**
  - Chosen: on the place, `GEAR_PLACES[place].line`, and only for the main hand and the pocket.
  - Rejected: inventing words for the head and the other places. Neither the task nor the plan gives
    any, and per the source discipline I leave them absent.
  - Cost if wrong: a later slice that lets an item fit another place has to add its words.
- **The item property is named `fits`.**
  - Chosen: `fits`, which follows the plan's wording, „the row … names the place it fits”.
  - Rejected: `gear: { place }` or `slot`.
  - Cost if wrong: a rename in the data, the saved-game reading and the tests.
- **Where the gear's functions live.** `gearSlots`, `newGear` and `fitsSlot` are in `character.ts`, as
  the slice says („the gear's own functions in `src/browser/sim/character.ts` or the data”). I did not
  create the plan's `src/browser/sim/gear.ts` module, which a later slice names.
- **What `startRun` reads for `restart`.**
  - Chosen: the team character's gear, both at a send and at a restart.
  - Not done: merging the map run's gear back into the character at „Restart” or at the end of a run.
    That belongs to the later slices on the end of a map run, and today nothing changes a run's gear,
    so the two are equal.
  - Cost if wrong: none until a slice lets a run change its gear. That slice has to merge before the
    restart reads the character.

## Plan and code

One small mismatch: the plan's *Choices* names a module `src/browser/sim/gear.ts` for the new logic,
while the slice's text says to keep the gear's functions in `character.ts` or the data. I followed the
slice's text.

## Unread material

- `tests/sim/saved-game.test.mjs`:
  - Read whole: lines 1–1093 (which cover the named 1–93 and 740–1093), 1093–1435, 1436–1635,
    2700–2870, 2870–2920, 3180–3260 and 3287–3916, all as they stood before my edits.
  - Not read: 1635–2700 (the middle of `CRAFTED`) and 2920–3180. I checked them with searches for hand-made
    characters, version literals and the helper names I added.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: I read lines 1–141 and 196–273, more than
  the named ranges; lines 142–195 and 274–294 I did not read.
- `guidelines/testing.md`: read whole, in two parts.
- `.the-way/task-cycle/change/walkthrough.md`: lines 1–40 read. That was enough to judge that the
  change alters no screen, so the walk does not apply; the rest is unread.

## Searches not found or unclear

none

## Problems as observed

none beyond the two test failures above, both caused by the slice and both fixed.
