# Slice 4 — executor report (task `ocena-programu-na-ziarnach`)

**Status:** done

## Commit

- `bae893e2` — `feat: :sparkles: hold the last judging of each character, program and map in the game state ...` (base `93dd78b3`).

## Files changed (added / removed lines)

- `src/browser/sim/types.ts` +24 / -0 — new types `RememberedJudging` and `RememberedJudgings`; `GameState.judgings`.
- `src/browser/sim/game.ts` +1 / -0 — `judgings: {}` in `newGame` (the one line).
- `src/browser/sim/saved-game.ts` +49 / -0 — `SEED_KINDS`, `rememberedJudging`, `rememberedJudgings`, `"judgings"` in `GAME_KEYS`, the call in `game()`, three imports. `SAVED_GAME_VERSION` untouched (8), as the slice says.
- `tests/sim/saved-game-judgings.test.mjs` +518 (new) — 11 tests.
- `stryker.config.json` +1 — **an addition to the slice's *Change***: the new test file is listed in `tap.testFiles` (`tests/quality/test_mutation_test_selection.py` needs it).

## Shape chosen (D-440)

`GameState.judgings: RememberedJudgings = Partial<Record<CharacterId, Partial<Record<ProgramId, Partial<Record<MapId, RememberedJudging>>>>>>`, `RememberedJudging = { results: ("solved"|"death"|"undecided")[]; equipment: TripEntry[] }`. A seed keeps its kind as a bare string; no cause, no minute. Nesting by character then program then map, so slice 5's erasures are one delete each: a program's judgings are `judgings[c][p]`, a character's `judgings[c]`.

## Load rules written

Strict, via the file's own helpers: each of the three key levels in canonical identity form; character a team member (`characterKey`), program **on the list** (`listedProgram`, so a deleted program's number is refused), map own key of `MAPS` (`oneOf`); judging exactly `results` + `equipment`; `results` a hole-free list of exactly `BALANCE.judgingSeeds.length` (12) own-key kinds; `equipment` through `tripList` (item of the data, each once, count a safe integer from 1). Not compared: the cap, the map's data, the chest, the carrying capacity, the map's entry cap, whether the map is open. Built from new values.

## Checks (command, exit code)

- Written first, red: `npm test -- tests/sim/saved-game-judgings.test.mjs` exit 1 — with `newGame`/types/stub `judgings: {}` in place, so that the build passes: 6 failed on assertions (the save-and-load round trip, new game, equal-values, admitted forms, deleted-program control, and the record missing from the game loaded as ok), 5 passed (the refusal cases pass vacuously while the load refuses every document of the new key; they are made meaningful by the admission cases that fail beside them). First run before the stub stopped on a type error (`judgings` missing in `game()`'s result), not counted as the failing run.
- Green: `npm test -- tests/sim/saved-game-judgings.test.mjs` exit 0 (11 pass).
- `npm test -- tests/sim/judging.test.mjs` exit 0 (13 pass).
- `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (19 pass).
- `npm test -- tests/invariants/test_simulation_inputs.py` exit 0 (2 tests).
- Also run: `tests/invariants/test_simulation_isolation.py` exit 0, `test_content_identifiers.py` exit 0, `test_simulation_randomness.py` exit 0, `tests/quality/test_mutation_test_selection.py` exit 0, `tests/quality/test_node_test_selection.py` exit 0; `tests/sim/{catch-up,death,discovery,loop,program-list,team}.test.mjs` each exit 0; `npx eslint` on the four source/test files exit 0; `npx prettier --check` on them and `stryker.config.json` clean.
- Not run (by the handoff): the full gate, and `tests/sim/saved-game.test.mjs` (refused as another shape until slice 6; not changed). Not run: `tests/quality/test_function_and_file_size.py` (see concerns), the view tests that use `loadSavedGame` (`tests/view/*`, `tests/account-api.test.mjs`) — they may hold hand-built game states with no `judgings`; I did not look.

## Own-work check

Requirement: the strict load at a trust boundary refuses every crafted form of the new record and admits every one the game makes (slice *Model*, D-386, D-213). Weakest point: a check of the new reader dropped or loosened with no test noticing. Check: five hand mutations of `saved-game.ts`, each run against the file, each restored: no length check on `results` — killed (twelve-results test); program read as `givenProgram` — killed (deleted-program test); kind read as any text — killed (kinds test); character key not checked against the team — killed (naming test); equipment read as any list — killed (3 tests). All restored; the committed file has none. Also: a sweep of 16 hostile values (incl. `__proto__`, `{toString:1}`) plus removal at every place of the judgings of the sample document, none throws; a sweep replacing every one of the 56 leaves by 5 values of another kind, all refused.

## Choices (with the way rejected and cost if wrong)

1. Program key must be **on the list**, not merely given (`givenProgram`). Rejected: given — admits a judging of a deleted program, which D-440/the task say deletion erases. Cost if wrong: if slice 5's deletion forgets to erase, a game's own save is refused whole; its tests would show it.
2. Empty levels (`{}`, `{1:{}}`, `{1:{1:{}}}`) are admitted (a test pins it). Rejected: refusing them — would make slice 5's functions leave no empty parent or the game's own saves would be discarded (D-386). Cost: non-canonical empty levels load.
3. A map not open to the player, and equipment above chest, capacity or entry cap, are admitted (pinned by a test). Rejected: checking openness — a change in the data would then discard the save. Cost: a crafted document can hold a judging the game cannot make; harmless, it costs its own player.
4. Version not raised here (slice 6). Until then the game writes documents of version 8 with a `judgings` key, which no deployed code has to read.

## Reaches beyond the handoff

- `stryker.config.json` (listed above).
- Read `guidelines/testing.md` in three pages (whole). Read of `src/browser/sim/judging.ts`, `tests/sim/judging.test.mjs:1-120`, `tests/sim/understanding-fixture.mjs`, `tests/sim/saved-game.test.mjs:2560-2740` and `:823-885` (for the helper conventions), `src/browser/sim/programs.ts` (signatures of `createProgram`, `deleteProgram`), `src/browser/sim/game.ts` `withSaveTime` — none named in the handoff, all to write the tests against the real functions.

## Concerns for the orchestrator

- `src/browser/sim/game.ts` stands at 980 lines, over the file limit of 800 (D-425); the plan has it take one line, so I wrote the line and did no move-out. The size invariant is already marked violated; the review should say if a move is wanted.
- The version stays 8 and the document of `tests/sim/saved-game.test.mjs` now fails to load (no `judgings` key); slice 6 owns both.
- Slice 5 must keep `judgings` canonical in the sense of this reader: program keys only of listed programs, character keys only of team members.

## Unread material

- `src/browser/sim/game.ts`: read the region of `newGame` and the `withSaveTime` header, not the whole file (one line was added; named in the handoff as a file to read whole before changing — read in part).
- `foundations/part_map.md:33-64`, `foundations/invariants.md:226-235`, `:1048-1057`, `foundations/decisions.md` D-206, D-386, D-213, D-165, D-56, D-425, D-439, D-440: read whole.
- The frozen-task passages: used as copied in the handoff, `task-frozen.md` not opened.

## Searches not found or unclear

- none. (`SAVED_GAME_VERSION` is 8 in the code, "7 today" in the task's *Context*: an earlier task raised it; no effect on this slice.)

## Working copies

None made except `.runs/executor-4/` (a copy of `saved-game.ts` for the mutation runs) and two log files `.runs/executor-4-red.log`, `.runs/executor-4-green.log`; all removed. None remain.
