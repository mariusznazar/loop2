# Report — Slice 2 of `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commit:** `1f899ec` feat: :sparkles: name the group of the rule the game wrote at the first chill from the copy, D-312 (base `e35e91d`).
- **Check result:** nothing failed. The whole gate not run, as the handoff said. `guidelines/testing.md` read only in part (the first 30 kB of 66 kB).

## Files and function
- `src/browser/sim/understanding.ts` +23: new export `chillRuleGroupName(state: GameState): string | null`, beside `withFirstChillRule`.
- `tests/sim/discovery.test.mjs` +199: 14 new cases, 46 tests in the file.
- Returns null where `state.run` or `state.discovery` is null; null where the held discovery holds no action whose data `revealedBy.kind` is `chilled` (the first-chill discovery holds explore and wander); otherwise the name of the first group of `state.run.copy.program.groups`, in the copy's order, that holds a rule with condition `always` and action `explore`; null where no group does. Changes nothing in its input. No type, saved document or constant changes; `SAVED_GAME_VERSION` stays 3.

## Cases (written first)
- A new game's first chill names „Program”. A first group renamed before the chill names that name. A copy with no rule group names „Program”.
- Another group dragged above the one holding the rule still names the group holding it. A rename while the band stands gives the new name. The rule moved into another group names that group. Another group holding its own „Zawsze → Eksploruj”, dragged above, names that group (D-312's further cost).
- The rule deleted gives null, and the other group's name once another group holds such a rule. The rule's group deleted gives null.
- „Zawsze → Wędruj” and „Temperatura poniżej → Eksploruj” name nothing.
- The first finished exploration gives null though the copy still holds the rule.
- No discovery gives null: before the chill, one minute before it, after „Wznów”. No map run gives null.
- A paused state saved with `savedGame`, through JSON, loaded with `loadSavedGame` gives the same name; the document keys stay `version` and `game`.
- Asking changes nothing in a deeply frozen state.

## Checks (command → exit code)
- Stub returning null: `npm test -- tests/sim/discovery.test.mjs` → exit 1; ten of the 14 new cases failed on their assertion (`actual: null, expected: 'Ogień'` and the like); the other four expect null.
- With the function: `npm test -- tests/sim/discovery.test.mjs` → exit 0 (46 pass, 0 fail).
- `npm test -- tests/sim/saved-game.test.mjs` → exit 0, file unchanged (27 pass).
- `npm test -- tests/invariants/test_simulation_isolation.py` → exit 0.
- `npm test -- tests/invariants/test_simulation_inputs.py` → exit 0.
- `npm run typecheck` → exit 0.
- Prettier `--check` on both files passes; ESLint with an empty suppressions file and `--max-warnings 0` exit 0.
- The saved-document test first failed for want of a save time (`withSaveTime`); the test was fixed, not the code, and passed on the re-run.
- Not run: the whole gate, any mutation tool.

## Own-work check
- Requirement most likely unmet: D-312's first group in the editor's order that holds the rule, read at the time of asking — not the group the game wrote into, not the first group. Covered by the drag, rename, move, deletion and other-group cases.
- Mutations by hand, each seen failing, then restored: dropping the held-discovery check fails the „first finished exploration … null” case; reading only the copy's first group fails the drag, moved-rule, deleted-with-other-group and saved-document cases. `git diff` held only the intended change before the commit.

## Choices and concerns
- The held discovery counts as „at the chill” when it holds an action with `revealedBy.kind === "chilled"`, as the plan says. The game's own `Discovered.chill` flag is also true when only the chill-revealed condition `temperatureBelow` is new — possible only with a hand-built Understanding, since the data reveals explore, wander and the condition together. Left unhandled.
- A rule counts as „Zawsze → Eksploruj” by condition kind `always` and action kind `explore` alone; neither carries parameters.
- No trust boundary touched; `src/browser/sim/saved-game.ts` untouched.

## Reach beyond the handoff
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`; `src/browser/sim/understanding.ts` whole; parts of `tests/sim/discovery.test.mjs`; `setProgram` in `src/browser/sim/game.ts:285-320`; `savedGame` and `loadSavedGame` in `src/browser/sim/saved-game.ts:75-100`; `tests/sim/program-fixture.mjs` — to build the cases.

## Searches not found or unclear
- `guidelines/testing.md` not read whole: only the first 30 kB of 66 kB (levels and choosing the level). A rule in the unread part could bear on the new cases; the cases use only real simulation functions, with no replacement.
- No search for an existing helper in `tests/sim/saved-game.test.mjs` that builds a stamped saved document; `withSaveTime` used directly.
