# Finding Verdicts

**F5-R1 — Validate the whole resolved package/version identity before the offline pass — ADDRESSED.**

Range reviewed: `ef4551455d30ba0a74600966a584dcc9dca767c1..17d23b997bc3febb827dc330410dad3458ba9e34`.

Original finding, verbatim:

> The source check compares only the name before the first `/-/`, so a lock still claiming `a@1.0.0` accepts `resolved: https://registry.npmjs.org/a/-/a-1.5.0.tgz` and returns a named offline pass without auditing `a@1.5.0`. It also accepts `https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz`, which Node normalizes to the tarball of `other@1.5.0`. Validate the complete canonical tarball name/version against the claimed pair, rejecting ambiguous or conflicting URLs before subtraction, and cover both cases on the no-new-pair route.

At `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_dependencies.py:207`, the fix replaces prefix parsing and URL decoding with complete raw-string comparison against explicitly supported public-registry tarball addresses. Lines 212–216 include the actual real package basename and exact lock version in that comparison. Therefore the first original counterexample cannot equal the supported address for a@1.0.0, and the dot-segment URL cannot equal any supported spelling. Validation stays inside `_collect`, before either graph contributes pairs to subtraction; historical and current conflicts are both rejected. A URL is never normalized into an apparently acceptable identity.

`tests/quality/test_dependency_audit.py:236` and `:246` retain the two exact original inputs, leave declared pairs unchanged, and assert exit **2**, invariant **null**, and no registry request. The existing reviewer probe was rerun by the author without changing its original counterexamples: both cases now yield exactly those results. The harness exits 0 because the probe completed, not because either unsupported audit case passed. This directly closes the observed false named pass.

The regression table at `tests/quality/test_dependency_audit.py:256` additionally covers encoded dot segments, raw backslashes, queries/fragments, wrong basename, trailing path, escaped filename, embedded newline and explicit port. Positive controls at `:278` retain ordinary offline success, real-name aliases, scoped literal and encoded separator forms, and prerelease/build metadata. The historical conflicting-source case at `:302` fails unavailable; the historical-tool-pin control at `:319` succeeds after adding current npm and verifies the submitted npm pair. Thus the fix does not accidentally require the new npm tool in the historical fork.

# New Breakage in the Fix Diff

**None found.** The runtime change is confined to the resolved-source identity block and removal of its unused urllib import. The explicit accepted forms exclude URL normalization ambiguity while retaining ordinary, scoped and alias package identity. Returning unavailable for other source spellings is consistent with D-33's unsupported-input rule; no new policy threshold, Quick fallback or tool-installation route is introduced.

The six additional tests exercise the real production `check` through the existing isolated Git/Node/semver fixture and make concrete verdict, invariant-record and request assertions. Their added Git operations are fixture-local. No changed product document exists in the two-file fix diff; a separate document pass therefore has no product prose to judge. The author report was inspected as evidence, separately from the implementation.

# Out-of-Scope Observations

**None newly raised.** This is a scoped re-review, not a renewed audit of untouched code. The product's actual pinned-npm Bulk integration and final invariant acceptance remain **unchecked**. The retained actual method result from F5 is **exit 2, invariant null**, because local npm 11.13.0 has not yet been declared/locked/installed in the product environment. Fix-fixture success does not replace that live result or establish an actual vulnerability count.

# Verdict

**Fix round: All findings addressed, no new Critical/Important breakage.** No unresolved finding remains from this round. Spec compliance for the scoped correction is satisfied; task quality for this correction is approved. The controller still owns installation preparation and final original-fork/live acceptance.

# Sources, Selection and Evidence

Read the scoped handoff, reviewer contract, exact Superpowers 6.4.1 `skills/subagent-driven-development/re-review-prompt.md`, F5 handoff, fix report and complete assigned fix diff once. The review follows the previously read whole code-review playbook. Re-read the final introduced-npm-vulnerabilities/1 and full D-33/1; their package-pair and unavailable-result meaning is unchanged. D-33 has no Based on or Relations entries requiring further expansion for this correction.

The earlier whole part-map, guideline-reading and coding-template selection remains applicable: only build-tools changes. The fix does not change ownership, a reading condition or a discipline decision. `Test-Path guidelines` again returned False, confirming the announced guideline-creation gap; no applicable product guideline file yet exists. No UI change or screenshot requirement is introduced. There is no selection expansion and no inferred waiver of a product rule.

Inspected author output and exact adjacent metadata at `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`:

| Exact author command | Actual exit | Complete sanitized stdout/stderr | Observed evidence |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k tarball` | 1 | `f5-fix1-red.txt` | Six tests; 11 assertion failures, including both original 0-vs-2 cases and historical conflict. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | `f5-fix1-green.txt` | 25 tests pass, no skips or warnings in the captured result. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-review-probe.py` | 0 | `f5-fix1-probe.txt` | Both original unsupported cases return audit exit 2, invariant null, no request; conflicting URL identities remain unchanged. |
| `git diff --cached --check` | 0 | `f5-fix1-diffcheck.txt` | Empty output; staged whitespace check passed. |

Each listed output has adjacent `.txt.json` containing its exact argv, actual child exit and elapsed time; those metadata were read. No evidence was missing or reconstructed by repeating a run.

**Reviewer execution:** no test/probe/suite rerun. Manual review by this reviewer compared the whole fix diff, final policy and original finding with the complete supplied RED/GREEN/probe outputs and metadata, and checked current source-line anchors and guideline absence. Test-command/exit/output fields are not applicable to those source/evidence reads. No additional empirical doubt remained that warranted a new run. No product edit, index change, branch change, subagent, installation, external comment or next-stage invocation occurred; only this ignored report was written.
