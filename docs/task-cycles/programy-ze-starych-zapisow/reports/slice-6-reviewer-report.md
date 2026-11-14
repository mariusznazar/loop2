FAIL 6a9283c43ec304ed6db495a0b56f4e24829fdc1e

# Slice 6 review: the reader of programs from a previous save and the append

Range `19ea8b1c..6a9283c4` (one commit, 7 files, +758 -1). `git rev-parse HEAD` is `6a9283c43ec304ed6db495a0b56f4e24829fdc1e`, as given. I changed no tracked file; `git status --short` is empty after my runs.

Counts: blocking 3 (Important), Minor 5, out of scope 0.

## Summary

The code is correct as far as I could probe it. The reader and the append match the spec: strict items, only `ProgramCheckError` is a skip, the trimmed name is appended, numbering follows D-169. All named tests pass. Three things block the slice:

- The changed files fail `prettier-source-format`, an invariant of the product's gate.
- The mutation run shows two tests that do not fail when the requirement they name is broken. One is "only the check's own refusal is a skip". The other is "an item has exactly the keys id, name and program".

## Findings

### Important (blocking)

**I1. Three changed files fail the formatter invariant `prettier-source-format`.**
- Where: `src/browser/sim/previous-programs.ts` (3 changed lines), `tests/sim/previous-programs.test.mjs` (43 changed lines), `tests/sim/program-list.test.mjs` (4 changed lines, e.g. line 479-481: `appendPrograms(before, [\n { name: "Las", program: EXPLORING },\n ]);` is one line for Prettier).
- What is wrong: `guidelines/coding.md` (Formatter) and the invariant `prettier-source-format` require the layout Prettier leaves. The invariant's own command, with its patterns (`src/browser/**`, `tests/**`), reports exactly these three files and no other file of the repository.
- Why it matters: `tests/quality/test_quality_invariants.py::test_prettier_source_format` fails in the full gate, so the change cannot merge as it stands. The executor ran the named slice checks only, not the formatter, so the failure was not seen. The executor's report does not mention it.
- Evidence: command in the check list below, exit 1, the three files listed; `prettier` without `--check` and a diff gives the 3, 43 and 4 changed lines. Fix: run Prettier (default options) on the three files.

**I2. The test "an error that is no refusal of the check propagates out of the reading" does not test what its title and the `guidelines/testing.md` row say; breaking the requirement passes every test.**
- Where: `tests/sim/previous-programs.test.mjs:501-513` against `src/browser/sim/previous-programs.ts:88-93`.
- What is wrong: the test makes the document's `game` descriptor throw. That throw happens in `readPreviousPrograms` outside the `try` of `readItem`. So the `catch` that must pass on every error other than `ProgramCheckError` is never reached by any test. The Stryker mutant `if (true) return { kind: "skipped", name };` at line 91 (the catch skips every error) survives.
- Why it matters: the requirement is in the spec (decision 4: "only `ProgramCheckError` is a refusal; every other error propagates"), in D-395 and the invariant `previous-save-programs-reader`, and `guidelines/coding-saved-game.md` ("Blad kodu nie jest odmowa"). A change that turns a fault of `checkProgram` into a quiet skip is what a trust-boundary test must catch. Its own comment says "Fault: the reading catches every error as a refusal", but the test cannot show that fault.
- Evidence: mutant survives in `.runs/stryker/mutation.json` (scratch copy `the cycle's scratch directory/mut1.json`). My probe `scratchpad\probe.mjs` shows the real code does propagate: an item `{ id, name: "Las", program: new Proxy(P, { get() { throw new TypeError("boom") } }) }` makes the read throw `TypeError boom`. A test of that form (the throw inside `checkProgram`) fails under the mutant.

**I3. No test has an item with the right number of keys but a wrong one among them; the weaker rule "some key matches" passes every test.**
- Where: `src/browser/sim/previous-programs.ts:38-43` (`hasExactKeys`), tests at `tests/sim/previous-programs.test.mjs:211-254`.
- What is wrong: the Stryker mutant `keys.every(...)` -> `keys.some(...)` at line 41 survives. Present tests give an item with a fourth key (length differs) or an item with a missing key (length differs), never `{ ident: 1, name, program }` (three keys, `id` replaced). With `some` such an item would be read and appended.
- Why it matters: "exactly the own data keys `id`, `name`, `program`" is the strictness the spec, D-395 and the invariant name for a document from the network. The executor's own deliberate break (`hasExactKeys` always true) was caught, but this narrower break is not. The `guidelines/testing.md` row lists the case "an item with a key besides id, name and program..." as proof of the strictness, and it proves only half of it.
- Evidence: mutant at line 41 survives (`Survived MethodExpression`). My probe: `{ ident: 1, name: "Las", program: P }` is skipped by the real code (`{"kind":"skipped","name":"Las"}`), so a case with it fails under the mutant and passes under the code.

### Minor

**M1. Non-plain objects and `undefined` are not tested although the spec says "plain object".** Survivors / no-coverage at `previous-programs.ts:23:7` (`typeof value !== "object"` dropped), `:26:10` (`return true`), `:26:44` (two no-coverage mutants: the null-prototype path). My probe shows the real code is right for `undefined`, `Object.create(null)`, a `Map`, a class instance as document or item (all handled, none throws). With `typeof ... !== "object"` dropped, `undefined` as an item would throw in `Object.getPrototypeOf`; no test passes `undefined` or a non-plain object. These are not JSON values, so no harm today; a test row each would pin the rule.

**M2. Defence in depth that no test reaches (equivalent for JSON values).** Survivors at `:47:32` (list prototype), `:49:7` (key count of the list), `:53:9` (accessor element), `:62:5` (`typeof value === "number"`), `:87:7` and the no-coverage `:87:24`, `:87:32` (own `program` key missing after the key check). For a JSON document each is either shadowed by another check (a hole is caught by `:49` or by `:53`, whichever stands; `Number.isSafeInteger` refuses a non-number) or unreachable (a getter or a subclassed array is no JSON value). Class: equivalent for documents the page can hand over; I would keep them.

**M3. The sweep of crafted values has no deep or large list.** The handoff asks for "deep or large lists". `HOSTILE_VALUES` has none. I ran both by hand: a 5000-deep object as a program gives a skip, a 200000-item list reads (`probe.mjs`), no throw. The code needs no change; a test would only record it.

**M4. `guidelines/coding-simulation-module.md:25` is a ragged table row.** The new row `| src/browser/sim/previous-programs.ts | copy     | —        |` does not align with the columns of the others. Cosmetic; the file is Markdown and no check reads it.

**M5. The skipped name is shown trimmed, and a name of spaces is named by place.** The spec says "its name where that is a non-empty text, else its place". A name of spaces is a non-empty text in the literal reading; the executor reads "non-empty" as non-empty after trimming, which agrees with D-395 ("its name is not empty after trimming") and gives a readable sentence. Judged acceptable, no finding; the orchestrator may want the spec's word aligned to D-395.

## Judgements the handoff asked for

- **`previous-save-programs-reader` added to the Trust-boundaries invariant line of `guidelines/testing.md`.** Right: the invariant has Part `simulation` and the new row names it, so the line must list it. Keep it.
- **Parameter named `saved`, not `document`.** Right: `tests/invariants/test_simulation_isolation.py` flags a host global name; `saved` is a neutral name and the isolation check passes (exit 0).
- **Trimmed name for a skipped item.** Acceptable (see M5); the appended name is the trimmed one, so both agree.
- **`appendPrograms` returns `GameState`, not `GameResult`.** Matches the spec (decision 4: "returns the game state with them appended") and `guidelines/coding-simulation-module.md` ("a helper ... may return its own fitting type"). Neighbouring list functions return `GameResult` with `events: []`; here no event arises. Acceptable. The page must wrap if it wants a `GameResult`.
- **Gaps carried to me.** `save-version` (E13) I read (`foundations/invariants.md:1028-1037`): the reader's version test markers (`// invariant: save-version`) fit it ("except the programs ... pulled ... one by one, each accepted only through the check"). The tests of `program-list.test.mjs` lines 129-327 and 341-412 I did not read; I ran the whole file (33/33 green) and read the diff, which only appends. No conflict seen.

## Checks of the change against the spec, task and foundation

- **Reader (`previous-programs.ts`).**
  - Unreadable is as the spec says: plain object, own `version` a safe integer 1..`SAVED_GAME_VERSION`, own `game` a plain object, own `programs` a list without holes (the test file has 6 and 0, 1.5, 2^53, null, a hole).
  - Items are strict (`id`, `name`, `program`). `id` is not read at all (probe: any value accepted). The name is trimmed and non-empty. The program goes through `checkProgram(content, null)` and nothing else.
  - Only `ProgramCheckError` is a skip (the catch is correct; its test is I2).
  - Own data descriptors are used, so getters and inherited keys are not read. The reads that the test sees (document `version`, `game`, game `programs`, item `name` and `program`) lie in the allowed set, and no other key of the document is read. The test for that uses Proxies and passes.
  - Result shares nothing with the document (`checkProgram` builds new objects; the test mutates the document afterwards).
  - Hostile probes: `undefined`, `Object.create(null)` document, `Map` item, class item, `__proto__` own key, symbol key, non-enumerable extra key, a name object with a throwing `toString`, a version object with a throwing `valueOf`, 5000-deep program, 200000-item list: none throws, each result is as the spec says.
- **Append (`programs.ts:450-486`).**
  - Order, numbering from `nextProgramId` and `nextProgramId` rising by the count, the case-folded set including earlier appended names, "Las (2)", "Las (3)", "Las (2) (2)" per D-169 (comparison by `toLowerCase`, as `programName` does), nothing else of the state changes. Stryker on lines 450-490: 20 mutants, 20 killed.
  - The appended `program` objects are the ones the caller gives (no copy); the reader's result owns them, so nothing in the document is shared. Not required to copy by the spec.
  - `appendPrograms` does not trim a name itself. The trimmed name comes from the reader, as decided in the spec; a caller that passes an untrimmed name would store one the load refuses. Spec-conformant; the page slice must pass the reader's output.
- **Foundation entries against the code.** D-395, `previous-save-programs-reader`, glossary "previous save" and `save-version` say what the code does (keys exactly `id`, `name`, `program`; version 1 up to current; only version, programs and items read; strict items; the check of the editor). No difference between the spec and these entries found.
- **Guidelines.** `guidelines/coding-simulation-module.md`: imports only simulation files, no clock, argument unchanged (isolation and inputs checks green). `guidelines/coding-saved-game.md`: the wording of "Odmowa zamiast wyjatku" and the ban on a half-state is met by the code; its test of the "error of the code is no refusal" is I2. `guidelines/coding.md`: formatter is I1; ESLint on the four changed source/test files passes (exit 0).
- **Reserved choice:** none taken. No library, framework or store introduced.
- **Own-work check of the executor.** The requirement it named (numbering, trimmed name) is met and its tests fail when they should; it did not name the strictness of item keys or the propagation of a fault from the check, which are where the tests are weakest (I2, I3). Its deliberate breaks (version bound, `hasExactKeys` always true) were caught; the two I found were not tried.
- **Test of the trust boundary.** The sweep over every place of the document with 15 hostile values and a deletion, the frozen document and the result's isolation are real checks and fail when broken. I did not find a test that asserts nothing.

## Declined to judge

- The page flow, the button, the sentences, the server and the client (later slices). The reader's result shape (`kind` and `place`) is for the page to use; I judged only that it carries what the spec says it must.
- The full gate (`npm test` without a file): the orchestrator runs it. I note I1 will make it fail on `prettier-source-format`.
- The `foundation_check.py` expected error of the part-map pattern for `previous-programs.ts` is gone now that the file exists.

## Checks I ran (command, exit code)

Worktree `the task's worktree`, HEAD `6a9283c4`.

- `npm test -- tests/sim/previous-programs.test.mjs`: exit 0 (15 tests).
- `npm test -- tests/sim/program-list.test.mjs`: exit 0.
- `npm test -- tests/sim/saved-game.test.mjs`: exit 0 (unchanged file).
- `npm test -- tests/quality/test_mutation_test_selection.py`: exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py`: exit 0 (5 tests OK).
- `npm test -- tests/invariants/test_simulation_inputs.py`: exit 0 (2 tests OK).
- `npm run typecheck`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/previous-programs.ts"`: exit 0. 143 mutants: 130 killed, 9 survived, 4 no coverage; score 90.91 (93.53 of covered). Classified above: I2 (`:91:9`), I3 (`:41:37`), M1 (`:23:7`, `:26:10`, `:26:44` x2), M2 (`:47:32`, `:49:7`, `:53:9`, `:62:5`, `:87:7`, `:87:24`, `:87:32`). No mutant was a compile error.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/programs.ts:450-490"`: exit 0. 20 mutants, 20 killed, 0 survived, score 100.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/sim/previous-programs.ts src/browser/sim/programs.ts tests/sim/previous-programs.test.mjs tests/sim/program-list.test.mjs`: exit 1; warns on `previous-programs.ts`, `previous-programs.test.mjs`, `program-list.test.mjs`. The same flags on `"src/browser/**/*.{ts,tsx,mjs,js,css,html}" "tests/sim/**/*.mjs"` list the same three files and no other: exit 1.
- `npx eslint` on the four changed source and test files: exit 0.
- `node scratchpad\probe.mjs` (a scratch script outside the repository, importing `dist/browser/sim/previous-programs.js`): exit 0; results quoted above.

Stryker wrote only into `.stryker-tmp/` and `.runs/stryker/`, both ignored by `.gitignore`; no tracked file changed.

## Reach beyond the handoff

- `.the-way/task-cycle/review/SKILL.md`: the method.
- `guidelines/testing.md:250-290`: the mutation-testing rule and its command (named by the handoff, read at the section).
- `src/browser/sim/programs.ts:104-142`, `:238-278`, `:370-448`: `checkCondition`, `checkProgram`, `programName` and `createProgram`, to see what the check throws and how D-169 compares names.
- `src/browser/sim/saved-game.ts:250-278`, `:470-495`: the program and list reads of the load (handoff lines, read as given).
- `tests/sim/saved-game.test.mjs`: grep for `Proxy`, `Object.create`, `undefined` to see what crafted values the load's test uses.
- `tests/quality/test_quality_invariants.py:10-22`, `:63-66`: the patterns and flags of `prettier-source-format`, to run the invariant's own check on the changed files.
- `.gitignore`: that `.stryker-tmp/` and `.runs/` are ignored.
- `foundations/decisions.md:9665-9679` (D-395), `foundations/invariants.md:1338-1347` and `:1028-1037`, `foundations/glossary.md:254-259`: read whole; they were in the handoff's list.
- `guidelines/coding.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md`: read whole.

## Unread material

- `tests/sim/program-list.test.mjs`: lines 1-410 I read only through the diff and by running the file; not read line by line.
- The task, spec and plan files were not opened; I used the passages the handoff copied.
- `foundations/part_map.md` (`simulation` and `account-server` entries, E23): not opened; `foundation_check.py` passes with the pattern now matching.
- `foundations/decisions.md` D-164, D-165, D-167, D-169, D-206, D-213, D-386, D-393 and `foundations/invariants.md` `saved-program-edit`, `copy-save`, glossary `program` and `trip plan`: not opened whole; I took D-169's rule and D-165's numbering from the spec passages and the code of `programName`.
- `src/browser/sim/saved-game.ts` outside the lines named above.

## Searches not found or unclear

- None not found.
- Unclear: the spec's "its name where that is a non-empty text" (M5): literal reading versus "not empty after trimming" of D-395; resolved in favour of D-395.
