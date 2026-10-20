# F5 fix round 1 — complete registry tarball identity

Status: DONE_WITH_CONCERNS, awaiting controller-owned re-review. Important finding F5-R1 is accepted and corrected. Both original counterexamples now return unavailable (2), invariant null, without a registry request. All 25 dependency-audit tests pass. Product live audit remains unavailable pending the later installation step; no fixture result is claimed as a live audit pass.

## Inputs, scope and selection

- Start `ef4551455d30ba0a74600966a584dcc9dca767c1`, worktree `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`. Original fork remains `c379207bfd8bd148d3589ea75604ba5165915d01`. Final range: `ef4551455d30ba0a74600966a584dcc9dca767c1..17d23b997bc3febb827dc330410dad3458ba9e34`, commit `fix: validate complete npm tarball identities`. Commit capture `f5-fix1-commit.txt` / `.txt.json` records exit 0 and complete output; only the two assigned paths were committed. Post-commit status is clean and private author identity was verified.
- Read whole fix1 handoff, resumed author contract and F5 handoff, complete f5-review.md, and both concrete cases in f5-review-probe.py with its complete original output. Read the complete current adapter and affected existing tests. The previously read TDD 6.4.1 reference and writing-good-tests guidance remain in force; this narrower handoff explicitly permits only affected focused tests/probes, and no application or broad suite was run.
- Verified the-way checkout and gitlink both `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Whole authoritative introduced-npm-vulnerabilities/1, D-33 and part-map/guideline-reading sources from the first dispatch remain unchanged and applicable: exact actual pairs and unsupported/incomplete data cannot receive successful verdicts. Build-tools remains the only touched part. No product guidelines exist yet; the same announced creation gap remains, no selection expansion or new policy meaning was introduced. No UI route or visible change exists, so screenshots are unchecked for that reason.
- Additional exact-version source: read whole installed npm 11.13.0 `C:/Program Files/nodejs/node_modules/npm/node_modules/@npmcli/arborist/lib/version-from-tgz.js`. It documents ordinary/scoped tarballs and recognizes literal slash or `%2f` case-insensitively between scope/project. The reviewer probe uses the same implementation plus Node's actual URL parser to demonstrate actual identity and normalization. No tarball was requested or installed. Earlier environment evidence remains Python 3.14.3, Node v24.17.0, reference npm 11.13.0 and semver 7.7.4; production invocation still requires the root-installed pinned tool.

## Change and supported input forms

Only the assigned files change:

| File | Added | Removed |
|---|---:|---:|
| scripts/check_dependencies.py | 10 | 7 |
| tests/quality/test_dependency_audit.py | 98 | 0 |

The collector no longer parses a prefix from an arbitrary URL and assumes the separate lock version is consistent. It constructs the complete supported archive spellings from the already-validated real name and exact lock version, then requires raw full-string equality. For `name` and `version` the supported form is exactly `https://registry.npmjs.org/name/-/name-version.tgz`. For `@scope/name` the filename is `name-version.tgz` and the package path may be `@scope/name`, `@scope%2fname` or `@scope%2Fname`. Alias install names do not enter this source identity; the real package name does. Literal prerelease and build metadata in the exact version are retained.

This simultaneously enforces the registry origin, complete package identity, complete tarball basename/version, and absence of normalization ambiguity. No attacker-supplied URL is decoded, normalized or used to infer a replacement name/version. A different version, dot segments, backslashes, arbitrary percent escapes, altered filename, extra path suffix, query, fragment, newline, explicit port or any other spelling outside these supported forms is unavailable, never a successful comparison. Exact scoped encoded separators are explicitly enumerated from the trusted supported shape, not accepted through general unquoting. Data without a resolved URL retains the existing structural identity treatment; that behavior was not changed by this fix.

Validation remains inside `_collect` for both historical and current graphs, before union subtraction and before the offline route. Current tool pin checks still use current files only. A new control starts from a historical base with no npm audit tool and proves that the valid current addition of npm 11.13.0 is sent to the registry and accepted from a valid empty advisory response; the historical tool is not incorrectly required.

Alternative considered: normalize arbitrary URLs, extract a likely identity and compare it to the claim. That preserves more spellings, but reproduces the cross-parser ambiguity behind this defect and needs a broader URL/source contract. Exact supported spelling comparison is smaller and does not guess from path fragments. Its cost is conservative inability for otherwise valid alternate URL spellings. Future support for another form must establish complete identity and add both legitimate and adversarial controls, rather than relaxing a prefix check. Existing ordinary/scoped/alias controls, including the npm-recognized encoded scoped separator, remain green.

## Focused RED/GREEN and probe evidence

All files below live under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each output file contains complete sanitized stdout/stderr and its adjacent `.txt.json` records exact child argv, actual exit code and timing.

| Exact command | Exit | Complete output | Meaning |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k tarball` | 1 | f5-fix1-red.txt | Six focused tests, 11 assertion failures: both original offline counterexamples, related ambiguity forms and historical input incorrectly passed. Legitimate source and historical-tool-pin controls already passed. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | f5-fix1-green.txt | Final 25 tests pass, no skips. Only the affected dependency-audit suite ran. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-review-probe.py` | 0 | f5-fix1-probe.txt | Harness succeeds; each deliberately unsupported method case returns 2/invariant null/no request. Node and npm still demonstrate the conflicting actual identities, so the counterexamples were rejected rather than altered. |
| `git diff --cached --check` | 0 | f5-fix1-diffcheck.txt | No staged whitespace errors. Earlier unstaged diff checks also exited 0; their only diagnostics were Git's known LF-to-CRLF future-checkout warnings for these Python files. |

Both reviewer cases retain their exact URLs: `https://registry.npmjs.org/a/-/a-1.5.0.tgz` while the lock claims a@1.0.0, and `https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz`. The added tests assert unavailable/null/no network on the otherwise empty-difference path. The original probe output now confirms the same results independently through its existing fixture harness.

Weakest related boundary: parser normalization can erase or reinterpret characters before a loose name check. The additional adversarial table tests encoded dot segments, a raw backslash traversal, query/fragment, wrong basename, path suffix, escaped filename, newline stripping and explicit port. All but the already-rejected port reproduced false success in RED; all return unavailable in GREEN. Positive controls prove exact ordinary-source offline success and actual scoped/alias payloads, including both accepted percent-encoded scoped separators and a prerelease/build version. Historical source conflict also returns unavailable before the current valid graph can pass.

## Self-review, sharpness and remaining limits

Reviewed the complete diff and staged file set: the change is only the collector's source identity block, its now-unused urllib import, and six behavioral tests. It does not touch policy, subtraction, advisory matching, current-only tool pinning, shared mechanics, manifests, locks or configuration. Existing tracked files use i/lf and w/lf; edits preserve their line endings. No subagent, installation, next stage, merge, push or deployment occurred.

The affected trust boundary is untrusted lockfile source identity in build-tools. A false pass could admit a different vulnerable package/version while skipping the advisory request; a false inability stops development work. This correction favors explicit inability for unsupported sources and has no irreversible effect or application state change. It checks the supported registry URL identity, not the tarball contents or the registry's internal integrity/completeness; it deliberately performs no tarball download. Live Bulk integration and the final real dependency verdict remain unchecked pending root's installation stage, as in the original F5 report. No finding is contested and no foundation-policy question remains. Root owns re-review and the final original-fork live method after installation.
