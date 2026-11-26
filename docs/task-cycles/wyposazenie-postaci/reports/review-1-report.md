PASS 5639c225f75f50e971987f3778f98a19d9a547d0

# Review 1 — Slice 1 (gear in the game state and its saved document) and the foundation entries

- Range: `f2263d05..5639c225` (5 commits: `97cadd77`, `5360248e`, `45fa435c`, `f91fa619`, `5639c225`).
  `git rev-parse HEAD` = `5639c225f75f50e971987f3778f98a19d9a547d0`, the head given.
- Variant: a planned slice, with a trust boundary (`src/browser/sim/saved-game.ts`); no operation
  that cannot be undone.
- Blocking findings: 0. Minor findings: 5. Findings outside the task's scope: 0.

## Blocking findings

none

## Minor findings

### M1 — D-441 still reads as the whole list of what a stored judging holds and when it stands; D-463 extends both from outside

- Place: `foundations/decisions.md:12642` and `:12644` (D-441, unchanged), against
  `foundations/decisions.md` D-463 (section „Gear of a character”, its two paragraphs).
- What: D-441 says the value holds „the kind of each of the twelve results, the equipment …, and the
  content revision … and the generation number …”, plus a fingerprint, and that a judging stands
  „only while its character is on the team at its generation number and its program is on the
  player's list at its content revision”; its opening paragraph lists what the opening removes. D-463
  adds a field (the count of gear changes), a further „only while” condition, a rise of the stored
  form's version and one more removal at the opening. D-441 names none of it and has no relation to
  D-463 (the relation runs only from D-463 to D-441).
- Why it matters: the agent of Slice 10, or anyone who later changes the judging cache from D-441,
  reads an enumeration that looks complete and is not. The conditions are conjunctive, so nothing
  contradicts, which is why this is Minor; the handoff gives the reason (D-441's binding sentences
  stand at the word limit). A reader is safe only if the reading of D-441 pulls in the entries that
  derive from it.
- Evidence: the two passages quoted above; the plan's F32 row (`plan.md:47`) planned this as a change
  of D-441.

### M2 — D-463's *Rejected* says „unknown” while the source names a rejected way

- Place: `foundations/decisions.md`, D-463, `*Rejected:* unknown.`
- What: the plan's *Choices* row for F32 (`plan.md:620`) names the rejected way and its cost: „The
  page removing the character's stored judgings at the act — another device or browser keeps a
  badge that lies, which D-441's reading against the game state was made to prevent.” D-463's own
  *violates* line names the same way. The template admits `unknown` (`.the-way/elements/decisions/template.md:49`),
  but here the alternative is known and recorded in the source.
- Why it matters: a later reader of D-463 is told that no alternative was weighed. The content
  agrees with the code, and the rationale carries the reason, so this is Minor (WAY-364).

### M3 — D-456 says „The data of each item name the place it fits”

- Place: `foundations/decisions.md`, D-456, second sentence; quoted as written in
  `tests/sim/data.test.mjs:473`, `tests/sim/saved-game.test.mjs` (the crafted-document test) and
  `tests/sim/gear-state.test.mjs:71`.
- What: read strictly, every item's data names a place. The code makes the field optional
  (`fits?: GearPlace`, `src/browser/sim/data/items.ts:49`): berries, moss and flax name none and fit
  no slot, as the task's *To do* 1 wants („Dane gry mówią przy przedmiocie, do którego miejsca
  pasuje”). A wording such as „The data of an item that a slot can hold name the one place it fits”
  says what the code does.
- Why it matters: small; a reader could expect every item row to carry a place. Minor.

### M4 — The content-data guidelines do not list the new data file

- Place: `guidelines/coding-content-data.md:13-28` (table „Files of this kind”); new file
  `src/browser/sim/data/gear.ts`.
- What: every other file of `src/browser/sim/data/` stands in the table with a status; `gear.ts`
  does not. No check failed for it (`foundation_check.py` reports only the 13 known citation
  errors).
- Why it matters: an agent choosing a file to copy does not know whether `gear.ts` is a copy or a
  do-not-copy. A guideline is changed only through the guidelines skill, so this is for the cycle's
  guideline step, not the slice. Minor.

### M5 — The saved-game guidelines name only the items and the ordinary actions as data whose change raises the version

- Place: `guidelines/coding-saved-game.md:100-102` (rule „Wersja podnoszona razem z kształtem”).
- What: the slice made the keys of `Gear` follow the data's slots (`GEAR_SLOTS`, built from
  `POCKETS`), so a change of the number of pockets changes the shape of the saved document as a new
  item changes `Backpack`. The code's comment above `SAVED_GAME_VERSION`
  (`src/browser/sim/saved-game.ts:79-85`) says so; the guideline, which the reviewer of a later change
  reads, does not. The data the load checks against (`:115-126`) do not name the item's place either.
- Why it matters: a later change of `POCKETS` that follows the guideline alone would leave the
  version standing and refuse every saved game of the current version as `shape`. Minor, for the
  cycle's guideline step.

## Declined to judge

- An earning loop, the judging and the balance instrument starting their map runs with the empty
  gear rather than the character's (D-452, D-439, *To do* 13) — the plan gives this to Slices 3 and 21,
  and no game state the game can make holds gear yet (no act puts any on before Slice 2).
- The gear of a map run not returned to the character at „Restart”, „Zakończ”, a completion or a death
  (D-183, D-190, D-460) — Slice 3; nothing in this slice changes a map run's gear.
- The marks of changed slots not cleared when an earning loop stops — nothing sets them before Slice 2.
- The type `` `pocket${number}` `` admitting `pocket7` at compile time — the executor names it as the
  cost of its choice; the data and the load admit only the data's pockets, so no behaviour follows.

## Against the task, the plan's slice and the foundation

- The Goal's points are met: the eight slots in order, each of one place, the three pockets of
  „Kieszeń”, `POCKETS` one number, the words „w ręku” and „pod ręką” at the places
  (`src/browser/sim/data/gear.ts`); `fits` on the stick (`mainHand`) and the bandage (`pocket`), row 17;
  `Gear`, `Character.gear`/`changedSlots`/`gearChanges`, `RunCharacter.gear` (`types.ts`); a new
  character's empty gear, no mark, count 0 (`createCharacter`); `startRun` passing the team
  character's gear to `newMapRun` outside `takeTrip` and the chest; `newMapRun`'s trailing `gear`
  parameter defaulting to the empty gear and copied; the strict reading and `SAVED_GAME_VERSION` 11.
- The backpack's cap, „Zapas poniżej” and the actions that take from the backpack read
  `character.backpack` alone; the slice changes none of them, and `gear-state.test.mjs` holds the cap,
  „Zapas poniżej”, „Zasil — ognisko” and „Zapal — patyk” against the hand's stick (D-455).
- `game.ts` gains calls only; the gear's functions stand in `character.ts` (`gearSlots`, `newGear`,
  `fitsSlot`), as the slice says. The size test passes.
- Foundation entries, against the plan's table (`plan.md:14-49`) and the rows of *Settlements to
  record* (`task_frozen.md:258-288`): every row marked decision or sentence has its entry — D-451
  (the projected entry, word for word with `task_frozen.md:250`), the glossary term `gear` (with
  `task_frozen.md:251`), D-452 (row 1), D-190 (rows 2, 27), D-453 (row 3), D-187 (row 4), D-439 (row 5),
  D-440 (row 6), D-311 (row 7), D-454 (row 8), D-455 (row 10), D-456 (row 16), D-457 (row 18), D-458
  (row 19), D-140 (row 20), D-459 (row 21), D-143 (row 22), D-290 (row 23), D-380 (row 24), D-183
  (row 26), D-460 (row 28), D-445 (row 29), D-446 (row 30), D-461 (row 31), D-462 (row 33), D-287
  (row 34), and D-23, D-44, D-144, D-145, D-309 for F3, F20, F4, F5, F8; F32 as D-463, F33 as the fact
  `game-icons-gloves-title`, F34 as the *Rests on* of `icon-credits`. Rows 9 and 32 (styleguide) and
  17 and 25 (data) have no entry, as the plan says. I found no entry that departs from its row beyond
  M1 to M3.
- The code of the slice agrees with the entries it rests on (F2, F9, F21, F24, F25, F32) for what this
  slice builds.
- No reserved choice is taken.
- No invariant test changed. The invariant `icon-credits` changed (*Rests on* gains
  `game-icons-gloves-title`); its test is unchanged.

## Trust boundary — `src/browser/sim/saved-game.ts`

- The reading uses the file's strict helpers: `fields` (exact own keys, `__proto__` counted,
  accessors refused), `oneOf` (`Object.hasOwn` on the data), `uniqueOf` over `GEAR_SLOTS`, `count`
  (safe integer from 0), `fitsSlot` after the item is read. The cross-check of marks against earning
  loops stands after the loops are read (`saved-game.ts:1385-1392`). Every refusal goes through
  `refuse()`, so it is whole and `loadSavedGame` turns it into `{ ok: false, reason: "shape" }`.
- The tests craft, in each of the three places of a gear: a piece in a slot it does not fit, items the
  data lack (also `toString`), values of other types, a slot missing or one more, `pocket0`, a slot
  named by its place, an own `__proto__`; a gear of another type; each new key missing; a map run's
  character holding the character's keys; marks at a character with no earning loop, twice, of
  another kind; counts negative, fractional, text, `null`, `NaN`, `Infinity`, 2^53. The no-throw sweep
  covers the new fields.
- My probe adds what the tests do not hold, all refused as `shape` with no throw, and the sound bases
  loading: a mark `__proto__` and `constructor`, a slot as a getter, a symbol key on the gear, a gear as
  a `Map`, `undefined` in a slot, `hasOwnProperty` as an item, a stick in a pocket of a map run's gear,
  a count as a `BigInt` and as -1e-9, a list of marks with a hole, a map run's character without its
  gear; a gear of null prototype with sound slots loads, as other plain objects of that kind do.
  Probe and output: `docs/task-cycles/wyposazenie-postaci/reports/review-1-probe/probe.mjs` and
  `probe-output.txt` (run from a directory two levels under the worktree's root, after the build of
  `npm test`, with `node <dir>/probe.mjs`).
- `src/browser/view/judging-cache.ts` and `assets/icons/**` are not touched by the range.

## Tests

- The new and changed tests fail when their behaviour breaks: StrykerJS on the slice's lines killed
  42 of 42 mutants (none survived, none uncovered). The executor reports the tests seen failing first.
- Changed existing tests have their cause in the requirement: `team.test.mjs` (the created
  character's new fields), `data.test.mjs` (`fits` on two rows; the D-144 quotation brought to its
  new text, which lowers the known citation errors from 14 to 13), `previous-programs.test.mjs` (the
  version raise; D-401 reads up to the current version), and in `saved-game.test.mjs` the version-10
  document kept and refused as `version`, the marks dropped from copies of a looping character pushed
  as a character with no loop (otherwise those tests would be refused for the mark, not for what they
  test). The precondition `SAVED_GAME_VERSION === DOCUMENT_V9.version + 1` moved to the version-10
  test, where it holds.
- Two gear-state tests (the cap, „Zapas poniżej”) pass on the base code; they guard D-455 against a
  later change, as the executor says. No code made only for a test's input was found.

## Author's own-work check and walk

- The requirement it names as weakest (marks only at a character with an earning loop, checked across
  the team and the loops) is where the reading is most likely wrong, and its crafted cases would catch
  a team-only check; Stryker confirms the check's mutants die.
- No walk through the running product: nothing the player sees changes, but for D-206's existing path
  for an older save; I agree.

## Checks run

| Command | Exit code |
|---|---|
| `npm test -- tests/sim/gear-state.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/team.test.mjs` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — 13 errors, all the known `decision:` quotations of D-144, D-145, D-445, D-446 in `combat`, `encounters`, `rule-signs`, `skills` and `character-screen` tests; no other error |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/character.ts:28-46,src/browser/sim/saved-game.ts:568-574,src/browser/sim/saved-game.ts:626-645,src/browser/sim/saved-game.ts:1385-1392,src/browser/sim/game.ts:340-355,src/browser/sim/game.ts:486-491,src/browser/sim/run.ts:400-418"` | 0 — 42 killed, 0 survived |
| `node <dir>/probe.mjs` (the probe above) | 0 — 15 cases, 0 failures |
| Manual: the page https://game-icons.net/1x1/delapouite/gloves.html read today | heading „Gloves icon”, author Delapouite, CC BY 3.0 — agrees with `game-icons-gloves-title` |

Not run: the full `npm test` and `python -B .the-way/instruction-files/check_instructions.py` — the
cycle's own run before the request; no instruction file changed in the range.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-380 first paragraph (`:8369`), D-441 (`:12640-12664`), D-241
  (`:9015-9025`): to judge the changed D-380 against its unchanged sentence, D-463 against D-441, and
  the plan's choice to keep the marks at the character against D-241.
- `foundations/invariants.md` `save-version` (`:1048-1056`): the invariant of the boundary.
- `.the-way/task-cycle/remarks_check.py` (its header): the headings the report needs.
- `.the-way/elements/decisions/template.md:49` (by search): whether `unknown` is an admitted *Rejected*.
- `tests/sim/saved-game.test.mjs:4080-4180`: the round-trip test of game-made states (D-386).
- `src/browser/sim/saved-game.ts:100-240, 986-1025, 1110-1427`: the helpers and the callers of the new
  reading.
- `balance/engine.mjs` and `src/` by search for every place a team character is built.
- `the user's rule file on scripts`: before writing the probe.

## Working copies

- `.runs/review-1/` held the word diff of
  the decisions, the diff of the saved-game test, the check logs, the Stryker output and the probe; it
  was removed with `rm -rf` on its full path. The probe and its output are kept in
  `reports/review-1-probe/`. No worktree or clone was made. The checks ran in the reviewed worktree,
  writing only the product's own ignored outputs (`dist/`, `.stryker-tmp/`, which Stryker removed, and
  `.runs/stryker/`); `git status --short` stayed empty.

## Unread material

- `docs/task-cycles/wyposazenie-postaci/plan.md`: read lines 1-60 and 610-629; the other slices not
  read (only the *Foundation entries* table and *Choices* were needed beyond Slice 1).
- `tests/sim/saved-game.test.mjs`: read the diff of the range whole and lines 4080-4180; the rest of
  the file not read whole.
- `foundations/decisions.md`: read every changed and new entry in the diff of the range; the unchanged
  parts of the changed entries only as the diff showed them (D-140, D-183, D-187, D-190, D-439, D-440,
  D-445, D-446 read through the diff's context lines, not each whole in the file). The entries the
  handoff names for the executor's reading (D-64, D-179, D-206, D-213, D-386, D-425) and the invariants
  `trip-transfer`, `simulation-inputs`, `simulation-isolation`, `character-team`, the glossary entries
  „map run” and „earning loop” and `foundations/part_map.md:34-65` not opened.
- The foundation agents' reports (`foundation-A/B/C-report.md`) and the executor's handoff not read.
- `src/browser/sim/loop.ts:63-100`, `src/browser/sim/judging.ts:53-110`, `src/browser/sim/data/balance.ts`
  not read (their calls of `newMapRun` are unchanged and positional, which the passing tests and the
  diff show).

## Searches not found or unclear

none
