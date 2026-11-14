# Slice 6 — fix report (findings I1, I2, I3)

**Status:** `done`

**Commit:** `ea8de2c2` on `task/programy-ze-starych-zapisow`, on top of the reviewed head `6a9283c4`. Message: `fix: :bug: format the previous-save reader and its tests with Prettier and cover the two strictness rules`. Explicit paths: `src/browser/sim/previous-programs.ts`, `tests/sim/previous-programs.test.mjs`, `tests/sim/program-list.test.mjs`.

**Check line:** all three findings fixed. `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (17/17), `npm test -- tests/sim/program-list.test.mjs` exit 0 (33/33), `npm run typecheck` exit 0, `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5/5), and the invariant's own Prettier command exit 0. Both reviewer mutants fail the new tests and are restored byte for byte. Not run: the product's full gate, as the handoff asks.

## Findings as fixed

**I1 — Prettier layout (fixed).** Ran `node node_modules/prettier/bin/prettier.cjs --write` with default options on the three files named in the findings. Diff of the fix: `previous-programs.ts` 3 lines (the `PreviousPrograms` type now on one line, as Prettier writes it), `previous-programs.test.mjs` 82 lines (layout only), `program-list.test.mjs` 4 lines (one `appendPrograms` call on one line). Check: `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` with the invariant's own pattern list (`src/browser/**`, `src/server/**`, `scripts/**`, `tests/**`, `tests/{sim,view}/**`, `{eslint,prettier}.config.mjs`), exit 0, "All matched files use Prettier code style!". Also `npm test -- tests/quality/test_quality_invariants.py` exit 0.

**I2 — propagation of a fault in the check (fixed).** Added the test "a fault inside the program check of an item propagates out of the reading" (`tests/sim/previous-programs.test.mjs`, at the end of the file). An item's program is a `Proxy` whose `get` trap throws `TypeError`; `checkProgram` reads `value.groups` inside the `try`, so the error reaches the `catch` in `readItem`. The test asserts `assert.throws(..., TypeError)`. Reviewer's mutant `if (true) return { kind: "skipped", name };` at `src/browser/sim/previous-programs.ts:90`:
- Command: `npm test -- tests/sim/previous-programs.test.mjs`, exit 1 with the mutant; the failing test is the new one (16 pass, 1 fail).
- Restored with a copy taken beforehand; `cmp` identical; rerun exit 0.

**I3 — a wrong key among the right number (fixed).** Added the test "an item with three keys of which one is not id, name or program is skipped and named": items `{ ident: 1, name: "Las", program }` and `{ id: 2, name: "Noc", programme }` are skipped by name, `{ id: 3, name: "Dom", program }` is read. Reviewer's mutant `keys.every(...)` → `keys.some(...)` at `src/browser/sim/previous-programs.ts:40`:
- Command: `npm test -- tests/sim/previous-programs.test.mjs`, exit 1 with the mutant; the failing test is the new one (16 pass, 1 fail).
- Restored; `cmp` identical; rerun exit 0 (the commit's tree).

## Own-work check (section 3)

- Requirement most likely unmet: after formatting, the test file keeps every assertion (none weakened, none removed). Check: diff of `tests/sim/previous-programs.test.mjs` is layout plus the two added tests; the 17 tests all pass.
- Each mutant was run as a single edit in place, the file was restored from a copy, and `cmp` confirmed the restore before the next step.
- Both mutants were caught by the new tests only; the rest of the file passes under each.

## Choices made

- The new tests are placed next to the existing ones in the same file, marked with the invariant `previous-save-programs-reader` as the old ones are. Rejected: a separate file, which would split one invariant's tests. Cost: none.
- Formatting used Prettier's default options, as the finding said; the repository's `prettier.config.mjs` is `export default {};`, so it matches the defaults.

## Reach beyond the handoff

- `tests/quality/test_quality_invariants.py` run as a whole file (the handoff allowed it as the quicker command). Read only the lines naming the prettier invariant and its flags (lines 1–30 and 60–70).
- `.the-way/task-cycle/change/fix.md` read whole (the variant the handoff names).
- The `git diff` of the three files before committing (to confirm only layout changed in the code and the added tests in the test file).

## Questions

None.

## Unread material

- `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-reviewer-report.md`: the handoff says to read it for the evidence (the surviving Stryker mutants and the prettier invocation). Not opened. The findings file gives the same mutants and the same three files, and I reproduced each mutant and the prettier check directly; the evidence I used is the findings file plus my own runs.
- `.the-way/task-cycle/change/SKILL.md`: read in the first slice; not re-read for this fix. Its fix variant is in `fix.md`, which was read.

## Searches not found or unclear

- The findings say the mutant evidence is in `.runs/stryker/mutation.json` and a scratch copy `scratchpad\mut1.json`; I did not open either (I did not run Stryker). The mutants were applied by hand as the findings state them.
- The findings' probe (`scratchpad\probe.mjs`) was not opened; the new test for I2 uses the same kind of Proxy the probe describes, written as a test.
- Nothing else unclear.
