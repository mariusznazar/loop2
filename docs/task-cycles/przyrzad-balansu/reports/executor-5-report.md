# Report — executor of slice 5 (overlays change the game's data in memory only)

**Status:** done

**Commits:** `5d548b8b600161ae07c9709995d8ed9ebe79ca06` on `task/przyrzad-balansu` (base `5dcd4781`), one commit by path.

## Files changed

| File | Added / removed lines |
|---|---|
| `balance/overlay.mjs` (new) | +112 / 0 |
| `tests/balance/overlay.test.mjs` (new) | +166 / 0 |
| `balance/overlays/forest-pack.json` (new) | +26 / 0 |
| `balance/overlays/wasteland.json` (new) | +21 / 0 |
| `balance/overlays/dead-zone.json` (new) | +26 / 0 |

Total: 5 files, 351 insertions. No file of `src/` changed.

## Test first

`tests/balance/overlay.test.mjs` was written first with the three overlay files in place and `balance/overlay.mjs` as an empty placeholder (`readOverlay` returns `{}`, `applyOverlay` returns a no-op restore). Run: `npm test -- tests/balance/overlay.test.mjs`, exit 1, all five tests failed. Four of them on assertions (`strictly equal`, `deep-equal`, `Missing expected exception`, `strictly equal`). The sweep of the added map (test 2) stopped on the engine's `run: no map forestPack` error, because the placeholder laid nothing; that is the expected reason, not a missing module. Log kept at `reports/executor-5-red.log`.

Then the implementation: same command, exit 0, 5 of 5 pass.

## Checks (command, exit code)

| Check | Command | Exit | Result |
|---|---|---|---|
| Failing before the module stands | `npm test -- tests/balance/overlay.test.mjs` (placeholder) | 1 | 5 of 5 failed (see above) |
| Passing after | `npm test -- tests/balance/overlay.test.mjs` | 0 | 5 of 5 pass |
| Prettier, first run | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance` | 1 | warning on `tests/balance/overlay.test.mjs` only |
| Prettier after `--write` on that test file | same command | 0 | pass |
| ESLint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance` | 0 | pass |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 | names nothing of `balance/`; it reports four functions and files of `src/browser/` over a threshold, not mine and not in this slice |
| Private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` (run after the commit, when the files are tracked) | 0 | 1 test OK |
| `src` untouched | `git status --porcelain -- src` | 0 | empty |
| Search of new files for note folders, file names, `C:` paths, the old game's repository | `grep -n -i -E "analizy|symulator|krytyka|Notes|The Brain|Storage|repos|loop-|a drive letter and a slash |a drive letter and a slash |nakladk|przyrzad|progresj|fable" balance/overlay.mjs tests/balance/overlay.test.mjs balance/overlays/*.json` | 1 | no match |
| Foundation check, not in the handoff's list, run to see the part's files | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |

Not run: the full gate (`npm test` with no argument), as the handoff says.

## Own-work check

Requirement most likely not met: the overlay must reach the map runs of the engine and must leave the data as it stood, also when the overlay is refused. Checks:

- Changed number: the test lays `ambientTemperature: -20` on Las and runs the best program on seed 1. Result: death of cold at minute below the baseline's 790 (baseline solved). The test asserts exactly that and that the restored run equals the baseline.
- Mutation A, restore made a no-op (`return () => {};`): `npm test -- tests/balance/overlay.test.mjs`, exit 1; four of five tests fail, the refusal test passes as it should.
- Mutation B, check removed (`checkOverlay(overlay)` commented out): exit 1; the refusal test fails (`Missing expected exception`), the rest pass.
- Both mutations were undone; `cmp` against a saved copy confirmed the committed file is restored before the commit.

## Choices (way rejected, cost if wrong)

1. **The text of an overlay is a top-level key `description`.** Rejected: a second sidecar file per overlay, which the instrument would have to find and pair. Cost if wrong: the name `description` is reserved, so a table with that name could not be laid; no table has that name.
2. **Refused keys are every key that is not one of the nine tables** (`MAPS`, `BALANCE`, `ITEMS`, `CAMPFIRE`, `CREATURES`, `SKILLS`, `BRANCHES`, `ACTIONS`, `TRAITS`); so `CONDITIONS` and `RESOURCES` are refused. Rejected: laying any key of the data module. Cost if wrong: a new condition kind or a resource needs code anyway (the old README says so), so an overlay naming them is a mistake, refused early.
3. **The overlay is checked whole before anything is laid,** and a failure during the merge restores the tables already touched and rethrows. Rejected: laying key by key and failing midway. Cost if wrong: none seen.
4. **Restore keeps object identity.** The restore writes the saved values back into the same objects the overlay merged into, and removes keys the overlay added. Rejected: the notes' restore, which empties each table and assigns clones, so every nested object becomes a new one. Cost of mine: an array the overlay replaces (for example `resources`) comes back as a new array; the original array object is not kept. The data is deep-equal after the restore (tested).
5. **`__proto__` as a key is refused in the merge.** Overlay files are the author's own, so this is a guard against a stray key, not against an attacker.
6. **Content of a map is not validated at laying time.** A map that names an unknown resource or creature fails when a map run reaches it, not when it is laid. Rejected: a full schema check of maps, which would duplicate the game's own checks. Cost if wrong: the error arrives during a sweep, not at the start.
7. **`readOverlay(file)` takes a path and parses JSON;** the instrument's command (Slice 8) chooses the path. Rejected: a function that finds the overlay by its name. Cost: none for this slice.
8. **Overlay content:** the three maps take the numbers of the notes' overlay files and the Polish texts the game shows (`solvingText`, `completionText`), since they are the game's own player-facing text. The `description` of each file is in English, in my own words, and names no note, folder, file path or repository. The wolf pack's six wolves and the wasteland's stone are not carried, because the data has one attacker entry per creature kind and no stone resource; each description says so. The notes' `opis` key was renamed `description` (Choice 1).
9. **The test reads the three overlay files of `balance/overlays/`**, which are product data, not test data. Choice 12 of the plan says unit tests of this part read no test data; the files are the part's own data, so I read them. Cost if wrong: the test depends on those files staying in place, which is the point of the test.
10. **Expectations are written by hand:** the prerequisite chain of `forestPack` (`forestEdge`, `forest`, `forestDeep`) comes from the `opensAfter` values of the data, written out in the test; the death of cold on the chilled map is checked as a relation (death, cause `cold`, minute below the baseline), not as a computed number.

## Reaches beyond the handoff

- I read the whole of `foundations/decisions.md`-named ranges through the handoff's list, but also the whole plan (`.runs/task-cycles/przyrzad-balansu/plan.md`), and the whole of `task-frozen.md` lines 27-101. The method's `slice.md` says a slice opens neither the whole plan nor the whole task. I did read the whole plan (to see the slice's section in context and Choices 1-12) and the task's passages; no mismatch of the plan with the code came up, so nothing was adapted.
- `.the-way/task-cycle/change/slice.md` was read after the work, before writing this report; it held no instruction that changed what was done.
- `tests/quality/eslint-size-rules.mjs` run as the handoff says; its output of other parts' threshold reports was read.
- `git log` and `git worktree list` were read to see the branch and the commit's author address; the commit uses the repository's configured identity.
- Rule files read through the hook, once each, before the first heredoc write and before the commit: `a file of the author's private notes` and `a file of the author's private notes`.

## Unread material

- `foundations/glossary.md`: only the entry `overlay` (`foundations/glossary.md:290-292`, found by grep) was read; the rest of the file was not.
- `the balance instrument's notes folder/przyrzad/silnik.mjs` (outside the repository): read its header (lines 1-20) and the overlay function `applyOverlay` with `mergeInto` (lines 95-140); the rest of the file (`loadSim`, the loop, the summary) was not read, since the slice does not take it.
- `the balance instrument's notes folder/README.md`: section "Czego przyrząd nie robi" read whole (lines 106-113).
- `the progression critique's notes folder/nakladki/wataha.json`, `pustkowie.json`, `martwa_strefa.json`: read whole.
- `foundations/decisions.md` D-18, D-388, D-362 and `foundations/invariants.md` `tracked-file-private-paths`, `tracked-file-private-names`: read whole at the given ranges.
- `guidelines/coding.md` and `guidelines/testing.md`: read whole (testing in three pages of the read).
- `src/browser/sim/data/maps.ts`, `balance.ts`: read whole. `balance/engine.mjs`: read whole.
- `.the-way/task-cycle/change/SKILL.md`: read whole; `.the-way/task-cycle/change/slice.md`: read whole (after the work, see above).

## Searches not found or unclear

- `ITEMS`: the grep for `export const` capitalised names in `src/browser/sim/data/*.ts` found no `ITEMS` line, but the engine imports `ITEMS` from `dist/browser/sim/data/items.js` and the test passes with it; I did not check how it is declared in `items.ts`.
- Whether `structuredClone` accepts every table of the data (no function in the data): the tests pass for all nine tables, so the answer is yes for the tables the tests clone.
- Nothing else looked for was not found.

## Working copies

- `.runs/executor-5/` (in the worktree's ignored `.runs/`) held the run logs, the mutation backup of `balance/overlay.mjs` and the Prettier/ESLint/size logs. The two logs the report refers to were copied to `reports/executor-5-red.log` and `reports/executor-5-foundation.log`; the directory was removed.
- No worktree, clone or script of mine was made outside that directory. The build output of `npm test` in `dist/` is the product's ignored build output, not a working copy.
