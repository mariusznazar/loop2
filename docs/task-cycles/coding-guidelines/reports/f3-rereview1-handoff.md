# F3 scoped fix re-review

Read reviewer-contract.md and exact Superpowers 6.4.1 re-review-prompt.md. Scope: original finding and fix diff only. Requirements f3-handoff.md and final authoritative entries. Original full report f3-review.md; fix report f3-fix1-report.md. Base 49a37059c637027880955d31199d4bbbcf99eda1; head 8cd65938261045398c2d9059a0ba2c05c9a254b7. Diff .superpowers/sdd/plan/review-49a3705..8cd6593.diff. Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines. No guidelines yet; verify selection. No product edits, subagents or routine repeated suites.

Important F3-1 copyable finding, verbatim:

The suppression check only recognizes `noqa`, but pinned Ruff 0.17.1 also supports `ruff: ignore[...]`, `ruff: file-ignore[...]` and `ruff: disable[...]`/`ruff: enable[...]`. A clean file containing one of these directives for blocking F821 currently receives a named pass, so the method does not enforce the invariant's prohibition of blocking-rule suppressions. Handle these supported forms and add clean-source regression cases, preserving the allowance for nonblocking E402 and directive-like string data.

Fix also handles source-verified deprecated blocking-code aliases discovered by author's weakest-point check; judge that fix against the final rule without treating author's reasoning as proof. Review each finding and new breakage in fix diff. Out-of-scope observations remain separate for final review. Actual pinned-tool integration remains unchecked. Full report .runs/task-cycles/coding-guidelines/reports/f3-rereview1.md. Return per-finding/round verdict, range, unresolved items and report path.
