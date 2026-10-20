# Spec compliance

**Verdict: Spec compliant for the assigned alias/runtime correction.**

**Task quality: Approved at this check-author boundary.** No Critical, Important or Minor defect requiring correction was found in the supplied range. This is not approval of the unfinished product installation or of either live ESLint invariant.

## Range and review boundary

- Base: `95667855d9e8be3616b1dbb545c8bcdc35de4d09`.
- Head: `c47a40850baac91518568d996fc27f11ad2639be`.
- Commit: `c47a408 fix: verify aliased TypeScript tool runtimes`.
- Read the complete supplied `.superpowers/sdd/plan/f2-alias-review-package.txt` once. It contains two changed files, 272 additions and 51 removals. No changed file was reread separately; targeted searches supplied current line anchors.
- Compared the requirements in `f2-alias-handoff.md`, its referenced `f2-handoff.md` and `author-contract.md`, the complete author report, and the supplied diff. `scripts/check_eslint.py` is an allowed path rather than a mandated edit; leaving it unchanged is appropriate because the correction is in the Node loader.
- Product files remained read-only. No subagent, configuration/source fix, next-stage work, installation, commit, push or merge was performed. Only this assigned ignored report was written.

## Foundation and guideline selection

The pinned `.the-way` checkout and gitlink both identify `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Read product AGENTS.md/CLAUDE.md, the pinned guideline-reading procedure and common foundation-reading procedure, the complete product part map, complete invariants file, product glossary and pinned the-way glossary.

Both changed files belong to build-tools under `foundations/part_map.md:65`. The loader verifies tools used across browser-view, simulation, account-server and build-tools, but this change does not change those parts' application responsibilities or files. Inspecting all current Scope fields, with the versions in the complete log accounted for, selects D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1 and D-28/1 through D-33/1 for build-tools. These entries were read whole, including rationale and rejected alternatives. Source locations are decisions.md:3, :20, :509, :467, :240, :767, :787, :823, :841, :857, :873, :889 and :905. D-07/1 and D-08/1 were also read through governing relations. No missing current Scope match was found.

The directly applicable authority is D-29/1 at `foundations/decisions.md:841`, linked D-06/3 at :767, both complete ESLint facts at `foundations/environment_facts.md:138` and :146, and the ESLint invariants at `foundations/invariants.md:390` and :420. The whole invariants file also establishes the related build and formatting obligations; D-32/1 requires formatting the changed bridge. Read node-24-support-schedule/1 through D-01. Searched all five foundation elements for TypeScript, ESLint, parser, compiler, aliases and lockfile behavior; the relevant search results add no contrary alias-spelling requirement or changed foundation meaning.

`guidelines/` is absent at this review. Therefore the selection remains empty under the announced creation-task exception, rather than by an inferred exemption. D-28 defers a separate build/test exemplar. No screen changes, styleguide selection or screenshot obligation arise from this correction.

## Strengths

- `scripts/inspect_eslint.mjs:244` resolves the API from the parser/estree dependency chain; :251 checks the exported runtime version as well as metadata. A 6.0.2 wrapper exporting API 6.0.3 is rejected rather than silently certified.
- `scripts/inspect_eslint.mjs:177` and :205 preserve package identity, local real-path placement, installed version and lock agreement while allowing the explicitly encountered compatibility-package identity. The nearest package metadata is checked rather than skipped when its name is unexpected.
- `scripts/inspect_eslint.mjs:255` identifies the separate compiler by its exact ordinary or npm-alias declaration rather than hard-coding the alias key. :266 refuses absent or ambiguous candidates; the subsequent lock and runtime checks retain exactness.
- `tests/quality/test_eslint_checks.py:331`, :338, :344 and :361 exercise Node resolution against disposable package trees, two compiler alias spellings, ordinary and compatibility API packages, incorrect runtime exports despite correct metadata, and missing/wrong/unpinned identities and declarations. The captured RED failures demonstrate the old loader's false acceptance of mismatched ordinary runtime exports, not just a test written after the correction.
- The diff leaves the independent rule lists and Python source/configuration verdict logic unchanged. The non-loader bridge hunks are formatting; captured normalized AST equality and the formatter check support their lack of behavior change.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

## Concrete risks checked

1. **Wrapper metadata could conceal an unsupported actual API.** Compared the loader's exported-version checks with the runtime-mismatch fixture cases and complete captured actual-method results. As a focused outside-diff read, inspected `node_modules/typescript/lib/typescript.js:1`, which reexports `@typescript/old`, the wrapper's metadata/dependency, and the existing `f2-alias-runtime-check.mjs` evidence helper. The evidence reports wrapper 6.0.2, actual API 6.0.3 and compiler 7.0.2. Both method records are failures with `invariant: null`; no named invariant verdict was manufactured.
2. **The application compiler could be confused with the parser API or inferred to be used by the build.** Compared exact declaration discovery and lock/runtime checks with `package.json` and `scripts/build.mjs:6`. The package declares a separate TypeScript 7.0.2 compiler alias, while the build still points at the API alias's missing `bin/tsc`. The captured npm test failure confirms that integration remains incomplete; the correction does not claim otherwise.
3. **A fixture success could be mistaken for a viable real TypeScript installation.** Inspected the actual dependency import sites in `node_modules/typescript-eslint/dist/index.js:41`, :48, :52 and :60, `node_modules/@typescript-eslint/parser/dist/parser.js:9` and :12, and `node_modules/@typescript-eslint/typescript-estree/dist/create-program/getWatchProgramsForProjects.js:43`. These packages also resolve TypeScript for themselves. The new fixture with TS6 only nested under estree and ordinary TS7 at the root establishes the loader's isolated lookup behavior; it does not establish a working layout for the real umbrella/parser packages. Real umbrella TS7 rejection remains in place. The author explicitly bounds fixture evidence to loader behavior, so this is an integration limit for S1 rather than a newly proven false successful live invariant result.
4. **Formatting could hide behavior changes outside the loader.** Compared each supplied hunk and inspected the AST normalization helper plus its captured after-result. Its normalization removes location/raw-token fields and compares the parsed structure. The captured formatter check passes. No new test or suite rerun was needed.
5. **Unavailable tools/configuration could become passes.** Read complete captured source/configuration outputs and their adjacent command/exit metadata. Both stop at the actual API mismatch with exit 2 and null invariant. `eslint.config.mjs` is absent; neither output is treated as configuration validation.

## Evidence inspected and limits

All evidence names below are under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Read the existing full outputs; no reported test was rerun merely to confirm it.

| Command from captured evidence | Exit | Evidence and observed result |
|---|---:|---|
| `python -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | `f2-alias-red.txt`: 20 tests, seven failing subtests, including two incorrect runtime acceptances by the old implementation. |
| `python -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | `f2-alias-green.txt` and JSON: 20 tests, OK, no warning noise. |
| `python -m unittest discover -s tests/quality` | 0 | `f2-alias-quality.txt` and JSON: 116 tests, OK, no warning noise. |
| `node .runs/task-cycles/coding-guidelines/reports/f2-alias-format-ast.mjs after` | 0 | `f2-alias-format-after.txt` and JSON: AST unchanged. |
| `node node_modules/prettier/bin/prettier.cjs scripts/inspect_eslint.mjs --check --no-config --no-editorconfig --end-of-line lf` | 0 | `f2-alias-format-check.txt` and JSON: all matched files use Prettier style. |
| `python -B scripts/check_eslint.py --record .runs/task-cycles/coding-guidelines/reports/f2-alias-source.jsonl` | 2 | `f2-alias-source.txt` and JSON: API runtime must be 6.0.2; null invariant. |
| `python -B scripts/check_eslint.py --configuration --record .runs/task-cycles/coding-guidelines/reports/f2-alias-configuration.jsonl` | 2 | `f2-alias-configuration.txt` and JSON: same unavailable API result. |
| `node .runs/task-cycles/coding-guidelines/reports/f2-alias-runtime-check.mjs` | 0 | `f2-alias-weakest.txt` and JSON: actual wrapper/API/compiler versions and no named source/configuration verdict. |
| `npm.cmd test` | 1 | `f2-alias-npm-test.txt` and JSON: build cannot find API alias's `bin/tsc`; application tests do not execute. |

No additional tests were executed in this review. Review commands were reads, source searches and the pin comparison. They do not substitute for executing either invariant. An initial read used the nonexistent `.the-way/foundations/reading.md`; the actual contract-named `.the-way/elements/common/way_of_working.md` was then read. A Windows literal-glob search failed and was replaced by `rg ... foundations -g '*.md'`. Neither failed lookup was interpreted as an absent source or a successful check. Long combined read output was revisited in focused reads where it contained authoritative ESLint facts or evidence.

## Declined and out-of-scope items

- No change to D-29, rule membership, severity, source scope or silent-failure behavior is justified by the unavailable installation.
- No defect is assigned merely for deferring product configuration/build repairs from this independent method-author stage. Those files are outside this stage's write set.
- No additional guideline example or test-kind exemplar is required contrary to D-28.
- No appearance finding is raised for formatter layout. There is no changed user interface.
- Full branch review, final part tests, foundation/guideline form checks, final deliberate-break work and guideline-case acceptance remain with later complete-product stages. The current review does not certify them.

## Unresolved concerns for the controller

1. S1 must install an actually parser-resolved TypeScript API 6.0.2 and establish a coherent real dependency layout; the current compatibility wrapper exports 6.0.3. Both live ESLint invariants remain unavailable.
2. S1 must route both application compilations through the separate actual TypeScript 7 compiler. Current `npm test` fails before the application tests because the build uses the missing API-alias compiler path.
3. Product `eslint.config.mjs` is still absent. Effective configuration, complete real source linting and configured scope remain unchecked until it is supplied and the API mismatch is resolved.
4. Complete-product acceptance, including final deliberate breaks and guideline cases, remains later work. Fixture/AST evidence is not that acceptance.

**Assessment:** The alias correction is narrow, maintains strict failure behavior, and has useful red/green runtime evidence. The outstanding failures are clearly retained as actual non-passes and belong to the next product-configuration stage; they do not require weakening or revising this scoped correction.
