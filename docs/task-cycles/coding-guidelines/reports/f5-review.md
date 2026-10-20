# Spec Compliance

**Issues found.** F5 implements the requested comparison and advisory policy, but source identity validation can accept a lock whose tarball names a different actual package/version. This violates the requirement that an incomplete or unsupported comparison gives no successful verdict; see Important F5-R1 below.

**Cannot verify from this stage:** the product's actual introduced-npm-vulnerabilities/1 result and live integration with the root-installed npm client. The recorded actual method exits **2**, with **invariant null**, because npm 11.13.0 is not yet declared/locked locally. This remains unavailable, not passed or violated. Installation preparation and final acceptance belong to the controller's later stage.

Reviewed range: `e0a4699be13e0e9efef4eefc1de6f3bd584d115c..ef4551455d30ba0a74600966a584dcc9dca767c1`.

Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.

## Strengths

- `scripts/check_dependencies.py:101` snapshots the explicit ancestor with its own historical map. Current new paths are discovered separately. Package pairs are unioned before subtraction at `:302`, so changing an installation path does not turn an unchanged real-name/version pair into an introduction.
- `scripts/check_dependencies.py:162` validates paired manifests/locks and traverses every supported package entry, not just direct production dependencies. `tests/quality/test_dependency_audit.py:124`, `:136`, `:150` and `:251` exercise aliases, all dependency classes, new paths, nested versions and scoped identities with explicit payload assertions.
- `scripts/check_dependencies.py:69` rejects duplicate JSON keys. `:262` validates the complete concrete-advisory response before range evaluation, and `:56` uses the pinned npm implementation's inclusive prerelease/loose advisory options. `tests/quality/test_dependency_audit.py:211`, `:224` and `:245` cover late malformed data, prereleases and duplicate-key erasure.
- `scripts/check_dependencies.py:292` builds tool-lock checks exclusively from current `files`; it does **not** require npm 11.13.0 in historical `base`. An old fork without the new tool declaration is therefore not rejected by the pin check. Both old and new dependency requirements still receive semver validation.
- `scripts/check_dependencies.py:43` invokes Bulk directly through the already installed npm client, with no Quick fallback, installer or npx path. It submits the introduced names and versions. D-33 does not introduce a prohibition on ordinary technical request metadata; none has been invented in this review.

## Issues

### Critical (Must Fix)

None found in this task scope.

### Important (Should Fix)

### F5-R1. Validate the whole resolved package/version identity before the offline pass

**Scope:** in scope, F5 lockfile trust boundary and no-new-pair comparison. **Thread:** new. **Grade:** Important, independently assigned because the method can publish a successful invariant verdict for conflicting source identity and skip the database request entirely.

**Anchor:** `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_dependencies.py:211`.

**Copyable comment:** The source check compares only the name before the first `/-/`, so a lock still claiming `a@1.0.0` accepts `resolved: https://registry.npmjs.org/a/-/a-1.5.0.tgz` and returns a named offline pass without auditing `a@1.5.0`. It also accepts `https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz`, which Node normalizes to the tarball of `other@1.5.0`. Validate the complete canonical tarball name/version against the claimed pair, rejecting ambiguous or conflicting URLs before subtraction, and cover both cases on the no-new-pair route.

**Why I report this:** The audit exists to compare actual npm name/version pairs and to avoid a successful verdict when that comparison is unsupported or incomplete. `_collect` validates only the leading source-name prefix at lines 211–213 and then adds the independently declared lock `version` at line 214. Neither the tarball filename/version nor URL normalization participates in identity validation. Consequently, changing only `resolved` while keeping the old manifest and lock `version` leaves `after - before` empty; `check` reaches lines 309–312 and publishes `pass` without asking the database about the source now selected for installation.

The focused reviewer probe reused the existing fixture setup, real Git, Node, semver and production `check`, replacing only the registry exchange with the existing explicit double. In its base, `a` is `1.0.0`. In the first current input the declared version remains `1.0.0`, but `resolved` points to `a-1.5.0.tgz`. The exact result is exit 0, named invariant pass, and no registry request even though the double is configured to fail any request. The second input uses the dot-segment URL in the comment and produces the same result. Node's actual URL parser normalizes that URL to `https://registry.npmjs.org/other/-/other-1.5.0.tgz`; npm 11.13.0's own `version-from-tgz` recognizes respectively `a@1.5.0` and `other@1.5.0`.

The installation mechanism was checked independently in the installed npm 11.13.0 source: `C:/Program Files/nodejs/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:704` selects the resolved URL, `:736` passes it to `pacote.extract`, and `C:/Program Files/nodejs/node_modules/npm/node_modules/pacote/lib/remote.js:11` retains the fetch URL. `remote.js:48` fetches that URL. This is not a claim that a vulnerable tarball was downloaded in this review: no installation or tarball request was made. It establishes why a conflicting `resolved` is operationally relevant rather than harmless text, and the fixture proves that unsupported identity presently gets a successful verdict. A matching low-or-higher advisory on the actual selected pair can be missed because that pair is never submitted.

Fix by validating the supported public-registry URL as a complete identity: exact registry origin, a canonical supported path without dot-segment/escape ambiguity, and a tarball package name and exact version consistent with the lock identity. When that cannot be established, return unavailable instead of trusting only the prefix. Apply validation to both historical and current graphs before subtraction, and add regressions for a same-name/different-version tarball and a normalized different-name URL while declared pairs are unchanged. The same validator must retain scoped/alias support. This is one defect with two demonstrated forms, not two independently counted findings.

Evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/f5-review-probe.py`, complete stdout/stderr in `f5-review-probe.txt`, exact invocation/exit in `f5-review-probe.txt.json` beside it. Probe command: `python -B .runs/task-cycles/coding-guidelines/reports/f5-review-probe.py`; harness exit **0**, while both deliberately unsupported audit cases wrongly return **0** instead of unavailable **2**.

### Minor (Nice to Have)

None raised. No speculative code-polish or generic coverage request is being substituted for a demonstrated failure.

## Assessment

**Task quality: Needs fixes.** The implementation has good separation of input collection, comparison, advisory validation and matching, and its focused tests exercise substantial real behavior. The remaining source-identity gap defeats the exact pair boundary and the offline completeness promise, so this method cannot yet be trusted as an invariant check.

## Scope, sources and inspection record

- Read the reviewer contract and exact Superpowers **6.4.1** `skills/subagent-driven-development/task-reviewer-prompt.md`; followed its task-review boundary, with no subagents, external comments, product changes, index changes, branch changes or routine suite reruns.
- Read the review handoff, F5 handoff, author report and author contract. Read the assigned complete diff; initial tool output truncated the first retrieval, so the missing sections were recovered explicitly. The added script was also read separately to recover the truncation. Final inspected change is exactly two added Python files, **+630/-0**; there is no changed product document. Code/test pass completed; document pass confirmed no product prose in this diff. The author report was checked separately as evidence rather than adopted as policy.
- Whole authoritative policy: `foundations/invariants.md`, introduced-npm-vulnerabilities/1, and linked D-33/1 including fields, rationale and rejected alternatives. D-33 has no Based on or Relations entries requiring further policy expansion. Also read whole application-package-layout/1, application-build-layout/1 and application-build-output/1 for the supported application layout.
- Read the complete part map, product glossary, `.the-way/product-guidelines/reading.md`, complete coding template, and common way_of_working. Inspected the complete decision log's Scope fields and read build-tools entries; current matches are D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-27 and D-28 through D-33. The governing policy for this method is D-33; D-28 explicitly defers a separate build/test exemplar. No product guideline file exists yet (`Test-Path guidelines` returned False); this task creates them, so the creation gap is recorded and no absent guideline is treated as a pass or an exemption invented by the reviewer. No selection expansion was necessary beyond build-tools.
- Read `scripts/quality_support.py` and F1 report for the concrete risk that incomplete discovery or exceptions might become success. `discover_files` includes unignored new owned paths and rejects unsafe/unowned/ambiguous inputs; `run_check` maps exceptions to exit 2 with invariant null and overwrites stale records. Read actual package manifest/lock input formats (v3, scopes, nested and optional dependencies); no product input was edited.
- Additional outside-diff inspection was limited to the named source-identity risk: installed npm 11.13.0's arborist version-from-tgz/reify and pacote fetch code. Node's URL normalization and npm's parser were used by the focused probe. Official [npm Bulk advisory protocol documentation](https://docs.npmjs.com/cli/v11/commands/npm-audit/#bulk-advisory-endpoint) was checked for the names/versions request and advisory schema; this live v11 page is not evidence of the exact installed npm release. Matching semantics are grounded in the installed pinned-version source and supplied RED/GREEN evidence.
- Pin verification commands `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` each exited 0. Complete output, with empty stderr, was respectively `d829e3aa6242a9b8901274531dd82fd5c7d87628` and `160000 d829e3aa6242a9b8901274531dd82fd5c7d87628 0\t.the-way`. These are the same commit. No diff regeneration or branch manipulation occurred.

## Evidence and limits retained

The author evidence directory is `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. The named text files retain complete sanitized output, with exact child command, actual exit and elapsed time in adjacent `.txt.json`. Existing runs were read, not repeated.

| Evidence | Observed result | Interpretation |
|---|---|---|
| `f5-red.txt` | 13 tests; 30 assertion failures; exit 1 | Initial missing-method RED, retained. |
| `f5-green-first.txt` | 13 pass; exit 0 | Initial focused GREEN, not final coverage. |
| `f5-weakest-red.txt` / `f5-weakest-green.txt` | Identity-conflict RED (0 vs expected 2), then 17 pass | Original simple different-name identity defect fixed; it does not cover F5-R1's suffix/normalization forms. |
| `f5-pin-red.txt` / `f5-green-final.txt` | Root npm-mask RED, then 18 pass | Exact current root pin check fixed. Historical tool declaration is not required by the code. |
| `f5-prerelease-red.txt` / `f5-green-complete.txt` | Prerelease RED (0 vs expected 1), then **19 pass**, no skips | npm-inclusive advisory matching fixed; final focused suite is green. |
| `f5-live-first.txt`, `f5-live-final.txt`, `f5-live-complete.txt` | Each actual method exits **2**, invariant null, `npm 11.13.0 must be declared and locked locally` | Actual audit remains unavailable. No actual vulnerability count can be inferred. |
| `f5-npm-test.txt` | 173 application tests pass; exit 0 | Extra application regression result, not dependency-audit or Bulk integration evidence. |
| `f5-diffcheck.txt` | Exit 0; no output | Author's staged whitespace check passed. |
| `f5-environment.txt` | Node v24.17.0; Python 3.14.3; reference npm 11.13.0; semver 7.7.4; npm advisory matcher source | Read-only reference/fixture evidence, not fallback to global npm in the product method. |
| `f5-review-probe.txt` / `.txt.json` | Reviewer harness exit 0; **two unsupported audit inputs incorrectly return named pass 0**, no requests | New focused counterexample; this is the evidence for Important F5-R1, not an audit acceptance pass. |

No new package-wide, application or invariant suite was run by this reviewer. No final deliberate-break acceptance or guideline good/bad acceptance was assigned at this stage; both remain unchecked for the controller's later acceptance stage. Live Bulk behavior with the actual locally installed product npm distribution remains unchecked. No screenshots apply because neither changed file introduces a UI route or intended visible change.

All unresolved findings: **F5-R1 (Important, in scope)**. Operational non-pass retained separately: actual audit unavailable pending authorized installation preparation and rerun against the original fork and final full lock; fixture success cannot replace that result.
