# Report of executor-4 - slice 4, `podzial-trzech-miejsc`

**Status:** done

## Commit

- `d0c29c43` on `task/podzial-trzech-miejsc` (parent `26c650cc`, the slice's base; no other agent's commit lay between).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/programs-entry.ts` | 39 | 210 |
| `src/browser/view/programs-pull.ts` (new) | 154 | 0 |
| `src/browser/view/programs-reset.ts` (new) | 106 | 0 |
| `tests/quality/test_function_and_file_size.py` | 1 | 9 |

## What was done

- `programs-pull.ts`: `createProgramPull(options)` holds the value of the pull, the numbering of questions and pulls, `answerPull`, and returns `view()`, `ask()`, `pullPrevious()`, `leave()`. It reaches what stays in the entry through the options: the store, the client, `previousSaveAllowed`, `onSignedOut`, `disposed()` (a getter of the entry's flag) and `onChange` (the entry's `drawPrograms`).
- `programs-reset.ts`: `createProgramReset(options)` holds `ResetState` (now exported) and returns `state()`, `view()`, `set()`, `ask()`, `withdraw()`, `confirm()`, `leave()`; `view()` is the former `resetViewOf`.
- `programs-entry.ts`: `build` makes both, draws the list from `pull.view()` and `reset.state()` as before (the comparison of `drawn` is on the same object identities), passes `pull.pullPrevious`, `reset.ask`, `reset.confirm`, `reset.withdraw` to the list, calls `pull.ask()` on entering, and `leavePrograms` calls `pull.leave()` then `reset.leave()` (the old order: the pull is dropped and drawn first, then the confirmation closes). `setReset = reset.set` (it ignores a call after `dispose()` as before). The options of the entry and `ProgramsEntry` are unchanged; `game-view.ts` and the other files are untouched.
- `tests/quality/test_function_and_file_size.py`: `@unittest.expectedFailure` and the whole comment above it (which named `startApp`, `createProgramsEntry`, `build` and `kitchen-sink.tsx`) are removed; the first paragraph of the module docstring said the control case guards "the expected failure of the first case", and it now says "cannot pass the first case". Nothing of the file names a place any more (`grep` for `expectedFailure`, `expected failure`, `kitchen-sink`, `startApp` finds nothing).
- Where the run stands: `node tests/quality/eslint-size-rules.mjs` printed `0 functions and files over a threshold in 323 files` and ended 0 before I took the mark off, so the mark and the comment went in this same commit.

## Checks (command, exit code)

| Check | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the three files | 0 (see "A check that failed" below) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the three files | 0 |
| `npm test -- tests/view/previous-save.test.mjs` | 0, 46 pass (46 at the unchanged tree) |
| `npm test -- tests/view/program-list.test.mjs` | 0, 23 pass |
| `npm test -- tests/view/program-panel.test.mjs` | 0, 60 pass |
| `npm test -- tests/view/screen-registry.test.mjs` | 0, 15 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0, 133 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0, 19 pass |
| `node tests/quality/eslint-size-rules.mjs` | 0, no line but `0 functions and files over a threshold in 323 files` |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0, `Ran 2 tests ... OK`, no expected failure, no unexpected success |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |

Not run: the full `npm test` (the orchestrator's), `check_instructions.py` on its own (no instruction file changed).

**A check that failed and passed again.** (1) First eslint run on the three files: exit 1, five `@typescript-eslint/unbound-method` errors on `pull.pullPrevious`, `reset.ask`, `reset.confirm`, `reset.withdraw` and `reset.set` (they are declared as methods in the types and passed unbound). I changed the members of the two types `ProgramPull` and `ProgramReset` from method syntax to property syntax (`readonly ask: () => void;`), a change of the declaration, not of a rule or of behaviour; the rerun of the same command ended 0. (2) The baseline of the six view tests on the unchanged tree: I started them in the background and, by mistake, ran one more `npm test` in the foreground at the same time; both rebuild `dist/`, so the loop's `program-list` and `program-panel` runs failed with `ERR_MODULE_NOT_FOUND` for `dist/browser/view/app.js`. I reran those two alone on the unchanged tree: 23 pass and 60 pass, exit 0. The failures were mine (concurrent builds), not the code's.

## Own-work check (section 3)

Requirement most likely unmet: no change of behaviour of the pull and the reset control, above all that a late answer (after leaving, after a later question or pull, after `dispose()`) is ignored and that nothing is done after `halt()`.
Check: run the focused view tests (above), and three mutations of the new modules, each followed by `npm test -- tests/view/previous-save.test.mjs` and `program-list.test.mjs`, then restored from a copy (restore verified with `diff`):
1. `leave()` of the pull no longer numbers (`numbering += 1` removed): `previous-save` 45 pass, 1 fail. Caught.
2. `ask()` no longer checks `options.disposed()` in its answer: 46 pass, 0 fail. **Not caught.**
3. `ask()` of the reset no longer checks `store.halted()`: 46 pass, 0 fail. **Not caught.**
Mutation 2 looks equivalent from outside: after `dispose()` the list is disposed too, so a late `setView` draws into a disposed list and nothing is visible (I did not verify that `list.update` after `dispose` is a no-op; this is a guess). Mutation 3 is a real gap: no test of the files I ran asks for the confirmation after `halt()`. Both checks were in the code before the move (`disposed ||` in `askPrevious`, `store.halted() ||` in `askReset`) and moved unchanged, so the gap is not new; I added no test, because the plan's *Change* names no test file besides the size test. I did not run `uncaught-failure`/`owner-panel` against the mutations.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (the method names it for a slice's reading).
- `foundations/decisions.md`: D-425, D-400, D-401, D-402, D-407 (found by their headings and read whole). D-211 and D-323 I did not open whole (see Unread material).
- `src/browser/view/page-game-acts.ts:1-80` as a model of the style of the last slice's module.
- `guidelines/coding-browser-module.md`, as the handoff's *Read* names it; nothing more.

## Working copies

`.runs/executor-4/` held the output of the baseline run (`baseline.txt`) and copies of the two new files for the mutation runs (`bak/`). Removed (`rm -rf`); `.runs/` of the worktree no longer holds it. No worktree, clone or screenshot was made.

## Unread material

- `foundations/decisions.md` D-211 (4035-4076) and D-323 (4613-4629): not read; neither text is touched by moving code, and the behaviour it names ("after `halt()` nothing is done") is kept by the old checks that moved unchanged.
- `foundations/invariants.md` (function-and-file-size, uncaught-failure-game-state, expired-session-unsaved-progress, eslint-source-rules, prettier-source-format): not read. `foundations/part_map.md`: only grepped (`src/browser/view/**` claims the new files; `foundation_check` passes).
- `guidelines/styleguide-browser-view.md`: not read (nothing the player sees changes). `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`: read whole.
- `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md` passages: not read; the handoff's copy of the slice was enough, and nothing in it pointed to a question of the task that the slice's choices touch.
- `program-list.tsx` (read lines 1-110, the types), `screen-registry.ts`, `game-view.ts:205-225`, `state-store.ts` (read lines 55-102), `previous-save-lines.ts` (read lines 1-50), `tests/quality/eslint-size-rules.mjs`: partly or not read; the first four are not changed and the module interfaces I used are visible in what I read.

## Searches not found or unclear

- none for the code. One note: the table of *Files of this kind* in `guidelines/coding-browser-module.md` has no rows for `programs-pull.ts` and `programs-reset.ts` (nor for `page-places.ts` and `page-game-acts.ts` of slices 2 and 3), and by the guideline a file added after the last audit has no row and is no exemplar; I left the table alone (not in my slice's *Change*). Slices 2 and 3 named in their commit messages the guideline "where the code stands"; this slice adds no such sentence for the two modules, which the orchestrator may want in slice 5's guideline work.

## Choices

- Factory options carry `disposed: () => boolean` rather than moving the flag into the modules: `dispose()` of the entry stays one line and the flag is one for the pull, the reset and `setReset`. Rejected: a `dispose()` on each module (the entry would call two more methods and the modules would each hold a copy of the flag). Cost if wrong: small, the modules' interface changes in one place.
- `onChange` is the entry's `drawPrograms`, so the draw-on-change happens inside the module's setter as it did inside `setPull` and `setResetState`; the entry reads `pull.view()` and `reset.state()` at each draw, so the `drawn` comparison by object identity is the same as before.
- `leavePrograms` stays in the entry and calls both `leave()` in the old order.
- `onReset` is read once at the creation of the reset memory (`options` is readonly, so it equals the read at call time).
- The modules are named by the plan (`programs-pull.ts`, `programs-reset.ts`); the factory names `createProgramPull` and `createProgramReset` are mine.
- Function sizes were not measured by lines; the size run passing (0 over a threshold) is the evidence. At a glance `build` is about 130 lines.

## Problems

- None remaining. Observed: the mutation gaps above (evidence: previous-save 46 pass under mutations 2 and 3).
