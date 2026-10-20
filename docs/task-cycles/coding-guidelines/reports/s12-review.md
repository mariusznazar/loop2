# S12 independent scoped review

## Spec compliance

**Verdict: compliant.** Reviewed `a98222d..e31f6a4` using `.superpowers/sdd/plan/s12-review-package.txt`, read once in full. The only change is the required conditional pointer and its blank separator at `AGENTS.md:6`. It precedes the installer marker at line 8, gives exactly one general guideline path, includes scripts/tests, and adds neither tool commands nor kind paths. The unchanged `CLAUDE.md:1` imports `AGENTS.md`; no second instruction is needed. This meets task-12-brief and frozen task To do 10. No missing, extra or misunderstood S12 behavior found.

**Cannot verify from this diff:** the separate foundation-copy work assigned earlier and final complete-product acceptance. This range changes no invariant, checker, code or guideline. Final deliberate-break and guideline-case acceptance, fresh merge-target reference validation and whole-product gates remain the controller's later responsibility. No fresh-session loading or instruction-following experiment is present; static correctness is not evidence of measured agent compliance.

## Strengths

- `AGENTS.md:6` names a recognizable event and the direct general source in backticks. The wording agrees with `guidelines/coding.md:6-9`, includes helper scripts and tests, and keeps changing tool details out of the session-level instructions.
- The review package preserves the installer block and backlog exactly. The recorded weakest-point helper also compares Git blob bytes, confirms the unchanged CLAUDE import and target existence, avoiding the CRLF/LF mismatch in its initial version.
- Evidence explicitly distinguishes zero errors from eleven warnings and acknowledges the form-only run's omitted merge comparison. No silent failure, rule weakening, hidden skip or invented green gate was found.

## Issues

### Critical

None.

### Important

None.

### Minor — new instruction-scan noise (new thread, nonblocking)

**Anchor:** `guidelines/coding.md:31` (unchanged content newly reached through `AGENTS.md:6`).

**To paste:** The new pointer makes the instruction checker inspect the guidelines and report `@eslint/js` as a missing file import. This is an npm package name, so the warning is misleading; consider formatting this package name as inline code in the guideline's owning scope to keep future instruction scans clearer.

**Why report this:** The scanner is intended to expose broken instruction routes. Its `pointed_files` function (`.the-way/instruction-files/check_instructions.py:568`) follows Markdown paths in root instruction backticks, and `check_file` (`:507-535`) scans non-code prose for `@` imports. The ordinary package reference in the guideline therefore matches `AT_IMPORT` (`:60`) and cannot resolve as a local file. The before/after logs show ten baseline warnings becoming eleven with precisely this additional diagnostic. Its concrete effect is one recurring false missing-import warning that a maintainer must distinguish from real broken instructions; it does not break code, prevent the guideline read or fail this checker, whose exit at `:724` depends only on errors. S12 uses a backtick pointer rather than an import, so this warning does not demonstrate that the general guideline or package is loaded as an unconditional instruction import. No fresh runtime loading experiment was performed. This is a Minor evidence-quality issue, not a reason to block the required pointer or weaken/change the frozen checker. A prose-format correction would belong to the guideline's owning scope, subject to the controller's scope decision; no product fix was made here.

## Foundation and guideline selection

Read the complete current part map. `foundations/part_map.md:97-111` places root AGENTS, CLAUDE and guidelines in agent-workflow. This diff changes instruction prose only, with no UI, executable code, integration, trust-boundary or irreversible-behavior change.

Inspected all decision headings/Scope fields and invariant headings/Part fields. Read current agent-workflow entries D-12, D-13, D-15, D-28, D-30 and D-31 whole, with D-09 for D-15's relation. Read applicable guidelines-form and guidelines-reference-current whole; both have no dependencies. Also read the standing `every` invariants and the Ruff/ShellCheck agent-workflow entries; no covered source is edited, so their runtime/tool suites are not newly required by S12. Product glossary was read whole; no glossary term changes the pointer's meaning. No current product environment fact directly governs the added instruction; no new fact is asserted. The package/tool scopes and frozen npm 12.2.1 settlement are unchanged.

Read `.the-way/product-guidelines/reading.md` whole, `guidelines/coding.md` whole, and inspected headers and reading conditions of all four kind files plus the complete general index. The general file names agent-workflow; none of the four kinds names this part or matches AGENTS prose. Thus S12 selection is general coding only, agreeing with the handoff and author report, with no expansion or discrepancy. S11's four-kind content review is outside this range. The initial Windows wildcard invocation for header search returned an invalid-path error; it was replaced with directory plus `-g` and direct header reads, not treated as absence.

## Concrete risks checked and evidence limits

1. **Installer overwrite or duplicate routes:** full supplied diff, unchanged CLAUDE import, frozen To do 10 and recorded weakest-point helper/output show the addition outside the installer and no duplicate commands or paths. No changed file was reread separately; the full diff has enough context for its entire two-line addition.
2. **Contradictory trigger or missing kind routing:** complete general guideline/index and all metadata conditions agree with the pointer. `.the-way/instruction-files/principles.md` was read whole; conditional backtick routing is consistent with its placement rules, and the accepted task supplies the carried step rather than relying on an unmeasured repeated incident.
3. **Scanner warning hiding a real missing target or failed gate:** independently inspected scanner recognition, one-level traversal and exit semantics against the target's actual package prose and full before/after logs. Classified above by consequence, not by the author's description.
4. **Unsubstantiated reported checks:** read the full agent-workflow, instruction-scan, form, reference and final weakest-point logs, and exact command/exit JSON companions. Recorded agent-workflow has five passing tests. Both guideline methods report zero errors/warnings/unchecked for their actual requested checks; the form-only run explicitly omits merge comparison. Reference validation uses the recorded local target `c379207bfd8bd148d3589ea75604ba5165915d01`, not a newly fetched target. The final helper exits 0; the earlier helper's exit 1 remains disclosed as an instrument representation error. The diff-check output is empty with exit 0.

No tests were rerun: existing evidence answers the risks in this two-line prose change. Review commands were read-only file reads/searches, not test executions. No product, index, HEAD or branch mutations, no subagents, no prohibited 10x source access. Only this authorized ignored report was written.

## Declined / out of scope

- Ten baseline remote-Linux-path warnings are documented existing diagnostics, unchanged by S12; local nonexistence does not establish remote breakage.
- Do not remove the required pointer to suppress the newly reachable warning, add kind paths/tool commands, modify pinned scanner behavior, or reopen S11's guideline architecture in this scope.
- No appearance finding applies: no screen, style or runtime UI changes occur.
- A fresh loading/compliance measurement is an evidence limit, not an omitted requirement of this static pointer slice.

## Assessment

**Task quality: Approved, with one nonblocking Minor concern.** The small addition faithfully implements the accepted route with no runtime or foundation change. The new scanner warning is concrete diagnostic noise; the reviewed mechanism provides no Important correctness consequence or reason to distrust S12.
