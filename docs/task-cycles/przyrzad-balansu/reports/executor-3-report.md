# Report - executor of slice 3

**Status:** done

## Commits

- `d4675de8` build: bring the part balance-tools under ESLint, Prettier and the LF rules, with the part in the scope test of the tools and the quotation of D-32 as the foundation now words it

## Files changed

- `eslint.config.mjs` (+12 -4): `balance` added to `directories` (so `sourceFiles` and `typescriptFiles` reach it), `balance/**/*.${extensions}` added to the Node-globals entry, `balance/**/*` added to the type-check program that holds `scripts` and `tests`. Rule sets and options untouched.
- `.gitattributes` (+8): eight `balance/**/*.<ext> text eol=lf` lines, the same eight extensions as the other directories.
- `tests/quality/test_quality_invariants.py` (+2 -2): `f"balance/**/*.{SCRIPT}"` in `PRETTIER_PATTERNS`; the `# decision: D-32` quotation updated to the opening of D-32's sentence as now worded (names `balance-tools`). `tests/balance/` is already reached by the `tests/**` pattern.
- `tests/quality/test_source_tool_scope.py` (+3 -2): `SCOPE_PARTS` holds `balance-tools`; docstring "five parts" -> "six parts".
- `balance/engine.mjs`, `tests/balance/agreement.test.mjs`: not changed - they already pass ESLint, Prettier and the size rule. No further file of `balance/` exists.

## Checks

- `npm test -- tests/quality/test_source_tool_scope.py`, after `SCOPE_PARTS` held the part and before the configuration: exit 1, three failures, each for the expected reason (`balance/engine.mjs`: 64 rules unmet; not kept at LF; not reached by Prettier). After the configuration: exit 0 (4 tests OK).
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0 (5 tests OK; ESLint on `.`, Prettier on the patterns, Ruff included).
- `npm test -- tests/quality/test_function_and_file_size.py`: exit 0 (OK, expected failures=1); `node tests/quality/eslint-size-rules.mjs` run on the repository prints nothing of `balance/` (grep count 0).
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance`: exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors", no report at all.
- The full gate was not run (the orchestrator's).

## Own-work check

Requirement most likely unmet: a file of the part that the size rule does not reach would pass the gate (D-425 covers every file ESLint checks, and the rule takes its patterns from `eslint.config.mjs`). Check: a made-up `balance/big.mjs` with a 201-line function in a tree under `.runs/executor-3/`, run through `node tests/quality/eslint-size-rules.mjs <tree>`. It reported `balance/big.mjs:1: Function 'big' has too many lines (201). Maximum allowed is 200.` Also `git check-attr eol` gives `lf` for `balance/x.mjs` and `unspecified` for `balance/overlays/a.json` (JSON is outside the scripts' scope, as D-32 says).

The `# decision:` and `# invariant:` lines of `test_source_tool_scope.py` and `test_function_and_file_size.py` were checked against the reworded D-29, D-425 and the three invariants: the D-28 and D-425 quotations are still verbatim parts of binding sentences (the foundation check passes); no change needed.

## Choices

- Added `balance` to `directories` in `eslint.config.mjs` rather than as a separate script-directory entry: it then gets the TypeScript patterns too, as the other code directories do, and a `.ts` file placed in `balance/` later is type-checked through the third program (which I extended with `balance/**/*`). Rejected: only the JS patterns - a later `.ts` file would fail with a parser-program error. Cost if wrong: a one-line change.

## Reaches beyond the handoff

None.

## Unread material

none (the Read list was read; `guidelines/coding.md`, `guidelines/testing.md`, `foundations/part_map.md`, D-28 and the Slice 2 report were not opened, since the slice changes configuration and three quality tests only and nothing in them needed those; the plan's *Choices* and *Foundation entries* were read whole as part of the whole plan file).

## Searches not found or unclear

none

## Working copies

`.runs/executor-3/tree/` (the made-up tree for the size-rule check) and three output files `.runs/executor-3-*.txt`: made and removed before the commit.
