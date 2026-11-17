# Report — executor of slice 12: simulation: world reference, closed lists and the team through a load and a loop

**Status:** done

## Commits (range starts at base 4690292844c37164c52aa26f204b4a6b9c056c78)

- `69b87b2a6cfdb35d5c54dfd4d5eeab52098530d6` — `tests/invariants/test_program_world_reference.py`
- `d1edf5aaccc200ea78781409fa879672691b5eb3` — `tests/invariants/test_program_closed_lists.py`
- `de7774b5b1ef7531561817c33180a27f54328c50` — `tests/invariants/test_character_team.py`

Only these three files changed; `src/` is untouched (`git status --short -- src` and `git diff --stat -- src` empty). The
worktree is clean.

## What changed

### test_program_world_reference.py (program-world-reference)
- `LEGIT` gains: a program of `temperatureBelow` rules (30, 36.5, 37: the lowest, an inner and the highest number the data allow),
  a program of `itemBelow` rules (0, 8, 3 and 50, over four items), and a grouped program whose groups sit under
  `temperatureBelow` and `itemBelow` conditions. Each is offered outside a map run and during one and must be held as offered.
- `NAMING` gains eight programs: `temperatureBelow` with a coordinate pair and with a tile's number, `itemBelow` with a coordinate
  pair and with a tile's number, `itemBelow` with an item by its index and as a tile's label, and a group under each condition
  carrying a position.
- The reading `naming()` takes the `value` of `temperatureBelow` and `itemBelow` as a quantity like that of `hereBelow`
  (`COMPARES_STOCK` became `COMPARES_QUANTITY`) and reads an `item` field like a `resource` field (`ITEM_IDS` written out, a
  number or a non-identifier is flagged). Controls added to the reading: held programs with temperature values 30..37 and item
  values 0..50 pass; a temperature or an item stock on a position, an item by its index, as a tile's label, or as a non-identifier
  are flagged.
- Docstring updated to the wider reading.

### test_program_closed_lists.py (program-closed-lists)
- The driver now offers `setProgram` in three places (outside a map run, during a map run, during an earning loop of the
  character on Skraj lasu `forestEdge`, started with `startLoop`); in the loop case the program the loop carries is read too
  and must not become the offered one.
- New case `test_a_saved_game_state_holding_a_program_with_an_unlisted_kind_is_not_loaded`: every program offered (VALID, a
  grouped valid program, the 92 rule-level offers, the 40 group-condition offers) is written into a saved document at four
  places — the player's list, the copy of a map run, the base of that copy, the program an earning loop carries — and loaded
  with `loadSavedGame`. The valid programs must load and be held as offered at each place; each program with an unlisted kind
  must not load. For the copy place the rule counts are rewritten to match the program written, so the refusal is on the kind.
- Group-condition programs moved to `group_programs()` so both tests use them. Controls extended for the loop variant and
  for made-up loads.

### test_character_team.py (character-team)
- The driver gained `reload` (stamp with a save time, write the document, load it), `reloadAltered` (the same with an
  alteration of the document), and the functions of `loop.js` (`startLoop`, `advanceLoopRun`, `endLoopRun`, `stopLoop`,
  `catchUp`).
- `membership_errors` also reads each earning loop: the id its map run carries stands once in the team's list and equals the key
  the loop stands under.
- New cases: a scenario of loads and loops (`LOOP_STEPS`: loop of 1, load, send of 2 beside it, loop run to its end and the end
  taken, load with a map run and a loop at once, character created, loop of 4, load, a 400-minute catch-up taking both loops
  through a death and a new map run each, load, end, load); a control that starts of a loop for 0, 4, "1" and none are refused
  with the very state while the start for 1 is taken; a control that eight altered documents (a loop under, or its map run
  carrying, a character no team holds, another team character, a string id, no id; a map run carrying a character no team holds
  or a string id; two team entries under one id) are each refused by the load and leave the state as it stood, while the unaltered
  document loads; a control that the reading flags made-up states of the same kinds.
- Docstring updated (scenario, reading, controls).

## Checks (command and exit code)

Focused checks of the slice, final run on the committed state:

| Command | Exit | Result |
|---|---|---|
| `npm.cmd test -- tests/invariants/test_program_world_reference.py` | 0 | Ran 3 tests, OK |
| `npm.cmd test -- tests/invariants/test_program_closed_lists.py` | 0 | Ran 4 tests, OK |
| `npm.cmd test -- tests/invariants/test_character_team.py` | 0 | Ran 6 tests, OK |
| `git status --short -- src` | 0 | empty |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (I added no `decision:` comment; the files keep the `invariant:` and the existing `decision:` comments) |
| `.runs/quality-venv/Scripts/ruff.exe check` on the three files | 0 | All checks passed |

I did not run the gate (`npm.cmd test` without a file) nor `gate_times.py`: they are the orchestrator's.

### Each widened check seen failing, against the simulation broken for a moment and restored byte for byte

Each break was made in `src/`, the focused check run (exit 1 each time), and the file restored with `git checkout -- <file>`;
`git diff --stat -- src` was empty (exit 0) after each restore and before every commit. The passing run of each check is the one
in the table above (and the run before the breaks, exit 0 each).

| Check | Break (in `src/browser/sim/`) | Command | Exit | Failure seen |
|---|---|---|---|---|
| world-reference | `programs.ts` `checkCondition`: body conditions (temperatureBelow among them) return `{...value, kind, value}` keeping extra fields | `npm.cmd test -- tests/invariants/test_program_world_reference.py` | 1 | `temperatureBelow with a coordinate pair (outside a map run), taken in … condition.at.q` |
| world-reference | `programs.ts`: `itemBelow` returns `{...value, ...}` keeping extra fields | same | 1 | `itemBelow with a coordinate pair (outside a map run), taken in …` |
| world-reference | `programs.ts` `checkItem` returns a number as it is | same | 1 | `itemBelow with an item by its index … 0 is no item identifier` |
| closed-lists | `saved-game.ts` `earningLoop`: `program: read.program as Program` (no check) | `npm.cmd test -- tests/invariants/test_program_closed_lists.py` | 1 | `… written into a saved document at an earning loop: loaded as …` (only that place) |
| closed-lists | `saved-game.ts` `copy`: `base` unchecked | same | 1 | `… at the base of the copy of a map run: loaded as …` |
| closed-lists | `saved-game.ts` `copy`: `program` unchecked | same | 1 | `… at the copy of a map run: loaded as …` |
| closed-lists | `saved-game.ts` `programList`: `program` unchecked | same | 1 | `… at the player's list: loaded as …` |
| closed-lists | `game.ts` `setProgram`: no check while `state.loops` is not empty | same | 1 | `… (during an earning loop): taken in as …` in both setProgram cases |
| character-team | `saved-game.ts` `team`: duplicate id no longer refused | `npm.cmd test -- tests/invariants/test_character_team.py` | 1 | the altered document with two entries under id 1 was loaded (membership error at step 14) |
| character-team | `saved-game.ts` `earningLoop`: `run.character.id !== characterId` removed | same | 1 | the loop carrying character 3 under key 1 was loaded |
| character-team | `loop.ts` `startLoop`: character found by `String(id) === String(characterId)` | same | 1 | the refused start for the id `"1"` changed the game |
| character-team | `loop.ts` `takeEnd`: next map run begun for `state.team.characters[0]` | same | 1 | the scenario's load at step 15 refused the document (loop 4 carrying character 1) |

## Own-work check (section 3)

Requirement of the slice most likely not met: each widened check must fail for the reason it names, not for a neighbouring one —
above all the load and loop cases, where an altered document can be refused for several reasons and a check may pass on the
current code and also on a code broken at the one place that matters. Check: each break above isolates one place of the code
(each of the four places of a program in a document; each of the three altered-document rules of the team). It showed:
the first version of the "two entries under one id" document altered the entry that the map run also needs, so the load would
have refused it on the missing character even without the duplicate check; I changed it to alter the third character (no loop,
no run), and the duplicate-id break was then caught. The remaining altered documents are refused by one check each, except
"a loop under a character no team holds" (renamed key), which both `characterKey` and the loop's run-id check refuse — that case is
not isolated by a single break (the other altered documents are).

## Reaches beyond the handoff (section 1)

- `src/browser/sim/programs.ts` (whole) — what `setProgram`/`checkProgram` accepts for `temperatureBelow`, `itemBelow`, items.
- `src/browser/sim/program.ts:150-270` — `conditionHolds`, to know the conditions compare a quantity.
- `src/browser/sim/data/conditions.ts` (whole) — the range of `temperatureBelow` (30 to 37, step 0.1) and `itemBelow` (0 to 50).
- `src/browser/sim/data/items.ts` (grep of the item ids) — the four item ids written out as `ITEM_IDS`.
- `src/browser/sim/loop.ts` (whole) — `startLoop`, `advanceLoopRun`, `endLoopRun`, `catchUp`, to drive the earning loop.
- `src/browser/sim/saved-game.ts` (lines 80-120, 245-275, 466-540, 740-765, 1080-1160, 1240-1411) — how the load reads programs, copy,
  loops, team; the save time (`withSaveTime`) a document needs (a new game has `saveTimeMs: null`, which the load refuses).
- `src/browser/sim/game.ts` (lines 120-150, 330-460) — `setProgram`, `newGame`, `createCharacter`, `send`.
- `src/browser/sim/data/maps.ts` (lines 55-110, by a grep) — the maps' resources and that `forestEdge` is the solved map.
- `tests/invariants/loop2_invariant_support.py` — read whole by mistake while looking for the build helper (not needed).
- `the author's global rule file scripts.md` and `git.md` — read as the user's instructions require.

## Working copies

A scratch directory `.runs/executor-12/` (an exploration script, a dump of the loop scenario, outputs of the broken runs) stood
under the ignored `.runs/` of the worktree; I removed it (`rm -rf .runs/executor-12`) before returning. No worktree or clone was made.

## Choices, with the way rejected

- **`COMPARES_STOCK` renamed to `COMPARES_QUANTITY` and listing the three kinds** rather than exempting every condition with a `value`:
  the rejected way would let a `value` on a condition that compares nothing pass (the existing control "a value of a condition that
  compares no quantity" would stop failing). Cost if wrong: a held program with another numeric condition (`satietyBelow`,
  `healthBelow`, …) in a later LEGIT would be flagged and the list must be extended; the docstring says the list is "the kinds the
  programs of this check hold".
- **`item` read like `resource`** (an identifier among `ITEM_IDS`, never a number). Cost if wrong: a new item id in the data not
  written out fails the check until `ITEM_IDS` is updated; the same holds today for `RESOURCE_IDS`. There is no tripwire for
  `ITEM_IDS`; items and resources share the four ids.
- **"Through an earning loop" for program-closed-lists** is read as: the program a loop carries (refused in a loaded document) and
  `setProgram` during a loop (refused, and the loop's program not becoming the offered one). Rejected: only the load. Cost if wrong:
  if the plan meant a different path (e.g. the program of a loop through `startLoop` with a `programId`), that path is not covered;
  `startLoop` takes a program only from the checked list.
- **The load refusal is asserted as "no game state"** (`ok` false), not as the reason `shape`; the check does not pin the reason.
- **The earning loop of the scenarios is on `forestEdge`**, since only a solved map takes a loop and the driver's new game solves only
  that one; the catch-up span (400 loop minutes = 400 × 60 000 ms) is a literal that depends on `loopMinuteRealSeconds` = 60. If the
  balance changes, the precondition "the catch-up carries a loop through the end of a map run" fails with its message.
- One commit per file, as the earlier commits of the cycle go test by test.

## Problems observed

- The loop's runs on `forestEdge` with the program of the test die of cold at game minute 243 and the character has no practice,
  so the team's resurrection is not used and the loop goes on (`noPractice`). The scenario therefore takes loops through "a death
  and a new map run", not through a covered death or a stop; the docstring says "a death each", which is what happens.
- Value mismatch with the plan: none found. The plan's range for the passages differed by a line or so; I used the current ranges.

## Unread material:

none of the entries and files the handoff names was left unread. Of `guidelines/testing.md` I read lines 1-214, 215-364 and
365-495, all of it; `foundations/invariants.md`, `decisions.md`, `glossary.md` and `part_map.md` ranges read whole as given.

## Searches not found or unclear:

- The plan's "`character-team` on the states a load and an earning loop give" does not say whether a loop's map run counts as "the
  character a map run carries" in the invariant's reading; I read it so (the loop's map run carries a character by `id` like the
  manual one) and wrote it into the docstring of the check. The foundation sentence "Every character belongs to exactly one team"
  does not itself say it.
- The foundation does not state that a load refuses a document whose program holds an unlisted kind (the invariant says "the
  simulation refuses"; D-206 says a document the types, closed lists and data do not admit is refused whole as shape); I relied on
  the latter for the load cases.
