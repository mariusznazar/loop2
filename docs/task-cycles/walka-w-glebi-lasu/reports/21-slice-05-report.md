# Slice 5 report — creatures in knowledge and discovery presentation

**Status:** done with concerns. The creature list is initialized, copied into repertoires, merged during discovery, included in the empty-result check, and named in the discovery line from creature data. Slice 6 still has to emit the attack revelation and prove creature-only discovery through that event; attack handling and minute aggregation were deliberately left untouched here.

**Worktree:** `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`  
**Branch:** `task/walka-w-glebi-lasu`  
**Base:** `a8b52f6180760928bd865b51ec4fa6a0b0d846df`  
**Head:** `e7c9912d95c987254b13a9ec7c9fc3973c5f1243`  
**Commit:** `e7c9912 feat: :sparkles: include creatures in discovery knowledge`

## Changed files

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/data/creatures.ts` | 3 | 0 |
| `src/browser/sim/data/revelations.ts` | 2 | 2 |
| `src/browser/sim/types.ts` | 3 | 2 |
| `src/browser/sim/understanding.ts` | 18 | 3 |
| `src/browser/view/status-row.ts` | 10 | 0 |
| `tests/invariants/program_fixture.py` | 2 | 0 |
| `tests/invariants/test_program_rule_pick.py` | 2 | 1 |
| `tests/sim/completion.test.mjs` | 7 | 1 |
| `tests/sim/discovery.test.mjs` | 32 | 4 |
| `tests/sim/repertoire.test.mjs` | 33 | 1 |
| `tests/sim/understanding-fixture.mjs` | 2 | 0 |
| `tests/view/program-editor.test.mjs` | 10 | 0 |
| `tests/view/status-row.test.mjs` | 22 | 1 |

## Checks

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/repertoire.test.mjs` | 1 | Expected red probe: temporarily returning an empty creature list made the new repertoire assertions fail (`actual []`, `expected ["wolf"]`). |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 | 32 passed. |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | 31 passed; existing forest discoveries now carry an explicit empty creature list. |
| `npm test -- tests/sim/completion.test.mjs` | 0 | 14 passed. |
| `npm test -- tests/view/status-row.test.mjs` | 0 | 27 passed, including the creature name from data. |
| `npm test -- tests/view/program-editor.test.mjs` | 0 | 39 passed. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 | 8 passed after its reconstructed Understanding fixture was extended. |
| `node_modules/.bin/prettier --check src/browser/sim/data/creatures.ts src/browser/sim/data/revelations.ts src/browser/sim/types.ts src/browser/sim/understanding.ts src/browser/view/status-row.ts tests/sim/completion.test.mjs tests/sim/discovery.test.mjs tests/sim/repertoire.test.mjs tests/sim/understanding-fixture.mjs tests/view/program-editor.test.mjs tests/view/status-row.test.mjs` | 0 | All checked files use Prettier formatting. |
| `git diff --check` | 0 | No whitespace errors before commit. |

An earlier red probe that removed the required `creatures` property failed at TypeScript compilation before assertions. I replaced it with the assertion-level probe above. An initial Prettier command also exited 1 because it included Python files, for which Prettier has no inferred parser; I reran it on supported files and it passed. Python files were not formatter-checked.

Not run: full `npm test` (the dispatch forbids the full gate in this slice), the foundation checker (no foundation files changed and it is not part of focused checks), Stryker (the independent reviewer runs mutation tooling), and a browser screenshot. The component states were checked by the focused status-row and program-editor tests. The selected foundation passages did not settle a route for a running-product screenshot, so no screenshot evidence is claimed.

## Own-work check

Most likely miss: the new creature list could disappear while a character's repertoire is copied or the status line could display a hard-coded name. The check was `npm test -- tests/sim/repertoire.test.mjs` for a separately copied creature list and `npm test -- tests/view/status-row.test.mjs` for the name read from creature data. Both pass; the deliberate empty-list mutation made the repertoire assertions fail as expected.

## Choices and adaptations

- The plan's file list omitted `src/browser/sim/data/creatures.ts`, although D-128 requires each revealed creature's data to identify its revealing event. I added `revealedBy` there so discovery remains data-driven. Leaving the event in simulation code would bind the engine to the wolf identifier and require another edit for every creature; the data field instead follows the existing action and condition pattern.
- The plan listed `tests/invariants/program_fixture.py` but its consumer also rebuilds an Understanding after removing selected entries. I updated `tests/invariants/test_program_rule_pick.py` so that reconstruction preserves or removes creature identifiers with the other lists. Without it, the fixture passed `undefined` into repertoire copying and failed before checking its invariant.
- Creature data's `revealedBy` uses a narrow attacked-event shape. The event type still owns the stronger `CreatureId` type; making the creature catalog import `Revelation` would create a circular type dependency because `CreatureId` is derived from that catalog. The comparison therefore accepts the catalog's structural event shape. The remaining cost is that a misspelled creature ID in this data field is not caught by that field's type alone; Slice 6's event and discovery tests should check the data-to-event match.
- The empty-result predicate now counts creatures, as required. The direct attack event that would exercise a creature-only result is intentionally part of Slice 6, so this predicate change has no focused runtime case in this slice.
- The status row capitalizes the data name for the discovery sentence, matching item presentation. A literal label in the view would go stale if a creature's data name changed.

No task source, foundation entry, later slice, or minute integration was changed. Worktree was clean after the commit.
