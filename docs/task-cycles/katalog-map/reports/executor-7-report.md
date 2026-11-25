done with concerns

# Executor report - Slice 7 (task katalog-map): the record of the most damage in the browser's lasting storage

Branch `task/katalog-map`, base `6b3d86a8`. Nothing pushed. The full gate was not run.

## Commit

- `3e3c38a8` feat: keep in the judging cache the record of the most health a map's creature lost in one fight (D-440, D-441).
  Files: `src/browser/view/judging-cache.ts` (+186 -10 by `git diff --stat`: 196 changed lines) and the new
  `tests/view/judging-cache-record.test.mjs` (683 lines). `judging.ts`, `types.ts` and the existing test files untouched.

## What the cache offers now

- `RecordCreature = { health, strikeDamage }`: the two numbers of a creature as the data give them (a `CreatureDef` fits, so
  Slice 11 can pass `CREATURES[map.recordCreature]`).
- `cache.readRecord(mapId, creature): number | null` and `cache.offerRecord(mapId, creature, damage): void`.
- Key: `loop2-judging-record-1|<account>|<moment of the game>|<map>`, each part escaped as the judgings' parts are (`part`).
  The version stands right before the separator, so a key of another version, and any key of the judgings family
  (`loop2-judging-2|`), never matches the prefix.
- Value: JSON of exactly three fields `{"damage", "health", "strikeDamage"}`; no email address, no name.
- Reading: the value is read only where it is no longer than 1024 characters, parses to a plain object of exactly those three
  fields, `damage` a safe integer from 0, `health` from 1, `strikeDamage` from 0, and `damage` not above `health` (a fight cannot
  take more than the creature's health; a crafted value above it reads as none). It gives the number only where stored health and
  blow equal those given.
- Offering: nothing happens for a damage that is no whole number from 0 to the creature's health, or a creature whose numbers are
  no whole numbers (health from 1, blow from 0). Otherwise the record takes the number where none is read for these creature
  numbers or the read one is lower; a number equal or lower writes nothing. A record made at other creature numbers shows nothing,
  so the next offer replaces it, even a lower one.
- Opening: `tidyStorage` now lists the keys once and runs `tidyJudgings` (the former body, unchanged but for taking the list) and
  the new `tidyRecords`: records of the account under another game's moment are removed, and, after a refused save, those of this
  game too; other accounts' records, keys of other versions and judgings stay. A record holds no program or character number, so
  the content-revision / generation rules do not apply to it.
- Refusing storage: a refused write leaves the record in the page's memory; reading gives the highest of the storage's and the
  memory's number (both at the creature's numbers), so another tab's higher number is not hidden by the page's lower one; a write
  that succeeds takes the key out of the memory. Every call of the storage is behind the existing guarded helpers.
- `hasOnlyFields` takes the field list now (was bound to the judging's five fields); `readValue` passes `FIELDS`.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| New tests, before the code (red) | `npm test -- tests/view/judging-cache-record.test.mjs` (with `readRecord` returning null and `offerRecord` empty, so the file reaches its assertions) | 1 | 71 tests, 21 fail on `null` where a number or a key was expected, 50 pass (the "reads as none" cases pass on a stub that gives none; see the mutation table for the failure of those) |
| New tests, after the code | `npm test -- tests/view/judging-cache-record.test.mjs` | 0 | 70 of 70 pass (one case removed afterwards, see Mutations) |
| Existing cache tests | `npm test -- tests/view/judging-cache.test.mjs` | 0 | 107 pass |
| Cache in the page | `npm test -- tests/view/judging-cache-page.test.mjs` | 0 | 6 pass |
| Content identifiers | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 5 tests OK |
| Typecheck | `npm run --silent typecheck` | 0 | clean |
| ESLint | `npx eslint --max-warnings 0 src/browser/view/judging-cache.ts` | 0 | clean |
| ESLint (the new test file, not in the plan's checks) | `npx eslint --max-warnings 0 tests/view/judging-cache-record.test.mjs` | 0 | clean |
| Prettier | `npx prettier --check src/browser/view/judging-cache.ts tests/view/judging-cache-record.test.mjs` | 0 | clean (the test file after `prettier --write`) |
| Foundation check, the flag form | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 14 errors, all the known ones (`maps-screen`, `account-screen`, `map-lines`; Slices 8 and 9); none from my files. Note: the flag did not drop those 14 here, they are listed with it as without it |
| Foundation check, full | `python -B .the-way/elements/common/foundation_check.py` | 1 | the same 14; none names `judging-cache-record.test.mjs`, so every `decision:` quotation of mine stands in a binding sentence |

The checks were run after `git add` of both files. The full gate (`npm test` with no argument) was not run.

### Mutations (the invariant's tests seen failing)

Each break was made in the worktree, the file `tests/view/judging-cache-record.test.mjs` run
(`npm test -- tests/view/judging-cache-record.test.mjs`), then the code restored (byte-compared with the saved good copy, and the
suite rerun green):

| Break | Exit | Cases that failed |
|---|---|---|
| no check of the damage against the health when reading | 1 | 2 (the crafted "above the creature's whole health" case, and the replacement of a bad value) |
| no check that the value holds exactly the three fields | 1 | 3 |
| no removal of this game's records after a refused save | 1 | 1 |
| the blow ignored when matching the creature | 1 | 1 |
| an offer equal to the record rewrites it | 1 | 1 |
| the page's memory of a refused write not read | 1 | 5 |
| no tidying of records at the opening | 1 | 3 |
| the stored record removed at a refused write (as the judgings do) | 1 | 1 |
| the offer takes a damage above the health | 1 | 1 |
| the map id not escaped in the key | 0 | 0 - equivalent: the map id is the last part of the key, so a bare separator makes no two keys one; the case I had written for it caught nothing and I removed it |

## Own-work check

Requirement most likely not met: "the record never falls after another program or a character's death, and a judging that took
less leaves it", read together with "a refusing storage leaves the record for the open page alone".
Check: the case "the record stays where the judgings of its map go ..." opens the cache with a stored judging above the loaded
game's character generation and program revision (so the opening removes it) and a stored record, and shows the record stays,
survives `remember` of judgings of the same map (replacing and another program), and is read again by a cache opened with another
generation and revision. The cases "a number offered below or at the record leaves it and writes nothing" (a counting storage:
no write for 10, 24 and 0 after 24), "two caches on one storage" (a lower offer of a tab never lowers another's) and "a write the
storage refuses leaves the record for the open page, leaves the stored record where it is" cover the rest. All green; the break "the
stored record removed at a refused write" fails exactly the last.

Behaviour a user sees: none changes. Nothing calls `readRecord` or `offerRecord` yet (Slice 11 wires them), so no screen, answer
or text differs; the walkthrough does not apply.

## Choices

1. **A refused write does not remove the stored record of the map**, unlike the judgings (whose stored value is removed so no
   older judging stands against the newer). Way rejected: removing it, as D-441's sentence "treated as the judgings are" can be
   read. Reason: the record must never fall (D-440); after a reload a removed record would show nothing where the storage still held
   a true, lower record, and a lower record of the same creature stands against no higher one because reading takes the highest.
   Cost if wrong: low - one line in `offerRecord` and one case; see Concerns.
2. **Stored field names `damage`, `health`, `strikeDamage`** (the third is the data's own name for the blow). Way rejected:
   `blow`. Cost: none.
3. **A value whose `damage` is above its `health` reads as none**, and an offer of such a number is not taken. Way rejected: no
   upper bound (a crafted huge number would show as "huge z 120"). Cost if wrong: low - a record could never exceed the creature's
   health by D-440 ("a fight the character won giving the creature's whole health").
4. **Reading takes the highest of the storage and the page's memory** (not the memory first, as the judgings do). Way rejected:
   memory first. Cost: none seen.
5. **`tidyStorage` lists the keys once and gives them to two functions** (`tidyJudgings`, `tidyRecords`). Way rejected: a second
   listing for the records. Cost: none.
6. **The key does not name the creature**; the creature's numbers sit in the value. A second creature on one map would share the
   record of the map. Way rejected: a creature in the key (the plan has the map in the key). The data name one creature per map.

## Concerns for the orchestrator

- Choice 1 departs from a plain reading of D-441's last sentence ("on opening and at a refusing storage, treated as the judgings
  are"). The invariant `judging-cache-reading` and the verification of D-441 name no removal for the record. If the removal is wanted
  as for the judgings, `offerRecord` gets one `removeFrom` after `recordMemory.set` and the case "a write the storage refuses leaves
  the record ..." changes its two assertions on the stored value.
- Foundation wording: the testing guidelines' trust-boundary row for `judging-cache.ts` names the cases of
  `tests/view/judging-cache.test.mjs` only; the new file's cases are not listed there (the guidelines are not in this slice's
  *Change*).
- The handoff says the flag `--skip-test-citations` leaves out the 14 known citation errors; in this worktree it did not (same 14
  with and without it).

## Adaptations

None of the plan against the code (the file and the names the plan gives stood as it said).

## Working copies

`.runs/executor-7/` (a copy of the good file and the mutation script, logs) and
two log files `.runs/executor-7-red.log`, `.runs/executor-7-green.log` in the same worktree: removed by full path; confirmed absent.
No worktree made.

## Reach beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (named by the method's section 1 for a slice) read whole.
- `src/browser/sim/data/creatures.ts` (lines 1-60) and `src/browser/sim/data/maps.ts` (the map ids and `recordCreature`), to give
  the test a real map id (`forestLair`) and the creature's numbers (120 and 20).
- `tests/quality/eslint-size-rules.mjs` (head), for the size thresholds (200 per function, 800 per file); the file stands at 536 lines.
- `grep` for `JudgingCache` in `src` and `tests`, to see that no code builds a cache by hand that the two new members would break.
- `a rules file of the author's agent configuration` and `...\git.md` (the user's rules, shown by hooks), outside the dispatch.

## Unread material

- `guidelines/styleguide-browser-view.md` (named by the handoff's *Read*): not read; it is 125 KB and concerns screens, tokens and
  drawing. A count of its mentions of `judging-cache`, `lasting storage` and `localStorage` gave 0, and this slice changes no
  screen. `src/browser/AGENTS.md` (the design-token rule) read whole; it does not touch a file without style.
- `guidelines/testing.md`: read whole (lines 1-510, in three pages).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`: read whole.
- `.runs/task-cycles/katalog-map/task.md` (the passages the handoff names, lines 31, 91-95, 175-176): not read; the handoff gives the
  slice and the decisions word for word, and I read D-440 and D-441 whole from `foundations/decisions.md` instead.
- `foundations/part_map.md`: read lines 1-33 (the part `browser-view` entry; the cut-off long first paragraph of the part was read
  to its first 400 characters only).
- `foundations/decisions.md`: D-440 and D-441 whole (`### D-440` to the withdrawn-identifiers table). D-448 and D-449 not read (the handoff
  names them as new decisions, not as read for this slice).
- `foundations/invariants.md`: `judging-cache-reading` whole.
- `tests/view/judging-cache.test.mjs`: read whole (997 lines), more than the lines 1-120 named.
- `.runs/task-cycles/katalog-map/reports/executor-6-report.md`: read whole.

## Searches not found or unclear

- D-441 "treated as the judgings are" at a refusing storage is unclear on whether the stored record is removed (see Concern 1);
  I searched the decision, the invariant and the verification and found no sentence that says it either way.
- The plan's Slice 7 names the key's content ("the account's identifier, the game's moment and the map") but not the key's version
  text or the field names; I chose them (Choices 2, and the key `loop2-judging-record-1|`).
- The trust-boundary row of `guidelines/testing.md` for `judging-cache.ts` does not name the new test file (see Concerns).
