# F3 fix round 1 — F3-1

Status: DONE_WITH_CONCERNS at the correction author boundary. Important F3-1 is corrected in the two necessary assigned paths. Focused tests and the original reviewer probes pass their expected outcomes. Real Ruff remains unavailable, so this report does not claim actual source compliance or live tool integration. No next stage or independent review was invoked.

## Inputs, scope and guideline selection

- Start: `49a37059c637027880955d31199d4bbbcf99eda1`; worktree `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`. Verified clean starting tree and the-way checkout/gitlink both `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Resumed under the already whole-read author contract, F3 handoff, final invariant sentences and authoritative D-30/fact dependencies. Read the complete fix handoff and `f3-review.md`, the exact original four-case reviewer script/output and the current scanner. No plan, frozen task, product-author reasoning, shared mechanics, source under check, installation configuration or other branch was changed or used as a substitute for final rules.
- Guideline selection remains the whole-read initial F3 selection: the current map assigns both changed files to build-tools; no product guidelines exist yet, and the task creates them. The announced missing-general-file finding and D-28 deferrals remain unchanged. No new code kind, source part or UI behavior was added; no additional guideline was selected. Screenshots remain unchecked because the change has no intended visible effect.
- Pinned official sources checked for this correction: [suppression.rs](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/suppression.rs), [noqa.rs](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/noqa.rs), [rule_redirects.rs](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/rule_redirects.rs). SuppressionParser defines bracket actions, permits whitespace, comma-separated words and a trailing comma, and visits nested sub-comments. Both suppression and noqa code matching resolve deprecated exact aliases through the same redirect table. These are statements from pinned source, not evidence of running Ruff locally.

## Correction and choices

The Python comment-token scanner now recognizes the bracket `ignore`, `file-ignore` and `disable` actions, including clean source, before considering existing noqa syntax. Paired disable/enable regions are caught at their opening disable. An enable alone closes a region rather than suppressing a rule; no blanket prohibition of comments or all action keys was introduced. Every sub-comment is examined, so an earlier nonblocking noqa or bracket directive cannot hide a later blocking bracket suppression in the same comment token.

Bracket lists are checked as exact codes, with the pinned parser's word characters and optional trailing comma. Requests for a blocking rule fail even when the source has no corresponding diagnostic. Nonblocking E402 forms, strings and multiline string data remain neutral. A regex over all source text would be smaller but falsely reject literals; extending the existing tokenizer path preserves the established separation. No linter selection, invocation, output parsing or record policy changed.

The weakest-point follow-up found that exact spelling alone would still miss deprecated codes. Added the minimal frozen table of **30 exact redirects whose targets are blocking**, from pinned rule_redirects.rs. The same normalization now applies to both bracket and existing noqa handling. This is syntax compatibility for the adopted set, not an additional blocking set. Example: U001 targets blocking UP001; R501 targets blocking RET501 in noqa. Counterexample: M001 targets example-only RUF100 and remains allowed. A read-only comparison against the official table and independent final-fact membership proves exact agreement of all 30 entries; it also reconfirms the unchanged 393-rule list.

The alternative of querying aliases from an unavailable tool during every scan would add subprocesses and make comment recognition dependent on further live metadata. Keeping only the applicable pinned mappings costs 13 static source lines and a maintenance check whenever the adopted Ruff edition or blocking set changes. Other aliases whose targets are not blocking need no stored mapping. No runtime network query, download or installation was added.

## TDD, original probes and exact evidence

All evidence is under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Every output below is the complete sanitized combined stdout/stderr; each has adjacent `.txt.json` with exact argv, actual child exit and elapsed time. Captures use the existing `capture.py`; the table gives its exact child command. `PYTHONDONTWRITEBYTECODE=1` was used for fixture runs.

| Exact child command | Actual exit | Output | Result |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-fix1-red.txt | Meaningful initial RED: 18 tests, seven subcase assertions fail because clean bracket suppressions incorrectly pass. Neutral/literal controls continue to pass. |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | f3-fix1-green.txt | Initial correction GREEN: all 18 tests pass. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-review-probe.py` | 0 | f3-fix1-probe.txt | Original four reviewer cases now all give suppression true, adapter exit 1 and named fail: noqa positive control, ignore, file-ignore, disable/enable. |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 2 | f3-fix1-live-ruff.txt | Actual method still cannot run local Ruff; null invariant. No claimed live acceptance. |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-fix1-weakest-red.txt | Alias RED: four additional blocking aliases in bracket/noqa forms falsely pass. M001 nonblocking-target control remains neutral. |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | f3-fix1-final-green.txt | Final GREEN: all 18 tests pass; includes eleven blocking and seven neutral new subcases. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-fix1-alias-check.py` | 0 | f3-fix1-alias-check.txt | Official-source comparison: exact 30 applicable redirects; unchanged 393 blocking members; M001 -> RUF100 nonblocking control. |
| `git diff --cached --check` | 0 | f3-fix1-diffcheck.txt | No whitespace errors. |
| `git show --stat --format=fuller HEAD` | 0 | f3-fix1-commit.txt | Exact two-file commit and private author address verified. |
| `git status --short` | 0 | f3-fix1-status.txt | Clean working tree after the correction commit. |

Fixture evidence exercises actual adapter discovery, subprocess/diagnostic processing, Boolean result and written invariant records. Only the absent Ruff executable boundary is simulated. Tests do not merely call the suppression predicate: each source is a real new owned Python file in a disposable Git repository, with an empty valid diagnostic report from the tool fixture. Thus a failing test identifies a false named acceptance of the source-directive clause independently of ordinary diagnostics.

## Changed files, self-review and boundary

| File | Added | Removed |
|---|---:|---:|
| scripts/check_ruff.py | 27 | 1 |
| tests/quality/test_python_shell_checks.py | 39 | 0 |

Commit range: `49a37059c637027880955d31199d4bbbcf99eda1..8cd65938261045398c2d9059a0ba2c05c9a254b7`.
Commit: `8cd6593 fix: detect pinned Ruff suppression forms and aliases`.
Only these explicit paths were staged. The ignored report and evidence are not committed. Verified private author address `mariusznn@gmail.com` and clean working tree. The assigned ShellCheck method, shared support, source/configuration files and foundation remain unchanged.

Self-review read the complete correction diff and checked all new code against the pinned syntax, including multiple sub-comments, comma/whitespace handling, a clean disable/enable region, block-only suppression, aliases in both paths, nonblocking targets and string/multiline literal controls. The weakest-point alias check caught four real additional false accepts before the normalization fix, then passed. Its independent comparison covers every applicable table entry, while representative adapter fixtures cover the outcome branches rather than only equality of constants.

Sharpness is unchanged: only build-tools changes, at the boundary converting untrusted source/tool output into a gate verdict. There is no application state, deployment action, lockfile/trust-boundary edit or irreversible operation. The correction removes demonstrated false named passes; it does not relax tool or parser inability handling.

## Remaining concerns and unchecked work

- Actual Ruff is still absent: its method returns exit 2 with null invariant. Actual ShellCheck installation and real sentinel/output compatibility retain their original F3 unchecked status; this correction does not claim to retest them.
- Real Ruff 0.17.1 compatibility with these source forms and aliases must still be exercised after installation. Official source and fixture results establish the expected adapter policy, not live product compliance.
- Known-neutral E402 and M001 target cases and literals remain allowed under valid fixture output. Unsupported/malformed tool reports and unavailable tools retain the existing inability behavior. ShellCheck's unresolved disable membership/source effects remain explicit inability, not a new blanket policy.
- Full application/broad suites, final source remediation, deliberate-break acceptance, guideline good/bad pairs and merge checks were not rerun; the fix handoff excludes them. Review of this correction belongs to root; the author stops here.
