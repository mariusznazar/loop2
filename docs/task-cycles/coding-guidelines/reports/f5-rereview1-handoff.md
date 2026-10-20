# F5 scoped fix re-review

Read reviewer-contract.md and exact Superpowers 6.4.1 re-review-prompt.md. Scope is original finding and fix diff only. Requirements f5-handoff.md and final D-33/invariant. Original full review f5-review.md; fix evidence f5-fix1-report.md. Base ef4551455d30ba0a74600966a584dcc9dca767c1; head 17d23b997bc3febb827dc330410dad3458ba9e34. Diff .superpowers/sdd/plan/review-ef45514..17d23b9.diff (2 files +108/-7). Worktree C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines; no guidelines yet, verify selection. No product edits/subagents/routine repeated tests.

Important finding copied verbatim:

The source check compares only the name before the first `/-/`, so a lock still claiming `a@1.0.0` accepts `resolved: https://registry.npmjs.org/a/-/a-1.5.0.tgz` and returns a named offline pass without auditing `a@1.5.0`. It also accepts `https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz`, which Node normalizes to the tarball of `other@1.5.0`. Validate the complete canonical tarball name/version against the claimed pair, rejecting ambiguous or conflicting URLs before subtraction, and cover both cases on the no-new-pair route.

Verdict finding and new breakage in fix diff; preserve any outside-fix observations separately. Actual pinned npm integration/final acceptance remains unchecked. Full report .runs/task-cycles/coding-guidelines/reports/f5-rereview1.md. Return finding and round verdicts, range, unresolved issues and report path.
