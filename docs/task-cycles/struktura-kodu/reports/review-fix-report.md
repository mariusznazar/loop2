PASS 2b9b2cd3910357de5fcf836e07e9e149d7d43573

# Review of the fix of the Minor findings — task `struktura-kodu`

- Range: `11d266bc61b077aa25157d3d5b96f30a21636a88..2b9b2cd3910357de5fcf836e07e9e149d7d43573`, four commits: `e7fb0a7d`, `1ffbe7b1`, `d2e41b63` and `2b9b2cd3`. `git rev-parse HEAD` in the reviewed worktree printed `2b9b2cd3910357de5fcf836e07e9e149d7d43573`.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file `reports/whole-review-findings.md` bounds the review. It holds eight Minor findings and no blocking finding, so only a new Critical or Important finding would fail the review (WAY-162).
- Result: all eight findings are fixed. The fix diff brings no new Critical or Important finding, and no new Minor one.

## Each finding

1. **`guidelines/coding.md:256` — fixed.** The sentence now reads "Progi i wyjątki stoją w D-425 i tu się ich nie powtarza." It no longer gives a number of exceptions.
2. **`tests/quality/eslint-size-rules.mjs` `lintedPatterns` — fixed.**
   - What changed: an entry with `ignores` counts as a global ignore only where its keys are `ignores` and `name` alone. With `files` or any other key beside `ignores`, the function throws. This is the condition ESLint itself uses for a global ignore.
   - My own check: I added each form to `eslint.config.mjs` of a worktree of the head for a moment.
     - `{ ignores, rules }`: the script ended with exit 1 and the new error.
     - `{ files, ignores }`: exit 1 and the same error.
     - `{ name, ignores }`: exit 0, with the same 4 reports as the unchanged configuration.
   - The error is not masked by the expected failure. With an illegal form in place, `npm test -- tests/quality/test_function_and_file_size.py` ended with exit 1, because the unmarked control case fails (`FAILED (failures=1, expected failures=1)`). An illegal form in `eslint.config.mjs` therefore stops the gate. It does not narrow the run in silence.
   - The fix agent's deviation is accepted: it added no control case of its own and showed the fix with copies of the script instead. The control case already turns the throw into a failure of the gate, as shown above, so a case of its own would add only a new argument to the script.
3. **D-425 *Rejected*, "no limit on a file" — fixed.** It now reads "review would see the growth of a file only as a Minor finding, so nothing in the gate guards it". That is true at the pin `bfb2e109`: under WAY-363 and the "structure" section of `whole_change.md`, a structure finding in a product with no rule of size is Minor. The added "in the gate" is accepted; it makes the sentence more exact, since review is not part of the gate.
4. **D-425 *Rejected*, the limit of 150 — fixed.** It now reads "nine functions break it, two of them ones the review judged to leave whole". That matches the source and the entry's own *Rationale*.
5. **D-425 binding sentence — fixed.** "the scripts of deployment" is dropped. The fix agent's choice to drop the words, instead of writing "the test helpers of deployment", is accepted. The leading clause "every file that ESLint checks under D-29" governs, deployment's linted files lie under `tests/deploy/` and so stand in "the tests", and *Scope* is unchanged.
6. **D-426 *Rationale* — fixed.** It now reads "each started by its path or from Python", as the source says.
7. **`guidelines/styleguide-browser-view.md:768-770` — fixed.** The sentence now names `src/browser/view/scene.tsx`, `src/browser/view/scene-memory.ts` and `src/browser/view/scene-picture.ts`.
8. **`src/browser/view/program-panel.tsx` — fixed.** The doc comment now stands on `function RunHead`, and `type RunHeadProps` carries none. Only the comment moved; no code changed.

## The fix diff

- The four changes to `foundations/decisions.md` change wording alone. No `decision:` quotation of a test breaks: `foundation_check.py` reports `0 errors`, and the quoted start of D-425 is untouched.
- The meaning of D-425 is unchanged: its thresholds, its scope clause and its exceptions stand as before.
- The long lines that the fix left in the two Markdown files are within the files' form; no formatter reads Markdown.
- The real `eslint.config.mjs` holds `{ ignores: excluded }` alone, which the new guard accepts. The run on the head printed the same 4 reports as before the fix, which is the Q1 set.

## Checks I ran

| Check | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` (reviewed worktree) | 0 | `2b9b2cd3910357de5fcf836e07e9e149d7d43573` |
| `node tests/quality/eslint-size-rules.mjs` (worktree of the head) | 0 | 4 reports: `kitchen-sink.tsx` 890, `startApp` 449, `createProgramsEntry` 245, `build` 225 |
| `npm test -- tests/quality/test_function_and_file_size.py` (head, as committed) | 0 | `OK (expected failures=1)` |
| the script with `{ ignores: ["x/**"], rules: {} }` added to `eslint.config.mjs` | 1 | throws the new error |
| the script with `{ files: ["scripts/**/*.mjs"], ignores: ["scripts/a/**"] }` added | 1 | throws the new error |
| the script with `{ name: "n", ignores: ["x/**"] }` added | 0 | 4 reports |
| `npm test -- tests/quality/test_function_and_file_size.py` with the legal `{ name, ignores }` form | 0 | passes |
| `npm test -- tests/quality/test_function_and_file_size.py` with the illegal `{ ignores, rules }` form | 1 | the control case fails, so the gate stops |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/quality/eslint-size-rules.mjs src/browser/view/program-panel.tsx` | 0 | clean |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the same two files | 0 | clean |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | `0 errors` |

`eslint.config.mjs` was restored after each probe, from a copy of mine, and `git status` of the worktree was clean before I removed it.

Not run:

- the full gate, which is the orchestrator's run;
- the view tests: the only source change is a moved comment in `program-panel.tsx`, which ESLint and Prettier checked.

## Reaches

- `reports/fix-minor-evidence/runs.txt`, which I read and then checked with runs of my own, listed above.

## Working copies

- `.runs/review-whole/head`: a detached worktree of `2b9b2cd3`, with `node_modules` as a junction to the reviewed worktree's.
- In `.runs/review-whole/`: a copy of `eslint.config.mjs` and the probes' outputs.

I removed the junction first, as a link only, and checked that the reviewed worktree's `node_modules` still stands. I then removed the worktree with `git worktree remove --force`, ran `git worktree prune`, and deleted `.runs/review-whole/`. Nothing remains.

## Unread material

- `reports/fix-minor-evidence/` made-up configs (`files-and-ignores.mjs`, `global-with-name.mjs`, `local-ignores.mjs`): not opened; I ran equivalent forms myself.
- `reports/whole-review-findings.md`: checked by its headings and the place and slice of each of its eight findings, which match my review word for word. I did not read the bodies again; they are my own text.
- `reports/fix-minor-report.md`: read through its findings, checks and choices, the parts that bound this review.

## Searches not found or unclear

none
