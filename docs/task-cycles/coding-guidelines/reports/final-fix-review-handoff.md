# Single scoped re-review of final fix wave

Read user review playbook C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md and Superpowers6.4.1 skills/subagent-driven-development/re-review-prompt.md in full (installation C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1). Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines is read-only: no product/index/HEAD mutation, no subagents or fixes. Write only ignored report/evidence; scratch mutation only below .runs. Do not read 10x branches/directories. This is the only scoped re-review after the one final fix wave, not another wholebranch review.

Fix base e31f6a4051f33b832cb8603d67e815240af5464f. Root dispatch supplies final head and review-package path. Requirements: frozen task.md plus amendment-npm12.md, applicable final-fix-handoff.md and original final-review.md. Author report: reports/final-fix.md. Read full fix diff and whole applicable foundation/guidelines; current selection general guidelines/coding.md for Python test/check methods and map work, all metadata/index inspected. Expand if actual scope warrants it and report discrepancy. Current pin d829e3aa6242a9b8901274531dd82fd5c7d87628, original auditfork c379207bfd8bd148d3589ea75604ba5165915d01.

Verify each original Important finding below and fix-diff new breakage only. Do not broaden to untouched source; unrelated observations remain deferred Minor per scoped method. Grade independently; do not downgrade/discard an original finding on root's behalf. If author contests a finding with evidence explicitly say whether you keep it. Do not fix old four deferred Minors. Grade appearance by concrete user effect; guideline/example divergence alone does not imply a blocking issue without user/correctness consequence. Binding rules retain force.

Use existing exact author output/exit evidence without rerunning suites. Additional mandatory acceptance: independently verify final changed process-observation methods with native error/healthy behavior and deliberate break from current one-serving-process sentence, using scratch, not task tree. Original final reviewer provided actual two-listener/error probes; a reviewer-written independent variant or their unchanged original failing probe can establish the fix now rejects bad observation. No mocked CompletedProcess can replace native failure proof. A plain healthy product pass does not accept the method. Keep full exact argv/stdout/stderr/exit in reports. Preserve detection of real second server and valid healthy observation after restoration. Unchanged13guidelinepairs/other invariant checks retain final-review acceptance; repeat only affected evidence if the fix changes their inputs or behavior. For I-2 verify root and fixture ownership remains once and real dependency collection retains both, with actual guard success; no process checker mutation.

Write reports/final-fix-review.md with Finding Verdicts, New Breakage, Out-of-Scope Observations and Fix-round verdict, actual full range and acceptance evidence. Return concise exact verdict/path and every unresolved finding. There is no further fullbranch reviewer or second fix wave. Do not enter return-step/assessment.

## Original findings, copied verbatim

### I-1 — Reject non-terminating PowerShell observation errors

**Grade/scope:** Important, in scope. New thread in the final whole-branch review.

**Anchors:** [test_loop2_one_serving_process.py:72](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_one_serving_process.py#L72) and [loop2_invariant_support.py:83](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/loop2_invariant_support.py#L83).

**Ready to paste:** The new return-code checks still accept a failed Windows process read when PowerShell writes a non-terminating CIM error and exits 0 with partial stdout. In an actual native-command probe, that incomplete table made the unchanged one-serving-process assertion pass with two real HTTP-serving processes, while a normal table rejected the same pair. Make observation errors terminate the PowerShell command or otherwise reject their error output, and cover the exit-0/partial-output case in both readers.

**Why this matters:** The frozen task explicitly requires rejecting failed process observations rather than trusting partial stdout. Both commands pipe `Get-CimInstance` into formatting without making errors terminating; the new Python guards inspect only `returncode`. The process-count check filters listeners through the observed process tree, so an omitted child is excluded from both “other listener” and descendant checks. The cleanup reader can similarly return an incomplete descendant list, particularly relevant when the known parent has already exited.

This is a demonstrated ability to accept bad evidence, not a claim that ordinary CIM reads on this host currently fail. The reviewer induced the native error and incomplete observation deliberately, using the real installed PowerShell/CIM command; no synthetic `CompletedProcess` or happy mock supplied the result. First, both readers accepted native stdout accompanied by `Get-CimInstance : Invalid class` and exit 0. Second, real Node parent/child listeners on 52806/52807 were rejected with a healthy native observation, then accepted by the **same actual assertion** when the real partial query omitted the child and emitted the CIM error. The test used ephemeral ports and changed only its in-memory expected port; it did not replace the assertion. The owned process tree was terminated afterward.

Leaving this unchanged preserves a false pass under an observation failure, contrary to an explicit repair in this task. Making the PowerShell query fail closed adds a narrow failure-path change and its regression coverage; it need not alter the product server or broad process policy. The exact complete command, exit, stdout, stderr and outcomes are retained in [reader probe](final-review-observation-probe.log) and [actual two-listener proof](final-review-process-false-pass.log), with [reader source](final-review-observation-probe.py) and [two-listener source](final-review-process-false-pass.py). Both reviewer scripts exit 1 because the required rejection is absent.

### I-2 — Remove overlapping ownership of the dependency fixture files

**Grade/scope:** Important, in scope. New thread in the final whole-branch review.

**Anchor:** [part_map.md:73](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/foundations/part_map.md#L73), with the bare manifest patterns at lines 68–69.

**Ready to paste:** The new `tests/quality/**` assignment overlaps the existing bare `package.json` and `package-lock.json` patterns for both dependency-audit fixture files. The pinned map checker uses Git attribute-pattern matching, so those bare filenames also match nested files, and the required guard exits 1 because each fixture is claimed twice. Make the root-manifest patterns root-specific, or otherwise make these assignments non-overlapping, and rerun the actual map guard.

**Why this matters:** The task requires new manifests, locks and tests to be assigned through the part map. Its matcher creates an attribute for each pattern and asks Git to match it; it then appends one claim per matched pattern and rejects more than one claim, even when both name `build-tools`. The two new nested fixture files therefore turn a previously usable map into a failing mandatory gate. This is not merely the two pre-existing criticality warnings, and calling both assignments the same part does not make this pinned guard pass.

The complete root gate reports two errors, and the independent unmodified final-head scratch run reproduces exactly those errors, exit 1. [Independent full output](final-review-part-map.log), [exact command/exit](final-review-part-map.json). Root evidence is [resume-final-guard-part-map.txt](resume-final-guard-part-map.txt).

Leaving it as is prevents completion of the required gate. Narrowing the root patterns is a small map correction that preserves intended ownership; changing the pinned process checker would be a broader, unnecessary route for this task. No fix was applied by this reviewer.

## Exact dispatch range

Fix base: e31f6a4051f33b832cb8603d67e815240af5464f
Head: ef057111b09f0b081e1c9c1dd61678bb29040a07
Full package: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.superpowers/sdd/plan/final-fix-review-package.txt
