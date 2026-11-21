# Measures of the cycle run

- Calls in all: 452
- Calls of the orchestrator: 79
- Calls of subagents: 373
- Mean context per call: 398513
- Mean context per call of the orchestrator: 209069
- Share of the context in calls above 200000 tokens: 93.9%
- Context of the orchestrator's first call: 46191
- Context of the orchestrator's middle call: 206607
- Context of the orchestrator's last call: 356746
- Cache written, 5 minutes: 932535
- Cache written, 1 hour: 1057721
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 393223
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 63e9a303-4e42-4e53-a32f-f4f91bc74570 | Claude Code | 79 | 46191 | 206607 | 356746 | 0 | 335880 | 0 | 0 | 9400 | 7 | 5452 | 2 |
| Review return step commit (the-way-stage) | Claude Code | 22 | 26577 | 92934 | 114237 | 103058 | 0 | 0 | 0 | 8349 | 4 | 0 | 0 |
| Author: ekran postaci change (the-way-author) | Claude Code | 259 | 25979 | 542151 | 721843 | 0 | 721841 | 0 | 0 | 320499 | 35 | 75706 | 2 |
| Review whole change ekran-postaci (the-way-stage) | Claude Code | 92 | 26446 | 354234 | 446797 | 829477 | 0 | 393223 | 1 | 33369 | 4 | 4791 | 2 |
