# Measures of the cycle run

- Calls in all: 530
- Calls of the orchestrator: 103
- Calls of subagents: 427
- Mean context per call: 391945
- Mean context per call of the orchestrator: 249604
- Share of the context in calls above 200000 tokens: 92.6%
- Context of the orchestrator's first call: 46191
- Context of the orchestrator's middle call: 244091
- Context of the orchestrator's last call: 415006
- Cache written, 5 minutes: 1095487
- Cache written, 1 hour: 1153746
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 393223
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 63e9a303-4e42-4e53-a32f-f4f91bc74570 | Claude Code | 103 | 46191 | 244091 | 415006 | 0 | 394140 | 0 | 0 | 9621 | 8 | 5452 | 2 |
| Review return step commit (the-way-stage) | Claude Code | 22 | 26577 | 92934 | 114237 | 103058 | 0 | 0 | 0 | 8349 | 4 | 0 | 0 |
| Review correction 1 (the-way-stage) | Claude Code | 35 | 26381 | 134606 | 173495 | 162952 | 0 | 0 | 0 | 41223 | 2 | 0 | 0 |
| Author: ekran postaci change (the-way-author) | Claude Code | 278 | 25979 | 551960 | 759608 | 0 | 759606 | 0 | 0 | 333409 | 40 | 75706 | 2 |
| Review whole change ekran-postaci (the-way-stage) | Claude Code | 92 | 26446 | 354234 | 446797 | 829477 | 0 | 393223 | 1 | 33369 | 4 | 4791 | 2 |
