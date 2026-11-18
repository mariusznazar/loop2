# Report — the fix of the Minor findings of the review of the whole change

**Status:** done

Base `11d266bc61b077aa25157d3d5b96f30a21636a88`; head `2b9b2cd3`. Author address of each commit: `mariusznn@gmail.com`.

## Commits

| Commit | What |
|---|---|
| `e7fb0a7d` | `foundations/decisions.md`: findings 3, 4, 5, 6 (4 lines changed) |
| `1ffbe7b1` | `guidelines/coding.md` (finding 1), `guidelines/styleguide-browser-view.md` (finding 7) |
| `d2e41b63` | `tests/quality/eslint-size-rules.mjs` (finding 2) |
| `2b9b2cd3` | `src/browser/view/program-panel.tsx` (finding 8) |

## Findings

1. Fixed as the reviewer proposes: `guidelines/coding.md:256` now reads "Progi i wyjątki stoją w D-425 i tu się ich nie powtarza." (line wrap kept).
2. Fixed in `lintedPatterns` (`tests/quality/eslint-size-rules.mjs`). An entry that holds `ignores` is a global ignore only where every key is `ignores` or `name`; with `files` or any other key beside `ignores` the function throws "eslint.config.mjs holds an entry with ignores beside other keys, which this run cannot read". The `files` branch is unchanged. The comment above the function says so. No control case added: the script imports `eslint.config.mjs` statically and takes no configuration argument, so a case would need a new argument of the script, which is more than the finding asks. Instead, shown with copies in a directory of mine:
   - Copies of the script before the fix (from the file at `11d266bc`) and after it, each with the import changed to a made-up config: `cfg/local-ignores.mjs` (`{ ignores: [...], rules: {} }`), `cfg/files-and-ignores.mjs` (`{ files, ignores }`), `cfg/global-with-name.mjs` (`{ name, ignores }`, the legal global form), each run on a one-file tree.
   - Result (kept in `reports/fix-minor-evidence/runs.txt`, configs beside it): before the fix all three exit 0 and print the usual summary (so both forms narrowed or widened the run silently); after the fix the first two exit 1 with the error above, and the third exits 0.
   - The real run is unchanged: `node tests/quality/eslint-size-rules.mjs` printed the same four reports before and after the fix (diff identical), exit 0. `npm test -- tests/quality/test_function_and_file_size.py` passes with its one expected failure.
   - No test of the repository was added, so there was no new case to see fail first; the "failing" run is the before-fix copy, which accepted both forms (exit 0 where the error is wanted).
3. Fixed. D-425 *Rejected*: "no limit on a file — review would see the growth of a file only as a Minor finding, so nothing in the gate guards it, and the departure from the template would be written down" (reason: WAY-363 and `.the-way/task-cycle/review/whole_change.md`, read at the pin). I added "in the gate" to the reviewer's sketch so the sentence stays true (the review is not in the gate).
4. Fixed as proposed: "nine functions break it, two of them ones the review judged to leave whole, so there would be three exceptions".
5. Fixed by dropping "the scripts of deployment" from the list in the binding sentence. The governing clause "every file that ESLint checks under D-29" is unchanged; the Scope field is unchanged. (I chose to drop rather than write "the test helpers of deployment": the helper that ESLint reads, `tests/deploy/restore-trial-docker-standin.mjs`, already stands in "the tests".)
6. Fixed as proposed: "each started by its path or from Python".
7. Fixed: the sentence now reads "Stoi w `src/browser/view/scene.tsx`, `src/browser/view/scene-memory.ts` i `src/browser/view/scene-picture.ts`, a jej ruch i szarości w …"; nothing else changed in the styleguide. `scene-memory.ts` exists and holds the scene's memory (read its header).
8. Fixed: the doc comment moved from above `type RunHeadProps` onto `function RunHead`; no code change.

## Checks

Decisions (3–6): followed `.the-way/elements/decisions/skill/SKILL.md` (steps 1, 2 and 4.3 for a change of existing entries: its `read.md`, `decide_entry.md`, `elements/common/way_of_working.md`, the template and `rules.md`). Question and binding sentences' meaning, numbers and exceptions are unchanged; only the wording named in the findings changed, and no other entry names these sentences (the fixes change no neighbour).

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after findings 3-6 and 1, 7) | 0 (`0 errors`) |
| `node tests/quality/eslint-size-rules.mjs` | 0, same four reports as before |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (`OK (expected failures=1)`) |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (network available; 5 tests) |
| `npm run typecheck` | 0 |
| `npm test -- tests/view/program-panel.test.mjs` | 0 (60 pass) |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/quality/eslint-size-rules.mjs src/browser/view/program-panel.tsx` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/quality/eslint-size-rules.mjs src/browser/view/program-panel.tsx` | 0 |

Not run: the full gate (not mine); `check_instructions.py` (no instruction file changed).

## Own-work check

The requirement most likely missed: finding 2's fix must not stop a legal form of the real configuration (the real `eslint.config.mjs` has an entry `{ ignores: excluded }` alone) and must stop both illegal forms. Checked by the real run (same output as before, exit 0), the legal `{ name, ignores }` made-up config (exit 0 after) and the two illegal ones (exit 1 after, exit 0 before). Also the check that the decisions' wording changes do not break a `decision:` quotation of a test: `foundation_check.py` exits 0 (the quoted start of D-425's first sentence is untouched).

## Reaches beyond the handoff

- `.the-way/task-cycle/review/whole_change.md` (section "The structure of the code the change leaves") and `.the-way/foundations/decisions.md` WAY-363 (lines 6593-6612), to confirm that review at the pin grades size growth as Minor (finding 3).
- `.the-way/task-cycle/change/fix.md` (named by `make-change` section 1 for a fix).
- `eslint.config.mjs` (lines 1-90 and a grep of the rest for `ignores`, `files`, `name`) and `tests/quality/test_function_and_file_size.py`, to judge finding 2.
- `ls tests/deploy` for finding 5; `src/browser/view/scene-memory.ts` header for finding 7.
- `the author's rule file on commits, outside the repository` and `scripts.md` (the user's instructions, read when the hooks asked).

## Unread material

- `guidelines/testing.md`: read lines 1-214 of 495 (the page the harness gave; the rest, rules of tests, not read). I added no test and only changed a script of `tests/quality/`; the part read holds the rules for adding tests.
- `guidelines/coding.md`: only lines 245-265 (the rule of size) read; its remainder not read. The fix changed one sentence of it and no code beyond a script's condition and a comment move.
- `.runs/task-cycles/struktura-kodu/reports/review-whole-report.md`, `task-frozen.md`, `plan.md`: not read (the findings file names place and fix for each finding and needed no more).
- `.the-way/elements/decisions/examples.md`: not read (no new entry written).

## Searches not found or unclear

- none that changed a result. (`eslint.config.mjs` after line 90 was grepped for the keys, not read whole.)

## Choices

- Finding 2: throw on `ignores` with any key besides `name` (not only `files`), the same condition ESLint uses for a global ignore. Rejected: adding a configuration argument to the script to feed a control case; it enlarges the script's interface for a check a one-time demonstration covers, and the next change of `eslint.config.mjs` is the only thing that could bring either form. Cost if wrong: a future form of the config the script cannot read stops the run, which is the slice's own principle; the next change then handles it.
- Finding 5: dropped the words rather than naming test helpers; cost if wrong: none for the meaning, as the governing clause stays.

## Working copies

Stood in `.runs/fix-minor/` (script copies with a made-up configuration, a one-file tree, the output of the real run before and after, the test output files). Removed with `rm -rf`; the configs and the result lines are kept in `.runs/task-cycles/struktura-kodu/reports/fix-minor-evidence/`. No worktree or clone was made.
