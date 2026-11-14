PASS 7d61f0f3e1401acbfbb359f12bc2822343a14453

# Review of the merge of origin/main into task/porzadki-przed-pierwsza-mapa

Range: `git diff 9e7f586e..7d61f0f3` (first parent, the reviewed task branch, to the merge commit). `git rev-parse HEAD` in the
worktree gave `7d61f0f3e1401acbfbb359f12bc2822343a14453`, the head given; `git status --short` clean before and after my checks.
Merge base of the two sides: `6ab6a32b`. Both sides changed only two files in common: `foundations/decisions.md` and
`foundations/invariants.md`; the merge has no conflict markers and no duplicated decision heading.

The question: do the two sides still hold together? Yes. Findings below by grade; none blocking.

## Findings

Critical: none. Important: none. Minor: none.

## What I judged

1. **Linter and formatter scope over every test file (target side) against the files of our change.** The target side now gives
   every TypeScript and JavaScript file under `tests/` (not only `tests/{sim,view,quality}`) the ESLint sets, the Prettier check
   and the LF rule of `.gitattributes`. Our change changed or added files in `tests/sim`, `tests/view`, `tests/invariants` and
   `src/browser/view`. ESLint (all 68 existing TS/JS files touched between the merge base and the merge, ours and theirs) and
   Prettier report nothing; the new scope test passes on the merged tree (4 tests). The one new Python file of ours,
   `tests/invariants/test_simulation_type_check.py`, and the other changed Python files pass the repository's ruff
   configuration. `tsconfig.sim.json` (ours) is not a script file, so the scope test and `eslint.config.mjs` (theirs) do not meet it;
   `eslint.config.mjs` builds its type-aware programs from `tsconfig.browser.json`/`tsconfig.server.json` only, as before, and
   the merge changed nothing in `src/`, so the simulation's types are unchanged by it (`tsc -p tsconfig.sim.json --noEmit`: 0).
2. **D-264 (ours) against D-268 (theirs).** D-264 says `tests/view/page-document.mjs` carries `press` and `fire` and a test
   file keeps no copy; D-268 says the same harness starts the memory limit first and a test file takes `assert` from it. They
   do not contradict: our change added `fire` and `press` to `page-document.mjs` beside the existing `startMemoryLimit()` call,
   and left `assert`, the import order and `memory-limit.mjs` alone. D-268's new threshold ("more than forty test files on a
   document imitation reopens how the limit is held") is not reached: 25 test files import `page-document.mjs`, 27 files import
   it or `memory-limit.mjs`. D-268's comment edit in `tests/view/memory-limit.mjs` (target side) touches no line we changed.
   No test file importing the harness imports `node:assert` except `tests/view/memory-limit.test.mjs`, which neither side changed
   in this range (not ours; I did not judge it).
3. **Decisions of ours against decisions of theirs.** D-06 (build type-checks the simulation under a third configuration) and
   D-393 (simulation type check; the invariant `simulation-type-check` derives from it) do not touch what D-29 and D-32 now say.
   D-29 and D-32 widen the scope to `deployment` and add the scope test as a check; the files of our change are all inside
   the part scope the part map gives and pass. D-394 and D-395 (ours) concern the simulation and the shared controls; the target
   side's decision edits concern D-29, D-32, D-147, D-208, D-247, D-268, D-338, D-347-area chronicle measurements and an
   observability decision — none touches the same entries or their subject.
4. **Invariants.** The target side rewrote `eslint-source-rules` (now covers browser-view, simulation, account-server,
   build-tools and deployment, via the scope test) and `prettier-source-format` (adds the LF rule through `.gitattributes`).
   Ours added `simulation-type-check` and added D-393 to `simulation-isolation`'s `Derives from`. The merged
   `foundations/invariants.md` holds all of them; no identifier is duplicated. Each invariant test of the target side that the
   change reaches ran green on the merged tree (scope test) or on the changed files (lint, format, ruff). The invariant test
   `tests/invariants/test_simulation_type_check.py` itself was not run by me (see below).
5. **Part map and foundation check.** The part map is changed only by our side (the build-tools sentence, `tsconfig.sim.json`,
   `tests/invariants/test_simulation_type_check.py`); the target side's new `tests/quality/test_source_tool_scope.py` and
   `tests/quality/eslint-rule-sets.mjs` fall under the existing `tests/quality/**`. `foundation_check.py` gives 0 errors.
6. **A file both sides changed.** `foundations/decisions.md` and `foundations/invariants.md`, different hunks; merged text read
   hunk by hunk in `git diff 9e7f586e..7d61f0f3` and the entries named above read whole in the merged file.

## Declined to judge

- The measurements the target side wrote into D-147, D-208, D-247, D-268 and the chronicle decisions (their numbers and method):
  they belong to the target branch's own reviewed request and no file of our change depends on them.
- `tests/view/memory-limit.test.mjs` importing `node:assert` while the invariant `document-test-memory-limit` forbids it for
  files that import the harness: unchanged by either side in this range, outside the task.

## Checks run (all in `the task's worktree`, nothing written to the tree)

| Command | Exit |
| --- | --- |
| `python -B .the-way/elements/common/foundation_check.py` ("0 errors") | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty suppressions file in the scratchpad> <the 68 TS/JS files changed between merge base 6ab6a32b and 7d61f0f3 that still exist>` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <same 68 files>` | 0 |
| `PYTHONDONTWRITEBYTECODE=1 python -B tests/quality/test_source_tool_scope.py` (4 tests: ESLint rule sets per file, Prettier patterns, `.gitattributes` LF, control) | 0 |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache <changed .py files>` | 0 |
| `node node_modules/typescript-compiler/bin/tsc -p tsconfig.sim.json --noEmit` | 0 |
| `git status --short` after the checks | clean |

Not run (unverified, with reason): `npm test`, `npm run build`, `npm run typecheck` and `tests/invariants/test_simulation_type_check.py`
(it builds in a temporary copy of the tree, but the orchestrator's gate is running in this worktree and the handoff forbids
anything that builds); ESLint on all of `.` (the gate's own `test_eslint_source_rules`; I ran it on the changed files only, plus
the scope test, which asks ESLint for the rules of every scope file); the other tests of `tests/sim` and `tests/view`.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-393 whole, and a duplicate-heading and conflict-marker check of the five files of `foundations/`
  — to confirm D-06 and the invariant `simulation-type-check` point at an entry that exists and that the merge left no residue.
- `foundations/invariants.md`: `document-test-memory-limit` whole — to judge D-268 against our harness change.
- `git diff 6ab6a32b 7d61f0f3 -- foundations/part_map.md` — to see which side changed the part map.
- Count of test files importing `page-document.mjs`/`memory-limit.mjs` and a search for `node:assert` in them — D-268's threshold and its rule.

## Unread material

Reading the foundation for this range was mine (handoff). Not the whole-change review, so no counts of decisions by title:
- Read whole in the merged file: D-264, D-268, D-06, D-393, D-394, D-395; invariants `eslint-source-rules`, `prettier-source-format`,
  `simulation-type-check`, `document-test-memory-limit` (the last two whole; the first two in the diff and their text above).
- Read only as the hunks of the merge diff, not whole: D-29, D-32, D-147, D-208, D-247, D-338, the decision on the observability of
  the chronicle (the hunk at `decisions.md` ~8689 of the target side), and the part-map entry of build-tools.
- `guidelines/coding.md`: read only the three hunks the merge changed, not the file whole (WAY-213); `guidelines/testing.md`,
  `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` not read — the merge touched none of them and our change
  was reviewed against them earlier.
- The rest of `foundations/decisions.md` (about 400 decisions) not read; `foundations/glossary.md` not read.

## Searches not found or unclear

- None found missing. Unclear: whether `tests/view/memory-limit.test.mjs` importing `node:assert` conflicts with the wording of
  `document-test-memory-limit`; I did not open the invariant's test and it is outside this range.
