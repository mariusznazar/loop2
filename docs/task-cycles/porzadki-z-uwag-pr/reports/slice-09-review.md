PASS f7f0726

# Review of Slice 9 (`378259f..f7f0726`), worktree `the root of the repository`

`git rev-parse HEAD` is `f7f0726cae13180aecf49466af9f029c3dc9daee`. The range is one commit, two test files, 124 lines added, no product file touched (`git diff --stat 378259f..f7f0726`). `git status --short` is empty at the end of the review.

Blocking findings: 0. Minor: 2 (one in scope, one outside the task). Changed invariant test: none changed. Four new tests carry `// invariant: save-version` (the two-characters, program-counter, death-mark and group-name tests); no existing test changed.

## Findings

### Blocking

None.

### Minor

1. **Minor, outside the task's scope.** `src/browser/sim/saved-game.ts:512`, `if (id >= nextCharacterId || ids.has(id)) refuse();`. StrykerJS leaves one mutant alive on the lines the slice guards: `id >= nextCharacterId` turned into `id > nextCharacterId`. No test refuses a document whose character has exactly the number `nextCharacterId` while the rest of it is sound. The existing case "a character's number reaching the next one" (`tests/sim/saved-game.test.mjs:1148`) sets `nextCharacterId = 2` while Ewa has number 3, so it is refused even with `>`; it does not isolate the fault. Classification: real gap. Why it matters: a load that takes such a document would later give the next new character a number already held. Why outside the task: task.md To do 13 names the counter check only for programs (`:484`, killed); for characters it names only the duplicate (`:512` `ids.has(id)`, killed). Fix would be one test on the clean base `HEADQUARTERS` with `nextCharacterId` 1. Evidence: Stryker output below.
2. **Minor, within the task.** `tests/sim/saved-game.test.mjs` (new test "a chest holding exactly its capacity loads, and one piece beyond it is refused as shape", comment at about line 1776). It holds a refusal of a crafted document at the `save-version` boundary but carries no `// invariant: save-version` tag, while the other four refusal tests of the slice and the existing refusal tests carry it (`guidelines/testing.md`, Trust boundaries: a refusal test is tagged with its invariant). The test with the same tag gap, "a completion depositing exactly the planned counts loads", only loads and asserts no refusal, so it needs none. Does not change what the tests catch; the grade is Minor because the saved-game boundary keeps its tagged tests elsewhere.

Not findings (checked):
- The chest test writes the literal 60 for `chestCapacity` (`src/browser/sim/data/balance.ts`). The comment names the source, as "Where the expected value comes from" asks; a balance parameter may use concrete numbers (D-80). A later change of the capacity would redden the test and the author would update both, which is the intended coupling.
- No assertion pins refusal wording, an internal index or an order. `assertRefused` compares the reason code `shape`, which the saved-game guideline and D-213 fix as the contract; the free text names only the failure message.

## Questions of risk, computed

### The seven new tests: one fault each

I ran a scratch copy of the test file (under `.runs/scratch-review`, removed again) with control cases on the same bases:
- Chest: `{stick: 60}` loads, `{stick: 61}` is refused, `{stick: 60, berry: 1}` is refused. Only the count differs.
- Deposit: `[{berry 5},{stick 20}]` loads; `[{berry 6},{stick 20}]` is refused. The planned counts come from the document's frozen bring plan (`berry` 5, `stick` 20), D-179 and the saved-game guideline ("each at most in the planned count"), not from the load's output.
- Two characters of one number: `HEADQUARTERS` loads on its own (asserted in the test); the same document with a second character of number 1 is refused; with number 2 and `nextCharacterId` 3 it loads. A name change ("Ewa") is not needed for the fault (a second character with a repeated name and a distinct number also loads) but does no harm.
- Program not below the counter: program 2 with `nextProgramId` 2 is refused; the same program with `nextProgramId` 3 loads. No record names program 2, so no reference fault is present.
- Death with a wrong mark: on `dead(DOCUMENT)` the mark false on the unsolved map loads, mark true on the unsolved map is refused; after `solvingItsMap` mark true loads, mark false is refused. Each of the two cases is therefore refused for the mark alone. The expectation (the mark is the state of the map when the run started and stays to the end, D-214; the code compares it with the map's being solved at the load) follows D-214 and D-55, not a pinned output.
- Group name that is no text: `HEADQUARTERS` loads with "Program"; with `7`, `null` and `["Program"]` each is refused. The empty string and "x" load, so the test pins "no text", not any length.
- Loop generation: see below.

Expected values come from decisions, the glossary and the documents themselves in every case.

### Defect 16 (`typeof group.name`)

Removing the `typeof` check alone does fail the TypeScript build (the field would be `unknown`); the executor's report says so and the code agrees (`programs.ts:276` builds `name: group.name`). The runtime guard is nevertheless real: the saved game is JSON, the type system sees nothing of it, and what the type system forces is that some check exist, not that it be right. I made the defect as `typeof group.name !== "string" ||` replaced by `false ||` in a copy of the compiled `programs.js` (not the product): the old `saved-game.test.mjs` at `378259f` passes (exit 0), the new one fails exactly "a program whose rule group's name is no text is refused as shape" (exit 1). Graded: the new test protects behaviour of the real load at runtime, not only a type guard. StrykerJS reports the three mutants of `programs.ts:249` killed, none uncompilable. No finding.

### Mutation testing (StrykerJS on the lines the new tests guard)

Command: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:373-373,src/browser/sim/saved-game.ts:484-484,src/browser/sim/saved-game.ts:512-512,src/browser/sim/saved-game.ts:775-775,src/browser/sim/saved-game.ts:980-980,src/browser/sim/loop.ts:408-410,src/browser/sim/programs.ts:249-249"`, exit 0, 2 min 30 s. 45 mutants: 44 killed, 1 survived, 0 timed out, 0 errors, 0 uncovered. By file: `loop.ts` 4 of 4, `programs.ts` 3 of 3, `saved-game.ts` 37 of 38.

Surviving mutant: `saved-game.ts:512:9` `id >= nextCharacterId` to `id > nextCharacterId` (EqualityOperator). Classification: real gap, outside the task's list (Minor finding 1). No other survivor, so no equivalent, uncompilable or not-worth-fixing mutant to classify.

To tell which test kills what (Stryker lists files, not tests), I applied each defect by hand to a copy of `dist/` under `.runs/scratch-review/x` and ran the old (`378259f`) and new test file of saved-game:

| Defect (on compiled copy) | Old file | New file |
|---|---|---|
| 12a chest `>` to `>=` (`saved-game.ts:373`) | exit 0, passes | exit 1, only the chest test fails |
| 12b deposit `>` to `>=` (`:775`) | exit 0 | exit 1, only the deposit test |
| 13a `ids.has(id)` removed at characters (`:512`) | exit 0 | exit 1, only the two-characters test |
| 13b counter check removed at programs (`:484`) | exit 0 | exit 1, only the program-counter test |
| 14 mark not compared after a death (`:980`) | exit 0 | exit 1, only the death-mark test |
| 16 `typeof group.name` replaced by `false` (`programs.ts:249`) | exit 0 | exit 1, only the group-name test |

So each of the six saved-game defects passes every test at `378259f` and is caught by exactly its new test. A control: the stronger defect "no mark comparison at all" (`run.completion ? !mapSolved : false`) is already caught by the old crafted-document case, which is why the executor's reading of defect 14 (the comparison skipped for a death only) is the right one for the gap.

### Defect 15 (`generationOf` reading `characters[0]`)

I ran every `tests/sim/*.test.mjs` file against a copy of `dist/` with `generationOf` returning `state.team.characters[0].generation`. Only `tests/sim/loop.test.mjs` fails, and only the new test "a loop of a character other than the first that stops in passing writes that character's own generation". `tests/sim/catch-up.test.mjs` passes (it uses `generationOf` in `catchUp` but does not read the generation of a non-first character), as do all other files except `tests/sim/rules.test.mjs`, whose failures come from the scratch layout (it reads `src/`), not from the defect. The new test is therefore the only one that fails; it is not redundant. Stryker kills the four mutants of `loop.ts:408-410`. The new test asserts the stopped line's `stop` as `{ generation: 2, away: false }`: 2 follows D-190 and the glossary (creation 1, grown by one at a death with no resurrection ready), not today's output; Ala (first) stays at 1, so the two characters tell the defect apart. The test calls `passLoops` (the function the open game's clock uses); `catchUp` shares `generationOf`, so the defect shows there too. `tests/view/` was not run against the defect (not in the range's reach).

## Against the foundation and the guidelines

- D-213 / `save-version`: every crafted document is refused whole, with reason `shape`, and the load does not throw (`assertRefused` also asserts `doesNotThrow`). Rule "Odmowa zamiast wyjątku" holds.
- "Where the expected value comes from", "Behaviour, not implementation", "Test inputs and expected values", "Changing an existing test" (no existing test changed): met. The tests are unit tests on the real simulation, one behaviour each, own data per case (`structuredClone` through `changed`).
- Trust boundary (`src/browser/sim/saved-game.ts`): the slice adds only refusal tests of crafted input; hostile input at the boundary is the subject of the tests, not a risk of the change.
- No reserved choice taken; no UI; no irreversible operation.
- Format: `npx prettier --check tests/sim/loop.test.mjs tests/sim/saved-game.test.mjs` exit 0.
- Process claims of the executor verified by me where they bear on the grade: the defect-in-place failures (above, independently), the passing state of the committed files (the scratch runs of the new files without a defect passed; control run listed 16 of 16 tests passing in the scratch copy), the base documents loading.

## Declined to judge

- The choice to test `passLoops` and not `stopLoop`/`catchUp` for item 15: the task (`task.md:49-53` item 15) says "stopping the loop"; in the code the generation is written only where a loop stops in passing, and the executor's adaptation is sound. Not set aside as a defect; noted so the orchestrator sees the plan's wording and the test differ.
- A test for `catchUp` writing the generation of a non-first character: not asked by the task; same `generationOf`.
- Whether the full gate (`npm test`) and `foundation_check.py` pass: the cycle runs them before the request; not repeated.

## Checks run (command and exit code)

- `git rev-parse HEAD` is `f7f0726...` (match); `git diff 378259f..f7f0726`, `git log 378259f..f7f0726`: read.
- StrykerJS restricted to the lines of the slice (command above): exit 0; 44 of 45 mutants killed.
- Scratch controls (`node --test .runs/scratch-review/scratch.test.mjs`, a copy of the new saved-game test file with extra control cases): exit 0, 16 of 16 pass (including the controls that show each base loads and each sibling document refused or loaded as listed).
- Scratch mutations by hand on a copy of `dist/` (script `.runs/scratch-review/mut.py`): old and new saved-game test file against defects 12a, 12b, 13a, 13b, 14, 14b, 16: results in the table above.
- Defect 15 on a copy of `dist/`, all `tests/sim/*.test.mjs`: only the new loop test fails (and `rules.test.mjs` for the layout reason).
- `npx prettier --check` on both test files: exit 0.
- Not run: `npm test` without arguments, `foundation_check.py` (cycle's own run); `tests/view/` against defect 15.

## Reach beyond the handoff (what, where, why)

- `src/browser/sim/data/balance.ts` is not read by me; I took `chestCapacity` 60 from the control case (`{stick: 60}` loads, `{stick: 61}` refused), which shows the number from behaviour.
- `foundations/decisions.md` D-213, D-214, D-55, D-179, D-190 and `foundations/invariants.md` `save-version`, `death-settled-once`, `foundations/glossary.md` entries: read as the handoff names them, in the lines it gives (not whole headings beyond that range for D-206, D-56, D-165, D-50, D-245, `program-closed-lists`, `part_map.md`, which bear on neighbouring behaviour, not on the verdicts above). D-352 to D-354: not read; the executor says they are about the browser view and the account server, and no file of those parts is in the range.
- `guidelines/coding.md` and `guidelines/coding-simulation-module.md`: not read whole; the range changes only test files, and the rules that apply to them are in `guidelines/testing.md` and `guidelines/coding-saved-game.md`, both read whole. I name this because the handoff asks for them.
- `tests/sim/saved-game.test.mjs` lines 40-110, 540-760, 1135-1160 and the changed region; `tests/sim/loop.test.mjs` head and the changed region: for the helpers `changed`, `dead`, `solvingItsMap`, `assertRefused`, `HEADQUARTERS`, `DOCUMENT` and the case at `:1148`.
- `src/browser/sim/saved-game.ts` around lines 373, 484, 512, 775, 980; `src/browser/sim/loop.ts` around 400-415; `src/browser/sim/programs.ts` 240-285: the lines the handoff names.
- `stryker.config.json`: to see which files take part in the mutation run.
- Scratch files under `.runs/scratch-review` (a copy of the test file with controls, a copy of `dist/` with hand-made defects): created for the checks above and removed; `.stryker-tmp` and `.runs/stryker` did not exist before and are removed again. `git status --short` is empty.

## Searches not found or unclear

- Not run: whether `tests/view/` catches defect 15 (not needed: the new loop test fails regardless).
- Unclear: the plan says "stopping the loop"; the stop that writes a generation is the stop in passing (`passLoops`/`catchUp`). The executor's adaptation matches the code; I found no mismatch of lines or values (`saved-game.ts:373`, `:484`, `:512`, `:775`, `:980`, `loop.ts:408-410`, `programs.ts:249` have the content the task names).
- Otherwise none.
