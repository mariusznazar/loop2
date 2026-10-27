# Slice 2 report — the Understanding in the game state and the repertoire

**Status:** done with concerns (the concerns are the test-first deviation and the classified mutants below; no blocking issue)

## Commits

- `339f94f` feat: :sparkles: add the Understanding to the game state and the repertoire computed from it (on top of `4ddad16`)

## Files changed

- `src/browser/sim/types.ts` — type `Understanding` (actions and conditions by kind, items by `ItemId | CampfireId`), `CampfireId = typeof CAMPFIRE.id`, field `GameState.understanding` (+17)
- `src/browser/sim/understanding.ts` — new: `newUnderstanding`, `repertoireOf`, `conditionInRepertoire`, `actionInRepertoire`, `ruleInRepertoire`, `programInRepertoire`, `editorRepertoire`, type `Repertoire` (= `Understanding`)
- `src/browser/sim/game.ts` — `newGame()` gives `newUnderstanding()`; import added (+2). No other function touches the field, so create, send, restart, end, setPaused, setProgram and death leave it.
- `tests/sim/repertoire.test.mjs` — new, 24 cases; comments locate expectations in `odkrywanie_loop2.md` (To do 1 line 14, To do 3 line 20, To do 4 line 21)
- `stryker.config.json` — lists the new test file (+1)

## Checks (command, exit code)

- `node --test tests/sim/repertoire.test.mjs` (after `npm run build`) — 0, 24 pass
- `npm test -- tests/sim/repertoire.test.mjs` — 0
- `npm test` — 1. Node stage 461 tests, 0 fail. Failed: `test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules` — exactly the three failures of the base (environment: no listening sockets found, ruff and shellcheck not installed). Nothing else failed. Ruff and shellcheck did not run, so those two checks are unchecked.
- `python -B .the-way/elements/common/foundation_check.py` — 0, "0 errors"
- `npm run typecheck` — 0; prettier `--check` on the changed sim files and the test — clean (formatted with `--write` before commit)
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts"` — 0; score 91.67 (55 killed, 5 survived, 0 no coverage)

### Surviving mutants (all in `editorRepertoire`, `understanding.ts:116`), classified per `guidelines/testing.md` § Mutation testing

Lines 115-117 look up the team character of the map run to read its archetype. All five (`() => undefined`, `=> false`, `=> true`, `!==`, and dropping `?.` of `state.run?.`) are **equivalent mutants under today's data**: `ARCHETYPES` holds one archetype, so every lookup result, and the fallback to `CREATED_ARCHETYPE`, resolves to the same predispositions. No assertion can tell them apart until a second archetype exists; the dropped `?.` is also unreachable (find runs only when `state.run` is set). I added no test for them. The branch is covered by two tests (map run of a listed character, map run of an unlisted one) that will catch the first archetype-dependent difference.

## Own-work check

Requirement most likely missed: "the repertoire is never saved and nothing is gated yet" together with "creating, sending, restarting, ending, pausing, setting the program and death leave the Understanding as it is." Check: `repertoire.test.mjs` runs all seven operations on a state with a hand-written Understanding and deep-compares it after every step, then advances 3000 minutes to death and compares again. Showed: unchanged in each step. Also checked that `repertoireOf` shares no array with its input (a pushed element does not reach the Understanding) and `programInRepertoire` leaves its input program unchanged. Nothing in `program.ts` or the simulation reads the repertoire yet (not gated), `GameState` gained only `understanding`.

## Choices and adaptations

- **Test first not honoured.** I wrote the module and the tests together; the tests were seen passing, never failing first. Cost if wrong: the cases were not shown to fail on an empty implementation; the mutation run (55 of 60 killed, the 5 survivors equivalent) stands in for that evidence.
- `Repertoire` is an alias of `Understanding` (same three lists), as the repertoire is a subset of it. Rejected: a separate shape; cost if wrong: none, an alias can later be split.
- `CampfireId = typeof CAMPFIRE.id` in `types.ts` (type-only import) so the file names no identifier literal (rule S2); the Understanding's `items` list holds it beside `ItemId`.
- Targets: `walkTo` and `gather` need their resource, `hereBelow` its resource, `itemBelow` its item, each among the repertoire's items. `eat` ("Zjedz — jagoda") has no target in the `Action` type, so it needs none. "Idź — ognisko" and the campfire conditions need no item (the campfire id in `items` is not required for them; the plan names it only as recordable).
- `programInRepertoire` keeps `nextGroupId`, `nextRuleId` and group names; empty groups stay, as only a group whose condition is outside the repertoire is dropped.
- `editorRepertoire(state)` takes the whole `GameState` and falls back to `CREATED_ARCHETYPE` when the run's character is not in the team.

## Reaches beyond the handoff

None beyond the listed reads (I also read `tests/sim/team.test.mjs` and the head of `tests/sim/data.test.mjs` for test conventions).

## Foundation entries that no longer match the code

None found.

## Questions / concerns

None open. Observation: `src/browser/view` code that builds a `GameState` literal would need the new field; typecheck passes, so none exists.
