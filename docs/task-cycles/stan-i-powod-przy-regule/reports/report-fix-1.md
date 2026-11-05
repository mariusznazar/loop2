<!-- Copied by the orchestrator word for word from the text the author returned: the harness refused the author's own write of this file. Only the HTML escape `&amp;` was turned back into `&`. -->

**Status:** done.

**Commit:** `82d1ca9` on top of `908c03e`; the worktree is clean.

**Check result:** nothing failed. The changed test fails with the repertoire check removed and passes when restored. The product's gate and the mutation tool were not run.

The harness refused the report write again, so the report text is below and `reports\report-fix-1.md` was not created.

## Report of the fix, round 1

**Finding 1 (fixed).** The test "a group whose condition lies outside the repertoire shows dark with its rules, which give no reason though they lie outside it" in `tests/sim/rule-signs.test.mjs` now sets the body to 34 degrees, so the group's condition (temperature below 36) holds.
- It also asserts as a precondition that `judgeProgram(state.run, map, state.run.copy.program)`, called without `reach`, gives group 1 `go`. Only the repertoire check can now make the group dark.
- With the term at `program.ts:420-422` replaced by `true && `, `npm test -- tests/sim/rule-signs.test.mjs` exits 1 and the changed test fails.
- With the file restored from a backup, the same command exits 0 (26 cases).

**Finding 2 (fixed).** The *Rationale* of D-126 now ends: "Accepted with it: a program rule outside the repertoire shows in the program what D-308 gives." It is a pointer and restates no exception.
- D-126 no longer contains "with no sign of why". The one occurrence left in the file is in D-127, which the task keeps unchanged.

**Other checks (all exit 0):**
- `python -B .the-way/elements/common/foundation_check.py`: 0 errors.
- `npx eslint --max-warnings 0 tests/sim/rule-signs.test.mjs`.
- `npx prettier --check tests/sim/rule-signs.test.mjs`.

**Searches not found or unclear:** none.
