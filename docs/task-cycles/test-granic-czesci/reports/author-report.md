# Report of the one author (make-change)

Saved by the orchestrator from the author's returned text: the author's own write to this path was
refused by its tool ("subagents should return findings as text"). The words below are the author's.

**Status:** done with concerns. The one concern is that the new invariant's *Rests on* reads `none` (see "Searches not found or unclear").

## Commits on `task/test-granic-czesci` (base `72287c2`)
- `c3e27c7`: refactor. Moved `file_owners` into `tests/invariants/loop2_invariant_support.py`. The package-layout test and the view token test now use `support.file_owners`, so the view test no longer imports a build-tools test.
- `30afe4d`: test. `tests/sim/encounters.test.mjs` no longer imports `terrain-picture.js`. The "interrupted move" case now asserts `attacked.run.current?.stepTo ?? null` equals `null`.
- `d858d14`: docs. Added the part `test-helpers`, decision D-351, the invariant `cross-part-imports`, and the new `simulation-isolation` sentence, verbatim from the task. Added `test-helpers` to *Applies to* in `guidelines/coding.md` and `guidelines/testing.md`, plus one row for it in the testing table of parts.
- `628bd1b`: test. Added `tests/invariants/test_cross_part_imports.py` (721 lines) and updated the quoted sentence at the top of `tests/invariants/test_simulation_isolation.py` (docstring only, no logic change).

## Checks (all from the worktree root)

| Command | Exit |
|---|---|
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`, failing run 1 (before the map edit and fixes) | 1 |
| the same, failing run 2 (after the part and the `file_owners` move) | 1 |
| the same, passing run (also after the commits) | 0 |
| `python -B scripts/test.py tests/invariants/test_application_package_layout.py` | 0 |
| `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 |
| `python -B scripts/test.py tests/quality/test_invariant_support.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 |
| `npm test -- tests/view/terrain-picture.test.mjs` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 1, then 0 |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests scripts` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |

- **Failing run 1** showed 32 failures: 30 imports of `loop2_invariant_support` from simulation (22) and browser-view (8) tests, the `encounters.test.mjs:19` import of the view, and the new test file not yet claimed by any part.
- **Failing run 2** showed only the `encounters.test.mjs:19` import.
- **The quality test's first failure** was ruff: unused `sys`, SIM114 and PIE810 in the new test. All three were fixed; the second run passed.
- **Not run:** the whole `npm test`, the whole `tests/invariants` directory, mutation tooling and `ui_check.md`. No mutation tool applies, since the changed simulation file is a `.mjs` test.
- **Base:** the orchestrator's `base-npm-test.txt` is green, and the author met no failure that the base also shows.

## Task *Context* findings
The three findings from the `01b26d5` scan are still the whole set at `72287c2`:
- the 30 support imports,
- the encounters import of the view,
- the `file_owners` import in the view test.

The new test found nothing else in 306 code files, and the repository now passes with no exclusion list. The third finding was confirmed against the base text of `test_browser_view_token_values.py`. `file_owners` was already moved before the first repository run, so run 1 does not show it.

## Choices made
- **Part `test-helpers`:** *Depends on* `none` and *Trust boundary* `none`. It holds only `loop2_invariant_support.py`. If this is wrong, a rename touches the map, D-351, the invariant sentence, both guidelines and the `HELPER_PART` constant in the test.
- **Owner of the new test:** `build-tools`, listed in its *Files* beside `test_application_package_layout.py`. `tests/quality/` was rejected because the sibling invariant tests live in `tests/invariants/`. The `build-tools` sentence was not reworded.
- **Invariant identifier `cross-part-imports`:** the same as the-way's own, which names the same duty. `foundation_check.py` reports 0 errors.
- **Files the test reads:** `support.listed_files()` (tracked plus untracked-not-ignored, as the sibling tests do), not strictly `git ls-files`. Built `dist/…` files are matched to `src/` by the three tsconfig mappings.
- **Test design:** one pure function fed by the repository and by nine controls on made-up repositories. TypeScript and JavaScript are read by a small tokenizer written for the test, Python by `ast`. The segmenter from `test_simulation_isolation.py` is not reused, because that would itself be a forbidden test-to-test import.
- **Gate selection (D-83):** `run_tests.test_directories()` lists `tests/invariants`, and unittest discovery there runs all 10 tests. Execution inside the full gate is still for the orchestrator to verify.

## Foundation entries

| Entry | Mark |
|---|---|
| D-351, written whole from row 1; *Rejected* holds the task's *Not chosen* ways, with file names made generic | row 1 |
| invariant `cross-part-imports`: *Part* `every`, *Method* `test`, *Violated* `no`, *Derives from* D-351 | row 2 |
| `simulation-isolation` sentence, verbatim from the task | row 3 |
| part `test-helpers` | the cycle's |

The entries were written by hand, following the three element skills' `SKILL.md` and templates. The search of the whole foundation found only D-266 (built output in `dist/browser/`) as related; it is compatible and was not edited. No glossary term was added.

## Own-work check
- **Requirement most likely unmet:** "read code, not strings", meaning the hand-written tokenizer could silently miss an import.
- **Check:** the tokenizer's specifiers were compared with an independent regex scan on all 224 listed script files. 221 matched. The other 3 differed only in template-string fixture text (`tests/account-mail.test.mjs`, `tests/passwords.test.mjs`, `tests/view/memory-limit.test.mjs`), which are correctly not imports. The tokenizer missed nothing.

## Reaches beyond the dispatch
- The first lines of `.the-way/elements/part-map/test_cross_part_imports.py`, as a pattern only.
- The *Applies to* lines of `.the-way/product-guidelines/{template,testing/template,coding/template}.md`, to learn that the testing table needs a row for the new part. Item 6 of the task did not say so.
- `.the-way/gate/run_tests.py` and `scripts/test.py`, to confirm how the gate selects `test_*.py` directories.
- D-266, read whole.

## Searches not found or unclear
- **Environment fact for git's path-pattern matching.** The-way's `cross-part-imports` rests on `git-path-patterns`, which exists only in the-way's environment facts. loop2's `foundations/environment_facts.md` has no such entry, and `foundation_check.py` reads only the product's own. The new invariant therefore reads `Rests on: none`, as the sibling `application-package-layout` does. Strictly, git's matching is probably a fact it rests on. Recording one needs `the-way-record-environment-fact` and a read of the git docs, which is outside the task's three settlements. This is open for the reviewer or the human.
- **Unreviewed wording.** The `build-tools` sentence was left unchanged, though it mentions neither the boundary test nor the package-layout test. It is unclear whether the reviewer wants it reworded.
- **Unverified mapping.** `BUILT_FROM` maps `dist/kitchen-sink/<x>` to `src/browser/<x>` from the tsconfig's inherited `rootDir`, but the output was not built here to verify it. An import from that folder would fail loudly, not pass.
- **Unreadable `sys.path` addition.** `scripts/test.py:24` adds a directory from a run-time value, which cannot be read statically. The test treats it as adding nothing and says so in its docstring. Nothing depends on it today.
- **Run command.** `python -B scripts/test.py <file>.mjs` directly fails with `KeyError: 'npm_execpath'`. D-77's form `npm test -- <file>` works.
