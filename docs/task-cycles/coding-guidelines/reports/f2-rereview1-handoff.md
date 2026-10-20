# F2 scoped fix re-review

Read reviewer-contract.md and exact Superpowers 6.4.1 re-review-prompt.md. Scope: findings below and fix diff only, no new whole-task review. Requirements remain f2-handoff.md and final authoritative entries. Original full report f2-review.md preserves all reasoning and evidence. Fix report f2-fix1-report.md. Base 103bddd04584d25ea93f64d3aace328666250845; head e85670a467de02ec0c46d1fb17777f54ad70ec9e. Diff .superpowers/sdd/plan/review-103bddd..e85670a.diff. Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines. No guidelines yet, verify via reading.md. No product edits/subagents or routine repeated tests.

Findings under verification, copied verbatim from original Copyable comments:

- Important 1: A comment such as `/* eslint-disable , */` disables every rule in ESLint, but this branch serializes its empty parsed list as `[]`, which `source_ok` accepts. Normalize the parsed list by its length, recording `null` when it contains no rule names, and add a regression case for comma-only blanket directives.
- Minor 2: These expected-failure tests emit five fail/null-invariant records directly into an otherwise successful unittest run, including a fabricated warning. Capture the output around these calls, while keeping the assertions on the recorded result, so successful suite output does not resemble a live invariant failure.

Verdict each finding and new breakage in fix diff; outside-fix observations remain separate for final review. Preserve still-unchecked authentic ESLint integration and final invariant acceptance. Full report .runs/task-cycles/coding-guidelines/reports/f2-rereview1.md. Return concise per-finding verdicts, round verdict, range, unresolved items and report path.
