# Report — executor of Slice 1, task rana-i-opatrunek

**Status:** done

## Commits and files

Base `6d07bf2045680fae3abb72169b395ec7121f6249`; head `c669038548dae018918da296bcf94f1101f52a0c` (one commit, branch `task/rana-i-opatrunek`, not pushed).

| File | Added / removed |
|---|---|
| `src/browser/sim/data/skills.ts` | 32 / 13 |
| `src/browser/sim/skills.ts` | 48 / 5 |
| `src/browser/sim/understanding.ts` | 51 / 26 |
| `src/browser/sim/run.ts` | 3 / 1 |
| `tests/sim/data.test.mjs` | 21 / 10 |

## What was made

- `SkillDef.actions` replaced by `grownBy: readonly GrownPair[]`; `GrownPair = { action: ActionId; item?: ItemId }` (exported). The eight skills grow exactly the pairs they grew, each a verb with no item.
- `src/browser/sim/skills.ts`: new exported `targetItem(action)` (the item of an action that `takesItem`, else undefined), `pairCovers(pair, action, item?)` (a pair with no item covers every target of its verb) and `skillsGrowing(action, item?)`; `practiced(practice, action, item?)` now uses the pairs. The calls of `combat.ts` are untouched.
- `src/browser/sim/run.ts`: the one caller that can carry an item (`finishUse` branch) passes `targetItem(action)`. The callers for gather/patrol and explore pass kinds with no item and stay as they were.
- `src/browser/sim/understanding.ts`: `repertoireOf` keeps an action kind where at least one of its pairs is open (a pair is open where a skill among the predispositions grows it or no skill grows it; the pairs of an item kind are its kind with each target of `itemTargets`, the verb alone for a kind with no targets). `actionInRepertoire` and `undiscoveredPart` read the item of an action through `targetItem` (hence `takesItem`) rather than listing craft/tend/equip. `newlyRevealed` lets a tree enter with the first pair it grows whose verb and target the Understanding holds after the minute (verb held = in the Understanding or newly revealed by an event; item held = in the Understanding or newly revealed; at least one of them new); a pair with no item needs the verb alone, as before.
- `tests/sim/data.test.mjs`: the one shape test rewritten for `grownBy`, same pairs and same free actions (title and `decision:` lines unchanged).

## Checks (command and exit code)

| Command | Exit |
|---|---|
| test first: `npm test -- tests/sim/data.test.mjs` after rewriting the test, before the code | 1 (the assertion failed: `skill.grownBy` was `undefined` for each skill, the expected reason) |
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 (45 passed) |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 (32 passed) |
| `npm test -- tests/sim/skills.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/craft-and-tend.test.mjs` | 0 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 |
| `npm test -- tests/sim/rules.test.mjs` | 0 (6 passed) |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (2 tests OK) |

Every one passes with no expectation changed but the shape test. All ran as written. I did not run the whole suite (`npm test` with no file), as the handoff says. Prettier was run on the five files (no remaining diff).

No failing test, so no measure on the base was needed.

## Own-work check (WAY-164)

- **Requirement most likely not met:** the item side of the pairs (a pair naming an item must grow practice only for that item, keep the kind in the repertoire where one pair is open, and bring a tree in only when both verb and target are held with one new). No data names an item yet, so no existing test reaches it.
- **Check:** a probe overlaying data at run time on the built `dist/` (a second recipe item `pestle` copied from the bandage, and a skill `probe` growing `craft+bandage` and `tend+bandage`). File: `reports/executor-1-probe.mjs` (copy under the worktree's `.runs/task-cycles/...`); it ran from a directory `.runs/executor-1/` of the worktree (its imports are `../../dist/...`), command `node .runs/executor-1/probe.mjs`.
- **Showed:** `practiced({}, "craft", "bandage")` gives `{probe: 1}`; with `pestle` or with no item, nothing; `tend+bandage` gives `{probe: 1}`; a mage without `probe` keeps `craft` and `tend` in the repertoire while a second target (`pestle`) has no grower, and loses `tend` (whose only target is the bandage) once `pestle` is removed; with `probe` among the predispositions all three stay. For the tree: a minute that reveals `tend` with the bandage not yet in the Understanding brings no tree; with the bandage held it brings the tree `probe`. First run of the probe failed on my own wrong expectation (`craft` has the bandage alone as target in the data, so its single pair is closed without the skill; code was right), then passed after I added the second target; both runs by the same file, the first with exit 1, the second 0.
- **Not covered by a standing test:** the item-pair paths of `repertoireOf`, `practiced` and `newlyRevealed` are covered only by this probe; Slice 2 adds the real data and its tests. I added no standing test for them because the slice's *Change* lists `tests/sim/data.test.mjs` alone and mutating the shared data in a standing test is a design choice for the cycle.

Mutations considered in my head: `pairCovers` returning true without comparing the item (caught only by the probe), `skillsGrowing` taking all skills instead of the first in `practiced` (no test with two growers of one verb), the `actions.includes(pair.action) ||` term of the tree rule dropped (a tree would enter at the pair's item alone, caught by the probe and, for verb-only pairs, by `discovery.test.mjs`).

## Walkthrough (`walkthrough.md`)

The change alters no behaviour a user sees: the eight skills grow the same pairs and every reader gives the same result for the current data (the tests above, `discovery`, `repertoire` and `skills`, hold the behaviour). I did not open the game in a browser.

## Choices

- **`actionInRepertoire` does not judge an item action by its pair.** The repertoire has no list of predispositions; `repertoire.trees` is the trees among the predispositions that the Understanding holds, and the existing tests (`repertoire.test.mjs`) build repertoires with `trees: []` and actions such as `craft`, so a judgment through `trees` would change behaviour of fixtures the slice must keep. The plan's text says `actionInRepertoire` reads `takesItem`; I did as written. Cost if wrong: when the data names a skill that grows `craft+bandage`, a repertoire keeps the kind `craft` through another target (`pestle`) and `actionInRepertoire` passes the rule `craft+bandage` for a character without that skill. A later slice that adds the new skill must judge the pair at the rule (reading `repertoire.trees` or carrying the predispositions); this is a point the orchestrator should check against the plan for the slices that add the skill and the refusals.
- **Helper placement:** `targetItem`, `pairCovers` and `skillsGrowing` live in `skills.ts`, which both `understanding.ts` and `run.ts` already import; rejected: a helper in `action-targets.ts` (not in the slice's *Change*).
- **`practiced` takes the first skill whose pair covers the action** (as the former `find`); two skills covering the same pair are not forbidden by the code, the data test checks that no verb stands in two skills (as before).
- **Item-less pair for an item verb** (a pair `{ action: "craft" }` with no item) lets a tree enter on the verb alone, and counts as covering every target. No data uses it.

## Reach beyond the dispatch

None beyond the listed files. I read `src/browser/sim/types.ts` (the `Action` type, lines 15-75) and `tests/sim/repertoire.test.mjs` (first 200 lines) to check the shape of actions and the fixtures; `tests/sim/action-targets.test.mjs` by search for how a test overlays data.

## Working copies

`.runs/executor-1/` (the edit script, the logs of the checks, the probe) stood in the worktree and was removed with `rm -rf` by its full path; the probe is kept as `.runs/task-cycles/rana-i-opatrunek/reports/executor-1-probe.mjs`. The first Bash call of the edit script used `python3`, which does not exist on this machine (a Windows store stub); I ran it with `python` and nothing was changed by the failed call.

## Unread material

- `foundations/decisions.md` ranges D-191, D-193, D-195, D-120, D-126, D-443, D-425: read whole.
- `foundations/invariants.md:226-247`, `:1428-1437`, `foundations/glossary.md:5-11`, `:111-135`, `:186-191`, `foundations/part_map.md:34-66`: not read (the slice changes no invariant, glossary or part-map entry and the decisions it needs were read).
- `src/browser/sim/data/items.ts`: read by search only (`TargetProperty`, `ItemId`, `ITEMS`, revealedBy rows), not whole.
- `src/browser/sim/run.ts`: lines 1-60 and 560-730 only; `combat.ts`: lines 80-160 only; `src/browser/sim/data/actions.ts`, `action-targets.ts`, `understanding.ts`, `skills.ts`, `data/skills.ts`, the five guideline files: whole. `tests/sim/data.test.mjs`: lines 620-710 only.
- `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` passages: read in the handoff only, as copied.

## Searches not found or unclear

- Nothing missing. The plan's wording that `practiced`'s "callers pass" the item is met by the one caller that can carry one (`run.ts` `finishUse` branch); gather/patrol take a resource, which is no item, so they pass none.
- Unclear: the plan says the Understanding's tree rule reads pairs "whose verb and target the Understanding holds after the minute". I took a verb unlocked by `treeDiscovered` in that minute as not counting as new (it cannot start the tree it is unlocked by, which would be circular, and today's behaviour is the same).

## Problems observed

None.
