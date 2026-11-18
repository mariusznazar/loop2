# Report — executor of slice 1

## Status

`done`

## Commits

- `78f081b5` (author address private, checked with `git log -1 --format='%h %ae'`: `mariusznn@gmail.com`) — `test: :white_check_mark: add the test of the rule of size of D-425 ...`

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/quality/eslint-size-rules.mjs` (new) | 115 | 0 |
| `tests/quality/test_function_and_file_size.py` (new) | 167 | 0 |
| `guidelines/coding.md` | 26 | 0 |

(Counts from `git show --stat 78f081b5`.)

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/quality/test_function_and_file_size.py`, main case unmarked (first run, before the marking) | exit 1: `FAIL test_no_function_and_no_file_is_over_a_threshold`, control case `.` passed; message below |
| same command after the marking | exit 0: `OK (expected failures=1)`, control case passed |
| `node tests/quality/eslint-size-rules.mjs` | exit 0, 9 reports on stdout, summary line on stderr |
| `npm test -- tests/quality/test_source_tool_scope.py` | exit 0, 4 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0, 5 tests OK (ESLint, Ruff, ShellCheck, Prettier and the dependency audit, which ran with the network), run before the commit with the new files untracked |
| `python -B .the-way/elements/common/foundation_check.py` before the commit | exit 1, 1 error: `function-and-file-size` reads `test` and no test cites it — the new test file was untracked, so git did not list it |
| same command after the commit | exit 0, `0 errors`, so the invariant is cited |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/quality/eslint-size-rules.mjs` | exit 1 on the first draft (one line wrapped differently), `--write`, then exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/quality/eslint-size-rules.mjs` | exit 0 |

The full gate (`npm test` with no argument) was not run, as the method gives.

### First failing run of the main case (before the marking)

`npm test -- tests/quality/test_function_and_file_size.py`, exit 1, message:

```
src/browser/kitchen-sink/kitchen-sink.tsx:956: File has too many lines (890). Maximum allowed is 800.
src/browser/view/app.ts:248: Function 'startApp' has too many lines (449). Maximum allowed is 200.
src/browser/view/program-panel.tsx:397: Function 'ProgramPanelView' has too many lines (293). Maximum allowed is 200.
src/browser/view/programs-entry.ts:81: Function 'createProgramsEntry' has too many lines (245). Maximum allowed is 200.
src/browser/view/programs-entry.ts:102: Method 'build' has too many lines (225). Maximum allowed is 200.
src/browser/view/rule-list.tsx:215: Function 'RuleListView' has too many lines (511). Maximum allowed is 200.
src/browser/view/rule-panel.tsx:197: Function 'RulePanelView' has too many lines (345). Maximum allowed is 200.
src/browser/view/scene.tsx:557: Function 'Scene' has too many lines (366). Maximum allowed is 200.
tests/transport.test.mjs:537: Async arrow function has too many lines (238). Maximum allowed is 200.
```

Set named: the four views (`ProgramPanelView`, `RuleListView`, `RulePanelView`, `Scene`), the async arrow
function of `tests/transport.test.mjs` near line 537, and the set of Q1 (`startApp`,
`createProgramsEntry` with its method `build`, `kitchen-sink.tsx`). The set the comment at the marking
names is Q1's set, the same as the one the failing run found beyond the four views and the test function:
no difference from Q1, and `createGameView` is not reported and not named.

Both exceptions hold on the repository's own code: `accountRoutes` and `saved-game.ts` are over a
threshold and are not in the list.

### The control case seen failing, then restored

The control case passed at its first run (it was written after the script, against the script as
configured), so it was seen failing against five configurations broken for a moment, each restored
from the copy `.runs/executor-1/eslint-size-rules.orig.mjs`; after the last, `cmp` of the file
against that copy printed `restored`. Each run is `npm test -- tests/quality/test_function_and_file_size.py`,
exit 1 (2 failures, the unmarked control case among them; the main case failed too, with its own
message, which says nothing of the break):

| Break | Control case's failure |
|---|---|
| A: every report of `src/server/account-routes.ts` dropped (`isException` returns true for the file) | `otherRoute` of `account-routes.ts` missing from the reports |
| B: `FUNCTION_LIMIT` 201 | eight reports missing |
| C: `skipComments: false` | `at-file.ts` reported, and others |
| D: the file rule not turned off under `tests/` | `over-file.test.mjs` reported |
| E: `applySuppressions: true` with the suppressions file of the made-up tree | `over-function.ts` missing |

## Own-work check

The requirement most likely missed: *the configuration lists the decision's two exceptions and no other*:
the function exception drops `accountRoutes` of `account-routes.ts` only, not the other functions of that
file nor `accountRoutes` of another file; and the file rule is off for `saved-game.ts` and under
`tests/` only. The control case holds exactly these: `otherRoute` of the same file reported,
`accountRoutes` of `src/server/other-routes.ts` reported, `tests/over-file.test.mjs` and
`saved-game.ts` of 801 lines not reported, and the control case failed on breaks A and D. The control
case also holds the boundary (a function of 200 lines and a file of 800 lines, each with blank lines and
comments added, not reported; 201 and 801 reported), the lines of a nested function counted in the
outer one, JSX in a `.tsx` read, `.claude/hooks/` and `scripts/` reached, `elsewhere/` and `dist/` not,
and an `/* eslint-disable */` comment and an `eslint-suppressions.json` hiding nothing.

## Choices

- **The two questions the plan left to the code.**
  - *Can ESLint 10.12's API limit a run to two rules?* Yes, by not reading `eslint.config.mjs` as the run's
    configuration: `new ESLint({ overrideConfigFile: true, overrideConfig })` with an `overrideConfig`
    that holds the two rules alone, so the run applies no rule of D-29. The files and the ignores come
    from `eslint.config.mjs` by importing its default export in the script: each pattern of every
    entry's `files` joins the patterns of the run, and an entry with `ignores` alone gives its global
    ignores. An entry whose `files` holds a non-string (the nested-array form) throws, so that a change of
    `eslint.config.mjs` to a form the script cannot read stops the run instead of narrowing it.
    Settled from `node_modules/eslint/lib/eslint/eslint.js` (the options are read through
    `eslint-helpers.js`) and from running it. Rejected: `ruleFilter` on the real configuration plus the two
    rules in `overrideConfig`: it would also build the three type-aware TypeScript programs of
    `eslint.config.mjs` for each parse, and needs the same `files` patterns anyway to keep a file that
    only ESLint's default patterns match (`.js` outside the scope) from being measured.
    The import of `eslint.config.mjs` builds the programs once, but the run on files parses them with
    `tseslint.parser` without type information, and takes about 3.5 s in all.
  - *Does the API apply a bulk-suppressions file by default?* No: `applySuppressions` is `false` by default in
    `eslint-helpers.js` (line 790) and `eslint.js` applies suppressions only when it is true (line 1081);
    the CLI turns it on (`cli.js`). The script still sets `applySuppressions: false` itself, and the control case
    holds an `eslint-suppressions.json` that names a real report, so a later change that applied it would
    fail the control case (break E).
- **`IIFEs: true`** for `max-lines-per-function`: D-425 says "a function", and ESLint's default leaves an
  immediately invoked function unchecked. The set reported is the same with `IIFEs` default and with
  `true` today (compared on a copy in `.runs/executor-1/`), so the choice changes no report now and keeps
  an IIFE from escaping. Cost if wrong: a new IIFE over 200 lines is reported where a reader of the
  decision might not expect it.
- **The exception of `accountRoutes` is a filter in the script**, since ESLint's rule has no
  option to exempt one function by name; it matches the file and the start of ESLint's own message
  (`Function 'accountRoutes' has too many lines`). Cost if wrong: if ESLint rewords that message the exception
  stops dropping the report and the test fails with `accountRoutes` named, which is loud, not silent; the
  control case would also fail (it expects `accountRoutes` not reported at its place).
- **The script's output** is ESLint's own message with `file:line:` before it, in plain lines, not JSON,
  so that a person who runs it by hand reads it; it exits 0 whatever it finds (a parse error of a file,
  a fatal message, throws instead, so that an unparsable file cannot pass unmeasured). The directory to
  check is an optional first argument; with none it is the working directory. That argument is the
  only addition to "no argument", and it is what lets the control case run the same configuration on made-up
  files.
- **The control case cites no invariant.** The invariant's sentence is about the product's code, and a test
  fed made-up input is, by the template of invariants, the method of a sentence about the check
  it exercises (`.the-way/elements/invariants/template.md`, "Method and test"); the foundation check
  accepts it (0 errors). Rejected: citing it too, as `test_control_unmet_rules_are_found_by_severity_and_options`
  does for `eslint-source-rules`; it would make the control case an invariant test whose result decides the
  invariant's result.
- **The text of `### Size of a function and a file` is in Polish**, as the rest of `guidelines/coding.md`
  and `guidelines/testing.md` are; the code and the Python test are in English. It repeats no threshold
  or exception and gives no command; it names the test file and the script file by path, and states
  that the invariant stays marked violated while code stands over a threshold. *Good* and *Bad* are
  written, not `none`. The sentence that a change adding to an over-threshold function begins with a move
  (without change of behaviour) is carried from `make-change` section 1 (WAY-365), which says
  the rule is in the product's coding guidelines.
- **`tests/quality/test_function_and_file_size.py` makes no use of `loop2_invariant_support`**: it
  needs only a subprocess and a temporary directory.

## Reaches beyond the handoff

- `node_modules/eslint/lib/eslint/eslint.js` and `eslint-helpers.js` (the grep of `uppression`) and
  `rules/max-lines-per-function.js` (the message form): to settle the two questions the plan left
  to the code.
- `foundations/invariants.md:1400-1417` (the entry `function-and-file-size`, read in full for the
  citation) and `foundations/decisions.md:822-839` (D-425, whole, as handed).
- `.the-way/task-cycle/change/slice.md` (read whole, the method names it for a slice).
- `tests/quality/test_quality_invariants.py:1-60` read for the existing ESLint run with the empty
  suppressions file, which was in the *Read* list, and `git log` subjects for the commit style.

## Unread material

- `.runs/task-cycles/struktura-kodu/task-frozen.md` (ranges 24-82, 92-111) and `cycle.md:53`: not read
  (the handoff states the binding choices Q1, Q3, Q4 and the plan's choices; I worked from them).
- `.runs/task-cycles/struktura-kodu/reports/foundation-entries-report.md`: not read.
- Decisions D-28 (read at lines 440-444 only: its end), D-32, D-73, D-77, D-82, D-83 and the invariants
  `ruff-source-rules`, `prettier-source-format`, `cross-part-imports`, `eslint-source-rules`: not read
  as entries; `guidelines/testing.md`, which cites them, was read whole.
- `.the-way/product-guidelines/coding/template.md:60-78` and `232-255`, and
  `.the-way/elements/invariants/template.md:44-72`: read; `:157-165` (Violated) not read.
- `eslint.config.mjs`, `tests/quality/eslint-rule-sets.mjs`, `test_source_tool_scope.py`,
  `guidelines/coding.md`, `guidelines/testing.md`: read whole. `test_quality_invariants.py`: first 120
  lines (the file is 89 lines: whole).

## Searches not found or unclear

- none. (One note: `foundation_check.py` reports the invariant uncited while the new test file is
  untracked; it is a feature of how git lists files, not a defect, and it passed after the commit.)

## Working copies

`.runs/executor-1/` of the worktree (`.runs/executor-1/`):
`eslint-size-rules.orig.mjs` (the copy used to restore after each break) and `size-noiife.mjs` (the script
without `IIFEs: true`, for the comparison). Both removed before returning.
