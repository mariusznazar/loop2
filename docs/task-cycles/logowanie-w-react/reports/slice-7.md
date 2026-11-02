# Slice 7 report - The guards read .tsx

**Status:** done (one concern, below)

**Commit:** see `git log -1` on branch task/logowanie-w-react (message "test: read .tsx in the guards ... each with a control").

**Files changed** (all under tests/invariants/): test_application_build_output.py (+~46/-4), test_application_package_layout.py (+~40/-18, loop moved into two helpers), test_browser_view_framework.py (+~35/-18, loop moved into `built_file_problems`), test_browser_view_token_values.py (+19/-4). test_simulation_randomness.py untouched. No .tsx file of the product added.

## Checks (command, exit code)
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (final). Seen failing first: exit 1, 3 failures, before `.tsx` joined EXTENSIONS/TYPESCRIPT; with `.tsx` taken out of TYPESCRIPT again: exit 1, 3 failures; restored: exit 0.
- `npm test -- tests/invariants/test_application_build_output.py` exit 0 (7 tests). Control 1: `.tsx` taken out of EMITTED_EXTENSION: exit 1 (KeyError '.tsx' in the new compile case). Control 2: `.tsx` taken out of tsconfig.browser.json include (restored with git checkout): exit 1, both new cases fail (no emitted .js; typecheck exits 0 on a type error).
- `npm test -- tests/invariants/test_application_package_layout.py` exit 0. `.tsx` taken out of SOURCE_EXTENSIONS: exit 1 (new control fails); restored: exit 0.
- `npm test -- tests/invariants/test_browser_view_framework.py` exit 0 (7 tests). Before the regex change: exit 1, 2 failures (`import"vue"` and `import"https://..."` not seen); after `\bimport\s+` -> `\bimport\s*`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` exit 0.
- Not run: the full `npm test` and the product gate (orchestrator's).

## Own-work check
Requirement most likely unmet: the guard of To do 13 keeps failing on a framework left as an import in the minified bundle. Check: new control `test_control_the_built_file_check_reads_a_minified_bundle` feeds made-up minified bundles (`import"vue"`, `export{a as b}from"preact"`, `import("lit")`, `import"https://..."`) and own-file imports (`import"./chunk.js"`, `import("/more.js")`). Failed 2 of 4 before the change, passes after; own imports pass. The real built bundle passes the guard (no false positive).

## Choices
- Package layout control: the loop became `application_sources` / `separate_package_failures` so a made-up owners map (`src/browser/nested/screen.tsx` + `package.json`) can be checked; the real test now collects all failures instead of stopping at the first (`self.fail`). Rejected: a control using a real tracked .tsx (none exists, forbidden by the slice).
- Build output: new cases are a `.tsx` probe compiled to `dist/browser/<probe>.js` (JSX gone, marker kept, node --check) and `npm run typecheck` failing with the probe's path and TS2322.
- Framework control tests a pure function `built_file_problems` (moved out of the test, unchanged logic) rather than a second build.

## Reaches beyond the dispatch
None (read only the four files and the repo's tsconfig.browser.json / scripts/build.mjs to write the probes).

## Concerns / problems observed
- Token guard reader (`literal_texts`, not changed): after a JSX closing tag such as `</p>` it treats `/` as the start of a regex and skips to the end of the line, so a colour literal later on the SAME line is not read (a literal on the next line is). Verified with a made-up line; the control uses the next-line form. Guessed cause: the regex heuristic (`last` char `<` is in REGEX_AFTER). Spec says the reader needs only the extension; this is a limit for the first real .tsx file to weigh.
- Tool quirk only: backslash escapes in Edit/heredoc text were collapsed once; files verified by running.

## Searches not found or unclear
none
