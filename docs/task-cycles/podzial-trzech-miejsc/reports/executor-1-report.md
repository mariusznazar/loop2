# Report of executor-1 (slice 1), task `podzial-trzech-miejsc`

**Status:** done

## Commits (on `task/podzial-trzech-miejsc`, base of the slice `fc6e0046`, start `8ca21555`)

1. `dadc0afd` refactor: divide the kitchen-sink page by its groups of samples into modules beside its entry
2. `9885485c` docs: the last paragraph of the rule "The kitchen-sink page" of the styleguide

## Files changed

| File | Added / removed lines (git count) |
|---|---|
| `src/browser/kitchen-sink/kitchen-sink.tsx` | +12 / -1006 (now 70 lines in all; entry, `PAGE_MARKER`, `Page`, `typeEmptyInto`, first draw) |
| `src/browser/kitchen-sink/sample-parts.tsx` (new) | 102 lines: `State` type, `reason`, `Forced`, `FormFigure`, `Section`, `ICONS`, `IconMask` |
| `src/browser/kitchen-sink/control-samples.tsx` (new) | 361 lines: `STATES`, `NOT_APPLYING`, the samples, `CONTROLS`, `emptyNumberInput` (exported), `ControlsSection` (exported) |
| `src/browser/kitchen-sink/account-samples.tsx` (new) | 275 lines: form kinds, `FormSample`, `FormsSection`, `MenuSample`, `MenuSection` (the two sections exported) |
| `src/browser/kitchen-sink/role-samples.tsx` (new) | 124 lines: `ROLES`, `SURFACES`, `RoleSample`, `RolesSection` (exported) |
| `src/browser/kitchen-sink/tile-samples.tsx` (new) | 193 lines: `MARGIN`, `TileDrawing`, `LinkedRow`, `TILE_SAMPLES`, `TilesSection` (exported) |
| `guidelines/styleguide-browser-view.md` | +4 / -4 (last paragraph of the rule only) |

The code was moved by line ranges of the original (`sed`), not retyped; Prettier (`--write`, same flags as the check) re-wrapped a few signatures and imports. Changes to code beyond the move: `export` on the symbols the entry and the sibling modules import, the `import` lines, each module's opening comment, and the entry's comment (it no longer says that code only the page needs stays in that module; it says it stays in the directory). Left out as separators: the `// --- group ---` banner comments.

The new sentence of the styleguide (Polish, as the file is):

> Źródła strony stoją w `src/browser/kitchen-sink/`. Poza tym katalogiem strona importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje w tym katalogu, w modułach obok jej modułu wejściowego, a nie w `src/browser/view/`, gdzie trafiłby do wyniku `npm run build`.

## Checks (command and exit code)

| Check | Result |
|---|---|
| Before/after markup: `playwright-cli -s=exec1 --raw eval 'document.querySelector(".sample-page").outerHTML'` on the base and after the split, `cmp before.html after.html` | exit 0, prints nothing; both files 49844 bytes. No React-generated id differs, since the files are byte-identical |
| Screenshots `playwright-cli -s=exec1 screenshot --full-page`, `cmp before.png after.png` | exit 0, byte-identical (537061 bytes each); I looked at `after.png`: header, the controls table (15 rows x 7 states), 10 form samples, 3 menu samples, 26 roles, 7 tile samples, in that order |
| `playwright-cli console error` before and after | the same single entry both times: `Failed to load resource ... 404 ... /favicon.ico` (the missing favicon, ordinary per `loop2-play`); no error of the page |
| `npm run kitchen-sink -- --build-only` | exit 0 |
| `node tests/quality/eslint-size-rules.mjs` | exit 0; base named 4 places (`kitchen-sink.tsx` 890, `startApp` 449, `createProgramsEntry` 245, `build` 225); now 3 (the same `startApp`, `createProgramsEntry`, `build`, same sizes); no file of `src/browser/kitchen-sink/` named, no place new |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/kitchen-sink` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore "src/browser/kitchen-sink/**/*.{ts,tsx,css,html}"` | exit 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 tests OK (`scripts/test.py` runs only the named file) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0, 4 tests OK |
| `npm test -- tests/invariants/test_cross_part_imports.py` | exit 0, 10 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |

I did not run the full gate (`npm test` with no path); it is the orchestrator's. No test failed first: no test was written, since the slice is a move with no new behaviour, and the invariant test `application-build-kitchen-sink` was not changed (it passes after the split; it imports `PAGE_MARKER` from the entry, which still exports it). I did not break the behaviour for a moment to see that invariant fail, since the slice changes no invariant's test.

## Own-work check (section 3)

- Requirement most likely not met: "the page shows the same samples, in the same order, in the same states, with the same classes and texts" (acceptance criterion 3), the one thing no test of the repository checks.
- Check: the markup of the page's host and a full-page screenshot taken on the base before any change of code and again after the split, compared with `cmp`. It showed byte-identical markup and byte-identical screenshots. The empty state of the number field (emptied by `typeEmptyInto` through the ref now exported from `control-samples.tsx`) shows empty in the screenshot, so the ref still reaches the entry.
- Second check: the marker `loop2-kitchen-sink-page` appears in `src` only in `index.html` and the entry `kitchen-sink.tsx` (`grep -rln`), as the comment at `PAGE_MARKER` says.

## Reaches beyond the dispatch

- `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/slice.md` were read as named / required by the method. `guidelines/styleguide-browser-view.md` was read around the rule (lines 380-470) only, to the end of the rule and the start of the next; the dispatch names no reading of it whole, though `AGENTS.md` says to read it before changing a file of `browser-view`.
- `grep` for other mentions of the sentence "stays in this module" / `kitchen-sink.tsx` in `*.md`, `*.py`, `*.mjs`, `*.json` outside `.runs`, `.the-way`, `node_modules`: besides the styleguide, only `tests/quality/test_function_and_file_size.py:146` names `kitchen-sink.tsx` (a comment on the expected failure, which another slice of the plan removes). Not touched here.

## Working copies

- `.runs/executor-1/` in the worktree: `before.html`, `after.html`, `before.png`, `after.png`, `orig.tsx` (the base copy of the entry, the source of the line ranges), `server-*.log`, `size-before.txt`, test logs. Removed before return (see the final line below).
- `.playwright-cli/` in the worktree (console logs and snapshots the tool wrote itself): removed. The screenshots were written by `--filename` straight into `.runs/executor-1/`, so no original stood in `.playwright-cli/`.
- Servers: two `npm run kitchen-sink` runs (ports 55207 for the base, 54577 after the split), each stopped (`Stop-Process` of the `node scripts/kitchen-sink.mjs` process); a request to 55207 afterwards failed to connect, and a final search found no `node` process with `kitchen-sink` in its command line. Playwright session `exec1`: closed (`Browser 'exec1' closed`, and again after the second run).
- No screenshot was committed, kept in the cycle's record or shown to the human.

## Unread material

- `foundations/invariants.md` (the five entries named: `application-build-kitchen-sink`, `function-and-file-size`, `eslint-source-rules`, `prettier-source-format`, `browser-view-token-values`) and `foundations/part_map.md:3-32` and `:90-125`: not opened. The checks they describe were run as the slice's own commands and passed. Decisions D-45, D-269, D-265, D-425 and D-421: read whole.
- `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`: read whole (more than the named passages).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `tsconfig.kitchen-sink.json`, `tsconfig.browser.json`, `scripts/kitchen-sink.mjs` (first 150 lines, which is the whole script), `tests/invariants/test_application_build_kitchen_sink.py`, `.the-way/task-cycle/change/ui_check.md`: read whole. `src/browser/kitchen-sink/index.html`: not opened (not changed; the test and the build copy it).
- `foundations/decisions.md` D-323 (changed by `8ca21555`): not read; it is not in this slice.

## Searches not found or unclear

- none, except: whether `tests/quality/test_function_and_file_size.py:146` (comment naming `kitchen-sink.tsx`) should change in this slice: the plan gives it to the slice that removes the expected failure, so I left it.

## Choices

- `FormFigure` stands in `sample-parts.tsx` as the plan says, though only `account-samples.tsx` uses it; the alternative (in `account-samples.tsx`) is two lines smaller in `sample-parts.tsx`, and moving it later is a one-line change if the reviewer prefers. `State` is exported from `sample-parts.tsx` (the type `Forced` needs) and `control-samples.tsx` imports it; `NOT_APPLYING` stays in `control-samples.tsx`, where only controls use it.
- Styleguide wording: I kept to the settlement (code stays in the directory; beyond it only game modules; reason kept) and added nothing about the compiler config that is why the modules must stand directly in the directory (`tsconfig.kitchen-sink.json` includes `*.ts`/`*.tsx` of that directory only, not subdirectories); a reader who puts a module in a subdirectory would get a build failure, not silent harm. Cost if wrong: a one-sentence addition later.
- Mismatch with the handoff: none (the handoff's "890 lines of code" is the lint count; the file has 1064 raw lines).

## Problems observed

- none. A `PreToolUse` hook of the user's setup blocked a Bash call once for each of two rules files (`scripts.md`, `git.md`) until read; both were read and the calls repeated.

## Working copies line

`.runs/executor-1/` removed at the end of the run (nothing of it is kept in `reports/`: the results are in this report).
