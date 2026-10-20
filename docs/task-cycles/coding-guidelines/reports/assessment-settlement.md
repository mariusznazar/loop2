# Settlement of the single independent foundation assessment

Status: DONE_WITH_CONCERNS — both observations settled in commit `712117b84b20dca607c160964c7b85440759f74b`; return boundary is fresh scoped review, not another foundation assessment or final integration acceptance. Existing map warnings/unchecked graph and fact TODO methods remain. Root owns final gate currency.

## Inputs, scope and method

Start: `52bd7f7f1608774113cdc3039a9e49b51e87bc97`. Original base and inspected merge target: `c379207bfd8bd148d3589ea75604ba5165915d01`. Pinned checkout/gitlink: `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`.

Read the complete `reports/assessment-settlement-handoff.md`, author contract and `reports/foundation-assessment.md`; root's C35/C36 settlements are the assigned authority. The frozen task plus npm12 amendment and all22 approved rows remain binding. This is settlement within the single completed assessment, not a new assessment dispatch. No subagent, other reviewer or helper agent was started.

Used pinned `record-decision` and `update-part-map` skills, their whole templates/examples and common rules; read WAY-03/1 and the five named pinned map examples. The coding skill and both guideline templates govern the dependent guideline edit; the shared reading procedure was refreshed. Full current product map and general coding guideline were read. All five guideline headers/conditions and the general kind index were inspected. For this documentation-only settlement, selected `guidelines/coding.md`; no indexed code-kind reading condition matches a change of foundation/guideline prose. Compared with the broad return inspection, the four kind files leave this stage's selected set because no application-kind file changes, not because their rules are waived. D-28 retains their approved exemplars/deferrals. No new guideline, missing metadata, styleguide or code-kind issue was found.

The actual changed entries reach build-tools/product-foundation and the six code parts named by D-28; guideline prose belongs to agent-workflow. Current relevant decisions/invariants/facts and incoming references were retained from the complete return selection, refreshed against the actual three-file change and whole-foundation search. No source scope or invariant meaning changed.

## FA-1 — APPLY, C35

Assessor observation: build-tools reads the ownership map but its declared allowed dependencies omit product-foundation. Verified the actual code: `scripts/quality_support.py` `_part_patterns` reads `foundations/part_map.md` and `discover_files` calls it; `scripts/check_dependencies.py` `_snapshot` reads the same path at the original fork and uses its ownership for historical manifests. The handoff's name `_base_files` was a naming mismatch only: the actual function is `_snapshot`, and the demonstrated dependency is the same. The map assigns scripts/** to build-tools and foundations/** to product-foundation.

Applied the allowed relationship build-tools → product-foundation. This is a part field, not a new part, new surface or dependency graph implementation. No responsibility, file assignment, trust boundary, failure mode or separation changed. Leaving the map untouched would keep this permitted implementation absent from its declared relationships; replacing map-based discovery would duplicate scope policy. Recording the one relationship adds no runtime code and preserves the existing source of ownership.

Full final build-tools entry, `foundations/part_map.md:64`:

```markdown
## build-tools

The part installs dependencies, checks code quality and types, audits introduced dependency versions and builds and launches the application.

- **Files:** /package.json
  /package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  scripts/**
  tests/quality/**
  eslint.config.mjs
  prettier.config.mjs
  requirements-quality.in
  requirements-quality.txt
  .gitignore
  README.md
  tests/invariants/loop2_invariant_support.py
  tests/invariants/test_account_server_runtime.py
  tests/invariants/test_account_server_typecheck.py
  tests/invariants/test_application_build_output.py
  tests/invariants/test_application_package_layout.py
- **Depends on:** browser-view · simulation · account-server · product-foundation
- **Failure modes:** none
- **Trust boundary:** package-lock.json
  scripts/check_dependencies.py
```

Pinned `format_guard.criticality` computes every current part as high at all three revisions: original base, assessed start and settled map. Browser-view, simulation, account-server, build-tools, deployment, agent-workflow and product-foundation each remain high. Delta is empty; there is no hidden lowering or added separation. The pinned Git matcher produces identical ownership lists for all178 tracked paths before/after. The new relationship does not turn the existing unchecked actual dependency-graph comparison into agreement.

## FA-2 — REWRITE, C36

Assessor observation: D-28's second binding sentence mixes the lasting selected lint discipline with introduction-before-merge and accepted-repair-scope conditions that end with this task. Verified the pinned decision template's Plan test/WAY-36 and the frozen Q8/Q9, settlement1 and current plan. The human accepted both the no-transitional-debt choice and the two conditions on this execution; dropping all of the sentence would omit accepted meaning. Making it a permanent rule for every future linter introduction would invent a new meaning.

Replaced only the second binding sentence with root's lasting-state text. First and last binding sentences remain exactly the same. The complying example now checks the lasting state; the violating example still rejects introducing transition debt without a new decision. Rationale/Rejected retain the durable maintenance tradeoff and remove references to this introduction's timing. The entry stays D-28/1, Change new decision: it is absent at the original base, has never reached main and is edited in place under the pinned version rules. This is not a new human meaning change or invariant correction.

Full final D-28 entry, `foundations/decisions.md:823`:

```markdown
### D-28/1 — Which coding-guideline discipline does loop2 adopt?

Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for tests, building, deployment, entry points and HTML; session, saved-game and mail exemplars are selected with their first implementations, and any deferred existing kind is compared before its exemplar is selected. For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant. The general coding guidelines cover all code and give `tests/sim/time.test.mjs` as a test example without creating a formal test kind.

- **Change:** new decision
- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and test example, and use full-compliance source invariants without a transitional per-file no-regression invariant
  - violates: an additional mandatory test exemplar, automatic Python formatting or a transition-debt check introduced without a new decision
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/16

*Rationale:* The selected discipline gives code common checks and a small set of useful exemplars; broader exemplar maintenance and additional formatters add work without an established benefit.
*Rejected:* A complete exemplar audit and automatic formatting for every language — more maintenance and unmeasured reformatting work; transitional lint debt — an extra mechanism where full-compliance source invariants already apply.
```

Pinned fingerprint computation changes `719c9a67` to `550e88d6`. Whole foundation/guideline incoming-reference inspection finds exactly one actual dependent: `guidelines/coding.md:10`. Its text was read and aligned before updating the fingerprint; no invariant derives from D-28 and no other product foundation/guideline file needs a reference update. The unchanged D-29–D-33 and six source/configuration/audit invariant sentences continue to carry full-source obligations.

Final dependent introduction line:

> Wytyczne przyjmują szablony przypiętego the-way zgodnie z D-28@550e88d6.

Full final affected Examples subsection, `guidelines/coding.md:311`:

```markdown
### Odłożone rodzaje i formatowanie

Automatyczne formatowanie Python i Bash pozostaje odłożone. Osobne wzorce testów
Node/Python, budowania, wdrożenia, punktów uruchomienia i HTML również są odłożone.
Wzorce sesji, zapisu gry i poczty powstaną przy pierwszych implementacjach.
Przed wyborem wzorca odłożonego istniejącego rodzaju porównuje się jego pliki.
Ogólne kontrole nadal obejmują cały przyjęty zakres kodu. Dla przyjętych linterów
obowiązują niezmienniki pełnej zgodności kodu, bez przejściowej kontroli
„nie pogarszaj starego kodu”.
```

Full added operational section in ignored `.runs/task-cycles/coding-guidelines/plan.md:9`:

```markdown
## Accepted introduction requirements

For this task, original Q8 and settlement 1 remain binding: every adopted blocking violation is removed before PR16 merges. If a repair exceeds the accepted task scope, return to a decision rather than weakening the rule set or leaving a violation. Settlement 1 is split by destination: D-28 records the lasting selected discipline and full-compliance source invariants without a transitional per-file no-regression invariant; this plan records only the introduction and repair-scope conditions of this execution. No unit, dependency, invariant meaning or accepted settlement is removed or changed.
```

Leaving the former text would force future readers to recover a completed task's accepted scope. The rewrite costs one dependent fingerprint update and an operational paragraph, while preserving that scope condition exactly for this PR. Deleting the obligations would be cheaper in characters but would violate accepted settlement1; broadening them to future tool introductions would add unapproved policy. Neither alternative was taken.

## All22 approved settlement rows remain covered

| Row | Current destination | Effect of this settlement |
|---|---|---|
| 1 | D-28/1 and accepted introduction requirements in plan.md | Lasting discipline/deferrals/full-compliance without transitional debt in D-28; this PR's before-merge and repair-scope conditions in plan. Nothing waived. |
| 2 | D-29/1 | ESLint pins, actual API6/compiler7, exact sets/scope unchanged. |
| 3 | D-30/1 | Ruff393/14example split unchanged. |
| 4 | D-31/1 | ShellCheck default nonoptional Bash/all-severity policy unchanged. |
| 5 | D-32/1 | Prettier version/defaults/LF/scope unchanged. |
| 6 | D-33/1 | Accepted npm12.2.1 amendment, original-fork exact-pair low+ audit unchanged. |
| 7 | D-34/1 | content-data exemplar and example boundary unchanged. |
| 8 | D-35/1 | simulation-module exemplar and helper return freedom unchanged. |
| 9 | D-36/1 | browser-module exemplar and update/static boundary unchanged. |
| 10 | D-37/1 | HTTP exemplar/factory illustration unchanged. |
| 11 | eslint-recommended-rules/1 | Full release membership/source and TODO method unchanged. |
| 12 | typescript-eslint-typechecked-rules/1 | Full composition/overrides/source and TODO method unchanged. |
| 13 | ruff-default-rules/1 | Full407 set/source and TODO method unchanged. |
| 14 | shellcheck-default-bash-checks/1 | Compositional source/default set and TODO method unchanged. |
| 15 | eslint-source-rules/1 | Sentence, command and implementation unchanged. |
| 16 | ruff-source-rules/1 | Sentence, command and implementation unchanged. |
| 17 | shellcheck-source-rules/1 | Sentence, command and implementation unchanged. |
| 18 | eslint-configuration-rules/1 | Sentence, command and implementation unchanged. |
| 19 | prettier-source-format/1 | Sentence, command and implementation unchanged. |
| 20 | introduced-npm-vulnerabilities/1 | Sentence, command and implementation unchanged. |
| 21 | guidelines-form/1 | Exact copied sentence and pinned method unchanged. |
| 22 | guidelines-reference-current/1 | Exact copied sentence/method unchanged; new D-28 reference passes current/merged comparison. |

No source task/amendment edit, plan unit/dependency edit, new invariant or deferred foundation entry. No additional obligation was inferred from an exemplar or a process limitation.

## Source-fidelity, ownership and weakest-point checks

Meaning most likely to be missed: the one-time repair-scope condition could disappear while permanent D-28 is simplified. The read-only proof asserts both original execution conditions in the ignored plan, all22 settlement rows in order, exact replacement of only the second binding sentence and preservation of D-28's first/last binding sentences. It also verifies the current guideline no longer repeats task-only conditions. This checks the actual destinations and exact strings; it does not purport to replace independent judgment of meaning.

The same proof checks the allowed tracked changed-path set is exactly three docs. Thus every executable method, helper, invariant sentence, configuration, lock and test source is unchanged against the assessed start. It extracts and compares all26 good/bad case blocks across the five guideline files; all are identical. It uses the pinned map parser, criticality computation and actual Git pattern matcher to compare original base/start/current degrees and start/current ownership, and asserts every map binding/other field is unchanged. It uses the pinned fingerprint function for D-28 and inspects every foundation/guideline reference. These are preservation and metadata checks, not new runtime lint/advisory/HTTP/browser results.

Whole-foundation collision search was repeated across decisions, invariants, facts, glossary and map after the edits. Tools/suppression, packages/locks/compiler/advisory, examples/kinds/guidelines, process/log/cleanup and trust/registry/catalogue/focus/factory/time vocabulary groups found the same existing entries. Relevant whole entries were already read in the return step and the changed D-28/map were refreshed whole. No new semantic collision or promised future entry appeared. Full heading-only results are retained, not duplicate source/diff snapshots.

## Exact checks and outputs

All commands below ran from `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`. Log filenames resolve under absolute directory `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each listed command's exact child argv, actual exit and combined complete stdout/stderr are retained in its `.log.json` and `.log`; the capture wrapper is the existing `reports/capture.py`. `B` below is exactly `c379207bfd8bd148d3589ea75604ba5165915d01`, with no other alias.

| Child command | Exit / actual result | Complete output |
|---|---|---|
| `python -B .runs/task-cycles/coding-guidelines/reports/assessment-settlement-proof.py` | 0; exact3docs; first/last sentences; both fingerprints; sole dependent; all26blocks; all22rows; all7degrees unchanged; all178ownership claims unchanged. | assessment-settlement-proof.log |
| `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base B --merge-onto B` | 0; 0errors,0warnings,0unchecked. Product approver check limited as stated by guard. | assessment-settlement-decisions.log |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base B` | 0; 0errors,2warnings,1unchecked. No criticality lowering. | assessment-settlement-part-map.log |
| `python -B .the-way/product-guidelines/form_check.py` | 0; all form subreports pass; merge comparison explicitly not run in this command. | assessment-settlement-guidelines-form.log |
| `python -B .the-way/product-guidelines/form_check.py --merge-onto B` | 0; all current/merged reference/form subreports pass. | assessment-settlement-guidelines-reference.log |
| `git diff --check` | 0; no whitespace error; existing Git LF→CRLF working-copy notice for coding.md retained. | assessment-settlement-diff-check.log |
| `python -B .runs/task-cycles/coding-guidelines/reports/return-collision-search.py` | 0; all five files searched; current results inspected. | assessment-settlement-collision.log |
| `git commit -m "docs: settle foundation assessment observations"` | 0; explicit-path commit712117b,3files,+9/-10. | assessment-settlement-commit.log |

Every check was captured using the exact outer form `python -B .runs/task-cycles/coding-guidelines/reports/capture.py .runs/task-cycles/coding-guidelines/reports/<listed-log> <listed-child-argv>`. The ignored edit script ran once with `python -B .runs/task-cycles/coding-guidelines/reports/assessment-settlement-edit.py`, exit0, reporting D-28 fingerprint550e88d6. It read/wrote existing documents as bytes and preserved their existing line endings. Two initial guessed read paths (coding/skill/SKILL.md and common/guard_support.py) and one Windows literal wildcard search reported missing/invalid paths; actual paths were located/read with rg and their contents govern the result. They are failed navigation attempts, not claimed test passes.

No broad suite, application runtime method, dependency-network query, thirteen guideline runtime pairs or fifteen deliberate breaks was rerun. Their unchanged methods/cases/invariant sentences retain earlier acceptance; root still owns fresh final gate evidence after the doc changes. Root's concurrent gate at52bd7f7 is intermediate for the final head.

## Changed files, self-review and remaining limits

Commit range: `52bd7f7f1608774113cdc3039a9e49b51e87bc97..712117b84b20dca607c160964c7b85440759f74b`.

| Tracked file | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 4 | 4 |
| foundations/part_map.md | 1 | 1 |
| guidelines/coding.md | 4 | 5 |
| Total | 9 | 10 |

Ignored plan.md gains the accepted introduction requirements section; ignored reports hold evidence. No additional dependent file was needed. Final tracked worktree/index is clean; the two pre-existing untracked bytecode directories remain untouched. Commit author email check confirms the configured private address; no global configuration was changed.

Self-review checked source fidelity against root's actual C35/C36 sentences, Plan test, complete original settlement1 and all other rows. The relationship is allowed because this implementation deliberately obtains scope from product-foundation. D-28 retains adopted tools' lasting no-transition choice and all deferrals. The new fingerprint has a real dependent text update, no stale reference. No special policy for every future linter introduction was introduced. No deferredMinor, check, executable or guideline case block was changed.

Actual sharpness remains high from the affected part map/decision scopes; all7 computed part levels stay high. This doc change introduces no executable trust-boundary or irreversible operation. The existing audit/process trust boundaries are unchanged; therefore no new adversarial runtime input is needed for this bounded settlement. No interface rendering changed or visual validation claimed.

Remaining limits for root: fresh scoped review is pending; final gate must cover the settled head. The map still reports two existing criticality propagation warnings and no actual dependency-graph reporter; four release-fact Method TODO fields remain unchecked. Previous visual/native-POSIX limits and four deferredMinor findings remain as earlier recorded, neither regraded nor fixed. No new unresolved design/foundation question was found, and no second assessment was requested.
