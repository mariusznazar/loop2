# Findings of the review of slice 6 (range `19ea8b1c..6a9283c4`, head `6a9283c43ec304ed6db495a0b56f4e24829fdc1e`), in the reviewer's words

Source report: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-reviewer-report.md`. Blocking findings only: the Minor findings of a slice review are kept for the review of the whole change and are not fixed here.

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
