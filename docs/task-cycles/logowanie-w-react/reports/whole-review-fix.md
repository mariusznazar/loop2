PASS b4153683f203bbe34693eb29e05e590764f15ccb

# Review of the fix of I1 and I2 — task `logowanie-w-react`

Range `4634e6b..b415368`, commits 8b52de9 and b415368, two files of `tests/invariants/`, no product code. Bounded by `reports/whole-review-findings.md`, as `.the-way/task-cycle/review/fix.md` gives. `git rev-parse HEAD` is the head given, and the reviewed worktree stayed clean. Crafted runs took place in a separate worktree of b415368, removed afterwards.

Counts: 0 blocking, 3 Minor, 0 out of scope.

## Findings of the review

| Finding | State | Contested |
|---|---|---|
| I1 | **fixed** | no |
| I2 | **fixed** | no |

### I1 — fixed

Every run is the two cases of the guard, from `tests/invariants`: `python -B -m unittest test_browser_view_framework.NoUiFramework.test_no_ui_framework_in_runtime_dependencies test_browser_view_framework.NoUiFramework.test_browser_source_imports_no_ui_framework`.

| Tree | Exit | Result |
|---|---|---|
| The tree as it stands | 0 | passes, so nothing the tree needs is refused |
| Alias, as my review crafted it by hand | 1 | refused by the dependency case |
| Alias in a lock npm wrote: `npm install --package-lock-only --ignore-scripts --legacy-peer-deps --save-exact "react@npm:preact@10.0.0"`, exit 0; the entry holds `"name": "preact"` | 1 | refused by the dependency case |
| `@mui/material` in `dependencies`, imported by `src/browser/zz-temp.tsx`, in a lock npm wrote: `npm install --package-lock-only --ignore-scripts --save-exact @mui/material@7.0.0`, exit 0 | 1 | refused by both cases |
| `@mui/material` as my review crafted it by hand, lock entry `{"version": "7.0.0"}` | 0 | **still passes** |

The last row needs reading. My hand-made lock entry held no `peerDependencies`, which no lock npm writes for that package: the real entry declares `react` `^17.0.0 || ^18.0.0 || ^19.0.0`. So the crafted case in its real form fails, and the hand-made form falls under the limit the docstring now states, a library that declares no peer dependency on react. I accept that limit, since my finding allowed the component-library half to be settled by saying what stands outside the guard.

**Does the tree stay allowed?** Read from the real lockfile: the only non-dev entry whose `peerDependencies` name `react` is `react-dom`, which `REACT_ITSELF` excepts. `scheduler` has no peer. Three entries carry a `name`, all of them TypeScript packages (`node_modules/typescript`, `node_modules/typescript-compiler`, `node_modules/typescript/node_modules/@typescript/old`), so the new reading of `name` refuses none. No non-dev entry is `peer`, `optional` or `devOptional`.

### I2 — fixed

`typescript_findings` called directly on the text, on the fix's module:

| Text | Before | Now |
|---|---|---|
| `{a ? <X y={1} /> : <X style={{ color: "red" }} />}` | `[]` | colour `red` |
| `const b = [<X y={1} />, <X style={{ color: "#fff" }} />];` | `[]` | colour `#fff` |
| `const a = <input value={x} />; const c = "#fff";` | `[]` | colour `#fff` |
| `const a = <p>https://x</p>; const c = "#fff";` | `[]` | colour `#fff` |
| `{a ? <X y="1" /> : <X style={{ color: "red" }} />}` | flagged | flagged |

Also flagged, beyond the report: after `<X {...b} />`, after two self-closing tags in a row, and after a `/>` on a line of its own, with the right line number. The closing-tag case of Q16 stays flagged.

**Nothing read as a comment or a regex was lost.** Each gives `[]`, as it must: a comment after `: `; a comment after `/>`; a regex after `}` on a new line; a regex after `< `; a regex after `=`. A division stays clean.

## What the fix itself broke

Nothing Critical or Important. All focused checks pass, and each line of the fix but one is held by a control (table below). The one that is not is N1.

## Minor notes

None reopens the review.

**N1. A library on React taken as a development dependency and imported by the browser source still passes.** `tests/invariants/test_browser_view_framework.py:142`, reached from `:242`. `@mui/material` in `devDependencies`, in a lock npm wrote, imported by `src/browser/zz-temp.tsx`: exit 0. esbuild bundles what the source imports whatever the manifest says, so such a library would reach the player, while a listed framework is refused on that route. It takes a deliberate `-D`, since a plain `npm install` writes to `dependencies`. The docstring's *Covers* says „not marked `dev`”; *Does NOT cover* does not name the route. The mutation below shows this condition has no control, and dropping it closes the route in one word: with `not entry.get("dev", False)` removed from `react_libraries`, this tree exits 1 by the source case and the whole class `NoUiFramework` on the real tree exits 0. I keep it Minor because my finding let this half be settled by a stated limit, and the listed frameworks' route is closed.

**N2. The guard now refuses more than the invariant's words, and the human should know before the next screens.** `tests/invariants/test_browser_view_framework.py:136-145`. `@dnd-kit/core@6.3.1` in `dependencies`, no view library but a helper for dragging: exit 1. D-03's *Rationale* names dragging a rule between groups as a risk of the program editor, so this can come up soon. A router, a state library, or any package with an optional peer on react is refused the same way: `peerDependenciesMeta` is not read. The failure is loud and the way out is a change of the guard on purpose, and `fix-1.md` already says so for the human. The base refused all of these too, so nothing is lost; it belongs in the request under what the foundation puts before the human.

**N3. Two forms the token reader still reads wrongly.** Neither is a regression. `<X<T> />; const c = "#fff";` gives `[]`, as `>` stands in `REGEX_AFTER`; a generic component is rare. A real comment right after a colon with no space, `:// "#fff"`, is now read as code and flagged: Prettier always puts a space there, and the error is loud. An address with a later `=/` stays flagged correctly, and the docstring's limit on `//` is accurate.

## Checks

### In a separate worktree of b415368

| Command | Exit | Result |
|---|---|---|
| `npm ci` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 8 tests, the bundle's case included |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 tests; it imports from the changed module |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 | 3 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, with a link to the worktree's `.runs/quality-venv`, removed after |
| The trees of I1, each by the unittest command above | as in the table | |
| Real locks by `npm install --package-lock-only --ignore-scripts`: `@mui/material@7.0.0`, the alias, `@mui/material@7.0.0` with `--save-dev`, `@dnd-kit/core@6.3.1` | 0 each | run results: 1, 1, 0 (N1), 1 (N2) |
| `python -B <scratchpad>/token_probe3.py <out>`, on crafted text | 0 | I2 and N3 |

### Each line of the fix taken out, one at a time, each restored

Run by `python -B -m unittest` on the framework control, the dependency case and `test_browser_view_token_values`, from `tests/invariants`.

| Taken out | Exit | Result |
|---|---|---|
| alias not read | 1 | 3 failures |
| lock `name` not read | 1 | 2 failures, the control alone |
| no library on React | 1 | 3 failures |
| `react-dom` not excepted | 1 | 2 failures |
| `dev` condition of `react_libraries` | 0 | **survives, N1** |
| `/>` after `}` not read | 1 | 4 failures |
| address not read | 1 | 1 failure |
| any `/` after `}` taken for no regex | 1 | 1 failure, so the regex control holds |

### On the condition of N1

| Command | Exit | Result |
|---|---|---|
| Condition removed, `@mui/material` as a dev dependency imported, the two cases | 1 | refused by the source case |
| Condition removed, the tree as it stands, `python -B -m unittest test_browser_view_framework.NoUiFramework` | 0 | |

### In the reviewed worktree, reading only

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

### Did not run

- `npm test` without arguments and the whole gate: forbidden by the dispatch, the orchestrator's run.
- H1, with mail: the human's.
- A build with `@mui/material` really installed: the locks were written with `--package-lock-only`, so that esbuild carries a development dependency into the bundle is reasoned, not seen.
- Any test on jsdom: the fix touches none, and nothing here loaded an imitation.

## Declined to judge

- The Minor findings of `reports/whole-review.md`: not fixed by design, and the findings file bounds this review.
- The name `UI_FRAMEWORKS` now holding frameworks alone, with libraries on React found apart: a matter of naming.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `.the-way/task-cycle/review/fix.md` | whole | the variant the dispatch names |
| `reports/fix-1-handoff.md` | whole | the dispatch names it, and it holds the orchestrator's answer on I1's open half |
| The public npm registry | `npm install --package-lock-only`, package names and versions only | to test real lock entries, not my hand-written ones |

## Searches not found or unclear

- **Whether a library imported by the browser source counts as a runtime dependency when the manifest calls it development:** D-03 and the invariant say „its code or its runtime dependencies”, so the import is covered in words, and the fix reads the lock's `dev` mark there. N1.
- **Which React helpers the project will want:** nothing in the task or the foundation says, so N2 names the guard's reach and no list.
