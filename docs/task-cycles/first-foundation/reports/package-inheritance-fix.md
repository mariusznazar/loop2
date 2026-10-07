# Package configuration inheritance correction

- Input commit: `26661cd6a934a797062d096d856feec4548caffb`.
- Correction commit: `a4e7d032f187a444f732e65e89b2879c99acd2e5`.
- Author: fresh invariant-check correction agent, separate from application code and foundation sentence authors.
- Authorized product write: `tests/invariants/test_application_package_layout.py` only. No foundation, part map, application code, or other product file changed.
- Source: `application-package-layout/1` and Important finding 1 in `final-code-review-current.md`.
- Process pin: gitlink and checkout both `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`; read project AGENTS, project implementation skill, pinned task-cycle skill, WAY-69, current invariant and check, support module, configuration and package files.

## Change and choice

Both the root application locations and candidate browser packages now use the installed TypeScript compiler's `--showConfig` result. TypeScript resolves inheritance and rebases relative options to the selected leaf configuration; the Python helper resolves those against the leaf's parent. The invocation uses `node` and its installed compiler script with an argument list and no shell, including paths containing spaces. Compiler errors are surfaced with diagnostics. Missing effective `rootDir` or `outDir` produces an explicit assertion instead of a KeyError or silently skipping a candidate.

This retains the existing requirement for identifiable source and output directories; inferred TypeScript defaults are not newly modeled. The scope is inherited declared options. Leaving the raw reader would continue rejecting a valid extends-only configuration and skipping independently packaged browser entries with inherited options. The selected fix adds one compiler subprocess per examined configuration and relies on the existing `npm ci` precondition.

The existing file was rewritten using `newline=''` for both reading and writing. The commit contains only the exact authorized path.

## Experiments

Focused command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` — exit 0, 1 test PASS.

Each mutation/control ran in a fresh `support.TreeCopy`, initialized with its own Git repository for real `git check-attr` execution. The test received the copy's ROOT and its listed files. Copies were removed in finally blocks; the product tree was not mutated by experiments.

| Scenario | Build | Package invariant |
|---|---|---|
| Both original configurations moved byte-for-byte to sibling `.base.json` files; leaves contain only `extends` | `npm run build`: exit 0 | PASS |
| Both bases in `configuration bases/`; relative options/include explicitly rebased to preserve original locations | `npm run build`: exit 0 | PASS |
| Real package under `packages/other browser`, browser entry and copied application source; leaf extends `config/base.json`, directories relative to that nested base | Independent TypeScript compile: exit 0 | Expected assertion: `packages/other browser/package.json defines a separate application package` |
| Package manifest directly under server source root | Not needed for structural violation | Expected assertion: server source belongs to a separate application package |
| Same independent package layout and inherited compiler options, but unrelated exported tooling code | Independent TypeScript compile: exit 0 | PASS |
| Effective root browser config lacks outDir | Not run | Expected explicit assertion: `outDir absent from effective TypeScript config` |

The author's deliberate breaks are development evidence; the independent reviewer must still supply WAY-69 acceptance evidence.

`git diff --check`: exit 0. Git printed the repository's ordinary LF-to-CRLF working-copy normalization warning; no whitespace error or whole-file rewrite occurred.

## Full gate

`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/task-cycles/first-foundation/package-inheritance-invariants.jsonl` ? exit 0, 34 tests PASS in 85.005 seconds. Run completed and released its server processes.

Foundation guards and ordinary npm suite were not rerun by this correction author; no pass claimed for them. Independent re-review remains required.
