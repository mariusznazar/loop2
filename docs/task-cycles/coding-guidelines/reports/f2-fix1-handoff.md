# F2 fix round 1

Resume under author-contract.md and original f2-handoff.md. Start commit 103bddd04584d25ea93f64d3aace328666250845. Read complete f2-review.md and its focused evidence. Address both findings within F2 assigned files: the Important empty-parsed-list blanket-disable case and Minor expected-error fixture output. Do not change final invariant meanings, common mechanics, product configuration or unrelated code.

Use focused red/green evidence demonstrating actual ESLint semantics for the reported comment, plus fixtures that keep genuinely no-op enable/redundant declarations distinct. Capture expected negative output in tests while preserving meaningful assertions and complete execution evidence. Run affected focused checks only; do not repeat npm or broad suites without a specific changed risk. If you contest a finding, preserve exact evidence and explain it in report, never silently skip it.

Explicit commit, self-review, weakest-point check and full fix report .runs/task-cycles/coding-guidelines/reports/f2-fix1-report.md; include actual range/counts/commands/exits/paths and all unresolved concerns. Stop before review. Root dispatches scoped re-review from original review and fix diff.
