# Report — correction 1, part A: the pair judged at the rule check (task rana-i-opatrunek)

**Status:** done with concerns. The remark is done. The concern is a gap outside it with the same cause, which I found by a probe and did not fix (see *Problems observed*): the target pick of „Wytwórz” in the program editor still offers every recipe item without checking the archetype.

Worktree `the worktree's root`, branch `task/rana-i-opatrunek`, range `83204edc..b04a9f2f`. Nothing pushed.

## The remark, as made

> 1. Reguła z „Wytwórz — Opatrunek” sprawdzana po rodzaju czynności, a nie po parze — **popraw w tym żądaniu.** […] Napraw obie razem u źródła: predyspozycja w typie, który opisuje, co postać może, z parą czynność–cel. Dopisz przypadek testowy z drugim przepisem albo drugim celem (zmyślonym w teście), który dziś przeszedłby błędnie. Zmień cztery testy porównujące ten typ.

How it was made:
- **The source, the type:** `Repertoire` in `src/browser/sim/understanding.ts` is no longer an alias of `Understanding`. It is now `Understanding & { predispositions: readonly SkillId[] }`, a required field. `repertoireOf` sets it to a copy of the predispositions it was given, so `editorRepertoire`, `knownRepertoire` and `programOf` in `game.ts` all carry it unchanged. The Understanding and the saved document are untouched: the field is derived, and a repertoire is never saved.
- **The pair:** for an action that takes an item, `actionInRepertoire` now asks for the kind, the item and `pairOpen(kind, item, repertoire.predispositions)`. `pairOpen` is the existing helper of the same file, over `skillsGrowing`/`pairCovers` of `skills.ts`, so nothing is copied. A pair is open when a skill among the predispositions grows it, or when no skill grows it (D-120). A kind with no item is judged as before. Because `ruleInRepertoire`, `programInRepertoire`, `outsideReason` and the `reach` of `judgeProgram` all go through `actionInRepertoire`, the simulation, the rule signs and the reason all follow. This fixes m-1 and the human's remark together.
- **The reason (D-310):** a rule whose pair is closed while its kind and item are in the repertoire reads „jeszcze nieodkryte: Wytwórz”. This is the label of the kind, the same thing the game already writes when the archetype closes the kind whole. It is not „gałąź niewykupiona”, because the kind is in the knowledge (`known`) as well. The code already reached this through the last line of `undiscoveredPart`; I changed only its comment, so the comment now names this case.
- **The test case asked for** (`tests/sim/action-targets.test.mjs`, written first and seen failing): there are two named variants. Each keeps the kind „Wytwórz” open for a character whose predispositions are the mage's minus `tending`:
  - (1) a laid item `board` with a recipe that no skill grows;
  - (2) a laid item `splint` with a recipe, grown by a laid skill `probe` that is among the predispositions.

  In each, „Wytwórz — Opatrunek” is outside the repertoire and passed over by `programInRepertoire`, with the reason „jeszcze nieodkryte: Wytwórz”. „Wytwórz” with the other item is inside, with no reason. A third case is the converse: with `tending` and without `probe`, the bandage is inside and the splint outside. The rows are laid on the built `ITEMS`/`SKILLS` and taken off again, the same way `tests/sim/tree-entry.test.mjs` lays them. The file is already in `stryker.config.json`, and no new test file was made.
- **The tests that compare the type** (`tests/sim/repertoire.test.mjs`): the four `deepEqual` expectations the fixer counted (the mage's repertoire of `FULL`, the order case, and the two expectations of the tending case, `without` and with it) now expect `predispositions`. So do the three `deepEqual` checks of `editorRepertoire` (outside a run, in a run, a stray run), which expect the mage's predispositions read from `ARCHETYPES.elementalMage` by id. The literals `SMALL` and `bare` now hold the field. No assertion was loosened: each still compares the whole repertoire. The cause lies in the requirement: the remark changes the type.

## Commits

| Commit | What |
|---|---|
| `2998b1aa` | test: the three cases above, failing on the base (its decision quotations failed the foundation check; fixed in the next commit) |
| `b04a9f2f` | fix: `Repertoire` with `predispositions`, `actionInRepertoire` by the pair, the comments of `undiscoveredPart` and of `Understanding` (`types.ts`), the repertoire tests expecting the field, the quotations of D-120 and D-310 begun at their sentences |

Files changed against `83204edc` (added/removed): `src/browser/sim/understanding.ts` +24/−6, `src/browser/sim/types.ts` +2/−1, `tests/sim/action-targets.test.mjs` +100/−0, `tests/sim/repertoire.test.mjs` +24/−6. Total 150 insertions, 13 deletions.

## Checks (command and exit code)

- Failing run on the base, after the test commit and before the code: `npm test -- tests/sim/action-targets.test.mjs` exit 1. 12 passed and 3 failed, each at `actionInRepertoire(...)` with `true !== false` (the expected reason). In the first two the precondition „the kind „Wytwórz” stays open through the other item” passed.
- After the code, each with `npm test -- <file>`, each exit 0, 0 failures: `tests/sim/action-targets.test.mjs` (15; rerun after the quotation fix, 15), `repertoire` (33), `tending` (8), `tree-entry` (4), `data` (45), `rules` (6), `rule-signs` (40), `discovery` (50), `program-counts` (11), `program-list` (34), `program` (19), `tests/view/program-editor` (63), `tests/view/rule-editor` (82), `tests/view/pressure-pick` (7), and also `gear-wear` (16), `skills` (19), `loop` (46), `copy` (12), `encounters` (29), `combat` (11), `death` (33), `pressure` (16), `judging` (20), `gear-condition` (4), `tests/view/program-panel` (60).
- `npm run typecheck`: 0. Before and after the commit. No place passed an `Understanding` as a `Repertoire`.
- `npm test -- tests/quality/test_function_and_file_size.py`: 0 (2 OK).
- `npm test -- tests/quality/test_mutation_test_selection.py`: 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: 1 on the first draft (3 errors: the quotations of D-120 and D-310 did not begin a sentence), then 0 (0 errors) after the fix, also on HEAD.
- `npx prettier --check` and `npx eslint` on the four changed files: clean, 0.
- Not run: the whole suite (the cycle's run, as the handoff says), and StrykerJS (the reviewer's tool for `simulation`, WAY-253).

Breaks the new tests catch:
- `pairOpen` dropped from `actionInRepertoire`, which is the bug of m-1: cases (1)–(3).
- The pair judged without its item (`skillsGrowing(kind)`): (1), (2).
- A pair with no skill that grows it treated as closed: (1).
- `repertoireOf` setting no predispositions or empty ones: (2), (3).
- The reason changed or dropped for this case: (1), (2).

Each of these would be a bug, not a deliberate decision.

## Own-work check

- **The requirement I most likely did not meet:** the rule „Wytwórz — Opatrunek” being refused *in the running game* for a character whose archetype lacks the tree, not only in the unit functions. The editor's signs read `editorRepertoire`/`knownRepertoire`, and the simulation reads `programOf`.
- **The check:** a probe, run from `.runs/correction-1a/` against the built game. It lays an archetype `probeArchetype` (the mage minus `tending`) and the item `board`, sends a character of that archetype with the rules „Wytwórz — Opatrunek”, „Wytwórz — deska”, „Eksploruj” and 4 moss, then prints the activity, `ruleSigns` and `knownTargets(state, "craft")`. Command: `node .runs/correction-1a/probe.mjs` exit 0. The probe and its output are kept as `reports/correction-1a-probe.mjs` and `reports/correction-1a-probe.out.txt`; run it from a directory two levels below the worktree root, for its relative imports.
- **What it showed:**
  - the character starts rule 2 („Wytwórz — deska”), so rule 1 is passed over;
  - the signs give rule 1 `blocked`, „jeszcze nieodkryte: Wytwórz”, and rule 2 `go`;
  - the target pick of „Wytwórz” offers `["bandage","board"]`, both outside and in the map run: see *Problems observed*.

## Choices, with the way rejected

- **The predispositions in the type** (the fixer's shape, the orchestrator's reading). Rejected: a repertoire that holds the open pairs (each kind with its open targets). It would duplicate what `pairOpen` derives from the data, and change every consumer's reading of `actions`. Also rejected: the callers passing the predispositions to each function, which is five call sites and a parameter that can be forgotten. Cost if wrong: one field and one call to undo.
- **A required field, no fallback to the kind**, as the handoff asks. A literal repertoire without it now throws on an item action. Typecheck caught no such place in the source; in the JS tests I gave the field to the literals `SMALL` and `bare`.
- **The reason „jeszcze nieodkryte: Wytwórz”** (the kind's label). This is what the game already writes for a kind the archetype closes whole. Rejected: naming the item, „jeszcze nieodkryte: opatrunek”, which would say the bandage is undiscovered when it is known. Also rejected: a new reason, which D-310 does not give. Cost if wrong: the wording of one case of `undiscoveredPart`. The rule outside the repertoire still says „nieodkryte” for an archetype's closure, as it already did for a whole kind; that wording is D-310's, not mine to change.
- **The test in `tests/sim/action-targets.test.mjs`**, beside the other tests of the bandage's pairs, its `withItems` and its laid `SPLINT`/`BOARD`. Rejected: a new file. This file stays under the size threshold (608 lines with comments; the rule counts code lines only) and is already in `stryker.config.json`.
- **The explicit list `WITHOUT_TENDING`** in the new test, rather than reading the mage's data, so that a later change of the archetype cannot change what the test is about. In `repertoire.test.mjs`, the expectation of `editorRepertoire` reads `ARCHETYPES.elementalMage.predispositions` by id, because D-196 makes the archetype's predispositions the source of that offer.
- **The comment of `Understanding` in `types.ts`** said it was „also the shape of a repertoire”. It now says a repertoire holds the same lists and the predispositions. Read whole before the change.

## Problems observed

- **The target pick of „Wytwórz” in the program editor offers every recipe item the Understanding holds, whatever the archetype.** Observed: `knownTargets(state, "craft")` in `src/browser/view/item-target-pick.ts:51-54` gives `["bandage","board"]` for the character of the probe's archetype without `tending`, outside and in a map run (`reports/correction-1a-probe.out.txt`). In the game, the player of such a character can pick „Opatrunek” as the target, not greyed, and the rule then stands amber with „jeszcze nieodkryte: Wytwórz”.
- **Cause, verified by reading:** `knownTargets` filters `itemTargets(kind)` by the repertoire's items only, not by the pair. This is the same cause as m-1, in the view.
- **Not fixed:** it is a file of `browser-view`, outside the type and the rule check the remark names. With today's data it cannot show, because the one archetype holds `tending`. A fix would be about one line: filter by `actionInRepertoire(editorRepertoire(state), { kind, item })`, or by the pair. It needs a decision on what a held rule whose kind is out of the offer should grey. For the orchestrator: fix it in this correction, or take it to the next task with a second recipe item (task 9's club).

## Reaches beyond the dispatch

- `src/browser/view/item-target-pick.ts`, read whole: to see whether the editor's offer of targets follows the repertoire's pairs (the problem above).
- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`, `tests/quality/eslint-size-rules.mjs` (its head, for the thresholds), `src/browser/sim/data/skills.ts:70-85` and `src/browser/sim/data/archetypes.ts:17-38`: for the fixtures the new test uses, the thresholds, and the pairs of `tending` and the mage's predispositions.
- `src/browser/sim/program.ts:590-670`: for `reach` of `judgeProgram`.

## Working copies

`.runs/correction-1a/` in the worktree held the probe and its output. Both were copied to `reports/` (`correction-1a-probe.mjs`, `correction-1a-probe.out.txt`), and the directory was removed with `rm -rf` by its full path. Listing `.runs/` afterwards found no `correction-1a`. No remainder. `dist/` was rebuilt by the test runs.

## Unread material

- `src/browser/sim/game.ts`: read lines 170-249 (`programOf`, `ruleSigns`) and the import lines found by search, not whole. It is not changed; its call of `repertoireOf` carries the field with no change.
- `foundations/decisions.md`: only the seven entries named, each whole.
- `guidelines/styleguide-browser-view.md`: not read. No file of `browser-view` was changed.
- Everything else the handoff names was read whole.

## Searches not found or unclear

- No place in `src/` or `balance/` passes an `Understanding` where a `Repertoire` is expected. The typecheck found none, and `repertoireOf` is called only in `understanding.ts` and `game.ts`; the Grep had a positive control.
- The fixer counted four `deepEqual` expectations. I found seven that compare a whole repertoire (the four, plus the three of `editorRepertoire`), and changed all of them.
