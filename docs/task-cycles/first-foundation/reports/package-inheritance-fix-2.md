# Package configuration inheritance correction 2

Input: `a4e7d032f187a444f732e65e89b2879c99acd2e5`.
Correction: `bba696959ba721b50d0d2884df0fdbf45e5579bc`.

Fresh invariant-check correction author, continuing the same scoped assignment. Only `tests/invariants/test_application_package_layout.py` changed in the commit. The current scoped review report `final-code-review-rereview.md` was read once it appeared; its new Important finding is addressed here.

## Change

Known root application configurations retain the strict effective-directory reader. Candidate packages now use the installed TypeScript API: `getParsedCommandLineOfConfigFile` resolves inherited options and `getOutputFileNames` maps each configured input to its emitted output paths. Classification compares the declared browser entry to those outputs. It no longer imposes explicit rootDir/outDir on unrelated tools or duplicates TypeScript's default-directory rules.

An entry is associated with application source by copied browser-source bytes or a tracked page that loads its output. Copy comparison now searches the existing browser source set rather than reconstructing a counterpart path from a directory that may be implicit. Tracked candidate inputs and output paths still gate this evidence. Page lookup covers the package root, source file parent and an explicitly resolved source root. Invalid compiler configuration diagnostics remain visible.

The Node API script is supplied as one argument through Python subprocess with no shell; the installed module and configuration paths are separate arguments. Tests exercised a package path containing a space. The file rewrite preserved line endings using newline='' for read and write.

Cost and choice: simply skipping candidates without directory options would restore the tooling control but also miss an actual separate application using defaults. The selected API provides the mapping for both cases at the cost of one compiler API subprocess per candidate configuration. It emits no product files itself.

## Verification

Focused unchanged test: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` — exit 0, 1 test PASS.

All experiments used fresh TreeCopy directories with an initialized Git repository for real check-attr. ROOT and listed-file enumeration pointed to the copy. Copies were removed in finally blocks.

| Scenario | Compilation | Invariant |
|---|---|---|
| Both root leaf configs contain only extends; unchanged options reside in sibling bases | application build exit 0 | PASS |
| Reviewer tooling control: root-level main.ts, target ES2022, empty types, outDir ./dist, omitted rootDir, browser dist/main.js | nested tsc exit 0; output exists | PASS |
| Reviewer tooling control: root-level main.ts, rootDir '.', omitted outDir, browser main.js | nested tsc exit 0; output exists | PASS |
| Separate browser app: copied source, nested base config with rootDir ../src and outDir ../dist, extends-only leaf | nested tsc exit 0; output exists | Expected assertion naming separate application package |
| Separate browser app: root-level copied source, omitted rootDir, outDir ./dist | nested tsc exit 0; output exists | Expected assertion naming separate application package |
| Separate browser app: root-level copied source, rootDir '.', omitted outDir | nested tsc exit 0; output exists | Expected assertion naming separate application package |

Tooling controls use export const report = 42 and no application page. No compiler/setup error supplied any deliberate-break result.

An initial attempted no-rootDir control put the source under src and TypeScript 6 rejected its build with TS5011. That attempt was not treated as valid evidence; the final controls reproduce the reviewer's compiling root-level source cases.

`git diff --check`: exit 0. The commit contains only the authorized test path. Full invariant gate, npm ordinary suite and foundation guards were not rerun for this second correction; the orchestrator retains responsibility for final gates. Independent re-review and WAY-69 deliberate-break acceptance remain required.
