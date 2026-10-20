# Review F5: spec compliance and quality

Read reviewer-contract.md and exact Superpowers 6.4.1 task-reviewer-prompt.md. This is task-scoped review, not final whole-branch review. No product changes, subagents or routine test repeats. Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines.

Requirements: f5-handoff.md and its complete authoritative dependencies. Author report: f5-report.md (same directory). Base e0a4699be13e0e9efef4eefc1de6f3bd584d115c; head ef4551455d30ba0a74600966a584dcc9dca767c1. Read assigned diff once: .superpowers/sdd/plan/review-e0a4699..ef45514.diff. Changed 2 files, +630/-0. The author's claims are unverified; inspect the diff and complete evidence. Check actual sharpness and weakest-point evidence. Separate code and document passes when both change.

No product guidelines yet; this task creates them. Verify absence and scope via reading.md.

19 focused tests and 173 application tests pass; the application suite was extra and is not audit evidence. Actual audit exits 2 because local pinned npm is not declared/installed. Real Bulk API integration and final acceptance remain unchecked. Trust boundary includes untrusted registry schema/ranges and lock package identity. Author reports RED/GREEN fixes for tarball identity, root npm pin masking and prerelease range semantics. C19 permits bundled npm client Bulk-only request/semver as reversible mechanics; judge faithfully against D-33, including complete offline no-new-pair comparison. No automatic Quick fallback or invented technical-metadata prohibition.

Grade and scope every finding independently under the contract. State both spec-compliance and task-quality verdicts. Preserve every failed/unchecked result. Full report .runs/task-cycles/coding-guidelines/reports/f5-review.md. Return concise verdicts, range, full report path and all unresolved findings. No external comments or next-stage invocation.
