# S5 independent scoped review

## Spec compliance

**Verdict: Spec compliant.** Reviewed range `e127aa4db9104b596cafd078caed40e0d4c46203..2f33b5deb858104729ce8871f653c051740c6c49` using the complete supplied `s5-review-package.txt`, once. Five changed files, +23/-16; six authorized paths processed. No missing, extra or misunderstood S5 implementation requirement found.

Authority read: the complete task-5 brief, frozen task with accepted npm amendment, S5 handoff and author contract, S5 report, applicable original-plan constraints and S5 section, product AGENTS.md/CLAUDE.md, code-review playbook and the complete task-reviewer prompt. The unchanged frozen task's npm 11.13.0 wording is superseded by the accepted 12.2.1 amendment, as the handoff expressly states.

| Authorized path | Reviewed result |
|---|---|
| `src/browser/sim/data/actions.ts:9` | Three records retain keys, strings, durations and nulls; only quote style changes. |
| `src/browser/sim/data/archetypes.ts:5` | Same archetype key and name, double quotes. |
| `src/browser/sim/data/balance.ts:1` | No tracked hunk; included in both six-path formatter invocations and all six-file preservation checks. Already formatter-equivalent is a legitimate no-op for a format-only requirement. |
| `src/browser/sim/data/conditions.ts:11` | Same two keys, same label/unit/default/min/max/step; one record wraps with a trailing comma. |
| `src/browser/sim/data/maps.ts:1` | Same type-only import target. `:23` retains map numbers, entrance, resource records and their exact sequence; only quotes change. |
| `src/browser/sim/data/resources.ts:15` | Same resource keys, names, icon identifiers and credited icon titles. Types and rationale comments are unchanged. |

## Strengths

- The map-layout contract is preserved where it matters: `src/browser/sim/data/maps.ts:30` retains stick, berry, moss, fiber in that order and every density/stock/renewal value. This avoids changing a seed's generated terrain while applying the adopted formatter.
- `src/browser/sim/data/resources.ts:15` retains the designated exemplar and its complete catalogue; no new universal catalogue requirement is introduced. Existing types, exported identifiers and the icon-title explanation remain intact.
- Preservation evidence goes beyond the existing sampled data assertions: `s5-preservation.mjs:10` compares ordered parsed syntax trees, `:18` scans comments, `:41` compares complete runtime exports, and `:43` checks LF for all six files. Width-change and resource-order controls at `:48` onward demonstrate sensitivity to meaningful content changes.
- No checker, configuration, dependency, test assertion or product behavior is changed by this range. The change does not hide a failure by weakening an adopted rule.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

## Selection verified against current scope

Touched part: **simulation**, established by the complete part map, `foundations/part_map.md:20`, assigning `src/browser/sim/**`. No changed UI, integration, irreversible effect or trust boundary. The map declares no simulation failure mode. The actual risk is an accidental content or order change affecting game balance or seeded layouts.

Foundation revision used by the S5 handoff/report is e127aa4; the supplied pinned the-way identity is d829e3aa6242a9b8901274531dd82fd5c7d87628. The complete current Scope inspection identifies D-04/3, D-06/3, D-18/1, D-20/1 through D-32/1, D-34/1 and D-35/1 for simulation. Each selected entry was read whole with rationale and rejected choices. D-19 is browser-view only and D-33 build-tools only; D-33 was nevertheless read as an explicitly supplied task constraint. Current invariants were read whole, including their Part fields, every-part entries and methods. Product and pinned the-way glossaries were read; applicable linked facts read include icon provenance/licensing/titles and the complete adopted ESLint, typescript-eslint, Ruff and ShellCheck fact entries.

The common foundation selection procedure and `.the-way/product-guidelines/reading.md` were read. A current `Test-Path guidelines` returned False. The task itself creates general and kind guidelines later, so the missing files do not block this slice; task To do 1-2 and plan S11 retain that work. D-28's adopted deferrals and D-34's example-only catalogue shape remain respected. No selected guideline file exists to read, and there is no selection expansion or discrepancy.

Whole-foundation search over all five files used the alternatives format/content/identifier/resource/catalogue/simulation. The long-line/truncated display was followed by an unrestricted `rg -n -o` projection of matches. No newly relevant unsettled foundation meaning or unclaimed path was found. This is scoped selection evidence, not acceptance of the complete foundation or its TODO methods.

## Concrete risks checked and evidence

1. **Silent data, export or resource-order changes.** Inspected the complete supplied diff and the complete ignored preservation script plus successful output. Parsed-node kinds, identifier/literal text and ordered children are compared with the immutable baseline; comments are independently compared; runtime JSON preserves arrays and property order. The five changed hunks contain only quote/layout changes. `tests/sim/data.test.mjs:10` onward separately checks map settings, catalogue values, icon titles, actions, conditions and pace; later cases check accepted/rejected programs and durations.
2. **An omitted sixth target.** Read formatter write/check exact argv records and output: balance.ts is included in both, with exit 0, and has its own preservation PASS. A manufactured hunk in an already compliant file would add no required behavior.
3. **A green typecheck that checks nothing or a wrong compiler.** One focused unchanged-code inspection, `scripts/build.mjs:6-23`, shows the explicit typescript-compiler path, both browser and server configurations, inherited compiler output and nonzero/error propagation. This supports the recorded successful typecheck/build rather than assuming exit 0 proves useful work. Installed-version output identifies compiler7.0.2 and API6.0.2 separately.
4. **Suppressed or incomplete checks.** Read the complete S5 formatter/typecheck/build/data/content-identifiers/simulation-isolation outputs and corresponding exact-command/exit JSON records. Data tests report 14 passed, zero failures/skips; content-identifiers reports 4 passed; simulation-isolation 5 passed. Local pinned Prettier write and check include all six targets and exit 0. Typecheck/build exit 0. Runtime/npm/formatter/compiler version output matches Node24, npm12.2.1, Prettier3.9.10, API6.0.2 and compiler7.0.2. npm's ordinary run notices are invocation banners, not tool warnings or validation failures.
5. **A repaired evidence script hiding a product defect.** Read the retained failed preservation output: the mismatch is SourceFile raw source text reflecting different quotes. The corrected script excludes only that raw SourceFile.text value while retaining traversal of every child; all later assertions and the successful six-file output remain present. The failed run is disclosed, not presented as behavior TDD or a pass.

All existing evidence is under `.runs/task-cycles/coding-guidelines/reports/`: `s5-prettier-write.log[.json]`, `s5-typecheck.log[.json]`, `s5-build.log[.json]`, `s5-data-test.log[.json]`, `s5-content-identifiers.log[.json]`, `s5-simulation-isolation.log[.json]`, `s5-prettier-check.log[.json]`, `s5-preservation.log`, `s5-preservation-green.log[.json]`, `s5-versions.log`, `s5-diff-check.log`. Exact original commands and observed exit codes reside in the adjacent JSON files; they were inspected rather than regenerated. No tests were run by this reviewer, because no specific doubt remained unanswered by existing evidence. No Git commands were rerun, no changed product file was separately reread beyond the supplied diff, and no product file was mutated.

## Declined and out-of-scope items

- Declined treating balance.ts's lack of a tracked hunk as a missed requirement: this task requires formatting six files, and its captured formatter/preservation evidence includes six; no semantic change was requested for that file.
- Declined adding new behavior tests or changing catalogue structure for a reversible formatting-only diff. The existing behavior assertions and full-data preservation evidence answer the actual risk without inventing new obligations.
- Whole-scope formatter/linter compliance, final product gate, guideline cases and invariant deliberate-break acceptance remain later stages on complete product code. This range changes no invariant and does not claim those stages passed.
- No screenshot/browser validation claimed: no UI code or intended visible behavior is changed. No deployment, external source verification or broad regression run was necessary for S5.

## Assessment

**Task quality: Approved.** The bounded change implements the six-target formatting goal while preserving data and interfaces; captured checks and inspected preservation mechanics address the concrete regression risks. No unresolved S5 concern affects the next dispatch.

**Evidence limits:** Review accepts captured runs for this author boundary and independently inspects their meaning; it is not a fresh execution on a future combined head. The preservation AST uses TypeScript API6, while the actual application compiler checks use TS7. Runtime JSON equality alone would omit erased types, but the accompanying ordered AST comparison and complete diff cover this change. Baseline-wide checker correctness and later whole-product acceptance are outside this verdict.
