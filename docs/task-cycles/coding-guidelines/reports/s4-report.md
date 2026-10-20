# S4 author report

Status: DONE_WITH_CONCERNS. S4 is implemented and explicitly committed; return to root for independent review. No next-stage work, push, merge, external writes, subagents or frozen-check changes.

Range: `fc7445a540c0beb524ea821cd30d9c25a3ce0e92..e127aa4db9104b596cafd078caed40e0d4c46203`.
Commit: `e127aa4 style: format simulation modules and remove redundant assertions`.

## Authority and selection

Read [author contract](author-contract.md), [S4 handoff](s4-handoff.md), whole [task](../task.md) and [npm amendment](../amendment-npm12.md), the authoritative [S4 plan and execution constraints](../plan.md), and the extracted `.superpowers/sdd/plan/task-4-brief.md`. Read product AGENTS.md/CLAUDE.md and Superpowers 6.4.1 implementer-prompt.md. No behavior change: the contract's formatting/type-erasure preservation route applies, so no new behavior tests or TDD red/green are claimed.

Pinned `.the-way` HEAD and gitlink both verified as `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Foundation inputs are the current files at start HEAD fc7445a. Read the complete part map, guideline reading procedure and common foundation selection procedure; checked the full decision Scope list and invariant Part/method list. Current simulation Scope matches read: D-04/3, D-06/3, D-18/1, D-20/1 through D-32/1, D-34/1 and D-35/1. Read relevant invariant sentences/methods and linked ESLint facts, product glossary and pinned process glossary. Search across foundation files for simulation/assertions/Prettier confirmed these existing rules; no foundation meaning changes are needed.

All seven changed paths are assigned only to `simulation`. Actual source modules match that responsibility, with no UI files, dependencies, configuration, trust boundary or irreversible effect changed. The map records no simulation failure modes or critical flows; its operational low/high scale concerns starts/deployment, so no new criticality value is invented for this mechanical change. Risk is accidental game behavior drift, bounded below by preservation and behavioral checks.

Guidelines selection remains absent: no `guidelines/` files exist yet. This is the task creating general and four kind files in S11; D-28 records deferred test/build exemplars. The relevant kind is `simulation-module`, exemplar game.ts (D-35); no general/kind file can yet be read. No expansion/discrepancy from root's selection. No styleguide or UI screenshot is applicable to these source-only simulation changes; no visual validation is claimed.

Whole-read implementation sources: all seven changed modules and tests/sim/hex.test.mjs, layout.test.mjs, program.test.mjs and time.test.mjs. Read the standing formatter configuration and package manifest. Checked existing simulation invariant source/harness material before selecting its modules.

## Implementation and costs

Removed exactly twelve non-null assertions in hex.ts and one each in layout.ts, program.ts and run.ts (15 total). Retained both required run.ts assertions: `walkTarget(run, action.resource)!` and `tileAt(run.tiles, next)!`. The final six other modules contain no non-null assertions. Applied local adopted Prettier to exactly the seven assigned modules; all have LF. Identifiers, comments, literal values, operations, control flow and public types are preserved apart from the accepted erased assertions and formatting.

Mechanical choice: use TypeScript AST locations to remove the accepted postfix tokens, rather than a general exclamation-mark replacement or broad autofix. This avoids touching logical negation and the two required assertions, at the cost of an ignored proof helper. Baseline input is read directly with `git show` from fc7445a; no additional source copies are stored in reports.

Weakest requirement: preserving behavior while making a large layout diff. [Preservation helper](s4-preservation.mjs) constructs the exact baseline with only accepted postfix deletions and asserts that formatting that text with installed Prettier equals each actual file. It separately compares TypeScript AST structure/literal values (normalizing redundant ParenthesizedExpression wrappers), verifies exact counts and retained assertion expressions, compares emitted JS ASTs using installed TS API 6.0.2, rejects parse diagnostics and checks LF. [Final proof](s4-preservation-final.txt) passes all seven files. The compiler remains TS7 and both actual TS7 project checks/builds pass; the AST proof's transpiler itself uses API6, not a claimed TS7 emit-byte comparison. Structural comparison excludes trivia; exact pinned-formatter equality supplies the stronger text constraint. Runtime suites are finite examples rather than proof for every possible input.

Alternatives/costs: leaving code unchanged retains 15 blocking lint findings and all seven formatting violations; arbitrary autofix broadens the change beyond accepted removals. Adopted formatting creates +316/-132 lines for review but removes future per-file exceptions. Existing behavioral tests plus exact preservation avoid low-value new tests that only mirror formatting. No product design choice was introduced.

## Results and limits

- Local Prettier write/check: pass for precisely seven targets.
- `npm.cmd run typecheck` and `npm.cmd run build`: pass, actual compiler 7.0.2.
- `node --test "tests/sim/*.test.mjs"`: 103 passed, zero failed/skipped.
- [Existing simulation invariant launcher](s4-invariants.py): 17 simulation-owned modules, 51 tests passed, zero skipped/failures, including input immutability, isolation, time, randomness/repeatability, retained layout, pathfinding and closed program lists. This invokes existing checks unchanged via unittest; it is not a claim that the full the-way gate or every `every`-Part invariant ran.
- ESLint before: exit 1, 16 accepted findings (15 simulation + one view). Final ESLint: exit 1, exactly the unchanged terrain-picture.ts finding; zero simulation findings. Global lint is deliberately still a non-pass pending S7.
- `git diff --check`: pass. Complete changed files were reread for self-review; proof and count reconcile with task. No additional issue found.
- First scratch proof attempt failed because SourceFile.text included whole source trivia; second failed because Prettier removed a redundant expression parenthesis in run.ts. Both are oracle implementation defects, not product failures. Corrected proof excludes SourceFile.text, normalizes parentheses, and adds exact formatter equality; original failed outputs remain listed below.
- Execution deviation: initial final-code ESLint ran while the existing invariant process was finishing. Both were read-only against completed source; the plan calls for sequential checks, so ESLint was rerun after invariant completion as `s4-eslint-final`, retaining exit 1 and the single expected view finding. No product edits/builds overlapped the invariant run.
- Full product gate, global formatter pass, full dependency audit, screenshot work and independent review are unrun here; they belong to later slices/root. No tool unavailability was encountered.
- Existing unrelated untracked `tests/invariants/__pycache__/` and `tests/quality/__pycache__/` are preserved; final tracked tree is clean. No cleanup attempt.

Actual versions: Node v24.17.0, Prettier 3.9.10, ESLint 10.12.0, TypeScript API 6.0.2, compiler 7.0.2, local npm 12.2.1; Python 3.14.3. [Installed-version output](s4-versions.txt). No dependency/network installation was performed by S4.

## Changed files

| Path | Added | Removed |
|---|---:|---:|
| src/browser/sim/game.ts | 142 | 49 |
| src/browser/sim/hex.ts | 24 | 13 |
| src/browser/sim/layout.ts | 15 | 8 |
| src/browser/sim/program.ts | 49 | 18 |
| src/browser/sim/random.ts | 1 | 1 |
| src/browser/sim/run.ts | 76 | 33 |
| src/browser/sim/types.ts | 9 | 10 |
| Total: 7 files | 316 | 132 |

Only these explicit seven paths entered the commit. Ignored evidence/helper/report artifacts are outside the commit. Private-repo commit author email checked against the prescribed identity.

## Exact command evidence

Every captured command below ran from `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; stdout and stderr are combined in the linked complete output, with adjacent `.txt.json` metadata preserving command, actual exit and duration. Capture wrapper: `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <output> <command...>`.

| Exact child command | Actual exit | Complete stdout/stderr |
|---|---:|---|
| `node .runs/task-cycles/coding-guidelines/reports/s4-preservation.mjs apply` | 0 | [s4-apply.txt](s4-apply.txt) |
| `npm.cmd run build` | 0 | [s4-build.txt](s4-build.txt) |
| `git commit -m "style: format simulation modules and remove redundant assertions"` | 0 | [s4-commit.txt](s4-commit.txt) |
| `git diff --check` | 0 | [s4-diff-check.txt](s4-diff-check.txt) |
| `python -B scripts/check_eslint.py --record .runs/task-cycles/coding-guidelines/reports/s4-eslint-after.jsonl` | 1 | [s4-eslint-after.txt](s4-eslint-after.txt) |
| `python -B scripts/check_eslint.py --record .runs/task-cycles/coding-guidelines/reports/s4-eslint-before.jsonl` | 1 | [s4-eslint-before.txt](s4-eslint-before.txt) |
| `python -B scripts/check_eslint.py --record .runs/task-cycles/coding-guidelines/reports/s4-eslint-final.jsonl` | 1 | [s4-eslint-final.txt](s4-eslint-final.txt) |
| `python -B .runs/task-cycles/coding-guidelines/reports/s4-invariants.py` | 0 | [s4-invariants.txt](s4-invariants.txt) |
| `node .runs/task-cycles/coding-guidelines/reports/s4-preservation.mjs` | 1 | [s4-preservation-corrected.txt](s4-preservation-corrected.txt) |
| `node .runs/task-cycles/coding-guidelines/reports/s4-preservation.mjs` | 0 | [s4-preservation-final.txt](s4-preservation-final.txt) |
| `node .runs/task-cycles/coding-guidelines/reports/s4-preservation.mjs` | 1 | [s4-preservation.txt](s4-preservation.txt) |
| `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim/game.ts src/browser/sim/hex.ts src/browser/sim/layout.ts src/browser/sim/program.ts src/browser/sim/random.ts src/browser/sim/run.ts src/browser/sim/types.ts` | 0 | [s4-prettier-check.txt](s4-prettier-check.txt) |
| `node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/game.ts src/browser/sim/hex.ts src/browser/sim/layout.ts src/browser/sim/program.ts src/browser/sim/random.ts src/browser/sim/run.ts src/browser/sim/types.ts` | 0 | [s4-prettier-write.txt](s4-prettier-write.txt) |
| `node --test tests/sim/*.test.mjs` | 0 | [s4-sim-tests.txt](s4-sim-tests.txt) |
| `npm.cmd run typecheck` | 0 | [s4-typecheck.txt](s4-typecheck.txt) |
| `node -p JSON.stringify({node:process.version,prettier:require('./node_modules/prettier/package.json').version,typescriptApi:require('./node_modules/typescript/package.json').version,compiler:require('./node_modules/typescript-compiler/package.json').version,eslint:require('./node_modules/eslint/package.json').version,npm:require('./node_modules/npm/package.json').version})` | 0 | [s4-versions.txt](s4-versions.txt) |

## Return boundary

Root can dispatch independent S4 review against the range above. Only remaining code-quality issue relevant to the next dispatch is the accepted S7 terrain-picture.ts finding. Missing guidelines and final whole-product checks remain explicit later task work; S4 has not weakened any standing check.
