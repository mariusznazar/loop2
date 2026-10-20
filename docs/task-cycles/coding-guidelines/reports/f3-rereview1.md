# F3 scoped re-review, fix round 1

## Finding Verdicts

- **Important F3-1: recognize pinned Ruff suppression forms before naming a pass — ADDRESSED.** `scripts/check_ruff.py:87` now examines tokenized comments for `ignore`, `file-ignore` and opening `disable` actions. The bracket codes are matched exactly, including accepted whitespace and a trailing comma, and every sub-comment is examined. A paired enable is handled through its opening disable. The original three false-pass examples therefore reach the named-failure branch.
- **Required controls retained.** `tests/quality/test_python_shell_checks.py:108` supplies clean-source blocking cases for all required actions, unmatched disable, spacing, multiple sub-comments and mixed noqa/bracket syntax. `tests/quality/test_python_shell_checks.py:130` verifies E402 cases and quoted/multiline directive data remain neutral. These fixtures exercise new owned files, discovery, subprocess/report handling and written invariant results, not just the predicate in isolation.
- **Alias extension verified within the fix.** `scripts/check_ruff.py:54` holds only the thirty exact pinned redirects whose targets are adopted blocking codes. Both bracket and noqa paths normalize these spellings. The official redirect source and final-fact comparison evidence agree; the nonblocking M001 -> RUF100 control remains neutral. This repairs syntax compatibility without changing the adopted rule set.

## New Breakage in the Fix Diff

None found. No Critical, Important or Minor issue retained in the correction.

The change keeps token/data separation, explicit tool selection, result validation and inability behavior intact. Inspection of the [pinned suppression parser](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/suppression.rs) confirms the added action names, word characters, comma/whitespace handling and trailing-comma form. The [pinned redirect table](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/rule_redirects.rs) supports the stored exact-code aliases. No runtime metadata request, dependency, installer or expanded tool configuration was added.

## Out-of-Scope Observations

None newly observed. The original live limitations remain listed below; they are not new correction defects and do not extend this fix loop.

## Scope and Reading Selection

Reviewed only F3-1 and correction range `49a37059c637027880955d31199d4bbbcf99eda1..8cd65938261045398c2d9059a0ba2c05c9a254b7`, using `.superpowers/sdd/plan/review-49a3705..8cd6593.diff` once. Read the exact Superpowers 6.4.1 re-review prompt, correction handoff/report and named evidence. The previously read operational contract, original review, F3 brief, final authoritative entries and guideline selection remain applicable.

Both modified files still belong to build-tools. Confirmed there is still no product `guidelines/` directory; this task creates it. No new part, code kind or UI behavior was introduced, so no additional guideline reading or selection expansion applies. ShellCheck and other untouched method code were not re-reviewed. No product edits, installations, subagents, git/index/branch operations, external writes or server actions occurred.

## Evidence Inspected

Evidence directory: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each `.txt` below contains complete sanitized combined stdout/stderr; adjacent `.txt.json` records exact child argv and actual exit. The reviewer read the evidence and its fixture implementation rather than routinely repeating the runs.

| Exact captured child command | Actual exit | Output | What was verified |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | `f3-fix1-red.txt` | Seven newly added bracket cases fail before correction; neutral controls continue to pass. |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | `f3-fix1-weakest-red.txt` | Four source-verified blocking aliases expose additional false accepts before normalization. |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | `f3-fix1-final-green.txt` | Pristine final output: 18 tests pass. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-review-probe.py` | 0 | `f3-fix1-probe.txt` | Original noqa control and all three original false-pass cases now return suppression True, adapter exit 1 and named fail. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-fix1-alias-check.py` | 0 | `f3-fix1-alias-check.txt` | Script compares all applicable exact aliases against pinned official source and final membership: thirty aliases, unchanged 393 rules, nonblocking-target control. |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 2 | `f3-fix1-live-ruff.txt` | Actual missing-tool result remains null invariant; no live pass was claimed. |

No reviewer test run was needed: the complete existing evidence answers the original finding and the alias extension, and reading the correction raised no additional unresolved behavior question requiring another focused execution. Source inspection was read-only; manual source comparisons have actor reviewer, method correction/pinned-parser inspection, and observed evidence as described above; test-command fields are not applicable to that manual inspection.

## Verdict

**Fix round: All findings addressed, no new Critical/Important breakage.**

The F3-1 spec gap and associated task-quality blocker are closed for this scoped stage. The new regression cases and original reviewer probe evidence establish the intended adapter behavior under controlled valid tool reports.

Unresolved later-stage limitations, unchanged:

1. Actual local pinned Ruff/ShellCheck execution remains unavailable until installation; the last Ruff method invocation exits 2 with null invariant.
2. Real pinned-tool report/suppression compatibility and ShellCheck sentinel, literal-data and source/source-path behavior remain unchecked.
3. Final product-source compliance, independent deliberate breaks/restorations, final guideline good/bad pairs and full project/merge checks remain unchecked.

This scoped approval is not live invariant acceptance and does not claim those later checks passed.
