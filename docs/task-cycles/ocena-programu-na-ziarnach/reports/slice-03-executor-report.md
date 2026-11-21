# Report — executor of slice 3, task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `93dd78b3` feat: :sparkles: judge a program of the player's list on the twelve fixed seeds of a map in the simulation (D-439, D-22). One commit, by path; base `afac5cd0`.

## Files changed (added / removed lines)

- `src/browser/sim/data/balance.ts` +10 / -0 — `BALANCE.judgingCapMinutes: 4000` and `BALANCE.judgingSeeds: [1..12]`, beside each other, inside `BALANCE` before `natureEnergy`, with doc comments like their neighbours.
- `src/browser/sim/types.ts` +16 / -0 — `SeedResult` (`{kind:"solved"}` | `{kind:"death", cause: DeathCause, minute}` | `{kind:"undecided"}`) and `Judging` (`{ results: SeedResult[]; equipment: TripEntry[] }`).
- `src/browser/sim/judging.ts` +90 (new) — `judgeOnSeeds(state, { mapId, characterId, programId }): Judging`.
- `tests/sim/judging.test.mjs` +453 (new) — 13 cases.
- `stryker.config.json` +1 — a reach beyond the handoff, see below.

## What the function does

`judgeOnSeeds` refuses (throws `Error`, as `send` does for the same arguments) a map the data lacks (`Object.hasOwn`, so `constructor` and `__proto__` are refused), a map `canSendMap` refuses, a character the team lacks and a program not on the list. Then: `equipment = sendTake(program.tripPlan, chest, character.traits.carryingCapacity, map)`; the backpack is `newBackpack()` with those entries; the program is `programOf(state, chosen.program, character.id, character.skills)` (as `beginRun` in `loop.ts` calls it); for each seed of `BALANCE.judgingSeeds` in order it starts `newMapRun(map, seed, program, ids, {...traits}, skills, backpack)` and steps `stepMinute` while `!mapRunEnded(run) && run.minute < BALANCE.judgingCapMinutes` (the same loop as `runOnce`, so a run that ends in the minute of the cap counts). The cap is read from the data at call time. The function builds only new values; `game.ts` is untouched.

## Checks (command and exit code)

- Written first, failing (stub returning `{results: [], equipment: []}`; the 9 failures were assertions, not setup errors): `npm test -- tests/sim/judging.test.mjs` exit 1, pass 4 / fail 9. The 4 passing cases at the stub (the data literals, "same judging twice", "nothing is changed", "character in a loop or manual run is judged as outside") are ones a stub satisfies and protect against a later mutation or nondeterminism.
- A first green run failed once (exit 1, 12 pass / 1 fail) on a defect of my test helper (`asked("forest", undefined)` took the default parameter and so asked for character 1); fixed in the test, no change to the code. Rerun: `npm test -- tests/sim/judging.test.mjs` exit 0, pass 13 / fail 0.
- `npm test -- tests/sim/data.test.mjs` exit 0
- `npm test -- tests/sim/random.test.mjs` exit 0
- `npm test -- tests/invariants/test_simulation_isolation.py` exit 0
- `npm test -- tests/invariants/test_simulation_randomness.py` exit 0
- `npm test -- tests/invariants/test_simulation_inputs.py` exit 0
- Beyond the slice's *Checks*, tests of the code I touched: `npm test -- tests/quality/test_node_test_selection.py` exit 0; `npm test -- tests/quality/test_mutation_test_selection.py` exit 1 at first (it wants every `tests/sim/*.test.mjs` in `stryker.config.json`), after the reach below exit 0; `npm test -- tests/quality/test_function_and_file_size.py` exit 0; `npm test -- tests/quality/test_quality_invariants.py` exit 0 (eslint, prettier); `npx eslint` on the four source/test files exit 0; `npx prettier --check tests/sim/judging.test.mjs` clean.
- `python -B .the-way/elements/common/foundation_check.py` exit 1, 7 errors, all of them the seven `decision: D-243` quotations the handoff says later slices shorten (`tests/sim/loop.test.mjs:237,:304`, `tests/view/account-screen.test.mjs:2683,:2807,:2975`, `tests/view/maps-screen.test.mjs:494,:700`); none from this slice. It also checks my quotations in the new test: they stand.
- The product's full gate (`npm test` with no file) was not run, as the handoff orders.

## Own-work check

Requirement: the judging must equal an earning loop's map run in what it takes and leaves, and be the same twelve lines at each call (task *To do* 2, Questions 4 and 9; D-439, D-22). The weakest point: the equipment and the program reduction (the earning loop takes the list from the chest, the judging must take the same list but remove nothing; the program must be cut to the repertoire). Checks and what they showed:
- The test "take list is cut ..." with a chest of 4 berries and `take berry 10`: equipment `[berry 4]`, chest equal before and after (frozen state, `structuredClone` before), and on each of the twelve seeds the death minute is later with 4 berries than with none and later with 10 than with 4; a chest of 50 with a list of 4 gives the same twelve lines as a chest of 4 with a list of 10; carrying capacity 2 gives the same lines as a list of 2; one budget of 7 over `moss 10, stick 10, berry 10` with `moss 2, stick 10, berry 10` held gives `[moss 2, stick 5]` (hand-counted, as in `tests/sim/trip.test.mjs`).
- "a program the character cannot carry out yet ...": in a new game (nothing but "Zbadaj" and "zawsze" discovered) the best reference program of Las is judged as the empty one: twelve deaths of cold at minute 243, the state equal after.
- "each seed's line is the map run of that seed": three program/map pairs against a reference that passes the same primitives (`takeTrip`, `programOf`, `newMapRun`, `stepMinute`) written in the test, with a precondition that the lines include solved, hunger, cold and combat among them.
- Two mutations tried on the code and seen caught, then restored: `<` to `<=` in the cap loop (the cap-edge case fails), the character's skills replaced by `{}` (the skills case fails).
- Not checkable here: that an earning loop and a judging take the *same* seed-by-seed minutes is not claimed (they run on different seeds); only equal equipment and equal reduction are, by the relation tests.

## Walkthrough

Alters no behaviour a user sees in the running product: the slice adds a pure function and data numbers that no screen, route or command calls yet.

## Reaches beyond the handoff

- `stryker.config.json`: added `tests/sim/judging.test.mjs` between `hex` and `layout`. The gate test `tests/quality/test_mutation_test_selection.py` fails without it for any new `tests/sim/*.test.mjs`; the file is not named in the slice's *Change*. One line.
- Read selectively beyond the *Read*: `tests/sim/loop.test.mjs:1-260`, `tests/sim/trip.test.mjs:1-200`, `src/browser/sim/programs.ts` (`programById`, `rowProgram`, `createProgram`, `deleteProgram`, `editProgram`), `src/browser/sim/game.ts` (`send`, `canSendMap`, `programOf`), `src/browser/sim/types.ts:195-500`, `src/browser/sim/data/maps.ts`, `src/browser/sim/data/skills.ts` (`BRANCHES`), `tests/sim/data.test.mjs` (BALANCE tests), `tests/sim/understanding-fixture.mjs` — to fit the code and tests to the neighbours.

## Choices

- Names: `judgeOnSeeds` (not `judgeProgram`, which `program.ts` already exports for the rule pick), the result fields `results` and `equipment`, `kind` as the discriminant like the other unions. **Cost if wrong:** slice 4 and later slices must use these names; a rename is mechanical. The later slices' plan sections were not given to me, so the names are mine.
- Cap and seeds in `BALANCE` as `judgingCapMinutes` and `judgingSeeds` (the file's single exported object, `paces` being an existing array there) rather than separate exports. Rejected: a nested `judging: {...}` object. **Cost if wrong:** slice 8 reads `BALANCE.judgingCapMinutes`; a different name is a one-line change there.
- Refusal by `throw new Error`, as `send` does for the same four cases, rather than returning `undefined` or the state as `startLoop` does; there is no state to return and the callers (slice 4 and the view) check what they may ask before asking. **Cost if wrong:** a caller that asks for a character who has gone would throw instead of getting a no-op.
- The cap-edge test sets `BALANCE.judgingCapMinutes` on the imported data object and puts it back in `finally`, because the function takes no cap argument and the slice says the cap is data. The object is `as const` only in types; each test file runs in its own process. Rejected: an optional cap argument that production never uses.
- The solved-at-the-cap edge expectation is a relation (the completion minute of the reference run, computed by the engine's own steps in the test), not a literal: no program completes Las at the earliest minute, 480, on these seeds, and a literal would be today's result. The death edge uses the hand-worked value, minute 243.
- `coding-simulation-module.md` *Files of this kind*: it lists every file of `src/browser/sim/` except the data files and `saved-game.ts` (its status column reads `copy` for most). **It says a row is owed for `src/browser/sim/judging.ts`** (probably `copy`, decision `—`); I did not edit the guideline, as ordered. Nothing in the tests I ran checks the table.

## Unread material

none — every foundation entry and guideline file of the handoff was read whole (`guidelines/testing.md` in three reads of its 509 lines). `src/browser/sim/loop.ts` and `game.ts` were read beyond the handed ranges (`loop.ts` whole; `game.ts` 1-66, 100-230, 496-556); `run.ts` whole; `balance/engine.mjs:195-264`; `tests/sim/reference-programs.mjs` lines 1-200 and 270-300, 655-682 (the rest is programs' notation, the keys were read by a run over `REFERENCE_PROGRAMS`).

## Searches not found or unclear

- The plan sections of slices after 3 were not given, so how slice 4 calls the function (name, argument shape, how it treats a refused character) is unknown to me; if it calls with a character it has just checked, the throwing refusal is harmless.
- Word "loop record" in D-241 (changed by the foundation step) has no field in `EarningLoop` yet; that is another slice's, not this one's.

## Problems

None observed in the code. One defect of my own test helper, found and fixed (above).

## Working copies

`.runs/executor-3/` (probe scripts, test output logs, a backup of `judging.ts` for the mutation runs) stood in the worktree and was removed with `rm -rf` by its full path; nothing remains.
