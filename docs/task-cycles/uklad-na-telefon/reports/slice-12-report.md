done

# Slice 12 — the program editor moves a rule group up and down

**Status:** done
**Commit:** e88be6b5 on `task/uklad-na-telefon` (base 9b12062d), not pushed.
**Check result:** all four slice checks exit 0; the rest of the suite was not run (per the handoff).

## Files changed

- `src/browser/view/program-editor.ts` — +32 / −0. Adds `moveGroup(program, index, offset)` and `groupArrows(program, index)`, placed before `dropGroup`.
- `tests/view/group-arrows.test.mjs` — +92 / −0, new file, 9 cases, each citing `// decision: D-288 "Rules move by a handle …"`.

## Functions added

- `moveGroup(program, index, offset: -1 | 1): Program | null` — swaps the group at `index` with its neighbour in `program.groups`, keeps the group objects as they are, returns the new program, and returns `null` where the index is unknown or the neighbour does not exist (first group up, last group down). The input is not mutated.
- `groupArrows(program, index): { up: boolean; down: boolean }` — `up`/`down` are `moveGroup(...) !== null`, the same shape as `ruleArrows`.

## Test first (failing run)

The method says an empty function must exist before the test runs so that the test reaches its assertion. I added stubs first (`moveGroup` returned `null`, `groupArrows` returned both `false`), then ran:

- `npm test -- tests/view/group-arrows.test.mjs` — exit 1. 9 tests, 5 passed, 4 failed. The four failures were the moving cases and the „↓”/„↑” middle-group case (`groupArrows` gave `{ up: false, down: false }` against the expected `{ up: false, down: true }`, and the move cases got `null` where a program was expected). The five passing cases are the "does not move" cases, which the stubs satisfy by design.

Then the real implementation replaced the stubs:

- `npm test -- tests/view/group-arrows.test.mjs` — exit 0, 9 of 9 pass.

## Checks run

| Check | Command | Exit |
|---|---|---|
| Slice's test, failing run (stubs) | `npm test -- tests/view/group-arrows.test.mjs` | 1 (4 fail, 5 pass) |
| Slice's test, passing run | `npm test -- tests/view/group-arrows.test.mjs` | 0 (9/9) |
| Slice's check | `npm test -- tests/view/program-editor.test.mjs` | 0 (63/63) |
| Slice's check | `npm test -- tests/quality/test_function_and_file_size.py` | 0 (2 tests OK) |
| Slice's check | `npm test -- tests/quality/test_quality_invariants.py` | 0 (8 tests OK) |
| Citations | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| Formatting | `npx prettier --check src/browser/view/program-editor.ts tests/view/group-arrows.test.mjs` | 0 |

Not run: the full suite `npm test` with no argument (out of this slice's boundary, per the handoff); `.the-way/instruction-files/check_instructions.py` on its own (not part of the slice's checks).

## Own-work check (method section 3)

- **Requirement most likely missed:** the edge rule of D-288 — „↑” off only on the first group, „↓” off only on the last — including the case where an empty group stands at the edge (the "empty group moves like any other" case), and that `moveGroup` does not turn a move into a rule move.
- **Check written:** the cases "first group has no ↑ and the last no ↓", "a group with no rules moves one place", and the two `null` edge cases in `moveGroup`.
- **Result:** all pass on the implementation. The stub run also showed the middle-group arrows fail, so the cases do reach the behaviour.
- **Mutation thought-check:** swapping `up`/`down` in `groupArrows` is caught by the middle-group case; dropping the edge guard in `moveGroup` (letting index `-1` or `length` through) is caught by the edge cases; mutating the input in place is caught by the "does not mutate" case.
- **Walkthrough / ui_check:** not read and not needed. The slice adds pure functions with no view change, so no behaviour a user sees changes.

## Choices

- **Language of comments.** The new doc comments in `program-editor.ts` are in Polish, matching the file's existing comments, as `guidelines/coding.md` and the user's rules say for a file of an established Polish convention. The test file's case names are in English, matching its test names. Way rejected: English comments in this file (would mix languages in one file). Cost if wrong: a rename of comments later; no behaviour impact.
- **Names and signature.** `moveGroup` takes an index, not a group id, because the slice's goal says "the group at an index". Way rejected: taking a `GroupId` as `moveRule` takes a group id; cost if wrong: a small signature change if the view needs ids.
- **No change to the view.** As the slice says.

## Concerns

- None blocking. The size rule (D-425) passed, so `program-editor.ts` stays under the threshold as counted by the test; the raw file is now 951 lines including comments and blank lines, which the rule does not count.

## Working copies

- I made one working directory, `.runs/slice-12/`, for the run logs. It held only text output of the test runs, not a worktree or clone. It has been removed (`rm -rf` on its full path); nothing needed to be kept in `reports/` beyond what is written above.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–579 of 1457 (the handoff names it whole). The rest was not read. Reason: the slice changes no view file and no styleguide rule touches pure functions of `program-editor.ts`; the rules that bear on the view (roles, states, layouts) do not apply to this change. A reader should note this gap.
- `guidelines/testing.md`: read lines 1–207 of 510. The rest was not read. The part relevant to this slice (levels, behaviour not implementation, where the expected value comes from, changing an existing test) was read in the first 207 lines; the remaining lines are the trust-boundary table and the list of exceptions for other parts, which bear on no file of this slice.
- `foundations/decisions.md:9424-9440` (D-292, named in the handoff's *Read*): not read.
- `foundations/invariants.md:1428-1437` (function-and-file-size): not read; the invariant's test ran and passed, and D-425 was read whole.
- `foundations/glossary.md:53-64` (program rule, rule group): not read.
- `.runs/task-cycles/uklad-na-telefon/task.md:35-35` and `:56-58` (To do item 6, Question 2): not read; the handoff does not copy them, and the slice's goal is complete without them.
- `foundations/decisions.md` D-288 and D-297: read at 9341–9423 and 9538–9570 respectively, whole.
- `tests/view/program-editor.test.mjs`: read lines 1–80 (the head, the form of cases), and one citation line at 128 and 161–163 for the citation form.
- `.ai`/global rules: `.ai/rules/git.md` was loaded by the commit hook and was followed (English message, commit by path).

## Searches not found or unclear

- None that changed the work. The one unclear point was the language of new comments versus the file's convention, resolved as stated under *Choices*.
