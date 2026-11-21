PASS 856fa86063c3b23533ee75ce556c5db47c475d61

# Review of slice 10 — the program check, the repertoire and the targets of the two verbs

Range `9e867128d33b47d432ede8448124c03a62875fb4..856fa86063c3b23533ee75ce556c5db47c475d61`, one commit
`856fa860`. `git rev-parse HEAD` in the worktree gave `856fa86063c3b23533ee75ce556c5db47c475d61`, the head
of the dispatch. Files: `src/browser/sim/programs.ts`, `src/browser/sim/understanding.ts`,
`stryker.config.json`, `tests/sim/action-targets.test.mjs` (new), `tests/sim/previous-programs.test.mjs`,
`tests/invariants/test_program_closed_lists.py`, `tests/invariants/test_program_world_reference.py` — exactly
the section's *Change*.

## Findings

### Critical

none

### Important

none

### Minor

1. `tests/sim/action-targets.test.mjs:236-276` („the check refuses either verb with a target the data do not
   give it, and names the value”): the helper `named` (`tests/sim/action-targets.test.mjs:99-103`) rebuilds the
   product's own rule of `shown` (`src/browser/sim/programs.ts:35-37`) — an object is named „an object”. For a
   primitive, the expectation (its text) follows from the spec's „naming the value”; for an object, the words
   „an object” are a wording the code chose, not one the spec or a decision gives, so a correct change that
   named an object otherwise (its JSON, its type) fails the test. `guidelines/testing.md`, „Behaviour, not
   implementation” and the unit-test recipe's „Bez odtwarzania algorytmu produktu”. Also, the case `""`
   asserts `error.message.includes("")`, which is true of every message, so for that value only the type of
   the refusal is checked. Neither weakens the refusal itself, which each case asserts by
   `instanceof ProgramCheckError`. Minor: polish of the test's expectation.

## What I checked against the task and the foundation

- **Spec Decision 3 unit 2 / To do 6 / D-443.** `checkAction` (`src/browser/sim/programs.ts:181-185`) builds
  `craft` and `tend` from `kind` and `item` alone and calls `checkTarget` (`:69-84`), which accepts only a
  string strictly equal to one of `itemTargets(kind)` read at the call, and otherwise throws
  `ProgramCheckError` naming the value. No item identifier stands in the code; `itemTargets`
  (`src/browser/sim/action-targets.ts`, Slice 7) reads `Object.keys(ITEMS)`, so `__proto__`, `constructor`,
  `toString` are no targets (covered by the refusal table). D-443's *violates* list — a list of the items
  „Opatrz” takes written in the code — is not met by the code.
- **Through the one check at every boundary.** Editor: `setProgram`, tested outside and inside a map run.
  Reader of a previous save (`src/browser/sim/previous-programs.ts`): calls only `checkProgram`; the new cases
  of `tests/sim/previous-programs.test.mjs` show the skip with the name, the reading going on, and the dropped
  extra field appended without it. Load (`src/browser/sim/saved-game.ts:259-268`): `checkProgram` then
  `matches(value, checked)`, so an extra field is refused; checked by my own crafted documents (below).
- **Spec Decision 3 unit 3 / D-126 / D-120 / D-193 / To do 10.** `actionInRepertoire`
  (`src/browser/sim/understanding.ts:111-113`) needs the kind and the item; `undiscoveredPart` (`:228-232`) names
  `ITEMS[item].name`. `src/browser/sim/data/skills.ts` lists neither `craft` nor `tend` in any skill's
  `actions`, so `repertoireOf` keeps them open with no predisposition and `practiced` adds nothing; the test
  shows both. The D-126 case runs a real map run where the known case starts rule 1 and the unknown case
  passes to rule 2 with the program unchanged.
- **Acceptance criterion (simulation part).** A second item (`splint`) laid on the built `ITEMS` and removed
  in `finally` becomes a target of both verbs, is taken by `setProgram` in and out of a map run and lies in
  the repertoire, with no change of code; the keys of `ITEMS` are compared before and after, and moss is no
  target. The recipe-only and healing-only rows show each property gives its own verb alone.
- **Settlement row 1 / D-289 as row 10 changes it.** The bandage is refused as the resource of „Idź”,
  „Zbierz”, „Obchód” and „Tu leży mniej niż” (rule and group), in and out of a map run, with „Zapas poniżej —
  opatrunek” accepted as the control.
- **Spec Decision 4 / D-443 second sentence / To do 11 / D-401.** The version-9 document holding every action
  kind of today is read, checked and appended with exactly its content.
- **Invariant tests changed (named as the method asks):** `tests/invariants/test_program_closed_lists.py`
  (`program-closed-lists`: `ACTION_KINDS` gains `tend` and `craft` in the data's order, `VALID` holds both with
  the bandage, `"craft"` leaves `UNLISTED_ACTION_KINDS`, `item` joins `PLAUSIBLE_FIELDS` — a strengthening, not
  a weakening; the docstring's *Does NOT cover* names the targets as the tests of the targets') and
  `tests/invariants/test_program_world_reference.py` (`program-world-reference`: `ITEM_IDS` gains `bandage`,
  LEGIT gains programs of the two verbs, NAMING and the controls gain the verb with an item by index, as a
  tile's label, as a non-identifier and with a position). Both say what the invariants say; neither changes an
  expectation of a kind of today.
- **`decision:` lines.** Each quotes its entry word for word (D-443 first and second sentences, D-126, D-120,
  D-289 second paragraph, D-310's last clause, D-401) — compared with the entries as they stand.
- **Guidelines.** `guidelines/coding.md` (size: `checkAction` and both files stay under D-425's thresholds,
  `node tests/quality/eslint-size-rules.mjs` reports 0), `guidelines/coding-simulation-module.md` (no system
  time, no input changed — the test's mutation of `ITEMS` is in a test and restored), `guidelines/testing.md`
  (data chosen by identifier; preconditions marked; the trust-boundary cases carry
  `// invariant: previous-save-programs-reader`; the new file is in `tap.testFiles`).
- **Code made for a test (WAY-409):** none found; no branch or value in `programs.ts` or `understanding.ts`
  names `splint`, `board`, `salve` or any test input.
- **Reserved choice:** none taken.
- **Author's own-work check.** It names the load, the boundary with no test in this slice, and checks it with a
  one-off script; my own crafted documents agree.
- **Walk through the running product.** The executor judges no user-visible change: the check now accepts
  two kinds that no screen offers yet. That agrees with the diff — the editor's pick and the scene are not
  touched here, and the change only widens what the check accepts for `craft`/`tend`.
- **The failing `tests/sim/saved-game.test.mjs` (19 of 45).** Not named by the section. The failures are
  hand-written documents of the current version refused as `shape` (e.g. „a document of the current version
  loads into the state it describes”: `ok: false, reason: 'shape'`). This slice cannot cause a new load
  refusal: its change to the check only adds the cases `craft`/`tend`, which threw before, and touches
  nothing else the load reads; the executor reports the same 19 by name on the base `src/`. No finding of
  this slice; the saved-game slice (version 10 and the backpack's keys) owns it.

## Mutation testing (`guidelines/testing.md`, „Mutation testing”)

Stryker on the changed lines (`programs.ts:69-84,181-185`, `understanding.ts:111-113,228-232`): 34 mutants,
30 killed, 4 survived, 0 without coverage. Each survivor classified:

- `programs.ts:76` `typeof value !== "string"` → `false`: **equivalent** — `itemTargets` returns strings and the
  comparison is strict, so a non-string never matches.
- `understanding.ts:229` three mutants (`→ true`, `&&` → `||`, `(kind test) → true`): **equivalent** —
  `undiscoveredPart` is called only from `outsideReason` after `ruleInRepertoire` is false, and once the
  condition, its target, the action's kind and a resource target are known, the only way to be outside the
  repertoire is a `craft`/`tend` whose item is unknown; the final `return ACTIONS[action.kind].label` is
  unreachable for any other action, as the guard of the resource actions above it already is.

No real gap.

## Declined to judge

- `tests/sim/saved-game.test.mjs` failing 19 of 45: outside this slice (see above); the saved-game slice owns
  the documents of the current version without the bandage.
- The editor's pick, the scene and the balance instrument taking the verbs (D-443 *Verification*, D-289's
  greyed „Wytwórz”/„Opatrz”): other slices of the plan; this slice's section names only the simulation part.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/action-targets.test.mjs` | 0 | 12 passed |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | 25 passed |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 | 4 OK |
| `npm test -- tests/invariants/test_program_world_reference.py` | 0 | 3 OK |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 | 32 passed |
| `npm test -- tests/sim/program.test.mjs` | 0 | 19 passed |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | 1 OK |
| `npm test -- tests/sim/saved-game.test.mjs` | 1 | 19 of 45 failed, all hand-written current-version documents refused as `shape` (not this slice) |
| `npm run typecheck` | 0 | |
| `npx eslint` on the two TS files and the two changed `.mjs` tests | 0 | |
| `npx prettier --check` on those four files and `stryker.config.json` | 0 | |
| `node tests/quality/eslint-size-rules.mjs` | 0 | 0 functions and files over a threshold in 340 files |
| `ruff check --config ruff.toml` and `ruff format --check --config ruff.toml` on the two Python tests (Ruff of the main checkout's `.runs/quality-venv`; the worktree has none) | 0 / 0 | all passed, 2 files already formatted |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run <copy of stryker.config.json without tests/sim/saved-game.test.mjs> --mutate <changed lines>` | 0 | 30 killed, 4 survived (all equivalent, above). The run with the repository's own config stopped at its dry run (exit 1) because `tests/sim/saved-game.test.mjs` fails; the copy dropped that one file, so the survivors were judged without it |
| One-off load check (`node .runs/review-10/load_check.mjs`): a document made by `savedGame` from a game whose program holds „Wytwórz — Opatrunek” and „Opatrz — Opatrunek”, outside and inside a map run, then the action at the list's program and at the run's copy replaced by `craft`/moss, `tend`/stick, `craft` with no item, `tend`/`unobtainium`, `craft`/`__proto__`, `craft`/`null`, the valid action with an extra `at`, the valid action with an extra `resource` | 0 | valid documents load (`ok: true`); each of the 24 crafted documents refused `ok: false, reason: "shape"`; none threw |

Not run: the full gate (`npm test` with no argument), held by the orchestrator; `foundation_check.py`, which
is part of the gate.

## Reaches beyond the dispatch

- `foundations/decisions.md:8155-8180` D-443 — read whole: the new decision the slice's `decision:` lines
  quote and the plan's „Foundation entries row 1”.
- `foundations/decisions.md:9926-9936` D-310 (heading and first paragraph) — to check the quotation of the
  reason test's `decision:` line, which cites D-310, not D-289.
- `src/browser/sim/action-targets.ts`, `src/browser/sim/data/skills.ts` (the `actions` of each skill),
  `src/browser/sim/skills.ts` `practiced`, `tests/sim/understanding-fixture.mjs` `fullUnderstanding`,
  `src/browser/sim/saved-game.ts:240-283` (`matches`, `program`, `action`), and the `naming` reader of
  `tests/invariants/test_program_world_reference.py:393-453` — to judge what the tests and the check rest on.
- `tests/sim/catch-up.test.mjs` imports — to find `withSaveTime` for the one-off load check.

## Working copies

- `.runs/review-10/` in the worktree (`.runs/review-10`):
  the logs of the runs, the one-off `load_check.mjs`, the review copy of the Stryker config and its JSON
  report. Removed before returning, by its full path.
- `.stryker-tmp/` in the worktree (`.stryker-tmp`),
  left by the Stryker run that stopped at its dry run (`sandbox-ghaqSq`). Removed before returning, by its full
  path. No worktree or clone was made. `dist/` of the worktree stands rebuilt from the head by `npm test`
  (the product's own output).

## Unread material

- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`, `spec.md` and the plan: not opened; I read
  the passages the dispatch copies word for word, as the dispatch gives.
- `foundations/part_map.md:91-126` build-tools: read. Every other entry and guideline file the dispatch names
  was read whole: D-425, D-23, D-26, D-126, D-120, D-193, D-401, D-289; the invariants
  function-and-file-size, program-closed-lists, program-world-reference, program-rule-pick,
  previous-save-programs-reader; glossary Understanding and repertoire; part map simulation;
  `guidelines/coding.md`, `guidelines/testing.md` (in two pages), `guidelines/coding-simulation-module.md`,
  `src/browser/AGENTS.md`; `src/browser/sim/previous-programs.ts`, `data/items.ts`, `data/actions.ts`,
  `types.ts:41-80`.
- Of `tests/invariants/test_program_closed_lists.py` and `test_program_world_reference.py` I read the diff
  and the reader `naming`, not the whole files.

## Searches not found or unclear

- The handoff's „Foundation entries row 1” and its first and second sentences: the plan's table is not in the
  dispatch; I took them to be D-443's two sentences, as the `decision:` lines and the executor do. Unclear only
  in the handoff, not in the code.
- `.runs/quality-venv` does not exist in the worktree; Ruff was taken from the main checkout's
  `the quality environment of the main checkout (outside this worktree)`.
