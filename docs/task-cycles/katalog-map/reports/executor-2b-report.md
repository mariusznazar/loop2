done

# Report - executor of Slice 2b, task `katalog-map`

Slice: 2b — the name of a creature after „z” from its data. Base: `5766c306`. Branch: `task/katalog-map` (worktree `the task's worktree`).

## Commits

- `b41798ba` refactor: :recycle: read the form of a creature's name after „z” from its data in the row „Teraz”, the bear's „niedźwiedziem” included (D-147)
  - `src/browser/view/now-lines.ts`: +2 / -14 (removed `creatureAfterZ`, the rule that ends a name in „k”, and the import of `CreatureId`; the combat row now reads `CREATURES[line.creatureId].nameWith`; Prettier reflowed the remaining type import onto one line)
  - `tests/view/now-lines.test.mjs`: +35 / -0 (import of `CREATURES` from `dist/browser/sim/data/creatures.js`; two new tests)
- Nothing pushed.

## Test first (red)

The two new tests were written before the code change. Command `npm test -- tests/view/now-lines.test.mjs`, exit 1, two assertion failures for the expected reasons:
- the bear's case: actual `Walczy z niedźwiedź`, expected `Walczy z niedźwiedziem`;
- the made-up case: actual `Walczy z wilkiem`, expected `Walczy z zmyślonym` (the made-up form put on the wolf's data entry did not reach the row).
Output in `.runs/executor-2b/red-run.txt`.

## Checks (after the change)

| Check | Command | Exit | Result |
|---|---|---|---|
| The slice's test file | `npm test -- tests/view/now-lines.test.mjs` | 0 | 12 tests, 12 pass, 0 fail |
| The slice's second test file | `npm test -- tests/view/run-screen.test.mjs` | 0 | 25 tests, 25 pass, 0 fail |
| Typecheck | `npm run --silent typecheck` | 0 | clean |
| Lint | `npx eslint --max-warnings 0 src/browser/view/now-lines.ts` | 0 | clean |
| Format | `npx prettier --check src/browser/view/now-lines.ts tests/view/now-lines.test.mjs` | 0 | clean (after one `prettier --write` of `now-lines.ts`, which only reflowed the import line) |
| Foundation, citations skipped | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 14 errors, all of the known kind listed in the plan (`account-screen` D-325, `map-lines` and `maps-screen` D-325/D-327, Slices 8 and 9); none for `now-lines` |
| Foundation, full | `python -B .the-way/elements/common/foundation_check.py` | 1 | the same 14 known errors; no error names `now-lines.test.mjs` (its `decision:` lines quote D-147 and D-334 exactly as the existing tests do) |

Output files: `.runs/executor-2b/` (`green2-now-lines.txt`, `green2-run-screen.txt`, `typecheck2.txt`, `eslint2.txt`, `prettier2.txt`, `foundation-skip.txt`, `foundation-full.txt`).

Not run, by the handoff: the full gate (`npm test` without a file argument, `scripts/test.py`).

## Own-work check

- Requirement (task To do 3 and D-147): „Teraz” reads „Walczy z wilkiem” as before, and „Walczy z niedźwiedziem” for the bear, the form coming from the creature's data.
- Checks: (a) the wolf and bear assertions of `tests/view/now-lines.test.mjs`; (b) the made-up case, which sets `CREATURES.wolf.nameWith` to a made-up form for the duration of one assertion and restores it in `finally`, then checks the restored value again; (c) `grep -c kiem src/browser/view/now-lines.ts` = 0, no ending rule left in the file.
- Result: all pass after the change; (a) and (b) failed before it (see the red run).
- Mutation thought: a rule on the ending „k” fails the bear case; a literal „wilkiem” or a per-creature table in the view fails the made-up case; reading `CREATURES[id].name` instead of `nameWith` fails the wolf and bear cases.

## Choices

- "A made-up case on the data's entry" (handoff): read as two tests. The bear's case uses the real data entry with a hand-written expected value. The made-up case temporarily sets a made-up `nameWith` on the wolf's entry and restores it. The restore runs in `finally`, so a failing row cannot leave the shared object changed. If the orchestrator meant a different made-up construction, the test can be changed.
- Commit type `refactor:` (the behaviour for the wolf is unchanged; the source of the form changed). The repo has `feat:`/`test:`/`docs:` in its history; no other type fits.
- The creature-field line in `CreatureDef` (`nameWith`, doc comment naming the preposition) is Slice 2's; not touched.

## Unread material

- `.runs/task-cycles/katalog-map/plan.md`: not opened. The slice text, Choices and the orchestrator's answers were taken from the handoff, which copies them word for word.
- `.runs/task-cycles/katalog-map/reports/executor-2-report.md`: read only through a search for `nameWith` with 8 lines of context (the field, the wolf's and bear's values, the Choices row for the name). Its other sections not read.
- `foundations/decisions.md`: D-147 read whole (lines 7024-7051, including its Verification and Rationale). Its other entries not read, except that D-334 was taken from the quotations in the existing tests (not opened in the file).
- `foundations/part_map.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `src/browser/sim/data/creatures.ts`, `src/browser/view/now-lines.ts`, `tests/view/now-lines.test.mjs`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`: read whole. The styleguide was read in three pages, the testing guideline in two; both are whole.
- `.runs/task-cycles/katalog-map/task.md`: lines 25-35 read (To do 3 at line 30 included); the rest not read.
- Not read: `coding-content-data.md`, `coding-simulation-module.md` and the other kind guidelines (not named for this slice), `foundations/invariants.md`, `foundations/glossary.md`.

## Searches not found or unclear

- A search in the main checkout path for `.runs/task-cycles/katalog-map/reports/executor-2-report.md` found nothing (the cycle's `.runs` lives in the worktree); the file was found by a glob in the worktree.
- The styleguide's section of the bear's art and the `tests/view/scene-picture.test.mjs` belong to Slice 2, not 2b; not checked.

## Working copies

None made. `.runs/executor-2b/` holds only the check outputs listed above (no clone, worktree or script copy), so nothing was removed.

## Questions

None.
