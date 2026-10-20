# Review F4: spec compliance and quality

Read reviewer-contract.md and exact Superpowers 6.4.1 task-reviewer-prompt.md. This is task-scoped review, not final whole-branch review. No product changes, subagents or routine test repeats. Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines.

Requirements: f4-handoff.md and its complete authoritative dependencies. Author report: f4-report.md (same directory). Base 8cd65938261045398c2d9059a0ba2c05c9a254b7; head eb94bd41d4ec2b4d222baf6bd4ea090551697a16. Read assigned diff once: .superpowers/sdd/plan/review-8cd6593..eb94bd4.diff. Changed 2 files, +342/-0. The author's claims are unverified; inspect the diff and complete evidence. Check actual sharpness and weakest-point evidence. Separate code and document passes when both change.

No product guidelines yet; this task creates them. Verify absence and scope via reading.md.

13 focused tests pass with RED/GREEN. Actual method exit 2: pinned Prettier absent. Real API integration and final product/cases/break acceptance remain unchecked. Review native inline-ignore behavior and local/global Git attributes affecting LF. C16 interprets browser HTML/CSS as browser-view plus simulation; C17 uses native adopted Prettier behavior without inventing a general inline-marker ban. Judge those readings independently against final D-32; no requested verdict.

Grade and scope every finding independently under the contract. State both spec-compliance and task-quality verdicts. Preserve every failed/unchecked result. Full report .runs/task-cycles/coding-guidelines/reports/f4-review.md. Return concise verdicts, range, full report path and all unresolved findings. No external comments or next-stage invocation.
