# Report 06 — slice 4 (make-change)

**Status:** done

Base: `e7e8a95092242a006f8c7d16471de04819b3dd0e`. Commit: see the last line of "Commits".

## Commits

- `feat: :sparkles: give each requirement of the solving condition with the count of the map run in one function of the simulation and let meetsSolving read it` (`c60bd5e`).

## Files changed

- `src/browser/sim/run.ts` — +41 / -7: new exported types `SolvingRequirementKind` and `SolvingRequirement` (`{ kind, count, required, met }`) and the exported function `solvingRequirements(run, map)`; `meetsSolving` is now `solvingRequirements(run, map).every(r => r.met)`.
- `tests/sim/completion.test.mjs` — +100 / -1: five new cases and the import.

## Checks

| Check | Command | Exit |
|---|---|---|
| New cases failing first (stub `solvingRequirements` returning `[]`, so the tests reach their assertions) | `npm test -- tests/sim/completion.test.mjs` | 1 (pass 14, fail 5, each an `AssertionError` of `deepStrictEqual`, the last one a `TypeError` on `given[0]` of the empty array) |
| Same, after the implementation | `npm test -- tests/sim/completion.test.mjs` | 0 (pass 19) |
| Streak | `npm test -- tests/sim/streak.test.mjs` | 0 (pass 9) |
| simulation-inputs | `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| simulation-isolation | `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| Typecheck | `npm run typecheck` | 0 |
| Prettier on the two files | `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check …` | 0 |
| ESLint on the two files | `npx eslint --max-warnings 0 …` | 0 |

Invariant tests seen failing once, by a temporary mutation of `solvingRequirements` in the worktree (restored before commit; `git diff` showed only the intended change):
- `run.streak = run.streak;` added: `npm test -- tests/invariants/test_simulation_inputs.py` exit 1 (`test_no_exported_function_changes_its_arguments`); restored: exit 0.
- `void Date.now();` added: `npm test -- tests/invariants/test_simulation_isolation.py` exit 1 (`test_built_simulation_runs_with_the_language_globals_alone`); restored: exit 0.

Not run: `npm test` with no argument (the cycle's run).

## Own-work check (section 3)

Requirement most likely not met: "after the end it gives the state of the stopped minute, such as the streak 0 after a death of cold" (row 6) — a function that only reads `run.streak` would be right only if the simulation really leaves the streak at 0 in the minute of a death of cold. Check: the test "the requirements of a map run that ended …" runs a real map run (body at 34 °C, health 0.7, streak 5) through `advanceMinutes` until it dies, asserts as a precondition that `death.cause` is `cold`, and then asserts `solvingRequirements` gives `{ kind: "streak", count: 0, required: 480, met: false }`. It showed the streak at 0. The same test checks a completion: `{ count: 480, required: 480, met: true }`.

Mutations considered: a `>` for `>=` (caught by Las 480/480 met and Las deeper 540/540 met); the order swapped (caught by the `deepEqual` on arrays); a requirement given although the data leaves it out (caught by the case with `solving: { defeatedAttacks: 2 }`, `{ streak: 540 }` and `{}`); `count` read from the wrong field (caught: streak 120 with beaten attacks 2 differ); an input changed (caught by the inputs test and the invariant). The case 119/479 against met is covered by 120 of 480 not met and 479 of 480 not met.

## Reaches beyond the dispatch

None beyond the handoff. Not opened: D-04, D-131, D-135, the glossary entries and the part map (D-133, D-333, the two invariants, the guidelines, `maps.ts`, `types.ts` and the task passages were enough for this slice); named here as a gap in my reading, not in the selection.

## Searches not found or unclear

none (the word of the plan "named by the slice" left the name to me: `solvingRequirements`, kinds `"streak"` and `"defeatedAttacks"` — the same keys as `SolvingDef`).

## Choices

- Name `solvingRequirements` and the entry shape `{ kind, count, required, met }`; the kinds equal the keys of `SolvingDef`. Slice 8 reads this. Rejected: names such as `streakCount` — they would not match `SolvingDef`; cost if wrong: a rename in slice 8.
- The types live in `run.ts` beside the function (the Change names only `run.ts`), not in `types.ts` (excluded by the handoff).
- `meetsSolving` keeps its behaviour, also for a map with an empty `solving` (true, as `every` of an empty list).
- The test names use "Las - deeper" with an ASCII hyphen; the data name is `Las — głębiej`.

## Problems observed

none.
