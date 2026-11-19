# Measures of the cycle run

- Calls in all: 677
- Calls of the orchestrator: 96
- Calls of subagents: 581
- Mean context per call: 175084
- Mean context per call of the orchestrator: 210406
- Share of the context in calls above 200000 tokens: 55.1%
- Context of the orchestrator's first call: 48202
- Context of the orchestrator's middle call: 219220
- Context of the orchestrator's last call: 324948
- Cache written, 5 minutes: 2461993
- Cache written, 1 hour: 306011
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 784b0cef-ca28-4c45-8730-f06e3a624bef | Claude Code | 96 | 48202 | 219220 | 324948 | 0 | 306011 | 0 | 0 | 3140 | 7 | 6421 | 2 |
| Executor slice 4 createProgramsEntry (the-way-stage) | Claude Code | 32 | 25821 | 138287 | 163863 | 163861 | 0 | 0 | 0 | 33362 | 5 | 0 | 0 |
| Review the return step commits (the-way-stage) | Claude Code | 33 | 25841 | 91894 | 135926 | 124747 | 0 | 0 | 0 | 61224 | 7 | 0 | 0 |
| Executor slice 2 start page drawing (the-way-stage) | Claude Code | 31 | 25699 | 110830 | 135784 | 124605 | 0 | 0 | 0 | 34472 | 5 | 0 | 0 |
| Fix Minor findings of whole review (the-way-stage) | Claude Code | 13 | 25870 | 66287 | 73412 | 73410 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Executor slice 3 rest of startApp (the-way-stage) | Claude Code | 64 | 25737 | 175419 | 209969 | 209967 | 0 | 0 | 0 | 110354 | 13 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 91 | 25833 | 346250 | 418454 | 407275 | 0 | 0 | 0 | 63920 | 13 | 92141 | 2 |
| Write foundation entries D-323 (the-way-stage) | Claude Code | 41 | 25649 | 127938 | 168875 | 157696 | 0 | 0 | 0 | 91691 | 14 | 0 | 0 |
| Return step: compare foundation with code (the-way-stage) | Claude Code | 66 | 25845 | 184933 | 232197 | 221018 | 0 | 0 | 0 | 89736 | 17 | 0 | 0 |
| Executor slice 6 window after error (the-way-stage) | Claude Code | 32 | 25774 | 134544 | 157978 | 146799 | 0 | 0 | 0 | 36488 | 6 | 0 | 0 |
| Plan the division into slices (the-way-stage) | Claude Code | 83 | 25611 | 273786 | 385878 | 385876 | 0 | 0 | 0 | 75177 | 19 | 0 | 0 |
| Executor slice 5 invariant entry (the-way-stage) | Claude Code | 19 | 25807 | 64113 | 77524 | 77522 | 0 | 0 | 0 | 6840 | 2 | 0 | 0 |
| Executor slice 1 kitchen-sink split (the-way-stage) | Claude Code | 38 | 25638 | 122522 | 147354 | 147352 | 0 | 0 | 0 | 20249 | 3 | 0 | 0 |
| Review slice 3 trust-boundary move (the-way-stage) | Claude Code | 38 | 25826 | 180497 | 233044 | 221865 | 0 | 0 | 0 | 102715 | 13 | 0 | 0 |
